import React from 'react';

import Link from 'next/link'
import Image from 'next/image';
import { ArrowLeft, Share2, Clock } from 'lucide-react';
import BlogCard from '@/components/BlogCard';
import { getTagColor } from '@/components/BlogCard';
import Navbar from '@/components_client/Navbar';
import BlogScrollEffect from '@/components_client/BlogScrollEffect';
import { remark } from 'remark';
import remarkGfm from "remark-gfm";
import html from 'remark-html';
import matter from 'gray-matter';
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { getPostContent, getAllPosts, getPostInfo, getSiteConfig } from '@/libs/cache';

const PostDetail: React.FC<{ params: { id: string } }> = async ({ params }) => {
  const { id } = params;

  const postContent = await getPostContent(id) ?? "";
  const matterResult = matter(postContent);
  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(remarkGfm)
    .use(html)
    .use(rehypePrettyCode)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  const postMetadata = await getPostInfo(id);

  const allPostsMetadata = await getAllPosts();
  const siteConfig = await getSiteConfig();

  const relatedPosts = postMetadata ?
    allPostsMetadata.
      filter(p => p.id !== postMetadata.id && p.tags.some(t => postMetadata.tags.includes(t)))
      .slice(0, 2)
    : [];

  if (!postMetadata) {
    return (
      <div className="text-center py-32">
        <h1 className="text-2xl font-bold text-[#1c1917] mb-4">Post Not Found</h1>
        <Link href="/" className="text-amber-600 hover:text-amber-500 font-mono text-sm border-b border-dashed border-amber-600/50 pb-0.5">
          ← back to feed
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(postMetadata.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Rough reading time estimate
  const wordCount = matterResult.content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="max-w-4xl mx-auto">
      <Navbar />
      <BlogScrollEffect id={id} />

      {/* Back link */}
      <Link href="/" className="inline-flex items-center gap-2 text-[13px] font-mono text-[#a8a29e] hover:text-amber-600 mt-8 mb-16 transition-colors duration-300 group animate-fade-in">
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
        cd ..
      </Link>

      <article>
        {/* ── Article Header ───────────────────── */}
        <header className="mb-16 animate-fade-up">
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-amber-600">{postMetadata.catalog}</span>
            <span className="w-1 h-1 rounded-full bg-[#e7e5e4]" />
            <time className="text-[11px] font-mono text-[#a8a29e]">{formattedDate}</time>
            <span className="w-1 h-1 rounded-full bg-[#e7e5e4]" />
            <span className="flex items-center gap-1 text-[11px] font-mono text-[#a8a29e]">
              <Clock size={10} />
              {readingTime} min read
            </span>
          </div>

          {/* Title — editorial serif, dramatic size */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1c1917] mb-8 leading-[1.08] tracking-tight animate-fade-up stagger-1">
            {postMetadata.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mb-10 animate-fade-up stagger-2">
            {postMetadata.tags.map(tag => (
              <Link
                key={tag}
                href={`/tag/${tag}`}
                className={`text-[11px] font-mono hover:opacity-70 transition-opacity ${getTagColor(tag)}`}
              >
                #{tag.toLowerCase().replace(/\s+/g, '-')}
              </Link>
            ))}
          </div>

          {/* Author bar */}
          <div className="flex items-center justify-between py-5 border-y border-[#e7e5e4] animate-fade-up stagger-3">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-[#e7e5e4]">
                <Image
                  src={siteConfig.avatarUrl}
                  alt={`${siteConfig.author} avatar`}
                  width={40}
                  height={40}
                  className="w-10 h-10 object-cover"
                  priority
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[#1c1917]">{siteConfig.author}</p>
                <p className="text-[11px] font-mono text-[#a8a29e]">{siteConfig.role}</p>
              </div>
            </div>
            <button className="p-2.5 rounded-lg bg-[#f5f5f4] border border-[#e7e5e4] text-[#a8a29e] hover:text-amber-600 hover:border-amber-600/30 transition-all duration-300" aria-label="Share this post">
              <Share2 size={14} />
            </button>
          </div>
        </header>

        {/* ── Article Body ─────────────────────── */}
        <div className="markdown animate-fade-up stagger-4"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* ── Related Articles ─────────────────── */}
        <footer className="mt-24 pt-16 border-t border-[#e7e5e4]">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#a8a29e]">Related</span>
            <div className="flex-1 h-px bg-[#e7e5e4]" />
          </div>
          {relatedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {relatedPosts.map(p => (
                <BlogCard key={p.id} metadata={p} />
              ))}
            </div>
          ) : (
            <p className="text-[#a8a29e] font-mono text-sm italic">More articles coming soon...</p>
          )}
        </footer>
      </article>
    </div>
  );
};

export default PostDetail;
