import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { DocPage } from '@/components/DocPage';
import { HomePage } from '@/components/HomePage';

function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    // Close mobile sidebar on nav
    useEffect(() => setSidebarOpen(false), [location.pathname]);

    if (isHome) {
        return (
            <div className="h-screen flex flex-col" style={{ background: 'var(--d-bg)' }}>
                <Topbar onToggleSidebar={() => setSidebarOpen((v) => !v)} />
                <main className="flex-1 overflow-y-auto">
                    <HomePage />
                </main>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col" style={{ background: 'var(--d-bg)' }}>
            <Topbar onToggleSidebar={() => setSidebarOpen((v) => !v)} />
            <div className="flex flex-1 overflow-hidden">
                <div className="hidden lg:block">
                    <Sidebar />
                </div>

                {sidebarOpen && (
                    <>
                        <div className="fixed inset-0 z-40 bg-black/20 lg:hidden" onClick={() => setSidebarOpen(false)} />
                        <div className="fixed inset-y-0 left-0 z-50 lg:hidden">
                            <Sidebar />
                        </div>
                    </>
                )}

                <main className="flex-1 overflow-y-auto">
                    <div className="max-w-[720px] mx-auto px-6 py-12 lg:px-8 lg:py-16">
                        <DocPage />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default function App() {
    useEffect(() => {
        const stored = localStorage.getItem('theme');
        if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        }
    }, []);

    return (
        <BrowserRouter basename="/docs">
            <Routes>
                <Route path="/*" element={<Layout />} />
            </Routes>
        </BrowserRouter>
    );
}
