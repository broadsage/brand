import React, { useState, useMemo } from 'react';
import { Copy, Check, SlidersHorizontal, Code2, Terminal, FileCode, Braces, ChevronDown, ChevronUp } from 'lucide-react';

interface ColorDefinition {
  name: string;
  role: string;
  hex: string;
  rgb: string;
  cmyk: string;
  pantone: string;
  hsl: string;
  wcag: string;
  wcagBadge: string;
  usage: string;
  textLight?: boolean;
}

// Single Source of Truth for Master Colors
const masterColors: ColorDefinition[] = [
  {
    name: 'Midnight Navy',
    role: 'Base Canvas & Security',
    hex: '#0A1128',
    rgb: '10, 17, 40',
    cmyk: '75, 58, 0, 84',
    pantone: '282 C',
    hsl: '226°, 60%, 10%',
    wcag: 'Canvas Base',
    wcagBadge: 'Foundation',
    usage: 'Primary dark background canvas, enterprise security, terminal foundation.',
    textLight: true,
  },
  {
    name: 'Solar Gold Amber',
    role: 'Sage Guidance & Beacon',
    hex: '#F59E0B',
    rgb: '245, 158, 11',
    cmyk: '0, 35, 96, 4',
    pantone: '130 C',
    hsl: '38°, 92%, 50%',
    wcag: '8.4:1 vs Navy',
    wcagBadge: 'AAA Pass',
    usage: 'Core brand accent, Sage Guidance belly beacon, active states, key CTAs.',
    textLight: false,
  },
  {
    name: 'Solar Light Gold',
    role: 'Precision & Telemetry Iris',
    hex: '#FCD34D',
    rgb: '252, 211, 77',
    cmyk: '0, 16, 69, 1',
    pantone: '120 C',
    hsl: '46°, 97%, 65%',
    wcag: '12.6:1 vs Navy',
    wcagBadge: 'AAA Pass',
    usage: 'Owl eyes, irises, beak glint, hover accents, telemetry signals.',
    textLight: false,
  },
  {
    name: 'Cloud Azure',
    role: 'Broad Vision & Cloud Mesh',
    hex: '#0284C7',
    rgb: '2, 132, 199',
    cmyk: '99, 34, 0, 22',
    pantone: '2174 C',
    hsl: '200°, 98%, 39%',
    wcag: '4.9:1 vs Navy',
    wcagBadge: 'AA Large',
    usage: 'Broad Vision ear crest, cloud infrastructure links, info badges.',
    textLight: true,
  },
  {
    name: 'Crisp Snow White',
    role: 'Precision Anchor & Frame',
    hex: '#FFFFFF',
    rgb: '255, 255, 255',
    cmyk: '0, 0, 0, 0',
    pantone: 'Opaque White',
    hsl: '0°, 0%, 100%',
    wcag: '18.7:1 vs Navy',
    wcagBadge: 'AAA Pass',
    usage: 'Primary heading typography, sensor bridge, code chevron marks.',
    textLight: false,
  },
];

// Single Source of Truth for Tonal Ramps
const tonalRamps = {
  navy: [
    { token: 'navy-950', hex: '#050814' },
    { token: 'navy-900', hex: '#0A1128' },
    { token: 'navy-800', hex: '#101B3B' },
    { token: 'navy-700', hex: '#1E293B' },
    { token: 'navy-600', hex: '#334155' },
  ],
  gold: [
    { token: 'gold-300', hex: '#FCD34D' },
    { token: 'gold-400', hex: '#FBBF24' },
    { token: 'gold-500', hex: '#F59E0B' },
    { token: 'gold-600', hex: '#D97706' },
    { token: 'gold-700', hex: '#B45309' },
  ],
  azure: [
    { token: 'azure-400', hex: '#38BDF8' },
    { token: 'azure-500', hex: '#0284C7' },
    { token: 'azure-600', hex: '#0369A1' },
  ],
};

type TokenTab = 'tailwind-v4' | 'tailwind-v3' | 'css' | 'json';

export const ColorPaletteMatrix: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showRamps, setShowRamps] = useState(false);
  const [showTokens, setShowTokens] = useState(false);
  const [activeTokenTab, setActiveTokenTab] = useState<TokenTab>('tailwind-v4');

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1800);
    });
  };

  // Generate code token snippets dynamically from the single source of truth
  const snippets = useMemo(() => {
    // Tailwind v4 @theme CSS format
    const tailwindV4 = `@theme {
  /* Broadsage Palette 3 Tokens */
  --color-broadsage-navy-950: #050814;
  --color-broadsage-navy-900: #0A1128;
  --color-broadsage-navy-800: #101B3B;
  --color-broadsage-navy-700: #1E293B;

  --color-broadsage-gold-500: #F59E0B;
  --color-broadsage-gold-400: #FBBF24;
  --color-broadsage-gold-300: #FCD34D;
  --color-broadsage-gold-600: #D97706;

  --color-broadsage-azure-500: #0284C7;
  --color-broadsage-azure-400: #38BDF8;
  --color-broadsage-azure-600: #0369A1;

  --color-broadsage-white: #FFFFFF;
}`;

    // Tailwind v3 JS config format
    const tailwindV3 = `/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        broadsage: {
          navy: {
            950: '#050814',
            900: '#0A1128',
            800: '#101B3B',
            700: '#1E293B',
          },
          gold: {
            300: '#FCD34D',
            400: '#FBBF24',
            500: '#F59E0B',
            600: '#D97706',
          },
          azure: {
            400: '#38BDF8',
            500: '#0284C7',
            600: '#0369A1',
          },
        },
      },
    },
  },
};`;

    // Standard CSS Custom Properties
    const cssVars = `:root {
  /* Broadsage Foundation Canvas */
  --broadsage-navy-950: #050814;
  --broadsage-navy-900: #0A1128;
  --broadsage-navy-800: #101B3B;
  --broadsage-navy-700: #1E293B;

  /* Sage Guidance Beacons */
  --broadsage-gold-500: #F59E0B;
  --broadsage-gold-400: #FBBF24;
  --broadsage-gold-300: #FCD34D;
  --broadsage-gold-600: #D97706;

  /* Broad Vision Azure */
  --broadsage-azure-500: #0284C7;
  --broadsage-azure-400: #38BDF8;
  --broadsage-azure-600: #0369A1;

  /* Neutrals & Contrast */
  --broadsage-white: #FFFFFF;
  --broadsage-text-muted: #94A3B8;
}`;

    // Machine-readable JSON Design Tokens
    const jsonTokens = JSON.stringify(
      {
        broadsage: {
          navy: {
            950: { value: '#050814', type: 'color' },
            900: { value: '#0A1128', type: 'color' },
            800: { value: '#101B3B', type: 'color' },
            700: { value: '#1E293B', type: 'color' },
          },
          gold: {
            300: { value: '#FCD34D', type: 'color' },
            400: { value: '#FBBF24', type: 'color' },
            500: { value: '#F59E0B', type: 'color' },
            600: { value: '#D97706', type: 'color' },
          },
          azure: {
            400: { value: '#38BDF8', type: 'color' },
            500: { value: '#0284C7', type: 'color' },
            600: { value: '#0369A1', type: 'color' },
          },
          white: { value: '#FFFFFF', type: 'color' },
        },
      },
      null,
      2
    );

    return {
      'tailwind-v4': tailwindV4,
      'tailwind-v3': tailwindV3,
      css: cssVars,
      json: jsonTokens,
    };
  }, []);

  const activeSnippet = snippets[activeTokenTab];

  return (
    <div className="w-full space-y-8">
      {/* 5 Master Palette Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {masterColors.map((color, idx) => (
          <div
            key={color.hex}
            className="glass-panel overflow-hidden rounded-2xl border border-slate-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between group shadow-lg"
          >
            {/* Color Swatch Header Box */}
            <div
              className="h-28 p-3.5 flex flex-col justify-between relative shadow-inner"
              style={{ backgroundColor: color.hex }}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded backdrop-blur-md ${
                    color.textLight ? 'bg-black/40 text-white' : 'bg-white/80 text-slate-900'
                  }`}
                >
                  {color.wcagBadge}
                </span>
                <span
                  className={`text-[10px] font-mono ${
                    color.textLight ? 'text-white/80' : 'text-slate-900/80 font-bold'
                  }`}
                >
                  {color.wcag}
                </span>
              </div>
              <span
                className={`text-xs font-extrabold uppercase tracking-wider ${
                  color.textLight ? 'text-white' : 'text-slate-950'
                }`}
              >
                {color.role}
              </span>
            </div>

            {/* Details & Copy Rows */}
            <div className="p-4 space-y-3 bg-[#0A1128]/95 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-white mb-2">{color.name}</h4>

                <div className="space-y-1.5 font-mono text-xs">
                  {/* HEX Copy Row */}
                  <button
                    onClick={() => copyToClipboard(color.hex, `${idx}-hex`)}
                    className="w-full flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-800/80 text-slate-300 hover:text-amber-400 transition-colors group/row"
                  >
                    <span className="text-[11px] text-slate-500 uppercase font-sans">HEX</span>
                    <span className="font-semibold flex items-center gap-1.5">
                      {copiedKey === `${idx}-hex` ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <span>{color.hex}</span>
                          <Copy className="w-3 h-3 text-slate-600 group-hover/row:text-amber-400" />
                        </>
                      )}
                    </span>
                  </button>

                  {/* RGB Copy Row */}
                  <button
                    onClick={() => copyToClipboard(`rgb(${color.rgb})`, `${idx}-rgb`)}
                    className="w-full flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-800/80 text-slate-300 hover:text-amber-400 transition-colors group/row"
                  >
                    <span className="text-[11px] text-slate-500 uppercase font-sans">RGB</span>
                    <span className="flex items-center gap-1.5">
                      {copiedKey === `${idx}-rgb` ? (
                        <span className="text-emerald-400 font-sans">Copied!</span>
                      ) : (
                        <span>{color.rgb}</span>
                      )}
                    </span>
                  </button>

                  {/* Pantone Copy Row */}
                  <button
                    onClick={() => copyToClipboard(color.pantone, `${idx}-pantone`)}
                    className="w-full flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-800/80 text-slate-300 hover:text-amber-400 transition-colors group/row"
                  >
                    <span className="text-[11px] text-slate-500 uppercase font-sans">Pantone</span>
                    <span className="flex items-center gap-1.5 text-slate-400">
                      {copiedKey === `${idx}-pantone` ? (
                        <span className="text-emerald-400 font-sans">Copied!</span>
                      ) : (
                        <span>{color.pantone}</span>
                      )}
                    </span>
                  </button>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-800/80 leading-relaxed">
                {color.usage}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Tonal Ramps Toggle Section */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-amber-400" />
              Full Design Token Ramps (Navy, Gold, Azure)
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Extended chromatic steps for dark backgrounds, interactive hover states, and borders.
            </p>
          </div>
          <button
            onClick={() => setShowRamps(!showRamps)}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
          >
            {showRamps ? 'Hide Ramps' : 'Expand Full Ramps'}
          </button>
        </div>

        {showRamps && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-800/80">
            {/* Navy Ramp */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Navy Scale (Dark Foundation)
              </h5>
              <div className="space-y-1">
                {tonalRamps.navy.map((step) => (
                  <button
                    key={step.token}
                    onClick={() => copyToClipboard(step.hex, step.token)}
                    className="w-full flex items-center justify-between p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800 text-xs border border-slate-800/80 font-mono transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded border border-slate-700"
                        style={{ backgroundColor: step.hex }}
                      />
                      <span className="text-slate-300 font-sans">{step.token}</span>
                    </div>
                    <span className="text-amber-400">
                      {copiedKey === step.token ? 'Copied!' : step.hex}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Gold Ramp */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Gold Scale (Sage Guidance)
              </h5>
              <div className="space-y-1">
                {tonalRamps.gold.map((step) => (
                  <button
                    key={step.token}
                    onClick={() => copyToClipboard(step.hex, step.token)}
                    className="w-full flex items-center justify-between p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800 text-xs border border-slate-800/80 font-mono transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded border border-slate-700"
                        style={{ backgroundColor: step.hex }}
                      />
                      <span className="text-slate-300 font-sans">{step.token}</span>
                    </div>
                    <span className="text-amber-400">
                      {copiedKey === step.token ? 'Copied!' : step.hex}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Azure Ramp */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                Azure Scale (Broad Vision)
              </h5>
              <div className="space-y-1">
                {tonalRamps.azure.map((step) => (
                  <button
                    key={step.token}
                    onClick={() => copyToClipboard(step.hex, step.token)}
                    className="w-full flex items-center justify-between p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800 text-xs border border-slate-800/80 font-mono transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded border border-slate-700"
                        style={{ backgroundColor: step.hex }}
                      />
                      <span className="text-slate-300 font-sans">{step.token}</span>
                    </div>
                    <span className="text-amber-400">
                      {copiedKey === step.token ? 'Copied!' : step.hex}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Copyable Code Tokens Studio (Tailwind v4, Tailwind v3, CSS, JSON) */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden transition-all">
        {/* Code Header Bar with Expand / Collapse Toggle */}
        <div className="p-4 sm:p-5 bg-slate-900/90 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm sm:text-base font-bold text-white">
                  Copyable Code Tokens
                </h4>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700">
                  4 Frameworks
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Ready-to-use snippets for Tailwind v4 (@theme), Tailwind v3, CSS variables, and JSON
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowTokens(!showTokens)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <span>{showTokens ? 'Collapse Code Tokens' : 'Expand Code Tokens'}</span>
              {showTokens ? (
                <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>
          </div>
        </div>

        {/* Expandable Body */}
        {showTokens && (
          <div className="transition-all duration-300">
            {/* Format Selection Tabs & Copy Toolbar */}
            <div className="px-4 py-3 bg-[#060A19] border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
              {/* Format Selection Tabs */}
              <div className="flex items-center gap-1 p-1 bg-slate-950/80 rounded-xl border border-slate-800 text-xs font-semibold overflow-x-auto">
                <button
                  onClick={() => setActiveTokenTab('tailwind-v4')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    activeTokenTab === 'tailwind-v4'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Tailwind v4</span>
                </button>

                <button
                  onClick={() => setActiveTokenTab('tailwind-v3')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    activeTokenTab === 'tailwind-v3'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>Tailwind v3</span>
                </button>

                <button
                  onClick={() => setActiveTokenTab('css')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    activeTokenTab === 'css'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>CSS Variables</span>
                </button>

                <button
                  onClick={() => setActiveTokenTab('json')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    activeTokenTab === 'json'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Braces className="w-3.5 h-3.5" />
                  <span>JSON</span>
                </button>
              </div>

              {/* Quick Copy Button */}
              <button
                onClick={() => copyToClipboard(activeSnippet, `tab-${activeTokenTab}`)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold border border-amber-500/40 transition-colors shadow-sm"
                title="Copy snippet to clipboard"
              >
                {copiedKey === `tab-${activeTokenTab}` ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied Snippet!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Snippet</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Content Container */}
            <div className="p-4 sm:p-6 bg-[#040714] overflow-x-auto">
              <pre className="font-mono text-xs text-slate-300 leading-relaxed">
                <code>{activeSnippet}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorPaletteMatrix;
