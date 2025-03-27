"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import TagSearch from './TagSearch';

type NavbarProps = {
    tags: string[];
};

export default function Navbar({ tags }: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const controlNavbar = () => {
            const currentScrollY = window.scrollY;
            const scrollThreshold = 100; // Scroll threshold in pixels

            // Always show if near the top
            if (currentScrollY < scrollThreshold) {
                setVisible(true);
            } else if (currentScrollY > lastScrollY) {
                // Scrolling down - hide navbar (only if below threshold)
                setVisible(false);
            } else {
                // Scrolling up - show navbar
                setVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', controlNavbar);

        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    }, [lastScrollY]);

    return (
        <header className={`sticky top-0 z-40 w-full border-b border-cream-200 bg-cream-100/80 backdrop-blur supports-[backdrop-filter]:bg-cream-100/60 transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className="container h-16 flex items-center justify-between">
                <div className="flex items-center">
                    <Link href="/" className="font-bold tracking-tight text-2xl">
                        Blog
                    </Link>
                </div>

                {/* Desktop navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/" className="text-text hover:text-primary transition-colors">
                        Home
                    </Link>
                    <Link href="/about" className="text-text hover:text-primary transition-colors">
                        About
                    </Link>

                    {/* Tag search component */}
                    <div className="w-64">
                        <TagSearch allTags={tags} instanceId="navbar-tag-search" />
                    </div>
                </nav>

                {/* Mobile menu button */}
                <button
                    className="md:hidden inline-flex items-center justify-center p-2 text-text hover:bg-cream-200 hover:text-primary"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span className="sr-only">Open menu</span>
                    {isMenuOpen ? (
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-cream-200 bg-cream-100">
                    <div className="container py-4 space-y-1">
                        <Link
                            href="/"
                            className="block px-3 py-2 text-base font-medium text-text hover:bg-cream-200 hover:text-primary"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className="block px-3 py-2 text-base font-medium text-text hover:bg-cream-200 hover:text-primary"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About
                        </Link>

                        {/* Mobile tag search component */}
                        <div className="px-3 py-2">
                            <TagSearch allTags={tags} instanceId="navbar-mobile-tag-search" />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
} 