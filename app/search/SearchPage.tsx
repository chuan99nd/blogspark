"use client"

import { PostMetadata } from '@/types/types';
import { useState, useEffect } from 'react';
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function SearchPage() {
    const searchParams = useSearchParams();
    const defaultQuery = searchParams.get('query');

    const [query, setQuery] = useState(defaultQuery || '');
    const [searchResults, setSearchResults] = useState<{ posts: PostMetadata[] }>({ posts: [] });

    const [allPosts, setAllPosts] = useState<{ posts: PostMetadata[] }>({ posts: [] });
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch("/api/posts", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                const data = await res.json()
                setAllPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts();
    }, []);

    useEffect(() => {
        if (!query) {
            setSearchResults(allPosts);
            return;
        }
        const filteredPosts = allPosts.posts.filter(post => {
            return post.title.toLowerCase().includes(query.toLowerCase());
        });
        setSearchResults({ posts: filteredPosts });
    }, [query, allPosts]);

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in duration-300">
            {/* Input Box */}
            <div className="relative mb-12">
                <div className="relative flex items-center bg-white border-2 border-zinc-900 rounded-lg overflow-hidden h-14">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full h-full px-6 py-2 text-lg font-medium text-zinc-900 focus:outline-none"
                        placeholder="Type to search..."
                    />
                </div>
            </div>

            {/* Results Section */}
            <div>
                <h2 className="text-xl font-bold text-zinc-900 mb-8">Results</h2>

                {searchResults.posts.length > 0 ? (
                    <div className="space-y-16">
                        {searchResults.posts.map(post => (
                            <div key={post.id} className="group">
                                <Link href={`/post/${post.id}`}>
                                    <h3 className="text-3xl font-bold text-zinc-900 mb-4 group-hover:text-zinc-700 transition-colors">
                                        {post.title}
                                    </h3>
                                </Link>

                                <p className="text-zinc-600 italic mb-2 text-[15px]">
                                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    })}
                                </p>

                                <p className="text-zinc-700 text-lg leading-relaxed mb-6">
                                    {post.summary}
                                </p>

                                {/* {post.image && (
                                    <div className="w-full overflow-hidden rounded-lg mb-4 bg-zinc-50 border border-zinc-100 flex justify-center">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="max-w-full h-auto object-contain max-h-[500px]"
                                        />
                                    </div>
                                )} */}
                            </div>
                        ))}
                    </div>
                ) : query.trim() ? (
                    <div className="py-20 text-center text-zinc-400">
                        No results found.
                    </div>
                ) : null}
            </div>
        </div>
    );
}