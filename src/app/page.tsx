import Link from 'next/link';
import { getAllPosts, PostMetadata, getAllTags } from '../lib/markdown';
import TagLink from '../components/TagLink';

// Post card component
function PostCard({ post }: { post: PostMetadata }) {
    return (
        <Link href={`/posts/${post.slug}`} className="block">
            <div className="bg-cream-100 group hover:shadow-md overflow-hidden rounded-lg border border-cream-200 shadow-sm transition-all h-[150px] flex flex-col">
                <div className="p-5 flex flex-col h-full">
                    <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-cream-200 text-text truncate max-w-[90px]">
                            {new Date(post.date).toLocaleDateString('ja-JP')}
                        </span>
                        <span className="text-xs font-medium text-text-light truncate">
                            {/* Display reading time based on article length */}
                            {post.readingTime}
                        </span>
                    </div>

                    <h2 className="text-xl font-semibold mb-1 text-text group-hover:text-primary transition-colors duration-300 line-clamp-1 h-[28px]">
                        {post.title}
                    </h2>

                    <p className="text-sm text-text mb-1 line-clamp-1 flex-grow">{post.excerpt}</p>

                    <div className="flex flex-wrap gap-1 mt-auto overflow-ellipsis max-h-[24px]">
                        {post.tags.slice(0, 2).map((tag: string) => (
                            <TagLink key={tag} tag={tag} insideLink={true} />
                        ))}
                        {post.tags.length > 2 && <span className="text-xs text-text-light">+{post.tags.length - 2}</span>}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default function Home() {
    const posts = getAllPosts();
    const allTags = getAllTags();

    return (
        <div className="container py-12 px-4 md:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">
                    Welcome to the Blog
                </h1>
                <p className="text-lg text-text mb-8">
                    Latest articles and helpful information
                </p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
            </div>
        </div>
    );
} 