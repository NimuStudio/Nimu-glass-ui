# 贡献指南

感谢你愿意为 YSTI Glass UI 贡献！这个项目很简单，遵循几条规则即可。

## 环境

- 纯 HTML / CSS / JS，**无构建步骤**，克隆后直接编辑
- 需要 Node.js（仅用于 CI 检查脚本 `scripts/check.js`）

## 本地检查

提交前运行：

```bash
node scripts/check.js   # CSS 花括号 / HTML 配对检查
node --check assets/liquid-glass.js
node --check examples/widget.js
```

## 代码规范

1. **新组件必须遵守 [`UI.md`](UI.md)**（或 [`UI.en.md`](UI.en.md)）：
   - 容器/卡片圆角 = `var(--radius)`（20px）
   - 三主题适配（玻璃默认 / `light-mode` / `dark-mode`）
   - 复用 CSS 变量，不硬编码颜色/圆角
2. 样式保持现有风格（压缩单行 + 关键块注释）
3. 修改 `assets/ysti-glass.css` 后确保花括号平衡

## 提交流程

1. Fork 本仓库
2. 创建分支：`git checkout -b feat/your-feature`
3. 修改 + 本地检查通过
4. 提交 + Push
5. 创建 Pull Request（使用仓库的 PR 模板）

## 疑问

有任何问题，直接开 Issue 提问即可。
