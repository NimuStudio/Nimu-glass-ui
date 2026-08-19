<div align="center">

# ✦ YSTI Glass UI

**A refined 3-theme glassmorphism UI system for the Web**

Pure HTML / CSS / JS · Zero build dependencies · Copy & use

</div>

---

## What is it

YSTI Glass UI is a complete frontend UI system distilled from a real product (the YSTI game-services platform): **glassmorphism + light + dark** themes with one-click switching, plus liquid glass background, cursor glow, and glass edge-highlight effects.

It is not a framework — it is a **ready-to-use design asset**. Drop `ysti-glass.css` into your page and you get a polished set of components — cards, buttons, forms, modals, navigation, sidebar, login page, chat bubbles — all with built-in 3-theme adaptation.

## Screenshots

| Glass (default) | Light | Dark |
|---|---|---|
| ![glass](screenshots/glass.png) | ![light](screenshots/light.png) | ![dark](screenshots/dark.png) |

## Features

- ✨ **3-theme system**: Glass (default) / Light / Dark, one-click switch, geometry stays constant — only colors change
- 🧊 **Real glassmorphism**: translucency + `backdrop-filter` blur + bright edge + hover glow
- 🎨 **Liquid glass background**: `liquid-glass.js` — WebGL2 dynamic glass blobs with mouse-following glow (optional)
- 💫 **Cursor glow + edge highlight**: glass panels light up at the edge as the mouse passes (optional)
- 📱 **Responsive**: desktop / mobile (≤820px) with `safe-area` notch support
- 🚫 **Zero dependencies**: no frameworks, no UI libs, no build tools — plain HTML/CSS/JS
- 🧩 **Complete components**: cards, buttons, badges, forms, modals, nav, sidebar, login page, chat UI

## Quick Start

### Option 1: Open the demo

```bash
# any static server works (or just double-click index.html)
python -m http.server 8080
# visit http://localhost:8080
```

Click the top-right button to switch themes; hover over cards to see edge glow.

### Option 2: Add to your project

```html
<!-- 1. core styles -->
<link rel="stylesheet" href="ysti-glass.css">

<!-- 2. (optional) liquid glass background -->
<script src="liquid-glass.js"></script>

<!-- 3. (optional) cursor glow + edge highlight (see comments in index.html) -->
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
| `index.html` | 3-theme demo page (cards / buttons / badges / forms + all effects) |
| `examples/console.html` | Full "customer-service console": login, conversation list, chat, visitor info (with onboarding) |
| `examples/widget.js` | Embeddable chat-widget (one line of code, theme-aware) |

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

---

<div align="center">

**If this UI helps you, give it a ⭐**

</div>
