! function (t) {
	function n(r) {
		if (e[r]) return e[r].exports;
		var i = e[r] = {
			exports: {},
			id: r,
			loaded: !1
		};
		return t[r].call(i.exports, i, i.exports, n), i.loaded = !0, i.exports
	}
	var e = {};
	return n.m = t, n.c = e, n.p = "", n(0)
}([function (t, n, e) {
	(function (t) {
		"use strict";
		var r = e(3),
			i = e(4),
			o = e(1),
			u = function () {
				function n(t) {
					this.ScrollCount = 0, this.OnLoaded = function () {
						return !1
					}, this.BindScroll(), this.MenuPeriodonto = [], this.MenuOdonto = [], this.Reload(t)
				}
				return n.prototype.ResetTeethState = function () {
					this.TeethState = [];
					for (var t = 11; t <= 85; t++) this.TeethState.push({
						name: "d" + t,
						state: "sano"
					})
				}, n.prototype.Reload = function (n) {
					var e = this;
					r.xml(n, function (n, i) {
						if (n) return void console.log(n);
						var o = i.getElementsByTagName("g")[0];
						e.Selected = "d11 corona", e.TeethState = [], e.ResetTeethState(), t("#draw").html(o), e.PathId = "", e.Paths = r.selectAll("path"), e.OnLoaded()
					})
				}, n.prototype.Draw = function () {
					r.select("svg").attr("preserveAspectRatio", "xMinYMin meet").attr("viewBox", "0 0 1085 800"), r.selectAll(".implante").style("fill", "transparent"), r.selectAll(".corona").style("stroke", "#282828"), r.selectAll(".corona").style("fill", "#FFFFFF"), r.selectAll(".raiz").style("stroke", "#282828"), r.selectAll(".raiz").style("fill", "#ECDC9E"), r.selectAll(".nervio").style("stroke", "transparent"), r.selectAll(".nervio").style("fill", "transparent"), r.selectAll(".dentina").style("stroke", "transparent"), r.selectAll(".dentina").style("fill", "transparent"), r.selectAll(".cuello").style("stroke", "transparent"), r.selectAll(".cuello").style("fill", "transparent"), r.selectAll(".ausente").style("fill", "transparent"), r.selectAll(".ausente").style("stroke", "transparent")
				}, n.prototype.Apply = function (t) {
					var n = this;
					t.forEach(function (t) {
						n.FillParse(t.diente, t.pieza, t.fill, t.stroke)
					})
				}, n.prototype.GetCurrentState = function (t) {
					return this.TeethState.filter(function (n) {
						return n.name == t
					})[0]
				}, n.prototype.GetColorOfState = function (t) {
					switch (t) {
						case "sano":
							return "#282828";
						case "ausente":
							return "#DCDCDC";
						case "extraido":
							return "#AE4949";
						case "implante":
							return "transparent"
					}
				}, n.prototype.BindScroll = function () {
					var n = this,
						e = 0,
						r = 0,
						i = document.documentElement,
						o = 0;
					t(window).bind("scroll", function (t) {
						o = (window.pageYOffset || i.scrollTop) - (i.clientTop || 0), r < o ? e += 1 : e -= 1, r = o, n.ScrollCount = o
					})
				}, n.prototype.Initialize = function () {
					var n = this;
					
					var e = new i.default(this);
					t("body").contextmenu(function (r) {
						if (e.Destroy(), n.PathId)
							if (3 == r.which) {
								e.Destroy(), e = new i.default(n);
								var o = e.Draw(r.pageX, r.pageY, n.ScrollCount);
								t("body").append(o)
							} else e.Destroy()
					}), t("body").click(function () {
						e.Destroy()
					})
				}, n.prototype.Fill = function (t, n, e) {
					var i = this.Selected.split(" ")[0];
					r.selectAll("." + t + "." + i).style("stroke", e), r.selectAll("." + t + "." + i).style("fill", n)
				}, n.prototype.FillPiece = function (t) {
					var n = this.Selected.split(" ")[0],
						e = this.Selected.split(" ")[1];
					r.selectAll("." + e + "." + n).style("fill", t)
				}, n.prototype.FillParse = function (t, n, e, i) {
					r.selectAll("." + n + "." + t).style("stroke", i), r.selectAll("." + n + "." + t).style("fill", e)
				}, n.prototype.State = function (t) {
					var n = this.Selected.split(" ")[0],
						e = this.TeethState.indexOf(this.GetCurrentState(n));
					this.TeethState[e].state = t
				}, n.prototype.SetState = function (t, n) {
					var e = t,
						r = this.TeethState.indexOf(this.GetCurrentState(e));
					this.TeethState[r].state = n
				}, n
			}();
		Object.defineProperty(n, "__esModule", {
			value: !0
		}), n.default = u, "undefined" != typeof window && (window.Dental = u)
	}).call(n, e(2))
}, function (t, n) {
	"use strict";

	function e(t, n) {
		return t.some(function (t) {
			return n.indexOf(t) >= 0
		})
	}

	function r(t) {
		return e(["raiz", "corona", "dentina", "nervio", "cuello", "implante", "ausente", "extraccion", "sellante", "carillas", "perno", "caninas"], [t])
	}

	function i(t) {
		return e(["vestibular", "oclusal", "lingual", "distal", "mesial"], [t])
	}
	n.containsAnyOf = e, n.isPeriodonto = r, n.isOdonto = i
}, function (t, n) {
	t.exports = jQuery
}, function (t, n, e) {
	! function (t, e) {
		e(n)
	}(this, function (t) {
		"use strict";

		function n(t) {
			return function (n, e) {
				return Ts(t(n), e)
			}
		}

		function e(t, n, e) {
			var r = Math.abs(n - t) / Math.max(0, e),
				i = Math.pow(10, Math.floor(Math.log(r) / Math.LN10)),
				o = r / i;
			return o >= Bs ? i *= 10 : o >= Ys ? i *= 5 : o >= js && (i *= 2), n < t ? -i : i
		}

		function r(t) {
			return t.length
		}

		function i(t, n, e) {
			var r = t(e);
			return "translate(" + (isFinite(r) ? r : n(e)) + ",0)"
		}

		function o(t, n, e) {
			var r = t(e);
			return "translate(0," + (isFinite(r) ? r : n(e)) + ")"
		}

		function u(t) {
			var n = t.bandwidth() / 2;
			return t.round() && (n = Math.round(n)),
				function (e) {
					return t(e) + n
				}
		}

		function a() {
			return !this.__axis
		}

		function c(t, n) {
			function e(e) {
				var p, d = null == c ? n.ticks ? n.ticks.apply(n, r) : n.domain() : c,
					v = null == s ? n.tickFormat ? n.tickFormat.apply(n, r) : sl : s,
					_ = Math.max(l, 0) + h,
					y = t === ll || t === hl ? i : o,
					g = n.range(),
					m = g[0] + .5,
					x = g[g.length - 1] + .5,
					b = (n.bandwidth ? u : sl)(n.copy()),
					w = e.selection ? e.selection() : e,
					M = w.selectAll(".domain").data([null]),
					S = w.selectAll(".tick").data(d, n).order(),
					T = S.exit(),
					k = S.enter().append("g").attr("class", "tick"),
					N = S.select("line"),
					A = S.select("text"),
					E = t === ll || t === pl ? -1 : 1,
					C = t === pl || t === fl ? (p = "x", "y") : (p = "y", "x");
				M = M.merge(M.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "#000")), S = S.merge(k), N = N.merge(k.append("line").attr("stroke", "#000").attr(p + "2", E * l).attr(C + "1", .5).attr(C + "2", .5)), A = A.merge(k.append("text").attr("fill", "#000").attr(p, E * _).attr(C, .5).attr("dy", t === ll ? "0em" : t === hl ? "0.71em" : "0.32em")), e !== w && (M = M.transition(e), S = S.transition(e), N = N.transition(e), A = A.transition(e), T = T.transition(e).attr("opacity", dl).attr("transform", function (t) {
					return y(b, this.parentNode.__axis || b, t)
				}), k.attr("opacity", dl).attr("transform", function (t) {
					return y(this.parentNode.__axis || b, b, t)
				})), T.remove(), M.attr("d", t === pl || t == fl ? "M" + E * f + "," + m + "H0.5V" + x + "H" + E * f : "M" + m + "," + E * f + "V0.5H" + x + "V" + E * f), S.attr("opacity", 1).attr("transform", function (t) {
					return y(b, b, t)
				}), N.attr(p + "2", E * l), A.attr(p, E * _).text(v), w.filter(a).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === fl ? "start" : t === pl ? "end" : "middle"), w.each(function () {
					this.__axis = b
				})
			}
			var r = [],
				c = null,
				s = null,
				l = 6,
				f = 6,
				h = 3;
			return e.scale = function (t) {
				return arguments.length ? (n = t, e) : n
			}, e.ticks = function () {
				return r = cl.call(arguments), e
			}, e.tickArguments = function (t) {
				return arguments.length ? (r = null == t ? [] : cl.call(t), e) : r.slice()
			}, e.tickValues = function (t) {
				return arguments.length ? (c = null == t ? null : cl.call(t), e) : c && c.slice()
			}, e.tickFormat = function (t) {
				return arguments.length ? (s = t, e) : s
			}, e.tickSize = function (t) {
				return arguments.length ? (l = f = +t, e) : l
			}, e.tickSizeInner = function (t) {
				return arguments.length ? (l = +t, e) : l
			}, e.tickSizeOuter = function (t) {
				return arguments.length ? (f = +t, e) : f
			}, e.tickPadding = function (t) {
				return arguments.length ? (h = +t, e) : h
			}, e
		}

		function s(t) {
			return c(ll, t)
		}

		function l(t) {
			return c(fl, t)
		}

		function f(t) {
			return c(hl, t)
		}

		function h(t) {
			return c(pl, t)
		}

		function p() {
			for (var t, n = 0, e = arguments.length, r = {}; n < e; ++n) {
				if (!(t = arguments[n] + "") || t in r) throw new Error("illegal type: " + t);
				r[t] = []
			}
			return new d(r)
		}

		function d(t) {
			this._ = t
		}

		function v(t, n) {
			return t.trim().split(/^|\s+/).map(function (t) {
				var e = "",
					r = t.indexOf(".");
				if (r >= 0 && (e = t.slice(r + 1), t = t.slice(0, r)), t && !n.hasOwnProperty(t)) throw new Error("unknown type: " + t);
				return {
					type: t,
					name: e
				}
			})
		}

		function _(t, n) {
			for (var e, r = 0, i = t.length; r < i; ++r)
				if ((e = t[r]).name === n) return e.value
		}

		function y(t, n, e) {
			for (var r = 0, i = t.length; r < i; ++r)
				if (t[r].name === n) {
					t[r] = vl, t = t.slice(0, r).concat(t.slice(r + 1));
					break
				}
			return null != e && t.push({
				name: n,
				value: e
			}), t
		}

		function g(t) {
			return function () {
				var n = this.ownerDocument,
					e = this.namespaceURI;
				return e === _l && n.documentElement.namespaceURI === _l ? n.createElement(t) : n.createElementNS(e, t)
			}
		}

		function m(t) {
			return function () {
				return this.ownerDocument.createElementNS(t.space, t.local)
			}
		}

		function x() {
			return new b
		}

		function b() {
			this._ = "@" + (++xl).toString(36)
		}

		function w(t, n, e) {
			return t = M(t, n, e),
				function (n) {
					var e = n.relatedTarget;
					e && (e === this || 8 & e.compareDocumentPosition(this)) || t.call(this, n)
				}
		}

		function M(n, e, r) {
			return function (i) {
				var o = t.event;
				t.event = i;
				try {
					n.call(this, this.__data__, e, r)
				} finally {
					t.event = o
				}
			}
		}

		function S(t) {
			return t.trim().split(/^|\s+/).map(function (t) {
				var n = "",
					e = t.indexOf(".");
				return e >= 0 && (n = t.slice(e + 1), t = t.slice(0, e)), {
					type: t,
					name: n
				}
			})
		}

		function T(t) {
			return function () {
				var n = this.__on;
				if (n) {
					for (var e, r = 0, i = -1, o = n.length; r < o; ++r) e = n[r], t.type && e.type !== t.type || e.name !== t.name ? n[++i] = e : this.removeEventListener(e.type, e.listener, e.capture);
					++i ? n.length = i : delete this.__on
				}
			}
		}

		function k(t, n, e) {
			var r = Tl.hasOwnProperty(t.type) ? w : M;
			return function (i, o, u) {
				var a, c = this.__on,
					s = r(n, o, u);
				if (c)
					for (var l = 0, f = c.length; l < f; ++l)
						if ((a = c[l]).type === t.type && a.name === t.name) return this.removeEventListener(a.type, a.listener, a.capture), this.addEventListener(a.type, a.listener = s, a.capture = e), void (a.value = n);
				this.addEventListener(t.type, s, e), a = {
					type: t.type,
					name: t.name,
					value: n,
					listener: s,
					capture: e
				}, c ? c.push(a) : this.__on = [a]
			}
		}

		function N(n, e, r, i) {
			var o = t.event;
			n.sourceEvent = t.event, t.event = n;
			try {
				return e.apply(r, i)
			} finally {
				t.event = o
			}
		}

		function A() { }

		function E() {
			return []
		}

		function C(t, n) {
			this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = n
		}

		function z(t, n, e, r, i, o) {
			for (var u, a = 0, c = n.length, s = o.length; a < s; ++a)(u = n[a]) ? (u.__data__ = o[a], r[a] = u) : e[a] = new C(t, o[a]);
			for (; a < c; ++a)(u = n[a]) && (i[a] = u)
		}

		function P(t, n, e, r, i, o, u) {
			var a, c, s, l = {},
				f = n.length,
				h = o.length,
				p = new Array(f);
			for (a = 0; a < f; ++a)(c = n[a]) && (p[a] = s = Il + u.call(c, c.__data__, a, n), s in l ? i[a] = c : l[s] = c);
			for (a = 0; a < h; ++a) s = Il + u.call(t, o[a], a, o), (c = l[s]) ? (r[a] = c, c.__data__ = o[a], l[s] = null) : e[a] = new C(t, o[a]);
			for (a = 0; a < f; ++a)(c = n[a]) && l[p[a]] === c && (i[a] = c)
		}

		function R(t, n) {
			return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN
		}

		function L(t) {
			return function () {
				this.removeAttribute(t)
			}
		}

		function q(t) {
			return function () {
				this.removeAttributeNS(t.space, t.local)
			}
		}

		function D(t, n) {
			return function () {
				this.setAttribute(t, n)
			}
		}

		function O(t, n) {
			return function () {
				this.setAttributeNS(t.space, t.local, n)
			}
		}

		function U(t, n) {
			return function () {
				var e = n.apply(this, arguments);
				null == e ? this.removeAttribute(t) : this.setAttribute(t, e)
			}
		}

		function I(t, n) {
			return function () {
				var e = n.apply(this, arguments);
				null == e ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, e)
			}
		}

		function F(t) {
			return function () {
				this.style.removeProperty(t)
			}
		}

		function B(t, n, e) {
			return function () {
				this.style.setProperty(t, n, e)
			}
		}

		function Y(t, n, e) {
			return function () {
				var r = n.apply(this, arguments);
				null == r ? this.style.removeProperty(t) : this.style.setProperty(t, r, e)
			}
		}

		function j(t) {
			return function () {
				delete this[t]
			}
		}

		function H(t, n) {
			return function () {
				this[t] = n
			}
		}

		function X(t, n) {
			return function () {
				var e = n.apply(this, arguments);
				null == e ? delete this[t] : this[t] = e
			}
		}

		function V(t) {
			return t.trim().split(/^|\s+/)
		}

		function W(t) {
			return t.classList || new G(t)
		}

		function G(t) {
			this._node = t, this._names = V(t.getAttribute("class") || "")
		}

		function $(t, n) {
			for (var e = W(t), r = -1, i = n.length; ++r < i;) e.add(n[r])
		}

		function Z(t, n) {
			for (var e = W(t), r = -1, i = n.length; ++r < i;) e.remove(n[r])
		}

		function Q(t) {
			return function () {
				$(this, t)
			}
		}

		function J(t) {
			return function () {
				Z(this, t)
			}
		}

		function K(t, n) {
			return function () {
				(n.apply(this, arguments) ? $ : Z)(this, t)
			}
		}

		function tt() {
			this.textContent = ""
		}

		function nt(t) {
			return function () {
				this.textContent = t
			}
		}

		function et(t) {
			return function () {
				var n = t.apply(this, arguments);
				this.textContent = null == n ? "" : n
			}
		}

		function rt() {
			this.innerHTML = ""
		}

		function it(t) {
			return function () {
				this.innerHTML = t
			}
		}

		function ot(t) {
			return function () {
				var n = t.apply(this, arguments);
				this.innerHTML = null == n ? "" : n
			}
		}

		function ut() {
			this.nextSibling && this.parentNode.appendChild(this)
		}

		function at() {
			this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild)
		}

		function ct() {
			return null
		}

		function st() {
			var t = this.parentNode;
			t && t.removeChild(this)
		}

		function lt(t, n, e) {
			var r = Jl(t),
				i = r.CustomEvent;
			i ? i = new i(n, e) : (i = r.document.createEvent("Event"), e ? (i.initEvent(n, e.bubbles, e.cancelable), i.detail = e.detail) : i.initEvent(n, !1, !1)), t.dispatchEvent(i)
		}

		function ft(t, n) {
			return function () {
				return lt(this, t, n)
			}
		}

		function ht(t, n) {
			return function () {
				return lt(this, t, n.apply(this, arguments))
			}
		}

		function pt(t, n) {
			this._groups = t, this._parents = n
		}

		function dt() {
			return new pt([
				[document.documentElement]
			], hf)
		}

		function vt() {
			t.event.stopImmediatePropagation()
		}

		function _t(t, n) {
			var e = t.document.documentElement,
				r = pf(t).on("dragstart.drag", null);
			n && (r.on("click.drag", yf, !0), setTimeout(function () {
				r.on("click.drag", null)
			}, 0)), "onselectstart" in e ? r.on("selectstart.drag", null) : (e.style.MozUserSelect = e.__noselect, delete e.__noselect)
		}

		function yt(t, n, e, r, i, o, u, a, c, s) {
			this.target = t, this.type = n, this.subject = e, this.identifier = r, this.active = i, this.x = o, this.y = u, this.dx = a, this.dy = c, this._ = s
		}

		function gt() {
			return !t.event.button
		}

		function mt() {
			return this.parentNode
		}

		function xt(n) {
			return null == n ? {
				x: t.event.x,
				y: t.event.y
			} : n
		}

		function bt(t, n) {
			var e = Object.create(t.prototype);
			for (var r in n) e[r] = n[r];
			return e
		}

		function wt() { }

		function Mt(t) {
			var n;
			return t = (t + "").trim().toLowerCase(), (n = Nf.exec(t)) ? (n = parseInt(n[1], 16), new At(n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | 240 & n, (15 & n) << 4 | 15 & n, 1)) : (n = Af.exec(t)) ? St(parseInt(n[1], 16)) : (n = Ef.exec(t)) ? new At(n[1], n[2], n[3], 1) : (n = Cf.exec(t)) ? new At(255 * n[1] / 100, 255 * n[2] / 100, 255 * n[3] / 100, 1) : (n = zf.exec(t)) ? Tt(n[1], n[2], n[3], n[4]) : (n = Pf.exec(t)) ? Tt(255 * n[1] / 100, 255 * n[2] / 100, 255 * n[3] / 100, n[4]) : (n = Rf.exec(t)) ? Et(n[1], n[2] / 100, n[3] / 100, 1) : (n = Lf.exec(t)) ? Et(n[1], n[2] / 100, n[3] / 100, n[4]) : qf.hasOwnProperty(t) ? St(qf[t]) : "transparent" === t ? new At(NaN, NaN, NaN, 0) : null
		}

		function St(t) {
			return new At(t >> 16 & 255, t >> 8 & 255, 255 & t, 1)
		}

		function Tt(t, n, e, r) {
			return r <= 0 && (t = n = e = NaN), new At(t, n, e, r)
		}

		function kt(t) {
			return t instanceof wt || (t = Mt(t)), t ? (t = t.rgb(), new At(t.r, t.g, t.b, t.opacity)) : new At
		}

		function Nt(t, n, e, r) {
			return 1 === arguments.length ? kt(t) : new At(t, n, e, null == r ? 1 : r)
		}

		function At(t, n, e, r) {
			this.r = +t, this.g = +n, this.b = +e, this.opacity = +r
		}

		function Et(t, n, e, r) {
			return r <= 0 ? t = n = e = NaN : e <= 0 || e >= 1 ? t = n = NaN : n <= 0 && (t = NaN), new Pt(t, n, e, r)
		}

		function Ct(t) {
			if (t instanceof Pt) return new Pt(t.h, t.s, t.l, t.opacity);
			if (t instanceof wt || (t = Mt(t)), !t) return new Pt;
			if (t instanceof Pt) return t;
			t = t.rgb();
			var n = t.r / 255,
				e = t.g / 255,
				r = t.b / 255,
				i = Math.min(n, e, r),
				o = Math.max(n, e, r),
				u = NaN,
				a = o - i,
				c = (o + i) / 2;
			return a ? (u = n === o ? (e - r) / a + 6 * (e < r) : e === o ? (r - n) / a + 2 : (n - e) / a + 4, a /= c < .5 ? o + i : 2 - o - i, u *= 60) : a = c > 0 && c < 1 ? 0 : u, new Pt(u, a, c, t.opacity)
		}

		function zt(t, n, e, r) {
			return 1 === arguments.length ? Ct(t) : new Pt(t, n, e, null == r ? 1 : r)
		}

		function Pt(t, n, e, r) {
			this.h = +t, this.s = +n, this.l = +e, this.opacity = +r
		}

		function Rt(t, n, e) {
			return 255 * (t < 60 ? n + (e - n) * t / 60 : t < 180 ? e : t < 240 ? n + (e - n) * (240 - t) / 60 : n)
		}

		function Lt(t) {
			if (t instanceof Dt) return new Dt(t.l, t.a, t.b, t.opacity);
			if (t instanceof jt) {
				var n = t.h * Df;
				return new Dt(t.l, Math.cos(n) * t.c, Math.sin(n) * t.c, t.opacity)
			}
			t instanceof At || (t = kt(t));
			var e = Ft(t.r),
				r = Ft(t.g),
				i = Ft(t.b),
				o = Ot((.4124564 * e + .3575761 * r + .1804375 * i) / If),
				u = Ot((.2126729 * e + .7151522 * r + .072175 * i) / Ff),
				a = Ot((.0193339 * e + .119192 * r + .9503041 * i) / Bf);
			return new Dt(116 * u - 16, 500 * (o - u), 200 * (u - a), t.opacity)
		}

		function qt(t, n, e, r) {
			return 1 === arguments.length ? Lt(t) : new Dt(t, n, e, null == r ? 1 : r)
		}

		function Dt(t, n, e, r) {
			this.l = +t, this.a = +n, this.b = +e, this.opacity = +r
		}

		function Ot(t) {
			return t > Xf ? Math.pow(t, 1 / 3) : t / Hf + Yf
		}

		function Ut(t) {
			return t > jf ? t * t * t : Hf * (t - Yf)
		}

		function It(t) {
			return 255 * (t <= .0031308 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - .055)
		}

		function Ft(t) {
			return (t /= 255) <= .04045 ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4)
		}

		function Bt(t) {
			if (t instanceof jt) return new jt(t.h, t.c, t.l, t.opacity);
			t instanceof Dt || (t = Lt(t));
			var n = Math.atan2(t.b, t.a) * Of;
			return new jt(n < 0 ? n + 360 : n, Math.sqrt(t.a * t.a + t.b * t.b), t.l, t.opacity)
		}

		function Yt(t, n, e, r) {
			return 1 === arguments.length ? Bt(t) : new jt(t, n, e, null == r ? 1 : r)
		}

		function jt(t, n, e, r) {
			this.h = +t, this.c = +n, this.l = +e, this.opacity = +r
		}

		function Ht(t) {
			if (t instanceof Vt) return new Vt(t.h, t.s, t.l, t.opacity);
			t instanceof At || (t = kt(t));
			var n = t.r / 255,
				e = t.g / 255,
				r = t.b / 255,
				i = (Kf * r + Qf * n - Jf * e) / (Kf + Qf - Jf),
				o = r - i,
				u = (Zf * (e - i) - Gf * o) / $f,
				a = Math.sqrt(u * u + o * o) / (Zf * i * (1 - i)),
				c = a ? Math.atan2(u, o) * Of - 120 : NaN;
			return new Vt(c < 0 ? c + 360 : c, a, i, t.opacity)
		}

		function Xt(t, n, e, r) {
			return 1 === arguments.length ? Ht(t) : new Vt(t, n, e, null == r ? 1 : r)
		}

		function Vt(t, n, e, r) {
			this.h = +t, this.s = +n, this.l = +e, this.opacity = +r
		}

		function Wt(t, n, e, r, i) {
			var o = t * t,
				u = o * t;
			return ((1 - 3 * t + 3 * o - u) * n + (4 - 6 * o + 3 * u) * e + (1 + 3 * t + 3 * o - 3 * u) * r + u * i) / 6
		}

		function Gt(t, n) {
			return function (e) {
				return t + e * n
			}
		}

		function $t(t, n, e) {
			return t = Math.pow(t, e), n = Math.pow(n, e) - t, e = 1 / e,
				function (r) {
					return Math.pow(t + r * n, e)
				}
		}

		function Zt(t, n) {
			var e = n - t;
			return e ? Gt(t, e > 180 || e < -180 ? e - 360 * Math.round(e / 360) : e) : ch(isNaN(t) ? n : t)
		}

		function Qt(t) {
			return 1 === (t = +t) ? Jt : function (n, e) {
				return e - n ? $t(n, e, t) : ch(isNaN(n) ? e : n)
			}
		}

		function Jt(t, n) {
			var e = n - t;
			return e ? Gt(t, e) : ch(isNaN(t) ? n : t)
		}

		function Kt(t) {
			return function (n) {
				var e, r, i = n.length,
					o = new Array(i),
					u = new Array(i),
					a = new Array(i);
				for (e = 0; e < i; ++e) r = Nt(n[e]), o[e] = r.r || 0, u[e] = r.g || 0, a[e] = r.b || 0;
				return o = t(o), u = t(u), a = t(a), r.opacity = 1,
					function (t) {
						return r.r = o(t), r.g = u(t), r.b = a(t), r + ""
					}
			}
		}

		function tn(t) {
			return function () {
				return t
			}
		}

		function nn(t) {
			return function (n) {
				return t(n) + ""
			}
		}

		function en(t) {
			return "none" === t ? wh : (th || (th = document.createElement("DIV"), nh = document.documentElement, eh = document.defaultView), th.style.transform = t, t = eh.getComputedStyle(nh.appendChild(th), null).getPropertyValue("transform"), nh.removeChild(th), t = t.slice(7, -1).split(","), Mh(+t[0], +t[1], +t[2], +t[3], +t[4], +t[5]))
		}

		function rn(t) {
			return null == t ? wh : (rh || (rh = document.createElementNS("http://www.w3.org/2000/svg", "g")), rh.setAttribute("transform", t), (t = rh.transform.baseVal.consolidate()) ? (t = t.matrix, Mh(t.a, t.b, t.c, t.d, t.e, t.f)) : wh)
		}

		function on(t, n, e, r) {
			function i(t) {
				return t.length ? t.pop() + " " : ""
			}

			function o(t, r, i, o, u, a) {
				if (t !== i || r !== o) {
					var c = u.push("translate(", null, n, null, e);
					a.push({
						i: c - 4,
						x: dh(t, i)
					}, {
							i: c - 2,
							x: dh(r, o)
						})
				} else (i || o) && u.push("translate(" + i + n + o + e)
			}

			function u(t, n, e, o) {
				t !== n ? (t - n > 180 ? n += 360 : n - t > 180 && (t += 360), o.push({
					i: e.push(i(e) + "rotate(", null, r) - 2,
					x: dh(t, n)
				})) : n && e.push(i(e) + "rotate(" + n + r)
			}

			function a(t, n, e, o) {
				t !== n ? o.push({
					i: e.push(i(e) + "skewX(", null, r) - 2,
					x: dh(t, n)
				}) : n && e.push(i(e) + "skewX(" + n + r)
			}

			function c(t, n, e, r, o, u) {
				if (t !== e || n !== r) {
					var a = o.push(i(o) + "scale(", null, ",", null, ")");
					u.push({
						i: a - 4,
						x: dh(t, e)
					}, {
							i: a - 2,
							x: dh(n, r)
						})
				} else 1 === e && 1 === r || o.push(i(o) + "scale(" + e + "," + r + ")")
			}
			return function (n, e) {
				var r = [],
					i = [];
				return n = t(n), e = t(e), o(n.translateX, n.translateY, e.translateX, e.translateY, r, i), u(n.rotate, e.rotate, r, i), a(n.skewX, e.skewX, r, i), c(n.scaleX, n.scaleY, e.scaleX, e.scaleY, r, i), n = e = null,
					function (t) {
						for (var n, e = -1, o = i.length; ++e < o;) r[(n = i[e]).i] = n.x(t);
						return r.join("")
					}
			}
		}

		function un(t) {
			return ((t = Math.exp(t)) + 1 / t) / 2
		}

		function an(t) {
			return ((t = Math.exp(t)) - 1 / t) / 2
		}

		function cn(t) {
			return ((t = Math.exp(2 * t)) - 1) / (t + 1)
		}

		function sn(t) {
			return function (n, e) {
				var r = t((n = zt(n)).h, (e = zt(e)).h),
					i = Jt(n.s, e.s),
					o = Jt(n.l, e.l),
					u = Jt(n.opacity, e.opacity);
				return function (t) {
					return n.h = r(t), n.s = i(t), n.l = o(t), n.opacity = u(t), n + ""
				}
			}
		}

		function ln(t, n) {
			var e = Jt((t = qt(t)).l, (n = qt(n)).l),
				r = Jt(t.a, n.a),
				i = Jt(t.b, n.b),
				o = Jt(t.opacity, n.opacity);
			return function (n) {
				return t.l = e(n), t.a = r(n), t.b = i(n), t.opacity = o(n), t + ""
			}
		}

		function fn(t) {
			return function (n, e) {
				var r = t((n = Yt(n)).h, (e = Yt(e)).h),
					i = Jt(n.c, e.c),
					o = Jt(n.l, e.l),
					u = Jt(n.opacity, e.opacity);
				return function (t) {
					return n.h = r(t), n.c = i(t), n.l = o(t), n.opacity = u(t), n + ""
				}
			}
		}

		function hn(t) {
			return function n(e) {
				function r(n, r) {
					var i = t((n = Xt(n)).h, (r = Xt(r)).h),
						o = Jt(n.s, r.s),
						u = Jt(n.l, r.l),
						a = Jt(n.opacity, r.opacity);
					return function (t) {
						return n.h = i(t), n.s = o(t), n.l = u(Math.pow(t, e)), n.opacity = a(t), n + ""
					}
				}
				return e = +e, r.gamma = n, r
			}(1)
		}

		function pn() {
			return jh || (Vh(dn), jh = Xh.now() + Hh)
		}

		function dn() {
			jh = 0
		}

		function vn() {
			this._call = this._time = this._next = null
		}

		function _n(t, n, e) {
			var r = new vn;
			return r.restart(t, n, e), r
		}

		function yn() {
			pn(), ++Uh;
			for (var t, n = ih; n;)(t = jh - n._time) >= 0 && n._call.call(null, t), n = n._next;
			--Uh
		}

		function gn() {
			jh = (Yh = Xh.now()) + Hh, Uh = Ih = 0;
			try {
				yn()
			} finally {
				Uh = 0, xn(), jh = 0
			}
		}

		function mn() {
			var t = Xh.now(),
				n = t - Yh;
			n > Bh && (Hh -= n, Yh = t)
		}

		function xn() {
			for (var t, n, e = ih, r = 1 / 0; e;) e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : ih = n);
			oh = t, bn(r)
		}

		function bn(t) {
			if (!Uh) {
				Ih && (Ih = clearTimeout(Ih));
				var n = t - jh;
				n > 24 ? (t < 1 / 0 && (Ih = setTimeout(gn, n)), Fh && (Fh = clearInterval(Fh))) : (Fh || (Yh = jh, Fh = setInterval(mn, Bh)), Uh = 1, Vh(gn))
			}
		}

		function wn(t, n) {
			var e = t.__transition;
			if (!e || !(e = e[n]) || e.state > Qh) throw new Error("too late");
			return e
		}

		function Mn(t, n) {
			var e = t.__transition;
			if (!e || !(e = e[n]) || e.state > Kh) throw new Error("too late");
			return e
		}

		function Sn(t, n) {
			var e = t.__transition;
			if (!e || !(e = e[n])) throw new Error("too late");
			return e
		}

		function Tn(t, n, e) {
			function r(t) {
				e.state = Jh, e.timer.restart(i, e.delay, e.time), e.delay <= t && i(t - e.delay)
			}

			function i(r) {
				var s, l, f, h;
				if (e.state !== Jh) return u();
				for (s in c)
					if (h = c[s], h.name === e.name) {
						if (h.state === tp) return Wh(i);
						h.state === np ? (h.state = rp, h.timer.stop(), h.on.call("interrupt", t, t.__data__, h.index, h.group), delete c[s]) : +s < n && (h.state = rp, h.timer.stop(), delete c[s])
					}
				if (Wh(function () {
					e.state === tp && (e.state = np, e.timer.restart(o, e.delay, e.time), o(r))
				}), e.state = Kh, e.on.call("start", t, t.__data__, e.index, e.group), e.state === Kh) {
					for (e.state = tp, a = new Array(f = e.tween.length), s = 0, l = -1; s < f; ++s)(h = e.tween[s].value.call(t, t.__data__, e.index, e.group)) && (a[++l] = h);
					a.length = l + 1
				}
			}

			function o(n) {
				for (var r = n < e.duration ? e.ease.call(null, n / e.duration) : (e.timer.restart(u), e.state = ep, 1), i = -1, o = a.length; ++i < o;) a[i].call(null, r);
				e.state === ep && (e.on.call("end", t, t.__data__, e.index, e.group), u())
			}

			function u() {
				e.state = rp, e.timer.stop(), delete c[n];
				for (var r in c) return;
				delete t.__transition
			}
			var a, c = t.__transition;
			c[n] = e, e.timer = _n(r, 0, e.time)
		}

		function kn(t, n) {
			var e, r;
			return function () {
				var i = Mn(this, t),
					o = i.tween;
				if (o !== e) {
					r = e = o;
					for (var u = 0, a = r.length; u < a; ++u)
						if (r[u].name === n) {
							r = r.slice(), r.splice(u, 1);
							break
						}
				}
				i.tween = r
			}
		}

		function Nn(t, n, e) {
			var r, i;
			if ("function" != typeof e) throw new Error;
			return function () {
				var o = Mn(this, t),
					u = o.tween;
				if (u !== r) {
					i = (r = u).slice();
					for (var a = {
						name: n,
						value: e
					}, c = 0, s = i.length; c < s; ++c)
						if (i[c].name === n) {
							i[c] = a;
							break
						}
					c === s && i.push(a)
				}
				o.tween = i
			}
		}

		function An(t, n, e) {
			var r = t._id;
			return t.each(function () {
				var t = Mn(this, r);
				(t.value || (t.value = {}))[n] = e.apply(this, arguments)
			}),
				function (t) {
					return Sn(t, r).value[n]
				}
		}

		function En(t) {
			return function () {
				this.removeAttribute(t)
			}
		}

		function Cn(t) {
			return function () {
				this.removeAttributeNS(t.space, t.local)
			}
		}

		function zn(t, n, e) {
			var r, i;
			return function () {
				var o = this.getAttribute(t);
				return o === e ? null : o === r ? i : i = n(r = o, e)
			}
		}

		function Pn(t, n, e) {
			var r, i;
			return function () {
				var o = this.getAttributeNS(t.space, t.local);
				return o === e ? null : o === r ? i : i = n(r = o, e)
			}
		}

		function Rn(t, n, e) {
			var r, i, o;
			return function () {
				var u, a = e(this);
				return null == a ? void this.removeAttribute(t) : (u = this.getAttribute(t), u === a ? null : u === r && a === i ? o : o = n(r = u, i = a))
			}
		}

		function Ln(t, n, e) {
			var r, i, o;
			return function () {
				var u, a = e(this);
				return null == a ? void this.removeAttributeNS(t.space, t.local) : (u = this.getAttributeNS(t.space, t.local), u === a ? null : u === r && a === i ? o : o = n(r = u, i = a))
			}
		}

		function qn(t, n) {
			function e() {
				var e = this,
					r = n.apply(e, arguments);
				return r && function (n) {
					e.setAttributeNS(t.space, t.local, r(n))
				}
			}
			return e._value = n, e
		}

		function Dn(t, n) {
			function e() {
				var e = this,
					r = n.apply(e, arguments);
				return r && function (n) {
					e.setAttribute(t, r(n))
				}
			}
			return e._value = n, e
		}

		function On(t, n) {
			return function () {
				wn(this, t).delay = +n.apply(this, arguments)
			}
		}

		function Un(t, n) {
			return n = +n,
				function () {
					wn(this, t).delay = n
				}
		}

		function In(t, n) {
			return function () {
				Mn(this, t).duration = +n.apply(this, arguments)
			}
		}

		function Fn(t, n) {
			return n = +n,
				function () {
					Mn(this, t).duration = n
				}
		}

		function Bn(t, n) {
			if ("function" != typeof n) throw new Error;
			return function () {
				Mn(this, t).ease = n
			}
		}

		function Yn(t) {
			return (t + "").trim().split(/^|\s+/).every(function (t) {
				var n = t.indexOf(".");
				return n >= 0 && (t = t.slice(0, n)), !t || "start" === t
			})
		}

		function jn(t, n, e) {
			var r, i, o = Yn(n) ? wn : Mn;
			return function () {
				var u = o(this, t),
					a = u.on;
				a !== r && (i = (r = a).copy()).on(n, e), u.on = i
			}
		}

		function Hn(t) {
			return function () {
				var n = this.parentNode;
				for (var e in this.__transition)
					if (+e !== t) return;
				n && n.removeChild(this)
			}
		}

		function Xn(t, n) {
			var e, r, i;
			return function () {
				var o = Jl(this).getComputedStyle(this, null),
					u = o.getPropertyValue(t),
					a = (this.style.removeProperty(t), o.getPropertyValue(t));
				return u === a ? null : u === e && a === r ? i : i = n(e = u, r = a)
			}
		}

		function Vn(t) {
			return function () {
				this.style.removeProperty(t)
			}
		}

		function Wn(t, n, e) {
			var r, i;
			return function () {
				var o = Jl(this).getComputedStyle(this, null).getPropertyValue(t);
				return o === e ? null : o === r ? i : i = n(r = o, e)
			}
		}

		function Gn(t, n, e) {
			var r, i, o;
			return function () {
				var u = Jl(this).getComputedStyle(this, null),
					a = u.getPropertyValue(t),
					c = e(this);
				return null == c && (this.style.removeProperty(t), c = u.getPropertyValue(t)), a === c ? null : a === r && c === i ? o : o = n(r = a, i = c)
			}
		}

		function $n(t, n, e) {
			function r() {
				var r = this,
					i = n.apply(r, arguments);
				return i && function (n) {
					r.style.setProperty(t, i(n), e)
				}
			}
			return r._value = n, r
		}

		function Zn(t) {
			return function () {
				this.textContent = t
			}
		}

		function Qn(t) {
			return function () {
				var n = t(this);
				this.textContent = null == n ? "" : n
			}
		}

		function Jn(t, n, e, r) {
			this._groups = t, this._parents = n, this._name = e, this._id = r
		}

		function Kn(t) {
			return dt().transition(t)
		}

		function te() {
			return ++kp
		}

		function ne(t) {
			return +t
		}

		function ee(t) {
			return t * t
		}

		function re(t) {
			return t * (2 - t)
		}

		function ie(t) {
			return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2
		}

		function oe(t) {
			return t * t * t
		}

		function ue(t) {
			return --t * t * t + 1
		}

		function ae(t) {
			return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2
		}

		function ce(t) {
			return 1 - Math.cos(t * Rp)
		}

		function se(t) {
			return Math.sin(t * Rp)
		}

		function le(t) {
			return (1 - Math.cos(Pp * t)) / 2
		}

		function fe(t) {
			return Math.pow(2, 10 * t - 10)
		}

		function he(t) {
			return 1 - Math.pow(2, -10 * t)
		}

		function pe(t) {
			return ((t *= 2) <= 1 ? Math.pow(2, 10 * t - 10) : 2 - Math.pow(2, 10 - 10 * t)) / 2
		}

		function de(t) {
			return 1 - Math.sqrt(1 - t * t)
		}

		function ve(t) {
			return Math.sqrt(1 - --t * t)
		}

		function _e(t) {
			return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2
		}

		function ye(t) {
			return 1 - ge(1 - t)
		}

		function ge(t) {
			return (t = +t) < Lp ? jp * t * t : t < Dp ? jp * (t -= qp) * t + Op : t < Ip ? jp * (t -= Up) * t + Fp : jp * (t -= Bp) * t + Yp
		}

		function me(t) {
			return ((t *= 2) <= 1 ? 1 - ge(1 - t) : ge(t - 1) + 1) / 2
		}

		function xe(t, n) {
			for (var e; !(e = t.__transition) || !(e = e[n]);)
				if (!(t = t.parentNode)) return td.time = pn(), td;
			return e
		}

		function be() {
			t.event.stopImmediatePropagation()
		}

		function we(t) {
			return {
				type: t
			}
		}

		function Me() {
			return !t.event.button
		}

		function Se() {
			var t = this.ownerSVGElement || this;
			return [
				[0, 0],
				[t.width.baseVal.value, t.height.baseVal.value]
			]
		}

		function Te(t) {
			for (; !t.__brush;)
				if (!(t = t.parentNode)) return;
			return t.__brush
		}

		function ke(t) {
			return t[0][0] === t[1][0] || t[0][1] === t[1][1]
		}

		function Ne(t) {
			var n = t.__brush;
			return n ? n.dim.output(n.selection) : null
		}

		function Ae() {
			return Ce(fd)
		}

		function Ee() {
			return Ce(hd)
		}

		function Ce(n) {
			function e(t) {
				var e = t.property("__brush", a).selectAll(".overlay").data([we("overlay")]);
				e.enter().append("rect").attr("class", "overlay").attr("pointer-events", "all").attr("cursor", dd.overlay).merge(e).each(function () {
					var t = Te(this).extent;
					pf(this).attr("x", t[0][0]).attr("y", t[0][1]).attr("width", t[1][0] - t[0][0]).attr("height", t[1][1] - t[0][1])
				}), t.selectAll(".selection").data([we("selection")]).enter().append("rect").attr("class", "selection").attr("cursor", dd.selection).attr("fill", "#777").attr("fill-opacity", .3).attr("stroke", "#fff").attr("shape-rendering", "crispEdges");
				var i = t.selectAll(".handle").data(n.handles, function (t) {
					return t.type
				});
				i.exit().remove(), i.enter().append("rect").attr("class", function (t) {
					return "handle handle--" + t.type
				}).attr("cursor", function (t) {
					return dd[t.type]
				}), t.each(r).attr("fill", "none").attr("pointer-events", "all").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)").on("mousedown.brush touchstart.brush", u)
			}

			function r() {
				var t = pf(this),
					n = Te(this).selection;
				n ? (t.selectAll(".selection").style("display", null).attr("x", n[0][0]).attr("y", n[0][1]).attr("width", n[1][0] - n[0][0]).attr("height", n[1][1] - n[0][1]), t.selectAll(".handle").style("display", null).attr("x", function (t) {
					return "e" === t.type[t.type.length - 1] ? n[1][0] - h / 2 : n[0][0] - h / 2
				}).attr("y", function (t) {
					return "s" === t.type[0] ? n[1][1] - h / 2 : n[0][1] - h / 2
				}).attr("width", function (t) {
					return "n" === t.type || "s" === t.type ? n[1][0] - n[0][0] + h : h
				}).attr("height", function (t) {
					return "e" === t.type || "w" === t.type ? n[1][1] - n[0][1] + h : h
				})) : t.selectAll(".selection,.handle").style("display", "none").attr("x", null).attr("y", null).attr("width", null).attr("height", null)
			}

			function i(t, n) {
				return t.__brush.emitter || new o(t, n)
			}

			function o(t, n) {
				this.that = t, this.args = n, this.state = t.__brush, this.active = 0
			}

			function u() {
				function e() {
					var t = Cl(S);
					!D || w || M || (Math.abs(t[0] - U[0]) > Math.abs(t[1] - U[1]) ? M = !0 : w = !0), U = t, b = !0, ud(), o()
				}

				function o() {
					var t;
					switch (m = U[0] - O[0], x = U[1] - O[1], k) {
						case cd:
						case ad:
							N && (m = Math.max(P - f, Math.min(L - v, m)), h = f + m, _ = v + m), A && (x = Math.max(R - p, Math.min(q - y, x)), d = p + x, g = y + x);
							break;
						case sd:
							N < 0 ? (m = Math.max(P - f, Math.min(L - f, m)), h = f + m, _ = v) : N > 0 && (m = Math.max(P - v, Math.min(L - v, m)), h = f, _ = v + m), A < 0 ? (x = Math.max(R - p, Math.min(q - p, x)), d = p + x, g = y) : A > 0 && (x = Math.max(R - y, Math.min(q - y, x)), d = p, g = y + x);
							break;
						case ld:
							N && (h = Math.max(P, Math.min(L, f - m * N)), _ = Math.max(P, Math.min(L, v + m * N))), A && (d = Math.max(R, Math.min(q, p - x * A)), g = Math.max(R, Math.min(q, y + x * A)))
					}
					_ < h && (N *= -1, t = f, f = v, v = t, t = h, h = _, _ = t, T in vd && B.attr("cursor", dd[T = vd[T]])), g < d && (A *= -1, t = p, p = y, y = t, t = d, d = g, g = t, T in _d && B.attr("cursor", dd[T = _d[T]])), E.selection && (z = E.selection), w && (h = z[0][0], _ = z[1][0]), M && (d = z[0][1], g = z[1][1]), z[0][0] === h && z[0][1] === d && z[1][0] === _ && z[1][1] === g || (E.selection = [
						[h, d],
						[_, g]
					], r.call(S), I.brush())
				}

				function u() {
					if (be(), t.event.touches) {
						if (t.event.touches.length) return;
						c && clearTimeout(c), c = setTimeout(function () {
							c = null
						}, 500), F.on("touchmove.brush touchend.brush touchcancel.brush", null)
					} else _t(t.event.view, b), Y.on("keydown.brush keyup.brush mousemove.brush mouseup.brush", null);
					F.attr("pointer-events", "all"), B.attr("cursor", dd.overlay), E.selection && (z = E.selection), ke(z) && (E.selection = null, r.call(S)), I.end()
				}

				function a() {
					switch (t.event.keyCode) {
						case 16:
							D = N && A;
							break;
						case 18:
							k === sd && (N && (v = _ - m * N, f = h + m * N), A && (y = g - x * A, p = d + x * A), k = ld, o());
							break;
						case 32:
							k !== sd && k !== ld || (N < 0 ? v = _ - m : N > 0 && (f = h - m), A < 0 ? y = g - x : A > 0 && (p = d - x), k = cd, B.attr("cursor", dd.selection), o());
							break;
						default:
							return
					}
					ud()
				}

				function s() {
					switch (t.event.keyCode) {
						case 16:
							D && (w = M = D = !1, o());
							break;
						case 18:
							k === ld && (N < 0 ? v = _ : N > 0 && (f = h), A < 0 ? y = g : A > 0 && (p = d), k = sd, o());
							break;
						case 32:
							k === cd && (t.event.altKey ? (N && (v = _ - m * N, f = h + m * N), A && (y = g - x * A, p = d + x * A), k = ld) : (N < 0 ? v = _ : N > 0 && (f = h), A < 0 ? y = g : A > 0 && (p = d), k = sd), B.attr("cursor", dd[T]), o());
							break;
						default:
							return
					}
					ud()
				}
				if (t.event.touches) {
					if (t.event.changedTouches.length < t.event.touches.length) return ud()
				} else if (c) return;
				if (l.apply(this, arguments)) {
					var f, h, p, d, v, _, y, g, m, x, b, w, M, S = this,
						T = t.event.target.__data__.type,
						k = "selection" === (t.event.metaKey ? T = "overlay" : T) ? ad : t.event.altKey ? ld : sd,
						N = n === hd ? null : yd[T],
						A = n === fd ? null : gd[T],
						E = Te(S),
						C = E.extent,
						z = E.selection,
						P = C[0][0],
						R = C[0][1],
						L = C[1][0],
						q = C[1][1],
						D = N && A && t.event.shiftKey,
						O = Cl(S),
						U = O,
						I = i(S, arguments).beforestart();
					"overlay" === T ? E.selection = z = [
						[f = n === hd ? P : O[0], p = n === fd ? R : O[1]],
						[v = n === hd ? L : f, y = n === fd ? q : p]
					] : (f = z[0][0], p = z[0][1], v = z[1][0], y = z[1][1]), h = f, d = p, _ = v, g = y;
					var F = pf(S).attr("pointer-events", "none"),
						B = F.selectAll(".overlay").attr("cursor", dd[T]);
					if (t.event.touches) F.on("touchmove.brush", e, !0).on("touchend.brush touchcancel.brush", u, !0);
					else {
						var Y = pf(t.event.view).on("keydown.brush", a, !0).on("keyup.brush", s, !0).on("mousemove.brush", e, !0).on("mouseup.brush", u, !0);
						gf(t.event.view)
					}
					be(), op(S), r.call(S), I.start()
				}
			}

			function a() {
				var t = this.__brush || {
					selection: null
				};
				return t.extent = s.apply(this, arguments),
					t.dim = n, t
			}
			var c, s = Se,
				l = Me,
				f = p(e, "start", "brush", "end"),
				h = 6;
			return e.move = function (t, e) {
				t.selection ? t.on("start.brush", function () {
					i(this, arguments).beforestart().start()
				}).on("interrupt.brush end.brush", function () {
					i(this, arguments).end()
				}).tween("brush", function () {
					function t(t) {
						u.selection = 1 === t && ke(s) ? null : l(t), r.call(o), a.brush()
					}
					var o = this,
						u = o.__brush,
						a = i(o, arguments),
						c = u.selection,
						s = n.input("function" == typeof e ? e.apply(this, arguments) : e, u.extent),
						l = mh(c, s);
					return c && s ? t : t(1)
				}) : t.each(function () {
					var t = this,
						o = arguments,
						u = t.__brush,
						a = n.input("function" == typeof e ? e.apply(t, o) : e, u.extent),
						c = i(t, o).beforestart();
					op(t), u.selection = null == a || ke(a) ? null : a, r.call(t), c.start().brush().end()
				})
			}, o.prototype = {
				beforestart: function () {
					return 1 === ++this.active && (this.state.emitter = this, this.starting = !0), this
				},
				start: function () {
					return this.starting && (this.starting = !1, this.emit("start")), this
				},
				brush: function () {
					return this.emit("brush"), this
				},
				end: function () {
					return 0 === --this.active && (delete this.state.emitter, this.emit("end")), this
				},
				emit: function (t) {
					N(new od(e, t, n.output(this.state.selection)), f.apply, f, [t, this.that, this.args])
				}
			}, e.extent = function (t) {
				return arguments.length ? (s = "function" == typeof t ? t : id([
					[+t[0][0], +t[0][1]],
					[+t[1][0], +t[1][1]]
				]), e) : s
			}, e.filter = function (t) {
				return arguments.length ? (l = "function" == typeof t ? t : id(!!t), e) : l
			}, e.handleSize = function (t) {
				return arguments.length ? (h = +t, e) : h
			}, e.on = function () {
				var t = f.on.apply(f, arguments);
				return t === f ? e : t
			}, e
		}

		function ze(t) {
			return function (n, e) {
				return t(n.source.value + n.target.value, e.source.value + e.target.value)
			}
		}

		function Pe() {
			this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = ""
		}

		function Re() {
			return new Pe
		}

		function Le(t) {
			return t.source
		}

		function qe(t) {
			return t.target
		}

		function De(t) {
			return t.radius
		}

		function Oe(t) {
			return t.startAngle
		}

		function Ue(t) {
			return t.endAngle
		}

		function Ie() { }

		function Fe(t, n) {
			var e = new Ie;
			if (t instanceof Ie) t.each(function (t, n) {
				e.set(n, t)
			});
			else if (Array.isArray(t)) {
				var r, i = -1,
					o = t.length;
				if (null == n)
					for (; ++i < o;) e.set(i, t[i]);
				else
					for (; ++i < o;) e.set(n(r = t[i], i, t), r)
			} else if (t)
				for (var u in t) e.set(u, t[u]);
			return e
		}

		function Be() {
			return {}
		}

		function Ye(t, n, e) {
			t[n] = e
		}

		function je() {
			return Fe()
		}

		function He(t, n, e) {
			t.set(n, e)
		}

		function Xe() { }

		function Ve(t, n) {
			var e = new Xe;
			if (t instanceof Xe) t.each(function (t) {
				e.add(t)
			});
			else if (t) {
				var r = -1,
					i = t.length;
				if (null == n)
					for (; ++r < i;) e.add(t[r]);
				else
					for (; ++r < i;) e.add(n(t[r], r, t))
			}
			return e
		}

		function We(t) {
			return new Function("d", "return {" + t.map(function (t, n) {
				return JSON.stringify(t) + ": d[" + n + "]"
			}).join(",") + "}")
		}

		function Ge(t, n) {
			var e = We(t);
			return function (r, i) {
				return n(e(r), i, t)
			}
		}

		function $e(t) {
			var n = Object.create(null),
				e = [];
			return t.forEach(function (t) {
				for (var r in t) r in n || e.push(n[r] = r)
			}), e
		}

		function Ze(t, n, e, r) {
			if (isNaN(n) || isNaN(e)) return t;
			var i, o, u, a, c, s, l, f, h, p = t._root,
				d = {
					data: r
				},
				v = t._x0,
				_ = t._y0,
				y = t._x1,
				g = t._y1;
			if (!p) return t._root = d, t;
			for (; p.length;)
				if ((s = n >= (o = (v + y) / 2)) ? v = o : y = o, (l = e >= (u = (_ + g) / 2)) ? _ = u : g = u, i = p, !(p = p[f = l << 1 | s])) return i[f] = d, t;
			if (a = +t._x.call(null, p.data), c = +t._y.call(null, p.data), n === a && e === c) return d.next = p, i ? i[f] = d : t._root = d, t;
			do i = i ? i[f] = new Array(4) : t._root = new Array(4), (s = n >= (o = (v + y) / 2)) ? v = o : y = o, (l = e >= (u = (_ + g) / 2)) ? _ = u : g = u; while ((f = l << 1 | s) === (h = (c >= u) << 1 | a >= o));
			return i[h] = p, i[f] = d, t
		}

		function Qe(t) {
			var n, e, r, i, o = t.length,
				u = new Array(o),
				a = new Array(o),
				c = 1 / 0,
				s = 1 / 0,
				l = -(1 / 0),
				f = -(1 / 0);
			for (e = 0; e < o; ++e) isNaN(r = +this._x.call(null, n = t[e])) || isNaN(i = +this._y.call(null, n)) || (u[e] = r, a[e] = i, r < c && (c = r), r > l && (l = r), i < s && (s = i), i > f && (f = i));
			for (l < c && (c = this._x0, l = this._x1), f < s && (s = this._y0, f = this._y1), this.cover(c, s).cover(l, f), e = 0; e < o; ++e) Ze(this, u[e], a[e], t[e]);
			return this
		}

		function Je(t) {
			for (var n = 0, e = t.length; n < e; ++n) this.remove(t[n]);
			return this
		}

		function Ke(t) {
			return t[0]
		}

		function tr(t) {
			return t[1]
		}

		function nr(t, n, e) {
			var r = new er(null == n ? Ke : n, null == e ? tr : e, NaN, NaN, NaN, NaN);
			return null == t ? r : r.addAll(t)
		}

		function er(t, n, e, r, i, o) {
			this._x = t, this._y = n, this._x0 = e, this._y0 = r, this._x1 = i, this._y1 = o, this._root = void 0
		}

		function rr(t) {
			for (var n = {
				data: t.data
			}, e = n; t = t.next;) e = e.next = {
				data: t.data
			};
			return n
		}

		function ir(t) {
			return t.x + t.vx
		}

		function or(t) {
			return t.y + t.vy
		}

		function ur(t) {
			return t.index
		}

		function ar(t, n) {
			var e = t.get(n);
			if (!e) throw new Error("missing: " + n);
			return e
		}

		function cr(t) {
			return t.x
		}

		function sr(t) {
			return t.y
		}

		function lr(t) {
			if (!(n = Cv.exec(t))) throw new Error("invalid format: " + t);
			var n, e = n[1] || " ",
				r = n[2] || ">",
				i = n[3] || "-",
				o = n[4] || "",
				u = !!n[5],
				a = n[6] && +n[6],
				c = !!n[7],
				s = n[8] && +n[8].slice(1),
				l = n[9] || "";
			"n" === l ? (c = !0, l = "g") : Ev[l] || (l = ""), (u || "0" === e && "=" === r) && (u = !0, e = "0", r = "="), this.fill = e, this.align = r, this.sign = i, this.symbol = o, this.zero = u, this.width = a, this.comma = c, this.precision = s, this.type = l
		}

		function fr(t) {
			return t
		}

		function hr(n) {
			return Pv = Lv(n), t.format = Pv.format, t.formatPrefix = Pv.formatPrefix, Pv
		}

		function pr() {
			this.reset()
		}

		function dr(t, n, e) {
			var r = t.s = n + e,
				i = r - n,
				o = r - i;
			t.t = n - o + (e - i)
		}

		function vr(t) {
			return t > 1 ? 0 : t < -1 ? m_ : Math.acos(t)
		}

		function _r(t) {
			return t > 1 ? x_ : t < -1 ? -x_ : Math.asin(t)
		}

		function yr(t) {
			return (t = R_(t / 2)) * t
		}

		function gr() { }

		function mr(t, n) {
			t && U_.hasOwnProperty(t.type) && U_[t.type](t, n)
		}

		function xr(t, n, e) {
			var r, i = -1,
				o = t.length - e;
			for (n.lineStart(); ++i < o;) r = t[i], n.point(r[0], r[1], r[2]);
			n.lineEnd()
		}

		function br(t, n) {
			var e = -1,
				r = t.length;
			for (n.polygonStart(); ++e < r;) xr(t[e], n, 1);
			n.polygonEnd()
		}

		function wr() {
			Y_.point = Sr
		}

		function Mr() {
			Tr(Iv, Fv)
		}

		function Sr(t, n) {
			Y_.point = Tr, Iv = t, Fv = n, t *= S_, n *= S_, Bv = t, Yv = A_(n = n / 2 + b_), jv = R_(n)
		}

		function Tr(t, n) {
			t *= S_, n *= S_, n = n / 2 + b_;
			var e = t - Bv,
				r = e >= 0 ? 1 : -1,
				i = r * e,
				o = A_(n),
				u = R_(n),
				a = jv * u,
				c = Yv * o + a * A_(i),
				s = a * r * R_(i);
			F_.add(N_(s, c)), Bv = t, Yv = o, jv = u
		}

		function kr(t) {
			return [N_(t[1], t[0]), _r(t[2])]
		}

		function Nr(t) {
			var n = t[0],
				e = t[1],
				r = A_(e);
			return [r * A_(n), r * R_(n), R_(e)]
		}

		function Ar(t, n) {
			return t[0] * n[0] + t[1] * n[1] + t[2] * n[2]
		}

		function Er(t, n) {
			return [t[1] * n[2] - t[2] * n[1], t[2] * n[0] - t[0] * n[2], t[0] * n[1] - t[1] * n[0]]
		}

		function Cr(t, n) {
			t[0] += n[0], t[1] += n[1], t[2] += n[2]
		}

		function zr(t, n) {
			return [t[0] * n, t[1] * n, t[2] * n]
		}

		function Pr(t) {
			var n = q_(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
			t[0] /= n, t[1] /= n, t[2] /= n
		}

		function Rr(t, n) {
			Jv.push(Kv = [Hv = t, Vv = t]), n < Xv && (Xv = n), n > Wv && (Wv = n)
		}

		function Lr(t, n) {
			var e = Nr([t * S_, n * S_]);
			if (Qv) {
				var r = Er(Qv, e),
					i = [r[1], -r[0], 0],
					o = Er(i, r);
				Pr(o), o = kr(o);
				var u, a = t - Gv,
					c = a > 0 ? 1 : -1,
					s = o[0] * M_ * c,
					l = T_(a) > 180;
				l ^ (c * Gv < s && s < c * t) ? (u = o[1] * M_, u > Wv && (Wv = u)) : (s = (s + 360) % 360 - 180, l ^ (c * Gv < s && s < c * t) ? (u = -o[1] * M_, u < Xv && (Xv = u)) : (n < Xv && (Xv = n), n > Wv && (Wv = n))), l ? t < Gv ? Fr(Hv, t) > Fr(Hv, Vv) && (Vv = t) : Fr(t, Vv) > Fr(Hv, Vv) && (Hv = t) : Vv >= Hv ? (t < Hv && (Hv = t), t > Vv && (Vv = t)) : t > Gv ? Fr(Hv, t) > Fr(Hv, Vv) && (Vv = t) : Fr(t, Vv) > Fr(Hv, Vv) && (Hv = t)
			} else Rr(t, n);
			Qv = e, Gv = t
		}

		function qr() {
			X_.point = Lr
		}

		function Dr() {
			Kv[0] = Hv, Kv[1] = Vv, X_.point = Rr, Qv = null
		}

		function Or(t, n) {
			if (Qv) {
				var e = t - Gv;
				H_.add(T_(e) > 180 ? e + (e > 0 ? 360 : -360) : e)
			} else $v = t, Zv = n;
			Y_.point(t, n), Lr(t, n)
		}

		function Ur() {
			Y_.lineStart()
		}

		function Ir() {
			Or($v, Zv), Y_.lineEnd(), T_(H_) > y_ && (Hv = -(Vv = 180)), Kv[0] = Hv, Kv[1] = Vv, Qv = null
		}

		function Fr(t, n) {
			return (n -= t) < 0 ? n + 360 : n
		}

		function Br(t, n) {
			return t[0] - n[0]
		}

		function Yr(t, n) {
			return t[0] <= t[1] ? t[0] <= n && n <= t[1] : n < t[0] || t[1] < n
		}

		function jr(t, n) {
			t *= S_, n *= S_;
			var e = A_(n);
			Hr(e * A_(t), e * R_(t), R_(n))
		}

		function Hr(t, n, e) {
			++t_, e_ += (t - e_) / t_, r_ += (n - r_) / t_, i_ += (e - i_) / t_
		}

		function Xr() {
			W_.point = Vr
		}

		function Vr(t, n) {
			t *= S_, n *= S_;
			var e = A_(n);
			p_ = e * A_(t), d_ = e * R_(t), v_ = R_(n), W_.point = Wr, Hr(p_, d_, v_)
		}

		function Wr(t, n) {
			t *= S_, n *= S_;
			var e = A_(n),
				r = e * A_(t),
				i = e * R_(t),
				o = R_(n),
				u = N_(q_((u = d_ * o - v_ * i) * u + (u = v_ * r - p_ * o) * u + (u = p_ * i - d_ * r) * u), p_ * r + d_ * i + v_ * o);
			n_ += u, o_ += u * (p_ + (p_ = r)), u_ += u * (d_ + (d_ = i)), a_ += u * (v_ + (v_ = o)), Hr(p_, d_, v_)
		}

		function Gr() {
			W_.point = jr
		}

		function $r() {
			W_.point = Qr
		}

		function Zr() {
			Jr(f_, h_), W_.point = jr
		}

		function Qr(t, n) {
			f_ = t, h_ = n, t *= S_, n *= S_, W_.point = Jr;
			var e = A_(n);
			p_ = e * A_(t), d_ = e * R_(t), v_ = R_(n), Hr(p_, d_, v_)
		}

		function Jr(t, n) {
			t *= S_, n *= S_;
			var e = A_(n),
				r = e * A_(t),
				i = e * R_(t),
				o = R_(n),
				u = d_ * o - v_ * i,
				a = v_ * r - p_ * o,
				c = p_ * i - d_ * r,
				s = q_(u * u + a * a + c * c),
				l = p_ * r + d_ * i + v_ * o,
				f = s && -vr(l) / s,
				h = N_(s, l);
			c_ += f * u, s_ += f * a, l_ += f * c, n_ += h, o_ += h * (p_ + (p_ = r)), u_ += h * (d_ + (d_ = i)), a_ += h * (v_ + (v_ = o)), Hr(p_, d_, v_)
		}

		function Kr(t, n) {
			return [t > m_ ? t - w_ : t < -m_ ? t + w_ : t, n]
		}

		function ti(t, n, e) {
			return (t %= w_) ? n || e ? Z_(ei(t), ri(n, e)) : ei(t) : n || e ? ri(n, e) : Kr
		}

		function ni(t) {
			return function (n, e) {
				return n += t, [n > m_ ? n - w_ : n < -m_ ? n + w_ : n, e]
			}
		}

		function ei(t) {
			var n = ni(t);
			return n.invert = ni(-t), n
		}

		function ri(t, n) {
			function e(t, n) {
				var e = A_(n),
					a = A_(t) * e,
					c = R_(t) * e,
					s = R_(n),
					l = s * r + a * i;
				return [N_(c * o - l * u, a * r - s * i), _r(l * o + c * u)]
			}
			var r = A_(t),
				i = R_(t),
				o = A_(n),
				u = R_(n);
			return e.invert = function (t, n) {
				var e = A_(n),
					a = A_(t) * e,
					c = R_(t) * e,
					s = R_(n),
					l = s * o - c * u;
				return [N_(c * o + s * u, a * r + l * i), _r(l * r - a * i)]
			}, e
		}

		function ii(t, n, e, r, i, o) {
			if (e) {
				var u = A_(n),
					a = R_(n),
					c = r * e;
				null == i ? (i = n + r * w_, o = n - c / 2) : (i = oi(u, i), o = oi(u, o), (r > 0 ? i < o : i > o) && (i += r * w_));
				for (var s, l = i; r > 0 ? l > o : l < o; l -= c) s = kr([u, -a * A_(l), -a * R_(l)]), t.point(s[0], s[1])
			}
		}

		function oi(t, n) {
			n = Nr(n), n[0] -= t, Pr(n);
			var e = vr(-n[1]);
			return ((-n[2] < 0 ? -e : e) + w_ - y_) % w_
		}

		function ui(t, n, e, r) {
			this.x = t, this.z = n, this.o = e, this.e = r, this.v = !1, this.n = this.p = null
		}

		function ai(t) {
			if (n = t.length) {
				for (var n, e, r = 0, i = t[0]; ++r < n;) i.n = e = t[r], e.p = i, i = e;
				i.n = e = t[0], e.p = i
			}
		}

		function ci(t, n, e, r) {
			function i(i, o) {
				return t <= i && i <= e && n <= o && o <= r
			}

			function o(i, o, a, s) {
				var l = 0,
					f = 0;
				if (null == i || (l = u(i, a)) !== (f = u(o, a)) || c(i, o) < 0 ^ a > 0) {
					do s.point(0 === l || 3 === l ? t : e, l > 1 ? r : n); while ((l = (l + a + 4) % 4) !== f)
				} else s.point(o[0], o[1])
			}

			function u(r, i) {
				return T_(r[0] - t) < y_ ? i > 0 ? 0 : 3 : T_(r[0] - e) < y_ ? i > 0 ? 2 : 1 : T_(r[1] - n) < y_ ? i > 0 ? 1 : 0 : i > 0 ? 3 : 2
			}

			function a(t, n) {
				return c(t.x, n.x)
			}

			function c(t, n) {
				var e = u(t, 1),
					r = u(n, 1);
				return e !== r ? e - r : 0 === e ? n[1] - t[1] : 1 === e ? t[0] - n[0] : 2 === e ? t[1] - n[1] : n[0] - t[0]
			}
			return function (u) {
				function c(t, n) {
					i(t, n) && k.point(t, n)
				}

				function s() {
					for (var n = 0, e = 0, i = _.length; e < i; ++e)
						for (var o, u, a = _[e], c = 1, s = a.length, l = a[0], f = l[0], h = l[1]; c < s; ++c) o = f, u = h, l = a[c], f = l[0], h = l[1], u <= r ? h > r && (f - o) * (r - u) > (h - u) * (t - o) && ++n : h <= r && (f - o) * (r - u) < (h - u) * (t - o) && --n;
					return n
				}

				function l() {
					k = N, v = [], _ = [], T = !0
				}

				function f() {
					var t = s(),
						n = T && t,
						e = (v = Ks(v)).length;
					(n || e) && (u.polygonStart(), n && (u.lineStart(), o(null, null, 1, u), u.lineEnd()), e && py(v, a, t, o, u), u.polygonEnd()), k = u, v = _ = y = null
				}

				function h() {
					A.point = d, _ && _.push(y = []), S = !0, M = !1, b = w = NaN
				}

				function p() {
					v && (d(g, m), x && M && N.rejoin(), v.push(N.result())), A.point = c, M && k.lineEnd()
				}

				function d(o, u) {
					var a = i(o, u);
					if (_ && y.push([o, u]), S) g = o, m = u, x = a, S = !1, a && (k.lineStart(), k.point(o, u));
					else if (a && M) k.point(o, u);
					else {
						var c = [b = Math.max(vy, Math.min(dy, b)), w = Math.max(vy, Math.min(dy, w))],
							s = [o = Math.max(vy, Math.min(dy, o)), u = Math.max(vy, Math.min(dy, u))];
						fy(c, s, t, n, e, r) ? (M || (k.lineStart(), k.point(c[0], c[1])), k.point(s[0], s[1]), a || k.lineEnd(), T = !1) : a && (k.lineStart(), k.point(o, u), T = !1)
					}
					b = o, w = u, M = a
				}
				var v, _, y, g, m, x, b, w, M, S, T, k = u,
					N = ly(),
					A = {
						point: c,
						lineStart: h,
						lineEnd: p,
						polygonStart: l,
						polygonEnd: f
					};
				return A
			}
		}

		function si() {
			gy.point = fi, gy.lineEnd = li
		}

		function li() {
			gy.point = gy.lineEnd = gr
		}

		function fi(t, n) {
			t *= S_, n *= S_, Q_ = t, J_ = R_(n), K_ = A_(n), gy.point = hi
		}

		function hi(t, n) {
			t *= S_, n *= S_;
			var e = R_(n),
				r = A_(n),
				i = T_(t - Q_),
				o = A_(i),
				u = R_(i),
				a = r * u,
				c = K_ * e - J_ * r * o,
				s = J_ * e + K_ * r * o;
			yy.add(N_(q_(a * a + c * c), s)), Q_ = t, J_ = e, K_ = r
		}

		function pi(t, n, e) {
			var r = Fs(t, n - y_, e).concat(n);
			return function (t) {
				return r.map(function (n) {
					return [t, n]
				})
			}
		}

		function di(t, n, e) {
			var r = Fs(t, n - y_, e).concat(n);
			return function (t) {
				return r.map(function (n) {
					return [n, t]
				})
			}
		}

		function vi() {
			function t() {
				return {
					type: "MultiLineString",
					coordinates: n()
				}
			}

			function n() {
				return Fs(E_(o / _) * _, i, _).map(h).concat(Fs(E_(s / y) * y, c, y).map(p)).concat(Fs(E_(r / d) * d, e, d).filter(function (t) {
					return T_(t % _) > y_
				}).map(l)).concat(Fs(E_(a / v) * v, u, v).filter(function (t) {
					return T_(t % y) > y_
				}).map(f))
			}
			var e, r, i, o, u, a, c, s, l, f, h, p, d = 10,
				v = d,
				_ = 90,
				y = 360,
				g = 2.5;
			return t.lines = function () {
				return n().map(function (t) {
					return {
						type: "LineString",
						coordinates: t
					}
				})
			}, t.outline = function () {
				return {
					type: "Polygon",
					coordinates: [h(o).concat(p(c).slice(1), h(i).reverse().slice(1), p(s).reverse().slice(1))]
				}
			}, t.extent = function (n) {
				return arguments.length ? t.extentMajor(n).extentMinor(n) : t.extentMinor()
			}, t.extentMajor = function (n) {
				return arguments.length ? (o = +n[0][0], i = +n[1][0], s = +n[0][1], c = +n[1][1], o > i && (n = o, o = i, i = n), s > c && (n = s, s = c, c = n), t.precision(g)) : [
					[o, s],
					[i, c]
				]
			}, t.extentMinor = function (n) {
				return arguments.length ? (r = +n[0][0], e = +n[1][0], a = +n[0][1], u = +n[1][1], r > e && (n = r, r = e, e = n), a > u && (n = a, a = u, u = n), t.precision(g)) : [
					[r, a],
					[e, u]
				]
			}, t.step = function (n) {
				return arguments.length ? t.stepMajor(n).stepMinor(n) : t.stepMinor()
			}, t.stepMajor = function (n) {
				return arguments.length ? (_ = +n[0], y = +n[1], t) : [_, y]
			}, t.stepMinor = function (n) {
				return arguments.length ? (d = +n[0], v = +n[1], t) : [d, v]
			}, t.precision = function (n) {
				return arguments.length ? (g = +n, l = pi(a, u, 90), f = di(r, e, g), h = pi(s, c, 90), p = di(o, i, g), t) : g
			}, t.extentMajor([
				[-180, -90 + y_],
				[180, 90 - y_]
			]).extentMinor([
				[-180, -80 - y_],
				[180, 80 + y_]
			])
		}

		function _i() {
			return vi()()
		}

		function yi() {
			Ny.point = gi
		}

		function gi(t, n) {
			Ny.point = mi, ty = ey = t, ny = ry = n
		}

		function mi(t, n) {
			ky.add(ry * t - ey * n), ey = t, ry = n
		}

		function xi() {
			mi(ty, ny)
		}

		function bi(t, n) {
			t < Ay && (Ay = t), t > Cy && (Cy = t), n < Ey && (Ey = n), n > zy && (zy = n)
		}

		function wi(t, n) {
			Ry += t, Ly += n, ++qy
		}

		function Mi() {
			Yy.point = Si
		}

		function Si(t, n) {
			Yy.point = Ti, wi(uy = t, ay = n)
		}

		function Ti(t, n) {
			var e = t - uy,
				r = n - ay,
				i = q_(e * e + r * r);
			Dy += i * (uy + t) / 2, Oy += i * (ay + n) / 2, Uy += i, wi(uy = t, ay = n)
		}

		function ki() {
			Yy.point = wi
		}

		function Ni() {
			Yy.point = Ei
		}

		function Ai() {
			Ci(iy, oy)
		}

		function Ei(t, n) {
			Yy.point = Ci, wi(iy = uy = t, oy = ay = n)
		}

		function Ci(t, n) {
			var e = t - uy,
				r = n - ay,
				i = q_(e * e + r * r);
			Dy += i * (uy + t) / 2, Oy += i * (ay + n) / 2, Uy += i, i = ay * t - uy * n, Iy += i * (uy + t), Fy += i * (ay + n), By += 3 * i, wi(uy = t, ay = n)
		}

		function zi(t) {
			this._context = t
		}

		function Pi() {
			this._string = []
		}

		function Ri(t) {
			return "m0," + t + "a" + t + "," + t + " 0 1,1 0," + -2 * t + "a" + t + "," + t + " 0 1,1 0," + 2 * t + "z"
		}

		function Li(t) {
			return t.length > 1
		}

		function qi(t, n) {
			return ((t = t.x)[0] < 0 ? t[1] - x_ - y_ : x_ - t[1]) - ((n = n.x)[0] < 0 ? n[1] - x_ - y_ : x_ - n[1])
		}

		function Di(t) {
			var n, e = NaN,
				r = NaN,
				i = NaN;
			return {
				lineStart: function () {
					t.lineStart(), n = 1
				},
				point: function (o, u) {
					var a = o > 0 ? m_ : -m_,
						c = T_(o - e);
					T_(c - m_) < y_ ? (t.point(e, r = (r + u) / 2 > 0 ? x_ : -x_), t.point(i, r), t.lineEnd(), t.lineStart(), t.point(a, r), t.point(o, r), n = 0) : i !== a && c >= m_ && (T_(e - i) < y_ && (e -= i * y_), T_(o - a) < y_ && (o -= a * y_), r = Oi(e, r, o, u), t.point(i, r), t.lineEnd(), t.lineStart(), t.point(a, r), n = 0), t.point(e = o, r = u), i = a
				},
				lineEnd: function () {
					t.lineEnd(), e = r = NaN
				},
				clean: function () {
					return 2 - n
				}
			}
		}

		function Oi(t, n, e, r) {
			var i, o, u = R_(t - e);
			return T_(u) > y_ ? k_((R_(n) * (o = A_(r)) * R_(e) - R_(r) * (i = A_(n)) * R_(t)) / (i * o * u)) : (n + r) / 2
		}

		function Ui(t, n, e, r) {
			var i;
			if (null == t) i = e * x_, r.point(-m_, i), r.point(0, i), r.point(m_, i), r.point(m_, 0), r.point(m_, -i), r.point(0, -i), r.point(-m_, -i), r.point(-m_, 0), r.point(-m_, i);
			else if (T_(t[0] - n[0]) > y_) {
				var o = t[0] < n[0] ? m_ : -m_;
				i = e * o / 2, r.point(-o, i), r.point(0, i), r.point(o, i)
			} else r.point(n[0], n[1])
		}

		function Ii(t) {
			return function (n) {
				var e = new Fi;
				for (var r in t) e[r] = t[r];
				return e.stream = n, e
			}
		}

		function Fi() { }

		function Bi(t, n, e) {
			var r = n[1][0] - n[0][0],
				i = n[1][1] - n[0][1],
				o = t.clipExtent && t.clipExtent();
			t.scale(150).translate([0, 0]), null != o && t.clipExtent(null), I_(e, t.stream(Py));
			var u = Py.result(),
				a = Math.min(r / (u[1][0] - u[0][0]), i / (u[1][1] - u[0][1])),
				c = +n[0][0] + (r - a * (u[1][0] + u[0][0])) / 2,
				s = +n[0][1] + (i - a * (u[1][1] + u[0][1])) / 2;
			return null != o && t.clipExtent(o), t.scale(150 * a).translate([c, s])
		}

		function Yi(t, n, e) {
			return Bi(t, [
				[0, 0], n
			], e)
		}

		function ji(t) {
			return Ii({
				point: function (n, e) {
					n = t(n, e), this.stream.point(n[0], n[1])
				}
			})
		}

		function Hi(t, n) {
			function e(r, i, o, u, a, c, s, l, f, h, p, d, v, _) {
				var y = s - r,
					g = l - i,
					m = y * y + g * g;
				if (m > 4 * n && v--) {
					var x = u + h,
						b = a + p,
						w = c + d,
						M = q_(x * x + b * b + w * w),
						S = _r(w /= M),
						T = T_(T_(w) - 1) < y_ || T_(o - f) < y_ ? (o + f) / 2 : N_(b, x),
						k = t(T, S),
						N = k[0],
						A = k[1],
						E = N - r,
						C = A - i,
						z = g * E - y * C;
					(z * z / m > n || T_((y * E + g * C) / m - .5) > .3 || u * h + a * p + c * d < Qy) && (e(r, i, o, u, a, c, N, A, T, x /= M, b /= M, w, v, _), _.point(N, A), e(N, A, T, x, b, w, s, l, f, h, p, d, v, _))
				}
			}
			return function (n) {
				function r(e, r) {
					e = t(e, r), n.point(e[0], e[1])
				}

				function i() {
					y = NaN, w.point = o, n.lineStart()
				}

				function o(r, i) {
					var o = Nr([r, i]),
						u = t(r, i);
					e(y, g, _, m, x, b, y = u[0], g = u[1], _ = r, m = o[0], x = o[1], b = o[2], Zy, n), n.point(y, g)
				}

				function u() {
					w.point = r, n.lineEnd()
				}

				function a() {
					i(), w.point = c, w.lineEnd = s
				}

				function c(t, n) {
					o(l = t, n), f = y, h = g, p = m, d = x, v = b, w.point = o
				}

				function s() {
					e(y, g, _, m, x, b, f, h, l, p, d, v, Zy, n), w.lineEnd = u, u()
				}
				var l, f, h, p, d, v, _, y, g, m, x, b, w = {
					point: r,
					lineStart: i,
					lineEnd: u,
					polygonStart: function () {
						n.polygonStart(), w.lineStart = a
					},
					polygonEnd: function () {
						n.polygonEnd(), w.lineStart = i
					}
				};
				return w
			}
		}

		function Xi(t) {
			return Vi(function () {
				return t
			})()
		}

		function Vi(t) {
			function n(t) {
				return t = l(t[0] * S_, t[1] * S_), [t[0] * _ + a, c - t[1] * _]
			}

			function e(t) {
				return t = l.invert((t[0] - a) / _, (c - t[1]) / _), t && [t[0] * M_, t[1] * M_]
			}

			function r(t, n) {
				return t = u(t, n), [t[0] * _ + a, c - t[1] * _]
			}

			function i() {
				l = Z_(s = ti(b, w, M), u);
				var t = u(m, x);
				return a = y - t[0] * _, c = g + t[1] * _, o()
			}

			function o() {
				return d = v = null, n
			}
			var u, a, c, s, l, f, h, p, d, v, _ = 150,
				y = 480,
				g = 250,
				m = 0,
				x = 0,
				b = 0,
				w = 0,
				M = 0,
				S = null,
				T = Wy,
				k = null,
				N = Sy,
				A = .5,
				E = Jy(r, A);
			return n.stream = function (t) {
				return d && v === t ? d : d = Ky(T(s, E(N(v = t))))
			}, n.clipAngle = function (t) {
				return arguments.length ? (T = +t ? Gy(S = t * S_, 6 * S_) : (S = null, Wy), o()) : S * M_
			}, n.clipExtent = function (t) {
				return arguments.length ? (N = null == t ? (k = f = h = p = null, Sy) : ci(k = +t[0][0], f = +t[0][1], h = +t[1][0], p = +t[1][1]), o()) : null == k ? null : [
					[k, f],
					[h, p]
				]
			}, n.scale = function (t) {
				return arguments.length ? (_ = +t, i()) : _
			}, n.translate = function (t) {
				return arguments.length ? (y = +t[0], g = +t[1], i()) : [y, g]
			}, n.center = function (t) {
				return arguments.length ? (m = t[0] % 360 * S_, x = t[1] % 360 * S_, i()) : [m * M_, x * M_]
			}, n.rotate = function (t) {
				return arguments.length ? (b = t[0] % 360 * S_, w = t[1] % 360 * S_, M = t.length > 2 ? t[2] % 360 * S_ : 0, i()) : [b * M_, w * M_, M * M_]
			}, n.precision = function (t) {
				return arguments.length ? (E = Jy(r, A = t * t), o()) : q_(A)
			}, n.fitExtent = function (t, e) {
				return Bi(n, t, e)
			}, n.fitSize = function (t, e) {
				return Yi(n, t, e)
			},
				function () {
					return u = t.apply(this, arguments), n.invert = u.invert && e, i()
				}
		}

		function Wi(t) {
			var n = 0,
				e = m_ / 3,
				r = Vi(t),
				i = r(n, e);
			return i.parallels = function (t) {
				return arguments.length ? r(n = t[0] * S_, e = t[1] * S_) : [n * M_, e * M_]
			}, i
		}

		function Gi(t) {
			function n(t, n) {
				return [t * e, R_(n) / e]
			}
			var e = A_(t);
			return n.invert = function (t, n) {
				return [t / e, _r(n * e)]
			}, n
		}

		function $i(t, n) {
			function e(t, n) {
				var e = q_(o - 2 * i * R_(n)) / i;
				return [e * R_(t *= i), u - e * A_(t)]
			}
			var r = R_(t),
				i = (r + R_(n)) / 2;
			if (T_(i) < y_) return Gi(t);
			var o = 1 + r * (2 * i - r),
				u = q_(o) / i;
			return e.invert = function (t, n) {
				var e = u - n;
				return [N_(t, T_(e)) / i * L_(e), _r((o - (t * t + e * e) * i * i) / (2 * i))]
			}, e
		}

		function Zi(t) {
			var n = t.length;
			return {
				point: function (e, r) {
					for (var i = -1; ++i < n;) t[i].point(e, r)
				},
				sphere: function () {
					for (var e = -1; ++e < n;) t[e].sphere()
				},
				lineStart: function () {
					for (var e = -1; ++e < n;) t[e].lineStart()
				},
				lineEnd: function () {
					for (var e = -1; ++e < n;) t[e].lineEnd()
				},
				polygonStart: function () {
					for (var e = -1; ++e < n;) t[e].polygonStart()
				},
				polygonEnd: function () {
					for (var e = -1; ++e < n;) t[e].polygonEnd()
				}
			}
		}

		function Qi(t) {
			return function (n, e) {
				var r = A_(n),
					i = A_(e),
					o = t(r * i);
				return [o * i * R_(n), o * R_(e)]
			}
		}

		function Ji(t) {
			return function (n, e) {
				var r = q_(n * n + e * e),
					i = t(r),
					o = R_(i),
					u = A_(i);
				return [N_(n * o, r * u), _r(r && e * o / r)]
			}
		}

		function Ki(t, n) {
			return [t, z_(D_((x_ + n) / 2))]
		}

		function to(t) {
			var n, e = Xi(t),
				r = e.scale,
				i = e.translate,
				o = e.clipExtent;
			return e.scale = function (t) {
				return arguments.length ? (r(t), n && e.clipExtent(null), e) : r()
			}, e.translate = function (t) {
				return arguments.length ? (i(t), n && e.clipExtent(null), e) : i()
			}, e.clipExtent = function (t) {
				if (!arguments.length) return n ? null : o();
				if (n = null == t) {
					var u = m_ * r(),
						a = i();
					t = [
						[a[0] - u, a[1] - u],
						[a[0] + u, a[1] + u]
					]
				}
				return o(t), e
			}, e.clipExtent(null)
		}

		function no(t) {
			return D_((x_ + t) / 2)
		}

		function eo(t, n) {
			function e(t, n) {
				o > 0 ? n < -x_ + y_ && (n = -x_ + y_) : n > x_ - y_ && (n = x_ - y_);
				var e = o / P_(no(n), i);
				return [e * R_(i * t), o - e * A_(i * t)]
			}
			var r = A_(t),
				i = t === n ? R_(t) : z_(r / A_(n)) / z_(no(n) / no(t)),
				o = r * P_(no(t), i) / i;
			return i ? (e.invert = function (t, n) {
				var e = o - n,
					r = L_(i) * q_(t * t + e * e);
				return [N_(t, T_(e)) / i * L_(e), 2 * k_(P_(o / r, 1 / i)) - x_]
			}, e) : Ki
		}

		function ro(t, n) {
			return [t, n]
		}

		function io(t, n) {
			function e(t, n) {
				var e = o - n,
					r = i * t;
				return [e * R_(r), o - e * A_(r)]
			}
			var r = A_(t),
				i = t === n ? R_(t) : (r - A_(n)) / (n - t),
				o = r / i + t;
			return T_(i) < y_ ? ro : (e.invert = function (t, n) {
				var e = o - n;
				return [N_(t, T_(e)) / i * L_(e), o - L_(i) * q_(t * t + e * e)]
			}, e)
		}

		function oo(t, n) {
			var e = A_(n),
				r = A_(t) * e;
			return [e * R_(t) / r, R_(n) / r]
		}

		function uo(t, n, e, r) {
			return 1 === t && 1 === n && 0 === e && 0 === r ? Sy : Ii({
				point: function (i, o) {
					this.stream.point(i * t + e, o * n + r)
				}
			})
		}

		function ao(t, n) {
			return [A_(n) * R_(t), R_(n)]
		}

		function co(t, n) {
			var e = A_(n),
				r = 1 + A_(t) * e;
			return [e * R_(t) / r, R_(n) / r]
		}

		function so(t, n) {
			return [z_(D_((x_ + n) / 2)), -t]
		}

		function lo(t, n) {
			return t.parent === n.parent ? 1 : 2
		}

		function fo(t) {
			return t.reduce(ho, 0) / t.length
		}

		function ho(t, n) {
			return t + n.x
		}

		function po(t) {
			return 1 + t.reduce(vo, 0)
		}

		function vo(t, n) {
			return Math.max(t, n.y)
		}

		function _o(t) {
			for (var n; n = t.children;) t = n[0];
			return t
		}

		function yo(t) {
			for (var n; n = t.children;) t = n[n.length - 1];
			return t
		}

		function go(t) {
			var n = 0,
				e = t.children,
				r = e && e.length;
			if (r)
				for (; --r >= 0;) n += e[r].value;
			else n = 1;
			t.value = n
		}

		function mo(t, n) {
			if (t === n) return t;
			var e = t.ancestors(),
				r = n.ancestors(),
				i = null;
			for (t = e.pop(), n = r.pop(); t === n;) i = t, t = e.pop(), n = r.pop();
			return i
		}

		function xo(t, n) {
			var e, r, i, o, u, a = new To(t),
				c = +t.value && (a.value = t.value),
				s = [a];
			for (null == n && (n = wo); e = s.pop();)
				if (c && (e.value = +e.data.value), (i = n(e.data)) && (u = i.length))
					for (e.children = new Array(u), o = u - 1; o >= 0; --o) s.push(r = e.children[o] = new To(i[o])), r.parent = e, r.depth = e.depth + 1;
			return a.eachBefore(So)
		}

		function bo() {
			return xo(this).eachBefore(Mo)
		}

		function wo(t) {
			return t.children
		}

		function Mo(t) {
			t.data = t.data.data
		}

		function So(t) {
			var n = 0;
			do t.height = n; while ((t = t.parent) && t.height < ++n)
		}

		function To(t) {
			this.data = t, this.depth = this.height = 0, this.parent = null
		}

		function ko(t) {
			this._ = t, this.next = null
		}

		function No(t, n) {
			var e = n.x - t.x,
				r = n.y - t.y,
				i = t.r - n.r;
			return i * i + 1e-6 > e * e + r * r
		}

		function Ao(t, n) {
			var e, r, i, o = null,
				u = t.head;
			switch (n.length) {
				case 1:
					e = Eo(n[0]);
					break;
				case 2:
					e = Co(n[0], n[1]);
					break;
				case 3:
					e = zo(n[0], n[1], n[2])
			}
			for (; u;) i = u._, r = u.next, e && No(e, i) ? o = u : (o ? (t.tail = o, o.next = null) : t.head = t.tail = null, n.push(i), e = Ao(t, n), n.pop(), t.head ? (u.next = t.head, t.head = u) : (u.next = null, t.head = t.tail = u), o = t.tail, o.next = r), u = r;
			return t.tail = o, e
		}

		function Eo(t) {
			return {
				x: t.x,
				y: t.y,
				r: t.r
			}
		}

		function Co(t, n) {
			var e = t.x,
				r = t.y,
				i = t.r,
				o = n.x,
				u = n.y,
				a = n.r,
				c = o - e,
				s = u - r,
				l = a - i,
				f = Math.sqrt(c * c + s * s);
			return {
				x: (e + o + c / f * l) / 2,
				y: (r + u + s / f * l) / 2,
				r: (f + i + a) / 2
			}
		}

		function zo(t, n, e) {
			var r = t.x,
				i = t.y,
				o = t.r,
				u = n.x,
				a = n.y,
				c = n.r,
				s = e.x,
				l = e.y,
				f = e.r,
				h = 2 * (r - u),
				p = 2 * (i - a),
				d = 2 * (c - o),
				v = r * r + i * i - o * o - u * u - a * a + c * c,
				_ = 2 * (r - s),
				y = 2 * (i - l),
				g = 2 * (f - o),
				m = r * r + i * i - o * o - s * s - l * l + f * f,
				x = _ * p - h * y,
				b = (p * m - y * v) / x - r,
				w = (y * d - p * g) / x,
				M = (_ * v - h * m) / x - i,
				S = (h * g - _ * d) / x,
				T = w * w + S * S - 1,
				k = 2 * (b * w + M * S + o),
				N = b * b + M * M - o * o,
				A = (-k - Math.sqrt(k * k - 4 * T * N)) / (2 * T);
			return {
				x: b + w * A + r,
				y: M + S * A + i,
				r: A
			}
		}

		function Po(t, n, e) {
			var r = t.x,
				i = t.y,
				o = n.r + e.r,
				u = t.r + e.r,
				a = n.x - r,
				c = n.y - i,
				s = a * a + c * c;
			if (s) {
				var l = .5 + ((u *= u) - (o *= o)) / (2 * s),
					f = Math.sqrt(Math.max(0, 2 * o * (u + s) - (u -= s) * u - o * o)) / (2 * s);
				e.x = r + l * a + f * c, e.y = i + l * c - f * a
			} else e.x = r + u, e.y = i
		}

		function Ro(t, n) {
			var e = n.x - t.x,
				r = n.y - t.y,
				i = t.r + n.r;
			return i * i - 1e-6 > e * e + r * r
		}

		function Lo(t, n) {
			for (var e = t._.r; t !== n;) e += 2 * (t = t.next)._.r;
			return e - n._.r
		}

		function qo(t, n, e) {
			var r = t.x - n,
				i = t.y - e;
			return r * r + i * i
		}

		function Do(t) {
			this._ = t, this.next = null, this.previous = null
		}

		function Oo(t) {
			if (!(i = t.length)) return 0;
			var n, e, r, i;
			if (n = t[0], n.x = 0, n.y = 0, !(i > 1)) return n.r;
			if (e = t[1], n.x = -e.r, e.x = n.r, e.y = 0, !(i > 2)) return n.r + e.r;
			Po(e, n, r = t[2]);
			var o, u, a, c, s, l, f, h = n.r * n.r,
				p = e.r * e.r,
				d = r.r * r.r,
				v = h + p + d,
				_ = h * n.x + p * e.x + d * r.x,
				y = h * n.y + p * e.y + d * r.y;
			n = new Do(n), e = new Do(e), r = new Do(r), n.next = r.previous = e, e.next = n.previous = r, r.next = e.previous = n;
			t: for (a = 3; a < i; ++a) {
				Po(n._, e._, r = t[a]), r = new Do(r), c = e.next, s = n.previous, l = e._.r, f = n._.r;
				do
					if (l <= f) {
						if (Ro(c._, r._)) {
							l + n._.r + e._.r > Lo(c, e) ? n = c : e = c, n.next = e, e.previous = n, --a;
							continue t
						}
						l += c._.r, c = c.next
					} else {
						if (Ro(s._, r._)) {
							Lo(n, s) > f + n._.r + e._.r ? n = s : e = s, n.next = e, e.previous = n, --a;
							continue t
						}
						f += s._.r, s = s.previous
					}
				while (c !== s.next);
				for (r.previous = n, r.next = e, n.next = e.previous = e = r, v += d = r._.r * r._.r, _ += d * r._.x, y += d * r._.y, h = qo(n._, o = _ / v, u = y / v);
					(r = r.next) !== e;)(d = qo(r._, o, u)) < h && (n = r, h = d);
				e = n.next
			}
			for (n = [e._], r = e;
				(r = r.next) !== e;) n.push(r._);
			for (r = Eg(n), a = 0; a < i; ++a) n = t[a], n.x -= r.x, n.y -= r.y;
			return r.r
		}

		function Uo(t) {
			return null == t ? null : Io(t)
		}

		function Io(t) {
			if ("function" != typeof t) throw new Error;
			return t
		}

		function Fo() {
			return 0
		}

		function Bo(t) {
			return Math.sqrt(t.value)
		}

		function Yo(t) {
			return function (n) {
				n.children || (n.r = Math.max(0, +t(n) || 0))
			}
		}

		function jo(t, n) {
			return function (e) {
				if (r = e.children) {
					var r, i, o, u = r.length,
						a = t(e) * n || 0;
					if (a)
						for (i = 0; i < u; ++i) r[i].r += a;
					if (o = Oo(r), a)
						for (i = 0; i < u; ++i) r[i].r -= a;
					e.r = o + a
				}
			}
		}

		function Ho(t) {
			return function (n) {
				var e = n.parent;
				n.r *= t, e && (n.x = e.x + t * n.x, n.y = e.y + t * n.y)
			}
		}

		function Xo(t) {
			return t.id
		}

		function Vo(t) {
			return t.parentId
		}

		function Wo(t, n) {
			return t.parent === n.parent ? 1 : 2
		}

		function Go(t) {
			var n = t.children;
			return n ? n[0] : t.t
		}

		function $o(t) {
			var n = t.children;
			return n ? n[n.length - 1] : t.t
		}

		function Zo(t, n, e) {
			var r = e / (n.i - t.i);
			n.c -= r, n.s += e, t.c += r, n.z += e, n.m += e
		}

		function Qo(t) {
			for (var n, e = 0, r = 0, i = t.children, o = i.length; --o >= 0;) n = i[o], n.z += e, n.m += e, e += n.s + (r += n.c)
		}

		function Jo(t, n, e) {
			return t.a.parent === n.parent ? t.a : e
		}

		function Ko(t, n) {
			this._ = t, this.parent = null, this.children = null, this.A = null, this.a = this, this.z = 0, this.m = 0, this.c = 0, this.s = 0, this.t = null, this.i = n
		}

		function tu(t) {
			for (var n, e, r, i, o, u = new Ko(t, 0), a = [u]; n = a.pop();)
				if (r = n._.children)
					for (n.children = new Array(o = r.length), i = o - 1; i >= 0; --i) a.push(e = n.children[i] = new Ko(r[i], i)), e.parent = n;
			return (u.parent = new Ko(null, 0)).children = [u], u
		}

		function nu(t, n, e, r, i, o) {
			for (var u, a, c, s, l, f, h, p, d, v, _, y = [], g = n.children, m = 0, x = 0, b = g.length, w = n.value; m < b;) {
				c = i - e, s = o - r;
				do l = g[x++].value; while (!l && x < b);
				for (f = h = l, v = Math.max(s / c, c / s) / (w * t), _ = l * l * v, d = Math.max(h / _, _ / f); x < b; ++x) {
					if (l += a = g[x].value, a < f && (f = a), a > h && (h = a), _ = l * l * v, p = Math.max(h / _, _ / f), p > d) {
						l -= a;
						break
					}
					d = p
				}
				y.push(u = {
					value: l,
					dice: c < s,
					children: g.slice(m, x)
				}), u.dice ? Lg(u, e, r, i, w ? r += s * l / w : o) : Bg(u, e, r, w ? e += c * l / w : i, o), w -= l, m = x
			}
			return y
		}

		function eu(t, n) {
			return t[0] - n[0] || t[1] - n[1]
		}

		function ru(t) {
			for (var n = t.length, e = [0, 1], r = 2, i = 2; i < n; ++i) {
				for (; r > 1 && Zg(t[e[r - 2]], t[e[r - 1]], t[i]) <= 0;)--r;
				e[r++] = i
			}
			return e.slice(0, r)
		}

		function iu(t) {
			if (!(t >= 1)) throw new Error;
			this._size = t, this._call = this._error = null, this._tasks = [], this._data = [], this._waiting = this._active = this._ended = this._start = 0
		}

		function ou(t) {
			if (!t._start) try {
				uu(t)
			} catch (n) {
				if (t._tasks[t._ended + t._active - 1]) cu(t, n);
				else if (!t._data) throw n
			}
		}

		function uu(t) {
			for (; t._start = t._waiting && t._active < t._size;) {
				var n = t._ended + t._active,
					e = t._tasks[n],
					r = e.length - 1,
					i = e[r];
				e[r] = au(t, n), --t._waiting, ++t._active, e = i.apply(null, e), t._tasks[n] && (t._tasks[n] = e || nm)
			}
		}

		function au(t, n) {
			return function (e, r) {
				t._tasks[n] && (--t._active, ++t._ended, t._tasks[n] = null, null == t._error && (null != e ? cu(t, e) : (t._data[n] = r, t._waiting ? ou(t) : su(t))))
			}
		}

		function cu(t, n) {
			var e, r = t._tasks.length;
			for (t._error = n, t._data = void 0, t._waiting = NaN; --r >= 0;)
				if ((e = t._tasks[r]) && (t._tasks[r] = null, e.abort)) try {
					e.abort()
				} catch (t) { }
			t._active = NaN, su(t)
		}

		function su(t) {
			if (!t._active && t._call) {
				var n = t._data;
				t._data = void 0, t._call(t._error, n)
			}
		}

		function lu(t) {
			return new iu(arguments.length ? +t : 1 / 0)
		}

		function fu(t) {
			return function (n, e) {
				t(null == n ? e : null)
			}
		}

		function hu(t) {
			var n = t.responseType;
			return n && "text" !== n ? t.response : t.responseText
		}

		function pu(t, n) {
			return function (e) {
				return t(e.responseText, n)
			}
		}

		function du(t) {
			function n(n) {
				var o = n + "",
					u = e.get(o);
				if (!u) {
					if (i !== xm) return i;
					e.set(o, u = r.push(n))
				}
				return t[(u - 1) % t.length]
			}
			var e = Fe(),
				r = [],
				i = xm;
			return t = null == t ? [] : mm.call(t), n.domain = function (t) {
				if (!arguments.length) return r.slice();
				r = [], e = Fe();
				for (var i, o, u = -1, a = t.length; ++u < a;) e.has(o = (i = t[u]) + "") || e.set(o, r.push(i));
				return n
			}, n.range = function (e) {
				return arguments.length ? (t = mm.call(e), n) : t.slice()
			}, n.unknown = function (t) {
				return arguments.length ? (i = t, n) : i
			}, n.copy = function () {
				return du().domain(r).range(t).unknown(i)
			}, n
		}

		function vu() {
			function t() {
				var t = i().length,
					r = u[1] < u[0],
					f = u[r - 0],
					h = u[1 - r];
				n = (h - f) / Math.max(1, t - c + 2 * s), a && (n = Math.floor(n)), f += (h - f - n * (t - c)) * l, e = n * (1 - c), a && (f = Math.round(f), e = Math.round(e));
				var p = Fs(t).map(function (t) {
					return f + n * t
				});
				return o(r ? p.reverse() : p)
			}
			var n, e, r = du().unknown(void 0),
				i = r.domain,
				o = r.range,
				u = [0, 1],
				a = !1,
				c = 0,
				s = 0,
				l = .5;
			return delete r.unknown, r.domain = function (n) {
				return arguments.length ? (i(n), t()) : i()
			}, r.range = function (n) {
				return arguments.length ? (u = [+n[0], +n[1]], t()) : u.slice()
			}, r.rangeRound = function (n) {
				return u = [+n[0], +n[1]], a = !0, t()
			}, r.bandwidth = function () {
				return e
			}, r.step = function () {
				return n
			}, r.round = function (n) {
				return arguments.length ? (a = !!n, t()) : a
			}, r.padding = function (n) {
				return arguments.length ? (c = s = Math.max(0, Math.min(1, n)), t()) : c
			}, r.paddingInner = function (n) {
				return arguments.length ? (c = Math.max(0, Math.min(1, n)), t()) : c
			}, r.paddingOuter = function (n) {
				return arguments.length ? (s = Math.max(0, Math.min(1, n)), t()) : s
			}, r.align = function (n) {
				return arguments.length ? (l = Math.max(0, Math.min(1, n)), t()) : l
			}, r.copy = function () {
				return vu().domain(i()).range(u).round(a).paddingInner(c).paddingOuter(s).align(l)
			}, t()
		}

		function _u(t) {
			var n = t.copy;
			return t.padding = t.paddingOuter, delete t.paddingInner, delete t.paddingOuter, t.copy = function () {
				return _u(n())
			}, t
		}

		function yu() {
			return _u(vu().paddingInner(1))
		}

		function gu(t, n) {
			return (n -= t = +t) ? function (e) {
				return (e - t) / n
			} : bm(n)
		}

		function mu(t) {
			return function (n, e) {
				var r = t(n = +n, e = +e);
				return function (t) {
					return t <= n ? 0 : t >= e ? 1 : r(t)
				}
			}
		}

		function xu(t) {
			return function (n, e) {
				var r = t(n = +n, e = +e);
				return function (t) {
					return t <= 0 ? n : t >= 1 ? e : r(t)
				}
			}
		}

		function bu(t, n, e, r) {
			var i = t[0],
				o = t[1],
				u = n[0],
				a = n[1];
			return o < i ? (i = e(o, i), u = r(a, u)) : (i = e(i, o), u = r(u, a)),
				function (t) {
					return u(i(t))
				}
		}

		function wu(t, n, e, r) {
			var i = Math.min(t.length, n.length) - 1,
				o = new Array(i),
				u = new Array(i),
				a = -1;
			for (t[i] < t[0] && (t = t.slice().reverse(), n = n.slice().reverse()); ++a < i;) o[a] = e(t[a], t[a + 1]), u[a] = r(n[a], n[a + 1]);
			return function (n) {
				var e = As(t, n, 1, i) - 1;
				return u[e](o[e](n))
			}
		}

		function Mu(t, n) {
			return n.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp())
		}

		function Su(t, n) {
			function e() {
				return i = Math.min(a.length, c.length) > 2 ? wu : bu, o = u = null, r
			}

			function r(n) {
				return (o || (o = i(a, c, l ? mu(t) : t, s)))(+n)
			}
			var i, o, u, a = Mm,
				c = Mm,
				s = mh,
				l = !1;
			return r.invert = function (t) {
				return (u || (u = i(c, a, gu, l ? xu(n) : n)))(+t)
			}, r.domain = function (t) {
				return arguments.length ? (a = gm.call(t, wm), e()) : a.slice()
			}, r.range = function (t) {
				return arguments.length ? (c = mm.call(t), e()) : c.slice()
			}, r.rangeRound = function (t) {
				return c = mm.call(t), s = xh, e()
			}, r.clamp = function (t) {
				return arguments.length ? (l = !!t, e()) : l
			}, r.interpolate = function (t) {
				return arguments.length ? (s = t, e()) : s
			}, e()
		}

		function Tu(t) {
			var n = t.domain;
			return t.ticks = function (t) {
				var e = n();
				return Hs(e[0], e[e.length - 1], null == t ? 10 : t)
			}, t.tickFormat = function (t, e) {
				return Sm(n(), t, e)
			}, t.nice = function (r) {
				var i = n(),
					o = i.length - 1,
					u = null == r ? 10 : r,
					a = i[0],
					c = i[o],
					s = e(a, c, u);
				return s && (s = e(Math.floor(a / s) * s, Math.ceil(c / s) * s, u), i[0] = Math.floor(a / s) * s, i[o] = Math.ceil(c / s) * s, n(i)), t
			}, t
		}

		function ku() {
			var t = Su(gu, dh);
			return t.copy = function () {
				return Mu(t, ku())
			}, Tu(t)
		}

		function Nu() {
			function t(t) {
				return +t
			}
			var n = [0, 1];
			return t.invert = t, t.domain = t.range = function (e) {
				return arguments.length ? (n = gm.call(e, wm), t) : n.slice()
			}, t.copy = function () {
				return Nu().domain(n)
			}, Tu(t)
		}

		function Au(t, n) {
			return (n = Math.log(n / t)) ? function (e) {
				return Math.log(e / t) / n
			} : bm(n)
		}

		function Eu(t, n) {
			return t < 0 ? function (e) {
				return -Math.pow(-n, e) * Math.pow(-t, 1 - e)
			} : function (e) {
				return Math.pow(n, e) * Math.pow(t, 1 - e)
			}
		}

		function Cu(t) {
			return isFinite(t) ? +("1e" + t) : t < 0 ? 0 : t
		}

		function zu(t) {
			return 10 === t ? Cu : t === Math.E ? Math.exp : function (n) {
				return Math.pow(t, n)
			}
		}

		function Pu(t) {
			return t === Math.E ? Math.log : 10 === t && Math.log10 || 2 === t && Math.log2 || (t = Math.log(t), function (n) {
				return Math.log(n) / t
			})
		}

		function Ru(t) {
			return function (n) {
				return -t(-n)
			}
		}

		function Lu() {
			function n() {
				return o = Pu(i), u = zu(i), r()[0] < 0 && (o = Ru(o), u = Ru(u)), e
			}
			var e = Su(Au, Eu).domain([1, 10]),
				r = e.domain,
				i = 10,
				o = Pu(10),
				u = zu(10);
			return e.base = function (t) {
				return arguments.length ? (i = +t, n()) : i
			}, e.domain = function (t) {
				return arguments.length ? (r(t), n()) : r()
			}, e.ticks = function (t) {
				var n, e = r(),
					a = e[0],
					c = e[e.length - 1];
				(n = c < a) && (h = a, a = c, c = h);
				var s, l, f, h = o(a),
					p = o(c),
					d = null == t ? 10 : +t,
					v = [];
				if (!(i % 1) && p - h < d) {
					if (h = Math.round(h) - 1, p = Math.round(p) + 1, a > 0) {
						for (; h < p; ++h)
							for (l = 1, s = u(h); l < i; ++l)
								if (f = s * l, !(f < a)) {
									if (f > c) break;
									v.push(f)
								}
					} else
						for (; h < p; ++h)
							for (l = i - 1, s = u(h); l >= 1; --l)
								if (f = s * l, !(f < a)) {
									if (f > c) break;
									v.push(f)
								}
				} else v = Hs(h, p, Math.min(p - h, d)).map(u);
				return n ? v.reverse() : v
			}, e.tickFormat = function (n, r) {
				if (null == r && (r = 10 === i ? ".0e" : ","), "function" != typeof r && (r = t.format(r)), n === 1 / 0) return r;
				null == n && (n = 10);
				var a = Math.max(1, i * n / e.ticks().length);
				return function (t) {
					var n = t / u(Math.round(o(t)));
					return n * i < i - .5 && (n *= i), n <= a ? r(t) : ""
				}
			}, e.nice = function () {
				return r(Tm(r(), {
					floor: function (t) {
						return u(Math.floor(o(t)))
					},
					ceil: function (t) {
						return u(Math.ceil(o(t)))
					}
				}))
			}, e.copy = function () {
				return Mu(e, Lu().base(i))
			}, e
		}

		function qu(t, n) {
			return t < 0 ? -Math.pow(-t, n) : Math.pow(t, n)
		}

		function Du() {
			function t(t, n) {
				return (n = qu(n, e) - (t = qu(t, e))) ? function (r) {
					return (qu(r, e) - t) / n
				} : bm(n)
			}

			function n(t, n) {
				return n = qu(n, e) - (t = qu(t, e)),
					function (r) {
						return qu(t + n * r, 1 / e)
					}
			}
			var e = 1,
				r = Su(t, n),
				i = r.domain;
			return r.exponent = function (t) {
				return arguments.length ? (e = +t, i(i())) : e
			}, r.copy = function () {
				return Mu(r, Du().exponent(e))
			}, Tu(r)
		}

		function Ou() {
			return Du().exponent(.5)
		}

		function Uu() {
			function t() {
				var t = 0,
					o = Math.max(1, r.length);
				for (i = new Array(o - 1); ++t < o;) i[t - 1] = Ws(e, t / o);
				return n
			}

			function n(t) {
				if (!isNaN(t = +t)) return r[As(i, t)]
			}
			var e = [],
				r = [],
				i = [];
			return n.invertExtent = function (t) {
				var n = r.indexOf(t);
				return n < 0 ? [NaN, NaN] : [n > 0 ? i[n - 1] : e[0], n < i.length ? i[n] : e[e.length - 1]]
			}, n.domain = function (n) {
				if (!arguments.length) return e.slice();
				e = [];
				for (var r, i = 0, o = n.length; i < o; ++i) r = n[i], null == r || isNaN(r = +r) || e.push(r);
				return e.sort(Ts), t()
			}, n.range = function (n) {
				return arguments.length ? (r = mm.call(n), t()) : r.slice()
			}, n.quantiles = function () {
				return i.slice()
			}, n.copy = function () {
				return Uu().domain(e).range(r)
			}, n
		}

		function Iu() {
			function t(t) {
				if (t <= t) return u[As(o, t, 0, i)]
			}

			function n() {
				var n = -1;
				for (o = new Array(i); ++n < i;) o[n] = ((n + 1) * r - (n - i) * e) / (i + 1);
				return t
			}
			var e = 0,
				r = 1,
				i = 1,
				o = [.5],
				u = [0, 1];
			return t.domain = function (t) {
				return arguments.length ? (e = +t[0], r = +t[1], n()) : [e, r]
			}, t.range = function (t) {
				return arguments.length ? (i = (u = mm.call(t)).length - 1, n()) : u.slice()
			}, t.invertExtent = function (t) {
				var n = u.indexOf(t);
				return n < 0 ? [NaN, NaN] : n < 1 ? [e, o[0]] : n >= i ? [o[i - 1], r] : [o[n - 1], o[n]]
			}, t.copy = function () {
				return Iu().domain([e, r]).range(u)
			}, Tu(t)
		}

		function Fu() {
			function t(t) {
				if (t <= t) return e[As(n, t, 0, r)]
			}
			var n = [.5],
				e = [0, 1],
				r = 1;
			return t.domain = function (i) {
				return arguments.length ? (n = mm.call(i), r = Math.min(n.length, e.length - 1), t) : n.slice()
			}, t.range = function (i) {
				return arguments.length ? (e = mm.call(i), r = Math.min(n.length, e.length - 1), t) : e.slice()
			}, t.invertExtent = function (t) {
				var r = e.indexOf(t);
				return [n[r - 1], n[r]]
			}, t.copy = function () {
				return Fu().domain(n).range(e)
			}, t
		}

		function Bu(t, n, e, r) {
			function i(n) {
				return t(n = new Date(+n)), n
			}
			return i.floor = i, i.ceil = function (e) {
				return t(e = new Date(e - 1)), n(e, 1), t(e), e
			}, i.round = function (t) {
				var n = i(t),
					e = i.ceil(t);
				return t - n < e - t ? n : e
			}, i.offset = function (t, e) {
				return n(t = new Date(+t), null == e ? 1 : Math.floor(e)), t
			}, i.range = function (e, r, o) {
				var u = [];
				if (e = i.ceil(e), o = null == o ? 1 : Math.floor(o), !(e < r && o > 0)) return u;
				do u.push(new Date(+e)); while (n(e, o), t(e), e < r);
				return u
			}, i.filter = function (e) {
				return Bu(function (n) {
					if (n >= n)
						for (; t(n), !e(n);) n.setTime(n - 1)
				}, function (t, r) {
					if (t >= t)
						for (; --r >= 0;)
							for (; n(t, 1), !e(t););
				})
			}, e && (i.count = function (n, r) {
				return km.setTime(+n), Nm.setTime(+r), t(km), t(Nm), Math.floor(e(km, Nm))
			}, i.every = function (t) {
				return t = Math.floor(t), isFinite(t) && t > 0 ? t > 1 ? i.filter(r ? function (n) {
					return r(n) % t === 0
				} : function (n) {
					return i.count(0, n) % t === 0
				}) : i : null
			}), i
		}

		function Yu(t) {
			return Bu(function (n) {
				n.setDate(n.getDate() - (n.getDay() + 7 - t) % 7), n.setHours(0, 0, 0, 0)
			}, function (t, n) {
				t.setDate(t.getDate() + 7 * n)
			}, function (t, n) {
				return (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * zm) / Lm
			})
		}

		function ju(t) {
			return Bu(function (n) {
				n.setUTCDate(n.getUTCDate() - (n.getUTCDay() + 7 - t) % 7), n.setUTCHours(0, 0, 0, 0)
			}, function (t, n) {
				t.setUTCDate(t.getUTCDate() + 7 * n)
			}, function (t, n) {
				return (n - t) / Lm
			})
		}

		function Hu(t) {
			if (0 <= t.y && t.y < 100) {
				var n = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
				return n.setFullYear(t.y), n
			}
			return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L)
		}

		function Xu(t) {
			if (0 <= t.y && t.y < 100) {
				var n = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
				return n.setUTCFullYear(t.y), n
			}
			return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L))
		}

		function Vu(t) {
			return {
				y: t,
				m: 0,
				d: 1,
				H: 0,
				M: 0,
				S: 0,
				L: 0
			}
		}

		function Wu(t) {
			function n(t, n) {
				return function (e) {
					var r, i, o, u = [],
						a = -1,
						c = 0,
						s = t.length;
					for (e instanceof Date || (e = new Date(+e)); ++a < s;) 37 === t.charCodeAt(a) && (u.push(t.slice(c, a)), null != (i = Px[r = t.charAt(++a)]) ? r = t.charAt(++a) : i = "e" === r ? " " : "0", (o = n[r]) && (r = o(e, i)), u.push(r), c = a + 1);
					return u.push(t.slice(c, a)), u.join("")
				}
			}

			function e(t, n) {
				return function (e) {
					var i = Vu(1900),
						o = r(i, t, e += "", 0);
					if (o != e.length) return null;
					if ("p" in i && (i.H = i.H % 12 + 12 * i.p), "W" in i || "U" in i) {
						"w" in i || (i.w = "W" in i ? 1 : 0);
						var u = "Z" in i ? Xu(Vu(i.y)).getUTCDay() : n(Vu(i.y)).getDay();
						i.m = 0, i.d = "W" in i ? (i.w + 6) % 7 + 7 * i.W - (u + 5) % 7 : i.w + 7 * i.U - (u + 6) % 7
					}
					return "Z" in i ? (i.H += i.Z / 100 | 0, i.M += i.Z % 100, Xu(i)) : n(i)
				}
			}

			function r(t, n, e, r) {
				for (var i, o, u = 0, a = n.length, c = e.length; u < a;) {
					if (r >= c) return -1;
					if (i = n.charCodeAt(u++), 37 === i) {
						if (i = n.charAt(u++), o = Y[i in Px ? n.charAt(u++) : i], !o || (r = o(t, e, r)) < 0) return -1
					} else if (i != e.charCodeAt(r++)) return -1
				}
				return r
			}

			function i(t, n, e) {
				var r = C.exec(n.slice(e));
				return r ? (t.p = z[r[0].toLowerCase()], e + r[0].length) : -1
			}

			function o(t, n, e) {
				var r = L.exec(n.slice(e));
				return r ? (t.w = q[r[0].toLowerCase()], e + r[0].length) : -1
			}

			function u(t, n, e) {
				var r = P.exec(n.slice(e));
				return r ? (t.w = R[r[0].toLowerCase()], e + r[0].length) : -1
			}

			function a(t, n, e) {
				var r = U.exec(n.slice(e));
				return r ? (t.m = I[r[0].toLowerCase()], e + r[0].length) : -1
			}

			function c(t, n, e) {
				var r = D.exec(n.slice(e));
				return r ? (t.m = O[r[0].toLowerCase()], e + r[0].length) : -1
			}

			function s(t, n, e) {
				return r(t, w, n, e)
			}

			function l(t, n, e) {
				return r(t, M, n, e)
			}

			function f(t, n, e) {
				return r(t, S, n, e)
			}

			function h(t) {
				return N[t.getDay()]
			}

			function p(t) {
				return k[t.getDay()]
			}

			function d(t) {
				return E[t.getMonth()]
			}

			function v(t) {
				return A[t.getMonth()]
			}

			function _(t) {
				return T[+(t.getHours() >= 12)]
			}

			function y(t) {
				return N[t.getUTCDay()]
			}

			function g(t) {
				return k[t.getUTCDay()]
			}

			function m(t) {
				return E[t.getUTCMonth()]
			}

			function x(t) {
				return A[t.getUTCMonth()]
			}

			function b(t) {
				return T[+(t.getUTCHours() >= 12)]
			}
			var w = t.dateTime,
				M = t.date,
				S = t.time,
				T = t.periods,
				k = t.days,
				N = t.shortDays,
				A = t.months,
				E = t.shortMonths,
				C = Zu(T),
				z = Qu(T),
				P = Zu(k),
				R = Qu(k),
				L = Zu(N),
				q = Qu(N),
				D = Zu(A),
				O = Qu(A),
				U = Zu(E),
				I = Qu(E),
				F = {
					a: h,
					A: p,
					b: d,
					B: v,
					c: null,
					d: ha,
					e: ha,
					H: pa,
					I: da,
					j: va,
					L: _a,
					m: ya,
					M: ga,
					p: _,
					S: ma,
					U: xa,
					w: ba,
					W: wa,
					x: null,
					X: null,
					y: Ma,
					Y: Sa,
					Z: Ta,
					"%": Fa
				},
				B = {
					a: y,
					A: g,
					b: m,
					B: x,
					c: null,
					d: ka,
					e: ka,
					H: Na,
					I: Aa,
					j: Ea,
					L: Ca,
					m: za,
					M: Pa,
					p: b,
					S: Ra,
					U: La,
					w: qa,
					W: Da,
					x: null,
					X: null,
					y: Oa,
					Y: Ua,
					Z: Ia,
					"%": Fa
				},
				Y = {
					a: o,
					A: u,
					b: a,
					B: c,
					c: s,
					d: oa,
					e: oa,
					H: aa,
					I: aa,
					j: ua,
					L: la,
					m: ia,
					M: ca,
					p: i,
					S: sa,
					U: Ku,
					w: Ju,
					W: ta,
					x: l,
					X: f,
					y: ea,
					Y: na,
					Z: ra,
					"%": fa
				};
			return F.x = n(M, F), F.X = n(S, F), F.c = n(w, F), B.x = n(M, B), B.X = n(S, B), B.c = n(w, B), {
				format: function (t) {
					var e = n(t += "", F);
					return e.toString = function () {
						return t
					}, e
				},
				parse: function (t) {
					var n = e(t += "", Hu);
					return n.toString = function () {
						return t
					}, n
				},
				utcFormat: function (t) {
					var e = n(t += "", B);
					return e.toString = function () {
						return t
					}, e
				},
				utcParse: function (t) {
					var n = e(t, Xu);
					return n.toString = function () {
						return t
					}, n
				}
			}
		}

		function Gu(t, n, e) {
			var r = t < 0 ? "-" : "",
				i = (r ? -t : t) + "",
				o = i.length;
			return r + (o < e ? new Array(e - o + 1).join(n) + i : i)
		}

		function $u(t) {
			return t.replace(qx, "\\$&")
		}

		function Zu(t) {
			return new RegExp("^(?:" + t.map($u).join("|") + ")", "i")
		}

		function Qu(t) {
			for (var n = {}, e = -1, r = t.length; ++e < r;) n[t[e].toLowerCase()] = e;
			return n
		}

		function Ju(t, n, e) {
			var r = Rx.exec(n.slice(e, e + 1));
			return r ? (t.w = +r[0], e + r[0].length) : -1
		}

		function Ku(t, n, e) {
			var r = Rx.exec(n.slice(e));
			return r ? (t.U = +r[0], e + r[0].length) : -1
		}

		function ta(t, n, e) {
			var r = Rx.exec(n.slice(e));
			return r ? (t.W = +r[0], e + r[0].length) : -1
		}

		function na(t, n, e) {
			var r = Rx.exec(n.slice(e, e + 4));
			return r ? (t.y = +r[0], e + r[0].length) : -1
		}

		function ea(t, n, e) {
			var r = Rx.exec(n.slice(e, e + 2));
			return r ? (t.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3), e + r[0].length) : -1
		}

		function ra(t, n, e) {
			var r = /^(Z)|([+-]\d\d)(?:\:?(\d\d))?/.exec(n.slice(e, e + 6));
			return r ? (t.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")), e + r[0].length) : -1
		}

		function ia(t, n, e) {
			var r = Rx.exec(n.slice(e, e + 2));
			return r ? (t.m = r[0] - 1, e + r[0].length) : -1
		}

		function oa(t, n, e) {
			var r = Rx.exec(n.slice(e, e + 2));
			return r ? (t.d = +r[0], e + r[0].length) : -1
		}

		function ua(t, n, e) {
			var r = Rx.exec(n.slice(e, e + 3));
			return r ? (t.m = 0, t.d = +r[0], e + r[0].length) : -1
		}

		function aa(t, n, e) {
			var r = Rx.exec(n.slice(e, e + 2));
			return r ? (t.H = +r[0], e + r[0].length) : -1
		}

		function ca(t, n, e) {
			var r = Rx.exec(n.slice(e, e + 2));
			return r ? (t.M = +r[0], e + r[0].length) : -1
		}

		function sa(t, n, e) {
			var r = Rx.exec(n.slice(e, e + 2));
			return r ? (t.S = +r[0], e + r[0].length) : -1
		}

		function la(t, n, e) {
			var r = Rx.exec(n.slice(e, e + 3));
			return r ? (t.L = +r[0], e + r[0].length) : -1
		}

		function fa(t, n, e) {
			var r = Lx.exec(n.slice(e, e + 1));
			return r ? e + r[0].length : -1
		}

		function ha(t, n) {
			return Gu(t.getDate(), n, 2)
		}

		function pa(t, n) {
			return Gu(t.getHours(), n, 2)
		}

		function da(t, n) {
			return Gu(t.getHours() % 12 || 12, n, 2)
		}

		function va(t, n) {
			return Gu(1 + Bm.count(ox(t), t), n, 3)
		}

		function _a(t, n) {
			return Gu(t.getMilliseconds(), n, 3)
		}

		function ya(t, n) {
			return Gu(t.getMonth() + 1, n, 2)
		}

		function ga(t, n) {
			return Gu(t.getMinutes(), n, 2)
		}

		function ma(t, n) {
			return Gu(t.getSeconds(), n, 2)
		}

		function xa(t, n) {
			return Gu(jm.count(ox(t), t), n, 2)
		}

		function ba(t) {
			return t.getDay()
		}

		function wa(t, n) {
			return Gu(Hm.count(ox(t), t), n, 2)
		}

		function Ma(t, n) {
			return Gu(t.getFullYear() % 100, n, 2)
		}

		function Sa(t, n) {
			return Gu(t.getFullYear() % 1e4, n, 4)
		}

		function Ta(t) {
			var n = t.getTimezoneOffset();
			return (n > 0 ? "-" : (n *= -1, "+")) + Gu(n / 60 | 0, "0", 2) + Gu(n % 60, "0", 2)
		}

		function ka(t, n) {
			return Gu(t.getUTCDate(), n, 2)
		}

		function Na(t, n) {
			return Gu(t.getUTCHours(), n, 2)
		}

		function Aa(t, n) {
			return Gu(t.getUTCHours() % 12 || 12, n, 2)
		}

		function Ea(t, n) {
			return Gu(1 + fx.count(Ex(t), t), n, 3)
		}

		function Ca(t, n) {
			return Gu(t.getUTCMilliseconds(), n, 3)
		}

		function za(t, n) {
			return Gu(t.getUTCMonth() + 1, n, 2)
		}

		function Pa(t, n) {
			return Gu(t.getUTCMinutes(), n, 2)
		}

		function Ra(t, n) {
			return Gu(t.getUTCSeconds(), n, 2)
		}

		function La(t, n) {
			return Gu(px.count(Ex(t), t), n, 2)
		}

		function qa(t) {
			return t.getUTCDay()
		}

		function Da(t, n) {
			return Gu(dx.count(Ex(t), t), n, 2)
		}

		function Oa(t, n) {
			return Gu(t.getUTCFullYear() % 100, n, 2)
		}

		function Ua(t, n) {
			return Gu(t.getUTCFullYear() % 1e4, n, 4)
		}

		function Ia() {
			return "+0000"
		}

		function Fa() {
			return "%"
		}

		function Ba(n) {
			return Cx = Wu(n), t.timeFormat = Cx.format, t.timeParse = Cx.parse, t.utcFormat = Cx.utcFormat, t.utcParse = Cx.utcParse, Cx
		}

		function Ya(t) {
			return t.toISOString()
		}

		function ja(t) {
			var n = new Date(t);
			return isNaN(n) ? null : n
		}

		function Ha(t) {
			return new Date(t)
		}

		function Xa(t) {
			return t instanceof Date ? +t : +new Date(+t)
		}

		function Va(t, n, r, i, o, u, a, c, s) {
			function l(e) {
				return (a(e) < e ? v : u(e) < e ? _ : o(e) < e ? y : i(e) < e ? g : n(e) < e ? r(e) < e ? m : x : t(e) < e ? b : w)(e)
			}

			function f(n, r, i, o) {
				if (null == n && (n = 10), "number" == typeof n) {
					var u = Math.abs(i - r) / n,
						a = ks(function (t) {
							return t[2]
						}).right(M, u);
					a === M.length ? (o = e(r / Xx, i / Xx, n), n = t) : a ? (a = M[u / M[a - 1][2] < M[a][2] / u ? a - 1 : a], o = a[1], n = a[0]) : (o = e(r, i, n), n = c)
				}
				return null == o ? n : n.every(o)
			}
			var h = Su(gu, dh),
				p = h.invert,
				d = h.domain,
				v = s(".%L"),
				_ = s(":%S"),
				y = s("%I:%M"),
				g = s("%I %p"),
				m = s("%a %d"),
				x = s("%b %d"),
				b = s("%B"),
				w = s("%Y"),
				M = [
					[a, 1, Ix],
					[a, 5, 5 * Ix],
					[a, 15, 15 * Ix],
					[a, 30, 30 * Ix],
					[u, 1, Fx],
					[u, 5, 5 * Fx],
					[u, 15, 15 * Fx],
					[u, 30, 30 * Fx],
					[o, 1, Bx],
					[o, 3, 3 * Bx],
					[o, 6, 6 * Bx],
					[o, 12, 12 * Bx],
					[i, 1, Yx],
					[i, 2, 2 * Yx],
					[r, 1, jx],
					[n, 1, Hx],
					[n, 3, 3 * Hx],
					[t, 1, Xx]
				];
			return h.invert = function (t) {
				return new Date(p(t))
			}, h.domain = function (t) {
				return arguments.length ? d(gm.call(t, Xa)) : d().map(Ha)
			}, h.ticks = function (t, n) {
				var e, r = d(),
					i = r[0],
					o = r[r.length - 1],
					u = o < i;
				return u && (e = i, i = o, o = e), e = f(t, i, o, n), e = e ? e.range(i, o + 1) : [], u ? e.reverse() : e
			}, h.tickFormat = function (t, n) {
				return null == n ? l : s(n)
			}, h.nice = function (t, n) {
				var e = d();
				return (t = f(t, e[0], e[e.length - 1], n)) ? d(Tm(e, t)) : h
			}, h.copy = function () {
				return Mu(h, Va(t, n, r, i, o, u, a, c, s))
			}, h
		}

		function Wa(t) {
			var n = t.length;
			return function (e) {
				return t[Math.max(0, Math.min(n - 1, Math.floor(e * n)))]
			}
		}

		function Ga(t) {
			function n(n) {
				var o = (n - e) / (r - e);
				return t(i ? Math.max(0, Math.min(1, o)) : o)
			}
			var e = 0,
				r = 1,
				i = !1;
			return n.domain = function (t) {
				return arguments.length ? (e = +t[0], r = +t[1], n) : [e, r]
			}, n.clamp = function (t) {
				return arguments.length ? (i = !!t, n) : i
			}, n.interpolator = function (e) {
				return arguments.length ? (t = e, n) : t
			}, n.copy = function () {
				return Ga(t).domain([e, r]).clamp(i)
			}, Tu(n)
		}

		function $a(t) {
			return t.innerRadius
		}

		function Za(t) {
			return t.outerRadius
		}

		function Qa(t) {
			return t.startAngle
		}

		function Ja(t) {
			return t.endAngle
		}

		function Ka(t) {
			return t && t.padAngle
		}

		function tc(t) {
			return t >= 1 ? fb : t <= -1 ? -fb : Math.asin(t)
		}

		function nc(t, n, e, r, i, o, u, a) {
			var c = e - t,
				s = r - n,
				l = u - i,
				f = a - o,
				h = (l * (n - o) - f * (t - i)) / (f * c - l * s);
			return [t + h * c, n + h * s]
		}

		function ec(t, n, e, r, i, o, u) {
			var a = t - e,
				c = n - r,
				s = (u ? o : -o) / Math.sqrt(a * a + c * c),
				l = s * c,
				f = -s * a,
				h = t + l,
				p = n + f,
				d = e + l,
				v = r + f,
				_ = (h + d) / 2,
				y = (p + v) / 2,
				g = d - h,
				m = v - p,
				x = g * g + m * m,
				b = i - o,
				w = h * v - d * p,
				M = (m < 0 ? -1 : 1) * Math.sqrt(Math.max(0, b * b * x - w * w)),
				S = (w * m - g * M) / x,
				T = (-w * g - m * M) / x,
				k = (w * m + g * M) / x,
				N = (-w * g + m * M) / x,
				A = S - _,
				E = T - y,
				C = k - _,
				z = N - y;
			return A * A + E * E > C * C + z * z && (S = k, T = N), {
				cx: S,
				cy: T,
				x01: -l,
				y01: -f,
				x11: S * (i / b - 1),
				y11: T * (i / b - 1)
			}
		}

		function rc(t) {
			this._context = t
		}

		function ic(t) {
			return t[0]
		}

		function oc(t) {
			return t[1]
		}

		function uc(t) {
			this._curve = t
		}

		function ac(t) {
			function n(n) {
				return new uc(t(n))
			}
			return n._curve = t, n
		}

		function cc(t) {
			var n = t.curve;
			return t.angle = t.x, delete t.x, t.radius = t.y, delete t.y, t.curve = function (t) {
				return arguments.length ? n(ac(t)) : n()._curve
			}, t
		}

		function sc(t, n, e) {
			t._context.bezierCurveTo((2 * t._x0 + t._x1) / 3, (2 * t._y0 + t._y1) / 3, (t._x0 + 2 * t._x1) / 3, (t._y0 + 2 * t._y1) / 3, (t._x0 + 4 * t._x1 + n) / 6, (t._y0 + 4 * t._y1 + e) / 6)
		}

		function lc(t) {
			this._context = t
		}

		function fc(t) {
			this._context = t
		}

		function hc(t) {
			this._context = t
		}

		function pc(t, n) {
			this._basis = new lc(t), this._beta = n
		}

		function dc(t, n, e) {
			t._context.bezierCurveTo(t._x1 + t._k * (t._x2 - t._x0), t._y1 + t._k * (t._y2 - t._y0), t._x2 + t._k * (t._x1 - n), t._y2 + t._k * (t._y1 - e), t._x2, t._y2)
		}

		function vc(t, n) {
			this._context = t, this._k = (1 - n) / 6
		}

		function _c(t, n) {
			this._context = t, this._k = (1 - n) / 6
		}

		function yc(t, n) {
			this._context = t, this._k = (1 - n) / 6
		}

		function gc(t, n, e) {
			var r = t._x1,
				i = t._y1,
				o = t._x2,
				u = t._y2;
			if (t._l01_a > sb) {
				var a = 2 * t._l01_2a + 3 * t._l01_a * t._l12_a + t._l12_2a,
					c = 3 * t._l01_a * (t._l01_a + t._l12_a);
				r = (r * a - t._x0 * t._l12_2a + t._x2 * t._l01_2a) / c, i = (i * a - t._y0 * t._l12_2a + t._y2 * t._l01_2a) / c
			}
			if (t._l23_a > sb) {
				var s = 2 * t._l23_2a + 3 * t._l23_a * t._l12_a + t._l12_2a,
					l = 3 * t._l23_a * (t._l23_a + t._l12_a);
				o = (o * s + t._x1 * t._l23_2a - n * t._l12_2a) / l, u = (u * s + t._y1 * t._l23_2a - e * t._l12_2a) / l
			}
			t._context.bezierCurveTo(r, i, o, u, t._x2, t._y2)
		}

		function mc(t, n) {
			this._context = t, this._alpha = n
		}

		function xc(t, n) {
			this._context = t, this._alpha = n
		}

		function bc(t, n) {
			this._context = t, this._alpha = n
		}

		function wc(t) {
			this._context = t
		}

		function Mc(t) {
			return t < 0 ? -1 : 1
		}

		function Sc(t, n, e) {
			var r = t._x1 - t._x0,
				i = n - t._x1,
				o = (t._y1 - t._y0) / (r || i < 0 && -0),
				u = (e - t._y1) / (i || r < 0 && -0),
				a = (o * i + u * r) / (r + i);
			return (Mc(o) + Mc(u)) * Math.min(Math.abs(o), Math.abs(u), .5 * Math.abs(a)) || 0
		}

		function Tc(t, n) {
			var e = t._x1 - t._x0;
			return e ? (3 * (t._y1 - t._y0) / e - n) / 2 : n
		}

		function kc(t, n, e) {
			var r = t._x0,
				i = t._y0,
				o = t._x1,
				u = t._y1,
				a = (o - r) / 3;
			t._context.bezierCurveTo(r + a, i + a * n, o - a, u - a * e, o, u)
		}

		function Nc(t) {
			this._context = t
		}

		function Ac(t) {
			this._context = new Ec(t)
		}

		function Ec(t) {
			this._context = t
		}

		function Cc(t) {
			return new Nc(t)
		}

		function zc(t) {
			return new Ac(t)
		}

		function Pc(t) {
			this._context = t
		}

		function Rc(t) {
			var n, e, r = t.length - 1,
				i = new Array(r),
				o = new Array(r),
				u = new Array(r);
			for (i[0] = 0, o[0] = 2, u[0] = t[0] + 2 * t[1], n = 1; n < r - 1; ++n) i[n] = 1, o[n] = 4, u[n] = 4 * t[n] + 2 * t[n + 1];
			for (i[r - 1] = 2, o[r - 1] = 7, u[r - 1] = 8 * t[r - 1] + t[r], n = 1; n < r; ++n) e = i[n] / o[n - 1], o[n] -= e, u[n] -= e * u[n - 1];
			for (i[r - 1] = u[r - 1] / o[r - 1], n = r - 2; n >= 0; --n) i[n] = (u[n] - i[n + 1]) / o[n];
			for (o[r - 1] = (t[r] + i[r - 1]) / 2, n = 0; n < r - 1; ++n) o[n] = 2 * t[n + 1] - i[n + 1];
			return [i, o]
		}

		function Lc(t, n) {
			this._context = t, this._t = n
		}

		function qc(t) {
			return new Lc(t, 0)
		}

		function Dc(t) {
			return new Lc(t, 1)
		}

		function Oc(t, n) {
			return t[n]
		}

		function Uc(t) {
			for (var n, e = 0, r = -1, i = t.length; ++r < i;)(n = +t[r][1]) && (e += n);
			return e
		}

		function Ic(t) {
			return t[0]
		}

		function Fc(t) {
			return t[1]
		}

		function Bc() {
			this._ = null
		}

		function Yc(t) {
			t.U = t.C = t.L = t.R = t.P = t.N = null
		}

		function jc(t, n) {
			var e = n,
				r = n.R,
				i = e.U;
			i ? i.L === e ? i.L = r : i.R = r : t._ = r, r.U = i, e.U = r, e.R = r.L, e.R && (e.R.U = e), r.L = e
		}

		function Hc(t, n) {
			var e = n,
				r = n.L,
				i = e.U;
			i ? i.L === e ? i.L = r : i.R = r : t._ = r, r.U = i, e.U = r, e.L = r.R, e.L && (e.L.U = e), r.R = e
		}

		function Xc(t) {
			for (; t.L;) t = t.L;
			return t
		}

		function Vc(t, n, e, r) {
			var i = [null, null],
				o = mw.push(i) - 1;
			return i.left = t, i.right = n, e && Gc(i, t, n, e), r && Gc(i, n, t, r), yw[t.index].halfedges.push(o), yw[n.index].halfedges.push(o), i
		}

		function Wc(t, n, e) {
			var r = [n, e];
			return r.left = t, r
		}

		function Gc(t, n, e, r) {
			t[0] || t[1] ? t.left === e ? t[1] = r : t[0] = r : (t[0] = r, t.left = n, t.right = e)
		}

		function $c(t, n, e, r, i) {
			var o, u = t[0],
				a = t[1],
				c = u[0],
				s = u[1],
				l = a[0],
				f = a[1],
				h = 0,
				p = 1,
				d = l - c,
				v = f - s;
			if (o = n - c, d || !(o > 0)) {
				if (o /= d, d < 0) {
					if (o < h) return;
					o < p && (p = o)
				} else if (d > 0) {
					if (o > p) return;
					o > h && (h = o)
				}
				if (o = r - c, d || !(o < 0)) {
					if (o /= d, d < 0) {
						if (o > p) return;
						o > h && (h = o)
					} else if (d > 0) {
						if (o < h) return;
						o < p && (p = o)
					}
					if (o = e - s, v || !(o > 0)) {
						if (o /= v, v < 0) {
							if (o < h) return;
							o < p && (p = o)
						} else if (v > 0) {
							if (o > p) return;
							o > h && (h = o)
						}
						if (o = i - s, v || !(o < 0)) {
							if (o /= v, v < 0) {
								if (o > p) return;
								o > h && (h = o)
							} else if (v > 0) {
								if (o < h) return;
								o < p && (p = o)
							}
							return !(h > 0 || p < 1) || (h > 0 && (t[0] = [c + h * d, s + h * v]), p < 1 && (t[1] = [c + p * d, s + p * v]), !0)
						}
					}
				}
			}
		}

		function Zc(t, n, e, r, i) {
			var o = t[1];
			if (o) return !0;
			var u, a, c = t[0],
				s = t.left,
				l = t.right,
				f = s[0],
				h = s[1],
				p = l[0],
				d = l[1],
				v = (f + p) / 2,
				_ = (h + d) / 2;
			if (d === h) {
				if (v < n || v >= r) return;
				if (f > p) {
					if (c) {
						if (c[1] >= i) return
					} else c = [v, e];
					o = [v, i]
				} else {
					if (c) {
						if (c[1] < e) return
					} else c = [v, i];
					o = [v, e]
				}
			} else if (u = (f - p) / (d - h), a = _ - u * v, u < -1 || u > 1)
				if (f > p) {
					if (c) {
						if (c[1] >= i) return
					} else c = [(e - a) / u, e];
					o = [(i - a) / u, i]
				} else {
					if (c) {
						if (c[1] < e) return
					} else c = [(i - a) / u, i];
					o = [(e - a) / u, e]
				} else if (h < d) {
					if (c) {
						if (c[0] >= r) return
					} else c = [n, u * n + a];
					o = [r, u * r + a]
				} else {
				if (c) {
					if (c[0] < n) return
				} else c = [r, u * r + a];
				o = [n, u * n + a]
			}
			return t[0] = c, t[1] = o, !0
		}

		function Qc(t, n, e, r) {
			for (var i, o = mw.length; o--;) Zc(i = mw[o], t, n, e, r) && $c(i, t, n, e, r) && (Math.abs(i[0][0] - i[1][0]) > ww || Math.abs(i[0][1] - i[1][1]) > ww) || delete mw[o]
		}

		function Jc(t) {
			return yw[t.index] = {
				site: t,
				halfedges: []
			}
		}

		function Kc(t, n) {
			var e = t.site,
				r = n.left,
				i = n.right;
			return e === i && (i = r, r = e), i ? Math.atan2(i[1] - r[1], i[0] - r[0]) : (e === r ? (r = n[1], i = n[0]) : (r = n[0], i = n[1]), Math.atan2(r[0] - i[0], i[1] - r[1]))
		}

		function ts(t, n) {
			return n[+(n.left !== t.site)]
		}

		function ns(t, n) {
			return n[+(n.left === t.site)]
		}

		function es() {
			for (var t, n, e, r, i = 0, o = yw.length; i < o; ++i)
				if ((t = yw[i]) && (r = (n = t.halfedges).length)) {
					var u = new Array(r),
						a = new Array(r);
					for (e = 0; e < r; ++e) u[e] = e, a[e] = Kc(t, mw[n[e]]);
					for (u.sort(function (t, n) {
						return a[n] - a[t]
					}), e = 0; e < r; ++e) a[e] = n[u[e]];
					for (e = 0; e < r; ++e) n[e] = a[e]
				}
		}

		function rs(t, n, e, r) {
			var i, o, u, a, c, s, l, f, h, p, d, v, _ = yw.length,
				y = !0;
			for (i = 0; i < _; ++i)
				if (o = yw[i]) {
					for (u = o.site, c = o.halfedges, a = c.length; a--;) mw[c[a]] || c.splice(a, 1);
					for (a = 0, s = c.length; a < s;) p = ns(o, mw[c[a]]), d = p[0], v = p[1], l = ts(o, mw[c[++a % s]]), f = l[0], h = l[1], (Math.abs(d - f) > ww || Math.abs(v - h) > ww) && (c.splice(a, 0, mw.push(Wc(u, p, Math.abs(d - t) < ww && r - v > ww ? [t, Math.abs(f - t) < ww ? h : r] : Math.abs(v - r) < ww && e - d > ww ? [Math.abs(h - r) < ww ? f : e, r] : Math.abs(d - e) < ww && v - n > ww ? [e, Math.abs(f - e) < ww ? h : n] : Math.abs(v - n) < ww && d - t > ww ? [Math.abs(h - n) < ww ? f : t, n] : null)) - 1), ++s);
					s && (y = !1)
				}
			if (y) {
				var g, m, x, b = 1 / 0;
				for (i = 0, y = null; i < _; ++i)(o = yw[i]) && (u = o.site, g = u[0] - t, m = u[1] - n, x = g * g + m * m, x < b && (b = x, y = o));
				if (y) {
					var w = [t, n],
						M = [t, r],
						S = [e, r],
						T = [e, n];
					y.halfedges.push(mw.push(Wc(u = y.site, w, M)) - 1, mw.push(Wc(u, M, S)) - 1, mw.push(Wc(u, S, T)) - 1, mw.push(Wc(u, T, w)) - 1)
				}
			}
			for (i = 0; i < _; ++i)(o = yw[i]) && (o.halfedges.length || delete yw[i])
		}

		function is() {
			Yc(this), this.x = this.y = this.arc = this.site = this.cy = null
		}

		function os(t) {
			var n = t.P,
				e = t.N;
			if (n && e) {
				var r = n.site,
					i = t.site,
					o = e.site;
				if (r !== o) {
					var u = i[0],
						a = i[1],
						c = r[0] - u,
						s = r[1] - a,
						l = o[0] - u,
						f = o[1] - a,
						h = 2 * (c * f - s * l);
					if (!(h >= -Mw)) {
						var p = c * c + s * s,
							d = l * l + f * f,
							v = (f * p - s * d) / h,
							_ = (c * d - l * p) / h,
							y = xw.pop() || new is;
						y.arc = t, y.site = i, y.x = v + u, y.y = (y.cy = _ + a) + Math.sqrt(v * v + _ * _), t.circle = y;
						for (var g = null, m = gw._; m;)
							if (y.y < m.y || y.y === m.y && y.x <= m.x) {
								if (!m.L) {
									g = m.P;
									break
								}
								m = m.L
							} else {
								if (!m.R) {
									g = m;
									break
								}
								m = m.R
							}
						gw.insert(g, y), g || (vw = y)
					}
				}
			}
		}

		function us(t) {
			var n = t.circle;
			n && (n.P || (vw = n.N), gw.remove(n), xw.push(n), Yc(n), t.circle = null)
		}

		function as() {
			Yc(this), this.edge = this.site = this.circle = null
		}

		function cs(t) {
			var n = bw.pop() || new as;
			return n.site = t, n
		}

		function ss(t) {
			us(t), _w.remove(t), bw.push(t), Yc(t)
		}

		function ls(t) {
			var n = t.circle,
				e = n.x,
				r = n.cy,
				i = [e, r],
				o = t.P,
				u = t.N,
				a = [t];
			ss(t);
			for (var c = o; c.circle && Math.abs(e - c.circle.x) < ww && Math.abs(r - c.circle.cy) < ww;) o = c.P, a.unshift(c), ss(c), c = o;
			a.unshift(c), us(c);
			for (var s = u; s.circle && Math.abs(e - s.circle.x) < ww && Math.abs(r - s.circle.cy) < ww;) u = s.N, a.push(s), ss(s), s = u;
			a.push(s), us(s);
			var l, f = a.length;
			for (l = 1; l < f; ++l) s = a[l], c = a[l - 1], Gc(s.edge, c.site, s.site, i);
			c = a[0], s = a[f - 1], s.edge = Vc(c.site, s.site, null, i), os(c), os(s)
		}

		function fs(t) {
			for (var n, e, r, i, o = t[0], u = t[1], a = _w._; a;)
				if (r = hs(a, u) - o, r > ww) a = a.L;
				else {
					if (i = o - ps(a, u), !(i > ww)) {
						r > -ww ? (n = a.P, e = a) : i > -ww ? (n = a, e = a.N) : n = e = a;
						break
					}
					if (!a.R) {
						n = a;
						break
					}
					a = a.R
				}
			Jc(t);
			var c = cs(t);
			if (_w.insert(n, c), n || e) {
				if (n === e) return us(n), e = cs(n.site), _w.insert(c, e), c.edge = e.edge = Vc(n.site, c.site), os(n), void os(e);
				if (!e) return void (c.edge = Vc(n.site, c.site));
				us(n), us(e);
				var s = n.site,
					l = s[0],
					f = s[1],
					h = t[0] - l,
					p = t[1] - f,
					d = e.site,
					v = d[0] - l,
					_ = d[1] - f,
					y = 2 * (h * _ - p * v),
					g = h * h + p * p,
					m = v * v + _ * _,
					x = [(_ * g - p * m) / y + l, (h * m - v * g) / y + f];
				Gc(e.edge, s, d, x), c.edge = Vc(s, t, null, x), e.edge = Vc(t, d, null, x), os(n), os(e)
			}
		}

		function hs(t, n) {
			var e = t.site,
				r = e[0],
				i = e[1],
				o = i - n;
			if (!o) return r;
			var u = t.P;
			if (!u) return -(1 / 0);
			e = u.site;
			var a = e[0],
				c = e[1],
				s = c - n;
			if (!s) return a;
			var l = a - r,
				f = 1 / o - 1 / s,
				h = l / s;
			return f ? (-h + Math.sqrt(h * h - 2 * f * (l * l / (-2 * s) - c + s / 2 + i - o / 2))) / f + r : (r + a) / 2
		}

		function ps(t, n) {
			var e = t.N;
			if (e) return hs(e, n);
			var r = t.site;
			return r[1] === n ? r[0] : 1 / 0
		}

		function ds(t, n, e) {
			return (t[0] - e[0]) * (n[1] - t[1]) - (t[0] - n[0]) * (e[1] - t[1])
		}

		function vs(t, n) {
			return n[1] - t[1] || n[0] - t[0]
		}

		function _s(t, n) {
			var e, r, i, o = t.sort(vs).pop();
			for (mw = [], yw = new Array(t.length), _w = new Bc, gw = new Bc; ;)
				if (i = vw, o && (!i || o[1] < i.y || o[1] === i.y && o[0] < i.x)) o[0] === e && o[1] === r || (fs(o), e = o[0], r = o[1]), o = t.pop();
				else {
					if (!i) break;
					ls(i.arc)
				}
			if (es(), n) {
				var u = +n[0][0],
					a = +n[0][1],
					c = +n[1][0],
					s = +n[1][1];
				Qc(u, a, c, s), rs(u, a, c, s)
			}
			this.edges = mw, this.cells = yw, _w = gw = mw = yw = null
		}

		function ys(t, n, e) {
			this.target = t, this.type = n, this.transform = e
		}

		function gs(t, n, e) {
			this.k = t, this.x = n, this.y = e
		}

		function ms(t) {
			return t.__zoom || kw
		}

		function xs() {
			t.event.stopImmediatePropagation()
		}

		function bs() {
			return !t.event.button
		}

		function ws() {
			var t, n, e = this;
			return e instanceof SVGElement ? (e = e.ownerSVGElement || e, t = e.width.baseVal.value, n = e.height.baseVal.value) : (t = e.clientWidth, n = e.clientHeight), [
				[0, 0],
				[t, n]
			]
		}

		function Ms() {
			return this.__zoom || kw
		}
		var Ss = "4.5.0",
			Ts = function (t, n) {
				return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN
			},
			ks = function (t) {
				return 1 === t.length && (t = n(t)), {
					left: function (n, e, r, i) {
						for (null == r && (r = 0), null == i && (i = n.length); r < i;) {
							var o = r + i >>> 1;
							t(n[o], e) < 0 ? r = o + 1 : i = o
						}
						return r
					},
					right: function (n, e, r, i) {
						for (null == r && (r = 0), null == i && (i = n.length); r < i;) {
							var o = r + i >>> 1;
							t(n[o], e) > 0 ? i = o : r = o + 1
						}
						return r
					}
				}
			},
			Ns = ks(Ts),
			As = Ns.right,
			Es = Ns.left,
			Cs = function (t, n) {
				return n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN
			},
			zs = function (t) {
				return null === t ? NaN : +t
			},
			Ps = function (t, n) {
				var e, r, i = t.length,
					o = 0,
					u = 0,
					a = -1,
					c = 0;
				if (null == n)
					for (; ++a < i;) isNaN(e = zs(t[a])) || (r = e - o, o += r / ++c, u += r * (e - o));
				else
					for (; ++a < i;) isNaN(e = zs(n(t[a], a, t))) || (r = e - o, o += r / ++c, u += r * (e - o));
				if (c > 1) return u / (c - 1)
			},
			Rs = function (t, n) {
				var e = Ps(t, n);
				return e ? Math.sqrt(e) : e
			},
			Ls = function (t, n) {
				var e, r, i, o = -1,
					u = t.length;
				if (null == n) {
					for (; ++o < u;)
						if (null != (r = t[o]) && r >= r) {
							e = i = r;
							break
						}
					for (; ++o < u;) null != (r = t[o]) && (e > r && (e = r), i < r && (i = r))
				} else {
					for (; ++o < u;)
						if (null != (r = n(t[o], o, t)) && r >= r) {
							e = i = r;
							break
						}
					for (; ++o < u;) null != (r = n(t[o], o, t)) && (e > r && (e = r), i < r && (i = r))
				}
				return [e, i]
			},
			qs = Array.prototype,
			Ds = qs.slice,
			Os = qs.map,
			Us = function (t) {
				return function () {
					return t
				}
			},
			Is = function (t) {
				return t
			},
			Fs = function (t, n, e) {
				t = +t, n = +n, e = (i = arguments.length) < 2 ? (n = t, t = 0, 1) : i < 3 ? 1 : +e;
				for (var r = -1, i = 0 | Math.max(0, Math.ceil((n - t) / e)), o = new Array(i); ++r < i;) o[r] = t + r * e;
				return o
			},
			Bs = Math.sqrt(50),
			Ys = Math.sqrt(10),
			js = Math.sqrt(2),
			Hs = function (t, n, r) {
				var i = e(t, n, r);
				return Fs(Math.ceil(t / i) * i, Math.floor(n / i) * i + i / 2, i)
			},
			Xs = function (t) {
				return Math.ceil(Math.log(t.length) / Math.LN2) + 1
			},
			Vs = function () {
				function t(t) {
					var i, o, u = t.length,
						a = new Array(u);
					for (i = 0; i < u; ++i) a[i] = n(t[i], i, t);
					var c = e(a),
						s = c[0],
						l = c[1],
						f = r(a, s, l);
					Array.isArray(f) || (f = Hs(s, l, f));
					for (var h = f.length; f[0] <= s;) f.shift(), --h;
					for (; f[h - 1] >= l;) f.pop(), --h;
					var p, d = new Array(h + 1);
					for (i = 0; i <= h; ++i) p = d[i] = [], p.x0 = i > 0 ? f[i - 1] : s, p.x1 = i < h ? f[i] : l;
					for (i = 0; i < u; ++i) o = a[i], s <= o && o <= l && d[As(f, o, 0, h)].push(t[i]);
					return d
				}
				var n = Is,
					e = Ls,
					r = Xs;
				return t.value = function (e) {
					return arguments.length ? (n = "function" == typeof e ? e : Us(e), t) : n
				}, t.domain = function (n) {
					return arguments.length ? (e = "function" == typeof n ? n : Us([n[0], n[1]]), t) : e
				}, t.thresholds = function (n) {
					return arguments.length ? (r = "function" == typeof n ? n : Us(Array.isArray(n) ? Ds.call(n) : n), t) : r
				}, t
			},
			Ws = function (t, n, e) {
				if (null == e && (e = zs), r = t.length) {
					if ((n = +n) <= 0 || r < 2) return +e(t[0], 0, t);
					if (n >= 1) return +e(t[r - 1], r - 1, t);
					var r, i = (r - 1) * n,
						o = Math.floor(i),
						u = +e(t[o], o, t),
						a = +e(t[o + 1], o + 1, t);
					return u + (a - u) * (i - o)
				}
			},
			Gs = function (t, n, e) {
				return t = Os.call(t, zs).sort(Ts), Math.ceil((e - n) / (2 * (Ws(t, .75) - Ws(t, .25)) * Math.pow(t.length, -1 / 3)))
			},
			$s = function (t, n, e) {
				return Math.ceil((e - n) / (3.5 * Rs(t) * Math.pow(t.length, -1 / 3)))
			},
			Zs = function (t, n) {
				var e, r, i = -1,
					o = t.length;
				if (null == n) {
					for (; ++i < o;)
						if (null != (r = t[i]) && r >= r) {
							e = r;
							break
						}
					for (; ++i < o;) null != (r = t[i]) && r > e && (e = r)
				} else {
					for (; ++i < o;)
						if (null != (r = n(t[i], i, t)) && r >= r) {
							e = r;
							break
						}
					for (; ++i < o;) null != (r = n(t[i], i, t)) && r > e && (e = r)
				}
				return e
			},
			Qs = function (t, n) {
				var e, r = 0,
					i = t.length,
					o = -1,
					u = i;
				if (null == n)
					for (; ++o < i;) isNaN(e = zs(t[o])) ? --u : r += e;
				else
					for (; ++o < i;) isNaN(e = zs(n(t[o], o, t))) ? --u : r += e;
				if (u) return r / u
			},
			Js = function (t, n) {
				var e, r = [],
					i = t.length,
					o = -1;
				if (null == n)
					for (; ++o < i;) isNaN(e = zs(t[o])) || r.push(e);
				else
					for (; ++o < i;) isNaN(e = zs(n(t[o], o, t))) || r.push(e);
				return Ws(r.sort(Ts), .5)
			},
			Ks = function (t) {
				for (var n, e, r, i = t.length, o = -1, u = 0; ++o < i;) u += t[o].length;
				for (e = new Array(u); --i >= 0;)
					for (r = t[i], n = r.length; --n >= 0;) e[--u] = r[n];
				return e
			},
			tl = function (t, n) {
				var e, r, i = -1,
					o = t.length;
				if (null == n) {
					for (; ++i < o;)
						if (null != (r = t[i]) && r >= r) {
							e = r;
							break
						}
					for (; ++i < o;) null != (r = t[i]) && e > r && (e = r)
				} else {
					for (; ++i < o;)
						if (null != (r = n(t[i], i, t)) && r >= r) {
							e = r;
							break
						}
					for (; ++i < o;) null != (r = n(t[i], i, t)) && e > r && (e = r)
				}
				return e
			},
			nl = function (t) {
				for (var n = 0, e = t.length - 1, r = t[0], i = new Array(e < 0 ? 0 : e); n < e;) i[n] = [r, r = t[++n]];
				return i
			},
			el = function (t, n) {
				for (var e = n.length, r = new Array(e); e--;) r[e] = t[n[e]];
				return r
			},
			rl = function (t, n) {
				if (e = t.length) {
					var e, r, i = 0,
						o = 0,
						u = t[o];
					for (n || (n = Ts); ++i < e;)(n(r = t[i], u) < 0 || 0 !== n(u, u)) && (u = r, o = i);
					return 0 === n(u, u) ? o : void 0
				}
			},
			il = function (t, n, e) {
				for (var r, i, o = (null == e ? t.length : e) - (n = null == n ? 0 : +n); o;) i = Math.random() * o-- | 0, r = t[o + n], t[o + n] = t[i + n], t[i + n] = r;
				return t
			},
			ol = function (t, n) {
				var e, r = 0,
					i = t.length,
					o = -1;
				if (null == n)
					for (; ++o < i;)(e = +t[o]) && (r += e);
				else
					for (; ++o < i;)(e = +n(t[o], o, t)) && (r += e);
				return r
			},
			ul = function (t) {
				if (!(o = t.length)) return [];
				for (var n = -1, e = tl(t, r), i = new Array(e); ++n < e;)
					for (var o, u = -1, a = i[n] = new Array(o); ++u < o;) a[u] = t[u][n];
				return i
			},
			al = function () {
				return ul(arguments)
			},
			cl = Array.prototype.slice,
			sl = function (t) {
				return t
			},
			ll = 1,
			fl = 2,
			hl = 3,
			pl = 4,
			dl = 1e-6,
			vl = {
				value: function () { }
			};
		d.prototype = p.prototype = {
			constructor: d,
			on: function (t, n) {
				var e, r = this._,
					i = v(t + "", r),
					o = -1,
					u = i.length; {
					if (!(arguments.length < 2)) {
						if (null != n && "function" != typeof n) throw new Error("invalid callback: " + n);
						for (; ++o < u;)
							if (e = (t = i[o]).type) r[e] = y(r[e], t.name, n);
							else if (null == n)
								for (e in r) r[e] = y(r[e], t.name, null);
						return this
					}
					for (; ++o < u;)
						if ((e = (t = i[o]).type) && (e = _(r[e], t.name))) return e
				}
			},
			copy: function () {
				var t = {},
					n = this._;
				for (var e in n) t[e] = n[e].slice();
				return new d(t)
			},
			call: function (t, n) {
				if ((e = arguments.length - 2) > 0)
					for (var e, r, i = new Array(e), o = 0; o < e; ++o) i[o] = arguments[o + 2];
				if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
				for (r = this._[t], o = 0, e = r.length; o < e; ++o) r[o].value.apply(n, i)
			},
			apply: function (t, n, e) {
				if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
				for (var r = this._[t], i = 0, o = r.length; i < o; ++i) r[i].value.apply(n, e)
			}
		};
		var _l = "http://www.w3.org/1999/xhtml",
			yl = {
				svg: "http://www.w3.org/2000/svg",
				xhtml: _l,
				xlink: "http://www.w3.org/1999/xlink",
				xml: "http://www.w3.org/XML/1998/namespace",
				xmlns: "http://www.w3.org/2000/xmlns/"
			},
			gl = function (t) {
				var n = t += "",
					e = n.indexOf(":");
				return e >= 0 && "xmlns" !== (n = t.slice(0, e)) && (t = t.slice(e + 1)), yl.hasOwnProperty(n) ? {
					space: yl[n],
					local: t
				} : t
			},
			ml = function (t) {
				var n = gl(t);
				return (n.local ? m : g)(n)
			},
			xl = 0;
		b.prototype = x.prototype = {
			constructor: b,
			get: function (t) {
				for (var n = this._; !(n in t);)
					if (!(t = t.parentNode)) return;
				return t[n]
			},
			set: function (t, n) {
				return t[this._] = n
			},
			remove: function (t) {
				return this._ in t && delete t[this._]
			},
			toString: function () {
				return this._
			}
		};
		var bl = function (t) {
			return function () {
				return this.matches(t)
			}
		};
		if ("undefined" != typeof document) {
			var wl = document.documentElement;
			if (!wl.matches) {
				var Ml = wl.webkitMatchesSelector || wl.msMatchesSelector || wl.mozMatchesSelector || wl.oMatchesSelector;
				bl = function (t) {
					return function () {
						return Ml.call(this, t)
					}
				}
			}
		}
		var Sl = bl,
			Tl = {};
		if (t.event = null, "undefined" != typeof document) {
			var kl = document.documentElement;
			"onmouseenter" in kl || (Tl = {
				mouseenter: "mouseover",
				mouseleave: "mouseout"
			})
		}
		var Nl = function (t, n, e) {
			var r, i, o = S(t + ""),
				u = o.length; {
				if (!(arguments.length < 2)) {
					for (a = n ? k : T, null == e && (e = !1), r = 0; r < u; ++r) this.each(a(o[r], n, e));
					return this
				}
				var a = this.node().__on;
				if (a)
					for (var c, s = 0, l = a.length; s < l; ++s)
						for (r = 0, c = a[s]; r < u; ++r)
							if ((i = o[r]).type === c.type && i.name === c.name) return c.value
			}
		},
			Al = function () {
				for (var n, e = t.event; n = e.sourceEvent;) e = n;
				return e
			},
			El = function (t, n) {
				var e = t.ownerSVGElement || t;
				if (e.createSVGPoint) {
					var r = e.createSVGPoint();
					return r.x = n.clientX, r.y = n.clientY, r = r.matrixTransform(t.getScreenCTM().inverse()), [r.x, r.y]
				}
				var i = t.getBoundingClientRect();
				return [n.clientX - i.left - t.clientLeft, n.clientY - i.top - t.clientTop]
			},
			Cl = function (t) {
				var n = Al();
				return n.changedTouches && (n = n.changedTouches[0]), El(t, n)
			},
			zl = function (t) {
				return null == t ? A : function () {
					return this.querySelector(t)
				}
			},
			Pl = function (t) {
				"function" != typeof t && (t = zl(t));
				for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
					for (var o, u, a = n[i], c = a.length, s = r[i] = new Array(c), l = 0; l < c; ++l)(o = a[l]) && (u = t.call(o, o.__data__, l, a)) && ("__data__" in o && (u.__data__ = o.__data__), s[l] = u);
				return new pt(r, this._parents)
			},
			Rl = function (t) {
				return null == t ? E : function () {
					return this.querySelectorAll(t)
				}
			},
			Ll = function (t) {
				"function" != typeof t && (t = Rl(t));
				for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
					for (var u, a = n[o], c = a.length, s = 0; s < c; ++s)(u = a[s]) && (r.push(t.call(u, u.__data__, s, a)), i.push(u));
				return new pt(r, i)
			},
			ql = function (t) {
				"function" != typeof t && (t = Sl(t));
				for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
					for (var o, u = n[i], a = u.length, c = r[i] = [], s = 0; s < a; ++s)(o = u[s]) && t.call(o, o.__data__, s, u) && c.push(o);
				return new pt(r, this._parents)
			},
			Dl = function (t) {
				return new Array(t.length)
			},
			Ol = function () {
				return new pt(this._enter || this._groups.map(Dl), this._parents)
			};
		C.prototype = {
			constructor: C,
			appendChild: function (t) {
				return this._parent.insertBefore(t, this._next)
			},
			insertBefore: function (t, n) {
				return this._parent.insertBefore(t, n)
			},
			querySelector: function (t) {
				return this._parent.querySelector(t)
			},
			querySelectorAll: function (t) {
				return this._parent.querySelectorAll(t)
			}
		};
		var Ul = function (t) {
			return function () {
				return t
			}
		},
			Il = "$",
			Fl = function (t, n) {
				if (!t) return p = new Array(this.size()), s = -1, this.each(function (t) {
					p[++s] = t
				}), p;
				var e = n ? P : z,
					r = this._parents,
					i = this._groups;
				"function" != typeof t && (t = Ul(t));
				for (var o = i.length, u = new Array(o), a = new Array(o), c = new Array(o), s = 0; s < o; ++s) {
					var l = r[s],
						f = i[s],
						h = f.length,
						p = t.call(l, l && l.__data__, s, r),
						d = p.length,
						v = a[s] = new Array(d),
						_ = u[s] = new Array(d),
						y = c[s] = new Array(h);
					e(l, f, v, _, y, p, n);
					for (var g, m, x = 0, b = 0; x < d; ++x)
						if (g = v[x]) {
							for (x >= b && (b = x + 1); !(m = _[b]) && ++b < d;);
							g._next = m || null
						}
				}
				return u = new pt(u, r), u._enter = a, u._exit = c, u
			},
			Bl = function () {
				return new pt(this._exit || this._groups.map(Dl), this._parents)
			},
			Yl = function (t) {
				for (var n = this._groups, e = t._groups, r = n.length, i = e.length, o = Math.min(r, i), u = new Array(r), a = 0; a < o; ++a)
					for (var c, s = n[a], l = e[a], f = s.length, h = u[a] = new Array(f), p = 0; p < f; ++p)(c = s[p] || l[p]) && (h[p] = c);
				for (; a < r; ++a) u[a] = n[a];
				return new pt(u, this._parents)
			},
			jl = function () {
				for (var t = this._groups, n = -1, e = t.length; ++n < e;)
					for (var r, i = t[n], o = i.length - 1, u = i[o]; --o >= 0;)(r = i[o]) && (u && u !== r.nextSibling && u.parentNode.insertBefore(r, u), u = r);
				return this
			},
			Hl = function (t) {
				function n(n, e) {
					return n && e ? t(n.__data__, e.__data__) : !n - !e
				}
				t || (t = R);
				for (var e = this._groups, r = e.length, i = new Array(r), o = 0; o < r; ++o) {
					for (var u, a = e[o], c = a.length, s = i[o] = new Array(c), l = 0; l < c; ++l)(u = a[l]) && (s[l] = u);
					s.sort(n)
				}
				return new pt(i, this._parents).order()
			},
			Xl = function () {
				var t = arguments[0];
				return arguments[0] = this, t.apply(null, arguments), this
			},
			Vl = function () {
				var t = new Array(this.size()),
					n = -1;
				return this.each(function () {
					t[++n] = this
				}), t
			},
			Wl = function () {
				for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
					for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
						var u = r[i];
						if (u) return u
					}
				return null
			},
			Gl = function () {
				var t = 0;
				return this.each(function () {
					++t
				}), t
			},
			$l = function () {
				return !this.node()
			},
			Zl = function (t) {
				for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
					for (var i, o = n[e], u = 0, a = o.length; u < a; ++u)(i = o[u]) && t.call(i, i.__data__, u, o);
				return this
			},
			Ql = function (t, n) {
				var e = gl(t);
				if (arguments.length < 2) {
					var r = this.node();
					return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e)
				}
				return this.each((null == n ? e.local ? q : L : "function" == typeof n ? e.local ? I : U : e.local ? O : D)(e, n))
			},
			Jl = function (t) {
				return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
			},
			Kl = function (t, n, e) {
				var r;
				return arguments.length > 1 ? this.each((null == n ? F : "function" == typeof n ? Y : B)(t, n, null == e ? "" : e)) : Jl(r = this.node()).getComputedStyle(r, null).getPropertyValue(t)
			},
			tf = function (t, n) {
				return arguments.length > 1 ? this.each((null == n ? j : "function" == typeof n ? X : H)(t, n)) : this.node()[t]
			};
		G.prototype = {
			add: function (t) {
				var n = this._names.indexOf(t);
				n < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")))
			},
			remove: function (t) {
				var n = this._names.indexOf(t);
				n >= 0 && (this._names.splice(n, 1), this._node.setAttribute("class", this._names.join(" ")))
			},
			contains: function (t) {
				return this._names.indexOf(t) >= 0
			}
		};
		var nf = function (t, n) {
			var e = V(t + "");
			if (arguments.length < 2) {
				for (var r = W(this.node()), i = -1, o = e.length; ++i < o;)
					if (!r.contains(e[i])) return !1;
				return !0
			}
			return this.each(("function" == typeof n ? K : n ? Q : J)(e, n))
		},
			ef = function (t) {
				return arguments.length ? this.each(null == t ? tt : ("function" == typeof t ? et : nt)(t)) : this.node().textContent
			},
			rf = function (t) {
				return arguments.length ? this.each(null == t ? rt : ("function" == typeof t ? ot : it)(t)) : this.node().innerHTML
			},
			of = function () {
				return this.each(ut)
			},
			uf = function () {
				return this.each(at)
			},
			af = function (t) {
				var n = "function" == typeof t ? t : ml(t);
				return this.select(function () {
					return this.appendChild(n.apply(this, arguments))
				})
			},
			cf = function (t, n) {
				var e = "function" == typeof t ? t : ml(t),
					r = null == n ? ct : "function" == typeof n ? n : zl(n);
				return this.select(function () {
					return this.insertBefore(e.apply(this, arguments), r.apply(this, arguments) || null)
				})
			},
			sf = function () {
				return this.each(st)
			},
			lf = function (t) {
				return arguments.length ? this.property("__data__", t) : this.node().__data__
			},
			ff = function (t, n) {
				return this.each(("function" == typeof n ? ht : ft)(t, n))
			},
			hf = [null];
		pt.prototype = dt.prototype = {
			constructor: pt,
			select: Pl,
			selectAll: Ll,
			filter: ql,
			data: Fl,
			enter: Ol,
			exit: Bl,
			merge: Yl,
			order: jl,
			sort: Hl,
			call: Xl,
			nodes: Vl,
			node: Wl,
			size: Gl,
			empty: $l,
			each: Zl,
			attr: Ql,
			style: Kl,
			property: tf,
			classed: nf,
			text: ef,
			html: rf,
			raise: of,
			lower: uf,
			append: af,
			insert: cf,
			remove: sf,
			datum: lf,
			on: Nl,
			dispatch: ff
		};
		var pf = function (t) {
			return "string" == typeof t ? new pt([
				[document.querySelector(t)]
			], [document.documentElement]) : new pt([
				[t]
			], hf)
		},
			df = function (t) {
				return "string" == typeof t ? new pt([document.querySelectorAll(t)], [document.documentElement]) : new pt([null == t ? [] : t], hf)
			},
			vf = function (t, n, e) {
				arguments.length < 3 && (e = n, n = Al().changedTouches);
				for (var r, i = 0, o = n ? n.length : 0; i < o; ++i)
					if ((r = n[i]).identifier === e) return El(t, r);
				return null
			},
			_f = function (t, n) {
				null == n && (n = Al().touches);
				for (var e = 0, r = n ? n.length : 0, i = new Array(r); e < r; ++e) i[e] = El(t, n[e]);
				return i
			},
			yf = function () {
				t.event.preventDefault(), t.event.stopImmediatePropagation()
			},
			gf = function (t) {
				var n = t.document.documentElement,
					e = pf(t).on("dragstart.drag", yf, !0);
				"onselectstart" in n ? e.on("selectstart.drag", yf, !0) : (n.__noselect = n.style.MozUserSelect, n.style.MozUserSelect = "none")
			},
			mf = function (t) {
				return function () {
					return t
				}
			};
		yt.prototype.on = function () {
			var t = this._.on.apply(this._, arguments);
			return t === this._ ? this : t
		};
		var xf = function () {
			function n(t) {
				t.on("mousedown.drag", e).on("touchstart.drag", o).on("touchmove.drag", u).on("touchend.drag touchcancel.drag", a).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)")
			}

			function e() {
				if (!l && f.apply(this, arguments)) {
					var n = c("mouse", h.apply(this, arguments), Cl, this, arguments);
					n && (pf(t.event.view).on("mousemove.drag", r, !0).on("mouseup.drag", i, !0), gf(t.event.view), vt(), s = !1, n("start"))
				}
			}

			function r() {
				yf(), s = !0, v.mouse("drag")
			}

			function i() {
				pf(t.event.view).on("mousemove.drag mouseup.drag", null), _t(t.event.view, s), yf(), v.mouse("end")
			}

			function o() {
				if (f.apply(this, arguments)) {
					var n, e, r = t.event.changedTouches,
						i = h.apply(this, arguments),
						o = r.length;
					for (n = 0; n < o; ++n)(e = c(r[n].identifier, i, vf, this, arguments)) && (vt(), e("start"))
				}
			}

			function u() {
				var n, e, r = t.event.changedTouches,
					i = r.length;
				for (n = 0; n < i; ++n)(e = v[r[n].identifier]) && (yf(), e("drag"))
			}

			function a() {
				var n, e, r = t.event.changedTouches,
					i = r.length;
				for (l && clearTimeout(l), l = setTimeout(function () {
					l = null
				}, 500), n = 0; n < i; ++n)(e = v[r[n].identifier]) && (vt(), e("end"))
			}

			function c(e, r, i, o, u) {
				var a, c, s, l = i(r, e),
					f = _.copy();
				if (N(new yt(n, "beforestart", a, e, y, l[0], l[1], 0, 0, f), function () {
					return null != (t.event.subject = a = d.apply(o, u)) && (c = a.x - l[0] || 0, s = a.y - l[1] || 0, !0)
				})) return function t(h) {
					var p, d = l;
					switch (h) {
						case "start":
							v[e] = t, p = y++;
							break;
						case "end":
							delete v[e], --y;
						case "drag":
							l = i(r, e), p = y
					}
					N(new yt(n, h, a, e, p, l[0] + c, l[1] + s, l[0] - d[0], l[1] - d[1], f), f.apply, f, [h, o, u])
				}
			}
			var s, l, f = gt,
				h = mt,
				d = xt,
				v = {},
				_ = p("start", "drag", "end"),
				y = 0;
			return n.filter = function (t) {
				return arguments.length ? (f = "function" == typeof t ? t : mf(!!t), n) : f
			}, n.container = function (t) {
				return arguments.length ? (h = "function" == typeof t ? t : mf(t), n) : h
			}, n.subject = function (t) {
				return arguments.length ? (d = "function" == typeof t ? t : mf(t), n) : d
			}, n.on = function () {
				var t = _.on.apply(_, arguments);
				return t === _ ? n : t
			}, n
		},
			bf = function (t, n, e) {
				t.prototype = n.prototype = e, e.constructor = t
			},
			wf = .7,
			Mf = 1 / wf,
			Sf = "\\s*([+-]?\\d+)\\s*",
			Tf = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
			kf = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
			Nf = /^#([0-9a-f]{3})$/,
			Af = /^#([0-9a-f]{6})$/,
			Ef = new RegExp("^rgb\\(" + [Sf, Sf, Sf] + "\\)$"),
			Cf = new RegExp("^rgb\\(" + [kf, kf, kf] + "\\)$"),
			zf = new RegExp("^rgba\\(" + [Sf, Sf, Sf, Tf] + "\\)$"),
			Pf = new RegExp("^rgba\\(" + [kf, kf, kf, Tf] + "\\)$"),
			Rf = new RegExp("^hsl\\(" + [Tf, kf, kf] + "\\)$"),
			Lf = new RegExp("^hsla\\(" + [Tf, kf, kf, Tf] + "\\)$"),
			qf = {
				aliceblue: 15792383,
				antiquewhite: 16444375,
				aqua: 65535,
				aquamarine: 8388564,
				azure: 15794175,
				beige: 16119260,
				bisque: 16770244,
				black: 0,
				blanchedalmond: 16772045,
				blue: 255,
				blueviolet: 9055202,
				brown: 10824234,
				burlywood: 14596231,
				cadetblue: 6266528,
				chartreuse: 8388352,
				chocolate: 13789470,
				coral: 16744272,
				cornflowerblue: 6591981,
				cornsilk: 16775388,
				crimson: 14423100,
				cyan: 65535,
				darkblue: 139,
				darkcyan: 35723,
				darkgoldenrod: 12092939,
				darkgray: 11119017,
				darkgreen: 25600,
				darkgrey: 11119017,
				darkkhaki: 12433259,
				darkmagenta: 9109643,
				darkolivegreen: 5597999,
				darkorange: 16747520,
				darkorchid: 10040012,
				darkred: 9109504,
				darksalmon: 15308410,
				darkseagreen: 9419919,
				darkslateblue: 4734347,
				darkslategray: 3100495,
				darkslategrey: 3100495,
				darkturquoise: 52945,
				darkviolet: 9699539,
				deeppink: 16716947,
				deepskyblue: 49151,
				dimgray: 6908265,
				dimgrey: 6908265,
				dodgerblue: 2003199,
				firebrick: 11674146,
				floralwhite: 16775920,
				forestgreen: 2263842,
				fuchsia: 16711935,
				gainsboro: 14474460,
				ghostwhite: 16316671,
				gold: 16766720,
				goldenrod: 14329120,
				gray: 8421504,
				green: 32768,
				greenyellow: 11403055,
				grey: 8421504,
				honeydew: 15794160,
				hotpink: 16738740,
				indianred: 13458524,
				indigo: 4915330,
				ivory: 16777200,
				khaki: 15787660,
				lavender: 15132410,
				lavenderblush: 16773365,
				lawngreen: 8190976,
				lemonchiffon: 16775885,
				lightblue: 11393254,
				lightcoral: 15761536,
				lightcyan: 14745599,
				lightgoldenrodyellow: 16448210,
				lightgray: 13882323,
				lightgreen: 9498256,
				lightgrey: 13882323,
				lightpink: 16758465,
				lightsalmon: 16752762,
				lightseagreen: 2142890,
				lightskyblue: 8900346,
				lightslategray: 7833753,
				lightslategrey: 7833753,
				lightsteelblue: 11584734,
				lightyellow: 16777184,
				lime: 65280,
				limegreen: 3329330,
				linen: 16445670,
				magenta: 16711935,
				maroon: 8388608,
				mediumaquamarine: 6737322,
				mediumblue: 205,
				mediumorchid: 12211667,
				mediumpurple: 9662683,
				mediumseagreen: 3978097,
				mediumslateblue: 8087790,
				mediumspringgreen: 64154,
				mediumturquoise: 4772300,
				mediumvioletred: 13047173,
				midnightblue: 1644912,
				mintcream: 16121850,
				mistyrose: 16770273,
				moccasin: 16770229,
				navajowhite: 16768685,
				navy: 128,
				oldlace: 16643558,
				olive: 8421376,
				olivedrab: 7048739,
				orange: 16753920,
				orangered: 16729344,
				orchid: 14315734,
				palegoldenrod: 15657130,
				palegreen: 10025880,
				paleturquoise: 11529966,
				palevioletred: 14381203,
				papayawhip: 16773077,
				peachpuff: 16767673,
				peru: 13468991,
				pink: 16761035,
				plum: 14524637,
				powderblue: 11591910,
				purple: 8388736,
				rebeccapurple: 6697881,
				red: 16711680,
				rosybrown: 12357519,
				royalblue: 4286945,
				saddlebrown: 9127187,
				salmon: 16416882,
				sandybrown: 16032864,
				seagreen: 3050327,
				seashell: 16774638,
				sienna: 10506797,
				silver: 12632256,
				skyblue: 8900331,
				slateblue: 6970061,
				slategray: 7372944,
				slategrey: 7372944,
				snow: 16775930,
				springgreen: 65407,
				steelblue: 4620980,
				tan: 13808780,
				teal: 32896,
				thistle: 14204888,
				tomato: 16737095,
				turquoise: 4251856,
				violet: 15631086,
				wheat: 16113331,
				white: 16777215,
				whitesmoke: 16119285,
				yellow: 16776960,
				yellowgreen: 10145074
			};
		bf(wt, Mt, {
			displayable: function () {
				return this.rgb().displayable()
			},
			toString: function () {
				return this.rgb() + ""
			}
		}), bf(At, Nt, bt(wt, {
			brighter: function (t) {
				return t = null == t ? Mf : Math.pow(Mf, t), new At(this.r * t, this.g * t, this.b * t, this.opacity)
			},
			darker: function (t) {
				return t = null == t ? wf : Math.pow(wf, t), new At(this.r * t, this.g * t, this.b * t, this.opacity)
			},
			rgb: function () {
				return this
			},
			displayable: function () {
				return 0 <= this.r && this.r <= 255 && 0 <= this.g && this.g <= 255 && 0 <= this.b && this.b <= 255 && 0 <= this.opacity && this.opacity <= 1
			},
			toString: function () {
				var t = this.opacity;
				return t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t)), (1 === t ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (1 === t ? ")" : ", " + t + ")")
			}
		})), bf(Pt, zt, bt(wt, {
			brighter: function (t) {
				return t = null == t ? Mf : Math.pow(Mf, t), new Pt(this.h, this.s, this.l * t, this.opacity)
			},
			darker: function (t) {
				return t = null == t ? wf : Math.pow(wf, t), new Pt(this.h, this.s, this.l * t, this.opacity)
			},
			rgb: function () {
				var t = this.h % 360 + 360 * (this.h < 0),
					n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
					e = this.l,
					r = e + (e < .5 ? e : 1 - e) * n,
					i = 2 * e - r;
				return new At(Rt(t >= 240 ? t - 240 : t + 120, i, r), Rt(t, i, r), Rt(t < 120 ? t + 240 : t - 120, i, r), this.opacity)
			},
			displayable: function () {
				return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1
			}
		}));
		var Df = Math.PI / 180,
			Of = 180 / Math.PI,
			Uf = 18,
			If = .95047,
			Ff = 1,
			Bf = 1.08883,
			Yf = 4 / 29,
			jf = 6 / 29,
			Hf = 3 * jf * jf,
			Xf = jf * jf * jf;
		bf(Dt, qt, bt(wt, {
			brighter: function (t) {
				return new Dt(this.l + Uf * (null == t ? 1 : t), this.a, this.b, this.opacity)
			},
			darker: function (t) {
				return new Dt(this.l - Uf * (null == t ? 1 : t), this.a, this.b, this.opacity)
			},
			rgb: function () {
				var t = (this.l + 16) / 116,
					n = isNaN(this.a) ? t : t + this.a / 500,
					e = isNaN(this.b) ? t : t - this.b / 200;
				return t = Ff * Ut(t), n = If * Ut(n), e = Bf * Ut(e), new At(It(3.2404542 * n - 1.5371385 * t - .4985314 * e), It(-.969266 * n + 1.8760108 * t + .041556 * e), It(.0556434 * n - .2040259 * t + 1.0572252 * e), this.opacity)
			}
		})), bf(jt, Yt, bt(wt, {
			brighter: function (t) {
				return new jt(this.h, this.c, this.l + Uf * (null == t ? 1 : t), this.opacity)
			},
			darker: function (t) {
				return new jt(this.h, this.c, this.l - Uf * (null == t ? 1 : t), this.opacity)
			},
			rgb: function () {
				return Lt(this).rgb()
			}
		}));
		var Vf = -.14861,
			Wf = 1.78277,
			Gf = -.29227,
			$f = -.90649,
			Zf = 1.97294,
			Qf = Zf * $f,
			Jf = Zf * Wf,
			Kf = Wf * Gf - $f * Vf;
		bf(Vt, Xt, bt(wt, {
			brighter: function (t) {
				return t = null == t ? Mf : Math.pow(Mf, t), new Vt(this.h, this.s, this.l * t, this.opacity)
			},
			darker: function (t) {
				return t = null == t ? wf : Math.pow(wf, t), new Vt(this.h, this.s, this.l * t, this.opacity)
			},
			rgb: function () {
				var t = isNaN(this.h) ? 0 : (this.h + 120) * Df,
					n = +this.l,
					e = isNaN(this.s) ? 0 : this.s * n * (1 - n),
					r = Math.cos(t),
					i = Math.sin(t);
				return new At(255 * (n + e * (Vf * r + Wf * i)), 255 * (n + e * (Gf * r + $f * i)), 255 * (n + e * (Zf * r)), this.opacity)
			}
		}));
		var th, nh, eh, rh, ih, oh, uh = function (t) {
			var n = t.length - 1;
			return function (e) {
				var r = e <= 0 ? e = 0 : e >= 1 ? (e = 1, n - 1) : Math.floor(e * n),
					i = t[r],
					o = t[r + 1],
					u = r > 0 ? t[r - 1] : 2 * i - o,
					a = r < n - 1 ? t[r + 2] : 2 * o - i;
				return Wt((e - r / n) * n, u, i, o, a)
			}
		},
			ah = function (t) {
				var n = t.length;
				return function (e) {
					var r = Math.floor(((e %= 1) < 0 ? ++e : e) * n),
						i = t[(r + n - 1) % n],
						o = t[r % n],
						u = t[(r + 1) % n],
						a = t[(r + 2) % n];
					return Wt((e - r / n) * n, i, o, u, a)
				}
			},
			ch = function (t) {
				return function () {
					return t
				}
			},
			sh = function t(n) {
				function e(t, n) {
					var e = r((t = Nt(t)).r, (n = Nt(n)).r),
						i = r(t.g, n.g),
						o = r(t.b, n.b),
						u = Jt(t.opacity, n.opacity);
					return function (n) {
						return t.r = e(n), t.g = i(n), t.b = o(n), t.opacity = u(n), t + ""
					}
				}
				var r = Qt(n);
				return e.gamma = t, e
			}(1),
			lh = Kt(uh),
			fh = Kt(ah),
			hh = function (t, n) {
				var e, r = n ? n.length : 0,
					i = t ? Math.min(r, t.length) : 0,
					o = new Array(r),
					u = new Array(r);
				for (e = 0; e < i; ++e) o[e] = mh(t[e], n[e]);
				for (; e < r; ++e) u[e] = n[e];
				return function (t) {
					for (e = 0; e < i; ++e) u[e] = o[e](t);
					return u
				}
			},
			ph = function (t, n) {
				var e = new Date;
				return t = +t, n -= t,
					function (r) {
						return e.setTime(t + n * r), e
					}
			},
			dh = function (t, n) {
				return t = +t, n -= t,
					function (e) {
						return t + n * e
					}
			},
			vh = function (t, n) {
				var e, r = {},
					i = {};
				null !== t && "object" == typeof t || (t = {}), null !== n && "object" == typeof n || (n = {});
				for (e in n) e in t ? r[e] = mh(t[e], n[e]) : i[e] = n[e];
				return function (t) {
					for (e in r) i[e] = r[e](t);
					return i
				}
			},
			_h = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
			yh = new RegExp(_h.source, "g"),
			gh = function (t, n) {
				var e, r, i, o = _h.lastIndex = yh.lastIndex = 0,
					u = -1,
					a = [],
					c = [];
				for (t += "", n += "";
					(e = _h.exec(t)) && (r = yh.exec(n));)(i = r.index) > o && (i = n.slice(o, i), a[u] ? a[u] += i : a[++u] = i), (e = e[0]) === (r = r[0]) ? a[u] ? a[u] += r : a[++u] = r : (a[++u] = null, c.push({
						i: u,
						x: dh(e, r)
					})), o = yh.lastIndex;
				return o < n.length && (i = n.slice(o), a[u] ? a[u] += i : a[++u] = i), a.length < 2 ? c[0] ? nn(c[0].x) : tn(n) : (n = c.length, function (t) {
					for (var e, r = 0; r < n; ++r) a[(e = c[r]).i] = e.x(t);
					return a.join("")
				})
			},
			mh = function (t, n) {
				var e, r = typeof n;
				return null == n || "boolean" === r ? ch(n) : ("number" === r ? dh : "string" === r ? (e = Mt(n)) ? (n = e, sh) : gh : n instanceof Mt ? sh : n instanceof Date ? ph : Array.isArray(n) ? hh : isNaN(n) ? vh : dh)(t, n)
			},
			xh = function (t, n) {
				return t = +t, n -= t,
					function (e) {
						return Math.round(t + n * e)
					}
			},
			bh = 180 / Math.PI,
			wh = {
				translateX: 0,
				translateY: 0,
				rotate: 0,
				skewX: 0,
				scaleX: 1,
				scaleY: 1
			},
			Mh = function (t, n, e, r, i, o) {
				var u, a, c;
				return (u = Math.sqrt(t * t + n * n)) && (t /= u, n /= u), (c = t * e + n * r) && (e -= t * c, r -= n * c), (a = Math.sqrt(e * e + r * r)) && (e /= a, r /= a, c /= a), t * r < n * e && (t = -t, n = -n, c = -c, u = -u), {
					translateX: i,
					translateY: o,
					rotate: Math.atan2(n, t) * bh,
					skewX: Math.atan(c) * bh,
					scaleX: u,
					scaleY: a
				}
			},
			Sh = on(en, "px, ", "px)", "deg)"),
			Th = on(rn, ", ", ")", ")"),
			kh = Math.SQRT2,
			Nh = 2,
			Ah = 4,
			Eh = 1e-12,
			Ch = function (t, n) {
				var e, r, i = t[0],
					o = t[1],
					u = t[2],
					a = n[0],
					c = n[1],
					s = n[2],
					l = a - i,
					f = c - o,
					h = l * l + f * f;
				if (h < Eh) r = Math.log(s / u) / kh, e = function (t) {
					return [i + t * l, o + t * f, u * Math.exp(kh * t * r)]
				};
				else {
					var p = Math.sqrt(h),
						d = (s * s - u * u + Ah * h) / (2 * u * Nh * p),
						v = (s * s - u * u - Ah * h) / (2 * s * Nh * p),
						_ = Math.log(Math.sqrt(d * d + 1) - d),
						y = Math.log(Math.sqrt(v * v + 1) - v);
					r = (y - _) / kh, e = function (t) {
						var n = t * r,
							e = un(_),
							a = u / (Nh * p) * (e * cn(kh * n + _) - an(_));
						return [i + a * l, o + a * f, u * e / un(kh * n + _)]
					}
				}
				return e.duration = 1e3 * r, e
			},
			zh = sn(Zt),
			Ph = sn(Jt),
			Rh = fn(Zt),
			Lh = fn(Jt),
			qh = hn(Zt),
			Dh = hn(Jt),
			Oh = function (t, n) {
				for (var e = new Array(n), r = 0; r < n; ++r) e[r] = t(r / (n - 1));
				return e
			},
			Uh = 0,
			Ih = 0,
			Fh = 0,
			Bh = 1e3,
			Yh = 0,
			jh = 0,
			Hh = 0,
			Xh = "object" == typeof performance && performance.now ? performance : Date,
			Vh = "function" == typeof requestAnimationFrame ? requestAnimationFrame : function (t) {
				setTimeout(t, 17)
			};
		vn.prototype = _n.prototype = {
			constructor: vn,
			restart: function (t, n, e) {
				if ("function" != typeof t) throw new TypeError("callback is not a function");
				e = (null == e ? pn() : +e) + (null == n ? 0 : +n), this._next || oh === this || (oh ? oh._next = this : ih = this, oh = this), this._call = t, this._time = e, bn()
			},
			stop: function () {
				this._call && (this._call = null, this._time = 1 / 0, bn())
			}
		};
		var Wh = function (t, n, e) {
			var r = new vn;
			return n = null == n ? 0 : +n, r.restart(function (e) {
				r.stop(), t(e + n)
			}, n, e), r
		},
			Gh = function (t, n, e) {
				var r = new vn,
					i = n;
				return null == n ? (r.restart(t, n, e), r) : (n = +n, e = null == e ? pn() : +e, r.restart(function o(u) {
					u += i, r.restart(o, i += n, e), t(u)
				}, n, e), r)
			},
			$h = p("start", "end", "interrupt"),
			Zh = [],
			Qh = 0,
			Jh = 1,
			Kh = 2,
			tp = 3,
			np = 4,
			ep = 5,
			rp = 6,
			ip = function (t, n, e, r, i, o) {
				var u = t.__transition;
				if (u) {
					if (e in u) return
				} else t.__transition = {};
				Tn(t, e, {
					name: n,
					index: r,
					group: i,
					on: $h,
					tween: Zh,
					time: o.time,
					delay: o.delay,
					duration: o.duration,
					ease: o.ease,
					timer: null,
					state: Qh
				})
			},
			op = function (t, n) {
				var e, r, i, o = t.__transition,
					u = !0;
				if (o) {
					n = null == n ? null : n + "";
					for (i in o) (e = o[i]).name === n ? (r = e.state > Kh && e.state < ep, e.state = rp, e.timer.stop(), r && e.on.call("interrupt", t, t.__data__, e.index, e.group), delete o[i]) : u = !1;
					u && delete t.__transition
				}
			},
			up = function (t) {
				return this.each(function () {
					op(this, t)
				})
			},
			ap = function (t, n) {
				var e = this._id;
				if (t += "", arguments.length < 2) {
					for (var r, i = Sn(this.node(), e).tween, o = 0, u = i.length; o < u; ++o)
						if ((r = i[o]).name === t) return r.value;
					return null
				}
				return this.each((null == n ? kn : Nn)(e, t, n))
			},
			cp = function (t, n) {
				var e;
				return ("number" == typeof n ? dh : n instanceof Mt ? sh : (e = Mt(n)) ? (n = e, sh) : gh)(t, n)
			},
			sp = function (t, n) {
				var e = gl(t),
					r = "transform" === e ? Th : cp;
				return this.attrTween(t, "function" == typeof n ? (e.local ? Ln : Rn)(e, r, An(this, "attr." + t, n)) : null == n ? (e.local ? Cn : En)(e) : (e.local ? Pn : zn)(e, r, n))
			},
			lp = function (t, n) {
				var e = "attr." + t;
				if (arguments.length < 2) return (e = this.tween(e)) && e._value;
				if (null == n) return this.tween(e, null);
				if ("function" != typeof n) throw new Error;
				var r = gl(t);
				return this.tween(e, (r.local ? qn : Dn)(r, n))
			},
			fp = function (t) {
				var n = this._id;
				return arguments.length ? this.each(("function" == typeof t ? On : Un)(n, t)) : Sn(this.node(), n).delay
			},
			hp = function (t) {
				var n = this._id;
				return arguments.length ? this.each(("function" == typeof t ? In : Fn)(n, t)) : Sn(this.node(), n).duration
			},
			pp = function (t) {
				var n = this._id;
				return arguments.length ? this.each(Bn(n, t)) : Sn(this.node(), n).ease
			},
			dp = function (t) {
				"function" != typeof t && (t = Sl(t));
				for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
					for (var o, u = n[i], a = u.length, c = r[i] = [], s = 0; s < a; ++s)(o = u[s]) && t.call(o, o.__data__, s, u) && c.push(o);
				return new Jn(r, this._parents, this._name, this._id)
			},
			vp = function (t) {
				if (t._id !== this._id) throw new Error;
				for (var n = this._groups, e = t._groups, r = n.length, i = e.length, o = Math.min(r, i), u = new Array(r), a = 0; a < o; ++a)
					for (var c, s = n[a], l = e[a], f = s.length, h = u[a] = new Array(f), p = 0; p < f; ++p)(c = s[p] || l[p]) && (h[p] = c);
				for (; a < r; ++a) u[a] = n[a];
				return new Jn(u, this._parents, this._name, this._id)
			},
			_p = function (t, n) {
				var e = this._id;
				return arguments.length < 2 ? Sn(this.node(), e).on.on(t) : this.each(jn(e, t, n))
			},
			yp = function () {
				return this.on("end.remove", Hn(this._id))
			},
			gp = function (t) {
				var n = this._name,
					e = this._id;
				"function" != typeof t && (t = zl(t));
				for (var r = this._groups, i = r.length, o = new Array(i), u = 0; u < i; ++u)
					for (var a, c, s = r[u], l = s.length, f = o[u] = new Array(l), h = 0; h < l; ++h)(a = s[h]) && (c = t.call(a, a.__data__, h, s)) && ("__data__" in a && (c.__data__ = a.__data__), f[h] = c, ip(f[h], n, e, h, f, Sn(a, e)));
				return new Jn(o, this._parents, n, e)
			},
			mp = function (t) {
				var n = this._name,
					e = this._id;
				"function" != typeof t && (t = Rl(t));
				for (var r = this._groups, i = r.length, o = [], u = [], a = 0; a < i; ++a)
					for (var c, s = r[a], l = s.length, f = 0; f < l; ++f)
						if (c = s[f]) {
							for (var h, p = t.call(c, c.__data__, f, s), d = Sn(c, e), v = 0, _ = p.length; v < _; ++v)(h = p[v]) && ip(h, n, e, v, p, d);
							o.push(p), u.push(c)
						}
				return new Jn(o, u, n, e)
			},
			xp = dt.prototype.constructor,
			bp = function () {
				return new xp(this._groups, this._parents)
			},
			wp = function (t, n, e) {
				var r = "transform" == (t += "") ? Sh : cp;
				return null == n ? this.styleTween(t, Xn(t, r)).on("end.style." + t, Vn(t)) : this.styleTween(t, "function" == typeof n ? Gn(t, r, An(this, "style." + t, n)) : Wn(t, r, n), e)
			},
			Mp = function (t, n, e) {
				var r = "style." + (t += "");
				if (arguments.length < 2) return (r = this.tween(r)) && r._value;
				if (null == n) return this.tween(r, null);
				if ("function" != typeof n) throw new Error;
				return this.tween(r, $n(t, n, null == e ? "" : e))
			},
			Sp = function (t) {
				return this.tween("text", "function" == typeof t ? Qn(An(this, "text", t)) : Zn(null == t ? "" : t + ""))
			},
			Tp = function () {
				for (var t = this._name, n = this._id, e = te(), r = this._groups, i = r.length, o = 0; o < i; ++o)
					for (var u, a = r[o], c = a.length, s = 0; s < c; ++s)
						if (u = a[s]) {
							var l = Sn(u, n);
							ip(u, t, e, s, a, {
								time: l.time + l.delay + l.duration,
								delay: 0,
								duration: l.duration,
								ease: l.ease
							})
						}
				return new Jn(r, this._parents, t, e)
			},
			kp = 0,
			Np = dt.prototype;
		Jn.prototype = Kn.prototype = {
			constructor: Jn,
			select: gp,
			selectAll: mp,
			filter: dp,
			merge: vp,
			selection: bp,
			transition: Tp,
			call: Np.call,
			nodes: Np.nodes,
			node: Np.node,
			size: Np.size,
			empty: Np.empty,
			each: Np.each,
			on: _p,
			attr: sp,
			attrTween: lp,
			style: wp,
			styleTween: Mp,
			text: Sp,
			remove: yp,
			tween: ap,
			delay: fp,
			duration: hp,
			ease: pp
		};
		var Ap = 3,
			Ep = function t(n) {
				function e(t) {
					return Math.pow(t, n)
				}
				return n = +n, e.exponent = t, e
			}(Ap),
			Cp = function t(n) {
				function e(t) {
					return 1 - Math.pow(1 - t, n)
				}
				return n = +n, e.exponent = t, e
			}(Ap),
			zp = function t(n) {
				function e(t) {
					return ((t *= 2) <= 1 ? Math.pow(t, n) : 2 - Math.pow(2 - t, n)) / 2
				}
				return n = +n, e.exponent = t, e
			}(Ap),
			Pp = Math.PI,
			Rp = Pp / 2,
			Lp = 4 / 11,
			qp = 6 / 11,
			Dp = 8 / 11,
			Op = .75,
			Up = 9 / 11,
			Ip = 10 / 11,
			Fp = .9375,
			Bp = 21 / 22,
			Yp = 63 / 64,
			jp = 1 / Lp / Lp,
			Hp = 1.70158,
			Xp = function t(n) {
				function e(t) {
					return t * t * ((n + 1) * t - n)
				}
				return n = +n, e.overshoot = t, e
			}(Hp),
			Vp = function t(n) {
				function e(t) {
					return --t * t * ((n + 1) * t + n) + 1
				}
				return n = +n, e.overshoot = t, e
			}(Hp),
			Wp = function t(n) {
				function e(t) {
					return ((t *= 2) < 1 ? t * t * ((n + 1) * t - n) : (t -= 2) * t * ((n + 1) * t + n) + 2) / 2
				}
				return n = +n, e.overshoot = t, e
			}(Hp),
			Gp = 2 * Math.PI,
			$p = 1,
			Zp = .3,
			Qp = function t(n, e) {
				function r(t) {
					return n * Math.pow(2, 10 * --t) * Math.sin((i - t) / e)
				}
				var i = Math.asin(1 / (n = Math.max(1, n))) * (e /= Gp);
				return r.amplitude = function (n) {
					return t(n, e * Gp)
				}, r.period = function (e) {
					return t(n, e)
				}, r
			}($p, Zp),
			Jp = function t(n, e) {
				function r(t) {
					return 1 - n * Math.pow(2, -10 * (t = +t)) * Math.sin((t + i) / e)
				}
				var i = Math.asin(1 / (n = Math.max(1, n))) * (e /= Gp);
				return r.amplitude = function (n) {
					return t(n, e * Gp)
				}, r.period = function (e) {
					return t(n, e)
				}, r
			}($p, Zp),
			Kp = function t(n, e) {
				function r(t) {
					return ((t = 2 * t - 1) < 0 ? n * Math.pow(2, 10 * t) * Math.sin((i - t) / e) : 2 - n * Math.pow(2, -10 * t) * Math.sin((i + t) / e)) / 2
				}
				var i = Math.asin(1 / (n = Math.max(1, n))) * (e /= Gp);
				return r.amplitude = function (n) {
					return t(n, e * Gp)
				}, r.period = function (e) {
					return t(n, e)
				}, r
			}($p, Zp),
			td = {
				time: null,
				delay: 0,
				duration: 250,
				ease: ae
			},
			nd = function (t) {
				var n, e;
				t instanceof Jn ? (n = t._id, t = t._name) : (n = te(), (e = td).time = pn(), t = null == t ? null : t + "");
				for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
					for (var u, a = r[o], c = a.length, s = 0; s < c; ++s)(u = a[s]) && ip(u, t, n, s, a, e || xe(u, n));
				return new Jn(r, this._parents, t, n)
			};
		dt.prototype.interrupt = up, dt.prototype.transition = nd;
		var ed = [null],
			rd = function (t, n) {
				var e, r, i = t.__transition;
				if (i) {
					n = null == n ? null : n + "";
					for (r in i)
						if ((e = i[r]).state > Jh && e.name === n) return new Jn([
							[t]
						], ed, n, +r)
				}
				return null
			},
			id = function (t) {
				return function () {
					return t
				}
			},
			od = function (t, n, e) {
				this.target = t, this.type = n, this.selection = e
			},
			ud = function () {
				t.event.preventDefault(), t.event.stopImmediatePropagation()
			},
			ad = {
				name: "drag"
			},
			cd = {
				name: "space"
			},
			sd = {
				name: "handle"
			},
			ld = {
				name: "center"
			},
			fd = {
				name: "x",
				handles: ["e", "w"].map(we),
				input: function (t, n) {
					return t && [
						[t[0], n[0][1]],
						[t[1], n[1][1]]
					]
				},
				output: function (t) {
					return t && [t[0][0], t[1][0]]
				}
			},
			hd = {
				name: "y",
				handles: ["n", "s"].map(we),
				input: function (t, n) {
					return t && [
						[n[0][0], t[0]],
						[n[1][0], t[1]]
					]
				},
				output: function (t) {
					return t && [t[0][1], t[1][1]]
				}
			},
			pd = {
				name: "xy",
				handles: ["n", "e", "s", "w", "nw", "ne", "se", "sw"].map(we),
				input: function (t) {
					return t
				},
				output: function (t) {
					return t
				}
			},
			dd = {
				overlay: "crosshair",
				selection: "move",
				n: "ns-resize",
				e: "ew-resize",
				s: "ns-resize",
				w: "ew-resize",
				nw: "nwse-resize",
				ne: "nesw-resize",
				se: "nwse-resize",
				sw: "nesw-resize"
			},
			vd = {
				e: "w",
				w: "e",
				nw: "ne",
				ne: "nw",
				se: "sw",
				sw: "se"
			},
			_d = {
				n: "s",
				s: "n",
				nw: "sw",
				ne: "se",
				se: "ne",
				sw: "nw"
			},
			yd = {
				overlay: 1,
				selection: 1,
				n: null,
				e: 1,
				s: null,
				w: -1,
				nw: -1,
				ne: 1,
				se: 1,
				sw: -1
			},
			gd = {
				overlay: 1,
				selection: 1,
				n: -1,
				e: null,
				s: 1,
				w: null,
				nw: -1,
				ne: -1,
				se: 1,
				sw: 1
			},
			md = function () {
				return Ce(pd)
			},
			xd = Math.cos,
			bd = Math.sin,
			wd = Math.PI,
			Md = wd / 2,
			Sd = 2 * wd,
			Td = Math.max,
			kd = function () {
				function t(t) {
					var o, u, a, c, s, l, f = t.length,
						h = [],
						p = Fs(f),
						d = [],
						v = [],
						_ = v.groups = new Array(f),
						y = new Array(f * f);
					for (o = 0, s = -1; ++s < f;) {
						for (u = 0, l = -1; ++l < f;) u += t[s][l];
						h.push(u), d.push(Fs(f)), o += u
					}
					for (e && p.sort(function (t, n) {
						return e(h[t], h[n])
					}), r && d.forEach(function (n, e) {
						n.sort(function (n, i) {
							return r(t[e][n], t[e][i])
						})
					}), o = Td(0, Sd - n * f) / o, c = o ? n : Sd / f, u = 0, s = -1; ++s < f;) {
						for (a = u, l = -1; ++l < f;) {
							var g = p[s],
								m = d[g][l],
								x = t[g][m],
								b = u,
								w = u += x * o;
							y[m * f + g] = {
								index: g,
								subindex: m,
								startAngle: b,
								endAngle: w,
								value: x
							}
						}
						_[g] = {
							index: g,
							startAngle: a,
							endAngle: u,
							value: h[g]
						}, u += c
					}
					for (s = -1; ++s < f;)
						for (l = s - 1; ++l < f;) {
							var M = y[l * f + s],
								S = y[s * f + l];
							(M.value || S.value) && v.push(M.value < S.value ? {
								source: S,
								target: M
							} : {
									source: M,
									target: S
								})
						}
					return i ? v.sort(i) : v
				}
				var n = 0,
					e = null,
					r = null,
					i = null;
				return t.padAngle = function (e) {
					return arguments.length ? (n = Td(0, e), t) : n
				}, t.sortGroups = function (n) {
					return arguments.length ? (e = n, t) : e
				}, t.sortSubgroups = function (n) {
					return arguments.length ? (r = n, t) : r
				}, t.sortChords = function (n) {
					return arguments.length ? (null == n ? i = null : (i = ze(n))._ = n, t) : i && i._
				}, t
			},
			Nd = Array.prototype.slice,
			Ad = function (t) {
				return function () {
					return t
				}
			},
			Ed = Math.PI,
			Cd = 2 * Ed,
			zd = 1e-6,
			Pd = Cd - zd;
		Pe.prototype = Re.prototype = {
			constructor: Pe,
			moveTo: function (t, n) {
				this._ += "M" + (this._x0 = this._x1 = +t) + "," + (this._y0 = this._y1 = +n)
			},
			closePath: function () {
				null !== this._x1 && (this._x1 = this._x0, this._y1 = this._y0, this._ += "Z")
			},
			lineTo: function (t, n) {
				this._ += "L" + (this._x1 = +t) + "," + (this._y1 = +n)
			},
			quadraticCurveTo: function (t, n, e, r) {
				this._ += "Q" + +t + "," + +n + "," + (this._x1 = +e) + "," + (this._y1 = +r)
			},
			bezierCurveTo: function (t, n, e, r, i, o) {
				this._ += "C" + +t + "," + +n + "," + +e + "," + +r + "," + (this._x1 = +i) + "," + (this._y1 = +o)
			},
			arcTo: function (t, n, e, r, i) {
				t = +t, n = +n, e = +e, r = +r, i = +i;
				var o = this._x1,
					u = this._y1,
					a = e - t,
					c = r - n,
					s = o - t,
					l = u - n,
					f = s * s + l * l;
				if (i < 0) throw new Error("negative radius: " + i);
				if (null === this._x1) this._ += "M" + (this._x1 = t) + "," + (this._y1 = n);
				else if (f > zd)
					if (Math.abs(l * a - c * s) > zd && i) {
						var h = e - o,
							p = r - u,
							d = a * a + c * c,
							v = h * h + p * p,
							_ = Math.sqrt(d),
							y = Math.sqrt(f),
							g = i * Math.tan((Ed - Math.acos((d + f - v) / (2 * _ * y))) / 2),
							m = g / y,
							x = g / _;
						Math.abs(m - 1) > zd && (this._ += "L" + (t + m * s) + "," + (n + m * l)), this._ += "A" + i + "," + i + ",0,0," + +(l * h > s * p) + "," + (this._x1 = t + x * a) + "," + (this._y1 = n + x * c)
					} else this._ += "L" + (this._x1 = t) + "," + (this._y1 = n);
				else;
			},
			arc: function (t, n, e, r, i, o) {
				t = +t, n = +n, e = +e;
				var u = e * Math.cos(r),
					a = e * Math.sin(r),
					c = t + u,
					s = n + a,
					l = 1 ^ o,
					f = o ? r - i : i - r;
				if (e < 0) throw new Error("negative radius: " + e);
				null === this._x1 ? this._ += "M" + c + "," + s : (Math.abs(this._x1 - c) > zd || Math.abs(this._y1 - s) > zd) && (this._ += "L" + c + "," + s), e && (f > Pd ? this._ += "A" + e + "," + e + ",0,1," + l + "," + (t - u) + "," + (n - a) + "A" + e + "," + e + ",0,1," + l + "," + (this._x1 = c) + "," + (this._y1 = s) : (f < 0 && (f = f % Cd + Cd), this._ += "A" + e + "," + e + ",0," + +(f >= Ed) + "," + l + "," + (this._x1 = t + e * Math.cos(i)) + "," + (this._y1 = n + e * Math.sin(i))))
			},
			rect: function (t, n, e, r) {
				this._ += "M" + (this._x0 = this._x1 = +t) + "," + (this._y0 = this._y1 = +n) + "h" + +e + "v" + +r + "h" + -e + "Z"
			},
			toString: function () {
				return this._
			}
		};
		var Rd = function () {
			function t() {
				var t, a = Nd.call(arguments),
					c = n.apply(this, a),
					s = e.apply(this, a),
					l = +r.apply(this, (a[0] = c, a)),
					f = i.apply(this, a) - Md,
					h = o.apply(this, a) - Md,
					p = l * xd(f),
					d = l * bd(f),
					v = +r.apply(this, (a[0] = s, a)),
					_ = i.apply(this, a) - Md,
					y = o.apply(this, a) - Md;
				if (u || (u = t = Re()), u.moveTo(p, d), u.arc(0, 0, l, f, h), f === _ && h === y || (u.quadraticCurveTo(0, 0, v * xd(_), v * bd(_)), u.arc(0, 0, v, _, y)), u.quadraticCurveTo(0, 0, p, d), u.closePath(), t) return u = null, t + "" || null
			}
			var n = Le,
				e = qe,
				r = De,
				i = Oe,
				o = Ue,
				u = null;
			return t.radius = function (n) {
				return arguments.length ? (r = "function" == typeof n ? n : Ad(+n), t) : r
			}, t.startAngle = function (n) {
				return arguments.length ? (i = "function" == typeof n ? n : Ad(+n), t) : i
			}, t.endAngle = function (n) {
				return arguments.length ? (o = "function" == typeof n ? n : Ad(+n), t) : o
			}, t.source = function (e) {
				return arguments.length ? (n = e, t) : n
			}, t.target = function (n) {
				return arguments.length ? (e = n, t) : e
			}, t.context = function (n) {
				return arguments.length ? (u = null == n ? null : n, t) : u
			}, t
		},
			Ld = "$";
		Ie.prototype = Fe.prototype = {
			constructor: Ie,
			has: function (t) {
				return Ld + t in this
			},
			get: function (t) {
				return this[Ld + t]
			},
			set: function (t, n) {
				return this[Ld + t] = n, this
			},
			remove: function (t) {
				var n = Ld + t;
				return n in this && delete this[n]
			},
			clear: function () {
				for (var t in this) t[0] === Ld && delete this[t]
			},
			keys: function () {
				var t = [];
				for (var n in this) n[0] === Ld && t.push(n.slice(1));
				return t
			},
			values: function () {
				var t = [];
				for (var n in this) n[0] === Ld && t.push(this[n]);
				return t
			},
			entries: function () {
				var t = [];
				for (var n in this) n[0] === Ld && t.push({
					key: n.slice(1),
					value: this[n]
				});
				return t
			},
			size: function () {
				var t = 0;
				for (var n in this) n[0] === Ld && ++t;
				return t
			},
			empty: function () {
				for (var t in this)
					if (t[0] === Ld) return !1;
				return !0
			},
			each: function (t) {
				for (var n in this) n[0] === Ld && t(this[n], n.slice(1), this)
			}
		};
		var qd = function () {
			function t(n, i, u, a) {
				if (i >= o.length) return null != r ? r(n) : null != e ? n.sort(e) : n;
				for (var c, s, l, f = -1, h = n.length, p = o[i++], d = Fe(), v = u(); ++f < h;)(l = d.get(c = p(s = n[f]) + "")) ? l.push(s) : d.set(c, [s]);
				return d.each(function (n, e) {
					a(v, e, t(n, i, u, a))
				}), v
			}

			function n(t, e) {
				if (++e > o.length) return t;
				var i, a = u[e - 1];
				return null != r && e >= o.length ? i = t.entries() : (i = [], t.each(function (t, r) {
					i.push({
						key: r,
						values: n(t, e)
					})
				})), null != a ? i.sort(function (t, n) {
					return a(t.key, n.key)
				}) : i
			}
			var e, r, i, o = [],
				u = [];
			return i = {
				object: function (n) {
					return t(n, 0, Be, Ye)
				},
				map: function (n) {
					return t(n, 0, je, He)
				},
				entries: function (e) {
					return n(t(e, 0, je, He), 0)
				},
				key: function (t) {
					return o.push(t), i
				},
				sortKeys: function (t) {
					return u[o.length - 1] = t, i
				},
				sortValues: function (t) {
					return e = t, i
				},
				rollup: function (t) {
					return r = t, i
				}
			}
		},
			Dd = Fe.prototype;
		Xe.prototype = Ve.prototype = {
			constructor: Xe,
			has: Dd.has,
			add: function (t) {
				return t += "", this[Ld + t] = t, this
			},
			remove: Dd.remove,
			clear: Dd.clear,
			values: Dd.keys,
			size: Dd.size,
			empty: Dd.empty,
			each: Dd.each
		};
		var Od = function (t) {
			var n = [];
			for (var e in t) n.push(e);
			return n
		},
			Ud = function (t) {
				var n = [];
				for (var e in t) n.push(t[e]);
				return n
			},
			Id = function (t) {
				var n = [];
				for (var e in t) n.push({
					key: e,
					value: t[e]
				});
				return n
			},
			Fd = function (t) {
				function n(t, n) {
					var r, i, o = e(t, function (t, e) {
						return r ? r(t, e - 1) : (i = t, void (r = n ? Ge(t, n) : We(t)))
					});
					return o.columns = i, o
				}

				function e(t, n) {
					function e() {
						if (l >= s) return u;
						if (i) return i = !1, o;
						var n, e = l;
						if (34 === t.charCodeAt(e)) {
							for (var r = e; r++ < s;)
								if (34 === t.charCodeAt(r)) {
									if (34 !== t.charCodeAt(r + 1)) break;
									++r
								}
							return l = r + 2, n = t.charCodeAt(r + 1), 13 === n ? (i = !0, 10 === t.charCodeAt(r + 2) && ++l) : 10 === n && (i = !0), t.slice(e + 1, r).replace(/""/g, '"')
						}
						for (; l < s;) {
							var a = 1;
							if (n = t.charCodeAt(l++), 10 === n) i = !0;
							else if (13 === n) i = !0, 10 === t.charCodeAt(l) && (++l, ++a);
							else if (n !== c) continue;
							return t.slice(e, l - a)
						}
						return t.slice(e)
					}
					for (var r, i, o = {}, u = {}, a = [], s = t.length, l = 0, f = 0;
						(r = e()) !== u;) {
						for (var h = []; r !== o && r !== u;) h.push(r), r = e();
						n && null == (h = n(h, f++)) || a.push(h)
					}
					return a
				}

				function r(n, e) {
					return null == e && (e = $e(n)), [e.map(u).join(t)].concat(n.map(function (n) {
						return e.map(function (t) {
							return u(n[t])
						}).join(t)
					})).join("\n")
				}

				function i(t) {
					return t.map(o).join("\n")
				}

				function o(n) {
					return n.map(u).join(t)
				}

				function u(t) {
					return null == t ? "" : a.test(t += "") ? '"' + t.replace(/\"/g, '""') + '"' : t
				}
				var a = new RegExp('["' + t + "\n]"),
					c = t.charCodeAt(0);
				return {
					parse: n,
					parseRows: e,
					format: r,
					formatRows: i
				}
			},
			Bd = Fd(","),
			Yd = Bd.parse,
			jd = Bd.parseRows,
			Hd = Bd.format,
			Xd = Bd.formatRows,
			Vd = Fd("\t"),
			Wd = Vd.parse,
			Gd = Vd.parseRows,
			$d = Vd.format,
			Zd = Vd.formatRows,
			Qd = function (t, n) {
				function e() {
					var e, i, o = r.length,
						u = 0,
						a = 0;
					for (e = 0; e < o; ++e) i = r[e], u += i.x, a += i.y;
					for (u = u / o - t, a = a / o - n, e = 0; e < o; ++e) i = r[e], i.x -= u, i.y -= a
				}
				var r;
				return null == t && (t = 0), null == n && (n = 0), e.initialize = function (t) {
					r = t
				}, e.x = function (n) {
					return arguments.length ? (t = +n, e) : t
				}, e.y = function (t) {
					return arguments.length ? (n = +t, e) : n
				}, e
			},
			Jd = function (t) {
				return function () {
					return t
				}
			},
			Kd = function () {
				return 1e-6 * (Math.random() - .5)
			},
			tv = function (t) {
				var n = +this._x.call(null, t),
					e = +this._y.call(null, t);
				return Ze(this.cover(n, e), n, e, t)
			},
			nv = function (t, n) {
				if (isNaN(t = +t) || isNaN(n = +n)) return this;
				var e = this._x0,
					r = this._y0,
					i = this._x1,
					o = this._y1;
				if (isNaN(e)) i = (e = Math.floor(t)) + 1, o = (r = Math.floor(n)) + 1;
				else {
					if (!(e > t || t > i || r > n || n > o)) return this;
					var u, a, c = i - e,
						s = this._root;
					switch (a = (n < (r + o) / 2) << 1 | t < (e + i) / 2) {
						case 0:
							do u = new Array(4), u[a] = s, s = u; while (c *= 2, i = e + c, o = r + c, t > i || n > o);
							break;
						case 1:
							do u = new Array(4), u[a] = s, s = u; while (c *= 2, e = i - c, o = r + c, e > t || n > o);
							break;
						case 2:
							do u = new Array(4), u[a] = s, s = u; while (c *= 2, i = e + c, r = o - c, t > i || r > n);
							break;
						case 3:
							do u = new Array(4), u[a] = s, s = u; while (c *= 2, e = i - c, r = o - c, e > t || r > n)
					}
					this._root && this._root.length && (this._root = s)
				}
				return this._x0 = e, this._y0 = r, this._x1 = i, this._y1 = o, this
			},
			ev = function () {
				var t = [];
				return this.visit(function (n) {
					if (!n.length)
						do t.push(n.data); while (n = n.next)
				}), t
			},
			rv = function (t) {
				return arguments.length ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1]) : isNaN(this._x0) ? void 0 : [
					[this._x0, this._y0],
					[this._x1, this._y1]
				]
			},
			iv = function (t, n, e, r, i) {
				this.node = t, this.x0 = n, this.y0 = e, this.x1 = r, this.y1 = i
			},
			ov = function (t, n, e) {
				var r, i, o, u, a, c, s, l = this._x0,
					f = this._y0,
					h = this._x1,
					p = this._y1,
					d = [],
					v = this._root;
				for (v && d.push(new iv(v, l, f, h, p)), null == e ? e = 1 / 0 : (l = t - e, f = n - e, h = t + e, p = n + e, e *= e); c = d.pop();)
					if (!(!(v = c.node) || (i = c.x0) > h || (o = c.y0) > p || (u = c.x1) < l || (a = c.y1) < f))
						if (v.length) {
							var _ = (i + u) / 2,
								y = (o + a) / 2;
							d.push(new iv(v[3], _, y, u, a), new iv(v[2], i, y, _, a), new iv(v[1], _, o, u, y), new iv(v[0], i, o, _, y)), (s = (n >= y) << 1 | t >= _) && (c = d[d.length - 1], d[d.length - 1] = d[d.length - 1 - s], d[d.length - 1 - s] = c)
						} else {
							var g = t - +this._x.call(null, v.data),
								m = n - +this._y.call(null, v.data),
								x = g * g + m * m;
							if (x < e) {
								var b = Math.sqrt(e = x);
								l = t - b, f = n - b, h = t + b, p = n + b, r = v.data
							}
						}
				return r
			},
			uv = function (t) {
				if (isNaN(o = +this._x.call(null, t)) || isNaN(u = +this._y.call(null, t))) return this;
				var n, e, r, i, o, u, a, c, s, l, f, h, p = this._root,
					d = this._x0,
					v = this._y0,
					_ = this._x1,
					y = this._y1;
				if (!p) return this;
				if (p.length)
					for (; ;) {
						if ((s = o >= (a = (d + _) / 2)) ? d = a : _ = a, (l = u >= (c = (v + y) / 2)) ? v = c : y = c, n = p, !(p = p[f = l << 1 | s])) return this;
						if (!p.length) break;
						(n[f + 1 & 3] || n[f + 2 & 3] || n[f + 3 & 3]) && (e = n, h = f)
					}
				for (; p.data !== t;)
					if (r = p, !(p = p.next)) return this;
				return (i = p.next) && delete p.next, r ? (i ? r.next = i : delete r.next, this) : n ? (i ? n[f] = i : delete n[f], (p = n[0] || n[1] || n[2] || n[3]) && p === (n[3] || n[2] || n[1] || n[0]) && !p.length && (e ? e[h] = p : this._root = p), this) : (this._root = i, this)
			},
			av = function () {
				return this._root
			},
			cv = function () {
				var t = 0;
				return this.visit(function (n) {
					if (!n.length)
						do ++t; while (n = n.next)
				}), t
			},
			sv = function (t) {
				var n, e, r, i, o, u, a = [],
					c = this._root;
				for (c && a.push(new iv(c, this._x0, this._y0, this._x1, this._y1)); n = a.pop();)
					if (!t(c = n.node, r = n.x0, i = n.y0, o = n.x1, u = n.y1) && c.length) {
						var s = (r + o) / 2,
							l = (i + u) / 2;
						(e = c[3]) && a.push(new iv(e, s, l, o, u)), (e = c[2]) && a.push(new iv(e, r, l, s, u)), (e = c[1]) && a.push(new iv(e, s, i, o, l)), (e = c[0]) && a.push(new iv(e, r, i, s, l))
					}
				return this
			},
			lv = function (t) {
				var n, e = [],
					r = [];
				for (this._root && e.push(new iv(this._root, this._x0, this._y0, this._x1, this._y1)); n = e.pop();) {
					var i = n.node;
					if (i.length) {
						var o, u = n.x0,
							a = n.y0,
							c = n.x1,
							s = n.y1,
							l = (u + c) / 2,
							f = (a + s) / 2;
						(o = i[0]) && e.push(new iv(o, u, a, l, f)), (o = i[1]) && e.push(new iv(o, l, a, c, f)), (o = i[2]) && e.push(new iv(o, u, f, l, s)), (o = i[3]) && e.push(new iv(o, l, f, c, s))
					}
					r.push(n)
				}
				for (; n = r.pop();) t(n.node, n.x0, n.y0, n.x1, n.y1);
				return this
			},
			fv = function (t) {
				return arguments.length ? (this._x = t, this) : this._x
			},
			hv = function (t) {
				return arguments.length ? (this._y = t, this) : this._y
			},
			pv = nr.prototype = er.prototype;
		pv.copy = function () {
			var t, n, e = new er(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
				r = this._root;
			if (!r) return e;
			if (!r.length) return e._root = rr(r), e;
			for (t = [{
				source: r,
				target: e._root = new Array(4)
			}]; r = t.pop();)
				for (var i = 0; i < 4; ++i)(n = r.source[i]) && (n.length ? t.push({
					source: n,
					target: r.target[i] = new Array(4)
				}) : r.target[i] = rr(n));
			return e
		}, pv.add = tv, pv.addAll = Qe, pv.cover = nv, pv.data = ev, pv.extent = rv, pv.find = ov, pv.remove = uv, pv.removeAll = Je, pv.root = av, pv.size = cv, pv.visit = sv, pv.visitAfter = lv, pv.x = fv, pv.y = hv;
		var dv, vv = function (t) {
			function n() {
				function t(t, n, e, r, i) {
					var o = t.data,
						a = t.r,
						p = f + a; {
						if (!o) return n > s + p || r < s - p || e > l + p || i < l - p;
						if (o.index > c.index) {
							var d = s - o.x - o.vx,
								v = l - o.y - o.vy,
								_ = d * d + v * v;
							_ < p * p && (0 === d && (d = Kd(), _ += d * d), 0 === v && (v = Kd(), _ += v * v), _ = (p - (_ = Math.sqrt(_))) / _ * u, c.vx += (d *= _) * (p = (a *= a) / (h + a)), c.vy += (v *= _) * p, o.vx -= d * (p = 1 - p), o.vy -= v * p)
						}
					}
				}
				for (var n, r, c, s, l, f, h, p = i.length, d = 0; d < a; ++d)
					for (r = nr(i, ir, or).visitAfter(e), n = 0; n < p; ++n) c = i[n], f = o[c.index], h = f * f, s = c.x + c.vx, l = c.y + c.vy, r.visit(t)
			}

			function e(t) {
				if (t.data) return t.r = o[t.data.index];
				for (var n = t.r = 0; n < 4; ++n) t[n] && t[n].r > t.r && (t.r = t[n].r)
			}

			function r() {
				if (i) {
					var n, e, r = i.length;
					for (o = new Array(r), n = 0; n < r; ++n) e = i[n], o[e.index] = +t(e, n, i)
				}
			}
			var i, o, u = 1,
				a = 1;
			return "function" != typeof t && (t = Jd(null == t ? 1 : +t)), n.initialize = function (t) {
				i = t, r()
			}, n.iterations = function (t) {
				return arguments.length ? (a = +t, n) : a
			}, n.strength = function (t) {
				return arguments.length ? (u = +t, n) : u
			}, n.radius = function (e) {
				return arguments.length ? (t = "function" == typeof e ? e : Jd(+e), r(), n) : t
			}, n
		},
			_v = function (t) {
				function n(t) {
					return 1 / Math.min(s[t.source.index], s[t.target.index])
				}

				function e(n) {
					for (var e = 0, r = t.length; e < d; ++e)
						for (var i, o, c, s, f, h, p, v = 0; v < r; ++v) i = t[v], o = i.source, c = i.target, s = c.x + c.vx - o.x - o.vx || Kd(), f = c.y + c.vy - o.y - o.vy || Kd(), h = Math.sqrt(s * s + f * f), h = (h - a[v]) / h * n * u[v], s *= h, f *= h, c.vx -= s * (p = l[v]), c.vy -= f * p, o.vx += s * (p = 1 - p), o.vy += f * p
				}

				function r() {
					if (c) {
						var n, e, r = c.length,
							h = t.length,
							p = Fe(c, f);
						for (n = 0, s = new Array(r); n < h; ++n) e = t[n], e.index = n, "object" != typeof e.source && (e.source = ar(p, e.source)), "object" != typeof e.target && (e.target = ar(p, e.target)), s[e.source.index] = (s[e.source.index] || 0) + 1, s[e.target.index] = (s[e.target.index] || 0) + 1;
						for (n = 0, l = new Array(h); n < h; ++n) e = t[n], l[n] = s[e.source.index] / (s[e.source.index] + s[e.target.index]);
						u = new Array(h), i(), a = new Array(h), o()
					}
				}

				function i() {
					if (c)
						for (var n = 0, e = t.length; n < e; ++n) u[n] = +h(t[n], n, t)
				}

				function o() {
					if (c)
						for (var n = 0, e = t.length; n < e; ++n) a[n] = +p(t[n], n, t)
				}
				var u, a, c, s, l, f = ur,
					h = n,
					p = Jd(30),
					d = 1;
				return null == t && (t = []), e.initialize = function (t) {
					c = t, r()
				}, e.links = function (n) {
					return arguments.length ? (t = n, r(), e) : t
				}, e.id = function (t) {
					return arguments.length ? (f = t, e) : f
				}, e.iterations = function (t) {
					return arguments.length ? (d = +t, e) : d
				}, e.strength = function (t) {
					return arguments.length ? (h = "function" == typeof t ? t : Jd(+t), i(), e) : h
				}, e.distance = function (t) {
					return arguments.length ? (p = "function" == typeof t ? t : Jd(+t), o(), e) : p
				}, e
			},
			yv = 10,
			gv = Math.PI * (3 - Math.sqrt(5)),
			mv = function (t) {
				function n() {
					e(), d.call("tick", o), u < a && (h.stop(), d.call("end", o))
				}

				function e() {
					var n, e, r = t.length;
					for (u += (s - u) * c, f.each(function (t) {
						t(u)
					}), n = 0; n < r; ++n) e = t[n], null == e.fx ? e.x += e.vx *= l : (e.x = e.fx, e.vx = 0), null == e.fy ? e.y += e.vy *= l : (e.y = e.fy, e.vy = 0)
				}

				function r() {
					for (var n, e = 0, r = t.length; e < r; ++e) {
						if (n = t[e], n.index = e, isNaN(n.x) || isNaN(n.y)) {
							var i = yv * Math.sqrt(e),
								o = e * gv;
							n.x = i * Math.cos(o), n.y = i * Math.sin(o)
						} (isNaN(n.vx) || isNaN(n.vy)) && (n.vx = n.vy = 0)
					}
				}

				function i(n) {
					return n.initialize && n.initialize(t), n
				}
				var o, u = 1,
					a = .001,
					c = 1 - Math.pow(a, 1 / 300),
					s = 0,
					l = .6,
					f = Fe(),
					h = _n(n),
					d = p("tick", "end");
				return null == t && (t = []), r(), o = {
					tick: e,
					restart: function () {
						return h.restart(n), o
					},
					stop: function () {
						return h.stop(), o
					},
					nodes: function (n) {
						return arguments.length ? (t = n, r(), f.each(i), o) : t
					},
					alpha: function (t) {
						return arguments.length ? (u = +t, o) : u
					},
					alphaMin: function (t) {
						return arguments.length ? (a = +t, o) : a
					},
					alphaDecay: function (t) {
						return arguments.length ? (c = +t, o) : +c
					},
					alphaTarget: function (t) {
						return arguments.length ? (s = +t, o) : s
					},
					velocityDecay: function (t) {
						return arguments.length ? (l = 1 - t, o) : 1 - l
					},
					force: function (t, n) {
						return arguments.length > 1 ? (null == n ? f.remove(t) : f.set(t, i(n)), o) : f.get(t)
					},
					find: function (n, e, r) {
						var i, o, u, a, c, s = 0,
							l = t.length;
						for (null == r ? r = 1 / 0 : r *= r, s = 0; s < l; ++s) a = t[s], i = n - a.x, o = e - a.y, u = i * i + o * o, u < r && (c = a, r = u);
						return c
					},
					on: function (t, n) {
						return arguments.length > 1 ? (d.on(t, n), o) : d.on(t)
					}
				}
			},
			xv = function () {
				function t(t) {
					var n, a = i.length,
						c = nr(i, cr, sr).visitAfter(e);
					for (u = t, n = 0; n < a; ++n) o = i[n], c.visit(r)
				}

				function n() {
					if (i) {
						var t, n, e = i.length;
						for (a = new Array(e), t = 0; t < e; ++t) n = i[t], a[n.index] = +c(n, t, i)
					}
				}

				function e(t) {
					var n, e, r, i, o, u = 0;
					if (t.length) {
						for (r = i = o = 0; o < 4; ++o)(n = t[o]) && (e = n.value) && (u += e, r += e * n.x, i += e * n.y);
						t.x = r / u, t.y = i / u
					} else {
						n = t, n.x = n.data.x, n.y = n.data.y;
						do u += a[n.data.index]; while (n = n.next)
					}
					t.value = u
				}

				function r(t, n, e, r) {
					if (!t.value) return !0;
					var i = t.x - o.x,
						c = t.y - o.y,
						h = r - n,
						p = i * i + c * c;
					if (h * h / f < p) return p < l && (0 === i && (i = Kd(), p += i * i), 0 === c && (c = Kd(), p += c * c), p < s && (p = Math.sqrt(s * p)), o.vx += i * t.value * u / p, o.vy += c * t.value * u / p), !0;
					if (!(t.length || p >= l)) {
						(t.data !== o || t.next) && (0 === i && (i = Kd(), p += i * i), 0 === c && (c = Kd(), p += c * c), p < s && (p = Math.sqrt(s * p)));
						do t.data !== o && (h = a[t.data.index] * u / p, o.vx += i * h, o.vy += c * h); while (t = t.next)
					}
				}
				var i, o, u, a, c = Jd(-30),
					s = 1,
					l = 1 / 0,
					f = .81;
				return t.initialize = function (t) {
					i = t, n()
				}, t.strength = function (e) {
					return arguments.length ? (c = "function" == typeof e ? e : Jd(+e), n(), t) : c
				}, t.distanceMin = function (n) {
					return arguments.length ? (s = n * n, t) : Math.sqrt(s)
				}, t.distanceMax = function (n) {
					return arguments.length ? (l = n * n, t) : Math.sqrt(l)
				}, t.theta = function (n) {
					return arguments.length ? (f = n * n, t) : Math.sqrt(f)
				}, t
			},
			bv = function (t) {
				function n(t) {
					for (var n, e = 0, u = r.length; e < u; ++e) n = r[e], n.vx += (o[e] - n.x) * i[e] * t
				}

				function e() {
					if (r) {
						var n, e = r.length;
						for (i = new Array(e), o = new Array(e), n = 0; n < e; ++n) i[n] = isNaN(o[n] = +t(r[n], n, r)) ? 0 : +u(r[n], n, r)
					}
				}
				var r, i, o, u = Jd(.1);
				return "function" != typeof t && (t = Jd(null == t ? 0 : +t)), n.initialize = function (t) {
					r = t, e()
				}, n.strength = function (t) {
					return arguments.length ? (u = "function" == typeof t ? t : Jd(+t), e(), n) : u
				}, n.x = function (r) {
					return arguments.length ? (t = "function" == typeof r ? r : Jd(+r), e(), n) : t
				}, n
			},
			wv = function (t) {
				function n(t) {
					for (var n, e = 0, u = r.length; e < u; ++e) n = r[e], n.vy += (o[e] - n.y) * i[e] * t
				}

				function e() {
					if (r) {
						var n, e = r.length;
						for (i = new Array(e), o = new Array(e), n = 0; n < e; ++n) i[n] = isNaN(o[n] = +t(r[n], n, r)) ? 0 : +u(r[n], n, r)
					}
				}
				var r, i, o, u = Jd(.1);
				return "function" != typeof t && (t = Jd(null == t ? 0 : +t)), n.initialize = function (t) {
					r = t, e()
				}, n.strength = function (t) {
					return arguments.length ? (u = "function" == typeof t ? t : Jd(+t), e(), n) : u
				}, n.y = function (r) {
					return arguments.length ? (t = "function" == typeof r ? r : Jd(+r), e(), n) : t
				}, n
			},
			Mv = function (t, n) {
				if ((e = (t = n ? t.toExponential(n - 1) : t.toExponential()).indexOf("e")) < 0) return null;
				var e, r = t.slice(0, e);
				return [r.length > 1 ? r[0] + r.slice(2) : r, +t.slice(e + 1)]
			},
			Sv = function (t) {
				return t = Mv(Math.abs(t)), t ? t[1] : NaN
			},
			Tv = function (t, n) {
				return function (e, r) {
					for (var i = e.length, o = [], u = 0, a = t[0], c = 0; i > 0 && a > 0 && (c + a + 1 > r && (a = Math.max(1, r - c)), o.push(e.substring(i -= a, i + a)), !((c += a + 1) > r));) a = t[u = (u + 1) % t.length];
					return o.reverse().join(n)
				}
			},
			kv = function (t, n) {
				t = t.toPrecision(n);
				t: for (var e, r = t.length, i = 1, o = -1; i < r; ++i) switch (t[i]) {
					case ".":
						o = e = i;
						break;
					case "0":
						0 === o && (o = i), e = i;
						break;
					case "e":
						break t;
					default:
						o > 0 && (o = 0)
				}
				return o > 0 ? t.slice(0, o) + t.slice(e + 1) : t
			},
			Nv = function (t, n) {
				var e = Mv(t, n);
				if (!e) return t + "";
				var r = e[0],
					i = e[1],
					o = i - (dv = 3 * Math.max(-8, Math.min(8, Math.floor(i / 3)))) + 1,
					u = r.length;
				return o === u ? r : o > u ? r + new Array(o - u + 1).join("0") : o > 0 ? r.slice(0, o) + "." + r.slice(o) : "0." + new Array(1 - o).join("0") + Mv(t, Math.max(0, n + o - 1))[0]
			},
			Av = function (t, n) {
				var e = Mv(t, n);
				if (!e) return t + "";
				var r = e[0],
					i = e[1];
				return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0")
			},
			Ev = {
				"": kv,
				"%": function (t, n) {
					return (100 * t).toFixed(n)
				},
				b: function (t) {
					return Math.round(t).toString(2)
				},
				c: function (t) {
					return t + ""
				},
				d: function (t) {
					return Math.round(t).toString(10)
				},
				e: function (t, n) {
					return t.toExponential(n)
				},
				f: function (t, n) {
					return t.toFixed(n)
				},
				g: function (t, n) {
					return t.toPrecision(n)
				},
				o: function (t) {
					return Math.round(t).toString(8)
				},
				p: function (t, n) {
					return Av(100 * t, n)
				},
				r: Av,
				s: Nv,
				X: function (t) {
					return Math.round(t).toString(16).toUpperCase()
				},
				x: function (t) {
					return Math.round(t).toString(16)
				}
			},
			Cv = /^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?([a-z%])?$/i,
			zv = function (t) {
				return new lr(t)
			};
		lr.prototype.toString = function () {
			return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (null == this.width ? "" : Math.max(1, 0 | this.width)) + (this.comma ? "," : "") + (null == this.precision ? "" : "." + Math.max(0, 0 | this.precision)) + this.type
		};
		var Pv, Rv = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"],
			Lv = function (t) {
				function n(t) {
					function n(t) {
						var n, i, c, g = d,
							m = v;
						if ("c" === p) m = _(t) + m, t = "";
						else {
							t = +t;
							var x = (t < 0 || 1 / t < 0) && (t *= -1, !0);
							if (t = _(t, h), x)
								for (n = -1, i = t.length, x = !1; ++n < i;)
									if (c = t.charCodeAt(n), 48 < c && c < 58 || "x" === p && 96 < c && c < 103 || "X" === p && 64 < c && c < 71) {
										x = !0;
										break
									}
							if (g = (x ? "(" === a ? a : "-" : "-" === a || "(" === a ? "" : a) + g, m = m + ("s" === p ? Rv[8 + dv / 3] : "") + (x && "(" === a ? ")" : ""), y)
								for (n = -1, i = t.length; ++n < i;)
									if (c = t.charCodeAt(n), 48 > c || c > 57) {
										m = (46 === c ? o + t.slice(n + 1) : t.slice(n)) + m, t = t.slice(0, n);
										break
									}
						}
						f && !s && (t = r(t, 1 / 0));
						var b = g.length + t.length + m.length,
							w = b < l ? new Array(l - b + 1).join(e) : "";
						switch (f && s && (t = r(w + t, w.length ? l - m.length : 1 / 0), w = ""), u) {
							case "<":
								return g + t + m + w;
							case "=":
								return g + w + t + m;
							case "^":
								return w.slice(0, b = w.length >> 1) + g + t + m + w.slice(b)
						}
						return w + g + t + m
					}
					t = zv(t);
					var e = t.fill,
						u = t.align,
						a = t.sign,
						c = t.symbol,
						s = t.zero,
						l = t.width,
						f = t.comma,
						h = t.precision,
						p = t.type,
						d = "$" === c ? i[0] : "#" === c && /[boxX]/.test(p) ? "0" + p.toLowerCase() : "",
						v = "$" === c ? i[1] : /[%p]/.test(p) ? "%" : "",
						_ = Ev[p],
						y = !p || /[defgprs%]/.test(p);
					return h = null == h ? p ? 6 : 12 : /[gprs]/.test(p) ? Math.max(1, Math.min(21, h)) : Math.max(0, Math.min(20, h)), n.toString = function () {
						return t + ""
					}, n
				}

				function e(t, e) {
					var r = n((t = zv(t), t.type = "f", t)),
						i = 3 * Math.max(-8, Math.min(8, Math.floor(Sv(e) / 3))),
						o = Math.pow(10, -i),
						u = Rv[8 + i / 3];
					return function (t) {
						return r(o * t) + u
					}
				}
				var r = t.grouping && t.thousands ? Tv(t.grouping, t.thousands) : fr,
					i = t.currency,
					o = t.decimal;
				return {
					format: n,
					formatPrefix: e
				}
			};
		hr({
			decimal: ".",
			thousands: ",",
			grouping: [3],
			currency: ["$", ""]
		});
		var qv = function (t) {
			return Math.max(0, -Sv(Math.abs(t)))
		},
			Dv = function (t, n) {
				return Math.max(0, 3 * Math.max(-8, Math.min(8, Math.floor(Sv(n) / 3))) - Sv(Math.abs(t)))
			},
			Ov = function (t, n) {
				return t = Math.abs(t), n = Math.abs(n) - t, Math.max(0, Sv(n) - Sv(t)) + 1
			},
			Uv = function () {
				return new pr
			};
		pr.prototype = {
			constructor: pr,
			reset: function () {
				this.s = this.t = 0
			},
			add: function (t) {
				dr(__, t, this.t), dr(this, __.s, this.s), this.s ? this.t += __.t : this.s = __.t
			},
			valueOf: function () {
				return this.s
			}
		};
		var Iv, Fv, Bv, Yv, jv, Hv, Xv, Vv, Wv, Gv, $v, Zv, Qv, Jv, Kv, t_, n_, e_, r_, i_, o_, u_, a_, c_, s_, l_, f_, h_, p_, d_, v_, __ = new pr,
			y_ = 1e-6,
			g_ = 1e-12,
			m_ = Math.PI,
			x_ = m_ / 2,
			b_ = m_ / 4,
			w_ = 2 * m_,
			M_ = 180 / m_,
			S_ = m_ / 180,
			T_ = Math.abs,
			k_ = Math.atan,
			N_ = Math.atan2,
			A_ = Math.cos,
			E_ = Math.ceil,
			C_ = Math.exp,
			z_ = Math.log,
			P_ = Math.pow,
			R_ = Math.sin,
			L_ = Math.sign || function (t) {
				return t > 0 ? 1 : t < 0 ? -1 : 0
			},
			q_ = Math.sqrt,
			D_ = Math.tan,
			O_ = {
				Feature: function (t, n) {
					mr(t.geometry, n)
				},
				FeatureCollection: function (t, n) {
					for (var e = t.features, r = -1, i = e.length; ++r < i;) mr(e[r].geometry, n)
				}
			},
			U_ = {
				Sphere: function (t, n) {
					n.sphere()
				},
				Point: function (t, n) {
					t = t.coordinates, n.point(t[0], t[1], t[2])
				},
				MultiPoint: function (t, n) {
					for (var e = t.coordinates, r = -1, i = e.length; ++r < i;) t = e[r], n.point(t[0], t[1], t[2])
				},
				LineString: function (t, n) {
					xr(t.coordinates, n, 0)
				},
				MultiLineString: function (t, n) {
					for (var e = t.coordinates, r = -1, i = e.length; ++r < i;) xr(e[r], n, 0)
				},
				Polygon: function (t, n) {
					br(t.coordinates, n)
				},
				MultiPolygon: function (t, n) {
					for (var e = t.coordinates, r = -1, i = e.length; ++r < i;) br(e[r], n)
				},
				GeometryCollection: function (t, n) {
					for (var e = t.geometries, r = -1, i = e.length; ++r < i;) mr(e[r], n)
				}
			},
			I_ = function (t, n) {
				t && O_.hasOwnProperty(t.type) ? O_[t.type](t, n) : mr(t, n)
			},
			F_ = Uv(),
			B_ = Uv(),
			Y_ = {
				point: gr,
				lineStart: gr,
				lineEnd: gr,
				polygonStart: function () {
					F_.reset(), Y_.lineStart = wr, Y_.lineEnd = Mr
				},
				polygonEnd: function () {
					var t = +F_;
					B_.add(t < 0 ? w_ + t : t), this.lineStart = this.lineEnd = this.point = gr
				},
				sphere: function () {
					B_.add(w_)
				}
			},
			j_ = function (t) {
				return B_.reset(), I_(t, Y_), 2 * B_
			},
			H_ = Uv(),
			X_ = {
				point: Rr,
				lineStart: qr,
				lineEnd: Dr,
				polygonStart: function () {
					X_.point = Or, X_.lineStart = Ur, X_.lineEnd = Ir, H_.reset(), Y_.polygonStart()
				},
				polygonEnd: function () {
					Y_.polygonEnd(), X_.point = Rr, X_.lineStart = qr, X_.lineEnd = Dr, F_ < 0 ? (Hv = -(Vv = 180), Xv = -(Wv = 90)) : H_ > y_ ? Wv = 90 : H_ < -y_ && (Xv = -90), Kv[0] = Hv, Kv[1] = Vv
				}
			},
			V_ = function (t) {
				var n, e, r, i, o, u, a;
				if (Wv = Vv = -(Hv = Xv = 1 / 0), Jv = [], I_(t, X_), e = Jv.length) {
					for (Jv.sort(Br), n = 1, r = Jv[0], o = [r]; n < e; ++n) i = Jv[n], Yr(r, i[0]) || Yr(r, i[1]) ? (Fr(r[0], i[1]) > Fr(r[0], r[1]) && (r[1] = i[1]), Fr(i[0], r[1]) > Fr(r[0], r[1]) && (r[0] = i[0])) : o.push(r = i);
					for (u = -(1 / 0), e = o.length - 1, n = 0, r = o[e]; n <= e; r = i, ++n) i = o[n], (a = Fr(r[1], i[0])) > u && (u = a, Hv = i[0], Vv = r[1])
				}
				return Jv = Kv = null, Hv === 1 / 0 || Xv === 1 / 0 ? [
					[NaN, NaN],
					[NaN, NaN]
				] : [
						[Hv, Xv],
						[Vv, Wv]
					]
			},
			W_ = {
				sphere: gr,
				point: jr,
				lineStart: Xr,
				lineEnd: Gr,
				polygonStart: function () {
					W_.lineStart = $r, W_.lineEnd = Zr
				},
				polygonEnd: function () {
					W_.lineStart = Xr, W_.lineEnd = Gr
				}
			},
			G_ = function (t) {
				t_ = n_ = e_ = r_ = i_ = o_ = u_ = a_ = c_ = s_ = l_ = 0, I_(t, W_);
				var n = c_,
					e = s_,
					r = l_,
					i = n * n + e * e + r * r;
				return i < g_ && (n = o_, e = u_, r = a_, n_ < y_ && (n = e_, e = r_, r = i_), i = n * n + e * e + r * r, i < g_) ? [NaN, NaN] : [N_(e, n) * M_, _r(r / q_(i)) * M_]
			},
			$_ = function (t) {
				return function () {
					return t
				}
			},
			Z_ = function (t, n) {
				function e(e, r) {
					return e = t(e, r), n(e[0], e[1])
				}
				return t.invert && n.invert && (e.invert = function (e, r) {
					return e = n.invert(e, r), e && t.invert(e[0], e[1])
				}), e
			};
		Kr.invert = Kr;
		var Q_, J_, K_, ty, ny, ey, ry, iy, oy, uy, ay, cy = function (t) {
			function n(n) {
				return n = t(n[0] * S_, n[1] * S_), n[0] *= M_, n[1] *= M_, n
			}
			return t = ti(t[0] * S_, t[1] * S_, t.length > 2 ? t[2] * S_ : 0), n.invert = function (n) {
				return n = t.invert(n[0] * S_, n[1] * S_), n[0] *= M_, n[1] *= M_, n
			}, n
		},
			sy = function () {
				function t(t, n) {
					e.push(t = r(t, n)), t[0] *= M_, t[1] *= M_
				}

				function n() {
					var t = i.apply(this, arguments),
						n = o.apply(this, arguments) * S_,
						c = u.apply(this, arguments) * S_;
					return e = [], r = ti(-t[0] * S_, -t[1] * S_, 0).invert, ii(a, n, c, 1), t = {
						type: "Polygon",
						coordinates: [e]
					}, e = r = null, t
				}
				var e, r, i = $_([0, 0]),
					o = $_(90),
					u = $_(6),
					a = {
						point: t
					};
				return n.center = function (t) {
					return arguments.length ? (i = "function" == typeof t ? t : $_([+t[0], +t[1]]), n) : i
				}, n.radius = function (t) {
					return arguments.length ? (o = "function" == typeof t ? t : $_(+t), n) : o
				}, n.precision = function (t) {
					return arguments.length ? (u = "function" == typeof t ? t : $_(+t), n) : u
				}, n
			},
			ly = function () {
				var t, n = [];
				return {
					point: function (n, e) {
						t.push([n, e])
					},
					lineStart: function () {
						n.push(t = [])
					},
					lineEnd: gr,
					rejoin: function () {
						n.length > 1 && n.push(n.pop().concat(n.shift()))
					},
					result: function () {
						var e = n;
						return n = [], t = null, e
					}
				}
			},
			fy = function (t, n, e, r, i, o) {
				var u, a = t[0],
					c = t[1],
					s = n[0],
					l = n[1],
					f = 0,
					h = 1,
					p = s - a,
					d = l - c;
				if (u = e - a, p || !(u > 0)) {
					if (u /= p, p < 0) {
						if (u < f) return;
						u < h && (h = u)
					} else if (p > 0) {
						if (u > h) return;
						u > f && (f = u)
					}
					if (u = i - a, p || !(u < 0)) {
						if (u /= p, p < 0) {
							if (u > h) return;
							u > f && (f = u)
						} else if (p > 0) {
							if (u < f) return;
							u < h && (h = u)
						}
						if (u = r - c, d || !(u > 0)) {
							if (u /= d, d < 0) {
								if (u < f) return;
								u < h && (h = u)
							} else if (d > 0) {
								if (u > h) return;
								u > f && (f = u)
							}
							if (u = o - c, d || !(u < 0)) {
								if (u /= d, d < 0) {
									if (u > h) return;
									u > f && (f = u)
								} else if (d > 0) {
									if (u < f) return;
									u < h && (h = u)
								}
								return f > 0 && (t[0] = a + f * p, t[1] = c + f * d), h < 1 && (n[0] = a + h * p, n[1] = c + h * d), !0
							}
						}
					}
				}
			},
			hy = function (t, n) {
				return T_(t[0] - n[0]) < y_ && T_(t[1] - n[1]) < y_
			},
			py = function (t, n, e, r, i) {
				var o, u, a = [],
					c = [];
				if (t.forEach(function (t) {
					if (!((n = t.length - 1) <= 0)) {
						var n, e, r = t[0],
							u = t[n];
						if (hy(r, u)) {
							for (i.lineStart(), o = 0; o < n; ++o) i.point((r = t[o])[0], r[1]);
							return void i.lineEnd()
						}
						a.push(e = new ui(r, t, null, !0)), c.push(e.o = new ui(r, null, e, !1)), a.push(e = new ui(u, t, null, !1)), c.push(e.o = new ui(u, null, e, !0))
					}
				}), a.length) {
					for (c.sort(n), ai(a), ai(c), o = 0, u = c.length; o < u; ++o) c[o].e = e = !e;
					for (var s, l, f = a[0]; ;) {
						for (var h = f, p = !0; h.v;)
							if ((h = h.n) === f) return;
						s = h.z, i.lineStart();
						do {
							if (h.v = h.o.v = !0, h.e) {
								if (p)
									for (o = 0, u = s.length; o < u; ++o) i.point((l = s[o])[0], l[1]);
								else r(h.x, h.n.x, 1, i);
								h = h.n
							} else {
								if (p)
									for (s = h.p.z, o = s.length - 1; o >= 0; --o) i.point((l = s[o])[0], l[1]);
								else r(h.x, h.p.x, -1, i);
								h = h.p
							}
							h = h.o, s = h.z, p = !p
						} while (!h.v);
						i.lineEnd()
					}
				}
			},
			dy = 1e9,
			vy = -dy,
			_y = function () {
				var t, n, e, r = 0,
					i = 0,
					o = 960,
					u = 500;
				return e = {
					stream: function (e) {
						return t && n === e ? t : t = ci(r, i, o, u)(n = e)
					},
					extent: function (a) {
						return arguments.length ? (r = +a[0][0], i = +a[0][1], o = +a[1][0], u = +a[1][1], t = n = null, e) : [
							[r, i],
							[o, u]
						]
					}
				}
			},
			yy = Uv(),
			gy = {
				sphere: gr,
				point: gr,
				lineStart: si,
				lineEnd: gr,
				polygonStart: gr,
				polygonEnd: gr
			},
			my = function (t) {
				return yy.reset(), I_(t, gy), +yy
			},
			xy = [null, null],
			by = {
				type: "LineString",
				coordinates: xy
			},
			wy = function (t, n) {
				return xy[0] = t, xy[1] = n, my(by)
			},
			My = function (t, n) {
				var e = t[0] * S_,
					r = t[1] * S_,
					i = n[0] * S_,
					o = n[1] * S_,
					u = A_(r),
					a = R_(r),
					c = A_(o),
					s = R_(o),
					l = u * A_(e),
					f = u * R_(e),
					h = c * A_(i),
					p = c * R_(i),
					d = 2 * _r(q_(yr(o - r) + u * c * yr(i - e))),
					v = R_(d),
					_ = d ? function (t) {
						var n = R_(t *= d) / v,
							e = R_(d - t) / v,
							r = e * l + n * h,
							i = e * f + n * p,
							o = e * a + n * s;
						return [N_(i, r) * M_, N_(o, q_(r * r + i * i)) * M_]
					} : function () {
						return [e * M_, r * M_]
					};
				return _.distance = d, _
			},
			Sy = function (t) {
				return t
			},
			Ty = Uv(),
			ky = Uv(),
			Ny = {
				point: gr,
				lineStart: gr,
				lineEnd: gr,
				polygonStart: function () {
					Ny.lineStart = yi, Ny.lineEnd = xi
				},
				polygonEnd: function () {
					Ny.lineStart = Ny.lineEnd = Ny.point = gr, Ty.add(T_(ky)), ky.reset()
				},
				result: function () {
					var t = Ty / 2;
					return Ty.reset(), t
				}
			},
			Ay = 1 / 0,
			Ey = Ay,
			Cy = -Ay,
			zy = Cy,
			Py = {
				point: bi,
				lineStart: gr,
				lineEnd: gr,
				polygonStart: gr,
				polygonEnd: gr,
				result: function () {
					var t = [
						[Ay, Ey],
						[Cy, zy]
					];
					return Cy = zy = -(Ey = Ay = 1 / 0), t
				}
			},
			Ry = 0,
			Ly = 0,
			qy = 0,
			Dy = 0,
			Oy = 0,
			Uy = 0,
			Iy = 0,
			Fy = 0,
			By = 0,
			Yy = {
				point: wi,
				lineStart: Mi,
				lineEnd: ki,
				polygonStart: function () {
					Yy.lineStart = Ni, Yy.lineEnd = Ai
				},
				polygonEnd: function () {
					Yy.point = wi, Yy.lineStart = Mi, Yy.lineEnd = ki
				},
				result: function () {
					var t = By ? [Iy / By, Fy / By] : Uy ? [Dy / Uy, Oy / Uy] : qy ? [Ry / qy, Ly / qy] : [NaN, NaN];
					return Ry = Ly = qy = Dy = Oy = Uy = Iy = Fy = By = 0, t
				}
			};
		zi.prototype = {
			_radius: 4.5,
			pointRadius: function (t) {
				return this._radius = t, this
			},
			polygonStart: function () {
				this._line = 0
			},
			polygonEnd: function () {
				this._line = NaN
			},
			lineStart: function () {
				this._point = 0
			},
			lineEnd: function () {
				0 === this._line && this._context.closePath(), this._point = NaN
			},
			point: function (t, n) {
				switch (this._point) {
					case 0:
						this._context.moveTo(t, n), this._point = 1;
						break;
					case 1:
						this._context.lineTo(t, n);
						break;
					default:
						this._context.moveTo(t + this._radius, n), this._context.arc(t, n, this._radius, 0, w_)
				}
			},
			result: gr
		}, Pi.prototype = {
			_circle: Ri(4.5),
			pointRadius: function (t) {
				return this._circle = Ri(t), this
			},
			polygonStart: function () {
				this._line = 0
			},
			polygonEnd: function () {
				this._line = NaN
			},
			lineStart: function () {
				this._point = 0
			},
			lineEnd: function () {
				0 === this._line && this._string.push("Z"), this._point = NaN
			},
			point: function (t, n) {
				switch (this._point) {
					case 0:
						this._string.push("M", t, ",", n), this._point = 1;
						break;
					case 1:
						this._string.push("L", t, ",", n);
						break;
					default:
						this._string.push("M", t, ",", n, this._circle)
				}
			},
			result: function () {
				if (this._string.length) {
					var t = this._string.join("");
					return this._string = [], t
				}
			}
		};
		var jy = function (t, n) {
			function e(t) {
				return t && ("function" == typeof o && i.pointRadius(+o.apply(this, arguments)), I_(t, r(i))), i.result()
			}
			var r, i, o = 4.5;
			return e.area = function (t) {
				return I_(t, r(Ny)), Ny.result()
			}, e.bounds = function (t) {
				return I_(t, r(Py)), Py.result()
			}, e.centroid = function (t) {
				return I_(t, r(Yy)), Yy.result()
			}, e.projection = function (n) {
				return arguments.length ? (r = null == n ? (t = null, Sy) : (t = n).stream, e) : t
			}, e.context = function (t) {
				return arguments.length ? (i = null == t ? (n = null, new Pi) : new zi(n = t), "function" != typeof o && i.pointRadius(o), e) : n
			}, e.pointRadius = function (t) {
				return arguments.length ? (o = "function" == typeof t ? t : (i.pointRadius(+t), +t), e) : o
			}, e.projection(t).context(n)
		},
			Hy = Uv(),
			Xy = function (t, n) {
				var e = n[0],
					r = n[1],
					i = [R_(e), -A_(e), 0],
					o = 0,
					u = 0;
				Hy.reset();
				for (var a = 0, c = t.length; a < c; ++a)
					if (l = (s = t[a]).length)
						for (var s, l, f = s[l - 1], h = f[0], p = f[1] / 2 + b_, d = R_(p), v = A_(p), _ = 0; _ < l; ++_, h = g, d = x, v = b, f = y) {
							var y = s[_],
								g = y[0],
								m = y[1] / 2 + b_,
								x = R_(m),
								b = A_(m),
								w = g - h,
								M = w >= 0 ? 1 : -1,
								S = M * w,
								T = S > m_,
								k = d * x;
							if (Hy.add(N_(k * M * R_(S), v * b + k * A_(S))), o += T ? w + M * w_ : w, T ^ h >= e ^ g >= e) {
								var N = Er(Nr(f), Nr(y));
								Pr(N);
								var A = Er(i, N);
								Pr(A);
								var E = (T ^ w >= 0 ? -1 : 1) * _r(A[2]);
								(r > E || r === E && (N[0] || N[1])) && (u += T ^ w >= 0 ? 1 : -1)
							}
						}
				return (o < -y_ || o < y_ && Hy < -y_) ^ 1 & u
			},
			Vy = function (t, n, e, r) {
				return function (i, o) {
					function u(n, e) {
						var r = i(n, e);
						t(n = r[0], e = r[1]) && o.point(n, e)
					}

					function a(t, n) {
						var e = i(t, n);
						_.point(e[0], e[1])
					}

					function c() {
						b.point = a, _.lineStart()
					}

					function s() {
						b.point = u, _.lineEnd()
					}

					function l(t, n) {
						v.push([t, n]);
						var e = i(t, n);
						m.point(e[0], e[1])
					}

					function f() {
						m.lineStart(), v = []
					}

					function h() {
						l(v[0][0], v[0][1]), m.lineEnd();
						var t, n, e, r, i = m.clean(),
							u = g.result(),
							a = u.length;
						if (v.pop(), p.push(v), v = null, a)
							if (1 & i) {
								if (e = u[0], (n = e.length - 1) > 0) {
									for (x || (o.polygonStart(), x = !0), o.lineStart(), t = 0; t < n; ++t) o.point((r = e[t])[0], r[1]);
									o.lineEnd()
								}
							} else a > 1 && 2 & i && u.push(u.pop().concat(u.shift())), d.push(u.filter(Li))
					}
					var p, d, v, _ = n(o),
						y = i.invert(r[0], r[1]),
						g = ly(),
						m = n(g),
						x = !1,
						b = {
							point: u,
							lineStart: c,
							lineEnd: s,
							polygonStart: function () {
								b.point = l, b.lineStart = f, b.lineEnd = h, d = [], p = []
							},
							polygonEnd: function () {
								b.point = u, b.lineStart = c, b.lineEnd = s, d = Ks(d);
								var t = Xy(p, y);
								d.length ? (x || (o.polygonStart(), x = !0), py(d, qi, t, e, o)) : t && (x || (o.polygonStart(), x = !0), o.lineStart(), e(null, null, 1, o), o.lineEnd()), x && (o.polygonEnd(), x = !1), d = p = null
							},
							sphere: function () {
								o.polygonStart(), o.lineStart(), e(null, null, 1, o), o.lineEnd(), o.polygonEnd()
							}
						};
					return b
				}
			},
			Wy = Vy(function () {
				return !0
			}, Di, Ui, [-m_, -x_]),
			Gy = function (t, n) {
				function e(e, r, i, o) {
					ii(o, t, n, i, e, r)
				}

				function r(t, n) {
					return A_(t) * A_(n) > a
				}

				function i(t) {
					var n, e, i, a, l;
					return {
						lineStart: function () {
							a = i = !1, l = 1
						},
						point: function (f, h) {
							var p, d = [f, h],
								v = r(f, h),
								_ = c ? v ? 0 : u(f, h) : v ? u(f + (f < 0 ? m_ : -m_), h) : 0;
							if (!n && (a = i = v) && t.lineStart(), v !== i && (p = o(n, d), (hy(n, p) || hy(d, p)) && (d[0] += y_, d[1] += y_, v = r(d[0], d[1]))), v !== i) l = 0, v ? (t.lineStart(), p = o(d, n), t.point(p[0], p[1])) : (p = o(n, d), t.point(p[0], p[1]), t.lineEnd()), n = p;
							else if (s && n && c ^ v) {
								var y;
								_ & e || !(y = o(d, n, !0)) || (l = 0, c ? (t.lineStart(), t.point(y[0][0], y[0][1]), t.point(y[1][0], y[1][1]), t.lineEnd()) : (t.point(y[1][0], y[1][1]), t.lineEnd(), t.lineStart(), t.point(y[0][0], y[0][1])))
							} !v || n && hy(n, d) || t.point(d[0], d[1]), n = d, i = v, e = _
						},
						lineEnd: function () {
							i && t.lineEnd(), n = null
						},
						clean: function () {
							return l | (a && i) << 1
						}
					}
				}

				function o(t, n, e) {
					var r = Nr(t),
						i = Nr(n),
						o = [1, 0, 0],
						u = Er(r, i),
						c = Ar(u, u),
						s = u[0],
						l = c - s * s;
					if (!l) return !e && t;
					var f = a * c / l,
						h = -a * s / l,
						p = Er(o, u),
						d = zr(o, f),
						v = zr(u, h);
					Cr(d, v);
					var _ = p,
						y = Ar(d, _),
						g = Ar(_, _),
						m = y * y - g * (Ar(d, d) - 1);
					if (!(m < 0)) {
						var x = q_(m),
							b = zr(_, (-y - x) / g);
						if (Cr(b, d), b = kr(b), !e) return b;
						var w, M = t[0],
							S = n[0],
							T = t[1],
							k = n[1];
						S < M && (w = M, M = S, S = w);
						var N = S - M,
							A = T_(N - m_) < y_,
							E = A || N < y_;
						if (!A && k < T && (w = T, T = k, k = w), E ? A ? T + k > 0 ^ b[1] < (T_(b[0] - M) < y_ ? T : k) : T <= b[1] && b[1] <= k : N > m_ ^ (M <= b[0] && b[0] <= S)) {
							var C = zr(_, (-y + x) / g);
							return Cr(C, d), [b, kr(C)]
						}
					}
				}

				function u(n, e) {
					var r = c ? t : m_ - t,
						i = 0;
					return n < -r ? i |= 1 : n > r && (i |= 2), e < -r ? i |= 4 : e > r && (i |= 8), i
				}
				var a = A_(t),
					c = a > 0,
					s = T_(a) > y_;
				return Vy(r, i, e, c ? [0, -t] : [-m_, t - m_])
			},
			$y = function (t) {
				return {
					stream: Ii(t)
				}
			};
		Fi.prototype = {
			constructor: Fi,
			point: function (t, n) {
				this.stream.point(t, n)
			},
			sphere: function () {
				this.stream.sphere()
			},
			lineStart: function () {
				this.stream.lineStart()
			},
			lineEnd: function () {
				this.stream.lineEnd()
			},
			polygonStart: function () {
				this.stream.polygonStart()
			},
			polygonEnd: function () {
				this.stream.polygonEnd()
			}
		};
		var Zy = 16,
			Qy = A_(30 * S_),
			Jy = function (t, n) {
				return +n ? Hi(t, n) : ji(t)
			},
			Ky = Ii({
				point: function (t, n) {
					this.stream.point(t * S_, n * S_)
				}
			}),
			tg = function () {
				return Wi($i).scale(155.424).center([0, 33.6442])
			},
			ng = function () {
				return tg().parallels([29.5, 45.5]).scale(1070).translate([480, 250]).rotate([96, 0]).center([-.6, 38.7])
			},
			eg = function () {
				function t(t) {
					var n = t[0],
						e = t[1];
					return a = null, i.point(n, e), a || (o.point(n, e), a) || (u.point(n, e), a)
				}

				function n() {
					return e = r = null, t
				}
				var e, r, i, o, u, a, c = ng(),
					s = tg().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]),
					l = tg().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]),
					f = {
						point: function (t, n) {
							a = [t, n]
						}
					};
				return t.invert = function (t) {
					var n = c.scale(),
						e = c.translate(),
						r = (t[0] - e[0]) / n,
						i = (t[1] - e[1]) / n;
					return (i >= .12 && i < .234 && r >= -.425 && r < -.214 ? s : i >= .166 && i < .234 && r >= -.214 && r < -.115 ? l : c).invert(t)
				}, t.stream = function (t) {
					return e && r === t ? e : e = Zi([c.stream(r = t), s.stream(t), l.stream(t)])
				}, t.precision = function (t) {
					return arguments.length ? (c.precision(t), s.precision(t), l.precision(t), n()) : c.precision()
				}, t.scale = function (n) {
					return arguments.length ? (c.scale(n), s.scale(.35 * n), l.scale(n), t.translate(c.translate())) : c.scale()
				}, t.translate = function (t) {
					if (!arguments.length) return c.translate();
					var e = c.scale(),
						r = +t[0],
						a = +t[1];
					return i = c.translate(t).clipExtent([
						[r - .455 * e, a - .238 * e],
						[r + .455 * e, a + .238 * e]
					]).stream(f), o = s.translate([r - .307 * e, a + .201 * e]).clipExtent([
						[r - .425 * e + y_, a + .12 * e + y_],
						[r - .214 * e - y_, a + .234 * e - y_]
					]).stream(f), u = l.translate([r - .205 * e, a + .212 * e]).clipExtent([
						[r - .214 * e + y_, a + .166 * e + y_],
						[r - .115 * e - y_, a + .234 * e - y_]
					]).stream(f), n()
				}, t.fitExtent = function (n, e) {
					return Bi(t, n, e)
				}, t.fitSize = function (n, e) {
					return Yi(t, n, e)
				}, t.scale(1070)
			},
			rg = Qi(function (t) {
				return q_(2 / (1 + t))
			});
		rg.invert = Ji(function (t) {
			return 2 * _r(t / 2)
		});
		var ig = function () {
			return Xi(rg).scale(124.75).clipAngle(179.999)
		},
			og = Qi(function (t) {
				return (t = vr(t)) && t / R_(t)
			});
		og.invert = Ji(function (t) {
			return t
		});
		var ug = function () {
			return Xi(og).scale(79.4188).clipAngle(179.999)
		};
		Ki.invert = function (t, n) {
			return [t, 2 * k_(C_(n)) - x_]
		};
		var ag = function () {
			return to(Ki).scale(961 / w_)
		},
			cg = function () {
				return Wi(eo).scale(109.5).parallels([30, 30])
			};
		ro.invert = ro;
		var sg = function () {
			return Xi(ro).scale(152.63)
		},
			lg = function () {
				return Wi(io).scale(131.154).center([0, 13.9389])
			};
		oo.invert = Ji(k_);
		var fg = function () {
			return Xi(oo).scale(144.049).clipAngle(60)
		},
			hg = function () {
				function t() {
					return i = o = null, u
				}
				var n, e, r, i, o, u, a = 1,
					c = 0,
					s = 0,
					l = 1,
					f = 1,
					h = Sy,
					p = null,
					d = Sy;
				return u = {
					stream: function (t) {
						return i && o === t ? i : i = h(d(o = t))
					},
					clipExtent: function (i) {
						return arguments.length ? (d = null == i ? (p = n = e = r = null, Sy) : ci(p = +i[0][0], n = +i[0][1], e = +i[1][0], r = +i[1][1]), t()) : null == p ? null : [
							[p, n],
							[e, r]
						]
					},
					scale: function (n) {
						return arguments.length ? (h = uo((a = +n) * l, a * f, c, s), t()) : a
					},
					translate: function (n) {
						return arguments.length ? (h = uo(a * l, a * f, c = +n[0], s = +n[1]), t()) : [c, s]
					},
					reflectX: function (n) {
						return arguments.length ? (h = uo(a * (l = n ? -1 : 1), a * f, c, s), t()) : l < 0
					},
					reflectY: function (n) {
						return arguments.length ? (h = uo(a * l, a * (f = n ? -1 : 1), c, s), t()) : f < 0
					},
					fitExtent: function (t, n) {
						return Bi(u, t, n)
					},
					fitSize: function (t, n) {
						return Yi(u, t, n)
					}
				}
			};
		ao.invert = Ji(_r);
		var pg = function () {
			return Xi(ao).scale(249.5).clipAngle(90 + y_)
		};
		co.invert = Ji(function (t) {
			return 2 * k_(t)
		});
		var dg = function () {
			return Xi(co).scale(250).clipAngle(142)
		};
		so.invert = function (t, n) {
			return [-n, 2 * k_(C_(t)) - x_]
		};
		var vg = function () {
			var t = to(so),
				n = t.center,
				e = t.rotate;
			return t.center = function (t) {
				return arguments.length ? n([-t[1], t[0]]) : (t = n(), [t[1], -t[0]])
			}, t.rotate = function (t) {
				return arguments.length ? e([t[0], t[1], t.length > 2 ? t[2] + 90 : 90]) : (t = e(), [t[0], t[1], t[2] - 90])
			}, e([0, 0, 90]).scale(159.155)
		},
			_g = function () {
				function t(t) {
					var o, u = 0;
					t.eachAfter(function (t) {
						var e = t.children;
						e ? (t.x = fo(e), t.y = po(e)) : (t.x = o ? u += n(t, o) : 0, t.y = 0, o = t)
					});
					var a = _o(t),
						c = yo(t),
						s = a.x - n(a, c) / 2,
						l = c.x + n(c, a) / 2;
					return t.eachAfter(i ? function (n) {
						n.x = (n.x - t.x) * e, n.y = (t.y - n.y) * r
					} : function (n) {
						n.x = (n.x - s) / (l - s) * e, n.y = (1 - (t.y ? n.y / t.y : 1)) * r
					})
				}
				var n = lo,
					e = 1,
					r = 1,
					i = !1;
				return t.separation = function (e) {
					return arguments.length ? (n = e, t) : n
				}, t.size = function (n) {
					return arguments.length ? (i = !1, e = +n[0], r = +n[1], t) : i ? null : [e, r]
				}, t.nodeSize = function (n) {
					return arguments.length ? (i = !0, e = +n[0], r = +n[1], t) : i ? [e, r] : null
				}, t
			},
			yg = function () {
				return this.eachAfter(go)
			},
			gg = function (t) {
				var n, e, r, i, o = this,
					u = [o];
				do
					for (n = u.reverse(), u = []; o = n.pop();)
						if (t(o), e = o.children)
							for (r = 0, i = e.length; r < i; ++r) u.push(e[r]);
				while (u.length);
				return this
			},
			mg = function (t) {
				for (var n, e, r = this, i = [r]; r = i.pop();)
					if (t(r), n = r.children)
						for (e = n.length - 1; e >= 0; --e) i.push(n[e]);
				return this
			},
			xg = function (t) {
				for (var n, e, r, i = this, o = [i], u = []; i = o.pop();)
					if (u.push(i), n = i.children)
						for (e = 0, r = n.length; e < r; ++e) o.push(n[e]);
				for (; i = u.pop();) t(i);
				return this
			},
			bg = function (t) {
				return this.eachAfter(function (n) {
					for (var e = +t(n.data) || 0, r = n.children, i = r && r.length; --i >= 0;) e += r[i].value;
					n.value = e
				})
			},
			wg = function (t) {
				return this.eachBefore(function (n) {
					n.children && n.children.sort(t)
				})
			},
			Mg = function (t) {
				for (var n = this, e = mo(n, t), r = [n]; n !== e;) n = n.parent, r.push(n);
				for (var i = r.length; t !== e;) r.splice(i, 0, t), t = t.parent;
				return r
			},
			Sg = function () {
				for (var t = this, n = [t]; t = t.parent;) n.push(t);
				return n
			},
			Tg = function () {
				var t = [];
				return this.each(function (n) {
					t.push(n)
				}), t
			},
			kg = function () {
				var t = [];
				return this.eachBefore(function (n) {
					n.children || t.push(n)
				}), t
			},
			Ng = function () {
				var t = this,
					n = [];
				return t.each(function (e) {
					e !== t && n.push({
						source: e.parent,
						target: e
					})
				}), n
			};
		To.prototype = xo.prototype = {
			constructor: To,
			count: yg,
			each: gg,
			eachAfter: xg,
			eachBefore: mg,
			sum: bg,
			sort: wg,
			path: Mg,
			ancestors: Sg,
			descendants: Tg,
			leaves: kg,
			links: Ng,
			copy: bo
		};
		var Ag = function (t) {
			for (var n, e = (t = t.slice()).length, r = null, i = r; e;) {
				var o = new ko(t[e - 1]);
				i = i ? i.next = o : r = o, t[n] = t[--e]
			}
			return {
				head: r,
				tail: i
			}
		},
			Eg = function (t) {
				return Ao(Ag(t), [])
			},
			Cg = function (t) {
				return Oo(t), t
			},
			zg = function (t) {
				return function () {
					return t
				}
			},
			Pg = function () {
				function t(t) {
					return t.x = e / 2, t.y = r / 2, n ? t.eachBefore(Yo(n)).eachAfter(jo(i, .5)).eachBefore(Ho(1)) : t.eachBefore(Yo(Bo)).eachAfter(jo(Fo, 1)).eachAfter(jo(i, t.r / Math.min(e, r))).eachBefore(Ho(Math.min(e, r) / (2 * t.r))), t
				}
				var n = null,
					e = 1,
					r = 1,
					i = Fo;
				return t.radius = function (e) {
					return arguments.length ? (n = Uo(e), t) : n
				}, t.size = function (n) {
					return arguments.length ? (e = +n[0], r = +n[1], t) : [e, r]
				}, t.padding = function (n) {
					return arguments.length ? (i = "function" == typeof n ? n : zg(+n), t) : i
				}, t
			},
			Rg = function (t) {
				t.x0 = Math.round(t.x0), t.y0 = Math.round(t.y0), t.x1 = Math.round(t.x1), t.y1 = Math.round(t.y1)
			},
			Lg = function (t, n, e, r, i) {
				for (var o, u = t.children, a = -1, c = u.length, s = t.value && (r - n) / t.value; ++a < c;) o = u[a], o.y0 = e, o.y1 = i, o.x0 = n, o.x1 = n += o.value * s
			},
			qg = function () {
				function t(t) {
					var u = t.height + 1;
					return t.x0 = t.y0 = i, t.x1 = e, t.y1 = r / u, t.eachBefore(n(r, u)), o && t.eachBefore(Rg), t
				}

				function n(t, n) {
					return function (e) {
						e.children && Lg(e, e.x0, t * (e.depth + 1) / n, e.x1, t * (e.depth + 2) / n);
						var r = e.x0,
							o = e.y0,
							u = e.x1 - i,
							a = e.y1 - i;
						u < r && (r = u = (r + u) / 2), a < o && (o = a = (o + a) / 2), e.x0 = r, e.y0 = o, e.x1 = u, e.y1 = a
					}
				}
				var e = 1,
					r = 1,
					i = 0,
					o = !1;
				return t.round = function (n) {
					return arguments.length ? (o = !!n, t) : o
				}, t.size = function (n) {
					return arguments.length ? (e = +n[0], r = +n[1], t) : [e, r]
				}, t.padding = function (n) {
					return arguments.length ? (i = +n, t) : i
				}, t
			},
			Dg = "$",
			Og = {
				depth: -1
			},
			Ug = {},
			Ig = function () {
				function t(t) {
					var r, i, o, u, a, c, s, l = t.length,
						f = new Array(l),
						h = {};
					for (i = 0; i < l; ++i) r = t[i], a = f[i] = new To(r), null != (c = n(r, i, t)) && (c += "") && (s = Dg + (a.id = c), h[s] = s in h ? Ug : a);
					for (i = 0; i < l; ++i)
						if (a = f[i], c = e(t[i], i, t), null != c && (c += "")) {
							if (u = h[Dg + c], !u) throw new Error("missing: " + c);
							if (u === Ug) throw new Error("ambiguous: " + c);
							u.children ? u.children.push(a) : u.children = [a], a.parent = u
						} else {
							if (o) throw new Error("multiple roots");
							o = a
						}
					if (!o) throw new Error("no root");
					if (o.parent = Og, o.eachBefore(function (t) {
						t.depth = t.parent.depth + 1, --l
					}).eachBefore(So), o.parent = null, l > 0) throw new Error("cycle");
					return o
				}
				var n = Xo,
					e = Vo;
				return t.id = function (e) {
					return arguments.length ? (n = Io(e), t) : n
				}, t.parentId = function (n) {
					return arguments.length ? (e = Io(n), t) : e
				}, t
			};
		Ko.prototype = Object.create(To.prototype);
		var Fg = function () {
			function t(t) {
				var r = tu(t);
				if (r.eachAfter(n), r.parent.m = -r.z, r.eachBefore(e), c) t.eachBefore(i);
				else {
					var s = t,
						l = t,
						f = t;
					t.eachBefore(function (t) {
						t.x < s.x && (s = t), t.x > l.x && (l = t), t.depth > f.depth && (f = t)
					});
					var h = s === l ? 1 : o(s, l) / 2,
						p = h - s.x,
						d = u / (l.x + h + p),
						v = a / (f.depth || 1);
					t.eachBefore(function (t) {
						t.x = (t.x + p) * d, t.y = t.depth * v
					})
				}
				return t
			}

			function n(t) {
				var n = t.children,
					e = t.parent.children,
					i = t.i ? e[t.i - 1] : null;
				if (n) {
					Qo(t);
					var u = (n[0].z + n[n.length - 1].z) / 2;
					i ? (t.z = i.z + o(t._, i._), t.m = t.z - u) : t.z = u
				} else i && (t.z = i.z + o(t._, i._));
				t.parent.A = r(t, i, t.parent.A || e[0])
			}

			function e(t) {
				t._.x = t.z + t.parent.m, t.m += t.parent.m
			}

			function r(t, n, e) {
				if (n) {
					for (var r, i = t, u = t, a = n, c = i.parent.children[0], s = i.m, l = u.m, f = a.m, h = c.m; a = $o(a), i = Go(i), a && i;) c = Go(c), u = $o(u), u.a = t, r = a.z + f - i.z - s + o(a._, i._), r > 0 && (Zo(Jo(a, t, e), t, r), s += r, l += r), f += a.m, s += i.m, h += c.m, l += u.m;
					a && !$o(u) && (u.t = a, u.m += f - l), i && !Go(c) && (c.t = i, c.m += s - h, e = t)
				}
				return e
			}

			function i(t) {
				t.x *= u, t.y = t.depth * a
			}
			var o = Wo,
				u = 1,
				a = 1,
				c = null;
			return t.separation = function (n) {
				return arguments.length ? (o = n, t) : o
			}, t.size = function (n) {
				return arguments.length ? (c = !1,
					u = +n[0], a = +n[1], t) : c ? null : [u, a]
			}, t.nodeSize = function (n) {
				return arguments.length ? (c = !0, u = +n[0], a = +n[1], t) : c ? [u, a] : null
			}, t
		},
			Bg = function (t, n, e, r, i) {
				for (var o, u = t.children, a = -1, c = u.length, s = t.value && (i - e) / t.value; ++a < c;) o = u[a], o.x0 = n, o.x1 = r, o.y0 = e, o.y1 = e += o.value * s
			},
			Yg = (1 + Math.sqrt(5)) / 2,
			jg = function t(n) {
				function e(t, e, r, i, o) {
					nu(n, t, e, r, i, o)
				}
				return e.ratio = function (n) {
					return t((n = +n) > 1 ? n : 1)
				}, e
			}(Yg),
			Hg = function () {
				function t(t) {
					return t.x0 = t.y0 = 0, t.x1 = i, t.y1 = o, t.eachBefore(n), u = [0], r && t.eachBefore(Rg), t
				}

				function n(t) {
					var n = u[t.depth],
						r = t.x0 + n,
						i = t.y0 + n,
						o = t.x1 - n,
						h = t.y1 - n;
					o < r && (r = o = (r + o) / 2), h < i && (i = h = (i + h) / 2), t.x0 = r, t.y0 = i, t.x1 = o, t.y1 = h, t.children && (n = u[t.depth + 1] = a(t) / 2, r += f(t) - n, i += c(t) - n, o -= s(t) - n, h -= l(t) - n, o < r && (r = o = (r + o) / 2), h < i && (i = h = (i + h) / 2), e(t, r, i, o, h))
				}
				var e = jg,
					r = !1,
					i = 1,
					o = 1,
					u = [0],
					a = Fo,
					c = Fo,
					s = Fo,
					l = Fo,
					f = Fo;
				return t.round = function (n) {
					return arguments.length ? (r = !!n, t) : r
				}, t.size = function (n) {
					return arguments.length ? (i = +n[0], o = +n[1], t) : [i, o]
				}, t.tile = function (n) {
					return arguments.length ? (e = Io(n), t) : e
				}, t.padding = function (n) {
					return arguments.length ? t.paddingInner(n).paddingOuter(n) : t.paddingInner()
				}, t.paddingInner = function (n) {
					return arguments.length ? (a = "function" == typeof n ? n : zg(+n), t) : a
				}, t.paddingOuter = function (n) {
					return arguments.length ? t.paddingTop(n).paddingRight(n).paddingBottom(n).paddingLeft(n) : t.paddingTop()
				}, t.paddingTop = function (n) {
					return arguments.length ? (c = "function" == typeof n ? n : zg(+n), t) : c
				}, t.paddingRight = function (n) {
					return arguments.length ? (s = "function" == typeof n ? n : zg(+n), t) : s
				}, t.paddingBottom = function (n) {
					return arguments.length ? (l = "function" == typeof n ? n : zg(+n), t) : l
				}, t.paddingLeft = function (n) {
					return arguments.length ? (f = "function" == typeof n ? n : zg(+n), t) : f
				}, t
			},
			Xg = function (t, n, e, r, i) {
				function o(t, n, e, r, i, u, a) {
					if (t >= n - 1) {
						var s = c[t];
						return s.x0 = r, s.y0 = i, s.x1 = u, s.y1 = a, void 0
					}
					for (var f = l[t], h = e / 2 + f, p = t + 1, d = n - 1; p < d;) {
						var v = p + d >>> 1;
						l[v] < h ? p = v + 1 : d = v
					}
					var _ = l[p] - f,
						y = e - _;
					if (a - i > u - r) {
						var g = (i * y + a * _) / e;
						o(t, p, _, r, i, u, g), o(p, n, y, r, g, u, a)
					} else {
						var m = (r * y + u * _) / e;
						o(t, p, _, r, i, m, a), o(p, n, y, m, i, u, a)
					}
				}
				var u, a, c = t.children,
					s = c.length,
					l = new Array(s + 1);
				for (l[0] = a = u = 0; u < s; ++u) l[u + 1] = a += c[u].value;
				o(0, s, t.value, n, e, r, i)
			},
			Vg = function (t, n, e, r, i) {
				(1 & t.depth ? Bg : Lg)(t, n, e, r, i)
			},
			Wg = function t(n) {
				function e(t, e, r, i, o) {
					if ((u = t._squarify) && u.ratio === n)
						for (var u, a, c, s, l, f = -1, h = u.length, p = t.value; ++f < h;) {
							for (a = u[f], c = a.children, s = a.value = 0, l = c.length; s < l; ++s) a.value += c[s].value;
							a.dice ? Lg(a, e, r, i, r += (o - r) * a.value / p) : Bg(a, e, r, e += (i - e) * a.value / p, o), p -= a.value
						} else t._squarify = u = nu(n, t, e, r, i, o), u.ratio = n
				}
				return e.ratio = function (n) {
					return t((n = +n) > 1 ? n : 1)
				}, e
			}(Yg),
			Gg = function (t) {
				for (var n, e = -1, r = t.length, i = t[r - 1], o = 0; ++e < r;) n = i, i = t[e], o += n[1] * i[0] - n[0] * i[1];
				return o / 2
			},
			$g = function (t) {
				for (var n, e, r = -1, i = t.length, o = 0, u = 0, a = t[i - 1], c = 0; ++r < i;) n = a, a = t[r], c += e = n[0] * a[1] - a[0] * n[1], o += (n[0] + a[0]) * e, u += (n[1] + a[1]) * e;
				return c *= 3, [o / c, u / c]
			},
			Zg = function (t, n, e) {
				return (n[0] - t[0]) * (e[1] - t[1]) - (n[1] - t[1]) * (e[0] - t[0])
			},
			Qg = function (t) {
				if ((e = t.length) < 3) return null;
				var n, e, r = new Array(e),
					i = new Array(e);
				for (n = 0; n < e; ++n) r[n] = [+t[n][0], +t[n][1], n];
				for (r.sort(eu), n = 0; n < e; ++n) i[n] = [r[n][0], -r[n][1]];
				var o = ru(r),
					u = ru(i),
					a = u[0] === o[0],
					c = u[u.length - 1] === o[o.length - 1],
					s = [];
				for (n = o.length - 1; n >= 0; --n) s.push(t[r[o[n]][2]]);
				for (n = +a; n < u.length - c; ++n) s.push(t[r[u[n]][2]]);
				return s
			},
			Jg = function (t, n) {
				for (var e, r, i = t.length, o = t[i - 1], u = n[0], a = n[1], c = o[0], s = o[1], l = !1, f = 0; f < i; ++f) o = t[f], e = o[0], r = o[1], r > a != s > a && u < (c - e) * (a - r) / (s - r) + e && (l = !l), c = e, s = r;
				return l
			},
			Kg = function (t) {
				for (var n, e, r = -1, i = t.length, o = t[i - 1], u = o[0], a = o[1], c = 0; ++r < i;) n = u, e = a, o = t[r], u = o[0], a = o[1], n -= u, e -= a, c += Math.sqrt(n * n + e * e);
				return c
			},
			tm = [].slice,
			nm = {};
		iu.prototype = lu.prototype = {
			constructor: iu,
			defer: function (t) {
				if ("function" != typeof t || this._call) throw new Error;
				if (null != this._error) return this;
				var n = tm.call(arguments, 1);
				return n.push(t), ++this._waiting, this._tasks.push(n), ou(this), this
			},
			abort: function () {
				return null == this._error && cu(this, new Error("abort")), this
			},
			await: function (t) {
				if ("function" != typeof t || this._call) throw new Error;
				return this._call = function (n, e) {
					t.apply(null, [n].concat(e))
				}, su(this), this
			},
			awaitAll: function (t) {
				if ("function" != typeof t || this._call) throw new Error;
				return this._call = t, su(this), this
			}
		};
		var em = function (t, n) {
			return t = null == t ? 0 : +t, n = null == n ? 1 : +n, 1 === arguments.length ? (n = t, t = 0) : n -= t,
				function () {
					return Math.random() * n + t
				}
		},
			rm = function (t, n) {
				var e, r;
				return t = null == t ? 0 : +t, n = null == n ? 1 : +n,
					function () {
						var i;
						if (null != e) i = e, e = null;
						else
							do e = 2 * Math.random() - 1, i = 2 * Math.random() - 1, r = e * e + i * i; while (!r || r > 1);
						return t + n * i * Math.sqrt(-2 * Math.log(r) / r)
					}
			},
			im = function () {
				var t = rm.apply(this, arguments);
				return function () {
					return Math.exp(t())
				}
			},
			om = function (t) {
				return function () {
					for (var n = 0, e = 0; e < t; ++e) n += Math.random();
					return n
				}
			},
			um = function (t) {
				var n = om(t);
				return function () {
					return n() / t
				}
			},
			am = function (t) {
				return function () {
					return -Math.log(1 - Math.random()) / t
				}
			},
			cm = function (t, n) {
				function e(t) {
					var n, e = s.status;
					if (!e && hu(s) || e >= 200 && e < 300 || 304 === e) {
						if (o) try {
							n = o.call(r, s)
						} catch (t) {
							return void a.call("error", r, t)
						} else n = s;
						a.call("load", r, n)
					} else a.call("error", r, t)
				}
				var r, i, o, u, a = p("beforesend", "progress", "load", "error"),
					c = Fe(),
					s = new XMLHttpRequest,
					l = null,
					f = null,
					h = 0;
				if ("undefined" == typeof XDomainRequest || "withCredentials" in s || !/^(http(s)?:)?\/\//.test(t) || (s = new XDomainRequest), "onload" in s ? s.onload = s.onerror = s.ontimeout = e : s.onreadystatechange = function (t) {
					s.readyState > 3 && e(t)
				}, s.onprogress = function (t) {
					a.call("progress", r, t)
				}, r = {
					header: function (t, n) {
						return t = (t + "").toLowerCase(), arguments.length < 2 ? c.get(t) : (null == n ? c.remove(t) : c.set(t, n + ""), r)
					},
					mimeType: function (t) {
						return arguments.length ? (i = null == t ? null : t + "", r) : i
					},
					responseType: function (t) {
						return arguments.length ? (u = t, r) : u
					},
					timeout: function (t) {
						return arguments.length ? (h = +t, r) : h
					},
					user: function (t) {
						return arguments.length < 1 ? l : (l = null == t ? null : t + "", r)
					},
					password: function (t) {
						return arguments.length < 1 ? f : (f = null == t ? null : t + "", r)
					},
					response: function (t) {
						return o = t, r
					},
					get: function (t, n) {
						return r.send("GET", t, n)
					},
					post: function (t, n) {
						return r.send("POST", t, n)
					},
					send: function (n, e, o) {
						return s.open(n, t, !0, l, f), null == i || c.has("accept") || c.set("accept", i + ",*/*"), s.setRequestHeader && c.each(function (t, n) {
							s.setRequestHeader(n, t)
						}), null != i && s.overrideMimeType && s.overrideMimeType(i), null != u && (s.responseType = u), h > 0 && (s.timeout = h), null == o && "function" == typeof e && (o = e, e = null), null != o && 1 === o.length && (o = fu(o)), null != o && r.on("error", o).on("load", function (t) {
							o(null, t)
						}), a.call("beforesend", r, s), s.send(null == e ? null : e), r
					},
					abort: function () {
						return s.abort(), r
					},
					on: function () {
						var t = a.on.apply(a, arguments);
						return t === a ? r : t
					}
				}, null != n) {
					if ("function" != typeof n) throw new Error("invalid callback: " + n);
					return r.get(n)
				}
				return r
			},
			sm = function (t, n) {
				return function (e, r) {
					var i = cm(e).mimeType(t).response(n);
					if (null != r) {
						if ("function" != typeof r) throw new Error("invalid callback: " + r);
						return i.get(r)
					}
					return i
				}
			},
			lm = sm("text/html", function (t) {
				return document.createRange().createContextualFragment(t.responseText)
			}),
			fm = sm("application/json", function (t) {
				return JSON.parse(t.responseText)
			}),
			hm = sm("text/plain", function (t) {
				return t.responseText
			}),
			pm = sm("application/xml", function (t) {
				var n = t.responseXML;
				if (!n) throw new Error("parse error");
				return n
			}),
			dm = function (t, n) {
				return function (e, r, i) {
					arguments.length < 3 && (i = r, r = null);
					var o = cm(e).mimeType(t);
					return o.row = function (t) {
						return arguments.length ? o.response(pu(n, r = t)) : r
					}, o.row(r), i ? o.get(i) : o
				}
			},
			vm = dm("text/csv", Yd),
			_m = dm("text/tab-separated-values", Wd),
			ym = Array.prototype,
			gm = ym.map,
			mm = ym.slice,
			xm = {
				name: "implicit"
			},
			bm = function (t) {
				return function () {
					return t
				}
			},
			wm = function (t) {
				return +t
			},
			Mm = [0, 1],
			Sm = function (n, r, i) {
				var o, u = n[0],
					a = n[n.length - 1],
					c = e(u, a, null == r ? 10 : r);
				switch (i = zv(null == i ? ",f" : i), i.type) {
					case "s":
						var s = Math.max(Math.abs(u), Math.abs(a));
						return null != i.precision || isNaN(o = Dv(c, s)) || (i.precision = o), t.formatPrefix(i, s);
					case "":
					case "e":
					case "g":
					case "p":
					case "r":
						null != i.precision || isNaN(o = Ov(c, Math.max(Math.abs(u), Math.abs(a)))) || (i.precision = o - ("e" === i.type));
						break;
					case "f":
					case "%":
						null != i.precision || isNaN(o = qv(c)) || (i.precision = o - 2 * ("%" === i.type))
				}
				return t.format(i)
			},
			Tm = function (t, n) {
				t = t.slice();
				var e, r = 0,
					i = t.length - 1,
					o = t[r],
					u = t[i];
				return u < o && (e = r, r = i, i = e, e = o, o = u, u = e), t[r] = n.floor(o), t[i] = n.ceil(u), t
			},
			km = new Date,
			Nm = new Date,
			Am = Bu(function () { }, function (t, n) {
				t.setTime(+t + n)
			}, function (t, n) {
				return n - t
			});
		Am.every = function (t) {
			return t = Math.floor(t), isFinite(t) && t > 0 ? t > 1 ? Bu(function (n) {
				n.setTime(Math.floor(n / t) * t)
			}, function (n, e) {
				n.setTime(+n + e * t)
			}, function (n, e) {
				return (e - n) / t
			}) : Am : null
		};
		var Em = Am.range,
			Cm = 1e3,
			zm = 6e4,
			Pm = 36e5,
			Rm = 864e5,
			Lm = 6048e5,
			qm = Bu(function (t) {
				t.setTime(Math.floor(t / Cm) * Cm)
			}, function (t, n) {
				t.setTime(+t + n * Cm)
			}, function (t, n) {
				return (n - t) / Cm
			}, function (t) {
				return t.getUTCSeconds()
			}),
			Dm = qm.range,
			Om = Bu(function (t) {
				t.setTime(Math.floor(t / zm) * zm)
			}, function (t, n) {
				t.setTime(+t + n * zm)
			}, function (t, n) {
				return (n - t) / zm
			}, function (t) {
				return t.getMinutes()
			}),
			Um = Om.range,
			Im = Bu(function (t) {
				var n = t.getTimezoneOffset() * zm % Pm;
				n < 0 && (n += Pm), t.setTime(Math.floor((+t - n) / Pm) * Pm + n)
			}, function (t, n) {
				t.setTime(+t + n * Pm)
			}, function (t, n) {
				return (n - t) / Pm
			}, function (t) {
				return t.getHours()
			}),
			Fm = Im.range,
			Bm = Bu(function (t) {
				t.setHours(0, 0, 0, 0)
			}, function (t, n) {
				t.setDate(t.getDate() + n)
			}, function (t, n) {
				return (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * zm) / Rm
			}, function (t) {
				return t.getDate() - 1
			}),
			Ym = Bm.range,
			jm = Yu(0),
			Hm = Yu(1),
			Xm = Yu(2),
			Vm = Yu(3),
			Wm = Yu(4),
			Gm = Yu(5),
			$m = Yu(6),
			Zm = jm.range,
			Qm = Hm.range,
			Jm = Xm.range,
			Km = Vm.range,
			tx = Wm.range,
			nx = Gm.range,
			ex = $m.range,
			rx = Bu(function (t) {
				t.setDate(1), t.setHours(0, 0, 0, 0)
			}, function (t, n) {
				t.setMonth(t.getMonth() + n)
			}, function (t, n) {
				return n.getMonth() - t.getMonth() + 12 * (n.getFullYear() - t.getFullYear())
			}, function (t) {
				return t.getMonth()
			}),
			ix = rx.range,
			ox = Bu(function (t) {
				t.setMonth(0, 1), t.setHours(0, 0, 0, 0)
			}, function (t, n) {
				t.setFullYear(t.getFullYear() + n)
			}, function (t, n) {
				return n.getFullYear() - t.getFullYear()
			}, function (t) {
				return t.getFullYear()
			});
		ox.every = function (t) {
			return isFinite(t = Math.floor(t)) && t > 0 ? Bu(function (n) {
				n.setFullYear(Math.floor(n.getFullYear() / t) * t), n.setMonth(0, 1), n.setHours(0, 0, 0, 0)
			}, function (n, e) {
				n.setFullYear(n.getFullYear() + e * t)
			}) : null
		};
		var ux = ox.range,
			ax = Bu(function (t) {
				t.setUTCSeconds(0, 0)
			}, function (t, n) {
				t.setTime(+t + n * zm)
			}, function (t, n) {
				return (n - t) / zm
			}, function (t) {
				return t.getUTCMinutes()
			}),
			cx = ax.range,
			sx = Bu(function (t) {
				t.setUTCMinutes(0, 0, 0)
			}, function (t, n) {
				t.setTime(+t + n * Pm)
			}, function (t, n) {
				return (n - t) / Pm
			}, function (t) {
				return t.getUTCHours()
			}),
			lx = sx.range,
			fx = Bu(function (t) {
				t.setUTCHours(0, 0, 0, 0)
			}, function (t, n) {
				t.setUTCDate(t.getUTCDate() + n)
			}, function (t, n) {
				return (n - t) / Rm
			}, function (t) {
				return t.getUTCDate() - 1
			}),
			hx = fx.range,
			px = ju(0),
			dx = ju(1),
			vx = ju(2),
			_x = ju(3),
			yx = ju(4),
			gx = ju(5),
			mx = ju(6),
			xx = px.range,
			bx = dx.range,
			wx = vx.range,
			Mx = _x.range,
			Sx = yx.range,
			Tx = gx.range,
			kx = mx.range,
			Nx = Bu(function (t) {
				t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0)
			}, function (t, n) {
				t.setUTCMonth(t.getUTCMonth() + n)
			}, function (t, n) {
				return n.getUTCMonth() - t.getUTCMonth() + 12 * (n.getUTCFullYear() - t.getUTCFullYear())
			}, function (t) {
				return t.getUTCMonth()
			}),
			Ax = Nx.range,
			Ex = Bu(function (t) {
				t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0)
			}, function (t, n) {
				t.setUTCFullYear(t.getUTCFullYear() + n)
			}, function (t, n) {
				return n.getUTCFullYear() - t.getUTCFullYear()
			}, function (t) {
				return t.getUTCFullYear()
			});
		Ex.every = function (t) {
			return isFinite(t = Math.floor(t)) && t > 0 ? Bu(function (n) {
				n.setUTCFullYear(Math.floor(n.getUTCFullYear() / t) * t), n.setUTCMonth(0, 1), n.setUTCHours(0, 0, 0, 0)
			}, function (n, e) {
				n.setUTCFullYear(n.getUTCFullYear() + e * t)
			}) : null
		};
		var Cx, zx = Ex.range,
			Px = {
				"-": "",
				_: " ",
				0: "0"
			},
			Rx = /^\s*\d+/,
			Lx = /^%/,
			qx = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
		Ba({
			dateTime: "%x, %X",
			date: "%-m/%-d/%Y",
			time: "%-I:%M:%S %p",
			periods: ["AM", "PM"],
			days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
		});
		var Dx = "%Y-%m-%dT%H:%M:%S.%LZ",
			Ox = Date.prototype.toISOString ? Ya : t.utcFormat(Dx),
			Ux = +new Date("2000-01-01T00:00:00.000Z") ? ja : t.utcParse(Dx),
			Ix = 1e3,
			Fx = 60 * Ix,
			Bx = 60 * Fx,
			Yx = 24 * Bx,
			jx = 7 * Yx,
			Hx = 30 * Yx,
			Xx = 365 * Yx,
			Vx = function () {
				return Va(ox, rx, jm, Bm, Im, Om, qm, Am, t.timeFormat).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)])
			},
			Wx = function () {
				return Va(Ex, Nx, px, fx, sx, ax, qm, Am, t.utcFormat).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)])
			},
			Gx = function (t) {
				return t.match(/.{6}/g).map(function (t) {
					return "#" + t
				})
			},
			$x = Gx("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf"),
			Zx = Gx("393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6"),
			Qx = Gx("3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9"),
			Jx = Gx("1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5"),
			Kx = Dh(Xt(300, .5, 0), Xt(-240, .5, 1)),
			tb = Dh(Xt(-100, .75, .35), Xt(80, 1.5, .8)),
			nb = Dh(Xt(260, .75, .35), Xt(80, 1.5, .8)),
			eb = Xt(),
			rb = function (t) {
				(t < 0 || t > 1) && (t -= Math.floor(t));
				var n = Math.abs(t - .5);
				return eb.h = 360 * t - 100, eb.s = 1.5 - 1.5 * n, eb.l = .8 - .9 * n, eb + ""
			},
			ib = Wa(Gx("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725")),
			ob = Wa(Gx("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf")),
			ub = Wa(Gx("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4")),
			ab = Wa(Gx("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921")),
			cb = function (t) {
				return function () {
					return t
				}
			},
			sb = 1e-12,
			lb = Math.PI,
			fb = lb / 2,
			hb = 2 * lb,
			pb = function () {
				function t() {
					var t, s, l = +n.apply(this, arguments),
						f = +e.apply(this, arguments),
						h = o.apply(this, arguments) - fb,
						p = u.apply(this, arguments) - fb,
						d = Math.abs(p - h),
						v = p > h;
					if (c || (c = t = Re()), f < l && (s = f, f = l, l = s), f > sb)
						if (d > hb - sb) c.moveTo(f * Math.cos(h), f * Math.sin(h)), c.arc(0, 0, f, h, p, !v), l > sb && (c.moveTo(l * Math.cos(p), l * Math.sin(p)), c.arc(0, 0, l, p, h, v));
						else {
							var _, y, g = h,
								m = p,
								x = h,
								b = p,
								w = d,
								M = d,
								S = a.apply(this, arguments) / 2,
								T = S > sb && (i ? +i.apply(this, arguments) : Math.sqrt(l * l + f * f)),
								k = Math.min(Math.abs(f - l) / 2, +r.apply(this, arguments)),
								N = k,
								A = k;
							if (T > sb) {
								var E = tc(T / l * Math.sin(S)),
									C = tc(T / f * Math.sin(S));
								(w -= 2 * E) > sb ? (E *= v ? 1 : -1, x += E, b -= E) : (w = 0, x = b = (h + p) / 2), (M -= 2 * C) > sb ? (C *= v ? 1 : -1, g += C, m -= C) : (M = 0, g = m = (h + p) / 2)
							}
							var z = f * Math.cos(g),
								P = f * Math.sin(g),
								R = l * Math.cos(b),
								L = l * Math.sin(b);
							if (k > sb) {
								var q = f * Math.cos(m),
									D = f * Math.sin(m),
									O = l * Math.cos(x),
									U = l * Math.sin(x);
								if (d < lb) {
									var I = w > sb ? nc(z, P, O, U, q, D, R, L) : [R, L],
										F = z - I[0],
										B = P - I[1],
										Y = q - I[0],
										j = D - I[1],
										H = 1 / Math.sin(Math.acos((F * Y + B * j) / (Math.sqrt(F * F + B * B) * Math.sqrt(Y * Y + j * j))) / 2),
										X = Math.sqrt(I[0] * I[0] + I[1] * I[1]);
									N = Math.min(k, (l - X) / (H - 1)), A = Math.min(k, (f - X) / (H + 1))
								}
							}
							M > sb ? A > sb ? (_ = ec(O, U, z, P, f, A, v), y = ec(q, D, R, L, f, A, v), c.moveTo(_.cx + _.x01, _.cy + _.y01), A < k ? c.arc(_.cx, _.cy, A, Math.atan2(_.y01, _.x01), Math.atan2(y.y01, y.x01), !v) : (c.arc(_.cx, _.cy, A, Math.atan2(_.y01, _.x01), Math.atan2(_.y11, _.x11), !v), c.arc(0, 0, f, Math.atan2(_.cy + _.y11, _.cx + _.x11), Math.atan2(y.cy + y.y11, y.cx + y.x11), !v), c.arc(y.cx, y.cy, A, Math.atan2(y.y11, y.x11), Math.atan2(y.y01, y.x01), !v))) : (c.moveTo(z, P), c.arc(0, 0, f, g, m, !v)) : c.moveTo(z, P), l > sb && w > sb ? N > sb ? (_ = ec(R, L, q, D, l, -N, v), y = ec(z, P, O, U, l, -N, v), c.lineTo(_.cx + _.x01, _.cy + _.y01), N < k ? c.arc(_.cx, _.cy, N, Math.atan2(_.y01, _.x01), Math.atan2(y.y01, y.x01), !v) : (c.arc(_.cx, _.cy, N, Math.atan2(_.y01, _.x01), Math.atan2(_.y11, _.x11), !v), c.arc(0, 0, l, Math.atan2(_.cy + _.y11, _.cx + _.x11), Math.atan2(y.cy + y.y11, y.cx + y.x11), v), c.arc(y.cx, y.cy, N, Math.atan2(y.y11, y.x11), Math.atan2(y.y01, y.x01), !v))) : c.arc(0, 0, l, b, x, v) : c.lineTo(R, L)
						} else c.moveTo(0, 0);
					if (c.closePath(), t) return c = null, t + "" || null
				}
				var n = $a,
					e = Za,
					r = cb(0),
					i = null,
					o = Qa,
					u = Ja,
					a = Ka,
					c = null;
				return t.centroid = function () {
					var t = (+n.apply(this, arguments) + +e.apply(this, arguments)) / 2,
						r = (+o.apply(this, arguments) + +u.apply(this, arguments)) / 2 - lb / 2;
					return [Math.cos(r) * t, Math.sin(r) * t]
				}, t.innerRadius = function (e) {
					return arguments.length ? (n = "function" == typeof e ? e : cb(+e), t) : n
				}, t.outerRadius = function (n) {
					return arguments.length ? (e = "function" == typeof n ? n : cb(+n), t) : e
				}, t.cornerRadius = function (n) {
					return arguments.length ? (r = "function" == typeof n ? n : cb(+n), t) : r
				}, t.padRadius = function (n) {
					return arguments.length ? (i = null == n ? null : "function" == typeof n ? n : cb(+n), t) : i
				}, t.startAngle = function (n) {
					return arguments.length ? (o = "function" == typeof n ? n : cb(+n), t) : o
				}, t.endAngle = function (n) {
					return arguments.length ? (u = "function" == typeof n ? n : cb(+n), t) : u
				}, t.padAngle = function (n) {
					return arguments.length ? (a = "function" == typeof n ? n : cb(+n), t) : a
				}, t.context = function (n) {
					return arguments.length ? (c = null == n ? null : n, t) : c
				}, t
			};
		rc.prototype = {
			areaStart: function () {
				this._line = 0
			},
			areaEnd: function () {
				this._line = NaN
			},
			lineStart: function () {
				this._point = 0
			},
			lineEnd: function () {
				(this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line
			},
			point: function (t, n) {
				switch (t = +t, n = +n, this._point) {
					case 0:
						this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
						break;
					case 1:
						this._point = 2;
					default:
						this._context.lineTo(t, n)
				}
			}
		};
		var db = function (t) {
			return new rc(t)
		},
			vb = function () {
				function t(t) {
					var a, c, s, l = t.length,
						f = !1;
					for (null == i && (u = o(s = Re())), a = 0; a <= l; ++a) !(a < l && r(c = t[a], a, t)) === f && ((f = !f) ? u.lineStart() : u.lineEnd()), f && u.point(+n(c, a, t), +e(c, a, t));
					if (s) return u = null, s + "" || null
				}
				var n = ic,
					e = oc,
					r = cb(!0),
					i = null,
					o = db,
					u = null;
				return t.x = function (e) {
					return arguments.length ? (n = "function" == typeof e ? e : cb(+e), t) : n
				}, t.y = function (n) {
					return arguments.length ? (e = "function" == typeof n ? n : cb(+n), t) : e
				}, t.defined = function (n) {
					return arguments.length ? (r = "function" == typeof n ? n : cb(!!n), t) : r
				}, t.curve = function (n) {
					return arguments.length ? (o = n, null != i && (u = o(i)), t) : o
				}, t.context = function (n) {
					return arguments.length ? (null == n ? i = u = null : u = o(i = n), t) : i
				}, t
			},
			_b = function () {
				function t(t) {
					var n, l, f, h, p, d = t.length,
						v = !1,
						_ = new Array(d),
						y = new Array(d);
					for (null == a && (s = c(p = Re())), n = 0; n <= d; ++n) {
						if (!(n < d && u(h = t[n], n, t)) === v)
							if (v = !v) l = n, s.areaStart(), s.lineStart();
							else {
								for (s.lineEnd(), s.lineStart(), f = n - 1; f >= l; --f) s.point(_[f], y[f]);
								s.lineEnd(), s.areaEnd()
							}
						v && (_[n] = +e(h, n, t), y[n] = +i(h, n, t), s.point(r ? +r(h, n, t) : _[n], o ? +o(h, n, t) : y[n]))
					}
					if (p) return s = null, p + "" || null
				}

				function n() {
					return vb().defined(u).curve(c).context(a)
				}
				var e = ic,
					r = null,
					i = cb(0),
					o = oc,
					u = cb(!0),
					a = null,
					c = db,
					s = null;
				return t.x = function (n) {
					return arguments.length ? (e = "function" == typeof n ? n : cb(+n), r = null, t) : e
				}, t.x0 = function (n) {
					return arguments.length ? (e = "function" == typeof n ? n : cb(+n), t) : e
				}, t.x1 = function (n) {
					return arguments.length ? (r = null == n ? null : "function" == typeof n ? n : cb(+n), t) : r
				}, t.y = function (n) {
					return arguments.length ? (i = "function" == typeof n ? n : cb(+n), o = null, t) : i
				}, t.y0 = function (n) {
					return arguments.length ? (i = "function" == typeof n ? n : cb(+n), t) : i
				}, t.y1 = function (n) {
					return arguments.length ? (o = null == n ? null : "function" == typeof n ? n : cb(+n), t) : o
				}, t.lineX0 = t.lineY0 = function () {
					return n().x(e).y(i)
				}, t.lineY1 = function () {
					return n().x(e).y(o)
				}, t.lineX1 = function () {
					return n().x(r).y(i)
				}, t.defined = function (n) {
					return arguments.length ? (u = "function" == typeof n ? n : cb(!!n), t) : u
				}, t.curve = function (n) {
					return arguments.length ? (c = n, null != a && (s = c(a)), t) : c
				}, t.context = function (n) {
					return arguments.length ? (null == n ? a = s = null : s = c(a = n), t) : a
				}, t
			},
			yb = function (t, n) {
				return n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN
			},
			gb = function (t) {
				return t
			},
			mb = function () {
				function t(t) {
					var a, c, s, l, f, h = t.length,
						p = 0,
						d = new Array(h),
						v = new Array(h),
						_ = +i.apply(this, arguments),
						y = Math.min(hb, Math.max(-hb, o.apply(this, arguments) - _)),
						g = Math.min(Math.abs(y) / h, u.apply(this, arguments)),
						m = g * (y < 0 ? -1 : 1);
					for (a = 0; a < h; ++a)(f = v[d[a] = a] = +n(t[a], a, t)) > 0 && (p += f);
					for (null != e ? d.sort(function (t, n) {
						return e(v[t], v[n])
					}) : null != r && d.sort(function (n, e) {
						return r(t[n], t[e])
					}), a = 0, s = p ? (y - h * m) / p : 0; a < h; ++a, _ = l) c = d[a], f = v[c], l = _ + (f > 0 ? f * s : 0) + m, v[c] = {
						data: t[c],
						index: a,
						value: f,
						startAngle: _,
						endAngle: l,
						padAngle: g
					};
					return v
				}
				var n = gb,
					e = yb,
					r = null,
					i = cb(0),
					o = cb(hb),
					u = cb(0);
				return t.value = function (e) {
					return arguments.length ? (n = "function" == typeof e ? e : cb(+e), t) : n
				}, t.sortValues = function (n) {
					return arguments.length ? (e = n, r = null, t) : e
				}, t.sort = function (n) {
					return arguments.length ? (r = n, e = null, t) : r
				}, t.startAngle = function (n) {
					return arguments.length ? (i = "function" == typeof n ? n : cb(+n), t) : i
				}, t.endAngle = function (n) {
					return arguments.length ? (o = "function" == typeof n ? n : cb(+n), t) : o
				}, t.padAngle = function (n) {
					return arguments.length ? (u = "function" == typeof n ? n : cb(+n), t) : u
				}, t
			},
			xb = ac(db);
		uc.prototype = {
			areaStart: function () {
				this._curve.areaStart()
			},
			areaEnd: function () {
				this._curve.areaEnd()
			},
			lineStart: function () {
				this._curve.lineStart()
			},
			lineEnd: function () {
				this._curve.lineEnd()
			},
			point: function (t, n) {
				this._curve.point(n * Math.sin(t), n * -Math.cos(t))
			}
		};
		var bb = function () {
			return cc(vb().curve(xb))
		},
			wb = function () {
				var t = _b().curve(xb),
					n = t.curve,
					e = t.lineX0,
					r = t.lineX1,
					i = t.lineY0,
					o = t.lineY1;
				return t.angle = t.x, delete t.x, t.startAngle = t.x0, delete t.x0, t.endAngle = t.x1, delete t.x1, t.radius = t.y, delete t.y, t.innerRadius = t.y0, delete t.y0, t.outerRadius = t.y1, delete t.y1, t.lineStartAngle = function () {
					return cc(e())
				}, delete t.lineX0, t.lineEndAngle = function () {
					return cc(r())
				}, delete t.lineX1, t.lineInnerRadius = function () {
					return cc(i())
				}, delete t.lineY0, t.lineOuterRadius = function () {
					return cc(o())
				}, delete t.lineY1, t.curve = function (t) {
					return arguments.length ? n(ac(t)) : n()._curve
				}, t
			},
			Mb = {
				draw: function (t, n) {
					var e = Math.sqrt(n / lb);
					t.moveTo(e, 0), t.arc(0, 0, e, 0, hb)
				}
			},
			Sb = {
				draw: function (t, n) {
					var e = Math.sqrt(n / 5) / 2;
					t.moveTo(-3 * e, -e), t.lineTo(-e, -e), t.lineTo(-e, -3 * e), t.lineTo(e, -3 * e), t.lineTo(e, -e), t.lineTo(3 * e, -e), t.lineTo(3 * e, e), t.lineTo(e, e), t.lineTo(e, 3 * e), t.lineTo(-e, 3 * e), t.lineTo(-e, e), t.lineTo(-3 * e, e), t.closePath()
				}
			},
			Tb = Math.sqrt(1 / 3),
			kb = 2 * Tb,
			Nb = {
				draw: function (t, n) {
					var e = Math.sqrt(n / kb),
						r = e * Tb;
					t.moveTo(0, -e), t.lineTo(r, 0), t.lineTo(0, e), t.lineTo(-r, 0), t.closePath()
				}
			},
			Ab = .8908130915292852,
			Eb = Math.sin(lb / 10) / Math.sin(7 * lb / 10),
			Cb = Math.sin(hb / 10) * Eb,
			zb = -Math.cos(hb / 10) * Eb,
			Pb = {
				draw: function (t, n) {
					var e = Math.sqrt(n * Ab),
						r = Cb * e,
						i = zb * e;
					t.moveTo(0, -e), t.lineTo(r, i);
					for (var o = 1; o < 5; ++o) {
						var u = hb * o / 5,
							a = Math.cos(u),
							c = Math.sin(u);
						t.lineTo(c * e, -a * e), t.lineTo(a * r - c * i, c * r + a * i)
					}
					t.closePath()
				}
			},
			Rb = {
				draw: function (t, n) {
					var e = Math.sqrt(n),
						r = -e / 2;
					t.rect(r, r, e, e)
				}
			},
			Lb = Math.sqrt(3),
			qb = {
				draw: function (t, n) {
					var e = -Math.sqrt(n / (3 * Lb));
					t.moveTo(0, 2 * e), t.lineTo(-Lb * e, -e), t.lineTo(Lb * e, -e), t.closePath()
				}
			},
			Db = -.5,
			Ob = Math.sqrt(3) / 2,
			Ub = 1 / Math.sqrt(12),
			Ib = 3 * (Ub / 2 + 1),
			Fb = {
				draw: function (t, n) {
					var e = Math.sqrt(n / Ib),
						r = e / 2,
						i = e * Ub,
						o = r,
						u = e * Ub + e,
						a = -o,
						c = u;
					t.moveTo(r, i), t.lineTo(o, u), t.lineTo(a, c), t.lineTo(Db * r - Ob * i, Ob * r + Db * i), t.lineTo(Db * o - Ob * u, Ob * o + Db * u), t.lineTo(Db * a - Ob * c, Ob * a + Db * c), t.lineTo(Db * r + Ob * i, Db * i - Ob * r), t.lineTo(Db * o + Ob * u, Db * u - Ob * o), t.lineTo(Db * a + Ob * c, Db * c - Ob * a), t.closePath()
				}
			},
			Bb = [Mb, Sb, Nb, Rb, Pb, qb, Fb],
			Yb = function () {
				function t() {
					var t;
					if (r || (r = t = Re()), n.apply(this, arguments).draw(r, +e.apply(this, arguments)), t) return r = null, t + "" || null
				}
				var n = cb(Mb),
					e = cb(64),
					r = null;
				return t.type = function (e) {
					return arguments.length ? (n = "function" == typeof e ? e : cb(e), t) : n
				}, t.size = function (n) {
					return arguments.length ? (e = "function" == typeof n ? n : cb(+n), t) : e
				}, t.context = function (n) {
					return arguments.length ? (r = null == n ? null : n, t) : r
				}, t
			},
			jb = function () { };
		lc.prototype = {
			areaStart: function () {
				this._line = 0
			},
			areaEnd: function () {
				this._line = NaN
			},
			lineStart: function () {
				this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0
			},
			lineEnd: function () {
				switch (this._point) {
					case 3:
						sc(this, this._x1, this._y1);
					case 2:
						this._context.lineTo(this._x1, this._y1)
				}(this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line
			},
			point: function (t, n) {
				switch (t = +t, n = +n, this._point) {
					case 0:
						this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
						break;
					case 1:
						this._point = 2;
						break;
					case 2:
						this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
					default:
						sc(this, t, n)
				}
				this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = n
			}
		};
		var Hb = function (t) {
			return new lc(t)
		};
		fc.prototype = {
			areaStart: jb,
			areaEnd: jb,
			lineStart: function () {
				this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN, this._point = 0
			},
			lineEnd: function () {
				switch (this._point) {
					case 1:
						this._context.moveTo(this._x2, this._y2), this._context.closePath();
						break;
					case 2:
						this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3), this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3), this._context.closePath();
						break;
					case 3:
						this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4)
				}
			},
			point: function (t, n) {
				switch (t = +t, n = +n, this._point) {
					case 0:
						this._point = 1, this._x2 = t, this._y2 = n;
						break;
					case 1:
						this._point = 2, this._x3 = t, this._y3 = n;
						break;
					case 2:
						this._point = 3, this._x4 = t, this._y4 = n, this._context.moveTo((this._x0 + 4 * this._x1 + t) / 6, (this._y0 + 4 * this._y1 + n) / 6);
						break;
					default:
						sc(this, t, n)
				}
				this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = n
			}
		};
		var Xb = function (t) {
			return new fc(t)
		};
		hc.prototype = {
			areaStart: function () {
				this._line = 0
			},
			areaEnd: function () {
				this._line = NaN
			},
			lineStart: function () {
				this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0
			},
			lineEnd: function () {
				(this._line || 0 !== this._line && 3 === this._point) && this._context.closePath(), this._line = 1 - this._line
			},
			point: function (t, n) {
				switch (t = +t, n = +n, this._point) {
					case 0:
						this._point = 1;
						break;
					case 1:
						this._point = 2;
						break;
					case 2:
						this._point = 3;
						var e = (this._x0 + 4 * this._x1 + t) / 6,
							r = (this._y0 + 4 * this._y1 + n) / 6;
						this._line ? this._context.lineTo(e, r) : this._context.moveTo(e, r);
						break;
					case 3:
						this._point = 4;
					default:
						sc(this, t, n)
				}
				this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = n
			}
		};
		var Vb = function (t) {
			return new hc(t)
		};
		pc.prototype = {
			lineStart: function () {
				this._x = [], this._y = [], this._basis.lineStart()
			},
			lineEnd: function () {
				var t = this._x,
					n = this._y,
					e = t.length - 1;
				if (e > 0)
					for (var r, i = t[0], o = n[0], u = t[e] - i, a = n[e] - o, c = -1; ++c <= e;) r = c / e, this._basis.point(this._beta * t[c] + (1 - this._beta) * (i + r * u), this._beta * n[c] + (1 - this._beta) * (o + r * a));
				this._x = this._y = null, this._basis.lineEnd()
			},
			point: function (t, n) {
				this._x.push(+t), this._y.push(+n)
			}
		};
		var Wb = function t(n) {
			function e(t) {
				return 1 === n ? new lc(t) : new pc(t, n)
			}
			return e.beta = function (n) {
				return t(+n)
			}, e
		}(.85);
		vc.prototype = {
			areaStart: function () {
				this._line = 0
			},
			areaEnd: function () {
				this._line = NaN
			},
			lineStart: function () {
				this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0
			},
			lineEnd: function () {
				switch (this._point) {
					case 2:
						this._context.lineTo(this._x2, this._y2);
						break;
					case 3:
						dc(this, this._x1, this._y1)
				}(this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line
			},
			point: function (t, n) {
				switch (t = +t, n = +n, this._point) {
					case 0:
						this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
						break;
					case 1:
						this._point = 2, this._x1 = t, this._y1 = n;
						break;
					case 2:
						this._point = 3;
					default:
						dc(this, t, n)
				}
				this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n
			}
		};
		var Gb = function t(n) {
			function e(t) {
				return new vc(t, n)
			}
			return e.tension = function (n) {
				return t(+n)
			}, e
		}(0);
		_c.prototype = {
			areaStart: jb,
			areaEnd: jb,
			lineStart: function () {
				this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN, this._point = 0
			},
			lineEnd: function () {
				switch (this._point) {
					case 1:
						this._context.moveTo(this._x3, this._y3), this._context.closePath();
						break;
					case 2:
						this._context.lineTo(this._x3, this._y3), this._context.closePath();
						break;
					case 3:
						this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5)
				}
			},
			point: function (t, n) {
				switch (t = +t, n = +n, this._point) {
					case 0:
						this._point = 1, this._x3 = t, this._y3 = n;
						break;
					case 1:
						this._point = 2, this._context.moveTo(this._x4 = t, this._y4 = n);
						break;
					case 2:
						this._point = 3, this._x5 = t, this._y5 = n;
						break;
					default:
						dc(this, t, n)
				}
				this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n
			}
		};
		var $b = function t(n) {
			function e(t) {
				return new _c(t, n)
			}
			return e.tension = function (n) {
				return t(+n)
			}, e
		}(0);
		yc.prototype = {
			areaStart: function () {
				this._line = 0
			},
			areaEnd: function () {
				this._line = NaN
			},
			lineStart: function () {
				this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0
			},
			lineEnd: function () {
				(this._line || 0 !== this._line && 3 === this._point) && this._context.closePath(), this._line = 1 - this._line
			},
			point: function (t, n) {
				switch (t = +t, n = +n, this._point) {
					case 0:
						this._point = 1;
						break;
					case 1:
						this._point = 2;
						break;
					case 2:
						this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
						break;
					case 3:
						this._point = 4;
					default:
						dc(this, t, n)
				}
				this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n
			}
		};
		var Zb = function t(n) {
			function e(t) {
				return new yc(t, n)
			}
			return e.tension = function (n) {
				return t(+n)
			}, e
		}(0);
		mc.prototype = {
			areaStart: function () {
				this._line = 0
			},
			areaEnd: function () {
				this._line = NaN
			},
			lineStart: function () {
				this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0
			},
			lineEnd: function () {
				switch (this._point) {
					case 2:
						this._context.lineTo(this._x2, this._y2);
						break;
					case 3:
						this.point(this._x2, this._y2)
				}(this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line
			},
			point: function (t, n) {
				if (t = +t, n = +n, this._point) {
					var e = this._x2 - t,
						r = this._y2 - n;
					this._l23_a = Math.sqrt(this._l23_2a = Math.pow(e * e + r * r, this._alpha))
				}
				switch (this._point) {
					case 0:
						this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
						break;
					case 1:
						this._point = 2;
						break;
					case 2:
						this._point = 3;
					default:
						gc(this, t, n)
				}
				this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n
			}
		};
		var Qb = function t(n) {
			function e(t) {
				return n ? new mc(t, n) : new vc(t, 0)
			}
			return e.alpha = function (n) {
				return t(+n)
			}, e
		}(.5);
		xc.prototype = {
			areaStart: jb,
			areaEnd: jb,
			lineStart: function () {
				this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0
			},
			lineEnd: function () {
				switch (this._point) {
					case 1:
						this._context.moveTo(this._x3, this._y3), this._context.closePath();
						break;
					case 2:
						this._context.lineTo(this._x3, this._y3), this._context.closePath();
						break;
					case 3:
						this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5)
				}
			},
			point: function (t, n) {
				if (t = +t, n = +n, this._point) {
					var e = this._x2 - t,
						r = this._y2 - n;
					this._l23_a = Math.sqrt(this._l23_2a = Math.pow(e * e + r * r, this._alpha))
				}
				switch (this._point) {
					case 0:
						this._point = 1, this._x3 = t, this._y3 = n;
						break;
					case 1:
						this._point = 2, this._context.moveTo(this._x4 = t, this._y4 = n);
						break;
					case 2:
						this._point = 3, this._x5 = t, this._y5 = n;
						break;
					default:
						gc(this, t, n)
				}
				this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n
			}
		};
		var Jb = function t(n) {
			function e(t) {
				return n ? new xc(t, n) : new _c(t, 0)
			}
			return e.alpha = function (n) {
				return t(+n)
			}, e
		}(.5);
		bc.prototype = {
			areaStart: function () {
				this._line = 0
			},
			areaEnd: function () {
				this._line = NaN
			},
			lineStart: function () {
				this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0
			},
			lineEnd: function () {
				(this._line || 0 !== this._line && 3 === this._point) && this._context.closePath(), this._line = 1 - this._line
			},
			point: function (t, n) {
				if (t = +t, n = +n, this._point) {
					var e = this._x2 - t,
						r = this._y2 - n;
					this._l23_a = Math.sqrt(this._l23_2a = Math.pow(e * e + r * r, this._alpha))
				}
				switch (this._point) {
					case 0:
						this._point = 1;
						break;
					case 1:
						this._point = 2;
						break;
					case 2:
						this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
						break;
					case 3:
						this._point = 4;
					default:
						gc(this, t, n)
				}
				this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n
			}
		};
		var Kb = function t(n) {
			function e(t) {
				return n ? new bc(t, n) : new yc(t, 0)
			}
			return e.alpha = function (n) {
				return t(+n)
			}, e
		}(.5);
		wc.prototype = {
			areaStart: jb,
			areaEnd: jb,
			lineStart: function () {
				this._point = 0
			},
			lineEnd: function () {
				this._point && this._context.closePath()
			},
			point: function (t, n) {
				t = +t, n = +n, this._point ? this._context.lineTo(t, n) : (this._point = 1, this._context.moveTo(t, n))
			}
		};
		var tw = function (t) {
			return new wc(t)
		};
		Nc.prototype = {
			areaStart: function () {
				this._line = 0
			},
			areaEnd: function () {
				this._line = NaN
			},
			lineStart: function () {
				this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0
			},
			lineEnd: function () {
				switch (this._point) {
					case 2:
						this._context.lineTo(this._x1, this._y1);
						break;
					case 3:
						kc(this, this._t0, Tc(this, this._t0))
				}(this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line
			},
			point: function (t, n) {
				var e = NaN;
				if (t = +t, n = +n, t !== this._x1 || n !== this._y1) {
					switch (this._point) {
						case 0:
							this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
							break;
						case 1:
							this._point = 2;
							break;
						case 2:
							this._point = 3, kc(this, Tc(this, e = Sc(this, t, n)), e);
							break;
						default:
							kc(this, this._t0, e = Sc(this, t, n))
					}
					this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = n, this._t0 = e
				}
			}
		}, (Ac.prototype = Object.create(Nc.prototype)).point = function (t, n) {
			Nc.prototype.point.call(this, n, t)
		}, Ec.prototype = {
			moveTo: function (t, n) {
				this._context.moveTo(n, t)
			},
			closePath: function () {
				this._context.closePath()
			},
			lineTo: function (t, n) {
				this._context.lineTo(n, t)
			},
			bezierCurveTo: function (t, n, e, r, i, o) {
				this._context.bezierCurveTo(n, t, r, e, o, i)
			}
		}, Pc.prototype = {
			areaStart: function () {
				this._line = 0
			},
			areaEnd: function () {
				this._line = NaN
			},
			lineStart: function () {
				this._x = [], this._y = []
			},
			lineEnd: function () {
				var t = this._x,
					n = this._y,
					e = t.length;
				if (e)
					if (this._line ? this._context.lineTo(t[0], n[0]) : this._context.moveTo(t[0], n[0]), 2 === e) this._context.lineTo(t[1], n[1]);
					else
						for (var r = Rc(t), i = Rc(n), o = 0, u = 1; u < e; ++o, ++u) this._context.bezierCurveTo(r[0][o], i[0][o], r[1][o], i[1][o], t[u], n[u]);
				(this._line || 0 !== this._line && 1 === e) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null
			},
			point: function (t, n) {
				this._x.push(+t), this._y.push(+n)
			}
		};
		var nw = function (t) {
			return new Pc(t)
		};
		Lc.prototype = {
			areaStart: function () {
				this._line = 0
			},
			areaEnd: function () {
				this._line = NaN
			},
			lineStart: function () {
				this._x = this._y = NaN, this._point = 0
			},
			lineEnd: function () {
				0 < this._t && this._t < 1 && 2 === this._point && this._context.lineTo(this._x, this._y), (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line >= 0 && (this._t = 1 - this._t, this._line = 1 - this._line)
			},
			point: function (t, n) {
				switch (t = +t, n = +n, this._point) {
					case 0:
						this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
						break;
					case 1:
						this._point = 2;
					default:
						if (this._t <= 0) this._context.lineTo(this._x, n), this._context.lineTo(t, n);
						else {
							var e = this._x * (1 - this._t) + t * this._t;
							this._context.lineTo(e, this._y), this._context.lineTo(e, n)
						}
				}
				this._x = t, this._y = n
			}
		};
		var ew = function (t) {
			return new Lc(t, .5)
		},
			rw = Array.prototype.slice,
			iw = function (t, n) {
				if ((r = t.length) > 1)
					for (var e, r, i = 1, o = t[n[0]], u = o.length; i < r; ++i) {
						e = o, o = t[n[i]];
						for (var a = 0; a < u; ++a) o[a][1] += o[a][0] = isNaN(e[a][1]) ? e[a][0] : e[a][1]
					}
			},
			ow = function (t) {
				for (var n = t.length, e = new Array(n); --n >= 0;) e[n] = n;
				return e
			},
			uw = function () {
				function t(t) {
					var o, u, a = n.apply(this, arguments),
						c = t.length,
						s = a.length,
						l = new Array(s);
					for (o = 0; o < s; ++o) {
						for (var f, h = a[o], p = l[o] = new Array(c), d = 0; d < c; ++d) p[d] = f = [0, +i(t[d], h, d, t)], f.data = t[d];
						p.key = h
					}
					for (o = 0, u = e(l); o < s; ++o) l[u[o]].index = o;
					return r(l, u), l
				}
				var n = cb([]),
					e = ow,
					r = iw,
					i = Oc;
				return t.keys = function (e) {
					return arguments.length ? (n = "function" == typeof e ? e : cb(rw.call(e)), t) : n
				}, t.value = function (n) {
					return arguments.length ? (i = "function" == typeof n ? n : cb(+n), t) : i
				}, t.order = function (n) {
					return arguments.length ? (e = null == n ? ow : "function" == typeof n ? n : cb(rw.call(n)), t) : e
				}, t.offset = function (n) {
					return arguments.length ? (r = null == n ? iw : n, t) : r
				}, t
			},
			aw = function (t, n) {
				if ((r = t.length) > 0) {
					for (var e, r, i, o = 0, u = t[0].length; o < u; ++o) {
						for (i = e = 0; e < r; ++e) i += t[e][o][1] || 0;
						if (i)
							for (e = 0; e < r; ++e) t[e][o][1] /= i
					}
					iw(t, n)
				}
			},
			cw = function (t, n) {
				if ((e = t.length) > 0) {
					for (var e, r = 0, i = t[n[0]], o = i.length; r < o; ++r) {
						for (var u = 0, a = 0; u < e; ++u) a += t[u][r][1] || 0;
						i[r][1] += i[r][0] = -a / 2
					}
					iw(t, n)
				}
			},
			sw = function (t, n) {
				if ((i = t.length) > 0 && (r = (e = t[n[0]]).length) > 0) {
					for (var e, r, i, o = 0, u = 1; u < r; ++u) {
						for (var a = 0, c = 0, s = 0; a < i; ++a) {
							for (var l = t[n[a]], f = l[u][1] || 0, h = l[u - 1][1] || 0, p = (f - h) / 2, d = 0; d < a; ++d) {
								var v = t[n[d]],
									_ = v[u][1] || 0,
									y = v[u - 1][1] || 0;
								p += _ - y
							}
							c += f, s += p * f
						}
						e[u - 1][1] += e[u - 1][0] = o, c && (o -= s / c)
					}
					e[u - 1][1] += e[u - 1][0] = o, iw(t, n)
				}
			},
			lw = function (t) {
				var n = t.map(Uc);
				return ow(t).sort(function (t, e) {
					return n[t] - n[e]
				})
			},
			fw = function (t) {
				return lw(t).reverse()
			},
			hw = function (t) {
				var n, e, r = t.length,
					i = t.map(Uc),
					o = ow(t).sort(function (t, n) {
						return i[n] - i[t]
					}),
					u = 0,
					a = 0,
					c = [],
					s = [];
				for (n = 0; n < r; ++n) e = o[n], u < a ? (u += i[e], c.push(e)) : (a += i[e], s.push(e));
				return s.reverse().concat(c)
			},
			pw = function (t) {
				return ow(t).reverse()
			},
			dw = function (t) {
				return function () {
					return t
				}
			};
		Bc.prototype = {
			constructor: Bc,
			insert: function (t, n) {
				var e, r, i;
				if (t) {
					if (n.P = t, n.N = t.N, t.N && (t.N.P = n), t.N = n, t.R) {
						for (t = t.R; t.L;) t = t.L;
						t.L = n
					} else t.R = n;
					e = t
				} else this._ ? (t = Xc(this._), n.P = null, n.N = t, t.P = t.L = n, e = t) : (n.P = n.N = null, this._ = n, e = null);
				for (n.L = n.R = null, n.U = e, n.C = !0, t = n; e && e.C;) r = e.U, e === r.L ? (i = r.R, i && i.C ? (e.C = i.C = !1, r.C = !0, t = r) : (t === e.R && (jc(this, e), t = e, e = t.U), e.C = !1, r.C = !0, Hc(this, r))) : (i = r.L, i && i.C ? (e.C = i.C = !1, r.C = !0, t = r) : (t === e.L && (Hc(this, e), t = e, e = t.U), e.C = !1, r.C = !0, jc(this, r))), e = t.U;
				this._.C = !1
			},
			remove: function (t) {
				t.N && (t.N.P = t.P), t.P && (t.P.N = t.N), t.N = t.P = null;
				var n, e, r, i = t.U,
					o = t.L,
					u = t.R;
				if (e = o ? u ? Xc(u) : o : u, i ? i.L === t ? i.L = e : i.R = e : this._ = e, o && u ? (r = e.C, e.C = t.C, e.L = o, o.U = e, e !== u ? (i = e.U, e.U = t.U, t = e.R, i.L = t, e.R = u, u.U = e) : (e.U = i, i = e, t = e.R)) : (r = t.C, t = e), t && (t.U = i), !r) {
					if (t && t.C) return void (t.C = !1);
					do {
						if (t === this._) break;
						if (t === i.L) {
							if (n = i.R, n.C && (n.C = !1, i.C = !0, jc(this, i), n = i.R), n.L && n.L.C || n.R && n.R.C) {
								n.R && n.R.C || (n.L.C = !1, n.C = !0, Hc(this, n), n = i.R), n.C = i.C, i.C = n.R.C = !1, jc(this, i), t = this._;
								break
							}
						} else if (n = i.L, n.C && (n.C = !1, i.C = !0, Hc(this, i), n = i.L), n.L && n.L.C || n.R && n.R.C) {
							n.L && n.L.C || (n.R.C = !1, n.C = !0, jc(this, n), n = i.L), n.C = i.C, i.C = n.L.C = !1, Hc(this, i), t = this._;
							break
						}
						n.C = !0, t = i, i = i.U
					} while (!t.C);
					t && (t.C = !1)
				}
			}
		};
		var vw, _w, yw, gw, mw, xw = [],
			bw = [],
			ww = 1e-6,
			Mw = 1e-12;
		_s.prototype = {
			constructor: _s,
			polygons: function () {
				var t = this.edges;
				return this.cells.map(function (n) {
					var e = n.halfedges.map(function (e) {
						return ts(n, t[e])
					});
					return e.data = n.site.data, e
				})
			},
			triangles: function () {
				var t = [],
					n = this.edges;
				return this.cells.forEach(function (e, r) {
					if (o = (i = e.halfedges).length)
						for (var i, o, u, a = e.site, c = -1, s = n[i[o - 1]], l = s.left === a ? s.right : s.left; ++c < o;) u = l, s = n[i[c]], l = s.left === a ? s.right : s.left, u && l && r < u.index && r < l.index && ds(a, u, l) < 0 && t.push([a.data, u.data, l.data])
				}), t
			},
			links: function () {
				return this.edges.filter(function (t) {
					return t.right
				}).map(function (t) {
					return {
						source: t.left.data,
						target: t.right.data
					}
				})
			},
			find: function (t, n, e) {
				for (var r, i, o = this, u = o._found || 0, a = o.cells.length; !(i = o.cells[u]);)
					if (++u >= a) return null;
				var c = t - i.site[0],
					s = n - i.site[1],
					l = c * c + s * s;
				do i = o.cells[r = u], u = null, i.halfedges.forEach(function (e) {
					var r = o.edges[e],
						a = r.left;
					if (a !== i.site && a || (a = r.right)) {
						var c = t - a[0],
							s = n - a[1],
							f = c * c + s * s;
						f < l && (l = f, u = a.index)
					}
				}); while (null !== u);
				return o._found = r, null == e || l <= e * e ? i.site : null
			}
		};
		var Sw = function () {
			function t(t) {
				return new _s(t.map(function (r, i) {
					var o = [Math.round(n(r, i, t) / ww) * ww, Math.round(e(r, i, t) / ww) * ww];
					return o.index = i, o.data = r, o
				}), r)
			}
			var n = Ic,
				e = Fc,
				r = null;
			return t.polygons = function (n) {
				return t(n).polygons()
			}, t.links = function (n) {
				return t(n).links()
			}, t.triangles = function (n) {
				return t(n).triangles()
			}, t.x = function (e) {
				return arguments.length ? (n = "function" == typeof e ? e : dw(+e), t) : n
			}, t.y = function (n) {
				return arguments.length ? (e = "function" == typeof n ? n : dw(+n), t) : e
			}, t.extent = function (n) {
				return arguments.length ? (r = null == n ? null : [
					[+n[0][0], +n[0][1]],
					[+n[1][0], +n[1][1]]
				], t) : r && [
					[r[0][0], r[0][1]],
					[r[1][0], r[1][1]]
				]
			}, t.size = function (n) {
				return arguments.length ? (r = null == n ? null : [
					[0, 0],
					[+n[0], +n[1]]
				], t) : r && [r[1][0] - r[0][0], r[1][1] - r[0][1]]
			}, t
		},
			Tw = function (t) {
				return function () {
					return t
				}
			};
		gs.prototype = {
			constructor: gs,
			scale: function (t) {
				return 1 === t ? this : new gs(this.k * t, this.x, this.y)
			},
			translate: function (t, n) {
				return 0 === t & 0 === n ? this : new gs(this.k, this.x + this.k * t, this.y + this.k * n)
			},
			apply: function (t) {
				return [t[0] * this.k + this.x, t[1] * this.k + this.y]
			},
			applyX: function (t) {
				return t * this.k + this.x
			},
			applyY: function (t) {
				return t * this.k + this.y
			},
			invert: function (t) {
				return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k]
			},
			invertX: function (t) {
				return (t - this.x) / this.k
			},
			invertY: function (t) {
				return (t - this.y) / this.k
			},
			rescaleX: function (t) {
				return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t))
			},
			rescaleY: function (t) {
				return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t))
			},
			toString: function () {
				return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")"
			}
		};
		var kw = new gs(1, 0, 0);
		ms.prototype = gs.prototype;
		var Nw = function () {
			t.event.preventDefault(), t.event.stopImmediatePropagation()
		},
			Aw = function () {
				function n(t) {
					t.on("wheel.zoom", s).on("mousedown.zoom", l).on("dblclick.zoom", f).on("touchstart.zoom", h).on("touchmove.zoom", d).on("touchend.zoom touchcancel.zoom", v).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)").property("__zoom", Ms)
				}

				function e(t, n) {
					return n = Math.max(x, Math.min(b, n)), n === t.k ? t : new gs(n, t.x, t.y)
				}

				function r(t, n, e) {
					var r = n[0] - e[0] * t.k,
						i = n[1] - e[1] * t.k;
					return r === t.x && i === t.y ? t : new gs(t.k, r, i)
				}

				function i(t, n) {
					var e = t.invertX(n[0][0]) - w,
						r = t.invertX(n[1][0]) - M,
						i = t.invertY(n[0][1]) - S,
						o = t.invertY(n[1][1]) - T;
					return t.translate(r > e ? (e + r) / 2 : Math.min(0, e) || Math.max(0, r), o > i ? (i + o) / 2 : Math.min(0, i) || Math.max(0, o))
				}

				function o(t) {
					return [(+t[0][0] + +t[1][0]) / 2, (+t[0][1] + +t[1][1]) / 2]
				}

				function u(t, n, e) {
					t.on("start.zoom", function () {
						a(this, arguments).start()
					}).on("interrupt.zoom end.zoom", function () {
						a(this, arguments).end()
					}).tween("zoom", function () {
						var t = this,
							r = arguments,
							i = a(t, r),
							u = m.apply(t, r),
							c = e || o(u),
							s = Math.max(u[1][0] - u[0][0], u[1][1] - u[0][1]),
							l = t.__zoom,
							f = "function" == typeof n ? n.apply(t, r) : n,
							h = A(l.invert(c).concat(s / l.k), f.invert(c).concat(s / f.k));
						return function (t) {
							if (1 === t) t = f;
							else {
								var n = h(t),
									e = s / n[2];
								t = new gs(e, c[0] - n[0] * e, c[1] - n[1] * e)
							}
							i.zoom(null, t)
						}
					})
				}

				function a(t, n) {
					for (var e, r = 0, i = E.length; r < i; ++r)
						if ((e = E[r]).that === t) return e;
					return new c(t, n)
				}

				function c(t, n) {
					this.that = t, this.args = n, this.index = -1, this.active = 0, this.extent = m.apply(t, n)
				}

				function s() {
					function n() {
						o.wheel = null, o.end()
					}
					if (g.apply(this, arguments)) {
						var o = a(this, arguments),
							u = this.__zoom,
							c = Math.max(x, Math.min(b, u.k * Math.pow(2, -t.event.deltaY * (t.event.deltaMode ? 120 : 1) / 500))),
							s = Cl(this);
						if (o.wheel) o.mouse[0][0] === s[0] && o.mouse[0][1] === s[1] || (o.mouse[1] = u.invert(o.mouse[0] = s)), clearTimeout(o.wheel);
						else {
							if (u.k === c) return;
							o.mouse = [s, u.invert(s)], op(this), o.start()
						}
						Nw(), o.wheel = setTimeout(n, P), o.zoom("mouse", i(r(e(u, c), o.mouse[0], o.mouse[1]), o.extent))
					}
				}

				function l() {
					function n() {
						Nw(), o.moved = !0, o.zoom("mouse", i(r(o.that.__zoom, o.mouse[0] = Cl(o.that), o.mouse[1]), o.extent))
					}

					function e() {
						u.on("mousemove.zoom mouseup.zoom", null), _t(t.event.view, o.moved), Nw(), o.end()
					}
					if (!y && g.apply(this, arguments)) {
						var o = a(this, arguments),
							u = pf(t.event.view).on("mousemove.zoom", n, !0).on("mouseup.zoom", e, !0),
							c = Cl(this);
						gf(t.event.view), xs(), o.mouse = [c, this.__zoom.invert(c)], op(this), o.start()
					}
				}

				function f() {
					if (g.apply(this, arguments)) {
						var o = this.__zoom,
							a = Cl(this),
							c = o.invert(a),
							s = o.k * (t.event.shiftKey ? .5 : 2),
							l = i(r(e(o, s), a, c), m.apply(this, arguments));
						Nw(), k > 0 ? pf(this).transition().duration(k).call(u, l, a) : pf(this).call(n.transform, l)
					}
				}

				function h() {
					if (g.apply(this, arguments)) {
						var n, e, r, i, o = a(this, arguments),
							u = t.event.changedTouches,
							c = u.length;
						for (xs(), e = 0; e < c; ++e) r = u[e], i = vf(this, u, r.identifier), i = [i, this.__zoom.invert(i), r.identifier], o.touch0 ? o.touch1 || (o.touch1 = i) : (o.touch0 = i, n = !0);
						return _ && (_ = clearTimeout(_), !o.touch1) ? (o.end(), i = pf(this).on("dblclick.zoom"), void (i && i.apply(this, arguments))) : void (n && (_ = setTimeout(function () {
							_ = null
						}, z), op(this), o.start()))
					}
				}

				function d() {
					var n, o, u, c, s = a(this, arguments),
						l = t.event.changedTouches,
						f = l.length;
					for (Nw(), _ && (_ = clearTimeout(_)), n = 0; n < f; ++n) o = l[n], u = vf(this, l, o.identifier), s.touch0 && s.touch0[2] === o.identifier ? s.touch0[0] = u : s.touch1 && s.touch1[2] === o.identifier && (s.touch1[0] = u);
					if (o = s.that.__zoom, s.touch1) {
						var h = s.touch0[0],
							p = s.touch0[1],
							d = s.touch1[0],
							v = s.touch1[1],
							y = (y = d[0] - h[0]) * y + (y = d[1] - h[1]) * y,
							g = (g = v[0] - p[0]) * g + (g = v[1] - p[1]) * g;
						o = e(o, Math.sqrt(y / g)), u = [(h[0] + d[0]) / 2, (h[1] + d[1]) / 2], c = [(p[0] + v[0]) / 2, (p[1] + v[1]) / 2]
					} else {
						if (!s.touch0) return;
						u = s.touch0[0], c = s.touch0[1]
					}
					s.zoom("touch", i(r(o, u, c), s.extent))
				}

				function v() {
					var n, e, r = a(this, arguments),
						i = t.event.changedTouches,
						o = i.length;
					for (xs(), y && clearTimeout(y), y = setTimeout(function () {
						y = null
					}, z), n = 0; n < o; ++n) e = i[n], r.touch0 && r.touch0[2] === e.identifier ? delete r.touch0 : r.touch1 && r.touch1[2] === e.identifier && delete r.touch1;
					r.touch1 && !r.touch0 && (r.touch0 = r.touch1, delete r.touch1), r.touch0 || r.end()
				}
				var _, y, g = bs,
					m = ws,
					x = 0,
					b = 1 / 0,
					w = -b,
					M = b,
					S = w,
					T = M,
					k = 250,
					A = Ch,
					E = [],
					C = p("start", "zoom", "end"),
					z = 500,
					P = 150;
				return n.transform = function (t, n) {
					var e = t.selection ? t.selection() : t;
					e.property("__zoom", Ms), t !== e ? u(t, n) : e.interrupt().each(function () {
						a(this, arguments).start().zoom(null, "function" == typeof n ? n.apply(this, arguments) : n).end()
					})
				}, n.scaleBy = function (t, e) {
					n.scaleTo(t, function () {
						var t = this.__zoom.k,
							n = "function" == typeof e ? e.apply(this, arguments) : e;
						return t * n
					})
				}, n.scaleTo = function (t, u) {
					n.transform(t, function () {
						var t = m.apply(this, arguments),
							n = this.__zoom,
							a = o(t),
							c = n.invert(a),
							s = "function" == typeof u ? u.apply(this, arguments) : u;
						return i(r(e(n, s), a, c), t)
					})
				}, n.translateBy = function (t, e, r) {
					n.transform(t, function () {
						return i(this.__zoom.translate("function" == typeof e ? e.apply(this, arguments) : e, "function" == typeof r ? r.apply(this, arguments) : r), m.apply(this, arguments))
					})
				}, c.prototype = {
					start: function () {
						return 1 === ++this.active && (this.index = E.push(this) - 1, this.emit("start")), this
					},
					zoom: function (t, n) {
						return this.mouse && "mouse" !== t && (this.mouse[1] = n.invert(this.mouse[0])), this.touch0 && "touch" !== t && (this.touch0[1] = n.invert(this.touch0[0])), this.touch1 && "touch" !== t && (this.touch1[1] = n.invert(this.touch1[0])), this.that.__zoom = n, this.emit("zoom"), this
					},
					end: function () {
						return 0 === --this.active && (E.splice(this.index, 1), this.index = -1, this.emit("end")), this
					},
					emit: function (t) {
						N(new ys(n, t, this.that.__zoom), C.apply, C, [t, this.that, this.args])
					}
				}, n.filter = function (t) {
					return arguments.length ? (g = "function" == typeof t ? t : Tw(!!t), n) : g
				}, n.extent = function (t) {
					return arguments.length ? (m = "function" == typeof t ? t : Tw([
						[+t[0][0], +t[0][1]],
						[+t[1][0], +t[1][1]]
					]), n) : m
				}, n.scaleExtent = function (t) {
					return arguments.length ? (x = +t[0], b = +t[1], n) : [x, b]
				}, n.translateExtent = function (t) {
					return arguments.length ? (w = +t[0][0], M = +t[1][0], S = +t[0][1], T = +t[1][1], n) : [
						[w, S],
						[M, T]
					]
				}, n.duration = function (t) {
					return arguments.length ? (k = +t, n) : k
				}, n.interpolate = function (t) {
					return arguments.length ? (A = t, n) : A
				}, n.on = function () {
					var t = C.on.apply(C, arguments);
					return t === C ? n : t
				}, n
			};
		t.version = Ss, t.bisect = As, t.bisectRight = As, t.bisectLeft = Es, t.ascending = Ts, t.bisector = ks, t.descending = Cs, t.deviation = Rs, t.extent = Ls, t.histogram = Vs, t.thresholdFreedmanDiaconis = Gs, t.thresholdScott = $s, t.thresholdSturges = Xs, t.max = Zs, t.mean = Qs, t.median = Js, t.merge = Ks, t.min = tl, t.pairs = nl, t.permute = el, t.quantile = Ws, t.range = Fs, t.scan = rl, t.shuffle = il, t.sum = ol, t.ticks = Hs, t.tickStep = e, t.transpose = ul, t.variance = Ps, t.zip = al, t.axisTop = s, t.axisRight = l, t.axisBottom = f, t.axisLeft = h, t.brush = md, t.brushX = Ae, t.brushY = Ee, t.brushSelection = Ne, t.chord = kd, t.ribbon = Rd, t.nest = qd, t.set = Ve, t.map = Fe, t.keys = Od, t.values = Ud, t.entries = Id, t.color = Mt, t.rgb = Nt, t.hsl = zt, t.lab = qt, t.hcl = Yt, t.cubehelix = Xt, t.dispatch = p, t.drag = xf, t.dragDisable = gf, t.dragEnable = _t, t.dsvFormat = Fd, t.csvParse = Yd, t.csvParseRows = jd, t.csvFormat = Hd, t.csvFormatRows = Xd, t.tsvParse = Wd, t.tsvParseRows = Gd, t.tsvFormat = $d, t.tsvFormatRows = Zd, t.easeLinear = ne, t.easeQuad = ie, t.easeQuadIn = ee, t.easeQuadOut = re, t.easeQuadInOut = ie, t.easeCubic = ae, t.easeCubicIn = oe, t.easeCubicOut = ue, t.easeCubicInOut = ae, t.easePoly = zp, t.easePolyIn = Ep, t.easePolyOut = Cp, t.easePolyInOut = zp, t.easeSin = le, t.easeSinIn = ce, t.easeSinOut = se, t.easeSinInOut = le, t.easeExp = pe, t.easeExpIn = fe, t.easeExpOut = he, t.easeExpInOut = pe, t.easeCircle = _e, t.easeCircleIn = de, t.easeCircleOut = ve, t.easeCircleInOut = _e, t.easeBounce = ge, t.easeBounceIn = ye, t.easeBounceOut = ge, t.easeBounceInOut = me, t.easeBack = Wp, t.easeBackIn = Xp, t.easeBackOut = Vp, t.easeBackInOut = Wp, t.easeElastic = Jp, t.easeElasticIn = Qp, t.easeElasticOut = Jp, t.easeElasticInOut = Kp, t.forceCenter = Qd, t.forceCollide = vv, t.forceLink = _v, t.forceManyBody = xv, t.forceSimulation = mv, t.forceX = bv, t.forceY = wv, t.formatDefaultLocale = hr, t.formatLocale = Lv, t.formatSpecifier = zv, t.precisionFixed = qv, t.precisionPrefix = Dv, t.precisionRound = Ov, t.geoArea = j_, t.geoBounds = V_, t.geoCentroid = G_, t.geoCircle = sy, t.geoClipExtent = _y, t.geoDistance = wy, t.geoGraticule = vi, t.geoGraticule10 = _i, t.geoInterpolate = My, t.geoLength = my, t.geoPath = jy, t.geoAlbers = ng, t.geoAlbersUsa = eg, t.geoAzimuthalEqualArea = ig, t.geoAzimuthalEqualAreaRaw = rg, t.geoAzimuthalEquidistant = ug, t.geoAzimuthalEquidistantRaw = og, t.geoConicConformal = cg, t.geoConicConformalRaw = eo, t.geoConicEqualArea = tg, t.geoConicEqualAreaRaw = $i, t.geoConicEquidistant = lg, t.geoConicEquidistantRaw = io, t.geoEquirectangular = sg, t.geoEquirectangularRaw = ro, t.geoGnomonic = fg, t.geoGnomonicRaw = oo, t.geoIdentity = hg, t.geoProjection = Xi, t.geoProjectionMutator = Vi, t.geoMercator = ag, t.geoMercatorRaw = Ki, t.geoOrthographic = pg, t.geoOrthographicRaw = ao, t.geoStereographic = dg, t.geoStereographicRaw = co, t.geoTransverseMercator = vg, t.geoTransverseMercatorRaw = so, t.geoRotation = cy, t.geoStream = I_, t.geoTransform = $y, t.cluster = _g, t.hierarchy = xo, t.pack = Pg, t.packSiblings = Cg, t.packEnclose = Eg, t.partition = qg, t.stratify = Ig, t.tree = Fg, t.treemap = Hg, t.treemapBinary = Xg, t.treemapDice = Lg, t.treemapSlice = Bg, t.treemapSliceDice = Vg, t.treemapSquarify = jg, t.treemapResquarify = Wg, t.interpolate = mh, t.interpolateArray = hh, t.interpolateBasis = uh, t.interpolateBasisClosed = ah, t.interpolateDate = ph, t.interpolateNumber = dh, t.interpolateObject = vh, t.interpolateRound = xh, t.interpolateString = gh, t.interpolateTransformCss = Sh, t.interpolateTransformSvg = Th, t.interpolateZoom = Ch, t.interpolateRgb = sh, t.interpolateRgbBasis = lh, t.interpolateRgbBasisClosed = fh, t.interpolateHsl = zh, t.interpolateHslLong = Ph, t.interpolateLab = ln, t.interpolateHcl = Rh, t.interpolateHclLong = Lh, t.interpolateCubehelix = qh, t.interpolateCubehelixLong = Dh, t.quantize = Oh, t.path = Re, t.polygonArea = Gg, t.polygonCentroid = $g, t.polygonHull = Qg, t.polygonContains = Jg, t.polygonLength = Kg;
		t.quadtree = nr;
		t.queue = lu, t.randomUniform = em, t.randomNormal = rm, t.randomLogNormal = im, t.randomBates = um, t.randomIrwinHall = om, t.randomExponential = am, t.request = cm, t.html = lm, t.json = fm, t.text = hm, t.xml = pm, t.csv = vm, t.tsv = _m, t.scaleBand = vu, t.scalePoint = yu, t.scaleIdentity = Nu, t.scaleLinear = ku, t.scaleLog = Lu, t.scaleOrdinal = du, t.scaleImplicit = xm, t.scalePow = Du, t.scaleSqrt = Ou, t.scaleQuantile = Uu, t.scaleQuantize = Iu, t.scaleThreshold = Fu, t.scaleTime = Vx, t.scaleUtc = Wx, t.schemeCategory10 = $x, t.schemeCategory20b = Zx, t.schemeCategory20c = Qx, t.schemeCategory20 = Jx, t.interpolateCubehelixDefault = Kx, t.interpolateRainbow = rb, t.interpolateWarm = tb, t.interpolateCool = nb, t.interpolateViridis = ib, t.interpolateMagma = ob, t.interpolateInferno = ub, t.interpolatePlasma = ab, t.scaleSequential = Ga, t.creator = ml, t.local = x, t.matcher = Sl, t.mouse = Cl, t.namespace = gl, t.namespaces = yl, t.select = pf, t.selectAll = df, t.selection = dt, t.selector = zl, t.selectorAll = Rl, t.touch = vf, t.touches = _f, t.window = Jl, t.customEvent = N, t.arc = pb, t.area = _b, t.line = vb, t.pie = mb, t.radialArea = wb, t.radialLine = bb, t.symbol = Yb, t.symbols = Bb, t.symbolCircle = Mb, t.symbolCross = Sb, t.symbolDiamond = Nb, t.symbolSquare = Rb, t.symbolStar = Pb, t.symbolTriangle = qb, t.symbolWye = Fb, t.curveBasisClosed = Xb, t.curveBasisOpen = Vb, t.curveBasis = Hb, t.curveBundle = Wb, t.curveCardinalClosed = $b, t.curveCardinalOpen = Zb, t.curveCardinal = Gb, t.curveCatmullRomClosed = Jb, t.curveCatmullRomOpen = Kb, t.curveCatmullRom = Qb, t.curveLinearClosed = tw, t.curveLinear = db, t.curveMonotoneX = Cc, t.curveMonotoneY = zc, t.curveNatural = nw, t.curveStep = ew, t.curveStepAfter = Dc, t.curveStepBefore = qc, t.stack = uw, t.stackOffsetExpand = aw, t.stackOffsetNone = iw, t.stackOffsetSilhouette = cw, t.stackOffsetWiggle = sw, t.stackOrderAscending = lw, t.stackOrderDescending = fw, t.stackOrderInsideOut = hw, t.stackOrderNone = ow, t.stackOrderReverse = pw, t.timeInterval = Bu, t.timeMillisecond = Am, t.timeMilliseconds = Em, t.utcMillisecond = Am, t.utcMilliseconds = Em, t.timeSecond = qm, t.timeSeconds = Dm, t.utcSecond = qm, t.utcSeconds = Dm, t.timeMinute = Om, t.timeMinutes = Um, t.timeHour = Im, t.timeHours = Fm, t.timeDay = Bm, t.timeDays = Ym, t.timeWeek = jm, t.timeWeeks = Zm, t.timeSunday = jm, t.timeSundays = Zm, t.timeMonday = Hm, t.timeMondays = Qm, t.timeTuesday = Xm, t.timeTuesdays = Jm, t.timeWednesday = Vm, t.timeWednesdays = Km, t.timeThursday = Wm, t.timeThursdays = tx, t.timeFriday = Gm, t.timeFridays = nx, t.timeSaturday = $m, t.timeSaturdays = ex, t.timeMonth = rx, t.timeMonths = ix, t.timeYear = ox, t.timeYears = ux, t.utcMinute = ax, t.utcMinutes = cx, t.utcHour = sx, t.utcHours = lx, t.utcDay = fx, t.utcDays = hx, t.utcWeek = px, t.utcWeeks = xx, t.utcSunday = px, t.utcSundays = xx, t.utcMonday = dx, t.utcMondays = bx, t.utcTuesday = vx, t.utcTuesdays = wx, t.utcWednesday = _x, t.utcWednesdays = Mx, t.utcThursday = yx, t.utcThursdays = Sx, t.utcFriday = gx, t.utcFridays = Tx, t.utcSaturday = mx, t.utcSaturdays = kx, t.utcMonth = Nx, t.utcMonths = Ax, t.utcYear = Ex, t.utcYears = zx, t.timeFormatDefaultLocale = Ba, t.timeFormatLocale = Wu, t.isoFormat = Ox, t.isoParse = Ux, t.now = pn, t.timer = _n, t.timerFlush = yn, t.timeout = Wh, t.interval = Gh, t.transition = Kn, t.active = rd, t.interrupt = op, t.voronoi = Sw, t.zoom = Aw, t.zoomTransform = ms, t.zoomIdentity = kw, Object.defineProperty(t, "__esModule", {
			value: !0
		})
	})
}, function (t, n, e) {
	(function (t) {
		"use strict";
		var r = e(1),
			i = function () {
				function n(t) {
					this.Context = t, this.TeethId = t.Selected, this.Table = document.createElement("table"), this.Table.className = "table table-bordered", this.Table.style.maxWidth = "150px", this.Table.style.position = "fixed", this.Table.style.zIndex = "2", this.Table.style.backgroundColor = "white", this.Row = document.createElement("tr"), this.Cell = document.createElement("td"), this.Cell.style.paddingLeft = "10px", this.Cell.style.cursor = "pointer", r.isOdonto(t.Selected.split(" ")[1]) ? this.Navs = t.MenuOdonto : this.Navs = t.MenuPeriodonto
				}
				return n.prototype.Draw = function (n, e, r) {
					var i = this;
					return this.Table.style.left = n + "px", this.Table.style.top = e - r + "px", t("body").append(this.Shadow()), this.Navs.forEach(function (t) {
						var n = i.Row.cloneNode(!1),
							e = i.Cell.cloneNode(!1);
						n.appendChild(e), e.textContent = t.text, e.onclick = function (n) {
							t.action(i.Context)
						}, e.onmouseenter = function () {
							e.style.backgroundColor = "lightgrey"
						}, e.onmouseleave = function () {
							e.style.backgroundColor = "white"
						}, i.Table.appendChild(n)
					}), this.Table
				}, n.prototype.Shadow = function () {
					return this.ShadowBox = document.createElement("div"), this.ShadowBox.oncontextmenu = function () {
						return !1
					}, this.ShadowBox.style.height = t("body").height() + "px", this.ShadowBox.style.width = t("body").width() + "px", this.ShadowBox.style.backgroundColor = "transparent", this.ShadowBox.style.position = "absolute", this.ShadowBox.style.top = "0px", this.ShadowBox.style.zIndex = "1", this.ShadowBox
				}, n.prototype.Destroy = function () {
					return this.Table.innerHTML = "", this.Table.remove(), this.ShadowBox ? this.ShadowBox.remove() : 0, this.Destroy, !1
				}, n
			}();
		Object.defineProperty(n, "__esModule", {
			value: !0
		}), n.default = i
	}).call(n, e(2))
}]);