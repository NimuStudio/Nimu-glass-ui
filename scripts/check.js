#!/usr/bin/env node
// scripts/check.js - 仓库质量检查（无第三方依赖）
// 检查：CSS 括号平衡、HTML 标签配对
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
let failed = false;
function fail(msg) {
  failed = true;
  console.error("❌ " + msg);
}
function ok(msg) { console.log("✅ " + msg); }

// 1. CSS 括号平衡
const cssPath = path.join(root, "assets", "ysti-glass.css");
const css = fs.readFileSync(cssPath, "utf8");
const opens = (css.match(/{/g) || []).length;
const closes = (css.match(/}/g) || []).length;
if (opens === closes) ok(`ysti-glass.css 花括号平衡 (${opens})`);
else fail(`ysti-glass.css 花括号不平衡: {=${opens} }=${closes}`);

// 2. HTML 标签配对（忽略 script/style 内部）
const VOID = new Set(["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"]);
function checkHtml(file) {
  const p = path.join(root, file);
  if (!fs.existsSync(p)) { fail(`${file} 不存在`); return; }
  let html = fs.readFileSync(p, "utf8");
  html = html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, "");
  html = html.replace(/<!--[\s\S]*?-->/g, "");
  const stack = [];
  const re = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g;
  let m, err = null;
  while ((m = re.exec(html))) {
    const tag = m[0], name = m[1].toLowerCase();
    if (tag.startsWith("</")) {
      if (stack.length && stack[stack.length - 1] === name) stack.pop();
      else { err = `多余闭合 </${name}>（栈顶: ${stack[stack.length - 1] || "空"}）`; break; }
    } else if (!tag.replace(/\s*\/>$/, "").endsWith("/") && !VOID.has(name)) {
      stack.push(name);
    }
  }
  if (!err && stack.length) err = `未闭合标签: ${stack.join(", ")}`;
  if (err) fail(`${file}: ${err}`);
  else ok(`${file} HTML 配对正确`);
}
["index.html", "examples/console.html"].forEach(checkHtml);

// 3. JS 文件存在
["assets/liquid-glass.js", "examples/widget.js", "index.html", "examples/console.html"].forEach((f) => {
  if (!fs.existsSync(path.join(root, f))) fail(`${f} 不存在`);
});

process.exit(failed ? 1 : 0);
