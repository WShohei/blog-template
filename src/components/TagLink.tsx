'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

type TagLinkProps = {
    tag: string;
    isActive?: boolean;
    insideLink?: boolean;
};

export default function TagLink({ tag, isActive, insideLink }: TagLinkProps) {
    const router = useRouter();
    const className = `inline-flex items-center text-xs font-medium rounded-full px-2.5 py-0.5 ${isActive
        ? 'bg-primary text-white'
        : 'bg-cream-300 text-text-light hover:bg-cream-400'
        } transition-colors duration-300 cursor-pointer break-words max-w-full`;

    const handleTagClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        router.push(`/tags/${encodeURIComponent(tag)}`);
    };

    if (insideLink) {
        return (
            <span
                className={className}
                onClick={handleTagClick}
            >
                #{tag}
            </span>
        );
    }

    return (
        <Link
            href={`/tags/${encodeURIComponent(tag)}`}
            className={className}
            onClick={(e) => e.stopPropagation()}
        >
            #{tag}
        </Link>
    );
} 