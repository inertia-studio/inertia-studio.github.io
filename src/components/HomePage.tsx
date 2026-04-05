import { Link } from 'react-router-dom';

const sections = [
    {
        title: 'Get Started',
        links: [
            { label: 'Introduction', href: '/guide', desc: 'Architecture and key concepts' },
            { label: 'Installation', href: '/guide/installation', desc: 'Setup in 2 minutes' },
            { label: 'Getting Started', href: '/guide/getting-started', desc: 'Build your first module' },
        ],
    },
    {
        title: 'Core',
        links: [
            { label: 'Modules', href: '/modules', desc: 'CRUD from a single PHP class' },
            { label: 'Forms', href: '/forms', desc: '30 field types, validation, reactivity' },
            { label: 'Tables', href: '/tables', desc: 'Columns, filters, actions, search' },
        ],
    },
    {
        title: 'Platform',
        links: [
            { label: 'Panels', href: '/panels/configuration', desc: 'Auth, theming, navigation' },
            { label: 'Custom Pages', href: '/pages', desc: '24 page primitives, zero JS' },
            { label: 'Authorization', href: '/authorization', desc: 'Policies and access control' },
        ],
    },
];

export function HomePage() {
    return (
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
            {/* Hero */}
            <div className="pt-20 pb-16 lg:pt-28 lg:pb-20">
                <div className="flex items-center gap-2 mb-5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--d-accent)' }}>
                        <span className="text-white text-xs font-bold">IS</span>
                    </div>
                    <span className="text-sm font-medium" style={{ color: 'var(--d-text-3)' }}>Inertia Studio</span>
                </div>

                <h1
                    className="text-[2.5rem] lg:text-5xl font-bold leading-[1.1] tracking-tight"
                    style={{ color: 'var(--d-text)', letterSpacing: '-0.035em' }}
                >
                    Admin panels for<br />
                    <span style={{ color: 'var(--d-accent)' }}>Laravel + Inertia</span>
                </h1>

                <p className="mt-5 text-lg leading-relaxed max-w-xl" style={{ color: 'var(--d-text-3)' }}>
                    Define forms, tables, and pages in PHP. Render them with React, Vue, or Svelte. One package, any Inertia frontend.
                </p>

                <div className="flex items-center gap-3 mt-8">
                    <Link
                        to="/guide/getting-started"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white"
                        style={{ background: 'var(--d-accent)' }}
                    >
                        Get started
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                    <Link
                        to="/guide"
                        className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium"
                        style={{ color: 'var(--d-text-2)', border: '1px solid var(--d-border)' }}
                    >
                        Read the docs
                    </Link>
                </div>
            </div>

            {/* Install */}
            <div
                className="rounded-lg overflow-hidden"
                style={{ border: '1px solid var(--d-border)' }}
            >
                <div className="flex items-center gap-6 px-4 py-2" style={{ background: 'var(--d-surface)', borderBottom: '1px solid var(--d-border)' }}>
                    <span className="text-[11px] font-medium" style={{ color: 'var(--d-text-3)' }}>Terminal</span>
                </div>
                <pre className="px-5 py-4 text-[13px] leading-relaxed" style={{ background: 'var(--d-code-bg)', color: 'var(--d-code-text)' }}>
                    <span style={{ color: '#737373' }}>$</span> composer require inertia-studio/laravel-adapter{'\n'}
                    <span style={{ color: '#737373' }}>$</span> npm install @inertia-studio/ui{'\n'}
                    <span style={{ color: '#737373' }}>$</span> php artisan studio:install
                </pre>
            </div>

            {/* Frameworks */}
            <div className="mt-10 grid grid-cols-3 gap-3">
                {['React', 'Vue', 'Svelte'].map((fw) => (
                    <div
                        key={fw}
                        className="rounded-lg px-4 py-3 text-center"
                        style={{ border: '1px solid var(--d-border)', background: 'var(--d-bg)' }}
                    >
                        <p className="text-sm font-medium" style={{ color: 'var(--d-text)' }}>{fw}</p>
                        <p className="text-[11px] mt-0.5 font-mono" style={{ color: 'var(--d-text-4)' }}>
                            @inertia-studio/ui/{fw.toLowerCase()}
                        </p>
                    </div>
                ))}
            </div>

            {/* Sections */}
            <div className="mt-16 space-y-10 pb-20">
                {sections.map((section) => (
                    <div key={section.title}>
                        <h2 className="text-xs font-semibold uppercase tracking-[0.08em] mb-3 px-1" style={{ color: 'var(--d-text-4)' }}>
                            {section.title}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {section.links.map((link) => (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    className="group rounded-lg px-4 py-3"
                                    style={{ border: '1px solid var(--d-border)' }}
                                >
                                    <p className="text-[13px] font-medium" style={{ color: 'var(--d-text)' }}>
                                        {link.label}
                                        <span className="inline-block ml-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--d-text-4)' }}>&rarr;</span>
                                    </p>
                                    <p className="text-[12px] mt-0.5" style={{ color: 'var(--d-text-3)' }}>{link.desc}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
