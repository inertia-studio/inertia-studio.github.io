import { Link, useLocation } from 'react-router-dom';
import { getNavigation } from '@/utils/content';

export function Sidebar() {
    const location = useLocation();
    const nav = getNavigation();
    const currentSlug = location.pathname.replace(/^\//, '') || 'guide';

    return (
        <aside
            className="w-52 shrink-0 overflow-y-auto h-full"
            style={{ background: 'var(--d-sidebar-bg)', borderRight: '1px solid var(--d-border)' }}
        >
            <div className="px-3 py-5">
                <nav>
                    {nav.map((section, si) => (
                        <div key={section.label} className={si > 0 ? 'mt-5' : ''}>
                            <p
                                className="text-[10px] font-semibold uppercase tracking-[0.08em] mb-1 px-2"
                                style={{ color: 'var(--d-text-4)' }}
                            >
                                {section.label}
                            </p>
                            <ul>
                                {section.items.map((item) => {
                                    const isActive = currentSlug === item.slug;
                                    return (
                                        <li key={item.slug}>
                                            <Link
                                                to={`/${item.slug}`}
                                                className="block px-2 py-[5px] rounded-md text-[13px]"
                                                style={{
                                                    color: isActive ? 'var(--d-text)' : 'var(--d-text-3)',
                                                    fontWeight: isActive ? 550 : 400,
                                                    background: isActive ? 'var(--d-sidebar-active-bg)' : undefined,
                                                }}
                                            >
                                                {item.title}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </nav>
            </div>
        </aside>
    );
}
