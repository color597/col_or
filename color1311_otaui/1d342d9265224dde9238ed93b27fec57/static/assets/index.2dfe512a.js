function e(e, t) {
    const n = Object.create(null), r = e.split(",");
    for (let i = 0; i < r.length; i++) n[r[i]] = !0;
    return t ? e => !!n[e.toLowerCase()] : e => !!n[e]
}

function t(e) {
    if (w(e)) {
        const n = {};
        for (let r = 0; r < e.length; r++) {
            const i = e[r], o = C(i) ? a(i) : t(i);
            if (o) for (const e in o) n[e] = o[e]
        }
        return n
    }
    return C(e) || O(e) ? e : void 0
}

!function () {
    const e = document.createElement("link").relList;
    if (!(e && e.supports && e.supports("modulepreload"))) {
        for (const e of document.querySelectorAll('link[rel="modulepreload"]')) t(e);
        new MutationObserver((e => {
            for (const n of e) if ("childList" === n.type) for (const e of n.addedNodes) "LINK" === e.tagName && "modulepreload" === e.rel && t(e)
        })).observe(document, {childList: !0, subtree: !0})
    }

    function t(e) {
        if (e.ep) return;
        e.ep = !0;
        const t = function (e) {
            const t = {};
            return e.integrity && (t.integrity = e.integrity), e.referrerpolicy && (t.referrerPolicy = e.referrerpolicy), "use-credentials" === e.crossorigin ? t.credentials = "include" : "anonymous" === e.crossorigin ? t.credentials = "omit" : t.credentials = "same-origin", t
        }(e);
        fetch(e.href, t)
    }
}();
const n = /;(?![^(]*\))/g, r = /:([^]+)/, i = /\/\*.*?\*\//gs;

function a(e) {
    const t = {};
    return e.replace(i, "").split(n).forEach((e => {
        if (e) {
            const n = e.split(r);
            n.length > 1 && (t[n[0].trim()] = n[1].trim())
        }
    })), t
}

function o(e) {
    let t = "";
    if (C(e)) t = e; else if (w(e)) for (let n = 0; n < e.length; n++) {
        const r = o(e[n]);
        r && (t += r + " ")
    } else if (O(e)) for (const n in e) e[n] && (t += n + " ");
    return t.trim()
}

const l = e("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly");

function s(e) {
    return !!e || "" === e
}

const c = e => C(e) ? e : null == e ? "" : w(e) || O(e) && (e.toString === P || !E(e.toString)) ? JSON.stringify(e, u, 2) : String(e),
    u = (e, t) => t && t.__v_isRef ? u(e, t.value) : _(t) ? {[`Map(${t.size})`]: [...t.entries()].reduce(((e, [t, n]) => (e[`${t} =>`] = n, e)), {})} : T(t) ? {[`Set(${t.size})`]: [...t.values()]} : !O(t) || w(t) || N(t) ? t : String(t),
    p = {}, d = [], f = () => {
    }, g = () => !1, h = /^on[^a-z]/, y = e => h.test(e), m = e => e.startsWith("onUpdate:"), v = Object.assign,
    x = (e, t) => {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1)
    }, b = Object.prototype.hasOwnProperty, k = (e, t) => b.call(e, t), w = Array.isArray,
    _ = e => "[object Map]" === A(e), T = e => "[object Set]" === A(e), E = e => "function" == typeof e,
    C = e => "string" == typeof e, L = e => "symbol" == typeof e, O = e => null !== e && "object" == typeof e,
    S = e => O(e) && E(e.then) && E(e.catch), P = Object.prototype.toString, A = e => P.call(e),
    R = e => A(e).slice(8, -1), N = e => "[object Object]" === A(e),
    I = e => C(e) && "NaN" !== e && "-" !== e[0] && "" + parseInt(e, 10) === e,
    j = e(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
    D = e => {
        const t = Object.create(null);
        return n => t[n] || (t[n] = e(n))
    }, M = /-(\w)/g, z = D((e => e.replace(M, ((e, t) => t ? t.toUpperCase() : "")))), V = /\B([A-Z])/g,
    F = D((e => e.replace(V, "-$1").toLowerCase())), U = D((e => e.charAt(0).toUpperCase() + e.slice(1))),
    B = D((e => e ? `on${U(e)}` : "")), H = (e, t) => !Object.is(e, t), W = (e, t) => {
        for (let n = 0; n < e.length; n++) e[n](t)
    }, q = (e, t, n) => {
        Object.defineProperty(e, t, {configurable: !0, enumerable: !1, value: n})
    }, $ = e => {
        const t = parseFloat(e);
        return isNaN(t) ? e : t
    };
let Y;
const K = () => Y || (Y = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {});
let G;

class X {
    constructor(e = !1) {
        this.detached = e, this._active = !0, this.effects = [], this.cleanups = [], this.parent = G, !e && G && (this.index = (G.scopes || (G.scopes = [])).push(this) - 1)
    }

    get active() {
        return this._active
    }

    run(e) {
        if (this._active) {
            const t = G;
            try {
                return G = this, e()
            } finally {
                G = t
            }
        }
    }

    on() {
        G = this
    }

    off() {
        G = this.parent
    }

    stop(e) {
        if (this._active) {
            let t, n;
            for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop();
            for (t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
            if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].stop(!0);
            if (!this.detached && this.parent && !e) {
                const e = this.parent.scopes.pop();
                e && e !== this && (this.parent.scopes[this.index] = e, e.index = this.index)
            }
            this.parent = void 0, this._active = !1
        }
    }
}

function J(e) {
    return new X(e)
}

function Z() {
    return G
}

const Q = e => {
    const t = new Set(e);
    return t.w = 0, t.n = 0, t
}, ee = e => (e.w & ie) > 0, te = e => (e.n & ie) > 0, ne = new WeakMap;
let re = 0, ie = 1;
const ae = 30;
let oe;
const le = Symbol(""), se = Symbol("");

class ce {
    constructor(e, t = null, n) {
        this.fn = e, this.scheduler = t, this.active = !0, this.deps = [], this.parent = void 0, function (e, t = G) {
            t && t.active && t.effects.push(e)
        }(this, n)
    }

    run() {
        if (!this.active) return this.fn();
        let e = oe, t = pe;
        for (; e;) {
            if (e === this) return;
            e = e.parent
        }
        try {
            return this.parent = oe, oe = this, pe = !0, ie = 1 << ++re, re <= ae ? (({deps: e}) => {
                if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= ie
            })(this) : ue(this), this.fn()
        } finally {
            re <= ae && (e => {
                const {deps: t} = e;
                if (t.length) {
                    let n = 0;
                    for (let r = 0; r < t.length; r++) {
                        const i = t[r];
                        ee(i) && !te(i) ? i.delete(e) : t[n++] = i, i.w &= ~ie, i.n &= ~ie
                    }
                    t.length = n
                }
            })(this), ie = 1 << --re, oe = this.parent, pe = t, this.parent = void 0, this.deferStop && this.stop()
        }
    }

    stop() {
        oe === this ? this.deferStop = !0 : this.active && (ue(this), this.onStop && this.onStop(), this.active = !1)
    }
}

function ue(e) {
    const {deps: t} = e;
    if (t.length) {
        for (let n = 0; n < t.length; n++) t[n].delete(e);
        t.length = 0
    }
}

let pe = !0;
const de = [];

function fe() {
    de.push(pe), pe = !1
}

function ge() {
    const e = de.pop();
    pe = void 0 === e || e
}

function he(e, t, n) {
    if (pe && oe) {
        let t = ne.get(e);
        t || ne.set(e, t = new Map);
        let r = t.get(n);
        r || t.set(n, r = Q()), ye(r)
    }
}

function ye(e, t) {
    let n = !1;
    re <= ae ? te(e) || (e.n |= ie, n = !ee(e)) : n = !e.has(oe), n && (e.add(oe), oe.deps.push(e))
}

function me(e, t, n, r, i, a) {
    const o = ne.get(e);
    if (!o) return;
    let l = [];
    if ("clear" === t) l = [...o.values()]; else if ("length" === n && w(e)) {
        const e = Number(r);
        o.forEach(((t, n) => {
            ("length" === n || n >= e) && l.push(t)
        }))
    } else switch (void 0 !== n && l.push(o.get(n)), t) {
        case"add":
            w(e) ? I(n) && l.push(o.get("length")) : (l.push(o.get(le)), _(e) && l.push(o.get(se)));
            break;
        case"delete":
            w(e) || (l.push(o.get(le)), _(e) && l.push(o.get(se)));
            break;
        case"set":
            _(e) && l.push(o.get(le))
    }
    if (1 === l.length) l[0] && ve(l[0]); else {
        const e = [];
        for (const t of l) t && e.push(...t);
        ve(Q(e))
    }
}

function ve(e, t) {
    const n = w(e) ? e : [...e];
    for (const r of n) r.computed && xe(r);
    for (const r of n) r.computed || xe(r)
}

function xe(e, t) {
    (e !== oe || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
}

const be = e("__proto__,__v_isRef,__isVue"),
    ke = new Set(Object.getOwnPropertyNames(Symbol).filter((e => "arguments" !== e && "caller" !== e)).map((e => Symbol[e])).filter(L)),
    we = Oe(), _e = Oe(!1, !0), Te = Oe(!0), Ee = Ce();

function Ce() {
    const e = {};
    return ["includes", "indexOf", "lastIndexOf"].forEach((t => {
        e[t] = function (...e) {
            const n = pt(this);
            for (let t = 0, i = this.length; t < i; t++) he(n, 0, t + "");
            const r = n[t](...e);
            return -1 === r || !1 === r ? n[t](...e.map(pt)) : r
        }
    })), ["push", "pop", "shift", "unshift", "splice"].forEach((t => {
        e[t] = function (...e) {
            fe();
            const n = pt(this)[t].apply(this, e);
            return ge(), n
        }
    })), e
}

function Le(e) {
    const t = pt(this);
    return he(t, 0, e), t.hasOwnProperty(e)
}

function Oe(e = !1, t = !1) {
    return function (n, r, i) {
        if ("__v_isReactive" === r) return !e;
        if ("__v_isReadonly" === r) return e;
        if ("__v_isShallow" === r) return t;
        if ("__v_raw" === r && i === (e ? t ? rt : nt : t ? tt : et).get(n)) return n;
        const a = w(n);
        if (!e) {
            if (a && k(Ee, r)) return Reflect.get(Ee, r, i);
            if ("hasOwnProperty" === r) return Le
        }
        const o = Reflect.get(n, r, i);
        return (L(r) ? ke.has(r) : be(r)) ? o : (e || he(n, 0, r), t ? o : mt(o) ? a && I(r) ? o : o.value : O(o) ? e ? at(o) : it(o) : o)
    }
}

function Se(e = !1) {
    return function (t, n, r, i) {
        let a = t[n];
        if (st(a) && mt(a) && !mt(r)) return !1;
        if (!e && (ct(r) || st(r) || (a = pt(a), r = pt(r)), !w(t) && mt(a) && !mt(r))) return a.value = r, !0;
        const o = w(t) && I(n) ? Number(n) < t.length : k(t, n), l = Reflect.set(t, n, r, i);
        return t === pt(i) && (o ? H(r, a) && me(t, "set", n, r) : me(t, "add", n, r)), l
    }
}

const Pe = {
        get: we, set: Se(), deleteProperty: function (e, t) {
            const n = k(e, t);
            e[t];
            const r = Reflect.deleteProperty(e, t);
            return r && n && me(e, "delete", t, void 0), r
        }, has: function (e, t) {
            const n = Reflect.has(e, t);
            return L(t) && ke.has(t) || he(e, 0, t), n
        }, ownKeys: function (e) {
            return he(e, 0, w(e) ? "length" : le), Reflect.ownKeys(e)
        }
    }, Ae = {get: Te, set: (e, t) => !0, deleteProperty: (e, t) => !0}, Re = v({}, Pe, {get: _e, set: Se(!0)}), Ne = e => e,
    Ie = e => Reflect.getPrototypeOf(e);

function je(e, t, n = !1, r = !1) {
    const i = pt(e = e.__v_raw), a = pt(t);
    n || (t !== a && he(i, 0, t), he(i, 0, a));
    const {has: o} = Ie(i), l = r ? Ne : n ? gt : ft;
    return o.call(i, t) ? l(e.get(t)) : o.call(i, a) ? l(e.get(a)) : void (e !== i && e.get(t))
}

function De(e, t = !1) {
    const n = this.__v_raw, r = pt(n), i = pt(e);
    return t || (e !== i && he(r, 0, e), he(r, 0, i)), e === i ? n.has(e) : n.has(e) || n.has(i)
}

function Me(e, t = !1) {
    return e = e.__v_raw, !t && he(pt(e), 0, le), Reflect.get(e, "size", e)
}

function ze(e) {
    e = pt(e);
    const t = pt(this);
    return Ie(t).has.call(t, e) || (t.add(e), me(t, "add", e, e)), this
}

function Ve(e, t) {
    t = pt(t);
    const n = pt(this), {has: r, get: i} = Ie(n);
    let a = r.call(n, e);
    a || (e = pt(e), a = r.call(n, e));
    const o = i.call(n, e);
    return n.set(e, t), a ? H(t, o) && me(n, "set", e, t) : me(n, "add", e, t), this
}

function Fe(e) {
    const t = pt(this), {has: n, get: r} = Ie(t);
    let i = n.call(t, e);
    i || (e = pt(e), i = n.call(t, e)), r && r.call(t, e);
    const a = t.delete(e);
    return i && me(t, "delete", e, void 0), a
}

function Ue() {
    const e = pt(this), t = 0 !== e.size, n = e.clear();
    return t && me(e, "clear", void 0, void 0), n
}

function Be(e, t) {
    return function (n, r) {
        const i = this, a = i.__v_raw, o = pt(a), l = t ? Ne : e ? gt : ft;
        return !e && he(o, 0, le), a.forEach(((e, t) => n.call(r, l(e), l(t), i)))
    }
}

function He(e, t, n) {
    return function (...r) {
        const i = this.__v_raw, a = pt(i), o = _(a), l = "entries" === e || e === Symbol.iterator && o,
            s = "keys" === e && o, c = i[e](...r), u = n ? Ne : t ? gt : ft;
        return !t && he(a, 0, s ? se : le), {
            next() {
                const {value: e, done: t} = c.next();
                return t ? {value: e, done: t} : {value: l ? [u(e[0]), u(e[1])] : u(e), done: t}
            }, [Symbol.iterator]() {
                return this
            }
        }
    }
}

function We(e) {
    return function (...t) {
        return "delete" !== e && this
    }
}

function qe() {
    const e = {
        get(e) {
            return je(this, e)
        }, get size() {
            return Me(this)
        }, has: De, add: ze, set: Ve, delete: Fe, clear: Ue, forEach: Be(!1, !1)
    }, t = {
        get(e) {
            return je(this, e, !1, !0)
        }, get size() {
            return Me(this)
        }, has: De, add: ze, set: Ve, delete: Fe, clear: Ue, forEach: Be(!1, !0)
    }, n = {
        get(e) {
            return je(this, e, !0)
        }, get size() {
            return Me(this, !0)
        }, has(e) {
            return De.call(this, e, !0)
        }, add: We("add"), set: We("set"), delete: We("delete"), clear: We("clear"), forEach: Be(!0, !1)
    }, r = {
        get(e) {
            return je(this, e, !0, !0)
        }, get size() {
            return Me(this, !0)
        }, has(e) {
            return De.call(this, e, !0)
        }, add: We("add"), set: We("set"), delete: We("delete"), clear: We("clear"), forEach: Be(!0, !0)
    };
    return ["keys", "values", "entries", Symbol.iterator].forEach((i => {
        e[i] = He(i, !1, !1), n[i] = He(i, !0, !1), t[i] = He(i, !1, !0), r[i] = He(i, !0, !0)
    })), [e, n, t, r]
}

const [$e, Ye, Ke, Ge] = qe();

function Xe(e, t) {
    const n = t ? e ? Ge : Ke : e ? Ye : $e;
    return (t, r, i) => "__v_isReactive" === r ? !e : "__v_isReadonly" === r ? e : "__v_raw" === r ? t : Reflect.get(k(n, r) && r in t ? n : t, r, i)
}

const Je = {get: Xe(!1, !1)}, Ze = {get: Xe(!1, !0)}, Qe = {get: Xe(!0, !1)}, et = new WeakMap, tt = new WeakMap,
    nt = new WeakMap, rt = new WeakMap;

function it(e) {
    return st(e) ? e : ot(e, !1, Pe, Je, et)
}

function at(e) {
    return ot(e, !0, Ae, Qe, nt)
}

function ot(e, t, n, r, i) {
    if (!O(e)) return e;
    if (e.__v_raw && (!t || !e.__v_isReactive)) return e;
    const a = i.get(e);
    if (a) return a;
    const o = (l = e).__v_skip || !Object.isExtensible(l) ? 0 : function (e) {
        switch (e) {
            case"Object":
            case"Array":
                return 1;
            case"Map":
            case"Set":
            case"WeakMap":
            case"WeakSet":
                return 2;
            default:
                return 0
        }
    }(R(l));
    var l;
    if (0 === o) return e;
    const s = new Proxy(e, 2 === o ? r : n);
    return i.set(e, s), s
}

function lt(e) {
    return st(e) ? lt(e.__v_raw) : !(!e || !e.__v_isReactive)
}

function st(e) {
    return !(!e || !e.__v_isReadonly)
}

function ct(e) {
    return !(!e || !e.__v_isShallow)
}

function ut(e) {
    return lt(e) || st(e)
}

function pt(e) {
    const t = e && e.__v_raw;
    return t ? pt(t) : e
}

function dt(e) {
    return q(e, "__v_skip", !0), e
}

const ft = e => O(e) ? it(e) : e, gt = e => O(e) ? at(e) : e;

function ht(e) {
    pe && oe && ye((e = pt(e)).dep || (e.dep = Q()))
}

function yt(e, t) {
    const n = (e = pt(e)).dep;
    n && ve(n)
}

function mt(e) {
    return !(!e || !0 !== e.__v_isRef)
}

function vt(e) {
    return bt(e, !1)
}

function xt(e) {
    return bt(e, !0)
}

function bt(e, t) {
    return mt(e) ? e : new kt(e, t)
}

class kt {
    constructor(e, t) {
        this.__v_isShallow = t, this.dep = void 0, this.__v_isRef = !0, this._rawValue = t ? e : pt(e), this._value = t ? e : ft(e)
    }

    get value() {
        return ht(this), this._value
    }

    set value(e) {
        const t = this.__v_isShallow || ct(e) || st(e);
        e = t ? e : pt(e), H(e, this._rawValue) && (this._rawValue = e, this._value = t ? e : ft(e), yt(this))
    }
}

function wt(e) {
    return mt(e) ? e.value : e
}

const _t = {
    get: (e, t, n) => wt(Reflect.get(e, t, n)), set: (e, t, n, r) => {
        const i = e[t];
        return mt(i) && !mt(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r)
    }
};

function Tt(e) {
    return lt(e) ? e : new Proxy(e, _t)
}

class Et {
    constructor(e, t, n) {
        this._object = e, this._key = t, this._defaultValue = n, this.__v_isRef = !0
    }

    get value() {
        const e = this._object[this._key];
        return void 0 === e ? this._defaultValue : e
    }

    set value(e) {
        this._object[this._key] = e
    }

    get dep() {
        return e = pt(this._object), t = this._key, null === (n = ne.get(e)) || void 0 === n ? void 0 : n.get(t);
        var e, t, n
    }
}

function Ct(e, t, n) {
    const r = e[t];
    return mt(r) ? r : new Et(e, t, n)
}

var Lt;

class Ot {
    constructor(e, t, n, r) {
        this._setter = t, this.dep = void 0, this.__v_isRef = !0, this[Lt] = !1, this._dirty = !0, this.effect = new ce(e, (() => {
            this._dirty || (this._dirty = !0, yt(this))
        })), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = n
    }

    get value() {
        const e = pt(this);
        return ht(e), !e._dirty && e._cacheable || (e._dirty = !1, e._value = e.effect.run()), e._value
    }

    set value(e) {
        this._setter(e)
    }
}

function St(e, t, n, r) {
    let i;
    try {
        i = r ? e(...r) : e()
    } catch (a) {
        At(a, t, n)
    }
    return i
}

function Pt(e, t, n, r) {
    if (E(e)) {
        const i = St(e, t, n, r);
        return i && S(i) && i.catch((e => {
            At(e, t, n)
        })), i
    }
    const i = [];
    for (let a = 0; a < e.length; a++) i.push(Pt(e[a], t, n, r));
    return i
}

function At(e, t, n, r = !0) {
    t && t.vnode;
    if (t) {
        let r = t.parent;
        const i = t.proxy, a = n;
        for (; r;) {
            const t = r.ec;
            if (t) for (let n = 0; n < t.length; n++) if (!1 === t[n](e, i, a)) return;
            r = r.parent
        }
        const o = t.appContext.config.errorHandler;
        if (o) return void St(o, null, 10, [e, i, a])
    }
}

Lt = "__v_isReadonly";
let Rt = !1, Nt = !1;
const It = [];
let jt = 0;
const Dt = [];
let Mt = null, zt = 0;
const Vt = Promise.resolve();
let Ft = null;

function Ut(e) {
    const t = Ft || Vt;
    return e ? t.then(this ? e.bind(this) : e) : t
}

function Bt(e) {
    It.length && It.includes(e, Rt && e.allowRecurse ? jt + 1 : jt) || (null == e.id ? It.push(e) : It.splice(function (e) {
        let t = jt + 1, n = It.length;
        for (; t < n;) {
            const r = t + n >>> 1;
            $t(It[r]) < e ? t = r + 1 : n = r
        }
        return t
    }(e.id), 0, e), Ht())
}

function Ht() {
    Rt || Nt || (Nt = !0, Ft = Vt.then(Kt))
}

function Wt(e, t = (Rt ? jt + 1 : 0)) {
    for (; t < It.length; t++) {
        const e = It[t];
        e && e.pre && (It.splice(t, 1), t--, e())
    }
}

function qt(e) {
    if (Dt.length) {
        const e = [...new Set(Dt)];
        if (Dt.length = 0, Mt) return void Mt.push(...e);
        for (Mt = e, Mt.sort(((e, t) => $t(e) - $t(t))), zt = 0; zt < Mt.length; zt++) Mt[zt]();
        Mt = null, zt = 0
    }
}

const $t = e => null == e.id ? 1 / 0 : e.id, Yt = (e, t) => {
    const n = $t(e) - $t(t);
    if (0 === n) {
        if (e.pre && !t.pre) return -1;
        if (t.pre && !e.pre) return 1
    }
    return n
};

function Kt(e) {
    Nt = !1, Rt = !0, It.sort(Yt);
    try {
        for (jt = 0; jt < It.length; jt++) {
            const e = It[jt];
            e && !1 !== e.active && St(e, null, 14)
        }
    } finally {
        jt = 0, It.length = 0, qt(), Rt = !1, Ft = null, (It.length || Dt.length) && Kt()
    }
}

function Gt(e, t, ...n) {
    if (e.isUnmounted) return;
    const r = e.vnode.props || p;
    let i = n;
    const a = t.startsWith("update:"), o = a && t.slice(7);
    if (o && o in r) {
        const e = `${"modelValue" === o ? "model" : o}Modifiers`, {number: t, trim: a} = r[e] || p;
        a && (i = n.map((e => C(e) ? e.trim() : e))), t && (i = n.map($))
    }
    let l, s = r[l = B(t)] || r[l = B(z(t))];
    !s && a && (s = r[l = B(F(t))]), s && Pt(s, e, 6, i);
    const c = r[l + "Once"];
    if (c) {
        if (e.emitted) {
            if (e.emitted[l]) return
        } else e.emitted = {};
        e.emitted[l] = !0, Pt(c, e, 6, i)
    }
}

function Xt(e, t, n = !1) {
    const r = t.emitsCache, i = r.get(e);
    if (void 0 !== i) return i;
    const a = e.emits;
    let o = {}, l = !1;
    if (!E(e)) {
        const r = e => {
            const n = Xt(e, t, !0);
            n && (l = !0, v(o, n))
        };
        !n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r)
    }
    return a || l ? (w(a) ? a.forEach((e => o[e] = null)) : v(o, a), O(e) && r.set(e, o), o) : (O(e) && r.set(e, null), null)
}

function Jt(e, t) {
    return !(!e || !y(t)) && (t = t.slice(2).replace(/Once$/, ""), k(e, t[0].toLowerCase() + t.slice(1)) || k(e, F(t)) || k(e, t))
}

let Zt = null, Qt = null;

function en(e) {
    const t = Zt;
    return Zt = e, Qt = e && e.type.__scopeId || null, t
}

function tn(e, t = Zt, n) {
    if (!t) return e;
    if (e._n) return e;
    const r = (...n) => {
        r._d && Ur(-1);
        const i = en(t);
        let a;
        try {
            a = e(...n)
        } finally {
            en(i), r._d && Ur(1)
        }
        return a
    };
    return r._n = !0, r._c = !0, r._d = !0, r
}

function nn(e) {
    const {
        type: t,
        vnode: n,
        proxy: r,
        withProxy: i,
        props: a,
        propsOptions: [o],
        slots: l,
        attrs: s,
        emit: c,
        render: u,
        renderCache: p,
        data: d,
        setupState: f,
        ctx: g,
        inheritAttrs: h
    } = e;
    let y, v;
    const x = en(e);
    try {
        if (4 & n.shapeFlag) {
            const e = i || r;
            y = ti(u.call(e, e, p, a, f, d, g)), v = s
        } else {
            const e = t;
            0, y = ti(e.length > 1 ? e(a, {attrs: s, slots: l, emit: c}) : e(a, null)), v = t.props ? s : rn(s)
        }
    } catch (k) {
        Mr.length = 0, At(k, e, 1), y = Jr(jr)
    }
    let b = y;
    if (v && !1 !== h) {
        const e = Object.keys(v), {shapeFlag: t} = b;
        e.length && 7 & t && (o && e.some(m) && (v = an(v, o)), b = Zr(b, v))
    }
    return n.dirs && (b = Zr(b), b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs), n.transition && (b.transition = n.transition), y = b, en(x), y
}

const rn = e => {
    let t;
    for (const n in e) ("class" === n || "style" === n || y(n)) && ((t || (t = {}))[n] = e[n]);
    return t
}, an = (e, t) => {
    const n = {};
    for (const r in e) m(r) && r.slice(9) in t || (n[r] = e[r]);
    return n
};

function on(e, t, n) {
    const r = Object.keys(t);
    if (r.length !== Object.keys(e).length) return !0;
    for (let i = 0; i < r.length; i++) {
        const a = r[i];
        if (t[a] !== e[a] && !Jt(n, a)) return !0
    }
    return !1
}

const ln = e => e.__isSuspense;

function sn(e, t) {
    if (li) {
        let n = li.provides;
        const r = li.parent && li.parent.provides;
        r === n && (n = li.provides = Object.create(r)), n[e] = t
    } else ;
}

function cn(e, t, n = !1) {
    const r = li || Zt;
    if (r) {
        const i = null == r.parent ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides;
        if (i && e in i) return i[e];
        if (arguments.length > 1) return n && E(t) ? t.call(r.proxy) : t
    }
}

const un = {};

function pn(e, t, n) {
    return dn(e, t, n)
}

function dn(e, t, {immediate: n, deep: r, flush: i, onTrack: a, onTrigger: o} = p) {
    const l = Z() === (null == li ? void 0 : li.scope) ? li : null;
    let s, c, u = !1, d = !1;
    if (mt(e) ? (s = () => e.value, u = ct(e)) : lt(e) ? (s = () => e, r = !0) : w(e) ? (d = !0, u = e.some((e => lt(e) || ct(e))), s = () => e.map((e => mt(e) ? e.value : lt(e) ? hn(e) : E(e) ? St(e, l, 2) : void 0))) : s = E(e) ? t ? () => St(e, l, 2) : () => {
        if (!l || !l.isUnmounted) return c && c(), Pt(e, l, 3, [h])
    } : f, t && r) {
        const e = s;
        s = () => hn(e())
    }
    let g, h = e => {
        c = b.onStop = () => {
            St(e, l, 4)
        }
    };
    if (fi) {
        if (h = f, t ? n && Pt(t, l, 3, [s(), d ? [] : void 0, h]) : s(), "sync" !== i) return f;
        {
            const e = ki();
            g = e.__watcherHandles || (e.__watcherHandles = [])
        }
    }
    let y = d ? new Array(e.length).fill(un) : un;
    const m = () => {
        if (b.active) if (t) {
            const e = b.run();
            (r || u || (d ? e.some(((e, t) => H(e, y[t]))) : H(e, y))) && (c && c(), Pt(t, l, 3, [e, y === un ? void 0 : d && y[0] === un ? [] : y, h]), y = e)
        } else b.run()
    };
    let v;
    m.allowRecurse = !!t, "sync" === i ? v = m : "post" === i ? v = () => Sr(m, l && l.suspense) : (m.pre = !0, l && (m.id = l.uid), v = () => Bt(m));
    const b = new ce(s, v);
    t ? n ? m() : y = b.run() : "post" === i ? Sr(b.run.bind(b), l && l.suspense) : b.run();
    const k = () => {
        b.stop(), l && l.scope && x(l.scope.effects, b)
    };
    return g && g.push(k), k
}

function fn(e, t, n) {
    const r = this.proxy, i = C(e) ? e.includes(".") ? gn(r, e) : () => r[e] : e.bind(r, r);
    let a;
    E(t) ? a = t : (a = t.handler, n = t);
    const o = li;
    ci(this);
    const l = dn(i, a.bind(r), n);
    return o ? ci(o) : ui(), l
}

function gn(e, t) {
    const n = t.split(".");
    return () => {
        let t = e;
        for (let e = 0; e < n.length && t; e++) t = t[n[e]];
        return t
    }
}

function hn(e, t) {
    if (!O(e) || e.__v_skip) return e;
    if ((t = t || new Set).has(e)) return e;
    if (t.add(e), mt(e)) hn(e.value, t); else if (w(e)) for (let n = 0; n < e.length; n++) hn(e[n], t); else if (T(e) || _(e)) e.forEach((e => {
        hn(e, t)
    })); else if (N(e)) for (const n in e) hn(e[n], t);
    return e
}

function yn(e, t) {
    6 & e.shapeFlag && e.component ? yn(e.component.subTree, t) : 128 & e.shapeFlag ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t
}

function mn(e) {
    return E(e) ? {setup: e, name: e.name} : e
}

const vn = e => !!e.type.__asyncLoader, xn = e => e.type.__isKeepAlive, bn = {
    name: "KeepAlive",
    __isKeepAlive: !0,
    props: {include: [String, RegExp, Array], exclude: [String, RegExp, Array], max: [String, Number]},
    setup(e, {slots: t}) {
        const n = si(), r = n.ctx;
        if (!r.renderer) return () => {
            const e = t.default && t.default();
            return e && 1 === e.length ? e[0] : e
        };
        const i = new Map, a = new Set;
        let o = null;
        const l = n.suspense, {renderer: {p: s, m: c, um: u, o: {createElement: p}}} = r, d = p("div");

        function f(e) {
            Ln(e), u(e, n, l, !0)
        }

        function g(e) {
            i.forEach(((t, n) => {
                const r = mi(t.type);
                !r || e && e(r) || h(n)
            }))
        }

        function h(e) {
            const t = i.get(e);
            o && $r(t, o) ? o && Ln(o) : f(t), i.delete(e), a.delete(e)
        }

        r.activate = (e, t, n, r, i) => {
            const a = e.component;
            c(e, t, n, 0, l), s(a.vnode, e, t, n, a, l, r, e.slotScopeIds, i), Sr((() => {
                a.isDeactivated = !1, a.a && W(a.a);
                const t = e.props && e.props.onVnodeMounted;
                t && ii(t, a.parent, e)
            }), l)
        }, r.deactivate = e => {
            const t = e.component;
            c(e, d, null, 1, l), Sr((() => {
                t.da && W(t.da);
                const n = e.props && e.props.onVnodeUnmounted;
                n && ii(n, t.parent, e), t.isDeactivated = !0
            }), l)
        }, pn((() => [e.include, e.exclude]), (([e, t]) => {
            e && g((t => wn(e, t))), t && g((e => !wn(t, e)))
        }), {flush: "post", deep: !0});
        let y = null;
        const m = () => {
            null != y && i.set(y, On(n.subTree))
        };
        return Rn(m), In(m), jn((() => {
            i.forEach((e => {
                const {subTree: t, suspense: r} = n, i = On(t);
                if (e.type !== i.type || e.key !== i.key) f(e); else {
                    Ln(i);
                    const e = i.component.da;
                    e && Sr(e, r)
                }
            }))
        })), () => {
            if (y = null, !t.default) return null;
            const n = t.default(), r = n[0];
            if (n.length > 1) return o = null, n;
            if (!(qr(r) && (4 & r.shapeFlag || 128 & r.shapeFlag))) return o = null, r;
            let l = On(r);
            const s = l.type, c = mi(vn(l) ? l.type.__asyncResolved || {} : s), {include: u, exclude: p, max: d} = e;
            if (u && (!c || !wn(u, c)) || p && c && wn(p, c)) return o = l, r;
            const f = null == l.key ? s : l.key, g = i.get(f);
            return l.el && (l = Zr(l), 128 & r.shapeFlag && (r.ssContent = l)), y = f, g ? (l.el = g.el, l.component = g.component, l.transition && yn(l, l.transition), l.shapeFlag |= 512, a.delete(f), a.add(f)) : (a.add(f), d && a.size > parseInt(d, 10) && h(a.values().next().value)), l.shapeFlag |= 256, o = l, ln(r.type) ? r : l
        }
    }
}, kn = bn;

function wn(e, t) {
    return w(e) ? e.some((e => wn(e, t))) : C(e) ? e.split(",").includes(t) : "[object RegExp]" === A(e) && e.test(t)
}

function _n(e, t) {
    En(e, "a", t)
}

function Tn(e, t) {
    En(e, "da", t)
}

function En(e, t, n = li) {
    const r = e.__wdc || (e.__wdc = () => {
        let t = n;
        for (; t;) {
            if (t.isDeactivated) return;
            t = t.parent
        }
        return e()
    });
    if (Sn(t, r, n), n) {
        let e = n.parent;
        for (; e && e.parent;) xn(e.parent.vnode) && Cn(r, t, n, e), e = e.parent
    }
}

function Cn(e, t, n, r) {
    const i = Sn(t, e, r, !0);
    Dn((() => {
        x(r[t], i)
    }), n)
}

function Ln(e) {
    e.shapeFlag &= -257, e.shapeFlag &= -513
}

function On(e) {
    return 128 & e.shapeFlag ? e.ssContent : e
}

function Sn(e, t, n = li, r = !1) {
    if (n) {
        const i = n[e] || (n[e] = []), a = t.__weh || (t.__weh = (...r) => {
            if (n.isUnmounted) return;
            fe(), ci(n);
            const i = Pt(t, n, e, r);
            return ui(), ge(), i
        });
        return r ? i.unshift(a) : i.push(a), a
    }
}

const Pn = e => (t, n = li) => (!fi || "sp" === e) && Sn(e, ((...e) => t(...e)), n), An = Pn("bm"), Rn = Pn("m"),
    Nn = Pn("bu"), In = Pn("u"), jn = Pn("bum"), Dn = Pn("um"), Mn = Pn("sp"), zn = Pn("rtg"), Vn = Pn("rtc");

function Fn(e, t = li) {
    Sn("ec", e, t)
}

function Un(e, t) {
    const n = Zt;
    if (null === n) return e;
    const r = yi(n) || n.proxy, i = e.dirs || (e.dirs = []);
    for (let a = 0; a < t.length; a++) {
        let [e, n, o, l = p] = t[a];
        e && (E(e) && (e = {mounted: e, updated: e}), e.deep && hn(n), i.push({
            dir: e,
            instance: r,
            value: n,
            oldValue: void 0,
            arg: o,
            modifiers: l
        }))
    }
    return e
}

function Bn(e, t, n, r) {
    const i = e.dirs, a = t && t.dirs;
    for (let o = 0; o < i.length; o++) {
        const l = i[o];
        a && (l.oldValue = a[o].value);
        let s = l.dir[r];
        s && (fe(), Pt(s, n, 8, [e.el, l, e, t]), ge())
    }
}

const Hn = "components";
const Wn = Symbol();

function qn(e) {
    return C(e) ? $n(Hn, e, !1) || e : e || Wn
}

function $n(e, t, n = !0, r = !1) {
    const i = Zt || li;
    if (i) {
        const n = i.type;
        if (e === Hn) {
            const e = mi(n, !1);
            if (e && (e === t || e === z(t) || e === U(z(t)))) return n
        }
        const a = Yn(i[e] || n[e], t) || Yn(i.appContext[e], t);
        return !a && r ? n : a
    }
}

function Yn(e, t) {
    return e && (e[t] || e[z(t)] || e[U(z(t))])
}

function Kn(e, t, n, r) {
    let i;
    const a = n && n[r];
    if (w(e) || C(e)) {
        i = new Array(e.length);
        for (let n = 0, r = e.length; n < r; n++) i[n] = t(e[n], n, void 0, a && a[n])
    } else if ("number" == typeof e) {
        i = new Array(e);
        for (let n = 0; n < e; n++) i[n] = t(n + 1, n, void 0, a && a[n])
    } else if (O(e)) if (e[Symbol.iterator]) i = Array.from(e, ((e, n) => t(e, n, void 0, a && a[n]))); else {
        const n = Object.keys(e);
        i = new Array(n.length);
        for (let r = 0, o = n.length; r < o; r++) {
            const o = n[r];
            i[r] = t(e[o], o, r, a && a[r])
        }
    } else i = [];
    return n && (n[r] = i), i
}

const Gn = e => e ? pi(e) ? yi(e) || e.proxy : Gn(e.parent) : null, Xn = v(Object.create(null), {
    $: e => e,
    $el: e => e.vnode.el,
    $data: e => e.data,
    $props: e => e.props,
    $attrs: e => e.attrs,
    $slots: e => e.slots,
    $refs: e => e.refs,
    $parent: e => Gn(e.parent),
    $root: e => Gn(e.root),
    $emit: e => e.emit,
    $options: e => rr(e),
    $forceUpdate: e => e.f || (e.f = () => Bt(e.update)),
    $nextTick: e => e.n || (e.n = Ut.bind(e.proxy)),
    $watch: e => fn.bind(e)
}), Jn = (e, t) => e !== p && !e.__isScriptSetup && k(e, t), Zn = {
    get({_: e}, t) {
        const {ctx: n, setupState: r, data: i, props: a, accessCache: o, type: l, appContext: s} = e;
        let c;
        if ("$" !== t[0]) {
            const l = o[t];
            if (void 0 !== l) switch (l) {
                case 1:
                    return r[t];
                case 2:
                    return i[t];
                case 4:
                    return n[t];
                case 3:
                    return a[t]
            } else {
                if (Jn(r, t)) return o[t] = 1, r[t];
                if (i !== p && k(i, t)) return o[t] = 2, i[t];
                if ((c = e.propsOptions[0]) && k(c, t)) return o[t] = 3, a[t];
                if (n !== p && k(n, t)) return o[t] = 4, n[t];
                Qn && (o[t] = 0)
            }
        }
        const u = Xn[t];
        let d, f;
        return u ? ("$attrs" === t && he(e, 0, t), u(e)) : (d = l.__cssModules) && (d = d[t]) ? d : n !== p && k(n, t) ? (o[t] = 4, n[t]) : (f = s.config.globalProperties, k(f, t) ? f[t] : void 0)
    }, set({_: e}, t, n) {
        const {data: r, setupState: i, ctx: a} = e;
        return Jn(i, t) ? (i[t] = n, !0) : r !== p && k(r, t) ? (r[t] = n, !0) : !k(e.props, t) && (("$" !== t[0] || !(t.slice(1) in e)) && (a[t] = n, !0))
    }, has({_: {data: e, setupState: t, accessCache: n, ctx: r, appContext: i, propsOptions: a}}, o) {
        let l;
        return !!n[o] || e !== p && k(e, o) || Jn(t, o) || (l = a[0]) && k(l, o) || k(r, o) || k(Xn, o) || k(i.config.globalProperties, o)
    }, defineProperty(e, t, n) {
        return null != n.get ? e._.accessCache[t] = 0 : k(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n)
    }
};
let Qn = !0;

function er(e) {
    const t = rr(e), n = e.proxy, r = e.ctx;
    Qn = !1, t.beforeCreate && tr(t.beforeCreate, e, "bc");
    const {
        data: i,
        computed: a,
        methods: o,
        watch: l,
        provide: s,
        inject: c,
        created: u,
        beforeMount: p,
        mounted: d,
        beforeUpdate: g,
        updated: h,
        activated: y,
        deactivated: m,
        beforeDestroy: v,
        beforeUnmount: x,
        destroyed: b,
        unmounted: k,
        render: _,
        renderTracked: T,
        renderTriggered: C,
        errorCaptured: L,
        serverPrefetch: S,
        expose: P,
        inheritAttrs: A,
        components: R,
        directives: N,
        filters: I
    } = t;
    if (c && function (e, t, n = f, r = !1) {
        w(e) && (e = lr(e));
        for (const i in e) {
            const n = e[i];
            let a;
            a = O(n) ? "default" in n ? cn(n.from || i, n.default, !0) : cn(n.from || i) : cn(n), mt(a) && r ? Object.defineProperty(t, i, {
                enumerable: !0,
                configurable: !0,
                get: () => a.value,
                set: e => a.value = e
            }) : t[i] = a
        }
    }(c, r, null, e.appContext.config.unwrapInjectedRef), o) for (const f in o) {
        const e = o[f];
        E(e) && (r[f] = e.bind(n))
    }
    if (i) {
        const t = i.call(n, n);
        O(t) && (e.data = it(t))
    }
    if (Qn = !0, a) for (const w in a) {
        const e = a[w], t = E(e) ? e.bind(n, n) : E(e.get) ? e.get.bind(n, n) : f,
            i = !E(e) && E(e.set) ? e.set.bind(n) : f, o = vi({get: t, set: i});
        Object.defineProperty(r, w, {enumerable: !0, configurable: !0, get: () => o.value, set: e => o.value = e})
    }
    if (l) for (const f in l) nr(l[f], r, n, f);
    if (s) {
        const e = E(s) ? s.call(n) : s;
        Reflect.ownKeys(e).forEach((t => {
            sn(t, e[t])
        }))
    }

    function j(e, t) {
        w(t) ? t.forEach((t => e(t.bind(n)))) : t && e(t.bind(n))
    }

    if (u && tr(u, e, "c"), j(An, p), j(Rn, d), j(Nn, g), j(In, h), j(_n, y), j(Tn, m), j(Fn, L), j(Vn, T), j(zn, C), j(jn, x), j(Dn, k), j(Mn, S), w(P)) if (P.length) {
        const t = e.exposed || (e.exposed = {});
        P.forEach((e => {
            Object.defineProperty(t, e, {get: () => n[e], set: t => n[e] = t})
        }))
    } else e.exposed || (e.exposed = {});
    _ && e.render === f && (e.render = _), null != A && (e.inheritAttrs = A), R && (e.components = R), N && (e.directives = N)
}

function tr(e, t, n) {
    Pt(w(e) ? e.map((e => e.bind(t.proxy))) : e.bind(t.proxy), t, n)
}

function nr(e, t, n, r) {
    const i = r.includes(".") ? gn(n, r) : () => n[r];
    if (C(e)) {
        const n = t[e];
        E(n) && pn(i, n)
    } else if (E(e)) pn(i, e.bind(n)); else if (O(e)) if (w(e)) e.forEach((e => nr(e, t, n, r))); else {
        const r = E(e.handler) ? e.handler.bind(n) : t[e.handler];
        E(r) && pn(i, r, e)
    }
}

function rr(e) {
    const t = e.type, {mixins: n, extends: r} = t, {
        mixins: i,
        optionsCache: a,
        config: {optionMergeStrategies: o}
    } = e.appContext, l = a.get(t);
    let s;
    return l ? s = l : i.length || n || r ? (s = {}, i.length && i.forEach((e => ir(s, e, o, !0))), ir(s, t, o)) : s = t, O(t) && a.set(t, s), s
}

function ir(e, t, n, r = !1) {
    const {mixins: i, extends: a} = t;
    a && ir(e, a, n, !0), i && i.forEach((t => ir(e, t, n, !0)));
    for (const o in t) if (r && "expose" === o) ; else {
        const r = ar[o] || n && n[o];
        e[o] = r ? r(e[o], t[o]) : t[o]
    }
    return e
}

const ar = {
    data: or,
    props: cr,
    emits: cr,
    methods: cr,
    computed: cr,
    beforeCreate: sr,
    created: sr,
    beforeMount: sr,
    mounted: sr,
    beforeUpdate: sr,
    updated: sr,
    beforeDestroy: sr,
    beforeUnmount: sr,
    destroyed: sr,
    unmounted: sr,
    activated: sr,
    deactivated: sr,
    errorCaptured: sr,
    serverPrefetch: sr,
    components: cr,
    directives: cr,
    watch: function (e, t) {
        if (!e) return t;
        if (!t) return e;
        const n = v(Object.create(null), e);
        for (const r in t) n[r] = sr(e[r], t[r]);
        return n
    },
    provide: or,
    inject: function (e, t) {
        return cr(lr(e), lr(t))
    }
};

function or(e, t) {
    return t ? e ? function () {
        return v(E(e) ? e.call(this, this) : e, E(t) ? t.call(this, this) : t)
    } : t : e
}

function lr(e) {
    if (w(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
        return t
    }
    return e
}

function sr(e, t) {
    return e ? [...new Set([].concat(e, t))] : t
}

function cr(e, t) {
    return e ? v(v(Object.create(null), e), t) : t
}

function ur(e, t, n, r = !1) {
    const i = {}, a = {};
    q(a, Yr, 1), e.propsDefaults = Object.create(null), pr(e, t, i, a);
    for (const o in e.propsOptions[0]) o in i || (i[o] = void 0);
    n ? e.props = r ? i : ot(i, !1, Re, Ze, tt) : e.type.props ? e.props = i : e.props = a, e.attrs = a
}

function pr(e, t, n, r) {
    const [i, a] = e.propsOptions;
    let o, l = !1;
    if (t) for (let s in t) {
        if (j(s)) continue;
        const c = t[s];
        let u;
        i && k(i, u = z(s)) ? a && a.includes(u) ? (o || (o = {}))[u] = c : n[u] = c : Jt(e.emitsOptions, s) || s in r && c === r[s] || (r[s] = c, l = !0)
    }
    if (a) {
        const t = pt(n), r = o || p;
        for (let o = 0; o < a.length; o++) {
            const l = a[o];
            n[l] = dr(i, t, l, r[l], e, !k(r, l))
        }
    }
    return l
}

function dr(e, t, n, r, i, a) {
    const o = e[n];
    if (null != o) {
        const e = k(o, "default");
        if (e && void 0 === r) {
            const e = o.default;
            if (o.type !== Function && E(e)) {
                const {propsDefaults: a} = i;
                n in a ? r = a[n] : (ci(i), r = a[n] = e.call(null, t), ui())
            } else r = e
        }
        o[0] && (a && !e ? r = !1 : !o[1] || "" !== r && r !== F(n) || (r = !0))
    }
    return r
}

function fr(e, t, n = !1) {
    const r = t.propsCache, i = r.get(e);
    if (i) return i;
    const a = e.props, o = {}, l = [];
    let s = !1;
    if (!E(e)) {
        const r = e => {
            s = !0;
            const [n, r] = fr(e, t, !0);
            v(o, n), r && l.push(...r)
        };
        !n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r)
    }
    if (!a && !s) return O(e) && r.set(e, d), d;
    if (w(a)) for (let u = 0; u < a.length; u++) {
        const e = z(a[u]);
        gr(e) && (o[e] = p)
    } else if (a) for (const u in a) {
        const e = z(u);
        if (gr(e)) {
            const t = a[u], n = o[e] = w(t) || E(t) ? {type: t} : Object.assign({}, t);
            if (n) {
                const t = mr(Boolean, n.type), r = mr(String, n.type);
                n[0] = t > -1, n[1] = r < 0 || t < r, (t > -1 || k(n, "default")) && l.push(e)
            }
        }
    }
    const c = [o, l];
    return O(e) && r.set(e, c), c
}

function gr(e) {
    return "$" !== e[0]
}

function hr(e) {
    const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
    return t ? t[2] : null === e ? "null" : ""
}

function yr(e, t) {
    return hr(e) === hr(t)
}

function mr(e, t) {
    return w(t) ? t.findIndex((t => yr(t, e))) : E(t) && yr(t, e) ? 0 : -1
}

const vr = e => "_" === e[0] || "$stable" === e, xr = e => w(e) ? e.map(ti) : [ti(e)], br = (e, t, n) => {
    if (t._n) return t;
    const r = tn(((...e) => xr(t(...e))), n);
    return r._c = !1, r
}, kr = (e, t, n) => {
    const r = e._ctx;
    for (const i in e) {
        if (vr(i)) continue;
        const n = e[i];
        if (E(n)) t[i] = br(0, n, r); else if (null != n) {
            const e = xr(n);
            t[i] = () => e
        }
    }
}, wr = (e, t) => {
    const n = xr(t);
    e.slots.default = () => n
}, _r = (e, t) => {
    if (32 & e.vnode.shapeFlag) {
        const n = t._;
        n ? (e.slots = pt(t), q(t, "_", n)) : kr(t, e.slots = {})
    } else e.slots = {}, t && wr(e, t);
    q(e.slots, Yr, 1)
}, Tr = (e, t, n) => {
    const {vnode: r, slots: i} = e;
    let a = !0, o = p;
    if (32 & r.shapeFlag) {
        const e = t._;
        e ? n && 1 === e ? a = !1 : (v(i, t), n || 1 !== e || delete i._) : (a = !t.$stable, kr(t, i)), o = t
    } else t && (wr(e, t), o = {default: 1});
    if (a) for (const l in i) vr(l) || l in o || delete i[l]
};

function Er() {
    return {
        app: null,
        config: {
            isNativeTag: g,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {}
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap,
        propsCache: new WeakMap,
        emitsCache: new WeakMap
    }
}

let Cr = 0;

function Lr(e, t) {
    return function (n, r = null) {
        E(n) || (n = Object.assign({}, n)), null == r || O(r) || (r = null);
        const i = Er(), a = new Set;
        let o = !1;
        const l = i.app = {
            _uid: Cr++,
            _component: n,
            _props: r,
            _container: null,
            _context: i,
            _instance: null,
            version: wi,
            get config() {
                return i.config
            },
            set config(e) {
            },
            use: (e, ...t) => (a.has(e) || (e && E(e.install) ? (a.add(e), e.install(l, ...t)) : E(e) && (a.add(e), e(l, ...t))), l),
            mixin: e => (i.mixins.includes(e) || i.mixins.push(e), l),
            component: (e, t) => t ? (i.components[e] = t, l) : i.components[e],
            directive: (e, t) => t ? (i.directives[e] = t, l) : i.directives[e],
            mount(a, s, c) {
                if (!o) {
                    const u = Jr(n, r);
                    return u.appContext = i, s && t ? t(u, a) : e(u, a, c), o = !0, l._container = a, a.__vue_app__ = l, yi(u.component) || u.component.proxy
                }
            },
            unmount() {
                o && (e(null, l._container), delete l._container.__vue_app__)
            },
            provide: (e, t) => (i.provides[e] = t, l)
        };
        return l
    }
}

function Or(e, t, n, r, i = !1) {
    if (w(e)) return void e.forEach(((e, a) => Or(e, t && (w(t) ? t[a] : t), n, r, i)));
    if (vn(r) && !i) return;
    const a = 4 & r.shapeFlag ? yi(r.component) || r.component.proxy : r.el, o = i ? null : a, {i: l, r: s} = e,
        c = t && t.r, u = l.refs === p ? l.refs = {} : l.refs, d = l.setupState;
    if (null != c && c !== s && (C(c) ? (u[c] = null, k(d, c) && (d[c] = null)) : mt(c) && (c.value = null)), E(s)) St(s, l, 12, [o, u]); else {
        const t = C(s), r = mt(s);
        if (t || r) {
            const l = () => {
                if (e.f) {
                    const n = t ? k(d, s) ? d[s] : u[s] : s.value;
                    i ? w(n) && x(n, a) : w(n) ? n.includes(a) || n.push(a) : t ? (u[s] = [a], k(d, s) && (d[s] = u[s])) : (s.value = [a], e.k && (u[e.k] = s.value))
                } else t ? (u[s] = o, k(d, s) && (d[s] = o)) : r && (s.value = o, e.k && (u[e.k] = o))
            };
            o ? (l.id = -1, Sr(l, n)) : l()
        }
    }
}

const Sr = function (e, t) {
    var n;
    t && t.pendingBranch ? w(e) ? t.effects.push(...e) : t.effects.push(e) : (w(n = e) ? Dt.push(...n) : Mt && Mt.includes(n, n.allowRecurse ? zt + 1 : zt) || Dt.push(n), Ht())
};

function Pr(e) {
    return function (e, t) {
        K().__VUE__ = !0;
        const {
                insert: n,
                remove: r,
                patchProp: i,
                createElement: a,
                createText: o,
                createComment: l,
                setText: s,
                setElementText: c,
                parentNode: u,
                nextSibling: g,
                setScopeId: h = f,
                insertStaticContent: y
            } = e, m = (e, t, n, r = null, i = null, a = null, o = !1, l = null, s = !!t.dynamicChildren) => {
                if (e === t) return;
                e && !$r(e, t) && (r = Q(e), $(e, i, a, !0), e = null), -2 === t.patchFlag && (s = !1, t.dynamicChildren = null);
                const {type: c, ref: u, shapeFlag: p} = t;
                switch (c) {
                    case Ir:
                        v(e, t, n, r);
                        break;
                    case jr:
                        x(e, t, n, r);
                        break;
                    case Dr:
                        null == e && b(t, n, r, o);
                        break;
                    case Nr:
                        R(e, t, n, r, i, a, o, l, s);
                        break;
                    default:
                        1 & p ? T(e, t, n, r, i, a, o, l, s) : 6 & p ? N(e, t, n, r, i, a, o, l, s) : (64 & p || 128 & p) && c.process(e, t, n, r, i, a, o, l, s, te)
                }
                null != u && i && Or(u, e && e.ref, a, t || e, !t)
            }, v = (e, t, r, i) => {
                if (null == e) n(t.el = o(t.children), r, i); else {
                    const n = t.el = e.el;
                    t.children !== e.children && s(n, t.children)
                }
            }, x = (e, t, r, i) => {
                null == e ? n(t.el = l(t.children || ""), r, i) : t.el = e.el
            }, b = (e, t, n, r) => {
                [e.el, e.anchor] = y(e.children, t, n, r, e.el, e.anchor)
            }, w = ({el: e, anchor: t}, r, i) => {
                let a;
                for (; e && e !== t;) a = g(e), n(e, r, i), e = a;
                n(t, r, i)
            }, _ = ({el: e, anchor: t}) => {
                let n;
                for (; e && e !== t;) n = g(e), r(e), e = n;
                r(t)
            }, T = (e, t, n, r, i, a, o, l, s) => {
                o = o || "svg" === t.type, null == e ? E(t, n, r, i, a, o, l, s) : O(e, t, i, a, o, l, s)
            }, E = (e, t, r, o, l, s, u, p) => {
                let d, f;
                const {type: g, props: h, shapeFlag: y, transition: m, dirs: v} = e;
                if (d = e.el = a(e.type, s, h && h.is, h), 8 & y ? c(d, e.children) : 16 & y && L(e.children, d, null, o, l, s && "foreignObject" !== g, u, p), v && Bn(e, null, o, "created"), C(d, e, e.scopeId, u, o), h) {
                    for (const t in h) "value" === t || j(t) || i(d, t, null, h[t], s, e.children, o, l, Z);
                    "value" in h && i(d, "value", null, h.value), (f = h.onVnodeBeforeMount) && ii(f, o, e)
                }
                v && Bn(e, null, o, "beforeMount");
                const x = (!l || l && !l.pendingBranch) && m && !m.persisted;
                x && m.beforeEnter(d), n(d, t, r), ((f = h && h.onVnodeMounted) || x || v) && Sr((() => {
                    f && ii(f, o, e), x && m.enter(d), v && Bn(e, null, o, "mounted")
                }), l)
            }, C = (e, t, n, r, i) => {
                if (n && h(e, n), r) for (let a = 0; a < r.length; a++) h(e, r[a]);
                if (i) {
                    if (t === i.subTree) {
                        const t = i.vnode;
                        C(e, t, t.scopeId, t.slotScopeIds, i.parent)
                    }
                }
            }, L = (e, t, n, r, i, a, o, l, s = 0) => {
                for (let c = s; c < e.length; c++) {
                    const s = e[c] = l ? ni(e[c]) : ti(e[c]);
                    m(null, s, t, n, r, i, a, o, l)
                }
            }, O = (e, t, n, r, a, o, l) => {
                const s = t.el = e.el;
                let {patchFlag: u, dynamicChildren: d, dirs: f} = t;
                u |= 16 & e.patchFlag;
                const g = e.props || p, h = t.props || p;
                let y;
                n && Ar(n, !1), (y = h.onVnodeBeforeUpdate) && ii(y, n, t, e), f && Bn(t, e, n, "beforeUpdate"), n && Ar(n, !0);
                const m = a && "foreignObject" !== t.type;
                if (d ? P(e.dynamicChildren, d, s, n, r, m, o) : l || U(e, t, s, null, n, r, m, o, !1), u > 0) {
                    if (16 & u) A(s, t, g, h, n, r, a); else if (2 & u && g.class !== h.class && i(s, "class", null, h.class, a), 4 & u && i(s, "style", g.style, h.style, a), 8 & u) {
                        const o = t.dynamicProps;
                        for (let t = 0; t < o.length; t++) {
                            const l = o[t], c = g[l], u = h[l];
                            u === c && "value" !== l || i(s, l, c, u, a, e.children, n, r, Z)
                        }
                    }
                    1 & u && e.children !== t.children && c(s, t.children)
                } else l || null != d || A(s, t, g, h, n, r, a);
                ((y = h.onVnodeUpdated) || f) && Sr((() => {
                    y && ii(y, n, t, e), f && Bn(t, e, n, "updated")
                }), r)
            }, P = (e, t, n, r, i, a, o) => {
                for (let l = 0; l < t.length; l++) {
                    const s = e[l], c = t[l], p = s.el && (s.type === Nr || !$r(s, c) || 70 & s.shapeFlag) ? u(s.el) : n;
                    m(s, c, p, null, r, i, a, o, !0)
                }
            }, A = (e, t, n, r, a, o, l) => {
                if (n !== r) {
                    if (n !== p) for (const s in n) j(s) || s in r || i(e, s, n[s], null, l, t.children, a, o, Z);
                    for (const s in r) {
                        if (j(s)) continue;
                        const c = r[s], u = n[s];
                        c !== u && "value" !== s && i(e, s, u, c, l, t.children, a, o, Z)
                    }
                    "value" in r && i(e, "value", n.value, r.value)
                }
            }, R = (e, t, r, i, a, l, s, c, u) => {
                const p = t.el = e ? e.el : o(""), d = t.anchor = e ? e.anchor : o("");
                let {patchFlag: f, dynamicChildren: g, slotScopeIds: h} = t;
                h && (c = c ? c.concat(h) : h), null == e ? (n(p, r, i), n(d, r, i), L(t.children, r, d, a, l, s, c, u)) : f > 0 && 64 & f && g && e.dynamicChildren ? (P(e.dynamicChildren, g, r, a, l, s, c), (null != t.key || a && t === a.subTree) && Rr(e, t, !0)) : U(e, t, r, d, a, l, s, c, u)
            }, N = (e, t, n, r, i, a, o, l, s) => {
                t.slotScopeIds = l, null == e ? 512 & t.shapeFlag ? i.ctx.activate(t, n, r, o, s) : I(t, n, r, i, a, o, s) : D(e, t, s)
            }, I = (e, t, n, r, i, a, o) => {
                const l = e.component = function (e, t, n) {
                    const r = e.type, i = (t ? t.appContext : e.appContext) || ai, a = {
                        uid: oi++,
                        vnode: e,
                        type: r,
                        parent: t,
                        appContext: i,
                        root: null,
                        next: null,
                        subTree: null,
                        effect: null,
                        update: null,
                        scope: new X(!0),
                        render: null,
                        proxy: null,
                        exposed: null,
                        exposeProxy: null,
                        withProxy: null,
                        provides: t ? t.provides : Object.create(i.provides),
                        accessCache: null,
                        renderCache: [],
                        components: null,
                        directives: null,
                        propsOptions: fr(r, i),
                        emitsOptions: Xt(r, i),
                        emit: null,
                        emitted: null,
                        propsDefaults: p,
                        inheritAttrs: r.inheritAttrs,
                        ctx: p,
                        data: p,
                        props: p,
                        attrs: p,
                        slots: p,
                        refs: p,
                        setupState: p,
                        setupContext: null,
                        suspense: n,
                        suspenseId: n ? n.pendingId : 0,
                        asyncDep: null,
                        asyncResolved: !1,
                        isMounted: !1,
                        isUnmounted: !1,
                        isDeactivated: !1,
                        bc: null,
                        c: null,
                        bm: null,
                        m: null,
                        bu: null,
                        u: null,
                        um: null,
                        bum: null,
                        da: null,
                        a: null,
                        rtg: null,
                        rtc: null,
                        ec: null,
                        sp: null
                    };
                    a.ctx = {_: a}, a.root = t ? t.root : a, a.emit = Gt.bind(null, a), e.ce && e.ce(a);
                    return a
                }(e, r, i);
                if (xn(e) && (l.ctx.renderer = te), function (e, t = !1) {
                    fi = t;
                    const {props: n, children: r} = e.vnode, i = pi(e);
                    ur(e, n, i, t), _r(e, r);
                    const a = i ? function (e, t) {
                        const n = e.type;
                        e.accessCache = Object.create(null), e.proxy = dt(new Proxy(e.ctx, Zn));
                        const {setup: r} = n;
                        if (r) {
                            const n = e.setupContext = r.length > 1 ? function (e) {
                                const t = t => {
                                    e.exposed = t || {}
                                };
                                let n;
                                return {
                                    get attrs() {
                                        return n || (n = function (e) {
                                            return new Proxy(e.attrs, {get: (t, n) => (he(e, 0, "$attrs"), t[n])})
                                        }(e))
                                    }, slots: e.slots, emit: e.emit, expose: t
                                }
                            }(e) : null;
                            ci(e), fe();
                            const i = St(r, e, 0, [e.props, n]);
                            if (ge(), ui(), S(i)) {
                                if (i.then(ui, ui), t) return i.then((n => {
                                    gi(e, n, t)
                                })).catch((t => {
                                    At(t, e, 0)
                                }));
                                e.asyncDep = i
                            } else gi(e, i, t)
                        } else hi(e, t)
                    }(e, t) : void 0;
                    fi = !1
                }(l), l.asyncDep) {
                    if (i && i.registerDep(l, M), !e.el) {
                        const e = l.subTree = Jr(jr);
                        x(null, e, t, n)
                    }
                } else M(l, e, t, n, i, a, o)
            }, D = (e, t, n) => {
                const r = t.component = e.component;
                if (function (e, t, n) {
                    const {props: r, children: i, component: a} = e, {props: o, children: l, patchFlag: s} = t,
                        c = a.emitsOptions;
                    if (t.dirs || t.transition) return !0;
                    if (!(n && s >= 0)) return !(!i && !l || l && l.$stable) || r !== o && (r ? !o || on(r, o, c) : !!o);
                    if (1024 & s) return !0;
                    if (16 & s) return r ? on(r, o, c) : !!o;
                    if (8 & s) {
                        const e = t.dynamicProps;
                        for (let t = 0; t < e.length; t++) {
                            const n = e[t];
                            if (o[n] !== r[n] && !Jt(c, n)) return !0
                        }
                    }
                    return !1
                }(e, t, n)) {
                    if (r.asyncDep && !r.asyncResolved) return void V(r, t, n);
                    r.next = t, function (e) {
                        const t = It.indexOf(e);
                        t > jt && It.splice(t, 1)
                    }(r.update), r.update()
                } else t.el = e.el, r.vnode = t
            }, M = (e, t, n, r, i, a, o) => {
                const l = () => {
                    if (e.isMounted) {
                        let t, {next: n, bu: r, u: l, parent: s, vnode: c} = e, p = n;
                        Ar(e, !1), n ? (n.el = c.el, V(e, n, o)) : n = c, r && W(r), (t = n.props && n.props.onVnodeBeforeUpdate) && ii(t, s, n, c), Ar(e, !0);
                        const d = nn(e), f = e.subTree;
                        e.subTree = d, m(f, d, u(f.el), Q(f), e, i, a), n.el = d.el, null === p && function ({
                                                                                                                 vnode: e,
                                                                                                                 parent: t
                                                                                                             }, n) {
                            for (; t && t.subTree === e;) (e = t.vnode).el = n, t = t.parent
                        }(e, d.el), l && Sr(l, i), (t = n.props && n.props.onVnodeUpdated) && Sr((() => ii(t, s, n, c)), i)
                    } else {
                        let o;
                        const {el: l, props: s} = t, {bm: c, m: u, parent: p} = e, d = vn(t);
                        if (Ar(e, !1), c && W(c), !d && (o = s && s.onVnodeBeforeMount) && ii(o, p, t), Ar(e, !0), l && re) {
                            const n = () => {
                                e.subTree = nn(e), re(l, e.subTree, e, i, null)
                            };
                            d ? t.type.__asyncLoader().then((() => !e.isUnmounted && n())) : n()
                        } else {
                            const o = e.subTree = nn(e);
                            m(null, o, n, r, e, i, a), t.el = o.el
                        }
                        if (u && Sr(u, i), !d && (o = s && s.onVnodeMounted)) {
                            const e = t;
                            Sr((() => ii(o, p, e)), i)
                        }
                        (256 & t.shapeFlag || p && vn(p.vnode) && 256 & p.vnode.shapeFlag) && e.a && Sr(e.a, i), e.isMounted = !0, t = n = r = null
                    }
                }, s = e.effect = new ce(l, (() => Bt(c)), e.scope), c = e.update = () => s.run();
                c.id = e.uid, Ar(e, !0), c()
            }, V = (e, t, n) => {
                t.component = e;
                const r = e.vnode.props;
                e.vnode = t, e.next = null, function (e, t, n, r) {
                    const {props: i, attrs: a, vnode: {patchFlag: o}} = e, l = pt(i), [s] = e.propsOptions;
                    let c = !1;
                    if (!(r || o > 0) || 16 & o) {
                        let r;
                        pr(e, t, i, a) && (c = !0);
                        for (const a in l) t && (k(t, a) || (r = F(a)) !== a && k(t, r)) || (s ? !n || void 0 === n[a] && void 0 === n[r] || (i[a] = dr(s, l, a, void 0, e, !0)) : delete i[a]);
                        if (a !== l) for (const e in a) t && k(t, e) || (delete a[e], c = !0)
                    } else if (8 & o) {
                        const n = e.vnode.dynamicProps;
                        for (let r = 0; r < n.length; r++) {
                            let o = n[r];
                            if (Jt(e.emitsOptions, o)) continue;
                            const u = t[o];
                            if (s) if (k(a, o)) u !== a[o] && (a[o] = u, c = !0); else {
                                const t = z(o);
                                i[t] = dr(s, l, t, u, e, !1)
                            } else u !== a[o] && (a[o] = u, c = !0)
                        }
                    }
                    c && me(e, "set", "$attrs")
                }(e, t.props, r, n), Tr(e, t.children, n), fe(), Wt(), ge()
            }, U = (e, t, n, r, i, a, o, l, s = !1) => {
                const u = e && e.children, p = e ? e.shapeFlag : 0, d = t.children, {patchFlag: f, shapeFlag: g} = t;
                if (f > 0) {
                    if (128 & f) return void H(u, d, n, r, i, a, o, l, s);
                    if (256 & f) return void B(u, d, n, r, i, a, o, l, s)
                }
                8 & g ? (16 & p && Z(u, i, a), d !== u && c(n, d)) : 16 & p ? 16 & g ? H(u, d, n, r, i, a, o, l, s) : Z(u, i, a, !0) : (8 & p && c(n, ""), 16 & g && L(d, n, r, i, a, o, l, s))
            }, B = (e, t, n, r, i, a, o, l, s) => {
                t = t || d;
                const c = (e = e || d).length, u = t.length, p = Math.min(c, u);
                let f;
                for (f = 0; f < p; f++) {
                    const r = t[f] = s ? ni(t[f]) : ti(t[f]);
                    m(e[f], r, n, null, i, a, o, l, s)
                }
                c > u ? Z(e, i, a, !0, !1, p) : L(t, n, r, i, a, o, l, s, p)
            }, H = (e, t, n, r, i, a, o, l, s) => {
                let c = 0;
                const u = t.length;
                let p = e.length - 1, f = u - 1;
                for (; c <= p && c <= f;) {
                    const r = e[c], u = t[c] = s ? ni(t[c]) : ti(t[c]);
                    if (!$r(r, u)) break;
                    m(r, u, n, null, i, a, o, l, s), c++
                }
                for (; c <= p && c <= f;) {
                    const r = e[p], c = t[f] = s ? ni(t[f]) : ti(t[f]);
                    if (!$r(r, c)) break;
                    m(r, c, n, null, i, a, o, l, s), p--, f--
                }
                if (c > p) {
                    if (c <= f) {
                        const e = f + 1, p = e < u ? t[e].el : r;
                        for (; c <= f;) m(null, t[c] = s ? ni(t[c]) : ti(t[c]), n, p, i, a, o, l, s), c++
                    }
                } else if (c > f) for (; c <= p;) $(e[c], i, a, !0), c++; else {
                    const g = c, h = c, y = new Map;
                    for (c = h; c <= f; c++) {
                        const e = t[c] = s ? ni(t[c]) : ti(t[c]);
                        null != e.key && y.set(e.key, c)
                    }
                    let v, x = 0;
                    const b = f - h + 1;
                    let k = !1, w = 0;
                    const _ = new Array(b);
                    for (c = 0; c < b; c++) _[c] = 0;
                    for (c = g; c <= p; c++) {
                        const r = e[c];
                        if (x >= b) {
                            $(r, i, a, !0);
                            continue
                        }
                        let u;
                        if (null != r.key) u = y.get(r.key); else for (v = h; v <= f; v++) if (0 === _[v - h] && $r(r, t[v])) {
                            u = v;
                            break
                        }
                        void 0 === u ? $(r, i, a, !0) : (_[u - h] = c + 1, u >= w ? w = u : k = !0, m(r, t[u], n, null, i, a, o, l, s), x++)
                    }
                    const T = k ? function (e) {
                        const t = e.slice(), n = [0];
                        let r, i, a, o, l;
                        const s = e.length;
                        for (r = 0; r < s; r++) {
                            const s = e[r];
                            if (0 !== s) {
                                if (i = n[n.length - 1], e[i] < s) {
                                    t[r] = i, n.push(r);
                                    continue
                                }
                                for (a = 0, o = n.length - 1; a < o;) l = a + o >> 1, e[n[l]] < s ? a = l + 1 : o = l;
                                s < e[n[a]] && (a > 0 && (t[r] = n[a - 1]), n[a] = r)
                            }
                        }
                        a = n.length, o = n[a - 1];
                        for (; a-- > 0;) n[a] = o, o = t[o];
                        return n
                    }(_) : d;
                    for (v = T.length - 1, c = b - 1; c >= 0; c--) {
                        const e = h + c, p = t[e], d = e + 1 < u ? t[e + 1].el : r;
                        0 === _[c] ? m(null, p, n, d, i, a, o, l, s) : k && (v < 0 || c !== T[v] ? q(p, n, d, 2) : v--)
                    }
                }
            }, q = (e, t, r, i, a = null) => {
                const {el: o, type: l, transition: s, children: c, shapeFlag: u} = e;
                if (6 & u) return void q(e.component.subTree, t, r, i);
                if (128 & u) return void e.suspense.move(t, r, i);
                if (64 & u) return void l.move(e, t, r, te);
                if (l === Nr) {
                    n(o, t, r);
                    for (let e = 0; e < c.length; e++) q(c[e], t, r, i);
                    return void n(e.anchor, t, r)
                }
                if (l === Dr) return void w(e, t, r);
                if (2 !== i && 1 & u && s) if (0 === i) s.beforeEnter(o), n(o, t, r), Sr((() => s.enter(o)), a); else {
                    const {leave: e, delayLeave: i, afterLeave: a} = s, l = () => n(o, t, r), c = () => {
                        e(o, (() => {
                            l(), a && a()
                        }))
                    };
                    i ? i(o, l, c) : c()
                } else n(o, t, r)
            }, $ = (e, t, n, r = !1, i = !1) => {
                const {type: a, props: o, ref: l, children: s, dynamicChildren: c, shapeFlag: u, patchFlag: p, dirs: d} = e;
                if (null != l && Or(l, null, n, e, !0), 256 & u) return void t.ctx.deactivate(e);
                const f = 1 & u && d, g = !vn(e);
                let h;
                if (g && (h = o && o.onVnodeBeforeUnmount) && ii(h, t, e), 6 & u) J(e.component, n, r); else {
                    if (128 & u) return void e.suspense.unmount(n, r);
                    f && Bn(e, null, t, "beforeUnmount"), 64 & u ? e.type.remove(e, t, n, i, te, r) : c && (a !== Nr || p > 0 && 64 & p) ? Z(c, t, n, !1, !0) : (a === Nr && 384 & p || !i && 16 & u) && Z(s, t, n), r && Y(e)
                }
                (g && (h = o && o.onVnodeUnmounted) || f) && Sr((() => {
                    h && ii(h, t, e), f && Bn(e, null, t, "unmounted")
                }), n)
            }, Y = e => {
                const {type: t, el: n, anchor: i, transition: a} = e;
                if (t === Nr) return void G(n, i);
                if (t === Dr) return void _(e);
                const o = () => {
                    r(n), a && !a.persisted && a.afterLeave && a.afterLeave()
                };
                if (1 & e.shapeFlag && a && !a.persisted) {
                    const {leave: t, delayLeave: r} = a, i = () => t(n, o);
                    r ? r(e.el, o, i) : i()
                } else o()
            }, G = (e, t) => {
                let n;
                for (; e !== t;) n = g(e), r(e), e = n;
                r(t)
            }, J = (e, t, n) => {
                const {bum: r, scope: i, update: a, subTree: o, um: l} = e;
                r && W(r), i.stop(), a && (a.active = !1, $(o, e, t, n)), l && Sr(l, t), Sr((() => {
                    e.isUnmounted = !0
                }), t), t && t.pendingBranch && !t.isUnmounted && e.asyncDep && !e.asyncResolved && e.suspenseId === t.pendingId && (t.deps--, 0 === t.deps && t.resolve())
            }, Z = (e, t, n, r = !1, i = !1, a = 0) => {
                for (let o = a; o < e.length; o++) $(e[o], t, n, r, i)
            },
            Q = e => 6 & e.shapeFlag ? Q(e.component.subTree) : 128 & e.shapeFlag ? e.suspense.next() : g(e.anchor || e.el),
            ee = (e, t, n) => {
                null == e ? t._vnode && $(t._vnode, null, null, !0) : m(t._vnode || null, e, t, null, null, null, n), Wt(), qt(), t._vnode = e
            }, te = {p: m, um: $, m: q, r: Y, mt: I, mc: L, pc: U, pbc: P, n: Q, o: e};
        let ne, re;
        t && ([ne, re] = t(te));
        return {render: ee, hydrate: ne, createApp: Lr(ee, ne)}
    }(e)
}

function Ar({effect: e, update: t}, n) {
    e.allowRecurse = t.allowRecurse = n
}

function Rr(e, t, n = !1) {
    const r = e.children, i = t.children;
    if (w(r) && w(i)) for (let a = 0; a < r.length; a++) {
        const e = r[a];
        let t = i[a];
        1 & t.shapeFlag && !t.dynamicChildren && ((t.patchFlag <= 0 || 32 === t.patchFlag) && (t = i[a] = ni(i[a]), t.el = e.el), n || Rr(e, t)), t.type === Ir && (t.el = e.el)
    }
}

const Nr = Symbol(void 0), Ir = Symbol(void 0), jr = Symbol(void 0), Dr = Symbol(void 0), Mr = [];
let zr = null;

function Vr(e = !1) {
    Mr.push(zr = e ? null : [])
}

let Fr = 1;

function Ur(e) {
    Fr += e
}

function Br(e) {
    return e.dynamicChildren = Fr > 0 ? zr || d : null, Mr.pop(), zr = Mr[Mr.length - 1] || null, Fr > 0 && zr && zr.push(e), e
}

function Hr(e, t, n, r, i, a) {
    return Br(Xr(e, t, n, r, i, a, !0))
}

function Wr(e, t, n, r, i) {
    return Br(Jr(e, t, n, r, i, !0))
}

function qr(e) {
    return !!e && !0 === e.__v_isVNode
}

function $r(e, t) {
    return e.type === t.type && e.key === t.key
}

const Yr = "__vInternal", Kr = ({key: e}) => null != e ? e : null,
    Gr = ({ref: e, ref_key: t, ref_for: n}) => null != e ? C(e) || mt(e) || E(e) ? {
        i: Zt,
        r: e,
        k: t,
        f: !!n
    } : e : null;

function Xr(e, t = null, n = null, r = 0, i = null, a = (e === Nr ? 0 : 1), o = !1, l = !1) {
    const s = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && Kr(t),
        ref: t && Gr(t),
        scopeId: Qt,
        slotScopeIds: null,
        children: n,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: a,
        patchFlag: r,
        dynamicProps: i,
        dynamicChildren: null,
        appContext: null,
        ctx: Zt
    };
    return l ? (ri(s, n), 128 & a && e.normalize(s)) : n && (s.shapeFlag |= C(n) ? 8 : 16), Fr > 0 && !o && zr && (s.patchFlag > 0 || 6 & a) && 32 !== s.patchFlag && zr.push(s), s
}

const Jr = function (e, n = null, r = null, i = 0, a = null, l = !1) {
    e && e !== Wn || (e = jr);
    if (qr(e)) {
        const t = Zr(e, n, !0);
        return r && ri(t, r), Fr > 0 && !l && zr && (6 & t.shapeFlag ? zr[zr.indexOf(e)] = t : zr.push(t)), t.patchFlag |= -2, t
    }
    s = e, E(s) && "__vccOpts" in s && (e = e.__vccOpts);
    var s;
    if (n) {
        n = function (e) {
            return e ? ut(e) || Yr in e ? v({}, e) : e : null
        }(n);
        let {class: e, style: r} = n;
        e && !C(e) && (n.class = o(e)), O(r) && (ut(r) && !w(r) && (r = v({}, r)), n.style = t(r))
    }
    const c = C(e) ? 1 : ln(e) ? 128 : (e => e.__isTeleport)(e) ? 64 : O(e) ? 4 : E(e) ? 2 : 0;
    return Xr(e, n, r, i, a, c, l, !0)
};

function Zr(e, n, r = !1) {
    const {props: i, ref: a, patchFlag: l, children: s} = e, c = n ? function (...e) {
        const n = {};
        for (let r = 0; r < e.length; r++) {
            const i = e[r];
            for (const e in i) if ("class" === e) n.class !== i.class && (n.class = o([n.class, i.class])); else if ("style" === e) n.style = t([n.style, i.style]); else if (y(e)) {
                const t = n[e], r = i[e];
                !r || t === r || w(t) && t.includes(r) || (n[e] = t ? [].concat(t, r) : r)
            } else "" !== e && (n[e] = i[e])
        }
        return n
    }(i || {}, n) : i;
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: c,
        key: c && Kr(c),
        ref: n && n.ref ? r && a ? w(a) ? a.concat(Gr(n)) : [a, Gr(n)] : Gr(n) : a,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: s,
        target: e.target,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: n && e.type !== Nr ? -1 === l ? 16 : 16 | l : l,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: e.transition,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && Zr(e.ssContent),
        ssFallback: e.ssFallback && Zr(e.ssFallback),
        el: e.el,
        anchor: e.anchor,
        ctx: e.ctx,
        ce: e.ce
    }
}

function Qr(e = " ", t = 0) {
    return Jr(Ir, null, e, t)
}

function ei(e = "", t = !1) {
    return t ? (Vr(), Wr(jr, null, e)) : Jr(jr, null, e)
}

function ti(e) {
    return null == e || "boolean" == typeof e ? Jr(jr) : w(e) ? Jr(Nr, null, e.slice()) : "object" == typeof e ? ni(e) : Jr(Ir, null, String(e))
}

function ni(e) {
    return null === e.el && -1 !== e.patchFlag || e.memo ? e : Zr(e)
}

function ri(e, t) {
    let n = 0;
    const {shapeFlag: r} = e;
    if (null == t) t = null; else if (w(t)) n = 16; else if ("object" == typeof t) {
        if (65 & r) {
            const n = t.default;
            return void (n && (n._c && (n._d = !1), ri(e, n()), n._c && (n._d = !0)))
        }
        {
            n = 32;
            const r = t._;
            r || Yr in t ? 3 === r && Zt && (1 === Zt.slots._ ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024)) : t._ctx = Zt
        }
    } else E(t) ? (t = {default: t, _ctx: Zt}, n = 32) : (t = String(t), 64 & r ? (n = 16, t = [Qr(t)]) : n = 8);
    e.children = t, e.shapeFlag |= n
}

function ii(e, t, n, r = null) {
    Pt(e, t, 7, [n, r])
}

const ai = Er();
let oi = 0;
let li = null;
const si = () => li || Zt, ci = e => {
    li = e, e.scope.on()
}, ui = () => {
    li && li.scope.off(), li = null
};

function pi(e) {
    return 4 & e.vnode.shapeFlag
}

let di, fi = !1;

function gi(e, t, n) {
    E(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : O(t) && (e.setupState = Tt(t)), hi(e, n)
}

function hi(e, t, n) {
    const r = e.type;
    if (!e.render) {
        if (!t && di && !r.render) {
            const t = r.template || rr(e).template;
            if (t) {
                const {isCustomElement: n, compilerOptions: i} = e.appContext.config, {
                    delimiters: a,
                    compilerOptions: o
                } = r, l = v(v({isCustomElement: n, delimiters: a}, i), o);
                r.render = di(t, l)
            }
        }
        e.render = r.render || f
    }
    ci(e), fe(), er(e), ge(), ui()
}

function yi(e) {
    if (e.exposed) return e.exposeProxy || (e.exposeProxy = new Proxy(Tt(dt(e.exposed)), {
        get: (t, n) => n in t ? t[n] : n in Xn ? Xn[n](e) : void 0,
        has: (e, t) => t in e || t in Xn
    }))
}

function mi(e, t = !0) {
    return E(e) ? e.displayName || e.name : e.name || t && e.__name
}

const vi = (e, t) => function (e, t, n = !1) {
    let r, i;
    const a = E(e);
    return a ? (r = e, i = f) : (r = e.get, i = e.set), new Ot(r, i, a || !i, n)
}(e, 0, fi);

function xi(e, t, n) {
    const r = arguments.length;
    return 2 === r ? O(t) && !w(t) ? qr(t) ? Jr(e, null, [t]) : Jr(e, t) : Jr(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : 3 === r && qr(n) && (n = [n]), Jr(e, t, n))
}

const bi = Symbol(""), ki = () => cn(bi), wi = "3.2.47", _i = "undefined" != typeof document ? document : null,
    Ti = _i && _i.createElement("template"), Ei = {
        insert: (e, t, n) => {
            t.insertBefore(e, n || null)
        },
        remove: e => {
            const t = e.parentNode;
            t && t.removeChild(e)
        },
        createElement: (e, t, n, r) => {
            const i = t ? _i.createElementNS("http://www.w3.org/2000/svg", e) : _i.createElement(e, n ? {is: n} : void 0);
            return "select" === e && r && null != r.multiple && i.setAttribute("multiple", r.multiple), i
        },
        createText: e => _i.createTextNode(e),
        createComment: e => _i.createComment(e),
        setText: (e, t) => {
            e.nodeValue = t
        },
        setElementText: (e, t) => {
            e.textContent = t
        },
        parentNode: e => e.parentNode,
        nextSibling: e => e.nextSibling,
        querySelector: e => _i.querySelector(e),
        setScopeId(e, t) {
            e.setAttribute(t, "")
        },
        insertStaticContent(e, t, n, r, i, a) {
            const o = n ? n.previousSibling : t.lastChild;
            if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), i !== a && (i = i.nextSibling);) ; else {
                Ti.innerHTML = r ? `<svg>${e}</svg>` : e;
                const i = Ti.content;
                if (r) {
                    const e = i.firstChild;
                    for (; e.firstChild;) i.appendChild(e.firstChild);
                    i.removeChild(e)
                }
                t.insertBefore(i, n)
            }
            return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
        }
    };
const Ci = /\s*!important$/;

function Li(e, t, n) {
    if (w(n)) n.forEach((n => Li(e, t, n))); else if (null == n && (n = ""), t.startsWith("--")) e.setProperty(t, n); else {
        const r = function (e, t) {
            const n = Si[t];
            if (n) return n;
            let r = z(t);
            if ("filter" !== r && r in e) return Si[t] = r;
            r = U(r);
            for (let i = 0; i < Oi.length; i++) {
                const n = Oi[i] + r;
                if (n in e) return Si[t] = n
            }
            return t
        }(e, t);
        Ci.test(n) ? e.setProperty(F(r), n.replace(Ci, ""), "important") : e[r] = n
    }
}

const Oi = ["Webkit", "Moz", "ms"], Si = {};
const Pi = "http://www.w3.org/1999/xlink";

function Ai(e, t, n, r, i = null) {
    const a = e._vei || (e._vei = {}), o = a[t];
    if (r && o) o.value = r; else {
        const [n, l] = function (e) {
            let t;
            if (Ri.test(e)) {
                let n;
                for (t = {}; n = e.match(Ri);) e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0
            }
            const n = ":" === e[2] ? e.slice(3) : F(e.slice(2));
            return [n, t]
        }(t);
        if (r) {
            const o = a[t] = function (e, t) {
                const n = e => {
                    if (e._vts) {
                        if (e._vts <= n.attached) return
                    } else e._vts = Date.now();
                    Pt(function (e, t) {
                        if (w(t)) {
                            const n = e.stopImmediatePropagation;
                            return e.stopImmediatePropagation = () => {
                                n.call(e), e._stopped = !0
                            }, t.map((e => t => !t._stopped && e && e(t)))
                        }
                        return t
                    }(e, n.value), t, 5, [e])
                };
                return n.value = e, n.attached = ji(), n
            }(r, i);
            !function (e, t, n, r) {
                e.addEventListener(t, n, r)
            }(e, n, o, l)
        } else o && (!function (e, t, n, r) {
            e.removeEventListener(t, n, r)
        }(e, n, o, l), a[t] = void 0)
    }
}

const Ri = /(?:Once|Passive|Capture)$/;
let Ni = 0;
const Ii = Promise.resolve(), ji = () => Ni || (Ii.then((() => Ni = 0)), Ni = Date.now());
const Di = /^on[a-z]/;
const Mi = {
    beforeMount(e, {value: t}, {transition: n}) {
        e._vod = "none" === e.style.display ? "" : e.style.display, n && t ? n.beforeEnter(e) : zi(e, t)
    }, mounted(e, {value: t}, {transition: n}) {
        n && t && n.enter(e)
    }, updated(e, {value: t, oldValue: n}, {transition: r}) {
        !t != !n && (r ? t ? (r.beforeEnter(e), zi(e, !0), r.enter(e)) : r.leave(e, (() => {
            zi(e, !1)
        })) : zi(e, t))
    }, beforeUnmount(e, {value: t}) {
        zi(e, t)
    }
};

function zi(e, t) {
    e.style.display = t ? e._vod : "none"
}

const Vi = v({
    patchProp: (e, t, n, r, i = !1, a, o, c, u) => {
        "class" === t ? function (e, t, n) {
            const r = e._vtc;
            r && (t = (t ? [t, ...r] : [...r]).join(" ")), null == t ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t
        }(e, r, i) : "style" === t ? function (e, t, n) {
            const r = e.style, i = C(n);
            if (n && !i) {
                if (t && !C(t)) for (const e in t) null == n[e] && Li(r, e, "");
                for (const e in n) Li(r, e, n[e])
            } else {
                const a = r.display;
                i ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (r.display = a)
            }
        }(e, n, r) : y(t) ? m(t) || Ai(e, t, 0, r, o) : ("." === t[0] ? (t = t.slice(1), 1) : "^" === t[0] ? (t = t.slice(1), 0) : function (e, t, n, r) {
            if (r) return "innerHTML" === t || "textContent" === t || !!(t in e && Di.test(t) && E(n));
            if ("spellcheck" === t || "draggable" === t || "translate" === t) return !1;
            if ("form" === t) return !1;
            if ("list" === t && "INPUT" === e.tagName) return !1;
            if ("type" === t && "TEXTAREA" === e.tagName) return !1;
            if (Di.test(t) && C(n)) return !1;
            return t in e
        }(e, t, r, i)) ? function (e, t, n, r, i, a, o) {
            if ("innerHTML" === t || "textContent" === t) return r && o(r, i, a), void (e[t] = null == n ? "" : n);
            if ("value" === t && "PROGRESS" !== e.tagName && !e.tagName.includes("-")) {
                e._value = n;
                const r = null == n ? "" : n;
                return e.value === r && "OPTION" !== e.tagName || (e.value = r), void (null == n && e.removeAttribute(t))
            }
            let l = !1;
            if ("" === n || null == n) {
                const r = typeof e[t];
                "boolean" === r ? n = s(n) : null == n && "string" === r ? (n = "", l = !0) : "number" === r && (n = 0, l = !0)
            }
            try {
                e[t] = n
            } catch (c) {
            }
            l && e.removeAttribute(t)
        }(e, t, r, a, o, c, u) : ("true-value" === t ? e._trueValue = r : "false-value" === t && (e._falseValue = r), function (e, t, n, r, i) {
            if (r && t.startsWith("xlink:")) null == n ? e.removeAttributeNS(Pi, t.slice(6, t.length)) : e.setAttributeNS(Pi, t, n); else {
                const r = l(t);
                null == n || r && !s(n) ? e.removeAttribute(t) : e.setAttribute(t, r ? "" : n)
            }
        }(e, t, r, i))
    }
}, Ei);
let Fi;
/*!
  * pinia v2.0.33
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
let Ui;
const Bi = e => Ui = e, Hi = Symbol();

function Wi(e) {
    return e && "object" == typeof e && "[object Object]" === Object.prototype.toString.call(e) && "function" != typeof e.toJSON
}

var qi, $i;

function Yi() {
    const e = J(!0), t = e.run((() => vt({})));
    let n = [], r = [];
    const i = dt({
        install(e) {
            Bi(i), i._a = e, e.provide(Hi, i), e.config.globalProperties.$pinia = i, r.forEach((e => n.push(e))), r = []
        }, use(e) {
            return this._a ? n.push(e) : r.push(e), this
        }, _p: n, _a: null, _e: e, _s: new Map, state: t
    });
    return i
}

($i = qi || (qi = {})).direct = "direct", $i.patchObject = "patch object", $i.patchFunction = "patch function";
const Ki = () => {
};

function Gi(e, t, n, r = Ki) {
    e.push(t);
    const i = () => {
        const n = e.indexOf(t);
        n > -1 && (e.splice(n, 1), r())
    };
    var a;
    return !n && Z() && (a = i, G && G.cleanups.push(a)), i
}

function Xi(e, ...t) {
    e.slice().forEach((e => {
        e(...t)
    }))
}

function Ji(e, t) {
    e instanceof Map && t instanceof Map && t.forEach(((t, n) => e.set(n, t))), e instanceof Set && t instanceof Set && t.forEach(e.add, e);
    for (const n in t) {
        if (!t.hasOwnProperty(n)) continue;
        const r = t[n], i = e[n];
        Wi(i) && Wi(r) && e.hasOwnProperty(n) && !mt(r) && !lt(r) ? e[n] = Ji(i, r) : e[n] = r
    }
    return e
}

const Zi = Symbol();
const {assign: Qi} = Object;

function ea(e, t, n, r) {
    const {state: i, actions: a, getters: o} = t, l = n.state.value[e];
    let s;
    return s = ta(e, (function () {
        l || (n.state.value[e] = i ? i() : {});
        const t = function (e) {
            const t = w(e) ? new Array(e.length) : {};
            for (const n in e) t[n] = Ct(e, n);
            return t
        }(n.state.value[e]);
        return Qi(t, a, Object.keys(o || {}).reduce(((t, r) => (t[r] = dt(vi((() => {
            Bi(n);
            const t = n._s.get(e);
            return o[r].call(t, t)
        }))), t)), {}))
    }), t, n, r, !0), s
}

function ta(e, t, n = {}, r, i, a) {
    let o;
    const l = Qi({actions: {}}, n), s = {deep: !0};
    let c, u, p, d = dt([]), f = dt([]);
    const g = r.state.value[e];
    let h;

    function y(t) {
        let n;
        c = u = !1, "function" == typeof t ? (t(r.state.value[e]), n = {
            type: qi.patchFunction,
            storeId: e,
            events: p
        }) : (Ji(r.state.value[e], t), n = {type: qi.patchObject, payload: t, storeId: e, events: p});
        const i = h = Symbol();
        Ut().then((() => {
            h === i && (c = !0)
        })), u = !0, Xi(d, n, r.state.value[e])
    }

    a || g || (r.state.value[e] = {}), vt({});
    const m = a ? function () {
        const {state: e} = n, t = e ? e() : {};
        this.$patch((e => {
            Qi(e, t)
        }))
    } : Ki;

    function v(t, n) {
        return function () {
            Bi(r);
            const i = Array.from(arguments), a = [], o = [];
            let l;
            Xi(f, {
                args: i, name: t, store: x, after: function (e) {
                    a.push(e)
                }, onError: function (e) {
                    o.push(e)
                }
            });
            try {
                l = n.apply(this && this.$id === e ? this : x, i)
            } catch (s) {
                throw Xi(o, s), s
            }
            return l instanceof Promise ? l.then((e => (Xi(a, e), e))).catch((e => (Xi(o, e), Promise.reject(e)))) : (Xi(a, l), l)
        }
    }

    const x = it({
        _p: r, $id: e, $onAction: Gi.bind(null, f), $patch: y, $reset: m, $subscribe(t, n = {}) {
            const i = Gi(d, t, n.detached, (() => a())), a = o.run((() => pn((() => r.state.value[e]), (r => {
                ("sync" === n.flush ? u : c) && t({storeId: e, type: qi.direct, events: p}, r)
            }), Qi({}, s, n))));
            return i
        }, $dispose: function () {
            o.stop(), d = [], f = [], r._s.delete(e)
        }
    });
    r._s.set(e, x);
    const b = r._e.run((() => (o = J(), o.run((() => t())))));
    for (const _ in b) {
        const t = b[_];
        if (mt(t) && (!mt(w = t) || !w.effect) || lt(t)) a || (!g || Wi(k = t) && k.hasOwnProperty(Zi) || (mt(t) ? t.value = g[_] : Ji(t, g[_])), r.state.value[e][_] = t); else if ("function" == typeof t) {
            const e = v(_, t);
            b[_] = e, l.actions[_] = t
        }
    }
    var k, w;
    return Qi(x, b), Qi(pt(x), b), Object.defineProperty(x, "$state", {
        get: () => r.state.value[e], set: e => {
            y((t => {
                Qi(t, e)
            }))
        }
    }), r._p.forEach((e => {
        Qi(x, o.run((() => e({store: x, app: r._a, pinia: r, options: l}))))
    })), g && a && n.hydrate && n.hydrate(x.$state, g), c = !0, u = !0, x
}

function na() {
}

var ra = "undefined" != typeof window, ia = (e, t) => ({top: 0, left: 0, right: e, bottom: t, width: e, height: t}),
    aa = e => {
        const t = wt(e);
        if (t === window) {
            const e = t.innerWidth, n = t.innerHeight;
            return ia(e, n)
        }
        return (null == t ? void 0 : t.getBoundingClientRect) ? t.getBoundingClientRect() : ia(0, 0)
    }, oa = /scroll|auto|overlay/i, la = ra ? window : void 0;

function sa(e) {
    return "HTML" !== e.tagName && "BODY" !== e.tagName && 1 === e.nodeType
}

const ca = ra && "IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype,
    ua = "event", pa = "observer";

function da(e, t) {
    if (!e.length) return;
    const n = e.indexOf(t);
    return n > -1 ? e.splice(n, 1) : void 0
}

function fa(e, t) {
    if ("IMG" !== e.tagName || !e.getAttribute("data-srcset")) return;
    let n = e.getAttribute("data-srcset");
    const r = e.parentNode.offsetWidth * t;
    let i, a, o;
    n = n.trim().split(",");
    const l = n.map((e => (e = e.trim(), i = e.lastIndexOf(" "), -1 === i ? (a = e, o = 999998) : (a = e.substr(0, i), o = parseInt(e.substr(i + 1, e.length - i - 2), 10)), [o, a])));
    l.sort(((e, t) => {
        if (e[0] < t[0]) return 1;
        if (e[0] > t[0]) return -1;
        if (e[0] === t[0]) {
            if (-1 !== t[1].indexOf(".webp", t[1].length - 5)) return 1;
            if (-1 !== e[1].indexOf(".webp", e[1].length - 5)) return -1
        }
        return 0
    }));
    let s, c = "";
    for (let u = 0; u < l.length; u++) {
        s = l[u], c = s[1];
        const e = l[u + 1];
        if (e && e[0] < r) {
            c = s[1];
            break
        }
        if (!e) {
            c = s[1];
            break
        }
    }
    return c
}

const ga = (e = 1) => ra && window.devicePixelRatio || e;

function ha() {
    if (!ra) return !1;
    let e = !0;
    try {
        const t = document.createElement("canvas");
        t.getContext && t.getContext("2d") && (e = 0 === t.toDataURL("image/webp").indexOf("data:image/webp"))
    } catch (t) {
        e = !1
    }
    return e
}

function ya(e, t, n) {
    e.addEventListener(t, n, {capture: !1, passive: !0})
}

function ma(e, t, n) {
    e.removeEventListener(t, n, !1)
}

const va = (e, t, n) => {
    const r = new Image;
    if (!e || !e.src) return n(new Error("image src is required"));
    r.src = e.src, e.cors && (r.crossOrigin = e.cors), r.onload = () => t({
        naturalHeight: r.naturalHeight,
        naturalWidth: r.naturalWidth,
        src: r.src
    }), r.onerror = e => n(e)
};

class xa {
    constructor({max: e}) {
        this.options = {max: e || 100}, this.caches = []
    }

    has(e) {
        return this.caches.indexOf(e) > -1
    }

    add(e) {
        this.has(e) || (this.caches.push(e), this.caches.length > this.options.max && this.free())
    }

    free() {
        this.caches.shift()
    }
}

class ba {
    constructor({
                    el: e,
                    src: t,
                    error: n,
                    loading: r,
                    bindType: i,
                    $parent: a,
                    options: o,
                    cors: l,
                    elRenderer: s,
                    imageCache: c
                }) {
        this.el = e, this.src = t, this.error = n, this.loading = r, this.bindType = i, this.attempt = 0, this.cors = l, this.naturalHeight = 0, this.naturalWidth = 0, this.options = o, this.$parent = a, this.elRenderer = s, this.imageCache = c, this.performanceData = {
            loadStart: 0,
            loadEnd: 0
        }, this.filter(), this.initState(), this.render("loading", !1)
    }

    initState() {
        "dataset" in this.el ? this.el.dataset.src = this.src : this.el.setAttribute("data-src", this.src), this.state = {
            loading: !1,
            error: !1,
            loaded: !1,
            rendered: !1
        }
    }

    record(e) {
        this.performanceData[e] = Date.now()
    }

    update({src: e, loading: t, error: n}) {
        const r = this.src;
        this.src = e, this.loading = t, this.error = n, this.filter(), r !== this.src && (this.attempt = 0, this.initState())
    }

    checkInView() {
        const e = aa(this.el);
        return e.top < window.innerHeight * this.options.preLoad && e.bottom > this.options.preLoadTop && e.left < window.innerWidth * this.options.preLoad && e.right > 0
    }

    filter() {
        Object.keys(this.options.filter).forEach((e => {
            this.options.filter[e](this, this.options)
        }))
    }

    renderLoading(e) {
        this.state.loading = !0, va({src: this.loading, cors: this.cors}, (() => {
            this.render("loading", !1), this.state.loading = !1, e()
        }), (() => {
            e(), this.state.loading = !1
        }))
    }

    load(e = na) {
        if (this.attempt > this.options.attempt - 1 && this.state.error) e(); else if (!this.state.rendered || !this.state.loaded) return this.imageCache.has(this.src) ? (this.state.loaded = !0, this.render("loaded", !0), this.state.rendered = !0, e()) : void this.renderLoading((() => {
            var t, n;
            this.attempt++, null == (n = (t = this.options.adapter).beforeLoad) || n.call(t, this, this.options), this.record("loadStart"), va({
                src: this.src,
                cors: this.cors
            }, (t => {
                this.naturalHeight = t.naturalHeight, this.naturalWidth = t.naturalWidth, this.state.loaded = !0, this.state.error = !1, this.record("loadEnd"), this.render("loaded", !1), this.state.rendered = !0, this.imageCache.add(this.src), e()
            }), (e => {
                this.options.silent, this.state.error = !0, this.state.loaded = !1, this.render("error", !1)
            }))
        }))
    }

    render(e, t) {
        this.elRenderer(this, e, t)
    }

    performance() {
        let e = "loading", t = 0;
        return this.state.loaded && (e = "loaded", t = (this.performanceData.loadEnd - this.performanceData.loadStart) / 1e3), this.state.error && (e = "error"), {
            src: this.src,
            state: e,
            time: t
        }
    }

    $destroy() {
        this.el = null, this.src = null, this.error = null, this.loading = null, this.bindType = null, this.attempt = 0
    }
}

const ka = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
    wa = ["scroll", "wheel", "mousewheel", "resize", "animationend", "transitionend", "touchmove"],
    _a = {rootMargin: "0px", threshold: 0};

function Ta() {
    return class {
        constructor({
                        preLoad: e,
                        error: t,
                        throttleWait: n,
                        preLoadTop: r,
                        dispatchEvent: i,
                        loading: a,
                        attempt: o,
                        silent: l = !0,
                        scale: s,
                        listenEvents: c,
                        filter: u,
                        adapter: p,
                        observer: d,
                        observerOptions: f
                    }) {
            this.mode = ua, this.listeners = [], this.targetIndex = 0, this.targets = [], this.options = {
                silent: l,
                dispatchEvent: !!i,
                throttleWait: n || 200,
                preLoad: e || 1.3,
                preLoadTop: r || 0,
                error: t || ka,
                loading: a || ka,
                attempt: o || 3,
                scale: s || ga(s),
                ListenEvents: c || wa,
                supportWebp: ha(),
                filter: u || {},
                adapter: p || {},
                observer: !!d,
                observerOptions: f || _a
            }, this.initEvent(), this.imageCache = new xa({max: 200}), this.lazyLoadHandler = function (e, t) {
                let n = null, r = 0;
                return function (...i) {
                    if (n) return;
                    const a = () => {
                        r = Date.now(), n = !1, e.apply(this, i)
                    };
                    Date.now() - r >= t ? a() : n = setTimeout(a, t)
                }
            }(this.lazyLoadHandler.bind(this), this.options.throttleWait), this.setMode(this.options.observer ? pa : ua)
        }

        config(e = {}) {
            Object.assign(this.options, e)
        }

        performance() {
            return this.listeners.map((e => e.performance()))
        }

        addLazyBox(e) {
            this.listeners.push(e), ra && (this.addListenerTarget(window), this.observer && this.observer.observe(e.el), e.$el && e.$el.parentNode && this.addListenerTarget(e.$el.parentNode))
        }

        add(e, t, n) {
            if (this.listeners.some((t => t.el === e))) return this.update(e, t), Ut(this.lazyLoadHandler);
            const r = this.valueFormatter(t.value);
            let {src: i} = r;
            Ut((() => {
                i = fa(e, this.options.scale) || i, this.observer && this.observer.observe(e);
                const a = Object.keys(t.modifiers)[0];
                let o;
                a && (o = n.context.$refs[a], o = o ? o.$el || o : document.getElementById(a)), o || (o = function (e, t = la) {
                    let n = e;
                    for (; n && n !== t && sa(n);) {
                        const {overflowY: e} = window.getComputedStyle(n);
                        if (oa.test(e)) return n;
                        n = n.parentNode
                    }
                    return t
                }(e));
                const l = new ba({
                    bindType: t.arg,
                    $parent: o,
                    el: e,
                    src: i,
                    loading: r.loading,
                    error: r.error,
                    cors: r.cors,
                    elRenderer: this.elRenderer.bind(this),
                    options: this.options,
                    imageCache: this.imageCache
                });
                this.listeners.push(l), ra && (this.addListenerTarget(window), this.addListenerTarget(o)), this.lazyLoadHandler(), Ut((() => this.lazyLoadHandler()))
            }))
        }

        update(e, t, n) {
            const r = this.valueFormatter(t.value);
            let {src: i} = r;
            i = fa(e, this.options.scale) || i;
            const a = this.listeners.find((t => t.el === e));
            a ? a.update({
                src: i,
                error: r.error,
                loading: r.loading
            }) : this.add(e, t, n), this.observer && (this.observer.unobserve(e), this.observer.observe(e)), this.lazyLoadHandler(), Ut((() => this.lazyLoadHandler()))
        }

        remove(e) {
            if (!e) return;
            this.observer && this.observer.unobserve(e);
            const t = this.listeners.find((t => t.el === e));
            t && (this.removeListenerTarget(t.$parent), this.removeListenerTarget(window), da(this.listeners, t), t.$destroy())
        }

        removeComponent(e) {
            e && (da(this.listeners, e), this.observer && this.observer.unobserve(e.el), e.$parent && e.$el.parentNode && this.removeListenerTarget(e.$el.parentNode), this.removeListenerTarget(window))
        }

        setMode(e) {
            ca || e !== pa || (e = ua), this.mode = e, e === ua ? (this.observer && (this.listeners.forEach((e => {
                this.observer.unobserve(e.el)
            })), this.observer = null), this.targets.forEach((e => {
                this.initListen(e.el, !0)
            }))) : (this.targets.forEach((e => {
                this.initListen(e.el, !1)
            })), this.initIntersectionObserver())
        }

        addListenerTarget(e) {
            if (!e) return;
            let t = this.targets.find((t => t.el === e));
            return t ? t.childrenCount++ : (t = {
                el: e,
                id: ++this.targetIndex,
                childrenCount: 1,
                listened: !0
            }, this.mode === ua && this.initListen(t.el, !0), this.targets.push(t)), this.targetIndex
        }

        removeListenerTarget(e) {
            this.targets.forEach(((t, n) => {
                t.el === e && (t.childrenCount--, t.childrenCount || (this.initListen(t.el, !1), this.targets.splice(n, 1), t = null))
            }))
        }

        initListen(e, t) {
            this.options.ListenEvents.forEach((n => (t ? ya : ma)(e, n, this.lazyLoadHandler)))
        }

        initEvent() {
            this.Event = {listeners: {loading: [], loaded: [], error: []}}, this.$on = (e, t) => {
                this.Event.listeners[e] || (this.Event.listeners[e] = []), this.Event.listeners[e].push(t)
            }, this.$once = (e, t) => {
                const n = (...r) => {
                    this.$off(e, n), t.apply(this, r)
                };
                this.$on(e, n)
            }, this.$off = (e, t) => {
                if (t) da(this.Event.listeners[e], t); else {
                    if (!this.Event.listeners[e]) return;
                    this.Event.listeners[e].length = 0
                }
            }, this.$emit = (e, t, n) => {
                this.Event.listeners[e] && this.Event.listeners[e].forEach((e => e(t, n)))
            }
        }

        lazyLoadHandler() {
            const e = [];
            this.listeners.forEach((t => {
                t.el && t.el.parentNode || e.push(t);
                t.checkInView() && t.load()
            })), e.forEach((e => {
                da(this.listeners, e), e.$destroy()
            }))
        }

        initIntersectionObserver() {
            ca && (this.observer = new IntersectionObserver(this.observerHandler.bind(this), this.options.observerOptions), this.listeners.length && this.listeners.forEach((e => {
                this.observer.observe(e.el)
            })))
        }

        observerHandler(e) {
            e.forEach((e => {
                e.isIntersecting && this.listeners.forEach((t => {
                    if (t.el === e.target) {
                        if (t.state.loaded) return this.observer.unobserve(t.el);
                        t.load()
                    }
                }))
            }))
        }

        elRenderer(e, t, n) {
            if (!e.el) return;
            const {el: r, bindType: i} = e;
            let a;
            switch (t) {
                case"loading":
                    a = e.loading;
                    break;
                case"error":
                    a = e.error;
                    break;
                default:
                    ({src: a} = e)
            }
            if (i ? r.style[i] = 'url("' + a + '")' : r.getAttribute("src") !== a && r.setAttribute("src", a), r.setAttribute("lazy", t), this.$emit(t, e, n), this.options.adapter[t] && this.options.adapter[t](e, this.options), this.options.dispatchEvent) {
                const n = new CustomEvent(t, {detail: e});
                r.dispatchEvent(n)
            }
        }

        valueFormatter(e) {
            let t = e, {loading: n, error: r} = this.options;
            var i;
            return null !== (i = e) && "object" == typeof i && (({src: t} = e), n = e.loading || this.options.loading, r = e.error || this.options.error), {
                src: t,
                loading: n,
                error: r
            }
        }
    }
}

var Ea = e => ({
    props: {tag: {type: String, default: "div"}}, emits: ["show"], render() {
        return xi(this.tag, this.show && this.$slots.default ? this.$slots.default() : null)
    }, data: () => ({el: null, state: {loaded: !1}, show: !1}), mounted() {
        this.el = this.$el, e.addLazyBox(this), e.lazyLoadHandler()
    }, beforeUnmount() {
        e.removeComponent(this)
    }, methods: {
        checkInView() {
            const t = aa(this.$el);
            return ra && t.top < window.innerHeight * e.options.preLoad && t.bottom > 0 && t.left < window.innerWidth * e.options.preLoad && t.right > 0
        }, load() {
            this.show = !0, this.state.loaded = !0, this.$emit("show", this)
        }, destroy() {
            return this.$destroy
        }
    }
});
const Ca = {selector: "img"};

class La {
    constructor({el: e, binding: t, vnode: n, lazy: r}) {
        this.el = null, this.vnode = n, this.binding = t, this.options = {}, this.lazy = r, this.queue = [], this.update({
            el: e,
            binding: t
        })
    }

    update({el: e, binding: t}) {
        this.el = e, this.options = Object.assign({}, Ca, t.value);
        this.getImgs().forEach((e => {
            this.lazy.add(e, Object.assign({}, this.binding, {
                value: {
                    src: "dataset" in e ? e.dataset.src : e.getAttribute("data-src"),
                    error: ("dataset" in e ? e.dataset.error : e.getAttribute("data-error")) || this.options.error,
                    loading: ("dataset" in e ? e.dataset.loading : e.getAttribute("data-loading")) || this.options.loading
                }
            }), this.vnode)
        }))
    }

    getImgs() {
        return Array.from(this.el.querySelectorAll(this.options.selector))
    }

    clear() {
        this.getImgs().forEach((e => this.lazy.remove(e))), this.vnode = null, this.binding = null, this.lazy = null
    }
}

class Oa {
    constructor({lazy: e}) {
        this.lazy = e, this.queue = []
    }

    bind(e, t, n) {
        const r = new La({el: e, binding: t, vnode: n, lazy: this.lazy});
        this.queue.push(r)
    }

    update(e, t, n) {
        const r = this.queue.find((t => t.el === e));
        r && r.update({el: e, binding: t, vnode: n})
    }

    unbind(e) {
        const t = this.queue.find((t => t.el === e));
        t && (t.clear(), da(this.queue, t))
    }
}

var Sa = e => ({
    props: {src: [String, Object], tag: {type: String, default: "img"}},
    render() {
        var e, t;
        return xi(this.tag, {src: this.renderSrc}, null == (t = (e = this.$slots).default) ? void 0 : t.call(e))
    },
    data: () => ({
        el: null,
        options: {src: "", error: "", loading: "", attempt: e.options.attempt},
        state: {loaded: !1, error: !1, attempt: 0},
        renderSrc: ""
    }),
    watch: {
        src() {
            this.init(), e.addLazyBox(this), e.lazyLoadHandler()
        }
    },
    created() {
        this.init()
    },
    mounted() {
        this.el = this.$el, e.addLazyBox(this), e.lazyLoadHandler()
    },
    beforeUnmount() {
        e.removeComponent(this)
    },
    methods: {
        init() {
            const {src: t, loading: n, error: r} = e.valueFormatter(this.src);
            this.state.loaded = !1, this.options.src = t, this.options.error = r, this.options.loading = n, this.renderSrc = this.options.loading
        }, checkInView() {
            const t = aa(this.$el);
            return t.top < window.innerHeight * e.options.preLoad && t.bottom > 0 && t.left < window.innerWidth * e.options.preLoad && t.right > 0
        }, load(e = na) {
            if (this.state.attempt > this.options.attempt - 1 && this.state.error) return void e();
            const {src: t} = this.options;
            va({src: t}, (({src: e}) => {
                this.renderSrc = e, this.state.loaded = !0
            }), (() => {
                this.state.attempt++, this.renderSrc = this.options.error, this.state.error = !0
            }))
        }
    }
});
const Pa = {
        install(e, t = {}) {
            const n = new (Ta())(t), r = new Oa({lazy: n});
            e.config.globalProperties.$Lazyload = n, t.lazyComponent && e.component("LazyComponent", Ea(n)), t.lazyImage && e.component("LazyImage", Sa(n)), e.directive("lazy", {
                beforeMount: n.add.bind(n),
                updated: n.update.bind(n),
                unmounted: n.remove.bind(n)
            }), e.directive("lazy-container", {
                beforeMount: r.bind.bind(r),
                updated: r.update.bind(r),
                unmounted: r.unbind.bind(r)
            })
        }
    }, Aa = "undefined" != typeof window, Ra = (e, t = !1) => t ? Symbol.for(e) : Symbol(e),
    Na = (e, t, n) => Ia({l: e, k: t, s: n}),
    Ia = e => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"),
    ja = e => "number" == typeof e && isFinite(e), Da = e => "[object Date]" === Za(e),
    Ma = e => "[object RegExp]" === Za(e), za = e => Qa(e) && 0 === Object.keys(e).length;

/*!
  * shared v9.3.0-beta.14
  * (c) 2023 kazuya kawaguchi
  * Released under the MIT License.
  */
function Va(e, t) {
}

const Fa = Object.assign;
let Ua;
const Ba = () => Ua || (Ua = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {});

function Ha(e) {
    return e.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")
}

const Wa = Object.prototype.hasOwnProperty;

function qa(e, t) {
    return Wa.call(e, t)
}

const $a = Array.isArray, Ya = e => "function" == typeof e, Ka = e => "string" == typeof e,
    Ga = e => "boolean" == typeof e, Xa = e => null !== e && "object" == typeof e, Ja = Object.prototype.toString,
    Za = e => Ja.call(e), Qa = e => "[object Object]" === Za(e), eo = {
        EXPECTED_TOKEN: 1,
        INVALID_TOKEN_IN_PLACEHOLDER: 2,
        UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
        UNKNOWN_ESCAPE_SEQUENCE: 4,
        INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
        UNBALANCED_CLOSING_BRACE: 6,
        UNTERMINATED_CLOSING_BRACE: 7,
        EMPTY_PLACEHOLDER: 8,
        NOT_ALLOW_NEST_PLACEHOLDER: 9,
        INVALID_LINKED_FORMAT: 10,
        MUST_HAVE_MESSAGES_IN_PLURAL: 11,
        UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
        UNEXPECTED_EMPTY_LINKED_KEY: 13,
        UNEXPECTED_LEXICAL_ANALYSIS: 14,
        __EXTEND_POINT__: 15
    };

function to(e, t, n = {}) {
    const {domain: r, messages: i, args: a} = n, o = new SyntaxError(String(e));
    return o.code = e, t && (o.location = t), o.domain = r, o
}

function no(e) {
    throw e
}

function ro(e, t, n) {
    const r = {start: e, end: t};
    return null != n && (r.source = n), r
}

const io = " ", ao = "\r", oo = "\n", lo = String.fromCharCode(8232), so = String.fromCharCode(8233);

function co(e) {
    const t = e;
    let n = 0, r = 1, i = 1, a = 0;
    const o = e => t[e] === ao && t[e + 1] === oo, l = e => t[e] === so, s = e => t[e] === lo,
        c = e => o(e) || (e => t[e] === oo)(e) || l(e) || s(e), u = e => o(e) || l(e) || s(e) ? oo : t[e];

    function p() {
        return a = 0, c(n) && (r++, i = 0), o(n) && n++, n++, i++, t[n]
    }

    return {
        index: () => n,
        line: () => r,
        column: () => i,
        peekOffset: () => a,
        charAt: u,
        currentChar: () => u(n),
        currentPeek: () => u(n + a),
        next: p,
        peek: function () {
            return o(n + a) && a++, a++, t[n + a]
        },
        reset: function () {
            n = 0, r = 1, i = 1, a = 0
        },
        resetPeek: function (e = 0) {
            a = e
        },
        skipToPeek: function () {
            const e = n + a;
            for (; e !== n;) p();
            a = 0
        }
    }
}

const uo = void 0, po = "'", fo = "tokenizer";

function go(e, t = {}) {
    const n = !1 !== t.location, r = co(e), i = () => r.index(), a = () => {
        return e = r.line(), t = r.column(), n = r.index(), {line: e, column: t, offset: n};
        var e, t, n
    }, o = a(), l = i(), s = {
        currentType: 14,
        offset: l,
        startLoc: o,
        endLoc: o,
        lastType: 14,
        lastOffset: l,
        lastStartLoc: o,
        lastEndLoc: o,
        braceNest: 0,
        inLinked: !1,
        text: ""
    }, c = () => s, {onError: u} = t;

    function p(e, t, n, ...r) {
        const i = c();
        if (t.column += n, t.offset += n, u) {
            const n = to(e, ro(i.startLoc, t), {domain: fo, args: r});
            u(n)
        }
    }

    function d(e, t, r) {
        e.endLoc = a(), e.currentType = t;
        const i = {type: t};
        return n && (i.loc = ro(e.startLoc, e.endLoc)), null != r && (i.value = r), i
    }

    const f = e => d(e, 14);

    function g(e, t) {
        return e.currentChar() === t ? (e.next(), t) : (p(eo.EXPECTED_TOKEN, a(), 0, t), "")
    }

    function h(e) {
        let t = "";
        for (; e.currentPeek() === io || e.currentPeek() === oo;) t += e.currentPeek(), e.peek();
        return t
    }

    function y(e) {
        const t = h(e);
        return e.skipToPeek(), t
    }

    function m(e) {
        if (e === uo) return !1;
        const t = e.charCodeAt(0);
        return t >= 97 && t <= 122 || t >= 65 && t <= 90 || 95 === t
    }

    function v(e, t) {
        const {currentType: n} = t;
        if (2 !== n) return !1;
        h(e);
        const r = function (e) {
            if (e === uo) return !1;
            const t = e.charCodeAt(0);
            return t >= 48 && t <= 57
        }("-" === e.currentPeek() ? e.peek() : e.currentPeek());
        return e.resetPeek(), r
    }

    function x(e) {
        h(e);
        const t = "|" === e.currentPeek();
        return e.resetPeek(), t
    }

    function b(e, t = !0) {
        const n = (t = !1, r = "", i = !1) => {
            const a = e.currentPeek();
            return "{" === a ? "%" !== r && t : "@" !== a && a ? "%" === a ? (e.peek(), n(t, "%", !0)) : "|" === a ? !("%" !== r && !i) || !(r === io || r === oo) : a === io ? (e.peek(), n(!0, io, i)) : a !== oo || (e.peek(), n(!0, oo, i)) : "%" === r || t
        }, r = n();
        return t && e.resetPeek(), r
    }

    function k(e, t) {
        const n = e.currentChar();
        return n === uo ? uo : t(n) ? (e.next(), n) : null
    }

    function w(e) {
        return k(e, (e => {
            const t = e.charCodeAt(0);
            return t >= 97 && t <= 122 || t >= 65 && t <= 90 || t >= 48 && t <= 57 || 95 === t || 36 === t
        }))
    }

    function _(e) {
        return k(e, (e => {
            const t = e.charCodeAt(0);
            return t >= 48 && t <= 57
        }))
    }

    function T(e) {
        return k(e, (e => {
            const t = e.charCodeAt(0);
            return t >= 48 && t <= 57 || t >= 65 && t <= 70 || t >= 97 && t <= 102
        }))
    }

    function E(e) {
        let t = "", n = "";
        for (; t = _(e);) n += t;
        return n
    }

    function C(e) {
        let t = "";
        for (; ;) {
            const n = e.currentChar();
            if ("{" === n || "}" === n || "@" === n || "|" === n || !n) break;
            if ("%" === n) {
                if (!b(e)) break;
                t += n, e.next()
            } else if (n === io || n === oo) if (b(e)) t += n, e.next(); else {
                if (x(e)) break;
                t += n, e.next()
            } else t += n, e.next()
        }
        return t
    }

    function L(e) {
        const t = e.currentChar();
        switch (t) {
            case"\\":
            case"'":
                return e.next(), `\\${t}`;
            case"u":
                return O(e, t, 4);
            case"U":
                return O(e, t, 6);
            default:
                return p(eo.UNKNOWN_ESCAPE_SEQUENCE, a(), 0, t), ""
        }
    }

    function O(e, t, n) {
        g(e, t);
        let r = "";
        for (let i = 0; i < n; i++) {
            const n = T(e);
            if (!n) {
                p(eo.INVALID_UNICODE_ESCAPE_SEQUENCE, a(), 0, `\\${t}${r}${e.currentChar()}`);
                break
            }
            r += n
        }
        return `\\${t}${r}`
    }

    function S(e) {
        y(e);
        const t = g(e, "|");
        return y(e), t
    }

    function P(e, t) {
        let n = null;
        switch (e.currentChar()) {
            case"{":
                return t.braceNest >= 1 && p(eo.NOT_ALLOW_NEST_PLACEHOLDER, a(), 0), e.next(), n = d(t, 2, "{"), y(e), t.braceNest++, n;
            case"}":
                return t.braceNest > 0 && 2 === t.currentType && p(eo.EMPTY_PLACEHOLDER, a(), 0), e.next(), n = d(t, 3, "}"), t.braceNest--, t.braceNest > 0 && y(e), t.inLinked && 0 === t.braceNest && (t.inLinked = !1), n;
            case"@":
                return t.braceNest > 0 && p(eo.UNTERMINATED_CLOSING_BRACE, a(), 0), n = A(e, t) || f(t), t.braceNest = 0, n;
            default:
                let r = !0, i = !0, o = !0;
                if (x(e)) return t.braceNest > 0 && p(eo.UNTERMINATED_CLOSING_BRACE, a(), 0), n = d(t, 1, S(e)), t.braceNest = 0, t.inLinked = !1, n;
                if (t.braceNest > 0 && (5 === t.currentType || 6 === t.currentType || 7 === t.currentType)) return p(eo.UNTERMINATED_CLOSING_BRACE, a(), 0), t.braceNest = 0, R(e, t);
                if (r = function (e, t) {
                    const {currentType: n} = t;
                    if (2 !== n) return !1;
                    h(e);
                    const r = m(e.currentPeek());
                    return e.resetPeek(), r
                }(e, t)) return n = d(t, 5, function (e) {
                    y(e);
                    let t = "", n = "";
                    for (; t = w(e);) n += t;
                    return e.currentChar() === uo && p(eo.UNTERMINATED_CLOSING_BRACE, a(), 0), n
                }(e)), y(e), n;
                if (i = v(e, t)) return n = d(t, 6, function (e) {
                    y(e);
                    let t = "";
                    return "-" === e.currentChar() ? (e.next(), t += `-${E(e)}`) : t += E(e), e.currentChar() === uo && p(eo.UNTERMINATED_CLOSING_BRACE, a(), 0), t
                }(e)), y(e), n;
                if (o = function (e, t) {
                    const {currentType: n} = t;
                    if (2 !== n) return !1;
                    h(e);
                    const r = e.currentPeek() === po;
                    return e.resetPeek(), r
                }(e, t)) return n = d(t, 7, function (e) {
                    y(e), g(e, "'");
                    let t = "", n = "";
                    const r = e => e !== po && e !== oo;
                    for (; t = k(e, r);) n += "\\" === t ? L(e) : t;
                    const i = e.currentChar();
                    return i === oo || i === uo ? (p(eo.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, a(), 0), i === oo && (e.next(), g(e, "'")), n) : (g(e, "'"), n)
                }(e)), y(e), n;
                if (!r && !i && !o) return n = d(t, 13, function (e) {
                    y(e);
                    let t = "", n = "";
                    const r = e => "{" !== e && "}" !== e && e !== io && e !== oo;
                    for (; t = k(e, r);) n += t;
                    return n
                }(e)), p(eo.INVALID_TOKEN_IN_PLACEHOLDER, a(), 0, n.value), y(e), n
        }
        return n
    }

    function A(e, t) {
        const {currentType: n} = t;
        let r = null;
        const i = e.currentChar();
        switch (8 !== n && 9 !== n && 12 !== n && 10 !== n || i !== oo && i !== io || p(eo.INVALID_LINKED_FORMAT, a(), 0), i) {
            case"@":
                return e.next(), r = d(t, 8, "@"), t.inLinked = !0, r;
            case".":
                return y(e), e.next(), d(t, 9, ".");
            case":":
                return y(e), e.next(), d(t, 10, ":");
            default:
                return x(e) ? (r = d(t, 1, S(e)), t.braceNest = 0, t.inLinked = !1, r) : function (e, t) {
                    const {currentType: n} = t;
                    if (8 !== n) return !1;
                    h(e);
                    const r = "." === e.currentPeek();
                    return e.resetPeek(), r
                }(e, t) || function (e, t) {
                    const {currentType: n} = t;
                    if (8 !== n && 12 !== n) return !1;
                    h(e);
                    const r = ":" === e.currentPeek();
                    return e.resetPeek(), r
                }(e, t) ? (y(e), A(e, t)) : function (e, t) {
                    const {currentType: n} = t;
                    if (9 !== n) return !1;
                    h(e);
                    const r = m(e.currentPeek());
                    return e.resetPeek(), r
                }(e, t) ? (y(e), d(t, 12, function (e) {
                    let t = "", n = "";
                    for (; t = w(e);) n += t;
                    return n
                }(e))) : function (e, t) {
                    const {currentType: n} = t;
                    if (10 !== n) return !1;
                    const r = () => {
                        const t = e.currentPeek();
                        return "{" === t ? m(e.peek()) : !("@" === t || "%" === t || "|" === t || ":" === t || "." === t || t === io || !t) && (t === oo ? (e.peek(), r()) : m(t))
                    }, i = r();
                    return e.resetPeek(), i
                }(e, t) ? (y(e), "{" === i ? P(e, t) || r : d(t, 11, function (e) {
                    const t = (n = !1, r) => {
                        const i = e.currentChar();
                        return "{" !== i && "%" !== i && "@" !== i && "|" !== i && i ? i === io ? r : i === oo ? (r += i, e.next(), t(n, r)) : (r += i, e.next(), t(!0, r)) : r
                    };
                    return t(!1, "")
                }(e))) : (8 === n && p(eo.INVALID_LINKED_FORMAT, a(), 0), t.braceNest = 0, t.inLinked = !1, R(e, t))
        }
    }

    function R(e, t) {
        let n = {type: 14};
        if (t.braceNest > 0) return P(e, t) || f(t);
        if (t.inLinked) return A(e, t) || f(t);
        switch (e.currentChar()) {
            case"{":
                return P(e, t) || f(t);
            case"}":
                return p(eo.UNBALANCED_CLOSING_BRACE, a(), 0), e.next(), d(t, 3, "}");
            case"@":
                return A(e, t) || f(t);
            default:
                if (x(e)) return n = d(t, 1, S(e)), t.braceNest = 0, t.inLinked = !1, n;
                const {isModulo: r, hasSpace: i} = function (e) {
                    const t = h(e), n = "%" === e.currentPeek() && "{" === e.peek();
                    return e.resetPeek(), {isModulo: n, hasSpace: t.length > 0}
                }(e);
                if (r) return i ? d(t, 0, C(e)) : d(t, 4, function (e) {
                    y(e);
                    const t = e.currentChar();
                    return "%" !== t && p(eo.EXPECTED_TOKEN, a(), 0, t), e.next(), "%"
                }(e));
                if (b(e)) return d(t, 0, C(e))
        }
        return n
    }

    return {
        nextToken: function () {
            const {currentType: e, offset: t, startLoc: n, endLoc: o} = s;
            return s.lastType = e, s.lastOffset = t, s.lastStartLoc = n, s.lastEndLoc = o, s.offset = i(), s.startLoc = a(), r.currentChar() === uo ? d(s, 14) : R(r, s)
        }, currentOffset: i, currentPosition: a, context: c
    }
}

const ho = "parser", yo = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;

function mo(e, t, n) {
    switch (e) {
        case"\\\\":
            return "\\";
        case"\\'":
            return "'";
        default: {
            const e = parseInt(t || n, 16);
            return e <= 55295 || e >= 57344 ? String.fromCodePoint(e) : "�"
        }
    }
}

function vo(e = {}) {
    const t = !1 !== e.location, {onError: n} = e;

    function r(e, t, r, i, ...a) {
        const o = e.currentPosition();
        if (o.offset += i, o.column += i, n) {
            const e = to(t, ro(r, o), {domain: ho, args: a});
            n(e)
        }
    }

    function i(e, n, r) {
        const i = {type: e, start: n, end: n};
        return t && (i.loc = {start: r, end: r}), i
    }

    function a(e, n, r, i) {
        e.end = n, i && (e.type = i), t && e.loc && (e.loc.end = r)
    }

    function o(e, t) {
        const n = e.context(), r = i(3, n.offset, n.startLoc);
        return r.value = t, a(r, e.currentOffset(), e.currentPosition()), r
    }

    function l(e, t) {
        const n = e.context(), {lastOffset: r, lastStartLoc: o} = n, l = i(5, r, o);
        return l.index = parseInt(t, 10), e.nextToken(), a(l, e.currentOffset(), e.currentPosition()), l
    }

    function s(e, t) {
        const n = e.context(), {lastOffset: r, lastStartLoc: o} = n, l = i(4, r, o);
        return l.key = t, e.nextToken(), a(l, e.currentOffset(), e.currentPosition()), l
    }

    function c(e, t) {
        const n = e.context(), {lastOffset: r, lastStartLoc: o} = n, l = i(9, r, o);
        return l.value = t.replace(yo, mo), e.nextToken(), a(l, e.currentOffset(), e.currentPosition()), l
    }

    function u(e) {
        const t = e.context(), n = i(6, t.offset, t.startLoc);
        let o = e.nextToken();
        if (9 === o.type) {
            const t = function (e) {
                const t = e.nextToken(), n = e.context(), {lastOffset: o, lastStartLoc: l} = n, s = i(8, o, l);
                return 12 !== t.type ? (r(e, eo.UNEXPECTED_EMPTY_LINKED_MODIFIER, n.lastStartLoc, 0), s.value = "", a(s, o, l), {
                    nextConsumeToken: t,
                    node: s
                }) : (null == t.value && r(e, eo.UNEXPECTED_LEXICAL_ANALYSIS, n.lastStartLoc, 0, xo(t)), s.value = t.value || "", a(s, e.currentOffset(), e.currentPosition()), {node: s})
            }(e);
            n.modifier = t.node, o = t.nextConsumeToken || e.nextToken()
        }
        switch (10 !== o.type && r(e, eo.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, xo(o)), o = e.nextToken(), 2 === o.type && (o = e.nextToken()), o.type) {
            case 11:
                null == o.value && r(e, eo.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, xo(o)), n.key = function (e, t) {
                    const n = e.context(), r = i(7, n.offset, n.startLoc);
                    return r.value = t, a(r, e.currentOffset(), e.currentPosition()), r
                }(e, o.value || "");
                break;
            case 5:
                null == o.value && r(e, eo.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, xo(o)), n.key = s(e, o.value || "");
                break;
            case 6:
                null == o.value && r(e, eo.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, xo(o)), n.key = l(e, o.value || "");
                break;
            case 7:
                null == o.value && r(e, eo.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, xo(o)), n.key = c(e, o.value || "");
                break;
            default:
                r(e, eo.UNEXPECTED_EMPTY_LINKED_KEY, t.lastStartLoc, 0);
                const u = e.context(), p = i(7, u.offset, u.startLoc);
                return p.value = "", a(p, u.offset, u.startLoc), n.key = p, a(n, u.offset, u.startLoc), {
                    nextConsumeToken: o,
                    node: n
                }
        }
        return a(n, e.currentOffset(), e.currentPosition()), {node: n}
    }

    function p(e) {
        const t = e.context(),
            n = i(2, 1 === t.currentType ? e.currentOffset() : t.offset, 1 === t.currentType ? t.endLoc : t.startLoc);
        n.items = [];
        let p = null;
        do {
            const i = p || e.nextToken();
            switch (p = null, i.type) {
                case 0:
                    null == i.value && r(e, eo.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, xo(i)), n.items.push(o(e, i.value || ""));
                    break;
                case 6:
                    null == i.value && r(e, eo.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, xo(i)), n.items.push(l(e, i.value || ""));
                    break;
                case 5:
                    null == i.value && r(e, eo.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, xo(i)), n.items.push(s(e, i.value || ""));
                    break;
                case 7:
                    null == i.value && r(e, eo.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, xo(i)), n.items.push(c(e, i.value || ""));
                    break;
                case 8:
                    const a = u(e);
                    n.items.push(a.node), p = a.nextConsumeToken || null
            }
        } while (14 !== t.currentType && 1 !== t.currentType);
        return a(n, 1 === t.currentType ? t.lastOffset : e.currentOffset(), 1 === t.currentType ? t.lastEndLoc : e.currentPosition()), n
    }

    function d(e) {
        const t = e.context(), {offset: n, startLoc: o} = t, l = p(e);
        return 14 === t.currentType ? l : function (e, t, n, o) {
            const l = e.context();
            let s = 0 === o.items.length;
            const c = i(1, t, n);
            c.cases = [], c.cases.push(o);
            do {
                const t = p(e);
                s || (s = 0 === t.items.length), c.cases.push(t)
            } while (14 !== l.currentType);
            return s && r(e, eo.MUST_HAVE_MESSAGES_IN_PLURAL, n, 0), a(c, e.currentOffset(), e.currentPosition()), c
        }(e, n, o, l)
    }

    return {
        parse: function (n) {
            const o = go(n, Fa({}, e)), l = o.context(), s = i(0, l.offset, l.startLoc);
            return t && s.loc && (s.loc.source = n), s.body = d(o), 14 !== l.currentType && r(o, eo.UNEXPECTED_LEXICAL_ANALYSIS, l.lastStartLoc, 0, n[l.offset] || ""), a(s, o.currentOffset(), o.currentPosition()), s
        }
    }
}

function xo(e) {
    if (14 === e.type) return "EOF";
    const t = (e.value || "").replace(/\r?\n/gu, "\\n");
    return t.length > 10 ? t.slice(0, 9) + "…" : t
}

function bo(e, t) {
    for (let n = 0; n < e.length; n++) ko(e[n], t)
}

function ko(e, t) {
    switch (e.type) {
        case 1:
            bo(e.cases, t), t.helper("plural");
            break;
        case 2:
            bo(e.items, t);
            break;
        case 6:
            ko(e.key, t), t.helper("linked"), t.helper("type");
            break;
        case 5:
            t.helper("interpolate"), t.helper("list");
            break;
        case 4:
            t.helper("interpolate"), t.helper("named")
    }
}

function wo(e, t = {}) {
    const n = function (e, t = {}) {
        const n = {ast: e, helpers: new Set};
        return {context: () => n, helper: e => (n.helpers.add(e), e)}
    }(e);
    n.helper("normalize"), e.body && ko(e.body, n);
    const r = n.context();
    e.helpers = Array.from(r.helpers)
}

function _o(e, t) {
    const {helper: n} = e;
    switch (t.type) {
        case 0:
            !function (e, t) {
                t.body ? _o(e, t.body) : e.push("null")
            }(e, t);
            break;
        case 1:
            !function (e, t) {
                const {helper: n, needIndent: r} = e;
                if (t.cases.length > 1) {
                    e.push(`${n("plural")}([`), e.indent(r());
                    const i = t.cases.length;
                    for (let n = 0; n < i && (_o(e, t.cases[n]), n !== i - 1); n++) e.push(", ");
                    e.deindent(r()), e.push("])")
                }
            }(e, t);
            break;
        case 2:
            !function (e, t) {
                const {helper: n, needIndent: r} = e;
                e.push(`${n("normalize")}([`), e.indent(r());
                const i = t.items.length;
                for (let a = 0; a < i && (_o(e, t.items[a]), a !== i - 1); a++) e.push(", ");
                e.deindent(r()), e.push("])")
            }(e, t);
            break;
        case 6:
            !function (e, t) {
                const {helper: n} = e;
                e.push(`${n("linked")}(`), _o(e, t.key), t.modifier ? (e.push(", "), _o(e, t.modifier), e.push(", _type")) : e.push(", undefined, _type"), e.push(")")
            }(e, t);
            break;
        case 8:
        case 7:
        case 9:
        case 3:
            e.push(JSON.stringify(t.value), t);
            break;
        case 5:
            e.push(`${n("interpolate")}(${n("list")}(${t.index}))`, t);
            break;
        case 4:
            e.push(`${n("interpolate")}(${n("named")}(${JSON.stringify(t.key)}))`, t)
    }
}

const To = (e, t = {}) => {
    const n = Ka(t.mode) ? t.mode : "normal", r = Ka(t.filename) ? t.filename : "message.intl", i = !!t.sourceMap,
        a = null != t.breakLineCode ? t.breakLineCode : "arrow" === n ? ";" : "\n",
        o = t.needIndent ? t.needIndent : "arrow" !== n, l = e.helpers || [], s = function (e, t) {
            const {sourceMap: n, filename: r, breakLineCode: i, needIndent: a} = t, o = {
                source: e.loc.source,
                filename: r,
                code: "",
                column: 1,
                line: 1,
                offset: 0,
                map: void 0,
                breakLineCode: i,
                needIndent: a,
                indentLevel: 0
            };

            function l(e, t) {
                o.code += e
            }

            function s(e, t = !0) {
                const n = t ? i : "";
                l(a ? n + "  ".repeat(e) : n)
            }

            return {
                context: () => o, push: l, indent: function (e = !0) {
                    const t = ++o.indentLevel;
                    e && s(t)
                }, deindent: function (e = !0) {
                    const t = --o.indentLevel;
                    e && s(t)
                }, newline: function () {
                    s(o.indentLevel)
                }, helper: e => `_${e}`, needIndent: () => o.needIndent
            }
        }(e, {mode: n, filename: r, sourceMap: i, breakLineCode: a, needIndent: o});
    s.push("normal" === n ? "function __msg__ (ctx) {" : "(ctx) => {"), s.indent(o), l.length > 0 && (s.push(`const { ${l.map((e => `${e}: _${e}`)).join(", ")} } = ctx`), s.newline()), s.push("return "), _o(s, e), s.deindent(o), s.push("}");
    const {code: c, map: u} = s.context();
    return {ast: e, code: c, map: u ? u.toJSON() : void 0}
};
/*!
  * devtools-if v9.3.0-beta.14
  * (c) 2023 kazuya kawaguchi
  * Released under the MIT License.
  */
const Eo = {I18nInit: "i18n:init", FunctionTranslate: "function:translate"}, Co = [];
/*!
  * core-base v9.3.0-beta.14
  * (c) 2023 kazuya kawaguchi
  * Released under the MIT License.
  */
Co[0] = {w: [0], i: [3, 0], "[": [4], o: [7]}, Co[1] = {w: [1], ".": [2], "[": [4], o: [7]}, Co[2] = {
    w: [2],
    i: [3, 0],
    0: [3, 0]
}, Co[3] = {i: [3, 0], 0: [3, 0], w: [1, 1], ".": [2, 1], "[": [4, 1], o: [7, 1]}, Co[4] = {
    "'": [5, 0],
    '"': [6, 0],
    "[": [4, 2],
    "]": [1, 3],
    o: 8,
    l: [4, 0]
}, Co[5] = {"'": [4, 0], o: 8, l: [5, 0]}, Co[6] = {'"': [4, 0], o: 8, l: [6, 0]};
const Lo = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;

function Oo(e) {
    if (null == e) return "o";
    switch (e.charCodeAt(0)) {
        case 91:
        case 93:
        case 46:
        case 34:
        case 39:
            return e;
        case 95:
        case 36:
        case 45:
            return "i";
        case 9:
        case 10:
        case 13:
        case 160:
        case 65279:
        case 8232:
        case 8233:
            return "w"
    }
    return "i"
}

function So(e) {
    const t = e.trim();
    return ("0" !== e.charAt(0) || !isNaN(parseInt(e))) && (n = t, Lo.test(n) ? function (e) {
        const t = e.charCodeAt(0);
        return t !== e.charCodeAt(e.length - 1) || 34 !== t && 39 !== t ? e : e.slice(1, -1)
    }(t) : "*" + t);
    var n
}

const Po = new Map;

function Ao(e, t) {
    return Xa(e) ? e[t] : null
}

const Ro = e => e, No = e => "", Io = "text", jo = e => 0 === e.length ? "" : e.join(""),
    Do = e => null == e ? "" : $a(e) || Qa(e) && e.toString === Ja ? JSON.stringify(e, null, 2) : String(e);

function Mo(e, t) {
    return e = Math.abs(e), 2 === t ? e ? e > 1 ? 1 : 0 : 1 : e ? Math.min(e, 2) : 0
}

function zo(e = {}) {
    const t = e.locale, n = function (e) {
            const t = ja(e.pluralIndex) ? e.pluralIndex : -1;
            return e.named && (ja(e.named.count) || ja(e.named.n)) ? ja(e.named.count) ? e.named.count : ja(e.named.n) ? e.named.n : t : t
        }(e), r = Xa(e.pluralRules) && Ka(t) && Ya(e.pluralRules[t]) ? e.pluralRules[t] : Mo,
        i = Xa(e.pluralRules) && Ka(t) && Ya(e.pluralRules[t]) ? Mo : void 0, a = e.list || [], o = e.named || {};
    ja(e.pluralIndex) && function (e, t) {
        t.count || (t.count = e), t.n || (t.n = e)
    }(n, o);

    function l(t) {
        const n = Ya(e.messages) ? e.messages(t) : !!Xa(e.messages) && e.messages[t];
        return n || (e.parent ? e.parent.message(t) : No)
    }

    const s = Qa(e.processor) && Ya(e.processor.normalize) ? e.processor.normalize : jo,
        c = Qa(e.processor) && Ya(e.processor.interpolate) ? e.processor.interpolate : Do, u = {
            list: e => a[e],
            named: e => o[e],
            plural: e => e[r(n, e.length, i)],
            linked: (t, ...n) => {
                const [r, i] = n;
                let a = "text", o = "";
                1 === n.length ? Xa(r) ? (o = r.modifier || o, a = r.type || a) : Ka(r) && (o = r || o) : 2 === n.length && (Ka(r) && (o = r || o), Ka(i) && (a = i || a));
                let s = l(t)(u);
                return "vnode" === a && $a(s) && o && (s = s[0]), o ? (c = o, e.modifiers ? e.modifiers[c] : Ro)(s, a) : s;
                var c
            },
            message: l,
            type: Qa(e.processor) && Ka(e.processor.type) ? e.processor.type : Io,
            interpolate: c,
            normalize: s
        };
    return u
}

let Vo = null;
const Fo = Uo(Eo.FunctionTranslate);

function Uo(e) {
    return t => Vo && Vo.emit(e, t)
}

function Bo(e, t, n) {
    return [...new Set([n, ...$a(t) ? t : Xa(t) ? Object.keys(t) : Ka(t) ? [t] : [n]])]
}

function Ho(e, t, n) {
    const r = Ka(n) ? n : Go, i = e;
    i.__localeChainCache || (i.__localeChainCache = new Map);
    let a = i.__localeChainCache.get(r);
    if (!a) {
        a = [];
        let e = [n];
        for (; $a(e);) e = Wo(a, e, t);
        const o = $a(t) || !Qa(t) ? t : t.default ? t.default : null;
        e = Ka(o) ? [o] : o, $a(e) && Wo(a, e, !1), i.__localeChainCache.set(r, a)
    }
    return a
}

function Wo(e, t, n) {
    let r = !0;
    for (let i = 0; i < t.length && Ga(r); i++) {
        const a = t[i];
        Ka(a) && (r = qo(e, t[i], n))
    }
    return r
}

function qo(e, t, n) {
    let r;
    const i = t.split("-");
    do {
        r = $o(e, i.join("-"), n), i.splice(-1, 1)
    } while (i.length && !0 === r);
    return r
}

function $o(e, t, n) {
    let r = !1;
    if (!e.includes(t) && (r = !0, t)) {
        r = "!" !== t[t.length - 1];
        const i = t.replace(/!/g, "");
        e.push(i), ($a(n) || Qa(n)) && n[i] && (r = n[i])
    }
    return r
}

const Yo = "9.3.0-beta.14", Ko = -1, Go = "en-US", Xo = "",
    Jo = e => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
let Zo, Qo, el;
let tl = null;
const nl = e => {
    tl = e
}, rl = () => tl;
let il = null;
const al = e => {
    il = e
}, ol = () => il;
let ll = 0;

function sl(e = {}) {
    const t = Ka(e.version) ? e.version : Yo, n = Ka(e.locale) ? e.locale : Go,
        r = $a(e.fallbackLocale) || Qa(e.fallbackLocale) || Ka(e.fallbackLocale) || !1 === e.fallbackLocale ? e.fallbackLocale : n,
        i = Qa(e.messages) ? e.messages : {[n]: {}}, a = Qa(e.datetimeFormats) ? e.datetimeFormats : {[n]: {}},
        o = Qa(e.numberFormats) ? e.numberFormats : {[n]: {}}, l = Fa({}, e.modifiers || {}, {
            upper: (e, t) => "text" === t && Ka(e) ? e.toUpperCase() : "vnode" === t && Xa(e) && "__v_isVNode" in e ? e.children.toUpperCase() : e,
            lower: (e, t) => "text" === t && Ka(e) ? e.toLowerCase() : "vnode" === t && Xa(e) && "__v_isVNode" in e ? e.children.toLowerCase() : e,
            capitalize: (e, t) => "text" === t && Ka(e) ? Jo(e) : "vnode" === t && Xa(e) && "__v_isVNode" in e ? Jo(e.children) : e
        }), s = e.pluralRules || {}, c = Ya(e.missing) ? e.missing : null,
        u = !Ga(e.missingWarn) && !Ma(e.missingWarn) || e.missingWarn,
        p = !Ga(e.fallbackWarn) && !Ma(e.fallbackWarn) || e.fallbackWarn, d = !!e.fallbackFormat, f = !!e.unresolving,
        g = Ya(e.postTranslation) ? e.postTranslation : null, h = Qa(e.processor) ? e.processor : null,
        y = !Ga(e.warnHtmlMessage) || e.warnHtmlMessage, m = !!e.escapeParameter,
        v = Ya(e.messageCompiler) ? e.messageCompiler : Zo, x = Ya(e.messageResolver) ? e.messageResolver : Qo || Ao,
        b = Ya(e.localeFallbacker) ? e.localeFallbacker : el || Bo,
        k = Xa(e.fallbackContext) ? e.fallbackContext : void 0, w = Ya(e.onWarn) ? e.onWarn : Va, _ = e,
        T = Xa(_.__datetimeFormatters) ? _.__datetimeFormatters : new Map,
        E = Xa(_.__numberFormatters) ? _.__numberFormatters : new Map, C = Xa(_.__meta) ? _.__meta : {};
    ll++;
    const L = {
        version: t,
        cid: ll,
        locale: n,
        fallbackLocale: r,
        messages: i,
        modifiers: l,
        pluralRules: s,
        missing: c,
        missingWarn: u,
        fallbackWarn: p,
        fallbackFormat: d,
        unresolving: f,
        postTranslation: g,
        processor: h,
        warnHtmlMessage: y,
        escapeParameter: m,
        messageCompiler: v,
        messageResolver: x,
        localeFallbacker: b,
        fallbackContext: k,
        onWarn: w,
        __meta: C
    };
    return L.datetimeFormats = a, L.numberFormats = o, L.__datetimeFormatters = T, L.__numberFormatters = E, __INTLIFY_PROD_DEVTOOLS__ && function (e, t, n) {
        Vo && Vo.emit(Eo.I18nInit, {timestamp: Date.now(), i18n: e, version: t, meta: n})
    }(L, t, C), L
}

function cl(e, t, n, r, i) {
    const {missing: a, onWarn: o} = e;
    if (null !== a) {
        const r = a(e, n, t, i);
        return Ka(r) ? r : t
    }
    return t
}

function ul(e, t, n) {
    e.__localeChainCache = new Map, e.localeFallbacker(e, n, t)
}

const pl = e => e;
let dl = Object.create(null);
let fl = eo.__EXTEND_POINT__;
const gl = () => ++fl,
    hl = {INVALID_ARGUMENT: fl, INVALID_DATE_ARGUMENT: gl(), INVALID_ISO_DATE_ARGUMENT: gl(), __EXTEND_POINT__: gl()};

function yl(e) {
    return to(e, null, void 0)
}

const ml = () => "", vl = e => Ya(e);

function xl(e, ...t) {
    const {
            fallbackFormat: n,
            postTranslation: r,
            unresolving: i,
            messageCompiler: a,
            fallbackLocale: o,
            messages: l
        } = e, [s, c] = wl(...t), u = Ga(c.missingWarn) ? c.missingWarn : e.missingWarn,
        p = Ga(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn,
        d = Ga(c.escapeParameter) ? c.escapeParameter : e.escapeParameter, f = !!c.resolvedMessage,
        g = Ka(c.default) || Ga(c.default) ? Ga(c.default) ? a ? s : () => s : c.default : n ? a ? s : () => s : "",
        h = n || "" !== g, y = Ka(c.locale) ? c.locale : e.locale;
    d && function (e) {
        $a(e.list) ? e.list = e.list.map((e => Ka(e) ? Ha(e) : e)) : Xa(e.named) && Object.keys(e.named).forEach((t => {
            Ka(e.named[t]) && (e.named[t] = Ha(e.named[t]))
        }))
    }(c);
    let [m, v, x] = f ? [s, y, l[y] || {}] : bl(e, s, y, o, p, u), b = m, k = s;
    if (f || Ka(b) || vl(b) || h && (b = g, k = b), !(f || (Ka(b) || vl(b)) && Ka(v))) return i ? Ko : s;
    let w = !1;
    const _ = vl(b) ? b : kl(e, s, v, b, k, (() => {
        w = !0
    }));
    if (w) return b;
    const T = function (e, t, n, r) {
        const {
            modifiers: i,
            pluralRules: a,
            messageResolver: o,
            fallbackLocale: l,
            fallbackWarn: s,
            missingWarn: c,
            fallbackContext: u
        } = e, p = r => {
            let i = o(n, r);
            if (null == i && u) {
                const [, , e] = bl(u, r, t, l, s, c);
                i = o(e, r)
            }
            if (Ka(i)) {
                let n = !1;
                const a = kl(e, r, t, i, r, (() => {
                    n = !0
                }));
                return n ? ml : a
            }
            return vl(i) ? i : ml
        }, d = {locale: t, modifiers: i, pluralRules: a, messages: p};
        e.processor && (d.processor = e.processor);
        r.list && (d.list = r.list);
        r.named && (d.named = r.named);
        ja(r.plural) && (d.pluralIndex = r.plural);
        return d
    }(e, v, x, c), E = function (e, t, n) {
        const r = t(n);
        return r
    }(0, _, zo(T)), C = r ? r(E, s) : E;
    if (__INTLIFY_PROD_DEVTOOLS__) {
        const t = {
            timestamp: Date.now(),
            key: Ka(s) ? s : vl(b) ? b.key : "",
            locale: v || (vl(b) ? b.locale : ""),
            format: Ka(b) ? b : vl(b) ? b.source : "",
            message: C
        };
        t.meta = Fa({}, e.__meta, rl() || {}), Fo(t)
    }
    return C
}

function bl(e, t, n, r, i, a) {
    const {messages: o, onWarn: l, messageResolver: s, localeFallbacker: c} = e, u = c(e, r, n);
    let p, d = {}, f = null;
    for (let g = 0; g < u.length && (p = u[g], d = o[p] || {}, null === (f = s(d, t)) && (f = d[t]), !Ka(f) && !Ya(f)); g++) {
        const n = cl(e, t, p, 0, "translate");
        n !== t && (f = n)
    }
    return [f, p, d]
}

function kl(e, t, n, r, i, a) {
    const {messageCompiler: o, warnHtmlMessage: l} = e;
    if (vl(r)) {
        const e = r;
        return e.locale = e.locale || n, e.key = e.key || t, e
    }
    if (null == o) {
        const e = () => r;
        return e.locale = n, e.key = t, e
    }
    const s = o(r, function (e, t, n, r, i, a) {
        return {
            warnHtmlMessage: i, onError: e => {
                throw a && a(e), e
            }, onCacheKey: e => Na(t, n, e)
        }
    }(0, n, i, 0, l, a));
    return s.locale = n, s.key = t, s.source = r, s
}

function wl(...e) {
    const [t, n, r] = e, i = {};
    if (!Ka(t) && !ja(t) && !vl(t)) throw yl(hl.INVALID_ARGUMENT);
    const a = ja(t) ? String(t) : (vl(t), t);
    return ja(n) ? i.plural = n : Ka(n) ? i.default = n : Qa(n) && !za(n) ? i.named = n : $a(n) && (i.list = n), ja(r) ? i.plural = r : Ka(r) ? i.default = r : Qa(r) && Fa(i, r), [a, i]
}

function _l(e, ...t) {
    const {
        datetimeFormats: n,
        unresolving: r,
        fallbackLocale: i,
        onWarn: a,
        localeFallbacker: o
    } = e, {__datetimeFormatters: l} = e, [s, c, u, p] = El(...t);
    Ga(u.missingWarn) ? u.missingWarn : e.missingWarn;
    Ga(u.fallbackWarn) ? u.fallbackWarn : e.fallbackWarn;
    const d = !!u.part, f = Ka(u.locale) ? u.locale : e.locale, g = o(e, i, f);
    if (!Ka(s) || "" === s) return new Intl.DateTimeFormat(f, p).format(c);
    let h, y = {}, m = null;
    for (let b = 0; b < g.length && (h = g[b], y = n[h] || {}, m = y[s], !Qa(m)); b++) cl(e, s, h, 0, "datetime format");
    if (!Qa(m) || !Ka(h)) return r ? Ko : s;
    let v = `${h}__${s}`;
    za(p) || (v = `${v}__${JSON.stringify(p)}`);
    let x = l.get(v);
    return x || (x = new Intl.DateTimeFormat(h, Fa({}, m, p)), l.set(v, x)), d ? x.formatToParts(c) : x.format(c)
}

const Tl = ["localeMatcher", "weekday", "era", "year", "month", "day", "hour", "minute", "second", "timeZoneName", "formatMatcher", "hour12", "timeZone", "dateStyle", "timeStyle", "calendar", "dayPeriod", "numberingSystem", "hourCycle", "fractionalSecondDigits"];

function El(...e) {
    const [t, n, r, i] = e, a = {};
    let o, l = {};
    if (Ka(t)) {
        const e = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
        if (!e) throw yl(hl.INVALID_ISO_DATE_ARGUMENT);
        const n = e[3] ? e[3].trim().startsWith("T") ? `${e[1].trim()}${e[3].trim()}` : `${e[1].trim()}T${e[3].trim()}` : e[1].trim();
        o = new Date(n);
        try {
            o.toISOString()
        } catch (s) {
            throw yl(hl.INVALID_ISO_DATE_ARGUMENT)
        }
    } else if (Da(t)) {
        if (isNaN(t.getTime())) throw yl(hl.INVALID_DATE_ARGUMENT);
        o = t
    } else {
        if (!ja(t)) throw yl(hl.INVALID_ARGUMENT);
        o = t
    }
    return Ka(n) ? a.key = n : Qa(n) && Object.keys(n).forEach((e => {
        Tl.includes(e) ? l[e] = n[e] : a[e] = n[e]
    })), Ka(r) ? a.locale = r : Qa(r) && (l = r), Qa(i) && (l = i), [a.key || "", o, a, l]
}

function Cl(e, t, n) {
    const r = e;
    for (const i in n) {
        const e = `${t}__${i}`;
        r.__datetimeFormatters.has(e) && r.__datetimeFormatters.delete(e)
    }
}

function Ll(e, ...t) {
    const {
        numberFormats: n,
        unresolving: r,
        fallbackLocale: i,
        onWarn: a,
        localeFallbacker: o
    } = e, {__numberFormatters: l} = e, [s, c, u, p] = Sl(...t);
    Ga(u.missingWarn) ? u.missingWarn : e.missingWarn;
    Ga(u.fallbackWarn) ? u.fallbackWarn : e.fallbackWarn;
    const d = !!u.part, f = Ka(u.locale) ? u.locale : e.locale, g = o(e, i, f);
    if (!Ka(s) || "" === s) return new Intl.NumberFormat(f, p).format(c);
    let h, y = {}, m = null;
    for (let b = 0; b < g.length && (h = g[b], y = n[h] || {}, m = y[s], !Qa(m)); b++) cl(e, s, h, 0, "number format");
    if (!Qa(m) || !Ka(h)) return r ? Ko : s;
    let v = `${h}__${s}`;
    za(p) || (v = `${v}__${JSON.stringify(p)}`);
    let x = l.get(v);
    return x || (x = new Intl.NumberFormat(h, Fa({}, m, p)), l.set(v, x)), d ? x.formatToParts(c) : x.format(c)
}

const Ol = ["localeMatcher", "style", "currency", "currencyDisplay", "currencySign", "useGrouping", "minimumIntegerDigits", "minimumFractionDigits", "maximumFractionDigits", "minimumSignificantDigits", "maximumSignificantDigits", "compactDisplay", "notation", "signDisplay", "unit", "unitDisplay", "roundingMode", "roundingPriority", "roundingIncrement", "trailingZeroDisplay"];

function Sl(...e) {
    const [t, n, r, i] = e, a = {};
    let o = {};
    if (!ja(t)) throw yl(hl.INVALID_ARGUMENT);
    const l = t;
    return Ka(n) ? a.key = n : Qa(n) && Object.keys(n).forEach((e => {
        Ol.includes(e) ? o[e] = n[e] : a[e] = n[e]
    })), Ka(r) ? a.locale = r : Qa(r) && (o = r), Qa(i) && (o = i), [a.key || "", l, a, o]
}

function Pl(e, t, n) {
    const r = e;
    for (const i in n) {
        const e = `${t}__${i}`;
        r.__numberFormatters.has(e) && r.__numberFormatters.delete(e)
    }
}

"boolean" != typeof __INTLIFY_PROD_DEVTOOLS__ && (Ba().__INTLIFY_PROD_DEVTOOLS__ = !1);
/*!
  * vue-i18n v9.3.0-beta.14
  * (c) 2023 kazuya kawaguchi
  * Released under the MIT License.
  */
const Al = "9.3.0-beta.14";
let Rl = eo.__EXTEND_POINT__;
const Nl = () => ++Rl, Il = {
    UNEXPECTED_RETURN_TYPE: Rl,
    INVALID_ARGUMENT: Nl(),
    MUST_BE_CALL_SETUP_TOP: Nl(),
    NOT_INSLALLED: Nl(),
    NOT_AVAILABLE_IN_LEGACY_MODE: Nl(),
    REQUIRED_VALUE: Nl(),
    INVALID_VALUE: Nl(),
    CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: Nl(),
    NOT_INSLALLED_WITH_PROVIDE: Nl(),
    UNEXPECTED_ERROR: Nl(),
    NOT_COMPATIBLE_LEGACY_VUE_I18N: Nl(),
    BRIDGE_SUPPORT_VUE_2_ONLY: Nl(),
    MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: Nl(),
    NOT_AVAILABLE_COMPOSITION_IN_LEGACY: Nl(),
    __EXTEND_POINT__: Nl()
};

function jl(e, ...t) {
    return to(e, null, void 0)
}

const Dl = Ra("__translateVNode"), Ml = Ra("__datetimeParts"), zl = Ra("__numberParts"), Vl = Ra("__setPluralRules");
Ra("__intlifyMeta");
const Fl = Ra("__injectWithOption");

function Ul(e) {
    if (!Xa(e)) return e;
    for (const t in e) if (qa(e, t)) if (t.includes(".")) {
        const n = t.split("."), r = n.length - 1;
        let i = e;
        for (let e = 0; e < r; e++) n[e] in i || (i[n[e]] = {}), i = i[n[e]];
        i[n[r]] = e[t], delete e[t], Xa(i[n[r]]) && Ul(i[n[r]])
    } else Xa(e[t]) && Ul(e[t]);
    return e
}

function Bl(e, t) {
    const {messages: n, __i18n: r, messageResolver: i, flatJson: a} = t, o = Qa(n) ? n : $a(r) ? {} : {[e]: {}};
    if ($a(r) && r.forEach((e => {
        if ("locale" in e && "resource" in e) {
            const {locale: t, resource: n} = e;
            t ? (o[t] = o[t] || {}, Wl(n, o[t])) : Wl(n, o)
        } else Ka(e) && Wl(JSON.parse(e), o)
    })), null == i && a) for (const l in o) qa(o, l) && Ul(o[l]);
    return o
}

const Hl = e => !Xa(e) || $a(e);

function Wl(e, t) {
    if (Hl(e) || Hl(t)) throw jl(Il.INVALID_VALUE);
    for (const n in e) qa(e, n) && (Hl(e[n]) || Hl(t[n]) ? t[n] = e[n] : Wl(e[n], t[n]))
}

function ql(e) {
    return e.type
}

function $l(e, t, n) {
    let r = Xa(t.messages) ? t.messages : {};
    "__i18nGlobal" in n && (r = Bl(e.locale.value, {messages: r, __i18n: n.__i18nGlobal}));
    const i = Object.keys(r);
    if (i.length && i.forEach((t => {
        e.mergeLocaleMessage(t, r[t])
    })), Xa(t.datetimeFormats)) {
        const n = Object.keys(t.datetimeFormats);
        n.length && n.forEach((n => {
            e.mergeDateTimeFormat(n, t.datetimeFormats[n])
        }))
    }
    if (Xa(t.numberFormats)) {
        const n = Object.keys(t.numberFormats);
        n.length && n.forEach((n => {
            e.mergeNumberFormat(n, t.numberFormats[n])
        }))
    }
}

function Yl(e) {
    return Jr(Ir, null, e, 0)
}

const Kl = "__INTLIFY_META__";
let Gl = 0;

function Xl(e) {
    return (t, n, r, i) => e(n, r, si() || void 0, i)
}

const Jl = () => {
    const e = si();
    let t = null;
    return e && (t = ql(e)[Kl]) ? {[Kl]: t} : null
};

function Zl(e = {}, t) {
    const {__root: n} = e, r = void 0 === n;
    let i = !Ga(e.inheritLocale) || e.inheritLocale;
    const a = vt(n && i ? n.locale.value : Ka(e.locale) ? e.locale : Go),
        o = vt(n && i ? n.fallbackLocale.value : Ka(e.fallbackLocale) || $a(e.fallbackLocale) || Qa(e.fallbackLocale) || !1 === e.fallbackLocale ? e.fallbackLocale : a.value),
        l = vt(Bl(a.value, e)), s = vt(Qa(e.datetimeFormats) ? e.datetimeFormats : {[a.value]: {}}),
        c = vt(Qa(e.numberFormats) ? e.numberFormats : {[a.value]: {}});
    let u = n ? n.missingWarn : !Ga(e.missingWarn) && !Ma(e.missingWarn) || e.missingWarn,
        p = n ? n.fallbackWarn : !Ga(e.fallbackWarn) && !Ma(e.fallbackWarn) || e.fallbackWarn,
        d = n ? n.fallbackRoot : !Ga(e.fallbackRoot) || e.fallbackRoot, f = !!e.fallbackFormat,
        g = Ya(e.missing) ? e.missing : null, h = Ya(e.missing) ? Xl(e.missing) : null,
        y = Ya(e.postTranslation) ? e.postTranslation : null,
        m = n ? n.warnHtmlMessage : !Ga(e.warnHtmlMessage) || e.warnHtmlMessage, v = !!e.escapeParameter;
    const x = n ? n.modifiers : Qa(e.modifiers) ? e.modifiers : {};
    let b, k = e.pluralRules || n && n.pluralRules;
    b = (() => {
        r && al(null);
        const t = {
            version: Al,
            locale: a.value,
            fallbackLocale: o.value,
            messages: l.value,
            modifiers: x,
            pluralRules: k,
            missing: null === h ? void 0 : h,
            missingWarn: u,
            fallbackWarn: p,
            fallbackFormat: f,
            unresolving: !0,
            postTranslation: null === y ? void 0 : y,
            warnHtmlMessage: m,
            escapeParameter: v,
            messageResolver: e.messageResolver,
            __meta: {framework: "vue"}
        };
        t.datetimeFormats = s.value, t.numberFormats = c.value, t.__datetimeFormatters = Qa(b) ? b.__datetimeFormatters : void 0, t.__numberFormatters = Qa(b) ? b.__numberFormatters : void 0;
        const n = sl(t);
        return r && al(n), n
    })(), ul(b, a.value, o.value);
    const w = vi({
        get: () => a.value, set: e => {
            a.value = e, b.locale = a.value
        }
    }), _ = vi({
        get: () => o.value, set: e => {
            o.value = e, b.fallbackLocale = o.value, ul(b, a.value, e)
        }
    }), T = vi((() => l.value)), E = vi((() => s.value)), C = vi((() => c.value));
    const L = (e, t, i, u, p, f) => {
        let g;
        if (a.value, o.value, l.value, s.value, c.value, __INTLIFY_PROD_DEVTOOLS__) try {
            nl(Jl()), r || (b.fallbackContext = n ? ol() : void 0), g = e(b)
        } finally {
            nl(null), r || (b.fallbackContext = void 0)
        } else g = e(b);
        if (ja(g) && g === Ko) {
            const [e, r] = t();
            return n && d ? u(n) : p(e)
        }
        if (f(g)) return g;
        throw jl(Il.UNEXPECTED_RETURN_TYPE)
    };

    function O(...e) {
        return L((t => Reflect.apply(xl, null, [t, ...e])), (() => wl(...e)), "translate", (t => Reflect.apply(t.t, t, [...e])), (e => e), (e => Ka(e)))
    }

    const S = {
        normalize: function (e) {
            return e.map((e => Ka(e) || ja(e) || Ga(e) ? Yl(String(e)) : e))
        }, interpolate: e => e, type: "vnode"
    };

    function P(e) {
        return l.value[e] || {}
    }

    Gl++, n && Aa && (pn(n.locale, (e => {
        i && (a.value = e, b.locale = e, ul(b, a.value, o.value))
    })), pn(n.fallbackLocale, (e => {
        i && (o.value = e, b.fallbackLocale = e, ul(b, a.value, o.value))
    })));
    const A = {
        id: Gl, locale: w, fallbackLocale: _, get inheritLocale() {
            return i
        }, set inheritLocale(e) {
            i = e, e && n && (a.value = n.locale.value, o.value = n.fallbackLocale.value, ul(b, a.value, o.value))
        }, get availableLocales() {
            return Object.keys(l.value).sort()
        }, messages: T, get modifiers() {
            return x
        }, get pluralRules() {
            return k || {}
        }, get isGlobal() {
            return r
        }, get missingWarn() {
            return u
        }, set missingWarn(e) {
            u = e, b.missingWarn = u
        }, get fallbackWarn() {
            return p
        }, set fallbackWarn(e) {
            p = e, b.fallbackWarn = p
        }, get fallbackRoot() {
            return d
        }, set fallbackRoot(e) {
            d = e
        }, get fallbackFormat() {
            return f
        }, set fallbackFormat(e) {
            f = e, b.fallbackFormat = f
        }, get warnHtmlMessage() {
            return m
        }, set warnHtmlMessage(e) {
            m = e, b.warnHtmlMessage = e
        }, get escapeParameter() {
            return v
        }, set escapeParameter(e) {
            v = e, b.escapeParameter = e
        }, t: O, getLocaleMessage: P, setLocaleMessage: function (e, t) {
            l.value[e] = t, b.messages = l.value
        }, mergeLocaleMessage: function (e, t) {
            l.value[e] = l.value[e] || {}, Wl(t, l.value[e]), b.messages = l.value
        }, getPostTranslationHandler: function () {
            return Ya(y) ? y : null
        }, setPostTranslationHandler: function (e) {
            y = e, b.postTranslation = e
        }, getMissingHandler: function () {
            return g
        }, setMissingHandler: function (e) {
            null !== e && (h = Xl(e)), g = e, b.missing = h
        }, [Vl]: function (e) {
            k = e, b.pluralRules = k
        }
    };
    return A.datetimeFormats = E, A.numberFormats = C, A.rt = function (...e) {
        const [t, n, r] = e;
        if (r && !Xa(r)) throw jl(Il.INVALID_ARGUMENT);
        return O(t, n, Fa({resolvedMessage: !0}, r || {}))
    }, A.te = function (e, t) {
        const n = P(Ka(t) ? t : a.value);
        return null !== b.messageResolver(n, e)
    }, A.tm = function (e) {
        const t = function (e) {
            let t = null;
            const n = Ho(b, o.value, a.value);
            for (let r = 0; r < n.length; r++) {
                const i = l.value[n[r]] || {}, a = b.messageResolver(i, e);
                if (null != a) {
                    t = a;
                    break
                }
            }
            return t
        }(e);
        return null != t ? t : n && n.tm(e) || {}
    }, A.d = function (...e) {
        return L((t => Reflect.apply(_l, null, [t, ...e])), (() => El(...e)), "datetime format", (t => Reflect.apply(t.d, t, [...e])), (() => Xo), (e => Ka(e)))
    }, A.n = function (...e) {
        return L((t => Reflect.apply(Ll, null, [t, ...e])), (() => Sl(...e)), "number format", (t => Reflect.apply(t.n, t, [...e])), (() => Xo), (e => Ka(e)))
    }, A.getDateTimeFormat = function (e) {
        return s.value[e] || {}
    }, A.setDateTimeFormat = function (e, t) {
        s.value[e] = t, b.datetimeFormats = s.value, Cl(b, e, t)
    }, A.mergeDateTimeFormat = function (e, t) {
        s.value[e] = Fa(s.value[e] || {}, t), b.datetimeFormats = s.value, Cl(b, e, t)
    }, A.getNumberFormat = function (e) {
        return c.value[e] || {}
    }, A.setNumberFormat = function (e, t) {
        c.value[e] = t, b.numberFormats = c.value, Pl(b, e, t)
    }, A.mergeNumberFormat = function (e, t) {
        c.value[e] = Fa(c.value[e] || {}, t), b.numberFormats = c.value, Pl(b, e, t)
    }, A[Fl] = e.__injectWithOption, A[Dl] = function (...e) {
        return L((t => {
            let n;
            const r = t;
            try {
                r.processor = S, n = Reflect.apply(xl, null, [r, ...e])
            } finally {
                r.processor = null
            }
            return n
        }), (() => wl(...e)), "translate", (t => t[Dl](...e)), (e => [Yl(e)]), (e => $a(e)))
    }, A[Ml] = function (...e) {
        return L((t => Reflect.apply(_l, null, [t, ...e])), (() => El(...e)), "datetime format", (t => t[Ml](...e)), (() => []), (e => Ka(e) || $a(e)))
    }, A[zl] = function (...e) {
        return L((t => Reflect.apply(Ll, null, [t, ...e])), (() => Sl(...e)), "number format", (t => t[zl](...e)), (() => []), (e => Ka(e) || $a(e)))
    }, A
}

function Ql(e = {}, t) {
    {
        const t = Zl(function (e) {
            const t = Ka(e.locale) ? e.locale : Go,
                n = Ka(e.fallbackLocale) || $a(e.fallbackLocale) || Qa(e.fallbackLocale) || !1 === e.fallbackLocale ? e.fallbackLocale : t,
                r = Ya(e.missing) ? e.missing : void 0,
                i = !Ga(e.silentTranslationWarn) && !Ma(e.silentTranslationWarn) || !e.silentTranslationWarn,
                a = !Ga(e.silentFallbackWarn) && !Ma(e.silentFallbackWarn) || !e.silentFallbackWarn,
                o = !Ga(e.fallbackRoot) || e.fallbackRoot, l = !!e.formatFallbackMessages,
                s = Qa(e.modifiers) ? e.modifiers : {}, c = e.pluralizationRules,
                u = Ya(e.postTranslation) ? e.postTranslation : void 0,
                p = !Ka(e.warnHtmlInMessage) || "off" !== e.warnHtmlInMessage, d = !!e.escapeParameterHtml,
                f = !Ga(e.sync) || e.sync;
            let g = e.messages;
            if (Qa(e.sharedMessages)) {
                const t = e.sharedMessages;
                g = Object.keys(t).reduce(((e, n) => {
                    const r = e[n] || (e[n] = {});
                    return Fa(r, t[n]), e
                }), g || {})
            }
            const {__i18n: h, __root: y, __injectWithOption: m} = e, v = e.datetimeFormats, x = e.numberFormats;
            return {
                locale: t,
                fallbackLocale: n,
                messages: g,
                flatJson: e.flatJson,
                datetimeFormats: v,
                numberFormats: x,
                missing: r,
                missingWarn: i,
                fallbackWarn: a,
                fallbackRoot: o,
                fallbackFormat: l,
                modifiers: s,
                pluralRules: c,
                postTranslation: u,
                warnHtmlMessage: p,
                escapeParameter: d,
                messageResolver: e.messageResolver,
                inheritLocale: f,
                __i18n: h,
                __root: y,
                __injectWithOption: m
            }
        }(e)), n = {
            id: t.id,
            get locale() {
                return t.locale.value
            },
            set locale(e) {
                t.locale.value = e
            },
            get fallbackLocale() {
                return t.fallbackLocale.value
            },
            set fallbackLocale(e) {
                t.fallbackLocale.value = e
            },
            get messages() {
                return t.messages.value
            },
            get datetimeFormats() {
                return t.datetimeFormats.value
            },
            get numberFormats() {
                return t.numberFormats.value
            },
            get availableLocales() {
                return t.availableLocales
            },
            get formatter() {
                return {interpolate: () => []}
            },
            set formatter(e) {
            },
            get missing() {
                return t.getMissingHandler()
            },
            set missing(e) {
                t.setMissingHandler(e)
            },
            get silentTranslationWarn() {
                return Ga(t.missingWarn) ? !t.missingWarn : t.missingWarn
            },
            set silentTranslationWarn(e) {
                t.missingWarn = Ga(e) ? !e : e
            },
            get silentFallbackWarn() {
                return Ga(t.fallbackWarn) ? !t.fallbackWarn : t.fallbackWarn
            },
            set silentFallbackWarn(e) {
                t.fallbackWarn = Ga(e) ? !e : e
            },
            get modifiers() {
                return t.modifiers
            },
            get formatFallbackMessages() {
                return t.fallbackFormat
            },
            set formatFallbackMessages(e) {
                t.fallbackFormat = e
            },
            get postTranslation() {
                return t.getPostTranslationHandler()
            },
            set postTranslation(e) {
                t.setPostTranslationHandler(e)
            },
            get sync() {
                return t.inheritLocale
            },
            set sync(e) {
                t.inheritLocale = e
            },
            get warnHtmlInMessage() {
                return t.warnHtmlMessage ? "warn" : "off"
            },
            set warnHtmlInMessage(e) {
                t.warnHtmlMessage = "off" !== e
            },
            get escapeParameterHtml() {
                return t.escapeParameter
            },
            set escapeParameterHtml(e) {
                t.escapeParameter = e
            },
            get preserveDirectiveContent() {
                return !0
            },
            set preserveDirectiveContent(e) {
            },
            get pluralizationRules() {
                return t.pluralRules || {}
            },
            __composer: t,
            t(...e) {
                const [n, r, i] = e, a = {};
                let o = null, l = null;
                if (!Ka(n)) throw jl(Il.INVALID_ARGUMENT);
                const s = n;
                return Ka(r) ? a.locale = r : $a(r) ? o = r : Qa(r) && (l = r), $a(i) ? o = i : Qa(i) && (l = i), Reflect.apply(t.t, t, [s, o || l || {}, a])
            },
            rt: (...e) => Reflect.apply(t.rt, t, [...e]),
            tc(...e) {
                const [n, r, i] = e, a = {plural: 1};
                let o = null, l = null;
                if (!Ka(n)) throw jl(Il.INVALID_ARGUMENT);
                const s = n;
                return Ka(r) ? a.locale = r : ja(r) ? a.plural = r : $a(r) ? o = r : Qa(r) && (l = r), Ka(i) ? a.locale = i : $a(i) ? o = i : Qa(i) && (l = i), Reflect.apply(t.t, t, [s, o || l || {}, a])
            },
            te: (e, n) => t.te(e, n),
            tm: e => t.tm(e),
            getLocaleMessage: e => t.getLocaleMessage(e),
            setLocaleMessage(e, n) {
                t.setLocaleMessage(e, n)
            },
            mergeLocaleMessage(e, n) {
                t.mergeLocaleMessage(e, n)
            },
            d: (...e) => Reflect.apply(t.d, t, [...e]),
            getDateTimeFormat: e => t.getDateTimeFormat(e),
            setDateTimeFormat(e, n) {
                t.setDateTimeFormat(e, n)
            },
            mergeDateTimeFormat(e, n) {
                t.mergeDateTimeFormat(e, n)
            },
            n: (...e) => Reflect.apply(t.n, t, [...e]),
            getNumberFormat: e => t.getNumberFormat(e),
            setNumberFormat(e, n) {
                t.setNumberFormat(e, n)
            },
            mergeNumberFormat(e, n) {
                t.mergeNumberFormat(e, n)
            },
            getChoiceIndex: (e, t) => -1,
            __onComponentInstanceCreated(t) {
                const {componentInstanceCreatedListener: r} = e;
                r && r(t, n)
            }
        };
        return n
    }
}

const es = {
    tag: {type: [String, Object]},
    locale: {type: String},
    scope: {type: String, validator: e => "parent" === e || "global" === e, default: "parent"},
    i18n: {type: Object}
};

function ts(e) {
    return Nr
}

const ns = {
    name: "i18n-t",
    props: Fa({
        keypath: {type: String, required: !0},
        plural: {type: [Number, String], validator: e => ja(e) || !isNaN(e)}
    }, es),
    setup(e, t) {
        const {slots: n, attrs: r} = t, i = e.i18n || ps({useScope: e.scope, __useComponent: !0});
        return () => {
            const a = Object.keys(n).filter((e => "_" !== e)), o = {};
            e.locale && (o.locale = e.locale), void 0 !== e.plural && (o.plural = Ka(e.plural) ? +e.plural : e.plural);
            const l = function ({slots: e}, t) {
                if (1 === t.length && "default" === t[0]) return (e.default ? e.default() : []).reduce(((e, t) => [...e, ...t.type === Nr ? t.children : [t]]), []);
                return t.reduce(((t, n) => {
                    const r = e[n];
                    return r && (t[n] = r()), t
                }), {})
            }(t, a), s = i[Dl](e.keypath, l, o), c = Fa({}, r);
            return xi(Ka(e.tag) || Xa(e.tag) ? e.tag : ts(), c, s)
        }
    }
};

function rs(e, t, n, r) {
    const {slots: i, attrs: a} = t;
    return () => {
        const t = {part: !0};
        let o = {};
        e.locale && (t.locale = e.locale), Ka(e.format) ? t.key = e.format : Xa(e.format) && (Ka(e.format.key) && (t.key = e.format.key), o = Object.keys(e.format).reduce(((t, r) => n.includes(r) ? Fa({}, t, {[r]: e.format[r]}) : t), {}));
        const l = r(e.value, t, o);
        let s = [t.key];
        $a(l) ? s = l.map(((e, t) => {
            const n = i[e.type], r = n ? n({[e.type]: e.value, index: t, parts: l}) : [e.value];
            var a;
            return $a(a = r) && !Ka(a[0]) && (r[0].key = `${e.type}-${t}`), r
        })) : Ka(l) && (s = [l]);
        const c = Fa({}, a);
        return xi(Ka(e.tag) || Xa(e.tag) ? e.tag : ts(), c, s)
    }
}

const is = {
    name: "i18n-n",
    props: Fa({value: {type: Number, required: !0}, format: {type: [String, Object]}}, es),
    setup(e, t) {
        const n = e.i18n || ps({useScope: "parent", __useComponent: !0});
        return rs(e, t, Ol, ((...e) => n[zl](...e)))
    }
}, as = {
    name: "i18n-d",
    props: Fa({value: {type: [Number, Date], required: !0}, format: {type: [String, Object]}}, es),
    setup(e, t) {
        const n = e.i18n || ps({useScope: "parent", __useComponent: !0});
        return rs(e, t, Tl, ((...e) => n[Ml](...e)))
    }
};

function os(e) {
    if (Ka(e)) return {path: e};
    if (Qa(e)) {
        if (!("path" in e)) throw jl(Il.REQUIRED_VALUE);
        return e
    }
    throw jl(Il.INVALID_VALUE)
}

function ls(e) {
    const {path: t, locale: n, args: r, choice: i, plural: a} = e, o = {}, l = r || {};
    return Ka(n) && (o.locale = n), ja(i) && (o.plural = i), ja(a) && (o.plural = a), [t, l, o]
}

function ss(e, t, ...n) {
    const r = Qa(n[0]) ? n[0] : {}, i = !!r.useI18nComponentName;
    (!Ga(r.globalInstall) || r.globalInstall) && (e.component(i ? "i18n" : ns.name, ns), e.component(is.name, is), e.component(as.name, as)), e.directive("t", function (e) {
        const t = t => {
            const {instance: n, modifiers: r, value: i} = t;
            if (!n || !n.$) throw jl(Il.UNEXPECTED_ERROR);
            const a = function (e, t) {
                const n = e;
                if ("composition" === e.mode) return n.__getInstance(t) || e.global;
                {
                    const r = n.__getInstance(t);
                    return null != r ? r.__composer : e.global.__composer
                }
            }(e, n.$), o = os(i);
            return [Reflect.apply(a.t, a, [...ls(o)]), a]
        };
        return {
            created: (n, r) => {
                const [i, a] = t(r);
                Aa && e.global === a && (n.__i18nWatcher = pn(a.locale, (() => {
                    r.instance && r.instance.$forceUpdate()
                }))), n.__composer = a, n.textContent = i
            }, unmounted: e => {
                Aa && e.__i18nWatcher && (e.__i18nWatcher(), e.__i18nWatcher = void 0, delete e.__i18nWatcher), e.__composer && (e.__composer = void 0, delete e.__composer)
            }, beforeUpdate: (e, {value: t}) => {
                if (e.__composer) {
                    const n = e.__composer, r = os(t);
                    e.textContent = Reflect.apply(n.t, n, [...ls(r)])
                }
            }, getSSRProps: e => {
                const [n] = t(e);
                return {textContent: n}
            }
        }
    }(t))
}

function cs(e, t) {
    e.locale = t.locale || e.locale, e.fallbackLocale = t.fallbackLocale || e.fallbackLocale, e.missing = t.missing || e.missing, e.silentTranslationWarn = t.silentTranslationWarn || e.silentFallbackWarn, e.silentFallbackWarn = t.silentFallbackWarn || e.silentFallbackWarn, e.formatFallbackMessages = t.formatFallbackMessages || e.formatFallbackMessages, e.postTranslation = t.postTranslation || e.postTranslation, e.warnHtmlInMessage = t.warnHtmlInMessage || e.warnHtmlInMessage, e.escapeParameterHtml = t.escapeParameterHtml || e.escapeParameterHtml, e.sync = t.sync || e.sync, e.__composer[Vl](t.pluralizationRules || e.pluralizationRules);
    const n = Bl(e.locale, {messages: t.messages, __i18n: t.__i18n});
    return Object.keys(n).forEach((t => e.mergeLocaleMessage(t, n[t]))), t.datetimeFormats && Object.keys(t.datetimeFormats).forEach((n => e.mergeDateTimeFormat(n, t.datetimeFormats[n]))), t.numberFormats && Object.keys(t.numberFormats).forEach((n => e.mergeNumberFormat(n, t.numberFormats[n]))), e
}

const us = Ra("global-vue-i18n");

function ps(e = {}) {
    const t = si();
    if (null == t) throw jl(Il.MUST_BE_CALL_SETUP_TOP);
    if (!t.isCE && null != t.appContext.app && !t.appContext.app.__VUE_I18N_SYMBOL__) throw jl(Il.NOT_INSLALLED);
    const n = function (e) {
        {
            const t = cn(e.isCE ? us : e.appContext.app.__VUE_I18N_SYMBOL__);
            if (!t) throw jl(e.isCE ? Il.NOT_INSLALLED_WITH_PROVIDE : Il.UNEXPECTED_ERROR);
            return t
        }
    }(t), r = function (e) {
        return "composition" === e.mode ? e.global : e.global.__composer
    }(n), i = ql(t), a = function (e, t) {
        return za(e) ? "__i18n" in t ? "local" : "global" : e.useScope ? e.useScope : "local"
    }(e, i);
    if (__VUE_I18N_LEGACY_API__ && "legacy" === n.mode && !e.__useComponent) {
        if (!n.allowComposition) throw jl(Il.NOT_AVAILABLE_IN_LEGACY_MODE);
        return function (e, t, n, r = {}) {
            const i = "local" === t, a = xt(null);
            if (i && e.proxy && !e.proxy.$options.i18n && !e.proxy.$options.__i18n) throw jl(Il.MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION);
            const o = !Ga(r.inheritLocale) || r.inheritLocale,
                l = vt(i && o ? n.locale.value : Ka(r.locale) ? r.locale : Go),
                s = vt(i && o ? n.fallbackLocale.value : Ka(r.fallbackLocale) || $a(r.fallbackLocale) || Qa(r.fallbackLocale) || !1 === r.fallbackLocale ? r.fallbackLocale : l.value),
                c = vt(Bl(l.value, r)), u = vt(Qa(r.datetimeFormats) ? r.datetimeFormats : {[l.value]: {}}),
                p = vt(Qa(r.numberFormats) ? r.numberFormats : {[l.value]: {}}),
                d = i ? n.missingWarn : !Ga(r.missingWarn) && !Ma(r.missingWarn) || r.missingWarn,
                f = i ? n.fallbackWarn : !Ga(r.fallbackWarn) && !Ma(r.fallbackWarn) || r.fallbackWarn,
                g = i ? n.fallbackRoot : !Ga(r.fallbackRoot) || r.fallbackRoot, h = !!r.fallbackFormat,
                y = Ya(r.missing) ? r.missing : null, m = Ya(r.postTranslation) ? r.postTranslation : null,
                v = i ? n.warnHtmlMessage : !Ga(r.warnHtmlMessage) || r.warnHtmlMessage, x = !!r.escapeParameter,
                b = i ? n.modifiers : Qa(r.modifiers) ? r.modifiers : {}, k = r.pluralRules || i && n.pluralRules;

            function w() {
                return [l.value, s.value, c.value, u.value, p.value]
            }

            const _ = vi({
                    get: () => a.value ? a.value.locale.value : l.value, set: e => {
                        a.value && (a.value.locale.value = e), l.value = e
                    }
                }), T = vi({
                    get: () => a.value ? a.value.fallbackLocale.value : s.value, set: e => {
                        a.value && (a.value.fallbackLocale.value = e), s.value = e
                    }
                }), E = vi((() => a.value ? a.value.messages.value : c.value)), C = vi((() => u.value)),
                L = vi((() => p.value));

            function O() {
                return a.value ? a.value.getPostTranslationHandler() : m
            }

            function S(e) {
                a.value && a.value.setPostTranslationHandler(e)
            }

            function P() {
                return a.value ? a.value.getMissingHandler() : y
            }

            function A(e) {
                a.value && a.value.setMissingHandler(e)
            }

            function R(e) {
                return w(), e()
            }

            function N(...e) {
                return a.value ? R((() => Reflect.apply(a.value.t, null, [...e]))) : R((() => ""))
            }

            function I(...e) {
                return a.value ? Reflect.apply(a.value.rt, null, [...e]) : ""
            }

            function j(...e) {
                return a.value ? R((() => Reflect.apply(a.value.d, null, [...e]))) : R((() => ""))
            }

            function D(...e) {
                return a.value ? R((() => Reflect.apply(a.value.n, null, [...e]))) : R((() => ""))
            }

            function M(e) {
                return a.value ? a.value.tm(e) : {}
            }

            function z(e, t) {
                return !!a.value && a.value.te(e, t)
            }

            function V(e) {
                return a.value ? a.value.getLocaleMessage(e) : {}
            }

            function F(e, t) {
                a.value && (a.value.setLocaleMessage(e, t), c.value[e] = t)
            }

            function U(e, t) {
                a.value && a.value.mergeLocaleMessage(e, t)
            }

            function B(e) {
                return a.value ? a.value.getDateTimeFormat(e) : {}
            }

            function H(e, t) {
                a.value && (a.value.setDateTimeFormat(e, t), u.value[e] = t)
            }

            function W(e, t) {
                a.value && a.value.mergeDateTimeFormat(e, t)
            }

            function q(e) {
                return a.value ? a.value.getNumberFormat(e) : {}
            }

            function $(e, t) {
                a.value && (a.value.setNumberFormat(e, t), p.value[e] = t)
            }

            function Y(e, t) {
                a.value && a.value.mergeNumberFormat(e, t)
            }

            const K = {
                get id() {
                    return a.value ? a.value.id : -1
                },
                locale: _,
                fallbackLocale: T,
                messages: E,
                datetimeFormats: C,
                numberFormats: L,
                get inheritLocale() {
                    return a.value ? a.value.inheritLocale : o
                },
                set inheritLocale(e) {
                    a.value && (a.value.inheritLocale = e)
                },
                get availableLocales() {
                    return a.value ? a.value.availableLocales : Object.keys(c.value)
                },
                get modifiers() {
                    return a.value ? a.value.modifiers : b
                },
                get pluralRules() {
                    return a.value ? a.value.pluralRules : k
                },
                get isGlobal() {
                    return !!a.value && a.value.isGlobal
                },
                get missingWarn() {
                    return a.value ? a.value.missingWarn : d
                },
                set missingWarn(e) {
                    a.value && (a.value.missingWarn = e)
                },
                get fallbackWarn() {
                    return a.value ? a.value.fallbackWarn : f
                },
                set fallbackWarn(e) {
                    a.value && (a.value.missingWarn = e)
                },
                get fallbackRoot() {
                    return a.value ? a.value.fallbackRoot : g
                },
                set fallbackRoot(e) {
                    a.value && (a.value.fallbackRoot = e)
                },
                get fallbackFormat() {
                    return a.value ? a.value.fallbackFormat : h
                },
                set fallbackFormat(e) {
                    a.value && (a.value.fallbackFormat = e)
                },
                get warnHtmlMessage() {
                    return a.value ? a.value.warnHtmlMessage : v
                },
                set warnHtmlMessage(e) {
                    a.value && (a.value.warnHtmlMessage = e)
                },
                get escapeParameter() {
                    return a.value ? a.value.escapeParameter : x
                },
                set escapeParameter(e) {
                    a.value && (a.value.escapeParameter = e)
                },
                t: N,
                getPostTranslationHandler: O,
                setPostTranslationHandler: S,
                getMissingHandler: P,
                setMissingHandler: A,
                rt: I,
                d: j,
                n: D,
                tm: M,
                te: z,
                getLocaleMessage: V,
                setLocaleMessage: F,
                mergeLocaleMessage: U,
                getDateTimeFormat: B,
                setDateTimeFormat: H,
                mergeDateTimeFormat: W,
                getNumberFormat: q,
                setNumberFormat: $,
                mergeNumberFormat: Y
            };

            function G(e) {
                e.locale.value = l.value, e.fallbackLocale.value = s.value, Object.keys(c.value).forEach((t => {
                    e.mergeLocaleMessage(t, c.value[t])
                })), Object.keys(u.value).forEach((t => {
                    e.mergeDateTimeFormat(t, u.value[t])
                })), Object.keys(p.value).forEach((t => {
                    e.mergeNumberFormat(t, p.value[t])
                })), e.escapeParameter = x, e.fallbackFormat = h, e.fallbackRoot = g, e.fallbackWarn = f, e.missingWarn = d, e.warnHtmlMessage = v
            }

            return An((() => {
                if (null == e.proxy || null == e.proxy.$i18n) throw jl(Il.NOT_AVAILABLE_COMPOSITION_IN_LEGACY);
                const n = a.value = e.proxy.$i18n.__composer;
                "global" === t ? (l.value = n.locale.value, s.value = n.fallbackLocale.value, c.value = n.messages.value, u.value = n.datetimeFormats.value, p.value = n.numberFormats.value) : i && G(n)
            })), K
        }(t, a, r, e)
    }
    if ("global" === a) return $l(r, e, i), r;
    if ("parent" === a) {
        let i = function (e, t, n = !1) {
            let r = null;
            const i = t.root;
            let a = t.parent;
            for (; null != a;) {
                const t = e;
                if ("composition" === e.mode) r = t.__getInstance(a); else if (__VUE_I18N_LEGACY_API__) {
                    const e = t.__getInstance(a);
                    null != e && (r = e.__composer, n && r && !r[Fl] && (r = null))
                }
                if (null != r) break;
                if (i === a) break;
                a = a.parent
            }
            return r
        }(n, t, e.__useComponent);
        return null == i && (i = r), i
    }
    const o = n;
    let l = o.__getInstance(t);
    if (null == l) {
        const n = Fa({}, e);
        "__i18n" in i && (n.__i18n = i.__i18n), r && (n.__root = r), l = Zl(n), o.__composerExtend && o.__composerExtend(l), function (e, t, n) {
            Rn((() => {
            }), t), Dn((() => {
                e.__deleteInstance(t)
            }), t)
        }(o, t), o.__setInstance(t, l)
    }
    return l
}

const ds = ["locale", "fallbackLocale", "availableLocales"], fs = ["t", "rt", "d", "n", "tm", "te"];
var gs;
if (Zo = function (e, t = {}) {
    {
        const n = (t.onCacheKey || pl)(e), r = dl[n];
        if (r) return r;
        let i = !1;
        const a = t.onError || no;
        t.onError = e => {
            i = !0, a(e)
        };
        const {code: o} = function (e, t = {}) {
            const n = Fa({}, t), r = vo(n).parse(e);
            return wo(r, n), To(r, n)
        }(e, t), l = new Function(`return ${o}`)();
        return i ? l : dl[n] = l
    }
}, Qo = function (e, t) {
    if (!Xa(e)) return null;
    let n = Po.get(t);
    if (n || (n = function (e) {
        const t = [];
        let n, r, i, a, o, l, s, c = -1, u = 0, p = 0;
        const d = [];

        function f() {
            const t = e[c + 1];
            if (5 === u && "'" === t || 6 === u && '"' === t) return c++, i = "\\" + t, d[0](), !0
        }

        for (d[0] = () => {
            void 0 === r ? r = i : r += i
        }, d[1] = () => {
            void 0 !== r && (t.push(r), r = void 0)
        }, d[2] = () => {
            d[0](), p++
        }, d[3] = () => {
            if (p > 0) p--, u = 4, d[0](); else {
                if (p = 0, void 0 === r) return !1;
                if (r = So(r), !1 === r) return !1;
                d[1]()
            }
        }; null !== u;) if (c++, n = e[c], "\\" !== n || !f()) {
            if (a = Oo(n), s = Co[u], o = s[a] || s.l || 8, 8 === o) return;
            if (u = o[0], void 0 !== o[1] && (l = d[o[1]], l && (i = n, !1 === l()))) return;
            if (7 === u) return t
        }
    }(t), n && Po.set(t, n)), !n) return null;
    const r = n.length;
    let i = e, a = 0;
    for (; a < r;) {
        const e = i[n[a]];
        if (void 0 === e) return null;
        i = e, a++
    }
    return i
}, el = Ho, "boolean" != typeof __VUE_I18N_FULL_INSTALL__ && (Ba().__VUE_I18N_FULL_INSTALL__ = !0), "boolean" != typeof __VUE_I18N_LEGACY_API__ && (Ba().__VUE_I18N_LEGACY_API__ = !0), "boolean" != typeof __INTLIFY_PROD_DEVTOOLS__ && (Ba().__INTLIFY_PROD_DEVTOOLS__ = !1), __INTLIFY_PROD_DEVTOOLS__) {
    const e = Ba();
    e.__INTLIFY__ = !0, gs = e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__, Vo = gs
}
const hs = function (e = {}, t) {
    const n = __VUE_I18N_LEGACY_API__ && Ga(e.legacy) ? e.legacy : __VUE_I18N_LEGACY_API__,
        r = !Ga(e.globalInjection) || e.globalInjection, i = !__VUE_I18N_LEGACY_API__ || !n || !!e.allowComposition,
        a = new Map, [o, l] = function (e, t, n) {
            const r = J();
            {
                const n = __VUE_I18N_LEGACY_API__ && t ? r.run((() => Ql(e))) : r.run((() => Zl(e)));
                if (null == n) throw jl(Il.UNEXPECTED_ERROR);
                return [r, n]
            }
        }(e, n), s = Ra("");
    {
        const e = {
            get mode() {
                return __VUE_I18N_LEGACY_API__ && n ? "legacy" : "composition"
            }, get allowComposition() {
                return i
            }, async install(t, ...i) {
                if (t.__VUE_I18N_SYMBOL__ = s, t.provide(t.__VUE_I18N_SYMBOL__, e), Qa(i[0])) {
                    const t = i[0];
                    e.__composerExtend = t.__composerExtend, e.__vueI18nExtend = t.__vueI18nExtend
                }
                !n && r && function (e, t) {
                    const n = Object.create(null);
                    ds.forEach((e => {
                        const r = Object.getOwnPropertyDescriptor(t, e);
                        if (!r) throw jl(Il.UNEXPECTED_ERROR);
                        const i = mt(r.value) ? {
                            get: () => r.value.value, set(e) {
                                r.value.value = e
                            }
                        } : {get: () => r.get && r.get()};
                        Object.defineProperty(n, e, i)
                    })), e.config.globalProperties.$i18n = n, fs.forEach((n => {
                        const r = Object.getOwnPropertyDescriptor(t, n);
                        if (!r || !r.value) throw jl(Il.UNEXPECTED_ERROR);
                        Object.defineProperty(e.config.globalProperties, `$${n}`, r)
                    }))
                }(t, e.global), __VUE_I18N_FULL_INSTALL__ && ss(t, e, ...i), __VUE_I18N_LEGACY_API__ && n && t.mixin(function (e, t, n) {
                    return {
                        beforeCreate() {
                            const r = si();
                            if (!r) throw jl(Il.UNEXPECTED_ERROR);
                            const i = this.$options;
                            if (i.i18n) {
                                const n = i.i18n;
                                i.__i18n && (n.__i18n = i.__i18n), n.__root = t, this === this.$root ? this.$i18n = cs(e, n) : (n.__injectWithOption = !0, this.$i18n = Ql(n))
                            } else i.__i18n ? this === this.$root ? this.$i18n = cs(e, i) : this.$i18n = Ql({
                                __i18n: i.__i18n,
                                __injectWithOption: !0,
                                __root: t
                            }) : this.$i18n = e;
                            i.__i18nGlobal && $l(t, i, i), e.__onComponentInstanceCreated(this.$i18n), n.__setInstance(r, this.$i18n), this.$t = (...e) => this.$i18n.t(...e), this.$rt = (...e) => this.$i18n.rt(...e), this.$tc = (...e) => this.$i18n.tc(...e), this.$te = (e, t) => this.$i18n.te(e, t), this.$d = (...e) => this.$i18n.d(...e), this.$n = (...e) => this.$i18n.n(...e), this.$tm = e => this.$i18n.tm(e), this !== this.$root && !this.$i18n.__extended__ && n.__vueI18nExtend && (n.__vueI18nExtend(this.$i18n), this.$i18n.__extended__ = !0)
                        }, mounted() {
                        }, unmounted() {
                            const e = si();
                            if (!e) throw jl(Il.UNEXPECTED_ERROR);
                            delete this.$t, delete this.$rt, delete this.$tc, delete this.$te, delete this.$d, delete this.$n, delete this.$tm, n.__deleteInstance(e), delete this.$i18n
                        }
                    }
                }(l, l.__composer, e));
                const a = t.unmount;
                t.unmount = () => {
                    e.dispose(), a()
                }
            }, get global() {
                return l
            }, dispose() {
                o.stop()
            }, __instances: a, __getInstance: function (e) {
                return a.get(e) || null
            }, __setInstance: function (e, t) {
                a.set(e, t)
            }, __deleteInstance: function (e) {
                a.delete(e)
            }
        };
        return e
    }
}({
    locale: "zh-CN", fallbackLocale: "en-US", allowComposition: !0, messages: {
        filPH: {
            clientText3: "Mga Tala",
            clientText4: "Tungkol sa update na ito",
            clientText5: "Log ng update",
            clientText6: "Updated ang bersyon",
            clientText7: "Kasama sa update na ito ang isa o higit pa sa mga sumusunod: mga app, wallpaper, ringtone, animation ng startup, layout ng Home screen, at mga setting ng network.",
            clientText8: "Mga update para sa mga na-customize na device",
            playVideo: "I-play ang video",
            aboutVersion: "Tungkol sa bersyong ito",
            versionUpToDate: "Updated ang bersyon",
            networkTip: "Ginagamit mo ang mobile network. Makokonsumo ang data.",
            findNewVersion: "May available na update",
            loading: "Naglo-load...",
            networkError: "Error sa network",
            tryAgainLater: "Pakisubukang muli sa ibang pagkakataon.",
            playVideoTip: "Hindi ma-play dahil sa error sa network",
            pageException: "Hindi na-load ang impormasyon ng bersyon, pero puwede mo pa ring i-update ang system.",
            loadFail: "Hindi na-load"
        },
        arAR: {
            clientText3: "الملاحظات",
            clientText4: "حول هذا التحديث",
            clientText5: "سجل التحديث",
            clientText6: "الإصدار محدث",
            clientText7: "يتضمن هذا التحديث أحد العناصر الآتية أو أكثر: التطبيقات، وخلفيات الشاشة، ونغمات الرنين، والرسوم المتحركة لبدء التشغيل، وتخطيط الشاشة الرئيسية، وإعدادات الشبكة.",
            clientText8: "تحديثات الأجهزة المخصصة",
            playVideo: "تشغيل الفيديو",
            aboutVersion: "حول هذا الإصدار",
            versionUpToDate: "الإصدار محدث",
            networkTip: "أنت تستخدم شبكة الهاتف. سيتم استهلاك البيانات.",
            findNewVersion: "التحديث متاح",
            loading: "جارٍ التحميل٫٫.",
            networkError: "خطأ في الشبكة",
            tryAgainLater: "يُرجى المحاولة مرة أخرى لاحقًا.",
            playVideoTip: "يتعذر التشغيل بسبب خطأ في الشبكة",
            pageException: "فشل تحميل معلومات الإصدار، ولكن لا يزال بإمكانك تحديث النظام.",
            loadFail: "فشل التحميل"
        },
        asIN: {
            clientText3: "টোকাসমূহ",
            clientText4: "এই আপডেটৰ বিষয়ে",
            clientText5: "লগ আপডেট কৰক",
            clientText6: "সংস্কৰণ আপ টু ডেট হৈছে",
            clientText7: "এই আপডেটত তলত উল্লেখ কৰাখিনিৰ এটা বা অধিক অন্তৰ্ভুক্ত কৰে: এপ্প্‌সমূহ, ৱালপেপাৰসমূহ, ৰিংট’নসমূহ, ষ্টাৰ্টআপ এনিমেশ্বনসমূহ, হোম স্ক্ৰীণ লেআউট আৰু নেটৱৰ্ক ছেটিংছ৷",
            clientText8: "অনুকূলিত ডিভাইচসমূহৰ বাবে আপডেটসমূহ",
            playVideo: "ভিডিঅ’ প্লে কৰক",
            aboutVersion: "এই সংস্কৰণ বিষয়ে",
            versionUpToDate: "সংস্কৰণ আপ টু ডেট হৈছে",
            networkTip: "আপুনি এটা মোবাইল নেটৱৰ্ক ব্যৱহাৰ কৰি আছে৷ ডাটা খৰচ হ’ব৷",
            findNewVersion: "আপডেট উপলব্ধ",
            loading: "লোড হৈ আছে...",
            networkError: "নেটৱৰ্কৰ ত্ৰুটি",
            tryAgainLater: "অনুগ্ৰহ কৰি পাছত পুনৰ চেষ্টা কৰক৷",
            playVideoTip: "নেটৱৰ্ক ত্ৰুটিৰ বাবে প্লে কৰাত অক্ষম",
            pageException: "সংস্কৰণৰ তথ্য লোড কৰাত বিফল হ’ল, কিন্তু আপুনি এতিয়াও ছিষ্টেম আপডেট কৰিব পাৰে।",
            loadFail: "লোডিং ব্যৰ্থ হ’ল"
        },
        bgBG: {
            clientText3: "Бележки",
            clientText4: "Относно това актуализиране",
            clientText5: "Дневник на актуализациите",
            clientText6: "Версията е актуална",
            clientText7: "Тази актуализация включва едно или повече от следните: приложения, тапети, мелодии, анимации при стартиране, оформление на началния екран и мрежови настройки.",
            clientText8: "Актуализации за персонализирани устройства",
            playVideo: "Възпроизвеждане на видеоклип",
            aboutVersion: "Относно тази версия",
            versionUpToDate: "Версията е актуална",
            networkTip: "Използвате мобилната мрежа. Данните ще бъдат изразходвани.",
            findNewVersion: "Налична е актуализация",
            loading: "Зареждане…",
            networkError: "Грешка в мрежата",
            tryAgainLater: "Моля, опитайте отново по-късно.",
            playVideoTip: "Неуспешно възпроизвеждане поради грешка с мрежата",
            pageException: "Неуспешно зареждане на информацията за версията, но все пак можете да актуализирате системата.",
            loadFail: "Неуспешно зареждане"
        },
        bnBD: {
            clientText3: "নোট",
            clientText4: "এই আপডেট সম্পর্কে",
            clientText5: "লগ আপডেট করুন",
            clientText6: "সংস্করণ হালনাগাদ আছে",
            clientText7: "এই আপডেটে নিচের যেকোনো একটি বা একাধিক অন্তর্ভুক্ত থাকবে: অ্যাপ, ওয়ালপেপার, রিংটোন, অ্যানিমেশন চালু করা, হোম স্ক্রিনের লেআউট, ও নেটওয়ার্ক সেটিংস।",
            clientText8: "কাস্টমাইজকৃত ডিভাইসের জন্য আপডেট",
            playVideo: "ভিডিও চালান",
            aboutVersion: "এই সংস্করণ সম্পর্কে",
            versionUpToDate: "সংস্করণ হালনাগাদ আছে",
            networkTip: "আপনি মোবাইল নেটওয়ার্ক ব্যবহার করছেন। ডাটা খরচ হবে।",
            findNewVersion: "আপডেট উপলভ্য আছে",
            loading: "লোড হচ্ছে...",
            networkError: "নেটওয়ার্কে ত্রুটি",
            tryAgainLater: "অনুগ্রহ করে পরে আবার চেষ্টা করুন।",
            playVideoTip: "নেটওয়ার্কে ত্রুটির কারণে বাজাতে অক্ষম",
            pageException: "সংস্করণের তথ্য লোড করতে ব্যর্থ হয়েছ, কিন্তু আপনি এখনও সিস্টেম আপডেট করতে পারেন।",
            loadFail: "লোড করতে ব্যর্থ হয়েছে"
        },
        boCN: {
            clientText3: "ཉམས་འཇོག་དོན་ཚན།",
            clientText4: "པར་གཞིའི་ཁྱད་ཆོས།",
            clientText5: "གསར་སྒྱུར་ཉིན་ཐོ།",
            clientText6: "པར་གཞི་གསར་ཤོས་རེད།",
            clientText7: "གསར་སྒྱུར་ནང་དོན་དུ་གཤམ་གྱི་རིགས་གཅིག་གམ་མང་པོ་ཚུད་ཡོད་དེ། ཉེར་སྤྱོད་དང་ལྡེབས་ཤོག དྲིལ་སྒྲ། གློག་སྒོ་ཕྱེ་རྒྱག་གི་འགུལ་རིས། ཅོག་ངོས་ལྟ་བཀོད། དྲ་རྒྱ་སོགས།",
            clientText8: "ཆེད་བཟོའི་གསར་སྒྱུར།",
            playVideo: "བརྙན་ཟློས་ལ་ལྟ་བ།",
            aboutVersion: "པར་གཞིའི་ཞིབ་ཕྲའི་གནས་ཚུལ།",
            versionUpToDate: "པར་གཞི་གསར་ཤོས་རེད།",
            networkTip: "མིག་སྔར་གཞི་གྲངས་དྲ་རྒྱ་ཡིན། བཞུར་ཚད་ཀྱི་ཟད་གྲོན་ལ་ཉམས་འཇོག་བྱེད་རོགས།",
            findNewVersion: "པར་གཞི་གསར་བ་རྙེད།",
            loading: "ཐེག་འཇུག་བྱེད་བཞིན་པའི་སྒང་ཡིན།",
            networkError: "དྲ་རྒྱ་རྒྱུན་ལྡན་མིན།",
            tryAgainLater: "ཏོག་ཙམ་ནས་བསྐྱར་དུ་ཚོད་ལྟ་གནང་རོགས།",
            playVideoTip: "དྲ་ལམ་ཉེས་སྐྱོན་རྐྱེན་པས་གཏོང་མ་ཐུབ།",
            pageException: "དྲ་ངོས་རྒྱུན་ལྡན་མིན། པར་གཞིའི་ཆ་འཕྲིན་སྣོན་འཇུག་བྱ་ཐབས་བྲལ། རྒྱུན་ལྡན་གྱིས་རྒྱུད་ཁོངས་གསར་སྒྱུར་བྱ་ཆོག",
            loadFail: "སྣོན་འཇུག་བྱེད་མ་ཐུབ།"
        },
        caES: {
            clientText3: "Notes",
            clientText4: "Quant a aquesta actualització",
            clientText5: "Registre d'actualitzacions",
            clientText6: "Versió actualitzada",
            clientText7: "Aquesta actualització inclou un o més del elements següents: aplicacions, fons de pantalla, tons de trucada, animacions d\\'inici, disseny de la pantalla d\\'inici i configuracions de xarxa.",
            clientText8: "Actualitzacions per a dispositius personalitzats",
            playVideo: "Reprodueix vídeo",
            aboutVersion: "Quant a aquesta versió",
            versionUpToDate: "Versió actualitzada",
            networkTip: "Esteu utilitzant la xarxa mòbil. Es consumiran dades.",
            findNewVersion: "Actualització disponible",
            loading: "S\\'estan carregant…",
            networkError: "Error de xarxa",
            tryAgainLater: "Torneu-ho a provar més tard.",
            playVideoTip: "No s’ha pogut reproduir a causa d\\'un error de xarxa",
            pageException: "No s’ha pogut carregar la informació de la versió, però encara podeu actualitzar el sistema.",
            loadFail: "Error de càrrega"
        },
        csCZ: {
            clientText3: "Poznámky",
            clientText4: "Informace o této aktualizaci",
            clientText5: "Protokol aktualizací",
            clientText6: "Verze je aktuální",
            clientText7: "Tato aktualizace může zahrnovat následující položky: aplikace, tapety, vyzvánění, animace spouštění, rozvržení domovské obrazovky a nastavení sítě.",
            clientText8: "Aktualizace pro přizpůsobená zařízení",
            playVideo: "Přehrát video",
            aboutVersion: "Informace o této verzi",
            versionUpToDate: "Verze je aktuální",
            networkTip: "Používáte mobilní síť. Spotřebují se nějaká mobilní data.",
            findNewVersion: "K dispozici je aktualizace",
            loading: "Načítání…",
            networkError: "Chyba sítě",
            tryAgainLater: "Zkuste to znovu později.",
            playVideoTip: "Nelze přehrát kvůli výpadku sítě",
            pageException: "Načtení informací o verzi se nezdařilo, přesto můžete systém aktualizovat.",
            loadFail: "Načítání selhalo"
        },
        daDK: {
            clientText3: "Noter",
            clientText4: "Om denne opdatering",
            clientText5: "Opdateringslog",
            clientText6: "Version er opdateret",
            clientText7: "Denne opdatering omfatter en eller flere af de følgende: apps, tapeter, ringetoner, opstartsanimationer, startskærmslayout og netværksindstillinger.",
            clientText8: "Opdateringer til tilpassede enheder",
            playVideo: "Afspil video",
            aboutVersion: "Om denne version",
            versionUpToDate: "Version er opdateret",
            networkTip: "Du bruger mobilnetværket. Der vil blive forbrugt data.",
            findNewVersion: "Opdatering tilgængelig",
            loading: "Indlæser...",
            networkError: "Netværksfejl",
            tryAgainLater: "Prøv igen senere.",
            playVideoTip: "Kunne ikke afspille pga. netværksfejl",
            pageException: "Kunne ikke indlæse versionsinfo, men du kan fortsat opdatere systemet.",
            loadFail: "Indlæsning mislykkedes"
        },
        deCH: {
            clientText3: "Anmerkungen",
            clientText4: "Infos zu dieser Aktualisierung",
            clientText5: "Aktualisierungsprotokoll",
            clientText6: "Version aktualisiert",
            clientText7: "Diese Aktualisierung umfasst eine oder mehrere der folgenden Funktionen: Apps, Hintergrundbilder, Klingeltöne, Startanimationen, Startbildschirm-Layout und Netzwerkeinstellungen.",
            clientText8: "Aktualisierungen für kundenspezifische Geräte",
            playVideo: "Video abspielen",
            aboutVersion: "Über diese Version",
            versionUpToDate: "Version aktualisiert",
            networkTip: "Sie nutzen das Mobilfunknetz. Daten werden verbraucht.",
            findNewVersion: "Aktualisierung verfügbar",
            loading: "Wird geladen…",
            networkError: "Netzwerkfehler",
            tryAgainLater: "Bitte versuchen Sie es später erneut.",
            playVideoTip: "Wiedergabe aufgrund von Netzwerkfehler nicht möglich",
            pageException: "Die Versionsdaten konnten nicht geladen werden, aber Sie können das System trotzdem aktualisieren.",
            loadFail: "Laden fehlgeschlagen"
        },
        deDE: {
            clientText3: "Notizen",
            clientText4: "Über diese Aktualisierung",
            clientText5: "Aktualisierungsprotokoll",
            clientText6: "Version aktuell",
            clientText7: "Diese Aktualisierung enthält mindestens eines der folgenden Elemente: Apps, Hintergrundbilder, Klingeltöne, Boot-Animationen, Startbildschirmlayout oder Netzwerkeinstellungen.",
            clientText8: "Aktualisierungen für benutzerdefinierte Geräte",
            playVideo: "Video wiedergeben",
            aboutVersion: "Über diese Version",
            versionUpToDate: "Version aktuell",
            networkTip: "Sie nutzen das mobile Netzwerk. Es werden Daten verbraucht.",
            findNewVersion: "Update verfügbar",
            loading: "Es wird geladen...",
            networkError: "Netzwerkfehler",
            tryAgainLater: "Versuchen Sie es später erneut.",
            playVideoTip: "Abspielen wegen Netzwerkfehler nicht möglich",
            pageException: "Versionsinformationen konnten nicht geladen werden. Sie können das System aber trotzdem aktualisieren.",
            loadFail: "Laden fehlgeschlagen"
        },
        elGR: {
            clientText3: "Σημειώσεις",
            clientText4: "Πληροφορίες για αυτήν την ενημέρωση",
            clientText5: "Αρχείο καταγραφής ενημερώσεων",
            clientText6: "Ενημερωμένη έκδοση",
            clientText7: "Αυτή η ενημέρωση περιλαμβάνει ένα ή περισσότερα από τα εξής: εφαρμογές, ταπετσαρίες, ήχους κλήσεις, κινούμενες εικόνες έναρξης λειτουργίας, διάταξη αρχικής οθόνης και ρυθμίσεις δικτύου.",
            clientText8: "Ενημερώσεις για προσαρμοσμένες συσκευές",
            playVideo: "Αναπαραγωγή βίντεο",
            aboutVersion: "Πληροφορίες για την έκδοση",
            versionUpToDate: "Ενημερωμένη έκδοση",
            networkTip: "Χρησιμοποιείτε το δίκτυο κινητής τηλεφωνίας. Θα καταναλωθούν δεδομένα.",
            findNewVersion: "Ενημέρωση διαθέσιμη",
            loading: "Φόρτωση...",
            networkError: "Σφάλμα δικτύου",
            tryAgainLater: "Προσπαθήστε ξανά αργότερα.",
            playVideoTip: "Αδύνατη η αναπαραγωγή λόγω σφάλματος δικτύου",
            pageException: "Η φόρτωση πληροφοριών έκδοσης απέτυχε, αλλά μπορείτε ακόμα να ενημερώνετε το σύστημα.",
            loadFail: "Αποτυχία φόρτωσης"
        },
        enAU: {
            clientText3: "Notes",
            clientText4: "About this update",
            clientText5: "Update log",
            clientText6: "Version up to date",
            clientText7: "This update includes one or more of the following: apps, wallpapers, ringtones, startup animations, Home screen layout, and network settings.",
            clientText8: "Updates for customised devices",
            playVideo: "Play video",
            aboutVersion: "About this version",
            versionUpToDate: "Version up to date",
            networkTip: "You are using the mobile network. Data will be consumed.",
            findNewVersion: "Update available",
            loading: "Loading...",
            networkError: "Network error",
            tryAgainLater: "Please try again later.",
            playVideoTip: "Unable to play due to network error",
            pageException: "Failed to load version info, but you can still update the system.",
            loadFail: "Loading failed"
        },
        enGB: {
            clientText3: "Notes",
            clientText4: "About this update",
            clientText5: "Update log",
            clientText6: "Version up to date",
            clientText7: "This update includes one or more of the following: apps, wallpapers, ringtones, startup animations, Home screen layout and network settings.",
            clientText8: "Updates for customised devices",
            playVideo: "Play video",
            aboutVersion: "About this version",
            versionUpToDate: "Version up to date",
            networkTip: "You are using the mobile network. Data will be consumed.",
            findNewVersion: "Update available",
            loading: "Loading...",
            networkError: "Network error",
            tryAgainLater: "Please try again later.",
            playVideoTip: "Unable to play due to network error",
            pageException: "Failed to load version info, but you can still update the system.",
            loadFail: "Loading failed"
        },
        enNZ: {
            clientText3: "Notes",
            clientText4: "About this update",
            clientText5: "Update log",
            clientText6: "Version up to date",
            clientText7: "This update includes one or more of the following: apps, wallpapers, ringtones, startup animations, Home screen layout, and network settings.",
            clientText8: "Updates for customised devices",
            playVideo: "Play video",
            aboutVersion: "About this version",
            versionUpToDate: "Version up to date",
            networkTip: "You are using the mobile network. Data will be consumed.",
            findNewVersion: "Update available",
            loading: "Loading...",
            networkError: "Network error",
            tryAgainLater: "Please try again later.",
            playVideoTip: "Unable to play due to network error",
            pageException: "Failed to load version info, but you can still update the system.",
            loadFail: "Loading failed"
        },
        enUS: {
            clientText: "1. Updating the system will not delete or modify your data. For security, you are recommended to back up your data before starting the update. Please also make sure you have sufficient space for the update. \n2. If you encounter any problems when using the new version, please contact our customer service. \n3. The APK file will be deleted after being installed.",
            clientText1: "1. Updating the system will not delete your data. For security, you are recommended to back up your data before starting the update. Please also make sure you have sufficient space for the update. \n2. After the update, system optimization will be performed in the background. During this time, your device may heat up slightly, become slow, or drain battery power faster, but it will return to normal after the optimization is complete. \n3. After the update, some third-party apps may not work normally because they are incompatible with your new Android system. We recommend updating them to their latest versions or waiting for their developers to release compatible versions. \n4. If you encounter any problems when using the new version, please contact our customer service. \n5. The APK file will be deleted after being installed.",
            clientText2: "To view more or join a discussion, visit:",
            clientText3: "Notes",
            clientText4: "About this update",
            clientText5: "Update log",
            clientText6: "Version up to date",
            clientText7: "This update includes one or more of the following: apps, wallpapers, ringtones, startup animations, Home screen layout, and network settings.",
            clientText8: "Updates for customized devices",
            playVideo: "Play video",
            aboutVersion: "About this version",
            versionUpToDate: "Version up to date",
            networkTip: "You are using the mobile network. Data will be consumed.",
            findNewVersion: "Update available",
            loading: "Loading...",
            networkError: "Network error",
            tryAgainLater: "Please try again later.",
            playVideoTip: "Unable to play due to network error",
            pageException: "Failed to load version info, but you can still update the system.",
            loadFail: "Loading failed"
        },
        esES: {
            clientText3: "Notas",
            clientText4: "Acerca de esta actualización",
            clientText5: "Registro de actualización",
            clientText6: "Versión actualizada",
            clientText7: "Esta actualización incluye una o más de las siguientes aplicaciones: fondos de pantalla, tonos, animaciones de encendido, diseño de la pantalla de inicio y ajustes de red.",
            clientText8: "Actualizaciones para dispositivos personalizados",
            playVideo: "Reproducir vídeo",
            aboutVersion: "Acerca de esta versión",
            versionUpToDate: "Versión actualizada",
            networkTip: "Estás utilizando la red móvil. Se consumirán datos.",
            findNewVersion: "Actualización disponible",
            loading: "Cargando...",
            networkError: "Error de red",
            tryAgainLater: "Inténtalo de nuevo más tarde.",
            playVideoTip: "No se puede reproducir por un error de la red",
            pageException: "No se ha podido cargar la información de la versión, pero aún puedes actualizar el sistema.",
            loadFail: "Error de carga"
        },
        esMX: {
            clientText3: "Notas",
            clientText4: "Acerca de esta actualización",
            clientText5: "Registro de actualización",
            clientText6: "Versión actualizada",
            clientText7: "Esta actualización incluye uno o más de los siguientes: aplicaciones, fondos de pantalla, tonos de llamadas, animaciones de inicio, diseño de pantalla de inicio y ajustes de red.",
            clientText8: "Actualizaciones para dispositivos personalizados",
            playVideo: "Reproducir video",
            aboutVersion: "Acerca de esta versión",
            versionUpToDate: "Versión actualizada",
            networkTip: "Está utilizando la red móvil. Se consumirán datos.",
            findNewVersion: "Actualización disponible",
            loading: "Cargando...",
            networkError: "Error de red",
            tryAgainLater: "Intente de nuevo más tarde.",
            playVideoTip: "No se puede reproducir debido a un error de la red",
            pageException: "No se cargó la información de la versión, pero aún puede actualizar el sistema.",
            loadFail: "Falló la carga"
        },
        euES: {
            clientText3: "Oharrak",
            clientText4: "Eguneratze honi buruz",
            clientText5: "Eguneratze-erregistroa",
            clientText6: "Bertsioa eguneratuta",
            clientText7: "Eguneratze honek hauetako bat edo gehiago dakartza: aplikazioak, horma-paperak, dei-tonuak, pizteko animazioak, hasierako pantailaren diseinua edo sareko ezarpenak.",
            clientText8: "Gailu pertsonalizatuen eguneratzeak",
            playVideo: "Erreproduzitu bideoa",
            aboutVersion: "Bertsio honi buruz",
            versionUpToDate: "Bertsioa eguneratuta",
            networkTip: "Sare mugikorra erabiltzen ari zara. Datuak kontsumituko dira.",
            findNewVersion: "Eguneratze bat dago erabilgarri",
            loading: "Kargatzen…",
            networkError: "Sare-errorea",
            tryAgainLater: "Saiatu berriro geroago.",
            playVideoTip: "Ezin da jokatu, sare-errore bat dagoelako",
            pageException: "Ezin izan da bertsioaren informazioa kargatu, baina sistema egunera dezakezu oraindik.",
            loadFail: "Ezin izan da kargatu"
        },
        fiFI: {
            clientText3: "Muistutukset",
            clientText4: "Tietoja tästä päivityksestä",
            clientText5: "Päivitysloki",
            clientText6: "Versio ajan tasalla",
            clientText7: "Tämä päivitys sisältää yhden tai useita seuraavista: sovellukset, taustakuvat, soittoäänet, käynnistysanimaatiot, aloitusnäytön asettelu ja verkkoasetukset.",
            clientText8: "Päivityksiä mukautetuille laitteille",
            playVideo: "Toista video",
            aboutVersion: "Tietoja tästä versiosta",
            versionUpToDate: "Versio ajan tasalla",
            networkTip: "Käytät mobiiliverkkoa. Dataa kulutetaan.",
            findNewVersion: "Päivitys saatavilla",
            loading: "Ladataan…",
            networkError: "Verkkovirhe",
            tryAgainLater: "Yritä myöhemmin uudelleen.",
            playVideoTip: "Ei voi toistaa verkkovirheen takia",
            pageException: "Versiotietojen lataaminen epäonnistui, mutta voit silti päivittää järjestelmän.",
            loadFail: "Lataus epäonnistui"
        },
        frFR: {
            clientText3: "Remarques",
            clientText4: "À propos de cette mise à jour",
            clientText5: "Journal des mises à jour",
            clientText6: "Version à jour",
            clientText7: "Cette mise à jour comprend un ou plusieurs des éléments suivants : applis, fonds d\\'écran, sonneries, animations de démarrage, disposition d\\'écran d\\'accueil et paramètres réseau.",
            clientText8: "Mises à jour pour les appareils personnalisés",
            playVideo: "Lire la vidéo",
            aboutVersion: "À propos de cette version",
            versionUpToDate: "Version à jour",
            networkTip: "Vous utilisez le réseau mobile. Cela va entraîner une consommation de données.",
            findNewVersion: "Mise à jour disponible",
            loading: "Chargement...",
            networkError: "Erreur de réseau",
            tryAgainLater: "Réessayez plus tard.",
            playVideoTip: "Lecture impossible à cause d\\'une erreur de réseau",
            pageException: "Impossible de charger les informations de version, mais vous pouvez toujours mettre à jour le système.",
            loadFail: "Échec du chargement"
        },
        glES: {
            clientText3: "Notas",
            clientText4: "Acerca desta actualización",
            clientText5: "Actualizar logaritmo",
            clientText6: "Versión actualizada",
            clientText7: "Esta actualización inclúe unha ou máis destas cousas: aplicacións, fondos de pantalla, tons de chamada, animacións de inicio, deseño da pantalla de inicio e axustes de rede.",
            clientText8: "Actualizacións para dispositivos personalizados",
            playVideo: "Reproducir vídeo",
            aboutVersion: "Acerca desta versión",
            versionUpToDate: "Versión actualizada",
            networkTip: "Estás a usar a rede móbil. Consumiranse datos.",
            findNewVersion: "Actualización dispoñible",
            loading: "Cargando...",
            networkError: "Erro rede",
            tryAgainLater: "Téntao de novo máis tarde.",
            playVideoTip: "Non se pode reprod. por un erro de rede",
            pageException: "Erro ao cargar a información da versión, pero podes actualizar o sistema.",
            loadFail: "Erro ao cargar"
        },
        guIN: {
            clientText3: "નોંધો",
            clientText4: "આ અપડેટ વિશે",
            clientText5: "અપડેટ લોગ",
            clientText6: "સંસ્કરણ અદ્યતન છે",
            clientText7: "આ અપડેટમાં નીચેના પૈકી કોઈ એક અથવા વધુનો સમાવેશ થાય છે: એપ્સ, વૉલપેપર્સ, રિંગટોન્સ, સ્ટાર્ટઅપ એનિમેશન્સ, હોમ સ્ક્રીન લેઆઉટ, અને નેટવર્ક સેટિંગ્સ.",
            clientText8: "કસ્ટમાઇઝ થયેલા ડિવાઇસેસ માટે અપડેટ્સ",
            playVideo: "વિડિયો ચલાવો",
            aboutVersion: "આ સંસ્કરણ વિશે",
            versionUpToDate: "સંસ્કરણ અદ્યતન છે",
            networkTip: "તમે મોબાઇલ નેટવર્કનો ઉપયોગ કરી રહ્યાં છો. ડેટાનો વપરાશ થશે.",
            findNewVersion: "અપડેટ ઉપલબ્ધ છે",
            loading: "લોડિંગ...",
            networkError: "નેટવર્ક ભૂલ",
            tryAgainLater: "કૃપા કરીને પછીથી ફરી પ્રયાસ કરો.",
            playVideoTip: "નેટવર્ક ભૂલને કારણે વગાડવામાં અસમર્થ",
            pageException: "સંસ્કરણ માહિતી લોડ કરવી નિષ્ફળ થઇ, પરંતુ તમે હજી પણ સિસ્ટમ અપડેટ કરી શકો છો.",
            loadFail: "લોડિંગ નિષ્ફળ થયું"
        },
        hiIN: {
            clientText3: "नोट",
            clientText4: "इस अपडेट के बारे में",
            clientText5: "अपडेट लॉग",
            clientText6: "संस्करण अधुनातन",
            clientText7: "इस अपडेट में इनमें से एक या एक से अधिक चीजें शामिल होती हैं: ऐप, वॉलपेपर, रिंगटोन, स्टार्टअप वाले एनिमेशन, होम स्क्रीन का लेआउट और नेटवर्क सेटिंग।",
            clientText8: "अनुकूलित किए गए डिवाइस के लिए अपडेट",
            playVideo: "वीडियो चलाएँ",
            aboutVersion: "इस संस्करण के बारे में",
            versionUpToDate: "संस्करण अधुनातन",
            networkTip: "आप मोबाइल नेटवर्क का उपयोग कर रहे हैं। डेटा खर्च होगा।",
            findNewVersion: "अपडेट उपलब्ध",
            loading: "लोड कर रहे हैं...",
            networkError: "नेटवर्क त्रुटि।",
            tryAgainLater: "कृपया बाद में पुनः प्रयास करें।",
            playVideoTip: "नेटवर्क त्रुटि के कारण चलाने में असमर्थ",
            pageException: "संस्करण जानकारी को लोड नहीं किया जा सका, लेकिन आप फिर भी सिस्टम को अपडेट कर सकते हैं।",
            loadFail: "लोड नहीं हो सका"
        },
        hrHR: {
            clientText3: "Napomene",
            clientText4: "Više o ovom ažuriranju",
            clientText5: "Zapisnik ažuriranja",
            clientText6: "Verzija je ažurirana",
            clientText7: "Ovo ažuriranje uključuje jedno ili više od sljedećeg: aplikacije, pozadine, melodije zvona, animacije pri pokretanju, izgled početnog zaslona i mrežne postavke.",
            clientText8: "Ažuriranja za prilagođene uređaje",
            playVideo: "Reproduciraj videozapis",
            aboutVersion: "Više o ovoj verziji",
            versionUpToDate: "Verzija je ažurirana",
            networkTip: "Upotrebljavate mobilnu mrežu. Podaci će biti potrošeni.",
            findNewVersion: "Dostupno ažuriranje",
            loading: "Učitavanje…",
            networkError: "Pogreška mreže",
            tryAgainLater: "Pokušajte opet kasnije.",
            playVideoTip: "Nije moguća reprodukcija zbog pogreške mreže",
            pageException: "Nije uspjelo učitavanje informacija o verziji, ali još uvijek možete ažurirati sustav.",
            loadFail: "Učitavanje nije uspjelo"
        },
        huHU: {
            clientText3: "Megjegyzések",
            clientText4: "Információ a frissítésről",
            clientText5: "Frissítési napló",
            clientText6: "Naprakész verzió",
            clientText7: "Ez a frissítés tartalmazza az alábbiak legalább egyikét: alkalmazások, háttérképek, csengőhangok, indítási animációk, Főképernyő-elrendezések vagy hálózati beállítások.",
            clientText8: "Személyre szabott eszközök frissítései",
            playVideo: "Videó lejátszása",
            aboutVersion: "Információ a verzióról",
            versionUpToDate: "Naprakész verzió",
            networkTip: "A mobilhálózatot használja. Adatok kerülnek felhasználásra.",
            findNewVersion: "Frissítés érhető el",
            loading: "Betöltés…",
            networkError: "Hálózati hiba",
            tryAgainLater: "Próbálja újra később.",
            playVideoTip: "Hálózati hiba miatt nem lehet lejátszani",
            pageException: "A verzióadatok betöltése sikertelen, de a rendszer frissítése még lehetséges.",
            loadFail: "Sikertelen betöltés"
        },
        idID: {
            clientText3: "Catatan",
            clientText4: "Tentang pembaruan ini",
            clientText5: "Log pembaruan",
            clientText6: "Versi sudah terbaru",
            clientText7: "Pembaruan ini menyertakan minimal satu atau beberapa dari berikut ini: aplikasi, wallpaper, nada dering, animasi saat mulai, layout layar Awal, dan pengaturan jaringan.",
            clientText8: "Pembaruan untuk perangkat yang disesuaikan",
            playVideo: "Putar video",
            aboutVersion: "Tentang versi ini",
            versionUpToDate: "Versi sudah terbaru",
            networkTip: "Anda sedang menggunakan jaringan seluler. Paket data akan digunakan.",
            findNewVersion: "Pembaruan tersedia",
            loading: "Sedang memuatkan...",
            networkError: "Kesalahan jaringan",
            tryAgainLater: "Cobalah lagi nanti.",
            playVideoTip: "Tidak dapat memutar karena eror jaringan",
            pageException: "Gagal memuat info versi, tetapi Anda tetap dapat memperbarui sistem.",
            loadFail: "Pemuatan gagal"
        },
        itIT: {
            clientText3: "Note",
            clientText4: "Informazioni su questo aggiornamento",
            clientText5: "Log aggiornamenti",
            clientText6: "Versione aggiornata",
            clientText7: "Questo aggiornamento comprende uno o più dei seguenti elementi: app, sfondi, suonerie, animazioni di avvio, layout della schermata iniziale e impostazioni di rete.",
            clientText8: "Aggiornamenti per dispositivi personalizzati",
            playVideo: "Riproduci video",
            aboutVersion: "Informazioni su questa versione",
            versionUpToDate: "Versione aggiornata",
            networkTip: "Stai utilizzando la rete mobile. Verranno utilizzati dati.",
            findNewVersion: "Aggiornamento disponibile",
            loading: "Caricamento...",
            networkError: "Errore di rete",
            tryAgainLater: "Riprova più tardi.",
            playVideoTip: "Riproduzione impossibile a causa di errore di rete",
            pageException: "Caricamento informazioni versione non riuscito, puoi comunque aggiornare il sistema.",
            loadFail: "Caricamento non riuscito"
        },
        iwIL: {
            clientText3: "הערות",
            clientText4: "אודות עדכון זה",
            clientText5: "עדכן יומן",
            clientText6: "גרסה מעודכנת",
            clientText7: "העדכון כולל את אחד מהבאים לפחות: אפליקציות, טפטים, רינגטונים, הנפשת הפעלה/כיבוי, פריסת מסך הבית והגדרות רשת.",
            clientText8: "עדכונים עבור מכשירים מותאמים אישית",
            playVideo: "הפעל סרטון",
            aboutVersion: "אודות גרסה זו",
            versionUpToDate: "גרסה מעודכנת",
            networkTip: "אתה משתמש ברשת נתונים סלולרית. תתבצע צריכה של נתונים.",
            findNewVersion: "עדכון זמין",
            loading: "טוען...",
            networkError: "שגיאת רשת",
            tryAgainLater: "נסה שוב מאוחר יותר.",
            playVideoTip: "אין אפשרות להפעיל בשל שגיאת מערכת",
            pageException: "טעינת מידע הגרסה נכשלה, אבל עדיין באפשרותך לעדכן את המערכת.",
            loadFail: "הטעינה נכשלה"
        },
        jaJP: {
            clientText: "1. 本次升级不会删除或更改你的数据，但仍建议你在更新前做好数据备份，同时预留足够的存储空间。\n2. 在使用过程中遇到任何问题可联系官方客服进行反馈和咨询。\n3. 升级后安装包会自动删除，不会占用存储空间。\n",
            clientText1: "1. 本次升级不会删除你的数据，但仍建议你在更新前做好数据备份，同时预留足够的存储空间。\n2. 升级后，系统后台会进行一系列适配优化，设备可能会出现短暂的发热、卡顿、耗电现象，使用一段时间后将恢复正常。\n3. 部分三方应用可能与新的 Android 版本不兼容，更新后可能会出现三方应用无法正常使用的情况，建议将该应用更新至最新版本或等待三方应用适配。\n4. 在使用过程中遇到任何问题可联系官方客服进行反馈和咨询。\n5. 升级后安装包会自动删除，不会占用存储空间。\n",
            clientText2: "查看更多内容和参与讨论，请登录：",
            clientText3: "注",
            clientText4: "この更新について",
            clientText5: "更新ログ",
            clientText6: "最新バージョン",
            clientText7: "この更新には、アプリ、壁紙、着信音、アニメーションの開始、ホーム画面のレイアウト、ネットワーク設定のうちの 1 つ以上が含まれています。",
            clientText8: "カスタマイズされたデバイスの更新",
            playVideo: "ビデオを再生",
            aboutVersion: "このバージョンについて",
            versionUpToDate: "最新バージョン",
            networkTip: "モバイルネットワークを利用しています。データが消費されます。",
            findNewVersion: "更新プログラムを利用できます",
            loading: "読み込み中…",
            networkError: "ネットワークエラー",
            tryAgainLater: "後でもう一度お試しください。",
            playVideoTip: "ネットワークエラーのため再生できません",
            pageException: "バージョン情報を読み込むことができませんでしたが、システムは更新可能です。",
            loadFail: "読み込むことができませんでした"
        },
        kkKZ: {
            clientText3: "Ескертпелер",
            clientText4: "Осы жаңарту туралы мәлімет",
            clientText5: "Жаңарту журналы",
            clientText6: "Нұсқа актуалды",
            clientText7: "Осы жаңарту құрамында келесілердің бірі не бірнешеуі бар: қолданбалар, тұсқағаздар, рингтондар, іске қосылу анимациялары, басты экранның қалпы және желілік параметрлер.",
            clientText8: "Арнайы құрылғылардың жаңартулары",
            playVideo: "Бейнені ойнату",
            aboutVersion: "Осы нұсқа туралы мәлімет",
            versionUpToDate: "Нұсқа актуалды",
            networkTip: "Ұялы байланыс желісін пайдаланып отырсыз. Деректер шығындалады.",
            findNewVersion: "Жаңарту қолжетімді",
            loading: "Жүктелуде...",
            networkError: "Желі қателігі",
            tryAgainLater: "Кейін қайталап көріңіз.",
            playVideoTip: "Желілік қателікке байланысты ойнату мүмкін емес",
            pageException: "Нұсқа туралы ақпарат жүктелмей қойды, бірақ жүйені сонда да жаңартуға болады.",
            loadFail: "Жүктеу сәтсіз аяқталды"
        },
        kmKH: {
            clientText3: "កំណត់ចំណាំ",
            clientText4: "អំពីការអាប់ដេតនេះ",
            clientText5: "កំណត់ហេតុអំពីការអាប់ដេត",
            clientText6: "កំណែទាន់សម័យហើយ",
            clientText7: "ការអាប់ដេតនេះរួមបញ្ចូលធាតុមួយ ឬច្រើនខាងក្រោម៖ កម្មវិធី រូបភាពផ្ទៃអេក្រង់ សំឡេងរោទ៍ រូបមានចលនាសម្រាប់ការចាប់ផ្ដើម ប្លង់អេក្រង់ដើម និងការកំណត់បណ្ដាញ។",
            clientText8: "ការអាប់ដេតសម្រាប់ឧបករណ៍ដែលប្ដូរតាមបំណង",
            playVideo: "ចាក់វីដេអូ",
            aboutVersion: "អំពីកំណែនេះ",
            versionUpToDate: "កំណែទាន់សម័យហើយ",
            networkTip: "អ្នកកំពុងប្រើបណ្តាញទូរសព្ទចល័ត។ ទិន្នន័យនឹងត្រូវបានប្រើ។",
            findNewVersion: "មានការអាប់ដេតហើយ",
            loading: "កំពុងផ្ទុក...",
            networkError: "បណ្តាញមានបញ្ហា",
            tryAgainLater: "សូមព្យាយាមម្ដងទៀតនៅពេលក្រោយ។",
            playVideoTip: "មិនអាចចាក់បានទេ ដោយសារកំហុសបណ្ដាញ",
            pageException: "មិនអាចផ្ទុកព័ត៌មានអំពីកំណែបានទេ ប៉ុន្តែអ្នកនៅតែអាចអាប់ដេតប្រព័ន្ធបានដដែល។",
            loadFail: "ការផ្ទុកមិនបានសម្រេចទេ"
        },
        knIN: {
            clientText3: "ಟಿಪ್ಪಣಿಗಳು",
            clientText4: "ಈ ನವೀಕರಣದ ಬಗ್ಗೆ",
            clientText5: "ನವೀಕರಣದ ಲಾಗ್",
            clientText6: "ಇಲ್ಲಿಯವರೆಗಿನ ಆವೃತ್ತಿ",
            clientText7: "ಈ ನವೀಕರಣವು ಈ ಕೆಳಗಿನವುಗಳಲ್ಲಿ ಒಂದು ಅಥವಾ ಹೆಚ್ಚಿನದನ್ನು ಒಳಗೊಂಡಿರುತ್ತದೆ: ಅಪ್ಲಿಗಳು, ವಾಲ್‌ಪೇಪರ್‌ಗಳು, ರಿಂಗ್‌ಟೋನ್‌ಗಳು, ಪ್ರಾರಂಭಗೊಳಿಸುವ ಅನಿಮೇಷನ್‌ಗಳು, ಹೋಮ್ ಸ್ಕ್ರೀನ್ ಲೇಔಟ್, ಮತ್ತು ನೆಟ್‌ವರ್ಕ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳು.",
            clientText8: "ಕಸ್ಟಮೈಸ್ ಮಾಡಿದ ಸಾಧನಗಳಿಗೆ ನವೀಕರಣಗಳು",
            playVideo: "ವೀಡಿಯೊ ಪ್ಲೇ ಮಾಡಿ",
            aboutVersion: "ಈ ಆವೃತ್ತಿ ಬಗ್ಗೆ",
            versionUpToDate: "ಇಲ್ಲಿಯವರೆಗಿನ ಆವೃತ್ತಿ",
            networkTip: "ನೀವು ಮೊಬೈಲ್ ನೆಟ್‌ವರ್ಕ್ ಅನ್ನು ಬಳಸುತ್ತಿರುವಿರಿ. ಡೇಟಾ ಬಳಕೆಯಾಗುತ್ತದೆ.",
            findNewVersion: "ನವೀಕರಣ ಲಭ್ಯವಿದೆ",
            loading: "ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
            networkError: "ನೆಟ್‍ವರ್ಕ್ ದೋಷ",
            tryAgainLater: "ದಯವಿಟ್ಟು ನಂತರ ಪುನಃ ಪ್ರಯತ್ನಿಸಿ.",
            playVideoTip: "ನೆಟ್‌ವರ್ಕ್ ದೋಷದಿಂದಾಗಿ ಪ್ಲೇ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ",
            pageException: "ಆವೃತ್ತಿಯ ಮಾಹಿತಿಯನ್ನು ಲೋಡ್ ಮಾಡಲು ವಿಫಲವಾಗಿದೆ, ಆದರೆ ನೀವು ಇನ್ನೂ ಸಿಸ್ಟಂ ಅನ್ನು ನವೀಕರಿಸಬಹುದು.",
            loadFail: "ಲೋಡಿಂಗ್ ವಿಫಲವಾಗಿದೆ"
        },
        koKR: {
            clientText3: "참고",
            clientText4: "이 업데이트에 대한 정보",
            clientText5: "업데이트 로그",
            clientText6: "최신 상태 버전",
            clientText7: "이 업데이트에는 앱, 배경화면, 벨소리, 시작 애니메이션, 홈 화면 레이아웃, 네트워크 설정 중 한 가지 이상이 포함됩니다.",
            clientText8: "사용자 지정 기기 업데이트",
            playVideo: "동영상 재생",
            aboutVersion: "버전 정보",
            versionUpToDate: "최신 상태 버전",
            networkTip: "모바일 네트워크를 사용 중입니다. 데이터가 사용됩니다.",
            findNewVersion: "사용 가능한 업데이트",
            loading: "로드 중...",
            networkError: "네트워크 오류",
            tryAgainLater: "나중에 다시 시도하세요.",
            playVideoTip: "네트워크 오류 때문에 재생할 수 없음",
            pageException: "버전 정보를 로드하는 데 실패했습니다. 하지만 여전히 시스템을 업데이트할 수 있습니다.",
            loadFail: "로딩 실패"
        },
        loLA: {
            clientText3: "ບັນທຶກ",
            clientText4: "ກ່ຽວກັບອັບເດດນີ້",
            clientText5: "ອັບເດດບັນທຶກ",
            clientText6: "​ເວີ​ຊັນຫຼ້າສຸດ",
            clientText7: "ການ​ອັ​ບ​ເດດ​​ນີ້ລວມ​ມີ​ຢ່າງ​ໜ້ອຍ​ໜຶ່ງ​ຢ່າງ​ຕໍ່​ໄປ​ນີ້: ແອັບ, ພາບ​ພື້ນຫຼັງ, ສຽງ​ໂທ​ເຂົ້າ, ພາບ​ເຄື່ອນ​ໄຫວ​ເລີ່ມ​ຕົ້ນ, ແຜນ​ຜັງໜ້າ​ຈໍຫຼັກ ແລະ ການ​ຕັ້ງ​ຄ່າ​ເຄືອ​ຂ່າຍ.",
            clientText8: "ອັບເດດສຳລັບອຸປະກອນທີ່ປັບແຕ່ງເອງ",
            playVideo: "ຫຼິ້ນວິດີໂອ",
            aboutVersion: "ກ່ຽວກັບລຸ້ນນີ້",
            versionUpToDate: "​ເວີ​ຊັນຫຼ້າສຸດ",
            networkTip: "ທ່ານກໍາລັງນໍາໃຊ້ເຄືອຂ່າຍມືຖືຢູ່. ຂໍ້ມູນຈະຖືກນຳໃຊ້.",
            findNewVersion: "ອັບເດດທີ່ມີໃຫ້",
            loading: "ກໍາລັງໂຫຼດ...",
            networkError: "ເຄືອຂ່າຍຜິດພາດ",
            tryAgainLater: "ກະລຸນາລອງໃໝ່ພາຍຫຼັງ.",
            playVideoTip: "ບໍ່ສາມາດຫຼິ້ນໄດ້ເນື່ອງຈາກເຄືອຂ່າຍຜິດພາດ",
            pageException: "ໂຫຼດຂໍ້ມູນລຸ້ນບໍ່ສຳເລັດ, ແຕ່ທ່ານຍັງສາມາດອັບເດດລະບົບໄດ້.",
            loadFail: "ການໂຫຼດບໍ່ສຳເລັດ"
        },
        ltLT: {
            clientText3: "Pastabos",
            clientText4: "Apie šį naujinį",
            clientText5: "Naujinimo žurnalas",
            clientText6: "Versija atnaujinta",
            clientText7: "Į šį naujinį įtraukta vienas ar keli iš toliau nurodytų dalykų: programos, ekrano fonai, skambėjimo tonai, paleidimo animacijos, pradžios ekrano išdėstymai ar tinklo nuostatos.",
            clientText8: "Jūsų tinkintų įrenginių atnaujinimai",
            playVideo: "Leisti vaizdo įrašą",
            aboutVersion: "Apie šią versiją",
            versionUpToDate: "Versija atnaujinta",
            networkTip: "Naudojate mobiliojo ryšio tinklą. Bus naudojami duomenys.",
            findNewVersion: "Yra naujinių",
            loading: "Įkeliama…",
            networkError: "Tinklo klaida",
            tryAgainLater: "Bandykite dar kartą vėliau.",
            playVideoTip: "Negalima paleisti dėl tinklo klaidos",
            pageException: "Nepavyko įkelti versijos informacijos, bet sistemą vis tiek galite atnaujinti.",
            loadFail: "Įkelti nepavyko"
        },
        lvLV: {
            clientText3: "Piezīmes",
            clientText4: "Par šo atjauninājumu",
            clientText5: "Atjauninājumu žurnāls",
            clientText6: "Versija ir atjaunināta",
            clientText7: "Šis atjauninājums ietver vienu vai vairākus no šiem vienumiem: lietotnes, fona tapetes, zvana signāli, ieslēgšanas animācijas, sākuma ekrāna izkārtojums un tīkla iestatījumi.",
            clientText8: "Atjauninājumi pielāgotajām ierīcēm",
            playVideo: "Atskaņot video",
            aboutVersion: "Par šo versiju",
            versionUpToDate: "Versija ir atjaunināta",
            networkTip: "Jūs lietojat mobilo tīklu. Tiks patērēti dati.",
            findNewVersion: "Pieejams atjauninājums",
            loading: "Notiek ielāde…",
            networkError: "Tīkla kļūda",
            tryAgainLater: "Lūdzu, mēģiniet vēlreiz vēlāk.",
            playVideoTip: "Neizdevās atskaņot tīkla kļūdas dēļ",
            pageException: "Neizdevās ierakstīt versijas informāciju, tomēr jūs vēl arvien varat atjaunināt šo sistēmu.",
            loadFail: "Ielāde neizdevās"
        },
        mlIN: {
            clientText3: "കുറിപ്പുകൾ",
            clientText4: "ഈ അപ്‌ഡേറ്റ് സംബന്ധിച്ച്",
            clientText5: "അപ്ഡേറ്റ് ലോഗ്",
            clientText6: "പതിപ്പ് കാലികമാണ്",
            clientText7: "ഈ അപ്‌ഡേറ്റിൽ ഇനിപ്പറയുന്നതിൽ ഒന്നോ അതിലധികമോ ഉൾപ്പെടുന്നു: ആപ്പുകൾ, വാൾപേപ്പറുകൾ, റിംഗ്‌ടോണുകൾ, സ്റ്റാർട്ടപ്പ് ആനിമേഷനുകൾ, ഹോം സ്‌ക്രീൻ ലേഔട്ട്, നെറ്റ്‌വർക്ക് ക്രമീകരണങ്ങൾ.",
            clientText8: "ഇഷ്‌ടാനുസൃതമാക്കിയ ഉപകരണങ്ങൾക്കായുള്ള അപ്‌ഡേറ്റുകൾ",
            playVideo: "വീഡിയോ പ്ലേ ചെയ്യുക",
            aboutVersion: "ഈ പതിപ്പ് സംബന്ധിച്ച്",
            versionUpToDate: "പതിപ്പ് കാലികമാണ്",
            networkTip: "നിങ്ങൾ മൊബൈൽ നെറ്റ്‌വർക്ക് ഉപയോഗിക്കുന്നു. ഡാറ്റ ഉപയോഗിക്കപ്പെടും.",
            findNewVersion: "അപ്‌ഡേറ്റ് ലഭ്യം",
            loading: "ലോഡുചെയ്യുന്നു...",
            networkError: "നെറ്റ്‍വർക്ക് പിശക്",
            tryAgainLater: "പിന്നീട് വീണ്ടും ശ്രമിക്കുക.",
            playVideoTip: "നെറ്റ്‌വർക്ക് പിശക് കാരണം പ്ലേ ചെയ്യാനാകില്ല",
            pageException: "പതിപ്പ് വിവരങ്ങൾ ലോഡ് ചെയ്യുന്നത് പരാജയപ്പെട്ടു, എന്നാൽ നിങ്ങൾക്ക് ഇപ്പോഴും സിസ്റ്റം അപ്ഡേറ്റ് ചെയ്യാം.",
            loadFail: "ലോഡിംഗ് പരാജയപ്പെട്ടു"
        },
        mrIN: {
            clientText3: "नोट्स",
            clientText4: "या अद्यतना विषयी",
            clientText5: "अद्यतन लॉग",
            clientText6: "आवृत्ती अद्ययावत",
            clientText7: "या अद्यतनात खालीलपैकी एक किंवा अधिक समाविष्ट आहेत: अ‍ॅप्स, वॉलपेपर्स, रिंगटोन्स, स्टार्टअप अ‍ॅनिमेशन्स, मुख्यपृष्ठ स्क्रीन लेआउट आणि नेटवर्क सेटिंग्ज.",
            clientText8: "सानुकूलित डिव्हाइसेससाठी अद्यतने",
            playVideo: "व्हिडिओ प्ले करा",
            aboutVersion: "या आवृत्ती विषयी",
            versionUpToDate: "आवृत्ती अद्ययावत",
            networkTip: "आपण मोबाईल नेटवर्क वापरत आहात. डेटा वापरला जाईल.",
            findNewVersion: "अद्यतन उपलब्ध",
            loading: "लोड करीत आहे...",
            networkError: "नेटवर्क त्रुटी",
            tryAgainLater: "कृपया नंतर पुन्हा प्रयत्न करा.",
            playVideoTip: "नेटवर्क त्रुटीमुळे प्ले करता आले नाही",
            pageException: "आवृत्ती माहिती लोड करण्यात अयशस्वी, परंतु तरीही आपण सिस्टीम अद्यतनित करू शकता.",
            loadFail: "लोड होणे अयशस्‍वी झाले"
        },
        msMY: {
            clientText3: "Nota",
            clientText4: "Perihal kemas kini ini",
            clientText5: "Log kemas kini",
            clientText6: "Versi terkini",
            clientText7: "Kemas kini ini mengandungi satu atau lebih daripada yang berikut: aplikasi, hias latar, nada dering, animasi permulaan, susun atur Skrin utama dan tetapan rangkaian.",
            clientText8: "Kemas kini untuk peranti tersuai",
            playVideo: "Mainkan video",
            aboutVersion: "Perihal versi ini",
            versionUpToDate: "Versi terkini",
            networkTip: "Anda menggunakan rangkaian mudah alih. Data akan digunakan.",
            findNewVersion: "Kemas kinian tersedia",
            loading: "Memuatkan...",
            networkError: "Ralat rangkaian",
            tryAgainLater: "Sila cuba lagi nanti.",
            playVideoTip: "Tidak dapat main disebabkan ralat rangkaian",
            pageException: "Gagal memuat maklumat versi, tetapi anda masih boleh mengemas kini sistem.",
            loadFail: "Gagal memuatkan"
        },
        myMM: {
            clientText3: "မှတ်စုများ",
            clientText4: "ဤအပ်ဒိတ် အကြောင်း",
            clientText5: "အပ်ဒိတ် မှတ်တမ်း",
            clientText6: "နောက်ဆုံးထုတ် ဗားရှင်းဖြစ်သည်",
            clientText7: "ဤအပ်ဒိတ်တွင် ဖော်ပြပါအက်ပ်များ တစ်ခုနှင့်အထက် ပါဝင်သည်- အက်ပ်များ၊ နောက်ခံပုံများ၊ မြည်သံများ၊ စဖွင့် အန်နီမေးရှင်းများ၊ ပင်မစခရင် ခင်းကျင်းပုံနှင့် ကွန်ရက်ဆက်တင်များ။",
            clientText8: "စိတ်ကြိုက်သတ်မှတ်ထားသောစက်များအတွက် အပ်ဒိတ်များ",
            playVideo: "ဗီဒီယို ဖွင့်ရန်",
            aboutVersion: "ဤဗားရှင်းအကြောင်း",
            versionUpToDate: "နောက်ဆုံးထုတ် ဗားရှင်းဖြစ်သည်",
            networkTip: "သင်သည် မိုဘိုင်း ကွန်ရက်ကို သုံးနေသည်။ ဒေတာ ကုန်ပါလိမ့်မည်။",
            findNewVersion: "အပ်ဒိတ် ရနိုင်သည်",
            loading: "ဆောင်ရွက်နေသည်...",
            networkError: "ကွန်ရက် ချွတ်ယွင်းနေသည်",
            tryAgainLater: "နောက်မှ ထပ်ကြိုးစားပါ။",
            playVideoTip: "ကွန်ရက်ချွတ်ယွင်းမှုကြောင့် ဖွင့်၍မရပါ",
            pageException: "ဗားရှင်းအချက်အလက်ကို ဖွင့်၍မရသော်လည်း စနစ်ကို အပ်ဒိတ်လုပ်နိုင်ပါသေးသည်။",
            loadFail: "လုပ်ဆောင်ခြင်း မအောင်မြင်ပါ"
        },
        nbNO: {
            clientText3: "Notater",
            clientText4: "Om denne oppdateringen",
            clientText5: "Oppdateringslogg",
            clientText6: "Versjon oppdatert",
            clientText7: "Denne oppdateringen inneholder ett eller flere følgende: apper, bakgrunner, ringetoner, oppstartsanimasjoner, startskjermoppsett og nettverksinnstillinger.",
            clientText8: "Oppdatering for tilpassede enheter",
            playVideo: "Spill av video",
            aboutVersion: "Om denne versjonen",
            versionUpToDate: "Versjon oppdatert",
            networkTip: "Du bruker mobilnettverket. Dette vil medføre forbruk av data.",
            findNewVersion: "Oppdatering tilgjengelig",
            loading: "Laster inn ...",
            networkError: "Nettverksfeil",
            tryAgainLater: "Prøv igjen senere.",
            playVideoTip: "Kan ikke spille på grunn av nettverksfeil",
            pageException: "Kunne ikke laste inn versjonsinformasjon, men du kan fremdeles oppdatere systemet.",
            loadFail: "Innlasting mislyktes"
        },
        neNP: {
            clientText3: "नोटहरू",
            clientText4: "यो अपडेटका बारेमा",
            clientText5: "अपडेट लग",
            clientText6: "संस्करण नवीनतम छ",
            clientText7: "यस अपडेटमा निम्नमध्ये एक वा सोभन्दा बढी कुरा समावेश छ: एप, वालपेपर, रिङटोन, स्टार्टअप एनिमेसन, होम स्क्रिनको लेआउट र नेटवर्कसम्बन्धी सेटिङहरू।",
            clientText8: "आफू अनुकूल बनाइएका यन्त्रका अपडेटहरू",
            playVideo: "भिडियो प्ले गर्नुहोस्",
            aboutVersion: "यो संस्करणका बारेमा",
            versionUpToDate: "संस्करण नवीनतम छ",
            networkTip: "तपाईं मोबाइल नेटवर्क प्रयोग गर्दै हुनुहुन्छ। डेटा खपत हुने छ।",
            findNewVersion: "अद्यावधिक उपलब्ध",
            loading: "लोड हुँदैछ...",
            networkError: "नेटवर्कसम्बन्धी त्रुटि",
            tryAgainLater: "कृपया पछि फेरि प्रयास गर्नुहोस्।",
            playVideoTip: "नेटवर्क सम्बन्धी त्रुटिका कारण प्ले गर्न सकिएन",
            pageException: "संस्करणसम्बन्धी जानकारी लोड गर्न सकिएन तर पनि तपाईं सिस्टम अपडेट गर्न सक्नुहुन्छ।",
            loadFail: "लोड गर्न सकिएन"
        },
        nlNL: {
            clientText3: "Opmerkingen",
            clientText4: "Over deze update",
            clientText5: "Update-log",
            clientText6: "Versie is up-to-date",
            clientText7: "Deze update bevat één of meer van de volgende zaken: apps, achtergronden, beltonen, opstartanimaties, startschermindeling en netwerkinstellingen.",
            clientText8: "Updates voor aangepaste apparaten",
            playVideo: "Video afspelen",
            aboutVersion: "Over deze versie",
            versionUpToDate: "Versie is up-to-date",
            networkTip: "U gebruikt het mobiele netwerk. Er zal data worden verbruikt.",
            findNewVersion: "Update beschikbaar",
            loading: "Laden...",
            networkError: "Netwerkfout",
            tryAgainLater: "Probeer het later opnieuw.",
            playVideoTip: "Kan vanwege netwerkfout niet afspelen",
            pageException: "Laden versie-informatie mislukt, maar u kunt het systeem nog steeds bijwerken.",
            loadFail: "Laden mislukt"
        },
        orIN: {
            clientText3: "ନୋଟ୍‌ ସମୂହ",
            clientText4: "ଏହି ଅଦ୍ୟତନ ବିଷୟରେ",
            clientText5: "ଅପଡେଟ୍‍‍ର ଲଗ୍‍",
            clientText6: "ସଂସ୍କରଣ ଅପ୍ ଟୁ ଡେଟ୍‌ ଅଛି",
            clientText7: "ଏହି ଅଦ୍ୟତନ ନିମ୍ନଲିଖିତରୁ ଗୋଟିଏ କିମ୍ବା ଅଧିକ ଅନ୍ତର୍ଭୁକ୍ତ କରୁଛି: ଆପ୍ ଗୁଡ଼ିକ, ୱାଲ୍‌ପେପର୍‌ ଗୁଡ଼ିକ, ରିଂଟୋନ୍ ଗୁଡ଼ିକ, ଷ୍ଟାର୍ଟ୍ଅପ୍ ଆନିମେସନ୍ ଗୁଡ଼ିକ, ହୋମ୍ ସ୍କ୍ରିନ୍ ଲେଆଉଟ୍ ଏବଂ ନେଟ୍‌ୱାର୍କ୍ ସେଟିଂସମୂହ।",
            clientText8: "କଷ୍ଟୋମାଇଜ୍ ହୋଇଥିବା ଡିଭାଇସ୍ ଗୁଡ଼ିକ ପାଇଁ ଅଦ୍ୟତନଗୁଡ଼ିକ",
            playVideo: "ଭିଡିଓ ପ୍ଲେ କରନ୍ତୁ",
            aboutVersion: "ଏହି ସଂସ୍କରଣ ବିଷୟରେ",
            versionUpToDate: "ସଂସ୍କରଣ ଅପ୍ ଟୁ ଡେଟ୍‌ ଅଛି",
            networkTip: "ଆପଣ ମୋବାଇଲ୍ ନେଟ୍‌ୱାର୍କ୍ ଟି ବ୍ୟବହାର କରୁଛନ୍ତି। ଡାଟା ବ୍ୟବହାର କରାହେବ।",
            findNewVersion: "ଅଦ୍ୟତନ ଉପଲବ୍ଧ",
            loading: "ଲୋଡ୍ ହେଉଛି...",
            networkError: "ନେଟ୍‌ୱାର୍କ୍ ତ୍ରୁଟି",
            tryAgainLater: "ଦୟାକରି ପରେ ପୁନଃଚେଷ୍ଟା କରନ୍ତୁ।",
            playVideoTip: "ନେଟ୍‌ୱାର୍କ୍ ତ୍ରୁଟି କାରଣରୁ ପ୍ଲେ ହେଇପାରୁ ନାହିଁ",
            pageException: "ସଂସ୍କରଣ ସୂଚନା ଲୋଡ୍ କରିବାରେ ବିଫଳ, କିନ୍ତୁ ତଥାପି ଆପଣ ସିଷ୍ଟମ୍ ଟି ଅଦ୍ୟତିତ କରିପାରିବେ।",
            loadFail: "ଲୋଡ୍ କରିବା ବିଫଳ ହେଲା"
        },
        paIN: {
            clientText3: "ਨੋਟਸ",
            clientText4: "ਇਸ ਅਪਡੇਟ ਬਾਰੇ",
            clientText5: "ਅੱਪਡੇਟ ਲੌਗ",
            clientText6: "ਵਰਜ਼ਨ ਨਵੀਨਤਮ ਹੈ",
            clientText7: "ਇਸ ਅੱਪਡੇਟ ਵਿੱਚ ਅੱਗੇ ਦਿੱਤਿਆਂ ਵਿੱਚੋਂ ਇੱਕ ਜਾਂ ਵੱਧ ਸ਼ਾਮਲ ਹਨ: ਐਪਾਂ, ਵਾਲਪੇਪਰ, ਰਿੰਗਟੋਨ, ਸਟਾਰਟਅੱਪ ਐਨੀਮੇਸ਼ਨ, ਹੋਮ ਸਕ੍ਰੀਨ ਲੇਆਉਟ ਅਤੇ ਨੈੱਟਵਰਕ ਸੈਟਿੰਗਾਂ।",
            clientText8: "ਕਸਟੋਮਾਈਜ਼ ਕੀਤੇ ਡਿਵਾਈਸਾਂ ਵਾਸਤੇ ਅੱਪਡੇਟ",
            playVideo: "ਵੀਡੀਓ ਚਲਾਓ",
            aboutVersion: "ਇਸ ਸੰਸਕਰਨ ਬਾਰੇ",
            versionUpToDate: "ਵਰਜ਼ਨ ਨਵੀਨਤਮ ਹੈ",
            networkTip: "ਤੁਸੀਂ ਇੱਕ ਮੋਬਾਈਲ ਨੈੱਟਵਰਕ ਦੀ ਵਰਤੋਂ ਕਰ ਰਹੇ ਹੋ। ਡਾਟਾ ਦੀ ਖ਼ਪਤ ਹੋਵੇਗੀ।",
            findNewVersion: "ਅਪਡੇਟ ਉਪਲਬਧ",
            loading: "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...",
            networkError: "ਨੈਟਵਰਕ ਅਸ਼ੁੱਧੀ",
            tryAgainLater: "ਕਿਰਪਾ ਕਰਕੇ ਬਾਅਦ ਵਿੱਚ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
            playVideoTip: "ਨੈਟਵਰਕ ਤਰੁਟੀ ਦੇ ਕਾਰਨ ਵੋਟ ਚਲਾਉਣ ਵਿੱਚ ਅਸਫਲ ਰਿਹਾ",
            pageException: "ਸੰਸਕਰਨ ਜਾਣਕਾਰੀ ਨੂੰ ਅਪਲੋਡ ਕਰਨਾ ਅਸਫ਼ਲ ਰਿਹਾ, ਪਰ ਤੁਸੀਂ ਅਜੇ ਵੀ ਸਿਸਟਮ ਨੂੰ ਅਪਡੇਟ ਕਰ ਸਕਦੇ ਹੋ।",
            loadFail: "ਲੋਡ ਕਰਨਾ ਅਸਫਲ"
        },
        plPL: {
            clientText3: "Uwagi",
            clientText4: "Informacje o tej aktualizacji",
            clientText5: "Dziennik aktualizacji",
            clientText6: "Wersja jest aktualna",
            clientText7: "Ta aktualizacja zawiera jeden lub więcej następujących elementów: aplikacje, tapety, dzwonki, animacje wyświetlane podczas uruchamiania, układ ekranu głównego i ustawienia sieciowe.",
            clientText8: "Aktualizacje personalizowanych urządzeń",
            playVideo: "Odtwórz film",
            aboutVersion: "Informacje o tej wersji",
            versionUpToDate: "Wersja jest aktualna",
            networkTip: "Używasz sieci komórkowej. Wymagana jest transmisja danych.",
            findNewVersion: "Dostępna aktualizacja",
            loading: "Ładowanie...",
            networkError: "Błąd sieci",
            tryAgainLater: "Spróbuj ponownie później.",
            playVideoTip: "Nie można odtworzyć z powodu błędu sieci",
            pageException: "Nie udało się załadować informacji o wersji, ale nadal możesz zaktualizować system.",
            loadFail: "Nie udało się załadować"
        },
        ptBR: {
            clientText3: "Notas",
            clientText4: "Sobre esta atualização",
            clientText5: "Log de atualização",
            clientText6: "Versão atualizada",
            clientText7: "Esta atualização inclui um ou mais dos seguintes: aplicativos, imagens de fundo, toques de celular, animações de inicialização, layout de tela inicial e configurações de rede.",
            clientText8: "Atualizações para dispositivos personalizados",
            playVideo: "Reproduzir vídeo",
            aboutVersion: "Sobre essa versão",
            versionUpToDate: "Versão atualizada",
            networkTip: "Você está usando a rede móvel. Haverá consumo de dados.",
            findNewVersion: "Atualização disponível",
            loading: "Carregando...",
            networkError: "Erro de rede",
            tryAgainLater: "Tente novamente mais tarde.",
            playVideoTip: "Não é possível reproduzir devido a erro de rede",
            pageException: "Falha ao carregar informações da versão, mas você ainda pode atualizar o sistema.",
            loadFail: "Falha no carregamento"
        },
        ptPT: {
            clientText3: "Notas",
            clientText4: "Informações sobre esta atualização",
            clientText5: "Atualizar registo",
            clientText6: "Versão atualizada",
            clientText7: "Esta atualização inclui um ou mais dos seguintes elementos: aplicações, papéis de parede, toques, animações de ativação, esquema do ecrã principal e definições de rede.",
            clientText8: "Atualizações para dispositivos personalizados",
            playVideo: "Reproduzir vídeo",
            aboutVersion: "Acerca desta versão",
            versionUpToDate: "Versão atualizada",
            networkTip: "Está a utilizar a rede móvel. Serão consumidos dados.",
            findNewVersion: "Atualização disponível",
            loading: "A carregar...",
            networkError: "Erro de rede",
            tryAgainLater: "Tente novamente mais tarde.",
            playVideoTip: "Não é possível reproduzir devido a erro da rede",
            pageException: "O carregamento da informação da versão falhou, mas ainda pode atualizar o sistema.",
            loadFail: "Falha ao carregar"
        },
        roRO: {
            clientText3: "Notițe",
            clientText4: "Despre această actualizare",
            clientText5: "Jurnal de actualizări",
            clientText6: "Versiunea este actualizată",
            clientText7: "Această actualizare include una sau mai multe dintre următoarele: aplicații, imagini de fundal, tonuri de apel, animații de pornire, aspectul ecranului principal și setări de rețea.",
            clientText8: "Actualizări pentru dispozitive personalizate",
            playVideo: "Redare clip video",
            aboutVersion: "Despre această versiune",
            versionUpToDate: "Versiunea este actualizată",
            networkTip: "Utilizați rețeaua mobilă. Se vor consuma date.",
            findNewVersion: "Actualizare disponibilă",
            loading: "Se încarcă...",
            networkError: "Eroare de rețea",
            tryAgainLater: "Reîncercați mai târziu.",
            playVideoTip: "Nu se poate reda din cauza unei erori de rețea",
            pageException: "Nu s-a reușit încărcarea informațiilor despre versiune, dar puteți actualiza sistemul.",
            loadFail: "Încărcare eșuată"
        },
        ruRU: {
            clientText3: "Примечания",
            clientText4: "Об этом обновлении",
            clientText5: "Журнал обновлений",
            clientText6: "Установлена последняя версия",
            clientText7: "Это обновление включает один или несколько следующих элементов: приложения, обои, рингтоны, анимации запуска, вид главного экрана и настройки сети.",
            clientText8: "Обновления для персонализированных устройств",
            playVideo: "Воспроизвести видео",
            aboutVersion: "Об этой версии",
            versionUpToDate: "Установлена последняя версия",
            networkTip: "В настоящий момент используется мобильная сеть. Будет расходоваться трафик данных.",
            findNewVersion: "Доступно обновление",
            loading: "Загрузка…",
            networkError: "Ошибка сети",
            tryAgainLater: "Повторите попытку позже.",
            playVideoTip: "Невозможно начать игру из-за сетевой ошибки",
            pageException: "Информация о версии не загружена, но систему все равно можно обновить.",
            loadFail: "Загрузка не выполнена"
        },
        siLK: {
            clientText3: "සටහන්",
            clientText4: "මෙම යාවත්කාලය ගැන",
            clientText5: "යාවත්කාල ලොගය",
            clientText6: "අනුවාදය යාවත්කාලීනයි",
            clientText7: "මෙම යාවත්කාලයට පහත සඳහන් ඒවායින් එකක්වත් හෝ වැඩි ගණනක් ඇතුළත් වේ: යෙදුම්, බිතුපත්, නාදරටා, ආරම්භ කිරීමේ සජීවීකරණ, මුල් තිර පිරිසැලසුම සහ ජාල සැකසුම්.",
            clientText8: "අභිරුචි කළ උපාංග සඳහා යාවත්කාල",
            playVideo: "වීඩියෝව වාදනය කරන්න",
            aboutVersion: "මෙම අනුවාදය ගැන",
            versionUpToDate: "අනුවාදය යාවත්කාලීනයි",
            networkTip: "ඔබ ජංගම ජාලය භාවිත කරමින් සිටී. දත්ත පරිභෝජනය කෙරෙනු ඇත.",
            findNewVersion: "යාවත්කාලයක් තිබේ",
            loading: "ප්‍රවේශනය වේ...",
            networkError: "ජාල දෝෂය",
            tryAgainLater: "කරුණාකර පසුව නැවත උත්සාහ කරන්න.",
            playVideoTip: "ජාල දෝෂය හේතුවෙන් වාදනය කිරීමට නොහැක",
            pageException: "අනුවාද තොරතුරු පැටවීමට අසමත් විය, නමුත් ඔබට තවමත් පද්ධතිය යාවත්කාලීන කළ හැකි ය.",
            loadFail: "පැටවීමට අසමත් විය"
        },
        skSK: {
            clientText3: "Poznámky",
            clientText4: "Informácie o tejto aktualizácii",
            clientText5: "Denník aktualizácie",
            clientText6: "Verzia je najnovšia",
            clientText7: "Táto aktualizácia obsahuje jednu alebo viacero z nasledujúcich položiek: aplikácie, tapety, zvonenia, animácie spustenia, rozloženie domovskej obrazovky alebo nastavenia siete.",
            clientText8: "Aktualizácie pre prispôsobené zariadenia",
            playVideo: "Prehrať video",
            aboutVersion: "Informácie o tejto verzii",
            versionUpToDate: "Verzia je najnovšia",
            networkTip: "Používate mobilnú sieť. Spotrebujú sa dáta.",
            findNewVersion: "Dostupná aktualizácia",
            loading: "Načítava sa...",
            networkError: "Chyba siete",
            tryAgainLater: "Skúste to znova neskôr.",
            playVideoTip: "Nemožno prehrať kvôli chybe siete",
            pageException: "Nepodarilo sa načítať informácie o verzii, ale systém môžete aktualizovať.",
            loadFail: "Načítavanie zlyhalo"
        },
        slSI: {
            clientText3: "Opombe",
            clientText4: "O tej posodobitvi",
            clientText5: "Dnevnik posodobitev",
            clientText6: "Različica je posodobljena.",
            clientText7: "Ta posodobitev vsebuje vsaj nekaj od tega: aplikacije, slike za ozadje, tone zvonjenja, animacije ob zagonu, postavitev začetnega zaslona ali nastavitve omrežja.",
            clientText8: "Posodobitve za prilagojene naprave",
            playVideo: "Predvajaj videoposnetek",
            aboutVersion: "O tej različici",
            versionUpToDate: "Različica je posodobljena.",
            networkTip: "Uporabljate mobilno omrežje. Porabljeni bodo podatki.",
            findNewVersion: "Na voljo je posodobitev.",
            loading: "Nalaganje …",
            networkError: "Napaka omrežja",
            tryAgainLater: "Poskusite znova pozneje.",
            playVideoTip: "Predvajanje ni mogoče zaradi omrežne napake.",
            pageException: "Informacij o različici ni bilo mogoče naložiti, vendar lahko še vedno posodobite sistem.",
            loadFail: "Nalaganje ni uspelo"
        },
        srRS: {
            clientText3: "Beleške",
            clientText4: "O ovoj ispravci",
            clientText5: "Evidencija ažuriranja",
            clientText6: "Ovo je već najnovija verzija",
            clientText7: "Ovo ažuriranje obuhvata najmanje jednu od sledećih stavki: aplikacije, pozadine, tonove zvona, animacije pri pokretanju, raspored na početnom ekranu i postavke mreže.",
            clientText8: "Ažuriranja za prilagođene uređaje",
            playVideo: "Reprodukuj video",
            aboutVersion: "O ovoj verziji",
            versionUpToDate: "Ovo je već najnovija verzija",
            networkTip: "Koristite mobilnu mrežu. Potrošiće se podaci.",
            findNewVersion: "Dostupna je ispravka",
            loading: "Učitava se...",
            networkError: "Greška mreže",
            tryAgainLater: "Pokušajte ponovo kasnije.",
            playVideoTip: "Nije moguće igrati zbog greške na mreži",
            pageException: "Nije uspelo učitavanje informacija o verziji, ali i dalje možete da ažurirate sistem.",
            loadFail: "Učitavanje nije uspelo"
        },
        svSE: {
            clientText3: "Anteckningar",
            clientText4: "Om den här uppdateringen",
            clientText5: "Uppdateringslogg",
            clientText6: "Versionen är aktuell",
            clientText7: "Den här uppdateringen inkluderar en eller flera av följande: appar, bakgrundsbilder, ringsignaler, animeringar vid start, hemskärmslayout och nätverksinställningar.",
            clientText8: "Uppdateringar för anpassade enheter",
            playVideo: "Spela upp video",
            aboutVersion: "Om denna version",
            versionUpToDate: "Versionen är aktuell",
            networkTip: "Du använder mobilnätet. Data kommer att förbrukas.",
            findNewVersion: "Uppdatering tillgänglig",
            loading: "Läser in...",
            networkError: "Nätverksfel",
            tryAgainLater: "Försök igen senare.",
            playVideoTip: "Det går inte att spela upp på grund av ett nätverksfel",
            pageException: "Det gick inte att läsa in versionsinformationen, men du kan fortfarande uppdatera systemet.",
            loadFail: "Inläsning misslyckades"
        },
        swKE: {
            clientText3: "Vidokezo",
            clientText4: "Kuhusu sasisho hili",
            clientText5: "Batli ya sasisho",
            clientText6: "Toleo limesasishwa",
            clientText7: "Sasisho hili linajumuisha moja au zaidi ya zifuatazo: programu, pazia, milio ya simu, uhuishaji wa kuanza, Mpangilio wa skrini ya mwanzo, na mipangilio ya mtandao.",
            clientText8: "Sasisho za vifaa vilivyogeuzwa kukufaa",
            playVideo: "Cheza video",
            aboutVersion: "Kuhusu toleo hili",
            versionUpToDate: "Toleo limesasishwa",
            networkTip: "Unatumia mtandao wa rununu. Data itatumika.",
            findNewVersion: "Sasisho lapatikana",
            loading: "Inapakia...",
            networkError: "Hitilafu ya mtandao",
            tryAgainLater: "Tafadhali jaribu tena baadaye.",
            playVideoTip: "Haiwezi kuchezwa kwa sababu ya hitilafu ya mtandao",
            pageException: "Imeshindwa kupakia maelezo ya toleo, lakini bado unaweza kusasisha mfumo.",
            loadFail: "Imeshindwa kupakia"
        },
        taIN: {
            clientText3: "குறிப்புகள்",
            clientText4: "இந்தப் புதுப்பிப்பைப் பற்றி",
            clientText5: "புதுப்பிப்புப் பதிவு",
            clientText6: "புதுப்பிக்கப்பட்ட பதிப்பு",
            clientText7: "இந்தப் புதுப்பிப்பில் பின்வருவனவற்றில் ஒன்று அல்லது அதற்கு மேற்பட்டவை உள்ளன: செயலிகள், வால்பேப்பர்கள், ரிங்டோன்கள், தொடக்க அனிமேஷன்கள், முகப்புத் திரை தளவமைப்பு மற்றும் நெட்வொர்க் அமைப்புகள்.",
            clientText8: "தனிப்பயனாக்கிய சாதனங்களுக்கான புதுப்பிப்புகள்",
            playVideo: "வீடியோவை இயக்கு",
            aboutVersion: "இந்தப் பதிப்பைப் பற்றி",
            versionUpToDate: "புதுப்பிக்கப்பட்ட பதிப்பு",
            networkTip: "மொபைல் நெட்வொர்க்கை உபயோகிக்கிறீர்கள். தரவு பயன்படுத்தப்படும்.",
            findNewVersion: "புதுப்பிப்பு உள்ளது",
            loading: "ஏற்றுகிறது...",
            networkError: "நெட்வொர்க் பிழை",
            tryAgainLater: "பிறகு முயலவும்.",
            playVideoTip: "நெட்வொர்க் பிழையால் இயக்க முடியவில்லை",
            pageException: "பதிப்புத் தகவலை ஏற்ற முடியவில்லை, எனினும் நீங்கள் தொடர்ந்து சிஸ்டத்தைப் புதுப்பிக்கலாம்.",
            loadFail: "ஏற்றுவது தோல்வி"
        },
        teIN: {
            clientText3: "గమనికలు",
            clientText4: "ఈ అప్‌డేట్ గురించి",
            clientText5: "అప్‌డేట్ లాగ్‌ని",
            clientText6: "సంస్కరణ అప్‌డేట్ అయ్యి ఉంది",
            clientText7: "ఈ అప్‌డేట్ క్రింది వాటిలో ఒకటి లేదా మరిన్నింటిని కలిగి ఉంటుంది: యాప్‌లు, వాల్‌పేపర్‌లు, రింగ్‌టోన్‌లు, స్టార్ట్ఆప్‌లు/షట్‌డౌన్ యానిమేషన్‌లు, హోమ్ స్క్రీన్ లేఅవుట్ మరియు నెట్‌వర్క్ సెట్టింగ్‌లు.",
            clientText8: "అనుకూలీకరించిన పరికరాల కోసం అప్‌డేట్‌లు",
            playVideo: "వీడియోను ప్లే చేయి",
            aboutVersion: "ఈ సంస్కరణ గురించి",
            versionUpToDate: "సంస్కరణ అప్‌డేట్ అయ్యి ఉంది",
            networkTip: "మీరు మొబైల్ నెట్‌వర్క్‌ను ఉపయోగిస్తున్నారు. డేటా వినియోగించబడుతుంది.",
            findNewVersion: "అప్‌డేట్ అందుబాటులో ఉంది",
            loading: "లోడింగ్...",
            networkError: "నెట్‌వర్క్ ఎర్రర్",
            tryAgainLater: "దయచేసి తర్వాత మళ్లీ ప్రయత్నించండి.",
            playVideoTip: "నెట్‌వర్క్ దోషం వల్ల ఆడడం కుదరడం లేదు",
            pageException: "వెర్షన్ సమాచారాన్ని లోడ్ చేయడంలో విఫలమైంది, కానీ మీరు ఇప్పటికీ సిస్టమ్‌ను అప్‌డేట్ చేయవచ్చు.",
            loadFail: "లోడ్ చేయడం విఫలమైంది"
        },
        thTH: {
            clientText3: "หมายเหตุ",
            clientText4: "เกี่ยวกับการอัพเดตครั้งนี้",
            clientText5: "บันทึกการอัพเดต",
            clientText6: "เวอร์ชั่นเป็นปัจจุบันแล้ว",
            clientText7: "การอัพเดตประกอบด้วยอย่างน้อยหนึ่งรายการดังนี้: แอป ภาพพื้นหลัง เสียงเรียกเข้า แอนิเมชันเมื่อเปิดเครื่อง การจัดวางหน้าจอหลัก และการตั้งค่าเครือข่าย",
            clientText8: "รายการอัพเดตสำหรับอุปกรณ์ที่มีการกำหนดเอง",
            playVideo: "เล่นวิดีโอ",
            aboutVersion: "เกี่ยวกับเวอร์ชันนี้",
            versionUpToDate: "เวอร์ชั่นเป็นปัจจุบันแล้ว",
            networkTip: "คุณกำลังใช้เครือข่ายโทรศัพท์มือถือ ระบบจะใช้ข้อมูลเครือข่าย",
            findNewVersion: "มีอัพเดตพร้อมใช้งาน",
            loading: "กำลังโหลด...",
            networkError: "ข้อผิดพลาดทางเครือข่าย",
            tryAgainLater: "โปรดลองอีกครั้งในภายหลัง",
            playVideoTip: "ไม่สามารถเล่นได้เนื่องจากข้อผิดพลาดของเครือข่าย",
            pageException: "การโหลดข้อมูลเวอร์ชันล้มเหลว แต่คุณยังสามารถอัพเดตระบบได้",
            loadFail: "การโหลดล้มเหลว"
        },
        trTR: {
            clientText3: "Notlar",
            clientText4: "Bu güncelleme hakkında",
            clientText5: "Güncelleme günlüğü",
            clientText6: "Sürüm güncel",
            clientText7: "Bu güncelleme şunlardan birini veya daha fazlasını içerir: uygulamalar, duvar kağıtları, zil sesleri, başlangıç animasyonları, Ana Ekran yerleşimi ve ağ ayarları.",
            clientText8: "Özelleştirilmiş cihazlar için güncellemeler",
            playVideo: "Videoyu oynat",
            aboutVersion: "Bu sürüm hakkında",
            versionUpToDate: "Sürüm güncel",
            networkTip: "Mobil ağ kullanıyorsunuz. Veri kullanılacaktır.",
            findNewVersion: "Güncelleme mevcut",
            loading: "Yükleniyor...",
            networkError: "Ağ hatası",
            tryAgainLater: "Lütfen daha sonra tekrar deneyin.",
            playVideoTip: "Ağ hatasından dolayı çalınamıyor",
            pageException: "Sürüm bilgisi yüklenemedi, ancak sistemi güncellemeye devam edebilirsiniz.",
            loadFail: "Yüklenemedi"
        },
        ugCN: {
            clientText3: "دىققەت قىلىدىغان ئىشلار",
            clientText4: "نەشر نۇسخىسى ئالاھىدىلىكى",
            clientText5: "يېڭىلاش خاتىرىسى",
            clientText6: "بۇ ئەڭ يېڭى نەشرى",
            clientText7: "يېڭىلانغان مەزمۇن تۆۋەندىكىدەك بىر خىل ياكى كۆپ خىل بولىدۇ: ئەپ، تەگلىك، قوڭغۇراق، ئۈسكۈنىنىڭ ئېچىلىش-ئېتىلىش ھەرىكەتلىك رەسىمى، ئۈستەليۈزى ئورۇنلاشتۇرۇلۇشى، تور قاتارلىقلارنى ئۆز ئىچىگە ئالىدۇ.",
            clientText8: "بۇيرۇتما يېڭىلانمىسى",
            playVideo: "سىن كۆرۈش",
            aboutVersion: "نەشر تەپسىلاتى",
            versionUpToDate: "بۇ ئەڭ يېڭى نەشرى",
            networkTip: "ئىشلىتىۋاتقىنىڭىز ئېقىم تورى، ئېقىم سەرپىياتىغا دىققەت قىلىڭ.",
            findNewVersion: "يېڭى نەشر بايقالدى",
            loading: "يۈكلەۋاتىدۇ...",
            networkError: "تور بىنورمال",
            tryAgainLater: "سەل تۇرۇپ قايتا سىناڭ",
            playVideoTip: "تور ئۇلىنىش خاتالىقى، سىننى قويغىلى بولمىدى",
            pageException: "توربەت بىنورمال، نەشر ئۇچۇرى يۈكلەنمىدى، سىستېما يېڭىلاشنى نورمال ئېلىپ بارغىلى بولىدۇ",
            loadFail: "يۈكلەنمىدى"
        },
        ukUA: {
            clientText3: "Примітки",
            clientText4: "Про це оновлення",
            clientText5: "Журнал оновлень",
            clientText6: "Установлено найновішу версію",
            clientText7: "Це оновлення містить один або кілька із цих компонентів: програми, шпалери, мелодії, анімацію ввімкнення, макет початкового екрана або параметри мережі.",
            clientText8: "Оновлення для налаштованих пристроїв",
            playVideo: "Відтворити відео",
            aboutVersion: "Інформація про цю версію",
            versionUpToDate: "Установлено найновішу версію",
            networkTip: "Ви використовуєте мобільну мережу. Споживатиметься мобільний трафік.",
            findNewVersion: "Доступно оновлення",
            loading: "Завантаження...",
            networkError: "Помилка мережі",
            tryAgainLater: "Спробуйте ще раз пізніше.",
            playVideoTip: "Не вдається відтворити через помилку мережі",
            pageException: "Не вдалося завантажити інформацію про версію, однак ви й досі можете оновити систему.",
            loadFail: "Не вдалося завантажити"
        },
        urPK: {
            clientText3: "نوٹس",
            clientText4: "اس تازہ کاری کے متعلق",
            clientText5: "تازہ کاری کا لاگ",
            clientText6: "ورژن تازہ ترین ہے",
            clientText7: "اس تازہ کاری میں مندرجہ ذیل میں سے ایک یا زیادہ شامل ہیں: ایپس، وال پیپرز، رِنگ ٹونز، اسٹارٹ اپ اینیمیشنز، ابتدائی اسکرین لے آؤٹ اور نیٹ ورک ترتیبات۔",
            clientText8: "کسٹمائز شدہ ڈیوائسز کے لیے تازہ کاریاں",
            playVideo: "ویڈیو چلائیں",
            aboutVersion: "اس ورژن کے متعلق",
            versionUpToDate: "ورژن تازہ ترین ہے",
            networkTip: "آپ موبائل نیٹ ورک استعمال کر رہے ہیں۔ ڈیٹا صرف ہو گا۔",
            findNewVersion: "تازہ کاری دستیاب",
            loading: "لوڈ کیا جا رہا ہے...",
            networkError: "نیٹ ورک نقص",
            tryAgainLater: "براہِ کرم بعد میں پھر کوشش کریں۔",
            playVideoTip: "نیٹ ورک میں نقص کی وجہ سے کھیلا نہیں جا سکتا",
            pageException: "ورژن کی معلومات لوڈ نہیں کی جا سکیں، لیکن آپ ابھی بھی سسٹم کی تازہ کاری کر سکتے ہیں۔",
            loadFail: "لوڈنگ ناکام"
        },
        uzUZ: {
            clientText3: "Eslatmalar",
            clientText4: "Bu yangilanish haqida",
            clientText5: "Yangilash jurnali",
            clientText6: "Versiya yangilangan",
            clientText7: "Bu yangilanish quyidagilarning bittasi yoki bir nechtasini oʻz ichiga oladi: ilovalar, fon rasmlari, ringtonlar, ishga tushish animatsiyalari, Bosh ekran sxemasi va tarmoq sozlamalari.",
            clientText8: "Moslangan qurilmalar uchun yangilanishlar",
            playVideo: "Videoni ijro etish",
            aboutVersion: "Bu versiya haqida",
            versionUpToDate: "Versiya yangilangan",
            networkTip: "Mobil tarmoqdan foydalanyapsiz. Mobil internet-trafik sarflanadi.",
            findNewVersion: "Yangilanish mavjud",
            loading: "Yuklanmoqda...",
            networkError: "Tarmoqda xatolik yuz berdi",
            tryAgainLater: "Keyinroq qayta urining.",
            playVideoTip: "Tarmoqda xatolik yuz bergani tufayli ijro etilmadi",
            pageException: "Versiya axboroti yuklanmadi, lekin tizimni yangilashingiz mumkin.",
            loadFail: "Yuklanmadi"
        },
        viVN: {
            clientText3: "Lưu ý",
            clientText4: "Giới thiệu về bản cập nhật này",
            clientText5: "Nhật ký cập nhật",
            clientText6: "Phiên bản đã cập nhật",
            clientText7: "Bản cập nhật này bao gồm một trong các mục sau: ứng dụng, hình nền, nhạc chuông, hình động khởi động, bố cục Màn hình chính và cài đặt mạng.",
            clientText8: "Bản cập nhật dành cho thiết bị được tùy chỉnh",
            playVideo: "Phát video",
            aboutVersion: "Giới thiệu về phiên bản này",
            versionUpToDate: "Phiên bản đã cập nhật",
            networkTip: "Bạn đang sử dụng mạng di động. Bạn sẽ tiêu thụ dữ liệu.",
            findNewVersion: "Đã có bản cập nhật",
            loading: "Đang tải...",
            networkError: "Lỗi mạng",
            tryAgainLater: "Vui lòng thử lại sau.",
            playVideoTip: "Không thể phát do lỗi mạng",
            pageException: "Không tải được thông tin phiên bản nhưng bạn vẫn có thể cập nhật hệ thống.",
            loadFail: "Không tải được"
        },
        zhCN: {
            clientText: "1. 本次升级不会删除或更改你的数据，但仍建议你在更新前做好数据备份，同时预留足够的存储空间。\n2. 在使用过程中遇到任何问题可联系官方客服进行反馈和咨询。\n3. 升级后安装包会自动删除，不会占用存储空间。\n",
            clientText1: "1. 本次升级不会删除你的数据，但仍建议你在更新前做好数据备份，同时预留足够的存储空间。\n2. 升级后，系统后台会进行一系列适配优化，设备可能会出现短暂的发热、卡顿、耗电现象，使用一段时间后将恢复正常。\n3. 部分三方应用可能与新的 Android 版本不兼容，更新后可能会出现三方应用无法正常使用的情况，建议将该应用更新至最新版本或等待三方应用适配。\n4. 在使用过程中遇到任何问题可联系官方客服进行反馈和咨询。\n5. 升级后安装包会自动删除，不会占用存储空间。\n",
            clientText2: "查看更多内容和参与讨论，请登录：",
            clientText3: "注意事项",
            clientText4: "版本特性",
            clientText5: "更新日志",
            clientText6: "已是最新版本",
            clientText7: "更新内容包括如下一种或多种：应用、壁纸、铃声、开关机动画、桌面布局、网络等。",
            clientText8: "定制更新",
            playVideo: "观看视频",
            aboutVersion: "版本详情",
            versionUpToDate: "已是最新版本",
            networkTip: "当前是数据网络，注意流量消耗。",
            findNewVersion: "发现新版本",
            loading: "正在加载…",
            networkError: "网络异常",
            tryAgainLater: "请稍后重试",
            playVideoTip: "网络连接错误，无法播放视频",
            loadFail: "加载失败",
            pageException: "页面异常，无法加载版本信息，可正常进行系统更新"
        },
        zhHK: {
            clientText: "1. 本次升级不会删除或更改你的数据，但仍建议你在更新前做好数据备份，同时预留足够的存储空间。\n2. 在使用过程中遇到任何问题可联系官方客服进行反馈和咨询。\n3. 升级后安装包会自动删除，不会占用存储空间。\n",
            clientText1: "1. 本次升级不会删除你的数据，但仍建议你在更新前做好数据备份，同时预留足够的存储空间。\n2. 升级后，系统后台会进行一系列适配优化，设备可能会出现短暂的发热、卡顿、耗电现象，使用一段时间后将恢复正常。\n3. 部分三方应用可能与新的 Android 版本不兼容，更新后可能会出现三方应用无法正常使用的情况，建议将该应用更新至最新版本或等待三方应用适配。\n4. 在使用过程中遇到任何问题可联系官方客服进行反馈和咨询。\n5. 升级后安装包会自动删除，不会占用存储空间。\n",
            clientText2: "查看更多内容和参与讨论，请登录：",
            clientText3: "注意事項",
            clientText4: "版本特性",
            clientText5: "更新日誌",
            clientText6: "已是最新版本",
            clientText7: "更新內容包括下列的一種或多種：應用程式、桌布、鈴聲、開關機動畫、主螢幕佈局、網絡等。",
            clientText8: "定制更新",
            playVideo: "觀看影片",
            aboutVersion: "版本詳情",
            versionUpToDate: "已是最新版本",
            networkTip: "目前是數據網絡，注意流動數據消耗。",
            findNewVersion: "發現新版本",
            loading: "正在載入...",
            networkError: "網絡異常",
            tryAgainLater: "請稍後重試",
            playVideoTip: "網絡連線錯誤，無法播放影片",
            pageException: "頁面異常，無法載入版本資訊，可正常進行系統更新",
            loadFail: "載入失敗"
        },
        zhTW: {
            clientText: "1. 本次升级不会删除或更改你的数据，但仍建议你在更新前做好数据备份，同时预留足够的存储空间。\n2. 在使用过程中遇到任何问题可联系官方客服进行反馈和咨询。\n3. 升级后安装包会自动删除，不会占用存储空间。\n",
            clientText1: "1. 本次升级不会删除你的数据，但仍建议你在更新前做好数据备份，同时预留足够的存储空间。\n2. 升级后，系统后台会进行一系列适配优化，设备可能会出现短暂的发热、卡顿、耗电现象，使用一段时间后将恢复正常。\n3. 部分三方应用可能与新的 Android 版本不兼容，更新后可能会出现三方应用无法正常使用的情况，建议将该应用更新至最新版本或等待三方应用适配。\n4. 在使用过程中遇到任何问题可联系官方客服进行反馈和咨询。\n5. 升级后安装包会自动删除，不会占用存储空间。\n",
            clientText2: "查看更多内容和参与讨论，请登录：",
            clientText3: "注意事項",
            clientText4: "版本特性",
            clientText5: "更新日誌",
            clientText6: "已是最新版本",
            clientText7: "更新內容包括如下一種或多種：應用程式、桌布、鈴聲、開關機動畫、桌面配置、網路等。",
            clientText8: "客製化更新",
            playVideo: "觀看影片",
            aboutVersion: "版本詳細資料",
            versionUpToDate: "已是最新版本",
            networkTip: "目前是數據網路，注意流量消耗。",
            findNewVersion: "發現新版本",
            loading: "正在載入...",
            networkError: "網路異常",
            tryAgainLater: "請稍後重試",
            playVideoTip: "網路連線錯誤，無法播放影片",
            pageException: "頁面異常，無法載入版本資訊，可正常進行系統更新",
            loadFail: "載入失敗"
        }
    }
}), ys = "undefined" != typeof window;
const ms = Object.assign;

function vs(e, t) {
    const n = {};
    for (const r in t) {
        const i = t[r];
        n[r] = bs(i) ? i.map(e) : e(i)
    }
    return n
}

const xs = () => {
}, bs = Array.isArray, ks = /\/$/, ws = e => e.replace(ks, "");

function _s(e, t, n = "/") {
    let r, i = {}, a = "", o = "";
    const l = t.indexOf("#");
    let s = t.indexOf("?");
    return l < s && l >= 0 && (s = -1), s > -1 && (r = t.slice(0, s), a = t.slice(s + 1, l > -1 ? l : t.length), i = e(a)), l > -1 && (r = r || t.slice(0, l), o = t.slice(l, t.length)), r = function (e, t) {
        if (e.startsWith("/")) return e;
        if (!e) return t;
        const n = t.split("/"), r = e.split("/");
        let i, a, o = n.length - 1;
        for (i = 0; i < r.length; i++) if (a = r[i], "." !== a) {
            if (".." !== a) break;
            o > 1 && o--
        }
        return n.slice(0, o).join("/") + "/" + r.slice(i - (i === r.length ? 1 : 0)).join("/")
    }(null != r ? r : t, n), {fullPath: r + (a && "?") + a + o, path: r, query: i, hash: o}
}

function Ts(e, t) {
    return t && e.toLowerCase().startsWith(t.toLowerCase()) ? e.slice(t.length) || "/" : e
}

function Es(e, t) {
    return (e.aliasOf || e) === (t.aliasOf || t)
}

function Cs(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const n in e) if (!Ls(e[n], t[n])) return !1;
    return !0
}

function Ls(e, t) {
    return bs(e) ? Os(e, t) : bs(t) ? Os(t, e) : e === t
}

function Os(e, t) {
    return bs(t) ? e.length === t.length && e.every(((e, n) => e === t[n])) : 1 === e.length && e[0] === t
}

var Ss, Ps, As, Rs;
(Ps = Ss || (Ss = {})).pop = "pop", Ps.push = "push", (Rs = As || (As = {})).back = "back", Rs.forward = "forward", Rs.unknown = "";
const Ns = /^[^#]+#/;

function Is(e, t) {
    return e.replace(Ns, "#") + t
}

const js = () => ({left: window.pageXOffset, top: window.pageYOffset});

function Ds(e) {
    let t;
    if ("el" in e) {
        const n = e.el, r = "string" == typeof n && n.startsWith("#"),
            i = "string" == typeof n ? r ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
        if (!i) return;
        t = function (e, t) {
            const n = document.documentElement.getBoundingClientRect(), r = e.getBoundingClientRect();
            return {behavior: t.behavior, left: r.left - n.left - (t.left || 0), top: r.top - n.top - (t.top || 0)}
        }(i, e)
    } else t = e;
    "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(null != t.left ? t.left : window.pageXOffset, null != t.top ? t.top : window.pageYOffset)
}

function Ms(e, t) {
    return (history.state ? history.state.position - t : -1) + e
}

const zs = new Map;
let Vs = () => location.protocol + "//" + location.host;

function Fs(e, t) {
    const {pathname: n, search: r, hash: i} = t, a = e.indexOf("#");
    if (a > -1) {
        let t = i.includes(e.slice(a)) ? e.slice(a).length : 1, n = i.slice(t);
        return "/" !== n[0] && (n = "/" + n), Ts(n, "")
    }
    return Ts(n, e) + r + i
}

function Us(e, t, n, r = !1, i = !1) {
    return {back: e, current: t, forward: n, replaced: r, position: window.history.length, scroll: i ? js() : null}
}

function Bs(e) {
    const t = function (e) {
        const {history: t, location: n} = window, r = {value: Fs(e, n)}, i = {value: t.state};

        function a(r, a, o) {
            const l = e.indexOf("#"),
                s = l > -1 ? (n.host && document.querySelector("base") ? e : e.slice(l)) + r : Vs() + e + r;
            try {
                t[o ? "replaceState" : "pushState"](a, "", s), i.value = a
            } catch (c) {
                n[o ? "replace" : "assign"](s)
            }
        }

        return i.value || a(r.value, {
            back: null,
            current: r.value,
            forward: null,
            position: t.length - 1,
            replaced: !0,
            scroll: null
        }, !0), {
            location: r, state: i, push: function (e, n) {
                const o = ms({}, i.value, t.state, {forward: e, scroll: js()});
                a(o.current, o, !0), a(e, ms({}, Us(r.value, e, null), {position: o.position + 1}, n), !1), r.value = e
            }, replace: function (e, n) {
                a(e, ms({}, t.state, Us(i.value.back, e, i.value.forward, !0), n, {position: i.value.position}), !0), r.value = e
            }
        }
    }(e = function (e) {
        if (!e) if (ys) {
            const t = document.querySelector("base");
            e = (e = t && t.getAttribute("href") || "/").replace(/^\w+:\/\/[^\/]+/, "")
        } else e = "/";
        return "/" !== e[0] && "#" !== e[0] && (e = "/" + e), ws(e)
    }(e)), n = function (e, t, n, r) {
        let i = [], a = [], o = null;
        const l = ({state: a}) => {
            const l = Fs(e, location), s = n.value, c = t.value;
            let u = 0;
            if (a) {
                if (n.value = l, t.value = a, o && o === s) return void (o = null);
                u = c ? a.position - c.position : 0
            } else r(l);
            i.forEach((e => {
                e(n.value, s, {delta: u, type: Ss.pop, direction: u ? u > 0 ? As.forward : As.back : As.unknown})
            }))
        };

        function s() {
            const {history: e} = window;
            e.state && e.replaceState(ms({}, e.state, {scroll: js()}), "")
        }

        return window.addEventListener("popstate", l), window.addEventListener("beforeunload", s), {
            pauseListeners: function () {
                o = n.value
            }, listen: function (e) {
                i.push(e);
                const t = () => {
                    const t = i.indexOf(e);
                    t > -1 && i.splice(t, 1)
                };
                return a.push(t), t
            }, destroy: function () {
                for (const e of a) e();
                a = [], window.removeEventListener("popstate", l), window.removeEventListener("beforeunload", s)
            }
        }
    }(e, t.state, t.location, t.replace);
    const r = ms({
        location: "", base: e, go: function (e, t = !0) {
            t || n.pauseListeners(), history.go(e)
        }, createHref: Is.bind(null, e)
    }, t, n);
    return Object.defineProperty(r, "location", {
        enumerable: !0,
        get: () => t.location.value
    }), Object.defineProperty(r, "state", {enumerable: !0, get: () => t.state.value}), r
}

function Hs(e) {
    return "string" == typeof e || "symbol" == typeof e
}

const Ws = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0
}, qs = Symbol("");
var $s, Ys;

function Ks(e, t) {
    return ms(new Error, {type: e, [qs]: !0}, t)
}

function Gs(e, t) {
    return e instanceof Error && qs in e && (null == t || !!(e.type & t))
}

(Ys = $s || ($s = {}))[Ys.aborted = 4] = "aborted", Ys[Ys.cancelled = 8] = "cancelled", Ys[Ys.duplicated = 16] = "duplicated";
const Xs = "[^/]+?", Js = {sensitive: !1, strict: !1, start: !0, end: !0}, Zs = /[.+*?^${}()[\]/\\]/g;

function Qs(e, t) {
    let n = 0;
    for (; n < e.length && n < t.length;) {
        const r = t[n] - e[n];
        if (r) return r;
        n++
    }
    return e.length < t.length ? 1 === e.length && 80 === e[0] ? -1 : 1 : e.length > t.length ? 1 === t.length && 80 === t[0] ? 1 : -1 : 0
}

function ec(e, t) {
    let n = 0;
    const r = e.score, i = t.score;
    for (; n < r.length && n < i.length;) {
        const e = Qs(r[n], i[n]);
        if (e) return e;
        n++
    }
    if (1 === Math.abs(i.length - r.length)) {
        if (tc(r)) return 1;
        if (tc(i)) return -1
    }
    return i.length - r.length
}

function tc(e) {
    const t = e[e.length - 1];
    return e.length > 0 && t[t.length - 1] < 0
}

const nc = {type: 0, value: ""}, rc = /[a-zA-Z0-9_]/;

function ic(e, t, n) {
    const r = function (e, t) {
        const n = ms({}, Js, t), r = [];
        let i = n.start ? "^" : "";
        const a = [];
        for (const s of e) {
            const e = s.length ? [] : [90];
            n.strict && !s.length && (i += "/");
            for (let t = 0; t < s.length; t++) {
                const r = s[t];
                let o = 40 + (n.sensitive ? .25 : 0);
                if (0 === r.type) t || (i += "/"), i += r.value.replace(Zs, "\\$&"), o += 40; else if (1 === r.type) {
                    const {value: e, repeatable: n, optional: c, regexp: u} = r;
                    a.push({name: e, repeatable: n, optional: c});
                    const p = u || Xs;
                    if (p !== Xs) {
                        o += 10;
                        try {
                            new RegExp(`(${p})`)
                        } catch (l) {
                            throw new Error(`Invalid custom RegExp for param "${e}" (${p}): ` + l.message)
                        }
                    }
                    let d = n ? `((?:${p})(?:/(?:${p}))*)` : `(${p})`;
                    t || (d = c && s.length < 2 ? `(?:/${d})` : "/" + d), c && (d += "?"), i += d, o += 20, c && (o += -8), n && (o += -20), ".*" === p && (o += -50)
                }
                e.push(o)
            }
            r.push(e)
        }
        if (n.strict && n.end) {
            const e = r.length - 1;
            r[e][r[e].length - 1] += .7000000000000001
        }
        n.strict || (i += "/?"), n.end ? i += "$" : n.strict && (i += "(?:/|$)");
        const o = new RegExp(i, n.sensitive ? "" : "i");
        return {
            re: o, score: r, keys: a, parse: function (e) {
                const t = e.match(o), n = {};
                if (!t) return null;
                for (let r = 1; r < t.length; r++) {
                    const e = t[r] || "", i = a[r - 1];
                    n[i.name] = e && i.repeatable ? e.split("/") : e
                }
                return n
            }, stringify: function (t) {
                let n = "", r = !1;
                for (const i of e) {
                    r && n.endsWith("/") || (n += "/"), r = !1;
                    for (const e of i) if (0 === e.type) n += e.value; else if (1 === e.type) {
                        const {value: a, repeatable: o, optional: l} = e, s = a in t ? t[a] : "";
                        if (bs(s) && !o) throw new Error(`Provided param "${a}" is an array but it is not repeatable (* or + modifiers)`);
                        const c = bs(s) ? s.join("/") : s;
                        if (!c) {
                            if (!l) throw new Error(`Missing required param "${a}"`);
                            i.length < 2 && (n.endsWith("/") ? n = n.slice(0, -1) : r = !0)
                        }
                        n += c
                    }
                }
                return n || "/"
            }
        }
    }(function (e) {
        if (!e) return [[]];
        if ("/" === e) return [[nc]];
        if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);

        function t(e) {
            throw new Error(`ERR (${n})/"${c}": ${e}`)
        }

        let n = 0, r = n;
        const i = [];
        let a;

        function o() {
            a && i.push(a), a = []
        }

        let l, s = 0, c = "", u = "";

        function p() {
            c && (0 === n ? a.push({
                type: 0,
                value: c
            }) : 1 === n || 2 === n || 3 === n ? (a.length > 1 && ("*" === l || "+" === l) && t(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`), a.push({
                type: 1,
                value: c,
                regexp: u,
                repeatable: "*" === l || "+" === l,
                optional: "*" === l || "?" === l
            })) : t("Invalid state to consume buffer"), c = "")
        }

        function d() {
            c += l
        }

        for (; s < e.length;) if (l = e[s++], "\\" !== l || 2 === n) switch (n) {
            case 0:
                "/" === l ? (c && p(), o()) : ":" === l ? (p(), n = 1) : d();
                break;
            case 4:
                d(), n = r;
                break;
            case 1:
                "(" === l ? n = 2 : rc.test(l) ? d() : (p(), n = 0, "*" !== l && "?" !== l && "+" !== l && s--);
                break;
            case 2:
                ")" === l ? "\\" == u[u.length - 1] ? u = u.slice(0, -1) + l : n = 3 : u += l;
                break;
            case 3:
                p(), n = 0, "*" !== l && "?" !== l && "+" !== l && s--, u = "";
                break;
            default:
                t("Unknown state")
        } else r = n, n = 4;
        return 2 === n && t(`Unfinished custom RegExp for param "${c}"`), p(), o(), i
    }(e.path), n), i = ms(r, {record: e, parent: t, children: [], alias: []});
    return t && !i.record.aliasOf == !t.record.aliasOf && t.children.push(i), i
}

function ac(e, t) {
    const n = [], r = new Map;

    function i(e, n, r) {
        const l = !r, s = function (e) {
            return {
                path: e.path,
                redirect: e.redirect,
                name: e.name,
                meta: e.meta || {},
                aliasOf: void 0,
                beforeEnter: e.beforeEnter,
                props: lc(e),
                children: e.children || [],
                instances: {},
                leaveGuards: new Set,
                updateGuards: new Set,
                enterCallbacks: {},
                components: "components" in e ? e.components || null : e.component && {default: e.component}
            }
        }(e);
        s.aliasOf = r && r.record;
        const c = uc(t, e), u = [s];
        if ("alias" in e) {
            const t = "string" == typeof e.alias ? [e.alias] : e.alias;
            for (const e of t) u.push(ms({}, s, {
                components: r ? r.record.components : s.components,
                path: e,
                aliasOf: r ? r.record : s
            }))
        }
        let p, d;
        for (const t of u) {
            const {path: u} = t;
            if (n && "/" !== u[0]) {
                const e = n.record.path, r = "/" === e[e.length - 1] ? "" : "/";
                t.path = n.record.path + (u && r + u)
            }
            if (p = ic(t, n, c), r ? r.alias.push(p) : (d = d || p, d !== p && d.alias.push(p), l && e.name && !sc(p) && a(e.name)), s.children) {
                const e = s.children;
                for (let t = 0; t < e.length; t++) i(e[t], p, r && r.children[t])
            }
            r = r || p, (p.record.components && Object.keys(p.record.components).length || p.record.name || p.record.redirect) && o(p)
        }
        return d ? () => {
            a(d)
        } : xs
    }

    function a(e) {
        if (Hs(e)) {
            const t = r.get(e);
            t && (r.delete(e), n.splice(n.indexOf(t), 1), t.children.forEach(a), t.alias.forEach(a))
        } else {
            const t = n.indexOf(e);
            t > -1 && (n.splice(t, 1), e.record.name && r.delete(e.record.name), e.children.forEach(a), e.alias.forEach(a))
        }
    }

    function o(e) {
        let t = 0;
        for (; t < n.length && ec(e, n[t]) >= 0 && (e.record.path !== n[t].record.path || !pc(e, n[t]));) t++;
        n.splice(t, 0, e), e.record.name && !sc(e) && r.set(e.record.name, e)
    }

    return t = uc({strict: !1, end: !0, sensitive: !1}, t), e.forEach((e => i(e))), {
        addRoute: i,
        resolve: function (e, t) {
            let i, a, o, l = {};
            if ("name" in e && e.name) {
                if (i = r.get(e.name), !i) throw Ks(1, {location: e});
                o = i.record.name, l = ms(oc(t.params, i.keys.filter((e => !e.optional)).map((e => e.name))), e.params && oc(e.params, i.keys.map((e => e.name)))), a = i.stringify(l)
            } else if ("path" in e) a = e.path, i = n.find((e => e.re.test(a))), i && (l = i.parse(a), o = i.record.name); else {
                if (i = t.name ? r.get(t.name) : n.find((e => e.re.test(t.path))), !i) throw Ks(1, {
                    location: e,
                    currentLocation: t
                });
                o = i.record.name, l = ms({}, t.params, e.params), a = i.stringify(l)
            }
            const s = [];
            let c = i;
            for (; c;) s.unshift(c.record), c = c.parent;
            return {name: o, path: a, params: l, matched: s, meta: cc(s)}
        },
        removeRoute: a,
        getRoutes: function () {
            return n
        },
        getRecordMatcher: function (e) {
            return r.get(e)
        }
    }
}

function oc(e, t) {
    const n = {};
    for (const r of t) r in e && (n[r] = e[r]);
    return n
}

function lc(e) {
    const t = {}, n = e.props || !1;
    if ("component" in e) t.default = n; else for (const r in e.components) t[r] = "boolean" == typeof n ? n : n[r];
    return t
}

function sc(e) {
    for (; e;) {
        if (e.record.aliasOf) return !0;
        e = e.parent
    }
    return !1
}

function cc(e) {
    return e.reduce(((e, t) => ms(e, t.meta)), {})
}

function uc(e, t) {
    const n = {};
    for (const r in e) n[r] = r in t ? t[r] : e[r];
    return n
}

function pc(e, t) {
    return t.children.some((t => t === e || pc(e, t)))
}

const dc = /#/g, fc = /&/g, gc = /\//g, hc = /=/g, yc = /\?/g, mc = /\+/g, vc = /%5B/g, xc = /%5D/g, bc = /%5E/g,
    kc = /%60/g, wc = /%7B/g, _c = /%7C/g, Tc = /%7D/g, Ec = /%20/g;

function Cc(e) {
    return encodeURI("" + e).replace(_c, "|").replace(vc, "[").replace(xc, "]")
}

function Lc(e) {
    return Cc(e).replace(mc, "%2B").replace(Ec, "+").replace(dc, "%23").replace(fc, "%26").replace(kc, "`").replace(wc, "{").replace(Tc, "}").replace(bc, "^")
}

function Oc(e) {
    return null == e ? "" : function (e) {
        return Cc(e).replace(dc, "%23").replace(yc, "%3F")
    }(e).replace(gc, "%2F")
}

function Sc(e) {
    try {
        return decodeURIComponent("" + e)
    } catch (t) {
    }
    return "" + e
}

function Pc(e) {
    const t = {};
    if ("" === e || "?" === e) return t;
    const n = ("?" === e[0] ? e.slice(1) : e).split("&");
    for (let r = 0; r < n.length; ++r) {
        const e = n[r].replace(mc, " "), i = e.indexOf("="), a = Sc(i < 0 ? e : e.slice(0, i)),
            o = i < 0 ? null : Sc(e.slice(i + 1));
        if (a in t) {
            let e = t[a];
            bs(e) || (e = t[a] = [e]), e.push(o)
        } else t[a] = o
    }
    return t
}

function Ac(e) {
    let t = "";
    for (let n in e) {
        const r = e[n];
        if (n = Lc(n).replace(hc, "%3D"), null == r) {
            void 0 !== r && (t += (t.length ? "&" : "") + n);
            continue
        }
        (bs(r) ? r.map((e => e && Lc(e))) : [r && Lc(r)]).forEach((e => {
            void 0 !== e && (t += (t.length ? "&" : "") + n, null != e && (t += "=" + e))
        }))
    }
    return t
}

function Rc(e) {
    const t = {};
    for (const n in e) {
        const r = e[n];
        void 0 !== r && (t[n] = bs(r) ? r.map((e => null == e ? null : "" + e)) : null == r ? r : "" + r)
    }
    return t
}

const Nc = Symbol(""), Ic = Symbol(""), jc = Symbol(""), Dc = Symbol(""), Mc = Symbol("");

function zc() {
    let e = [];
    return {
        add: function (t) {
            return e.push(t), () => {
                const n = e.indexOf(t);
                n > -1 && e.splice(n, 1)
            }
        }, list: () => e, reset: function () {
            e = []
        }
    }
}

function Vc(e, t, n, r, i) {
    const a = r && (r.enterCallbacks[i] = r.enterCallbacks[i] || []);
    return () => new Promise(((o, l) => {
        const s = e => {
            var s;
            !1 === e ? l(Ks(4, {
                from: n,
                to: t
            })) : e instanceof Error ? l(e) : "string" == typeof (s = e) || s && "object" == typeof s ? l(Ks(2, {
                from: t,
                to: e
            })) : (a && r.enterCallbacks[i] === a && "function" == typeof e && a.push(e), o())
        }, c = e.call(r && r.instances[i], t, n, s);
        let u = Promise.resolve(c);
        e.length < 3 && (u = u.then(s)), u.catch((e => l(e)))
    }))
}

function Fc(e, t, n, r) {
    const i = [];
    for (const o of e) for (const e in o.components) {
        let l = o.components[e];
        if ("beforeRouteEnter" === t || o.instances[e]) if ("object" == typeof (a = l) || "displayName" in a || "props" in a || "__vccOpts" in a) {
            const a = (l.__vccOpts || l)[t];
            a && i.push(Vc(a, n, r, o, e))
        } else {
            let a = l();
            i.push((() => a.then((i => {
                if (!i) return Promise.reject(new Error(`Couldn't resolve component "${e}" at "${o.path}"`));
                const a = (l = i).__esModule || "Module" === l[Symbol.toStringTag] ? i.default : i;
                var l;
                o.components[e] = a;
                const s = (a.__vccOpts || a)[t];
                return s && Vc(s, n, r, o, e)()
            }))))
        }
    }
    var a;
    return i
}

function Uc(e) {
    const t = cn(jc), n = cn(Dc), r = vi((() => t.resolve(wt(e.to)))), i = vi((() => {
            const {matched: e} = r.value, {length: t} = e, i = e[t - 1], a = n.matched;
            if (!i || !a.length) return -1;
            const o = a.findIndex(Es.bind(null, i));
            if (o > -1) return o;
            const l = Hc(e[t - 2]);
            return t > 1 && Hc(i) === l && a[a.length - 1].path !== l ? a.findIndex(Es.bind(null, e[t - 2])) : o
        })), a = vi((() => i.value > -1 && function (e, t) {
            for (const n in t) {
                const r = t[n], i = e[n];
                if ("string" == typeof r) {
                    if (r !== i) return !1
                } else if (!bs(i) || i.length !== r.length || r.some(((e, t) => e !== i[t]))) return !1
            }
            return !0
        }(n.params, r.value.params))),
        o = vi((() => i.value > -1 && i.value === n.matched.length - 1 && Cs(n.params, r.value.params)));
    return {
        route: r, href: vi((() => r.value.href)), isActive: a, isExactActive: o, navigate: function (n = {}) {
            return function (e) {
                if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
                if (e.defaultPrevented) return;
                if (void 0 !== e.button && 0 !== e.button) return;
                if (e.currentTarget && e.currentTarget.getAttribute) {
                    const t = e.currentTarget.getAttribute("target");
                    if (/\b_blank\b/i.test(t)) return
                }
                e.preventDefault && e.preventDefault();
                return !0
            }(n) ? t[wt(e.replace) ? "replace" : "push"](wt(e.to)).catch(xs) : Promise.resolve()
        }
    }
}

const Bc = mn({
    name: "RouterLink",
    compatConfig: {MODE: 3},
    props: {
        to: {type: [String, Object], required: !0},
        replace: Boolean,
        activeClass: String,
        exactActiveClass: String,
        custom: Boolean,
        ariaCurrentValue: {type: String, default: "page"}
    },
    useLink: Uc,
    setup(e, {slots: t}) {
        const n = it(Uc(e)), {options: r} = cn(jc), i = vi((() => ({
            [Wc(e.activeClass, r.linkActiveClass, "router-link-active")]: n.isActive,
            [Wc(e.exactActiveClass, r.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
        })));
        return () => {
            const r = t.default && t.default(n);
            return e.custom ? r : xi("a", {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: i.value
            }, r)
        }
    }
});

function Hc(e) {
    return e ? e.aliasOf ? e.aliasOf.path : e.path : ""
}

const Wc = (e, t, n) => null != e ? e : null != t ? t : n;

function qc(e, t) {
    if (!e) return null;
    const n = e(t);
    return 1 === n.length ? n[0] : n
}

const $c = mn({
    name: "RouterView",
    inheritAttrs: !1,
    props: {name: {type: String, default: "default"}, route: Object},
    compatConfig: {MODE: 3},
    setup(e, {attrs: t, slots: n}) {
        const r = cn(Mc), i = vi((() => e.route || r.value)), a = cn(Ic, 0), o = vi((() => {
            let e = wt(a);
            const {matched: t} = i.value;
            let n;
            for (; (n = t[e]) && !n.components;) e++;
            return e
        })), l = vi((() => i.value.matched[o.value]));
        sn(Ic, vi((() => o.value + 1))), sn(Nc, l), sn(Mc, i);
        const s = vt();
        return pn((() => [s.value, l.value, e.name]), (([e, t, n], [r, i, a]) => {
            t && (t.instances[n] = e, i && i !== t && e && e === r && (t.leaveGuards.size || (t.leaveGuards = i.leaveGuards), t.updateGuards.size || (t.updateGuards = i.updateGuards))), !e || !t || i && Es(t, i) && r || (t.enterCallbacks[n] || []).forEach((t => t(e)))
        }), {flush: "post"}), () => {
            const r = i.value, a = e.name, o = l.value, c = o && o.components[a];
            if (!c) return qc(n.default, {Component: c, route: r});
            const u = o.props[a], p = u ? !0 === u ? r.params : "function" == typeof u ? u(r) : u : null,
                d = xi(c, ms({}, p, t, {
                    onVnodeUnmounted: e => {
                        e.component.isUnmounted && (o.instances[a] = null)
                    }, ref: s
                }));
            return qc(n.default, {Component: d, route: r}) || d
        }
    }
});

function Yc(e) {
    return e.reduce(((e, t) => e.then((() => t()))), Promise.resolve())
}

const Kc = {class: "ota-main"}, Gc = {class: "ota-main-component"}, Xc = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [r, i] of t) n[r] = i;
    return n
}, Jc = Xc(mn({
    __name: "App", setup(e) {
        const t = cn(Dc);
        return (e, n) => {
            const r = $n(Hn, i = "RouterView", !0, a) || i;
            var i, a;
            return Vr(), Hr("main", Kc, [Xr("div", Gc, [Jr(r, null, {
                default: tn((({Component: e}) => [(Vr(), Wr(kn, null, [wt(t).meta.KeepAlive ? (Vr(), Wr(qn(e), {key: 0})) : ei("", !0)], 1024)), wt(t).meta.KeepAlive ? ei("", !0) : (Vr(), Wr(qn(e), {key: 0}))])),
                _: 1
            })])])
        }
    }
}), [["__scopeId", "data-v-8a6e4eff"]]), Zc = {
    oppo: {
        11: new URL("" + new URL("OTA-ColorOS-light-702_183.38d03cd8.webp", import.meta.url).href, self.location).href,
        "11-dark": new URL("" + new URL("OTA-ColorOS-dark-702_183.12b2b234.webp", import.meta.url).href, self.location).href,
        12: new URL("" + new URL("OTA-ColorOS-light-702_183.38d03cd8.webp", import.meta.url).href, self.location).href,
        "12-dark": new URL("" + new URL("OTA-ColorOS-dark-702_183.12b2b234.webp", import.meta.url).href, self.location).href,
        13: new URL("" + new URL("OTA-ColorOS-light-702_183.38d03cd8.webp", import.meta.url).href, self.location).href,
        "13-dark": new URL("" + new URL("OTA-ColorOS-dark-702_183.12b2b234.webp", import.meta.url).href, self.location).href
    },
    "oneplus-exp": {
        11: new URL("" + new URL("OTA-OxygenOS-light-702_183.7f2b165d.webp", import.meta.url).href, self.location).href,
        "11-dark": new URL("" + new URL("OTA-OxygenOS-dark-702_183.a15b88f5.webp", import.meta.url).href, self.location).href,
        12: new URL("" + new URL("OTA-OxygenOS-light-702_183.7f2b165d.webp", import.meta.url).href, self.location).href,
        "12-dark": new URL("" + new URL("OTA-OxygenOS-dark-702_183.a15b88f5.webp", import.meta.url).href, self.location).href,
        13: new URL("" + new URL("OTA-OxygenOS-light-702_183.7f2b165d.webp", import.meta.url).href, self.location).href,
        "13-dark": new URL("" + new URL("OTA-OxygenOS-dark-702_183.a15b88f5.webp", import.meta.url).href, self.location).href
    },
    realme: {
        11: new URL("" + new URL("OTA-RealmeUI-light-702_183.1b3d496d.webp", import.meta.url).href, self.location).href,
        "11-dark": new URL("" + new URL("OTA-RealmeUI-dark-702_183.9ef81f5a.webp", import.meta.url).href, self.location).href,
        12: new URL("" + new URL("OTA-RealmeUI-light-702_183.1b3d496d.webp", import.meta.url).href, self.location).href,
        "12-dark": new URL("" + new URL("OTA-RealmeUI-dark-702_183.9ef81f5a.webp", import.meta.url).href, self.location).href,
        13: new URL("" + new URL("OTA-RealmeUI-light-702_183.1b3d496d.webp", import.meta.url).href, self.location).href,
        "13-dark": new URL("" + new URL("OTA-RealmeUI-dark-702_183.9ef81f5a.webp", import.meta.url).href, self.location).href
    }
};
const Qc = window, eu = Qc.navigator.userAgent;
let tu = 1;
const nu = Qc.RainbowBridge || (Qc.RainbowBridge = {}), ru = {
    callMethod: function (e, t, n, r) {
        const i = iu.generatePort();
        "function" != typeof r && (r = null), iu.registerCallback(i, r), iu.callNativeMethod(e, i, t, n)
    }, onComplete: function (e, t) {
        iu.onNativeComplete(e, t)
    }
}, iu = {
    callbacks: {}, registerCallback: function (e, t) {
        t && (iu.callbacks[e] = t)
    }, getCallback: function (e) {
        const t = {};
        return iu.callbacks[e] ? t.callback = iu.callbacks[e] : t.callback = null, t
    }, unRegisterCallback: function (e) {
        iu.callbacks[e] && delete iu.callbacks[e]
    }, onNativeComplete: function (e, t) {
        const n = iu.str2Json(t), r = iu.getCallback(e).callback;
        iu.unRegisterCallback(e), r && r && r(n)
    }, generatePort: function () {
        return Math.floor(Math.random() * (1 << 50)) + "" + tu++
    }, str2Json: function (e) {
        if (!e || "string" != typeof e) return e || {};
        try {
            return JSON.parse(e.replace(/\n/g, "\\n").replace(/\r/g, "\\r"))
        } catch (t) {
            return {status: {code: 1, msg: "params parse error!"}}
        }
    }, json2Str: function (e) {
        return e && "object" == typeof e ? JSON.stringify(e) : e || ""
    }, callNativeMethod: function (e, t, n, r) {
        if (iu.isAndroid()) {
            const i = "rainbow://" + e + ":" + t + "/" + n + "?" + iu.json2Str(r);
            Qc.prompt(i, "")
        }
    }, isAndroid: function () {
        return !!(eu.toLowerCase().indexOf("android") > -1)
    }, isIos: function () {
        return !!(eu.toLowerCase().indexOf("iphone") > -1)
    }
};
for (let Hd in ru) ru.hasOwnProperty(Hd) && (Object.prototype.hasOwnProperty.call(nu, Hd) || (nu[Hd] = ru[Hd]));
const au = -1 !== navigator.userAgent.toLowerCase().indexOf("android"),
    ou = ({method: e = "", data: t = {}, preset: n = {}}) => new Promise((n => {
        au && nu.callMethod("JSCommandMethod", e, t, n)
    }));

function lu() {
    return ou({method: "setFullScreen"})
}

function su() {
    return ou({method: "exitFullScreen"})
}

function cu(e) {
    return ou({method: "showWebToast", data: e})
}

const uu = function (e, t, n) {
    let r, i;
    const a = "function" == typeof t;

    function o(e, n) {
        const o = si();
        (e = e || o && cn(Hi, null)) && Bi(e), (e = Ui)._s.has(r) || (a ? ta(r, t, i, e) : ea(r, i, e));
        return e._s.get(r)
    }

    return "string" == typeof e ? (r = e, i = a ? n : t) : (i = e, r = e.id), o.$id = r, o
}({
    id: "otaInfo",
    state: () => ({otaInfo: {}, screenStatus: "SMALL", smallestWidth: 400}),
    getters: {
        screenClassName(e) {
            const t = {400: "small-screen", 600: "middle-screen", 700: "big-screen"},
                n = {SMALL: "small-screen", MEDIUM: "middle-screen", LARGE: "big-screen"};
            let r = "small-screen";
            return r = t[e.smallestWidth] ? t[e.smallestWidth] : n[e.screenStatus] ? n[e.screenStatus] : "small-screen", r
        }, mainWidth(e) {
            const t = e.smallestWidth || 400, n = {400: "100%", 600: "498px", 700: "724px"};
            let r = "";
            return r = n[t] ? n[t] : t + "px", r
        }
    },
    actions: {
        async getPhoneInfo() {
            try {
                let {data: e, status: t} = await function (e = {}) {
                    return ou({method: "getOtaInfo", ...e})
                }();
                if (0 !== t.code || !Object.keys(e || {}).length) {
                    const n = await function (e = {}) {
                        return ou({method: "getDeviceInfo", ...e})
                    }();
                    e = n.data || {}, t = n.status || {}
                }
                return e.type ? e.otaVersion = e.newVersion : (e.osVersion = e.curOSVersion, e.otaVersion = e.curVersion), this.otaInfo = e, this.screenStatus = e.screenType || "", this.smallestWidth = e.smallestWidth || 400, Promise.resolve({otaInfo: e})
            } catch (e) {
                return Promise.reject({error: e})
            }
        }, setData(e) {
            const {keyName: t, value: n} = e;
            this[t] = n
        }
    }
});
Yi();
const pu = {class: "ignore-logo-content"}, du = ["src"], fu = Xc(mn({
    __name: "logo", setup(e) {
        const t = uu(), n = vi((() => {
            if (!t.otaInfo.brand) return "";
            let e = t.otaInfo.brand || "oppo";
            e = "oneplus" === e.toLocaleLowerCase() ? "oppo" : e;
            let n = Math.floor(t.otaInfo.osVersion || "") || "13";
            return n = n < 11 ? 11 : n > 13 ? 13 : n, n = `${n}${t.otaInfo.darkMode ? "-dark" : ""}`, Zc[e][n]
        }));
        return (e, t) => (Vr(), Hr("div", pu, [Xr("img", {class: "logo", src: wt(n)}, null, 8, du)]))
    }
}), [["__scopeId", "data-v-7ef5997e"]]);
"undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;

function gu(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}

var hu, yu = {exports: {}};
hu = function () {
    return function (e) {
        var t = {};

        function n(r) {
            if (t[r]) return t[r].exports;
            var i = t[r] = {i: r, l: !1, exports: {}};
            return e[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports
        }

        return n.m = e, n.c = t, n.d = function (e, t, r) {
            n.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: r})
        }, n.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
        }, n.t = function (e, t) {
            if (1 & t && (e = n(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var r = Object.create(null);
            if (n.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e) for (var i in e) n.d(r, i, function (t) {
                return e[t]
            }.bind(null, i));
            return r
        }, n.n = function (e) {
            var t = e && e.__esModule ? function () {
                return e.default
            } : function () {
                return e
            };
            return n.d(t, "a", t), t
        }, n.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, n.p = "", n(n.s = 79)
    }([function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0}), t.util = t.PresentationMode = void 0, t.createDom = o, t.hasClass = l, t.addClass = s, t.removeClass = c, t.toggleClass = u, t.findDom = p, t.padStart = d, t.format = f, t.event = g, t.typeOf = h, t.deepCopy = y, t.getBgImage = m, t.copyDom = v, t._setInterval = x, t._clearInterval = b, t.createImgBtn = k, t.isWeiXin = w, t.isUc = _, t.computeWatchDur = T, t.offInDestroy = E, t.on = C, t.once = L, t.getBuffered2 = O, t.checkIsBrowser = S, t.setStyle = P, t.checkWebkitSetPresentationMode = function (e) {
            return "function" == typeof e.webkitSetPresentationMode
        };
        var r, i = n(7), a = (r = i) && r.__esModule ? r : {default: r};

        function o() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "div",
                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "", i = document.createElement(e);
            return i.className = r, i.innerHTML = t, Object.keys(n).forEach((function (t) {
                var r = t, a = n[t];
                "video" === e || "audio" === e ? a && i.setAttribute(r, a) : i.setAttribute(r, a)
            })), i
        }

        function l(e, t) {
            return !!e && (e.classList ? Array.prototype.some.call(e.classList, (function (e) {
                return e === t
            })) : !!e.className && !!e.className.match(new RegExp("(\\s|^)" + t + "(\\s|$)")))
        }

        function s(e, t) {
            e && (e.classList ? t.replace(/(^\s+|\s+$)/g, "").split(/\s+/g).forEach((function (t) {
                t && e.classList.add(t)
            })) : l(e, t) || (e.className += " " + t))
        }

        function c(e, t) {
            e && (e.classList ? t.split(/\s+/g).forEach((function (t) {
                e.classList.remove(t)
            })) : l(e, t) && t.split(/\s+/g).forEach((function (t) {
                var n = new RegExp("(\\s|^)" + t + "(\\s|$)");
                e.className = e.className.replace(n, " ")
            })))
        }

        function u(e, t) {
            e && t.split(/\s+/g).forEach((function (t) {
                l(e, t) ? c(e, t) : s(e, t)
            }))
        }

        function p() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : document, t = arguments[1],
                n = void 0;
            try {
                n = e.querySelector(t)
            } catch (r) {
                0 === t.indexOf("#") && (n = e.getElementById(t.slice(1)))
            }
            return n
        }

        function d(e, t, n) {
            for (var r = String(n), i = t >> 0, a = Math.ceil(i / r.length), o = [], l = String(e); a--;) o.push(r);
            return o.join("").substring(0, i - l.length) + l
        }

        function f(e) {
            if (window.isNaN(e)) return "";
            var t = d(Math.floor(e / 3600), 2, 0), n = d(Math.floor((e - 3600 * t) / 60), 2, 0),
                r = d(Math.floor(e - 3600 * t - 60 * n), 2, 0);
            return ("00" === t ? [n, r] : [t, n, r]).join(":")
        }

        function g(e) {
            if (e.touches) {
                var t = e.touches[0] || e.changedTouches[0];
                e.clientX = t.clientX || 0, e.clientY = t.clientY || 0, e.offsetX = t.pageX - t.target.offsetLeft, e.offsetY = t.pageY - t.target.offsetTop
            }
            e._target = e.target || e.srcElement
        }

        function h(e) {
            return Object.prototype.toString.call(e).match(/([^\s.*]+)(?=]$)/g)[0]
        }

        function y(e, t) {
            if ("Object" === h(t) && "Object" === h(e)) return Object.keys(t).forEach((function (n) {
                "Object" !== h(t[n]) || t[n] instanceof Node ? "Array" === h(t[n]) ? e[n] = "Array" === h(e[n]) ? e[n].concat(t[n]) : t[n] : e[n] = t[n] : e[n] ? y(e[n], t[n]) : e[n] = t[n]
            })), e
        }

        function m(e) {
            var t = (e.currentStyle || window.getComputedStyle(e, null)).backgroundImage;
            if (!t || "none" === t) return "";
            var n = document.createElement("a");
            return n.href = t.replace(/url\("|"\)/g, ""), n.href
        }

        function v(e) {
            if (e && 1 === e.nodeType) {
                var t = document.createElement(e.tagName);
                return Array.prototype.forEach.call(e.attributes, (function (e) {
                    t.setAttribute(e.name, e.value)
                })), e.innerHTML && (t.innerHTML = e.innerHTML), t
            }
            return ""
        }

        function x(e, t, n, r) {
            e._interval[t] || (e._interval[t] = setInterval(n.bind(e), r))
        }

        function b(e, t) {
            clearInterval(e._interval[t]), e._interval[t] = null
        }

        function k(e, t, n, r) {
            var i = o("xg-" + e, "", {}, "xgplayer-" + e + "-img");
            if (i.style.backgroundImage = 'url("' + t + '")', n && r) {
                var a = void 0, l = void 0, s = void 0;
                ["px", "rem", "em", "pt", "dp", "vw", "vh", "vm", "%"].every((function (e) {
                    return !(n.indexOf(e) > -1 && r.indexOf(e) > -1 && (a = Number(n.slice(0, n.indexOf(e)).trim()), l = Number(r.slice(0, r.indexOf(e)).trim()), s = e, 1))
                })), i.style.width = "" + a + s, i.style.height = "" + l + s, i.style.backgroundSize = "" + a + s + " " + l + s, i.style.margin = "start" === e ? "-" + l / 2 + s + " auto auto -" + a / 2 + s : "auto 5px auto 5px"
            }
            return i
        }

        function w() {
            return window.navigator.userAgent.toLowerCase().indexOf("micromessenger") > -1
        }

        function _() {
            return window.navigator.userAgent.toLowerCase().indexOf("ucbrowser") > -1
        }

        function T() {
            for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = [], n = 0; n < e.length; n++) if (!(!e[n].end || e[n].begin < 0 || e[n].end < 0 || e[n].end < e[n].begin)) if (t.length < 1) t.push({
                begin: e[n].begin,
                end: e[n].end
            }); else for (var r = 0; r < t.length; r++) {
                var i = e[n].begin, a = e[n].end;
                if (a < t[r].begin) {
                    t.splice(r, 0, {begin: i, end: a});
                    break
                }
                if (!(i > t[r].end)) {
                    var o = t[r].begin, l = t[r].end;
                    t[r].begin = Math.min(i, o), t[r].end = Math.max(a, l);
                    break
                }
                if (r > t.length - 2) {
                    t.push({begin: i, end: a});
                    break
                }
            }
            for (var s = 0, c = 0; c < t.length; c++) s += t[c].end - t[c].begin;
            return s
        }

        function E(e, t, n, r) {
            e.once(r, (function i() {
                e.off(t, n), e.off(r, i)
            }))
        }

        function C(e, t, n, r) {
            r ? (e.on(t, n), E(e, t, n, r)) : e.on(t, (function r(i) {
                n(i), e.off(t, r)
            }))
        }

        function L(e, t, n, r) {
            r ? (e.once(t, n), E(e, t, n, r)) : e.once(t, (function r(i) {
                n(i), e.off(t, r)
            }))
        }

        function O(e) {
            for (var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : .5, n = [], r = 0; r < e.length; r++) n.push({
                start: e.start(r) < .5 ? 0 : e.start(r),
                end: e.end(r)
            });
            n.sort((function (e, t) {
                var n = e.start - t.start;
                return n || t.end - e.end
            }));
            var i = [];
            if (t) for (var o = 0; o < n.length; o++) {
                var l = i.length;
                if (l) {
                    var s = i[l - 1].end;
                    n[o].start - s < t ? n[o].end > s && (i[l - 1].end = n[o].end) : i.push(n[o])
                } else i.push(n[o])
            } else i = n;
            return new a.default(i)
        }

        function S() {
            return !("undefined" == typeof window || void 0 === window.document || void 0 === window.document.createElement)
        }

        function P(e, t, n) {
            var r = e.style;
            try {
                r[t] = n
            } catch (i) {
                r.setProperty(t, n)
            }
        }

        t.PresentationMode = {
            PIP: "picture-in-picture",
            INLINE: "inline",
            FULLSCREEN: "fullscreen"
        }, t.util = {
            createDom: o,
            hasClass: l,
            addClass: s,
            removeClass: c,
            toggleClass: u,
            findDom: p,
            padStart: d,
            format: f,
            event: g,
            typeOf: h,
            deepCopy: y,
            getBgImage: m,
            copyDom: v,
            setInterval: x,
            clearInterval: b,
            createImgBtn: k,
            isWeiXin: w,
            isUc: _,
            computeWatchDur: T,
            offInDestroy: E,
            on: C,
            once: L,
            getBuffered2: O,
            checkIsBrowser: S,
            setStyle: P
        }
    }, function (e, t) {
        e.exports = function (e) {
            var t = [];
            return t.toString = function () {
                return this.map((function (t) {
                    var n = function (e, t) {
                        var n, r = e[1] || "", i = e[3];
                        if (!i) return r;
                        if (t && "function" == typeof btoa) {
                            var a = (n = i, "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(n)))) + " */"),
                                o = i.sources.map((function (e) {
                                    return "/*# sourceURL=" + i.sourceRoot + e + " */"
                                }));
                            return [r].concat(o).concat([a]).join("\n")
                        }
                        return [r].join("\n")
                    }(t, e);
                    return t[2] ? "@media " + t[2] + "{" + n + "}" : n
                })).join("")
            }, t.i = function (e, n) {
                "string" == typeof e && (e = [[null, e, ""]]);
                for (var r = {}, i = 0; i < this.length; i++) {
                    var a = this[i][0];
                    "number" == typeof a && (r[a] = !0)
                }
                for (i = 0; i < e.length; i++) {
                    var o = e[i];
                    "number" == typeof o[0] && r[o[0]] || (n && !o[2] ? o[2] = n : n && (o[2] = "(" + o[2] + ") and (" + n + ")"), t.push(o))
                }
            }, t
        }
    }, function (e, t, n) {
        var r, i, a = {}, o = (r = function () {
            return window && document && document.all && !window.atob
        }, function () {
            return void 0 === i && (i = r.apply(this, arguments)), i
        }), l = function (e) {
            return document.querySelector(e)
        }, s = function (e) {
            var t = {};
            return function (e) {
                if ("function" == typeof e) return e();
                if (void 0 === t[e]) {
                    var n = l.call(this, e);
                    if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement) try {
                        n = n.contentDocument.head
                    } catch (r) {
                        n = null
                    }
                    t[e] = n
                }
                return t[e]
            }
        }(), c = null, u = 0, p = [], d = n(36);

        function f(e, t) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n], i = a[r.id];
                if (i) {
                    i.refs++;
                    for (var o = 0; o < i.parts.length; o++) i.parts[o](r.parts[o]);
                    for (; o < r.parts.length; o++) i.parts.push(x(r.parts[o], t))
                } else {
                    var l = [];
                    for (o = 0; o < r.parts.length; o++) l.push(x(r.parts[o], t));
                    a[r.id] = {id: r.id, refs: 1, parts: l}
                }
            }
        }

        function g(e, t) {
            for (var n = [], r = {}, i = 0; i < e.length; i++) {
                var a = e[i], o = t.base ? a[0] + t.base : a[0], l = {css: a[1], media: a[2], sourceMap: a[3]};
                r[o] ? r[o].parts.push(l) : n.push(r[o] = {id: o, parts: [l]})
            }
            return n
        }

        function h(e, t) {
            var n = s(e.insertInto);
            if (!n) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
            var r = p[p.length - 1];
            if ("top" === e.insertAt) r ? r.nextSibling ? n.insertBefore(t, r.nextSibling) : n.appendChild(t) : n.insertBefore(t, n.firstChild), p.push(t); else if ("bottom" === e.insertAt) n.appendChild(t); else {
                if ("object" != typeof e.insertAt || !e.insertAt.before) throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
                var i = s(e.insertInto + " " + e.insertAt.before);
                n.insertBefore(t, i)
            }
        }

        function y(e) {
            if (null === e.parentNode) return !1;
            e.parentNode.removeChild(e);
            var t = p.indexOf(e);
            t >= 0 && p.splice(t, 1)
        }

        function m(e) {
            var t = document.createElement("style");
            return e.attrs.type = "text/css", v(t, e.attrs), h(e, t), t
        }

        function v(e, t) {
            Object.keys(t).forEach((function (n) {
                e.setAttribute(n, t[n])
            }))
        }

        function x(e, t) {
            var n, r, i, a;
            if (t.transform && e.css) {
                if (!(a = t.transform(e.css))) return function () {
                };
                e.css = a
            }
            if (t.singleton) {
                var o = u++;
                n = c || (c = m(t)), r = w.bind(null, n, o, !1), i = w.bind(null, n, o, !0)
            } else e.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (n = function (e) {
                var t = document.createElement("link");
                return e.attrs.type = "text/css", e.attrs.rel = "stylesheet", v(t, e.attrs), h(e, t), t
            }(t), r = T.bind(null, n, t), i = function () {
                y(n), n.href && URL.revokeObjectURL(n.href)
            }) : (n = m(t), r = _.bind(null, n), i = function () {
                y(n)
            });
            return r(e), function (t) {
                if (t) {
                    if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
                    r(e = t)
                } else i()
            }
        }

        e.exports = function (e, t) {
            if ("undefined" != typeof DEBUG && DEBUG && "object" != typeof document) throw new Error("The style-loader cannot be used in a non-browser environment");
            (t = t || {}).attrs = "object" == typeof t.attrs ? t.attrs : {}, t.singleton || "boolean" == typeof t.singleton || (t.singleton = o()), t.insertInto || (t.insertInto = "head"), t.insertAt || (t.insertAt = "bottom");
            var n = g(e, t);
            return f(n, t), function (e) {
                for (var r = [], i = 0; i < n.length; i++) {
                    var o = n[i];
                    (l = a[o.id]).refs--, r.push(l)
                }
                for (e && f(g(e, t), t), i = 0; i < r.length; i++) {
                    var l;
                    if (0 === (l = r[i]).refs) {
                        for (var s = 0; s < l.parts.length; s++) l.parts[s]();
                        delete a[l.id]
                    }
                }
            }
        };
        var b, k = (b = [], function (e, t) {
            return b[e] = t, b.filter(Boolean).join("\n")
        });

        function w(e, t, n, r) {
            var i = n ? "" : r.css;
            if (e.styleSheet) e.styleSheet.cssText = k(t, i); else {
                var a = document.createTextNode(i), o = e.childNodes;
                o[t] && e.removeChild(o[t]), o.length ? e.insertBefore(a, o[t]) : e.appendChild(a)
            }
        }

        function _(e, t) {
            var n = t.css, r = t.media;
            if (r && e.setAttribute("media", r), e.styleSheet) e.styleSheet.cssText = n; else {
                for (; e.firstChild;) e.removeChild(e.firstChild);
                e.appendChild(document.createTextNode(n))
            }
        }

        function T(e, t, n) {
            var r = n.css, i = n.sourceMap, a = void 0 === t.convertToAbsoluteUrls && i;
            (t.convertToAbsoluteUrls || a) && (r = d(r)), i && (r += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(i)))) + " */");
            var o = new Blob([r], {type: "text/css"}), l = e.href;
            e.href = URL.createObjectURL(o), l && URL.revokeObjectURL(l)
        }
    }, function (e, t, n) {
        var r = n(24)();
        e.exports = function (e) {
            return e !== r && null !== e
        }
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(8), i = {
            network: {
                code: 1,
                msg: "视频下载错误",
                remark: "只要视频下载错误就使用此类型，无论是video本身的超时还是xhr的分段请求超时或者资源不存在"
            },
            mse: {code: 2, msg: "流追加错误", remark: "追加流的时候如果类型不对、无法被正确解码则会触发此类错误"},
            parse: {
                code: 3,
                msg: "解析错误",
                remark: "mp4、hls、flv我们都是使用js进行格式解析，如果解析失败则会触发此类错误"
            },
            format: {code: 4, msg: "格式错误", remark: "如果浏览器不支持的格式导致播放错误"},
            decoder: {code: 5, msg: "解码错误", remark: "浏览器解码异常会抛出此类型错误"},
            runtime: {code: 6, msg: "语法错误", remark: "播放器语法错误"},
            timeout: {code: 7, msg: "播放超时", remark: "播放过程中无法正常请求下一个分段导致播放中断"},
            other: {code: 8, msg: "其他错误", remark: "不可知的错误或被忽略的错误类型"}
        };
        t.default = function e(t, n, a, o, l, s, c, u) {
            var p = arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : {
                line: "",
                handle: "",
                msg: "",
                version: ""
            }, d = arguments[9], f = arguments[10];
            !function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var g = {};
            if (arguments.length > 1) g.playerVersion = r.version, g.errorType = t, g.domain = document.domain, g.duration = a, g.currentTime = n, g.networkState = o, g.readyState = l, g.currentSrc = c, g.src = s, g.ended = u, g.errd = p, g.ex = (i[t] || {}).msg, g.errorCode = d, g.mediaError = f; else {
                var h = arguments[0];
                Object.keys(h).map((function (e) {
                    g[e] = h[e]
                })), g.ex = (h.type && i[h.type] || {}).msg
            }
            return g
        }, e.exports = t.default
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = {};
        Object.defineProperty(r, "device", {
            get: function () {
                return r.os.isPc ? "pc" : "mobile"
            }
        }), Object.defineProperty(r, "browser", {
            get: function () {
                var e = navigator.userAgent.toLowerCase(), t = {
                    ie: /rv:([\d.]+)\) like gecko/,
                    firfox: /firefox\/([\d.]+)/,
                    chrome: /chrome\/([\d.]+)/,
                    opera: /opera.([\d.]+)/,
                    safari: /version\/([\d.]+).*safari/
                };
                return [].concat(Object.keys(t).filter((function (n) {
                    return t[n].test(e)
                })))[0] || ""
            }
        }), Object.defineProperty(r, "os", {
            get: function () {
                var e = navigator.userAgent, t = /(?:Windows Phone)/.test(e), n = /(?:SymbianOS)/.test(e) || t,
                    r = /(?:Android)/.test(e), i = /(?:Firefox)/.test(e),
                    a = /(?:iPad|PlayBook)/.test(e) || r && !/(?:Mobile)/.test(e) || i && /(?:Tablet)/.test(e),
                    o = /(?:iPhone)/.test(e) && !a;
                return {
                    isTablet: a,
                    isPhone: o,
                    isAndroid: r,
                    isPc: !(o || r || n || a),
                    isSymbian: n,
                    isWindowsPhone: t,
                    isFireFox: i
                }
            }
        }), t.default = r, e.exports = t.default
    }, function (e, t, n) {
        e.exports = function (e) {
            return null != e
        }
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = function () {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }

            return function (t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(), i = function () {
            function e(t) {
                !function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.bufferedList = t
            }

            return r(e, [{
                key: "start", value: function (e) {
                    return this.bufferedList[e].start
                }
            }, {
                key: "end", value: function (e) {
                    return this.bufferedList[e].end
                }
            }, {
                key: "length", get: function () {
                    return this.bufferedList.length
                }
            }]), e
        }();
        t.default = i, e.exports = t.default
    }, function (e) {
        e.exports = JSON.parse('{"version":"2.32.2"}')
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = function () {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }

            return function (t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(), i = function e(t, n, r) {
            null === t && (t = Function.prototype);
            var i = Object.getOwnPropertyDescriptor(t, n);
            if (void 0 === i) {
                var a = Object.getPrototypeOf(t);
                return null === a ? void 0 : e(a, n, r)
            }
            if ("value" in i) return i.value;
            var o = i.get;
            return void 0 !== o ? o.call(r) : void 0
        }, a = f(n(11)), o = n(0), l = f(n(5)), s = f(n(7)), c = f(n(4)), u = f(n(31)), p = f(n(10));
        n(34);
        var d = n(8);

        function f(e) {
            return e && e.__esModule ? e : {default: e}
        }

        function g(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        var h = function (e) {
            function t(e) {
                !function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t);
                var n = g(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                if (n.config = (0, o.deepCopy)({
                    width: 600,
                    height: 337.5,
                    ignores: [],
                    whitelist: [],
                    lang: (document.documentElement.getAttribute("lang") || navigator.language || "zh-cn").toLocaleLowerCase(),
                    inactive: 3e3,
                    volume: .6,
                    controls: !0,
                    controlsList: ["nodownload"]
                }, e), n.version = d.version, n.userTimer = null, n.waitTimer = null, n.history = [], n.isProgressMoving = !1, n.root = (0, o.findDom)(document, "#" + n.config.id), n.controls = (0, o.createDom)("xg-controls", "", {
                    unselectable: "on",
                    onselectstart: "return false"
                }, "xgplayer-controls"), n.config.isShowControl && (n.controls.style.display = "none"), !n.root) {
                    var r = n.config.el;
                    if (!r || 1 !== r.nodeType) return n.emit("error", new c.default({
                        type: "use",
                        errd: {line: 45, handle: "Constructor", msg: "container id can't be empty"},
                        vid: n.config.vid
                    })), g(n, !1);
                    n.root = r
                }
                if ((0, o.addClass)(n.root, "xgplayer xgplayer-" + l.default.device + " xgplayer-nostart xgplayer-pause " + (n.config.controls ? "" : "xgplayer-no-controls")), n.root.appendChild(n.controls), n.config.fluid ? (n.root.style["max-width"] = "100%", n.root.style.width = "100%", n.root.style.height = "0", n.root.style["padding-top"] = 100 * n.config.height / n.config.width + "%", n.video.style.position = "absolute", n.video.style.top = "0", n.video.style.left = "0") : (n.config.width && ("number" != typeof n.config.width ? n.root.style.width = n.config.width : n.root.style.width = n.config.width + "px"), n.config.height && ("number" != typeof n.config.height ? n.root.style.height = n.config.height : n.root.style.height = n.config.height + "px")), n.config.execBeforePluginsCall && n.config.execBeforePluginsCall.forEach((function (e) {
                    e.call(n, n)
                })), n.config.closeI18n || t.install(p.default.name, p.default.method), n.config.controlStyle && "String" === (0, o.typeOf)(n.config.controlStyle)) {
                    var i = n;
                    fetch(i.config.controlStyle, {
                        method: "GET",
                        headers: {Accept: "application/json"}
                    }).then((function (e) {
                        e.ok && e.json().then((function (e) {
                            for (var t in e) e.hasOwnProperty(t) && (i.config[t] = e[t]);
                            i.pluginsCall()
                        }))
                    })).catch((function (e) {
                    }))
                } else n.pluginsCall();
                n.config.controlPlugins && t.controlsRun(n.config.controlPlugins, n), n.ev.forEach((function (e) {
                    var t = Object.keys(e)[0], r = n[e[t]];
                    r && n.on(t, r)
                })), ["focus", "blur"].forEach((function (e) {
                    n.on(e, n["on" + e.charAt(0).toUpperCase() + e.slice(1)])
                }));
                var a = n;
                return n.mousemoveFunc = function () {
                    a.emit("focus"), a.config.closeFocusVideoFocus || a.video.focus()
                }, n.root.addEventListener("mousemove", n.mousemoveFunc), n.playFunc = function () {
                    a.emit("focus"), a.config.closePlayVideoFocus || a.video.focus()
                }, a.once("play", n.playFunc), n.getVideoSize = function () {
                    if (this.video.videoWidth && this.video.videoHeight) {
                        var e = a.root.getBoundingClientRect();
                        "auto" === a.config.fitVideoSize ? e.width / e.height > this.video.videoWidth / this.video.videoHeight ? a.root.style.height = this.video.videoHeight / this.video.videoWidth * e.width + "px" : a.root.style.width = this.video.videoWidth / this.video.videoHeight * e.height + "px" : "fixWidth" === a.config.fitVideoSize ? a.root.style.height = this.video.videoHeight / this.video.videoWidth * e.width + "px" : "fixHeight" === a.config.fitVideoSize && (a.root.style.width = this.video.videoWidth / this.video.videoHeight * e.height + "px")
                    }
                }, a.once("loadeddata", n.getVideoSize), setTimeout((function () {
                    n.emit("ready"), n.isReady = !0
                }), 0), n.config.videoInit && (0, o.hasClass)(n.root, "xgplayer-nostart") && n.start(), a.config.rotate && (a.on("requestFullscreen", n.updateRotateDeg), a.on("exitFullscreen", n.updateRotateDeg)), a.once("destroy", (function e() {
                    a.root.removeEventListener("mousemove", a.mousemoveFunc), a.off("destroy", e)
                })), n
            }

            return function (e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), r(t, [{
                key: "attachVideo", value: function () {
                    var e = this;
                    this.video && 1 === this.video.nodeType && this.root.insertBefore(this.video, this.root.firstChild), setTimeout((function () {
                        e.emit("complete"), e.danmu && "function" == typeof e.danmu.resize && e.danmu.resize()
                    }), 1)
                }
            }, {
                key: "start", value: function () {
                    var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.config.url;
                    if (this.video) {
                        var n = this;
                        t && "" !== t ? (this.canPlayFunc = function () {
                            n.off("canplay", n.canPlayFunc);
                            var e = n.video.play();
                            void 0 !== e && e && e.then((function () {
                                n.emit("autoplay started")
                            })).catch((function () {
                                n.emit("autoplay was prevented"), (0, o.addClass)(n.root, "xgplayer-is-autoplay")
                            }))
                        }, "Array" !== (0, o.typeOf)(t) ? "String" === (0, o.typeOf)(t) && t.indexOf("blob:") > -1 && t === this.video.src || (this.video.src = t) : t.forEach((function (t) {
                            e.video.appendChild((0, o.createDom)("source", "", {
                                src: "" + t.src,
                                type: "" + (t.type || "")
                            }))
                        })), this.config.autoplay && (l.default.os.isPhone ? this.canPlayFunc() : this.on("canplay", this.canPlayFunc)), this.config.disableStartLoad || this.video.load(), this.attachVideo()) : this.emit("urlNull")
                    }
                }
            }, {
                key: "reload", value: function () {
                    this.video.load(), this.reloadFunc = function () {
                        var e = this.play();
                        void 0 !== e && e && e.catch((function (e) {
                        }))
                    }, this.once("loadeddata", this.reloadFunc)
                }
            }, {
                key: "destroy", value: function () {
                    var e = this, n = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], r = this;
                    for (var a in clearInterval(this.bulletResizeTimer), this._interval) clearInterval(this._interval[a]), this._interval[a] = null;
                    this.checkTimer && clearInterval(this.checkTimer), this.waitTimer && clearTimeout(this.waitTimer), this.ev.forEach((function (t) {
                        var n = Object.keys(t)[0], r = e[t[n]];
                        r && e.off(n, r)
                    })), this.loadeddataFunc && this.off("loadeddata", this.loadeddataFunc), this.reloadFunc && this.off("loadeddata", this.reloadFunc), this.replayFunc && this.off("play", this.replayFunc), this.playFunc && this.off("play", this.playFunc), this.getVideoSize && this.off("loadeddata", this.getVideoSize), ["focus", "blur"].forEach((function (t) {
                        e.off(t, e["on" + t.charAt(0).toUpperCase() + t.slice(1)])
                    })), this.config.keyShortcut && "on" !== this.config.keyShortcut || ["video", "controls"].forEach((function (t) {
                        e[t] && e[t].removeEventListener("keydown", (function (e) {
                            r.onKeydown(e, r)
                        }))
                    })), function () {
                        if (this.emit("destroy"), this.video.removeAttribute("src"), this.video.load(), n) {
                            this.root.innerHTML = "";
                            var e = this.root.className.split(" ");
                            e.length > 0 ? this.root.className = e.filter((function (e) {
                                return e.indexOf("xgplayer") < 0
                            })).join(" ") : this.root.className = ""
                        }
                        for (var t in this) delete this[t];
                        (0, u.default)(this)
                    }.call(this), i(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "destroy", this).call(this)
                }
            }, {
                key: "replay", value: function () {
                    var e = this._replay;
                    if ((0, o.removeClass)(this.root, "xgplayer-ended"), l.default.browser.indexOf("ie") > -1 && (this.emit("play"), this.emit("playing")), e && e instanceof Function) e(); else {
                        this.currentTime = 0;
                        var t = this.play();
                        void 0 !== t && t && t.catch((function (e) {
                        }))
                    }
                }
            }, {
                key: "userGestureTrigEvent", value: function (e, t) {
                    var n = this, r = function (e, t) {
                        n.emit(e, t)
                    };
                    this.config.userGestureEventMiddleware && "function" == typeof this.config.userGestureEventMiddleware[e] ? this.config.userGestureEventMiddleware[e].call(this, this, e, t, r) : r.call(this, e, t)
                }
            }, {
                key: "pluginsCall", value: function () {
                    var e = this;
                    t.plugins.s_i18n && t.plugins.s_i18n.call(this, this);
                    var n = this;
                    if (t.plugins) {
                        var r = this.config.ignores;
                        Object.keys(t.plugins).forEach((function (i) {
                            var a = t.plugins[i];
                            a && "function" == typeof a && (r.some((function (e) {
                                return i === e || i === "s_" + e
                            })) || "s_i18n" === i || (["pc", "tablet", "mobile"].some((function (e) {
                                return e === i
                            })) ? i === l.default.device && setTimeout((function () {
                                n.video && a.call(n, n)
                            }), 0) : a.call(e, e)))
                        }))
                    }
                }
            }, {
                key: "onFocus", value: function () {
                    var e = this;
                    (0, o.hasClass)(this.root, "xgplayer-inactive") && e.emit("controlShow"), (0, o.removeClass)(this.root, "xgplayer-inactive"), e.userTimer && clearTimeout(e.userTimer), e.userTimer = setTimeout((function () {
                        e.emit("blur")
                    }), e.config.inactive)
                }
            }, {
                key: "onBlur", value: function () {
                    !this.config.enablePausedInactive && this.paused || this.ended || this.config.closeInactive || ((0, o.hasClass)(this.root, "xgplayer-inactive") || this.emit("controlHide"), (0, o.addClass)(this.root, "xgplayer-inactive"))
                }
            }, {
                key: "onPlay", value: function () {
                    (0, o.addClass)(this.root, "xgplayer-isloading"), (0, o.addClass)(this.root, "xgplayer-playing"), (0, o.removeClass)(this.root, "xgplayer-pause")
                }
            }, {
                key: "onPause", value: function () {
                    (0, o.addClass)(this.root, "xgplayer-pause"), this.userTimer && clearTimeout(this.userTimer), this.emit("focus")
                }
            }, {
                key: "onEnded", value: function () {
                    (0, o.addClass)(this.root, "xgplayer-ended"), (0, o.removeClass)(this.root, "xgplayer-playing")
                }
            }, {
                key: "onSeeking", value: function () {
                    this.isSeeking = !0, this.onWaiting()
                }
            }, {
                key: "onSeeked", value: function () {
                    var e = this;
                    this.once("timeupdate", (function () {
                        e.isSeeking = !1
                    })), this.waitTimer && clearTimeout(this.waitTimer), (0, o.removeClass)(this.root, "xgplayer-isloading")
                }
            }, {
                key: "onWaiting", value: function () {
                    var e = this;
                    e.waitTimer && clearTimeout(e.waitTimer), e.checkTimer && (clearInterval(e.checkTimer), e.checkTimer = null);
                    var t = e.currentTime;
                    e.waitTimer = setTimeout((function () {
                        (0, o.addClass)(e.root, "xgplayer-isloading"), e.checkTimer = setInterval((function () {
                            e.currentTime !== t && ((0, o.removeClass)(e.root, "xgplayer-isloading"), clearInterval(e.checkTimer), e.checkTimer = null)
                        }), 1e3)
                    }), 500)
                }
            }, {
                key: "onPlaying", value: function () {
                    this.paused || (this.isSeeking = !1, this.waitTimer && clearTimeout(this.waitTimer), (0, o.removeClass)(this.root, "xgplayer-isloading xgplayer-nostart xgplayer-pause xgplayer-ended xgplayer-is-error xgplayer-replay"), (0, o.addClass)(this.root, "xgplayer-playing"))
                }
            }], [{
                key: "install", value: function (e, n) {
                    (0, o.checkIsBrowser)() && (t.plugins || (t.plugins = {}), t.plugins[e] || (t.plugins[e] = n))
                }
            }, {
                key: "installAll", value: function (e) {
                    for (var n = 0; n < e.length; n++) t.install(e[n].name, e[n].method)
                }
            }, {
                key: "use", value: function (e, n) {
                    t.plugins || (t.plugins = {}), t.plugins[e] = n
                }
            }, {
                key: "useAll", value: function (e) {
                    for (var n in e) t.use(e[n].name, e[n].method)
                }
            }, {
                key: "controlsRun", value: function (e, t) {
                    e.forEach((function (e) {
                        e.method.call(t)
                    }))
                }
            }]), t
        }(a.default);
        h.util = o.util, h.sniffer = l.default, h.Errors = c.default, h.XgplayerTimeRange = s.default, t.default = h, e.exports = t.default
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(0);
        t.default = {
            name: "s_i18n", method: function () {
                var e = this, t = {
                    en: {
                        HAVE_NOTHING: "There is no information on whether audio/video is ready",
                        HAVE_METADATA: "Audio/video metadata is ready ",
                        HAVE_CURRENT_DATA: "Data about the current play location is available, but there is not enough data to play the next frame/millisecond",
                        HAVE_FUTURE_DATA: "Current and at least one frame of data is available",
                        HAVE_ENOUGH_DATA: "The available data is sufficient to start playing",
                        NETWORK_EMPTY: "Audio/video has not been initialized",
                        NETWORK_IDLE: "Audio/video is active and has been selected for resources, but no network is used",
                        NETWORK_LOADING: "The browser is downloading the data",
                        NETWORK_NO_SOURCE: "No audio/video source was found",
                        MEDIA_ERR_ABORTED: "The fetch process is aborted by the user",
                        MEDIA_ERR_NETWORK: "An error occurred while downloading",
                        MEDIA_ERR_DECODE: "An error occurred while decoding",
                        MEDIA_ERR_SRC_NOT_SUPPORTED: "Audio/video is not supported",
                        REPLAY: "Replay",
                        ERROR: "Network is offline",
                        PLAY_TIPS: "Play",
                        PAUSE_TIPS: "Pause",
                        PLAYNEXT_TIPS: "Play next",
                        DOWNLOAD_TIPS: "Download",
                        ROTATE_TIPS: "Rotate",
                        RELOAD_TIPS: "Reload",
                        FULLSCREEN_TIPS: "Fullscreen",
                        EXITFULLSCREEN_TIPS: "Exit fullscreen",
                        CSSFULLSCREEN_TIPS: "Cssfullscreen",
                        EXITCSSFULLSCREEN_TIPS: "Exit cssfullscreen",
                        TEXTTRACK: "Caption",
                        PIP: "Pip",
                        MINIPLAYER: "Miniplayer",
                        SCREENSHOT: "Screenshot",
                        LIVE: "LIVE",
                        OFF: "Off",
                        MINIPLAYER_DRAG: "Click and hold to drag",
                        AIRPLAY_TIPS: "Airplay"
                    },
                    "zh-cn": {
                        HAVE_NOTHING: "没有关于音频/视频是否就绪的信息",
                        HAVE_METADATA: "音频/视频的元数据已就绪",
                        HAVE_CURRENT_DATA: "关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧/毫秒",
                        HAVE_FUTURE_DATA: "当前及至少下一帧的数据是可用的",
                        HAVE_ENOUGH_DATA: "可用数据足以开始播放",
                        NETWORK_EMPTY: "音频/视频尚未初始化",
                        NETWORK_IDLE: "音频/视频是活动的且已选取资源，但并未使用网络",
                        NETWORK_LOADING: "浏览器正在下载数据",
                        NETWORK_NO_SOURCE: "未找到音频/视频来源",
                        MEDIA_ERR_ABORTED: "取回过程被用户中止",
                        MEDIA_ERR_NETWORK: "当下载时发生错误",
                        MEDIA_ERR_DECODE: "当解码时发生错误",
                        MEDIA_ERR_SRC_NOT_SUPPORTED: "不支持的音频/视频格式",
                        REPLAY: "重播",
                        ERROR: "网络连接似乎出现了问题",
                        PLAY_TIPS: "播放",
                        PAUSE_TIPS: "暂停",
                        PLAYNEXT_TIPS: "下一集",
                        DOWNLOAD_TIPS: "下载",
                        ROTATE_TIPS: "旋转",
                        RELOAD_TIPS: "重新载入",
                        FULLSCREEN_TIPS: "进入全屏",
                        EXITFULLSCREEN_TIPS: "退出全屏",
                        CSSFULLSCREEN_TIPS: "进入样式全屏",
                        EXITCSSFULLSCREEN_TIPS: "退出样式全屏",
                        TEXTTRACK: "字幕",
                        PIP: "画中画",
                        MINIPLAYER: "迷你播放器",
                        SCREENSHOT: "截图",
                        LIVE: "正在直播",
                        OFF: "关闭",
                        MINIPLAYER_DRAG: "点击按住可拖动视频",
                        AIRPLAY_TIPS: "隔空播放"
                    },
                    "zh-hk": {
                        HAVE_NOTHING: "沒有關於音頻/視頻是否就緒的信息",
                        HAVE_METADATA: "音頻/視頻的元數據已就緒",
                        HAVE_CURRENT_DATA: "關於當前播放位置的數據是可用的，但沒有足夠的數據來播放下壹幀/毫秒",
                        HAVE_FUTURE_DATA: "當前及至少下壹幀的數據是可用的",
                        HAVE_ENOUGH_DATA: "可用數據足以開始播放",
                        NETWORK_EMPTY: "音頻/視頻尚未初始化",
                        NETWORK_IDLE: "音頻/視頻是活動的且已選取資源，但並未使用網絡",
                        NETWORK_LOADING: "瀏覽器正在下載數據",
                        NETWORK_NO_SOURCE: "未找到音頻/視頻來源",
                        MEDIA_ERR_ABORTED: "取回過程被用戶中止",
                        MEDIA_ERR_NETWORK: "當下載時發生錯誤",
                        MEDIA_ERR_DECODE: "當解碼時發生錯誤",
                        MEDIA_ERR_SRC_NOT_SUPPORTED: "不支持的音頻/視頻格式",
                        REPLAY: "重播",
                        ERROR: "網絡連接似乎出現了問題",
                        PLAY_TIPS: "播放",
                        PAUSE_TIPS: "暫停",
                        PLAYNEXT_TIPS: "下壹集",
                        DOWNLOAD_TIPS: "下載",
                        ROTATE_TIPS: "旋轉",
                        RELOAD_TIPS: "重新載入",
                        FULLSCREEN_TIPS: "進入全屏",
                        EXITFULLSCREEN_TIPS: "退出全屏",
                        CSSFULLSCREEN_TIPS: "進入樣式全屏",
                        EXITCSSFULLSCREEN_TIPS: "退出樣式全屏",
                        TEXTTRACK: "字幕",
                        PIP: "畫中畫",
                        MINIPLAYER: "迷妳播放器",
                        SCREENSHOT: "截圖",
                        LIVE: "正在直播",
                        OFF: "關閉",
                        MINIPLAYER_DRAG: "點擊按住可拖動視頻",
                        AIRPLAY_TIPS: "隔空播放"
                    },
                    jp: {
                        HAVE_NOTHING: "オーディオ/ビデオが準備できているか情報がありません",
                        HAVE_METADATA: "オーディオ/ビデオのメタデータは準備できています",
                        HAVE_CURRENT_DATA: "現在の再生位置に関するデータは利用可能ですが、次のフレーム/ミリ秒を再生するのに十分なデータがありません",
                        HAVE_FUTURE_DATA: "現在、少なくとも次のフレームのデータが利用可能です",
                        HAVE_ENOUGH_DATA: "利用可能なデータは再生を開始するのに十分です",
                        NETWORK_EMPTY: "オーディオ/ビデオが初期化されていません",
                        NETWORK_IDLE: "オーディオ/ビデオはアクティブでリソースが選択されていますが、ネットワークが使用されていません",
                        NETWORK_LOADING: "ブラウザーはデータをダウンロードしています",
                        NETWORK_NO_SOURCE: "オーディオ/ビデオ のソースが見つかりません",
                        MEDIA_ERR_ABORTED: "ユーザーによってフェッチプロセスが中止されました",
                        MEDIA_ERR_NETWORK: "ダウンロード中にエラーが発生しました",
                        MEDIA_ERR_DECODE: "デコード中にエラーが発生しました",
                        MEDIA_ERR_SRC_NOT_SUPPORTED: "オーディオ/ビデオ の形式がサポートされていません",
                        REPLAY: "リプレイ",
                        ERROR: "ネットワークの接続に問題が発生しました",
                        PLAY_TIPS: "プレイ",
                        PAUSE_TIPS: "一時停止",
                        PLAYNEXT_TIPS: "次をプレイ",
                        DOWNLOAD_TIPS: "ダウンロード",
                        ROTATE_TIPS: "回転",
                        RELOAD_TIPS: "再読み込み",
                        FULLSCREEN_TIPS: "フルスクリーン",
                        EXITFULLSCREEN_TIPS: "フルスクリーンを終了",
                        CSSFULLSCREEN_TIPS: "シアターモード",
                        EXITCSSFULLSCREEN_TIPS: "シアターモードを終了",
                        TEXTTRACK: "字幕",
                        PIP: "ミニプレーヤー",
                        MINIPLAYER: "ミニプレーヤー",
                        SCREENSHOT: "スクリーンショット",
                        LIVE: "生放送",
                        OFF: "オフ",
                        MINIPLAYER_DRAG: "ボタンを押して働画をドラッグする",
                        AIRPLAY_TIPS: "隔空放送"
                    }
                };
                Object.defineProperty(e, "lang", {
                    get: function () {
                        return e.config && t[e.config.lang] || t.en
                    }, set: function (e) {
                        "Object" === (0, r.typeOf)(e) && Object.keys(e).forEach((function (n) {
                            t[n] = e[n]
                        }))
                    }
                })
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = function () {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }

            return function (t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(), i = l(n(12)), a = n(0), o = l(n(4));

        function l(e) {
            return e && e.__esModule ? e : {default: e}
        }

        var s = function () {
            function e(t) {
                var n = this;
                !function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this._hasStart = !1, this.videoConfig = {
                    controls: !!t.isShowControl,
                    autoplay: t.autoplay,
                    playsinline: t.playsinline,
                    "webkit-playsinline": t.playsinline,
                    "x5-playsinline": t.playsinline,
                    "x5-video-player-type": t["x5-video-player-type"] || t.x5VideoPlayerType,
                    "x5-video-player-fullscreen": t["x5-video-player-fullscreen"] || t.x5VideoPlayerFullscreen,
                    "x5-video-orientation": t["x5-video-orientation"] || t.x5VideoOrientation,
                    airplay: t.airplay,
                    "webkit-airplay": t.airplay,
                    tabindex: 2,
                    mediaType: t.mediaType || "video"
                }, t.muted && (this.videoConfig.muted = "muted"), t.loop && (this.videoConfig.loop = "loop");
                var r = "";
                if (this.textTrackShowDefault = !0, t.nativeTextTrack && Array.isArray(t.nativeTextTrack) && (t.nativeTextTrack.length > 0 && !t.nativeTextTrack.some((function (e) {
                    return e.default
                })) && (t.nativeTextTrack[0].default = !0, this.textTrackShowDefault = !1), t.nativeTextTrack.some((function (e) {
                    if (e.src && e.label && e.default) return r += '<track src="' + e.src + '" ', e.kind && (r += 'kind="' + e.kind + '" '), r += 'label="' + e.label + '" ', e.srclang && (r += 'srclang="' + e.srclang + '" '), r += (e.default ? "default" : "") + ">", !0
                })), this.videoConfig.crossorigin = "anonymous"), t.textTrackStyle) {
                    var o = document.createElement("style");
                    this.textTrackStyle = o, document.head.appendChild(o);
                    var l = "";
                    for (var s in t.textTrackStyle) l += s + ": " + t.textTrackStyle[s] + ";";
                    var c = t.id ? "#" + t.id : t.el.id ? "#" + t.el.id : "." + t.el.className;
                    o.sheet.insertRule ? o.sheet.insertRule(c + " video::cue { " + l + " }", 0) : o.sheet.addRule && o.sheet.addRule(c + " video::cue", l)
                }
                var u = t.el ? t.el : (0, a.findDom)(document, "#" + t.id), p = this.constructor.XgVideoProxy;
                p && this.videoConfig.mediaType === p.mediaType ? this.video = new p(u, t) : this.video = (0, a.createDom)(this.videoConfig.mediaType, r, this.videoConfig, ""), t.videoStyle && Object.keys(t.videoStyle).forEach((function (e) {
                    (0, a.setStyle)(n.video, e, t.videoStyle[e])
                })), !this.textTrackShowDefault && r && (this.video.getElementsByTagName("Track")[0].track.mode = "hidden"), t.autoplay && (this.video.autoplay = !0, t.autoplayMuted && (this.video.muted = !0)), this.ev = ["play", "playing", "pause", "ended", "error", "seeking", "seeked", "progress", "timeupdate", "waiting", "canplay", "canplaythrough", "durationchange", "volumechange", "ratechange", "loadedmetadata", "loadeddata", "loadstart"].map((function (e) {
                    return t = {}, n = e, r = "on" + e.charAt(0).toUpperCase() + e.slice(1), n in t ? Object.defineProperty(t, n, {
                        value: r,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : t[n] = r, t;
                    var t, n, r
                })), (0, i.default)(this), this._interval = {};
                var d = "0,0", f = this, g = function (e) {
                    n && ("play" === e ? n.hasStart = !0 : "canplay" === e ? (0, a.removeClass)(n.root, "xgplayer-is-enter") : "waiting" === e ? n.inWaitingStart = (new Date).getTime() : "playing" === e && ((0, a.removeClass)(n.root, "xgplayer-is-enter"), n.inWaitingStart && (n.inWaitingStart = void 0)), "error" === e ? n._onError(e) : n.emit(e, n), n.hasOwnProperty("_interval") && (["ended", "error", "timeupdate"].indexOf(e) < 0 ? ((0, a._clearInterval)(n, "bufferedChange"), (0, a._setInterval)(n, "bufferedChange", (function () {
                        if (this.video && this.video.buffered) {
                            for (var e = [], t = 0, n = this.video.buffered.length; t < n; t++) e.push([this.video.buffered.start(t), this.video.buffered.end(t)]);
                            e.toString() !== d && (d = e.toString(), this.emit("bufferedChange", e))
                        }
                    }), 200)) : "timeupdate" !== e && (0, a._clearInterval)(n, "bufferedChange")))
                }, h = function (e) {
                    t.videoEventMiddleware && "function" == typeof t.videoEventMiddleware[e] ? t.videoEventMiddleware[e].call(n, n, e, g) : g.call(n, e)
                };
                this.ev.forEach((function (e) {
                    f.evItem = Object.keys(e)[0];
                    var t = Object.keys(e)[0];
                    f.video.addEventListener(Object.keys(e)[0], h.bind(f, t))
                }))
            }

            return r(e, [{
                key: "_onError", value: function (e) {
                    this.video && this.video.error && this.emit(e, new o.default("other", this.currentTime, this.duration, this.networkState, this.readyState, this.currentSrc, this.src, this.ended, {
                        line: 162,
                        msg: this.error,
                        handle: "Constructor"
                    }, this.video.error.code, this.video.error))
                }
            }, {
                key: "destroy", value: function () {
                    this.textTrackStyle && this.textTrackStyle.parentNode.removeChild(this.textTrackStyle)
                }
            }, {
                key: "play", value: function () {
                    return this.video.play()
                }
            }, {
                key: "pause", value: function () {
                    this.video.pause()
                }
            }, {
                key: "canPlayType", value: function (e) {
                    return this.video.canPlayType(e)
                }
            }, {
                key: "getBufferedRange", value: function (e) {
                    var t = [0, 0], n = this.video;
                    e || (e = n.buffered);
                    var r = n.currentTime;
                    if (e) for (var i = 0, a = e.length; i < a && (t[0] = e.start(i), t[1] = e.end(i), !(t[0] <= r && r <= t[1])); i++) ;
                    return t[0] - r <= 0 && r - t[1] <= 0 ? t : [0, 0]
                }
            }, {
                key: "proxyOn", value: function (e, t) {
                    (0, a.on)(this, e, t, "destroy")
                }
            }, {
                key: "proxyOnce", value: function (e, t) {
                    (0, a.once)(this, e, t, "destroy")
                }
            }, {
                key: "hasStart", get: function () {
                    return this._hasStart
                }, set: function (e) {
                    "boolean" != typeof e || !0 !== e || this._hasStart || (this._hasStart = !0, this.emit("hasstart"))
                }
            }, {
                key: "autoplay", set: function (e) {
                    this.video && (this.video.autoplay = e)
                }, get: function () {
                    return !!this.video && this.video.autoplay
                }
            }, {
                key: "buffered", get: function () {
                    return this.video ? this.video.buffered : void 0
                }
            }, {
                key: "buffered2", get: function () {
                    return (0, a.getBuffered2)(this.video.buffered)
                }
            }, {
                key: "crossOrigin", get: function () {
                    return !!this.video && this.video.crossOrigin
                }, set: function (e) {
                    this.video && (this.video.crossOrigin = e)
                }
            }, {
                key: "currentSrc", get: function () {
                    return this.video ? this.video.currentSrc : void 0
                }
            }, {
                key: "currentTime", get: function () {
                    return this.video && this.video.currentTime || 0
                }, set: function (e) {
                    var t = this;
                    ("function" != typeof isFinite || isFinite(e)) && ((0, a.hasClass)(this.root, "xgplayer-ended") ? (this.once("playing", (function () {
                        t.video.currentTime = e
                    })), this.replay()) : this.video.currentTime = e, this.emit("currentTimeChange", e))
                }
            }, {
                key: "defaultMuted", get: function () {
                    return !!this.video && this.video.defaultMuted
                }, set: function (e) {
                    this.video && (this.video.defaultMuted = e)
                }
            }, {
                key: "duration", get: function () {
                    return this.config.duration ? this.video ? Math.min(this.config.duration, this.video.duration) : this.config.duration : this.video ? this.video.duration : null
                }
            }, {
                key: "ended", get: function () {
                    return !this.video || this.video.ended || !1
                }
            }, {
                key: "error", get: function () {
                    var e = this.video.error;
                    if (!e) return null;
                    var t = [{en: "MEDIA_ERR_ABORTED", cn: "取回过程被用户中止"}, {
                        en: "MEDIA_ERR_NETWORK",
                        cn: "当下载时发生错误"
                    }, {en: "MEDIA_ERR_DECODE", cn: "当解码时发生错误"}, {
                        en: "MEDIA_ERR_SRC_NOT_SUPPORTED",
                        cn: "不支持音频/视频"
                    }];
                    return this.lang ? this.lang[t[e.code - 1].en] : t[e.code - 1].en
                }
            }, {
                key: "loop", get: function () {
                    return !!this.video && this.video.loop
                }, set: function (e) {
                    this.video && (this.video.loop = e)
                }
            }, {
                key: "muted", get: function () {
                    return !!this.video && this.video.muted
                }, set: function (e) {
                    this.video && (this.video.muted = e)
                }
            }, {
                key: "networkState", get: function () {
                    var e = [{en: "NETWORK_EMPTY", cn: "音频/视频尚未初始化"}, {
                        en: "NETWORK_IDLE",
                        cn: "音频/视频是活动的且已选取资源，但并未使用网络"
                    }, {en: "NETWORK_LOADING", cn: "浏览器正在下载数据"}, {
                        en: "NETWORK_NO_SOURCE",
                        cn: "未找到音频/视频来源"
                    }];
                    return this.lang ? this.lang[e[this.video.networkState].en] : e[this.video.networkState].en
                }
            }, {
                key: "paused", get: function () {
                    return (0, a.hasClass)(this.root, "xgplayer-pause")
                }
            }, {
                key: "playbackRate", get: function () {
                    return this.video ? this.video.playbackRate : 1
                }, set: function (e) {
                    this.video && (this.video.playbackRate = e)
                }
            }, {
                key: "played", get: function () {
                    return this.video ? this.video.played : void 0
                }
            }, {
                key: "preload", get: function () {
                    return !!this.video && this.video.preload
                }, set: function (e) {
                    this.video && (this.video.preload = e)
                }
            }, {
                key: "readyState", get: function () {
                    var e = [{en: "HAVE_NOTHING", cn: "没有关于音频/视频是否就绪的信息"}, {
                        en: "HAVE_METADATA",
                        cn: "关于音频/视频就绪的元数据"
                    }, {
                        en: "HAVE_CURRENT_DATA",
                        cn: "关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧/毫秒"
                    }, {en: "HAVE_FUTURE_DATA", cn: "当前及至少下一帧的数据是可用的"}, {
                        en: "HAVE_ENOUGH_DATA",
                        cn: "可用数据足以开始播放"
                    }];
                    return this.lang ? this.lang[e[this.video.readyState].en] : e[this.video.readyState]
                }
            }, {
                key: "seekable", get: function () {
                    return !!this.video && this.video.seekable
                }
            }, {
                key: "seeking", get: function () {
                    return !!this.video && this.video.seeking
                }
            }, {
                key: "src", get: function () {
                    return this.video ? this.video.src : void 0
                }, set: function (e) {
                    (0, a.hasClass)(this.root, "xgplayer-ended") || this.emit("urlchange", this.video.src), (0, a.removeClass)(this.root, "xgplayer-ended xgplayer-is-replay xgplayer-is-error"), this.video.pause(), this.emit("pause"), this.video.src = e, this.emit("srcChange")
                }
            }, {
                key: "poster", set: function (e) {
                    var t = (0, a.findDom)(this.root, ".xgplayer-poster");
                    t && (t.style.backgroundImage = "url(" + e + ")")
                }
            }, {
                key: "volume", get: function () {
                    return this.video ? this.video.volume : 1
                }, set: function (e) {
                    this.video && (this.video.volume = e)
                }
            }, {
                key: "fullscreen", get: function () {
                    return (0, a.hasClass)(this.root, "xgplayer-is-fullscreen") || (0, a.hasClass)(this.root, "xgplayer-fullscreen-active")
                }
            }, {
                key: "bullet", get: function () {
                    return !!(0, a.findDom)(this.root, "xg-danmu") && (0, a.hasClass)((0, a.findDom)(this.root, "xg-danmu"), "xgplayer-has-danmu")
                }
            }, {
                key: "textTrack", get: function () {
                    return (0, a.hasClass)(this.root, "xgplayer-is-textTrack")
                }
            }, {
                key: "pip", get: function () {
                    return (0, a.hasClass)(this.root, "xgplayer-pip-active")
                }
            }, {
                key: "isMiniPlayer", get: function () {
                    return (0, a.hasClass)(this.root, "xgplayer-miniplayer-active")
                }
            }]), e
        }();
        t.default = s, e.exports = t.default
    }, function (e, t, n) {
        var r, i, a, o, l, s, c, u = n(13), p = n(30), d = Function.prototype.apply, f = Function.prototype.call,
            g = Object.create, h = Object.defineProperty, y = Object.defineProperties,
            m = Object.prototype.hasOwnProperty, v = {configurable: !0, enumerable: !1, writable: !0};
        i = function (e, t) {
            var n, i;
            return p(t), i = this, r.call(this, e, n = function () {
                a.call(i, e, n), d.call(t, this, arguments)
            }), n.__eeOnceListener__ = t, this
        }, o = function (e) {
            var t, n, r, i, a;
            if (m.call(this, "__ee__") && (i = this.__ee__[e])) if ("object" == typeof i) {
                for (n = arguments.length, a = new Array(n - 1), t = 1; t < n; ++t) a[t - 1] = arguments[t];
                for (i = i.slice(), t = 0; r = i[t]; ++t) d.call(r, this, a)
            } else switch (arguments.length) {
                case 1:
                    f.call(i, this);
                    break;
                case 2:
                    f.call(i, this, arguments[1]);
                    break;
                case 3:
                    f.call(i, this, arguments[1], arguments[2]);
                    break;
                default:
                    for (n = arguments.length, a = new Array(n - 1), t = 1; t < n; ++t) a[t - 1] = arguments[t];
                    d.call(i, this, a)
            }
        }, l = {
            on: r = function (e, t) {
                var n;
                return p(t), m.call(this, "__ee__") ? n = this.__ee__ : (n = v.value = g(null), h(this, "__ee__", v), v.value = null), n[e] ? "object" == typeof n[e] ? n[e].push(t) : n[e] = [n[e], t] : n[e] = t, this
            }, once: i, off: a = function (e, t) {
                var n, r, i, a;
                if (p(t), !m.call(this, "__ee__")) return this;
                if (!(n = this.__ee__)[e]) return this;
                if ("object" == typeof (r = n[e])) for (a = 0; i = r[a]; ++a) i !== t && i.__eeOnceListener__ !== t || (2 === r.length ? n[e] = r[a ? 0 : 1] : r.splice(a, 1)); else r !== t && r.__eeOnceListener__ !== t || delete n[e];
                return this
            }, emit: o
        }, s = {on: u(r), once: u(i), off: u(a), emit: u(o)}, c = y({}, s), e.exports = t = function (e) {
            return null == e ? g(c) : y(Object(e), s)
        }, t.methods = l
    }, function (e, t, n) {
        var r = n(6), i = n(14), a = n(18), o = n(26), l = n(27), s = e.exports = function (e, t) {
            var n, i, s, c, u;
            return arguments.length < 2 || "string" != typeof e ? (c = t, t = e, e = null) : c = arguments[2], r(e) ? (n = l.call(e, "c"), i = l.call(e, "e"), s = l.call(e, "w")) : (n = s = !0, i = !1), u = {
                value: t,
                configurable: n,
                enumerable: i,
                writable: s
            }, c ? a(o(c), u) : u
        };
        s.gs = function (e, t, n) {
            var s, c, u, p;
            return "string" != typeof e ? (u = n, n = t, t = e, e = null) : u = arguments[3], r(t) ? i(t) ? r(n) ? i(n) || (u = n, n = void 0) : n = void 0 : (u = t, t = n = void 0) : t = void 0, r(e) ? (s = l.call(e, "c"), c = l.call(e, "e")) : (s = !0, c = !1), p = {
                get: t,
                set: n,
                configurable: s,
                enumerable: c
            }, u ? a(o(u), p) : p
        }
    }, function (e, t, n) {
        var r = n(15), i = /^\s*class[\s{/}]/, a = Function.prototype.toString;
        e.exports = function (e) {
            return !!r(e) && !i.test(a.call(e))
        }
    }, function (e, t, n) {
        var r = n(16);
        e.exports = function (e) {
            if ("function" != typeof e) return !1;
            if (!hasOwnProperty.call(e, "length")) return !1;
            try {
                if ("number" != typeof e.length) return !1;
                if ("function" != typeof e.call) return !1;
                if ("function" != typeof e.apply) return !1
            } catch (t) {
                return !1
            }
            return !r(e)
        }
    }, function (e, t, n) {
        var r = n(17);
        e.exports = function (e) {
            if (!r(e)) return !1;
            try {
                return !!e.constructor && e.constructor.prototype === e
            } catch (t) {
                return !1
            }
        }
    }, function (e, t, n) {
        var r = n(6), i = {object: !0, function: !0, undefined: !0};
        e.exports = function (e) {
            return !!r(e) && hasOwnProperty.call(i, typeof e)
        }
    }, function (e, t, n) {
        e.exports = n(19)() ? Object.assign : n(20)
    }, function (e, t, n) {
        e.exports = function () {
            var e, t = Object.assign;
            return "function" == typeof t && (t(e = {foo: "raz"}, {bar: "dwa"}, {trzy: "trzy"}), e.foo + e.bar + e.trzy === "razdwatrzy")
        }
    }, function (e, t, n) {
        var r = n(21), i = n(25), a = Math.max;
        e.exports = function (e, t) {
            var n, o, l, s = a(arguments.length, 2);
            for (e = Object(i(e)), l = function (r) {
                try {
                    e[r] = t[r]
                } catch (i) {
                    n || (n = i)
                }
            }, o = 1; o < s; ++o) r(t = arguments[o]).forEach(l);
            if (void 0 !== n) throw n;
            return e
        }
    }, function (e, t, n) {
        e.exports = n(22)() ? Object.keys : n(23)
    }, function (e, t, n) {
        e.exports = function () {
            try {
                return Object.keys("primitive"), !0
            } catch (e) {
                return !1
            }
        }
    }, function (e, t, n) {
        var r = n(3), i = Object.keys;
        e.exports = function (e) {
            return i(r(e) ? Object(e) : e)
        }
    }, function (e, t, n) {
        e.exports = function () {
        }
    }, function (e, t, n) {
        var r = n(3);
        e.exports = function (e) {
            if (!r(e)) throw new TypeError("Cannot use null or undefined");
            return e
        }
    }, function (e, t, n) {
        var r = n(3), i = Array.prototype.forEach, a = Object.create;
        e.exports = function (e) {
            var t = a(null);
            return i.call(arguments, (function (e) {
                r(e) && function (e, t) {
                    var n;
                    for (n in e) t[n] = e[n]
                }(Object(e), t)
            })), t
        }
    }, function (e, t, n) {
        e.exports = n(28)() ? String.prototype.contains : n(29)
    }, function (e, t, n) {
        var r = "razdwatrzy";
        e.exports = function () {
            return "function" == typeof r.contains && !0 === r.contains("dwa") && !1 === r.contains("foo")
        }
    }, function (e, t, n) {
        var r = String.prototype.indexOf;
        e.exports = function (e) {
            return r.call(this, e, arguments[1]) > -1
        }
    }, function (e, t, n) {
        e.exports = function (e) {
            if ("function" != typeof e) throw new TypeError(e + " is not a function");
            return e
        }
    }, function (e, t, n) {
        var r = n(32), i = Object.prototype.hasOwnProperty;
        e.exports = function (e) {
            var t, n = arguments[1];
            if (r(e), void 0 === n) i.call(e, "__ee__") && delete e.__ee__; else {
                if (!(t = i.call(e, "__ee__") && e.__ee__)) return;
                t[n] && delete t[n]
            }
        }
    }, function (e, t, n) {
        var r = n(33);
        e.exports = function (e) {
            if (!r(e)) throw new TypeError(e + " is not an Object");
            return e
        }
    }, function (e, t, n) {
        var r = n(3), i = {function: !0, object: !0};
        e.exports = function (e) {
            return r(e) && i[typeof e] || !1
        }
    }, function (e, t, n) {
        var r = n(35);
        "string" == typeof r && (r = [[e.i, r, ""]]);
        var i = {hmr: !0, transform: void 0, insertInto: void 0};
        n(2)(r, i), r.locals && (e.exports = r.locals)
    }, function (e, t, n) {
        (e.exports = n(1)(!1)).push([e.i, ".xgplayer-skin-default{background:#000;width:100%;height:100%;position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none;-ms-user-select:none}.xgplayer-skin-default *{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}.xgplayer-skin-default.xgplayer-rotate-fullscreen{position:absolute;top:0;left:100%;bottom:0;right:0;height:100vw!important;width:100vh!important;-webkit-transform-origin:top left;-ms-transform-origin:top left;transform-origin:top left;-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg)}.xgplayer-skin-default.xgplayer-is-fullscreen{width:100%!important;height:100%!important;padding-top:0!important;z-index:9999}.xgplayer-skin-default.xgplayer-is-fullscreen.xgplayer-inactive{cursor:none}.xgplayer-skin-default video{width:100%;height:100%;outline:none}.xgplayer-skin-default .xgplayer-none{display:none}@-webkit-keyframes loadingRotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes loadingRotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@-webkit-keyframes loadingDashOffset{0%{stroke-dashoffset:236}to{stroke-dashoffset:0}}@keyframes loadingDashOffset{0%{stroke-dashoffset:236}to{stroke-dashoffset:0}}.xgplayer-skin-default .xgplayer-controls{display:-webkit-flex;display:-moz-box;display:flex;position:absolute;bottom:0;left:0;right:0;height:40px;background-image:linear-gradient(180deg,transparent,rgba(0,0,0,.37),rgba(0,0,0,.75),rgba(0,0,0,.75));z-index:10}.xgplayer-skin-default.xgplayer-inactive .xgplayer-controls,.xgplayer-skin-default.xgplayer-is-live .xgplayer-controls .xgplayer-progress,.xgplayer-skin-default.xgplayer-is-live .xgplayer-controls .xgplayer-time,.xgplayer-skin-default.xgplayer-no-controls .xgplayer-controls,.xgplayer-skin-default.xgplayer-nostart .xgplayer-controls{display:none}.xgplayer-skin-default.xgplayer-is-live .xgplayer-controls .xgplayer-live{display:block}.xgplayer-skin-default .xgplayer-live{display:block;font-size:12px;color:#fff;line-height:40px;-webkit-order:1;-moz-box-ordinal-group:2;order:1}.xgplayer-skin-default .xgplayer-icon{display:block;width:40px;height:40px;overflow:hidden;fill:#fff}.xgplayer-skin-default .xgplayer-icon svg{position:absolute}.xgplayer-skin-default .xgplayer-tips{background:rgba(0,0,0,.54);border-radius:1px;display:none;position:absolute;font-family:PingFangSC-Regular;font-size:11px;color:#fff;padding:2px 4px;text-align:center;top:-30px;left:50%;margin-left:-16px;width:auto;white-space:nowrap}.xgplayer-skin-default.xgplayer-mobile .xgplayer-tips{display:none!important}.xgplayer-skin-default .xgplayer-screen-container{display:block;width:100%}", ""])
    }, function (e, t) {
        e.exports = function (e) {
            var t = "undefined" != typeof window && window.location;
            if (!t) throw new Error("fixUrls requires window.location");
            if (!e || "string" != typeof e) return e;
            var n = t.protocol + "//" + t.host, r = n + t.pathname.replace(/\/[^\/]*$/, "/");
            return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, (function (e, t) {
                var i, a = t.trim().replace(/^"(.*)"$/, (function (e, t) {
                    return t
                })).replace(/^'(.*)'$/, (function (e, t) {
                    return t
                }));
                return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(a) ? e : (i = 0 === a.indexOf("//") ? a : 0 === a.indexOf("/") ? n + a : r + a.replace(/^\.\//, ""), "url(" + JSON.stringify(i) + ")")
            }))
        }
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(0);
        t.default = {
            name: "mobile", method: function () {
                var e = this, t = e.root, n = 0, i = void 0, a = {first: "", second: ""};

                function o(t) {
                    e.video.addEventListener("touchend", (function (t) {
                        e.onElementTouchend(t, e.video)
                    })), e.video.addEventListener("touchstart", (function () {
                        e.isTouchMove = !1
                    })), e.video.addEventListener("touchmove", (function () {
                        e.isTouchMove = !0
                    })), e.config.autoplay && e.start()
                }

                e.onElementTouchend = function (e, o) {
                    this.config.closeVideoPreventDefault || e.preventDefault(), this.config.closeVideoStopPropagation || e.stopPropagation();
                    var l = this;
                    if ((0, r.hasClass)(t, "xgplayer-inactive") ? l.emit("focus") : l.emit("blur"), !l.config.closeVideoTouch && !l.isTouchMove) {
                        var s = function () {
                            i = setTimeout((function () {
                                if ((0, r.hasClass)(l.root, "xgplayer-nostart")) return !1;
                                if (!l.ended) if (l.paused) {
                                    var e = l.play();
                                    void 0 !== e && e && e.catch((function (e) {
                                    }))
                                } else l.pause();
                                n = 0
                            }), 200)
                        };
                        l.config.closeVideoClick || (n++, i && clearTimeout(i), 1 === n ? l.config.enableVideoDbltouch ? a.first = new Date : s() : 2 === n && l.config.enableVideoDbltouch ? (a.second = new Date, Math.abs(a.first - a.second) < 400 ? s() : (a.first = new Date, n = 1)) : n = 0)
                    }
                }, e.once("ready", o), e.once("destroy", (function t() {
                    e.off("ready", o), e.off("destroy", t)
                }))
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(0);
        t.default = {
            name: "pc", method: function () {
                var e = this;
                if (e.controls && e.video) {
                    var t = e.controls, n = e.root, i = 0, a = void 0;
                    e.onElementClick = function (e, t) {
                        this.config.closeVideoPreventDefault || e.preventDefault(), this.config.closeVideoStopPropagation || e.stopPropagation();
                        var n = this;
                        n.config.closeVideoClick || (i++, a && clearTimeout(a), 1 === i ? a = setTimeout((function () {
                            if ((0, r.hasClass)(n.root, "xgplayer-nostart")) return !1;
                            if (!n.ended) if (n.paused) {
                                var e = n.play();
                                void 0 !== e && e && e.catch((function (e) {
                                }))
                            } else n.pause();
                            i = 0
                        }), 200) : i = 0)
                    }, e.video.addEventListener("click", (function (t) {
                        e.onElementClick(t, e.video)
                    }), !1), e.onElementDblclick = function (e, n) {
                        if (this.config.closeVideoPreventDefault || e.preventDefault(), this.config.closeVideoStopPropagation || e.stopPropagation(), !this.config.closeVideoDblclick) {
                            var r = t.querySelector(".xgplayer-fullscreen");
                            if (r) {
                                var i = void 0;
                                document.createEvent ? (i = document.createEvent("Event")).initEvent("click", !0, !0) : i = new Event("click"), r.dispatchEvent(i)
                            }
                        }
                    }, e.video.addEventListener("dblclick", (function (t) {
                        e.onElementDblclick(t, e.video)
                    }), !1), n.addEventListener("mouseenter", o), n.addEventListener("mouseleave", l), t.addEventListener("mouseenter", (function (t) {
                        e.userTimer && clearTimeout(e.userTimer)
                    })), t.addEventListener("mouseleave", (function (t) {
                        e.config.closeControlsBlur || e.emit("focus", e)
                    })), t.addEventListener("click", (function (e) {
                        e.preventDefault(), e.stopPropagation()
                    })), e.once("ready", s), e.once("destroy", (function t() {
                        n.removeEventListener("mouseenter", o), n.removeEventListener("mouseleave", l), e.off("ready", s), e.off("destroy", t)
                    }))
                }

                function o() {
                    clearTimeout(e.leavePlayerTimer), e.emit("focus", e)
                }

                function l() {
                    e.config.closePlayerBlur || (e.leavePlayerTimer = setTimeout((function () {
                        e.emit("blur", e)
                    }), e.config.leavePlayerTime || 0))
                }

                function s(t) {
                    e.config.autoplay && e.start()
                }
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(0);
        t.default = {
            name: "start", method: function () {
                var e = this, t = e.root;

                function n() {
                    e.off("canplay", n);
                    var t = e.play();
                    void 0 !== t && t && t.catch((function (e) {
                    }))
                }

                function i() {
                    (0, r.hasClass)(t, "xgplayer-nostart") ? ((0, r.removeClass)(t, "xgplayer-nostart"), (0, r.addClass)(t, "xgplayer-is-enter"), "function" == typeof t.contains ? e.video && 1 === e.video.nodeType && !t.contains(e.video) || e.video && 1 !== e.video.nodeType && void 0 === e.video.mediaSource ? (e.once("canplay", n), e.start()) : n() : e.video && 1 === e.video.nodeType && !t.querySelector(this.videoConfig.mediaType) || e.video && 1 !== e.video.nodeType && void 0 === e.video.mediaSource ? (e.once("canplay", n), e.start()) : n()) : e.paused && ((0, r.removeClass)(t, "xgplayer-nostart xgplayer-isloading"), setTimeout((function () {
                        var t = e.play();
                        void 0 !== t && t && t.catch((function (e) {
                        }))
                    }), 10))
                }

                e.on("startBtnClick", i), e.once("destroy", (function t() {
                    e.off("startBtnClick", i), e.off("canplay", n), e.off("destroy", t)
                }))
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(0), i = o(n(41)), a = o(n(42));

        function o(e) {
            return e && e.__esModule ? e : {default: e}
        }

        n(43), t.default = {
            name: "s_start", method: function () {
                var e = this, t = e.root,
                    n = (0, r.createDom)("xg-start", '<div class="xgplayer-icon-play">' + i.default + '</div>\n                                      <div class="xgplayer-icon-pause">' + a.default + "</div>", {}, "xgplayer-start");

                function o(e) {
                    (0, r.addClass)(e.root, "xgplayer-skin-default"), e.config && (e.config.autoplay && !(0, r.isWeiXin)() && !(0, r.isUc)() && (0, r.addClass)(e.root, "xgplayer-is-enter"), e.config.lang && "en" === e.config.lang ? (0, r.addClass)(e.root, "xgplayer-lang-is-en") : "jp" === e.config.lang && (0, r.addClass)(e.root, "xgplayer-lang-is-jp"), e.config.enableContextmenu || e.video.addEventListener("contextmenu", (function (e) {
                        e.preventDefault(), e.stopPropagation()
                    })))
                }

                e.config && e.config.hideStartBtn && (0, r.addClass)(t, "xgplayer-start-hide"), e.isReady ? (t.appendChild(n), o(e)) : e.once("ready", (function () {
                    t.appendChild(n), o(e)
                })), e.once("autoplay was prevented", (function () {
                    (0, r.removeClass)(e.root, "xgplayer-is-enter"), (0, r.addClass)(e.root, "xgplayer-nostart")
                })), e.once("canplay", (function () {
                    (0, r.removeClass)(e.root, "xgplayer-is-enter")
                })), n.onclick = function (t) {
                    t.preventDefault(), t.stopPropagation(), e.userGestureTrigEvent("startBtnClick")
                }
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        n.r(t), t.default = '<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70">\n  <path transform="translate(15,15) scale(0.04,0.04)" d="M576,363L810,512L576,661zM342,214L576,363L576,661L342,810z"></path>\n</svg>\n'
    }, function (e, t, n) {
        n.r(t), t.default = '<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70">\n  <path transform="translate(15,15) scale(0.04 0.04)" d="M598,214h170v596h-170v-596zM256 810v-596h170v596h-170z"></path>\n</svg>\n'
    }, function (e, t, n) {
        var r = n(44);
        "string" == typeof r && (r = [[e.i, r, ""]]);
        var i = {hmr: !0, transform: void 0, insertInto: void 0};
        n(2)(r, i), r.locals && (e.exports = r.locals)
    }, function (e, t, n) {
        (e.exports = n(1)(!1)).push([e.i, ".xgplayer-skin-default .xgplayer-start{border-radius:50%;display:inline-block;width:70px;height:70px;background:rgba(0,0,0,.38);overflow:hidden;text-align:center;line-height:70px;vertical-align:middle;position:absolute;left:50%;top:50%;z-index:115;margin:-35px auto auto -35px;cursor:pointer}.xgplayer-skin-default .xgplayer-start div{position:absolute}.xgplayer-skin-default .xgplayer-start div svg{fill:hsla(0,0%,100%,.7)}.xgplayer-skin-default .xgplayer-start .xgplayer-icon-play{display:block}.xgplayer-skin-default .xgplayer-start .xgplayer-icon-pause{display:none}.xgplayer-skin-default .xgplayer-start:hover{opacity:.85}.xgplayer-skin-default.xgplayer-pause.xgplayer-start-hide .xgplayer-start,.xgplayer-skin-default.xgplayer-playing .xgplayer-start,.xgplayer-skin-default.xgplayer-playing .xgplayer-start .xgplayer-icon-play,.xgplayer-skin-default.xgplayer-start-hide .xgplayer-start{display:none}.xgplayer-skin-default.xgplayer-playing .xgplayer-start .xgplayer-icon-pause{display:block}.xgplayer-skin-default.xgplayer-pause .xgplayer-start{display:inline-block}.xgplayer-skin-default.xgplayer-pause .xgplayer-start .xgplayer-icon-play{display:block}.xgplayer-skin-default.xgplayer-is-replay .xgplayer-start,.xgplayer-skin-default.xgplayer-pause .xgplayer-start .xgplayer-icon-pause{display:none}.xgplayer-skin-default.xgplayer-is-replay .xgplayer-start .xgplayer-icon-play{display:block}.xgplayer-skin-default.xgplayer-is-replay .xgplayer-start .xgplayer-icon-pause{display:none}", ""])
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(0);
        t.default = {
            name: "fullscreen", method: function () {
                var e = this, t = e.root;

                function n() {
                    e.config.rotateFullscreen ? (0, r.hasClass)(t, "xgplayer-rotate-fullscreen") ? e.exitRotateFullscreen() : e.getRotateFullscreen() : (0, r.hasClass)(t, "xgplayer-is-fullscreen") ? e.exitFullscreen(t) : e.getFullscreen(t)
                }

                function i() {
                    var n = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
                    n && n === t ? ((0, r.addClass)(t, "xgplayer-is-fullscreen"), e.emit("requestFullscreen")) : (0, r.hasClass)(t, "xgplayer-is-fullscreen") && ((0, r.removeClass)(t, "xgplayer-is-fullscreen"), e.emit("exitFullscreen")), e.danmu && "function" == typeof e.danmu.resize && e.danmu.resize()
                }

                function a(n) {
                    e.video.webkitPresentationMode !== r.PresentationMode.FULLSCREEN && ((0, r.removeClass)(t, "xgplayer-is-fullscreen"), e.emit("exitFullscreen"))
                }

                e.on("fullscreenBtnClick", n), ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"].forEach((function (e) {
                    document.addEventListener(e, i)
                })), e.video.addEventListener("webkitbeginfullscreen", (function () {
                    (0, r.addClass)(t, "xgplayer-is-fullscreen"), e.emit("requestFullscreen")
                })), e.video.addEventListener("webkitendfullscreen", (function () {
                    (0, r.removeClass)(t, "xgplayer-is-fullscreen"), e.emit("exitFullscreen")
                })), (0, r.checkWebkitSetPresentationMode)(e.video) && e.video.addEventListener("webkitpresentationmodechanged", a), e.once("destroy", (function t() {
                    e.off("fullscreenBtnClick", n), ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"].forEach((function (e) {
                        document.removeEventListener(e, i)
                    })), (0, r.checkWebkitSetPresentationMode)(e.video) && e.video.removeEventListener("webkitpresentationmodechanged", a), e.off("destroy", t)
                })), e.getFullscreen = function (e) {
                    var t = this;
                    if (e.requestFullscreen) {
                        var n = e.requestFullscreen();
                        n && n.catch((function () {
                            t.emit("fullscreen error")
                        }))
                    } else e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullscreen ? e.webkitRequestFullscreen(window.Element.ALLOW_KEYBOARD_INPUT) : t.video.webkitSupportsFullscreen ? t.video.webkitEnterFullscreen() : e.msRequestFullscreen ? e.msRequestFullscreen() : (0, r.addClass)(e, "xgplayer-is-cssfullscreen")
                }, e.exitFullscreen = function (e) {
                    document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.msExitFullscreen && document.msExitFullscreen(), (0, r.removeClass)(e, "xgplayer-is-cssfullscreen")
                }, e.getRotateFullscreen = function () {
                    var e = this;
                    document.documentElement.style.width = "100%", document.documentElement.style.height = "100%", e.config.fluid && (e.root.style["padding-top"] = "", e.root.style["max-width"] = "unset"), e.root && !(0, r.hasClass)(e.root, "xgplayer-rotate-fullscreen") && (0, r.addClass)(e.root, "xgplayer-rotate-fullscreen"), e.emit("getRotateFullscreen")
                }, e.exitRotateFullscreen = function () {
                    var e = this;
                    document.documentElement.style.width = "unset", document.documentElement.style.height = "unset", e.config.fluid && (e.root.style.width = "100%", e.root.style.height = "0", e.root.style["padding-top"] = 100 * e.config.height / e.config.width + "%", e.root.style["max-width"] = "100%"), e.root && (0, r.hasClass)(e.root, "xgplayer-rotate-fullscreen") && (0, r.removeClass)(e.root, "xgplayer-rotate-fullscreen"), e.emit("exitRotateFullscreen")
                }
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(0);
        t.default = {
            name: "play", method: function () {
                var e = this;

                function t() {
                    if (e.config.allowPlayAfterEnded || !e.ended) if ((0, r.hasClass)(e.root, "xgplayer-nostart") && e.start(), e.paused) {
                        var t = e.play();
                        void 0 !== t && t && t.catch((function (e) {
                        }))
                    } else e.pause()
                }

                e.on("playBtnClick", t), e.once("destroy", (function n() {
                    e.off("playBtnClick", t), e.off("destroy", n)
                }))
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(0);
        t.default = {
            name: "replay", method: function () {
                var e = this, t = e.root;

                function n() {
                    (0, r.removeClass)(t, "xgplayer-is-replay"), e.replay()
                }

                e.on("replayBtnClick", n), e.on("ended", (function () {
                    e.config.loop || (0, r.addClass)(t, "xgplayer-is-replay")
                })), e.once("destroy", (function t() {
                    e.off("replayBtnClick", n), e.off("destroy", t)
                }))
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(0), i = o(n(49)), a = o(n(50));

        function o(e) {
            return e && e.__esModule ? e : {default: e}
        }

        n(51), t.default = {
            name: "s_play", method: function () {
                var e = this, t = e.config.playBtn ? e.config.playBtn : {}, n = void 0;
                n = "img" === t.type ? (0, r.createImgBtn)("play", t.url.play, t.width, t.height) : (0, r.createDom)("xg-play", '<xg-icon class="xgplayer-icon">\n                                      <div class="xgplayer-icon-play">' + i.default + '</div>\n                                      <div class="xgplayer-icon-pause">' + a.default + "</div>\n                                     </xg-icon>", {}, "xgplayer-play");
                var o = {};
                o.play = e.lang.PLAY_TIPS, o.pause = e.lang.PAUSE_TIPS;
                var l = (0, r.createDom)("xg-tips", '<span class="xgplayer-tip-play">' + o.play + '</span>\n                                        <span class="xgplayer-tip-pause">' + o.pause + "</span>", {}, "xgplayer-tips");
                n.appendChild(l), e.once("ready", (function () {
                    e.controls && e.controls.appendChild(n)
                })), ["click", "touchend"].forEach((function (t) {
                    n.addEventListener(t, (function (t) {
                        t.preventDefault(), t.stopPropagation(), e.userGestureTrigEvent("playBtnClick")
                    }))
                }))
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        n.r(t), t.default = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">\n  <path transform="translate(2,2) scale(0.0320625 0.0320625)" d="M576,363L810,512L576,661zM342,214L576,363L576,661L342,810z"></path>\n</svg>\n'
    }, function (e, t, n) {
        n.r(t), t.default = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">\n  <path transform="translate(2,2) scale(0.0320625 0.0320625)" d="M598,214h170v596h-170v-596zM256 810v-596h170v596h-170z"></path>\n</svg>\n'
    }, function (e, t, n) {
        var r = n(52);
        "string" == typeof r && (r = [[e.i, r, ""]]);
        var i = {hmr: !0, transform: void 0, insertInto: void 0};
        n(2)(r, i), r.locals && (e.exports = r.locals)
    }, function (e, t, n) {
        (e.exports = n(1)(!1)).push([e.i, ".xgplayer-skin-default .xgplayer-play,.xgplayer-skin-default .xgplayer-play-img{width:40px;position:relative;-webkit-order:0;-moz-box-ordinal-group:1;order:0;display:block;cursor:pointer;margin-left:3px}.xgplayer-skin-default .xgplayer-play-img .xgplayer-icon,.xgplayer-skin-default .xgplayer-play .xgplayer-icon{margin-top:3px;width:32px}.xgplayer-skin-default .xgplayer-play-img .xgplayer-icon div,.xgplayer-skin-default .xgplayer-play .xgplayer-icon div{position:absolute}.xgplayer-skin-default .xgplayer-play-img .xgplayer-icon .xgplayer-icon-play,.xgplayer-skin-default .xgplayer-play .xgplayer-icon .xgplayer-icon-play{display:block}.xgplayer-skin-default .xgplayer-play-img .xgplayer-icon .xgplayer-icon-pause,.xgplayer-skin-default .xgplayer-play .xgplayer-icon .xgplayer-icon-pause{display:none}.xgplayer-skin-default .xgplayer-play-img .xgplayer-tips .xgplayer-tip-play,.xgplayer-skin-default .xgplayer-play .xgplayer-tips .xgplayer-tip-play{display:block}.xgplayer-skin-default .xgplayer-play-img .xgplayer-tips .xgplayer-tip-pause,.xgplayer-skin-default .xgplayer-play .xgplayer-tips .xgplayer-tip-pause{display:none}.xgplayer-skin-default .xgplayer-play-img:hover,.xgplayer-skin-default .xgplayer-play:hover{opacity:.85}.xgplayer-skin-default .xgplayer-play-img:hover .xgplayer-tips,.xgplayer-skin-default .xgplayer-play:hover .xgplayer-tips{display:block}.xgplayer-skin-default.xgplayer-playing .xgplayer-play-img .xgplayer-icon .xgplayer-icon-play,.xgplayer-skin-default.xgplayer-playing .xgplayer-play .xgplayer-icon .xgplayer-icon-play{display:none}.xgplayer-skin-default.xgplayer-playing .xgplayer-play-img .xgplayer-icon .xgplayer-icon-pause,.xgplayer-skin-default.xgplayer-playing .xgplayer-play .xgplayer-icon .xgplayer-icon-pause{display:block}.xgplayer-skin-default.xgplayer-playing .xgplayer-play-img .xgplayer-tips .xgplayer-tip-play,.xgplayer-skin-default.xgplayer-playing .xgplayer-play .xgplayer-tips .xgplayer-tip-play{display:none}.xgplayer-skin-default.xgplayer-pause .xgplayer-play-img .xgplayer-icon .xgplayer-icon-play,.xgplayer-skin-default.xgplayer-pause .xgplayer-play .xgplayer-icon .xgplayer-icon-play,.xgplayer-skin-default.xgplayer-playing .xgplayer-play-img .xgplayer-tips .xgplayer-tip-pause,.xgplayer-skin-default.xgplayer-playing .xgplayer-play .xgplayer-tips .xgplayer-tip-pause{display:block}.xgplayer-skin-default.xgplayer-pause .xgplayer-play-img .xgplayer-icon .xgplayer-icon-pause,.xgplayer-skin-default.xgplayer-pause .xgplayer-play .xgplayer-icon .xgplayer-icon-pause{display:none}.xgplayer-skin-default.xgplayer-pause .xgplayer-play-img .xgplayer-tips .xgplayer-tip-play,.xgplayer-skin-default.xgplayer-pause .xgplayer-play .xgplayer-tips .xgplayer-tip-play{display:block}.xgplayer-skin-default.xgplayer-pause .xgplayer-play-img .xgplayer-tips .xgplayer-tip-pause,.xgplayer-skin-default.xgplayer-pause .xgplayer-play .xgplayer-tips .xgplayer-tip-pause{display:none}", ""])
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(0);
        n(54), t.default = {
            name: "s_poster", method: function () {
                var e = this, t = e.root;
                if (e.config.poster) {
                    var n = (0, r.createDom)("xg-poster", "", {}, "xgplayer-poster");
                    n.style.backgroundImage = "url(" + e.config.poster + ")", t.appendChild(n)
                }
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        var r = n(55);
        "string" == typeof r && (r = [[e.i, r, ""]]);
        var i = {hmr: !0, transform: void 0, insertInto: void 0};
        n(2)(r, i), r.locals && (e.exports = r.locals)
    }, function (e, t, n) {
        (e.exports = n(1)(!1)).push([e.i, ".xgplayer-skin-default .xgplayer-poster{display:none;position:absolute;left:0;top:0;width:100%;height:100%;z-index:100;background-size:cover;background-position:50%}.xgplayer-skin-default.xgplayer-nostart .xgplayer-poster{display:block}", ""])
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(0);
        n(57), t.default = {
            name: "s_flex", method: function () {
                var e = (0, r.createDom)("xg-placeholder", "", {}, "xgplayer-placeholder");
                this.controls.appendChild(e)
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        var r = n(58);
        "string" == typeof r && (r = [[e.i, r, ""]]);
        var i = {hmr: !0, transform: void 0, insertInto: void 0};
        n(2)(r, i), r.locals && (e.exports = r.locals)
    }, function (e, t, n) {
        (e.exports = n(1)(!1)).push([e.i, ".xgplayer-skin-default .xgplayer-placeholder{-webkit-flex:1;-moz-box-flex:1;flex:1;-webkit-order:3;-moz-box-ordinal-group:4;order:3;display:block}", ""])
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(0), i = o(n(60)), a = o(n(61));

        function o(e) {
            return e && e.__esModule ? e : {default: e}
        }

        n(62), t.default = {
            name: "s_fullscreen", method: function () {
                var e = this, t = e.config.fullscreenBtn ? e.config.fullscreenBtn : {}, n = void 0;
                n = "img" === t.type ? (0, r.createImgBtn)("fullscreen", t.url.request, t.width, t.height) : (0, r.createDom)("xg-fullscreen", '<xg-icon class="xgplayer-icon">\n                                             <div class="xgplayer-icon-requestfull">' + i.default + '</div>\n                                             <div class="xgplayer-icon-exitfull">' + a.default + "</div>\n                                           </xg-icon>", {}, "xgplayer-fullscreen");
                var o = {};
                o.requestfull = e.lang.FULLSCREEN_TIPS, o.exitfull = e.lang.EXITFULLSCREEN_TIPS;
                var l = (0, r.createDom)("xg-tips", '<span class="xgplayer-tip-requestfull">' + o.requestfull + '</span>\n                                        <span class="xgplayer-tip-exitfull">' + o.exitfull + "</span>", {}, "xgplayer-tips");
                n.appendChild(l), e.once("ready", (function () {
                    e.controls && e.controls.appendChild(n)
                })), ["click", "touchend"].forEach((function (t) {
                    n.addEventListener(t, (function (t) {
                        t.preventDefault(), t.stopPropagation(), e.userGestureTrigEvent("fullscreenBtnClick")
                    }))
                }))
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        n.r(t), t.default = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">\n  <path transform="scale(0.0320625 0.0320625)" d="M598 214h212v212h-84v-128h-128v-84zM726 726v-128h84v212h-212v-84h128zM214 426v-212h212v84h-128v128h-84zM298 598v128h128v84h-212v-212h84z"></path>\n</svg>\n'
    }, function (e, t, n) {
        n.r(t), t.default = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">\n  <path transform="scale(0.0320625 0.0320625)" d="M682 342h128v84h-212v-212h84v128zM598 810v-212h212v84h-128v128h-84zM342 342v-128h84v212h-212v-84h128zM214 682v-84h212v212h-84v-128h-128z"></path>\n</svg>\n'
    }, function (e, t, n) {
        var r = n(63);
        "string" == typeof r && (r = [[e.i, r, ""]]);
        var i = {hmr: !0, transform: void 0, insertInto: void 0};
        n(2)(r, i), r.locals && (e.exports = r.locals)
    }, function (e, t, n) {
        (e.exports = n(1)(!1)).push([e.i, ".xgplayer-skin-default .xgplayer-fullscreen,.xgplayer-skin-default .xgplayer-fullscreen-img{position:relative;-webkit-order:13;-moz-box-ordinal-group:14;order:13;display:block;cursor:pointer;margin-left:5px;margin-right:3px}.xgplayer-skin-default .xgplayer-fullscreen-img .xgplayer-icon,.xgplayer-skin-default .xgplayer-fullscreen .xgplayer-icon{margin-top:3px}.xgplayer-skin-default .xgplayer-fullscreen-img .xgplayer-icon div,.xgplayer-skin-default .xgplayer-fullscreen .xgplayer-icon div{position:absolute}.xgplayer-skin-default .xgplayer-fullscreen-img .xgplayer-icon .xgplayer-icon-requestfull,.xgplayer-skin-default .xgplayer-fullscreen .xgplayer-icon .xgplayer-icon-requestfull{display:block}.xgplayer-skin-default .xgplayer-fullscreen-img .xgplayer-icon .xgplayer-icon-exitfull,.xgplayer-skin-default .xgplayer-fullscreen .xgplayer-icon .xgplayer-icon-exitfull{display:none}.xgplayer-skin-default .xgplayer-fullscreen-img .xgplayer-tips,.xgplayer-skin-default .xgplayer-fullscreen .xgplayer-tips{position:absolute;right:0;left:auto}.xgplayer-skin-default .xgplayer-fullscreen-img .xgplayer-tips .xgplayer-tip-requestfull,.xgplayer-skin-default .xgplayer-fullscreen .xgplayer-tips .xgplayer-tip-requestfull{display:block}.xgplayer-skin-default .xgplayer-fullscreen-img .xgplayer-tips .xgplayer-tip-exitfull,.xgplayer-skin-default .xgplayer-fullscreen .xgplayer-tips .xgplayer-tip-exitfull{display:none}.xgplayer-skin-default .xgplayer-fullscreen-img:hover,.xgplayer-skin-default .xgplayer-fullscreen:hover{opacity:.85}.xgplayer-skin-default .xgplayer-fullscreen-img:hover .xgplayer-tips,.xgplayer-skin-default .xgplayer-fullscreen:hover .xgplayer-tips{display:block}.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen-img .xgplayer-icon .xgplayer-icon-requestfull,.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen .xgplayer-icon .xgplayer-icon-requestfull,.xgplayer-skin-default.xgplayer-rotate-fullscreen .xgplayer-fullscreen-img .xgplayer-icon .xgplayer-icon-requestfull,.xgplayer-skin-default.xgplayer-rotate-fullscreen .xgplayer-fullscreen .xgplayer-icon .xgplayer-icon-requestfull{display:none}.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen-img .xgplayer-icon .xgplayer-icon-exitfull,.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen .xgplayer-icon .xgplayer-icon-exitfull,.xgplayer-skin-default.xgplayer-rotate-fullscreen .xgplayer-fullscreen-img .xgplayer-icon .xgplayer-icon-exitfull,.xgplayer-skin-default.xgplayer-rotate-fullscreen .xgplayer-fullscreen .xgplayer-icon .xgplayer-icon-exitfull{display:block}.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen-img .xgplayer-tips .xgplayer-tip-requestfull,.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen .xgplayer-tips .xgplayer-tip-requestfull,.xgplayer-skin-default.xgplayer-rotate-fullscreen .xgplayer-fullscreen-img .xgplayer-tips .xgplayer-tip-requestfull,.xgplayer-skin-default.xgplayer-rotate-fullscreen .xgplayer-fullscreen .xgplayer-tips .xgplayer-tip-requestfull{display:none}.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen-img .xgplayer-tips .xgplayer-tip-exitfull,.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen .xgplayer-tips .xgplayer-tip-exitfull,.xgplayer-skin-default.xgplayer-rotate-fullscreen .xgplayer-fullscreen-img .xgplayer-tips .xgplayer-tip-exitfull,.xgplayer-skin-default.xgplayer-rotate-fullscreen .xgplayer-fullscreen .xgplayer-tips .xgplayer-tip-exitfull{display:block}", ""])
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r, i = n(0), a = n(65), o = (r = a) && r.__esModule ? r : {default: r};
        n(66), t.default = {
            name: "s_loading", method: function () {
                var e = this.root, t = (0, i.createDom)("xg-loading", "" + o.default, {}, "xgplayer-loading");
                this.once("ready", (function () {
                    e.appendChild(t)
                }))
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        n.r(t), t.default = '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewbox="0 0 100 100">\n  <path d="M100,50A50,50,0,1,1,50,0"></path>\n</svg>\n'
    }, function (e, t, n) {
        var r = n(67);
        "string" == typeof r && (r = [[e.i, r, ""]]);
        var i = {hmr: !0, transform: void 0, insertInto: void 0};
        n(2)(r, i), r.locals && (e.exports = r.locals)
    }, function (e, t, n) {
        (e.exports = n(1)(!1)).push([e.i, ".xgplayer-skin-default .xgplayer-loading{display:none;width:100px;height:100px;overflow:hidden;-webkit-transform:scale(.7);-ms-transform:scale(.7);transform:scale(.7);position:absolute;left:50%;top:50%;margin:-50px auto auto -50px}.xgplayer-skin-default .xgplayer-loading svg{border-radius:50%;-webkit-transform-origin:center;-ms-transform-origin:center;transform-origin:center;-webkit-animation:loadingRotate 1s linear infinite;animation:loadingRotate 1s linear infinite}.xgplayer-skin-default .xgplayer-loading svg path{stroke:#ddd;stroke-dasharray:236;-webkit-animation:loadingDashOffset 2s linear infinite;animation:loadingDashOffset 2s linear infinite;animation-direction:alternate-reverse;fill:none;stroke-width:12px}.xgplayer-skin-default.xgplayer-nostart .xgplayer-loading{display:none}.xgplayer-skin-default.xgplayer-pause .xgplayer-loading{display:none!important}.xgplayer-skin-default.xgplayer-isloading .xgplayer-loading{display:block}", ""])
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r, i = n(0), a = n(5), o = (r = a) && r.__esModule ? r : {default: r};
        n(69);
        var l = function (e) {
            return (0, i.hasClass)(e.root, "xgplayer-rotate-fullscreen")
        };
        t.default = {
            name: "s_progress", method: function () {
                var e = this,
                    t = (0, i.createDom)("xg-progress", '<xg-outer class="xgplayer-progress-outer">\n                                                   <xg-cache class="xgplayer-progress-cache"></xg-cache>\n                                                   <xg-played class="xgplayer-progress-played">\n                                                     <xg-progress-btn class="xgplayer-progress-btn"></xg-progress-btn>\n                                                     <xg-point class="xgplayer-progress-point xgplayer-tips"></xg-point>\n                                                     <xg-thumbnail class="xgplayer-progress-thumbnail xgplayer-tips"></xg-thumbnail>\n                                                   </xg-played>\n                                                 </xg-outer>', {tabindex: 1}, "xgplayer-progress"),
                    n = void 0;
                e.controls.appendChild(t);
                var r = t.querySelector(".xgplayer-progress-played"), a = t.querySelector(".xgplayer-progress-outer"),
                    s = t.querySelector(".xgplayer-progress-cache"), c = t.querySelector(".xgplayer-progress-point"),
                    u = t.querySelector(".xgplayer-progress-thumbnail");

                function p(n, r) {
                    n.addEventListener("mouseenter", (function (e) {
                        r && ((0, i.addClass)(n, "xgplayer-progress-dot-show"), (0, i.addClass)(t, "xgplayer-progress-dot-active"))
                    })), n.addEventListener("mouseleave", (function (e) {
                        r && ((0, i.removeClass)(n, "xgplayer-progress-dot-show"), (0, i.removeClass)(t, "xgplayer-progress-dot-active"))
                    })), n.addEventListener("touchend", (function (a) {
                        a.stopPropagation(), r && ((0, i.hasClass)(n, "xgplayer-progress-dot-show") || Object.keys(e.dotArr).forEach((function (t) {
                            e.dotArr[t] && (0, i.removeClass)(e.dotArr[t], "xgplayer-progress-dot-show")
                        })), (0, i.toggleClass)(n, "xgplayer-progress-dot-show"), (0, i.toggleClass)(t, "xgplayer-progress-dot-active"))
                    }))
                }

                function d() {
                    e.config.progressDot && "Array" === (0, i.typeOf)(e.config.progressDot) && e.config.progressDot.forEach((function (t) {
                        if (t.time >= 0 && t.time <= e.duration) {
                            var n = (0, i.createDom)("xg-progress-dot", t.text ? '<span class="xgplayer-progress-tip">' + t.text + "</span>" : "", {}, "xgplayer-progress-dot");
                            if (n.style.left = t.time / e.duration * 100 + "%", t.duration >= 0 && (n.style.width = Math.min(t.duration, e.duration - t.time) / e.duration * 100 + "%"), t.style) for (var r in t.style) n.style[r] = t.style[r];
                            a.appendChild(n), e.dotArr[t.time] = n, p(n, t.text)
                        }
                    }))
                }

                e.dotArr = {}, e.once("canplay", d), e.addProgressDot = function (t, n, r, o) {
                    if (!e.dotArr[t] && t >= 0 && t <= e.duration) {
                        var l = (0, i.createDom)("xg-progress-dot", n ? '<span class="xgplayer-progress-tip">' + n + "</span>" : "", {}, "xgplayer-progress-dot");
                        if (l.style.left = t / e.duration * 100 + "%", r >= 0 && (l.style.width = Math.min(r, e.duration - t) / e.duration * 100 + "%"), o) for (var s in o) l.style[s] = o[s];
                        a.appendChild(l), e.dotArr[t] = l, p(l, n)
                    }
                }, e.removeProgressDot = function (t) {
                    if (t >= 0 && t <= e.duration && e.dotArr[t]) {
                        var n = e.dotArr[t];
                        n.parentNode.removeChild(n), n = null, e.dotArr[t] = null
                    }
                }, e.removeAllProgressDot = function () {
                    Object.keys(e.dotArr).forEach((function (t) {
                        if (e.dotArr[t]) {
                            var n = e.dotArr[t];
                            n.parentNode.removeChild(n), n = null, e.dotArr[t] = null
                        }
                    }))
                };
                var f = 0, g = 0, h = 0, y = 0, m = 0, v = 0, x = [], b = void 0, k = void 0, w = function () {
                    e.config.thumbnail && (e.config.thumbnail.isShowCoverPreview && !b && (r.removeChild(u), (b = (0, i.createDom)("xg-coverpreview", '<xg-outer class="xgplayer-coverpreview-outer">\n            <xg-thumbnail class="xgplayer-coverpreview-thumbnail"></xg-thumbnail>\n            <xg-point class="xgplayer-coverpreview-point"></xg-point>\n          </xg-outer>', {tabindex: 1}, "xgplayer-coverpreview")).querySelector(".xgplayer-coverpreview-outer"), k = b.querySelector(".xgplayer-coverpreview-point"), u = b.querySelector(".xgplayer-coverpreview-thumbnail"), e.root.appendChild(b)), f = e.config.thumbnail.pic_num, g = e.config.thumbnail.width, h = e.config.thumbnail.height, y = e.config.thumbnail.col, m = e.config.thumbnail.row, x = e.config.thumbnail.urls, u.style.width = g + "px", u.style.height = h + "px")
                };
                e.on("loadedmetadata", w), "function" == typeof e.config.disableSwipeHandler && "function" == typeof e.config.enableSwipeHandler && (e.root.addEventListener("touchmove", (function (t) {
                    t.preventDefault(), e.disableSwipe || (e.disableSwipe = !0, e.config.disableSwipeHandler.call(e))
                })), e.root.addEventListener("touchstart", (function (t) {
                    e.disableSwipe = !0, e.config.disableSwipeHandler.call(e)
                })), e.root.addEventListener("touchend", (function (t) {
                    e.disableSwipe = !1, e.config.enableSwipeHandler.call(e)
                })));
                var _ = ["touchstart", "mousedown"];
                "mobile" === o.default.device && _.pop(), _.forEach((function (a) {
                    t.addEventListener(a, (function (a) {
                        if (!e.config.disableProgress) {
                            if (a.stopPropagation(), (0, i.event)(a), a._target === c || !e.config.allowSeekAfterEnded && e.ended) return !0;
                            t.focus();
                            var s = r.getBoundingClientRect().left, p = l(e);
                            p ? (s = r.getBoundingClientRect().top, n = t.getBoundingClientRect().height) : (n = t.getBoundingClientRect().width, s = r.getBoundingClientRect().left);
                            var d = function (t) {
                                t.stopPropagation(), (0, i.event)(t), e.isProgressMoving = !0;
                                var a = (p ? t.clientY : t.clientX) - s;
                                a > n && (a = n);
                                var o = a / n * e.duration;
                                if (o < 0 && (o = 0), e.config.allowSeekPlayed && Number(o).toFixed(1) > e.maxPlayedTime) ; else if (r.style.width = 100 * a / n + "%", "video" !== e.videoConfig.mediaType || e.dash || e.config.closeMoveSeek) {
                                    var l = (0, i.findDom)(e.controls, ".xgplayer-time");
                                    l && (l.innerHTML = '<span class="xgplayer-time-current">' + (0, i.format)(o || 0) + "</span><span>" + (0, i.format)(e.duration) + "</span>")
                                } else e.currentTime = Number(o).toFixed(1);
                                if (e.config.thumbnail && e.config.thumbnail.isShowCoverPreview) {
                                    k.innerHTML = "<span>" + (0, i.format)(o) + "</span> / " + (0, i.format)(e.duration || 0), v = e.duration / f;
                                    var c = Math.floor(o / v);
                                    u.style.backgroundImage = "url(" + x[Math.ceil((c + 1) / (y * m)) - 1] + ")";
                                    var d = c + 1 - y * m * (Math.ceil((c + 1) / (y * m)) - 1),
                                        w = Math.ceil(d / m) - 1, _ = d - w * m - 1;
                                    u.style["background-position"] = "-" + _ * g + "px -" + w * h + "px", b.style.display = "block"
                                }
                                e.emit("focus")
                            }, w = function a(l) {
                                if (l.stopPropagation(), (0, i.event)(l), window.removeEventListener("mousemove", d), window.removeEventListener("touchmove", d, {passive: !1}), window.removeEventListener("mouseup", a), window.removeEventListener("touchend", a), o.default.browser.indexOf("ie") < 0 && t.blur(), !e.isProgressMoving || e.videoConfig && "audio" === e.videoConfig.mediaType || e.dash || e.config.closeMoveSeek) {
                                    var c = (p ? l.clientY : l.clientX) - s;
                                    c > n && (c = n);
                                    var u = c / n * e.duration;
                                    u < 0 && (u = 0), e.config.allowSeekPlayed && Number(u).toFixed(1) > e.maxPlayedTime || (r.style.width = 100 * c / n + "%", e.currentTime = Number(u).toFixed(1))
                                }
                                e.config.thumbnail && e.config.thumbnail.isShowCoverPreview && (b.style.display = "none"), e.emit("focus"), e.isProgressMoving = !1
                            };
                            return window.addEventListener("touchmove", d, {passive: !1}), window.addEventListener("touchend", w), window.addEventListener("mousemove", d), window.addEventListener("mouseup", w), !0
                        }
                    }))
                })), t.addEventListener("mouseenter", (function (n) {
                    if (!e.config.allowSeekAfterEnded && e.ended) return !0;
                    var r = l(e), a = r ? t.getBoundingClientRect().top : t.getBoundingClientRect().left,
                        o = r ? t.getBoundingClientRect().height : t.getBoundingClientRect().width, s = function (n) {
                            var l = ((r ? n.clientY : n.clientX) - a) / o * e.duration;
                            l = l < 0 ? 0 : l, c.textContent = (0, i.format)(l);
                            var s = c.getBoundingClientRect().width;
                            if (e.config.thumbnail && !e.config.thumbnail.isShowCoverPreview) {
                                v = e.duration / f;
                                var p = Math.floor(l / v);
                                u.style.backgroundImage = "url(" + x[Math.ceil((p + 1) / (y * m)) - 1] + ")";
                                var d = p + 1 - y * m * (Math.ceil((p + 1) / (y * m)) - 1), b = Math.ceil(d / m) - 1,
                                    k = d - b * m - 1;
                                u.style["background-position"] = "-" + k * g + "px -" + b * h + "px";
                                var w = (r ? n.clientY : n.clientX) - a - g / 2;
                                w = (w = w > 0 ? w : 0) < o - g ? w : o - g, u.style.left = w + "px", u.style.top = -10 - h + "px", u.style.display = "block", c.style.left = w + g / 2 - s / 2 + "px"
                            } else {
                                var _ = n.clientX - a - s / 2;
                                _ = (_ = _ > 0 ? _ : 0) > o - s ? o - s : _, c.style.left = _ + "px"
                            }
                            (0, i.hasClass)(t, "xgplayer-progress-dot-active") ? c.style.display = "none" : c.style.display = "block"
                        }, p = function (e) {
                            s(e)
                        };
                    t.addEventListener("mousemove", p, !1), t.addEventListener("mouseleave", (function n(r) {
                        t.removeEventListener("mousemove", p, !1), t.removeEventListener("mouseleave", n, !1), s(r), c.style.display = "none", e.config.thumbnail && !e.config.thumbnail.isShowCoverPreview && (u.style.display = "none")
                    }), !1), s(n)
                }), !1);
                var T = function () {
                    if (void 0 === e.maxPlayedTime && (e.maxPlayedTime = 0), e.maxPlayedTime < e.currentTime && (e.maxPlayedTime = e.currentTime), !n && t && (n = t.getBoundingClientRect().width), !e.isProgressMoving && !e.isSeeking && !e.seeking) {
                        var i = e.currentTime / e.duration,
                            a = Number(r.style.width.replace("%", "") || "0") / Number(t.style.width || "100");
                        Math.abs(i - a) <= 1 && (r.style.width = 100 * e.currentTime / e.duration + "%")
                    }
                };
                e.on("timeupdate", T);
                var E = function (t) {
                    r.style.width = 100 * t / e.duration + "%"
                };
                e.on("currentTimeChange", E);
                var C = function () {
                    r.style.width = "0%"
                };
                e.on("srcChange", C);
                var L = function () {
                    var t = e.buffered;
                    if (t && t.length > 0) {
                        for (var n = t.end(t.length - 1), r = 0, i = t.length; r < i; r++) if (e.currentTime >= t.start(r) && e.currentTime <= t.end(r)) {
                            n = t.end(r);
                            for (var a = r + 1; a < t.length; a++) if (t.start(a) - t.end(a - 1) >= 2) {
                                n = t.end(a - 1);
                                break
                            }
                            break
                        }
                        s.style.width = n / e.duration * 100 + "%"
                    }
                }, O = ["bufferedChange", "cacheupdate", "ended", "timeupdate"];
                O.forEach((function (t) {
                    e.on(t, L)
                })), e.once("destroy", (function t() {
                    e.removeAllProgressDot(), e.off("canplay", d), e.off("timeupdate", T), e.off("currentTimeChange", E), e.off("srcChange", C), e.off("loadedmetadata", w), O.forEach((function (t) {
                        e.off(t, L)
                    })), e.off("destroy", t)
                }))
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        var r = n(70);
        "string" == typeof r && (r = [[e.i, r, ""]]);
        var i = {hmr: !0, transform: void 0, insertInto: void 0};
        n(2)(r, i), r.locals && (e.exports = r.locals)
    }, function (e, t, n) {
        (e.exports = n(1)(!1)).push([e.i, ".xgplayer-skin-default .xgplayer-progress{display:block;position:absolute;height:20px;line-height:20px;left:12px;right:12px;outline:none;top:-15px;z-index:35}.xgplayer-skin-default .xgplayer-progress-outer{background:hsla(0,0%,100%,.3);display:block;height:3px;line-height:3px;margin-top:8.5px;width:100%;position:relative;cursor:pointer}.xgplayer-skin-default .xgplayer-progress-cache,.xgplayer-skin-default .xgplayer-progress-played{display:block;height:100%;line-height:1;position:absolute;left:0;top:0}.xgplayer-skin-default .xgplayer-progress-cache{width:0;background:hsla(0,0%,100%,.5)}.xgplayer-skin-default .xgplayer-progress-played{display:block;width:0;background-image:linear-gradient(-90deg,#fa1f41,#e31106);border-radius:0 1.5px 1.5px 0}.xgplayer-skin-default .xgplayer-progress-btn{display:none;position:absolute;left:0;top:-5px;width:13px;height:13px;border-radius:30px;background:#fff;box-shadow:0 0 2px 0 rgba(0,0,0,.26);left:100%;-webkit-transform:translate(-50%);-ms-transform:translate(-50%);transform:translate(-50%);z-index:36}.xgplayer-skin-default .xgplayer-progress-point{position:absolute}.xgplayer-skin-default .xgplayer-progress-point.xgplayer-tips{margin-left:0;top:-25px;display:none;z-index:100}.xgplayer-skin-default .xgplayer-progress-dot{display:inline-block;position:absolute;height:3px;width:5px;top:0;background:#fff;border-radius:6px;z-index:16}.xgplayer-skin-default .xgplayer-progress-dot .xgplayer-progress-tip{position:absolute;bottom:200%;right:50%;-webkit-transform:translateX(50%);-ms-transform:translateX(50%);transform:translateX(50%);height:auto;line-height:30px;width:auto;background:rgba(0,0,0,.3);border-radius:6px;border:1px solid rgba(0,0,0,.8);cursor:default;white-space:nowrap;display:none}.xgplayer-skin-default .xgplayer-progress-dot-show .xgplayer-progress-tip{display:block}.xgplayer-skin-default .xgplayer-progress-thumbnail{position:absolute;-moz-box-sizing:border-box;box-sizing:border-box}.xgplayer-skin-default .xgplayer-progress-thumbnail.xgplayer-tips{margin-left:0;display:none;z-index:99}.xgplayer-skin-default .xgplayer-coverpreview{position:absolute;width:100%;height:100%;top:0;left:0;display:none}.xgplayer-skin-default .xgplayer-coverpreview .xgplayer-coverpreview-outer{position:absolute;display:block;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.xgplayer-skin-default .xgplayer-coverpreview .xgplayer-coverpreview-outer .xgplayer-coverpreview-thumbnail{display:block}.xgplayer-skin-default .xgplayer-coverpreview .xgplayer-coverpreview-outer .xgplayer-coverpreview-point{display:block;text-align:center;font-family:PingFangSC-Regular;font-size:11px;color:#ccc;padding:2px 4px}.xgplayer-skin-default .xgplayer-coverpreview .xgplayer-coverpreview-outer .xgplayer-coverpreview-point span{color:#fff}.xgplayer-skin-default .xgplayer-progress:focus .xgplayer-progress-outer,.xgplayer-skin-default .xgplayer-progress:hover .xgplayer-progress-outer{height:6px;margin-top:7px}.xgplayer-skin-default .xgplayer-progress:focus .xgplayer-progress-dot,.xgplayer-skin-default .xgplayer-progress:hover .xgplayer-progress-dot{height:6px}.xgplayer-skin-default .xgplayer-progress:focus .xgplayer-progress-btn,.xgplayer-skin-default .xgplayer-progress:hover .xgplayer-progress-btn{display:block;top:-3px}.xgplayer-skin-default.xgplayer-definition-active .xgplayer-progress,.xgplayer-skin-default.xgplayer-playbackrate-active .xgplayer-progress,.xgplayer-skin-default.xgplayer-texttrack-active .xgplayer-progress,.xgplayer-skin-default.xgplayer-volume-active .xgplayer-progress{z-index:15}.xgplayer-skin-default.xgplayer-mobile .xgplayer-progress-btn{display:block!important}.xgplayer-skin-default.xgplayer-mobile .xgplayer-progress:focus .xgplayer-progress-outer,.xgplayer-skin-default.xgplayer-mobile .xgplayer-progress:hover .xgplayer-progress-outer{height:3px!important;margin-top:8.5px!important}.xgplayer-skin-default.xgplayer-mobile .xgplayer-progress:focus .xgplayer-progress-btn,.xgplayer-skin-default.xgplayer-mobile .xgplayer-progress:hover .xgplayer-progress-btn{display:block!important;top:-5px!important}", ""])
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(0);
        n(72), t.default = {
            name: "s_time", method: function () {
                var e = this,
                    t = (0, r.createDom)("xg-time", '<span class="xgplayer-time-current">' + (e.currentTime || (0, r.format)(0)) + "</span>\n                                           <span>" + (e.duration || (0, r.format)(0)) + "</span>", {}, "xgplayer-time");
                e.once("ready", (function () {
                    e.controls && e.controls.appendChild(t)
                }));
                var n = function () {
                    "audio" === e.videoConfig.mediaType && e.isProgressMoving && e.dash || (t.innerHTML = '<span class="xgplayer-time-current">' + (0, r.format)(e.currentTime || 0) + "</span><span>" + (0, r.format)(e.duration) + "</span>")
                };
                e.on("durationchange", n), e.on("timeupdate", n), e.once("destroy", (function t() {
                    e.off("durationchange", n), e.off("timeupdate", n), e.off("destroy", t)
                }))
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        var r = n(73);
        "string" == typeof r && (r = [[e.i, r, ""]]);
        var i = {hmr: !0, transform: void 0, insertInto: void 0};
        n(2)(r, i), r.locals && (e.exports = r.locals)
    }, function (e, t, n) {
        (e.exports = n(1)(!1)).push([e.i, '.xgplayer-skin-default .xgplayer-time{-webkit-order:2;-moz-box-ordinal-group:3;order:2;font-family:ArialMT;font-size:13px;color:#fff;line-height:40px;height:40px;text-align:center;display:inline-block;margin:auto 8px}.xgplayer-skin-default .xgplayer-time span{color:hsla(0,0%,100%,.5)}.xgplayer-skin-default .xgplayer-time .xgplayer-time-current{color:#fff}.xgplayer-skin-default .xgplayer-time .xgplayer-time-current:after{content:"/";display:inline-block;padding:0 3px}', ""])
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r, i = n(0), a = n(75), o = (r = a) && r.__esModule ? r : {default: r};
        n(76), t.default = {
            name: "s_replay", method: function () {
                var e = this, t = e.root, n = e.lang.REPLAY,
                    r = (0, i.createDom)("xg-replay", o.default + '\n                                         <xg-replay-txt class="xgplayer-replay-txt">' + n + "</xg-replay-txt>\n                                        ", {}, "xgplayer-replay");

                function a() {
                    var e = r.querySelector("path");
                    if (e) {
                        var t = window.getComputedStyle(e).getPropertyValue("transform");
                        if ("string" == typeof t && t.indexOf("none") > -1) return;
                        e.setAttribute("transform", t)
                    }
                }

                e.once("ready", (function () {
                    t.appendChild(r)
                })), e.on("ended", a), r.addEventListener("click", (function (e) {
                    e.preventDefault(), e.stopPropagation()
                }));
                var l = r.querySelector("svg");
                ["click", "touchend"].forEach((function (t) {
                    l.addEventListener(t, (function (t) {
                        t.preventDefault(), t.stopPropagation(), e.userGestureTrigEvent("replayBtnClick")
                    }))
                })), e.once("destroy", (function t() {
                    e.off("ended", a), e.off("destroy", t)
                }))
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        n.r(t), t.default = '<svg class="xgplayer-replay-svg" xmlns="http://www.w3.org/2000/svg" width="78" height="78" viewbox="0 0 78 78">\n  <path d="M8.22708362,13.8757234 L11.2677371,12.6472196 C11.7798067,12.4403301 12.3626381,12.6877273 12.5695276,13.1997969 L12.9441342,14.1269807 C13.1510237,14.6390502 12.9036264,15.2218816 12.3915569,15.4287712 L6.8284538,17.6764107 L5.90126995,18.0510173 C5.38920044,18.2579068 4.80636901,18.0105096 4.5994795,17.49844 L1.97723335,11.0081531 C1.77034384,10.4960836 2.0177411,9.91325213 2.52981061,9.70636262 L3.45699446,9.33175602 C3.96906396,9.12486652 4.5518954,9.37226378 4.75878491,9.88433329 L5.67885163,12.1615783 C7.99551726,6.6766934 13.3983951,3 19.5,3 C27.7842712,3 34.5,9.71572875 34.5,18 C34.5,26.2842712 27.7842712,33 19.5,33 C15.4573596,33 11.6658607,31.3912946 8.87004692,28.5831991 C8.28554571,27.9961303 8.28762719,27.0463851 8.87469603,26.4618839 C9.46176488,25.8773827 10.4115101,25.8794641 10.9960113,26.466533 C13.2344327,28.7147875 16.263503,30 19.5,30 C26.127417,30 31.5,24.627417 31.5,18 C31.5,11.372583 26.127417,6 19.5,6 C14.4183772,6 9.94214483,9.18783811 8.22708362,13.8757234 Z"></path>\n</svg>\n'
    }, function (e, t, n) {
        var r = n(77);
        "string" == typeof r && (r = [[e.i, r, ""]]);
        var i = {hmr: !0, transform: void 0, insertInto: void 0};
        n(2)(r, i), r.locals && (e.exports = r.locals)
    }, function (e, t, n) {
        (e.exports = n(1)(!1)).push([e.i, ".xgplayer-skin-default .xgplayer-replay{position:absolute;left:0;top:0;width:100%;height:100%;z-index:105;display:none;-webkit-justify-content:center;-moz-box-pack:center;justify-content:center;-webkit-align-items:center;-moz-box-align:center;align-items:center;background:rgba(0,0,0,.54);-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;flex-direction:column}.xgplayer-skin-default .xgplayer-replay svg{background:rgba(0,0,0,.58);border-radius:100%;cursor:pointer}.xgplayer-skin-default .xgplayer-replay svg path{-webkit-transform:translate(20px,21px);-ms-transform:translate(20px,21px);transform:translate(20px,21px);fill:#ddd}.xgplayer-skin-default .xgplayer-replay svg:hover{background:rgba(0,0,0,.38)}.xgplayer-skin-default .xgplayer-replay svg:hover path{fill:#fff}.xgplayer-skin-default .xgplayer-replay .xgplayer-replay-txt{display:inline-block;font-family:PingFangSC-Regular;font-size:14px;color:#fff;line-height:34px}.xgplayer-skin-default.xgplayer.xgplayer-ended .xgplayer-controls{display:none}.xgplayer-skin-default.xgplayer.xgplayer-ended .xgplayer-replay{display:-webkit-flex;display:-moz-box;display:flex}", ""])
    }, function (e, t, n) {
        var r = n(161);
        "string" == typeof r && (r = [[e.i, r, ""]]);
        var i = {hmr: !0, transform: void 0, insertInto: void 0};
        n(2)(r, i), r.locals && (e.exports = r.locals)
    }, function (e, t, n) {
        e.exports = n(80)
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = O(n(9)), i = O(n(81)), a = O(n(82)), o = O(n(83)), l = O(n(84)), s = O(n(85)), c = O(n(88)),
            u = O(n(45)), p = O(n(89)), d = O(n(90)), f = O(n(91)), g = O(n(92)), h = O(n(37)), y = O(n(38)),
            m = O(n(98)), v = O(n(46)), x = O(n(99)), b = O(n(100)), k = O(n(47)), w = O(n(101)), _ = O(n(102)),
            T = O(n(103)), E = O(n(39)), C = O(n(104)), L = O(n(105));

        function O(e) {
            return e && e.__esModule ? e : {default: e}
        }

        n(107), r.default.installAll([i.default, a.default, o.default, l.default, s.default, c.default, u.default, p.default, d.default, f.default, g.default, h.default, y.default, m.default, v.default, x.default, b.default, k.default, w.default, _.default, T.default, E.default, C.default, L.default]), t.default = r.default, e.exports = t.default
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0}), t.default = {
            name: "airplay", method: function () {
                var e = this;

                function t() {
                    e.video.webkitShowPlaybackTargetPicker()
                }

                e.config.airplay && window.WebKitPlaybackTargetAvailabilityEvent && (e.on("airplayBtnClick", t), e.once("destroy", (function n() {
                    e.off("airplayBtnClick", t), e.off("destroy", n)
                })))
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(0);
        t.default = {
            name: "cssFullscreen", method: function () {
                var e = this, t = e.root;

                function n() {
                    (0, r.hasClass)(t, "xgplayer-is-cssfullscreen") ? e.exitCssFullscreen() : e.getCssFullscreen()
                }

                e.on("cssFullscreenBtnClick", n), e.on("exitFullscreen", (function () {
                    (0, r.removeClass)(t, "xgplayer-is-cssfullscreen")
                })), e.once("destroy", (function t() {
                    e.off("cssFullscreenBtnClick", n), e.off("destroy", t)
                })), e.getCssFullscreen = function () {
                    var e = this;
                    e.config.fluid && (e.root.style["padding-top"] = ""), (0, r.addClass)(e.root, "xgplayer-is-cssfullscreen"), e.emit("requestCssFullscreen")
                }, e.exitCssFullscreen = function () {
                    var e = this;
                    e.config.fluid && (e.root.style.width = "100%", e.root.style.height = "0", e.root.style["padding-top"] = 100 * e.config.height / e.config.width + "%"), (0, r.removeClass)(e.root, "xgplayer-is-cssfullscreen"), e.emit("exitCssFullscreen")
                }
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(0);
        t.default = {
            name: "danmu", method: function () {
                var e = this;
                e.on("initDefaultDanmu", (function (t) {
                    var n = e.root.querySelector("xg-danmu");
                    if ((0, r.addClass)(n, "xgplayer-has-danmu"), !e.config.danmu.closeDefaultBtn) {
                        var i = function () {
                            t.start()
                        }, a = function () {
                            (0, r.hasClass)(e.danmuBtn, "danmu-switch-active") && t.pause()
                        }, o = function () {
                            (0, r.hasClass)(e.danmuBtn, "danmu-switch-active") && t.play()
                        }, l = function () {
                            (0, r.hasClass)(e.danmuBtn, "danmu-switch-active") && (t.stop(), t.start())
                        };
                        e.danmuBtn = (0, r.copyDom)(t.bulletBtn.createSwitch(!0)), e.controls.appendChild(e.danmuBtn), ["click", "touchend"].forEach((function (a) {
                            e.danmuBtn.addEventListener(a, (function (a) {
                                a.preventDefault(), a.stopPropagation(), (0, r.toggleClass)(e.danmuBtn, "danmu-switch-active"), (0, r.hasClass)(e.danmuBtn, "danmu-switch-active") ? (e.emit("danmuBtnOn"), (0, r.addClass)(n, "xgplayer-has-danmu"), e.once("timeupdate", i)) : (e.emit("danmuBtnOff"), (0, r.removeClass)(n, "xgplayer-has-danmu"), t.stop())
                            }))
                        })), e.onElementClick && n.addEventListener("click", (function (t) {
                            e.onElementClick(t, n)
                        }), !1), e.onElementDblclick && n.addEventListener("dblclick", (function (t) {
                            e.onElementDblclick(t, n)
                        }), !1), e.on("pause", a), e.on("play", o), e.on("seeked", l), e.once("destroy", (function t() {
                            e.off("timeupdate", i), e.off("pause", a), e.off("play", o), e.off("seeked", l), e.off("destroy", t)
                        }))
                    }
                }))
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0}), t.default = {
            name: "definition", method: function () {
                var e = this;
                e.once("destroy", (function t() {
                    e.off("destroy", t)
                }))
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r, i = n(86), a = (r = i) && r.__esModule ? r : {default: r}, o = n(87);
        t.default = {
            name: "download", method: function () {
                var e = this;

                function t() {
                    e.download()
                }

                e.on("downloadBtnClick", t), e.once("destroy", (function n() {
                    e.off("downloadBtnClick", t), e.off("destroy", n)
                })), e.download = function () {
                    var e = (0, o.getAbsoluteURL)(this.config.url);
                    (0, a.default)(e)
                }
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        var r, i, a;
        i = [], void 0 === (a = "function" == typeof (r = function () {
            return function e(t, n, r) {
                var i, a, o = window, l = "application/octet-stream", s = r || l, c = t, u = !n && !r && c,
                    p = document.createElement("a"), d = function (e) {
                        return String(e)
                    }, f = o.Blob || o.MozBlob || o.WebKitBlob || d, g = n || "download";
                if (f = f.call ? f.bind(o) : Blob, "true" === String(this) && (s = (c = [c, s])[0], c = c[1]), u && u.length < 2048 && (g = u.split("/").pop().split("?")[0], p.href = u, -1 !== p.href.indexOf(u))) {
                    var h = new XMLHttpRequest;
                    return h.open("GET", u, !0), h.responseType = "blob", h.onload = function (t) {
                        e(t.target.response, g, l)
                    }, setTimeout((function () {
                        h.send()
                    }), 0), h
                }
                if (/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(c)) {
                    if (!(c.length > 2096103.424 && f !== d)) return navigator.msSaveBlob ? navigator.msSaveBlob(x(c), g) : b(c);
                    s = (c = x(c)).type || l
                } else if (/([\x80-\xff])/.test(c)) {
                    for (var y = 0, m = new Uint8Array(c.length), v = m.length; y < v; ++y) m[y] = c.charCodeAt(y);
                    c = new f([m], {type: s})
                }

                function x(e) {
                    for (var t = e.split(/[:;,]/), n = t[1], r = ("base64" == t[2] ? atob : decodeURIComponent)(t.pop()), i = r.length, a = 0, o = new Uint8Array(i); a < i; ++a) o[a] = r.charCodeAt(a);
                    return new f([o], {type: n})
                }

                function b(e, t) {
                    if ("download" in p) return p.href = e, p.setAttribute("download", g), p.className = "download-js-link", p.innerHTML = "downloading...", p.style.display = "none", document.body.appendChild(p), setTimeout((function () {
                        p.click(), document.body.removeChild(p), !0 === t && setTimeout((function () {
                            o.URL.revokeObjectURL(p.href)
                        }), 250)
                    }), 66), !0;
                    if (/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) return /^data:/.test(e) && (e = "data:" + e.replace(/^data:([\w\/\-\+]+)/, l)), window.open(e) || confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.") && (location.href = e), !0;
                    var n = document.createElement("iframe");
                    document.body.appendChild(n), !t && /^data:/.test(e) && (e = "data:" + e.replace(/^data:([\w\/\-\+]+)/, l)), n.src = e, setTimeout((function () {
                        document.body.removeChild(n)
                    }), 333)
                }

                if (i = c instanceof f ? c : new f([c], {type: s}), navigator.msSaveBlob) return navigator.msSaveBlob(i, g);
                if (o.URL) b(o.URL.createObjectURL(i), !0); else {
                    if ("string" == typeof i || i.constructor === d) try {
                        return b("data:" + s + ";base64," + o.btoa(i))
                    } catch (k) {
                        return b("data:" + s + "," + encodeURIComponent(i))
                    }
                    (a = new FileReader).onload = function (e) {
                        b(this.result)
                    }, a.readAsDataURL(i)
                }
                return !0
            }
        }) ? r.apply(t, i) : r) || (e.exports = a)
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0}), t.getAbsoluteURL = function (e) {
            if (!e.match(/^https?:\/\//)) {
                var t = document.createElement("div");
                t.innerHTML = '<a href="' + e + '">x</a>', e = t.firstChild.href
            }
            return e
        }
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r, i = n(4), a = (r = i) && r.__esModule ? r : {default: r},
            o = {maxCount: 3, backupUrl: "", isFetch: !0, fetchTimeout: 100};
        t.default = {
            name: "errorretry", method: function () {
                var e = this, t = this;
                if (t.config.errorConfig && !(t.src.indexOf("blob:") > -1)) {
                    var n = {}, r = t.config.errorConfig;
                    for (var i in o) void 0 === r[i] ? n[i] = o[i] : n[i] = r[i];
                    t.retryData = {count: 0, errfTimer: null, isFetchReturn: !1, currentTime: 0};
                    var l = t._onError;
                    t._onError = function (r) {
                        var i = e.retryData.count;
                        if (i > n.maxCount) n.isFetch ? (o = e, c = e.currentSrc, u = n.fetchTimeout, p = function (e, t) {
                            o.retryData.isFetchReturn || (o.retryData.isFetchReturn = !0, e(t))
                        }, new Promise((function (e, t) {
                            try {
                                var n = new window.XMLHttpRequest;
                                n.open("get", c), n.onload = function () {
                                    p(e, {status: n.status, statusText: n.statusText, xhr: n})
                                }, n.onerror = function () {
                                    p(e, {
                                        status: n.status,
                                        statusText: n.statusText || "The network environment is disconnected or the address is invalid",
                                        xhr: n
                                    })
                                }, n.onabort = function () {
                                }, o.retryData.errfTimer = window.setTimeout((function () {
                                    var t = o.retryData.errfTimer;
                                    window.clearTimeout(t), o.retryData.errfTimer = null, p(e, {
                                        status: -1,
                                        statusText: "request timeout"
                                    })
                                }), u), n.send()
                            } catch (r) {
                                o.retryData.isFetchReturn = !0, p(e, {status: -2, statusText: "request error"})
                            }
                        }))).then((function (t) {
                            e.emit("error", new a.default({
                                type: "network",
                                currentTime: e.currentTime,
                                duration: e.duration || 0,
                                networkState: e.networkState,
                                readyState: e.readyState,
                                currentSrc: e.currentSrc,
                                src: e.src,
                                ended: e.ended,
                                httpCode: t.status,
                                httpMsg: t.statusText,
                                errd: {line: 101, msg: e.error, handle: "plugin errorRetry"},
                                errorCode: e.video && e.video.error.code,
                                mediaError: e.video && e.video.error
                            })), l.call(e, t)
                        })) : l.call(e, r); else {
                            var o, c, u, p;
                            0 === i && (e.retryData.currentTime = e.currentTime, e.once("canplay", s.bind(e)));
                            var d = "";
                            d = n.count < 2 ? n.backupUrl ? n.backupUrl : t.currentSrc : n.backupUrl && i > 1 ? n.backupUrl : t.currentSrc, e.retryData.count++, e.src = d
                        }
                    }
                }

                function s() {
                    this.currentTime = this.retryData.currentTime, this.play(), this.retryData.retryCode = 0, this.retryData.isFetchReturn = !1, this.retryData.currentTime = 0
                }
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = function () {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }

            return function (t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(), i = n(0), a = function () {
            function e(t) {
                !function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.player = t, this.state = {
                    playbackRate: 0,
                    isRepeat: !1,
                    keyCode: 0,
                    repeat: 0,
                    isBody: !1
                }, this.timer = null, this.initEvents()
            }

            return r(e, [{
                key: "initEvents", value: function () {
                    var e = this, t = this.player, n = t.root, r = t.config;
                    this.player.onBodyKeydown = this.onBodyKeydown.bind(this), this.player.onKeydown = this.onKeydown.bind(this), this.player.onKeyup = this.onKeyup.bind(this), r.keyShortcut && "on" !== r.keyShortcut || (document.addEventListener("keydown", this.player.onBodyKeydown), n.addEventListener("keydown", this.player.onKeydown), (0, i.on)(this.player, "destroy", (function () {
                        document.removeEventListener("keydown", e.player.onBodyKeydown), n.removeEventListener("keydown", e.player.onKeydown), clearTimeout(e.timer), e.timer = null
                    })))
                }
            }, {
                key: "checkTarget", value: function (e) {
                    var t = this.player;
                    return e.target === t.root || e.target === t.video || e.target === t.controls
                }
            }, {
                key: "onBodyKeydown", value: function (e) {
                    var t = e || window.event, n = t.keyCode;
                    if (t.target === document.body && (37 === n || 39 === n || 32 === n)) return t.preventDefault(), t.cancelBubble = !0, t.returnValue = !1, t.repeat || document.addEventListener("keyup", this.player.onKeyup), this.handler(t), !1
                }
            }, {
                key: "onKeydown", value: function (e) {
                    var t = e || window.event, n = t.keyCode;
                    if (this.checkTarget(t) && (37 === n || 38 === n || 39 === n || 40 === n || 32 === n || 27 === n)) return t.preventDefault(), t.cancelBubble = !0, t.returnValue = !1, this.player.emit("focus"), t.repeat || this.player.root.addEventListener("keyup", this.player.onKeyup), this.handler(t), !1
                }
            }, {
                key: "onKeyup", value: function () {
                    var e = this.state, t = this.player;
                    document.removeEventListener("keyup", this.player.onKeyup), t.root.removeEventListener("keyup", this.player.onKeyup), e.keyCode && (0 !== e.playbackRate && (t.playbackRate = e.playbackRate), e.isRepeat || this.handlerKeyCode(e.keyCode, !1), e.playbackRate = 0, e.isRepeat = !1, e.keyCode = 0, e.repeat = 0, this.changeVolumeSlide())
                }
            }, {
                key: "handler", value: function (e) {
                    var t = this.state, n = this.player;
                    t.keyCode = e.keyCode, t.isRepeat = e.repeat, e.repeat && (n.config.disableLongPress ? this.handlerKeyCode(t.keyCode, !1) : t.repeat % 2 == 0 && this.handlerKeyCode(t.keyCode, !0), t.repeat++)
                }
            }, {
                key: "handlerKeyCode", value: function (e, t) {
                    var n = this.player, r = this.state;
                    switch (e) {
                        case 39:
                            t ? 0 === r.repeat && this.changeRate() : this.seek(!1, t);
                            break;
                        case 37:
                            this.seek(!0, t);
                            break;
                        case 38:
                            this.changeVolume(!0);
                            break;
                        case 40:
                            this.changeVolume(!1);
                            break;
                        case 32:
                            t || (n.paused ? n.play() : n.pause());
                            break;
                        case 27:
                            (0, i.hasClass)(n.root, "xgplayer-is-cssfullscreen") && n.exitCssFullscreen()
                    }
                }
            }, {
                key: "seek", value: function (e, t) {
                    var n = this.player, r = (n.config.keyShortcutStep || {}).currentTime || 10;
                    n.isLoading || n.isSeeking || t && this.state.repeat % 8 > 0 || (e ? n.currentTime - r >= 0 ? n.currentTime -= r : n.currentTime = 0 : n.maxPlayedTime && n.config.allowSeekPlayed && n.currentTime + r > n.maxPlayedTime ? n.currentTime = n.maxPlayedTime : n.currentTime + r <= n.duration ? n.currentTime += r : n.currentTime = n.duration + 1)
                }
            }, {
                key: "changeRate", value: function () {
                    this.state.playbackRate = this.player.playbackRate, this.player.playbackRate = this.player.config.keyboardRate || 5
                }
            }, {
                key: "changeVolumeSlide", value: function (e) {
                    var t = this.player;
                    t.controls && (e ? (t.emit("focus"), (0, i.hasClass)(t.root, "xgplayer-volume-active") || (0, i.addClass)(t.root, "xgplayer-volume-active")) : (clearTimeout(this.timer), this.timer = setTimeout((function () {
                        (0, i.removeClass)(t.root, "xgplayer-volume-active")
                    }), 1e3)))
                }
            }, {
                key: "changeVolume", value: function (e) {
                    var t = this.player, n = (t.config.keyShortcutStep || {}).volume || .1;
                    this.changeVolumeSlide(!0);
                    var r = t.volume;
                    e && r + n <= 1 ? t.volume = r + n : !e && r - n >= 0 && (t.volume = r - n)
                }
            }]), e
        }();
        t.default = {
            name: "keyboard", method: function () {
                this.keyboard = new a(this)
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(0);
        t.default = {
            name: "localPreview", method: function () {
                var e = this, t = e.root;

                function n(n) {
                    e.uploadFile = n.files[0];
                    var i = URL.createObjectURL(e.uploadFile);
                    if ((0, r.hasClass)(t, "xgplayer-nostart")) e.config.url = i, e.start(); else {
                        e.src = i;
                        var a = e.play();
                        void 0 !== a && a && a.catch((function (e) {
                        }))
                    }
                }

                e.on("upload", n), e.once("destroy", (function t() {
                    e.off("upload", n), e.off("destroy", t)
                }))
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0}), t.default = {
            name: "memoryPlay", method: function () {
                var e = this;
                e.on("memoryPlayStart", (function (t) {
                    setTimeout((function () {
                        e.currentTime = t
                    }))
                }))
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r, i = n(0), a = n(93), o = (r = a) && r.__esModule ? r : {default: r};
        t.default = {
            name: "miniplayer", method: function () {
                var e = this, t = e.root;

                function n() {
                    (0, i.hasClass)(t, "xgplayer-miniplayer-active") ? e.exitMiniplayer() : e.getMiniplayer()
                }

                e.on("miniplayerBtnClick", n), e.once("destroy", (function t() {
                    e.off("miniplayerBtnClick", n), e.off("destroy", t)
                })), e.getMiniplayer = function () {
                    (0, i.hasClass)(t, "xgplayer-is-fullscreen") && this.exitFullscreen(t), (0, i.hasClass)(t, "xgplayer-is-cssfullscreen") && this.exitCssFullscreen(), (0, i.hasClass)(t, "xgplayer-rotate-fullscreen") && this.exitRotateFullscreen();
                    var e = (0, i.createDom)("xg-miniplayer-lay", "<div></div>", {}, "xgplayer-miniplayer-lay");
                    this.root.appendChild(e);
                    var n = (0, i.createDom)("xg-miniplayer-drag", '<div class="drag-handle"><span>' + this.lang.MINIPLAYER_DRAG + "</span></div>", {tabindex: 9}, "xgplayer-miniplayer-drag");
                    this.root.appendChild(n), new o.default(".xgplayer", {handle: ".drag-handle"}), (0, i.addClass)(this.root, "xgplayer-miniplayer-active"), this.root.style.right = 0, this.root.style.bottom = "200px", this.root.style.top = "", this.root.style.left = "", this.root.style.width = "320px", this.root.style.height = "180px", this.config.miniplayerConfig && (void 0 !== this.config.miniplayerConfig.top && (this.root.style.top = this.config.miniplayerConfig.top + "px", this.root.style.bottom = ""), void 0 !== this.config.miniplayerConfig.bottom && (this.root.style.bottom = this.config.miniplayerConfig.bottom + "px"), void 0 !== this.config.miniplayerConfig.left && (this.root.style.left = this.config.miniplayerConfig.left + "px", this.root.style.right = ""), void 0 !== this.config.miniplayerConfig.right && (this.root.style.right = this.config.miniplayerConfig.right + "px"), void 0 !== this.config.miniplayerConfig.width && (this.root.style.width = this.config.miniplayerConfig.width + "px"), void 0 !== this.config.miniplayerConfig.height && (this.root.style.height = this.config.miniplayerConfig.height + "px")), this.config.fluid && (this.root.style["padding-top"] = "");
                    var r = this;
                    ["click", "touchend"].forEach((function (t) {
                        e.addEventListener(t, (function (e) {
                            e.preventDefault(), e.stopPropagation(), r.exitMiniplayer()
                        }))
                    }))
                }, e.exitMiniplayer = function () {
                    (0, i.removeClass)(this.root, "xgplayer-miniplayer-active"), this.root.style.right = "", this.root.style.bottom = "", this.root.style.top = "", this.root.style.left = "", this.config.fluid ? (this.root.style.width = "100%", this.root.style.height = "0", this.root.style["padding-top"] = 100 * this.config.height / this.config.width + "%") : (this.config.width && ("number" != typeof this.config.width ? this.root.style.width = this.config.width : this.root.style.width = this.config.width + "px"), this.config.height && ("number" != typeof this.config.height ? this.root.style.height = this.config.height : this.root.style.height = this.config.height + "px"));
                    var e = (0, i.findDom)(this.root, ".xgplayer-miniplayer-lay");
                    e && e.parentNode && e.parentNode.removeChild(e);
                    var t = (0, i.findDom)(this.root, ".xgplayer-miniplayer-drag");
                    t && t.parentNode && t.parentNode.removeChild(t)
                }
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        var r, i, a;
        /*!
            * Draggabilly v2.4.1
            * Make that shiz draggable
            * https://draggabilly.desandro.com
            * MIT license
            */
        a = window, r = [n(94), n(95)], i = function (e, t) {
            return function (e, t, n) {
                function r(e, t) {
                    for (var n in t) e[n] = t[n];
                    return e
                }

                function i() {
                }

                var a = e.jQuery;

                function o(e, t) {
                    this.element = "string" == typeof e ? document.querySelector(e) : e, a && (this.$element = a(this.element)), this.options = r({}, this.constructor.defaults), this.option(t), this._create()
                }

                var l = o.prototype = Object.create(n.prototype);
                o.defaults = {}, l.option = function (e) {
                    r(this.options, e)
                };
                var s = {relative: !0, absolute: !0, fixed: !0};

                function c(e, t, n) {
                    return n = n || "round", t ? Math[n](e / t) * t : e
                }

                return l._create = function () {
                    this.position = {}, this._getPosition(), this.startPoint = {x: 0, y: 0}, this.dragPoint = {
                        x: 0,
                        y: 0
                    }, this.startPosition = r({}, this.position);
                    var e = getComputedStyle(this.element);
                    s[e.position] || (this.element.style.position = "relative"), this.on("pointerMove", this.onPointerMove), this.on("pointerUp", this.onPointerUp), this.enable(), this.setHandles()
                }, l.setHandles = function () {
                    this.handles = this.options.handle ? this.element.querySelectorAll(this.options.handle) : [this.element], this.bindHandles()
                }, l.dispatchEvent = function (e, t, n) {
                    var r = [t].concat(n);
                    this.emitEvent(e, r), this.dispatchJQueryEvent(e, t, n)
                }, l.dispatchJQueryEvent = function (t, n, r) {
                    var i = e.jQuery;
                    if (i && this.$element) {
                        var a = i.Event(n);
                        a.type = t, this.$element.trigger(a, r)
                    }
                }, l._getPosition = function () {
                    var e = getComputedStyle(this.element), t = this._getPositionCoord(e.left, "width"),
                        n = this._getPositionCoord(e.top, "height");
                    this.position.x = isNaN(t) ? 0 : t, this.position.y = isNaN(n) ? 0 : n, this._addTransformPosition(e)
                }, l._getPositionCoord = function (e, n) {
                    if (-1 != e.indexOf("%")) {
                        var r = t(this.element.parentNode);
                        return r ? parseFloat(e) / 100 * r[n] : 0
                    }
                    return parseInt(e, 10)
                }, l._addTransformPosition = function (e) {
                    var t = e.transform;
                    if (0 === t.indexOf("matrix")) {
                        var n = t.split(","), r = 0 === t.indexOf("matrix3d") ? 12 : 4, i = parseInt(n[r], 10),
                            a = parseInt(n[r + 1], 10);
                        this.position.x += i, this.position.y += a
                    }
                }, l.onPointerDown = function (e, t) {
                    this.element.classList.add("is-pointer-down"), this.dispatchJQueryEvent("pointerDown", e, [t])
                }, l.pointerDown = function (e, t) {
                    this.okayPointerDown(e) && this.isEnabled ? (this.pointerDownPointer = {
                        pageX: t.pageX,
                        pageY: t.pageY
                    }, e.preventDefault(), this.pointerDownBlur(), this._bindPostStartEvents(e), this.element.classList.add("is-pointer-down"), this.dispatchEvent("pointerDown", e, [t])) : this._pointerReset()
                }, l.dragStart = function (e, t) {
                    this.isEnabled && (this._getPosition(), this.measureContainment(), this.startPosition.x = this.position.x, this.startPosition.y = this.position.y, this.setLeftTop(), this.dragPoint.x = 0, this.dragPoint.y = 0, this.element.classList.add("is-dragging"), this.dispatchEvent("dragStart", e, [t]), this.animate())
                }, l.measureContainment = function () {
                    var e = this.getContainer();
                    if (e) {
                        var n = t(this.element), r = t(e), i = this.element.getBoundingClientRect(),
                            a = e.getBoundingClientRect(), o = r.borderLeftWidth + r.borderRightWidth,
                            l = r.borderTopWidth + r.borderBottomWidth, s = this.relativeStartPosition = {
                                x: i.left - (a.left + r.borderLeftWidth),
                                y: i.top - (a.top + r.borderTopWidth)
                            };
                        this.containSize = {width: r.width - o - s.x - n.width, height: r.height - l - s.y - n.height}
                    }
                }, l.getContainer = function () {
                    var e = this.options.containment;
                    if (e) return e instanceof HTMLElement ? e : "string" == typeof e ? document.querySelector(e) : this.element.parentNode
                }, l.onPointerMove = function (e, t, n) {
                    this.dispatchJQueryEvent("pointerMove", e, [t, n])
                }, l.dragMove = function (e, t, n) {
                    if (this.isEnabled) {
                        var r = n.x, i = n.y, a = this.options.grid, o = a && a[0], l = a && a[1];
                        r = c(r, o), i = c(i, l), r = this.containDrag("x", r, o), i = this.containDrag("y", i, l), r = "y" == this.options.axis ? 0 : r, i = "x" == this.options.axis ? 0 : i, this.position.x = this.startPosition.x + r, this.position.y = this.startPosition.y + i, this.dragPoint.x = r, this.dragPoint.y = i, this.dispatchEvent("dragMove", e, [t, n])
                    }
                }, l.containDrag = function (e, t, n) {
                    if (!this.options.containment) return t;
                    var r = "x" == e ? "width" : "height", i = c(-this.relativeStartPosition[e], n, "ceil"),
                        a = this.containSize[r];
                    return a = c(a, n, "floor"), Math.max(i, Math.min(a, t))
                }, l.onPointerUp = function (e, t) {
                    this.element.classList.remove("is-pointer-down"), this.dispatchJQueryEvent("pointerUp", e, [t])
                }, l.dragEnd = function (e, t) {
                    this.isEnabled && (this.element.style.transform = "", this.setLeftTop(), this.element.classList.remove("is-dragging"), this.dispatchEvent("dragEnd", e, [t]))
                }, l.animate = function () {
                    if (this.isDragging) {
                        this.positionDrag();
                        var e = this;
                        requestAnimationFrame((function () {
                            e.animate()
                        }))
                    }
                }, l.setLeftTop = function () {
                    this.element.style.left = this.position.x + "px", this.element.style.top = this.position.y + "px"
                }, l.positionDrag = function () {
                    this.element.style.transform = "translate3d( " + this.dragPoint.x + "px, " + this.dragPoint.y + "px, 0)"
                }, l.staticClick = function (e, t) {
                    this.dispatchEvent("staticClick", e, [t])
                }, l.setPosition = function (e, t) {
                    this.position.x = e, this.position.y = t, this.setLeftTop()
                }, l.enable = function () {
                    this.isEnabled = !0
                }, l.disable = function () {
                    this.isEnabled = !1, this.isDragging && this.dragEnd()
                }, l.destroy = function () {
                    this.disable(), this.element.style.transform = "", this.element.style.left = "", this.element.style.top = "", this.element.style.position = "", this.unbindHandles(), this.$element && this.$element.removeData("draggabilly")
                }, l._init = i, a && a.bridget && a.bridget("draggabilly", o), o
            }(a, e, t)
        }.apply(t, r), void 0 === i || (e.exports = i)
    }, function (e, t, n) {
        var r, i;
        /*!
            * getSize v2.0.3
            * measure size of elements
            * MIT license
            */
        window, void 0 === (i = "function" == typeof (r = function () {
            function e(e) {
                var t = parseFloat(e);
                return -1 == e.indexOf("%") && !isNaN(t) && t
            }

            function t() {
            }

            var n = "undefined" == typeof console ? t : function (e) {
                },
                r = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
                i = r.length;

            function a() {
                for (var e = {
                    width: 0,
                    height: 0,
                    innerWidth: 0,
                    innerHeight: 0,
                    outerWidth: 0,
                    outerHeight: 0
                }, t = 0; t < i; t++) e[r[t]] = 0;
                return e
            }

            function o(e) {
                var t = getComputedStyle(e);
                return t || n("Style returned " + t + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), t
            }

            var l, s = !1;

            function c() {
                if (!s) {
                    s = !0;
                    var t = document.createElement("div");
                    t.style.width = "200px", t.style.padding = "1px 2px 3px 4px", t.style.borderStyle = "solid", t.style.borderWidth = "1px 2px 3px 4px", t.style.boxSizing = "border-box";
                    var n = document.body || document.documentElement;
                    n.appendChild(t);
                    var r = o(t);
                    l = 200 == Math.round(e(r.width)), u.isBoxSizeOuter = l, n.removeChild(t)
                }
            }

            function u(t) {
                if (c(), "string" == typeof t && (t = document.querySelector(t)), t && "object" == typeof t && t.nodeType) {
                    var n = o(t);
                    if ("none" == n.display) return a();
                    var s = {};
                    s.width = t.offsetWidth, s.height = t.offsetHeight;
                    for (var u = s.isBorderBox = "border-box" == n.boxSizing, p = 0; p < i; p++) {
                        var d = r[p], f = n[d], g = parseFloat(f);
                        s[d] = isNaN(g) ? 0 : g
                    }
                    var h = s.paddingLeft + s.paddingRight, y = s.paddingTop + s.paddingBottom,
                        m = s.marginLeft + s.marginRight, v = s.marginTop + s.marginBottom,
                        x = s.borderLeftWidth + s.borderRightWidth, b = s.borderTopWidth + s.borderBottomWidth,
                        k = u && l, w = e(n.width);
                    !1 !== w && (s.width = w + (k ? 0 : h + x));
                    var _ = e(n.height);
                    return !1 !== _ && (s.height = _ + (k ? 0 : y + b)), s.innerWidth = s.width - (h + x), s.innerHeight = s.height - (y + b), s.outerWidth = s.width + m, s.outerHeight = s.height + v, s
                }
            }

            return u
        }) ? r.call(t, n, t, e) : r) || (e.exports = i)
    }, function (e, t, n) {
        var r, i, a;
        /*!
            * Unidragger v2.4.0
            * Draggable base class
            * MIT license
            */
        a = window, r = [n(96)], i = function (e) {
            return function (e, t) {
                function n() {
                }

                var r = n.prototype = Object.create(t.prototype);
                r.bindHandles = function () {
                    this._bindHandles(!0)
                }, r.unbindHandles = function () {
                    this._bindHandles(!1)
                }, r._bindHandles = function (t) {
                    for (var n = (t = void 0 === t || t) ? "addEventListener" : "removeEventListener", r = t ? this._touchActionValue : "", i = 0; i < this.handles.length; i++) {
                        var a = this.handles[i];
                        this._bindStartEvent(a, t), a[n]("click", this), e.PointerEvent && (a.style.touchAction = r)
                    }
                }, r._touchActionValue = "none", r.pointerDown = function (e, t) {
                    this.okayPointerDown(e) && (this.pointerDownPointer = {
                        pageX: t.pageX,
                        pageY: t.pageY
                    }, e.preventDefault(), this.pointerDownBlur(), this._bindPostStartEvents(e), this.emitEvent("pointerDown", [e, t]))
                };
                var i = {TEXTAREA: !0, INPUT: !0, SELECT: !0, OPTION: !0},
                    a = {radio: !0, checkbox: !0, button: !0, submit: !0, image: !0, file: !0};
                return r.okayPointerDown = function (e) {
                    var t = i[e.target.nodeName], n = a[e.target.type], r = !t || n;
                    return r || this._pointerReset(), r
                }, r.pointerDownBlur = function () {
                    var e = document.activeElement;
                    e && e.blur && e != document.body && e.blur()
                }, r.pointerMove = function (e, t) {
                    var n = this._dragPointerMove(e, t);
                    this.emitEvent("pointerMove", [e, t, n]), this._dragMove(e, t, n)
                }, r._dragPointerMove = function (e, t) {
                    var n = {x: t.pageX - this.pointerDownPointer.pageX, y: t.pageY - this.pointerDownPointer.pageY};
                    return !this.isDragging && this.hasDragStarted(n) && this._dragStart(e, t), n
                }, r.hasDragStarted = function (e) {
                    return Math.abs(e.x) > 3 || Math.abs(e.y) > 3
                }, r.pointerUp = function (e, t) {
                    this.emitEvent("pointerUp", [e, t]), this._dragPointerUp(e, t)
                }, r._dragPointerUp = function (e, t) {
                    this.isDragging ? this._dragEnd(e, t) : this._staticClick(e, t)
                }, r._dragStart = function (e, t) {
                    this.isDragging = !0, this.isPreventingClicks = !0, this.dragStart(e, t)
                }, r.dragStart = function (e, t) {
                    this.emitEvent("dragStart", [e, t])
                }, r._dragMove = function (e, t, n) {
                    this.isDragging && this.dragMove(e, t, n)
                }, r.dragMove = function (e, t, n) {
                    e.preventDefault(), this.emitEvent("dragMove", [e, t, n])
                }, r._dragEnd = function (e, t) {
                    this.isDragging = !1, setTimeout(function () {
                        delete this.isPreventingClicks
                    }.bind(this)), this.dragEnd(e, t)
                }, r.dragEnd = function (e, t) {
                    this.emitEvent("dragEnd", [e, t])
                }, r.onclick = function (e) {
                    this.isPreventingClicks && e.preventDefault()
                }, r._staticClick = function (e, t) {
                    this.isIgnoringMouseUp && "mouseup" == e.type || (this.staticClick(e, t), "mouseup" != e.type && (this.isIgnoringMouseUp = !0, setTimeout(function () {
                        delete this.isIgnoringMouseUp
                    }.bind(this), 400)))
                }, r.staticClick = function (e, t) {
                    this.emitEvent("staticClick", [e, t])
                }, n.getPointerPoint = t.getPointerPoint, n
            }(a, e)
        }.apply(t, r), void 0 === i || (e.exports = i)
    }, function (e, t, n) {
        var r, i, a;
        /*!
            * Unipointer v2.4.0
            * base class for doing one thing with pointer event
            * MIT license
            */
        a = window, r = [n(97)], i = function (e) {
            return function (e, t) {
                function n() {
                }

                function r() {
                }

                var i = r.prototype = Object.create(t.prototype);
                i.bindStartEvent = function (e) {
                    this._bindStartEvent(e, !0)
                }, i.unbindStartEvent = function (e) {
                    this._bindStartEvent(e, !1)
                }, i._bindStartEvent = function (t, n) {
                    var r = (n = void 0 === n || n) ? "addEventListener" : "removeEventListener", i = "mousedown";
                    "ontouchstart" in e ? i = "touchstart" : e.PointerEvent && (i = "pointerdown"), t[r](i, this)
                }, i.handleEvent = function (e) {
                    var t = "on" + e.type;
                    this[t] && this[t](e)
                }, i.getTouch = function (e) {
                    for (var t = 0; t < e.length; t++) {
                        var n = e[t];
                        if (n.identifier == this.pointerIdentifier) return n
                    }
                }, i.onmousedown = function (e) {
                    var t = e.button;
                    t && 0 !== t && 1 !== t || this._pointerDown(e, e)
                }, i.ontouchstart = function (e) {
                    this._pointerDown(e, e.changedTouches[0])
                }, i.onpointerdown = function (e) {
                    this._pointerDown(e, e)
                }, i._pointerDown = function (e, t) {
                    e.button || this.isPointerDown || (this.isPointerDown = !0, this.pointerIdentifier = void 0 !== t.pointerId ? t.pointerId : t.identifier, this.pointerDown(e, t))
                }, i.pointerDown = function (e, t) {
                    this._bindPostStartEvents(e), this.emitEvent("pointerDown", [e, t])
                };
                var a = {
                    mousedown: ["mousemove", "mouseup"],
                    touchstart: ["touchmove", "touchend", "touchcancel"],
                    pointerdown: ["pointermove", "pointerup", "pointercancel"]
                };
                return i._bindPostStartEvents = function (t) {
                    if (t) {
                        var n = a[t.type];
                        n.forEach((function (t) {
                            e.addEventListener(t, this)
                        }), this), this._boundPointerEvents = n
                    }
                }, i._unbindPostStartEvents = function () {
                    this._boundPointerEvents && (this._boundPointerEvents.forEach((function (t) {
                        e.removeEventListener(t, this)
                    }), this), delete this._boundPointerEvents)
                }, i.onmousemove = function (e) {
                    this._pointerMove(e, e)
                }, i.onpointermove = function (e) {
                    e.pointerId == this.pointerIdentifier && this._pointerMove(e, e)
                }, i.ontouchmove = function (e) {
                    var t = this.getTouch(e.changedTouches);
                    t && this._pointerMove(e, t)
                }, i._pointerMove = function (e, t) {
                    this.pointerMove(e, t)
                }, i.pointerMove = function (e, t) {
                    this.emitEvent("pointerMove", [e, t])
                }, i.onmouseup = function (e) {
                    this._pointerUp(e, e)
                }, i.onpointerup = function (e) {
                    e.pointerId == this.pointerIdentifier && this._pointerUp(e, e)
                }, i.ontouchend = function (e) {
                    var t = this.getTouch(e.changedTouches);
                    t && this._pointerUp(e, t)
                }, i._pointerUp = function (e, t) {
                    this._pointerDone(), this.pointerUp(e, t)
                }, i.pointerUp = function (e, t) {
                    this.emitEvent("pointerUp", [e, t])
                }, i._pointerDone = function () {
                    this._pointerReset(), this._unbindPostStartEvents(), this.pointerDone()
                }, i._pointerReset = function () {
                    this.isPointerDown = !1, delete this.pointerIdentifier
                }, i.pointerDone = n, i.onpointercancel = function (e) {
                    e.pointerId == this.pointerIdentifier && this._pointerCancel(e, e)
                }, i.ontouchcancel = function (e) {
                    var t = this.getTouch(e.changedTouches);
                    t && this._pointerCancel(e, t)
                }, i._pointerCancel = function (e, t) {
                    this._pointerDone(), this.pointerCancel(e, t)
                }, i.pointerCancel = function (e, t) {
                    this.emitEvent("pointerCancel", [e, t])
                }, r.getPointerPoint = function (e) {
                    return {x: e.pageX, y: e.pageY}
                }, r
            }(a, e)
        }.apply(t, r), void 0 === i || (e.exports = i)
    }, function (e, t, n) {
        var r, i;
        "undefined" != typeof window && window, void 0 === (i = "function" == typeof (r = function () {
            function e() {
            }

            var t = e.prototype;
            return t.on = function (e, t) {
                if (e && t) {
                    var n = this._events = this._events || {}, r = n[e] = n[e] || [];
                    return -1 == r.indexOf(t) && r.push(t), this
                }
            }, t.once = function (e, t) {
                if (e && t) {
                    this.on(e, t);
                    var n = this._onceEvents = this._onceEvents || {};
                    return (n[e] = n[e] || {})[t] = !0, this
                }
            }, t.off = function (e, t) {
                var n = this._events && this._events[e];
                if (n && n.length) {
                    var r = n.indexOf(t);
                    return -1 != r && n.splice(r, 1), this
                }
            }, t.emitEvent = function (e, t) {
                var n = this._events && this._events[e];
                if (n && n.length) {
                    n = n.slice(0), t = t || [];
                    for (var r = this._onceEvents && this._onceEvents[e], i = 0; i < n.length; i++) {
                        var a = n[i];
                        r && r[a] && (this.off(e, a), delete r[a]), a.apply(this, t)
                    }
                    return this
                }
            }, t.allOff = function () {
                delete this._events, delete this._onceEvents
            }, e
        }) ? r.call(t, n, t, e) : r) || (e.exports = i)
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(0);
        t.default = {
            name: "pip", method: function () {
                var e = this, t = this;

                function n() {
                    t.video !== document.pictureInPictureElement ? t.video.requestPictureInPicture() : document.exitPictureInPicture()
                }

                t.on("pipBtnClick", n);
                var i = function (n) {
                    var i = t.video.webkitPresentationMode;
                    e.pMode = i, i === r.PresentationMode.PIP ? t.emit("requestPictureInPicture", n.pictureInPictureWindow) : i === r.PresentationMode.INLINE && t.emit("exitPictureInPicture")
                };
                t.video.addEventListener("enterpictureinpicture", (function (e) {
                    (0, r.addClass)(t.root, "xgplayer-pip-active"), t.emit("requestPictureInPicture", e)
                })), t.video.addEventListener("leavepictureinpicture", (function () {
                    (0, r.removeClass)(t.root, "xgplayer-pip-active"), t.emit("exitPictureInPicture")
                })), (0, r.checkWebkitSetPresentationMode)(t.video) && t.video.addEventListener("webkitpresentationmodechanged", i), t.once("destroy", (function e() {
                    t.off("pipBtnClick", n), t.off("destroy", e), (0, r.checkWebkitSetPresentationMode)(t.video) && t.video.removeEventListener("webkitpresentationmodechanged", i)
                }))
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0}), t.default = {
            name: "playNext", method: function () {
                var e = this, t = e.config.playNext;

                function n() {
                    e.currentVideoIndex + 1 < t.urlList.length && (e.currentVideoIndex++, e.video.autoplay = !0, e.src = t.urlList[e.currentVideoIndex], e.emit("playerNext", e.currentVideoIndex + 1), e.currentVideoIndex + 1 === t.urlList.length && e.emit("urlListEnd"))
                }

                e.currentVideoIndex = -1, e.on("playNextBtnClick", n), e.once("destroy", (function t() {
                    e.off("playNextBtnClick", n), e.off("destroy", t)
                }))
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(0);
        t.default = {
            name: "reload", method: function () {
                var e = this;

                function t() {
                    (0, r.removeClass)(e.root, "xgplayer-is-error"), e.src = e.config.url
                }

                e.config.reload && (e.on("reloadBtnClick", t), e.once("destroy", (function n() {
                    e.off("reloadBtnClick", t), e.off("destroy", n)
                })))
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0}), t.default = {
            name: "rotate", method: function () {
                var e = this, t = e.config.rotate;

                function n() {
                    e.rotate(t.clockwise, t.innerRotate)
                }

                t && (e.on("rotateBtnClick", n), e.once("destroy", (function t() {
                    e.off("rotateBtnClick", n), e.off("destroy", t)
                })), e.updateRotateDeg = function () {
                    var e = this;
                    e.rotateDeg || (e.rotateDeg = 0);
                    var t = e.root.offsetWidth, n = e.root.offsetHeight, r = e.video.videoWidth,
                        i = e.video.videoHeight;
                    !e.config.rotate.innerRotate && e.config.rotate.controlsFix && (e.root.style.width = n + "px", e.root.style.height = t + "px");
                    var a = void 0;
                    .25 === e.rotateDeg || .75 === e.rotateDeg ? (a = e.config.rotate.innerRotate ? r / i > n / t ? n / (i / r > n / t ? n * r / i : t) : t / (i / r > n / t ? n : t * i / r) : t >= n ? t / n : n / t, a = Number(a.toFixed(5))) : a = 1, e.config.rotate.innerRotate || e.config.rotate.controlsFix ? (e.video.style.transformOrigin = "center center", e.video.style.transform = "rotate(" + e.rotateDeg + "turn) scale(" + a + ")", e.video.style.webKitTransform = "rotate(" + e.rotateDeg + "turn) scale(" + a + ")") : (e.root.style.transformOrigin = "center center", e.root.style.transform = "rotate(" + e.rotateDeg + "turn) scale(1)", e.root.style.webKitTransform = "rotate(" + e.rotateDeg + "turn) scale(1)")
                }, e.rotate = function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1, n = this;
                    n.rotateDeg || (n.rotateDeg = 0);
                    var r = e ? 1 : -1;
                    n.rotateDeg = (n.rotateDeg + 1 + .25 * r * t) % 1, this.updateRotateDeg(), n.emit("rotate", 360 * n.rotateDeg)
                })
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0}), t.default = {
            name: "screenShot", method: function () {
                var e = this, t = e.config.screenShot, n = null;
                if (t) {
                    e.video.setAttribute("crossOrigin", "anonymous");
                    var r = .92;
                    (t.quality || 0 === t.quality) && (r = t.quality);
                    var i = void 0 === t.type ? "image/png" : t.type, a = void 0 === t.format ? ".png" : t.format,
                        o = document.createElement("canvas"), l = o.getContext("2d"), s = new Image;
                    o.width = this.config.width || 600, o.height = this.config.height || 337.5, e.screenShot = function () {
                        var c = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                        c = void 0 === t.saveImg ? c : t.saveImg, o.width = e.video.videoWidth || 600, o.height = e.video.videoHeight || 337.5, n = t.callBack, s.onload = function () {
                            l.drawImage(e.video, 0, 0, o.width, o.height), s.src = o.toDataURL(i, r).replace(i, "image/octet-stream");
                            var u = s.src.replace(/^data:image\/[^;]+/, "data:application/octet-stream"),
                                p = t.fileName || e.lang.SCREENSHOT;
                            e.emit("screenShot", u), c && n ? n(u, p, a) : c && function (e, t) {
                                var n = document.createElement("a");
                                n.href = e, n.download = t;
                                var r = document.createEvent("MouseEvents");
                                r.initMouseEvent("click", !0, !1, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), n.dispatchEvent(r)
                            }(u, p + a)
                        }()
                    }, e.on("screenShotBtnClick", e.screenShot), e.once("destroy", (function t() {
                        e.off("screenShotBtnClick", e.screenShot), e.off("destroy", t)
                    }))
                }
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r, i = n(4), a = (r = i) && r.__esModule ? r : {default: r};
        t.default = {
            name: "stallCheck", method: function () {
                var e = this;
                if (e.config.enableStallCheck) {
                    var t = 0, n = void 0, r = void 0;
                    e.once("complete", (function () {
                        setInterval((function () {
                            e.currentTime - (t || 0) > .1 || e.paused ? 1 !== n && 2 !== n || (n = 0, clearTimeout(r), r = null) : n || (n = 1, r = setTimeout((function () {
                                1 === n && (n = 2, e.emit("error", new a.default("STALL"))), r = null
                            }), 2e4)), t = e.currentTime
                        }), 1e3)
                    }))
                }
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r, i = n(0), a = n(5), o = (r = a) && r.__esModule ? r : {default: r};
        t.default = {
            name: "volume", method: function () {
                var e = this, t = e.root, n = void 0, r = void 0, a = void 0, l = void 0;

                function s() {
                    e.controls && (e.volume = e.config.volume, (n = e.controls.querySelector(".xgplayer-volume")) && (r = n.querySelector(".xgplayer-slider"), a = n.querySelector(".xgplayer-bar"), l = n.querySelector(".xgplayer-drag"), "mobile" === o.default.device && (0 === e.volume && (e.video.muted = !0), g())))
                }

                function c(t) {
                    if (r) {
                        e.video.muted = !1, r.focus(), (0, i.event)(t);
                        var n = a.getBoundingClientRect(), o = (t.clientX, t.clientY),
                            s = l.getBoundingClientRect().height, c = !1, u = function (t) {
                                t.preventDefault(), t.stopPropagation(), (0, i.event)(t), c = !0;
                                var r = s - t.clientY + o, a = r / n.height;
                                l.style.height = r + "px", e.volume = Math.max(Math.min(a, 1), 0)
                            }, p = function t(a) {
                                if (a.preventDefault(), a.stopPropagation(), (0, i.event)(a), window.removeEventListener("mousemove", u), window.removeEventListener("touchmove", u), window.removeEventListener("mouseup", t), window.removeEventListener("touchend", t), !c) {
                                    var o = n.height - (a.clientY - n.top), s = o / n.height;
                                    l.style.height = o + "px", s <= 0 && (e.volume > 0 ? l.volume = e.video.volume : s = l.volume), e.volume = Math.max(Math.min(s, 1), 0)
                                }
                                r.volume = e.volume, c = !1
                            };
                        return window.addEventListener("mousemove", u), window.addEventListener("touchmove", u), window.addEventListener("mouseup", p), window.addEventListener("touchend", p), !1
                    }
                }

                function u() {
                    if ("mobile" === o.default.device) e.video.muted ? (e.video.muted = !1, e.emit("unmute"), e.volume = 1) : (e.video.muted = !0, e.emit("mute"), e.volume = 0); else {
                        if (!r) return;
                        e.video.muted = !1, e.volume < .1 ? (r.volume < .1 ? e.volume = .6 : e.volume = r.volume, e.emit("unmute")) : (e.volume = 0, e.emit("mute"))
                    }
                }

                function p() {
                    (0, i.addClass)(t, "xgplayer-volume-active"), n && n.focus()
                }

                function d() {
                    (0, i.removeClass)(t, "xgplayer-volume-active")
                }

                e.once("canplay", s), e.on("volumeBarClick", c), e.on("volumeIconClick", u), e.on("volumeIconEnter", p), e.on("volumeIconLeave", d);
                var f = null;

                function g() {
                    f && clearTimeout(f), f = setTimeout((function () {
                        if ("mobile" === o.default.device) (0, i.removeClass)(t, "xgplayer-volume-muted"), (0, i.removeClass)(t, "xgplayer-volume-large"), e.video.muted || e.video.defaultMuted ? (e.video.muted || (e.video.muted = !0), e.video.defaultMuted = !1, (0, i.addClass)(t, "xgplayer-volume-muted")) : (0, i.addClass)(t, "xgplayer-volume-large"); else {
                            if ((0, i.removeClass)(t, "xgplayer-volume-muted"), (0, i.removeClass)(t, "xgplayer-volume-small"), (0, i.removeClass)(t, "xgplayer-volume-large"), 0 === e.volume || e.muted ? (0, i.addClass)(t, "xgplayer-volume-muted") : e.volume < .5 ? (0, i.addClass)(t, "xgplayer-volume-small") : (0, i.addClass)(t, "xgplayer-volume-large"), !a) return;
                            var n = a.getBoundingClientRect().height || 76;
                            l.style.height = e.volume * n + "px"
                        }
                    }), 50)
                }

                e.on("volumechange", g), e.once("destroy", (function t() {
                    e.off("canplay", s), e.off("volumeBarClick", c), e.off("volumeIconClick", u), e.off("volumeIconEnter", p), e.off("volumeIconLeave", d), e.off("volumechange", g), e.off("destroy", t), f && (clearTimeout(f), f = null)
                }))
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r, i = function () {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }

            return function (t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(), a = n(106), o = (r = a) && r.__esModule ? r : {default: r}, l = {
            follow: !0,
            mode: "stroke",
            followBottom: 50,
            fitVideo: !0,
            offsetBottom: 2,
            baseSizeX: 49,
            baseSizeY: 28,
            minSize: 16,
            minMobileSize: 13,
            line: "double",
            fontColor: "#fff"
        }, s = function () {
            function e(t, n, r) {
                var i = this;
                !function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var a = this.create(n, r, t.textTrackShowDefault);
                a.attachPlayer(t), this.subtitle = a, this.player = t, this.positionData = {
                    vBottom: 0,
                    marginBottom: 0
                }, this.isActive = !1, this.followBottom = r.followBottom, ["onSubtitleResize", "onFocus", "onBlur"].map((function (e) {
                    i[e] = i[e].bind(i)
                })), t.controls && r.follow && (this.subtitle.on("resize", this.onSubtitleResize), t.on("focus", this.onFocus), t.on("blur", this.onBlur))
            }

            return i(e, [{
                key: "create", value: function (e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = {
                        subTitles: e,
                        defaultOpen: !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2]
                    };
                    return Object.keys(t).map((function (e) {
                        n[e] = t[e]
                    })), new o.default(n)
                }
            }, {
                key: "switch", value: function (e) {
                    return this.subtitle.switch(e)
                }
            }, {
                key: "switchOff", value: function () {
                    return this.subtitle.switchOff()
                }
            }, {
                key: "setSubTitles", value: function (e, t, n) {
                    return this.subtitle.setSubTitles(e, t, n)
                }
            }, {
                key: "onFocus", value: function () {
                    var e = this.positionData, t = e.marginBottom, n = e.vBottom;
                    if (!this.isActive && t) {
                        this.isActive = !0;
                        var r = t + n;
                        this.followBottom > r && (r = this.followBottom), this.subtitle && (this.subtitle.root.style.bottom = r + "px")
                    }
                }
            }, {
                key: "onBlur", value: function () {
                    this.isActive = !1;
                    var e = this.positionData.vBottom + this.positionData.marginBottom;
                    this.subtitle && (this.subtitle.root.style.bottom = e + "px")
                }
            }, {
                key: "onSubtitleResize", value: function (e) {
                    this.positionData.vBottom = e.vBottom, this.positionData.marginBottom = e.marginBottom
                }
            }, {
                key: "destroy", value: function () {
                    this.subtitle.off("resize", this.onSubtitleResize), this.player.off("focus", this.onFocus), this.player.off("blur", this.onBlur), this.subtitle.destroy(), this.subtitle = null
                }
            }]), e
        }();
        t.default = {
            name: "textTrack", method: function () {
                var e = this, t = this;
                if (t.config.textTrack) {
                    var n = t.config.textTrackStyle || {};
                    Object.keys(l).map((function (e) {
                        void 0 === n[e] && (n[e] = l[e])
                    })), t.textTrackShowDefault = !1, t.config.textTrack.map((function (e, n) {
                        e.id || e.language || (e.id = n), !e.url && (e.url = e.src), !e.language && (e.language = e.srclang), void 0 === e.isDefault && (e.isDefault = e.default), !t.textTrackShowDefault && (t.textTrackShowDefault = e.isDefault || e.default)
                    })), this.subTitles = new s(t, t.config.textTrack, n), t.setSubTitles = function (n) {
                        var r = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], i = !1;
                        n.map((function (e, t) {
                            e.id || e.language || (e.id = t), !e.url && (e.url = e.src), !e.language && (e.language = e.srclang), void 0 === e.isDefault && (e.isDefault = e.default), e.isDefault && (i = !0)
                        })), t.textTrackShowDefault = i, e.subTitles.setSubTitles(n, i, r), t.emit("subtitle_change", {
                            off: !1,
                            isListUpdate: !0,
                            list: n
                        })
                    }, t.switchSubTitle = function () {
                        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {id: "", language: ""};
                        e.subTitles.switch(n).then((function (e) {
                            0 === e.code && (n.off = !1, n.isListUpdate = !1, n.list = [], t.emit("subtitle_change", n))
                        }))
                    }, t.switchOffSubtile = function () {
                        e.subTitles.switchOff(), t.emit("subtitle_change", {off: !0, isListUpdate: !1, list: []})
                    }, t.once("destroy", (function () {
                        this.subTitles.destroy(), this.subTitles = null
                    }))
                }
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        e.exports = function () {
            function e(e) {
                return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
            }

            function t(e, t) {
                return e(t = {exports: {}}, t.exports), t.exports
            }

            function n(e) {
                var t, n;
                this.promise = new e((function (e, r) {
                    if (void 0 !== t || void 0 !== n) throw TypeError("Bad Promise constructor");
                    t = e, n = r
                })), this.resolve = M(t), this.reject = M(n)
            }

            function r(e) {
                var t = e.length;
                return 3 === t ? (60 * (60 * Number(e[0]) + Number(e[1])) * 1e3 + 1e3 * Number(e[2])) / 1e3 : 2 === t ? (60 * Number(e[0]) * 1e3 + 1e3 * Number(e[1])) / 1e3 : Number(e[0])
            }

            function i(e) {
                return /^(\-|\+)?\d+(\.\d+)?$/.test(e)
            }

            function a(e) {
                return e
            }

            function o(e, t) {
                return e >= 0 && e < t.length ? t[e] : ""
            }

            function l(e, t) {
                if (!e) return !1;
                if (e.classList) return Array.prototype.some.call(e.classList, (function (e) {
                    return e === t
                }));
                var n = e.className && "object" === Gt(e.className) ? e.getAttribute("class") : e.className;
                return n && !!n.match(new RegExp("(\\s|^)" + t + "(\\s|$)"))
            }

            function s(e, t) {
                e && (e.classList ? t.replace(/(^\s+|\s+$)/g, "").split(/\s+/g).forEach((function (t) {
                    t && e.classList.add(t)
                })) : l(e, t) || (e.className && "object" === Gt(e.className) ? e.setAttribute("class", e.getAttribute("class") + " " + t) : e.className += " " + t))
            }

            function c(e, t) {
                e && (e.classList ? t.split(/\s+/g).forEach((function (t) {
                    e.classList.remove(t)
                })) : l(e, t) && t.split(/\s+/g).forEach((function (t) {
                    var n = new RegExp("(\\s|^)" + t + "(\\s|$)");
                    e.className && "object" === Gt(e.className) ? e.setAttribute("class", e.getAttribute("class").replace(n, " ")) : e.className = e.className.replace(n, " ")
                })))
            }

            function u(e, t, n) {
                var r = t.length;
                if (r < 1) return -1;
                if (t[n = n < 0 ? 0 : n >= r ? r - 1 : n].start <= e && e < t[n].end) return n;
                for (var i = t[n].end <= e ? n + 1 : 0; i < r; i++) {
                    if (t[i].start <= e && e < t[i].end) return i;
                    if (e > t[i].end && i + 1 < r && e < t[i + 1].start) return -1;
                    if (e > t[i].end && i + 1 >= r) return -1
                }
                return -1
            }

            function p(e, t, n) {
                var r = t.length;
                if (r < 1) return [];
                var i = [];
                if ((n = n < 0 ? 0 : n >= r ? r - 1 : n) < r) for (var a = t[n].end <= e ? n : 0; a < r && (t[a].start <= e && e < t[a].end && i.push(a), !(e < t[a].start)); a++) ;
                return i
            }

            function d(e) {
                return Object.prototype.toString.call(e).match(/([^\s.*]+)(?=]$)/g)[0]
            }

            function f() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "div",
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                    n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "",
                    i = document.createElement(e);
                return i.className = r, i.innerHTML = t, _r(n).forEach((function (t) {
                    var r = t, a = n[t];
                    "video" === e || "audio" === e || "live-video" === e ? a && i.setAttribute(r, a) : i.setAttribute(r, a)
                })), i
            }

            function g() {
                var e = navigator.userAgent, t = /(?:Windows Phone)/.test(e), n = /(?:SymbianOS)/.test(e) || t,
                    r = /(?:Android)/.test(e), i = /(?:Firefox)/.test(e),
                    a = /(?:iPad|PlayBook)/.test(e) || r && !/(?:Mobile)/.test(e) || i && /(?:Tablet)/.test(e);
                return /(?:iPhone)/.test(e) && !a || r || n || a
            }

            function h(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", n = "";
                e.map((function (e) {
                    n += " " + t + " " + e.key + " {" + e.style + "}"
                }));
                var r = document.createElement("style"), i = document.head || document.getElementsByTagName("head")[0];
                if (r.type = "text/css", r.id = "ssss", r.styleSheet) {
                    var a = function () {
                        try {
                            r.styleSheet.cssText = n
                        } catch (e) {
                        }
                    };
                    r.styleSheet.disabled ? setTimeout(a, 10) : a()
                } else {
                    var o = document.createTextNode(n);
                    r.appendChild(o)
                }
                i.appendChild(r)
            }

            function y(e, t) {
                Mr || (Mr = new Dr), Mr.addObserver(e, t)
            }

            function m(e, t) {
                Mr && Mr.unObserver(e, t)
            }

            function v(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    n = {code: zr[e].code, msg: zr[e].msg};
                return _r(t).map((function (e) {
                    n[e] = t[e]
                })), n
            }

            function x(e, t, n, r, i) {
                i ? n(v(2, i), {format: r.format}) : r.format ? (e.list = r.list, e.format = r.format, e.styles = r.styles, t(e)) : n(v(3))
            }

            function b(e) {
                return new kr((function (t, n) {
                    if (e.list) t(e); else {
                        if (e.json) {
                            var r = jr.parseJson(e.json);
                            return e.list = r, e.format = "json", void t(e)
                        }
                        if (e.stringContent && !e.url) jr.parse(e.stringContent, (function (r, i) {
                            x(e, t, n, r, i)
                        })); else if (e.url) new Er({url: e.url, type: "text"}).then((function (r) {
                            jr.parse(r.res.response, (function (r, i) {
                                x(e, t, n, r, i)
                            }))
                        })).catch((function (t) {
                            var r = v(1, {
                                statusText: t.statusText,
                                status: t.status,
                                type: t.type,
                                message: "http load error",
                                url: e.url
                            });
                            n(r)
                        })); else {
                            var i = v(8);
                            n(i)
                        }
                    }
                }))
            }

            function k(e, t) {
                return !!(e.id && e.id === t.id || e.language && e.language === t.language)
            }

            var w = function (e) {
                if (null == e) throw TypeError("Can't call method on  " + e);
                return e
            }, _ = function (e) {
                return Object(w(e))
            }, T = {}.hasOwnProperty, E = function (e, t) {
                return T.call(e, t)
            }, C = t((function (e) {
                var t = e.exports = {version: "2.6.12"};
                "number" == typeof __e && (__e = t)
            })), L = (C.version, t((function (e) {
                var t = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
                "number" == typeof __g && (__g = t)
            }))), O = t((function (e) {
                var t = L["__core-js_shared__"] || (L["__core-js_shared__"] = {});
                (e.exports = function (e, n) {
                    return t[e] || (t[e] = void 0 !== n ? n : {})
                })("versions", []).push({
                    version: C.version,
                    mode: "pure",
                    copyright: "© 2020 Denis Pushkarev (zloirock.ru)"
                })
            })), S = 0, P = Math.random(), A = function (e) {
                return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++S + P).toString(36))
            }, R = O("keys"), N = function (e) {
                return R[e] || (R[e] = A(e))
            }, I = N("IE_PROTO"), j = Object.prototype, D = Object.getPrototypeOf || function (e) {
                return e = _(e), E(e, I) ? e[I] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? j : null
            }, M = function (e) {
                if ("function" != typeof e) throw TypeError(e + " is not a function!");
                return e
            }, z = function (e, t, n) {
                if (M(e), void 0 === t) return e;
                switch (n) {
                    case 1:
                        return function (n) {
                            return e.call(t, n)
                        };
                    case 2:
                        return function (n, r) {
                            return e.call(t, n, r)
                        };
                    case 3:
                        return function (n, r, i) {
                            return e.call(t, n, r, i)
                        }
                }
                return function () {
                    return e.apply(t, arguments)
                }
            }, V = function (e) {
                return "object" == typeof e ? null !== e : "function" == typeof e
            }, F = function (e) {
                if (!V(e)) throw TypeError(e + " is not an object!");
                return e
            }, U = function (e) {
                try {
                    return !!e()
                } catch (t) {
                    return !0
                }
            }, B = !U((function () {
                return 7 != Object.defineProperty({}, "a", {
                    get: function () {
                        return 7
                    }
                }).a
            })), H = L.document, W = V(H) && V(H.createElement), q = function (e) {
                return W ? H.createElement(e) : {}
            }, $ = !B && !U((function () {
                return 7 != Object.defineProperty(q("div"), "a", {
                    get: function () {
                        return 7
                    }
                }).a
            })), Y = function (e, t) {
                if (!V(e)) return e;
                var n, r;
                if (t && "function" == typeof (n = e.toString) && !V(r = n.call(e))) return r;
                if ("function" == typeof (n = e.valueOf) && !V(r = n.call(e))) return r;
                if (!t && "function" == typeof (n = e.toString) && !V(r = n.call(e))) return r;
                throw TypeError("Can't convert object to primitive value")
            }, K = Object.defineProperty, G = {
                f: B ? Object.defineProperty : function (e, t, n) {
                    if (F(e), t = Y(t, !0), F(n), $) try {
                        return K(e, t, n)
                    } catch (r) {
                    }
                    if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
                    return "value" in n && (e[t] = n.value), e
                }
            }, X = function (e, t) {
                return {enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: t}
            }, J = B ? function (e, t, n) {
                return G.f(e, t, X(1, n))
            } : function (e, t, n) {
                return e[t] = n, e
            }, Z = function (e, t, n) {
                var r, i, a, o = e & Z.F, l = e & Z.G, s = e & Z.S, c = e & Z.P, u = e & Z.B, p = e & Z.W,
                    d = l ? C : C[t] || (C[t] = {}), f = d.prototype, g = l ? L : s ? L[t] : (L[t] || {}).prototype;
                for (r in l && (n = t), n) (i = !o && g && void 0 !== g[r]) && E(d, r) || (a = i ? g[r] : n[r], d[r] = l && "function" != typeof g[r] ? n[r] : u && i ? z(a, L) : p && g[r] == a ? function (e) {
                    var t = function (t, n, r) {
                        if (this instanceof e) {
                            switch (arguments.length) {
                                case 0:
                                    return new e;
                                case 1:
                                    return new e(t);
                                case 2:
                                    return new e(t, n)
                            }
                            return new e(t, n, r)
                        }
                        return e.apply(this, arguments)
                    };
                    return t.prototype = e.prototype, t
                }(a) : c && "function" == typeof a ? z(Function.call, a) : a, c && ((d.virtual || (d.virtual = {}))[r] = a, e & Z.R && f && !f[r] && J(f, r, a)))
            };
            Z.F = 1, Z.G = 2, Z.S = 4, Z.P = 8, Z.B = 16, Z.W = 32, Z.U = 64, Z.R = 128;
            var Q = Z, ee = function (e, t) {
                var n = (C.Object || {})[e] || Object[e], r = {};
                r[e] = t(n), Q(Q.S + Q.F * U((function () {
                    n(1)
                })), "Object", r)
            };
            ee("getPrototypeOf", (function () {
                return function (e) {
                    return D(_(e))
                }
            }));
            var te, ne = C.Object.getPrototypeOf, re = e(t((function (e) {
                    e.exports = {default: ne, __esModule: !0}
                }))), ie = e(t((function (e, t) {
                    t.__esModule = !0, t.default = function (e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                }))), ae = Math.ceil, oe = Math.floor, le = function (e) {
                    return isNaN(e = +e) ? 0 : (e > 0 ? oe : ae)(e)
                }, se = J, ce = {}, ue = {}.toString, pe = function (e) {
                    return ue.call(e).slice(8, -1)
                }, de = Object("z").propertyIsEnumerable(0) ? Object : function (e) {
                    return "String" == pe(e) ? e.split("") : Object(e)
                }, fe = function (e) {
                    return de(w(e))
                }, ge = Math.min, he = function (e) {
                    return e > 0 ? ge(le(e), 9007199254740991) : 0
                }, ye = Math.max, me = Math.min, ve = function (e, t) {
                    return (e = le(e)) < 0 ? ye(e + t, 0) : me(e, t)
                }, xe = (te = !1, function (e, t, n) {
                    var r, i = fe(e), a = he(i.length), o = ve(n, a);
                    if (te && t != t) {
                        for (; a > o;) if ((r = i[o++]) != r) return !0
                    } else for (; a > o; o++) if ((te || o in i) && i[o] === t) return te || o || 0;
                    return !te && -1
                }), be = N("IE_PROTO"), ke = function (e, t) {
                    var n, r = fe(e), i = 0, a = [];
                    for (n in r) n != be && E(r, n) && a.push(n);
                    for (; t.length > i;) E(r, n = t[i++]) && (~xe(a, n) || a.push(n));
                    return a
                },
                we = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(","),
                _e = Object.keys || function (e) {
                    return ke(e, we)
                }, Te = B ? Object.defineProperties : function (e, t) {
                    F(e);
                    for (var n, r = _e(t), i = r.length, a = 0; i > a;) G.f(e, n = r[a++], t[n]);
                    return e
                }, Ee = L.document, Ce = Ee && Ee.documentElement, Le = N("IE_PROTO"), Oe = function () {
                }, Se = function () {
                    var e, t = q("iframe"), n = we.length;
                    for (t.style.display = "none", Ce.appendChild(t), t.src = "javascript:", (e = t.contentWindow.document).open(), e.write("<script>document.F=Object<\/script>"), e.close(), Se = e.F; n--;) delete Se.prototype[we[n]];
                    return Se()
                }, Pe = Object.create || function (e, t) {
                    var n;
                    return null !== e ? (Oe.prototype = F(e), n = new Oe, Oe.prototype = null, n[Le] = e) : n = Se(), void 0 === t ? n : Te(n, t)
                }, Ae = t((function (e) {
                    var t = O("wks"), n = L.Symbol, r = "function" == typeof n;
                    (e.exports = function (e) {
                        return t[e] || (t[e] = r && n[e] || (r ? n : A)("Symbol." + e))
                    }).store = t
                })), Re = G.f, Ne = Ae("toStringTag"), Ie = function (e, t, n) {
                    e && !E(e = n ? e : e.prototype, Ne) && Re(e, Ne, {configurable: !0, value: t})
                }, je = {};
            J(je, Ae("iterator"), (function () {
                return this
            }));
            var De = function (e, t, n) {
                e.prototype = Pe(je, {next: X(1, n)}), Ie(e, t + " Iterator")
            }, Me = Ae("iterator"), ze = !([].keys && "next" in [].keys()), Ve = function () {
                return this
            }, Fe = function (e, t, n, r, i, a, o) {
                De(n, t, r);
                var l, s, c, u = function (e) {
                        if (!ze && e in g) return g[e];
                        switch (e) {
                            case"keys":
                            case"values":
                                return function () {
                                    return new n(this, e)
                                }
                        }
                        return function () {
                            return new n(this, e)
                        }
                    }, p = t + " Iterator", d = "values" == i, f = !1, g = e.prototype,
                    h = g[Me] || g["@@iterator"] || i && g[i], y = h || u(i), m = i ? d ? u("entries") : y : void 0,
                    v = "Array" == t && g.entries || h;
                if (v && (c = D(v.call(new e))) !== Object.prototype && c.next && Ie(c, p, !0), d && h && "values" !== h.name && (f = !0, y = function () {
                    return h.call(this)
                }), o && (ze || f || !g[Me]) && J(g, Me, y), ce[t] = y, ce[p] = Ve, i) if (l = {
                    values: d ? y : u("values"),
                    keys: a ? y : u("keys"),
                    entries: m
                }, o) for (s in l) s in g || se(g, s, l[s]); else Q(Q.P + Q.F * (ze || f), t, l);
                return l
            }, Ue = function (e) {
                return function (t, n) {
                    var r, i, a = String(w(t)), o = le(n), l = a.length;
                    return o < 0 || o >= l ? e ? "" : void 0 : (r = a.charCodeAt(o)) < 55296 || r > 56319 || o + 1 === l || (i = a.charCodeAt(o + 1)) < 56320 || i > 57343 ? e ? a.charAt(o) : r : e ? a.slice(o, o + 2) : i - 56320 + (r - 55296 << 10) + 65536
                }
            }(!0);
            Fe(String, "String", (function (e) {
                this._t = String(e), this._i = 0
            }), (function () {
                var e, t = this._t, n = this._i;
                return n >= t.length ? {value: void 0, done: !0} : (e = Ue(t, n), this._i += e.length, {
                    value: e,
                    done: !1
                })
            }));
            var Be = function (e, t) {
                return {value: t, done: !!e}
            };
            Fe(Array, "Array", (function (e, t) {
                this._t = fe(e), this._i = 0, this._k = t
            }), (function () {
                var e = this._t, t = this._k, n = this._i++;
                return !e || n >= e.length ? (this._t = void 0, Be(1)) : Be(0, "keys" == t ? n : "values" == t ? e[n] : [n, e[n]])
            }), "values"), ce.Arguments = ce.Array;
            for (var He = Ae("toStringTag"), We = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), qe = 0; qe < We.length; qe++) {
                var $e = We[qe], Ye = L[$e], Ke = Ye && Ye.prototype;
                Ke && !Ke[He] && J(Ke, He, $e), ce[$e] = ce.Array
            }
            var Ge = {f: Ae}, Xe = Ge.f("iterator"), Je = t((function (e) {
                e.exports = {default: Xe, __esModule: !0}
            }));
            e(Je);
            var Ze = t((function (e) {
                    var t = A("meta"), n = G.f, r = 0, i = Object.isExtensible || function () {
                        return !0
                    }, a = !U((function () {
                        return i(Object.preventExtensions({}))
                    })), o = function (e) {
                        n(e, t, {value: {i: "O" + ++r, w: {}}})
                    }, l = function (e, n) {
                        if (!V(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
                        if (!E(e, t)) {
                            if (!i(e)) return "F";
                            if (!n) return "E";
                            o(e)
                        }
                        return e[t].i
                    }, s = function (e, n) {
                        if (!E(e, t)) {
                            if (!i(e)) return !0;
                            if (!n) return !1;
                            o(e)
                        }
                        return e[t].w
                    }, c = function (e) {
                        return a && u.NEED && i(e) && !E(e, t) && o(e), e
                    }, u = e.exports = {KEY: t, NEED: !1, fastKey: l, getWeak: s, onFreeze: c}
                })), Qe = (Ze.KEY, Ze.NEED, Ze.fastKey, Ze.getWeak, Ze.onFreeze, G.f), et = function (e) {
                    var t = C.Symbol || (C.Symbol = {});
                    "_" == e.charAt(0) || e in t || Qe(t, e, {value: Ge.f(e)})
                }, tt = {f: Object.getOwnPropertySymbols}, nt = {f: {}.propertyIsEnumerable}, rt = function (e) {
                    var t = _e(e), n = tt.f;
                    if (n) for (var r, i = n(e), a = nt.f, o = 0; i.length > o;) a.call(e, r = i[o++]) && t.push(r);
                    return t
                }, it = Array.isArray || function (e) {
                    return "Array" == pe(e)
                }, at = we.concat("length", "prototype"), ot = {
                    f: Object.getOwnPropertyNames || function (e) {
                        return ke(e, at)
                    }
                }, lt = ot.f, st = {}.toString,
                ct = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
                ut = function (e) {
                    try {
                        return lt(e)
                    } catch (t) {
                        return ct.slice()
                    }
                }, pt = {
                    f: function (e) {
                        return ct && "[object Window]" == st.call(e) ? ut(e) : lt(fe(e))
                    }
                }, dt = Object.getOwnPropertyDescriptor, ft = {
                    f: B ? dt : function (e, t) {
                        if (e = fe(e), t = Y(t, !0), $) try {
                            return dt(e, t)
                        } catch (n) {
                        }
                        if (E(e, t)) return X(!nt.f.call(e, t), e[t])
                    }
                }, gt = Ze.KEY, ht = ft.f, yt = G.f, mt = pt.f, vt = L.Symbol, xt = L.JSON, bt = xt && xt.stringify,
                kt = Ae("_hidden"), wt = Ae("toPrimitive"), _t = {}.propertyIsEnumerable, Tt = O("symbol-registry"),
                Et = O("symbols"), Ct = O("op-symbols"), Lt = Object.prototype, Ot = "function" == typeof vt && !!tt.f,
                St = L.QObject, Pt = !St || !St.prototype || !St.prototype.findChild, At = B && U((function () {
                    return 7 != Pe(yt({}, "a", {
                        get: function () {
                            return yt(this, "a", {value: 7}).a
                        }
                    })).a
                })) ? function (e, t, n) {
                    var r = ht(Lt, t);
                    r && delete Lt[t], yt(e, t, n), r && e !== Lt && yt(Lt, t, r)
                } : yt, Rt = function (e) {
                    var t = Et[e] = Pe(vt.prototype);
                    return t._k = e, t
                }, Nt = Ot && "symbol" == typeof vt.iterator ? function (e) {
                    return "symbol" == typeof e
                } : function (e) {
                    return e instanceof vt
                }, It = function (e, t, n) {
                    return e === Lt && It(Ct, t, n), F(e), t = Y(t, !0), F(n), E(Et, t) ? (n.enumerable ? (E(e, kt) && e[kt][t] && (e[kt][t] = !1), n = Pe(n, {enumerable: X(0, !1)})) : (E(e, kt) || yt(e, kt, X(1, {})), e[kt][t] = !0), At(e, t, n)) : yt(e, t, n)
                }, jt = function (e, t) {
                    F(e);
                    for (var n, r = rt(t = fe(t)), i = 0, a = r.length; a > i;) It(e, n = r[i++], t[n]);
                    return e
                }, Dt = function (e, t) {
                    return void 0 === t ? Pe(e) : jt(Pe(e), t)
                }, Mt = function (e) {
                    var t = _t.call(this, e = Y(e, !0));
                    return !(this === Lt && E(Et, e) && !E(Ct, e)) && (!(t || !E(this, e) || !E(Et, e) || E(this, kt) && this[kt][e]) || t)
                }, zt = function (e, t) {
                    if (e = fe(e), t = Y(t, !0), e !== Lt || !E(Et, t) || E(Ct, t)) {
                        var n = ht(e, t);
                        return !n || !E(Et, t) || E(e, kt) && e[kt][t] || (n.enumerable = !0), n
                    }
                }, Vt = function (e) {
                    for (var t, n = mt(fe(e)), r = [], i = 0; n.length > i;) E(Et, t = n[i++]) || t == kt || t == gt || r.push(t);
                    return r
                }, Ft = function (e) {
                    for (var t, n = e === Lt, r = mt(n ? Ct : fe(e)), i = [], a = 0; r.length > a;) !E(Et, t = r[a++]) || n && !E(Lt, t) || i.push(Et[t]);
                    return i
                };
            Ot || (se((vt = function () {
                if (this instanceof vt) throw TypeError("Symbol is not a constructor!");
                var e = A(arguments.length > 0 ? arguments[0] : void 0), t = function (n) {
                    this === Lt && t.call(Ct, n), E(this, kt) && E(this[kt], e) && (this[kt][e] = !1), At(this, e, X(1, n))
                };
                return B && Pt && At(Lt, e, {configurable: !0, set: t}), Rt(e)
            }).prototype, "toString", (function () {
                return this._k
            })), ft.f = zt, G.f = It, ot.f = pt.f = Vt, nt.f = Mt, tt.f = Ft, Ge.f = function (e) {
                return Rt(Ae(e))
            }), Q(Q.G + Q.W + Q.F * !Ot, {Symbol: vt});
            for (var Ut = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), Bt = 0; Ut.length > Bt;) Ae(Ut[Bt++]);
            for (var Ht = _e(Ae.store), Wt = 0; Ht.length > Wt;) et(Ht[Wt++]);
            Q(Q.S + Q.F * !Ot, "Symbol", {
                for: function (e) {
                    return E(Tt, e += "") ? Tt[e] : Tt[e] = vt(e)
                }, keyFor: function (e) {
                    if (!Nt(e)) throw TypeError(e + " is not a symbol!");
                    for (var t in Tt) if (Tt[t] === e) return t
                }, useSetter: function () {
                    Pt = !0
                }, useSimple: function () {
                    Pt = !1
                }
            }), Q(Q.S + Q.F * !Ot, "Object", {
                create: Dt,
                defineProperty: It,
                defineProperties: jt,
                getOwnPropertyDescriptor: zt,
                getOwnPropertyNames: Vt,
                getOwnPropertySymbols: Ft
            });
            var qt = U((function () {
                tt.f(1)
            }));
            Q(Q.S + Q.F * qt, "Object", {
                getOwnPropertySymbols: function (e) {
                    return tt.f(_(e))
                }
            }), xt && Q(Q.S + Q.F * (!Ot || U((function () {
                var e = vt();
                return "[null]" != bt([e]) || "{}" != bt({a: e}) || "{}" != bt(Object(e))
            }))), "JSON", {
                stringify: function (e) {
                    for (var t, n, r = [e], i = 1; arguments.length > i;) r.push(arguments[i++]);
                    if (n = t = r[1], (V(t) || void 0 !== e) && !Nt(e)) return it(t) || (t = function (e, t) {
                        if ("function" == typeof n && (t = n.call(this, e, t)), !Nt(t)) return t
                    }), r[1] = t, bt.apply(xt, r)
                }
            }), vt.prototype[wt] || J(vt.prototype, wt, vt.prototype.valueOf), Ie(vt, "Symbol"), Ie(Math, "Math", !0), Ie(L.JSON, "JSON", !0), et("asyncIterator"), et("observable");
            var $t = C.Symbol, Yt = t((function (e) {
                e.exports = {default: $t, __esModule: !0}
            }));
            e(Yt);
            var Kt = t((function (e, t) {
                function n(e) {
                    return e && e.__esModule ? e : {default: e}
                }

                t.__esModule = !0;
                var r = n(Je), i = n(Yt),
                    a = "function" == typeof i.default && "symbol" == typeof r.default ? function (e) {
                        return typeof e
                    } : function (e) {
                        return e && "function" == typeof i.default && e.constructor === i.default && e !== i.default.prototype ? "symbol" : typeof e
                    };
                t.default = "function" == typeof i.default && "symbol" === a(r.default) ? function (e) {
                    return void 0 === e ? "undefined" : a(e)
                } : function (e) {
                    return e && "function" == typeof i.default && e.constructor === i.default && e !== i.default.prototype ? "symbol" : void 0 === e ? "undefined" : a(e)
                }
            })), Gt = e(Kt), Xt = e(t((function (e, t) {
                t.__esModule = !0;
                var n, r = (n = Kt) && n.__esModule ? n : {default: n};
                t.default = function (e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" !== (void 0 === t ? "undefined" : (0, r.default)(t)) && "function" != typeof t ? e : t
                }
            })));
            Q(Q.S + Q.F * !B, "Object", {defineProperty: G.f});
            var Jt = C.Object, Zt = function (e, t, n) {
                return Jt.defineProperty(e, t, n)
            }, Qt = t((function (e) {
                e.exports = {default: Zt, __esModule: !0}
            }));
            e(Qt);
            var en = e(t((function (e, t) {
                t.__esModule = !0;
                var n, r = (n = Qt) && n.__esModule ? n : {default: n};
                t.default = function () {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var i = t[n];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), (0, r.default)(e, i.key, i)
                        }
                    }

                    return function (t, n, r) {
                        return n && e(t.prototype, n), r && e(t, r), t
                    }
                }()
            }))), tn = function (e, t) {
                if (F(e), !V(t) && null !== t) throw TypeError(t + ": can't set as prototype!")
            }, nn = {
                set: Object.setPrototypeOf || ("__proto__" in {} ? function (e, t, n) {
                    try {
                        (n = z(Function.call, ft.f(Object.prototype, "__proto__").set, 2))(e, []), t = !(e instanceof Array)
                    } catch (r) {
                        t = !0
                    }
                    return function (e, r) {
                        return tn(e, r), t ? e.__proto__ = r : n(e, r), e
                    }
                }({}, !1) : void 0), check: tn
            };
            Q(Q.S, "Object", {setPrototypeOf: nn.set});
            var rn = C.Object.setPrototypeOf, an = t((function (e) {
                e.exports = {default: rn, __esModule: !0}
            }));
            e(an), Q(Q.S, "Object", {create: Pe});
            var on = C.Object, ln = function (e, t) {
                return on.create(e, t)
            }, sn = t((function (e) {
                e.exports = {default: ln, __esModule: !0}
            }));
            e(sn);
            var cn, un, pn, dn = e(t((function (e, t) {
                    function n(e) {
                        return e && e.__esModule ? e : {default: e}
                    }

                    t.__esModule = !0;
                    var r = n(an), i = n(sn), a = n(Kt);
                    t.default = function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === t ? "undefined" : (0, a.default)(t)));
                        e.prototype = (0, i.default)(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (r.default ? (0, r.default)(e, t) : e.__proto__ = t)
                    }
                }))), fn = Ae("toStringTag"), gn = "Arguments" == pe(function () {
                    return arguments
                }()), hn = function (e, t) {
                    try {
                        return e[t]
                    } catch (n) {
                    }
                }, yn = function (e) {
                    var t, n, r;
                    return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof (n = hn(t = Object(e), fn)) ? n : gn ? pe(t) : "Object" == (r = pe(t)) && "function" == typeof t.callee ? "Arguments" : r
                }, mn = function (e, t, n, r) {
                    if (!(e instanceof t) || void 0 !== r && r in e) throw TypeError(n + ": incorrect invocation!");
                    return e
                }, vn = function (e, t, n, r) {
                    try {
                        return r ? t(F(n)[0], n[1]) : t(n)
                    } catch (a) {
                        var i = e.return;
                        throw void 0 !== i && F(i.call(e)), a
                    }
                }, xn = Ae("iterator"), bn = Array.prototype, kn = function (e) {
                    return void 0 !== e && (ce.Array === e || bn[xn] === e)
                }, wn = Ae("iterator"), _n = C.getIteratorMethod = function (e) {
                    if (null != e) return e[wn] || e["@@iterator"] || ce[yn(e)]
                }, Tn = t((function (e) {
                    var t = {}, n = {}, r = e.exports = function (e, r, i, a, o) {
                        var l, s, c, u, p = o ? function () {
                            return e
                        } : _n(e), d = z(i, a, r ? 2 : 1), f = 0;
                        if ("function" != typeof p) throw TypeError(e + " is not iterable!");
                        if (kn(p)) {
                            for (l = he(e.length); l > f; f++) if ((u = r ? d(F(s = e[f])[0], s[1]) : d(e[f])) === t || u === n) return u
                        } else for (c = p.call(e); !(s = c.next()).done;) if ((u = vn(c, d, s.value, r)) === t || u === n) return u
                    };
                    r.BREAK = t, r.RETURN = n
                })), En = Ae("species"), Cn = function (e, t) {
                    var n, r = F(e).constructor;
                    return void 0 === r || null == (n = F(r)[En]) ? t : M(n)
                }, Ln = function (e, t, n) {
                    var r = void 0 === n;
                    switch (t.length) {
                        case 0:
                            return r ? e() : e.call(n);
                        case 1:
                            return r ? e(t[0]) : e.call(n, t[0]);
                        case 2:
                            return r ? e(t[0], t[1]) : e.call(n, t[0], t[1]);
                        case 3:
                            return r ? e(t[0], t[1], t[2]) : e.call(n, t[0], t[1], t[2]);
                        case 4:
                            return r ? e(t[0], t[1], t[2], t[3]) : e.call(n, t[0], t[1], t[2], t[3])
                    }
                    return e.apply(n, t)
                }, On = L.process, Sn = L.setImmediate, Pn = L.clearImmediate, An = L.MessageChannel, Rn = L.Dispatch,
                Nn = 0, In = {}, jn = function () {
                    var e = +this;
                    if (In.hasOwnProperty(e)) {
                        var t = In[e];
                        delete In[e], t()
                    }
                }, Dn = function (e) {
                    jn.call(e.data)
                };
            Sn && Pn || (Sn = function (e) {
                for (var t = [], n = 1; arguments.length > n;) t.push(arguments[n++]);
                return In[++Nn] = function () {
                    Ln("function" == typeof e ? e : Function(e), t)
                }, cn(Nn), Nn
            }, Pn = function (e) {
                delete In[e]
            }, "process" == pe(On) ? cn = function (e) {
                On.nextTick(z(jn, e, 1))
            } : Rn && Rn.now ? cn = function (e) {
                Rn.now(z(jn, e, 1))
            } : An ? (pn = (un = new An).port2, un.port1.onmessage = Dn, cn = z(pn.postMessage, pn, 1)) : L.addEventListener && "function" == typeof postMessage && !L.importScripts ? (cn = function (e) {
                L.postMessage(e + "", "*")
            }, L.addEventListener("message", Dn, !1)) : cn = "onreadystatechange" in q("script") ? function (e) {
                Ce.appendChild(q("script")).onreadystatechange = function () {
                    Ce.removeChild(this), jn.call(e)
                }
            } : function (e) {
                setTimeout(z(jn, e, 1), 0)
            });
            var Mn = {set: Sn, clear: Pn}, zn = Mn.set, Vn = L.MutationObserver || L.WebKitMutationObserver,
                Fn = L.process, Un = L.Promise, Bn = "process" == pe(Fn), Hn = {
                    f: function (e) {
                        return new n(e)
                    }
                }, Wn = function (e) {
                    try {
                        return {e: !1, v: e()}
                    } catch (t) {
                        return {e: !0, v: t}
                    }
                }, qn = L.navigator, $n = qn && qn.userAgent || "", Yn = function (e, t) {
                    if (F(e), V(t) && t.constructor === e) return t;
                    var n = Hn.f(e);
                    return (0, n.resolve)(t), n.promise
                }, Kn = Ae("species"), Gn = Ae("iterator"), Xn = !1;
            try {
                var Jn = [7][Gn]();
                Jn.return = function () {
                    Xn = !0
                }, Array.from(Jn, (function () {
                    throw 2
                }))
            } catch (te) {
            }
            var Zn, Qn, er, tr, nr = Mn.set, rr = function () {
                    var e, t, n, r = function () {
                        var r, i;
                        for (Bn && (r = Fn.domain) && r.exit(); e;) {
                            i = e.fn, e = e.next;
                            try {
                                i()
                            } catch (a) {
                                throw e ? n() : t = void 0, a
                            }
                        }
                        t = void 0, r && r.enter()
                    };
                    if (Bn) n = function () {
                        Fn.nextTick(r)
                    }; else if (!Vn || L.navigator && L.navigator.standalone) if (Un && Un.resolve) {
                        var i = Un.resolve(void 0);
                        n = function () {
                            i.then(r)
                        }
                    } else n = function () {
                        zn.call(L, r)
                    }; else {
                        var a = !0, o = document.createTextNode("");
                        new Vn(r).observe(o, {characterData: !0}), n = function () {
                            o.data = a = !a
                        }
                    }
                    return function (r) {
                        var i = {fn: r, next: void 0};
                        t && (t.next = i), e || (e = i, n()), t = i
                    }
                }(), ir = L.TypeError, ar = L.process, or = ar && ar.versions, lr = or && or.v8 || "", sr = L.Promise,
                cr = "process" == yn(ar), ur = function () {
                }, pr = Qn = Hn.f, dr = !!function () {
                    try {
                        var e = sr.resolve(1), t = (e.constructor = {})[Ae("species")] = function (e) {
                            e(ur, ur)
                        };
                        return (cr || "function" == typeof PromiseRejectionEvent) && e.then(ur) instanceof t && 0 !== lr.indexOf("6.6") && -1 === $n.indexOf("Chrome/66")
                    } catch (n) {
                    }
                }(), fr = function (e) {
                    var t;
                    return !(!V(e) || "function" != typeof (t = e.then)) && t
                }, gr = function (e, t) {
                    if (!e._n) {
                        e._n = !0;
                        var n = e._c;
                        rr((function () {
                            for (var r = e._v, i = 1 == e._s, a = 0; n.length > a;) !function (t) {
                                var n, a, o, l = i ? t.ok : t.fail, s = t.resolve, c = t.reject, u = t.domain;
                                try {
                                    l ? (i || (2 == e._h && mr(e), e._h = 1), !0 === l ? n = r : (u && u.enter(), n = l(r), u && (u.exit(), o = !0)), n === t.promise ? c(ir("Promise-chain cycle")) : (a = fr(n)) ? a.call(n, s, c) : s(n)) : c(r)
                                } catch (p) {
                                    u && !o && u.exit(), c(p)
                                }
                            }(n[a++]);
                            e._c = [], e._n = !1, t && !e._h && hr(e)
                        }))
                    }
                }, hr = function (e) {
                    nr.call(L, (function () {
                        var t, n, r, i = e._v, a = yr(e);
                        if (a && (t = Wn((function () {
                            cr ? ar.emit("unhandledRejection", i, e) : (n = L.onunhandledrejection) ? n({
                                promise: e,
                                reason: i
                            }) : (r = L.console) && r.error && r.error("Unhandled promise rejection", i)
                        })), e._h = cr || yr(e) ? 2 : 1), e._a = void 0, a && t.e) throw t.v
                    }))
                }, yr = function (e) {
                    return 1 !== e._h && 0 === (e._a || e._c).length
                }, mr = function (e) {
                    nr.call(L, (function () {
                        var t;
                        cr ? ar.emit("rejectionHandled", e) : (t = L.onrejectionhandled) && t({promise: e, reason: e._v})
                    }))
                }, vr = function (e) {
                    var t = this;
                    t._d || (t._d = !0, (t = t._w || t)._v = e, t._s = 2, t._a || (t._a = t._c.slice()), gr(t, !0))
                }, xr = function (e) {
                    var t, n = this;
                    if (!n._d) {
                        n._d = !0, n = n._w || n;
                        try {
                            if (n === e) throw ir("Promise can't be resolved itself");
                            (t = fr(e)) ? rr((function () {
                                var r = {_w: n, _d: !1};
                                try {
                                    t.call(e, z(xr, r, 1), z(vr, r, 1))
                                } catch (i) {
                                    vr.call(r, i)
                                }
                            })) : (n._v = e, n._s = 1, gr(n, !1))
                        } catch (r) {
                            vr.call({_w: n, _d: !1}, r)
                        }
                    }
                };
            dr || (sr = function (e) {
                mn(this, sr, "Promise", "_h"), M(e), Zn.call(this);
                try {
                    e(z(xr, this, 1), z(vr, this, 1))
                } catch (t) {
                    vr.call(this, t)
                }
            }, (Zn = function (e) {
                this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1
            }).prototype = function (e, t, n) {
                for (var r in t) n && e[r] ? e[r] = t[r] : J(e, r, t[r]);
                return e
            }(sr.prototype, {
                then: function (e, t) {
                    var n = pr(Cn(this, sr));
                    return n.ok = "function" != typeof e || e, n.fail = "function" == typeof t && t, n.domain = cr ? ar.domain : void 0, this._c.push(n), this._a && this._a.push(n), this._s && gr(this, !1), n.promise
                }, catch: function (e) {
                    return this.then(void 0, e)
                }
            }), er = function () {
                var e = new Zn;
                this.promise = e, this.resolve = z(xr, e, 1), this.reject = z(vr, e, 1)
            }, Hn.f = pr = function (e) {
                return e === sr || e === tr ? new er(e) : Qn(e)
            }), Q(Q.G + Q.W + Q.F * !dr, {Promise: sr}), Ie(sr, "Promise"), function (e) {
                var t = "function" == typeof C[e] ? C[e] : L[e];
                B && t && !t[Kn] && G.f(t, Kn, {
                    configurable: !0, get: function () {
                        return this
                    }
                })
            }("Promise"), tr = C.Promise, Q(Q.S + Q.F * !dr, "Promise", {
                reject: function (e) {
                    var t = pr(this);
                    return (0, t.reject)(e), t.promise
                }
            }), Q(Q.S + !0 * Q.F, "Promise", {
                resolve: function (e) {
                    return Yn(this === tr ? sr : this, e)
                }
            }), Q(Q.S + Q.F * !(dr && function (e, t) {
                if (!Xn) return !1;
                var n = !1;
                try {
                    var r = [7], i = r[Gn]();
                    i.next = function () {
                        return {done: n = !0}
                    }, r[Gn] = function () {
                        return i
                    }, e(r)
                } catch (a) {
                }
                return n
            }((function (e) {
                sr.all(e).catch(ur)
            }))), "Promise", {
                all: function (e) {
                    var t = this, n = pr(t), r = n.resolve, i = n.reject, a = Wn((function () {
                        var n = [], a = 0, o = 1;
                        Tn(e, !1, (function (e) {
                            var l = a++, s = !1;
                            n.push(void 0), o++, t.resolve(e).then((function (e) {
                                s || (s = !0, n[l] = e, --o || r(n))
                            }), i)
                        })), --o || r(n)
                    }));
                    return a.e && i(a.v), n.promise
                }, race: function (e) {
                    var t = this, n = pr(t), r = n.reject, i = Wn((function () {
                        Tn(e, !1, (function (e) {
                            t.resolve(e).then(n.resolve, r)
                        }))
                    }));
                    return i.e && r(i.v), n.promise
                }
            }), Q(Q.P + Q.R, "Promise", {
                finally: function (e) {
                    var t = Cn(this, C.Promise || L.Promise), n = "function" == typeof e;
                    return this.then(n ? function (n) {
                        return Yn(t, e()).then((function () {
                            return n
                        }))
                    } : e, n ? function (n) {
                        return Yn(t, e()).then((function () {
                            throw n
                        }))
                    } : e)
                }
            }), Q(Q.S, "Promise", {
                try: function (e) {
                    var t = Hn.f(this), n = Wn(e);
                    return (n.e ? t.reject : t.resolve)(n.v), t.promise
                }
            });
            var br = C.Promise, kr = e(t((function (e) {
                e.exports = {default: br, __esModule: !0}
            })));
            ee("keys", (function () {
                return function (e) {
                    return _e(_(e))
                }
            }));
            var wr = C.Object.keys, _r = e(t((function (e) {
                    e.exports = {default: wr, __esModule: !0}
                }))), Tr = t((function (e) {
                    function t() {
                    }

                    function n(e, t, n) {
                        this.fn = e, this.context = t, this.once = n || !1
                    }

                    function r(e, t, r, i, a) {
                        if ("function" != typeof r) throw new TypeError("The listener must be a function");
                        var o = new n(r, i || e, a), s = l ? l + t : t;
                        return e._events[s] ? e._events[s].fn ? e._events[s] = [e._events[s], o] : e._events[s].push(o) : (e._events[s] = o, e._eventsCount++), e
                    }

                    function i(e, n) {
                        0 == --e._eventsCount ? e._events = new t : delete e._events[n]
                    }

                    function a() {
                        this._events = new t, this._eventsCount = 0
                    }

                    var o = Object.prototype.hasOwnProperty, l = "~";
                    Object.create && (t.prototype = Object.create(null), (new t).__proto__ || (l = !1)), a.prototype.eventNames = function () {
                        var e, t, n = [];
                        if (0 === this._eventsCount) return n;
                        for (t in e = this._events) o.call(e, t) && n.push(l ? t.slice(1) : t);
                        return Object.getOwnPropertySymbols ? n.concat(Object.getOwnPropertySymbols(e)) : n
                    }, a.prototype.listeners = function (e) {
                        var t = l ? l + e : e, n = this._events[t];
                        if (!n) return [];
                        if (n.fn) return [n.fn];
                        for (var r = 0, i = n.length, a = new Array(i); r < i; r++) a[r] = n[r].fn;
                        return a
                    }, a.prototype.listenerCount = function (e) {
                        var t = l ? l + e : e, n = this._events[t];
                        return n ? n.fn ? 1 : n.length : 0
                    }, a.prototype.emit = function (e, t, n, r, i, a) {
                        var o = l ? l + e : e;
                        if (!this._events[o]) return !1;
                        var s, c, u = this._events[o], p = arguments.length;
                        if (u.fn) {
                            switch (u.once && this.removeListener(e, u.fn, void 0, !0), p) {
                                case 1:
                                    return u.fn.call(u.context), !0;
                                case 2:
                                    return u.fn.call(u.context, t), !0;
                                case 3:
                                    return u.fn.call(u.context, t, n), !0;
                                case 4:
                                    return u.fn.call(u.context, t, n, r), !0;
                                case 5:
                                    return u.fn.call(u.context, t, n, r, i), !0;
                                case 6:
                                    return u.fn.call(u.context, t, n, r, i, a), !0
                            }
                            for (c = 1, s = new Array(p - 1); c < p; c++) s[c - 1] = arguments[c];
                            u.fn.apply(u.context, s)
                        } else {
                            var d, f = u.length;
                            for (c = 0; c < f; c++) switch (u[c].once && this.removeListener(e, u[c].fn, void 0, !0), p) {
                                case 1:
                                    u[c].fn.call(u[c].context);
                                    break;
                                case 2:
                                    u[c].fn.call(u[c].context, t);
                                    break;
                                case 3:
                                    u[c].fn.call(u[c].context, t, n);
                                    break;
                                case 4:
                                    u[c].fn.call(u[c].context, t, n, r);
                                    break;
                                default:
                                    if (!s) for (d = 1, s = new Array(p - 1); d < p; d++) s[d - 1] = arguments[d];
                                    u[c].fn.apply(u[c].context, s)
                            }
                        }
                        return !0
                    }, a.prototype.on = function (e, t, n) {
                        return r(this, e, t, n, !1)
                    }, a.prototype.once = function (e, t, n) {
                        return r(this, e, t, n, !0)
                    }, a.prototype.removeListener = function (e, t, n, r) {
                        var a = l ? l + e : e;
                        if (!this._events[a]) return this;
                        if (!t) return i(this, a), this;
                        var o = this._events[a];
                        if (o.fn) o.fn !== t || r && !o.once || n && o.context !== n || i(this, a); else {
                            for (var s = 0, c = [], u = o.length; s < u; s++) (o[s].fn !== t || r && !o[s].once || n && o[s].context !== n) && c.push(o[s]);
                            c.length ? this._events[a] = 1 === c.length ? c[0] : c : i(this, a)
                        }
                        return this
                    }, a.prototype.removeAllListeners = function (e) {
                        var n;
                        return e ? (n = l ? l + e : e, this._events[n] && i(this, n)) : (this._events = new t, this._eventsCount = 0), this
                    }, a.prototype.off = a.prototype.removeListener, a.prototype.addListener = a.prototype.on, a.prefixed = l, a.EventEmitter = a, e.exports = a
                })), Er = function e() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = t.url, r = t.method,
                        i = void 0 === r ? "GET" : r, a = t.type, o = void 0 === a ? "arraybuffer" : a, l = t.timeout,
                        s = void 0 === l ? 1e4 : l, c = t.data, u = void 0 === c ? {} : c,
                        p = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return ie(this, e), new kr((function (e, t) {
                        var r = new window.XMLHttpRequest, a = i.toUpperCase(), l = [];
                        for (var c in o && (r.responseType = o), s && (r.timeout = s), u) l.push("k=" + u[c]);
                        if (r.onload = function () {
                            200 === r.status || 206 === r.status ? e({context: p, res: r}) : t(new Error({
                                context: p,
                                res: r,
                                type: "error"
                            }))
                        }, r.onerror = function (e) {
                            t(new Error({context: p, res: r, type: "error"}))
                        }, r.ontimeout = function (e) {
                            t(new Error({context: p, res: r, type: "error"}))
                        }, r.onabort = function () {
                            t(new Error({context: p, res: r, type: "error"}))
                        }, "GET" === a) r.open(a, "" + n), r.send(); else {
                            if ("post" !== a) throw new Error("xhr " + a + " is not supported");
                            r.open(a, n), r.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), r.send(l.join("&"))
                        }
                    }))
                }, Cr = /^WEBVTT/, Lr = /^STYLE+$/, Or = /^\:\:cue/, Sr = /^}+$/, Pr = /^\[Script Info\].*/,
                Ar = [/[0-9]{1,3}:[0-9]{2}:[0-9]{2}\.[0-9]{1,3}-->[0-9]{1,3}:[0-9]{2}:[0-9]{2}\.[0-9]{1,3}/, /[0-9]{1,2}:[0-9]{2}\.[0-9]{1,3}-->[0-9]{1,2}:[0-9]{2}\.[0-9]{1,3}/, /[0-9]{1,2}\.[0-9]{1,3}-->[0-9]{1,2}\.[0-9]{1,3}/],
                Rr = /^Format:\s/, Nr = /^Style:\s/, Ir = /^Dialogue:\s/, jr = function () {
                    function e() {
                        ie(this, e)
                    }

                    return en(e, null, [{
                        key: "parseJson", value: function (e) {
                            for (var t = [], n = 0, r = 0; r < e.length; r++) {
                                if (n >= 50 && (n = 0), 0 === n) {
                                    var i = {start: e[r].start, list: [e[r]], end: e[r].end};
                                    t.push(i)
                                } else t[t.length - 1].list.push(e[r]), t[t.length - 1].end = e[r].end;
                                n++
                            }
                            return t
                        }
                    }, {
                        key: "parse", value: function (t, n) {
                            var r = e.checkFormat(t);
                            r || n({format: r});
                            try {
                                var i = [];
                                "ass" === r ? i = e.parseASS(t) : "vtt" === r && (i = e.parseVTT(t)), n({
                                    format: r,
                                    list: i.list,
                                    styles: i.styles
                                })
                            } catch (a) {
                                n({format: r}, a)
                            }
                        }
                    }, {
                        key: "parseASSItem", value: function () {
                            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
                                t = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").split(","),
                                n = {}, i = "";
                            try {
                                var o = t.length - e.length;
                                return i = a(i = (i = o > 0 ? t.splice(e.length - 1, o + 1).join(",") + "" : t[t.length - 1] + "").replace(/\\n+/g, "")), t[e.length - 1] = i, e.map((function (e, i) {
                                    "end" === e || "start" === e ? n[e] = r(t[i].split(":")) : "text" === e ? n[e] = [t[i]] : "layer" === e ? (n[e] = [t[i]], n.textTag = [t[i]]) : n[e] = "style" === e ? [t[i]] : Number(t[i]) ? Number(t[i]) : t[i]
                                })), n
                            } catch (l) {
                                return {}
                            }
                        }
                    }, {
                        key: "parseASS", value: function (t) {
                            for (var n = t.split("\n"), r = [], i = 0, a = 0, o = [], l = [], s = null; i < n.length;) {
                                if (Rr.test(n[i])) l = (l = n[i].replace(Rr, "").replace(/\s+/g, "").split(",")).map((function (e) {
                                    return e.toLocaleLowerCase()
                                })); else if (Nr.test(n[i])) o.push(n[i].replace(Nr, "").replace(/\s+/g, "")); else if (Ir.test(n[i])) {
                                    var c = e.parseASSItem(n[i].replace(Ir, ""), l);
                                    if (s && c.start === s.start && c.end === s.end) try {
                                        var u = s, p = u.text, d = u.textTag, f = u.style;
                                        p.push(c.text[0]), d.push(c.textTag[0]), f.push(c.style[0])
                                    } catch (h) {
                                    } else {
                                        s = c;
                                        var g = null;
                                        a % 50 == 0 ? ((g = {
                                            start: s.start,
                                            end: s.end,
                                            list: []
                                        }).list.push(s), r.push(g)) : ((g = r[r.length - 1]).end = s.end, g.list.push(s)), a++
                                    }
                                }
                                i++
                            }
                            return {list: r, style: {}}
                        }
                    }, {
                        key: "parseVTTStyle", value: function (e, t) {
                            var n = e.split(":");
                            if (n.length > 1) {
                                var r = n[0].trim().split("-"), i = "";
                                r.length > 1 ? r.map((function (e, t) {
                                    i += 0 === t ? e : e.charAt(0).toUpperCase() + e.slice(1)
                                })) : i = r[0], t[i] = n[1].trim().replace(/;$/, "")
                            }
                            return t
                        }
                    }, {
                        key: "parseVTT", value: function (e) {
                            for (var t = (e = e.replace(Cr, "")).split("\n"), n = [], r = 0, a = 0, l = null, s = !1, c = !1, u = null, p = null, d = []; r < t.length;) {
                                var f = o(r, t).trim();
                                if (!f || s && i(f)) s = !f; else if (Or.test(f) && Lr.test(o(r - 1, t).trim())) {
                                    c = !0;
                                    var g = /\((.+?)\)/g.exec(f);
                                    p = g ? g[1] : "", u = ""
                                } else if (c) Sr.test(f) ? (d.push({
                                    key: p,
                                    style: u
                                }), u = null, p = null, c = !1) : u += f; else if (f) {
                                    s = !1;
                                    var h = this.checkIsTime(t[r]);
                                    if (h) {
                                        var y = this.parseVttTime(h);
                                        if (!l || y.start !== l.start || y.end !== l.end) {
                                            (l = y).text = [], l.textTag = [];
                                            var m = null;
                                            a % 50 == 0 ? ((m = {
                                                start: l.start,
                                                end: l.end,
                                                list: []
                                            }).list.push(l), n.push(m)) : ((m = n[n.length - 1]).end = l.end, m.list.push(l)), a++
                                        }
                                    } else if (l) {
                                        var v = l, x = v.text, b = v.textTag, k = this.parseVttText(t[r]);
                                        x.push(k.text), b.push(k.tag)
                                    }
                                    s = !1
                                }
                                r++
                            }
                            return {list: n, styles: d}
                        }
                    }, {
                        key: "checkIsTime", value: function (e) {
                            e = e.replace(/\s+/g, "");
                            for (var t = 0, n = null; t < Ar.length && !(n = Ar[t].exec(e));) t++;
                            return n ? n[0] : null
                        }
                    }, {
                        key: "parseVttText", value: function (e) {
                            var t = /^(<?.+?>)/g.exec(e), n = "", r = "default";
                            if (t) {
                                r = t[0].replace(/\<|\>|\&/g, "");
                                var i = RegExp("^<" + r + ">(([\\s\\S])*?)</" + r + ">$").exec(e);
                                i ? n = i[1] : (n = e, r = "")
                            } else n = e;
                            for (var o = /<(\w+).(\w+)>/g, l = o.exec(n); l && l.length > 2;) n = n.replace(l[0], "<" + l[1] + ' class="' + l[2] + '">'), l = o.exec(n);
                            return {tag: r, text: a(n.replace(/\\n+/g, "<br/>"))}
                        }
                    }, {
                        key: "parseVttTime", value: function (e) {
                            var t = e.split("--\x3e"), n = void 0, i = 0;
                            if (2 === t.length) {
                                var a = t[0].split(":"), o = t[1].split(":");
                                n = r(a), i = r(o)
                            }
                            return {start: n, end: i, time: e}
                        }
                    }, {
                        key: "isVTT", value: function (e) {
                            return Cr.test(e)
                        }
                    }, {
                        key: "isASS", value: function (e) {
                            return Pr.test(e)
                        }
                    }, {
                        key: "checkFormat", value: function (e) {
                            return e ? Cr.test(e) ? "vtt" : Pr.test(e) ? "ass" : null : null
                        }
                    }]), e
                }(), Dr = function () {
                    function e() {
                        var t = this;
                        ie(this, e), this.__handlers = [], window.ResizeObserver && (this.observer = new window.ResizeObserver((function (e) {
                            t.__trigger(e)
                        })))
                    }

                    return en(e, [{
                        key: "addObserver", value: function (e, t) {
                            if (this.observer) {
                                this.observer && this.observer.observe(e);
                                for (var n = this.__handlers, r = -1, i = 0; i < n.length; i++) n[i] && e === n[i].target && (r = i);
                                r > -1 ? this.__handlers[r].handler.push(t) : this.__handlers.push({
                                    target: e,
                                    handler: [t]
                                })
                            }
                        }
                    }, {
                        key: "unObserver", value: function (e) {
                            var t = -1;
                            this.__handlers.map((function (n, r) {
                                e === n.target && (t = r)
                            })), this.observer && this.observer.unobserve(e), t > -1 && this.__handlers.splice(t, 1)
                        }
                    }, {
                        key: "destroyObserver", value: function () {
                            this.observer && this.observer.disconnect(), this.observer = null, this.__handlers = null
                        }
                    }, {
                        key: "__runHandler", value: function (e, t) {
                            for (var n = this.__handlers, r = 0; r < n.length; r++) if (n[r] && e === n[r].target) {
                                n[r].handler && n[r].handler.map((function (n) {
                                    try {
                                        n(e, t)
                                    } catch (r) {
                                    }
                                }));
                                break
                            }
                        }
                    }, {
                        key: "__trigger", value: function (e) {
                            var t = this;
                            e.map((function (e) {
                                var n = e.contentRect;
                                t.__runHandler(e.target, n)
                            }))
                        }
                    }]), e
                }(), Mr = null;
            !function (e, t) {
                void 0 === t && (t = {});
                var n = t.insertAt;
                if (e && "undefined" != typeof document) {
                    var r = document.head || document.getElementsByTagName("head")[0],
                        i = document.createElement("style");
                    i.type = "text/css", "top" === n && r.firstChild ? r.insertBefore(i, r.firstChild) : r.appendChild(i), i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(document.createTextNode(e))
                }
            }('xg-text-track.xg-text-track {\n  font-family: "PingFang SC","SF Pro SC","SF Pro Text","SF Pro Icons","Helvetica Neue","Helvetica","Arial",sans-serif;\n  -webkit-font-smoothing: antialiased;\n  position: absolute;\n  bottom: 0;\n  color: #fff;\n  left: 0;\n  right: 0;\n  pointer-events: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n  xg-text-track.xg-text-track.text-track-no-fitvideo {\n    margin-bottom: 2%; }\n  xg-text-track.xg-text-track.text-track-hide {\n    opacity: 0;\n    visibility: hidden; }\n  xg-text-track.xg-text-track.text-track-show {\n    opacity: 1;\n    visibility: visible; }\n  xg-text-track.xg-text-track xg-text-track-inner {\n    display: block;\n    max-width: 92%; }\n  xg-text-track.xg-text-track xg-text-track-span {\n    display: -webkit-box;\n    text-align: center;\n    text-overflow: ellipsis;\n    -webkit-box-orient: vertical;\n    overflow: hidden;\n    padding: 1px 4px;\n    -webkit-line-clamp: 1;\n    line-height: 120%;\n    word-break: break-word; }\n    xg-text-track.xg-text-track xg-text-track-span.text-track-deputy {\n      font-size: 75%; }\n    xg-text-track.xg-text-track xg-text-track-span.text-track-single {\n      -webkit-line-clamp: 1; }\n    xg-text-track.xg-text-track xg-text-track-span.text-track-double {\n      -webkit-line-clamp: 2; }\n    xg-text-track.xg-text-track xg-text-track-span.text-track-three {\n      -webkit-line-clamp: 3; }\n  xg-text-track.xg-text-track.text-track-bg xg-text-track-inner {\n    background-color: rgba(0, 0, 0, .54);\n    border-radius: 2px; }\n  xg-text-track.xg-text-track.text-track-stroke xg-text-track-inner {\n    background-color: none;\n    border-radius: 0;\n    text-shadow: -1px 1px 0 rgba(0, 0, 0, .7), 1px 1px 0 rgba(0, 0, 0, .7), 1px -1px 0 rgba(0, 0, 0, .7), -1px -1px 0 rgba(0, 0, 0, .7); }\n');
            var zr = [{code: 0, msg: "SUCCESS"}, {code: 1, msg: "LOAD_ERROR"}, {code: 2, msg: "PARSER_ERROR"}, {
                    code: 3,
                    msg: "FORMAT_NOT_SUPPORTED"
                }, {code: 4, msg: "ID_OR_LANGUAGE_NOT_EXIST"}, {code: 5, msg: "PARAMETERS_ERROR"}, {
                    code: 6,
                    msg: "ABORT"
                }, {code: 7, msg: "UNKNOWN"}, {code: 8, msg: "DATA_ERROR:subtitle.url is null"}], Vr = {RESIZE: "resize"},
                Fr = !1;
            return function (e) {
                function t(e) {
                    ie(this, t);
                    var n = Xt(this, (t.__proto__ || re(t)).call(this));
                    return Fr = g(), n.currentText = null, n.textTrack = [], n._cid = -1, n._gid = -1, n._cids = [], n._iId = null, n._iC = 0, n.player = null, n.root = null, n.config = {
                        line: "double",
                        bottom: 0,
                        mode: "stroke",
                        defaultOpen: !1,
                        baseSizeX: 49,
                        baseSizeY: 28,
                        minSize: 16,
                        minMobileSize: 13,
                        fitVideo: !0,
                        offsetBottom: 2,
                        fontColor: "#fff"
                    }, n._ctime = 0, n._loadingTrack = {}, _r(n.config).map((function (t) {
                        void 0 !== e[t] && null !== e[t] && (n.config[t] = e[t])
                    })), n._isOpen = !1, n._videoMeta = {
                        scale: 0,
                        videoHeight: 0,
                        videoWidth: 0,
                        lwidth: 0,
                        lheight: 0,
                        vWidth: 0,
                        vHeight: 0,
                        vBottom: 0,
                        vLeft: 0,
                        marginBottom: 0
                    }, e.subTitles && "Array" === d(e.subTitles) ? (e.player && n.attachPlayer(e.player), n.setSubTitles(e.subTitles, n.config.defaultOpen), n) : Xt(n)
                }

                return dn(t, e), en(t, [{
                    key: "version", get: function () {
                        return "1.0.12"
                    }
                }]), en(t, [{
                    key: "setSubTitles", value: function () {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = this,
                            n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                            r = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
                            i = this._isOpen || n;
                        r && this.innerRoot && this.switchOff(), this.currentText = null, this.textTrack = [], e.map((function (e) {
                            var n = {};
                            _r(e).map((function (t) {
                                n[t] = e[t]
                            })), n.isDefault && (t.currentText = n), t.textTrack.push(n)
                        })), this.currentText && b(this.currentText).then((function (e) {
                            t.addStyles(e), i && t.switch()
                        }))
                    }
                }, {
                    key: "addStyles", value: function (e) {
                        var t = e.styles, n = e.format;
                        t && "vtt" === n && (t.map((function (e) {
                            e.key || (e.key = "xg-text-track-span")
                        })), h(t, "xg-text-track"))
                    }
                }, {
                    key: "attachPlayer", value: function (e) {
                        var t = this;
                        if (e) {
                            this.player && this.detachPlayer();
                            var n = this.config, r = n.fontColor, i = n.mode, a = n.fitVideo;
                            this.player = e, this.root = document.createElement("xg-text-track"), this.root.className = "xg-text-track", !this._isOpen && s(this.root, "text-track-hide"), !a && s(this.root, "text-track-no-fitvideo"), i && s(this.root, "text-track-" + i), this.innerRoot = document.createElement("xg-text-track-inner"), this.root.appendChild(this.innerRoot), r && (this.root.style.color = r), this.currentText && ["language", "id", "label"].map((function (e) {
                                t.root.setAttribute("data-" + e, t.currentText[e] || "")
                            })), this.player.root.appendChild(this.root), ["destroy", "__onTimeupdate", "_onResize"].map((function (e) {
                                t[e] = t[e].bind(t)
                            })), this.player.on("destroy", this.destroy), this.player.on("timeupdate", this.__onTimeupdate), this._isOpen && this.switch(), y(e.root, this._onResize)
                        }
                    }
                }, {
                    key: "detachPlayer", value: function () {
                        var e = this.player;
                        e && (e.off("destroy", this.destroy), e.off("timeupdate", this.__onTimeupdate), e.root && (m(e.root, this._onResize), e.root.removeChild(this.root)), this.innerRoot = null, this.root = null, this.player = null)
                    }
                }, {
                    key: "switch", value: function () {
                        var e = this,
                            t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {id: "", language: ""};
                        return this._loadingTrack = t, new kr((function (n, r) {
                            if (t.id || t.language) if (e.currentText && k(t, e.currentText)) e._loadingTrack = {}, e._updateCurrent(e.currentText), e._isOpen = !0, e.show(), n(v(0)); else {
                                for (var i = null, a = 0; a < e.textTrack.length; a++) if (k(t, e.textTrack[a])) {
                                    i = e.textTrack[a];
                                    break
                                }
                                if (i) i.list ? (e._loadingTrack = {}, e._updateCurrent(i), e._isOpen = !0, e.show(), n(v(0))) : b(i).then((function (t) {
                                    if (e.addStyles(t), e._loadingTrack.id === i.id || e._loadingTrack.language === t.language) e._loadingTrack = {}, e._updateCurrent(t), e._isOpen = !0, e.show(), n(v(0)); else {
                                        var a = v(6, {message: "check _loadingTrack fail id: " + e._loadingTrack.id + "  nextSubtitle:" + t.id});
                                        r(a)
                                    }
                                })).catch((function (e) {
                                    r(e)
                                })); else {
                                    var o = v(4, new Error("The is no subtitle with id:[{" + t.id + "}] or language:[" + t.language + "]"));
                                    r(o)
                                }
                            } else {
                                if (e.currentText) {
                                    e._loadingTrack = {}, e._updateCurrent(e.currentText), e._isOpen = !0, e.show();
                                    var l = v(0, {message: "switch default subtitle success"});
                                    return void n(l)
                                }
                                var s = v(5, {message: "no default subtitle"});
                                r(s)
                            }
                        }))
                    }
                }, {
                    key: "switchOff", value: function () {
                        this._isOpen = !1, this.hide()
                    }
                }, {
                    key: "_updateCurrent", value: function (e) {
                        var t = this;
                        if (this.root) {
                            this.currentText = e, ["language", "id", "label"].map((function (e) {
                                t.root.setAttribute("data-" + e, t.currentText[e] || "")
                            })), this.__remove(this._cids);
                            var n = this.player.currentTime;
                            this._cids = [], this._gid = -1, this._cid = -1, this._update(n)
                        }
                    }
                }, {
                    key: "__loadAll", value: function () {
                        this.textTrack.map((function (e) {
                            b(e)
                        }))
                    }
                }, {
                    key: "getDelCid", value: function (e, t) {
                        for (var n = [], r = 0; r < e.length; r++) t.includes(e[r]) || n.push(e[r]);
                        return n
                    }
                }, {
                    key: "getNewCid", value: function (e, t) {
                        for (var n = [], r = 0; r < t.length; r++) e.includes(t[r]) || n.push(t[r]);
                        return n
                    }
                }, {
                    key: "_update", value: function (e) {
                        var t = this, n = u(e, this.currentText.list, this._gid), r = [];
                        if (n > -1 && (r = p(e, this.currentText.list[n].list, this._cid)), r.length < 1) return this._cids.length > 0 && this.__remove(this._cids), void (this._cids = []);
                        if (this._cids !== r || n !== this._gid) {
                            this._gid = n, this._cid = r[0];
                            var i = this.getDelCid(this._cids, r), a = this.getNewCid(this._cids, r);
                            this._cids = r, this.__remove(i);
                            var o = [];
                            a.map((function (e) {
                                var r = t.currentText.list[n].list[e];
                                r.index = e, o.push(r)
                            })), this.__render(o, e)
                        }
                    }
                }, {
                    key: "__onTimeupdate", value: function () {
                        if (this._isOpen) {
                            var e = this.player.video, t = e.videoWidth, n = e.videoHeight;
                            !this._videoMeta.scale && t && n && this._onResize(this.player.root);
                            var r = this.player.currentTime;
                            Math.round(Math.abs(1e3 * r - this._ctime)) < 200 || (this._ctime = 1e3 * r, this.currentText && this.currentText.list && this._update(r))
                        }
                    }
                }, {
                    key: "_onResize", value: function (e) {
                        var t = this._videoMeta;
                        if (e && e instanceof window.Element || (e = this.player.root), this._iId && (clearTimeout(this._iId), this._iId = null), !t.scale) {
                            if (!this.player.video) return;
                            var n = this.player.video, r = n.videoWidth, i = n.videoHeight;
                            if (!r || !i) return;
                            t.videoWidth = r, t.videoHeight = i, t.scale = parseInt(i / r * 100, 10)
                        }
                        this.__startResize(e)
                    }
                }, {
                    key: "resize", value: function (e, t) {
                        var n = this, r = this.config, i = r.baseSizeX, a = r.baseSizeY, o = r.minMobileSize,
                            l = r.minSize, s = r.fitVideo, c = r.offsetBottom, u = this._videoMeta.scale;
                        this._videoMeta.lwidth = e, this._videoMeta.lheight = t;
                        var p = void 0, d = 0;
                        t / e * 100 >= u ? (d = parseInt(u * e, 10) / 100, p = e) : (d = t, p = parseInt(t / u * 100, 10)), this._videoMeta.vWidth = p, this._videoMeta.vHeight = d;
                        var f = 0, g = 0;
                        u > 120 ? (f = a, g = parseInt(f * d / 1080, 10)) : (f = i, g = parseInt(f * p / 1920, 10));
                        var h = Fr ? o : l, y = {fontSize: g = g < h ? h : g > f ? f : g},
                            m = parseInt((t - d) / 2, 10), v = parseInt((e - p) / 2, 10), x = parseInt(d * c, 10) / 100;
                        this._videoMeta.vBottom = m, this._videoMeta.vLeft = v, this._videoMeta.marginBottom = x, s && (y.bottom = m + x, y.left = y.right = v), _r(y).map((function (e) {
                            n.root.style[e] = y[e] + "px"
                        })), this.emit(Vr.RESIZE, {
                            vLeft: v,
                            vBottom: m,
                            marginBottom: x,
                            vWidth: p,
                            vHeight: d,
                            fontSize: g,
                            scale: u
                        })
                    }
                }, {
                    key: "__startResize", value: function (e) {
                        var t = this, n = e.getBoundingClientRect(), r = this._videoMeta, i = n.width, a = n.height;
                        if (this._iId && (clearTimeout(this._iId), this._iId = null), i > 0 && a > 0 && (i !== r.lwidth || a !== r.lheight)) this._iC = 0, this.resize(i, a); else {
                            if (this._iC >= 5) return void (this._iC = 0);
                            this._iC++, this._iId = setTimeout((function () {
                                t.__startResize(e)
                            }), 50)
                        }
                    }
                }, {
                    key: "__remove", value: function (e) {
                        var t = this;
                        if (e && !(e.length < 1)) {
                            for (var n = this.innerRoot.children, r = [], i = 0; i < n.length; i++) {
                                var a = Number(n[i].getAttribute("data-index"));
                                e.includes(a) && r.push(n[i])
                            }
                            r.map((function (e) {
                                t.innerRoot.removeChild(e)
                            }))
                        }
                    }
                }, {
                    key: "__render", value: function () {
                        var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                        t.length > 0 && t.map((function (t) {
                            var n = "text-track-" + e.config.line;
                            t.text.map((function (r, i) {
                                i > 0 && (n += " text-track-deputy");
                                var a = {"data-start": t.start, "data-end": t.end, "data-index": t.index};
                                e.innerRoot.appendChild(f("xg-text-track-span", r, a, n))
                            }))
                        }))
                    }
                }, {
                    key: "show", value: function () {
                        c(this.root, "text-track-hide")
                    }
                }, {
                    key: "hide", value: function () {
                        s(this.root, "text-track-hide"), this.innerRoot.innerHTML = ""
                    }
                }, {
                    key: "destroy", value: function () {
                        this.detachPlayer(), this.removeAllListeners(), this.player = null, this.textTrack = null
                    }
                }, {
                    key: "marginBottom", get: function () {
                        var e = this._videoMeta, t = e.bottom, n = e.marginBottom;
                        return this.config.fitVideo ? t + n : n
                    }
                }]), t
            }(Tr)
        }()
    }, function (e, t, n) {
        var r = N(n(9)), i = N(n(10)), a = N(n(108)), o = N(n(48)), l = N(n(40)), s = N(n(53)), c = N(n(56)),
            u = N(n(59)), p = N(n(111)), d = N(n(116)), f = N(n(122)), g = N(n(64)), h = N(n(68)), y = N(n(71)),
            m = N(n(74)), v = N(n(125)), x = N(n(128)), b = N(n(129)), k = N(n(133)), w = N(n(139)), _ = N(n(142)),
            T = N(n(145)), E = N(n(149)), C = N(n(153)), L = N(n(157)), O = N(n(160)), S = N(n(162)), P = N(n(163)),
            A = N(n(166)), R = N(n(169));

        function N(e) {
            return e && e.__esModule ? e : {default: e}
        }

        r.default.installAll([i.default, a.default, o.default, l.default, s.default, c.default, u.default, p.default, d.default, f.default, g.default, h.default, y.default, m.default, v.default, x.default, b.default, k.default, w.default, _.default, T.default, E.default, C.default, L.default, O.default, S.default, P.default, A.default, R.default])
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(0);
        n(109), t.default = {
            name: "s_enter", method: function () {
                for (var e = this.root, t = "", n = 1; n <= 12; n++) t += '<div class="xgplayer-enter-bar' + n + '"></div>';
                var i = (0, r.createDom)("xg-enter", '<div class="xgplayer-enter-spinner">\n                                                  ' + t + "\n                                                </div>", {}, "xgplayer-enter");
                e.appendChild(i)
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        var r = n(110);
        "string" == typeof r && (r = [[e.i, r, ""]]);
        var i = {hmr: !0, transform: void 0, insertInto: void 0};
        n(2)(r, i), r.locals && (e.exports = r.locals)
    }, function (e, t, n) {
        (e.exports = n(1)(!1)).push([e.i, ".xgplayer-skin-default .xgplayer-enter{display:none;position:absolute;left:0;top:0;width:100%;height:100%;background:#000;z-index:120}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner{display:block;position:absolute;left:50%;top:50%;height:100px;width:100px;position:relative;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div{width:12%;height:26%;background-color:hsla(0,0%,100%,.7);position:absolute;left:44%;top:37%;opacity:0;border-radius:30px;-webkit-animation:fade 1s linear infinite;animation:fade 1s linear infinite}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar1{-webkit-transform:rotate(0deg) translateY(-142%);-ms-transform:rotate(0deg) translateY(-142%);transform:rotate(0deg) translateY(-142%);-webkit-animation-delay:0s;animation-delay:0s}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar2{-webkit-transform:rotate(30deg) translateY(-142%);-ms-transform:rotate(30deg) translateY(-142%);transform:rotate(30deg) translateY(-142%);-webkit-animation-delay:-.9163s;animation-delay:-.9163s}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar3{-webkit-transform:rotate(60deg) translateY(-142%);-ms-transform:rotate(60deg) translateY(-142%);transform:rotate(60deg) translateY(-142%);-webkit-animation-delay:-.833s;animation-delay:-.833s}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar4{-webkit-transform:rotate(90deg) translateY(-142%);-ms-transform:rotate(90deg) translateY(-142%);transform:rotate(90deg) translateY(-142%);-webkit-animation-delay:-.7497s;animation-delay:-.7497s}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar5{-webkit-transform:rotate(120deg) translateY(-142%);-ms-transform:rotate(120deg) translateY(-142%);transform:rotate(120deg) translateY(-142%);-webkit-animation-delay:-.6664s;animation-delay:-.6664s}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar6{-webkit-transform:rotate(150deg) translateY(-142%);-ms-transform:rotate(150deg) translateY(-142%);transform:rotate(150deg) translateY(-142%);-webkit-animation-delay:-.5831s;animation-delay:-.5831s}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar7{-webkit-transform:rotate(180deg) translateY(-142%);-ms-transform:rotate(180deg) translateY(-142%);transform:rotate(180deg) translateY(-142%);-webkit-animation-delay:-.4998s;animation-delay:-.4998s}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar8{-webkit-transform:rotate(210deg) translateY(-142%);-ms-transform:rotate(210deg) translateY(-142%);transform:rotate(210deg) translateY(-142%);-webkit-animation-delay:-.4165s;animation-delay:-.4165s}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar9{-webkit-transform:rotate(240deg) translateY(-142%);-ms-transform:rotate(240deg) translateY(-142%);transform:rotate(240deg) translateY(-142%);-webkit-animation-delay:-.3332s;animation-delay:-.3332s}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar10{-webkit-transform:rotate(270deg) translateY(-142%);-ms-transform:rotate(270deg) translateY(-142%);transform:rotate(270deg) translateY(-142%);-webkit-animation-delay:-.2499s;animation-delay:-.2499s}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar11{-webkit-transform:rotate(300deg) translateY(-142%);-ms-transform:rotate(300deg) translateY(-142%);transform:rotate(300deg) translateY(-142%);-webkit-animation-delay:-.1666s;animation-delay:-.1666s}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar12{-webkit-transform:rotate(330deg) translateY(-142%);-ms-transform:rotate(330deg) translateY(-142%);transform:rotate(330deg) translateY(-142%);-webkit-animation-delay:-.0833s;animation-delay:-.0833s}@-webkit-keyframes fade{0%{opacity:1}to{opacity:.25}}@keyframes fade{0%{opacity:1}to{opacity:.25}}.xgplayer-skin-default.xgplayer-is-enter .xgplayer-enter{display:block}", ""])
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(0), i = o(n(112)), a = o(n(113));

        function o(e) {
            return e && e.__esModule ? e : {default: e}
        }

        n(114), t.default = {
            name: "s_cssFullscreen", method: function () {
                var e = this;
                if (e.config.cssFullscreen) {
                    var t = (0, r.createDom)("xg-cssfullscreen", '<xg-icon class="xgplayer-icon">\n                                             <div class="xgplayer-icon-requestfull">' + i.default + '</div>\n                                             <div class="xgplayer-icon-exitfull">' + a.default + "</div>\n                                           </xg-icon>", {}, "xgplayer-cssfullscreen"),
                        n = {};
                    n.requestfull = e.lang.CSSFULLSCREEN_TIPS, n.exitfull = e.lang.EXITCSSFULLSCREEN_TIPS;
                    var o = (0, r.createDom)("xg-tips", '<span class="xgplayer-tip-requestfull">' + n.requestfull + '</span>\n                                        <span class="xgplayer-tip-exitfull">' + n.exitfull + "</span>", {}, "xgplayer-tips");
                    t.appendChild(o), e.once("ready", (function () {
                        e.controls.appendChild(t)
                    })), ["click", "touchend"].forEach((function (n) {
                        t.addEventListener(n, (function (t) {
                            t.preventDefault(), t.stopPropagation(), e.userGestureTrigEvent("cssFullscreenBtnClick")
                        }))
                    }))
                }
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        n.r(t), t.default = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">\n  <path transform="scale(0.028 0.028)" d="M843.617212 67.898413 175.411567 67.898413c-61.502749 0-111.367437 49.856501-111.367437 111.367437l0 668.205645c0 61.510936 49.864688 111.367437 111.367437 111.367437L843.617212 958.838931c61.510936 0 111.367437-49.856501 111.367437-111.367437L954.984648 179.26585C954.984648 117.754914 905.12917 67.898413 843.617212 67.898413zM398.146441 736.104057c15.380292 0 27.842115 12.461823 27.842115 27.842115 0 15.379269-12.461823 27.841092-27.842115 27.841092L259.725858 791.787264c-7.785314 0-14.781658-3.217275-19.838837-8.365528-5.383614-4.577249-8.791224-11.228739-8.791224-19.475564L231.095797 624.736621c0-15.371082 12.471033-27.842115 27.842115-27.842115 15.380292 0 27.842115 12.471033 27.842115 27.842115l-0.61603 71.426773 133.036969-133.037992 39.378869 39.378869L324.962651 736.113267 398.146441 736.104057zM419.199942 463.611943 286.162974 330.565764l0.61603 71.435982c0 15.380292-12.461823 27.842115-27.842115 27.842115-15.371082 0-27.842115-12.461823-27.842115-27.842115L231.094774 262.791172c0-8.256034 3.40761-14.908548 8.791224-19.476587 5.057179-5.148253 12.053524-8.374738 19.838837-8.374738l138.420583 0.00921c15.380292 0 27.842115 12.461823 27.842115 27.842115s-12.461823 27.842115-27.842115 27.842115l-73.175603-0.00921 133.607974 133.607974L419.199942 463.611943zM787.932981 763.946172c0 8.247848-3.40761 14.899338-8.791224 19.475564-5.057179 5.148253-12.053524 8.365528-19.839861 8.365528L620.881314 791.787264c-15.379269 0-27.841092-12.461823-27.841092-27.841092 0-15.380292 12.461823-27.842115 27.841092-27.842115l73.185836 0.00921L560.449967 602.50427l39.378869-39.378869L732.875015 696.163393l-0.62524-71.426773c0-15.371082 12.462846-27.842115 27.842115-27.842115 15.380292 0 27.842115 12.471033 27.842115 27.842115L787.934005 763.946172zM787.932981 402.000724c0 15.380292-12.461823 27.842115-27.842115 27.842115-15.379269 0-27.842115-12.461823-27.842115-27.842115l0.62524-71.435982L599.828836 463.611943l-39.378869-39.378869 133.617184-133.607974-73.185836 0.00921c-15.379269 0-27.841092-12.461823-27.841092-27.842115s12.461823-27.842115 27.841092-27.842115l138.421606-0.00921c7.785314 0 14.781658 3.226484 19.839861 8.374738 5.383614 4.568039 8.791224 11.219529 8.791224 19.476587L787.934005 402.000724z"></path>\n</svg>\n'
    }, function (e, t, n) {
        n.r(t), t.default = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">\n  <path transform="scale(0.028 0.028)" d="M834.56 81.92H189.44c-59.392 0-107.52 48.128-107.52 107.52v645.12c0 59.392 48.128 107.52 107.52 107.52h645.12c59.392 0 107.52-48.128 107.52-107.52V189.44c0-59.392-48.128-107.52-107.52-107.52zM458.24 727.04c0 14.848-12.288 26.624-26.624 26.624S404.48 741.888 404.48 727.04v-69.632L289.28 773.12c-10.752 10.24-27.648 10.24-37.888 0-10.24-10.752-10.24-27.648 0-37.888L366.592 619.52H296.96c-14.848 0-26.624-12.288-26.624-26.624s12.288-26.624 26.624-26.624h134.144c14.848 0 26.624 12.288 26.624 26.624V727.04z m0-295.936c0 14.848-12.288 26.624-26.624 26.624H296.96c-14.848 0-26.624-12.288-26.624-26.624S282.112 404.48 296.96 404.48h69.632L251.392 289.28c-10.24-10.752-10.24-27.648 0-37.888 5.12-5.12 12.288-7.68 18.944-7.68 6.656 0 13.824 2.56 18.944 7.68L404.48 366.592V296.96c0-14.848 12.288-26.624 26.624-26.624s26.624 12.288 26.624 26.624v134.144zM773.12 773.12c-10.752 10.24-27.648 10.24-37.888 0L619.52 657.408V727.04c0 14.848-12.288 26.624-26.624 26.624s-26.624-11.776-26.624-26.624v-134.144c0-14.848 12.288-26.624 26.624-26.624H727.04c14.848 0 26.624 12.288 26.624 26.624s-12.288 26.624-26.624 26.624h-69.632l115.2 115.2c10.752 10.752 10.752 27.648 0.512 38.4z m0-483.84L657.408 404.48H727.04c14.848 0 26.624 12.288 26.624 26.624 0 14.848-12.288 26.624-26.624 26.624h-134.144c-14.848 0-26.624-12.288-26.624-26.624V296.96c0-14.848 12.288-26.624 26.624-26.624s26.624 12.288 26.624 26.624v69.632L734.72 250.88c5.12-5.12 12.288-7.68 18.944-7.68s13.824 2.56 18.944 7.68c10.752 10.752 10.752 27.648 0.512 38.4z"></path>\n</svg>\n'
    }, function (e, t, n) {
        var r = n(115);
        "string" == typeof r && (r = [[e.i, r, ""]]);
        var i = {hmr: !0, transform: void 0, insertInto: void 0};
        n(2)(r, i), r.locals && (e.exports = r.locals)
    }, function (e, t, n) {
        (e.exports = n(1)(!1)).push([e.i, ".xgplayer-skin-default .xgplayer-cssfullscreen,.xgplayer-skin-default .xgplayer-cssfullscreen-img{position:relative;-webkit-order:12;-moz-box-ordinal-group:13;order:12;display:block;cursor:pointer}.xgplayer-skin-default .xgplayer-cssfullscreen-img .xgplayer-icon,.xgplayer-skin-default .xgplayer-cssfullscreen .xgplayer-icon{width:32px;margin-top:5px}.xgplayer-skin-default .xgplayer-cssfullscreen-img .xgplayer-icon div,.xgplayer-skin-default .xgplayer-cssfullscreen .xgplayer-icon div{position:absolute}.xgplayer-skin-default .xgplayer-cssfullscreen-img .xgplayer-icon .xgplayer-icon-requestfull,.xgplayer-skin-default .xgplayer-cssfullscreen .xgplayer-icon .xgplayer-icon-requestfull{display:block}.xgplayer-skin-default .xgplayer-cssfullscreen-img .xgplayer-icon .xgplayer-icon-exitfull,.xgplayer-skin-default .xgplayer-cssfullscreen .xgplayer-icon .xgplayer-icon-exitfull{display:none}.xgplayer-skin-default .xgplayer-cssfullscreen-img .xgplayer-tips,.xgplayer-skin-default .xgplayer-cssfullscreen .xgplayer-tips{margin-left:-40px}.xgplayer-skin-default .xgplayer-cssfullscreen-img .xgplayer-tips .xgplayer-tip-requestfull,.xgplayer-skin-default .xgplayer-cssfullscreen .xgplayer-tips .xgplayer-tip-requestfull{display:block}.xgplayer-skin-default .xgplayer-cssfullscreen-img .xgplayer-tips .xgplayer-tip-exitfull,.xgplayer-skin-default .xgplayer-cssfullscreen .xgplayer-tips .xgplayer-tip-exitfull{display:none}.xgplayer-skin-default .xgplayer-cssfullscreen-img:hover,.xgplayer-skin-default .xgplayer-cssfullscreen:hover{opacity:.85}.xgplayer-skin-default .xgplayer-cssfullscreen-img:hover .xgplayer-tips,.xgplayer-skin-default .xgplayer-cssfullscreen:hover .xgplayer-tips{display:block}.xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen-img .xgplayer-icon .xgplayer-icon-requestfull,.xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen .xgplayer-icon .xgplayer-icon-requestfull{display:none}.xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen-img .xgplayer-icon .xgplayer-icon-exitfull,.xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen .xgplayer-icon .xgplayer-icon-exitfull{display:block}.xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen-img .xgplayer-tips,.xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen .xgplayer-tips{margin-left:-47px}.xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen-img .xgplayer-tips .xgplayer-tip-requestfull,.xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen .xgplayer-tips .xgplayer-tip-requestfull{display:none}.xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen-img .xgplayer-tips .xgplayer-tip-exitfull,.xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen .xgplayer-tips .xgplayer-tip-exitfull{display:block}.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-cssfullscreen,.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-cssfullscreen-img{display:none}.xgplayer-skin-default.xgplayer-is-cssfullscreen{position:fixed!important;left:0!important;top:0!important;width:100%!important;height:100%!important;z-index:99999!important}.xgplayer-lang-is-en .xgplayer-cssfullscreen-img .xgplayer-tips,.xgplayer-lang-is-en .xgplayer-cssfullscreen .xgplayer-tips,.xgplayer-lang-is-en.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen-img .xgplayer-tips,.xgplayer-lang-is-en.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen .xgplayer-tips{margin-left:-46px}.lang-is-jp .xgplayer-cssfullscreen-img .xgplayer-tips,.lang-is-jp .xgplayer-cssfullscreen .xgplayer-tips{margin-left:-120px}.lang-is-jp.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen-img .xgplayer-tips,.lang-is-jp.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen .xgplayer-tips{margin-left:-60px}", ""])
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(0), i = l(n(117)), a = l(n(118)), o = l(n(119));

        function l(e) {
            return e && e.__esModule ? e : {default: e}
        }

        n(120), t.default = {
            name: "s_volume", method: function () {
                var e = this,
                    t = (0, r.createDom)("xg-volume", '<xg-icon class="xgplayer-icon">\n                                         <div class="xgplayer-icon-large">' + o.default + '</div>\n                                         <div class="xgplayer-icon-small">' + a.default + '</div>\n                                         <div class="xgplayer-icon-muted">' + i.default + '</div>\n                                       </xg-icon>\n                                       <xg-slider class="xgplayer-slider" tabindex="2">\n                                         <xg-bar class="xgplayer-bar">\n                                           <xg-drag class="xgplayer-drag"></xg-drag>\n                                         </xg-bar>\n                                       </xg-slider>', {}, "xgplayer-volume");
                e.once("ready", (function () {
                    e.controls && e.controls.appendChild(t)
                }));
                var n = t.querySelector(".xgplayer-slider"), l = t.querySelector(".xgplayer-bar"),
                    s = t.querySelector(".xgplayer-drag"), c = t.querySelector(".xgplayer-icon");
                s.style.height = 100 * e.config.volume + "%", n.volume = e.config.volume, l.addEventListener("mousedown", (function (t) {
                    t.preventDefault(), t.stopPropagation(), e.userGestureTrigEvent("volumeBarClick", t)
                })), ["click", "touchend"].forEach((function (t) {
                    c.addEventListener(t, (function (t) {
                        t.preventDefault(), t.stopPropagation(), e.userGestureTrigEvent("volumeIconClick")
                    }))
                })), c.addEventListener("mouseenter", (function (t) {
                    t.preventDefault(), t.stopPropagation(), e.userGestureTrigEvent("volumeIconEnter")
                })), ["blur", "mouseleave"].forEach((function (n) {
                    t.addEventListener(n, (function (t) {
                        t.preventDefault(), t.stopPropagation(), e.userGestureTrigEvent("volumeIconLeave")
                    }))
                }))
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        n.r(t), t.default = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">\n  <path transform="scale(0.0220625 0.0220625)" d="M358.4 358.4h-204.8v307.2h204.8l256 256v-819.2l-256 256z"></path>\n  <path transform="scale(0.0220625 0.0220625)" d="M920.4 439.808l-108.544-109.056-72.704 72.704 109.568 108.544-109.056 108.544 72.704 72.704 108.032-109.568 108.544 109.056 72.704-72.704-109.568-108.032 109.056-108.544-72.704-72.704-108.032 109.568z"></path>\n</svg>\n'
    }, function (e, t, n) {
        n.r(t), t.default = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">\n  <path transform="scale(0.0220625 0.0220625)" d="M358.4 358.4h-204.8v307.2h204.8l256 256v-819.2l-256 256z"></path>\n  <path transform="scale(0.0220625 0.0220625)" d="M795.648 693.248l-72.704-72.704c27.756-27.789 44.921-66.162 44.921-108.544s-17.165-80.755-44.922-108.546l0.002 0.002 72.704-72.704c46.713 46.235 75.639 110.363 75.639 181.248s-28.926 135.013-75.617 181.227l-0.021 0.021zM795.648 693.248l-72.704-72.704c27.756-27.789 44.921-66.162 44.921-108.544s-17.165-80.755-44.922-108.546l0.002 0.002 72.704-72.704c46.713 46.235 75.639 110.363 75.639 181.248s-28.926 135.013-75.617 181.227l-0.021 0.021z"></path>\n</svg>\n'
    }, function (e, t, n) {
        n.r(t), t.default = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">\n  <path transform="scale(0.0220625 0.0220625)" d="M358.4 358.4h-204.8v307.2h204.8l256 256v-819.2l-256 256z"></path>\n  <path transform="scale(0.0220625 0.0220625)" d="M940.632 837.632l-72.192-72.192c65.114-64.745 105.412-154.386 105.412-253.44s-40.299-188.695-105.396-253.424l-0.016-0.016 72.192-72.192c83.639 83.197 135.401 198.37 135.401 325.632s-51.762 242.434-135.381 325.612l-0.020 0.020zM795.648 693.248l-72.704-72.704c27.756-27.789 44.921-66.162 44.921-108.544s-17.165-80.755-44.922-108.546l0.002 0.002 72.704-72.704c46.713 46.235 75.639 110.363 75.639 181.248s-28.926 135.013-75.617 181.227l-0.021 0.021z"></path>\n</svg>\n'
    }, function (e, t, n) {
        var r = n(121);
        "string" == typeof r && (r = [[e.i, r, ""]]);
        var i = {hmr: !0, transform: void 0, insertInto: void 0};
        n(2)(r, i), r.locals && (e.exports = r.locals)
    }, function (e, t, n) {
        (e.exports = n(1)(!1)).push([e.i, '.xgplayer-skin-default .xgplayer-volume{outline:none;-webkit-order:4;-moz-box-ordinal-group:5;order:4;width:40px;height:40px;display:block;position:relative;z-index:18}.xgplayer-skin-default .xgplayer-volume .xgplayer-icon{margin-top:8px;cursor:pointer;position:absolute;bottom:-9px}.xgplayer-skin-default .xgplayer-volume .xgplayer-icon div{position:absolute}.xgplayer-skin-default .xgplayer-volume .xgplayer-icon .xgplayer-icon-large{display:block}.xgplayer-skin-default .xgplayer-volume .xgplayer-icon .xgplayer-icon-muted,.xgplayer-skin-default .xgplayer-volume .xgplayer-icon .xgplayer-icon-small{display:none}.xgplayer-skin-default .xgplayer-slider{display:none;position:absolute;width:28px;height:92px;background:rgba(0,0,0,.54);border-radius:1px;bottom:42px;outline:none}.xgplayer-skin-default .xgplayer-slider:after{content:" ";display:block;height:15px;width:28px;position:absolute;bottom:-15px;left:0;z-index:20}.xgplayer-skin-default .xgplayer-bar,.xgplayer-skin-default .xgplayer-drag{display:block;position:absolute;bottom:6px;left:12px;background:hsla(0,0%,100%,.3);border-radius:100px;width:4px;height:76px;outline:none;cursor:pointer}.xgplayer-skin-default .xgplayer-drag{bottom:0;left:0;background:#fa1f41;max-height:76px}.xgplayer-skin-default .xgplayer-drag:after{content:" ";display:inline-block;width:8px;height:8px;background:#fff;box-shadow:0 0 5px 0 rgba(0,0,0,.26);position:absolute;border-radius:50%;left:-2px;top:-6px}.xgplayer-skin-default.xgplayer-volume-active .xgplayer-slider,.xgplayer-skin-default.xgplayer-volume-large .xgplayer-volume .xgplayer-icon .xgplayer-icon-large{display:block}.xgplayer-skin-default.xgplayer-volume-large .xgplayer-volume .xgplayer-icon .xgplayer-icon-muted,.xgplayer-skin-default.xgplayer-volume-large .xgplayer-volume .xgplayer-icon .xgplayer-icon-small,.xgplayer-skin-default.xgplayer-volume-small .xgplayer-volume .xgplayer-icon .xgplayer-icon-large{display:none}.xgplayer-skin-default.xgplayer-volume-small .xgplayer-volume .xgplayer-icon .xgplayer-icon-small{display:block}.xgplayer-skin-default.xgplayer-volume-muted .xgplayer-volume .xgplayer-icon .xgplayer-icon-large,.xgplayer-skin-default.xgplayer-volume-muted .xgplayer-volume .xgplayer-icon .xgplayer-icon-small,.xgplayer-skin-default.xgplayer-volume-small .xgplayer-volume .xgplayer-icon .xgplayer-icon-muted{display:none}.xgplayer-skin-default.xgplayer-volume-muted .xgplayer-volume .xgplayer-icon .xgplayer-icon-muted{display:block}.xgplayer-skin-default.xgplayer-mobile .xgplayer-volume .xgplayer-slider{display:none}', ""])
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r, i = n(0), a = n(5), o = (r = a) && r.__esModule ? r : {default: r};
        n(123), t.default = {
            name: "s_definition", method: function () {
                var e = this, t = e.root, n = void 0,
                    r = (0, i.createDom)("xg-definition", "", {tabindex: 3}, "xgplayer-definition");

                function a() {
                    var n = e.definitionList, a = ["<ul>"], o = e.config.url, l = document.createElement("a");
                    e.switchURL ? ["mp4", "hls", "__flv__", "dash"].every((function (t) {
                        return !e[t] || (e[t].url && (l.href = e[t].url), "__flv__" === t && (e[t]._options ? l.href = e[t]._options.url : l.href = e[t]._mediaDataSource.url), "hls" === t && (l.href = e[t].originUrl || e[t].url, o = l.href), o = l.href, !1)
                    })) : o = e.currentSrc || e.src, n.forEach((function (t) {
                        l.href = t.url, e.dash ? a.push("<li url='" + t.url + "' cname='" + t.name + "' class='" + (t.selected ? "selected" : "") + "'>" + t.name + "</li>") : a.push("<li url='" + t.url + "' cname='" + t.name + "' class='" + (l.href === o ? "selected" : "") + "'>" + t.name + "</li>")
                    }));
                    var s = n.filter((function (t) {
                        return l.href = t.url, e.dash ? !0 === t.selected : l.href === o
                    }));
                    a.push("</ul><p class='name'>" + (s[0] || {name: ""}).name + "</p>");
                    var c = t.querySelector(".xgplayer-definition");
                    if (c) {
                        c.innerHTML = a.join("");
                        var u = c.querySelector(".name");
                        e.config.definitionActive && "hover" !== e.config.definitionActive || u.addEventListener("mouseenter", (function (t) {
                            t.preventDefault(), t.stopPropagation(), (0, i.addClass)(e.root, "xgplayer-definition-active"), c.focus()
                        }))
                    } else {
                        r.innerHTML = a.join("");
                        var p = r.querySelector(".name");
                        e.config.definitionActive && "hover" !== e.config.definitionActive || p.addEventListener("mouseenter", (function (t) {
                            t.preventDefault(), t.stopPropagation(), (0, i.addClass)(e.root, "xgplayer-definition-active"), r.focus()
                        })), e.controls.appendChild(r)
                    }
                }

                function l(n) {
                    e.definitionList = n, n && n instanceof Array && n.length > 0 && ((0, i.addClass)(t, "xgplayer-is-definition"), e.once("canplay", a))
                }

                function s() {
                    if (e.currentTime = e.curTime, n) e.pause(); else {
                        var t = e.play();
                        void 0 !== t && t && t.catch((function (e) {
                        }))
                    }
                }

                function c() {
                    e.once("timeupdate", s)
                }

                function u() {
                    (0, i.removeClass)(t, "xgplayer-definition-active")
                }

                "mobile" === o.default.device && (e.config.definitionActive = "click"), e.on("resourceReady", l), ["touchend", "click"].forEach((function (t) {
                    r.addEventListener(t, (function (t) {
                        t.preventDefault(), t.stopPropagation();
                        var a = e.definitionList, l = t.target || t.srcElement, u = document.createElement("a");
                        if (l && "li" === l.tagName.toLocaleLowerCase()) {
                            var p, d = void 0;
                            if (Array.prototype.forEach.call(l.parentNode.childNodes, (function (t) {
                                (0, i.hasClass)(t, "selected") && (d = t.getAttribute("cname"), (0, i.removeClass)(t, "selected"), e.emit("beforeDefinitionChange", t.getAttribute("url")))
                            })), e.dash && a.forEach((function (e) {
                                e.selected = !1, e.name === l.innerHTML && (e.selected = !0)
                            })), (0, i.addClass)(l, "selected"), p = l.getAttribute("cname"), l.parentNode.nextSibling.innerHTML = "" + l.getAttribute("cname"), u.href = l.getAttribute("url"), n = e.paused, e.switchURL) {
                                var f = document.createElement("a");
                                ["mp4", "hls", "__flv__", "dash"].every((function (t) {
                                    return !e[t] || (e[t].url && (f.href = e[t].url), "__flv__" === t && (e[t]._options ? f.href = e[t]._options.url : f.href = e[t]._mediaDataSource.url), "hls" === t && (f.href = e[t].originUrl || e[t].url), !1)
                                })), f.href === u.href || e.ended || e.switchURL(u.href)
                            } else e.hls && (document.createElement("a"), e.hls.url), u.href !== e.currentSrc && (e.curTime = e.currentTime, e.ended || (e.src = u.href));
                            navigator.userAgent.toLowerCase().indexOf("android") > -1 ? e.once("timeupdate", c) : e.once("loadedmetadata", s), e.emit("definitionChange", {
                                from: d,
                                to: p
                            }), "mobile" === o.default.device && (0, i.removeClass)(e.root, "xgplayer-definition-active")
                        } else "click" !== e.config.definitionActive || !l || "p" !== l.tagName.toLocaleLowerCase() && "em" !== l.tagName.toLocaleLowerCase() || ("mobile" === o.default.device ? (0, i.toggleClass)(e.root, "xgplayer-definition-active") : (0, i.addClass)(e.root, "xgplayer-definition-active"), r.focus());
                        e.emit("focus")
                    }), !1)
                })), r.addEventListener("mouseleave", (function (e) {
                    e.preventDefault(), e.stopPropagation(), (0, i.removeClass)(t, "xgplayer-definition-active")
                })), e.on("blur", u), e.once("destroy", (function t() {
                    e.off("resourceReady", l), e.off("canplay", a), navigator.userAgent.toLowerCase().indexOf("android") > -1 ? (e.off("timeupdate", c), e.off("timeupdate", s)) : e.off("loadedmetadata", s), e.off("blur", u), e.off("destroy", t)
                })), e.getCurrentDefinition = function () {
                    for (var t = e.controls.querySelectorAll(".xgplayer-definition ul li"), n = 0; n < t.length; n++) if (t[n].className && t[n].className.indexOf("selected") > -1) return {
                        name: t[n].getAttribute("cname"),
                        url: t[n].getAttribute("url")
                    };
                    return {name: t[0].getAttribute("cname"), url: t[0].getAttribute("url")}
                }, e.switchDefinition = function () {
                    for (var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = e.controls.querySelectorAll(".xgplayer-definition ul li"), r = 0; r < n.length; r++) n[r].getAttribute("cname") !== t.name && n[r].getAttribute("url") !== t.url && r !== t.index || n[r].click()
                }
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        var r = n(124);
        "string" == typeof r && (r = [[e.i, r, ""]]);
        var i = {hmr: !0, transform: void 0, insertInto: void 0};
        n(2)(r, i), r.locals && (e.exports = r.locals)
    }, function (e, t, n) {
        (e.exports = n(1)(!1)).push([e.i, ".xgplayer-skin-default .xgplayer-definition{-webkit-order:5;-moz-box-ordinal-group:6;order:5;width:60px;height:150px;z-index:18;position:relative;outline:none;display:none;cursor:default;margin-left:10px;margin-top:-119px}.xgplayer-skin-default .xgplayer-definition ul{display:none;list-style:none;width:78px;background:rgba(0,0,0,.54);border-radius:1px;position:absolute;bottom:30px;left:0;text-align:center;white-space:nowrap;margin-left:-10px;z-index:26;cursor:pointer}.xgplayer-skin-default .xgplayer-definition ul li{opacity:.7;font-family:PingFangSC-Regular;font-size:11px;color:hsla(0,0%,100%,.8);padding:6px 13px}.xgplayer-skin-default .xgplayer-definition ul li.selected,.xgplayer-skin-default .xgplayer-definition ul li:hover{color:#fff;opacity:1}.xgplayer-skin-default .xgplayer-definition .name{text-align:center;font-family:PingFangSC-Regular;font-size:13px;cursor:pointer;color:hsla(0,0%,100%,.8);position:absolute;bottom:0;width:60px;height:20px;line-height:20px;background:rgba(0,0,0,.38);border-radius:10px;display:inline-block;vertical-align:middle}.xgplayer-skin-default.xgplayer-definition-active .xgplayer-definition ul,.xgplayer-skin-default.xgplayer-is-definition .xgplayer-definition{display:block}", ""])
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r, i = n(0), a = n(5), o = (r = a) && r.__esModule ? r : {default: r};
        n(126), t.default = {
            name: "s_playbackRate", method: function () {
                var e = this, t = [];
                if (!e.config.playbackRate) return !1;
                (t = [].concat(e.config.playbackRate)).sort((function (e, t) {
                    return t - e
                }));
                var n = void 0 !== e.config.playbackRateUnit ? e.config.playbackRateUnit : "x",
                    r = (0, i.createDom)("xg-playbackrate", " ", {}, "xgplayer-playbackrate");
                "mobile" === o.default.device && (e.config.playbackRateActive = "click");
                var a = [];
                t.forEach((function (e) {
                    a.push({name: "" + e, rate: "" + e + n, selected: !1})
                }));
                var l = 1, s = ["<ul>"];
                a.forEach((function (t) {
                    e.config.defaultPlaybackRate && e.config.defaultPlaybackRate.toString() === t.name ? (t.selected = !0, l = e.config.defaultPlaybackRate, e.once("playing", (function () {
                        e.video.playbackRate = e.config.defaultPlaybackRate
                    }))) : "1.0" !== t.name && "1" !== t.name || e.config.defaultPlaybackRate && 1 !== e.config.defaultPlaybackRate || (t.selected = !0), s.push("<li cname='" + t.name + "' class='" + (t.selected ? "selected" : "") + "'>" + t.rate + "</li>")
                })), s.push("</ul><p class='name'>" + l + n + "</p>");
                var c = e.root.querySelector(".xgplayer-playbackrate");
                if (c) {
                    c.innerHTML = s.join("");
                    var u = c.querySelector(".name");
                    e.config.playbackRateActive && "hover" !== e.config.playbackRateActive || u.addEventListener("mouseenter", (function (t) {
                        t.preventDefault(), t.stopPropagation(), (0, i.addClass)(e.root, "xgplayer-playbackrate-active"), c.focus()
                    }))
                } else {
                    r.innerHTML = s.join("");
                    var p = r.querySelector(".name");
                    e.config.playbackRateActive && "hover" !== e.config.playbackRateActive || p.addEventListener("mouseenter", (function (t) {
                        t.preventDefault(), t.stopPropagation(), (0, i.addClass)(e.root, "xgplayer-playbackrate-active"), r.focus()
                    })), e.once("ready", (function () {
                        e.controls.appendChild(r)
                    }))
                }
                ["touchend", "click"].forEach((function (t) {
                    r.addEventListener(t, (function (t) {
                        t.stopPropagation(), t.preventDefault();
                        var s = t.target;
                        if (s && "li" === s.tagName.toLocaleLowerCase()) {
                            var c, u = void 0;
                            a.forEach((function (t) {
                                t.selected = !1, s.textContent.replace(/\s+/g, "") === t.rate && (Array.prototype.forEach.call(s.parentNode.childNodes, (function (e) {
                                    (0, i.hasClass)(e, "selected") && (u = Number(e.getAttribute("cname")), (0, i.removeClass)(e, "selected"))
                                })), t.selected = !0, e.video.playbackRate = 1 * t.name, l = 1 * t.name)
                            })), (0, i.addClass)(s, "selected"), c = Number(s.getAttribute("cname")), s.parentNode.nextSibling.innerHTML = "" + s.getAttribute("cname") + n, e.emit("playbackrateChange", {
                                from: u,
                                to: c
                            }), "mobile" === o.default.device && (0, i.removeClass)(e.root, "xgplayer-playbackrate-active")
                        } else "click" !== e.config.playbackRateActive || !s || "p" !== s.tagName.toLocaleLowerCase() && "span" !== s.tagName.toLocaleLowerCase() || ("mobile" === o.default.device ? (0, i.toggleClass)(e.root, "xgplayer-playbackrate-active") : (0, i.addClass)(e.root, "xgplayer-playbackrate-active"), r.focus());
                        e.emit("focus")
                    }), !1)
                })), r.addEventListener("mouseleave", (function (t) {
                    t.preventDefault(), t.stopPropagation(), (0, i.removeClass)(e.root, "xgplayer-playbackrate-active")
                })), e.on("blur", (function () {
                    (0, i.removeClass)(e.root, "xgplayer-playbackrate-active")
                })), e.on("play", (function () {
                    e.video.playbackRate.toFixed(1) !== l.toFixed(1) && (e.video.playbackRate = l)
                })), e.switchPlaybackRate = function () {
                    for (var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = e.controls.querySelectorAll(".xgplayer-playbackrate ul li"), r = 0; r < n.length; r++) (0, i.hasClass)(n[r], "selected") || n[r].getAttribute("cname") !== "" + t.playbackRate && r !== t.index || n[r].click()
                }, e.on("ratechange", (function () {
                    e.switchPlaybackRate({playbackRate: e.playbackRate})
                }))
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        var r = n(127);
        "string" == typeof r && (r = [[e.i, r, ""]]);
        var i = {hmr: !0, transform: void 0, insertInto: void 0};
        n(2)(r, i), r.locals && (e.exports = r.locals)
    }, function (e, t, n) {
        (e.exports = n(1)(!1)).push([e.i, ".xgplayer-skin-default .xgplayer-playbackrate{-webkit-order:8;-moz-box-ordinal-group:9;order:8;width:60px;height:150px;z-index:18;position:relative;display:inline-block;cursor:default;margin-top:-119px}.xgplayer-skin-default .xgplayer-playbackrate ul{display:none;list-style:none;width:78px;background:rgba(0,0,0,.54);border-radius:1px;position:absolute;bottom:30px;left:50%;-webkit-transform:translateX(-50%);-ms-transform:translateX(-50%);transform:translateX(-50%);text-align:left;white-space:nowrap;z-index:26;cursor:pointer}.xgplayer-skin-default .xgplayer-playbackrate ul li{opacity:.7;font-family:PingFangSC-Regular;font-size:11px;color:hsla(0,0%,100%,.8);position:relative;padding:4px 0;text-align:center}.xgplayer-skin-default .xgplayer-playbackrate ul li.selected,.xgplayer-skin-default .xgplayer-playbackrate ul li:hover{color:#fff;opacity:1}.xgplayer-skin-default .xgplayer-playbackrate ul li:first-child{position:relative;margin-top:12px}.xgplayer-skin-default .xgplayer-playbackrate ul li:last-child{position:relative;margin-bottom:12px}.xgplayer-skin-default .xgplayer-playbackrate .name{width:60px;height:20px;position:absolute;bottom:0;text-align:center;font-family:PingFangSC-Regular;font-size:13px;background:rgba(0,0,0,.38);color:hsla(0,0%,100%,.8);border-radius:10px;line-height:20px}.xgplayer-skin-default .xgplayer-playbackrate span{position:relative;top:19px;font-weight:700;text-shadow:0 0 4px rgba(0,0,0,.6)}.xgplayer-skin-default .xgplayer-playbackrate:hover{opacity:1}.xgplayer-skin-default.xgplayer-playbackrate-active .xgplayer-playbackrate ul{display:block}", ""])
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(0);
        t.default = {
            name: "s_localPreview", method: function () {
                var e = this;
                if (e.config.preview && e.config.preview.uploadEl) {
                    var t = (0, r.createDom)("xg-preview", '<input type="file">', {}, "xgplayer-preview"),
                        n = t.querySelector("input");
                    e.config.preview.uploadEl.appendChild(t), n.onchange = function () {
                        e.emit("upload", n)
                    }
                }
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r, i = n(0), a = n(130), o = (r = a) && r.__esModule ? r : {default: r};
        n(131), t.default = {
            name: "s_download", method: function () {
                var e = this;
                if (e.config.download) {
                    var t = (0, i.createDom)("xg-download", '<xg-icon class="xgplayer-icon">' + o.default + "</xg-icon>", {}, "xgplayer-download"),
                        n = e.lang.DOWNLOAD_TIPS,
                        r = (0, i.createDom)("xg-tips", '<span class="xgplayer-tip-download">' + n + "</span>", {}, "xgplayer-tips");
                    t.appendChild(r), e.once("ready", (function () {
                        e.controls.appendChild(t)
                    })), ["click", "touchend"].forEach((function (n) {
                        t.addEventListener(n, (function (t) {
                            t.preventDefault(), t.stopPropagation(), e.userGestureTrigEvent("downloadBtnClick")
                        }))
                    }))
                }
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        n.r(t), t.default = '<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">\n  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n    <g transform="translate(-488.000000, -340.000000)" fill="#FFFFFF">\n      <g id="Group-2">\n        <g id="volme_big-copy" transform="translate(488.000000, 340.000000)">\n          <rect id="Rectangle-18" x="11" y="4" width="2" height="12" rx="1"></rect>\n          <rect id="Rectangle-2" x="3" y="18" width="18" height="2" rx="1"></rect>\n          <rect id="Rectangle-2" transform="translate(4.000000, 17.500000) rotate(90.000000) translate(-4.000000, -17.500000) " x="1.5" y="16.5" width="5" height="2" rx="1"></rect><rect id="Rectangle-2-Copy-3" transform="translate(20.000000, 17.500000) rotate(90.000000) translate(-20.000000, -17.500000) " x="17.5" y="16.5" width="5" height="2" rx="1"></rect>\n          <path d="M9.48791171,8.26502656 L9.48791171,14.2650266 C9.48791171,14.8173113 9.04019646,15.2650266 8.48791171,15.2650266 C7.93562696,15.2650266 7.48791171,14.8173113 7.48791171,14.2650266 L7.48791171,7.26502656 C7.48791171,6.71274181 7.93562696,6.26502656 8.48791171,6.26502656 L15.4879117,6.26502656 C16.0401965,6.26502656 16.4879117,6.71274181 16.4879117,7.26502656 C16.4879117,7.81731131 16.0401965,8.26502656 15.4879117,8.26502656 L9.48791171,8.26502656 Z" id="Combined-Shape" transform="translate(11.987912, 10.765027) scale(1, -1) rotate(45.000000) translate(-11.987912, -10.765027) "></path>\n        </g>\n      </g>\n    </g>\n  </g>\n</svg>\n'
    }, function (e, t, n) {
        var r = n(132);
        "string" == typeof r && (r = [[e.i, r, ""]]);
        var i = {hmr: !0, transform: void 0, insertInto: void 0};
        n(2)(r, i), r.locals && (e.exports = r.locals)
    }, function (e, t, n) {
        (e.exports = n(1)(!1)).push([e.i, ".xgplayer-skin-default .xgplayer-download{position:relative;-webkit-order:9;-moz-box-ordinal-group:10;order:9;display:block;cursor:pointer}.xgplayer-skin-default .xgplayer-download .xgplayer-icon{margin-top:3px}.xgplayer-skin-default .xgplayer-download .xgplayer-icon div{position:absolute}.xgplayer-skin-default .xgplayer-download .xgplayer-icon svg{position:relative;top:5px;left:5px}.xgplayer-skin-default .xgplayer-download .xgplayer-tips{margin-left:-20px}.xgplayer-skin-default .xgplayer-download .xgplayer-tips .xgplayer-tip-download{display:block}.xgplayer-skin-default .xgplayer-download:hover{opacity:.85}.xgplayer-skin-default .xgplayer-download:hover .xgplayer-tips{display:block}.xgplayer-lang-is-en .xgplayer-download .xgplayer-tips{margin-left:-32px}.xgplayer-lang-is-jp .xgplayer-download .xgplayer-tips{margin-left:-40px}", ""])
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(0), i = o(n(134)), a = o(n(136));

        function o(e) {
            return e && e.__esModule ? e : {default: e}
        }

        n(137), t.default = {
            name: "s_danmu", method: function () {
                var e = this, t = e.root;
                if (e.config.danmu) {
                    var n = (0, r.createDom)("xg-danmu", "", {}, "xgplayer-danmu");
                    e.once("ready", (function () {
                        t.appendChild(n)
                    }));
                    var o = (0, r.deepCopy)({
                        container: n,
                        player: e.video,
                        comments: [],
                        area: {start: 0, end: 1}
                    }, e.config.danmu), l = void 0;
                    e.config.danmu.panel && (l = (0, r.createDom)("xg-panel", '<xg-panel-icon class="xgplayer-panel-icon">\n                                                ' + a.default + '\n                                              </xg-panel-icon>\n                                              <xg-panel-slider class="xgplayer-panel-slider">\n                                                <xg-hidemode class="xgplayer-hidemode">\n                                                  <p class="xgplayer-hidemode-font">屏蔽类型</p>\n                                                  <ul class="xgplayer-hidemode-radio">\n                                                    <li class="xgplayer-hidemode-scroll" id="false">滚动</li><li class="xgplayer-hidemode-top" id="false">顶部</li><li class="xgplayer-hidemode-bottom" id="false">底部</li><li class="xgplayer-hidemode-color" id="false">色彩</li>\n                                                  </ul>\n                                                </xg-hidemode>\n                                                <xg-transparency class="xgplayer-transparency">\n                                                  <span>不透明度</span>\n                                                  <input class="xgplayer-transparency-line xgplayer-transparency-color xgplayer-transparency-bar xgplayer-transparency-gradient" type="range" min="0" max="100" step="0.1" value="50"></input>\n                                                </xg-transparency>\n                                                <xg-showarea class="xgplayer-showarea">\n                                                  <div class="xgplayer-showarea-name">显示区域</div>\n                                                  <div class="xgplayer-showarea-control">\n                                                    <div class="xgplayer-showarea-control-up">\n                                                      <span class="xgplayer-showarea-control-up-item xgplayer-showarea-onequarters">1/4</span>\n                                                      <span class="xgplayer-showarea-control-up-item xgplayer-showarea-twoquarters selected-color">1/2</span>\n                                                      <span class="xgplayer-showarea-control-up-item xgplayer-showarea-threequarters">3/4</span>\n                                                      <span class="xgplayer-showarea-control-up-item xgplayer-showarea-full">1</span>\n                                                    </div>\n                                                    <div class="xgplayer-showarea-control-down">\n                                                      <div class="xgplayer-showarea-control-down-dots">\n                                                        <span class="xgplayer-showarea-onequarters-dot"></span>\n                                                        <span class="xgplayer-showarea-twoquarters-dot"></span>\n                                                        <span class="xgplayer-showarea-threequarters-dot"></span>\n                                                        <span class="xgplayer-showarea-full-dot"></span>\n                                                      </div>\n                                                      <input class="xgplayer-showarea-line xgplayer-showarea-color xgplayer-showarea-bar xgplayer-gradient" type="range" min="1" max="4" step="1" value="1">\n                                                    </div>\n                                                  </div>\n                                                </xg-showarea>\n                                                <xg-danmuspeed class="xgplayer-danmuspeed">\n                                                  <div class="xgplayer-danmuspeed-name">弹幕速度</div>\n                                                  <div class="xgplayer-danmuspeed-control">\n                                                    <div class="xgplayer-danmuspeed-control-up">\n                                                      <span class="xgplayer-danmuspeed-control-up-item xgplayer-danmuspeed-small">慢</span>\n                                                      <span class="xgplayer-danmuspeed-control-up-item xgplayer-danmuspeed-middle selected-color">中</span>\n                                                      <span class="xgplayer-danmuspeed-control-up-item xgplayer-danmuspeed-large">快</span>\n                                                    </div>\n                                                    <div class="xgplayer-danmuspeed-control-down">\n                                                      <div class="xgplayer-danmuspeed-control-down-dots">\n                                                        <span class="xgplayer-danmuspeed-small-dot"></span>\n                                                        <span class="xgplayer-danmuspeed-middle-dot"></span>\n                                                        <span class="xgplayer-danmuspeed-large-dot"></span>\n                                                      </div>\n                                                      <input class="xgplayer-danmuspeed-line xgplayer-danmuspeed-color xgplayer-danmuspeed-bar xgplayer-gradient" type="range" min="50" max="150" step="50" value="100">\n                                                    </div>\n                                                  </div>\n                                                </xg-danmuspeed>\n                                                <xg-danmufont class="xgplayer-danmufont">\n                                                  <div class="xgplayer-danmufont-name">字体大小</div>\n                                                  <div class="xgplayer-danmufont-control">\n                                                    <div class="xgplayer-danmufont-control-up">\n                                                      <span class="xgplayer-danmufont-control-up-item xgplayer-danmufont-small">小</span>\n                                                      <span class="xgplayer-danmufont-control-up-item xgplayer-danmufont-middle">中</span>\n                                                      <span class="xgplayer-danmufont-control-up-item xgplayer-danmufont-large selected-color">大</span>\n                                                    </div>\n                                                    <div class="xgplayer-danmufont-control-down">\n                                                      <div class="xgplayer-danmufont-control-down-dots">\n                                                        <span class="xgplayer-danmufont-small-dot"></span>\n                                                        <span class="xgplayer-danmufont-middle-dot"></span>\n                                                        <span class="xgplayer-danmufont-large-dot"></span>\n                                                      </div>\n                                                      <input class="xgplayer-danmufont-line xgplayer-danmufont-color xgplayer-danmufont-bar xgplayer-gradient" type="range" min="20" max="30" step="5" value="25">\n                                                    </div>\n                                                  </div>\n                                                </xg-danmufont>\n                                              </xg-panel-slider>', {tabindex: 7}, "xgplayer-panel"), e.once("ready", (function () {
                        e.controls.appendChild(l)
                    }))), e.once("complete", (function () {
                        var t = new i.default(o);
                        if (e.emit("initDefaultDanmu", t), e.danmu = t, e.config.danmu.panel) {
                            var n = l.querySelector(".xgplayer-panel-slider"), a = void 0;
                            ["mouseenter", "touchend", "click"].forEach((function (e) {
                                l.addEventListener(e, (function (e) {
                                    e.preventDefault(), e.stopPropagation(), (0, r.addClass)(n, "xgplayer-panel-active"), l.focus(), a = !0
                                }))
                            })), l.addEventListener("mouseleave", (function (e) {
                                e.preventDefault(), e.stopPropagation(), (0, r.removeClass)(n, "xgplayer-panel-active"), a = !1
                            })), n.addEventListener("mouseleave", (function (e) {
                                e.preventDefault(), e.stopPropagation(), !1 === a && (0, r.removeClass)(n, "xgplayer-panel-active")
                            }));
                            var s = e.config.danmu, c = {
                                scroll: l.querySelector(".xgplayer-hidemode-scroll"),
                                top: l.querySelector(".xgplayer-hidemode-top"),
                                bottom: l.querySelector(".xgplayer-hidemode-bottom"),
                                color: l.querySelector(".xgplayer-hidemode-color")
                            }, u = function (t) {
                                var n = t;
                                ["touchend", "click"].forEach((function (t) {
                                    c[n].addEventListener(t, (function (t) {
                                        "true" !== c[n].getAttribute("id") ? (c[n].style.color = "#f85959", c[n].setAttribute("id", "true"), e.danmu.hide(n)) : (c[n].style.color = "#aaa", c[n].setAttribute("id", "false"), e.danmu.show(n))
                                    }))
                                }))
                            };
                            for (var p in c) u(p);
                            var d = l.querySelector(".xgplayer-transparency-line"),
                                f = l.querySelector(".xgplayer-transparency-gradient"), g = 50;
                            if (f.style.background = "linear-gradient(to right, #f85959 0%, #f85959 " + g + "%, #aaa " + g + "%, #aaa)", d.addEventListener("input", (function (e) {
                                e.preventDefault(), e.stopPropagation(), g = e.target.value, f.style.background = "linear-gradient(to right, #f85959 0%, #f85959 " + g + "%, #aaa " + g + "%, #aaa)", s.comments.forEach((function (e) {
                                    e.style.opacity = g / 100
                                }))
                            })), l.querySelector(".xgplayer-showarea-line").addEventListener("input", (function (t) {
                                t.preventDefault(), t.stopPropagation();
                                var n = t.target.value;
                                e.danmu.config.area.end = n / 100, e.config.danmu.area.end = n / 100, e.danmu.bulletBtn.main.channel.resize()
                            })), l.querySelector(".xgplayer-danmuspeed-line").addEventListener("input", (function (e) {
                                e.preventDefault(), e.stopPropagation();
                                var t = e.target.value;
                                s.comments.forEach((function (e) {
                                    e.duration = 100 * (200 - t)
                                }))
                            })), l.querySelector(".xgplayer-danmufont-line").addEventListener("input", (function (e) {
                                e.preventDefault(), e.stopPropagation();
                                var t = e.target.value;
                                s.comments.forEach((function (e) {
                                    e.style.fontSize = t + "px"
                                }))
                            })), navigator.userAgent.indexOf("Firefox") > -1) for (var h = 0; h < n.querySelectorAll("input").length; h++) n.querySelectorAll("input")[h].style.marginTop = "10px"
                        }
                    }))
                }
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        (function (e) {
            var n, r, i, a, o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            };
            window, a = function () {
                return function (e) {
                    var t = {};

                    function n(r) {
                        if (t[r]) return t[r].exports;
                        var i = t[r] = {i: r, l: !1, exports: {}};
                        return e[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports
                    }

                    return n.m = e, n.c = t, n.d = function (e, t, r) {
                        n.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: r})
                    }, n.r = function (e) {
                        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
                    }, n.t = function (e, t) {
                        if (1 & t && (e = n(e)), 8 & t) return e;
                        if (4 & t && "object" == (void 0 === e ? "undefined" : o(e)) && e && e.__esModule) return e;
                        var r = Object.create(null);
                        if (n.r(r), Object.defineProperty(r, "default", {
                            enumerable: !0,
                            value: e
                        }), 2 & t && "string" != typeof e) for (var i in e) n.d(r, i, function (t) {
                            return e[t]
                        }.bind(null, i));
                        return r
                    }, n.n = function (e) {
                        var t = e && e.__esModule ? function () {
                            return e.default
                        } : function () {
                            return e
                        };
                        return n.d(t, "a", t), t
                    }, n.o = function (e, t) {
                        return Object.prototype.hasOwnProperty.call(e, t)
                    }, n.p = "", n(n.s = 4)
                }([function (e, t, n) {
                    function r(e, t) {
                        return e.classList ? Array.prototype.some.call(e.classList, (function (e) {
                            return e === t
                        })) : !!e.className.match(new RegExp("(\\s|^)" + t + "(\\s|$)"))
                    }

                    function i(e, t) {
                        e.classList ? t.replace(/(^\s+|\s+$)/g, "").split(/\s+/g).forEach((function (t) {
                            t && e.classList.add(t)
                        })) : r(e, t) || (e.className += " " + t)
                    }

                    function a(e, t) {
                        e.classList ? t.split(/\s+/g).forEach((function (t) {
                            e.classList.remove(t)
                        })) : r(e, t) && t.split(/\s+/g).forEach((function (t) {
                            var n = new RegExp("(\\s|^)" + t + "(\\s|$)");
                            e.className = e.className.replace(n, " ")
                        }))
                    }

                    function o(e) {
                        return Object.prototype.toString.call(e).match(/([^\s.*]+)(?=]$)/g)[0]
                    }

                    Object.defineProperty(t, "__esModule", {value: !0}), t.createDom = function () {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "div",
                            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                            n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                            r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "",
                            i = document.createElement(e);
                        return i.className = r, i.innerHTML = t, Object.keys(n).forEach((function (t) {
                            var r = t, a = n[t];
                            "video" === e || "audio" === e ? a && i.setAttribute(r, a) : i.setAttribute(r, a)
                        })), i
                    }, t.hasClass = r, t.addClass = i, t.removeClass = a, t.toggleClass = function (e, t) {
                        t.split(/\s+/g).forEach((function (t) {
                            r(e, t) ? a(e, t) : i(e, t)
                        }))
                    }, t.findDom = function () {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : document,
                            t = arguments[1], n = void 0;
                        try {
                            n = e.querySelector(t)
                        } catch (r) {
                            t.startsWith("#") && (n = e.getElementById(t.slice(1)))
                        }
                        return n
                    }, t.deepCopy = function e(t, n) {
                        if ("Object" === o(n) && "Object" === o(t)) return Object.keys(n).forEach((function (r) {
                            "Object" !== o(n[r]) || n[r] instanceof Node ? "Array" === o(n[r]) ? t[r] = "Array" === o(t[r]) ? t[r].concat(n[r]) : n[r] : t[r] = n[r] : t[r] ? e(t[r], n[r]) : t[r] = n[r]
                        })), t
                    }, t.typeOf = o, t.copyDom = function (e) {
                        if (e && 1 === e.nodeType) {
                            var t = document.createElement(e.tagName);
                            return Array.prototype.forEach.call(e.attributes, (function (e) {
                                t.setAttribute(e.name, e.value)
                            })), e.innerHTML && (t.innerHTML = e.innerHTML), t
                        }
                        return ""
                    }, t.attachEventListener = function (e, t, n, r) {
                        var i, a, o, l;
                        r ? (e.on(t, n), a = t, o = n, l = r, (i = e).once(l, (function e() {
                            i.off(a, o), i.off(l, e)
                        }))) : e.on(t, (function r(i) {
                            n(i), e.off(t, r)
                        }))
                    }, t.styleUtil = function (e, t, n) {
                        var r = e.style;
                        try {
                            r[t] = n
                        } catch (i) {
                            r.setProperty(t, n)
                        }
                    }, t.isNumber = function (e) {
                        return "number" == typeof e && !Number.isNaN(e)
                    }, t.throttle = function (e, t) {
                        var n = this, r = 0;
                        return function () {
                            for (var i = arguments.length, a = Array(i), o = 0; o < i; o++) a[o] = arguments[o];
                            clearTimeout(r), r = setTimeout((function () {
                                return e.apply(n, a)
                            }), t)
                        }
                    }, t.hasOwnProperty = Object.prototype.hasOwnProperty
                }, function (e, t, n) {
                    Object.defineProperty(t, "__esModule", {value: !0});
                    var r, i = function () {
                        function e(e, t) {
                            for (var n = 0; n < t.length; n++) {
                                var r = t[n];
                                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                            }
                        }

                        return function (t, n, r) {
                            return n && e(t.prototype, n), r && e(t, r), t
                        }
                    }(), a = (r = n(26)) && r.__esModule ? r : {default: r}, o = function () {
                        function e() {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, e)
                        }

                        return i(e, [{
                            key: "setLogger", value: function () {
                                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                                this.logger = new a.default(e + ".js")
                            }
                        }]), e
                    }();
                    t.default = o, e.exports = t.default
                }, function (e, t, n) {
                    var r = n(18)();
                    e.exports = function (e) {
                        return e !== r && null !== e
                    }
                }, function (e, t, n) {
                    e.exports = function (e) {
                        return null != e
                    }
                }, function (e, t, n) {
                    Object.defineProperty(t, "__esModule", {value: !0});
                    var r, i = (r = n(5)) && r.__esModule ? r : {default: r};
                    n(34), t.default = i.default, e.exports = t.default
                }, function (e, t, n) {
                    Object.defineProperty(t, "__esModule", {value: !0}), t.DanmuJs = void 0;
                    var r = function () {
                        function e(e, t) {
                            for (var n = 0; n < t.length; n++) {
                                var r = t[n];
                                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                            }
                        }

                        return function (t, n, r) {
                            return n && e(t.prototype, n), r && e(t, r), t
                        }
                    }(), i = d(n(6)), a = n(25), l = d(n(1)), s = d(n(27)), c = d(n(32)), u = n(33), p = n(0);

                    function d(e) {
                        return e && e.__esModule ? e : {default: e}
                    }

                    function f(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != (void 0 === t ? "undefined" : o(t)) && "function" != typeof t ? e : t
                    }

                    var g = t.DanmuJs = function (e) {
                        function t(e) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, t);
                            var n = f(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this)), r = n;
                            r.setLogger("danmu"), r.logger && r.logger.info("danmu.js version: " + a.version);
                            var o = r.config = {
                                overlap: !1,
                                area: {start: 0, end: 1, lines: void 0},
                                live: !1,
                                comments: [],
                                direction: "r2l",
                                needResizeObserver: !1,
                                dropStaleComments: !1,
                                channelSize: void 0,
                                maxCommentsLength: void 0,
                                bulletOffset: void 0,
                                interval: 2e3
                            };
                            if ((0, p.deepCopy)(o, e), (0, i.default)(r), r.hideArr = [], r.domObj = new c.default, r.freezeId = null, o.comments.forEach((function (e) {
                                e.duration = e.duration ? e.duration : 5e3, e.mode || (e.mode = "scroll")
                            })), r.container = o.container && 1 === o.container.nodeType ? o.container : null, !r.container) return r.emit("error", "container id can't be empty"), f(n, !1);
                            if (o.containerStyle) {
                                var l = o.containerStyle;
                                Object.keys(l).forEach((function (e) {
                                    r.container.style[e] = l[e]
                                }))
                            }
                            return r.live = o.live, r.player = o.player, r.direction = o.direction, (0, p.addClass)(r.container, "danmu"), r.bulletBtn = new s.default(r), r.main = r.bulletBtn.main, r.isReady = !0, r.emit("ready"), n.logger && n.logger.info("ready"), n.addResizeObserver(), n
                        }

                        return function (e, t) {
                            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === t ? "undefined" : o(t)));
                            e.prototype = Object.create(t && t.prototype, {
                                constructor: {
                                    value: e,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                        }(t, e), r(t, [{
                            key: "addResizeObserver", value: function () {
                                var e = this;
                                this.config.needResizeObserver && (0, u.addObserver)(this.container, (function () {
                                    e.logger && e.logger.info("needResizeObserver"), e.resize()
                                }))
                            }
                        }, {
                            key: "start", value: function () {
                                this.logger && this.logger.info("start"), this.main.start()
                            }
                        }, {
                            key: "pause", value: function () {
                                this.logger && this.logger.info("pause"), this.main.pause()
                            }
                        }, {
                            key: "play", value: function () {
                                this.logger && this.logger.info("play"), this.main.play()
                            }
                        }, {
                            key: "stop", value: function () {
                                this.logger && this.logger.info("stop"), this.main.stop()
                            }
                        }, {
                            key: "clear", value: function () {
                                this.logger && this.logger.info("clear"), this.main.clear()
                            }
                        }, {
                            key: "destroy", value: function () {
                                for (var e in (0, u.unObserver)(this.container), this.logger && this.logger.info("destroy"), this.stop(), this.bulletBtn.destroy(), this.domObj.destroy(), this) delete this[e];
                                this.emit("destroy")
                            }
                        }, {
                            key: "sendComment", value: function (e) {
                                this.logger && this.logger.info("sendComment: " + (e.txt || "[DOM Element]")), e.duration || (e.duration = 15e3), e && e.id && e.duration && (e.el || e.txt) && (e.duration = e.duration ? e.duration : 5e3, e.style || (e.style = {
                                    opacity: void 0,
                                    fontSize: void 0
                                }), e.style && (this.opacity && this.opacity !== e.style.opacity && (e.style.opacity = this.opacity), this.fontSize && this.fontSize !== e.style.fontSize && (e.style.fontSize = this.fontSize)), e.prior || e.realTime ? (this.main.data.unshift(e), e.realTime && (this.main.readData(), this.main.dataHandle())) : this.main.data.push(e))
                            }
                        }, {
                            key: "setCommentID", value: function (e, t) {
                                var n = this;
                                this.logger && this.logger.info("setCommentID: oldID " + e + " newID " + t), e && t && (this.main.data.some((function (n) {
                                    return n.id === e && (n.id = t, !0)
                                })), this.main.queue.some((function (r) {
                                    return r.id === e && (r.id = t, r.pauseMove(), "paused" !== n.main.status && r.startMove(), !0)
                                })))
                            }
                        }, {
                            key: "setCommentDuration", value: function (e, t) {
                                var n = this;
                                this.logger && this.logger.info("setCommentDuration: id " + e + " duration " + t), e && t && (t = t || 5e3, this.main.data.some((function (n) {
                                    return n.id === e && (n.duration = t, !0)
                                })), this.main.queue.some((function (r) {
                                    return r.id === e && (r.duration = t, r.pauseMove(), "paused" !== n.main.status && r.startMove(), !0)
                                })))
                            }
                        }, {
                            key: "setCommentLike", value: function (e, t) {
                                this.logger && this.logger.info("setCommentLike: id " + e + " like " + t), e && t && (this.main.data.some((function (n) {
                                    return n.id === e && (n.like = t, !0)
                                })), this.main.queue.some((function (n) {
                                    return n.id === e && (n.pauseMove(), n.setLikeDom(t.el, t.style), "paused" !== n.danmu.main.status && n.startMove(), !0)
                                })))
                            }
                        }, {
                            key: "restartComment", value: function (e) {
                                if (this.logger && this.logger.info("restartComment: id " + e), e) {
                                    var t = this.main;
                                    if (this._releaseCtrl(e), "closed" === t.status) return;
                                    t.queue.some((function (n) {
                                        return n.id === e && ("paused" !== t.status ? n.startMove(!0) : n.status = "paused", !0)
                                    }))
                                }
                            }
                        }, {
                            key: "_releaseCtrl", value: function (e) {
                                this.freezeId && e === this.freezeId && (this.mouseControl = !1, this.freezeId = null)
                            }
                        }, {
                            key: "_freezeCtrl", value: function (e) {
                                this.mouseControl = !0, this.freezeId = e
                            }
                        }, {
                            key: "freezeComment", value: function (e) {
                                this.logger && this.logger.info("freezeComment: id " + e), e && (this._freezeCtrl(e), this.main.queue.some((function (t) {
                                    return t.id === e && (t.status = "forcedPause", t.pauseMove(), t.el && t.el.style && (0, p.styleUtil)(t.el, "zIndex", 10), !0)
                                })))
                            }
                        }, {
                            key: "removeComment", value: function (e) {
                                this.logger && this.logger.info("removeComment: id " + e), e && (this._releaseCtrl(e), this.main.queue.some((function (t) {
                                    return t.id === e && (t.remove(), !0)
                                })), this.main.data = this.main.data.filter((function (t) {
                                    return t.id !== e
                                })))
                            }
                        }, {
                            key: "updateComments", value: function (e) {
                                var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                                    n = this.config, r = this.main, i = this.player, a = [], o = 0;
                                if (this.logger && this.logger.info("updateComments: " + e.length + ", isClear " + t), "boolean" == typeof t && t && (r.data = []), r.data = r.data.concat(e), r.sortData(), "number" == typeof n.maxCommentsLength && r.data.length > n.maxCommentsLength) {
                                    o = r.data.length - n.maxCommentsLength;
                                    for (var l, s = 0; s < o; s++) (l = r.data[s]).prior && !l.attached_ && a.push(r.data[s])
                                } else if (n.dropStaleComments && i && i.currentTime) {
                                    var c = Math.floor(1e3 * i.currentTime) - n.interval;
                                    if (c > 0) for (var u, p = 0; p < r.data.length; p++) if ((u = r.data[p]).prior && !u.attached_ && a.push(r.data[p]), u.start > c) {
                                        o = p;
                                        break
                                    }
                                    o > 0 && (r.data.splice(0, o), r.data = a.concat(r.data))
                                }
                            }
                        }, {
                            key: "willChange", value: function () {
                                var e = this.container, t = this.main;
                                e.style.willChange = "opacity", t.willChanges.push("contents"), t.queue.forEach((function (e) {
                                    e.willChange()
                                }))
                            }
                        }, {
                            key: "stopWillChange", value: function () {
                                this.container.style.willChange = "", this.main.willChanges.splice(0), this.main.queue.forEach((function (e) {
                                    e.willChange()
                                }))
                            }
                        }, {
                            key: "setAllDuration", value: function () {
                                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "scroll",
                                    t = this, n = arguments[1],
                                    r = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                                this.logger && this.logger.info("setAllDuration: mode " + e + " duration " + n + " force " + r), n && (n = n || 5e3, r && (this.main.forceDuration = n), this.main.data.forEach((function (t) {
                                    e === t.mode && (t.duration = n)
                                })), this.main.queue.forEach((function (r) {
                                    e === r.mode && (r.duration = n, r.pauseMove(), "paused" !== t.main.status && r.startMove())
                                })))
                            }
                        }, {
                            key: "setPlayRate", value: function () {
                                var e = this,
                                    t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "scroll",
                                    n = arguments[1];
                                this.logger && this.logger.info("setPlayRate: " + n), (0, p.isNumber)(n) && n > 0 && (this.main.playRate = n, this.main.queue.forEach((function (n) {
                                    t === n.mode && (n.pauseMove(), "paused" !== e.main.status && n.startMove())
                                })))
                            }
                        }, {
                            key: "setOpacity", value: function (e) {
                                this.logger && this.logger.info("setOpacity: opacity " + e), this.container.style.opacity = e
                            }
                        }, {
                            key: "setFontSize", value: function (e, t) {
                                var n = this,
                                    r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {reflow: !0};
                                this.logger && this.logger.info("setFontSize: size " + e + " channelSize " + t), this.fontSize = e + "px", e && (this.main.data.forEach((function (e) {
                                    e.style && (e.style.fontSize = n.fontSize)
                                })), this.main.queue.forEach((function (e) {
                                    e.options.style || (e.options.style = {}), e.options.style.fontSize = n.fontSize, e.setFontSize(n.fontSize), t && (e.top = e.channel_id[0] * t, e.topInit())
                                }))), t && (this.config.channelSize = t, r.reflow && this.main.channel.resizeSync())
                            }
                        }, {
                            key: "setArea", value: function (e) {
                                this.logger && this.logger.info("setArea: area " + e), this.config.area = e, !1 !== e.reflow && this.main.channel.resizeSync()
                            }
                        }, {
                            key: "hide", value: function () {
                                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "scroll";
                                this.logger && this.logger.info("hide: mode " + e), this.hideArr.indexOf(e) < 0 && this.hideArr.push(e), this.main.queue.filter((function (t) {
                                    return e === t.mode || "color" === e && t.color
                                })).forEach((function (e) {
                                    return e.remove()
                                }))
                            }
                        }, {
                            key: "show", value: function () {
                                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "scroll";
                                this.logger && this.logger.info("show: mode " + e);
                                var t = this.hideArr.indexOf(e);
                                t > -1 && this.hideArr.splice(t, 1)
                            }
                        }, {
                            key: "setDirection", value: function () {
                                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "r2l";
                                this.logger && this.logger.info("setDirection: direction " + e), this.emit("changeDirection", e)
                            }
                        }, {
                            key: "resize", value: function () {
                                this.logger && this.logger.info("resize"), this.emit("channel_resize")
                            }
                        }, {
                            key: "status", get: function () {
                                return this.main.status
                            }
                        }, {
                            key: "state", get: function () {
                                var e = this.main;
                                return {status: e.status, comments: e.data, bullets: e.queue}
                            }
                        }, {
                            key: "containerPos", get: function () {
                                return this.main.channel.containerPos
                            }
                        }]), t
                    }(l.default);
                    t.default = g
                }, function (e, t, n) {
                    var r, i, a, l, s, c, u, p = n(7), d = n(24), f = Function.prototype.apply,
                        g = Function.prototype.call, h = Object.create, y = Object.defineProperty,
                        m = Object.defineProperties, v = Object.prototype.hasOwnProperty,
                        x = {configurable: !0, enumerable: !1, writable: !0};
                    i = function (e, t) {
                        var n, i;
                        return d(t), i = this, r.call(this, e, n = function () {
                            a.call(i, e, n), f.call(t, this, arguments)
                        }), n.__eeOnceListener__ = t, this
                    }, s = {
                        on: r = function (e, t) {
                            var n;
                            return d(t), v.call(this, "__ee__") ? n = this.__ee__ : (n = x.value = h(null), y(this, "__ee__", x), x.value = null), n[e] ? "object" == o(n[e]) ? n[e].push(t) : n[e] = [n[e], t] : n[e] = t, this
                        }, once: i, off: a = function (e, t) {
                            var n, r, i, a;
                            if (d(t), !v.call(this, "__ee__")) return this;
                            if (!(n = this.__ee__)[e]) return this;
                            if ("object" == o(r = n[e])) for (a = 0; i = r[a]; ++a) i !== t && i.__eeOnceListener__ !== t || (2 === r.length ? n[e] = r[a ? 0 : 1] : r.splice(a, 1)); else r !== t && r.__eeOnceListener__ !== t || delete n[e];
                            return this
                        }, emit: l = function (e) {
                            var t, n, r, i, a;
                            if (v.call(this, "__ee__") && (i = this.__ee__[e])) if ("object" == (void 0 === i ? "undefined" : o(i))) {
                                for (n = arguments.length, a = new Array(n - 1), t = 1; t < n; ++t) a[t - 1] = arguments[t];
                                for (i = i.slice(), t = 0; r = i[t]; ++t) f.call(r, this, a)
                            } else switch (arguments.length) {
                                case 1:
                                    g.call(i, this);
                                    break;
                                case 2:
                                    g.call(i, this, arguments[1]);
                                    break;
                                case 3:
                                    g.call(i, this, arguments[1], arguments[2]);
                                    break;
                                default:
                                    for (n = arguments.length, a = new Array(n - 1), t = 1; t < n; ++t) a[t - 1] = arguments[t];
                                    f.call(i, this, a)
                            }
                        }
                    }, c = {on: p(r), once: p(i), off: p(a), emit: p(l)}, u = m({}, c), e.exports = t = function (e) {
                        return null == e ? h(u) : m(Object(e), c)
                    }, t.methods = s
                }, function (e, t, n) {
                    var r = n(3), i = n(8), a = n(12), o = n(20), l = n(21);
                    (e.exports = function (e, t) {
                        var n, i, s, c, u;
                        return arguments.length < 2 || "string" != typeof e ? (c = t, t = e, e = null) : c = arguments[2], r(e) ? (n = l.call(e, "c"), i = l.call(e, "e"), s = l.call(e, "w")) : (n = s = !0, i = !1), u = {
                            value: t,
                            configurable: n,
                            enumerable: i,
                            writable: s
                        }, c ? a(o(c), u) : u
                    }).gs = function (e, t, n) {
                        var s, c, u, p;
                        return "string" != typeof e ? (u = n, n = t, t = e, e = null) : u = arguments[3], r(t) ? i(t) ? r(n) ? i(n) || (u = n, n = void 0) : n = void 0 : (u = t, t = n = void 0) : t = void 0, r(e) ? (s = l.call(e, "c"), c = l.call(e, "e")) : (s = !0, c = !1), p = {
                            get: t,
                            set: n,
                            configurable: s,
                            enumerable: c
                        }, u ? a(o(u), p) : p
                    }
                }, function (e, t, n) {
                    var r = n(9), i = /^\s*class[\s{/}]/, a = Function.prototype.toString;
                    e.exports = function (e) {
                        return !!r(e) && !i.test(a.call(e))
                    }
                }, function (e, t, n) {
                    var r = n(10);
                    e.exports = function (e) {
                        if ("function" != typeof e) return !1;
                        if (!hasOwnProperty.call(e, "length")) return !1;
                        try {
                            if ("number" != typeof e.length) return !1;
                            if ("function" != typeof e.call) return !1;
                            if ("function" != typeof e.apply) return !1
                        } catch (t) {
                            return !1
                        }
                        return !r(e)
                    }
                }, function (e, t, n) {
                    var r = n(11);
                    e.exports = function (e) {
                        if (!r(e)) return !1;
                        try {
                            return !!e.constructor && e.constructor.prototype === e
                        } catch (t) {
                            return !1
                        }
                    }
                }, function (e, t, n) {
                    var r = n(3), i = {object: !0, function: !0, undefined: !0};
                    e.exports = function (e) {
                        return !!r(e) && hasOwnProperty.call(i, void 0 === e ? "undefined" : o(e))
                    }
                }, function (e, t, n) {
                    e.exports = n(13)() ? Object.assign : n(14)
                }, function (e, t, n) {
                    e.exports = function () {
                        var e, t = Object.assign;
                        return "function" == typeof t && (t(e = {foo: "raz"}, {bar: "dwa"}, {trzy: "trzy"}), e.foo + e.bar + e.trzy === "razdwatrzy")
                    }
                }, function (e, t, n) {
                    var r = n(15), i = n(19), a = Math.max;
                    e.exports = function (e, t) {
                        var n, o, l, s = a(arguments.length, 2);
                        for (e = Object(i(e)), l = function (r) {
                            try {
                                e[r] = t[r]
                            } catch (i) {
                                n || (n = i)
                            }
                        }, o = 1; o < s; ++o) r(t = arguments[o]).forEach(l);
                        if (void 0 !== n) throw n;
                        return e
                    }
                }, function (e, t, n) {
                    e.exports = n(16)() ? Object.keys : n(17)
                }, function (e, t, n) {
                    e.exports = function () {
                        try {
                            return Object.keys("primitive"), !0
                        } catch (e) {
                            return !1
                        }
                    }
                }, function (e, t, n) {
                    var r = n(2), i = Object.keys;
                    e.exports = function (e) {
                        return i(r(e) ? Object(e) : e)
                    }
                }, function (e, t, n) {
                    e.exports = function () {
                    }
                }, function (e, t, n) {
                    var r = n(2);
                    e.exports = function (e) {
                        if (!r(e)) throw new TypeError("Cannot use null or undefined");
                        return e
                    }
                }, function (e, t, n) {
                    var r = n(2), i = Array.prototype.forEach, a = Object.create;
                    e.exports = function (e) {
                        var t = a(null);
                        return i.call(arguments, (function (e) {
                            r(e) && function (e, t) {
                                var n;
                                for (n in e) t[n] = e[n]
                            }(Object(e), t)
                        })), t
                    }
                }, function (e, t, n) {
                    e.exports = n(22)() ? String.prototype.contains : n(23)
                }, function (e, t, n) {
                    var r = "razdwatrzy";
                    e.exports = function () {
                        return "function" == typeof r.contains && !0 === r.contains("dwa") && !1 === r.contains("foo")
                    }
                }, function (e, t, n) {
                    var r = String.prototype.indexOf;
                    e.exports = function (e) {
                        return r.call(this, e, arguments[1]) > -1
                    }
                }, function (e, t, n) {
                    e.exports = function (e) {
                        if ("function" != typeof e) throw new TypeError(e + " is not a function");
                        return e
                    }
                }, function (e) {
                    e.exports = JSON.parse('{"version":"1.1.2"}')
                }, function (e, t, n) {
                    Object.defineProperty(t, "__esModule", {value: !0});
                    var r = function () {
                            function e(e, t) {
                                for (var n = 0; n < t.length; n++) {
                                    var r = t[n];
                                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                                }
                            }

                            return function (t, n, r) {
                                return n && e(t.prototype, n), r && e(t, r), t
                            }
                        }(), i = "undefined" != typeof window && window.location.href.indexOf("danmu-debug") > -1,
                        a = function () {
                            function e(t) {
                                !function (e, t) {
                                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                                }(this, e), this.constructorName = t || ""
                            }

                            return r(e, [{
                                key: "info", value: function (e) {
                                    for (var t, n = arguments.length, r = Array(n > 1 ? n - 1 : 0), a = 1; a < n; a++) r[a - 1] = arguments[a];
                                    i && (t = console).log.apply(t, ["[Danmu Log][" + this.constructorName + "]", e].concat(r))
                                }
                            }]), e
                        }();
                    t.default = a, e.exports = t.default
                }, function (e, t, n) {
                    Object.defineProperty(t, "__esModule", {value: !0});
                    var r = function () {
                        function e(e, t) {
                            for (var n = 0; n < t.length; n++) {
                                var r = t[n];
                                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                            }
                        }

                        return function (t, n, r) {
                            return n && e(t.prototype, n), r && e(t, r), t
                        }
                    }(), i = s(n(1)), a = s(n(28)), l = n(0);

                    function s(e) {
                        return e && e.__esModule ? e : {default: e}
                    }

                    var c = function (e) {
                        function t(e) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, t);
                            var n = function (e, t) {
                                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !t || "object" != (void 0 === t ? "undefined" : o(t)) && "function" != typeof t ? e : t
                            }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                            return n.setLogger("control"), n.danmu = e, n.main = new a.default(e), e.config.defaultOff || n.main.start(), n
                        }

                        return function (e, t) {
                            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === t ? "undefined" : o(t)));
                            e.prototype = Object.create(t && t.prototype, {
                                constructor: {
                                    value: e,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                        }(t, e), r(t, [{
                            key: "createSwitch", value: function () {
                                var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                                return this.logger && this.logger.info("createSwitch"), this.switchBtn = (0, l.createDom)("dk-switch", '<span class="txt">弹</span>', {}, "danmu-switch " + (e ? "danmu-switch-active" : "")), this.switchBtn
                            }
                        }, {
                            key: "destroy", value: function () {
                                for (var e in this.logger && this.logger.info("destroy"), this.main.destroy(), this) l.hasOwnProperty.call(this, e) && delete this[e]
                            }
                        }]), t
                    }(i.default);
                    t.default = c, e.exports = t.default
                }, function (e, t, n) {
                    Object.defineProperty(t, "__esModule", {value: !0});
                    var r = function () {
                        function e(e, t) {
                            for (var n = 0; n < t.length; n++) {
                                var r = t[n];
                                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                            }
                        }

                        return function (t, n, r) {
                            return n && e(t.prototype, n), r && e(t, r), t
                        }
                    }(), i = c(n(1)), a = c(n(29)), l = c(n(30)), s = n(0);

                    function c(e) {
                        return e && e.__esModule ? e : {default: e}
                    }

                    var u = function (e) {
                        function t(e) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, t);
                            var n = function (e, t) {
                                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !t || "object" != (void 0 === t ? "undefined" : o(t)) && "function" != typeof t ? e : t
                            }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                            return n.setLogger("main"), n.danmu = e, n.container = e.container, n.channel = new l.default(e), n.data = [].concat(e.config.comments), n.playedData = [], n.queue = [], n.timer = null, n.playRate = 1, n.retryStatus = "normal", n.interval = e.config.interval, n.willChanges = [], n._status = "idle", (0, s.attachEventListener)(e, "bullet_remove", n.updateQueue.bind(n), "destroy"), (0, s.attachEventListener)(e, "changeDirection", (function (e) {
                                n.danmu.direction = e
                            }), "destroy"), n
                        }

                        return function (e, t) {
                            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === t ? "undefined" : o(t)));
                            e.prototype = Object.create(t && t.prototype, {
                                constructor: {
                                    value: e,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                        }(t, e), r(t, [{
                            key: "_cancelDataHandleTimer", value: function () {
                                this.handleId && (clearTimeout(this.handleId), this.handleId = null), this.handleTimer && (clearTimeout(this.handleTimer), this.handleTimer = null)
                            }
                        }, {
                            key: "destroy", value: function () {
                                for (var e in this.logger && this.logger.info("destroy"), this._cancelDataHandleTimer(), this.channel.destroy(), this.data = [], this) delete this[e]
                            }
                        }, {
                            key: "updateQueue", value: function (e) {
                                this.logger && this.logger.info("updateQueue");
                                var t = this;
                                t.queue.some((function (n, r) {
                                    return n.id === e.bullet.id && (t.queue.splice(r, 1), !0)
                                })), t.data.some((function (t) {
                                    return t.id === e.bullet.id && (t.attached_ = !1, !0)
                                }))
                            }
                        }, {
                            key: "init", value: function () {
                                var e = this;
                                e.logger && e.logger.info("init"), e.retryStatus = "normal", e.sortData(), function t() {
                                    "closed" !== e._status || "stop" !== e.retryStatus ? ("playing" === e._status && (e.readData(), e.dataHandle()), "stop" === e.retryStatus && "paused" !== e._status || (e.handleTimer = setTimeout((function () {
                                        e.handleId = requestAnimationFrame((function () {
                                            t()
                                        }))
                                    }), 250))) : e._cancelDataHandleTimer()
                                }()
                            }
                        }, {
                            key: "start", value: function () {
                                this.logger && this.logger.info("start"), this._status = "playing", this.queue = [], this.container.innerHTML = "", this.channel.reset(), this.init()
                            }
                        }, {
                            key: "stop", value: function () {
                                this.logger && this.logger.info("stop"), this._status = "closed", this.retryStatus = "stop", this.queue = [], this.container.innerHTML = "", this.channel.reset()
                            }
                        }, {
                            key: "clear", value: function () {
                                this.logger && this.logger.info("clear"), this.channel.reset(), this.data = [], this.queue = [], this.container.innerHTML = ""
                            }
                        }, {
                            key: "play", value: function () {
                                var e = this;
                                if ("closed" !== this._status) {
                                    this.logger && this.logger.info("play"), this._status = "playing";
                                    var t = this.channel.channels;
                                    t && t.length > 0 && ["scroll", "top", "bottom"].forEach((function (n) {
                                        e.queue.forEach((function (e) {
                                            e.startMove(), e.resized = !0
                                        }));
                                        for (var r = 0; r < t.length; r++) t[r].queue[n].forEach((function (e) {
                                            e.resized = !1
                                        }))
                                    }))
                                } else this.logger && this.logger.info("play ignored")
                            }
                        }, {
                            key: "pause", value: function () {
                                if ("closed" !== this._status) {
                                    this.logger && this.logger.info("pause"), this._status = "paused";
                                    var e = this.channel.channels;
                                    e && e.length > 0 && this.queue.forEach((function (e) {
                                        e.pauseMove()
                                    }))
                                } else this.logger && this.logger.info("pause ignored")
                            }
                        }, {
                            key: "dataHandle", value: function () {
                                "paused" !== this._status && "closed" !== this._status && this.queue.length && this.queue.forEach((function (e) {
                                    "waiting" === e.status && e.startMove()
                                }))
                            }
                        }, {
                            key: "readData", value: function () {
                                if (this.danmu.isReady) {
                                    var e = this, t = this.danmu, n = t.player, r = e.interval, i = e.channel,
                                        o = void 0, l = void 0;
                                    if (n) {
                                        var c = n.currentTime ? Math.floor(1e3 * n.currentTime) : 0;
                                        l = e.data.filter((function (t) {
                                            return !t.start && e.danmu.hideArr.indexOf(t.mode) < 0 && (!t.color || e.danmu.hideArr.indexOf("color") < 0) && (t.start = c), !t.attached_ && e.danmu.hideArr.indexOf(t.mode) < 0 && (!t.color || e.danmu.hideArr.indexOf("color") < 0) && t.start - r <= c && c <= t.start + r
                                        })), t.live && (e.data = [])
                                    } else 0 === (l = e.data.splice(0, 1)).length && (l = e.playedData.splice(0, 1));
                                    if (l.length > 0) {
                                        i.updatePos();
                                        var u = 2;
                                        e:for (var p, d = 0; d < l.length; d++) if (p = l[d], e.forceDuration && e.forceDuration !== p.duration && (p.duration = e.forceDuration), (o = new a.default(t, p)) && !o.bulletCreateFail) if (o.attach(), p.attached_ = !0, i.addBullet(o).result) e.queue.push(o), o.topInit(), u = 2; else {
                                            for (var f in o.detach(), o) s.hasOwnProperty.call(o, f) && delete o[f];
                                            if (o = null, p.attached_ = !1, p.noDiscard && (p.prior ? e.data.unshift(p) : e.data.push(p)), 0 === u) break e;
                                            u--
                                        } else {
                                            if (0 === u) break e;
                                            u--
                                        }
                                    }
                                }
                            }
                        }, {
                            key: "sortData", value: function () {
                                this.data.sort((function (e, t) {
                                    return (e.start || -1) - (t.start || -1)
                                }))
                            }
                        }, {
                            key: "status", get: function () {
                                return this._status
                            }
                        }]), t
                    }(i.default);
                    t.default = u, e.exports = t.default
                }, function (e, t, n) {
                    Object.defineProperty(t, "__esModule", {value: !0}), t.Bullet = void 0;
                    var r, i = function () {
                        function e(e, t) {
                            for (var n = 0; n < t.length; n++) {
                                var r = t[n];
                                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                            }
                        }

                        return function (t, n, r) {
                            return n && e(t.prototype, n), r && e(t, r), t
                        }
                    }(), a = (r = n(1)) && r.__esModule ? r : {default: r}, l = n(0);

                    function s(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != (void 0 === t ? "undefined" : o(t)) && "function" != typeof t ? e : t
                    }

                    var c = t.Bullet = function (e) {
                        function t(e, n) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, t);
                            var r = s(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this)), i = r, a = void 0;
                            if (r.setLogger("bullet"), r.danmu = e, r.options = n, r.duration = n.duration, r.id = n.id, r.container = e.container, r.start = n.start, r.prior = n.prior, r.realTime = n.realTime, r.color = n.color, r.bookChannelId = n.bookChannelId, r.direction = e.direction, r.reuseDOM = !0, r.willChanges = [], r.domObj = e.domObj, n.el && 1 === n.el.nodeType) {
                                if (n.el.parentNode) return s(r, {bulletCreateFail: !0});
                                if (e.config.disableCopyDOM) a = n.el, r.reuseDOM = !1; else {
                                    a = r.domObj.use();
                                    var o = (0, l.copyDom)(n.el);
                                    n.eventListeners && n.eventListeners.length > 0 && n.eventListeners.forEach((function (e) {
                                        o.addEventListener(e.event, e.listener, e.useCapture || !1)
                                    })), a.appendChild(o)
                                }
                            } else (a = r.domObj.use()).textContent = n.txt;
                            if (r.onChangeDirection = function (e) {
                                i.direction = e
                            }, r.danmu.on("changeDirection", r.onChangeDirection), n.style) {
                                var c = n.style;
                                Object.keys(c).forEach((function (e) {
                                    (0, l.styleUtil)(a, e, c[e])
                                }))
                            }
                            "top" === n.mode || "bottom" === n.mode ? r.mode = n.mode : r.mode = "scroll", r.el = a, n.like && n.like.el && r.setLikeDom(n.like.el, n.like.style), r.status = "waiting";
                            var u = void 0;
                            if ((0, l.isNumber)(e.config.bulletOffset) && e.config.bulletOffset >= 0) u = e.config.bulletOffset; else {
                                var p = e.containerPos;
                                u = p.width / 10 > 100 ? 100 : p.width / 10
                            }
                            var d = n.realTime ? 0 : Math.floor(Math.random() * u);
                            return r.updateOffset(d), r
                        }

                        return function (e, t) {
                            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === t ? "undefined" : o(t)));
                            e.prototype = Object.create(t && t.prototype, {
                                constructor: {
                                    value: e,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                        }(t, e), i(t, [{
                            key: "updateOffset", value: function (e) {
                                this.random = e, (0, l.styleUtil)(this.el, "left", this.danmu.containerPos.width + e + "px")
                            }
                        }, {
                            key: "attach", value: function () {
                                var e = this.el;
                                this.container.appendChild(e), this.elPos = e.getBoundingClientRect(), "b2t" === this.direction ? (this.width = this.elPos.height, this.height = this.elPos.width) : (this.width = this.elPos.width, this.height = this.elPos.height), this.moveV && (this.duration = (this.danmu.containerPos.width + this.random + this.width) / this.moveV * 1e3), this.danmu.config && (this.danmu.config.mouseControl && (this.mouseoverFunWrapper = this.mouseoverFun.bind(this), e.addEventListener("mouseover", this.mouseoverFunWrapper, !1)), this.danmu.config.mouseEnterControl && (this.mouseEnterFunWrapper = this.mouseoverFun.bind(this), e.addEventListener("mouseenter", this.mouseEnterFunWrapper, !1))), e.addEventListener("transitionend", this._onTransitionEnd, !1)
                            }
                        }, {
                            key: "detach", value: function () {
                                var e = this.el;
                                if (e) {
                                    var t = this.danmu.config;
                                    t && (t.mouseControl && e.removeEventListener("mouseover", this.mouseoverFunWrapper, !1), t.mouseEnterControl && e.removeEventListener("mouseenter", this.mouseEnterFunWrapper, !1)), e.removeEventListener("transitionend", this._onTransitionEnd, !1), e.parentNode && e.parentNode.removeChild(e), this.reuseDOM && this.domObj.unused(e), this.el = null
                                }
                                this.elPos = void 0, this.danmu.off("changeDirection", this.onChangeDirection)
                            }
                        }, {
                            key: "willChange", value: function () {
                                var e = this.danmu.main.willChanges.concat(this.willChanges).join();
                                (0, l.styleUtil)(this.el, "willChange", e)
                            }
                        }, {
                            key: "mouseoverFun", value: function (e) {
                                this.danmu && this.danmu.mouseControl && this.danmu.config.mouseControlPause || "waiting" === this.status || "end" === this.status || this.danmu && this.danmu.emit("bullet_hover", {
                                    bullet: this,
                                    event: e
                                })
                            }
                        }, {
                            key: "_onTransitionEnd", value: function () {
                                this.status = "end", this.remove()
                            }
                        }, {
                            key: "topInit", value: function () {
                                this.logger && this.logger.info("topInit #" + (this.options.txt || "[DOM Element]") + "#"), "b2t" === this.direction ? ((0, l.styleUtil)(this.el, "transformOrigin", "left top"), (0, l.styleUtil)(this.el, "transform", "translateX(-" + this.top + "px) translateY(" + this.danmu.containerPos.height + "px) translateZ(0px) rotate(90deg)"), (0, l.styleUtil)(this.el, "transition", "transform 0s linear 0s")) : (0, l.styleUtil)(this.el, "top", this.top + "px")
                            }
                        }, {
                            key: "pauseMove", value: function () {
                                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], t = this;
                                if ("paused" !== t.status && ("forcedPause" !== t.status && (this.status = "paused"), t._moveV = void 0, this.el)) if (this.willChange(), "scroll" === this.mode) {
                                    var n = t.danmu.containerPos;
                                    if (e) {
                                        var r, i = ((new Date).getTime() - t.moveTime) / 1e3 * this.moveV;
                                        r = t.moveMoreS - i >= 0 ? "b2t" === this.direction ? (t.moveMoreS - i) / t.moveContainerHeight * n.height : (t.moveMoreS - i) / t.moveContainerWidth * n.width : t.moveMoreS - i, "b2t" === this.direction ? (0, l.styleUtil)(this.el, "transform", "translateX(-" + this.top + "px) translateY(" + r + "px) translateZ(0px) rotate(90deg)") : (0, l.styleUtil)(this.el, "left", r + "px")
                                    } else "b2t" === this.direction ? (0, l.styleUtil)(this.el, "transform", "translateX(-" + this.top + "px) translateY(" + (this.el.getBoundingClientRect().top - n.top) + "px) translateZ(0px) rotate(90deg)") : (0, l.styleUtil)(this.el, "left", this.el.getBoundingClientRect().left - n.left + "px");
                                    "b2t" === this.direction || (0, l.styleUtil)(this.el, "transform", "translateX(0px) translateY(0px) translateZ(0px)"), (0, l.styleUtil)(this.el, "transition", "transform 0s linear 0s")
                                } else this.pastDuration && this.startTime ? this.pastDuration = this.pastDuration + (new Date).getTime() - this.startTime : this.pastDuration = 1
                            }
                        }, {
                            key: "startMove", value: function (e) {
                                if (this.hasMove || (this.danmu.emit("bullet_start", this), this.hasMove = !0), ("forcedPause" !== this.status || e) && this.el && "start" !== this.status) if (this.status = "start", this.willChanges = ["transform", "transition"], this.willChange(), (0, l.styleUtil)(this.el, "backface-visibility", "hidden"), (0, l.styleUtil)(this.el, "perspective", "500em"), "scroll" === this.mode) {
                                    var t = this.danmu.containerPos;
                                    if ("b2t" === this.direction) {
                                        var n = (this.el.getBoundingClientRect().bottom - t.top) / this.moveV;
                                        (0, l.styleUtil)(this.el, "transition", "transform " + n + "s linear 0s"), (0, l.styleUtil)(this.el, "transform", "translateX(-" + this.top + "px) translateY(-" + this.height + "px) translateZ(0px) rotate(90deg)"), this.moveTime = (new Date).getTime(), this.moveMoreS = this.el.getBoundingClientRect().top - t.top, this.moveContainerHeight = t.height
                                    } else {
                                        if (!this.el) return;
                                        var r = this.el.getBoundingClientRect(), i = r.right - t.left,
                                            a = i / this.moveV;
                                        r.right > t.left ? ((0, l.styleUtil)(this.el, "transition", "transform " + a + "s linear 0s"), (0, l.styleUtil)(this.el, "transform", "translateX(-" + i + "px) translateY(0px) translateZ(0px)"), this.moveTime = (new Date).getTime(), this.moveMoreS = r.left - t.left, this.moveContainerWidth = t.width) : (this.status = "end", this.remove())
                                    }
                                } else {
                                    var o = (new Date).getTime(),
                                        s = (this.startTime && o - this.startTime > this.duration ? o - this.startTime : this.duration) / 1e3;
                                    (0, l.styleUtil)(this.el, "left", "50%"), (0, l.styleUtil)(this.el, "margin", "0 0 0 -" + this.width / 2 + "px"), (0, l.styleUtil)(this.el, "visibility", "hidden"), (0, l.styleUtil)(this.el, "transition", "visibility " + s + "s 0s"), this.pastDuration || (this.pastDuration = 1), this.startTime = o
                                }
                            }
                        }, {
                            key: "remove", value: function () {
                                this.logger && this.logger.info("remove #" + (this.options.txt || "[DOM Element]") + "#"), this.pauseMove(), this.el && this.el.parentNode && (this.willChanges = [], this.willChange(), this.detach(), this.options.el && 1 === this.options.el.nodeType && this.danmu.config.disableCopyDOM && (0, l.styleUtil)(this.options.el, "transform", "none"), this.danmu.emit("bullet_remove", {bullet: this}))
                            }
                        }, {
                            key: "setFontSize", value: function (e) {
                                this.el && (this.el.style.fontSize = e)
                            }
                        }, {
                            key: "setLikeDom", value: function (e, t) {
                                if (e && (Object.keys(t).forEach((function (n) {
                                    e.style[n] = t[n]
                                })), e.className = "danmu-like", this.el)) {
                                    var n = this.el.querySelector(".danmu-like");
                                    n && this.el.removeChild(n), this.el.innerHTML = "" + this.el.innerHTML + e.outerHTML
                                }
                                return e
                            }
                        }, {
                            key: "moveV", get: function () {
                                var e = this._moveV;
                                if (!e) {
                                    if (this.options.moveV) e = this.options.moveV; else if (this.elPos) {
                                        var t = this.danmu.containerPos;
                                        e = ("b2t" === this.direction ? t.height + this.height : t.width + this.width) / this.duration * 1e3
                                    }
                                    e && (e *= this.danmu.main.playRate, this._moveV = e)
                                }
                                return e
                            }
                        }]), t
                    }(a.default);
                    t.default = c
                }, function (e, t, n) {
                    Object.defineProperty(t, "__esModule", {value: !0});
                    var r, i = function () {
                        function e(e, t) {
                            for (var n = 0; n < t.length; n++) {
                                var r = t[n];
                                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                            }
                        }

                        return function (t, n, r) {
                            return n && e(t.prototype, n), r && e(t, r), t
                        }
                    }(), a = (r = n(1)) && r.__esModule ? r : {default: r}, l = n(0), s = n(31), c = function (e) {
                        function t(e) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, t);
                            var n = function (e, t) {
                                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !t || "object" != (void 0 === t ? "undefined" : o(t)) && "function" != typeof t ? e : t
                            }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this)), r = n;
                            return r.setLogger("channel"), r.danmu = e, r.reset(!0), r.direction = e.direction, r.channels = [], r.updatePos(), (0, l.attachEventListener)(n.danmu, "bullet_remove", (function (e) {
                                r.removeBullet(e.bullet)
                            }), "destroy"), (0, l.attachEventListener)(n.danmu, "changeDirection", (function (e) {
                                r.direction = e
                            }), "destroy"), (0, l.attachEventListener)(n.danmu, "channel_resize", (function () {
                                r.resize()
                            }), "destroy"), n
                        }

                        return function (e, t) {
                            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === t ? "undefined" : o(t)));
                            e.prototype = Object.create(t && t.prototype, {
                                constructor: {
                                    value: e,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                        }(t, e), i(t, [{
                            key: "updatePos", value: function () {
                                var e = this.container.getBoundingClientRect();
                                this.containerPos = e, this.containerWidth = e.width, this.containerHeight = e.height, this.containerTop = e.top, this.containerBottom = e.bottom, this.containerLeft = e.left, this.containerRight = e.right
                            }
                        }, {
                            key: "destroy", value: function () {
                                for (var e in this.logger && this.logger.info("destroy"), this.channels.splice(0, this.channels.length), this._cancelResizeTimer(), this) l.hasOwnProperty.call(this, e) && delete this[e]
                            }
                        }, {
                            key: "addBullet", value: function (e) {
                                var t = this, n = this.danmu, r = this.channels, i = void 0, a = void 0, o = void 0;
                                if ("b2t" === t.direction ? (a = this.channelWidth, o = Math.ceil(e.width / a)) : (i = this.channelHeight, o = Math.ceil(e.height / i)), o > r.length) return {
                                    result: !1,
                                    message: "exceed channels.length, occupy=" + o + ",channelsSize=" + r.length
                                };
                                for (var l = !0, s = void 0, c = -1, u = 0, p = r.length; u < p; u++) if (r[u].queue[e.mode].some((function (t) {
                                    return t.id === e.id
                                }))) return {result: !1, message: "exited, channelOrder=" + u + ",danmu_id=" + e.id};
                                if ("scroll" === e.mode) for (var d = 0, f = r.length - o; d <= f; d++) {
                                    l = !0;
                                    for (var g = d; g < d + o; g++) {
                                        if ((s = r[g]).operating.scroll) {
                                            l = !1;
                                            break
                                        }
                                        if (s.bookId.scroll && s.bookId.scroll !== e.id) {
                                            l = !1;
                                            break
                                        }
                                        s.operating.scroll = !0;
                                        var h = s.queue.scroll[0];
                                        if (h) {
                                            var y = h.el.getBoundingClientRect();
                                            if ("b2t" === t.direction) {
                                                if (y.bottom >= t.containerPos.bottom) {
                                                    l = !1, s.operating.scroll = !1;
                                                    break
                                                }
                                            } else if (y.right >= t.containerPos.right) {
                                                l = !1, s.operating.scroll = !1;
                                                break
                                            }
                                            var m = void 0, v = h.moveV, x = void 0, b = e.moveV, k = void 0;
                                            if ("b2t" === t.direction ? (x = (m = y.bottom - t.containerTop) / v, k = t.containerHeight + e.random - m) : (x = (m = y.right - t.containerLeft) / v, k = t.containerWidth + e.random - m), b > v) {
                                                var w = k / (b - v);
                                                if (n.config.bOffset || (n.config.bOffset = 0), x + n.config.bOffset >= w) {
                                                    var _ = x * b - t.containerPos.width;
                                                    _ > 0 && e.updateOffset(_ + (1 + Math.ceil(5 * Math.random())))
                                                }
                                            }
                                        }
                                        s.operating.scroll = !1
                                    }
                                    if (l) {
                                        c = d;
                                        break
                                    }
                                } else if ("top" === e.mode) for (var T = 0, E = r.length - o; T <= E; T++) {
                                    l = !0;
                                    for (var C = T; C < T + o; C++) {
                                        if (C > Math.floor(r.length / 2)) {
                                            l = !1;
                                            break
                                        }
                                        if ((s = r[C]).operating[e.mode]) {
                                            l = !1;
                                            break
                                        }
                                        if ((s.bookId[e.mode] || e.prior) && s.bookId[e.mode] !== e.id) {
                                            l = !1;
                                            break
                                        }
                                        if (s.operating[e.mode] = !0, s.queue[e.mode].length > 0) {
                                            l = !1, s.operating[e.mode] = !1;
                                            break
                                        }
                                        s.operating[e.mode] = !1
                                    }
                                    if (l) {
                                        c = T;
                                        break
                                    }
                                } else if ("bottom" === e.mode) for (var L = r.length - o; L >= 0; L--) {
                                    l = !0;
                                    for (var O = L; O < L + o; O++) {
                                        if (O <= Math.floor(r.length / 2)) {
                                            l = !1;
                                            break
                                        }
                                        if ((s = r[O]).operating[e.mode]) {
                                            l = !1;
                                            break
                                        }
                                        if ((s.bookId[e.mode] || e.prior) && s.bookId[e.mode] !== e.id) {
                                            l = !1;
                                            break
                                        }
                                        if (s.operating[e.mode] = !0, s.queue[e.mode].length > 0) {
                                            l = !1, s.operating[e.mode] = !1;
                                            break
                                        }
                                        s.operating[e.mode] = !1
                                    }
                                    if (l) {
                                        c = L;
                                        break
                                    }
                                }
                                if (-1 !== c) {
                                    for (var S = c, P = c + o; S < P; S++) (s = r[S]).operating[e.mode] = !0, s.queue[e.mode].unshift(e), e.prior && (delete s.bookId[e.mode], t.logger && t.logger.info(S + "号轨道恢复正常使用")), s.operating[e.mode] = !1;
                                    return e.prior && (t.logger && t.logger.info(e.id + "号优先弹幕运行完毕"), delete e.bookChannelId, n.player && n.bulletBtn.main.data.some((function (t) {
                                        return t.id === e.id && (delete t.bookChannelId, !0)
                                    }))), e.channel_id = [c, o], "b2t" === t.direction ? (e.top = c * a, t.danmu.config.area && t.danmu.config.area.start && (e.top += t.containerWidth * t.danmu.config.area.start)) : (e.top = c * i, t.danmu.config.area && t.danmu.config.area.start && (e.top += t.containerHeight * t.danmu.config.area.start)), {
                                        result: e,
                                        message: "success"
                                    }
                                }
                                if (e.options.realTime) {
                                    var A = 0, R = -1, N = null;
                                    if (t.danmu.bulletBtn.main.queue.forEach((function (e, n) {
                                        !e.prior && !e.options.realTime && e.el && e.el.getBoundingClientRect().left > t.containerPos.right && e.start >= A && (A = e.start, R = n, N = e)
                                    })), N) {
                                        N.remove(), t.removeBullet(N), t.danmu.bulletBtn.main.queue.splice(R, 1), e.channel_id = N.channel_id;
                                        for (var I = N.channel_id[0], j = N.channel_id[0] + N.channel_id[1]; I < j; I++) (s = r[I]).operating[e.mode] = !0, s.queue[e.mode].unshift(e), e.prior && delete s.bookId[e.mode], s.operating[e.mode] = !1;
                                        return e.top = N.top, t.danmu.config.area && t.danmu.config.area.start && (e.top += t.containerHeight * t.danmu.config.area.start), {
                                            result: e,
                                            message: "success"
                                        }
                                    }
                                }
                                if (e.prior) if (e.bookChannelId || t.danmu.live) n.player && n.bulletBtn.main.data.some((function (n) {
                                    return n.id === e.id && (t.logger && t.logger.info(e.id + "号优先弹幕将于2秒后再次请求注册"), n.start += 2e3, !0)
                                })); else {
                                    c = -1;
                                    for (var D = 0, M = r.length - o; D <= M; D++) {
                                        l = !0;
                                        for (var z = D; z < D + o; z++) if (r[z].bookId[e.mode]) {
                                            l = !1;
                                            break
                                        }
                                        if (l) {
                                            c = D;
                                            break
                                        }
                                    }
                                    if (-1 !== c) {
                                        for (var V = c; V < c + o; V++) r[V].bookId[e.mode] = e.id, t.logger && t.logger.info(V + "号轨道被" + e.id + "号优先弹幕预定");
                                        n.player && n.bulletBtn.main.data.some((function (n) {
                                            return n.id === e.id && (t.logger && t.logger.info(e.id + "号优先弹幕将于2秒后再次请求注册"), n.start += 2e3, n.bookChannelId = [c, o], t.logger && t.logger.info(e.id + "号优先弹幕预定了" + c + "~" + (c + o - 1) + "号轨道"), !0)
                                        }))
                                    }
                                }
                                return {result: !1, message: "no surplus will right"}
                            }
                        }, {
                            key: "removeBullet", value: function (e) {
                                this.logger && this.logger.info("removeBullet " + (e.options.txt || "[DOM Element]"));
                                for (var t = this.channels, n = e.channel_id, r = void 0, i = n[0], a = n[0] + n[1]; i < a; i++) if (r = t[i]) {
                                    r.operating[e.mode] = !0;
                                    var o = -1;
                                    r.queue[e.mode].some((function (t, n) {
                                        return t.id === e.id && (o = n, !0)
                                    })), o > -1 && r.queue[e.mode].splice(o, 1), r.operating[e.mode] = !1
                                }
                                e.options.loop && this.danmu.bulletBtn.main.playedData.push(e.options)
                            }
                        }, {
                            key: "resizeSync", value: function () {
                                this.resize(!0)
                            }
                        }, {
                            key: "resize", value: function () {
                                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                                this.logger && this.logger.info("resize");
                                var t = this;

                                function n() {
                                    var e = t.danmu, n = e.container, r = e.config, i = e.bulletBtn, a = void 0;
                                    if (t.updatePos(), t._cancelResizeTimer(), i.main.data && i.main.data.forEach((function (e) {
                                        e.bookChannelId && (delete e.bookChannelId, t.logger && t.logger.info("resize导致" + e.id + "号优先弹幕预定取消"))
                                    })), t.logger && t.logger.info("resize导致所有轨道恢复正常使用"), t.width = t.containerWidth, t.height = t.containerHeight, r.area) {
                                        var o = r.area, c = o.lines, u = o.start, p = o.end;
                                        (0, s.validAreaLineRule)(c) ? a = c : u >= 0 && p >= u && ("b2t" === t.direction ? t.width = t.width * (p - u) : t.height = t.height * (p - u))
                                    }
                                    t.container = n;
                                    var d = r.channelSize || (/mobile/gi.test(navigator.userAgent) ? 10 : 12);
                                    (0, l.isNumber)(a) || (a = "b2t" === t.direction ? Math.floor(t.width / d) : Math.floor(t.height / d));
                                    for (var f = [], g = 0; g < a; g++) f[g] = {
                                        id: g,
                                        queue: {scroll: [], top: [], bottom: []},
                                        operating: {scroll: !1, top: !1, bottom: !1},
                                        bookId: {}
                                    };
                                    if (t.channels && t.channels.length <= f.length) {
                                        for (var h = function (e) {
                                            f[e] = {
                                                id: e,
                                                queue: {scroll: [], top: [], bottom: []},
                                                operating: {scroll: !1, top: !1, bottom: !1},
                                                bookId: {}
                                            }, ["scroll", "top"].forEach((function (n) {
                                                t.channels[e].queue[n].forEach((function (t) {
                                                    t.el && f[e].queue[n].push(t)
                                                }))
                                            })), t.channels[e].queue.bottom.forEach((function (n) {
                                                if (n.el && (f[e + f.length - t.channels.length].queue.bottom.push(n), n.channel_id[0] + n.channel_id[1] - 1 === e)) {
                                                    var r = [].concat(n.channel_id);
                                                    n.channel_id = [r[0] - t.channels.length + f.length, r[1]], n.top = n.channel_id[0] * d, t.danmu.config.area && t.danmu.config.area.start && (n.top += t.containerHeight * t.danmu.config.area.start), n.topInit()
                                                }
                                            }))
                                        }, y = 0; y < t.channels.length; y++) h(y);
                                        for (var m = function (e) {
                                            ["scroll", "top", "bottom"].forEach((function (t) {
                                                f[e].queue[t].forEach((function (e) {
                                                    e.resized = !1
                                                }))
                                            }))
                                        }, v = 0; v < f.length; v++) m(v);
                                        t.channels = f, "b2t" === t.direction ? t.channelWidth = d : t.channelHeight = d
                                    } else if (t.channels && t.channels.length > f.length) {
                                        for (var x = function (e) {
                                            f[e] = {
                                                id: e,
                                                queue: {scroll: [], top: [], bottom: []},
                                                operating: {scroll: !1, top: !1, bottom: !1},
                                                bookId: {}
                                            }, ["scroll", "top", "bottom"].forEach((function (n) {
                                                if ("top" === n && e > Math.floor(f.length / 2)) ; else if ("bottom" === n && e <= Math.floor(f.length / 2)) ; else {
                                                    var r = "bottom" === n ? e - f.length + t.channels.length : e;
                                                    t.channels[r].queue[n].forEach((function (i, a) {
                                                        if (i.el && (f[e].queue[n].push(i), "bottom" === n && i.channel_id[0] + i.channel_id[1] - 1 === r)) {
                                                            var o = [].concat(i.channel_id);
                                                            i.channel_id = [o[0] - t.channels.length + f.length, o[1]], i.top = i.channel_id[0] * d, t.danmu.config.area && t.danmu.config.area.start && (i.top += t.containerHeight * t.danmu.config.area.start), i.topInit()
                                                        }
                                                        t.channels[r].queue[n].splice(a, 1)
                                                    }))
                                                }
                                            }))
                                        }, b = 0; b < f.length; b++) x(b);
                                        for (var k = function (e) {
                                            ["scroll", "top", "bottom"].forEach((function (t) {
                                                f[e].queue[t].forEach((function (e) {
                                                    e.resized = !1
                                                }))
                                            }))
                                        }, w = 0; w < f.length; w++) k(w);
                                        t.channels = f, "b2t" === t.direction ? t.channelWidth = d : t.channelHeight = d
                                    }
                                    t.resizing = !1
                                }

                                t.resizing || (t.resizing = !0, e ? n() : (this._cancelResizeTimer(), this.resizeId = requestAnimationFrame(n)))
                            }
                        }, {
                            key: "_cancelResizeTimer", value: function () {
                                this.resizeId && (cancelAnimationFrame(this.resizeId), this.resizeId = null)
                            }
                        }, {
                            key: "reset", value: function () {
                                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                                this.logger && this.logger.info("reset");
                                var t = this, n = t.danmu, r = n.container, i = n.bulletBtn, a = n.config;

                                function o() {
                                    var e = void 0, n = r.getBoundingClientRect();
                                    if (t.width = n.width, t.height = n.height, t.resetId && (cancelAnimationFrame(t.resetId), t.resetId = null), a.area) {
                                        var i = a.area, o = i.lines, c = i.start, u = i.end;
                                        (0, s.validAreaLineRule)(o) ? e = o : c >= 0 && u >= c && ("b2t" === t.direction ? t.width = t.width * (u - c) : t.height = t.height * (u - c))
                                    }
                                    var p = a.channelSize || (/mobile/gi.test(navigator.userAgent) ? 10 : 12);
                                    (0, l.isNumber)(e) || (e = "b2t" === t.direction ? Math.floor(t.width / p) : Math.floor(t.height / p));
                                    for (var d = [], f = 0; f < e; f++) d[f] = {
                                        id: f,
                                        queue: {scroll: [], top: [], bottom: []},
                                        operating: {scroll: !1, top: !1, bottom: !1},
                                        bookId: {}
                                    };
                                    t.channels = d, "b2t" === t.direction ? t.channelWidth = p : t.channelHeight = p
                                }

                                t.container = r, i && i.main && i.main.queue.forEach((function (e) {
                                    e.remove()
                                })), t.channels && t.channels.length > 0 && ["scroll", "top", "bottom"].forEach((function (e) {
                                    for (var n = 0; n < t.channels.length; n++) t.channels[n].queue[e].forEach((function (e) {
                                        e.remove()
                                    }))
                                })), i && i.main && i.main.data && i.main.data.forEach((function (e) {
                                    e.attached_ = !1
                                })), e ? this.resetId = requestAnimationFrame(o) : o()
                            }
                        }]), t
                    }(a.default);
                    t.default = c, e.exports = t.default
                }, function (e, t, n) {
                    Object.defineProperty(t, "__esModule", {value: !0}), t.validAreaLineRule = function (e) {
                        return "number" == typeof e && e >= 0 && Number.isInteger(e)
                    }
                }, function (e, t, n) {
                    Object.defineProperty(t, "__esModule", {value: !0});
                    var r = function () {
                        function e(e, t) {
                            for (var n = 0; n < t.length; n++) {
                                var r = t[n];
                                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                            }
                        }

                        return function (t, n, r) {
                            return n && e(t.prototype, n), r && e(t, r), t
                        }
                    }(), i = n(0), a = function () {
                        function e(t) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, e), t = {
                                initDOM: function () {
                                    return document.createElement("div")
                                }, initSize: 10
                            }, this.init(t)
                        }

                        return r(e, [{
                            key: "init", value: function (e) {
                                this.idleList = [], this.usingList = [], this._id = 0, this.options = e, this._expand(e.initSize)
                            }
                        }, {
                            key: "use", value: function () {
                                this.idleList.length || this._expand(1);
                                var e = this.idleList.shift();
                                return this.usingList.push(e), e
                            }
                        }, {
                            key: "unused", value: function (e) {
                                var t = this.usingList.indexOf(e);
                                t < 0 || (this.usingList.splice(t, 1), e.innerHTML = "", e.textcontent = "", this.clearElementStyle(e), this.idleList.push(e))
                            }
                        }, {
                            key: "_expand", value: function (e) {
                                for (var t = 0; t < e; t++) this.idleList.push(this.options.initDOM(this._id++))
                            }
                        }, {
                            key: "destroy", value: function () {
                                for (var e = 0; e < this.idleList.length; e++) this.idleList[e].innerHTML = "", this.idleList[e].textcontent = "", this.clearElementStyle(this.idleList[e]);
                                for (var t = 0; t < this.usingList.length; t++) this.usingList[t].innerHTML = "", this.usingList[t].textcontent = "", this.clearElementStyle(this.usingList[t]);
                                for (var n in this) i.hasOwnProperty.call(this, n) && delete this[n]
                            }
                        }, {
                            key: "clearElementStyle", value: function (e) {
                                var t = "undefined" != typeof window ? window.navigator.userAgent : null;
                                t && (t.indexOf("MSIE ") > -1 || t.indexOf("Trident/") > -1 ? (0, i.styleUtil)(e, "transform", "none") : e.setAttribute("style", ""))
                            }
                        }]), e
                    }();
                    t.default = a, e.exports = t.default
                }, function (e, t, n) {
                    Object.defineProperty(t, "__esModule", {value: !0}), t.destroyObserver = t.unObserver = t.addObserver = void 0;
                    var r = function () {
                        function e(e, t) {
                            for (var n = 0; n < t.length; n++) {
                                var r = t[n];
                                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                            }
                        }

                        return function (t, n, r) {
                            return n && e(t.prototype, n), r && e(t, r), t
                        }
                    }(), i = n(0), a = new (function () {
                        function e() {
                            var t = this;
                            if (function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, e), this.__handlers = [], window.ResizeObserver) try {
                                this.observer = new window.ResizeObserver((0, i.throttle)((function (e) {
                                    t.__trigger(e)
                                }), 100))
                            } catch (n) {
                            }
                        }

                        return r(e, [{
                            key: "addObserver", value: function (e, t) {
                                if (this.observer) {
                                    this.observer && this.observer.observe(e);
                                    for (var n = this.__handlers, r = -1, i = 0; i < n.length; i++) n[i] && e === n[i].target && (r = i);
                                    r > -1 ? this.__handlers[r].handler.push(t) : this.__handlers.push({
                                        target: e,
                                        handler: [t]
                                    })
                                }
                            }
                        }, {
                            key: "unObserver", value: function (e) {
                                var t = -1;
                                this.__handlers.map((function (n, r) {
                                    e === n.target && (t = r)
                                })), this.observer && this.observer.unobserve(e), t > -1 && this.__handlers.splice(t, 1)
                            }
                        }, {
                            key: "destroyObserver", value: function () {
                                this.observer && this.observer.disconnect(), this.observer = null, this.__handlers = null
                            }
                        }, {
                            key: "__runHandler", value: function (e) {
                                for (var t = this.__handlers, n = 0; n < t.length; n++) if (t[n] && e === t[n].target) {
                                    t[n].handler && t[n].handler.map((function (e) {
                                        try {
                                            e()
                                        } catch (t) {
                                        }
                                    }));
                                    break
                                }
                            }
                        }, {
                            key: "__trigger", value: function (e) {
                                var t = this;
                                e.map((function (e) {
                                    t.__runHandler(e.target)
                                }))
                            }
                        }]), e
                    }());
                    t.addObserver = function (e, t) {
                        a.addObserver(e, t)
                    }, t.unObserver = function (e, t) {
                        a.unObserver(e, t)
                    }, t.destroyObserver = function (e, t) {
                        a.destroyObserver(e, t)
                    }
                }, function (e, t, n) {
                    var r = n(35);
                    "string" == typeof r && (r = [[e.i, r, ""]]), n(37)(r, {
                        hmr: !0,
                        transform: void 0,
                        insertInto: void 0
                    }), r.locals && (e.exports = r.locals)
                }, function (e, t, n) {
                    (e.exports = n(36)(!1)).push([e.i, ".danmu{overflow:hidden;-webkit-user-select:none;-moz-user-select:none;user-select:none;-ms-user-select:none}.danmu>*{position:absolute;white-space:nowrap}.danmu-switch{width:32px;height:20px;border-radius:100px;background-color:#ccc;-webkit-box-sizing:border-box;box-sizing:border-box;outline:none;cursor:pointer;position:relative;text-align:center;margin:10px auto}.danmu-switch.danmu-switch-active{padding-left:12px;background-color:#f85959}.danmu-switch span.txt{width:20px;height:20px;line-height:20px;text-align:center;display:block;border-radius:100px;background-color:#fff;-webkit-box-shadow:-2px 0 0 0 rgba(0, 0, 0, .04);box-shadow:-2px 0 0 0 rgba(0, 0, 0, .04);font-family:PingFangSC;font-size:10px;font-weight:500;color:#f44336}", ""])
                }, function (e, t) {
                    e.exports = function (e) {
                        var t = [];
                        return t.toString = function () {
                            return this.map((function (t) {
                                var n = function (e, t) {
                                    var n, r = e[1] || "", i = e[3];
                                    if (!i) return r;
                                    if (t && "function" == typeof btoa) {
                                        var a = (n = i, "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(n)))) + " */"),
                                            o = i.sources.map((function (e) {
                                                return "/*# sourceURL=" + i.sourceRoot + e + " */"
                                            }));
                                        return [r].concat(o).concat([a]).join("\n")
                                    }
                                    return [r].join("\n")
                                }(t, e);
                                return t[2] ? "@media " + t[2] + "{" + n + "}" : n
                            })).join("")
                        }, t.i = function (e, n) {
                            "string" == typeof e && (e = [[null, e, ""]]);
                            for (var r = {}, i = 0; i < this.length; i++) {
                                var a = this[i][0];
                                "number" == typeof a && (r[a] = !0)
                            }
                            for (i = 0; i < e.length; i++) {
                                var o = e[i];
                                "number" == typeof o[0] && r[o[0]] || (n && !o[2] ? o[2] = n : n && (o[2] = "(" + o[2] + ") and (" + n + ")"), t.push(o))
                            }
                        }, t
                    }
                }, function (e, t, n) {
                    var r, i, a, l = {}, s = (r = function () {
                        return window && document && document.all && !window.atob
                    }, function () {
                        return void 0 === i && (i = r.apply(this, arguments)), i
                    }), c = function (e) {
                        return document.querySelector(e)
                    }, u = (a = {}, function (e) {
                        if ("function" == typeof e) return e();
                        if (void 0 === a[e]) {
                            var t = c.call(this, e);
                            if (window.HTMLIFrameElement && t instanceof window.HTMLIFrameElement) try {
                                t = t.contentDocument.head
                            } catch (n) {
                                t = null
                            }
                            a[e] = t
                        }
                        return a[e]
                    }), p = null, d = 0, f = [], g = n(38);

                    function h(e, t) {
                        for (var n = 0; n < e.length; n++) {
                            var r = e[n], i = l[r.id];
                            if (i) {
                                i.refs++;
                                for (var a = 0; a < i.parts.length; a++) i.parts[a](r.parts[a]);
                                for (; a < r.parts.length; a++) i.parts.push(k(r.parts[a], t))
                            } else {
                                var o = [];
                                for (a = 0; a < r.parts.length; a++) o.push(k(r.parts[a], t));
                                l[r.id] = {id: r.id, refs: 1, parts: o}
                            }
                        }
                    }

                    function y(e, t) {
                        for (var n = [], r = {}, i = 0; i < e.length; i++) {
                            var a = e[i], o = t.base ? a[0] + t.base : a[0],
                                l = {css: a[1], media: a[2], sourceMap: a[3]};
                            r[o] ? r[o].parts.push(l) : n.push(r[o] = {id: o, parts: [l]})
                        }
                        return n
                    }

                    function m(e, t) {
                        var n = u(e.insertInto);
                        if (!n) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
                        var r = f[f.length - 1];
                        if ("top" === e.insertAt) r ? r.nextSibling ? n.insertBefore(t, r.nextSibling) : n.appendChild(t) : n.insertBefore(t, n.firstChild), f.push(t); else if ("bottom" === e.insertAt) n.appendChild(t); else {
                            if ("object" != o(e.insertAt) || !e.insertAt.before) throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
                            var i = u(e.insertInto + " " + e.insertAt.before);
                            n.insertBefore(t, i)
                        }
                    }

                    function v(e) {
                        if (null === e.parentNode) return !1;
                        e.parentNode.removeChild(e);
                        var t = f.indexOf(e);
                        t >= 0 && f.splice(t, 1)
                    }

                    function x(e) {
                        var t = document.createElement("style");
                        return void 0 === e.attrs.type && (e.attrs.type = "text/css"), b(t, e.attrs), m(e, t), t
                    }

                    function b(e, t) {
                        Object.keys(t).forEach((function (n) {
                            e.setAttribute(n, t[n])
                        }))
                    }

                    function k(e, t) {
                        var n, r, i, a, o, l;
                        if (t.transform && e.css) {
                            if (!(a = t.transform(e.css))) return function () {
                            };
                            e.css = a
                        }
                        if (t.singleton) {
                            var s = d++;
                            n = p || (p = x(t)), r = T.bind(null, n, s, !1), i = T.bind(null, n, s, !0)
                        } else e.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (o = t, l = document.createElement("link"), void 0 === o.attrs.type && (o.attrs.type = "text/css"), o.attrs.rel = "stylesheet", b(l, o.attrs), m(o, l), n = l, r = C.bind(null, n, t), i = function () {
                            v(n), n.href && URL.revokeObjectURL(n.href)
                        }) : (n = x(t), r = E.bind(null, n), i = function () {
                            v(n)
                        });
                        return r(e), function (t) {
                            if (t) {
                                if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
                                r(e = t)
                            } else i()
                        }
                    }

                    e.exports = function (e, t) {
                        if ("undefined" != typeof DEBUG && DEBUG && "object" != ("undefined" == typeof document ? "undefined" : o(document))) throw new Error("The style-loader cannot be used in a non-browser environment");
                        (t = t || {}).attrs = "object" == o(t.attrs) ? t.attrs : {}, t.singleton || "boolean" == typeof t.singleton || (t.singleton = s()), t.insertInto || (t.insertInto = "head"), t.insertAt || (t.insertAt = "bottom");
                        var n = y(e, t);
                        return h(n, t), function (e) {
                            for (var r = [], i = 0; i < n.length; i++) {
                                var a = n[i];
                                (o = l[a.id]).refs--, r.push(o)
                            }
                            for (e && h(y(e, t), t), i = 0; i < r.length; i++) {
                                var o;
                                if (0 === (o = r[i]).refs) {
                                    for (var s = 0; s < o.parts.length; s++) o.parts[s]();
                                    delete l[o.id]
                                }
                            }
                        }
                    };
                    var w, _ = (w = [], function (e, t) {
                        return w[e] = t, w.filter(Boolean).join("\n")
                    });

                    function T(e, t, n, r) {
                        var i = n ? "" : r.css;
                        if (e.styleSheet) e.styleSheet.cssText = _(t, i); else {
                            var a = document.createTextNode(i), o = e.childNodes;
                            o[t] && e.removeChild(o[t]), o.length ? e.insertBefore(a, o[t]) : e.appendChild(a)
                        }
                    }

                    function E(e, t) {
                        var n = t.css, r = t.media;
                        if (r && e.setAttribute("media", r), e.styleSheet) e.styleSheet.cssText = n; else {
                            for (; e.firstChild;) e.removeChild(e.firstChild);
                            e.appendChild(document.createTextNode(n))
                        }
                    }

                    function C(e, t, n) {
                        var r = n.css, i = n.sourceMap, a = void 0 === t.convertToAbsoluteUrls && i;
                        (t.convertToAbsoluteUrls || a) && (r = g(r)), i && (r += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(i)))) + " */");
                        var o = new Blob([r], {type: "text/css"}), l = e.href;
                        e.href = URL.createObjectURL(o), l && URL.revokeObjectURL(l)
                    }
                }, function (e, t) {
                    e.exports = function (e) {
                        var t = "undefined" != typeof window && window.location;
                        if (!t) throw new Error("fixUrls requires window.location");
                        if (!e || "string" != typeof e) return e;
                        var n = t.protocol + "//" + t.host, r = n + t.pathname.replace(/\/[^\/]*$/, "/");
                        return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, (function (e, t) {
                            var i, a = t.trim().replace(/^"(.*)"$/, (function (e, t) {
                                return t
                            })).replace(/^'(.*)'$/, (function (e, t) {
                                return t
                            }));
                            return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(a) ? e : (i = 0 === a.indexOf("//") ? a : 0 === a.indexOf("/") ? n + a : r + a.replace(/^\.\//, ""), "url(" + JSON.stringify(i) + ")")
                        }))
                    }
                }])
            }, "object" == o(t) && "object" == o(e) ? e.exports = a() : (r = [], void 0 === (i = "function" == typeof (n = a) ? n.apply(t, r) : n) || (e.exports = i))
        }).call(this, n(135)(e))
    }, function (e, t) {
        e.exports = function (e) {
            return e.webpackPolyfill || (e.deprecate = function () {
            }, e.paths = [], e.children || (e.children = []), Object.defineProperty(e, "loaded", {
                enumerable: !0,
                get: function () {
                    return e.l
                }
            }), Object.defineProperty(e, "id", {
                enumerable: !0, get: function () {
                    return e.i
                }
            }), e.webpackPolyfill = 1), e
        }
    }, function (e, t, n) {
        n.r(t), t.default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">\n  <path fill="#f85959" transform="scale(0.8 0.8)" d="M36.5,18.73a1.19,1.19,0,0,0,1-1.14V16.33a1.2,1.2,0,0,0-1-1.13l-.61-.08a1.75,1.75,0,0,1-1.3-.86l-.21-.36-.2-.36A1.72,1.72,0,0,1,34,12l.23-.58a1.18,1.18,0,0,0-.5-1.42l-1.1-.62a1.18,1.18,0,0,0-1.47.3l-.39.51a1.82,1.82,0,0,1-1.41.72c-.44,0-1.88-.27-2.22-.7l-.39-.49a1.18,1.18,0,0,0-1.48-.28l-1.09.64a1.19,1.19,0,0,0-.47,1.43l.25.59a1.87,1.87,0,0,1-.08,1.58c-.26.37-1.17,1.5-1.71,1.58l-.63.09a1.19,1.19,0,0,0-1,1.14l0,1.27a1.17,1.17,0,0,0,1,1.12l.61.08a1.74,1.74,0,0,1,1.3.87l.21.36.2.35A1.69,1.69,0,0,1,24,22.08l-.23.59a1.19,1.19,0,0,0,.5,1.42l1.1.62a1.19,1.19,0,0,0,1.48-.31l.38-.5a1.83,1.83,0,0,1,1.41-.72c.44,0,1.88.25,2.22.69l.39.49a1.18,1.18,0,0,0,1.48.28L33.86,24a1.19,1.19,0,0,0,.47-1.43L34.09,22a1.84,1.84,0,0,1,.07-1.58c.26-.37,1.17-1.5,1.72-1.58ZM31,18.94a2.76,2.76,0,0,1-4.65-1.2A2.71,2.71,0,0,1,27,15.13a2.76,2.76,0,0,1,4.64,1.2A2.7,2.7,0,0,1,31,18.94Z"/>\n  <path fill="#f85959" transform="scale(0.8 0.8)" d="M32,0H3.59A3.59,3.59,0,0,0,0,3.59v17A3.59,3.59,0,0,0,3.59,24.2H19.72a12.59,12.59,0,0,1-.81-1.2A11.73,11.73,0,0,1,35.54,7.28V3.59A3.59,3.59,0,0,0,32,0ZM13,14.18H4.29a1.52,1.52,0,0,1,0-3H13a1.52,1.52,0,0,1,0,3ZM16.45,8H4.29a1.51,1.51,0,0,1,0-3H16.45a1.51,1.51,0,1,1,0,3Z"/>\n</svg>\n'
    }, function (e, t, n) {
        var r = n(138);
        "string" == typeof r && (r = [[e.i, r, ""]]);
        var i = {hmr: !0, transform: void 0, insertInto: void 0};
        n(2)(r, i), r.locals && (e.exports = r.locals)
    }, function (e, t, n) {
        (e.exports = n(1)(!1)).push([e.i, ".xgplayer-skin-default .danmu-switch{-webkit-order:6;-moz-box-ordinal-group:7;order:6;z-index:26}.xgplayer-skin-default .xgplayer-danmu{display:none;position:absolute;top:0;left:0;right:0;height:100%;overflow:hidden;z-index:9;outline:none;pointer-events:none}.xgplayer-skin-default .xgplayer-danmu>*{position:absolute;white-space:nowrap;z-index:9;pointer-events:auto}.xgplayer-skin-default .xgplayer-danmu.xgplayer-has-danmu{display:block}.xgplayer-skin-default .xgplayer-panel{outline:none;-webkit-order:7;-moz-box-ordinal-group:8;order:7;width:40px;height:40px;display:inline-block;position:relative;font-family:PingFangSC-Regular;font-size:13px;color:hsla(0,0%,100%,.8);z-index:36}.xgplayer-skin-default .xgplayer-panel .xgplayer-panel-icon{cursor:pointer;position:absolute;margin-left:5px;top:10px}.xgplayer-skin-default .xgplayer-panel-active{display:block!important;bottom:30px}.xgplayer-skin-default .xgplayer-panel-slider{z-index:36;display:none;position:absolute;width:230px;height:230px;background:rgba(0,0,0,.54);border-radius:1px;padding:10px 20px;outline:none;left:-115px;bottom:40px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-hidemode{padding-bottom:10px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-hidemode-radio li{display:inline;list-style:none;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-hidemode ul{display:-webkit-flex;display:-moz-box;display:flex;-webkit-justify-content:space-around;justify-content:space-around}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-hidemode li{margin:0 12px;font-size:11px;color:#aaa}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-hidemode-font{margin-bottom:10px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency{display:block;margin-top:10px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-line{-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer;outline:none;width:150px;height:4px;background:#aaa;border-radius:4px;border-style:none;margin-left:10px;margin-top:-2px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-line::-moz-focus-outer{border:0!important}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-color::-webkit-slider-runnable-track{outline:none;width:150px;height:4px;border-radius:4px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-color::-moz-range-track{outline:none;background-color:#aaa;border-color:transparent;cursor:pointer;width:150px;height:4px;border-radius:4px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-color::-ms-track{outline:none;background-color:#aaa;color:transparent;border-color:transparent;width:150px;height:4px;border-radius:4px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-bar::-webkit-slider-thumb{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:6px solid #f85959;height:6px;width:6px;margin-top:-4px;border-radius:6px;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-bar::-moz-range-thumb{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:6px solid #f85959;height:0;width:0;border-radius:6px;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-bar::-ms-thumb{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:6px solid #f85959;height:6px;width:6px;border-radius:6px;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-bar::-moz-range-progress{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;height:4px;border-radius:4px;background:linear-gradient(90deg,#f85959,#f85959 100%,#aaa)}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea{display:block;margin-top:8px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-name{display:inline-block;position:relative;top:-10px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-control{display:inline-block}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-control-up{width:150px;margin-left:10px;display:-moz-box;display:-webkit-flex;display:flex;-webkit-justify-content:space-between;-moz-box-pack:justify;justify-content:space-between;color:#aaa}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-control-down{position:relative;top:-10px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-control-down-dots{display:-webkit-flex;display:-moz-box;display:flex;width:150px;margin-left:10px;-webkit-justify-content:space-between;-moz-box-pack:justify;justify-content:space-between}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-threequarters,.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-twoquarters{margin-left:-6px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-full{margin-right:3px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-line{-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer;outline:none;width:150px;height:4px;background:#aaa;border-radius:4px;border-style:none;margin-left:10px;margin-top:-2px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-line::-moz-focus-outer{border:0!important}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-color::-webkit-slider-runnable-track{outline:none;width:150px;height:4px;border-radius:4px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-color::-moz-range-track{outline:none;background-color:#aaa;border-color:transparent;cursor:pointer;width:150px;height:4px;border-radius:4px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-color::-ms-track{outline:none;background-color:#aaa;color:transparent;border-color:transparent;width:150px;height:4px;border-radius:4px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-bar::-webkit-slider-thumb{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:6px solid #f85959;height:6px;width:6px;margin-top:-4px;border-radius:6px;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-bar::-moz-range-thumb{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:6px solid #f85959;height:0;width:0;border-radius:6px;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-bar::-ms-thumb{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:6px solid #f85959;height:6px;width:6px;border-radius:6px;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-full-dot,.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-onequarters-dot,.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-threequarters-dot,.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-twoquarters-dot,.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-zero-dot{width:3px;height:3px;border:3px solid #aaa;border-radius:50%;background-color:#aaa;position:relative;top:16px;z-index:-1}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed{display:block}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed-name{display:inline-block;position:relative;top:-10px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed-control{display:inline-block}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed-control-up{width:150px;margin-left:10px;display:-moz-box;display:-webkit-flex;display:flex;-webkit-justify-content:space-between;-moz-box-pack:justify;justify-content:space-between;color:#aaa}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed-control-down{position:relative;top:-10px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed-control-down-dots{display:-webkit-flex;display:-moz-box;display:flex;width:150px;margin-left:10px;-webkit-justify-content:space-between;-moz-box-pack:justify;justify-content:space-between}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-line{-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer;outline:none;width:150px;height:4px;background:#aaa;border-radius:4px;border-style:none;margin-left:10px;margin-top:-2px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-line::-moz-focus-outer{border:0!important}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-color::-webkit-slider-runnable-track{outline:none;width:150px;height:4px;border-radius:4px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-color::-moz-range-track{outline:none;background-color:#aaa;border-color:transparent;cursor:pointer;width:150px;height:4px;border-radius:4px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-color::-ms-track{outline:none;background-color:#aaa;color:transparent;border-color:transparent;width:150px;height:4px;border-radius:4px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-bar::-webkit-slider-thumb{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:6px solid #f85959;height:6px;width:6px;margin-top:-4px;border-radius:6px;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-bar::-moz-range-thumb{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:6px solid #f85959;height:0;width:0;border-radius:6px;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-bar::-ms-thumb{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:6px solid #f85959;height:6px;width:6px;border-radius:6px;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-large-dot,.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-middle-dot,.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-small-dot{width:3px;height:3px;border:3px solid #aaa;border-radius:50%;background-color:#aaa;position:relative;top:16px;z-index:-1}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont{display:block}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont-name{display:inline-block;position:relative;top:-10px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont-control{display:inline-block}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont-control-up{width:150px;margin-left:10px;display:-moz-box;display:-webkit-flex;display:flex;-webkit-justify-content:space-between;-moz-box-pack:justify;justify-content:space-between;color:#aaa}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont-control-down{position:relative;top:-10px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont-control-down-dots{display:-webkit-flex;display:-moz-box;display:flex;width:150px;margin-left:10px;-webkit-justify-content:space-between;-moz-box-pack:justify;justify-content:space-between}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-line{-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer;outline:none;width:150px;height:4px;background:#aaa;border-radius:4px;border-style:none;margin-left:10px;margin-top:-2px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-line::-moz-focus-outer{border:0!important}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-color::-webkit-slider-runnable-track{outline:none;width:150px;height:4px;border-radius:4px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-color::-moz-range-track{outline:none;background-color:#aaa;border-color:transparent;cursor:pointer;width:150px;height:4px;border-radius:4px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-color::-ms-track{outline:none;background-color:#aaa;color:transparent;border-color:transparent;width:150px;height:4px;border-radius:4px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-bar::-webkit-slider-thumb{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:6px solid #f85959;height:6px;width:6px;margin-top:-4px;border-radius:6px;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-bar::-moz-range-thumb{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:6px solid #f85959;height:0;width:0;border-radius:6px;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-bar::-ms-thumb{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:6px solid #f85959;height:6px;width:6px;border-radius:6px;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-large-dot,.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-middle-dot,.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-small-dot{width:3px;height:3px;border:3px solid #aaa;border-radius:50%;background-color:#aaa;position:relative;top:16px;z-index:-1}", ""])
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(0);
        n(140), t.default = {
            name: "s_pip", method: function () {
                var e = this;
                if (e.config.pip && "function" == typeof e.video.requestPictureInPicture) {
                    var t = e.lang.PIP,
                        n = (0, r.createDom)("xg-pip", '<p class="name"><span>' + t + "</span></p>", {tabindex: 9}, "xgplayer-pip");
                    e.once("ready", (function () {
                        e.controls.appendChild(n)
                    })), ["click", "touchend"].forEach((function (t) {
                        n.addEventListener(t, (function (t) {
                            t.preventDefault(), t.stopPropagation(), e.userGestureTrigEvent("pipBtnClick")
                        }))
                    }))
                }
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        var r = n(141);
        "string" == typeof r && (r = [[e.i, r, ""]]);
        var i = {hmr: !0, transform: void 0, insertInto: void 0};
        n(2)(r, i), r.locals && (e.exports = r.locals)
    }, function (e, t, n) {
        (e.exports = n(1)(!1)).push([e.i, ".xgplayer-skin-default .xgplayer-pip{-webkit-order:9;-moz-box-ordinal-group:10;order:9;position:relative;outline:none;display:block;cursor:pointer;height:20px;top:10px}.xgplayer-skin-default .xgplayer-pip .name{text-align:center;font-family:PingFangSC-Regular;font-size:13px;line-height:20px;height:20px;color:hsla(0,0%,100%,.8)}.xgplayer-skin-default .xgplayer-pip .name span{width:60px;height:20px;line-height:20px;background:rgba(0,0,0,.38);border-radius:10px;display:inline-block;vertical-align:middle}.lang-is-jp .xgplayer-pip .name span{width:70px;height:20px}", ""])
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(0);
        n(143), t.default = {
            name: "s_miniplayer", method: function () {
                var e = this;
                if (e.config.miniplayer) {
                    var t = e.lang.MINIPLAYER,
                        n = (0, r.createDom)("xg-miniplayer", '<p class="name"><span>' + t + "</span></p>", {tabindex: 9}, "xgplayer-miniplayer");
                    e.once("ready", (function () {
                        e.controls.appendChild(n)
                    })), ["click", "touchend"].forEach((function (t) {
                        n.addEventListener(t, (function (t) {
                            t.preventDefault(), t.stopPropagation(), e.userGestureTrigEvent("miniplayerBtnClick")
                        }))
                    }))
                }
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        var r = n(144);
        "string" == typeof r && (r = [[e.i, r, ""]]);
        var i = {hmr: !0, transform: void 0, insertInto: void 0};
        n(2)(r, i), r.locals && (e.exports = r.locals)
    }, function (e, t, n) {
        (e.exports = n(1)(!1)).push([e.i, ".xgplayer-skin-default .xgplayer-miniplayer{-webkit-order:9;-moz-box-ordinal-group:10;order:9;position:relative;outline:none;display:block;cursor:pointer;height:20px;top:10px}.xgplayer-skin-default .xgplayer-miniplayer .name{text-align:center;font-family:PingFangSC-Regular;font-size:13px;line-height:20px;height:20px;color:hsla(0,0%,100%,.8)}.xgplayer-skin-default .xgplayer-miniplayer .name span{width:80px;height:20px;line-height:20px;background:rgba(0,0,0,.38);border-radius:10px;display:inline-block;vertical-align:middle}.xgplayer-skin-default .xgplayer-miniplayer-lay{position:absolute;top:26px;left:0;width:100%;height:100%;z-index:130;cursor:pointer;background-color:transparent;display:none}.xgplayer-skin-default .xgplayer-miniplayer-lay div{width:100%;height:100%}.xgplayer-skin-default .xgplayer-miniplayer-drag{cursor:move;position:absolute;top:0;left:0;width:100%;height:26px;line-height:26px;background-image:linear-gradient(rgba(0,0,0,.3),transparent);z-index:130;display:none}.xgplayer-skin-default .xgplayer-miniplayer-drag .drag-handle{width:100%}.xgplayer-skin-default.xgplayer-miniplayer-active{position:fixed;right:0;bottom:200px;width:320px;height:180px;z-index:110}.xgplayer-skin-default.xgplayer-miniplayer-active .xgplayer-controls,.xgplayer-skin-default.xgplayer-miniplayer-active .xgplayer-danmu{display:none}.xgplayer-skin-default.xgplayer-miniplayer-active .xgplayer-miniplayer-lay{display:block}.xgplayer-skin-default.xgplayer-miniplayer-active .xgplayer-miniplayer-drag{display:-webkit-flex;display:-moz-box;display:flex}.xgplayer-skin-default.xgplayer-inactive .xgplayer-miniplayer-drag{display:none}.lang-is-jp .xgplayer-miniplayer .name span{width:70px;height:20px}", ""])
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r, i = n(0), a = n(146), o = (r = a) && r.__esModule ? r : {default: r};
        n(147), t.default = {
            name: "s_playNext", method: function () {
                var e = this, t = e.config.playNext;
                if (t && t.urlList) {
                    var n = (0, i.createDom)("xg-playnext", '<xg-icon class="xgplayer-icon">' + o.default + "</xg-icon>", {}, "xgplayer-playnext"),
                        r = e.lang.PLAYNEXT_TIPS,
                        a = (0, i.createDom)("xg-tips", '<span class="xgplayer-tip-playnext">' + r + "</span>", {}, "xgplayer-tips");
                    n.appendChild(a), e.once("ready", (function () {
                        e.controls.appendChild(n)
                    })), ["click", "touchend"].forEach((function (t) {
                        n.addEventListener(t, (function (t) {
                            t.preventDefault(), t.stopPropagation(), (0, i.addClass)(e.root, "xgplayer-is-enter"), e.userGestureTrigEvent("playNextBtnClick")
                        }))
                    }));
                    var l = function () {
                        (0, i.addClass)(e.root, "xgplayer-playnext-inactive")
                    };
                    e.on("urlListEnd", l), e.once("destroy", (function t() {
                        e.off("urlListEnd", l), e.off("destroy", t)
                    }))
                }
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        n.r(t), t.default = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">\n  <path transform="scale(0.038 0.028)" d="M800 380v768h-128v-352l-320 320v-704l320 320v-352z"></path>\n</svg>\n'
    }, function (e, t, n) {
        var r = n(148);
        "string" == typeof r && (r = [[e.i, r, ""]]);
        var i = {hmr: !0, transform: void 0, insertInto: void 0};
        n(2)(r, i), r.locals && (e.exports = r.locals)
    }, function (e, t, n) {
        (e.exports = n(1)(!1)).push([e.i, ".xgplayer-skin-default .xgplayer-playnext{position:relative;-webkit-order:1;-moz-box-ordinal-group:2;order:1;display:block;cursor:pointer;top:-2px}.xgplayer-skin-default .xgplayer-playnext .xgplayer-icon div{position:absolute}.xgplayer-skin-default .xgplayer-playnext .xgplayer-tips .xgplayer-tip-playnext{display:block}.xgplayer-skin-default .xgplayer-playnext:hover{opacity:.85}.xgplayer-skin-default .xgplayer-playnext:hover .xgplayer-tips{display:block}.xgplayer-lang-is-en .xgplayer-playnext .xgplayer-tips{margin-left:-25px}.xgplayer-lang-is-jp .xgplayer-playnext .xgplayer-tips{margin-left:-38px}.xgplayer-skin-default.xgplayer-playnext-inactive .xgplayer-playnext{display:none}", ""])
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r, i = n(0), a = n(150), o = (r = a) && r.__esModule ? r : {default: r};
        n(151), t.default = {
            name: "s_rotate", method: function () {
                var e = this;
                if (e.config.rotate) {
                    var t = (0, i.createDom)("xg-rotate", '<xg-icon class="xgplayer-icon">' + o.default + "</xg-icon>", {}, "xgplayer-rotate"),
                        n = e.lang.ROTATE_TIPS,
                        r = (0, i.createDom)("xg-tips", '<span class="xgplayer-tip-rotate">' + n + "</span>", {}, "xgplayer-tips");
                    t.appendChild(r), e.once("ready", (function () {
                        e.controls.appendChild(t)
                    })), ["click", "touchend"].forEach((function (n) {
                        t.addEventListener(n, (function (t) {
                            t.preventDefault(), t.stopPropagation(), e.userGestureTrigEvent("rotateBtnClick")
                        }))
                    }))
                }
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        n.r(t), t.default = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 40 40" fill="none">\n  <g clip-path="url(#clip0)">\n    <path transform="scale(1.5 1.5)" d="M11.6665 9.16663H4.1665C2.78579 9.16663 1.6665 10.2859 1.6665 11.6666V15.8333C1.6665 17.214 2.78579 18.3333 4.1665 18.3333H11.6665C13.0472 18.3333 14.1665 17.214 14.1665 15.8333V11.6666C14.1665 10.2859 13.0472 9.16663 11.6665 9.16663Z" fill="white"/>\n    <path transform="scale(1.5 1.5)" fill-rule="evenodd" clip-rule="evenodd" d="M3.88148 4.06298C3.75371 4.21005 3.67667 4.40231 3.67749 4.61242C3.67847 4.87253 3.79852 5.10435 3.98581 5.25646L6.99111 8.05895C7.32771 8.37283 7.85502 8.35443 8.16891 8.01782C8.48279 7.68122 8.46437 7.15391 8.12778 6.84003L6.62061 5.43457L9.8198 5.4224C9.82848 5.42239 9.8372 5.42221 9.84591 5.4219C10.9714 5.38233 12.0885 5.6285 13.0931 6.13744C14.0976 6.64635 14.957 7.40148 15.5908 8.33234C16.2246 9.2632 16.6122 10.3394 16.7177 11.4606C16.823 12.5819 16.6427 13.7115 16.1934 14.7442C16.0098 15.1661 16.203 15.6571 16.6251 15.8408C17.0471 16.0243 17.5381 15.8311 17.7216 15.4091C18.2833 14.1183 18.5087 12.7063 18.3771 11.3047C18.2453 9.90318 17.7607 8.55792 16.9684 7.39433C16.1761 6.23073 15.1021 5.28683 13.8463 4.65065C12.5946 4.01651 11.203 3.70872 9.80072 3.75583L6.43415 3.76862L7.96326 2.12885C8.27715 1.79225 8.25872 1.26494 7.92213 0.951061C7.58553 0.63718 7.05822 0.655585 6.74433 0.99219L3.90268 4.0395C3.89545 4.04724 3.88841 4.05509 3.88154 4.06303L3.88148 4.06298Z" fill="white"/>\n  </g>\n  <defs>\n    <clipPath id="clip0">\n      <rect width="40" height="40" fill="white"/>\n    </clipPath>\n  </defs>\n</svg>\n'
    }, function (e, t, n) {
        var r = n(152);
        "string" == typeof r && (r = [[e.i, r, ""]]);
        var i = {hmr: !0, transform: void 0, insertInto: void 0};
        n(2)(r, i), r.locals && (e.exports = r.locals)
    }, function (e, t, n) {
        (e.exports = n(1)(!1)).push([e.i, ".xgplayer-skin-default .xgplayer-rotate{position:relative;-webkit-order:10;-moz-box-ordinal-group:11;order:10;display:block;cursor:pointer}.xgplayer-skin-default .xgplayer-rotate .xgplayer-icon{margin-top:7px;width:26px}.xgplayer-skin-default .xgplayer-rotate .xgplayer-icon div{position:absolute}.xgplayer-skin-default .xgplayer-rotate .xgplayer-tips{margin-left:-22px}.xgplayer-skin-default .xgplayer-rotate .xgplayer-tips .xgplayer-tip-rotate{display:block}.xgplayer-skin-default .xgplayer-rotate:hover{opacity:.85}.xgplayer-skin-default .xgplayer-rotate:hover .xgplayer-tips{display:block}.xgplayer-lang-is-en .xgplayer-rotate .xgplayer-tips{margin-left:-26px}.xgplayer-lang-is-jp .xgplayer-rotate .xgplayer-tips{margin-left:-38px}", ""])
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r, i = n(0), a = n(154), o = (r = a) && r.__esModule ? r : {default: r};
        n(155), t.default = {
            name: "s_reload", method: function () {
                var e = this;
                if (e.config.reload) {
                    var t = (0, i.createDom)("xg-reload", '<xg-icon class="xgplayer-icon">' + o.default + "</xg-icon>", {}, "xgplayer-reload"),
                        n = e.lang.RELOAD_TIPS,
                        r = (0, i.createDom)("xg-tips", '<span class="xgplayer-tip-reload">' + n + "</span>", {}, "xgplayer-tips");
                    t.appendChild(r), e.once("ready", (function () {
                        e.controls.appendChild(t)
                    })), ["click", "touchend"].forEach((function (n) {
                        t.addEventListener(n, (function (t) {
                            t.preventDefault(), t.stopPropagation(), e.userGestureTrigEvent("reloadBtnClick")
                        }))
                    }))
                }
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        n.r(t), t.default = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">\n    <path fill="#FFF" fill-opacity="1" fill-rule="nonzero" d="M18.17 19.988a7.182 7.182 0 0 1-4.256 1.318 7.806 7.806 0 0 1-.595-.03c-.08-.008-.16-.021-.242-.031a8.004 8.004 0 0 1-.458-.071c-.094-.018-.185-.042-.276-.063a7.743 7.743 0 0 1-.439-.113c-.068-.022-.136-.047-.205-.07a7.03 7.03 0 0 1-.492-.181c-.037-.015-.072-.032-.108-.049a7.295 7.295 0 0 1-.554-.269l-.025-.012a7.347 7.347 0 0 1-2.111-1.753c-.03-.036-.057-.074-.086-.11a7.305 7.305 0 0 1-1.594-4.557h1.686a.123.123 0 0 0 .108-.064.119.119 0 0 0-.006-.125L5.684 9.532a.123.123 0 0 0-.103-.056.123.123 0 0 0-.102.056l-2.834 4.276a.121.121 0 0 0-.005.125c.022.04.064.064.107.064h1.687c0 2.025.627 3.902 1.693 5.454.013.021.022.044.037.066.11.159.233.305.352.455.043.057.085.116.13.171.175.213.36.413.55.61.02.018.036.038.054.055a9.447 9.447 0 0 0 2.91 1.996c.058.026.115.054.175.079.202.084.41.158.619.228.098.034.196.069.296.1.183.054.37.1.558.145.125.029.249.06.376.085.052.01.102.027.155.035.177.032.355.05.533.071.064.007.128.018.19.026.32.03.639.052.956.052a9.46 9.46 0 0 0 5.47-1.746 1.16 1.16 0 0 0 .282-1.608 1.143 1.143 0 0 0-1.6-.283zm5.397-5.991a9.604 9.604 0 0 0-1.685-5.441c-.016-.027-.026-.054-.043-.078-.132-.19-.276-.366-.419-.543-.017-.022-.032-.044-.05-.065a9.467 9.467 0 0 0-3.571-2.7l-.114-.051a11.2 11.2 0 0 0-.673-.248c-.082-.027-.163-.057-.247-.082a9.188 9.188 0 0 0-.6-.156c-.113-.026-.224-.055-.337-.077-.057-.011-.109-.028-.164-.037-.151-.027-.304-.039-.455-.058-.104-.013-.208-.03-.313-.04a10.05 10.05 0 0 0-.759-.039c-.045 0-.09-.007-.136-.007l-.025.003a9.45 9.45 0 0 0-5.46 1.737 1.16 1.16 0 0 0-.284 1.608c.363.523 1.08.65 1.6.284a7.182 7.182 0 0 1 4.222-1.32c.217.002.429.013.639.033.065.007.129.017.193.025.173.021.344.046.513.08.075.014.149.033.221.05.166.037.331.077.494.127l.152.051c.185.061.366.127.545.201l.054.025a7.308 7.308 0 0 1 2.741 2.067l.013.018a7.302 7.302 0 0 1 1.652 4.633h-1.686a.123.123 0 0 0-.108.064.12.12 0 0 0 .006.124l2.834 4.277c.022.033.06.054.103.054.042 0 .08-.021.102-.054l2.833-4.277a.12.12 0 0 0 .005-.124.123.123 0 0 0-.108-.064h-1.685z"/>\n</svg>\n'
    }, function (e, t, n) {
        var r = n(156);
        "string" == typeof r && (r = [[e.i, r, ""]]);
        var i = {hmr: !0, transform: void 0, insertInto: void 0};
        n(2)(r, i), r.locals && (e.exports = r.locals)
    }, function (e, t, n) {
        (e.exports = n(1)(!1)).push([e.i, ".xgplayer-skin-default .xgplayer-reload{position:relative;-webkit-order:1;-moz-box-ordinal-group:2;order:1;display:block;width:40px;height:40px;cursor:pointer}.xgplayer-skin-default .xgplayer-reload .xgplayer-icon{margin-top:7px;width:26px}.xgplayer-skin-default .xgplayer-reload .xgplayer-icon div{position:absolute}.xgplayer-skin-default .xgplayer-reload .xgplayer-tips{margin-left:-22px}.xgplayer-skin-default .xgplayer-reload .xgplayer-tips .xgplayer-tip-reload{display:block}.xgplayer-skin-default .xgplayer-reload:hover{opacity:.85}.xgplayer-skin-default .xgplayer-reload:hover .xgplayer-tips{display:block}.xgplayer-lang-is-en .xgplayer-reload .xgplayer-tips{margin-left:-26px}.xgplayer-lang-is-jp .xgplayer-reload .xgplayer-tips{margin-left:-38px}", ""])
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(0);
        n(158), t.default = {
            name: "s_screenShot", method: function () {
                var e = this;
                if (e.config.screenShot && !e.config.screenShot.hideButton) {
                    var t = e.lang.SCREENSHOT,
                        n = (0, r.createDom)("xg-screenshot", '<p class="name"><span>' + (e.config.screenShot.iconText || t) + "</span></p>", {tabindex: 11}, "xgplayer-screenshot");
                    e.once("ready", (function () {
                        e.controls.appendChild(n)
                    })), ["click", "touchend"].forEach((function (t) {
                        n.addEventListener(t, (function (t) {
                            t.preventDefault(), t.stopPropagation(), e.userGestureTrigEvent("screenShotBtnClick")
                        }))
                    }))
                }
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        var r = n(159);
        "string" == typeof r && (r = [[e.i, r, ""]]);
        var i = {hmr: !0, transform: void 0, insertInto: void 0};
        n(2)(r, i), r.locals && (e.exports = r.locals)
    }, function (e, t, n) {
        (e.exports = n(1)(!1)).push([e.i, ".xgplayer-skin-default .xgplayer-screenshot{-webkit-order:11;-moz-box-ordinal-group:12;order:11;position:relative;outline:none;display:block;cursor:pointer;height:20px;top:10px}.xgplayer-skin-default .xgplayer-screenshot .name{text-align:center;font-family:PingFangSC-Regular;font-size:13px;line-height:20px;height:20px;color:hsla(0,0%,100%,.8)}.xgplayer-skin-default .xgplayer-screenshot .name span{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;padding:0 10px;height:20px;line-height:20px;background:rgba(0,0,0,.38);border-radius:10px;display:inline-block;vertical-align:middle}.xgplayer-lang-is-en .xgplayer-screenshot .name span,.xgplayer-lang-is-jp .xgplayer-screenshot .name span{width:75px;height:20px}", ""])
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r, i = n(9), a = (r = i) && r.__esModule ? r : {default: r};
        n(78), t.default = {
            name: "s_nativeTextTrack", method: function () {
                if (this.config.nativeTextTrack) {
                    var e = this, t = e.root, n = a.default.util,
                        r = n.createDom("xg-texttrack", "", {tabindex: 7}, "xgplayer-texttrack"),
                        i = e.config.nativeTextTrack;
                    i && Array.isArray(i) && i.length > 0 && (n.addClass(e.root, "xgplayer-is-texttrack"), e.once("canplay", (function () {
                        var a = this, o = ["<ul>"];
                        o.push("<li class='" + (this.textTrackShowDefault ? "" : "selected") + "'}'>" + e.lang.OFF + "</li>"), i.forEach((function (e) {
                            o.push("<li class='" + (e.default && a.textTrackShowDefault ? "selected" : "") + "'>" + e.label + "</li>")
                        }));
                        var l = e.lang.TEXTTRACK;
                        o.push('</ul><p class="name">' + l + "</p>");
                        var s = t.querySelector(".xgplayer-texttrack");
                        if (s) {
                            s.innerHTML = o.join("");
                            var c = s.querySelector(".name");
                            e.config.textTrackActive && "hover" !== e.config.textTrackActive || c.addEventListener("mouseenter", (function (e) {
                                e.preventDefault(), e.stopPropagation(), n.addClass(t, "xgplayer-texttrack-active"), s.focus()
                            }))
                        } else {
                            r.innerHTML = o.join("");
                            var u = r.querySelector(".name");
                            e.config.textTrackActive && "hover" !== e.config.textTrackActive || u.addEventListener("mouseenter", (function (t) {
                                t.preventDefault(), t.stopPropagation(), n.addClass(e.root, "xgplayer-texttrack-active"), r.focus()
                            })), e.controls.appendChild(r)
                        }
                    }))), ["touchend", "click"].forEach((function (t) {
                        r.addEventListener(t, (function (t) {
                            t.preventDefault(), t.stopPropagation();
                            var a = t.target || t.srcElement;
                            if (a && "li" === a.tagName.toLocaleLowerCase()) {
                                Array.prototype.forEach.call(a.parentNode.childNodes, (function (e) {
                                    n.removeClass(e, "selected")
                                })), n.addClass(a, "selected");
                                var o = e.root.getElementsByTagName("Track");
                                a.innerHTML === e.lang.OFF ? (o[0].track.mode = "hidden", o[0].src = "", n.removeClass(e.root, "xgplayer-texttrack-active")) : (o[0].style.display = "block", n.addClass(e.root, "xgplayer-texttrack-active"), o[0].track.mode = "showing", i.some((function (e) {
                                    if (e.label === a.innerHTML) return o[0].src = e.src, e.kind && (o[0].kind = e.kind), o[0].label = e.label, e.srclang && (o[0].srclang = e.srclang), !0
                                })), e.emit("textTrackChange", a.innerHTML))
                            } else "click" !== e.config.textTrackActive || !a || "p" !== a.tagName.toLocaleLowerCase() && "em" !== a.tagName.toLocaleLowerCase() || (n.addClass(e.root, "xgplayer-texttrack-active"), r.focus())
                        }), !1)
                    })), e.on("play", (function () {
                        var r = t.querySelector(".xgplayer-texttrack ul"), a = t.getElementsByTagName("Track");
                        e.hls && r && a && (a[0].src = "", Array.prototype.forEach.call(r.childNodes, (function (t) {
                            n.hasClass(t, "selected") && (t.innerHTML === e.lang.OFF ? (a[0].track.mode = "hidden", a[0].src = "") : (a[0].track.mode = "hidden", i.some((function (e) {
                                if (e.label !== t.innerHTML) return a[0].src = e.src, e.kind && (a[0].kind = e.kind), a[0].label = e.label, e.srclang && (a[0].srclang = e.srclang), !0
                            })), i.some((function (e) {
                                if (e.label === t.innerHTML) return setTimeout((function () {
                                    a[0].src = e.src, e.kind && (a[0].kind = e.kind), a[0].label = e.label, e.srclang && (a[0].srclang = e.srclang), a[0].track.mode = "showing"
                                })), !0
                            }))))
                        })), n.removeClass(e.root, "xgplayer-texttrack-active"))
                    })), r.addEventListener("mouseleave", (function (t) {
                        t.preventDefault(), t.stopPropagation(), n.removeClass(e.root, "xgplayer-texttrack-active")
                    }))
                }
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        (e.exports = n(1)(!1)).push([e.i, ".xgplayer-skin-default .xgplayer-texttrack{-webkit-order:7;-moz-box-ordinal-group:8;order:7;width:60px;height:150px;z-index:18;position:relative;outline:none;display:none;cursor:default;margin-top:-119px}.xgplayer-skin-default .xgplayer-texttrack ul{display:none;list-style:none;min-width:78px;background:rgba(0,0,0,.54);border-radius:1px;position:absolute;bottom:30px;text-align:center;white-space:nowrap;left:50%;-webkit-transform:translateX(-50%);-ms-transform:translateX(-50%);transform:translateX(-50%);width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;z-index:26;cursor:pointer}.xgplayer-skin-default .xgplayer-texttrack ul li{opacity:.7;font-family:PingFangSC-Regular;font-size:11px;color:hsla(0,0%,100%,.8);width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;margin:auto;padding:6px 13px}.xgplayer-skin-default .xgplayer-texttrack ul li.selected,.xgplayer-skin-default .xgplayer-texttrack ul li:hover{color:#fff;opacity:1}.xgplayer-skin-default .xgplayer-texttrack .name{text-align:center;font-family:PingFangSC-Regular;font-size:13px;cursor:pointer;color:hsla(0,0%,100%,.8);position:absolute;bottom:0;width:60px;height:20px;line-height:20px;background:rgba(0,0,0,.38);border-radius:10px;display:inline-block;vertical-align:middle}.xgplayer-skin-default .xgplayer-texttrack.xgplayer-texttrack-hide{display:none}xg-text-track{transition:bottom .3s ease}.xgplayer-skin-default.xgplayer-is-texttrack .xgplayer-texttrack,.xgplayer-skin-default.xgplayer-texttrack-active .xgplayer-texttrack ul{display:block}", ""])
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(0);

        function i(e, t, n, r) {
            if (0 !== t.length) {
                var i = [];
                i.push('<li data-type="off" class="' + (r ? "" : "selected") + '">' + n + "</li>"), t.forEach((function (e) {
                    i.push("<li data-id=" + e.id + " data-language=" + e.language + ' class="' + (e.isDefault && r ? "selected" : "") + '">' + e.label + "</li>")
                })), e.innerHTML = i.join("")
            } else e.innerHTML = ""
        }

        n(78), t.default = {
            name: "s_textTrack", method: function () {
                var e = this;
                if (this.config.textTrack) {
                    var t = this.config.textTrack, n = e.lang.TEXTTRACK,
                        a = (0, r.createDom)("xg-texttrack", '<ul></ul><p class="name">' + n + "</p>", {tabindex: 7}, "xgplayer-texttrack");
                    t && Array.isArray(t) && (t.length > 0 && (0, r.addClass)(e.root, "xgplayer-is-texttrack"), e.once("canplay", (function () {
                        if (!e.root.querySelector(".xgplayer-texttrack")) {
                            e.controls.appendChild(a);
                            var n = a.querySelector(".name");
                            e.config.textTrackActive && "hover" !== e.config.textTrackActive ? n.addEventListener("click", (function (t) {
                                t.preventDefault(), t.stopPropagation(), (0, r.hasClass)(e.root, "xgplayer-texttrack-active") ? (0, r.removeClass)(e.root, "xgplayer-texttrack-active") : (0, r.addClass)(e.root, "xgplayer-texttrack-active")
                            })) : (n.addEventListener("mouseenter", (function (t) {
                                t.preventDefault(), t.stopPropagation(), (0, r.addClass)(e.root, "xgplayer-texttrack-active"), a.focus()
                            })), a.addEventListener("mouseleave", (function (t) {
                                t.preventDefault(), t.stopPropagation(), (0, r.removeClass)(e.root, "xgplayer-texttrack-active")
                            })))
                        }
                        ["touchend", "click"].forEach((function (t) {
                            a.addEventListener(t, (function (t) {
                                t.preventDefault(), t.stopPropagation();
                                var n = t.target || t.srcElement;
                                if (n && "li" === n.tagName.toLocaleLowerCase()) {
                                    var i = n.getAttribute("data-id"), a = n.getAttribute("data-type"),
                                        o = n.getAttribute("data-language");
                                    Array.prototype.forEach.call(n.parentNode.childNodes, (function (e) {
                                        (0, r.removeClass)(e, "selected")
                                    })), (0, r.addClass)(n, "selected"), "off" === a ? (e.switchOffSubtile(), (0, r.removeClass)(e.root, "xgplayer-texttrack-active")) : (e.switchSubTitle({
                                        id: i,
                                        language: o
                                    }), (0, r.addClass)(e.root, "xgplayer-texttrack-active"))
                                }
                            }))
                        })), i(a.getElementsByTagName("ul")[0], t, e.lang.OFF, e.textTrackShowDefault), 0 === t.length ? (0, r.addClass)(a, "xgplayer-texttrack-hide") : (0, r.removeClass)(a, "xgplayer-texttrack-hide")
                    })), e.on("subtitle_change", (function (n) {
                        if (n.isListUpdate) {
                            var o = a.getElementsByTagName("ul")[0];
                            t = n.list, i(o, n.list, e.lang.OFF, e.textTrackShowDefault), n.list.length > 0 ? (0, r.addClass)(e.root, "xgplayer-is-texttrack") : (0, r.removeClass)(e.root, "xgplayer-is-texttrack"), 0 === n.list.length ? (0, r.addClass)(a, "xgplayer-texttrack-hide") : (0, r.removeClass)(a, "xgplayer-texttrack-hide")
                        }
                    })))
                }
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(0);
        n(164), t.default = {
            name: "s_error", method: function () {
                var e = this, t = e.root,
                    n = (0, r.createDom)("xg-error", '<span class="xgplayer-error-text">请<span class="xgplayer-error-refresh">刷新</span>试试</span>', {}, "xgplayer-error");
                e.once("ready", (function () {
                    t.appendChild(n)
                }));
                var i = n.querySelector(".xgplayer-error-text");
                e.config.lang && "zh-cn" === e.config.lang ? i.innerHTML = e.config.errorTips || '请<span class="xgplayer-error-refresh">刷新</span>试试' : i.innerHTML = e.config.errorTips || 'please try to <span class="xgplayer-error-refresh">refresh</span>';
                var a = null;

                function o() {
                    (0, r.addClass)(e.root, "xgplayer-is-error"), (a = n.querySelector(".xgplayer-error-refresh")) && ["touchend", "click"].forEach((function (t) {
                        a.addEventListener(t, (function (t) {
                            t.preventDefault(), t.stopPropagation(), e.autoplay = !0;
                            var n = e.currentTime;
                            e.once("playing", (function () {
                                e.currentTime = n, (0, r.removeClass)(e.root, "xgplayer-is-error")
                            })), e.src = e.config.url
                        }))
                    }))
                }

                e.on("error", o), e.once("destroy", (function t() {
                    e.off("error", o), e.off("destroy", t)
                }))
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        var r = n(165);
        "string" == typeof r && (r = [[e.i, r, ""]]);
        var i = {hmr: !0, transform: void 0, insertInto: void 0};
        n(2)(r, i), r.locals && (e.exports = r.locals)
    }, function (e, t, n) {
        (e.exports = n(1)(!1)).push([e.i, ".xgplayer-skin-default .xgplayer-error{background:#000;display:none;position:absolute;left:0;top:0;width:100%;height:100%;z-index:125;font-family:PingFangSC-Regular;font-size:14px;color:#fff;text-align:center;line-height:100%;-webkit-justify-content:center;-moz-box-pack:center;justify-content:center;-webkit-align-items:center;-moz-box-align:center;align-items:center}.xgplayer-skin-default .xgplayer-error .xgplayer-error-refresh{color:#fa1f41;padding:0 3px;cursor:pointer}.xgplayer-skin-default .xgplayer-error .xgplayer-error-text{line-height:18px;margin:auto 6px}.xgplayer-skin-default.xgplayer-is-error .xgplayer-error{display:-webkit-flex;display:-moz-box;display:flex}", ""])
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(0);
        n(167), t.default = {
            name: "s_memoryPlay", method: function () {
                var e = this, t = e.config.lastPlayTime || 0, n = e.config.lastPlayTimeHideDelay || 0, i = null;
                if (!(t <= 0)) {
                    (i = (0, r.createDom)("xg-memoryplay", '<div class="xgplayer-memoryplay-spot"><div class="xgplayer-progress-tip">您上次观看到 <span class="xgplayer-lasttime">' + (0, r.format)(t) + '</span> ，为您自动续播 <span class="btn-close"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg></span></div></div>', {}, "xgplayer-memoryplay")).addEventListener("mouseover", (function (e) {
                        e.stopPropagation()
                    }));
                    var a = function () {
                        i && i.parentNode && i.parentNode.removeChild(i), i = null
                    };
                    i.querySelector(".xgplayer-progress-tip .btn-close").addEventListener("click", a), e.once("playing", (function () {
                        n > 0 && e.root.appendChild(i), e.emit("memoryPlayStart", t), n > 0 && setTimeout((function () {
                            a()
                        }), 1e3 * n)
                    })), e.once("ended", a)
                }
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        var r = n(168);
        "string" == typeof r && (r = [[e.i, r, ""]]);
        var i = {hmr: !0, transform: void 0, insertInto: void 0};
        n(2)(r, i), r.locals && (e.exports = r.locals)
    }, function (e, t, n) {
        (e.exports = n(1)(!1)).push([e.i, ".xgplayer-skin-default .xgplayer-memoryplay-spot{position:absolute;height:32px;left:10px;bottom:46px;background:rgba(0,0,0,.5);border-radius:32px;line-height:32px;color:#ddd;z-index:15;padding:0 32px 0 16px}.xgplayer-skin-default .xgplayer-memoryplay-spot .xgplayer-lasttime{color:red;font-weight:700}.xgplayer-skin-default .xgplayer-memoryplay-spot .btn-close{position:absolute;width:16px;height:16px;right:10px;top:2px;cursor:pointer;color:#fff;font-size:16px}", ""])
    }, function (e, t, n) {
        Object.defineProperty(t, "__esModule", {value: !0});
        var r, i = n(0), a = n(170), o = (r = a) && r.__esModule ? r : {default: r};
        n(171), t.default = {
            name: "s_airplay", method: function () {
                var e = this;
                if (e.config.airplay && window.WebKitPlaybackTargetAvailabilityEvent) {
                    var t = (0, i.createDom)("xg-airplay", '<xg-icon class="xgplayer-icon">\n    <div class="xgplayer-icon-airplay">' + o.default + "</div>\n  </xg-icon>", {}, "xgplayer-airplay"),
                        n = (0, i.createDom)("xg-tips", '<span class="xgplayer-tip-airplay">' + e.lang.AIRPLAY_TIPS + "</span>", {}, "xgplayer-tips");
                    t.appendChild(n), e.once("ready", (function () {
                        e.controls.appendChild(t), e.video.addEventListener("webkitplaybacktargetavailabilitychanged", (function (e) {
                            switch (e.availability) {
                                case"available":
                                    t.hidden = !1, t.disabled = !1;
                                    break;
                                case"not-available":
                                    t.hidden = !0, t.disabled = !0
                            }
                        }))
                    })), ["click", "touchend"].forEach((function (n) {
                        t.addEventListener(n, (function (t) {
                            t.preventDefault(), t.stopPropagation(), e.userGestureTrigEvent("airplayBtnClick")
                        }))
                    }))
                }
            }
        }, e.exports = t.default
    }, function (e, t, n) {
        n.r(t), t.default = '<svg t="1600422191774" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3100" width="28" height="28"><path d="M256 938.666667h512L512 597.333333 256 938.666667z m170.666667-85.333334l85.333333-113.781333L597.333333 853.333333H426.666667zM853.333333 85.333333H170.666667C99.946667 85.333333 42.666667 142.613333 42.666667 213.333333v426.666667c0 70.72 57.28 128 128 128h106.666666l64-85.333333H170.666667c-23.573333 0-42.666667-19.093333-42.666667-42.666667V213.333333c0-23.573333 19.093333-42.666667 42.666667-42.666666h682.666666c23.573333 0 42.666667 19.093333 42.666667 42.666666v426.666667c0 23.573333-19.093333 42.666667-42.666667 42.666667H682.666667l64 85.333333h106.666666c70.72 0 128-57.28 128-128V213.333333c0-70.72-57.28-128-128-128z" p-id="3101" fill="#ffffff"></path></svg>'
    }, function (e, t, n) {
        var r = n(172);
        "string" == typeof r && (r = [[e.i, r, ""]]);
        var i = {hmr: !0, transform: void 0, insertInto: void 0};
        n(2)(r, i), r.locals && (e.exports = r.locals)
    }, function (e, t, n) {
        (e.exports = n(1)(!1)).push([e.i, ".xgplayer-skin-default .xgplayer-airplay{position:relative;-webkit-order:11;-moz-box-ordinal-group:12;order:11;display:block;cursor:pointer;margin-left:5px;margin-right:3px}.xgplayer-skin-default .xgplayer-airplay .xgplayer-icon{margin-top:6px;margin-left:6px}.xgplayer-skin-default .xgplayer-airplay .xgplayer-icon div{position:absolute}.xgplayer-skin-default .xgplayer-airplay .xgplayer-icon .xgplayer-icon-airplay{display:block}.xgplayer-skin-default .xgplayer-airplay .xgplayer-tips{position:absolute;right:0;left:auto}.xgplayer-skin-default .xgplayer-airplay .xgplayer-tips .xgplayer-tip-airplay{display:block}.xgplayer-skin-default .xgplayer-airplay:hover{opacity:.85}.xgplayer-skin-default .xgplayer-airplay:hover .xgplayer-tips{display:block}", ""])
    }])
};
const mu = gu(yu.exports = hu()), vu = {class: "video-content"}, xu = {class: "video-poster"}, bu = ["id"],
    ku = [(e => (Qt = "data-v-90cab7c4", e = e(), Qt = null, e))((() => Xr("svg", {
        class: "icon-close",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, [Xr("path", {
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
        d: "M9.64154 5.30933L3.51654 11.4343C3.20412 11.7467 3.20412 12.2533 3.51654 12.5657L9.64154 18.6907L10.7729 17.5593L6.0136 12.8H20.7072V11.2H6.0136L10.7729 6.4407L9.64154 5.30933Z",
        fill: "white",
        "fill-opacity": "0.85"
    })], -1)))], wu = Xc(mn({
        __name: "video", props: {ignores: null, video: null, poster: null, playerId: null}, setup(e) {
            const t = e;
            let n = null;
            const r = ps(), i = vt(), a = vt(!0), l = vt(!1), s = vt(!0),
                c = it({player: {}, fullscreen: !1, blobSrc: "", isblob: 0, currentTime: 0}), u = vi((() => {
                    let e = !1;
                    return e = !!c.fullscreen && !(!c.fullscreen || !s.value), e
                }));

            function p() {
                c.player.exitCssFullscreen()
            }

            function d() {
                v(!1), n = setInterval((() => {
                    c.player.ended && (a.value = !0, l.value = !0, clearInterval(n))
                })), c.blobSrc || c.isblob || _(t.video), b(), c.fullscreen && ou({method: "hideNavBar"})
            }

            function f() {
                i.value.querySelector(".xgplayer-loading").onclick = () => {
                    c.player.pause()
                }
            }

            function g() {
                3 === c.isblob && (c.player.src = t.video, c.blobSrc = "", c.player.play(), _(t.video)), b()
            }

            function h() {
                v(!0), c.fullscreen && ou({method: "showNavBar"})
            }

            function y() {
                x(!0)
            }

            function m() {
                x(!1)
            }

            function v(e) {
                s.value = e
            }

            function x(e) {
                (e ? lu : su)().then((() => {
                    c.fullscreen = e
                }))
            }

            function b() {
                3 !== c.isblob && ou({method: "getNetStatus"}).then((e => {
                    var t;
                    const n = null == (t = e.data) ? void 0 : t.netStatus;
                    0 === n ? cu({toast: r.t("playVideoTip"), time: 2e3}) : 1 === n && cu({
                        toast: r.t("networkTip"),
                        time: 2e3
                    })
                }))
            }

            function k() {
                a.value = !1, c.player.play()
            }

            function w() {
                c.blobSrc && 2 === c.isblob && (c.player.src = c.blobSrc), a.value = !1, l.value = !1, c.blobSrc && 2 === c.isblob && (c.isblob = 3), c.player.play()
            }

            function _(e) {
                c.isblob = 1, c.blobSrc && window.URL.revokeObjectURL(c.blobSrc), fetch(e).then((e => e.blob())).then((e => {
                    const t = window.URL.createObjectURL(e);
                    c.blobSrc = t, c.isblob = 2, window.prompt(`前端log:本地视频地址:${c.blobSrc}`)
                }))
            }

            return Rn((() => {
                c.player = new mu({
                    id: t.playerId,
                    url: t.video,
                    fluid: !0,
                    fitVideoSize: "fixWidth",
                    volume: 0,
                    videoInit: !0,
                    cssFullscreen: !0,
                    ignores: t.ignores ? t.ignores : []
                }), c.player && (c.player.on("play", d), c.player.on("waiting", f), c.player.on("error", g), c.player.on("pause", h), c.player.on("requestCssFullscreen", y), c.player.on("exitCssFullscreen", m))
            })), Tn((() => {
                c.player.off("play", d), c.player.off("waiting", f), c.player.off("error", g), c.player.off("pause", h), c.player.off("requestCssFullscreen", y), c.player.off("exitCssFullscreen", m), c.player.destroy(!0), window.exitCssFullscreen = null, clearInterval(n), window.URL.revokeObjectURL(c.blobSrc)
            })), window.exitCssFullscreen = p, (e, n) => {
                const r = $n("directives", "lazy");
                return Vr(), Hr("div", vu, [Xr("div", {class: o(["video-box", {restfullscreen: c.fullscreen}])}, [Un(Xr("div", xu, [Un(Xr("img", null, null, 512), [[r, t.poster]]), l.value ? (Vr(), Hr("i", {
                    key: 1,
                    class: "video-poster-replay",
                    onClick: w
                })) : (Vr(), Hr("i", {
                    key: 0,
                    class: "video-poster-play",
                    onClick: k
                }))], 512), [[Mi, a.value]]), Xr("div", {
                    id: t.playerId,
                    class: "video-dom ht-night-exclude-node",
                    ref_key: "vidoeRef",
                    ref: i
                }, null, 8, bu)], 2), Un(Xr("span", {class: "vido-back", onClick: p}, ku, 512), [[Mi, wt(u)]])])
            }
        }
    }), [["__scopeId", "data-v-90cab7c4"]]);
var _u, Tu = {exports: {}}, Eu = {exports: {}}, Cu = function (e, t) {
    return function () {
        for (var n = new Array(arguments.length), r = 0; r < n.length; r++) n[r] = arguments[r];
        return e.apply(t, n)
    }
}, Lu = Cu, Ou = Object.prototype.toString, Su = (_u = Object.create(null), function (e) {
    var t = Ou.call(e);
    return _u[t] || (_u[t] = t.slice(8, -1).toLowerCase())
});

function Pu(e) {
    return e = e.toLowerCase(), function (t) {
        return Su(t) === e
    }
}

function Au(e) {
    return Array.isArray(e)
}

function Ru(e) {
    return void 0 === e
}

var Nu = Pu("ArrayBuffer");

function Iu(e) {
    return null !== e && "object" == typeof e
}

function ju(e) {
    if ("object" !== Su(e)) return !1;
    var t = Object.getPrototypeOf(e);
    return null === t || t === Object.prototype
}

var Du = Pu("Date"), Mu = Pu("File"), zu = Pu("Blob"), Vu = Pu("FileList");

function Fu(e) {
    return "[object Function]" === Ou.call(e)
}

var Uu = Pu("URLSearchParams");

function Bu(e, t) {
    if (null != e) if ("object" != typeof e && (e = [e]), Au(e)) for (var n = 0, r = e.length; n < r; n++) t.call(null, e[n], n, e); else for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && t.call(null, e[i], i, e)
}

var Hu, Wu = (Hu = "undefined" != typeof Uint8Array && Object.getPrototypeOf(Uint8Array), function (e) {
    return Hu && e instanceof Hu
}), qu = {
    isArray: Au,
    isArrayBuffer: Nu,
    isBuffer: function (e) {
        return null !== e && !Ru(e) && null !== e.constructor && !Ru(e.constructor) && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
    },
    isFormData: function (e) {
        var t = "[object FormData]";
        return e && ("function" == typeof FormData && e instanceof FormData || Ou.call(e) === t || Fu(e.toString) && e.toString() === t)
    },
    isArrayBufferView: function (e) {
        return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && Nu(e.buffer)
    },
    isString: function (e) {
        return "string" == typeof e
    },
    isNumber: function (e) {
        return "number" == typeof e
    },
    isObject: Iu,
    isPlainObject: ju,
    isUndefined: Ru,
    isDate: Du,
    isFile: Mu,
    isBlob: zu,
    isFunction: Fu,
    isStream: function (e) {
        return Iu(e) && Fu(e.pipe)
    },
    isURLSearchParams: Uu,
    isStandardBrowserEnv: function () {
        return ("undefined" == typeof navigator || "ReactNative" !== navigator.product && "NativeScript" !== navigator.product && "NS" !== navigator.product) && ("undefined" != typeof window && "undefined" != typeof document)
    },
    forEach: Bu,
    merge: function e() {
        var t = {};

        function n(n, r) {
            ju(t[r]) && ju(n) ? t[r] = e(t[r], n) : ju(n) ? t[r] = e({}, n) : Au(n) ? t[r] = n.slice() : t[r] = n
        }

        for (var r = 0, i = arguments.length; r < i; r++) Bu(arguments[r], n);
        return t
    },
    extend: function (e, t, n) {
        return Bu(t, (function (t, r) {
            e[r] = n && "function" == typeof t ? Lu(t, n) : t
        })), e
    },
    trim: function (e) {
        return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
    },
    stripBOM: function (e) {
        return 65279 === e.charCodeAt(0) && (e = e.slice(1)), e
    },
    inherits: function (e, t, n, r) {
        e.prototype = Object.create(t.prototype, r), e.prototype.constructor = e, n && Object.assign(e.prototype, n)
    },
    toFlatObject: function (e, t, n) {
        var r, i, a, o = {};
        t = t || {};
        do {
            for (i = (r = Object.getOwnPropertyNames(e)).length; i-- > 0;) o[a = r[i]] || (t[a] = e[a], o[a] = !0);
            e = Object.getPrototypeOf(e)
        } while (e && (!n || n(e, t)) && e !== Object.prototype);
        return t
    },
    kindOf: Su,
    kindOfTest: Pu,
    endsWith: function (e, t, n) {
        e = String(e), (void 0 === n || n > e.length) && (n = e.length), n -= t.length;
        var r = e.indexOf(t, n);
        return -1 !== r && r === n
    },
    toArray: function (e) {
        if (!e) return null;
        var t = e.length;
        if (Ru(t)) return null;
        for (var n = new Array(t); t-- > 0;) n[t] = e[t];
        return n
    },
    isTypedArray: Wu,
    isFileList: Vu
}, $u = qu;

function Yu(e) {
    return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
}

var Ku = function (e, t, n) {
    if (!t) return e;
    var r;
    if (n) r = n(t); else if ($u.isURLSearchParams(t)) r = t.toString(); else {
        var i = [];
        $u.forEach(t, (function (e, t) {
            null != e && ($u.isArray(e) ? t += "[]" : e = [e], $u.forEach(e, (function (e) {
                $u.isDate(e) ? e = e.toISOString() : $u.isObject(e) && (e = JSON.stringify(e)), i.push(Yu(t) + "=" + Yu(e))
            })))
        })), r = i.join("&")
    }
    if (r) {
        var a = e.indexOf("#");
        -1 !== a && (e = e.slice(0, a)), e += (-1 === e.indexOf("?") ? "?" : "&") + r
    }
    return e
}, Gu = qu;

function Xu() {
    this.handlers = []
}

Xu.prototype.use = function (e, t, n) {
    return this.handlers.push({
        fulfilled: e,
        rejected: t,
        synchronous: !!n && n.synchronous,
        runWhen: n ? n.runWhen : null
    }), this.handlers.length - 1
}, Xu.prototype.eject = function (e) {
    this.handlers[e] && (this.handlers[e] = null)
}, Xu.prototype.forEach = function (e) {
    Gu.forEach(this.handlers, (function (t) {
        null !== t && e(t)
    }))
};
var Ju = Xu, Zu = qu, Qu = qu;

function ep(e, t, n, r, i) {
    Error.call(this), this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), r && (this.request = r), i && (this.response = i)
}

Qu.inherits(ep, Error, {
    toJSON: function () {
        return {
            message: this.message,
            name: this.name,
            description: this.description,
            number: this.number,
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            config: this.config,
            code: this.code,
            status: this.response && this.response.status ? this.response.status : null
        }
    }
});
var tp = ep.prototype, np = {};
["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED"].forEach((function (e) {
    np[e] = {value: e}
})), Object.defineProperties(ep, np), Object.defineProperty(tp, "isAxiosError", {value: !0}), ep.from = function (e, t, n, r, i, a) {
    var o = Object.create(tp);
    return Qu.toFlatObject(e, o, (function (e) {
        return e !== Error.prototype
    })), ep.call(o, e.message, t, n, r, i), o.name = e.name, a && Object.assign(o, a), o
};
var rp = ep, ip = {silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1}, ap = qu;
var op, lp, sp, cp, up = function (e, t) {
    t = t || new FormData;
    var n = [];

    function r(e) {
        return null === e ? "" : ap.isDate(e) ? e.toISOString() : ap.isArrayBuffer(e) || ap.isTypedArray(e) ? "function" == typeof Blob ? new Blob([e]) : Buffer.from(e) : e
    }

    return function e(i, a) {
        if (ap.isPlainObject(i) || ap.isArray(i)) {
            if (-1 !== n.indexOf(i)) throw Error("Circular reference detected in " + a);
            n.push(i), ap.forEach(i, (function (n, i) {
                if (!ap.isUndefined(n)) {
                    var o, l = a ? a + "." + i : i;
                    if (n && !a && "object" == typeof n) if (ap.endsWith(i, "{}")) n = JSON.stringify(n); else if (ap.endsWith(i, "[]") && (o = ap.toArray(n))) return void o.forEach((function (e) {
                        !ap.isUndefined(e) && t.append(l, r(e))
                    }));
                    e(n, l)
                }
            })), n.pop()
        } else t.append(a, r(i))
    }(e), t
};
var pp, dp, fp, gp, hp, yp, mp, vp, xp, bp, kp, wp, _p = function (e) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)
}, Tp = function (e, t) {
    return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e
}, Ep = function (e, t) {
    return e && !_p(t) ? Tp(e, t) : t
};

function Cp() {
    if (yp) return hp;
    yp = 1;
    var e = rp;

    function t(t) {
        e.call(this, null == t ? "canceled" : t, e.ERR_CANCELED), this.name = "CanceledError"
    }

    return qu.inherits(t, e, {__CANCEL__: !0}), hp = t
}

function Lp() {
    if (bp) return xp;
    bp = 1;
    var e = qu, t = function () {
        if (lp) return op;
        lp = 1;
        var e = rp;
        return op = function (t, n, r) {
            var i = r.config.validateStatus;
            r.status && i && !i(r.status) ? n(new e("Request failed with status code " + r.status, [e.ERR_BAD_REQUEST, e.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4], r.config, r.request, r)) : t(r)
        }
    }(), n = function () {
        if (cp) return sp;
        cp = 1;
        var e = qu;
        return sp = e.isStandardBrowserEnv() ? {
            write: function (t, n, r, i, a, o) {
                var l = [];
                l.push(t + "=" + encodeURIComponent(n)), e.isNumber(r) && l.push("expires=" + new Date(r).toGMTString()), e.isString(i) && l.push("path=" + i), e.isString(a) && l.push("domain=" + a), !0 === o && l.push("secure"), document.cookie = l.join("; ")
            }, read: function (e) {
                var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
                return t ? decodeURIComponent(t[3]) : null
            }, remove: function (e) {
                this.write(e, "", Date.now() - 864e5)
            }
        } : {
            write: function () {
            }, read: function () {
                return null
            }, remove: function () {
            }
        }
    }(), r = Ku, i = Ep, a = function () {
        if (dp) return pp;
        dp = 1;
        var e = qu,
            t = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];
        return pp = function (n) {
            var r, i, a, o = {};
            return n ? (e.forEach(n.split("\n"), (function (n) {
                if (a = n.indexOf(":"), r = e.trim(n.substr(0, a)).toLowerCase(), i = e.trim(n.substr(a + 1)), r) {
                    if (o[r] && t.indexOf(r) >= 0) return;
                    o[r] = "set-cookie" === r ? (o[r] ? o[r] : []).concat([i]) : o[r] ? o[r] + ", " + i : i
                }
            })), o) : o
        }
    }(), o = function () {
        if (gp) return fp;
        gp = 1;
        var e = qu;
        return fp = e.isStandardBrowserEnv() ? function () {
            var t, n = /(msie|trident)/i.test(navigator.userAgent), r = document.createElement("a");

            function i(e) {
                var t = e;
                return n && (r.setAttribute("href", t), t = r.href), r.setAttribute("href", t), {
                    href: r.href,
                    protocol: r.protocol ? r.protocol.replace(/:$/, "") : "",
                    host: r.host,
                    search: r.search ? r.search.replace(/^\?/, "") : "",
                    hash: r.hash ? r.hash.replace(/^#/, "") : "",
                    hostname: r.hostname,
                    port: r.port,
                    pathname: "/" === r.pathname.charAt(0) ? r.pathname : "/" + r.pathname
                }
            }

            return t = i(window.location.href), function (n) {
                var r = e.isString(n) ? i(n) : n;
                return r.protocol === t.protocol && r.host === t.host
            }
        }() : function () {
            return !0
        }
    }(), l = ip, s = rp, c = Cp(), u = vp ? mp : (vp = 1, mp = function (e) {
        var t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
        return t && t[1] || ""
    });
    return xp = function (p) {
        return new Promise((function (d, f) {
            var g, h = p.data, y = p.headers, m = p.responseType;

            function v() {
                p.cancelToken && p.cancelToken.unsubscribe(g), p.signal && p.signal.removeEventListener("abort", g)
            }

            e.isFormData(h) && e.isStandardBrowserEnv() && delete y["Content-Type"];
            var x = new XMLHttpRequest;
            if (p.auth) {
                var b = p.auth.username || "", k = p.auth.password ? unescape(encodeURIComponent(p.auth.password)) : "";
                y.Authorization = "Basic " + btoa(b + ":" + k)
            }
            var w = i(p.baseURL, p.url);

            function _() {
                if (x) {
                    var e = "getAllResponseHeaders" in x ? a(x.getAllResponseHeaders()) : null, n = {
                        data: m && "text" !== m && "json" !== m ? x.response : x.responseText,
                        status: x.status,
                        statusText: x.statusText,
                        headers: e,
                        config: p,
                        request: x
                    };
                    t((function (e) {
                        d(e), v()
                    }), (function (e) {
                        f(e), v()
                    }), n), x = null
                }
            }

            if (x.open(p.method.toUpperCase(), r(w, p.params, p.paramsSerializer), !0), x.timeout = p.timeout, "onloadend" in x ? x.onloadend = _ : x.onreadystatechange = function () {
                x && 4 === x.readyState && (0 !== x.status || x.responseURL && 0 === x.responseURL.indexOf("file:")) && setTimeout(_)
            }, x.onabort = function () {
                x && (f(new s("Request aborted", s.ECONNABORTED, p, x)), x = null)
            }, x.onerror = function () {
                f(new s("Network Error", s.ERR_NETWORK, p, x, x)), x = null
            }, x.ontimeout = function () {
                var e = p.timeout ? "timeout of " + p.timeout + "ms exceeded" : "timeout exceeded",
                    t = p.transitional || l;
                p.timeoutErrorMessage && (e = p.timeoutErrorMessage), f(new s(e, t.clarifyTimeoutError ? s.ETIMEDOUT : s.ECONNABORTED, p, x)), x = null
            }, e.isStandardBrowserEnv()) {
                var T = (p.withCredentials || o(w)) && p.xsrfCookieName ? n.read(p.xsrfCookieName) : void 0;
                T && (y[p.xsrfHeaderName] = T)
            }
            "setRequestHeader" in x && e.forEach(y, (function (e, t) {
                void 0 === h && "content-type" === t.toLowerCase() ? delete y[t] : x.setRequestHeader(t, e)
            })), e.isUndefined(p.withCredentials) || (x.withCredentials = !!p.withCredentials), m && "json" !== m && (x.responseType = p.responseType), "function" == typeof p.onDownloadProgress && x.addEventListener("progress", p.onDownloadProgress), "function" == typeof p.onUploadProgress && x.upload && x.upload.addEventListener("progress", p.onUploadProgress), (p.cancelToken || p.signal) && (g = function (e) {
                x && (f(!e || e && e.type ? new c : e), x.abort(), x = null)
            }, p.cancelToken && p.cancelToken.subscribe(g), p.signal && (p.signal.aborted ? g() : p.signal.addEventListener("abort", g))), h || (h = null);
            var E = u(w);
            E && -1 === ["http", "https", "file"].indexOf(E) ? f(new s("Unsupported protocol " + E + ":", s.ERR_BAD_REQUEST, p)) : x.send(h)
        }))
    }
}

var Op = qu, Sp = function (e, t) {
    Zu.forEach(e, (function (n, r) {
        r !== t && r.toUpperCase() === t.toUpperCase() && (e[t] = n, delete e[r])
    }))
}, Pp = rp, Ap = up, Rp = {"Content-Type": "application/x-www-form-urlencoded"};

function Np(e, t) {
    !Op.isUndefined(e) && Op.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t)
}

var Ip, jp = {
    transitional: ip,
    adapter: (("undefined" != typeof XMLHttpRequest || "undefined" != typeof process && "[object process]" === Object.prototype.toString.call(process)) && (Ip = Lp()), Ip),
    transformRequest: [function (e, t) {
        if (Sp(t, "Accept"), Sp(t, "Content-Type"), Op.isFormData(e) || Op.isArrayBuffer(e) || Op.isBuffer(e) || Op.isStream(e) || Op.isFile(e) || Op.isBlob(e)) return e;
        if (Op.isArrayBufferView(e)) return e.buffer;
        if (Op.isURLSearchParams(e)) return Np(t, "application/x-www-form-urlencoded;charset=utf-8"), e.toString();
        var n, r = Op.isObject(e), i = t && t["Content-Type"];
        if ((n = Op.isFileList(e)) || r && "multipart/form-data" === i) {
            var a = this.env && this.env.FormData;
            return Ap(n ? {"files[]": e} : e, a && new a)
        }
        return r || "application/json" === i ? (Np(t, "application/json"), function (e, t, n) {
            if (Op.isString(e)) try {
                return (t || JSON.parse)(e), Op.trim(e)
            } catch (r) {
                if ("SyntaxError" !== r.name) throw r
            }
            return (n || JSON.stringify)(e)
        }(e)) : e
    }],
    transformResponse: [function (e) {
        var t = this.transitional || jp.transitional, n = t && t.silentJSONParsing, r = t && t.forcedJSONParsing,
            i = !n && "json" === this.responseType;
        if (i || r && Op.isString(e) && e.length) try {
            return JSON.parse(e)
        } catch (a) {
            if (i) {
                if ("SyntaxError" === a.name) throw Pp.from(a, Pp.ERR_BAD_RESPONSE, this, null, this.response);
                throw a
            }
        }
        return e
    }],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {FormData: wp ? kp : (wp = 1, kp = null)},
    validateStatus: function (e) {
        return e >= 200 && e < 300
    },
    headers: {common: {Accept: "application/json, text/plain, */*"}}
};
Op.forEach(["delete", "get", "head"], (function (e) {
    jp.headers[e] = {}
})), Op.forEach(["post", "put", "patch"], (function (e) {
    jp.headers[e] = Op.merge(Rp)
}));
var Dp, Mp, zp = jp, Vp = qu, Fp = zp;

function Up() {
    return Mp ? Dp : (Mp = 1, Dp = function (e) {
        return !(!e || !e.__CANCEL__)
    })
}

var Bp = qu, Hp = function (e, t, n) {
    var r = this || Fp;
    return Vp.forEach(n, (function (n) {
        e = n.call(r, e, t)
    })), e
}, Wp = Up(), qp = zp, $p = Cp();

function Yp(e) {
    if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted) throw new $p
}

var Kp, Gp, Xp = qu, Jp = function (e, t) {
    t = t || {};
    var n = {};

    function r(e, t) {
        return Xp.isPlainObject(e) && Xp.isPlainObject(t) ? Xp.merge(e, t) : Xp.isPlainObject(t) ? Xp.merge({}, t) : Xp.isArray(t) ? t.slice() : t
    }

    function i(n) {
        return Xp.isUndefined(t[n]) ? Xp.isUndefined(e[n]) ? void 0 : r(void 0, e[n]) : r(e[n], t[n])
    }

    function a(e) {
        if (!Xp.isUndefined(t[e])) return r(void 0, t[e])
    }

    function o(n) {
        return Xp.isUndefined(t[n]) ? Xp.isUndefined(e[n]) ? void 0 : r(void 0, e[n]) : r(void 0, t[n])
    }

    function l(n) {
        return n in t ? r(e[n], t[n]) : n in e ? r(void 0, e[n]) : void 0
    }

    var s = {
        url: a,
        method: a,
        data: a,
        baseURL: o,
        transformRequest: o,
        transformResponse: o,
        paramsSerializer: o,
        timeout: o,
        timeoutMessage: o,
        withCredentials: o,
        adapter: o,
        responseType: o,
        xsrfCookieName: o,
        xsrfHeaderName: o,
        onUploadProgress: o,
        onDownloadProgress: o,
        decompress: o,
        maxContentLength: o,
        maxBodyLength: o,
        beforeRedirect: o,
        transport: o,
        httpAgent: o,
        httpsAgent: o,
        cancelToken: o,
        socketPath: o,
        responseEncoding: o,
        validateStatus: l
    };
    return Xp.forEach(Object.keys(e).concat(Object.keys(t)), (function (e) {
        var t = s[e] || i, r = t(e);
        Xp.isUndefined(r) && t !== l || (n[e] = r)
    })), n
};

function Zp() {
    return Gp ? Kp : (Gp = 1, Kp = {version: "0.27.2"})
}

var Qp = Zp().version, ed = rp, td = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((function (e, t) {
    td[e] = function (n) {
        return typeof n === e || "a" + (t < 1 ? "n " : " ") + e
    }
}));
var nd = {};
td.transitional = function (e, t, n) {
    return function (r, i, a) {
        if (!1 === e) throw new ed(function (e, t) {
            return "[Axios v" + Qp + "] Transitional option '" + e + "'" + t + (n ? ". " + n : "")
        }(i, " has been removed" + (t ? " in " + t : "")), ed.ERR_DEPRECATED);
        return t && !nd[i] && (nd[i] = !0), !e || e(r, i, a)
    }
};
var rd, id, ad, od, ld, sd, cd = qu, ud = Ku, pd = Ju, dd = function (e) {
    return Yp(e), e.headers = e.headers || {}, e.data = Hp.call(e, e.data, e.headers, e.transformRequest), e.headers = Bp.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers), Bp.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (function (t) {
        delete e.headers[t]
    })), (e.adapter || qp.adapter)(e).then((function (t) {
        return Yp(e), t.data = Hp.call(e, t.data, t.headers, e.transformResponse), t
    }), (function (t) {
        return Wp(t) || (Yp(e), t && t.response && (t.response.data = Hp.call(e, t.response.data, t.response.headers, e.transformResponse))), Promise.reject(t)
    }))
}, fd = Jp, gd = Ep, hd = {
    assertOptions: function (e, t, n) {
        if ("object" != typeof e) throw new ed("options must be an object", ed.ERR_BAD_OPTION_VALUE);
        for (var r = Object.keys(e), i = r.length; i-- > 0;) {
            var a = r[i], o = t[a];
            if (o) {
                var l = e[a], s = void 0 === l || o(l, a, e);
                if (!0 !== s) throw new ed("option " + a + " must be " + s, ed.ERR_BAD_OPTION_VALUE)
            } else if (!0 !== n) throw new ed("Unknown option " + a, ed.ERR_BAD_OPTION)
        }
    }, validators: td
}, yd = hd.validators;

function md(e) {
    this.defaults = e, this.interceptors = {request: new pd, response: new pd}
}

md.prototype.request = function (e, t) {
    "string" == typeof e ? (t = t || {}).url = e : t = e || {}, (t = fd(this.defaults, t)).method ? t.method = t.method.toLowerCase() : this.defaults.method ? t.method = this.defaults.method.toLowerCase() : t.method = "get";
    var n = t.transitional;
    void 0 !== n && hd.assertOptions(n, {
        silentJSONParsing: yd.transitional(yd.boolean),
        forcedJSONParsing: yd.transitional(yd.boolean),
        clarifyTimeoutError: yd.transitional(yd.boolean)
    }, !1);
    var r = [], i = !0;
    this.interceptors.request.forEach((function (e) {
        "function" == typeof e.runWhen && !1 === e.runWhen(t) || (i = i && e.synchronous, r.unshift(e.fulfilled, e.rejected))
    }));
    var a, o = [];
    if (this.interceptors.response.forEach((function (e) {
        o.push(e.fulfilled, e.rejected)
    })), !i) {
        var l = [dd, void 0];
        for (Array.prototype.unshift.apply(l, r), l = l.concat(o), a = Promise.resolve(t); l.length;) a = a.then(l.shift(), l.shift());
        return a
    }
    for (var s = t; r.length;) {
        var c = r.shift(), u = r.shift();
        try {
            s = c(s)
        } catch (p) {
            u(p);
            break
        }
    }
    try {
        a = dd(s)
    } catch (p) {
        return Promise.reject(p)
    }
    for (; o.length;) a = a.then(o.shift(), o.shift());
    return a
}, md.prototype.getUri = function (e) {
    e = fd(this.defaults, e);
    var t = gd(e.baseURL, e.url);
    return ud(t, e.params, e.paramsSerializer)
}, cd.forEach(["delete", "get", "head", "options"], (function (e) {
    md.prototype[e] = function (t, n) {
        return this.request(fd(n || {}, {method: e, url: t, data: (n || {}).data}))
    }
})), cd.forEach(["post", "put", "patch"], (function (e) {
    function t(t) {
        return function (n, r, i) {
            return this.request(fd(i || {}, {
                method: e,
                headers: t ? {"Content-Type": "multipart/form-data"} : {},
                url: n,
                data: r
            }))
        }
    }

    md.prototype[e] = t(), md.prototype[e + "Form"] = t(!0)
}));
var vd = qu, xd = Cu, bd = md, kd = Jp;
var wd = function e(t) {
    var n = new bd(t), r = xd(bd.prototype.request, n);
    return vd.extend(r, bd.prototype, n), vd.extend(r, n), r.create = function (n) {
        return e(kd(t, n))
    }, r
}(zp);
wd.Axios = bd, wd.CanceledError = Cp(), wd.CancelToken = function () {
    if (id) return rd;
    id = 1;
    var e = Cp();

    function t(t) {
        if ("function" != typeof t) throw new TypeError("executor must be a function.");
        var n;
        this.promise = new Promise((function (e) {
            n = e
        }));
        var r = this;
        this.promise.then((function (e) {
            if (r._listeners) {
                var t, n = r._listeners.length;
                for (t = 0; t < n; t++) r._listeners[t](e);
                r._listeners = null
            }
        })), this.promise.then = function (e) {
            var t, n = new Promise((function (e) {
                r.subscribe(e), t = e
            })).then(e);
            return n.cancel = function () {
                r.unsubscribe(t)
            }, n
        }, t((function (t) {
            r.reason || (r.reason = new e(t), n(r.reason))
        }))
    }

    return t.prototype.throwIfRequested = function () {
        if (this.reason) throw this.reason
    }, t.prototype.subscribe = function (e) {
        this.reason ? e(this.reason) : this._listeners ? this._listeners.push(e) : this._listeners = [e]
    }, t.prototype.unsubscribe = function (e) {
        if (this._listeners) {
            var t = this._listeners.indexOf(e);
            -1 !== t && this._listeners.splice(t, 1)
        }
    }, t.source = function () {
        var e;
        return {
            token: new t((function (t) {
                e = t
            })), cancel: e
        }
    }, rd = t
}(), wd.isCancel = Up(), wd.VERSION = Zp().version, wd.toFormData = up, wd.AxiosError = rp, wd.Cancel = wd.CanceledError, wd.all = function (e) {
    return Promise.all(e)
}, wd.spread = od ? ad : (od = 1, ad = function (e) {
    return function (t) {
        return e.apply(null, t)
    }
}), wd.isAxiosError = function () {
    if (sd) return ld;
    sd = 1;
    var e = qu;
    return ld = function (t) {
        return e.isObject(t) && !0 === t.isAxiosError
    }
}(), Eu.exports = wd, Eu.exports.default = wd, Tu.exports = Eu.exports;
const _d = gu(Tu.exports).create({baseURL: "//color597.github.io", timeout: 7e3});
_d.interceptors.request.use((e => (window.prompt(`前端log:config:${JSON.stringify(e)}`), e = (e => (e.xxxx = "xxx", e))(e)))), _d.interceptors.response.use((e => (window.prompt(`前端log:response:${JSON.stringify(e)}`), 200 !== e.status ? Promise.reject(e.data) : e)), (e => {
    window.prompt(`前端log:err:${JSON.stringify(e)}`), e.response.status, Promise.reject(e.response)
}));

function Td(e, t) {
    return ((e, t, n = {}, r) => new Promise((i => {
        _d.get(e, t).then((e => {
            i([null, e.data])
        })).catch((e => {
            i([e, void 0])
        }))
    })))(`/col_or/ColorOS_Pro/json/CL/${e.device}/${e.otaVersion}.json`, {}, t)
}

const Ed = {class: "about-contioner"}, Cd = {key: 1, class: "system-info"}, Ld = {class: "txt"},
    Od = {key: 2, class: "new-type"}, Sd = {class: "txt"},
    Pd = {key: 3, class: "video-contioner ht-night-exclude-child-nodes"},
    Ad = {class: "other-info ht-night-exclude-node"}, Rd = {key: 0, class: "info-header ht-night-exclude-node"},
    Nd = {class: "ota-version"}, Id = {class: "version-type"}, jd = {key: 1, class: "info-main-container"},
    Dd = ["innerHTML"], Md = {class: "info-item"}, zd = ["innerHTML"], Vd = Xc(mn({
        __name: "about", setup(e) {
            const n = ["time", "play", "fullscreen", "replay"], r = uu(), i = ps(), a = it({panelArr: [], videoInfo: {}}),
                l = vi((() => {
                    const {osVersion: e, brand: t} = r.otaInfo;
                    let n = (e || "").toUpperCase().replace(/COLOROS/gi, "");
                    return n && t.toUpperCase().indexOf("REALME") > -1 && (n = (Math.floor(n) - 9).toFixed(1), n = n > 0 ? n : ""), n
                })), s = vi((() => {
                    const {androidVersion: e, size: t} = r.otaInfo;
                    return [l.value, e, t].filter((e => e)).join(" | ")
                }));
            return r.getPhoneInfo().then((() => {
                !function () {
                    const {
                        language: e,
                        model: t,
                        mode: n,
                        androidVersion: o,
                        osVersion: l,
                        nvCarrier: s,
                        romVersion: c,
                        otaVersion: u,
                        bigVersion: p,
                        cotaVersion: d,
                        maskOtaVersion: f
                    } = r.otaInfo, g = {
                        language: e,
                        model: t,
                        androidVersion: o,
                        osVersion: l,
                        otaVersion: u,
                        trackRegion: "",
                        operator: d,
                        nvCarrier: s,
                        partCarrier: "",
                        mode: "manual",
                        uRegion: "",
                        romVersion: c,
                        maskOtaVersion: f,
                        "Content-Type": "application/json"
                    }, h = {device: g.model, otaVersion: g.otaVersion};
                    Td(h, g).then((e => {
                        const {responseCode: t, body: n} = e[1];
                        if (200 === t) {
                            const e = JSON.parse(n).secondContents || [], t = [];
                            a.videoInfo = JSON.parse(n).movie || {}, e.forEach((e => {
                                e.link && d && (e.cotaVersion = d, e.title = i.t("clientText8"), e.cotaVersionText = i.t("clientText7")), e.content = e.content + (e.link || ""), e.newContent = e.content.split("\n"), t.push(e)
                            })), a.panelArr = t
                        }
                    }))
                }(), function () {
                    const {language: e} = r.otaInfo;
                    i.locale.value = function (e) {
                        if (!e) return "enGB";
                        switch (e) {
                            case"fil-PH":
                            case"tl-PH":
                                return "filPH";
                            case"ar-AR":
                            case"ar-IL":
                            case"ar-EG":
                                return "arAR";
                            case"as-IN":
                                return "asIN";
                            case"bg-BG":
                                return "bgBG";
                            case"bn-BD":
                                return "bnBD";
                            case"bo-CN":
                                return "boCN";
                            case"ca-ES":
                                return "caES";
                            case"cs-CZ":
                                return "csCZ";
                            case"da-DK":
                                return "daDK";
                            case"de-CH":
                                return "deCH";
                            case"de-DE":
                                return "deDE";
                            case"el-GR":
                                return "elGR";
                            case"en-AU":
                                return "enAU";
                            case"en-GB":
                                return "enGB";
                            case"en-NZ":
                                return "enNZ";
                            case"en-US":
                                return "enUS";
                            case"es-ES":
                                return "esES";
                            case"es-MX":
                                return "esMX";
                            case"eu-ES":
                                return "euES";
                            case"fi-FI":
                                return "fiFI";
                            case"fr-FR":
                                return "frFR";
                            case"gl-ES":
                                return "glES";
                            case"gu-IN":
                                return "guIN";
                            case"hi-IN":
                                return "hiIN";
                            case"hr-HR":
                                return "hrHR";
                            case"hu-HU":
                                return "huHU";
                            case"id-ID":
                                return "idID";
                            case"it-IT":
                                return "itIT";
                            case"iw-IL":
                            case"he-IL":
                                return "iwIL";
                            case"ja-JP":
                                return "jaJP";
                            case"kk-KZ":
                                return "kkKZ";
                            case"km-KH":
                                return "kmKH";
                            case"kn-IN":
                                return "knIN";
                            case"ko-KR":
                                return "koKR";
                            case"lo-LA":
                                return "loLA";
                            case"lt-LT":
                                return "ltLT";
                            case"lv-LV":
                                return "lvLV";
                            case"ml-IN":
                                return "mlIN";
                            case"mr-IN":
                                return "mrIN";
                            case"ms-MY":
                                return "msMY";
                            case"my-MM":
                                return "myMM";
                            case"my-ZG":
                                return "myZG";
                            case"nb-NO":
                                return "nbNO";
                            case"ne-NP":
                                return "neNP";
                            case"nl-NL":
                                return "nlNL";
                            case"or-IN":
                                return "orIN";
                            case"pa-IN":
                                return "paIN";
                            case"pl-PL":
                                return "plPL";
                            case"pt-BR":
                                return "ptBR";
                            case"pt-PT":
                                return "ptPT";
                            case"ro-RO":
                                return "roRO";
                            case"ru-RU":
                                return "ruRU";
                            case"si-LK":
                                return "siLK";
                            case"sk-SK":
                                return "skSK";
                            case"sl-SI":
                                return "slSI";
                            case"sr-RS":
                            case"sr-Latn-RS":
                                return "srRS";
                            case"sv-SE":
                                return "svSE";
                            case"sw-KE":
                                return "swKE";
                            case"ta-IN":
                                return "taIN";
                            case"te-IN":
                                return "teIN";
                            case"th-TH":
                                return "thTH";
                            case"tr-TR":
                                return "trTR";
                            case"ug-CN":
                                return "ugCN";
                            case"uk-UA":
                                return "ukUA";
                            case"ur-PK":
                                return "urPK";
                            case"uz-UZ":
                                return "uzUZ";
                            case"vi-VN":
                                return "viVN";
                            case"zh-CN":
                                return "zhCN";
                            case"zh-HK":
                                return "zhHK";
                            case"zh-TW":
                                return "zhTW";
                            default:
                                return ["//component-ota-test.wanyol.com", "//component-ota-gray.coloros.com", "//component-ota-cn.allawntech.com"].includes("//component-ota-cn.allawntech.com") ? "zhCN" : "enGB"
                        }
                    }(e)
                }()
            })), Tn((() => {
                window.setScreen = null
            })), window.setScreen = function (e) {
                let t = null, n = "";
                "number" == typeof e ? t = e : e && "object" == typeof e && (n = e.screenType, t = e.smallestWidth), n && r.screenStatus !== n && r.setData({
                    keyName: "screenStatus",
                    value: n
                }), t && r.smallestWidth !== t && r.setData({keyName: "smallestWidth", value: t})
            }, (e, i) => {
                var l, u, p, d, f, g, h, y, m, v, x, b;
                return Vr(), Hr("div", Ed, [Xr("div", {
                    class: o(["about", wt(r).screenClassName, {isRTL: null == (l = wt(r).otaInfo) ? void 0 : l.isRTL}]),
                    style: t(`max-width:${wt(r).mainWidth}`)
                }, [(null == (u = wt(r).otaInfo) ? void 0 : u.type) && (null == (p = wt(r).otaInfo) ? void 0 : p.brand) ? (Vr(), Wr(fu, {key: 0})) : ei("", !0), wt(r).otaInfo.type && wt(s) ? (Vr(), Hr("div", Cd, [Xr("span", Ld, c(wt(s)), 1)])) : ei("", !0), wt(r).otaInfo.type ? (Vr(), Hr("h5", Od, [Xr("span", Sd, c(wt(r).otaInfo.type ? e.$t("findNewVersion") : ""), 1)])) : ei("", !0), (null == (d = wt(r).otaInfo) ? void 0 : d.recordLink) ? (Vr(), Hr("div", Pd, [(null == (f = a.videoInfo) ? void 0 : f.video) ? (Vr(), Wr(wu, {
                    key: 0,
                    ref: "videoRef",
                    ignores: n,
                    video: null == (g = a.videoInfo) ? void 0 : g.video,
                    poster: null == (h = a.videoInfo) ? void 0 : h.poster,
                    playerId: "about-video"
                }, null, 8, ["video", "poster"])) : ei("", !0)])) : ei("", !0), Xr("div", Ad, [(null == (y = wt(r).otaInfo) ? void 0 : y.romVersion) || (null == (m = wt(r).otaInfo) ? void 0 : m.versionType) ? (Vr(), Hr("div", Rd, [Xr("span", Nd, c((null == (v = wt(r).otaInfo) ? void 0 : v.romVersion) || ""), 1), Xr("span", Id, c((null == (x = wt(r).otaInfo) ? void 0 : x.versionType) || ""), 1)])) : ei("", !0), (null == (b = a.panelArr) ? void 0 : b.length) ? (Vr(), Hr("div", jd, [(Vr(!0), Hr(Nr, null, Kn(a.panelArr, ((e, t) => (Vr(), Hr("ul", {
                    class: "info-main",
                    key: e.title + t
                }, [e.title && "Additional information" !== e.title ? (Vr(), Hr("li", {
                    key: 0,
                    class: o(["info-title", {"last-into-title": !e.cotaVersion}])
                }, c(e.title), 3)) : ei("", !0), e.cotaVersion ? (Vr(), Hr("li", {
                    key: 1,
                    class: o(["info-title", {"last-into-title": e.cotaVersion}])
                }, c(e.cotaVersion), 3)) : ei("", !0), e.cotaVersionText ? (Vr(), Hr("li", {
                    key: 2,
                    class: "info-item cota-text",
                    innerHTML: e.cotaVersionText
                }, null, 8, Dd)) : ei("", !0), Xr("li", Md, [(Vr(!0), Hr(Nr, null, Kn(e.newContent, ((e, t) => (Vr(), Hr(Nr, null, [e.trim() ? (Vr(), Hr("span", {
                    class: "text-list-item",
                    key: t + e,
                    innerHTML: e
                }, null, 8, zd)) : ei("", !0)], 64)))), 256))])])))), 128))])) : ei("", !0)])], 6)])
            }
        }
    }), [["__scopeId", "data-v-1ea6b7b3"]]), Fd = function (e) {
        const t = ac(e.routes, e), n = e.parseQuery || Pc, r = e.stringifyQuery || Ac, i = e.history, a = zc(), o = zc(),
            l = zc(), s = xt(Ws);
        let c = Ws;
        ys && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
        const u = vs.bind(null, (e => "" + e)), p = vs.bind(null, Oc), d = vs.bind(null, Sc);

        function f(e, a) {
            if (a = ms({}, a || s.value), "string" == typeof e) {
                const r = _s(n, e, a.path), o = t.resolve({path: r.path}, a), l = i.createHref(r.fullPath);
                return ms(r, o, {params: d(o.params), hash: Sc(r.hash), redirectedFrom: void 0, href: l})
            }
            let o;
            if ("path" in e) o = ms({}, e, {path: _s(n, e.path, a.path).path}); else {
                const t = ms({}, e.params);
                for (const e in t) null == t[e] && delete t[e];
                o = ms({}, e, {params: p(e.params)}), a.params = p(a.params)
            }
            const l = t.resolve(o, a), c = e.hash || "";
            l.params = u(d(l.params));
            const f = function (e, t) {
                const n = t.query ? e(t.query) : "";
                return t.path + (n && "?") + n + (t.hash || "")
            }(r, ms({}, e, {hash: (g = c, Cc(g).replace(wc, "{").replace(Tc, "}").replace(bc, "^")), path: l.path}));
            var g;
            const h = i.createHref(f);
            return ms({fullPath: f, hash: c, query: r === Ac ? Rc(e.query) : e.query || {}}, l, {
                redirectedFrom: void 0,
                href: h
            })
        }

        function g(e) {
            return "string" == typeof e ? _s(n, e, s.value.path) : ms({}, e)
        }

        function h(e, t) {
            if (c !== e) return Ks(8, {from: t, to: e})
        }

        function y(e) {
            return v(e)
        }

        function m(e) {
            const t = e.matched[e.matched.length - 1];
            if (t && t.redirect) {
                const {redirect: n} = t;
                let r = "function" == typeof n ? n(e) : n;
                return "string" == typeof r && (r = r.includes("?") || r.includes("#") ? r = g(r) : {path: r}, r.params = {}), ms({
                    query: e.query,
                    hash: e.hash,
                    params: "path" in r ? {} : e.params
                }, r)
            }
        }

        function v(e, t) {
            const n = c = f(e), i = s.value, a = e.state, o = e.force, l = !0 === e.replace, u = m(n);
            if (u) return v(ms(g(u), {state: "object" == typeof u ? ms({}, a, u.state) : a, force: o, replace: l}), t || n);
            const p = n;
            let d;
            return p.redirectedFrom = t, !o && function (e, t, n) {
                const r = t.matched.length - 1, i = n.matched.length - 1;
                return r > -1 && r === i && Es(t.matched[r], n.matched[i]) && Cs(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash
            }(r, i, n) && (d = Ks(16, {
                to: p,
                from: i
            }), P(i, i, !0, !1)), (d ? Promise.resolve(d) : b(p, i)).catch((e => Gs(e) ? Gs(e, 2) ? e : S(e) : O(e, p, i))).then((e => {
                if (e) {
                    if (Gs(e, 2)) return v(ms({replace: l}, g(e.to), {
                        state: "object" == typeof e.to ? ms({}, a, e.to.state) : a,
                        force: o
                    }), t || p)
                } else e = w(p, i, !0, l, a);
                return k(p, i, e), e
            }))
        }

        function x(e, t) {
            const n = h(e, t);
            return n ? Promise.reject(n) : Promise.resolve()
        }

        function b(e, t) {
            let n;
            const [r, i, l] = function (e, t) {
                const n = [], r = [], i = [], a = Math.max(t.matched.length, e.matched.length);
                for (let o = 0; o < a; o++) {
                    const a = t.matched[o];
                    a && (e.matched.find((e => Es(e, a))) ? r.push(a) : n.push(a));
                    const l = e.matched[o];
                    l && (t.matched.find((e => Es(e, l))) || i.push(l))
                }
                return [n, r, i]
            }(e, t);
            n = Fc(r.reverse(), "beforeRouteLeave", e, t);
            for (const a of r) a.leaveGuards.forEach((r => {
                n.push(Vc(r, e, t))
            }));
            const s = x.bind(null, e, t);
            return n.push(s), Yc(n).then((() => {
                n = [];
                for (const r of a.list()) n.push(Vc(r, e, t));
                return n.push(s), Yc(n)
            })).then((() => {
                n = Fc(i, "beforeRouteUpdate", e, t);
                for (const r of i) r.updateGuards.forEach((r => {
                    n.push(Vc(r, e, t))
                }));
                return n.push(s), Yc(n)
            })).then((() => {
                n = [];
                for (const r of e.matched) if (r.beforeEnter && !t.matched.includes(r)) if (bs(r.beforeEnter)) for (const i of r.beforeEnter) n.push(Vc(i, e, t)); else n.push(Vc(r.beforeEnter, e, t));
                return n.push(s), Yc(n)
            })).then((() => (e.matched.forEach((e => e.enterCallbacks = {})), n = Fc(l, "beforeRouteEnter", e, t), n.push(s), Yc(n)))).then((() => {
                n = [];
                for (const r of o.list()) n.push(Vc(r, e, t));
                return n.push(s), Yc(n)
            })).catch((e => Gs(e, 8) ? e : Promise.reject(e)))
        }

        function k(e, t, n) {
            for (const r of l.list()) r(e, t, n)
        }

        function w(e, t, n, r, a) {
            const o = h(e, t);
            if (o) return o;
            const l = t === Ws, c = ys ? history.state : {};
            n && (r || l ? i.replace(e.fullPath, ms({scroll: l && c && c.scroll}, a)) : i.push(e.fullPath, a)), s.value = e, P(e, t, n, l), S()
        }

        let _;

        function T() {
            _ || (_ = i.listen(((e, t, n) => {
                if (!I.listening) return;
                const r = f(e), a = m(r);
                if (a) return void v(ms(a, {replace: !0}), r).catch(xs);
                c = r;
                const o = s.value;
                var l, u;
                ys && (l = Ms(o.fullPath, n.delta), u = js(), zs.set(l, u)), b(r, o).catch((e => Gs(e, 12) ? e : Gs(e, 2) ? (v(e.to, r).then((e => {
                    Gs(e, 20) && !n.delta && n.type === Ss.pop && i.go(-1, !1)
                })).catch(xs), Promise.reject()) : (n.delta && i.go(-n.delta, !1), O(e, r, o)))).then((e => {
                    (e = e || w(r, o, !1)) && (n.delta && !Gs(e, 8) ? i.go(-n.delta, !1) : n.type === Ss.pop && Gs(e, 20) && i.go(-1, !1)), k(r, o, e)
                })).catch(xs)
            })))
        }

        let E, C = zc(), L = zc();

        function O(e, t, n) {
            S(e);
            const r = L.list();
            return r.length && r.forEach((r => r(e, t, n))), Promise.reject(e)
        }

        function S(e) {
            return E || (E = !e, T(), C.list().forEach((([t, n]) => e ? n(e) : t())), C.reset()), e
        }

        function P(t, n, r, i) {
            const {scrollBehavior: a} = e;
            if (!ys || !a) return Promise.resolve();
            const o = !r && function (e) {
                const t = zs.get(e);
                return zs.delete(e), t
            }(Ms(t.fullPath, 0)) || (i || !r) && history.state && history.state.scroll || null;
            return Ut().then((() => a(t, n, o))).then((e => e && Ds(e))).catch((e => O(e, t, n)))
        }

        const A = e => i.go(e);
        let R;
        const N = new Set, I = {
            currentRoute: s,
            listening: !0,
            addRoute: function (e, n) {
                let r, i;
                return Hs(e) ? (r = t.getRecordMatcher(e), i = n) : i = e, t.addRoute(i, r)
            },
            removeRoute: function (e) {
                const n = t.getRecordMatcher(e);
                n && t.removeRoute(n)
            },
            hasRoute: function (e) {
                return !!t.getRecordMatcher(e)
            },
            getRoutes: function () {
                return t.getRoutes().map((e => e.record))
            },
            resolve: f,
            options: e,
            push: y,
            replace: function (e) {
                return y(ms(g(e), {replace: !0}))
            },
            go: A,
            back: () => A(-1),
            forward: () => A(1),
            beforeEach: a.add,
            beforeResolve: o.add,
            afterEach: l.add,
            onError: L.add,
            isReady: function () {
                return E && s.value !== Ws ? Promise.resolve() : new Promise(((e, t) => {
                    C.add([e, t])
                }))
            },
            install(e) {
                e.component("RouterLink", Bc), e.component("RouterView", $c), e.config.globalProperties.$router = this, Object.defineProperty(e.config.globalProperties, "$route", {
                    enumerable: !0,
                    get: () => wt(s)
                }), ys && !R && s.value === Ws && (R = !0, y(i.location).catch((e => {
                })));
                const t = {};
                for (const r in Ws) t[r] = vi((() => s.value[r]));
                e.provide(jc, this), e.provide(Dc, it(t)), e.provide(Mc, s);
                const n = e.unmount;
                N.add(e), e.unmount = function () {
                    N.delete(e), N.size < 1 && (c = Ws, _ && _(), _ = null, s.value = Ws, R = !1, E = !1), n()
                }
            }
        };
        return I
    }({
        history: (Ud = "./", (Ud = location.host ? Ud || location.pathname + location.search : "").includes("#") || (Ud += "#"), Bs(Ud)),
        routes: [{path: "/", redirect: "/about"}, {path: "/about", name: "about", component: Vd, meta: {KeepAlive: !0}}]
    });
var Ud;
const Bd = ((...e) => {
    const t = (Fi || (Fi = Pr(Vi))).createApp(...e), {mount: n} = t;
    return t.mount = e => {
        const r = function (e) {
            if (C(e)) {
                return document.querySelector(e)
            }
            return e
        }(e);
        if (!r) return;
        const i = t._component;
        E(i) || i.render || i.template || (i.template = r.innerHTML), r.innerHTML = "";
        const a = n(r, !1, r instanceof SVGElement);
        return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a
    }, t
})(Jc);
Bd.use(Pa), Bd.use(Yi()), Bd.use(Fd), Bd.use(hs), Bd.mount("#app");
