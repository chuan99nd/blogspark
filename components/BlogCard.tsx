import React from 'react';
import Link from 'next/link';
import { PostMetadata } from '../types/types';

export const getTagStyles = (tag: string) => {
  const lowTag = tag.toLowerCase();
  if (lowTag.includes('backend')) return 'bg-red-50 text-red-700 border-red-100';
  if (lowTag.includes('web development')) return 'bg-orange-50 text-orange-700 border-orange-100';
  if (lowTag.includes('front-end')) return 'bg-purple-50 text-purple-700 border-purple-100';
  if (lowTag.includes('paper notes')) return 'bg-indigo-50 text-indigo-700 border-indigo-100';
  if (lowTag.includes('distributed system')) return 'bg-cyan-50 text-cyan-700 border-cyan-100';
  if (lowTag.includes('javascript')) return 'bg-yellow-50 text-yellow-700 border-yellow-100';
  if (lowTag.includes('interview')) return 'bg-zinc-50 text-zinc-700 border-zinc-200';
  if (lowTag.includes('c++')) return 'bg-zinc-100 text-zinc-800 border-zinc-200';
  if (lowTag.includes('competitive programming')) return 'bg-pink-50 text-pink-700 border-pink-100';
  if (lowTag.includes('css')) return 'bg-blue-50 text-blue-700 border-blue-100';
  return 'bg-zinc-50 text-zinc-600 border-zinc-200';
};

interface BlogCardProps {
  metadata: PostMetadata;
}

const BlogCard: React.FC<BlogCardProps> = ({ metadata }) => {
  const formattedDate = new Date(metadata.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <article className="group flex flex-col bg-white border border-zinc-200 rounded-[2rem] p-8 hover:shadow-xl hover:shadow-zinc-200/40 transition-all duration-500 ease-out h-full">
      <Link href={`/post/${metadata.id}`}>
        <h2 className="text-2xl font-bold text-zinc-800 mb-4 group-hover:text-zinc-950 transition-colors leading-[1.3] tracking-tight">
          {metadata.title}
        </h2>
      </Link>

      <p className="text-zinc-500 text-sm line-clamp-4 mb-8 leading-relaxed font-normal">
        {metadata.summary}
      </p>

      <div className="mt-auto">
        <div className="flex flex-wrap gap-2 mb-6">
          {metadata.tags.map(tag => (
            <Link
              key={tag}
              href={`/tag/${tag}`}
              className={`text-[11px] font-bold px-3 py-1 rounded-full border transition-opacity hover:opacity-80 ${getTagStyles(tag)}`}
            >
              {tag}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-zinc-900">
            {formattedDate}
          </span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
