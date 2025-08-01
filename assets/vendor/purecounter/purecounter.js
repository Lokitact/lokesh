/*!
 * purecounter.js - A simple yet configurable native javascript counter which you can count on.
 * Author: Stig Rex
 * Version: 1.1.4
 * Url: https://github.com/srexi/purecounterjs
 * License: MIT
 */
! function() { "use strict";

  function e(e, t) { var r = Object.keys(e); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e);
      t && (n = n.filter((function(t) { return Object.getOwnPropertyDescriptor(e, t).enumerable }))), r.push.apply(r, n) } return r }

  function t(e, t, r) { return t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e }

  function r(e, t) { for (var r = 0; r < t.length; r++) { var n = t[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n) } } new(function() {
    function n(e) {! function(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }(this, n), this.defaults = { start: 0, end: 100, duration: 2e3, delay: 10, once: !0, decimals: 0, legacy: !0, currency: !1, currencysymbol: !1, separator: !1, separatorsymbol: ",", selector: ".purecounter" }, this.configOptions = Object.assign({}, this.defaults, e || {}), this.registerEventListeners() } var a, i, o; return a = n, (i = [{ key: "registerEventListeners", value: function() { var e = document.querySelectorAll(this.configOptions.selector); if (this.intersectionListenerSupported()) { var t = new IntersectionObserver(this.animateElements.bind(this), { root: null, rootMargin: "20px", threshold: .5 });
          e.forEach((function(e) { t.observe(e) })) } else window.addEventListener && (this.animateLegacy(e), window.addEventListener("scroll", (function(t) { this.animateLegacy(e) }), { passive: !0 })) } }, { key: "animateLegacy", value: function(e) { var t = this;
        e.forEach((function(e) {!0 === t.parseConfig(e).legacy && t.elementIsInView(e) && t.animateElements([e]) })) } }, { key: "animateElements", value: function(e, t) { var r = this;
        e.forEach((function(e) { var n = e.target || e,
            a = r.parseConfig(n); if (a.duration <= 0) return n.innerHTML = r.formatNumber(a.end, a); if (!t && !r.elementIsInView(e) || t && e.intersectionRatio < .5) { var i = a.start > a.end ? a.end : a.start; return n.innerHTML = r.formatNumber(i, a) } setTimeout((function() { return r.startCounter(n, a) }), a.delay) })) } }, { key: "startCounter", value: function(e, t) { var r = this,
          n = (t.end - t.start) / (t.duration / t.delay),
          a = "inc";
        t.start > t.end && (a = "dec", n *= -1); var i = this.parseValue(t.start);
        e.innerHTML = this.formatNumber(i, t), !0 === t.once && e.setAttribute("data-purecounter-duration", 0); var o = setInterval((function() { var s = r.nextNumber(i, n, a);
          e.innerHTML = r.formatNumber(s, t), ((i = s) >= t.end && "inc" == a || i <= t.end && "dec" == a) && (e.innerHTML = r.formatNumber(t.end, t), clearInterval(o)) }), t.delay) } }, { key: "parseConfig", value: function(r) { var n = this,
          a = function(r) { for (var n = 1; n < arguments.length; n++) { var a = null != arguments[n] ? arguments[n] : {};
              n % 2 ? e(Object(a), !0).forEach((function(e) { t(r, e, a[e]) })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(a)) : e(Object(a)).forEach((function(e) { Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(a, e)) })) } return r }({}, this.configOptions),
          i = [].filter.call(r.attributes, (function(e) { return /^data-purecounter-/.test(e.name) })),
          o = {}; return i.forEach((function(e) { var t = e.name.replace("data-purecounter-", "").toLowerCase(),
            r = "duration" == t ? parseInt(1e3 * n.parseValue(e.value)) : n.parseValue(e.value);
          o[t] = r })), Object.assign(a, o) } }, { key: "nextNumber", value: function(e, t) { var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "inc"; return e = this.parseValue(e), t = this.parseValue(t), parseFloat("inc" === r ? e + t : e - t) } }, { key: "convertToCurrencySystem", value: function(e, t) { var r = t.currencysymbol || "",
          n = t.decimals || 1; return r + ((e = Math.abs(Number(e))) >= 1e12 ? "".concat((e / 1e12).toFixed(n), " T") : e >= 1e9 ? "".concat((e / 1e9).toFixed(n), " B") : e >= 1e6 ? "".concat((e / 1e6).toFixed(n), " M") : e >= 1e3 ? "".concat((e / 1e12).toFixed(n), " K") : e.toFixed(n)) } }, { key: "applySeparator", value: function(e, t) { return t.separator ? e.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,").replace(new RegExp(/,/gi, "gi"), t.separatorsymbol) : e.replace(new RegExp(/,/gi, "gi"), "") } }, { key: "formatNumber", value: function(e, t) { var r = { minimumFractionDigits: t.decimals, maximumFractionDigits: t.decimals }; return e = t.currency ? this.convertToCurrencySystem(e, t) : parseFloat(e), this.applySeparator(e.toLocaleString(void 0, r), t) } }, { key: "parseValue", value: function(e) { return /^[0-9]+\.[0-9]+$/.test(e) ? parseFloat(e) : /^[0-9]+$/.test(e) ? parseInt(e) : /^true|false/i.test(e) ? /^true/i.test(e) : e } }, { key: "elementIsInView", value: function(e) { for (var t = e.offsetTop, r = e.offsetLeft, n = e.offsetWidth, a = e.offsetHeight; e.offsetParent;) t += (e = e.offsetParent).offsetTop, r += e.offsetLeft; return t >= window.pageYOffset && r >= window.pageXOffset && t + a <= window.pageYOffset + window.innerHeight && r + n <= window.pageXOffset + window.innerWidth } }, { key: "intersectionListenerSupported", value: function() { return "IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype } }]) && r(a.prototype, i), o && r(a, o), n }()) }();
//# sourceMappingURL=purecounter.js.map