import React, { useState } from 'react';
import OllieMascot, { type OllieMascotProps } from './OllieMascot';
import { Download, Copy, Check, Eye } from 'lucide-react';

interface AssetVariant {
  id: OllieMascotProps['variant'];
  title: string;
  filename: string;
  badge: string;
  description: string;
  dimensions: string;
}

const variants: AssetVariant[] = [
  {
    id: 'primary',
    title: 'Primary Square Emblem',
    filename: 'broadsage_logo_primary.svg',
    badge: 'Master Mark',
    description: 'Documentation landing pages, product packaging, app launcher icon.',
    dimensions: '200 × 200 (Square)',
  },
  {
    id: 'avatar',
    title: 'Circular Avatar Badge',
    filename: 'broadsage_logo_avatar.svg',
    badge: 'Profile Standard',
    description: 'GitHub Organization profile, Twitter/X icon, Discord, and Slack workspace.',
    dimensions: '160 × 160 (Circular)',
  },
  {
    id: 'horizontal',
    title: 'Horizontal Wordmark (Dark Theme)',
    filename: 'broadsage_logo_horizontal.svg',
    badge: 'Navigation Standard',
    description: 'Web navigation headers, README hero banners, and corporate presentation titles.',
    dimensions: '440 × 120 (Wide)',
  },
  {
    id: 'horizontal-light',
    title: 'Horizontal Wordmark (Light Theme)',
    filename: 'broadsage_logo_horizontal_light.svg',
    badge: 'Light Backgrounds',
    description: 'Light documents, whitepapers, press releases, and printed stationery.',
    dimensions: '440 × 120 (Wide)',
  },
];

type CanvasBg = 'navy' | 'white' | 'slate' | 'checkers';

export const AssetStudio: React.FC = () => {
  const [selectedVariant, setSelectedVariant] = useState<OllieMascotProps['variant']>('primary');
  const [canvasBg, setCanvasBg] = useState<CanvasBg>('navy');
  const [copiedCode, setCopiedCode] = useState(false);
  const [exporting, setExporting] = useState<number | null>(null);

  const currentAsset = variants.find((v) => v.id === selectedVariant) || variants[0];

  const handleCopySvg = () => {
    const svgElem = document.getElementById(`studio-svg-${selectedVariant}`);
    if (!svgElem) return;
    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svgElem);
    if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
      source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    navigator.clipboard.writeText(source).then(() => {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    });
  };

  const handleDownloadSvg = () => {
    const svgElem = document.getElementById(`studio-svg-${selectedVariant}`);
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
    a.download = currentAsset.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPng = (targetSize: number) => {
    const svgElem = document.getElementById(`studio-svg-${selectedVariant}`);
    if (!svgElem) return;
    setExporting(targetSize);

    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svgElem);
    if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
      source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }

    const svgBlob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();

    img.onload = () => {
      let width = targetSize;
      let height = targetSize;
      if (selectedVariant === 'horizontal' || selectedVariant === 'horizontal-light') {
        height = Math.round(targetSize * (120 / 440));
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        if (!blob) return;
        const pngUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const baseName = currentAsset.filename.replace('.svg', '');
        a.href = pngUrl;
        a.download = `${baseName}_${width}x${height}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(pngUrl);
        URL.revokeObjectURL(url);
        setExporting(null);
      }, 'image/png');
    };

    img.src = url;
  };

  const getCanvasBgClass = () => {
    switch (canvasBg) {
      case 'white':
        return 'bg-white border-slate-300';
      case 'slate':
        return 'bg-[#1E293B] border-slate-700';
      case 'checkers':
        return 'bg-[#0f172a] bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] border-slate-800';
      case 'navy':
      default:
        return 'bg-[#0A1128] border-slate-800';
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Variant Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {variants.map((v) => {
          const isActive = selectedVariant === v.id;
          return (
            <button
              key={v.id}
              onClick={() => setSelectedVariant(v.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              <span>{v.title}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider ${
                  isActive ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {v.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Studio Card */}
      <div className="glass-panel overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-b from-slate-900/90 to-[#0A1128]/95 shadow-2xl">
        {/* Studio Canvas Stage */}
        <div className="relative p-6 sm:p-12 flex items-center justify-center min-h-[300px] sm:min-h-[360px] overflow-hidden">
          {/* Background Contrast Bar Controls */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md p-1.5 rounded-xl border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 px-2 flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-amber-400" /> Canvas:
            </span>
            <button
              onClick={() => setCanvasBg('navy')}
              className={`w-6 h-6 rounded-lg bg-[#0A1128] border transition-transform ${
                canvasBg === 'navy' ? 'border-amber-400 scale-110 shadow-sm' : 'border-slate-700'
              }`}
              title="Midnight Navy (#0A1128)"
            />
            <button
              onClick={() => setCanvasBg('white')}
              className={`w-6 h-6 rounded-lg bg-white border transition-transform ${
                canvasBg === 'white' ? 'border-amber-400 scale-110 shadow-sm' : 'border-slate-400'
              }`}
              title="Crisp Snow White (#FFFFFF)"
            />
            <button
              onClick={() => setCanvasBg('slate')}
              className={`w-6 h-6 rounded-lg bg-[#1E293B] border transition-transform ${
                canvasBg === 'slate' ? 'border-amber-400 scale-110 shadow-sm' : 'border-slate-700'
              }`}
              title="Terminal Slate (#1E293B)"
            />
            <button
              onClick={() => setCanvasBg('checkers')}
              className={`w-6 h-6 rounded-lg bg-slate-800 border bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:6px_6px] transition-transform ${
                canvasBg === 'checkers' ? 'border-amber-400 scale-110 shadow-sm' : 'border-slate-700'
              }`}
              title="Transparent Grid"
            />
          </div>

          {/* Dynamic Interactive SVG Canvas */}
          <div
            className={`w-full max-w-lg p-6 sm:p-10 rounded-2xl border transition-colors flex items-center justify-center shadow-inner ${getCanvasBgClass()}`}
          >
            <div className="w-full max-w-[340px] drop-shadow-2xl">
              <OllieMascot
                id={`studio-svg-${selectedVariant}`}
                variant={selectedVariant}
                size="100%"
              />
            </div>
          </div>
        </div>

        {/* Studio Info & Action Bar */}
        <div className="p-5 sm:p-6 bg-slate-950/80 border-t border-slate-800/80 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <div className="flex items-center gap-2.5">
              <h4 className="text-base sm:text-lg font-bold text-white">{currentAsset.title}</h4>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700">
                {currentAsset.dimensions}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              {currentAsset.description}
            </p>
          </div>

          {/* Export Action Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Copy SVG XML Button */}
            <button
              onClick={handleCopySvg}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800/90 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 transition-all hover:border-amber-500/50"
            >
              {copiedCode ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Copied XML!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Copy SVG Code</span>
                </>
              )}
            </button>

            {/* Direct Vector SVG Download */}
            <button
              onClick={handleDownloadSvg}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-sky-950/60 hover:bg-sky-900/80 text-sky-300 text-xs font-bold border border-sky-800/80 transition-all"
            >
              <Download className="w-4 h-4 text-sky-400" />
              <span>SVG Vector</span>
            </button>

            {/* PNG Multi-Resolution Rasterizer Dropdown Buttons */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
              <span className="text-[10px] font-bold text-slate-500 px-1 uppercase tracking-wider">
                PNG:
              </span>
              {[256, 512, 1024, 2048].map((px) => (
                <button
                  key={px}
                  onClick={() => handleDownloadPng(px)}
                  disabled={exporting !== null}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 text-[11px] font-mono font-semibold transition-colors disabled:opacity-50"
                  title={`Download high-resolution rasterized PNG at ${px}px width`}
                >
                  {exporting === px ? '...' : `${px}`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetStudio;
