import React, { useState } from 'react';
import { Copy, Check, ShieldCheck, Sparkles, SlidersHorizontal } from 'lucide-react';

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

export const ColorPaletteMatrix: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showRamps, setShowRamps] = useState(false);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1800);
    });
  };

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
              Extended chromatic steps defined in{' '}
              <code className="text-amber-400">tokens/tailwind.config.js</code> and{' '}
              <code className="text-amber-400">tokens/colors.json</code>.
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
    </div>
  );
};

export default ColorPaletteMatrix;

