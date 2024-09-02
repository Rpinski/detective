var Hd = Object.create;
var ho = Object.defineProperty,
  Ud = Object.defineProperties,
  zd = Object.getOwnPropertyDescriptor,
  Gd = Object.getOwnPropertyDescriptors,
  Wd = Object.getOwnPropertyNames,
  In = Object.getOwnPropertySymbols,
  qd = Object.getPrototypeOf,
  po = Object.prototype.hasOwnProperty,
  ca = Object.prototype.propertyIsEnumerable;
var ua = (e, t, n) =>
    t in e
      ? ho(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (e[t] = n),
  Fe = (e, t) => {
    for (var n in (t ||= {})) po.call(t, n) && ua(e, n, t[n]);
    if (In) for (var n of In(t)) ca.call(t, n) && ua(e, n, t[n]);
    return e;
  },
  Re = (e, t) => Ud(e, Gd(t));
var kD = ((e) =>
  typeof require < 'u'
    ? require
    : typeof Proxy < 'u'
      ? new Proxy(e, { get: (t, n) => (typeof require < 'u' ? require : t)[n] })
      : e)(function (e) {
  if (typeof require < 'u') return require.apply(this, arguments);
  throw Error('Dynamic require of "' + e + '" is not supported');
});
var LD = (e, t) => {
  var n = {};
  for (var r in e) po.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && In)
    for (var r of In(e)) t.indexOf(r) < 0 && ca.call(e, r) && (n[r] = e[r]);
  return n;
};
var jD = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var Zd = (e, t, n, r) => {
  if ((t && typeof t == 'object') || typeof t == 'function')
    for (let o of Wd(t))
      !po.call(e, o) &&
        o !== n &&
        ho(e, o, {
          get: () => t[o],
          enumerable: !(r = zd(t, o)) || r.enumerable,
        });
  return e;
};
var VD = (e, t, n) => (
  (n = e != null ? Hd(qd(e)) : {}),
  Zd(
    t || !e || !e.__esModule
      ? ho(n, 'default', { value: e, enumerable: !0 })
      : n,
    e
  )
);
var Yd = (e, t, n) =>
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
function la(e, t) {
  return Object.is(e, t);
}
var L = null,
  En = !1,
  wn = 1,
  ue = Symbol('SIGNAL');
function b(e) {
  let t = L;
  return (L = e), t;
}
function da() {
  return L;
}
var Wt = {
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
function yo(e) {
  if (En) throw new Error('');
  if (L === null) return;
  L.consumerOnSignalRead(e);
  let t = L.nextProducerIndex++;
  if ((Mn(L), t < L.producerNode.length && L.producerNode[t] !== e && Gt(L))) {
    let n = L.producerNode[t];
    _n(n, L.producerIndexOfThis[t]);
  }
  L.producerNode[t] !== e &&
    ((L.producerNode[t] = e),
    (L.producerIndexOfThis[t] = Gt(L) ? ga(e, L, t) : 0)),
    (L.producerLastReadVersion[t] = e.version);
}
function Qd() {
  wn++;
}
function fa(e) {
  if (!(Gt(e) && !e.dirty) && !(!e.dirty && e.lastCleanEpoch === wn)) {
    if (!e.producerMustRecompute(e) && !Do(e)) {
      (e.dirty = !1), (e.lastCleanEpoch = wn);
      return;
    }
    e.producerRecomputeValue(e), (e.dirty = !1), (e.lastCleanEpoch = wn);
  }
}
function ha(e) {
  if (e.liveConsumerNode === void 0) return;
  let t = En;
  En = !0;
  try {
    for (let n of e.liveConsumerNode) n.dirty || Kd(n);
  } finally {
    En = t;
  }
}
function pa() {
  return L?.consumerAllowSignalWrites !== !1;
}
function Kd(e) {
  (e.dirty = !0), ha(e), e.consumerMarkedDirty?.(e);
}
function bn(e) {
  return e && (e.nextProducerIndex = 0), b(e);
}
function vo(e, t) {
  if (
    (b(t),
    !(
      !e ||
      e.producerNode === void 0 ||
      e.producerIndexOfThis === void 0 ||
      e.producerLastReadVersion === void 0
    ))
  ) {
    if (Gt(e))
      for (let n = e.nextProducerIndex; n < e.producerNode.length; n++)
        _n(e.producerNode[n], e.producerIndexOfThis[n]);
    for (; e.producerNode.length > e.nextProducerIndex; )
      e.producerNode.pop(),
        e.producerLastReadVersion.pop(),
        e.producerIndexOfThis.pop();
  }
}
function Do(e) {
  Mn(e);
  for (let t = 0; t < e.producerNode.length; t++) {
    let n = e.producerNode[t],
      r = e.producerLastReadVersion[t];
    if (r !== n.version || (fa(n), r !== n.version)) return !0;
  }
  return !1;
}
function Io(e) {
  if ((Mn(e), Gt(e)))
    for (let t = 0; t < e.producerNode.length; t++)
      _n(e.producerNode[t], e.producerIndexOfThis[t]);
  (e.producerNode.length =
    e.producerLastReadVersion.length =
    e.producerIndexOfThis.length =
      0),
    e.liveConsumerNode &&
      (e.liveConsumerNode.length = e.liveConsumerIndexOfThis.length = 0);
}
function ga(e, t, n) {
  if ((ma(e), e.liveConsumerNode.length === 0 && ya(e)))
    for (let r = 0; r < e.producerNode.length; r++)
      e.producerIndexOfThis[r] = ga(e.producerNode[r], e, r);
  return e.liveConsumerIndexOfThis.push(n), e.liveConsumerNode.push(t) - 1;
}
function _n(e, t) {
  if ((ma(e), e.liveConsumerNode.length === 1 && ya(e)))
    for (let r = 0; r < e.producerNode.length; r++)
      _n(e.producerNode[r], e.producerIndexOfThis[r]);
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
    Mn(o), (o.producerIndexOfThis[r] = t);
  }
}
function Gt(e) {
  return e.consumerIsAlwaysLive || (e?.liveConsumerNode?.length ?? 0) > 0;
}
function Mn(e) {
  (e.producerNode ??= []),
    (e.producerIndexOfThis ??= []),
    (e.producerLastReadVersion ??= []);
}
function ma(e) {
  (e.liveConsumerNode ??= []), (e.liveConsumerIndexOfThis ??= []);
}
function ya(e) {
  return e.producerNode !== void 0;
}
function Eo(e) {
  let t = Object.create(Jd);
  t.computation = e;
  let n = () => {
    if ((fa(t), yo(t), t.value === Cn)) throw t.error;
    return t.value;
  };
  return (n[ue] = t), n;
}
var go = Symbol('UNSET'),
  mo = Symbol('COMPUTING'),
  Cn = Symbol('ERRORED'),
  Jd = Re(Fe({}, Wt), {
    value: go,
    dirty: !0,
    error: null,
    equal: la,
    producerMustRecompute(e) {
      return e.value === go || e.value === mo;
    },
    producerRecomputeValue(e) {
      if (e.value === mo) throw new Error('Detected cycle in computations.');
      let t = e.value;
      e.value = mo;
      let n = bn(e),
        r;
      try {
        r = e.computation();
      } catch (o) {
        (r = Cn), (e.error = o);
      } finally {
        vo(e, n);
      }
      if (t !== go && t !== Cn && r !== Cn && e.equal(t, r)) {
        e.value = t;
        return;
      }
      (e.value = r), e.version++;
    },
  });
function Xd() {
  throw new Error();
}
var va = Xd;
function Da() {
  va();
}
function Ia(e) {
  va = e;
}
var ef = null;
function Ea(e) {
  let t = Object.create(Ca);
  t.value = e;
  let n = () => (yo(t), t.value);
  return (n[ue] = t), n;
}
function wo(e, t) {
  pa() || Da(), e.equal(e.value, t) || ((e.value = t), tf(e));
}
function wa(e, t) {
  pa() || Da(), wo(e, t(e.value));
}
var Ca = Re(Fe({}, Wt), { equal: la, value: void 0 });
function tf(e) {
  e.version++, Qd(), ha(e), ef?.();
}
function m(e) {
  return typeof e == 'function';
}
function mt(e) {
  let n = e((r) => {
    Error.call(r), (r.stack = new Error().stack);
  });
  return (
    (n.prototype = Object.create(Error.prototype)),
    (n.prototype.constructor = n),
    n
  );
}
var xn = mt(
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
function qe(e, t) {
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
          t = i instanceof xn ? i.errors : [i];
        }
      let { _finalizers: o } = this;
      if (o) {
        this._finalizers = null;
        for (let i of o)
          try {
            ba(i);
          } catch (s) {
            (t = t ?? []),
              s instanceof xn ? (t = [...t, ...s.errors]) : t.push(s);
          }
      }
      if (t) throw new xn(t);
    }
  }
  add(t) {
    var n;
    if (t && t !== this)
      if (this.closed) ba(t);
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
    n === t ? (this._parentage = null) : Array.isArray(n) && qe(n, t);
  }
  remove(t) {
    let { _finalizers: n } = this;
    n && qe(n, t), t instanceof e && t._removeParent(this);
  }
};
k.EMPTY = (() => {
  let e = new k();
  return (e.closed = !0), e;
})();
var Co = k.EMPTY;
function Sn(e) {
  return (
    e instanceof k ||
    (e && 'closed' in e && m(e.remove) && m(e.add) && m(e.unsubscribe))
  );
}
function ba(e) {
  m(e) ? e() : e.unsubscribe();
}
var ce = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1,
};
var yt = {
  setTimeout(e, t, ...n) {
    let { delegate: r } = yt;
    return r?.setTimeout ? r.setTimeout(e, t, ...n) : setTimeout(e, t, ...n);
  },
  clearTimeout(e) {
    let { delegate: t } = yt;
    return (t?.clearTimeout || clearTimeout)(e);
  },
  delegate: void 0,
};
function Tn(e) {
  yt.setTimeout(() => {
    let { onUnhandledError: t } = ce;
    if (t) t(e);
    else throw e;
  });
}
function qt() {}
var _a = bo('C', void 0, void 0);
function Ma(e) {
  return bo('E', void 0, e);
}
function xa(e) {
  return bo('N', e, void 0);
}
function bo(e, t, n) {
  return { kind: e, value: t, error: n };
}
var Ze = null;
function vt(e) {
  if (ce.useDeprecatedSynchronousErrorHandling) {
    let t = !Ze;
    if ((t && (Ze = { errorThrown: !1, error: null }), e(), t)) {
      let { errorThrown: n, error: r } = Ze;
      if (((Ze = null), n)) throw r;
    }
  } else e();
}
function Sa(e) {
  ce.useDeprecatedSynchronousErrorHandling &&
    Ze &&
    ((Ze.errorThrown = !0), (Ze.error = e));
}
var Ye = class extends k {
    constructor(t) {
      super(),
        (this.isStopped = !1),
        t
          ? ((this.destination = t), Sn(t) && t.add(this))
          : (this.destination = of);
    }
    static create(t, n, r) {
      return new we(t, n, r);
    }
    next(t) {
      this.isStopped ? Mo(xa(t), this) : this._next(t);
    }
    error(t) {
      this.isStopped
        ? Mo(Ma(t), this)
        : ((this.isStopped = !0), this._error(t));
    }
    complete() {
      this.isStopped ? Mo(_a, this) : ((this.isStopped = !0), this._complete());
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
  nf = Function.prototype.bind;
function _o(e, t) {
  return nf.call(e, t);
}
var xo = class {
    constructor(t) {
      this.partialObserver = t;
    }
    next(t) {
      let { partialObserver: n } = this;
      if (n.next)
        try {
          n.next(t);
        } catch (r) {
          Nn(r);
        }
    }
    error(t) {
      let { partialObserver: n } = this;
      if (n.error)
        try {
          n.error(t);
        } catch (r) {
          Nn(r);
        }
      else Nn(t);
    }
    complete() {
      let { partialObserver: t } = this;
      if (t.complete)
        try {
          t.complete();
        } catch (n) {
          Nn(n);
        }
    }
  },
  we = class extends Ye {
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
              next: t.next && _o(t.next, i),
              error: t.error && _o(t.error, i),
              complete: t.complete && _o(t.complete, i),
            }))
          : (o = t);
      }
      this.destination = new xo(o);
    }
  };
function Nn(e) {
  ce.useDeprecatedSynchronousErrorHandling ? Sa(e) : Tn(e);
}
function rf(e) {
  throw e;
}
function Mo(e, t) {
  let { onStoppedNotification: n } = ce;
  n && yt.setTimeout(() => n(e, t));
}
var of = { closed: !0, next: qt, error: rf, complete: qt };
var Dt = (typeof Symbol == 'function' && Symbol.observable) || '@@observable';
function G(e) {
  return e;
}
function sf(...e) {
  return So(e);
}
function So(e) {
  return e.length === 0
    ? G
    : e.length === 1
      ? e[0]
      : function (n) {
          return e.reduce((r, o) => o(r), n);
        };
}
var x = (() => {
  class e {
    constructor(n) {
      n && (this._subscribe = n);
    }
    lift(n) {
      let r = new e();
      return (r.source = this), (r.operator = n), r;
    }
    subscribe(n, r, o) {
      let i = uf(n) ? n : new we(n, r, o);
      return (
        vt(() => {
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
        (r = Ta(r)),
        new r((o, i) => {
          let s = new we({
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
    [Dt]() {
      return this;
    }
    pipe(...n) {
      return So(n)(this);
    }
    toPromise(n) {
      return (
        (n = Ta(n)),
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
function Ta(e) {
  var t;
  return (t = e ?? ce.Promise) !== null && t !== void 0 ? t : Promise;
}
function af(e) {
  return e && m(e.next) && m(e.error) && m(e.complete);
}
function uf(e) {
  return (e && e instanceof Ye) || (af(e) && Sn(e));
}
function To(e) {
  return m(e?.lift);
}
function D(e) {
  return (t) => {
    if (To(t))
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
function E(e, t, n, r, o) {
  return new No(e, t, n, r, o);
}
var No = class extends Ye {
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
function Ao() {
  return D((e, t) => {
    let n = null;
    e._refCount++;
    let r = E(t, void 0, void 0, void 0, () => {
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
var Oo = class extends x {
  constructor(t, n) {
    super(),
      (this.source = t),
      (this.subjectFactory = n),
      (this._subject = null),
      (this._refCount = 0),
      (this._connection = null),
      To(t) && (this.lift = t.lift);
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
          E(
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
    return Ao()(this);
  }
};
var Na = mt(
  (e) =>
    function () {
      e(this),
        (this.name = 'ObjectUnsubscribedError'),
        (this.message = 'object unsubscribed');
    }
);
var re = (() => {
    class e extends x {
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
        let r = new An(this, this);
        return (r.operator = n), r;
      }
      _throwIfClosed() {
        if (this.closed) throw new Na();
      }
      next(n) {
        vt(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.currentObservers ||
              (this.currentObservers = Array.from(this.observers));
            for (let r of this.currentObservers) r.next(n);
          }
        });
      }
      error(n) {
        vt(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            (this.hasError = this.isStopped = !0), (this.thrownError = n);
            let { observers: r } = this;
            for (; r.length; ) r.shift().error(n);
          }
        });
      }
      complete() {
        vt(() => {
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
          ? Co
          : ((this.currentObservers = null),
            i.push(n),
            new k(() => {
              (this.currentObservers = null), qe(i, n);
            }));
      }
      _checkFinalizedStatuses(n) {
        let { hasError: r, thrownError: o, isStopped: i } = this;
        r ? n.error(o) : i && n.complete();
      }
      asObservable() {
        let n = new x();
        return (n.source = this), n;
      }
    }
    return (e.create = (t, n) => new An(t, n)), e;
  })(),
  An = class extends re {
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
        : Co;
    }
  };
var Zt = class extends re {
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
var Yt = {
  now() {
    return (Yt.delegate || Date).now();
  },
  delegate: void 0,
};
var On = class extends re {
  constructor(t = 1 / 0, n = 1 / 0, r = Yt) {
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
var Fn = class extends k {
  constructor(t, n) {
    super();
  }
  schedule(t, n = 0) {
    return this;
  }
};
var Qt = {
  setInterval(e, t, ...n) {
    let { delegate: r } = Qt;
    return r?.setInterval ? r.setInterval(e, t, ...n) : setInterval(e, t, ...n);
  },
  clearInterval(e) {
    let { delegate: t } = Qt;
    return (t?.clearInterval || clearInterval)(e);
  },
  delegate: void 0,
};
var Rn = class extends Fn {
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
    return Qt.setInterval(t.flush.bind(t, this), r);
  }
  recycleAsyncId(t, n, r = 0) {
    if (r != null && this.delay === r && this.pending === !1) return n;
    n != null && Qt.clearInterval(n);
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
        qe(r, this),
        t != null && (this.id = this.recycleAsyncId(n, t, null)),
        (this.delay = null),
        super.unsubscribe();
    }
  }
};
var It = class e {
  constructor(t, n = e.now) {
    (this.schedulerActionCtor = t), (this.now = n);
  }
  schedule(t, n = 0, r) {
    return new this.schedulerActionCtor(this, t).schedule(r, n);
  }
};
It.now = Yt.now;
var Pn = class extends It {
  constructor(t, n = It.now) {
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
var Kt = new Pn(Rn),
  Aa = Kt;
var Qe = new x((e) => e.complete());
function kn(e) {
  return e && m(e.schedule);
}
function Fo(e) {
  return e[e.length - 1];
}
function Ln(e) {
  return m(Fo(e)) ? e.pop() : void 0;
}
function pe(e) {
  return kn(Fo(e)) ? e.pop() : void 0;
}
function Oa(e, t) {
  return typeof Fo(e) == 'number' ? e.pop() : t;
}
function Ra(e, t, n, r) {
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
function Fa(e) {
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
function Ke(e) {
  return this instanceof Ke ? ((this.v = e), this) : new Ke(e);
}
function Pa(e, t, n) {
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
        return new Promise(function (T, C) {
          i.push([f, g, T, C]) > 1 || u(f, g);
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
    f.value instanceof Ke
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
function ka(e) {
  if (!Symbol.asyncIterator)
    throw new TypeError('Symbol.asyncIterator is not defined.');
  var t = e[Symbol.asyncIterator],
    n;
  return t
    ? t.call(e)
    : ((e = typeof Fa == 'function' ? Fa(e) : e[Symbol.iterator]()),
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
var Et = (e) => e && typeof e.length == 'number' && typeof e != 'function';
function jn(e) {
  return m(e?.then);
}
function Vn(e) {
  return m(e[Dt]);
}
function Bn(e) {
  return Symbol.asyncIterator && m(e?.[Symbol.asyncIterator]);
}
function $n(e) {
  return new TypeError(
    `You provided ${e !== null && typeof e == 'object' ? 'an invalid object' : `'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
  );
}
function cf() {
  return typeof Symbol != 'function' || !Symbol.iterator
    ? '@@iterator'
    : Symbol.iterator;
}
var Hn = cf();
function Un(e) {
  return m(e?.[Hn]);
}
function zn(e) {
  return Pa(this, arguments, function* () {
    let n = e.getReader();
    try {
      for (;;) {
        let { value: r, done: o } = yield Ke(n.read());
        if (o) return yield Ke(void 0);
        yield yield Ke(r);
      }
    } finally {
      n.releaseLock();
    }
  });
}
function Gn(e) {
  return m(e?.getReader);
}
function N(e) {
  if (e instanceof x) return e;
  if (e != null) {
    if (Vn(e)) return lf(e);
    if (Et(e)) return df(e);
    if (jn(e)) return ff(e);
    if (Bn(e)) return La(e);
    if (Un(e)) return hf(e);
    if (Gn(e)) return pf(e);
  }
  throw $n(e);
}
function lf(e) {
  return new x((t) => {
    let n = e[Dt]();
    if (m(n.subscribe)) return n.subscribe(t);
    throw new TypeError(
      'Provided object does not correctly implement Symbol.observable'
    );
  });
}
function df(e) {
  return new x((t) => {
    for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
    t.complete();
  });
}
function ff(e) {
  return new x((t) => {
    e.then(
      (n) => {
        t.closed || (t.next(n), t.complete());
      },
      (n) => t.error(n)
    ).then(null, Tn);
  });
}
function hf(e) {
  return new x((t) => {
    for (let n of e) if ((t.next(n), t.closed)) return;
    t.complete();
  });
}
function La(e) {
  return new x((t) => {
    gf(e, t).catch((n) => t.error(n));
  });
}
function pf(e) {
  return La(zn(e));
}
function gf(e, t) {
  var n, r, o, i;
  return Ra(this, void 0, void 0, function* () {
    try {
      for (n = ka(e); (r = yield n.next()), !r.done; ) {
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
function Q(e, t, n, r = 0, o = !1) {
  let i = t.schedule(function () {
    n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
  }, r);
  if ((e.add(i), !o)) return i;
}
function Wn(e, t = 0) {
  return D((n, r) => {
    n.subscribe(
      E(
        r,
        (o) => Q(r, e, () => r.next(o), t),
        () => Q(r, e, () => r.complete(), t),
        (o) => Q(r, e, () => r.error(o), t)
      )
    );
  });
}
function qn(e, t = 0) {
  return D((n, r) => {
    r.add(e.schedule(() => n.subscribe(r), t));
  });
}
function ja(e, t) {
  return N(e).pipe(qn(t), Wn(t));
}
function Va(e, t) {
  return N(e).pipe(qn(t), Wn(t));
}
function Ba(e, t) {
  return new x((n) => {
    let r = 0;
    return t.schedule(function () {
      r === e.length
        ? n.complete()
        : (n.next(e[r++]), n.closed || this.schedule());
    });
  });
}
function $a(e, t) {
  return new x((n) => {
    let r;
    return (
      Q(n, t, () => {
        (r = e[Hn]()),
          Q(
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
function Zn(e, t) {
  if (!e) throw new Error('Iterable cannot be null');
  return new x((n) => {
    Q(n, t, () => {
      let r = e[Symbol.asyncIterator]();
      Q(
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
function Ha(e, t) {
  return Zn(zn(e), t);
}
function Ua(e, t) {
  if (e != null) {
    if (Vn(e)) return ja(e, t);
    if (Et(e)) return Ba(e, t);
    if (jn(e)) return Va(e, t);
    if (Bn(e)) return Zn(e, t);
    if (Un(e)) return $a(e, t);
    if (Gn(e)) return Ha(e, t);
  }
  throw $n(e);
}
function ge(e, t) {
  return t ? Ua(e, t) : N(e);
}
function mf(...e) {
  let t = pe(e);
  return ge(e, t);
}
function yf(e, t) {
  let n = m(e) ? e : () => e,
    r = (o) => o.error(n());
  return new x(t ? (o) => t.schedule(r, 0, o) : r);
}
function vf(e) {
  return !!e && (e instanceof x || (m(e.lift) && m(e.subscribe)));
}
var Je = mt(
  (e) =>
    function () {
      e(this),
        (this.name = 'EmptyError'),
        (this.message = 'no elements in sequence');
    }
);
function za(e) {
  return e instanceof Date && !isNaN(e);
}
function Ce(e, t) {
  return D((n, r) => {
    let o = 0;
    n.subscribe(
      E(r, (i) => {
        r.next(e.call(t, i, o++));
      })
    );
  });
}
var { isArray: Df } = Array;
function If(e, t) {
  return Df(t) ? e(...t) : e(t);
}
function wt(e) {
  return Ce((t) => If(e, t));
}
var { isArray: Ef } = Array,
  { getPrototypeOf: wf, prototype: Cf, keys: bf } = Object;
function Yn(e) {
  if (e.length === 1) {
    let t = e[0];
    if (Ef(t)) return { args: t, keys: null };
    if (_f(t)) {
      let n = bf(t);
      return { args: n.map((r) => t[r]), keys: n };
    }
  }
  return { args: e, keys: null };
}
function _f(e) {
  return e && typeof e == 'object' && wf(e) === Cf;
}
function Qn(e, t) {
  return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
}
function Mf(...e) {
  let t = pe(e),
    n = Ln(e),
    { args: r, keys: o } = Yn(e);
  if (r.length === 0) return ge([], t);
  let i = new x(xf(r, t, o ? (s) => Qn(o, s) : G));
  return n ? i.pipe(wt(n)) : i;
}
function xf(e, t, n = G) {
  return (r) => {
    Ga(
      t,
      () => {
        let { length: o } = e,
          i = new Array(o),
          s = o,
          a = o;
        for (let u = 0; u < o; u++)
          Ga(
            t,
            () => {
              let c = ge(e[u], t),
                l = !1;
              c.subscribe(
                E(
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
function Ga(e, t, n) {
  e ? Q(n, e, t) : t();
}
function Wa(e, t, n, r, o, i, s, a) {
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
      N(n(g, l++)).subscribe(
        E(
          t,
          (C) => {
            o?.(C), i ? f(C) : t.next(C);
          },
          () => {
            T = !0;
          },
          void 0,
          () => {
            if (T)
              try {
                for (c--; u.length && c < r; ) {
                  let C = u.shift();
                  s ? Q(t, s, () => p(C)) : p(C);
                }
                h();
              } catch (C) {
                t.error(C);
              }
          }
        )
      );
    };
  return (
    e.subscribe(
      E(t, f, () => {
        (d = !0), h();
      })
    ),
    () => {
      a?.();
    }
  );
}
function be(e, t, n = 1 / 0) {
  return m(t)
    ? be((r, o) => Ce((i, s) => t(r, i, o, s))(N(e(r, o))), n)
    : (typeof t == 'number' && (n = t), D((r, o) => Wa(r, o, e, n)));
}
function Jt(e = 1 / 0) {
  return be(G, e);
}
function qa() {
  return Jt(1);
}
function Kn(...e) {
  return qa()(ge(e, pe(e)));
}
function Sf(e) {
  return new x((t) => {
    N(e()).subscribe(t);
  });
}
function Tf(...e) {
  let t = Ln(e),
    { args: n, keys: r } = Yn(e),
    o = new x((i) => {
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
        N(n[l]).subscribe(
          E(
            i,
            (h) => {
              d || ((d = !0), c--), (a[l] = h);
            },
            () => u--,
            void 0,
            () => {
              (!u || !d) && (c || i.next(r ? Qn(r, a) : a), i.complete());
            }
          )
        );
      }
    });
  return t ? o.pipe(wt(t)) : o;
}
var Nf = ['addListener', 'removeListener'],
  Af = ['addEventListener', 'removeEventListener'],
  Of = ['on', 'off'];
function Ro(e, t, n, r) {
  if ((m(n) && ((r = n), (n = void 0)), r)) return Ro(e, t, n).pipe(wt(r));
  let [o, i] = Pf(e)
    ? Af.map((s) => (a) => e[s](t, a, n))
    : Ff(e)
      ? Nf.map(Za(e, t))
      : Rf(e)
        ? Of.map(Za(e, t))
        : [];
  if (!o && Et(e)) return be((s) => Ro(s, t, n))(N(e));
  if (!o) throw new TypeError('Invalid event target');
  return new x((s) => {
    let a = (...u) => s.next(1 < u.length ? u : u[0]);
    return o(a), () => i(a);
  });
}
function Za(e, t) {
  return (n) => (r) => e[n](t, r);
}
function Ff(e) {
  return m(e.addListener) && m(e.removeListener);
}
function Rf(e) {
  return m(e.on) && m(e.off);
}
function Pf(e) {
  return m(e.addEventListener) && m(e.removeEventListener);
}
function Ya(e = 0, t, n = Aa) {
  let r = -1;
  return (
    t != null && (kn(t) ? (n = t) : (r = t)),
    new x((o) => {
      let i = za(e) ? +e - n.now() : e;
      i < 0 && (i = 0);
      let s = 0;
      return n.schedule(function () {
        o.closed ||
          (o.next(s++), 0 <= r ? this.schedule(void 0, r) : o.complete());
      }, i);
    })
  );
}
function kf(...e) {
  let t = pe(e),
    n = Oa(e, 1 / 0),
    r = e;
  return r.length ? (r.length === 1 ? N(r[0]) : Jt(n)(ge(r, t))) : Qe;
}
function Xe(e, t) {
  return D((n, r) => {
    let o = 0;
    n.subscribe(E(r, (i) => e.call(t, i, o++) && r.next(i)));
  });
}
function Qa(e) {
  return D((t, n) => {
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
      E(
        n,
        (c) => {
          (r = !0), (o = c), i || N(e(c)).subscribe((i = E(n, a, u)));
        },
        () => {
          (s = !0), (!r || !i || i.closed) && n.complete();
        }
      )
    );
  });
}
function Lf(e, t = Kt) {
  return Qa(() => Ya(e, t));
}
function Ka(e) {
  return D((t, n) => {
    let r = null,
      o = !1,
      i;
    (r = t.subscribe(
      E(n, void 0, void 0, (s) => {
        (i = N(e(s, Ka(e)(t)))),
          r ? (r.unsubscribe(), (r = null), i.subscribe(n)) : (o = !0);
      })
    )),
      o && (r.unsubscribe(), (r = null), i.subscribe(n));
  });
}
function Jn(e, t, n, r, o) {
  return (i, s) => {
    let a = n,
      u = t,
      c = 0;
    i.subscribe(
      E(
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
function jf(e, t) {
  return D(Jn(e, t, arguments.length >= 2, !1, !0));
}
function Vf(e, t) {
  return m(t) ? be(e, t, 1) : be(e, 1);
}
function Ja(e, t = Kt) {
  return D((n, r) => {
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
      E(
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
function Xt(e) {
  return D((t, n) => {
    let r = !1;
    t.subscribe(
      E(
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
function Po(e) {
  return e <= 0
    ? () => Qe
    : D((t, n) => {
        let r = 0;
        t.subscribe(
          E(n, (o) => {
            ++r <= e && (n.next(o), e <= r && n.complete());
          })
        );
      });
}
function Bf(e) {
  return Ce(() => e);
}
function $f(e, t = G) {
  return (
    (e = e ?? Hf),
    D((n, r) => {
      let o,
        i = !0;
      n.subscribe(
        E(r, (s) => {
          let a = t(s);
          (i || !e(o, a)) && ((i = !1), (o = a), r.next(s));
        })
      );
    })
  );
}
function Hf(e, t) {
  return e === t;
}
function Xn(e = Uf) {
  return D((t, n) => {
    let r = !1;
    t.subscribe(
      E(
        n,
        (o) => {
          (r = !0), n.next(o);
        },
        () => (r ? n.complete() : n.error(e()))
      )
    );
  });
}
function Uf() {
  return new Je();
}
function zf(e) {
  return D((t, n) => {
    try {
      t.subscribe(n);
    } finally {
      n.add(e);
    }
  });
}
function Xa(e, t) {
  let n = arguments.length >= 2;
  return (r) =>
    r.pipe(
      e ? Xe((o, i) => e(o, i, r)) : G,
      Po(1),
      n ? Xt(t) : Xn(() => new Je())
    );
}
function ko(e) {
  return e <= 0
    ? () => Qe
    : D((t, n) => {
        let r = [];
        t.subscribe(
          E(
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
function Gf(e, t) {
  let n = arguments.length >= 2;
  return (r) =>
    r.pipe(
      e ? Xe((o, i) => e(o, i, r)) : G,
      ko(1),
      n ? Xt(t) : Xn(() => new Je())
    );
}
function Wf(e, t) {
  return D(Jn(e, t, arguments.length >= 2, !0));
}
function jo(e = {}) {
  let {
    connector: t = () => new re(),
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
    return D((g, T) => {
      c++, !d && !l && h();
      let C = (u = u ?? t());
      T.add(() => {
        c--, c === 0 && !d && !l && (a = Lo(p, o));
      }),
        C.subscribe(T),
        !s &&
          c > 0 &&
          ((s = new we({
            next: (j) => C.next(j),
            error: (j) => {
              (d = !0), h(), (a = Lo(f, n, j)), C.error(j);
            },
            complete: () => {
              (l = !0), h(), (a = Lo(f, r)), C.complete();
            },
          })),
          N(g).subscribe(s));
    })(i);
  };
}
function Lo(e, t, ...n) {
  if (t === !0) {
    e();
    return;
  }
  if (t === !1) return;
  let r = new we({
    next: () => {
      r.unsubscribe(), e();
    },
  });
  return N(t(...n)).subscribe(r);
}
function qf(e, t, n) {
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
    jo({
      connector: () => new On(r, t, n),
      resetOnError: !0,
      resetOnComplete: !1,
      resetOnRefCountZero: o,
    })
  );
}
function Zf(e) {
  return Xe((t, n) => e <= n);
}
function eu(...e) {
  let t = pe(e);
  return D((n, r) => {
    (t ? Kn(e, n, t) : Kn(e, n)).subscribe(r);
  });
}
function Yf(e, t) {
  return D((n, r) => {
    let o = null,
      i = 0,
      s = !1,
      a = () => s && !o && r.complete();
    n.subscribe(
      E(
        r,
        (u) => {
          o?.unsubscribe();
          let c = 0,
            l = i++;
          N(e(u, l)).subscribe(
            (o = E(
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
function Qf(e) {
  return D((t, n) => {
    N(e).subscribe(E(n, () => n.complete(), qt)), !n.closed && t.subscribe(n);
  });
}
function Kf(e, t, n) {
  let r = m(e) || t || n ? { next: e, error: t, complete: n } : e;
  return r
    ? D((o, i) => {
        var s;
        (s = r.subscribe) === null || s === void 0 || s.call(r);
        let a = !0;
        o.subscribe(
          E(
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
var Hu = 'https://g.co/ng/security#xss',
  S = class extends Error {
    constructor(t, n) {
      super(Uu(t, n)), (this.code = t);
    }
  };
function Uu(e, t) {
  return `${`NG0${Math.abs(e)}`}${t ? ': ' + t : ''}`;
}
function fn(e) {
  return { toString: e }.toString();
}
var er = '__parameters__';
function Jf(e) {
  return function (...n) {
    if (e) {
      let r = e(...n);
      for (let o in r) this[o] = r[o];
    }
  };
}
function zu(e, t, n) {
  return fn(() => {
    let r = Jf(t);
    function o(...i) {
      if (this instanceof o) return r.apply(this, i), this;
      let s = new o(...i);
      return (a.annotation = s), a;
      function a(u, c, l) {
        let d = u.hasOwnProperty(er)
          ? u[er]
          : Object.defineProperty(u, er, { value: [] })[er];
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
var hr = globalThis;
function O(e) {
  for (let t in e) if (e[t] === O) return t;
  throw Error('Could not find renamed property on target object.');
}
function Xf(e, t) {
  for (let n in t) t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n]);
}
function J(e) {
  if (typeof e == 'string') return e;
  if (Array.isArray(e)) return '[' + e.map(J).join(', ') + ']';
  if (e == null) return '' + e;
  if (e.overriddenName) return `${e.overriddenName}`;
  if (e.name) return `${e.name}`;
  let t = e.toString();
  if (t == null) return '' + t;
  let n = t.indexOf(`
`);
  return n === -1 ? t : t.substring(0, n);
}
function Xo(e, t) {
  return e == null || e === ''
    ? t === null
      ? ''
      : t
    : t == null || t === ''
      ? e
      : e + ' ' + t;
}
var eh = O({ __forward_ref__: O });
function Gu(e) {
  return (
    (e.__forward_ref__ = Gu),
    (e.toString = function () {
      return J(this());
    }),
    e
  );
}
function W(e) {
  return Wu(e) ? e() : e;
}
function Wu(e) {
  return (
    typeof e == 'function' && e.hasOwnProperty(eh) && e.__forward_ref__ === Gu
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
function qu(e) {
  return { providers: e.providers || [], imports: e.imports || [] };
}
function Ur(e) {
  return tu(e, Zu) || tu(e, Yu);
}
function JM(e) {
  return Ur(e) !== null;
}
function tu(e, t) {
  return e.hasOwnProperty(t) ? e[t] : null;
}
function th(e) {
  let t = e && (e[Zu] || e[Yu]);
  return t || null;
}
function nu(e) {
  return e && (e.hasOwnProperty(ru) || e.hasOwnProperty(nh)) ? e[ru] : null;
}
var Zu = O({ ɵprov: O }),
  ru = O({ ɵinj: O }),
  Yu = O({ ngInjectableDef: O }),
  nh = O({ ngInjectorDef: O }),
  A = class {
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
function Qu(e) {
  return e && !!e.ɵproviders;
}
var rh = O({ ɵcmp: O }),
  oh = O({ ɵdir: O }),
  ih = O({ ɵpipe: O }),
  sh = O({ ɵmod: O }),
  pr = O({ ɵfac: O }),
  tn = O({ __NG_ELEMENT_ID__: O }),
  ou = O({ __NG_ENV_ID__: O });
function St(e) {
  return typeof e == 'string' ? e : e == null ? '' : String(e);
}
function ah(e) {
  return typeof e == 'function'
    ? e.name || e.toString()
    : typeof e == 'object' && e != null && typeof e.type == 'function'
      ? e.type.name || e.type.toString()
      : St(e);
}
function uh(e, t) {
  let n = t ? `. Dependency path: ${t.join(' > ')} > ${e}` : '';
  throw new S(-200, e);
}
function us(e, t) {
  throw new S(-201, !1);
}
var _ = (function (e) {
    return (
      (e[(e.Default = 0)] = 'Default'),
      (e[(e.Host = 1)] = 'Host'),
      (e[(e.Self = 2)] = 'Self'),
      (e[(e.SkipSelf = 4)] = 'SkipSelf'),
      (e[(e.Optional = 8)] = 'Optional'),
      e
    );
  })(_ || {}),
  ei;
function Ku() {
  return ei;
}
function K(e) {
  let t = ei;
  return (ei = e), t;
}
function Ju(e, t, n) {
  let r = Ur(e);
  if (r && r.providedIn == 'root')
    return r.value === void 0 ? (r.value = r.factory()) : r.value;
  if (n & _.Optional) return null;
  if (t !== void 0) return t;
  us(e, 'Injector');
}
var ch = {},
  nn = ch,
  ti = '__NG_DI_FLAG__',
  gr = 'ngTempTokenPath',
  lh = 'ngTokenPath',
  dh = /\n/gm,
  fh = '\u0275',
  iu = '__source',
  Mt;
function hh() {
  return Mt;
}
function Pe(e) {
  let t = Mt;
  return (Mt = e), t;
}
function ph(e, t = _.Default) {
  if (Mt === void 0) throw new S(-203, !1);
  return Mt === null
    ? Ju(e, void 0, t)
    : Mt.get(e, t & _.Optional ? null : void 0, t);
}
function U(e, t = _.Default) {
  return (Ku() || ph)(W(e), t);
}
function M(e, t = _.Default) {
  return U(e, zr(t));
}
function zr(e) {
  return typeof e > 'u' || typeof e == 'number'
    ? e
    : 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4);
}
function ni(e) {
  let t = [];
  for (let n = 0; n < e.length; n++) {
    let r = W(e[n]);
    if (Array.isArray(r)) {
      if (r.length === 0) throw new S(900, !1);
      let o,
        i = _.Default;
      for (let s = 0; s < r.length; s++) {
        let a = r[s],
          u = gh(a);
        typeof u == 'number' ? (u === -1 ? (o = a.token) : (i |= u)) : (o = a);
      }
      t.push(U(o, i));
    } else t.push(U(r));
  }
  return t;
}
function Xu(e, t) {
  return (e[ti] = t), (e.prototype[ti] = t), e;
}
function gh(e) {
  return e[ti];
}
function mh(e, t, n, r) {
  let o = e[gr];
  throw (
    (t[iu] && o.unshift(t[iu]),
    (e.message = yh(
      `
` + e.message,
      o,
      n,
      r
    )),
    (e[lh] = o),
    (e[gr] = null),
    e)
  );
}
function yh(e, t, n, r = null) {
  e =
    e &&
    e.charAt(0) ===
      `
` &&
    e.charAt(1) == fh
      ? e.slice(2)
      : e;
  let o = J(t);
  if (Array.isArray(t)) o = t.map(J).join(' -> ');
  else if (typeof t == 'object') {
    let i = [];
    for (let s in t)
      if (t.hasOwnProperty(s)) {
        let a = t[s];
        i.push(s + ':' + (typeof a == 'string' ? JSON.stringify(a) : J(a)));
      }
    o = `{${i.join(', ')}}`;
  }
  return `${n}${r ? '(' + r + ')' : ''}[${o}]: ${e.replace(
    dh,
    `
  `
  )}`;
}
var vh = Xu(zu('Optional'), 8);
var Dh = Xu(zu('SkipSelf'), 4);
function nt(e, t) {
  let n = e.hasOwnProperty(pr);
  return n ? e[pr] : null;
}
function Ih(e, t, n) {
  if (e.length !== t.length) return !1;
  for (let r = 0; r < e.length; r++) {
    let o = e[r],
      i = t[r];
    if ((n && ((o = n(o)), (i = n(i))), i !== o)) return !1;
  }
  return !0;
}
function Eh(e) {
  return e.flat(Number.POSITIVE_INFINITY);
}
function cs(e, t) {
  e.forEach((n) => (Array.isArray(n) ? cs(n, t) : t(n)));
}
function ec(e, t, n) {
  t >= e.length ? e.push(n) : e.splice(t, 0, n);
}
function mr(e, t) {
  return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
}
function wh(e, t) {
  let n = [];
  for (let r = 0; r < e; r++) n.push(t);
  return n;
}
function Ch(e, t, n, r) {
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
function ls(e, t, n) {
  let r = hn(e, t);
  return r >= 0 ? (e[r | 1] = n) : ((r = ~r), Ch(e, r, t, n)), r;
}
function Vo(e, t) {
  let n = hn(e, t);
  if (n >= 0) return e[n | 1];
}
function hn(e, t) {
  return bh(e, t, 1);
}
function bh(e, t, n) {
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
var Tt = {},
  q = [],
  yr = new A(''),
  tc = new A('', -1),
  nc = new A(''),
  vr = class {
    get(t, n = nn) {
      if (n === nn) {
        let r = new Error(`NullInjectorError: No provider for ${J(t)}!`);
        throw ((r.name = 'NullInjectorError'), r);
      }
      return n;
    }
  },
  rc = (function (e) {
    return (e[(e.OnPush = 0)] = 'OnPush'), (e[(e.Default = 1)] = 'Default'), e;
  })(rc || {}),
  rn = (function (e) {
    return (
      (e[(e.Emulated = 0)] = 'Emulated'),
      (e[(e.None = 2)] = 'None'),
      (e[(e.ShadowDom = 3)] = 'ShadowDom'),
      e
    );
  })(rn || {}),
  je = (function (e) {
    return (
      (e[(e.None = 0)] = 'None'),
      (e[(e.SignalBased = 1)] = 'SignalBased'),
      (e[(e.HasDecoratorInputTransform = 2)] = 'HasDecoratorInputTransform'),
      e
    );
  })(je || {});
function _h(e, t, n) {
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
function ri(e, t, n) {
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
      Mh(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
    }
  }
  return r;
}
function oc(e) {
  return e === 3 || e === 4 || e === 6;
}
function Mh(e) {
  return e.charCodeAt(0) === 64;
}
function on(e, t) {
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
              ? su(e, n, o, null, t[++r])
              : su(e, n, o, null, null));
      }
    }
  return e;
}
function su(e, t, n, r, o) {
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
var ic = 'ng-template';
function xh(e, t, n, r) {
  let o = 0;
  if (r) {
    for (; o < t.length && typeof t[o] == 'string'; o += 2)
      if (t[o] === 'class' && _h(t[o + 1].toLowerCase(), n, 0) !== -1)
        return !0;
  } else if (ds(e)) return !1;
  if (((o = t.indexOf(1, o)), o > -1)) {
    let i;
    for (; ++o < t.length && typeof (i = t[o]) == 'string'; )
      if (i.toLowerCase() === n) return !0;
  }
  return !1;
}
function ds(e) {
  return e.type === 4 && e.value !== ic;
}
function Sh(e, t, n) {
  let r = e.type === 4 && !n ? ic : e.value;
  return t === r;
}
function Th(e, t, n) {
  let r = 4,
    o = e.attrs,
    i = o !== null ? Oh(o) : 0,
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
          (u !== '' && !Sh(e, u, n)) || (u === '' && t.length === 1))
        ) {
          if (le(r)) return !1;
          s = !0;
        }
      } else if (r & 8) {
        if (o === null || !xh(e, o, u, n)) {
          if (le(r)) return !1;
          s = !0;
        }
      } else {
        let c = t[++a],
          l = Nh(u, o, ds(e), n);
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
function Nh(e, t, n, r) {
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
  } else return Fh(t, e);
}
function sc(e, t, n = !1) {
  for (let r = 0; r < t.length; r++) if (Th(e, t[r], n)) return !0;
  return !1;
}
function Ah(e) {
  let t = e.attrs;
  if (t != null) {
    let n = t.indexOf(5);
    if (!(n & 1)) return t[n + 1];
  }
  return null;
}
function Oh(e) {
  for (let t = 0; t < e.length; t++) {
    let n = e[t];
    if (oc(n)) return t;
  }
  return e.length;
}
function Fh(e, t) {
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
function Rh(e, t) {
  e: for (let n = 0; n < t.length; n++) {
    let r = t[n];
    if (e.length === r.length) {
      for (let o = 0; o < e.length; o++) if (e[o] !== r[o]) continue e;
      return !0;
    }
  }
  return !1;
}
function au(e, t) {
  return e ? ':not(' + t.trim() + ')' : t;
}
function Ph(e) {
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
      o !== '' && !le(s) && ((t += au(i, o)), (o = '')),
        (r = s),
        (i = i || !le(r));
    n++;
  }
  return o !== '' && (t += au(i, o)), t;
}
function kh(e) {
  return e.map(Ph).join(',');
}
function Lh(e) {
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
function XM(e) {
  return fn(() => {
    let t = hc(e),
      n = Re(Fe({}, t), {
        decls: e.decls,
        vars: e.vars,
        template: e.template,
        consts: e.consts || null,
        ngContentSelectors: e.ngContentSelectors,
        onPush: e.changeDetection === rc.OnPush,
        directiveDefs: null,
        pipeDefs: null,
        dependencies: (t.standalone && e.dependencies) || null,
        getStandaloneInjector: null,
        signals: e.signals ?? !1,
        data: e.data || {},
        encapsulation: e.encapsulation || rn.Emulated,
        styles: e.styles || q,
        _: null,
        schemas: e.schemas || null,
        tView: null,
        id: '',
      });
    pc(n);
    let r = e.dependencies;
    return (
      (n.directiveDefs = cu(r, !1)), (n.pipeDefs = cu(r, !0)), (n.id = $h(n)), n
    );
  });
}
function jh(e) {
  return Ve(e) || lc(e);
}
function Vh(e) {
  return e !== null;
}
function ac(e) {
  return fn(() => ({
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
function uu(e, t) {
  if (e == null) return Tt;
  let n = {};
  for (let r in e)
    if (e.hasOwnProperty(r)) {
      let o = e[r],
        i,
        s,
        a = je.None;
      Array.isArray(o)
        ? ((a = o[0]), (i = o[1]), (s = o[2] ?? i))
        : ((i = o), (s = o)),
        t ? ((n[i] = a !== je.None ? [r, a] : r), (t[i] = s)) : (n[i] = r);
    }
  return n;
}
function uc(e) {
  return fn(() => {
    let t = hc(e);
    return pc(t), t;
  });
}
function cc(e) {
  return {
    type: e.type,
    name: e.name,
    factory: null,
    pure: e.pure !== !1,
    standalone: e.standalone === !0,
    onDestroy: e.type.prototype.ngOnDestroy || null,
  };
}
function Ve(e) {
  return e[rh] || null;
}
function lc(e) {
  return e[oh] || null;
}
function dc(e) {
  return e[ih] || null;
}
function Bh(e) {
  let t = Ve(e) || lc(e) || dc(e);
  return t !== null ? t.standalone : !1;
}
function fc(e, t) {
  let n = e[sh] || null;
  if (!n && t === !0)
    throw new Error(`Type ${J(e)} does not have '\u0275mod' property.`);
  return n;
}
function hc(e) {
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
    inputConfig: e.inputs || Tt,
    exportAs: e.exportAs || null,
    standalone: e.standalone === !0,
    signals: e.signals === !0,
    selectors: e.selectors || q,
    viewQuery: e.viewQuery || null,
    features: e.features || null,
    setInput: null,
    findHostDirectiveDefs: null,
    hostDirectives: null,
    inputs: uu(e.inputs, t),
    outputs: uu(e.outputs),
    debugInfo: null,
  };
}
function pc(e) {
  e.features?.forEach((t) => t(e));
}
function cu(e, t) {
  if (!e) return null;
  let n = t ? dc : jh;
  return () => (typeof e == 'function' ? e() : e).map((r) => n(r)).filter(Vh);
}
function $h(e) {
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
function Hh(e) {
  return { ɵproviders: e };
}
function Uh(...e) {
  return { ɵproviders: gc(!0, e), ɵfromNgModule: !0 };
}
function gc(e, ...t) {
  let n = [],
    r = new Set(),
    o,
    i = (s) => {
      n.push(s);
    };
  return (
    cs(t, (s) => {
      let a = s;
      oi(a, i, [], r) && ((o ||= []), o.push(a));
    }),
    o !== void 0 && mc(o, i),
    n
  );
}
function mc(e, t) {
  for (let n = 0; n < e.length; n++) {
    let { ngModule: r, providers: o } = e[n];
    fs(o, (i) => {
      t(i, r);
    });
  }
}
function oi(e, t, n, r) {
  if (((e = W(e)), !e)) return !1;
  let o = null,
    i = nu(e),
    s = !i && Ve(e);
  if (!i && !s) {
    let u = e.ngModule;
    if (((i = nu(u)), i)) o = u;
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
      for (let c of u) oi(c, t, n, r);
    }
  } else if (i) {
    if (i.imports != null && !a) {
      r.add(o);
      let c;
      try {
        cs(i.imports, (l) => {
          oi(l, t, n, r) && ((c ||= []), c.push(l));
        });
      } finally {
      }
      c !== void 0 && mc(c, t);
    }
    if (!a) {
      let c = nt(o) || (() => new o());
      t({ provide: o, useFactory: c, deps: q }, o),
        t({ provide: nc, useValue: o, multi: !0 }, o),
        t({ provide: yr, useValue: () => U(o), multi: !0 }, o);
    }
    let u = i.providers;
    if (u != null && !a) {
      let c = e;
      fs(u, (l) => {
        t(l, c);
      });
    }
  } else return !1;
  return o !== e && e.providers !== void 0;
}
function fs(e, t) {
  for (let n of e)
    Qu(n) && (n = n.ɵproviders), Array.isArray(n) ? fs(n, t) : t(n);
}
var zh = O({ provide: String, useValue: O });
function yc(e) {
  return e !== null && typeof e == 'object' && zh in e;
}
function Gh(e) {
  return !!(e && e.useExisting);
}
function Wh(e) {
  return !!(e && e.useFactory);
}
function Nt(e) {
  return typeof e == 'function';
}
function qh(e) {
  return !!e.useClass;
}
var vc = new A(''),
  ar = {},
  Zh = {},
  Bo;
function hs() {
  return Bo === void 0 && (Bo = new vr()), Bo;
}
var Be = class {},
  sn = class extends Be {
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
        si(t, (s) => this.processProvider(s)),
        this.records.set(tc, Ct(void 0, this)),
        o.has('environment') && this.records.set(Be, Ct(void 0, this));
      let i = this.records.get(vc);
      i != null && typeof i.value == 'string' && this.scopes.add(i.value),
        (this.injectorDefTypes = new Set(this.get(nc, q, _.Self)));
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
      let n = Pe(this),
        r = K(void 0),
        o;
      try {
        return t();
      } finally {
        Pe(n), K(r);
      }
    }
    get(t, n = nn, r = _.Default) {
      if ((this.assertNotDestroyed(), t.hasOwnProperty(ou))) return t[ou](this);
      r = zr(r);
      let o,
        i = Pe(this),
        s = K(void 0);
      try {
        if (!(r & _.SkipSelf)) {
          let u = this.records.get(t);
          if (u === void 0) {
            let c = Xh(t) && Ur(t);
            c && this.injectableDefInScope(c)
              ? (u = Ct(ii(t), ar))
              : (u = null),
              this.records.set(t, u);
          }
          if (u != null) return this.hydrate(t, u);
        }
        let a = r & _.Self ? hs() : this.parent;
        return (n = r & _.Optional && n === nn ? null : n), a.get(t, n);
      } catch (a) {
        if (a.name === 'NullInjectorError') {
          if (((a[gr] = a[gr] || []).unshift(J(t)), i)) throw a;
          return mh(a, t, 'R3InjectorError', this.source);
        } else throw a;
      } finally {
        K(s), Pe(i);
      }
    }
    resolveInjectorInitializers() {
      let t = b(null),
        n = Pe(this),
        r = K(void 0),
        o;
      try {
        let i = this.get(yr, q, _.Self);
        for (let s of i) s();
      } finally {
        Pe(n), K(r), b(t);
      }
    }
    toString() {
      let t = [],
        n = this.records;
      for (let r of n.keys()) t.push(J(r));
      return `R3Injector[${t.join(', ')}]`;
    }
    assertNotDestroyed() {
      if (this._destroyed) throw new S(205, !1);
    }
    processProvider(t) {
      t = W(t);
      let n = Nt(t) ? t : W(t && t.provide),
        r = Qh(t);
      if (!Nt(t) && t.multi === !0) {
        let o = this.records.get(n);
        o ||
          ((o = Ct(void 0, ar, !0)),
          (o.factory = () => ni(o.multi)),
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
          n.value === ar && ((n.value = Zh), (n.value = n.factory())),
          typeof n.value == 'object' &&
            n.value &&
            Jh(n.value) &&
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
function ii(e) {
  let t = Ur(e),
    n = t !== null ? t.factory : nt(e);
  if (n !== null) return n;
  if (e instanceof A) throw new S(204, !1);
  if (e instanceof Function) return Yh(e);
  throw new S(204, !1);
}
function Yh(e) {
  if (e.length > 0) throw new S(204, !1);
  let n = th(e);
  return n !== null ? () => n.factory(e) : () => new e();
}
function Qh(e) {
  if (yc(e)) return Ct(void 0, e.useValue);
  {
    let t = Dc(e);
    return Ct(t, ar);
  }
}
function Dc(e, t, n) {
  let r;
  if (Nt(e)) {
    let o = W(e);
    return nt(o) || ii(o);
  } else if (yc(e)) r = () => W(e.useValue);
  else if (Wh(e)) r = () => e.useFactory(...ni(e.deps || []));
  else if (Gh(e)) r = () => U(W(e.useExisting));
  else {
    let o = W(e && (e.useClass || e.provide));
    if (Kh(e)) r = () => new o(...ni(e.deps));
    else return nt(o) || ii(o);
  }
  return r;
}
function Ct(e, t, n = !1) {
  return { factory: e, value: t, multi: n ? [] : void 0 };
}
function Kh(e) {
  return !!e.deps;
}
function Jh(e) {
  return (
    e !== null && typeof e == 'object' && typeof e.ngOnDestroy == 'function'
  );
}
function Xh(e) {
  return typeof e == 'function' || (typeof e == 'object' && e instanceof A);
}
function si(e, t) {
  for (let n of e)
    Array.isArray(n) ? si(n, t) : n && Qu(n) ? si(n.ɵproviders, t) : t(n);
}
function ep(e, t) {
  e instanceof sn && e.assertNotDestroyed();
  let n,
    r = Pe(e),
    o = K(void 0);
  try {
    return t();
  } finally {
    Pe(r), K(o);
  }
}
function Ic() {
  return Ku() !== void 0 || hh() != null;
}
function Ec(e) {
  if (!Ic()) throw new S(-203, !1);
}
function tp(e) {
  return typeof e == 'function';
}
var Ie = 0,
  v = 1,
  y = 2,
  z = 3,
  he = 4,
  ee = 5,
  At = 6,
  Dr = 7,
  $ = 8,
  Ot = 9,
  ve = 10,
  R = 11,
  an = 12,
  lu = 13,
  $t = 14,
  te = 15,
  rt = 16,
  bt = 17,
  _e = 18,
  Gr = 19,
  wc = 20,
  ke = 21,
  $o = 22,
  oe = 23,
  B = 25,
  ps = 1;
var ot = 7,
  Ir = 8,
  Ft = 9,
  H = 10,
  Er = (function (e) {
    return (
      (e[(e.None = 0)] = 'None'),
      (e[(e.HasTransplantedViews = 2)] = 'HasTransplantedViews'),
      e
    );
  })(Er || {});
function Le(e) {
  return Array.isArray(e) && typeof e[ps] == 'object';
}
function Se(e) {
  return Array.isArray(e) && e[ps] === !0;
}
function gs(e) {
  return (e.flags & 4) !== 0;
}
function Wr(e) {
  return e.componentOffset > -1;
}
function qr(e) {
  return (e.flags & 1) === 1;
}
function Me(e) {
  return !!e.template;
}
function ai(e) {
  return (e[y] & 512) !== 0;
}
var ui = class {
  constructor(t, n, r) {
    (this.previousValue = t), (this.currentValue = n), (this.firstChange = r);
  }
  isFirstChange() {
    return this.firstChange;
  }
};
function Cc(e, t, n, r) {
  t !== null ? t.applyValueToInputSignal(t, r) : (e[n] = r);
}
function ms() {
  return bc;
}
function bc(e) {
  return e.type.prototype.ngOnChanges && (e.setInput = rp), np;
}
ms.ngInherit = !0;
function np() {
  let e = Mc(this),
    t = e?.current;
  if (t) {
    let n = e.previous;
    if (n === Tt) e.previous = t;
    else for (let r in t) n[r] = t[r];
    (e.current = null), this.ngOnChanges(t);
  }
}
function rp(e, t, n, r, o) {
  let i = this.declaredInputs[r],
    s = Mc(e) || op(e, { previous: Tt, current: null }),
    a = s.current || (s.current = {}),
    u = s.previous,
    c = u[i];
  (a[i] = new ui(c && c.currentValue, n, u === Tt)), Cc(e, t, o, n);
}
var _c = '__ngSimpleChanges__';
function Mc(e) {
  return e[_c] || null;
}
function op(e, t) {
  return (e[_c] = t);
}
var du = null;
var me = function (e, t, n) {
    du?.(e, t, n);
  },
  xc = 'svg',
  ip = 'math';
function De(e) {
  for (; Array.isArray(e); ) e = e[Ie];
  return e;
}
function sp(e) {
  for (; Array.isArray(e); ) {
    if (typeof e[ps] == 'object') return e;
    e = e[Ie];
  }
  return null;
}
function Sc(e, t) {
  return De(t[e]);
}
function ie(e, t) {
  return De(t[e.index]);
}
function ys(e, t) {
  return e.data[t];
}
function Tc(e, t) {
  return e[t];
}
function Ge(e, t) {
  let n = t[e];
  return Le(n) ? n : n[Ie];
}
function ap(e) {
  return (e[y] & 4) === 4;
}
function vs(e) {
  return (e[y] & 128) === 128;
}
function up(e) {
  return Se(e[z]);
}
function $e(e, t) {
  return t == null ? null : e[t];
}
function Nc(e) {
  e[bt] = 0;
}
function Ac(e) {
  e[y] & 1024 || ((e[y] |= 1024), vs(e) && Zr(e));
}
function cp(e, t) {
  for (; e > 0; ) (t = t[$t]), e--;
  return t;
}
function un(e) {
  return !!(e[y] & 9216 || e[oe]?.dirty);
}
function ci(e) {
  e[ve].changeDetectionScheduler?.notify(7),
    e[y] & 64 && (e[y] |= 1024),
    un(e) && Zr(e);
}
function Zr(e) {
  e[ve].changeDetectionScheduler?.notify(0);
  let t = it(e);
  for (; t !== null && !(t[y] & 8192 || ((t[y] |= 8192), !vs(t))); ) t = it(t);
}
function Oc(e, t) {
  if ((e[y] & 256) === 256) throw new S(911, !1);
  e[ke] === null && (e[ke] = []), e[ke].push(t);
}
function lp(e, t) {
  if (e[ke] === null) return;
  let n = e[ke].indexOf(t);
  n !== -1 && e[ke].splice(n, 1);
}
function it(e) {
  let t = e[z];
  return Se(t) ? t[z] : t;
}
var w = { lFrame: Bc(null), bindingsEnabled: !0, skipHydrationRootTNode: null };
var Fc = !1;
function dp() {
  return w.lFrame.elementDepthCount;
}
function fp() {
  w.lFrame.elementDepthCount++;
}
function hp() {
  w.lFrame.elementDepthCount--;
}
function Rc() {
  return w.bindingsEnabled;
}
function Pc() {
  return w.skipHydrationRootTNode !== null;
}
function pp(e) {
  return w.skipHydrationRootTNode === e;
}
function gp() {
  w.skipHydrationRootTNode = null;
}
function I() {
  return w.lFrame.lView;
}
function F() {
  return w.lFrame.tView;
}
function e0(e) {
  return (w.lFrame.contextLView = e), e[$];
}
function t0(e) {
  return (w.lFrame.contextLView = null), e;
}
function V() {
  let e = kc();
  for (; e !== null && e.type === 64; ) e = e.parent;
  return e;
}
function kc() {
  return w.lFrame.currentTNode;
}
function mp() {
  let e = w.lFrame,
    t = e.currentTNode;
  return e.isParent ? t : t.parent;
}
function dt(e, t) {
  let n = w.lFrame;
  (n.currentTNode = e), (n.isParent = t);
}
function Ds() {
  return w.lFrame.isParent;
}
function Is() {
  w.lFrame.isParent = !1;
}
function yp() {
  return w.lFrame.contextLView;
}
function Lc() {
  return Fc;
}
function fu(e) {
  Fc = e;
}
function vp() {
  let e = w.lFrame,
    t = e.bindingRootIndex;
  return t === -1 && (t = e.bindingRootIndex = e.tView.bindingStartIndex), t;
}
function Dp() {
  return w.lFrame.bindingIndex;
}
function Ip(e) {
  return (w.lFrame.bindingIndex = e);
}
function We() {
  return w.lFrame.bindingIndex++;
}
function Es(e) {
  let t = w.lFrame,
    n = t.bindingIndex;
  return (t.bindingIndex = t.bindingIndex + e), n;
}
function Ep() {
  return w.lFrame.inI18n;
}
function wp(e, t) {
  let n = w.lFrame;
  (n.bindingIndex = n.bindingRootIndex = e), li(t);
}
function Cp() {
  return w.lFrame.currentDirectiveIndex;
}
function li(e) {
  w.lFrame.currentDirectiveIndex = e;
}
function ws(e) {
  let t = w.lFrame.currentDirectiveIndex;
  return t === -1 ? null : e[t];
}
function Cs() {
  return w.lFrame.currentQueryIndex;
}
function Yr(e) {
  w.lFrame.currentQueryIndex = e;
}
function bp(e) {
  let t = e[v];
  return t.type === 2 ? t.declTNode : t.type === 1 ? e[ee] : null;
}
function jc(e, t, n) {
  if (n & _.SkipSelf) {
    let o = t,
      i = e;
    for (; (o = o.parent), o === null && !(n & _.Host); )
      if (((o = bp(i)), o === null || ((i = i[$t]), o.type & 10))) break;
    if (o === null) return !1;
    (t = o), (e = i);
  }
  let r = (w.lFrame = Vc());
  return (r.currentTNode = t), (r.lView = e), !0;
}
function bs(e) {
  let t = Vc(),
    n = e[v];
  (w.lFrame = t),
    (t.currentTNode = n.firstChild),
    (t.lView = e),
    (t.tView = n),
    (t.contextLView = e),
    (t.bindingIndex = n.bindingStartIndex),
    (t.inI18n = !1);
}
function Vc() {
  let e = w.lFrame,
    t = e === null ? null : e.child;
  return t === null ? Bc(e) : t;
}
function Bc(e) {
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
function $c() {
  let e = w.lFrame;
  return (w.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e;
}
var Hc = $c;
function _s() {
  let e = $c();
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
function _p(e) {
  return (w.lFrame.contextLView = cp(e, w.lFrame.contextLView))[$];
}
function Te() {
  return w.lFrame.selectedIndex;
}
function st(e) {
  w.lFrame.selectedIndex = e;
}
function pn() {
  let e = w.lFrame;
  return ys(e.tView, e.selectedIndex);
}
function n0() {
  w.lFrame.currentNamespace = xc;
}
function r0() {
  Mp();
}
function Mp() {
  w.lFrame.currentNamespace = null;
}
function xp() {
  return w.lFrame.currentNamespace;
}
var Uc = !0;
function Qr() {
  return Uc;
}
function Kr(e) {
  Uc = e;
}
function Sp(e, t, n) {
  let { ngOnChanges: r, ngOnInit: o, ngDoCheck: i } = t.type.prototype;
  if (r) {
    let s = bc(t);
    (n.preOrderHooks ??= []).push(e, s),
      (n.preOrderCheckHooks ??= []).push(e, s);
  }
  o && (n.preOrderHooks ??= []).push(0 - e, o),
    i &&
      ((n.preOrderHooks ??= []).push(e, i),
      (n.preOrderCheckHooks ??= []).push(e, i));
}
function Jr(e, t) {
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
function ur(e, t, n) {
  zc(e, t, 3, n);
}
function cr(e, t, n, r) {
  (e[y] & 3) === n && zc(e, t, n, r);
}
function Ho(e, t) {
  let n = e[y];
  (n & 3) === t && ((n &= 16383), (n += 1), (e[y] = n));
}
function zc(e, t, n, r) {
  let o = r !== void 0 ? e[bt] & 65535 : 0,
    i = r ?? -1,
    s = t.length - 1,
    a = 0;
  for (let u = o; u < s; u++)
    if (typeof t[u + 1] == 'number') {
      if (((a = t[u]), r != null && a >= r)) break;
    } else
      t[u] < 0 && (e[bt] += 65536),
        (a < i || i == -1) &&
          (Tp(e, n, t, u), (e[bt] = (e[bt] & 4294901760) + u + 2)),
        u++;
}
function hu(e, t) {
  me(4, e, t);
  let n = b(null);
  try {
    t.call(e);
  } finally {
    b(n), me(5, e, t);
  }
}
function Tp(e, t, n, r) {
  let o = n[r] < 0,
    i = n[r + 1],
    s = o ? -n[r] : n[r],
    a = e[s];
  o
    ? e[y] >> 14 < e[bt] >> 16 &&
      (e[y] & 3) === t &&
      ((e[y] += 16384), hu(a, i))
    : hu(a, i);
}
var xt = -1,
  at = class {
    constructor(t, n, r) {
      (this.factory = t),
        (this.resolving = !1),
        (this.canSeeViewProviders = n),
        (this.injectImpl = r);
    }
  };
function Np(e) {
  return e instanceof at;
}
function Ap(e) {
  return (e.flags & 8) !== 0;
}
function Op(e) {
  return (e.flags & 16) !== 0;
}
var Uo = {},
  di = class {
    constructor(t, n) {
      (this.injector = t), (this.parentInjector = n);
    }
    get(t, n, r) {
      r = zr(r);
      let o = this.injector.get(t, Uo, r);
      return o !== Uo || n === Uo ? o : this.parentInjector.get(t, n, r);
    }
  };
function Gc(e) {
  return e !== xt;
}
function wr(e) {
  return e & 32767;
}
function Fp(e) {
  return e >> 16;
}
function Cr(e, t) {
  let n = Fp(e),
    r = t;
  for (; n > 0; ) (r = r[$t]), n--;
  return r;
}
var fi = !0;
function br(e) {
  let t = fi;
  return (fi = e), t;
}
var Rp = 256,
  Wc = Rp - 1,
  qc = 5,
  Pp = 0,
  ye = {};
function kp(e, t, n) {
  let r;
  typeof n == 'string'
    ? (r = n.charCodeAt(0) || 0)
    : n.hasOwnProperty(tn) && (r = n[tn]),
    r == null && (r = n[tn] = Pp++);
  let o = r & Wc,
    i = 1 << o;
  t.data[e + (o >> qc)] |= i;
}
function _r(e, t) {
  let n = Zc(e, t);
  if (n !== -1) return n;
  let r = t[v];
  r.firstCreatePass &&
    ((e.injectorIndex = t.length),
    zo(r.data, e),
    zo(t, null),
    zo(r.blueprint, null));
  let o = Ms(e, t),
    i = e.injectorIndex;
  if (Gc(o)) {
    let s = wr(o),
      a = Cr(o, t),
      u = a[v].data;
    for (let c = 0; c < 8; c++) t[i + c] = a[s + c] | u[s + c];
  }
  return (t[i + 8] = o), i;
}
function zo(e, t) {
  e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
}
function Zc(e, t) {
  return e.injectorIndex === -1 ||
    (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
    t[e.injectorIndex + 8] === null
    ? -1
    : e.injectorIndex;
}
function Ms(e, t) {
  if (e.parent && e.parent.injectorIndex !== -1) return e.parent.injectorIndex;
  let n = 0,
    r = null,
    o = t;
  for (; o !== null; ) {
    if (((r = Xc(o)), r === null)) return xt;
    if ((n++, (o = o[$t]), r.injectorIndex !== -1))
      return r.injectorIndex | (n << 16);
  }
  return xt;
}
function hi(e, t, n) {
  kp(e, t, n);
}
function Lp(e, t) {
  if (t === 'class') return e.classes;
  if (t === 'style') return e.styles;
  let n = e.attrs;
  if (n) {
    let r = n.length,
      o = 0;
    for (; o < r; ) {
      let i = n[o];
      if (oc(i)) break;
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
function Yc(e, t, n) {
  if (n & _.Optional || e !== void 0) return e;
  us(t, 'NodeInjector');
}
function Qc(e, t, n, r) {
  if (
    (n & _.Optional && r === void 0 && (r = null), !(n & (_.Self | _.Host)))
  ) {
    let o = e[Ot],
      i = K(void 0);
    try {
      return o ? o.get(t, r, n & _.Optional) : Ju(t, r, n & _.Optional);
    } finally {
      K(i);
    }
  }
  return Yc(r, t, n);
}
function Kc(e, t, n, r = _.Default, o) {
  if (e !== null) {
    if (t[y] & 2048 && !(r & _.Self)) {
      let s = $p(e, t, n, r, ye);
      if (s !== ye) return s;
    }
    let i = Jc(e, t, n, r, ye);
    if (i !== ye) return i;
  }
  return Qc(t, n, r, o);
}
function Jc(e, t, n, r, o) {
  let i = Vp(n);
  if (typeof i == 'function') {
    if (!jc(t, e, r)) return r & _.Host ? Yc(o, n, r) : Qc(t, n, r, o);
    try {
      let s;
      if (((s = i(r)), s == null && !(r & _.Optional))) us(n);
      else return s;
    } finally {
      Hc();
    }
  } else if (typeof i == 'number') {
    let s = null,
      a = Zc(e, t),
      u = xt,
      c = r & _.Host ? t[te][ee] : null;
    for (
      (a === -1 || r & _.SkipSelf) &&
      ((u = a === -1 ? Ms(e, t) : t[a + 8]),
      u === xt || !gu(r, !1)
        ? (a = -1)
        : ((s = t[v]), (a = wr(u)), (t = Cr(u, t))));
      a !== -1;

    ) {
      let l = t[v];
      if (pu(i, a, l.data)) {
        let d = jp(a, t, n, s, r, c);
        if (d !== ye) return d;
      }
      (u = t[a + 8]),
        u !== xt && gu(r, t[v].data[a + 8] === c) && pu(i, a, t)
          ? ((s = l), (a = wr(u)), (t = Cr(u, t)))
          : (a = -1);
    }
  }
  return o;
}
function jp(e, t, n, r, o, i) {
  let s = t[v],
    a = s.data[e + 8],
    u = r == null ? Wr(a) && fi : r != s && (a.type & 3) !== 0,
    c = o & _.Host && i === a,
    l = lr(a, s, n, u, c);
  return l !== null ? ut(t, s, l, a) : ye;
}
function lr(e, t, n, r, o) {
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
    if (f && Me(f) && f.type === n) return u;
  }
  return null;
}
function ut(e, t, n, r) {
  let o = e[n],
    i = t.data;
  if (Np(o)) {
    let s = o;
    s.resolving && uh(ah(i[n]));
    let a = br(s.canSeeViewProviders);
    s.resolving = !0;
    let u,
      c = s.injectImpl ? K(s.injectImpl) : null,
      l = jc(e, r, _.Default);
    try {
      (o = e[n] = s.factory(void 0, i, e, r)),
        t.firstCreatePass && n >= r.directiveStart && Sp(n, i[n], t);
    } finally {
      c !== null && K(c), br(a), (s.resolving = !1), Hc();
    }
  }
  return o;
}
function Vp(e) {
  if (typeof e == 'string') return e.charCodeAt(0) || 0;
  let t = e.hasOwnProperty(tn) ? e[tn] : void 0;
  return typeof t == 'number' ? (t >= 0 ? t & Wc : Bp) : t;
}
function pu(e, t, n) {
  let r = 1 << e;
  return !!(n[t + (e >> qc)] & r);
}
function gu(e, t) {
  return !(e & _.Self) && !(e & _.Host && t);
}
var tt = class {
  constructor(t, n) {
    (this._tNode = t), (this._lView = n);
  }
  get(t, n, r) {
    return Kc(this._tNode, this._lView, t, zr(r), n);
  }
};
function Bp() {
  return new tt(V(), I());
}
function o0(e) {
  return fn(() => {
    let t = e.prototype.constructor,
      n = t[pr] || pi(t),
      r = Object.prototype,
      o = Object.getPrototypeOf(e.prototype).constructor;
    for (; o && o !== r; ) {
      let i = o[pr] || pi(o);
      if (i && i !== n) return i;
      o = Object.getPrototypeOf(o);
    }
    return (i) => new i();
  });
}
function pi(e) {
  return Wu(e)
    ? () => {
        let t = pi(W(e));
        return t && t();
      }
    : nt(e);
}
function $p(e, t, n, r, o) {
  let i = e,
    s = t;
  for (; i !== null && s !== null && s[y] & 2048 && !(s[y] & 512); ) {
    let a = Jc(i, s, n, r | _.Self, ye);
    if (a !== ye) return a;
    let u = i.parent;
    if (!u) {
      let c = s[wc];
      if (c) {
        let l = c.get(n, ye, r);
        if (l !== ye) return l;
      }
      (u = Xc(s)), (s = s[$t]);
    }
    i = u;
  }
  return o;
}
function Xc(e) {
  let t = e[v],
    n = t.type;
  return n === 2 ? t.declTNode : n === 1 ? e[ee] : null;
}
function Hp(e) {
  return Lp(V(), e);
}
function mu(e, t = null, n = null, r) {
  let o = el(e, t, n, r);
  return o.resolveInjectorInitializers(), o;
}
function el(e, t = null, n = null, r, o = new Set()) {
  let i = [n || q, Uh(e)];
  return (
    (r = r || (typeof e == 'object' ? void 0 : J(e))),
    new sn(i, t || hs(), r || null, o)
  );
}
var et = class et {
  static create(t, n) {
    if (Array.isArray(t)) return mu({ name: '' }, n, t, '');
    {
      let r = t.name ?? '';
      return mu({ name: r }, t.parent, t.providers, r);
    }
  }
};
(et.THROW_IF_NOT_FOUND = nn),
  (et.NULL = new vr()),
  (et.ɵprov = P({ token: et, providedIn: 'any', factory: () => U(tc) })),
  (et.__NG_ELEMENT_ID__ = -1);
var He = et;
var Up = new A('');
Up.__NG_ELEMENT_ID__ = (e) => {
  let t = V();
  if (t === null) throw new S(204, !1);
  if (t.type & 2) return t.value;
  if (e & _.Optional) return null;
  throw new S(204, !1);
};
var zp = 'ngOriginalError';
function Go(e) {
  return e[zp];
}
var xs = (() => {
    let t = class t {};
    (t.__NG_ELEMENT_ID__ = Gp), (t.__NG_ENV_ID__ = (r) => r);
    let e = t;
    return e;
  })(),
  gi = class extends xs {
    constructor(t) {
      super(), (this._lView = t);
    }
    onDestroy(t) {
      return Oc(this._lView, t), () => lp(this._lView, t);
    }
  };
function Gp() {
  return new gi(I());
}
var Xr = (() => {
  let t = class t {
    constructor() {
      (this.taskId = 0),
        (this.pendingTasks = new Set()),
        (this.hasPendingTasks = new Zt(!1));
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
var mi = class extends re {
    constructor(t = !1) {
      super(),
        (this.destroyRef = void 0),
        (this.pendingTasks = void 0),
        (this.__isAsync = t),
        Ic() &&
          ((this.destroyRef = M(xs, { optional: !0 }) ?? void 0),
          (this.pendingTasks = M(Xr, { optional: !0 }) ?? void 0));
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
  fe = mi;
function Mr(...e) {}
function tl(e) {
  let t, n;
  function r() {
    e = Mr;
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
function yu(e) {
  return (
    queueMicrotask(() => e()),
    () => {
      e = Mr;
    }
  );
}
var Ss = 'isAngularZone',
  xr = Ss + '_ID',
  Wp = 0,
  X = class e {
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
        throw new S(908, !1);
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
        Yp(o);
    }
    static isInAngularZone() {
      return typeof Zone < 'u' && Zone.current.get(Ss) === !0;
    }
    static assertInAngularZone() {
      if (!e.isInAngularZone()) throw new S(909, !1);
    }
    static assertNotInAngularZone() {
      if (e.isInAngularZone()) throw new S(909, !1);
    }
    run(t, n, r) {
      return this._inner.run(t, n, r);
    }
    runTask(t, n, r, o) {
      let i = this._inner,
        s = i.scheduleEventTask('NgZoneEvent: ' + o, t, qp, Mr, Mr);
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
  qp = {};
function Ts(e) {
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
function Zp(e) {
  e.isCheckStableRunning ||
    e.callbackScheduled ||
    ((e.callbackScheduled = !0),
    Zone.root.run(() => {
      tl(() => {
        (e.callbackScheduled = !1),
          yi(e),
          (e.isCheckStableRunning = !0),
          Ts(e),
          (e.isCheckStableRunning = !1);
      });
    }),
    yi(e));
}
function Yp(e) {
  let t = () => {
      Zp(e);
    },
    n = Wp++;
  e._inner = e._inner.fork({
    name: 'angular',
    properties: { [Ss]: !0, [xr]: n, [xr + n]: !0 },
    onInvokeTask: (r, o, i, s, a, u) => {
      if (Qp(u)) return r.invokeTask(i, s, a, u);
      try {
        return vu(e), r.invokeTask(i, s, a, u);
      } finally {
        ((e.shouldCoalesceEventChangeDetection && s.type === 'eventTask') ||
          e.shouldCoalesceRunChangeDetection) &&
          t(),
          Du(e);
      }
    },
    onInvoke: (r, o, i, s, a, u, c) => {
      try {
        return vu(e), r.invoke(i, s, a, u, c);
      } finally {
        e.shouldCoalesceRunChangeDetection &&
          !e.callbackScheduled &&
          !Kp(u) &&
          t(),
          Du(e);
      }
    },
    onHasTask: (r, o, i, s) => {
      r.hasTask(i, s),
        o === i &&
          (s.change == 'microTask'
            ? ((e._hasPendingMicrotasks = s.microTask), yi(e), Ts(e))
            : s.change == 'macroTask' &&
              (e.hasPendingMacrotasks = s.macroTask));
    },
    onHandleError: (r, o, i, s) => (
      r.handleError(i, s), e.runOutsideAngular(() => e.onError.emit(s)), !1
    ),
  });
}
function yi(e) {
  e._hasPendingMicrotasks ||
  ((e.shouldCoalesceEventChangeDetection ||
    e.shouldCoalesceRunChangeDetection) &&
    e.callbackScheduled === !0)
    ? (e.hasPendingMicrotasks = !0)
    : (e.hasPendingMicrotasks = !1);
}
function vu(e) {
  e._nesting++, e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
}
function Du(e) {
  e._nesting--, Ts(e);
}
var vi = class {
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
function Qp(e) {
  return nl(e, '__ignore_ng_zone__');
}
function Kp(e) {
  return nl(e, '__scheduler_tick__');
}
function nl(e, t) {
  return !Array.isArray(e) || e.length !== 1 ? !1 : e[0]?.data?.[t] === !0;
}
var Rt = class {
    constructor() {
      this._console = console;
    }
    handleError(t) {
      let n = this._findOriginalError(t);
      this._console.error('ERROR', t),
        n && this._console.error('ORIGINAL ERROR', n);
    }
    _findOriginalError(t) {
      let n = t && Go(t);
      for (; n && Go(n); ) n = Go(n);
      return n || null;
    }
  },
  Jp = new A('', {
    providedIn: 'root',
    factory: () => {
      let e = M(X),
        t = M(Rt);
      return (n) => e.runOutsideAngular(() => t.handleError(n));
    },
  });
function Xp() {
  return Ht(V(), I());
}
function Ht(e, t) {
  return new Ut(ie(e, t));
}
var Ut = (() => {
  let t = class t {
    constructor(r) {
      this.nativeElement = r;
    }
  };
  t.__NG_ELEMENT_ID__ = Xp;
  let e = t;
  return e;
})();
function rl(e) {
  return e instanceof Ut ? e.nativeElement : e;
}
function eg() {
  return this._results[Symbol.iterator]();
}
var Di = class e {
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
    n[Symbol.iterator] || (n[Symbol.iterator] = eg);
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
    let r = Eh(t);
    (this._changesDetected = !Ih(this._results, r, n)) &&
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
function ol(e) {
  return (e.flags & 128) === 128;
}
var il = new Map(),
  tg = 0;
function ng() {
  return tg++;
}
function rg(e) {
  il.set(e[Gr], e);
}
function og(e) {
  il.delete(e[Gr]);
}
var Iu = '__ngContext__';
function Ue(e, t) {
  Le(t) ? ((e[Iu] = t[Gr]), rg(t)) : (e[Iu] = t);
}
function sl(e) {
  return ul(e[an]);
}
function al(e) {
  return ul(e[he]);
}
function ul(e) {
  for (; e !== null && !Se(e); ) e = e[he];
  return e;
}
var Ii;
function i0(e) {
  Ii = e;
}
function ig() {
  if (Ii !== void 0) return Ii;
  if (typeof document < 'u') return document;
  throw new S(210, !1);
}
var s0 = new A('', { providedIn: 'root', factory: () => sg }),
  sg = 'ng',
  ag = new A(''),
  Ns = new A('', { providedIn: 'platform', factory: () => 'unknown' });
var a0 = new A(''),
  u0 = new A('', {
    providedIn: 'root',
    factory: () =>
      ig().body?.querySelector('[ngCspNonce]')?.getAttribute('ngCspNonce') ||
      null,
  });
var ug = 'h',
  cg = 'b';
var lg = () => null;
function As(e, t, n = !1) {
  return lg(e, t, n);
}
var cl = !1,
  dg = new A('', { providedIn: 'root', factory: () => cl });
var tr;
function fg() {
  if (tr === void 0 && ((tr = null), hr.trustedTypes))
    try {
      tr = hr.trustedTypes.createPolicy('angular', {
        createHTML: (e) => e,
        createScript: (e) => e,
        createScriptURL: (e) => e,
      });
    } catch {}
  return tr;
}
function eo(e) {
  return fg()?.createHTML(e) || e;
}
var nr;
function hg() {
  if (nr === void 0 && ((nr = null), hr.trustedTypes))
    try {
      nr = hr.trustedTypes.createPolicy('angular#unsafe-bypass', {
        createHTML: (e) => e,
        createScript: (e) => e,
        createScriptURL: (e) => e,
      });
    } catch {}
  return nr;
}
function Eu(e) {
  return hg()?.createScriptURL(e) || e;
}
var xe = class {
    constructor(t) {
      this.changingThisBreaksApplicationSecurity = t;
    }
    toString() {
      return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Hu})`;
    }
  },
  Ei = class extends xe {
    getTypeName() {
      return 'HTML';
    }
  },
  wi = class extends xe {
    getTypeName() {
      return 'Style';
    }
  },
  Ci = class extends xe {
    getTypeName() {
      return 'Script';
    }
  },
  bi = class extends xe {
    getTypeName() {
      return 'URL';
    }
  },
  _i = class extends xe {
    getTypeName() {
      return 'ResourceURL';
    }
  };
function gn(e) {
  return e instanceof xe ? e.changingThisBreaksApplicationSecurity : e;
}
function ll(e, t) {
  let n = pg(e);
  if (n != null && n !== t) {
    if (n === 'ResourceURL' && t === 'URL') return !0;
    throw new Error(`Required a safe ${t}, got a ${n} (see ${Hu})`);
  }
  return n === t;
}
function pg(e) {
  return (e instanceof xe && e.getTypeName()) || null;
}
function c0(e) {
  return new Ei(e);
}
function l0(e) {
  return new wi(e);
}
function d0(e) {
  return new Ci(e);
}
function f0(e) {
  return new bi(e);
}
function h0(e) {
  return new _i(e);
}
function gg(e) {
  let t = new xi(e);
  return mg() ? new Mi(t) : t;
}
var Mi = class {
    constructor(t) {
      this.inertDocumentHelper = t;
    }
    getInertBodyElement(t) {
      t = '<body><remove></remove>' + t;
      try {
        let n = new window.DOMParser().parseFromString(eo(t), 'text/html').body;
        return n === null
          ? this.inertDocumentHelper.getInertBodyElement(t)
          : (n.firstChild?.remove(), n);
      } catch {
        return null;
      }
    }
  },
  xi = class {
    constructor(t) {
      (this.defaultDoc = t),
        (this.inertDocument =
          this.defaultDoc.implementation.createHTMLDocument(
            'sanitization-inert'
          ));
    }
    getInertBodyElement(t) {
      let n = this.inertDocument.createElement('template');
      return (n.innerHTML = eo(t)), n;
    }
  };
function mg() {
  try {
    return !!new window.DOMParser().parseFromString(eo(''), 'text/html');
  } catch {
    return !1;
  }
}
var yg = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
function dl(e) {
  return (e = String(e)), e.match(yg) ? e : 'unsafe:' + e;
}
function Ne(e) {
  let t = {};
  for (let n of e.split(',')) t[n] = !0;
  return t;
}
function mn(...e) {
  let t = {};
  for (let n of e) for (let r in n) n.hasOwnProperty(r) && (t[r] = !0);
  return t;
}
var fl = Ne('area,br,col,hr,img,wbr'),
  hl = Ne('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr'),
  pl = Ne('rp,rt'),
  vg = mn(pl, hl),
  Dg = mn(
    hl,
    Ne(
      'address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul'
    )
  ),
  Ig = mn(
    pl,
    Ne(
      'a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video'
    )
  ),
  wu = mn(fl, Dg, Ig, vg),
  gl = Ne('background,cite,href,itemtype,longdesc,poster,src,xlink:href'),
  Eg = Ne(
    'abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width'
  ),
  wg = Ne(
    'aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext'
  ),
  Cg = mn(gl, Eg, wg),
  bg = Ne('script,style,template'),
  Si = class {
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
          o.push(n), (n = xg(n));
          continue;
        }
        for (; n; ) {
          n.nodeType === Node.ELEMENT_NODE && this.endElement(n);
          let i = Mg(n);
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
      let n = Cu(t).toLowerCase();
      if (!wu.hasOwnProperty(n))
        return (this.sanitizedSomething = !0), !bg.hasOwnProperty(n);
      this.buf.push('<'), this.buf.push(n);
      let r = t.attributes;
      for (let o = 0; o < r.length; o++) {
        let i = r.item(o),
          s = i.name,
          a = s.toLowerCase();
        if (!Cg.hasOwnProperty(a)) {
          this.sanitizedSomething = !0;
          continue;
        }
        let u = i.value;
        gl[a] && (u = dl(u)), this.buf.push(' ', s, '="', bu(u), '"');
      }
      return this.buf.push('>'), !0;
    }
    endElement(t) {
      let n = Cu(t).toLowerCase();
      wu.hasOwnProperty(n) &&
        !fl.hasOwnProperty(n) &&
        (this.buf.push('</'), this.buf.push(n), this.buf.push('>'));
    }
    chars(t) {
      this.buf.push(bu(t));
    }
  };
function _g(e, t) {
  return (
    (e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY) !==
    Node.DOCUMENT_POSITION_CONTAINED_BY
  );
}
function Mg(e) {
  let t = e.nextSibling;
  if (t && e !== t.previousSibling) throw ml(t);
  return t;
}
function xg(e) {
  let t = e.firstChild;
  if (t && _g(e, t)) throw ml(t);
  return t;
}
function Cu(e) {
  let t = e.nodeName;
  return typeof t == 'string' ? t : 'FORM';
}
function ml(e) {
  return new Error(
    `Failed to sanitize html because the element is clobbered: ${e.outerHTML}`
  );
}
var Sg = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
  Tg = /([^\#-~ |!])/g;
function bu(e) {
  return e
    .replace(/&/g, '&amp;')
    .replace(Sg, function (t) {
      let n = t.charCodeAt(0),
        r = t.charCodeAt(1);
      return '&#' + ((n - 55296) * 1024 + (r - 56320) + 65536) + ';';
    })
    .replace(Tg, function (t) {
      return '&#' + t.charCodeAt(0) + ';';
    })
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
var rr;
function p0(e, t) {
  let n = null;
  try {
    rr = rr || gg(e);
    let r = t ? String(t) : '';
    n = rr.getInertBodyElement(r);
    let o = 5,
      i = r;
    do {
      if (o === 0)
        throw new Error(
          'Failed to sanitize html because the input is unstable'
        );
      o--, (r = i), (i = n.innerHTML), (n = rr.getInertBodyElement(r));
    } while (r !== i);
    let a = new Si().sanitizeChildren(_u(n) || n);
    return eo(a);
  } finally {
    if (n) {
      let r = _u(n) || n;
      for (; r.firstChild; ) r.firstChild.remove();
    }
  }
}
function _u(e) {
  return 'content' in e && Ng(e) ? e.content : null;
}
function Ng(e) {
  return e.nodeType === Node.ELEMENT_NODE && e.nodeName === 'TEMPLATE';
}
var Os = (function (e) {
  return (
    (e[(e.NONE = 0)] = 'NONE'),
    (e[(e.HTML = 1)] = 'HTML'),
    (e[(e.STYLE = 2)] = 'STYLE'),
    (e[(e.SCRIPT = 3)] = 'SCRIPT'),
    (e[(e.URL = 4)] = 'URL'),
    (e[(e.RESOURCE_URL = 5)] = 'RESOURCE_URL'),
    e
  );
})(Os || {});
function Ag(e) {
  let t = yl();
  return t ? t.sanitize(Os.URL, e) || '' : ll(e, 'URL') ? gn(e) : dl(St(e));
}
function Og(e) {
  let t = yl();
  if (t) return Eu(t.sanitize(Os.RESOURCE_URL, e) || '');
  if (ll(e, 'ResourceURL')) return Eu(gn(e));
  throw new S(904, !1);
}
function Fg(e, t) {
  return (t === 'src' &&
    (e === 'embed' ||
      e === 'frame' ||
      e === 'iframe' ||
      e === 'media' ||
      e === 'script')) ||
    (t === 'href' && (e === 'base' || e === 'link'))
    ? Og
    : Ag;
}
function g0(e, t, n) {
  return Fg(t, n)(e);
}
function yl() {
  let e = I();
  return e && e[ve].sanitizer;
}
var Rg = /^>|^->|<!--|-->|--!>|<!-$/g,
  Pg = /(<|>)/g,
  kg = '\u200B$1\u200B';
function Lg(e) {
  return e.replace(Rg, (t) => t.replace(Pg, kg));
}
function vl(e) {
  return e instanceof Function ? e() : e;
}
function Dl(e) {
  return (e ?? M(He)).get(Ns) === 'browser';
}
var Sr = (function (e) {
    return (
      (e[(e.Important = 1)] = 'Important'),
      (e[(e.DashCase = 2)] = 'DashCase'),
      e
    );
  })(Sr || {}),
  jg;
function Fs(e, t) {
  return jg(e, t);
}
function _t(e, t, n, r, o) {
  if (r != null) {
    let i,
      s = !1;
    Se(r) ? (i = r) : Le(r) && ((s = !0), (r = r[Ie]));
    let a = De(r);
    e === 0 && n !== null
      ? o == null
        ? bl(t, n, a)
        : Tr(t, n, a, o || null, !0)
      : e === 1 && n !== null
        ? Tr(t, n, a, o || null, !0)
        : e === 2
          ? Jg(t, a, s)
          : e === 3 && t.destroyNode(a),
      i != null && em(t, e, i, n, o);
  }
}
function Vg(e, t) {
  return e.createText(t);
}
function Bg(e, t, n) {
  e.setValue(t, n);
}
function $g(e, t) {
  return e.createComment(Lg(t));
}
function Il(e, t, n) {
  return e.createElement(t, n);
}
function Hg(e, t) {
  El(e, t), (t[Ie] = null), (t[ee] = null);
}
function Ug(e, t, n, r, o, i) {
  (r[Ie] = o), (r[ee] = t), ro(e, r, n, 1, o, i);
}
function El(e, t) {
  t[ve].changeDetectionScheduler?.notify(8), ro(e, t, t[R], 2, null, null);
}
function zg(e) {
  let t = e[an];
  if (!t) return Wo(e[v], e);
  for (; t; ) {
    let n = null;
    if (Le(t)) n = t[an];
    else {
      let r = t[H];
      r && (n = r);
    }
    if (!n) {
      for (; t && !t[he] && t !== e; ) Le(t) && Wo(t[v], t), (t = t[z]);
      t === null && (t = e), Le(t) && Wo(t[v], t), (n = t && t[he]);
    }
    t = n;
  }
}
function Gg(e, t, n, r) {
  let o = H + r,
    i = n.length;
  r > 0 && (n[o - 1][he] = t),
    r < i - H ? ((t[he] = n[o]), ec(n, H + r, t)) : (n.push(t), (t[he] = null)),
    (t[z] = n);
  let s = t[rt];
  s !== null && n !== s && wl(s, t);
  let a = t[_e];
  a !== null && a.insertView(e), ci(t), (t[y] |= 128);
}
function wl(e, t) {
  let n = e[Ft],
    r = t[z];
  if (Le(r)) e[y] |= Er.HasTransplantedViews;
  else {
    let o = r[z][te];
    t[te] !== o && (e[y] |= Er.HasTransplantedViews);
  }
  n === null ? (e[Ft] = [t]) : n.push(t);
}
function Rs(e, t) {
  let n = e[Ft],
    r = n.indexOf(t);
  n.splice(r, 1);
}
function cn(e, t) {
  if (e.length <= H) return;
  let n = H + t,
    r = e[n];
  if (r) {
    let o = r[rt];
    o !== null && o !== e && Rs(o, r), t > 0 && (e[n - 1][he] = r[he]);
    let i = mr(e, H + t);
    Hg(r[v], r);
    let s = i[_e];
    s !== null && s.detachView(i[v]),
      (r[z] = null),
      (r[he] = null),
      (r[y] &= -129);
  }
  return r;
}
function to(e, t) {
  if (!(t[y] & 256)) {
    let n = t[R];
    n.destroyNode && ro(e, t, n, 3, null, null), zg(t);
  }
}
function Wo(e, t) {
  if (t[y] & 256) return;
  let n = b(null);
  try {
    (t[y] &= -129),
      (t[y] |= 256),
      t[oe] && Io(t[oe]),
      qg(e, t),
      Wg(e, t),
      t[v].type === 1 && t[R].destroy();
    let r = t[rt];
    if (r !== null && Se(t[z])) {
      r !== t[z] && Rs(r, t);
      let o = t[_e];
      o !== null && o.detachView(e);
    }
    og(t);
  } finally {
    b(n);
  }
}
function Wg(e, t) {
  let n = e.cleanup,
    r = t[Dr];
  if (n !== null)
    for (let i = 0; i < n.length - 1; i += 2)
      if (typeof n[i] == 'string') {
        let s = n[i + 3];
        s >= 0 ? r[s]() : r[-s].unsubscribe(), (i += 2);
      } else {
        let s = r[n[i + 1]];
        n[i].call(s);
      }
  r !== null && (t[Dr] = null);
  let o = t[ke];
  if (o !== null) {
    t[ke] = null;
    for (let i = 0; i < o.length; i++) {
      let s = o[i];
      s();
    }
  }
}
function qg(e, t) {
  let n;
  if (e != null && (n = e.destroyHooks) != null)
    for (let r = 0; r < n.length; r += 2) {
      let o = t[n[r]];
      if (!(o instanceof at)) {
        let i = n[r + 1];
        if (Array.isArray(i))
          for (let s = 0; s < i.length; s += 2) {
            let a = o[i[s]],
              u = i[s + 1];
            me(4, a, u);
            try {
              u.call(a);
            } finally {
              me(5, a, u);
            }
          }
        else {
          me(4, o, i);
          try {
            i.call(o);
          } finally {
            me(5, o, i);
          }
        }
      }
    }
}
function Cl(e, t, n) {
  return Zg(e, t.parent, n);
}
function Zg(e, t, n) {
  let r = t;
  for (; r !== null && r.type & 168; ) (t = r), (r = t.parent);
  if (r === null) return n[Ie];
  {
    let { componentOffset: o } = r;
    if (o > -1) {
      let { encapsulation: i } = e.data[r.directiveStart + o];
      if (i === rn.None || i === rn.Emulated) return null;
    }
    return ie(r, n);
  }
}
function Tr(e, t, n, r, o) {
  e.insertBefore(t, n, r, o);
}
function bl(e, t, n) {
  e.appendChild(t, n);
}
function Mu(e, t, n, r, o) {
  r !== null ? Tr(e, t, n, r, o) : bl(e, t, n);
}
function _l(e, t) {
  return e.parentNode(t);
}
function Yg(e, t) {
  return e.nextSibling(t);
}
function Ml(e, t, n) {
  return Kg(e, t, n);
}
function Qg(e, t, n) {
  return e.type & 40 ? ie(e, n) : null;
}
var Kg = Qg,
  xu;
function no(e, t, n, r) {
  let o = Cl(e, r, t),
    i = t[R],
    s = r.parent || t[ee],
    a = Ml(s, r, t);
  if (o != null)
    if (Array.isArray(n))
      for (let u = 0; u < n.length; u++) Mu(i, o, n[u], a, !1);
    else Mu(i, o, n, a, !1);
  xu !== void 0 && xu(i, r, t, n, o);
}
function en(e, t) {
  if (t !== null) {
    let n = t.type;
    if (n & 3) return ie(t, e);
    if (n & 4) return Ti(-1, e[t.index]);
    if (n & 8) {
      let r = t.child;
      if (r !== null) return en(e, r);
      {
        let o = e[t.index];
        return Se(o) ? Ti(-1, o) : De(o);
      }
    } else {
      if (n & 128) return en(e, t.next);
      if (n & 32) return Fs(t, e)() || De(e[t.index]);
      {
        let r = xl(e, t);
        if (r !== null) {
          if (Array.isArray(r)) return r[0];
          let o = it(e[te]);
          return en(o, r);
        } else return en(e, t.next);
      }
    }
  }
  return null;
}
function xl(e, t) {
  if (t !== null) {
    let r = e[te][ee],
      o = t.projection;
    return r.projection[o];
  }
  return null;
}
function Ti(e, t) {
  let n = H + e + 1;
  if (n < t.length) {
    let r = t[n],
      o = r[v].firstChild;
    if (o !== null) return en(r, o);
  }
  return t[ot];
}
function Jg(e, t, n) {
  e.removeChild(null, t, n);
}
function Ps(e, t, n, r, o, i, s) {
  for (; n != null; ) {
    if (n.type === 128) {
      n = n.next;
      continue;
    }
    let a = r[n.index],
      u = n.type;
    if (
      (s && t === 0 && (a && Ue(De(a), r), (n.flags |= 2)),
      (n.flags & 32) !== 32)
    )
      if (u & 8) Ps(e, t, n.child, r, o, i, !1), _t(t, e, o, a, i);
      else if (u & 32) {
        let c = Fs(n, r),
          l;
        for (; (l = c()); ) _t(t, e, o, l, i);
        _t(t, e, o, a, i);
      } else u & 16 ? Sl(e, t, r, n, o, i) : _t(t, e, o, a, i);
    n = s ? n.projectionNext : n.next;
  }
}
function ro(e, t, n, r, o, i) {
  Ps(n, r, e.firstChild, t, o, i, !1);
}
function Xg(e, t, n) {
  let r = t[R],
    o = Cl(e, n, t),
    i = n.parent || t[ee],
    s = Ml(i, n, t);
  Sl(r, 0, t, n, o, s);
}
function Sl(e, t, n, r, o, i) {
  let s = n[te],
    u = s[ee].projection[r.projection];
  if (Array.isArray(u))
    for (let c = 0; c < u.length; c++) {
      let l = u[c];
      _t(t, e, o, l, i);
    }
  else {
    let c = u,
      l = s[z];
    ol(r) && (c.flags |= 128), Ps(e, t, c, l, o, i, !0);
  }
}
function em(e, t, n, r, o) {
  let i = n[ot],
    s = De(n);
  i !== s && _t(t, e, r, i, o);
  for (let a = H; a < n.length; a++) {
    let u = n[a];
    ro(u[v], u, e, t, r, i);
  }
}
function tm(e, t, n, r, o) {
  if (t) o ? e.addClass(n, r) : e.removeClass(n, r);
  else {
    let i = r.indexOf('-') === -1 ? void 0 : Sr.DashCase;
    o == null
      ? e.removeStyle(n, r, i)
      : (typeof o == 'string' &&
          o.endsWith('!important') &&
          ((o = o.slice(0, -10)), (i |= Sr.Important)),
        e.setStyle(n, r, o, i));
  }
}
function nm(e, t, n) {
  e.setAttribute(t, 'style', n);
}
function Tl(e, t, n) {
  n === '' ? e.removeAttribute(t, 'class') : e.setAttribute(t, 'class', n);
}
function Nl(e, t, n) {
  let { mergedAttrs: r, classes: o, styles: i } = n;
  r !== null && ri(e, t, r),
    o !== null && Tl(e, t, o),
    i !== null && nm(e, t, i);
}
var se = {};
function m0(e = 1) {
  Al(F(), I(), Te() + e, !1);
}
function Al(e, t, n, r) {
  if (!r)
    if ((t[y] & 3) === 3) {
      let i = e.preOrderCheckHooks;
      i !== null && ur(t, i, n);
    } else {
      let i = e.preOrderHooks;
      i !== null && cr(t, i, 0, n);
    }
  st(n);
}
function ft(e, t = _.Default) {
  let n = I();
  if (n === null) return U(e, t);
  let r = V();
  return Kc(r, n, W(e), t);
}
function y0() {
  let e = 'invalid';
  throw new Error(e);
}
function Ol(e, t, n, r, o, i) {
  let s = b(null);
  try {
    let a = null;
    o & je.SignalBased && (a = t[r][ue]),
      a !== null && a.transformFn !== void 0 && (i = a.transformFn(i)),
      o & je.HasDecoratorInputTransform &&
        (i = e.inputTransforms[r].call(t, i)),
      e.setInput !== null ? e.setInput(t, a, i, n, r) : Cc(t, a, r, i);
  } finally {
    b(s);
  }
}
function rm(e, t) {
  let n = e.hostBindingOpCodes;
  if (n !== null)
    try {
      for (let r = 0; r < n.length; r++) {
        let o = n[r];
        if (o < 0) st(~o);
        else {
          let i = o,
            s = n[++r],
            a = n[++r];
          wp(s, i);
          let u = t[i];
          a(2, u);
        }
      }
    } finally {
      st(-1);
    }
}
function oo(e, t, n, r, o, i, s, a, u, c, l) {
  let d = t.blueprint.slice();
  return (
    (d[Ie] = o),
    (d[y] = r | 4 | 128 | 8 | 64),
    (c !== null || (e && e[y] & 2048)) && (d[y] |= 2048),
    Nc(d),
    (d[z] = d[$t] = e),
    (d[$] = n),
    (d[ve] = s || (e && e[ve])),
    (d[R] = a || (e && e[R])),
    (d[Ot] = u || (e && e[Ot]) || null),
    (d[ee] = i),
    (d[Gr] = ng()),
    (d[At] = l),
    (d[wc] = c),
    (d[te] = t.type == 2 ? e[te] : d),
    d
  );
}
function zt(e, t, n, r, o) {
  let i = e.data[t];
  if (i === null) (i = om(e, t, n, r, o)), Ep() && (i.flags |= 32);
  else if (i.type & 64) {
    (i.type = n), (i.value = r), (i.attrs = o);
    let s = mp();
    i.injectorIndex = s === null ? -1 : s.injectorIndex;
  }
  return dt(i, !0), i;
}
function om(e, t, n, r, o) {
  let i = kc(),
    s = Ds(),
    a = s ? i : i && i.parent,
    u = (e.data[t] = lm(e, a, n, t, r, o));
  return (
    e.firstChild === null && (e.firstChild = u),
    i !== null &&
      (s
        ? i.child == null && u.parent !== null && (i.child = u)
        : i.next === null && ((i.next = u), (u.prev = i))),
    u
  );
}
function Fl(e, t, n, r) {
  if (n === 0) return -1;
  let o = t.length;
  for (let i = 0; i < n; i++) t.push(r), e.blueprint.push(r), e.data.push(null);
  return o;
}
function Rl(e, t, n, r, o) {
  let i = Te(),
    s = r & 2;
  try {
    st(-1), s && t.length > B && Al(e, t, B, !1), me(s ? 2 : 0, o), n(r, o);
  } finally {
    st(i), me(s ? 3 : 1, o);
  }
}
function ks(e, t, n) {
  if (gs(t)) {
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
function Ls(e, t, n) {
  Rc() && (mm(e, t, n, ie(n, t)), (n.flags & 64) === 64 && Ll(e, t, n));
}
function js(e, t, n = ie) {
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
function Pl(e) {
  let t = e.tView;
  return t === null || t.incompleteFirstPass
    ? (e.tView = Vs(
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
function Vs(e, t, n, r, o, i, s, a, u, c, l) {
  let d = B + r,
    h = d + o,
    f = im(d, h),
    p = typeof c == 'function' ? c() : c;
  return (f[v] = {
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
function im(e, t) {
  let n = [];
  for (let r = 0; r < t; r++) n.push(r < e ? null : se);
  return n;
}
function sm(e, t, n, r) {
  let i = r.get(dg, cl) || n === rn.ShadowDom,
    s = e.selectRootElement(t, i);
  return am(s), s;
}
function am(e) {
  um(e);
}
var um = () => null;
function cm(e, t, n, r) {
  let o = Bl(t);
  o.push(n), e.firstCreatePass && $l(e).push(r, o.length - 1);
}
function lm(e, t, n, r, o, i) {
  let s = t ? t.injectorIndex : -1,
    a = 0;
  return (
    Pc() && (a |= 128),
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
function Su(e, t, n, r, o) {
  for (let i in t) {
    if (!t.hasOwnProperty(i)) continue;
    let s = t[i];
    if (s === void 0) continue;
    r ??= {};
    let a,
      u = je.None;
    Array.isArray(s) ? ((a = s[0]), (u = s[1])) : (a = s);
    let c = i;
    if (o !== null) {
      if (!o.hasOwnProperty(i)) continue;
      c = o[i];
    }
    e === 0 ? Tu(r, n, c, a, u) : Tu(r, n, c, a);
  }
  return r;
}
function Tu(e, t, n, r, o) {
  let i;
  e.hasOwnProperty(n) ? (i = e[n]).push(t, r) : (i = e[n] = [t, r]),
    o !== void 0 && i.push(o);
}
function dm(e, t, n) {
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
    (u = Su(0, d.inputs, l, u, f)), (c = Su(1, d.outputs, l, c, p));
    let g = u !== null && s !== null && !ds(t) ? xm(u, l, s) : null;
    a.push(g);
  }
  u !== null &&
    (u.hasOwnProperty('class') && (t.flags |= 8),
    u.hasOwnProperty('style') && (t.flags |= 16)),
    (t.initialInputs = a),
    (t.inputs = u),
    (t.outputs = c);
}
function fm(e) {
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
function io(e, t, n, r, o, i, s, a) {
  let u = ie(t, n),
    c = t.inputs,
    l;
  !a && c != null && (l = c[r])
    ? ($s(e, n, l, r, o), Wr(t) && hm(n, t.index))
    : t.type & 3
      ? ((r = fm(r)),
        (o = s != null ? s(o, t.value || '', r) : o),
        i.setProperty(u, r, o))
      : t.type & 12;
}
function hm(e, t) {
  let n = Ge(t, e);
  n[y] & 16 || (n[y] |= 64);
}
function Bs(e, t, n, r) {
  if (Rc()) {
    let o = r === null ? null : { '': -1 },
      i = vm(e, n),
      s,
      a;
    i === null ? (s = a = null) : ([s, a] = i),
      s !== null && kl(e, t, n, s, o, a),
      o && Dm(n, r, o);
  }
  n.mergedAttrs = on(n.mergedAttrs, n.attrs);
}
function kl(e, t, n, r, o, i) {
  for (let c = 0; c < r.length; c++) hi(_r(n, t), e, r[c].type);
  Em(n, e.data.length, r.length);
  for (let c = 0; c < r.length; c++) {
    let l = r[c];
    l.providersResolver && l.providersResolver(l);
  }
  let s = !1,
    a = !1,
    u = Fl(e, t, r.length, null);
  for (let c = 0; c < r.length; c++) {
    let l = r[c];
    (n.mergedAttrs = on(n.mergedAttrs, l.hostAttrs)),
      wm(e, n, t, u, l),
      Im(u, l, o),
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
  dm(e, n, i);
}
function pm(e, t, n, r, o) {
  let i = o.hostBindings;
  if (i) {
    let s = e.hostBindingOpCodes;
    s === null && (s = e.hostBindingOpCodes = []);
    let a = ~t.index;
    gm(s) != a && s.push(a), s.push(n, r, i);
  }
}
function gm(e) {
  let t = e.length;
  for (; t > 0; ) {
    let n = e[--t];
    if (typeof n == 'number' && n < 0) return n;
  }
  return 0;
}
function mm(e, t, n, r) {
  let o = n.directiveStart,
    i = n.directiveEnd;
  Wr(n) && Cm(t, n, e.data[o + n.componentOffset]),
    e.firstCreatePass || _r(n, t),
    Ue(r, t);
  let s = n.initialInputs;
  for (let a = o; a < i; a++) {
    let u = e.data[a],
      c = ut(t, e, a, n);
    if ((Ue(c, t), s !== null && Mm(t, a - o, c, u, n, s), Me(u))) {
      let l = Ge(n.index, t);
      l[$] = ut(t, e, a, n);
    }
  }
}
function Ll(e, t, n) {
  let r = n.directiveStart,
    o = n.directiveEnd,
    i = n.index,
    s = Cp();
  try {
    st(i);
    for (let a = r; a < o; a++) {
      let u = e.data[a],
        c = t[a];
      li(a),
        (u.hostBindings !== null || u.hostVars !== 0 || u.hostAttrs !== null) &&
          ym(u, c);
    }
  } finally {
    st(-1), li(s);
  }
}
function ym(e, t) {
  e.hostBindings !== null && e.hostBindings(1, t);
}
function vm(e, t) {
  let n = e.directiveRegistry,
    r = null,
    o = null;
  if (n)
    for (let i = 0; i < n.length; i++) {
      let s = n[i];
      if (sc(t, s.selectors, !1))
        if ((r || (r = []), Me(s)))
          if (s.findHostDirectiveDefs !== null) {
            let a = [];
            (o = o || new Map()),
              s.findHostDirectiveDefs(s, a, o),
              r.unshift(...a, s);
            let u = a.length;
            Ni(e, t, u);
          } else r.unshift(s), Ni(e, t, 0);
        else
          (o = o || new Map()), s.findHostDirectiveDefs?.(s, r, o), r.push(s);
    }
  return r === null ? null : [r, o];
}
function Ni(e, t, n) {
  (t.componentOffset = n), (e.components ??= []).push(t.index);
}
function Dm(e, t, n) {
  if (t) {
    let r = (e.localNames = []);
    for (let o = 0; o < t.length; o += 2) {
      let i = n[t[o + 1]];
      if (i == null) throw new S(-301, !1);
      r.push(t[o], i);
    }
  }
}
function Im(e, t, n) {
  if (n) {
    if (t.exportAs)
      for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
    Me(t) && (n[''] = e);
  }
}
function Em(e, t, n) {
  (e.flags |= 1),
    (e.directiveStart = t),
    (e.directiveEnd = t + n),
    (e.providerIndexes = t);
}
function wm(e, t, n, r, o) {
  e.data[r] = o;
  let i = o.factory || (o.factory = nt(o.type, !0)),
    s = new at(i, Me(o), ft);
  (e.blueprint[r] = s), (n[r] = s), pm(e, t, r, Fl(e, n, o.hostVars, se), o);
}
function Cm(e, t, n) {
  let r = ie(t, e),
    o = Pl(n),
    i = e[ve].rendererFactory,
    s = 16;
  n.signals ? (s = 4096) : n.onPush && (s = 64);
  let a = so(
    e,
    oo(e, o, null, s, r, t, null, i.createRenderer(r, n), null, null, null)
  );
  e[t.index] = a;
}
function bm(e, t, n, r, o, i) {
  let s = ie(e, t);
  _m(t[R], s, i, e.value, n, r, o);
}
function _m(e, t, n, r, o, i, s) {
  if (i == null) e.removeAttribute(t, o, n);
  else {
    let a = s == null ? St(i) : s(i, r || '', o);
    e.setAttribute(t, o, a, n);
  }
}
function Mm(e, t, n, r, o, i) {
  let s = i[t];
  if (s !== null)
    for (let a = 0; a < s.length; ) {
      let u = s[a++],
        c = s[a++],
        l = s[a++],
        d = s[a++];
      Ol(r, n, u, c, l, d);
    }
}
function xm(e, t, n) {
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
function jl(e, t, n, r) {
  return [e, !0, 0, t, null, r, null, n, null, null];
}
function Vl(e, t) {
  let n = e.contentQueries;
  if (n !== null) {
    let r = b(null);
    try {
      for (let o = 0; o < n.length; o += 2) {
        let i = n[o],
          s = n[o + 1];
        if (s !== -1) {
          let a = e.data[s];
          Yr(i), a.contentQueries(2, t[s], s);
        }
      }
    } finally {
      b(r);
    }
  }
}
function so(e, t) {
  return e[an] ? (e[lu][he] = t) : (e[an] = t), (e[lu] = t), t;
}
function Ai(e, t, n) {
  Yr(0);
  let r = b(null);
  try {
    t(e, n);
  } finally {
    b(r);
  }
}
function Bl(e) {
  return (e[Dr] ??= []);
}
function $l(e) {
  return (e.cleanup ??= []);
}
function Hl(e, t, n) {
  return (e === null || Me(e)) && (n = sp(n[t.index])), n[R];
}
function Ul(e, t) {
  let n = e[Ot],
    r = n ? n.get(Rt, null) : null;
  r && r.handleError(t);
}
function $s(e, t, n, r, o) {
  for (let i = 0; i < n.length; ) {
    let s = n[i++],
      a = n[i++],
      u = n[i++],
      c = t[s],
      l = e.data[s];
    Ol(l, c, r, a, u, o);
  }
}
function zl(e, t, n) {
  let r = Sc(t, e);
  Bg(e[R], r, n);
}
function Sm(e, t) {
  let n = Ge(t, e),
    r = n[v];
  Tm(r, n);
  let o = n[Ie];
  o !== null && n[At] === null && (n[At] = As(o, n[Ot])), Hs(r, n, n[$]);
}
function Tm(e, t) {
  for (let n = t.length; n < e.blueprint.length; n++) t.push(e.blueprint[n]);
}
function Hs(e, t, n) {
  bs(t);
  try {
    let r = e.viewQuery;
    r !== null && Ai(1, r, n);
    let o = e.template;
    o !== null && Rl(e, t, o, 1, n),
      e.firstCreatePass && (e.firstCreatePass = !1),
      t[_e]?.finishViewCreation(e),
      e.staticContentQueries && Vl(e, t),
      e.staticViewQueries && Ai(2, e.viewQuery, n);
    let i = e.components;
    i !== null && Nm(t, i);
  } catch (r) {
    throw (
      (e.firstCreatePass &&
        ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
      r)
    );
  } finally {
    (t[y] &= -5), _s();
  }
}
function Nm(e, t) {
  for (let n = 0; n < t.length; n++) Sm(e, t[n]);
}
function yn(e, t, n, r) {
  let o = b(null);
  try {
    let i = t.tView,
      a = e[y] & 4096 ? 4096 : 16,
      u = oo(
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
    u[rt] = c;
    let l = e[_e];
    return l !== null && (u[_e] = l.createEmbeddedView(i)), Hs(i, u, n), u;
  } finally {
    b(o);
  }
}
function Gl(e, t) {
  let n = H + t;
  if (n < e.length) return e[n];
}
function Pt(e, t) {
  return !t || t.firstChild === null || ol(e);
}
function vn(e, t, n, r = !0) {
  let o = t[v];
  if ((Gg(o, t, e, n), r)) {
    let s = Ti(n, e),
      a = t[R],
      u = _l(a, e[ot]);
    u !== null && Ug(o, e[ee], a, t, u, s);
  }
  let i = t[At];
  i !== null && i.firstChild !== null && (i.firstChild = null);
}
function Wl(e, t) {
  let n = cn(e, t);
  return n !== void 0 && to(n[v], n), n;
}
function Nr(e, t, n, r, o = !1) {
  for (; n !== null; ) {
    if (n.type === 128) {
      n = o ? n.projectionNext : n.next;
      continue;
    }
    let i = t[n.index];
    i !== null && r.push(De(i)), Se(i) && Am(i, r);
    let s = n.type;
    if (s & 8) Nr(e, t, n.child, r);
    else if (s & 32) {
      let a = Fs(n, t),
        u;
      for (; (u = a()); ) r.push(u);
    } else if (s & 16) {
      let a = xl(t, n);
      if (Array.isArray(a)) r.push(...a);
      else {
        let u = it(t[te]);
        Nr(u[v], u, a, r, !0);
      }
    }
    n = o ? n.projectionNext : n.next;
  }
  return r;
}
function Am(e, t) {
  for (let n = H; n < e.length; n++) {
    let r = e[n],
      o = r[v].firstChild;
    o !== null && Nr(r[v], r, o, t);
  }
  e[ot] !== e[Ie] && t.push(e[ot]);
}
var ql = [];
function Om(e) {
  return e[oe] ?? Fm(e);
}
function Fm(e) {
  let t = ql.pop() ?? Object.create(Pm);
  return (t.lView = e), t;
}
function Rm(e) {
  e.lView[oe] !== e && ((e.lView = null), ql.push(e));
}
var Pm = Re(Fe({}, Wt), {
  consumerIsAlwaysLive: !0,
  consumerMarkedDirty: (e) => {
    Zr(e.lView);
  },
  consumerOnSignalRead() {
    this.lView[oe] = this;
  },
});
function km(e) {
  let t = e[oe] ?? Object.create(Lm);
  return (t.lView = e), t;
}
var Lm = Re(Fe({}, Wt), {
  consumerIsAlwaysLive: !0,
  consumerMarkedDirty: (e) => {
    let t = it(e.lView);
    for (; t && !Zl(t[v]); ) t = it(t);
    t && Ac(t);
  },
  consumerOnSignalRead() {
    this.lView[oe] = this;
  },
});
function Zl(e) {
  return e.type !== 2;
}
var jm = 100;
function Yl(e, t = !0, n = 0) {
  let r = e[ve],
    o = r.rendererFactory,
    i = !1;
  i || o.begin?.();
  try {
    Vm(e, n);
  } catch (s) {
    throw (t && Ul(e, s), s);
  } finally {
    i || (o.end?.(), r.inlineEffectRunner?.flush());
  }
}
function Vm(e, t) {
  let n = Lc();
  try {
    fu(!0), Oi(e, t);
    let r = 0;
    for (; un(e); ) {
      if (r === jm) throw new S(103, !1);
      r++, Oi(e, 1);
    }
  } finally {
    fu(n);
  }
}
function Bm(e, t, n, r) {
  let o = t[y];
  if ((o & 256) === 256) return;
  let i = !1,
    s = !1;
  !i && t[ve].inlineEffectRunner?.flush(), bs(t);
  let a = !0,
    u = null,
    c = null;
  i ||
    (Zl(e)
      ? ((c = Om(t)), (u = bn(c)))
      : da() === null
        ? ((a = !1), (c = km(t)), (u = bn(c)))
        : t[oe] && (Io(t[oe]), (t[oe] = null)));
  try {
    Nc(t), Ip(e.bindingStartIndex), n !== null && Rl(e, t, n, 2, r);
    let l = (o & 3) === 3;
    if (!i)
      if (l) {
        let f = e.preOrderCheckHooks;
        f !== null && ur(t, f, null);
      } else {
        let f = e.preOrderHooks;
        f !== null && cr(t, f, 0, null), Ho(t, 0);
      }
    if ((s || $m(t), Ql(t, 0), e.contentQueries !== null && Vl(e, t), !i))
      if (l) {
        let f = e.contentCheckHooks;
        f !== null && ur(t, f);
      } else {
        let f = e.contentHooks;
        f !== null && cr(t, f, 1), Ho(t, 1);
      }
    rm(e, t);
    let d = e.components;
    d !== null && Jl(t, d, 0);
    let h = e.viewQuery;
    if ((h !== null && Ai(2, h, r), !i))
      if (l) {
        let f = e.viewCheckHooks;
        f !== null && ur(t, f);
      } else {
        let f = e.viewHooks;
        f !== null && cr(t, f, 2), Ho(t, 2);
      }
    if ((e.firstUpdatePass === !0 && (e.firstUpdatePass = !1), t[$o])) {
      for (let f of t[$o]) f();
      t[$o] = null;
    }
    i || (t[y] &= -73);
  } catch (l) {
    throw (i || Zr(t), l);
  } finally {
    c !== null && (vo(c, u), a && Rm(c)), _s();
  }
}
function Ql(e, t) {
  for (let n = sl(e); n !== null; n = al(n))
    for (let r = H; r < n.length; r++) {
      let o = n[r];
      Kl(o, t);
    }
}
function $m(e) {
  for (let t = sl(e); t !== null; t = al(t)) {
    if (!(t[y] & Er.HasTransplantedViews)) continue;
    let n = t[Ft];
    for (let r = 0; r < n.length; r++) {
      let o = n[r];
      Ac(o);
    }
  }
}
function Hm(e, t, n) {
  let r = Ge(t, e);
  Kl(r, n);
}
function Kl(e, t) {
  vs(e) && Oi(e, t);
}
function Oi(e, t) {
  let r = e[v],
    o = e[y],
    i = e[oe],
    s = !!(t === 0 && o & 16);
  if (
    ((s ||= !!(o & 64 && t === 0)),
    (s ||= !!(o & 1024)),
    (s ||= !!(i?.dirty && Do(i))),
    (s ||= !1),
    i && (i.dirty = !1),
    (e[y] &= -9217),
    s)
  )
    Bm(r, e, r.template, e[$]);
  else if (o & 8192) {
    Ql(e, 1);
    let a = r.components;
    a !== null && Jl(e, a, 1);
  }
}
function Jl(e, t, n) {
  for (let r = 0; r < t.length; r++) Hm(e, t[r], n);
}
function Us(e, t) {
  let n = Lc() ? 64 : 1088;
  for (e[ve].changeDetectionScheduler?.notify(t); e; ) {
    e[y] |= n;
    let r = it(e);
    if (ai(e) && !r) return e;
    e = r;
  }
  return null;
}
var ct = class {
    get rootNodes() {
      let t = this._lView,
        n = t[v];
      return Nr(n, t, n.firstChild, []);
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
        if (Se(t)) {
          let n = t[Ir],
            r = n ? n.indexOf(this) : -1;
          r > -1 && (cn(t, r), mr(n, r));
        }
        this._attachedToViewContainer = !1;
      }
      to(this._lView[v], this._lView);
    }
    onDestroy(t) {
      Oc(this._lView, t);
    }
    markForCheck() {
      Us(this._cdRefInjectingView || this._lView, 4);
    }
    detach() {
      this._lView[y] &= -129;
    }
    reattach() {
      ci(this._lView), (this._lView[y] |= 128);
    }
    detectChanges() {
      (this._lView[y] |= 1024), Yl(this._lView, this.notifyErrorHandler);
    }
    checkNoChanges() {}
    attachToViewContainerRef() {
      if (this._appRef) throw new S(902, !1);
      this._attachedToViewContainer = !0;
    }
    detachFromAppRef() {
      this._appRef = null;
      let t = ai(this._lView),
        n = this._lView[rt];
      n !== null && !t && Rs(n, this._lView), El(this._lView[v], this._lView);
    }
    attachToAppRef(t) {
      if (this._attachedToViewContainer) throw new S(902, !1);
      this._appRef = t;
      let n = ai(this._lView),
        r = this._lView[rt];
      r !== null && !n && wl(r, this._lView), ci(this._lView);
    }
  },
  ln = (() => {
    let t = class t {};
    t.__NG_ELEMENT_ID__ = Gm;
    let e = t;
    return e;
  })(),
  Um = ln,
  zm = class extends Um {
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
      let o = yn(this._declarationLView, this._declarationTContainer, t, {
        embeddedViewInjector: n,
        dehydratedView: r,
      });
      return new ct(o);
    }
  };
function Gm() {
  return ao(V(), I());
}
function ao(e, t) {
  return e.type & 4 ? new zm(t, e, Ht(e, t)) : null;
}
var D0 = new RegExp(`^(\\d+)*(${cg}|${ug})*(.*)`);
var Wm = () => null;
function kt(e, t) {
  return Wm(e, t);
}
var Lt = class {},
  zs = new A('', { providedIn: 'root', factory: () => !1 });
var Xl = new A(''),
  Fi = class {},
  Ar = class {};
function qm(e) {
  let t = Error(`No component factory found for ${J(e)}.`);
  return (t[Zm] = e), t;
}
var Zm = 'ngComponent';
var Ri = class {
    resolveComponentFactory(t) {
      throw qm(t);
    }
  },
  Xs = class Xs {};
Xs.NULL = new Ri();
var jt = Xs,
  Or = class {},
  ed = (() => {
    let t = class t {
      constructor() {
        this.destroyNode = null;
      }
    };
    t.__NG_ELEMENT_ID__ = () => Ym();
    let e = t;
    return e;
  })();
function Ym() {
  let e = I(),
    t = V(),
    n = Ge(t.index, e);
  return (Le(n) ? n : e)[R];
}
var Qm = (() => {
  let t = class t {};
  t.ɵprov = P({ token: t, providedIn: 'root', factory: () => null });
  let e = t;
  return e;
})();
var Nu = new Set();
function Ae(e) {
  Nu.has(e) ||
    (Nu.add(e),
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
  td = { destroy() {} };
function Km(e, t) {
  !t && Ec(Km);
  let n = t?.injector ?? M(He);
  return Dl(n)
    ? (Ae('NgAfterRender'), nd(e, n, !1, t?.phase ?? Z.MixedReadWrite))
    : td;
}
function Jm(e, t) {
  !t && Ec(Jm);
  let n = t?.injector ?? M(He);
  return Dl(n)
    ? (Ae('NgAfterNextRender'), nd(e, n, !0, t?.phase ?? Z.MixedReadWrite))
    : td;
}
function Xm(e, t) {
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
function nd(e, t, n, r) {
  let o = Xm(e, r),
    i = t.get(Gs),
    s = (i.handler ??= new ki()),
    a = [],
    u = [],
    c = () => {
      for (let f of u) s.unregister(f);
      l();
    },
    l = t.get(xs).onDestroy(c),
    d = 0,
    h = (f, p) => {
      if (!p) return;
      let g = n ? (...C) => (d--, d < 1 && c(), p(...C)) : p,
        T = ep(t, () => new Pi(f, a, g));
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
var Pi = class {
    constructor(t, n, r) {
      (this.phase = t),
        (this.pipelinedArgs = n),
        (this.callbackFn = r),
        (this.zone = M(X)),
        (this.errorHandler = M(Rt, { optional: !0 })),
        M(Lt, { optional: !0 })?.notify(6);
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
  ki = class {
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
  Gs = (() => {
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
function Fr(e, t, n) {
  let r = n ? e.styles : null,
    o = n ? e.classes : null,
    i = 0;
  if (t !== null)
    for (let s = 0; s < t.length; s++) {
      let a = t[s];
      if (typeof a == 'number') i = a;
      else if (i == 1) o = Xo(o, a);
      else if (i == 2) {
        let u = a,
          c = t[++s];
        r = Xo(r, u + ': ' + c + ';');
      }
    }
  n ? (e.styles = r) : (e.stylesWithoutHost = r),
    n ? (e.classes = o) : (e.classesWithoutHost = o);
}
var Rr = class extends jt {
  constructor(t) {
    super(), (this.ngModule = t);
  }
  resolveComponentFactory(t) {
    let n = Ve(t);
    return new Vt(n, this.ngModule);
  }
};
function Au(e, t) {
  let n = [];
  for (let r in e) {
    if (!e.hasOwnProperty(r)) continue;
    let o = e[r];
    if (o === void 0) continue;
    let i = Array.isArray(o),
      s = i ? o[0] : o,
      a = i ? o[1] : je.None;
    t
      ? n.push({
          propName: s,
          templateName: r,
          isSignal: (a & je.SignalBased) !== 0,
        })
      : n.push({ propName: s, templateName: r });
  }
  return n;
}
function ey(e) {
  let t = e.toLowerCase();
  return t === 'svg' ? xc : t === 'math' ? ip : null;
}
var Vt = class extends Ar {
    get inputs() {
      let t = this.componentDef,
        n = t.inputTransforms,
        r = Au(t.inputs, !0);
      if (n !== null)
        for (let o of r)
          n.hasOwnProperty(o.propName) && (o.transform = n[o.propName]);
      return r;
    }
    get outputs() {
      return Au(this.componentDef.outputs, !1);
    }
    constructor(t, n) {
      super(),
        (this.componentDef = t),
        (this.ngModule = n),
        (this.componentType = t.type),
        (this.selector = kh(t.selectors)),
        (this.ngContentSelectors = t.ngContentSelectors
          ? t.ngContentSelectors
          : []),
        (this.isBoundToModule = !!n);
    }
    create(t, n, r, o) {
      let i = b(null);
      try {
        o = o || this.ngModule;
        let s = o instanceof Be ? o : o?.injector;
        s &&
          this.componentDef.getStandaloneInjector !== null &&
          (s = this.componentDef.getStandaloneInjector(s) || s);
        let a = s ? new di(t, s) : t,
          u = a.get(Or, null);
        if (u === null) throw new S(407, !1);
        let c = a.get(Qm, null),
          l = a.get(Gs, null),
          d = a.get(Lt, null),
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
            ? sm(f, r, this.componentDef.encapsulation, a)
            : Il(f, p, ey(p)),
          T = 512;
        this.componentDef.signals
          ? (T |= 4096)
          : this.componentDef.onPush || (T |= 16);
        let C = null;
        g !== null && (C = As(g, a, !0));
        let j = Vs(0, null, null, 1, 0, null, null, null, null, null, null),
          Y = oo(null, j, null, T, null, null, h, f, a, null, C);
        bs(Y);
        let Ee, pt;
        try {
          let ae = this.componentDef,
            gt,
            fo = null;
          ae.findHostDirectiveDefs
            ? ((gt = []),
              (fo = new Map()),
              ae.findHostDirectiveDefs(ae, gt, fo),
              gt.push(ae))
            : (gt = [ae]);
          let Bd = ty(Y, g),
            $d = ny(Bd, g, ae, gt, Y, h, f);
          (pt = ys(j, B)),
            g && iy(f, ae, g, r),
            n !== void 0 && sy(pt, this.ngContentSelectors, n),
            (Ee = oy($d, ae, gt, fo, Y, [ay])),
            Hs(j, Y, null);
        } finally {
          _s();
        }
        return new Li(this.componentType, Ee, Ht(pt, Y), Y, pt);
      } finally {
        b(i);
      }
    }
  },
  Li = class extends Fi {
    constructor(t, n, r, o, i) {
      super(),
        (this.location = r),
        (this._rootLView = o),
        (this._tNode = i),
        (this.previousInputValues = null),
        (this.instance = n),
        (this.hostView = this.changeDetectorRef = new ct(o, void 0, !1)),
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
        $s(i[v], i, o, t, n), this.previousInputValues.set(t, n);
        let s = Ge(this._tNode.index, i);
        Us(s, 1);
      }
    }
    get injector() {
      return new tt(this._tNode, this._rootLView);
    }
    destroy() {
      this.hostView.destroy();
    }
    onDestroy(t) {
      this.hostView.onDestroy(t);
    }
  };
function ty(e, t) {
  let n = e[v],
    r = B;
  return (e[r] = t), zt(n, r, 2, '#host', null);
}
function ny(e, t, n, r, o, i, s) {
  let a = o[v];
  ry(r, e, t, s);
  let u = null;
  t !== null && (u = As(t, o[Ot]));
  let c = i.rendererFactory.createRenderer(t, n),
    l = 16;
  n.signals ? (l = 4096) : n.onPush && (l = 64);
  let d = oo(o, Pl(n), null, l, o[e.index], e, i, c, null, null, u);
  return (
    a.firstCreatePass && Ni(a, e, r.length - 1), so(o, d), (o[e.index] = d)
  );
}
function ry(e, t, n, r) {
  for (let o of e) t.mergedAttrs = on(t.mergedAttrs, o.hostAttrs);
  t.mergedAttrs !== null &&
    (Fr(t, t.mergedAttrs, !0), n !== null && Nl(r, n, t));
}
function oy(e, t, n, r, o, i) {
  let s = V(),
    a = o[v],
    u = ie(s, o);
  kl(a, o, s, n, null, r);
  for (let l = 0; l < n.length; l++) {
    let d = s.directiveStart + l,
      h = ut(o, a, d, s);
    Ue(h, o);
  }
  Ll(a, o, s), u && Ue(u, o);
  let c = ut(o, a, s.directiveStart + s.componentOffset, s);
  if (((e[$] = o[$] = c), i !== null)) for (let l of i) l(c, t);
  return ks(a, s, o), c;
}
function iy(e, t, n, r) {
  if (r) ri(e, n, ['ng-version', '18.2.0']);
  else {
    let { attrs: o, classes: i } = Lh(t.selectors[0]);
    o && ri(e, n, o), i && i.length > 0 && Tl(e, n, i.join(' '));
  }
}
function sy(e, t, n) {
  let r = (e.projection = []);
  for (let o = 0; o < t.length; o++) {
    let i = n[o];
    r.push(i != null ? Array.from(i) : null);
  }
}
function ay() {
  let e = V();
  Jr(I()[v], e);
}
var Dn = (() => {
  let t = class t {};
  t.__NG_ELEMENT_ID__ = uy;
  let e = t;
  return e;
})();
function uy() {
  let e = V();
  return od(e, I());
}
var cy = Dn,
  rd = class extends cy {
    constructor(t, n, r) {
      super(),
        (this._lContainer = t),
        (this._hostTNode = n),
        (this._hostLView = r);
    }
    get element() {
      return Ht(this._hostTNode, this._hostLView);
    }
    get injector() {
      return new tt(this._hostTNode, this._hostLView);
    }
    get parentInjector() {
      let t = Ms(this._hostTNode, this._hostLView);
      if (Gc(t)) {
        let n = Cr(t, this._hostLView),
          r = wr(t),
          o = n[v].data[r + 8];
        return new tt(o, n);
      } else return new tt(null, this._hostLView);
    }
    clear() {
      for (; this.length > 0; ) this.remove(this.length - 1);
    }
    get(t) {
      let n = Ou(this._lContainer);
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
      let s = kt(this._lContainer, t.ssrId),
        a = t.createEmbeddedViewImpl(n || {}, i, s);
      return this.insertImpl(a, o, Pt(this._hostTNode, s)), a;
    }
    createComponent(t, n, r, o, i) {
      let s = t && !tp(t),
        a;
      if (s) a = n;
      else {
        let p = n || {};
        (a = p.index),
          (r = p.injector),
          (o = p.projectableNodes),
          (i = p.environmentInjector || p.ngModuleRef);
      }
      let u = s ? t : new Vt(Ve(t)),
        c = r || this.parentInjector;
      if (!i && u.ngModule == null) {
        let g = (s ? c : this.parentInjector).get(Be, null);
        g && (i = g);
      }
      let l = Ve(u.componentType ?? {}),
        d = kt(this._lContainer, l?.id ?? null),
        h = d?.firstChild ?? null,
        f = u.create(c, o, h, i);
      return this.insertImpl(f.hostView, a, Pt(this._hostTNode, d)), f;
    }
    insert(t, n) {
      return this.insertImpl(t, n, !0);
    }
    insertImpl(t, n, r) {
      let o = t._lView;
      if (up(o)) {
        let a = this.indexOf(t);
        if (a !== -1) this.detach(a);
        else {
          let u = o[z],
            c = new rd(u, u[ee], u[z]);
          c.detach(c.indexOf(t));
        }
      }
      let i = this._adjustIndex(n),
        s = this._lContainer;
      return vn(s, o, i, r), t.attachToViewContainerRef(), ec(qo(s), i, t), t;
    }
    move(t, n) {
      return this.insert(t, n);
    }
    indexOf(t) {
      let n = Ou(this._lContainer);
      return n !== null ? n.indexOf(t) : -1;
    }
    remove(t) {
      let n = this._adjustIndex(t, -1),
        r = cn(this._lContainer, n);
      r && (mr(qo(this._lContainer), n), to(r[v], r));
    }
    detach(t) {
      let n = this._adjustIndex(t, -1),
        r = cn(this._lContainer, n);
      return r && mr(qo(this._lContainer), n) != null ? new ct(r) : null;
    }
    _adjustIndex(t, n = 0) {
      return t ?? this.length + n;
    }
  };
function Ou(e) {
  return e[Ir];
}
function qo(e) {
  return e[Ir] || (e[Ir] = []);
}
function od(e, t) {
  let n,
    r = t[e.index];
  return (
    Se(r) ? (n = r) : ((n = jl(r, t, null, e)), (t[e.index] = n), so(t, n)),
    dy(n, t, e, r),
    new rd(n, e, t)
  );
}
function ly(e, t) {
  let n = e[R],
    r = n.createComment(''),
    o = ie(t, e),
    i = _l(n, o);
  return Tr(n, i, r, Yg(n, o), !1), r;
}
var dy = py,
  fy = () => !1;
function hy(e, t, n) {
  return fy(e, t, n);
}
function py(e, t, n, r) {
  if (e[ot]) return;
  let o;
  n.type & 8 ? (o = De(r)) : (o = ly(t, n)), (e[ot] = o);
}
var ji = class e {
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
  Vi = class e {
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
        qs(t, n).matches !== null && this.queries[n].setDirty();
    }
  },
  Pr = class {
    constructor(t, n, r = null) {
      (this.flags = n),
        (this.read = r),
        typeof t == 'string' ? (this.predicate = Iy(t)) : (this.predicate = t);
    }
  },
  Bi = class e {
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
  $i = class e {
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
          this.matchTNodeWithReadOption(t, n, gy(n, i)),
            this.matchTNodeWithReadOption(t, n, lr(n, t, i, !1, !1));
        }
      else
        r === ln
          ? n.type & 4 && this.matchTNodeWithReadOption(t, n, -1)
          : this.matchTNodeWithReadOption(t, n, lr(n, t, r, !1, !1));
    }
    matchTNodeWithReadOption(t, n, r) {
      if (r !== null) {
        let o = this.metadata.read;
        if (o !== null)
          if (o === Ut || o === Dn || (o === ln && n.type & 4))
            this.addMatch(n.index, -2);
          else {
            let i = lr(n, t, o, !1, !1);
            i !== null && this.addMatch(n.index, i);
          }
        else this.addMatch(n.index, r);
      }
    }
    addMatch(t, n) {
      this.matches === null ? (this.matches = [t, n]) : this.matches.push(t, n);
    }
  };
function gy(e, t) {
  let n = e.localNames;
  if (n !== null) {
    for (let r = 0; r < n.length; r += 2) if (n[r] === t) return n[r + 1];
  }
  return null;
}
function my(e, t) {
  return e.type & 11 ? Ht(e, t) : e.type & 4 ? ao(e, t) : null;
}
function yy(e, t, n, r) {
  return n === -1 ? my(t, e) : n === -2 ? vy(e, t, r) : ut(e, e[v], n, t);
}
function vy(e, t, n) {
  if (n === Ut) return Ht(t, e);
  if (n === ln) return ao(t, e);
  if (n === Dn) return od(t, e);
}
function id(e, t, n, r) {
  let o = t[_e].queries[r];
  if (o.matches === null) {
    let i = e.data,
      s = n.matches,
      a = [];
    for (let u = 0; s !== null && u < s.length; u += 2) {
      let c = s[u];
      if (c < 0) a.push(null);
      else {
        let l = i[c];
        a.push(yy(t, l, s[u + 1], n.metadata.read));
      }
    }
    o.matches = a;
  }
  return o.matches;
}
function Hi(e, t, n, r) {
  let o = e.queries.getByIndex(n),
    i = o.matches;
  if (i !== null) {
    let s = id(e, t, o, n);
    for (let a = 0; a < i.length; a += 2) {
      let u = i[a];
      if (u > 0) r.push(s[a / 2]);
      else {
        let c = i[a + 1],
          l = t[-u];
        for (let d = H; d < l.length; d++) {
          let h = l[d];
          h[rt] === h[z] && Hi(h[v], h, c, r);
        }
        if (l[Ft] !== null) {
          let d = l[Ft];
          for (let h = 0; h < d.length; h++) {
            let f = d[h];
            Hi(f[v], f, c, r);
          }
        }
      }
    }
  }
  return r;
}
function Ws(e, t) {
  return e[_e].queries[t].queryList;
}
function sd(e, t, n) {
  let r = new Di((n & 4) === 4);
  return (
    cm(e, t, r, r.destroy), (t[_e] ??= new Vi()).queries.push(new ji(r)) - 1
  );
}
function Dy(e, t, n) {
  let r = F();
  return (
    r.firstCreatePass &&
      (ud(r, new Pr(e, t, n), -1), (t & 2) === 2 && (r.staticViewQueries = !0)),
    sd(r, I(), t)
  );
}
function ad(e, t, n, r) {
  let o = F();
  if (o.firstCreatePass) {
    let i = V();
    ud(o, new Pr(t, n, r), i.index),
      Ey(o, e),
      (n & 2) === 2 && (o.staticContentQueries = !0);
  }
  return sd(o, I(), n);
}
function Iy(e) {
  return e.split(',').map((t) => t.trim());
}
function ud(e, t, n) {
  e.queries === null && (e.queries = new Bi()), e.queries.track(new $i(t, n));
}
function Ey(e, t) {
  let n = e.contentQueries || (e.contentQueries = []),
    r = n.length ? n[n.length - 1] : -1;
  t !== r && n.push(e.queries.length - 1, t);
}
function qs(e, t) {
  return e.queries.getByIndex(t);
}
function cd(e, t) {
  let n = e[v],
    r = qs(n, t);
  return r.crossesNgTemplate ? Hi(n, e, t, []) : id(n, e, r, t);
}
function wy(e) {
  return typeof e == 'function' && e[ue] !== void 0;
}
function Cy(e, t) {
  Ae('NgSignals');
  let n = Ea(e),
    r = n[ue];
  return (
    t?.equal && (r.equal = t.equal),
    (n.set = (o) => wo(r, o)),
    (n.update = (o) => wa(r, o)),
    (n.asReadonly = by.bind(n)),
    n
  );
}
function by() {
  let e = this[ue];
  if (e.readonlyFn === void 0) {
    let t = () => this();
    (t[ue] = e), (e.readonlyFn = t);
  }
  return e.readonlyFn;
}
function ld(e) {
  return wy(e) && typeof e.set == 'function';
}
function dd(e, t) {
  let n,
    r = Eo(() => {
      n._dirtyCounter();
      let o = Sy(n, e);
      if (t && o === void 0) throw new S(-951, !1);
      return o;
    });
  return (n = r[ue]), (n._dirtyCounter = Cy(0)), (n._flatValue = void 0), r;
}
function _y() {
  return dd(!0, !1);
}
function My() {
  return dd(!0, !0);
}
function xy(e, t) {
  let n = e[ue];
  (n._lView = I()),
    (n._queryIndex = t),
    (n._queryList = Ws(n._lView, t)),
    n._queryList.onDirty(() => n._dirtyCounter.update((r) => r + 1));
}
function Sy(e, t) {
  let n = e._lView,
    r = e._queryIndex;
  if (n === void 0 || r === void 0 || n[y] & 4) return t ? void 0 : q;
  let o = Ws(n, r),
    i = cd(n, r);
  return (
    o.reset(i, rl),
    t
      ? o.first
      : o._changesDetected || e._flatValue === void 0
        ? (e._flatValue = o.toArray())
        : e._flatValue
  );
}
function Fu(e, t) {
  return _y();
}
function Ty(e, t) {
  return My();
}
var E0 = ((Fu.required = Ty), Fu);
function Ny(e) {
  return Object.getPrototypeOf(e.prototype).constructor;
}
function Ay(e) {
  let t = Ny(e.type),
    n = !0,
    r = [e];
  for (; t; ) {
    let o;
    if (Me(e)) o = t.ɵcmp || t.ɵdir;
    else {
      if (t.ɵcmp) throw new S(903, !1);
      o = t.ɵdir;
    }
    if (o) {
      if (n) {
        r.push(o);
        let s = e;
        (s.inputs = or(e.inputs)),
          (s.inputTransforms = or(e.inputTransforms)),
          (s.declaredInputs = or(e.declaredInputs)),
          (s.outputs = or(e.outputs));
        let a = o.hostBindings;
        a && ky(e, a);
        let u = o.viewQuery,
          c = o.contentQueries;
        if (
          (u && Ry(e, u),
          c && Py(e, c),
          Oy(e, o),
          Xf(e.outputs, o.outputs),
          Me(o) && o.data.animation)
        ) {
          let l = e.data;
          l.animation = (l.animation || []).concat(o.data.animation);
        }
      }
      let i = o.features;
      if (i)
        for (let s = 0; s < i.length; s++) {
          let a = i[s];
          a && a.ngInherit && a(e), a === Ay && (n = !1);
        }
    }
    t = Object.getPrototypeOf(t);
  }
  Fy(r);
}
function Oy(e, t) {
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
function Fy(e) {
  let t = 0,
    n = null;
  for (let r = e.length - 1; r >= 0; r--) {
    let o = e[r];
    (o.hostVars = t += o.hostVars),
      (o.hostAttrs = on(o.hostAttrs, (n = on(n, o.hostAttrs))));
  }
}
function or(e) {
  return e === Tt ? {} : e === q ? [] : e;
}
function Ry(e, t) {
  let n = e.viewQuery;
  n
    ? (e.viewQuery = (r, o) => {
        t(r, o), n(r, o);
      })
    : (e.viewQuery = t);
}
function Py(e, t) {
  let n = e.contentQueries;
  n
    ? (e.contentQueries = (r, o, i) => {
        t(r, o, i), n(r, o, i);
      })
    : (e.contentQueries = t);
}
function ky(e, t) {
  let n = e.hostBindings;
  n
    ? (e.hostBindings = (r, o) => {
        t(r, o), n(r, o);
      })
    : (e.hostBindings = t);
}
function Ly(e) {
  let t = e.inputConfig,
    n = {};
  for (let r in t)
    if (t.hasOwnProperty(r)) {
      let o = t[r];
      Array.isArray(o) && o[3] && (n[r] = o[3]);
    }
  e.inputTransforms = n;
}
var ze = class {},
  Ui = class {};
var zi = class extends ze {
    constructor(t, n, r, o = !0) {
      super(),
        (this.ngModuleType = t),
        (this._parent = n),
        (this._bootstrapComponents = []),
        (this.destroyCbs = []),
        (this.componentFactoryResolver = new Rr(this));
      let i = fc(t);
      (this._bootstrapComponents = vl(i.bootstrap)),
        (this._r3Injector = el(
          t,
          n,
          [
            { provide: ze, useValue: this },
            { provide: jt, useValue: this.componentFactoryResolver },
            ...r,
          ],
          J(t),
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
  Gi = class extends Ui {
    constructor(t) {
      super(), (this.moduleType = t);
    }
    create(t) {
      return new zi(this.moduleType, t, []);
    }
  };
var kr = class extends ze {
  constructor(t) {
    super(),
      (this.componentFactoryResolver = new Rr(this)),
      (this.instance = null);
    let n = new sn(
      [
        ...t.providers,
        { provide: ze, useValue: this },
        { provide: jt, useValue: this.componentFactoryResolver },
      ],
      t.parent || hs(),
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
function jy(e, t, n = null) {
  return new kr({
    providers: e,
    parent: t,
    debugName: n,
    runEnvironmentInitializers: !0,
  }).injector;
}
function fd(e) {
  return By(e)
    ? Array.isArray(e) || (!(e instanceof Map) && Symbol.iterator in e)
    : !1;
}
function Vy(e, t) {
  if (Array.isArray(e)) for (let n = 0; n < e.length; n++) t(e[n]);
  else {
    let n = e[Symbol.iterator](),
      r;
    for (; !(r = n.next()).done; ) t(r.value);
  }
}
function By(e) {
  return e !== null && (typeof e == 'function' || typeof e == 'object');
}
function $y(e, t, n) {
  return (e[t] = n);
}
function ne(e, t, n) {
  let r = e[t];
  return Object.is(r, n) ? !1 : ((e[t] = n), !0);
}
function Hy(e, t, n, r) {
  let o = ne(e, t, n);
  return ne(e, t + 1, r) || o;
}
function Uy(e) {
  return (e.flags & 32) === 32;
}
function zy(e, t, n, r, o, i, s, a, u) {
  let c = t.consts,
    l = zt(t, e, 4, s || null, a || null);
  Bs(t, n, l, $e(c, u)), Jr(t, l);
  let d = (l.tView = Vs(
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
function Lr(e, t, n, r, o, i, s, a, u, c) {
  let l = n + B,
    d = t.firstCreatePass ? zy(l, t, e, r, o, i, s, a, u) : t.data[l];
  dt(d, !1);
  let h = Wy(t, e, d, n);
  Qr() && no(t, e, h, d), Ue(h, e);
  let f = jl(h, e, h, d);
  return (
    (e[l] = f),
    so(e, f),
    hy(f, d, e),
    qr(d) && Ls(t, e, d),
    u != null && js(e, d, c),
    d
  );
}
function Gy(e, t, n, r, o, i, s, a) {
  let u = I(),
    c = F(),
    l = $e(c.consts, i);
  return Lr(u, c, e, t, n, r, o, l, s, a), Gy;
}
var Wy = qy;
function qy(e, t, n, r) {
  return Kr(!0), t[R].createComment('');
}
function Zy(e, t, n, r) {
  let o = I(),
    i = We();
  if (ne(o, i, t)) {
    let s = F(),
      a = pn();
    bm(a, o, e, t, n, r);
  }
  return Zy;
}
function Yy(e, t, n, r) {
  return ne(e, We(), n) ? t + St(n) + r : se;
}
function Qy(e, t, n, r, o, i) {
  let s = Dp(),
    a = Hy(e, s, n, o);
  return Es(2), a ? t + St(n) + r + St(o) + i : se;
}
function ir(e, t) {
  return (e << 17) | (t << 2);
}
function lt(e) {
  return (e >> 17) & 32767;
}
function Ky(e) {
  return (e & 2) == 2;
}
function Jy(e, t) {
  return (e & 131071) | (t << 17);
}
function Wi(e) {
  return e | 2;
}
function Bt(e) {
  return (e & 131068) >> 2;
}
function Zo(e, t) {
  return (e & -131069) | (t << 2);
}
function Xy(e) {
  return (e & 1) === 1;
}
function qi(e) {
  return e | 1;
}
function ev(e, t, n, r, o, i) {
  let s = i ? t.classBindings : t.styleBindings,
    a = lt(s),
    u = Bt(s);
  e[r] = n;
  let c = !1,
    l;
  if (Array.isArray(n)) {
    let d = n;
    (l = d[1]), (l === null || hn(d, l) > 0) && (c = !0);
  } else l = n;
  if (o)
    if (u !== 0) {
      let h = lt(e[a + 1]);
      (e[r + 1] = ir(h, a)),
        h !== 0 && (e[h + 1] = Zo(e[h + 1], r)),
        (e[a + 1] = Jy(e[a + 1], r));
    } else
      (e[r + 1] = ir(a, 0)), a !== 0 && (e[a + 1] = Zo(e[a + 1], r)), (a = r);
  else
    (e[r + 1] = ir(u, 0)),
      a === 0 ? (a = r) : (e[u + 1] = Zo(e[u + 1], r)),
      (u = r);
  c && (e[r + 1] = Wi(e[r + 1])),
    Ru(e, l, r, !0),
    Ru(e, l, r, !1),
    tv(t, l, e, r, i),
    (s = ir(a, u)),
    i ? (t.classBindings = s) : (t.styleBindings = s);
}
function tv(e, t, n, r, o) {
  let i = o ? e.residualClasses : e.residualStyles;
  i != null &&
    typeof t == 'string' &&
    hn(i, t) >= 0 &&
    (n[r + 1] = qi(n[r + 1]));
}
function Ru(e, t, n, r) {
  let o = e[n + 1],
    i = t === null,
    s = r ? lt(o) : Bt(o),
    a = !1;
  for (; s !== 0 && (a === !1 || i); ) {
    let u = e[s],
      c = e[s + 1];
    nv(u, t) && ((a = !0), (e[s + 1] = r ? qi(c) : Wi(c))),
      (s = r ? lt(c) : Bt(c));
  }
  a && (e[n + 1] = r ? Wi(o) : qi(o));
}
function nv(e, t) {
  return e === null || t == null || (Array.isArray(e) ? e[1] : e) === t
    ? !0
    : Array.isArray(e) && typeof t == 'string'
      ? hn(e, t) >= 0
      : !1;
}
var de = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
function rv(e) {
  return e.substring(de.key, de.keyEnd);
}
function ov(e) {
  return iv(e), hd(e, pd(e, 0, de.textEnd));
}
function hd(e, t) {
  let n = de.textEnd;
  return n === t ? -1 : ((t = de.keyEnd = sv(e, (de.key = t), n)), pd(e, t, n));
}
function iv(e) {
  (de.key = 0),
    (de.keyEnd = 0),
    (de.value = 0),
    (de.valueEnd = 0),
    (de.textEnd = e.length);
}
function pd(e, t, n) {
  for (; t < n && e.charCodeAt(t) <= 32; ) t++;
  return t;
}
function sv(e, t, n) {
  for (; t < n && e.charCodeAt(t) > 32; ) t++;
  return t;
}
function av(e, t, n) {
  let r = I(),
    o = We();
  if (ne(r, o, t)) {
    let i = F(),
      s = pn();
    io(i, s, r, e, t, r[R], n, !1);
  }
  return av;
}
function Zi(e, t, n, r, o) {
  let i = t.inputs,
    s = o ? 'class' : 'style';
  $s(e, n, i[s], s, r);
}
function gd(e, t, n) {
  return md(e, t, n, !1), gd;
}
function uv(e, t) {
  return md(e, t, null, !0), uv;
}
function w0(e) {
  lv(mv, cv, e, !0);
}
function cv(e, t) {
  for (let n = ov(t); n >= 0; n = hd(t, n)) ls(e, rv(t), !0);
}
function md(e, t, n, r) {
  let o = I(),
    i = F(),
    s = Es(2);
  if ((i.firstUpdatePass && vd(i, e, s, r), t !== se && ne(o, s, t))) {
    let a = i.data[Te()];
    Dd(i, a, o, o[R], e, (o[s + 1] = vv(t, n)), r, s);
  }
}
function lv(e, t, n, r) {
  let o = F(),
    i = Es(2);
  o.firstUpdatePass && vd(o, null, i, r);
  let s = I();
  if (n !== se && ne(s, i, n)) {
    let a = o.data[Te()];
    if (Id(a, r) && !yd(o, i)) {
      let u = r ? a.classesWithoutHost : a.stylesWithoutHost;
      u !== null && (n = Xo(u, n || '')), Zi(o, a, s, n, r);
    } else yv(o, a, s, s[R], s[i + 1], (s[i + 1] = gv(e, t, n)), r, i);
  }
}
function yd(e, t) {
  return t >= e.expandoStartIndex;
}
function vd(e, t, n, r) {
  let o = e.data;
  if (o[n + 1] === null) {
    let i = o[Te()],
      s = yd(e, n);
    Id(i, r) && t === null && !s && (t = !1),
      (t = dv(o, i, t, r)),
      ev(o, i, t, n, s, r);
  }
}
function dv(e, t, n, r) {
  let o = ws(e),
    i = r ? t.residualClasses : t.residualStyles;
  if (o === null)
    (r ? t.classBindings : t.styleBindings) === 0 &&
      ((n = Yo(null, e, t, n, r)), (n = dn(n, t.attrs, r)), (i = null));
  else {
    let s = t.directiveStylingLast;
    if (s === -1 || e[s] !== o)
      if (((n = Yo(o, e, t, n, r)), i === null)) {
        let u = fv(e, t, r);
        u !== void 0 &&
          Array.isArray(u) &&
          ((u = Yo(null, e, t, u[1], r)),
          (u = dn(u, t.attrs, r)),
          hv(e, t, r, u));
      } else i = pv(e, t, r);
  }
  return (
    i !== void 0 && (r ? (t.residualClasses = i) : (t.residualStyles = i)), n
  );
}
function fv(e, t, n) {
  let r = n ? t.classBindings : t.styleBindings;
  if (Bt(r) !== 0) return e[lt(r)];
}
function hv(e, t, n, r) {
  let o = n ? t.classBindings : t.styleBindings;
  e[lt(o)] = r;
}
function pv(e, t, n) {
  let r,
    o = t.directiveEnd;
  for (let i = 1 + t.directiveStylingLast; i < o; i++) {
    let s = e[i].hostAttrs;
    r = dn(r, s, n);
  }
  return dn(r, t.attrs, n);
}
function Yo(e, t, n, r, o) {
  let i = null,
    s = n.directiveEnd,
    a = n.directiveStylingLast;
  for (
    a === -1 ? (a = n.directiveStart) : a++;
    a < s && ((i = t[a]), (r = dn(r, i.hostAttrs, o)), i !== e);

  )
    a++;
  return e !== null && (n.directiveStylingLast = a), r;
}
function dn(e, t, n) {
  let r = n ? 1 : 2,
    o = -1;
  if (t !== null)
    for (let i = 0; i < t.length; i++) {
      let s = t[i];
      typeof s == 'number'
        ? (o = s)
        : o === r &&
          (Array.isArray(e) || (e = e === void 0 ? [] : ['', e]),
          ls(e, s, n ? !0 : t[++i]));
    }
  return e === void 0 ? null : e;
}
function gv(e, t, n) {
  if (n == null || n === '') return q;
  let r = [],
    o = gn(n);
  if (Array.isArray(o)) for (let i = 0; i < o.length; i++) e(r, o[i], !0);
  else if (typeof o == 'object')
    for (let i in o) o.hasOwnProperty(i) && e(r, i, o[i]);
  else typeof o == 'string' && t(r, o);
  return r;
}
function mv(e, t, n) {
  let r = String(t);
  r !== '' && !r.includes(' ') && ls(e, r, n);
}
function yv(e, t, n, r, o, i, s, a) {
  o === se && (o = q);
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
      p !== null && Dd(e, t, n, r, p, g, s, a),
      (l = u < o.length ? o[u] : null),
      (d = c < i.length ? i[c] : null);
  }
}
function Dd(e, t, n, r, o, i, s, a) {
  if (!(t.type & 3)) return;
  let u = e.data,
    c = u[a + 1],
    l = Xy(c) ? Pu(u, t, n, o, Bt(c), s) : void 0;
  if (!jr(l)) {
    jr(i) || (Ky(c) && (i = Pu(u, null, n, o, a, s)));
    let d = Sc(Te(), n);
    tm(r, s, d, o, i);
  }
}
function Pu(e, t, n, r, o, i) {
  let s = t === null,
    a;
  for (; o > 0; ) {
    let u = e[o],
      c = Array.isArray(u),
      l = c ? u[1] : u,
      d = l === null,
      h = n[o + 1];
    h === se && (h = d ? q : void 0);
    let f = d ? Vo(h, r) : l === r ? h : void 0;
    if ((c && !jr(f) && (f = Vo(u, r)), jr(f) && ((a = f), s))) return a;
    let p = e[o + 1];
    o = s ? lt(p) : Bt(p);
  }
  if (t !== null) {
    let u = i ? t.residualClasses : t.residualStyles;
    u != null && (a = Vo(u, r));
  }
  return a;
}
function jr(e) {
  return e !== void 0;
}
function vv(e, t) {
  return (
    e == null ||
      e === '' ||
      (typeof t == 'string'
        ? (e = e + t)
        : typeof e == 'object' && (e = J(gn(e)))),
    e
  );
}
function Id(e, t) {
  return (e.flags & (t ? 8 : 16)) !== 0;
}
var Yi = class {
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
function Qo(e, t, n, r, o) {
  return e === n && Object.is(t, r) ? 1 : Object.is(o(e, t), o(n, r)) ? -1 : 0;
}
function Dv(e, t, n) {
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
        d = Qo(i, c, i, l, n);
      if (d !== 0) {
        d < 0 && e.updateValue(i, l), i++;
        continue;
      }
      let h = e.at(s),
        f = t[u],
        p = Qo(s, h, u, f, n);
      if (p !== 0) {
        p < 0 && e.updateValue(s, f), s--, u--;
        continue;
      }
      let g = n(i, c),
        T = n(s, h),
        C = n(i, l);
      if (Object.is(C, T)) {
        let j = n(u, f);
        Object.is(j, g)
          ? (e.swap(i, s), e.updateValue(s, f), u--, s--)
          : e.move(s, i),
          e.updateValue(i, l),
          i++;
        continue;
      }
      if (((r ??= new Vr()), (o ??= Lu(e, i, s, n)), Qi(e, r, i, C)))
        e.updateValue(i, l), i++, s++;
      else if (o.has(C)) r.set(g, e.detach(i)), s--;
      else {
        let j = e.create(i, t[i]);
        e.attach(i, j), i++, s++;
      }
    }
    for (; i <= u; ) ku(e, r, n, i, t[i]), i++;
  } else if (t != null) {
    let u = t[Symbol.iterator](),
      c = u.next();
    for (; !c.done && i <= s; ) {
      let l = e.at(i),
        d = c.value,
        h = Qo(i, l, i, d, n);
      if (h !== 0) h < 0 && e.updateValue(i, d), i++, (c = u.next());
      else {
        (r ??= new Vr()), (o ??= Lu(e, i, s, n));
        let f = n(i, d);
        if (Qi(e, r, i, f)) e.updateValue(i, d), i++, s++, (c = u.next());
        else if (!o.has(f))
          e.attach(i, e.create(i, d)), i++, s++, (c = u.next());
        else {
          let p = n(i, l);
          r.set(p, e.detach(i)), s--;
        }
      }
    }
    for (; !c.done; ) ku(e, r, n, e.length, c.value), (c = u.next());
  }
  for (; i <= s; ) e.destroy(e.detach(s--));
  r?.forEach((u) => {
    e.destroy(u);
  });
}
function Qi(e, t, n, r) {
  return t !== void 0 && t.has(r)
    ? (e.attach(n, t.get(r)), t.delete(r), !0)
    : !1;
}
function ku(e, t, n, r, o) {
  if (Qi(e, t, r, n(r, o))) e.updateValue(r, o);
  else {
    let i = e.create(r, o);
    e.attach(r, i);
  }
}
function Lu(e, t, n, r) {
  let o = new Set();
  for (let i = t; i <= n; i++) o.add(r(i, e.at(i)));
  return o;
}
var Vr = class {
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
function C0(e, t) {
  Ae('NgControlFlow');
  let n = I(),
    r = We(),
    o = n[r] !== se ? n[r] : -1,
    i = o !== -1 ? Br(n, B + o) : void 0,
    s = 0;
  if (ne(n, r, e)) {
    let a = b(null);
    try {
      if ((i !== void 0 && Wl(i, s), e !== -1)) {
        let u = B + e,
          c = Br(n, u),
          l = es(n[v], u),
          d = kt(c, l.tView.ssrId),
          h = yn(n, l, t, { dehydratedView: d });
        vn(c, h, s, Pt(l, d));
      }
    } finally {
      b(a);
    }
  } else if (i !== void 0) {
    let a = Gl(i, s);
    a !== void 0 && (a[$] = t);
  }
}
var Ki = class {
  constructor(t, n, r) {
    (this.lContainer = t), (this.$implicit = n), (this.$index = r);
  }
  get $count() {
    return this.lContainer.length - H;
  }
};
function b0(e, t) {
  return t;
}
var Ji = class {
  constructor(t, n, r) {
    (this.hasEmptyBlock = t), (this.trackByFn = n), (this.liveCollection = r);
  }
};
function _0(e, t, n, r, o, i, s, a, u, c, l, d, h) {
  Ae('NgControlFlow');
  let f = I(),
    p = F(),
    g = u !== void 0,
    T = I(),
    C = a ? s.bind(T[te][$]) : s,
    j = new Ji(g, C);
  (T[B + e] = j),
    Lr(f, p, e + 1, t, n, r, o, $e(p.consts, i)),
    g && Lr(f, p, e + 2, u, c, l, d, $e(p.consts, h));
}
var Xi = class extends Yi {
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
    let r = n[At];
    (this.needsIndexUpdate ||= t !== this.length),
      vn(this.lContainer, n, t, Pt(this.templateTNode, r));
  }
  detach(t) {
    return (
      (this.needsIndexUpdate ||= t !== this.length - 1), Iv(this.lContainer, t)
    );
  }
  create(t, n) {
    let r = kt(this.lContainer, this.templateTNode.tView.ssrId),
      o = yn(
        this.hostLView,
        this.templateTNode,
        new Ki(this.lContainer, n, t),
        { dehydratedView: r }
      );
    return this.operationsCounter?.recordCreate(), o;
  }
  destroy(t) {
    to(t[v], t), this.operationsCounter?.recordDestroy();
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
    return Ev(this.lContainer, t);
  }
};
function M0(e) {
  let t = b(null),
    n = Te();
  try {
    let r = I(),
      o = r[v],
      i = r[n],
      s = n + 1,
      a = Br(r, s);
    if (i.liveCollection === void 0) {
      let c = es(o, s);
      i.liveCollection = new Xi(a, r, c);
    } else i.liveCollection.reset();
    let u = i.liveCollection;
    if ((Dv(u, e, i.trackByFn), u.updateIndexes(), i.hasEmptyBlock)) {
      let c = We(),
        l = u.length === 0;
      if (ne(r, c, l)) {
        let d = n + 2,
          h = Br(r, d);
        if (l) {
          let f = es(o, d),
            p = kt(h, f.tView.ssrId),
            g = yn(r, f, void 0, { dehydratedView: p });
          vn(h, g, 0, Pt(f, p));
        } else Wl(h, 0);
      }
    }
  } finally {
    b(t);
  }
}
function Br(e, t) {
  return e[t];
}
function Iv(e, t) {
  return cn(e, t);
}
function Ev(e, t) {
  return Gl(e, t);
}
function es(e, t) {
  return ys(e, t);
}
function wv(e, t, n, r, o, i) {
  let s = t.consts,
    a = $e(s, o),
    u = zt(t, e, 2, r, a);
  return (
    Bs(t, n, u, $e(s, i)),
    u.attrs !== null && Fr(u, u.attrs, !1),
    u.mergedAttrs !== null && Fr(u, u.mergedAttrs, !0),
    t.queries !== null && t.queries.elementStart(t, u),
    u
  );
}
function Ed(e, t, n, r) {
  let o = I(),
    i = F(),
    s = B + e,
    a = o[R],
    u = i.firstCreatePass ? wv(s, i, o, t, n, r) : i.data[s],
    c = bv(i, o, u, a, t, e);
  o[s] = c;
  let l = qr(u);
  return (
    dt(u, !0),
    Nl(a, c, u),
    !Uy(u) && Qr() && no(i, o, c, u),
    dp() === 0 && Ue(c, o),
    fp(),
    l && (Ls(i, o, u), ks(i, u, o)),
    r !== null && js(o, u),
    Ed
  );
}
function wd() {
  let e = V();
  Ds() ? Is() : ((e = e.parent), dt(e, !1));
  let t = e;
  pp(t) && gp(), hp();
  let n = F();
  return (
    n.firstCreatePass && (Jr(n, e), gs(e) && n.queries.elementEnd(e)),
    t.classesWithoutHost != null &&
      Ap(t) &&
      Zi(n, t, I(), t.classesWithoutHost, !0),
    t.stylesWithoutHost != null &&
      Op(t) &&
      Zi(n, t, I(), t.stylesWithoutHost, !1),
    wd
  );
}
function Cv(e, t, n, r) {
  return Ed(e, t, n, r), wd(), Cv;
}
var bv = (e, t, n, r, o, i) => (Kr(!0), Il(r, o, xp()));
function _v(e, t, n, r, o) {
  let i = t.consts,
    s = $e(i, r),
    a = zt(t, e, 8, 'ng-container', s);
  s !== null && Fr(a, s, !0);
  let u = $e(i, o);
  return Bs(t, n, a, u), t.queries !== null && t.queries.elementStart(t, a), a;
}
function Cd(e, t, n) {
  let r = I(),
    o = F(),
    i = e + B,
    s = o.firstCreatePass ? _v(i, o, r, t, n) : o.data[i];
  dt(s, !0);
  let a = xv(o, r, s, e);
  return (
    (r[i] = a),
    Qr() && no(o, r, a, s),
    Ue(a, r),
    qr(s) && (Ls(o, r, s), ks(o, s, r)),
    n != null && js(r, s),
    Cd
  );
}
function bd() {
  let e = V(),
    t = F();
  return (
    Ds() ? Is() : ((e = e.parent), dt(e, !1)),
    t.firstCreatePass && (Jr(t, e), gs(e) && t.queries.elementEnd(e)),
    bd
  );
}
function Mv(e, t, n) {
  return Cd(e, t, n), bd(), Mv;
}
var xv = (e, t, n, r) => (Kr(!0), $g(t[R], ''));
function x0() {
  return I();
}
function Sv(e, t, n) {
  let r = I(),
    o = We();
  if (ne(r, o, t)) {
    let i = F(),
      s = pn();
    io(i, s, r, e, t, r[R], n, !0);
  }
  return Sv;
}
function Tv(e, t, n) {
  let r = I(),
    o = We();
  if (ne(r, o, t)) {
    let i = F(),
      s = pn(),
      a = ws(i.data),
      u = Hl(a, s, r);
    io(i, s, r, e, t, u, n, !0);
  }
  return Tv;
}
var $r = 'en-US';
var Nv = $r;
function Av(e) {
  typeof e == 'string' && (Nv = e.toLowerCase().replace(/_/g, '-'));
}
var Ov = (e, t, n) => {};
function Fv(e, t, n, r) {
  let o = I(),
    i = F(),
    s = V();
  return Zs(i, o, o[R], s, e, t, r), Fv;
}
function Rv(e, t) {
  let n = V(),
    r = I(),
    o = F(),
    i = ws(o.data),
    s = Hl(i, n, r);
  return Zs(o, r, s, n, e, t), Rv;
}
function Pv(e, t, n, r) {
  let o = e.cleanup;
  if (o != null)
    for (let i = 0; i < o.length - 1; i += 2) {
      let s = o[i];
      if (s === n && o[i + 1] === r) {
        let a = t[Dr],
          u = o[i + 2];
        return a.length > u ? a[u] : null;
      }
      typeof s == 'string' && (i += 2);
    }
  return null;
}
function Zs(e, t, n, r, o, i, s) {
  let a = qr(r),
    c = e.firstCreatePass && $l(e),
    l = t[$],
    d = Bl(t),
    h = !0;
  if (r.type & 3 || s) {
    let g = ie(r, t),
      T = s ? s(g) : g,
      C = d.length,
      j = s ? (Ee) => s(De(Ee[r.index])) : r.index,
      Y = null;
    if ((!s && a && (Y = Pv(e, t, o, r.index)), Y !== null)) {
      let Ee = Y.__ngLastListenerFn__ || Y;
      (Ee.__ngNextListenerFn__ = i), (Y.__ngLastListenerFn__ = i), (h = !1);
    } else {
      (i = Vu(r, t, l, i)), Ov(g, o, i);
      let Ee = n.listen(T, o, i);
      d.push(i, Ee), c && c.push(o, j, C, C + 1);
    }
  } else i = Vu(r, t, l, i);
  let f = r.outputs,
    p;
  if (h && f !== null && (p = f[o])) {
    let g = p.length;
    if (g)
      for (let T = 0; T < g; T += 2) {
        let C = p[T],
          j = p[T + 1],
          pt = t[C][j].subscribe(i),
          ae = d.length;
        d.push(i, pt), c && c.push(o, r.index, ae, -(ae + 1));
      }
  }
}
function ju(e, t, n, r) {
  let o = b(null);
  try {
    return me(6, t, n), n(r) !== !1;
  } catch (i) {
    return Ul(e, i), !1;
  } finally {
    me(7, t, n), b(o);
  }
}
function Vu(e, t, n, r) {
  return function o(i) {
    if (i === Function) return r;
    let s = e.componentOffset > -1 ? Ge(e.index, t) : t;
    Us(s, 5);
    let a = ju(t, n, r, i),
      u = o.__ngNextListenerFn__;
    for (; u; ) (a = ju(t, n, u, i) && a), (u = u.__ngNextListenerFn__);
    return a;
  };
}
function S0(e = 1) {
  return _p(e);
}
function kv(e, t) {
  let n = null,
    r = Ah(e);
  for (let o = 0; o < t.length; o++) {
    let i = t[o];
    if (i === '*') {
      n = o;
      continue;
    }
    if (r === null ? sc(e, i, !0) : Rh(r, i)) return o;
  }
  return n;
}
function T0(e) {
  let t = I()[te][ee];
  if (!t.projection) {
    let n = e ? e.length : 1,
      r = (t.projection = wh(n, null)),
      o = r.slice(),
      i = t.child;
    for (; i !== null; ) {
      if (i.type !== 128) {
        let s = e ? kv(i, e) : 0;
        s !== null &&
          (o[s] ? (o[s].projectionNext = i) : (r[s] = i), (o[s] = i));
      }
      i = i.next;
    }
  }
}
function N0(e, t = 0, n, r, o, i) {
  let s = I(),
    a = F(),
    u = r ? e + 1 : null;
  u !== null && Lr(s, a, u, r, o, i, null, n);
  let c = zt(a, B + e, 16, null, n || null);
  c.projection === null && (c.projection = t), Is();
  let d = !s[At] || Pc();
  s[te][ee].projection[c.projection] === null && u !== null
    ? Lv(s, a, u)
    : d && (c.flags & 32) !== 32 && Xg(a, s, c);
}
function Lv(e, t, n) {
  let r = B + n,
    o = t.data[r],
    i = e[r],
    s = kt(i, o.tView.ssrId),
    a = yn(e, o, void 0, { dehydratedView: s });
  vn(i, a, 0, Pt(o, s));
}
function A0(e, t, n, r) {
  ad(e, t, n, r);
}
function O0(e, t, n) {
  Dy(e, t, n);
}
function F0(e) {
  let t = I(),
    n = F(),
    r = Cs();
  Yr(r + 1);
  let o = qs(n, r);
  if (e.dirty && ap(t) === ((o.metadata.flags & 2) === 2)) {
    if (o.matches === null) e.reset([]);
    else {
      let i = cd(t, r);
      e.reset(i, rl), e.notifyOnChanges();
    }
    return !0;
  }
  return !1;
}
function R0() {
  return Ws(I(), Cs());
}
function P0(e, t, n, r, o) {
  xy(t, ad(e, n, r, o));
}
function k0(e = 1) {
  Yr(Cs() + e);
}
function jv(e, t, n, r) {
  n >= e.data.length && ((e.data[n] = null), (e.blueprint[n] = null)),
    (t[n] = r);
}
function L0(e) {
  let t = yp();
  return Tc(t, B + e);
}
function j0(e, t = '') {
  let n = I(),
    r = F(),
    o = e + B,
    i = r.firstCreatePass ? zt(r, o, 1, t, null) : r.data[o],
    s = Vv(r, n, i, t, e);
  (n[o] = s), Qr() && no(r, n, s, i), dt(i, !1);
}
var Vv = (e, t, n, r, o) => (Kr(!0), Vg(t[R], r));
function Bv(e) {
  return _d('', e, ''), Bv;
}
function _d(e, t, n) {
  let r = I(),
    o = Yy(r, e, t, n);
  return o !== se && zl(r, Te(), o), _d;
}
function $v(e, t, n, r, o) {
  let i = I(),
    s = Qy(i, e, t, n, r, o);
  return s !== se && zl(i, Te(), s), $v;
}
function Hv(e, t, n) {
  ld(t) && (t = t());
  let r = I(),
    o = We();
  if (ne(r, o, t)) {
    let i = F(),
      s = pn();
    io(i, s, r, e, t, r[R], n, !1);
  }
  return Hv;
}
function V0(e, t) {
  let n = ld(e);
  return n && e.set(t), n;
}
function Uv(e, t) {
  let n = I(),
    r = F(),
    o = V();
  return Zs(r, n, n[R], o, e, t), Uv;
}
function zv(e, t, n) {
  let r = F();
  if (r.firstCreatePass) {
    let o = Me(e);
    ts(n, r.data, r.blueprint, o, !0), ts(t, r.data, r.blueprint, o, !1);
  }
}
function ts(e, t, n, r, o) {
  if (((e = W(e)), Array.isArray(e)))
    for (let i = 0; i < e.length; i++) ts(e[i], t, n, r, o);
  else {
    let i = F(),
      s = I(),
      a = V(),
      u = Nt(e) ? e : W(e.provide),
      c = Dc(e),
      l = a.providerIndexes & 1048575,
      d = a.directiveStart,
      h = a.providerIndexes >> 20;
    if (Nt(e) || !e.multi) {
      let f = new at(c, o, ft),
        p = Jo(u, t, o ? l : l + h, d);
      p === -1
        ? (hi(_r(a, s), i, u),
          Ko(i, e, t.length),
          t.push(u),
          a.directiveStart++,
          a.directiveEnd++,
          o && (a.providerIndexes += 1048576),
          n.push(f),
          s.push(f))
        : ((n[p] = f), (s[p] = f));
    } else {
      let f = Jo(u, t, l + h, d),
        p = Jo(u, t, l, l + h),
        g = f >= 0 && n[f],
        T = p >= 0 && n[p];
      if ((o && !T) || (!o && !g)) {
        hi(_r(a, s), i, u);
        let C = qv(o ? Wv : Gv, n.length, o, r, c);
        !o && T && (n[p].providerFactory = C),
          Ko(i, e, t.length, 0),
          t.push(u),
          a.directiveStart++,
          a.directiveEnd++,
          o && (a.providerIndexes += 1048576),
          n.push(C),
          s.push(C);
      } else {
        let C = Md(n[o ? p : f], c, !o && r);
        Ko(i, e, f > -1 ? f : p, C);
      }
      !o && r && T && n[p].componentProviders++;
    }
  }
}
function Ko(e, t, n, r) {
  let o = Nt(t),
    i = qh(t);
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
function Md(e, t, n) {
  return n && e.componentProviders++, e.multi.push(t) - 1;
}
function Jo(e, t, n, r) {
  for (let o = n; o < r; o++) if (t[o] === e) return o;
  return -1;
}
function Gv(e, t, n, r) {
  return ns(this.multi, []);
}
function Wv(e, t, n, r) {
  let o = this.multi,
    i;
  if (this.providerFactory) {
    let s = this.providerFactory.componentProviders,
      a = ut(n, n[v], this.providerFactory.index, r);
    (i = a.slice(0, s)), ns(o, i);
    for (let u = s; u < a.length; u++) i.push(a[u]);
  } else (i = []), ns(o, i);
  return i;
}
function ns(e, t) {
  for (let n = 0; n < e.length; n++) {
    let r = e[n];
    t.push(r());
  }
  return t;
}
function qv(e, t, n, r, o) {
  let i = new at(e, n, ft);
  return (
    (i.multi = []),
    (i.index = t),
    (i.componentProviders = 0),
    Md(i, o, r && !n),
    i
  );
}
function B0(e, t = []) {
  return (n) => {
    n.providersResolver = (r, o) => zv(r, o ? o(e) : e, t);
  };
}
var Zv = (() => {
  let t = class t {
    constructor(r) {
      (this._injector = r), (this.cachedInjectors = new Map());
    }
    getOrCreateStandaloneInjector(r) {
      if (!r.standalone) return null;
      if (!this.cachedInjectors.has(r)) {
        let o = gc(!1, r.type),
          i =
            o.length > 0
              ? jy([o], this._injector, `Standalone[${r.type.name}]`)
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
    factory: () => new t(U(Be)),
  });
  let e = t;
  return e;
})();
function $0(e) {
  Ae('NgStandalone'),
    (e.getStandaloneInjector = (t) =>
      t.get(Zv).getOrCreateStandaloneInjector(e));
}
function Yv(e, t) {
  let n = e[t];
  return n === se ? void 0 : n;
}
function Qv(e, t, n, r, o, i) {
  let s = t + n;
  return ne(e, s, o) ? $y(e, s + 1, i ? r.call(i, o) : r(o)) : Yv(e, s + 1);
}
function H0(e, t) {
  let n = F(),
    r,
    o = e + B;
  n.firstCreatePass
    ? ((r = Kv(t, n.pipeRegistry)),
      (n.data[o] = r),
      r.onDestroy && (n.destroyHooks ??= []).push(o, r.onDestroy))
    : (r = n.data[o]);
  let i = r.factory || (r.factory = nt(r.type, !0)),
    s,
    a = K(ft);
  try {
    let u = br(!1),
      c = i();
    return br(u), jv(n, I(), o, c), c;
  } finally {
    K(a);
  }
}
function Kv(e, t) {
  if (t)
    for (let n = t.length - 1; n >= 0; n--) {
      let r = t[n];
      if (e === r.name) return r;
    }
}
function U0(e, t, n) {
  let r = e + B,
    o = I(),
    i = Tc(o, r);
  return Jv(o, r) ? Qv(o, vp(), t, i.transform, n, i) : i.transform(n);
}
function Jv(e, t) {
  return e[v].data[t].pure;
}
function z0(e, t) {
  return ao(e, t);
}
var G0 = (() => {
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
var Xv = new A('');
function uo(e) {
  return !!e && typeof e.then == 'function';
}
function Ys(e) {
  return !!e && typeof e.subscribe == 'function';
}
var eD = new A(''),
  xd = (() => {
    let t = class t {
      constructor() {
        (this.initialized = !1),
          (this.done = !1),
          (this.donePromise = new Promise((r, o) => {
            (this.resolve = r), (this.reject = o);
          })),
          (this.appInits = M(eD, { optional: !0 }) ?? []);
      }
      runInitializers() {
        if (this.initialized) return;
        let r = [];
        for (let i of this.appInits) {
          let s = i();
          if (uo(s)) r.push(s);
          else if (Ys(s)) {
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
  tD = new A('');
function nD() {
  Ia(() => {
    throw new S(600, !1);
  });
}
function rD(e) {
  return e.isBoundToModule;
}
var oD = 10;
function iD(e, t, n) {
  try {
    let r = n();
    return uo(r)
      ? r.catch((o) => {
          throw (t.runOutsideAngular(() => e.handleError(o)), o);
        })
      : r;
  } catch (r) {
    throw (t.runOutsideAngular(() => e.handleError(r)), r);
  }
}
var co = (() => {
  let t = class t {
    constructor() {
      (this._bootstrapListeners = []),
        (this._runningTick = !1),
        (this._destroyed = !1),
        (this._destroyListeners = []),
        (this._views = []),
        (this.internalErrorHandler = M(Jp)),
        (this.afterRenderEffectManager = M(Gs)),
        (this.zonelessEnabled = M(zs)),
        (this.externalTestViews = new Set()),
        (this.beforeRender = new re()),
        (this.afterTick = new re()),
        (this.componentTypes = []),
        (this.components = []),
        (this.isStable = M(Xr).hasPendingTasks.pipe(Ce((r) => !r))),
        (this._injector = M(Be));
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
      let i = r instanceof Ar;
      if (!this._injector.get(xd).done) {
        let f = !i && Bh(r),
          p = !1;
        throw new S(405, p);
      }
      let a;
      i ? (a = r) : (a = this._injector.get(jt).resolveComponentFactory(r)),
        this.componentTypes.push(a.componentType);
      let u = rD(a) ? void 0 : this._injector.get(ze),
        c = o || a.selector,
        l = a.create(He.NULL, [], c, u),
        d = l.location.nativeElement,
        h = l.injector.get(Xv, null);
      return (
        h?.registerApplication(d),
        l.onDestroy(() => {
          this.detachView(l.hostView),
            dr(this.components, l),
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
      if (this._runningTick) throw new S(101, !1);
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
        (o = this._injector.get(Or, null, { optional: !0 }));
      let i = 0,
        s = this.afterRenderEffectManager;
      for (; i < oD; ) {
        let a = i === 0;
        if (r || !a) {
          this.beforeRender.next(a);
          for (let { _lView: u, notifyErrorHandler: c } of this._views)
            sD(u, c, a, this.zonelessEnabled);
        } else o?.begin?.(), o?.end?.();
        if (
          (i++,
          s.executeInternalCallbacks(),
          !this.allViews.some(({ _lView: u }) => un(u)) &&
            (s.execute(), !this.allViews.some(({ _lView: u }) => un(u))))
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
      dr(this._views, o), o.detachFromAppRef();
    }
    _loadComponent(r) {
      this.attachView(r.hostView), this.tick(), this.components.push(r);
      let o = this._injector.get(tD, []);
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
        this._destroyListeners.push(r), () => dr(this._destroyListeners, r)
      );
    }
    destroy() {
      if (this._destroyed) throw new S(406, !1);
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
function dr(e, t) {
  let n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
function sD(e, t, n, r) {
  if (!n && !un(e)) return;
  Yl(e, t, n && !r ? 0 : 1);
}
var rs = class {
    constructor(t, n) {
      (this.ngModuleFactory = t), (this.componentFactories = n);
    }
  },
  W0 = (() => {
    let t = class t {
      compileModuleSync(r) {
        return new Gi(r);
      }
      compileModuleAsync(r) {
        return Promise.resolve(this.compileModuleSync(r));
      }
      compileModuleAndAllComponentsSync(r) {
        let o = this.compileModuleSync(r),
          i = fc(r),
          s = vl(i.declarations).reduce((a, u) => {
            let c = Ve(u);
            return c && a.push(new Vt(c)), a;
          }, []);
        return new rs(o, s);
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
var aD = (() => {
    let t = class t {
      constructor() {
        (this.zone = M(X)),
          (this.changeDetectionScheduler = M(Lt)),
          (this.applicationRef = M(co));
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
  uD = new A('', { factory: () => !1 });
function Sd({ ngZoneFactory: e, ignoreChangesOutsideZone: t }) {
  return (
    (e ??= () => new X(Td())),
    [
      { provide: X, useFactory: e },
      {
        provide: yr,
        multi: !0,
        useFactory: () => {
          let n = M(aD, { optional: !0 });
          return () => n.initialize();
        },
      },
      {
        provide: yr,
        multi: !0,
        useFactory: () => {
          let n = M(cD);
          return () => {
            n.initialize();
          };
        },
      },
      t === !0 ? { provide: Xl, useValue: !0 } : [],
    ]
  );
}
function q0(e) {
  let t = e?.ignoreChangesOutsideZone,
    n = Sd({
      ngZoneFactory: () => {
        let r = Td(e);
        return (
          r.shouldCoalesceEventChangeDetection && Ae('NgZone_CoalesceEvent'),
          new X(r)
        );
      },
      ignoreChangesOutsideZone: t,
    });
  return Hh([{ provide: uD, useValue: !0 }, { provide: zs, useValue: !1 }, n]);
}
function Td(e) {
  return {
    enableLongStackTrace: !1,
    shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
    shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
  };
}
var cD = (() => {
  let t = class t {
    constructor() {
      (this.subscription = new k()),
        (this.initialized = !1),
        (this.zone = M(X)),
        (this.pendingTasks = M(Xr));
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
              X.assertNotInAngularZone(),
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
            X.assertInAngularZone(), (r ??= this.pendingTasks.add());
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
var lD = (() => {
  let t = class t {
    constructor() {
      (this.appRef = M(co)),
        (this.taskService = M(Xr)),
        (this.ngZone = M(X)),
        (this.zonelessEnabled = M(zs)),
        (this.disableScheduling = M(Xl, { optional: !0 }) ?? !1),
        (this.zoneIsDefined = typeof Zone < 'u' && !!Zone.root.run),
        (this.schedulerTickApplyArgs = [{ data: { __scheduler_tick__: !0 } }]),
        (this.subscriptions = new k()),
        (this.angularZoneId = this.zoneIsDefined
          ? this.ngZone._inner?.get(xr)
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
          (this.ngZone instanceof vi || !this.zoneIsDefined));
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
      let o = this.useMicrotaskScheduler ? yu : tl;
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
          Zone.current.get(xr + this.angularZoneId))
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
        yu(() => {
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
function dD() {
  return (typeof $localize < 'u' && $localize.locale) || $r;
}
var Qs = new A('', {
  providedIn: 'root',
  factory: () => M(Qs, _.Optional | _.SkipSelf) || dD(),
});
var Nd = new A('');
function sr(e) {
  return !!e.platformInjector;
}
function fD(e) {
  let t = sr(e) ? e.r3Injector : e.moduleRef.injector,
    n = t.get(X);
  return n.run(() => {
    sr(e)
      ? e.r3Injector.resolveInjectorInitializers()
      : e.moduleRef.resolveInjectorInitializers();
    let r = t.get(Rt, null),
      o;
    if (
      (n.runOutsideAngular(() => {
        o = n.onError.subscribe({
          next: (i) => {
            r.handleError(i);
          },
        });
      }),
      sr(e))
    ) {
      let i = () => t.destroy(),
        s = e.platformInjector.get(Nd);
      s.add(i),
        t.onDestroy(() => {
          o.unsubscribe(), s.delete(i);
        });
    } else
      e.moduleRef.onDestroy(() => {
        dr(e.allPlatformModules, e.moduleRef), o.unsubscribe();
      });
    return iD(r, n, () => {
      let i = t.get(xd);
      return (
        i.runInitializers(),
        i.donePromise.then(() => {
          let s = t.get(Qs, $r);
          if ((Av(s || $r), sr(e))) {
            let a = t.get(co);
            return (
              e.rootComponent !== void 0 && a.bootstrap(e.rootComponent), a
            );
          } else return hD(e.moduleRef, e.allPlatformModules), e.moduleRef;
        })
      );
    });
  });
}
function hD(e, t) {
  let n = e.injector.get(co);
  if (e._bootstrapComponents.length > 0)
    e._bootstrapComponents.forEach((r) => n.bootstrap(r));
  else if (e.instance.ngDoBootstrap) e.instance.ngDoBootstrap(n);
  else throw new S(-403, !1);
  t.push(e);
}
var fr = null;
function pD(e = [], t) {
  return He.create({
    name: t,
    providers: [
      { provide: vc, useValue: 'platform' },
      { provide: Nd, useValue: new Set([() => (fr = null)]) },
      ...e,
    ],
  });
}
function gD(e = []) {
  if (fr) return fr;
  let t = pD(e);
  return (fr = t), nD(), mD(t), t;
}
function mD(e) {
  e.get(ag, null)?.forEach((n) => n());
}
var Ks = (() => {
  let t = class t {};
  t.__NG_ELEMENT_ID__ = yD;
  let e = t;
  return e;
})();
function yD(e) {
  return vD(V(), I(), (e & 16) === 16);
}
function vD(e, t, n) {
  if (Wr(e) && !n) {
    let r = Ge(e.index, t);
    return new ct(r, r);
  } else if (e.type & 175) {
    let r = t[te];
    return new ct(r, t);
  }
  return null;
}
var os = class {
    constructor() {}
    supports(t) {
      return fd(t);
    }
    create(t) {
      return new is(t);
    }
  },
  DD = (e, t) => t,
  is = class {
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
        (this._trackByFn = t || DD);
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
        let s = !r || (n && n.currentIndex < Bu(r, o, i)) ? n : r,
          a = Bu(s, o, i),
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
      if ((t == null && (t = []), !fd(t))) throw new S(900, !1);
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
          Vy(t, (a) => {
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
              : (t = this._addAfter(new ss(n, r), i, o))),
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
        this._linkedRecords === null && (this._linkedRecords = new Hr()),
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
        this._unlinkedRecords === null && (this._unlinkedRecords = new Hr()),
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
  ss = class {
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
  as = class {
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
  Hr = class {
    constructor() {
      this.map = new Map();
    }
    put(t) {
      let n = t.trackById,
        r = this.map.get(n);
      r || ((r = new as()), this.map.set(n, r)), r.add(t);
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
function Bu(e, t, n) {
  let r = e.previousIndex;
  if (r === null) return r;
  let o = 0;
  return n && r < n.length && (o = n[r]), r + t + o;
}
function $u() {
  return new Ad([new os()]);
}
var Ad = (() => {
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
        useFactory: (o) => t.create(r, o || $u()),
        deps: [[t, new Dh(), new vh()]],
      };
    }
    find(r) {
      let o = this.factories.find((i) => i.supports(r));
      if (o != null) return o;
      throw new S(901, !1);
    }
  };
  t.ɵprov = P({ token: t, providedIn: 'root', factory: $u });
  let e = t;
  return e;
})();
function Z0(e) {
  try {
    let { rootComponent: t, appProviders: n, platformProviders: r } = e,
      o = gD(r),
      i = [Sd({}), { provide: Lt, useExisting: lD }, ...(n || [])],
      s = new kr({
        providers: i,
        parent: o,
        debugName: '',
        runEnvironmentInitializers: !1,
      });
    return fD({
      r3Injector: s.injector,
      platformInjector: o,
      rootComponent: t,
    });
  } catch (t) {
    return Promise.reject(t);
  }
}
var Y0 = new A('');
function ID(e) {
  return typeof e == 'boolean' ? e : e != null && e !== 'false';
}
function ED(e, t = NaN) {
  return !isNaN(parseFloat(e)) && !isNaN(Number(e)) ? Number(e) : t;
}
function Q0(e, t) {
  Ae('NgSignals');
  let n = Eo(e);
  return t?.equal && (n[ue].equal = t.equal), n;
}
function Js(e) {
  let t = b(null);
  try {
    return e();
  } finally {
    b(t);
  }
}
function K0(e) {
  let t = Ve(e);
  if (!t) return null;
  let n = new Vt(t);
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
var kd = null;
function ea() {
  return kd;
}
function wx(e) {
  kd ??= e;
}
var Od = class {};
var ia = new A(''),
  sa = (() => {
    let t = class t {
      historyGo(r) {
        throw new Error('');
      }
    };
    (t.ɵfac = function (o) {
      return new (o || t)();
    }),
      (t.ɵprov = P({ token: t, factory: () => M(CD), providedIn: 'platform' }));
    let e = t;
    return e;
  })(),
  Cx = new A(''),
  CD = (() => {
    let t = class t extends sa {
      constructor() {
        super(),
          (this._doc = M(ia)),
          (this._location = window.location),
          (this._history = window.history);
      }
      getBaseHrefFromDOM() {
        return ea().getBaseHref(this._doc);
      }
      onPopState(r) {
        let o = ea().getGlobalEventTarget(this._doc, 'window');
        return (
          o.addEventListener('popstate', r, !1),
          () => o.removeEventListener('popstate', r)
        );
      }
      onHashChange(r) {
        let o = ea().getGlobalEventTarget(this._doc, 'window');
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
function aa(e, t) {
  if (e.length == 0) return t;
  if (t.length == 0) return e;
  let n = 0;
  return (
    e.endsWith('/') && n++,
    t.startsWith('/') && n++,
    n == 2 ? e + t.substring(1) : n == 1 ? e + t : e + '/' + t
  );
}
function Fd(e) {
  let t = e.match(/#|\?|$/),
    n = (t && t.index) || e.length,
    r = n - (e[n - 1] === '/' ? 1 : 0);
  return e.slice(0, r) + e.slice(n);
}
function Oe(e) {
  return e && e[0] !== '?' ? '?' + e : e;
}
var lo = (() => {
    let t = class t {
      historyGo(r) {
        throw new Error('');
      }
    };
    (t.ɵfac = function (o) {
      return new (o || t)();
    }),
      (t.ɵprov = P({ token: t, factory: () => M(bD), providedIn: 'root' }));
    let e = t;
    return e;
  })(),
  Ld = new A(''),
  bD = (() => {
    let t = class t extends lo {
      constructor(r, o) {
        super(),
          (this._platformLocation = r),
          (this._removeListenerFns = []),
          (this._baseHref =
            o ??
            this._platformLocation.getBaseHrefFromDOM() ??
            M(ia).location?.origin ??
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
        return aa(this._baseHref, r);
      }
      path(r = !1) {
        let o =
            this._platformLocation.pathname + Oe(this._platformLocation.search),
          i = this._platformLocation.hash;
        return i && r ? `${o}${i}` : o;
      }
      pushState(r, o, i, s) {
        let a = this.prepareExternalUrl(i + Oe(s));
        this._platformLocation.pushState(r, o, a);
      }
      replaceState(r, o, i, s) {
        let a = this.prepareExternalUrl(i + Oe(s));
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
      return new (o || t)(U(sa), U(Ld, 8));
    }),
      (t.ɵprov = P({ token: t, factory: t.ɵfac, providedIn: 'root' }));
    let e = t;
    return e;
  })(),
  bx = (() => {
    let t = class t extends lo {
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
        let o = aa(this._baseHref, r);
        return o.length > 0 ? '#' + o : o;
      }
      pushState(r, o, i, s) {
        let a = this.prepareExternalUrl(i + Oe(s));
        a.length == 0 && (a = this._platformLocation.pathname),
          this._platformLocation.pushState(r, o, a);
      }
      replaceState(r, o, i, s) {
        let a = this.prepareExternalUrl(i + Oe(s));
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
      return new (o || t)(U(sa), U(Ld, 8));
    }),
      (t.ɵprov = P({ token: t, factory: t.ɵfac }));
    let e = t;
    return e;
  })(),
  _D = (() => {
    let t = class t {
      constructor(r) {
        (this._subject = new fe()),
          (this._urlChangeListeners = []),
          (this._urlChangeSubscription = null),
          (this._locationStrategy = r);
        let o = this._locationStrategy.getBaseHref();
        (this._basePath = SD(Fd(Rd(o)))),
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
        return this.path() == this.normalize(r + Oe(o));
      }
      normalize(r) {
        return t.stripTrailingSlash(xD(this._basePath, Rd(r)));
      }
      prepareExternalUrl(r) {
        return (
          r && r[0] !== '/' && (r = '/' + r),
          this._locationStrategy.prepareExternalUrl(r)
        );
      }
      go(r, o = '', i = null) {
        this._locationStrategy.pushState(i, '', r, o),
          this._notifyUrlChangeListeners(this.prepareExternalUrl(r + Oe(o)), i);
      }
      replaceState(r, o = '', i = null) {
        this._locationStrategy.replaceState(i, '', r, o),
          this._notifyUrlChangeListeners(this.prepareExternalUrl(r + Oe(o)), i);
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
    (t.normalizeQueryParams = Oe),
      (t.joinWithSlash = aa),
      (t.stripTrailingSlash = Fd),
      (t.ɵfac = function (o) {
        return new (o || t)(U(lo));
      }),
      (t.ɵprov = P({ token: t, factory: () => MD(), providedIn: 'root' }));
    let e = t;
    return e;
  })();
function MD() {
  return new _D(U(lo));
}
function xD(e, t) {
  if (!e || !t.startsWith(e)) return t;
  let n = t.substring(e.length);
  return n === '' || ['/', ';', '?', '#'].includes(n[0]) ? n : t;
}
function Rd(e) {
  return e.replace(/\/index.html$/, '');
}
function SD(e) {
  if (new RegExp('^(https?:)?//').test(e)) {
    let [, n] = e.split(/\/\/[^\/]+/);
    return n;
  }
  return e;
}
function _x(e, t) {
  t = encodeURIComponent(t);
  for (let n of e.split(';')) {
    let r = n.indexOf('='),
      [o, i] = r == -1 ? [n, ''] : [n.slice(0, r), n.slice(r + 1)];
    if (o.trim() === t) return decodeURIComponent(i);
  }
  return null;
}
var Mx = (() => {
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
    return new (o || t)(ft(Dn));
  }),
    (t.ɵdir = uc({
      type: t,
      selectors: [['', 'ngTemplateOutlet', '']],
      inputs: {
        ngTemplateOutletContext: 'ngTemplateOutletContext',
        ngTemplateOutlet: 'ngTemplateOutlet',
        ngTemplateOutletInjector: 'ngTemplateOutletInjector',
      },
      standalone: !0,
      features: [ms],
    }));
  let e = t;
  return e;
})();
function TD(e, t) {
  return new S(2100, !1);
}
var ta = class {
    createSubscription(t, n) {
      return Js(() =>
        t.subscribe({
          next: n,
          error: (r) => {
            throw r;
          },
        })
      );
    }
    dispose(t) {
      Js(() => t.unsubscribe());
    }
  },
  na = class {
    createSubscription(t, n) {
      return t.then(n, (r) => {
        throw r;
      });
    }
    dispose(t) {}
  },
  ND = new na(),
  AD = new ta(),
  xx = (() => {
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
        if (uo(r)) return ND;
        if (Ys(r)) return AD;
        throw TD(t, r);
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
      return new (o || t)(ft(Ks, 16));
    }),
      (t.ɵpipe = cc({ name: 'async', type: t, pure: !1, standalone: !0 }));
    let e = t;
    return e;
  })();
var Sx = (() => {
    let t = class t {};
    (t.ɵfac = function (o) {
      return new (o || t)();
    }),
      (t.ɵmod = ac({ type: t })),
      (t.ɵinj = qu({}));
    let e = t;
    return e;
  })(),
  OD = 'browser',
  FD = 'server';
function RD(e) {
  return e === OD;
}
function Tx(e) {
  return e === FD;
}
var Nx = (() => {
    let t = class t {};
    t.ɵprov = P({
      token: t,
      providedIn: 'root',
      factory: () => (RD(M(Ns)) ? new ra(M(ia), window) : new oa()),
    });
    let e = t;
    return e;
  })(),
  ra = class {
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
      let n = PD(this.document, t);
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
function PD(e, t) {
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
var oa = class {
    setOffset(t) {}
    getScrollPosition() {
      return [0, 0];
    }
    scrollToPosition(t) {}
    scrollToAnchor(t) {}
    setHistoryScrollRestoration(t) {}
  },
  Pd = class {};
var ht = (function (e) {
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
  })(ht || {}),
  Fx = '*';
function Rx(e, t) {
  return { type: ht.Trigger, name: e, definitions: t, options: {} };
}
function Px(e, t = null) {
  return { type: ht.Animate, styles: t, timings: e };
}
function kx(e, t = null) {
  return { type: ht.Sequence, steps: e, options: t };
}
function Lx(e) {
  return { type: ht.Style, styles: e, offset: null };
}
function jx(e, t, n) {
  return { type: ht.State, name: e, styles: t, options: n };
}
function Vx(e, t, n = null) {
  return { type: ht.Transition, expr: e, animation: t, options: n };
}
var jd = class {
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
  Vd = class {
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
  Bx = '!';
export {
  Fe as a,
  Re as b,
  kD as c,
  LD as d,
  jD as e,
  VD as f,
  Yd as g,
  k as h,
  sf as i,
  x as j,
  Ao as k,
  Oo as l,
  re as m,
  Zt as n,
  Qe as o,
  ge as p,
  mf as q,
  yf as r,
  vf as s,
  Je as t,
  Ce as u,
  Mf as v,
  be as w,
  Jt as x,
  Kn as y,
  Sf as z,
  Tf as A,
  Ro as B,
  kf as C,
  Xe as D,
  Lf as E,
  Ka as F,
  jf as G,
  Vf as H,
  Ja as I,
  Xt as J,
  Po as K,
  Bf as L,
  $f as M,
  zf as N,
  Xa as O,
  ko as P,
  Gf as Q,
  Wf as R,
  jo as S,
  qf as T,
  Zf as U,
  eu as V,
  Yf as W,
  Qf as X,
  Kf as Y,
  S as Z,
  Gu as _,
  P as $,
  qu as aa,
  JM as ba,
  A as ca,
  _ as da,
  U as ea,
  M as fa,
  vh as ga,
  Dh as ha,
  rn as ia,
  XM as ja,
  ac as ka,
  uc as la,
  Hh as ma,
  vc as na,
  Be as oa,
  ep as pa,
  Ec as qa,
  ms as ra,
  e0 as sa,
  t0 as ta,
  n0 as ua,
  r0 as va,
  o0 as wa,
  Hp as xa,
  He as ya,
  xs as za,
  Xr as Aa,
  fe as Ba,
  X as Ca,
  Rt as Da,
  Ut as Ea,
  Di as Fa,
  i0 as Ga,
  s0 as Ha,
  ag as Ia,
  Ns as Ja,
  a0 as Ka,
  u0 as La,
  gn as Ma,
  ll as Na,
  c0 as Oa,
  l0 as Pa,
  d0 as Qa,
  f0 as Ra,
  h0 as Sa,
  dl as Ta,
  p0 as Ua,
  Os as Va,
  g0 as Wa,
  Sr as Xa,
  m0 as Ya,
  ft as Za,
  y0 as _a,
  ln as $a,
  Lt as ab,
  Or as bb,
  ed as cb,
  Ae as db,
  Z as eb,
  Km as fb,
  Jm as gb,
  Dn as hb,
  Cy as ib,
  E0 as jb,
  Ay as kb,
  Ly as lb,
  Ui as mb,
  jy as nb,
  Gy as ob,
  Zy as pb,
  av as qb,
  gd as rb,
  uv as sb,
  w0 as tb,
  C0 as ub,
  b0 as vb,
  _0 as wb,
  M0 as xb,
  Ed as yb,
  wd as zb,
  Cv as Ab,
  Cd as Bb,
  bd as Cb,
  Mv as Db,
  x0 as Eb,
  Sv as Fb,
  Tv as Gb,
  Fv as Hb,
  Rv as Ib,
  S0 as Jb,
  T0 as Kb,
  N0 as Lb,
  A0 as Mb,
  O0 as Nb,
  F0 as Ob,
  R0 as Pb,
  P0 as Qb,
  k0 as Rb,
  L0 as Sb,
  j0 as Tb,
  Bv as Ub,
  _d as Vb,
  $v as Wb,
  Hv as Xb,
  V0 as Yb,
  Uv as Zb,
  B0 as _b,
  $0 as $b,
  H0 as ac,
  U0 as bc,
  z0 as cc,
  G0 as dc,
  uo as ec,
  eD as fc,
  tD as gc,
  co as hc,
  W0 as ic,
  q0 as jc,
  Ks as kc,
  Ad as lc,
  Z0 as mc,
  Y0 as nc,
  ID as oc,
  ED as pc,
  Q0 as qc,
  Js as rc,
  K0 as sc,
  ea as tc,
  wx as uc,
  Od as vc,
  ia as wc,
  Cx as xc,
  lo as yc,
  bD as zc,
  bx as Ac,
  _D as Bc,
  _x as Cc,
  Mx as Dc,
  xx as Ec,
  Sx as Fc,
  OD as Gc,
  RD as Hc,
  Tx as Ic,
  Nx as Jc,
  Pd as Kc,
  ht as Lc,
  Fx as Mc,
  Rx as Nc,
  Px as Oc,
  kx as Pc,
  Lx as Qc,
  jx as Rc,
  Vx as Sc,
  jd as Tc,
  Vd as Uc,
  Bx as Vc,
};