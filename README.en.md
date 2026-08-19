<div align="center">

# ✦ YSTI Glass UI

**A refined 3-theme glassmorphism UI system for the Web**

Pure HTML / CSS / JS · Zero build dependencies · Copy & use

</div>

---

## What is it

YSTI Glass UI is a complete web UI system: **glassmorphism + light + dark** themes with one-click switching, plus liquid glass background, cursor glow, and glass edge-highlight effects.

It is not a framework — it is a **ready-to-use design asset**. Drop `ysti-glass.css` into your page and you get a polished set of components — cards, buttons, forms, modals, navigation, sidebar, login page, chat bubbles — all with built-in 3-theme adaptation.

## Screenshots

| Glass (default) | Light | Dark |
|---|---|---|
| ![glass](screenshots/glass.png) | ![light](screenshots/light.png) | ![dark](screenshots/dark.png) |

🎬 **Theme switching animation**: ![themes](screenshots/themes.gif)

**Component close-ups** (modal / dropdown / chat UI):

| | | |
|---|---|---|
| ![modal](screenshots/modal.png) | ![dropdown](screenshots/dropdown.png) | ![chat](screenshots/chat.png) |

📱 **Mobile H5**: ![mobile](screenshots/mobile.png)

## Features

- ✨ **3-theme system**: Glass (default) / Light / Dark, one-click switch, geometry stays constant — only colors change
- 🧊 **Real glassmorphism**: translucency + `backdrop-filter` blur + bright edge + hover glow
- 🎨 **Liquid glass background**: `liquid-glass.js` — WebGL2 dynamic glass blobs with mouse-following glow (optional)
- 💫 **Cursor glow + edge highlight**: glass panels light up at the edge as the mouse passes (optional)
- 📱 **Responsive**: desktop / mobile (≤820px) with `safe-area` notch support
- 🚫 **Zero dependencies**: no frameworks, no UI libs, no build tools — plain HTML/CSS/JS
- 🧩 **Complete components**: cards, buttons, badges, forms, modals, nav, sidebar, login page, chat UI

## Live Demo

👉 [https://ystibdjmnm.github.io/ysti-glass-ui/](https://ystibdjmnm.github.io/ysti-glass-ui/) (GitHub Pages)

## Quick Start

### Option 1: Open the demo

```bash
# any static server works (or just double-click index.html)
python -m http.server 8080
# visit http://localhost:8080
```

Click the top-right button to switch themes; hover over cards to see edge glow. The demo page covers cards, buttons, badges, forms, modal, dropdown, chat UI, login panel and lists.

### Option 2: Add to your project

**Way A: CDN (recommended, no download)**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ystibdjmnm/ysti-glass-ui@main/assets/ysti-glass.css">
<!-- optional: liquid glass background -->
<script src="https://cdn.jsdelivr.net/gh/ystibdjmnm/ysti-glass-ui@main/assets/liquid-glass.js"></script>
```

**Way B: Download locally**

Copy `assets/ysti-glass.css` into your project, then:

```html
<link rel="stylesheet" href="ysti-glass.css">
```

**Minimal runnable example** (save as an .html file and open):

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>My page</title>
<link rel="stylesheet" href="ysti-glass.css">
</head>
<body>
  <div class="order-card" style="max-width:380px;margin:48px auto;padding:26px">
    <h3>My glass card</h3>
    <p style="color:var(--text-dim)">Just include ysti-glass.css and all components are ready.</p>
    <div style="display:flex;gap:10px;margin-top:14px">
      <button class="btn-accept">Primary</button>
      <button class="btn-cancel">Cancel</button>
    </div>
  </div>
  <!-- Try <body class="dark-mode"> for dark theme -->
</body>
</html>
```

No initialization needed — styles work out of the box.

### Theme switching

```html
<!-- Glass (default, no class) -->

<!-- Light -->
<body class="light-mode">

<!-- Dark -->
<body class="dark-mode">
```

Persistent toggle (localStorage) — see the `themeToggle` example at the end of `index.html`:

```js
var theme = localStorage.getItem("ysti_theme") || "glass";
// cycle glass → light → dark, write to body class + localStorage
```

## Components

| Component | Classes | Notes |
|---|---|---|
| Glass card | `.order-card` | generic glass card with hover glow |
| Primary buttons | `.btn-accept` `.btn-confirm` `.btn-checkout` `.btn-save` | gold/teal gradients |
| Secondary button | `.btn-cancel` | subtle button |
| Login page | `.login-overlay` `.login-panel` `.login-field` `.login-btn` | complete login card |
| Modal | `.modal-overlay` `.modal-panel` | 28px rounded glass dialog |
| Form | `.form-group` `.form-row` | inputs / textareas / selects |
| Dropdown | `.filter-dropdown-trigger` `.filter-dropdown-menu` `.filter-dropdown-item` | click to expand |
| Chat UI | `.chat-msg` `.chat-input-area` | message bubbles + input bar |
| Topbar | `.topbar` `.topbar-logo` `.topbar-nav-btn` `.icon-btn` | navigation bar |
| Sidebar | `.sidebar` `.sidebar-title` `.game-btn` `.oc-filter-btn` | nav / filters |
| Main content | `.main-content` | glass panel container |
| Badges | custom + `--accent/--teal/--danger` tokens | pill style |
| Search bar | `.search-bar` `.search-input` `.search-btn` | |
| List row | `.row-item` | generic list item |
| Empty state | `.empty-state` | |
| Toast | `.toast` | top notification |

> Switch themes by adding `light-mode` / `dark-mode` class to `<body>` — all components adapt automatically.

## Design Tokens

### Border radius scale (important)

| Level | Radius | Applies to |
|---|---|---|
| Containers / cards | `var(--radius)` = **20px** | sidebar, main content, order cards, list items |
| Modals | **28px** | modal dialogs |
| Controls | `var(--radius-sm)` = 14px | inputs, buttons, selects |
| Pills | `var(--radius-pill)` = 100px | badges, filters, small buttons |
| Chat bubbles | 14px | messages |

### Glass style

```css
background: rgba(255,255,255,.45);
backdrop-filter: blur(20px) saturate(1.5);
-webkit-backdrop-filter: blur(20px) saturate(1.5);
border: 1px solid rgba(255,255,255,.5);
border-radius: var(--radius);
box-shadow: 0 8px 32px rgba(0,0,0,.04), inset 0 1px 0 rgba(255,255,255,.5);
```

### Color tokens

```css
--accent: #c8a45c;   /* gold primary */
--teal:   #6b9589;   /* teal secondary */
--danger: #c4554d;   /* danger */
--text:   #2c2416;   /* main text */
--bg:     #f7f5f0;   /* background */
```

Dark mode auto-overrides: bg `#1c1c1e`, text `#e8e6e3`, accent `#d4b87a`. Full spec in [`UI.md`](UI.md).

## Examples

| File | Content |
|---|---|
| `index.html` | 3-theme demo page (cards/buttons/badges/forms/modal/dropdown/chat/login/list + all effects) |
| `examples/console.html` | Full "customer-service console" example ⚠️ **requires a backend API, not runnable as static file** |
| `examples/widget.js` | Embeddable chat-widget (one line of code, theme-aware) |

> **Enable GitHub Pages**: repo Settings → Pages → Source `Deploy from a branch` → Branch `main` / `/ (root)` → Save. Live at `https://ystibdjmnm.github.io/ysti-glass-ui/`.

## Structure

```
ysti-glass-ui/
├── assets/
│   ├── ysti-glass.css     # core styles (3 themes, 114KB)
│   └── liquid-glass.js    # WebGL2 liquid glass background
├── examples/
│   ├── console.html       # customer-service console example
│   └── widget.js          # embeddable chat widget
├── screenshots/           # 3-theme screenshots
├── index.html             # demo page
├── UI.md                  # design spec
├── README.md              # Chinese docs
├── README.en.md           # English docs
└── LICENSE
```

## Tech

- Vanilla HTML / CSS / JavaScript (ES5-compatible)
- WebGL2 (liquid glass effect only; degrades gracefully when unavailable)
- No npm dependencies, no build step

## Browser Support

- Modern browsers (Chrome / Edge / Safari / Firefox)
- `backdrop-filter` needs a recent browser; falls back to plain translucent color otherwise
- Full mobile (H5) support with `env(safe-area-inset-*)`

## License

[MIT](LICENSE) — free to use, modify, and use commercially with attribution.

## Contributing

Open an [Issue](https://github.com/ystibdjmnm/ysti-glass-ui/issues) (bug report / feature request templates available) or a Pull Request — see [CONTRIBUTING.md](CONTRIBUTING.md).

---

<div align="center">

**If this UI helps you, give it a ⭐**

</div>
