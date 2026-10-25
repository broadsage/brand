# Broadsage Digital & Physical Implementation Guide

How to implement the official Broadsage brand assets across various software platforms and production environments.

---

## 1. GitHub Organization (`github.com/broadsage`)

1. **Avatar:**
   - Upload `logos/vector/broadsage_logo_avatar.svg` (or export as 512×512 PNG).
   - This avatar features a circular gold boundary ring optimized for round profile display.

2. **README Hero Banner:**
   In `.github/profile/README.md` or repository READMEs:
   ```markdown
   <p align="center">
     <img src="./logos/vector/broadsage_logo_horizontal.svg" alt="Broadsage Platform" width="480"/>
   </p>

   <p align="center">
     <strong>Broad Vision, Sage Guidance — Open to Everyone</strong><br/>
     Developer Platform Engineering (DPE) — The Open Source to Enterprise Bridge
   </p>
   ```

---

## 2. CLI Tooling & Terminal Startup

To display Ollie upon CLI initialization in Node.js, Python, or Go:
- Read `logos/banner.txt` and print directly to `stdout`.
- When `NO_COLOR` is detected in the environment, fallback to `logos/banner_plain.txt`.

Example in Python:
```python
import os

def print_banner():
    banner_file = "logos/banner_plain.txt" if os.getenv("NO_COLOR") else "logos/banner.txt"
    with open(banner_file, "r") as f:
        print(f.read())
```

---

## 3. Web Platform & Documentation (`broadsage.com`)

1. **Favicon:**
   Link `logos/vector/broadsage_favicon.svg` in `<head>`:
   ```html
   <link rel="icon" type="image/svg+xml" href="/assets/broadsage_favicon.svg">
   ```

2. **Navbar Header:**
   ```html
   <header class="bg-[#0A1128] border-b border-[#1E293B] py-3 px-6">
     <a href="/" class="inline-block">
       <img src="/assets/broadsage_logo_horizontal.svg" alt="Broadsage" class="h-9 w-auto"/>
     </a>
   </header>
   ```

---

## 4. Physical Swag & Merch Specifications

- **Die-Cut Vinyl Hex Stickers:** Base size $2.5" \times 2.5"$ or $3" \times 3"$, matte UV protective laminate.
- **Enamel Pins:** Hard enamel, polished black nickel metal base with Solar Gold `#F59E0B` and Azure `#0284C7` fills.
- **Apparel (Hoodies & T-Shirts):** Midnight Navy fabric (Cotton/Poly 80/20), screen print or direct-to-garment (DTG) with high-density gold ink for Ollie's chest beacon.

