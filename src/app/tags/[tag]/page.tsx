import Link from 'next/link';
import { getPostsByTag, getAllTags, PostMetadata } from '../../../lib/markdown';
import TagSearch from '../../../components/TagSearch';
import TagLink from '../../../components/TagLink';

// Post card component
function PostCard({ post }: { post: PostMetadata & { currentTag?: string } }) {
    return (
        <Link href={`/posts/${post.slug}`} className="block">
            <div className="bg-cream-100 group hover:shadow-md overflow-hidden rounded-lg border border-cream-200 shadow-sm transition-all h-[150px] flex flex-col">
                <div className="p-5 flex flex-col h-full">
                    <h2 className="text-xl font-semibold mb-1 text-text group-hover:text-primary transition-colors duration-300 line-clamp-1 h-[28px]">
                        {post.title}
                    </h2>
                    <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-cream-200 text-text truncate max-w-[90px]">
                            {new Date(post.date).toLocaleDateString('ja-JP')}
                        </span>
                        <span className="text-xs font-medium text-text-light truncate">
                            {post.readingTime}
                        </span>
                    </div>
                    <p className="text-sm text-text mb-1 line-clamp-1 flex-grow">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-1 mt-auto overflow-ellipsis max-h-[24px]">
                        {post.tags.slice(0, 2).map((tag: string) => (
                            <TagLink
                                key={tag}
                                tag={tag}
                                isActive={tag === post.currentTag}
                                insideLink={true}
                            />
                        ))}
                        {post.tags.length > 2 && <span className="text-xs text-text-light">+{post.tags.length - 2}</span>}
                    </div>
                </div>
            </div>
        </Link>
    );
}

// Define paths for static generation
export async function generateStaticParams() {
    const tags = getAllTags();

    return tags.map((tag: string) => ({
        tag: encodeURIComponent(tag),
    }));
}

export default async function TagPage({ params }: { params: { tag: string } }) {
    // URL decode to get the tag
    const { tag } = await params;
    const decodedTag = decodeURIComponent(tag);
    const posts = getPostsByTag(decodedTag).map((post: PostMetadata) => ({
        ...post,
        currentTag: decodedTag
    }));
    const allTags = getAllTags();

    return (
        <div className="container py-12 px-4 md:px-8">
            <div className="max-w-4xl mx-auto mb-8">
                <div className="flex justify-between items-center mb-4">
                    <Link href="/" className="text-primary hover:text-primary-dark transition-colors">← Back to Home</Link>
                </div>
                <h1 className="text-4xl font-bold mt-4 mb-6 text-center break-words overflow-wrap-anywhere">Posts with #{decodedTag}</h1>

                {/* Add tag search */}
                <div className="max-w-md mx-auto mb-12">
                    <TagSearch allTags={allTags} instanceId="tag-page-search" />
                </div>
            </div>

            {posts.length > 0 ? (
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <PostCard key={post.slug} post={post} />
                    ))}
                </div>
            ) : (
                <div className="bg-cream-50 rounded-2xl p-8 max-w-xl mx-auto">
                    <p className="text-center text-xl text-text">No posts found with this tag.</p>
                </div>
            )}
        </div>
    );
} 