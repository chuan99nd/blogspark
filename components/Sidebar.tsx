
import React from 'react';

import { getTagStyles } from './BlogCard';
import Link from 'next/link';
import { getSortedTags } from '@/libs/cache';

const Sidebar: React.FC = async () => {
  const sortedTags = await getSortedTags();

  return (
    <aside className="bg-white border border-zinc-200 rounded-[2rem] p-8 h-fit sticky top-24">
      <div className="flex items-center justify-between mb-8 border-b border-zinc-100 pb-4">
        <h3 className="text-lg font-bold text-zinc-900 tracking-tight">Tags</h3>
      </div>

      <div className="flex flex-col gap-3">
        {sortedTags.map(([tag, count]) => (
          <Link
            key={tag}
            href={`/tag/${tag}`}
            className={`flex items-center justify-between group px-4 py-2.5 rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${getTagStyles(tag)}`}
          >
            <span className="text-[13px] font-bold tracking-tight">{tag}</span>
            <span className="text-[10px] font-black bg-white/40 px-2 py-0.5 rounded-full border border-black/5">
              {count}
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-zinc-100">
        <p className="text-[11px] text-zinc-400 font-bold uppercase tracking-widest text-center">
          More tags coming soon
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
