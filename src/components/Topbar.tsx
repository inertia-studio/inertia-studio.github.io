import { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { search, type SearchResult } from '@/utils/search';

export function Topbar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
    const [darkMode, setDarkMode] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    useEffect(() => {
        setDarkMode(document.documentElement.classList.contains('dark'));
    }, []);

    const toggleDark = () => {
        const next = !darkMode;
        setDarkMode(next);
        document.documentElement.classList.toggle('dark', next);
        localStorage.setItem('theme', next ? 'dark' : 'light');
    };

    return (
        <header
            className="sticky top-0 z-30 h-14 flex items-center px-5 gap-4"
            style={{ background: 'var(--d-bg)', borderBottom: '1px solid var(--d-border)' }}
        >
            {/* Left */}
            <div className="flex items-center gap-3 shrink-0">
                {!isHome && (
                    <button
                        type="button"
                        onClick={onToggleSidebar}
                        className="lg:hidden p-1 rounded"
                        style={{ color: 'var(--d-text-3)' }}
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                )}
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: 'var(--d-accent)' }}>
                        <span className="text-white text-[10px] font-bold">IS</span>
                    </div>
                    <span className="text-[13px] font-semibold tracking-tight" style={{ color: 'var(--d-text)' }}>
                        Inertia Studio
                    </span>
                </Link>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2 ml-auto">
                <SearchBox />

                <div className="w-px h-4 mx-1" style={{ background: 'var(--d-border)' }} />

                <button
                    type="button"
                    onClick={toggleDark}
                    className="p-1.5 rounded-md"
                    style={{ color: 'var(--d-text-3)' }}
                    title={darkMode ? 'Light mode' : 'Dark mode'}
                >
                    {darkMode ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                        </svg>
                    ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                        </svg>
                    )}
                </button>

                <a
                    href="https://github.com/inertia-studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-md"
                    style={{ color: 'var(--d-text-3)' }}
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                </a>
            </div>
        </header>
    );
}

function SearchBox() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        setResults(search(query));
        setSelected(0);
    }, [query]);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelected((s) => Math.min(s + 1, results.length - 1));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelected((s) => Math.max(s - 1, 0));
            } else if (e.key === 'Enter' && results[selected]) {
                navigate(`/${results[selected].slug}`);
                setOpen(false);
                setQuery('');
                inputRef.current?.blur();
            } else if (e.key === 'Escape') {
                setOpen(false);
                inputRef.current?.blur();
            }
        },
        [results, selected, navigate],
    );

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                inputRef.current?.focus();
                setOpen(true);
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    return (
        <div className="relative">
            <div className="relative">
                <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'var(--d-text-4)' }} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
                    onFocus={() => setOpen(true)}
                    onBlur={() => setTimeout(() => setOpen(false), 150)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search..."
                    className="w-48 pl-8 pr-12 py-1.5 rounded-md text-[13px] focus:outline-none focus:w-64 transition-all"
                    style={{
                        background: 'var(--d-surface)',
                        border: '1px solid var(--d-border)',
                        color: 'var(--d-text)',
                    }}
                />
                <kbd
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] px-1.5 py-0.5 rounded leading-none"
                    style={{ color: 'var(--d-text-4)', border: '1px solid var(--d-border)' }}
                >
                    {typeof navigator !== 'undefined' && navigator.platform?.includes('Mac') ? '⌘K' : '^K'}
                </kbd>
            </div>

            {open && results.length > 0 && (
                <div
                    className="absolute top-full right-0 w-80 mt-2 rounded-lg shadow-xl overflow-hidden z-50"
                    style={{ background: 'var(--d-bg)', border: '1px solid var(--d-border)' }}
                >
                    {results.map((r, i) => (
                        <Link
                            key={r.slug}
                            to={`/${r.slug}`}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => { setOpen(false); setQuery(''); }}
                            className="block px-3 py-2.5 text-[13px]"
                            style={{
                                color: i === selected ? 'var(--d-text)' : 'var(--d-text-3)',
                                background: i === selected ? 'var(--d-surface)' : undefined,
                            }}
                        >
                            <div className="font-medium">{r.title}</div>
                            <div className="text-[11px] mt-0.5 truncate" style={{ color: 'var(--d-text-4)' }}>{r.excerpt}</div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
