import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { Resvg } from '@resvg/resvg-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const tmpDir = path.join(rootDir, 'dist-zip-tmp');
const zipOutput = path.join(rootDir, 'public', 'broadsage-brand-assets.zip');

if (fs.existsSync(tmpDir)) {
  fs.rmSync(tmpDir, { recursive: true, force: true });
}
fs.mkdirSync(tmpDir, { recursive: true });

const dirs = {
  logosSvg: path.join(tmpDir, 'logos', 'vector-svg'),
  logosPng: path.join(tmpDir, 'logos', 'high-dpi-png'),
  bannersSvg: path.join(tmpDir, 'banners', 'vector-svg'),
  bannersPng: path.join(tmpDir, 'banners', 'high-dpi-png'),
  tokens: path.join(tmpDir, 'tokens'),
};

Object.values(dirs).forEach((d) => fs.mkdirSync(d, { recursive: true }));

console.log('--- Packaging Broadsage Official Brand Kit ---');

// 1. Copy Logo SVGs
const logoSvgSrc = path.join(rootDir, 'public', 'logos', 'vector');
const logoFiles = fs.readdirSync(logoSvgSrc).filter((f) => f.endsWith('.svg'));
for (const file of logoFiles) {
  const content = fs.readFileSync(path.join(logoSvgSrc, file), 'utf-8');
  fs.writeFileSync(path.join(dirs.logosSvg, file), content);

  // Render High-DPI PNGs
  const isHorizontal = file.includes('horizontal');
  const targetWidth = isHorizontal ? 2048 : 1024;
  const resvg = new Resvg(content, {
    fitTo: { mode: 'width', value: targetWidth },
    font: {
      loadSystemFonts: true,
      defaultFontFamily: 'Helvetica Neue',
    },
  });
  const pngData = resvg.render().asPng();
  const pngName = file.replace('.svg', '.png');
  fs.writeFileSync(path.join(dirs.logosPng, pngName), pngData);
  console.log(`✓ Logo rendered: ${pngName} (${targetWidth}px)`);
}

// 2. Copy Banner SVGs & PNGs
const excludedBanners = [
  'og-share.png',
  'broadsage_og_share.svg',
  'github-repo-preview.png',
  'broadsage_repo_preview.svg',
  'broadsage_github_hero.png',
  'obsolete.png',
  'broadsage_status_obsolete.svg',
];

const bannerSvgSrc = path.join(rootDir, 'public', 'banners', 'vector');
let copiedSvgs = 0;
if (fs.existsSync(bannerSvgSrc)) {
  const bannerSvgs = fs.readdirSync(bannerSvgSrc).filter((f) => f.endsWith('.svg') && !excludedBanners.includes(f));
  for (const file of bannerSvgs) {
    fs.copyFileSync(path.join(bannerSvgSrc, file), path.join(dirs.bannersSvg, file));
    copiedSvgs++;
  }
}

const bannerPngSrc = path.join(rootDir, 'public', 'banners');
let copiedPngs = 0;
const bannerPngs = fs.readdirSync(bannerPngSrc).filter((f) => f.endsWith('.png') && !excludedBanners.includes(f));
for (const file of bannerPngs) {
  fs.copyFileSync(path.join(bannerPngSrc, file), path.join(dirs.bannersPng, file));
  copiedPngs++;
}
console.log(`✓ Banners copied: ${copiedPngs} PNGs, ${copiedSvgs} SVGs`);

// 3. Copy Design Tokens
const tokenFiles = ['colors.json', 'colors.css', 'tailwind.config.js'];
for (const file of tokenFiles) {
  const tokenPath = path.join(rootDir, 'tokens', file);
  if (fs.existsSync(tokenPath)) {
    fs.copyFileSync(tokenPath, path.join(dirs.tokens, file));
  }
}
console.log('✓ Design tokens copied');

// 4. Create README Cheat Sheet
const readmeContent = `========================================================================
BROADSAGE OFFICIAL BRAND ASSETS & PRESS KIT (v1.0.0)
Broad Vision, Sage Guidance — Open to Everyone
https://brand.broadsage.com
========================================================================

1. OFFICIAL NAMING CONVENTION & PRESS INQUIRIES
   - Correct:   Broadsage (one word, title case in prose)
   - Correct:   BROADSAGE (uppercase in official wordmark lockup)
   - Incorrect: Broad Sage (never separated)
   - Incorrect: BroadSage (never camelCase)
   - Incorrect: broadsage (never lowercase in formal text)
   - Press & Media Inquiries: brand@broadsage.com

2. OFFICIAL PRESS BOILERPLATE (PRE-APPROVED COPY)
   [One-Sentence Elevator Pitch]
   "Broadsage is an enterprise open-source software company developing cloud-native applications and developer platforms — Broad Vision, Sage Guidance, Open to Everyone."

   [50-Word Standard Boilerplate]
   "Broadsage is an enterprise open-source software company developing production applications, cloud-native developer platforms, and agentic engineering tools. Modeled on proven enterprise open-source principles, Broadsage delivers hardened application architectures and sovereign developer runtimes featuring Ollie the Sage Owl, empowering organizations with mission-critical stability and zero vendor lock-in."

3. CORE COLOR PALETTE (Palette 3)
   - Midnight Navy (Canvas Base):     #0A1128  | rgb(10, 17, 40)
   - Obsidian Slate (Deep Canvas):    #050814  | rgb(5, 8, 20)
   - Solar Gold (Sage Beacon):        #F59E0B  | rgb(245, 158, 11)  | Pantone 130 C
   - Solar Light Gold (Iris Glint):   #FCD34D  | rgb(252, 211, 77)  | Pantone 120 C
   - Cloud Azure (Broad Vision):      #0284C7  | rgb(2, 132, 199)   | Pantone 2174 C
   - Crisp Snow White (Headings):     #FFFFFF  | rgb(255, 255, 255)

4. GROUND & CONTRAST RULES
   - Native Dark Grounds: Use primary two-tone mark (#FFFFFF + #F59E0B).
   - Crisp White Grounds:  Use dark wordmark (#0A1128 + #D97706).
   - Solid Accent Grounds: When printing on solid Solar Gold Amber (#F59E0B) or Cloud Azure,
     use the solid Midnight Navy (#0A1128) monochrome lockup. Never use the multi-color mark on amber.

5. TYPOGRAPHY STACKS
   - UI & Prose:  -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
   - Code & CLI:  ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace

6. FOLDER CONTENTS
   /logos/vector-svg/   -> Infinite-resolution SVG vector marks
   /logos/high-dpi-png/ -> Transparent PNGs (1024px & 2048px)
   /banners/vector-svg/   -> GitHub hero and repository status badges (SVG)
   /banners/high-dpi-png/ -> Platform-native raster banners and status badges
   /tokens/             -> CSS variables, Tailwind config, and JSON tokens

For complete live guidelines, token matrix, and vector canvas tools, visit:
https://brand.broadsage.com
`;

fs.writeFileSync(path.join(tmpDir, 'README-BRAND-GUIDELINES.txt'), readmeContent);

// 5. Create ZIP Archive
try {
  if (fs.existsSync(zipOutput)) {
    fs.unlinkSync(zipOutput);
  }
  execSync(`cd "${tmpDir}" && zip -r "${zipOutput}" . -x "*.DS_Store"`, { stdio: 'inherit' });
  const stats = fs.statSync(zipOutput);
  console.log(`✓ Successfully generated ${zipOutput} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
} finally {
  fs.rmSync(tmpDir, { recursive: true, force: true });
}

