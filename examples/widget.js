/*!
 * Kefu Widget - 访客聊天窗（一行代码嵌入）
 * 用法: <script src="https://你的域名/widget.js" data-site-key="key_xxx" data-name="网站名"></script>
 */
(function () {
  "use strict";
  var API = window.KEFU_API || ""; // 如 https://你的域名，留空则同域
  var script = document.currentScript;
  var siteKey = (script && script.getAttribute("data-site-key")) || "";
  var siteName = (script && script.getAttribute("data-name")) || "在线客服";
  var VISITOR_KEY = "kefu_visitor_" + siteKey;

  function visitorKey() {
    var k = localStorage.getItem(VISITOR_KEY);
    if (!k) {
      k = "v_" + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
      localStorage.setItem(VISITOR_KEY, k);
    }
    return k;
  }

  // ---- 样式（玻璃拟态，注入 <style>）----
  var css = [
    "#kefu-launcher{position:fixed;right:24px;bottom:24px;z-index:99999;width:58px;height:58px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:26px;color:#fff;border:none;box-shadow:0 8px 28px rgba(0,0,0,.25);background:linear-gradient(135deg,#6b9589,#4a7a6e);transition:transform .25s}",
    "#kefu-launcher:hover{transform:scale(1.08)}",
    "#kefu-panel{position:fixed;right:24px;bottom:96px;z-index:99999;width:360px;max-width:calc(100vw - 32px);height:520px;max-height:calc(100vh - 130px);border-radius:20px;display:none;flex-direction:column;overflow:hidden;background:rgba(255,255,255,.72);backdrop-filter:blur(30px) saturate(1.6);-webkit-backdrop-filter:blur(30px) saturate(1.6);border:1px solid rgba(255,255,255,.6);box-shadow:0 20px 60px rgba(0,0,0,.18);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif}",
    "#kefu-panel.open{display:flex}",
    "#kefu-hd{padding:14px 16px;background:linear-gradient(135deg,#6b9589,#4a7a6e);color:#fff;display:flex;align-items:center;gap:10px;font-weight:700;font-size:15px}",
    "#kefu-hd .kefu-dot{width:8px;height:8px;border-radius:50%;background:#7ef0b0;box-shadow:0 0 8px #7ef0b0;animation:kefuPulse 1.6s infinite}",
    "#kefu-msgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:8px;background:rgba(255,255,255,.35)}",
    ".kefu-msg{max-width:78%;padding:9px 13px;border-radius:14px;font-size:14px;line-height:1.5;word-break:break-word}",
    ".kefu-msg.v{background:#fff;border:1px solid rgba(0,0,0,.06);align-self:flex-start;border-bottom-left-radius:4px;color:#333}",
    ".kefu-msg.a{background:linear-gradient(135deg,#6b9589,#4a7a6e);color:#fff;align-self:flex-end;border-bottom-right-radius:4px}",
    ".kefu-msg.s{font-size:12px;color:#999;text-align:center;align-self:center;max-width:90%;background:transparent}",
    "#kefu-input{display:flex;gap:8px;padding:10px;border-top:1px solid rgba(0,0,0,.06);background:rgba(255,255,255,.6)}",
    "#kefu-input textarea{flex:1;border:none;outline:none;resize:none;font-size:14px;padding:9px 12px;border-radius:12px;background:rgba(255,255,255,.85);color:#333;max-height:90px;font-family:inherit}",
    "#kefu-send{background:linear-gradient(135deg,#6b9589,#4a7a6e);color:#fff;border:none;border-radius:12px;padding:0 16px;font-weight:700;cursor:pointer;font-size:14px}",
    "#kefu-send:active{transform:scale(.95)}",
    ".kefu-close{background:rgba(255,255,255,.2);border:none;color:#fff;width:26px;height:26px;border-radius:50%;cursor:pointer;font-size:14px;line-height:1;margin-left:auto}",
    "@keyframes kefuPulse{0%,100%{opacity:1}50%{opacity:.4}}",
    "@media (max-width:480px){#kefu-panel{right:12px;bottom:80px;width:calc(100vw - 24px)}#kefu-launcher{right:16px;bottom:16px}}",
    "@media (prefers-color-scheme:dark){#kefu-panel{background:rgba(30,30,34,.88);border-color:rgba(255,255,255,.12);box-shadow:0 20px 60px rgba(0,0,0,.5)}#kefu-hd{background:linear-gradient(135deg,#4a7a6e,#2f5249)}#kefu-msgs{background:rgba(0,0,0,.2)}.kefu-msg.v{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.1);color:#e8e6e3}.kefu-msg.s{color:rgba(232,230,227,.45)}#kefu-input{background:rgba(30,30,34,.75);border-top-color:rgba(255,255,255,.08)}#kefu-input textarea{background:rgba(255,255,255,.08);color:#e8e6e3}"
  ].join("");

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  // ---- DOM ----
  var launcher = document.createElement("button");
  launcher.id = "kefu-launcher";
  launcher.textContent = "\uD83D\uDCAC";
  launcher.title = "联系客服";
  document.body.appendChild(launcher);

  var panel = document.createElement("div");
  panel.id = "kefu-panel";
  panel.innerHTML =
    '<div id="kefu-hd"><span class="kefu-dot"></span><span id="kefu-title">' + esc(siteName) + "</span><button class=\"kefu-close\" title=\"关闭\">\u2715</button></div>" +
    '<div id="kefu-msgs"></div>' +
    '<div id="kefu-input"><textarea id="kefu-ta" rows="1" placeholder="请输入您的问题..."></textarea><button id="kefu-send">发送</button></div>';
  document.body.appendChild(panel);

  var msgsEl = panel.querySelector("#kefu-msgs");
  var ta = panel.querySelector("#kefu-ta");
  var sendBtn = panel.querySelector("#kefu-send");

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
    });
  }

  var convId = null;
  var ws = null;
  var open = false;
  var connecting = false;

  function addMsg(m) {
    var div = document.createElement("div");
    if (m.sender_type === "system") {
      div.className = "kefu-msg s";
      div.textContent = m.content;
    } else {
      div.className = "kefu-msg " + (m.sender_type === "agent" ? "a" : "v");
      div.textContent = m.content;
    }
    msgsEl.appendChild(div);
    msgsEl.scrollTop = msgsEl.scrollHeight;
  }

  function api(path, opts) {
    opts = opts || {};
    return fetch(API + path, {
      method: opts.method || "GET",
      headers: { "Content-Type": "application/json" },
      body: opts.body ? JSON.stringify(opts.body) : undefined,
    }).then(function (r) { return r.json(); });
  }

  function connectWS() {
    if (!convId) return;
    var proto = location.protocol === "https:" ? "wss:" : "ws:";
    try { if (ws) ws.close(); } catch (e) {}
    ws = new WebSocket(proto + "//" + location.host);
    ws.onopen = function () {
      ws.send(JSON.stringify({ type: "visitor_auth", siteKey: siteKey, visitorKey: visitorKey(), conversationId: convId }));
    };
    ws.onmessage = function (e) {
      try {
        var d = JSON.parse(e.data);
        if (d.type === "message" && d.conversation_id === convId) addMsg(d.message);
      } catch (e2) {}
    };
    ws.onclose = function () { if (open) setTimeout(connectWS, 4000); };
  }

  function openPanel() {
    open = true;
    panel.classList.add("open");
    launcher.style.display = "none";
    if (connecting) return;
    connecting = true;
    api("/api/visitor/conversation", {
      method: "POST",
      body: { siteKey: siteKey, visitorKey: visitorKey(), sourceUrl: location.href, device: navigator.userAgent.slice(0, 200) },
    }).then(function (r) {
      connecting = false;
      if (r.conversation) {
        convId = r.conversation.id;
        addMsg({ sender_type: "system", content: "您好，欢迎咨询！我们会尽快回复您。" });
        connectWS();
        // 拉历史消息
        return api("/api/visitor/conversation/" + convId + "/messages").then(function (d) {
          (d.messages || []).forEach(addMsg);
        });
      }
    }).catch(function () { connecting = false; });
  }

  function closePanel() {
    open = false;
    panel.classList.remove("open");
    launcher.style.display = "flex";
    if (ws) { try { ws.close(); } catch (e) {} ws = null; }
  }

  function send() {
    var content = ta.value.trim();
    if (!content || !convId) return;
    ta.value = "";
    ta.style.height = "auto";
    // 先本地显示，WS 广播到达后可能重复 —— 用 HTTP 发送，WS 只收对方消息
    api("/api/visitor/messages", {
      method: "POST",
      body: { conversationId: convId, visitorKey: visitorKey(), content: content },
    }).then(function (r) {
      if (r.success) addMsg({ sender_type: "visitor", content: content });
    }).catch(function () { addMsg({ sender_type: "system", content: "发送失败，请重试" }); });
  }

  launcher.addEventListener("click", openPanel);
  panel.querySelector(".kefu-close").addEventListener("click", closePanel);
  sendBtn.addEventListener("click", send);
  ta.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  });
  ta.addEventListener("input", function () {
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 90) + "px";
  });
})();
