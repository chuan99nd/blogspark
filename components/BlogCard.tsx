import React from 'react';
import Link from 'next/link';
import { PostMetadata } from '../types/types';
import { ArrowUpRight } from 'lucide-react';

const TAG_COLORS = [
  'text-amber-700',
  'text-emerald-600',
  'text-sky-600',
  'text-rose-600',
  'text-violet-600',
  'text-teal-600',
  'text-orange-600',
  'text-cyan-600',
  'text-pink-600',
  'text-lime-600',
];

const hashString = (str: string) => {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  return Math.abs(hash);
};

export const getTagColor = (tag: string) => {
  const index = hashString(tag.toLowerCase()) % TAG_COLORS.length;
  return TAG_COLORS[index];
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
    <article className="group relative flex flex-col h-full">
      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-amber-600/60 via-amber-600/20 to-transparent mb-6 group-hover:from-amber-600 group-hover:via-amber-600/40 transition-all duration-500" />

      <div className="flex items-center gap-3 mb-4">
        <span className="text-[11px] font-mono text-[#a8a29e] uppercase tracking-widest">{metadata.catalog || 'blog'}</span>
        <span className="text-[#d6d3d1]">·</span>
        <time className="text-[11px] font-mono text-[#a8a29e]">{formattedDate}</time>
      </div>

      <Link href={`/post/${metadata.id}`} className="block mb-4">
        <h2 className="text-xl font-bold text-[#1c1917] leading-snug tracking-tight group-hover:text-amber-500 transition-colors duration-300">
          {metadata.title}
          <ArrowUpRight size={16} className="inline-block ml-1.5 opacity-0 -translate-y-0.5 translate-x-0 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-0.5 transition-all duration-300 text-amber-600" />
        </h2>
      </Link>

      <p className="text-[#57534e] text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
        {metadata.summary}
      </p>

      <div className="mt-auto flex flex-wrap gap-x-3 gap-y-1.5">
        {metadata.tags.map(tag => (
          <Link
            key={tag}
            href={`/tag/${tag}`}
            className={`text-[11px] font-mono transition-opacity hover:opacity-70 ${getTagColor(tag)}`}
          >
            #{tag.toLowerCase().replace(/\s+/g, '-')}
          </Link>
        ))}
      </div>
    </article>
  );
};

export default BlogCard;
