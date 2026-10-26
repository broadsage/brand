import React from 'react';

export interface OllieMascotProps {
  variant?: 'primary' | 'avatar' | 'horizontal' | 'horizontal-light' | 'favicon';
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
