import React from 'react';
import Link from "next/link";

import BlogCard from '@/components/BlogCard';
import Sidebar from '@/components/Sidebar';
import { Github, Linkedin, Globe } from 'lucide-react';
import { getAllPosts, getSiteConfig } from '@/libs/cache';

const Home: React.FC<{ tagName?: string }> = async ({ tagName }) => {

  const siteConfig = getSiteConfig();

  const filteredPosts = getAllPosts().filter(post => {
    const matchesTag = !tagName || post.tags.includes(tagName);

    return matchesTag;
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <section className="text-center mb-16 pt-8 max-w-3xl mx-auto">
        <h1 className="text-5xl font-black text-zinc-900 mb-6 tracking-tight">{siteConfig.author}</h1>
        <p className="text-zinc-600 leading-relaxed text-[15px] mb-8 font-medium">
          {siteConfig?.bio}
        </p>

        <div className="flex flex-col items-center gap-4">
          <span className="text-[13px] font-bold text-zinc-900 tracking-wide">Connect with me:</span>
          <div className="flex gap-4">
            <a href={siteConfig?.github} className="p-3 rounded-2xl bg-white border border-zinc-200 shadow-sm text-zinc-600 hover:text-zinc-900 hover:shadow-md transition-all">
              <Github size={20} />
            </a>
            <a href={siteConfig?.socials.linkedin} className="p-3 rounded-2xl bg-white border border-zinc-200 shadow-sm text-zinc-600 hover:text-zinc-900 hover:shadow-md transition-all">
              <Linkedin size={20} />
            </a>
            <a href="#" className="p-3 rounded-2xl bg-white border border-zinc-200 shadow-sm text-zinc-600 hover:text-zinc-900 hover:shadow-md transition-all">
              <Globe size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Filter / Stats Bar */}
      <div className="mb-12">
        <div className="bg-[#f5f5ff] border border-[#e0e0ff] rounded-[1rem] px-6 py-3.5 inline-flex items-center gap-3">
          <span className="text-lg">📊</span>
          <span className="text-sm font-bold text-zinc-600">
            {tagName ? `Showing posts for #${tagName}` : `${filteredPosts.length} posts found`}
          </span>
          {tagName && (
            <Link href="/" className="text-xs text-blue-500 hover:underline font-bold ml-2">Clear</Link>
          )}
        </div>
      </div>

      {/* Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Posts Area */}
        <div className="lg:col-span-9">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map(post => (
                <BlogCard key={post.id} metadata={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-zinc-50 rounded-[2rem] border-2 border-dashed border-zinc-100">
              <p className="text-zinc-400 font-medium">No results found for your search.</p>
            </div>
          )}
        </div>

        {/* Tags Sidebar */}
        <div className="lg:col-span-3">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Home;
