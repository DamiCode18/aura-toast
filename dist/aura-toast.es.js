var mt = Object.defineProperty;
var gt = (a, r, i) => r in a ? mt(a, r, { enumerable: !0, configurable: !0, writable: !0, value: i }) : a[r] = i;
var F = (a, r, i) => (gt(a, typeof r != "symbol" ? r + "" : r, i), i);
import de, { useState as G, useEffect as Ye } from "./react";
const Fe = 5;
class bt {
  constructor() {
    F(this, "state", []);
    F(this, "listeners", /* @__PURE__ */ new Set());
    F(this, "timeouts", /* @__PURE__ */ new Map());
    F(this, "startTimes", /* @__PURE__ */ new Map());
    F(this, "remainingDurations", /* @__PURE__ */ new Map());
  }
  getState() {
    return this.state;
  }
  subscribe(r) {
    return this.listeners.add(r), () => this.listeners.delete(r);
  }
  notify() {
    this.listeners.forEach((r) => r(this.state));
  }
  isDuplicate(r) {
    return this.state.some(
      (i) => i.title === r.title && (i.type || "info") === (r.type || "info") && i.description === r.description && i.glassy === r.glassy
    );
  }
  show(r) {
    if (this.isDuplicate(r)) {
      const h = this.state.find(
        (x) => x.title === r.title && (x.type || "info") === (r.type || "info") && x.description === r.description && x.glassy === r.glassy
      );
      if (h && h.id) {
        const x = r.duration ?? 4e3;
        x > 0 && (this.startTimes.set(h.id, Date.now()), this.remainingDurations.set(h.id, x), this.startTimer(h.id, x));
      }
      return;
    }
    const i = r.id || Math.random().toString(36).substring(2, 9), c = r.duration ?? 4e3, E = {
      ...r,
      id: i,
      type: r.type || "info",
      duration: c
    };
    if (this.state = [E, ...this.state], this.state.length > Fe) {
      const h = this.state[this.state.length - 1];
      h && h.id && this.clearTimerData(h.id), this.state = this.state.slice(0, Fe);
    }
    this.notify(), c > 0 && (this.startTimes.set(i, Date.now()), this.remainingDurations.set(i, c), this.startTimer(i, c));
  }
  startTimer(r, i) {
    this.timeouts.has(r) && clearTimeout(this.timeouts.get(r));
    const c = setTimeout(() => {
      this.dismiss(r);
    }, i);
    this.timeouts.set(r, c);
  }
  clearTimerData(r) {
    this.timeouts.has(r) && (clearTimeout(this.timeouts.get(r)), this.timeouts.delete(r)), this.startTimes.delete(r), this.remainingDurations.delete(r);
  }
  pause() {
    this.state.forEach((r) => {
      const i = r.id;
      if (this.timeouts.has(i) && this.startTimes.has(i)) {
        clearTimeout(this.timeouts.get(i)), this.timeouts.delete(i);
        const c = this.startTimes.get(i), E = Date.now() - c, h = this.remainingDurations.get(i) || 0;
        this.remainingDurations.set(i, Math.max(0, h - E)), this.startTimes.delete(i);
      }
    });
  }
  resume() {
    this.state.forEach((r) => {
      const i = r.id, c = this.remainingDurations.get(i);
      !this.timeouts.has(i) && c !== void 0 && c > 0 && (this.startTimes.set(i, Date.now()), this.startTimer(i, c));
    });
  }
  dismiss(r) {
    r ? (this.clearTimerData(r), this.state = this.state.filter((i) => i.id !== r)) : (this.timeouts.forEach((i) => clearTimeout(i)), this.timeouts.clear(), this.startTimes.clear(), this.remainingDurations.clear(), this.state = []), this.notify();
  }
}
const j = new bt(), We = {
  success: (a, r) => {
    const i = typeof a == "string" ? { ...r, title: a } : { ...r, ...a };
    return j.show({ ...i, type: "success" });
  },
  error: (a, r) => {
    const i = typeof a == "string" ? { ...r, title: a } : { ...r, ...a };
    return j.show({ ...i, type: "error" });
  },
  info: (a, r) => {
    const i = typeof a == "string" ? { ...r, title: a } : { ...r, ...a };
    return j.show({ ...i, type: "info" });
  },
  warning: (a, r) => {
    const i = typeof a == "string" ? { ...r, title: a } : { ...r, ...a };
    return j.show({ ...i, type: "warning" });
  },
  promise: (a, r, i) => {
    const c = (i == null ? void 0 : i.id) || Math.random().toString(36).substring(2, 9), E = typeof r.loading == "string" ? { ...i, title: r.loading } : { ...i, ...r.loading };
    return j.show({ ...E, id: c, type: "loading", duration: 0 }), a.then(() => {
      j.dismiss(c);
      const h = typeof r.success == "string" ? { ...i, title: r.success } : { ...i, ...r.success };
      j.show({ ...h, id: c, type: "success" });
    }).catch(() => {
      j.dismiss(c);
      const h = typeof r.error == "string" ? { ...i, title: r.error } : { ...i, ...r.error };
      j.show({ ...h, id: c, type: "error" });
    }), a;
  },
  dismiss: (a) => j.dismiss(a),
  pause: () => j.pause(),
  resume: () => j.resume()
};
var fe = { exports: {} }, B = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var $e;
function Et() {
  if ($e)
    return B;
  $e = 1;
  var a = de, r = Symbol.for("react.element"), i = Symbol.for("react.fragment"), c = Object.prototype.hasOwnProperty, E = a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, h = { key: !0, ref: !0, __self: !0, __source: !0 };
  function x(g, v, O) {
    var b, R = {}, C = null, T = null;
    O !== void 0 && (C = "" + O), v.key !== void 0 && (C = "" + v.key), v.ref !== void 0 && (T = v.ref);
    for (b in v)
      c.call(v, b) && !h.hasOwnProperty(b) && (R[b] = v[b]);
    if (g && g.defaultProps)
      for (b in v = g.defaultProps, v)
        R[b] === void 0 && (R[b] = v[b]);
    return { $$typeof: r, type: g, key: C, ref: T, props: R, _owner: E.current };
  }
  return B.Fragment = i, B.jsx = x, B.jsxs = x, B;
}
var V = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ne;
function xt() {
  return Ne || (Ne = 1, process.env.NODE_ENV !== "production" && function() {
    var a = de, r = Symbol.for("react.element"), i = Symbol.for("react.portal"), c = Symbol.for("react.fragment"), E = Symbol.for("react.strict_mode"), h = Symbol.for("react.profiler"), x = Symbol.for("react.provider"), g = Symbol.for("react.context"), v = Symbol.for("react.forward_ref"), O = Symbol.for("react.suspense"), b = Symbol.for("react.suspense_list"), R = Symbol.for("react.memo"), C = Symbol.for("react.lazy"), T = Symbol.for("react.offscreen"), S = Symbol.iterator, X = "@@iterator";
    function H(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = S && e[S] || e[X];
      return typeof t == "function" ? t : null;
    }
    var D = a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function y(e) {
      {
        for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)
          n[s - 1] = arguments[s];
        Z("error", e, n);
      }
    }
    function Z(e, t, n) {
      {
        var s = D.ReactDebugCurrentFrame, f = s.getStackAddendum();
        f !== "" && (t += "%s", n = n.concat([f]));
        var d = n.map(function(u) {
          return String(u);
        });
        d.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, d);
      }
    }
    var Q = !1, ee = !1, te = !1, z = !1, W = !1, he;
    he = Symbol.for("react.module.reference");
    function Be(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === c || e === h || W || e === E || e === O || e === b || z || e === T || Q || ee || te || typeof e == "object" && e !== null && (e.$$typeof === C || e.$$typeof === R || e.$$typeof === x || e.$$typeof === g || e.$$typeof === v || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === he || e.getModuleId !== void 0));
    }
    function Ve(e, t, n) {
      var s = e.displayName;
      if (s)
        return s;
      var f = t.displayName || t.name || "";
      return f !== "" ? n + "(" + f + ")" : n;
    }
    function ve(e) {
      return e.displayName || "Context";
    }
    function P(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && y("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case c:
          return "Fragment";
        case i:
          return "Portal";
        case h:
          return "Profiler";
        case E:
          return "StrictMode";
        case O:
          return "Suspense";
        case b:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case g:
            var t = e;
            return ve(t) + ".Consumer";
          case x:
            var n = e;
            return ve(n._context) + ".Provider";
          case v:
            return Ve(e, e.render, "ForwardRef");
          case R:
            var s = e.displayName || null;
            return s !== null ? s : P(e.type) || "Memo";
          case C: {
            var f = e, d = f._payload, u = f._init;
            try {
              return P(u(d));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var A = Object.assign, $ = 0, pe, ye, me, ge, be, Ee, xe;
    function Re() {
    }
    Re.__reactDisabledLog = !0;
    function ze() {
      {
        if ($ === 0) {
          pe = console.log, ye = console.info, me = console.warn, ge = console.error, be = console.group, Ee = console.groupCollapsed, xe = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: Re,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        $++;
      }
    }
    function Ue() {
      {
        if ($--, $ === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: A({}, e, {
              value: pe
            }),
            info: A({}, e, {
              value: ye
            }),
            warn: A({}, e, {
              value: me
            }),
            error: A({}, e, {
              value: ge
            }),
            group: A({}, e, {
              value: be
            }),
            groupCollapsed: A({}, e, {
              value: Ee
            }),
            groupEnd: A({}, e, {
              value: xe
            })
          });
        }
        $ < 0 && y("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var re = D.ReactCurrentDispatcher, ne;
    function U(e, t, n) {
      {
        if (ne === void 0)
          try {
            throw Error();
          } catch (f) {
            var s = f.stack.trim().match(/\n( *(at )?)/);
            ne = s && s[1] || "";
          }
        return `
` + ne + e;
      }
    }
    var ie = !1, J;
    {
      var Je = typeof WeakMap == "function" ? WeakMap : Map;
      J = new Je();
    }
    function Te(e, t) {
      if (!e || ie)
        return "";
      {
        var n = J.get(e);
        if (n !== void 0)
          return n;
      }
      var s;
      ie = !0;
      var f = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var d;
      d = re.current, re.current = null, ze();
      try {
        if (t) {
          var u = function() {
            throw Error();
          };
          if (Object.defineProperty(u.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(u, []);
            } catch (w) {
              s = w;
            }
            Reflect.construct(e, [], u);
          } else {
            try {
              u.call();
            } catch (w) {
              s = w;
            }
            e.call(u.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (w) {
            s = w;
          }
          e();
        }
      } catch (w) {
        if (w && s && typeof w.stack == "string") {
          for (var o = w.stack.split(`
`), _ = s.stack.split(`
`), p = o.length - 1, m = _.length - 1; p >= 1 && m >= 0 && o[p] !== _[m]; )
            m--;
          for (; p >= 1 && m >= 0; p--, m--)
            if (o[p] !== _[m]) {
              if (p !== 1 || m !== 1)
                do
                  if (p--, m--, m < 0 || o[p] !== _[m]) {
                    var k = `
` + o[p].replace(" at new ", " at ");
                    return e.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", e.displayName)), typeof e == "function" && J.set(e, k), k;
                  }
                while (p >= 1 && m >= 0);
              break;
            }
        }
      } finally {
        ie = !1, re.current = d, Ue(), Error.prepareStackTrace = f;
      }
      var L = e ? e.displayName || e.name : "", I = L ? U(L) : "";
      return typeof e == "function" && J.set(e, I), I;
    }
    function qe(e, t, n) {
      return Te(e, !1);
    }
    function Ke(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function q(e, t, n) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Te(e, Ke(e));
      if (typeof e == "string")
        return U(e);
      switch (e) {
        case O:
          return U("Suspense");
        case b:
          return U("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case v:
            return qe(e.render);
          case R:
            return q(e.type, t, n);
          case C: {
            var s = e, f = s._payload, d = s._init;
            try {
              return q(d(f), t, n);
            } catch {
            }
          }
        }
      return "";
    }
    var N = Object.prototype.hasOwnProperty, _e = {}, we = D.ReactDebugCurrentFrame;
    function K(e) {
      if (e) {
        var t = e._owner, n = q(e.type, e._source, t ? t.type : null);
        we.setExtraStackFrame(n);
      } else
        we.setExtraStackFrame(null);
    }
    function Ge(e, t, n, s, f) {
      {
        var d = Function.call.bind(N);
        for (var u in e)
          if (d(e, u)) {
            var o = void 0;
            try {
              if (typeof e[u] != "function") {
                var _ = Error((s || "React class") + ": " + n + " type `" + u + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[u] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw _.name = "Invariant Violation", _;
              }
              o = e[u](t, u, s, n, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (p) {
              o = p;
            }
            o && !(o instanceof Error) && (K(f), y("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", s || "React class", n, u, typeof o), K(null)), o instanceof Error && !(o.message in _e) && (_e[o.message] = !0, K(f), y("Failed %s type: %s", n, o.message), K(null));
          }
      }
    }
    var Xe = Array.isArray;
    function ae(e) {
      return Xe(e);
    }
    function He(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, n = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return n;
      }
    }
    function Ze(e) {
      try {
        return je(e), !1;
      } catch {
        return !0;
      }
    }
    function je(e) {
      return "" + e;
    }
    function Ce(e) {
      if (Ze(e))
        return y("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", He(e)), je(e);
    }
    var Y = D.ReactCurrentOwner, Qe = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Se, ke, se;
    se = {};
    function et(e) {
      if (N.call(e, "ref")) {
        var t = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (t && t.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function tt(e) {
      if (N.call(e, "key")) {
        var t = Object.getOwnPropertyDescriptor(e, "key").get;
        if (t && t.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function rt(e, t) {
      if (typeof e.ref == "string" && Y.current && t && Y.current.stateNode !== t) {
        var n = P(Y.current.type);
        se[n] || (y('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', P(Y.current.type), e.ref), se[n] = !0);
      }
    }
    function nt(e, t) {
      {
        var n = function() {
          Se || (Se = !0, y("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: n,
          configurable: !0
        });
      }
    }
    function it(e, t) {
      {
        var n = function() {
          ke || (ke = !0, y("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: n,
          configurable: !0
        });
      }
    }
    var at = function(e, t, n, s, f, d, u) {
      var o = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: r,
        // Built-in properties that belong on the element
        type: e,
        key: t,
        ref: n,
        props: u,
        // Record the component responsible for creating this element.
        _owner: d
      };
      return o._store = {}, Object.defineProperty(o._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(o, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: s
      }), Object.defineProperty(o, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: f
      }), Object.freeze && (Object.freeze(o.props), Object.freeze(o)), o;
    };
    function st(e, t, n, s, f) {
      {
        var d, u = {}, o = null, _ = null;
        n !== void 0 && (Ce(n), o = "" + n), tt(t) && (Ce(t.key), o = "" + t.key), et(t) && (_ = t.ref, rt(t, f));
        for (d in t)
          N.call(t, d) && !Qe.hasOwnProperty(d) && (u[d] = t[d]);
        if (e && e.defaultProps) {
          var p = e.defaultProps;
          for (d in p)
            u[d] === void 0 && (u[d] = p[d]);
        }
        if (o || _) {
          var m = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          o && nt(u, m), _ && it(u, m);
        }
        return at(e, o, _, f, s, Y.current, u);
      }
    }
    var oe = D.ReactCurrentOwner, Oe = D.ReactDebugCurrentFrame;
    function M(e) {
      if (e) {
        var t = e._owner, n = q(e.type, e._source, t ? t.type : null);
        Oe.setExtraStackFrame(n);
      } else
        Oe.setExtraStackFrame(null);
    }
    var ue;
    ue = !1;
    function le(e) {
      return typeof e == "object" && e !== null && e.$$typeof === r;
    }
    function Pe() {
      {
        if (oe.current) {
          var e = P(oe.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function ot(e) {
      {
        if (e !== void 0) {
          var t = e.fileName.replace(/^.*[\\\/]/, ""), n = e.lineNumber;
          return `

Check your code at ` + t + ":" + n + ".";
        }
        return "";
      }
    }
    var De = {};
    function ut(e) {
      {
        var t = Pe();
        if (!t) {
          var n = typeof e == "string" ? e : e.displayName || e.name;
          n && (t = `

Check the top-level render call using <` + n + ">.");
        }
        return t;
      }
    }
    function Ae(e, t) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var n = ut(t);
        if (De[n])
          return;
        De[n] = !0;
        var s = "";
        e && e._owner && e._owner !== oe.current && (s = " It was passed a child from " + P(e._owner.type) + "."), M(e), y('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', n, s), M(null);
      }
    }
    function Ie(e, t) {
      {
        if (typeof e != "object")
          return;
        if (ae(e))
          for (var n = 0; n < e.length; n++) {
            var s = e[n];
            le(s) && Ae(s, t);
          }
        else if (le(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var f = H(e);
          if (typeof f == "function" && f !== e.entries)
            for (var d = f.call(e), u; !(u = d.next()).done; )
              le(u.value) && Ae(u.value, t);
        }
      }
    }
    function lt(e) {
      {
        var t = e.type;
        if (t == null || typeof t == "string")
          return;
        var n;
        if (typeof t == "function")
          n = t.propTypes;
        else if (typeof t == "object" && (t.$$typeof === v || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        t.$$typeof === R))
          n = t.propTypes;
        else
          return;
        if (n) {
          var s = P(t);
          Ge(n, e.props, "prop", s, e);
        } else if (t.PropTypes !== void 0 && !ue) {
          ue = !0;
          var f = P(t);
          y("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", f || "Unknown");
        }
        typeof t.getDefaultProps == "function" && !t.getDefaultProps.isReactClassApproved && y("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ct(e) {
      {
        for (var t = Object.keys(e.props), n = 0; n < t.length; n++) {
          var s = t[n];
          if (s !== "children" && s !== "key") {
            M(e), y("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", s), M(null);
            break;
          }
        }
        e.ref !== null && (M(e), y("Invalid attribute `ref` supplied to `React.Fragment`."), M(null));
      }
    }
    var Me = {};
    function Le(e, t, n, s, f, d) {
      {
        var u = Be(e);
        if (!u) {
          var o = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (o += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var _ = ot(f);
          _ ? o += _ : o += Pe();
          var p;
          e === null ? p = "null" : ae(e) ? p = "array" : e !== void 0 && e.$$typeof === r ? (p = "<" + (P(e.type) || "Unknown") + " />", o = " Did you accidentally export a JSX literal instead of a component?") : p = typeof e, y("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", p, o);
        }
        var m = st(e, t, n, f, d);
        if (m == null)
          return m;
        if (u) {
          var k = t.children;
          if (k !== void 0)
            if (s)
              if (ae(k)) {
                for (var L = 0; L < k.length; L++)
                  Ie(k[L], e);
                Object.freeze && Object.freeze(k);
              } else
                y("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ie(k, e);
        }
        if (N.call(t, "key")) {
          var I = P(e), w = Object.keys(t).filter(function(yt) {
            return yt !== "key";
          }), ce = w.length > 0 ? "{key: someKey, " + w.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Me[I + ce]) {
            var pt = w.length > 0 ? "{" + w.join(": ..., ") + ": ...}" : "{}";
            y(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, ce, I, pt, I), Me[I + ce] = !0;
          }
        }
        return e === c ? ct(m) : lt(m), m;
      }
    }
    function ft(e, t, n) {
      return Le(e, t, n, !0);
    }
    function dt(e, t, n) {
      return Le(e, t, n, !1);
    }
    var ht = dt, vt = ft;
    V.Fragment = c, V.jsx = ht, V.jsxs = vt;
  }()), V;
}
process.env.NODE_ENV === "production" ? fe.exports = Et() : fe.exports = xt();
var l = fe.exports;
const Rt = () => /* @__PURE__ */ l.jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ l.jsx("path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }),
  /* @__PURE__ */ l.jsx("polyline", { points: "22 4 12 14.01 9 11.01" })
] }), Tt = () => /* @__PURE__ */ l.jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ l.jsx("circle", { cx: "12", cy: "12", r: "10" }),
  /* @__PURE__ */ l.jsx("line", { x1: "15", y1: "9", x2: "9", y2: "15" }),
  /* @__PURE__ */ l.jsx("line", { x1: "9", y1: "9", x2: "15", y2: "15" })
] }), _t = () => /* @__PURE__ */ l.jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ l.jsx("circle", { cx: "12", cy: "12", r: "10" }),
  /* @__PURE__ */ l.jsx("line", { x1: "12", y1: "16", x2: "12", y2: "12" }),
  /* @__PURE__ */ l.jsx("line", { x1: "12", y1: "8", x2: "12.01", y2: "8" })
] }), wt = () => /* @__PURE__ */ l.jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ l.jsx("path", { d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" }),
  /* @__PURE__ */ l.jsx("line", { x1: "12", y1: "9", x2: "12", y2: "13" }),
  /* @__PURE__ */ l.jsx("line", { x1: "12", y1: "17", x2: "12.01", y2: "17" })
] }), jt = () => /* @__PURE__ */ l.jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", className: "aura-spinner", children: /* @__PURE__ */ l.jsx("path", { d: "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" }) }), Ct = ({ config: a, index: r = 0, isStacked: i = !1, totalToasts: c = 1, onHeight: E }) => {
  var b, R, C, T;
  const [h, x] = G(!1), g = de.useRef(null);
  Ye(() => {
    g.current && E && E(g.current.getBoundingClientRect().height);
    const S = () => {
      g.current && E && E(g.current.getBoundingClientRect().height);
    };
    return window.addEventListener("resize", S), () => window.removeEventListener("resize", S);
  }, [a.title, a.description, E]);
  const v = () => {
    x(!0), setTimeout(() => {
      j.dismiss(a.id);
    }, 300);
  }, O = {
    success: Rt,
    error: Tt,
    info: _t,
    warning: wt,
    loading: jt
  }[a.type || "info"];
  return /* @__PURE__ */ l.jsxs(
    "div",
    {
      ref: g,
      className: `aura-toast ${a.type || "info"} ${a.glassy !== !1 ? "aura-toast-glassy" : ""} ${h ? "aura-toast-exit" : "aura-toast-enter"} ${a.className || ""}`,
      onMouseEnter: () => We.pause(),
      onMouseLeave: () => We.resume(),
      style: {
        ...a.style,
        ...(b = a.style) != null && b["--type-color"] ? { "--type-color": a.style["--type-color"] } : {},
        ...(R = a.style) != null && R["--type-glow"] ? { "--type-glow": a.style["--type-glow"] } : {},
        ...(C = a.style) != null && C["--toast-font-size-title"] ? { "--toast-font-size-title": a.style["--toast-font-size-title"] } : {},
        ...(T = a.style) != null && T["--toast-font-size-desc"] ? { "--toast-font-size-desc": a.style["--toast-font-size-desc"] } : {}
      },
      children: [
        /* @__PURE__ */ l.jsx("div", { className: "aura-icon-container", children: /* @__PURE__ */ l.jsx("div", { className: "aura-icon", children: /* @__PURE__ */ l.jsx(O, {}) }) }),
        /* @__PURE__ */ l.jsxs("div", { className: "aura-content", children: [
          a.title && /* @__PURE__ */ l.jsx("p", { className: "aura-title", children: a.title }),
          a.description && /* @__PURE__ */ l.jsx("p", { className: "aura-description", children: a.description })
        ] }),
        a.action && /* @__PURE__ */ l.jsx("div", { className: "aura-action-container", children: /* @__PURE__ */ l.jsx("button", { className: "aura-action", onClick: () => {
          var S;
          (S = a.action) == null || S.onClick(), v();
        }, children: a.action.label }) }),
        /* @__PURE__ */ l.jsx("button", { className: "aura-close", onClick: v, "aria-label": "Close", children: /* @__PURE__ */ l.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ l.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
          /* @__PURE__ */ l.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
        ] }) })
      ]
    }
  );
};
const Ot = ({ children: a, className: r, stack: i = !1 }) => {
  const [c, E] = G([]), [h, x] = G({}), [g, v] = G(!1);
  Ye(() => j.subscribe((T) => {
    E(T || []);
  }), []);
  const O = i ? c : c.slice(0, 1), b = c.length > 0 && c[0].position || "top-right", R = b.startsWith("top");
  let C = 0;
  return /* @__PURE__ */ l.jsxs("div", { className: r, children: [
    a,
    /* @__PURE__ */ l.jsx(
      "div",
      {
        className: `aura-container ${b}`,
        "data-stack": i,
        onMouseEnter: () => v(!0),
        onMouseLeave: () => v(!1),
        children: O.map((T, S) => {
          const X = h[T.id] || 80, H = C;
          C += X + 16;
          const D = S * 16;
          let y = 0;
          i && (y = g ? H : D);
          const Z = R ? y : -y, Q = i && !g ? Math.max(0, 1 - S * 0.03) : 1, ee = 100 - S, te = i && !g && S > 3 ? 0 : 1;
          return /* @__PURE__ */ l.jsx(
            "div",
            {
              className: "aura-toast-wrapper",
              style: {
                gridArea: i ? "1 / 1" : "auto",
                zIndex: ee,
                transform: `translateY(${Z}px) scale(${Q})`,
                transformOrigin: R ? "top center" : "bottom center",
                opacity: te,
                transition: "all 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28)",
                pointerEvents: "auto",
                paddingBottom: g && i && R ? "16px" : "0",
                paddingTop: g && i && !R ? "16px" : "0"
              },
              children: /* @__PURE__ */ l.jsx(
                Ct,
                {
                  config: T,
                  isStacked: i,
                  onHeight: (z) => {
                    x((W) => W[T.id] === z ? W : { ...W, [T.id]: z });
                  }
                }
              )
            },
            T.id
          );
        })
      }
    )
  ] });
};
export {
  Ot as AuraProvider,
  Ct as AuraToast,
  We as auraToast,
  j as toastStore
};
