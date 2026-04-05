import { getAllPages, type DocPage } from './content';

export interface SearchResult {
    slug: string;
    title: string;
    section: string;
    excerpt: string;
}

export function search(query: string, limit = 10): SearchResult[] {
    if (!query || query.length < 2) return [];

    const q = query.toLowerCase();
    const pages = getAllPages();
    const results: (SearchResult & { score: number })[] = [];

    for (const page of pages) {
        let score = 0;
        const titleLower = page.title.toLowerCase();
        const contentLower = page.raw.toLowerCase();

        // Title match (highest weight)
        if (titleLower.includes(q)) score += 10;
        if (titleLower.startsWith(q)) score += 5;

        // Content matches
        const contentMatches = contentLower.split(q).length - 1;
        score += Math.min(contentMatches, 5);

        if (score > 0) {
            results.push({
                slug: page.slug,
                title: page.title,
                section: page.section,
                excerpt: extractExcerpt(page.raw, q),
                score,
            });
        }
    }

    return results
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(({ score: _, ...r }) => r);
}

function extractExcerpt(content: string, query: string): string {
    const lower = content.toLowerCase();
    const idx = lower.indexOf(query);
    if (idx === -1) return content.slice(0, 120) + '...';

    const start = Math.max(0, idx - 50);
    const end = Math.min(content.length, idx + query.length + 80);
    let excerpt = content.slice(start, end).replace(/\n/g, ' ').trim();

    if (start > 0) excerpt = '...' + excerpt;
    if (end < content.length) excerpt += '...';

    return excerpt;
}
