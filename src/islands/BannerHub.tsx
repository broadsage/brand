import React, { useState } from 'react';
import { Copy, Check, Download, ExternalLink, Image as ImageIcon } from 'lucide-react';

interface BannerItem {
  id: string;
  title: string;
  filename: string;
  badge: string;
  badgeColor: string;
  description: string;
  aspect: string;
}

const bannerList: BannerItem[] = [
  {
    id: 'github-welcome',
    title: 'GitHub Organization Hero Welcome Banner',
    filename: 'github-welcome.png',
    badge: 'Hero README',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    description: 'Header banner for github.com/broadsage profile and master DPE platform repositories.',
    aspect: 'Wide Hero (1280 × 640)',
  },
  {
    id: 'official',
    title: 'Tier 1 Official Broadsage Repository',
    filename: 'official.png',
    badge: 'Core Production',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    description: 'Maintained and officially hardened by Broadsage.',
    aspect: 'Status Badge (800 × 200)',
  },
  {
    id: 'incubator',
    title: 'Broadsage Incubator Project',
    filename: 'incubator.png',
    badge: 'Experimental',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    description: 'Autonomous agentic AI experiments, candidate libraries, and emerging DPE scaffolds.',
    aspect: 'Status Badge (800 × 200)',
  },
  {
    id: 'community',
    title: 'Broadsage Ecosystem Community Contributed',
    filename: 'community.png',
    badge: 'Ecosystem',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    description: 'Third-party integrations, community plugins, and open-source ecosystem tools.',
    aspect: 'Status Badge (800 × 200)',
  },
  {
    id: 'obsolete',
    title: 'Archived / Deprecated Repository',
    filename: 'obsolete.png',
    badge: 'Archived',
    badgeColor: 'bg-red-500/20 text-red-300 border-red-500/40',
    description: 'Superseded repositories, legacy toolchains, or migrated architectures.',
    aspect: 'Status Badge (800 × 200)',
  },
];

export const BannerHub: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyMarkdown = (banner: BannerItem) => {
    const md = `[![${banner.title}](https://brand.broadsage.com/banners/${banner.filename})](https://broadsage.com)`;
    navigator.clipboard.writeText(md).then(() => {
      setCopiedKey(`${banner.id}-md`);
      setTimeout(() => setCopiedKey(null), 1800);
    });
  };

  const copyHtml = (banner: BannerItem) => {
    const html = `<img src="https://brand.broadsage.com/banners/${banner.filename}" alt="${banner.title}" width="100%" />`;
    navigator.clipboard.writeText(html).then(() => {
      setCopiedKey(`${banner.id}-html`);
      setTimeout(() => setCopiedKey(null), 1800);
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bannerList.map((banner) => (
          <div
            key={banner.id}
            className={`glass-panel overflow-hidden rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between ${
              banner.id === 'github-welcome' ? 'md:col-span-2' : ''
            }`}
          >
            {/* Banner Preview Canvas */}
            <div className="p-4 sm:p-6 bg-[#050814] border-b border-slate-800/80 flex items-center justify-center">
              <img
                src={`/banners/${banner.filename}`}
                alt={banner.title}
                className="rounded-lg shadow-xl max-h-56 w-auto object-contain"
                loading="lazy"
              />
            </div>

            {/* Banner Details & Snippet Generators */}
            <div className="p-5 space-y-4 bg-[#0A1128]/95">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${banner.badgeColor}`}
                    >
                      {banner.badge}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">{banner.aspect}</span>
                  </div>
                  <h4 className="text-base font-bold text-white">{banner.title}</h4>
                </div>
              </div>

              <p className="text-xs text-slate-400">{banner.description}</p>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {/* Copy Markdown */}
                  <button
                    onClick={() => copyMarkdown(banner)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
                  >
                    {copiedKey === `${banner.id}-md` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied MD!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy Markdown</span>
                      </>
                    )}
                  </button>

                  {/* Copy HTML */}
                  <button
                    onClick={() => copyHtml(banner)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
                  >
                    {copiedKey === `${banner.id}-html` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied HTML!</span>
                      </>
                    ) : (
                      <span>Copy HTML</span>
                    )}
                  </button>
                </div>

                {/* Direct Download */}
                <a
                  href={`/banners/${banner.filename}`}
                  download={banner.filename}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold border border-amber-500/40 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PNG</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerHub;

