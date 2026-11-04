import React from 'react';

export interface OllieMascotProps {
  variant?: 'primary' | 'avatar' | 'horizontal' | 'horizontal-light' | 'favicon' | 'glyph-micro' | 'monochrome-black' | 'monochrome-white' | 'app-icon';
  size?: number | string;
  className?: string;
  id?: string;
}

// Reusable character geometry (eliminates SVG code duplication)
const OllieCharacter: React.FC<{ lightMode?: boolean }> = ({ lightMode = false }) => (
  <>
    {/* Ear Crests */}
    <polygon points="-48,-66 -22,-32 -54,-32" fill="#0284C7" />
    <polygon points="48,-66 22,-32 54,-32" fill={lightMode ? '#D97706' : '#F59E0B'} />

    {/* Body */}
    <ellipse
      cx="0"
      cy="8"
      rx="56"
      ry="62"
      fill={lightMode ? '#0A1128' : 'url(#heroBodyNavy)'}
      stroke="#1E293B"
      strokeWidth="1.5"
    />

    {/* Wings */}
    <path d="M-56,2 C-66,24 -52,58 -32,66 C-42,44 -46,20 -56,2 Z" fill="#0369A1" />
    <path d="M56,2 C66,24 52,58 32,66 C42,44 46,20 56,2 Z" fill="#B45309" />

    {/* Belly Shield */}
    <ellipse cx="0" cy="22" rx="32" ry="40" fill={lightMode ? '#F59E0B' : 'url(#heroSolarGold)'} />

    {/* Code Chevrons */}
    <path d="M-12,12 L0,20 L12,12" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.95" />
    <path d="M-14,26 L0,34 L14,26" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.95" />
    <path d="M-12,40 L0,48 L12,40" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.95" />

    {/* Eyes & Wisdom Glasses */}
    <circle cx="-22" cy="-18" r="19" fill="#082F49" stroke="#0284C7" strokeWidth="4" />
    <circle cx="-22" cy="-18" r="12" fill={lightMode ? '#F59E0B' : 'url(#heroGoldEyes)'} />
    <circle cx="-25" cy="-21" r="4.5" fill="#FFFFFF" />

    <circle cx="22" cy="-18" r="19" fill="#451A03" stroke={lightMode ? '#D97706' : '#F59E0B'} strokeWidth="4" />
    <circle cx="22" cy="-18" r="12" fill={lightMode ? '#F59E0B' : 'url(#heroGoldEyes)'} />
    <circle cx="19" cy="-21" r="4.5" fill="#FFFFFF" />

    {/* Glasses Bridge */}
    <rect x="-6" y="-20" width="12" height="4" rx="2" fill="#FFFFFF" />

    {/* Beak */}
    <polygon points="0,-6 7,8 0,14 -7,8" fill="#FDE68A" />

    {/* Talons */}
    <ellipse cx="-16" cy="70" rx="7" ry="4" fill={lightMode ? '#D97706' : '#FBBF24'} />
    <ellipse cx="16" cy="70" rx="7" ry="4" fill={lightMode ? '#D97706' : '#FBBF24'} />
  </>
);

const SharedDefs = () => (
  <defs>
    <linearGradient id="heroBodyNavy" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#0284C7" />
      <stop offset="45%" stopColor="#1E293B" />
      <stop offset="100%" stopColor="#0A1128" />
    </linearGradient>
    <linearGradient id="heroSolarGold" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#FCD34D" />
      <stop offset="50%" stopColor="#F59E0B" />
      <stop offset="100%" stopColor="#D97706" />
    </linearGradient>
    <linearGradient id="heroGoldEyes" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#FFFFFF" />
      <stop offset="45%" stopColor="#FDE68A" />
      <stop offset="85%" stopColor="#F59E0B" />
      <stop offset="100%" stopColor="#B45309" />
    </linearGradient>
  </defs>
);

export const OllieMascot: React.FC<OllieMascotProps> = ({
  variant = 'primary',
  size,
  className = '',
  id,
}) => {
  if (variant === 'avatar') {
    return (
      <svg
        id={id}
        viewBox="0 0 160 160"
        width={size || '100%'}
        height={size || '100%'}
        className={className}
        style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
      >
        <SharedDefs />
        <circle cx="80" cy="80" r="78" fill="#0A1128" stroke="#F59E0B" strokeWidth="4" />
        <g transform="translate(80, 84) scale(0.85)">
          <OllieCharacter />
        </g>
      </svg>
    );
  }

  if (variant === 'horizontal') {
    return (
      <svg
        id={id}
        viewBox="0 0 440 120"
        width={size || '100%'}
        height={size || '100%'}
        className={className}
        style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
      >
        <SharedDefs />
        <rect width="440" height="120" rx="24" fill="#0A1128" stroke="#1E293B" strokeWidth="1.5" />
        <g transform="translate(72, 58) scale(0.65)">
          <OllieCharacter />
        </g>
        <text x="136" y="63" fill="#FFFFFF" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" fontSize="34" fontWeight="800" letterSpacing="-0.5">
          BROAD<tspan fill="#F59E0B">SAGE</tspan>
        </text>
        <text x="137" y="85" fill="#94A3B8" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" fontSize="11.5" fontWeight="500" letterSpacing="0.2">
          Broad Vision, Sage Guidance — Open to Everyone.
        </text>
      </svg>
    );
  }

  if (variant === 'horizontal-light') {
    return (
      <svg
        id={id}
        viewBox="0 0 440 120"
        width={size || '100%'}
        height={size || '100%'}
        className={className}
        style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
      >
        <SharedDefs />
        <rect width="440" height="120" rx="24" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
        <g transform="translate(72, 58) scale(0.65)">
          <OllieCharacter lightMode />
        </g>
        <text x="136" y="63" fill="#0A1128" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" fontSize="34" fontWeight="800" letterSpacing="-0.5">
          BROAD<tspan fill="#D97706">SAGE</tspan>
        </text>
        <text x="137" y="85" fill="#475569" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" fontSize="11.5" fontWeight="600" letterSpacing="0.2">
          Broad Vision, Sage Guidance — Open to Everyone.
        </text>
      </svg>
    );
  }

  if (variant === 'favicon') {
    return (
      <svg
        id={id}
        viewBox="0 0 32 32"
        width={size || 32}
        height={size || 32}
        className={className}
        style={{ display: 'block' }}
      >
        <SharedDefs />
        <rect width="32" height="32" rx="7" fill="#0A1128" />
        <g transform="translate(16, 16) scale(0.18)">
          <OllieCharacter />
        </g>
      </svg>
    );
  }

  if (variant === 'glyph-micro') {
    return (
      <svg
        id={id}
        viewBox="0 0 64 64"
        width={size || '100%'}
        height={size || '100%'}
        className={className}
        style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
      >
        <SharedDefs />
        <rect width="64" height="64" rx="16" fill="#0A1128" />
        <g transform="translate(32, 33)">
          <polygon points="-16,-22 -7,-9 -18,-9" fill="#0284C7" />
          <polygon points="16,-22 7,-9 18,-9" fill="#F59E0B" />
          <ellipse cx="0" cy="3" rx="19" ry="21" fill="#101B3B" stroke="#1E293B" strokeWidth="1.5" />
          <ellipse cx="0" cy="7" rx="11" ry="14" fill="#F59E0B" />
          <path d="M-4,4 L0,7 L4,4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M-4,9 L0,12 L4,9" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="-8" cy="-5" r="7.5" fill="#082F49" stroke="#0284C7" strokeWidth="2" />
          <circle cx="-8" cy="-5" r="4.5" fill="#FCD34D" />
          <circle cx="-9.5" cy="-6.5" r="1.5" fill="#FFFFFF" />
          <circle cx="8" cy="-5" r="7.5" fill="#451A03" stroke="#F59E0B" strokeWidth="2" />
          <circle cx="8" cy="-5" r="4.5" fill="#FCD34D" />
          <circle cx="6.5" cy="-6.5" r="1.5" fill="#FFFFFF" />
          <rect x="-2" y="-6" width="4" height="2" rx="1" fill="#FFFFFF" />
          <polygon points="0,-1 2.5,4 0,6 -2.5,4" fill="#FDE68A" />
          <ellipse cx="-6" cy="24" rx="3" ry="1.8" fill="#FBBF24" />
          <ellipse cx="6" cy="24" rx="3" ry="1.8" fill="#FBBF24" />
        </g>
      </svg>
    );
  }

  if (variant === 'monochrome-black') {
    return (
      <svg
        id={id}
        viewBox="0 0 200 200"
        width={size || '100%'}
        height={size || '100%'}
        className={className}
        style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
      >
        <rect width="200" height="200" rx="44" fill="#0A1128" />
        <g transform="translate(100, 100)">
          <polygon points="-48,-66 -22,-32 -54,-32" fill="#FFFFFF" />
          <polygon points="48,-66 22,-32 54,-32" fill="#FFFFFF" />
          <ellipse cx="0" cy="8" rx="56" ry="62" fill="none" stroke="#FFFFFF" strokeWidth="4" />
          <path d="M-56,2 C-66,24 -52,58 -32,66 C-42,44 -46,20 -56,2 Z" fill="#FFFFFF" />
          <path d="M56,2 C66,24 52,58 32,66 C42,44 46,20 56,2 Z" fill="#FFFFFF" />
          <ellipse cx="0" cy="22" rx="32" ry="40" fill="none" stroke="#FFFFFF" strokeWidth="3" />
          <path d="M-12,12 L0,20 L12,12" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M-14,26 L0,34 L14,26" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M-12,40 L0,48 L12,40" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
          <circle cx="-22" cy="-18" r="19" fill="#0A1128" stroke="#FFFFFF" strokeWidth="4" />
          <circle cx="-22" cy="-18" r="10" fill="#FFFFFF" />
          <circle cx="-25" cy="-21" r="3.5" fill="#0A1128" />
          <circle cx="22" cy="-18" r="19" fill="#0A1128" stroke="#FFFFFF" strokeWidth="4" />
          <circle cx="22" cy="-18" r="10" fill="#FFFFFF" />
          <circle cx="19" cy="-21" r="3.5" fill="#0A1128" />
          <rect x="-6" y="-20" width="12" height="4" rx="2" fill="#FFFFFF" />
          <polygon points="0,-6 7,8 0,14 -7,8" fill="#FFFFFF" />
          <ellipse cx="-16" cy="70" rx="7" ry="4" fill="#FFFFFF" />
          <ellipse cx="16" cy="70" rx="7" ry="4" fill="#FFFFFF" />
        </g>
      </svg>
    );
  }

  if (variant === 'monochrome-white') {
    return (
      <svg
        id={id}
        viewBox="0 0 200 200"
        width={size || '100%'}
        height={size || '100%'}
        className={className}
        style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
      >
        <rect width="200" height="200" rx="44" fill="#FFFFFF" stroke="#0A1128" strokeWidth="3" />
        <g transform="translate(100, 100)">
          <polygon points="-48,-66 -22,-32 -54,-32" fill="#0A1128" />
          <polygon points="48,-66 22,-32 54,-32" fill="#0A1128" />
          <ellipse cx="0" cy="8" rx="56" ry="62" fill="none" stroke="#0A1128" strokeWidth="4" />
          <path d="M-56,2 C-66,24 -52,58 -32,66 C-42,44 -46,20 -56,2 Z" fill="#0A1128" />
          <path d="M56,2 C66,24 52,58 32,66 C42,44 46,20 56,2 Z" fill="#0A1128" />
          <ellipse cx="0" cy="22" rx="32" ry="40" fill="none" stroke="#0A1128" strokeWidth="3" />
          <path d="M-12,12 L0,20 L12,12" stroke="#0A1128" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M-14,26 L0,34 L14,26" stroke="#0A1128" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M-12,40 L0,48 L12,40" stroke="#0A1128" strokeWidth="3" strokeLinecap="round" fill="none" />
          <circle cx="-22" cy="-18" r="19" fill="#FFFFFF" stroke="#0A1128" strokeWidth="4" />
          <circle cx="-22" cy="-18" r="10" fill="#0A1128" />
          <circle cx="-25" cy="-21" r="3.5" fill="#FFFFFF" />
          <circle cx="22" cy="-18" r="19" fill="#FFFFFF" stroke="#0A1128" strokeWidth="4" />
          <circle cx="22" cy="-18" r="10" fill="#0A1128" />
          <circle cx="19" cy="-21" r="3.5" fill="#FFFFFF" />
          <rect x="-6" y="-20" width="12" height="4" rx="2" fill="#0A1128" />
          <polygon points="0,-6 7,8 0,14 -7,8" fill="#0A1128" />
          <ellipse cx="-16" cy="70" rx="7" ry="4" fill="#0A1128" />
          <ellipse cx="16" cy="70" rx="7" ry="4" fill="#0A1128" />
        </g>
      </svg>
    );
  }

  if (variant === 'app-icon') {
    return (
      <svg
        id={id}
        viewBox="0 0 1024 1024"
        width={size || '100%'}
        height={size || '100%'}
        className={className}
        style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
      >
        <SharedDefs />
        <rect width="1024" height="1024" rx="224" fill="#0A1128" />
        <rect width="1020" height="1020" x="2" y="2" rx="222" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="4" />
        <g transform="translate(512, 516) scale(4.4)">
          <OllieCharacter />
        </g>
      </svg>
    );
  }

  // Default: Primary Square Emblem (200x200)
  return (
    <svg
      id={id}
      viewBox="0 0 200 200"
      width={size || '100%'}
      height={size || '100%'}
      className={className}
      style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
    >
      <SharedDefs />
      <rect width="200" height="200" rx="44" fill="#0A1128" stroke="#1E293B" strokeWidth="2" />
      <g transform="translate(100, 100)">
        <OllieCharacter />
      </g>
    </svg>
  );
};

export default OllieMascot;
