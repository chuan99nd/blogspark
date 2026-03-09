
import React from 'react';

import { getTagColor } from './BlogCard';
import Link from 'next/link';
import { getSortedTags } from '@/libs/cache';

const Sidebar: React.FC = async () => {
  const sortedTags = await getSortedTags();
  const maxCount = sortedTags.length > 0 ? sortedTags[0][1] : 1;

  return (
    <aside className="sticky top-24">
      {/* Section label */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#a8a29e]">Topics</span>
        <div className="flex-1 h-px bg-[#e7e5e4]" />
      </div>

      <div className="flex flex-col gap-1">
        {sortedTags.map(([tag, count]) => (
          <Link
            key={tag}
            href={`/tag/${tag}`}
            className="group flex items-center gap-3 py-2 px-3 -mx-3 rounded-lg hover:bg-[#f5f5f4] transition-colors duration-200"
          >
            {/* Bar indicator */}
            <div className="w-12 h-1 rounded-full bg-[#f5f5f4] overflow-hidden flex-shrink-0">
              <div
                className={`h-full rounded-full bg-amber-600/40 group-hover:bg-amber-600 transition-colors duration-300`}
                style={{ width: `${(count / maxCount) * 100}%` }}
              />
            </div>
            <span className={`text-[13px] font-medium tracking-tight group-hover:text-[#1c1917] transition-colors ${getTagColor(tag)} opacity-80 group-hover:opacity-100`}>
              {tag}
            </span>
            <span className="text-[10px] font-mono text-[#a8a29e] ml-auto tabular-nums">
              {count}
            </span>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
