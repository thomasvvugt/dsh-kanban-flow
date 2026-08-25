window.__ModuleLoader__.load({
  id: "dsh-kanban-flow",
  factory: function (require) {
    var module = { exports: {} }
    var exports = module.exports
    "use strict";var uo=Object.create;var Ct=Object.defineProperty;var fo=Object.getOwnPropertyDescriptor;var po=Object.getOwnPropertyNames;var go=Object.getPrototypeOf,vo=Object.prototype.hasOwnProperty;var mo=(e,t)=>{for(var n in t)Ct(e,n,{get:t[n],enumerable:!0})},In=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of po(t))!vo.call(e,o)&&o!==n&&Ct(e,o,{get:()=>t[o],enumerable:!(r=fo(t,o))||r.enumerable});return e};var Dn=(e,t,n)=>(n=e!=null?uo(go(e)):{},In(t||!e||!e.__esModule?Ct(n,"default",{value:e,enumerable:!0}):n,e)),ho=e=>In(Ct({},"__esModule",{value:!0}),e);var ds={};mo(ds,{default:()=>cs});module.exports=ho(ds);var En=`/* dsh-kanban-flow client styles \u2014 kf-* namespace.
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
    
    .kf-body {
      flex: 1;
      min-height: 0;
      display: flex;
      gap: 12px;
      padding: 14px 18px 18px;
      overflow-x: auto;
      overflow-y: hidden;
    }
    
    /* ---------------------------------------------------------------- column */
    .kf-column {
      --kf-accent: var(--dsw-alias-label-secondary);
      flex: 0 0 264px;
      width: 264px;
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
    .kf-newitem-row { display: flex; gap: 6px; justify-content: flex-end; }
    
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
    `;var W=require("react");var T=require("react");var d=Dn(require("react")),Re=require("react-dom");var z=require("react");var tt=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function De(e){let t=Object.prototype.toString.call(e);return t==="[object Window]"||t==="[object global]"}function It(e){return"nodeType"in e}function _(e){var t,n;return e?De(e)?e:It(e)&&(t=(n=e.ownerDocument)==null?void 0:n.defaultView)!=null?t:window:window}function Dt(e){let{Document:t}=_(e);return e instanceof t}function $e(e){return De(e)?!1:e instanceof _(e).HTMLElement}function Xt(e){return e instanceof _(e).SVGElement}function Ee(e){return e?De(e)?e.document:It(e)?Dt(e)?e:$e(e)||Xt(e)?e.ownerDocument:document:document:document}var de=tt?z.useLayoutEffect:z.useEffect;function nt(e){let t=(0,z.useRef)(e);return de(()=>{t.current=e}),(0,z.useCallback)(function(){for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return t.current==null?void 0:t.current(...r)},[])}function Nn(){let e=(0,z.useRef)(null),t=(0,z.useCallback)((r,o)=>{e.current=setInterval(r,o)},[]),n=(0,z.useCallback)(()=>{e.current!==null&&(clearInterval(e.current),e.current=null)},[]);return[t,n]}function Ke(e,t){t===void 0&&(t=[e]);let n=(0,z.useRef)(e);return de(()=>{n.current!==e&&(n.current=e)},t),n}function He(e,t){let n=(0,z.useRef)();return(0,z.useMemo)(()=>{let r=e(n.current);return n.current=r,r},[...t])}function rt(e){let t=nt(e),n=(0,z.useRef)(null),r=(0,z.useCallback)(o=>{o!==n.current&&t?.(o,n.current),n.current=o},[]);return[n,r]}function ot(e){let t=(0,z.useRef)();return(0,z.useEffect)(()=>{t.current=e},[e]),t.current}var Vt={};function it(e,t){return(0,z.useMemo)(()=>{if(t)return t;let n=Vt[e]==null?0:Vt[e]+1;return Vt[e]=n,e+"-"+n},[e,t])}function Rn(e){return function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return r.reduce((i,a)=>{let s=Object.entries(a);for(let[l,u]of s){let f=i[l];f!=null&&(i[l]=f+e*u)}return i},{...t})}}var Ae=Rn(1),st=Rn(-1);function yo(e){return"clientX"in e&&"clientY"in e}function Et(e){if(!e)return!1;let{KeyboardEvent:t}=_(e.target);return t&&e instanceof t}function wo(e){if(!e)return!1;let{TouchEvent:t}=_(e.target);return t&&e instanceof t}function at(e){if(wo(e)){if(e.touches&&e.touches.length){let{clientX:t,clientY:n}=e.touches[0];return{x:t,y:n}}else if(e.changedTouches&&e.changedTouches.length){let{clientX:t,clientY:n}=e.changedTouches[0];return{x:t,y:n}}}return yo(e)?{x:e.clientX,y:e.clientY}:null}var Fe=Object.freeze({Translate:{toString(e){if(!e)return;let{x:t,y:n}=e;return"translate3d("+(t?Math.round(t):0)+"px, "+(n?Math.round(n):0)+"px, 0)"}},Scale:{toString(e){if(!e)return;let{scaleX:t,scaleY:n}=e;return"scaleX("+t+") scaleY("+n+")"}},Transform:{toString(e){if(e)return[Fe.Translate.toString(e),Fe.Scale.toString(e)].join(" ")}},Transition:{toString(e){let{property:t,duration:n,easing:r}=e;return t+" "+n+"ms "+r}}}),An="a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]";function Tn(e){return e.matches(An)?e:e.querySelector(An)}var Ne=Dn(require("react")),ko={display:"none"};function On(e){let{id:t,value:n}=e;return Ne.default.createElement("div",{id:t,style:ko},n)}function Ln(e){let{id:t,announcement:n,ariaLiveType:r="assertive"}=e,o={position:"fixed",top:0,left:0,width:1,height:1,margin:-1,border:0,padding:0,overflow:"hidden",clip:"rect(0 0 0 0)",clipPath:"inset(100%)",whiteSpace:"nowrap"};return Ne.default.createElement("div",{id:t,style:o,role:"status","aria-live":r,"aria-atomic":!0},n)}function Bn(){let[e,t]=(0,Ne.useState)("");return{announce:(0,Ne.useCallback)(r=>{r!=null&&t(r)},[]),announcement:e}}var Un=(0,d.createContext)(null);function xo(e){let t=(0,d.useContext)(Un);(0,d.useEffect)(()=>{if(!t)throw new Error("useDndMonitor must be used within a children of <DndContext>");return t(e)},[e,t])}function So(){let[e]=(0,d.useState)(()=>new Set),t=(0,d.useCallback)(r=>(e.add(r),()=>e.delete(r)),[e]);return[(0,d.useCallback)(r=>{let{type:o,event:i}=r;e.forEach(a=>{var s;return(s=a[o])==null?void 0:s.call(a,i)})},[e]),t]}var Co={draggable:`
        To pick up a draggable item, press the space bar.
        While dragging, use the arrow keys to move the item.
        Press space again to drop the item in its new position, or press escape to cancel.
      `},Io={onDragStart(e){let{active:t}=e;return"Picked up draggable item "+t.id+"."},onDragOver(e){let{active:t,over:n}=e;return n?"Draggable item "+t.id+" was moved over droppable area "+n.id+".":"Draggable item "+t.id+" is no longer over a droppable area."},onDragEnd(e){let{active:t,over:n}=e;return n?"Draggable item "+t.id+" was dropped over droppable area "+n.id:"Draggable item "+t.id+" was dropped."},onDragCancel(e){let{active:t}=e;return"Dragging was cancelled. Draggable item "+t.id+" was dropped."}};function Do(e){let{announcements:t=Io,container:n,hiddenTextDescribedById:r,screenReaderInstructions:o=Co}=e,{announce:i,announcement:a}=Bn(),s=it("DndLiveRegion"),[l,u]=(0,d.useState)(!1);if((0,d.useEffect)(()=>{u(!0)},[]),xo((0,d.useMemo)(()=>({onDragStart(c){let{active:p}=c;i(t.onDragStart({active:p}))},onDragMove(c){let{active:p,over:g}=c;t.onDragMove&&i(t.onDragMove({active:p,over:g}))},onDragOver(c){let{active:p,over:g}=c;i(t.onDragOver({active:p,over:g}))},onDragEnd(c){let{active:p,over:g}=c;i(t.onDragEnd({active:p,over:g}))},onDragCancel(c){let{active:p,over:g}=c;i(t.onDragCancel({active:p,over:g}))}}),[i,t])),!l)return null;let f=d.default.createElement(d.default.Fragment,null,d.default.createElement(On,{id:r,value:o.draggable}),d.default.createElement(Ln,{id:s,announcement:a}));return n?(0,Re.createPortal)(f,n):f}var $;(function(e){e.DragStart="dragStart",e.DragMove="dragMove",e.DragEnd="dragEnd",e.DragCancel="dragCancel",e.DragOver="dragOver",e.RegisterDroppable="registerDroppable",e.SetDroppableDisabled="setDroppableDisabled",e.UnregisterDroppable="unregisterDroppable"})($||($={}));function Nt(){}function Vn(e,t){return(0,d.useMemo)(()=>({sensor:e,options:t??{}}),[e,t])}function Xn(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return(0,d.useMemo)(()=>[...t].filter(r=>r!=null),[...t])}var se=Object.freeze({x:0,y:0});function Yn(e,t){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))}function Eo(e,t){let n=at(e);if(!n)return"0 0";let r={x:(n.x-t.left)/t.width*100,y:(n.y-t.top)/t.height*100};return r.x+"% "+r.y+"%"}function Gn(e,t){let{data:{value:n}}=e,{data:{value:r}}=t;return n-r}function Ao(e,t){let{data:{value:n}}=e,{data:{value:r}}=t;return r-n}function Zt(e){let{left:t,top:n,height:r,width:o}=e;return[{x:t,y:n},{x:t+o,y:n},{x:t,y:n+r},{x:t+o,y:n+r}]}function No(e,t){if(!e||e.length===0)return null;let[n]=e;return t?n[t]:n}var Jn=e=>{let{collisionRect:t,droppableRects:n,droppableContainers:r}=e,o=Zt(t),i=[];for(let a of r){let{id:s}=a,l=n.get(s);if(l){let u=Zt(l),f=o.reduce((p,g,w)=>p+Yn(u[w],g),0),c=Number((f/4).toFixed(4));i.push({id:s,data:{droppableContainer:a,value:c}})}}return i.sort(Gn)};function Ro(e,t){let n=Math.max(t.top,e.top),r=Math.max(t.left,e.left),o=Math.min(t.left+t.width,e.left+e.width),i=Math.min(t.top+t.height,e.top+e.height),a=o-r,s=i-n;if(r<o&&n<i){let l=t.width*t.height,u=e.width*e.height,f=a*s,c=f/(l+u-f);return Number(c.toFixed(4))}return 0}var on=e=>{let{collisionRect:t,droppableRects:n,droppableContainers:r}=e,o=[];for(let i of r){let{id:a}=i,s=n.get(a);if(s){let l=Ro(s,t);l>0&&o.push({id:a,data:{droppableContainer:i,value:l}})}}return o.sort(Ao)};function To(e,t){let{top:n,left:r,bottom:o,right:i}=t;return n<=e.y&&e.y<=o&&r<=e.x&&e.x<=i}var Zn=e=>{let{droppableContainers:t,droppableRects:n,pointerCoordinates:r}=e;if(!r)return[];let o=[];for(let i of t){let{id:a}=i,s=n.get(a);if(s&&To(r,s)){let u=Zt(s).reduce((c,p)=>c+Yn(r,p),0),f=Number((u/4).toFixed(4));o.push({id:a,data:{droppableContainer:i,value:f}})}}return o.sort(Gn)};function Oo(e,t,n){return{...e,scaleX:t&&n?t.width/n.width:1,scaleY:t&&n?t.height/n.height:1}}function Qn(e,t){return e&&t?{x:e.left-t.left,y:e.top-t.top}:se}function Lo(e){return function(n){for(var r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return o.reduce((a,s)=>({...a,top:a.top+e*s.y,bottom:a.bottom+e*s.y,left:a.left+e*s.x,right:a.right+e*s.x}),{...n})}}var Bo=Lo(1);function er(e){if(e.startsWith("matrix3d(")){let t=e.slice(9,-1).split(/, /);return{x:+t[12],y:+t[13],scaleX:+t[0],scaleY:+t[5]}}else if(e.startsWith("matrix(")){let t=e.slice(7,-1).split(/, /);return{x:+t[4],y:+t[5],scaleX:+t[0],scaleY:+t[3]}}return null}function Mo(e,t,n){let r=er(t);if(!r)return e;let{scaleX:o,scaleY:i,x:a,y:s}=r,l=e.left-a-(1-o)*parseFloat(n),u=e.top-s-(1-i)*parseFloat(n.slice(n.indexOf(" ")+1)),f=o?e.width/o:e.width,c=i?e.height/i:e.height;return{width:f,height:c,top:u,right:l+f,bottom:u+c,left:l}}var Po={ignoreTransform:!1};function ft(e,t){t===void 0&&(t=Po);let n=e.getBoundingClientRect();if(t.ignoreTransform){let{transform:u,transformOrigin:f}=_(e).getComputedStyle(e);u&&(n=Mo(n,u,f))}let{top:r,left:o,width:i,height:a,bottom:s,right:l}=n;return{top:r,left:o,width:i,height:a,bottom:s,right:l}}function Mn(e){return ft(e,{ignoreTransform:!0})}function zo(e){let t=e.innerWidth,n=e.innerHeight;return{top:0,left:0,right:t,bottom:n,width:t,height:n}}function Wo(e,t){return t===void 0&&(t=_(e).getComputedStyle(e)),t.position==="fixed"}function Fo(e,t){t===void 0&&(t=_(e).getComputedStyle(e));let n=/(auto|scroll|overlay)/;return["overflow","overflowX","overflowY"].some(o=>{let i=t[o];return typeof i=="string"?n.test(i):!1})}function sn(e,t){let n=[];function r(o){if(t!=null&&n.length>=t||!o)return n;if(Dt(o)&&o.scrollingElement!=null&&!n.includes(o.scrollingElement))return n.push(o.scrollingElement),n;if(!$e(o)||Xt(o)||n.includes(o))return n;let i=_(e).getComputedStyle(o);return o!==e&&Fo(o,i)&&n.push(o),Wo(o,i)?n:r(o.parentNode)}return e?r(e):n}function tr(e){let[t]=sn(e,1);return t??null}function Yt(e){return!tt||!e?null:De(e)?e:It(e)?Dt(e)||e===Ee(e).scrollingElement?window:$e(e)?e:null:null}function nr(e){return De(e)?e.scrollX:e.scrollLeft}function rr(e){return De(e)?e.scrollY:e.scrollTop}function Qt(e){return{x:nr(e),y:rr(e)}}var H;(function(e){e[e.Forward=1]="Forward",e[e.Backward=-1]="Backward"})(H||(H={}));function or(e){return!tt||!e?!1:e===document.scrollingElement}function ir(e){let t={x:0,y:0},n=or(e)?{height:window.innerHeight,width:window.innerWidth}:{height:e.clientHeight,width:e.clientWidth},r={x:e.scrollWidth-n.width,y:e.scrollHeight-n.height},o=e.scrollTop<=t.y,i=e.scrollLeft<=t.x,a=e.scrollTop>=r.y,s=e.scrollLeft>=r.x;return{isTop:o,isLeft:i,isBottom:a,isRight:s,maxScroll:r,minScroll:t}}var $o={x:.2,y:.2};function Ko(e,t,n,r,o){let{top:i,left:a,right:s,bottom:l}=n;r===void 0&&(r=10),o===void 0&&(o=$o);let{isTop:u,isBottom:f,isLeft:c,isRight:p}=ir(e),g={x:0,y:0},w={x:0,y:0},m={height:t.height*o.y,width:t.width*o.x};return!u&&i<=t.top+m.height?(g.y=H.Backward,w.y=r*Math.abs((t.top+m.height-i)/m.height)):!f&&l>=t.bottom-m.height&&(g.y=H.Forward,w.y=r*Math.abs((t.bottom-m.height-l)/m.height)),!p&&s>=t.right-m.width?(g.x=H.Forward,w.x=r*Math.abs((t.right-m.width-s)/m.width)):!c&&a<=t.left+m.width&&(g.x=H.Backward,w.x=r*Math.abs((t.left+m.width-a)/m.width)),{direction:g,speed:w}}function Ho(e){if(e===document.scrollingElement){let{innerWidth:i,innerHeight:a}=window;return{top:0,left:0,right:i,bottom:a,width:i,height:a}}let{top:t,left:n,right:r,bottom:o}=e.getBoundingClientRect();return{top:t,left:n,right:r,bottom:o,width:e.clientWidth,height:e.clientHeight}}function sr(e){return e.reduce((t,n)=>Ae(t,Qt(n)),se)}function jo(e){return e.reduce((t,n)=>t+nr(n),0)}function qo(e){return e.reduce((t,n)=>t+rr(n),0)}function ar(e,t){if(t===void 0&&(t=ft),!e)return;let{top:n,left:r,bottom:o,right:i}=t(e);tr(e)&&(o<=0||i<=0||n>=window.innerHeight||r>=window.innerWidth)&&e.scrollIntoView({block:"center",inline:"center"})}var _o=[["x",["left","right"],jo],["y",["top","bottom"],qo]],ct=class{constructor(t,n){this.rect=void 0,this.width=void 0,this.height=void 0,this.top=void 0,this.bottom=void 0,this.right=void 0,this.left=void 0;let r=sn(n),o=sr(r);this.rect={...t},this.width=t.width,this.height=t.height;for(let[i,a,s]of _o)for(let l of a)Object.defineProperty(this,l,{get:()=>{let u=s(r),f=o[i]-u;return this.rect[l]+f},enumerable:!0});Object.defineProperty(this,"rect",{enumerable:!1})}},Te=class{constructor(t){this.target=void 0,this.listeners=[],this.removeAll=()=>{this.listeners.forEach(n=>{var r;return(r=this.target)==null?void 0:r.removeEventListener(...n)})},this.target=t}add(t,n,r){var o;(o=this.target)==null||o.addEventListener(t,n,r),this.listeners.push([t,n,r])}};function Uo(e){let{EventTarget:t}=_(e);return e instanceof t?e:Ee(e)}function Gt(e,t){let n=Math.abs(e.x),r=Math.abs(e.y);return typeof t=="number"?Math.sqrt(n**2+r**2)>t:"x"in t&&"y"in t?n>t.x&&r>t.y:"x"in t?n>t.x:"y"in t?r>t.y:!1}var ee;(function(e){e.Click="click",e.DragStart="dragstart",e.Keydown="keydown",e.ContextMenu="contextmenu",e.Resize="resize",e.SelectionChange="selectionchange",e.VisibilityChange="visibilitychange"})(ee||(ee={}));function Pn(e){e.preventDefault()}function Vo(e){e.stopPropagation()}var R;(function(e){e.Space="Space",e.Down="ArrowDown",e.Right="ArrowRight",e.Left="ArrowLeft",e.Up="ArrowUp",e.Esc="Escape",e.Enter="Enter",e.Tab="Tab"})(R||(R={}));var lr={start:[R.Space,R.Enter],cancel:[R.Esc],end:[R.Space,R.Enter,R.Tab]},Xo=(e,t)=>{let{currentCoordinates:n}=t;switch(e.code){case R.Right:return{...n,x:n.x+25};case R.Left:return{...n,x:n.x-25};case R.Down:return{...n,y:n.y+25};case R.Up:return{...n,y:n.y-25}}},Rt=class{constructor(t){this.props=void 0,this.autoScrollEnabled=!1,this.referenceCoordinates=void 0,this.listeners=void 0,this.windowListeners=void 0,this.props=t;let{event:{target:n}}=t;this.props=t,this.listeners=new Te(Ee(n)),this.windowListeners=new Te(_(n)),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleCancel=this.handleCancel.bind(this),this.attach()}attach(){this.handleStart(),this.windowListeners.add(ee.Resize,this.handleCancel),this.windowListeners.add(ee.VisibilityChange,this.handleCancel),setTimeout(()=>this.listeners.add(ee.Keydown,this.handleKeyDown))}handleStart(){let{activeNode:t,onStart:n}=this.props,r=t.node.current;r&&ar(r),n(se)}handleKeyDown(t){if(Et(t)){let{active:n,context:r,options:o}=this.props,{keyboardCodes:i=lr,coordinateGetter:a=Xo,scrollBehavior:s="smooth"}=o,{code:l}=t;if(i.end.includes(l)){this.handleEnd(t);return}if(i.cancel.includes(l)){this.handleCancel(t);return}let{collisionRect:u}=r.current,f=u?{x:u.left,y:u.top}:se;this.referenceCoordinates||(this.referenceCoordinates=f);let c=a(t,{active:n,context:r.current,currentCoordinates:f});if(c){let p=st(c,f),g={x:0,y:0},{scrollableAncestors:w}=r.current;for(let m of w){let b=t.code,{isTop:y,isRight:k,isLeft:x,isBottom:O,maxScroll:D,minScroll:N}=ir(m),C=Ho(m),I={x:Math.min(b===R.Right?C.right-C.width/2:C.right,Math.max(b===R.Right?C.left:C.left+C.width/2,c.x)),y:Math.min(b===R.Down?C.bottom-C.height/2:C.bottom,Math.max(b===R.Down?C.top:C.top+C.height/2,c.y))},L=b===R.Right&&!k||b===R.Left&&!x,F=b===R.Down&&!O||b===R.Up&&!y;if(L&&I.x!==c.x){let B=m.scrollLeft+p.x,Z=b===R.Right&&B<=D.x||b===R.Left&&B>=N.x;if(Z&&!p.y){m.scrollTo({left:B,behavior:s});return}Z?g.x=m.scrollLeft-B:g.x=b===R.Right?m.scrollLeft-D.x:m.scrollLeft-N.x,g.x&&m.scrollBy({left:-g.x,behavior:s});break}else if(F&&I.y!==c.y){let B=m.scrollTop+p.y,Z=b===R.Down&&B<=D.y||b===R.Up&&B>=N.y;if(Z&&!p.x){m.scrollTo({top:B,behavior:s});return}Z?g.y=m.scrollTop-B:g.y=b===R.Down?m.scrollTop-D.y:m.scrollTop-N.y,g.y&&m.scrollBy({top:-g.y,behavior:s});break}}this.handleMove(t,Ae(st(c,this.referenceCoordinates),g))}}}handleMove(t,n){let{onMove:r}=this.props;t.preventDefault(),r(n)}handleEnd(t){let{onEnd:n}=this.props;t.preventDefault(),this.detach(),n()}handleCancel(t){let{onCancel:n}=this.props;t.preventDefault(),this.detach(),n()}detach(){this.listeners.removeAll(),this.windowListeners.removeAll()}};Rt.activators=[{eventName:"onKeyDown",handler:(e,t,n)=>{let{keyboardCodes:r=lr,onActivation:o}=t,{active:i}=n,{code:a}=e.nativeEvent;if(r.start.includes(a)){let s=i.activatorNode.current;return s&&e.target!==s?!1:(e.preventDefault(),o?.({event:e.nativeEvent}),!0)}return!1}}];function zn(e){return!!(e&&"distance"in e)}function Wn(e){return!!(e&&"delay"in e)}var dt=class{constructor(t,n,r){var o;r===void 0&&(r=Uo(t.event.target)),this.props=void 0,this.events=void 0,this.autoScrollEnabled=!0,this.document=void 0,this.activated=!1,this.initialCoordinates=void 0,this.timeoutId=null,this.listeners=void 0,this.documentListeners=void 0,this.windowListeners=void 0,this.props=t,this.events=n;let{event:i}=t,{target:a}=i;this.props=t,this.events=n,this.document=Ee(a),this.documentListeners=new Te(this.document),this.listeners=new Te(r),this.windowListeners=new Te(_(a)),this.initialCoordinates=(o=at(i))!=null?o:se,this.handleStart=this.handleStart.bind(this),this.handleMove=this.handleMove.bind(this),this.handleEnd=this.handleEnd.bind(this),this.handleCancel=this.handleCancel.bind(this),this.handleKeydown=this.handleKeydown.bind(this),this.removeTextSelection=this.removeTextSelection.bind(this),this.attach()}attach(){let{events:t,props:{options:{activationConstraint:n,bypassActivationConstraint:r}}}=this;if(this.listeners.add(t.move.name,this.handleMove,{passive:!1}),this.listeners.add(t.end.name,this.handleEnd),t.cancel&&this.listeners.add(t.cancel.name,this.handleCancel),this.windowListeners.add(ee.Resize,this.handleCancel),this.windowListeners.add(ee.DragStart,Pn),this.windowListeners.add(ee.VisibilityChange,this.handleCancel),this.windowListeners.add(ee.ContextMenu,Pn),this.documentListeners.add(ee.Keydown,this.handleKeydown),n){if(r!=null&&r({event:this.props.event,activeNode:this.props.activeNode,options:this.props.options}))return this.handleStart();if(Wn(n)){this.timeoutId=setTimeout(this.handleStart,n.delay),this.handlePending(n);return}if(zn(n)){this.handlePending(n);return}}this.handleStart()}detach(){this.listeners.removeAll(),this.windowListeners.removeAll(),setTimeout(this.documentListeners.removeAll,50),this.timeoutId!==null&&(clearTimeout(this.timeoutId),this.timeoutId=null)}handlePending(t,n){let{active:r,onPending:o}=this.props;o(r,t,this.initialCoordinates,n)}handleStart(){let{initialCoordinates:t}=this,{onStart:n}=this.props;t&&(this.activated=!0,this.documentListeners.add(ee.Click,Vo,{capture:!0}),this.removeTextSelection(),this.documentListeners.add(ee.SelectionChange,this.removeTextSelection),n(t))}handleMove(t){var n;let{activated:r,initialCoordinates:o,props:i}=this,{onMove:a,options:{activationConstraint:s}}=i;if(!o)return;let l=(n=at(t))!=null?n:se,u=st(o,l);if(!r&&s){if(zn(s)){if(s.tolerance!=null&&Gt(u,s.tolerance))return this.handleCancel();if(Gt(u,s.distance))return this.handleStart()}if(Wn(s)&&Gt(u,s.tolerance))return this.handleCancel();this.handlePending(s,u);return}t.cancelable&&t.preventDefault(),a(l)}handleEnd(){let{onAbort:t,onEnd:n}=this.props;this.detach(),this.activated||t(this.props.active),n()}handleCancel(){let{onAbort:t,onCancel:n}=this.props;this.detach(),this.activated||t(this.props.active),n()}handleKeydown(t){t.code===R.Esc&&this.handleCancel()}removeTextSelection(){var t;(t=this.document.getSelection())==null||t.removeAllRanges()}},Yo={cancel:{name:"pointercancel"},move:{name:"pointermove"},end:{name:"pointerup"}},je=class extends dt{constructor(t){let{event:n}=t,r=Ee(n.target);super(t,Yo,r)}};je.activators=[{eventName:"onPointerDown",handler:(e,t)=>{let{nativeEvent:n}=e,{onActivation:r}=t;return!n.isPrimary||n.button!==0?!1:(r?.({event:n}),!0)}}];var Go={move:{name:"mousemove"},end:{name:"mouseup"}},en;(function(e){e[e.RightClick=2]="RightClick"})(en||(en={}));var tn=class extends dt{constructor(t){super(t,Go,Ee(t.event.target))}};tn.activators=[{eventName:"onMouseDown",handler:(e,t)=>{let{nativeEvent:n}=e,{onActivation:r}=t;return n.button===en.RightClick?!1:(r?.({event:n}),!0)}}];var Jt={cancel:{name:"touchcancel"},move:{name:"touchmove"},end:{name:"touchend"}},nn=class extends dt{constructor(t){super(t,Jt)}static setup(){return window.addEventListener(Jt.move.name,t,{capture:!1,passive:!1}),function(){window.removeEventListener(Jt.move.name,t)};function t(){}}};nn.activators=[{eventName:"onTouchStart",handler:(e,t)=>{let{nativeEvent:n}=e,{onActivation:r}=t,{touches:o}=n;return o.length>1?!1:(r?.({event:n}),!0)}}];var lt;(function(e){e[e.Pointer=0]="Pointer",e[e.DraggableRect=1]="DraggableRect"})(lt||(lt={}));var Tt;(function(e){e[e.TreeOrder=0]="TreeOrder",e[e.ReversedTreeOrder=1]="ReversedTreeOrder"})(Tt||(Tt={}));function Jo(e){let{acceleration:t,activator:n=lt.Pointer,canScroll:r,draggingRect:o,enabled:i,interval:a=5,order:s=Tt.TreeOrder,pointerCoordinates:l,scrollableAncestors:u,scrollableAncestorRects:f,delta:c,threshold:p}=e,g=Qo({delta:c,disabled:!i}),[w,m]=Nn(),b=(0,d.useRef)({x:0,y:0}),y=(0,d.useRef)({x:0,y:0}),k=(0,d.useMemo)(()=>{switch(n){case lt.Pointer:return l?{top:l.y,bottom:l.y,left:l.x,right:l.x}:null;case lt.DraggableRect:return o}},[n,o,l]),x=(0,d.useRef)(null),O=(0,d.useCallback)(()=>{let N=x.current;if(!N)return;let C=b.current.x*y.current.x,I=b.current.y*y.current.y;N.scrollBy(C,I)},[]),D=(0,d.useMemo)(()=>s===Tt.TreeOrder?[...u].reverse():u,[s,u]);(0,d.useEffect)(()=>{if(!i||!u.length||!k){m();return}for(let N of D){if(r?.(N)===!1)continue;let C=u.indexOf(N),I=f[C];if(!I)continue;let{direction:L,speed:F}=Ko(N,I,k,t,p);for(let B of["x","y"])g[B][L[B]]||(F[B]=0,L[B]=0);if(F.x>0||F.y>0){m(),x.current=N,w(O,a),b.current=F,y.current=L;return}}b.current={x:0,y:0},y.current={x:0,y:0},m()},[t,O,r,m,i,a,JSON.stringify(k),JSON.stringify(g),w,u,D,f,JSON.stringify(p)])}var Zo={x:{[H.Backward]:!1,[H.Forward]:!1},y:{[H.Backward]:!1,[H.Forward]:!1}};function Qo(e){let{delta:t,disabled:n}=e,r=ot(t);return He(o=>{if(n||!r||!o)return Zo;let i={x:Math.sign(t.x-r.x),y:Math.sign(t.y-r.y)};return{x:{[H.Backward]:o.x[H.Backward]||i.x===-1,[H.Forward]:o.x[H.Forward]||i.x===1},y:{[H.Backward]:o.y[H.Backward]||i.y===-1,[H.Forward]:o.y[H.Forward]||i.y===1}}},[n,t,r])}function ei(e,t){let n=t!=null?e.get(t):void 0,r=n?n.node.current:null;return He(o=>{var i;return t==null?null:(i=r??o)!=null?i:null},[r,t])}function ti(e,t){return(0,d.useMemo)(()=>e.reduce((n,r)=>{let{sensor:o}=r,i=o.activators.map(a=>({eventName:a.eventName,handler:t(a.handler,r)}));return[...n,...i]},[]),[e,t])}var ut;(function(e){e[e.Always=0]="Always",e[e.BeforeDragging=1]="BeforeDragging",e[e.WhileDragging=2]="WhileDragging"})(ut||(ut={}));var rn;(function(e){e.Optimized="optimized"})(rn||(rn={}));var Fn=new Map;function ni(e,t){let{dragging:n,dependencies:r,config:o}=t,[i,a]=(0,d.useState)(null),{frequency:s,measure:l,strategy:u}=o,f=(0,d.useRef)(e),c=b(),p=Ke(c),g=(0,d.useCallback)(function(y){y===void 0&&(y=[]),!p.current&&a(k=>k===null?y:k.concat(y.filter(x=>!k.includes(x))))},[p]),w=(0,d.useRef)(null),m=He(y=>{if(c&&!n)return Fn;if(!y||y===Fn||f.current!==e||i!=null){let k=new Map;for(let x of e){if(!x)continue;if(i&&i.length>0&&!i.includes(x.id)&&x.rect.current){k.set(x.id,x.rect.current);continue}let O=x.node.current,D=O?new ct(l(O),O):null;x.rect.current=D,D&&k.set(x.id,D)}return k}return y},[e,i,n,c,l]);return(0,d.useEffect)(()=>{f.current=e},[e]),(0,d.useEffect)(()=>{c||g()},[n,c]),(0,d.useEffect)(()=>{i&&i.length>0&&a(null)},[JSON.stringify(i)]),(0,d.useEffect)(()=>{c||typeof s!="number"||w.current!==null||(w.current=setTimeout(()=>{g(),w.current=null},s))},[s,c,g,...r]),{droppableRects:m,measureDroppableContainers:g,measuringScheduled:i!=null};function b(){switch(u){case ut.Always:return!1;case ut.BeforeDragging:return n;default:return!n}}}function an(e,t){return He(n=>e?n||(typeof t=="function"?t(e):e):null,[t,e])}function ri(e,t){return an(e,t)}function oi(e){let{callback:t,disabled:n}=e,r=nt(t),o=(0,d.useMemo)(()=>{if(n||typeof window>"u"||typeof window.MutationObserver>"u")return;let{MutationObserver:i}=window;return new i(r)},[r,n]);return(0,d.useEffect)(()=>()=>o?.disconnect(),[o]),o}function Ot(e){let{callback:t,disabled:n}=e,r=nt(t),o=(0,d.useMemo)(()=>{if(n||typeof window>"u"||typeof window.ResizeObserver>"u")return;let{ResizeObserver:i}=window;return new i(r)},[n]);return(0,d.useEffect)(()=>()=>o?.disconnect(),[o]),o}function ii(e){return new ct(ft(e),e)}function $n(e,t,n){t===void 0&&(t=ii);let[r,o]=(0,d.useState)(null);function i(){o(l=>{if(!e)return null;if(e.isConnected===!1){var u;return(u=l??n)!=null?u:null}let f=t(e);return JSON.stringify(l)===JSON.stringify(f)?l:f})}let a=oi({callback(l){if(e)for(let u of l){let{type:f,target:c}=u;if(f==="childList"&&c instanceof HTMLElement&&c.contains(e)){i();break}}}}),s=Ot({callback:i});return de(()=>{i(),e?(s?.observe(e),a?.observe(document.body,{childList:!0,subtree:!0})):(s?.disconnect(),a?.disconnect())},[e]),r}function si(e){let t=an(e);return Qn(e,t)}var Kn=[];function ai(e){let t=(0,d.useRef)(e),n=He(r=>e?r&&r!==Kn&&e&&t.current&&e.parentNode===t.current.parentNode?r:sn(e):Kn,[e]);return(0,d.useEffect)(()=>{t.current=e},[e]),n}function li(e){let[t,n]=(0,d.useState)(null),r=(0,d.useRef)(e),o=(0,d.useCallback)(i=>{let a=Yt(i.target);a&&n(s=>s?(s.set(a,Qt(a)),new Map(s)):null)},[]);return(0,d.useEffect)(()=>{let i=r.current;if(e!==i){a(i);let s=e.map(l=>{let u=Yt(l);return u?(u.addEventListener("scroll",o,{passive:!0}),[u,Qt(u)]):null}).filter(l=>l!=null);n(s.length?new Map(s):null),r.current=e}return()=>{a(e),a(i)};function a(s){s.forEach(l=>{let u=Yt(l);u?.removeEventListener("scroll",o)})}},[o,e]),(0,d.useMemo)(()=>e.length?t?Array.from(t.values()).reduce((i,a)=>Ae(i,a),se):sr(e):se,[e,t])}function Hn(e,t){t===void 0&&(t=[]);let n=(0,d.useRef)(null);return(0,d.useEffect)(()=>{n.current=null},t),(0,d.useEffect)(()=>{let r=e!==se;r&&!n.current&&(n.current=e),!r&&n.current&&(n.current=null)},[e]),n.current?st(e,n.current):se}function ci(e){(0,d.useEffect)(()=>{if(!tt)return;let t=e.map(n=>{let{sensor:r}=n;return r.setup==null?void 0:r.setup()});return()=>{for(let n of t)n?.()}},e.map(t=>{let{sensor:n}=t;return n}))}function di(e,t){return(0,d.useMemo)(()=>e.reduce((n,r)=>{let{eventName:o,handler:i}=r;return n[o]=a=>{i(a,t)},n},{}),[e,t])}function cr(e){return(0,d.useMemo)(()=>e?zo(e):null,[e])}var jn=[];function ui(e,t){t===void 0&&(t=ft);let[n]=e,r=cr(n?_(n):null),[o,i]=(0,d.useState)(jn);function a(){i(()=>e.length?e.map(l=>or(l)?r:new ct(t(l),l)):jn)}let s=Ot({callback:a});return de(()=>{s?.disconnect(),a(),e.forEach(l=>s?.observe(l))},[e]),o}function dr(e){if(!e)return null;if(e.children.length>1)return e;let t=e.children[0];return $e(t)?t:e}function fi(e){let{measure:t}=e,[n,r]=(0,d.useState)(null),o=(0,d.useCallback)(u=>{for(let{target:f}of u)if($e(f)){r(c=>{let p=t(f);return c?{...c,width:p.width,height:p.height}:p});break}},[t]),i=Ot({callback:o}),a=(0,d.useCallback)(u=>{let f=dr(u);i?.disconnect(),f&&i?.observe(f),r(f?t(f):null)},[t,i]),[s,l]=rt(a);return(0,d.useMemo)(()=>({nodeRef:s,rect:n,setRef:l}),[n,s,l])}var pi=[{sensor:je,options:{}},{sensor:Rt,options:{}}],gi={current:{}},At={draggable:{measure:Mn},droppable:{measure:Mn,strategy:ut.WhileDragging,frequency:rn.Optimized},dragOverlay:{measure:ft}},Oe=class extends Map{get(t){var n;return t!=null&&(n=super.get(t))!=null?n:void 0}toArray(){return Array.from(this.values())}getEnabled(){return this.toArray().filter(t=>{let{disabled:n}=t;return!n})}getNodeFor(t){var n,r;return(n=(r=this.get(t))==null?void 0:r.node.current)!=null?n:void 0}},vi={activatorEvent:null,active:null,activeNode:null,activeNodeRect:null,collisions:null,containerNodeRect:null,draggableNodes:new Map,droppableRects:new Map,droppableContainers:new Oe,over:null,dragOverlay:{nodeRef:{current:null},rect:null,setRef:Nt},scrollableAncestors:[],scrollableAncestorRects:[],measuringConfiguration:At,measureDroppableContainers:Nt,windowRect:null,measuringScheduled:!1},ur={activatorEvent:null,activators:[],active:null,activeNodeRect:null,ariaDescribedById:{draggable:""},dispatch:Nt,draggableNodes:new Map,over:null,measureDroppableContainers:Nt},pt=(0,d.createContext)(ur),fr=(0,d.createContext)(vi);function mi(){return{draggable:{active:null,initialCoordinates:{x:0,y:0},nodes:new Map,translate:{x:0,y:0}},droppable:{containers:new Oe}}}function hi(e,t){switch(t.type){case $.DragStart:return{...e,draggable:{...e.draggable,initialCoordinates:t.initialCoordinates,active:t.active}};case $.DragMove:return e.draggable.active==null?e:{...e,draggable:{...e.draggable,translate:{x:t.coordinates.x-e.draggable.initialCoordinates.x,y:t.coordinates.y-e.draggable.initialCoordinates.y}}};case $.DragEnd:case $.DragCancel:return{...e,draggable:{...e.draggable,active:null,initialCoordinates:{x:0,y:0},translate:{x:0,y:0}}};case $.RegisterDroppable:{let{element:n}=t,{id:r}=n,o=new Oe(e.droppable.containers);return o.set(r,n),{...e,droppable:{...e.droppable,containers:o}}}case $.SetDroppableDisabled:{let{id:n,key:r,disabled:o}=t,i=e.droppable.containers.get(n);if(!i||r!==i.key)return e;let a=new Oe(e.droppable.containers);return a.set(n,{...i,disabled:o}),{...e,droppable:{...e.droppable,containers:a}}}case $.UnregisterDroppable:{let{id:n,key:r}=t,o=e.droppable.containers.get(n);if(!o||r!==o.key)return e;let i=new Oe(e.droppable.containers);return i.delete(n),{...e,droppable:{...e.droppable,containers:i}}}default:return e}}function bi(e){let{disabled:t}=e,{active:n,activatorEvent:r,draggableNodes:o}=(0,d.useContext)(pt),i=ot(r),a=ot(n?.id);return(0,d.useEffect)(()=>{if(!t&&!r&&i&&a!=null){if(!Et(i)||document.activeElement===i.target)return;let s=o.get(a);if(!s)return;let{activatorNode:l,node:u}=s;if(!l.current&&!u.current)return;requestAnimationFrame(()=>{for(let f of[l.current,u.current]){if(!f)continue;let c=Tn(f);if(c){c.focus();break}}})}},[r,t,o,a,i]),null}function pr(e,t){let{transform:n,...r}=t;return e!=null&&e.length?e.reduce((o,i)=>i({transform:o,...r}),n):n}function yi(e){return(0,d.useMemo)(()=>({draggable:{...At.draggable,...e?.draggable},droppable:{...At.droppable,...e?.droppable},dragOverlay:{...At.dragOverlay,...e?.dragOverlay}}),[e?.draggable,e?.droppable,e?.dragOverlay])}function wi(e){let{activeNode:t,measure:n,initialRect:r,config:o=!0}=e,i=(0,d.useRef)(!1),{x:a,y:s}=typeof o=="boolean"?{x:o,y:o}:o;de(()=>{if(!a&&!s||!t){i.current=!1;return}if(i.current||!r)return;let u=t?.node.current;if(!u||u.isConnected===!1)return;let f=n(u),c=Qn(f,r);if(a||(c.x=0),s||(c.y=0),i.current=!0,Math.abs(c.x)>0||Math.abs(c.y)>0){let p=tr(u);p&&p.scrollBy({top:c.y,left:c.x})}},[t,a,s,r,n])}var Lt=(0,d.createContext)({...se,scaleX:1,scaleY:1}),we;(function(e){e[e.Uninitialized=0]="Uninitialized",e[e.Initializing=1]="Initializing",e[e.Initialized=2]="Initialized"})(we||(we={}));var gr=(0,d.memo)(function(t){var n,r,o,i;let{id:a,accessibility:s,autoScroll:l=!0,children:u,sensors:f=pi,collisionDetection:c=on,measuring:p,modifiers:g,...w}=t,m=(0,d.useReducer)(hi,void 0,mi),[b,y]=m,[k,x]=So(),[O,D]=(0,d.useState)(we.Uninitialized),N=O===we.Initialized,{draggable:{active:C,nodes:I,translate:L},droppable:{containers:F}}=b,B=C!=null?I.get(C):null,Z=(0,d.useRef)({initial:null,translated:null}),ne=(0,d.useMemo)(()=>{var q;return C!=null?{id:C,data:(q=B?.data)!=null?q:gi,rect:Z}:null},[C,B]),V=(0,d.useRef)(null),[X,Xe]=(0,d.useState)(null),[re,bt]=(0,d.useState)(null),ue=Ke(w,Object.values(w)),Ye=it("DndDescribedBy",a),yt=(0,d.useMemo)(()=>F.getEnabled(),[F]),ae=yi(p),{droppableRects:ge,measureDroppableContainers:Be,measuringScheduled:wt}=ni(yt,{dragging:N,dependencies:[L.x,L.y],config:ae.droppable}),v=ei(I,C),S=(0,d.useMemo)(()=>re?at(re):null,[re]),M=co(),K=ri(v,ae.draggable.measure);wi({activeNode:C!=null?I.get(C):null,config:M.layoutShiftCompensation,initialRect:K,measure:ae.draggable.measure});let P=$n(v,ae.draggable.measure,K),Ie=$n(v?v.parentElement:null),oe=(0,d.useRef)({activatorEvent:null,active:null,activeNode:v,collisionRect:null,collisions:null,droppableRects:ge,draggableNodes:I,draggingNode:null,draggingNodeRect:null,droppableContainers:F,over:null,scrollableAncestors:[],scrollAdjustedTranslate:null}),Ge=F.getNodeFor((n=oe.current.over)==null?void 0:n.id),ie=fi({measure:ae.dragOverlay.measure}),kt=(r=ie.nodeRef.current)!=null?r:v,Me=N?(o=ie.rect)!=null?o:P:null,hn=!!(ie.nodeRef.current&&ie.rect),bn=si(hn?null:P),qt=cr(kt?_(kt):null),ve=ai(N?Ge??v:null),xt=ui(ve),St=pr(g,{transform:{x:L.x-bn.x,y:L.y-bn.y,scaleX:1,scaleY:1},activatorEvent:re,active:ne,activeNodeRect:P,containerNodeRect:Ie,draggingNodeRect:Me,over:oe.current.over,overlayNodeRect:ie.rect,scrollableAncestors:ve,scrollableAncestorRects:xt,windowRect:qt}),yn=S?Ae(S,L):null,wn=li(ve),no=Hn(wn),ro=Hn(wn,[P]),Pe=Ae(St,no),ze=Me?Bo(Me,St):null,Je=ne&&ze?c({active:ne,collisionRect:ze,droppableRects:ge,droppableContainers:yt,pointerCoordinates:yn}):null,kn=No(Je,"id"),[me,xn]=(0,d.useState)(null),oo=hn?St:Ae(St,ro),io=Oo(oo,(i=me?.rect)!=null?i:null,P),_t=(0,d.useRef)(null),Sn=(0,d.useCallback)((q,Y)=>{let{sensor:G,options:he}=Y;if(V.current==null)return;let Q=I.get(V.current);if(!Q)return;let J=q.nativeEvent,le=new G({active:V.current,activeNode:Q,event:J,options:he,context:oe,onAbort(j){if(!I.get(j))return;let{onDragAbort:ce}=ue.current,fe={id:j};ce?.(fe),k({type:"onDragAbort",event:fe})},onPending(j,be,ce,fe){if(!I.get(j))return;let{onDragPending:Qe}=ue.current,ye={id:j,constraint:be,initialCoordinates:ce,offset:fe};Qe?.(ye),k({type:"onDragPending",event:ye})},onStart(j){let be=V.current;if(be==null)return;let ce=I.get(be);if(!ce)return;let{onDragStart:fe}=ue.current,Ze={activatorEvent:J,active:{id:be,data:ce.data,rect:Z}};(0,Re.unstable_batchedUpdates)(()=>{fe?.(Ze),D(we.Initializing),y({type:$.DragStart,initialCoordinates:j,active:be}),k({type:"onDragStart",event:Ze}),Xe(_t.current),bt(J)})},onMove(j){y({type:$.DragMove,coordinates:j})},onEnd:We($.DragEnd),onCancel:We($.DragCancel)});_t.current=le;function We(j){return async function(){let{active:ce,collisions:fe,over:Ze,scrollAdjustedTranslate:Qe}=oe.current,ye=null;if(ce&&Qe){let{cancelDrop:et}=ue.current;ye={activatorEvent:J,active:ce,collisions:fe,delta:Qe,over:Ze},j===$.DragEnd&&typeof et=="function"&&await Promise.resolve(et(ye))&&(j=$.DragCancel)}V.current=null,(0,Re.unstable_batchedUpdates)(()=>{y({type:j}),D(we.Uninitialized),xn(null),Xe(null),bt(null),_t.current=null;let et=j===$.DragEnd?"onDragEnd":"onDragCancel";if(ye){let Ut=ue.current[et];Ut?.(ye),k({type:et,event:ye})}})}}},[I]),so=(0,d.useCallback)((q,Y)=>(G,he)=>{let Q=G.nativeEvent,J=I.get(he);if(V.current!==null||!J||Q.dndKit||Q.defaultPrevented)return;let le={active:J};q(G,Y.options,le)===!0&&(Q.dndKit={capturedBy:Y.sensor},V.current=he,Sn(G,Y))},[I,Sn]),Cn=ti(f,so);ci(f),de(()=>{P&&O===we.Initializing&&D(we.Initialized)},[P,O]),(0,d.useEffect)(()=>{let{onDragMove:q}=ue.current,{active:Y,activatorEvent:G,collisions:he,over:Q}=oe.current;if(!Y||!G)return;let J={active:Y,activatorEvent:G,collisions:he,delta:{x:Pe.x,y:Pe.y},over:Q};(0,Re.unstable_batchedUpdates)(()=>{q?.(J),k({type:"onDragMove",event:J})})},[Pe.x,Pe.y]),(0,d.useEffect)(()=>{let{active:q,activatorEvent:Y,collisions:G,droppableContainers:he,scrollAdjustedTranslate:Q}=oe.current;if(!q||V.current==null||!Y||!Q)return;let{onDragOver:J}=ue.current,le=he.get(kn),We=le&&le.rect.current?{id:le.id,rect:le.rect.current,data:le.data,disabled:le.disabled}:null,j={active:q,activatorEvent:Y,collisions:G,delta:{x:Q.x,y:Q.y},over:We};(0,Re.unstable_batchedUpdates)(()=>{xn(We),J?.(j),k({type:"onDragOver",event:j})})},[kn]),de(()=>{oe.current={activatorEvent:re,active:ne,activeNode:v,collisionRect:ze,collisions:Je,droppableRects:ge,draggableNodes:I,draggingNode:kt,draggingNodeRect:Me,droppableContainers:F,over:me,scrollableAncestors:ve,scrollAdjustedTranslate:Pe},Z.current={initial:Me,translated:ze}},[ne,v,Je,ze,I,kt,Me,ge,F,me,ve,Pe]),Jo({...M,delta:L,draggingRect:ze,pointerCoordinates:yn,scrollableAncestors:ve,scrollableAncestorRects:xt});let ao=(0,d.useMemo)(()=>({active:ne,activeNode:v,activeNodeRect:P,activatorEvent:re,collisions:Je,containerNodeRect:Ie,dragOverlay:ie,draggableNodes:I,droppableContainers:F,droppableRects:ge,over:me,measureDroppableContainers:Be,scrollableAncestors:ve,scrollableAncestorRects:xt,measuringConfiguration:ae,measuringScheduled:wt,windowRect:qt}),[ne,v,P,re,Je,Ie,ie,I,F,ge,me,Be,ve,xt,ae,wt,qt]),lo=(0,d.useMemo)(()=>({activatorEvent:re,activators:Cn,active:ne,activeNodeRect:P,ariaDescribedById:{draggable:Ye},dispatch:y,draggableNodes:I,over:me,measureDroppableContainers:Be}),[re,Cn,ne,P,y,Ye,I,me,Be]);return d.default.createElement(Un.Provider,{value:x},d.default.createElement(pt.Provider,{value:lo},d.default.createElement(fr.Provider,{value:ao},d.default.createElement(Lt.Provider,{value:io},u)),d.default.createElement(bi,{disabled:s?.restoreFocus===!1})),d.default.createElement(Do,{...s,hiddenTextDescribedById:Ye}));function co(){let q=X?.autoScrollEnabled===!1,Y=typeof l=="object"?l.enabled===!1:l===!1,G=N&&!q&&!Y;return typeof l=="object"?{...l,enabled:G}:{enabled:G}}}),ki=(0,d.createContext)(null),qn="button",xi="Draggable";function vr(e){let{id:t,data:n,disabled:r=!1,attributes:o}=e,i=it(xi),{activators:a,activatorEvent:s,active:l,activeNodeRect:u,ariaDescribedById:f,draggableNodes:c,over:p}=(0,d.useContext)(pt),{role:g=qn,roleDescription:w="draggable",tabIndex:m=0}=o??{},b=l?.id===t,y=(0,d.useContext)(b?Lt:ki),[k,x]=rt(),[O,D]=rt(),N=di(a,t),C=Ke(n);de(()=>(c.set(t,{id:t,key:i,node:k,activatorNode:O,data:C}),()=>{let L=c.get(t);L&&L.key===i&&c.delete(t)}),[c,t]);let I=(0,d.useMemo)(()=>({role:g,tabIndex:m,"aria-disabled":r,"aria-pressed":b&&g===qn?!0:void 0,"aria-roledescription":w,"aria-describedby":f.draggable}),[r,g,m,b,w,f.draggable]);return{active:l,activatorEvent:s,activeNodeRect:u,attributes:I,isDragging:b,listeners:r?void 0:N,node:k,over:p,setNodeRef:x,setActivatorNodeRef:D,transform:y}}function Si(){return(0,d.useContext)(fr)}var Ci="Droppable",Ii={timeout:25};function mr(e){let{data:t,disabled:n=!1,id:r,resizeObserverConfig:o}=e,i=it(Ci),{active:a,dispatch:s,over:l,measureDroppableContainers:u}=(0,d.useContext)(pt),f=(0,d.useRef)({disabled:n}),c=(0,d.useRef)(!1),p=(0,d.useRef)(null),g=(0,d.useRef)(null),{disabled:w,updateMeasurementsFor:m,timeout:b}={...Ii,...o},y=Ke(m??r),k=(0,d.useCallback)(()=>{if(!c.current){c.current=!0;return}g.current!=null&&clearTimeout(g.current),g.current=setTimeout(()=>{u(Array.isArray(y.current)?y.current:[y.current]),g.current=null},b)},[b]),x=Ot({callback:k,disabled:w||!a}),O=(0,d.useCallback)((I,L)=>{x&&(L&&(x.unobserve(L),c.current=!1),I&&x.observe(I))},[x]),[D,N]=rt(O),C=Ke(t);return(0,d.useEffect)(()=>{!x||!D.current||(x.disconnect(),c.current=!1,x.observe(D.current))},[D,x]),(0,d.useEffect)(()=>(s({type:$.RegisterDroppable,element:{id:r,key:i,disabled:n,node:D,rect:p,data:C}}),()=>s({type:$.UnregisterDroppable,key:i,id:r})),[r]),(0,d.useEffect)(()=>{n!==f.current.disabled&&(s({type:$.SetDroppableDisabled,id:r,key:i,disabled:n}),f.current.disabled=n)},[r,i,n,s]),{active:a,rect:p,isOver:l?.id===r,node:D,over:l,setNodeRef:N}}function Di(e){let{animation:t,children:n}=e,[r,o]=(0,d.useState)(null),[i,a]=(0,d.useState)(null),s=ot(n);return!n&&!r&&s&&o(s),de(()=>{if(!i)return;let l=r?.key,u=r?.props.id;if(l==null||u==null){o(null);return}Promise.resolve(t(u,i)).then(()=>{o(null)})},[t,r,i]),d.default.createElement(d.default.Fragment,null,n,r?(0,d.cloneElement)(r,{ref:a}):null)}var Ei={x:0,y:0,scaleX:1,scaleY:1};function Ai(e){let{children:t}=e;return d.default.createElement(pt.Provider,{value:ur},d.default.createElement(Lt.Provider,{value:Ei},t))}var Ni={position:"fixed",touchAction:"none"},Ri=e=>Et(e)?"transform 250ms ease":void 0,Ti=(0,d.forwardRef)((e,t)=>{let{as:n,activatorEvent:r,adjustScale:o,children:i,className:a,rect:s,style:l,transform:u,transition:f=Ri}=e;if(!s)return null;let c=o?u:{...u,scaleX:1,scaleY:1},p={...Ni,width:s.width,height:s.height,top:s.top,left:s.left,transform:Fe.Transform.toString(c),transformOrigin:o&&r?Eo(r,s):void 0,transition:typeof f=="function"?f(r):f,...l};return d.default.createElement(n,{className:a,style:p,ref:t},i)}),Oi=e=>t=>{let{active:n,dragOverlay:r}=t,o={},{styles:i,className:a}=e;if(i!=null&&i.active)for(let[s,l]of Object.entries(i.active))l!==void 0&&(o[s]=n.node.style.getPropertyValue(s),n.node.style.setProperty(s,l));if(i!=null&&i.dragOverlay)for(let[s,l]of Object.entries(i.dragOverlay))l!==void 0&&r.node.style.setProperty(s,l);return a!=null&&a.active&&n.node.classList.add(a.active),a!=null&&a.dragOverlay&&r.node.classList.add(a.dragOverlay),function(){for(let[l,u]of Object.entries(o))n.node.style.setProperty(l,u);a!=null&&a.active&&n.node.classList.remove(a.active)}},Li=e=>{let{transform:{initial:t,final:n}}=e;return[{transform:Fe.Transform.toString(t)},{transform:Fe.Transform.toString(n)}]},Bi={duration:250,easing:"ease",keyframes:Li,sideEffects:Oi({styles:{active:{opacity:"0"}}})};function Mi(e){let{config:t,draggableNodes:n,droppableContainers:r,measuringConfiguration:o}=e;return nt((i,a)=>{if(t===null)return;let s=n.get(i);if(!s)return;let l=s.node.current;if(!l)return;let u=dr(a);if(!u)return;let{transform:f}=_(a).getComputedStyle(a),c=er(f);if(!c)return;let p=typeof t=="function"?t:Pi(t);return ar(l,o.draggable.measure),p({active:{id:i,data:s.data,node:l,rect:o.draggable.measure(l)},draggableNodes:n,dragOverlay:{node:a,rect:o.dragOverlay.measure(u)},droppableContainers:r,measuringConfiguration:o,transform:c})})}function Pi(e){let{duration:t,easing:n,sideEffects:r,keyframes:o}={...Bi,...e};return i=>{let{active:a,dragOverlay:s,transform:l,...u}=i;if(!t)return;let f={x:s.rect.left-a.rect.left,y:s.rect.top-a.rect.top},c={scaleX:l.scaleX!==1?a.rect.width*l.scaleX/s.rect.width:1,scaleY:l.scaleY!==1?a.rect.height*l.scaleY/s.rect.height:1},p={x:l.x-f.x,y:l.y-f.y,...c},g=o({...u,active:a,dragOverlay:s,transform:{initial:l,final:p}}),[w]=g,m=g[g.length-1];if(JSON.stringify(w)===JSON.stringify(m))return;let b=r?.({active:a,dragOverlay:s,...u}),y=s.node.animate(g,{duration:t,easing:n,fill:"forwards"});return new Promise(k=>{y.onfinish=()=>{b?.(),k()}})}}var _n=0;function zi(e){return(0,d.useMemo)(()=>{if(e!=null)return _n++,_n},[e])}var hr=d.default.memo(e=>{let{adjustScale:t=!1,children:n,dropAnimation:r,style:o,transition:i,modifiers:a,wrapperElement:s="div",className:l,zIndex:u=999}=e,{activatorEvent:f,active:c,activeNodeRect:p,containerNodeRect:g,draggableNodes:w,droppableContainers:m,dragOverlay:b,over:y,measuringConfiguration:k,scrollableAncestors:x,scrollableAncestorRects:O,windowRect:D}=Si(),N=(0,d.useContext)(Lt),C=zi(c?.id),I=pr(a,{activatorEvent:f,active:c,activeNodeRect:p,containerNodeRect:g,draggingNodeRect:b.rect,over:y,overlayNodeRect:b.rect,scrollableAncestors:x,scrollableAncestorRects:O,transform:N,windowRect:D}),L=an(p),F=Mi({config:r,draggableNodes:w,droppableContainers:m,measuringConfiguration:k}),B=L?b.setRef:void 0;return d.default.createElement(Ai,null,d.default.createElement(Di,{animation:F},c&&C?d.default.createElement(Ti,{key:C,id:c.id,ref:B,as:s,activatorEvent:f,adjustScale:t,className:l,transition:i,rect:L,style:{zIndex:u,...o},transform:I},n):null))});function ke(e,t={},n="default"){return fetch("/api/kanban-flow",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({method:e,args:{...t,workspaceId:n}})}).then(r=>r.json()).catch(r=>({ok:!1,error:String(r&&r.message||r)}))}var xe=null,ln=new Set,br=new Set,cn=new Set,yr=new Set;function kr(e){xe=e}function dn(e){return e.settings&&e.settings.confirmRequired?"This board REQUIRES human confirmation: never move the item to Done \u2014 finish via Review and let the human complete it.":"When the task is fully complete: move the item In Progress -> Done."}function xr(){return"If the human replies while the item is in Review or Done: move it back to In Progress (Review -> In Progress / Done -> In Progress) and address their message in the same turn."}function Wi(e,t){return[`Kanban pickup: item ${t.id} "${t.name}" was moved to To Do by the human.`,"","Workflow:",`1. Read it with kanbanflow_get_item (id: ${t.id}).`,"2. Confirm pickup: move it To Do -> In Progress (kanbanflow_move_item).","3. Do the work, narrating your progress and decisions in this conversation.","4. If you need anything from the human: move the item In Progress -> Review and state your question in this conversation.",`5. ${dn(e)}`,"",xr(),`Always reference the item by id ${t.id}. Never modify other items.`].join(`
    `)}function Fi(e,t){return[`Kanban requeue: item ${t.id} "${t.name}" was moved back to To Do by the human.`,"Continue in this session's context: acknowledge in this conversation, move the item To Do -> In Progress, and address the human's feedback.",dn(e),"",xr(),`Always reference the item by id ${t.id}.`].join(`
    `)}function $i(e,t){return[`Kanban: the human returned item ${t.id} "${t.name}" to In Progress.`,"Continue working on it: give a short status in this conversation, address any feedback, then proceed per the workflow.",dn(e),"",`Always reference the item by id ${t.id}.`].join(`
    `)}async function Ki(e,t,n){if(n.sessionId)return n.sessionId;if(!xe)return null;try{let r=await xe.createSession(e);return await ke("setSession",{id:n.id,sessionId:r},e),n.sessionId=r,r}catch(r){return console.warn("dsh-kanban-flow: session create failed for "+n.id,r),null}}async function wr(e,t,n,r){if(!(!xe||cn.has(n.id))){cn.add(n.id);try{let o=await Ki(e,t,n);if(!o)return;let i=t.items.find(a=>a.id===n.id)??n;await xe.renameSession(o,`${i.id} \xB7 ${i.name}`),await xe.promptSession(o,r(t,i))}catch(o){console.warn("dsh-kanban-flow: agent drive failed for "+n.id,o)}finally{cn.delete(n.id)}}}async function Hi(e){if(!(!xe||yr.has(e))){yr.add(e);try{await xe.archiveSession(e)}catch(t){console.warn("dsh-kanban-flow: session archive failed for "+e,t)}}}function Sr(e,t){let n=Array.isArray(t.activities)?t.activities:[];if(!br.has(e)){br.add(e);for(let r of n)ln.add(r.id);return}for(let r of n){if(ln.has(r.id))continue;if(ln.add(r.id),r.type==="item_deleted"&&r.sessionId){Hi(r.sessionId);continue}if(r.source!=="human")continue;let o=t.items.find(i=>i.id===r.itemId);o&&r.type==="item_moved"&&(r.to==="todo"?wr(e,t,o,o.sessionId?Fi:Wi):r.to==="in_progress"&&r.from==="review"&&wr(e,t,o,$i))}}var Bt=["backlog","todo","in_progress","review","done"],Le={backlog:"Backlog",todo:"To Do",in_progress:"In Progress",review:"Review",done:"Done"};var ji=e=>Le[String(e)]||String(e||"");function Cr(e){if(!e)return"";let t=new Date(e).getTime();if(!Number.isFinite(t))return"";let n=Math.max(0,(Date.now()-t)/1e3);return n<5?"just now":n<60?`${Math.floor(n)} seconds ago`:n<120?"1 minute ago":n<3600?`${Math.floor(n/60)} minutes ago`:n<7200?"1 hour ago":n<86400?`${Math.floor(n/3600)} hours ago`:`${Math.floor(n/86400)} days ago`}function Ir(e){let t=e.source==="agent"?"harness":"you";switch(e.type){case"item_moved":return`${t} moved to ${ji(e.to)}`;case"item_created":return`${t} created`;case"item_updated":return`${t} edited`;case"item_deleted":return`${t} deleted`;default:return`${t} ${e.type.replace(/_/g," ")}`}}function Dr(e){return`${Ir(e)} (${Cr(e.ts)})`}function Er(e){return{phrase:Ir(e),time:Cr(e.ts)}}var Ar="dsh-kanban-flow.clickOpensBoard",un="dsh-kanban-flow:clickPrefChanged",Nr="dsh-kanban-flow.confirmArchive",fn="dsh-kanban-flow:archiveConfirmChanged";function Mt(){try{let e=localStorage.getItem(Ar);if(e==="0")return!1;if(e==="1")return!0}catch{}return!0}function Rr(e){try{localStorage.setItem(Ar,e?"1":"0")}catch{}window.dispatchEvent(new CustomEvent(un))}function Tr(e){return window.addEventListener(un,e),window.addEventListener("storage",e),()=>{window.removeEventListener(un,e),window.removeEventListener("storage",e)}}function Pt(){try{let e=localStorage.getItem(Nr);if(e==="0")return!1;if(e==="1")return!0}catch{}return!0}function Or(e){try{localStorage.setItem(Nr,e?"1":"0")}catch{}window.dispatchEvent(new CustomEvent(fn))}function zt(e){return window.addEventListener(fn,e),window.addEventListener("storage",e),()=>{window.removeEventListener(fn,e),window.removeEventListener("storage",e)}}var Ce=require("react");function Lr(e){let{override:t,currentSessionId:n,workspaceItems:r,recentWorkspaceId:o}=e,i=Array.isArray(r)?r:[],a=p=>p?i.find(g=>g&&g.workspaceId===p):void 0,s=n?i.find(p=>p&&Array.isArray(p.sessionIds)&&p.sessionIds.includes(n)):void 0,l=s?s.workspaceId:void 0,u=t!=null&&t.workspaceId!==l&&(t.hostSessionId===void 0||t.hostSessionId===n)?t:void 0,f=u?a(u.workspaceId):void 0,c=f||s||a(o);return{workspaceId:c?c.workspaceId:o||"default",workspaceTitle:c?c.title:void 0,pinned:f!==void 0,nativeWorkspaceId:l}}function Br(e,t,n=0){if(!Array.isArray(e))return null;let r=0;for(let o of e)if(!(!o||o.title!==t)){if(r===n)return o.workspaceId;r+=1}return null}var Ft="data-kf-kanban",Ht="Board",gt=null,_e=!1,qe=!1;function qi(){return _e}function Pr(e){gt&&gt(e)}function gn(){return typeof document>"u"?[]:Array.from(document.querySelectorAll('[role="tab"]'))}function vn(){return gn().find(e=>(e.textContent||"").trim()===Ht)}function $t(){let e=vn();return!!e&&e.getAttribute("aria-selected")==="true"}function Mr(e=4e3){if(typeof document>"u")return;let t=Date.now()+e,n=()=>{let r=vn();if(r){r.click();return}Date.now()<t&&window.setTimeout(n,120)};n()}function zr(){let e=gn().find(t=>(t.textContent||"").trim()!==Ht);e&&e.click()}function Kt(){if(typeof document>"u"||qe)return;qe=!0;let e=Date.now()+2500,t=()=>{if(_e){qe=!1;return}let n=vn();if(!n||n.getAttribute("aria-selected")!=="true"){qe=!1;return}let r=gn().find(o=>(o.textContent||"").trim()!==Ht);if(r){r.click(),qe=!1;return}if(Date.now()<e){window.setTimeout(t,120);return}qe=!1};t()}function Wr(){return(0,Ce.useEffect)(()=>{if(typeof document>"u")return;let e=t=>{if(qi()||!(t.target instanceof Element))return;let n=t.target.closest('[role="tab"]');n&&(n.textContent||"").trim()===Ht&&n.getAttribute("aria-selected")==="true"&&(t.stopImmediatePropagation(),t.preventDefault(),zr())};return document.addEventListener("click",e,!0),()=>document.removeEventListener("click",e,!0)},[]),null}function Wt(e,t){if(!t||!e?.list)return;let n=e.list.getSnapshot()?.items;if(!Array.isArray(n))return;let r=n.find(o=>o&&Array.isArray(o.sessionIds)&&o.sessionIds.includes(t));return r?r.workspaceId:void 0}var Se=null,pn=new Set;function Fr(){return Se??void 0}function vt(e){if(!(Se===null&&e===null||Se!==null&&e!==null&&Se.workspaceId===e.workspaceId&&Se.hostSessionId===e.hostSessionId)){Se=e;for(let n of pn)n()}}function $r(e){return pn.add(e),()=>{pn.delete(e)}}function Kr({workspaces:e,sessions:t}){return(0,Ce.useEffect)(()=>{if(!e||!t)return;let n=()=>t.list.getSnapshot(),r=c=>{if(c===void 0)return!1;let p=n().byId;return!!(p&&p[c]&&p[c].blank===!1)},o=()=>{let c=n().current;return r(c)?c:void 0},i=()=>{let c=e.list?.getSnapshot?.();return new Set(Array.isArray(c?.archivedSessionIds)?c.archivedSessionIds:[])},a=c=>{let p=e.list?.getSnapshot?.()?.items,g=Array.isArray(p)?p.find(m=>m&&m.workspaceId===c):void 0;if(!g||!Array.isArray(g.sessionIds))return;let w=i();return g.sessionIds.find(m=>r(m)&&!w.has(m))},s=()=>{let c=n(),p=i();for(let g of c.ids??[])if(r(g)&&!p.has(g))return g},l=(c,p,g=6e3)=>{if(c()){p();return}let w=!1,m=()=>{w||(w=!0,b(),typeof y=="function"&&y(),window.clearTimeout(k),p())},b=t.list.subscribe(()=>{c()&&m()}),y=e.list?.subscribe?.(()=>{c()&&m()}),k=window.setTimeout(m,g)},u=()=>{$t()||Mr(),window.setTimeout(()=>{_e=!1},600)},f=c=>{let p=(y,k)=>{console.info(`[dsh-kanban-flow] open case ${y}:`,JSON.stringify({target:c,current:o()??null,actualCurrent:n().current??null,override:Se,boardTabActive:$t(),...k}))},g=o();if(g!==void 0){let y=Se?.workspaceId??Wt(e,g);if(y===c){p("1-toggle",{effective:y}),$t()?zr():Mr();return}}_e=!0;let w=a(c);if(w!==void 0){p("2-native",{targetSession:w}),vt(null),t.open&&t.open(w),l(()=>n().current===w,u);return}if(g!==void 0){p("3-pin-current"),vt({workspaceId:c,hostSessionId:g}),u();return}let m=Wt(e,n().current),b=(m!==void 0?a(m):void 0)??s();if(b!==void 0){p("4-borrow",{borrowed:b,currentWorkspaceId:m}),vt({workspaceId:c,hostSessionId:b}),n().current===b?u():(t.open&&t.open(b),l(()=>n().current===b,u));return}p("5-seed"),e.startSession(c),l(()=>{let y=n().current;return y!==void 0&&Wt(e,y)===c},()=>{let y=n().current;if(y===void 0||Wt(e,y)!==c){_e=!1;return}let x=(t.binding?t.binding(y):void 0)?.session.prompt([{type:"text",text:'Kanban board bootstrap: reply with the single word "ready".'}],"queue");Promise.resolve(x).catch(O=>console.warn("dsh-kanban-flow: board seed prompt failed",O)),l(()=>o()!==void 0,u,2e4)},1e4)};return gt=f,()=>{gt===f&&(gt=null)}},[e,t]),null}function Hr({sessions:e}){return(0,Ce.useEffect)(()=>{if(typeof document>"u")return;let t=n=>{if(!(n.target instanceof Element))return;let r=n.target.closest('[role="treeitem"]');!r||r.hasAttribute("aria-expanded")||n.target.closest("button")||$t()&&Kt()};return document.addEventListener("click",t,!0),()=>document.removeEventListener("click",t,!0)},[]),(0,Ce.useEffect)(()=>{if(!e?.list)return;let t=e.list.getSnapshot()?.current;return e.list.subscribe(()=>{let r=e.list.getSnapshot()?.current;r!==t&&(t=r,_e||Kt())})},[e]),null}function jr(){return typeof document>"u"?[]:Array.from(document.querySelectorAll('[role="treeitem"][aria-expanded]')).filter(t=>mt(t)!==null)}function mt(e){let t=Array.from(e.querySelectorAll(":scope > span"));for(let n of t)if((n.textContent||"").trim()!==""&&n.querySelector("button")===null&&n.querySelector("svg")===null)return n;return null}function _i(e){let t=Array.from(e.querySelectorAll(":scope > span"));for(let n of t)if(n.querySelector("button")!==null)return n;return null}function Ui(e,t){if(!(t instanceof Element))return!1;let n=t.closest("span");return!n||!e.contains(n)?!1:n.querySelector("svg")!==null&&n.querySelector("button")===null&&(n.textContent||"").trim()===""}function qr(e,t){let n=mt(t);if(!n)return null;let r=(n.textContent||"").trim(),o=e?.list?.getSnapshot?.()?.items;if(!Array.isArray(o))return null;let i=0;for(let a of jr()){if(a===t)break;let s=mt(a);s&&(s.textContent||"").trim()===r&&(i+=1)}return Br(o,r,i)}function Vi(){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 16 16"),e.setAttribute("width","14"),e.setAttribute("height","14"),e.setAttribute("fill","none");for(let[t,n]of[[1.5,12],[6,8],[10.5,5]]){let r=document.createElementNS("http://www.w3.org/2000/svg","rect");r.setAttribute("x",String(t)),r.setAttribute("y","2"),r.setAttribute("width","4"),r.setAttribute("height",String(n)),r.setAttribute("rx","1.4"),r.setAttribute("fill","currentColor"),e.appendChild(r)}return e}function _r({workspaces:e}){return(0,Ce.useEffect)(()=>{if(typeof document>"u")return;let t=!1,n=()=>{if(!t)for(let i of jr()){let a=mt(i),s=_i(i);if(!a||!s||s.querySelector(`[${Ft}]`))continue;let l=qr(e,i);if(!l)continue;let u=(a.textContent||"").trim(),f=document.createElement("button");f.type="button",f.setAttribute(Ft,""),f.className="kf-sidebar-icon",f.title=`Open kanban board (${u})`,f.setAttribute("aria-label",`Open kanban board for ${u}`),f.appendChild(Vi()),f.addEventListener("click",c=>{c.stopPropagation(),c.preventDefault(),Pr(l)}),s.appendChild(f)}},r=new MutationObserver(()=>n());r.observe(document.documentElement,{childList:!0,subtree:!0});let o=e?.list?.subscribe?.(()=>n());return n(),()=>{t=!0,r.disconnect(),typeof o=="function"&&o();for(let i of Array.from(document.querySelectorAll(`[${Ft}]`)))i.remove()}},[e]),null}function Ur({workspaces:e}){return(0,Ce.useEffect)(()=>{if(typeof document>"u")return;let t=n=>{if(!Mt()||!(n.target instanceof Element))return;let r=n.target.closest('[role="treeitem"][aria-expanded]');if(!r||!mt(r)||Ui(r,n.target)||n.target.closest("button")&&!n.target.closest(`[${Ft}]`))return;let i=qr(e,r);i&&(n.stopPropagation(),n.preventDefault(),Pr(i))};return document.addEventListener("click",t,!0),()=>document.removeEventListener("click",t,!0)},[e]),null}function Vr({workspaces:e}){return(0,Ce.useEffect)(()=>{if(!e?.list||typeof e.list.getSnapshot!="function")return;let t=!1,n=new Set(e.list.getSnapshot()?.archivedSessionIds??[]),r=async()=>{if(t)return;let i=e.list.getSnapshot(),a=new Set(i?.archivedSessionIds??[]),s=[...a].filter(l=>!n.has(l));if(n=a,s.length!==0){for(let l of Array.isArray(i?.items)?i.items:[])if(!(!l||!l.workspaceId))try{let f=(await ke("get",{},l.workspaceId))?.board?.items??[];for(let c of f)c.sessionId&&s.includes(c.sessionId)&&await ke("deleteItem",{id:c.id},l.workspaceId)}catch{}}},o=e.list.subscribe(()=>{r()});return()=>{t=!0,o()}},[e]),null}var jt=require("react"),te=require("react/jsx-runtime");function Xr({item:e,onConfirm:t,onCancel:n}){let r=(0,jt.useRef)(null);return(0,jt.useEffect)(()=>{r.current?.focus();let o=i=>{i.key==="Escape"&&n(),i.key==="Enter"&&t()};return document.addEventListener("keydown",o),()=>document.removeEventListener("keydown",o)},[t,n]),(0,te.jsx)("div",{className:"kf-dialog-backdrop",onMouseDown:o=>{o.target===o.currentTarget&&n()},children:(0,te.jsxs)("div",{className:"kf-dialog",role:"alertdialog","aria-label":"Archive "+e.id,style:{width:400},children:[(0,te.jsx)("div",{className:"kf-dialog-head",children:(0,te.jsx)("span",{className:"kf-dialog-title",children:"Archive item?"})}),(0,te.jsxs)("div",{className:"kf-dialog-body",children:[(0,te.jsxs)("div",{className:"kf-muted",children:["Archive ",(0,te.jsx)("strong",{children:e.id})," \u201C",e.name,"\u201D? The item will be removed from the board",e.sessionId?" and its task session archived":"","."]}),(0,te.jsxs)("div",{className:"kf-newitem-row",style:{justifyContent:"flex-end"},children:[(0,te.jsx)("button",{type:"button",className:"kf-btn kf-ghost",onClick:n,children:"Cancel"}),(0,te.jsx)("button",{type:"button",ref:r,className:"kf-btn kf-danger",onClick:t,children:"Archive"})]})]})]})})}var ht=require("react");var E=require("react/jsx-runtime"),Xi=e=>Le[e]||e;function Yr(e){let{item:t,board:n,onOpenChange:r,onSave:o,onDelete:i,onOpenSession:a,sessions:s}=e,[l,u]=(0,ht.useState)(t?t.name:""),[f,c]=(0,ht.useState)(t?t.description:"");if((0,ht.useEffect)(()=>{u(t?t.name:""),c(t?t.description:"")},[t&&t.id]),!t)return null;let p=n.activities.filter(g=>g.itemId===t.id);return(0,E.jsx)("div",{className:"kf-dialog-backdrop",onMouseDown:g=>{g.target===g.currentTarget&&r(!1)},children:(0,E.jsxs)("div",{className:"kf-dialog",role:"dialog","aria-label":"Item "+t.id,children:[(0,E.jsxs)("div",{className:"kf-dialog-head",children:[(0,E.jsx)("span",{className:"kf-code-chip",children:t.id}),(0,E.jsx)("span",{className:"kf-dialog-title",children:t.name}),(0,E.jsx)("span",{className:"kf-spacer"}),t.sessionId&&s&&(0,E.jsx)("button",{type:"button",className:"kf-btn",onClick:()=>a(t),children:"Open task session"}),(0,E.jsx)("button",{type:"button",className:"kf-iconbtn",title:"Close","aria-label":"Close item dialog",onClick:()=>r(!1),children:"\u2715"})]}),(0,E.jsxs)("div",{className:"kf-dialog-body",children:[(0,E.jsxs)("div",{className:"kf-muted",children:["In ",(0,E.jsx)("strong",{children:Xi(t.columnId)}),t.sessionId?" \xB7 linked to a task session":""]}),(0,E.jsxs)("div",{children:[(0,E.jsx)("div",{className:"kf-fieldlabel",children:"Name"}),(0,E.jsx)("input",{className:"kf-input",value:l,onChange:g=>u(g.target.value)})]}),(0,E.jsxs)("div",{children:[(0,E.jsx)("div",{className:"kf-fieldlabel",children:"Description"}),(0,E.jsx)("textarea",{className:"kf-textarea",value:f,onChange:g=>c(g.target.value)})]}),(0,E.jsxs)("div",{className:"kf-newitem-row",style:{justifyContent:"flex-start"},children:[(0,E.jsx)("button",{type:"button",className:"kf-btn kf-primary",onClick:()=>o({name:l,description:f}),children:"Save"}),(0,E.jsx)("button",{type:"button",className:"kf-btn kf-danger",onClick:()=>i(t.id),children:"Delete item"})]}),t.sessionId&&(0,E.jsx)("div",{className:"kf-muted",children:"Deleting this item also archives its task session."}),(0,E.jsxs)("div",{children:[(0,E.jsx)("div",{className:"kf-fieldlabel",children:"Activity"}),p.length===0&&(0,E.jsx)("div",{className:"kf-muted",children:"No activity yet."}),p.slice().reverse().map(g=>(0,E.jsx)("div",{className:"kf-activity-row",children:(0,E.jsx)("span",{children:Dr(g)})},g.id))]})]})]})})}var Ue=require("react"),U=require("react/jsx-runtime");function Gr({code:e,itemCount:t,onConfirm:n,onDismiss:r}){let[o,i]=(0,Ue.useState)(e),a=(0,Ue.useRef)(null);(0,Ue.useEffect)(()=>{a.current?.focus(),a.current?.select()},[]);let s=o.toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,6),l=/^[A-Z0-9]{2,6}$/.test(s);return(0,U.jsx)("div",{className:"kf-dialog-backdrop",onMouseDown:u=>{u.target===u.currentTarget&&r()},children:(0,U.jsxs)("div",{className:"kf-dialog",role:"dialog","aria-label":"Board code",style:{width:400},children:[(0,U.jsx)("div",{className:"kf-dialog-head",children:(0,U.jsx)("span",{className:"kf-dialog-title",children:"Name your board"})}),(0,U.jsxs)("div",{className:"kf-dialog-body",children:[(0,U.jsxs)("div",{className:"kf-muted",children:["Pick a short code (2\u20136 letters/digits) for this workspace's board. New items get ids like"," ",(0,U.jsx)("strong",{children:(s.length>=2?s:"XX")+"-1"}),".",t>0&&" Existing item ids stay unchanged."]}),(0,U.jsxs)("div",{children:[(0,U.jsx)("div",{className:"kf-fieldlabel",children:"Board code"}),(0,U.jsx)("input",{ref:a,className:"kf-input",style:{fontFamily:"var(--ds-font-family-code)",textTransform:"uppercase",fontSize:16,letterSpacing:"0.08em"},value:o,onChange:u=>i(u.target.value.toUpperCase()),onKeyDown:u=>{u.key==="Enter"&&l&&n(s),u.key==="Escape"&&r()},maxLength:6})]}),(0,U.jsxs)("div",{className:"kf-newitem-row",style:{justifyContent:"flex-end"},children:[(0,U.jsx)("button",{type:"button",className:"kf-btn kf-ghost",onClick:r,children:"Decide later"}),(0,U.jsxs)("button",{type:"button",className:"kf-btn kf-primary",disabled:!l,onClick:()=>n(s),children:["Use ",s||"\u2026"]})]})]})]})})}var pe=require("react");var A=require("react/jsx-runtime");function mn({on:e,onToggle:t,label:n}){return(0,A.jsx)("button",{type:"button",role:"switch","aria-checked":e,"aria-label":n,className:"kf-switch"+(e?" kf-on":""),onClick:t,children:(0,A.jsx)("span",{className:"kf-switch-thumb"})})}function Jr({board:e,onCode:t,onConfirmRequired:n,onClose:r}){let o=(0,pe.useRef)(null),[i,a]=(0,pe.useState)(e.code);(0,pe.useEffect)(()=>{let f=c=>{o.current&&!o.current.contains(c.target)&&r()};return document.addEventListener("mousedown",f),()=>document.removeEventListener("mousedown",f)},[r]);let s=i.toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,6),l=/^[A-Z0-9]{2,6}$/.test(s),u=!!(e.settings&&e.settings.confirmRequired);return(0,A.jsxs)("div",{className:"kf-pop",ref:o,role:"dialog","aria-label":"Board settings",children:[(0,A.jsxs)("div",{className:"kf-toggle-row",children:[(0,A.jsx)(mn,{on:u,onToggle:()=>n(!u),label:"Require confirmation to complete work"}),(0,A.jsxs)("div",{className:"kf-toggle-text",children:[(0,A.jsx)("div",{className:"kf-toggle-title",children:"Require confirmation to complete work"}),(0,A.jsx)("div",{className:"kf-toggle-sub",children:"On: the agent must send finished work through Review \u2014 it can never move items to Done. You complete by dragging to Done."})]})]}),(0,A.jsxs)("div",{children:[(0,A.jsx)("div",{className:"kf-fieldlabel",children:"Board code"}),(0,A.jsxs)("div",{className:"kf-code-row",children:[(0,A.jsx)("input",{className:"kf-input",value:i,maxLength:6,onChange:f=>a(f.target.value.toUpperCase())}),(0,A.jsx)("button",{type:"button",className:"kf-btn",disabled:!l||s===e.code,onClick:()=>t(s),children:"Save"})]}),(0,A.jsxs)("div",{className:"kf-toggle-sub",style:{marginTop:4},children:["Prefixes new item ids (",e.code,"-1, ",e.code,"-2\u2026). Existing ids stay unchanged. The workspace-click preference lives in Settings \u2192 Plugins \u2192 Kanban Flow."]})]})]})}function Zr(){let e=(0,pe.useSyncExternalStore)(Tr,Mt),t=(0,pe.useSyncExternalStore)(zt,Pt);return(0,A.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:16,maxWidth:520},children:[(0,A.jsxs)("div",{className:"kf-toggle-row",children:[(0,A.jsx)(mn,{on:e,onToggle:()=>Rr(!e),label:"Workspace click opens board"}),(0,A.jsxs)("div",{className:"kf-toggle-text",children:[(0,A.jsx)("div",{className:"kf-toggle-title",children:"Workspace click opens board"}),(0,A.jsx)("div",{className:"kf-toggle-sub",children:"New: clicking a workspace in the sidebar opens that workspace's board in-app, on the Board tab of its conversation (the folder icon still expands the session list). Old: clicking a workspace expands its session list."})]})]}),(0,A.jsxs)("div",{className:"kf-toggle-row",children:[(0,A.jsx)(mn,{on:t,onToggle:()=>Or(!t),label:"Require confirmation to archive items"}),(0,A.jsxs)("div",{className:"kf-toggle-text",children:[(0,A.jsx)("div",{className:"kf-toggle-title",children:"Require confirmation to archive items"}),(0,A.jsx)("div",{className:"kf-toggle-sub",children:"On: archiving an item from its card first opens a confirmation dialog describing what will be removed. Off: the card's archive button removes the item (and archives its task session) immediately."})]})]}),(0,A.jsx)("div",{className:"kf-muted",children:"Board-specific options \u2014 \u201CRequire confirmation to complete work\u201D and the board code \u2014 live in the gear menu of each board (Board tab \u2192 \u2699)."})]})}var h=require("react/jsx-runtime"),Yi=e=>{let t=Zn(e);if(t.length>0)return t;let n=on(e);return n.length>0?n:Jn(e)};function Ve({path:e,size:t=15}){return(0,h.jsx)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:(0,h.jsx)("path",{d:e})})}var Gi="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",Ji="M5 12h14M12 5v14",Zi="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",Qi="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",es="M2 4h20v4H2zM3 8v12h18V8 M10 12h4";function ts({item:e,flash:t,lastActivity:n,onOpenSession:r,onEdit:o,onArchive:i}){let{attributes:a,listeners:s,setNodeRef:l,isDragging:u}=vr({id:e.id});return(0,h.jsxs)("div",{ref:l,...a,...s,className:"kf-card"+(t?" kf-agent-flash":"")+(e.sessionId?" kf-has-session":"")+(u?" kf-dragging":""),style:{"--kf-card-accent":"var(--kf-accent, var(--dsw-alias-label-secondary))"},onClick:f=>{f.target.closest(".kf-edit-fab, .kf-archive-fab")||(e.sessionId?r():o())},children:[(0,h.jsx)("button",{type:"button",className:"kf-edit-fab",title:"Details","aria-label":"Details for "+e.id,onClick:f=>{f.stopPropagation(),o()},children:(0,h.jsx)(Ve,{path:Gi,size:13})}),(0,h.jsx)("button",{type:"button",className:"kf-archive-fab",title:"Archive item","aria-label":"Archive "+e.id,onClick:f=>{f.stopPropagation(),i()},children:(0,h.jsx)(Ve,{path:es,size:13})}),(0,h.jsxs)("div",{className:"kf-card-id",children:[e.id,e.sessionId&&(0,h.jsx)("span",{className:"kf-session-badge",title:"Open task session "+e.sessionId,children:(0,h.jsx)(Ve,{path:Qi,size:11})})]}),(0,h.jsx)("div",{className:"kf-card-name",children:e.name}),n&&(0,h.jsxs)("div",{className:"kf-card-activity",children:[(0,h.jsx)("span",{className:"kf-card-activity-phrase",children:n.phrase}),(0,h.jsx)("span",{className:"kf-card-activity-time",children:n.time})]})]})}function ns({columnId:e,onAdd:t,onCancel:n}){let[r,o]=(0,T.useState)(""),[i,a]=(0,T.useState)("");return(0,h.jsxs)("div",{className:"kf-newitem",children:[(0,h.jsx)("input",{className:"kf-input",autoFocus:!0,placeholder:"Item name",value:r,onChange:s=>o(s.target.value),onKeyDown:s=>{s.key==="Enter"&&r.trim()&&t(r,i),s.key==="Escape"&&n()}}),(0,h.jsx)("textarea",{className:"kf-textarea",placeholder:"Description (optional)",value:i,onChange:s=>a(s.target.value)}),(0,h.jsxs)("div",{className:"kf-newitem-row",children:[(0,h.jsx)("button",{type:"button",className:"kf-btn kf-ghost",onClick:n,children:"Cancel"}),(0,h.jsxs)("button",{type:"button",className:"kf-btn kf-primary",disabled:!r.trim(),onClick:()=>t(r,i),children:["Add to ",Le[e]]})]})]})}function rs({colId:e,highlighted:t,adding:n,items:r,flashIds:o,lastLines:i,onAdd:a,onCancelAdd:s,onOpenSession:l,onEdit:u,onArchive:f}){let{setNodeRef:c}=mr({id:e});return(0,h.jsxs)("div",{className:"kf-column kf-"+e+(t?" kf-over":""),children:[(0,h.jsxs)("div",{className:"kf-column-head",children:[(0,h.jsx)("span",{className:"kf-column-dot"}),(0,h.jsx)("span",{className:"kf-column-title",children:Le[e]})]}),(0,h.jsxs)("div",{className:"kf-column-list",ref:c,children:[n&&(0,h.jsx)(ns,{columnId:e,onAdd:a,onCancel:s}),r.length===0&&!n&&(0,h.jsx)("div",{className:"kf-column-empty",children:"No items"}),r.map(p=>(0,h.jsx)(ts,{item:p,flash:o.has(p.id),lastActivity:i.get(p.id),onOpenSession:()=>l(p),onEdit:()=>u(p),onArchive:()=>f(p)},p.id))]})]})}function Qr(e){let{workspaceId:t,workspaceTitle:n,sessions:r,archiveSession:o}=e,[i,a]=(0,T.useState)(null),[s,l]=(0,T.useState)(""),[u,f]=(0,T.useState)([]),[c,p]=(0,T.useState)(null),[g,w]=(0,T.useState)(null),[m,b]=(0,T.useState)(!1),[y,k]=(0,T.useState)(!1),[x,O]=(0,T.useState)(null),[D,N]=(0,T.useState)(null),C=(0,T.useSyncExternalStore)(zt,Pt),[I,L]=(0,T.useState)(null),[F,B]=(0,T.useState)(new Set),Z=(0,T.useRef)(null),ne=Xn(Vn(je,{activationConstraint:{distance:6}})),V=(0,T.useCallback)(v=>{if(v&&v.board){let S={...v.board,activities:Array.isArray(v.board.activities)?v.board.activities:[]},M=Z.current;if(M){let K=new Set;for(let P of S.items){let Ie=M.get(P.id);Ie&&Ie!==P.columnId+"|"+P.name+"|"+P.description&&K.add(P.id)}K.size>0&&(B(K),window.setTimeout(()=>B(new Set),1500))}Z.current=new Map(S.items.map(K=>[K.id,K.columnId+"|"+K.name+"|"+K.description])),a(S),l(""),Sr(t,S)}v&&typeof v.error=="string"&&v.error&&l(v.error),Array.isArray(v&&v.warnings)&&v.warnings.length>0&&f(S=>[...S,...v.warnings])},[t]),X=(0,T.useCallback)((v,S={})=>ke(v,S,t).then(V),[t,V]);(0,T.useEffect)(()=>{let v=!1,S=()=>ke("get",{},t).then(K=>{v||V(K)});S();let M=window.setInterval(S,3e3);return()=>{v=!0,window.clearInterval(M)}},[t,V]),(0,T.useEffect)(()=>{i&&!i.codeConfirmed&&!m&&b(!0)},[i&&i.codeConfirmed]);let Xe=(0,T.useCallback)(v=>{if(!v.sessionId||!r)return;let S=r.list?.getSnapshot?.()?.current;if(S!==void 0&&S===v.sessionId){Kt();return}r.open(v.sessionId)},[r]),re=v=>{let S=i?.items.find(M=>M.id===String(v.active.id));S&&O(S)},bt=v=>{let S=v.over?String(v.over.id):null;L(Bt.includes(S)?S:null)},ue=v=>{O(null);let{active:S,over:M}=v;if(!M||!i)return;let K=String(S.id),P=String(M.id),oe=Bt.includes(P)?P:i.items.find(ie=>ie.id===P)?.columnId;if(!oe)return;let Ge=i.items.find(ie=>ie.id===K);!Ge||Ge.columnId===oe||X("moveItem",{id:K,toColumn:oe})},Ye=v=>{c&&(c.item?X("updateItem",{id:c.item.id,name:v.name,description:v.description}):X("createItem",{name:v.name,description:v.description,columnId:c.columnId}),p(null))},yt=v=>{if(C){N(v);return}ae(v)},ae=v=>{X("deleteItem",{id:v.id}),v.sessionId&&o&&o(v.sessionId)},ge=(0,T.useMemo)(()=>{let v=new Map;for(let S of i?.activities??[])S.itemId&&v.set(S.itemId,Er(S));return v},[i]),Be=i&&(0,h.jsxs)("div",{className:"kf-header",children:[(0,h.jsxs)("span",{className:"kf-header-title",children:[(0,h.jsx)("span",{className:"kf-code-chip",children:i.code}),n||"Board"]}),(0,h.jsxs)("span",{className:"kf-count-chip",children:[i.items.length," items"]}),(0,h.jsxs)("button",{type:"button",className:"kf-btn kf-primary kf-new-item-btn",title:"New item (created in Backlog)","aria-label":"Create a new item in Backlog",onClick:()=>w("backlog"),children:[(0,h.jsx)(Ve,{path:Ji,size:15}),"New item"]}),(0,h.jsx)("span",{className:"kf-spacer"}),(0,h.jsx)("button",{type:"button",className:"kf-iconbtn",title:"Refresh","aria-label":"Refresh board",onClick:()=>X("get"),children:(0,h.jsx)(Ve,{path:"M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6"})}),(0,h.jsx)("button",{type:"button",className:"kf-iconbtn",title:"Board settings","aria-label":"Board settings",onClick:()=>k(v=>!v),children:(0,h.jsx)(Ve,{path:Zi})}),y&&(0,h.jsx)(Jr,{board:i,onCode:v=>X("setCode",{code:v}).then(()=>b(!1)),onConfirmRequired:v=>X("setConfirmRequired",{value:v}),onClose:()=>k(!1)})]}),wt=i&&(0,h.jsx)("div",{className:"kf-body",children:Bt.map(v=>{let S=(i.items??[]).filter(M=>M.columnId===v);return(0,h.jsx)(rs,{colId:v,highlighted:I===v&&x!==null,adding:g===v&&v==="backlog",items:S,flashIds:F,lastLines:ge,onAdd:(M,K)=>{X("createItem",{name:M,description:K,columnId:"backlog"}),w(null)},onCancelAdd:()=>w(null),onOpenSession:Xe,onEdit:M=>p({item:M,columnId:M.columnId}),onArchive:yt},v)})});return(0,h.jsxs)("div",{className:"kf-root",children:[u.length>0&&(0,h.jsxs)("div",{className:"kf-warning",children:[u.map((v,S)=>(0,h.jsx)("div",{children:v},S)),(0,h.jsx)("button",{type:"button",className:"kf-btn kf-ghost",onClick:()=>f([]),children:"Dismiss"})]}),Be,s&&(0,h.jsx)("div",{className:"kf-error kf-loading",children:s}),i?(0,h.jsxs)(gr,{sensors:ne,collisionDetection:Yi,onDragStart:re,onDragOver:bt,onDragEnd:ue,children:[wt,(0,h.jsx)(hr,{dropAnimation:{duration:220,easing:"cubic-bezier(0.2, 0, 0, 1)"},children:x?(0,h.jsxs)("div",{className:"kf-card kf-drag-ghost",style:{width:240,"--kf-card-accent":"var(--kf-accent, var(--dsw-alias-label-secondary))"},children:[(0,h.jsx)("div",{className:"kf-card-id",children:x.id}),(0,h.jsx)("div",{className:"kf-card-name",children:x.name})]}):null})]}):!s&&(0,h.jsx)("div",{className:"kf-loading",children:"Loading board\u2026"}),i&&c&&(0,h.jsx)(Yr,{item:c.item,board:i,onOpenChange:v=>{v||p(null)},onSave:Ye,onDelete:v=>{let S=i.items.find(M=>M.id===v);X("deleteItem",{id:v}),S&&S.sessionId&&o&&o(S.sessionId),p(null)},onOpenSession:Xe}),D&&(0,h.jsx)(Xr,{item:D,onConfirm:()=>{ae(D),N(null)},onCancel:()=>N(null)}),i&&m&&(0,h.jsx)(Gr,{code:i.code,itemCount:i.items.length,onConfirm:v=>X("setCode",{code:v}).then(()=>b(!1)),onDismiss:()=>b(!1)})]})}function os(e){let t={items:[]};return!e||!e.list||typeof e.list.getSnapshot!="function"?t:(0,W.useSyncExternalStore)(n=>e.list.subscribe(n),()=>e.list.getSnapshot())}function is(e){if(!(!e||!e.list||typeof e.list.getSnapshot!="function"))return(0,W.useSyncExternalStore)(t=>e.list.subscribe(t),()=>e.list.getSnapshot().current)}function ss(e){let t=os(e.workspaces),n=(0,W.useSyncExternalStore)($r,Fr),r=is(e.sessions)??e.sessionId,o=Lr({override:n,currentSessionId:r,workspaceItems:Array.isArray(t.items)?t.items:[],recentWorkspaceId:t.recentWorkspaceId});(0,W.useEffect)(()=>{n&&o.nativeWorkspaceId===n.workspaceId&&vt(null)},[n,o.nativeWorkspaceId]);let i=e.workspaces?.archiveSession?a=>{e.workspaces.archiveSession(a)}:void 0;return(0,W.createElement)(Qr,{workspaceId:o.workspaceId,workspaceTitle:o.pinned?o.workspaceTitle||o.workspaceId:o.workspaceTitle,sessions:e.sessions,archiveSession:i})}function as(){return(0,W.createElement)(Zr)}function ls(e){return(0,W.useEffect)(()=>{let t=e.sessions;t&&kr({createSession:n=>t.create({workspaceId:n}),renameSession:async(n,r)=>{let i=await t.binding(n)?.session.rename(r);i&&i.ok===!1&&console.warn("dsh-kanban-flow: rename failed",i.error)},promptSession:async(n,r)=>{let o=t.binding(n);if(!o)throw new Error("session binding unavailable: "+n);let i=await o.session.prompt([{type:"text",text:r}],"queue");if(i&&i.ok===!1)throw new Error("prompt failed: "+(i.error&&i.error.message))},archiveSession:async n=>{let r=e.workspaces?.archiveSession;if(!r)throw new Error("workspaces.archiveSession unavailable");await r(n)}})},[e.sessions,e.workspaces]),(0,W.createElement)("div",{style:{display:"contents"}},(0,W.createElement)(Kr,{workspaces:e.workspaces,sessions:e.sessions}),(0,W.createElement)(Hr,{workspaces:e.workspaces,sessions:e.sessions}),(0,W.createElement)(Wr),(0,W.createElement)(Vr,{workspaces:e.workspaces}),(0,W.createElement)(_r,{workspaces:e.workspaces}),(0,W.createElement)(Ur,{workspaces:e.workspaces}))}var eo={name:"dsh-kanban-flow",inject:["slots"],apply(e){let t=e.get("slots");if(t===void 0)return;let n=e.get("workspaces"),r=e.get("sessions");t.inject("conversation.view",()=>t.register({name:"conversation.view",id:"kanban-flow",order:20,label:"Board"},o=>(0,W.createElement)(ss,{...o,workspaces:n,sessions:r}))),t.inject("settings.plugins.tab",()=>t.register({name:"settings.plugins.tab",id:"dsh-kanban-flow",order:10,label:"Kanban Flow"},()=>(0,W.createElement)(as))),t.inject("sidebar.footer.action",()=>t.register({name:"sidebar.footer.action",id:"kanban-flow-controllers",order:90},()=>(0,W.createElement)(ls,{workspaces:n,sessions:r})))}};try{console.info("[dsh-kanban-flow] client bundle loaded (build 2026-08-25T07:31:40.296Z)")}catch{}var to="data-dsh-kanban-flow-style";if(typeof document<"u"&&!document.querySelector("style["+to+"]")){let e=document.createElement("style");e.setAttribute(to,""),e.textContent=En,document.head.appendChild(e)}var cs=eo;
    
    return module.exports
  },
})