import React, { useState } from 'react';
import OllieMascot from './OllieMascot';
import { Copy, Check, Sparkles, Layers, Box, Terminal, Cpu, LayoutGrid, Download, Cloud, Shield, Globe } from 'lucide-react';
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

const CUSTOM_ICON_PRESETS = [
  { id: 'cloud', name: 'Cloud Native / Ecosystem', icon: Cloud, color: '#38BDF8' },
  { id: 'cpu', name: 'Compute / Agents', icon: Cpu, color: '#38BDF8' },
  { id: 'box', name: 'Container / Runtime', icon: Box, color: '#F59E0B' },
  { id: 'layers', name: 'Service Mesh / Fabric', icon: Layers, color: '#10B981' },
  { id: 'shield', name: 'Security / Governance', icon: Shield, color: '#10B981' },
  { id: 'terminal', name: 'CLI / Toolchain', icon: Terminal, color: '#F43F5E' },
  { id: 'globe', name: 'Network / Global', icon: Globe, color: '#818CF8' },
];

export const AppSubBrandStudio: React.FC = () => {
  const [selectedApp, setSelectedApp] = useState<AppSpec>(APPS[0]);
  const [customName, setCustomName] = useState<string>('');
  const [customIconKey, setCustomIconKey] = useState<string>('cloud');
  const [showBadge, setShowBadge] = useState<boolean>(true);
  const [isExportingPng, setIsExportingPng] = useState<boolean>(false);
  const [measuredTextWidth, setMeasuredTextWidth] = useState<number>(0);
  const textRef = React.useRef<SVGTextElement | null>(null);
  const { copiedKey, copy } = useClipboard({ timeoutMs: 2000 });

  const isCustomMode = Boolean(customName.trim());
  const activeAppName = isCustomMode ? customName : selectedApp.name;
  const safeFilenamePart = activeAppName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '') || 'app';

  // Effective icon and accent color
  const effectiveIconKey = isCustomMode ? customIconKey : selectedApp.id;
  const activeColor = isCustomMode
    ? (CUSTOM_ICON_PRESETS.find((p) => p.id === customIconKey)?.color || '#38BDF8')
    : selectedApp.accentColor;

  // Fallback heuristic estimator for initial render and SSR
  const estimateWidth = (text: string): number => {
    if (!text) return 0;
    let width = 0;
    for (const char of text) {
      if ('MW@%#&'.includes(char)) {
        width += 22;
      } else if ('ijl1|!.,:;\'"()[]{}'.includes(char)) {
        width += 8;
      } else if ('frtI- '.includes(char)) {
        width += 10;
      } else if (char === char.toUpperCase() && char !== char.toLowerCase()) {
        width += 17;
      } else {
        width += 14.5;
      }
    }
    return Math.ceil(width);
  };

  // Measure rendered text bounding box accurately in SVG DOM
  React.useLayoutEffect(() => {
    if (textRef.current) {
      try {
        const bbox = textRef.current.getBBox();
        if (bbox && bbox.width > 0) {
          setMeasuredTextWidth(Math.ceil(bbox.width));
        }
      } catch {
        // Fallback gracefully if getBBox is not available
      }
    }
  }, [activeAppName]);

  // Re-measure when web fonts finish loading
  React.useEffect(() => {
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (textRef.current) {
          try {
            const bbox = textRef.current.getBBox();
            if (bbox && bbox.width > 0) {
              setMeasuredTextWidth(Math.ceil(bbox.width));
            }
          } catch {
            // Ignore
          }
        }
      });
    }
  }, [activeAppName]);

  const currentTextWidth = measuredTextWidth > 0 ? measuredTextWidth : estimateWidth(activeAppName);
  // Base standard card width (540px) maintains optimal proportion for standard suite names
  const baseWidth = 540;
  // Starting X coordinate of the right-hand sub-brand text
  // When icon badge is shown: badge is at x=298 (width 28), gap 12px -> text starts at x=338
  // When icon badge is hidden: text starts directly at x=298
  const textStartX = showBadge ? 338 : 298;
  // Balanced right-hand padding inside the squircle frame
  const rightPadding = 44;
  // Dynamic card width stretches to accommodate longer text without trimming
  const svgWidth = Math.max(baseWidth, Math.ceil(textStartX + currentTextWidth + rightPadding));

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

    const targetHeight = 400;
    const targetWidth = Math.round((svgWidth / 100) * targetHeight);
    const filename = `broadsage_${safeFilenamePart}_lockup_${targetWidth}x${targetHeight}.png`;

    try {
      await exportSvgToPng(svgElem, targetWidth, targetHeight, filename);
    } catch (err) {
      console.error('App lockup PNG export failed:', err);
    } finally {
      setIsExportingPng(false);
    }
  };

  // Render SVG vector path icon for the sub-brand badge
  const renderBadgeIcon = (iconKey: string, color: string) => {
    switch (iconKey) {
      case 'control':
      case 'cpu':
        return (
          <g stroke={color}>
            <rect x="5" y="5" width="14" height="14" rx="2" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 1v4M15 1v4M9 19v4M15 19v4M20 9h3M20 15h3M1 9h4M1 15h4" fill="none" strokeWidth="2" strokeLinecap="round" />
            <rect x="9" y="9" width="6" height="6" rx="1" fill={color} fillOpacity="0.45" strokeWidth="0" />
          </g>
        );
      case 'runtime':
      case 'box':
        return (
          <g stroke={color} fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
          </g>
        );
      case 'mesh':
      case 'layers':
        return (
          <g stroke={color} fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </g>
        );
      case 'studio':
      case 'grid':
        return (
          <g stroke={color} fill="none" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
          </g>
        );
      case 'cli':
      case 'terminal':
        return (
          <g stroke={color} fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </g>
        );
      case 'shield':
        return (
          <g stroke={color} fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </g>
        );
      case 'globe':
        return (
          <g stroke={color} fill="none" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </g>
        );
      case 'cloud':
      default:
        return (
          <g stroke={color} fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          </g>
        );
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

        <div className="flex items-center gap-3">
          {/* Quick Toggle for Sub-Brand Icon Badge */}
          <button
            type="button"
            onClick={() => setShowBadge(!showBadge)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all ${
              showBadge
                ? 'dark:bg-amber-500/15 bg-amber-500/10 text-amber-500 dark:text-amber-400 border-amber-500/40 shadow-xs'
                : 'dark:bg-slate-800 bg-ivory-100 text-slate-400 border-slate-700/60'
            }`}
            title="Toggle sub-brand icon badge visibility in lockup"
          >
            <Sparkles className="w-3 h-3" />
            <span>{showBadge ? 'Icon Badge: On' : 'Icon Badge: Off'}</span>
          </button>

          <p className="hidden md:block text-xs dark:text-slate-400 text-slate-600 max-w-xs text-right">
            Standardized lockup formula for Broadsage applications and ecosystem alliances.
          </p>
        </div>
      </div>

      {/* Main Interactive Lockup Stage */}
      <div className="p-4 sm:p-6 rounded-xl bg-[#080D1E] border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
        {/* Ambient subtle glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30 transition-all duration-500"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${activeColor}25, transparent 70%)`,
          }}
          aria-hidden="true"
        />

        {/* Live SVG Vector Lockup */}
        <svg
          id="app-lockup-preview"
          viewBox={`0 0 ${svgWidth} 100`}
          className="w-full h-auto relative z-10 transition-all duration-150"
          style={{ maxWidth: `${svgWidth}px` }}
        >
          {/* Subtle Frame */}
          <rect width={svgWidth} height="100" rx="20" fill="#0A1128" stroke="#1E293B" strokeWidth="1.5" />

          {/* Ollie Mascot Emblem (Scaled & Optically Centered) */}
          <g transform="translate(52, 50) scale(0.38)">
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

          {/* Master Brand Typography: BROADSAGE (Optically Spaced: 14.7px gap from Ollie) */}
          <text
            x="88"
            y="59"
            fill="#FFFFFF"
            fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
            fontSize="26"
            fontWeight="800"
            letterSpacing="-0.5"
          >
            BROAD<tspan fill="#F59E0B">SAGE</tspan>
          </text>

          {/* Structural Hairline Divider (Symmetric 22px spacing) */}
          <line x1="276" y1="32" x2="276" y2="68" stroke="#334155" strokeWidth="1.5" />

          {/* Sub-Brand Product Icon Badge (if enabled) */}
          {showBadge && (
            <g transform="translate(298, 36)">
              <rect
                width="28"
                height="28"
                rx="7"
                fill={`${activeColor}20`}
                stroke={`${activeColor}55`}
                strokeWidth="1.2"
              />
              <g transform="translate(6, 6) scale(0.667)">
                {renderBadgeIcon(effectiveIconKey, activeColor)}
              </g>
            </g>
          )}

          {/* Application Name */}
          <text
            ref={textRef}
            x={textStartX}
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
          {/* Download High-DPI PNG */}
          <button
            onClick={handleDownloadPng}
            disabled={isExportingPng}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            title={`Download ${activeAppName} Lockup as ${Math.round((svgWidth / 100) * 400)}×400 High-DPI PNG`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExportingPng ? 'Rendering PNG...' : `Download PNG (${Math.round((svgWidth / 100) * 400)}px)`}</span>
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
      <div className="pt-1 flex flex-col items-stretch gap-3 text-xs dark:text-slate-400 text-slate-600 bg-ivory-100/60 dark:bg-slate-900/40 p-3 sm:p-3.5 rounded-xl border dark:border-slate-800 border-ivory-border">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <div className="space-y-0.5">
            <p className="font-bold dark:text-slate-200 text-navy-900">Custom Brand / Integration Name:</p>
            <p className="text-[11px] text-slate-500">
              Type any product or ecosystem brand name (e.g. Cloud Native Computing, Kubernetes) to generate a lockup.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="e.g. Cloud Native, Gateway, Vault..."
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="px-3 py-1.5 rounded-lg dark:bg-slate-950 bg-white border dark:border-slate-700 border-ivory-400 text-xs dark:text-white text-navy-900 placeholder-slate-400 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 w-44 sm:w-60"
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

        {/* Custom Icon Preset Selector (shown when typing custom name) */}
        {customName && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t dark:border-slate-800/80 border-ivory-border">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">
              Select Sub-Brand Icon:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {CUSTOM_ICON_PRESETS.map((preset) => {
                const IconComp = preset.icon;
                const isPresetActive = effectiveIconKey === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setCustomIconKey(preset.id)}
                    className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium border transition-all ${
                      isPresetActive
                        ? 'dark:bg-slate-800 bg-white border-amber-500 text-navy-900 dark:text-white shadow-xs'
                        : 'dark:bg-slate-900/60 bg-ivory-50 border-ivory-border dark:border-slate-800 text-slate-500 hover:text-slate-300'
                    }`}
                    title={preset.name}
                  >
                    <IconComp className="w-3 h-3" style={{ color: preset.color }} />
                    <span>{preset.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppSubBrandStudio;
