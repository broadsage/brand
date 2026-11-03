import React, { useState } from 'react';
import { Copy, Check, FileText, Sparkles, Mail, Download } from 'lucide-react';

const PITCH_TEXT =
  'Broadsage unites open-source innovation with hardened enterprise platform engineering — Broad Vision, Sage Guidance, Open to Everyone.';

const BOILERPLATE_TEXT =
  'Broadsage is an open-source enterprise platform bridging cloud-native innovation and agentic AI with hardened, production-grade architectures. Featuring Ollie the Sage Owl, Broadsage champions the open enterprise foundation with calm, authoritative architectural guidance and zero vendor lock-in.';

export const PressBoilerplate: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    });
  };

  return (
    <div className="space-y-6">
      {/* 2 Boilerplate Copy Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: 1-Sentence Pitch */}
        <div className="glass-panel p-6 rounded-2xl border border-sky-500/20 hover:border-sky-500/40 transition-all flex flex-col justify-between space-y-4 theme-card-gradient">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md dark:bg-sky-500/10 bg-sky-50 dark:text-sky-400 text-sky-800 border dark:border-sky-500/30 border-sky-300 text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> 1-Sentence Pitch
              </span>
              <span className="text-[11px] font-mono text-slate-500">18 words</span>
            </div>
            <p className="text-sm dark:text-slate-200 text-[#0A1128] leading-relaxed font-medium">
              "{PITCH_TEXT}"
            </p>
            <p className="text-xs text-slate-400">
              Ideal for event speaker bios, social headers, partner directory listings, and sponsor slides.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => handleCopy('pitch', PITCH_TEXT)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl dark:bg-sky-500/10 dark:hover:bg-sky-500/20 dark:text-sky-300 dark:border-sky-500/30 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-300 font-semibold text-xs transition-all hover:scale-[1.02] active:scale-95 shadow-xs"
            >
              {copiedKey === 'pitch' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Pitch</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Card 2: 50-Word Standard Boilerplate */}
        <div className="glass-panel p-6 rounded-2xl border border-amber-500/20 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4 theme-card-gradient">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md dark:bg-amber-500/10 bg-amber-50 dark:text-amber-400 text-amber-800 border dark:border-amber-500/30 border-amber-300 text-xs font-mono font-bold uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5" /> Official Press Boilerplate
              </span>
              <span className="text-[11px] font-mono text-slate-500">46 words</span>
            </div>
            <p className="text-xs sm:text-sm dark:text-slate-200 text-[#0A1128] leading-relaxed">
              "{BOILERPLATE_TEXT}"
            </p>
            <p className="text-xs text-slate-400">
              Standard pre-approved copy for press releases, conference brochures, articles, and whitepapers.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => handleCopy('boilerplate', BOILERPLATE_TEXT)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl dark:bg-amber-500/10 dark:hover:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 font-semibold text-xs transition-all hover:scale-[1.02] active:scale-95 shadow-xs"
            >
              {copiedKey === 'boilerplate' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Boilerplate</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 1-Click Press Assets Quick Bar */}
      <div className="p-4 rounded-xl dark:bg-slate-900/60 bg-[#FAF8F5] border dark:border-slate-800/80 border-[#DBD1C2] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full dark:bg-amber-500/10 bg-amber-50 dark:text-amber-400 text-amber-800 border dark:border-amber-500/30 border-amber-300 font-bold">
            Press Pack
          </span>
          <span className="dark:text-slate-300 text-slate-700 font-semibold text-xs">
            Direct Vector Assets for Journalists, Event Hosts &amp; Partners
          </span>
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <a
            href="/logos/vector/broadsage_logo_primary.svg"
            download="broadsage_logo_primary.svg"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-700 bg-white hover:bg-[#FAF8F5] text-[#0A1128] border border-[#DBD1C2] hover:border-amber-500/40 text-[11px] font-semibold transition-all shadow-2xs"
            title="Download Primary Vector Mark (SVG)"
          >
            <Download className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            <span>Master Mark (SVG)</span>
          </a>
          <a
            href="/logos/vector/broadsage_logo_horizontal.svg"
            download="broadsage_logo_horizontal.svg"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-700 bg-white hover:bg-[#FAF8F5] text-[#0A1128] border border-[#DBD1C2] hover:border-sky-500/40 text-[11px] font-semibold transition-all shadow-2xs"
            title="Download Horizontal Wordmark (SVG)"
          >
            <Download className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
            <span>Wordmark (SVG)</span>
          </a>
        </div>
      </div>

      {/* Press Inquiries & Brand Governance Rules Bar */}
      <div className="p-4 sm:p-5 rounded-2xl dark:bg-slate-950/70 bg-white border dark:border-slate-800 border-[#DBD1C2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 dark:text-amber-400 flex-shrink-0">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold dark:text-white text-[#0A1128]">
              Media, Keynotes &amp; Co-Branding Inquiries
            </h4>
            <p className="text-xs dark:text-slate-400 text-slate-600">
              Need custom vector formats, event keynote approval, or high-res print lockups?
            </p>
          </div>
        </div>

        <a
          href="mailto:brand@broadsage.com"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-700 dark:text-amber-400 bg-[#FAF8F5] hover:bg-[#EFE7DC] border border-[#DBD1C2] text-amber-800 hover:border-amber-500/50 text-xs font-mono font-semibold transition-all hover:scale-105 shadow-xs whitespace-nowrap"
        >
          <span>brand@broadsage.com</span>
        </a>
      </div>
    </div>
  );
};

export default PressBoilerplate;

