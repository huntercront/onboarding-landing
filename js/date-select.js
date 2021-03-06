! function(t) { "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : window.Picker = t() }(function() {
    "use strict";
    var k = { header: "calendar-header", button: "calendar-button", buttonDecrease: "calendar-button-decrease", buttonIncrease: "calendar-button-increase", headerMonth: "calendar-header-month", monthName: "calendar-month-name", dayName: "calendar-day-name", row: "calendar-row", table: "calendar-table", calendar: "calendar", cell: "calendar-cell", date: "calendar-date", week: "calendar-week", isOtherMonth: "calendar-is-other-month", isCurrentMonth: "calendar-is-current-month", isEdge: "calendar-is-edge", isStart: "calendar-is-start", isOutside: "calendar-is-outside", isBeforeStart: "calendar-is-before-start", isEnd: "calendar-is-end", isAfterEnd: "calendar-is-after-end", isOk: "calendar-is-ok" };

    function S(t, e, a) { return t instanceof Date && (a = t.getDate(), e = t.getMonth(), t = t.getFullYear()), new Date(t, e, a, 0, 0, 0, 0) }

    function e(t) { var e = String(t); return "00".substring(0, "00".length - e.length) + e }

    function N(t) { return "[object Date]" === Object.prototype.toString.call(t) && !isNaN(t.getTime()) }

    function L(t) { return t.getFullYear() + "" + e(t.getMonth()) + e(t.getDate()) }

    function O(t) { return !!t && S(t.getAttribute("data-year"), t.getAttribute("data-month"), t.getAttribute("data-date")) }

    function g(t, e) {
        for (var a, n, r, o = (a = t, n = (a = new Date(a)).getDay(), r = a.getDate() - n + (0 === n ? -6 : 1), new Date(a.setDate(r))), i = "", s = 0; s < 6; s++) {
            i += '<tr class="' + k.row + " " + k.week + '">';
            for (var d = 0; d < 7; d++) i += "<td " + e(o, t) + ">" + o.getDate() + "</td>", o.addDays(1);
            i += "</tr>"
        }
        return i + ""
    }

    function T(t, e, a, n, r, o) {
        var i, s, d, u, c, l, h = document.createElement("div"),
            f = "";
        return f += (i = t, s = e, d = a, c = r, l = "", u = (u = n) && (!s || !d.twoCalendars), c = c && (s || !d.twoCalendars), l += '<div class="' + k.header + '">', u && (l += '<div class="' + k.button + " " + k.buttonDecrease + '">' + d.icon + "</div>"), l += '<div class="' + k.headerMonth + '"><strong class="' + k.monthName + '">' + d.monthNames[i.getMonth()] + "</strong> " + i.getFullYear() + "</div>", c && (l += '<div class="' + k.button + " " + k.buttonIncrease + '">' + d.icon + "</div>"), l += "</div>"), f += '<table class="' + k.table + '">', f += '<tr class="' + k.row + '">' + a.dayNamesShort.map(function(t) { return '<th class="' + k.cell + " " + k.dayName + '">' + t + "</th>" }).join("") + "</tr>", f += g(t, o), f += "</table>", h.className = k.calendar, h.innerHTML = f, h
    }

    function t(r, i) {
        if (!r) throw new Error("noUiDatePicker requires a single element.");
        if (!N(i.min) || !N(i.max)) throw new Error("noUiDatePicker requires valid dates.");
        var s = S(i.min).null(),
            d = S(i.max).null(),
            n = S(s),
            u = !1,
            c = !1,
            l = !1,
            e = !1,
            o = !0,
            h = !0,
            f = function(t) { t.addMonths(-1), i.twoCalendars && t.addMonths(-1); return t }(S(d));

        function g(t, e) {
            var a, n = [k.cell, k.date],
                r = "true",
                o = !1;
            return t.getMonth() !== e.getMonth() ? (n.push(k.isOtherMonth), r = "false") : (n.push(k.isCurrentMonth), o = !0), t.getTime() === s.getTime() ? (n.push(k.isEdge), n.push(k.isStart)) : t < s ? (r = "false", n.push(k.isOutside), n.push(k.isBeforeStart)) : t.getTime() === d.getTime() ? (n.push(k.isEdge), n.push(k.isEnd)) : d < t ? (r = "false", n.push(k.isOutside), n.push(k.isAfterEnd)) : o && n.push(k.isOk), 'data-calc="' + L(a = t) + '" data-day="' + a.getDay() + '" data-date="' + a.getDate() + '" data-month="' + a.getMonth() + '" data-year="' + a.getFullYear() + '" data-valid="' + r + '" class="' + n.join(" ") + '"'
        }

        function p() {
            n.setDate(1);
            var t = S(n);
            h = s <= t, o = t <= f, m(), r.innerHTML = "", r.appendChild(T(t, 0, i, h, o, g)), i.twoCalendars && r.appendChild(T(t.addMonths(1), 1, i, h, o, g));
            var e = r.querySelector("." + k.buttonDecrease),
                a = r.querySelector("." + k.buttonIncrease);
            e && e.addEventListener("click", M), a && a.addEventListener("click", w)
        }

        function m() { u && u.removeAttribute("data-state"), c && c.removeAttribute("data-state"), l && l.removeAttribute("data-state"), e && e.forEach(function(t) { t.removeAttribute("data-state") }), e = l = c = u = !1 }

        function v(a, n) {
            var t;
            t = r.querySelectorAll("." + k.date + "." + k.isCurrentMonth), (e = Array.prototype.slice.call(t)).forEach(function(t) {
                var e = Number(t.getAttribute("data-calc"));
                a < e && e < n && t.setAttribute("data-state", "between")
            })
        }

        function b(t) { return r.querySelector('[data-calc="' + L(t) + '"][data-valid="true"]') }

        function y(t) { i["on" + t] && i["on" + t].call(a) }

        function D(t, e) {
            var a, n, r, o;
            u && i.twoCalendars ? (a = t, n = Number(u.getAttribute("data-calc")), r = Number(a.getAttribute("data-calc")), o = r < n, v(Math.min(n, r), Math.max(n, r)), c = o ? a : u, l = o ? u : a, u = !1, c.setAttribute("data-state", "start"), l.setAttribute("data-state", "end")) : (m(), t.setAttribute("data-state", "pending"), u = t), e || y("Select")
        }

        function t(t) {
            var e;
            u && t.target === u ? (t.stopPropagation(), t.preventDefault(), C()) : (e = t.target) && e.hasAttribute("data-date") && "false" !== e.getAttribute("data-valid") && (t.stopPropagation(), t.preventDefault(), D(t.target))
        }

        function M() { h && (n.addMonths(-1), p(), y("Clear")) }

        function w() { o && (n.addMonths(1), p(), y("Clear")) }

        function A(t) { return S(t < s ? s : d < t ? d : t) }

        function E(t) {
            if (!N(t)) throw new Error("date not valid (" + t + ")");
            var e, a;
            t = A(t), C(!0), i.twoCalendars && (a = d, (e = t).getMonth() === a.getMonth() && e.getFullYear() === a.getFullYear()) && t.addMonths(-1), n = t.null(), p()
        }

        function C(t) { m(), t || y("Clear") }
        p(), r.addEventListener("click", t);
        var a = {
            prev: M,
            next: w,
            get: function() {
                var t = O(c),
                    e = O(l),
                    a = !1;
                return t && e && (a = Math.round((e - t) / 864e5)), { start: t || O(u), end: e, nights: a, days: !!a && a + 1 }
            },
            set: E,
            select: function(t, e, a) { E(t = A(t)), D(b(t), !0), e && i.twoCalendars && D(b(A(e)), !0), a || y("Select") },
            clear: C,
            destroy: function() { r.removeEventListener("click", t), r.innerHTML = "" }
        };
        return a
    }
    return Date.prototype.null = function() { return this.setHours(0, 0, 0, 0), this }, Date.prototype.addDays = function(t) { return this.setDate(this.getDate() + t), this }, Date.prototype.addMonths = function(t) { return this.setMonth(this.getMonth() + t), this }, Date.prototype.Ymd = function() { return this.getFullYear() + "-" + e(this.getMonth() + 1) + "-" + e(this.getDate()) }, t.prototype.pad = e, t.prototype.copy = S, t.prototype.isValidDate = N,
        function() {
            var t = document.createElement("input");
            t.setAttribute("type", "date");
            var e = "not-a-date";
            return t.setAttribute("value", e), t.value !== e
        }() || document.documentElement.classList.add("js-no-type-date-support"), t
});