var pr = Object.defineProperty;
var mr = (i, n, p) => n in i ? pr(i, n, { enumerable: !0, configurable: !0, writable: !0, value: p }) : i[n] = p;
var F = (i, n, p) => (mr(i, typeof n != "symbol" ? n + "" : n, p), p);
import Oe, { useState as Pe, useEffect as yr } from "./react";
class gr {
  constructor() {
    F(this, "state", null);
    F(this, "listeners", /* @__PURE__ */ new Set());
    F(this, "timeoutId", null);
    F(this, "startTime", null);
    F(this, "remainingDuration", null);
  }
  getState() {
    return this.state;
  }
  subscribe(n) {
    return this.listeners.add(n), () => this.listeners.delete(n);
  }
  notify() {
    this.listeners.forEach((n) => n(this.state));
  }
  isDuplicate(n) {
    return this.state ? this.state.message === n.message && (this.state.type || "info") === (n.type || "info") && this.state.description === n.description && this.state.glassy === n.glassy : !1;
  }
  show(n) {
    if (this.isDuplicate(n)) {
      const x = n.duration ?? 4e3;
      x > 0 && (this.startTime = Date.now(), this.remainingDuration = x, this.startTimer(x));
      return;
    }
    this.dismiss();
    const p = n.id || Math.random().toString(36).substring(2, 9), v = n.duration ?? 4e3;
    this.state = {
      ...n,
      id: p,
      type: n.type || "info",
      duration: v
    }, this.notify(), v > 0 && (this.startTime = Date.now(), this.remainingDuration = v, this.startTimer(v));
  }
  startTimer(n) {
    this.timeoutId && clearTimeout(this.timeoutId), this.timeoutId = setTimeout(() => {
      this.dismiss();
    }, n);
  }
  pause() {
    if (!this.state || !this.timeoutId || !this.startTime)
      return;
    clearTimeout(this.timeoutId), this.timeoutId = null;
    const n = Date.now() - this.startTime;
    this.remainingDuration = Math.max(0, (this.remainingDuration || 0) - n), this.startTime = null;
  }
  resume() {
    !this.state || this.timeoutId || this.remainingDuration === null || this.remainingDuration <= 0 || (this.startTime = Date.now(), this.startTimer(this.remainingDuration));
  }
  dismiss() {
    this.timeoutId && (clearTimeout(this.timeoutId), this.timeoutId = null), this.state = null, this.startTime = null, this.remainingDuration = null, this.notify();
  }
}
const j = new gr(), ke = {
  success: (i, n) => j.show({ ...n, message: i, type: "success" }),
  error: (i, n) => j.show({ ...n, message: i, type: "error" }),
  info: (i, n) => j.show({ ...n, message: i, type: "info" }),
  warning: (i, n) => j.show({ ...n, message: i, type: "warning" }),
  dismiss: () => j.dismiss(),
  pause: () => j.pause(),
  resume: () => j.resume()
};
var re = { exports: {} }, N = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ce;
function br() {
  if (Ce)
    return N;
  Ce = 1;
  var i = Oe, n = Symbol.for("react.element"), p = Symbol.for("react.fragment"), v = Object.prototype.hasOwnProperty, x = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, k = { key: !0, ref: !0, __self: !0, __source: !0 };
  function w(R, m, P) {
    var b, T = {}, C = null, M = null;
    P !== void 0 && (C = "" + P), m.key !== void 0 && (C = "" + m.key), m.ref !== void 0 && (M = m.ref);
    for (b in m)
      v.call(m, b) && !k.hasOwnProperty(b) && (T[b] = m[b]);
    if (R && R.defaultProps)
      for (b in m = R.defaultProps, m)
        T[b] === void 0 && (T[b] = m[b]);
    return { $$typeof: n, type: R, key: C, ref: M, props: T, _owner: x.current };
  }
  return N.Fragment = p, N.jsx = w, N.jsxs = w, N;
}
var Y = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Se;
function Er() {
  return Se || (Se = 1, process.env.NODE_ENV !== "production" && function() {
    var i = Oe, n = Symbol.for("react.element"), p = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), x = Symbol.for("react.strict_mode"), k = Symbol.for("react.profiler"), w = Symbol.for("react.provider"), R = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), P = Symbol.for("react.suspense"), b = Symbol.for("react.suspense_list"), T = Symbol.for("react.memo"), C = Symbol.for("react.lazy"), M = Symbol.for("react.offscreen"), te = Symbol.iterator, De = "@@iterator";
    function Ie(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = te && e[te] || e[De];
      return typeof r == "function" ? r : null;
    }
    var D = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function h(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
          t[a - 1] = arguments[a];
        Ae("error", e, t);
      }
    }
    function Ae(e, r, t) {
      {
        var a = D.ReactDebugCurrentFrame, l = a.getStackAddendum();
        l !== "" && (r += "%s", t = t.concat([l]));
        var c = t.map(function(o) {
          return String(o);
        });
        c.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, c);
      }
    }
    var Fe = !1, Le = !1, We = !1, $e = !1, Ne = !1, ne;
    ne = Symbol.for("react.module.reference");
    function Ye(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === v || e === k || Ne || e === x || e === P || e === b || $e || e === M || Fe || Le || We || typeof e == "object" && e !== null && (e.$$typeof === C || e.$$typeof === T || e.$$typeof === w || e.$$typeof === R || e.$$typeof === m || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === ne || e.getModuleId !== void 0));
    }
    function Me(e, r, t) {
      var a = e.displayName;
      if (a)
        return a;
      var l = r.displayName || r.name || "";
      return l !== "" ? t + "(" + l + ")" : t;
    }
    function ae(e) {
      return e.displayName || "Context";
    }
    function _(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && h("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case v:
          return "Fragment";
        case p:
          return "Portal";
        case k:
          return "Profiler";
        case x:
          return "StrictMode";
        case P:
          return "Suspense";
        case b:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case R:
            var r = e;
            return ae(r) + ".Consumer";
          case w:
            var t = e;
            return ae(t._context) + ".Provider";
          case m:
            return Me(e, e.render, "ForwardRef");
          case T:
            var a = e.displayName || null;
            return a !== null ? a : _(e.type) || "Memo";
          case C: {
            var l = e, c = l._payload, o = l._init;
            try {
              return _(o(c));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var S = Object.assign, L = 0, ie, se, oe, ue, le, ce, fe;
    function de() {
    }
    de.__reactDisabledLog = !0;
    function Ve() {
      {
        if (L === 0) {
          ie = console.log, se = console.info, oe = console.warn, ue = console.error, le = console.group, ce = console.groupCollapsed, fe = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: de,
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
        L++;
      }
    }
    function Ue() {
      {
        if (L--, L === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: S({}, e, {
              value: ie
            }),
            info: S({}, e, {
              value: se
            }),
            warn: S({}, e, {
              value: oe
            }),
            error: S({}, e, {
              value: ue
            }),
            group: S({}, e, {
              value: le
            }),
            groupCollapsed: S({}, e, {
              value: ce
            }),
            groupEnd: S({}, e, {
              value: fe
            })
          });
        }
        L < 0 && h("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var q = D.ReactCurrentDispatcher, K;
    function V(e, r, t) {
      {
        if (K === void 0)
          try {
            throw Error();
          } catch (l) {
            var a = l.stack.trim().match(/\n( *(at )?)/);
            K = a && a[1] || "";
          }
        return `
` + K + e;
      }
    }
    var z = !1, U;
    {
      var Be = typeof WeakMap == "function" ? WeakMap : Map;
      U = new Be();
    }
    function ve(e, r) {
      if (!e || z)
        return "";
      {
        var t = U.get(e);
        if (t !== void 0)
          return t;
      }
      var a;
      z = !0;
      var l = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var c;
      c = q.current, q.current = null, Ve();
      try {
        if (r) {
          var o = function() {
            throw Error();
          };
          if (Object.defineProperty(o.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(o, []);
            } catch (g) {
              a = g;
            }
            Reflect.construct(e, [], o);
          } else {
            try {
              o.call();
            } catch (g) {
              a = g;
            }
            e.call(o.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (g) {
            a = g;
          }
          e();
        }
      } catch (g) {
        if (g && a && typeof g.stack == "string") {
          for (var s = g.stack.split(`
`), y = a.stack.split(`
`), f = s.length - 1, d = y.length - 1; f >= 1 && d >= 0 && s[f] !== y[d]; )
            d--;
          for (; f >= 1 && d >= 0; f--, d--)
            if (s[f] !== y[d]) {
              if (f !== 1 || d !== 1)
                do
                  if (f--, d--, d < 0 || s[f] !== y[d]) {
                    var E = `
` + s[f].replace(" at new ", " at ");
                    return e.displayName && E.includes("<anonymous>") && (E = E.replace("<anonymous>", e.displayName)), typeof e == "function" && U.set(e, E), E;
                  }
                while (f >= 1 && d >= 0);
              break;
            }
        }
      } finally {
        z = !1, q.current = c, Ue(), Error.prepareStackTrace = l;
      }
      var A = e ? e.displayName || e.name : "", O = A ? V(A) : "";
      return typeof e == "function" && U.set(e, O), O;
    }
    function Je(e, r, t) {
      return ve(e, !1);
    }
    function qe(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function B(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ve(e, qe(e));
      if (typeof e == "string")
        return V(e);
      switch (e) {
        case P:
          return V("Suspense");
        case b:
          return V("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case m:
            return Je(e.render);
          case T:
            return B(e.type, r, t);
          case C: {
            var a = e, l = a._payload, c = a._init;
            try {
              return B(c(l), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var W = Object.prototype.hasOwnProperty, he = {}, pe = D.ReactDebugCurrentFrame;
    function J(e) {
      if (e) {
        var r = e._owner, t = B(e.type, e._source, r ? r.type : null);
        pe.setExtraStackFrame(t);
      } else
        pe.setExtraStackFrame(null);
    }
    function Ke(e, r, t, a, l) {
      {
        var c = Function.call.bind(W);
        for (var o in e)
          if (c(e, o)) {
            var s = void 0;
            try {
              if (typeof e[o] != "function") {
                var y = Error((a || "React class") + ": " + t + " type `" + o + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[o] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw y.name = "Invariant Violation", y;
              }
              s = e[o](r, o, a, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (f) {
              s = f;
            }
            s && !(s instanceof Error) && (J(l), h("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", t, o, typeof s), J(null)), s instanceof Error && !(s.message in he) && (he[s.message] = !0, J(l), h("Failed %s type: %s", t, s.message), J(null));
          }
      }
    }
    var ze = Array.isArray;
    function G(e) {
      return ze(e);
    }
    function Ge(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function Xe(e) {
      try {
        return me(e), !1;
      } catch {
        return !0;
      }
    }
    function me(e) {
      return "" + e;
    }
    function ye(e) {
      if (Xe(e))
        return h("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ge(e)), me(e);
    }
    var $ = D.ReactCurrentOwner, He = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ge, be, X;
    X = {};
    function Ze(e) {
      if (W.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function Qe(e) {
      if (W.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function er(e, r) {
      if (typeof e.ref == "string" && $.current && r && $.current.stateNode !== r) {
        var t = _($.current.type);
        X[t] || (h('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', _($.current.type), e.ref), X[t] = !0);
      }
    }
    function rr(e, r) {
      {
        var t = function() {
          ge || (ge = !0, h("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function tr(e, r) {
      {
        var t = function() {
          be || (be = !0, h("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var nr = function(e, r, t, a, l, c, o) {
      var s = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: o,
        // Record the component responsible for creating this element.
        _owner: c
      };
      return s._store = {}, Object.defineProperty(s._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(s, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: a
      }), Object.defineProperty(s, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: l
      }), Object.freeze && (Object.freeze(s.props), Object.freeze(s)), s;
    };
    function ar(e, r, t, a, l) {
      {
        var c, o = {}, s = null, y = null;
        t !== void 0 && (ye(t), s = "" + t), Qe(r) && (ye(r.key), s = "" + r.key), Ze(r) && (y = r.ref, er(r, l));
        for (c in r)
          W.call(r, c) && !He.hasOwnProperty(c) && (o[c] = r[c]);
        if (e && e.defaultProps) {
          var f = e.defaultProps;
          for (c in f)
            o[c] === void 0 && (o[c] = f[c]);
        }
        if (s || y) {
          var d = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          s && rr(o, d), y && tr(o, d);
        }
        return nr(e, s, y, l, a, $.current, o);
      }
    }
    var H = D.ReactCurrentOwner, Ee = D.ReactDebugCurrentFrame;
    function I(e) {
      if (e) {
        var r = e._owner, t = B(e.type, e._source, r ? r.type : null);
        Ee.setExtraStackFrame(t);
      } else
        Ee.setExtraStackFrame(null);
    }
    var Z;
    Z = !1;
    function Q(e) {
      return typeof e == "object" && e !== null && e.$$typeof === n;
    }
    function xe() {
      {
        if (H.current) {
          var e = _(H.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function ir(e) {
      {
        if (e !== void 0) {
          var r = e.fileName.replace(/^.*[\\\/]/, ""), t = e.lineNumber;
          return `

Check your code at ` + r + ":" + t + ".";
        }
        return "";
      }
    }
    var Re = {};
    function sr(e) {
      {
        var r = xe();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function _e(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = sr(r);
        if (Re[t])
          return;
        Re[t] = !0;
        var a = "";
        e && e._owner && e._owner !== H.current && (a = " It was passed a child from " + _(e._owner.type) + "."), I(e), h('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, a), I(null);
      }
    }
    function Te(e, r) {
      {
        if (typeof e != "object")
          return;
        if (G(e))
          for (var t = 0; t < e.length; t++) {
            var a = e[t];
            Q(a) && _e(a, r);
          }
        else if (Q(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var l = Ie(e);
          if (typeof l == "function" && l !== e.entries)
            for (var c = l.call(e), o; !(o = c.next()).done; )
              Q(o.value) && _e(o.value, r);
        }
      }
    }
    function or(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === m || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === T))
          t = r.propTypes;
        else
          return;
        if (t) {
          var a = _(r);
          Ke(t, e.props, "prop", a, e);
        } else if (r.PropTypes !== void 0 && !Z) {
          Z = !0;
          var l = _(r);
          h("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", l || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && h("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ur(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var a = r[t];
          if (a !== "children" && a !== "key") {
            I(e), h("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", a), I(null);
            break;
          }
        }
        e.ref !== null && (I(e), h("Invalid attribute `ref` supplied to `React.Fragment`."), I(null));
      }
    }
    var je = {};
    function we(e, r, t, a, l, c) {
      {
        var o = Ye(e);
        if (!o) {
          var s = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (s += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var y = ir(l);
          y ? s += y : s += xe();
          var f;
          e === null ? f = "null" : G(e) ? f = "array" : e !== void 0 && e.$$typeof === n ? (f = "<" + (_(e.type) || "Unknown") + " />", s = " Did you accidentally export a JSX literal instead of a component?") : f = typeof e, h("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", f, s);
        }
        var d = ar(e, r, t, l, c);
        if (d == null)
          return d;
        if (o) {
          var E = r.children;
          if (E !== void 0)
            if (a)
              if (G(E)) {
                for (var A = 0; A < E.length; A++)
                  Te(E[A], e);
                Object.freeze && Object.freeze(E);
              } else
                h("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Te(E, e);
        }
        if (W.call(r, "key")) {
          var O = _(e), g = Object.keys(r).filter(function(hr) {
            return hr !== "key";
          }), ee = g.length > 0 ? "{key: someKey, " + g.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!je[O + ee]) {
            var vr = g.length > 0 ? "{" + g.join(": ..., ") + ": ...}" : "{}";
            h(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, ee, O, vr, O), je[O + ee] = !0;
          }
        }
        return e === v ? ur(d) : or(d), d;
      }
    }
    function lr(e, r, t) {
      return we(e, r, t, !0);
    }
    function cr(e, r, t) {
      return we(e, r, t, !1);
    }
    var fr = cr, dr = lr;
    Y.Fragment = v, Y.jsx = fr, Y.jsxs = dr;
  }()), Y;
}
process.env.NODE_ENV === "production" ? re.exports = br() : re.exports = Er();
var u = re.exports;
const xr = () => /* @__PURE__ */ u.jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ u.jsx("path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }),
  /* @__PURE__ */ u.jsx("polyline", { points: "22 4 12 14.01 9 11.01" })
] }), Rr = () => /* @__PURE__ */ u.jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ u.jsx("circle", { cx: "12", cy: "12", r: "10" }),
  /* @__PURE__ */ u.jsx("line", { x1: "15", y1: "9", x2: "9", y2: "15" }),
  /* @__PURE__ */ u.jsx("line", { x1: "9", y1: "9", x2: "15", y2: "15" })
] }), _r = () => /* @__PURE__ */ u.jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ u.jsx("circle", { cx: "12", cy: "12", r: "10" }),
  /* @__PURE__ */ u.jsx("line", { x1: "12", y1: "16", x2: "12", y2: "12" }),
  /* @__PURE__ */ u.jsx("line", { x1: "12", y1: "8", x2: "12.01", y2: "8" })
] }), Tr = () => /* @__PURE__ */ u.jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ u.jsx("path", { d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" }),
  /* @__PURE__ */ u.jsx("line", { x1: "12", y1: "9", x2: "12", y2: "13" }),
  /* @__PURE__ */ u.jsx("line", { x1: "12", y1: "17", x2: "12.01", y2: "17" })
] }), jr = ({ config: i }) => {
  var k, w;
  const [n, p] = Pe(!1), v = () => {
    p(!0), setTimeout(() => {
      j.dismiss();
    }, 300);
  }, x = {
    success: xr,
    error: Rr,
    info: _r,
    warning: Tr
  }[i.type || "info"];
  return /* @__PURE__ */ u.jsxs(
    "div",
    {
      className: `aura-toast ${i.type || "info"} ${i.glassy !== !1 ? "aura-toast-glassy" : ""} ${n ? "aura-toast-exit" : "aura-toast-enter"} ${i.className || ""}`,
      onMouseEnter: () => ke.pause(),
      onMouseLeave: () => ke.resume(),
      style: {
        ...i.style,
        ...(k = i.style) != null && k["--type-color"] ? { "--type-color": i.style["--type-color"] } : {},
        ...(w = i.style) != null && w["--type-glow"] ? { "--type-glow": i.style["--type-glow"] } : {}
      },
      children: [
        /* @__PURE__ */ u.jsx("div", { className: "aura-icon-container", children: /* @__PURE__ */ u.jsx("div", { className: "aura-icon", children: /* @__PURE__ */ u.jsx(x, {}) }) }),
        /* @__PURE__ */ u.jsxs("div", { className: "aura-content", children: [
          /* @__PURE__ */ u.jsx("p", { className: "aura-message", children: i.message }),
          i.description && /* @__PURE__ */ u.jsx("p", { className: "aura-description", children: i.description })
        ] }),
        i.action && /* @__PURE__ */ u.jsx("div", { className: "aura-action-container", children: /* @__PURE__ */ u.jsx("button", { className: "aura-action", onClick: () => {
          var R;
          (R = i.action) == null || R.onClick(), v();
        }, children: i.action.label }) }),
        /* @__PURE__ */ u.jsx("button", { className: "aura-close", onClick: v, "aria-label": "Close", children: /* @__PURE__ */ u.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ u.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
          /* @__PURE__ */ u.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
        ] }) })
      ]
    }
  );
};
const Cr = ({ children: i }) => {
  const [n, p] = Pe(null);
  return yr(() => j.subscribe((v) => {
    p(v);
  }), []), /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    i,
    /* @__PURE__ */ u.jsx("div", { className: "aura-container", children: n && /* @__PURE__ */ u.jsx(
      jr,
      {
        config: n
      },
      n.id
    ) })
  ] });
};
export {
  Cr as AuraProvider,
  jr as AuraToast,
  ke as auraToast,
  j as toastStore
};
