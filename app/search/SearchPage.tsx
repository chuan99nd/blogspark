"use client"

import { PostMetadata } from '@/types/types';
import { useState, useEffect } from 'react';
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Search, ArrowUpRight } from 'lucide-react';

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
        <div className="max-w-3xl mx-auto px-6 pt-16 pb-20">
            {/* Search Header */}
            <div className="mb-16">
                <h1 className="text-3xl font-bold text-[#1c1917] mb-6">
                    Search<span className="text-amber-600 italic"> articles</span>
                </h1>
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a8a29e] group-focus-within:text-amber-600 transition-colors" size={18} />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full bg-[#f5f5f4] border border-[#e7e5e4] rounded-lg py-4 pl-12 pr-6 text-lg text-[#1c1917] placeholder:text-[#a8a29e] font-mono focus:outline-none focus:border-amber-600/50 focus:ring-1 focus:ring-amber-600/20 transition-all"
                        placeholder="grep -i ..."
                        aria-label="Search blog posts"
                        autoFocus
                    />
                    {query && (
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-mono text-[#a8a29e]">
                            {searchResults.posts.length} match{searchResults.posts.length !== 1 ? 'es' : ''}
                        </span>
                    )}
                </div>
            </div>

            {/* Results */}
            <div>
                {searchResults.posts.length > 0 ? (
                    <div className="space-y-0">
                        {searchResults.posts.map((post, i) => (
                            <Link
                                key={post.id}
                                href={`/post/${post.id}`}
                                className="group block py-6 border-b border-[#e7e5e4] first:border-t hover:bg-[#f5f5f4] -mx-4 px-4 rounded-sm transition-colors duration-200"
                                style={{ animationDelay: `${i * 50}ms` }}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold text-[#1c1917] mb-2 group-hover:text-amber-500 transition-colors truncate">
                                            {post.title}
                                        </h3>
                                        <p className="text-sm text-[#78716c] line-clamp-2 leading-relaxed mb-2">
                                            {post.summary}
                                        </p>
                                        <time className="text-[11px] font-mono text-[#a8a29e]">
                                            {new Date(post.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </time>
                                    </div>
                                    <ArrowUpRight size={16} className="text-[#a8a29e] group-hover:text-amber-600 mt-1 flex-shrink-0 transition-colors" />
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : query.trim() ? (
                    <div className="py-24 text-center">
                        <p className="text-[#a8a29e] font-mono text-sm mb-2">No results for &quot;{query}&quot;</p>
                        <p className="text-[#d6d3d1] font-mono text-xs">Try a different search term</p>
                    </div>
                ) : null}
            </div>
        </div>
    );
}