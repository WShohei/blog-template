'use client';

import { useEffect, useState } from 'react';
import 'zenn-content-css';

interface MarkdownContentProps {
    content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Load zenn-embed-elements client-side to support KaTeX syntax
        import('zenn-embed-elements');
        setMounted(true);
    }, []);

    // クライアントサイドでレンダリングされる前は空のdivを返す
    if (!mounted) {
        return <div className="znc prose mx-auto prose-headings:text-text prose-p:text-text prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary-dark prose-blockquote:border-l-cream-300 prose-blockquote:bg-cream-100 prose-blockquote:rounded-lg prose-img:rounded-xl max-w-none prose-p:text-base prose-headings:text-xl md:prose-headings:text-2xl lg:prose-headings:text-3xl prose-img:my-4 prose-ul:text-base prose-ol:text-base prose-li:text-base" />;
    }

    return (
        <div
            className="znc prose mx-auto prose-headings:text-text prose-p:text-text prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary-dark prose-blockquote:border-l-cream-300 prose-blockquote:bg-cream-100 prose-blockquote:rounded-lg prose-img:rounded-xl max-w-none prose-p:text-base prose-headings:text-xl md:prose-headings:text-2xl lg:prose-headings:text-3xl prose-img:my-4 prose-ul:text-base prose-ol:text-base prose-li:text-base"
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
} 