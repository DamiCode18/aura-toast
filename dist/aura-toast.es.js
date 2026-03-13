var pr = Object.defineProperty;
var mr = (i, a, p) => a in i ? pr(i, a, { enumerable: !0, configurable: !0, writable: !0, value: p }) : i[a] = p;
var F = (i, a, p) => (mr(i, typeof a != "symbol" ? a + "" : a, p), p);
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
  subscribe(a) {
    return this.listeners.add(a), () => this.listeners.delete(a);
  }
  notify() {
    this.listeners.forEach((a) => a(this.state));
  }
  show(a) {
    this.dismiss();
    const p = a.id || Math.random().toString(36).substring(2, 9), v = a.duration ?? 4e3;
    this.state = {
      ...a,
      id: p,
      type: a.type || "info",
      duration: v
    }, this.notify(), v > 0 && (this.startTime = Date.now(), this.remainingDuration = v, this.startTimer(v));
  }
  startTimer(a) {
    this.timeoutId && clearTimeout(this.timeoutId), this.timeoutId = setTimeout(() => {
      this.dismiss();
    }, a);
  }
  pause() {
    if (!this.state || !this.timeoutId || !this.startTime)
      return;
    clearTimeout(this.timeoutId), this.timeoutId = null;
    const a = Date.now() - this.startTime;
    this.remainingDuration = Math.max(0, (this.remainingDuration || 0) - a), this.startTime = null;
  }
  resume() {
    !this.state || this.timeoutId || this.remainingDuration === null || this.remainingDuration <= 0 || (this.startTime = Date.now(), this.startTimer(this.remainingDuration));
  }
  dismiss() {
    this.timeoutId && (clearTimeout(this.timeoutId), this.timeoutId = null), this.state = null, this.startTime = null, this.remainingDuration = null, this.notify();
  }
}
const T = new gr(), ke = {
  success: (i, a) => T.show({ ...a, message: i, type: "success" }),
  error: (i, a) => T.show({ ...a, message: i, type: "error" }),
  info: (i, a) => T.show({ ...a, message: i, type: "info" }),
  warning: (i, a) => T.show({ ...a, message: i, type: "warning" }),
  dismiss: () => T.dismiss(),
  pause: () => T.pause(),
  resume: () => T.resume()
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
  var i = Oe, a = Symbol.for("react.element"), p = Symbol.for("react.fragment"), v = Object.prototype.hasOwnProperty, O = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, w = { key: !0, ref: !0, __self: !0, __source: !0 };
  function j(x, m, P) {
    var b, _ = {}, k = null, M = null;
    P !== void 0 && (k = "" + P), m.key !== void 0 && (k = "" + m.key), m.ref !== void 0 && (M = m.ref);
    for (b in m)
      v.call(m, b) && !w.hasOwnProperty(b) && (_[b] = m[b]);
    if (x && x.defaultProps)
      for (b in m = x.defaultProps, m)
        _[b] === void 0 && (_[b] = m[b]);
    return { $$typeof: a, type: x, key: k, ref: M, props: _, _owner: O.current };
  }
  return N.Fragment = p, N.jsx = j, N.jsxs = j, N;
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
    var i = Oe, a = Symbol.for("react.element"), p = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), O = Symbol.for("react.strict_mode"), w = Symbol.for("react.profiler"), j = Symbol.for("react.provider"), x = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), P = Symbol.for("react.suspense"), b = Symbol.for("react.suspense_list"), _ = Symbol.for("react.memo"), k = Symbol.for("react.lazy"), M = Symbol.for("react.offscreen"), te = Symbol.iterator, De = "@@iterator";
    function Ie(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = te && e[te] || e[De];
      return typeof r == "function" ? r : null;
    }
    var D = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function h(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
          t[n - 1] = arguments[n];
        Ae("error", e, t);
      }
    }
    function Ae(e, r, t) {
      {
        var n = D.ReactDebugCurrentFrame, l = n.getStackAddendum();
        l !== "" && (r += "%s", t = t.concat([l]));
        var c = t.map(function(s) {
          return String(s);
        });
        c.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, c);
      }
    }
    var Fe = !1, Le = !1, We = !1, $e = !1, Ne = !1, ne;
    ne = Symbol.for("react.module.reference");
    function Ye(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === v || e === w || Ne || e === O || e === P || e === b || $e || e === M || Fe || Le || We || typeof e == "object" && e !== null && (e.$$typeof === k || e.$$typeof === _ || e.$$typeof === j || e.$$typeof === x || e.$$typeof === m || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === ne || e.getModuleId !== void 0));
    }
    function Me(e, r, t) {
      var n = e.displayName;
      if (n)
        return n;
      var l = r.displayName || r.name || "";
      return l !== "" ? t + "(" + l + ")" : t;
    }
    function ae(e) {
      return e.displayName || "Context";
    }
    function R(e) {
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
        case w:
          return "Profiler";
        case O:
          return "StrictMode";
        case P:
          return "Suspense";
        case b:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case x:
            var r = e;
            return ae(r) + ".Consumer";
          case j:
            var t = e;
            return ae(t._context) + ".Provider";
          case m:
            return Me(e, e.render, "ForwardRef");
          case _:
            var n = e.displayName || null;
            return n !== null ? n : R(e.type) || "Memo";
          case k: {
            var l = e, c = l._payload, s = l._init;
            try {
              return R(s(c));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var C = Object.assign, L = 0, ie, oe, se, ue, le, ce, fe;
    function de() {
    }
    de.__reactDisabledLog = !0;
    function Ve() {
      {
        if (L === 0) {
          ie = console.log, oe = console.info, se = console.warn, ue = console.error, le = console.group, ce = console.groupCollapsed, fe = console.groupEnd;
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
            log: C({}, e, {
              value: ie
            }),
            info: C({}, e, {
              value: oe
            }),
            warn: C({}, e, {
              value: se
            }),
            error: C({}, e, {
              value: ue
            }),
            group: C({}, e, {
              value: le
            }),
            groupCollapsed: C({}, e, {
              value: ce
            }),
            groupEnd: C({}, e, {
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
            var n = l.stack.trim().match(/\n( *(at )?)/);
            K = n && n[1] || "";
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
      var n;
      z = !0;
      var l = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var c;
      c = q.current, q.current = null, Ve();
      try {
        if (r) {
          var s = function() {
            throw Error();
          };
          if (Object.defineProperty(s.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(s, []);
            } catch (g) {
              n = g;
            }
            Reflect.construct(e, [], s);
          } else {
            try {
              s.call();
            } catch (g) {
              n = g;
            }
            e.call(s.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (g) {
            n = g;
          }
          e();
        }
      } catch (g) {
        if (g && n && typeof g.stack == "string") {
          for (var o = g.stack.split(`
`), y = n.stack.split(`
`), f = o.length - 1, d = y.length - 1; f >= 1 && d >= 0 && o[f] !== y[d]; )
            d--;
          for (; f >= 1 && d >= 0; f--, d--)
            if (o[f] !== y[d]) {
              if (f !== 1 || d !== 1)
                do
                  if (f--, d--, d < 0 || o[f] !== y[d]) {
                    var E = `
` + o[f].replace(" at new ", " at ");
                    return e.displayName && E.includes("<anonymous>") && (E = E.replace("<anonymous>", e.displayName)), typeof e == "function" && U.set(e, E), E;
                  }
                while (f >= 1 && d >= 0);
              break;
            }
        }
      } finally {
        z = !1, q.current = c, Ue(), Error.prepareStackTrace = l;
      }
      var A = e ? e.displayName || e.name : "", S = A ? V(A) : "";
      return typeof e == "function" && U.set(e, S), S;
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
          case _:
            return B(e.type, r, t);
          case k: {
            var n = e, l = n._payload, c = n._init;
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
    function Ke(e, r, t, n, l) {
      {
        var c = Function.call.bind(W);
        for (var s in e)
          if (c(e, s)) {
            var o = void 0;
            try {
              if (typeof e[s] != "function") {
                var y = Error((n || "React class") + ": " + t + " type `" + s + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[s] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw y.name = "Invariant Violation", y;
              }
              o = e[s](r, s, n, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (f) {
              o = f;
            }
            o && !(o instanceof Error) && (J(l), h("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", t, s, typeof o), J(null)), o instanceof Error && !(o.message in he) && (he[o.message] = !0, J(l), h("Failed %s type: %s", t, o.message), J(null));
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
        var t = R($.current.type);
        X[t] || (h('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', R($.current.type), e.ref), X[t] = !0);
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
    var nr = function(e, r, t, n, l, c, s) {
      var o = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: a,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: s,
        // Record the component responsible for creating this element.
        _owner: c
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
        value: n
      }), Object.defineProperty(o, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: l
      }), Object.freeze && (Object.freeze(o.props), Object.freeze(o)), o;
    };
    function ar(e, r, t, n, l) {
      {
        var c, s = {}, o = null, y = null;
        t !== void 0 && (ye(t), o = "" + t), Qe(r) && (ye(r.key), o = "" + r.key), Ze(r) && (y = r.ref, er(r, l));
        for (c in r)
          W.call(r, c) && !He.hasOwnProperty(c) && (s[c] = r[c]);
        if (e && e.defaultProps) {
          var f = e.defaultProps;
          for (c in f)
            s[c] === void 0 && (s[c] = f[c]);
        }
        if (o || y) {
          var d = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          o && rr(s, d), y && tr(s, d);
        }
        return nr(e, o, y, l, n, $.current, s);
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
      return typeof e == "object" && e !== null && e.$$typeof === a;
    }
    function xe() {
      {
        if (H.current) {
          var e = R(H.current.type);
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
    function or(e) {
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
        var t = or(r);
        if (Re[t])
          return;
        Re[t] = !0;
        var n = "";
        e && e._owner && e._owner !== H.current && (n = " It was passed a child from " + R(e._owner.type) + "."), I(e), h('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, n), I(null);
      }
    }
    function Te(e, r) {
      {
        if (typeof e != "object")
          return;
        if (G(e))
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            Q(n) && _e(n, r);
          }
        else if (Q(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var l = Ie(e);
          if (typeof l == "function" && l !== e.entries)
            for (var c = l.call(e), s; !(s = c.next()).done; )
              Q(s.value) && _e(s.value, r);
        }
      }
    }
    function sr(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === m || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === _))
          t = r.propTypes;
        else
          return;
        if (t) {
          var n = R(r);
          Ke(t, e.props, "prop", n, e);
        } else if (r.PropTypes !== void 0 && !Z) {
          Z = !0;
          var l = R(r);
          h("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", l || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && h("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ur(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var n = r[t];
          if (n !== "children" && n !== "key") {
            I(e), h("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), I(null);
            break;
          }
        }
        e.ref !== null && (I(e), h("Invalid attribute `ref` supplied to `React.Fragment`."), I(null));
      }
    }
    var je = {};
    function we(e, r, t, n, l, c) {
      {
        var s = Ye(e);
        if (!s) {
          var o = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (o += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var y = ir(l);
          y ? o += y : o += xe();
          var f;
          e === null ? f = "null" : G(e) ? f = "array" : e !== void 0 && e.$$typeof === a ? (f = "<" + (R(e.type) || "Unknown") + " />", o = " Did you accidentally export a JSX literal instead of a component?") : f = typeof e, h("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", f, o);
        }
        var d = ar(e, r, t, l, c);
        if (d == null)
          return d;
        if (s) {
          var E = r.children;
          if (E !== void 0)
            if (n)
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
          var S = R(e), g = Object.keys(r).filter(function(hr) {
            return hr !== "key";
          }), ee = g.length > 0 ? "{key: someKey, " + g.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!je[S + ee]) {
            var vr = g.length > 0 ? "{" + g.join(": ..., ") + ": ...}" : "{}";
            h(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, ee, S, vr, S), je[S + ee] = !0;
          }
        }
        return e === v ? ur(d) : sr(d), d;
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
  var w, j;
  const [a, p] = Pe(!1), v = () => {
    p(!0), setTimeout(() => {
      T.dismiss();
    }, 300);
  }, O = {
    success: xr,
    error: Rr,
    info: _r,
    warning: Tr
  }[i.type || "info"];
  return /* @__PURE__ */ u.jsxs(
    "div",
    {
      className: `aura-toast ${i.type || "info"} ${i.glassy !== !1 ? "aura-toast-glassy" : ""} ${a ? "aura-toast-exit" : "aura-toast-enter"} ${i.className || ""}`,
      onMouseEnter: () => ke.pause(),
      onMouseLeave: () => ke.resume(),
      style: {
        ...i.style,
        ...(w = i.style) != null && w["--type-color"] ? { "--type-color": i.style["--type-color"] } : {},
        ...(j = i.style) != null && j["--type-glow"] ? { "--type-glow": i.style["--type-glow"] } : {}
      },
      children: [
        /* @__PURE__ */ u.jsx("div", { className: "aura-icon-container", children: /* @__PURE__ */ u.jsx("div", { className: "aura-icon", children: /* @__PURE__ */ u.jsx(O, {}) }) }),
        /* @__PURE__ */ u.jsxs("div", { className: "aura-content", children: [
          /* @__PURE__ */ u.jsx("p", { className: "aura-message", children: i.message }),
          i.description && /* @__PURE__ */ u.jsx("p", { className: "aura-description", children: i.description })
        ] }),
        i.action && /* @__PURE__ */ u.jsx("div", { className: "aura-action-container", children: /* @__PURE__ */ u.jsx("button", { className: "aura-action", onClick: () => {
          var x;
          (x = i.action) == null || x.onClick(), v();
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
  const [a, p] = Pe(null);
  return yr(() => T.subscribe((v) => {
    p(v);
  }), []), /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    i,
    /* @__PURE__ */ u.jsx("div", { className: "aura-container", children: a && /* @__PURE__ */ u.jsx(
      jr,
      {
        config: a
      },
      a.id
    ) })
  ] });
};
export {
  Cr as AuraProvider,
  jr as AuraToast,
  ke as auraToast,
  T as toastStore
};
