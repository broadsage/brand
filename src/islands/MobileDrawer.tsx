import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  Compass,
  Layers,
  Palette,
  Image as ImageIcon,
  Type,
  Maximize2,
  CheckCircle2,
  Terminal,
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
    { href: '#narrative', icon: Compass, label: 'Story & DPE Mission' },
    { href: '#emblems', icon: Layers, label: 'Marks & Asset Studio' },
    { href: '#colors', icon: Palette, label: 'Color System & WCAG' },
    { href: '#banners', icon: ImageIcon, label: 'Repository Banners' },
    { href: '#typography', icon: Type, label: 'Typography Specimen' },
    { href: '#clearspace', icon: Maximize2, label: 'Clearspace & Layout' },
    { href: '#rules', icon: CheckCircle2, label: "Do's & Don'ts" },
    { href: '#deployment', icon: Terminal, label: 'CLI & Touchpoints' },
  ];

  return (
    <div className="md:hidden">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2.5 rounded-lg text-slate-300 hover:text-white bg-slate-900/80 border border-slate-700/80 focus:outline-none focus:ring-2 focus:ring-amber-500"
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
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-xs bg-[#0A1128] border-l border-slate-800 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span className="font-extrabold text-sm tracking-wider text-white uppercase">
              BROAD<span className="text-amber-500">SAGE</span>
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60"
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
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-300 hover:text-amber-400 hover:bg-slate-900/60 transition-colors font-medium text-sm group"
              >
                <Icon className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t border-slate-800/80 space-y-2 bg-[#050814]/80">
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
