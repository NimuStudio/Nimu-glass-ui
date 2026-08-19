# UI Spec — Nimu Glass UI (Glassmorphism system)

> This document defines the UI conventions for this project. **All new/changed UI must follow it** and stay consistent with the Nimu visual system.

## 1. Theme System (3 themes)

| Theme | body class | Visual |
|---|---|---|
| Glass (default) | none | translucency + `backdrop-filter: blur()` + bright edge + liquid-glass glow background |
| Light | `body.light-mode` | solid background `#f7f5f0`, solid white elements, **canvas hidden** (`body.light-mode canvas{display:none}`), no blur |
| Dark | `body.dark-mode` | background `#1c1c1e`, text `#e8e6e3`, accent → `#d4b87a` |

- Toggle button: `themeToggle` (shows "玻璃/浅色/深色"), localStorage key `ysti_theme`
- **Themes only change colors — geometry (radius / spacing / heights) must stay identical**

## 2. Border Radius Scale (core)

| Level | Radius | Applies to |
|---|---|---|
| **Containers / cards** | `var(--radius)` = **20px** | sidebar, main-content, list items, order cards, glass panels |
| **Modals** | **28px** | modal dialogs |
| **Controls** | `var(--radius-sm)` = 14px | inputs, regular buttons, selects |
| **Pills** | `var(--radius-pill)` = 100px | badges, filter buttons, icon buttons, small buttons |
| **Chat bubbles** | 14px (4px pointer on one side) | messages |

**Rule**: every "glass panel / card / container" element (sidebar, main-content, list items, setting items, list cards) must use **20px radius**, never 14px.

## 3. Glass Style (glass theme default)

```css
/* Standard glass panel (container / card / list item) */
background: rgba(255,255,255,.45);           /* glass theme .40~.50 */
backdrop-filter: blur(20px) saturate(1.5);   /* large containers use blur(44px) */
-webkit-backdrop-filter: blur(20px) saturate(1.5);
border: 1px solid rgba(255,255,255,.5);      /* bright edge (highlight) */
border-radius: var(--radius);                /* 20px */
box-shadow: 0 8px 32px rgba(0,0,0,.04), inset 0 1px 0 rgba(255,255,255,.5);
```

- **hover glow**: `box-shadow: inset 0 0 0 1px rgba(255,255,255,.6), 0 8px 28px rgba(0,0,0,.06)` (dark theme uses gold `rgba(212,184,122,.25)`)
- **active/selected**: gold border `border-color: rgba(200,164,92,.6)` + `box-shadow: inset 0 0 0 1px rgba(200,164,92,.35), 0 4px 16px rgba(200,164,92,.15)`
- **top highlight line** (large containers): `::before{content:"";position:absolute;top:0;left:14px;right:14px;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.75),transparent)}`
- Button gradients: primary `linear-gradient(135deg,var(--accent2),var(--accent))`; service/agent `linear-gradient(135deg,var(--teal),#4a7a6e)`

## 4. Color Tokens (:root)

```css
--accent:#c8a45c; --accent2:#e8d5a3; --accent-glow:rgba(200,164,92,.3);
--teal:#6b9589; --danger:#c4554d;
--text:#2c2416; --text-secondary:rgba(44,36,22,.55); --text-dim:rgba(44,36,22,.35);
--bg:#f7f5f0;
--radius:20px; --radius-sm:14px; --radius-xs:10px; --radius-pill:100px;
--spring:cubic-bezier(0.34,1.56,0.64,1); --ease-out:cubic-bezier(0.16,1,0.3,1);
```

## 5. Interaction

- Button press: `:active{transform:scale(.95~.97)}`
- Card hover: glow/highlight + `translateX/Y(2px)`
- Transition: `transition:all .25s var(--spring)` or `.3s ease`
- Dark theme buttons/inputs: `background:rgba(255,255,255,.08~.1)` + `border:1px solid rgba(255,255,255,.12~.14)` + `color:#e8e6e3`
- Light theme: `background:#fff` / `rgba(0,0,0,.03~.06)` + `border:1px solid rgba(0,0,0,.06~.08)` + no blur

## 6. Checklist (before shipping new UI)

- [ ] Containers/cards use 20px radius
- [ ] All 3 themes verified (geometry identical, colors follow theme)
- [ ] Glass theme has blur + bright edge + hover glow
- [ ] Dark theme uses gold accent (`#d4b87a`), not yellow
- [ ] Light theme hides canvas, no blur
- [ ] Buttons have :active feedback
- [ ] Reuse CSS variables (no hardcoded colors/radii)
