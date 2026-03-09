import React from 'react';
import Link from "next/link";

import BlogCard from '@/components/BlogCard';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components_client/Navbar';
import { Github, Linkedin, Mail } from 'lucide-react';
import { getAllPosts, getSiteConfig } from '@/libs/cache';

const Home: React.FC<{ tagName?: string }> = async ({ tagName }) => {

  const siteConfig = await getSiteConfig();

  const filteredPosts = (await getAllPosts()).filter(post => {
    const matchesTag = !tagName || post.tags.includes(tagName);

    return matchesTag;
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="max-w-6xl mx-auto">
      <Navbar />

      {/* ── Hero Section ─────────────────────────── */}
      <section className="pt-20 pb-16 border-b border-[#e7e5e4] mb-16">
        <div className="max-w-2xl">
          {/* Role badge */}
          <div className="flex items-center gap-2 mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#78716c]">{siteConfig.role}</span>
          </div>

          {/* Name — editorial serif */}
          <h1 className="text-5xl md:text-6xl font-black text-[#1c1917] mb-6 leading-[1.05] tracking-tight animate-fade-up stagger-1">
            {siteConfig.author}<span className="text-amber-600">.</span>
          </h1>

          {/* Bio */}
          <p className="text-[#57534e] text-base leading-relaxed max-w-lg mb-10 animate-fade-up stagger-2">
            {siteConfig?.bio}
          </p>

          {/* Social links — minimal, inline */}
          <div className="flex items-center gap-6 animate-fade-up stagger-3">
            <a href={siteConfig?.github} className="group flex items-center gap-2 text-[#a8a29e] hover:text-[#1c1917] transition-colors duration-300" aria-label="GitHub profile">
              <Github size={16} />
              <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">github</span>
            </a>
            <a href={siteConfig?.socials.linkedin} className="group flex items-center gap-2 text-[#a8a29e] hover:text-[#1c1917] transition-colors duration-300" aria-label="LinkedIn profile">
              <Linkedin size={16} />
              <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">linkedin</span>
            </a>
            <a href={`mailto:${siteConfig?.socials.email}`} className="group flex items-center gap-2 text-[#a8a29e] hover:text-[#1c1917] transition-colors duration-300" aria-label="Email">
              <Mail size={16} />
              <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">email</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Filter Bar ───────────────────────────── */}
      <div className="flex items-center justify-between mb-12 animate-fade-up stagger-4">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#a8a29e]">
            {tagName ? `Filtered by` : `All posts`}
          </span>
          {tagName && (
            <span className="text-[13px] font-mono text-amber-600">#{tagName}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[12px] font-mono text-[#a8a29e] tabular-nums">{filteredPosts.length} entries</span>
          {tagName && (
            <Link href="/" className="text-[11px] font-mono text-[#78716c] hover:text-amber-600 transition-colors border-b border-dashed border-[#a8a29e] hover:border-amber-600 pb-0.5">
              clear
            </Link>
          )}
        </div>
      </div>

      {/* ── Content Grid ─────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Posts */}
        <div className="lg:col-span-8">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
              {filteredPosts.map((post, i) => (
                <div key={post.id} className={`animate-fade-up stagger-${Math.min(i + 4, 8)}`}>
                  <BlogCard metadata={post} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 border border-dashed border-[#e7e5e4] rounded-lg">
              <p className="text-[#a8a29e] font-mono text-sm">No posts found matching your filter.</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Home;
