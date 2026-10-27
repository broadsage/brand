# Broadsage Digital & Physical Implementation Guide

How to implement the official Broadsage brand assets across various software platforms and production environments.

---

## 1. GitHub Organization (`github.com/broadsage`)

1. **Avatar:**
   - Upload `public/logos/vector/broadsage_logo_avatar.svg` (or export as 512×512 PNG).
   - Hosted CDN: `https://brand.broadsage.com/logos/vector/broadsage_logo_avatar.svg`.
   - This avatar features a circular gold boundary ring optimized for round profile display.

2. **README Hero Banner:**
   In `.github/profile/README.md` or repository READMEs:
   ```markdown
   [![Broadsage Platform](https://brand.broadsage.com/banners/github-welcome.png)](https://broadsage.com)
   ```

3. **Repository Social Preview Card:**
   - In GitHub Repository **Settings → General → Social preview**:
   - Upload `public/banners/github-repo-preview.png` (or download from [brand.broadsage.com#banners](https://brand.broadsage.com#banners)).

---

## 2. Repository Lifecycle Status Badges (800 × 200)

Place at the top of individual project README files to communicate repository maturity tier:

```markdown
<!-- Official Production Tier -->
[![Tier 1 Official](https://brand.broadsage.com/banners/official.png)](https://broadsage.com)

<!-- Incubator Experimental Lab -->
[![Broadsage Incubator](https://brand.broadsage.com/banners/incubator.png)](https://broadsage.com)

<!-- Community Contributed Plugin / Sidecar -->
[![Community Contributed](https://brand.broadsage.com/banners/community.png)](https://broadsage.com)

<!-- Archived / Deprecated Toolchain -->
[![Archived Repository](https://brand.broadsage.com/banners/obsolete.png)](https://broadsage.com)
```

---

## 3. Social Media Suites

1. **LinkedIn Company Page:**
   - Dimensions: `1128 × 191 px`
   - File: `public/banners/linkedin-cover.png` (Vector: `public/banners/vector/broadsage_linkedin_cover.svg`)
   - Calibrated safe zone leaves lower-left clearance for the circular profile avatar.

2. **X / Twitter Profile:**
   - Dimensions: `1500 × 500 px` (3:1 aspect ratio)
   - File: `public/banners/twitter-header.png` (Vector: `public/banners/vector/broadsage_twitter_header.svg`)
   - Safe zone provides bottom-left clearance for the circular profile picture.

3. **Universal Open Graph (Web, Slack, Discord, LinkedIn Share):**
   - Dimensions: `1200 × 630 px` (1.91:1 aspect ratio)
   - File: `public/banners/og-share.png` (Vector: `public/banners/vector/broadsage_og_share.svg`)
   - Add to HTML `<head>`:
     ```html
     <meta property="og:image" content="https://brand.broadsage.com/banners/og-share.png" />
     <meta name="twitter:image" content="https://brand.broadsage.com/banners/og-share.png" />
     ```

---

## 4. CLI Tooling & Terminal Startup

To display Ollie upon CLI initialization in Node.js, Python, or Go:
- Read `public/logos/banner.txt` and print directly to `stdout`.
- When `NO_COLOR` is detected in the environment, fallback to `public/logos/banner_plain.txt`.

Example in Python:
```python
import os

def print_banner():
    banner_file = "public/logos/banner_plain.txt" if os.getenv("NO_COLOR") else "public/logos/banner.txt"
    with open(banner_file, "r") as f:
        print(f.read())
```

---

## 3. Web Platform & Documentation (`broadsage.com`)

1. **Favicon:**
   Link `public/logos/vector/broadsage_favicon.svg` in `<head>`:
   ```html
   <link rel="icon" type="image/svg+xml" href="/logos/vector/broadsage_favicon.svg">
   ```

2. **Navbar Header:**
   ```html
   <header class="bg-[#0A1128] border-b border-[#1E293B] py-3 px-6">
     <a href="/" class="inline-block">
       <img src="/logos/vector/broadsage_logo_horizontal.svg" alt="Broadsage" class="h-9 w-auto"/>
     </a>
   </header>
   ```

---

## 4. Physical Swag & Merch Specifications

- **Die-Cut Vinyl Hex Stickers:** Base size $2.5" \times 2.5"$ or $3" \times 3"$, matte UV protective laminate.
- **Enamel Pins:** Hard enamel, polished black nickel metal base with Solar Gold `#F59E0B` and Azure `#0284C7` fills.
- **Apparel (Hoodies & T-Shirts):** Midnight Navy fabric (Cotton/Poly 80/20), screen print or direct-to-garment (DTG) with high-density gold ink for Ollie's chest beacon.
