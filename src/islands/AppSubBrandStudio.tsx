import React, { useState } from 'react';
import OllieMascot from './OllieMascot';
import { Copy, Check, Sparkles, Layers, Box, Terminal, Cpu, LayoutGrid, Download } from 'lucide-react';
import { useClipboard } from '../utils/useClipboard';
import { downloadSvgElement, exportSvgToPng } from '../utils/svgExport';

interface AppSpec {
  id: string;
  name: string;
  category: string;
  icon: typeof Box;
  accentColor: string;
  description: string;
}

const APPS: AppSpec[] = [
  {
    id: 'control',
    name: 'Control',
    category: 'Agentic Orchestration',
    icon: Cpu,
    accentColor: '#38BDF8',
    description: 'Autonomous multi-agent platform orchestrator and deployment loop coordinator.',
  },
  {
    id: 'runtime',
    name: 'Runtime',
    category: 'Application Infrastructure',
    icon: Box,
    accentColor: '#F59E0B',
    description: 'Hardened, sovereign container execution engine with zero vendor telemetry.',
  },
  {
    id: 'mesh',
    name: 'Mesh',
    category: 'Distributed Telemetry',
    icon: Layers,
    accentColor: '#10B981',
    description: 'High-throughput OpenTelemetry and ClickHouse streaming service fabric.',
  },
  {
    id: 'studio',
    name: 'Studio',
    category: 'Developer Experience',
    icon: LayoutGrid,
    accentColor: '#A855F7',
    description: 'Standardized golden paths, interactive architecture modeling, and IDE plugins.',
  },
  {
    id: 'cli',
    name: 'CLI',
    category: 'Terminal Toolchain',
    icon: Terminal,
    accentColor: '#F43F5E',
    description: 'Unified command-line developer interface for sovereign local-to-cloud workflows.',
  },
];

export const AppSubBrandStudio: React.FC = () => {
  const [selectedApp, setSelectedApp] = useState<AppSpec>(APPS[0]);
  const [customName, setCustomName] = useState<string>('');
  const [isExportingPng, setIsExportingPng] = useState<boolean>(false);
  const { copiedKey, copy } = useClipboard({ timeoutMs: 2000 });

  const activeAppName = customName.trim() ? customName.trim() : selectedApp.name;
  const safeFilenamePart = activeAppName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '') || 'app';

  const handleCopySvg = () => {
    const svgElem = document.getElementById('app-lockup-preview') as SVGElement | null;
    if (!svgElem) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgElem);
    copy(source, 'app-lockup');
  };

  const handleDownloadSvg = () => {
    const svgElem = document.getElementById('app-lockup-preview') as SVGElement | null;
    if (!svgElem) return;
    const filename = `broadsage_${safeFilenamePart}_lockup.svg`;
    downloadSvgElement(svgElem, filename);
  };

  const handleDownloadPng = async () => {
    const svgElem = document.getElementById('app-lockup-preview') as SVGElement | null;
    if (!svgElem) return;
    setIsExportingPng(true);

    const targetWidth = 2160;
    const targetHeight = 400;
    const filename = `broadsage_${safeFilenamePart}_lockup_${targetWidth}x${targetHeight}.png`;

    try {
      await exportSvgToPng(svgElem, targetWidth, targetHeight, filename);
    } catch (err) {
      console.error('App lockup PNG export failed:', err);
    } finally {
      setIsExportingPng(false);
    }
  };

  return (
    <div className="glass-panel theme-card-gradient p-4 sm:p-6 rounded-2xl border border-sky-500/25 shadow-xl space-y-4 sm:space-y-5">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b dark:border-slate-800/80 border-ivory-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full dark:bg-sky-500/10 bg-sky-50 dark:text-sky-400 text-sky-800 border dark:border-sky-500/30 border-sky-300 text-[10px] font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" /> Application Architecture
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Lockup Spec</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold dark:text-white text-navy-900">
            Enterprise Application Sub-Brand System
          </h3>
        </div>

        <p className="text-xs dark:text-slate-400 text-slate-600 max-w-md">
          Standardized lockup formula for all software applications developed by Broadsage.
        </p>
      </div>

      {/* Main Interactive Lockup Stage */}
      <div className="p-4 sm:p-6 rounded-xl bg-[#080D1E] border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
        {/* Ambient subtle glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30 transition-all duration-500"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${selectedApp.accentColor}25, transparent 70%)`,
          }}
          aria-hidden="true"
        />

        {/* Live SVG Vector Lockup */}
        <svg
          id="app-lockup-preview"
          viewBox="0 0 540 100"
          className="w-full max-w-xl h-auto relative z-10"
        >
          {/* Subtle Frame */}
          <rect width="540" height="100" rx="20" fill="#0A1128" stroke="#1E293B" strokeWidth="1.5" />

          {/* Ollie Mascot Emblem (Scaled) */}
          <g transform="translate(56, 50) scale(0.38)">
            <polygon points="-48,-66 -22,-32 -54,-32" fill="#0284C7" />
            <polygon points="48,-66 22,-32 54,-32" fill="#F59E0B" />
            <ellipse cx="0" cy="8" rx="56" ry="62" fill="#101B3B" stroke="#1E293B" strokeWidth="2" />
            <ellipse cx="0" cy="22" rx="32" ry="40" fill="#F59E0B" />
            <path d="M-12,12 L0,20 L12,12" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M-14,26 L0,34 L14,26" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
            <circle cx="-22" cy="-18" r="19" fill="#082F49" stroke="#0284C7" strokeWidth="4" />
            <circle cx="-22" cy="-18" r="12" fill="#F59E0B" />
            <circle cx="-25" cy="-21" r="4.5" fill="#FFFFFF" />
            <circle cx="22" cy="-18" r="19" fill="#451A03" stroke="#F59E0B" strokeWidth="4" />
            <circle cx="22" cy="-18" r="12" fill="#F59E0B" />
            <circle cx="19" cy="-21" r="4.5" fill="#FFFFFF" />
            <rect x="-6" y="-20" width="12" height="4" rx="2" fill="#FFFFFF" />
            <polygon points="0,-6 7,8 0,14 -7,8" fill="#FDE68A" />
            <ellipse cx="-16" cy="70" rx="7" ry="4" fill="#FBBF24" />
            <ellipse cx="16" cy="70" rx="7" ry="4" fill="#FBBF24" />
          </g>

          {/* Master Brand Typography: BROADSAGE */}
          <text
            x="102"
            y="59"
            fill="#FFFFFF"
            fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
            fontSize="26"
            fontWeight="800"
            letterSpacing="-0.5"
          >
            BROAD<tspan fill="#F59E0B">SAGE</tspan>
          </text>

          {/* Structural Hairline Divider */}
          <line x1="284" y1="32" x2="284" y2="68" stroke="#334155" strokeWidth="1.5" />

          {/* Application Name */}
          <text
            x="302"
            y="59"
            fill="#FFFFFF"
            fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
            fontSize="24"
            fontWeight="500"
            letterSpacing="0.5"
          >
            {activeAppName}
          </text>
        </svg>

        {/* Lockup Actions Bar (Download PNG, Download SVG, Copy SVG) */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 relative z-10">
          {/* Download 2160px High-DPI PNG */}
          <button
            onClick={handleDownloadPng}
            disabled={isExportingPng}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            title={`Download ${activeAppName} Lockup as 2160×400 High-DPI PNG`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExportingPng ? 'Rendering PNG...' : 'Download PNG (2160px)'}</span>
          </button>

          {/* Download Vector SVG */}
          <button
            onClick={handleDownloadSvg}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg dark:bg-slate-800 dark:hover:bg-slate-700 bg-white hover:bg-ivory-50 text-navy-900 dark:text-slate-200 border dark:border-slate-700 border-ivory-400 text-xs font-semibold transition-all hover:scale-[1.02] active:scale-95 shadow-xs"
            title={`Download ${activeAppName} Vector Lockup (SVG)`}
          >
            <Download className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
            <span>Download SVG</span>
          </button>

          {/* Copy SVG Markup */}
          <button
            onClick={handleCopySvg}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg dark:bg-slate-800 dark:hover:bg-slate-700 bg-white hover:bg-ivory-50 text-navy-900 dark:text-slate-200 border dark:border-slate-700 border-ivory-400 text-xs font-semibold transition-all hover:scale-[1.02] active:scale-95 shadow-xs"
            title="Copy SVG markup to clipboard"
          >
            {copiedKey === 'app-lockup' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Copied SVG!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                <span>Copy SVG</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Application Selector Tabs */}
      <div className="space-y-2">
        <p className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">
          Select Broadsage Application Suite:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {APPS.map((app) => {
            const isSelected = selectedApp.id === app.id && !customName;
            const IconComponent = app.icon;

            return (
              <button
                key={app.id}
                onClick={() => {
                  setSelectedApp(app);
                  setCustomName('');
                }}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'dark:bg-slate-800 bg-white border-amber-500 shadow-md scale-[1.02]'
                    : 'dark:bg-slate-900/60 bg-ivory-50 border-ivory-border dark:border-slate-800/80 hover:border-amber-500/40'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div
                    className="w-6 h-6 rounded-md flex items-center justify-center text-xs"
                    style={{ backgroundColor: `${app.accentColor}20`, color: app.accentColor }}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-bold text-xs dark:text-white text-navy-900">{app.name}</span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-tight">
                  {app.category}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Application Name Input & Live Dynamic Preview */}
      <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 text-xs dark:text-slate-400 text-slate-600 bg-ivory-100/60 dark:bg-slate-900/40 p-3 sm:p-3.5 rounded-xl border dark:border-slate-800 border-ivory-border">
        <div className="space-y-0.5">
          <p className="font-bold dark:text-slate-200 text-navy-900">Test Custom Application Name:</p>
          <p className="text-[11px] text-slate-500">
            Type any application name to generate a live lockup and export high-resolution PNG or SVG instantly.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="e.g. Gateway, Vault, Agent..."
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            className="px-3 py-1.5 rounded-lg dark:bg-slate-950 bg-white border dark:border-slate-700 border-ivory-400 text-xs dark:text-white text-navy-900 placeholder-slate-400 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 w-44 sm:w-56"
          />
          {customName && (
            <button
              onClick={() => setCustomName('')}
              className="text-[11px] text-amber-500 hover:underline px-1 font-semibold"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppSubBrandStudio;
