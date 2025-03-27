import { getPostBySlug, getAllPosts, markdownToHtmlContent, getAdjacentPosts } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import MarkdownContent from '@/components/MarkdownContent';
import Link from 'next/link';

// Tag component
function Tag({ text }: { text: string }) {
    return (
        <Link href={`/tags/${encodeURIComponent(text)}`} className="inline-flex items-center text-xs font-medium rounded-full px-2.5 py-0.5 bg-cream-300 text-text-light hover:bg-cream-400 transition-colors mr-2 mb-2">
            #{text}
        </Link>
    );
}

// Generate metadata for the post page
export async function generateMetadata({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    return {
        title: post.title,
        description: post.excerpt,
    };
}

// Define paths for static generation
export async function generateStaticParams() {
    const posts = getAllPosts();

    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function Post({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return notFound();
    }

    const content = await markdownToHtmlContent(post.content);
    const { prev, next } = getAdjacentPosts(slug);

    return (
        <div className="container py-8 px-3 md:py-12 md:px-8">
            <div className="max-w-3xl mx-auto mb-4 md:mb-6">
                <Link href="/" className="text-primary hover:text-primary-dark transition-colors">← Back to Home</Link>
            </div>
            <article className="max-w-3xl mx-auto bg-cream-50 rounded-2xl p-4 md:p-8 lg:p-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-text">{post.title}</h1>
                <div className="mb-8">
                    <div className="flex items-center space-x-2">
                        <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-cream-200 text-text">
                            {new Date(post.date).toLocaleDateString('ja-JP')}
                        </span>
                        <span className="text-xs font-medium text-text-light">
                            {post.readingTime}
                        </span>
                    </div>
                    <div className="mt-4">
                        {post.tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                        ))}
                    </div>
                </div>
                <div className="mx-auto">
                    <MarkdownContent content={content} />
                </div>

                {/* Post navigation */}
                <div className="mt-12 pt-8 border-t border-cream-200">
                    <nav className="flex flex-col sm:flex-row justify-between gap-4">
                        {prev ? (
                            <Link
                                href={`/posts/${prev.slug}`}
                                className="flex-1 bg-cream-100 hover:bg-cream-200 p-4 rounded-xl transition-colors group"
                            >
                                <div className="text-xs text-text-light mb-1">Previous Post</div>
                                <div className="font-medium text-text group-hover:text-primary">{prev.title}</div>
                                <div className="text-xs text-text-light mt-1">
                                    {new Date(prev.date).toLocaleDateString('ja-JP')}
                                </div>
                            </Link>
                        ) : (
                            <div className="flex-1"></div>
                        )}

                        {next ? (
                            <Link
                                href={`/posts/${next.slug}`}
                                className="flex-1 bg-cream-100 hover:bg-cream-200 p-4 rounded-xl transition-colors text-right group"
                            >
                                <div className="text-xs text-text-light mb-1">Next Post</div>
                                <div className="font-medium text-text group-hover:text-primary">{next.title}</div>
                                <div className="text-xs text-text-light mt-1">
                                    {new Date(next.date).toLocaleDateString('ja-JP')}
                                </div>
                            </Link>
                        ) : (
                            <div className="flex-1"></div>
                        )}
                    </nav>
                </div>
            </article>
        </div>
    );
} 