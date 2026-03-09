
"use client";
import React from 'react';
import Link from 'next/link';
import { Search, Github, Terminal } from 'lucide-react';
import { useRouter } from 'next/navigation';


const Navbar: React.FC = () => {
  const router = useRouter();

  const handleSearchChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    const query = formData.get("query")
    if (window.location.hash !== '#/') {
      router.push('/');
    }
    router.push(`/search?query=${query}`);
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-[#e7e5e4]">
      <div className="container mx-auto px-6 max-w-6xl h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-amber-600 rounded flex items-center justify-center group-hover:bg-amber-500 transition-colors duration-300">
            <Terminal size={14} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="hidden sm:flex items-baseline gap-0.5">
            <span className="text-[15px] font-semibold tracking-tight text-[#1c1917]">blog</span>
            <span className="text-amber-600 text-lg font-bold leading-none">spark</span>
          </span>
        </Link>

        <form onSubmit={handleSearchChange} className="flex items-center flex-1 max-w-xs ml-8">
          <div className="relative w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a8a29e] group-focus-within:text-amber-600 transition-colors" size={14} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-[#f5f5f4] border border-[#e7e5e4] rounded-lg py-2 pl-9 pr-4 focus:outline-none focus:border-amber-600/50 focus:ring-1 focus:ring-amber-600/20 transition-all text-sm text-[#57534e] placeholder:text-[#a8a29e] font-mono"
              name='query'
              aria-label="Search blog posts"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#a8a29e] font-mono bg-[#e7e5e4] px-1.5 py-0.5 rounded border border-[#e7e5e4] hidden sm:inline-block">⌘K</kbd>
          </div>
        </form>

        <div className="flex items-center gap-3 ml-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[#a8a29e] hover:text-amber-600 transition-colors duration-300" aria-label="GitHub profile">
            <Github size={18} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
