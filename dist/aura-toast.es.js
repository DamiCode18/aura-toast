var B = Object.defineProperty;
var j = (s, t, e) => t in s ? B(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var m = (s, t, e) => (j(s, typeof t != "symbol" ? t + "" : t, e), e);
import { jsxs as d, jsx as i } from "react/jsx-runtime";
import W, { useState as x, useEffect as L } from "react";
const M = 5;
class $ {
  constructor() {
    m(this, "state", []);
    m(this, "listeners", /* @__PURE__ */ new Set());
    m(this, "timeouts", /* @__PURE__ */ new Map());
    m(this, "startTimes", /* @__PURE__ */ new Map());
    m(this, "remainingDurations", /* @__PURE__ */ new Map());
  }
  getState() {
    return this.state;
  }
  subscribe(t) {
    return this.listeners.add(t), () => this.listeners.delete(t);
  }
  notify() {
    this.listeners.forEach((t) => t(this.state));
  }
  isDuplicate(t) {
    return this.state.some(
      (e) => e.title === t.title && (e.type || "info") === (t.type || "info") && e.description === t.description && e.glassy === t.glassy
    );
  }
  show(t) {
    if (this.isDuplicate(t)) {
      const o = this.state.find(
        (l) => l.title === t.title && (l.type || "info") === (t.type || "info") && l.description === t.description && l.glassy === t.glassy
      );
      if (o && o.id) {
        const l = t.duration ?? 4e3;
        l > 0 && (this.startTimes.set(o.id, Date.now()), this.remainingDurations.set(o.id, l), this.startTimer(o.id, l));
      }
      return;
    }
    const e = t.id || Math.random().toString(36).substring(2, 9), r = t.duration ?? 4e3, a = {
      ...t,
      id: e,
      type: t.type || "info",
      duration: r
    };
    if (this.state = [a, ...this.state], this.state.length > M) {
      const o = this.state[this.state.length - 1];
      o && o.id && this.clearTimerData(o.id), this.state = this.state.slice(0, M);
    }
    this.notify(), r > 0 && (this.startTimes.set(e, Date.now()), this.remainingDurations.set(e, r), this.startTimer(e, r));
  }
  startTimer(t, e) {
    this.timeouts.has(t) && clearTimeout(this.timeouts.get(t));
    const r = setTimeout(() => {
      this.dismiss(t);
    }, e);
    this.timeouts.set(t, r);
  }
  clearTimerData(t) {
    this.timeouts.has(t) && (clearTimeout(this.timeouts.get(t)), this.timeouts.delete(t)), this.startTimes.delete(t), this.remainingDurations.delete(t);
  }
  pause() {
    this.state.forEach((t) => {
      const e = t.id;
      if (this.timeouts.has(e) && this.startTimes.has(e)) {
        clearTimeout(this.timeouts.get(e)), this.timeouts.delete(e);
        const r = this.startTimes.get(e), a = Date.now() - r, o = this.remainingDurations.get(e) || 0;
        this.remainingDurations.set(e, Math.max(0, o - a)), this.startTimes.delete(e);
      }
    });
  }
  resume() {
    this.state.forEach((t) => {
      const e = t.id, r = this.remainingDurations.get(e);
      !this.timeouts.has(e) && r !== void 0 && r > 0 && (this.startTimes.set(e, Date.now()), this.startTimer(e, r));
    });
  }
  dismiss(t) {
    t ? (this.clearTimerData(t), this.state = this.state.filter((e) => e.id !== t)) : (this.timeouts.forEach((e) => clearTimeout(e)), this.timeouts.clear(), this.startTimes.clear(), this.remainingDurations.clear(), this.state = []), this.notify();
  }
}
const n = new $(), C = {
  success: (s, t) => {
    const e = typeof s == "string" ? { ...t, title: s } : { ...t, ...s };
    return n.show({ ...e, type: "success" });
  },
  error: (s, t) => {
    const e = typeof s == "string" ? { ...t, title: s } : { ...t, ...s };
    return n.show({ ...e, type: "error" });
  },
  info: (s, t) => {
    const e = typeof s == "string" ? { ...t, title: s } : { ...t, ...s };
    return n.show({ ...e, type: "info" });
  },
  warning: (s, t) => {
    const e = typeof s == "string" ? { ...t, title: s } : { ...t, ...s };
    return n.show({ ...e, type: "warning" });
  },
  promise: (s, t, e) => {
    const r = (e == null ? void 0 : e.id) || Math.random().toString(36).substring(2, 9), a = typeof t.loading == "string" ? { ...e, title: t.loading } : { ...e, ...t.loading };
    return n.show({ ...a, id: r, type: "loading", duration: 0 }), s.then(() => {
      n.dismiss(r);
      const o = typeof t.success == "string" ? { ...e, title: t.success } : { ...e, ...t.success };
      n.show({ ...o, id: r, type: "success" });
    }).catch(() => {
      n.dismiss(r);
      const o = typeof t.error == "string" ? { ...e, title: t.error } : { ...e, ...t.error };
      n.show({ ...o, id: r, type: "error" });
    }), s;
  },
  dismiss: (s) => n.dismiss(s),
  pause: () => n.pause(),
  resume: () => n.resume()
}, R = () => /* @__PURE__ */ d("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ i("path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }),
  /* @__PURE__ */ i("polyline", { points: "22 4 12 14.01 9 11.01" })
] }), A = () => /* @__PURE__ */ d("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ i("circle", { cx: "12", cy: "12", r: "10" }),
  /* @__PURE__ */ i("line", { x1: "15", y1: "9", x2: "9", y2: "15" }),
  /* @__PURE__ */ i("line", { x1: "9", y1: "9", x2: "15", y2: "15" })
] }), Y = () => /* @__PURE__ */ d("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ i("circle", { cx: "12", cy: "12", r: "10" }),
  /* @__PURE__ */ i("line", { x1: "12", y1: "16", x2: "12", y2: "12" }),
  /* @__PURE__ */ i("line", { x1: "12", y1: "8", x2: "12.01", y2: "8" })
] }), O = () => /* @__PURE__ */ d("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ i("path", { d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" }),
  /* @__PURE__ */ i("line", { x1: "12", y1: "9", x2: "12", y2: "13" }),
  /* @__PURE__ */ i("line", { x1: "12", y1: "17", x2: "12.01", y2: "17" })
] }), H = () => /* @__PURE__ */ i("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", className: "aura-spinner", children: /* @__PURE__ */ i("path", { d: "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" }) }), P = ({ config: s, index: t = 0, isStacked: e = !1, totalToasts: r = 1, onHeight: a }) => {
  var w, p, T, c;
  const [o, l] = x(!1), h = W.useRef(null);
  L(() => {
    h.current && a && a(h.current.getBoundingClientRect().height);
    const u = () => {
      h.current && a && a(h.current.getBoundingClientRect().height);
    };
    return window.addEventListener("resize", u), () => window.removeEventListener("resize", u);
  }, [s.title, s.description, a]);
  const y = () => {
    l(!0), setTimeout(() => {
      n.dismiss(s.id);
    }, 300);
  }, f = {
    success: R,
    error: A,
    info: Y,
    warning: O,
    loading: H
  }[s.type || "info"];
  return /* @__PURE__ */ d(
    "div",
    {
      ref: h,
      className: `aura-toast ${s.type || "info"} ${s.glassy !== !1 ? "aura-toast-glassy" : ""} ${o ? "aura-toast-exit" : "aura-toast-enter"} ${s.className || ""}`,
      onMouseEnter: () => C.pause(),
      onMouseLeave: () => C.resume(),
      style: {
        ...s.style,
        ...(w = s.style) != null && w["--type-color"] ? { "--type-color": s.style["--type-color"] } : {},
        ...(p = s.style) != null && p["--type-glow"] ? { "--type-glow": s.style["--type-glow"] } : {},
        ...(T = s.style) != null && T["--toast-font-size-title"] ? { "--toast-font-size-title": s.style["--toast-font-size-title"] } : {},
        ...(c = s.style) != null && c["--toast-font-size-desc"] ? { "--toast-font-size-desc": s.style["--toast-font-size-desc"] } : {}
      },
      children: [
        /* @__PURE__ */ i("div", { className: "aura-icon-container", children: /* @__PURE__ */ i("div", { className: "aura-icon", children: /* @__PURE__ */ i(f, {}) }) }),
        /* @__PURE__ */ d("div", { className: "aura-content", children: [
          s.title && /* @__PURE__ */ i("p", { className: "aura-title", children: s.title }),
          s.description && /* @__PURE__ */ i("p", { className: "aura-description", children: s.description })
        ] }),
        s.action && /* @__PURE__ */ i("div", { className: "aura-action-container", children: /* @__PURE__ */ i("button", { className: "aura-action", onClick: () => {
          var u;
          (u = s.action) == null || u.onClick(), y();
        }, children: s.action.label }) }),
        /* @__PURE__ */ i("button", { className: "aura-close", onClick: y, "aria-label": "Close", children: /* @__PURE__ */ d("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ i("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
          /* @__PURE__ */ i("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
        ] }) })
      ]
    }
  );
};
const q = ({ children: s, className: t, stack: e = !1 }) => {
  const [r, a] = x([]), [o, l] = x({}), [h, y] = x(!1);
  L(() => n.subscribe((c) => {
    a(c || []);
  }), []);
  const f = e ? r : r.slice(0, 1), w = r.length > 0 && r[0].position || "top-right", p = w.startsWith("top");
  let T = 0;
  return /* @__PURE__ */ d("div", { className: t, children: [
    s,
    /* @__PURE__ */ i(
      "div",
      {
        className: `aura-container ${w}`,
        "data-stack": e,
        onMouseEnter: () => y(!0),
        onMouseLeave: () => y(!1),
        children: f.map((c, u) => {
          const D = o[c.id] || 80, b = T;
          T += D + 16;
          const E = u * 16;
          let v = 0;
          e && (v = h ? b : E);
          const N = p ? v : -v, z = e && !h ? Math.max(0, 1 - u * 0.03) : 1, S = 100 - u, I = e && !h && u > 3 ? 0 : 1;
          return /* @__PURE__ */ i(
            "div",
            {
              className: "aura-toast-wrapper",
              style: {
                gridArea: e ? "1 / 1" : "auto",
                zIndex: S,
                transform: `translateY(${N}px) scale(${z})`,
                transformOrigin: p ? "top center" : "bottom center",
                opacity: I,
                transition: "all 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28)",
                pointerEvents: "auto",
                paddingBottom: h && e && p ? "16px" : "0",
                paddingTop: h && e && !p ? "16px" : "0"
              },
              children: /* @__PURE__ */ i(
                P,
                {
                  config: c,
                  isStacked: e,
                  onHeight: (k) => {
                    l((g) => g[c.id] === k ? g : { ...g, [c.id]: k });
                  }
                }
              )
            },
            c.id
          );
        })
      }
    )
  ] });
};
export {
  q as AuraProvider,
  P as AuraToast,
  C as auraToast,
  n as toastStore
};
