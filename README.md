# Broadsage Official Brand Kit & Style Guide 🦉

> **“Broad Vision, Sage Guidance — Open to Everyone”**  
> *Developer Platform Engineering (DPE) • The Open Source to Enterprise Bridge*  
> **Status:** Version 1.0 (Locked & Production-Ready)

Welcome to the official Broadsage brand kit project. This repository contains the complete brand assets, design tokens, typography specifications, usage guidelines, and interactive documentation for Broadsage.

---

## 🏢 Brand Architecture: The DPE Initiative (Open Source ↔ Enterprise Bridge)

Broadsage operates as a specialized **Developer Platform Engineering (DPE)** organization. Rather than fragmenting into artificial commercial silos or fictional product suites, Broadsage serves as the strategic architectural conduit between the fast-moving open-source ecosystem and resilient enterprise engineering:

* **Open-Source Hardening & Governance:** Curating, auditing, and hardening distributed open-source stacks (Kubernetes, cloud runtimes, container engines) to eliminate security vulnerabilities and vendor lock-in.
* **Autonomous Agentic Workflows:** Integrating AI review agents, LLM reasoning meshes, and automated migration assistants directly into developer CI/CD loops to amplify engineering velocity.
* **Unified Telemetry & Lakehouse:** High-throughput streaming metrics (ClickHouse & OpenTelemetry) tracking DORA metrics, build latencies, and platform health across the entire distributed lifecycle.
* **Paved Roads & Developer Toolchains:** Open-source developer CLI runtimes, golden path scaffolds, and frictionless local-to-cloud self-service environments that eliminate developer cognitive load.

---

## 🌟 Mission & Vision: The Open-Source Way

* **Mission:** Broadsage champions the open-source way by building transparent, community-driven technologies and transforming distributed open-source stacks—from agentic AI to cloud infrastructure—into hardened, enterprise-grade architectures that empower engineering freedom without vendor lock-in.
* **Vision:** *“Broad Vision, Sage Guidance — Open to Everyone.”* To be the global catalyst and trusted foundation for open enterprise computing. By uniting radical open-source transparency with calm, authoritative architectural guidance, Broadsage ensures that the future of software engineering remains open, sovereign, and accessible to all developers.

---

## 📁 Project Directory Structure

```text
broadsage-brand-kit/
├── .github/
│   └── workflows/
│       └── deploy.yml                  # Automated GitHub Pages CI/CD deployment workflow
├── .nojekyll                           # Bypasses Jekyll processing on GitHub Pages
├── README.md                           # Master documentation
├── astro.config.mjs                    # Astro 7.4 configuration (Tailwind v4, React 19)
├── package.json                        # NPM package configuration and scripts
├── tsconfig.json                       # TypeScript configuration
├── public/                             # Static downloadable assets & deployment root
│   ├── CNAME                           # Custom domain configuration (brand.broadsage.com)
│   ├── banners/                        # Repository & social status banners
│   └── logos/
│       ├── vector/                     # Master production vector marks
│       │   ├── broadsage_logo_primary.svg            # 200×200 Primary Square Emblem
│       │   ├── broadsage_logo_horizontal.svg         # 440×120 Horizontal Wordmark (Dark Theme)
│       │   ├── broadsage_logo_horizontal_light.svg   # 440×120 Horizontal Wordmark (Light Theme)
│       │   ├── broadsage_logo_avatar.svg             # 160×160 Circular Git & Slack Avatar
│       │   └── broadsage_favicon.svg                 # 32×32 Web Favicon
│       ├── banner.txt                                # ANSI-colored terminal startup banner
│       └── banner_plain.txt                          # Plain ASCII terminal banner
├── src/                                # Astro + React application source code
│   ├── components/                     # Static .astro components (Header, Hero, Narrative, Specs, CLI)
│   ├── islands/                        # Interactive React 19 islands (AssetStudio, ColorPalette, BannerHub)
│   ├── layouts/                        # BaseLayout with ClientRouter view transitions
│   ├── pages/                          # Astro page routes (index.astro)
│   └── styles/                         # Global CSS & Tailwind v4 theme definitions
├── tokens/
│   ├── colors.json                     # W3C Standard Design Tokens (JSON)
│   ├── colors.css                      # CSS Custom Properties (:root variables)
│   ├── colors.scss                     # SCSS Variables
│   └── tailwind.config.js              # Tailwind CSS theme extension
└── guidelines/
    ├── DO_AND_DONT.md                  # Strict visual usage rules & governance
    ├── COLOR_SYSTEM.md                 # Complete color values & WCAG contrast matrix
    ├── TYPOGRAPHY.md                   # Font hierarchy & wordmark geometry
    └── IMPLEMENTATION.md               # Deployment instructions for GitHub, CLI & Web
```

---

## 🚀 Quick Start

### Run the Interactive Brand Portal (Astro 7.4 + React 19)
```bash
# Install dependencies:
npm install

# Start local development server with hot module reload:
npm run dev

# Build the production static site:
npm run build

# Preview the production static build locally:
npm run preview
```

---

## 🎨 Color System (Palette 3: Solar Gold & Midnight Navy)

| Role | Color Name | HEX | RGB | CMYK | Pantone |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Canvas Base** | **Midnight Navy** | `#0A1128` | `10, 17, 40` | `75, 58, 0, 84` | `282 C` |
| **Sage Guidance** | **Solar Gold Amber** | `#F59E0B` | `245, 158, 11` | `0, 35, 96, 4` | `130 C` |
| **Iris Highlight** | **Solar Light Gold** | `#FCD34D` | `252, 211, 77` | `0, 16, 69, 1` | `120 C` |
| **Broad Vision** | **Cloud Azure** | `#0284C7` | `2, 132, 199` | `99, 34, 0, 22` | `2174 C` |
| **Precision Frame** | **Crisp Snow White** | `#FFFFFF` | `255, 255, 255` | `0, 0, 0, 0` | `Opaque White`|

---

## 💻 Integrating Design Tokens

### In CSS:
```css
@import "./tokens/colors.css";

.my-element {
  background-color: var(--broadsage-navy-900);
  color: var(--broadsage-gold-500);
}
```

### In Tailwind CSS:
```javascript
// tailwind.config.js
const broadsageTokens = require('./tokens/tailwind.config.js');

module.exports = {
  ...broadsageTokens,
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
};
```

---

## 📜 Key Brand Guidelines Summary

- **Clearspace ($X$):** Always maintain an exclusion zone equal to $0.25 \times \text{Height}$ of the mascot on all sides.
- **Wordmark Styling:** `BROAD` is always Crisp White (or Midnight Navy in light mode); `SAGE` is always Solar Gold Amber (`#F59E0B`).
- **No Distortion:** Scale proportionally with 1:1 aspect ratio locked. Never stretch, skew, or recolor with unapproved hues.
- **Backgrounds:** Maintain high optical contrast by using Midnight Navy (`#0A1128`), dark editor canvases, or Crisp White (`#FFFFFF`).

---

## 🚀 Live Brand Portal & GitHub Pages Deployment

The interactive brand portal is pre-configured for automated zero-downtime deployment to **GitHub Pages** via GitHub Actions:

* **Workflow:** [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml)
* **Trigger:** Automatically builds on push to `main` (or manual dispatch).
* **Build Step:** Compiles static web portal deterministically via `npm run build` with Astro 7.4 + React 19.
* **Artifact:** Publishes the static portal directly to `https://brand.broadsage.com` with automated HTTPS and `.nojekyll` protection.

### Enabling GitHub Pages on GitHub:
1. Navigate to **Settings** → **Pages** in your repository.
2. Under **Build and deployment** → **Source**, select **GitHub Actions**.
3. Push to `main` (or run the workflow under **Actions**) to launch the live site.

---

## 📞 Support & Brand Governance

For questions regarding logo usage, co-branding partnerships, or trademark guidelines, please visit [broadsage.com](https://broadsage.com) or reach out to Broadsage.

