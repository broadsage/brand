import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const vectorDir = path.join(rootDir, 'public', 'banners', 'vector');
const rasterDir = path.join(rootDir, 'public', 'banners');

if (!fs.existsSync(vectorDir)) {
  fs.mkdirSync(vectorDir, { recursive: true });
}
if (!fs.existsSync(rasterDir)) {
  fs.mkdirSync(rasterDir, { recursive: true });
}

// Strict typography constants per Broadsage Typography Guidelines:
// Grotesque Geometric Sans: Helvetica Neue / Arial / -apple-system
// Style: strictly normal (upright, zero slant, zero italic)
// Tracking: -0.5px
const FONT_SANS = "'Helvetica Neue', Helvetica, Arial, -apple-system, sans-serif";
const FONT_MONO = "ui-monospace, 'SF Mono', Menlo, Monaco, Consolas, monospace";

// Common Shared Defs
const commonDefs = `
    <!-- Background Gradients -->
    <linearGradient id="bgNavyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#060919"/>
      <stop offset="50%" stop-color="#0A1128"/>
      <stop offset="100%" stop-color="#030712"/>
    </linearGradient>

    <radialGradient id="ambientSky" cx="15%" cy="30%" r="55%">
      <stop offset="0%" stop-color="#0284C7" stop-opacity="0.25"/>
      <stop offset="60%" stop-color="#0284C7" stop-opacity="0.03"/>
      <stop offset="100%" stop-color="#0284C7" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="ambientGold" cx="85%" cy="75%" r="50%">
      <stop offset="0%" stop-color="#F59E0B" stop-opacity="0.18"/>
      <stop offset="50%" stop-color="#F59E0B" stop-opacity="0.02"/>
      <stop offset="100%" stop-color="#F59E0B" stop-opacity="0"/>
    </radialGradient>

    <!-- Technical Grid Pattern -->
    <pattern id="techGrid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E293B" stroke-width="0.75" stroke-opacity="0.4"/>
      <circle cx="0" cy="0" r="1" fill="#38BDF8" fill-opacity="0.45"/>
    </pattern>

    <!-- Ollie Character Defs -->
    <linearGradient id="heroBodyNavy" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284C7"/>
      <stop offset="45%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#0A1128"/>
    </linearGradient>

    <linearGradient id="heroSolarGold" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FCD34D"/>
      <stop offset="50%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>

    <linearGradient id="heroGoldEyes" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="45%" stop-color="#FDE68A"/>
      <stop offset="85%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#B45309"/>
    </linearGradient>

    <!-- Ollie Full Reusable Symbol -->
    <g id="ollieMascot">
      <polygon points="-48,-66 -22,-32 -54,-32" fill="#0284C7"/>
      <polygon points="48,-66 22,-32 54,-32" fill="#F59E0B"/>
      <ellipse cx="0" cy="8" rx="56" ry="62" fill="url(#heroBodyNavy)" stroke="#1E293B" stroke-width="1.5"/>
      <path d="M-56,2 C-66,24 -52,58 -32,66 C-42,44 -46,20 -56,2 Z" fill="#0369A1"/>
      <path d="M56,2 C66,24 52,58 32,66 C42,44 46,20 56,2 Z" fill="#B45309"/>
      <ellipse cx="0" cy="22" rx="32" ry="40" fill="url(#heroSolarGold)"/>
      <path d="M-12,12 L0,20 L12,12" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.95"/>
      <path d="M-14,26 L0,34 L14,26" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.95"/>
      <path d="M-12,40 L0,48 L12,40" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.95"/>
      <circle cx="-22" cy="-18" r="19" fill="#082F49" stroke="#0284C7" stroke-width="4"/>
      <circle cx="-22" cy="-18" r="12" fill="url(#heroGoldEyes)"/>
      <circle cx="-25" cy="-21" r="4.5" fill="#FFFFFF"/>
      <circle cx="22" cy="-18" r="19" fill="#451A03" stroke="#F59E0B" stroke-width="4"/>
      <circle cx="22" cy="-18" r="12" fill="url(#heroGoldEyes)"/>
      <circle cx="19" cy="-21" r="4.5" fill="#FFFFFF"/>
      <rect x="-6" y="-20" width="12" height="4" rx="2" fill="#FFFFFF"/>
      <polygon points="0,-6 7,8 0,14 -7,8" fill="#FDE68A"/>
      <ellipse cx="-16" cy="70" rx="7" ry="4" fill="#FBBF24"/>
      <ellipse cx="16" cy="70" rx="7" ry="4" fill="#FBBF24"/>
    </g>
`;

const banners = [
  // 1. GitHub Organization Hero & README Header (1280 × 400)
  {
    id: 'github-welcome',
    svgFile: 'broadsage_github_hero.svg',
    pngFiles: ['github-welcome.png', 'broadsage_github_hero.png'],
    width: 1280,
    height: 400,
    generateSvg: () => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 400" width="1280" height="400">
  <defs>
    ${commonDefs}
    <linearGradient id="heroBorderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0284C7" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#F59E0B" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#0284C7" stop-opacity="0.8"/>
    </linearGradient>
  </defs>

  <!-- Background Base -->
  <rect width="1280" height="400" fill="url(#bgNavyGrad)"/>
  <rect width="1280" height="400" fill="url(#techGrid)"/>
  <rect width="1280" height="400" fill="url(#ambientSky)"/>
  <rect width="1280" height="400" fill="url(#ambientGold)"/>

  <!-- Top Accent Horizon Line -->
  <rect x="0" y="0" width="1280" height="3" fill="url(#heroBorderGrad)"/>

  <!-- Outer Protective Tech Frame -->
  <rect x="16" y="16" width="1248" height="368" rx="16" fill="none" stroke="#1E293B" stroke-width="1.2"/>

  <!-- Decorative Corner Brackets -->
  <path d="M 32 50 L 32 32 L 50 32" fill="none" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M 1248 50 L 1248 32 L 1230 32" fill="none" stroke="#0284C7" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M 32 350 L 32 368 L 50 368" fill="none" stroke="#0284C7" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M 1248 350 L 1248 368 L 1230 368" fill="none" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round"/>

  <!-- Left Side: Mascot in Luminous Portal -->
  <g transform="translate(195, 200)">
    <circle cx="0" cy="0" r="118" fill="#0A1128" stroke="#1E293B" stroke-width="2"/>
    <circle cx="0" cy="0" r="110" fill="none" stroke="#0284C7" stroke-width="1.5" stroke-dasharray="6,8" opacity="0.6"/>
    <circle cx="0" cy="0" r="102" fill="none" stroke="#F59E0B" stroke-width="1" opacity="0.35"/>
    <circle cx="0" cy="0" r="88" fill="#060B1E" stroke="#334155" stroke-width="1"/>
    <g transform="scale(1.22)">
      <use href="#ollieMascot"/>
    </g>
  </g>

  <!-- Content Block (Right of Mascot) -->
  <g transform="translate(370, 75)">
    <!-- Kicker Eyebrow Badge -->
    <g transform="translate(0, 20)">
      <rect width="320" height="26" rx="13" fill="#0F172A" stroke="#38BDF8" stroke-width="1" stroke-opacity="0.4"/>
      <circle cx="14" cy="13" r="4" fill="#F59E0B"/>
      <text x="26" y="17" fill="#38BDF8" font-family="${FONT_SANS}" font-size="11" font-weight="700" font-style="normal" letter-spacing="1.5">DPE INITIATIVE &amp; AGENTIC AI</text>
    </g>

    <!-- Main Wordmark: Strict Broadsage Guidelines (Upright, ExtraBold 800, -0.5px tracking) -->
    <text x="0" y="105" font-family="${FONT_SANS}" font-size="64" font-weight="800" font-style="normal" letter-spacing="-0.5">
      <tspan fill="#FFFFFF">BROAD</tspan><tspan fill="#F59E0B">SAGE</tspan>
    </text>

    <!-- Subtitle / Initiative Line -->
    <text x="2" y="138" fill="#94A3B8" font-family="${FONT_SANS}" font-size="15" font-weight="700" font-style="normal" letter-spacing="1.5">
      DEVELOPER PLATFORM ENGINEERING (DPE) INITIATIVE &amp; MISSION
    </text>

    <!-- Philosophy Tagline (Upright, Normal Style) -->
    <text x="2" y="174" fill="#E2E8F0" font-family="${FONT_SANS}" font-size="20" font-weight="500" font-style="normal">
      Broad Vision, Sage Guidance — Open to Everyone.
    </text>

    <!-- Feature Pills Row (Zero Clutter, Clean Negative Space) -->
    <g transform="translate(0, 208)">
      <g>
        <rect width="138" height="32" rx="6" fill="#1E293B" fill-opacity="0.7" stroke="#F59E0B" stroke-width="1.2" stroke-opacity="0.7"/>
        <text x="69" y="20" fill="#FCD34D" font-family="${FONT_SANS}" font-size="11.5" font-weight="700" font-style="normal" text-anchor="middle">AGENTIC AI</text>
      </g>
      <g transform="translate(148, 0)">
        <rect width="180" height="32" rx="6" fill="#1E293B" fill-opacity="0.7" stroke="#0284C7" stroke-width="1.2" stroke-opacity="0.7"/>
        <text x="90" y="20" fill="#38BDF8" font-family="${FONT_SANS}" font-size="11.5" font-weight="700" font-style="normal" text-anchor="middle">DEVELOPER PLATFORMS</text>
      </g>
      <g transform="translate(338, 0)">
        <rect width="158" height="32" rx="6" fill="#1E293B" fill-opacity="0.7" stroke="#10B981" stroke-width="1.2" stroke-opacity="0.7"/>
        <text x="79" y="20" fill="#6EE7B7" font-family="${FONT_SANS}" font-size="11.5" font-weight="700" font-style="normal" text-anchor="middle">OPEN ECOSYSTEM</text>
      </g>
      <g transform="translate(506, 0)">
        <rect width="182" height="32" rx="6" fill="#1E293B" fill-opacity="0.7" stroke="#475569" stroke-width="1.2"/>
        <text x="91" y="20" fill="#CBD5E1" font-family="${FONT_SANS}" font-size="11.5" font-weight="700" font-style="normal" text-anchor="middle">ENTERPRISE HARDENED</text>
      </g>
    </g>
  </g>
</svg>
`,
  },

  // 2. GitHub Repository Social Preview Card (1280 × 640)
  {
    id: 'github-repo-preview',
    svgFile: 'broadsage_repo_preview.svg',
    pngFiles: ['github-repo-preview.png'],
    width: 1280,
    height: 640,
    generateSvg: () => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 640" width="1280" height="640">
  <defs>
    ${commonDefs}
  </defs>

  <!-- Background Base -->
  <rect width="1280" height="640" fill="url(#bgNavyGrad)"/>
  <rect width="1280" height="640" fill="url(#techGrid)"/>
  <rect width="1280" height="640" fill="url(#ambientSky)"/>
  <rect width="1280" height="640" fill="url(#ambientGold)"/>

  <!-- Outer Card Bezel -->
  <rect x="24" y="24" width="1232" height="592" rx="28" fill="#0A1128" fill-opacity="0.85" stroke="#1E293B" stroke-width="2"/>

  <!-- Top Header Navigation Bar inside Card -->
  <g transform="translate(60, 68)">
    <circle cx="10" cy="10" r="5" fill="#EF4444" opacity="0.8"/>
    <circle cx="28" cy="10" r="5" fill="#F59E0B" opacity="0.8"/>
    <circle cx="46" cy="10" r="5" fill="#10B981" opacity="0.8"/>
    <rect x="74" y="0" width="240" height="22" rx="6" fill="#0F172A" stroke="#334155" stroke-width="1"/>
    <text x="86" y="15" fill="#38BDF8" font-family="${FONT_MONO}" font-size="11" font-weight="600" font-style="normal">github.com/broadsage</text>
    <text x="1150" y="15" fill="#64748B" font-family="${FONT_MONO}" font-size="11" font-style="normal" text-anchor="end">DEVELOPER PLATFORM</text>
  </g>
  <line x1="60" y1="104" x2="1220" y2="104" stroke="#1E293B" stroke-width="1.5"/>

  <!-- Mascot Feature Portal -->
  <g transform="translate(240, 360)">
    <circle cx="0" cy="0" r="145" fill="#060A19" stroke="#1E293B" stroke-width="2"/>
    <circle cx="0" cy="0" r="135" fill="none" stroke="#0284C7" stroke-width="2" stroke-dasharray="8,8" opacity="0.5"/>
    <circle cx="0" cy="0" r="122" fill="none" stroke="#F59E0B" stroke-width="1" opacity="0.4"/>
    <g transform="scale(1.52)">
      <use href="#ollieMascot"/>
    </g>
  </g>

  <!-- Information Architecture Block -->
  <g transform="translate(440, 195)">
    <!-- Eyebrow -->
    <text x="0" y="20" fill="#38BDF8" font-family="${FONT_SANS}" font-size="14" font-weight="700" font-style="normal" letter-spacing="2">
      DEVELOPER PLATFORM ENGINEERING (DPE) INITIATIVE
    </text>

    <!-- Wordmark: Strict Broadsage Guidelines (Upright, ExtraBold 800, -0.5px tracking) -->
    <text x="0" y="95" font-family="${FONT_SANS}" font-size="76" font-weight="800" font-style="normal" letter-spacing="-0.5">
      <tspan fill="#FFFFFF">BROAD</tspan><tspan fill="#F59E0B">SAGE</tspan>
    </text>

    <!-- Mission Statement -->
    <text x="2" y="145" fill="#E2E8F0" font-family="${FONT_SANS}" font-size="24" font-weight="600" font-style="normal">
      Broad Vision, Sage Guidance — Open to Everyone.
    </text>

    <!-- Detailed Deck -->
    <text x="2" y="185" fill="#94A3B8" font-family="${FONT_SANS}" font-size="16" font-weight="400" font-style="normal">
      Empowering engineering teams with autonomous agentic workflows,
    </text>
    <text x="2" y="210" fill="#94A3B8" font-family="${FONT_SANS}" font-size="16" font-weight="400" font-style="normal">
      resilient developer platform scaffolds, and open-source tooling.
    </text>

    <!-- Real Capability Badges (Free of Design-System Metadata) -->
    <g transform="translate(0, 255)">
      <g>
        <rect width="170" height="36" rx="8" fill="#1E293B" stroke="#10B981" stroke-width="1.2"/>
        <circle cx="18" cy="18" r="4" fill="#10B981"/>
        <text x="32" y="23" fill="#A7F3D0" font-family="${FONT_SANS}" font-size="12" font-weight="700" font-style="normal">TIER 1 PRODUCTION</text>
      </g>
      <g transform="translate(182, 0)">
        <rect width="180" height="36" rx="8" fill="#1E293B" stroke="#0284C7" stroke-width="1.2"/>
        <text x="90" y="23" fill="#BAE6FD" font-family="${FONT_SANS}" font-size="12" font-weight="700" font-style="normal" text-anchor="middle">AGENTIC WORKFLOWS</text>
      </g>
      <g transform="translate(374, 0)">
        <rect width="165" height="36" rx="8" fill="#1E293B" stroke="#F59E0B" stroke-width="1.2"/>
        <text x="82" y="23" fill="#FDE68A" font-family="${FONT_SANS}" font-size="12" font-weight="700" font-style="normal" text-anchor="middle">OPEN PLATFORM</text>
      </g>
      <g transform="translate(550, 0)">
        <rect width="150" height="36" rx="8" fill="#1E293B" stroke="#64748B" stroke-width="1.2"/>
        <text x="75" y="23" fill="#CBD5E1" font-family="${FONT_SANS}" font-size="12" font-weight="700" font-style="normal" text-anchor="middle">broadsage.com</text>
      </g>
    </g>
  </g>
</svg>
`,
  },

  // 3. Status Badge: Official Production (800 × 200)
  {
    id: 'official',
    svgFile: 'broadsage_status_official.svg',
    pngFiles: ['official.png'],
    width: 800,
    height: 200,
    generateSvg: () => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" width="800" height="200">
  <defs>
    ${commonDefs}
  </defs>

  <!-- Container -->
  <rect width="800" height="200" rx="16" fill="url(#bgNavyGrad)"/>
  <rect width="800" height="200" rx="16" fill="url(#techGrid)"/>
  <rect width="800" height="200" rx="16" fill="none" stroke="#10B981" stroke-width="2" stroke-opacity="0.7"/>

  <!-- Left Accent Bar -->
  <path d="M 0 16 Q 0 0 16 0 L 24 0 L 24 200 L 16 200 Q 0 200 0 184 Z" fill="#10B981"/>

  <!-- Mascot Crest -->
  <g transform="translate(105, 100)">
    <circle cx="0" cy="0" r="62" fill="#060A19" stroke="#10B981" stroke-width="1.8"/>
    <g transform="scale(0.72)">
      <use href="#ollieMascot"/>
    </g>
  </g>

  <!-- Content Block: Centered & Spacious Without Bottom Specs Bar -->
  <g transform="translate(195, 46)">
    <!-- Pill Status -->
    <rect width="186" height="22" rx="5" fill="#064E3B" stroke="#10B981" stroke-width="1"/>
    <circle cx="12" cy="11" r="3.5" fill="#34D399"/>
    <text x="24" y="15" fill="#A7F3D0" font-family="${FONT_SANS}" font-size="10.5" font-weight="800" font-style="normal" letter-spacing="1">TIER 1 PRODUCTION</text>

    <!-- Main Wordmark + Status Lockup (Strict Two-Tone Upright Wordmark + Upright Divider) -->
    <text x="0" y="72" font-family="${FONT_SANS}" font-size="34" font-weight="800" font-style="normal" letter-spacing="-0.5">
      <tspan fill="#FFFFFF">BROAD</tspan><tspan fill="#F59E0B">SAGE</tspan>
      <tspan fill="#475569" font-weight="400"> | </tspan>
      <tspan fill="#10B981">OFFICIAL</tspan>
    </text>

    <!-- Subtitle -->
    <text x="2" y="104" fill="#94A3B8" font-family="${FONT_SANS}" font-size="15" font-weight="500" font-style="normal">
      Enterprise-Hardened &amp; Maintained under the DPE Initiative
    </text>
  </g>

  <!-- Right Verified Badge -->
  <g transform="translate(740, 100)" opacity="0.9">
    <circle cx="0" cy="0" r="24" fill="#064E3B" stroke="#10B981" stroke-width="1.5"/>
    <path d="M-8,1 L-2,7 L8,-5" fill="none" stroke="#34D399" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>
`,
  },

  // 4. Status Badge: Incubator Experiment (800 × 200)
  {
    id: 'incubator',
    svgFile: 'broadsage_status_incubator.svg',
    pngFiles: ['incubator.png'],
    width: 800,
    height: 200,
    generateSvg: () => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" width="800" height="200">
  <defs>
    ${commonDefs}
  </defs>

  <!-- Container -->
  <rect width="800" height="200" rx="16" fill="url(#bgNavyGrad)"/>
  <rect width="800" height="200" rx="16" fill="url(#techGrid)"/>
  <rect width="800" height="200" rx="16" fill="none" stroke="#0284C7" stroke-width="2" stroke-opacity="0.7"/>

  <!-- Left Accent Bar -->
  <path d="M 0 16 Q 0 0 16 0 L 24 0 L 24 200 L 16 200 Q 0 200 0 184 Z" fill="#0284C7"/>

  <!-- Mascot Crest -->
  <g transform="translate(105, 100)">
    <circle cx="0" cy="0" r="62" fill="#060A19" stroke="#0284C7" stroke-width="1.8"/>
    <g transform="scale(0.72)">
      <use href="#ollieMascot"/>
    </g>
  </g>

  <!-- Content Block: Centered & Spacious Without Bottom Specs Bar -->
  <g transform="translate(195, 46)">
    <!-- Pill Status -->
    <rect width="186" height="22" rx="5" fill="#0C4A6E" stroke="#0284C7" stroke-width="1"/>
    <circle cx="12" cy="11" r="3.5" fill="#38BDF8"/>
    <text x="24" y="15" fill="#BAE6FD" font-family="${FONT_SANS}" font-size="10.5" font-weight="800" font-style="normal" letter-spacing="1">EXPERIMENTAL LAB</text>

    <!-- Main Wordmark + Status Lockup (Strict Two-Tone Upright Wordmark + Upright Divider) -->
    <text x="0" y="72" font-family="${FONT_SANS}" font-size="34" font-weight="800" font-style="normal" letter-spacing="-0.5">
      <tspan fill="#FFFFFF">BROAD</tspan><tspan fill="#F59E0B">SAGE</tspan>
      <tspan fill="#475569" font-weight="400"> | </tspan>
      <tspan fill="#38BDF8">INCUBATOR</tspan>
    </text>

    <!-- Subtitle -->
    <text x="2" y="104" fill="#94A3B8" font-family="${FONT_SANS}" font-size="15" font-weight="500" font-style="normal">
      Autonomous Agentic AI Experiments, Candidate Scaffolds &amp; RFCs
    </text>
  </g>

  <!-- Right Flask / Lab Icon -->
  <g transform="translate(740, 100)" opacity="0.9">
    <circle cx="0" cy="0" r="24" fill="#0C4A6E" stroke="#0284C7" stroke-width="1.5"/>
    <path d="M-6,-10 L6,-10 M-2,-10 L-2,-3 L-8,8 C-9,10 -7,12 -5,12 L5,12 C7,12 9,10 8,8 L2,-3 L2,-10" fill="none" stroke="#38BDF8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="-1" cy="7" r="1.5" fill="#FFFFFF"/>
    <circle cx="3" cy="5" r="1" fill="#FFFFFF"/>
  </g>
</svg>
`,
  },

  // 5. Status Badge: Community Contributed (800 × 200)
  {
    id: 'community',
    svgFile: 'broadsage_status_community.svg',
    pngFiles: ['community.png'],
    width: 800,
    height: 200,
    generateSvg: () => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" width="800" height="200">
  <defs>
    ${commonDefs}
  </defs>

  <!-- Container -->
  <rect width="800" height="200" rx="16" fill="url(#bgNavyGrad)"/>
  <rect width="800" height="200" rx="16" fill="url(#techGrid)"/>
  <rect width="800" height="200" rx="16" fill="none" stroke="#8B5CF6" stroke-width="2" stroke-opacity="0.7"/>

  <!-- Left Accent Bar -->
  <path d="M 0 16 Q 0 0 16 0 L 24 0 L 24 200 L 16 200 Q 0 200 0 184 Z" fill="#8B5CF6"/>

  <!-- Mascot Crest -->
  <g transform="translate(105, 100)">
    <circle cx="0" cy="0" r="62" fill="#060A19" stroke="#8B5CF6" stroke-width="1.8"/>
    <g transform="scale(0.72)">
      <use href="#ollieMascot"/>
    </g>
  </g>

  <!-- Content Block: Centered & Spacious Without Bottom Specs Bar -->
  <g transform="translate(195, 46)">
    <!-- Pill Status -->
    <rect width="186" height="22" rx="5" fill="#4C1D95" stroke="#8B5CF6" stroke-width="1"/>
    <circle cx="12" cy="11" r="3.5" fill="#C084FC"/>
    <text x="24" y="15" fill="#E9D5FF" font-family="${FONT_SANS}" font-size="10.5" font-weight="800" font-style="normal" letter-spacing="1">COMMUNITY DRIVEN</text>

    <!-- Main Wordmark + Status Lockup (Strict Two-Tone Upright Wordmark + Upright Divider) -->
    <text x="0" y="72" font-family="${FONT_SANS}" font-size="34" font-weight="800" font-style="normal" letter-spacing="-0.5">
      <tspan fill="#FFFFFF">BROAD</tspan><tspan fill="#F59E0B">SAGE</tspan>
      <tspan fill="#475569" font-weight="400"> | </tspan>
      <tspan fill="#A78BFA">COMMUNITY</tspan>
    </text>

    <!-- Subtitle -->
    <text x="2" y="104" fill="#94A3B8" font-family="${FONT_SANS}" font-size="15" font-weight="500" font-style="normal">
      Open-Source Integrations, Third-Party Plugins &amp; Sidecars
    </text>
  </g>

  <!-- Right Heart / People Icon -->
  <g transform="translate(740, 100)" opacity="0.9">
    <circle cx="0" cy="0" r="24" fill="#4C1D95" stroke="#8B5CF6" stroke-width="1.5"/>
    <path d="M-8,3 C-8,-3 0,-7 0,0 C0,-7 8,-3 8,3 C8,8 0,13 0,13 C0,13 -8,8 -8,3 Z" fill="none" stroke="#C084FC" stroke-width="2" stroke-linejoin="round"/>
  </g>
</svg>
`,
  },

  // 6. Status Badge: Obsolete / Archived (800 × 200)
  {
    id: 'obsolete',
    svgFile: 'broadsage_status_obsolete.svg',
    pngFiles: ['obsolete.png'],
    width: 800,
    height: 200,
    generateSvg: () => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" width="800" height="200">
  <defs>
    ${commonDefs}
  </defs>

  <!-- Container -->
  <rect width="800" height="200" rx="16" fill="url(#bgNavyGrad)"/>
  <rect width="800" height="200" rx="16" fill="url(#techGrid)"/>
  <rect width="800" height="200" rx="16" fill="none" stroke="#EF4444" stroke-width="2" stroke-opacity="0.7"/>

  <!-- Left Accent Bar -->
  <path d="M 0 16 Q 0 0 16 0 L 24 0 L 24 200 L 16 200 Q 0 200 0 184 Z" fill="#EF4444"/>

  <!-- Mascot Crest (Muted grayscale) -->
  <g transform="translate(105, 100)">
    <circle cx="0" cy="0" r="62" fill="#060A19" stroke="#EF4444" stroke-width="1.8"/>
    <g transform="scale(0.72)" opacity="0.65">
      <use href="#ollieMascot"/>
    </g>
  </g>

  <!-- Content Block: Centered & Spacious Without Bottom Specs Bar -->
  <g transform="translate(195, 46)">
    <!-- Pill Status -->
    <rect width="186" height="22" rx="5" fill="#7F1D1D" stroke="#EF4444" stroke-width="1"/>
    <circle cx="12" cy="11" r="3.5" fill="#F87171"/>
    <text x="24" y="15" fill="#FECACA" font-family="${FONT_SANS}" font-size="10.5" font-weight="800" font-style="normal" letter-spacing="1">ARCHIVED / RETIRED</text>

    <!-- Main Wordmark + Status Lockup (Strict Two-Tone Upright Wordmark + Upright Divider) -->
    <text x="0" y="72" font-family="${FONT_SANS}" font-size="34" font-weight="800" font-style="normal" letter-spacing="-0.5">
      <tspan fill="#FFFFFF">BROAD</tspan><tspan fill="#F59E0B">SAGE</tspan>
      <tspan fill="#475569" font-weight="400"> | </tspan>
      <tspan fill="#F87171">ARCHIVED</tspan>
    </text>

    <!-- Subtitle -->
    <text x="2" y="104" fill="#94A3B8" font-family="${FONT_SANS}" font-size="15" font-weight="500" font-style="normal">
      Historical Reference Only — Superseded by Modern Architecture
    </text>
  </g>

  <!-- Right Warning Triangle Icon -->
  <g transform="translate(740, 100)" opacity="0.9">
    <circle cx="0" cy="0" r="24" fill="#7F1D1D" stroke="#EF4444" stroke-width="1.5"/>
    <path d="M0,-10 L10,8 L-10,8 Z" fill="none" stroke="#F87171" stroke-width="2" stroke-linejoin="round"/>
    <line x1="0" y1="-3" x2="0" y2="1" stroke="#F87171" stroke-width="2" stroke-linecap="round"/>
    <circle cx="0" cy="5" r="1" fill="#F87171"/>
  </g>
</svg>
`,
  },

  // 7. LinkedIn Company Cover Banner (1128 × 191)
  {
    id: 'linkedin-cover',
    svgFile: 'broadsage_linkedin_cover.svg',
    pngFiles: ['linkedin-cover.png'],
    width: 1128,
    height: 191,
    generateSvg: () => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1128 191" width="1128" height="191">
  <defs>
    ${commonDefs}
  </defs>

  <!-- Background Base -->
  <rect width="1128" height="191" fill="url(#bgNavyGrad)"/>
  <rect width="1128" height="191" fill="url(#techGrid)"/>
  <rect width="1128" height="191" fill="url(#ambientSky)"/>
  <rect width="1128" height="191" fill="url(#ambientGold)"/>

  <!-- Top Accent Horizon Line -->
  <rect x="0" y="0" width="1128" height="2.5" fill="#F59E0B"/>

  <!-- LinkedIn Safe Zone: Avatar occupies bottom-left up to x=320, primary content starts at x=340 -->
  <circle cx="120" cy="120" r="80" fill="none" stroke="#1E293B" stroke-width="1" stroke-dasharray="4,6" opacity="0.3"/>

  <!-- Mascot in Safe Zone (x=380) -->
  <g transform="translate(385, 96)">
    <circle cx="0" cy="0" r="62" fill="#0A1128" stroke="#1E293B" stroke-width="1.5"/>
    <circle cx="0" cy="0" r="56" fill="none" stroke="#0284C7" stroke-width="1" stroke-dasharray="4,4" opacity="0.5"/>
    <g transform="scale(0.72)">
      <use href="#ollieMascot"/>
    </g>
  </g>

  <!-- Content Block (x=475) -->
  <g transform="translate(475, 28)">
    <!-- Eyebrow -->
    <text x="0" y="16" fill="#38BDF8" font-family="${FONT_SANS}" font-size="11" font-weight="700" font-style="normal" letter-spacing="2">
      DEVELOPER PLATFORM ENGINEERING &amp; AGENTIC AI
    </text>

    <!-- Wordmark: Strict Broadsage Guidelines (Upright, ExtraBold 800, -0.5px tracking) -->
    <text x="0" y="65" font-family="${FONT_SANS}" font-size="44" font-weight="800" font-style="normal" letter-spacing="-0.5">
      <tspan fill="#FFFFFF">BROAD</tspan><tspan fill="#F59E0B">SAGE</tspan>
    </text>

    <!-- Tagline (Upright, Normal Style) -->
    <text x="2" y="96" fill="#E2E8F0" font-family="${FONT_SANS}" font-size="14.5" font-weight="500" font-style="normal">
      Broad Vision, Sage Guidance — Open to Everyone.
    </text>

    <!-- Real Capability Tags (Cleaned) -->
    <g transform="translate(0, 116)">
      <g>
        <rect width="138" height="24" rx="5" fill="#1E293B" stroke="#0284C7" stroke-width="1"/>
        <text x="69" y="16" fill="#7DD3FC" font-family="${FONT_SANS}" font-size="10.5" font-weight="700" font-style="normal" text-anchor="middle">AGENTIC AI</text>
      </g>
      <g transform="translate(146, 0)">
        <rect width="180" height="24" rx="5" fill="#1E293B" stroke="#F59E0B" stroke-width="1"/>
        <text x="90" y="16" fill="#FDE68A" font-family="${FONT_SANS}" font-size="10.5" font-weight="700" font-style="normal" text-anchor="middle">DEVELOPER PLATFORMS</text>
      </g>
      <g transform="translate(334, 0)">
        <rect width="138" height="24" rx="5" fill="#1E293B" stroke="#10B981" stroke-width="1"/>
        <text x="69" y="16" fill="#A7F3D0" font-family="${FONT_SANS}" font-size="10.5" font-weight="700" font-style="normal" text-anchor="middle">broadsage.com</text>
      </g>
    </g>
  </g>

  <!-- Far Right Subtle Branding -->
  <g transform="translate(1080, 100)" opacity="0.4">
    <polygon points="-12,-20 0,-35 12,-20" fill="#F59E0B"/>
    <polygon points="-12,20 0,35 12,20" fill="#0284C7"/>
  </g>
</svg>
`,
  },

  // 8. Twitter / X Header Banner (1500 × 500)
  {
    id: 'twitter-header',
    svgFile: 'broadsage_twitter_header.svg',
    pngFiles: ['twitter-header.png'],
    width: 1500,
    height: 500,
    generateSvg: () => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1500 500" width="1500" height="500">
  <defs>
    ${commonDefs}
  </defs>

  <!-- Background Base -->
  <rect width="1500" height="500" fill="url(#bgNavyGrad)"/>
  <rect width="1500" height="500" fill="url(#techGrid)"/>
  <rect width="1500" height="500" fill="url(#ambientSky)"/>
  <rect width="1500" height="500" fill="url(#ambientGold)"/>

  <!-- Top Line -->
  <rect x="0" y="0" width="1500" height="3" fill="#F59E0B"/>

  <!-- Twitter Avatar Clearance Zone: Bottom-Left (x: 50 to 380, y: 240 to 500) -->
  <circle cx="210" cy="380" r="140" fill="none" stroke="#1E293B" stroke-width="1" stroke-dasharray="6,8" opacity="0.3"/>

  <!-- Mascot in Center-Left Safe Area (x=510, y=250) -->
  <g transform="translate(510, 250)">
    <circle cx="0" cy="0" r="140" fill="#0A1128" stroke="#1E293B" stroke-width="2"/>
    <circle cx="0" cy="0" r="128" fill="none" stroke="#0284C7" stroke-width="1.8" stroke-dasharray="6,8" opacity="0.55"/>
    <circle cx="0" cy="0" r="114" fill="none" stroke="#F59E0B" stroke-width="1.2" opacity="0.4"/>
    <g transform="scale(1.48)">
      <use href="#ollieMascot"/>
    </g>
  </g>

  <!-- Content Block (x=700) -->
  <g transform="translate(700, 110)">
    <!-- Eyebrow -->
    <text x="0" y="24" fill="#F59E0B" font-family="${FONT_SANS}" font-size="14" font-weight="700" font-style="normal" letter-spacing="3">
      DEVELOPER PLATFORM ENGINEERING (DPE) INITIATIVE
    </text>

    <!-- Wordmark: Strict Broadsage Guidelines (Upright, ExtraBold 800, -0.5px tracking) -->
    <text x="0" y="105" font-family="${FONT_SANS}" font-size="80" font-weight="800" font-style="normal" letter-spacing="-0.5">
      <tspan fill="#FFFFFF">BROAD</tspan><tspan fill="#F59E0B">SAGE</tspan>
    </text>

    <!-- Tagline (Upright, Normal Style) -->
    <text x="2" y="156" fill="#E2E8F0" font-family="${FONT_SANS}" font-size="24" font-weight="500" font-style="normal">
      Broad Vision, Sage Guidance — Open to Everyone.
    </text>

    <!-- Pillars Statement -->
    <text x="2" y="196" fill="#94A3B8" font-family="${FONT_SANS}" font-size="16" font-weight="400" font-style="normal">
      Autonomous Agentic AI • Modern Developer Experience • Open Ecosystem
    </text>

    <!-- Real Capability Badges (Replaced Internal Mascot Text with Core Pillars) -->
    <g transform="translate(0, 240)">
      <g>
        <rect width="180" height="38" rx="8" fill="#1E293B" stroke="#0284C7" stroke-width="1.2"/>
        <text x="90" y="24" fill="#7DD3FC" font-family="${FONT_SANS}" font-size="12.5" font-weight="700" font-style="normal" text-anchor="middle">AGENTIC AI</text>
      </g>
      <g transform="translate(196, 0)">
        <rect width="210" height="38" rx="8" fill="#1E293B" stroke="#F59E0B" stroke-width="1.2"/>
        <text x="105" y="24" fill="#FDE68A" font-family="${FONT_SANS}" font-size="12.5" font-weight="700" font-style="normal" text-anchor="middle">DEVELOPER PLATFORMS</text>
      </g>
      <g transform="translate(422, 0)">
        <rect width="180" height="38" rx="8" fill="#1E293B" stroke="#10B981" stroke-width="1.2"/>
        <text x="90" y="24" fill="#A7F3D0" font-family="${FONT_SANS}" font-size="12.5" font-weight="700" font-style="normal" text-anchor="middle">broadsage.com</text>
      </g>
    </g>
  </g>
</svg>
`,
  },

  // 9. Universal Open Graph Share Card (1200 × 630)
  {
    id: 'og-share',
    svgFile: 'broadsage_og_share.svg',
    pngFiles: ['og-share.png'],
    width: 1200,
    height: 630,
    generateSvg: () => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    ${commonDefs}
  </defs>

  <!-- Background Base -->
  <rect width="1200" height="630" fill="url(#bgNavyGrad)"/>
  <rect width="1200" height="630" fill="url(#techGrid)"/>
  <rect width="1200" height="630" fill="url(#ambientSky)"/>
  <rect width="1200" height="630" fill="url(#ambientGold)"/>

  <!-- Glowing Enclosure Frame -->
  <rect x="20" y="20" width="1160" height="590" rx="24" fill="#0A1128" fill-opacity="0.85" stroke="#1E293B" stroke-width="2"/>

  <!-- Top Bar -->
  <g transform="translate(55, 60)">
    <rect width="240" height="28" rx="6" fill="#0F172A" stroke="#0284C7" stroke-width="1" stroke-opacity="0.5"/>
    <circle cx="16" cy="14" r="4" fill="#F59E0B"/>
    <text x="30" y="18" fill="#38BDF8" font-family="${FONT_SANS}" font-size="11.5" font-weight="700" font-style="normal" letter-spacing="1">OPEN SOURCE TO ENTERPRISE</text>
    <text x="1090" y="18" fill="#64748B" font-family="${FONT_MONO}" font-size="12" font-style="normal" text-anchor="end">broadsage.com</text>
  </g>
  <line x1="55" y1="102" x2="1145" y2="102" stroke="#1E293B" stroke-width="1.5"/>

  <!-- Mascot Crest (Left) -->
  <g transform="translate(230, 360)">
    <circle cx="0" cy="0" r="145" fill="#060A19" stroke="#1E293B" stroke-width="2"/>
    <circle cx="0" cy="0" r="132" fill="none" stroke="#0284C7" stroke-width="2" stroke-dasharray="6,8" opacity="0.6"/>
    <circle cx="0" cy="0" r="118" fill="none" stroke="#F59E0B" stroke-width="1.2" opacity="0.4"/>
    <g transform="scale(1.52)">
      <use href="#ollieMascot"/>
    </g>
  </g>

  <!-- Content Block (Right) -->
  <g transform="translate(425, 190)">
    <!-- Eyebrow -->
    <text x="0" y="20" fill="#38BDF8" font-family="${FONT_SANS}" font-size="14" font-weight="700" font-style="normal" letter-spacing="2">
      DEVELOPER PLATFORM ENGINEERING (DPE) INITIATIVE &amp; MISSION
    </text>

    <!-- Wordmark: Strict Broadsage Guidelines (Upright, ExtraBold 800, -0.5px tracking) -->
    <text x="0" y="95" font-family="${FONT_SANS}" font-size="76" font-weight="800" font-style="normal" letter-spacing="-0.5">
      <tspan fill="#FFFFFF">BROAD</tspan><tspan fill="#F59E0B">SAGE</tspan>
    </text>

    <!-- Tagline (Upright, Normal Style) -->
    <text x="2" y="145" fill="#F8FAFC" font-family="${FONT_SANS}" font-size="22" font-weight="600" font-style="normal">
      Broad Vision, Sage Guidance — Open to Everyone.
    </text>

    <!-- Subtitle (Pure Value Proposition, No Design Token Trivia) -->
    <text x="2" y="185" fill="#94A3B8" font-family="${FONT_SANS}" font-size="16" font-weight="400" font-style="normal">
      Accelerating engineering velocity with autonomous agentic AI workflows,
    </text>
    <text x="2" y="210" fill="#94A3B8" font-family="${FONT_SANS}" font-size="16" font-weight="400" font-style="normal">
      resilient developer platform engineering, and open-source tooling.
    </text>

    <!-- Feature Row (Real Product Capabilities) -->
    <g transform="translate(0, 255)">
      <g>
        <rect width="160" height="36" rx="8" fill="#1E293B" stroke="#F59E0B" stroke-width="1.2"/>
        <text x="80" y="23" fill="#FDE68A" font-family="${FONT_SANS}" font-size="12" font-weight="700" font-style="normal" text-anchor="middle">AGENTIC AI</text>
      </g>
      <g transform="translate(172, 0)">
        <rect width="210" height="36" rx="8" fill="#1E293B" stroke="#0284C7" stroke-width="1.2"/>
        <text x="105" y="23" fill="#BAE6FD" font-family="${FONT_SANS}" font-size="12" font-weight="700" font-style="normal" text-anchor="middle">DEVELOPER PLATFORMS</text>
      </g>
      <g transform="translate(394, 0)">
        <rect width="165" height="36" rx="8" fill="#1E293B" stroke="#10B981" stroke-width="1.2"/>
        <text x="82" y="23" fill="#A7F3D0" font-family="${FONT_SANS}" font-size="12" font-weight="700" font-style="normal" text-anchor="middle">OPEN ECOSYSTEM</text>
      </g>
    </g>
  </g>
</svg>
`,
  },
];

async function generateAll() {
  console.log('--- Generating Broadsage Vector & Raster Banners (Clean Industry-Grade Design) ---');

  for (const item of banners) {
    const svgContent = item.generateSvg();
    const svgPath = path.join(vectorDir, item.svgFile);
    fs.writeFileSync(svgPath, svgContent, 'utf-8');
    console.log(`✓ Vector SVG created: ${item.svgFile} (${item.width}x${item.height})`);

    // Render to PNG via Resvg with explicit Helvetica Neue geometric grotesque
    const resvg = new Resvg(svgContent, {
      fitTo: {
        mode: 'width',
        value: item.width,
      },
      font: {
        loadSystemFonts: true,
        defaultFontFamily: 'Helvetica Neue',
        sansSerifFamily: 'Helvetica Neue',
      },
    });
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    for (const pngFile of item.pngFiles) {
      const pngPath = path.join(rasterDir, pngFile);
      fs.writeFileSync(pngPath, pngBuffer);
      console.log(`  ✓ Raster PNG rendered: ${pngFile} (${item.width}x${item.height}, ${pngBuffer.length} bytes)`);
    }
  }

  console.log('--- All 9 Banner Assets Generated Successfully without Metadata Clutter! ---');
}

generateAll().catch((err) => {
  console.error('Generation failed:', err);
  process.exit(1);
});
