window.__ModuleLoader__.load({
  id: "dsh-kanban-flow",
  factory: function (require) {
    var module = { exports: {} }
    var exports = module.exports
    "use strict";var go=Object.create;var It=Object.defineProperty;var vo=Object.getOwnPropertyDescriptor;var ho=Object.getOwnPropertyNames;var mo=Object.getPrototypeOf,bo=Object.prototype.hasOwnProperty;var wo=(e,t)=>{for(var n in t)It(e,n,{get:t[n],enumerable:!0})},Nn=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of ho(t))!bo.call(e,o)&&o!==n&&It(e,o,{get:()=>t[o],enumerable:!(r=vo(t,o))||r.enumerable});return e};var An=(e,t,n)=>(n=e!=null?go(mo(e)):{},Nn(t||!e||!e.__esModule?It(n,"default",{value:e,enumerable:!0}):n,e)),yo=e=>Nn(It({},"__esModule",{value:!0}),e);var ps={};wo(ps,{default:()=>fs});module.exports=yo(ps);var Rn=`/* dsh-kanban-flow client styles \u2014 kf-* namespace.
       Built on DSH --dsw-alias-* tokens so light/dark follow the shell automatically;
       column accents use light-dark() for per-mode tuning. */
    
    .kf-sidebar-icon {
      cursor: pointer;
      width: 18px;
      height: 18px;
      margin-right: 2px;
      color: var(--dsw-alias-label-tertiary);
      background: 0 0;
      border: none;
      border-radius: 4px;
      flex: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      transition: color 0.15s var(--ds-ease-in-out);
    }
    .kf-sidebar-icon:hover {
      color: var(--dsw-alias-label-primary);
    }
    
    /* ------------------------------------------------------------------ board */
    /* The board renders in-app inside the conversation view area (Board tab). */
    .kf-root {
      height: 100%;
      min-height: 0;
      display: flex;
      flex-direction: column;
      color: var(--dsw-alias-label-primary);
      font-size: 14px;
    }
    .kf-header {
      flex: none;
      display: flex;
      align-items: center;
      flex-wrap: wrap; /* narrow screens: controls wrap to a second row */
      gap: 10px;
      padding: 14px 18px;
      border-bottom: 1px solid var(--dsw-alias-border-l2);
    }
    .kf-header-title {
      font-size: 15px;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
    }
    .kf-code-chip {
      font-family: var(--ds-font-family-code);
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.04em;
      color: var(--dsw-alias-brand-text);
      background: var(--dsw-alias-interactive-bg-hover-accent);
      border-radius: 6px;
      padding: 2px 6px;
    }
    .kf-count-chip {
      color: var(--dsw-alias-label-secondary);
      font-size: 12px;
      white-space: nowrap;
    }
    .kf-spacer { flex: 1; }
    .kf-iconbtn {
      cursor: pointer;
      width: 28px;
      height: 28px;
      border-radius: 8px;
      border: none;
      background: 0 0;
      color: var(--dsw-alias-label-secondary);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s var(--ds-ease-in-out), color 0.15s var(--ds-ease-in-out);
    }
    .kf-iconbtn:hover {
      background: var(--dsw-alias-interactive-bg-hover);
      color: var(--dsw-alias-label-primary);
    }
    .kf-close-btn { margin-left: 4px; }
    
    /* The shell's conversation view area grows with its content once a session is
       active (the shell sets flex-basis:auto + min-height:auto there), so a tall
       board stretches the entire page instead of scrolling inside its columns.
       While the board is mounted, clamp the view area (the direct parent of
       .kf-root \u2014 the slot wrapper is display:contents) back to a fixed height:
       the board then fills it and each column scrolls internally. Scoped by
       :has(> .kf-root) so the normal chat view is untouched. */
    div:has(> .kf-root) {
      flex: 1 1 0 !important;
      min-height: 0 !important;
      overflow: hidden !important;
    }
    
    /* The board renders in-app inside the conversation view area (Board tab).
       It is a query container for its own layout: the view area's width varies
       with the shell's sidebars, so the column layout must react to the board's
       actual width, not the viewport. */
    .kf-body {
      flex: 1;
      min-height: 0;
      padding: 14px 18px 18px;
      overflow-x: hidden;
      overflow-y: auto;
      container: kf-board / inline-size;
    }
    
    /* Column wrapper: mobile-first \u2014 columns stack full-width (phone, tablet);
       the container query below flips them to the 5-across row on wide boards. */
    .kf-columns {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    /* Wide boards: five equal columns that scale with the screen and together
       take up the entire width; each column keeps its own internal scroll.
       The flex override uses .kf-columns > .kf-column (higher specificity than
       the base .kf-column { flex: none } below) so it reliably wins the cascade. */
    @container kf-board (min-width: 900px) {
      .kf-columns {
        flex-direction: row;
        height: 100%;
      }
      .kf-columns > .kf-column {
        flex: 1 1 0;
        min-width: 0;
      }
    }
    
    /* ---------------------------------------------------------------- column */
    .kf-column {
      --kf-accent: var(--dsw-alias-label-secondary);
      flex: none;
      display: flex;
      flex-direction: column;
      min-height: 0;
      border-radius: 14px;
      border: 1px solid var(--dsw-alias-border-l2);
      background: var(--dsw-alias-bg-layer-1);
      transition: border-color 0.15s var(--ds-ease-in-out), background 0.15s var(--ds-ease-in-out);
    }
    .kf-column.kf-over {
      border-color: color-mix(in oklab, var(--kf-accent) 55%, var(--dsw-alias-border-l2));
      background: color-mix(in oklab, var(--kf-accent) 8%, var(--dsw-alias-bg-layer-1));
    }
    .kf-column.kf-backlog     { --kf-accent: light-dark(#64748b, #94a3b8); }
    .kf-column.kf-todo        { --kf-accent: light-dark(#2563eb, #60a5fa); }
    .kf-column.kf-in_progress { --kf-accent: light-dark(#7c3aed, #a78bfa); }
    .kf-column.kf-review      { --kf-accent: light-dark(#d97706, #fbbf24); }
    .kf-column.kf-done        { --kf-accent: light-dark(#059669, #34d399); }
    
    .kf-column-head {
      flex: none;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 12px 8px;
    }
    .kf-column-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--kf-accent);
      flex: none;
    }
    .kf-column-title {
      font-weight: 600;
      font-size: 13px;
      color: var(--dsw-alias-label-primary);
    }
    .kf-column-list {
      flex: 1;
      min-height: 80px;
      padding: 4px 8px 8px;
      overflow-y: auto;
      overscroll-behavior: contain;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .kf-column-empty {
      border: 1px dashed var(--dsw-alias-border-l3);
      border-radius: 10px;
      color: var(--dsw-alias-label-tertiary);
      font-size: 12px;
      padding: 14px 10px;
      text-align: center;
    }
    
    /* ------------------------------------------------------------------ card */
    .kf-card {
      position: relative;
      border-radius: 10px;
      border: 1px solid var(--dsw-alias-border-l2);
      background: var(--dsw-alias-bg-layer-2);
      padding: 10px 10px 10px 14px;
      cursor: pointer;
      transition: border-color 0.15s var(--ds-ease-in-out), box-shadow 0.15s var(--ds-ease-in-out), transform 0.15s var(--ds-ease-in-out);
      animation: kf-card-in 0.22s var(--ds-ease-in-out);
      overflow: hidden;
    }
    .kf-card::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background: var(--kf-card-accent, var(--dsw-alias-label-secondary));
      opacity: 0.9;
    }
    .kf-card:hover {
      border-color: var(--dsw-alias-border-l3);
      box-shadow: 0 2px 10px light-dark(rgba(15, 23, 42, 0.08), rgba(0, 0, 0, 0.4));
    }
    .kf-card:active { transform: scale(0.985); }
    .kf-card.kf-dragging {
      opacity: 0.45;
      border-style: dashed;
    }
    .kf-card.kf-agent-flash { animation: kf-agent-flash 1.4s var(--ds-ease-in-out); }
    .kf-card-id {
      font-family: var(--ds-font-family-code);
      font-size: 10.5px;
      font-weight: 600;
      color: var(--dsw-alias-label-tertiary);
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 4px;
    }
    .kf-card-name {
      font-size: 13px;
      line-height: 1.4;
      color: var(--dsw-alias-label-primary);
      overflow-wrap: anywhere;
    }
    .kf-card-activity {
      margin-top: 6px;
      font-size: 11px;
      line-height: 1.4;
      color: var(--dsw-alias-label-tertiary);
    }
    .kf-card-activity-phrase {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .kf-card-activity-time {
      display: block;
      color: var(--dsw-alias-label-tertiary);
      opacity: 0.75;
    }
    /* Hover tooltip: the agent's latest status note (fallback: last activity).
       Portaled to body and fixed-positioned (cards clip their overflow). */
    .kf-card-tip {
      position: fixed;
      z-index: 1000;
      max-width: 320px;
      padding: 8px 10px;
      border-radius: 8px;
      border: 1px solid var(--dsw-alias-border-l2);
      background: var(--dsw-alias-bg-layer-3, var(--dsw-alias-bg-layer-2));
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
      font-size: 11.5px;
      line-height: 1.45;
      color: var(--dsw-alias-label-primary);
      overflow-wrap: anywhere;
      pointer-events: none;
      animation: kf-tip-in 120ms ease-out;
    }
    @keyframes kf-tip-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .kf-card-tip-title {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--dsw-alias-label-tertiary);
      margin-bottom: 3px;
    }
    .kf-card-tip-body {
      white-space: pre-line;
    }
    .kf-card-tip-hint {
      margin-top: 5px;
      font-size: 10.5px;
      color: var(--dsw-alias-label-tertiary);
      opacity: 0.85;
    }
    /* Status note box in the item dialog. */
    .kf-status-box {
      padding: 8px 10px;
      border-radius: 8px;
      border: 1px solid var(--dsw-alias-border-l2);
      background: var(--dsw-alias-bg-layer-2);
      font-size: 12px;
      line-height: 1.5;
      color: var(--dsw-alias-label-primary);
    }
    .kf-session-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      color: var(--dsw-alias-label-secondary);
    }
    .kf-edit-fab, .kf-archive-fab {
      position: absolute;
      top: 6px;
      width: 22px;
      height: 22px;
      border: none;
      border-radius: 6px;
      background: 0 0;
      color: var(--dsw-alias-label-tertiary);
      cursor: pointer;
      display: none;
      align-items: center;
      justify-content: center;
    }
    .kf-archive-fab { right: 6px; }
    .kf-edit-fab { right: 32px; }
    .kf-card:hover .kf-edit-fab, .kf-card:hover .kf-archive-fab { display: inline-flex; }
    /* Touch screens have no hover to reveal the card actions \u2014 always show them. */
    @media (hover: none) {
      .kf-edit-fab, .kf-archive-fab { display: inline-flex; }
    }
    .kf-edit-fab:hover, .kf-archive-fab:hover { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-primary); }
    .kf-drag-ghost {
      box-shadow: 0 12px 32px light-dark(rgba(15, 23, 42, 0.22), rgba(0, 0, 0, 0.6));
      transform: rotate(2.5deg) scale(1.03);
      cursor: grabbing;
    }
    
    /* -------------------------------------------------------------- new item */
    .kf-newitem {
      border-radius: 10px;
      border: 1px solid var(--dsw-alias-border-l3);
      background: var(--dsw-alias-bg-layer-2);
      padding: 8px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      animation: kf-card-in 0.18s var(--ds-ease-in-out);
    }
    .kf-input,
    .kf-textarea {
      width: 100%;
      box-sizing: border-box;
      border: 1px solid var(--dsw-alias-border-l3);
      border-radius: 8px;
      background: var(--dsw-alias-bg-base);
      color: var(--dsw-alias-label-primary);
      font: inherit;
      font-size: 13px;
      padding: 6px 8px;
      outline: none;
    }
    .kf-textarea { min-height: 54px; resize: vertical; }
    .kf-input:focus,
    .kf-textarea:focus { border-color: var(--dsw-alias-brand-primary); }
    .kf-newitem-row { display: flex; flex-wrap: wrap; gap: 6px; justify-content: flex-end; }
    
    .kf-btn {
      cursor: pointer;
      border-radius: 8px;
      border: 1px solid var(--dsw-alias-border-l2);
      background: var(--dsw-alias-button-elevated-fill);
      color: var(--dsw-alias-label-primary);
      font: inherit;
      font-size: 12.5px;
      font-weight: 500;
      padding: 5px 12px;
      transition: background 0.15s var(--ds-ease-in-out), border-color 0.15s var(--ds-ease-in-out);
    }
    .kf-btn:hover { background: var(--dsw-alias-button-floating-hover); }
    .kf-btn:disabled { opacity: 0.5; cursor: default; }
    .kf-btn.kf-primary {
      background: var(--dsw-alias-button-primary-fill);
      border-color: transparent;
      color: var(--dsw-alias-label-primary-foreground);
    }
    .kf-btn.kf-primary:hover { background: var(--dsw-alias-button-primary-hover); }
    .kf-btn.kf-ghost { background: 0 0; border-color: transparent; color: var(--dsw-alias-label-secondary); }
    .kf-btn.kf-ghost:hover { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-primary); }
    .kf-btn.kf-danger { color: var(--dsw-alias-state-error-primary); }
    
    /* Large "New item" button in the top header bar (creates in Backlog). */
    .kf-new-item-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 13.5px;
      font-weight: 600;
      padding: 7px 16px;
      margin-left: 6px;
    }
    
    /* ---------------------------------------------------------------- dialog */
    .kf-dialog-backdrop {
      position: fixed;
      inset: 0;
      z-index: 70;
      background: var(--dsw-alias-bg-mask-2);
      display: flex;
      align-items: center;
      justify-content: center;
      animation: kf-fade-in 0.15s var(--ds-ease-in-out);
    }
    .kf-dialog {
      background: var(--dsw-alias-bg-base);
      border: 1px solid var(--dsw-alias-border-l2);
      border-radius: 14px;
      box-shadow: 0 18px 60px light-dark(rgba(15, 23, 42, 0.2), rgba(0, 0, 0, 0.55));
      width: min(560px, calc(100vw - 48px));
      max-height: min(78vh, 720px);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: kf-panel-in 0.2s var(--ds-ease-in-out);
    }
    .kf-dialog-head {
      flex: none;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 14px 16px 10px;
    }
    .kf-dialog-title { font-size: 14px; font-weight: 600; }
    .kf-dialog-body {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      padding: 4px 16px 12px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .kf-fieldlabel {
      font-size: 12px;
      font-weight: 600;
      color: var(--dsw-alias-label-secondary);
      margin-bottom: 4px;
    }
    .kf-muted { color: var(--dsw-alias-label-tertiary); font-size: 12.5px; }
    .kf-activity-row {
      font-size: 12px;
      color: var(--dsw-alias-label-tertiary);
      display: flex;
      gap: 6px;
      padding: 2px 0;
    }
    
    /* --------------------------------------------------------------- settings */
    .kf-pop {
      position: absolute;
      top: 46px;
      right: 14px;
      z-index: 65;
      background: var(--dsw-alias-bg-base);
      border: 1px solid var(--dsw-alias-border-l2);
      border-radius: 12px;
      box-shadow: 0 12px 40px light-dark(rgba(15, 23, 42, 0.18), rgba(0, 0, 0, 0.5));
      width: 300px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      animation: kf-panel-in 0.16s var(--ds-ease-in-out);
    }
    .kf-toggle-row {
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }
    .kf-toggle-text { flex: 1; min-width: 0; }
    .kf-toggle-title { font-size: 13px; font-weight: 600; }
    .kf-toggle-sub { font-size: 11.5px; color: var(--dsw-alias-label-tertiary); margin-top: 2px; }
    .kf-switch {
      cursor: pointer;
      flex: none;
      width: 36px;
      height: 21px;
      border-radius: 12px;
      border: none;
      padding: 2px;
      background: var(--dsw-alias-interactive-bg-hover-solid);
      transition: background 0.18s var(--ds-ease-in-out);
      display: inline-flex;
      align-items: center;
    }
    .kf-switch.kf-on { background: var(--dsw-alias-brand-primary); }
    .kf-switch-thumb {
      width: 17px;
      height: 17px;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
      transition: transform 0.18s var(--ds-ease-in-out);
    }
    .kf-switch.kf-on .kf-switch-thumb { transform: translateX(15px); }
    .kf-code-row { display: flex; gap: 6px; align-items: center; }
    .kf-code-row .kf-input { width: 110px; font-family: var(--ds-font-family-code); text-transform: uppercase; }
    
    /* ----------------------------------------------------------- misc states */
    .kf-error {
      color: var(--dsw-alias-state-error-primary);
      font-size: 12.5px;
      padding: 4px 0;
    }
    .kf-warning {
      border: 1px solid var(--dsw-alias-state-warn-secondary, #f59e0b);
      border-radius: 10px;
      background: color-mix(in oklab, light-dark(#f59e0b, #fbbf24) 10%, var(--dsw-alias-bg-base));
      color: var(--dsw-alias-label-primary);
      font-size: 12px;
      padding: 8px 12px;
      margin: 8px 18px 0;
    }
    .kf-loading { padding: 40px; text-align: center; color: var(--dsw-alias-label-tertiary); }
    
    /* ------------------------------------------------------------ animations */
    @keyframes kf-fade-in { from { opacity: 0; } }
    @keyframes kf-panel-in {
      from { opacity: 0; transform: translateY(8px) scale(0.985); }
    }
    @keyframes kf-card-in {
      from { opacity: 0; transform: scale(0.92) translateY(6px); }
    }
    @keyframes kf-slide-in {
      from { opacity: 0; transform: translateX(-8px); }
    }
    @keyframes kf-agent-flash {
      0%, 100% { box-shadow: 0 0 0 0 transparent; }
      25% { box-shadow: 0 0 0 3px color-mix(in oklab, var(--kf-card-accent, #7c3aed) 45%, transparent); }
    }
    @media (prefers-reduced-motion: reduce) {
      .kf-card, .kf-newitem, .kf-comment, .kf-pop,
      .kf-card.kf-agent-flash, .kf-drag-ghost {
        animation: none !important;
        transition: none !important;
      }
    }
    `;var W=require("react");var D=require("react"),to=require("react-dom");var d=An(require("react")),Re=require("react-dom");var z=require("react");var nt=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function De(e){let t=Object.prototype.toString.call(e);return t==="[object Window]"||t==="[object global]"}function Dt(e){return"nodeType"in e}function _(e){var t,n;return e?De(e)?e:Dt(e)&&(t=(n=e.ownerDocument)==null?void 0:n.defaultView)!=null?t:window:window}function Et(e){let{Document:t}=_(e);return e instanceof t}function $e(e){return De(e)?!1:e instanceof _(e).HTMLElement}function Xt(e){return e instanceof _(e).SVGElement}function Ee(e){return e?De(e)?e.document:Dt(e)?Et(e)?e:$e(e)||Xt(e)?e.ownerDocument:document:document:document}var de=nt?z.useLayoutEffect:z.useEffect;function rt(e){let t=(0,z.useRef)(e);return de(()=>{t.current=e}),(0,z.useCallback)(function(){for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return t.current==null?void 0:t.current(...r)},[])}function On(){let e=(0,z.useRef)(null),t=(0,z.useCallback)((r,o)=>{e.current=setInterval(r,o)},[]),n=(0,z.useCallback)(()=>{e.current!==null&&(clearInterval(e.current),e.current=null)},[]);return[t,n]}function qe(e,t){t===void 0&&(t=[e]);let n=(0,z.useRef)(e);return de(()=>{n.current!==e&&(n.current=e)},t),n}function Ke(e,t){let n=(0,z.useRef)();return(0,z.useMemo)(()=>{let r=e(n.current);return n.current=r,r},[...t])}function ot(e){let t=rt(e),n=(0,z.useRef)(null),r=(0,z.useCallback)(o=>{o!==n.current&&t?.(o,n.current),n.current=o},[]);return[n,r]}function it(e){let t=(0,z.useRef)();return(0,z.useEffect)(()=>{t.current=e},[e]),t.current}var Yt={};function st(e,t){return(0,z.useMemo)(()=>{if(t)return t;let n=Yt[e]==null?0:Yt[e]+1;return Yt[e]=n,e+"-"+n},[e,t])}function Ln(e){return function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return r.reduce((i,a)=>{let s=Object.entries(a);for(let[l,u]of s){let f=i[l];f!=null&&(i[l]=f+e*u)}return i},{...t})}}var Ne=Ln(1),at=Ln(-1);function xo(e){return"clientX"in e&&"clientY"in e}function Nt(e){if(!e)return!1;let{KeyboardEvent:t}=_(e.target);return t&&e instanceof t}function So(e){if(!e)return!1;let{TouchEvent:t}=_(e.target);return t&&e instanceof t}function lt(e){if(So(e)){if(e.touches&&e.touches.length){let{clientX:t,clientY:n}=e.touches[0];return{x:t,y:n}}else if(e.changedTouches&&e.changedTouches.length){let{clientX:t,clientY:n}=e.changedTouches[0];return{x:t,y:n}}}return xo(e)?{x:e.clientX,y:e.clientY}:null}var Fe=Object.freeze({Translate:{toString(e){if(!e)return;let{x:t,y:n}=e;return"translate3d("+(t?Math.round(t):0)+"px, "+(n?Math.round(n):0)+"px, 0)"}},Scale:{toString(e){if(!e)return;let{scaleX:t,scaleY:n}=e;return"scaleX("+t+") scaleY("+n+")"}},Transform:{toString(e){if(e)return[Fe.Translate.toString(e),Fe.Scale.toString(e)].join(" ")}},Transition:{toString(e){let{property:t,duration:n,easing:r}=e;return t+" "+n+"ms "+r}}}),Tn="a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]";function Bn(e){return e.matches(Tn)?e:e.querySelector(Tn)}var Ae=An(require("react")),Co={display:"none"};function Mn(e){let{id:t,value:n}=e;return Ae.default.createElement("div",{id:t,style:Co},n)}function Pn(e){let{id:t,announcement:n,ariaLiveType:r="assertive"}=e,o={position:"fixed",top:0,left:0,width:1,height:1,margin:-1,border:0,padding:0,overflow:"hidden",clip:"rect(0 0 0 0)",clipPath:"inset(100%)",whiteSpace:"nowrap"};return Ae.default.createElement("div",{id:t,style:o,role:"status","aria-live":r,"aria-atomic":!0},n)}function zn(){let[e,t]=(0,Ae.useState)("");return{announce:(0,Ae.useCallback)(r=>{r!=null&&t(r)},[]),announcement:e}}var Xn=(0,d.createContext)(null);function Io(e){let t=(0,d.useContext)(Xn);(0,d.useEffect)(()=>{if(!t)throw new Error("useDndMonitor must be used within a children of <DndContext>");return t(e)},[e,t])}function Do(){let[e]=(0,d.useState)(()=>new Set),t=(0,d.useCallback)(r=>(e.add(r),()=>e.delete(r)),[e]);return[(0,d.useCallback)(r=>{let{type:o,event:i}=r;e.forEach(a=>{var s;return(s=a[o])==null?void 0:s.call(a,i)})},[e]),t]}var Eo={draggable:`
        To pick up a draggable item, press the space bar.
        While dragging, use the arrow keys to move the item.
        Press space again to drop the item in its new position, or press escape to cancel.
      `},No={onDragStart(e){let{active:t}=e;return"Picked up draggable item "+t.id+"."},onDragOver(e){let{active:t,over:n}=e;return n?"Draggable item "+t.id+" was moved over droppable area "+n.id+".":"Draggable item "+t.id+" is no longer over a droppable area."},onDragEnd(e){let{active:t,over:n}=e;return n?"Draggable item "+t.id+" was dropped over droppable area "+n.id:"Draggable item "+t.id+" was dropped."},onDragCancel(e){let{active:t}=e;return"Dragging was cancelled. Draggable item "+t.id+" was dropped."}};function Ao(e){let{announcements:t=No,container:n,hiddenTextDescribedById:r,screenReaderInstructions:o=Eo}=e,{announce:i,announcement:a}=zn(),s=st("DndLiveRegion"),[l,u]=(0,d.useState)(!1);if((0,d.useEffect)(()=>{u(!0)},[]),Io((0,d.useMemo)(()=>({onDragStart(c){let{active:p}=c;i(t.onDragStart({active:p}))},onDragMove(c){let{active:p,over:g}=c;t.onDragMove&&i(t.onDragMove({active:p,over:g}))},onDragOver(c){let{active:p,over:g}=c;i(t.onDragOver({active:p,over:g}))},onDragEnd(c){let{active:p,over:g}=c;i(t.onDragEnd({active:p,over:g}))},onDragCancel(c){let{active:p,over:g}=c;i(t.onDragCancel({active:p,over:g}))}}),[i,t])),!l)return null;let f=d.default.createElement(d.default.Fragment,null,d.default.createElement(Mn,{id:r,value:o.draggable}),d.default.createElement(Pn,{id:s,announcement:a}));return n?(0,Re.createPortal)(f,n):f}var $;(function(e){e.DragStart="dragStart",e.DragMove="dragMove",e.DragEnd="dragEnd",e.DragCancel="dragCancel",e.DragOver="dragOver",e.RegisterDroppable="registerDroppable",e.SetDroppableDisabled="setDroppableDisabled",e.UnregisterDroppable="unregisterDroppable"})($||($={}));function Rt(){}function Gn(e,t){return(0,d.useMemo)(()=>({sensor:e,options:t??{}}),[e,t])}function Jn(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return(0,d.useMemo)(()=>[...t].filter(r=>r!=null),[...t])}var se=Object.freeze({x:0,y:0});function Zn(e,t){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))}function Ro(e,t){let n=lt(e);if(!n)return"0 0";let r={x:(n.x-t.left)/t.width*100,y:(n.y-t.top)/t.height*100};return r.x+"% "+r.y+"%"}function Qn(e,t){let{data:{value:n}}=e,{data:{value:r}}=t;return n-r}function To(e,t){let{data:{value:n}}=e,{data:{value:r}}=t;return r-n}function Qt(e){let{left:t,top:n,height:r,width:o}=e;return[{x:t,y:n},{x:t+o,y:n},{x:t,y:n+r},{x:t+o,y:n+r}]}function Oo(e,t){if(!e||e.length===0)return null;let[n]=e;return t?n[t]:n}var er=e=>{let{collisionRect:t,droppableRects:n,droppableContainers:r}=e,o=Qt(t),i=[];for(let a of r){let{id:s}=a,l=n.get(s);if(l){let u=Qt(l),f=o.reduce((p,g,k)=>p+Zn(u[k],g),0),c=Number((f/4).toFixed(4));i.push({id:s,data:{droppableContainer:a,value:c}})}}return i.sort(Qn)};function Lo(e,t){let n=Math.max(t.top,e.top),r=Math.max(t.left,e.left),o=Math.min(t.left+t.width,e.left+e.width),i=Math.min(t.top+t.height,e.top+e.height),a=o-r,s=i-n;if(r<o&&n<i){let l=t.width*t.height,u=e.width*e.height,f=a*s,c=f/(l+u-f);return Number(c.toFixed(4))}return 0}var sn=e=>{let{collisionRect:t,droppableRects:n,droppableContainers:r}=e,o=[];for(let i of r){let{id:a}=i,s=n.get(a);if(s){let l=Lo(s,t);l>0&&o.push({id:a,data:{droppableContainer:i,value:l}})}}return o.sort(To)};function Bo(e,t){let{top:n,left:r,bottom:o,right:i}=t;return n<=e.y&&e.y<=o&&r<=e.x&&e.x<=i}var tr=e=>{let{droppableContainers:t,droppableRects:n,pointerCoordinates:r}=e;if(!r)return[];let o=[];for(let i of t){let{id:a}=i,s=n.get(a);if(s&&Bo(r,s)){let u=Qt(s).reduce((c,p)=>c+Zn(r,p),0),f=Number((u/4).toFixed(4));o.push({id:a,data:{droppableContainer:i,value:f}})}}return o.sort(Qn)};function Mo(e,t,n){return{...e,scaleX:t&&n?t.width/n.width:1,scaleY:t&&n?t.height/n.height:1}}function nr(e,t){return e&&t?{x:e.left-t.left,y:e.top-t.top}:se}function Po(e){return function(n){for(var r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return o.reduce((a,s)=>({...a,top:a.top+e*s.y,bottom:a.bottom+e*s.y,left:a.left+e*s.x,right:a.right+e*s.x}),{...n})}}var zo=Po(1);function rr(e){if(e.startsWith("matrix3d(")){let t=e.slice(9,-1).split(/, /);return{x:+t[12],y:+t[13],scaleX:+t[0],scaleY:+t[5]}}else if(e.startsWith("matrix(")){let t=e.slice(7,-1).split(/, /);return{x:+t[4],y:+t[5],scaleX:+t[0],scaleY:+t[3]}}return null}function Wo(e,t,n){let r=rr(t);if(!r)return e;let{scaleX:o,scaleY:i,x:a,y:s}=r,l=e.left-a-(1-o)*parseFloat(n),u=e.top-s-(1-i)*parseFloat(n.slice(n.indexOf(" ")+1)),f=o?e.width/o:e.width,c=i?e.height/i:e.height;return{width:f,height:c,top:u,right:l+f,bottom:u+c,left:l}}var Fo={ignoreTransform:!1};function pt(e,t){t===void 0&&(t=Fo);let n=e.getBoundingClientRect();if(t.ignoreTransform){let{transform:u,transformOrigin:f}=_(e).getComputedStyle(e);u&&(n=Wo(n,u,f))}let{top:r,left:o,width:i,height:a,bottom:s,right:l}=n;return{top:r,left:o,width:i,height:a,bottom:s,right:l}}function Wn(e){return pt(e,{ignoreTransform:!0})}function $o(e){let t=e.innerWidth,n=e.innerHeight;return{top:0,left:0,right:t,bottom:n,width:t,height:n}}function qo(e,t){return t===void 0&&(t=_(e).getComputedStyle(e)),t.position==="fixed"}function Ko(e,t){t===void 0&&(t=_(e).getComputedStyle(e));let n=/(auto|scroll|overlay)/;return["overflow","overflowX","overflowY"].some(o=>{let i=t[o];return typeof i=="string"?n.test(i):!1})}function an(e,t){let n=[];function r(o){if(t!=null&&n.length>=t||!o)return n;if(Et(o)&&o.scrollingElement!=null&&!n.includes(o.scrollingElement))return n.push(o.scrollingElement),n;if(!$e(o)||Xt(o)||n.includes(o))return n;let i=_(e).getComputedStyle(o);return o!==e&&Ko(o,i)&&n.push(o),qo(o,i)?n:r(o.parentNode)}return e?r(e):n}function or(e){let[t]=an(e,1);return t??null}function Gt(e){return!nt||!e?null:De(e)?e:Dt(e)?Et(e)||e===Ee(e).scrollingElement?window:$e(e)?e:null:null}function ir(e){return De(e)?e.scrollX:e.scrollLeft}function sr(e){return De(e)?e.scrollY:e.scrollTop}function en(e){return{x:ir(e),y:sr(e)}}var K;(function(e){e[e.Forward=1]="Forward",e[e.Backward=-1]="Backward"})(K||(K={}));function ar(e){return!nt||!e?!1:e===document.scrollingElement}function lr(e){let t={x:0,y:0},n=ar(e)?{height:window.innerHeight,width:window.innerWidth}:{height:e.clientHeight,width:e.clientWidth},r={x:e.scrollWidth-n.width,y:e.scrollHeight-n.height},o=e.scrollTop<=t.y,i=e.scrollLeft<=t.x,a=e.scrollTop>=r.y,s=e.scrollLeft>=r.x;return{isTop:o,isLeft:i,isBottom:a,isRight:s,maxScroll:r,minScroll:t}}var Ho={x:.2,y:.2};function jo(e,t,n,r,o){let{top:i,left:a,right:s,bottom:l}=n;r===void 0&&(r=10),o===void 0&&(o=Ho);let{isTop:u,isBottom:f,isLeft:c,isRight:p}=lr(e),g={x:0,y:0},k={x:0,y:0},h={height:t.height*o.y,width:t.width*o.x};return!u&&i<=t.top+h.height?(g.y=K.Backward,k.y=r*Math.abs((t.top+h.height-i)/h.height)):!f&&l>=t.bottom-h.height&&(g.y=K.Forward,k.y=r*Math.abs((t.bottom-h.height-l)/h.height)),!p&&s>=t.right-h.width?(g.x=K.Forward,k.x=r*Math.abs((t.right-h.width-s)/h.width)):!c&&a<=t.left+h.width&&(g.x=K.Backward,k.x=r*Math.abs((t.left+h.width-a)/h.width)),{direction:g,speed:k}}function _o(e){if(e===document.scrollingElement){let{innerWidth:i,innerHeight:a}=window;return{top:0,left:0,right:i,bottom:a,width:i,height:a}}let{top:t,left:n,right:r,bottom:o}=e.getBoundingClientRect();return{top:t,left:n,right:r,bottom:o,width:e.clientWidth,height:e.clientHeight}}function cr(e){return e.reduce((t,n)=>Ne(t,en(n)),se)}function Uo(e){return e.reduce((t,n)=>t+ir(n),0)}function Vo(e){return e.reduce((t,n)=>t+sr(n),0)}function dr(e,t){if(t===void 0&&(t=pt),!e)return;let{top:n,left:r,bottom:o,right:i}=t(e);or(e)&&(o<=0||i<=0||n>=window.innerHeight||r>=window.innerWidth)&&e.scrollIntoView({block:"center",inline:"center"})}var Yo=[["x",["left","right"],Uo],["y",["top","bottom"],Vo]],dt=class{constructor(t,n){this.rect=void 0,this.width=void 0,this.height=void 0,this.top=void 0,this.bottom=void 0,this.right=void 0,this.left=void 0;let r=an(n),o=cr(r);this.rect={...t},this.width=t.width,this.height=t.height;for(let[i,a,s]of Yo)for(let l of a)Object.defineProperty(this,l,{get:()=>{let u=s(r),f=o[i]-u;return this.rect[l]+f},enumerable:!0});Object.defineProperty(this,"rect",{enumerable:!1})}},Te=class{constructor(t){this.target=void 0,this.listeners=[],this.removeAll=()=>{this.listeners.forEach(n=>{var r;return(r=this.target)==null?void 0:r.removeEventListener(...n)})},this.target=t}add(t,n,r){var o;(o=this.target)==null||o.addEventListener(t,n,r),this.listeners.push([t,n,r])}};function Xo(e){let{EventTarget:t}=_(e);return e instanceof t?e:Ee(e)}function Jt(e,t){let n=Math.abs(e.x),r=Math.abs(e.y);return typeof t=="number"?Math.sqrt(n**2+r**2)>t:"x"in t&&"y"in t?n>t.x&&r>t.y:"x"in t?n>t.x:"y"in t?r>t.y:!1}var ee;(function(e){e.Click="click",e.DragStart="dragstart",e.Keydown="keydown",e.ContextMenu="contextmenu",e.Resize="resize",e.SelectionChange="selectionchange",e.VisibilityChange="visibilitychange"})(ee||(ee={}));function Fn(e){e.preventDefault()}function Go(e){e.stopPropagation()}var O;(function(e){e.Space="Space",e.Down="ArrowDown",e.Right="ArrowRight",e.Left="ArrowLeft",e.Up="ArrowUp",e.Esc="Escape",e.Enter="Enter",e.Tab="Tab"})(O||(O={}));var ur={start:[O.Space,O.Enter],cancel:[O.Esc],end:[O.Space,O.Enter,O.Tab]},Jo=(e,t)=>{let{currentCoordinates:n}=t;switch(e.code){case O.Right:return{...n,x:n.x+25};case O.Left:return{...n,x:n.x-25};case O.Down:return{...n,y:n.y+25};case O.Up:return{...n,y:n.y-25}}},Tt=class{constructor(t){this.props=void 0,this.autoScrollEnabled=!1,this.referenceCoordinates=void 0,this.listeners=void 0,this.windowListeners=void 0,this.props=t;let{event:{target:n}}=t;this.props=t,this.listeners=new Te(Ee(n)),this.windowListeners=new Te(_(n)),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleCancel=this.handleCancel.bind(this),this.attach()}attach(){this.handleStart(),this.windowListeners.add(ee.Resize,this.handleCancel),this.windowListeners.add(ee.VisibilityChange,this.handleCancel),setTimeout(()=>this.listeners.add(ee.Keydown,this.handleKeyDown))}handleStart(){let{activeNode:t,onStart:n}=this.props,r=t.node.current;r&&dr(r),n(se)}handleKeyDown(t){if(Nt(t)){let{active:n,context:r,options:o}=this.props,{keyboardCodes:i=ur,coordinateGetter:a=Jo,scrollBehavior:s="smooth"}=o,{code:l}=t;if(i.end.includes(l)){this.handleEnd(t);return}if(i.cancel.includes(l)){this.handleCancel(t);return}let{collisionRect:u}=r.current,f=u?{x:u.left,y:u.top}:se;this.referenceCoordinates||(this.referenceCoordinates=f);let c=a(t,{active:n,context:r.current,currentCoordinates:f});if(c){let p=at(c,f),g={x:0,y:0},{scrollableAncestors:k}=r.current;for(let h of k){let b=t.code,{isTop:w,isRight:x,isLeft:y,isBottom:R,maxScroll:N,minScroll:T}=lr(h),C=_o(h),I={x:Math.min(b===O.Right?C.right-C.width/2:C.right,Math.max(b===O.Right?C.left:C.left+C.width/2,c.x)),y:Math.min(b===O.Down?C.bottom-C.height/2:C.bottom,Math.max(b===O.Down?C.top:C.top+C.height/2,c.y))},L=b===O.Right&&!x||b===O.Left&&!y,F=b===O.Down&&!R||b===O.Up&&!w;if(L&&I.x!==c.x){let B=h.scrollLeft+p.x,Z=b===O.Right&&B<=N.x||b===O.Left&&B>=T.x;if(Z&&!p.y){h.scrollTo({left:B,behavior:s});return}Z?g.x=h.scrollLeft-B:g.x=b===O.Right?h.scrollLeft-N.x:h.scrollLeft-T.x,g.x&&h.scrollBy({left:-g.x,behavior:s});break}else if(F&&I.y!==c.y){let B=h.scrollTop+p.y,Z=b===O.Down&&B<=N.y||b===O.Up&&B>=T.y;if(Z&&!p.x){h.scrollTo({top:B,behavior:s});return}Z?g.y=h.scrollTop-B:g.y=b===O.Down?h.scrollTop-N.y:h.scrollTop-T.y,g.y&&h.scrollBy({top:-g.y,behavior:s});break}}this.handleMove(t,Ne(at(c,this.referenceCoordinates),g))}}}handleMove(t,n){let{onMove:r}=this.props;t.preventDefault(),r(n)}handleEnd(t){let{onEnd:n}=this.props;t.preventDefault(),this.detach(),n()}handleCancel(t){let{onCancel:n}=this.props;t.preventDefault(),this.detach(),n()}detach(){this.listeners.removeAll(),this.windowListeners.removeAll()}};Tt.activators=[{eventName:"onKeyDown",handler:(e,t,n)=>{let{keyboardCodes:r=ur,onActivation:o}=t,{active:i}=n,{code:a}=e.nativeEvent;if(r.start.includes(a)){let s=i.activatorNode.current;return s&&e.target!==s?!1:(e.preventDefault(),o?.({event:e.nativeEvent}),!0)}return!1}}];function $n(e){return!!(e&&"distance"in e)}function qn(e){return!!(e&&"delay"in e)}var ut=class{constructor(t,n,r){var o;r===void 0&&(r=Xo(t.event.target)),this.props=void 0,this.events=void 0,this.autoScrollEnabled=!0,this.document=void 0,this.activated=!1,this.initialCoordinates=void 0,this.timeoutId=null,this.listeners=void 0,this.documentListeners=void 0,this.windowListeners=void 0,this.props=t,this.events=n;let{event:i}=t,{target:a}=i;this.props=t,this.events=n,this.document=Ee(a),this.documentListeners=new Te(this.document),this.listeners=new Te(r),this.windowListeners=new Te(_(a)),this.initialCoordinates=(o=lt(i))!=null?o:se,this.handleStart=this.handleStart.bind(this),this.handleMove=this.handleMove.bind(this),this.handleEnd=this.handleEnd.bind(this),this.handleCancel=this.handleCancel.bind(this),this.handleKeydown=this.handleKeydown.bind(this),this.removeTextSelection=this.removeTextSelection.bind(this),this.attach()}attach(){let{events:t,props:{options:{activationConstraint:n,bypassActivationConstraint:r}}}=this;if(this.listeners.add(t.move.name,this.handleMove,{passive:!1}),this.listeners.add(t.end.name,this.handleEnd),t.cancel&&this.listeners.add(t.cancel.name,this.handleCancel),this.windowListeners.add(ee.Resize,this.handleCancel),this.windowListeners.add(ee.DragStart,Fn),this.windowListeners.add(ee.VisibilityChange,this.handleCancel),this.windowListeners.add(ee.ContextMenu,Fn),this.documentListeners.add(ee.Keydown,this.handleKeydown),n){if(r!=null&&r({event:this.props.event,activeNode:this.props.activeNode,options:this.props.options}))return this.handleStart();if(qn(n)){this.timeoutId=setTimeout(this.handleStart,n.delay),this.handlePending(n);return}if($n(n)){this.handlePending(n);return}}this.handleStart()}detach(){this.listeners.removeAll(),this.windowListeners.removeAll(),setTimeout(this.documentListeners.removeAll,50),this.timeoutId!==null&&(clearTimeout(this.timeoutId),this.timeoutId=null)}handlePending(t,n){let{active:r,onPending:o}=this.props;o(r,t,this.initialCoordinates,n)}handleStart(){let{initialCoordinates:t}=this,{onStart:n}=this.props;t&&(this.activated=!0,this.documentListeners.add(ee.Click,Go,{capture:!0}),this.removeTextSelection(),this.documentListeners.add(ee.SelectionChange,this.removeTextSelection),n(t))}handleMove(t){var n;let{activated:r,initialCoordinates:o,props:i}=this,{onMove:a,options:{activationConstraint:s}}=i;if(!o)return;let l=(n=lt(t))!=null?n:se,u=at(o,l);if(!r&&s){if($n(s)){if(s.tolerance!=null&&Jt(u,s.tolerance))return this.handleCancel();if(Jt(u,s.distance))return this.handleStart()}if(qn(s)&&Jt(u,s.tolerance))return this.handleCancel();this.handlePending(s,u);return}t.cancelable&&t.preventDefault(),a(l)}handleEnd(){let{onAbort:t,onEnd:n}=this.props;this.detach(),this.activated||t(this.props.active),n()}handleCancel(){let{onAbort:t,onCancel:n}=this.props;this.detach(),this.activated||t(this.props.active),n()}handleKeydown(t){t.code===O.Esc&&this.handleCancel()}removeTextSelection(){var t;(t=this.document.getSelection())==null||t.removeAllRanges()}},Zo={cancel:{name:"pointercancel"},move:{name:"pointermove"},end:{name:"pointerup"}},He=class extends ut{constructor(t){let{event:n}=t,r=Ee(n.target);super(t,Zo,r)}};He.activators=[{eventName:"onPointerDown",handler:(e,t)=>{let{nativeEvent:n}=e,{onActivation:r}=t;return!n.isPrimary||n.button!==0?!1:(r?.({event:n}),!0)}}];var Qo={move:{name:"mousemove"},end:{name:"mouseup"}},tn;(function(e){e[e.RightClick=2]="RightClick"})(tn||(tn={}));var nn=class extends ut{constructor(t){super(t,Qo,Ee(t.event.target))}};nn.activators=[{eventName:"onMouseDown",handler:(e,t)=>{let{nativeEvent:n}=e,{onActivation:r}=t;return n.button===tn.RightClick?!1:(r?.({event:n}),!0)}}];var Zt={cancel:{name:"touchcancel"},move:{name:"touchmove"},end:{name:"touchend"}},rn=class extends ut{constructor(t){super(t,Zt)}static setup(){return window.addEventListener(Zt.move.name,t,{capture:!1,passive:!1}),function(){window.removeEventListener(Zt.move.name,t)};function t(){}}};rn.activators=[{eventName:"onTouchStart",handler:(e,t)=>{let{nativeEvent:n}=e,{onActivation:r}=t,{touches:o}=n;return o.length>1?!1:(r?.({event:n}),!0)}}];var ct;(function(e){e[e.Pointer=0]="Pointer",e[e.DraggableRect=1]="DraggableRect"})(ct||(ct={}));var Ot;(function(e){e[e.TreeOrder=0]="TreeOrder",e[e.ReversedTreeOrder=1]="ReversedTreeOrder"})(Ot||(Ot={}));function ei(e){let{acceleration:t,activator:n=ct.Pointer,canScroll:r,draggingRect:o,enabled:i,interval:a=5,order:s=Ot.TreeOrder,pointerCoordinates:l,scrollableAncestors:u,scrollableAncestorRects:f,delta:c,threshold:p}=e,g=ni({delta:c,disabled:!i}),[k,h]=On(),b=(0,d.useRef)({x:0,y:0}),w=(0,d.useRef)({x:0,y:0}),x=(0,d.useMemo)(()=>{switch(n){case ct.Pointer:return l?{top:l.y,bottom:l.y,left:l.x,right:l.x}:null;case ct.DraggableRect:return o}},[n,o,l]),y=(0,d.useRef)(null),R=(0,d.useCallback)(()=>{let T=y.current;if(!T)return;let C=b.current.x*w.current.x,I=b.current.y*w.current.y;T.scrollBy(C,I)},[]),N=(0,d.useMemo)(()=>s===Ot.TreeOrder?[...u].reverse():u,[s,u]);(0,d.useEffect)(()=>{if(!i||!u.length||!x){h();return}for(let T of N){if(r?.(T)===!1)continue;let C=u.indexOf(T),I=f[C];if(!I)continue;let{direction:L,speed:F}=jo(T,I,x,t,p);for(let B of["x","y"])g[B][L[B]]||(F[B]=0,L[B]=0);if(F.x>0||F.y>0){h(),y.current=T,k(R,a),b.current=F,w.current=L;return}}b.current={x:0,y:0},w.current={x:0,y:0},h()},[t,R,r,h,i,a,JSON.stringify(x),JSON.stringify(g),k,u,N,f,JSON.stringify(p)])}var ti={x:{[K.Backward]:!1,[K.Forward]:!1},y:{[K.Backward]:!1,[K.Forward]:!1}};function ni(e){let{delta:t,disabled:n}=e,r=it(t);return Ke(o=>{if(n||!r||!o)return ti;let i={x:Math.sign(t.x-r.x),y:Math.sign(t.y-r.y)};return{x:{[K.Backward]:o.x[K.Backward]||i.x===-1,[K.Forward]:o.x[K.Forward]||i.x===1},y:{[K.Backward]:o.y[K.Backward]||i.y===-1,[K.Forward]:o.y[K.Forward]||i.y===1}}},[n,t,r])}function ri(e,t){let n=t!=null?e.get(t):void 0,r=n?n.node.current:null;return Ke(o=>{var i;return t==null?null:(i=r??o)!=null?i:null},[r,t])}function oi(e,t){return(0,d.useMemo)(()=>e.reduce((n,r)=>{let{sensor:o}=r,i=o.activators.map(a=>({eventName:a.eventName,handler:t(a.handler,r)}));return[...n,...i]},[]),[e,t])}var ft;(function(e){e[e.Always=0]="Always",e[e.BeforeDragging=1]="BeforeDragging",e[e.WhileDragging=2]="WhileDragging"})(ft||(ft={}));var on;(function(e){e.Optimized="optimized"})(on||(on={}));var Kn=new Map;function ii(e,t){let{dragging:n,dependencies:r,config:o}=t,[i,a]=(0,d.useState)(null),{frequency:s,measure:l,strategy:u}=o,f=(0,d.useRef)(e),c=b(),p=qe(c),g=(0,d.useCallback)(function(w){w===void 0&&(w=[]),!p.current&&a(x=>x===null?w:x.concat(w.filter(y=>!x.includes(y))))},[p]),k=(0,d.useRef)(null),h=Ke(w=>{if(c&&!n)return Kn;if(!w||w===Kn||f.current!==e||i!=null){let x=new Map;for(let y of e){if(!y)continue;if(i&&i.length>0&&!i.includes(y.id)&&y.rect.current){x.set(y.id,y.rect.current);continue}let R=y.node.current,N=R?new dt(l(R),R):null;y.rect.current=N,N&&x.set(y.id,N)}return x}return w},[e,i,n,c,l]);return(0,d.useEffect)(()=>{f.current=e},[e]),(0,d.useEffect)(()=>{c||g()},[n,c]),(0,d.useEffect)(()=>{i&&i.length>0&&a(null)},[JSON.stringify(i)]),(0,d.useEffect)(()=>{c||typeof s!="number"||k.current!==null||(k.current=setTimeout(()=>{g(),k.current=null},s))},[s,c,g,...r]),{droppableRects:h,measureDroppableContainers:g,measuringScheduled:i!=null};function b(){switch(u){case ft.Always:return!1;case ft.BeforeDragging:return n;default:return!n}}}function ln(e,t){return Ke(n=>e?n||(typeof t=="function"?t(e):e):null,[t,e])}function si(e,t){return ln(e,t)}function ai(e){let{callback:t,disabled:n}=e,r=rt(t),o=(0,d.useMemo)(()=>{if(n||typeof window>"u"||typeof window.MutationObserver>"u")return;let{MutationObserver:i}=window;return new i(r)},[r,n]);return(0,d.useEffect)(()=>()=>o?.disconnect(),[o]),o}function Lt(e){let{callback:t,disabled:n}=e,r=rt(t),o=(0,d.useMemo)(()=>{if(n||typeof window>"u"||typeof window.ResizeObserver>"u")return;let{ResizeObserver:i}=window;return new i(r)},[n]);return(0,d.useEffect)(()=>()=>o?.disconnect(),[o]),o}function li(e){return new dt(pt(e),e)}function Hn(e,t,n){t===void 0&&(t=li);let[r,o]=(0,d.useState)(null);function i(){o(l=>{if(!e)return null;if(e.isConnected===!1){var u;return(u=l??n)!=null?u:null}let f=t(e);return JSON.stringify(l)===JSON.stringify(f)?l:f})}let a=ai({callback(l){if(e)for(let u of l){let{type:f,target:c}=u;if(f==="childList"&&c instanceof HTMLElement&&c.contains(e)){i();break}}}}),s=Lt({callback:i});return de(()=>{i(),e?(s?.observe(e),a?.observe(document.body,{childList:!0,subtree:!0})):(s?.disconnect(),a?.disconnect())},[e]),r}function ci(e){let t=ln(e);return nr(e,t)}var jn=[];function di(e){let t=(0,d.useRef)(e),n=Ke(r=>e?r&&r!==jn&&e&&t.current&&e.parentNode===t.current.parentNode?r:an(e):jn,[e]);return(0,d.useEffect)(()=>{t.current=e},[e]),n}function ui(e){let[t,n]=(0,d.useState)(null),r=(0,d.useRef)(e),o=(0,d.useCallback)(i=>{let a=Gt(i.target);a&&n(s=>s?(s.set(a,en(a)),new Map(s)):null)},[]);return(0,d.useEffect)(()=>{let i=r.current;if(e!==i){a(i);let s=e.map(l=>{let u=Gt(l);return u?(u.addEventListener("scroll",o,{passive:!0}),[u,en(u)]):null}).filter(l=>l!=null);n(s.length?new Map(s):null),r.current=e}return()=>{a(e),a(i)};function a(s){s.forEach(l=>{let u=Gt(l);u?.removeEventListener("scroll",o)})}},[o,e]),(0,d.useMemo)(()=>e.length?t?Array.from(t.values()).reduce((i,a)=>Ne(i,a),se):cr(e):se,[e,t])}function _n(e,t){t===void 0&&(t=[]);let n=(0,d.useRef)(null);return(0,d.useEffect)(()=>{n.current=null},t),(0,d.useEffect)(()=>{let r=e!==se;r&&!n.current&&(n.current=e),!r&&n.current&&(n.current=null)},[e]),n.current?at(e,n.current):se}function fi(e){(0,d.useEffect)(()=>{if(!nt)return;let t=e.map(n=>{let{sensor:r}=n;return r.setup==null?void 0:r.setup()});return()=>{for(let n of t)n?.()}},e.map(t=>{let{sensor:n}=t;return n}))}function pi(e,t){return(0,d.useMemo)(()=>e.reduce((n,r)=>{let{eventName:o,handler:i}=r;return n[o]=a=>{i(a,t)},n},{}),[e,t])}function fr(e){return(0,d.useMemo)(()=>e?$o(e):null,[e])}var Un=[];function gi(e,t){t===void 0&&(t=pt);let[n]=e,r=fr(n?_(n):null),[o,i]=(0,d.useState)(Un);function a(){i(()=>e.length?e.map(l=>ar(l)?r:new dt(t(l),l)):Un)}let s=Lt({callback:a});return de(()=>{s?.disconnect(),a(),e.forEach(l=>s?.observe(l))},[e]),o}function pr(e){if(!e)return null;if(e.children.length>1)return e;let t=e.children[0];return $e(t)?t:e}function vi(e){let{measure:t}=e,[n,r]=(0,d.useState)(null),o=(0,d.useCallback)(u=>{for(let{target:f}of u)if($e(f)){r(c=>{let p=t(f);return c?{...c,width:p.width,height:p.height}:p});break}},[t]),i=Lt({callback:o}),a=(0,d.useCallback)(u=>{let f=pr(u);i?.disconnect(),f&&i?.observe(f),r(f?t(f):null)},[t,i]),[s,l]=ot(a);return(0,d.useMemo)(()=>({nodeRef:s,rect:n,setRef:l}),[n,s,l])}var hi=[{sensor:He,options:{}},{sensor:Tt,options:{}}],mi={current:{}},At={draggable:{measure:Wn},droppable:{measure:Wn,strategy:ft.WhileDragging,frequency:on.Optimized},dragOverlay:{measure:pt}},Oe=class extends Map{get(t){var n;return t!=null&&(n=super.get(t))!=null?n:void 0}toArray(){return Array.from(this.values())}getEnabled(){return this.toArray().filter(t=>{let{disabled:n}=t;return!n})}getNodeFor(t){var n,r;return(n=(r=this.get(t))==null?void 0:r.node.current)!=null?n:void 0}},bi={activatorEvent:null,active:null,activeNode:null,activeNodeRect:null,collisions:null,containerNodeRect:null,draggableNodes:new Map,droppableRects:new Map,droppableContainers:new Oe,over:null,dragOverlay:{nodeRef:{current:null},rect:null,setRef:Rt},scrollableAncestors:[],scrollableAncestorRects:[],measuringConfiguration:At,measureDroppableContainers:Rt,windowRect:null,measuringScheduled:!1},gr={activatorEvent:null,activators:[],active:null,activeNodeRect:null,ariaDescribedById:{draggable:""},dispatch:Rt,draggableNodes:new Map,over:null,measureDroppableContainers:Rt},gt=(0,d.createContext)(gr),vr=(0,d.createContext)(bi);function wi(){return{draggable:{active:null,initialCoordinates:{x:0,y:0},nodes:new Map,translate:{x:0,y:0}},droppable:{containers:new Oe}}}function yi(e,t){switch(t.type){case $.DragStart:return{...e,draggable:{...e.draggable,initialCoordinates:t.initialCoordinates,active:t.active}};case $.DragMove:return e.draggable.active==null?e:{...e,draggable:{...e.draggable,translate:{x:t.coordinates.x-e.draggable.initialCoordinates.x,y:t.coordinates.y-e.draggable.initialCoordinates.y}}};case $.DragEnd:case $.DragCancel:return{...e,draggable:{...e.draggable,active:null,initialCoordinates:{x:0,y:0},translate:{x:0,y:0}}};case $.RegisterDroppable:{let{element:n}=t,{id:r}=n,o=new Oe(e.droppable.containers);return o.set(r,n),{...e,droppable:{...e.droppable,containers:o}}}case $.SetDroppableDisabled:{let{id:n,key:r,disabled:o}=t,i=e.droppable.containers.get(n);if(!i||r!==i.key)return e;let a=new Oe(e.droppable.containers);return a.set(n,{...i,disabled:o}),{...e,droppable:{...e.droppable,containers:a}}}case $.UnregisterDroppable:{let{id:n,key:r}=t,o=e.droppable.containers.get(n);if(!o||r!==o.key)return e;let i=new Oe(e.droppable.containers);return i.delete(n),{...e,droppable:{...e.droppable,containers:i}}}default:return e}}function ki(e){let{disabled:t}=e,{active:n,activatorEvent:r,draggableNodes:o}=(0,d.useContext)(gt),i=it(r),a=it(n?.id);return(0,d.useEffect)(()=>{if(!t&&!r&&i&&a!=null){if(!Nt(i)||document.activeElement===i.target)return;let s=o.get(a);if(!s)return;let{activatorNode:l,node:u}=s;if(!l.current&&!u.current)return;requestAnimationFrame(()=>{for(let f of[l.current,u.current]){if(!f)continue;let c=Bn(f);if(c){c.focus();break}}})}},[r,t,o,a,i]),null}function hr(e,t){let{transform:n,...r}=t;return e!=null&&e.length?e.reduce((o,i)=>i({transform:o,...r}),n):n}function xi(e){return(0,d.useMemo)(()=>({draggable:{...At.draggable,...e?.draggable},droppable:{...At.droppable,...e?.droppable},dragOverlay:{...At.dragOverlay,...e?.dragOverlay}}),[e?.draggable,e?.droppable,e?.dragOverlay])}function Si(e){let{activeNode:t,measure:n,initialRect:r,config:o=!0}=e,i=(0,d.useRef)(!1),{x:a,y:s}=typeof o=="boolean"?{x:o,y:o}:o;de(()=>{if(!a&&!s||!t){i.current=!1;return}if(i.current||!r)return;let u=t?.node.current;if(!u||u.isConnected===!1)return;let f=n(u),c=nr(f,r);if(a||(c.x=0),s||(c.y=0),i.current=!0,Math.abs(c.x)>0||Math.abs(c.y)>0){let p=or(u);p&&p.scrollBy({top:c.y,left:c.x})}},[t,a,s,r,n])}var Bt=(0,d.createContext)({...se,scaleX:1,scaleY:1}),ye;(function(e){e[e.Uninitialized=0]="Uninitialized",e[e.Initializing=1]="Initializing",e[e.Initialized=2]="Initialized"})(ye||(ye={}));var mr=(0,d.memo)(function(t){var n,r,o,i;let{id:a,accessibility:s,autoScroll:l=!0,children:u,sensors:f=hi,collisionDetection:c=sn,measuring:p,modifiers:g,...k}=t,h=(0,d.useReducer)(yi,void 0,wi),[b,w]=h,[x,y]=Do(),[R,N]=(0,d.useState)(ye.Uninitialized),T=R===ye.Initialized,{draggable:{active:C,nodes:I,translate:L},droppable:{containers:F}}=b,B=C!=null?I.get(C):null,Z=(0,d.useRef)({initial:null,translated:null}),ne=(0,d.useMemo)(()=>{var j;return C!=null?{id:C,data:(j=B?.data)!=null?j:mi,rect:Z}:null},[C,B]),V=(0,d.useRef)(null),[Y,Xe]=(0,d.useState)(null),[re,wt]=(0,d.useState)(null),ue=qe(k,Object.values(k)),Ge=st("DndDescribedBy",a),yt=(0,d.useMemo)(()=>F.getEnabled(),[F]),ae=xi(p),{droppableRects:ge,measureDroppableContainers:Be,measuringScheduled:kt}=ii(yt,{dragging:T,dependencies:[L.x,L.y],config:ae.droppable}),v=ri(I,C),S=(0,d.useMemo)(()=>re?lt(re):null,[re]),M=po(),q=si(v,ae.draggable.measure);Si({activeNode:C!=null?I.get(C):null,config:M.layoutShiftCompensation,initialRect:q,measure:ae.draggable.measure});let P=Hn(v,ae.draggable.measure,q),Ie=Hn(v?v.parentElement:null),oe=(0,d.useRef)({activatorEvent:null,active:null,activeNode:v,collisionRect:null,collisions:null,droppableRects:ge,draggableNodes:I,draggingNode:null,draggingNodeRect:null,droppableContainers:F,over:null,scrollableAncestors:[],scrollAdjustedTranslate:null}),Je=F.getNodeFor((n=oe.current.over)==null?void 0:n.id),ie=vi({measure:ae.dragOverlay.measure}),xt=(r=ie.nodeRef.current)!=null?r:v,Me=T?(o=ie.rect)!=null?o:P:null,yn=!!(ie.nodeRef.current&&ie.rect),kn=ci(yn?null:P),_t=fr(xt?_(xt):null),ve=di(T?Je??v:null),St=gi(ve),Ct=hr(g,{transform:{x:L.x-kn.x,y:L.y-kn.y,scaleX:1,scaleY:1},activatorEvent:re,active:ne,activeNodeRect:P,containerNodeRect:Ie,draggingNodeRect:Me,over:oe.current.over,overlayNodeRect:ie.rect,scrollableAncestors:ve,scrollableAncestorRects:St,windowRect:_t}),xn=S?Ne(S,L):null,Sn=ui(ve),io=_n(Sn),so=_n(Sn,[P]),Pe=Ne(Ct,io),ze=Me?zo(Me,Ct):null,Ze=ne&&ze?c({active:ne,collisionRect:ze,droppableRects:ge,droppableContainers:yt,pointerCoordinates:xn}):null,Cn=Oo(Ze,"id"),[he,In]=(0,d.useState)(null),ao=yn?Ct:Ne(Ct,so),lo=Mo(ao,(i=he?.rect)!=null?i:null,P),Ut=(0,d.useRef)(null),Dn=(0,d.useCallback)((j,X)=>{let{sensor:G,options:me}=X;if(V.current==null)return;let Q=I.get(V.current);if(!Q)return;let J=j.nativeEvent,le=new G({active:V.current,activeNode:Q,event:J,options:me,context:oe,onAbort(H){if(!I.get(H))return;let{onDragAbort:ce}=ue.current,fe={id:H};ce?.(fe),x({type:"onDragAbort",event:fe})},onPending(H,be,ce,fe){if(!I.get(H))return;let{onDragPending:et}=ue.current,we={id:H,constraint:be,initialCoordinates:ce,offset:fe};et?.(we),x({type:"onDragPending",event:we})},onStart(H){let be=V.current;if(be==null)return;let ce=I.get(be);if(!ce)return;let{onDragStart:fe}=ue.current,Qe={activatorEvent:J,active:{id:be,data:ce.data,rect:Z}};(0,Re.unstable_batchedUpdates)(()=>{fe?.(Qe),N(ye.Initializing),w({type:$.DragStart,initialCoordinates:H,active:be}),x({type:"onDragStart",event:Qe}),Xe(Ut.current),wt(J)})},onMove(H){w({type:$.DragMove,coordinates:H})},onEnd:We($.DragEnd),onCancel:We($.DragCancel)});Ut.current=le;function We(H){return async function(){let{active:ce,collisions:fe,over:Qe,scrollAdjustedTranslate:et}=oe.current,we=null;if(ce&&et){let{cancelDrop:tt}=ue.current;we={activatorEvent:J,active:ce,collisions:fe,delta:et,over:Qe},H===$.DragEnd&&typeof tt=="function"&&await Promise.resolve(tt(we))&&(H=$.DragCancel)}V.current=null,(0,Re.unstable_batchedUpdates)(()=>{w({type:H}),N(ye.Uninitialized),In(null),Xe(null),wt(null),Ut.current=null;let tt=H===$.DragEnd?"onDragEnd":"onDragCancel";if(we){let Vt=ue.current[tt];Vt?.(we),x({type:tt,event:we})}})}}},[I]),co=(0,d.useCallback)((j,X)=>(G,me)=>{let Q=G.nativeEvent,J=I.get(me);if(V.current!==null||!J||Q.dndKit||Q.defaultPrevented)return;let le={active:J};j(G,X.options,le)===!0&&(Q.dndKit={capturedBy:X.sensor},V.current=me,Dn(G,X))},[I,Dn]),En=oi(f,co);fi(f),de(()=>{P&&R===ye.Initializing&&N(ye.Initialized)},[P,R]),(0,d.useEffect)(()=>{let{onDragMove:j}=ue.current,{active:X,activatorEvent:G,collisions:me,over:Q}=oe.current;if(!X||!G)return;let J={active:X,activatorEvent:G,collisions:me,delta:{x:Pe.x,y:Pe.y},over:Q};(0,Re.unstable_batchedUpdates)(()=>{j?.(J),x({type:"onDragMove",event:J})})},[Pe.x,Pe.y]),(0,d.useEffect)(()=>{let{active:j,activatorEvent:X,collisions:G,droppableContainers:me,scrollAdjustedTranslate:Q}=oe.current;if(!j||V.current==null||!X||!Q)return;let{onDragOver:J}=ue.current,le=me.get(Cn),We=le&&le.rect.current?{id:le.id,rect:le.rect.current,data:le.data,disabled:le.disabled}:null,H={active:j,activatorEvent:X,collisions:G,delta:{x:Q.x,y:Q.y},over:We};(0,Re.unstable_batchedUpdates)(()=>{In(We),J?.(H),x({type:"onDragOver",event:H})})},[Cn]),de(()=>{oe.current={activatorEvent:re,active:ne,activeNode:v,collisionRect:ze,collisions:Ze,droppableRects:ge,draggableNodes:I,draggingNode:xt,draggingNodeRect:Me,droppableContainers:F,over:he,scrollableAncestors:ve,scrollAdjustedTranslate:Pe},Z.current={initial:Me,translated:ze}},[ne,v,Ze,ze,I,xt,Me,ge,F,he,ve,Pe]),ei({...M,delta:L,draggingRect:ze,pointerCoordinates:xn,scrollableAncestors:ve,scrollableAncestorRects:St});let uo=(0,d.useMemo)(()=>({active:ne,activeNode:v,activeNodeRect:P,activatorEvent:re,collisions:Ze,containerNodeRect:Ie,dragOverlay:ie,draggableNodes:I,droppableContainers:F,droppableRects:ge,over:he,measureDroppableContainers:Be,scrollableAncestors:ve,scrollableAncestorRects:St,measuringConfiguration:ae,measuringScheduled:kt,windowRect:_t}),[ne,v,P,re,Ze,Ie,ie,I,F,ge,he,Be,ve,St,ae,kt,_t]),fo=(0,d.useMemo)(()=>({activatorEvent:re,activators:En,active:ne,activeNodeRect:P,ariaDescribedById:{draggable:Ge},dispatch:w,draggableNodes:I,over:he,measureDroppableContainers:Be}),[re,En,ne,P,w,Ge,I,he,Be]);return d.default.createElement(Xn.Provider,{value:y},d.default.createElement(gt.Provider,{value:fo},d.default.createElement(vr.Provider,{value:uo},d.default.createElement(Bt.Provider,{value:lo},u)),d.default.createElement(ki,{disabled:s?.restoreFocus===!1})),d.default.createElement(Ao,{...s,hiddenTextDescribedById:Ge}));function po(){let j=Y?.autoScrollEnabled===!1,X=typeof l=="object"?l.enabled===!1:l===!1,G=T&&!j&&!X;return typeof l=="object"?{...l,enabled:G}:{enabled:G}}}),Ci=(0,d.createContext)(null),Vn="button",Ii="Draggable";function br(e){let{id:t,data:n,disabled:r=!1,attributes:o}=e,i=st(Ii),{activators:a,activatorEvent:s,active:l,activeNodeRect:u,ariaDescribedById:f,draggableNodes:c,over:p}=(0,d.useContext)(gt),{role:g=Vn,roleDescription:k="draggable",tabIndex:h=0}=o??{},b=l?.id===t,w=(0,d.useContext)(b?Bt:Ci),[x,y]=ot(),[R,N]=ot(),T=pi(a,t),C=qe(n);de(()=>(c.set(t,{id:t,key:i,node:x,activatorNode:R,data:C}),()=>{let L=c.get(t);L&&L.key===i&&c.delete(t)}),[c,t]);let I=(0,d.useMemo)(()=>({role:g,tabIndex:h,"aria-disabled":r,"aria-pressed":b&&g===Vn?!0:void 0,"aria-roledescription":k,"aria-describedby":f.draggable}),[r,g,h,b,k,f.draggable]);return{active:l,activatorEvent:s,activeNodeRect:u,attributes:I,isDragging:b,listeners:r?void 0:T,node:x,over:p,setNodeRef:y,setActivatorNodeRef:N,transform:w}}function Di(){return(0,d.useContext)(vr)}var Ei="Droppable",Ni={timeout:25};function wr(e){let{data:t,disabled:n=!1,id:r,resizeObserverConfig:o}=e,i=st(Ei),{active:a,dispatch:s,over:l,measureDroppableContainers:u}=(0,d.useContext)(gt),f=(0,d.useRef)({disabled:n}),c=(0,d.useRef)(!1),p=(0,d.useRef)(null),g=(0,d.useRef)(null),{disabled:k,updateMeasurementsFor:h,timeout:b}={...Ni,...o},w=qe(h??r),x=(0,d.useCallback)(()=>{if(!c.current){c.current=!0;return}g.current!=null&&clearTimeout(g.current),g.current=setTimeout(()=>{u(Array.isArray(w.current)?w.current:[w.current]),g.current=null},b)},[b]),y=Lt({callback:x,disabled:k||!a}),R=(0,d.useCallback)((I,L)=>{y&&(L&&(y.unobserve(L),c.current=!1),I&&y.observe(I))},[y]),[N,T]=ot(R),C=qe(t);return(0,d.useEffect)(()=>{!y||!N.current||(y.disconnect(),c.current=!1,y.observe(N.current))},[N,y]),(0,d.useEffect)(()=>(s({type:$.RegisterDroppable,element:{id:r,key:i,disabled:n,node:N,rect:p,data:C}}),()=>s({type:$.UnregisterDroppable,key:i,id:r})),[r]),(0,d.useEffect)(()=>{n!==f.current.disabled&&(s({type:$.SetDroppableDisabled,id:r,key:i,disabled:n}),f.current.disabled=n)},[r,i,n,s]),{active:a,rect:p,isOver:l?.id===r,node:N,over:l,setNodeRef:T}}function Ai(e){let{animation:t,children:n}=e,[r,o]=(0,d.useState)(null),[i,a]=(0,d.useState)(null),s=it(n);return!n&&!r&&s&&o(s),de(()=>{if(!i)return;let l=r?.key,u=r?.props.id;if(l==null||u==null){o(null);return}Promise.resolve(t(u,i)).then(()=>{o(null)})},[t,r,i]),d.default.createElement(d.default.Fragment,null,n,r?(0,d.cloneElement)(r,{ref:a}):null)}var Ri={x:0,y:0,scaleX:1,scaleY:1};function Ti(e){let{children:t}=e;return d.default.createElement(gt.Provider,{value:gr},d.default.createElement(Bt.Provider,{value:Ri},t))}var Oi={position:"fixed",touchAction:"none"},Li=e=>Nt(e)?"transform 250ms ease":void 0,Bi=(0,d.forwardRef)((e,t)=>{let{as:n,activatorEvent:r,adjustScale:o,children:i,className:a,rect:s,style:l,transform:u,transition:f=Li}=e;if(!s)return null;let c=o?u:{...u,scaleX:1,scaleY:1},p={...Oi,width:s.width,height:s.height,top:s.top,left:s.left,transform:Fe.Transform.toString(c),transformOrigin:o&&r?Ro(r,s):void 0,transition:typeof f=="function"?f(r):f,...l};return d.default.createElement(n,{className:a,style:p,ref:t},i)}),Mi=e=>t=>{let{active:n,dragOverlay:r}=t,o={},{styles:i,className:a}=e;if(i!=null&&i.active)for(let[s,l]of Object.entries(i.active))l!==void 0&&(o[s]=n.node.style.getPropertyValue(s),n.node.style.setProperty(s,l));if(i!=null&&i.dragOverlay)for(let[s,l]of Object.entries(i.dragOverlay))l!==void 0&&r.node.style.setProperty(s,l);return a!=null&&a.active&&n.node.classList.add(a.active),a!=null&&a.dragOverlay&&r.node.classList.add(a.dragOverlay),function(){for(let[l,u]of Object.entries(o))n.node.style.setProperty(l,u);a!=null&&a.active&&n.node.classList.remove(a.active)}},Pi=e=>{let{transform:{initial:t,final:n}}=e;return[{transform:Fe.Transform.toString(t)},{transform:Fe.Transform.toString(n)}]},zi={duration:250,easing:"ease",keyframes:Pi,sideEffects:Mi({styles:{active:{opacity:"0"}}})};function Wi(e){let{config:t,draggableNodes:n,droppableContainers:r,measuringConfiguration:o}=e;return rt((i,a)=>{if(t===null)return;let s=n.get(i);if(!s)return;let l=s.node.current;if(!l)return;let u=pr(a);if(!u)return;let{transform:f}=_(a).getComputedStyle(a),c=rr(f);if(!c)return;let p=typeof t=="function"?t:Fi(t);return dr(l,o.draggable.measure),p({active:{id:i,data:s.data,node:l,rect:o.draggable.measure(l)},draggableNodes:n,dragOverlay:{node:a,rect:o.dragOverlay.measure(u)},droppableContainers:r,measuringConfiguration:o,transform:c})})}function Fi(e){let{duration:t,easing:n,sideEffects:r,keyframes:o}={...zi,...e};return i=>{let{active:a,dragOverlay:s,transform:l,...u}=i;if(!t)return;let f={x:s.rect.left-a.rect.left,y:s.rect.top-a.rect.top},c={scaleX:l.scaleX!==1?a.rect.width*l.scaleX/s.rect.width:1,scaleY:l.scaleY!==1?a.rect.height*l.scaleY/s.rect.height:1},p={x:l.x-f.x,y:l.y-f.y,...c},g=o({...u,active:a,dragOverlay:s,transform:{initial:l,final:p}}),[k]=g,h=g[g.length-1];if(JSON.stringify(k)===JSON.stringify(h))return;let b=r?.({active:a,dragOverlay:s,...u}),w=s.node.animate(g,{duration:t,easing:n,fill:"forwards"});return new Promise(x=>{w.onfinish=()=>{b?.(),x()}})}}var Yn=0;function $i(e){return(0,d.useMemo)(()=>{if(e!=null)return Yn++,Yn},[e])}var yr=d.default.memo(e=>{let{adjustScale:t=!1,children:n,dropAnimation:r,style:o,transition:i,modifiers:a,wrapperElement:s="div",className:l,zIndex:u=999}=e,{activatorEvent:f,active:c,activeNodeRect:p,containerNodeRect:g,draggableNodes:k,droppableContainers:h,dragOverlay:b,over:w,measuringConfiguration:x,scrollableAncestors:y,scrollableAncestorRects:R,windowRect:N}=Di(),T=(0,d.useContext)(Bt),C=$i(c?.id),I=hr(a,{activatorEvent:f,active:c,activeNodeRect:p,containerNodeRect:g,draggingNodeRect:b.rect,over:w,overlayNodeRect:b.rect,scrollableAncestors:y,scrollableAncestorRects:R,transform:T,windowRect:N}),L=ln(p),F=Wi({config:r,draggableNodes:k,droppableContainers:h,measuringConfiguration:x}),B=L?b.setRef:void 0;return d.default.createElement(Ti,null,d.default.createElement(Ai,{animation:F},c&&C?d.default.createElement(Bi,{key:C,id:c.id,ref:B,as:s,activatorEvent:f,adjustScale:t,className:l,transition:i,rect:L,style:{zIndex:u,...o},transform:I},n):null))});function ke(e,t={},n="default"){return fetch("/api/kanban-flow",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({method:e,args:{...t,workspaceId:n}})}).then(r=>r.json()).catch(r=>({ok:!1,error:String(r&&r.message||r)}))}var xe=null,cn=new Set,kr=new Set,dn=new Set,xr=new Set;function Cr(e){xe=e}function un(e){return e.settings&&e.settings.confirmRequired?"This board REQUIRES human confirmation: never move the item to Done \u2014 finish via Review and let the human complete it.":"When the task is fully complete: move the item In Progress -> Done."}function Ir(){return"If the human replies while the item is in Review or Done: move it back to In Progress (Review -> In Progress / Done -> In Progress) and address their message in the same turn."}var fn=()=>"Scope limit: execute ONLY the work described in this item. If other work surfaces (other items, side tasks, extra refactors), do not start it \u2014 mention it in the conversation and let the human queue a separate item.",pn=e=>`At the end of EVERY turn, set your status with kanbanflow_set_status (id: ${e.id}): max 2 sentences \u2014 what is done, what is next or what you need from the human. The human sees it when hovering your card on the board.`;function qi(e,t){return[`Kanban pickup: item ${t.id} "${t.name}" was moved to To Do by the human.`,"","Workflow:",`1. Read it with kanbanflow_get_item (id: ${t.id}).`,"2. Confirm pickup: move it To Do -> In Progress (kanbanflow_move_item).","3. Do the work, narrating your progress and decisions in this conversation.","4. If you need anything from the human: move the item In Progress -> Review and state your question in this conversation.",`5. ${un(e)}`,"",Ir(),fn(),pn(t),`Always reference the item by id ${t.id}. Never modify other items.`].join(`
    `)}function Ki(e,t){return[`Kanban requeue: item ${t.id} "${t.name}" was moved back to To Do by the human.`,"Continue in this session's context: acknowledge in this conversation, move the item To Do -> In Progress, and address the human's feedback.",un(e),"",Ir(),fn(),pn(t),`Always reference the item by id ${t.id}.`].join(`
    `)}function Hi(e,t){return[`Kanban: the human returned item ${t.id} "${t.name}" to In Progress.`,"Continue working on it: give a short status in this conversation, address any feedback, then proceed per the workflow.",un(e),"",fn(),pn(t),`Always reference the item by id ${t.id}.`].join(`
    `)}async function ji(e,t,n){if(n.sessionId)return n.sessionId;if(!xe)return null;try{let r=await xe.createSession(e);return await ke("setSession",{id:n.id,sessionId:r},e),n.sessionId=r,r}catch(r){return console.warn("dsh-kanban-flow: session create failed for "+n.id,r),null}}async function Sr(e,t,n,r){if(!(!xe||dn.has(n.id))){dn.add(n.id);try{let o=await ji(e,t,n);if(!o)return;let i=t.items.find(a=>a.id===n.id)??n;await xe.renameSession(o,`${i.id} \xB7 ${i.name}`),await xe.promptSession(o,r(t,i))}catch(o){console.warn("dsh-kanban-flow: agent drive failed for "+n.id,o)}finally{dn.delete(n.id)}}}async function _i(e){if(!(!xe||xr.has(e))){xr.add(e);try{await xe.archiveSession(e)}catch(t){console.warn("dsh-kanban-flow: session archive failed for "+e,t)}}}function Dr(e,t){let n=Array.isArray(t.activities)?t.activities:[];if(!kr.has(e)){kr.add(e);for(let r of n)cn.add(r.id);return}for(let r of n){if(cn.has(r.id))continue;if(cn.add(r.id),r.type==="item_deleted"&&r.sessionId){_i(r.sessionId);continue}if(r.source!=="human")continue;let o=t.items.find(i=>i.id===r.itemId);o&&r.type==="item_moved"&&(r.to==="todo"?Sr(e,t,o,o.sessionId?Ki:qi):r.to==="in_progress"&&r.from==="review"&&Sr(e,t,o,Hi))}}var Mt=["backlog","todo","in_progress","review","done"],Le={backlog:"Backlog",todo:"To Do",in_progress:"In Progress",review:"Review",done:"Done"};var Ui=e=>Le[String(e)]||String(e||"");function je(e){if(!e)return"";let t=new Date(e).getTime();if(!Number.isFinite(t))return"";let n=Math.max(0,(Date.now()-t)/1e3);return n<5?"just now":n<60?`${Math.floor(n)} seconds ago`:n<120?"1 minute ago":n<3600?`${Math.floor(n/60)} minutes ago`:n<7200?"1 hour ago":n<86400?`${Math.floor(n/3600)} hours ago`:`${Math.floor(n/86400)} days ago`}function Er(e){let t=e.source==="agent"?"harness":"you";switch(e.type){case"item_moved":return`${t} moved to ${Ui(e.to)}`;case"item_created":return`${t} created`;case"item_updated":return`${t} edited`;case"item_deleted":return`${t} deleted`;default:return`${t} ${e.type.replace(/_/g," ")}`}}function Nr(e){return`${Er(e)} (${je(e.ts)})`}function Ar(e){return{phrase:Er(e),time:je(e.ts)}}var Rr="dsh-kanban-flow.clickOpensBoard",gn="dsh-kanban-flow:clickPrefChanged",Tr="dsh-kanban-flow.confirmArchive",vn="dsh-kanban-flow:archiveConfirmChanged";function Pt(){try{let e=localStorage.getItem(Rr);if(e==="0")return!1;if(e==="1")return!0}catch{}return!0}function Or(e){try{localStorage.setItem(Rr,e?"1":"0")}catch{}window.dispatchEvent(new CustomEvent(gn))}function Lr(e){return window.addEventListener(gn,e),window.addEventListener("storage",e),()=>{window.removeEventListener(gn,e),window.removeEventListener("storage",e)}}function zt(){try{let e=localStorage.getItem(Tr);if(e==="0")return!1;if(e==="1")return!0}catch{}return!0}function Br(e){try{localStorage.setItem(Tr,e?"1":"0")}catch{}window.dispatchEvent(new CustomEvent(vn))}function Wt(e){return window.addEventListener(vn,e),window.addEventListener("storage",e),()=>{window.removeEventListener(vn,e),window.removeEventListener("storage",e)}}var Ce=require("react");function Mr(e){let{override:t,currentSessionId:n,workspaceItems:r,recentWorkspaceId:o}=e,i=Array.isArray(r)?r:[],a=p=>p?i.find(g=>g&&g.workspaceId===p):void 0,s=n?i.find(p=>p&&Array.isArray(p.sessionIds)&&p.sessionIds.includes(n)):void 0,l=s?s.workspaceId:void 0,u=t!=null&&t.workspaceId!==l&&(t.hostSessionId===void 0||t.hostSessionId===n)?t:void 0,f=u?a(u.workspaceId):void 0,c=f||s||a(o);return{workspaceId:c?c.workspaceId:o||"default",workspaceTitle:c?c.title:void 0,pinned:f!==void 0,nativeWorkspaceId:l}}function Pr(e,t,n=0){if(!Array.isArray(e))return null;let r=0;for(let o of e)if(!(!o||o.title!==t)){if(r===n)return o.workspaceId;r+=1}return null}var $t="data-kf-kanban",Ht="Board",vt=null,Ue=!1,_e=!1;function Vi(){return Ue}function Wr(e){vt&&vt(e)}function mn(){return typeof document>"u"?[]:Array.from(document.querySelectorAll('[role="tab"]'))}function bn(){return mn().find(e=>(e.textContent||"").trim()===Ht)}function qt(){let e=bn();return!!e&&e.getAttribute("aria-selected")==="true"}function zr(e=4e3){if(typeof document>"u")return;let t=Date.now()+e,n=()=>{let r=bn();if(r){r.click();return}Date.now()<t&&window.setTimeout(n,120)};n()}function Fr(){let e=mn().find(t=>(t.textContent||"").trim()!==Ht);e&&e.click()}function Kt(){if(typeof document>"u"||_e)return;_e=!0;let e=Date.now()+2500,t=()=>{if(Ue){_e=!1;return}let n=bn();if(!n||n.getAttribute("aria-selected")!=="true"){_e=!1;return}let r=mn().find(o=>(o.textContent||"").trim()!==Ht);if(r){r.click(),_e=!1;return}if(Date.now()<e){window.setTimeout(t,120);return}_e=!1};t()}function $r(){return(0,Ce.useEffect)(()=>{if(typeof document>"u")return;let e=t=>{if(Vi()||!(t.target instanceof Element))return;let n=t.target.closest('[role="tab"]');n&&(n.textContent||"").trim()===Ht&&n.getAttribute("aria-selected")==="true"&&(t.stopImmediatePropagation(),t.preventDefault(),Fr())};return document.addEventListener("click",e,!0),()=>document.removeEventListener("click",e,!0)},[]),null}function Ft(e,t){if(!t||!e?.list)return;let n=e.list.getSnapshot()?.items;if(!Array.isArray(n))return;let r=n.find(o=>o&&Array.isArray(o.sessionIds)&&o.sessionIds.includes(t));return r?r.workspaceId:void 0}var Se=null,hn=new Set;function qr(){return Se??void 0}function ht(e){if(!(Se===null&&e===null||Se!==null&&e!==null&&Se.workspaceId===e.workspaceId&&Se.hostSessionId===e.hostSessionId)){Se=e;for(let n of hn)n()}}function Kr(e){return hn.add(e),()=>{hn.delete(e)}}function Hr({workspaces:e,sessions:t}){return(0,Ce.useEffect)(()=>{if(!e||!t)return;let n=()=>t.list.getSnapshot(),r=c=>{if(c===void 0)return!1;let p=n().byId;return!!(p&&p[c]&&p[c].blank===!1)},o=()=>{let c=n().current;return r(c)?c:void 0},i=()=>{let c=e.list?.getSnapshot?.();return new Set(Array.isArray(c?.archivedSessionIds)?c.archivedSessionIds:[])},a=c=>{let p=e.list?.getSnapshot?.()?.items,g=Array.isArray(p)?p.find(h=>h&&h.workspaceId===c):void 0;if(!g||!Array.isArray(g.sessionIds))return;let k=i();return g.sessionIds.find(h=>r(h)&&!k.has(h))},s=()=>{let c=n(),p=i();for(let g of c.ids??[])if(r(g)&&!p.has(g))return g},l=(c,p,g=6e3)=>{if(c()){p();return}let k=!1,h=()=>{k||(k=!0,b(),typeof w=="function"&&w(),window.clearTimeout(x),p())},b=t.list.subscribe(()=>{c()&&h()}),w=e.list?.subscribe?.(()=>{c()&&h()}),x=window.setTimeout(h,g)},u=()=>{qt()||zr(),window.setTimeout(()=>{Ue=!1},600)},f=c=>{let p=(w,x)=>{console.info(`[dsh-kanban-flow] open case ${w}:`,JSON.stringify({target:c,current:o()??null,actualCurrent:n().current??null,override:Se,boardTabActive:qt(),...x}))},g=o();if(g!==void 0){let w=Se?.workspaceId??Ft(e,g);if(w===c){p("1-toggle",{effective:w}),qt()?Fr():zr();return}}Ue=!0;let k=a(c);if(k!==void 0){p("2-native",{targetSession:k}),ht(null),t.open&&t.open(k),l(()=>n().current===k,u);return}if(g!==void 0){p("3-pin-current"),ht({workspaceId:c,hostSessionId:g}),u();return}let h=Ft(e,n().current),b=(h!==void 0?a(h):void 0)??s();if(b!==void 0){p("4-borrow",{borrowed:b,currentWorkspaceId:h}),ht({workspaceId:c,hostSessionId:b}),n().current===b?u():(t.open&&t.open(b),l(()=>n().current===b,u));return}p("5-seed"),e.startSession(c),l(()=>{let w=n().current;return w!==void 0&&Ft(e,w)===c},()=>{let w=n().current;if(w===void 0||Ft(e,w)!==c){Ue=!1;return}let y=(t.binding?t.binding(w):void 0)?.session.prompt([{type:"text",text:'Kanban board bootstrap: reply with the single word "ready".'}],"queue");Promise.resolve(y).catch(R=>console.warn("dsh-kanban-flow: board seed prompt failed",R)),l(()=>o()!==void 0,u,2e4)},1e4)};return vt=f,()=>{vt===f&&(vt=null)}},[e,t]),null}function jr({sessions:e}){return(0,Ce.useEffect)(()=>{if(typeof document>"u")return;let t=n=>{if(!(n.target instanceof Element))return;let r=n.target.closest('[role="treeitem"]');!r||r.hasAttribute("aria-expanded")||n.target.closest("button")||qt()&&Kt()};return document.addEventListener("click",t,!0),()=>document.removeEventListener("click",t,!0)},[]),(0,Ce.useEffect)(()=>{if(!e?.list)return;let t=e.list.getSnapshot()?.current;return e.list.subscribe(()=>{let r=e.list.getSnapshot()?.current;r!==t&&(t=r,Ue||Kt())})},[e]),null}function _r(){return typeof document>"u"?[]:Array.from(document.querySelectorAll('[role="treeitem"][aria-expanded]')).filter(t=>mt(t)!==null)}function mt(e){let t=Array.from(e.querySelectorAll(":scope > span"));for(let n of t)if((n.textContent||"").trim()!==""&&n.querySelector("button")===null&&n.querySelector("svg")===null)return n;return null}function Yi(e){let t=Array.from(e.querySelectorAll(":scope > span"));for(let n of t)if(n.querySelector("button")!==null)return n;return null}function Xi(e,t){if(!(t instanceof Element))return!1;let n=t.closest("span");return!n||!e.contains(n)?!1:n.querySelector("svg")!==null&&n.querySelector("button")===null&&(n.textContent||"").trim()===""}function Ur(e,t){let n=mt(t);if(!n)return null;let r=(n.textContent||"").trim(),o=e?.list?.getSnapshot?.()?.items;if(!Array.isArray(o))return null;let i=0;for(let a of _r()){if(a===t)break;let s=mt(a);s&&(s.textContent||"").trim()===r&&(i+=1)}return Pr(o,r,i)}function Gi(){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 16 16"),e.setAttribute("width","14"),e.setAttribute("height","14"),e.setAttribute("fill","none");for(let[t,n]of[[1.5,12],[6,8],[10.5,5]]){let r=document.createElementNS("http://www.w3.org/2000/svg","rect");r.setAttribute("x",String(t)),r.setAttribute("y","2"),r.setAttribute("width","4"),r.setAttribute("height",String(n)),r.setAttribute("rx","1.4"),r.setAttribute("fill","currentColor"),e.appendChild(r)}return e}function Vr({workspaces:e}){return(0,Ce.useEffect)(()=>{if(typeof document>"u")return;let t=!1,n=()=>{if(!t)for(let i of _r()){let a=mt(i),s=Yi(i);if(!a||!s||s.querySelector(`[${$t}]`))continue;let l=Ur(e,i);if(!l)continue;let u=(a.textContent||"").trim(),f=document.createElement("button");f.type="button",f.setAttribute($t,""),f.className="kf-sidebar-icon",f.title=`Open kanban board (${u})`,f.setAttribute("aria-label",`Open kanban board for ${u}`),f.appendChild(Gi()),f.addEventListener("click",c=>{c.stopPropagation(),c.preventDefault(),Wr(l)}),s.appendChild(f)}},r=new MutationObserver(()=>n());r.observe(document.documentElement,{childList:!0,subtree:!0});let o=e?.list?.subscribe?.(()=>n());return n(),()=>{t=!0,r.disconnect(),typeof o=="function"&&o();for(let i of Array.from(document.querySelectorAll(`[${$t}]`)))i.remove()}},[e]),null}function Yr({workspaces:e}){return(0,Ce.useEffect)(()=>{if(typeof document>"u")return;let t=n=>{if(!Pt()||!(n.target instanceof Element))return;let r=n.target.closest('[role="treeitem"][aria-expanded]');if(!r||!mt(r)||Xi(r,n.target)||n.target.closest("button")&&!n.target.closest(`[${$t}]`))return;let i=Ur(e,r);i&&(n.stopPropagation(),n.preventDefault(),Wr(i))};return document.addEventListener("click",t,!0),()=>document.removeEventListener("click",t,!0)},[e]),null}function Xr({workspaces:e}){return(0,Ce.useEffect)(()=>{if(!e?.list||typeof e.list.getSnapshot!="function")return;let t=!1,n=new Set(e.list.getSnapshot()?.archivedSessionIds??[]),r=async()=>{if(t)return;let i=e.list.getSnapshot(),a=new Set(i?.archivedSessionIds??[]),s=[...a].filter(l=>!n.has(l));if(n=a,s.length!==0){for(let l of Array.isArray(i?.items)?i.items:[])if(!(!l||!l.workspaceId))try{let f=(await ke("get",{},l.workspaceId))?.board?.items??[];for(let c of f)c.sessionId&&s.includes(c.sessionId)&&await ke("deleteItem",{id:c.id},l.workspaceId)}catch{}}},o=e.list.subscribe(()=>{r()});return()=>{t=!0,o()}},[e]),null}var jt=require("react"),te=require("react/jsx-runtime");function Gr({item:e,onConfirm:t,onCancel:n}){let r=(0,jt.useRef)(null);return(0,jt.useEffect)(()=>{r.current?.focus();let o=i=>{i.key==="Escape"&&n(),i.key==="Enter"&&t()};return document.addEventListener("keydown",o),()=>document.removeEventListener("keydown",o)},[t,n]),(0,te.jsx)("div",{className:"kf-dialog-backdrop",onMouseDown:o=>{o.target===o.currentTarget&&n()},children:(0,te.jsxs)("div",{className:"kf-dialog",role:"alertdialog","aria-label":"Archive "+e.id,style:{width:400},children:[(0,te.jsx)("div",{className:"kf-dialog-head",children:(0,te.jsx)("span",{className:"kf-dialog-title",children:"Archive item?"})}),(0,te.jsxs)("div",{className:"kf-dialog-body",children:[(0,te.jsxs)("div",{className:"kf-muted",children:["Archive ",(0,te.jsx)("strong",{children:e.id})," \u201C",e.name,"\u201D? The item will be removed from the board",e.sessionId?" and its task session archived":"","."]}),(0,te.jsxs)("div",{className:"kf-newitem-row",style:{justifyContent:"flex-end"},children:[(0,te.jsx)("button",{type:"button",className:"kf-btn kf-ghost",onClick:n,children:"Cancel"}),(0,te.jsx)("button",{type:"button",ref:r,className:"kf-btn kf-danger",onClick:t,children:"Archive"})]})]})]})})}var bt=require("react");var E=require("react/jsx-runtime"),Ji=e=>Le[e]||e;function Jr(e){let{item:t,board:n,onOpenChange:r,onSave:o,onDelete:i,onOpenSession:a,sessions:s}=e,[l,u]=(0,bt.useState)(t?t.name:""),[f,c]=(0,bt.useState)(t?t.description:"");if((0,bt.useEffect)(()=>{u(t?t.name:""),c(t?t.description:"")},[t&&t.id]),!t)return null;let p=n.activities.filter(g=>g.itemId===t.id);return(0,E.jsx)("div",{className:"kf-dialog-backdrop",onMouseDown:g=>{g.target===g.currentTarget&&r(!1)},children:(0,E.jsxs)("div",{className:"kf-dialog",role:"dialog","aria-label":"Item "+t.id,children:[(0,E.jsxs)("div",{className:"kf-dialog-head",children:[(0,E.jsx)("span",{className:"kf-code-chip",children:t.id}),(0,E.jsx)("span",{className:"kf-dialog-title",children:t.name}),(0,E.jsx)("span",{className:"kf-spacer"}),t.sessionId&&s&&(0,E.jsx)("button",{type:"button",className:"kf-btn",onClick:()=>a(t),children:"Open task session"}),(0,E.jsx)("button",{type:"button",className:"kf-iconbtn",title:"Close","aria-label":"Close item dialog",onClick:()=>r(!1),children:"\u2715"})]}),(0,E.jsxs)("div",{className:"kf-dialog-body",children:[(0,E.jsxs)("div",{className:"kf-muted",children:["In ",(0,E.jsx)("strong",{children:Ji(t.columnId)}),t.sessionId?" \xB7 linked to a task session":""]}),t.statusNote&&(0,E.jsxs)("div",{className:"kf-status-box",children:[(0,E.jsxs)("div",{className:"kf-fieldlabel",children:["Status",t.statusAt?" \xB7 "+je(t.statusAt):""]}),(0,E.jsx)("div",{children:t.statusNote})]}),(0,E.jsxs)("div",{children:[(0,E.jsx)("div",{className:"kf-fieldlabel",children:"Name"}),(0,E.jsx)("input",{className:"kf-input",value:l,onChange:g=>u(g.target.value)})]}),(0,E.jsxs)("div",{children:[(0,E.jsx)("div",{className:"kf-fieldlabel",children:"Description"}),(0,E.jsx)("textarea",{className:"kf-textarea",value:f,onChange:g=>c(g.target.value)})]}),(0,E.jsxs)("div",{className:"kf-newitem-row",style:{justifyContent:"flex-start"},children:[(0,E.jsx)("button",{type:"button",className:"kf-btn kf-primary",onClick:()=>o({name:l,description:f}),children:"Save"}),(0,E.jsx)("button",{type:"button",className:"kf-btn kf-danger",onClick:()=>i(t.id),children:"Delete item"})]}),t.sessionId&&(0,E.jsx)("div",{className:"kf-muted",children:"Deleting this item also archives its task session."}),(0,E.jsxs)("div",{children:[(0,E.jsx)("div",{className:"kf-fieldlabel",children:"Activity"}),p.length===0&&(0,E.jsx)("div",{className:"kf-muted",children:"No activity yet."}),p.slice().reverse().map(g=>(0,E.jsx)("div",{className:"kf-activity-row",children:(0,E.jsx)("span",{children:Nr(g)})},g.id))]})]})]})})}var Ve=require("react"),U=require("react/jsx-runtime");function Zr({code:e,itemCount:t,onConfirm:n,onDismiss:r}){let[o,i]=(0,Ve.useState)(e),a=(0,Ve.useRef)(null);(0,Ve.useEffect)(()=>{a.current?.focus(),a.current?.select()},[]);let s=o.toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,6),l=/^[A-Z0-9]{2,6}$/.test(s);return(0,U.jsx)("div",{className:"kf-dialog-backdrop",onMouseDown:u=>{u.target===u.currentTarget&&r()},children:(0,U.jsxs)("div",{className:"kf-dialog",role:"dialog","aria-label":"Board code",style:{width:400},children:[(0,U.jsx)("div",{className:"kf-dialog-head",children:(0,U.jsx)("span",{className:"kf-dialog-title",children:"Name your board"})}),(0,U.jsxs)("div",{className:"kf-dialog-body",children:[(0,U.jsxs)("div",{className:"kf-muted",children:["Pick a short code (2\u20136 letters/digits) for this workspace's board. New items get ids like"," ",(0,U.jsx)("strong",{children:(s.length>=2?s:"XX")+"-1"}),".",t>0&&" Existing item ids stay unchanged."]}),(0,U.jsxs)("div",{children:[(0,U.jsx)("div",{className:"kf-fieldlabel",children:"Board code"}),(0,U.jsx)("input",{ref:a,className:"kf-input",style:{fontFamily:"var(--ds-font-family-code)",textTransform:"uppercase",fontSize:16,letterSpacing:"0.08em"},value:o,onChange:u=>i(u.target.value.toUpperCase()),onKeyDown:u=>{u.key==="Enter"&&l&&n(s),u.key==="Escape"&&r()},maxLength:6})]}),(0,U.jsxs)("div",{className:"kf-newitem-row",style:{justifyContent:"flex-end"},children:[(0,U.jsx)("button",{type:"button",className:"kf-btn kf-ghost",onClick:r,children:"Decide later"}),(0,U.jsxs)("button",{type:"button",className:"kf-btn kf-primary",disabled:!l,onClick:()=>n(s),children:["Use ",s||"\u2026"]})]})]})]})})}var pe=require("react");var A=require("react/jsx-runtime");function wn({on:e,onToggle:t,label:n}){return(0,A.jsx)("button",{type:"button",role:"switch","aria-checked":e,"aria-label":n,className:"kf-switch"+(e?" kf-on":""),onClick:t,children:(0,A.jsx)("span",{className:"kf-switch-thumb"})})}function Qr({board:e,onCode:t,onConfirmRequired:n,onClose:r}){let o=(0,pe.useRef)(null),[i,a]=(0,pe.useState)(e.code);(0,pe.useEffect)(()=>{let f=c=>{o.current&&!o.current.contains(c.target)&&r()};return document.addEventListener("mousedown",f),()=>document.removeEventListener("mousedown",f)},[r]);let s=i.toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,6),l=/^[A-Z0-9]{2,6}$/.test(s),u=!!(e.settings&&e.settings.confirmRequired);return(0,A.jsxs)("div",{className:"kf-pop",ref:o,role:"dialog","aria-label":"Board settings",children:[(0,A.jsxs)("div",{className:"kf-toggle-row",children:[(0,A.jsx)(wn,{on:u,onToggle:()=>n(!u),label:"Require confirmation to complete work"}),(0,A.jsxs)("div",{className:"kf-toggle-text",children:[(0,A.jsx)("div",{className:"kf-toggle-title",children:"Require confirmation to complete work"}),(0,A.jsx)("div",{className:"kf-toggle-sub",children:"On: the agent must send finished work through Review \u2014 it can never move items to Done. You complete by dragging to Done."})]})]}),(0,A.jsxs)("div",{children:[(0,A.jsx)("div",{className:"kf-fieldlabel",children:"Board code"}),(0,A.jsxs)("div",{className:"kf-code-row",children:[(0,A.jsx)("input",{className:"kf-input",value:i,maxLength:6,onChange:f=>a(f.target.value.toUpperCase())}),(0,A.jsx)("button",{type:"button",className:"kf-btn",disabled:!l||s===e.code,onClick:()=>t(s),children:"Save"})]}),(0,A.jsxs)("div",{className:"kf-toggle-sub",style:{marginTop:4},children:["Prefixes new item ids (",e.code,"-1, ",e.code,"-2\u2026). Existing ids stay unchanged. The workspace-click preference lives in Settings \u2192 Plugins \u2192 Kanban Flow."]})]})]})}function eo(){let e=(0,pe.useSyncExternalStore)(Lr,Pt),t=(0,pe.useSyncExternalStore)(Wt,zt);return(0,A.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:16,maxWidth:520},children:[(0,A.jsxs)("div",{className:"kf-toggle-row",children:[(0,A.jsx)(wn,{on:e,onToggle:()=>Or(!e),label:"Workspace click opens board"}),(0,A.jsxs)("div",{className:"kf-toggle-text",children:[(0,A.jsx)("div",{className:"kf-toggle-title",children:"Workspace click opens board"}),(0,A.jsx)("div",{className:"kf-toggle-sub",children:"New: clicking a workspace in the sidebar opens that workspace's board in-app, on the Board tab of its conversation (the folder icon still expands the session list). Old: clicking a workspace expands its session list."})]})]}),(0,A.jsxs)("div",{className:"kf-toggle-row",children:[(0,A.jsx)(wn,{on:t,onToggle:()=>Br(!t),label:"Require confirmation to archive items"}),(0,A.jsxs)("div",{className:"kf-toggle-text",children:[(0,A.jsx)("div",{className:"kf-toggle-title",children:"Require confirmation to archive items"}),(0,A.jsx)("div",{className:"kf-toggle-sub",children:"On: archiving an item from its card first opens a confirmation dialog describing what will be removed. Off: the card's archive button removes the item (and archives its task session) immediately."})]})]}),(0,A.jsx)("div",{className:"kf-muted",children:"Board-specific options \u2014 \u201CRequire confirmation to complete work\u201D and the board code \u2014 live in the gear menu of each board (Board tab \u2192 \u2699)."})]})}var m=require("react/jsx-runtime"),Zi=e=>{let t=tr(e);if(t.length>0)return t;let n=sn(e);return n.length>0?n:er(e)};function Ye({path:e,size:t=15}){return(0,m.jsx)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:(0,m.jsx)("path",{d:e})})}var Qi="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",es="M5 12h14M12 5v14",ts="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",ns="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",rs="M2 4h20v4H2zM3 8v12h18V8 M10 12h4";function os({item:e,flash:t,lastActivity:n,onOpenSession:r,onEdit:o,onArchive:i}){let{attributes:a,listeners:s,setNodeRef:l,isDragging:u}=br({id:e.id}),[f,c]=(0,D.useState)(!1),[p,g]=(0,D.useState)(null),k=(0,D.useRef)(null),h=(0,D.useRef)(null),b=e.statusNote?{title:"Status",body:e.statusNote,time:je(e.statusAt)}:null,w=()=>{u||!b||(h.current!==null&&window.clearTimeout(h.current),h.current=window.setTimeout(()=>{let y=k.current;if(!y)return;let R=y.getBoundingClientRect();g({left:R.left,top:R.top,width:R.width}),c(!0)},300))},x=()=>{h.current!==null&&(window.clearTimeout(h.current),h.current=null),c(!1)};return(0,D.useEffect)(()=>()=>{h.current!==null&&window.clearTimeout(h.current)},[]),(0,D.useEffect)(()=>{u&&x()},[u]),(0,m.jsxs)("div",{ref:y=>{k.current=y,l(y)},...a,...s,className:"kf-card"+(t?" kf-agent-flash":"")+(e.sessionId?" kf-has-session":"")+(u?" kf-dragging":""),style:{"--kf-card-accent":"var(--kf-accent, var(--dsw-alias-label-secondary))"},onMouseEnter:w,onMouseLeave:x,onFocus:w,onBlur:x,onClick:y=>{y.target.closest(".kf-edit-fab, .kf-archive-fab")||(e.sessionId?r():o())},children:[(0,m.jsx)("button",{type:"button",className:"kf-edit-fab",title:"Details","aria-label":"Details for "+e.id,onClick:y=>{y.stopPropagation(),o()},children:(0,m.jsx)(Ye,{path:Qi,size:13})}),(0,m.jsx)("button",{type:"button",className:"kf-archive-fab",title:"Archive item","aria-label":"Archive "+e.id,onClick:y=>{y.stopPropagation(),i()},children:(0,m.jsx)(Ye,{path:rs,size:13})}),(0,m.jsxs)("div",{className:"kf-card-id",children:[e.id,e.sessionId&&(0,m.jsx)("span",{className:"kf-session-badge",title:"Open task session "+e.sessionId,children:(0,m.jsx)(Ye,{path:ns,size:11})})]}),(0,m.jsx)("div",{className:"kf-card-name",children:e.name}),n&&(0,m.jsxs)("div",{className:"kf-card-activity",children:[(0,m.jsx)("span",{className:"kf-card-activity-phrase",children:n.phrase}),(0,m.jsx)("span",{className:"kf-card-activity-time",children:n.time})]}),f&&b&&p&&(0,to.createPortal)((0,m.jsxs)("div",{className:"kf-card-tip",role:"tooltip",style:{left:p.left,top:p.top,width:p.width,transform:"translateY(calc(-100% - 6px))"},children:[(0,m.jsxs)("div",{className:"kf-card-tip-title",children:[b.title,b.time?" \xB7 "+b.time:""]}),(0,m.jsx)("div",{className:"kf-card-tip-body",children:b.body}),e.sessionId&&(0,m.jsx)("div",{className:"kf-card-tip-hint",children:"Click to open the task session"})]}),document.body)]})}function is({columnId:e,onAdd:t,onCancel:n}){let[r,o]=(0,D.useState)(""),[i,a]=(0,D.useState)("");return(0,m.jsxs)("div",{className:"kf-newitem",children:[(0,m.jsx)("input",{className:"kf-input",autoFocus:!0,placeholder:"Item name",value:r,onChange:s=>o(s.target.value),onKeyDown:s=>{s.key==="Enter"&&r.trim()&&t(r,i),s.key==="Escape"&&n()}}),(0,m.jsx)("textarea",{className:"kf-textarea",placeholder:"Description (optional)",value:i,onChange:s=>a(s.target.value)}),(0,m.jsxs)("div",{className:"kf-newitem-row",children:[(0,m.jsx)("button",{type:"button",className:"kf-btn kf-ghost",onClick:n,children:"Cancel"}),(0,m.jsxs)("button",{type:"button",className:"kf-btn kf-primary",disabled:!r.trim(),onClick:()=>t(r,i),children:["Add to ",Le[e]]})]})]})}function ss({colId:e,highlighted:t,adding:n,items:r,flashIds:o,lastLines:i,onAdd:a,onCancelAdd:s,onOpenSession:l,onEdit:u,onArchive:f}){let{setNodeRef:c}=wr({id:e});return(0,m.jsxs)("div",{className:"kf-column kf-"+e+(t?" kf-over":""),children:[(0,m.jsxs)("div",{className:"kf-column-head",children:[(0,m.jsx)("span",{className:"kf-column-dot"}),(0,m.jsx)("span",{className:"kf-column-title",children:Le[e]})]}),(0,m.jsxs)("div",{className:"kf-column-list",ref:c,children:[n&&(0,m.jsx)(is,{columnId:e,onAdd:a,onCancel:s}),r.length===0&&!n&&(0,m.jsx)("div",{className:"kf-column-empty",children:"No items"}),r.map(p=>(0,m.jsx)(os,{item:p,flash:o.has(p.id),lastActivity:i.get(p.id),onOpenSession:()=>l(p),onEdit:()=>u(p),onArchive:()=>f(p)},p.id))]})]})}function no(e){let{workspaceId:t,workspaceTitle:n,sessions:r,archiveSession:o}=e,[i,a]=(0,D.useState)(null),[s,l]=(0,D.useState)(""),[u,f]=(0,D.useState)([]),[c,p]=(0,D.useState)(null),[g,k]=(0,D.useState)(null),[h,b]=(0,D.useState)(!1),[w,x]=(0,D.useState)(!1),[y,R]=(0,D.useState)(null),[N,T]=(0,D.useState)(null),C=(0,D.useSyncExternalStore)(Wt,zt),[I,L]=(0,D.useState)(null),[F,B]=(0,D.useState)(new Set),Z=(0,D.useRef)(null),ne=Jn(Gn(He,{activationConstraint:{distance:6}})),V=(0,D.useCallback)(v=>{if(v&&v.board){let S={...v.board,activities:Array.isArray(v.board.activities)?v.board.activities:[]},M=Z.current;if(M){let q=new Set;for(let P of S.items){let Ie=M.get(P.id);Ie&&Ie!==P.columnId+"|"+P.name+"|"+P.description&&q.add(P.id)}q.size>0&&(B(q),window.setTimeout(()=>B(new Set),1500))}Z.current=new Map(S.items.map(q=>[q.id,q.columnId+"|"+q.name+"|"+q.description])),a(S),l(""),Dr(t,S)}v&&typeof v.error=="string"&&v.error&&l(v.error),Array.isArray(v&&v.warnings)&&v.warnings.length>0&&f(S=>[...S,...v.warnings])},[t]),Y=(0,D.useCallback)((v,S={})=>ke(v,S,t).then(V),[t,V]);(0,D.useEffect)(()=>{let v=!1,S=()=>ke("get",{},t).then(q=>{v||V(q)});S();let M=window.setInterval(S,3e3);return()=>{v=!0,window.clearInterval(M)}},[t,V]),(0,D.useEffect)(()=>{i&&!i.codeConfirmed&&!h&&b(!0)},[i&&i.codeConfirmed]);let Xe=(0,D.useCallback)(v=>{if(!v.sessionId||!r)return;let S=r.list?.getSnapshot?.()?.current;if(S!==void 0&&S===v.sessionId){Kt();return}r.open(v.sessionId)},[r]),re=v=>{let S=i?.items.find(M=>M.id===String(v.active.id));S&&R(S)},wt=v=>{let S=v.over?String(v.over.id):null;L(Mt.includes(S)?S:null)},ue=v=>{R(null);let{active:S,over:M}=v;if(!M||!i)return;let q=String(S.id),P=String(M.id),oe=Mt.includes(P)?P:i.items.find(ie=>ie.id===P)?.columnId;if(!oe)return;let Je=i.items.find(ie=>ie.id===q);!Je||Je.columnId===oe||Y("moveItem",{id:q,toColumn:oe})},Ge=v=>{c&&(c.item?Y("updateItem",{id:c.item.id,name:v.name,description:v.description}):Y("createItem",{name:v.name,description:v.description,columnId:c.columnId}),p(null))},yt=v=>{if(C){T(v);return}ae(v)},ae=v=>{Y("deleteItem",{id:v.id}),v.sessionId&&o&&o(v.sessionId)},ge=(0,D.useMemo)(()=>{let v=new Map;for(let S of i?.activities??[])S.itemId&&v.set(S.itemId,Ar(S));return v},[i]),Be=i&&(0,m.jsxs)("div",{className:"kf-header",children:[(0,m.jsxs)("span",{className:"kf-header-title",children:[(0,m.jsx)("span",{className:"kf-code-chip",children:i.code}),n||"Board"]}),(0,m.jsxs)("span",{className:"kf-count-chip",children:[i.items.length," items"]}),(0,m.jsxs)("button",{type:"button",className:"kf-btn kf-primary kf-new-item-btn",title:"New item (created in Backlog)","aria-label":"Create a new item in Backlog",onClick:()=>k("backlog"),children:[(0,m.jsx)(Ye,{path:es,size:15}),"New item"]}),(0,m.jsx)("span",{className:"kf-spacer"}),(0,m.jsx)("button",{type:"button",className:"kf-iconbtn",title:"Refresh","aria-label":"Refresh board",onClick:()=>Y("get"),children:(0,m.jsx)(Ye,{path:"M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6"})}),(0,m.jsx)("button",{type:"button",className:"kf-iconbtn",title:"Board settings","aria-label":"Board settings",onClick:()=>x(v=>!v),children:(0,m.jsx)(Ye,{path:ts})}),w&&(0,m.jsx)(Qr,{board:i,onCode:v=>Y("setCode",{code:v}).then(()=>b(!1)),onConfirmRequired:v=>Y("setConfirmRequired",{value:v}),onClose:()=>x(!1)})]}),kt=i&&(0,m.jsx)("div",{className:"kf-body",children:(0,m.jsx)("div",{className:"kf-columns",children:Mt.map(v=>{let S=(i.items??[]).filter(M=>M.columnId===v);return(0,m.jsx)(ss,{colId:v,highlighted:I===v&&y!==null,adding:g===v&&v==="backlog",items:S,flashIds:F,lastLines:ge,onAdd:(M,q)=>{Y("createItem",{name:M,description:q,columnId:"backlog"}),k(null)},onCancelAdd:()=>k(null),onOpenSession:Xe,onEdit:M=>p({item:M,columnId:M.columnId}),onArchive:yt},v)})})});return(0,m.jsxs)("div",{className:"kf-root",children:[u.length>0&&(0,m.jsxs)("div",{className:"kf-warning",children:[u.map((v,S)=>(0,m.jsx)("div",{children:v},S)),(0,m.jsx)("button",{type:"button",className:"kf-btn kf-ghost",onClick:()=>f([]),children:"Dismiss"})]}),Be,s&&(0,m.jsx)("div",{className:"kf-error kf-loading",children:s}),i?(0,m.jsxs)(mr,{sensors:ne,collisionDetection:Zi,onDragStart:re,onDragOver:wt,onDragEnd:ue,children:[kt,(0,m.jsx)(yr,{dropAnimation:{duration:220,easing:"cubic-bezier(0.2, 0, 0, 1)"},children:y?(0,m.jsxs)("div",{className:"kf-card kf-drag-ghost",style:{width:240,"--kf-card-accent":"var(--kf-accent, var(--dsw-alias-label-secondary))"},children:[(0,m.jsx)("div",{className:"kf-card-id",children:y.id}),(0,m.jsx)("div",{className:"kf-card-name",children:y.name})]}):null})]}):!s&&(0,m.jsx)("div",{className:"kf-loading",children:"Loading board\u2026"}),i&&c&&(0,m.jsx)(Jr,{item:c.item,board:i,onOpenChange:v=>{v||p(null)},onSave:Ge,onDelete:v=>{let S=i.items.find(M=>M.id===v);Y("deleteItem",{id:v}),S&&S.sessionId&&o&&o(S.sessionId),p(null)},onOpenSession:Xe}),N&&(0,m.jsx)(Gr,{item:N,onConfirm:()=>{ae(N),T(null)},onCancel:()=>T(null)}),i&&h&&(0,m.jsx)(Zr,{code:i.code,itemCount:i.items.length,onConfirm:v=>Y("setCode",{code:v}).then(()=>b(!1)),onDismiss:()=>b(!1)})]})}function as(e){let t={items:[]};return!e||!e.list||typeof e.list.getSnapshot!="function"?t:(0,W.useSyncExternalStore)(n=>e.list.subscribe(n),()=>e.list.getSnapshot())}function ls(e){if(!(!e||!e.list||typeof e.list.getSnapshot!="function"))return(0,W.useSyncExternalStore)(t=>e.list.subscribe(t),()=>e.list.getSnapshot().current)}function cs(e){let t=as(e.workspaces),n=(0,W.useSyncExternalStore)(Kr,qr),r=ls(e.sessions)??e.sessionId,o=Mr({override:n,currentSessionId:r,workspaceItems:Array.isArray(t.items)?t.items:[],recentWorkspaceId:t.recentWorkspaceId});(0,W.useEffect)(()=>{n&&o.nativeWorkspaceId===n.workspaceId&&ht(null)},[n,o.nativeWorkspaceId]);let i=e.workspaces?.archiveSession?a=>{e.workspaces.archiveSession(a)}:void 0;return(0,W.createElement)(no,{workspaceId:o.workspaceId,workspaceTitle:o.pinned?o.workspaceTitle||o.workspaceId:o.workspaceTitle,sessions:e.sessions,archiveSession:i})}function ds(){return(0,W.createElement)(eo)}function us(e){return(0,W.useEffect)(()=>{let t=e.sessions;t&&Cr({createSession:n=>t.create({workspaceId:n}),renameSession:async(n,r)=>{let i=await t.binding(n)?.session.rename(r);i&&i.ok===!1&&console.warn("dsh-kanban-flow: rename failed",i.error)},promptSession:async(n,r)=>{let o=t.binding(n);if(!o)throw new Error("session binding unavailable: "+n);let i=await o.session.prompt([{type:"text",text:r}],"queue");if(i&&i.ok===!1)throw new Error("prompt failed: "+(i.error&&i.error.message))},archiveSession:async n=>{let r=e.workspaces?.archiveSession;if(!r)throw new Error("workspaces.archiveSession unavailable");await r(n)}})},[e.sessions,e.workspaces]),(0,W.createElement)("div",{style:{display:"contents"}},(0,W.createElement)(Hr,{workspaces:e.workspaces,sessions:e.sessions}),(0,W.createElement)(jr,{workspaces:e.workspaces,sessions:e.sessions}),(0,W.createElement)($r),(0,W.createElement)(Xr,{workspaces:e.workspaces}),(0,W.createElement)(Vr,{workspaces:e.workspaces}),(0,W.createElement)(Yr,{workspaces:e.workspaces}))}var ro={name:"dsh-kanban-flow",inject:["slots"],apply(e){let t=e.get("slots");if(t===void 0)return;let n=e.get("workspaces"),r=e.get("sessions");t.inject("conversation.view",()=>t.register({name:"conversation.view",id:"kanban-flow",order:20,label:"Board"},o=>(0,W.createElement)(cs,{...o,workspaces:n,sessions:r}))),t.inject("settings.plugins.tab",()=>t.register({name:"settings.plugins.tab",id:"dsh-kanban-flow",order:10,label:"Kanban Flow"},()=>(0,W.createElement)(ds))),t.inject("sidebar.footer.action",()=>t.register({name:"sidebar.footer.action",id:"kanban-flow-controllers",order:90},()=>(0,W.createElement)(us,{workspaces:n,sessions:r})))}};try{console.info("[dsh-kanban-flow] client bundle loaded (build 2026-09-04T12:04:50.243Z)")}catch{}var oo="data-dsh-kanban-flow-style";if(typeof document<"u"&&!document.querySelector("style["+oo+"]")){let e=document.createElement("style");e.setAttribute(oo,""),e.textContent=Rn,document.head.appendChild(e)}var fs=ro;
    
    return module.exports
  },
})