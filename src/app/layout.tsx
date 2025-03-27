import './globals.css';
import { Inter, Poppins } from 'next/font/google';
import Navbar from '../components/Navbar';
import React from 'react';
import { getAllTags } from '../lib/markdown';
import 'zenn-content-css';
import { FaTwitter, FaGithub } from 'react-icons/fa';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const poppins = Poppins({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    variable: '--font-poppins',
    display: 'swap'
});

export const metadata = {
    title: 'Blog',
    description: 'A blog created with Next.js and Markdown',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const tags = getAllTags();

    return (
        <html lang="ja" className={`${inter.variable} ${poppins.variable}`}>
            <head>
                <script src="https://embed.zenn.studio/js/listen-embed-event.js"></script>
            </head>
            <body className="bg-cream-50 min-h-screen flex flex-col">
                <Navbar tags={tags} />
                <main className="flex-grow">{children}</main>
                <footer className="mt-auto py-8 border-t border-cream-200">
                    <div className="container">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <p className="text-text">© {new Date().getFullYear()} Blog. All rights reserved.</p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-text hover:text-primary transition-colors text-xl">
                                    <FaTwitter />
                                    <span className="sr-only">Twitter</span>
                                </a>
                                <a href="#" className="text-text hover:text-primary transition-colors text-xl">
                                    <FaGithub />
                                    <span className="sr-only">GitHub</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </body>
        </html>
    );
} 