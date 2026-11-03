import React, { useState } from 'react';
import OllieMascot, { type OllieMascotProps } from './OllieMascot';
import { Download, Copy, Check, Sparkles } from 'lucide-react';

interface LogoMarkSpec {
  id: OllieMascotProps['variant'];
  title: string;
  filename: string;
  badge: string;
  badgeColor: string;
  groundName: string;
  groundClass: string;
  previewContainerClass: string;
  dimensions: string;
  description: string;
  targetPngWidth: number;
}

const logoMarks: LogoMarkSpec[] = [
  {
    id: 'primary',
    title: 'Master Emblem',
    filename: 'broadsage_logo_primary.svg',
    badge: 'Master',
    badgeColor: 'dark:bg-amber-500/15 bg-amber-500/10 dark:text-amber-300 text-amber-700 dark:border-amber-500/30 border-amber-400/40',
    groundName: 'Midnight Navy',
    groundClass: 'bg-[#080D1E] border border-slate-800/90',
    previewContainerClass: 'w-20 h-20 sm:w-24 sm:h-24',
    dimensions: '200 × 200 (Square)',
    description: 'Master icon for app launchers, product packaging, and documentation landing headers.',
    targetPngWidth: 1024,
  },
  {
    id: 'avatar',
    title: 'Avatar Badge',
    filename: 'broadsage_logo_avatar.svg',
    badge: 'Profile',
    badgeColor: 'dark:bg-sky-500/15 bg-sky-500/10 dark:text-sky-300 text-sky-700 dark:border-sky-500/30 border-sky-400/40',
    groundName: 'Obsidian Slate',
    groundClass: 'bg-[#050814] border border-slate-800/90',
    previewContainerClass: 'w-20 h-20 sm:w-24 sm:h-24',
    dimensions: '160 × 160 (Circular)',
    description: 'Enclosed circular mark for GitHub Org, Twitter/X, Discord, and Slack workspaces.',
    targetPngWidth: 1024,
  },
  {
    id: 'horizontal',
    title: 'Wordmark (Dark)',
    filename: 'broadsage_logo_horizontal.svg',
    badge: 'Dark Theme',
    badgeColor: 'dark:bg-emerald-500/15 bg-emerald-500/10 dark:text-emerald-300 text-emerald-700 dark:border-emerald-500/30 border-emerald-400/40',
    groundName: 'Native Dark',
    groundClass: 'bg-[#0A1128] border border-slate-800/90',
    previewContainerClass: 'w-full max-w-[210px] sm:max-w-[230px]',
    dimensions: '440 × 120 (Wide)',
    description: 'Primary two-tone lockup (White + Solar Gold) for dark headers, decks, and banners.',
    targetPngWidth: 2048,
  },
  {
    id: 'horizontal-light',
    title: 'Wordmark (Light)',
    filename: 'broadsage_logo_horizontal_light.svg',
    badge: 'Light Theme',
    badgeColor: 'dark:bg-orange-500/15 bg-orange-500/10 dark:text-orange-300 text-orange-700 dark:border-orange-500/30 border-orange-400/40',
    groundName: 'Pure White',
    groundClass: 'bg-[#FFFFFF] border border-slate-300 shadow-inner',
    previewContainerClass: 'w-full max-w-[210px] sm:max-w-[230px]',
    dimensions: '440 × 120 (Wide)',
    description: 'High-contrast monochrome dark lettering for light web themes, press, and print.',
    targetPngWidth: 2048,
  },
];

export const AssetStudio: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [exportingKey, setExportingKey] = useState<string | null>(null);

  const handleCopySvg = (markId: string) => {
    const svgElem = document.getElementById(`mark-svg-${markId}`);
    if (!svgElem) return;
    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svgElem);
    if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
      source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    navigator.clipboard.writeText(source).then(() => {
      setCopiedKey(markId);
      setTimeout(() => setCopiedKey(null), 2000);
    });
  };

  const handleDownloadSvg = (markId: string, filename: string) => {
    const svgElem = document.getElementById(`mark-svg-${markId}`);
    if (!svgElem) return;
    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svgElem);
    if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
      source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPng = (mark: LogoMarkSpec) => {
    const svgElem = document.getElementById(`mark-svg-${mark.id}`);
    if (!svgElem) return;
    setExportingKey(mark.id);

    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svgElem);
    if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
      source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }

    const svgBlob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();

    img.onload = () => {
      const targetWidth = mark.targetPngWidth;
      let targetHeight = targetWidth;
      if (mark.id === 'horizontal' || mark.id === 'horizontal-light') {
        targetHeight = Math.round(targetWidth * (120 / 440));
      }

      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setExportingKey(null);
        return;
      }
      ctx.clearRect(0, 0, targetWidth, targetHeight);
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      canvas.toBlob((blob) => {
        if (!blob) {
          setExportingKey(null);
          return;
        }
        const pngUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const baseName = mark.filename.replace('.svg', '');
        a.href = pngUrl;
        a.download = `${baseName}_${targetWidth}x${targetHeight}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(pngUrl);
        URL.revokeObjectURL(url);
        setExportingKey(null);
      }, 'image/png');
    };

    img.onerror = () => {
      setExportingKey(null);
      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  return (
    <div className="space-y-6">
      {/* 4-Column Responsive Contextual Logo Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        {logoMarks.map((mark) => {
          const isCopied = copiedKey === mark.id;
          const isExporting = exportingKey === mark.id;

          return (
            <div
              key={mark.id}
              className="glass-panel rounded-2xl border dark:border-slate-800/80 border-[#E6DED2] hover:border-amber-500/40 transition-all duration-300 flex flex-col overflow-hidden shadow-lg hover:shadow-xl hover:shadow-amber-500/5 group"
            >
              {/* Compact Card Header */}
              <div className="px-4 py-3 border-b dark:border-slate-800/80 border-[#E6DED2] dark:bg-slate-900/60 bg-[#FAF8F5] flex items-center justify-between gap-2 flex-shrink-0">
                <div className="space-y-0.5 min-w-0">
                  <h3 className="text-sm font-bold dark:text-white text-[#0A1128] tracking-tight truncate">
                    {mark.title}
                  </h3>
                  <p className="text-[10px] dark:text-slate-400 text-slate-500 font-mono">
                    {mark.dimensions}
                  </p>
                </div>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider border flex-shrink-0 ${mark.badgeColor}`}>
                  {mark.badge}
                </span>
              </div>

              {/* Native Contextual Canvas Viewport */}
              <div className="flex-1 p-3.5 sm:p-4 flex flex-col items-center justify-center relative min-h-[175px] sm:min-h-[190px] dark:bg-gradient-to-b dark:from-slate-950/60 dark:to-slate-900/40 bg-gradient-to-b from-[#F5EFE6]/70 to-[#FAF8F5]/50">
                {/* Surface Ground Showcase Chamber */}
                <div className={`w-full h-full min-h-[125px] sm:min-h-[135px] p-3 sm:p-4 rounded-xl ${mark.groundClass} ${mark.id !== 'horizontal-light' ? 'preserve-dark' : ''} flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.03] shadow-md relative`}>
                  <div className={mark.previewContainerClass}>
                    <OllieMascot
                      id={`mark-svg-${mark.id}`}
                      variant={mark.id}
                      size="100%"
                    />
                  </div>
                </div>

                {/* Ground Pill Tag */}
                <span className="mt-2 text-[9px] font-mono font-medium tracking-wider uppercase px-2 py-0.5 rounded-full dark:bg-slate-900/90 dark:border-slate-800 dark:text-slate-400 bg-[#FAF8F5] border border-[#DBD1C2] text-slate-700 shadow-2xs">
                  Ground: <strong className="dark:text-slate-300 text-slate-800">{mark.groundName}</strong>
                </span>
              </div>

              {/* Card Footer: Metadata & 1-Click Actions */}
              <div className="p-3.5 sm:p-4 dark:bg-slate-900/60 bg-[#FAF8F5] border-t dark:border-slate-800/80 border-[#E6DED2] space-y-3 flex-shrink-0">
                <p className="text-[11px] dark:text-slate-300 text-slate-600 leading-snug min-h-[32px] line-clamp-2">
                  {mark.description}
                </p>

                {/* Action Buttons Row */}
                <div className="grid grid-cols-3 gap-1.5 pt-0.5">
                  {/* Action 1: Copy SVG */}
                  <button
                    onClick={() => handleCopySvg(mark.id)}
                    className="inline-flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-700 bg-white hover:bg-[#FAF8F5] text-[#0A1128] border border-[#DBD1C2] hover:border-amber-500/40 font-semibold text-[11px] transition-all active:scale-95 shadow-2xs"
                    title="Copy inline SVG XML code to clipboard"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-amber-500 dark:text-amber-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  {/* Action 2: Download SVG */}
                  <button
                    onClick={() => handleDownloadSvg(mark.id, mark.filename)}
                    className="inline-flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-700 bg-white hover:bg-[#FAF8F5] text-[#0A1128] border border-[#DBD1C2] hover:border-sky-500/40 font-semibold text-[11px] transition-all active:scale-95 shadow-2xs"
                    title={`Download vector file ${mark.filename}`}
                  >
                    <Download className="w-3 h-3 text-sky-500 dark:text-sky-400" />
                    <span>SVG</span>
                  </button>

                  {/* Action 3: Download High-DPI PNG */}
                  <button
                    onClick={() => handleDownloadPng(mark)}
                    disabled={isExporting}
                    className="inline-flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-700 bg-white hover:bg-[#FAF8F5] text-[#0A1128] border border-[#DBD1C2] hover:border-emerald-500/40 font-semibold text-[11px] transition-all active:scale-95 shadow-2xs disabled:opacity-50"
                    title={`Export high-resolution raster PNG (${mark.targetPngWidth}px)`}
                  >
                    {isExporting ? (
                      <span className="text-emerald-400 font-mono text-[10px] animate-pulse">...</span>
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
                        <span>PNG</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 1-Click Brand Kit Banner */}
      <div className="p-4 sm:p-5 rounded-2xl theme-banner-gradient border border-amber-500/25 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold dark:text-white text-[#0A1128]">Need the Entire Brand Kit at Once?</h4>
            <p className="text-xs dark:text-slate-400 text-slate-600">
              Download all 4 production marks, status banners, tokens, and press guidelines in a single archive.
            </p>
          </div>
        </div>

        <a
          href="/broadsage-brand-assets.zip"
          download="broadsage-brand-assets.zip"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all hover:scale-105 whitespace-nowrap"
        >
          <span>Download Brand Kit (ZIP)</span>
          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-950/20">1.10 MB</span>
        </a>
      </div>
    </div>
  );
};

export default AssetStudio;
