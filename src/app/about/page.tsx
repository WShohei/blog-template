import React from 'react';
import Link from 'next/link';
import { FaTwitter, FaGithub, FaEnvelope } from 'react-icons/fa';

export const metadata = {
    title: 'About - Blog',
    description: 'Information page about the blog',
};

export default function AboutPage() {
    return (
        <div className="container py-12 px-4 md:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <Link href="/" className="text-primary hover:text-primary-dark transition-colors">← Back to Home</Link>
                </div>
                <h1 className="text-3xl font-bold tracking-tight mb-8">
                    About
                </h1>

                <div className="prose max-w-none bg-cream-50 p-8 rounded-2xl prose-headings:text-text prose-p:text-text">
                    <p className="text-lg mb-6">
                        This is a technical blog built with Next.js and Markdown.
                        Here I share articles about web development, programming, and technology trends.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">About the Blog</h2>
                    <p>
                        This blog is built using Next.js 14 with the App Router.
                        Content is managed in Markdown files and statically generated at build time.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">About the Author</h2>
                    <p>
                        I work as a web engineer with a focus on frontend technologies.
                        I'm particularly passionate about React, Next.js, and TypeScript.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">Contact</h2>
                    <p>
                        If you have any questions or feedback, feel free to reach out through the following channels:
                    </p>
                    <ul className="list-disc pl-6 mt-2 text-text">
                        <li className="flex items-center gap-2">
                            <FaEnvelope className="text-primary" />
                            Email: example@example.com
                        </li>
                        <li className="flex items-center gap-2">
                            <FaTwitter className="text-primary" />
                            Twitter: @example
                        </li>
                        <li className="flex items-center gap-2">
                            <FaGithub className="text-primary" />
                            GitHub: github.com/example
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
} 