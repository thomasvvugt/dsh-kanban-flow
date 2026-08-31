window.__ModuleLoader__.load({
  id: "dsh-kanban-flow",
  factory: function (require) {
    var module = { exports: {} }
    var exports = module.exports
    "use strict";var fo=Object.create;var Ct=Object.defineProperty;var po=Object.getOwnPropertyDescriptor;var go=Object.getOwnPropertyNames;var vo=Object.getPrototypeOf,ho=Object.prototype.hasOwnProperty;var mo=(e,t)=>{for(var n in t)Ct(e,n,{get:t[n],enumerable:!0})},Dn=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of go(t))!ho.call(e,o)&&o!==n&&Ct(e,o,{get:()=>t[o],enumerable:!(r=po(t,o))||r.enumerable});return e};var En=(e,t,n)=>(n=e!=null?fo(vo(e)):{},Dn(t||!e||!e.__esModule?Ct(n,"default",{value:e,enumerable:!0}):n,e)),bo=e=>Dn(Ct({},"__esModule",{value:!0}),e);var us={};mo(us,{default:()=>ds});module.exports=bo(us);var An=`/* dsh-kanban-flow client styles \u2014 kf-* namespace.
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
    `;var W=require("react");var T=require("react");var d=En(require("react")),Re=require("react-dom");var z=require("react");var tt=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function De(e){let t=Object.prototype.toString.call(e);return t==="[object Window]"||t==="[object global]"}function It(e){return"nodeType"in e}function _(e){var t,n;return e?De(e)?e:It(e)&&(t=(n=e.ownerDocument)==null?void 0:n.defaultView)!=null?t:window:window}function Dt(e){let{Document:t}=_(e);return e instanceof t}function $e(e){return De(e)?!1:e instanceof _(e).HTMLElement}function Yt(e){return e instanceof _(e).SVGElement}function Ee(e){return e?De(e)?e.document:It(e)?Dt(e)?e:$e(e)||Yt(e)?e.ownerDocument:document:document:document}var de=tt?z.useLayoutEffect:z.useEffect;function nt(e){let t=(0,z.useRef)(e);return de(()=>{t.current=e}),(0,z.useCallback)(function(){for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return t.current==null?void 0:t.current(...r)},[])}function Rn(){let e=(0,z.useRef)(null),t=(0,z.useCallback)((r,o)=>{e.current=setInterval(r,o)},[]),n=(0,z.useCallback)(()=>{e.current!==null&&(clearInterval(e.current),e.current=null)},[]);return[t,n]}function qe(e,t){t===void 0&&(t=[e]);let n=(0,z.useRef)(e);return de(()=>{n.current!==e&&(n.current=e)},t),n}function Ke(e,t){let n=(0,z.useRef)();return(0,z.useMemo)(()=>{let r=e(n.current);return n.current=r,r},[...t])}function rt(e){let t=nt(e),n=(0,z.useRef)(null),r=(0,z.useCallback)(o=>{o!==n.current&&t?.(o,n.current),n.current=o},[]);return[n,r]}function ot(e){let t=(0,z.useRef)();return(0,z.useEffect)(()=>{t.current=e},[e]),t.current}var Vt={};function it(e,t){return(0,z.useMemo)(()=>{if(t)return t;let n=Vt[e]==null?0:Vt[e]+1;return Vt[e]=n,e+"-"+n},[e,t])}function Tn(e){return function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return r.reduce((i,a)=>{let s=Object.entries(a);for(let[l,u]of s){let f=i[l];f!=null&&(i[l]=f+e*u)}return i},{...t})}}var Ae=Tn(1),st=Tn(-1);function yo(e){return"clientX"in e&&"clientY"in e}function Et(e){if(!e)return!1;let{KeyboardEvent:t}=_(e.target);return t&&e instanceof t}function ko(e){if(!e)return!1;let{TouchEvent:t}=_(e.target);return t&&e instanceof t}function at(e){if(ko(e)){if(e.touches&&e.touches.length){let{clientX:t,clientY:n}=e.touches[0];return{x:t,y:n}}else if(e.changedTouches&&e.changedTouches.length){let{clientX:t,clientY:n}=e.changedTouches[0];return{x:t,y:n}}}return yo(e)?{x:e.clientX,y:e.clientY}:null}var Fe=Object.freeze({Translate:{toString(e){if(!e)return;let{x:t,y:n}=e;return"translate3d("+(t?Math.round(t):0)+"px, "+(n?Math.round(n):0)+"px, 0)"}},Scale:{toString(e){if(!e)return;let{scaleX:t,scaleY:n}=e;return"scaleX("+t+") scaleY("+n+")"}},Transform:{toString(e){if(e)return[Fe.Translate.toString(e),Fe.Scale.toString(e)].join(" ")}},Transition:{toString(e){let{property:t,duration:n,easing:r}=e;return t+" "+n+"ms "+r}}}),Nn="a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]";function On(e){return e.matches(Nn)?e:e.querySelector(Nn)}var Ne=En(require("react")),xo={display:"none"};function Ln(e){let{id:t,value:n}=e;return Ne.default.createElement("div",{id:t,style:xo},n)}function Bn(e){let{id:t,announcement:n,ariaLiveType:r="assertive"}=e,o={position:"fixed",top:0,left:0,width:1,height:1,margin:-1,border:0,padding:0,overflow:"hidden",clip:"rect(0 0 0 0)",clipPath:"inset(100%)",whiteSpace:"nowrap"};return Ne.default.createElement("div",{id:t,style:o,role:"status","aria-live":r,"aria-atomic":!0},n)}function Mn(){let[e,t]=(0,Ne.useState)("");return{announce:(0,Ne.useCallback)(r=>{r!=null&&t(r)},[]),announcement:e}}var Vn=(0,d.createContext)(null);function So(e){let t=(0,d.useContext)(Vn);(0,d.useEffect)(()=>{if(!t)throw new Error("useDndMonitor must be used within a children of <DndContext>");return t(e)},[e,t])}function Co(){let[e]=(0,d.useState)(()=>new Set),t=(0,d.useCallback)(r=>(e.add(r),()=>e.delete(r)),[e]);return[(0,d.useCallback)(r=>{let{type:o,event:i}=r;e.forEach(a=>{var s;return(s=a[o])==null?void 0:s.call(a,i)})},[e]),t]}var Io={draggable:`
        To pick up a draggable item, press the space bar.
        While dragging, use the arrow keys to move the item.
        Press space again to drop the item in its new position, or press escape to cancel.
      `},Do={onDragStart(e){let{active:t}=e;return"Picked up draggable item "+t.id+"."},onDragOver(e){let{active:t,over:n}=e;return n?"Draggable item "+t.id+" was moved over droppable area "+n.id+".":"Draggable item "+t.id+" is no longer over a droppable area."},onDragEnd(e){let{active:t,over:n}=e;return n?"Draggable item "+t.id+" was dropped over droppable area "+n.id:"Draggable item "+t.id+" was dropped."},onDragCancel(e){let{active:t}=e;return"Dragging was cancelled. Draggable item "+t.id+" was dropped."}};function Eo(e){let{announcements:t=Do,container:n,hiddenTextDescribedById:r,screenReaderInstructions:o=Io}=e,{announce:i,announcement:a}=Mn(),s=it("DndLiveRegion"),[l,u]=(0,d.useState)(!1);if((0,d.useEffect)(()=>{u(!0)},[]),So((0,d.useMemo)(()=>({onDragStart(c){let{active:p}=c;i(t.onDragStart({active:p}))},onDragMove(c){let{active:p,over:g}=c;t.onDragMove&&i(t.onDragMove({active:p,over:g}))},onDragOver(c){let{active:p,over:g}=c;i(t.onDragOver({active:p,over:g}))},onDragEnd(c){let{active:p,over:g}=c;i(t.onDragEnd({active:p,over:g}))},onDragCancel(c){let{active:p,over:g}=c;i(t.onDragCancel({active:p,over:g}))}}),[i,t])),!l)return null;let f=d.default.createElement(d.default.Fragment,null,d.default.createElement(Ln,{id:r,value:o.draggable}),d.default.createElement(Bn,{id:s,announcement:a}));return n?(0,Re.createPortal)(f,n):f}var $;(function(e){e.DragStart="dragStart",e.DragMove="dragMove",e.DragEnd="dragEnd",e.DragCancel="dragCancel",e.DragOver="dragOver",e.RegisterDroppable="registerDroppable",e.SetDroppableDisabled="setDroppableDisabled",e.UnregisterDroppable="unregisterDroppable"})($||($={}));function Nt(){}function Yn(e,t){return(0,d.useMemo)(()=>({sensor:e,options:t??{}}),[e,t])}function Xn(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return(0,d.useMemo)(()=>[...t].filter(r=>r!=null),[...t])}var se=Object.freeze({x:0,y:0});function Gn(e,t){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))}function Ao(e,t){let n=at(e);if(!n)return"0 0";let r={x:(n.x-t.left)/t.width*100,y:(n.y-t.top)/t.height*100};return r.x+"% "+r.y+"%"}function Jn(e,t){let{data:{value:n}}=e,{data:{value:r}}=t;return n-r}function No(e,t){let{data:{value:n}}=e,{data:{value:r}}=t;return r-n}function Zt(e){let{left:t,top:n,height:r,width:o}=e;return[{x:t,y:n},{x:t+o,y:n},{x:t,y:n+r},{x:t+o,y:n+r}]}function Ro(e,t){if(!e||e.length===0)return null;let[n]=e;return t?n[t]:n}var Zn=e=>{let{collisionRect:t,droppableRects:n,droppableContainers:r}=e,o=Zt(t),i=[];for(let a of r){let{id:s}=a,l=n.get(s);if(l){let u=Zt(l),f=o.reduce((p,g,y)=>p+Gn(u[y],g),0),c=Number((f/4).toFixed(4));i.push({id:s,data:{droppableContainer:a,value:c}})}}return i.sort(Jn)};function To(e,t){let n=Math.max(t.top,e.top),r=Math.max(t.left,e.left),o=Math.min(t.left+t.width,e.left+e.width),i=Math.min(t.top+t.height,e.top+e.height),a=o-r,s=i-n;if(r<o&&n<i){let l=t.width*t.height,u=e.width*e.height,f=a*s,c=f/(l+u-f);return Number(c.toFixed(4))}return 0}var on=e=>{let{collisionRect:t,droppableRects:n,droppableContainers:r}=e,o=[];for(let i of r){let{id:a}=i,s=n.get(a);if(s){let l=To(s,t);l>0&&o.push({id:a,data:{droppableContainer:i,value:l}})}}return o.sort(No)};function Oo(e,t){let{top:n,left:r,bottom:o,right:i}=t;return n<=e.y&&e.y<=o&&r<=e.x&&e.x<=i}var Qn=e=>{let{droppableContainers:t,droppableRects:n,pointerCoordinates:r}=e;if(!r)return[];let o=[];for(let i of t){let{id:a}=i,s=n.get(a);if(s&&Oo(r,s)){let u=Zt(s).reduce((c,p)=>c+Gn(r,p),0),f=Number((u/4).toFixed(4));o.push({id:a,data:{droppableContainer:i,value:f}})}}return o.sort(Jn)};function Lo(e,t,n){return{...e,scaleX:t&&n?t.width/n.width:1,scaleY:t&&n?t.height/n.height:1}}function er(e,t){return e&&t?{x:e.left-t.left,y:e.top-t.top}:se}function Bo(e){return function(n){for(var r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return o.reduce((a,s)=>({...a,top:a.top+e*s.y,bottom:a.bottom+e*s.y,left:a.left+e*s.x,right:a.right+e*s.x}),{...n})}}var Mo=Bo(1);function tr(e){if(e.startsWith("matrix3d(")){let t=e.slice(9,-1).split(/, /);return{x:+t[12],y:+t[13],scaleX:+t[0],scaleY:+t[5]}}else if(e.startsWith("matrix(")){let t=e.slice(7,-1).split(/, /);return{x:+t[4],y:+t[5],scaleX:+t[0],scaleY:+t[3]}}return null}function Po(e,t,n){let r=tr(t);if(!r)return e;let{scaleX:o,scaleY:i,x:a,y:s}=r,l=e.left-a-(1-o)*parseFloat(n),u=e.top-s-(1-i)*parseFloat(n.slice(n.indexOf(" ")+1)),f=o?e.width/o:e.width,c=i?e.height/i:e.height;return{width:f,height:c,top:u,right:l+f,bottom:u+c,left:l}}var zo={ignoreTransform:!1};function ft(e,t){t===void 0&&(t=zo);let n=e.getBoundingClientRect();if(t.ignoreTransform){let{transform:u,transformOrigin:f}=_(e).getComputedStyle(e);u&&(n=Po(n,u,f))}let{top:r,left:o,width:i,height:a,bottom:s,right:l}=n;return{top:r,left:o,width:i,height:a,bottom:s,right:l}}function Pn(e){return ft(e,{ignoreTransform:!0})}function Wo(e){let t=e.innerWidth,n=e.innerHeight;return{top:0,left:0,right:t,bottom:n,width:t,height:n}}function Fo(e,t){return t===void 0&&(t=_(e).getComputedStyle(e)),t.position==="fixed"}function $o(e,t){t===void 0&&(t=_(e).getComputedStyle(e));let n=/(auto|scroll|overlay)/;return["overflow","overflowX","overflowY"].some(o=>{let i=t[o];return typeof i=="string"?n.test(i):!1})}function sn(e,t){let n=[];function r(o){if(t!=null&&n.length>=t||!o)return n;if(Dt(o)&&o.scrollingElement!=null&&!n.includes(o.scrollingElement))return n.push(o.scrollingElement),n;if(!$e(o)||Yt(o)||n.includes(o))return n;let i=_(e).getComputedStyle(o);return o!==e&&$o(o,i)&&n.push(o),Fo(o,i)?n:r(o.parentNode)}return e?r(e):n}function nr(e){let[t]=sn(e,1);return t??null}function Xt(e){return!tt||!e?null:De(e)?e:It(e)?Dt(e)||e===Ee(e).scrollingElement?window:$e(e)?e:null:null}function rr(e){return De(e)?e.scrollX:e.scrollLeft}function or(e){return De(e)?e.scrollY:e.scrollTop}function Qt(e){return{x:rr(e),y:or(e)}}var K;(function(e){e[e.Forward=1]="Forward",e[e.Backward=-1]="Backward"})(K||(K={}));function ir(e){return!tt||!e?!1:e===document.scrollingElement}function sr(e){let t={x:0,y:0},n=ir(e)?{height:window.innerHeight,width:window.innerWidth}:{height:e.clientHeight,width:e.clientWidth},r={x:e.scrollWidth-n.width,y:e.scrollHeight-n.height},o=e.scrollTop<=t.y,i=e.scrollLeft<=t.x,a=e.scrollTop>=r.y,s=e.scrollLeft>=r.x;return{isTop:o,isLeft:i,isBottom:a,isRight:s,maxScroll:r,minScroll:t}}var qo={x:.2,y:.2};function Ko(e,t,n,r,o){let{top:i,left:a,right:s,bottom:l}=n;r===void 0&&(r=10),o===void 0&&(o=qo);let{isTop:u,isBottom:f,isLeft:c,isRight:p}=sr(e),g={x:0,y:0},y={x:0,y:0},h={height:t.height*o.y,width:t.width*o.x};return!u&&i<=t.top+h.height?(g.y=K.Backward,y.y=r*Math.abs((t.top+h.height-i)/h.height)):!f&&l>=t.bottom-h.height&&(g.y=K.Forward,y.y=r*Math.abs((t.bottom-h.height-l)/h.height)),!p&&s>=t.right-h.width?(g.x=K.Forward,y.x=r*Math.abs((t.right-h.width-s)/h.width)):!c&&a<=t.left+h.width&&(g.x=K.Backward,y.x=r*Math.abs((t.left+h.width-a)/h.width)),{direction:g,speed:y}}function Ho(e){if(e===document.scrollingElement){let{innerWidth:i,innerHeight:a}=window;return{top:0,left:0,right:i,bottom:a,width:i,height:a}}let{top:t,left:n,right:r,bottom:o}=e.getBoundingClientRect();return{top:t,left:n,right:r,bottom:o,width:e.clientWidth,height:e.clientHeight}}function ar(e){return e.reduce((t,n)=>Ae(t,Qt(n)),se)}function jo(e){return e.reduce((t,n)=>t+rr(n),0)}function _o(e){return e.reduce((t,n)=>t+or(n),0)}function lr(e,t){if(t===void 0&&(t=ft),!e)return;let{top:n,left:r,bottom:o,right:i}=t(e);nr(e)&&(o<=0||i<=0||n>=window.innerHeight||r>=window.innerWidth)&&e.scrollIntoView({block:"center",inline:"center"})}var Uo=[["x",["left","right"],jo],["y",["top","bottom"],_o]],ct=class{constructor(t,n){this.rect=void 0,this.width=void 0,this.height=void 0,this.top=void 0,this.bottom=void 0,this.right=void 0,this.left=void 0;let r=sn(n),o=ar(r);this.rect={...t},this.width=t.width,this.height=t.height;for(let[i,a,s]of Uo)for(let l of a)Object.defineProperty(this,l,{get:()=>{let u=s(r),f=o[i]-u;return this.rect[l]+f},enumerable:!0});Object.defineProperty(this,"rect",{enumerable:!1})}},Te=class{constructor(t){this.target=void 0,this.listeners=[],this.removeAll=()=>{this.listeners.forEach(n=>{var r;return(r=this.target)==null?void 0:r.removeEventListener(...n)})},this.target=t}add(t,n,r){var o;(o=this.target)==null||o.addEventListener(t,n,r),this.listeners.push([t,n,r])}};function Vo(e){let{EventTarget:t}=_(e);return e instanceof t?e:Ee(e)}function Gt(e,t){let n=Math.abs(e.x),r=Math.abs(e.y);return typeof t=="number"?Math.sqrt(n**2+r**2)>t:"x"in t&&"y"in t?n>t.x&&r>t.y:"x"in t?n>t.x:"y"in t?r>t.y:!1}var ee;(function(e){e.Click="click",e.DragStart="dragstart",e.Keydown="keydown",e.ContextMenu="contextmenu",e.Resize="resize",e.SelectionChange="selectionchange",e.VisibilityChange="visibilitychange"})(ee||(ee={}));function zn(e){e.preventDefault()}function Yo(e){e.stopPropagation()}var R;(function(e){e.Space="Space",e.Down="ArrowDown",e.Right="ArrowRight",e.Left="ArrowLeft",e.Up="ArrowUp",e.Esc="Escape",e.Enter="Enter",e.Tab="Tab"})(R||(R={}));var cr={start:[R.Space,R.Enter],cancel:[R.Esc],end:[R.Space,R.Enter,R.Tab]},Xo=(e,t)=>{let{currentCoordinates:n}=t;switch(e.code){case R.Right:return{...n,x:n.x+25};case R.Left:return{...n,x:n.x-25};case R.Down:return{...n,y:n.y+25};case R.Up:return{...n,y:n.y-25}}},Rt=class{constructor(t){this.props=void 0,this.autoScrollEnabled=!1,this.referenceCoordinates=void 0,this.listeners=void 0,this.windowListeners=void 0,this.props=t;let{event:{target:n}}=t;this.props=t,this.listeners=new Te(Ee(n)),this.windowListeners=new Te(_(n)),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleCancel=this.handleCancel.bind(this),this.attach()}attach(){this.handleStart(),this.windowListeners.add(ee.Resize,this.handleCancel),this.windowListeners.add(ee.VisibilityChange,this.handleCancel),setTimeout(()=>this.listeners.add(ee.Keydown,this.handleKeyDown))}handleStart(){let{activeNode:t,onStart:n}=this.props,r=t.node.current;r&&lr(r),n(se)}handleKeyDown(t){if(Et(t)){let{active:n,context:r,options:o}=this.props,{keyboardCodes:i=cr,coordinateGetter:a=Xo,scrollBehavior:s="smooth"}=o,{code:l}=t;if(i.end.includes(l)){this.handleEnd(t);return}if(i.cancel.includes(l)){this.handleCancel(t);return}let{collisionRect:u}=r.current,f=u?{x:u.left,y:u.top}:se;this.referenceCoordinates||(this.referenceCoordinates=f);let c=a(t,{active:n,context:r.current,currentCoordinates:f});if(c){let p=st(c,f),g={x:0,y:0},{scrollableAncestors:y}=r.current;for(let h of y){let b=t.code,{isTop:w,isRight:k,isLeft:x,isBottom:O,maxScroll:D,minScroll:N}=sr(h),C=Ho(h),I={x:Math.min(b===R.Right?C.right-C.width/2:C.right,Math.max(b===R.Right?C.left:C.left+C.width/2,c.x)),y:Math.min(b===R.Down?C.bottom-C.height/2:C.bottom,Math.max(b===R.Down?C.top:C.top+C.height/2,c.y))},L=b===R.Right&&!k||b===R.Left&&!x,F=b===R.Down&&!O||b===R.Up&&!w;if(L&&I.x!==c.x){let B=h.scrollLeft+p.x,Z=b===R.Right&&B<=D.x||b===R.Left&&B>=N.x;if(Z&&!p.y){h.scrollTo({left:B,behavior:s});return}Z?g.x=h.scrollLeft-B:g.x=b===R.Right?h.scrollLeft-D.x:h.scrollLeft-N.x,g.x&&h.scrollBy({left:-g.x,behavior:s});break}else if(F&&I.y!==c.y){let B=h.scrollTop+p.y,Z=b===R.Down&&B<=D.y||b===R.Up&&B>=N.y;if(Z&&!p.x){h.scrollTo({top:B,behavior:s});return}Z?g.y=h.scrollTop-B:g.y=b===R.Down?h.scrollTop-D.y:h.scrollTop-N.y,g.y&&h.scrollBy({top:-g.y,behavior:s});break}}this.handleMove(t,Ae(st(c,this.referenceCoordinates),g))}}}handleMove(t,n){let{onMove:r}=this.props;t.preventDefault(),r(n)}handleEnd(t){let{onEnd:n}=this.props;t.preventDefault(),this.detach(),n()}handleCancel(t){let{onCancel:n}=this.props;t.preventDefault(),this.detach(),n()}detach(){this.listeners.removeAll(),this.windowListeners.removeAll()}};Rt.activators=[{eventName:"onKeyDown",handler:(e,t,n)=>{let{keyboardCodes:r=cr,onActivation:o}=t,{active:i}=n,{code:a}=e.nativeEvent;if(r.start.includes(a)){let s=i.activatorNode.current;return s&&e.target!==s?!1:(e.preventDefault(),o?.({event:e.nativeEvent}),!0)}return!1}}];function Wn(e){return!!(e&&"distance"in e)}function Fn(e){return!!(e&&"delay"in e)}var dt=class{constructor(t,n,r){var o;r===void 0&&(r=Vo(t.event.target)),this.props=void 0,this.events=void 0,this.autoScrollEnabled=!0,this.document=void 0,this.activated=!1,this.initialCoordinates=void 0,this.timeoutId=null,this.listeners=void 0,this.documentListeners=void 0,this.windowListeners=void 0,this.props=t,this.events=n;let{event:i}=t,{target:a}=i;this.props=t,this.events=n,this.document=Ee(a),this.documentListeners=new Te(this.document),this.listeners=new Te(r),this.windowListeners=new Te(_(a)),this.initialCoordinates=(o=at(i))!=null?o:se,this.handleStart=this.handleStart.bind(this),this.handleMove=this.handleMove.bind(this),this.handleEnd=this.handleEnd.bind(this),this.handleCancel=this.handleCancel.bind(this),this.handleKeydown=this.handleKeydown.bind(this),this.removeTextSelection=this.removeTextSelection.bind(this),this.attach()}attach(){let{events:t,props:{options:{activationConstraint:n,bypassActivationConstraint:r}}}=this;if(this.listeners.add(t.move.name,this.handleMove,{passive:!1}),this.listeners.add(t.end.name,this.handleEnd),t.cancel&&this.listeners.add(t.cancel.name,this.handleCancel),this.windowListeners.add(ee.Resize,this.handleCancel),this.windowListeners.add(ee.DragStart,zn),this.windowListeners.add(ee.VisibilityChange,this.handleCancel),this.windowListeners.add(ee.ContextMenu,zn),this.documentListeners.add(ee.Keydown,this.handleKeydown),n){if(r!=null&&r({event:this.props.event,activeNode:this.props.activeNode,options:this.props.options}))return this.handleStart();if(Fn(n)){this.timeoutId=setTimeout(this.handleStart,n.delay),this.handlePending(n);return}if(Wn(n)){this.handlePending(n);return}}this.handleStart()}detach(){this.listeners.removeAll(),this.windowListeners.removeAll(),setTimeout(this.documentListeners.removeAll,50),this.timeoutId!==null&&(clearTimeout(this.timeoutId),this.timeoutId=null)}handlePending(t,n){let{active:r,onPending:o}=this.props;o(r,t,this.initialCoordinates,n)}handleStart(){let{initialCoordinates:t}=this,{onStart:n}=this.props;t&&(this.activated=!0,this.documentListeners.add(ee.Click,Yo,{capture:!0}),this.removeTextSelection(),this.documentListeners.add(ee.SelectionChange,this.removeTextSelection),n(t))}handleMove(t){var n;let{activated:r,initialCoordinates:o,props:i}=this,{onMove:a,options:{activationConstraint:s}}=i;if(!o)return;let l=(n=at(t))!=null?n:se,u=st(o,l);if(!r&&s){if(Wn(s)){if(s.tolerance!=null&&Gt(u,s.tolerance))return this.handleCancel();if(Gt(u,s.distance))return this.handleStart()}if(Fn(s)&&Gt(u,s.tolerance))return this.handleCancel();this.handlePending(s,u);return}t.cancelable&&t.preventDefault(),a(l)}handleEnd(){let{onAbort:t,onEnd:n}=this.props;this.detach(),this.activated||t(this.props.active),n()}handleCancel(){let{onAbort:t,onCancel:n}=this.props;this.detach(),this.activated||t(this.props.active),n()}handleKeydown(t){t.code===R.Esc&&this.handleCancel()}removeTextSelection(){var t;(t=this.document.getSelection())==null||t.removeAllRanges()}},Go={cancel:{name:"pointercancel"},move:{name:"pointermove"},end:{name:"pointerup"}},He=class extends dt{constructor(t){let{event:n}=t,r=Ee(n.target);super(t,Go,r)}};He.activators=[{eventName:"onPointerDown",handler:(e,t)=>{let{nativeEvent:n}=e,{onActivation:r}=t;return!n.isPrimary||n.button!==0?!1:(r?.({event:n}),!0)}}];var Jo={move:{name:"mousemove"},end:{name:"mouseup"}},en;(function(e){e[e.RightClick=2]="RightClick"})(en||(en={}));var tn=class extends dt{constructor(t){super(t,Jo,Ee(t.event.target))}};tn.activators=[{eventName:"onMouseDown",handler:(e,t)=>{let{nativeEvent:n}=e,{onActivation:r}=t;return n.button===en.RightClick?!1:(r?.({event:n}),!0)}}];var Jt={cancel:{name:"touchcancel"},move:{name:"touchmove"},end:{name:"touchend"}},nn=class extends dt{constructor(t){super(t,Jt)}static setup(){return window.addEventListener(Jt.move.name,t,{capture:!1,passive:!1}),function(){window.removeEventListener(Jt.move.name,t)};function t(){}}};nn.activators=[{eventName:"onTouchStart",handler:(e,t)=>{let{nativeEvent:n}=e,{onActivation:r}=t,{touches:o}=n;return o.length>1?!1:(r?.({event:n}),!0)}}];var lt;(function(e){e[e.Pointer=0]="Pointer",e[e.DraggableRect=1]="DraggableRect"})(lt||(lt={}));var Tt;(function(e){e[e.TreeOrder=0]="TreeOrder",e[e.ReversedTreeOrder=1]="ReversedTreeOrder"})(Tt||(Tt={}));function Zo(e){let{acceleration:t,activator:n=lt.Pointer,canScroll:r,draggingRect:o,enabled:i,interval:a=5,order:s=Tt.TreeOrder,pointerCoordinates:l,scrollableAncestors:u,scrollableAncestorRects:f,delta:c,threshold:p}=e,g=ei({delta:c,disabled:!i}),[y,h]=Rn(),b=(0,d.useRef)({x:0,y:0}),w=(0,d.useRef)({x:0,y:0}),k=(0,d.useMemo)(()=>{switch(n){case lt.Pointer:return l?{top:l.y,bottom:l.y,left:l.x,right:l.x}:null;case lt.DraggableRect:return o}},[n,o,l]),x=(0,d.useRef)(null),O=(0,d.useCallback)(()=>{let N=x.current;if(!N)return;let C=b.current.x*w.current.x,I=b.current.y*w.current.y;N.scrollBy(C,I)},[]),D=(0,d.useMemo)(()=>s===Tt.TreeOrder?[...u].reverse():u,[s,u]);(0,d.useEffect)(()=>{if(!i||!u.length||!k){h();return}for(let N of D){if(r?.(N)===!1)continue;let C=u.indexOf(N),I=f[C];if(!I)continue;let{direction:L,speed:F}=Ko(N,I,k,t,p);for(let B of["x","y"])g[B][L[B]]||(F[B]=0,L[B]=0);if(F.x>0||F.y>0){h(),x.current=N,y(O,a),b.current=F,w.current=L;return}}b.current={x:0,y:0},w.current={x:0,y:0},h()},[t,O,r,h,i,a,JSON.stringify(k),JSON.stringify(g),y,u,D,f,JSON.stringify(p)])}var Qo={x:{[K.Backward]:!1,[K.Forward]:!1},y:{[K.Backward]:!1,[K.Forward]:!1}};function ei(e){let{delta:t,disabled:n}=e,r=ot(t);return Ke(o=>{if(n||!r||!o)return Qo;let i={x:Math.sign(t.x-r.x),y:Math.sign(t.y-r.y)};return{x:{[K.Backward]:o.x[K.Backward]||i.x===-1,[K.Forward]:o.x[K.Forward]||i.x===1},y:{[K.Backward]:o.y[K.Backward]||i.y===-1,[K.Forward]:o.y[K.Forward]||i.y===1}}},[n,t,r])}function ti(e,t){let n=t!=null?e.get(t):void 0,r=n?n.node.current:null;return Ke(o=>{var i;return t==null?null:(i=r??o)!=null?i:null},[r,t])}function ni(e,t){return(0,d.useMemo)(()=>e.reduce((n,r)=>{let{sensor:o}=r,i=o.activators.map(a=>({eventName:a.eventName,handler:t(a.handler,r)}));return[...n,...i]},[]),[e,t])}var ut;(function(e){e[e.Always=0]="Always",e[e.BeforeDragging=1]="BeforeDragging",e[e.WhileDragging=2]="WhileDragging"})(ut||(ut={}));var rn;(function(e){e.Optimized="optimized"})(rn||(rn={}));var $n=new Map;function ri(e,t){let{dragging:n,dependencies:r,config:o}=t,[i,a]=(0,d.useState)(null),{frequency:s,measure:l,strategy:u}=o,f=(0,d.useRef)(e),c=b(),p=qe(c),g=(0,d.useCallback)(function(w){w===void 0&&(w=[]),!p.current&&a(k=>k===null?w:k.concat(w.filter(x=>!k.includes(x))))},[p]),y=(0,d.useRef)(null),h=Ke(w=>{if(c&&!n)return $n;if(!w||w===$n||f.current!==e||i!=null){let k=new Map;for(let x of e){if(!x)continue;if(i&&i.length>0&&!i.includes(x.id)&&x.rect.current){k.set(x.id,x.rect.current);continue}let O=x.node.current,D=O?new ct(l(O),O):null;x.rect.current=D,D&&k.set(x.id,D)}return k}return w},[e,i,n,c,l]);return(0,d.useEffect)(()=>{f.current=e},[e]),(0,d.useEffect)(()=>{c||g()},[n,c]),(0,d.useEffect)(()=>{i&&i.length>0&&a(null)},[JSON.stringify(i)]),(0,d.useEffect)(()=>{c||typeof s!="number"||y.current!==null||(y.current=setTimeout(()=>{g(),y.current=null},s))},[s,c,g,...r]),{droppableRects:h,measureDroppableContainers:g,measuringScheduled:i!=null};function b(){switch(u){case ut.Always:return!1;case ut.BeforeDragging:return n;default:return!n}}}function an(e,t){return Ke(n=>e?n||(typeof t=="function"?t(e):e):null,[t,e])}function oi(e,t){return an(e,t)}function ii(e){let{callback:t,disabled:n}=e,r=nt(t),o=(0,d.useMemo)(()=>{if(n||typeof window>"u"||typeof window.MutationObserver>"u")return;let{MutationObserver:i}=window;return new i(r)},[r,n]);return(0,d.useEffect)(()=>()=>o?.disconnect(),[o]),o}function Ot(e){let{callback:t,disabled:n}=e,r=nt(t),o=(0,d.useMemo)(()=>{if(n||typeof window>"u"||typeof window.ResizeObserver>"u")return;let{ResizeObserver:i}=window;return new i(r)},[n]);return(0,d.useEffect)(()=>()=>o?.disconnect(),[o]),o}function si(e){return new ct(ft(e),e)}function qn(e,t,n){t===void 0&&(t=si);let[r,o]=(0,d.useState)(null);function i(){o(l=>{if(!e)return null;if(e.isConnected===!1){var u;return(u=l??n)!=null?u:null}let f=t(e);return JSON.stringify(l)===JSON.stringify(f)?l:f})}let a=ii({callback(l){if(e)for(let u of l){let{type:f,target:c}=u;if(f==="childList"&&c instanceof HTMLElement&&c.contains(e)){i();break}}}}),s=Ot({callback:i});return de(()=>{i(),e?(s?.observe(e),a?.observe(document.body,{childList:!0,subtree:!0})):(s?.disconnect(),a?.disconnect())},[e]),r}function ai(e){let t=an(e);return er(e,t)}var Kn=[];function li(e){let t=(0,d.useRef)(e),n=Ke(r=>e?r&&r!==Kn&&e&&t.current&&e.parentNode===t.current.parentNode?r:sn(e):Kn,[e]);return(0,d.useEffect)(()=>{t.current=e},[e]),n}function ci(e){let[t,n]=(0,d.useState)(null),r=(0,d.useRef)(e),o=(0,d.useCallback)(i=>{let a=Xt(i.target);a&&n(s=>s?(s.set(a,Qt(a)),new Map(s)):null)},[]);return(0,d.useEffect)(()=>{let i=r.current;if(e!==i){a(i);let s=e.map(l=>{let u=Xt(l);return u?(u.addEventListener("scroll",o,{passive:!0}),[u,Qt(u)]):null}).filter(l=>l!=null);n(s.length?new Map(s):null),r.current=e}return()=>{a(e),a(i)};function a(s){s.forEach(l=>{let u=Xt(l);u?.removeEventListener("scroll",o)})}},[o,e]),(0,d.useMemo)(()=>e.length?t?Array.from(t.values()).reduce((i,a)=>Ae(i,a),se):ar(e):se,[e,t])}function Hn(e,t){t===void 0&&(t=[]);let n=(0,d.useRef)(null);return(0,d.useEffect)(()=>{n.current=null},t),(0,d.useEffect)(()=>{let r=e!==se;r&&!n.current&&(n.current=e),!r&&n.current&&(n.current=null)},[e]),n.current?st(e,n.current):se}function di(e){(0,d.useEffect)(()=>{if(!tt)return;let t=e.map(n=>{let{sensor:r}=n;return r.setup==null?void 0:r.setup()});return()=>{for(let n of t)n?.()}},e.map(t=>{let{sensor:n}=t;return n}))}function ui(e,t){return(0,d.useMemo)(()=>e.reduce((n,r)=>{let{eventName:o,handler:i}=r;return n[o]=a=>{i(a,t)},n},{}),[e,t])}function dr(e){return(0,d.useMemo)(()=>e?Wo(e):null,[e])}var jn=[];function fi(e,t){t===void 0&&(t=ft);let[n]=e,r=dr(n?_(n):null),[o,i]=(0,d.useState)(jn);function a(){i(()=>e.length?e.map(l=>ir(l)?r:new ct(t(l),l)):jn)}let s=Ot({callback:a});return de(()=>{s?.disconnect(),a(),e.forEach(l=>s?.observe(l))},[e]),o}function ur(e){if(!e)return null;if(e.children.length>1)return e;let t=e.children[0];return $e(t)?t:e}function pi(e){let{measure:t}=e,[n,r]=(0,d.useState)(null),o=(0,d.useCallback)(u=>{for(let{target:f}of u)if($e(f)){r(c=>{let p=t(f);return c?{...c,width:p.width,height:p.height}:p});break}},[t]),i=Ot({callback:o}),a=(0,d.useCallback)(u=>{let f=ur(u);i?.disconnect(),f&&i?.observe(f),r(f?t(f):null)},[t,i]),[s,l]=rt(a);return(0,d.useMemo)(()=>({nodeRef:s,rect:n,setRef:l}),[n,s,l])}var gi=[{sensor:He,options:{}},{sensor:Rt,options:{}}],vi={current:{}},At={draggable:{measure:Pn},droppable:{measure:Pn,strategy:ut.WhileDragging,frequency:rn.Optimized},dragOverlay:{measure:ft}},Oe=class extends Map{get(t){var n;return t!=null&&(n=super.get(t))!=null?n:void 0}toArray(){return Array.from(this.values())}getEnabled(){return this.toArray().filter(t=>{let{disabled:n}=t;return!n})}getNodeFor(t){var n,r;return(n=(r=this.get(t))==null?void 0:r.node.current)!=null?n:void 0}},hi={activatorEvent:null,active:null,activeNode:null,activeNodeRect:null,collisions:null,containerNodeRect:null,draggableNodes:new Map,droppableRects:new Map,droppableContainers:new Oe,over:null,dragOverlay:{nodeRef:{current:null},rect:null,setRef:Nt},scrollableAncestors:[],scrollableAncestorRects:[],measuringConfiguration:At,measureDroppableContainers:Nt,windowRect:null,measuringScheduled:!1},fr={activatorEvent:null,activators:[],active:null,activeNodeRect:null,ariaDescribedById:{draggable:""},dispatch:Nt,draggableNodes:new Map,over:null,measureDroppableContainers:Nt},pt=(0,d.createContext)(fr),pr=(0,d.createContext)(hi);function mi(){return{draggable:{active:null,initialCoordinates:{x:0,y:0},nodes:new Map,translate:{x:0,y:0}},droppable:{containers:new Oe}}}function bi(e,t){switch(t.type){case $.DragStart:return{...e,draggable:{...e.draggable,initialCoordinates:t.initialCoordinates,active:t.active}};case $.DragMove:return e.draggable.active==null?e:{...e,draggable:{...e.draggable,translate:{x:t.coordinates.x-e.draggable.initialCoordinates.x,y:t.coordinates.y-e.draggable.initialCoordinates.y}}};case $.DragEnd:case $.DragCancel:return{...e,draggable:{...e.draggable,active:null,initialCoordinates:{x:0,y:0},translate:{x:0,y:0}}};case $.RegisterDroppable:{let{element:n}=t,{id:r}=n,o=new Oe(e.droppable.containers);return o.set(r,n),{...e,droppable:{...e.droppable,containers:o}}}case $.SetDroppableDisabled:{let{id:n,key:r,disabled:o}=t,i=e.droppable.containers.get(n);if(!i||r!==i.key)return e;let a=new Oe(e.droppable.containers);return a.set(n,{...i,disabled:o}),{...e,droppable:{...e.droppable,containers:a}}}case $.UnregisterDroppable:{let{id:n,key:r}=t,o=e.droppable.containers.get(n);if(!o||r!==o.key)return e;let i=new Oe(e.droppable.containers);return i.delete(n),{...e,droppable:{...e.droppable,containers:i}}}default:return e}}function wi(e){let{disabled:t}=e,{active:n,activatorEvent:r,draggableNodes:o}=(0,d.useContext)(pt),i=ot(r),a=ot(n?.id);return(0,d.useEffect)(()=>{if(!t&&!r&&i&&a!=null){if(!Et(i)||document.activeElement===i.target)return;let s=o.get(a);if(!s)return;let{activatorNode:l,node:u}=s;if(!l.current&&!u.current)return;requestAnimationFrame(()=>{for(let f of[l.current,u.current]){if(!f)continue;let c=On(f);if(c){c.focus();break}}})}},[r,t,o,a,i]),null}function gr(e,t){let{transform:n,...r}=t;return e!=null&&e.length?e.reduce((o,i)=>i({transform:o,...r}),n):n}function yi(e){return(0,d.useMemo)(()=>({draggable:{...At.draggable,...e?.draggable},droppable:{...At.droppable,...e?.droppable},dragOverlay:{...At.dragOverlay,...e?.dragOverlay}}),[e?.draggable,e?.droppable,e?.dragOverlay])}function ki(e){let{activeNode:t,measure:n,initialRect:r,config:o=!0}=e,i=(0,d.useRef)(!1),{x:a,y:s}=typeof o=="boolean"?{x:o,y:o}:o;de(()=>{if(!a&&!s||!t){i.current=!1;return}if(i.current||!r)return;let u=t?.node.current;if(!u||u.isConnected===!1)return;let f=n(u),c=er(f,r);if(a||(c.x=0),s||(c.y=0),i.current=!0,Math.abs(c.x)>0||Math.abs(c.y)>0){let p=nr(u);p&&p.scrollBy({top:c.y,left:c.x})}},[t,a,s,r,n])}var Lt=(0,d.createContext)({...se,scaleX:1,scaleY:1}),ye;(function(e){e[e.Uninitialized=0]="Uninitialized",e[e.Initializing=1]="Initializing",e[e.Initialized=2]="Initialized"})(ye||(ye={}));var vr=(0,d.memo)(function(t){var n,r,o,i;let{id:a,accessibility:s,autoScroll:l=!0,children:u,sensors:f=gi,collisionDetection:c=on,measuring:p,modifiers:g,...y}=t,h=(0,d.useReducer)(bi,void 0,mi),[b,w]=h,[k,x]=Co(),[O,D]=(0,d.useState)(ye.Uninitialized),N=O===ye.Initialized,{draggable:{active:C,nodes:I,translate:L},droppable:{containers:F}}=b,B=C!=null?I.get(C):null,Z=(0,d.useRef)({initial:null,translated:null}),ne=(0,d.useMemo)(()=>{var j;return C!=null?{id:C,data:(j=B?.data)!=null?j:vi,rect:Z}:null},[C,B]),V=(0,d.useRef)(null),[Y,Ye]=(0,d.useState)(null),[re,bt]=(0,d.useState)(null),ue=qe(y,Object.values(y)),Xe=it("DndDescribedBy",a),wt=(0,d.useMemo)(()=>F.getEnabled(),[F]),ae=yi(p),{droppableRects:ge,measureDroppableContainers:Be,measuringScheduled:yt}=ri(wt,{dragging:N,dependencies:[L.x,L.y],config:ae.droppable}),v=ti(I,C),S=(0,d.useMemo)(()=>re?at(re):null,[re]),M=uo(),q=oi(v,ae.draggable.measure);ki({activeNode:C!=null?I.get(C):null,config:M.layoutShiftCompensation,initialRect:q,measure:ae.draggable.measure});let P=qn(v,ae.draggable.measure,q),Ie=qn(v?v.parentElement:null),oe=(0,d.useRef)({activatorEvent:null,active:null,activeNode:v,collisionRect:null,collisions:null,droppableRects:ge,draggableNodes:I,draggingNode:null,draggingNodeRect:null,droppableContainers:F,over:null,scrollableAncestors:[],scrollAdjustedTranslate:null}),Ge=F.getNodeFor((n=oe.current.over)==null?void 0:n.id),ie=pi({measure:ae.dragOverlay.measure}),kt=(r=ie.nodeRef.current)!=null?r:v,Me=N?(o=ie.rect)!=null?o:P:null,bn=!!(ie.nodeRef.current&&ie.rect),wn=ai(bn?null:P),jt=dr(kt?_(kt):null),ve=li(N?Ge??v:null),xt=fi(ve),St=gr(g,{transform:{x:L.x-wn.x,y:L.y-wn.y,scaleX:1,scaleY:1},activatorEvent:re,active:ne,activeNodeRect:P,containerNodeRect:Ie,draggingNodeRect:Me,over:oe.current.over,overlayNodeRect:ie.rect,scrollableAncestors:ve,scrollableAncestorRects:xt,windowRect:jt}),yn=S?Ae(S,L):null,kn=ci(ve),ro=Hn(kn),oo=Hn(kn,[P]),Pe=Ae(St,ro),ze=Me?Mo(Me,St):null,Je=ne&&ze?c({active:ne,collisionRect:ze,droppableRects:ge,droppableContainers:wt,pointerCoordinates:yn}):null,xn=Ro(Je,"id"),[he,Sn]=(0,d.useState)(null),io=bn?St:Ae(St,oo),so=Lo(io,(i=he?.rect)!=null?i:null,P),_t=(0,d.useRef)(null),Cn=(0,d.useCallback)((j,X)=>{let{sensor:G,options:me}=X;if(V.current==null)return;let Q=I.get(V.current);if(!Q)return;let J=j.nativeEvent,le=new G({active:V.current,activeNode:Q,event:J,options:me,context:oe,onAbort(H){if(!I.get(H))return;let{onDragAbort:ce}=ue.current,fe={id:H};ce?.(fe),k({type:"onDragAbort",event:fe})},onPending(H,be,ce,fe){if(!I.get(H))return;let{onDragPending:Qe}=ue.current,we={id:H,constraint:be,initialCoordinates:ce,offset:fe};Qe?.(we),k({type:"onDragPending",event:we})},onStart(H){let be=V.current;if(be==null)return;let ce=I.get(be);if(!ce)return;let{onDragStart:fe}=ue.current,Ze={activatorEvent:J,active:{id:be,data:ce.data,rect:Z}};(0,Re.unstable_batchedUpdates)(()=>{fe?.(Ze),D(ye.Initializing),w({type:$.DragStart,initialCoordinates:H,active:be}),k({type:"onDragStart",event:Ze}),Ye(_t.current),bt(J)})},onMove(H){w({type:$.DragMove,coordinates:H})},onEnd:We($.DragEnd),onCancel:We($.DragCancel)});_t.current=le;function We(H){return async function(){let{active:ce,collisions:fe,over:Ze,scrollAdjustedTranslate:Qe}=oe.current,we=null;if(ce&&Qe){let{cancelDrop:et}=ue.current;we={activatorEvent:J,active:ce,collisions:fe,delta:Qe,over:Ze},H===$.DragEnd&&typeof et=="function"&&await Promise.resolve(et(we))&&(H=$.DragCancel)}V.current=null,(0,Re.unstable_batchedUpdates)(()=>{w({type:H}),D(ye.Uninitialized),Sn(null),Ye(null),bt(null),_t.current=null;let et=H===$.DragEnd?"onDragEnd":"onDragCancel";if(we){let Ut=ue.current[et];Ut?.(we),k({type:et,event:we})}})}}},[I]),ao=(0,d.useCallback)((j,X)=>(G,me)=>{let Q=G.nativeEvent,J=I.get(me);if(V.current!==null||!J||Q.dndKit||Q.defaultPrevented)return;let le={active:J};j(G,X.options,le)===!0&&(Q.dndKit={capturedBy:X.sensor},V.current=me,Cn(G,X))},[I,Cn]),In=ni(f,ao);di(f),de(()=>{P&&O===ye.Initializing&&D(ye.Initialized)},[P,O]),(0,d.useEffect)(()=>{let{onDragMove:j}=ue.current,{active:X,activatorEvent:G,collisions:me,over:Q}=oe.current;if(!X||!G)return;let J={active:X,activatorEvent:G,collisions:me,delta:{x:Pe.x,y:Pe.y},over:Q};(0,Re.unstable_batchedUpdates)(()=>{j?.(J),k({type:"onDragMove",event:J})})},[Pe.x,Pe.y]),(0,d.useEffect)(()=>{let{active:j,activatorEvent:X,collisions:G,droppableContainers:me,scrollAdjustedTranslate:Q}=oe.current;if(!j||V.current==null||!X||!Q)return;let{onDragOver:J}=ue.current,le=me.get(xn),We=le&&le.rect.current?{id:le.id,rect:le.rect.current,data:le.data,disabled:le.disabled}:null,H={active:j,activatorEvent:X,collisions:G,delta:{x:Q.x,y:Q.y},over:We};(0,Re.unstable_batchedUpdates)(()=>{Sn(We),J?.(H),k({type:"onDragOver",event:H})})},[xn]),de(()=>{oe.current={activatorEvent:re,active:ne,activeNode:v,collisionRect:ze,collisions:Je,droppableRects:ge,draggableNodes:I,draggingNode:kt,draggingNodeRect:Me,droppableContainers:F,over:he,scrollableAncestors:ve,scrollAdjustedTranslate:Pe},Z.current={initial:Me,translated:ze}},[ne,v,Je,ze,I,kt,Me,ge,F,he,ve,Pe]),Zo({...M,delta:L,draggingRect:ze,pointerCoordinates:yn,scrollableAncestors:ve,scrollableAncestorRects:xt});let lo=(0,d.useMemo)(()=>({active:ne,activeNode:v,activeNodeRect:P,activatorEvent:re,collisions:Je,containerNodeRect:Ie,dragOverlay:ie,draggableNodes:I,droppableContainers:F,droppableRects:ge,over:he,measureDroppableContainers:Be,scrollableAncestors:ve,scrollableAncestorRects:xt,measuringConfiguration:ae,measuringScheduled:yt,windowRect:jt}),[ne,v,P,re,Je,Ie,ie,I,F,ge,he,Be,ve,xt,ae,yt,jt]),co=(0,d.useMemo)(()=>({activatorEvent:re,activators:In,active:ne,activeNodeRect:P,ariaDescribedById:{draggable:Xe},dispatch:w,draggableNodes:I,over:he,measureDroppableContainers:Be}),[re,In,ne,P,w,Xe,I,he,Be]);return d.default.createElement(Vn.Provider,{value:x},d.default.createElement(pt.Provider,{value:co},d.default.createElement(pr.Provider,{value:lo},d.default.createElement(Lt.Provider,{value:so},u)),d.default.createElement(wi,{disabled:s?.restoreFocus===!1})),d.default.createElement(Eo,{...s,hiddenTextDescribedById:Xe}));function uo(){let j=Y?.autoScrollEnabled===!1,X=typeof l=="object"?l.enabled===!1:l===!1,G=N&&!j&&!X;return typeof l=="object"?{...l,enabled:G}:{enabled:G}}}),xi=(0,d.createContext)(null),_n="button",Si="Draggable";function hr(e){let{id:t,data:n,disabled:r=!1,attributes:o}=e,i=it(Si),{activators:a,activatorEvent:s,active:l,activeNodeRect:u,ariaDescribedById:f,draggableNodes:c,over:p}=(0,d.useContext)(pt),{role:g=_n,roleDescription:y="draggable",tabIndex:h=0}=o??{},b=l?.id===t,w=(0,d.useContext)(b?Lt:xi),[k,x]=rt(),[O,D]=rt(),N=ui(a,t),C=qe(n);de(()=>(c.set(t,{id:t,key:i,node:k,activatorNode:O,data:C}),()=>{let L=c.get(t);L&&L.key===i&&c.delete(t)}),[c,t]);let I=(0,d.useMemo)(()=>({role:g,tabIndex:h,"aria-disabled":r,"aria-pressed":b&&g===_n?!0:void 0,"aria-roledescription":y,"aria-describedby":f.draggable}),[r,g,h,b,y,f.draggable]);return{active:l,activatorEvent:s,activeNodeRect:u,attributes:I,isDragging:b,listeners:r?void 0:N,node:k,over:p,setNodeRef:x,setActivatorNodeRef:D,transform:w}}function Ci(){return(0,d.useContext)(pr)}var Ii="Droppable",Di={timeout:25};function mr(e){let{data:t,disabled:n=!1,id:r,resizeObserverConfig:o}=e,i=it(Ii),{active:a,dispatch:s,over:l,measureDroppableContainers:u}=(0,d.useContext)(pt),f=(0,d.useRef)({disabled:n}),c=(0,d.useRef)(!1),p=(0,d.useRef)(null),g=(0,d.useRef)(null),{disabled:y,updateMeasurementsFor:h,timeout:b}={...Di,...o},w=qe(h??r),k=(0,d.useCallback)(()=>{if(!c.current){c.current=!0;return}g.current!=null&&clearTimeout(g.current),g.current=setTimeout(()=>{u(Array.isArray(w.current)?w.current:[w.current]),g.current=null},b)},[b]),x=Ot({callback:k,disabled:y||!a}),O=(0,d.useCallback)((I,L)=>{x&&(L&&(x.unobserve(L),c.current=!1),I&&x.observe(I))},[x]),[D,N]=rt(O),C=qe(t);return(0,d.useEffect)(()=>{!x||!D.current||(x.disconnect(),c.current=!1,x.observe(D.current))},[D,x]),(0,d.useEffect)(()=>(s({type:$.RegisterDroppable,element:{id:r,key:i,disabled:n,node:D,rect:p,data:C}}),()=>s({type:$.UnregisterDroppable,key:i,id:r})),[r]),(0,d.useEffect)(()=>{n!==f.current.disabled&&(s({type:$.SetDroppableDisabled,id:r,key:i,disabled:n}),f.current.disabled=n)},[r,i,n,s]),{active:a,rect:p,isOver:l?.id===r,node:D,over:l,setNodeRef:N}}function Ei(e){let{animation:t,children:n}=e,[r,o]=(0,d.useState)(null),[i,a]=(0,d.useState)(null),s=ot(n);return!n&&!r&&s&&o(s),de(()=>{if(!i)return;let l=r?.key,u=r?.props.id;if(l==null||u==null){o(null);return}Promise.resolve(t(u,i)).then(()=>{o(null)})},[t,r,i]),d.default.createElement(d.default.Fragment,null,n,r?(0,d.cloneElement)(r,{ref:a}):null)}var Ai={x:0,y:0,scaleX:1,scaleY:1};function Ni(e){let{children:t}=e;return d.default.createElement(pt.Provider,{value:fr},d.default.createElement(Lt.Provider,{value:Ai},t))}var Ri={position:"fixed",touchAction:"none"},Ti=e=>Et(e)?"transform 250ms ease":void 0,Oi=(0,d.forwardRef)((e,t)=>{let{as:n,activatorEvent:r,adjustScale:o,children:i,className:a,rect:s,style:l,transform:u,transition:f=Ti}=e;if(!s)return null;let c=o?u:{...u,scaleX:1,scaleY:1},p={...Ri,width:s.width,height:s.height,top:s.top,left:s.left,transform:Fe.Transform.toString(c),transformOrigin:o&&r?Ao(r,s):void 0,transition:typeof f=="function"?f(r):f,...l};return d.default.createElement(n,{className:a,style:p,ref:t},i)}),Li=e=>t=>{let{active:n,dragOverlay:r}=t,o={},{styles:i,className:a}=e;if(i!=null&&i.active)for(let[s,l]of Object.entries(i.active))l!==void 0&&(o[s]=n.node.style.getPropertyValue(s),n.node.style.setProperty(s,l));if(i!=null&&i.dragOverlay)for(let[s,l]of Object.entries(i.dragOverlay))l!==void 0&&r.node.style.setProperty(s,l);return a!=null&&a.active&&n.node.classList.add(a.active),a!=null&&a.dragOverlay&&r.node.classList.add(a.dragOverlay),function(){for(let[l,u]of Object.entries(o))n.node.style.setProperty(l,u);a!=null&&a.active&&n.node.classList.remove(a.active)}},Bi=e=>{let{transform:{initial:t,final:n}}=e;return[{transform:Fe.Transform.toString(t)},{transform:Fe.Transform.toString(n)}]},Mi={duration:250,easing:"ease",keyframes:Bi,sideEffects:Li({styles:{active:{opacity:"0"}}})};function Pi(e){let{config:t,draggableNodes:n,droppableContainers:r,measuringConfiguration:o}=e;return nt((i,a)=>{if(t===null)return;let s=n.get(i);if(!s)return;let l=s.node.current;if(!l)return;let u=ur(a);if(!u)return;let{transform:f}=_(a).getComputedStyle(a),c=tr(f);if(!c)return;let p=typeof t=="function"?t:zi(t);return lr(l,o.draggable.measure),p({active:{id:i,data:s.data,node:l,rect:o.draggable.measure(l)},draggableNodes:n,dragOverlay:{node:a,rect:o.dragOverlay.measure(u)},droppableContainers:r,measuringConfiguration:o,transform:c})})}function zi(e){let{duration:t,easing:n,sideEffects:r,keyframes:o}={...Mi,...e};return i=>{let{active:a,dragOverlay:s,transform:l,...u}=i;if(!t)return;let f={x:s.rect.left-a.rect.left,y:s.rect.top-a.rect.top},c={scaleX:l.scaleX!==1?a.rect.width*l.scaleX/s.rect.width:1,scaleY:l.scaleY!==1?a.rect.height*l.scaleY/s.rect.height:1},p={x:l.x-f.x,y:l.y-f.y,...c},g=o({...u,active:a,dragOverlay:s,transform:{initial:l,final:p}}),[y]=g,h=g[g.length-1];if(JSON.stringify(y)===JSON.stringify(h))return;let b=r?.({active:a,dragOverlay:s,...u}),w=s.node.animate(g,{duration:t,easing:n,fill:"forwards"});return new Promise(k=>{w.onfinish=()=>{b?.(),k()}})}}var Un=0;function Wi(e){return(0,d.useMemo)(()=>{if(e!=null)return Un++,Un},[e])}var br=d.default.memo(e=>{let{adjustScale:t=!1,children:n,dropAnimation:r,style:o,transition:i,modifiers:a,wrapperElement:s="div",className:l,zIndex:u=999}=e,{activatorEvent:f,active:c,activeNodeRect:p,containerNodeRect:g,draggableNodes:y,droppableContainers:h,dragOverlay:b,over:w,measuringConfiguration:k,scrollableAncestors:x,scrollableAncestorRects:O,windowRect:D}=Ci(),N=(0,d.useContext)(Lt),C=Wi(c?.id),I=gr(a,{activatorEvent:f,active:c,activeNodeRect:p,containerNodeRect:g,draggingNodeRect:b.rect,over:w,overlayNodeRect:b.rect,scrollableAncestors:x,scrollableAncestorRects:O,transform:N,windowRect:D}),L=an(p),F=Pi({config:r,draggableNodes:y,droppableContainers:h,measuringConfiguration:k}),B=L?b.setRef:void 0;return d.default.createElement(Ni,null,d.default.createElement(Ei,{animation:F},c&&C?d.default.createElement(Oi,{key:C,id:c.id,ref:B,as:s,activatorEvent:f,adjustScale:t,className:l,transition:i,rect:L,style:{zIndex:u,...o},transform:I},n):null))});function ke(e,t={},n="default"){return fetch("/api/kanban-flow",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({method:e,args:{...t,workspaceId:n}})}).then(r=>r.json()).catch(r=>({ok:!1,error:String(r&&r.message||r)}))}var xe=null,ln=new Set,wr=new Set,cn=new Set,yr=new Set;function xr(e){xe=e}function dn(e){return e.settings&&e.settings.confirmRequired?"This board REQUIRES human confirmation: never move the item to Done \u2014 finish via Review and let the human complete it.":"When the task is fully complete: move the item In Progress -> Done."}function Sr(){return"If the human replies while the item is in Review or Done: move it back to In Progress (Review -> In Progress / Done -> In Progress) and address their message in the same turn."}var un=()=>"Scope limit: execute ONLY the work described in this item. If other work surfaces (other items, side tasks, extra refactors), do not start it \u2014 mention it in the conversation and let the human queue a separate item.";function Fi(e,t){return[`Kanban pickup: item ${t.id} "${t.name}" was moved to To Do by the human.`,"","Workflow:",`1. Read it with kanbanflow_get_item (id: ${t.id}).`,"2. Confirm pickup: move it To Do -> In Progress (kanbanflow_move_item).","3. Do the work, narrating your progress and decisions in this conversation.","4. If you need anything from the human: move the item In Progress -> Review and state your question in this conversation.",`5. ${dn(e)}`,"",Sr(),un(),`Always reference the item by id ${t.id}. Never modify other items.`].join(`
    `)}function $i(e,t){return[`Kanban requeue: item ${t.id} "${t.name}" was moved back to To Do by the human.`,"Continue in this session's context: acknowledge in this conversation, move the item To Do -> In Progress, and address the human's feedback.",dn(e),"",Sr(),un(),`Always reference the item by id ${t.id}.`].join(`
    `)}function qi(e,t){return[`Kanban: the human returned item ${t.id} "${t.name}" to In Progress.`,"Continue working on it: give a short status in this conversation, address any feedback, then proceed per the workflow.",dn(e),"",un(),`Always reference the item by id ${t.id}.`].join(`
    `)}async function Ki(e,t,n){if(n.sessionId)return n.sessionId;if(!xe)return null;try{let r=await xe.createSession(e);return await ke("setSession",{id:n.id,sessionId:r},e),n.sessionId=r,r}catch(r){return console.warn("dsh-kanban-flow: session create failed for "+n.id,r),null}}async function kr(e,t,n,r){if(!(!xe||cn.has(n.id))){cn.add(n.id);try{let o=await Ki(e,t,n);if(!o)return;let i=t.items.find(a=>a.id===n.id)??n;await xe.renameSession(o,`${i.id} \xB7 ${i.name}`),await xe.promptSession(o,r(t,i))}catch(o){console.warn("dsh-kanban-flow: agent drive failed for "+n.id,o)}finally{cn.delete(n.id)}}}async function Hi(e){if(!(!xe||yr.has(e))){yr.add(e);try{await xe.archiveSession(e)}catch(t){console.warn("dsh-kanban-flow: session archive failed for "+e,t)}}}function Cr(e,t){let n=Array.isArray(t.activities)?t.activities:[];if(!wr.has(e)){wr.add(e);for(let r of n)ln.add(r.id);return}for(let r of n){if(ln.has(r.id))continue;if(ln.add(r.id),r.type==="item_deleted"&&r.sessionId){Hi(r.sessionId);continue}if(r.source!=="human")continue;let o=t.items.find(i=>i.id===r.itemId);o&&r.type==="item_moved"&&(r.to==="todo"?kr(e,t,o,o.sessionId?$i:Fi):r.to==="in_progress"&&r.from==="review"&&kr(e,t,o,qi))}}var Bt=["backlog","todo","in_progress","review","done"],Le={backlog:"Backlog",todo:"To Do",in_progress:"In Progress",review:"Review",done:"Done"};var ji=e=>Le[String(e)]||String(e||"");function Ir(e){if(!e)return"";let t=new Date(e).getTime();if(!Number.isFinite(t))return"";let n=Math.max(0,(Date.now()-t)/1e3);return n<5?"just now":n<60?`${Math.floor(n)} seconds ago`:n<120?"1 minute ago":n<3600?`${Math.floor(n/60)} minutes ago`:n<7200?"1 hour ago":n<86400?`${Math.floor(n/3600)} hours ago`:`${Math.floor(n/86400)} days ago`}function Dr(e){let t=e.source==="agent"?"harness":"you";switch(e.type){case"item_moved":return`${t} moved to ${ji(e.to)}`;case"item_created":return`${t} created`;case"item_updated":return`${t} edited`;case"item_deleted":return`${t} deleted`;default:return`${t} ${e.type.replace(/_/g," ")}`}}function Er(e){return`${Dr(e)} (${Ir(e.ts)})`}function Ar(e){return{phrase:Dr(e),time:Ir(e.ts)}}var Nr="dsh-kanban-flow.clickOpensBoard",fn="dsh-kanban-flow:clickPrefChanged",Rr="dsh-kanban-flow.confirmArchive",pn="dsh-kanban-flow:archiveConfirmChanged";function Mt(){try{let e=localStorage.getItem(Nr);if(e==="0")return!1;if(e==="1")return!0}catch{}return!0}function Tr(e){try{localStorage.setItem(Nr,e?"1":"0")}catch{}window.dispatchEvent(new CustomEvent(fn))}function Or(e){return window.addEventListener(fn,e),window.addEventListener("storage",e),()=>{window.removeEventListener(fn,e),window.removeEventListener("storage",e)}}function Pt(){try{let e=localStorage.getItem(Rr);if(e==="0")return!1;if(e==="1")return!0}catch{}return!0}function Lr(e){try{localStorage.setItem(Rr,e?"1":"0")}catch{}window.dispatchEvent(new CustomEvent(pn))}function zt(e){return window.addEventListener(pn,e),window.addEventListener("storage",e),()=>{window.removeEventListener(pn,e),window.removeEventListener("storage",e)}}var Ce=require("react");function Br(e){let{override:t,currentSessionId:n,workspaceItems:r,recentWorkspaceId:o}=e,i=Array.isArray(r)?r:[],a=p=>p?i.find(g=>g&&g.workspaceId===p):void 0,s=n?i.find(p=>p&&Array.isArray(p.sessionIds)&&p.sessionIds.includes(n)):void 0,l=s?s.workspaceId:void 0,u=t!=null&&t.workspaceId!==l&&(t.hostSessionId===void 0||t.hostSessionId===n)?t:void 0,f=u?a(u.workspaceId):void 0,c=f||s||a(o);return{workspaceId:c?c.workspaceId:o||"default",workspaceTitle:c?c.title:void 0,pinned:f!==void 0,nativeWorkspaceId:l}}function Mr(e,t,n=0){if(!Array.isArray(e))return null;let r=0;for(let o of e)if(!(!o||o.title!==t)){if(r===n)return o.workspaceId;r+=1}return null}var Ft="data-kf-kanban",Kt="Board",gt=null,_e=!1,je=!1;function _i(){return _e}function zr(e){gt&&gt(e)}function vn(){return typeof document>"u"?[]:Array.from(document.querySelectorAll('[role="tab"]'))}function hn(){return vn().find(e=>(e.textContent||"").trim()===Kt)}function $t(){let e=hn();return!!e&&e.getAttribute("aria-selected")==="true"}function Pr(e=4e3){if(typeof document>"u")return;let t=Date.now()+e,n=()=>{let r=hn();if(r){r.click();return}Date.now()<t&&window.setTimeout(n,120)};n()}function Wr(){let e=vn().find(t=>(t.textContent||"").trim()!==Kt);e&&e.click()}function qt(){if(typeof document>"u"||je)return;je=!0;let e=Date.now()+2500,t=()=>{if(_e){je=!1;return}let n=hn();if(!n||n.getAttribute("aria-selected")!=="true"){je=!1;return}let r=vn().find(o=>(o.textContent||"").trim()!==Kt);if(r){r.click(),je=!1;return}if(Date.now()<e){window.setTimeout(t,120);return}je=!1};t()}function Fr(){return(0,Ce.useEffect)(()=>{if(typeof document>"u")return;let e=t=>{if(_i()||!(t.target instanceof Element))return;let n=t.target.closest('[role="tab"]');n&&(n.textContent||"").trim()===Kt&&n.getAttribute("aria-selected")==="true"&&(t.stopImmediatePropagation(),t.preventDefault(),Wr())};return document.addEventListener("click",e,!0),()=>document.removeEventListener("click",e,!0)},[]),null}function Wt(e,t){if(!t||!e?.list)return;let n=e.list.getSnapshot()?.items;if(!Array.isArray(n))return;let r=n.find(o=>o&&Array.isArray(o.sessionIds)&&o.sessionIds.includes(t));return r?r.workspaceId:void 0}var Se=null,gn=new Set;function $r(){return Se??void 0}function vt(e){if(!(Se===null&&e===null||Se!==null&&e!==null&&Se.workspaceId===e.workspaceId&&Se.hostSessionId===e.hostSessionId)){Se=e;for(let n of gn)n()}}function qr(e){return gn.add(e),()=>{gn.delete(e)}}function Kr({workspaces:e,sessions:t}){return(0,Ce.useEffect)(()=>{if(!e||!t)return;let n=()=>t.list.getSnapshot(),r=c=>{if(c===void 0)return!1;let p=n().byId;return!!(p&&p[c]&&p[c].blank===!1)},o=()=>{let c=n().current;return r(c)?c:void 0},i=()=>{let c=e.list?.getSnapshot?.();return new Set(Array.isArray(c?.archivedSessionIds)?c.archivedSessionIds:[])},a=c=>{let p=e.list?.getSnapshot?.()?.items,g=Array.isArray(p)?p.find(h=>h&&h.workspaceId===c):void 0;if(!g||!Array.isArray(g.sessionIds))return;let y=i();return g.sessionIds.find(h=>r(h)&&!y.has(h))},s=()=>{let c=n(),p=i();for(let g of c.ids??[])if(r(g)&&!p.has(g))return g},l=(c,p,g=6e3)=>{if(c()){p();return}let y=!1,h=()=>{y||(y=!0,b(),typeof w=="function"&&w(),window.clearTimeout(k),p())},b=t.list.subscribe(()=>{c()&&h()}),w=e.list?.subscribe?.(()=>{c()&&h()}),k=window.setTimeout(h,g)},u=()=>{$t()||Pr(),window.setTimeout(()=>{_e=!1},600)},f=c=>{let p=(w,k)=>{console.info(`[dsh-kanban-flow] open case ${w}:`,JSON.stringify({target:c,current:o()??null,actualCurrent:n().current??null,override:Se,boardTabActive:$t(),...k}))},g=o();if(g!==void 0){let w=Se?.workspaceId??Wt(e,g);if(w===c){p("1-toggle",{effective:w}),$t()?Wr():Pr();return}}_e=!0;let y=a(c);if(y!==void 0){p("2-native",{targetSession:y}),vt(null),t.open&&t.open(y),l(()=>n().current===y,u);return}if(g!==void 0){p("3-pin-current"),vt({workspaceId:c,hostSessionId:g}),u();return}let h=Wt(e,n().current),b=(h!==void 0?a(h):void 0)??s();if(b!==void 0){p("4-borrow",{borrowed:b,currentWorkspaceId:h}),vt({workspaceId:c,hostSessionId:b}),n().current===b?u():(t.open&&t.open(b),l(()=>n().current===b,u));return}p("5-seed"),e.startSession(c),l(()=>{let w=n().current;return w!==void 0&&Wt(e,w)===c},()=>{let w=n().current;if(w===void 0||Wt(e,w)!==c){_e=!1;return}let x=(t.binding?t.binding(w):void 0)?.session.prompt([{type:"text",text:'Kanban board bootstrap: reply with the single word "ready".'}],"queue");Promise.resolve(x).catch(O=>console.warn("dsh-kanban-flow: board seed prompt failed",O)),l(()=>o()!==void 0,u,2e4)},1e4)};return gt=f,()=>{gt===f&&(gt=null)}},[e,t]),null}function Hr({sessions:e}){return(0,Ce.useEffect)(()=>{if(typeof document>"u")return;let t=n=>{if(!(n.target instanceof Element))return;let r=n.target.closest('[role="treeitem"]');!r||r.hasAttribute("aria-expanded")||n.target.closest("button")||$t()&&qt()};return document.addEventListener("click",t,!0),()=>document.removeEventListener("click",t,!0)},[]),(0,Ce.useEffect)(()=>{if(!e?.list)return;let t=e.list.getSnapshot()?.current;return e.list.subscribe(()=>{let r=e.list.getSnapshot()?.current;r!==t&&(t=r,_e||qt())})},[e]),null}function jr(){return typeof document>"u"?[]:Array.from(document.querySelectorAll('[role="treeitem"][aria-expanded]')).filter(t=>ht(t)!==null)}function ht(e){let t=Array.from(e.querySelectorAll(":scope > span"));for(let n of t)if((n.textContent||"").trim()!==""&&n.querySelector("button")===null&&n.querySelector("svg")===null)return n;return null}function Ui(e){let t=Array.from(e.querySelectorAll(":scope > span"));for(let n of t)if(n.querySelector("button")!==null)return n;return null}function Vi(e,t){if(!(t instanceof Element))return!1;let n=t.closest("span");return!n||!e.contains(n)?!1:n.querySelector("svg")!==null&&n.querySelector("button")===null&&(n.textContent||"").trim()===""}function _r(e,t){let n=ht(t);if(!n)return null;let r=(n.textContent||"").trim(),o=e?.list?.getSnapshot?.()?.items;if(!Array.isArray(o))return null;let i=0;for(let a of jr()){if(a===t)break;let s=ht(a);s&&(s.textContent||"").trim()===r&&(i+=1)}return Mr(o,r,i)}function Yi(){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 16 16"),e.setAttribute("width","14"),e.setAttribute("height","14"),e.setAttribute("fill","none");for(let[t,n]of[[1.5,12],[6,8],[10.5,5]]){let r=document.createElementNS("http://www.w3.org/2000/svg","rect");r.setAttribute("x",String(t)),r.setAttribute("y","2"),r.setAttribute("width","4"),r.setAttribute("height",String(n)),r.setAttribute("rx","1.4"),r.setAttribute("fill","currentColor"),e.appendChild(r)}return e}function Ur({workspaces:e}){return(0,Ce.useEffect)(()=>{if(typeof document>"u")return;let t=!1,n=()=>{if(!t)for(let i of jr()){let a=ht(i),s=Ui(i);if(!a||!s||s.querySelector(`[${Ft}]`))continue;let l=_r(e,i);if(!l)continue;let u=(a.textContent||"").trim(),f=document.createElement("button");f.type="button",f.setAttribute(Ft,""),f.className="kf-sidebar-icon",f.title=`Open kanban board (${u})`,f.setAttribute("aria-label",`Open kanban board for ${u}`),f.appendChild(Yi()),f.addEventListener("click",c=>{c.stopPropagation(),c.preventDefault(),zr(l)}),s.appendChild(f)}},r=new MutationObserver(()=>n());r.observe(document.documentElement,{childList:!0,subtree:!0});let o=e?.list?.subscribe?.(()=>n());return n(),()=>{t=!0,r.disconnect(),typeof o=="function"&&o();for(let i of Array.from(document.querySelectorAll(`[${Ft}]`)))i.remove()}},[e]),null}function Vr({workspaces:e}){return(0,Ce.useEffect)(()=>{if(typeof document>"u")return;let t=n=>{if(!Mt()||!(n.target instanceof Element))return;let r=n.target.closest('[role="treeitem"][aria-expanded]');if(!r||!ht(r)||Vi(r,n.target)||n.target.closest("button")&&!n.target.closest(`[${Ft}]`))return;let i=_r(e,r);i&&(n.stopPropagation(),n.preventDefault(),zr(i))};return document.addEventListener("click",t,!0),()=>document.removeEventListener("click",t,!0)},[e]),null}function Yr({workspaces:e}){return(0,Ce.useEffect)(()=>{if(!e?.list||typeof e.list.getSnapshot!="function")return;let t=!1,n=new Set(e.list.getSnapshot()?.archivedSessionIds??[]),r=async()=>{if(t)return;let i=e.list.getSnapshot(),a=new Set(i?.archivedSessionIds??[]),s=[...a].filter(l=>!n.has(l));if(n=a,s.length!==0){for(let l of Array.isArray(i?.items)?i.items:[])if(!(!l||!l.workspaceId))try{let f=(await ke("get",{},l.workspaceId))?.board?.items??[];for(let c of f)c.sessionId&&s.includes(c.sessionId)&&await ke("deleteItem",{id:c.id},l.workspaceId)}catch{}}},o=e.list.subscribe(()=>{r()});return()=>{t=!0,o()}},[e]),null}var Ht=require("react"),te=require("react/jsx-runtime");function Xr({item:e,onConfirm:t,onCancel:n}){let r=(0,Ht.useRef)(null);return(0,Ht.useEffect)(()=>{r.current?.focus();let o=i=>{i.key==="Escape"&&n(),i.key==="Enter"&&t()};return document.addEventListener("keydown",o),()=>document.removeEventListener("keydown",o)},[t,n]),(0,te.jsx)("div",{className:"kf-dialog-backdrop",onMouseDown:o=>{o.target===o.currentTarget&&n()},children:(0,te.jsxs)("div",{className:"kf-dialog",role:"alertdialog","aria-label":"Archive "+e.id,style:{width:400},children:[(0,te.jsx)("div",{className:"kf-dialog-head",children:(0,te.jsx)("span",{className:"kf-dialog-title",children:"Archive item?"})}),(0,te.jsxs)("div",{className:"kf-dialog-body",children:[(0,te.jsxs)("div",{className:"kf-muted",children:["Archive ",(0,te.jsx)("strong",{children:e.id})," \u201C",e.name,"\u201D? The item will be removed from the board",e.sessionId?" and its task session archived":"","."]}),(0,te.jsxs)("div",{className:"kf-newitem-row",style:{justifyContent:"flex-end"},children:[(0,te.jsx)("button",{type:"button",className:"kf-btn kf-ghost",onClick:n,children:"Cancel"}),(0,te.jsx)("button",{type:"button",ref:r,className:"kf-btn kf-danger",onClick:t,children:"Archive"})]})]})]})})}var mt=require("react");var E=require("react/jsx-runtime"),Xi=e=>Le[e]||e;function Gr(e){let{item:t,board:n,onOpenChange:r,onSave:o,onDelete:i,onOpenSession:a,sessions:s}=e,[l,u]=(0,mt.useState)(t?t.name:""),[f,c]=(0,mt.useState)(t?t.description:"");if((0,mt.useEffect)(()=>{u(t?t.name:""),c(t?t.description:"")},[t&&t.id]),!t)return null;let p=n.activities.filter(g=>g.itemId===t.id);return(0,E.jsx)("div",{className:"kf-dialog-backdrop",onMouseDown:g=>{g.target===g.currentTarget&&r(!1)},children:(0,E.jsxs)("div",{className:"kf-dialog",role:"dialog","aria-label":"Item "+t.id,children:[(0,E.jsxs)("div",{className:"kf-dialog-head",children:[(0,E.jsx)("span",{className:"kf-code-chip",children:t.id}),(0,E.jsx)("span",{className:"kf-dialog-title",children:t.name}),(0,E.jsx)("span",{className:"kf-spacer"}),t.sessionId&&s&&(0,E.jsx)("button",{type:"button",className:"kf-btn",onClick:()=>a(t),children:"Open task session"}),(0,E.jsx)("button",{type:"button",className:"kf-iconbtn",title:"Close","aria-label":"Close item dialog",onClick:()=>r(!1),children:"\u2715"})]}),(0,E.jsxs)("div",{className:"kf-dialog-body",children:[(0,E.jsxs)("div",{className:"kf-muted",children:["In ",(0,E.jsx)("strong",{children:Xi(t.columnId)}),t.sessionId?" \xB7 linked to a task session":""]}),(0,E.jsxs)("div",{children:[(0,E.jsx)("div",{className:"kf-fieldlabel",children:"Name"}),(0,E.jsx)("input",{className:"kf-input",value:l,onChange:g=>u(g.target.value)})]}),(0,E.jsxs)("div",{children:[(0,E.jsx)("div",{className:"kf-fieldlabel",children:"Description"}),(0,E.jsx)("textarea",{className:"kf-textarea",value:f,onChange:g=>c(g.target.value)})]}),(0,E.jsxs)("div",{className:"kf-newitem-row",style:{justifyContent:"flex-start"},children:[(0,E.jsx)("button",{type:"button",className:"kf-btn kf-primary",onClick:()=>o({name:l,description:f}),children:"Save"}),(0,E.jsx)("button",{type:"button",className:"kf-btn kf-danger",onClick:()=>i(t.id),children:"Delete item"})]}),t.sessionId&&(0,E.jsx)("div",{className:"kf-muted",children:"Deleting this item also archives its task session."}),(0,E.jsxs)("div",{children:[(0,E.jsx)("div",{className:"kf-fieldlabel",children:"Activity"}),p.length===0&&(0,E.jsx)("div",{className:"kf-muted",children:"No activity yet."}),p.slice().reverse().map(g=>(0,E.jsx)("div",{className:"kf-activity-row",children:(0,E.jsx)("span",{children:Er(g)})},g.id))]})]})]})})}var Ue=require("react"),U=require("react/jsx-runtime");function Jr({code:e,itemCount:t,onConfirm:n,onDismiss:r}){let[o,i]=(0,Ue.useState)(e),a=(0,Ue.useRef)(null);(0,Ue.useEffect)(()=>{a.current?.focus(),a.current?.select()},[]);let s=o.toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,6),l=/^[A-Z0-9]{2,6}$/.test(s);return(0,U.jsx)("div",{className:"kf-dialog-backdrop",onMouseDown:u=>{u.target===u.currentTarget&&r()},children:(0,U.jsxs)("div",{className:"kf-dialog",role:"dialog","aria-label":"Board code",style:{width:400},children:[(0,U.jsx)("div",{className:"kf-dialog-head",children:(0,U.jsx)("span",{className:"kf-dialog-title",children:"Name your board"})}),(0,U.jsxs)("div",{className:"kf-dialog-body",children:[(0,U.jsxs)("div",{className:"kf-muted",children:["Pick a short code (2\u20136 letters/digits) for this workspace's board. New items get ids like"," ",(0,U.jsx)("strong",{children:(s.length>=2?s:"XX")+"-1"}),".",t>0&&" Existing item ids stay unchanged."]}),(0,U.jsxs)("div",{children:[(0,U.jsx)("div",{className:"kf-fieldlabel",children:"Board code"}),(0,U.jsx)("input",{ref:a,className:"kf-input",style:{fontFamily:"var(--ds-font-family-code)",textTransform:"uppercase",fontSize:16,letterSpacing:"0.08em"},value:o,onChange:u=>i(u.target.value.toUpperCase()),onKeyDown:u=>{u.key==="Enter"&&l&&n(s),u.key==="Escape"&&r()},maxLength:6})]}),(0,U.jsxs)("div",{className:"kf-newitem-row",style:{justifyContent:"flex-end"},children:[(0,U.jsx)("button",{type:"button",className:"kf-btn kf-ghost",onClick:r,children:"Decide later"}),(0,U.jsxs)("button",{type:"button",className:"kf-btn kf-primary",disabled:!l,onClick:()=>n(s),children:["Use ",s||"\u2026"]})]})]})]})})}var pe=require("react");var A=require("react/jsx-runtime");function mn({on:e,onToggle:t,label:n}){return(0,A.jsx)("button",{type:"button",role:"switch","aria-checked":e,"aria-label":n,className:"kf-switch"+(e?" kf-on":""),onClick:t,children:(0,A.jsx)("span",{className:"kf-switch-thumb"})})}function Zr({board:e,onCode:t,onConfirmRequired:n,onClose:r}){let o=(0,pe.useRef)(null),[i,a]=(0,pe.useState)(e.code);(0,pe.useEffect)(()=>{let f=c=>{o.current&&!o.current.contains(c.target)&&r()};return document.addEventListener("mousedown",f),()=>document.removeEventListener("mousedown",f)},[r]);let s=i.toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,6),l=/^[A-Z0-9]{2,6}$/.test(s),u=!!(e.settings&&e.settings.confirmRequired);return(0,A.jsxs)("div",{className:"kf-pop",ref:o,role:"dialog","aria-label":"Board settings",children:[(0,A.jsxs)("div",{className:"kf-toggle-row",children:[(0,A.jsx)(mn,{on:u,onToggle:()=>n(!u),label:"Require confirmation to complete work"}),(0,A.jsxs)("div",{className:"kf-toggle-text",children:[(0,A.jsx)("div",{className:"kf-toggle-title",children:"Require confirmation to complete work"}),(0,A.jsx)("div",{className:"kf-toggle-sub",children:"On: the agent must send finished work through Review \u2014 it can never move items to Done. You complete by dragging to Done."})]})]}),(0,A.jsxs)("div",{children:[(0,A.jsx)("div",{className:"kf-fieldlabel",children:"Board code"}),(0,A.jsxs)("div",{className:"kf-code-row",children:[(0,A.jsx)("input",{className:"kf-input",value:i,maxLength:6,onChange:f=>a(f.target.value.toUpperCase())}),(0,A.jsx)("button",{type:"button",className:"kf-btn",disabled:!l||s===e.code,onClick:()=>t(s),children:"Save"})]}),(0,A.jsxs)("div",{className:"kf-toggle-sub",style:{marginTop:4},children:["Prefixes new item ids (",e.code,"-1, ",e.code,"-2\u2026). Existing ids stay unchanged. The workspace-click preference lives in Settings \u2192 Plugins \u2192 Kanban Flow."]})]})]})}function Qr(){let e=(0,pe.useSyncExternalStore)(Or,Mt),t=(0,pe.useSyncExternalStore)(zt,Pt);return(0,A.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:16,maxWidth:520},children:[(0,A.jsxs)("div",{className:"kf-toggle-row",children:[(0,A.jsx)(mn,{on:e,onToggle:()=>Tr(!e),label:"Workspace click opens board"}),(0,A.jsxs)("div",{className:"kf-toggle-text",children:[(0,A.jsx)("div",{className:"kf-toggle-title",children:"Workspace click opens board"}),(0,A.jsx)("div",{className:"kf-toggle-sub",children:"New: clicking a workspace in the sidebar opens that workspace's board in-app, on the Board tab of its conversation (the folder icon still expands the session list). Old: clicking a workspace expands its session list."})]})]}),(0,A.jsxs)("div",{className:"kf-toggle-row",children:[(0,A.jsx)(mn,{on:t,onToggle:()=>Lr(!t),label:"Require confirmation to archive items"}),(0,A.jsxs)("div",{className:"kf-toggle-text",children:[(0,A.jsx)("div",{className:"kf-toggle-title",children:"Require confirmation to archive items"}),(0,A.jsx)("div",{className:"kf-toggle-sub",children:"On: archiving an item from its card first opens a confirmation dialog describing what will be removed. Off: the card's archive button removes the item (and archives its task session) immediately."})]})]}),(0,A.jsx)("div",{className:"kf-muted",children:"Board-specific options \u2014 \u201CRequire confirmation to complete work\u201D and the board code \u2014 live in the gear menu of each board (Board tab \u2192 \u2699)."})]})}var m=require("react/jsx-runtime"),Gi=e=>{let t=Qn(e);if(t.length>0)return t;let n=on(e);return n.length>0?n:Zn(e)};function Ve({path:e,size:t=15}){return(0,m.jsx)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:(0,m.jsx)("path",{d:e})})}var Ji="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",Zi="M5 12h14M12 5v14",Qi="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",es="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",ts="M2 4h20v4H2zM3 8v12h18V8 M10 12h4";function ns({item:e,flash:t,lastActivity:n,onOpenSession:r,onEdit:o,onArchive:i}){let{attributes:a,listeners:s,setNodeRef:l,isDragging:u}=hr({id:e.id});return(0,m.jsxs)("div",{ref:l,...a,...s,className:"kf-card"+(t?" kf-agent-flash":"")+(e.sessionId?" kf-has-session":"")+(u?" kf-dragging":""),style:{"--kf-card-accent":"var(--kf-accent, var(--dsw-alias-label-secondary))"},onClick:f=>{f.target.closest(".kf-edit-fab, .kf-archive-fab")||(e.sessionId?r():o())},children:[(0,m.jsx)("button",{type:"button",className:"kf-edit-fab",title:"Details","aria-label":"Details for "+e.id,onClick:f=>{f.stopPropagation(),o()},children:(0,m.jsx)(Ve,{path:Ji,size:13})}),(0,m.jsx)("button",{type:"button",className:"kf-archive-fab",title:"Archive item","aria-label":"Archive "+e.id,onClick:f=>{f.stopPropagation(),i()},children:(0,m.jsx)(Ve,{path:ts,size:13})}),(0,m.jsxs)("div",{className:"kf-card-id",children:[e.id,e.sessionId&&(0,m.jsx)("span",{className:"kf-session-badge",title:"Open task session "+e.sessionId,children:(0,m.jsx)(Ve,{path:es,size:11})})]}),(0,m.jsx)("div",{className:"kf-card-name",children:e.name}),n&&(0,m.jsxs)("div",{className:"kf-card-activity",children:[(0,m.jsx)("span",{className:"kf-card-activity-phrase",children:n.phrase}),(0,m.jsx)("span",{className:"kf-card-activity-time",children:n.time})]})]})}function rs({columnId:e,onAdd:t,onCancel:n}){let[r,o]=(0,T.useState)(""),[i,a]=(0,T.useState)("");return(0,m.jsxs)("div",{className:"kf-newitem",children:[(0,m.jsx)("input",{className:"kf-input",autoFocus:!0,placeholder:"Item name",value:r,onChange:s=>o(s.target.value),onKeyDown:s=>{s.key==="Enter"&&r.trim()&&t(r,i),s.key==="Escape"&&n()}}),(0,m.jsx)("textarea",{className:"kf-textarea",placeholder:"Description (optional)",value:i,onChange:s=>a(s.target.value)}),(0,m.jsxs)("div",{className:"kf-newitem-row",children:[(0,m.jsx)("button",{type:"button",className:"kf-btn kf-ghost",onClick:n,children:"Cancel"}),(0,m.jsxs)("button",{type:"button",className:"kf-btn kf-primary",disabled:!r.trim(),onClick:()=>t(r,i),children:["Add to ",Le[e]]})]})]})}function os({colId:e,highlighted:t,adding:n,items:r,flashIds:o,lastLines:i,onAdd:a,onCancelAdd:s,onOpenSession:l,onEdit:u,onArchive:f}){let{setNodeRef:c}=mr({id:e});return(0,m.jsxs)("div",{className:"kf-column kf-"+e+(t?" kf-over":""),children:[(0,m.jsxs)("div",{className:"kf-column-head",children:[(0,m.jsx)("span",{className:"kf-column-dot"}),(0,m.jsx)("span",{className:"kf-column-title",children:Le[e]})]}),(0,m.jsxs)("div",{className:"kf-column-list",ref:c,children:[n&&(0,m.jsx)(rs,{columnId:e,onAdd:a,onCancel:s}),r.length===0&&!n&&(0,m.jsx)("div",{className:"kf-column-empty",children:"No items"}),r.map(p=>(0,m.jsx)(ns,{item:p,flash:o.has(p.id),lastActivity:i.get(p.id),onOpenSession:()=>l(p),onEdit:()=>u(p),onArchive:()=>f(p)},p.id))]})]})}function eo(e){let{workspaceId:t,workspaceTitle:n,sessions:r,archiveSession:o}=e,[i,a]=(0,T.useState)(null),[s,l]=(0,T.useState)(""),[u,f]=(0,T.useState)([]),[c,p]=(0,T.useState)(null),[g,y]=(0,T.useState)(null),[h,b]=(0,T.useState)(!1),[w,k]=(0,T.useState)(!1),[x,O]=(0,T.useState)(null),[D,N]=(0,T.useState)(null),C=(0,T.useSyncExternalStore)(zt,Pt),[I,L]=(0,T.useState)(null),[F,B]=(0,T.useState)(new Set),Z=(0,T.useRef)(null),ne=Xn(Yn(He,{activationConstraint:{distance:6}})),V=(0,T.useCallback)(v=>{if(v&&v.board){let S={...v.board,activities:Array.isArray(v.board.activities)?v.board.activities:[]},M=Z.current;if(M){let q=new Set;for(let P of S.items){let Ie=M.get(P.id);Ie&&Ie!==P.columnId+"|"+P.name+"|"+P.description&&q.add(P.id)}q.size>0&&(B(q),window.setTimeout(()=>B(new Set),1500))}Z.current=new Map(S.items.map(q=>[q.id,q.columnId+"|"+q.name+"|"+q.description])),a(S),l(""),Cr(t,S)}v&&typeof v.error=="string"&&v.error&&l(v.error),Array.isArray(v&&v.warnings)&&v.warnings.length>0&&f(S=>[...S,...v.warnings])},[t]),Y=(0,T.useCallback)((v,S={})=>ke(v,S,t).then(V),[t,V]);(0,T.useEffect)(()=>{let v=!1,S=()=>ke("get",{},t).then(q=>{v||V(q)});S();let M=window.setInterval(S,3e3);return()=>{v=!0,window.clearInterval(M)}},[t,V]),(0,T.useEffect)(()=>{i&&!i.codeConfirmed&&!h&&b(!0)},[i&&i.codeConfirmed]);let Ye=(0,T.useCallback)(v=>{if(!v.sessionId||!r)return;let S=r.list?.getSnapshot?.()?.current;if(S!==void 0&&S===v.sessionId){qt();return}r.open(v.sessionId)},[r]),re=v=>{let S=i?.items.find(M=>M.id===String(v.active.id));S&&O(S)},bt=v=>{let S=v.over?String(v.over.id):null;L(Bt.includes(S)?S:null)},ue=v=>{O(null);let{active:S,over:M}=v;if(!M||!i)return;let q=String(S.id),P=String(M.id),oe=Bt.includes(P)?P:i.items.find(ie=>ie.id===P)?.columnId;if(!oe)return;let Ge=i.items.find(ie=>ie.id===q);!Ge||Ge.columnId===oe||Y("moveItem",{id:q,toColumn:oe})},Xe=v=>{c&&(c.item?Y("updateItem",{id:c.item.id,name:v.name,description:v.description}):Y("createItem",{name:v.name,description:v.description,columnId:c.columnId}),p(null))},wt=v=>{if(C){N(v);return}ae(v)},ae=v=>{Y("deleteItem",{id:v.id}),v.sessionId&&o&&o(v.sessionId)},ge=(0,T.useMemo)(()=>{let v=new Map;for(let S of i?.activities??[])S.itemId&&v.set(S.itemId,Ar(S));return v},[i]),Be=i&&(0,m.jsxs)("div",{className:"kf-header",children:[(0,m.jsxs)("span",{className:"kf-header-title",children:[(0,m.jsx)("span",{className:"kf-code-chip",children:i.code}),n||"Board"]}),(0,m.jsxs)("span",{className:"kf-count-chip",children:[i.items.length," items"]}),(0,m.jsxs)("button",{type:"button",className:"kf-btn kf-primary kf-new-item-btn",title:"New item (created in Backlog)","aria-label":"Create a new item in Backlog",onClick:()=>y("backlog"),children:[(0,m.jsx)(Ve,{path:Zi,size:15}),"New item"]}),(0,m.jsx)("span",{className:"kf-spacer"}),(0,m.jsx)("button",{type:"button",className:"kf-iconbtn",title:"Refresh","aria-label":"Refresh board",onClick:()=>Y("get"),children:(0,m.jsx)(Ve,{path:"M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6"})}),(0,m.jsx)("button",{type:"button",className:"kf-iconbtn",title:"Board settings","aria-label":"Board settings",onClick:()=>k(v=>!v),children:(0,m.jsx)(Ve,{path:Qi})}),w&&(0,m.jsx)(Zr,{board:i,onCode:v=>Y("setCode",{code:v}).then(()=>b(!1)),onConfirmRequired:v=>Y("setConfirmRequired",{value:v}),onClose:()=>k(!1)})]}),yt=i&&(0,m.jsx)("div",{className:"kf-body",children:(0,m.jsx)("div",{className:"kf-columns",children:Bt.map(v=>{let S=(i.items??[]).filter(M=>M.columnId===v);return(0,m.jsx)(os,{colId:v,highlighted:I===v&&x!==null,adding:g===v&&v==="backlog",items:S,flashIds:F,lastLines:ge,onAdd:(M,q)=>{Y("createItem",{name:M,description:q,columnId:"backlog"}),y(null)},onCancelAdd:()=>y(null),onOpenSession:Ye,onEdit:M=>p({item:M,columnId:M.columnId}),onArchive:wt},v)})})});return(0,m.jsxs)("div",{className:"kf-root",children:[u.length>0&&(0,m.jsxs)("div",{className:"kf-warning",children:[u.map((v,S)=>(0,m.jsx)("div",{children:v},S)),(0,m.jsx)("button",{type:"button",className:"kf-btn kf-ghost",onClick:()=>f([]),children:"Dismiss"})]}),Be,s&&(0,m.jsx)("div",{className:"kf-error kf-loading",children:s}),i?(0,m.jsxs)(vr,{sensors:ne,collisionDetection:Gi,onDragStart:re,onDragOver:bt,onDragEnd:ue,children:[yt,(0,m.jsx)(br,{dropAnimation:{duration:220,easing:"cubic-bezier(0.2, 0, 0, 1)"},children:x?(0,m.jsxs)("div",{className:"kf-card kf-drag-ghost",style:{width:240,"--kf-card-accent":"var(--kf-accent, var(--dsw-alias-label-secondary))"},children:[(0,m.jsx)("div",{className:"kf-card-id",children:x.id}),(0,m.jsx)("div",{className:"kf-card-name",children:x.name})]}):null})]}):!s&&(0,m.jsx)("div",{className:"kf-loading",children:"Loading board\u2026"}),i&&c&&(0,m.jsx)(Gr,{item:c.item,board:i,onOpenChange:v=>{v||p(null)},onSave:Xe,onDelete:v=>{let S=i.items.find(M=>M.id===v);Y("deleteItem",{id:v}),S&&S.sessionId&&o&&o(S.sessionId),p(null)},onOpenSession:Ye}),D&&(0,m.jsx)(Xr,{item:D,onConfirm:()=>{ae(D),N(null)},onCancel:()=>N(null)}),i&&h&&(0,m.jsx)(Jr,{code:i.code,itemCount:i.items.length,onConfirm:v=>Y("setCode",{code:v}).then(()=>b(!1)),onDismiss:()=>b(!1)})]})}function is(e){let t={items:[]};return!e||!e.list||typeof e.list.getSnapshot!="function"?t:(0,W.useSyncExternalStore)(n=>e.list.subscribe(n),()=>e.list.getSnapshot())}function ss(e){if(!(!e||!e.list||typeof e.list.getSnapshot!="function"))return(0,W.useSyncExternalStore)(t=>e.list.subscribe(t),()=>e.list.getSnapshot().current)}function as(e){let t=is(e.workspaces),n=(0,W.useSyncExternalStore)(qr,$r),r=ss(e.sessions)??e.sessionId,o=Br({override:n,currentSessionId:r,workspaceItems:Array.isArray(t.items)?t.items:[],recentWorkspaceId:t.recentWorkspaceId});(0,W.useEffect)(()=>{n&&o.nativeWorkspaceId===n.workspaceId&&vt(null)},[n,o.nativeWorkspaceId]);let i=e.workspaces?.archiveSession?a=>{e.workspaces.archiveSession(a)}:void 0;return(0,W.createElement)(eo,{workspaceId:o.workspaceId,workspaceTitle:o.pinned?o.workspaceTitle||o.workspaceId:o.workspaceTitle,sessions:e.sessions,archiveSession:i})}function ls(){return(0,W.createElement)(Qr)}function cs(e){return(0,W.useEffect)(()=>{let t=e.sessions;t&&xr({createSession:n=>t.create({workspaceId:n}),renameSession:async(n,r)=>{let i=await t.binding(n)?.session.rename(r);i&&i.ok===!1&&console.warn("dsh-kanban-flow: rename failed",i.error)},promptSession:async(n,r)=>{let o=t.binding(n);if(!o)throw new Error("session binding unavailable: "+n);let i=await o.session.prompt([{type:"text",text:r}],"queue");if(i&&i.ok===!1)throw new Error("prompt failed: "+(i.error&&i.error.message))},archiveSession:async n=>{let r=e.workspaces?.archiveSession;if(!r)throw new Error("workspaces.archiveSession unavailable");await r(n)}})},[e.sessions,e.workspaces]),(0,W.createElement)("div",{style:{display:"contents"}},(0,W.createElement)(Kr,{workspaces:e.workspaces,sessions:e.sessions}),(0,W.createElement)(Hr,{workspaces:e.workspaces,sessions:e.sessions}),(0,W.createElement)(Fr),(0,W.createElement)(Yr,{workspaces:e.workspaces}),(0,W.createElement)(Ur,{workspaces:e.workspaces}),(0,W.createElement)(Vr,{workspaces:e.workspaces}))}var to={name:"dsh-kanban-flow",inject:["slots"],apply(e){let t=e.get("slots");if(t===void 0)return;let n=e.get("workspaces"),r=e.get("sessions");t.inject("conversation.view",()=>t.register({name:"conversation.view",id:"kanban-flow",order:20,label:"Board"},o=>(0,W.createElement)(as,{...o,workspaces:n,sessions:r}))),t.inject("settings.plugins.tab",()=>t.register({name:"settings.plugins.tab",id:"dsh-kanban-flow",order:10,label:"Kanban Flow"},()=>(0,W.createElement)(ls))),t.inject("sidebar.footer.action",()=>t.register({name:"sidebar.footer.action",id:"kanban-flow-controllers",order:90},()=>(0,W.createElement)(cs,{workspaces:n,sessions:r})))}};try{console.info("[dsh-kanban-flow] client bundle loaded (build 2026-08-31T11:14:41.693Z)")}catch{}var no="data-dsh-kanban-flow-style";if(typeof document<"u"&&!document.querySelector("style["+no+"]")){let e=document.createElement("style");e.setAttribute(no,""),e.textContent=An,document.head.appendChild(e)}var ds=to;
    
    return module.exports
  },
})