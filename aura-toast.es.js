var hr = Object.defineProperty;
var pr = (s, a, h) => a in s ? hr(s, a, { enumerable: !0, configurable: !0, writable: !0, value: h }) : s[a] = h;
var J = (s, a, h) => (pr(s, typeof a != "symbol" ? a + "" : a, h), h);
import Se, { useState as Oe, useEffect as yr } from "./react";
class mr {
  constructor() {
    J(this, "state", null);
    J(this, "listeners", /* @__PURE__ */ new Set());
    J(this, "timeoutId", null);
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
    this.timeoutId && (clearTimeout(this.timeoutId), this.timeoutId = null);
    const h = a.id || Math.random().toString(36).substring(2, 9);
    this.state = {
      ...a,
      id: h,
      type: a.type || "info",
      duration: a.duration ?? 4e3
    }, this.notify(), this.state && this.state.duration && this.state.duration > 0 && (this.timeoutId = setTimeout(() => {
      this.dismiss();
    }, this.state.duration));
  }
  dismiss() {
    this.timeoutId && (clearTimeout(this.timeoutId), this.timeoutId = null), this.state = null, this.notify();
  }
}
const S = new mr(), kr = {
  success: (s, a) => S.show({ ...a, message: s, type: "success" }),
  error: (s, a) => S.show({ ...a, message: s, type: "error" }),
  info: (s, a) => S.show({ ...a, message: s, type: "info" }),
  warning: (s, a) => S.show({ ...a, message: s, type: "warning" }),
  dismiss: () => S.dismiss()
};
var re = { exports: {} }, $ = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ke;
function gr() {
  if (ke)
    return $;
  ke = 1;
  var s = Se, a = Symbol.for("react.element"), h = Symbol.for("react.fragment"), E = Object.prototype.hasOwnProperty, O = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, w = { key: !0, ref: !0, __self: !0, __source: !0 };
  function j(x, p, P) {
    var g, _ = {}, T = null, Y = null;
    P !== void 0 && (T = "" + P), p.key !== void 0 && (T = "" + p.key), p.ref !== void 0 && (Y = p.ref);
    for (g in p)
      E.call(p, g) && !w.hasOwnProperty(g) && (_[g] = p[g]);
    if (x && x.defaultProps)
      for (g in p = x.defaultProps, p)
        _[g] === void 0 && (_[g] = p[g]);
    return { $$typeof: a, type: x, key: T, ref: Y, props: _, _owner: O.current };
  }
  return $.Fragment = h, $.jsx = j, $.jsxs = j, $;
}
var N = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ce;
function br() {
  return Ce || (Ce = 1, process.env.NODE_ENV !== "production" && function() {
    var s = Se, a = Symbol.for("react.element"), h = Symbol.for("react.portal"), E = Symbol.for("react.fragment"), O = Symbol.for("react.strict_mode"), w = Symbol.for("react.profiler"), j = Symbol.for("react.provider"), x = Symbol.for("react.context"), p = Symbol.for("react.forward_ref"), P = Symbol.for("react.suspense"), g = Symbol.for("react.suspense_list"), _ = Symbol.for("react.memo"), T = Symbol.for("react.lazy"), Y = Symbol.for("react.offscreen"), te = Symbol.iterator, Pe = "@@iterator";
    function Ie(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = te && e[te] || e[Pe];
      return typeof r == "function" ? r : null;
    }
    var I = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function v(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
          t[n - 1] = arguments[n];
        De("error", e, t);
      }
    }
    function De(e, r, t) {
      {
        var n = I.ReactDebugCurrentFrame, u = n.getStackAddendum();
        u !== "" && (r += "%s", t = t.concat([u]));
        var c = t.map(function(o) {
          return String(o);
        });
        c.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, c);
      }
    }
    var Ae = !1, Fe = !1, We = !1, Le = !1, $e = !1, ne;
    ne = Symbol.for("react.module.reference");
    function Ne(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === E || e === w || $e || e === O || e === P || e === g || Le || e === Y || Ae || Fe || We || typeof e == "object" && e !== null && (e.$$typeof === T || e.$$typeof === _ || e.$$typeof === j || e.$$typeof === x || e.$$typeof === p || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === ne || e.getModuleId !== void 0));
    }
    function Ye(e, r, t) {
      var n = e.displayName;
      if (n)
        return n;
      var u = r.displayName || r.name || "";
      return u !== "" ? t + "(" + u + ")" : t;
    }
    function ae(e) {
      return e.displayName || "Context";
    }
    function R(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && v("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case E:
          return "Fragment";
        case h:
          return "Portal";
        case w:
          return "Profiler";
        case O:
          return "StrictMode";
        case P:
          return "Suspense";
        case g:
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
          case p:
            return Ye(e, e.render, "ForwardRef");
          case _:
            var n = e.displayName || null;
            return n !== null ? n : R(e.type) || "Memo";
          case T: {
            var u = e, c = u._payload, o = u._init;
            try {
              return R(o(c));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var k = Object.assign, F = 0, ie, oe, se, ue, le, ce, fe;
    function de() {
    }
    de.__reactDisabledLog = !0;
    function Me() {
      {
        if (F === 0) {
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
        F++;
      }
    }
    function Ve() {
      {
        if (F--, F === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: k({}, e, {
              value: ie
            }),
            info: k({}, e, {
              value: oe
            }),
            warn: k({}, e, {
              value: se
            }),
            error: k({}, e, {
              value: ue
            }),
            group: k({}, e, {
              value: le
            }),
            groupCollapsed: k({}, e, {
              value: ce
            }),
            groupEnd: k({}, e, {
              value: fe
            })
          });
        }
        F < 0 && v("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var q = I.ReactCurrentDispatcher, K;
    function M(e, r, t) {
      {
        if (K === void 0)
          try {
            throw Error();
          } catch (u) {
            var n = u.stack.trim().match(/\n( *(at )?)/);
            K = n && n[1] || "";
          }
        return `
` + K + e;
      }
    }
    var z = !1, V;
    {
      var Ue = typeof WeakMap == "function" ? WeakMap : Map;
      V = new Ue();
    }
    function ve(e, r) {
      if (!e || z)
        return "";
      {
        var t = V.get(e);
        if (t !== void 0)
          return t;
      }
      var n;
      z = !0;
      var u = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var c;
      c = q.current, q.current = null, Me();
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
            } catch (m) {
              n = m;
            }
            Reflect.construct(e, [], o);
          } else {
            try {
              o.call();
            } catch (m) {
              n = m;
            }
            e.call(o.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (m) {
            n = m;
          }
          e();
        }
      } catch (m) {
        if (m && n && typeof m.stack == "string") {
          for (var i = m.stack.split(`
`), y = n.stack.split(`
`), f = i.length - 1, d = y.length - 1; f >= 1 && d >= 0 && i[f] !== y[d]; )
            d--;
          for (; f >= 1 && d >= 0; f--, d--)
            if (i[f] !== y[d]) {
              if (f !== 1 || d !== 1)
                do
                  if (f--, d--, d < 0 || i[f] !== y[d]) {
                    var b = `
` + i[f].replace(" at new ", " at ");
                    return e.displayName && b.includes("<anonymous>") && (b = b.replace("<anonymous>", e.displayName)), typeof e == "function" && V.set(e, b), b;
                  }
                while (f >= 1 && d >= 0);
              break;
            }
        }
      } finally {
        z = !1, q.current = c, Ve(), Error.prepareStackTrace = u;
      }
      var A = e ? e.displayName || e.name : "", C = A ? M(A) : "";
      return typeof e == "function" && V.set(e, C), C;
    }
    function Be(e, r, t) {
      return ve(e, !1);
    }
    function Je(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function U(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ve(e, Je(e));
      if (typeof e == "string")
        return M(e);
      switch (e) {
        case P:
          return M("Suspense");
        case g:
          return M("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case p:
            return Be(e.render);
          case _:
            return U(e.type, r, t);
          case T: {
            var n = e, u = n._payload, c = n._init;
            try {
              return U(c(u), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var W = Object.prototype.hasOwnProperty, he = {}, pe = I.ReactDebugCurrentFrame;
    function B(e) {
      if (e) {
        var r = e._owner, t = U(e.type, e._source, r ? r.type : null);
        pe.setExtraStackFrame(t);
      } else
        pe.setExtraStackFrame(null);
    }
    function qe(e, r, t, n, u) {
      {
        var c = Function.call.bind(W);
        for (var o in e)
          if (c(e, o)) {
            var i = void 0;
            try {
              if (typeof e[o] != "function") {
                var y = Error((n || "React class") + ": " + t + " type `" + o + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[o] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw y.name = "Invariant Violation", y;
              }
              i = e[o](r, o, n, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (f) {
              i = f;
            }
            i && !(i instanceof Error) && (B(u), v("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", t, o, typeof i), B(null)), i instanceof Error && !(i.message in he) && (he[i.message] = !0, B(u), v("Failed %s type: %s", t, i.message), B(null));
          }
      }
    }
    var Ke = Array.isArray;
    function G(e) {
      return Ke(e);
    }
    function ze(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function Ge(e) {
      try {
        return ye(e), !1;
      } catch {
        return !0;
      }
    }
    function ye(e) {
      return "" + e;
    }
    function me(e) {
      if (Ge(e))
        return v("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ze(e)), ye(e);
    }
    var L = I.ReactCurrentOwner, Xe = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ge, be, X;
    X = {};
    function He(e) {
      if (W.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function Ze(e) {
      if (W.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function Qe(e, r) {
      if (typeof e.ref == "string" && L.current && r && L.current.stateNode !== r) {
        var t = R(L.current.type);
        X[t] || (v('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', R(L.current.type), e.ref), X[t] = !0);
      }
    }
    function er(e, r) {
      {
        var t = function() {
          ge || (ge = !0, v("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function rr(e, r) {
      {
        var t = function() {
          be || (be = !0, v("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var tr = function(e, r, t, n, u, c, o) {
      var i = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: a,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: o,
        // Record the component responsible for creating this element.
        _owner: c
      };
      return i._store = {}, Object.defineProperty(i._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(i, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: n
      }), Object.defineProperty(i, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: u
      }), Object.freeze && (Object.freeze(i.props), Object.freeze(i)), i;
    };
    function nr(e, r, t, n, u) {
      {
        var c, o = {}, i = null, y = null;
        t !== void 0 && (me(t), i = "" + t), Ze(r) && (me(r.key), i = "" + r.key), He(r) && (y = r.ref, Qe(r, u));
        for (c in r)
          W.call(r, c) && !Xe.hasOwnProperty(c) && (o[c] = r[c]);
        if (e && e.defaultProps) {
          var f = e.defaultProps;
          for (c in f)
            o[c] === void 0 && (o[c] = f[c]);
        }
        if (i || y) {
          var d = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          i && er(o, d), y && rr(o, d);
        }
        return tr(e, i, y, u, n, L.current, o);
      }
    }
    var H = I.ReactCurrentOwner, Ee = I.ReactDebugCurrentFrame;
    function D(e) {
      if (e) {
        var r = e._owner, t = U(e.type, e._source, r ? r.type : null);
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
    function ar(e) {
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
    function ir(e) {
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
        var t = ir(r);
        if (Re[t])
          return;
        Re[t] = !0;
        var n = "";
        e && e._owner && e._owner !== H.current && (n = " It was passed a child from " + R(e._owner.type) + "."), D(e), v('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, n), D(null);
      }
    }
    function je(e, r) {
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
          var u = Ie(e);
          if (typeof u == "function" && u !== e.entries)
            for (var c = u.call(e), o; !(o = c.next()).done; )
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
        else if (typeof r == "object" && (r.$$typeof === p || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === _))
          t = r.propTypes;
        else
          return;
        if (t) {
          var n = R(r);
          qe(t, e.props, "prop", n, e);
        } else if (r.PropTypes !== void 0 && !Z) {
          Z = !0;
          var u = R(r);
          v("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", u || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && v("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function sr(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var n = r[t];
          if (n !== "children" && n !== "key") {
            D(e), v("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), D(null);
            break;
          }
        }
        e.ref !== null && (D(e), v("Invalid attribute `ref` supplied to `React.Fragment`."), D(null));
      }
    }
    var we = {};
    function Te(e, r, t, n, u, c) {
      {
        var o = Ne(e);
        if (!o) {
          var i = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (i += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var y = ar(u);
          y ? i += y : i += xe();
          var f;
          e === null ? f = "null" : G(e) ? f = "array" : e !== void 0 && e.$$typeof === a ? (f = "<" + (R(e.type) || "Unknown") + " />", i = " Did you accidentally export a JSX literal instead of a component?") : f = typeof e, v("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", f, i);
        }
        var d = nr(e, r, t, u, c);
        if (d == null)
          return d;
        if (o) {
          var b = r.children;
          if (b !== void 0)
            if (n)
              if (G(b)) {
                for (var A = 0; A < b.length; A++)
                  je(b[A], e);
                Object.freeze && Object.freeze(b);
              } else
                v("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              je(b, e);
        }
        if (W.call(r, "key")) {
          var C = R(e), m = Object.keys(r).filter(function(vr) {
            return vr !== "key";
          }), ee = m.length > 0 ? "{key: someKey, " + m.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!we[C + ee]) {
            var dr = m.length > 0 ? "{" + m.join(": ..., ") + ": ...}" : "{}";
            v(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, ee, C, dr, C), we[C + ee] = !0;
          }
        }
        return e === E ? sr(d) : or(d), d;
      }
    }
    function ur(e, r, t) {
      return Te(e, r, t, !0);
    }
    function lr(e, r, t) {
      return Te(e, r, t, !1);
    }
    var cr = lr, fr = ur;
    N.Fragment = E, N.jsx = cr, N.jsxs = fr;
  }()), N;
}
process.env.NODE_ENV === "production" ? re.exports = gr() : re.exports = br();
var l = re.exports;
const Er = () => /* @__PURE__ */ l.jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ l.jsx("path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }),
  /* @__PURE__ */ l.jsx("polyline", { points: "22 4 12 14.01 9 11.01" })
] }), xr = () => /* @__PURE__ */ l.jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ l.jsx("circle", { cx: "12", cy: "12", r: "10" }),
  /* @__PURE__ */ l.jsx("line", { x1: "15", y1: "9", x2: "9", y2: "15" }),
  /* @__PURE__ */ l.jsx("line", { x1: "9", y1: "9", x2: "15", y2: "15" })
] }), Rr = () => /* @__PURE__ */ l.jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ l.jsx("circle", { cx: "12", cy: "12", r: "10" }),
  /* @__PURE__ */ l.jsx("line", { x1: "12", y1: "16", x2: "12", y2: "12" }),
  /* @__PURE__ */ l.jsx("line", { x1: "12", y1: "8", x2: "12.01", y2: "8" })
] }), _r = () => /* @__PURE__ */ l.jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ l.jsx("path", { d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" }),
  /* @__PURE__ */ l.jsx("line", { x1: "12", y1: "9", x2: "12", y2: "13" }),
  /* @__PURE__ */ l.jsx("line", { x1: "12", y1: "17", x2: "12.01", y2: "17" })
] }), jr = ({ config: s }) => {
  var w, j;
  const [a, h] = Oe(!1), E = () => {
    h(!0), setTimeout(() => {
      S.dismiss();
    }, 300);
  }, O = {
    success: Er,
    error: xr,
    info: Rr,
    warning: _r
  }[s.type || "info"];
  return /* @__PURE__ */ l.jsxs(
    "div",
    {
      className: `aura-toast ${s.type || "info"} ${a ? "aura-toast-exit" : "aura-toast-enter"} ${s.className || ""}`,
      style: {
        ...s.style,
        ...(w = s.style) != null && w["--type-color"] ? { "--type-color": s.style["--type-color"] } : {},
        ...(j = s.style) != null && j["--type-glow"] ? { "--type-glow": s.style["--type-glow"] } : {}
      },
      children: [
        /* @__PURE__ */ l.jsx("div", { className: "aura-icon", children: /* @__PURE__ */ l.jsx(O, {}) }),
        /* @__PURE__ */ l.jsxs("div", { className: "aura-content", children: [
          /* @__PURE__ */ l.jsx("p", { className: "aura-message", children: s.message }),
          s.action && /* @__PURE__ */ l.jsx("button", { className: "aura-action", onClick: () => {
            var x;
            (x = s.action) == null || x.onClick(), E();
          }, children: s.action.label })
        ] }),
        /* @__PURE__ */ l.jsx("button", { className: "aura-close", onClick: E, "aria-label": "Close", children: /* @__PURE__ */ l.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ l.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
          /* @__PURE__ */ l.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
        ] }) })
      ]
    }
  );
};
const Cr = ({ children: s }) => {
  const [a, h] = Oe(null);
  return yr(() => S.subscribe((E) => {
    h(E);
  }), []), /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
    s,
    /* @__PURE__ */ l.jsx("div", { className: "aura-container", children: a && /* @__PURE__ */ l.jsx(
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
  kr as auraToast,
  S as toastStore
};
