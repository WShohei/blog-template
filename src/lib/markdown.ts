// This file is for server-side only
// Do not import this in client components

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import markdownToHtml from 'zenn-markdown-html';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export type PostMetadata = {
    slug: string;
    title: string;
    date: string;
    tags: string[];
    excerpt: string;
    content: string;
    readingTime?: string; // Reading time
};

// Type definition for post navigation
export type PostNavigation = {
    prev: PostMetadata | null;
    next: PostMetadata | null;
};

// Calculate reading time for a post
export function calculateReadingTime(content: string): string {
    // Remove markdown syntax to get plain text
    const plainText = content
        .replace(/```[\s\S]*?```/g, '') // Remove code blocks
        .replace(/`[^`]*`/g, '') // Remove inline code
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Keep only link text
        .replace(/\*\*([^*]*)\*\*/g, '$1') // Remove bold formatting
        .replace(/\*([^*]*)\*/g, '$1') // Remove italic formatting
        .replace(/#+\s+/g, '') // Remove heading markers
        .replace(/\n/g, ' '); // Replace line breaks with spaces

    // Count characters (approximation for Japanese text)
    const charCount = plainText.length;

    // Assume 450 characters per minute
    const minutes = Math.ceil(charCount / 450);

    return `${minutes} min read`;
}

export function getPostSlugs() {
    return fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md'));
}

export function getPostBySlug(slug: string): PostMetadata {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug: realSlug,
        title: data.title || '',
        date: data.date || '',
        tags: data.tags || [],
        excerpt: data.excerpt || '',
        content,
        readingTime: calculateReadingTime(content) // Calculate reading time
    };
}

export async function markdownToHtmlContent(markdown: string) {
    return markdownToHtml(markdown, {
        embedOrigin: 'https://embed.zenn.studio',
    });
}

export function getAllPosts(): PostMetadata[] {
    const slugs = getPostSlugs();
    const posts = slugs
        .map((slug) => getPostBySlug(slug))
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    return posts;
}

// Get adjacent posts for navigation
export function getAdjacentPosts(slug: string): PostNavigation {
    const allPosts = getAllPosts();
    const currentIndex = allPosts.findIndex(post => post.slug === slug);

    // If post not found
    if (currentIndex === -1) {
        return { prev: null, next: null };
    }

    // Newer posts are "next", older posts are "prev"
    // If index is 0, it's the newest post, so no "next" post
    const prev = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

    // If index is last, it's the oldest post, so no "prev" post
    const next = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

    return { prev, next };
}

export function getAllTags(): string[] {
    const posts = getAllPosts();
    const tagsSet = new Set<string>();

    posts.forEach(post => {
        post.tags.forEach(tag => tagsSet.add(tag));
    });

    return Array.from(tagsSet);
}

export function getPostsByTag(tag: string): PostMetadata[] {
    const posts = getAllPosts();

    // Support for hierarchical tags (include child tags when parent tag is specified)
    if (!tag.includes('/')) {
        // Check for matches with top-level tags
        return posts.filter(post =>
            post.tags.some(postTag =>
                postTag === tag || postTag.startsWith(`${tag}/`)
            )
        );
    } else {
        // Include intermediate hierarchy tags in search
        // e.g. searching for 'a/b' will match 'a/b', 'a/b/c', 'a/b/d/e', etc.
        return posts.filter(post =>
            post.tags.some(postTag =>
                postTag === tag || postTag.startsWith(`${tag}/`)
            )
        );
    }
} 