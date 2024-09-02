var cf = Object.create;
var Co = Object.defineProperty,
  lf = Object.defineProperties,
  df = Object.getOwnPropertyDescriptor,
  ff = Object.getOwnPropertyDescriptors,
  hf = Object.getOwnPropertyNames,
  Sn = Object.getOwnPropertySymbols,
  pf = Object.getPrototypeOf,
  bo = Object.prototype.hasOwnProperty,
  Ia = Object.prototype.propertyIsEnumerable;
var Da = (e, t, n) =>
    t in e
      ? Co(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (e[t] = n),
  pe = (e, t) => {
    for (var n in (t ||= {})) bo.call(t, n) && Da(e, n, t[n]);
    if (Sn) for (var n of Sn(t)) Ia.call(t, n) && Da(e, n, t[n]);
    return e;
  },
  ge = (e, t) => lf(e, ff(t));
var sI = ((e) =>
  typeof require < 'u'
    ? require
    : typeof Proxy < 'u'
      ? new Proxy(e, { get: (t, n) => (typeof require < 'u' ? require : t)[n] })
      : e)(function (e) {
  if (typeof require < 'u') return require.apply(this, arguments);
  throw Error('Dynamic require of "' + e + '" is not supported');
});
var aI = (e, t) => {
  var n = {};
  for (var r in e) bo.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && Sn)
    for (var r of Sn(e)) t.indexOf(r) < 0 && Ia.call(e, r) && (n[r] = e[r]);
  return n;
};
var uI = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var gf = (e, t, n, r) => {
  if ((t && typeof t == 'object') || typeof t == 'function')
    for (let o of hf(t))
      !bo.call(e, o) &&
        o !== n &&
        Co(e, o, {
          get: () => t[o],
          enumerable: !(r = df(t, o)) || r.enumerable,
        });
  return e;
};
var cI = (e, t, n) => (
  (n = e != null ? cf(pf(e)) : {}),
  gf(
    t || !e || !e.__esModule
      ? Co(n, 'default', { value: e, enumerable: !0 })
      : n,
    e
  )
);
var mf = (e, t, n) =>
  new Promise((r, o) => {
    var i = (u) => {
        try {
          a(n.next(u));
        } catch (c) {
          o(c);
        }
      },
      s = (u) => {
        try {
          a(n.throw(u));
        } catch (c) {
          o(c);
        }
      },
      a = (u) => (u.done ? r(u.value) : Promise.resolve(u.value).then(i, s));
    a((n = n.apply(e, t)).next());
  });
function Ea(e, t) {
  return Object.is(e, t);
}
var L = null,
  qt = !1,
  Tn = 1,
  Q = Symbol('SIGNAL');
function b(e) {
  let t = L;
  return (L = e), t;
}
function wa() {
  return L;
}
function yf() {
  return qt;
}
var vt = {
  version: 0,
  lastCleanEpoch: 0,
  dirty: !1,
  producerNode: void 0,
  producerLastReadVersion: void 0,
  producerIndexOfThis: void 0,
  nextProducerIndex: 0,
  liveConsumerNode: void 0,
  liveConsumerIndexOfThis: void 0,
  consumerAllowSignalWrites: !1,
  consumerIsAlwaysLive: !1,
  producerMustRecompute: () => !1,
  producerRecomputeValue: () => {},
  consumerMarkedDirty: () => {},
  consumerOnSignalRead: () => {},
};
function Yt(e) {
  if (qt) throw new Error('');
  if (L === null) return;
  L.consumerOnSignalRead(e);
  let t = L.nextProducerIndex++;
  if ((Pn(L), t < L.producerNode.length && L.producerNode[t] !== e && Zt(L))) {
    let n = L.producerNode[t];
    Rn(n, L.producerIndexOfThis[t]);
  }
  L.producerNode[t] !== e &&
    ((L.producerNode[t] = e),
    (L.producerIndexOfThis[t] = Zt(L) ? xa(e, L, t) : 0)),
    (L.producerLastReadVersion[t] = e.version);
}
function vf() {
  Tn++;
}
function Ca(e) {
  if (!(Zt(e) && !e.dirty) && !(!e.dirty && e.lastCleanEpoch === Tn)) {
    if (!e.producerMustRecompute(e) && !On(e)) {
      (e.dirty = !1), (e.lastCleanEpoch = Tn);
      return;
    }
    e.producerRecomputeValue(e), (e.dirty = !1), (e.lastCleanEpoch = Tn);
  }
}
function ba(e) {
  if (e.liveConsumerNode === void 0) return;
  let t = qt;
  qt = !0;
  try {
    for (let n of e.liveConsumerNode) n.dirty || Ma(n);
  } finally {
    qt = t;
  }
}
function _a() {
  return L?.consumerAllowSignalWrites !== !1;
}
function Ma(e) {
  (e.dirty = !0), ba(e), e.consumerMarkedDirty?.(e);
}
function Qt(e) {
  return e && (e.nextProducerIndex = 0), b(e);
}
function An(e, t) {
  if (
    (b(t),
    !(
      !e ||
      e.producerNode === void 0 ||
      e.producerIndexOfThis === void 0 ||
      e.producerLastReadVersion === void 0
    ))
  ) {
    if (Zt(e))
      for (let n = e.nextProducerIndex; n < e.producerNode.length; n++)
        Rn(e.producerNode[n], e.producerIndexOfThis[n]);
    for (; e.producerNode.length > e.nextProducerIndex; )
      e.producerNode.pop(),
        e.producerLastReadVersion.pop(),
        e.producerIndexOfThis.pop();
  }
}
function On(e) {
  Pn(e);
  for (let t = 0; t < e.producerNode.length; t++) {
    let n = e.producerNode[t],
      r = e.producerLastReadVersion[t];
    if (r !== n.version || (Ca(n), r !== n.version)) return !0;
  }
  return !1;
}
function Fn(e) {
  if ((Pn(e), Zt(e)))
    for (let t = 0; t < e.producerNode.length; t++)
      Rn(e.producerNode[t], e.producerIndexOfThis[t]);
  (e.producerNode.length =
    e.producerLastReadVersion.length =
    e.producerIndexOfThis.length =
      0),
    e.liveConsumerNode &&
      (e.liveConsumerNode.length = e.liveConsumerIndexOfThis.length = 0);
}
function xa(e, t, n) {
  if ((Sa(e), e.liveConsumerNode.length === 0 && Ta(e)))
    for (let r = 0; r < e.producerNode.length; r++)
      e.producerIndexOfThis[r] = xa(e.producerNode[r], e, r);
  return e.liveConsumerIndexOfThis.push(n), e.liveConsumerNode.push(t) - 1;
}
function Rn(e, t) {
  if ((Sa(e), e.liveConsumerNode.length === 1 && Ta(e)))
    for (let r = 0; r < e.producerNode.length; r++)
      Rn(e.producerNode[r], e.producerIndexOfThis[r]);
  let n = e.liveConsumerNode.length - 1;
  if (
    ((e.liveConsumerNode[t] = e.liveConsumerNode[n]),
    (e.liveConsumerIndexOfThis[t] = e.liveConsumerIndexOfThis[n]),
    e.liveConsumerNode.length--,
    e.liveConsumerIndexOfThis.length--,
    t < e.liveConsumerNode.length)
  ) {
    let r = e.liveConsumerIndexOfThis[t],
      o = e.liveConsumerNode[t];
    Pn(o), (o.producerIndexOfThis[r] = t);
  }
}
function Zt(e) {
  return e.consumerIsAlwaysLive || (e?.liveConsumerNode?.length ?? 0) > 0;
}
function Pn(e) {
  (e.producerNode ??= []),
    (e.producerIndexOfThis ??= []),
    (e.producerLastReadVersion ??= []);
}
function Sa(e) {
  (e.liveConsumerNode ??= []), (e.liveConsumerIndexOfThis ??= []);
}
function Ta(e) {
  return e.producerNode !== void 0;
}
function So(e) {
  let t = Object.create(Df);
  t.computation = e;
  let n = () => {
    if ((Ca(t), Yt(t), t.value === Nn)) throw t.error;
    return t.value;
  };
  return (n[Q] = t), n;
}
var _o = Symbol('UNSET'),
  Mo = Symbol('COMPUTING'),
  Nn = Symbol('ERRORED'),
  Df = ge(pe({}, vt), {
    value: _o,
    dirty: !0,
    error: null,
    equal: Ea,
    producerMustRecompute(e) {
      return e.value === _o || e.value === Mo;
    },
    producerRecomputeValue(e) {
      if (e.value === Mo) throw new Error('Detected cycle in computations.');
      let t = e.value;
      e.value = Mo;
      let n = Qt(e),
        r;
      try {
        r = e.computation();
      } catch (o) {
        (r = Nn), (e.error = o);
      } finally {
        An(e, n);
      }
      if (t !== _o && t !== Nn && r !== Nn && e.equal(t, r)) {
        e.value = t;
        return;
      }
      (e.value = r), e.version++;
    },
  });
function If() {
  throw new Error();
}
var Na = If;
function Aa() {
  Na();
}
function Oa(e) {
  Na = e;
}
var Ef = null;
function Fa(e) {
  let t = Object.create(To);
  t.value = e;
  let n = () => (Yt(t), t.value);
  return (n[Q] = t), n;
}
function Kt(e, t) {
  _a() || Aa(), e.equal(e.value, t) || ((e.value = t), wf(e));
}
function Ra(e, t) {
  _a() || Aa(), Kt(e, t(e.value));
}
var To = ge(pe({}, vt), { equal: Ea, value: void 0 });
function wf(e) {
  e.version++, vf(), ba(e), Ef?.();
}
function Pa(e, t, n) {
  let r = Object.create(Cf);
  n && (r.consumerAllowSignalWrites = !0), (r.fn = e), (r.schedule = t);
  let o = (u) => {
    r.cleanupFn = u;
  };
  function i(u) {
    return u.fn === null && u.schedule === null;
  }
  function s(u) {
    i(u) ||
      (Fn(u),
      u.cleanupFn(),
      (u.fn = null),
      (u.schedule = null),
      (u.cleanupFn = xo));
  }
  let a = () => {
    if (r.fn === null) return;
    if (yf())
      throw new Error(
        'Schedulers cannot synchronously execute watches while scheduling.'
      );
    if (((r.dirty = !1), r.hasRun && !On(r))) return;
    r.hasRun = !0;
    let u = Qt(r);
    try {
      r.cleanupFn(), (r.cleanupFn = xo), r.fn(o);
    } finally {
      An(r, u);
    }
  };
  return (
    (r.ref = {
      notify: () => Ma(r),
      run: a,
      cleanup: () => r.cleanupFn(),
      destroy: () => s(r),
      [Q]: r,
    }),
    r.ref
  );
}
var xo = () => {},
  Cf = ge(pe({}, vt), {
    consumerIsAlwaysLive: !0,
    consumerAllowSignalWrites: !1,
    consumerMarkedDirty: (e) => {
      e.schedule !== null && e.schedule(e.ref);
    },
    hasRun: !1,
    cleanupFn: xo,
  });
function m(e) {
  return typeof e == 'function';
}
function Dt(e) {
  let n = e((r) => {
    Error.call(r), (r.stack = new Error().stack);
  });
  return (
    (n.prototype = Object.create(Error.prototype)),
    (n.prototype.constructor = n),
    n
  );
}
var kn = Dt(
  (e) =>
    function (n) {
      e(this),
        (this.message = n
          ? `${n.length} errors occurred during unsubscription:
${n.map((r, o) => `${o + 1}) ${r.toString()}`).join(`
  `)}`
          : ''),
        (this.name = 'UnsubscriptionError'),
        (this.errors = n);
    }
);
function Qe(e, t) {
  if (e) {
    let n = e.indexOf(t);
    0 <= n && e.splice(n, 1);
  }
}
var k = class e {
  constructor(t) {
    (this.initialTeardown = t),
      (this.closed = !1),
      (this._parentage = null),
      (this._finalizers = null);
  }
  unsubscribe() {
    let t;
    if (!this.closed) {
      this.closed = !0;
      let { _parentage: n } = this;
      if (n)
        if (((this._parentage = null), Array.isArray(n)))
          for (let i of n) i.remove(this);
        else n.remove(this);
      let { initialTeardown: r } = this;
      if (m(r))
        try {
          r();
        } catch (i) {
          t = i instanceof kn ? i.errors : [i];
        }
      let { _finalizers: o } = this;
      if (o) {
        this._finalizers = null;
        for (let i of o)
          try {
            ka(i);
          } catch (s) {
            (t = t ?? []),
              s instanceof kn ? (t = [...t, ...s.errors]) : t.push(s);
          }
      }
      if (t) throw new kn(t);
    }
  }
  add(t) {
    var n;
    if (t && t !== this)
      if (this.closed) ka(t);
      else {
        if (t instanceof e) {
          if (t.closed || t._hasParent(this)) return;
          t._addParent(this);
        }
        (this._finalizers =
          (n = this._finalizers) !== null && n !== void 0 ? n : []).push(t);
      }
  }
  _hasParent(t) {
    let { _parentage: n } = this;
    return n === t || (Array.isArray(n) && n.includes(t));
  }
  _addParent(t) {
    let { _parentage: n } = this;
    this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
  }
  _removeParent(t) {
    let { _parentage: n } = this;
    n === t ? (this._parentage = null) : Array.isArray(n) && Qe(n, t);
  }
  remove(t) {
    let { _finalizers: n } = this;
    n && Qe(n, t), t instanceof e && t._removeParent(this);
  }
};
k.EMPTY = (() => {
  let e = new k();
  return (e.closed = !0), e;
})();
var No = k.EMPTY;
function Ln(e) {
  return (
    e instanceof k ||
    (e && 'closed' in e && m(e.remove) && m(e.add) && m(e.unsubscribe))
  );
}
function ka(e) {
  m(e) ? e() : e.unsubscribe();
}
var ce = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1,
};
var It = {
  setTimeout(e, t, ...n) {
    let { delegate: r } = It;
    return r?.setTimeout ? r.setTimeout(e, t, ...n) : setTimeout(e, t, ...n);
  },
  clearTimeout(e) {
    let { delegate: t } = It;
    return (t?.clearTimeout || clearTimeout)(e);
  },
  delegate: void 0,
};
function jn(e) {
  It.setTimeout(() => {
    let { onUnhandledError: t } = ce;
    if (t) t(e);
    else throw e;
  });
}
function Jt() {}
var La = Ao('C', void 0, void 0);
function ja(e) {
  return Ao('E', void 0, e);
}
function Va(e) {
  return Ao('N', e, void 0);
}
function Ao(e, t, n) {
  return { kind: e, value: t, error: n };
}
var Ke = null;
function Et(e) {
  if (ce.useDeprecatedSynchronousErrorHandling) {
    let t = !Ke;
    if ((t && (Ke = { errorThrown: !1, error: null }), e(), t)) {
      let { errorThrown: n, error: r } = Ke;
      if (((Ke = null), n)) throw r;
    }
  } else e();
}
function Ba(e) {
  ce.useDeprecatedSynchronousErrorHandling &&
    Ke &&
    ((Ke.errorThrown = !0), (Ke.error = e));
}
var Je = class extends k {
    constructor(t) {
      super(),
        (this.isStopped = !1),
        t
          ? ((this.destination = t), Ln(t) && t.add(this))
          : (this.destination = Mf);
    }
    static create(t, n, r) {
      return new _e(t, n, r);
    }
    next(t) {
      this.isStopped ? Fo(Va(t), this) : this._next(t);
    }
    error(t) {
      this.isStopped
        ? Fo(ja(t), this)
        : ((this.isStopped = !0), this._error(t));
    }
    complete() {
      this.isStopped ? Fo(La, this) : ((this.isStopped = !0), this._complete());
    }
    unsubscribe() {
      this.closed ||
        ((this.isStopped = !0), super.unsubscribe(), (this.destination = null));
    }
    _next(t) {
      this.destination.next(t);
    }
    _error(t) {
      try {
        this.destination.error(t);
      } finally {
        this.unsubscribe();
      }
    }
    _complete() {
      try {
        this.destination.complete();
      } finally {
        this.unsubscribe();
      }
    }
  },
  bf = Function.prototype.bind;
function Oo(e, t) {
  return bf.call(e, t);
}
var Ro = class {
    constructor(t) {
      this.partialObserver = t;
    }
    next(t) {
      let { partialObserver: n } = this;
      if (n.next)
        try {
          n.next(t);
        } catch (r) {
          Vn(r);
        }
    }
    error(t) {
      let { partialObserver: n } = this;
      if (n.error)
        try {
          n.error(t);
        } catch (r) {
          Vn(r);
        }
      else Vn(t);
    }
    complete() {
      let { partialObserver: t } = this;
      if (t.complete)
        try {
          t.complete();
        } catch (n) {
          Vn(n);
        }
    }
  },
  _e = class extends Je {
    constructor(t, n, r) {
      super();
      let o;
      if (m(t) || !t)
        o = { next: t ?? void 0, error: n ?? void 0, complete: r ?? void 0 };
      else {
        let i;
        this && ce.useDeprecatedNextContext
          ? ((i = Object.create(t)),
            (i.unsubscribe = () => this.unsubscribe()),
            (o = {
              next: t.next && Oo(t.next, i),
              error: t.error && Oo(t.error, i),
              complete: t.complete && Oo(t.complete, i),
            }))
          : (o = t);
      }
      this.destination = new Ro(o);
    }
  };
function Vn(e) {
  ce.useDeprecatedSynchronousErrorHandling ? Ba(e) : jn(e);
}
function _f(e) {
  throw e;
}
function Fo(e, t) {
  let { onStoppedNotification: n } = ce;
  n && It.setTimeout(() => n(e, t));
}
var Mf = { closed: !0, next: Jt, error: _f, complete: Jt };
var wt = (typeof Symbol == 'function' && Symbol.observable) || '@@observable';
function G(e) {
  return e;
}
function xf(...e) {
  return Po(e);
}
function Po(e) {
  return e.length === 0
    ? G
    : e.length === 1
      ? e[0]
      : function (n) {
          return e.reduce((r, o) => o(r), n);
        };
}
var S = (() => {
  class e {
    constructor(n) {
      n && (this._subscribe = n);
    }
    lift(n) {
      let r = new e();
      return (r.source = this), (r.operator = n), r;
    }
    subscribe(n, r, o) {
      let i = Tf(n) ? n : new _e(n, r, o);
      return (
        Et(() => {
          let { operator: s, source: a } = this;
          i.add(
            s ? s.call(i, a) : a ? this._subscribe(i) : this._trySubscribe(i)
          );
        }),
        i
      );
    }
    _trySubscribe(n) {
      try {
        return this._subscribe(n);
      } catch (r) {
        n.error(r);
      }
    }
    forEach(n, r) {
      return (
        (r = $a(r)),
        new r((o, i) => {
          let s = new _e({
            next: (a) => {
              try {
                n(a);
              } catch (u) {
                i(u), s.unsubscribe();
              }
            },
            error: i,
            complete: o,
          });
          this.subscribe(s);
        })
      );
    }
    _subscribe(n) {
      var r;
      return (r = this.source) === null || r === void 0
        ? void 0
        : r.subscribe(n);
    }
    [wt]() {
      return this;
    }
    pipe(...n) {
      return Po(n)(this);
    }
    toPromise(n) {
      return (
        (n = $a(n)),
        new n((r, o) => {
          let i;
          this.subscribe(
            (s) => (i = s),
            (s) => o(s),
            () => r(i)
          );
        })
      );
    }
  }
  return (e.create = (t) => new e(t)), e;
})();
function $a(e) {
  var t;
  return (t = e ?? ce.Promise) !== null && t !== void 0 ? t : Promise;
}
function Sf(e) {
  return e && m(e.next) && m(e.error) && m(e.complete);
}
function Tf(e) {
  return (e && e instanceof Je) || (Sf(e) && Ln(e));
}
function ko(e) {
  return m(e?.lift);
}
function v(e) {
  return (t) => {
    if (ko(t))
      return t.lift(function (n) {
        try {
          return e(n, this);
        } catch (r) {
          this.error(r);
        }
      });
    throw new TypeError('Unable to lift unknown Observable type');
  };
}
function I(e, t, n, r, o) {
  return new Lo(e, t, n, r, o);
}
var Lo = class extends Je {
  constructor(t, n, r, o, i, s) {
    super(t),
      (this.onFinalize = i),
      (this.shouldUnsubscribe = s),
      (this._next = n
        ? function (a) {
            try {
              n(a);
            } catch (u) {
              t.error(u);
            }
          }
        : super._next),
      (this._error = o
        ? function (a) {
            try {
              o(a);
            } catch (u) {
              t.error(u);
            } finally {
              this.unsubscribe();
            }
          }
        : super._error),
      (this._complete = r
        ? function () {
            try {
              r();
            } catch (a) {
              t.error(a);
            } finally {
              this.unsubscribe();
            }
          }
        : super._complete);
  }
  unsubscribe() {
    var t;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      let { closed: n } = this;
      super.unsubscribe(),
        !n && ((t = this.onFinalize) === null || t === void 0 || t.call(this));
    }
  }
};
function jo() {
  return v((e, t) => {
    let n = null;
    e._refCount++;
    let r = I(t, void 0, void 0, void 0, () => {
      if (!e || e._refCount <= 0 || 0 < --e._refCount) {
        n = null;
        return;
      }
      let o = e._connection,
        i = n;
      (n = null), o && (!i || o === i) && o.unsubscribe(), t.unsubscribe();
    });
    e.subscribe(r), r.closed || (n = e.connect());
  });
}
var Vo = class extends S {
  constructor(t, n) {
    super(),
      (this.source = t),
      (this.subjectFactory = n),
      (this._subject = null),
      (this._refCount = 0),
      (this._connection = null),
      ko(t) && (this.lift = t.lift);
  }
  _subscribe(t) {
    return this.getSubject().subscribe(t);
  }
  getSubject() {
    let t = this._subject;
    return (
      (!t || t.isStopped) && (this._subject = this.subjectFactory()),
      this._subject
    );
  }
  _teardown() {
    this._refCount = 0;
    let { _connection: t } = this;
    (this._subject = this._connection = null), t?.unsubscribe();
  }
  connect() {
    let t = this._connection;
    if (!t) {
      t = this._connection = new k();
      let n = this.getSubject();
      t.add(
        this.source.subscribe(
          I(
            n,
            void 0,
            () => {
              this._teardown(), n.complete();
            },
            (r) => {
              this._teardown(), n.error(r);
            },
            () => this._teardown()
          )
        )
      ),
        t.closed && ((this._connection = null), (t = k.EMPTY));
    }
    return t;
  }
  refCount() {
    return jo()(this);
  }
};
var Ha = Dt(
  (e) =>
    function () {
      e(this),
        (this.name = 'ObjectUnsubscribedError'),
        (this.message = 'object unsubscribed');
    }
);
var ie = (() => {
    class e extends S {
      constructor() {
        super(),
          (this.closed = !1),
          (this.currentObservers = null),
          (this.observers = []),
          (this.isStopped = !1),
          (this.hasError = !1),
          (this.thrownError = null);
      }
      lift(n) {
        let r = new Bn(this, this);
        return (r.operator = n), r;
      }
      _throwIfClosed() {
        if (this.closed) throw new Ha();
      }
      next(n) {
        Et(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.currentObservers ||
              (this.currentObservers = Array.from(this.observers));
            for (let r of this.currentObservers) r.next(n);
          }
        });
      }
      error(n) {
        Et(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            (this.hasError = this.isStopped = !0), (this.thrownError = n);
            let { observers: r } = this;
            for (; r.length; ) r.shift().error(n);
          }
        });
      }
      complete() {
        Et(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.isStopped = !0;
            let { observers: n } = this;
            for (; n.length; ) n.shift().complete();
          }
        });
      }
      unsubscribe() {
        (this.isStopped = this.closed = !0),
          (this.observers = this.currentObservers = null);
      }
      get observed() {
        var n;
        return (
          ((n = this.observers) === null || n === void 0 ? void 0 : n.length) >
          0
        );
      }
      _trySubscribe(n) {
        return this._throwIfClosed(), super._trySubscribe(n);
      }
      _subscribe(n) {
        return (
          this._throwIfClosed(),
          this._checkFinalizedStatuses(n),
          this._innerSubscribe(n)
        );
      }
      _innerSubscribe(n) {
        let { hasError: r, isStopped: o, observers: i } = this;
        return r || o
          ? No
          : ((this.currentObservers = null),
            i.push(n),
            new k(() => {
              (this.currentObservers = null), Qe(i, n);
            }));
      }
      _checkFinalizedStatuses(n) {
        let { hasError: r, thrownError: o, isStopped: i } = this;
        r ? n.error(o) : i && n.complete();
      }
      asObservable() {
        let n = new S();
        return (n.source = this), n;
      }
    }
    return (e.create = (t, n) => new Bn(t, n)), e;
  })(),
  Bn = class extends ie {
    constructor(t, n) {
      super(), (this.destination = t), (this.source = n);
    }
    next(t) {
      var n, r;
      (r =
        (n = this.destination) === null || n === void 0 ? void 0 : n.next) ===
        null ||
        r === void 0 ||
        r.call(n, t);
    }
    error(t) {
      var n, r;
      (r =
        (n = this.destination) === null || n === void 0 ? void 0 : n.error) ===
        null ||
        r === void 0 ||
        r.call(n, t);
    }
    complete() {
      var t, n;
      (n =
        (t = this.destination) === null || t === void 0
          ? void 0
          : t.complete) === null ||
        n === void 0 ||
        n.call(t);
    }
    _subscribe(t) {
      var n, r;
      return (r =
        (n = this.source) === null || n === void 0
          ? void 0
          : n.subscribe(t)) !== null && r !== void 0
        ? r
        : No;
    }
  };
var Xt = class extends ie {
  constructor(t) {
    super(), (this._value = t);
  }
  get value() {
    return this.getValue();
  }
  _subscribe(t) {
    let n = super._subscribe(t);
    return !n.closed && t.next(this._value), n;
  }
  getValue() {
    let { hasError: t, thrownError: n, _value: r } = this;
    if (t) throw n;
    return this._throwIfClosed(), r;
  }
  next(t) {
    super.next((this._value = t));
  }
};
var en = {
  now() {
    return (en.delegate || Date).now();
  },
  delegate: void 0,
};
var tn = class extends ie {
  constructor(t = 1 / 0, n = 1 / 0, r = en) {
    super(),
      (this._bufferSize = t),
      (this._windowTime = n),
      (this._timestampProvider = r),
      (this._buffer = []),
      (this._infiniteTimeWindow = !0),
      (this._infiniteTimeWindow = n === 1 / 0),
      (this._bufferSize = Math.max(1, t)),
      (this._windowTime = Math.max(1, n));
  }
  next(t) {
    let {
      isStopped: n,
      _buffer: r,
      _infiniteTimeWindow: o,
      _timestampProvider: i,
      _windowTime: s,
    } = this;
    n || (r.push(t), !o && r.push(i.now() + s)),
      this._trimBuffer(),
      super.next(t);
  }
  _subscribe(t) {
    this._throwIfClosed(), this._trimBuffer();
    let n = this._innerSubscribe(t),
      { _infiniteTimeWindow: r, _buffer: o } = this,
      i = o.slice();
    for (let s = 0; s < i.length && !t.closed; s += r ? 1 : 2) t.next(i[s]);
    return this._checkFinalizedStatuses(t), n;
  }
  _trimBuffer() {
    let {
        _bufferSize: t,
        _timestampProvider: n,
        _buffer: r,
        _infiniteTimeWindow: o,
      } = this,
      i = (o ? 1 : 2) * t;
    if ((t < 1 / 0 && i < r.length && r.splice(0, r.length - i), !o)) {
      let s = n.now(),
        a = 0;
      for (let u = 1; u < r.length && r[u] <= s; u += 2) a = u;
      a && r.splice(0, a + 1);
    }
  }
};
var $n = class extends k {
  constructor(t, n) {
    super();
  }
  schedule(t, n = 0) {
    return this;
  }
};
var nn = {
  setInterval(e, t, ...n) {
    let { delegate: r } = nn;
    return r?.setInterval ? r.setInterval(e, t, ...n) : setInterval(e, t, ...n);
  },
  clearInterval(e) {
    let { delegate: t } = nn;
    return (t?.clearInterval || clearInterval)(e);
  },
  delegate: void 0,
};
var Hn = class extends $n {
  constructor(t, n) {
    super(t, n), (this.scheduler = t), (this.work = n), (this.pending = !1);
  }
  schedule(t, n = 0) {
    var r;
    if (this.closed) return this;
    this.state = t;
    let o = this.id,
      i = this.scheduler;
    return (
      o != null && (this.id = this.recycleAsyncId(i, o, n)),
      (this.pending = !0),
      (this.delay = n),
      (this.id =
        (r = this.id) !== null && r !== void 0
          ? r
          : this.requestAsyncId(i, this.id, n)),
      this
    );
  }
  requestAsyncId(t, n, r = 0) {
    return nn.setInterval(t.flush.bind(t, this), r);
  }
  recycleAsyncId(t, n, r = 0) {
    if (r != null && this.delay === r && this.pending === !1) return n;
    n != null && nn.clearInterval(n);
  }
  execute(t, n) {
    if (this.closed) return new Error('executing a cancelled action');
    this.pending = !1;
    let r = this._execute(t, n);
    if (r) return r;
    this.pending === !1 &&
      this.id != null &&
      (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
  }
  _execute(t, n) {
    let r = !1,
      o;
    try {
      this.work(t);
    } catch (i) {
      (r = !0), (o = i || new Error('Scheduled action threw falsy error'));
    }
    if (r) return this.unsubscribe(), o;
  }
  unsubscribe() {
    if (!this.closed) {
      let { id: t, scheduler: n } = this,
        { actions: r } = n;
      (this.work = this.state = this.scheduler = null),
        (this.pending = !1),
        Qe(r, this),
        t != null && (this.id = this.recycleAsyncId(n, t, null)),
        (this.delay = null),
        super.unsubscribe();
    }
  }
};
var Ct = class e {
  constructor(t, n = e.now) {
    (this.schedulerActionCtor = t), (this.now = n);
  }
  schedule(t, n = 0, r) {
    return new this.schedulerActionCtor(this, t).schedule(r, n);
  }
};
Ct.now = en.now;
var Un = class extends Ct {
  constructor(t, n = Ct.now) {
    super(t, n), (this.actions = []), (this._active = !1);
  }
  flush(t) {
    let { actions: n } = this;
    if (this._active) {
      n.push(t);
      return;
    }
    let r;
    this._active = !0;
    do if ((r = t.execute(t.state, t.delay))) break;
    while ((t = n.shift()));
    if (((this._active = !1), r)) {
      for (; (t = n.shift()); ) t.unsubscribe();
      throw r;
    }
  }
};
var rn = new Un(Hn),
  Ua = rn;
var Xe = new S((e) => e.complete());
function zn(e) {
  return e && m(e.schedule);
}
function Bo(e) {
  return e[e.length - 1];
}
function Gn(e) {
  return m(Bo(e)) ? e.pop() : void 0;
}
function me(e) {
  return zn(Bo(e)) ? e.pop() : void 0;
}
function za(e, t) {
  return typeof Bo(e) == 'number' ? e.pop() : t;
}
function Wa(e, t, n, r) {
  function o(i) {
    return i instanceof n
      ? i
      : new n(function (s) {
          s(i);
        });
  }
  return new (n || (n = Promise))(function (i, s) {
    function a(l) {
      try {
        c(r.next(l));
      } catch (d) {
        s(d);
      }
    }
    function u(l) {
      try {
        c(r.throw(l));
      } catch (d) {
        s(d);
      }
    }
    function c(l) {
      l.done ? i(l.value) : o(l.value).then(a, u);
    }
    c((r = r.apply(e, t || [])).next());
  });
}
function Ga(e) {
  var t = typeof Symbol == 'function' && Symbol.iterator,
    n = t && e[t],
    r = 0;
  if (n) return n.call(e);
  if (e && typeof e.length == 'number')
    return {
      next: function () {
        return (
          e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }
        );
      },
    };
  throw new TypeError(
    t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
  );
}
function et(e) {
  return this instanceof et ? ((this.v = e), this) : new et(e);
}
function qa(e, t, n) {
  if (!Symbol.asyncIterator)
    throw new TypeError('Symbol.asyncIterator is not defined.');
  var r = n.apply(e, t || []),
    o,
    i = [];
  return (
    (o = {}),
    a('next'),
    a('throw'),
    a('return', s),
    (o[Symbol.asyncIterator] = function () {
      return this;
    }),
    o
  );
  function s(f) {
    return function (p) {
      return Promise.resolve(p).then(f, d);
    };
  }
  function a(f, p) {
    r[f] &&
      ((o[f] = function (g) {
        return new Promise(function (T, M) {
          i.push([f, g, T, M]) > 1 || u(f, g);
        });
      }),
      p && (o[f] = p(o[f])));
  }
  function u(f, p) {
    try {
      c(r[f](p));
    } catch (g) {
      h(i[0][3], g);
    }
  }
  function c(f) {
    f.value instanceof et
      ? Promise.resolve(f.value.v).then(l, d)
      : h(i[0][2], f);
  }
  function l(f) {
    u('next', f);
  }
  function d(f) {
    u('throw', f);
  }
  function h(f, p) {
    f(p), i.shift(), i.length && u(i[0][0], i[0][1]);
  }
}
function Za(e) {
  if (!Symbol.asyncIterator)
    throw new TypeError('Symbol.asyncIterator is not defined.');
  var t = e[Symbol.asyncIterator],
    n;
  return t
    ? t.call(e)
    : ((e = typeof Ga == 'function' ? Ga(e) : e[Symbol.iterator]()),
      (n = {}),
      r('next'),
      r('throw'),
      r('return'),
      (n[Symbol.asyncIterator] = function () {
        return this;
      }),
      n);
  function r(i) {
    n[i] =
      e[i] &&
      function (s) {
        return new Promise(function (a, u) {
          (s = e[i](s)), o(a, u, s.done, s.value);
        });
      };
  }
  function o(i, s, a, u) {
    Promise.resolve(u).then(function (c) {
      i({ value: c, done: a });
    }, s);
  }
}
var bt = (e) => e && typeof e.length == 'number' && typeof e != 'function';
function Wn(e) {
  return m(e?.then);
}
function qn(e) {
  return m(e[wt]);
}
function Zn(e) {
  return Symbol.asyncIterator && m(e?.[Symbol.asyncIterator]);
}
function Yn(e) {
  return new TypeError(
    `You provided ${e !== null && typeof e == 'object' ? 'an invalid object' : `'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
  );
}
function Nf() {
  return typeof Symbol != 'function' || !Symbol.iterator
    ? '@@iterator'
    : Symbol.iterator;
}
var Qn = Nf();
function Kn(e) {
  return m(e?.[Qn]);
}
function Jn(e) {
  return qa(this, arguments, function* () {
    let n = e.getReader();
    try {
      for (;;) {
        let { value: r, done: o } = yield et(n.read());
        if (o) return yield et(void 0);
        yield yield et(r);
      }
    } finally {
      n.releaseLock();
    }
  });
}
function Xn(e) {
  return m(e?.getReader);
}
function A(e) {
  if (e instanceof S) return e;
  if (e != null) {
    if (qn(e)) return Af(e);
    if (bt(e)) return Of(e);
    if (Wn(e)) return Ff(e);
    if (Zn(e)) return Ya(e);
    if (Kn(e)) return Rf(e);
    if (Xn(e)) return Pf(e);
  }
  throw Yn(e);
}
function Af(e) {
  return new S((t) => {
    let n = e[wt]();
    if (m(n.subscribe)) return n.subscribe(t);
    throw new TypeError(
      'Provided object does not correctly implement Symbol.observable'
    );
  });
}
function Of(e) {
  return new S((t) => {
    for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
    t.complete();
  });
}
function Ff(e) {
  return new S((t) => {
    e.then(
      (n) => {
        t.closed || (t.next(n), t.complete());
      },
      (n) => t.error(n)
    ).then(null, jn);
  });
}
function Rf(e) {
  return new S((t) => {
    for (let n of e) if ((t.next(n), t.closed)) return;
    t.complete();
  });
}
function Ya(e) {
  return new S((t) => {
    kf(e, t).catch((n) => t.error(n));
  });
}
function Pf(e) {
  return Ya(Jn(e));
}
function kf(e, t) {
  var n, r, o, i;
  return Wa(this, void 0, void 0, function* () {
    try {
      for (n = Za(e); (r = yield n.next()), !r.done; ) {
        let s = r.value;
        if ((t.next(s), t.closed)) return;
      }
    } catch (s) {
      o = { error: s };
    } finally {
      try {
        r && !r.done && (i = n.return) && (yield i.call(n));
      } finally {
        if (o) throw o.error;
      }
    }
    t.complete();
  });
}
function K(e, t, n, r = 0, o = !1) {
  let i = t.schedule(function () {
    n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
  }, r);
  if ((e.add(i), !o)) return i;
}
function er(e, t = 0) {
  return v((n, r) => {
    n.subscribe(
      I(
        r,
        (o) => K(r, e, () => r.next(o), t),
        () => K(r, e, () => r.complete(), t),
        (o) => K(r, e, () => r.error(o), t)
      )
    );
  });
}
function tr(e, t = 0) {
  return v((n, r) => {
    r.add(e.schedule(() => n.subscribe(r), t));
  });
}
function Qa(e, t) {
  return A(e).pipe(tr(t), er(t));
}
function Ka(e, t) {
  return A(e).pipe(tr(t), er(t));
}
function Ja(e, t) {
  return new S((n) => {
    let r = 0;
    return t.schedule(function () {
      r === e.length
        ? n.complete()
        : (n.next(e[r++]), n.closed || this.schedule());
    });
  });
}
function Xa(e, t) {
  return new S((n) => {
    let r;
    return (
      K(n, t, () => {
        (r = e[Qn]()),
          K(
            n,
            t,
            () => {
              let o, i;
              try {
                ({ value: o, done: i } = r.next());
              } catch (s) {
                n.error(s);
                return;
              }
              i ? n.complete() : n.next(o);
            },
            0,
            !0
          );
      }),
      () => m(r?.return) && r.return()
    );
  });
}
function nr(e, t) {
  if (!e) throw new Error('Iterable cannot be null');
  return new S((n) => {
    K(n, t, () => {
      let r = e[Symbol.asyncIterator]();
      K(
        n,
        t,
        () => {
          r.next().then((o) => {
            o.done ? n.complete() : n.next(o.value);
          });
        },
        0,
        !0
      );
    });
  });
}
function eu(e, t) {
  return nr(Jn(e), t);
}
function tu(e, t) {
  if (e != null) {
    if (qn(e)) return Qa(e, t);
    if (bt(e)) return Ja(e, t);
    if (Wn(e)) return Ka(e, t);
    if (Zn(e)) return nr(e, t);
    if (Kn(e)) return Xa(e, t);
    if (Xn(e)) return eu(e, t);
  }
  throw Yn(e);
}
function ye(e, t) {
  return t ? tu(e, t) : A(e);
}
function Lf(...e) {
  let t = me(e);
  return ye(e, t);
}
function jf(e, t) {
  let n = m(e) ? e : () => e,
    r = (o) => o.error(n());
  return new S(t ? (o) => t.schedule(r, 0, o) : r);
}
function Vf(e) {
  return !!e && (e instanceof S || (m(e.lift) && m(e.subscribe)));
}
var tt = Dt(
  (e) =>
    function () {
      e(this),
        (this.name = 'EmptyError'),
        (this.message = 'no elements in sequence');
    }
);
function nu(e) {
  return e instanceof Date && !isNaN(e);
}
function Me(e, t) {
  return v((n, r) => {
    let o = 0;
    n.subscribe(
      I(r, (i) => {
        r.next(e.call(t, i, o++));
      })
    );
  });
}
var { isArray: Bf } = Array;
function $f(e, t) {
  return Bf(t) ? e(...t) : e(t);
}
function _t(e) {
  return Me((t) => $f(e, t));
}
var { isArray: Hf } = Array,
  { getPrototypeOf: Uf, prototype: zf, keys: Gf } = Object;
function rr(e) {
  if (e.length === 1) {
    let t = e[0];
    if (Hf(t)) return { args: t, keys: null };
    if (Wf(t)) {
      let n = Gf(t);
      return { args: n.map((r) => t[r]), keys: n };
    }
  }
  return { args: e, keys: null };
}
function Wf(e) {
  return e && typeof e == 'object' && Uf(e) === zf;
}
function or(e, t) {
  return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
}
function qf(...e) {
  let t = me(e),
    n = Gn(e),
    { args: r, keys: o } = rr(e);
  if (r.length === 0) return ye([], t);
  let i = new S(Zf(r, t, o ? (s) => or(o, s) : G));
  return n ? i.pipe(_t(n)) : i;
}
function Zf(e, t, n = G) {
  return (r) => {
    ru(
      t,
      () => {
        let { length: o } = e,
          i = new Array(o),
          s = o,
          a = o;
        for (let u = 0; u < o; u++)
          ru(
            t,
            () => {
              let c = ye(e[u], t),
                l = !1;
              c.subscribe(
                I(
                  r,
                  (d) => {
                    (i[u] = d), l || ((l = !0), a--), a || r.next(n(i.slice()));
                  },
                  () => {
                    --s || r.complete();
                  }
                )
              );
            },
            r
          );
      },
      r
    );
  };
}
function ru(e, t, n) {
  e ? K(n, e, t) : t();
}
function ou(e, t, n, r, o, i, s, a) {
  let u = [],
    c = 0,
    l = 0,
    d = !1,
    h = () => {
      d && !u.length && !c && t.complete();
    },
    f = (g) => (c < r ? p(g) : u.push(g)),
    p = (g) => {
      i && t.next(g), c++;
      let T = !1;
      A(n(g, l++)).subscribe(
        I(
          t,
          (M) => {
            o?.(M), i ? f(M) : t.next(M);
          },
          () => {
            T = !0;
          },
          void 0,
          () => {
            if (T)
              try {
                for (c--; u.length && c < r; ) {
                  let M = u.shift();
                  s ? K(t, s, () => p(M)) : p(M);
                }
                h();
              } catch (M) {
                t.error(M);
              }
          }
        )
      );
    };
  return (
    e.subscribe(
      I(t, f, () => {
        (d = !0), h();
      })
    ),
    () => {
      a?.();
    }
  );
}
function xe(e, t, n = 1 / 0) {
  return m(t)
    ? xe((r, o) => Me((i, s) => t(r, i, o, s))(A(e(r, o))), n)
    : (typeof t == 'number' && (n = t), v((r, o) => ou(r, o, e, n)));
}
function on(e = 1 / 0) {
  return xe(G, e);
}
function iu() {
  return on(1);
}
function ir(...e) {
  return iu()(ye(e, me(e)));
}
function Yf(e) {
  return new S((t) => {
    A(e()).subscribe(t);
  });
}
function Qf(...e) {
  let t = Gn(e),
    { args: n, keys: r } = rr(e),
    o = new S((i) => {
      let { length: s } = n;
      if (!s) {
        i.complete();
        return;
      }
      let a = new Array(s),
        u = s,
        c = s;
      for (let l = 0; l < s; l++) {
        let d = !1;
        A(n[l]).subscribe(
          I(
            i,
            (h) => {
              d || ((d = !0), c--), (a[l] = h);
            },
            () => u--,
            void 0,
            () => {
              (!u || !d) && (c || i.next(r ? or(r, a) : a), i.complete());
            }
          )
        );
      }
    });
  return t ? o.pipe(_t(t)) : o;
}
var Kf = ['addListener', 'removeListener'],
  Jf = ['addEventListener', 'removeEventListener'],
  Xf = ['on', 'off'];
function $o(e, t, n, r) {
  if ((m(n) && ((r = n), (n = void 0)), r)) return $o(e, t, n).pipe(_t(r));
  let [o, i] = nh(e)
    ? Jf.map((s) => (a) => e[s](t, a, n))
    : eh(e)
      ? Kf.map(su(e, t))
      : th(e)
        ? Xf.map(su(e, t))
        : [];
  if (!o && bt(e)) return xe((s) => $o(s, t, n))(A(e));
  if (!o) throw new TypeError('Invalid event target');
  return new S((s) => {
    let a = (...u) => s.next(1 < u.length ? u : u[0]);
    return o(a), () => i(a);
  });
}
function su(e, t) {
  return (n) => (r) => e[n](t, r);
}
function eh(e) {
  return m(e.addListener) && m(e.removeListener);
}
function th(e) {
  return m(e.on) && m(e.off);
}
function nh(e) {
  return m(e.addEventListener) && m(e.removeEventListener);
}
function au(e = 0, t, n = Ua) {
  let r = -1;
  return (
    t != null && (zn(t) ? (n = t) : (r = t)),
    new S((o) => {
      let i = nu(e) ? +e - n.now() : e;
      i < 0 && (i = 0);
      let s = 0;
      return n.schedule(function () {
        o.closed ||
          (o.next(s++), 0 <= r ? this.schedule(void 0, r) : o.complete());
      }, i);
    })
  );
}
function rh(...e) {
  let t = me(e),
    n = za(e, 1 / 0),
    r = e;
  return r.length ? (r.length === 1 ? A(r[0]) : on(n)(ye(r, t))) : Xe;
}
function nt(e, t) {
  return v((n, r) => {
    let o = 0;
    n.subscribe(I(r, (i) => e.call(t, i, o++) && r.next(i)));
  });
}
function uu(e) {
  return v((t, n) => {
    let r = !1,
      o = null,
      i = null,
      s = !1,
      a = () => {
        if ((i?.unsubscribe(), (i = null), r)) {
          r = !1;
          let c = o;
          (o = null), n.next(c);
        }
        s && n.complete();
      },
      u = () => {
        (i = null), s && n.complete();
      };
    t.subscribe(
      I(
        n,
        (c) => {
          (r = !0), (o = c), i || A(e(c)).subscribe((i = I(n, a, u)));
        },
        () => {
          (s = !0), (!r || !i || i.closed) && n.complete();
        }
      )
    );
  });
}
function oh(e, t = rn) {
  return uu(() => au(e, t));
}
function cu(e) {
  return v((t, n) => {
    let r = null,
      o = !1,
      i;
    (r = t.subscribe(
      I(n, void 0, void 0, (s) => {
        (i = A(e(s, cu(e)(t)))),
          r ? (r.unsubscribe(), (r = null), i.subscribe(n)) : (o = !0);
      })
    )),
      o && (r.unsubscribe(), (r = null), i.subscribe(n));
  });
}
function sr(e, t, n, r, o) {
  return (i, s) => {
    let a = n,
      u = t,
      c = 0;
    i.subscribe(
      I(
        s,
        (l) => {
          let d = c++;
          (u = a ? e(u, l, d) : ((a = !0), l)), r && s.next(u);
        },
        o &&
          (() => {
            a && s.next(u), s.complete();
          })
      )
    );
  };
}
function ih(e, t) {
  return v(sr(e, t, arguments.length >= 2, !1, !0));
}
function sh(e, t) {
  return m(t) ? xe(e, t, 1) : xe(e, 1);
}
function lu(e, t = rn) {
  return v((n, r) => {
    let o = null,
      i = null,
      s = null,
      a = () => {
        if (o) {
          o.unsubscribe(), (o = null);
          let c = i;
          (i = null), r.next(c);
        }
      };
    function u() {
      let c = s + e,
        l = t.now();
      if (l < c) {
        (o = this.schedule(void 0, c - l)), r.add(o);
        return;
      }
      a();
    }
    n.subscribe(
      I(
        r,
        (c) => {
          (i = c), (s = t.now()), o || ((o = t.schedule(u, e)), r.add(o));
        },
        () => {
          a(), r.complete();
        },
        void 0,
        () => {
          i = o = null;
        }
      )
    );
  });
}
function sn(e) {
  return v((t, n) => {
    let r = !1;
    t.subscribe(
      I(
        n,
        (o) => {
          (r = !0), n.next(o);
        },
        () => {
          r || n.next(e), n.complete();
        }
      )
    );
  });
}
function Ho(e) {
  return e <= 0
    ? () => Xe
    : v((t, n) => {
        let r = 0;
        t.subscribe(
          I(n, (o) => {
            ++r <= e && (n.next(o), e <= r && n.complete());
          })
        );
      });
}
function ah(e) {
  return Me(() => e);
}
function uh(e, t = G) {
  return (
    (e = e ?? ch),
    v((n, r) => {
      let o,
        i = !0;
      n.subscribe(
        I(r, (s) => {
          let a = t(s);
          (i || !e(o, a)) && ((i = !1), (o = a), r.next(s));
        })
      );
    })
  );
}
function ch(e, t) {
  return e === t;
}
function ar(e = lh) {
  return v((t, n) => {
    let r = !1;
    t.subscribe(
      I(
        n,
        (o) => {
          (r = !0), n.next(o);
        },
        () => (r ? n.complete() : n.error(e()))
      )
    );
  });
}
function lh() {
  return new tt();
}
function dh(e) {
  return v((t, n) => {
    try {
      t.subscribe(n);
    } finally {
      n.add(e);
    }
  });
}
function du(e, t) {
  let n = arguments.length >= 2;
  return (r) =>
    r.pipe(
      e ? nt((o, i) => e(o, i, r)) : G,
      Ho(1),
      n ? sn(t) : ar(() => new tt())
    );
}
function Uo(e) {
  return e <= 0
    ? () => Xe
    : v((t, n) => {
        let r = [];
        t.subscribe(
          I(
            n,
            (o) => {
              r.push(o), e < r.length && r.shift();
            },
            () => {
              for (let o of r) n.next(o);
              n.complete();
            },
            void 0,
            () => {
              r = null;
            }
          )
        );
      });
}
function fh(e, t) {
  let n = arguments.length >= 2;
  return (r) =>
    r.pipe(
      e ? nt((o, i) => e(o, i, r)) : G,
      Uo(1),
      n ? sn(t) : ar(() => new tt())
    );
}
function hh(e, t) {
  return v(sr(e, t, arguments.length >= 2, !0));
}
function Go(e = {}) {
  let {
    connector: t = () => new ie(),
    resetOnError: n = !0,
    resetOnComplete: r = !0,
    resetOnRefCountZero: o = !0,
  } = e;
  return (i) => {
    let s,
      a,
      u,
      c = 0,
      l = !1,
      d = !1,
      h = () => {
        a?.unsubscribe(), (a = void 0);
      },
      f = () => {
        h(), (s = u = void 0), (l = d = !1);
      },
      p = () => {
        let g = s;
        f(), g?.unsubscribe();
      };
    return v((g, T) => {
      c++, !d && !l && h();
      let M = (u = u ?? t());
      T.add(() => {
        c--, c === 0 && !d && !l && (a = zo(p, o));
      }),
        M.subscribe(T),
        !s &&
          c > 0 &&
          ((s = new _e({
            next: (j) => M.next(j),
            error: (j) => {
              (d = !0), h(), (a = zo(f, n, j)), M.error(j);
            },
            complete: () => {
              (l = !0), h(), (a = zo(f, r)), M.complete();
            },
          })),
          A(g).subscribe(s));
    })(i);
  };
}
function zo(e, t, ...n) {
  if (t === !0) {
    e();
    return;
  }
  if (t === !1) return;
  let r = new _e({
    next: () => {
      r.unsubscribe(), e();
    },
  });
  return A(t(...n)).subscribe(r);
}
function ph(e, t, n) {
  let r,
    o = !1;
  return (
    e && typeof e == 'object'
      ? ({
          bufferSize: r = 1 / 0,
          windowTime: t = 1 / 0,
          refCount: o = !1,
          scheduler: n,
        } = e)
      : (r = e ?? 1 / 0),
    Go({
      connector: () => new tn(r, t, n),
      resetOnError: !0,
      resetOnComplete: !1,
      resetOnRefCountZero: o,
    })
  );
}
function gh(e) {
  return nt((t, n) => e <= n);
}
function fu(...e) {
  let t = me(e);
  return v((n, r) => {
    (t ? ir(e, n, t) : ir(e, n)).subscribe(r);
  });
}
function mh(e, t) {
  return v((n, r) => {
    let o = null,
      i = 0,
      s = !1,
      a = () => s && !o && r.complete();
    n.subscribe(
      I(
        r,
        (u) => {
          o?.unsubscribe();
          let c = 0,
            l = i++;
          A(e(u, l)).subscribe(
            (o = I(
              r,
              (d) => r.next(t ? t(u, d, l, c++) : d),
              () => {
                (o = null), a();
              }
            ))
          );
        },
        () => {
          (s = !0), a();
        }
      )
    );
  });
}
function yh(e) {
  return v((t, n) => {
    A(e).subscribe(I(n, () => n.complete(), Jt)), !n.closed && t.subscribe(n);
  });
}
function vh(e, t = !1) {
  return v((n, r) => {
    let o = 0;
    n.subscribe(
      I(r, (i) => {
        let s = e(i, o++);
        (s || t) && r.next(i), !s && r.complete();
      })
    );
  });
}
function Dh(e, t, n) {
  let r = m(e) || t || n ? { next: e, error: t, complete: n } : e;
  return r
    ? v((o, i) => {
        var s;
        (s = r.subscribe) === null || s === void 0 || s.call(r);
        let a = !0;
        o.subscribe(
          I(
            i,
            (u) => {
              var c;
              (c = r.next) === null || c === void 0 || c.call(r, u), i.next(u);
            },
            () => {
              var u;
              (a = !1),
                (u = r.complete) === null || u === void 0 || u.call(r),
                i.complete();
            },
            (u) => {
              var c;
              (a = !1),
                (c = r.error) === null || c === void 0 || c.call(r, u),
                i.error(u);
            },
            () => {
              var u, c;
              a && ((u = r.unsubscribe) === null || u === void 0 || u.call(r)),
                (c = r.finalize) === null || c === void 0 || c.call(r);
            }
          )
        );
      })
    : G;
}
var rc = 'https://g.co/ng/security#xss',
  _ = class extends Error {
    constructor(t, n) {
      super(oc(t, n)), (this.code = t);
    }
  };
function oc(e, t) {
  return `${`NG0${Math.abs(e)}`}${t ? ': ' + t : ''}`;
}
var Jr = Symbol('InputSignalNode#UNSET'),
  ic = ge(pe({}, To), {
    transformFn: void 0,
    applyValueToInputSignal(e, t) {
      Kt(e, t);
    },
  });
function sc(e, t) {
  let n = Object.create(ic);
  (n.value = e), (n.transformFn = t?.transform);
  function r() {
    if ((Yt(n), n.value === Jr)) throw new _(-950, !1);
    return n.value;
  }
  return (r[Q] = n), r;
}
function vn(e) {
  return { toString: e }.toString();
}
var ur = '__parameters__';
function Ih(e) {
  return function (...n) {
    if (e) {
      let r = e(...n);
      for (let o in r) this[o] = r[o];
    }
  };
}
function ac(e, t, n) {
  return vn(() => {
    let r = Ih(t);
    function o(...i) {
      if (this instanceof o) return r.apply(this, i), this;
      let s = new o(...i);
      return (a.annotation = s), a;
      function a(u, c, l) {
        let d = u.hasOwnProperty(ur)
          ? u[ur]
          : Object.defineProperty(u, ur, { value: [] })[ur];
        for (; d.length <= l; ) d.push(null);
        return (d[l] = d[l] || []).push(s), u;
      }
    }
    return (
      n && (o.prototype = Object.create(n.prototype)),
      (o.prototype.ngMetadataName = e),
      (o.annotationCls = o),
      o
    );
  });
}
var wr = globalThis;
function O(e) {
  for (let t in e) if (e[t] === O) return t;
  throw Error('Could not find renamed property on target object.');
}
function Eh(e, t) {
  for (let n in t) t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n]);
}
function X(e) {
  if (typeof e == 'string') return e;
  if (Array.isArray(e)) return '[' + e.map(X).join(', ') + ']';
  if (e == null) return '' + e;
  if (e.overriddenName) return `${e.overriddenName}`;
  if (e.name) return `${e.name}`;
  let t = e.toString();
  if (t == null) return '' + t;
  let n = t.indexOf(`
`);
  return n === -1 ? t : t.substring(0, n);
}
function ii(e, t) {
  return e == null || e === ''
    ? t === null
      ? ''
      : t
    : t == null || t === ''
      ? e
      : e + ' ' + t;
}
var wh = O({ __forward_ref__: O });
function uc(e) {
  return (
    (e.__forward_ref__ = uc),
    (e.toString = function () {
      return X(this());
    }),
    e
  );
}
function W(e) {
  return cc(e) ? e() : e;
}
function cc(e) {
  return (
    typeof e == 'function' && e.hasOwnProperty(wh) && e.__forward_ref__ === uc
  );
}
function P(e) {
  return {
    token: e.token,
    providedIn: e.providedIn || null,
    factory: e.factory,
    value: void 0,
  };
}
function lc(e) {
  return { providers: e.providers || [], imports: e.imports || [] };
}
function Xr(e) {
  return hu(e, dc) || hu(e, fc);
}
function M0(e) {
  return Xr(e) !== null;
}
function hu(e, t) {
  return e.hasOwnProperty(t) ? e[t] : null;
}
function Ch(e) {
  let t = e && (e[dc] || e[fc]);
  return t || null;
}
function pu(e) {
  return e && (e.hasOwnProperty(gu) || e.hasOwnProperty(bh)) ? e[gu] : null;
}
var dc = O({ ɵprov: O }),
  gu = O({ ɵinj: O }),
  fc = O({ ngInjectableDef: O }),
  bh = O({ ngInjectorDef: O }),
  N = class {
    constructor(t, n) {
      (this._desc = t),
        (this.ngMetadataName = 'InjectionToken'),
        (this.ɵprov = void 0),
        typeof n == 'number'
          ? (this.__NG_ELEMENT_ID__ = n)
          : n !== void 0 &&
            (this.ɵprov = P({
              token: this,
              providedIn: n.providedIn || 'root',
              factory: n.factory,
            }));
    }
    get multi() {
      return this;
    }
    toString() {
      return `InjectionToken ${this._desc}`;
    }
  };
function hc(e) {
  return e && !!e.ɵproviders;
}
var _h = O({ ɵcmp: O }),
  Mh = O({ ɵdir: O }),
  xh = O({ ɵpipe: O }),
  Sh = O({ ɵmod: O }),
  Cr = O({ ɵfac: O }),
  un = O({ __NG_ELEMENT_ID__: O }),
  mu = O({ __NG_ENV_ID__: O });
function At(e) {
  return typeof e == 'string' ? e : e == null ? '' : String(e);
}
function Th(e) {
  return typeof e == 'function'
    ? e.name || e.toString()
    : typeof e == 'object' && e != null && typeof e.type == 'function'
      ? e.type.name || e.type.toString()
      : At(e);
}
function Nh(e, t) {
  let n = t ? `. Dependency path: ${t.join(' > ')} > ${e}` : '';
  throw new _(-200, e);
}
function ys(e, t) {
  throw new _(-201, !1);
}
var x = (function (e) {
    return (
      (e[(e.Default = 0)] = 'Default'),
      (e[(e.Host = 1)] = 'Host'),
      (e[(e.Self = 2)] = 'Self'),
      (e[(e.SkipSelf = 4)] = 'SkipSelf'),
      (e[(e.Optional = 8)] = 'Optional'),
      e
    );
  })(x || {}),
  si;
function pc() {
  return si;
}
function J(e) {
  let t = si;
  return (si = e), t;
}
function gc(e, t, n) {
  let r = Xr(e);
  if (r && r.providedIn == 'root')
    return r.value === void 0 ? (r.value = r.factory()) : r.value;
  if (n & x.Optional) return null;
  if (t !== void 0) return t;
  ys(e, 'Injector');
}
var Ah = {},
  cn = Ah,
  ai = '__NG_DI_FLAG__',
  br = 'ngTempTokenPath',
  Oh = 'ngTokenPath',
  Fh = /\n/gm,
  Rh = '\u0275',
  yu = '__source',
  Tt;
function Ph() {
  return Tt;
}
function je(e) {
  let t = Tt;
  return (Tt = e), t;
}
function kh(e, t = x.Default) {
  if (Tt === void 0) throw new _(-203, !1);
  return Tt === null
    ? gc(e, void 0, t)
    : Tt.get(e, t & x.Optional ? null : void 0, t);
}
function U(e, t = x.Default) {
  return (pc() || kh)(W(e), t);
}
function C(e, t = x.Default) {
  return U(e, eo(t));
}
function eo(e) {
  return typeof e > 'u' || typeof e == 'number'
    ? e
    : 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4);
}
function ui(e) {
  let t = [];
  for (let n = 0; n < e.length; n++) {
    let r = W(e[n]);
    if (Array.isArray(r)) {
      if (r.length === 0) throw new _(900, !1);
      let o,
        i = x.Default;
      for (let s = 0; s < r.length; s++) {
        let a = r[s],
          u = Lh(a);
        typeof u == 'number' ? (u === -1 ? (o = a.token) : (i |= u)) : (o = a);
      }
      t.push(U(o, i));
    } else t.push(U(r));
  }
  return t;
}
function mc(e, t) {
  return (e[ai] = t), (e.prototype[ai] = t), e;
}
function Lh(e) {
  return e[ai];
}
function jh(e, t, n, r) {
  let o = e[br];
  throw (
    (t[yu] && o.unshift(t[yu]),
    (e.message = Vh(
      `
` + e.message,
      o,
      n,
      r
    )),
    (e[Oh] = o),
    (e[br] = null),
    e)
  );
}
function Vh(e, t, n, r = null) {
  e =
    e &&
    e.charAt(0) ===
      `
` &&
    e.charAt(1) == Rh
      ? e.slice(2)
      : e;
  let o = X(t);
  if (Array.isArray(t)) o = t.map(X).join(' -> ');
  else if (typeof t == 'object') {
    let i = [];
    for (let s in t)
      if (t.hasOwnProperty(s)) {
        let a = t[s];
        i.push(s + ':' + (typeof a == 'string' ? JSON.stringify(a) : X(a)));
      }
    o = `{${i.join(', ')}}`;
  }
  return `${n}${r ? '(' + r + ')' : ''}[${o}]: ${e.replace(
    Fh,
    `
  `
  )}`;
}
var Bh = mc(ac('Optional'), 8);
var $h = mc(ac('SkipSelf'), 4);
function it(e, t) {
  let n = e.hasOwnProperty(Cr);
  return n ? e[Cr] : null;
}
function Hh(e, t, n) {
  if (e.length !== t.length) return !1;
  for (let r = 0; r < e.length; r++) {
    let o = e[r],
      i = t[r];
    if ((n && ((o = n(o)), (i = n(i))), i !== o)) return !1;
  }
  return !0;
}
function Uh(e) {
  return e.flat(Number.POSITIVE_INFINITY);
}
function vs(e, t) {
  e.forEach((n) => (Array.isArray(n) ? vs(n, t) : t(n)));
}
function yc(e, t, n) {
  t >= e.length ? e.push(n) : e.splice(t, 0, n);
}
function _r(e, t) {
  return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
}
function zh(e, t) {
  let n = [];
  for (let r = 0; r < e; r++) n.push(t);
  return n;
}
function Gh(e, t, n, r) {
  let o = e.length;
  if (o == t) e.push(n, r);
  else if (o === 1) e.push(r, e[0]), (e[0] = n);
  else {
    for (o--, e.push(e[o - 1], e[o]); o > t; ) {
      let i = o - 2;
      (e[o] = e[i]), o--;
    }
    (e[t] = n), (e[t + 1] = r);
  }
}
function to(e, t, n) {
  let r = Dn(e, t);
  return r >= 0 ? (e[r | 1] = n) : ((r = ~r), Gh(e, r, t, n)), r;
}
function Wo(e, t) {
  let n = Dn(e, t);
  if (n >= 0) return e[n | 1];
}
function Dn(e, t) {
  return Wh(e, t, 1);
}
function Wh(e, t, n) {
  let r = 0,
    o = e.length >> n;
  for (; o !== r; ) {
    let i = r + ((o - r) >> 1),
      s = e[i << n];
    if (t === s) return i << n;
    s > t ? (o = i) : (r = i + 1);
  }
  return ~(o << n);
}
var Ot = {},
  q = [],
  Mr = new N(''),
  vc = new N('', -1),
  Dc = new N(''),
  xr = class {
    get(t, n = cn) {
      if (n === cn) {
        let r = new Error(`NullInjectorError: No provider for ${X(t)}!`);
        throw ((r.name = 'NullInjectorError'), r);
      }
      return n;
    }
  },
  Ic = (function (e) {
    return (e[(e.OnPush = 0)] = 'OnPush'), (e[(e.Default = 1)] = 'Default'), e;
  })(Ic || {}),
  ln = (function (e) {
    return (
      (e[(e.Emulated = 0)] = 'Emulated'),
      (e[(e.None = 2)] = 'None'),
      (e[(e.ShadowDom = 3)] = 'ShadowDom'),
      e
    );
  })(ln || {}),
  $e = (function (e) {
    return (
      (e[(e.None = 0)] = 'None'),
      (e[(e.SignalBased = 1)] = 'SignalBased'),
      (e[(e.HasDecoratorInputTransform = 2)] = 'HasDecoratorInputTransform'),
      e
    );
  })($e || {});
function qh(e, t, n) {
  let r = e.length;
  for (;;) {
    let o = e.indexOf(t, n);
    if (o === -1) return o;
    if (o === 0 || e.charCodeAt(o - 1) <= 32) {
      let i = t.length;
      if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
    }
    n = o + 1;
  }
}
function ci(e, t, n) {
  let r = 0;
  for (; r < n.length; ) {
    let o = n[r];
    if (typeof o == 'number') {
      if (o !== 0) break;
      r++;
      let i = n[r++],
        s = n[r++],
        a = n[r++];
      e.setAttribute(t, s, a, i);
    } else {
      let i = o,
        s = n[++r];
      Zh(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
    }
  }
  return r;
}
function Ec(e) {
  return e === 3 || e === 4 || e === 6;
}
function Zh(e) {
  return e.charCodeAt(0) === 64;
}
function dn(e, t) {
  if (!(t === null || t.length === 0))
    if (e === null || e.length === 0) e = t.slice();
    else {
      let n = -1;
      for (let r = 0; r < t.length; r++) {
        let o = t[r];
        typeof o == 'number'
          ? (n = o)
          : n === 0 ||
            (n === -1 || n === 2
              ? vu(e, n, o, null, t[++r])
              : vu(e, n, o, null, null));
      }
    }
  return e;
}
function vu(e, t, n, r, o) {
  let i = 0,
    s = e.length;
  if (t === -1) s = -1;
  else
    for (; i < e.length; ) {
      let a = e[i++];
      if (typeof a == 'number') {
        if (a === t) {
          s = -1;
          break;
        } else if (a > t) {
          s = i - 1;
          break;
        }
      }
    }
  for (; i < e.length; ) {
    let a = e[i];
    if (typeof a == 'number') break;
    if (a === n) {
      if (r === null) {
        o !== null && (e[i + 1] = o);
        return;
      } else if (r === e[i + 1]) {
        e[i + 2] = o;
        return;
      }
    }
    i++, r !== null && i++, o !== null && i++;
  }
  s !== -1 && (e.splice(s, 0, t), (i = s + 1)),
    e.splice(i++, 0, n),
    r !== null && e.splice(i++, 0, r),
    o !== null && e.splice(i++, 0, o);
}
var wc = 'ng-template';
function Yh(e, t, n, r) {
  let o = 0;
  if (r) {
    for (; o < t.length && typeof t[o] == 'string'; o += 2)
      if (t[o] === 'class' && qh(t[o + 1].toLowerCase(), n, 0) !== -1)
        return !0;
  } else if (Ds(e)) return !1;
  if (((o = t.indexOf(1, o)), o > -1)) {
    let i;
    for (; ++o < t.length && typeof (i = t[o]) == 'string'; )
      if (i.toLowerCase() === n) return !0;
  }
  return !1;
}
function Ds(e) {
  return e.type === 4 && e.value !== wc;
}
function Qh(e, t, n) {
  let r = e.type === 4 && !n ? wc : e.value;
  return t === r;
}
function Kh(e, t, n) {
  let r = 4,
    o = e.attrs,
    i = o !== null ? ep(o) : 0,
    s = !1;
  for (let a = 0; a < t.length; a++) {
    let u = t[a];
    if (typeof u == 'number') {
      if (!s && !le(r) && !le(u)) return !1;
      if (s && le(u)) continue;
      (s = !1), (r = u | (r & 1));
      continue;
    }
    if (!s)
      if (r & 4) {
        if (
          ((r = 2 | (r & 1)),
          (u !== '' && !Qh(e, u, n)) || (u === '' && t.length === 1))
        ) {
          if (le(r)) return !1;
          s = !0;
        }
      } else if (r & 8) {
        if (o === null || !Yh(e, o, u, n)) {
          if (le(r)) return !1;
          s = !0;
        }
      } else {
        let c = t[++a],
          l = Jh(u, o, Ds(e), n);
        if (l === -1) {
          if (le(r)) return !1;
          s = !0;
          continue;
        }
        if (c !== '') {
          let d;
          if (
            (l > i ? (d = '') : (d = o[l + 1].toLowerCase()), r & 2 && c !== d)
          ) {
            if (le(r)) return !1;
            s = !0;
          }
        }
      }
  }
  return le(r) || s;
}
function le(e) {
  return (e & 1) === 0;
}
function Jh(e, t, n, r) {
  if (t === null) return -1;
  let o = 0;
  if (r || !n) {
    let i = !1;
    for (; o < t.length; ) {
      let s = t[o];
      if (s === e) return o;
      if (s === 3 || s === 6) i = !0;
      else if (s === 1 || s === 2) {
        let a = t[++o];
        for (; typeof a == 'string'; ) a = t[++o];
        continue;
      } else {
        if (s === 4) break;
        if (s === 0) {
          o += 4;
          continue;
        }
      }
      o += i ? 1 : 2;
    }
    return -1;
  } else return tp(t, e);
}
function Cc(e, t, n = !1) {
  for (let r = 0; r < t.length; r++) if (Kh(e, t[r], n)) return !0;
  return !1;
}
function Xh(e) {
  let t = e.attrs;
  if (t != null) {
    let n = t.indexOf(5);
    if (!(n & 1)) return t[n + 1];
  }
  return null;
}
function ep(e) {
  for (let t = 0; t < e.length; t++) {
    let n = e[t];
    if (Ec(n)) return t;
  }
  return e.length;
}
function tp(e, t) {
  let n = e.indexOf(4);
  if (n > -1)
    for (n++; n < e.length; ) {
      let r = e[n];
      if (typeof r == 'number') return -1;
      if (r === t) return n;
      n++;
    }
  return -1;
}
function np(e, t) {
  e: for (let n = 0; n < t.length; n++) {
    let r = t[n];
    if (e.length === r.length) {
      for (let o = 0; o < e.length; o++) if (e[o] !== r[o]) continue e;
      return !0;
    }
  }
  return !1;
}
function Du(e, t) {
  return e ? ':not(' + t.trim() + ')' : t;
}
function rp(e) {
  let t = e[0],
    n = 1,
    r = 2,
    o = '',
    i = !1;
  for (; n < e.length; ) {
    let s = e[n];
    if (typeof s == 'string')
      if (r & 2) {
        let a = e[++n];
        o += '[' + s + (a.length > 0 ? '="' + a + '"' : '') + ']';
      } else r & 8 ? (o += '.' + s) : r & 4 && (o += ' ' + s);
    else
      o !== '' && !le(s) && ((t += Du(i, o)), (o = '')),
        (r = s),
        (i = i || !le(r));
    n++;
  }
  return o !== '' && (t += Du(i, o)), t;
}
function op(e) {
  return e.map(rp).join(',');
}
function ip(e) {
  let t = [],
    n = [],
    r = 1,
    o = 2;
  for (; r < e.length; ) {
    let i = e[r];
    if (typeof i == 'string')
      o === 2 ? i !== '' && t.push(i, e[++r]) : o === 8 && n.push(i);
    else {
      if (!le(o)) break;
      o = i;
    }
    r++;
  }
  return { attrs: t, classes: n };
}
function x0(e) {
  return vn(() => {
    let t = Tc(e),
      n = ge(pe({}, t), {
        decls: e.decls,
        vars: e.vars,
        template: e.template,
        consts: e.consts || null,
        ngContentSelectors: e.ngContentSelectors,
        onPush: e.changeDetection === Ic.OnPush,
        directiveDefs: null,
        pipeDefs: null,
        dependencies: (t.standalone && e.dependencies) || null,
        getStandaloneInjector: null,
        signals: e.signals ?? !1,
        data: e.data || {},
        encapsulation: e.encapsulation || ln.Emulated,
        styles: e.styles || q,
        _: null,
        schemas: e.schemas || null,
        tView: null,
        id: '',
      });
    Nc(n);
    let r = e.dependencies;
    return (
      (n.directiveDefs = Eu(r, !1)), (n.pipeDefs = Eu(r, !0)), (n.id = cp(n)), n
    );
  });
}
function sp(e) {
  return He(e) || Mc(e);
}
function ap(e) {
  return e !== null;
}
function bc(e) {
  return vn(() => ({
    type: e.type,
    bootstrap: e.bootstrap || q,
    declarations: e.declarations || q,
    imports: e.imports || q,
    exports: e.exports || q,
    transitiveCompileScopes: null,
    schemas: e.schemas || null,
    id: e.id || null,
  }));
}
function Iu(e, t) {
  if (e == null) return Ot;
  let n = {};
  for (let r in e)
    if (e.hasOwnProperty(r)) {
      let o = e[r],
        i,
        s,
        a = $e.None;
      Array.isArray(o)
        ? ((a = o[0]), (i = o[1]), (s = o[2] ?? i))
        : ((i = o), (s = o)),
        t ? ((n[i] = a !== $e.None ? [r, a] : r), (t[i] = s)) : (n[i] = r);
    }
  return n;
}
function Is(e) {
  return vn(() => {
    let t = Tc(e);
    return Nc(t), t;
  });
}
function _c(e) {
  return {
    type: e.type,
    name: e.name,
    factory: null,
    pure: e.pure !== !1,
    standalone: e.standalone === !0,
    onDestroy: e.type.prototype.ngOnDestroy || null,
  };
}
function He(e) {
  return e[_h] || null;
}
function Mc(e) {
  return e[Mh] || null;
}
function xc(e) {
  return e[xh] || null;
}
function up(e) {
  let t = He(e) || Mc(e) || xc(e);
  return t !== null ? t.standalone : !1;
}
function Sc(e, t) {
  let n = e[Sh] || null;
  if (!n && t === !0)
    throw new Error(`Type ${X(e)} does not have '\u0275mod' property.`);
  return n;
}
function Tc(e) {
  let t = {};
  return {
    type: e.type,
    providersResolver: null,
    factory: null,
    hostBindings: e.hostBindings || null,
    hostVars: e.hostVars || 0,
    hostAttrs: e.hostAttrs || null,
    contentQueries: e.contentQueries || null,
    declaredInputs: t,
    inputTransforms: null,
    inputConfig: e.inputs || Ot,
    exportAs: e.exportAs || null,
    standalone: e.standalone === !0,
    signals: e.signals === !0,
    selectors: e.selectors || q,
    viewQuery: e.viewQuery || null,
    features: e.features || null,
    setInput: null,
    findHostDirectiveDefs: null,
    hostDirectives: null,
    inputs: Iu(e.inputs, t),
    outputs: Iu(e.outputs),
    debugInfo: null,
  };
}
function Nc(e) {
  e.features?.forEach((t) => t(e));
}
function Eu(e, t) {
  if (!e) return null;
  let n = t ? xc : sp;
  return () => (typeof e == 'function' ? e() : e).map((r) => n(r)).filter(ap);
}
function cp(e) {
  let t = 0,
    n = [
      e.selectors,
      e.ngContentSelectors,
      e.hostVars,
      e.hostAttrs,
      e.consts,
      e.vars,
      e.decls,
      e.encapsulation,
      e.standalone,
      e.signals,
      e.exportAs,
      JSON.stringify(e.inputs),
      JSON.stringify(e.outputs),
      Object.getOwnPropertyNames(e.type.prototype),
      !!e.contentQueries,
      !!e.viewQuery,
    ].join('|');
  for (let o of n) t = (Math.imul(31, t) + o.charCodeAt(0)) << 0;
  return (t += 2147483648), 'c' + t;
}
function lp(e) {
  return { ɵproviders: e };
}
function dp(...e) {
  return { ɵproviders: Ac(!0, e), ɵfromNgModule: !0 };
}
function Ac(e, ...t) {
  let n = [],
    r = new Set(),
    o,
    i = (s) => {
      n.push(s);
    };
  return (
    vs(t, (s) => {
      let a = s;
      li(a, i, [], r) && ((o ||= []), o.push(a));
    }),
    o !== void 0 && Oc(o, i),
    n
  );
}
function Oc(e, t) {
  for (let n = 0; n < e.length; n++) {
    let { ngModule: r, providers: o } = e[n];
    Es(o, (i) => {
      t(i, r);
    });
  }
}
function li(e, t, n, r) {
  if (((e = W(e)), !e)) return !1;
  let o = null,
    i = pu(e),
    s = !i && He(e);
  if (!i && !s) {
    let u = e.ngModule;
    if (((i = pu(u)), i)) o = u;
    else return !1;
  } else {
    if (s && !s.standalone) return !1;
    o = e;
  }
  let a = r.has(o);
  if (s) {
    if (a) return !1;
    if ((r.add(o), s.dependencies)) {
      let u =
        typeof s.dependencies == 'function' ? s.dependencies() : s.dependencies;
      for (let c of u) li(c, t, n, r);
    }
  } else if (i) {
    if (i.imports != null && !a) {
      r.add(o);
      let c;
      try {
        vs(i.imports, (l) => {
          li(l, t, n, r) && ((c ||= []), c.push(l));
        });
      } finally {
      }
      c !== void 0 && Oc(c, t);
    }
    if (!a) {
      let c = it(o) || (() => new o());
      t({ provide: o, useFactory: c, deps: q }, o),
        t({ provide: Dc, useValue: o, multi: !0 }, o),
        t({ provide: Mr, useValue: () => U(o), multi: !0 }, o);
    }
    let u = i.providers;
    if (u != null && !a) {
      let c = e;
      Es(u, (l) => {
        t(l, c);
      });
    }
  } else return !1;
  return o !== e && e.providers !== void 0;
}
function Es(e, t) {
  for (let n of e)
    hc(n) && (n = n.ɵproviders), Array.isArray(n) ? Es(n, t) : t(n);
}
var fp = O({ provide: String, useValue: O });
function Fc(e) {
  return e !== null && typeof e == 'object' && fp in e;
}
function hp(e) {
  return !!(e && e.useExisting);
}
function pp(e) {
  return !!(e && e.useFactory);
}
function Ft(e) {
  return typeof e == 'function';
}
function gp(e) {
  return !!e.useClass;
}
var Rc = new N(''),
  gr = {},
  mp = {},
  qo;
function ws() {
  return qo === void 0 && (qo = new xr()), qo;
}
var Ue = class {},
  fn = class extends Ue {
    get destroyed() {
      return this._destroyed;
    }
    constructor(t, n, r, o) {
      super(),
        (this.parent = n),
        (this.source = r),
        (this.scopes = o),
        (this.records = new Map()),
        (this._ngOnDestroyHooks = new Set()),
        (this._onDestroyHooks = []),
        (this._destroyed = !1),
        fi(t, (s) => this.processProvider(s)),
        this.records.set(vc, Mt(void 0, this)),
        o.has('environment') && this.records.set(Ue, Mt(void 0, this));
      let i = this.records.get(Rc);
      i != null && typeof i.value == 'string' && this.scopes.add(i.value),
        (this.injectorDefTypes = new Set(this.get(Dc, q, x.Self)));
    }
    destroy() {
      this.assertNotDestroyed(), (this._destroyed = !0);
      let t = b(null);
      try {
        for (let r of this._ngOnDestroyHooks) r.ngOnDestroy();
        let n = this._onDestroyHooks;
        this._onDestroyHooks = [];
        for (let r of n) r();
      } finally {
        this.records.clear(),
          this._ngOnDestroyHooks.clear(),
          this.injectorDefTypes.clear(),
          b(t);
      }
    }
    onDestroy(t) {
      return (
        this.assertNotDestroyed(),
        this._onDestroyHooks.push(t),
        () => this.removeOnDestroy(t)
      );
    }
    runInContext(t) {
      this.assertNotDestroyed();
      let n = je(this),
        r = J(void 0),
        o;
      try {
        return t();
      } finally {
        je(n), J(r);
      }
    }
    get(t, n = cn, r = x.Default) {
      if ((this.assertNotDestroyed(), t.hasOwnProperty(mu))) return t[mu](this);
      r = eo(r);
      let o,
        i = je(this),
        s = J(void 0);
      try {
        if (!(r & x.SkipSelf)) {
          let u = this.records.get(t);
          if (u === void 0) {
            let c = Ep(t) && Xr(t);
            c && this.injectableDefInScope(c)
              ? (u = Mt(di(t), gr))
              : (u = null),
              this.records.set(t, u);
          }
          if (u != null) return this.hydrate(t, u);
        }
        let a = r & x.Self ? ws() : this.parent;
        return (n = r & x.Optional && n === cn ? null : n), a.get(t, n);
      } catch (a) {
        if (a.name === 'NullInjectorError') {
          if (((a[br] = a[br] || []).unshift(X(t)), i)) throw a;
          return jh(a, t, 'R3InjectorError', this.source);
        } else throw a;
      } finally {
        J(s), je(i);
      }
    }
    resolveInjectorInitializers() {
      let t = b(null),
        n = je(this),
        r = J(void 0),
        o;
      try {
        let i = this.get(Mr, q, x.Self);
        for (let s of i) s();
      } finally {
        je(n), J(r), b(t);
      }
    }
    toString() {
      let t = [],
        n = this.records;
      for (let r of n.keys()) t.push(X(r));
      return `R3Injector[${t.join(', ')}]`;
    }
    assertNotDestroyed() {
      if (this._destroyed) throw new _(205, !1);
    }
    processProvider(t) {
      t = W(t);
      let n = Ft(t) ? t : W(t && t.provide),
        r = vp(t);
      if (!Ft(t) && t.multi === !0) {
        let o = this.records.get(n);
        o ||
          ((o = Mt(void 0, gr, !0)),
          (o.factory = () => ui(o.multi)),
          this.records.set(n, o)),
          (n = t),
          o.multi.push(t);
      }
      this.records.set(n, r);
    }
    hydrate(t, n) {
      let r = b(null);
      try {
        return (
          n.value === gr && ((n.value = mp), (n.value = n.factory())),
          typeof n.value == 'object' &&
            n.value &&
            Ip(n.value) &&
            this._ngOnDestroyHooks.add(n.value),
          n.value
        );
      } finally {
        b(r);
      }
    }
    injectableDefInScope(t) {
      if (!t.providedIn) return !1;
      let n = W(t.providedIn);
      return typeof n == 'string'
        ? n === 'any' || this.scopes.has(n)
        : this.injectorDefTypes.has(n);
    }
    removeOnDestroy(t) {
      let n = this._onDestroyHooks.indexOf(t);
      n !== -1 && this._onDestroyHooks.splice(n, 1);
    }
  };
function di(e) {
  let t = Xr(e),
    n = t !== null ? t.factory : it(e);
  if (n !== null) return n;
  if (e instanceof N) throw new _(204, !1);
  if (e instanceof Function) return yp(e);
  throw new _(204, !1);
}
function yp(e) {
  if (e.length > 0) throw new _(204, !1);
  let n = Ch(e);
  return n !== null ? () => n.factory(e) : () => new e();
}
function vp(e) {
  if (Fc(e)) return Mt(void 0, e.useValue);
  {
    let t = Pc(e);
    return Mt(t, gr);
  }
}
function Pc(e, t, n) {
  let r;
  if (Ft(e)) {
    let o = W(e);
    return it(o) || di(o);
  } else if (Fc(e)) r = () => W(e.useValue);
  else if (pp(e)) r = () => e.useFactory(...ui(e.deps || []));
  else if (hp(e)) r = () => U(W(e.useExisting));
  else {
    let o = W(e && (e.useClass || e.provide));
    if (Dp(e)) r = () => new o(...ui(e.deps));
    else return it(o) || di(o);
  }
  return r;
}
function Mt(e, t, n = !1) {
  return { factory: e, value: t, multi: n ? [] : void 0 };
}
function Dp(e) {
  return !!e.deps;
}
function Ip(e) {
  return (
    e !== null && typeof e == 'object' && typeof e.ngOnDestroy == 'function'
  );
}
function Ep(e) {
  return typeof e == 'function' || (typeof e == 'object' && e instanceof N);
}
function fi(e, t) {
  for (let n of e)
    Array.isArray(n) ? fi(n, t) : n && hc(n) ? fi(n.ɵproviders, t) : t(n);
}
function wp(e, t) {
  e instanceof fn && e.assertNotDestroyed();
  let n,
    r = je(e),
    o = J(void 0);
  try {
    return t();
  } finally {
    je(r), J(o);
  }
}
function kc() {
  return pc() !== void 0 || Ph() != null;
}
function Cs(e) {
  if (!kc()) throw new _(-203, !1);
}
function Cp(e) {
  return typeof e == 'function';
}
var we = 0,
  E = 1,
  y = 2,
  z = 3,
  he = 4,
  te = 5,
  Rt = 6,
  Sr = 7,
  $ = 8,
  Pt = 9,
  Ie = 10,
  R = 11,
  hn = 12,
  wu = 13,
  Ut = 14,
  ne = 15,
  st = 16,
  xt = 17,
  Se = 18,
  no = 19,
  Lc = 20,
  Ve = 21,
  mr = 22,
  se = 23,
  B = 25,
  bs = 1;
var at = 7,
  Tr = 8,
  kt = 9,
  H = 10,
  Nr = (function (e) {
    return (
      (e[(e.None = 0)] = 'None'),
      (e[(e.HasTransplantedViews = 2)] = 'HasTransplantedViews'),
      e
    );
  })(Nr || {});
function Be(e) {
  return Array.isArray(e) && typeof e[bs] == 'object';
}
function Oe(e) {
  return Array.isArray(e) && e[bs] === !0;
}
function _s(e) {
  return (e.flags & 4) !== 0;
}
function ro(e) {
  return e.componentOffset > -1;
}
function oo(e) {
  return (e.flags & 1) === 1;
}
function Te(e) {
  return !!e.template;
}
function hi(e) {
  return (e[y] & 512) !== 0;
}
var pi = class {
  constructor(t, n, r) {
    (this.previousValue = t), (this.currentValue = n), (this.firstChange = r);
  }
  isFirstChange() {
    return this.firstChange;
  }
};
function jc(e, t, n, r) {
  t !== null ? t.applyValueToInputSignal(t, r) : (e[n] = r);
}
function Ms() {
  return Vc;
}
function Vc(e) {
  return e.type.prototype.ngOnChanges && (e.setInput = _p), bp;
}
Ms.ngInherit = !0;
function bp() {
  let e = $c(this),
    t = e?.current;
  if (t) {
    let n = e.previous;
    if (n === Ot) e.previous = t;
    else for (let r in t) n[r] = t[r];
    (e.current = null), this.ngOnChanges(t);
  }
}
function _p(e, t, n, r, o) {
  let i = this.declaredInputs[r],
    s = $c(e) || Mp(e, { previous: Ot, current: null }),
    a = s.current || (s.current = {}),
    u = s.previous,
    c = u[i];
  (a[i] = new pi(c && c.currentValue, n, u === Ot)), jc(e, t, o, n);
}
var Bc = '__ngSimpleChanges__';
function $c(e) {
  return e[Bc] || null;
}
function Mp(e, t) {
  return (e[Bc] = t);
}
var Cu = null;
var ve = function (e, t, n) {
    Cu?.(e, t, n);
  },
  Hc = 'svg',
  xp = 'math';
function Ee(e) {
  for (; Array.isArray(e); ) e = e[we];
  return e;
}
function Sp(e) {
  for (; Array.isArray(e); ) {
    if (typeof e[bs] == 'object') return e;
    e = e[we];
  }
  return null;
}
function Uc(e, t) {
  return Ee(t[e]);
}
function ae(e, t) {
  return Ee(t[e.index]);
}
function xs(e, t) {
  return e.data[t];
}
function zc(e, t) {
  return e[t];
}
function Ze(e, t) {
  let n = t[e];
  return Be(n) ? n : n[we];
}
function Tp(e) {
  return (e[y] & 4) === 4;
}
function Ss(e) {
  return (e[y] & 128) === 128;
}
function Np(e) {
  return Oe(e[z]);
}
function ze(e, t) {
  return t == null ? null : e[t];
}
function Gc(e) {
  e[xt] = 0;
}
function Wc(e) {
  e[y] & 1024 || ((e[y] |= 1024), Ss(e) && io(e));
}
function Ap(e, t) {
  for (; e > 0; ) (t = t[Ut]), e--;
  return t;
}
function pn(e) {
  return !!(e[y] & 9216 || e[se]?.dirty);
}
function gi(e) {
  e[Ie].changeDetectionScheduler?.notify(7),
    e[y] & 64 && (e[y] |= 1024),
    pn(e) && io(e);
}
function io(e) {
  e[Ie].changeDetectionScheduler?.notify(0);
  let t = ut(e);
  for (; t !== null && !(t[y] & 8192 || ((t[y] |= 8192), !Ss(t))); ) t = ut(t);
}
function qc(e, t) {
  if ((e[y] & 256) === 256) throw new _(911, !1);
  e[Ve] === null && (e[Ve] = []), e[Ve].push(t);
}
function Op(e, t) {
  if (e[Ve] === null) return;
  let n = e[Ve].indexOf(t);
  n !== -1 && e[Ve].splice(n, 1);
}
function ut(e) {
  let t = e[z];
  return Oe(t) ? t[z] : t;
}
var w = { lFrame: tl(null), bindingsEnabled: !0, skipHydrationRootTNode: null };
var Zc = !1;
function Fp() {
  return w.lFrame.elementDepthCount;
}
function Rp() {
  w.lFrame.elementDepthCount++;
}
function Pp() {
  w.lFrame.elementDepthCount--;
}
function Yc() {
  return w.bindingsEnabled;
}
function Qc() {
  return w.skipHydrationRootTNode !== null;
}
function kp(e) {
  return w.skipHydrationRootTNode === e;
}
function Lp() {
  w.skipHydrationRootTNode = null;
}
function D() {
  return w.lFrame.lView;
}
function F() {
  return w.lFrame.tView;
}
function S0(e) {
  return (w.lFrame.contextLView = e), e[$];
}
function T0(e) {
  return (w.lFrame.contextLView = null), e;
}
function V() {
  let e = Kc();
  for (; e !== null && e.type === 64; ) e = e.parent;
  return e;
}
function Kc() {
  return w.lFrame.currentTNode;
}
function jp() {
  let e = w.lFrame,
    t = e.currentTNode;
  return e.isParent ? t : t.parent;
}
function pt(e, t) {
  let n = w.lFrame;
  (n.currentTNode = e), (n.isParent = t);
}
function Ts() {
  return w.lFrame.isParent;
}
function Ns() {
  w.lFrame.isParent = !1;
}
function Vp() {
  return w.lFrame.contextLView;
}
function Jc() {
  return Zc;
}
function bu(e) {
  Zc = e;
}
function Bp() {
  let e = w.lFrame,
    t = e.bindingRootIndex;
  return t === -1 && (t = e.bindingRootIndex = e.tView.bindingStartIndex), t;
}
function $p() {
  return w.lFrame.bindingIndex;
}
function Hp(e) {
  return (w.lFrame.bindingIndex = e);
}
function Ye() {
  return w.lFrame.bindingIndex++;
}
function As(e) {
  let t = w.lFrame,
    n = t.bindingIndex;
  return (t.bindingIndex = t.bindingIndex + e), n;
}
function Up() {
  return w.lFrame.inI18n;
}
function zp(e, t) {
  let n = w.lFrame;
  (n.bindingIndex = n.bindingRootIndex = e), mi(t);
}
function Gp() {
  return w.lFrame.currentDirectiveIndex;
}
function mi(e) {
  w.lFrame.currentDirectiveIndex = e;
}
function Os(e) {
  let t = w.lFrame.currentDirectiveIndex;
  return t === -1 ? null : e[t];
}
function Fs() {
  return w.lFrame.currentQueryIndex;
}
function so(e) {
  w.lFrame.currentQueryIndex = e;
}
function Wp(e) {
  let t = e[E];
  return t.type === 2 ? t.declTNode : t.type === 1 ? e[te] : null;
}
function Xc(e, t, n) {
  if (n & x.SkipSelf) {
    let o = t,
      i = e;
    for (; (o = o.parent), o === null && !(n & x.Host); )
      if (((o = Wp(i)), o === null || ((i = i[Ut]), o.type & 10))) break;
    if (o === null) return !1;
    (t = o), (e = i);
  }
  let r = (w.lFrame = el());
  return (r.currentTNode = t), (r.lView = e), !0;
}
function Rs(e) {
  let t = el(),
    n = e[E];
  (w.lFrame = t),
    (t.currentTNode = n.firstChild),
    (t.lView = e),
    (t.tView = n),
    (t.contextLView = e),
    (t.bindingIndex = n.bindingStartIndex),
    (t.inI18n = !1);
}
function el() {
  let e = w.lFrame,
    t = e === null ? null : e.child;
  return t === null ? tl(e) : t;
}
function tl(e) {
  let t = {
    currentTNode: null,
    isParent: !0,
    lView: null,
    tView: null,
    selectedIndex: -1,
    contextLView: null,
    elementDepthCount: 0,
    currentNamespace: null,
    currentDirectiveIndex: -1,
    bindingRootIndex: -1,
    bindingIndex: -1,
    currentQueryIndex: 0,
    parent: e,
    child: null,
    inI18n: !1,
  };
  return e !== null && (e.child = t), t;
}
function nl() {
  let e = w.lFrame;
  return (w.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e;
}
var rl = nl;
function Ps() {
  let e = nl();
  (e.isParent = !0),
    (e.tView = null),
    (e.selectedIndex = -1),
    (e.contextLView = null),
    (e.elementDepthCount = 0),
    (e.currentDirectiveIndex = -1),
    (e.currentNamespace = null),
    (e.bindingRootIndex = -1),
    (e.bindingIndex = -1),
    (e.currentQueryIndex = 0);
}
function qp(e) {
  return (w.lFrame.contextLView = Ap(e, w.lFrame.contextLView))[$];
}
function Fe() {
  return w.lFrame.selectedIndex;
}
function ct(e) {
  w.lFrame.selectedIndex = e;
}
function zt() {
  let e = w.lFrame;
  return xs(e.tView, e.selectedIndex);
}
function N0() {
  w.lFrame.currentNamespace = Hc;
}
function A0() {
  Zp();
}
function Zp() {
  w.lFrame.currentNamespace = null;
}
function Yp() {
  return w.lFrame.currentNamespace;
}
var ol = !0;
function ao() {
  return ol;
}
function uo(e) {
  ol = e;
}
function Qp(e, t, n) {
  let { ngOnChanges: r, ngOnInit: o, ngDoCheck: i } = t.type.prototype;
  if (r) {
    let s = Vc(t);
    (n.preOrderHooks ??= []).push(e, s),
      (n.preOrderCheckHooks ??= []).push(e, s);
  }
  o && (n.preOrderHooks ??= []).push(0 - e, o),
    i &&
      ((n.preOrderHooks ??= []).push(e, i),
      (n.preOrderCheckHooks ??= []).push(e, i));
}
function co(e, t) {
  for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
    let i = e.data[n].type.prototype,
      {
        ngAfterContentInit: s,
        ngAfterContentChecked: a,
        ngAfterViewInit: u,
        ngAfterViewChecked: c,
        ngOnDestroy: l,
      } = i;
    s && (e.contentHooks ??= []).push(-n, s),
      a &&
        ((e.contentHooks ??= []).push(n, a),
        (e.contentCheckHooks ??= []).push(n, a)),
      u && (e.viewHooks ??= []).push(-n, u),
      c &&
        ((e.viewHooks ??= []).push(n, c), (e.viewCheckHooks ??= []).push(n, c)),
      l != null && (e.destroyHooks ??= []).push(n, l);
  }
}
function yr(e, t, n) {
  il(e, t, 3, n);
}
function vr(e, t, n, r) {
  (e[y] & 3) === n && il(e, t, n, r);
}
function Zo(e, t) {
  let n = e[y];
  (n & 3) === t && ((n &= 16383), (n += 1), (e[y] = n));
}
function il(e, t, n, r) {
  let o = r !== void 0 ? e[xt] & 65535 : 0,
    i = r ?? -1,
    s = t.length - 1,
    a = 0;
  for (let u = o; u < s; u++)
    if (typeof t[u + 1] == 'number') {
      if (((a = t[u]), r != null && a >= r)) break;
    } else
      t[u] < 0 && (e[xt] += 65536),
        (a < i || i == -1) &&
          (Kp(e, n, t, u), (e[xt] = (e[xt] & 4294901760) + u + 2)),
        u++;
}
function _u(e, t) {
  ve(4, e, t);
  let n = b(null);
  try {
    t.call(e);
  } finally {
    b(n), ve(5, e, t);
  }
}
function Kp(e, t, n, r) {
  let o = n[r] < 0,
    i = n[r + 1],
    s = o ? -n[r] : n[r],
    a = e[s];
  o
    ? e[y] >> 14 < e[xt] >> 16 &&
      (e[y] & 3) === t &&
      ((e[y] += 16384), _u(a, i))
    : _u(a, i);
}
var Nt = -1,
  lt = class {
    constructor(t, n, r) {
      (this.factory = t),
        (this.resolving = !1),
        (this.canSeeViewProviders = n),
        (this.injectImpl = r);
    }
  };
function Jp(e) {
  return e instanceof lt;
}
function Xp(e) {
  return (e.flags & 8) !== 0;
}
function eg(e) {
  return (e.flags & 16) !== 0;
}
var Yo = {},
  yi = class {
    constructor(t, n) {
      (this.injector = t), (this.parentInjector = n);
    }
    get(t, n, r) {
      r = eo(r);
      let o = this.injector.get(t, Yo, r);
      return o !== Yo || n === Yo ? o : this.parentInjector.get(t, n, r);
    }
  };
function sl(e) {
  return e !== Nt;
}
function Ar(e) {
  return e & 32767;
}
function tg(e) {
  return e >> 16;
}
function Or(e, t) {
  let n = tg(e),
    r = t;
  for (; n > 0; ) (r = r[Ut]), n--;
  return r;
}
var vi = !0;
function Fr(e) {
  let t = vi;
  return (vi = e), t;
}
var ng = 256,
  al = ng - 1,
  ul = 5,
  rg = 0,
  De = {};
function og(e, t, n) {
  let r;
  typeof n == 'string'
    ? (r = n.charCodeAt(0) || 0)
    : n.hasOwnProperty(un) && (r = n[un]),
    r == null && (r = n[un] = rg++);
  let o = r & al,
    i = 1 << o;
  t.data[e + (o >> ul)] |= i;
}
function Rr(e, t) {
  let n = cl(e, t);
  if (n !== -1) return n;
  let r = t[E];
  r.firstCreatePass &&
    ((e.injectorIndex = t.length),
    Qo(r.data, e),
    Qo(t, null),
    Qo(r.blueprint, null));
  let o = ks(e, t),
    i = e.injectorIndex;
  if (sl(o)) {
    let s = Ar(o),
      a = Or(o, t),
      u = a[E].data;
    for (let c = 0; c < 8; c++) t[i + c] = a[s + c] | u[s + c];
  }
  return (t[i + 8] = o), i;
}
function Qo(e, t) {
  e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
}
function cl(e, t) {
  return e.injectorIndex === -1 ||
    (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
    t[e.injectorIndex + 8] === null
    ? -1
    : e.injectorIndex;
}
function ks(e, t) {
  if (e.parent && e.parent.injectorIndex !== -1) return e.parent.injectorIndex;
  let n = 0,
    r = null,
    o = t;
  for (; o !== null; ) {
    if (((r = pl(o)), r === null)) return Nt;
    if ((n++, (o = o[Ut]), r.injectorIndex !== -1))
      return r.injectorIndex | (n << 16);
  }
  return Nt;
}
function Di(e, t, n) {
  og(e, t, n);
}
function ig(e, t) {
  if (t === 'class') return e.classes;
  if (t === 'style') return e.styles;
  let n = e.attrs;
  if (n) {
    let r = n.length,
      o = 0;
    for (; o < r; ) {
      let i = n[o];
      if (Ec(i)) break;
      if (i === 0) o = o + 2;
      else if (typeof i == 'number')
        for (o++; o < r && typeof n[o] == 'string'; ) o++;
      else {
        if (i === t) return n[o + 1];
        o = o + 2;
      }
    }
  }
  return null;
}
function ll(e, t, n) {
  if (n & x.Optional || e !== void 0) return e;
  ys(t, 'NodeInjector');
}
function dl(e, t, n, r) {
  if (
    (n & x.Optional && r === void 0 && (r = null), !(n & (x.Self | x.Host)))
  ) {
    let o = e[Pt],
      i = J(void 0);
    try {
      return o ? o.get(t, r, n & x.Optional) : gc(t, r, n & x.Optional);
    } finally {
      J(i);
    }
  }
  return ll(r, t, n);
}
function fl(e, t, n, r = x.Default, o) {
  if (e !== null) {
    if (t[y] & 2048 && !(r & x.Self)) {
      let s = cg(e, t, n, r, De);
      if (s !== De) return s;
    }
    let i = hl(e, t, n, r, De);
    if (i !== De) return i;
  }
  return dl(t, n, r, o);
}
function hl(e, t, n, r, o) {
  let i = ag(n);
  if (typeof i == 'function') {
    if (!Xc(t, e, r)) return r & x.Host ? ll(o, n, r) : dl(t, n, r, o);
    try {
      let s;
      if (((s = i(r)), s == null && !(r & x.Optional))) ys(n);
      else return s;
    } finally {
      rl();
    }
  } else if (typeof i == 'number') {
    let s = null,
      a = cl(e, t),
      u = Nt,
      c = r & x.Host ? t[ne][te] : null;
    for (
      (a === -1 || r & x.SkipSelf) &&
      ((u = a === -1 ? ks(e, t) : t[a + 8]),
      u === Nt || !xu(r, !1)
        ? (a = -1)
        : ((s = t[E]), (a = Ar(u)), (t = Or(u, t))));
      a !== -1;

    ) {
      let l = t[E];
      if (Mu(i, a, l.data)) {
        let d = sg(a, t, n, s, r, c);
        if (d !== De) return d;
      }
      (u = t[a + 8]),
        u !== Nt && xu(r, t[E].data[a + 8] === c) && Mu(i, a, t)
          ? ((s = l), (a = Ar(u)), (t = Or(u, t)))
          : (a = -1);
    }
  }
  return o;
}
function sg(e, t, n, r, o, i) {
  let s = t[E],
    a = s.data[e + 8],
    u = r == null ? ro(a) && vi : r != s && (a.type & 3) !== 0,
    c = o & x.Host && i === a,
    l = Dr(a, s, n, u, c);
  return l !== null ? dt(t, s, l, a) : De;
}
function Dr(e, t, n, r, o) {
  let i = e.providerIndexes,
    s = t.data,
    a = i & 1048575,
    u = e.directiveStart,
    c = e.directiveEnd,
    l = i >> 20,
    d = r ? a : a + l,
    h = o ? a + l : c;
  for (let f = d; f < h; f++) {
    let p = s[f];
    if ((f < u && n === p) || (f >= u && p.type === n)) return f;
  }
  if (o) {
    let f = s[u];
    if (f && Te(f) && f.type === n) return u;
  }
  return null;
}
function dt(e, t, n, r) {
  let o = e[n],
    i = t.data;
  if (Jp(o)) {
    let s = o;
    s.resolving && Nh(Th(i[n]));
    let a = Fr(s.canSeeViewProviders);
    s.resolving = !0;
    let u,
      c = s.injectImpl ? J(s.injectImpl) : null,
      l = Xc(e, r, x.Default);
    try {
      (o = e[n] = s.factory(void 0, i, e, r)),
        t.firstCreatePass && n >= r.directiveStart && Qp(n, i[n], t);
    } finally {
      c !== null && J(c), Fr(a), (s.resolving = !1), rl();
    }
  }
  return o;
}
function ag(e) {
  if (typeof e == 'string') return e.charCodeAt(0) || 0;
  let t = e.hasOwnProperty(un) ? e[un] : void 0;
  return typeof t == 'number' ? (t >= 0 ? t & al : ug) : t;
}
function Mu(e, t, n) {
  let r = 1 << e;
  return !!(n[t + (e >> ul)] & r);
}
function xu(e, t) {
  return !(e & x.Self) && !(e & x.Host && t);
}
var ot = class {
  constructor(t, n) {
    (this._tNode = t), (this._lView = n);
  }
  get(t, n, r) {
    return fl(this._tNode, this._lView, t, eo(r), n);
  }
};
function ug() {
  return new ot(V(), D());
}
function O0(e) {
  return vn(() => {
    let t = e.prototype.constructor,
      n = t[Cr] || Ii(t),
      r = Object.prototype,
      o = Object.getPrototypeOf(e.prototype).constructor;
    for (; o && o !== r; ) {
      let i = o[Cr] || Ii(o);
      if (i && i !== n) return i;
      o = Object.getPrototypeOf(o);
    }
    return (i) => new i();
  });
}
function Ii(e) {
  return cc(e)
    ? () => {
        let t = Ii(W(e));
        return t && t();
      }
    : it(e);
}
function cg(e, t, n, r, o) {
  let i = e,
    s = t;
  for (; i !== null && s !== null && s[y] & 2048 && !(s[y] & 512); ) {
    let a = hl(i, s, n, r | x.Self, De);
    if (a !== De) return a;
    let u = i.parent;
    if (!u) {
      let c = s[Lc];
      if (c) {
        let l = c.get(n, De, r);
        if (l !== De) return l;
      }
      (u = pl(s)), (s = s[Ut]);
    }
    i = u;
  }
  return o;
}
function pl(e) {
  let t = e[E],
    n = t.type;
  return n === 2 ? t.declTNode : n === 1 ? e[te] : null;
}
function lg(e) {
  return ig(V(), e);
}
function Su(e, t = null, n = null, r) {
  let o = gl(e, t, n, r);
  return o.resolveInjectorInitializers(), o;
}
function gl(e, t = null, n = null, r, o = new Set()) {
  let i = [n || q, dp(e)];
  return (
    (r = r || (typeof e == 'object' ? void 0 : X(e))),
    new fn(i, t || ws(), r || null, o)
  );
}
var rt = class rt {
  static create(t, n) {
    if (Array.isArray(t)) return Su({ name: '' }, n, t, '');
    {
      let r = t.name ?? '';
      return Su({ name: r }, t.parent, t.providers, r);
    }
  }
};
(rt.THROW_IF_NOT_FOUND = cn),
  (rt.NULL = new xr()),
  (rt.ɵprov = P({ token: rt, providedIn: 'any', factory: () => U(vc) })),
  (rt.__NG_ELEMENT_ID__ = -1);
var Ne = rt;
var dg = new N('');
dg.__NG_ELEMENT_ID__ = (e) => {
  let t = V();
  if (t === null) throw new _(204, !1);
  if (t.type & 2) return t.value;
  if (e & x.Optional) return null;
  throw new _(204, !1);
};
var fg = 'ngOriginalError';
function Ko(e) {
  return e[fg];
}
var In = (() => {
    let t = class t {};
    (t.__NG_ELEMENT_ID__ = hg), (t.__NG_ENV_ID__ = (r) => r);
    let e = t;
    return e;
  })(),
  Ei = class extends In {
    constructor(t) {
      super(), (this._lView = t);
    }
    onDestroy(t) {
      return qc(this._lView, t), () => Op(this._lView, t);
    }
  };
function hg() {
  return new Ei(D());
}
var En = (() => {
  let t = class t {
    constructor() {
      (this.taskId = 0),
        (this.pendingTasks = new Set()),
        (this.hasPendingTasks = new Xt(!1));
    }
    get _hasPendingTasks() {
      return this.hasPendingTasks.value;
    }
    add() {
      this._hasPendingTasks || this.hasPendingTasks.next(!0);
      let r = this.taskId++;
      return this.pendingTasks.add(r), r;
    }
    remove(r) {
      this.pendingTasks.delete(r),
        this.pendingTasks.size === 0 &&
          this._hasPendingTasks &&
          this.hasPendingTasks.next(!1);
    }
    ngOnDestroy() {
      this.pendingTasks.clear(),
        this._hasPendingTasks && this.hasPendingTasks.next(!1);
    }
  };
  t.ɵprov = P({ token: t, providedIn: 'root', factory: () => new t() });
  let e = t;
  return e;
})();
var wi = class extends ie {
    constructor(t = !1) {
      super(),
        (this.destroyRef = void 0),
        (this.pendingTasks = void 0),
        (this.__isAsync = t),
        kc() &&
          ((this.destroyRef = C(In, { optional: !0 }) ?? void 0),
          (this.pendingTasks = C(En, { optional: !0 }) ?? void 0));
    }
    emit(t) {
      let n = b(null);
      try {
        super.next(t);
      } finally {
        b(n);
      }
    }
    subscribe(t, n, r) {
      let o = t,
        i = n || (() => null),
        s = r;
      if (t && typeof t == 'object') {
        let u = t;
        (o = u.next?.bind(u)),
          (i = u.error?.bind(u)),
          (s = u.complete?.bind(u));
      }
      this.__isAsync &&
        ((i = this.wrapInTimeout(i)),
        o && (o = this.wrapInTimeout(o)),
        s && (s = this.wrapInTimeout(s)));
      let a = super.subscribe({ next: o, error: i, complete: s });
      return t instanceof k && t.add(a), a;
    }
    wrapInTimeout(t) {
      return (n) => {
        let r = this.pendingTasks?.add();
        setTimeout(() => {
          t(n), r !== void 0 && this.pendingTasks?.remove(r);
        });
      };
    }
  },
  fe = wi;
function Pr(...e) {}
function ml(e) {
  let t, n;
  function r() {
    e = Pr;
    try {
      n !== void 0 &&
        typeof cancelAnimationFrame == 'function' &&
        cancelAnimationFrame(n),
        t !== void 0 && clearTimeout(t);
    } catch {}
  }
  return (
    (t = setTimeout(() => {
      e(), r();
    })),
    typeof requestAnimationFrame == 'function' &&
      (n = requestAnimationFrame(() => {
        e(), r();
      })),
    () => r()
  );
}
function Tu(e) {
  return (
    queueMicrotask(() => e()),
    () => {
      e = Pr;
    }
  );
}
var Ls = 'isAngularZone',
  kr = Ls + '_ID',
  pg = 0,
  ee = class e {
    constructor({
      enableLongStackTrace: t = !1,
      shouldCoalesceEventChangeDetection: n = !1,
      shouldCoalesceRunChangeDetection: r = !1,
    }) {
      if (
        ((this.hasPendingMacrotasks = !1),
        (this.hasPendingMicrotasks = !1),
        (this.isStable = !0),
        (this.onUnstable = new fe(!1)),
        (this.onMicrotaskEmpty = new fe(!1)),
        (this.onStable = new fe(!1)),
        (this.onError = new fe(!1)),
        typeof Zone > 'u')
      )
        throw new _(908, !1);
      Zone.assertZonePatched();
      let o = this;
      (o._nesting = 0),
        (o._outer = o._inner = Zone.current),
        Zone.TaskTrackingZoneSpec &&
          (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
        t &&
          Zone.longStackTraceZoneSpec &&
          (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
        (o.shouldCoalesceEventChangeDetection = !r && n),
        (o.shouldCoalesceRunChangeDetection = r),
        (o.callbackScheduled = !1),
        yg(o);
    }
    static isInAngularZone() {
      return typeof Zone < 'u' && Zone.current.get(Ls) === !0;
    }
    static assertInAngularZone() {
      if (!e.isInAngularZone()) throw new _(909, !1);
    }
    static assertNotInAngularZone() {
      if (e.isInAngularZone()) throw new _(909, !1);
    }
    run(t, n, r) {
      return this._inner.run(t, n, r);
    }
    runTask(t, n, r, o) {
      let i = this._inner,
        s = i.scheduleEventTask('NgZoneEvent: ' + o, t, gg, Pr, Pr);
      try {
        return i.runTask(s, n, r);
      } finally {
        i.cancelTask(s);
      }
    }
    runGuarded(t, n, r) {
      return this._inner.runGuarded(t, n, r);
    }
    runOutsideAngular(t) {
      return this._outer.run(t);
    }
  },
  gg = {};
function js(e) {
  if (e._nesting == 0 && !e.hasPendingMicrotasks && !e.isStable)
    try {
      e._nesting++, e.onMicrotaskEmpty.emit(null);
    } finally {
      if ((e._nesting--, !e.hasPendingMicrotasks))
        try {
          e.runOutsideAngular(() => e.onStable.emit(null));
        } finally {
          e.isStable = !0;
        }
    }
}
function mg(e) {
  e.isCheckStableRunning ||
    e.callbackScheduled ||
    ((e.callbackScheduled = !0),
    Zone.root.run(() => {
      ml(() => {
        (e.callbackScheduled = !1),
          Ci(e),
          (e.isCheckStableRunning = !0),
          js(e),
          (e.isCheckStableRunning = !1);
      });
    }),
    Ci(e));
}
function yg(e) {
  let t = () => {
      mg(e);
    },
    n = pg++;
  e._inner = e._inner.fork({
    name: 'angular',
    properties: { [Ls]: !0, [kr]: n, [kr + n]: !0 },
    onInvokeTask: (r, o, i, s, a, u) => {
      if (vg(u)) return r.invokeTask(i, s, a, u);
      try {
        return Nu(e), r.invokeTask(i, s, a, u);
      } finally {
        ((e.shouldCoalesceEventChangeDetection && s.type === 'eventTask') ||
          e.shouldCoalesceRunChangeDetection) &&
          t(),
          Au(e);
      }
    },
    onInvoke: (r, o, i, s, a, u, c) => {
      try {
        return Nu(e), r.invoke(i, s, a, u, c);
      } finally {
        e.shouldCoalesceRunChangeDetection &&
          !e.callbackScheduled &&
          !Dg(u) &&
          t(),
          Au(e);
      }
    },
    onHasTask: (r, o, i, s) => {
      r.hasTask(i, s),
        o === i &&
          (s.change == 'microTask'
            ? ((e._hasPendingMicrotasks = s.microTask), Ci(e), js(e))
            : s.change == 'macroTask' &&
              (e.hasPendingMacrotasks = s.macroTask));
    },
    onHandleError: (r, o, i, s) => (
      r.handleError(i, s), e.runOutsideAngular(() => e.onError.emit(s)), !1
    ),
  });
}
function Ci(e) {
  e._hasPendingMicrotasks ||
  ((e.shouldCoalesceEventChangeDetection ||
    e.shouldCoalesceRunChangeDetection) &&
    e.callbackScheduled === !0)
    ? (e.hasPendingMicrotasks = !0)
    : (e.hasPendingMicrotasks = !1);
}
function Nu(e) {
  e._nesting++, e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
}
function Au(e) {
  e._nesting--, js(e);
}
var bi = class {
  constructor() {
    (this.hasPendingMicrotasks = !1),
      (this.hasPendingMacrotasks = !1),
      (this.isStable = !0),
      (this.onUnstable = new fe()),
      (this.onMicrotaskEmpty = new fe()),
      (this.onStable = new fe()),
      (this.onError = new fe());
  }
  run(t, n, r) {
    return t.apply(n, r);
  }
  runGuarded(t, n, r) {
    return t.apply(n, r);
  }
  runOutsideAngular(t) {
    return t();
  }
  runTask(t, n, r, o) {
    return t.apply(n, r);
  }
};
function vg(e) {
  return yl(e, '__ignore_ng_zone__');
}
function Dg(e) {
  return yl(e, '__scheduler_tick__');
}
function yl(e, t) {
  return !Array.isArray(e) || e.length !== 1 ? !1 : e[0]?.data?.[t] === !0;
}
var Ge = class {
    constructor() {
      this._console = console;
    }
    handleError(t) {
      let n = this._findOriginalError(t);
      this._console.error('ERROR', t),
        n && this._console.error('ORIGINAL ERROR', n);
    }
    _findOriginalError(t) {
      let n = t && Ko(t);
      for (; n && Ko(n); ) n = Ko(n);
      return n || null;
    }
  },
  Ig = new N('', {
    providedIn: 'root',
    factory: () => {
      let e = C(ee),
        t = C(Ge);
      return (n) => e.runOutsideAngular(() => t.handleError(n));
    },
  }),
  _i = class {
    constructor() {
      (this.destroyed = !1),
        (this.listeners = null),
        (this.errorHandler = C(Ge, { optional: !0 })),
        (this.destroyRef = C(In)),
        this.destroyRef.onDestroy(() => {
          (this.destroyed = !0), (this.listeners = null);
        });
    }
    subscribe(t) {
      if (this.destroyed) throw new _(953, !1);
      return (
        (this.listeners ??= []).push(t),
        {
          unsubscribe: () => {
            let n = this.listeners?.indexOf(t);
            n !== void 0 && n !== -1 && this.listeners?.splice(n, 1);
          },
        }
      );
    }
    emit(t) {
      if (this.destroyed) throw new _(953, !1);
      if (this.listeners === null) return;
      let n = b(null);
      try {
        for (let r of this.listeners)
          try {
            r(t);
          } catch (o) {
            this.errorHandler?.handleError(o);
          }
      } finally {
        b(n);
      }
    }
  };
function Ou(e, t) {
  return sc(e, t);
}
function Eg(e) {
  return sc(Jr, e);
}
var F0 = ((Ou.required = Eg), Ou);
function wg() {
  return Gt(V(), D());
}
function Gt(e, t) {
  return new gt(ae(e, t));
}
var gt = (() => {
  let t = class t {
    constructor(r) {
      this.nativeElement = r;
    }
  };
  t.__NG_ELEMENT_ID__ = wg;
  let e = t;
  return e;
})();
function vl(e) {
  return e instanceof gt ? e.nativeElement : e;
}
function Cg() {
  return this._results[Symbol.iterator]();
}
var Mi = class e {
  get changes() {
    return (this._changes ??= new fe());
  }
  constructor(t = !1) {
    (this._emitDistinctChangesOnly = t),
      (this.dirty = !0),
      (this._onDirty = void 0),
      (this._results = []),
      (this._changesDetected = !1),
      (this._changes = void 0),
      (this.length = 0),
      (this.first = void 0),
      (this.last = void 0);
    let n = e.prototype;
    n[Symbol.iterator] || (n[Symbol.iterator] = Cg);
  }
  get(t) {
    return this._results[t];
  }
  map(t) {
    return this._results.map(t);
  }
  filter(t) {
    return this._results.filter(t);
  }
  find(t) {
    return this._results.find(t);
  }
  reduce(t, n) {
    return this._results.reduce(t, n);
  }
  forEach(t) {
    this._results.forEach(t);
  }
  some(t) {
    return this._results.some(t);
  }
  toArray() {
    return this._results.slice();
  }
  toString() {
    return this._results.toString();
  }
  reset(t, n) {
    this.dirty = !1;
    let r = Uh(t);
    (this._changesDetected = !Hh(this._results, r, n)) &&
      ((this._results = r),
      (this.length = r.length),
      (this.last = r[this.length - 1]),
      (this.first = r[0]));
  }
  notifyOnChanges() {
    this._changes !== void 0 &&
      (this._changesDetected || !this._emitDistinctChangesOnly) &&
      this._changes.emit(this);
  }
  onDirty(t) {
    this._onDirty = t;
  }
  setDirty() {
    (this.dirty = !0), this._onDirty?.();
  }
  destroy() {
    this._changes !== void 0 &&
      (this._changes.complete(), this._changes.unsubscribe());
  }
};
function Dl(e) {
  return (e.flags & 128) === 128;
}
var Il = new Map(),
  bg = 0;
function _g() {
  return bg++;
}
function Mg(e) {
  Il.set(e[no], e);
}
function xg(e) {
  Il.delete(e[no]);
}
var Fu = '__ngContext__';
function We(e, t) {
  Be(t) ? ((e[Fu] = t[no]), Mg(t)) : (e[Fu] = t);
}
function El(e) {
  return Cl(e[hn]);
}
function wl(e) {
  return Cl(e[he]);
}
function Cl(e) {
  for (; e !== null && !Oe(e); ) e = e[he];
  return e;
}
var xi;
function R0(e) {
  xi = e;
}
function Sg() {
  if (xi !== void 0) return xi;
  if (typeof document < 'u') return document;
  throw new _(210, !1);
}
var P0 = new N('', { providedIn: 'root', factory: () => Tg }),
  Tg = 'ng',
  Ng = new N(''),
  Vs = new N('', { providedIn: 'platform', factory: () => 'unknown' });
var k0 = new N(''),
  L0 = new N('', {
    providedIn: 'root',
    factory: () =>
      Sg().body?.querySelector('[ngCspNonce]')?.getAttribute('ngCspNonce') ||
      null,
  });
var Ag = 'h',
  Og = 'b';
var Fg = () => null;
function Bs(e, t, n = !1) {
  return Fg(e, t, n);
}
var bl = !1,
  Rg = new N('', { providedIn: 'root', factory: () => bl });
var cr;
function Pg() {
  if (cr === void 0 && ((cr = null), wr.trustedTypes))
    try {
      cr = wr.trustedTypes.createPolicy('angular', {
        createHTML: (e) => e,
        createScript: (e) => e,
        createScriptURL: (e) => e,
      });
    } catch {}
  return cr;
}
function lo(e) {
  return Pg()?.createHTML(e) || e;
}
var lr;
function kg() {
  if (lr === void 0 && ((lr = null), wr.trustedTypes))
    try {
      lr = wr.trustedTypes.createPolicy('angular#unsafe-bypass', {
        createHTML: (e) => e,
        createScript: (e) => e,
        createScriptURL: (e) => e,
      });
    } catch {}
  return lr;
}
function Ru(e) {
  return kg()?.createScriptURL(e) || e;
}
var Ae = class {
    constructor(t) {
      this.changingThisBreaksApplicationSecurity = t;
    }
    toString() {
      return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${rc})`;
    }
  },
  Si = class extends Ae {
    getTypeName() {
      return 'HTML';
    }
  },
  Ti = class extends Ae {
    getTypeName() {
      return 'Style';
    }
  },
  Ni = class extends Ae {
    getTypeName() {
      return 'Script';
    }
  },
  Ai = class extends Ae {
    getTypeName() {
      return 'URL';
    }
  },
  Oi = class extends Ae {
    getTypeName() {
      return 'ResourceURL';
    }
  };
function wn(e) {
  return e instanceof Ae ? e.changingThisBreaksApplicationSecurity : e;
}
function _l(e, t) {
  let n = Lg(e);
  if (n != null && n !== t) {
    if (n === 'ResourceURL' && t === 'URL') return !0;
    throw new Error(`Required a safe ${t}, got a ${n} (see ${rc})`);
  }
  return n === t;
}
function Lg(e) {
  return (e instanceof Ae && e.getTypeName()) || null;
}
function j0(e) {
  return new Si(e);
}
function V0(e) {
  return new Ti(e);
}
function B0(e) {
  return new Ni(e);
}
function $0(e) {
  return new Ai(e);
}
function H0(e) {
  return new Oi(e);
}
function jg(e) {
  let t = new Ri(e);
  return Vg() ? new Fi(t) : t;
}
var Fi = class {
    constructor(t) {
      this.inertDocumentHelper = t;
    }
    getInertBodyElement(t) {
      t = '<body><remove></remove>' + t;
      try {
        let n = new window.DOMParser().parseFromString(lo(t), 'text/html').body;
        return n === null
          ? this.inertDocumentHelper.getInertBodyElement(t)
          : (n.firstChild?.remove(), n);
      } catch {
        return null;
      }
    }
  },
  Ri = class {
    constructor(t) {
      (this.defaultDoc = t),
        (this.inertDocument =
          this.defaultDoc.implementation.createHTMLDocument(
            'sanitization-inert'
          ));
    }
    getInertBodyElement(t) {
      let n = this.inertDocument.createElement('template');
      return (n.innerHTML = lo(t)), n;
    }
  };
function Vg() {
  try {
    return !!new window.DOMParser().parseFromString(lo(''), 'text/html');
  } catch {
    return !1;
  }
}
var Bg = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
function Ml(e) {
  return (e = String(e)), e.match(Bg) ? e : 'unsafe:' + e;
}
function Re(e) {
  let t = {};
  for (let n of e.split(',')) t[n] = !0;
  return t;
}
function Cn(...e) {
  let t = {};
  for (let n of e) for (let r in n) n.hasOwnProperty(r) && (t[r] = !0);
  return t;
}
var xl = Re('area,br,col,hr,img,wbr'),
  Sl = Re('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr'),
  Tl = Re('rp,rt'),
  $g = Cn(Tl, Sl),
  Hg = Cn(
    Sl,
    Re(
      'address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul'
    )
  ),
  Ug = Cn(
    Tl,
    Re(
      'a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video'
    )
  ),
  Pu = Cn(xl, Hg, Ug, $g),
  Nl = Re('background,cite,href,itemtype,longdesc,poster,src,xlink:href'),
  zg = Re(
    'abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width'
  ),
  Gg = Re(
    'aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext'
  ),
  Wg = Cn(Nl, zg, Gg),
  qg = Re('script,style,template'),
  Pi = class {
    constructor() {
      (this.sanitizedSomething = !1), (this.buf = []);
    }
    sanitizeChildren(t) {
      let n = t.firstChild,
        r = !0,
        o = [];
      for (; n; ) {
        if (
          (n.nodeType === Node.ELEMENT_NODE
            ? (r = this.startElement(n))
            : n.nodeType === Node.TEXT_NODE
              ? this.chars(n.nodeValue)
              : (this.sanitizedSomething = !0),
          r && n.firstChild)
        ) {
          o.push(n), (n = Qg(n));
          continue;
        }
        for (; n; ) {
          n.nodeType === Node.ELEMENT_NODE && this.endElement(n);
          let i = Yg(n);
          if (i) {
            n = i;
            break;
          }
          n = o.pop();
        }
      }
      return this.buf.join('');
    }
    startElement(t) {
      let n = ku(t).toLowerCase();
      if (!Pu.hasOwnProperty(n))
        return (this.sanitizedSomething = !0), !qg.hasOwnProperty(n);
      this.buf.push('<'), this.buf.push(n);
      let r = t.attributes;
      for (let o = 0; o < r.length; o++) {
        let i = r.item(o),
          s = i.name,
          a = s.toLowerCase();
        if (!Wg.hasOwnProperty(a)) {
          this.sanitizedSomething = !0;
          continue;
        }
        let u = i.value;
        Nl[a] && (u = Ml(u)), this.buf.push(' ', s, '="', Lu(u), '"');
      }
      return this.buf.push('>'), !0;
    }
    endElement(t) {
      let n = ku(t).toLowerCase();
      Pu.hasOwnProperty(n) &&
        !xl.hasOwnProperty(n) &&
        (this.buf.push('</'), this.buf.push(n), this.buf.push('>'));
    }
    chars(t) {
      this.buf.push(Lu(t));
    }
  };
function Zg(e, t) {
  return (
    (e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY) !==
    Node.DOCUMENT_POSITION_CONTAINED_BY
  );
}
function Yg(e) {
  let t = e.nextSibling;
  if (t && e !== t.previousSibling) throw Al(t);
  return t;
}
function Qg(e) {
  let t = e.firstChild;
  if (t && Zg(e, t)) throw Al(t);
  return t;
}
function ku(e) {
  let t = e.nodeName;
  return typeof t == 'string' ? t : 'FORM';
}
function Al(e) {
  return new Error(
    `Failed to sanitize html because the element is clobbered: ${e.outerHTML}`
  );
}
var Kg = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
  Jg = /([^\#-~ |!])/g;
function Lu(e) {
  return e
    .replace(/&/g, '&amp;')
    .replace(Kg, function (t) {
      let n = t.charCodeAt(0),
        r = t.charCodeAt(1);
      return '&#' + ((n - 55296) * 1024 + (r - 56320) + 65536) + ';';
    })
    .replace(Jg, function (t) {
      return '&#' + t.charCodeAt(0) + ';';
    })
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
var dr;
function U0(e, t) {
  let n = null;
  try {
    dr = dr || jg(e);
    let r = t ? String(t) : '';
    n = dr.getInertBodyElement(r);
    let o = 5,
      i = r;
    do {
      if (o === 0)
        throw new Error(
          'Failed to sanitize html because the input is unstable'
        );
      o--, (r = i), (i = n.innerHTML), (n = dr.getInertBodyElement(r));
    } while (r !== i);
    let a = new Pi().sanitizeChildren(ju(n) || n);
    return lo(a);
  } finally {
    if (n) {
      let r = ju(n) || n;
      for (; r.firstChild; ) r.firstChild.remove();
    }
  }
}
function ju(e) {
  return 'content' in e && Xg(e) ? e.content : null;
}
function Xg(e) {
  return e.nodeType === Node.ELEMENT_NODE && e.nodeName === 'TEMPLATE';
}
var $s = (function (e) {
  return (
    (e[(e.NONE = 0)] = 'NONE'),
    (e[(e.HTML = 1)] = 'HTML'),
    (e[(e.STYLE = 2)] = 'STYLE'),
    (e[(e.SCRIPT = 3)] = 'SCRIPT'),
    (e[(e.URL = 4)] = 'URL'),
    (e[(e.RESOURCE_URL = 5)] = 'RESOURCE_URL'),
    e
  );
})($s || {});
function em(e) {
  let t = Ol();
  return t ? t.sanitize($s.URL, e) || '' : _l(e, 'URL') ? wn(e) : Ml(At(e));
}
function tm(e) {
  let t = Ol();
  if (t) return Ru(t.sanitize($s.RESOURCE_URL, e) || '');
  if (_l(e, 'ResourceURL')) return Ru(wn(e));
  throw new _(904, !1);
}
function nm(e, t) {
  return (t === 'src' &&
    (e === 'embed' ||
      e === 'frame' ||
      e === 'iframe' ||
      e === 'media' ||
      e === 'script')) ||
    (t === 'href' && (e === 'base' || e === 'link'))
    ? tm
    : em;
}
function z0(e, t, n) {
  return nm(t, n)(e);
}
function Ol() {
  let e = D();
  return e && e[Ie].sanitizer;
}
var rm = /^>|^->|<!--|-->|--!>|<!-$/g,
  om = /(<|>)/g,
  im = '\u200B$1\u200B';
function sm(e) {
  return e.replace(rm, (t) => t.replace(om, im));
}
function Fl(e) {
  return e instanceof Function ? e() : e;
}
function Rl(e) {
  return (e ?? C(Ne)).get(Vs) === 'browser';
}
var Lr = (function (e) {
    return (
      (e[(e.Important = 1)] = 'Important'),
      (e[(e.DashCase = 2)] = 'DashCase'),
      e
    );
  })(Lr || {}),
  am;
function Hs(e, t) {
  return am(e, t);
}
function St(e, t, n, r, o) {
  if (r != null) {
    let i,
      s = !1;
    Oe(r) ? (i = r) : Be(r) && ((s = !0), (r = r[we]));
    let a = Ee(r);
    e === 0 && n !== null
      ? o == null
        ? Vl(t, n, a)
        : jr(t, n, a, o || null, !0)
      : e === 1 && n !== null
        ? jr(t, n, a, o || null, !0)
        : e === 2
          ? Em(t, a, s)
          : e === 3 && t.destroyNode(a),
      i != null && Cm(t, e, i, n, o);
  }
}
function um(e, t) {
  return e.createText(t);
}
function cm(e, t, n) {
  e.setValue(t, n);
}
function lm(e, t) {
  return e.createComment(sm(t));
}
function Pl(e, t, n) {
  return e.createElement(t, n);
}
function dm(e, t) {
  kl(e, t), (t[we] = null), (t[te] = null);
}
function fm(e, t, n, r, o, i) {
  (r[we] = o), (r[te] = t), po(e, r, n, 1, o, i);
}
function kl(e, t) {
  t[Ie].changeDetectionScheduler?.notify(8), po(e, t, t[R], 2, null, null);
}
function hm(e) {
  let t = e[hn];
  if (!t) return Jo(e[E], e);
  for (; t; ) {
    let n = null;
    if (Be(t)) n = t[hn];
    else {
      let r = t[H];
      r && (n = r);
    }
    if (!n) {
      for (; t && !t[he] && t !== e; ) Be(t) && Jo(t[E], t), (t = t[z]);
      t === null && (t = e), Be(t) && Jo(t[E], t), (n = t && t[he]);
    }
    t = n;
  }
}
function pm(e, t, n, r) {
  let o = H + r,
    i = n.length;
  r > 0 && (n[o - 1][he] = t),
    r < i - H ? ((t[he] = n[o]), yc(n, H + r, t)) : (n.push(t), (t[he] = null)),
    (t[z] = n);
  let s = t[st];
  s !== null && n !== s && Ll(s, t);
  let a = t[Se];
  a !== null && a.insertView(e), gi(t), (t[y] |= 128);
}
function Ll(e, t) {
  let n = e[kt],
    r = t[z];
  if (Be(r)) e[y] |= Nr.HasTransplantedViews;
  else {
    let o = r[z][ne];
    t[ne] !== o && (e[y] |= Nr.HasTransplantedViews);
  }
  n === null ? (e[kt] = [t]) : n.push(t);
}
function Us(e, t) {
  let n = e[kt],
    r = n.indexOf(t);
  n.splice(r, 1);
}
function gn(e, t) {
  if (e.length <= H) return;
  let n = H + t,
    r = e[n];
  if (r) {
    let o = r[st];
    o !== null && o !== e && Us(o, r), t > 0 && (e[n - 1][he] = r[he]);
    let i = _r(e, H + t);
    dm(r[E], r);
    let s = i[Se];
    s !== null && s.detachView(i[E]),
      (r[z] = null),
      (r[he] = null),
      (r[y] &= -129);
  }
  return r;
}
function fo(e, t) {
  if (!(t[y] & 256)) {
    let n = t[R];
    n.destroyNode && po(e, t, n, 3, null, null), hm(t);
  }
}
function Jo(e, t) {
  if (t[y] & 256) return;
  let n = b(null);
  try {
    (t[y] &= -129),
      (t[y] |= 256),
      t[se] && Fn(t[se]),
      mm(e, t),
      gm(e, t),
      t[E].type === 1 && t[R].destroy();
    let r = t[st];
    if (r !== null && Oe(t[z])) {
      r !== t[z] && Us(r, t);
      let o = t[Se];
      o !== null && o.detachView(e);
    }
    xg(t);
  } finally {
    b(n);
  }
}
function gm(e, t) {
  let n = e.cleanup,
    r = t[Sr];
  if (n !== null)
    for (let i = 0; i < n.length - 1; i += 2)
      if (typeof n[i] == 'string') {
        let s = n[i + 3];
        s >= 0 ? r[s]() : r[-s].unsubscribe(), (i += 2);
      } else {
        let s = r[n[i + 1]];
        n[i].call(s);
      }
  r !== null && (t[Sr] = null);
  let o = t[Ve];
  if (o !== null) {
    t[Ve] = null;
    for (let i = 0; i < o.length; i++) {
      let s = o[i];
      s();
    }
  }
}
function mm(e, t) {
  let n;
  if (e != null && (n = e.destroyHooks) != null)
    for (let r = 0; r < n.length; r += 2) {
      let o = t[n[r]];
      if (!(o instanceof lt)) {
        let i = n[r + 1];
        if (Array.isArray(i))
          for (let s = 0; s < i.length; s += 2) {
            let a = o[i[s]],
              u = i[s + 1];
            ve(4, a, u);
            try {
              u.call(a);
            } finally {
              ve(5, a, u);
            }
          }
        else {
          ve(4, o, i);
          try {
            i.call(o);
          } finally {
            ve(5, o, i);
          }
        }
      }
    }
}
function jl(e, t, n) {
  return ym(e, t.parent, n);
}
function ym(e, t, n) {
  let r = t;
  for (; r !== null && r.type & 168; ) (t = r), (r = t.parent);
  if (r === null) return n[we];
  {
    let { componentOffset: o } = r;
    if (o > -1) {
      let { encapsulation: i } = e.data[r.directiveStart + o];
      if (i === ln.None || i === ln.Emulated) return null;
    }
    return ae(r, n);
  }
}
function jr(e, t, n, r, o) {
  e.insertBefore(t, n, r, o);
}
function Vl(e, t, n) {
  e.appendChild(t, n);
}
function Vu(e, t, n, r, o) {
  r !== null ? jr(e, t, n, r, o) : Vl(e, t, n);
}
function Bl(e, t) {
  return e.parentNode(t);
}
function vm(e, t) {
  return e.nextSibling(t);
}
function $l(e, t, n) {
  return Im(e, t, n);
}
function Dm(e, t, n) {
  return e.type & 40 ? ae(e, n) : null;
}
var Im = Dm,
  Bu;
function ho(e, t, n, r) {
  let o = jl(e, r, t),
    i = t[R],
    s = r.parent || t[te],
    a = $l(s, r, t);
  if (o != null)
    if (Array.isArray(n))
      for (let u = 0; u < n.length; u++) Vu(i, o, n[u], a, !1);
    else Vu(i, o, n, a, !1);
  Bu !== void 0 && Bu(i, r, t, n, o);
}
function an(e, t) {
  if (t !== null) {
    let n = t.type;
    if (n & 3) return ae(t, e);
    if (n & 4) return ki(-1, e[t.index]);
    if (n & 8) {
      let r = t.child;
      if (r !== null) return an(e, r);
      {
        let o = e[t.index];
        return Oe(o) ? ki(-1, o) : Ee(o);
      }
    } else {
      if (n & 128) return an(e, t.next);
      if (n & 32) return Hs(t, e)() || Ee(e[t.index]);
      {
        let r = Hl(e, t);
        if (r !== null) {
          if (Array.isArray(r)) return r[0];
          let o = ut(e[ne]);
          return an(o, r);
        } else return an(e, t.next);
      }
    }
  }
  return null;
}
function Hl(e, t) {
  if (t !== null) {
    let r = e[ne][te],
      o = t.projection;
    return r.projection[o];
  }
  return null;
}
function ki(e, t) {
  let n = H + e + 1;
  if (n < t.length) {
    let r = t[n],
      o = r[E].firstChild;
    if (o !== null) return an(r, o);
  }
  return t[at];
}
function Em(e, t, n) {
  e.removeChild(null, t, n);
}
function zs(e, t, n, r, o, i, s) {
  for (; n != null; ) {
    if (n.type === 128) {
      n = n.next;
      continue;
    }
    let a = r[n.index],
      u = n.type;
    if (
      (s && t === 0 && (a && We(Ee(a), r), (n.flags |= 2)),
      (n.flags & 32) !== 32)
    )
      if (u & 8) zs(e, t, n.child, r, o, i, !1), St(t, e, o, a, i);
      else if (u & 32) {
        let c = Hs(n, r),
          l;
        for (; (l = c()); ) St(t, e, o, l, i);
        St(t, e, o, a, i);
      } else u & 16 ? Ul(e, t, r, n, o, i) : St(t, e, o, a, i);
    n = s ? n.projectionNext : n.next;
  }
}
function po(e, t, n, r, o, i) {
  zs(n, r, e.firstChild, t, o, i, !1);
}
function wm(e, t, n) {
  let r = t[R],
    o = jl(e, n, t),
    i = n.parent || t[te],
    s = $l(i, n, t);
  Ul(r, 0, t, n, o, s);
}
function Ul(e, t, n, r, o, i) {
  let s = n[ne],
    u = s[te].projection[r.projection];
  if (Array.isArray(u))
    for (let c = 0; c < u.length; c++) {
      let l = u[c];
      St(t, e, o, l, i);
    }
  else {
    let c = u,
      l = s[z];
    Dl(r) && (c.flags |= 128), zs(e, t, c, l, o, i, !0);
  }
}
function Cm(e, t, n, r, o) {
  let i = n[at],
    s = Ee(n);
  i !== s && St(t, e, r, i, o);
  for (let a = H; a < n.length; a++) {
    let u = n[a];
    po(u[E], u, e, t, r, i);
  }
}
function bm(e, t, n, r, o) {
  if (t) o ? e.addClass(n, r) : e.removeClass(n, r);
  else {
    let i = r.indexOf('-') === -1 ? void 0 : Lr.DashCase;
    o == null
      ? e.removeStyle(n, r, i)
      : (typeof o == 'string' &&
          o.endsWith('!important') &&
          ((o = o.slice(0, -10)), (i |= Lr.Important)),
        e.setStyle(n, r, o, i));
  }
}
function _m(e, t, n) {
  e.setAttribute(t, 'style', n);
}
function zl(e, t, n) {
  n === '' ? e.removeAttribute(t, 'class') : e.setAttribute(t, 'class', n);
}
function Gl(e, t, n) {
  let { mergedAttrs: r, classes: o, styles: i } = n;
  r !== null && ci(e, t, r),
    o !== null && zl(e, t, o),
    i !== null && _m(e, t, i);
}
var oe = {};
function G0(e = 1) {
  Wl(F(), D(), Fe() + e, !1);
}
function Wl(e, t, n, r) {
  if (!r)
    if ((t[y] & 3) === 3) {
      let i = e.preOrderCheckHooks;
      i !== null && yr(t, i, n);
    } else {
      let i = e.preOrderHooks;
      i !== null && vr(t, i, 0, n);
    }
  ct(n);
}
function Pe(e, t = x.Default) {
  let n = D();
  if (n === null) return U(e, t);
  let r = V();
  return fl(r, n, W(e), t);
}
function W0() {
  let e = 'invalid';
  throw new Error(e);
}
function ql(e, t, n, r, o, i) {
  let s = b(null);
  try {
    let a = null;
    o & $e.SignalBased && (a = t[r][Q]),
      a !== null && a.transformFn !== void 0 && (i = a.transformFn(i)),
      o & $e.HasDecoratorInputTransform &&
        (i = e.inputTransforms[r].call(t, i)),
      e.setInput !== null ? e.setInput(t, a, i, n, r) : jc(t, a, r, i);
  } finally {
    b(s);
  }
}
function Mm(e, t) {
  let n = e.hostBindingOpCodes;
  if (n !== null)
    try {
      for (let r = 0; r < n.length; r++) {
        let o = n[r];
        if (o < 0) ct(~o);
        else {
          let i = o,
            s = n[++r],
            a = n[++r];
          zp(s, i);
          let u = t[i];
          a(2, u);
        }
      }
    } finally {
      ct(-1);
    }
}
function go(e, t, n, r, o, i, s, a, u, c, l) {
  let d = t.blueprint.slice();
  return (
    (d[we] = o),
    (d[y] = r | 4 | 128 | 8 | 64),
    (c !== null || (e && e[y] & 2048)) && (d[y] |= 2048),
    Gc(d),
    (d[z] = d[Ut] = e),
    (d[$] = n),
    (d[Ie] = s || (e && e[Ie])),
    (d[R] = a || (e && e[R])),
    (d[Pt] = u || (e && e[Pt]) || null),
    (d[te] = i),
    (d[no] = _g()),
    (d[Rt] = l),
    (d[Lc] = c),
    (d[ne] = t.type == 2 ? e[ne] : d),
    d
  );
}
function Wt(e, t, n, r, o) {
  let i = e.data[t];
  if (i === null) (i = xm(e, t, n, r, o)), Up() && (i.flags |= 32);
  else if (i.type & 64) {
    (i.type = n), (i.value = r), (i.attrs = o);
    let s = jp();
    i.injectorIndex = s === null ? -1 : s.injectorIndex;
  }
  return pt(i, !0), i;
}
function xm(e, t, n, r, o) {
  let i = Kc(),
    s = Ts(),
    a = s ? i : i && i.parent,
    u = (e.data[t] = Fm(e, a, n, t, r, o));
  return (
    e.firstChild === null && (e.firstChild = u),
    i !== null &&
      (s
        ? i.child == null && u.parent !== null && (i.child = u)
        : i.next === null && ((i.next = u), (u.prev = i))),
    u
  );
}
function Zl(e, t, n, r) {
  if (n === 0) return -1;
  let o = t.length;
  for (let i = 0; i < n; i++) t.push(r), e.blueprint.push(r), e.data.push(null);
  return o;
}
function Yl(e, t, n, r, o) {
  let i = Fe(),
    s = r & 2;
  try {
    ct(-1), s && t.length > B && Wl(e, t, B, !1), ve(s ? 2 : 0, o), n(r, o);
  } finally {
    ct(i), ve(s ? 3 : 1, o);
  }
}
function Gs(e, t, n) {
  if (_s(t)) {
    let r = b(null);
    try {
      let o = t.directiveStart,
        i = t.directiveEnd;
      for (let s = o; s < i; s++) {
        let a = e.data[s];
        if (a.contentQueries) {
          let u = n[s];
          a.contentQueries(1, u, s);
        }
      }
    } finally {
      b(r);
    }
  }
}
function Ws(e, t, n) {
  Yc() && (Vm(e, t, n, ae(n, t)), (n.flags & 64) === 64 && Jl(e, t, n));
}
function qs(e, t, n = ae) {
  let r = t.localNames;
  if (r !== null) {
    let o = t.index + 1;
    for (let i = 0; i < r.length; i += 2) {
      let s = r[i + 1],
        a = s === -1 ? n(t, e) : e[s];
      e[o++] = a;
    }
  }
}
function Ql(e) {
  let t = e.tView;
  return t === null || t.incompleteFirstPass
    ? (e.tView = Zs(
        1,
        null,
        e.template,
        e.decls,
        e.vars,
        e.directiveDefs,
        e.pipeDefs,
        e.viewQuery,
        e.schemas,
        e.consts,
        e.id
      ))
    : t;
}
function Zs(e, t, n, r, o, i, s, a, u, c, l) {
  let d = B + r,
    h = d + o,
    f = Sm(d, h),
    p = typeof c == 'function' ? c() : c;
  return (f[E] = {
    type: e,
    blueprint: f,
    template: n,
    queries: null,
    viewQuery: a,
    declTNode: t,
    data: f.slice().fill(null, d),
    bindingStartIndex: d,
    expandoStartIndex: h,
    hostBindingOpCodes: null,
    firstCreatePass: !0,
    firstUpdatePass: !0,
    staticViewQueries: !1,
    staticContentQueries: !1,
    preOrderHooks: null,
    preOrderCheckHooks: null,
    contentHooks: null,
    contentCheckHooks: null,
    viewHooks: null,
    viewCheckHooks: null,
    destroyHooks: null,
    cleanup: null,
    contentQueries: null,
    components: null,
    directiveRegistry: typeof i == 'function' ? i() : i,
    pipeRegistry: typeof s == 'function' ? s() : s,
    firstChild: null,
    schemas: u,
    consts: p,
    incompleteFirstPass: !1,
    ssrId: l,
  });
}
function Sm(e, t) {
  let n = [];
  for (let r = 0; r < t; r++) n.push(r < e ? null : oe);
  return n;
}
function Tm(e, t, n, r) {
  let i = r.get(Rg, bl) || n === ln.ShadowDom,
    s = e.selectRootElement(t, i);
  return Nm(s), s;
}
function Nm(e) {
  Am(e);
}
var Am = () => null;
function Om(e, t, n, r) {
  let o = td(t);
  o.push(n), e.firstCreatePass && nd(e).push(r, o.length - 1);
}
function Fm(e, t, n, r, o, i) {
  let s = t ? t.injectorIndex : -1,
    a = 0;
  return (
    Qc() && (a |= 128),
    {
      type: n,
      index: r,
      insertBeforeIndex: null,
      injectorIndex: s,
      directiveStart: -1,
      directiveEnd: -1,
      directiveStylingLast: -1,
      componentOffset: -1,
      propertyBindings: null,
      flags: a,
      providerIndexes: 0,
      value: o,
      attrs: i,
      mergedAttrs: null,
      localNames: null,
      initialInputs: void 0,
      inputs: null,
      outputs: null,
      tView: null,
      next: null,
      prev: null,
      projectionNext: null,
      child: null,
      parent: t,
      projection: null,
      styles: null,
      stylesWithoutHost: null,
      residualStyles: void 0,
      classes: null,
      classesWithoutHost: null,
      residualClasses: void 0,
      classBindings: 0,
      styleBindings: 0,
    }
  );
}
function $u(e, t, n, r, o) {
  for (let i in t) {
    if (!t.hasOwnProperty(i)) continue;
    let s = t[i];
    if (s === void 0) continue;
    r ??= {};
    let a,
      u = $e.None;
    Array.isArray(s) ? ((a = s[0]), (u = s[1])) : (a = s);
    let c = i;
    if (o !== null) {
      if (!o.hasOwnProperty(i)) continue;
      c = o[i];
    }
    e === 0 ? Hu(r, n, c, a, u) : Hu(r, n, c, a);
  }
  return r;
}
function Hu(e, t, n, r, o) {
  let i;
  e.hasOwnProperty(n) ? (i = e[n]).push(t, r) : (i = e[n] = [t, r]),
    o !== void 0 && i.push(o);
}
function Rm(e, t, n) {
  let r = t.directiveStart,
    o = t.directiveEnd,
    i = e.data,
    s = t.attrs,
    a = [],
    u = null,
    c = null;
  for (let l = r; l < o; l++) {
    let d = i[l],
      h = n ? n.get(d) : null,
      f = h ? h.inputs : null,
      p = h ? h.outputs : null;
    (u = $u(0, d.inputs, l, u, f)), (c = $u(1, d.outputs, l, c, p));
    let g = u !== null && s !== null && !Ds(t) ? Qm(u, l, s) : null;
    a.push(g);
  }
  u !== null &&
    (u.hasOwnProperty('class') && (t.flags |= 8),
    u.hasOwnProperty('style') && (t.flags |= 16)),
    (t.initialInputs = a),
    (t.inputs = u),
    (t.outputs = c);
}
function Pm(e) {
  return e === 'class'
    ? 'className'
    : e === 'for'
      ? 'htmlFor'
      : e === 'formaction'
        ? 'formAction'
        : e === 'innerHtml'
          ? 'innerHTML'
          : e === 'readonly'
            ? 'readOnly'
            : e === 'tabindex'
              ? 'tabIndex'
              : e;
}
function bn(e, t, n, r, o, i, s, a) {
  let u = ae(t, n),
    c = t.inputs,
    l;
  !a && c != null && (l = c[r])
    ? (Qs(e, n, l, r, o), ro(t) && km(n, t.index))
    : t.type & 3
      ? ((r = Pm(r)),
        (o = s != null ? s(o, t.value || '', r) : o),
        i.setProperty(u, r, o))
      : t.type & 12;
}
function km(e, t) {
  let n = Ze(t, e);
  n[y] & 16 || (n[y] |= 64);
}
function Ys(e, t, n, r) {
  if (Yc()) {
    let o = r === null ? null : { '': -1 },
      i = $m(e, n),
      s,
      a;
    i === null ? (s = a = null) : ([s, a] = i),
      s !== null && Kl(e, t, n, s, o, a),
      o && Hm(n, r, o);
  }
  n.mergedAttrs = dn(n.mergedAttrs, n.attrs);
}
function Kl(e, t, n, r, o, i) {
  for (let c = 0; c < r.length; c++) Di(Rr(n, t), e, r[c].type);
  zm(n, e.data.length, r.length);
  for (let c = 0; c < r.length; c++) {
    let l = r[c];
    l.providersResolver && l.providersResolver(l);
  }
  let s = !1,
    a = !1,
    u = Zl(e, t, r.length, null);
  for (let c = 0; c < r.length; c++) {
    let l = r[c];
    (n.mergedAttrs = dn(n.mergedAttrs, l.hostAttrs)),
      Gm(e, n, t, u, l),
      Um(u, l, o),
      l.contentQueries !== null && (n.flags |= 4),
      (l.hostBindings !== null || l.hostAttrs !== null || l.hostVars !== 0) &&
        (n.flags |= 64);
    let d = l.type.prototype;
    !s &&
      (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
      ((e.preOrderHooks ??= []).push(n.index), (s = !0)),
      !a &&
        (d.ngOnChanges || d.ngDoCheck) &&
        ((e.preOrderCheckHooks ??= []).push(n.index), (a = !0)),
      u++;
  }
  Rm(e, n, i);
}
function Lm(e, t, n, r, o) {
  let i = o.hostBindings;
  if (i) {
    let s = e.hostBindingOpCodes;
    s === null && (s = e.hostBindingOpCodes = []);
    let a = ~t.index;
    jm(s) != a && s.push(a), s.push(n, r, i);
  }
}
function jm(e) {
  let t = e.length;
  for (; t > 0; ) {
    let n = e[--t];
    if (typeof n == 'number' && n < 0) return n;
  }
  return 0;
}
function Vm(e, t, n, r) {
  let o = n.directiveStart,
    i = n.directiveEnd;
  ro(n) && Wm(t, n, e.data[o + n.componentOffset]),
    e.firstCreatePass || Rr(n, t),
    We(r, t);
  let s = n.initialInputs;
  for (let a = o; a < i; a++) {
    let u = e.data[a],
      c = dt(t, e, a, n);
    if ((We(c, t), s !== null && Ym(t, a - o, c, u, n, s), Te(u))) {
      let l = Ze(n.index, t);
      l[$] = dt(t, e, a, n);
    }
  }
}
function Jl(e, t, n) {
  let r = n.directiveStart,
    o = n.directiveEnd,
    i = n.index,
    s = Gp();
  try {
    ct(i);
    for (let a = r; a < o; a++) {
      let u = e.data[a],
        c = t[a];
      mi(a),
        (u.hostBindings !== null || u.hostVars !== 0 || u.hostAttrs !== null) &&
          Bm(u, c);
    }
  } finally {
    ct(-1), mi(s);
  }
}
function Bm(e, t) {
  e.hostBindings !== null && e.hostBindings(1, t);
}
function $m(e, t) {
  let n = e.directiveRegistry,
    r = null,
    o = null;
  if (n)
    for (let i = 0; i < n.length; i++) {
      let s = n[i];
      if (Cc(t, s.selectors, !1))
        if ((r || (r = []), Te(s)))
          if (s.findHostDirectiveDefs !== null) {
            let a = [];
            (o = o || new Map()),
              s.findHostDirectiveDefs(s, a, o),
              r.unshift(...a, s);
            let u = a.length;
            Li(e, t, u);
          } else r.unshift(s), Li(e, t, 0);
        else
          (o = o || new Map()), s.findHostDirectiveDefs?.(s, r, o), r.push(s);
    }
  return r === null ? null : [r, o];
}
function Li(e, t, n) {
  (t.componentOffset = n), (e.components ??= []).push(t.index);
}
function Hm(e, t, n) {
  if (t) {
    let r = (e.localNames = []);
    for (let o = 0; o < t.length; o += 2) {
      let i = n[t[o + 1]];
      if (i == null) throw new _(-301, !1);
      r.push(t[o], i);
    }
  }
}
function Um(e, t, n) {
  if (n) {
    if (t.exportAs)
      for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
    Te(t) && (n[''] = e);
  }
}
function zm(e, t, n) {
  (e.flags |= 1),
    (e.directiveStart = t),
    (e.directiveEnd = t + n),
    (e.providerIndexes = t);
}
function Gm(e, t, n, r, o) {
  e.data[r] = o;
  let i = o.factory || (o.factory = it(o.type, !0)),
    s = new lt(i, Te(o), Pe);
  (e.blueprint[r] = s), (n[r] = s), Lm(e, t, r, Zl(e, n, o.hostVars, oe), o);
}
function Wm(e, t, n) {
  let r = ae(t, e),
    o = Ql(n),
    i = e[Ie].rendererFactory,
    s = 16;
  n.signals ? (s = 4096) : n.onPush && (s = 64);
  let a = mo(
    e,
    go(e, o, null, s, r, t, null, i.createRenderer(r, n), null, null, null)
  );
  e[t.index] = a;
}
function qm(e, t, n, r, o, i) {
  let s = ae(e, t);
  Zm(t[R], s, i, e.value, n, r, o);
}
function Zm(e, t, n, r, o, i, s) {
  if (i == null) e.removeAttribute(t, o, n);
  else {
    let a = s == null ? At(i) : s(i, r || '', o);
    e.setAttribute(t, o, a, n);
  }
}
function Ym(e, t, n, r, o, i) {
  let s = i[t];
  if (s !== null)
    for (let a = 0; a < s.length; ) {
      let u = s[a++],
        c = s[a++],
        l = s[a++],
        d = s[a++];
      ql(r, n, u, c, l, d);
    }
}
function Qm(e, t, n) {
  let r = null,
    o = 0;
  for (; o < n.length; ) {
    let i = n[o];
    if (i === 0) {
      o += 4;
      continue;
    } else if (i === 5) {
      o += 2;
      continue;
    }
    if (typeof i == 'number') break;
    if (e.hasOwnProperty(i)) {
      r === null && (r = []);
      let s = e[i];
      for (let a = 0; a < s.length; a += 3)
        if (s[a] === t) {
          r.push(i, s[a + 1], s[a + 2], n[o + 1]);
          break;
        }
    }
    o += 2;
  }
  return r;
}
function Xl(e, t, n, r) {
  return [e, !0, 0, t, null, r, null, n, null, null];
}
function ed(e, t) {
  let n = e.contentQueries;
  if (n !== null) {
    let r = b(null);
    try {
      for (let o = 0; o < n.length; o += 2) {
        let i = n[o],
          s = n[o + 1];
        if (s !== -1) {
          let a = e.data[s];
          so(i), a.contentQueries(2, t[s], s);
        }
      }
    } finally {
      b(r);
    }
  }
}
function mo(e, t) {
  return e[hn] ? (e[wu][he] = t) : (e[hn] = t), (e[wu] = t), t;
}
function ji(e, t, n) {
  so(0);
  let r = b(null);
  try {
    t(e, n);
  } finally {
    b(r);
  }
}
function td(e) {
  return (e[Sr] ??= []);
}
function nd(e) {
  return (e.cleanup ??= []);
}
function rd(e, t, n) {
  return (e === null || Te(e)) && (n = Sp(n[t.index])), n[R];
}
function od(e, t) {
  let n = e[Pt],
    r = n ? n.get(Ge, null) : null;
  r && r.handleError(t);
}
function Qs(e, t, n, r, o) {
  for (let i = 0; i < n.length; ) {
    let s = n[i++],
      a = n[i++],
      u = n[i++],
      c = t[s],
      l = e.data[s];
    ql(l, c, r, a, u, o);
  }
}
function id(e, t, n) {
  let r = Uc(t, e);
  cm(e[R], r, n);
}
function Km(e, t) {
  let n = Ze(t, e),
    r = n[E];
  Jm(r, n);
  let o = n[we];
  o !== null && n[Rt] === null && (n[Rt] = Bs(o, n[Pt])), Ks(r, n, n[$]);
}
function Jm(e, t) {
  for (let n = t.length; n < e.blueprint.length; n++) t.push(e.blueprint[n]);
}
function Ks(e, t, n) {
  Rs(t);
  try {
    let r = e.viewQuery;
    r !== null && ji(1, r, n);
    let o = e.template;
    o !== null && Yl(e, t, o, 1, n),
      e.firstCreatePass && (e.firstCreatePass = !1),
      t[Se]?.finishViewCreation(e),
      e.staticContentQueries && ed(e, t),
      e.staticViewQueries && ji(2, e.viewQuery, n);
    let i = e.components;
    i !== null && Xm(t, i);
  } catch (r) {
    throw (
      (e.firstCreatePass &&
        ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
      r)
    );
  } finally {
    (t[y] &= -5), Ps();
  }
}
function Xm(e, t) {
  for (let n = 0; n < t.length; n++) Km(e, t[n]);
}
function _n(e, t, n, r) {
  let o = b(null);
  try {
    let i = t.tView,
      a = e[y] & 4096 ? 4096 : 16,
      u = go(
        e,
        i,
        n,
        a,
        null,
        t,
        null,
        null,
        r?.injector ?? null,
        r?.embeddedViewInjector ?? null,
        r?.dehydratedView ?? null
      ),
      c = e[t.index];
    u[st] = c;
    let l = e[Se];
    return l !== null && (u[Se] = l.createEmbeddedView(i)), Ks(i, u, n), u;
  } finally {
    b(o);
  }
}
function sd(e, t) {
  let n = H + t;
  if (n < e.length) return e[n];
}
function Lt(e, t) {
  return !t || t.firstChild === null || Dl(e);
}
function Mn(e, t, n, r = !0) {
  let o = t[E];
  if ((pm(o, t, e, n), r)) {
    let s = ki(n, e),
      a = t[R],
      u = Bl(a, e[at]);
    u !== null && fm(o, e[te], a, t, u, s);
  }
  let i = t[Rt];
  i !== null && i.firstChild !== null && (i.firstChild = null);
}
function ad(e, t) {
  let n = gn(e, t);
  return n !== void 0 && fo(n[E], n), n;
}
function Vr(e, t, n, r, o = !1) {
  for (; n !== null; ) {
    if (n.type === 128) {
      n = o ? n.projectionNext : n.next;
      continue;
    }
    let i = t[n.index];
    i !== null && r.push(Ee(i)), Oe(i) && ey(i, r);
    let s = n.type;
    if (s & 8) Vr(e, t, n.child, r);
    else if (s & 32) {
      let a = Hs(n, t),
        u;
      for (; (u = a()); ) r.push(u);
    } else if (s & 16) {
      let a = Hl(t, n);
      if (Array.isArray(a)) r.push(...a);
      else {
        let u = ut(t[ne]);
        Vr(u[E], u, a, r, !0);
      }
    }
    n = o ? n.projectionNext : n.next;
  }
  return r;
}
function ey(e, t) {
  for (let n = H; n < e.length; n++) {
    let r = e[n],
      o = r[E].firstChild;
    o !== null && Vr(r[E], r, o, t);
  }
  e[at] !== e[we] && t.push(e[at]);
}
var ud = [];
function ty(e) {
  return e[se] ?? ny(e);
}
function ny(e) {
  let t = ud.pop() ?? Object.create(oy);
  return (t.lView = e), t;
}
function ry(e) {
  e.lView[se] !== e && ((e.lView = null), ud.push(e));
}
var oy = ge(pe({}, vt), {
  consumerIsAlwaysLive: !0,
  consumerMarkedDirty: (e) => {
    io(e.lView);
  },
  consumerOnSignalRead() {
    this.lView[se] = this;
  },
});
function iy(e) {
  let t = e[se] ?? Object.create(sy);
  return (t.lView = e), t;
}
var sy = ge(pe({}, vt), {
  consumerIsAlwaysLive: !0,
  consumerMarkedDirty: (e) => {
    let t = ut(e.lView);
    for (; t && !cd(t[E]); ) t = ut(t);
    t && Wc(t);
  },
  consumerOnSignalRead() {
    this.lView[se] = this;
  },
});
function cd(e) {
  return e.type !== 2;
}
var ay = 100;
function ld(e, t = !0, n = 0) {
  let r = e[Ie],
    o = r.rendererFactory,
    i = !1;
  i || o.begin?.();
  try {
    uy(e, n);
  } catch (s) {
    throw (t && od(e, s), s);
  } finally {
    i || (o.end?.(), r.inlineEffectRunner?.flush());
  }
}
function uy(e, t) {
  let n = Jc();
  try {
    bu(!0), Vi(e, t);
    let r = 0;
    for (; pn(e); ) {
      if (r === ay) throw new _(103, !1);
      r++, Vi(e, 1);
    }
  } finally {
    bu(n);
  }
}
function cy(e, t, n, r) {
  let o = t[y];
  if ((o & 256) === 256) return;
  let i = !1,
    s = !1;
  !i && t[Ie].inlineEffectRunner?.flush(), Rs(t);
  let a = !0,
    u = null,
    c = null;
  i ||
    (cd(e)
      ? ((c = ty(t)), (u = Qt(c)))
      : wa() === null
        ? ((a = !1), (c = iy(t)), (u = Qt(c)))
        : t[se] && (Fn(t[se]), (t[se] = null)));
  try {
    Gc(t), Hp(e.bindingStartIndex), n !== null && Yl(e, t, n, 2, r);
    let l = (o & 3) === 3;
    if (!i)
      if (l) {
        let f = e.preOrderCheckHooks;
        f !== null && yr(t, f, null);
      } else {
        let f = e.preOrderHooks;
        f !== null && vr(t, f, 0, null), Zo(t, 0);
      }
    if ((s || ly(t), dd(t, 0), e.contentQueries !== null && ed(e, t), !i))
      if (l) {
        let f = e.contentCheckHooks;
        f !== null && yr(t, f);
      } else {
        let f = e.contentHooks;
        f !== null && vr(t, f, 1), Zo(t, 1);
      }
    Mm(e, t);
    let d = e.components;
    d !== null && hd(t, d, 0);
    let h = e.viewQuery;
    if ((h !== null && ji(2, h, r), !i))
      if (l) {
        let f = e.viewCheckHooks;
        f !== null && yr(t, f);
      } else {
        let f = e.viewHooks;
        f !== null && vr(t, f, 2), Zo(t, 2);
      }
    if ((e.firstUpdatePass === !0 && (e.firstUpdatePass = !1), t[mr])) {
      for (let f of t[mr]) f();
      t[mr] = null;
    }
    i || (t[y] &= -73);
  } catch (l) {
    throw (i || io(t), l);
  } finally {
    c !== null && (An(c, u), a && ry(c)), Ps();
  }
}
function dd(e, t) {
  for (let n = El(e); n !== null; n = wl(n))
    for (let r = H; r < n.length; r++) {
      let o = n[r];
      fd(o, t);
    }
}
function ly(e) {
  for (let t = El(e); t !== null; t = wl(t)) {
    if (!(t[y] & Nr.HasTransplantedViews)) continue;
    let n = t[kt];
    for (let r = 0; r < n.length; r++) {
      let o = n[r];
      Wc(o);
    }
  }
}
function dy(e, t, n) {
  let r = Ze(t, e);
  fd(r, n);
}
function fd(e, t) {
  Ss(e) && Vi(e, t);
}
function Vi(e, t) {
  let r = e[E],
    o = e[y],
    i = e[se],
    s = !!(t === 0 && o & 16);
  if (
    ((s ||= !!(o & 64 && t === 0)),
    (s ||= !!(o & 1024)),
    (s ||= !!(i?.dirty && On(i))),
    (s ||= !1),
    i && (i.dirty = !1),
    (e[y] &= -9217),
    s)
  )
    cy(r, e, r.template, e[$]);
  else if (o & 8192) {
    dd(e, 1);
    let a = r.components;
    a !== null && hd(e, a, 1);
  }
}
function hd(e, t, n) {
  for (let r = 0; r < t.length; r++) dy(e, t[r], n);
}
function Js(e, t) {
  let n = Jc() ? 64 : 1088;
  for (e[Ie].changeDetectionScheduler?.notify(t); e; ) {
    e[y] |= n;
    let r = ut(e);
    if (hi(e) && !r) return e;
    e = r;
  }
  return null;
}
var ft = class {
    get rootNodes() {
      let t = this._lView,
        n = t[E];
      return Vr(n, t, n.firstChild, []);
    }
    constructor(t, n, r = !0) {
      (this._lView = t),
        (this._cdRefInjectingView = n),
        (this.notifyErrorHandler = r),
        (this._appRef = null),
        (this._attachedToViewContainer = !1);
    }
    get context() {
      return this._lView[$];
    }
    set context(t) {
      this._lView[$] = t;
    }
    get destroyed() {
      return (this._lView[y] & 256) === 256;
    }
    destroy() {
      if (this._appRef) this._appRef.detachView(this);
      else if (this._attachedToViewContainer) {
        let t = this._lView[z];
        if (Oe(t)) {
          let n = t[Tr],
            r = n ? n.indexOf(this) : -1;
          r > -1 && (gn(t, r), _r(n, r));
        }
        this._attachedToViewContainer = !1;
      }
      fo(this._lView[E], this._lView);
    }
    onDestroy(t) {
      qc(this._lView, t);
    }
    markForCheck() {
      Js(this._cdRefInjectingView || this._lView, 4);
    }
    detach() {
      this._lView[y] &= -129;
    }
    reattach() {
      gi(this._lView), (this._lView[y] |= 128);
    }
    detectChanges() {
      (this._lView[y] |= 1024), ld(this._lView, this.notifyErrorHandler);
    }
    checkNoChanges() {}
    attachToViewContainerRef() {
      if (this._appRef) throw new _(902, !1);
      this._attachedToViewContainer = !0;
    }
    detachFromAppRef() {
      this._appRef = null;
      let t = hi(this._lView),
        n = this._lView[st];
      n !== null && !t && Us(n, this._lView), kl(this._lView[E], this._lView);
    }
    attachToAppRef(t) {
      if (this._attachedToViewContainer) throw new _(902, !1);
      this._appRef = t;
      let n = hi(this._lView),
        r = this._lView[st];
      r !== null && !n && Ll(r, this._lView), gi(this._lView);
    }
  },
  mn = (() => {
    let t = class t {};
    t.__NG_ELEMENT_ID__ = py;
    let e = t;
    return e;
  })(),
  fy = mn,
  hy = class extends fy {
    constructor(t, n, r) {
      super(),
        (this._declarationLView = t),
        (this._declarationTContainer = n),
        (this.elementRef = r);
    }
    get ssrId() {
      return this._declarationTContainer.tView?.ssrId || null;
    }
    createEmbeddedView(t, n) {
      return this.createEmbeddedViewImpl(t, n);
    }
    createEmbeddedViewImpl(t, n, r) {
      let o = _n(this._declarationLView, this._declarationTContainer, t, {
        embeddedViewInjector: n,
        dehydratedView: r,
      });
      return new ft(o);
    }
  };
function py() {
  return yo(V(), D());
}
function yo(e, t) {
  return e.type & 4 ? new hy(t, e, Gt(e, t)) : null;
}
var Z0 = new RegExp(`^(\\d+)*(${Og}|${Ag})*(.*)`);
var gy = () => null;
function jt(e, t) {
  return gy(e, t);
}
var Vt = class {},
  Xs = new N('', { providedIn: 'root', factory: () => !1 });
var pd = new N(''),
  Bi = class {},
  Br = class {};
function my(e) {
  let t = Error(`No component factory found for ${X(e)}.`);
  return (t[yy] = e), t;
}
var yy = 'ngComponent';
var $i = class {
    resolveComponentFactory(t) {
      throw my(t);
    }
  },
  ca = class ca {};
ca.NULL = new $i();
var Bt = ca,
  $r = class {},
  ea = (() => {
    let t = class t {
      constructor() {
        this.destroyNode = null;
      }
    };
    t.__NG_ELEMENT_ID__ = () => vy();
    let e = t;
    return e;
  })();
function vy() {
  let e = D(),
    t = V(),
    n = Ze(t.index, e);
  return (Be(n) ? n : e)[R];
}
var Dy = (() => {
  let t = class t {};
  t.ɵprov = P({ token: t, providedIn: 'root', factory: () => null });
  let e = t;
  return e;
})();
var Uu = new Set();
function Ce(e) {
  Uu.has(e) ||
    (Uu.add(e),
    performance?.mark?.('mark_feature_usage', { detail: { feature: e } }));
}
var Z = (function (e) {
    return (
      (e[(e.EarlyRead = 0)] = 'EarlyRead'),
      (e[(e.Write = 1)] = 'Write'),
      (e[(e.MixedReadWrite = 2)] = 'MixedReadWrite'),
      (e[(e.Read = 3)] = 'Read'),
      e
    );
  })(Z || {}),
  gd = { destroy() {} };
function Iy(e, t) {
  !t && Cs(Iy);
  let n = t?.injector ?? C(Ne);
  return Rl(n)
    ? (Ce('NgAfterRender'), md(e, n, !1, t?.phase ?? Z.MixedReadWrite))
    : gd;
}
function Ey(e, t) {
  !t && Cs(Ey);
  let n = t?.injector ?? C(Ne);
  return Rl(n)
    ? (Ce('NgAfterNextRender'), md(e, n, !0, t?.phase ?? Z.MixedReadWrite))
    : gd;
}
function wy(e, t) {
  if (e instanceof Function)
    switch (t) {
      case Z.EarlyRead:
        return { earlyRead: e };
      case Z.Write:
        return { write: e };
      case Z.MixedReadWrite:
        return { mixedReadWrite: e };
      case Z.Read:
        return { read: e };
    }
  return e;
}
function md(e, t, n, r) {
  let o = wy(e, r),
    i = t.get(ta),
    s = (i.handler ??= new Ui()),
    a = [],
    u = [],
    c = () => {
      for (let f of u) s.unregister(f);
      l();
    },
    l = t.get(In).onDestroy(c),
    d = 0,
    h = (f, p) => {
      if (!p) return;
      let g = n ? (...M) => (d--, d < 1 && c(), p(...M)) : p,
        T = wp(t, () => new Hi(f, a, g));
      s.register(T), u.push(T), d++;
    };
  return (
    h(Z.EarlyRead, o.earlyRead),
    h(Z.Write, o.write),
    h(Z.MixedReadWrite, o.mixedReadWrite),
    h(Z.Read, o.read),
    { destroy: c }
  );
}
var Hi = class {
    constructor(t, n, r) {
      (this.phase = t),
        (this.pipelinedArgs = n),
        (this.callbackFn = r),
        (this.zone = C(ee)),
        (this.errorHandler = C(Ge, { optional: !0 })),
        C(Vt, { optional: !0 })?.notify(6);
    }
    invoke() {
      try {
        let t = this.zone.runOutsideAngular(() =>
          this.callbackFn.apply(null, this.pipelinedArgs)
        );
        this.pipelinedArgs.splice(0, this.pipelinedArgs.length, t);
      } catch (t) {
        this.errorHandler?.handleError(t);
      }
    }
  },
  Ui = class {
    constructor() {
      (this.executingCallbacks = !1),
        (this.buckets = {
          [Z.EarlyRead]: new Set(),
          [Z.Write]: new Set(),
          [Z.MixedReadWrite]: new Set(),
          [Z.Read]: new Set(),
        }),
        (this.deferredCallbacks = new Set());
    }
    register(t) {
      (this.executingCallbacks
        ? this.deferredCallbacks
        : this.buckets[t.phase]
      ).add(t);
    }
    unregister(t) {
      this.buckets[t.phase].delete(t), this.deferredCallbacks.delete(t);
    }
    execute() {
      this.executingCallbacks = !0;
      for (let t of Object.values(this.buckets)) for (let n of t) n.invoke();
      this.executingCallbacks = !1;
      for (let t of this.deferredCallbacks) this.buckets[t.phase].add(t);
      this.deferredCallbacks.clear();
    }
    destroy() {
      for (let t of Object.values(this.buckets)) t.clear();
      this.deferredCallbacks.clear();
    }
  },
  ta = (() => {
    let t = class t {
      constructor() {
        (this.handler = null), (this.internalCallbacks = []);
      }
      execute() {
        this.executeInternalCallbacks(), this.handler?.execute();
      }
      executeInternalCallbacks() {
        let r = [...this.internalCallbacks];
        this.internalCallbacks.length = 0;
        for (let o of r) o();
      }
      ngOnDestroy() {
        this.handler?.destroy(),
          (this.handler = null),
          (this.internalCallbacks.length = 0);
      }
    };
    t.ɵprov = P({ token: t, providedIn: 'root', factory: () => new t() });
    let e = t;
    return e;
  })();
function Hr(e, t, n) {
  let r = n ? e.styles : null,
    o = n ? e.classes : null,
    i = 0;
  if (t !== null)
    for (let s = 0; s < t.length; s++) {
      let a = t[s];
      if (typeof a == 'number') i = a;
      else if (i == 1) o = ii(o, a);
      else if (i == 2) {
        let u = a,
          c = t[++s];
        r = ii(r, u + ': ' + c + ';');
      }
    }
  n ? (e.styles = r) : (e.stylesWithoutHost = r),
    n ? (e.classes = o) : (e.classesWithoutHost = o);
}
var Ur = class extends Bt {
  constructor(t) {
    super(), (this.ngModule = t);
  }
  resolveComponentFactory(t) {
    let n = He(t);
    return new $t(n, this.ngModule);
  }
};
function zu(e, t) {
  let n = [];
  for (let r in e) {
    if (!e.hasOwnProperty(r)) continue;
    let o = e[r];
    if (o === void 0) continue;
    let i = Array.isArray(o),
      s = i ? o[0] : o,
      a = i ? o[1] : $e.None;
    t
      ? n.push({
          propName: s,
          templateName: r,
          isSignal: (a & $e.SignalBased) !== 0,
        })
      : n.push({ propName: s, templateName: r });
  }
  return n;
}
function Cy(e) {
  let t = e.toLowerCase();
  return t === 'svg' ? Hc : t === 'math' ? xp : null;
}
var $t = class extends Br {
    get inputs() {
      let t = this.componentDef,
        n = t.inputTransforms,
        r = zu(t.inputs, !0);
      if (n !== null)
        for (let o of r)
          n.hasOwnProperty(o.propName) && (o.transform = n[o.propName]);
      return r;
    }
    get outputs() {
      return zu(this.componentDef.outputs, !1);
    }
    constructor(t, n) {
      super(),
        (this.componentDef = t),
        (this.ngModule = n),
        (this.componentType = t.type),
        (this.selector = op(t.selectors)),
        (this.ngContentSelectors = t.ngContentSelectors
          ? t.ngContentSelectors
          : []),
        (this.isBoundToModule = !!n);
    }
    create(t, n, r, o) {
      let i = b(null);
      try {
        o = o || this.ngModule;
        let s = o instanceof Ue ? o : o?.injector;
        s &&
          this.componentDef.getStandaloneInjector !== null &&
          (s = this.componentDef.getStandaloneInjector(s) || s);
        let a = s ? new yi(t, s) : t,
          u = a.get($r, null);
        if (u === null) throw new _(407, !1);
        let c = a.get(Dy, null),
          l = a.get(ta, null),
          d = a.get(Vt, null),
          h = {
            rendererFactory: u,
            sanitizer: c,
            inlineEffectRunner: null,
            afterRenderEventManager: l,
            changeDetectionScheduler: d,
          },
          f = u.createRenderer(null, this.componentDef),
          p = this.componentDef.selectors[0][0] || 'div',
          g = r
            ? Tm(f, r, this.componentDef.encapsulation, a)
            : Pl(f, p, Cy(p)),
          T = 512;
        this.componentDef.signals
          ? (T |= 4096)
          : this.componentDef.onPush || (T |= 16);
        let M = null;
        g !== null && (M = Bs(g, a, !0));
        let j = Zs(0, null, null, 1, 0, null, null, null, null, null, null),
          Y = go(null, j, null, T, null, null, h, f, a, null, M);
        Rs(Y);
        let be, mt;
        try {
          let ue = this.componentDef,
            yt,
            wo = null;
          ue.findHostDirectiveDefs
            ? ((yt = []),
              (wo = new Map()),
              ue.findHostDirectiveDefs(ue, yt, wo),
              yt.push(ue))
            : (yt = [ue]);
          let af = by(Y, g),
            uf = _y(af, g, ue, yt, Y, h, f);
          (mt = xs(j, B)),
            g && Sy(f, ue, g, r),
            n !== void 0 && Ty(mt, this.ngContentSelectors, n),
            (be = xy(uf, ue, yt, wo, Y, [Ny])),
            Ks(j, Y, null);
        } finally {
          Ps();
        }
        return new zi(this.componentType, be, Gt(mt, Y), Y, mt);
      } finally {
        b(i);
      }
    }
  },
  zi = class extends Bi {
    constructor(t, n, r, o, i) {
      super(),
        (this.location = r),
        (this._rootLView = o),
        (this._tNode = i),
        (this.previousInputValues = null),
        (this.instance = n),
        (this.hostView = this.changeDetectorRef = new ft(o, void 0, !1)),
        (this.componentType = t);
    }
    setInput(t, n) {
      let r = this._tNode.inputs,
        o;
      if (r !== null && (o = r[t])) {
        if (
          ((this.previousInputValues ??= new Map()),
          this.previousInputValues.has(t) &&
            Object.is(this.previousInputValues.get(t), n))
        )
          return;
        let i = this._rootLView;
        Qs(i[E], i, o, t, n), this.previousInputValues.set(t, n);
        let s = Ze(this._tNode.index, i);
        Js(s, 1);
      }
    }
    get injector() {
      return new ot(this._tNode, this._rootLView);
    }
    destroy() {
      this.hostView.destroy();
    }
    onDestroy(t) {
      this.hostView.onDestroy(t);
    }
  };
function by(e, t) {
  let n = e[E],
    r = B;
  return (e[r] = t), Wt(n, r, 2, '#host', null);
}
function _y(e, t, n, r, o, i, s) {
  let a = o[E];
  My(r, e, t, s);
  let u = null;
  t !== null && (u = Bs(t, o[Pt]));
  let c = i.rendererFactory.createRenderer(t, n),
    l = 16;
  n.signals ? (l = 4096) : n.onPush && (l = 64);
  let d = go(o, Ql(n), null, l, o[e.index], e, i, c, null, null, u);
  return (
    a.firstCreatePass && Li(a, e, r.length - 1), mo(o, d), (o[e.index] = d)
  );
}
function My(e, t, n, r) {
  for (let o of e) t.mergedAttrs = dn(t.mergedAttrs, o.hostAttrs);
  t.mergedAttrs !== null &&
    (Hr(t, t.mergedAttrs, !0), n !== null && Gl(r, n, t));
}
function xy(e, t, n, r, o, i) {
  let s = V(),
    a = o[E],
    u = ae(s, o);
  Kl(a, o, s, n, null, r);
  for (let l = 0; l < n.length; l++) {
    let d = s.directiveStart + l,
      h = dt(o, a, d, s);
    We(h, o);
  }
  Jl(a, o, s), u && We(u, o);
  let c = dt(o, a, s.directiveStart + s.componentOffset, s);
  if (((e[$] = o[$] = c), i !== null)) for (let l of i) l(c, t);
  return Gs(a, s, o), c;
}
function Sy(e, t, n, r) {
  if (r) ci(e, n, ['ng-version', '18.2.0']);
  else {
    let { attrs: o, classes: i } = ip(t.selectors[0]);
    o && ci(e, n, o), i && i.length > 0 && zl(e, n, i.join(' '));
  }
}
function Ty(e, t, n) {
  let r = (e.projection = []);
  for (let o = 0; o < t.length; o++) {
    let i = n[o];
    r.push(i != null ? Array.from(i) : null);
  }
}
function Ny() {
  let e = V();
  co(D()[E], e);
}
var xn = (() => {
  let t = class t {};
  t.__NG_ELEMENT_ID__ = Ay;
  let e = t;
  return e;
})();
function Ay() {
  let e = V();
  return vd(e, D());
}
var Oy = xn,
  yd = class extends Oy {
    constructor(t, n, r) {
      super(),
        (this._lContainer = t),
        (this._hostTNode = n),
        (this._hostLView = r);
    }
    get element() {
      return Gt(this._hostTNode, this._hostLView);
    }
    get injector() {
      return new ot(this._hostTNode, this._hostLView);
    }
    get parentInjector() {
      let t = ks(this._hostTNode, this._hostLView);
      if (sl(t)) {
        let n = Or(t, this._hostLView),
          r = Ar(t),
          o = n[E].data[r + 8];
        return new ot(o, n);
      } else return new ot(null, this._hostLView);
    }
    clear() {
      for (; this.length > 0; ) this.remove(this.length - 1);
    }
    get(t) {
      let n = Gu(this._lContainer);
      return (n !== null && n[t]) || null;
    }
    get length() {
      return this._lContainer.length - H;
    }
    createEmbeddedView(t, n, r) {
      let o, i;
      typeof r == 'number'
        ? (o = r)
        : r != null && ((o = r.index), (i = r.injector));
      let s = jt(this._lContainer, t.ssrId),
        a = t.createEmbeddedViewImpl(n || {}, i, s);
      return this.insertImpl(a, o, Lt(this._hostTNode, s)), a;
    }
    createComponent(t, n, r, o, i) {
      let s = t && !Cp(t),
        a;
      if (s) a = n;
      else {
        let p = n || {};
        (a = p.index),
          (r = p.injector),
          (o = p.projectableNodes),
          (i = p.environmentInjector || p.ngModuleRef);
      }
      let u = s ? t : new $t(He(t)),
        c = r || this.parentInjector;
      if (!i && u.ngModule == null) {
        let g = (s ? c : this.parentInjector).get(Ue, null);
        g && (i = g);
      }
      let l = He(u.componentType ?? {}),
        d = jt(this._lContainer, l?.id ?? null),
        h = d?.firstChild ?? null,
        f = u.create(c, o, h, i);
      return this.insertImpl(f.hostView, a, Lt(this._hostTNode, d)), f;
    }
    insert(t, n) {
      return this.insertImpl(t, n, !0);
    }
    insertImpl(t, n, r) {
      let o = t._lView;
      if (Np(o)) {
        let a = this.indexOf(t);
        if (a !== -1) this.detach(a);
        else {
          let u = o[z],
            c = new yd(u, u[te], u[z]);
          c.detach(c.indexOf(t));
        }
      }
      let i = this._adjustIndex(n),
        s = this._lContainer;
      return Mn(s, o, i, r), t.attachToViewContainerRef(), yc(Xo(s), i, t), t;
    }
    move(t, n) {
      return this.insert(t, n);
    }
    indexOf(t) {
      let n = Gu(this._lContainer);
      return n !== null ? n.indexOf(t) : -1;
    }
    remove(t) {
      let n = this._adjustIndex(t, -1),
        r = gn(this._lContainer, n);
      r && (_r(Xo(this._lContainer), n), fo(r[E], r));
    }
    detach(t) {
      let n = this._adjustIndex(t, -1),
        r = gn(this._lContainer, n);
      return r && _r(Xo(this._lContainer), n) != null ? new ft(r) : null;
    }
    _adjustIndex(t, n = 0) {
      return t ?? this.length + n;
    }
  };
function Gu(e) {
  return e[Tr];
}
function Xo(e) {
  return e[Tr] || (e[Tr] = []);
}
function vd(e, t) {
  let n,
    r = t[e.index];
  return (
    Oe(r) ? (n = r) : ((n = Xl(r, t, null, e)), (t[e.index] = n), mo(t, n)),
    Ry(n, t, e, r),
    new yd(n, e, t)
  );
}
function Fy(e, t) {
  let n = e[R],
    r = n.createComment(''),
    o = ae(t, e),
    i = Bl(n, o);
  return jr(n, i, r, vm(n, o), !1), r;
}
var Ry = Ly,
  Py = () => !1;
function ky(e, t, n) {
  return Py(e, t, n);
}
function Ly(e, t, n, r) {
  if (e[at]) return;
  let o;
  n.type & 8 ? (o = Ee(r)) : (o = Fy(t, n)), (e[at] = o);
}
var Gi = class e {
    constructor(t) {
      (this.queryList = t), (this.matches = null);
    }
    clone() {
      return new e(this.queryList);
    }
    setDirty() {
      this.queryList.setDirty();
    }
  },
  Wi = class e {
    constructor(t = []) {
      this.queries = t;
    }
    createEmbeddedView(t) {
      let n = t.queries;
      if (n !== null) {
        let r = t.contentQueries !== null ? t.contentQueries[0] : n.length,
          o = [];
        for (let i = 0; i < r; i++) {
          let s = n.getByIndex(i),
            a = this.queries[s.indexInDeclarationView];
          o.push(a.clone());
        }
        return new e(o);
      }
      return null;
    }
    insertView(t) {
      this.dirtyQueriesWithMatches(t);
    }
    detachView(t) {
      this.dirtyQueriesWithMatches(t);
    }
    finishViewCreation(t) {
      this.dirtyQueriesWithMatches(t);
    }
    dirtyQueriesWithMatches(t) {
      for (let n = 0; n < this.queries.length; n++)
        ra(t, n).matches !== null && this.queries[n].setDirty();
    }
  },
  zr = class {
    constructor(t, n, r = null) {
      (this.flags = n),
        (this.read = r),
        typeof t == 'string' ? (this.predicate = Uy(t)) : (this.predicate = t);
    }
  },
  qi = class e {
    constructor(t = []) {
      this.queries = t;
    }
    elementStart(t, n) {
      for (let r = 0; r < this.queries.length; r++)
        this.queries[r].elementStart(t, n);
    }
    elementEnd(t) {
      for (let n = 0; n < this.queries.length; n++)
        this.queries[n].elementEnd(t);
    }
    embeddedTView(t) {
      let n = null;
      for (let r = 0; r < this.length; r++) {
        let o = n !== null ? n.length : 0,
          i = this.getByIndex(r).embeddedTView(t, o);
        i &&
          ((i.indexInDeclarationView = r), n !== null ? n.push(i) : (n = [i]));
      }
      return n !== null ? new e(n) : null;
    }
    template(t, n) {
      for (let r = 0; r < this.queries.length; r++)
        this.queries[r].template(t, n);
    }
    getByIndex(t) {
      return this.queries[t];
    }
    get length() {
      return this.queries.length;
    }
    track(t) {
      this.queries.push(t);
    }
  },
  Zi = class e {
    constructor(t, n = -1) {
      (this.metadata = t),
        (this.matches = null),
        (this.indexInDeclarationView = -1),
        (this.crossesNgTemplate = !1),
        (this._appliesToNextNode = !0),
        (this._declarationNodeIndex = n);
    }
    elementStart(t, n) {
      this.isApplyingToNode(n) && this.matchTNode(t, n);
    }
    elementEnd(t) {
      this._declarationNodeIndex === t.index && (this._appliesToNextNode = !1);
    }
    template(t, n) {
      this.elementStart(t, n);
    }
    embeddedTView(t, n) {
      return this.isApplyingToNode(t)
        ? ((this.crossesNgTemplate = !0),
          this.addMatch(-t.index, n),
          new e(this.metadata))
        : null;
    }
    isApplyingToNode(t) {
      if (this._appliesToNextNode && (this.metadata.flags & 1) !== 1) {
        let n = this._declarationNodeIndex,
          r = t.parent;
        for (; r !== null && r.type & 8 && r.index !== n; ) r = r.parent;
        return n === (r !== null ? r.index : -1);
      }
      return this._appliesToNextNode;
    }
    matchTNode(t, n) {
      let r = this.metadata.predicate;
      if (Array.isArray(r))
        for (let o = 0; o < r.length; o++) {
          let i = r[o];
          this.matchTNodeWithReadOption(t, n, jy(n, i)),
            this.matchTNodeWithReadOption(t, n, Dr(n, t, i, !1, !1));
        }
      else
        r === mn
          ? n.type & 4 && this.matchTNodeWithReadOption(t, n, -1)
          : this.matchTNodeWithReadOption(t, n, Dr(n, t, r, !1, !1));
    }
    matchTNodeWithReadOption(t, n, r) {
      if (r !== null) {
        let o = this.metadata.read;
        if (o !== null)
          if (o === gt || o === xn || (o === mn && n.type & 4))
            this.addMatch(n.index, -2);
          else {
            let i = Dr(n, t, o, !1, !1);
            i !== null && this.addMatch(n.index, i);
          }
        else this.addMatch(n.index, r);
      }
    }
    addMatch(t, n) {
      this.matches === null ? (this.matches = [t, n]) : this.matches.push(t, n);
    }
  };
function jy(e, t) {
  let n = e.localNames;
  if (n !== null) {
    for (let r = 0; r < n.length; r += 2) if (n[r] === t) return n[r + 1];
  }
  return null;
}
function Vy(e, t) {
  return e.type & 11 ? Gt(e, t) : e.type & 4 ? yo(e, t) : null;
}
function By(e, t, n, r) {
  return n === -1 ? Vy(t, e) : n === -2 ? $y(e, t, r) : dt(e, e[E], n, t);
}
function $y(e, t, n) {
  if (n === gt) return Gt(t, e);
  if (n === mn) return yo(t, e);
  if (n === xn) return vd(t, e);
}
function Dd(e, t, n, r) {
  let o = t[Se].queries[r];
  if (o.matches === null) {
    let i = e.data,
      s = n.matches,
      a = [];
    for (let u = 0; s !== null && u < s.length; u += 2) {
      let c = s[u];
      if (c < 0) a.push(null);
      else {
        let l = i[c];
        a.push(By(t, l, s[u + 1], n.metadata.read));
      }
    }
    o.matches = a;
  }
  return o.matches;
}
function Yi(e, t, n, r) {
  let o = e.queries.getByIndex(n),
    i = o.matches;
  if (i !== null) {
    let s = Dd(e, t, o, n);
    for (let a = 0; a < i.length; a += 2) {
      let u = i[a];
      if (u > 0) r.push(s[a / 2]);
      else {
        let c = i[a + 1],
          l = t[-u];
        for (let d = H; d < l.length; d++) {
          let h = l[d];
          h[st] === h[z] && Yi(h[E], h, c, r);
        }
        if (l[kt] !== null) {
          let d = l[kt];
          for (let h = 0; h < d.length; h++) {
            let f = d[h];
            Yi(f[E], f, c, r);
          }
        }
      }
    }
  }
  return r;
}
function na(e, t) {
  return e[Se].queries[t].queryList;
}
function Id(e, t, n) {
  let r = new Mi((n & 4) === 4);
  return (
    Om(e, t, r, r.destroy), (t[Se] ??= new Wi()).queries.push(new Gi(r)) - 1
  );
}
function Hy(e, t, n) {
  let r = F();
  return (
    r.firstCreatePass &&
      (wd(r, new zr(e, t, n), -1), (t & 2) === 2 && (r.staticViewQueries = !0)),
    Id(r, D(), t)
  );
}
function Ed(e, t, n, r) {
  let o = F();
  if (o.firstCreatePass) {
    let i = V();
    wd(o, new zr(t, n, r), i.index),
      zy(o, e),
      (n & 2) === 2 && (o.staticContentQueries = !0);
  }
  return Id(o, D(), n);
}
function Uy(e) {
  return e.split(',').map((t) => t.trim());
}
function wd(e, t, n) {
  e.queries === null && (e.queries = new qi()), e.queries.track(new Zi(t, n));
}
function zy(e, t) {
  let n = e.contentQueries || (e.contentQueries = []),
    r = n.length ? n[n.length - 1] : -1;
  t !== r && n.push(e.queries.length - 1, t);
}
function ra(e, t) {
  return e.queries.getByIndex(t);
}
function Cd(e, t) {
  let n = e[E],
    r = ra(n, t);
  return r.crossesNgTemplate ? Yi(n, e, t, []) : Dd(n, e, r, t);
}
function Gy(e) {
  return typeof e == 'function' && e[Q] !== void 0;
}
function Wy(e, t) {
  Ce('NgSignals');
  let n = Fa(e),
    r = n[Q];
  return (
    t?.equal && (r.equal = t.equal),
    (n.set = (o) => Kt(r, o)),
    (n.update = (o) => Ra(r, o)),
    (n.asReadonly = bd.bind(n)),
    n
  );
}
function bd() {
  let e = this[Q];
  if (e.readonlyFn === void 0) {
    let t = () => this();
    (t[Q] = e), (e.readonlyFn = t);
  }
  return e.readonlyFn;
}
function _d(e) {
  return Gy(e) && typeof e.set == 'function';
}
function Md(e, t) {
  let n,
    r = So(() => {
      n._dirtyCounter();
      let o = Qy(n, e);
      if (t && o === void 0) throw new _(-951, !1);
      return o;
    });
  return (n = r[Q]), (n._dirtyCounter = Wy(0)), (n._flatValue = void 0), r;
}
function qy() {
  return Md(!0, !1);
}
function Zy() {
  return Md(!0, !0);
}
function Yy(e, t) {
  let n = e[Q];
  (n._lView = D()),
    (n._queryIndex = t),
    (n._queryList = na(n._lView, t)),
    n._queryList.onDirty(() => n._dirtyCounter.update((r) => r + 1));
}
function Qy(e, t) {
  let n = e._lView,
    r = e._queryIndex;
  if (n === void 0 || r === void 0 || n[y] & 4) return t ? void 0 : q;
  let o = na(n, r),
    i = Cd(n, r);
  return (
    o.reset(i, vl),
    t
      ? o.first
      : o._changesDetected || e._flatValue === void 0
        ? (e._flatValue = o.toArray())
        : e._flatValue
  );
}
function Wu(e, t) {
  return qy();
}
function Ky(e, t) {
  return Zy();
}
var Q0 = ((Wu.required = Ky), Wu);
function xd(e) {
  let t = Object.create(ic),
    n = new _i();
  t.value = e;
  function r() {
    return Yt(t), qu(t.value), t.value;
  }
  return (
    (r[Q] = t),
    (r.asReadonly = bd.bind(r)),
    (r.set = (o) => {
      t.equal(t.value, o) || (Kt(t, o), n.emit(o));
    }),
    (r.update = (o) => {
      qu(t.value), r.set(o(t.value));
    }),
    (r.subscribe = n.subscribe.bind(n)),
    (r.destroyRef = n.destroyRef),
    r
  );
}
function qu(e) {
  if (e === Jr) throw new _(952, !1);
}
function Zu(e) {
  return xd(e);
}
function Jy() {
  return xd(Jr);
}
var K0 = ((Zu.required = Jy), Zu);
function Xy(e) {
  return Object.getPrototypeOf(e.prototype).constructor;
}
function ev(e) {
  let t = Xy(e.type),
    n = !0,
    r = [e];
  for (; t; ) {
    let o;
    if (Te(e)) o = t.ɵcmp || t.ɵdir;
    else {
      if (t.ɵcmp) throw new _(903, !1);
      o = t.ɵdir;
    }
    if (o) {
      if (n) {
        r.push(o);
        let s = e;
        (s.inputs = fr(e.inputs)),
          (s.inputTransforms = fr(e.inputTransforms)),
          (s.declaredInputs = fr(e.declaredInputs)),
          (s.outputs = fr(e.outputs));
        let a = o.hostBindings;
        a && iv(e, a);
        let u = o.viewQuery,
          c = o.contentQueries;
        if (
          (u && rv(e, u),
          c && ov(e, c),
          tv(e, o),
          Eh(e.outputs, o.outputs),
          Te(o) && o.data.animation)
        ) {
          let l = e.data;
          l.animation = (l.animation || []).concat(o.data.animation);
        }
      }
      let i = o.features;
      if (i)
        for (let s = 0; s < i.length; s++) {
          let a = i[s];
          a && a.ngInherit && a(e), a === ev && (n = !1);
        }
    }
    t = Object.getPrototypeOf(t);
  }
  nv(r);
}
function tv(e, t) {
  for (let n in t.inputs) {
    if (!t.inputs.hasOwnProperty(n) || e.inputs.hasOwnProperty(n)) continue;
    let r = t.inputs[n];
    if (
      r !== void 0 &&
      ((e.inputs[n] = r),
      (e.declaredInputs[n] = t.declaredInputs[n]),
      t.inputTransforms !== null)
    ) {
      let o = Array.isArray(r) ? r[0] : r;
      if (!t.inputTransforms.hasOwnProperty(o)) continue;
      (e.inputTransforms ??= {}), (e.inputTransforms[o] = t.inputTransforms[o]);
    }
  }
}
function nv(e) {
  let t = 0,
    n = null;
  for (let r = e.length - 1; r >= 0; r--) {
    let o = e[r];
    (o.hostVars = t += o.hostVars),
      (o.hostAttrs = dn(o.hostAttrs, (n = dn(n, o.hostAttrs))));
  }
}
function fr(e) {
  return e === Ot ? {} : e === q ? [] : e;
}
function rv(e, t) {
  let n = e.viewQuery;
  n
    ? (e.viewQuery = (r, o) => {
        t(r, o), n(r, o);
      })
    : (e.viewQuery = t);
}
function ov(e, t) {
  let n = e.contentQueries;
  n
    ? (e.contentQueries = (r, o, i) => {
        t(r, o, i), n(r, o, i);
      })
    : (e.contentQueries = t);
}
function iv(e, t) {
  let n = e.hostBindings;
  n
    ? (e.hostBindings = (r, o) => {
        t(r, o), n(r, o);
      })
    : (e.hostBindings = t);
}
function sv(e) {
  let t = e.inputConfig,
    n = {};
  for (let r in t)
    if (t.hasOwnProperty(r)) {
      let o = t[r];
      Array.isArray(o) && o[3] && (n[r] = o[3]);
    }
  e.inputTransforms = n;
}
var qe = class {},
  Qi = class {};
var Ki = class extends qe {
    constructor(t, n, r, o = !0) {
      super(),
        (this.ngModuleType = t),
        (this._parent = n),
        (this._bootstrapComponents = []),
        (this.destroyCbs = []),
        (this.componentFactoryResolver = new Ur(this));
      let i = Sc(t);
      (this._bootstrapComponents = Fl(i.bootstrap)),
        (this._r3Injector = gl(
          t,
          n,
          [
            { provide: qe, useValue: this },
            { provide: Bt, useValue: this.componentFactoryResolver },
            ...r,
          ],
          X(t),
          new Set(['environment'])
        )),
        o && this.resolveInjectorInitializers();
    }
    resolveInjectorInitializers() {
      this._r3Injector.resolveInjectorInitializers(),
        (this.instance = this._r3Injector.get(this.ngModuleType));
    }
    get injector() {
      return this._r3Injector;
    }
    destroy() {
      let t = this._r3Injector;
      !t.destroyed && t.destroy(),
        this.destroyCbs.forEach((n) => n()),
        (this.destroyCbs = null);
    }
    onDestroy(t) {
      this.destroyCbs.push(t);
    }
  },
  Ji = class extends Qi {
    constructor(t) {
      super(), (this.moduleType = t);
    }
    create(t) {
      return new Ki(this.moduleType, t, []);
    }
  };
var Gr = class extends qe {
  constructor(t) {
    super(),
      (this.componentFactoryResolver = new Ur(this)),
      (this.instance = null);
    let n = new fn(
      [
        ...t.providers,
        { provide: qe, useValue: this },
        { provide: Bt, useValue: this.componentFactoryResolver },
      ],
      t.parent || ws(),
      t.debugName,
      new Set(['environment'])
    );
    (this.injector = n),
      t.runEnvironmentInitializers && n.resolveInjectorInitializers();
  }
  destroy() {
    this.injector.destroy();
  }
  onDestroy(t) {
    this.injector.onDestroy(t);
  }
};
function av(e, t, n = null) {
  return new Gr({
    providers: e,
    parent: t,
    debugName: n,
    runEnvironmentInitializers: !0,
  }).injector;
}
function Sd(e) {
  return cv(e)
    ? Array.isArray(e) || (!(e instanceof Map) && Symbol.iterator in e)
    : !1;
}
function uv(e, t) {
  if (Array.isArray(e)) for (let n = 0; n < e.length; n++) t(e[n]);
  else {
    let n = e[Symbol.iterator](),
      r;
    for (; !(r = n.next()).done; ) t(r.value);
  }
}
function cv(e) {
  return e !== null && (typeof e == 'function' || typeof e == 'object');
}
function lv(e, t, n) {
  return (e[t] = n);
}
function re(e, t, n) {
  let r = e[t];
  return Object.is(r, n) ? !1 : ((e[t] = n), !0);
}
function dv(e, t, n, r) {
  let o = re(e, t, n);
  return re(e, t + 1, r) || o;
}
function fv(e) {
  return (e.flags & 32) === 32;
}
function hv(e, t, n, r, o, i, s, a, u) {
  let c = t.consts,
    l = Wt(t, e, 4, s || null, a || null);
  Ys(t, n, l, ze(c, u)), co(t, l);
  let d = (l.tView = Zs(
    2,
    l,
    r,
    o,
    i,
    t.directiveRegistry,
    t.pipeRegistry,
    null,
    t.schemas,
    c,
    null
  ));
  return (
    t.queries !== null &&
      (t.queries.template(t, l), (d.queries = t.queries.embeddedTView(l))),
    l
  );
}
function Wr(e, t, n, r, o, i, s, a, u, c) {
  let l = n + B,
    d = t.firstCreatePass ? hv(l, t, e, r, o, i, s, a, u) : t.data[l];
  pt(d, !1);
  let h = gv(t, e, d, n);
  ao() && ho(t, e, h, d), We(h, e);
  let f = Xl(h, e, h, d);
  return (
    (e[l] = f),
    mo(e, f),
    ky(f, d, e),
    oo(d) && Ws(t, e, d),
    u != null && qs(e, d, c),
    d
  );
}
function pv(e, t, n, r, o, i, s, a) {
  let u = D(),
    c = F(),
    l = ze(c.consts, i);
  return Wr(u, c, e, t, n, r, o, l, s, a), pv;
}
var gv = mv;
function mv(e, t, n, r) {
  return uo(!0), t[R].createComment('');
}
function yv(e, t, n, r) {
  let o = D(),
    i = Ye();
  if (re(o, i, t)) {
    let s = F(),
      a = zt();
    qm(a, o, e, t, n, r);
  }
  return yv;
}
function oa(e, t, n, r) {
  return re(e, Ye(), n) ? t + At(n) + r : oe;
}
function vv(e, t, n, r, o, i) {
  let s = $p(),
    a = dv(e, s, n, o);
  return As(2), a ? t + At(n) + r + At(o) + i : oe;
}
function hr(e, t) {
  return (e << 17) | (t << 2);
}
function ht(e) {
  return (e >> 17) & 32767;
}
function Dv(e) {
  return (e & 2) == 2;
}
function Iv(e, t) {
  return (e & 131071) | (t << 17);
}
function Xi(e) {
  return e | 2;
}
function Ht(e) {
  return (e & 131068) >> 2;
}
function ei(e, t) {
  return (e & -131069) | (t << 2);
}
function Ev(e) {
  return (e & 1) === 1;
}
function es(e) {
  return e | 1;
}
function wv(e, t, n, r, o, i) {
  let s = i ? t.classBindings : t.styleBindings,
    a = ht(s),
    u = Ht(s);
  e[r] = n;
  let c = !1,
    l;
  if (Array.isArray(n)) {
    let d = n;
    (l = d[1]), (l === null || Dn(d, l) > 0) && (c = !0);
  } else l = n;
  if (o)
    if (u !== 0) {
      let h = ht(e[a + 1]);
      (e[r + 1] = hr(h, a)),
        h !== 0 && (e[h + 1] = ei(e[h + 1], r)),
        (e[a + 1] = Iv(e[a + 1], r));
    } else
      (e[r + 1] = hr(a, 0)), a !== 0 && (e[a + 1] = ei(e[a + 1], r)), (a = r);
  else
    (e[r + 1] = hr(u, 0)),
      a === 0 ? (a = r) : (e[u + 1] = ei(e[u + 1], r)),
      (u = r);
  c && (e[r + 1] = Xi(e[r + 1])),
    Yu(e, l, r, !0),
    Yu(e, l, r, !1),
    Cv(t, l, e, r, i),
    (s = hr(a, u)),
    i ? (t.classBindings = s) : (t.styleBindings = s);
}
function Cv(e, t, n, r, o) {
  let i = o ? e.residualClasses : e.residualStyles;
  i != null &&
    typeof t == 'string' &&
    Dn(i, t) >= 0 &&
    (n[r + 1] = es(n[r + 1]));
}
function Yu(e, t, n, r) {
  let o = e[n + 1],
    i = t === null,
    s = r ? ht(o) : Ht(o),
    a = !1;
  for (; s !== 0 && (a === !1 || i); ) {
    let u = e[s],
      c = e[s + 1];
    bv(u, t) && ((a = !0), (e[s + 1] = r ? es(c) : Xi(c))),
      (s = r ? ht(c) : Ht(c));
  }
  a && (e[n + 1] = r ? Xi(o) : es(o));
}
function bv(e, t) {
  return e === null || t == null || (Array.isArray(e) ? e[1] : e) === t
    ? !0
    : Array.isArray(e) && typeof t == 'string'
      ? Dn(e, t) >= 0
      : !1;
}
var de = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
function _v(e) {
  return e.substring(de.key, de.keyEnd);
}
function Mv(e) {
  return xv(e), Td(e, Nd(e, 0, de.textEnd));
}
function Td(e, t) {
  let n = de.textEnd;
  return n === t ? -1 : ((t = de.keyEnd = Sv(e, (de.key = t), n)), Nd(e, t, n));
}
function xv(e) {
  (de.key = 0),
    (de.keyEnd = 0),
    (de.value = 0),
    (de.valueEnd = 0),
    (de.textEnd = e.length);
}
function Nd(e, t, n) {
  for (; t < n && e.charCodeAt(t) <= 32; ) t++;
  return t;
}
function Sv(e, t, n) {
  for (; t < n && e.charCodeAt(t) > 32; ) t++;
  return t;
}
function Tv(e, t, n) {
  let r = D(),
    o = Ye();
  if (re(r, o, t)) {
    let i = F(),
      s = zt();
    bn(i, s, r, e, t, r[R], n, !1);
  }
  return Tv;
}
function ts(e, t, n, r, o) {
  let i = t.inputs,
    s = o ? 'class' : 'style';
  Qs(e, n, i[s], s, r);
}
function Ad(e, t, n) {
  return Fd(e, t, n, !1), Ad;
}
function Nv(e, t) {
  return Fd(e, t, null, !0), Nv;
}
function J0(e) {
  Rd(kv, Od, e, !0);
}
function Od(e, t) {
  for (let n = Mv(t); n >= 0; n = Td(t, n)) to(e, _v(t), !0);
}
function Fd(e, t, n, r) {
  let o = D(),
    i = F(),
    s = As(2);
  if ((i.firstUpdatePass && kd(i, e, s, r), t !== oe && re(o, s, t))) {
    let a = i.data[Fe()];
    Ld(i, a, o, o[R], e, (o[s + 1] = jv(t, n)), r, s);
  }
}
function Rd(e, t, n, r) {
  let o = F(),
    i = As(2);
  o.firstUpdatePass && kd(o, null, i, r);
  let s = D();
  if (n !== oe && re(s, i, n)) {
    let a = o.data[Fe()];
    if (jd(a, r) && !Pd(o, i)) {
      let u = r ? a.classesWithoutHost : a.stylesWithoutHost;
      u !== null && (n = ii(u, n || '')), ts(o, a, s, n, r);
    } else Lv(o, a, s, s[R], s[i + 1], (s[i + 1] = Pv(e, t, n)), r, i);
  }
}
function Pd(e, t) {
  return t >= e.expandoStartIndex;
}
function kd(e, t, n, r) {
  let o = e.data;
  if (o[n + 1] === null) {
    let i = o[Fe()],
      s = Pd(e, n);
    jd(i, r) && t === null && !s && (t = !1),
      (t = Av(o, i, t, r)),
      wv(o, i, t, n, s, r);
  }
}
function Av(e, t, n, r) {
  let o = Os(e),
    i = r ? t.residualClasses : t.residualStyles;
  if (o === null)
    (r ? t.classBindings : t.styleBindings) === 0 &&
      ((n = ti(null, e, t, n, r)), (n = yn(n, t.attrs, r)), (i = null));
  else {
    let s = t.directiveStylingLast;
    if (s === -1 || e[s] !== o)
      if (((n = ti(o, e, t, n, r)), i === null)) {
        let u = Ov(e, t, r);
        u !== void 0 &&
          Array.isArray(u) &&
          ((u = ti(null, e, t, u[1], r)),
          (u = yn(u, t.attrs, r)),
          Fv(e, t, r, u));
      } else i = Rv(e, t, r);
  }
  return (
    i !== void 0 && (r ? (t.residualClasses = i) : (t.residualStyles = i)), n
  );
}
function Ov(e, t, n) {
  let r = n ? t.classBindings : t.styleBindings;
  if (Ht(r) !== 0) return e[ht(r)];
}
function Fv(e, t, n, r) {
  let o = n ? t.classBindings : t.styleBindings;
  e[ht(o)] = r;
}
function Rv(e, t, n) {
  let r,
    o = t.directiveEnd;
  for (let i = 1 + t.directiveStylingLast; i < o; i++) {
    let s = e[i].hostAttrs;
    r = yn(r, s, n);
  }
  return yn(r, t.attrs, n);
}
function ti(e, t, n, r, o) {
  let i = null,
    s = n.directiveEnd,
    a = n.directiveStylingLast;
  for (
    a === -1 ? (a = n.directiveStart) : a++;
    a < s && ((i = t[a]), (r = yn(r, i.hostAttrs, o)), i !== e);

  )
    a++;
  return e !== null && (n.directiveStylingLast = a), r;
}
function yn(e, t, n) {
  let r = n ? 1 : 2,
    o = -1;
  if (t !== null)
    for (let i = 0; i < t.length; i++) {
      let s = t[i];
      typeof s == 'number'
        ? (o = s)
        : o === r &&
          (Array.isArray(e) || (e = e === void 0 ? [] : ['', e]),
          to(e, s, n ? !0 : t[++i]));
    }
  return e === void 0 ? null : e;
}
function Pv(e, t, n) {
  if (n == null || n === '') return q;
  let r = [],
    o = wn(n);
  if (Array.isArray(o)) for (let i = 0; i < o.length; i++) e(r, o[i], !0);
  else if (typeof o == 'object')
    for (let i in o) o.hasOwnProperty(i) && e(r, i, o[i]);
  else typeof o == 'string' && t(r, o);
  return r;
}
function kv(e, t, n) {
  let r = String(t);
  r !== '' && !r.includes(' ') && to(e, r, n);
}
function Lv(e, t, n, r, o, i, s, a) {
  o === oe && (o = q);
  let u = 0,
    c = 0,
    l = 0 < o.length ? o[0] : null,
    d = 0 < i.length ? i[0] : null;
  for (; l !== null || d !== null; ) {
    let h = u < o.length ? o[u + 1] : void 0,
      f = c < i.length ? i[c + 1] : void 0,
      p = null,
      g;
    l === d
      ? ((u += 2), (c += 2), h !== f && ((p = d), (g = f)))
      : d === null || (l !== null && l < d)
        ? ((u += 2), (p = l))
        : ((c += 2), (p = d), (g = f)),
      p !== null && Ld(e, t, n, r, p, g, s, a),
      (l = u < o.length ? o[u] : null),
      (d = c < i.length ? i[c] : null);
  }
}
function Ld(e, t, n, r, o, i, s, a) {
  if (!(t.type & 3)) return;
  let u = e.data,
    c = u[a + 1],
    l = Ev(c) ? Qu(u, t, n, o, Ht(c), s) : void 0;
  if (!qr(l)) {
    qr(i) || (Dv(c) && (i = Qu(u, null, n, o, a, s)));
    let d = Uc(Fe(), n);
    bm(r, s, d, o, i);
  }
}
function Qu(e, t, n, r, o, i) {
  let s = t === null,
    a;
  for (; o > 0; ) {
    let u = e[o],
      c = Array.isArray(u),
      l = c ? u[1] : u,
      d = l === null,
      h = n[o + 1];
    h === oe && (h = d ? q : void 0);
    let f = d ? Wo(h, r) : l === r ? h : void 0;
    if ((c && !qr(f) && (f = Wo(u, r)), qr(f) && ((a = f), s))) return a;
    let p = e[o + 1];
    o = s ? ht(p) : Ht(p);
  }
  if (t !== null) {
    let u = i ? t.residualClasses : t.residualStyles;
    u != null && (a = Wo(u, r));
  }
  return a;
}
function qr(e) {
  return e !== void 0;
}
function jv(e, t) {
  return (
    e == null ||
      e === '' ||
      (typeof t == 'string'
        ? (e = e + t)
        : typeof e == 'object' && (e = X(wn(e)))),
    e
  );
}
function jd(e, t) {
  return (e.flags & (t ? 8 : 16)) !== 0;
}
function X0(e, t, n) {
  let r = D(),
    o = oa(r, e, t, n);
  Rd(to, Od, o, !0);
}
var ns = class {
  destroy(t) {}
  updateValue(t, n) {}
  swap(t, n) {
    let r = Math.min(t, n),
      o = Math.max(t, n),
      i = this.detach(o);
    if (o - r > 1) {
      let s = this.detach(r);
      this.attach(r, i), this.attach(o, s);
    } else this.attach(r, i);
  }
  move(t, n) {
    this.attach(n, this.detach(t));
  }
};
function ni(e, t, n, r, o) {
  return e === n && Object.is(t, r) ? 1 : Object.is(o(e, t), o(n, r)) ? -1 : 0;
}
function Vv(e, t, n) {
  let r,
    o,
    i = 0,
    s = e.length - 1,
    a = void 0;
  if (Array.isArray(t)) {
    let u = t.length - 1;
    for (; i <= s && i <= u; ) {
      let c = e.at(i),
        l = t[i],
        d = ni(i, c, i, l, n);
      if (d !== 0) {
        d < 0 && e.updateValue(i, l), i++;
        continue;
      }
      let h = e.at(s),
        f = t[u],
        p = ni(s, h, u, f, n);
      if (p !== 0) {
        p < 0 && e.updateValue(s, f), s--, u--;
        continue;
      }
      let g = n(i, c),
        T = n(s, h),
        M = n(i, l);
      if (Object.is(M, T)) {
        let j = n(u, f);
        Object.is(j, g)
          ? (e.swap(i, s), e.updateValue(s, f), u--, s--)
          : e.move(s, i),
          e.updateValue(i, l),
          i++;
        continue;
      }
      if (((r ??= new Zr()), (o ??= Ju(e, i, s, n)), rs(e, r, i, M)))
        e.updateValue(i, l), i++, s++;
      else if (o.has(M)) r.set(g, e.detach(i)), s--;
      else {
        let j = e.create(i, t[i]);
        e.attach(i, j), i++, s++;
      }
    }
    for (; i <= u; ) Ku(e, r, n, i, t[i]), i++;
  } else if (t != null) {
    let u = t[Symbol.iterator](),
      c = u.next();
    for (; !c.done && i <= s; ) {
      let l = e.at(i),
        d = c.value,
        h = ni(i, l, i, d, n);
      if (h !== 0) h < 0 && e.updateValue(i, d), i++, (c = u.next());
      else {
        (r ??= new Zr()), (o ??= Ju(e, i, s, n));
        let f = n(i, d);
        if (rs(e, r, i, f)) e.updateValue(i, d), i++, s++, (c = u.next());
        else if (!o.has(f))
          e.attach(i, e.create(i, d)), i++, s++, (c = u.next());
        else {
          let p = n(i, l);
          r.set(p, e.detach(i)), s--;
        }
      }
    }
    for (; !c.done; ) Ku(e, r, n, e.length, c.value), (c = u.next());
  }
  for (; i <= s; ) e.destroy(e.detach(s--));
  r?.forEach((u) => {
    e.destroy(u);
  });
}
function rs(e, t, n, r) {
  return t !== void 0 && t.has(r)
    ? (e.attach(n, t.get(r)), t.delete(r), !0)
    : !1;
}
function Ku(e, t, n, r, o) {
  if (rs(e, t, r, n(r, o))) e.updateValue(r, o);
  else {
    let i = e.create(r, o);
    e.attach(r, i);
  }
}
function Ju(e, t, n, r) {
  let o = new Set();
  for (let i = t; i <= n; i++) o.add(r(i, e.at(i)));
  return o;
}
var Zr = class {
  constructor() {
    (this.kvMap = new Map()), (this._vMap = void 0);
  }
  has(t) {
    return this.kvMap.has(t);
  }
  delete(t) {
    if (!this.has(t)) return !1;
    let n = this.kvMap.get(t);
    return (
      this._vMap !== void 0 && this._vMap.has(n)
        ? (this.kvMap.set(t, this._vMap.get(n)), this._vMap.delete(n))
        : this.kvMap.delete(t),
      !0
    );
  }
  get(t) {
    return this.kvMap.get(t);
  }
  set(t, n) {
    if (this.kvMap.has(t)) {
      let r = this.kvMap.get(t);
      this._vMap === void 0 && (this._vMap = new Map());
      let o = this._vMap;
      for (; o.has(r); ) r = o.get(r);
      o.set(r, n);
    } else this.kvMap.set(t, n);
  }
  forEach(t) {
    for (let [n, r] of this.kvMap)
      if ((t(r, n), this._vMap !== void 0)) {
        let o = this._vMap;
        for (; o.has(r); ) (r = o.get(r)), t(r, n);
      }
  }
};
function ex(e, t) {
  Ce('NgControlFlow');
  let n = D(),
    r = Ye(),
    o = n[r] !== oe ? n[r] : -1,
    i = o !== -1 ? Yr(n, B + o) : void 0,
    s = 0;
  if (re(n, r, e)) {
    let a = b(null);
    try {
      if ((i !== void 0 && ad(i, s), e !== -1)) {
        let u = B + e,
          c = Yr(n, u),
          l = as(n[E], u),
          d = jt(c, l.tView.ssrId),
          h = _n(n, l, t, { dehydratedView: d });
        Mn(c, h, s, Lt(l, d));
      }
    } finally {
      b(a);
    }
  } else if (i !== void 0) {
    let a = sd(i, s);
    a !== void 0 && (a[$] = t);
  }
}
var os = class {
  constructor(t, n, r) {
    (this.lContainer = t), (this.$implicit = n), (this.$index = r);
  }
  get $count() {
    return this.lContainer.length - H;
  }
};
function tx(e, t) {
  return t;
}
var is = class {
  constructor(t, n, r) {
    (this.hasEmptyBlock = t), (this.trackByFn = n), (this.liveCollection = r);
  }
};
function nx(e, t, n, r, o, i, s, a, u, c, l, d, h) {
  Ce('NgControlFlow');
  let f = D(),
    p = F(),
    g = u !== void 0,
    T = D(),
    M = a ? s.bind(T[ne][$]) : s,
    j = new is(g, M);
  (T[B + e] = j),
    Wr(f, p, e + 1, t, n, r, o, ze(p.consts, i)),
    g && Wr(f, p, e + 2, u, c, l, d, ze(p.consts, h));
}
var ss = class extends ns {
  constructor(t, n, r) {
    super(),
      (this.lContainer = t),
      (this.hostLView = n),
      (this.templateTNode = r),
      (this.operationsCounter = void 0),
      (this.needsIndexUpdate = !1);
  }
  get length() {
    return this.lContainer.length - H;
  }
  at(t) {
    return this.getLView(t)[$].$implicit;
  }
  attach(t, n) {
    let r = n[Rt];
    (this.needsIndexUpdate ||= t !== this.length),
      Mn(this.lContainer, n, t, Lt(this.templateTNode, r));
  }
  detach(t) {
    return (
      (this.needsIndexUpdate ||= t !== this.length - 1), Bv(this.lContainer, t)
    );
  }
  create(t, n) {
    let r = jt(this.lContainer, this.templateTNode.tView.ssrId),
      o = _n(
        this.hostLView,
        this.templateTNode,
        new os(this.lContainer, n, t),
        { dehydratedView: r }
      );
    return this.operationsCounter?.recordCreate(), o;
  }
  destroy(t) {
    fo(t[E], t), this.operationsCounter?.recordDestroy();
  }
  updateValue(t, n) {
    this.getLView(t)[$].$implicit = n;
  }
  reset() {
    (this.needsIndexUpdate = !1), this.operationsCounter?.reset();
  }
  updateIndexes() {
    if (this.needsIndexUpdate)
      for (let t = 0; t < this.length; t++) this.getLView(t)[$].$index = t;
  }
  getLView(t) {
    return $v(this.lContainer, t);
  }
};
function rx(e) {
  let t = b(null),
    n = Fe();
  try {
    let r = D(),
      o = r[E],
      i = r[n],
      s = n + 1,
      a = Yr(r, s);
    if (i.liveCollection === void 0) {
      let c = as(o, s);
      i.liveCollection = new ss(a, r, c);
    } else i.liveCollection.reset();
    let u = i.liveCollection;
    if ((Vv(u, e, i.trackByFn), u.updateIndexes(), i.hasEmptyBlock)) {
      let c = Ye(),
        l = u.length === 0;
      if (re(r, c, l)) {
        let d = n + 2,
          h = Yr(r, d);
        if (l) {
          let f = as(o, d),
            p = jt(h, f.tView.ssrId),
            g = _n(r, f, void 0, { dehydratedView: p });
          Mn(h, g, 0, Lt(f, p));
        } else ad(h, 0);
      }
    }
  } finally {
    b(t);
  }
}
function Yr(e, t) {
  return e[t];
}
function Bv(e, t) {
  return gn(e, t);
}
function $v(e, t) {
  return sd(e, t);
}
function as(e, t) {
  return xs(e, t);
}
function Hv(e, t, n, r, o, i) {
  let s = t.consts,
    a = ze(s, o),
    u = Wt(t, e, 2, r, a);
  return (
    Ys(t, n, u, ze(s, i)),
    u.attrs !== null && Hr(u, u.attrs, !1),
    u.mergedAttrs !== null && Hr(u, u.mergedAttrs, !0),
    t.queries !== null && t.queries.elementStart(t, u),
    u
  );
}
function Vd(e, t, n, r) {
  let o = D(),
    i = F(),
    s = B + e,
    a = o[R],
    u = i.firstCreatePass ? Hv(s, i, o, t, n, r) : i.data[s],
    c = zv(i, o, u, a, t, e);
  o[s] = c;
  let l = oo(u);
  return (
    pt(u, !0),
    Gl(a, c, u),
    !fv(u) && ao() && ho(i, o, c, u),
    Fp() === 0 && We(c, o),
    Rp(),
    l && (Ws(i, o, u), Gs(i, u, o)),
    r !== null && qs(o, u),
    Vd
  );
}
function Bd() {
  let e = V();
  Ts() ? Ns() : ((e = e.parent), pt(e, !1));
  let t = e;
  kp(t) && Lp(), Pp();
  let n = F();
  return (
    n.firstCreatePass && (co(n, e), _s(e) && n.queries.elementEnd(e)),
    t.classesWithoutHost != null &&
      Xp(t) &&
      ts(n, t, D(), t.classesWithoutHost, !0),
    t.stylesWithoutHost != null &&
      eg(t) &&
      ts(n, t, D(), t.stylesWithoutHost, !1),
    Bd
  );
}
function Uv(e, t, n, r) {
  return Vd(e, t, n, r), Bd(), Uv;
}
var zv = (e, t, n, r, o, i) => (uo(!0), Pl(r, o, Yp()));
function Gv(e, t, n, r, o) {
  let i = t.consts,
    s = ze(i, r),
    a = Wt(t, e, 8, 'ng-container', s);
  s !== null && Hr(a, s, !0);
  let u = ze(i, o);
  return Ys(t, n, a, u), t.queries !== null && t.queries.elementStart(t, a), a;
}
function $d(e, t, n) {
  let r = D(),
    o = F(),
    i = e + B,
    s = o.firstCreatePass ? Gv(i, o, r, t, n) : o.data[i];
  pt(s, !0);
  let a = qv(o, r, s, e);
  return (
    (r[i] = a),
    ao() && ho(o, r, a, s),
    We(a, r),
    oo(s) && (Ws(o, r, s), Gs(o, s, r)),
    n != null && qs(r, s),
    $d
  );
}
function Hd() {
  let e = V(),
    t = F();
  return (
    Ts() ? Ns() : ((e = e.parent), pt(e, !1)),
    t.firstCreatePass && (co(t, e), _s(e) && t.queries.elementEnd(e)),
    Hd
  );
}
function Wv(e, t, n) {
  return $d(e, t, n), Hd(), Wv;
}
var qv = (e, t, n, r) => (uo(!0), lm(t[R], ''));
function ox() {
  return D();
}
function Zv(e, t, n) {
  let r = D(),
    o = Ye();
  if (re(r, o, t)) {
    let i = F(),
      s = zt();
    bn(i, s, r, e, t, r[R], n, !0);
  }
  return Zv;
}
function Yv(e, t, n) {
  let r = D(),
    o = Ye();
  if (re(r, o, t)) {
    let i = F(),
      s = zt(),
      a = Os(i.data),
      u = rd(a, s, r);
    bn(i, s, r, e, t, u, n, !0);
  }
  return Yv;
}
var Qr = 'en-US';
var Qv = Qr;
function Kv(e) {
  typeof e == 'string' && (Qv = e.toLowerCase().replace(/_/g, '-'));
}
var Jv = (e, t, n) => {};
function Xv(e, t, n, r) {
  let o = D(),
    i = F(),
    s = V();
  return ia(i, o, o[R], s, e, t, r), Xv;
}
function eD(e, t) {
  let n = V(),
    r = D(),
    o = F(),
    i = Os(o.data),
    s = rd(i, n, r);
  return ia(o, r, s, n, e, t), eD;
}
function tD(e, t, n, r) {
  let o = e.cleanup;
  if (o != null)
    for (let i = 0; i < o.length - 1; i += 2) {
      let s = o[i];
      if (s === n && o[i + 1] === r) {
        let a = t[Sr],
          u = o[i + 2];
        return a.length > u ? a[u] : null;
      }
      typeof s == 'string' && (i += 2);
    }
  return null;
}
function ia(e, t, n, r, o, i, s) {
  let a = oo(r),
    c = e.firstCreatePass && nd(e),
    l = t[$],
    d = td(t),
    h = !0;
  if (r.type & 3 || s) {
    let g = ae(r, t),
      T = s ? s(g) : g,
      M = d.length,
      j = s ? (be) => s(Ee(be[r.index])) : r.index,
      Y = null;
    if ((!s && a && (Y = tD(e, t, o, r.index)), Y !== null)) {
      let be = Y.__ngLastListenerFn__ || Y;
      (be.__ngNextListenerFn__ = i), (Y.__ngLastListenerFn__ = i), (h = !1);
    } else {
      (i = ec(r, t, l, i)), Jv(g, o, i);
      let be = n.listen(T, o, i);
      d.push(i, be), c && c.push(o, j, M, M + 1);
    }
  } else i = ec(r, t, l, i);
  let f = r.outputs,
    p;
  if (h && f !== null && (p = f[o])) {
    let g = p.length;
    if (g)
      for (let T = 0; T < g; T += 2) {
        let M = p[T],
          j = p[T + 1],
          mt = t[M][j].subscribe(i),
          ue = d.length;
        d.push(i, mt), c && c.push(o, r.index, ue, -(ue + 1));
      }
  }
}
function Xu(e, t, n, r) {
  let o = b(null);
  try {
    return ve(6, t, n), n(r) !== !1;
  } catch (i) {
    return od(e, i), !1;
  } finally {
    ve(7, t, n), b(o);
  }
}
function ec(e, t, n, r) {
  return function o(i) {
    if (i === Function) return r;
    let s = e.componentOffset > -1 ? Ze(e.index, t) : t;
    Js(s, 5);
    let a = Xu(t, n, r, i),
      u = o.__ngNextListenerFn__;
    for (; u; ) (a = Xu(t, n, u, i) && a), (u = u.__ngNextListenerFn__);
    return a;
  };
}
function ix(e = 1) {
  return qp(e);
}
function nD(e, t) {
  let n = null,
    r = Xh(e);
  for (let o = 0; o < t.length; o++) {
    let i = t[o];
    if (i === '*') {
      n = o;
      continue;
    }
    if (r === null ? Cc(e, i, !0) : np(r, i)) return o;
  }
  return n;
}
function sx(e) {
  let t = D()[ne][te];
  if (!t.projection) {
    let n = e ? e.length : 1,
      r = (t.projection = zh(n, null)),
      o = r.slice(),
      i = t.child;
    for (; i !== null; ) {
      if (i.type !== 128) {
        let s = e ? nD(i, e) : 0;
        s !== null &&
          (o[s] ? (o[s].projectionNext = i) : (r[s] = i), (o[s] = i));
      }
      i = i.next;
    }
  }
}
function ax(e, t = 0, n, r, o, i) {
  let s = D(),
    a = F(),
    u = r ? e + 1 : null;
  u !== null && Wr(s, a, u, r, o, i, null, n);
  let c = Wt(a, B + e, 16, null, n || null);
  c.projection === null && (c.projection = t), Ns();
  let d = !s[Rt] || Qc();
  s[ne][te].projection[c.projection] === null && u !== null
    ? rD(s, a, u)
    : d && (c.flags & 32) !== 32 && wm(a, s, c);
}
function rD(e, t, n) {
  let r = B + n,
    o = t.data[r],
    i = e[r],
    s = jt(i, o.tView.ssrId),
    a = _n(e, o, void 0, { dehydratedView: s });
  Mn(i, a, 0, Lt(o, s));
}
function oD(e, t, n) {
  return Ud(e, '', t, '', n), oD;
}
function Ud(e, t, n, r, o) {
  let i = D(),
    s = oa(i, t, n, r);
  if (s !== oe) {
    let a = F(),
      u = zt();
    bn(a, u, i, e, s, i[R], o, !1);
  }
  return Ud;
}
function ux(e, t, n, r) {
  Ed(e, t, n, r);
}
function cx(e, t, n) {
  Hy(e, t, n);
}
function lx(e) {
  let t = D(),
    n = F(),
    r = Fs();
  so(r + 1);
  let o = ra(n, r);
  if (e.dirty && Tp(t) === ((o.metadata.flags & 2) === 2)) {
    if (o.matches === null) e.reset([]);
    else {
      let i = Cd(t, r);
      e.reset(i, vl), e.notifyOnChanges();
    }
    return !0;
  }
  return !1;
}
function dx() {
  return na(D(), Fs());
}
function fx(e, t, n, r, o) {
  Yy(t, Ed(e, n, r, o));
}
function hx(e = 1) {
  so(Fs() + e);
}
function iD(e, t, n, r) {
  n >= e.data.length && ((e.data[n] = null), (e.blueprint[n] = null)),
    (t[n] = r);
}
function px(e) {
  let t = Vp();
  return zc(t, B + e);
}
function gx(e, t = '') {
  let n = D(),
    r = F(),
    o = e + B,
    i = r.firstCreatePass ? Wt(r, o, 1, t, null) : r.data[o],
    s = sD(r, n, i, t, e);
  (n[o] = s), ao() && ho(r, n, s, i), pt(i, !1);
}
var sD = (e, t, n, r, o) => (uo(!0), um(t[R], r));
function aD(e) {
  return zd('', e, ''), aD;
}
function zd(e, t, n) {
  let r = D(),
    o = oa(r, e, t, n);
  return o !== oe && id(r, Fe(), o), zd;
}
function uD(e, t, n, r, o) {
  let i = D(),
    s = vv(i, e, t, n, r, o);
  return s !== oe && id(i, Fe(), s), uD;
}
function cD(e, t, n) {
  _d(t) && (t = t());
  let r = D(),
    o = Ye();
  if (re(r, o, t)) {
    let i = F(),
      s = zt();
    bn(i, s, r, e, t, r[R], n, !1);
  }
  return cD;
}
function mx(e, t) {
  let n = _d(e);
  return n && e.set(t), n;
}
function lD(e, t) {
  let n = D(),
    r = F(),
    o = V();
  return ia(r, n, n[R], o, e, t), lD;
}
function dD(e, t, n) {
  let r = F();
  if (r.firstCreatePass) {
    let o = Te(e);
    us(n, r.data, r.blueprint, o, !0), us(t, r.data, r.blueprint, o, !1);
  }
}
function us(e, t, n, r, o) {
  if (((e = W(e)), Array.isArray(e)))
    for (let i = 0; i < e.length; i++) us(e[i], t, n, r, o);
  else {
    let i = F(),
      s = D(),
      a = V(),
      u = Ft(e) ? e : W(e.provide),
      c = Pc(e),
      l = a.providerIndexes & 1048575,
      d = a.directiveStart,
      h = a.providerIndexes >> 20;
    if (Ft(e) || !e.multi) {
      let f = new lt(c, o, Pe),
        p = oi(u, t, o ? l : l + h, d);
      p === -1
        ? (Di(Rr(a, s), i, u),
          ri(i, e, t.length),
          t.push(u),
          a.directiveStart++,
          a.directiveEnd++,
          o && (a.providerIndexes += 1048576),
          n.push(f),
          s.push(f))
        : ((n[p] = f), (s[p] = f));
    } else {
      let f = oi(u, t, l + h, d),
        p = oi(u, t, l, l + h),
        g = f >= 0 && n[f],
        T = p >= 0 && n[p];
      if ((o && !T) || (!o && !g)) {
        Di(Rr(a, s), i, u);
        let M = pD(o ? hD : fD, n.length, o, r, c);
        !o && T && (n[p].providerFactory = M),
          ri(i, e, t.length, 0),
          t.push(u),
          a.directiveStart++,
          a.directiveEnd++,
          o && (a.providerIndexes += 1048576),
          n.push(M),
          s.push(M);
      } else {
        let M = Gd(n[o ? p : f], c, !o && r);
        ri(i, e, f > -1 ? f : p, M);
      }
      !o && r && T && n[p].componentProviders++;
    }
  }
}
function ri(e, t, n, r) {
  let o = Ft(t),
    i = gp(t);
  if (o || i) {
    let u = (i ? W(t.useClass) : t).prototype.ngOnDestroy;
    if (u) {
      let c = e.destroyHooks || (e.destroyHooks = []);
      if (!o && t.multi) {
        let l = c.indexOf(n);
        l === -1 ? c.push(n, [r, u]) : c[l + 1].push(r, u);
      } else c.push(n, u);
    }
  }
}
function Gd(e, t, n) {
  return n && e.componentProviders++, e.multi.push(t) - 1;
}
function oi(e, t, n, r) {
  for (let o = n; o < r; o++) if (t[o] === e) return o;
  return -1;
}
function fD(e, t, n, r) {
  return cs(this.multi, []);
}
function hD(e, t, n, r) {
  let o = this.multi,
    i;
  if (this.providerFactory) {
    let s = this.providerFactory.componentProviders,
      a = dt(n, n[E], this.providerFactory.index, r);
    (i = a.slice(0, s)), cs(o, i);
    for (let u = s; u < a.length; u++) i.push(a[u]);
  } else (i = []), cs(o, i);
  return i;
}
function cs(e, t) {
  for (let n = 0; n < e.length; n++) {
    let r = e[n];
    t.push(r());
  }
  return t;
}
function pD(e, t, n, r, o) {
  let i = new lt(e, n, Pe);
  return (
    (i.multi = []),
    (i.index = t),
    (i.componentProviders = 0),
    Gd(i, o, r && !n),
    i
  );
}
function yx(e, t = []) {
  return (n) => {
    n.providersResolver = (r, o) => dD(r, o ? o(e) : e, t);
  };
}
var gD = (() => {
  let t = class t {
    constructor(r) {
      (this._injector = r), (this.cachedInjectors = new Map());
    }
    getOrCreateStandaloneInjector(r) {
      if (!r.standalone) return null;
      if (!this.cachedInjectors.has(r)) {
        let o = Ac(!1, r.type),
          i =
            o.length > 0
              ? av([o], this._injector, `Standalone[${r.type.name}]`)
              : null;
        this.cachedInjectors.set(r, i);
      }
      return this.cachedInjectors.get(r);
    }
    ngOnDestroy() {
      try {
        for (let r of this.cachedInjectors.values()) r !== null && r.destroy();
      } finally {
        this.cachedInjectors.clear();
      }
    }
  };
  t.ɵprov = P({
    token: t,
    providedIn: 'environment',
    factory: () => new t(U(Ue)),
  });
  let e = t;
  return e;
})();
function vx(e) {
  Ce('NgStandalone'),
    (e.getStandaloneInjector = (t) =>
      t.get(gD).getOrCreateStandaloneInjector(e));
}
function mD(e, t) {
  let n = e[t];
  return n === oe ? void 0 : n;
}
function yD(e, t, n, r, o, i) {
  let s = t + n;
  return re(e, s, o) ? lv(e, s + 1, i ? r.call(i, o) : r(o)) : mD(e, s + 1);
}
function Dx(e, t) {
  let n = F(),
    r,
    o = e + B;
  n.firstCreatePass
    ? ((r = vD(t, n.pipeRegistry)),
      (n.data[o] = r),
      r.onDestroy && (n.destroyHooks ??= []).push(o, r.onDestroy))
    : (r = n.data[o]);
  let i = r.factory || (r.factory = it(r.type, !0)),
    s,
    a = J(Pe);
  try {
    let u = Fr(!1),
      c = i();
    return Fr(u), iD(n, D(), o, c), c;
  } finally {
    J(a);
  }
}
function vD(e, t) {
  if (t)
    for (let n = t.length - 1; n >= 0; n--) {
      let r = t[n];
      if (e === r.name) return r;
    }
}
function Ix(e, t, n) {
  let r = e + B,
    o = D(),
    i = zc(o, r);
  return DD(o, r) ? yD(o, Bp(), t, i.transform, n, i) : i.transform(n);
}
function DD(e, t) {
  return e[E].data[t].pure;
}
function Ex(e, t) {
  return yo(e, t);
}
var wx = (() => {
  let t = class t {
    log(r) {
      console.log(r);
    }
    warn(r) {
      console.warn(r);
    }
  };
  (t.ɵfac = function (o) {
    return new (o || t)();
  }),
    (t.ɵprov = P({ token: t, factory: t.ɵfac, providedIn: 'platform' }));
  let e = t;
  return e;
})();
var ID = new N('');
function vo(e) {
  return !!e && typeof e.then == 'function';
}
function sa(e) {
  return !!e && typeof e.subscribe == 'function';
}
var ED = new N(''),
  Wd = (() => {
    let t = class t {
      constructor() {
        (this.initialized = !1),
          (this.done = !1),
          (this.donePromise = new Promise((r, o) => {
            (this.resolve = r), (this.reject = o);
          })),
          (this.appInits = C(ED, { optional: !0 }) ?? []);
      }
      runInitializers() {
        if (this.initialized) return;
        let r = [];
        for (let i of this.appInits) {
          let s = i();
          if (vo(s)) r.push(s);
          else if (sa(s)) {
            let a = new Promise((u, c) => {
              s.subscribe({ complete: u, error: c });
            });
            r.push(a);
          }
        }
        let o = () => {
          (this.done = !0), this.resolve();
        };
        Promise.all(r)
          .then(() => {
            o();
          })
          .catch((i) => {
            this.reject(i);
          }),
          r.length === 0 && o(),
          (this.initialized = !0);
      }
    };
    (t.ɵfac = function (o) {
      return new (o || t)();
    }),
      (t.ɵprov = P({ token: t, factory: t.ɵfac, providedIn: 'root' }));
    let e = t;
    return e;
  })(),
  wD = new N('');
function CD() {
  Oa(() => {
    throw new _(600, !1);
  });
}
function bD(e) {
  return e.isBoundToModule;
}
var _D = 10;
function MD(e, t, n) {
  try {
    let r = n();
    return vo(r)
      ? r.catch((o) => {
          throw (t.runOutsideAngular(() => e.handleError(o)), o);
        })
      : r;
  } catch (r) {
    throw (t.runOutsideAngular(() => e.handleError(r)), r);
  }
}
var Do = (() => {
  let t = class t {
    constructor() {
      (this._bootstrapListeners = []),
        (this._runningTick = !1),
        (this._destroyed = !1),
        (this._destroyListeners = []),
        (this._views = []),
        (this.internalErrorHandler = C(Ig)),
        (this.afterRenderEffectManager = C(ta)),
        (this.zonelessEnabled = C(Xs)),
        (this.externalTestViews = new Set()),
        (this.beforeRender = new ie()),
        (this.afterTick = new ie()),
        (this.componentTypes = []),
        (this.components = []),
        (this.isStable = C(En).hasPendingTasks.pipe(Me((r) => !r))),
        (this._injector = C(Ue));
    }
    get allViews() {
      return [...this.externalTestViews.keys(), ...this._views];
    }
    get destroyed() {
      return this._destroyed;
    }
    whenStable() {
      let r;
      return new Promise((o) => {
        r = this.isStable.subscribe({
          next: (i) => {
            i && o();
          },
        });
      }).finally(() => {
        r.unsubscribe();
      });
    }
    get injector() {
      return this._injector;
    }
    bootstrap(r, o) {
      let i = r instanceof Br;
      if (!this._injector.get(Wd).done) {
        let f = !i && up(r),
          p = !1;
        throw new _(405, p);
      }
      let a;
      i ? (a = r) : (a = this._injector.get(Bt).resolveComponentFactory(r)),
        this.componentTypes.push(a.componentType);
      let u = bD(a) ? void 0 : this._injector.get(qe),
        c = o || a.selector,
        l = a.create(Ne.NULL, [], c, u),
        d = l.location.nativeElement,
        h = l.injector.get(ID, null);
      return (
        h?.registerApplication(d),
        l.onDestroy(() => {
          this.detachView(l.hostView),
            Ir(this.components, l),
            h?.unregisterApplication(d);
        }),
        this._loadComponent(l),
        l
      );
    }
    tick() {
      this._tick(!0);
    }
    _tick(r) {
      if (this._runningTick) throw new _(101, !1);
      let o = b(null);
      try {
        (this._runningTick = !0), this.detectChangesInAttachedViews(r);
      } catch (i) {
        this.internalErrorHandler(i);
      } finally {
        (this._runningTick = !1), b(o), this.afterTick.next();
      }
    }
    detectChangesInAttachedViews(r) {
      let o = null;
      this._injector.destroyed ||
        (o = this._injector.get($r, null, { optional: !0 }));
      let i = 0,
        s = this.afterRenderEffectManager;
      for (; i < _D; ) {
        let a = i === 0;
        if (r || !a) {
          this.beforeRender.next(a);
          for (let { _lView: u, notifyErrorHandler: c } of this._views)
            xD(u, c, a, this.zonelessEnabled);
        } else o?.begin?.(), o?.end?.();
        if (
          (i++,
          s.executeInternalCallbacks(),
          !this.allViews.some(({ _lView: u }) => pn(u)) &&
            (s.execute(), !this.allViews.some(({ _lView: u }) => pn(u))))
        )
          break;
      }
    }
    attachView(r) {
      let o = r;
      this._views.push(o), o.attachToAppRef(this);
    }
    detachView(r) {
      let o = r;
      Ir(this._views, o), o.detachFromAppRef();
    }
    _loadComponent(r) {
      this.attachView(r.hostView), this.tick(), this.components.push(r);
      let o = this._injector.get(wD, []);
      [...this._bootstrapListeners, ...o].forEach((i) => i(r));
    }
    ngOnDestroy() {
      if (!this._destroyed)
        try {
          this._destroyListeners.forEach((r) => r()),
            this._views.slice().forEach((r) => r.destroy());
        } finally {
          (this._destroyed = !0),
            (this._views = []),
            (this._bootstrapListeners = []),
            (this._destroyListeners = []);
        }
    }
    onDestroy(r) {
      return (
        this._destroyListeners.push(r), () => Ir(this._destroyListeners, r)
      );
    }
    destroy() {
      if (this._destroyed) throw new _(406, !1);
      let r = this._injector;
      r.destroy && !r.destroyed && r.destroy();
    }
    get viewCount() {
      return this._views.length;
    }
    warnIfDestroyed() {}
  };
  (t.ɵfac = function (o) {
    return new (o || t)();
  }),
    (t.ɵprov = P({ token: t, factory: t.ɵfac, providedIn: 'root' }));
  let e = t;
  return e;
})();
function Ir(e, t) {
  let n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
function xD(e, t, n, r) {
  if (!n && !pn(e)) return;
  ld(e, t, n && !r ? 0 : 1);
}
var ls = class {
    constructor(t, n) {
      (this.ngModuleFactory = t), (this.componentFactories = n);
    }
  },
  Cx = (() => {
    let t = class t {
      compileModuleSync(r) {
        return new Ji(r);
      }
      compileModuleAsync(r) {
        return Promise.resolve(this.compileModuleSync(r));
      }
      compileModuleAndAllComponentsSync(r) {
        let o = this.compileModuleSync(r),
          i = Sc(r),
          s = Fl(i.declarations).reduce((a, u) => {
            let c = He(u);
            return c && a.push(new $t(c)), a;
          }, []);
        return new ls(o, s);
      }
      compileModuleAndAllComponentsAsync(r) {
        return Promise.resolve(this.compileModuleAndAllComponentsSync(r));
      }
      clearCache() {}
      clearCacheFor(r) {}
      getModuleId(r) {}
    };
    (t.ɵfac = function (o) {
      return new (o || t)();
    }),
      (t.ɵprov = P({ token: t, factory: t.ɵfac, providedIn: 'root' }));
    let e = t;
    return e;
  })();
var SD = (() => {
    let t = class t {
      constructor() {
        (this.zone = C(ee)),
          (this.changeDetectionScheduler = C(Vt)),
          (this.applicationRef = C(Do));
      }
      initialize() {
        this._onMicrotaskEmptySubscription ||
          (this._onMicrotaskEmptySubscription =
            this.zone.onMicrotaskEmpty.subscribe({
              next: () => {
                this.changeDetectionScheduler.runningTick ||
                  this.zone.run(() => {
                    this.applicationRef.tick();
                  });
              },
            }));
      }
      ngOnDestroy() {
        this._onMicrotaskEmptySubscription?.unsubscribe();
      }
    };
    (t.ɵfac = function (o) {
      return new (o || t)();
    }),
      (t.ɵprov = P({ token: t, factory: t.ɵfac, providedIn: 'root' }));
    let e = t;
    return e;
  })(),
  TD = new N('', { factory: () => !1 });
function qd({ ngZoneFactory: e, ignoreChangesOutsideZone: t }) {
  return (
    (e ??= () => new ee(Zd())),
    [
      { provide: ee, useFactory: e },
      {
        provide: Mr,
        multi: !0,
        useFactory: () => {
          let n = C(SD, { optional: !0 });
          return () => n.initialize();
        },
      },
      {
        provide: Mr,
        multi: !0,
        useFactory: () => {
          let n = C(ND);
          return () => {
            n.initialize();
          };
        },
      },
      t === !0 ? { provide: pd, useValue: !0 } : [],
    ]
  );
}
function bx(e) {
  let t = e?.ignoreChangesOutsideZone,
    n = qd({
      ngZoneFactory: () => {
        let r = Zd(e);
        return (
          r.shouldCoalesceEventChangeDetection && Ce('NgZone_CoalesceEvent'),
          new ee(r)
        );
      },
      ignoreChangesOutsideZone: t,
    });
  return lp([{ provide: TD, useValue: !0 }, { provide: Xs, useValue: !1 }, n]);
}
function Zd(e) {
  return {
    enableLongStackTrace: !1,
    shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
    shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
  };
}
var ND = (() => {
  let t = class t {
    constructor() {
      (this.subscription = new k()),
        (this.initialized = !1),
        (this.zone = C(ee)),
        (this.pendingTasks = C(En));
    }
    initialize() {
      if (this.initialized) return;
      this.initialized = !0;
      let r = null;
      !this.zone.isStable &&
        !this.zone.hasPendingMacrotasks &&
        !this.zone.hasPendingMicrotasks &&
        (r = this.pendingTasks.add()),
        this.zone.runOutsideAngular(() => {
          this.subscription.add(
            this.zone.onStable.subscribe(() => {
              ee.assertNotInAngularZone(),
                queueMicrotask(() => {
                  r !== null &&
                    !this.zone.hasPendingMacrotasks &&
                    !this.zone.hasPendingMicrotasks &&
                    (this.pendingTasks.remove(r), (r = null));
                });
            })
          );
        }),
        this.subscription.add(
          this.zone.onUnstable.subscribe(() => {
            ee.assertInAngularZone(), (r ??= this.pendingTasks.add());
          })
        );
    }
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
  };
  (t.ɵfac = function (o) {
    return new (o || t)();
  }),
    (t.ɵprov = P({ token: t, factory: t.ɵfac, providedIn: 'root' }));
  let e = t;
  return e;
})();
var AD = (() => {
  let t = class t {
    constructor() {
      (this.appRef = C(Do)),
        (this.taskService = C(En)),
        (this.ngZone = C(ee)),
        (this.zonelessEnabled = C(Xs)),
        (this.disableScheduling = C(pd, { optional: !0 }) ?? !1),
        (this.zoneIsDefined = typeof Zone < 'u' && !!Zone.root.run),
        (this.schedulerTickApplyArgs = [{ data: { __scheduler_tick__: !0 } }]),
        (this.subscriptions = new k()),
        (this.angularZoneId = this.zoneIsDefined
          ? this.ngZone._inner?.get(kr)
          : null),
        (this.cancelScheduledCallback = null),
        (this.shouldRefreshViews = !1),
        (this.useMicrotaskScheduler = !1),
        (this.runningTick = !1),
        (this.pendingRenderTaskId = null),
        this.subscriptions.add(
          this.appRef.afterTick.subscribe(() => {
            this.runningTick || this.cleanup();
          })
        ),
        this.subscriptions.add(
          this.ngZone.onUnstable.subscribe(() => {
            this.runningTick || this.cleanup();
          })
        ),
        (this.disableScheduling ||=
          !this.zonelessEnabled &&
          (this.ngZone instanceof bi || !this.zoneIsDefined));
    }
    notify(r) {
      if (!this.zonelessEnabled && r === 5) return;
      switch (r) {
        case 3:
        case 2:
        case 0:
        case 4:
        case 5:
        case 1: {
          this.shouldRefreshViews = !0;
          break;
        }
        case 8:
        case 7:
        case 6:
        case 9:
        default:
      }
      if (!this.shouldScheduleTick()) return;
      let o = this.useMicrotaskScheduler ? Tu : ml;
      (this.pendingRenderTaskId = this.taskService.add()),
        this.zoneIsDefined
          ? Zone.root.run(() => {
              this.cancelScheduledCallback = o(() => {
                this.tick(this.shouldRefreshViews);
              });
            })
          : (this.cancelScheduledCallback = o(() => {
              this.tick(this.shouldRefreshViews);
            }));
    }
    shouldScheduleTick() {
      return !(
        this.disableScheduling ||
        this.pendingRenderTaskId !== null ||
        this.runningTick ||
        this.appRef._runningTick ||
        (!this.zonelessEnabled &&
          this.zoneIsDefined &&
          Zone.current.get(kr + this.angularZoneId))
      );
    }
    tick(r) {
      if (this.runningTick || this.appRef.destroyed) return;
      let o = this.taskService.add();
      try {
        this.ngZone.run(
          () => {
            (this.runningTick = !0), this.appRef._tick(r);
          },
          void 0,
          this.schedulerTickApplyArgs
        );
      } catch (i) {
        throw (this.taskService.remove(o), i);
      } finally {
        this.cleanup();
      }
      (this.useMicrotaskScheduler = !0),
        Tu(() => {
          (this.useMicrotaskScheduler = !1), this.taskService.remove(o);
        });
    }
    ngOnDestroy() {
      this.subscriptions.unsubscribe(), this.cleanup();
    }
    cleanup() {
      if (
        ((this.shouldRefreshViews = !1),
        (this.runningTick = !1),
        this.cancelScheduledCallback?.(),
        (this.cancelScheduledCallback = null),
        this.pendingRenderTaskId !== null)
      ) {
        let r = this.pendingRenderTaskId;
        (this.pendingRenderTaskId = null), this.taskService.remove(r);
      }
    }
  };
  (t.ɵfac = function (o) {
    return new (o || t)();
  }),
    (t.ɵprov = P({ token: t, factory: t.ɵfac, providedIn: 'root' }));
  let e = t;
  return e;
})();
function OD() {
  return (typeof $localize < 'u' && $localize.locale) || Qr;
}
var aa = new N('', {
  providedIn: 'root',
  factory: () => C(aa, x.Optional | x.SkipSelf) || OD(),
});
var Yd = new N('');
function pr(e) {
  return !!e.platformInjector;
}
function FD(e) {
  let t = pr(e) ? e.r3Injector : e.moduleRef.injector,
    n = t.get(ee);
  return n.run(() => {
    pr(e)
      ? e.r3Injector.resolveInjectorInitializers()
      : e.moduleRef.resolveInjectorInitializers();
    let r = t.get(Ge, null),
      o;
    if (
      (n.runOutsideAngular(() => {
        o = n.onError.subscribe({
          next: (i) => {
            r.handleError(i);
          },
        });
      }),
      pr(e))
    ) {
      let i = () => t.destroy(),
        s = e.platformInjector.get(Yd);
      s.add(i),
        t.onDestroy(() => {
          o.unsubscribe(), s.delete(i);
        });
    } else
      e.moduleRef.onDestroy(() => {
        Ir(e.allPlatformModules, e.moduleRef), o.unsubscribe();
      });
    return MD(r, n, () => {
      let i = t.get(Wd);
      return (
        i.runInitializers(),
        i.donePromise.then(() => {
          let s = t.get(aa, Qr);
          if ((Kv(s || Qr), pr(e))) {
            let a = t.get(Do);
            return (
              e.rootComponent !== void 0 && a.bootstrap(e.rootComponent), a
            );
          } else return RD(e.moduleRef, e.allPlatformModules), e.moduleRef;
        })
      );
    });
  });
}
function RD(e, t) {
  let n = e.injector.get(Do);
  if (e._bootstrapComponents.length > 0)
    e._bootstrapComponents.forEach((r) => n.bootstrap(r));
  else if (e.instance.ngDoBootstrap) e.instance.ngDoBootstrap(n);
  else throw new _(-403, !1);
  t.push(e);
}
var Er = null;
function PD(e = [], t) {
  return Ne.create({
    name: t,
    providers: [
      { provide: Rc, useValue: 'platform' },
      { provide: Yd, useValue: new Set([() => (Er = null)]) },
      ...e,
    ],
  });
}
function kD(e = []) {
  if (Er) return Er;
  let t = PD(e);
  return (Er = t), CD(), LD(t), t;
}
function LD(e) {
  e.get(Ng, null)?.forEach((n) => n());
}
var Io = (() => {
  let t = class t {};
  t.__NG_ELEMENT_ID__ = jD;
  let e = t;
  return e;
})();
function jD(e) {
  return VD(V(), D(), (e & 16) === 16);
}
function VD(e, t, n) {
  if (ro(e) && !n) {
    let r = Ze(e.index, t);
    return new ft(r, r);
  } else if (e.type & 175) {
    let r = t[ne];
    return new ft(r, t);
  }
  return null;
}
var ds = class {
    constructor() {}
    supports(t) {
      return Sd(t);
    }
    create(t) {
      return new fs(t);
    }
  },
  BD = (e, t) => t,
  fs = class {
    constructor(t) {
      (this.length = 0),
        (this._linkedRecords = null),
        (this._unlinkedRecords = null),
        (this._previousItHead = null),
        (this._itHead = null),
        (this._itTail = null),
        (this._additionsHead = null),
        (this._additionsTail = null),
        (this._movesHead = null),
        (this._movesTail = null),
        (this._removalsHead = null),
        (this._removalsTail = null),
        (this._identityChangesHead = null),
        (this._identityChangesTail = null),
        (this._trackByFn = t || BD);
    }
    forEachItem(t) {
      let n;
      for (n = this._itHead; n !== null; n = n._next) t(n);
    }
    forEachOperation(t) {
      let n = this._itHead,
        r = this._removalsHead,
        o = 0,
        i = null;
      for (; n || r; ) {
        let s = !r || (n && n.currentIndex < tc(r, o, i)) ? n : r,
          a = tc(s, o, i),
          u = s.currentIndex;
        if (s === r) o--, (r = r._nextRemoved);
        else if (((n = n._next), s.previousIndex == null)) o++;
        else {
          i || (i = []);
          let c = a - o,
            l = u - o;
          if (c != l) {
            for (let h = 0; h < c; h++) {
              let f = h < i.length ? i[h] : (i[h] = 0),
                p = f + h;
              l <= p && p < c && (i[h] = f + 1);
            }
            let d = s.previousIndex;
            i[d] = l - c;
          }
        }
        a !== u && t(s, a, u);
      }
    }
    forEachPreviousItem(t) {
      let n;
      for (n = this._previousItHead; n !== null; n = n._nextPrevious) t(n);
    }
    forEachAddedItem(t) {
      let n;
      for (n = this._additionsHead; n !== null; n = n._nextAdded) t(n);
    }
    forEachMovedItem(t) {
      let n;
      for (n = this._movesHead; n !== null; n = n._nextMoved) t(n);
    }
    forEachRemovedItem(t) {
      let n;
      for (n = this._removalsHead; n !== null; n = n._nextRemoved) t(n);
    }
    forEachIdentityChange(t) {
      let n;
      for (n = this._identityChangesHead; n !== null; n = n._nextIdentityChange)
        t(n);
    }
    diff(t) {
      if ((t == null && (t = []), !Sd(t))) throw new _(900, !1);
      return this.check(t) ? this : null;
    }
    onDestroy() {}
    check(t) {
      this._reset();
      let n = this._itHead,
        r = !1,
        o,
        i,
        s;
      if (Array.isArray(t)) {
        this.length = t.length;
        for (let a = 0; a < this.length; a++)
          (i = t[a]),
            (s = this._trackByFn(a, i)),
            n === null || !Object.is(n.trackById, s)
              ? ((n = this._mismatch(n, i, s, a)), (r = !0))
              : (r && (n = this._verifyReinsertion(n, i, s, a)),
                Object.is(n.item, i) || this._addIdentityChange(n, i)),
            (n = n._next);
      } else
        (o = 0),
          uv(t, (a) => {
            (s = this._trackByFn(o, a)),
              n === null || !Object.is(n.trackById, s)
                ? ((n = this._mismatch(n, a, s, o)), (r = !0))
                : (r && (n = this._verifyReinsertion(n, a, s, o)),
                  Object.is(n.item, a) || this._addIdentityChange(n, a)),
              (n = n._next),
              o++;
          }),
          (this.length = o);
      return this._truncate(n), (this.collection = t), this.isDirty;
    }
    get isDirty() {
      return (
        this._additionsHead !== null ||
        this._movesHead !== null ||
        this._removalsHead !== null ||
        this._identityChangesHead !== null
      );
    }
    _reset() {
      if (this.isDirty) {
        let t;
        for (t = this._previousItHead = this._itHead; t !== null; t = t._next)
          t._nextPrevious = t._next;
        for (t = this._additionsHead; t !== null; t = t._nextAdded)
          t.previousIndex = t.currentIndex;
        for (
          this._additionsHead = this._additionsTail = null, t = this._movesHead;
          t !== null;
          t = t._nextMoved
        )
          t.previousIndex = t.currentIndex;
        (this._movesHead = this._movesTail = null),
          (this._removalsHead = this._removalsTail = null),
          (this._identityChangesHead = this._identityChangesTail = null);
      }
    }
    _mismatch(t, n, r, o) {
      let i;
      return (
        t === null ? (i = this._itTail) : ((i = t._prev), this._remove(t)),
        (t =
          this._unlinkedRecords === null
            ? null
            : this._unlinkedRecords.get(r, null)),
        t !== null
          ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
            this._reinsertAfter(t, i, o))
          : ((t =
              this._linkedRecords === null
                ? null
                : this._linkedRecords.get(r, o)),
            t !== null
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, i, o))
              : (t = this._addAfter(new hs(n, r), i, o))),
        t
      );
    }
    _verifyReinsertion(t, n, r, o) {
      let i =
        this._unlinkedRecords === null
          ? null
          : this._unlinkedRecords.get(r, null);
      return (
        i !== null
          ? (t = this._reinsertAfter(i, t._prev, o))
          : t.currentIndex != o &&
            ((t.currentIndex = o), this._addToMoves(t, o)),
        t
      );
    }
    _truncate(t) {
      for (; t !== null; ) {
        let n = t._next;
        this._addToRemovals(this._unlink(t)), (t = n);
      }
      this._unlinkedRecords !== null && this._unlinkedRecords.clear(),
        this._additionsTail !== null && (this._additionsTail._nextAdded = null),
        this._movesTail !== null && (this._movesTail._nextMoved = null),
        this._itTail !== null && (this._itTail._next = null),
        this._removalsTail !== null && (this._removalsTail._nextRemoved = null),
        this._identityChangesTail !== null &&
          (this._identityChangesTail._nextIdentityChange = null);
    }
    _reinsertAfter(t, n, r) {
      this._unlinkedRecords !== null && this._unlinkedRecords.remove(t);
      let o = t._prevRemoved,
        i = t._nextRemoved;
      return (
        o === null ? (this._removalsHead = i) : (o._nextRemoved = i),
        i === null ? (this._removalsTail = o) : (i._prevRemoved = o),
        this._insertAfter(t, n, r),
        this._addToMoves(t, r),
        t
      );
    }
    _moveAfter(t, n, r) {
      return (
        this._unlink(t), this._insertAfter(t, n, r), this._addToMoves(t, r), t
      );
    }
    _addAfter(t, n, r) {
      return (
        this._insertAfter(t, n, r),
        this._additionsTail === null
          ? (this._additionsTail = this._additionsHead = t)
          : (this._additionsTail = this._additionsTail._nextAdded = t),
        t
      );
    }
    _insertAfter(t, n, r) {
      let o = n === null ? this._itHead : n._next;
      return (
        (t._next = o),
        (t._prev = n),
        o === null ? (this._itTail = t) : (o._prev = t),
        n === null ? (this._itHead = t) : (n._next = t),
        this._linkedRecords === null && (this._linkedRecords = new Kr()),
        this._linkedRecords.put(t),
        (t.currentIndex = r),
        t
      );
    }
    _remove(t) {
      return this._addToRemovals(this._unlink(t));
    }
    _unlink(t) {
      this._linkedRecords !== null && this._linkedRecords.remove(t);
      let n = t._prev,
        r = t._next;
      return (
        n === null ? (this._itHead = r) : (n._next = r),
        r === null ? (this._itTail = n) : (r._prev = n),
        t
      );
    }
    _addToMoves(t, n) {
      return (
        t.previousIndex === n ||
          (this._movesTail === null
            ? (this._movesTail = this._movesHead = t)
            : (this._movesTail = this._movesTail._nextMoved = t)),
        t
      );
    }
    _addToRemovals(t) {
      return (
        this._unlinkedRecords === null && (this._unlinkedRecords = new Kr()),
        this._unlinkedRecords.put(t),
        (t.currentIndex = null),
        (t._nextRemoved = null),
        this._removalsTail === null
          ? ((this._removalsTail = this._removalsHead = t),
            (t._prevRemoved = null))
          : ((t._prevRemoved = this._removalsTail),
            (this._removalsTail = this._removalsTail._nextRemoved = t)),
        t
      );
    }
    _addIdentityChange(t, n) {
      return (
        (t.item = n),
        this._identityChangesTail === null
          ? (this._identityChangesTail = this._identityChangesHead = t)
          : (this._identityChangesTail =
              this._identityChangesTail._nextIdentityChange =
                t),
        t
      );
    }
  },
  hs = class {
    constructor(t, n) {
      (this.item = t),
        (this.trackById = n),
        (this.currentIndex = null),
        (this.previousIndex = null),
        (this._nextPrevious = null),
        (this._prev = null),
        (this._next = null),
        (this._prevDup = null),
        (this._nextDup = null),
        (this._prevRemoved = null),
        (this._nextRemoved = null),
        (this._nextAdded = null),
        (this._nextMoved = null),
        (this._nextIdentityChange = null);
    }
  },
  ps = class {
    constructor() {
      (this._head = null), (this._tail = null);
    }
    add(t) {
      this._head === null
        ? ((this._head = this._tail = t),
          (t._nextDup = null),
          (t._prevDup = null))
        : ((this._tail._nextDup = t),
          (t._prevDup = this._tail),
          (t._nextDup = null),
          (this._tail = t));
    }
    get(t, n) {
      let r;
      for (r = this._head; r !== null; r = r._nextDup)
        if ((n === null || n <= r.currentIndex) && Object.is(r.trackById, t))
          return r;
      return null;
    }
    remove(t) {
      let n = t._prevDup,
        r = t._nextDup;
      return (
        n === null ? (this._head = r) : (n._nextDup = r),
        r === null ? (this._tail = n) : (r._prevDup = n),
        this._head === null
      );
    }
  },
  Kr = class {
    constructor() {
      this.map = new Map();
    }
    put(t) {
      let n = t.trackById,
        r = this.map.get(n);
      r || ((r = new ps()), this.map.set(n, r)), r.add(t);
    }
    get(t, n) {
      let r = t,
        o = this.map.get(r);
      return o ? o.get(t, n) : null;
    }
    remove(t) {
      let n = t.trackById;
      return this.map.get(n).remove(t) && this.map.delete(n), t;
    }
    get isEmpty() {
      return this.map.size === 0;
    }
    clear() {
      this.map.clear();
    }
  };
function tc(e, t, n) {
  let r = e.previousIndex;
  if (r === null) return r;
  let o = 0;
  return n && r < n.length && (o = n[r]), r + t + o;
}
function nc() {
  return new Qd([new ds()]);
}
var Qd = (() => {
  let t = class t {
    constructor(r) {
      this.factories = r;
    }
    static create(r, o) {
      if (o != null) {
        let i = o.factories.slice();
        r = r.concat(i);
      }
      return new t(r);
    }
    static extend(r) {
      return {
        provide: t,
        useFactory: (o) => t.create(r, o || nc()),
        deps: [[t, new $h(), new Bh()]],
      };
    }
    find(r) {
      let o = this.factories.find((i) => i.supports(r));
      if (o != null) return o;
      throw new _(901, !1);
    }
  };
  t.ɵprov = P({ token: t, providedIn: 'root', factory: nc });
  let e = t;
  return e;
})();
function _x(e) {
  try {
    let { rootComponent: t, appProviders: n, platformProviders: r } = e,
      o = kD(r),
      i = [qd({}), { provide: Vt, useExisting: AD }, ...(n || [])],
      s = new Gr({
        providers: i,
        parent: o,
        debugName: '',
        runEnvironmentInitializers: !1,
      });
    return FD({
      r3Injector: s.injector,
      platformInjector: o,
      rootComponent: t,
    });
  } catch (t) {
    return Promise.reject(t);
  }
}
var Mx = new N('');
function $D(e) {
  return typeof e == 'boolean' ? e : e != null && e !== 'false';
}
function HD(e, t = NaN) {
  return !isNaN(parseFloat(e)) && !isNaN(Number(e)) ? Number(e) : t;
}
function xx(e, t) {
  Ce('NgSignals');
  let n = So(e);
  return t?.equal && (n[Q].equal = t.equal), n;
}
function ua(e) {
  let t = b(null);
  try {
    return e();
  } finally {
    b(t);
  }
}
var UD = new N('', { providedIn: 'root', factory: () => C(zD) }),
  zD = (() => {
    let t = class t {};
    t.ɵprov = P({ token: t, providedIn: 'root', factory: () => new gs() });
    let e = t;
    return e;
  })(),
  gs = class {
    constructor() {
      (this.queuedEffectCount = 0),
        (this.queues = new Map()),
        (this.pendingTasks = C(En)),
        (this.taskId = null);
    }
    scheduleEffect(t) {
      if ((this.enqueue(t), this.taskId === null)) {
        let n = (this.taskId = this.pendingTasks.add());
        queueMicrotask(() => {
          this.flush(), this.pendingTasks.remove(n), (this.taskId = null);
        });
      }
    }
    enqueue(t) {
      let n = t.creationZone;
      this.queues.has(n) || this.queues.set(n, new Set());
      let r = this.queues.get(n);
      r.has(t) || (this.queuedEffectCount++, r.add(t));
    }
    flush() {
      for (; this.queuedEffectCount > 0; )
        for (let [t, n] of this.queues)
          t === null ? this.flushQueue(n) : t.run(() => this.flushQueue(n));
    }
    flushQueue(t) {
      for (let n of t) t.delete(n), this.queuedEffectCount--, n.run();
    }
  },
  ms = class {
    constructor(t, n, r, o, i, s) {
      (this.scheduler = t),
        (this.effectFn = n),
        (this.creationZone = r),
        (this.injector = i),
        (this.watcher = Pa(
          (a) => this.runEffect(a),
          () => this.schedule(),
          s
        )),
        (this.unregisterOnDestroy = o?.onDestroy(() => this.destroy()));
    }
    runEffect(t) {
      try {
        this.effectFn(t);
      } catch (n) {
        this.injector.get(Ge, null, { optional: !0 })?.handleError(n);
      }
    }
    run() {
      this.watcher.run();
    }
    schedule() {
      this.scheduler.scheduleEffect(this);
    }
    destroy() {
      this.watcher.destroy(), this.unregisterOnDestroy?.();
    }
  };
function GD(e, t) {
  Ce('NgSignals'), !t?.injector && Cs(GD);
  let n = t?.injector ?? C(Ne),
    r = t?.manualCleanup !== !0 ? n.get(In) : null,
    o = new ms(
      n.get(UD),
      e,
      typeof Zone > 'u' ? null : Zone.current,
      r,
      n,
      t?.allowSignalWrites ?? !1
    ),
    i = n.get(Io, null, { optional: !0 });
  return (
    !i || !(i._lView[y] & 8)
      ? o.watcher.notify()
      : (i._lView[mr] ??= []).push(o.watcher.notify),
    o
  );
}
function Sx(e) {
  let t = He(e);
  if (!t) return null;
  let n = new $t(t);
  return {
    get selector() {
      return n.selector;
    },
    get type() {
      return n.componentType;
    },
    get inputs() {
      return n.inputs;
    },
    get outputs() {
      return n.outputs;
    },
    get ngContentSelectors() {
      return n.ngContentSelectors;
    },
    get isStandalone() {
      return t.standalone;
    },
    get isSignal() {
      return t.signals;
    },
  };
}
var nf = null;
function la() {
  return nf;
}
function Xx(e) {
  nf ??= e;
}
var Kd = class {};
var ma = new N(''),
  ya = (() => {
    let t = class t {
      historyGo(r) {
        throw new Error('');
      }
    };
    (t.ɵfac = function (o) {
      return new (o || t)();
    }),
      (t.ɵprov = P({ token: t, factory: () => C(qD), providedIn: 'platform' }));
    let e = t;
    return e;
  })(),
  eS = new N(''),
  qD = (() => {
    let t = class t extends ya {
      constructor() {
        super(),
          (this._doc = C(ma)),
          (this._location = window.location),
          (this._history = window.history);
      }
      getBaseHrefFromDOM() {
        return la().getBaseHref(this._doc);
      }
      onPopState(r) {
        let o = la().getGlobalEventTarget(this._doc, 'window');
        return (
          o.addEventListener('popstate', r, !1),
          () => o.removeEventListener('popstate', r)
        );
      }
      onHashChange(r) {
        let o = la().getGlobalEventTarget(this._doc, 'window');
        return (
          o.addEventListener('hashchange', r, !1),
          () => o.removeEventListener('hashchange', r)
        );
      }
      get href() {
        return this._location.href;
      }
      get protocol() {
        return this._location.protocol;
      }
      get hostname() {
        return this._location.hostname;
      }
      get port() {
        return this._location.port;
      }
      get pathname() {
        return this._location.pathname;
      }
      get search() {
        return this._location.search;
      }
      get hash() {
        return this._location.hash;
      }
      set pathname(r) {
        this._location.pathname = r;
      }
      pushState(r, o, i) {
        this._history.pushState(r, o, i);
      }
      replaceState(r, o, i) {
        this._history.replaceState(r, o, i);
      }
      forward() {
        this._history.forward();
      }
      back() {
        this._history.back();
      }
      historyGo(r = 0) {
        this._history.go(r);
      }
      getState() {
        return this._history.state;
      }
    };
    (t.ɵfac = function (o) {
      return new (o || t)();
    }),
      (t.ɵprov = P({
        token: t,
        factory: () => new t(),
        providedIn: 'platform',
      }));
    let e = t;
    return e;
  })();
function va(e, t) {
  if (e.length == 0) return t;
  if (t.length == 0) return e;
  let n = 0;
  return (
    e.endsWith('/') && n++,
    t.startsWith('/') && n++,
    n == 2 ? e + t.substring(1) : n == 1 ? e + t : e + '/' + t
  );
}
function Jd(e) {
  let t = e.match(/#|\?|$/),
    n = (t && t.index) || e.length,
    r = n - (e[n - 1] === '/' ? 1 : 0);
  return e.slice(0, r) + e.slice(n);
}
function ke(e) {
  return e && e[0] !== '?' ? '?' + e : e;
}
var Eo = (() => {
    let t = class t {
      historyGo(r) {
        throw new Error('');
      }
    };
    (t.ɵfac = function (o) {
      return new (o || t)();
    }),
      (t.ɵprov = P({ token: t, factory: () => C(ZD), providedIn: 'root' }));
    let e = t;
    return e;
  })(),
  rf = new N(''),
  ZD = (() => {
    let t = class t extends Eo {
      constructor(r, o) {
        super(),
          (this._platformLocation = r),
          (this._removeListenerFns = []),
          (this._baseHref =
            o ??
            this._platformLocation.getBaseHrefFromDOM() ??
            C(ma).location?.origin ??
            '');
      }
      ngOnDestroy() {
        for (; this._removeListenerFns.length; )
          this._removeListenerFns.pop()();
      }
      onPopState(r) {
        this._removeListenerFns.push(
          this._platformLocation.onPopState(r),
          this._platformLocation.onHashChange(r)
        );
      }
      getBaseHref() {
        return this._baseHref;
      }
      prepareExternalUrl(r) {
        return va(this._baseHref, r);
      }
      path(r = !1) {
        let o =
            this._platformLocation.pathname + ke(this._platformLocation.search),
          i = this._platformLocation.hash;
        return i && r ? `${o}${i}` : o;
      }
      pushState(r, o, i, s) {
        let a = this.prepareExternalUrl(i + ke(s));
        this._platformLocation.pushState(r, o, a);
      }
      replaceState(r, o, i, s) {
        let a = this.prepareExternalUrl(i + ke(s));
        this._platformLocation.replaceState(r, o, a);
      }
      forward() {
        this._platformLocation.forward();
      }
      back() {
        this._platformLocation.back();
      }
      getState() {
        return this._platformLocation.getState();
      }
      historyGo(r = 0) {
        this._platformLocation.historyGo?.(r);
      }
    };
    (t.ɵfac = function (o) {
      return new (o || t)(U(ya), U(rf, 8));
    }),
      (t.ɵprov = P({ token: t, factory: t.ɵfac, providedIn: 'root' }));
    let e = t;
    return e;
  })(),
  tS = (() => {
    let t = class t extends Eo {
      constructor(r, o) {
        super(),
          (this._platformLocation = r),
          (this._baseHref = ''),
          (this._removeListenerFns = []),
          o != null && (this._baseHref = o);
      }
      ngOnDestroy() {
        for (; this._removeListenerFns.length; )
          this._removeListenerFns.pop()();
      }
      onPopState(r) {
        this._removeListenerFns.push(
          this._platformLocation.onPopState(r),
          this._platformLocation.onHashChange(r)
        );
      }
      getBaseHref() {
        return this._baseHref;
      }
      path(r = !1) {
        let o = this._platformLocation.hash ?? '#';
        return o.length > 0 ? o.substring(1) : o;
      }
      prepareExternalUrl(r) {
        let o = va(this._baseHref, r);
        return o.length > 0 ? '#' + o : o;
      }
      pushState(r, o, i, s) {
        let a = this.prepareExternalUrl(i + ke(s));
        a.length == 0 && (a = this._platformLocation.pathname),
          this._platformLocation.pushState(r, o, a);
      }
      replaceState(r, o, i, s) {
        let a = this.prepareExternalUrl(i + ke(s));
        a.length == 0 && (a = this._platformLocation.pathname),
          this._platformLocation.replaceState(r, o, a);
      }
      forward() {
        this._platformLocation.forward();
      }
      back() {
        this._platformLocation.back();
      }
      getState() {
        return this._platformLocation.getState();
      }
      historyGo(r = 0) {
        this._platformLocation.historyGo?.(r);
      }
    };
    (t.ɵfac = function (o) {
      return new (o || t)(U(ya), U(rf, 8));
    }),
      (t.ɵprov = P({ token: t, factory: t.ɵfac }));
    let e = t;
    return e;
  })(),
  YD = (() => {
    let t = class t {
      constructor(r) {
        (this._subject = new fe()),
          (this._urlChangeListeners = []),
          (this._urlChangeSubscription = null),
          (this._locationStrategy = r);
        let o = this._locationStrategy.getBaseHref();
        (this._basePath = JD(Jd(Xd(o)))),
          this._locationStrategy.onPopState((i) => {
            this._subject.emit({
              url: this.path(!0),
              pop: !0,
              state: i.state,
              type: i.type,
            });
          });
      }
      ngOnDestroy() {
        this._urlChangeSubscription?.unsubscribe(),
          (this._urlChangeListeners = []);
      }
      path(r = !1) {
        return this.normalize(this._locationStrategy.path(r));
      }
      getState() {
        return this._locationStrategy.getState();
      }
      isCurrentPathEqualTo(r, o = '') {
        return this.path() == this.normalize(r + ke(o));
      }
      normalize(r) {
        return t.stripTrailingSlash(KD(this._basePath, Xd(r)));
      }
      prepareExternalUrl(r) {
        return (
          r && r[0] !== '/' && (r = '/' + r),
          this._locationStrategy.prepareExternalUrl(r)
        );
      }
      go(r, o = '', i = null) {
        this._locationStrategy.pushState(i, '', r, o),
          this._notifyUrlChangeListeners(this.prepareExternalUrl(r + ke(o)), i);
      }
      replaceState(r, o = '', i = null) {
        this._locationStrategy.replaceState(i, '', r, o),
          this._notifyUrlChangeListeners(this.prepareExternalUrl(r + ke(o)), i);
      }
      forward() {
        this._locationStrategy.forward();
      }
      back() {
        this._locationStrategy.back();
      }
      historyGo(r = 0) {
        this._locationStrategy.historyGo?.(r);
      }
      onUrlChange(r) {
        return (
          this._urlChangeListeners.push(r),
          (this._urlChangeSubscription ??= this.subscribe((o) => {
            this._notifyUrlChangeListeners(o.url, o.state);
          })),
          () => {
            let o = this._urlChangeListeners.indexOf(r);
            this._urlChangeListeners.splice(o, 1),
              this._urlChangeListeners.length === 0 &&
                (this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeSubscription = null));
          }
        );
      }
      _notifyUrlChangeListeners(r = '', o) {
        this._urlChangeListeners.forEach((i) => i(r, o));
      }
      subscribe(r, o, i) {
        return this._subject.subscribe({ next: r, error: o, complete: i });
      }
    };
    (t.normalizeQueryParams = ke),
      (t.joinWithSlash = va),
      (t.stripTrailingSlash = Jd),
      (t.ɵfac = function (o) {
        return new (o || t)(U(Eo));
      }),
      (t.ɵprov = P({ token: t, factory: () => QD(), providedIn: 'root' }));
    let e = t;
    return e;
  })();
function QD() {
  return new YD(U(Eo));
}
function KD(e, t) {
  if (!e || !t.startsWith(e)) return t;
  let n = t.substring(e.length);
  return n === '' || ['/', ';', '?', '#'].includes(n[0]) ? n : t;
}
function Xd(e) {
  return e.replace(/\/index.html$/, '');
}
function JD(e) {
  if (new RegExp('^(https?:)?//').test(e)) {
    let [, n] = e.split(/\/\/[^\/]+/);
    return n;
  }
  return e;
}
function nS(e, t) {
  t = encodeURIComponent(t);
  for (let n of e.split(';')) {
    let r = n.indexOf('='),
      [o, i] = r == -1 ? [n, ''] : [n.slice(0, r), n.slice(r + 1)];
    if (o.trim() === t) return decodeURIComponent(i);
  }
  return null;
}
var da = /\s+/,
  ef = [],
  rS = (() => {
    let t = class t {
      constructor(r, o) {
        (this._ngEl = r),
          (this._renderer = o),
          (this.initialClasses = ef),
          (this.stateMap = new Map());
      }
      set klass(r) {
        this.initialClasses = r != null ? r.trim().split(da) : ef;
      }
      set ngClass(r) {
        this.rawClass = typeof r == 'string' ? r.trim().split(da) : r;
      }
      ngDoCheck() {
        for (let o of this.initialClasses) this._updateState(o, !0);
        let r = this.rawClass;
        if (Array.isArray(r) || r instanceof Set)
          for (let o of r) this._updateState(o, !0);
        else if (r != null)
          for (let o of Object.keys(r)) this._updateState(o, !!r[o]);
        this._applyStateDiff();
      }
      _updateState(r, o) {
        let i = this.stateMap.get(r);
        i !== void 0
          ? (i.enabled !== o && ((i.changed = !0), (i.enabled = o)),
            (i.touched = !0))
          : this.stateMap.set(r, { enabled: o, changed: !0, touched: !0 });
      }
      _applyStateDiff() {
        for (let r of this.stateMap) {
          let o = r[0],
            i = r[1];
          i.changed
            ? (this._toggleClass(o, i.enabled), (i.changed = !1))
            : i.touched ||
              (i.enabled && this._toggleClass(o, !1), this.stateMap.delete(o)),
            (i.touched = !1);
        }
      }
      _toggleClass(r, o) {
        (r = r.trim()),
          r.length > 0 &&
            r.split(da).forEach((i) => {
              o
                ? this._renderer.addClass(this._ngEl.nativeElement, i)
                : this._renderer.removeClass(this._ngEl.nativeElement, i);
            });
      }
    };
    (t.ɵfac = function (o) {
      return new (o || t)(Pe(gt), Pe(ea));
    }),
      (t.ɵdir = Is({
        type: t,
        selectors: [['', 'ngClass', '']],
        inputs: { klass: [0, 'class', 'klass'], ngClass: 'ngClass' },
        standalone: !0,
      }));
    let e = t;
    return e;
  })();
var oS = (() => {
  let t = class t {
    constructor(r) {
      (this._viewContainerRef = r),
        (this._viewRef = null),
        (this.ngTemplateOutletContext = null),
        (this.ngTemplateOutlet = null),
        (this.ngTemplateOutletInjector = null);
    }
    ngOnChanges(r) {
      if (this._shouldRecreateView(r)) {
        let o = this._viewContainerRef;
        if (
          (this._viewRef && o.remove(o.indexOf(this._viewRef)),
          !this.ngTemplateOutlet)
        ) {
          this._viewRef = null;
          return;
        }
        let i = this._createContextForwardProxy();
        this._viewRef = o.createEmbeddedView(this.ngTemplateOutlet, i, {
          injector: this.ngTemplateOutletInjector ?? void 0,
        });
      }
    }
    _shouldRecreateView(r) {
      return !!r.ngTemplateOutlet || !!r.ngTemplateOutletInjector;
    }
    _createContextForwardProxy() {
      return new Proxy(
        {},
        {
          set: (r, o, i) =>
            this.ngTemplateOutletContext
              ? Reflect.set(this.ngTemplateOutletContext, o, i)
              : !1,
          get: (r, o, i) => {
            if (this.ngTemplateOutletContext)
              return Reflect.get(this.ngTemplateOutletContext, o, i);
          },
        }
      );
    }
  };
  (t.ɵfac = function (o) {
    return new (o || t)(Pe(xn));
  }),
    (t.ɵdir = Is({
      type: t,
      selectors: [['', 'ngTemplateOutlet', '']],
      inputs: {
        ngTemplateOutletContext: 'ngTemplateOutletContext',
        ngTemplateOutlet: 'ngTemplateOutlet',
        ngTemplateOutletInjector: 'ngTemplateOutletInjector',
      },
      standalone: !0,
      features: [Ms],
    }));
  let e = t;
  return e;
})();
function XD(e, t) {
  return new _(2100, !1);
}
var fa = class {
    createSubscription(t, n) {
      return ua(() =>
        t.subscribe({
          next: n,
          error: (r) => {
            throw r;
          },
        })
      );
    }
    dispose(t) {
      ua(() => t.unsubscribe());
    }
  },
  ha = class {
    createSubscription(t, n) {
      return t.then(n, (r) => {
        throw r;
      });
    }
    dispose(t) {}
  },
  eI = new ha(),
  tI = new fa(),
  iS = (() => {
    let t = class t {
      constructor(r) {
        (this._latestValue = null),
          (this.markForCheckOnValueUpdate = !0),
          (this._subscription = null),
          (this._obj = null),
          (this._strategy = null),
          (this._ref = r);
      }
      ngOnDestroy() {
        this._subscription && this._dispose(), (this._ref = null);
      }
      transform(r) {
        if (!this._obj) {
          if (r)
            try {
              (this.markForCheckOnValueUpdate = !1), this._subscribe(r);
            } finally {
              this.markForCheckOnValueUpdate = !0;
            }
          return this._latestValue;
        }
        return r !== this._obj
          ? (this._dispose(), this.transform(r))
          : this._latestValue;
      }
      _subscribe(r) {
        (this._obj = r),
          (this._strategy = this._selectStrategy(r)),
          (this._subscription = this._strategy.createSubscription(r, (o) =>
            this._updateLatestValue(r, o)
          ));
      }
      _selectStrategy(r) {
        if (vo(r)) return eI;
        if (sa(r)) return tI;
        throw XD(t, r);
      }
      _dispose() {
        this._strategy.dispose(this._subscription),
          (this._latestValue = null),
          (this._subscription = null),
          (this._obj = null);
      }
      _updateLatestValue(r, o) {
        r === this._obj &&
          ((this._latestValue = o),
          this.markForCheckOnValueUpdate && this._ref?.markForCheck());
      }
    };
    (t.ɵfac = function (o) {
      return new (o || t)(Pe(Io, 16));
    }),
      (t.ɵpipe = _c({ name: 'async', type: t, pure: !1, standalone: !0 }));
    let e = t;
    return e;
  })();
var sS = (() => {
    let t = class t {};
    (t.ɵfac = function (o) {
      return new (o || t)();
    }),
      (t.ɵmod = bc({ type: t })),
      (t.ɵinj = lc({}));
    let e = t;
    return e;
  })(),
  nI = 'browser',
  rI = 'server';
function oI(e) {
  return e === nI;
}
function aS(e) {
  return e === rI;
}
var uS = (() => {
    let t = class t {};
    t.ɵprov = P({
      token: t,
      providedIn: 'root',
      factory: () => (oI(C(Vs)) ? new pa(C(ma), window) : new ga()),
    });
    let e = t;
    return e;
  })(),
  pa = class {
    constructor(t, n) {
      (this.document = t), (this.window = n), (this.offset = () => [0, 0]);
    }
    setOffset(t) {
      Array.isArray(t) ? (this.offset = () => t) : (this.offset = t);
    }
    getScrollPosition() {
      return [this.window.scrollX, this.window.scrollY];
    }
    scrollToPosition(t) {
      this.window.scrollTo(t[0], t[1]);
    }
    scrollToAnchor(t) {
      let n = iI(this.document, t);
      n && (this.scrollToElement(n), n.focus());
    }
    setHistoryScrollRestoration(t) {
      this.window.history.scrollRestoration = t;
    }
    scrollToElement(t) {
      let n = t.getBoundingClientRect(),
        r = n.left + this.window.pageXOffset,
        o = n.top + this.window.pageYOffset,
        i = this.offset();
      this.window.scrollTo(r - i[0], o - i[1]);
    }
  };
function iI(e, t) {
  let n = e.getElementById(t) || e.getElementsByName(t)[0];
  if (n) return n;
  if (
    typeof e.createTreeWalker == 'function' &&
    e.body &&
    typeof e.body.attachShadow == 'function'
  ) {
    let r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT),
      o = r.currentNode;
    for (; o; ) {
      let i = o.shadowRoot;
      if (i) {
        let s = i.getElementById(t) || i.querySelector(`[name="${t}"]`);
        if (s) return s;
      }
      o = r.nextNode();
    }
  }
  return null;
}
var ga = class {
    setOffset(t) {}
    getScrollPosition() {
      return [0, 0];
    }
    scrollToPosition(t) {}
    scrollToAnchor(t) {}
    setHistoryScrollRestoration(t) {}
  },
  tf = class {};
var Le = (function (e) {
    return (
      (e[(e.State = 0)] = 'State'),
      (e[(e.Transition = 1)] = 'Transition'),
      (e[(e.Sequence = 2)] = 'Sequence'),
      (e[(e.Group = 3)] = 'Group'),
      (e[(e.Animate = 4)] = 'Animate'),
      (e[(e.Keyframes = 5)] = 'Keyframes'),
      (e[(e.Style = 6)] = 'Style'),
      (e[(e.Trigger = 7)] = 'Trigger'),
      (e[(e.Reference = 8)] = 'Reference'),
      (e[(e.AnimateChild = 9)] = 'AnimateChild'),
      (e[(e.AnimateRef = 10)] = 'AnimateRef'),
      (e[(e.Query = 11)] = 'Query'),
      (e[(e.Stagger = 12)] = 'Stagger'),
      e
    );
  })(Le || {}),
  dS = '*';
function fS(e, t) {
  return { type: Le.Trigger, name: e, definitions: t, options: {} };
}
function hS(e, t = null) {
  return { type: Le.Animate, styles: t, timings: e };
}
function pS(e, t = null) {
  return { type: Le.Sequence, steps: e, options: t };
}
function gS(e) {
  return { type: Le.Style, styles: e, offset: null };
}
function mS(e, t, n) {
  return { type: Le.State, name: e, styles: t, options: n };
}
function yS(e, t, n = null) {
  return { type: Le.Transition, expr: e, animation: t, options: n };
}
function vS(e = null) {
  return { type: Le.AnimateChild, options: e };
}
function DS(e, t, n = null) {
  return { type: Le.Query, selector: e, animation: t, options: n };
}
var of = class {
    constructor(t = 0, n = 0) {
      (this._onDoneFns = []),
        (this._onStartFns = []),
        (this._onDestroyFns = []),
        (this._originalOnDoneFns = []),
        (this._originalOnStartFns = []),
        (this._started = !1),
        (this._destroyed = !1),
        (this._finished = !1),
        (this._position = 0),
        (this.parentPlayer = null),
        (this.totalTime = t + n);
    }
    _onFinish() {
      this._finished ||
        ((this._finished = !0),
        this._onDoneFns.forEach((t) => t()),
        (this._onDoneFns = []));
    }
    onStart(t) {
      this._originalOnStartFns.push(t), this._onStartFns.push(t);
    }
    onDone(t) {
      this._originalOnDoneFns.push(t), this._onDoneFns.push(t);
    }
    onDestroy(t) {
      this._onDestroyFns.push(t);
    }
    hasStarted() {
      return this._started;
    }
    init() {}
    play() {
      this.hasStarted() || (this._onStart(), this.triggerMicrotask()),
        (this._started = !0);
    }
    triggerMicrotask() {
      queueMicrotask(() => this._onFinish());
    }
    _onStart() {
      this._onStartFns.forEach((t) => t()), (this._onStartFns = []);
    }
    pause() {}
    restart() {}
    finish() {
      this._onFinish();
    }
    destroy() {
      this._destroyed ||
        ((this._destroyed = !0),
        this.hasStarted() || this._onStart(),
        this.finish(),
        this._onDestroyFns.forEach((t) => t()),
        (this._onDestroyFns = []));
    }
    reset() {
      (this._started = !1),
        (this._finished = !1),
        (this._onStartFns = this._originalOnStartFns),
        (this._onDoneFns = this._originalOnDoneFns);
    }
    setPosition(t) {
      this._position = this.totalTime ? t * this.totalTime : 1;
    }
    getPosition() {
      return this.totalTime ? this._position / this.totalTime : 1;
    }
    triggerCallback(t) {
      let n = t == 'start' ? this._onStartFns : this._onDoneFns;
      n.forEach((r) => r()), (n.length = 0);
    }
  },
  sf = class {
    constructor(t) {
      (this._onDoneFns = []),
        (this._onStartFns = []),
        (this._finished = !1),
        (this._started = !1),
        (this._destroyed = !1),
        (this._onDestroyFns = []),
        (this.parentPlayer = null),
        (this.totalTime = 0),
        (this.players = t);
      let n = 0,
        r = 0,
        o = 0,
        i = this.players.length;
      i == 0
        ? queueMicrotask(() => this._onFinish())
        : this.players.forEach((s) => {
            s.onDone(() => {
              ++n == i && this._onFinish();
            }),
              s.onDestroy(() => {
                ++r == i && this._onDestroy();
              }),
              s.onStart(() => {
                ++o == i && this._onStart();
              });
          }),
        (this.totalTime = this.players.reduce(
          (s, a) => Math.max(s, a.totalTime),
          0
        ));
    }
    _onFinish() {
      this._finished ||
        ((this._finished = !0),
        this._onDoneFns.forEach((t) => t()),
        (this._onDoneFns = []));
    }
    init() {
      this.players.forEach((t) => t.init());
    }
    onStart(t) {
      this._onStartFns.push(t);
    }
    _onStart() {
      this.hasStarted() ||
        ((this._started = !0),
        this._onStartFns.forEach((t) => t()),
        (this._onStartFns = []));
    }
    onDone(t) {
      this._onDoneFns.push(t);
    }
    onDestroy(t) {
      this._onDestroyFns.push(t);
    }
    hasStarted() {
      return this._started;
    }
    play() {
      this.parentPlayer || this.init(),
        this._onStart(),
        this.players.forEach((t) => t.play());
    }
    pause() {
      this.players.forEach((t) => t.pause());
    }
    restart() {
      this.players.forEach((t) => t.restart());
    }
    finish() {
      this._onFinish(), this.players.forEach((t) => t.finish());
    }
    destroy() {
      this._onDestroy();
    }
    _onDestroy() {
      this._destroyed ||
        ((this._destroyed = !0),
        this._onFinish(),
        this.players.forEach((t) => t.destroy()),
        this._onDestroyFns.forEach((t) => t()),
        (this._onDestroyFns = []));
    }
    reset() {
      this.players.forEach((t) => t.reset()),
        (this._destroyed = !1),
        (this._finished = !1),
        (this._started = !1);
    }
    setPosition(t) {
      let n = t * this.totalTime;
      this.players.forEach((r) => {
        let o = r.totalTime ? Math.min(1, n / r.totalTime) : 1;
        r.setPosition(o);
      });
    }
    getPosition() {
      let t = this.players.reduce(
        (n, r) => (n === null || r.totalTime > n.totalTime ? r : n),
        null
      );
      return t != null ? t.getPosition() : 0;
    }
    beforeDestroy() {
      this.players.forEach((t) => {
        t.beforeDestroy && t.beforeDestroy();
      });
    }
    triggerCallback(t) {
      let n = t == 'start' ? this._onStartFns : this._onDoneFns;
      n.forEach((r) => r()), (n.length = 0);
    }
  },
  IS = '!';
export {
  pe as a,
  ge as b,
  sI as c,
  aI as d,
  uI as e,
  cI as f,
  mf as g,
  k as h,
  xf as i,
  S as j,
  jo as k,
  Vo as l,
  ie as m,
  Xt as n,
  tn as o,
  Xe as p,
  ye as q,
  Lf as r,
  jf as s,
  Vf as t,
  tt as u,
  Me as v,
  qf as w,
  xe as x,
  on as y,
  ir as z,
  Yf as A,
  Qf as B,
  $o as C,
  rh as D,
  nt as E,
  oh as F,
  cu as G,
  ih as H,
  sh as I,
  lu as J,
  sn as K,
  Ho as L,
  ah as M,
  uh as N,
  dh as O,
  du as P,
  Uo as Q,
  fh as R,
  hh as S,
  Go as T,
  ph as U,
  gh as V,
  fu as W,
  mh as X,
  yh as Y,
  vh as Z,
  Dh as _,
  _ as $,
  uc as aa,
  P as ba,
  lc as ca,
  M0 as da,
  N as ea,
  x as fa,
  U as ga,
  C as ha,
  Bh as ia,
  $h as ja,
  ln as ka,
  x0 as la,
  bc as ma,
  Is as na,
  lp as oa,
  Rc as pa,
  Ue as qa,
  wp as ra,
  Cs as sa,
  Ms as ta,
  S0 as ua,
  T0 as va,
  N0 as wa,
  A0 as xa,
  O0 as ya,
  lg as za,
  Ne as Aa,
  In as Ba,
  En as Ca,
  fe as Da,
  ee as Ea,
  Ge as Fa,
  F0 as Ga,
  gt as Ha,
  Mi as Ia,
  R0 as Ja,
  P0 as Ka,
  Ng as La,
  Vs as Ma,
  k0 as Na,
  L0 as Oa,
  wn as Pa,
  _l as Qa,
  j0 as Ra,
  V0 as Sa,
  B0 as Ta,
  $0 as Ua,
  H0 as Va,
  Ml as Wa,
  U0 as Xa,
  $s as Ya,
  z0 as Za,
  Lr as _a,
  G0 as $a,
  Pe as ab,
  W0 as bb,
  mn as cb,
  Vt as db,
  Bt as eb,
  $r as fb,
  ea as gb,
  Ce as hb,
  Z as ib,
  Iy as jb,
  Ey as kb,
  xn as lb,
  Gy as mb,
  Wy as nb,
  Q0 as ob,
  K0 as pb,
  ev as qb,
  sv as rb,
  Qi as sb,
  av as tb,
  pv as ub,
  yv as vb,
  Tv as wb,
  Ad as xb,
  Nv as yb,
  J0 as zb,
  X0 as Ab,
  ex as Bb,
  tx as Cb,
  nx as Db,
  rx as Eb,
  Vd as Fb,
  Bd as Gb,
  Uv as Hb,
  $d as Ib,
  Hd as Jb,
  Wv as Kb,
  ox as Lb,
  Zv as Mb,
  Yv as Nb,
  Xv as Ob,
  eD as Pb,
  ix as Qb,
  sx as Rb,
  ax as Sb,
  oD as Tb,
  ux as Ub,
  cx as Vb,
  lx as Wb,
  dx as Xb,
  fx as Yb,
  hx as Zb,
  px as _b,
  gx as $b,
  aD as ac,
  zd as bc,
  uD as cc,
  cD as dc,
  mx as ec,
  lD as fc,
  yx as gc,
  vx as hc,
  Dx as ic,
  Ix as jc,
  Ex as kc,
  wx as lc,
  vo as mc,
  ED as nc,
  wD as oc,
  Do as pc,
  Cx as qc,
  bx as rc,
  Io as sc,
  Qd as tc,
  _x as uc,
  Mx as vc,
  $D as wc,
  HD as xc,
  xx as yc,
  ua as zc,
  GD as Ac,
  Sx as Bc,
  la as Cc,
  Xx as Dc,
  Kd as Ec,
  ma as Fc,
  eS as Gc,
  Eo as Hc,
  ZD as Ic,
  tS as Jc,
  YD as Kc,
  nS as Lc,
  rS as Mc,
  oS as Nc,
  iS as Oc,
  sS as Pc,
  nI as Qc,
  oI as Rc,
  aS as Sc,
  uS as Tc,
  tf as Uc,
  Le as Vc,
  dS as Wc,
  fS as Xc,
  hS as Yc,
  pS as Zc,
  gS as _c,
  mS as $c,
  yS as ad,
  vS as bd,
  DS as cd,
  of as dd,
  sf as ed,
  IS as fd,
};