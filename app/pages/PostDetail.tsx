import React from 'react';

import Link from 'next/link'
import { ArrowLeft, Share2 } from 'lucide-react';
import BlogCard from '../../components/BlogCard';
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

  const postContent = getPostContent(id) ?? "";
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

  console.log(contentHtml);

  const postMetadata = getPostInfo(id);

  const allPostsMetadata = getAllPosts();
  const siteConfig = getSiteConfig();

  const relatedPosts = postMetadata ?
    allPostsMetadata.
      filter(p => p.id !== postMetadata.id && p.tags.some(t => postMetadata.tags.includes(t)))
      .slice(0, 2)
    : [];

  if (!postMetadata) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-zinc-900 mb-4">Post Not Found</h1>
        <Link href="/" className="text-blue-500 hover:underline font-bold">Back to Home</Link>
      </div>
    );
  }

  const formattedDate = new Date(postMetadata.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="max-w-4xl mx-auto">

      <BlogScrollEffect id={id} />
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-zinc-900 mb-12 transition-colors group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Feed
      </Link>

      <article>
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="text-xs font-black text-zinc-400 uppercase tracking-widest">{postMetadata.catalog}</span>
            <span className="w-1 h-1 bg-zinc-200 rounded-full"></span>
            <span className="text-xs font-bold text-zinc-400">{formattedDate}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-zinc-900 mb-10 leading-[1.1] tracking-tight">
            {postMetadata.title}
          </h1>

          <div className="flex items-center justify-between py-8 border-y border-zinc-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center font-bold text-zinc-400">
                <img src={siteConfig.avatarUrl} alt="Avatar" className="w-12 h-12 rounded-2xl" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-zinc-900">{siteConfig.author}</p>
                <p className="text-xs text-zinc-400">{siteConfig.role}</p>
              </div>
            </div>
            <button className="p-3 rounded-2xl bg-zinc-50 border border-zinc-100 text-zinc-400 hover:text-zinc-900 hover:border-zinc-200 transition-all">
              <Share2 size={18} />
            </button>
          </div>
        </header>

        <div className="markdown"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        <footer className="mt-20 pt-16 border-t border-zinc-100">
          <h3 className="text-sm font-black text-zinc-900 uppercase tracking-[0.2em] mb-8 text-center">Related Articles</h3>
          {relatedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map(p => (
                <BlogCard key={p.id} metadata={p} />
              ))}
            </div>
          ) : (
            <p className="text-center text-zinc-400 italic">More coming soon...</p>
          )}
        </footer>
      </article>
    </div>
  );
};

export default PostDetail;
