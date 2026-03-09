
import React from 'react';
import { getSiteConfig } from '@/libs/cache';

const Footer: React.FC = async () => {
  const siteConfig = await getSiteConfig();
  return (
    <footer className="border-t border-[#e7e5e4] mt-32">
      <div className="container mx-auto px-6 max-w-6xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h4 className="text-lg font-bold text-[#1c1917] mb-3">
              blog<span className="text-amber-600 italic">spark</span>
            </h4>
            <p className="text-sm text-[#78716c] leading-relaxed max-w-xs">
              {siteConfig.footerBio.slice(0, 120)}...
            </p>
          </div>

          {/* Links */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#a8a29e] block mb-4">Connect</span>
            <div className="flex flex-col gap-2.5">
              <a href={siteConfig.github} className="text-sm text-[#57534e] hover:text-amber-600 transition-colors duration-300">GitHub →</a>
              <a href={siteConfig.socials.linkedin} className="text-sm text-[#57534e] hover:text-amber-600 transition-colors duration-300">LinkedIn →</a>
              <a href={`mailto:${siteConfig.socials.email}`} className="text-sm text-[#57534e] hover:text-amber-600 transition-colors duration-300">Email →</a>
            </div>
          </div>

          {/* Status */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#a8a29e] block mb-4">Status</span>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm text-[#57534e] font-mono">All systems operational</span>
            </div>
            <p className="text-[11px] text-[#a8a29e] font-mono">
              Built with Next.js · Deployed on Docker
            </p>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-[#f5f5f4] flex items-center justify-between">
          <p className="text-[11px] text-[#a8a29e] font-mono">
            © {new Date().getFullYear()} {siteConfig.author}
          </p>
          <p className="text-[11px] text-[#a8a29e] font-mono">
            Statically generated · Zero runtime cost
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
