// Load all markdown files at build time
const mdFiles = import.meta.glob('../content/**/*.md', {
    query: '?raw',
    import: 'default',
    eager: true,
}) as Record<string, string>;

export interface DocPage {
    slug: string;
    path: string;
    title: string;
    raw: string;
    section: string;
    order: number;
}

interface FrontMatter {
    title?: string;
    order?: number;
    [key: string]: unknown;
}

function parseFrontMatter(raw: string): { meta: FrontMatter; content: string } {
    const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) return { meta: {}, content: raw };

    const meta: FrontMatter = {};
    for (const line of match[1].split('\n')) {
        const [key, ...rest] = line.split(':');
        if (key && rest.length) {
            const val = rest.join(':').trim();
            meta[key.trim()] = val === 'true' ? true : val === 'false' ? false : isNaN(Number(val)) ? val : Number(val);
        }
    }

    return { meta, content: match[2] };
}

function slugFromPath(path: string): string {
    return path
        .replace('../content/', '')
        .replace(/\.md$/, '')
        .replace(/\/index$/, '');
}

function sectionFromPath(path: string): string {
    // Use raw path (before index stripping) to determine section
    const relative = path.replace('../content/', '').replace(/\.md$/, '');
    const parts = relative.split('/');
    return parts.length > 1 ? parts[0] : 'guide';
}

function titleFromSlug(slug: string): string {
    const last = slug.split('/').pop() ?? slug;
    return last
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
}

export function getAllPages(): DocPage[] {
    return Object.entries(mdFiles)
        .map(([path, raw]) => {
            const { meta, content } = parseFrontMatter(raw);
            const slug = slugFromPath(path);

            return {
                slug,
                path,
                title: (meta.title as string) ?? titleFromSlug(slug),
                raw: content,
                section: sectionFromPath(path),
                order: (meta.order as number) ?? 99,
            };
        })
        .sort((a, b) => a.order - b.order);
}

export function getPage(slug: string): DocPage | undefined {
    return getAllPages().find((p) => p.slug === slug);
}

export interface NavSection {
    label: string;
    items: { slug: string; title: string }[];
}

const sectionLabels: Record<string, string> = {
    guide: 'Guide',
    panels: 'Panels',
    modules: 'Modules',
    forms: 'Forms',
    tables: 'Tables',
    detail: 'Detail Views',
    pages: 'Pages',
    widgets: 'Widgets',
    authorization: 'Authorization',
    tenancy: 'Multi-Tenancy',
    customization: 'Customization',
    cli: 'CLI Reference',
};

const sectionOrder = Object.keys(sectionLabels);

export function getNavigation(): NavSection[] {
    const pages = getAllPages();
    const grouped: Record<string, DocPage[]> = {};

    for (const page of pages) {
        if (!grouped[page.section]) grouped[page.section] = [];
        grouped[page.section].push(page);
    }

    return sectionOrder
        .filter((key) => grouped[key]?.length)
        .map((key) => ({
            label: sectionLabels[key] ?? titleFromSlug(key),
            items: grouped[key].map((p) => ({ slug: p.slug, title: p.title })),
        }));
}
