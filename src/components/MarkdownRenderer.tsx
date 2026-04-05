import { useEffect, useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { highlightCode } from '@/utils/highlighter';

interface MarkdownRendererProps {
    content: string;
}

function CodeBlock({ code, lang }: { code: string; lang: string }) {
    const [html, setHtml] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const isDark = document.documentElement.classList.contains('dark');
        highlightCode(code.trim(), lang, isDark ? 'dark' : 'light').then(setHtml);
    }, [code, lang]);

    const copy = useCallback(() => {
        navigator.clipboard.writeText(code.trim());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [code]);

    return (
        <div className="relative group my-6">
            <div className="absolute right-3 top-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <span className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--d-text-4)' }}>
                    {lang}
                </span>
                <button
                    type="button"
                    onClick={copy}
                    className="text-[11px] px-1.5 py-0.5 rounded transition-colors"
                    style={{ color: 'var(--d-code-text)', background: 'rgba(255,255,255,0.08)' }}
                >
                    {copied ? 'Copied' : 'Copy'}
                </button>
            </div>
            {html ? (
                <div dangerouslySetInnerHTML={{ __html: html }} />
            ) : (
                <pre
                    className="p-5 rounded-lg overflow-x-auto text-sm leading-relaxed"
                    style={{ background: 'var(--d-code-bg)', color: 'var(--d-code-text)' }}
                >
                    <code>{code}</code>
                </pre>
            )}
        </div>
    );
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <div className="prose max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    code({ children, className, node, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        if (match) {
                            return <CodeBlock code={String(children)} lang={match[1]} />;
                        }
                        return <code className={className} {...props}>{children}</code>;
                    },
                    pre({ children }) {
                        return <>{children}</>;
                    },
                    a({ href, children, ...props }) {
                        const isExternal = href?.startsWith('http');
                        return (
                            <a
                                href={href}
                                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                {...props}
                            >
                                {children}
                            </a>
                        );
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
