
import React from 'react';
import { getSiteConfig } from '@/libs/cache';

const Footer: React.FC = () => {
  const siteConfig = getSiteConfig();
  return (
    <footer className="border-t border-zinc-100 py-16 bg-white mt-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col items-center text-center gap-6">
          <h4 className="text-xl font-extrabold text-zinc-900">{siteConfig.author}<span className="text-zinc-300">.</span>blog</h4>
          <p className="text-sm text-zinc-400 max-w-sm">
            {siteConfig.footerBio}
          </p>
          <div className="flex gap-8 text-xs font-bold text-zinc-400">
            <a href={siteConfig.github} className="hover:text-zinc-900 transition-colors">GitHub</a>
            <a href={siteConfig.socials.linkedin} className="hover:text-zinc-900 transition-colors">LinkedIn</a>
            <a href={`mailto:${siteConfig.socials.email}`} className="hover:text-zinc-900 transition-colors">Contact</a>
          </div>
          <div className="pt-8 border-t border-zinc-50 w-full mt-4">
            <p className="text-[11px] text-zinc-300 uppercase tracking-widest">
              © {new Date().getFullYear()} {siteConfig.author}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
