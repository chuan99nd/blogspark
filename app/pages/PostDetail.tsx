import React, { useMemo } from 'react';

import Link from 'next/link'
import { ArrowLeft, Share2 } from 'lucide-react';
import { mockPosts } from '../mockData';
import BlogCard from '../../components/BlogCard';
import BlogScrollEffect from '@/components_client/BlogScrollEffect';

const PostDetail: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { id } = params;

  const post = useMemo(() => mockPosts.find(p => p.metadata.id === id), [id]);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return mockPosts
      .filter(p => p.metadata.id !== post.metadata.id && p.metadata.tags.some(t => post.metadata.tags.includes(t)))
      .slice(0, 2);
  }, [post]);

  if (!post) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-zinc-900 mb-4">Post Not Found</h1>
        <Link href="/" className="text-blue-500 hover:underline font-bold">Back to Home</Link>
      </div>
    );
  }

  const formattedDate = new Date(post.metadata.createdAt).toLocaleDateString('en-US', {
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
            <span className="text-xs font-black text-zinc-400 uppercase tracking-widest">{post.metadata.catalog}</span>
            <span className="w-1 h-1 bg-zinc-200 rounded-full"></span>
            <span className="text-xs font-bold text-zinc-400">{formattedDate}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-zinc-900 mb-10 leading-[1.1] tracking-tight">
            {post.metadata.title}
          </h1>

          <div className="flex items-center justify-between py-8 border-y border-zinc-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center font-bold text-zinc-400">
                HN
              </div>
              <div>
                <p className="text-sm font-extrabold text-zinc-900">Trung Hieu Nguyen</p>
                <p className="text-xs text-zinc-400">Software Engineer</p>
              </div>
            </div>
            <button className="p-3 rounded-2xl bg-zinc-50 border border-zinc-100 text-zinc-400 hover:text-zinc-900 hover:border-zinc-200 transition-all">
              <Share2 size={18} />
            </button>
          </div>
        </header>

        <div className="prose prose-zinc max-w-none prose-headings:text-zinc-900 prose-headings:font-black prose-p:text-zinc-600 prose-p:leading-relaxed prose-p:text-lg prose-a:text-blue-600 prose-pre:bg-zinc-50 prose-pre:border prose-pre:border-zinc-100 prose-pre:rounded-2xl">
          <div dangerouslySetInnerHTML={{ __html: formatMarkdown(post.content) }} />
        </div>

        <footer className="mt-20 pt-16 border-t border-zinc-100">
          <h3 className="text-sm font-black text-zinc-900 uppercase tracking-[0.2em] mb-8 text-center">Related Articles</h3>
          {relatedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map(p => (
                <BlogCard key={p.metadata.id} metadata={p.metadata} />
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

function formatMarkdown(content: string) {
  return content
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-black mt-12 mb-6 text-zinc-900">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-10 mb-5 text-zinc-800">$2</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-8 mb-4 text-zinc-800">$1</h3>')
    .replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc text-zinc-600 mb-2">$1</li>')
    .replace(/`(.*?)`/g, '<code class="bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-800 font-mono text-sm">$1</code>')
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 my-8 overflow-x-auto text-sm text-zinc-300 font-mono"><code>$1</code></pre>')
    .split('\n\n').map(p => {
      if (p.startsWith('<')) return p;
      return `<p class="mb-6 text-zinc-600 leading-relaxed text-lg font-medium">${p}</p>`;
    }).join('\n');
}

export default PostDetail;
