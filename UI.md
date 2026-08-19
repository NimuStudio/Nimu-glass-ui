# UI 规范 — Kefu 客服 SaaS（Nimu 圆角玻璃体系）

> 本文件定义本项目的 UI 统一约定。**所有新增/修改的 UI 必须遵守**，与 Nimu 视觉保持同一体系。

## 1. 主题体系（三主题，Nimu 同款）

| 主题 | body class | 视觉特征 |
|---|---|---|
| 玻璃（默认） | 无 | 半透明 + `backdrop-filter: blur()` + 亮边框 + liquid-glass 泛光背景 |
| 浅色 | `body.light-mode` | 纯白背景 `#f7f5f0`，元素纯白，**隐藏 canvas**（`body.light-mode canvas{display:none}`），去 blur |
| 深色 | `body.dark-mode` | 背景 `#1c1c1e`，文字 `#e8e6e3`，accent 变 `#d4b87a` |

- 切换按钮：`themeToggle`（显示"玻璃/浅色/深色"），localStorage 键 `ysti_theme`
- **三主题只换颜色，几何尺寸（圆角/间距/高度）必须一致**

## 2. 圆角规范（核心）

| 层级 | 圆角 | 适用 |
|---|---|---|
| **容器/卡片** | `var(--radius)` = **20px** | sidebar、main-content、会话项、订单卡、列表项等玻璃板 |
| **弹窗** | **28px** | modal-card |
| **控件** | `var(--radius-sm)` = 14px | 输入框、普通按钮、select |
| **胶囊** | `var(--radius-pill)` = 100px | 标签、筛选按钮、icon 按钮、小按钮 |
| **消息气泡** | 14px（一侧 4px 指向） | 聊天消息 |

**规则**：凡是"玻璃板/卡片/容器"类元素（sidebar、main-content、会话项、设置项、列表卡片）一律 **20px 圆角**，不要用 14px。

## 3. 玻璃样式规范（玻璃主题默认）

```css
/* 标准玻璃板（容器/卡片/会话项） */
background: rgba(255,255,255,.45);           /* 玻璃主题 .40~.50 */
backdrop-filter: blur(20px) saturate(1.5);   /* 大容器用 blur(44px) */
-webkit-backdrop-filter: blur(20px) saturate(1.5);
border: 1px solid rgba(255,255,255,.5);      /* 亮边框（高光） */
border-radius: var(--radius);                /* 20px */
box-shadow: 0 8px 32px rgba(0,0,0,.04), inset 0 1px 0 rgba(255,255,255,.5);
```

- **hover 泛光**：`box-shadow: inset 0 0 0 1px rgba(255,255,255,.6), 0 8px 28px rgba(0,0,0,.06)`（深色主题用金色 `rgba(212,184,122,.25)`）
- **active/选中**：金色描边 `border-color: rgba(200,164,92,.6)` + `box-shadow: inset 0 0 0 1px rgba(200,164,92,.35), 0 4px 16px rgba(200,164,92,.15)`
- **顶部高光线**（大容器）：`::before{content:"";position:absolute;top:0;left:14px;right:14px;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.75),transparent)}`
- 按钮渐变：主操作 `linear-gradient(135deg,var(--accent2),var(--accent))`；客服类 `linear-gradient(135deg,var(--teal),#4a7a6e)`

## 4. 颜色变量（:root，Nimu 同款）

```css
--accent:#c8a45c; --accent2:#e8d5a3; --accent-glow:rgba(200,164,92,.3);
--teal:#6b9589; --danger:#c4554d;
--text:#2c2416; --text-secondary:rgba(44,36,22,.55); --text-dim:rgba(44,36,22,.35);
--bg:#f7f5f0;
--radius:20px; --radius-sm:14px; --radius-xs:10px; --radius-pill:100px;
--spring:cubic-bezier(0.34,1.56,0.64,1); --ease-out:cubic-bezier(0.16,1,0.3,1);
```

## 5. 交互规范

- 按钮按压：`:active{transform:scale(.95~.97)}`
- 卡片悬浮：hover 有泛光/高光，位移 `translateX/Y(2px)`
- 切换动画：`transition:all .25s var(--spring)` 或 `.3s ease`
- 深色主题按钮/输入框：`background:rgba(255,255,255,.08~.1)` + `border:1px solid rgba(255,255,255,.12~.14)` + `color:#e8e6e3`
- 浅色主题：`background:#fff` / `rgba(0,0,0,.03~.06)` + `border:1px solid rgba(0,0,0,.06~.08)` + 去 blur

## 6. 检查清单（新 UI 上线前）

- [ ] 容器/卡片类元素圆角 = 20px
- [ ] 三主题都过一遍（几何一致，颜色随主题）
- [ ] 玻璃主题有 blur + 亮边框 + hover 泛光
- [ ] 深色主题用金色 accent（`#d4b87a`）而非黄色
- [ ] 浅色主题隐藏 canvas、去 blur
- [ ] 按钮有 :active 反馈
- [ ] 复用 CSS 变量（不要硬编码颜色/圆角）
