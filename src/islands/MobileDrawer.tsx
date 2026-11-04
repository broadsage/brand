import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import { BRAND_STATUS_LABEL } from '../config/brand';
import {
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  Compass,
  Layers,
  Palette,
  CheckCircle2,
} from 'lucide-react';

export const MobileDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const navLinks = [
    { href: '#emblems', icon: Layers, label: 'Official Marks' },
    { href: '#colors', icon: Palette, label: 'Color Tokens & Code' },
    { href: '#governance', icon: CheckCircle2, label: 'Governance & Voice' },
    { href: '#about', icon: Compass, label: 'Press Kit & Mission' },
  ];

  return (
    <div className="md:hidden">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2.5 rounded-lg dark:text-slate-300 text-slate-700 hover:text-amber-500 dark:hover:text-white dark:bg-slate-900/80 bg-white border dark:border-slate-700/80 border-ivory-400 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 shadow-xs"
        aria-label="Open mobile navigation"
      >
        <Menu className="w-6 h-6 text-amber-400" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-xs dark:bg-navy-900 bg-ivory-50 border-l dark:border-slate-800 border-ivory-border shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b dark:border-slate-800/80 border-ivory-border flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span className="font-extrabold text-sm tracking-wider dark:text-white text-navy-900 uppercase">
                BROAD<span className="text-amber-500">SAGE</span>
              </span>
            </div>
            <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              {BRAND_STATUS_LABEL}
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/60 text-slate-600 hover:text-navy-900 hover:bg-ivory-200 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg dark:text-slate-300 dark:hover:text-amber-400 dark:hover:bg-slate-900/60 text-slate-700 hover:text-amber-600 hover:bg-ivory-200 transition-colors font-medium text-sm group"
              >
                <Icon className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t dark:border-slate-800/80 border-ivory-border space-y-3 dark:bg-navy-950/80 bg-ivory-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Appearance:</span>
            <ThemeToggle compact={false} />
          </div>

          <a
            href="https://github.com/broadsage"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            GitHub Organization
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileDrawer;
