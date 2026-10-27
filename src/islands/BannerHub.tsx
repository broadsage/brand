import React, { useState, useMemo } from 'react';
import { Copy, Check, Download, Layers, FolderGit2, Share2, Sparkles, FileCode } from 'lucide-react';

export type BannerCategory = 'all' | 'github' | 'social';

export interface BannerItem {
  id: string;
  category: 'github' | 'social';
  title: string;
  pngFilename: string;
  svgFilename: string;
  badge: string;
  badgeColor: string;
  platform: string;
  dimensions: string;
  aspect: string;
  description: string;
  usageRecommendation: string;
}

const bannerData: BannerItem[] = [
  // --- GITHUB ECOSYSTEM ---
  {
    id: 'github-welcome',
    category: 'github',
    title: 'GitHub Organization & README Hero Banner',
    pngFilename: 'github-welcome.png',
    svgFilename: 'broadsage_github_hero.svg',
    badge: 'Org & README Hero',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    platform: 'GitHub Profile & Repositories',
    dimensions: '1280 × 400',
    aspect: '16:5 Widescreen',
    description: 'Header hero banner for github.com/broadsage profile README and primary repository landing pages.',
    usageRecommendation: 'Place at the very top of your primary README.md file above the project heading.',
  },
  {
    id: 'github-repo-preview',
    category: 'github',
    title: 'GitHub Repository Social Preview Card',
    pngFilename: 'github-repo-preview.png',
    svgFilename: 'broadsage_repo_preview.svg',
    badge: 'Repo Social Preview',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    platform: 'GitHub Repository Settings',
    dimensions: '1280 × 640',
    aspect: '2:1 OpenGraph Card',
    description: 'Official 2:1 card for GitHub Settings → General → Social Preview image.',
    usageRecommendation: 'Upload in GitHub Repo Settings > General > Social preview to represent the repo across GitHub & Slack.',
  },
  {
    id: 'official',
    category: 'github',
    title: 'Tier 1 Official Broadsage Repository Badge',
    pngFilename: 'official.png',
    svgFilename: 'broadsage_status_official.svg',
    badge: 'Core Production',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    platform: 'GitHub Production Repos',
    dimensions: '800 × 200',
    aspect: '4:1 Status Banner',
    description: 'Designates mission-critical, enterprise-hardened repositories maintained by Broadsage Platform Engineering.',
    usageRecommendation: 'Embed at the top of verified production-grade repositories and core SDK scaffolds.',
  },
  {
    id: 'incubator',
    category: 'github',
    title: 'Broadsage Incubator Project Badge',
    pngFilename: 'incubator.png',
    svgFilename: 'broadsage_status_incubator.svg',
    badge: 'Experimental Lab',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    platform: 'GitHub Incubator Labs',
    dimensions: '800 × 200',
    aspect: '4:1 Status Banner',
    description: 'Designates autonomous agentic AI experiments, candidate libraries, and emerging DPE scaffolds.',
    usageRecommendation: 'Embed on active prototype, experimental, and RFC candidate repositories.',
  },
  {
    id: 'community',
    category: 'github',
    title: 'Broadsage Ecosystem Community Contributed',
    pngFilename: 'community.png',
    svgFilename: 'broadsage_status_community.svg',
    badge: 'Ecosystem & Community',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    platform: 'GitHub Community Plugins',
    dimensions: '800 × 200',
    aspect: '4:1 Status Banner',
    description: 'Designates open-source ecosystem tools, community plugins, and third-party integrations.',
    usageRecommendation: 'Use on partner repositories and community-contributed sidecars and extensions.',
  },
  {
    id: 'obsolete',
    category: 'github',
    title: 'Archived / Deprecated Repository Badge',
    pngFilename: 'obsolete.png',
    svgFilename: 'broadsage_status_obsolete.svg',
    badge: 'Archived & Retired',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    platform: 'GitHub Archived Repos',
    dimensions: '800 × 200',
    aspect: '4:1 Status Banner',
    description: 'Designates superseded repositories, legacy toolchains, or architectures migrated to modern standards.',
    usageRecommendation: 'Use on archived or superseded repositories to direct developers to modern platforms.',
  },

  // --- SOCIAL MEDIA SUITE ---
  {
    id: 'linkedin-cover',
    category: 'social',
    title: 'LinkedIn Company Profile Cover Banner',
    pngFilename: 'linkedin-cover.png',
    svgFilename: 'broadsage_linkedin_cover.svg',
    badge: 'LinkedIn Cover',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    platform: 'LinkedIn Company Page',
    dimensions: '1128 × 191',
    aspect: 'Exact Safe-Zone Spec',
    description: 'Calibrated LinkedIn Company header banner with avatar safe-zone offset on the left.',
    usageRecommendation: 'Upload to the Broadsage LinkedIn Company Page banner section.',
  },
  {
    id: 'twitter-header',
    category: 'social',
    title: 'X / Twitter Profile Header Banner',
    pngFilename: 'twitter-header.png',
    svgFilename: 'broadsage_twitter_header.svg',
    badge: 'X / Twitter Header',
    badgeColor: 'bg-slate-500/20 text-slate-300 border-slate-500/40',
    platform: 'X / Twitter Profile',
    dimensions: '1500 × 500',
    aspect: '3:1 Panoramic Header',
    description: 'Official 3:1 header for X/Twitter with avatar bottom-left clearance and right-aligned typography.',
    usageRecommendation: 'Upload as the official header on the Broadsage X / Twitter organization account.',
  },
  {
    id: 'og-share',
    category: 'social',
    title: 'Universal Open Graph Social Preview Card',
    pngFilename: 'og-share.png',
    svgFilename: 'broadsage_og_share.svg',
    badge: 'Universal OG Card',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    platform: 'Slack, Discord, LinkedIn & Web',
    dimensions: '1200 × 630',
    aspect: '1.91:1 Standard OG',
    description: 'High-contrast social share card for web meta tags (og:image / twitter:image) and unfurling.',
    usageRecommendation: 'Reference in <meta property="og:image" /> for high-DPI link sharing across all platforms.',
  },
];

export const BannerHub: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<BannerCategory>('all');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const filteredBanners = useMemo(() => {
    if (activeCategory === 'all') return bannerData;
    return bannerData.filter((b) => b.category === activeCategory);
  }, [activeCategory]);

  const copyMarkdown = (banner: BannerItem) => {
    const md = `[![${banner.title}](https://brand.broadsage.com/banners/${banner.pngFilename})](https://broadsage.com)`;
    navigator.clipboard.writeText(md).then(() => {
      setCopiedKey(`${banner.id}-md`);
      setTimeout(() => setCopiedKey(null), 1800);
    });
  };

  const copyHtml = (banner: BannerItem) => {
    const html = `<img src="https://brand.broadsage.com/banners/${banner.pngFilename}" alt="${banner.title}" width="100%" />`;
    navigator.clipboard.writeText(html).then(() => {
      setCopiedKey(`${banner.id}-html`);
      setTimeout(() => setCopiedKey(null), 1800);
    });
  };

  return (
    <div className="w-full space-y-8">
      {/* Category Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-2 bg-[#060A19]/80 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800/80">
          <button
            onClick={() => setActiveCategory('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeCategory === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>All Banners ({bannerData.length})</span>
          </button>

          <button
            onClick={() => setActiveCategory('github')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeCategory === 'github'
                ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>GitHub Ecosystem (6)</span>
          </button>

          <button
            onClick={() => setActiveCategory('social')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeCategory === 'social'
                ? 'bg-purple-500 text-slate-950 shadow-md shadow-purple-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>Social Media Suite (3)</span>
          </button>
        </div>

        {/* Global Standards Tag */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 font-mono pr-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Synced with Palette 3 (Solar Gold #F59E0B & Midnight Navy)</span>
        </div>
      </div>

      {/* Banners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredBanners.map((banner) => {
          const isWideHero = banner.id === 'github-welcome' || banner.id === 'github-repo-preview' || banner.id === 'twitter-header';

          return (
            <div
              key={banner.id}
              className={`glass-panel overflow-hidden rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between ${
                isWideHero ? 'md:col-span-2' : ''
              }`}
            >
              {/* Banner Visual Canvas */}
              <div className="p-4 sm:p-6 bg-[#040714] border-b border-slate-800/80 flex flex-col items-center justify-center relative group">
                <img
                  src={`/banners/${banner.pngFilename}`}
                  alt={banner.title}
                  className="rounded-lg shadow-2xl max-h-72 w-full object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                  loading="lazy"
                />

                {/* Subtle Floating Aspect Tag */}
                <div className="absolute top-4 right-4 flex items-center gap-2 opacity-90">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900/90 text-slate-300 border border-slate-700/80 backdrop-blur-sm shadow-sm">
                    {banner.dimensions}
                  </span>
                </div>
              </div>

              {/* Banner Details & Snippet Generators */}
              <div className="p-6 space-y-4 bg-[#0A1128]/95">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${banner.badgeColor}`}
                      >
                        {banner.badge}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {banner.platform} • {banner.aspect}
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-white">{banner.title}</h4>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{banner.description}</p>

                {/* Usage Advice */}
                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-2">
                  <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px]">Best Practice:</span>
                  <span>{banner.usageRecommendation}</span>
                </div>

                {/* Action Buttons Toolbar - Single Horizontal Line */}
                <div className="pt-3 border-t border-slate-800/80 grid grid-cols-4 gap-2">
                  {/* 1. Copy Markdown */}
                  <button
                    onClick={() => copyMarkdown(banner)}
                    className="flex items-center justify-center gap-1 px-2 py-2 rounded-lg bg-slate-800/90 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors whitespace-nowrap min-w-0"
                    title="Copy Markdown image embed snippet"
                  >
                    {copiedKey === `${banner.id}-md` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="text-emerald-400 truncate">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">
                          <span className="hidden xl:inline">Copy </span>Markdown
                        </span>
                      </>
                    )}
                  </button>

                  {/* 2. Copy HTML */}
                  <button
                    onClick={() => copyHtml(banner)}
                    className="flex items-center justify-center gap-1 px-2 py-2 rounded-lg bg-slate-800/90 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors whitespace-nowrap min-w-0"
                    title="Copy HTML image tag snippet"
                  >
                    {copiedKey === `${banner.id}-html` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="text-emerald-400 truncate">Copied!</span>
                      </>
                    ) : (
                      <>
                        <FileCode className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">
                          <span className="hidden xl:inline">Copy </span>HTML
                        </span>
                      </>
                    )}
                  </button>

                  {/* 3. SVG Vector */}
                  <a
                    href={`/banners/vector/${banner.svgFilename}`}
                    download={banner.svgFilename}
                    className="flex items-center justify-center gap-1 px-2 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 text-xs font-bold border border-sky-500/40 transition-colors whitespace-nowrap min-w-0"
                    title="Download infinite-resolution SVG vector source"
                  >
                    <Download className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">SVG Vector</span>
                  </a>

                  {/* 4. PNG */}
                  <a
                    href={`/banners/${banner.pngFilename}`}
                    download={banner.pngFilename}
                    className="flex items-center justify-center gap-1 px-2 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold border border-amber-500/40 transition-colors whitespace-nowrap min-w-0"
                    title={`Download high-DPI rasterized PNG (${banner.dimensions})`}
                  >
                    <Download className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">PNG</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BannerHub;
