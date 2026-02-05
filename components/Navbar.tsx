
"use client";
import React from 'react';
import Link from 'next/link';
import { Search, Github, Terminal } from 'lucide-react';
import { useRouter } from 'next/navigation';


const Navbar: React.FC = () => {
  const router = useRouter();

  const handleSearchChange = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    const query = formData.get("query")
    if (window.location.hash !== '#/') {
      router.push('/');
    }
    router.push(`/search?query=${query}`);
  };

  return (
    <nav className="top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div className="container mx-auto px-4 max-w-6xl h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-1.5 bg-zinc-900 rounded-lg group-hover:bg-zinc-800 transition-colors">
            <Terminal size={18} className="text-white" />
          </div>
          <span className="font-extrabold text-lg tracking-tight text-zinc-700 hidden sm:block" style={{ color: '#71717a', fontWeight: 100 }}>
            Chuan<span className="text-zinc-400">.</span>blog
          </span>
        </Link>

        <form onSubmit={handleSearchChange} className="flex items-center gap-4 flex-1 max-w-sm ml-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
            <input
              type="text"
              placeholder="Search concepts or tags..."
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-1.5 pl-9 pr-4 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all text-sm placeholder:text-zinc-400"
              name='query'
            />
          </div>
        </form>


        <div className="flex items-center gap-4 ml-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-900 transition-colors">
            <Github size={20} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
