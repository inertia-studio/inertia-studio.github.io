import { useCallback, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPage, getAllPages } from '@/utils/content';
import { MarkdownRenderer } from './MarkdownRenderer';

const GITHUB_CONTENT_BASE = 'https://github.com/inertia-studio/docs/edit/main/src/content';

export function DocPage() {
    const params = useParams();
    const slug = params['*'] || 'guide';
    const page = getPage(slug);

    if (!page) {
        return (
            <div className="py-20 text-center">
                <p className="text-base font-medium" style={{ color: 'var(--d-text)' }}>Page not found</p>
                <p className="mt-1 text-sm" style={{ color: 'var(--d-text-3)' }}>"{slug}" doesn't exist.</p>
                <Link to="/guide" className="inline-block mt-4 text-sm font-medium" style={{ color: 'var(--d-accent)' }}>
                    Back to docs
                </Link>
            </div>
        );
    }

    const allPages = getAllPages();
    const currentIdx = allPages.findIndex((p) => p.slug === slug);
    const prev = currentIdx > 0 ? allPages[currentIdx - 1] : null;
    const next = currentIdx < allPages.length - 1 ? allPages[currentIdx + 1] : null;
    const filePath = page.path.replace('../content/', '');
    const editUrl = `${GITHUB_CONTENT_BASE}/${filePath}`;

    return (
        <article>
            <MarkdownRenderer content={page.raw} />

            {/* Footer actions */}
            <div className="mt-12 flex items-center gap-3 text-[12px]" style={{ color: 'var(--d-text-4)' }}>
                <CopyMdButton raw={page.raw} />
                <span>&middot;</span>
                <a href={editUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Edit this page
                </a>
            </div>

            {/* Prev / Next */}
            {(prev || next) && (
                <div className="flex gap-3 mt-6 pb-8">
                    {prev ? (
                        <Link
                            to={`/${prev.slug}`}
                            className="flex-1 rounded-lg px-4 py-3 group"
                            style={{ border: '1px solid var(--d-border)' }}
                        >
                            <p className="text-[11px] uppercase tracking-wider" style={{ color: 'var(--d-text-4)' }}>Previous</p>
                            <p className="text-sm font-medium mt-0.5" style={{ color: 'var(--d-text)' }}>{prev.title}</p>
                        </Link>
                    ) : <div className="flex-1" />}
                    {next ? (
                        <Link
                            to={`/${next.slug}`}
                            className="flex-1 rounded-lg px-4 py-3 text-right group"
                            style={{ border: '1px solid var(--d-border)' }}
                        >
                            <p className="text-[11px] uppercase tracking-wider" style={{ color: 'var(--d-text-4)' }}>Next</p>
                            <p className="text-sm font-medium mt-0.5" style={{ color: 'var(--d-text)' }}>{next.title}</p>
                        </Link>
                    ) : <div className="flex-1" />}
                </div>
            )}
        </article>
    );
}

function CopyMdButton({ raw }: { raw: string }) {
    const [copied, setCopied] = useState(false);

    const copy = useCallback(() => {
        navigator.clipboard.writeText(raw);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [raw]);

    return (
        <button type="button" onClick={copy} className="hover:underline">
            {copied ? 'Copied' : 'Copy markdown'}
        </button>
    );
}
