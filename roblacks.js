!function() {
    var n = {
        6660: function(e, t, n) {
            e.exports = n(8226)
        },
        8427: function(e, t, u) {
            "use strict";
            var c = u(4345)
              , l = u(6435)
              , d = u(3025)
              , h = u(6135)
              , v = u(6923)
              , p = u(1792);
            e.exports = function(s) {
                return new Promise(function(t, n) {
                    var r = s.data
                      , a = s.headers;
                    c.isFormData(r) && delete a["Content-Type"];
                    var e, o, i = new XMLHttpRequest;
                    if (s.auth && (e = s.auth.username || "",
                    o = s.auth.password || "",
                    a.Authorization = "Basic " + btoa(e + ":" + o)),
                    i.open(s.method.toUpperCase(), d(s.url, s.params, s.paramsSerializer), !0),
                    i.timeout = s.timeout,
                    i.onreadystatechange = function() {
                        var e;
                        i && 4 === i.readyState && (0 !== i.status || i.responseURL && 0 === i.responseURL.indexOf("file:")) && (e = "getAllResponseHeaders"in i ? h(i.getAllResponseHeaders()) : null,
                        e = {
                            data: s.responseType && "text" !== s.responseType ? i.response : i.responseText,
                            status: i.status,
                            statusText: i.statusText,
                            headers: e,
                            config: s,
                            request: i
                        },
                        l(t, n, e),
                        i = null)
                    }
                    ,
                    i.onerror = function() {
                        n(p("Network Error", s, null, i)),
                        i = null
                    }
                    ,
                    i.ontimeout = function() {
                        n(p("timeout of " + s.timeout + "ms exceeded", s, "ECONNABORTED", i)),
                        i = null
                    }
                    ,
                    c.isStandardBrowserEnv() && (o = u(5905),
                    (o = (s.withCredentials || v(s.url)) && s.xsrfCookieName ? o.read(s.xsrfCookieName) : void 0) && (a[s.xsrfHeaderName] = o)),
                    "setRequestHeader"in i && c.forEach(a, function(e, t) {
                        void 0 === r && "content-type" === t.toLowerCase() ? delete a[t] : i.setRequestHeader(t, e)
                    }),
                    s.withCredentials && (i.withCredentials = !0),
                    s.responseType)
                        try {
                            i.responseType = s.responseType
                        } catch (e) {
                            if ("json" !== s.responseType)
                                throw e
                        }
                    "function" == typeof s.onDownloadProgress && i.addEventListener("progress", s.onDownloadProgress),
                    "function" == typeof s.onUploadProgress && i.upload && i.upload.addEventListener("progress", s.onUploadProgress),
                    s.cancelToken && s.cancelToken.promise.then(function(e) {
                        i && (i.abort(),
                        n(e),
                        i = null)
                    }),
                    void 0 === r && (r = null),
                    i.send(r)
                }
                )
            }
        },
        8226: function(e, t, n) {
            "use strict";
            var r = n(4345)
              , a = n(5063)
              , o = n(9560)
              , i = n(292);
            function s(e) {
                var t = new o(e)
                  , e = a(o.prototype.request, t);
                return r.extend(e, o.prototype, t),
                r.extend(e, t),
                e
            }
            var u = s(i);
            u.Axios = o,
            u.create = function(e) {
                return s(r.merge(i, e))
            }
            ,
            u.Cancel = n(9945),
            u.CancelToken = n(5912),
            u.isCancel = n(6945),
            u.all = function(e) {
                return Promise.all(e)
            }
            ,
            u.spread = n(8127),
            e.exports = u,
            e.exports.default = u
        },
        9945: function(e) {
            "use strict";
            function t(e) {
                this.message = e
            }
            t.prototype.toString = function() {
                return "Cancel" + (this.message ? ": " + this.message : "")
            }
            ,
            t.prototype.__CANCEL__ = !0,
            e.exports = t
        },
        5912: function(e, t, n) {
            "use strict";
            var r = n(9945);
            function a(e) {
                if ("function" != typeof e)
                    throw new TypeError("executor must be a function.");
                var t;
                this.promise = new Promise(function(e) {
                    t = e
                }
                );
                var n = this;
                e(function(e) {
                    n.reason || (n.reason = new r(e),
                    t(n.reason))
                })
            }
            a.prototype.throwIfRequested = function() {
                if (this.reason)
                    throw this.reason
            }
            ,
            a.source = function() {
                var t;
                return {
                    token: new a(function(e) {
                        t = e
                    }
                    ),
                    cancel: t
                }
            }
            ,
            e.exports = a
        },
        6945: function(e) {
            "use strict";
            e.exports = function(e) {
                return !(!e || !e.__CANCEL__)
            }
        },
        9560: function(e, t, n) {
            "use strict";
            var a = n(292)
              , o = n(4345)
              , r = n(546)
              , i = n(1617);
            function s(e) {
                this.defaults = e,
                this.interceptors = {
                    request: new r,
                    response: new r
                }
            }
            s.prototype.request = function(e, t) {
                "string" == typeof e && (e = o.merge({
                    url: arguments[0]
                }, t)),
                (e = o.merge(a, {
                    method: "get"
                }, this.defaults, e)).method = e.method.toLowerCase();
                var n = [i, void 0]
                  , r = Promise.resolve(e);
                for (this.interceptors.request.forEach(function(e) {
                    n.unshift(e.fulfilled, e.rejected)
                }),
                this.interceptors.response.forEach(function(e) {
                    n.push(e.fulfilled, e.rejected)
                }); n.length; )
                    r = r.then(n.shift(), n.shift());
                return r
            }
            ,
            o.forEach(["delete", "get", "head", "options"], function(n) {
                s.prototype[n] = function(e, t) {
                    return this.request(o.merge(t || {}, {
                        method: n,
                        url: e
                    }))
                }
            }),
            o.forEach(["post", "put", "patch"], function(r) {
                s.prototype[r] = function(e, t, n) {
                    return this.request(o.merge(n || {}, {
                        method: r,
                        url: e,
                        data: t
                    }))
                }
            }),
            e.exports = s
        },
        546: function(e, t, n) {
            "use strict";
            var r = n(4345);
            function a() {
                this.handlers = []
            }
            a.prototype.use = function(e, t) {
                return this.handlers.push({
                    fulfilled: e,
                    rejected: t
                }),
                this.handlers.length - 1
            }
            ,
            a.prototype.eject = function(e) {
                this.handlers[e] && (this.handlers[e] = null)
            }
            ,
            a.prototype.forEach = function(t) {
                r.forEach(this.handlers, function(e) {
                    null !== e && t(e)
                })
            }
            ,
            e.exports = a
        },
        1792: function(e, t, n) {
            "use strict";
            var o = n(7148);
            e.exports = function(e, t, n, r, a) {
                e = new Error(e);
                return o(e, t, n, r, a)
            }
        },
        1617: function(e, t, n) {
            "use strict";
            var r = n(4345)
              , a = n(7638)
              , o = n(6945)
              , i = n(292)
              , s = n(4860)
              , u = n(7825);
            function c(e) {
                e.cancelToken && e.cancelToken.throwIfRequested()
            }
            e.exports = function(t) {
                return c(t),
                t.baseURL && !s(t.url) && (t.url = u(t.baseURL, t.url)),
                t.headers = t.headers || {},
                t.data = a(t.data, t.headers, t.transformRequest),
                t.headers = r.merge(t.headers.common || {}, t.headers[t.method] || {}, t.headers || {}),
                r.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function(e) {
                    delete t.headers[e]
                }),
                (t.adapter || i.adapter)(t).then(function(e) {
                    return c(t),
                    e.data = a(e.data, e.headers, t.transformResponse),
                    e
                }, function(e) {
                    return o(e) || (c(t),
                    e && e.response && (e.response.data = a(e.response.data, e.response.headers, t.transformResponse))),
                    Promise.reject(e)
                })
            }
        },
        7148: function(e) {
            "use strict";
            e.exports = function(e, t, n, r, a) {
                return e.config = t,
                n && (e.code = n),
                e.request = r,
                e.response = a,
                e
            }
        },
        6435: function(e, t, n) {
            "use strict";
            var a = n(1792);
            e.exports = function(e, t, n) {
                var r = n.config.validateStatus;
                n.status && r && !r(n.status) ? t(a("Request failed with status code " + n.status, n.config, null, n.request, n)) : e(n)
            }
        },
        7638: function(e, t, n) {
            "use strict";
            var r = n(4345);
            e.exports = function(t, n, e) {
                return r.forEach(e, function(e) {
                    t = e(t, n)
                }),
                t
            }
        },
        292: function(e, t, n) {
            "use strict";
            var r = n(4345)
              , a = n(2327)
              , o = {
                "Content-Type": "application/x-www-form-urlencoded"
            };
            function i(e, t) {
                !r.isUndefined(e) && r.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t)
            }
            var s, u = {
                adapter: ("undefined" == typeof XMLHttpRequest && "undefined" == typeof process || (s = n(8427)),
                s),
                transformRequest: [function(e, t) {
                    return a(t, "Content-Type"),
                    r.isFormData(e) || r.isArrayBuffer(e) || r.isBuffer(e) || r.isStream(e) || r.isFile(e) || r.isBlob(e) ? e : r.isArrayBufferView(e) ? e.buffer : r.isURLSearchParams(e) ? (i(t, "application/x-www-form-urlencoded;charset=utf-8"),
                    e.toString()) : r.isObject(e) ? (i(t, "application/json;charset=utf-8"),
                    JSON.stringify(e)) : e
                }
                ],
                transformResponse: [function(e) {
                    if ("string" == typeof e)
                        try {
                            e = JSON.parse(e)
                        } catch (e) {}
                    return e
                }
                ],
                timeout: 0,
                xsrfCookieName: "XSRF-TOKEN",
                xsrfHeaderName: "X-XSRF-TOKEN",
                maxContentLength: -1,
                validateStatus: function(e) {
                    return 200 <= e && e < 300
                },
                headers: {
                    common: {
                        Accept: "application/json, text/plain, */*"
                    }
                }
            };
            r.forEach(["delete", "get", "head"], function(e) {
                u.headers[e] = {}
            }),
            r.forEach(["post", "put", "patch"], function(e) {
                u.headers[e] = r.merge(o)
            }),
            e.exports = u
        },
        5063: function(e) {
            "use strict";
            e.exports = function(n, r) {
                return function() {
                    for (var e = new Array(arguments.length), t = 0; t < e.length; t++)
                        e[t] = arguments[t];
                    return n.apply(r, e)
                }
            }
        },
        3025: function(e, t, n) {
            "use strict";
            var a = n(4345);
            function o(e) {
                return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
            }
            e.exports = function(e, t, n) {
                if (!t)
                    return e;
                var r, t = n ? n(t) : a.isURLSearchParams(t) ? t.toString() : (r = [],
                a.forEach(t, function(e, t) {
                    null != e && (a.isArray(e) ? t += "[]" : e = [e],
                    a.forEach(e, function(e) {
                        a.isDate(e) ? e = e.toISOString() : a.isObject(e) && (e = JSON.stringify(e)),
                        r.push(o(t) + "=" + o(e))
                    }))
                }),
                r.join("&"));
                return t && (e += (-1 === e.indexOf("?") ? "?" : "&") + t),
                e
            }
        },
        7825: function(e) {
            "use strict";
            e.exports = function(e, t) {
                return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e
            }
        },
        5905: function(e, t, n) {
            "use strict";
            var s = n(4345);
            e.exports = s.isStandardBrowserEnv() ? {
                write: function(e, t, n, r, a, o) {
                    var i = [];
                    i.push(e + "=" + encodeURIComponent(t)),
                    s.isNumber(n) && i.push("expires=" + new Date(n).toGMTString()),
                    s.isString(r) && i.push("path=" + r),
                    s.isString(a) && i.push("domain=" + a),
                    !0 === o && i.push("secure"),
                    document.cookie = i.join("; ")
                },
                read: function(e) {
                    e = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
                    return e ? decodeURIComponent(e[3]) : null
                },
                remove: function(e) {
                    this.write(e, "", Date.now() - 864e5)
                }
            } : {
                write: function() {},
                read: function() {
                    return null
                },
                remove: function() {}
            }
        },
        4860: function(e) {
            "use strict";
            e.exports = function(e) {
                return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)
            }
        },
        6923: function(e, t, n) {
            "use strict";
            var r, a, o, i = n(4345);
            function s(e) {
                return a && (o.setAttribute("href", e),
                e = o.href),
                o.setAttribute("href", e),
                {
                    href: o.href,
                    protocol: o.protocol ? o.protocol.replace(/:$/, "") : "",
                    host: o.host,
                    search: o.search ? o.search.replace(/^\?/, "") : "",
                    hash: o.hash ? o.hash.replace(/^#/, "") : "",
                    hostname: o.hostname,
                    port: o.port,
                    pathname: "/" === o.pathname.charAt(0) ? o.pathname : "/" + o.pathname
                }
            }
            e.exports = i.isStandardBrowserEnv() ? (a = /(msie|trident)/i.test(navigator.userAgent),
            o = document.createElement("a"),
            r = s(window.location.href),
            function(e) {
                e = i.isString(e) ? s(e) : e;
                return e.protocol === r.protocol && e.host === r.host
            }
            ) : function() {
                return !0
            }
        },
        2327: function(e, t, n) {
            "use strict";
            var a = n(4345);
            e.exports = function(n, r) {
                a.forEach(n, function(e, t) {
                    t !== r && t.toUpperCase() === r.toUpperCase() && (n[r] = e,
                    delete n[t])
                })
            }
        },
        6135: function(e, t, n) {
            "use strict";
            var a = n(4345)
              , o = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];
            e.exports = function(e) {
                var t, n, r = {};
                return e && a.forEach(e.split("\n"), function(e) {
                    n = e.indexOf(":"),
                    t = a.trim(e.substr(0, n)).toLowerCase(),
                    n = a.trim(e.substr(n + 1)),
                    t && (r[t] && 0 <= o.indexOf(t) || (r[t] = "set-cookie" === t ? (r[t] || []).concat([n]) : r[t] ? r[t] + ", " + n : n))
                }),
                r
            }
        },
        8127: function(e) {
            "use strict";
            e.exports = function(t) {
                return function(e) {
                    return t.apply(null, e)
                }
            }
        },
        4345: function(e, t, n) {
            "use strict";
            var a = n(5063)
              , n = n(5703)
              , r = Object.prototype.toString;
            function o(e) {
                return "[object Array]" === r.call(e)
            }
            function i(e) {
                return null !== e && "object" == typeof e
            }
            function s(e) {
                return "[object Function]" === r.call(e)
            }
            function u(e, t) {
                if (null != e)
                    if ("object" != typeof e && (e = [e]),
                    o(e))
                        for (var n = 0, r = e.length; n < r; n++)
                            t.call(null, e[n], n, e);
                    else
                        for (var a in e)
                            Object.prototype.hasOwnProperty.call(e, a) && t.call(null, e[a], a, e)
            }
            e.exports = {
                isArray: o,
                isArrayBuffer: function(e) {
                    return "[object ArrayBuffer]" === r.call(e)
                },
                isBuffer: n,
                isFormData: function(e) {
                    return "undefined" != typeof FormData && e instanceof FormData
                },
                isArrayBufferView: function(e) {
                    return e = "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer
                },
                isString: function(e) {
                    return "string" == typeof e
                },
                isNumber: function(e) {
                    return "number" == typeof e
                },
                isObject: i,
                isUndefined: function(e) {
                    return void 0 === e
                },
                isDate: function(e) {
                    return "[object Date]" === r.call(e)
                },
                isFile: function(e) {
                    return "[object File]" === r.call(e)
                },
                isBlob: function(e) {
                    return "[object Blob]" === r.call(e)
                },
                isFunction: s,
                isStream: function(e) {
                    return i(e) && s(e.pipe)
                },
                isURLSearchParams: function(e) {
                    return "undefined" != typeof URLSearchParams && e instanceof URLSearchParams
                },
                isStandardBrowserEnv: function() {
                    return ("undefined" == typeof navigator || "ReactNative" !== navigator.product) && ("undefined" != typeof window && "undefined" != typeof document)
                },
                forEach: u,
                merge: function n() {
                    var r = {};
                    function e(e, t) {
                        "object" == typeof r[t] && "object" == typeof e ? r[t] = n(r[t], e) : r[t] = e
                    }
                    for (var t = 0, a = arguments.length; t < a; t++)
                        u(arguments[t], e);
                    return r
                },
                extend: function(n, e, r) {
                    return u(e, function(e, t) {
                        n[t] = r && "function" == typeof e ? a(e, r) : e
                    }),
                    n
                },
                trim: function(e) {
                    return e.replace(/^\s*/, "").replace(/\s*$/, "")
                }
            }
        },
        6022: function(e) {
            "use strict";
            function n(e) {
                return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                )(e)
            }
            var t = "%[a-f0-9]{2}"
              , a = new RegExp(t,"gi")
              , s = new RegExp("(" + t + ")+","gi");
            function u(t) {
                try {
                    return decodeURIComponent(t)
                } catch (e) {
                    for (var n = t.match(a), r = 1; r < n.length; r++)
                        n = (t = function e(t, n) {
                            try {
                                return decodeURIComponent(t.join(""))
                            } catch (e) {}
                            if (1 === t.length)
                                return t;
                            n = n || 1;
                            var r = t.slice(0, n)
                              , n = t.slice(n);
                            return Array.prototype.concat.call([], e(r), e(n))
                        }(n, r).join("")).match(a);
                    return t
                }
            }
            e.exports = function(t) {
                if ("string" != typeof t)
                    throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + n(t) + "`");
                try {
                    return t = t.replace(/\+/g, " "),
                    decodeURIComponent(t)
                } catch (e) {
                    return function(e) {
                        for (var t = {
                            "%FE%FF": "��",
                            "%FF%FE": "��"
                        }, n = s.exec(e); n; ) {
                            try {
                                t[n[0]] = decodeURIComponent(n[0])
                            } catch (e) {
                                var r = u(n[0]);
                                r !== n[0] && (t[n[0]] = r)
                            }
                            n = s.exec(e)
                        }
                        t["%C2"] = "�";
                        for (var a = Object.keys(t), o = 0; o < a.length; o++) {
                            var i = a[o];
                            e = e.replace(new RegExp(i,"g"), t[i])
                        }
                        return e
                    }(t)
                }
            }
        },
        4343: function(e, s, t) {
            "use strict";
            function p(e, t) {
                return function(e) {
                    if (Array.isArray(e))
                        return e
                }(e) || function(e, t) {
                    if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e)))
                        return;
                    var n = []
                      , r = !0
                      , a = !1
                      , o = void 0;
                    try {
                        for (var i, s = e[Symbol.iterator](); !(r = (i = s.next()).done) && (n.push(i.value),
                        !t || n.length !== t); r = !0)
                            ;
                    } catch (e) {
                        a = !0,
                        o = e
                    } finally {
                        try {
                            r || null == s.return || s.return()
                        } finally {
                            if (a)
                                throw o
                        }
                    }
                    return n
                }(e, t) || m(e, t) || function() {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }
            function f(e) {
                return (f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                )(e)
            }
            function c(e) {
                return function(e) {
                    if (Array.isArray(e))
                        return r(e)
                }(e) || function(e) {
                    if ("undefined" != typeof Symbol && Symbol.iterator in Object(e))
                        return Array.from(e)
                }(e) || m(e) || function() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }
            function m(e, t) {
                if (e) {
                    if ("string" == typeof e)
                        return r(e, t);
                    var n = Object.prototype.toString.call(e).slice(8, -1);
                    return "Object" === n && e.constructor && (n = e.constructor.name),
                    "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? r(e, t) : void 0
                }
            }
            function r(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var n = 0, r = new Array(t); n < t; n++)
                    r[n] = e[n];
                return r
            }
            var n = t(8904)
              , a = t(6022)
              , g = t(2368);
            function I(e) {
                if ("string" != typeof e || 1 !== e.length)
                    throw new TypeError("arrayFormatSeparator must be single character string")
            }
            function l(e, t) {
                return t.encode ? (t.strict ? n : encodeURIComponent)(e) : e
            }
            function y(e, t) {
                return t.decode ? a(e) : e
            }
            function u(e) {
                var t = e.indexOf("#");
                return -1 !== t && (e = e.slice(0, t)),
                e
            }
            function o(e) {
                var t = (e = u(e)).indexOf("?");
                return -1 === t ? "" : e.slice(t + 1)
            }
            function P(e, t) {
                return t.parseNumbers && !Number.isNaN(Number(e)) && "string" == typeof e && "" !== e.trim() ? e = Number(e) : !t.parseBooleans || null === e || "true" !== e.toLowerCase() && "false" !== e.toLowerCase() || (e = "true" === e.toLowerCase()),
                e
            }
            function i(e, t) {
                I((t = Object.assign({
                    decode: !0,
                    sort: !0,
                    arrayFormat: "none",
                    arrayFormatSeparator: ",",
                    parseNumbers: !1,
                    parseBooleans: !1
                }, t)).arrayFormatSeparator);
                var n = function(o) {
                    var r;
                    switch (o.arrayFormat) {
                    case "index":
                        return function(e, t, n) {
                            r = /\[(\d*)\]$/.exec(e),
                            e = e.replace(/\[\d*\]$/, ""),
                            r ? (void 0 === n[e] && (n[e] = {}),
                            n[e][r[1]] = t) : n[e] = t
                        }
                        ;
                    case "bracket":
                        return function(e, t, n) {
                            r = /(\[\])$/.exec(e),
                            e = e.replace(/\[\]$/, ""),
                            r ? void 0 !== n[e] ? n[e] = [].concat(n[e], t) : n[e] = [t] : n[e] = t
                        }
                        ;
                    case "comma":
                    case "separator":
                        return function(e, t, n) {
                            var r = "string" == typeof t && t.includes(o.arrayFormatSeparator)
                              , a = "string" == typeof t && !r && y(t, o).includes(o.arrayFormatSeparator);
                            t = a ? y(t, o) : t;
                            t = r || a ? t.split(o.arrayFormatSeparator).map(function(e) {
                                return y(e, o)
                            }) : null === t ? t : y(t, o);
                            n[e] = t
                        }
                        ;
                    default:
                        return function(e, t, n) {
                            void 0 !== n[e] ? n[e] = [].concat(n[e], t) : n[e] = t
                        }
                    }
                }(t)
                  , r = Object.create(null);
                if ("string" != typeof e)
                    return r;
                if (!(e = e.trim().replace(/^[?#&]/, "")))
                    return r;
                var a = function(e, t) {
                    var n;
                    if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {
                        if (Array.isArray(e) || (n = m(e)) || t && e && "number" == typeof e.length) {
                            n && (e = n);
                            var r = 0
                              , t = function() {};
                            return {
                                s: t,
                                n: function() {
                                    return r >= e.length ? {
                                        done: !0
                                    } : {
                                        done: !1,
                                        value: e[r++]
                                    }
                                },
                                e: function(e) {
                                    throw e
                                },
                                f: t
                            }
                        }
                        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                    }
                    var a, o = !0, i = !1;
                    return {
                        s: function() {
                            n = e[Symbol.iterator]()
                        },
                        n: function() {
                            var e = n.next();
                            return o = e.done,
                            e
                        },
                        e: function(e) {
                            i = !0,
                            a = e
                        },
                        f: function() {
                            try {
                                o || null == n.return || n.return()
                            } finally {
                                if (i)
                                    throw a
                            }
                        }
                    }
                }(e.split("&"));
                try {
                    for (a.s(); !(i = a.n()).done; ) {
                        var o = i.value
                          , i = p(g(t.decode ? o.replace(/\+/g, " ") : o, "="), 2)
                          , o = i[0]
                          , i = void 0 === (i = i[1]) ? null : ["comma", "separator"].includes(t.arrayFormat) ? i : y(i, t);
                        n(y(o, t), i, r)
                    }
                } catch (e) {
                    a.e(e)
                } finally {
                    a.f()
                }
                for (var s = 0, u = Object.keys(r); s < u.length; s++) {
                    var c = u[s]
                      , l = r[c];
                    if ("object" === f(l) && null !== l)
                        for (var d = 0, h = Object.keys(l); d < h.length; d++) {
                            var v = h[d];
                            l[v] = P(l[v], t)
                        }
                    else
                        r[c] = P(l, t)
                }
                return !1 === t.sort ? r : (!0 === t.sort ? Object.keys(r).sort() : Object.keys(r).sort(t.sort)).reduce(function(e, t) {
                    var n = r[t];
                    return Boolean(n) && "object" === f(n) && !Array.isArray(n) ? e[t] = function e(t) {
                        return Array.isArray(t) ? t.sort() : "object" === f(t) ? e(Object.keys(t)).sort(function(e, t) {
                            return Number(e) - Number(t)
                        }).map(function(e) {
                            return t[e]
                        }) : t
                    }(n) : e[t] = n,
                    e
                }, Object.create(null))
            }
            s.extract = o,
            s.parse = i,
            s.stringify = function(n, r) {
                if (!n)
                    return "";
                I((r = Object.assign({
                    encode: !0,
                    strict: !0,
                    arrayFormat: "none",
                    arrayFormatSeparator: ","
                }, r)).arrayFormatSeparator);
                for (var e, a = function(a) {
                    switch (a.arrayFormat) {
                    case "index":
                        return function(r) {
                            return function(e, t) {
                                var n = e.length;
                                return void 0 === t || a.skipNull && null === t || a.skipEmptyString && "" === t ? e : [].concat(c(e), null === t ? [[l(r, a), "[", n, "]"].join("")] : [[l(r, a), "[", l(n, a), "]=", l(t, a)].join("")])
                            }
                        }
                        ;
                    case "bracket":
                        return function(n) {
                            return function(e, t) {
                                return void 0 === t || a.skipNull && null === t || a.skipEmptyString && "" === t ? e : [].concat(c(e), null === t ? [[l(n, a), "[]"].join("")] : [[l(n, a), "[]=", l(t, a)].join("")])
                            }
                        }
                        ;
                    case "comma":
                    case "separator":
                        return function(n) {
                            return function(e, t) {
                                return null == t || 0 === t.length ? e : 0 === e.length ? [[l(n, a), "=", l(t, a)].join("")] : [[e, l(t, a)].join(a.arrayFormatSeparator)]
                            }
                        }
                        ;
                    default:
                        return function(n) {
                            return function(e, t) {
                                return void 0 === t || a.skipNull && null === t || a.skipEmptyString && "" === t ? e : [].concat(c(e), null === t ? [l(n, a)] : [[l(n, a), "=", l(t, a)].join("")])
                            }
                        }
                    }
                }(r), t = {}, o = 0, i = Object.keys(n); o < i.length; o++) {
                    var s = i[o];
                    e = s,
                    r.skipNull && null == n[e] || r.skipEmptyString && "" === n[e] || (t[s] = n[s])
                }
                var u = Object.keys(t);
                return !1 !== r.sort && u.sort(r.sort),
                u.map(function(e) {
                    var t = n[e];
                    return void 0 === t ? "" : null === t ? l(e, r) : Array.isArray(t) ? t.reduce(a(e), []).join("&") : l(e, r) + "=" + l(t, r)
                }).filter(function(e) {
                    return 0 < e.length
                }).join("&")
            }
            ,
            s.parseUrl = function(e, t) {
                t = Object.assign({
                    decode: !0
                }, t);
                var n = p(g(e, "#"), 2)
                  , r = n[0]
                  , n = n[1];
                return Object.assign({
                    url: r.split("?")[0] || "",
                    query: i(o(e), t)
                }, t && t.parseFragmentIdentifier && n ? {
                    fragmentIdentifier: y(n, t)
                } : {})
            }
            ,
            s.stringifyUrl = function(e, t) {
                t = Object.assign({
                    encode: !0,
                    strict: !0
                }, t);
                var n = u(e.url).split("?")[0] || ""
                  , r = s.extract(e.url)
                  , a = s.parse(r, {
                    sort: !1
                })
                  , o = Object.assign(a, e.query)
                  , i = (i = s.stringify(o, t)) && "?".concat(i)
                  , a = (r = e.url,
                a = "",
                -1 !== (o = r.indexOf("#")) && (a = r.slice(o)),
                a);
                return e.fragmentIdentifier && (a = "#".concat(l(e.fragmentIdentifier, t))),
                "".concat(n).concat(i).concat(a)
            }
        },
        2368: function(e) {
            "use strict";
            e.exports = function(e, t) {
                if ("string" != typeof e || "string" != typeof t)
                    throw new TypeError("Expected the arguments to be of type `string`");
                if ("" === t)
                    return [e];
                var n = e.indexOf(t);
                return -1 === n ? [e] : [e.slice(0, n), e.slice(n + t.length)]
            }
        },
        8904: function(e) {
            "use strict";
            e.exports = function(e) {
                return encodeURIComponent(e).replace(/[!'()*]/g, function(e) {
                    return "%".concat(e.charCodeAt(0).toString(16).toUpperCase())
                })
            }
        },
        5703: function(e) {
            /*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
            e.exports = function(e) {
                return null != e && null != e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
            }
        },
        9470: function(v, f, m) {
            var L;
            /*! https://mths.be/punycode v1.3.2 by @mathias */
            v = m.nmd(v),
            function() {
                f && f.nodeType,
                v && v.nodeType;
                var e = "object" == typeof m.g && m.g;
                e.global !== e && e.window !== e && e.self;
                var t, g = 2147483647, I = 36, y = 1, P = 26, a = 38, o = 700, G = 72, b = 128, w = "-", n = /^xn--/, r = /[^\x20-\x7E]/, i = /[\x2E\u3002\uFF0E\uFF61]/g, s = {
                    overflow: "Overflow: input needs wider integers to process",
                    "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                    "invalid-input": "Invalid input"
                }, u = I - y, C = Math.floor, T = String.fromCharCode;
                function A(e) {
                    throw RangeError(s[e])
                }
                function c(e, t) {
                    for (var n = e.length, r = []; n--; )
                        r[n] = t(e[n]);
                    return r
                }
                function l(e, t) {
                    var n = e.split("@")
                      , r = "";
                    return 1 < n.length && (r = n[0] + "@",
                    e = n[1]),
                    r + c((e = e.replace(i, ".")).split("."), t).join(".")
                }
                function E(e) {
                    for (var t, n, r = [], a = 0, o = e.length; a < o; )
                        55296 <= (t = e.charCodeAt(a++)) && t <= 56319 && a < o ? 56320 == (64512 & (n = e.charCodeAt(a++))) ? r.push(((1023 & t) << 10) + (1023 & n) + 65536) : (r.push(t),
                        a--) : r.push(t);
                    return r
                }
                function p(e) {
                    return c(e, function(e) {
                        var t = "";
                        return 65535 < e && (t += T((e -= 65536) >>> 10 & 1023 | 55296),
                        e = 56320 | 1023 & e),
                        t += T(e)
                    }).join("")
                }
                function S(e, t) {
                    return e + 22 + 75 * (e < 26) - ((0 != t) << 5)
                }
                function R(e, t, n) {
                    var r = 0;
                    for (e = n ? C(e / o) : e >> 1,
                    e += C(e / t); u * P >> 1 < e; r += I)
                        e = C(e / u);
                    return C(r + (u + 1) * e / (e + a))
                }
                function d(e) {
                    var t, n, r, a, o, i, s, u = [], c = e.length, l = 0, d = b, h = G, v = e.lastIndexOf(w);
                    for (v < 0 && (v = 0),
                    n = 0; n < v; ++n)
                        128 <= e.charCodeAt(n) && A("not-basic"),
                        u.push(e.charCodeAt(n));
                    for (r = 0 < v ? v + 1 : 0; r < c; ) {
                        for (a = l,
                        o = 1,
                        i = I; c <= r && A("invalid-input"),
                        s = e.charCodeAt(r++),
                        (I <= (s = s - 48 < 10 ? s - 22 : s - 65 < 26 ? s - 65 : s - 97 < 26 ? s - 97 : I) || s > C((g - l) / o)) && A("overflow"),
                        l += s * o,
                        !(s < (s = i <= h ? y : h + P <= i ? P : i - h)); i += I)
                            o > C(g / (s = I - s)) && A("overflow"),
                            o *= s;
                        h = R(l - a, t = u.length + 1, 0 == a),
                        C(l / t) > g - d && A("overflow"),
                        d += C(l / t),
                        l %= t,
                        u.splice(l++, 0, d)
                    }
                    return p(u)
                }
                function h(e) {
                    for (var t, n, r, a, o, i, s, u, c, l, d, h = [], v = (e = E(e)).length, p = b, f = G, m = t = 0; m < v; ++m)
                        (u = e[m]) < 128 && h.push(T(u));
                    for (n = r = h.length,
                    r && h.push(w); n < v; ) {
                        for (a = g,
                        m = 0; m < v; ++m)
                            p <= (u = e[m]) && u < a && (a = u);
                        for (a - p > C((g - t) / (c = n + 1)) && A("overflow"),
                        t += (a - p) * c,
                        p = a,
                        m = 0; m < v; ++m)
                            if ((u = e[m]) < p && ++t > g && A("overflow"),
                            u == p) {
                                for (o = t,
                                i = I; !(o < (s = i <= f ? y : f + P <= i ? P : i - f)); i += I)
                                    d = o - s,
                                    l = I - s,
                                    h.push(T(S(s + d % l, 0))),
                                    o = C(d / l);
                                h.push(T(S(o, 0))),
                                f = R(t, c, n == r),
                                t = 0,
                                ++n
                            }
                        ++t,
                        ++p
                    }
                    return h.join("")
                }
                t = {
                    version: "1.3.2",
                    ucs2: {
                        decode: E,
                        encode: p
                    },
                    decode: d,
                    encode: h,
                    toASCII: function(e) {
                        return l(e, function(e) {
                            return r.test(e) ? "xn--" + h(e) : e
                        })
                    },
                    toUnicode: function(e) {
                        return l(e, function(e) {
                            return n.test(e) ? d(e.slice(4).toLowerCase()) : e
                        })
                    }
                },
                void 0 === (L = function() {
                    return t
                }
                .call(f, m, f, v)) || (v.exports = L)
            }()
        },
        3457: function(e) {
            "use strict";
            e.exports = function(e, t, n, r) {
                t = t || "&",
                n = n || "=";
                var a = {};
                if ("string" != typeof e || 0 === e.length)
                    return a;
                var o = /\+/g;
                e = e.split(t);
                t = 1e3;
                r && "number" == typeof r.maxKeys && (t = r.maxKeys);
                var i = e.length;
                0 < t && t < i && (i = t);
                for (var s = 0; s < i; ++s) {
                    var u, c = e[s].replace(o, "%20"), l = c.indexOf(n), d = 0 <= l ? (u = c.substr(0, l),
                    c.substr(l + 1)) : (u = c,
                    ""), h = decodeURIComponent(u), l = decodeURIComponent(d);
                    c = a,
                    d = h,
                    Object.prototype.hasOwnProperty.call(c, d) ? Array.isArray(a[h]) ? a[h].push(l) : a[h] = [a[h], l] : a[h] = l
                }
                return a
            }
        },
        9737: function(e) {
            "use strict";
            function o(e) {
                switch (typeof e) {
                case "string":
                    return e;
                case "boolean":
                    return e ? "true" : "false";
                case "number":
                    return isFinite(e) ? e : "";
                default:
                    return ""
                }
            }
            e.exports = function(n, r, a, e) {
                return r = r || "&",
                a = a || "=",
                null === n && (n = void 0),
                "object" == typeof n ? Object.keys(n).map(function(e) {
                    var t = encodeURIComponent(o(e)) + a;
                    return Array.isArray(n[e]) ? n[e].map(function(e) {
                        return t + encodeURIComponent(o(e))
                    }).join(r) : t + encodeURIComponent(o(n[e]))
                }).join(r) : e ? encodeURIComponent(o(e)) + a + encodeURIComponent(o(n)) : ""
            }
        },
        3215: function(e, t, n) {
            "use strict";
            t.decode = t.parse = n(3457),
            t.encode = t.stringify = n(9737)
        },
        5442: function(e, t, n) {
            "use strict";
            var A = n(9470)
              , E = n(2539);
            function G() {
                this.protocol = null,
                this.slashes = null,
                this.auth = null,
                this.host = null,
                this.port = null,
                this.hostname = null,
                this.hash = null,
                this.search = null,
                this.query = null,
                this.pathname = null,
                this.path = null,
                this.href = null
            }
            t.qg = a,
            t.hd = function(e, t) {
                return a(e, !1, !0).resolve(t)
            }
            ,
            t.GP = function(e) {
                E.isString(e) && (e = a(e));
                return e instanceof G ? e.format() : G.prototype.format.call(e)
            }
            ;
            var S = /^([a-z0-9.+-]+:)/i
              , r = /:[0-9]*$/
              , R = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/
              , t = ["{", "}", "|", "\\", "^", "`"].concat(["<", ">", '"', "`", " ", "\r", "\n", "\t"])
              , L = ["'"].concat(t)
              , q = ["%", "/", "?", ";", "#"].concat(L)
              , U = ["/", "?", "#"]
              , O = /^[+a-z0-9A-Z_-]{0,63}$/
              , D = /^([+a-z0-9A-Z_-]{0,63})(.*)$/
              , _ = {
                javascript: !0,
                "javascript:": !0
            }
              , x = {
                javascript: !0,
                "javascript:": !0
            }
              , B = {
                http: !0,
                https: !0,
                ftp: !0,
                gopher: !0,
                file: !0,
                "http:": !0,
                "https:": !0,
                "ftp:": !0,
                "gopher:": !0,
                "file:": !0
            }
              , N = n(3215);
            function a(e, t, n) {
                if (e && E.isObject(e) && e instanceof G)
                    return e;
                var r = new G;
                return r.parse(e, t, n),
                r
            }
            G.prototype.parse = function(e, t, n) {
                if (!E.isString(e))
                    throw new TypeError("Parameter 'url' must be a string, not " + typeof e);
                var r = e.indexOf("?")
                  , a = -1 !== r && r < e.indexOf("#") ? "?" : "#"
                  , r = e.split(a);
                r[0] = r[0].replace(/\\/g, "/");
                var o = (o = e = r.join(a)).trim();
                if (!n && 1 === e.split("#").length) {
                    var i = R.exec(o);
                    if (i)
                        return this.path = o,
                        this.href = o,
                        this.pathname = i[1],
                        i[2] ? (this.search = i[2],
                        this.query = t ? N.parse(this.search.substr(1)) : this.search.substr(1)) : t && (this.search = "",
                        this.query = {}),
                        this
                }
                var s, i = S.exec(o);
                if (i && (T = (i = i[0]).toLowerCase(),
                this.protocol = T,
                o = o.substr(i.length)),
                (n || i || o.match(/^\/\/[^@\/]+@[^@\/]+/)) && (!(s = "//" === o.substr(0, 2)) || i && x[i] || (o = o.substr(2),
                this.slashes = !0)),
                !x[i] && (s || i && !B[i])) {
                    for (var u = -1, c = 0; c < U.length; c++)
                        -1 !== (l = o.indexOf(U[c])) && (-1 === u || l < u) && (u = l);
                    -1 !== (G = -1 === u ? o.lastIndexOf("@") : o.lastIndexOf("@", u)) && (b = o.slice(0, G),
                    o = o.slice(G + 1),
                    this.auth = decodeURIComponent(b)),
                    u = -1;
                    for (var l, c = 0; c < q.length; c++)
                        -1 !== (l = o.indexOf(q[c])) && (-1 === u || l < u) && (u = l);
                    -1 === u && (u = o.length),
                    this.host = o.slice(0, u),
                    o = o.slice(u),
                    this.parseHost(),
                    this.hostname = this.hostname || "";
                    var d = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
                    if (!d)
                        for (var h = this.hostname.split(/\./), c = 0, v = h.length; c < v; c++) {
                            var p = h[c];
                            if (p && !p.match(O)) {
                                for (var f = "", m = 0, g = p.length; m < g; m++)
                                    127 < p.charCodeAt(m) ? f += "x" : f += p[m];
                                if (!f.match(O)) {
                                    var I = h.slice(0, c)
                                      , y = h.slice(c + 1)
                                      , P = p.match(D);
                                    P && (I.push(P[1]),
                                    y.unshift(P[2])),
                                    y.length && (o = "/" + y.join(".") + o),
                                    this.hostname = I.join(".");
                                    break
                                }
                            }
                        }
                    255 < this.hostname.length ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(),
                    d || (this.hostname = A.toASCII(this.hostname));
                    var G = this.port ? ":" + this.port : ""
                      , b = this.hostname || "";
                    this.host = b + G,
                    this.href += this.host,
                    d && (this.hostname = this.hostname.substr(1, this.hostname.length - 2),
                    "/" !== o[0] && (o = "/" + o))
                }
                if (!_[T])
                    for (c = 0,
                    v = L.length; c < v; c++) {
                        var w, C = L[c];
                        -1 !== o.indexOf(C) && ((w = encodeURIComponent(C)) === C && (w = escape(C)),
                        o = o.split(C).join(w))
                    }
                d = o.indexOf("#");
                -1 !== d && (this.hash = o.substr(d),
                o = o.slice(0, d));
                var T, d = o.indexOf("?");
                return -1 !== d ? (this.search = o.substr(d),
                this.query = o.substr(d + 1),
                t && (this.query = N.parse(this.query)),
                o = o.slice(0, d)) : t && (this.search = "",
                this.query = {}),
                o && (this.pathname = o),
                B[T] && this.hostname && !this.pathname && (this.pathname = "/"),
                (this.pathname || this.search) && (G = this.pathname || "",
                T = this.search || "",
                this.path = G + T),
                this.href = this.format(),
                this
            }
            ,
            G.prototype.format = function() {
                var e = this.auth || "";
                e && (e = (e = encodeURIComponent(e)).replace(/%3A/i, ":"),
                e += "@");
                var t = this.protocol || ""
                  , n = this.pathname || ""
                  , r = this.hash || ""
                  , a = !1
                  , o = "";
                this.host ? a = e + this.host : this.hostname && (a = e + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"),
                this.port && (a += ":" + this.port)),
                this.query && E.isObject(this.query) && Object.keys(this.query).length && (o = N.stringify(this.query));
                o = this.search || o && "?" + o || "";
                return t && ":" !== t.substr(-1) && (t += ":"),
                this.slashes || (!t || B[t]) && !1 !== a ? (a = "//" + (a || ""),
                n && "/" !== n.charAt(0) && (n = "/" + n)) : a = a || "",
                r && "#" !== r.charAt(0) && (r = "#" + r),
                o && "?" !== o.charAt(0) && (o = "?" + o),
                t + a + (n = n.replace(/[?#]/g, function(e) {
                    return encodeURIComponent(e)
                })) + (o = o.replace("#", "%23")) + r
            }
            ,
            G.prototype.resolve = function(e) {
                return this.resolveObject(a(e, !1, !0)).format()
            }
            ,
            G.prototype.resolveObject = function(e) {
                E.isString(e) && ((v = new G).parse(e, !1, !0),
                e = v);
                for (var t = new G, n = Object.keys(this), r = 0; r < n.length; r++) {
                    var a = n[r];
                    t[a] = this[a]
                }
                if (t.hash = e.hash,
                "" === e.href)
                    return t.href = t.format(),
                    t;
                if (e.slashes && !e.protocol) {
                    for (var o = Object.keys(e), i = 0; i < o.length; i++) {
                        var s = o[i];
                        "protocol" !== s && (t[s] = e[s])
                    }
                    return B[t.protocol] && t.hostname && !t.pathname && (t.path = t.pathname = "/"),
                    t.href = t.format(),
                    t
                }
                if (e.protocol && e.protocol !== t.protocol) {
                    if (!B[e.protocol]) {
                        for (var u = Object.keys(e), c = 0; c < u.length; c++) {
                            var l = u[c];
                            t[l] = e[l]
                        }
                        return t.href = t.format(),
                        t
                    }
                    if (t.protocol = e.protocol,
                    e.host || x[e.protocol])
                        t.pathname = e.pathname;
                    else {
                        for (var d = (e.pathname || "").split("/"); d.length && !(e.host = d.shift()); )
                            ;
                        e.host || (e.host = ""),
                        e.hostname || (e.hostname = ""),
                        "" !== d[0] && d.unshift(""),
                        d.length < 2 && d.unshift(""),
                        t.pathname = d.join("/")
                    }
                    return t.search = e.search,
                    t.query = e.query,
                    t.host = e.host || "",
                    t.auth = e.auth,
                    t.hostname = e.hostname || e.host,
                    t.port = e.port,
                    (t.pathname || t.search) && (p = t.pathname || "",
                    f = t.search || "",
                    t.path = p + f),
                    t.slashes = t.slashes || e.slashes,
                    t.href = t.format(),
                    t
                }
                var h = t.pathname && "/" === t.pathname.charAt(0)
                  , v = e.host || e.pathname && "/" === e.pathname.charAt(0)
                  , p = v || h || t.host && e.pathname
                  , f = p
                  , m = t.pathname && t.pathname.split("/") || []
                  , d = e.pathname && e.pathname.split("/") || []
                  , h = t.protocol && !B[t.protocol];
                if (h && (t.hostname = "",
                t.port = null,
                t.host && ("" === m[0] ? m[0] = t.host : m.unshift(t.host)),
                t.host = "",
                e.protocol && (e.hostname = null,
                e.port = null,
                e.host && ("" === d[0] ? d[0] = e.host : d.unshift(e.host)),
                e.host = null),
                p = p && ("" === d[0] || "" === m[0])),
                v)
                    t.host = (e.host || "" === e.host ? e : t).host,
                    t.hostname = (e.hostname || "" === e.hostname ? e : t).hostname,
                    t.search = e.search,
                    t.query = e.query,
                    m = d;
                else if (d.length)
                    (m = m || []).pop(),
                    m = m.concat(d),
                    t.search = e.search,
                    t.query = e.query;
                else if (!E.isNullOrUndefined(e.search))
                    return h && (t.hostname = t.host = m.shift(),
                    (P = !!(t.host && 0 < t.host.indexOf("@")) && t.host.split("@")) && (t.auth = P.shift(),
                    t.host = t.hostname = P.shift())),
                    t.search = e.search,
                    t.query = e.query,
                    E.isNull(t.pathname) && E.isNull(t.search) || (t.path = (t.pathname || "") + (t.search || "")),
                    t.href = t.format(),
                    t;
                if (!m.length)
                    return t.pathname = null,
                    t.search ? t.path = "/" + t.search : t.path = null,
                    t.href = t.format(),
                    t;
                for (var g = m.slice(-1)[0], v = (t.host || e.host || 1 < m.length) && ("." === g || ".." === g) || "" === g, I = 0, y = m.length; 0 <= y; y--)
                    "." === (g = m[y]) ? m.splice(y, 1) : ".." === g ? (m.splice(y, 1),
                    I++) : I && (m.splice(y, 1),
                    I--);
                if (!p && !f)
                    for (; I--; )
                        m.unshift("..");
                !p || "" === m[0] || m[0] && "/" === m[0].charAt(0) || m.unshift(""),
                v && "/" !== m.join("/").substr(-1) && m.push("");
                var P, v = "" === m[0] || m[0] && "/" === m[0].charAt(0);
                return h && (t.hostname = t.host = !v && m.length ? m.shift() : "",
                (P = !!(t.host && 0 < t.host.indexOf("@")) && t.host.split("@")) && (t.auth = P.shift(),
                t.host = t.hostname = P.shift())),
                (p = p || t.host && m.length) && !v && m.unshift(""),
                m.length ? t.pathname = m.join("/") : (t.pathname = null,
                t.path = null),
                E.isNull(t.pathname) && E.isNull(t.search) || (t.path = (t.pathname || "") + (t.search || "")),
                t.auth = e.auth || t.auth,
                t.slashes = t.slashes || e.slashes,
                t.href = t.format(),
                t
            }
            ,
            G.prototype.parseHost = function() {
                var e = this.host
                  , t = r.exec(e);
                t && (":" !== (t = t[0]) && (this.port = t.substr(1)),
                e = e.substr(0, e.length - t.length)),
                e && (this.hostname = e)
            }
        },
        2539: function(e) {
            "use strict";
            e.exports = {
                isString: function(e) {
                    return "string" == typeof e
                },
                isObject: function(e) {
                    return "object" == typeof e && null !== e
                },
                isNull: function(e) {
                    return null === e
                },
                isNullOrUndefined: function(e) {
                    return null == e
                }
            }
        }
    }
      , r = {};
    function $l(e) {
        var t = r[e];
        if (void 0 !== t)
            return t.exports;
        t = r[e] = {
            id: e,
            loaded: !1,
            exports: {}
        };
        return n[e].call(t.exports, t, t.exports, $l),
        t.loaded = !0,
        t.exports
    }
    $l.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return $l.d(t, {
            a: t
        }),
        t
    }
    ,
    $l.d = function(e, t) {
        for (var n in t)
            $l.o(t, n) && !$l.o(e, n) && Object.defineProperty(e, n, {
                enumerable: !0,
                get: t[n]
            })
    }
    ,
    $l.g = function() {
        if ("object" == typeof globalThis)
            return globalThis;
        try {
            return this || new Function("return this")()
        } catch (e) {
            if ("object" == typeof window)
                return window
        }
    }(),
    $l.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    $l.nmd = function(e) {
        return e.paths = [],
        e.children || (e.children = []),
        e
    }
    ,
    function() {
        "use strict";
        function n(t, n, i) {
            return e(void 0, void 0, Promise, function() {
                return l(this, function(e) {
                    try {
                        return [2, new Promise(function(a, o) {
                            u = t,
                            c = n;
                            var e = indexedDB.open(u, 1);
                            e.onsuccess = function(t) {
                                var e, n, r = t.target.result;
                                r.objectStoreNames.contains(c) ? ((n = (e = r.transaction(c, "readwrite")).objectStore(c).delete(i)).onsuccess = function() {
                                    r.close(),
                                    a()
                                }
                                ,
                                n.onerror = function(e) {
                                    o(t.target.error)
                                }
                                ,
                                e.oncomplete = function(e) {
                                    r.close()
                                }
                                ) : (r.close(),
                                a())
                            }
                            ,
                            e.onerror = function(e) {
                                o(e.target.error)
                            }
                        }
                        )]
                    } catch (e) {
                        return console.warn("delete crypto record error: ", e),
                        [2, {}]
                    }
                    return [2]
                })
            })
        }
        function s() {
            return e(void 0, void 0, Promise, function() {
                var n;
                return l(this, function(e) {
                    try {
                        return n = indexedDB.deleteDatabase(u),
                        [2, new Promise(function(e, t) {
                            n.onerror = function() {
                                return t(n.error)
                            }
                            ,
                            n.onsuccess = function() {
                                return e()
                            }
                        }
                        )]
                    } catch (e) {
                        return console.warn("delete crypto db error: ", e),
                        [2, {}]
                    }
                    return [2]
                })
            })
        }
        function r(e) {
            if (window.TextEncoder)
                return (new TextEncoder).encode(e);
            for (var t = decodeURIComponent(encodeURIComponent(e)), n = new Uint8Array(t.length), r = 0; r < t.length; r++)
                n[r] = t.charCodeAt(r);
            return n
        }
        function a(e) {
            var t = "roblox.com"
              , n = "robloxlabs.com"
              , r = e || (null === (r = window.location) || void 0 === r ? void 0 : r.hostname);
            return -1 < r.indexOf(t) || -1 < r.indexOf(n)
        }
        var u, c, e = function(e, i, s, u) {
            return new (s = s || Promise)(function(n, t) {
                function r(e) {
                    try {
                        o(u.next(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function a(e) {
                    try {
                        o(u.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function o(e) {
                    var t;
                    e.done ? n(e.value) : ((t = e.value)instanceof s ? t : new s(function(e) {
                        e(t)
                    }
                    )).then(r, a)
                }
                o((u = u.apply(e, i || [])).next())
            }
            )
        }, l = function(n, r) {
            var a, o, i, s = {
                label: 0,
                sent: function() {
                    if (1 & i[0])
                        throw i[1];
                    return i[1]
                },
                trys: [],
                ops: []
            }, e = {
                next: t(0),
                throw: t(1),
                return: t(2)
            };
            return "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                return this
            }
            ),
            e;
            function t(t) {
                return function(e) {
                    return function(t) {
                        if (a)
                            throw new TypeError("Generator is already executing.");
                        for (; s; )
                            try {
                                if (a = 1,
                                o && (i = 2 & t[0] ? o.return : t[0] ? o.throw || ((i = o.return) && i.call(o),
                                0) : o.next) && !(i = i.call(o, t[1])).done)
                                    return i;
                                switch (o = 0,
                                i && (t = [2 & t[0], i.value]),
                                t[0]) {
                                case 0:
                                case 1:
                                    i = t;
                                    break;
                                case 4:
                                    return s.label++,
                                    {
                                        value: t[1],
                                        done: !1
                                    };
                                case 5:
                                    s.label++,
                                    o = t[1],
                                    t = [0];
                                    continue;
                                case 7:
                                    t = s.ops.pop(),
                                    s.trys.pop();
                                    continue;
                                default:
                                    if (!(i = 0 < (i = s.trys).length && i[i.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                        s = 0;
                                        continue
                                    }
                                    if (3 === t[0] && (!i || t[1] > i[0] && t[1] < i[3])) {
                                        s.label = t[1];
                                        break
                                    }
                                    if (6 === t[0] && s.label < i[1]) {
                                        s.label = i[1],
                                        i = t;
                                        break
                                    }
                                    if (i && s.label < i[2]) {
                                        s.label = i[2],
                                        s.ops.push(t);
                                        break
                                    }
                                    i[2] && s.ops.pop(),
                                    s.trys.pop();
                                    continue
                                }
                                t = r.call(n, s)
                            } catch (e) {
                                t = [6, e],
                                o = 0
                            } finally {
                                a = i = 0
                            }
                        if (5 & t[0])
                            throw t[1];
                        return {
                            value: t[0] ? t[1] : void 0,
                            done: !0
                        }
                    }([t, e])
                }
            }
        }, d = function(t, r, i) {
            return e(void 0, void 0, Promise, function() {
                return l(this, function(e) {
                    try {
                        return [2, new Promise(function(a, o) {
                            u = t,
                            c = r;
                            var n = indexedDB.open(u, 1);
                            n.onsuccess = function(t) {
                                var n = t.target.result;
                                try {
                                    var e = n.transaction(c, "readonly")
                                      , r = e.objectStore(c).get(i);
                                    r.onsuccess = function(e) {
                                        e = e.target.result;
                                        a(e)
                                    }
                                    ,
                                    r.onerror = function(e) {
                                        o(t.target.error)
                                    }
                                    ,
                                    e.oncomplete = function(e) {
                                        n.close()
                                    }
                                } catch (e) {
                                    o(e)
                                }
                            }
                            ,
                            n.onerror = function(e) {
                                o(e.target.error)
                            }
                            ,
                            n.onupgradeneeded = function(e) {
                                var t = n.result;
                                t.objectStoreNames.contains(c) || t.createObjectStore(c)
                            }
                        }
                        )]
                    } catch (e) {
                        return console.warn("get value from indexedDB error: ", e),
                        [2, {}]
                    }
                    return [2]
                })
            })
        }, h = function(t, n, a, o) {
            return e(void 0, void 0, Promise, function() {
                var r;
                return l(this, function(e) {
                    try {
                        return u = t,
                        c = n,
                        r = indexedDB.open(u, 1),
                        [2, new Promise(function(t, n) {
                            r.onerror = function(e) {
                                console.error("indexeddb request error"),
                                n()
                            }
                            ,
                            r.onupgradeneeded = function(e) {
                                var t = r.result;
                                t.objectStoreNames.contains(c) || t.createObjectStore(c)
                            }
                            ,
                            r.onsuccess = function(e) {
                                try {
                                    e.target.result.transaction(c, "readwrite").objectStore(c).put(o, a).onsuccess = function() {
                                        t()
                                    }
                                } catch (e) {
                                    console.error("indexeddb transaction error"),
                                    n()
                                }
                            }
                        }
                        )]
                    } catch (e) {
                        console.warn("updating indexedDB error: ", e)
                    }
                    return [2]
                })
            })
        }, t = {
            getCryptoKeyPair: d,
            putCryptoKeyPair: h,
            deleteCryptoDB: s,
            deleteCryptoKeyPair: n
        }, o = function(e, i, s, u) {
            return new (s = s || Promise)(function(n, t) {
                function r(e) {
                    try {
                        o(u.next(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function a(e) {
                    try {
                        o(u.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function o(e) {
                    var t;
                    e.done ? n(e.value) : ((t = e.value)instanceof s ? t : new s(function(e) {
                        e(t)
                    }
                    )).then(r, a)
                }
                o((u = u.apply(e, i || [])).next())
            }
            )
        }, i = function(n, r) {
            var a, o, i, s = {
                label: 0,
                sent: function() {
                    if (1 & i[0])
                        throw i[1];
                    return i[1]
                },
                trys: [],
                ops: []
            }, e = {
                next: t(0),
                throw: t(1),
                return: t(2)
            };
            return "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                return this
            }
            ),
            e;
            function t(t) {
                return function(e) {
                    return function(t) {
                        if (a)
                            throw new TypeError("Generator is already executing.");
                        for (; s; )
                            try {
                                if (a = 1,
                                o && (i = 2 & t[0] ? o.return : t[0] ? o.throw || ((i = o.return) && i.call(o),
                                0) : o.next) && !(i = i.call(o, t[1])).done)
                                    return i;
                                switch (o = 0,
                                i && (t = [2 & t[0], i.value]),
                                t[0]) {
                                case 0:
                                case 1:
                                    i = t;
                                    break;
                                case 4:
                                    return s.label++,
                                    {
                                        value: t[1],
                                        done: !1
                                    };
                                case 5:
                                    s.label++,
                                    o = t[1],
                                    t = [0];
                                    continue;
                                case 7:
                                    t = s.ops.pop(),
                                    s.trys.pop();
                                    continue;
                                default:
                                    if (!(i = 0 < (i = s.trys).length && i[i.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                        s = 0;
                                        continue
                                    }
                                    if (3 === t[0] && (!i || t[1] > i[0] && t[1] < i[3])) {
                                        s.label = t[1];
                                        break
                                    }
                                    if (6 === t[0] && s.label < i[1]) {
                                        s.label = i[1],
                                        i = t;
                                        break
                                    }
                                    if (i && s.label < i[2]) {
                                        s.label = i[2],
                                        s.ops.push(t);
                                        break
                                    }
                                    i[2] && s.ops.pop(),
                                    s.trys.pop();
                                    continue
                                }
                                t = r.call(n, s)
                            } catch (e) {
                                t = [6, e],
                                o = 0
                            } finally {
                                a = i = 0
                            }
                        if (5 & t[0])
                            throw t[1];
                        return {
                            value: t[0] ? t[1] : void 0,
                            done: !0
                        }
                    }([t, e])
                }
            }
        }, v = (fe = (Ln = function() {
            var e = document.querySelector('meta[name="hardware-backed-authentication-data"]')
              , e = (null == e ? void 0 : e.dataset) || {};
            return {
                isBoundAuthTokenEnabled: "true" === e.isBoundAuthTokenEnabled,
                boundAuthTokenWhitelist: e.boundAuthTokenWhitelist || "",
                boundAuthTokenExemptlist: e.boundAuthTokenExemptlist || "",
                hbaIndexedDBName: e.hbaIndexedDbName || "",
                hbaIndexedDBObjStoreName: e.hbaIndexedDbObjStoreName || "",
                hbaIndexedDBKeyName: e.hbaIndexedDbKeyName || "",
                hbaIndexedDBVersion: parseInt(e.hbaIndexedDbVersion, 10) || 1,
                batEventSampleRate: parseInt(e.batEventSampleRate, 10) || 0,
                isSecureAuthenticationIntentEnabled: "true" === e.isSecureAuthenticationIntentEnabled
            }
        }
        )()).hbaIndexedDBName, p = fe.hbaIndexedDBObjStoreName, f = function(t) {
            return o(void 0, void 0, Promise, function() {
                return i(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return v && p ? [4, n(v, p, t)] : [3, 2];
                    case 1:
                        e.sent(),
                        e.label = 2;
                    case 2:
                        return [2]
                    }
                })
            })
        }, m = Roblox, g = $l.n(m), I = $l(6660), y = $l.n(I), P = RobloxTracer, G = (ae = document.querySelector('meta[name="request-duplication-meta-data"]'),
        ie = parseFloat(null == ae || null === (ie = ae.dataset) || void 0 === ie ? void 0 : ie.duplicationRatio),
        ie = Number.isNaN(ie) ? 0 : ie,
        {
            duplicationEnabled: "true" === (null == ae || null === (re = ae.dataset) || void 0 === re ? void 0 : re.duplicationEnabled),
            apiSitesAllowList: null !== (oe = null == ae || null === (oe = ae.dataset) || void 0 === oe ? void 0 : oe.apiSitesAllowList) && void 0 !== oe ? oe : "",
            duplicationRatio: ie
        }), b = G.apiSitesAllowList.split(","), w = function(e, t) {
            return G.duplicationEnabled && !t && (n = e,
            !(!a() || !a(n)) && (0 < b.length && b.some(function(e) {
                return 0 < e.length && n.includes(e)
            })));
            var n
        }, C = function() {
            var e = G.duplicationRatio;
            if (e <= 0)
                return 0;
            var t = Math.floor(e)
              , e = e - t
              , t = t;
            return 0 < e && Math.random() < e && (t += 1),
            t
        }, T = {
            retryAttemptHeaderEnabled: "True" === (null == (se = document.querySelector('meta[name="page-retry-header-enabled"]')) || null === (pe = se.dataset) || void 0 === pe ? void 0 : pe.retryAttemptHeaderEnabled)
        }, A = function() {
            return T.retryAttemptHeaderEnabled
        };
        (Hr = He = He || {}).GET = "get",
        Hr.HEAD = "head",
        Hr.POST = "post",
        Hr.PUT = "put",
        Hr.DELETE = "delete",
        Hr.OPTIONS = "options",
        Hr.PATCH = "patch";
        var E = Object.freeze(He);
        (Zr = bn = bn || {})[Zr.ok = 200] = "ok",
        Zr[Zr.accepted = 202] = "accepted",
        Zr[Zr.movedPermanently = 301] = "movedPermanently",
        Zr[Zr.badRequest = 400] = "badRequest",
        Zr[Zr.unauthorized = 401] = "unauthorized",
        Zr[Zr.forbidden = 403] = "forbidden",
        Zr[Zr.notFound = 404] = "notFound",
        Zr[Zr.methodNotAllowed = 405] = "methodNotAllowed",
        Zr[Zr.conflict = 409] = "conflict",
        Zr[Zr.payloadTooLarge = 413] = "payloadTooLarge",
        Zr[Zr.tooManyAttempts = 429] = "tooManyAttempts",
        Zr[Zr.serverError = 500] = "serverError",
        Zr[Zr.serviceUnavailable = 503] = "serviceUnavailable";
        var S = Object.freeze(bn)
          , R = function() {
            return (R = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        }
          , L = "x-csrf-token"
          , q = S.forbidden
          , U = "Generic Challenge:"
          , O = "rblx-challenge-id"
          , D = "rblx-challenge-type"
          , _ = "rblx-challenge-metadata"
          , x = "x-retry-attempt"
          , B = m.XsrfToken.getToken();
        y().interceptors.request.use(function(e) {
            var t, n, r = e.method, a = e.noCache, o = e.noPragma, i = e.headers, s = e.url, u = R({}, e);
            if (r !== E.POST && r !== E.PATCH && r !== E.DELETE || (B = B || m.XsrfToken.getToken(),
            a && (u.headers = R({
                "Cache-Control": "no-cache, no-store, must-revalidate",
                Pragma: "no-cache",
                Expires: 0
            }, i)),
            o && u.headers.Pragma && delete u.headers.Pragma,
            u.headers[L] = B),
            m.Endpoints && m.Endpoints.supportLocalizedUrls && m.Endpoints.getAcceptLanguageValue && ((t = m.Endpoints.getAcceptLanguageValue(s)) && (u.headers["Accept-Language"] = t)),
            P.isTracerEnabled && P.apiSiteRequestValidator.isApiSiteAvailableForTracing(s) && (t = {
                tags: {
                    isDuplicate: (null === (t = e.isDuplicate) || void 0 === t ? void 0 : t.toString()) || "false"
                }
            },
            t = P.instrumentation.createAndGetSpan(P.tracerConstants.operationNames.httpRequest, t),
            P.tags.setXHRRequestTags(t, {
                component: "axios",
                method: r,
                url: s
            }),
            P.logs.setXHRRequestLogs(t),
            n = P.inject.httpRequestCarrier(t),
            Object.keys(n).forEach(function(e) {
                u.headers[e] = n[e]
            }),
            u.tracerConfig = {
                requestSpan: t
            }),
            w(s, e.isDuplicate)) {
                var c = R({}, e);
                c.isDuplicate = !0;
                for (var l = C(), d = 0; d < l; d++)
                    y().request(c).catch(function(e) {
                        console.log("~~~~ duplicated request failed ~~~~ " + e)
                    })
            }
            return u
        }, null),
        y().interceptors.response.use(function(e) {
            var t = e.status
              , n = e.config
              , r = n.url
              , n = n.tracerConfig;
            return n && P.apiSiteRequestValidator.isApiSiteAvailableForTracing(r) && (n = n.requestSpan,
            P.tags.setXHRResponseTags(n, {
                status: t
            }),
            P.logs.setXHRResponseSuccessLogs(n),
            P.instrumentation.finalizeSpan(n)),
            e
        }, function(e) {
            var t = e.config
              , n = e.response;
            if (n) {
                var r = n.status
                  , a = n.headers
                  , o = n.config
                  , i = a[L];
                if (r === q && i)
                    return o.headers[L] = i,
                    B = i,
                    m.XsrfToken.setToken(i),
                    y().request(o);
                A() && (i = 1,
                o.headers[x] && (i = Number(o.headers[x]) + 1),
                o.headers[x] = String(i)),
                null != o && o.tracerConfig && P.apiSiteRequestValidator.isApiSiteAvailableForTracing(o.url) && (u = o.tracerConfig.requestSpan,
                P.tags.setXHRResponseErrorTags(u, {
                    status: r
                }),
                P.logs.setXHRResponseErrorLogs(u),
                P.instrumentation.finalizeSpan(u));
                var r = a["rblx-challenge-id"]
                  , s = a["rblx-challenge-type"]
                  , u = a["rblx-challenge-metadata"]
                  , a = void 0 !== r || void 0 !== s || void 0 !== u;
                if (void 0 !== r && void 0 !== s && void 0 !== u) {
                    if (g() && g().AccountIntegrityChallengeService)
                        return g().AccountIntegrityChallengeService.Generic.interceptChallenge({
                            retryRequest: function(e, t) {
                                return o.headers[O] = e,
                                o.headers[D] = s,
                                o.headers[_] = t,
                                y().request(o)
                            },
                            containerId: "generic-challenge-container",
                            challengeId: r,
                            challengeTypeRaw: s,
                            challengeMetadataJsonBase64: u
                        });
                    console.error(U, "Got challenge but challenge component not available")
                } else
                    a && console.error(U, "Got only partial challenge headers")
            }
            return null != t && t.fullError || y().isCancel(e) ? Promise.reject(e) : Promise.reject(n)
        });
        var N = y();
        function F(n) {
            return function(e, t) {
                return n.chain(e, function(e) {
                    return n.map(t(e), function() {
                        return e
                    })
                })
            }
        }
        var k = function(e, t, n) {
            if (n || 2 === arguments.length)
                for (var r, a = 0, o = t.length; a < o; a++)
                    !r && a in t || ((r = r || Array.prototype.slice.call(t, 0, a))[a] = t[a]);
            return e.concat(r || Array.prototype.slice.call(t))
        };
        function M(e) {
            return e
        }
        function j(e, t, n, r, a, o, i, s, u) {
            switch (arguments.length) {
            case 1:
                return e;
            case 2:
                return t(e);
            case 3:
                return n(t(e));
            case 4:
                return r(n(t(e)));
            case 5:
                return a(r(n(t(e))));
            case 6:
                return o(a(r(n(t(e)))));
            case 7:
                return i(o(a(r(n(t(e))))));
            case 8:
                return s(i(o(a(r(n(t(e)))))));
            case 9:
                return u(s(i(o(a(r(n(t(e))))))));
            default:
                for (var c = e, l = 1; l < arguments.length; l++)
                    c = arguments[l](c);
                return c
            }
        }
        var z = function(t, n) {
            var e = "number" == typeof t ? function(e) {
                return e.length >= t
            }
            : t;
            return function() {
                var t = Array.from(arguments);
                return e(arguments) ? n.apply(this, t) : function(e) {
                    return n.apply(void 0, k([e], t, !1))
                }
            }
        };
        function V(n) {
            return function(e, t) {
                return n.map(e, function() {
                    return t
                })
            }
        }
        function H(e) {
            return {
                _tag: "Left",
                left: e
            }
        }
        function W(e) {
            return {
                _tag: "Right",
                right: e
            }
        }
        var K, X = [], J = {}, Q = (Object.prototype.hasOwnProperty,
        H), Y = W, Z = z(2, function(e, t) {
            return me(e) ? e : t(e.right)
        }), ee = function(e, t) {
            return j(e, ue(t))
        }, te = function(e, t) {
            return j(e, ce(t))
        }, ne = function(e, t, n) {
            return j(e, le(t, n))
        }, re = function(e, t) {
            return j(e, de(t))
        }, ae = function(e, t) {
            return j(e, he(t))
        }, oe = function(e, t) {
            return j(e, ve(t))
        }, ie = function(e, t) {
            return function(e, t) {
                for (var n = t(e); "Left" === n._tag; )
                    n = t(n.left);
                return n.right
            }(t(e), function(e) {
                return me(e) ? Y(Q(e.left)) : me(e.right) ? Q(t(e.right.left)) : Y(Y(e.right.right))
            })
        }, se = "Either", ue = function(t) {
            return function(e) {
                return me(e) ? e : Y(t(e.right))
            }
        }, ce = (z(2, V(pe = {
            URI: se,
            map: ee
        })),
        V(pe),
        function(t) {
            return function(e) {
                return me(e) ? e : me(t) ? t : Y(e.right(t.right))
            }
        }
        ), le = function(t, n) {
            return function(e) {
                return me(e) ? Q(t(e.left)) : Y(n(e.right))
            }
        }, de = function(t) {
            return function(e) {
                return me(e) ? Q(t(e.left)) : e
            }
        }, he = function(t) {
            return function(e) {
                return me(e) ? t() : e
            }
        }, ve = function(t) {
            return function(e) {
                return me(e) ? e : Y(t(e))
            }
        }, pe = Q, fe = {
            URI: se,
            fromEither: M
        }, me = function(e) {
            return "Left" === e._tag
        }, ge = function(e) {
            return "Right" === e._tag
        };
        function Ie(t, e) {
            var n, r = Object.keys(t);
            return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t),
            e && (n = n.filter(function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            })),
            r.push.apply(r, n)),
            r
        }
        function ye(r) {
            for (var e = 1; e < arguments.length; e++) {
                var a = null != arguments[e] ? arguments[e] : {};
                e % 2 ? Ie(Object(a), !0).forEach(function(e) {
                    var t, n;
                    t = r,
                    e = a[n = e],
                    n in t ? Object.defineProperty(t, n, {
                        value: e,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : t[n] = e
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(a)) : Ie(Object(a)).forEach(function(e) {
                    Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(a, e))
                })
            }
            return r
        }
        function Pe() {
            return void 0 !== m.EventStream
        }
        function Ge(e, t, n, r) {
            Pe() && m.EventStream.SendEventWithTarget && (r = Object.values(Te).includes(r) ? r : Te.WWW,
            m.EventStream.SendEventWithTarget(e, t, n, r))
        }
        function be() {
            Ae.sendEventWithTarget(Ee.eventName.saiCreated, Ee.context.hba, {})
        }
        function we(e) {
            Ae.sendEventWithTarget(Ee.eventName.saiMissing, Ee.context.hba, {
                messageRaw: e.message
            })
        }
        F(Z = {
            URI: se,
            map: ee,
            ap: te,
            chain: Z
        }),
        (I = K = K || {}).RequestExempt = "RequestExempt",
        I.RequestExemptError = "RequestExemptError",
        I.GetKeyPairFailed = "GetKeyPairFailed",
        I.UpdateKeyPairFailed = "UpdateKeyPairFailed",
        I.NoKeyPairFound = "NoKeyPairFound",
        I.RequestBodyHashFailed = "RequestBodyHashFailed",
        I.SignatureFailed = "SignatureFailed",
        I.Unknown = "Unknown";
        var Ce, Te = ye(ye({}, {
            DEFAULT: 0,
            WWW: 1,
            STUDIO: 2,
            DIAGNOSTIC: 3
        }), Pe() ? m.EventStream.TargetTypes : {}), Ae = {
            eventTypes: {
                formInteraction: "formInteraction",
                modalAction: "modalAction",
                pageLoad: "pageLoad",
                buttonClick: "buttonClick"
            },
            targetTypes: Te,
            sendEvent: function(e, t) {
                var n = e.name
                  , r = e.type
                  , a = e.context
                  , e = e.requiredParams
                  , o = ye({
                    btn: n
                }, t);
                Array.isArray(e) && e.forEach(function(e) {
                    Object.prototype.hasOwnProperty.call(o, e) || console.info("A required event parameter '".concat(e, "' is not provided"))
                }),
                Ge(r, a, o)
            },
            sendEventWithTarget: Ge,
            sendGamePlayEvent: function(e, t, n, r) {
                m.GamePlayEvents && m.GamePlayEvents.SendGamePlayIntent && m.GamePlayEvents.SendGamePlayIntent(e, t, n, r)
            }
        }, Ee = {
            eventName: {
                batCreated: "batCreated",
                batMissing: "batMissing",
                saiCreated: "saiCreated",
                saiMissing: "saiMissing"
            },
            context: {
                hba: "hba"
            },
            sessionStorageState: {
                batSuccessEventSent: "batSuccessEventSent",
                batMissingEventSent: "batMissingEventSent"
            }
        }, Se = function(e, t) {
            1e6 * Math.random() < t && Ae.sendEventWithTarget(Ee.eventName.batCreated, Ee.context.hba, {
                field: e
            })
        }, Re = function(e, t, n) {
            1e6 * Math.random() < n && Ae.sendEventWithTarget(Ee.eventName.batMissing, Ee.context.hba, {
                field: e,
                kind: t.kind,
                messageRaw: t.message
            })
        }, Le = function(e) {
            return function(t) {
                if ("object" == typeof (e = t) && null !== e && "message"in e && "string" == typeof e.message)
                    return t;
                var e;
                try {
                    return new Error(JSON.stringify(t))
                } catch (e) {
                    return new Error(String(t))
                }
            }(e).message
        }, qe = function() {
            return (qe = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        }, Ue = function(e, i, s, u) {
            return new (s = s || Promise)(function(n, t) {
                function r(e) {
                    try {
                        o(u.next(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function a(e) {
                    try {
                        o(u.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function o(e) {
                    var t;
                    e.done ? n(e.value) : ((t = e.value)instanceof s ? t : new s(function(e) {
                        e(t)
                    }
                    )).then(r, a)
                }
                o((u = u.apply(e, i || [])).next())
            }
            )
        }, Oe = function(n, r) {
            var a, o, i, s = {
                label: 0,
                sent: function() {
                    if (1 & i[0])
                        throw i[1];
                    return i[1]
                },
                trys: [],
                ops: []
            }, e = {
                next: t(0),
                throw: t(1),
                return: t(2)
            };
            return "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                return this
            }
            ),
            e;
            function t(t) {
                return function(e) {
                    return function(t) {
                        if (a)
                            throw new TypeError("Generator is already executing.");
                        for (; s; )
                            try {
                                if (a = 1,
                                o && (i = 2 & t[0] ? o.return : t[0] ? o.throw || ((i = o.return) && i.call(o),
                                0) : o.next) && !(i = i.call(o, t[1])).done)
                                    return i;
                                switch (o = 0,
                                i && (t = [2 & t[0], i.value]),
                                t[0]) {
                                case 0:
                                case 1:
                                    i = t;
                                    break;
                                case 4:
                                    return s.label++,
                                    {
                                        value: t[1],
                                        done: !1
                                    };
                                case 5:
                                    s.label++,
                                    o = t[1],
                                    t = [0];
                                    continue;
                                case 7:
                                    t = s.ops.pop(),
                                    s.trys.pop();
                                    continue;
                                default:
                                    if (!(i = 0 < (i = s.trys).length && i[i.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                        s = 0;
                                        continue
                                    }
                                    if (3 === t[0] && (!i || t[1] > i[0] && t[1] < i[3])) {
                                        s.label = t[1];
                                        break
                                    }
                                    if (6 === t[0] && s.label < i[1]) {
                                        s.label = i[1],
                                        i = t;
                                        break
                                    }
                                    if (i && s.label < i[2]) {
                                        s.label = i[2],
                                        s.ops.push(t);
                                        break
                                    }
                                    i[2] && s.ops.pop(),
                                    s.trys.pop();
                                    continue
                                }
                                t = r.call(n, s)
                            } catch (e) {
                                t = [6, e],
                                o = 0
                            } finally {
                                a = i = 0
                            }
                        if (5 & t[0])
                            throw t[1];
                        return {
                            value: t[0] ? t[1] : void 0,
                            done: !0
                        }
                    }([t, e])
                }
            }
        }, De = "|", _e = [".roblox.com", ".robloxlabs.com", ".roblox.qq.com"], xe = (Hr = Ln()).isBoundAuthTokenEnabled, Be = Hr.hbaIndexedDBName, Ne = Hr.hbaIndexedDBObjStoreName, Fe = Hr.hbaIndexedDBKeyName, ke = Hr.batEventSampleRate, Me = function(e) {
            for (var t = 0; t < _e.length; t++)
                if (function(e) {
                    try {
                        return new URL(e).hostname
                    } catch (e) {
                        return ""
                    }
                }(e.url).endsWith(_e[t]))
                    return !0;
            return !1
        };
        function je(e) {
            try {
                return m.CurrentUser ? null !== m.CurrentUser && void 0 !== m.CurrentUser && m.CurrentUser.isAuthenticated ? Me(e) ? Be ? Ne ? Fe ? xe ? Y(!0) : Q({
                    kind: K.RequestExempt,
                    message: "BoundAuthTokenNotEnabled"
                }) : Q({
                    kind: K.RequestExempt,
                    message: "EmptyIndexedDbKeyName"
                }) : Q({
                    kind: K.RequestExempt,
                    message: "EmptyIndexedDbObjectStoreName"
                }) : Q({
                    kind: K.RequestExempt,
                    message: "EmptyIndexedDbName"
                }) : Q({
                    kind: K.RequestExempt,
                    message: "UrlNotFromAllowedHost"
                }) : Q({
                    kind: K.RequestExempt,
                    message: "CurrentUserNotAuthenticated"
                }) : Q({
                    kind: K.RequestExempt,
                    message: "NoCurrentUser"
                })
            } catch (e) {
                return Q({
                    kind: K.RequestExemptError,
                    message: Le(e)
                })
            }
        }
        function ze(s) {
            var u;
            return Ue(this, void 0, Promise, function() {
                var t, n, r, a, o, i;
                return Oe(this, function(e) {
                    switch (e.label) {
                    case 0:
                        if (e.trys.push([0, 17, , 18]),
                        Ce)
                            return [3, 8];
                        e.label = 1;
                    case 1:
                        return e.trys.push([1, 3, , 4]),
                        [4, d(Be, Ne, Fe)];
                    case 2:
                        return Ce = e.sent(),
                        [3, 4];
                    case 3:
                        return t = e.sent(),
                        [2, Q({
                            message: Le(t),
                            kind: K.GetKeyPairFailed
                        })];
                    case 4:
                        return e.trys.push([4, 7, , 8]),
                        Ce ? [3, 6] : [4, function() {
                            return Ue(this, void 0, Promise, function() {
                                var t, n;
                                return Oe(this, function(e) {
                                    switch (e.label) {
                                    case 0:
                                        return t = (null === m.Cookies || void 0 === m.Cookies ? void 0 : m.Cookies.getBrowserTrackerId()) || "",
                                        [4, d(Be, Ne, t)];
                                    case 1:
                                        return (n = e.sent()) && Fe ? [4, h(Be, Ne, Fe, n)] : [3, 4];
                                    case 2:
                                        return e.sent(),
                                        [4, d(Be, Ne, Fe)];
                                    case 3:
                                        n = e.sent(),
                                        e.label = 4;
                                    case 4:
                                        return [2, n]
                                    }
                                })
                            })
                        }()];
                    case 5:
                        Ce = e.sent(),
                        e.label = 6;
                    case 6:
                        return [3, 8];
                    case 7:
                        return t = e.sent(),
                        [2, Q({
                            message: Le(t),
                            kind: K.UpdateKeyPairFailed
                        })];
                    case 8:
                        if (!Ce)
                            return [2, Q({
                                message: "",
                                kind: K.NoKeyPairFound
                            })];
                        n = Math.floor(Date.now() / 1e3).toString(),
                        a = void 0,
                        "object" == typeof s.data ? a = JSON.stringify(s.data) : "string" == typeof s.data && (a = s.data),
                        r = "",
                        e.label = 9;
                    case 9:
                        return e.trys.push([9, 11, , 12]),
                        [4, Gt.hashStringWithSha256(a)];
                    case 10:
                        return r = e.sent(),
                        [3, 12];
                    case 11:
                        return a = e.sent(),
                        [2, Q({
                            message: Le(a),
                            kind: K.RequestBodyHashFailed
                        })];
                    case 12:
                        o = s.url,
                        i = (null !== (u = s.method) && void 0 !== u ? u : "").toUpperCase(),
                        o = [r, n, o, i].join(De),
                        i = "",
                        e.label = 13;
                    case 13:
                        return e.trys.push([13, 15, , 16]),
                        [4, Gt.sign(Ce.privateKey, o)];
                    case 14:
                        return i = e.sent(),
                        [3, 16];
                    case 15:
                        return o = e.sent(),
                        [2, Q({
                            message: Le(o),
                            kind: K.SignatureFailed
                        })];
                    case 16:
                        return [2, Y(["v1", r, n, i].join(De))];
                    case 17:
                        return i = e.sent(),
                        console.warn("BAT generation error:", i),
                        [2, Q({
                            message: Le(i),
                            kind: K.Unknown
                        })];
                    case 18:
                        return [2]
                    }
                })
            })
        }
        function Ve(r) {
            return Ue(this, void 0, Promise, function() {
                var t, n;
                return Oe(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return n = je(r),
                        me(n) ? (Re(r.url, n.left, ke),
                        [2, r]) : [4, ze(r)];
                    case 1:
                        return t = e.sent(),
                        n = qe({}, r),
                        ge(t) ? (n.headers = qe(qe({}, n.headers), {
                            "x-bound-auth-token": t.right
                        }),
                        Se(r.url, ke)) : Re(r.url, t.left, ke),
                        [2, n]
                    }
                })
            })
        }
        var He = {
            shouldRequestWithBoundAuthToken: je,
            generateBoundAuthToken: ze,
            buildConfigBoundAuthToken: Ve
        }
          , We = function() {
            return (We = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        };
        function Ke(e) {
            return e || Promise.reject(new Error("No config found")),
            Ve(e).then(function(e) {
                return N((e = We({}, t = e),
                t.noCache && (e.headers = We({
                    "Cache-Control": "no-cache, no-store, must-revalidate",
                    Pragma: "no-cache",
                    Expires: 0
                }, e.headers)),
                t.noPragma && e.headers.Pragma && delete e.headers.Pragma,
                t.authBearerToken && (e.headers = We(We({}, e.headers), {
                    "X-Auth-Bearer-Token": t.authBearerToken
                })),
                e));
                var t
            })
        }
        function Xe(e, t) {
            return Ke(We(We({
                method: E.GET,
                url: e.url
            }, e), {
                params: t
            }))
        }
        function Je(e, t) {
            return Ke(We(We({
                method: E.POST,
                url: e.url
            }, e), {
                data: t
            }))
        }
        function Qe(e) {
            var t = [];
            return e && "object" == typeof e && (e = e.errors)instanceof Array ? (e.forEach(function(e) {
                !e || "object" != typeof e || "number" == typeof (e = e.code) && t.push(e)
            }),
            t) : []
        }
        function Ye() {
            return at(void 0, void 0, Promise, function() {
                var t;
                return ot(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return t = m.EnvironmentUrls.apiGatewayUrl + "/hba-service/v1/getServerNonce",
                        t = {
                            url: t,
                            withCredentials: !0
                        },
                        [4, rt.get(t)];
                    case 1:
                        return [2, e.sent().data]
                    }
                })
            })
        }
        function $e(t) {
            return it(void 0, void 0, Promise, function() {
                return st(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return ut && ct && lt ? [4, h(ut, ct, lt, t).catch(function(e) {
                            console.error("putting cryptoKeyPair error")
                        })] : [3, 2];
                    case 1:
                        e.sent(),
                        e.label = 2;
                    case 2:
                        return [2]
                    }
                })
            })
        }
        function Ze(e) {
            for (var t = new Uint8Array(e.length), n = 0; n < e.length; n++)
                t[n] = e.charCodeAt(n);
            return t.buffer
        }
        function et(e) {
            for (var t = "", n = new Uint8Array(e), r = 0; r < n.byteLength; r++)
                t += String.fromCharCode(n[r]);
            return btoa(t)
        }
        var tt, nt, rt = {
            methods: E,
            get: Xe,
            post: Je,
            delete: function(e, t) {
                return Ke(We(We({
                    method: E.DELETE,
                    url: e.url
                }, e), {
                    params: t
                }))
            },
            patch: function(e, t) {
                return Ke(We(We({
                    method: E.PATCH,
                    url: e.url
                }, e), {
                    data: t
                }))
            },
            put: function(e, t) {
                return Ke(We(We({
                    method: E.PUT,
                    url: e.url
                }, e), {
                    data: t
                }))
            },
            buildBatchPromises: function(e, t, n, r, a) {
                for (var o = [], i = 0, s = e.slice(i, t), u = a || "userIds"; 0 < s.length; ) {
                    var c = {};
                    c[u] = s,
                    r ? o.push(Je(n, c)) : o.push(Xe(n, c)),
                    i += 1,
                    s = e.slice(i * t, i * t + t)
                }
                return Promise.all(o)
            },
            createCancelToken: function() {
                return N.CancelToken.source()
            },
            isCancelled: function(e) {
                return N.isCancel(e)
            },
            getApiErrorCodes: Qe,
            parseErrorCode: function(e) {
                var t = Qe(e);
                return "object" == typeof e && Qe(e.data).forEach(function(e) {
                    return t.push(e)
                }),
                t[0] || null
            }
        }, at = function(e, i, s, u) {
            return new (s = s || Promise)(function(n, t) {
                function r(e) {
                    try {
                        o(u.next(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function a(e) {
                    try {
                        o(u.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function o(e) {
                    var t;
                    e.done ? n(e.value) : ((t = e.value)instanceof s ? t : new s(function(e) {
                        e(t)
                    }
                    )).then(r, a)
                }
                o((u = u.apply(e, i || [])).next())
            }
            )
        }, ot = function(n, r) {
            var a, o, i, s = {
                label: 0,
                sent: function() {
                    if (1 & i[0])
                        throw i[1];
                    return i[1]
                },
                trys: [],
                ops: []
            }, e = {
                next: t(0),
                throw: t(1),
                return: t(2)
            };
            return "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                return this
            }
            ),
            e;
            function t(t) {
                return function(e) {
                    return function(t) {
                        if (a)
                            throw new TypeError("Generator is already executing.");
                        for (; s; )
                            try {
                                if (a = 1,
                                o && (i = 2 & t[0] ? o.return : t[0] ? o.throw || ((i = o.return) && i.call(o),
                                0) : o.next) && !(i = i.call(o, t[1])).done)
                                    return i;
                                switch (o = 0,
                                i && (t = [2 & t[0], i.value]),
                                t[0]) {
                                case 0:
                                case 1:
                                    i = t;
                                    break;
                                case 4:
                                    return s.label++,
                                    {
                                        value: t[1],
                                        done: !1
                                    };
                                case 5:
                                    s.label++,
                                    o = t[1],
                                    t = [0];
                                    continue;
                                case 7:
                                    t = s.ops.pop(),
                                    s.trys.pop();
                                    continue;
                                default:
                                    if (!(i = 0 < (i = s.trys).length && i[i.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                        s = 0;
                                        continue
                                    }
                                    if (3 === t[0] && (!i || t[1] > i[0] && t[1] < i[3])) {
                                        s.label = t[1];
                                        break
                                    }
                                    if (6 === t[0] && s.label < i[1]) {
                                        s.label = i[1],
                                        i = t;
                                        break
                                    }
                                    if (i && s.label < i[2]) {
                                        s.label = i[2],
                                        s.ops.push(t);
                                        break
                                    }
                                    i[2] && s.ops.pop(),
                                    s.trys.pop();
                                    continue
                                }
                                t = r.call(n, s)
                            } catch (e) {
                                t = [6, e],
                                o = 0
                            } finally {
                                a = i = 0
                            }
                        if (5 & t[0])
                            throw t[1];
                        return {
                            value: t[0] ? t[1] : void 0,
                            done: !0
                        }
                    }([t, e])
                }
            }
        }, it = function(e, i, s, u) {
            return new (s = s || Promise)(function(n, t) {
                function r(e) {
                    try {
                        o(u.next(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function a(e) {
                    try {
                        o(u.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function o(e) {
                    var t;
                    e.done ? n(e.value) : ((t = e.value)instanceof s ? t : new s(function(e) {
                        e(t)
                    }
                    )).then(r, a)
                }
                o((u = u.apply(e, i || [])).next())
            }
            )
        }, st = function(n, r) {
            var a, o, i, s = {
                label: 0,
                sent: function() {
                    if (1 & i[0])
                        throw i[1];
                    return i[1]
                },
                trys: [],
                ops: []
            }, e = {
                next: t(0),
                throw: t(1),
                return: t(2)
            };
            return "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                return this
            }
            ),
            e;
            function t(t) {
                return function(e) {
                    return function(t) {
                        if (a)
                            throw new TypeError("Generator is already executing.");
                        for (; s; )
                            try {
                                if (a = 1,
                                o && (i = 2 & t[0] ? o.return : t[0] ? o.throw || ((i = o.return) && i.call(o),
                                0) : o.next) && !(i = i.call(o, t[1])).done)
                                    return i;
                                switch (o = 0,
                                i && (t = [2 & t[0], i.value]),
                                t[0]) {
                                case 0:
                                case 1:
                                    i = t;
                                    break;
                                case 4:
                                    return s.label++,
                                    {
                                        value: t[1],
                                        done: !1
                                    };
                                case 5:
                                    s.label++,
                                    o = t[1],
                                    t = [0];
                                    continue;
                                case 7:
                                    t = s.ops.pop(),
                                    s.trys.pop();
                                    continue;
                                default:
                                    if (!(i = 0 < (i = s.trys).length && i[i.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                        s = 0;
                                        continue
                                    }
                                    if (3 === t[0] && (!i || t[1] > i[0] && t[1] < i[3])) {
                                        s.label = t[1];
                                        break
                                    }
                                    if (6 === t[0] && s.label < i[1]) {
                                        s.label = i[1],
                                        i = t;
                                        break
                                    }
                                    if (i && s.label < i[2]) {
                                        s.label = i[2],
                                        s.ops.push(t);
                                        break
                                    }
                                    i[2] && s.ops.pop(),
                                    s.trys.pop();
                                    continue
                                }
                                t = r.call(n, s)
                            } catch (e) {
                                t = [6, e],
                                o = 0
                            } finally {
                                a = i = 0
                            }
                        if (5 & t[0])
                            throw t[1];
                        return {
                            value: t[0] ? t[1] : void 0,
                            done: !0
                        }
                    }([t, e])
                }
            }
        }, ut = (Zr = Ln()).hbaIndexedDBName, ct = Zr.hbaIndexedDBObjStoreName, lt = Zr.hbaIndexedDBKeyName, dt = function(e, i, s, u) {
            return new (s = s || Promise)(function(n, t) {
                function r(e) {
                    try {
                        o(u.next(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function a(e) {
                    try {
                        o(u.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function o(e) {
                    var t;
                    e.done ? n(e.value) : ((t = e.value)instanceof s ? t : new s(function(e) {
                        e(t)
                    }
                    )).then(r, a)
                }
                o((u = u.apply(e, i || [])).next())
            }
            )
        }, ht = function(n, r) {
            var a, o, i, s = {
                label: 0,
                sent: function() {
                    if (1 & i[0])
                        throw i[1];
                    return i[1]
                },
                trys: [],
                ops: []
            }, e = {
                next: t(0),
                throw: t(1),
                return: t(2)
            };
            return "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                return this
            }
            ),
            e;
            function t(t) {
                return function(e) {
                    return function(t) {
                        if (a)
                            throw new TypeError("Generator is already executing.");
                        for (; s; )
                            try {
                                if (a = 1,
                                o && (i = 2 & t[0] ? o.return : t[0] ? o.throw || ((i = o.return) && i.call(o),
                                0) : o.next) && !(i = i.call(o, t[1])).done)
                                    return i;
                                switch (o = 0,
                                i && (t = [2 & t[0], i.value]),
                                t[0]) {
                                case 0:
                                case 1:
                                    i = t;
                                    break;
                                case 4:
                                    return s.label++,
                                    {
                                        value: t[1],
                                        done: !1
                                    };
                                case 5:
                                    s.label++,
                                    o = t[1],
                                    t = [0];
                                    continue;
                                case 7:
                                    t = s.ops.pop(),
                                    s.trys.pop();
                                    continue;
                                default:
                                    if (!(i = 0 < (i = s.trys).length && i[i.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                        s = 0;
                                        continue
                                    }
                                    if (3 === t[0] && (!i || t[1] > i[0] && t[1] < i[3])) {
                                        s.label = t[1];
                                        break
                                    }
                                    if (6 === t[0] && s.label < i[1]) {
                                        s.label = i[1],
                                        i = t;
                                        break
                                    }
                                    if (i && s.label < i[2]) {
                                        s.label = i[2],
                                        s.ops.push(t);
                                        break
                                    }
                                    i[2] && s.ops.pop(),
                                    s.trys.pop();
                                    continue
                                }
                                t = r.call(n, s)
                            } catch (e) {
                                t = [6, e],
                                o = 0
                            } finally {
                                a = i = 0
                            }
                        if (5 & t[0])
                            throw t[1];
                        return {
                            value: t[0] ? t[1] : void 0,
                            done: !0
                        }
                    }([t, e])
                }
            }
        }, vt = (bn = Ln()).hbaIndexedDBName, pt = bn.hbaIndexedDBObjStoreName, ft = bn.hbaIndexedDBKeyName, mt = bn.isSecureAuthenticationIntentEnabled, gt = function(e, i, s, u) {
            return new (s = s || Promise)(function(n, t) {
                function r(e) {
                    try {
                        o(u.next(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function a(e) {
                    try {
                        o(u.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function o(e) {
                    var t;
                    e.done ? n(e.value) : ((t = e.value)instanceof s ? t : new s(function(e) {
                        e(t)
                    }
                    )).then(r, a)
                }
                o((u = u.apply(e, i || [])).next())
            }
            )
        }, It = function(n, r) {
            var a, o, i, s = {
                label: 0,
                sent: function() {
                    if (1 & i[0])
                        throw i[1];
                    return i[1]
                },
                trys: [],
                ops: []
            }, e = {
                next: t(0),
                throw: t(1),
                return: t(2)
            };
            return "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                return this
            }
            ),
            e;
            function t(t) {
                return function(e) {
                    return function(t) {
                        if (a)
                            throw new TypeError("Generator is already executing.");
                        for (; s; )
                            try {
                                if (a = 1,
                                o && (i = 2 & t[0] ? o.return : t[0] ? o.throw || ((i = o.return) && i.call(o),
                                0) : o.next) && !(i = i.call(o, t[1])).done)
                                    return i;
                                switch (o = 0,
                                i && (t = [2 & t[0], i.value]),
                                t[0]) {
                                case 0:
                                case 1:
                                    i = t;
                                    break;
                                case 4:
                                    return s.label++,
                                    {
                                        value: t[1],
                                        done: !1
                                    };
                                case 5:
                                    s.label++,
                                    o = t[1],
                                    t = [0];
                                    continue;
                                case 7:
                                    t = s.ops.pop(),
                                    s.trys.pop();
                                    continue;
                                default:
                                    if (!(i = 0 < (i = s.trys).length && i[i.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                        s = 0;
                                        continue
                                    }
                                    if (3 === t[0] && (!i || t[1] > i[0] && t[1] < i[3])) {
                                        s.label = t[1];
                                        break
                                    }
                                    if (6 === t[0] && s.label < i[1]) {
                                        s.label = i[1],
                                        i = t;
                                        break
                                    }
                                    if (i && s.label < i[2]) {
                                        s.label = i[2],
                                        s.ops.push(t);
                                        break
                                    }
                                    i[2] && s.ops.pop(),
                                    s.trys.pop();
                                    continue
                                }
                                t = r.call(n, s)
                            } catch (e) {
                                t = [6, e],
                                o = 0
                            } finally {
                                a = i = 0
                            }
                        if (5 & t[0])
                            throw t[1];
                        return {
                            value: t[0] ? t[1] : void 0,
                            done: !0
                        }
                    }([t, e])
                }
            }
        }, yt = {
            name: "ECDSA",
            namedCurve: "P-256"
        }, Pt = {
            name: "ECDSA",
            hash: {
                name: "SHA-256"
            }
        }, Gt = {
            arrayBufferToBase64String: et,
            base64StringToArrayBuffer: function(e) {
                e = atob(e);
                return Ze(e)
            },
            exportPublicKeyAsSpki: function(n) {
                return gt(void 0, void 0, Promise, function() {
                    var t;
                    return It(this, function(e) {
                        switch (e.label) {
                        case 0:
                            return [4, crypto.subtle.exportKey("spki", n)];
                        case 1:
                            return t = e.sent(),
                            [2, et(t)]
                        }
                    })
                })
            },
            generateSigningKeyPairUnextractable: function() {
                return gt(void 0, void 0, Promise, function() {
                    return It(this, function(e) {
                        return [2, crypto.subtle.generateKey(yt, !1, ["sign"])]
                    })
                })
            },
            hashStringWithSha256: function(n) {
                return gt(void 0, void 0, Promise, function() {
                    var t;
                    return It(this, function(e) {
                        switch (e.label) {
                        case 0:
                            return t = r(n),
                            [4, crypto.subtle.digest(Pt.hash.name, t)];
                        case 1:
                            return t = e.sent(),
                            [2, et(t)]
                        }
                    })
                })
            },
            sign: function(n, r) {
                return gt(void 0, void 0, Promise, function() {
                    var t;
                    return It(this, function(e) {
                        switch (e.label) {
                        case 0:
                            return [4, crypto.subtle.sign(Pt, n, Ze(r))];
                        case 1:
                            return t = e.sent(),
                            [2, et(t)]
                        }
                    })
                })
            },
            stringToArrayBuffer: Ze,
            getHbaMeta: Ln,
            deleteUserCryptoKeyPairUponLogout: f,
            generateSecureAuthIntent: S = function() {
                return dt(void 0, void 0, Promise, function() {
                    var t, n, r, a, o, i;
                    return ht(this, function(e) {
                        switch (e.label) {
                        case 0:
                            if (!mt || m.DeviceMeta && (0,
                            m.DeviceMeta)().isInApp)
                                return [2, null];
                            e.label = 1;
                        case 1:
                            return e.trys.push([1, 14, , 15]),
                            [4, Ye()];
                        case 2:
                            if (!(t = e.sent()))
                                return console.warn("No hba server nonce available."),
                                we({
                                    message: "NonceUnavailable"
                                }),
                                [2, null];
                            if (n = {},
                            !(vt && pt && ft))
                                return [3, 6];
                            e.label = 3;
                        case 3:
                            return e.trys.push([3, 5, , 6]),
                            [4, d(vt, pt, ft)];
                        case 4:
                            return n = e.sent(),
                            [3, 6];
                        case 5:
                            return e.sent(),
                            n = {},
                            [3, 6];
                        case 6:
                            return n && 0 !== Object.keys(n).length ? [3, 11] : [4, Gt.generateSigningKeyPairUnextractable()];
                        case 7:
                            return n = e.sent(),
                            [4, s()];
                        case 8:
                            return e.sent(),
                            [4, $e(n)];
                        case 9:
                            return e.sent(),
                            [4, d(vt, pt, ft)];
                        case 10:
                            n = e.sent(),
                            e.label = 11;
                        case 11:
                            return [4, Gt.exportPublicKeyAsSpki(n.publicKey)];
                        case 12:
                            return r = e.sent(),
                            a = Math.floor(Date.now() / 1e3),
                            o = [r, a, t].join("|"),
                            //[4, Gt.sign(n.privateKey, o)];
                            console.log(o);
                        case 13:
                            return i = e.sent(),
                            i = {
                                clientPublicKey: r,
                                clientEpochTimestamp: a,
                                serverNonce: t,
                                saiSignature: i
                            },
                            be(),
                            [2, i];
                        case 14:
                            return i = e.sent(),
                            we({
                                message: Le(i)
                            }),
                            [2, null];
                        case 15:
                            return [2]
                        }
                    })
                })
            }
        }, bt = {
            startDesktopAndMobileWebChat: function(e) {
                var t = e.userId;
                t ? ((e = m.DeviceMeta && new m.DeviceMeta) && e.isAndroidApp || e && e.isIosApp || e && e.isUWPApp || e && e.isWin32App || e && e.isUniversalApp ? window.location.href = "roblox://navigation/chat?userId=".concat(t, "&entryPoint=AppShellWebView") : $(document).triggerHandler("Roblox.Chat.StartChat", {
                    userId: t
                }),
                Ae.sendEventWithTarget("startChatByUser", "click", {
                    userId: t
                })) : console.log("missing valid params to start web chat")
            }
        }, wt = $l(5442), z = (tt = function(e, t) {
            return (tt = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            )(e, t)
        }
        ,
        function(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
            function n() {
                this.constructor = e
            }
            tt(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        ), Ct = m.EnvironmentUrls.catalogApi.replace(/\/+$/, ""), Tt = ",", Z = function(e, t, n) {
            void 0 === t && (t = Ct),
            void 0 === n && (n = N),
            this.basePath = t,
            this.axios = n,
            e && (this.configuration = e,
            this.basePath = e.basePath || this.basePath)
        }, At = (nt = Error,
        z(Et, nt),
        Et);
        function Et(e, t) {
            t = nt.call(this, t) || this;
            return t.field = e,
            t.name = "RequiredError",
            t
        }
        var St, fe = (St = function(e, t) {
            return (St = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            )(e, t)
        }
        ,
        function(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
            function n() {
                this.constructor = e
            }
            St(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        ), Rt = function() {
            return (Rt = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        }, Lt = function(e, i, s, u) {
            return new (s = s || Promise)(function(n, t) {
                function r(e) {
                    try {
                        o(u.next(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function a(e) {
                    try {
                        o(u.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function o(e) {
                    var t;
                    e.done ? n(e.value) : ((t = e.value)instanceof s ? t : new s(function(e) {
                        e(t)
                    }
                    )).then(r, a)
                }
                o((u = u.apply(e, i || [])).next())
            }
            )
        }, qt = function(n, r) {
            var a, o, i, s = {
                label: 0,
                sent: function() {
                    if (1 & i[0])
                        throw i[1];
                    return i[1]
                },
                trys: [],
                ops: []
            }, e = {
                next: t(0),
                throw: t(1),
                return: t(2)
            };
            return "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                return this
            }
            ),
            e;
            function t(t) {
                return function(e) {
                    return function(t) {
                        if (a)
                            throw new TypeError("Generator is already executing.");
                        for (; s; )
                            try {
                                if (a = 1,
                                o && (i = 2 & t[0] ? o.return : t[0] ? o.throw || ((i = o.return) && i.call(o),
                                0) : o.next) && !(i = i.call(o, t[1])).done)
                                    return i;
                                switch (o = 0,
                                i && (t = [2 & t[0], i.value]),
                                t[0]) {
                                case 0:
                                case 1:
                                    i = t;
                                    break;
                                case 4:
                                    return s.label++,
                                    {
                                        value: t[1],
                                        done: !1
                                    };
                                case 5:
                                    s.label++,
                                    o = t[1],
                                    t = [0];
                                    continue;
                                case 7:
                                    t = s.ops.pop(),
                                    s.trys.pop();
                                    continue;
                                default:
                                    if (!(i = 0 < (i = s.trys).length && i[i.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                        s = 0;
                                        continue
                                    }
                                    if (3 === t[0] && (!i || t[1] > i[0] && t[1] < i[3])) {
                                        s.label = t[1];
                                        break
                                    }
                                    if (6 === t[0] && s.label < i[1]) {
                                        s.label = i[1],
                                        i = t;
                                        break
                                    }
                                    if (i && s.label < i[2]) {
                                        s.label = i[2],
                                        s.ops.push(t);
                                        break
                                    }
                                    i[2] && s.ops.pop(),
                                    s.trys.pop();
                                    continue
                                }
                                t = r.call(n, s)
                            } catch (e) {
                                t = [6, e],
                                o = 0
                            } finally {
                                a = i = 0
                            }
                        if (5 & t[0])
                            throw t[1];
                        return {
                            value: t[0] ? t[1] : void 0,
                            done: !0
                        }
                    }([t, e])
                }
            }
        };
        function Ut(h) {
            var e = this;
            return {
                v1AssetsAssetIdBundlesGet: function(i, s, u, c, l) {
                    return void 0 === l && (l = {}),
                    Lt(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return qt(this, function(e) {
                            if (null == i)
                                throw new At("assetId","Required parameter assetId was null or undefined when calling v1AssetsAssetIdBundlesGet.");
                            return a = "/v1/assets/{assetId}/bundles".replace("{assetId}", encodeURIComponent(String(i))),
                            t = wt.qg(a, !0),
                            h && (o = h.baseOptions),
                            n = Rt(Rt({
                                method: "GET"
                            }, o), l),
                            r = {},
                            a = {},
                            void 0 !== s && (a.sortOrder = s),
                            void 0 !== u && (a.limit = u),
                            void 0 !== c && (a.cursor = c),
                            t.query = Rt(Rt(Rt({}, t.query), a), l.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = Rt(Rt(Rt({}, r), o), l.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1BundlesBundleIdDetailsGet: function(i, s) {
                    return void 0 === s && (s = {}),
                    Lt(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return qt(this, function(e) {
                            if (null == i)
                                throw new At("bundleId","Required parameter bundleId was null or undefined when calling v1BundlesBundleIdDetailsGet.");
                            return a = "/v1/bundles/{bundleId}/details".replace("{bundleId}", encodeURIComponent(String(i))),
                            t = wt.qg(a, !0),
                            h && (o = h.baseOptions),
                            n = Rt(Rt({
                                method: "GET"
                            }, o), s),
                            r = {},
                            a = {},
                            t.query = Rt(Rt(Rt({}, t.query), a), s.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = Rt(Rt(Rt({}, r), o), s.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1BundlesBundleIdRecommendationsGet: function(i, s, u) {
                    return void 0 === u && (u = {}),
                    Lt(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return qt(this, function(e) {
                            if (null == i)
                                throw new At("bundleId","Required parameter bundleId was null or undefined when calling v1BundlesBundleIdRecommendationsGet.");
                            return a = "/v1/bundles/{bundleId}/recommendations".replace("{bundleId}", encodeURIComponent(String(i))),
                            t = wt.qg(a, !0),
                            h && (o = h.baseOptions),
                            n = Rt(Rt({
                                method: "GET"
                            }, o), u),
                            r = {},
                            a = {},
                            void 0 !== s && (a.numItems = s),
                            t.query = Rt(Rt(Rt({}, t.query), a), u.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = Rt(Rt(Rt({}, r), o), u.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1BundlesBundleIdUnpackPost: function(i, s) {
                    return void 0 === s && (s = {}),
                    Lt(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return qt(this, function(e) {
                            if (null == i)
                                throw new At("bundleId","Required parameter bundleId was null or undefined when calling v1BundlesBundleIdUnpackPost.");
                            return a = "/v1/bundles/{bundleId}/unpack".replace("{bundleId}", encodeURIComponent(String(i))),
                            t = wt.qg(a, !0),
                            h && (o = h.baseOptions),
                            n = Rt(Rt({
                                method: "POST"
                            }, o), s),
                            r = {},
                            a = {},
                            t.query = Rt(Rt(Rt({}, t.query), a), s.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = Rt(Rt(Rt({}, r), o), s.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1BundlesDetailsGet: function(i, s) {
                    return void 0 === s && (s = {}),
                    Lt(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return qt(this, function(e) {
                            if (null == i)
                                throw new At("bundleIds","Required parameter bundleIds was null or undefined when calling v1BundlesDetailsGet.");
                            return t = wt.qg("/v1/bundles/details", !0),
                            h && (o = h.baseOptions),
                            n = Rt(Rt({
                                method: "GET"
                            }, o), s),
                            r = {},
                            a = {},
                            i && (a.bundleIds = i.join(Tt)),
                            t.query = Rt(Rt(Rt({}, t.query), a), s.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = Rt(Rt(Rt({}, r), o), s.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1UsersUserIdBundlesBundleTypeGet: function(i, s, u, c, l, d) {
                    return void 0 === d && (d = {}),
                    Lt(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return qt(this, function(e) {
                            if (null == i)
                                throw new At("userId","Required parameter userId was null or undefined when calling v1UsersUserIdBundlesBundleTypeGet.");
                            if (null == s)
                                throw new At("bundleType","Required parameter bundleType was null or undefined when calling v1UsersUserIdBundlesBundleTypeGet.");
                            return a = "/v1/users/{userId}/bundles/{bundleType}".replace("{userId}", encodeURIComponent(String(i))).replace("{bundleType}", encodeURIComponent(String(s))),
                            t = wt.qg(a, !0),
                            h && (o = h.baseOptions),
                            n = Rt(Rt({
                                method: "GET"
                            }, o), d),
                            r = {},
                            a = {},
                            void 0 !== u && (a.limit = u),
                            void 0 !== c && (a.cursor = c),
                            void 0 !== l && (a.sortOrder = l),
                            t.query = Rt(Rt(Rt({}, t.query), a), d.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = Rt(Rt(Rt({}, r), o), d.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1UsersUserIdBundlesGet: function(i, s, u, c, l) {
                    return void 0 === l && (l = {}),
                    Lt(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return qt(this, function(e) {
                            if (null == i)
                                throw new At("userId","Required parameter userId was null or undefined when calling v1UsersUserIdBundlesGet.");
                            return a = "/v1/users/{userId}/bundles".replace("{userId}", encodeURIComponent(String(i))),
                            t = wt.qg(a, !0),
                            h && (o = h.baseOptions),
                            n = Rt(Rt({
                                method: "GET"
                            }, o), l),
                            r = {},
                            a = {},
                            void 0 !== s && (a.sortOrder = s),
                            void 0 !== u && (a.limit = u),
                            void 0 !== c && (a.cursor = c),
                            t.query = Rt(Rt(Rt({}, t.query), a), l.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = Rt(Rt(Rt({}, r), o), l.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                }
            }
        }
        function Ot(u) {
            return {
                v1AssetsAssetIdBundlesGet: function(t, r, a, o, i) {
                    return Lt(this, void 0, Promise, function() {
                        var n;
                        return qt(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Ut(u).v1AssetsAssetIdBundlesGet(t, r, a, o, i)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = Ct);
                                    t = Rt(Rt({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1BundlesBundleIdDetailsGet: function(t, r) {
                    return Lt(this, void 0, Promise, function() {
                        var n;
                        return qt(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Ut(u).v1BundlesBundleIdDetailsGet(t, r)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = Ct);
                                    t = Rt(Rt({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1BundlesBundleIdRecommendationsGet: function(t, r, a) {
                    return Lt(this, void 0, Promise, function() {
                        var n;
                        return qt(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Ut(u).v1BundlesBundleIdRecommendationsGet(t, r, a)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = Ct);
                                    t = Rt(Rt({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1BundlesBundleIdUnpackPost: function(t, r) {
                    return Lt(this, void 0, Promise, function() {
                        var n;
                        return qt(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Ut(u).v1BundlesBundleIdUnpackPost(t, r)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = Ct);
                                    t = Rt(Rt({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1BundlesDetailsGet: function(t, r) {
                    return Lt(this, void 0, Promise, function() {
                        var n;
                        return qt(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Ut(u).v1BundlesDetailsGet(t, r)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = Ct);
                                    t = Rt(Rt({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1UsersUserIdBundlesBundleTypeGet: function(t, r, a, o, i, s) {
                    return Lt(this, void 0, Promise, function() {
                        var n;
                        return qt(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Ut(u).v1UsersUserIdBundlesBundleTypeGet(t, r, a, o, i, s)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = Ct);
                                    t = Rt(Rt({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1UsersUserIdBundlesGet: function(t, r, a, o, i) {
                    return Lt(this, void 0, Promise, function() {
                        var n;
                        return qt(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Ut(u).v1UsersUserIdBundlesGet(t, r, a, o, i)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = Ct);
                                    t = Rt(Rt({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                }
            }
        }
        (J = {}).Accessories = "Accessories",
        J.All = "All",
        J.AvatarAnimations = "AvatarAnimations",
        J.BackAccessories = "BackAccessories",
        J.BodyParts = "BodyParts",
        J.Clothing = "Clothing",
        J.Collectibles = "Collectibles",
        J.FaceAccessories = "FaceAccessories",
        J.Faces = "Faces",
        J.Featured = "Featured",
        J.FrontAccessories = "FrontAccessories",
        J.Gear = "Gear",
        J.HairAccessories = "HairAccessories",
        J.Hats = "Hats",
        J.Heads = "Heads",
        J.NeckAccessories = "NeckAccessories",
        J.Pants = "Pants",
        J.Shirts = "Shirts",
        J.ShoulderAccessories = "ShoulderAccessories",
        J.Tshirts = "Tshirts",
        J.WaistAccessories = "WaistAccessories",
        J.Bundles = "Bundles",
        J.AnimationBundles = "AnimationBundles",
        J.EmoteAnimations = "EmoteAnimations",
        J.CommunityCreations = "CommunityCreations",
        J.Melee = "Melee",
        J.Ranged = "Ranged",
        J.Explosive = "Explosive",
        J.PowerUp = "PowerUp",
        J.Navigation = "Navigation",
        J.Musical = "Musical",
        J.Social = "Social",
        J.Building = "Building",
        J.Transport = "Transport",
        J.Premium = "Premium",
        J.Recommended = "Recommended",
        (X = {}).Accessories = "Accessories",
        X.All = "All",
        X.AvatarAnimations = "AvatarAnimations",
        X.BodyParts = "BodyParts",
        X.Clothing = "Clothing",
        X.Collectibles = "Collectibles",
        X.Featured = "Featured",
        X.Gear = "Gear",
        X.CommunityCreations = "CommunityCreations",
        X.Premium = "Premium",
        X.Recommended = "Recommended",
        (te = {}).Accessories = "Accessories",
        te.All = "All",
        te.AvatarAnimations = "AvatarAnimations",
        te.BodyParts = "BodyParts",
        te.Clothing = "Clothing",
        te.Collectibles = "Collectibles",
        te.Featured = "Featured",
        te.Gear = "Gear",
        te.CommunityCreations = "CommunityCreations",
        te.Premium = "Premium",
        te.Recommended = "Recommended",
        (ne = {}).User = "User",
        ne.Group = "Group",
        (re = {}).All = "All",
        re.Robux = "Robux",
        re.Tickets = "Tickets",
        re.CustomRobux = "CustomRobux",
        re.CustomTickets = "CustomTickets",
        re.Free = "Free",
        (ae = {}).Relevance = "Relevance",
        ae.Favorited = "Favorited",
        ae.Sales = "Sales",
        ae.Updated = "Updated",
        ae.PriceAsc = "PriceAsc",
        ae.PriceDesc = "PriceDesc",
        (oe = {}).Past12Hours = "Past12Hours",
        oe.PastDay = "PastDay",
        oe.Past3Days = "Past3Days",
        oe.PastWeek = "PastWeek",
        oe.PastMonth = "PastMonth",
        oe.AllTime = "AllTime",
        (ie = {}).Accessories = "Accessories",
        ie.All = "All",
        ie.AvatarAnimations = "AvatarAnimations",
        ie.BodyParts = "BodyParts",
        ie.Clothing = "Clothing",
        ie.Collectibles = "Collectibles",
        ie.Featured = "Featured",
        ie.Gear = "Gear",
        ie.CommunityCreations = "CommunityCreations",
        ie.Premium = "Premium",
        ie.Recommended = "Recommended",
        (pe = {}).Accessories = "Accessories",
        pe.All = "All",
        pe.AvatarAnimations = "AvatarAnimations",
        pe.BackAccessories = "BackAccessories",
        pe.BodyParts = "BodyParts",
        pe.Clothing = "Clothing",
        pe.Collectibles = "Collectibles",
        pe.FaceAccessories = "FaceAccessories",
        pe.Faces = "Faces",
        pe.Featured = "Featured",
        pe.FrontAccessories = "FrontAccessories",
        pe.Gear = "Gear",
        pe.HairAccessories = "HairAccessories",
        pe.Hats = "Hats",
        pe.Heads = "Heads",
        pe.NeckAccessories = "NeckAccessories",
        pe.Pants = "Pants",
        pe.Shirts = "Shirts",
        pe.ShoulderAccessories = "ShoulderAccessories",
        pe.Tshirts = "Tshirts",
        pe.WaistAccessories = "WaistAccessories",
        pe.Bundles = "Bundles",
        pe.AnimationBundles = "AnimationBundles",
        pe.EmoteAnimations = "EmoteAnimations",
        pe.CommunityCreations = "CommunityCreations",
        pe.Melee = "Melee",
        pe.Ranged = "Ranged",
        pe.Explosive = "Explosive",
        pe.PowerUp = "PowerUp",
        pe.Navigation = "Navigation",
        pe.Musical = "Musical",
        pe.Social = "Social",
        pe.Building = "Building",
        pe.Transport = "Transport",
        pe.Premium = "Premium",
        pe.Recommended = "Recommended",
        (I = {}).Accessories = "Accessories",
        I.All = "All",
        I.AvatarAnimations = "AvatarAnimations",
        I.BodyParts = "BodyParts",
        I.Clothing = "Clothing",
        I.Collectibles = "Collectibles",
        I.Featured = "Featured",
        I.Gear = "Gear",
        I.CommunityCreations = "CommunityCreations",
        I.Premium = "Premium",
        I.Recommended = "Recommended",
        (Hr = {}).All = "All",
        Hr.Robux = "Robux",
        Hr.Tickets = "Tickets",
        Hr.CustomRobux = "CustomRobux",
        Hr.CustomTickets = "CustomTickets",
        Hr.Free = "Free",
        (Zr = {}).All = "All",
        Zr.Robux = "Robux",
        Zr.Tickets = "Tickets",
        Zr.CustomRobux = "CustomRobux",
        Zr.CustomTickets = "CustomTickets",
        Zr.Free = "Free",
        (bn = {}).All = "All",
        bn.Robux = "Robux",
        bn.Tickets = "Tickets",
        bn.CustomRobux = "CustomRobux",
        bn.CustomTickets = "CustomTickets",
        bn.Free = "Free",
        (Ln = {}).Asset = "Asset",
        Ln.Bundle = "Bundle",
        (f = {}).Image = "Image",
        f.TShirt = "TShirt",
        f.Audio = "Audio",
        f.Mesh = "Mesh",
        f.Lua = "Lua",
        f.HTML = "HTML",
        f.Text = "Text",
        f.Hat = "Hat",
        f.Place = "Place",
        f.Model = "Model",
        f.Shirt = "Shirt",
        f.Pants = "Pants",
        f.Decal = "Decal",
        f.Avatar = "Avatar",
        f.Head = "Head",
        f.Face = "Face",
        f.Gear = "Gear",
        f.Badge = "Badge",
        f.GroupEmblem = "GroupEmblem",
        f.Animation = "Animation",
        f.Arms = "Arms",
        f.Legs = "Legs",
        f.Torso = "Torso",
        f.RightArm = "RightArm",
        f.LeftArm = "LeftArm",
        f.LeftLeg = "LeftLeg",
        f.RightLeg = "RightLeg",
        f.Package = "Package",
        f.YouTubeVideo = "YouTubeVideo",
        f.GamePass = "GamePass",
        f.App = "App",
        f.Code = "Code",
        f.Plugin = "Plugin",
        f.SolidModel = "SolidModel",
        f.MeshPart = "MeshPart",
        f.HairAccessory = "HairAccessory",
        f.FaceAccessory = "FaceAccessory",
        f.NeckAccessory = "NeckAccessory",
        f.ShoulderAccessory = "ShoulderAccessory",
        f.FrontAccessory = "FrontAccessory",
        f.BackAccessory = "BackAccessory",
        f.WaistAccessory = "WaistAccessory",
        f.ClimbAnimation = "ClimbAnimation",
        f.DeathAnimation = "DeathAnimation",
        f.FallAnimation = "FallAnimation",
        f.IdleAnimation = "IdleAnimation",
        f.JumpAnimation = "JumpAnimation",
        f.RunAnimation = "RunAnimation",
        f.SwimAnimation = "SwimAnimation",
        f.WalkAnimation = "WalkAnimation",
        f.PoseAnimation = "PoseAnimation",
        f.LocalizationTableManifest = "LocalizationTableManifest",
        f.LocalizationTableTranslation = "LocalizationTableTranslation",
        f.EmoteAnimation = "EmoteAnimation",
        f.Video = "Video",
        f.TexturePack = "TexturePack",
        (S = {}).BodyParts = "BodyParts",
        S.AvatarAnimations = "AvatarAnimations",
        (z = {}).All = "All",
        z.Tutorial = "Tutorial",
        z.Scary = "Scary",
        z.TownAndCity = "TownAndCity",
        z.War = "War",
        z.Funny = "Funny",
        z.Fantasy = "Fantasy",
        z.Adventure = "Adventure",
        z.SciFi = "SciFi",
        z.Pirate = "Pirate",
        z.FPS = "FPS",
        z.RPG = "RPG",
        z.Sports = "Sports",
        z.Ninja = "Ninja",
        z.WildWest = "WildWest",
        (J = {}).New = "New",
        J.Sale = "Sale",
        J.XboxExclusive = "XboxExclusive",
        J.AmazonExclusive = "AmazonExclusive",
        J.GooglePlayExclusive = "GooglePlayExclusive",
        J.IosExclusive = "IosExclusive",
        J.SaleTimer = "SaleTimer",
        (X = {}).ThirteenPlus = "ThirteenPlus",
        X.LimitedUnique = "LimitedUnique",
        X.Limited = "Limited",
        X.BuildersClub = "BuildersClub",
        X.TurboBuildersClub = "TurboBuildersClub",
        X.OutrageousBuildersClub = "OutrageousBuildersClub",
        X.Rthro = "Rthro",
        (te = {}).User = "User",
        te.Group = "Group",
        (ne = {}).Asset = "Asset",
        ne.Bundle = "Bundle",
        (re = {}).Image = "Image",
        re.TShirt = "TShirt",
        re.Audio = "Audio",
        re.Mesh = "Mesh",
        re.Lua = "Lua",
        re.HTML = "HTML",
        re.Text = "Text",
        re.Hat = "Hat",
        re.Place = "Place",
        re.Model = "Model",
        re.Shirt = "Shirt",
        re.Pants = "Pants",
        re.Decal = "Decal",
        re.Avatar = "Avatar",
        re.Head = "Head",
        re.Face = "Face",
        re.Gear = "Gear",
        re.Badge = "Badge",
        re.GroupEmblem = "GroupEmblem",
        re.Animation = "Animation",
        re.Arms = "Arms",
        re.Legs = "Legs",
        re.Torso = "Torso",
        re.RightArm = "RightArm",
        re.LeftArm = "LeftArm",
        re.LeftLeg = "LeftLeg",
        re.RightLeg = "RightLeg",
        re.Package = "Package",
        re.YouTubeVideo = "YouTubeVideo",
        re.GamePass = "GamePass",
        re.App = "App",
        re.Code = "Code",
        re.Plugin = "Plugin",
        re.SolidModel = "SolidModel",
        re.MeshPart = "MeshPart",
        re.HairAccessory = "HairAccessory",
        re.FaceAccessory = "FaceAccessory",
        re.NeckAccessory = "NeckAccessory",
        re.ShoulderAccessory = "ShoulderAccessory",
        re.FrontAccessory = "FrontAccessory",
        re.BackAccessory = "BackAccessory",
        re.WaistAccessory = "WaistAccessory",
        re.ClimbAnimation = "ClimbAnimation",
        re.DeathAnimation = "DeathAnimation",
        re.FallAnimation = "FallAnimation",
        re.IdleAnimation = "IdleAnimation",
        re.JumpAnimation = "JumpAnimation",
        re.RunAnimation = "RunAnimation",
        re.SwimAnimation = "SwimAnimation",
        re.WalkAnimation = "WalkAnimation",
        re.PoseAnimation = "PoseAnimation",
        re.LocalizationTableManifest = "LocalizationTableManifest",
        re.LocalizationTableTranslation = "LocalizationTableTranslation",
        re.EmoteAnimation = "EmoteAnimation",
        re.Video = "Video",
        re.TexturePack = "TexturePack",
        (ae = {}).BodyParts = "BodyParts",
        ae.AvatarAnimations = "AvatarAnimations",
        (oe = {}).All = "All",
        oe.Tutorial = "Tutorial",
        oe.Scary = "Scary",
        oe.TownAndCity = "TownAndCity",
        oe.War = "War",
        oe.Funny = "Funny",
        oe.Fantasy = "Fantasy",
        oe.Adventure = "Adventure",
        oe.SciFi = "SciFi",
        oe.Pirate = "Pirate",
        oe.FPS = "FPS",
        oe.RPG = "RPG",
        oe.Sports = "Sports",
        oe.Ninja = "Ninja",
        oe.WildWest = "WildWest",
        (ie = {}).New = "New",
        ie.Sale = "Sale",
        ie.XboxExclusive = "XboxExclusive",
        ie.AmazonExclusive = "AmazonExclusive",
        ie.GooglePlayExclusive = "GooglePlayExclusive",
        ie.IosExclusive = "IosExclusive",
        ie.SaleTimer = "SaleTimer",
        (pe = {}).ThirteenPlus = "ThirteenPlus",
        pe.LimitedUnique = "LimitedUnique",
        pe.Limited = "Limited",
        pe.BuildersClub = "BuildersClub",
        pe.TurboBuildersClub = "TurboBuildersClub",
        pe.OutrageousBuildersClub = "OutrageousBuildersClub",
        pe.Rthro = "Rthro",
        (I = {}).User = "User",
        I.Group = "Group",
        (Hr = {}).Accessories = "Accessories",
        Hr.All = "All",
        Hr.AvatarAnimations = "AvatarAnimations",
        Hr.BodyParts = "BodyParts",
        Hr.Clothing = "Clothing",
        Hr.Collectibles = "Collectibles",
        Hr.Featured = "Featured",
        Hr.Gear = "Gear",
        Hr.CommunityCreations = "CommunityCreations",
        Hr.Premium = "Premium",
        Hr.Recommended = "Recommended",
        (Zr = {}).Accessories = "Accessories",
        Zr.All = "All",
        Zr.AvatarAnimations = "AvatarAnimations",
        Zr.BackAccessories = "BackAccessories",
        Zr.BodyParts = "BodyParts",
        Zr.Clothing = "Clothing",
        Zr.Collectibles = "Collectibles",
        Zr.FaceAccessories = "FaceAccessories",
        Zr.Faces = "Faces",
        Zr.Featured = "Featured",
        Zr.FrontAccessories = "FrontAccessories",
        Zr.Gear = "Gear",
        Zr.HairAccessories = "HairAccessories",
        Zr.Hats = "Hats",
        Zr.Heads = "Heads",
        Zr.NeckAccessories = "NeckAccessories",
        Zr.Pants = "Pants",
        Zr.Shirts = "Shirts",
        Zr.ShoulderAccessories = "ShoulderAccessories",
        Zr.Tshirts = "Tshirts",
        Zr.WaistAccessories = "WaistAccessories",
        Zr.Bundles = "Bundles",
        Zr.AnimationBundles = "AnimationBundles",
        Zr.EmoteAnimations = "EmoteAnimations",
        Zr.CommunityCreations = "CommunityCreations",
        Zr.Melee = "Melee",
        Zr.Ranged = "Ranged",
        Zr.Explosive = "Explosive",
        Zr.PowerUp = "PowerUp",
        Zr.Navigation = "Navigation",
        Zr.Musical = "Musical",
        Zr.Social = "Social",
        Zr.Building = "Building",
        Zr.Transport = "Transport",
        Zr.Premium = "Premium",
        Zr.Recommended = "Recommended",
        (bn = {}).Past12Hours = "Past12Hours",
        bn.PastDay = "PastDay",
        bn.Past3Days = "Past3Days",
        bn.PastWeek = "PastWeek",
        bn.PastMonth = "PastMonth",
        bn.AllTime = "AllTime",
        (Ln = {}).All = "All",
        Ln.Robux = "Robux",
        Ln.Tickets = "Tickets",
        Ln.CustomRobux = "CustomRobux",
        Ln.CustomTickets = "CustomTickets",
        Ln.Free = "Free",
        (f = {}).TownAndCity = "TownAndCity",
        f.Medieval = "Medieval",
        f.SciFi = "SciFi",
        f.Fighting = "Fighting",
        f.Horror = "Horror",
        f.Naval = "Naval",
        f.Adventure = "Adventure",
        f.Sports = "Sports",
        f.Comedy = "Comedy",
        f.Western = "Western",
        f.Military = "Military",
        f.Building = "Building",
        f.Fps = "Fps",
        f.Rpg = "Rpg",
        (S = {}).Relevance = "Relevance",
        S.Favorited = "Favorited",
        S.Sales = "Sales",
        S.Updated = "Updated",
        S.PriceAsc = "PriceAsc",
        S.PriceDesc = "PriceDesc",
        (z = {}).User = "User",
        z.Group = "Group",
        (J = {}).Asset = "Asset",
        J.Bundle = "Bundle",
        (X = {}).Accessories = "Accessories",
        X.All = "All",
        X.AvatarAnimations = "AvatarAnimations",
        X.BodyParts = "BodyParts",
        X.Clothing = "Clothing",
        X.Collectibles = "Collectibles",
        X.Featured = "Featured",
        X.Gear = "Gear",
        X.CommunityCreations = "CommunityCreations",
        X.Premium = "Premium",
        X.Recommended = "Recommended",
        (te = {}).TownAndCity = "TownAndCity",
        te.Medieval = "Medieval",
        te.SciFi = "SciFi",
        te.Fighting = "Fighting",
        te.Horror = "Horror",
        te.Naval = "Naval",
        te.Adventure = "Adventure",
        te.Sports = "Sports",
        te.Comedy = "Comedy",
        te.Western = "Western",
        te.Military = "Military",
        te.Building = "Building",
        te.Fps = "Fps",
        te.Rpg = "Rpg",
        (ne = {}).Asset = "Asset",
        ne.Bundle = "Bundle",
        (re = {}).All = "All",
        re.Robux = "Robux",
        re.Tickets = "Tickets",
        re.CustomRobux = "CustomRobux",
        re.CustomTickets = "CustomTickets",
        re.Free = "Free",
        (ae = {}).Past12Hours = "Past12Hours",
        ae.PastDay = "PastDay",
        ae.Past3Days = "Past3Days",
        ae.PastWeek = "PastWeek",
        ae.PastMonth = "PastMonth",
        ae.AllTime = "AllTime",
        (oe = {}).Relevance = "Relevance",
        oe.Favorited = "Favorited",
        oe.Sales = "Sales",
        oe.Updated = "Updated",
        oe.PriceAsc = "PriceAsc",
        oe.PriceDesc = "PriceDesc",
        (ie = {}).Asc = "Asc",
        ie.Desc = "Desc",
        (pe = {}).Accessories = "Accessories",
        pe.All = "All",
        pe.AvatarAnimations = "AvatarAnimations",
        pe.BackAccessories = "BackAccessories",
        pe.BodyParts = "BodyParts",
        pe.Clothing = "Clothing",
        pe.Collectibles = "Collectibles",
        pe.FaceAccessories = "FaceAccessories",
        pe.Faces = "Faces",
        pe.Featured = "Featured",
        pe.FrontAccessories = "FrontAccessories",
        pe.Gear = "Gear",
        pe.HairAccessories = "HairAccessories",
        pe.Hats = "Hats",
        pe.Heads = "Heads",
        pe.NeckAccessories = "NeckAccessories",
        pe.Pants = "Pants",
        pe.Shirts = "Shirts",
        pe.ShoulderAccessories = "ShoulderAccessories",
        pe.Tshirts = "Tshirts",
        pe.WaistAccessories = "WaistAccessories",
        pe.Bundles = "Bundles",
        pe.AnimationBundles = "AnimationBundles",
        pe.EmoteAnimations = "EmoteAnimations",
        pe.CommunityCreations = "CommunityCreations",
        pe.Melee = "Melee",
        pe.Ranged = "Ranged",
        pe.Explosive = "Explosive",
        pe.PowerUp = "PowerUp",
        pe.Navigation = "Navigation",
        pe.Musical = "Musical",
        pe.Social = "Social",
        pe.Building = "Building",
        pe.Transport = "Transport",
        pe.Premium = "Premium",
        pe.Recommended = "Recommended",
        (I = {}).Asc = "Asc",
        I.Desc = "Desc",
        (Hr = {}).Forward = "Forward",
        Hr.Backward = "Backward",
        (Zr = {}).Asc = "Asc",
        Zr.Desc = "Desc",
        (bn = {}).Forward = "Forward",
        bn.Backward = "Backward",
        (Ln = {}).Asc = "Asc",
        Ln.Desc = "Desc",
        (f = {}).Forward = "Forward",
        f.Backward = "Backward",
        (S = {}).Asc = "Asc",
        S.Desc = "Desc",
        (z = {}).Forward = "Forward",
        z.Backward = "Backward";
        var Dt, J = (fe(_t, Dt = Z),
        _t.prototype.v1AssetsAssetIdBundlesGet = function(e, t, n, r, a) {
            var o = this;
            return Ot(this.configuration).v1AssetsAssetIdBundlesGet(e, t, n, r, a).then(function(e) {
                return e(o.axios, o.basePath)
            })
        }
        ,
        _t.prototype.v1BundlesBundleIdDetailsGet = function(e, t) {
            var n = this;
            return Ot(this.configuration).v1BundlesBundleIdDetailsGet(e, t).then(function(e) {
                return e(n.axios, n.basePath)
            })
        }
        ,
        _t.prototype.v1BundlesBundleIdRecommendationsGet = function(e, t, n) {
            var r = this;
            return Ot(this.configuration).v1BundlesBundleIdRecommendationsGet(e, t, n).then(function(e) {
                return e(r.axios, r.basePath)
            })
        }
        ,
        _t.prototype.v1BundlesBundleIdUnpackPost = function(e, t) {
            var n = this;
            return Ot(this.configuration).v1BundlesBundleIdUnpackPost(e, t).then(function(e) {
                return e(n.axios, n.basePath)
            })
        }
        ,
        _t.prototype.v1BundlesDetailsGet = function(e, t) {
            var n = this;
            return Ot(this.configuration).v1BundlesDetailsGet(e, t).then(function(e) {
                return e(n.axios, n.basePath)
            })
        }
        ,
        _t.prototype.v1UsersUserIdBundlesBundleTypeGet = function(e, t, n, r, a, o) {
            var i = this;
            return Ot(this.configuration).v1UsersUserIdBundlesBundleTypeGet(e, t, n, r, a, o).then(function(e) {
                return e(i.axios, i.basePath)
            })
        }
        ,
        _t.prototype.v1UsersUserIdBundlesGet = function(e, t, n, r, a) {
            var o = this;
            return Ot(this.configuration).v1UsersUserIdBundlesGet(e, t, n, r, a).then(function(e) {
                return e(o.axios, o.basePath)
            })
        }
        ,
        _t);
        function _t() {
            return null !== Dt && Dt.apply(this, arguments) || this
        }
        function xt(c) {
            var e = this;
            return {
                v1CatalogItemsDetailsPost: function(i, s) {
                    return void 0 === s && (s = {}),
                    Lt(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return qt(this, function(e) {
                            if (null == i)
                                throw new At("model","Required parameter model was null or undefined when calling v1CatalogItemsDetailsPost.");
                            return t = wt.qg("/v1/catalog/items/details", !0),
                            c && (o = c.baseOptions),
                            n = Rt(Rt({
                                method: "POST"
                            }, o), s),
                            a = {},
                            (r = {})["Content-Type"] = "application/json",
                            t.query = Rt(Rt(Rt({}, t.query), a), s.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = Rt(Rt(Rt({}, r), o), s.headers),
                            o = "string" != typeof i || "application/json" === n.headers["Content-Type"],
                            n.data = o ? JSON.stringify(void 0 !== i ? i : {}) : i || "",
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1CatalogItemsItemIdDetailsGet: function(i, s, u) {
                    return void 0 === u && (u = {}),
                    Lt(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return qt(this, function(e) {
                            if (null == i)
                                throw new At("itemId","Required parameter itemId was null or undefined when calling v1CatalogItemsItemIdDetailsGet.");
                            if (null == s)
                                throw new At("itemType","Required parameter itemType was null or undefined when calling v1CatalogItemsItemIdDetailsGet.");
                            return a = "/v1/catalog/items/{itemId}/details".replace("{itemId}", encodeURIComponent(String(i))),
                            t = wt.qg(a, !0),
                            c && (o = c.baseOptions),
                            n = Rt(Rt({
                                method: "GET"
                            }, o), u),
                            r = {},
                            a = {},
                            void 0 !== s && (a.itemType = s),
                            t.query = Rt(Rt(Rt({}, t.query), a), u.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = Rt(Rt(Rt({}, r), o), u.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1CatalogMetadataGet: function(i) {
                    return void 0 === i && (i = {}),
                    Lt(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return qt(this, function(e) {
                            return t = wt.qg("/v1/catalog/metadata", !0),
                            c && (o = c.baseOptions),
                            n = Rt(Rt({
                                method: "GET"
                            }, o), i),
                            r = {},
                            a = {},
                            t.query = Rt(Rt(Rt({}, t.query), a), i.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = Rt(Rt(Rt({}, r), o), i.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1CatalogSortsGet: function(i) {
                    return void 0 === i && (i = {}),
                    Lt(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return qt(this, function(e) {
                            return t = wt.qg("/v1/catalog/sorts", !0),
                            c && (o = c.baseOptions),
                            n = Rt(Rt({
                                method: "GET"
                            }, o), i),
                            r = {},
                            a = {},
                            t.query = Rt(Rt(Rt({}, t.query), a), i.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = Rt(Rt(Rt({}, r), o), i.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                }
            }
        }
        function Bt(o) {
            return {
                v1CatalogItemsDetailsPost: function(t, r) {
                    return Lt(this, void 0, Promise, function() {
                        var n;
                        return qt(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, xt(o).v1CatalogItemsDetailsPost(t, r)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = Ct);
                                    t = Rt(Rt({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1CatalogItemsItemIdDetailsGet: function(t, r, a) {
                    return Lt(this, void 0, Promise, function() {
                        var n;
                        return qt(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, xt(o).v1CatalogItemsItemIdDetailsGet(t, r, a)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = Ct);
                                    t = Rt(Rt({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1CatalogMetadataGet: function(t) {
                    return Lt(this, void 0, Promise, function() {
                        var n;
                        return qt(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, xt(o).v1CatalogMetadataGet(t)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = Ct);
                                    t = Rt(Rt({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1CatalogSortsGet: function(t) {
                    return Lt(this, void 0, Promise, function() {
                        var n;
                        return qt(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, xt(o).v1CatalogSortsGet(t)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = Ct);
                                    t = Rt(Rt({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                }
            }
        }
        var Nt, Ft, kt, Mt, X = (fe(jt, Nt = Z),
        jt.prototype.v1CatalogItemsDetailsPost = function(e, t) {
            var n = this;
            return Bt(this.configuration).v1CatalogItemsDetailsPost(e, t).then(function(e) {
                return e(n.axios, n.basePath)
            })
        }
        ,
        jt.prototype.v1CatalogItemsItemIdDetailsGet = function(e, t, n) {
            var r = this;
            return Bt(this.configuration).v1CatalogItemsItemIdDetailsGet(e, t, n).then(function(e) {
                return e(r.axios, r.basePath)
            })
        }
        ,
        jt.prototype.v1CatalogMetadataGet = function(e) {
            var t = this;
            return Bt(this.configuration).v1CatalogMetadataGet(e).then(function(e) {
                return e(t.axios, t.basePath)
            })
        }
        ,
        jt.prototype.v1CatalogSortsGet = function(e) {
            var t = this;
            return Bt(this.configuration).v1CatalogSortsGet(e).then(function(e) {
                return e(t.axios, t.basePath)
            })
        }
        ,
        jt);
        function jt() {
            return null !== Nt && Nt.apply(this, arguments) || this
        }
        function zt(s) {
            var e = this;
            return {
                v1AssetToCategoryGet: function(i) {
                    return void 0 === i && (i = {}),
                    Lt(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return qt(this, function(e) {
                            return t = wt.qg("/v1/asset-to-category", !0),
                            s && (o = s.baseOptions),
                            n = Rt(Rt({
                                method: "GET"
                            }, o), i),
                            r = {},
                            a = {},
                            t.query = Rt(Rt(Rt({}, t.query), a), i.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = Rt(Rt(Rt({}, r), o), i.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1AssetToSubcategoryGet: function(i) {
                    return void 0 === i && (i = {}),
                    Lt(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return qt(this, function(e) {
                            return t = wt.qg("/v1/asset-to-subcategory", !0),
                            s && (o = s.baseOptions),
                            n = Rt(Rt({
                                method: "GET"
                            }, o), i),
                            r = {},
                            a = {},
                            t.query = Rt(Rt(Rt({}, t.query), a), i.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = Rt(Rt(Rt({}, r), o), i.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1CategoriesGet: function(i) {
                    return void 0 === i && (i = {}),
                    Lt(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return qt(this, function(e) {
                            return t = wt.qg("/v1/categories", !0),
                            s && (o = s.baseOptions),
                            n = Rt(Rt({
                                method: "GET"
                            }, o), i),
                            r = {},
                            a = {},
                            t.query = Rt(Rt(Rt({}, t.query), a), i.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = Rt(Rt(Rt({}, r), o), i.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1SubcategoriesGet: function(i) {
                    return void 0 === i && (i = {}),
                    Lt(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return qt(this, function(e) {
                            return t = wt.qg("/v1/subcategories", !0),
                            s && (o = s.baseOptions),
                            n = Rt(Rt({
                                method: "GET"
                            }, o), i),
                            r = {},
                            a = {},
                            t.query = Rt(Rt(Rt({}, t.query), a), i.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = Rt(Rt(Rt({}, r), o), i.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                }
            }
        }
        function Vt(r) {
            return {
                v1AssetToCategoryGet: function(t) {
                    return Lt(this, void 0, Promise, function() {
                        var n;
                        return qt(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, zt(r).v1AssetToCategoryGet(t)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = Ct);
                                    t = Rt(Rt({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1AssetToSubcategoryGet: function(t) {
                    return Lt(this, void 0, Promise, function() {
                        var n;
                        return qt(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, zt(r).v1AssetToSubcategoryGet(t)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = Ct);
                                    t = Rt(Rt({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1CategoriesGet: function(t) {
                    return Lt(this, void 0, Promise, function() {
                        var n;
                        return qt(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, zt(r).v1CategoriesGet(t)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = Ct);
                                    t = Rt(Rt({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1SubcategoriesGet: function(t) {
                    return Lt(this, void 0, Promise, function() {
                        var n;
                        return qt(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, zt(r).v1SubcategoriesGet(t)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = Ct);
                                    t = Rt(Rt({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                }
            }
        }
        function Ht() {
            return null !== Ft && Ft.apply(this, arguments) || this
        }
        function Wt(a) {
            return {
                v1ExclusiveItemsAppStoreTypeBundlesGet: function(t, r) {
                    return Lt(this, void 0, Promise, function() {
                        var n;
                        return qt(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, function(u) {
                                    var e = this;
                                    return {
                                        v1ExclusiveItemsAppStoreTypeBundlesGet: function(i, s) {
                                            return void 0 === s && (s = {}),
                                            Lt(e, void 0, Promise, function() {
                                                var t, n, r, a, o;
                                                return qt(this, function(e) {
                                                    if (null == i)
                                                        throw new At("appStoreType","Required parameter appStoreType was null or undefined when calling v1ExclusiveItemsAppStoreTypeBundlesGet.");
                                                    return a = "/v1/exclusive-items/{appStoreType}/bundles".replace("{appStoreType}", encodeURIComponent(String(i))),
                                                    t = wt.qg(a, !0),
                                                    u && (o = u.baseOptions),
                                                    n = Rt(Rt({
                                                        method: "GET"
                                                    }, o), s),
                                                    r = {},
                                                    a = {},
                                                    t.query = Rt(Rt(Rt({}, t.query), a), s.query),
                                                    delete t.search,
                                                    o = o && o.headers ? o.headers : {},
                                                    n.headers = Rt(Rt(Rt({}, r), o), s.headers),
                                                    [2, {
                                                        url: wt.GP(t),
                                                        options: n
                                                    }]
                                                })
                                            })
                                        }
                                    }
                                }(a).v1ExclusiveItemsAppStoreTypeBundlesGet(t, r)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = Ct);
                                    t = Rt(Rt({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                }
            }
        }
        function Kt() {
            return null !== kt && kt.apply(this, arguments) || this
        }
        function Xt(c) {
            var e = this;
            return {
                v1FavoritesAssetsAssetIdCountGet: function(i, s) {
                    return void 0 === s && (s = {}),
                    Lt(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return qt(this, function(e) {
                            if (null == i)
                                throw new At("assetId","Required parameter assetId was null or undefined when calling v1FavoritesAssetsAssetIdCountGet.");
                            return a = "/v1/favorites/assets/{assetId}/count".replace("{assetId}", encodeURIComponent(String(i))),
                            t = wt.qg(a, !0),
                            c && (o = c.baseOptions),
                            n = Rt(Rt({
                                method: "GET"
                            }, o), s),
                            r = {},
                            a = {},
                            t.query = Rt(Rt(Rt({}, t.query), a), s.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = Rt(Rt(Rt({}, r), o), s.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1FavoritesBundlesBundleIdCountGet: function(i, s) {
                    return void 0 === s && (s = {}),
                    Lt(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return qt(this, function(e) {
                            if (null == i)
                                throw new At("bundleId","Required parameter bundleId was null or undefined when calling v1FavoritesBundlesBundleIdCountGet.");
                            return a = "/v1/favorites/bundles/{bundleId}/count".replace("{bundleId}", encodeURIComponent(String(i))),
                            t = wt.qg(a, !0),
                            c && (o = c.baseOptions),
                            n = Rt(Rt({
                                method: "GET"
                            }, o), s),
                            r = {},
                            a = {},
                            t.query = Rt(Rt(Rt({}, t.query), a), s.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = Rt(Rt(Rt({}, r), o), s.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1FavoritesUsersUserIdAssetsAssetIdFavoriteDelete: function(i, s, u) {
                    return void 0 === u && (u = {}),
                    Lt(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return qt(this, function(e) {
                            if (null == i)
                                throw new At("userId","Required parameter userId was null or undefined when calling v1FavoritesUsersUserIdAssetsAssetIdFavoriteDelete.");
                            if (null == s)
                                throw new At("assetId","Required parameter assetId was null or undefined when calling v1FavoritesUsersUserIdAssetsAssetIdFavoriteDelete.");
                            return a = "/v1/favorites/users/{userId}/assets/{assetId}/favorite".replace("{userId}", encodeURIComponent(String(i))).replace("{assetId}", encodeURIComponent(String(s))),
                            t = wt.qg(a, !0),
                            c && (o = c.baseOptions),
                            n = Rt(Rt({
                                method: "DELETE"
                            }, o), u),
                            r = {},
                            a = {},
                            t.query = Rt(Rt(Rt({}, t.query), a), u.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = Rt(Rt(Rt({}, r), o), u.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1FavoritesUsersUserIdAssetsAssetIdFavoriteGet: function(i, s, u) {
                    return void 0 === u && (u = {}),
                    Lt(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return qt(this, function(e) {
                            if (null == i)
                                throw new At("userId","Required parameter userId was null or undefined when calling v1FavoritesUsersUserIdAssetsAssetIdFavoriteGet.");
                            if (null == s)
                                throw new At("assetId","Required parameter assetId was null or undefined when calling v1FavoritesUsersUserIdAssetsAssetIdFavoriteGet.");
                            return a = "/v1/favorites/users/{userId}/assets/{assetId}/favorite".replace("{userId}", encodeURIComponent(String(i))).replace("{assetId}", encodeURIComponent(String(s))),
                            t = wt.qg(a, !0),
                            c && (o = c.baseOptions),
                            n = Rt(Rt({
                                method: "GET"
                            }, o), u),
                            r = {},
                            a = {},
                            t.query = Rt(Rt(Rt({}, t.query), a), u.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = Rt(Rt(Rt({}, r), o), u.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1FavoritesUsersUserIdAssetsAssetIdFavoritePost: function(i, s, u) {
                    return void 0 === u && (u = {}),
                    Lt(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return qt(this, function(e) {
                            if (null == i)
                                throw new At("userId","Required parameter userId was null or undefined when calling v1FavoritesUsersUserIdAssetsAssetIdFavoritePost.");
                            if (null == s)
                                throw new At("assetId","Required parameter assetId was null or undefined when calling v1FavoritesUsersUserIdAssetsAssetIdFavoritePost.");
                            return a = "/v1/favorites/users/{userId}/assets/{assetId}/favorite".replace("{userId}", encodeURIComponent(String(i))).replace("{assetId}", encodeURIComponent(String(s))),
                            t = wt.qg(a, !0),
                            c && (o = c.baseOptions),
                            n = Rt(Rt({
                                method: "POST"
                            }, o), u),
                            r = {},
                            a = {},
                            t.query = Rt(Rt(Rt({}, t.query), a), u.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = Rt(Rt(Rt({}, r), o), u.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1FavoritesUsersUserIdBundlesBundleIdFavoriteDelete: function(i, s, u) {
                    return void 0 === u && (u = {}),
                    Lt(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return qt(this, function(e) {
                            if (null == i)
                                throw new At("userId","Required parameter userId was null or undefined when calling v1FavoritesUsersUserIdBundlesBundleIdFavoriteDelete.");
                            if (null == s)
                                throw new At("bundleId","Required parameter bundleId was null or undefined when calling v1FavoritesUsersUserIdBundlesBundleIdFavoriteDelete.");
                            return a = "/v1/favorites/users/{userId}/bundles/{bundleId}/favorite".replace("{userId}", encodeURIComponent(String(i))).replace("{bundleId}", encodeURIComponent(String(s))),
                            t = wt.qg(a, !0),
                            c && (o = c.baseOptions),
                            n = Rt(Rt({
                                method: "DELETE"
                            }, o), u),
                            r = {},
                            a = {},
                            t.query = Rt(Rt(Rt({}, t.query), a), u.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = Rt(Rt(Rt({}, r), o), u.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1FavoritesUsersUserIdBundlesBundleIdFavoriteGet: function(i, s, u) {
                    return void 0 === u && (u = {}),
                    Lt(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return qt(this, function(e) {
                            if (null == i)
                                throw new At("userId","Required parameter userId was null or undefined when calling v1FavoritesUsersUserIdBundlesBundleIdFavoriteGet.");
                            if (null == s)
                                throw new At("bundleId","Required parameter bundleId was null or undefined when calling v1FavoritesUsersUserIdBundlesBundleIdFavoriteGet.");
                            return a = "/v1/favorites/users/{userId}/bundles/{bundleId}/favorite".replace("{userId}", encodeURIComponent(String(i))).replace("{bundleId}", encodeURIComponent(String(s))),
                            t = wt.qg(a, !0),
                            c && (o = c.baseOptions),
                            n = Rt(Rt({
                                method: "GET"
                            }, o), u),
                            r = {},
                            a = {},
                            t.query = Rt(Rt(Rt({}, t.query), a), u.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = Rt(Rt(Rt({}, r), o), u.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1FavoritesUsersUserIdBundlesBundleIdFavoritePost: function(i, s, u) {
                    return void 0 === u && (u = {}),
                    Lt(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return qt(this, function(e) {
                            if (null == i)
                                throw new At("userId","Required parameter userId was null or undefined when calling v1FavoritesUsersUserIdBundlesBundleIdFavoritePost.");
                            if (null == s)
                                throw new At("bundleId","Required parameter bundleId was null or undefined when calling v1FavoritesUsersUserIdBundlesBundleIdFavoritePost.");
                            return a = "/v1/favorites/users/{userId}/bundles/{bundleId}/favorite".replace("{userId}", encodeURIComponent(String(i))).replace("{bundleId}", encodeURIComponent(String(s))),
                            t = wt.qg(a, !0),
                            c && (o = c.baseOptions),
                            n = Rt(Rt({
                                method: "POST"
                            }, o), u),
                            r = {},
                            a = {},
                            t.query = Rt(Rt(Rt({}, t.query), a), u.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = Rt(Rt(Rt({}, r), o), u.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                }
            }
        }
        function Jt(o) {
            return {
                v1FavoritesAssetsAssetIdCountGet: function(t, r) {
                    return Lt(this, void 0, Promise, function() {
                        var n;
                        return qt(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Xt(o).v1FavoritesAssetsAssetIdCountGet(t, r)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = Ct);
                                    t = Rt(Rt({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1FavoritesBundlesBundleIdCountGet: function(t, r) {
                    return Lt(this, void 0, Promise, function() {
                        var n;
                        return qt(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Xt(o).v1FavoritesBundlesBundleIdCountGet(t, r)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = Ct);
                                    t = Rt(Rt({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1FavoritesUsersUserIdAssetsAssetIdFavoriteDelete: function(t, r, a) {
                    return Lt(this, void 0, Promise, function() {
                        var n;
                        return qt(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Xt(o).v1FavoritesUsersUserIdAssetsAssetIdFavoriteDelete(t, r, a)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = Ct);
                                    t = Rt(Rt({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1FavoritesUsersUserIdAssetsAssetIdFavoriteGet: function(t, r, a) {
                    return Lt(this, void 0, Promise, function() {
                        var n;
                        return qt(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Xt(o).v1FavoritesUsersUserIdAssetsAssetIdFavoriteGet(t, r, a)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = Ct);
                                    t = Rt(Rt({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1FavoritesUsersUserIdAssetsAssetIdFavoritePost: function(t, r, a) {
                    return Lt(this, void 0, Promise, function() {
                        var n;
                        return qt(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Xt(o).v1FavoritesUsersUserIdAssetsAssetIdFavoritePost(t, r, a)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = Ct);
                                    t = Rt(Rt({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1FavoritesUsersUserIdBundlesBundleIdFavoriteDelete: function(t, r, a) {
                    return Lt(this, void 0, Promise, function() {
                        var n;
                        return qt(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Xt(o).v1FavoritesUsersUserIdBundlesBundleIdFavoriteDelete(t, r, a)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = Ct);
                                    t = Rt(Rt({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1FavoritesUsersUserIdBundlesBundleIdFavoriteGet: function(t, r, a) {
                    return Lt(this, void 0, Promise, function() {
                        var n;
                        return qt(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Xt(o).v1FavoritesUsersUserIdBundlesBundleIdFavoriteGet(t, r, a)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = Ct);
                                    t = Rt(Rt({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1FavoritesUsersUserIdBundlesBundleIdFavoritePost: function(t, r, a) {
                    return Lt(this, void 0, Promise, function() {
                        var n;
                        return qt(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Xt(o).v1FavoritesUsersUserIdBundlesBundleIdFavoritePost(t, r, a)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = Ct);
                                    t = Rt(Rt({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                }
            }
        }
        function Qt() {
            return null !== Mt && Mt.apply(this, arguments) || this
        }
        function Yt(l) {
            var e = this;
            return {
                v1RecommendationsAssetAssetTypeIdGet: function(i, s, u, c) {
                    return void 0 === c && (c = {}),
                    Lt(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return qt(this, function(e) {
                            if (null == i)
                                throw new At("assetTypeId","Required parameter assetTypeId was null or undefined when calling v1RecommendationsAssetAssetTypeIdGet.");
                            return a = "/v1/recommendations/asset/{assetTypeId}".replace("{assetTypeId}", encodeURIComponent(String(i))),
                            t = wt.qg(a, !0),
                            l && (o = l.baseOptions),
                            n = Rt(Rt({
                                method: "GET"
                            }, o), c),
                            r = {},
                            a = {},
                            void 0 !== s && (a.numItems = s),
                            void 0 !== u && (a.contextAssetId = u),
                            t.query = Rt(Rt(Rt({}, t.query), a), c.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = Rt(Rt(Rt({}, r), o), c.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1RecommendationsMetadataGet: function(i, s) {
                    return void 0 === s && (s = {}),
                    Lt(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return qt(this, function(e) {
                            return t = wt.qg("/v1/recommendations/metadata", !0),
                            l && (o = l.baseOptions),
                            n = Rt(Rt({
                                method: "GET"
                            }, o), s),
                            r = {},
                            a = {},
                            void 0 !== i && (a.page = i),
                            t.query = Rt(Rt(Rt({}, t.query), a), s.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = Rt(Rt(Rt({}, r), o), s.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                }
            }
        }
        function $t(i) {
            return {
                v1RecommendationsAssetAssetTypeIdGet: function(t, r, a, o) {
                    return Lt(this, void 0, Promise, function() {
                        var n;
                        return qt(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Yt(i).v1RecommendationsAssetAssetTypeIdGet(t, r, a, o)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = Ct);
                                    t = Rt(Rt({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1RecommendationsMetadataGet: function(t, r) {
                    return Lt(this, void 0, Promise, function() {
                        var n;
                        return qt(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Yt(i).v1RecommendationsMetadataGet(t, r)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = Ct);
                                    t = Rt(Rt({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                }
            }
        }
        fe(Ht, Ft = Z),
        Ht.prototype.v1AssetToCategoryGet = function(e) {
            var t = this;
            return Vt(this.configuration).v1AssetToCategoryGet(e).then(function(e) {
                return e(t.axios, t.basePath)
            })
        }
        ,
        Ht.prototype.v1AssetToSubcategoryGet = function(e) {
            var t = this;
            return Vt(this.configuration).v1AssetToSubcategoryGet(e).then(function(e) {
                return e(t.axios, t.basePath)
            })
        }
        ,
        Ht.prototype.v1CategoriesGet = function(e) {
            var t = this;
            return Vt(this.configuration).v1CategoriesGet(e).then(function(e) {
                return e(t.axios, t.basePath)
            })
        }
        ,
        Ht.prototype.v1SubcategoriesGet = function(e) {
            var t = this;
            return Vt(this.configuration).v1SubcategoriesGet(e).then(function(e) {
                return e(t.axios, t.basePath)
            })
        }
        ,
        fe(Kt, kt = Z),
        Kt.prototype.v1ExclusiveItemsAppStoreTypeBundlesGet = function(e, t) {
            var n = this;
            return Wt(this.configuration).v1ExclusiveItemsAppStoreTypeBundlesGet(e, t).then(function(e) {
                return e(n.axios, n.basePath)
            })
        }
        ,
        fe(Qt, Mt = Z),
        Qt.prototype.v1FavoritesAssetsAssetIdCountGet = function(e, t) {
            var n = this;
            return Jt(this.configuration).v1FavoritesAssetsAssetIdCountGet(e, t).then(function(e) {
                return e(n.axios, n.basePath)
            })
        }
        ,
        Qt.prototype.v1FavoritesBundlesBundleIdCountGet = function(e, t) {
            var n = this;
            return Jt(this.configuration).v1FavoritesBundlesBundleIdCountGet(e, t).then(function(e) {
                return e(n.axios, n.basePath)
            })
        }
        ,
        Qt.prototype.v1FavoritesUsersUserIdAssetsAssetIdFavoriteDelete = function(e, t, n) {
            var r = this;
            return Jt(this.configuration).v1FavoritesUsersUserIdAssetsAssetIdFavoriteDelete(e, t, n).then(function(e) {
                return e(r.axios, r.basePath)
            })
        }
        ,
        Qt.prototype.v1FavoritesUsersUserIdAssetsAssetIdFavoriteGet = function(e, t, n) {
            var r = this;
            return Jt(this.configuration).v1FavoritesUsersUserIdAssetsAssetIdFavoriteGet(e, t, n).then(function(e) {
                return e(r.axios, r.basePath)
            })
        }
        ,
        Qt.prototype.v1FavoritesUsersUserIdAssetsAssetIdFavoritePost = function(e, t, n) {
            var r = this;
            return Jt(this.configuration).v1FavoritesUsersUserIdAssetsAssetIdFavoritePost(e, t, n).then(function(e) {
                return e(r.axios, r.basePath)
            })
        }
        ,
        Qt.prototype.v1FavoritesUsersUserIdBundlesBundleIdFavoriteDelete = function(e, t, n) {
            var r = this;
            return Jt(this.configuration).v1FavoritesUsersUserIdBundlesBundleIdFavoriteDelete(e, t, n).then(function(e) {
                return e(r.axios, r.basePath)
            })
        }
        ,
        Qt.prototype.v1FavoritesUsersUserIdBundlesBundleIdFavoriteGet = function(e, t, n) {
            var r = this;
            return Jt(this.configuration).v1FavoritesUsersUserIdBundlesBundleIdFavoriteGet(e, t, n).then(function(e) {
                return e(r.axios, r.basePath)
            })
        }
        ,
        Qt.prototype.v1FavoritesUsersUserIdBundlesBundleIdFavoritePost = function(e, t, n) {
            var r = this;
            return Jt(this.configuration).v1FavoritesUsersUserIdBundlesBundleIdFavoritePost(e, t, n).then(function(e) {
                return e(r.axios, r.basePath)
            })
        }
        ;
        var Zt, en, te = (fe(tn, Zt = Z),
        tn.prototype.v1RecommendationsAssetAssetTypeIdGet = function(e, t, n, r) {
            var a = this;
            return $t(this.configuration).v1RecommendationsAssetAssetTypeIdGet(e, t, n, r).then(function(e) {
                return e(a.axios, a.basePath)
            })
        }
        ,
        tn.prototype.v1RecommendationsMetadataGet = function(e, t) {
            var n = this;
            return $t(this.configuration).v1RecommendationsMetadataGet(e, t).then(function(e) {
                return e(n.axios, n.basePath)
            })
        }
        ,
        tn);
        function tn() {
            return null !== Zt && Zt.apply(this, arguments) || this
        }
        function nn(C) {
            var e = this;
            return {
                v1SearchItemsDetailsGet: function(i, s, u, c, l, d, h, v, p, f, m, g, I, y, P, G, b, w) {
                    return void 0 === w && (w = {}),
                    Lt(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return qt(this, function(e) {
                            return t = wt.qg("/v1/search/items/details", !0),
                            C && (o = C.baseOptions),
                            n = Rt(Rt({
                                method: "GET"
                            }, o), w),
                            r = {},
                            a = {},
                            void 0 !== i && (a["model.category"] = i),
                            void 0 !== s && (a["model.subcategory"] = s),
                            void 0 !== u && (a["model.sortAggregation"] = u),
                            void 0 !== c && (a["model.sortCurrency"] = c),
                            l && (a["model.genres"] = l),
                            void 0 !== d && (a["model.sortType"] = d),
                            void 0 !== h && (a["model.creatorType"] = h),
                            void 0 !== v && (a["model.creatorTargetId"] = v),
                            void 0 !== p && (a["model.creatorName"] = p),
                            void 0 !== f && (a["model.maxPrice"] = f),
                            void 0 !== m && (a["model.minPrice"] = m),
                            void 0 !== g && (a["model.keyword"] = g),
                            void 0 !== I && (a["model.includeNotForSale"] = I),
                            y && (a["model.tagNames"] = y),
                            void 0 !== P && (a.sortOrder = P),
                            void 0 !== G && (a.limit = G),
                            void 0 !== b && (a.cursor = b),
                            t.query = Rt(Rt(Rt({}, t.query), a), w.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = Rt(Rt(Rt({}, r), o), w.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1SearchItemsGet: function(i, s, u, c, l, d, h, v, p, f, m, g, I, y, P, G, b, w) {
                    return void 0 === w && (w = {}),
                    Lt(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return qt(this, function(e) {
                            return t = wt.qg("/v1/search/items", !0),
                            C && (o = C.baseOptions),
                            n = Rt(Rt({
                                method: "GET"
                            }, o), w),
                            r = {},
                            a = {},
                            void 0 !== i && (a["model.category"] = i),
                            void 0 !== s && (a["model.subcategory"] = s),
                            void 0 !== u && (a["model.sortAggregation"] = u),
                            void 0 !== c && (a["model.sortCurrency"] = c),
                            l && (a["model.genres"] = l),
                            void 0 !== d && (a["model.sortType"] = d),
                            void 0 !== h && (a["model.creatorType"] = h),
                            void 0 !== v && (a["model.creatorTargetId"] = v),
                            void 0 !== p && (a["model.creatorName"] = p),
                            void 0 !== f && (a["model.maxPrice"] = f),
                            void 0 !== m && (a["model.minPrice"] = m),
                            void 0 !== g && (a["model.keyword"] = g),
                            void 0 !== I && (a["model.includeNotForSale"] = I),
                            y && (a["model.tagNames"] = y),
                            void 0 !== P && (a.sortOrder = P),
                            void 0 !== G && (a.limit = G),
                            void 0 !== b && (a.cursor = b),
                            t.query = Rt(Rt(Rt({}, t.query), a), w.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = Rt(Rt(Rt({}, r), o), w.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1SearchNavigationMenuItemsGet: function(i) {
                    return void 0 === i && (i = {}),
                    Lt(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return qt(this, function(e) {
                            return t = wt.qg("/v1/search/navigation-menu-items", !0),
                            C && (o = C.baseOptions),
                            n = Rt(Rt({
                                method: "GET"
                            }, o), i),
                            r = {},
                            a = {},
                            t.query = Rt(Rt(Rt({}, t.query), a), i.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = Rt(Rt(Rt({}, r), o), i.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                }
            }
        }
        function rn(P) {
            return {
                v1SearchItemsDetailsGet: function(t, r, a, o, i, s, u, c, l, d, h, v, p, f, m, g, I, y) {
                    return Lt(this, void 0, Promise, function() {
                        var n;
                        return qt(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, nn(P).v1SearchItemsDetailsGet(t, r, a, o, i, s, u, c, l, d, h, v, p, f, m, g, I, y)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = Ct);
                                    t = Rt(Rt({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1SearchItemsGet: function(t, r, a, o, i, s, u, c, l, d, h, v, p, f, m, g, I, y) {
                    return Lt(this, void 0, Promise, function() {
                        var n;
                        return qt(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, nn(P).v1SearchItemsGet(t, r, a, o, i, s, u, c, l, d, h, v, p, f, m, g, I, y)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = Ct);
                                    t = Rt(Rt({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1SearchNavigationMenuItemsGet: function(t) {
                    return Lt(this, void 0, Promise, function() {
                        var n;
                        return qt(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, nn(P).v1SearchNavigationMenuItemsGet(t)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = Ct);
                                    t = Rt(Rt({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                }
            }
        }
        function an() {
            return null !== en && en.apply(this, arguments) || this
        }
        fe(an, en = Z),
        an.prototype.v1SearchItemsDetailsGet = function(e, t, n, r, a, o, i, s, u, c, l, d, h, v, p, f, m, g) {
            var I = this;
            return rn(this.configuration).v1SearchItemsDetailsGet(e, t, n, r, a, o, i, s, u, c, l, d, h, v, p, f, m, g).then(function(e) {
                return e(I.axios, I.basePath)
            })
        }
        ,
        an.prototype.v1SearchItemsGet = function(e, t, n, r, a, o, i, s, u, c, l, d, h, v, p, f, m, g) {
            var I = this;
            return rn(this.configuration).v1SearchItemsGet(e, t, n, r, a, o, i, s, u, c, l, d, h, v, p, f, m, g).then(function(e) {
                return e(I.axios, I.basePath)
            })
        }
        ,
        an.prototype.v1SearchNavigationMenuItemsGet = function(e) {
            var t = this;
            return rn(this.configuration).v1SearchNavigationMenuItemsGet(e).then(function(e) {
                return e(t.axios, t.basePath)
            })
        }
        ;
        var on, sn, un = new J, cn = new X, ln = new te, ne = {
            getAssetRecommendations: function(e, t, n) {
                return ln.v1RecommendationsAssetAssetTypeIdGet(e, t, n)
            },
            getBundleRecommendations: function(e, t) {
                return un.v1BundlesBundleIdRecommendationsGet(e, t, {
                    withCredentials: !0
                })
            },
            postItemDetails: function(e) {
                return cn.v1CatalogItemsDetailsPost(e, {
                    withCredentials: !0
                })
            }
        }, re = (on = function(e, t) {
            return (on = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            )(e, t)
        }
        ,
        function(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
            function n() {
                this.constructor = e
            }
            on(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        ), dn = m.EnvironmentUrls.gameInternationalizationApi.replace(/\/+$/, ""), ae = function(e, t, n) {
            void 0 === t && (t = dn),
            void 0 === n && (n = N),
            this.basePath = t,
            this.axios = n,
            e && (this.configuration = e,
            this.basePath = e.basePath || this.basePath)
        }, hn = (sn = Error,
        re(vn, sn),
        vn);
        function vn(e, t) {
            t = sn.call(this, t) || this;
            return t.field = e,
            t.name = "RequiredError",
            t
        }
        var pn, fn, oe = (pn = function(e, t) {
            return (pn = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            )(e, t)
        }
        ,
        function(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
            function n() {
                this.constructor = e
            }
            pn(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        ), mn = function() {
            return (mn = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        }, gn = function(e, i, s, u) {
            return new (s = s || Promise)(function(n, t) {
                function r(e) {
                    try {
                        o(u.next(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function a(e) {
                    try {
                        o(u.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function o(e) {
                    var t;
                    e.done ? n(e.value) : ((t = e.value)instanceof s ? t : new s(function(e) {
                        e(t)
                    }
                    )).then(r, a)
                }
                o((u = u.apply(e, i || [])).next())
            }
            )
        }, In = function(n, r) {
            var a, o, i, s = {
                label: 0,
                sent: function() {
                    if (1 & i[0])
                        throw i[1];
                    return i[1]
                },
                trys: [],
                ops: []
            }, e = {
                next: t(0),
                throw: t(1),
                return: t(2)
            };
            return "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                return this
            }
            ),
            e;
            function t(t) {
                return function(e) {
                    return function(t) {
                        if (a)
                            throw new TypeError("Generator is already executing.");
                        for (; s; )
                            try {
                                if (a = 1,
                                o && (i = 2 & t[0] ? o.return : t[0] ? o.throw || ((i = o.return) && i.call(o),
                                0) : o.next) && !(i = i.call(o, t[1])).done)
                                    return i;
                                switch (o = 0,
                                i && (t = [2 & t[0], i.value]),
                                t[0]) {
                                case 0:
                                case 1:
                                    i = t;
                                    break;
                                case 4:
                                    return s.label++,
                                    {
                                        value: t[1],
                                        done: !1
                                    };
                                case 5:
                                    s.label++,
                                    o = t[1],
                                    t = [0];
                                    continue;
                                case 7:
                                    t = s.ops.pop(),
                                    s.trys.pop();
                                    continue;
                                default:
                                    if (!(i = 0 < (i = s.trys).length && i[i.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                        s = 0;
                                        continue
                                    }
                                    if (3 === t[0] && (!i || t[1] > i[0] && t[1] < i[3])) {
                                        s.label = t[1];
                                        break
                                    }
                                    if (6 === t[0] && s.label < i[1]) {
                                        s.label = i[1],
                                        i = t;
                                        break
                                    }
                                    if (i && s.label < i[2]) {
                                        s.label = i[2],
                                        s.ops.push(t);
                                        break
                                    }
                                    i[2] && s.ops.pop(),
                                    s.trys.pop();
                                    continue
                                }
                                t = r.call(n, s)
                            } catch (e) {
                                t = [6, e],
                                o = 0
                            } finally {
                                a = i = 0
                            }
                        if (5 & t[0])
                            throw t[1];
                        return {
                            value: t[0] ? t[1] : void 0,
                            done: !0
                        }
                    }([t, e])
                }
            }
        };
        function yn(c) {
            var e = this;
            return {
                v1AutolocalizationGamesGameIdAutolocalizationtablePatch: function(i, s, u) {
                    return void 0 === u && (u = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gameId","Required parameter gameId was null or undefined when calling v1AutolocalizationGamesGameIdAutolocalizationtablePatch.");
                            if (null == s)
                                throw new hn("request","Required parameter request was null or undefined when calling v1AutolocalizationGamesGameIdAutolocalizationtablePatch.");
                            return r = "/v1/autolocalization/games/{gameId}/autolocalizationtable".replace("{gameId}", encodeURIComponent(String(i))),
                            t = wt.qg(r, !0),
                            c && (o = c.baseOptions),
                            n = mn(mn({
                                method: "PATCH"
                            }, o), u),
                            a = {},
                            (r = {})["Content-Type"] = "application/json",
                            t.query = mn(mn(mn({}, t.query), a), u.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), u.headers),
                            o = "string" != typeof s || "application/json" === n.headers["Content-Type"],
                            n.data = o ? JSON.stringify(void 0 !== s ? s : {}) : s || "",
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1AutolocalizationGamesGameIdAutolocalizationtablePost: function(i, s) {
                    return void 0 === s && (s = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gameId","Required parameter gameId was null or undefined when calling v1AutolocalizationGamesGameIdAutolocalizationtablePost.");
                            return a = "/v1/autolocalization/games/{gameId}/autolocalizationtable".replace("{gameId}", encodeURIComponent(String(i))),
                            t = wt.qg(a, !0),
                            c && (o = c.baseOptions),
                            n = mn(mn({
                                method: "POST"
                            }, o), s),
                            r = {},
                            a = {},
                            t.query = mn(mn(mn({}, t.query), a), s.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), s.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1AutolocalizationGamesGameIdAutoscrapeCleanupRequestPost: function(i, s, u) {
                    return void 0 === u && (u = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gameId","Required parameter gameId was null or undefined when calling v1AutolocalizationGamesGameIdAutoscrapeCleanupRequestPost.");
                            if (null == s)
                                throw new hn("request","Required parameter request was null or undefined when calling v1AutolocalizationGamesGameIdAutoscrapeCleanupRequestPost.");
                            return r = "/v1/autolocalization/games/{gameId}/autoscrape-cleanup-request".replace("{gameId}", encodeURIComponent(String(i))),
                            t = wt.qg(r, !0),
                            c && (o = c.baseOptions),
                            n = mn(mn({
                                method: "POST"
                            }, o), u),
                            a = {},
                            (r = {})["Content-Type"] = "application/json",
                            t.query = mn(mn(mn({}, t.query), a), u.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), u.headers),
                            o = "string" != typeof s || "application/json" === n.headers["Content-Type"],
                            n.data = o ? JSON.stringify(void 0 !== s ? s : {}) : s || "",
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1AutolocalizationGamesGameIdGet: function(i, s) {
                    return void 0 === s && (s = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gameId","Required parameter gameId was null or undefined when calling v1AutolocalizationGamesGameIdGet.");
                            return a = "/v1/autolocalization/games/{gameId}".replace("{gameId}", encodeURIComponent(String(i))),
                            t = wt.qg(a, !0),
                            c && (o = c.baseOptions),
                            n = mn(mn({
                                method: "GET"
                            }, o), s),
                            r = {},
                            a = {},
                            t.query = mn(mn(mn({}, t.query), a), s.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), s.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1AutolocalizationGamesGameIdPatch: function(i, s, u) {
                    return void 0 === u && (u = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gameId","Required parameter gameId was null or undefined when calling v1AutolocalizationGamesGameIdPatch.");
                            if (null == s)
                                throw new hn("request","Required parameter request was null or undefined when calling v1AutolocalizationGamesGameIdPatch.");
                            return r = "/v1/autolocalization/games/{gameId}".replace("{gameId}", encodeURIComponent(String(i))),
                            t = wt.qg(r, !0),
                            c && (o = c.baseOptions),
                            n = mn(mn({
                                method: "PATCH"
                            }, o), u),
                            a = {},
                            (r = {})["Content-Type"] = "application/json",
                            t.query = mn(mn(mn({}, t.query), a), u.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), u.headers),
                            o = "string" != typeof s || "application/json" === n.headers["Content-Type"],
                            n.data = o ? JSON.stringify(void 0 !== s ? s : {}) : s || "",
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1AutolocalizationGamesGameIdSettingsPatch: function(i, s, u) {
                    return void 0 === u && (u = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gameId","Required parameter gameId was null or undefined when calling v1AutolocalizationGamesGameIdSettingsPatch.");
                            if (null == s)
                                throw new hn("request","Required parameter request was null or undefined when calling v1AutolocalizationGamesGameIdSettingsPatch.");
                            return r = "/v1/autolocalization/games/{gameId}/settings".replace("{gameId}", encodeURIComponent(String(i))),
                            t = wt.qg(r, !0),
                            c && (o = c.baseOptions),
                            n = mn(mn({
                                method: "PATCH"
                            }, o), u),
                            a = {},
                            (r = {})["Content-Type"] = "application/json",
                            t.query = mn(mn(mn({}, t.query), a), u.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), u.headers),
                            o = "string" != typeof s || "application/json" === n.headers["Content-Type"],
                            n.data = o ? JSON.stringify(void 0 !== s ? s : {}) : s || "",
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1AutolocalizationMetadataGet: function(i) {
                    return void 0 === i && (i = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            return t = wt.qg("/v1/autolocalization/metadata", !0),
                            c && (o = c.baseOptions),
                            n = mn(mn({
                                method: "GET"
                            }, o), i),
                            r = {},
                            a = {},
                            t.query = mn(mn(mn({}, t.query), a), i.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), i.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                }
            }
        }
        function Pn(o) {
            return {
                v1AutolocalizationGamesGameIdAutolocalizationtablePatch: function(t, r, a) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, yn(o).v1AutolocalizationGamesGameIdAutolocalizationtablePatch(t, r, a)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1AutolocalizationGamesGameIdAutolocalizationtablePost: function(t, r) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, yn(o).v1AutolocalizationGamesGameIdAutolocalizationtablePost(t, r)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1AutolocalizationGamesGameIdAutoscrapeCleanupRequestPost: function(t, r, a) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, yn(o).v1AutolocalizationGamesGameIdAutoscrapeCleanupRequestPost(t, r, a)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1AutolocalizationGamesGameIdGet: function(t, r) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, yn(o).v1AutolocalizationGamesGameIdGet(t, r)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1AutolocalizationGamesGameIdPatch: function(t, r, a) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, yn(o).v1AutolocalizationGamesGameIdPatch(t, r, a)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1AutolocalizationGamesGameIdSettingsPatch: function(t, r, a) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, yn(o).v1AutolocalizationGamesGameIdSettingsPatch(t, r, a)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1AutolocalizationMetadataGet: function(t) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, yn(o).v1AutolocalizationMetadataGet(t)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                }
            }
        }
        (ie = {}).User = "User",
        ie.Group = "Group",
        (pe = {}).Asc = "Asc",
        pe.Desc = "Desc",
        (I = {}).Approved = "Approved",
        I.PendingReview = "PendingReview",
        I.UnAvailable = "UnAvailable",
        I.Rejected = "Rejected",
        I.Error = "Error",
        (Hr = {}).Approved = "Approved",
        Hr.PendingReview = "PendingReview",
        Hr.UnAvailable = "UnAvailable",
        Hr.Rejected = "Rejected",
        Hr.Error = "Error",
        (Zr = {}).Approved = "Approved",
        Zr.PendingReview = "PendingReview",
        Zr.UnAvailable = "UnAvailable",
        Zr.Rejected = "Rejected",
        Zr.Error = "Error",
        (bn = {}).Approved = "Approved",
        bn.PendingReview = "PendingReview",
        bn.UnAvailable = "UnAvailable",
        bn.Rejected = "Rejected",
        bn.Error = "Error",
        (Ln = {}).Name = "Name",
        Ln.Description = "Description",
        (f = {}).Asc = "Asc",
        f.Desc = "Desc",
        (S = {}).User = "User",
        S.Group = "Group",
        (z = {}).Language = "Language",
        z.Locale = "Locale",
        (fe = {}).Language = "Language",
        fe.Locale = "Locale",
        (Z = {}).Language = "Language",
        Z.Locale = "Locale",
        (J = {}).Approved = "Approved",
        J.PendingReview = "PendingReview",
        J.UnAvailable = "UnAvailable",
        J.Rejected = "Rejected",
        J.Error = "Error",
        (X = fn = fn || {}).Language = "Language",
        X.Locale = "Locale",
        (te = {}).GameTranslationStatus = "GameTranslationStatus",
        te.GameTranslationStatusForTranslatorGroup = "GameTranslationStatusForTranslatorGroup",
        te.GameTranslationStatusForTranslator = "GameTranslationStatusForTranslator",
        te.Test = "Test",
        (re = {}).InProgress = "inProgress",
        re.Ready = "ready",
        re.Unavailable = "unavailable",
        (ie = {}).Automation = "Automation",
        ie.User = "User",
        (pe = {}).LanguageOrLocaleSupportedForGame = "LanguageOrLocaleSupportedForGame",
        pe.LanguageOrLocaleNotSupportedForGame = "LanguageOrLocaleNotSupportedForGame",
        pe.LanguageOrLocaleIsSource = "LanguageOrLocaleIsSource",
        pe.InsufficientPermission = "InsufficientPermission",
        pe.GameDoesNotExist = "GameDoesNotExist",
        pe.GameDoesNotHaveTable = "GameDoesNotHaveTable",
        pe.UnknownError = "UnknownError",
        (I = {}).Success = "Success",
        I.LanguageOrLocaleNotSupportedForGame = "LanguageOrLocaleNotSupportedForGame",
        (Hr = {}).Language = "Language",
        Hr.Locale = "Locale",
        (Zr = {}).User = "User",
        Zr.Automation = "Automation";
        var Gn, bn = (oe(wn, Gn = ae),
        wn.prototype.v1AutolocalizationGamesGameIdAutolocalizationtablePatch = function(e, t, n) {
            var r = this;
            return Pn(this.configuration).v1AutolocalizationGamesGameIdAutolocalizationtablePatch(e, t, n).then(function(e) {
                return e(r.axios, r.basePath)
            })
        }
        ,
        wn.prototype.v1AutolocalizationGamesGameIdAutolocalizationtablePost = function(e, t) {
            var n = this;
            return Pn(this.configuration).v1AutolocalizationGamesGameIdAutolocalizationtablePost(e, t).then(function(e) {
                return e(n.axios, n.basePath)
            })
        }
        ,
        wn.prototype.v1AutolocalizationGamesGameIdAutoscrapeCleanupRequestPost = function(e, t, n) {
            var r = this;
            return Pn(this.configuration).v1AutolocalizationGamesGameIdAutoscrapeCleanupRequestPost(e, t, n).then(function(e) {
                return e(r.axios, r.basePath)
            })
        }
        ,
        wn.prototype.v1AutolocalizationGamesGameIdGet = function(e, t) {
            var n = this;
            return Pn(this.configuration).v1AutolocalizationGamesGameIdGet(e, t).then(function(e) {
                return e(n.axios, n.basePath)
            })
        }
        ,
        wn.prototype.v1AutolocalizationGamesGameIdPatch = function(e, t, n) {
            var r = this;
            return Pn(this.configuration).v1AutolocalizationGamesGameIdPatch(e, t, n).then(function(e) {
                return e(r.axios, r.basePath)
            })
        }
        ,
        wn.prototype.v1AutolocalizationGamesGameIdSettingsPatch = function(e, t, n) {
            var r = this;
            return Pn(this.configuration).v1AutolocalizationGamesGameIdSettingsPatch(e, t, n).then(function(e) {
                return e(r.axios, r.basePath)
            })
        }
        ,
        wn.prototype.v1AutolocalizationMetadataGet = function(e) {
            var t = this;
            return Pn(this.configuration).v1AutolocalizationMetadataGet(e).then(function(e) {
                return e(t.axios, t.basePath)
            })
        }
        ,
        wn);
        function wn() {
            return null !== Gn && Gn.apply(this, arguments) || this
        }
        function Cn(c) {
            var e = this;
            return {
                v1AutomaticTranslationGamesGameIdFeatureStatusGet: function(i, s) {
                    return void 0 === s && (s = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gameId","Required parameter gameId was null or undefined when calling v1AutomaticTranslationGamesGameIdFeatureStatusGet.");
                            return a = "/v1/automatic-translation/games/{gameId}/feature-status".replace("{gameId}", encodeURIComponent(String(i))),
                            t = wt.qg(a, !0),
                            c && (o = c.baseOptions),
                            n = mn(mn({
                                method: "GET"
                            }, o), s),
                            r = {},
                            a = {},
                            t.query = mn(mn(mn({}, t.query), a), s.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), s.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1AutomaticTranslationGamesGameIdQuotaGet: function(i, s) {
                    return void 0 === s && (s = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gameId","Required parameter gameId was null or undefined when calling v1AutomaticTranslationGamesGameIdQuotaGet.");
                            return a = "/v1/automatic-translation/games/{gameId}/quota".replace("{gameId}", encodeURIComponent(String(i))),
                            t = wt.qg(a, !0),
                            c && (o = c.baseOptions),
                            n = mn(mn({
                                method: "GET"
                            }, o), s),
                            r = {},
                            a = {},
                            t.query = mn(mn(mn({}, t.query), a), s.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), s.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1AutomaticTranslationLanguagesLanguageCodeTargetLanguagesGet: function(i, s, u) {
                    return void 0 === u && (u = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("languageCode","Required parameter languageCode was null or undefined when calling v1AutomaticTranslationLanguagesLanguageCodeTargetLanguagesGet.");
                            return a = "/v1/automatic-translation/languages/{languageCode}/target-languages".replace("{languageCode}", encodeURIComponent(String(i))),
                            t = wt.qg(a, !0),
                            c && (o = c.baseOptions),
                            n = mn(mn({
                                method: "GET"
                            }, o), u),
                            r = {},
                            a = {},
                            s && (a.targetLanguages = s),
                            t.query = mn(mn(mn({}, t.query), a), u.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), u.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                }
            }
        }
        function Tn(o) {
            return {
                v1AutomaticTranslationGamesGameIdFeatureStatusGet: function(t, r) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Cn(o).v1AutomaticTranslationGamesGameIdFeatureStatusGet(t, r)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1AutomaticTranslationGamesGameIdQuotaGet: function(t, r) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Cn(o).v1AutomaticTranslationGamesGameIdQuotaGet(t, r)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1AutomaticTranslationLanguagesLanguageCodeTargetLanguagesGet: function(t, r, a) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Cn(o).v1AutomaticTranslationLanguagesLanguageCodeTargetLanguagesGet(t, r, a)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                }
            }
        }
        var An, En, Sn, Rn, Ln = (oe(qn, An = ae),
        qn.prototype.v1AutomaticTranslationGamesGameIdFeatureStatusGet = function(e, t) {
            var n = this;
            return Tn(this.configuration).v1AutomaticTranslationGamesGameIdFeatureStatusGet(e, t).then(function(e) {
                return e(n.axios, n.basePath)
            })
        }
        ,
        qn.prototype.v1AutomaticTranslationGamesGameIdQuotaGet = function(e, t) {
            var n = this;
            return Tn(this.configuration).v1AutomaticTranslationGamesGameIdQuotaGet(e, t).then(function(e) {
                return e(n.axios, n.basePath)
            })
        }
        ,
        qn.prototype.v1AutomaticTranslationLanguagesLanguageCodeTargetLanguagesGet = function(e, t, n) {
            var r = this;
            return Tn(this.configuration).v1AutomaticTranslationLanguagesLanguageCodeTargetLanguagesGet(e, t, n).then(function(e) {
                return e(r.axios, r.basePath)
            })
        }
        ,
        qn);
        function qn() {
            return null !== An && An.apply(this, arguments) || this
        }
        function Un(d) {
            var e = this;
            return {
                v1BadgesBadgeIdDescriptionLanguageCodesLanguageCodePatch: function(i, s, u, c) {
                    return void 0 === c && (c = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("badgeId","Required parameter badgeId was null or undefined when calling v1BadgesBadgeIdDescriptionLanguageCodesLanguageCodePatch.");
                            if (null == s)
                                throw new hn("languageCode","Required parameter languageCode was null or undefined when calling v1BadgesBadgeIdDescriptionLanguageCodesLanguageCodePatch.");
                            if (null == u)
                                throw new hn("request","Required parameter request was null or undefined when calling v1BadgesBadgeIdDescriptionLanguageCodesLanguageCodePatch.");
                            return r = "/v1/badges/{badgeId}/description/language-codes/{languageCode}".replace("{badgeId}", encodeURIComponent(String(i))).replace("{languageCode}", encodeURIComponent(String(s))),
                            t = wt.qg(r, !0),
                            d && (o = d.baseOptions),
                            n = mn(mn({
                                method: "PATCH"
                            }, o), c),
                            a = {},
                            (r = {})["Content-Type"] = "application/json",
                            t.query = mn(mn(mn({}, t.query), a), c.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), c.headers),
                            o = "string" != typeof u || "application/json" === n.headers["Content-Type"],
                            n.data = o ? JSON.stringify(void 0 !== u ? u : {}) : u || "",
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1BadgesBadgeIdIconsGet: function(i, s, u, c) {
                    return void 0 === c && (c = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("badgeId","Required parameter badgeId was null or undefined when calling v1BadgesBadgeIdIconsGet.");
                            return a = "/v1/badges/{badgeId}/icons".replace("{badgeId}", encodeURIComponent(String(i))),
                            t = wt.qg(a, !0),
                            d && (o = d.baseOptions),
                            n = mn(mn({
                                method: "GET"
                            }, o), c),
                            r = {},
                            a = {},
                            void 0 !== s && (a.width = s),
                            void 0 !== u && (a.height = u),
                            t.query = mn(mn(mn({}, t.query), a), c.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), c.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1BadgesBadgeIdIconsLanguageCodesLanguageCodeDelete: function(i, s, u) {
                    return void 0 === u && (u = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("badgeId","Required parameter badgeId was null or undefined when calling v1BadgesBadgeIdIconsLanguageCodesLanguageCodeDelete.");
                            if (null == s)
                                throw new hn("languageCode","Required parameter languageCode was null or undefined when calling v1BadgesBadgeIdIconsLanguageCodesLanguageCodeDelete.");
                            return a = "/v1/badges/{badgeId}/icons/language-codes/{languageCode}".replace("{badgeId}", encodeURIComponent(String(i))).replace("{languageCode}", encodeURIComponent(String(s))),
                            t = wt.qg(a, !0),
                            d && (o = d.baseOptions),
                            n = mn(mn({
                                method: "DELETE"
                            }, o), u),
                            r = {},
                            a = {},
                            t.query = mn(mn(mn({}, t.query), a), u.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), u.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1BadgesBadgeIdIconsLanguageCodesLanguageCodePost: function(s, u, c, l) {
                    return void 0 === l && (l = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o, i;
                        return In(this, function(e) {
                            if (null == s)
                                throw new hn("badgeId","Required parameter badgeId was null or undefined when calling v1BadgesBadgeIdIconsLanguageCodesLanguageCodePost.");
                            if (null == u)
                                throw new hn("languageCode","Required parameter languageCode was null or undefined when calling v1BadgesBadgeIdIconsLanguageCodesLanguageCodePost.");
                            return o = "/v1/badges/{badgeId}/icons/language-codes/{languageCode}".replace("{badgeId}", encodeURIComponent(String(s))).replace("{languageCode}", encodeURIComponent(String(u))),
                            t = wt.qg(o, !0),
                            d && (i = d.baseOptions),
                            n = mn(mn({
                                method: "POST"
                            }, i), l),
                            r = {},
                            a = {},
                            o = new FormData,
                            void 0 !== c && o.append("request.files", c),
                            r["Content-Type"] = "multipart/form-data",
                            t.query = mn(mn(mn({}, t.query), a), l.query),
                            delete t.search,
                            i = i && i.headers ? i.headers : {},
                            n.headers = mn(mn(mn({}, r), i), l.headers),
                            n.data = o,
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1BadgesBadgeIdNameDescriptionGet: function(i, s) {
                    return void 0 === s && (s = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("badgeId","Required parameter badgeId was null or undefined when calling v1BadgesBadgeIdNameDescriptionGet.");
                            return a = "/v1/badges/{badgeId}/name-description".replace("{badgeId}", encodeURIComponent(String(i))),
                            t = wt.qg(a, !0),
                            d && (o = d.baseOptions),
                            n = mn(mn({
                                method: "GET"
                            }, o), s),
                            r = {},
                            a = {},
                            t.query = mn(mn(mn({}, t.query), a), s.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), s.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1BadgesBadgeIdNameDescriptionLanguageCodesLanguageCodeDelete: function(i, s, u) {
                    return void 0 === u && (u = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("badgeId","Required parameter badgeId was null or undefined when calling v1BadgesBadgeIdNameDescriptionLanguageCodesLanguageCodeDelete.");
                            if (null == s)
                                throw new hn("languageCode","Required parameter languageCode was null or undefined when calling v1BadgesBadgeIdNameDescriptionLanguageCodesLanguageCodeDelete.");
                            return a = "/v1/badges/{badgeId}/name-description/language-codes/{languageCode}".replace("{badgeId}", encodeURIComponent(String(i))).replace("{languageCode}", encodeURIComponent(String(s))),
                            t = wt.qg(a, !0),
                            d && (o = d.baseOptions),
                            n = mn(mn({
                                method: "DELETE"
                            }, o), u),
                            r = {},
                            a = {},
                            t.query = mn(mn(mn({}, t.query), a), u.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), u.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1BadgesBadgeIdNameDescriptionLanguageCodesLanguageCodePatch: function(i, s, u, c) {
                    return void 0 === c && (c = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("badgeId","Required parameter badgeId was null or undefined when calling v1BadgesBadgeIdNameDescriptionLanguageCodesLanguageCodePatch.");
                            if (null == s)
                                throw new hn("languageCode","Required parameter languageCode was null or undefined when calling v1BadgesBadgeIdNameDescriptionLanguageCodesLanguageCodePatch.");
                            if (null == u)
                                throw new hn("request","Required parameter request was null or undefined when calling v1BadgesBadgeIdNameDescriptionLanguageCodesLanguageCodePatch.");
                            return r = "/v1/badges/{badgeId}/name-description/language-codes/{languageCode}".replace("{badgeId}", encodeURIComponent(String(i))).replace("{languageCode}", encodeURIComponent(String(s))),
                            t = wt.qg(r, !0),
                            d && (o = d.baseOptions),
                            n = mn(mn({
                                method: "PATCH"
                            }, o), c),
                            a = {},
                            (r = {})["Content-Type"] = "application/json",
                            t.query = mn(mn(mn({}, t.query), a), c.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), c.headers),
                            o = "string" != typeof u || "application/json" === n.headers["Content-Type"],
                            n.data = o ? JSON.stringify(void 0 !== u ? u : {}) : u || "",
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1BadgesBadgeIdNameLanguageCodesLanguageCodePatch: function(i, s, u, c) {
                    return void 0 === c && (c = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("badgeId","Required parameter badgeId was null or undefined when calling v1BadgesBadgeIdNameLanguageCodesLanguageCodePatch.");
                            if (null == s)
                                throw new hn("languageCode","Required parameter languageCode was null or undefined when calling v1BadgesBadgeIdNameLanguageCodesLanguageCodePatch.");
                            if (null == u)
                                throw new hn("request","Required parameter request was null or undefined when calling v1BadgesBadgeIdNameLanguageCodesLanguageCodePatch.");
                            return r = "/v1/badges/{badgeId}/name/language-codes/{languageCode}".replace("{badgeId}", encodeURIComponent(String(i))).replace("{languageCode}", encodeURIComponent(String(s))),
                            t = wt.qg(r, !0),
                            d && (o = d.baseOptions),
                            n = mn(mn({
                                method: "PATCH"
                            }, o), c),
                            a = {},
                            (r = {})["Content-Type"] = "application/json",
                            t.query = mn(mn(mn({}, t.query), a), c.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), c.headers),
                            o = "string" != typeof u || "application/json" === n.headers["Content-Type"],
                            n.data = o ? JSON.stringify(void 0 !== u ? u : {}) : u || "",
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                }
            }
        }
        function On(i) {
            return {
                v1BadgesBadgeIdDescriptionLanguageCodesLanguageCodePatch: function(t, r, a, o) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Un(i).v1BadgesBadgeIdDescriptionLanguageCodesLanguageCodePatch(t, r, a, o)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1BadgesBadgeIdIconsGet: function(t, r, a, o) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Un(i).v1BadgesBadgeIdIconsGet(t, r, a, o)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1BadgesBadgeIdIconsLanguageCodesLanguageCodeDelete: function(t, r, a) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Un(i).v1BadgesBadgeIdIconsLanguageCodesLanguageCodeDelete(t, r, a)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1BadgesBadgeIdIconsLanguageCodesLanguageCodePost: function(t, r, a, o) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Un(i).v1BadgesBadgeIdIconsLanguageCodesLanguageCodePost(t, r, a, o)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1BadgesBadgeIdNameDescriptionGet: function(t, r) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Un(i).v1BadgesBadgeIdNameDescriptionGet(t, r)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1BadgesBadgeIdNameDescriptionLanguageCodesLanguageCodeDelete: function(t, r, a) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Un(i).v1BadgesBadgeIdNameDescriptionLanguageCodesLanguageCodeDelete(t, r, a)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1BadgesBadgeIdNameDescriptionLanguageCodesLanguageCodePatch: function(t, r, a, o) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Un(i).v1BadgesBadgeIdNameDescriptionLanguageCodesLanguageCodePatch(t, r, a, o)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1BadgesBadgeIdNameLanguageCodesLanguageCodePatch: function(t, r, a, o) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Un(i).v1BadgesBadgeIdNameLanguageCodesLanguageCodePatch(t, r, a, o)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                }
            }
        }
        function Dn() {
            return null !== En && En.apply(this, arguments) || this
        }
        function _n(d) {
            var e = this;
            return {
                v1DeveloperProductsDeveloperProductIdDescriptionLanguageCodesLanguageCodePatch: function(i, s, u, c) {
                    return void 0 === c && (c = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("developerProductId","Required parameter developerProductId was null or undefined when calling v1DeveloperProductsDeveloperProductIdDescriptionLanguageCodesLanguageCodePatch.");
                            if (null == s)
                                throw new hn("languageCode","Required parameter languageCode was null or undefined when calling v1DeveloperProductsDeveloperProductIdDescriptionLanguageCodesLanguageCodePatch.");
                            if (null == u)
                                throw new hn("request","Required parameter request was null or undefined when calling v1DeveloperProductsDeveloperProductIdDescriptionLanguageCodesLanguageCodePatch.");
                            return r = "/v1/developer-products/{developerProductId}/description/language-codes/{languageCode}".replace("{developerProductId}", encodeURIComponent(String(i))).replace("{languageCode}", encodeURIComponent(String(s))),
                            t = wt.qg(r, !0),
                            d && (o = d.baseOptions),
                            n = mn(mn({
                                method: "PATCH"
                            }, o), c),
                            a = {},
                            (r = {})["Content-Type"] = "application/json",
                            t.query = mn(mn(mn({}, t.query), a), c.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), c.headers),
                            o = "string" != typeof u || "application/json" === n.headers["Content-Type"],
                            n.data = o ? JSON.stringify(void 0 !== u ? u : {}) : u || "",
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1DeveloperProductsDeveloperProductIdIconsGet: function(i, s, u, c) {
                    return void 0 === c && (c = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("developerProductId","Required parameter developerProductId was null or undefined when calling v1DeveloperProductsDeveloperProductIdIconsGet.");
                            return a = "/v1/developer-products/{developerProductId}/icons".replace("{developerProductId}", encodeURIComponent(String(i))),
                            t = wt.qg(a, !0),
                            d && (o = d.baseOptions),
                            n = mn(mn({
                                method: "GET"
                            }, o), c),
                            r = {},
                            a = {},
                            void 0 !== s && (a.width = s),
                            void 0 !== u && (a.height = u),
                            t.query = mn(mn(mn({}, t.query), a), c.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), c.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1DeveloperProductsDeveloperProductIdIconsLanguageCodesLanguageCodeDelete: function(i, s, u) {
                    return void 0 === u && (u = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("developerProductId","Required parameter developerProductId was null or undefined when calling v1DeveloperProductsDeveloperProductIdIconsLanguageCodesLanguageCodeDelete.");
                            if (null == s)
                                throw new hn("languageCode","Required parameter languageCode was null or undefined when calling v1DeveloperProductsDeveloperProductIdIconsLanguageCodesLanguageCodeDelete.");
                            return a = "/v1/developer-products/{developerProductId}/icons/language-codes/{languageCode}".replace("{developerProductId}", encodeURIComponent(String(i))).replace("{languageCode}", encodeURIComponent(String(s))),
                            t = wt.qg(a, !0),
                            d && (o = d.baseOptions),
                            n = mn(mn({
                                method: "DELETE"
                            }, o), u),
                            r = {},
                            a = {},
                            t.query = mn(mn(mn({}, t.query), a), u.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), u.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1DeveloperProductsDeveloperProductIdIconsLanguageCodesLanguageCodePost: function(s, u, c, l) {
                    return void 0 === l && (l = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o, i;
                        return In(this, function(e) {
                            if (null == s)
                                throw new hn("developerProductId","Required parameter developerProductId was null or undefined when calling v1DeveloperProductsDeveloperProductIdIconsLanguageCodesLanguageCodePost.");
                            if (null == u)
                                throw new hn("languageCode","Required parameter languageCode was null or undefined when calling v1DeveloperProductsDeveloperProductIdIconsLanguageCodesLanguageCodePost.");
                            return o = "/v1/developer-products/{developerProductId}/icons/language-codes/{languageCode}".replace("{developerProductId}", encodeURIComponent(String(s))).replace("{languageCode}", encodeURIComponent(String(u))),
                            t = wt.qg(o, !0),
                            d && (i = d.baseOptions),
                            n = mn(mn({
                                method: "POST"
                            }, i), l),
                            r = {},
                            a = {},
                            o = new FormData,
                            void 0 !== c && o.append("request.files", c),
                            r["Content-Type"] = "multipart/form-data",
                            t.query = mn(mn(mn({}, t.query), a), l.query),
                            delete t.search,
                            i = i && i.headers ? i.headers : {},
                            n.headers = mn(mn(mn({}, r), i), l.headers),
                            n.data = o,
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1DeveloperProductsDeveloperProductIdNameDescriptionGet: function(i, s) {
                    return void 0 === s && (s = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("developerProductId","Required parameter developerProductId was null or undefined when calling v1DeveloperProductsDeveloperProductIdNameDescriptionGet.");
                            return a = "/v1/developer-products/{developerProductId}/name-description".replace("{developerProductId}", encodeURIComponent(String(i))),
                            t = wt.qg(a, !0),
                            d && (o = d.baseOptions),
                            n = mn(mn({
                                method: "GET"
                            }, o), s),
                            r = {},
                            a = {},
                            t.query = mn(mn(mn({}, t.query), a), s.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), s.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1DeveloperProductsDeveloperProductIdNameDescriptionLanguageCodesLanguageCodeDelete: function(i, s, u) {
                    return void 0 === u && (u = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("developerProductId","Required parameter developerProductId was null or undefined when calling v1DeveloperProductsDeveloperProductIdNameDescriptionLanguageCodesLanguageCodeDelete.");
                            if (null == s)
                                throw new hn("languageCode","Required parameter languageCode was null or undefined when calling v1DeveloperProductsDeveloperProductIdNameDescriptionLanguageCodesLanguageCodeDelete.");
                            return a = "/v1/developer-products/{developerProductId}/name-description/language-codes/{languageCode}".replace("{developerProductId}", encodeURIComponent(String(i))).replace("{languageCode}", encodeURIComponent(String(s))),
                            t = wt.qg(a, !0),
                            d && (o = d.baseOptions),
                            n = mn(mn({
                                method: "DELETE"
                            }, o), u),
                            r = {},
                            a = {},
                            t.query = mn(mn(mn({}, t.query), a), u.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), u.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1DeveloperProductsDeveloperProductIdNameDescriptionLanguageCodesLanguageCodePatch: function(i, s, u, c) {
                    return void 0 === c && (c = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("developerProductId","Required parameter developerProductId was null or undefined when calling v1DeveloperProductsDeveloperProductIdNameDescriptionLanguageCodesLanguageCodePatch.");
                            if (null == s)
                                throw new hn("languageCode","Required parameter languageCode was null or undefined when calling v1DeveloperProductsDeveloperProductIdNameDescriptionLanguageCodesLanguageCodePatch.");
                            if (null == u)
                                throw new hn("request","Required parameter request was null or undefined when calling v1DeveloperProductsDeveloperProductIdNameDescriptionLanguageCodesLanguageCodePatch.");
                            return r = "/v1/developer-products/{developerProductId}/name-description/language-codes/{languageCode}".replace("{developerProductId}", encodeURIComponent(String(i))).replace("{languageCode}", encodeURIComponent(String(s))),
                            t = wt.qg(r, !0),
                            d && (o = d.baseOptions),
                            n = mn(mn({
                                method: "PATCH"
                            }, o), c),
                            a = {},
                            (r = {})["Content-Type"] = "application/json",
                            t.query = mn(mn(mn({}, t.query), a), c.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), c.headers),
                            o = "string" != typeof u || "application/json" === n.headers["Content-Type"],
                            n.data = o ? JSON.stringify(void 0 !== u ? u : {}) : u || "",
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1DeveloperProductsDeveloperProductIdNameLanguageCodesLanguageCodePatch: function(i, s, u, c) {
                    return void 0 === c && (c = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("developerProductId","Required parameter developerProductId was null or undefined when calling v1DeveloperProductsDeveloperProductIdNameLanguageCodesLanguageCodePatch.");
                            if (null == s)
                                throw new hn("languageCode","Required parameter languageCode was null or undefined when calling v1DeveloperProductsDeveloperProductIdNameLanguageCodesLanguageCodePatch.");
                            if (null == u)
                                throw new hn("request","Required parameter request was null or undefined when calling v1DeveloperProductsDeveloperProductIdNameLanguageCodesLanguageCodePatch.");
                            return r = "/v1/developer-products/{developerProductId}/name/language-codes/{languageCode}".replace("{developerProductId}", encodeURIComponent(String(i))).replace("{languageCode}", encodeURIComponent(String(s))),
                            t = wt.qg(r, !0),
                            d && (o = d.baseOptions),
                            n = mn(mn({
                                method: "PATCH"
                            }, o), c),
                            a = {},
                            (r = {})["Content-Type"] = "application/json",
                            t.query = mn(mn(mn({}, t.query), a), c.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), c.headers),
                            o = "string" != typeof u || "application/json" === n.headers["Content-Type"],
                            n.data = o ? JSON.stringify(void 0 !== u ? u : {}) : u || "",
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                }
            }
        }
        function xn(i) {
            return {
                v1DeveloperProductsDeveloperProductIdDescriptionLanguageCodesLanguageCodePatch: function(t, r, a, o) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, _n(i).v1DeveloperProductsDeveloperProductIdDescriptionLanguageCodesLanguageCodePatch(t, r, a, o)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1DeveloperProductsDeveloperProductIdIconsGet: function(t, r, a, o) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, _n(i).v1DeveloperProductsDeveloperProductIdIconsGet(t, r, a, o)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1DeveloperProductsDeveloperProductIdIconsLanguageCodesLanguageCodeDelete: function(t, r, a) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, _n(i).v1DeveloperProductsDeveloperProductIdIconsLanguageCodesLanguageCodeDelete(t, r, a)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1DeveloperProductsDeveloperProductIdIconsLanguageCodesLanguageCodePost: function(t, r, a, o) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, _n(i).v1DeveloperProductsDeveloperProductIdIconsLanguageCodesLanguageCodePost(t, r, a, o)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1DeveloperProductsDeveloperProductIdNameDescriptionGet: function(t, r) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, _n(i).v1DeveloperProductsDeveloperProductIdNameDescriptionGet(t, r)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1DeveloperProductsDeveloperProductIdNameDescriptionLanguageCodesLanguageCodeDelete: function(t, r, a) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, _n(i).v1DeveloperProductsDeveloperProductIdNameDescriptionLanguageCodesLanguageCodeDelete(t, r, a)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1DeveloperProductsDeveloperProductIdNameDescriptionLanguageCodesLanguageCodePatch: function(t, r, a, o) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, _n(i).v1DeveloperProductsDeveloperProductIdNameDescriptionLanguageCodesLanguageCodePatch(t, r, a, o)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1DeveloperProductsDeveloperProductIdNameLanguageCodesLanguageCodePatch: function(t, r, a, o) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, _n(i).v1DeveloperProductsDeveloperProductIdNameLanguageCodesLanguageCodePatch(t, r, a, o)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                }
            }
        }
        function Bn() {
            return null !== Sn && Sn.apply(this, arguments) || this
        }
        function Nn(d) {
            var e = this;
            return {
                v1GameIconGamesGameIdGet: function(i, s, u, c) {
                    return void 0 === c && (c = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gameId","Required parameter gameId was null or undefined when calling v1GameIconGamesGameIdGet.");
                            return a = "/v1/game-icon/games/{gameId}".replace("{gameId}", encodeURIComponent(String(i))),
                            t = wt.qg(a, !0),
                            d && (o = d.baseOptions),
                            n = mn(mn({
                                method: "GET"
                            }, o), c),
                            r = {},
                            a = {},
                            void 0 !== s && (a.width = s),
                            void 0 !== u && (a.height = u),
                            t.query = mn(mn(mn({}, t.query), a), c.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), c.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1GameIconGamesGameIdLanguageCodesLanguageCodeDelete: function(i, s, u) {
                    return void 0 === u && (u = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gameId","Required parameter gameId was null or undefined when calling v1GameIconGamesGameIdLanguageCodesLanguageCodeDelete.");
                            if (null == s)
                                throw new hn("languageCode","Required parameter languageCode was null or undefined when calling v1GameIconGamesGameIdLanguageCodesLanguageCodeDelete.");
                            return a = "/v1/game-icon/games/{gameId}/language-codes/{languageCode}".replace("{gameId}", encodeURIComponent(String(i))).replace("{languageCode}", encodeURIComponent(String(s))),
                            t = wt.qg(a, !0),
                            d && (o = d.baseOptions),
                            n = mn(mn({
                                method: "DELETE"
                            }, o), u),
                            r = {},
                            a = {},
                            t.query = mn(mn(mn({}, t.query), a), u.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), u.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1GameIconGamesGameIdLanguageCodesLanguageCodePost: function(s, u, c, l) {
                    return void 0 === l && (l = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o, i;
                        return In(this, function(e) {
                            if (null == s)
                                throw new hn("gameId","Required parameter gameId was null or undefined when calling v1GameIconGamesGameIdLanguageCodesLanguageCodePost.");
                            if (null == u)
                                throw new hn("languageCode","Required parameter languageCode was null or undefined when calling v1GameIconGamesGameIdLanguageCodesLanguageCodePost.");
                            return o = "/v1/game-icon/games/{gameId}/language-codes/{languageCode}".replace("{gameId}", encodeURIComponent(String(s))).replace("{languageCode}", encodeURIComponent(String(u))),
                            t = wt.qg(o, !0),
                            d && (i = d.baseOptions),
                            n = mn(mn({
                                method: "POST"
                            }, i), l),
                            r = {},
                            a = {},
                            o = new FormData,
                            void 0 !== c && o.append("request.files", c),
                            r["Content-Type"] = "multipart/form-data",
                            t.query = mn(mn(mn({}, t.query), a), l.query),
                            delete t.search,
                            i = i && i.headers ? i.headers : {},
                            n.headers = mn(mn(mn({}, r), i), l.headers),
                            n.data = o,
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                }
            }
        }
        function Fn(i) {
            return {
                v1GameIconGamesGameIdGet: function(t, r, a, o) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Nn(i).v1GameIconGamesGameIdGet(t, r, a, o)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1GameIconGamesGameIdLanguageCodesLanguageCodeDelete: function(t, r, a) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Nn(i).v1GameIconGamesGameIdLanguageCodesLanguageCodeDelete(t, r, a)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1GameIconGamesGameIdLanguageCodesLanguageCodePost: function(t, r, a, o) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Nn(i).v1GameIconGamesGameIdLanguageCodesLanguageCodePost(t, r, a, o)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                }
            }
        }
        function kn() {
            return null !== Rn && Rn.apply(this, arguments) || this
        }
        function Mn(l) {
            var e = this;
            return {
                v1GameLocalizationStatusGameIdTranslationCountsGet: function(i, s) {
                    return void 0 === s && (s = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gameId","Required parameter gameId was null or undefined when calling v1GameLocalizationStatusGameIdTranslationCountsGet.");
                            return a = "/v1/game-localization-status/{gameId}/translation-counts".replace("{gameId}", encodeURIComponent(String(i))),
                            t = wt.qg(a, !0),
                            l && (o = l.baseOptions),
                            n = mn(mn({
                                method: "GET"
                            }, o), s),
                            r = {},
                            a = {},
                            t.query = mn(mn(mn({}, t.query), a), s.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), s.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1GameLocalizationStatusTranslationCountsForLanguageOrLocaleGet: function(i, s, u, c) {
                    return void 0 === c && (c = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gameIds","Required parameter gameIds was null or undefined when calling v1GameLocalizationStatusTranslationCountsForLanguageOrLocaleGet.");
                            if (null == s)
                                throw new hn("languageOrLocaleCode","Required parameter languageOrLocaleCode was null or undefined when calling v1GameLocalizationStatusTranslationCountsForLanguageOrLocaleGet.");
                            if (null == u)
                                throw new hn("languageOrLocaleType","Required parameter languageOrLocaleType was null or undefined when calling v1GameLocalizationStatusTranslationCountsForLanguageOrLocaleGet.");
                            return t = wt.qg("/v1/game-localization-status/translation-counts-for-language-or-locale", !0),
                            l && (o = l.baseOptions),
                            n = mn(mn({
                                method: "GET"
                            }, o), c),
                            r = {},
                            a = {},
                            i && (a.gameIds = i),
                            void 0 !== s && (a.languageOrLocaleCode = s),
                            void 0 !== u && (a.languageOrLocaleType = u),
                            t.query = mn(mn(mn({}, t.query), a), c.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), c.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                }
            }
        }
        function jn(i) {
            return {
                v1GameLocalizationStatusGameIdTranslationCountsGet: function(t, r) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Mn(i).v1GameLocalizationStatusGameIdTranslationCountsGet(t, r)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1GameLocalizationStatusTranslationCountsForLanguageOrLocaleGet: function(t, r, a, o) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Mn(i).v1GameLocalizationStatusTranslationCountsForLanguageOrLocaleGet(t, r, a, o)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                }
            }
        }
        oe(Dn, En = ae),
        Dn.prototype.v1BadgesBadgeIdDescriptionLanguageCodesLanguageCodePatch = function(e, t, n, r) {
            var a = this;
            return On(this.configuration).v1BadgesBadgeIdDescriptionLanguageCodesLanguageCodePatch(e, t, n, r).then(function(e) {
                return e(a.axios, a.basePath)
            })
        }
        ,
        Dn.prototype.v1BadgesBadgeIdIconsGet = function(e, t, n, r) {
            var a = this;
            return On(this.configuration).v1BadgesBadgeIdIconsGet(e, t, n, r).then(function(e) {
                return e(a.axios, a.basePath)
            })
        }
        ,
        Dn.prototype.v1BadgesBadgeIdIconsLanguageCodesLanguageCodeDelete = function(e, t, n) {
            var r = this;
            return On(this.configuration).v1BadgesBadgeIdIconsLanguageCodesLanguageCodeDelete(e, t, n).then(function(e) {
                return e(r.axios, r.basePath)
            })
        }
        ,
        Dn.prototype.v1BadgesBadgeIdIconsLanguageCodesLanguageCodePost = function(e, t, n, r) {
            var a = this;
            return On(this.configuration).v1BadgesBadgeIdIconsLanguageCodesLanguageCodePost(e, t, n, r).then(function(e) {
                return e(a.axios, a.basePath)
            })
        }
        ,
        Dn.prototype.v1BadgesBadgeIdNameDescriptionGet = function(e, t) {
            var n = this;
            return On(this.configuration).v1BadgesBadgeIdNameDescriptionGet(e, t).then(function(e) {
                return e(n.axios, n.basePath)
            })
        }
        ,
        Dn.prototype.v1BadgesBadgeIdNameDescriptionLanguageCodesLanguageCodeDelete = function(e, t, n) {
            var r = this;
            return On(this.configuration).v1BadgesBadgeIdNameDescriptionLanguageCodesLanguageCodeDelete(e, t, n).then(function(e) {
                return e(r.axios, r.basePath)
            })
        }
        ,
        Dn.prototype.v1BadgesBadgeIdNameDescriptionLanguageCodesLanguageCodePatch = function(e, t, n, r) {
            var a = this;
            return On(this.configuration).v1BadgesBadgeIdNameDescriptionLanguageCodesLanguageCodePatch(e, t, n, r).then(function(e) {
                return e(a.axios, a.basePath)
            })
        }
        ,
        Dn.prototype.v1BadgesBadgeIdNameLanguageCodesLanguageCodePatch = function(e, t, n, r) {
            var a = this;
            return On(this.configuration).v1BadgesBadgeIdNameLanguageCodesLanguageCodePatch(e, t, n, r).then(function(e) {
                return e(a.axios, a.basePath)
            })
        }
        ,
        oe(Bn, Sn = ae),
        Bn.prototype.v1DeveloperProductsDeveloperProductIdDescriptionLanguageCodesLanguageCodePatch = function(e, t, n, r) {
            var a = this;
            return xn(this.configuration).v1DeveloperProductsDeveloperProductIdDescriptionLanguageCodesLanguageCodePatch(e, t, n, r).then(function(e) {
                return e(a.axios, a.basePath)
            })
        }
        ,
        Bn.prototype.v1DeveloperProductsDeveloperProductIdIconsGet = function(e, t, n, r) {
            var a = this;
            return xn(this.configuration).v1DeveloperProductsDeveloperProductIdIconsGet(e, t, n, r).then(function(e) {
                return e(a.axios, a.basePath)
            })
        }
        ,
        Bn.prototype.v1DeveloperProductsDeveloperProductIdIconsLanguageCodesLanguageCodeDelete = function(e, t, n) {
            var r = this;
            return xn(this.configuration).v1DeveloperProductsDeveloperProductIdIconsLanguageCodesLanguageCodeDelete(e, t, n).then(function(e) {
                return e(r.axios, r.basePath)
            })
        }
        ,
        Bn.prototype.v1DeveloperProductsDeveloperProductIdIconsLanguageCodesLanguageCodePost = function(e, t, n, r) {
            var a = this;
            return xn(this.configuration).v1DeveloperProductsDeveloperProductIdIconsLanguageCodesLanguageCodePost(e, t, n, r).then(function(e) {
                return e(a.axios, a.basePath)
            })
        }
        ,
        Bn.prototype.v1DeveloperProductsDeveloperProductIdNameDescriptionGet = function(e, t) {
            var n = this;
            return xn(this.configuration).v1DeveloperProductsDeveloperProductIdNameDescriptionGet(e, t).then(function(e) {
                return e(n.axios, n.basePath)
            })
        }
        ,
        Bn.prototype.v1DeveloperProductsDeveloperProductIdNameDescriptionLanguageCodesLanguageCodeDelete = function(e, t, n) {
            var r = this;
            return xn(this.configuration).v1DeveloperProductsDeveloperProductIdNameDescriptionLanguageCodesLanguageCodeDelete(e, t, n).then(function(e) {
                return e(r.axios, r.basePath)
            })
        }
        ,
        Bn.prototype.v1DeveloperProductsDeveloperProductIdNameDescriptionLanguageCodesLanguageCodePatch = function(e, t, n, r) {
            var a = this;
            return xn(this.configuration).v1DeveloperProductsDeveloperProductIdNameDescriptionLanguageCodesLanguageCodePatch(e, t, n, r).then(function(e) {
                return e(a.axios, a.basePath)
            })
        }
        ,
        Bn.prototype.v1DeveloperProductsDeveloperProductIdNameLanguageCodesLanguageCodePatch = function(e, t, n, r) {
            var a = this;
            return xn(this.configuration).v1DeveloperProductsDeveloperProductIdNameLanguageCodesLanguageCodePatch(e, t, n, r).then(function(e) {
                return e(a.axios, a.basePath)
            })
        }
        ,
        oe(kn, Rn = ae),
        kn.prototype.v1GameIconGamesGameIdGet = function(e, t, n, r) {
            var a = this;
            return Fn(this.configuration).v1GameIconGamesGameIdGet(e, t, n, r).then(function(e) {
                return e(a.axios, a.basePath)
            })
        }
        ,
        kn.prototype.v1GameIconGamesGameIdLanguageCodesLanguageCodeDelete = function(e, t, n) {
            var r = this;
            return Fn(this.configuration).v1GameIconGamesGameIdLanguageCodesLanguageCodeDelete(e, t, n).then(function(e) {
                return e(r.axios, r.basePath)
            })
        }
        ,
        kn.prototype.v1GameIconGamesGameIdLanguageCodesLanguageCodePost = function(e, t, n, r) {
            var a = this;
            return Fn(this.configuration).v1GameIconGamesGameIdLanguageCodesLanguageCodePost(e, t, n, r).then(function(e) {
                return e(a.axios, a.basePath)
            })
        }
        ;
        var zn, Vn, Hn, f = (oe(Wn, zn = ae),
        Wn.prototype.v1GameLocalizationStatusGameIdTranslationCountsGet = function(e, t) {
            var n = this;
            return jn(this.configuration).v1GameLocalizationStatusGameIdTranslationCountsGet(e, t).then(function(e) {
                return e(n.axios, n.basePath)
            })
        }
        ,
        Wn.prototype.v1GameLocalizationStatusTranslationCountsForLanguageOrLocaleGet = function(e, t, n, r) {
            var a = this;
            return jn(this.configuration).v1GameLocalizationStatusTranslationCountsForLanguageOrLocaleGet(e, t, n, r).then(function(e) {
                return e(a.axios, a.basePath)
            })
        }
        ,
        Wn);
        function Wn() {
            return null !== zn && zn.apply(this, arguments) || this
        }
        function Kn(d) {
            var e = this;
            return {
                v1GamePassesGamePassIdDescriptionLanguageCodesLanguageCodePatch: function(i, s, u, c) {
                    return void 0 === c && (c = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gamePassId","Required parameter gamePassId was null or undefined when calling v1GamePassesGamePassIdDescriptionLanguageCodesLanguageCodePatch.");
                            if (null == s)
                                throw new hn("languageCode","Required parameter languageCode was null or undefined when calling v1GamePassesGamePassIdDescriptionLanguageCodesLanguageCodePatch.");
                            if (null == u)
                                throw new hn("request","Required parameter request was null or undefined when calling v1GamePassesGamePassIdDescriptionLanguageCodesLanguageCodePatch.");
                            return r = "/v1/game-passes/{gamePassId}/description/language-codes/{languageCode}".replace("{gamePassId}", encodeURIComponent(String(i))).replace("{languageCode}", encodeURIComponent(String(s))),
                            t = wt.qg(r, !0),
                            d && (o = d.baseOptions),
                            n = mn(mn({
                                method: "PATCH"
                            }, o), c),
                            a = {},
                            (r = {})["Content-Type"] = "application/json",
                            t.query = mn(mn(mn({}, t.query), a), c.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), c.headers),
                            o = "string" != typeof u || "application/json" === n.headers["Content-Type"],
                            n.data = o ? JSON.stringify(void 0 !== u ? u : {}) : u || "",
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1GamePassesGamePassIdIconsGet: function(i, s, u, c) {
                    return void 0 === c && (c = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gamePassId","Required parameter gamePassId was null or undefined when calling v1GamePassesGamePassIdIconsGet.");
                            return a = "/v1/game-passes/{gamePassId}/icons".replace("{gamePassId}", encodeURIComponent(String(i))),
                            t = wt.qg(a, !0),
                            d && (o = d.baseOptions),
                            n = mn(mn({
                                method: "GET"
                            }, o), c),
                            r = {},
                            a = {},
                            void 0 !== s && (a.width = s),
                            void 0 !== u && (a.height = u),
                            t.query = mn(mn(mn({}, t.query), a), c.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), c.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1GamePassesGamePassIdIconsLanguageCodesLanguageCodeDelete: function(i, s, u) {
                    return void 0 === u && (u = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gamePassId","Required parameter gamePassId was null or undefined when calling v1GamePassesGamePassIdIconsLanguageCodesLanguageCodeDelete.");
                            if (null == s)
                                throw new hn("languageCode","Required parameter languageCode was null or undefined when calling v1GamePassesGamePassIdIconsLanguageCodesLanguageCodeDelete.");
                            return a = "/v1/game-passes/{gamePassId}/icons/language-codes/{languageCode}".replace("{gamePassId}", encodeURIComponent(String(i))).replace("{languageCode}", encodeURIComponent(String(s))),
                            t = wt.qg(a, !0),
                            d && (o = d.baseOptions),
                            n = mn(mn({
                                method: "DELETE"
                            }, o), u),
                            r = {},
                            a = {},
                            t.query = mn(mn(mn({}, t.query), a), u.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), u.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1GamePassesGamePassIdIconsLanguageCodesLanguageCodePost: function(s, u, c, l) {
                    return void 0 === l && (l = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o, i;
                        return In(this, function(e) {
                            if (null == s)
                                throw new hn("gamePassId","Required parameter gamePassId was null or undefined when calling v1GamePassesGamePassIdIconsLanguageCodesLanguageCodePost.");
                            if (null == u)
                                throw new hn("languageCode","Required parameter languageCode was null or undefined when calling v1GamePassesGamePassIdIconsLanguageCodesLanguageCodePost.");
                            return o = "/v1/game-passes/{gamePassId}/icons/language-codes/{languageCode}".replace("{gamePassId}", encodeURIComponent(String(s))).replace("{languageCode}", encodeURIComponent(String(u))),
                            t = wt.qg(o, !0),
                            d && (i = d.baseOptions),
                            n = mn(mn({
                                method: "POST"
                            }, i), l),
                            r = {},
                            a = {},
                            o = new FormData,
                            void 0 !== c && o.append("request.files", c),
                            r["Content-Type"] = "multipart/form-data",
                            t.query = mn(mn(mn({}, t.query), a), l.query),
                            delete t.search,
                            i = i && i.headers ? i.headers : {},
                            n.headers = mn(mn(mn({}, r), i), l.headers),
                            n.data = o,
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1GamePassesGamePassIdNameDescriptionGet: function(i, s) {
                    return void 0 === s && (s = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gamePassId","Required parameter gamePassId was null or undefined when calling v1GamePassesGamePassIdNameDescriptionGet.");
                            return a = "/v1/game-passes/{gamePassId}/name-description".replace("{gamePassId}", encodeURIComponent(String(i))),
                            t = wt.qg(a, !0),
                            d && (o = d.baseOptions),
                            n = mn(mn({
                                method: "GET"
                            }, o), s),
                            r = {},
                            a = {},
                            t.query = mn(mn(mn({}, t.query), a), s.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), s.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1GamePassesGamePassIdNameDescriptionLanguageCodesLanguageCodeDelete: function(i, s, u) {
                    return void 0 === u && (u = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gamePassId","Required parameter gamePassId was null or undefined when calling v1GamePassesGamePassIdNameDescriptionLanguageCodesLanguageCodeDelete.");
                            if (null == s)
                                throw new hn("languageCode","Required parameter languageCode was null or undefined when calling v1GamePassesGamePassIdNameDescriptionLanguageCodesLanguageCodeDelete.");
                            return a = "/v1/game-passes/{gamePassId}/name-description/language-codes/{languageCode}".replace("{gamePassId}", encodeURIComponent(String(i))).replace("{languageCode}", encodeURIComponent(String(s))),
                            t = wt.qg(a, !0),
                            d && (o = d.baseOptions),
                            n = mn(mn({
                                method: "DELETE"
                            }, o), u),
                            r = {},
                            a = {},
                            t.query = mn(mn(mn({}, t.query), a), u.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), u.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1GamePassesGamePassIdNameDescriptionLanguageCodesLanguageCodePatch: function(i, s, u, c) {
                    return void 0 === c && (c = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gamePassId","Required parameter gamePassId was null or undefined when calling v1GamePassesGamePassIdNameDescriptionLanguageCodesLanguageCodePatch.");
                            if (null == s)
                                throw new hn("languageCode","Required parameter languageCode was null or undefined when calling v1GamePassesGamePassIdNameDescriptionLanguageCodesLanguageCodePatch.");
                            if (null == u)
                                throw new hn("request","Required parameter request was null or undefined when calling v1GamePassesGamePassIdNameDescriptionLanguageCodesLanguageCodePatch.");
                            return r = "/v1/game-passes/{gamePassId}/name-description/language-codes/{languageCode}".replace("{gamePassId}", encodeURIComponent(String(i))).replace("{languageCode}", encodeURIComponent(String(s))),
                            t = wt.qg(r, !0),
                            d && (o = d.baseOptions),
                            n = mn(mn({
                                method: "PATCH"
                            }, o), c),
                            a = {},
                            (r = {})["Content-Type"] = "application/json",
                            t.query = mn(mn(mn({}, t.query), a), c.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), c.headers),
                            o = "string" != typeof u || "application/json" === n.headers["Content-Type"],
                            n.data = o ? JSON.stringify(void 0 !== u ? u : {}) : u || "",
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1GamePassesGamePassIdNameLanguageCodesLanguageCodePatch: function(i, s, u, c) {
                    return void 0 === c && (c = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gamePassId","Required parameter gamePassId was null or undefined when calling v1GamePassesGamePassIdNameLanguageCodesLanguageCodePatch.");
                            if (null == s)
                                throw new hn("languageCode","Required parameter languageCode was null or undefined when calling v1GamePassesGamePassIdNameLanguageCodesLanguageCodePatch.");
                            if (null == u)
                                throw new hn("request","Required parameter request was null or undefined when calling v1GamePassesGamePassIdNameLanguageCodesLanguageCodePatch.");
                            return r = "/v1/game-passes/{gamePassId}/name/language-codes/{languageCode}".replace("{gamePassId}", encodeURIComponent(String(i))).replace("{languageCode}", encodeURIComponent(String(s))),
                            t = wt.qg(r, !0),
                            d && (o = d.baseOptions),
                            n = mn(mn({
                                method: "PATCH"
                            }, o), c),
                            a = {},
                            (r = {})["Content-Type"] = "application/json",
                            t.query = mn(mn(mn({}, t.query), a), c.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), c.headers),
                            o = "string" != typeof u || "application/json" === n.headers["Content-Type"],
                            n.data = o ? JSON.stringify(void 0 !== u ? u : {}) : u || "",
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                }
            }
        }
        function Xn(i) {
            return {
                v1GamePassesGamePassIdDescriptionLanguageCodesLanguageCodePatch: function(t, r, a, o) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Kn(i).v1GamePassesGamePassIdDescriptionLanguageCodesLanguageCodePatch(t, r, a, o)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1GamePassesGamePassIdIconsGet: function(t, r, a, o) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Kn(i).v1GamePassesGamePassIdIconsGet(t, r, a, o)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1GamePassesGamePassIdIconsLanguageCodesLanguageCodeDelete: function(t, r, a) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Kn(i).v1GamePassesGamePassIdIconsLanguageCodesLanguageCodeDelete(t, r, a)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1GamePassesGamePassIdIconsLanguageCodesLanguageCodePost: function(t, r, a, o) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Kn(i).v1GamePassesGamePassIdIconsLanguageCodesLanguageCodePost(t, r, a, o)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1GamePassesGamePassIdNameDescriptionGet: function(t, r) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Kn(i).v1GamePassesGamePassIdNameDescriptionGet(t, r)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1GamePassesGamePassIdNameDescriptionLanguageCodesLanguageCodeDelete: function(t, r, a) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Kn(i).v1GamePassesGamePassIdNameDescriptionLanguageCodesLanguageCodeDelete(t, r, a)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1GamePassesGamePassIdNameDescriptionLanguageCodesLanguageCodePatch: function(t, r, a, o) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Kn(i).v1GamePassesGamePassIdNameDescriptionLanguageCodesLanguageCodePatch(t, r, a, o)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1GamePassesGamePassIdNameLanguageCodesLanguageCodePatch: function(t, r, a, o) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Kn(i).v1GamePassesGamePassIdNameLanguageCodesLanguageCodePatch(t, r, a, o)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                }
            }
        }
        function Jn() {
            return null !== Vn && Vn.apply(this, arguments) || this
        }
        function Qn(d) {
            var e = this;
            return {
                v1GameThumbnailsGamesGameIdImagesGet: function(i, s, u, c) {
                    return void 0 === c && (c = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gameId","Required parameter gameId was null or undefined when calling v1GameThumbnailsGamesGameIdImagesGet.");
                            return a = "/v1/game-thumbnails/games/{gameId}/images".replace("{gameId}", encodeURIComponent(String(i))),
                            t = wt.qg(a, !0),
                            d && (o = d.baseOptions),
                            n = mn(mn({
                                method: "GET"
                            }, o), c),
                            r = {},
                            a = {},
                            void 0 !== s && (a.width = s),
                            void 0 !== u && (a.height = u),
                            t.query = mn(mn(mn({}, t.query), a), c.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), c.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagePost: function(s, u, c, l) {
                    return void 0 === l && (l = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o, i;
                        return In(this, function(e) {
                            if (null == s)
                                throw new hn("gameId","Required parameter gameId was null or undefined when calling v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagePost.");
                            if (null == u)
                                throw new hn("languageCode","Required parameter languageCode was null or undefined when calling v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagePost.");
                            return o = "/v1/game-thumbnails/games/{gameId}/language-codes/{languageCode}/image".replace("{gameId}", encodeURIComponent(String(s))).replace("{languageCode}", encodeURIComponent(String(u))),
                            t = wt.qg(o, !0),
                            d && (i = d.baseOptions),
                            n = mn(mn({
                                method: "POST"
                            }, i), l),
                            r = {},
                            a = {},
                            o = new FormData,
                            void 0 !== c && o.append("gameThumbnailRequest.files", c),
                            r["Content-Type"] = "multipart/form-data",
                            t.query = mn(mn(mn({}, t.query), a), l.query),
                            delete t.search,
                            i = i && i.headers ? i.headers : {},
                            n.headers = mn(mn(mn({}, r), i), l.headers),
                            n.data = o,
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagesImageIdDelete: function(i, s, u, c) {
                    return void 0 === c && (c = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gameId","Required parameter gameId was null or undefined when calling v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagesImageIdDelete.");
                            if (null == s)
                                throw new hn("languageCode","Required parameter languageCode was null or undefined when calling v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagesImageIdDelete.");
                            if (null == u)
                                throw new hn("imageId","Required parameter imageId was null or undefined when calling v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagesImageIdDelete.");
                            return a = "/v1/game-thumbnails/games/{gameId}/language-codes/{languageCode}/images/{imageId}".replace("{gameId}", encodeURIComponent(String(i))).replace("{languageCode}", encodeURIComponent(String(s))).replace("{imageId}", encodeURIComponent(String(u))),
                            t = wt.qg(a, !0),
                            d && (o = d.baseOptions),
                            n = mn(mn({
                                method: "DELETE"
                            }, o), c),
                            r = {},
                            a = {},
                            t.query = mn(mn(mn({}, t.query), a), c.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), c.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagesOrderPost: function(i, s, u, c) {
                    return void 0 === c && (c = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gameId","Required parameter gameId was null or undefined when calling v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagesOrderPost.");
                            if (null == s)
                                throw new hn("languageCode","Required parameter languageCode was null or undefined when calling v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagesOrderPost.");
                            if (null == u)
                                throw new hn("request","Required parameter request was null or undefined when calling v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagesOrderPost.");
                            return r = "/v1/game-thumbnails/games/{gameId}/language-codes/{languageCode}/images/order".replace("{gameId}", encodeURIComponent(String(i))).replace("{languageCode}", encodeURIComponent(String(s))),
                            t = wt.qg(r, !0),
                            d && (o = d.baseOptions),
                            n = mn(mn({
                                method: "POST"
                            }, o), c),
                            a = {},
                            (r = {})["Content-Type"] = "application/json",
                            t.query = mn(mn(mn({}, t.query), a), c.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), c.headers),
                            o = "string" != typeof u || "application/json" === n.headers["Content-Type"],
                            n.data = o ? JSON.stringify(void 0 !== u ? u : {}) : u || "",
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                }
            }
        }
        function Yn(i) {
            return {
                v1GameThumbnailsGamesGameIdImagesGet: function(t, r, a, o) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Qn(i).v1GameThumbnailsGamesGameIdImagesGet(t, r, a, o)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagePost: function(t, r, a, o) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Qn(i).v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagePost(t, r, a, o)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagesImageIdDelete: function(t, r, a, o) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Qn(i).v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagesImageIdDelete(t, r, a, o)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagesOrderPost: function(t, r, a, o) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Qn(i).v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagesOrderPost(t, r, a, o)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                }
            }
        }
        function $n() {
            return null !== Hn && Hn.apply(this, arguments) || this
        }
        function Zn(l) {
            var e = this;
            return {
                v1LocalizationtableAvailableLanguagesGet: function(i) {
                    return void 0 === i && (i = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            return t = wt.qg("/v1/localizationtable/available-languages", !0),
                            l && (o = l.baseOptions),
                            n = mn(mn({
                                method: "GET"
                            }, o), i),
                            r = {},
                            a = {},
                            t.query = mn(mn(mn({}, t.query), a), i.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), i.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1LocalizationtableGamesGameIdAssetsGenerationRequestPost: function(i, s) {
                    return void 0 === s && (s = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gameId","Required parameter gameId was null or undefined when calling v1LocalizationtableGamesGameIdAssetsGenerationRequestPost.");
                            return a = "/v1/localizationtable/games/{gameId}/assets-generation-request".replace("{gameId}", encodeURIComponent(String(i))),
                            t = wt.qg(a, !0),
                            l && (o = l.baseOptions),
                            n = mn(mn({
                                method: "POST"
                            }, o), s),
                            r = {},
                            a = {},
                            t.query = mn(mn(mn({}, t.query), a), s.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), s.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1LocalizationtableGametablesGameIdPatch: function(i, s, u) {
                    return void 0 === u && (u = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gameId","Required parameter gameId was null or undefined when calling v1LocalizationtableGametablesGameIdPatch.");
                            if (null == s)
                                throw new hn("request","Required parameter request was null or undefined when calling v1LocalizationtableGametablesGameIdPatch.");
                            return r = "/v1/localizationtable/gametables/{gameId}".replace("{gameId}", encodeURIComponent(String(i))),
                            t = wt.qg(r, !0),
                            l && (o = l.baseOptions),
                            n = mn(mn({
                                method: "PATCH"
                            }, o), u),
                            a = {},
                            (r = {})["Content-Type"] = "application/json",
                            t.query = mn(mn(mn({}, t.query), a), u.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), u.headers),
                            o = "string" != typeof s || "application/json" === n.headers["Content-Type"],
                            n.data = o ? JSON.stringify(void 0 !== s ? s : {}) : s || "",
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1LocalizationtableTablesGet: function(i, s) {
                    return void 0 === s && (s = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("assetId","Required parameter assetId was null or undefined when calling v1LocalizationtableTablesGet.");
                            return t = wt.qg("/v1/localizationtable/tables", !0),
                            l && (o = l.baseOptions),
                            n = mn(mn({
                                method: "GET"
                            }, o), s),
                            r = {},
                            a = {},
                            void 0 !== i && (a.assetId = i),
                            t.query = mn(mn(mn({}, t.query), a), s.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), s.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1LocalizationtableTablesPost: function(i, s) {
                    return void 0 === s && (s = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("request","Required parameter request was null or undefined when calling v1LocalizationtableTablesPost.");
                            return t = wt.qg("/v1/localizationtable/tables", !0),
                            l && (o = l.baseOptions),
                            n = mn(mn({
                                method: "POST"
                            }, o), s),
                            a = {},
                            (r = {})["Content-Type"] = "application/json",
                            t.query = mn(mn(mn({}, t.query), a), s.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), s.headers),
                            o = "string" != typeof i || "application/json" === n.headers["Content-Type"],
                            n.data = o ? JSON.stringify(void 0 !== i ? i : {}) : i || "",
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1LocalizationtableTablesTableIdEntriesGet: function(i, s, u, c) {
                    return void 0 === c && (c = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("tableId","Required parameter tableId was null or undefined when calling v1LocalizationtableTablesTableIdEntriesGet.");
                            return a = "/v1/localizationtable/tables/{tableId}/entries".replace("{tableId}", encodeURIComponent(String(i))),
                            t = wt.qg(a, !0),
                            l && (o = l.baseOptions),
                            n = mn(mn({
                                method: "GET"
                            }, o), c),
                            r = {},
                            a = {},
                            void 0 !== s && (a.cursor = s),
                            void 0 !== u && (a.gameId = u),
                            t.query = mn(mn(mn({}, t.query), a), c.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), c.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1LocalizationtableTablesTableIdEntriesTranslationHistoryPost: function(i, s, u, c) {
                    return void 0 === c && (c = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("tableId","Required parameter tableId was null or undefined when calling v1LocalizationtableTablesTableIdEntriesTranslationHistoryPost.");
                            if (null == s)
                                throw new hn("request","Required parameter request was null or undefined when calling v1LocalizationtableTablesTableIdEntriesTranslationHistoryPost.");
                            return a = "/v1/localizationtable/tables/{tableId}/entries/translation-history".replace("{tableId}", encodeURIComponent(String(i))),
                            t = wt.qg(a, !0),
                            l && (o = l.baseOptions),
                            n = mn(mn({
                                method: "POST"
                            }, o), c),
                            r = {},
                            a = {},
                            void 0 !== u && (a.gameId = u),
                            r["Content-Type"] = "application/json",
                            t.query = mn(mn(mn({}, t.query), a), c.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), c.headers),
                            o = "string" != typeof s || "application/json" === n.headers["Content-Type"],
                            n.data = o ? JSON.stringify(void 0 !== s ? s : {}) : s || "",
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1LocalizationtableTablesTableIdEntryCountGet: function(i, s, u) {
                    return void 0 === u && (u = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("tableId","Required parameter tableId was null or undefined when calling v1LocalizationtableTablesTableIdEntryCountGet.");
                            return a = "/v1/localizationtable/tables/{tableId}/entry-count".replace("{tableId}", encodeURIComponent(String(i))),
                            t = wt.qg(a, !0),
                            l && (o = l.baseOptions),
                            n = mn(mn({
                                method: "GET"
                            }, o), u),
                            r = {},
                            a = {},
                            void 0 !== s && (a.gameId = s),
                            t.query = mn(mn(mn({}, t.query), a), u.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), u.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1LocalizationtableTablesTableIdGet: function(i, s) {
                    return void 0 === s && (s = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("tableId","Required parameter tableId was null or undefined when calling v1LocalizationtableTablesTableIdGet.");
                            return a = "/v1/localizationtable/tables/{tableId}".replace("{tableId}", encodeURIComponent(String(i))),
                            t = wt.qg(a, !0),
                            l && (o = l.baseOptions),
                            n = mn(mn({
                                method: "GET"
                            }, o), s),
                            r = {},
                            a = {},
                            t.query = mn(mn(mn({}, t.query), a), s.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), s.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1LocalizationtableTablesTableIdPatch: function(i, s, u, c) {
                    return void 0 === c && (c = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("tableId","Required parameter tableId was null or undefined when calling v1LocalizationtableTablesTableIdPatch.");
                            if (null == s)
                                throw new hn("request","Required parameter request was null or undefined when calling v1LocalizationtableTablesTableIdPatch.");
                            return a = "/v1/localizationtable/tables/{tableId}".replace("{tableId}", encodeURIComponent(String(i))),
                            t = wt.qg(a, !0),
                            l && (o = l.baseOptions),
                            n = mn(mn({
                                method: "PATCH"
                            }, o), c),
                            r = {},
                            a = {},
                            void 0 !== u && (a.gameId = u),
                            r["Content-Type"] = "application/json",
                            t.query = mn(mn(mn({}, t.query), a), c.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), c.headers),
                            o = "string" != typeof s || "application/json" === n.headers["Content-Type"],
                            n.data = o ? JSON.stringify(void 0 !== s ? s : {}) : s || "",
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                }
            }
        }
        function er(i) {
            return {
                v1LocalizationtableAvailableLanguagesGet: function(t) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Zn(i).v1LocalizationtableAvailableLanguagesGet(t)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1LocalizationtableGamesGameIdAssetsGenerationRequestPost: function(t, r) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Zn(i).v1LocalizationtableGamesGameIdAssetsGenerationRequestPost(t, r)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1LocalizationtableGametablesGameIdPatch: function(t, r, a) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Zn(i).v1LocalizationtableGametablesGameIdPatch(t, r, a)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1LocalizationtableTablesGet: function(t, r) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Zn(i).v1LocalizationtableTablesGet(t, r)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1LocalizationtableTablesPost: function(t, r) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Zn(i).v1LocalizationtableTablesPost(t, r)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1LocalizationtableTablesTableIdEntriesGet: function(t, r, a, o) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Zn(i).v1LocalizationtableTablesTableIdEntriesGet(t, r, a, o)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1LocalizationtableTablesTableIdEntriesTranslationHistoryPost: function(t, r, a, o) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Zn(i).v1LocalizationtableTablesTableIdEntriesTranslationHistoryPost(t, r, a, o)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1LocalizationtableTablesTableIdEntryCountGet: function(t, r, a) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Zn(i).v1LocalizationtableTablesTableIdEntryCountGet(t, r, a)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1LocalizationtableTablesTableIdGet: function(t, r) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Zn(i).v1LocalizationtableTablesTableIdGet(t, r)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1LocalizationtableTablesTableIdPatch: function(t, r, a, o) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, Zn(i).v1LocalizationtableTablesTableIdPatch(t, r, a, o)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                }
            }
        }
        oe(Jn, Vn = ae),
        Jn.prototype.v1GamePassesGamePassIdDescriptionLanguageCodesLanguageCodePatch = function(e, t, n, r) {
            var a = this;
            return Xn(this.configuration).v1GamePassesGamePassIdDescriptionLanguageCodesLanguageCodePatch(e, t, n, r).then(function(e) {
                return e(a.axios, a.basePath)
            })
        }
        ,
        Jn.prototype.v1GamePassesGamePassIdIconsGet = function(e, t, n, r) {
            var a = this;
            return Xn(this.configuration).v1GamePassesGamePassIdIconsGet(e, t, n, r).then(function(e) {
                return e(a.axios, a.basePath)
            })
        }
        ,
        Jn.prototype.v1GamePassesGamePassIdIconsLanguageCodesLanguageCodeDelete = function(e, t, n) {
            var r = this;
            return Xn(this.configuration).v1GamePassesGamePassIdIconsLanguageCodesLanguageCodeDelete(e, t, n).then(function(e) {
                return e(r.axios, r.basePath)
            })
        }
        ,
        Jn.prototype.v1GamePassesGamePassIdIconsLanguageCodesLanguageCodePost = function(e, t, n, r) {
            var a = this;
            return Xn(this.configuration).v1GamePassesGamePassIdIconsLanguageCodesLanguageCodePost(e, t, n, r).then(function(e) {
                return e(a.axios, a.basePath)
            })
        }
        ,
        Jn.prototype.v1GamePassesGamePassIdNameDescriptionGet = function(e, t) {
            var n = this;
            return Xn(this.configuration).v1GamePassesGamePassIdNameDescriptionGet(e, t).then(function(e) {
                return e(n.axios, n.basePath)
            })
        }
        ,
        Jn.prototype.v1GamePassesGamePassIdNameDescriptionLanguageCodesLanguageCodeDelete = function(e, t, n) {
            var r = this;
            return Xn(this.configuration).v1GamePassesGamePassIdNameDescriptionLanguageCodesLanguageCodeDelete(e, t, n).then(function(e) {
                return e(r.axios, r.basePath)
            })
        }
        ,
        Jn.prototype.v1GamePassesGamePassIdNameDescriptionLanguageCodesLanguageCodePatch = function(e, t, n, r) {
            var a = this;
            return Xn(this.configuration).v1GamePassesGamePassIdNameDescriptionLanguageCodesLanguageCodePatch(e, t, n, r).then(function(e) {
                return e(a.axios, a.basePath)
            })
        }
        ,
        Jn.prototype.v1GamePassesGamePassIdNameLanguageCodesLanguageCodePatch = function(e, t, n, r) {
            var a = this;
            return Xn(this.configuration).v1GamePassesGamePassIdNameLanguageCodesLanguageCodePatch(e, t, n, r).then(function(e) {
                return e(a.axios, a.basePath)
            })
        }
        ,
        oe($n, Hn = ae),
        $n.prototype.v1GameThumbnailsGamesGameIdImagesGet = function(e, t, n, r) {
            var a = this;
            return Yn(this.configuration).v1GameThumbnailsGamesGameIdImagesGet(e, t, n, r).then(function(e) {
                return e(a.axios, a.basePath)
            })
        }
        ,
        $n.prototype.v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagePost = function(e, t, n, r) {
            var a = this;
            return Yn(this.configuration).v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagePost(e, t, n, r).then(function(e) {
                return e(a.axios, a.basePath)
            })
        }
        ,
        $n.prototype.v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagesImageIdDelete = function(e, t, n, r) {
            var a = this;
            return Yn(this.configuration).v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagesImageIdDelete(e, t, n, r).then(function(e) {
                return e(a.axios, a.basePath)
            })
        }
        ,
        $n.prototype.v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagesOrderPost = function(e, t, n, r) {
            var a = this;
            return Yn(this.configuration).v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagesOrderPost(e, t, n, r).then(function(e) {
                return e(a.axios, a.basePath)
            })
        }
        ;
        var tr, nr, rr, S = (oe(ar, tr = ae),
        ar.prototype.v1LocalizationtableAvailableLanguagesGet = function(e) {
            var t = this;
            return er(this.configuration).v1LocalizationtableAvailableLanguagesGet(e).then(function(e) {
                return e(t.axios, t.basePath)
            })
        }
        ,
        ar.prototype.v1LocalizationtableGamesGameIdAssetsGenerationRequestPost = function(e, t) {
            var n = this;
            return er(this.configuration).v1LocalizationtableGamesGameIdAssetsGenerationRequestPost(e, t).then(function(e) {
                return e(n.axios, n.basePath)
            })
        }
        ,
        ar.prototype.v1LocalizationtableGametablesGameIdPatch = function(e, t, n) {
            var r = this;
            return er(this.configuration).v1LocalizationtableGametablesGameIdPatch(e, t, n).then(function(e) {
                return e(r.axios, r.basePath)
            })
        }
        ,
        ar.prototype.v1LocalizationtableTablesGet = function(e, t) {
            var n = this;
            return er(this.configuration).v1LocalizationtableTablesGet(e, t).then(function(e) {
                return e(n.axios, n.basePath)
            })
        }
        ,
        ar.prototype.v1LocalizationtableTablesPost = function(e, t) {
            var n = this;
            return er(this.configuration).v1LocalizationtableTablesPost(e, t).then(function(e) {
                return e(n.axios, n.basePath)
            })
        }
        ,
        ar.prototype.v1LocalizationtableTablesTableIdEntriesGet = function(e, t, n, r) {
            var a = this;
            return er(this.configuration).v1LocalizationtableTablesTableIdEntriesGet(e, t, n, r).then(function(e) {
                return e(a.axios, a.basePath)
            })
        }
        ,
        ar.prototype.v1LocalizationtableTablesTableIdEntriesTranslationHistoryPost = function(e, t, n, r) {
            var a = this;
            return er(this.configuration).v1LocalizationtableTablesTableIdEntriesTranslationHistoryPost(e, t, n, r).then(function(e) {
                return e(a.axios, a.basePath)
            })
        }
        ,
        ar.prototype.v1LocalizationtableTablesTableIdEntryCountGet = function(e, t, n) {
            var r = this;
            return er(this.configuration).v1LocalizationtableTablesTableIdEntryCountGet(e, t, n).then(function(e) {
                return e(r.axios, r.basePath)
            })
        }
        ,
        ar.prototype.v1LocalizationtableTablesTableIdGet = function(e, t) {
            var n = this;
            return er(this.configuration).v1LocalizationtableTablesTableIdGet(e, t).then(function(e) {
                return e(n.axios, n.basePath)
            })
        }
        ,
        ar.prototype.v1LocalizationtableTablesTableIdPatch = function(e, t, n, r) {
            var a = this;
            return er(this.configuration).v1LocalizationtableTablesTableIdPatch(e, t, n, r).then(function(e) {
                return e(a.axios, a.basePath)
            })
        }
        ,
        ar);
        function ar() {
            return null !== tr && tr.apply(this, arguments) || this
        }
        function or(c) {
            var e = this;
            return {
                v1NameDescriptionGamesGameIdGet: function(i, s) {
                    return void 0 === s && (s = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gameId","Required parameter gameId was null or undefined when calling v1NameDescriptionGamesGameIdGet.");
                            return a = "/v1/name-description/games/{gameId}".replace("{gameId}", encodeURIComponent(String(i))),
                            t = wt.qg(a, !0),
                            c && (o = c.baseOptions),
                            n = mn(mn({
                                method: "GET"
                            }, o), s),
                            r = {},
                            a = {},
                            t.query = mn(mn(mn({}, t.query), a), s.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), s.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1NameDescriptionGamesGameIdHistoryPost: function(i, s, u) {
                    return void 0 === u && (u = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gameId","Required parameter gameId was null or undefined when calling v1NameDescriptionGamesGameIdHistoryPost.");
                            if (null == s)
                                throw new hn("request","Required parameter request was null or undefined when calling v1NameDescriptionGamesGameIdHistoryPost.");
                            return r = "/v1/name-description/games/{gameId}/history".replace("{gameId}", encodeURIComponent(String(i))),
                            t = wt.qg(r, !0),
                            c && (o = c.baseOptions),
                            n = mn(mn({
                                method: "POST"
                            }, o), u),
                            a = {},
                            (r = {})["Content-Type"] = "application/json",
                            t.query = mn(mn(mn({}, t.query), a), u.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), u.headers),
                            o = "string" != typeof s || "application/json" === n.headers["Content-Type"],
                            n.data = o ? JSON.stringify(void 0 !== s ? s : {}) : s || "",
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1NameDescriptionGamesGameIdPatch: function(i, s, u) {
                    return void 0 === u && (u = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gameId","Required parameter gameId was null or undefined when calling v1NameDescriptionGamesGameIdPatch.");
                            if (null == s)
                                throw new hn("request","Required parameter request was null or undefined when calling v1NameDescriptionGamesGameIdPatch.");
                            return r = "/v1/name-description/games/{gameId}".replace("{gameId}", encodeURIComponent(String(i))),
                            t = wt.qg(r, !0),
                            c && (o = c.baseOptions),
                            n = mn(mn({
                                method: "PATCH"
                            }, o), u),
                            a = {},
                            (r = {})["Content-Type"] = "application/json",
                            t.query = mn(mn(mn({}, t.query), a), u.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), u.headers),
                            o = "string" != typeof s || "application/json" === n.headers["Content-Type"],
                            n.data = o ? JSON.stringify(void 0 !== s ? s : {}) : s || "",
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1NameDescriptionMetadataGet: function(i) {
                    return void 0 === i && (i = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            return t = wt.qg("/v1/name-description/metadata", !0),
                            c && (o = c.baseOptions),
                            n = mn(mn({
                                method: "GET"
                            }, o), i),
                            r = {},
                            a = {},
                            t.query = mn(mn(mn({}, t.query), a), i.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), i.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                }
            }
        }
        function ir(o) {
            return {
                v1NameDescriptionGamesGameIdGet: function(t, r) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, or(o).v1NameDescriptionGamesGameIdGet(t, r)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1NameDescriptionGamesGameIdHistoryPost: function(t, r, a) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, or(o).v1NameDescriptionGamesGameIdHistoryPost(t, r, a)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1NameDescriptionGamesGameIdPatch: function(t, r, a) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, or(o).v1NameDescriptionGamesGameIdPatch(t, r, a)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1NameDescriptionMetadataGet: function(t) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, or(o).v1NameDescriptionMetadataGet(t)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                }
            }
        }
        function sr() {
            return null !== nr && nr.apply(this, arguments) || this
        }
        function ur(l) {
            var e = this;
            return {
                v1PlayerPoliciesAllValuesGet: function(i) {
                    return void 0 === i && (i = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            return t = wt.qg("/v1/player-policies/all-values", !0),
                            l && (o = l.baseOptions),
                            n = mn(mn({
                                method: "GET"
                            }, o), i),
                            r = {},
                            a = {},
                            t.query = mn(mn(mn({}, t.query), a), i.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), i.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1PlayerPoliciesClientGet: function(i) {
                    return void 0 === i && (i = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            return t = wt.qg("/v1/player-policies-client", !0),
                            l && (o = l.baseOptions),
                            n = mn(mn({
                                method: "GET"
                            }, o), i),
                            r = {},
                            a = {},
                            t.query = mn(mn(mn({}, t.query), a), i.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), i.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1PlayerPoliciesRccGet: function(i, s, u, c) {
                    return void 0 === c && (c = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("userId","Required parameter userId was null or undefined when calling v1PlayerPoliciesRccGet.");
                            if (null == s)
                                throw new hn("ipAddress","Required parameter ipAddress was null or undefined when calling v1PlayerPoliciesRccGet.");
                            if (null == u)
                                throw new hn("userAgent","Required parameter userAgent was null or undefined when calling v1PlayerPoliciesRccGet.");
                            return t = wt.qg("/v1/player-policies-rcc", !0),
                            l && (o = l.baseOptions),
                            n = mn(mn({
                                method: "GET"
                            }, o), c),
                            r = {},
                            a = {},
                            void 0 !== i && (a.userId = i),
                            void 0 !== s && (a.ipAddress = s),
                            void 0 !== u && (a.userAgent = u),
                            t.query = mn(mn(mn({}, t.query), a), c.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), c.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                }
            }
        }
        function cr(i) {
            return {
                v1PlayerPoliciesAllValuesGet: function(t) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, ur(i).v1PlayerPoliciesAllValuesGet(t)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1PlayerPoliciesClientGet: function(t) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, ur(i).v1PlayerPoliciesClientGet(t)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1PlayerPoliciesRccGet: function(t, r, a, o) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, ur(i).v1PlayerPoliciesRccGet(t, r, a, o)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                }
            }
        }
        function lr() {
            return null !== rr && rr.apply(this, arguments) || this
        }
        function dr(c) {
            var e = this;
            return {
                v1SourceLanguageGamesGameIdGet: function(i, s) {
                    return void 0 === s && (s = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gameId","Required parameter gameId was null or undefined when calling v1SourceLanguageGamesGameIdGet.");
                            return a = "/v1/source-language/games/{gameId}".replace("{gameId}", encodeURIComponent(String(i))),
                            t = wt.qg(a, !0),
                            c && (o = c.baseOptions),
                            n = mn(mn({
                                method: "GET"
                            }, o), s),
                            r = {},
                            a = {},
                            t.query = mn(mn(mn({}, t.query), a), s.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), s.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1SourceLanguageGamesGameIdPatch: function(i, s, u) {
                    return void 0 === u && (u = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gameId","Required parameter gameId was null or undefined when calling v1SourceLanguageGamesGameIdPatch.");
                            if (null == s)
                                throw new hn("languageCode","Required parameter languageCode was null or undefined when calling v1SourceLanguageGamesGameIdPatch.");
                            return a = "/v1/source-language/games/{gameId}".replace("{gameId}", encodeURIComponent(String(i))),
                            t = wt.qg(a, !0),
                            c && (o = c.baseOptions),
                            n = mn(mn({
                                method: "PATCH"
                            }, o), u),
                            r = {},
                            a = {},
                            void 0 !== s && (a.languageCode = s),
                            t.query = mn(mn(mn({}, t.query), a), u.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), u.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                }
            }
        }
        function hr(o) {
            return {
                v1SourceLanguageGamesGameIdGet: function(t, r) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, dr(o).v1SourceLanguageGamesGameIdGet(t, r)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1SourceLanguageGamesGameIdPatch: function(t, r, a) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, dr(o).v1SourceLanguageGamesGameIdPatch(t, r, a)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                }
            }
        }
        oe(sr, nr = ae),
        sr.prototype.v1NameDescriptionGamesGameIdGet = function(e, t) {
            var n = this;
            return ir(this.configuration).v1NameDescriptionGamesGameIdGet(e, t).then(function(e) {
                return e(n.axios, n.basePath)
            })
        }
        ,
        sr.prototype.v1NameDescriptionGamesGameIdHistoryPost = function(e, t, n) {
            var r = this;
            return ir(this.configuration).v1NameDescriptionGamesGameIdHistoryPost(e, t, n).then(function(e) {
                return e(r.axios, r.basePath)
            })
        }
        ,
        sr.prototype.v1NameDescriptionGamesGameIdPatch = function(e, t, n) {
            var r = this;
            return ir(this.configuration).v1NameDescriptionGamesGameIdPatch(e, t, n).then(function(e) {
                return e(r.axios, r.basePath)
            })
        }
        ,
        sr.prototype.v1NameDescriptionMetadataGet = function(e) {
            var t = this;
            return ir(this.configuration).v1NameDescriptionMetadataGet(e).then(function(e) {
                return e(t.axios, t.basePath)
            })
        }
        ,
        oe(lr, rr = ae),
        lr.prototype.v1PlayerPoliciesAllValuesGet = function(e) {
            var t = this;
            return cr(this.configuration).v1PlayerPoliciesAllValuesGet(e).then(function(e) {
                return e(t.axios, t.basePath)
            })
        }
        ,
        lr.prototype.v1PlayerPoliciesClientGet = function(e) {
            var t = this;
            return cr(this.configuration).v1PlayerPoliciesClientGet(e).then(function(e) {
                return e(t.axios, t.basePath)
            })
        }
        ,
        lr.prototype.v1PlayerPoliciesRccGet = function(e, t, n, r) {
            var a = this;
            return cr(this.configuration).v1PlayerPoliciesRccGet(e, t, n, r).then(function(e) {
                return e(a.axios, a.basePath)
            })
        }
        ;
        var vr, z = (oe(pr, vr = ae),
        pr.prototype.v1SourceLanguageGamesGameIdGet = function(e, t) {
            var n = this;
            return hr(this.configuration).v1SourceLanguageGamesGameIdGet(e, t).then(function(e) {
                return e(n.axios, n.basePath)
            })
        }
        ,
        pr.prototype.v1SourceLanguageGamesGameIdPatch = function(e, t, n) {
            var r = this;
            return hr(this.configuration).v1SourceLanguageGamesGameIdPatch(e, t, n).then(function(e) {
                return e(r.axios, r.basePath)
            })
        }
        ,
        pr);
        function pr() {
            return null !== vr && vr.apply(this, arguments) || this
        }
        function fr(l) {
            var e = this;
            return {
                v1SupportedLanguagesGamesGameIdAutomaticTranslationStatusGet: function(i, s) {
                    return void 0 === s && (s = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gameId","Required parameter gameId was null or undefined when calling v1SupportedLanguagesGamesGameIdAutomaticTranslationStatusGet.");
                            return a = "/v1/supported-languages/games/{gameId}/automatic-translation-status".replace("{gameId}", encodeURIComponent(String(i))),
                            t = wt.qg(a, !0),
                            l && (o = l.baseOptions),
                            n = mn(mn({
                                method: "GET"
                            }, o), s),
                            r = {},
                            a = {},
                            t.query = mn(mn(mn({}, t.query), a), s.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), s.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1SupportedLanguagesGamesGameIdGet: function(i, s) {
                    return void 0 === s && (s = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gameId","Required parameter gameId was null or undefined when calling v1SupportedLanguagesGamesGameIdGet.");
                            return a = "/v1/supported-languages/games/{gameId}".replace("{gameId}", encodeURIComponent(String(i))),
                            t = wt.qg(a, !0),
                            l && (o = l.baseOptions),
                            n = mn(mn({
                                method: "GET"
                            }, o), s),
                            r = {},
                            a = {},
                            t.query = mn(mn(mn({}, t.query), a), s.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), s.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1SupportedLanguagesGamesGameIdLanguagesLanguageCodeAutomaticTranslationStatusPatch: function(i, s, u, c) {
                    return void 0 === c && (c = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gameId","Required parameter gameId was null or undefined when calling v1SupportedLanguagesGamesGameIdLanguagesLanguageCodeAutomaticTranslationStatusPatch.");
                            if (null == s)
                                throw new hn("languageCode","Required parameter languageCode was null or undefined when calling v1SupportedLanguagesGamesGameIdLanguagesLanguageCodeAutomaticTranslationStatusPatch.");
                            if (null == u)
                                throw new hn("enableAutomaticTranslation","Required parameter enableAutomaticTranslation was null or undefined when calling v1SupportedLanguagesGamesGameIdLanguagesLanguageCodeAutomaticTranslationStatusPatch.");
                            return r = "/v1/supported-languages/games/{gameId}/languages/{languageCode}/automatic-translation-status".replace("{gameId}", encodeURIComponent(String(i))).replace("{languageCode}", encodeURIComponent(String(s))),
                            t = wt.qg(r, !0),
                            l && (o = l.baseOptions),
                            n = mn(mn({
                                method: "PATCH"
                            }, o), c),
                            a = {},
                            (r = {})["Content-Type"] = "application/json",
                            t.query = mn(mn(mn({}, t.query), a), c.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), c.headers),
                            o = "string" != typeof u || "application/json" === n.headers["Content-Type"],
                            n.data = o ? JSON.stringify(void 0 !== u ? u : {}) : u || "",
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1SupportedLanguagesGamesGameIdLanguagesLanguageCodeUniverseDisplayInfoAutomaticTranslationSettingsPatch: function(i, s, u, c) {
                    return void 0 === c && (c = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gameId","Required parameter gameId was null or undefined when calling v1SupportedLanguagesGamesGameIdLanguagesLanguageCodeUniverseDisplayInfoAutomaticTranslationSettingsPatch.");
                            if (null == s)
                                throw new hn("languageCode","Required parameter languageCode was null or undefined when calling v1SupportedLanguagesGamesGameIdLanguagesLanguageCodeUniverseDisplayInfoAutomaticTranslationSettingsPatch.");
                            if (null == u)
                                throw new hn("enableUniverseDisplayInfoAutomaticTranslation","Required parameter enableUniverseDisplayInfoAutomaticTranslation was null or undefined when calling v1SupportedLanguagesGamesGameIdLanguagesLanguageCodeUniverseDisplayInfoAutomaticTranslationSettingsPatch.");
                            return r = "/v1/supported-languages/games/{gameId}/languages/{languageCode}/universe-display-info-automatic-translation-settings".replace("{gameId}", encodeURIComponent(String(i))).replace("{languageCode}", encodeURIComponent(String(s))),
                            t = wt.qg(r, !0),
                            l && (o = l.baseOptions),
                            n = mn(mn({
                                method: "PATCH"
                            }, o), c),
                            a = {},
                            (r = {})["Content-Type"] = "application/json",
                            t.query = mn(mn(mn({}, t.query), a), c.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), c.headers),
                            o = "string" != typeof u || "application/json" === n.headers["Content-Type"],
                            n.data = o ? JSON.stringify(void 0 !== u ? u : {}) : u || "",
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1SupportedLanguagesGamesGameIdPatch: function(i, s, u) {
                    return void 0 === u && (u = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gameId","Required parameter gameId was null or undefined when calling v1SupportedLanguagesGamesGameIdPatch.");
                            if (null == s)
                                throw new hn("languages","Required parameter languages was null or undefined when calling v1SupportedLanguagesGamesGameIdPatch.");
                            return r = "/v1/supported-languages/games/{gameId}".replace("{gameId}", encodeURIComponent(String(i))),
                            t = wt.qg(r, !0),
                            l && (o = l.baseOptions),
                            n = mn(mn({
                                method: "PATCH"
                            }, o), u),
                            a = {},
                            (r = {})["Content-Type"] = "application/json",
                            t.query = mn(mn(mn({}, t.query), a), u.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), u.headers),
                            o = "string" != typeof s || "application/json" === n.headers["Content-Type"],
                            n.data = o ? JSON.stringify(void 0 !== s ? s : {}) : s || "",
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1SupportedLanguagesGamesGameIdUniverseDisplayInfoAutomaticTranslationSettingsGet: function(i, s) {
                    return void 0 === s && (s = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gameId","Required parameter gameId was null or undefined when calling v1SupportedLanguagesGamesGameIdUniverseDisplayInfoAutomaticTranslationSettingsGet.");
                            return a = "/v1/supported-languages/games/{gameId}/universe-display-info-automatic-translation-settings".replace("{gameId}", encodeURIComponent(String(i))),
                            t = wt.qg(a, !0),
                            l && (o = l.baseOptions),
                            n = mn(mn({
                                method: "GET"
                            }, o), s),
                            r = {},
                            a = {},
                            t.query = mn(mn(mn({}, t.query), a), s.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), s.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1SupportedLanguagesMetadataGet: function(i) {
                    return void 0 === i && (i = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            return t = wt.qg("/v1/supported-languages/metadata", !0),
                            l && (o = l.baseOptions),
                            n = mn(mn({
                                method: "GET"
                            }, o), i),
                            r = {},
                            a = {},
                            t.query = mn(mn(mn({}, t.query), a), i.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), i.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                }
            }
        }
        function mr(i) {
            return {
                v1SupportedLanguagesGamesGameIdAutomaticTranslationStatusGet: function(t, r) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, fr(i).v1SupportedLanguagesGamesGameIdAutomaticTranslationStatusGet(t, r)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1SupportedLanguagesGamesGameIdGet: function(t, r) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, fr(i).v1SupportedLanguagesGamesGameIdGet(t, r)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1SupportedLanguagesGamesGameIdLanguagesLanguageCodeAutomaticTranslationStatusPatch: function(t, r, a, o) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, fr(i).v1SupportedLanguagesGamesGameIdLanguagesLanguageCodeAutomaticTranslationStatusPatch(t, r, a, o)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1SupportedLanguagesGamesGameIdLanguagesLanguageCodeUniverseDisplayInfoAutomaticTranslationSettingsPatch: function(t, r, a, o) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, fr(i).v1SupportedLanguagesGamesGameIdLanguagesLanguageCodeUniverseDisplayInfoAutomaticTranslationSettingsPatch(t, r, a, o)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1SupportedLanguagesGamesGameIdPatch: function(t, r, a) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, fr(i).v1SupportedLanguagesGamesGameIdPatch(t, r, a)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1SupportedLanguagesGamesGameIdUniverseDisplayInfoAutomaticTranslationSettingsGet: function(t, r) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, fr(i).v1SupportedLanguagesGamesGameIdUniverseDisplayInfoAutomaticTranslationSettingsGet(t, r)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1SupportedLanguagesMetadataGet: function(t) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, fr(i).v1SupportedLanguagesMetadataGet(t)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                }
            }
        }
        var gr, fe = (oe(Ir, gr = ae),
        Ir.prototype.v1SupportedLanguagesGamesGameIdAutomaticTranslationStatusGet = function(e, t) {
            var n = this;
            return mr(this.configuration).v1SupportedLanguagesGamesGameIdAutomaticTranslationStatusGet(e, t).then(function(e) {
                return e(n.axios, n.basePath)
            })
        }
        ,
        Ir.prototype.v1SupportedLanguagesGamesGameIdGet = function(e, t) {
            var n = this;
            return mr(this.configuration).v1SupportedLanguagesGamesGameIdGet(e, t).then(function(e) {
                return e(n.axios, n.basePath)
            })
        }
        ,
        Ir.prototype.v1SupportedLanguagesGamesGameIdLanguagesLanguageCodeAutomaticTranslationStatusPatch = function(e, t, n, r) {
            var a = this;
            return mr(this.configuration).v1SupportedLanguagesGamesGameIdLanguagesLanguageCodeAutomaticTranslationStatusPatch(e, t, n, r).then(function(e) {
                return e(a.axios, a.basePath)
            })
        }
        ,
        Ir.prototype.v1SupportedLanguagesGamesGameIdLanguagesLanguageCodeUniverseDisplayInfoAutomaticTranslationSettingsPatch = function(e, t, n, r) {
            var a = this;
            return mr(this.configuration).v1SupportedLanguagesGamesGameIdLanguagesLanguageCodeUniverseDisplayInfoAutomaticTranslationSettingsPatch(e, t, n, r).then(function(e) {
                return e(a.axios, a.basePath)
            })
        }
        ,
        Ir.prototype.v1SupportedLanguagesGamesGameIdPatch = function(e, t, n) {
            var r = this;
            return mr(this.configuration).v1SupportedLanguagesGamesGameIdPatch(e, t, n).then(function(e) {
                return e(r.axios, r.basePath)
            })
        }
        ,
        Ir.prototype.v1SupportedLanguagesGamesGameIdUniverseDisplayInfoAutomaticTranslationSettingsGet = function(e, t) {
            var n = this;
            return mr(this.configuration).v1SupportedLanguagesGamesGameIdUniverseDisplayInfoAutomaticTranslationSettingsGet(e, t).then(function(e) {
                return e(n.axios, n.basePath)
            })
        }
        ,
        Ir.prototype.v1SupportedLanguagesMetadataGet = function(e) {
            var t = this;
            return mr(this.configuration).v1SupportedLanguagesMetadataGet(e).then(function(e) {
                return e(t.axios, t.basePath)
            })
        }
        ,
        Ir);
        function Ir() {
            return null !== gr && gr.apply(this, arguments) || this
        }
        function yr(h) {
            var e = this;
            return {
                v1TranslationAnalyticsGamesGameIdDownloadTranslationAnalyticsReportGet: function(i, s, u, c, l, d) {
                    return void 0 === d && (d = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gameId","Required parameter gameId was null or undefined when calling v1TranslationAnalyticsGamesGameIdDownloadTranslationAnalyticsReportGet.");
                            if (null == s)
                                throw new hn("startDateTime","Required parameter startDateTime was null or undefined when calling v1TranslationAnalyticsGamesGameIdDownloadTranslationAnalyticsReportGet.");
                            if (null == u)
                                throw new hn("endDateTime","Required parameter endDateTime was null or undefined when calling v1TranslationAnalyticsGamesGameIdDownloadTranslationAnalyticsReportGet.");
                            if (null == c)
                                throw new hn("reportType","Required parameter reportType was null or undefined when calling v1TranslationAnalyticsGamesGameIdDownloadTranslationAnalyticsReportGet.");
                            if (null == l)
                                throw new hn("reportSubjectTargetId","Required parameter reportSubjectTargetId was null or undefined when calling v1TranslationAnalyticsGamesGameIdDownloadTranslationAnalyticsReportGet.");
                            return a = "/v1/translation-analytics/games/{gameId}/download-translation-analytics-report".replace("{gameId}", encodeURIComponent(String(i))),
                            t = wt.qg(a, !0),
                            h && (o = h.baseOptions),
                            n = mn(mn({
                                method: "GET"
                            }, o), d),
                            r = {},
                            a = {},
                            void 0 !== s && (a.startDateTime = s),
                            void 0 !== u && (a.endDateTime = u),
                            void 0 !== c && (a.reportType = c),
                            void 0 !== l && (a.reportSubjectTargetId = l),
                            t.query = mn(mn(mn({}, t.query), a), d.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), d.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1TranslationAnalyticsGamesGameIdRequestTranslationAnalyticsReportPost: function(i, s, u) {
                    return void 0 === u && (u = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            if (null == i)
                                throw new hn("gameId","Required parameter gameId was null or undefined when calling v1TranslationAnalyticsGamesGameIdRequestTranslationAnalyticsReportPost.");
                            if (null == s)
                                throw new hn("request","Required parameter request was null or undefined when calling v1TranslationAnalyticsGamesGameIdRequestTranslationAnalyticsReportPost.");
                            return r = "/v1/translation-analytics/games/{gameId}/request-translation-analytics-report".replace("{gameId}", encodeURIComponent(String(i))),
                            t = wt.qg(r, !0),
                            h && (o = h.baseOptions),
                            n = mn(mn({
                                method: "POST"
                            }, o), u),
                            a = {},
                            (r = {})["Content-Type"] = "application/json",
                            t.query = mn(mn(mn({}, t.query), a), u.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), u.headers),
                            o = "string" != typeof s || "application/json" === n.headers["Content-Type"],
                            n.data = o ? JSON.stringify(void 0 !== s ? s : {}) : s || "",
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                },
                v1TranslationAnalyticsMetadataGet: function(i) {
                    return void 0 === i && (i = {}),
                    gn(e, void 0, Promise, function() {
                        var t, n, r, a, o;
                        return In(this, function(e) {
                            return t = wt.qg("/v1/translation-analytics/metadata", !0),
                            h && (o = h.baseOptions),
                            n = mn(mn({
                                method: "GET"
                            }, o), i),
                            r = {},
                            a = {},
                            t.query = mn(mn(mn({}, t.query), a), i.query),
                            delete t.search,
                            o = o && o.headers ? o.headers : {},
                            n.headers = mn(mn(mn({}, r), o), i.headers),
                            [2, {
                                url: wt.GP(t),
                                options: n
                            }]
                        })
                    })
                }
            }
        }
        function Pr(u) {
            return {
                v1TranslationAnalyticsGamesGameIdDownloadTranslationAnalyticsReportGet: function(t, r, a, o, i, s) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, yr(u).v1TranslationAnalyticsGamesGameIdDownloadTranslationAnalyticsReportGet(t, r, a, o, i, s)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1TranslationAnalyticsGamesGameIdRequestTranslationAnalyticsReportPost: function(t, r, a) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, yr(u).v1TranslationAnalyticsGamesGameIdRequestTranslationAnalyticsReportPost(t, r, a)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                },
                v1TranslationAnalyticsMetadataGet: function(t) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, yr(u).v1TranslationAnalyticsMetadataGet(t)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                }
            }
        }
        var Gr, br, Z = (oe(wr, Gr = ae),
        wr.prototype.v1TranslationAnalyticsGamesGameIdDownloadTranslationAnalyticsReportGet = function(e, t, n, r, a, o) {
            var i = this;
            return Pr(this.configuration).v1TranslationAnalyticsGamesGameIdDownloadTranslationAnalyticsReportGet(e, t, n, r, a, o).then(function(e) {
                return e(i.axios, i.basePath)
            })
        }
        ,
        wr.prototype.v1TranslationAnalyticsGamesGameIdRequestTranslationAnalyticsReportPost = function(e, t, n) {
            var r = this;
            return Pr(this.configuration).v1TranslationAnalyticsGamesGameIdRequestTranslationAnalyticsReportPost(e, t, n).then(function(e) {
                return e(r.axios, r.basePath)
            })
        }
        ,
        wr.prototype.v1TranslationAnalyticsMetadataGet = function(e) {
            var t = this;
            return Pr(this.configuration).v1TranslationAnalyticsMetadataGet(e).then(function(e) {
                return e(t.axios, t.basePath)
            })
        }
        ,
        wr);
        function wr() {
            return null !== Gr && Gr.apply(this, arguments) || this
        }
        function Cr(r) {
            return {
                v1UiConfigurationsGet: function(t) {
                    return gn(this, void 0, Promise, function() {
                        var n;
                        return In(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, function(s) {
                                    var e = this;
                                    return {
                                        v1UiConfigurationsGet: function(i) {
                                            return void 0 === i && (i = {}),
                                            gn(e, void 0, Promise, function() {
                                                var t, n, r, a, o;
                                                return In(this, function(e) {
                                                    return t = wt.qg("/v1/ui-configurations", !0),
                                                    s && (o = s.baseOptions),
                                                    n = mn(mn({
                                                        method: "GET"
                                                    }, o), i),
                                                    r = {},
                                                    a = {},
                                                    t.query = mn(mn(mn({}, t.query), a), i.query),
                                                    delete t.search,
                                                    o = o && o.headers ? o.headers : {},
                                                    n.headers = mn(mn(mn({}, r), o), i.headers),
                                                    [2, {
                                                        url: wt.GP(t),
                                                        options: n
                                                    }]
                                                })
                                            })
                                        }
                                    }
                                }(r).v1UiConfigurationsGet(t)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = dn);
                                    t = mn(mn({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                }
            }
        }
        function Tr() {
            return null !== br && br.apply(this, arguments) || this
        }
        oe(Tr, br = ae),
        Tr.prototype.v1UiConfigurationsGet = function(e) {
            var t = this;
            return Cr(this.configuration).v1UiConfigurationsGet(e).then(function(e) {
                return e(t.axios, t.basePath)
            })
        }
        ;
        var Ar, Er, J = (Ar = function(e, t) {
            return (Ar = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            )(e, t)
        }
        ,
        function(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
            function n() {
                this.constructor = e
            }
            Ar(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        ), Sr = m.EnvironmentUrls.localizationTablesApi.replace(/\/+$/, ""), X = function(e, t, n) {
            void 0 === t && (t = Sr),
            void 0 === n && (n = N),
            this.basePath = t,
            this.axios = n,
            e && (this.configuration = e,
            this.basePath = e.basePath || this.basePath)
        }, Rr = (Er = Error,
        J(Lr, Er),
        Lr);
        function Lr(e, t) {
            t = Er.call(this, t) || this;
            return t.field = e,
            t.name = "RequiredError",
            t
        }
        function qr(e, t, n) {
            if (null == n)
                throw new Rr(t,"Required parameter " + t + " was null or undefined when calling " + e + ".")
        }
        function Ur(e) {
            for (var t = [], n = 1; n < arguments.length; n++)
                t[n - 1] = arguments[n];
            for (var r = new URLSearchParams(e.search), a = 0, o = t; a < o.length; a++) {
                var i, s = o[a];
                for (i in s)
                    r.set(i, s[i])
            }
            e.search = r.toString()
        }
        function Or(e, t, n) {
            var r = "string" != typeof e;
            return (r && n && n.isJsonMime ? n.isJsonMime(t.headers["Content-Type"]) : r) ? JSON.stringify(void 0 !== e ? e : {}) : e || ""
        }
        function Dr(e) {
            return e.pathname + e.search + e.hash
        }
        function _r(n, r, a, o) {
            return function(e, t) {
                void 0 === e && (e = r),
                void 0 === t && (t = a);
                t = Br(Br({}, n.options), {
                    url: ((null == o ? void 0 : o.basePath) || t) + n.url
                });
                return e.request(t)
            }
        }
        var xr, Br = function() {
            return (Br = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        }, Nr = "https://example.com", te = (xr = function(e, t) {
            return (xr = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            )(e, t)
        }
        ,
        function(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
            function n() {
                this.constructor = e
            }
            xr(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        ), Fr = function() {
            return (Fr = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        }, kr = function(e, i, s, u) {
            return new (s = s || Promise)(function(n, t) {
                function r(e) {
                    try {
                        o(u.next(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function a(e) {
                    try {
                        o(u.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function o(e) {
                    var t;
                    e.done ? n(e.value) : ((t = e.value)instanceof s ? t : new s(function(e) {
                        e(t)
                    }
                    )).then(r, a)
                }
                o((u = u.apply(e, i || [])).next())
            }
            )
        }, Mr = function(n, r) {
            var a, o, i, s = {
                label: 0,
                sent: function() {
                    if (1 & i[0])
                        throw i[1];
                    return i[1]
                },
                trys: [],
                ops: []
            }, e = {
                next: t(0),
                throw: t(1),
                return: t(2)
            };
            return "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                return this
            }
            ),
            e;
            function t(t) {
                return function(e) {
                    return function(t) {
                        if (a)
                            throw new TypeError("Generator is already executing.");
                        for (; s; )
                            try {
                                if (a = 1,
                                o && (i = 2 & t[0] ? o.return : t[0] ? o.throw || ((i = o.return) && i.call(o),
                                0) : o.next) && !(i = i.call(o, t[1])).done)
                                    return i;
                                switch (o = 0,
                                i && (t = [2 & t[0], i.value]),
                                t[0]) {
                                case 0:
                                case 1:
                                    i = t;
                                    break;
                                case 4:
                                    return s.label++,
                                    {
                                        value: t[1],
                                        done: !1
                                    };
                                case 5:
                                    s.label++,
                                    o = t[1],
                                    t = [0];
                                    continue;
                                case 7:
                                    t = s.ops.pop(),
                                    s.trys.pop();
                                    continue;
                                default:
                                    if (!(i = 0 < (i = s.trys).length && i[i.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                        s = 0;
                                        continue
                                    }
                                    if (3 === t[0] && (!i || t[1] > i[0] && t[1] < i[3])) {
                                        s.label = t[1];
                                        break
                                    }
                                    if (6 === t[0] && s.label < i[1]) {
                                        s.label = i[1],
                                        i = t;
                                        break
                                    }
                                    if (i && s.label < i[2]) {
                                        s.label = i[2],
                                        s.ops.push(t);
                                        break
                                    }
                                    i[2] && s.ops.pop(),
                                    s.trys.pop();
                                    continue
                                }
                                t = r.call(n, s)
                            } catch (e) {
                                t = [6, e],
                                o = 0
                            } finally {
                                a = i = 0
                            }
                        if (5 & t[0])
                            throw t[1];
                        return {
                            value: t[0] ? t[1] : void 0,
                            done: !0
                        }
                    }([t, e])
                }
            }
        };
        function jr(i) {
            var s = function(l) {
                var e = this;
                return {
                    v1AutoLocalizationTableGamesGameIdAssetsGenerationRequestPost: function(o, i) {
                        return void 0 === i && (i = {}),
                        kr(e, void 0, Promise, function() {
                            var t, n, r, a;
                            return Mr(this, function(e) {
                                return qr("v1AutoLocalizationTableGamesGameIdAssetsGenerationRequestPost", "gameId", o),
                                r = "/v1/auto-localization-table/games/{gameId}/assets-generation-request".replace("{gameId}", encodeURIComponent(String(o))),
                                t = new URL(r,Nr),
                                l && (a = l.baseOptions),
                                n = Fr(Fr({
                                    method: "POST"
                                }, a), i),
                                r = {},
                                Ur(t, {}, i.query),
                                a = a && a.headers ? a.headers : {},
                                n.headers = Fr(Fr(Fr({}, r), a), i.headers),
                                [2, {
                                    url: Dr(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1AutoLocalizationTableGamesGameIdAutoScrapeCleanupRequestPost: function(i, s, u) {
                        return void 0 === u && (u = {}),
                        kr(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Mr(this, function(e) {
                                return qr("v1AutoLocalizationTableGamesGameIdAutoScrapeCleanupRequestPost", "gameId", i),
                                qr("v1AutoLocalizationTableGamesGameIdAutoScrapeCleanupRequestPost", "request", s),
                                r = "/v1/auto-localization-table/games/{gameId}/auto-scrape-cleanup-request".replace("{gameId}", encodeURIComponent(String(i))),
                                t = new URL(r,Nr),
                                l && (o = l.baseOptions),
                                n = Fr(Fr({
                                    method: "POST"
                                }, o), u),
                                a = {},
                                (r = {})["Content-Type"] = "application/json",
                                Ur(t, a, u.query),
                                o = o && o.headers ? o.headers : {},
                                n.headers = Fr(Fr(Fr({}, r), o), u.headers),
                                n.data = Or(s, n, l),
                                [2, {
                                    url: Dr(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1AutoLocalizationTableGamesGameIdPatch: function(i, s, u, c) {
                        return void 0 === c && (c = {}),
                        kr(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Mr(this, function(e) {
                                return qr("v1AutoLocalizationTableGamesGameIdPatch", "gameId", i),
                                qr("v1AutoLocalizationTableGamesGameIdPatch", "request", s),
                                a = "/v1/auto-localization-table/games/{gameId}".replace("{gameId}", encodeURIComponent(String(i))),
                                t = new URL(a,Nr),
                                l && (o = l.baseOptions),
                                n = Fr(Fr({
                                    method: "PATCH"
                                }, o), c),
                                r = {},
                                a = {},
                                null != u && (r["Roblox-Game-Id"] = String(u)),
                                r["Content-Type"] = "application/json",
                                Ur(t, a, c.query),
                                o = o && o.headers ? o.headers : {},
                                n.headers = Fr(Fr(Fr({}, r), o), c.headers),
                                n.data = Or(s, n, l),
                                [2, {
                                    url: Dr(t),
                                    options: n
                                }]
                            })
                        })
                    }
                }
            }(i);
            return {
                v1AutoLocalizationTableGamesGameIdAssetsGenerationRequestPost: function(n, r) {
                    return kr(this, void 0, Promise, function() {
                        var t;
                        return Mr(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, s.v1AutoLocalizationTableGamesGameIdAssetsGenerationRequestPost(n, r)];
                            case 1:
                                return t = e.sent(),
                                [2, _r(t, y(), Sr, i)]
                            }
                        })
                    })
                },
                v1AutoLocalizationTableGamesGameIdAutoScrapeCleanupRequestPost: function(n, r, a) {
                    return kr(this, void 0, Promise, function() {
                        var t;
                        return Mr(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, s.v1AutoLocalizationTableGamesGameIdAutoScrapeCleanupRequestPost(n, r, a)];
                            case 1:
                                return t = e.sent(),
                                [2, _r(t, y(), Sr, i)]
                            }
                        })
                    })
                },
                v1AutoLocalizationTableGamesGameIdPatch: function(n, r, a, o) {
                    return kr(this, void 0, Promise, function() {
                        var t;
                        return Mr(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, s.v1AutoLocalizationTableGamesGameIdPatch(n, r, a, o)];
                            case 1:
                                return t = e.sent(),
                                [2, _r(t, y(), Sr, i)]
                            }
                        })
                    })
                }
            }
        }
        (re = {}).User = "User",
        re.Group = "Group",
        (ie = {}).Asc = "Asc",
        ie.Desc = "Desc",
        (pe = {}).User = "User",
        pe.Group = "Group",
        (I = {}).User = "User",
        I.Automation = "Automation";
        var zr, Vr, Hr = (te(Wr, zr = X),
        Wr.prototype.v1AutoLocalizationTableGamesGameIdAssetsGenerationRequestPost = function(e, t) {
            var n = this;
            return jr(this.configuration).v1AutoLocalizationTableGamesGameIdAssetsGenerationRequestPost(e, t).then(function(e) {
                return e(n.axios, n.basePath)
            })
        }
        ,
        Wr.prototype.v1AutoLocalizationTableGamesGameIdAutoScrapeCleanupRequestPost = function(e, t, n) {
            var r = this;
            return jr(this.configuration).v1AutoLocalizationTableGamesGameIdAutoScrapeCleanupRequestPost(e, t, n).then(function(e) {
                return e(r.axios, r.basePath)
            })
        }
        ,
        Wr.prototype.v1AutoLocalizationTableGamesGameIdPatch = function(e, t, n, r) {
            var a = this;
            return jr(this.configuration).v1AutoLocalizationTableGamesGameIdPatch(e, t, n, r).then(function(e) {
                return e(a.axios, a.basePath)
            })
        }
        ,
        Wr);
        function Wr() {
            return null !== zr && zr.apply(this, arguments) || this
        }
        function Kr(i) {
            var s = function(l) {
                var e = this;
                return {
                    v1LocalizationTableAvailableLanguagesGet: function(o) {
                        return void 0 === o && (o = {}),
                        kr(e, void 0, Promise, function() {
                            var t, n, r, a;
                            return Mr(this, function(e) {
                                return t = new URL("/v1/localization-table/available-languages",Nr),
                                l && (a = l.baseOptions),
                                n = Fr(Fr({
                                    method: "GET"
                                }, a), o),
                                r = {},
                                Ur(t, {}, o.query),
                                a = a && a.headers ? a.headers : {},
                                n.headers = Fr(Fr(Fr({}, r), a), o.headers),
                                [2, {
                                    url: Dr(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1LocalizationTableLimitsGet: function(o) {
                        return void 0 === o && (o = {}),
                        kr(e, void 0, Promise, function() {
                            var t, n, r, a;
                            return Mr(this, function(e) {
                                return t = new URL("/v1/localization-table/limits",Nr),
                                l && (a = l.baseOptions),
                                n = Fr(Fr({
                                    method: "GET"
                                }, a), o),
                                r = {},
                                Ur(t, {}, o.query),
                                a = a && a.headers ? a.headers : {},
                                n.headers = Fr(Fr(Fr({}, r), a), o.headers),
                                [2, {
                                    url: Dr(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1LocalizationTableMetadataGet: function(o) {
                        return void 0 === o && (o = {}),
                        kr(e, void 0, Promise, function() {
                            var t, n, r, a;
                            return Mr(this, function(e) {
                                return t = new URL("/v1/localization-table/metadata",Nr),
                                l && (a = l.baseOptions),
                                n = Fr(Fr({
                                    method: "GET"
                                }, a), o),
                                r = {},
                                Ur(t, {}, o.query),
                                a = a && a.headers ? a.headers : {},
                                n.headers = Fr(Fr(Fr({}, r), a), o.headers),
                                [2, {
                                    url: Dr(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1LocalizationTableTablesAssetIdGet: function(o, i) {
                        return void 0 === i && (i = {}),
                        kr(e, void 0, Promise, function() {
                            var t, n, r, a;
                            return Mr(this, function(e) {
                                return qr("v1LocalizationTableTablesAssetIdGet", "assetId", o),
                                r = "/v1/localization-table/tables/{assetId}".replace("{assetId}", encodeURIComponent(String(o))),
                                t = new URL(r,Nr),
                                l && (a = l.baseOptions),
                                n = Fr(Fr({
                                    method: "GET"
                                }, a), i),
                                r = {},
                                Ur(t, {}, i.query),
                                a = a && a.headers ? a.headers : {},
                                n.headers = Fr(Fr(Fr({}, r), a), i.headers),
                                [2, {
                                    url: Dr(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1LocalizationTableTablesPost: function(i, s) {
                        return void 0 === s && (s = {}),
                        kr(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Mr(this, function(e) {
                                return qr("v1LocalizationTableTablesPost", "request", i),
                                t = new URL("/v1/localization-table/tables",Nr),
                                l && (o = l.baseOptions),
                                n = Fr(Fr({
                                    method: "POST"
                                }, o), s),
                                a = {},
                                (r = {})["Content-Type"] = "application/json",
                                Ur(t, a, s.query),
                                o = o && o.headers ? o.headers : {},
                                n.headers = Fr(Fr(Fr({}, r), o), s.headers),
                                n.data = Or(i, n, l),
                                [2, {
                                    url: Dr(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1LocalizationTableTablesTableIdEntriesGet: function(i, s, u, c) {
                        return void 0 === c && (c = {}),
                        kr(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Mr(this, function(e) {
                                return qr("v1LocalizationTableTablesTableIdEntriesGet", "tableId", i),
                                a = "/v1/localization-table/tables/{tableId}/entries".replace("{tableId}", encodeURIComponent(String(i))),
                                t = new URL(a,Nr),
                                l && (o = l.baseOptions),
                                n = Fr(Fr({
                                    method: "GET"
                                }, o), c),
                                r = {},
                                a = {},
                                void 0 !== s && (a.cursor = s),
                                void 0 !== u && (a.gameId = u),
                                Ur(t, a, c.query),
                                o = o && o.headers ? o.headers : {},
                                n.headers = Fr(Fr(Fr({}, r), o), c.headers),
                                [2, {
                                    url: Dr(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1LocalizationTableTablesTableIdEntriesTranslationHistoryPost: function(i, s, u, c) {
                        return void 0 === c && (c = {}),
                        kr(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Mr(this, function(e) {
                                return qr("v1LocalizationTableTablesTableIdEntriesTranslationHistoryPost", "tableId", i),
                                qr("v1LocalizationTableTablesTableIdEntriesTranslationHistoryPost", "request", s),
                                a = "/v1/localization-table/tables/{tableId}/entries/translation-history".replace("{tableId}", encodeURIComponent(String(i))),
                                t = new URL(a,Nr),
                                l && (o = l.baseOptions),
                                n = Fr(Fr({
                                    method: "POST"
                                }, o), c),
                                r = {},
                                a = {},
                                void 0 !== u && (a.gameId = u),
                                r["Content-Type"] = "application/json",
                                Ur(t, a, c.query),
                                o = o && o.headers ? o.headers : {},
                                n.headers = Fr(Fr(Fr({}, r), o), c.headers),
                                n.data = Or(s, n, l),
                                [2, {
                                    url: Dr(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1LocalizationTableTablesTableIdEntryCountGet: function(i, s, u) {
                        return void 0 === u && (u = {}),
                        kr(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Mr(this, function(e) {
                                return qr("v1LocalizationTableTablesTableIdEntryCountGet", "tableId", i),
                                a = "/v1/localization-table/tables/{tableId}/entry-count".replace("{tableId}", encodeURIComponent(String(i))),
                                t = new URL(a,Nr),
                                l && (o = l.baseOptions),
                                n = Fr(Fr({
                                    method: "GET"
                                }, o), u),
                                r = {},
                                a = {},
                                void 0 !== s && (a.gameId = s),
                                Ur(t, a, u.query),
                                o = o && o.headers ? o.headers : {},
                                n.headers = Fr(Fr(Fr({}, r), o), u.headers),
                                [2, {
                                    url: Dr(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1LocalizationTableTablesTableIdGet: function(o, i) {
                        return void 0 === i && (i = {}),
                        kr(e, void 0, Promise, function() {
                            var t, n, r, a;
                            return Mr(this, function(e) {
                                return qr("v1LocalizationTableTablesTableIdGet", "tableId", o),
                                r = "/v1/localization-table/tables/{tableId}".replace("{tableId}", encodeURIComponent(String(o))),
                                t = new URL(r,Nr),
                                l && (a = l.baseOptions),
                                n = Fr(Fr({
                                    method: "GET"
                                }, a), i),
                                r = {},
                                Ur(t, {}, i.query),
                                a = a && a.headers ? a.headers : {},
                                n.headers = Fr(Fr(Fr({}, r), a), i.headers),
                                [2, {
                                    url: Dr(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1LocalizationTableTablesTableIdLanguageTranslationCountsGet: function(i, s, u, c) {
                        return void 0 === c && (c = {}),
                        kr(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Mr(this, function(e) {
                                return qr("v1LocalizationTableTablesTableIdLanguageTranslationCountsGet", "tableId", i),
                                qr("v1LocalizationTableTablesTableIdLanguageTranslationCountsGet", "locales", s),
                                a = "/v1/localization-table/tables/{tableId}/language-translation-counts".replace("{tableId}", encodeURIComponent(String(i))),
                                t = new URL(a,Nr),
                                l && (o = l.baseOptions),
                                n = Fr(Fr({
                                    method: "GET"
                                }, o), c),
                                r = {},
                                a = {},
                                s && (a.locales = s),
                                void 0 !== u && (a.gameId = u),
                                Ur(t, a, c.query),
                                o = o && o.headers ? o.headers : {},
                                n.headers = Fr(Fr(Fr({}, r), o), c.headers),
                                [2, {
                                    url: Dr(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1LocalizationTableTablesTableIdPatch: function(i, s, u, c) {
                        return void 0 === c && (c = {}),
                        kr(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Mr(this, function(e) {
                                return qr("v1LocalizationTableTablesTableIdPatch", "tableId", i),
                                qr("v1LocalizationTableTablesTableIdPatch", "request", s),
                                a = "/v1/localization-table/tables/{tableId}".replace("{tableId}", encodeURIComponent(String(i))),
                                t = new URL(a,Nr),
                                l && (o = l.baseOptions),
                                n = Fr(Fr({
                                    method: "PATCH"
                                }, o), c),
                                r = {},
                                a = {},
                                void 0 !== u && (a.gameId = u),
                                r["Content-Type"] = "application/json",
                                Ur(t, a, c.query),
                                o = o && o.headers ? o.headers : {},
                                n.headers = Fr(Fr(Fr({}, r), o), c.headers),
                                n.data = Or(s, n, l),
                                [2, {
                                    url: Dr(t),
                                    options: n
                                }]
                            })
                        })
                    }
                }
            }(i);
            return {
                v1LocalizationTableAvailableLanguagesGet: function(n) {
                    return kr(this, void 0, Promise, function() {
                        var t;
                        return Mr(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, s.v1LocalizationTableAvailableLanguagesGet(n)];
                            case 1:
                                return t = e.sent(),
                                [2, _r(t, y(), Sr, i)]
                            }
                        })
                    })
                },
                v1LocalizationTableLimitsGet: function(n) {
                    return kr(this, void 0, Promise, function() {
                        var t;
                        return Mr(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, s.v1LocalizationTableLimitsGet(n)];
                            case 1:
                                return t = e.sent(),
                                [2, _r(t, y(), Sr, i)]
                            }
                        })
                    })
                },
                v1LocalizationTableMetadataGet: function(n) {
                    return kr(this, void 0, Promise, function() {
                        var t;
                        return Mr(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, s.v1LocalizationTableMetadataGet(n)];
                            case 1:
                                return t = e.sent(),
                                [2, _r(t, y(), Sr, i)]
                            }
                        })
                    })
                },
                v1LocalizationTableTablesAssetIdGet: function(n, r) {
                    return kr(this, void 0, Promise, function() {
                        var t;
                        return Mr(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, s.v1LocalizationTableTablesAssetIdGet(n, r)];
                            case 1:
                                return t = e.sent(),
                                [2, _r(t, y(), Sr, i)]
                            }
                        })
                    })
                },
                v1LocalizationTableTablesPost: function(n, r) {
                    return kr(this, void 0, Promise, function() {
                        var t;
                        return Mr(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, s.v1LocalizationTableTablesPost(n, r)];
                            case 1:
                                return t = e.sent(),
                                [2, _r(t, y(), Sr, i)]
                            }
                        })
                    })
                },
                v1LocalizationTableTablesTableIdEntriesGet: function(n, r, a, o) {
                    return kr(this, void 0, Promise, function() {
                        var t;
                        return Mr(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, s.v1LocalizationTableTablesTableIdEntriesGet(n, r, a, o)];
                            case 1:
                                return t = e.sent(),
                                [2, _r(t, y(), Sr, i)]
                            }
                        })
                    })
                },
                v1LocalizationTableTablesTableIdEntriesTranslationHistoryPost: function(n, r, a, o) {
                    return kr(this, void 0, Promise, function() {
                        var t;
                        return Mr(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, s.v1LocalizationTableTablesTableIdEntriesTranslationHistoryPost(n, r, a, o)];
                            case 1:
                                return t = e.sent(),
                                [2, _r(t, y(), Sr, i)]
                            }
                        })
                    })
                },
                v1LocalizationTableTablesTableIdEntryCountGet: function(n, r, a) {
                    return kr(this, void 0, Promise, function() {
                        var t;
                        return Mr(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, s.v1LocalizationTableTablesTableIdEntryCountGet(n, r, a)];
                            case 1:
                                return t = e.sent(),
                                [2, _r(t, y(), Sr, i)]
                            }
                        })
                    })
                },
                v1LocalizationTableTablesTableIdGet: function(n, r) {
                    return kr(this, void 0, Promise, function() {
                        var t;
                        return Mr(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, s.v1LocalizationTableTablesTableIdGet(n, r)];
                            case 1:
                                return t = e.sent(),
                                [2, _r(t, y(), Sr, i)]
                            }
                        })
                    })
                },
                v1LocalizationTableTablesTableIdLanguageTranslationCountsGet: function(n, r, a, o) {
                    return kr(this, void 0, Promise, function() {
                        var t;
                        return Mr(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, s.v1LocalizationTableTablesTableIdLanguageTranslationCountsGet(n, r, a, o)];
                            case 1:
                                return t = e.sent(),
                                [2, _r(t, y(), Sr, i)]
                            }
                        })
                    })
                },
                v1LocalizationTableTablesTableIdPatch: function(n, r, a, o) {
                    return kr(this, void 0, Promise, function() {
                        var t;
                        return Mr(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, s.v1LocalizationTableTablesTableIdPatch(n, r, a, o)];
                            case 1:
                                return t = e.sent(),
                                [2, _r(t, y(), Sr, i)]
                            }
                        })
                    })
                }
            }
        }
        function Xr() {
            return null !== Vr && Vr.apply(this, arguments) || this
        }
        te(Xr, Vr = X),
        Xr.prototype.v1LocalizationTableAvailableLanguagesGet = function(e) {
            var t = this;
            return Kr(this.configuration).v1LocalizationTableAvailableLanguagesGet(e).then(function(e) {
                return e(t.axios, t.basePath)
            })
        }
        ,
        Xr.prototype.v1LocalizationTableLimitsGet = function(e) {
            var t = this;
            return Kr(this.configuration).v1LocalizationTableLimitsGet(e).then(function(e) {
                return e(t.axios, t.basePath)
            })
        }
        ,
        Xr.prototype.v1LocalizationTableMetadataGet = function(e) {
            var t = this;
            return Kr(this.configuration).v1LocalizationTableMetadataGet(e).then(function(e) {
                return e(t.axios, t.basePath)
            })
        }
        ,
        Xr.prototype.v1LocalizationTableTablesAssetIdGet = function(e, t) {
            var n = this;
            return Kr(this.configuration).v1LocalizationTableTablesAssetIdGet(e, t).then(function(e) {
                return e(n.axios, n.basePath)
            })
        }
        ,
        Xr.prototype.v1LocalizationTableTablesPost = function(e, t) {
            var n = this;
            return Kr(this.configuration).v1LocalizationTableTablesPost(e, t).then(function(e) {
                return e(n.axios, n.basePath)
            })
        }
        ,
        Xr.prototype.v1LocalizationTableTablesTableIdEntriesGet = function(e, t, n, r) {
            var a = this;
            return Kr(this.configuration).v1LocalizationTableTablesTableIdEntriesGet(e, t, n, r).then(function(e) {
                return e(a.axios, a.basePath)
            })
        }
        ,
        Xr.prototype.v1LocalizationTableTablesTableIdEntriesTranslationHistoryPost = function(e, t, n, r) {
            var a = this;
            return Kr(this.configuration).v1LocalizationTableTablesTableIdEntriesTranslationHistoryPost(e, t, n, r).then(function(e) {
                return e(a.axios, a.basePath)
            })
        }
        ,
        Xr.prototype.v1LocalizationTableTablesTableIdEntryCountGet = function(e, t, n) {
            var r = this;
            return Kr(this.configuration).v1LocalizationTableTablesTableIdEntryCountGet(e, t, n).then(function(e) {
                return e(r.axios, r.basePath)
            })
        }
        ,
        Xr.prototype.v1LocalizationTableTablesTableIdGet = function(e, t) {
            var n = this;
            return Kr(this.configuration).v1LocalizationTableTablesTableIdGet(e, t).then(function(e) {
                return e(n.axios, n.basePath)
            })
        }
        ,
        Xr.prototype.v1LocalizationTableTablesTableIdLanguageTranslationCountsGet = function(e, t, n, r) {
            var a = this;
            return Kr(this.configuration).v1LocalizationTableTablesTableIdLanguageTranslationCountsGet(e, t, n, r).then(function(e) {
                return e(a.axios, a.basePath)
            })
        }
        ,
        Xr.prototype.v1LocalizationTableTablesTableIdPatch = function(e, t, n, r) {
            var a = this;
            return Kr(this.configuration).v1LocalizationTableTablesTableIdPatch(e, t, n, r).then(function(e) {
                return e(a.axios, a.basePath)
            })
        }
        ;
        var Jr, Qr, Yr = new bn, $r = new Hr, Zr = {
            getAutolocalizationConfiguration: function(e) {
                return Yr.v1AutolocalizationGamesGameIdAutolocalizationtablePost(e, {
                    withCredentials: !0
                })
            },
            setAutolocalizationConfiguration: function(e, t) {
                t = {
                    isAutolocalizationEnabled: t
                };
                return Yr.v1AutolocalizationGamesGameIdSettingsPatch(e, t, {
                    withCredentials: !0
                })
            },
            setUseAutoLocalizationTable: function(e, t) {
                t = {
                    shouldUseLocalizationTable: t
                };
                return Yr.v1AutolocalizationGamesGameIdSettingsPatch(e, t, {
                    withCredentials: !0
                })
            },
            flushAutoLocalizationTable: function(e, t) {
                t = {
                    maxAgeForFlush: t
                };
                return $r.v1AutoLocalizationTableGamesGameIdAutoScrapeCleanupRequestPost(e, t, {
                    withCredentials: !0
                })
            },
            getMetadata: function() {
                return Yr.v1AutolocalizationMetadataGet({
                    withCredentials: !0
                })
            }
        }, ea = new Ln, oe = {
            getGameFeatureStatus: function(e) {
                return ea.v1AutomaticTranslationGamesGameIdFeatureStatusGet(e, {
                    withCredentials: !0
                })
            },
            getTargetLanguages: function(e, t) {
                return ea.v1AutomaticTranslationLanguagesLanguageCodeTargetLanguagesGet(e, t, {
                    withCredentials: !0
                })
            },
            getGameAutoLocalizationQuota: function(e) {
                return ea.v1AutomaticTranslationGamesGameIdQuotaGet(e, {
                    withCredentials: !0
                })
            }
        }, ae = (Jr = function(e, t) {
            return (Jr = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            )(e, t)
        }
        ,
        function(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
            function n() {
                this.constructor = e
            }
            Jr(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        ), ta = m.EnvironmentUrls.gameInternationalizationApi.replace(/\/+$/, ""), J = function(e, t, n) {
            void 0 === t && (t = ta),
            void 0 === n && (n = N),
            this.basePath = t,
            this.axios = n,
            e && (this.configuration = e,
            this.basePath = e.basePath || this.basePath)
        }, na = (Qr = Error,
        ae(ra, Qr),
        ra);
        function ra(e, t) {
            t = Qr.call(this, t) || this;
            return t.field = e,
            t.name = "RequiredError",
            t
        }
        var aa, re = (aa = function(e, t) {
            return (aa = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            )(e, t)
        }
        ,
        function(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
            function n() {
                this.constructor = e
            }
            aa(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        ), oa = function() {
            return (oa = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        }, ia = function(e, i, s, u) {
            return new (s = s || Promise)(function(n, t) {
                function r(e) {
                    try {
                        o(u.next(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function a(e) {
                    try {
                        o(u.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function o(e) {
                    var t;
                    e.done ? n(e.value) : ((t = e.value)instanceof s ? t : new s(function(e) {
                        e(t)
                    }
                    )).then(r, a)
                }
                o((u = u.apply(e, i || [])).next())
            }
            )
        }, sa = function(n, r) {
            var a, o, i, s = {
                label: 0,
                sent: function() {
                    if (1 & i[0])
                        throw i[1];
                    return i[1]
                },
                trys: [],
                ops: []
            }, e = {
                next: t(0),
                throw: t(1),
                return: t(2)
            };
            return "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                return this
            }
            ),
            e;
            function t(t) {
                return function(e) {
                    return function(t) {
                        if (a)
                            throw new TypeError("Generator is already executing.");
                        for (; s; )
                            try {
                                if (a = 1,
                                o && (i = 2 & t[0] ? o.return : t[0] ? o.throw || ((i = o.return) && i.call(o),
                                0) : o.next) && !(i = i.call(o, t[1])).done)
                                    return i;
                                switch (o = 0,
                                i && (t = [2 & t[0], i.value]),
                                t[0]) {
                                case 0:
                                case 1:
                                    i = t;
                                    break;
                                case 4:
                                    return s.label++,
                                    {
                                        value: t[1],
                                        done: !1
                                    };
                                case 5:
                                    s.label++,
                                    o = t[1],
                                    t = [0];
                                    continue;
                                case 7:
                                    t = s.ops.pop(),
                                    s.trys.pop();
                                    continue;
                                default:
                                    if (!(i = 0 < (i = s.trys).length && i[i.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                        s = 0;
                                        continue
                                    }
                                    if (3 === t[0] && (!i || t[1] > i[0] && t[1] < i[3])) {
                                        s.label = t[1];
                                        break
                                    }
                                    if (6 === t[0] && s.label < i[1]) {
                                        s.label = i[1],
                                        i = t;
                                        break
                                    }
                                    if (i && s.label < i[2]) {
                                        s.label = i[2],
                                        s.ops.push(t);
                                        break
                                    }
                                    i[2] && s.ops.pop(),
                                    s.trys.pop();
                                    continue
                                }
                                t = r.call(n, s)
                            } catch (e) {
                                t = [6, e],
                                o = 0
                            } finally {
                                a = i = 0
                            }
                        if (5 & t[0])
                            throw t[1];
                        return {
                            value: t[0] ? t[1] : void 0,
                            done: !0
                        }
                    }([t, e])
                }
            }
        };
        function ua(a) {
            return {
                v2SupportedLanguagesGamesGameIdGet: function(t, r) {
                    return ia(this, void 0, Promise, function() {
                        var n;
                        return sa(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, function(u) {
                                    var e = this;
                                    return {
                                        v2SupportedLanguagesGamesGameIdGet: function(i, s) {
                                            return void 0 === s && (s = {}),
                                            ia(e, void 0, Promise, function() {
                                                var t, n, r, a, o;
                                                return sa(this, function(e) {
                                                    if (null == i)
                                                        throw new na("gameId","Required parameter gameId was null or undefined when calling v2SupportedLanguagesGamesGameIdGet.");
                                                    return a = "/v2/supported-languages/games/{gameId}".replace("{gameId}", encodeURIComponent(String(i))),
                                                    t = wt.qg(a, !0),
                                                    u && (o = u.baseOptions),
                                                    n = oa(oa({
                                                        method: "GET"
                                                    }, o), s),
                                                    r = {},
                                                    a = {},
                                                    t.query = oa(oa(oa({}, t.query), a), s.query),
                                                    delete t.search,
                                                    o = o && o.headers ? o.headers : {},
                                                    n.headers = oa(oa(oa({}, r), o), s.headers),
                                                    [2, {
                                                        url: wt.GP(t),
                                                        options: n
                                                    }]
                                                })
                                            })
                                        }
                                    }
                                }(a).v2SupportedLanguagesGamesGameIdGet(t, r)];
                            case 1:
                                return n = e.sent(),
                                [2, function(e, t) {
                                    void 0 === e && (e = N),
                                    void 0 === t && (t = ta);
                                    t = oa(oa({}, n.options), {
                                        url: t + n.url
                                    });
                                    return e.request(t)
                                }
                                ]
                            }
                        })
                    })
                }
            }
        }
        (ie = {}).EnUs = "en_us",
        ie.EsEs = "es_es",
        ie.FrFr = "fr_fr",
        ie.IdId = "id_id",
        ie.ItIt = "it_it",
        ie.JaJp = "ja_jp",
        ie.KoKr = "ko_kr",
        ie.RuRu = "ru_ru",
        ie.ThTh = "th_th",
        ie.TrTr = "tr_tr",
        ie.ViVn = "vi_vn",
        ie.PtBr = "pt_br",
        ie.DeDe = "de_de",
        ie.ZhCn = "zh_cn",
        ie.ZhTw = "zh_tw",
        ie.BgBg = "bg_bg",
        ie.BnBd = "bn_bd",
        ie.CsCz = "cs_cz",
        ie.DaDk = "da_dk",
        ie.ElGr = "el_gr",
        ie.EtEe = "et_ee",
        ie.FiFi = "fi_fi",
        ie.HiIn = "hi_in",
        ie.HrHr = "hr_hr",
        ie.HuHu = "hu_hu",
        ie.KaGe = "ka_ge",
        ie.KkKz = "kk_kz",
        ie.KmKh = "km_kh",
        ie.LtLt = "lt_lt",
        ie.LvLv = "lv_lv",
        ie.MsMy = "ms_my",
        ie.MyMm = "my_mm",
        ie.NbNo = "nb_no",
        ie.NlNl = "nl_nl",
        ie.FilPh = "fil_ph",
        ie.PlPl = "pl_pl",
        ie.RoRo = "ro_ro",
        ie.UkUa = "uk_ua",
        ie.SiLk = "si_lk",
        ie.SkSk = "sk_sk",
        ie.SlSl = "sl_sl",
        ie.SqAl = "sq_al",
        ie.BsBa = "bs_ba",
        ie.SrRs = "sr_rs",
        ie.SvSe = "sv_se",
        ie.ZhCjv = "zh_cjv";
        var ca, pe = (re(la, ca = J),
        la.prototype.v2SupportedLanguagesGamesGameIdGet = function(e, t) {
            var n = this;
            return ua(this.configuration).v2SupportedLanguagesGamesGameIdGet(e, t).then(function(e) {
                return e(n.axios, n.basePath)
            })
        }
        ,
        la);
        function la() {
            return null !== ca && ca.apply(this, arguments) || this
        }
        var da, ha, va = new fe, pa = new pe, fa = new S, I = {
            getGameLanguageRolloutSettings: function() {
                return va.v1SupportedLanguagesMetadataGet({
                    withCredentials: !0
                })
            },
            getGameLanguages: function(e) {
                return va.v1SupportedLanguagesGamesGameIdGet(e, {
                    withCredentials: !0
                })
            },
            getGameLanguagesV2: function(e) {
                return pa.v2SupportedLanguagesGamesGameIdGet(e, {
                    withCredentials: !0
                })
            },
            addLanguages: function(e, t) {
                t = t.map(function(e) {
                    return {
                        languageCodeType: fn.Language,
                        languageCode: e
                    }
                });
                return va.v1SupportedLanguagesGamesGameIdPatch(e, t, {
                    withCredentials: !0
                })
            },
            deleteLanguages: function(e, t) {
                t = t.map(function(e) {
                    return {
                        languageCodeType: fn.Language,
                        languageCode: e,
                        delete: !0
                    }
                });
                return va.v1SupportedLanguagesGamesGameIdPatch(e, t, {
                    withCredentials: !0
                })
            },
            getAvailableLanguages: function() {
                return fa.v1LocalizationtableAvailableLanguagesGet()
            },
            getAutomaticTranslationStatus: function(e) {
                return va.v1SupportedLanguagesGamesGameIdAutomaticTranslationStatusGet(e, {
                    withCredentials: !0
                })
            },
            setAutomaticTranslationStatus: function(e, t, n) {
                return va.v1SupportedLanguagesGamesGameIdLanguagesLanguageCodeAutomaticTranslationStatusPatch(e, n, t, {
                    withCredentials: !0
                })
            },
            getAutomaticTranslationSwitchesValues: function(e) {
                return va.v1SupportedLanguagesGamesGameIdUniverseDisplayInfoAutomaticTranslationSettingsGet(e, {
                    withCredentials: !0
                })
            },
            setAutomaticTranslationSwitchesValue: function(e, t, n) {
                return va.v1SupportedLanguagesGamesGameIdLanguagesLanguageCodeUniverseDisplayInfoAutomaticTranslationSettingsPatch(e, n, t, {
                    withCredentials: !0
                })
            }
        }, ma = new z, te = {
            getSourceLanguage: function(e) {
                return ma.v1SourceLanguageGamesGameIdGet(e, {
                    withCredentials: !0
                })
            },
            updateSourceLanguage: function(e, t) {
                return ma.v1SourceLanguageGamesGameIdPatch(e, t, {
                    withCredentials: !0
                })
            }
        }, X = (da = function(e, t) {
            return (da = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            )(e, t)
        }
        ,
        function(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
            function n() {
                this.constructor = e
            }
            da(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        ), ga = m.EnvironmentUrls.thumbnailsApi.replace(/\/+$/, ""), Ia = ",", bn = function(e, t, n) {
            void 0 === t && (t = ga),
            void 0 === n && (n = N),
            this.basePath = t,
            this.axios = n,
            e && (this.configuration = e,
            this.basePath = e.basePath || this.basePath)
        }, ya = (ha = Error,
        X(Pa, ha),
        Pa);
        function Pa(e, t) {
            t = ha.call(this, t) || this;
            return t.field = e,
            t.name = "RequiredError",
            t
        }
        function Ga(e, t, n) {
            if (null == n)
                throw new ya(t,"Required parameter " + t + " was null or undefined when calling " + e + ".")
        }
        function ba(e) {
            for (var t = [], n = 1; n < arguments.length; n++)
                t[n - 1] = arguments[n];
            for (var r = new URLSearchParams(e.search), a = 0, o = t; a < o.length; a++) {
                var i, s = o[a];
                for (i in s)
                    r.set(i, s[i])
            }
            e.search = r.toString()
        }
        function wa(e) {
            return e.pathname + e.search + e.hash
        }
        function Ca(n, r, a, o) {
            return function(e, t) {
                void 0 === e && (e = r),
                void 0 === t && (t = a);
                t = Aa(Aa({}, n.options), {
                    url: ((null == o ? void 0 : o.basePath) || t) + n.url
                });
                return e.request(t)
            }
        }
        var Ta, Aa = function() {
            return (Aa = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        }, Ea = "https://example.com", Hr = (Ta = function(e, t) {
            return (Ta = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            )(e, t)
        }
        ,
        function(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
            function n() {
                this.constructor = e
            }
            Ta(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        ), Sa = function() {
            return (Sa = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        }, Ra = function(e, i, s, u) {
            return new (s = s || Promise)(function(n, t) {
                function r(e) {
                    try {
                        o(u.next(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function a(e) {
                    try {
                        o(u.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function o(e) {
                    var t;
                    e.done ? n(e.value) : ((t = e.value)instanceof s ? t : new s(function(e) {
                        e(t)
                    }
                    )).then(r, a)
                }
                o((u = u.apply(e, i || [])).next())
            }
            )
        }, La = function(n, r) {
            var a, o, i, s = {
                label: 0,
                sent: function() {
                    if (1 & i[0])
                        throw i[1];
                    return i[1]
                },
                trys: [],
                ops: []
            }, e = {
                next: t(0),
                throw: t(1),
                return: t(2)
            };
            return "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                return this
            }
            ),
            e;
            function t(t) {
                return function(e) {
                    return function(t) {
                        if (a)
                            throw new TypeError("Generator is already executing.");
                        for (; s; )
                            try {
                                if (a = 1,
                                o && (i = 2 & t[0] ? o.return : t[0] ? o.throw || ((i = o.return) && i.call(o),
                                0) : o.next) && !(i = i.call(o, t[1])).done)
                                    return i;
                                switch (o = 0,
                                i && (t = [2 & t[0], i.value]),
                                t[0]) {
                                case 0:
                                case 1:
                                    i = t;
                                    break;
                                case 4:
                                    return s.label++,
                                    {
                                        value: t[1],
                                        done: !1
                                    };
                                case 5:
                                    s.label++,
                                    o = t[1],
                                    t = [0];
                                    continue;
                                case 7:
                                    t = s.ops.pop(),
                                    s.trys.pop();
                                    continue;
                                default:
                                    if (!(i = 0 < (i = s.trys).length && i[i.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                        s = 0;
                                        continue
                                    }
                                    if (3 === t[0] && (!i || t[1] > i[0] && t[1] < i[3])) {
                                        s.label = t[1];
                                        break
                                    }
                                    if (6 === t[0] && s.label < i[1]) {
                                        s.label = i[1],
                                        i = t;
                                        break
                                    }
                                    if (i && s.label < i[2]) {
                                        s.label = i[2],
                                        s.ops.push(t);
                                        break
                                    }
                                    i[2] && s.ops.pop(),
                                    s.trys.pop();
                                    continue
                                }
                                t = r.call(n, s)
                            } catch (e) {
                                t = [6, e],
                                o = 0
                            } finally {
                                a = i = 0
                            }
                        if (5 & t[0])
                            throw t[1];
                        return {
                            value: t[0] ? t[1] : void 0,
                            done: !0
                        }
                    }([t, e])
                }
            }
        };
        function qa(u) {
            var c = function(h) {
                var e = this;
                return {
                    v1AssetsGet: function(i, s, u, c, l, d) {
                        return void 0 === d && (d = {}),
                        Ra(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return La(this, function(e) {
                                return Ga("v1AssetsGet", "assetIds", i),
                                t = new URL("/v1/assets",Ea),
                                h && (o = h.baseOptions),
                                n = Sa(Sa({
                                    method: "GET"
                                }, o), d),
                                r = {},
                                a = {},
                                i && (a.assetIds = i.join(Ia)),
                                void 0 !== s && (a.returnPolicy = s),
                                void 0 !== u && (a.size = u),
                                void 0 !== c && (a.format = c),
                                void 0 !== l && (a.isCircular = l),
                                ba(t, a, d.query),
                                o = o && o.headers ? o.headers : {},
                                n.headers = Sa(Sa(Sa({}, r), o), d.headers),
                                [2, {
                                    url: wa(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1AssetsThumbnail3dGet: function(i, s) {
                        return void 0 === s && (s = {}),
                        Ra(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return La(this, function(e) {
                                return Ga("v1AssetsThumbnail3dGet", "assetId", i),
                                t = new URL("/v1/assets-thumbnail-3d",Ea),
                                h && (o = h.baseOptions),
                                n = Sa(Sa({
                                    method: "GET"
                                }, o), s),
                                r = {},
                                a = {},
                                void 0 !== i && (a.assetId = i),
                                ba(t, a, s.query),
                                o = o && o.headers ? o.headers : {},
                                n.headers = Sa(Sa(Sa({}, r), o), s.headers),
                                [2, {
                                    url: wa(t),
                                    options: n
                                }]
                            })
                        })
                    }
                }
            }(u);
            return {
                v1AssetsGet: function(n, r, a, o, i, s) {
                    return Ra(this, void 0, Promise, function() {
                        var t;
                        return La(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, c.v1AssetsGet(n, r, a, o, i, s)];
                            case 1:
                                return t = e.sent(),
                                [2, Ca(t, y(), ga, u)]
                            }
                        })
                    })
                },
                v1AssetsThumbnail3dGet: function(n, r) {
                    return Ra(this, void 0, Promise, function() {
                        var t;
                        return La(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, c.v1AssetsThumbnail3dGet(n, r)];
                            case 1:
                                return t = e.sent(),
                                [2, Ca(t, y(), ga, u)]
                            }
                        })
                    })
                }
            }
        }
        (Ln = {}).Avatar = "Avatar",
        Ln.AvatarHeadShot = "AvatarHeadShot",
        Ln.GameIcon = "GameIcon",
        Ln.BadgeIcon = "BadgeIcon",
        Ln.GameThumbnail = "GameThumbnail",
        Ln.GamePass = "GamePass",
        Ln.Asset = "Asset",
        Ln.BundleThumbnail = "BundleThumbnail",
        Ln.Outfit = "Outfit",
        Ln.GroupIcon = "GroupIcon",
        Ln.DeveloperProduct = "DeveloperProduct",
        Ln.AvatarBust = "AvatarBust",
        Ln.AutoGeneratedAsset = "AutoGeneratedAsset",
        Ln.PlaceIcon = "PlaceIcon",
        Ln.AutoGeneratedGameIcon = "AutoGeneratedGameIcon",
        Ln.ForceAutoGeneratedGameIcon = "ForceAutoGeneratedGameIcon",
        Ln.LookThumbnail = "Look",
        Ln.CreatorContextAsset = "CreatorContextAsset",
        Ln.Screenshot = "Screenshot",
        (ae = {}).Error = "Error",
        ae.Completed = "Completed",
        ae.InReview = "InReview",
        ae.Pending = "Pending",
        ae.Blocked = "Blocked",
        (ie = {}).Error = "Error",
        ie.Completed = "Completed",
        ie.InReview = "InReview",
        ie.Pending = "Pending",
        ie.Blocked = "Blocked";
        var Ua, re = (Hr(Oa, Ua = bn),
        Oa.prototype.v1AssetsGet = function(e, t, n, r, a, o) {
            var i = this;
            return qa(this.configuration).v1AssetsGet(e, t, n, r, a, o).then(function(e) {
                return e(i.axios, i.basePath)
            })
        }
        ,
        Oa.prototype.v1AssetsThumbnail3dGet = function(e, t) {
            var n = this;
            return qa(this.configuration).v1AssetsThumbnail3dGet(e, t).then(function(e) {
                return e(n.axios, n.basePath)
            })
        }
        ,
        Oa);
        function Oa() {
            return null !== Ua && Ua.apply(this, arguments) || this
        }
        function Da(s) {
            var u = function(d) {
                var e = this;
                return {
                    v1UsersAvatar3dGet: function(i, s) {
                        return void 0 === s && (s = {}),
                        Ra(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return La(this, function(e) {
                                return Ga("v1UsersAvatar3dGet", "userId", i),
                                t = new URL("/v1/users/avatar-3d",Ea),
                                d && (o = d.baseOptions),
                                n = Sa(Sa({
                                    method: "GET"
                                }, o), s),
                                r = {},
                                a = {},
                                void 0 !== i && (a.userId = i),
                                ba(t, a, s.query),
                                o = o && o.headers ? o.headers : {},
                                n.headers = Sa(Sa(Sa({}, r), o), s.headers),
                                [2, {
                                    url: wa(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1UsersAvatarBustGet: function(i, s, u, c, l) {
                        return void 0 === l && (l = {}),
                        Ra(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return La(this, function(e) {
                                return Ga("v1UsersAvatarBustGet", "userIds", i),
                                t = new URL("/v1/users/avatar-bust",Ea),
                                d && (o = d.baseOptions),
                                n = Sa(Sa({
                                    method: "GET"
                                }, o), l),
                                r = {},
                                a = {},
                                i && (a.userIds = i.join(Ia)),
                                void 0 !== s && (a.size = s),
                                void 0 !== u && (a.format = u),
                                void 0 !== c && (a.isCircular = c),
                                ba(t, a, l.query),
                                o = o && o.headers ? o.headers : {},
                                n.headers = Sa(Sa(Sa({}, r), o), l.headers),
                                [2, {
                                    url: wa(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1UsersAvatarGet: function(i, s, u, c, l) {
                        return void 0 === l && (l = {}),
                        Ra(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return La(this, function(e) {
                                return Ga("v1UsersAvatarGet", "userIds", i),
                                t = new URL("/v1/users/avatar",Ea),
                                d && (o = d.baseOptions),
                                n = Sa(Sa({
                                    method: "GET"
                                }, o), l),
                                r = {},
                                a = {},
                                i && (a.userIds = i.join(Ia)),
                                void 0 !== s && (a.size = s),
                                void 0 !== u && (a.format = u),
                                void 0 !== c && (a.isCircular = c),
                                ba(t, a, l.query),
                                o = o && o.headers ? o.headers : {},
                                n.headers = Sa(Sa(Sa({}, r), o), l.headers),
                                [2, {
                                    url: wa(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1UsersAvatarHeadshotGet: function(i, s, u, c, l) {
                        return void 0 === l && (l = {}),
                        Ra(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return La(this, function(e) {
                                return Ga("v1UsersAvatarHeadshotGet", "userIds", i),
                                t = new URL("/v1/users/avatar-headshot",Ea),
                                d && (o = d.baseOptions),
                                n = Sa(Sa({
                                    method: "GET"
                                }, o), l),
                                r = {},
                                a = {},
                                i && (a.userIds = i.join(Ia)),
                                void 0 !== s && (a.size = s),
                                void 0 !== u && (a.format = u),
                                void 0 !== c && (a.isCircular = c),
                                ba(t, a, l.query),
                                o = o && o.headers ? o.headers : {},
                                n.headers = Sa(Sa(Sa({}, r), o), l.headers),
                                [2, {
                                    url: wa(t),
                                    options: n
                                }]
                            })
                        })
                    }
                }
            }(s);
            return {
                v1UsersAvatar3dGet: function(n, r) {
                    return Ra(this, void 0, Promise, function() {
                        var t;
                        return La(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, u.v1UsersAvatar3dGet(n, r)];
                            case 1:
                                return t = e.sent(),
                                [2, Ca(t, y(), ga, s)]
                            }
                        })
                    })
                },
                v1UsersAvatarBustGet: function(n, r, a, o, i) {
                    return Ra(this, void 0, Promise, function() {
                        var t;
                        return La(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, u.v1UsersAvatarBustGet(n, r, a, o, i)];
                            case 1:
                                return t = e.sent(),
                                [2, Ca(t, y(), ga, s)]
                            }
                        })
                    })
                },
                v1UsersAvatarGet: function(n, r, a, o, i) {
                    return Ra(this, void 0, Promise, function() {
                        var t;
                        return La(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, u.v1UsersAvatarGet(n, r, a, o, i)];
                            case 1:
                                return t = e.sent(),
                                [2, Ca(t, y(), ga, s)]
                            }
                        })
                    })
                },
                v1UsersAvatarHeadshotGet: function(n, r, a, o, i) {
                    return Ra(this, void 0, Promise, function() {
                        var t;
                        return La(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, u.v1UsersAvatarHeadshotGet(n, r, a, o, i)];
                            case 1:
                                return t = e.sent(),
                                [2, Ca(t, y(), ga, s)]
                            }
                        })
                    })
                }
            }
        }
        var _a, J = (Hr(xa, _a = bn),
        xa.prototype.v1UsersAvatar3dGet = function(e, t) {
            var n = this;
            return Da(this.configuration).v1UsersAvatar3dGet(e, t).then(function(e) {
                return e(n.axios, n.basePath)
            })
        }
        ,
        xa.prototype.v1UsersAvatarBustGet = function(e, t, n, r, a) {
            var o = this;
            return Da(this.configuration).v1UsersAvatarBustGet(e, t, n, r, a).then(function(e) {
                return e(o.axios, o.basePath)
            })
        }
        ,
        xa.prototype.v1UsersAvatarGet = function(e, t, n, r, a) {
            var o = this;
            return Da(this.configuration).v1UsersAvatarGet(e, t, n, r, a).then(function(e) {
                return e(o.axios, o.basePath)
            })
        }
        ,
        xa.prototype.v1UsersAvatarHeadshotGet = function(e, t, n, r, a) {
            var o = this;
            return Da(this.configuration).v1UsersAvatarHeadshotGet(e, t, n, r, a).then(function(e) {
                return e(o.axios, o.basePath)
            })
        }
        ,
        xa);
        function xa() {
            return null !== _a && _a.apply(this, arguments) || this
        }
        function Ba(s) {
            var u = function(d) {
                var e = this;
                return {
                    v1BadgesIconsGet: function(i, s, u, c, l) {
                        return void 0 === l && (l = {}),
                        Ra(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return La(this, function(e) {
                                return Ga("v1BadgesIconsGet", "badgeIds", i),
                                t = new URL("/v1/badges/icons",Ea),
                                d && (o = d.baseOptions),
                                n = Sa(Sa({
                                    method: "GET"
                                }, o), l),
                                r = {},
                                a = {},
                                i && (a.badgeIds = i.join(Ia)),
                                void 0 !== s && (a.size = s),
                                void 0 !== u && (a.format = u),
                                void 0 !== c && (a.isCircular = c),
                                ba(t, a, l.query),
                                o = o && o.headers ? o.headers : {},
                                n.headers = Sa(Sa(Sa({}, r), o), l.headers),
                                [2, {
                                    url: wa(t),
                                    options: n
                                }]
                            })
                        })
                    }
                }
            }(s);
            return {
                v1BadgesIconsGet: function(n, r, a, o, i) {
                    return Ra(this, void 0, Promise, function() {
                        var t;
                        return La(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, u.v1BadgesIconsGet(n, r, a, o, i)];
                            case 1:
                                return t = e.sent(),
                                [2, Ca(t, y(), ga, s)]
                            }
                        })
                    })
                }
            }
        }
        var Na, fe = (Hr(Fa, Na = bn),
        Fa.prototype.v1BadgesIconsGet = function(e, t, n, r, a) {
            var o = this;
            return Ba(this.configuration).v1BadgesIconsGet(e, t, n, r, a).then(function(e) {
                return e(o.axios, o.basePath)
            })
        }
        ,
        Fa);
        function Fa() {
            return null !== Na && Na.apply(this, arguments) || this
        }
        function ka(h) {
            var e = this;
            return {
                v1BatchPost: function(l, d) {
                    return void 0 === d && (d = {}),
                    Ra(e, void 0, Promise, function() {
                        var o, i, s, u, c;
                        return La(this, function(e) {
                            var t, n, r, a;
                            return Ga("v1BatchPost", "requests", l),
                            o = new URL("/v1/batch",Ea),
                            h && (c = h.baseOptions),
                            i = Sa(Sa({
                                method: "POST"
                            }, c), d),
                            u = {},
                            (s = {})["Content-Type"] = "application/json",
                            ba(o, u, d.query),
                            c = c && c.headers ? c.headers : {},
                            i.headers = Sa(Sa(Sa({}, s), c), d.headers),
                            i.data = (n = i,
                            r = h,
                            ((a = "string" != typeof (t = l)) && r && r.isJsonMime ? r.isJsonMime(n.headers["Content-Type"]) : a) ? JSON.stringify(void 0 !== t ? t : {}) : t || ""),
                            [2, {
                                url: wa(o),
                                options: i
                            }]
                        })
                    })
                }
            }
        }
        function Ma(a) {
            var o = ka(a);
            return {
                v1BatchPost: function(n, r) {
                    return Ra(this, void 0, Promise, function() {
                        var t;
                        return La(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, o.v1BatchPost(n, r)];
                            case 1:
                                return t = e.sent(),
                                [2, Ca(t, y(), ga, a)]
                            }
                        })
                    })
                }
            }
        }
        var ja, pe = (Hr(za, ja = bn),
        za.prototype.v1BatchPost = function(e, t) {
            var n = this;
            return Ma(this.configuration).v1BatchPost(e, t).then(function(e) {
                return e(n.axios, n.basePath)
            })
        }
        ,
        za);
        function za() {
            return null !== ja && ja.apply(this, arguments) || this
        }
        function Va(s) {
            var u = function(d) {
                var e = this;
                return {
                    v1BundlesThumbnailsGet: function(i, s, u, c, l) {
                        return void 0 === l && (l = {}),
                        Ra(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return La(this, function(e) {
                                return Ga("v1BundlesThumbnailsGet", "bundleIds", i),
                                t = new URL("/v1/bundles/thumbnails",Ea),
                                d && (o = d.baseOptions),
                                n = Sa(Sa({
                                    method: "GET"
                                }, o), l),
                                r = {},
                                a = {},
                                i && (a.bundleIds = i.join(Ia)),
                                void 0 !== s && (a.size = s),
                                void 0 !== u && (a.format = u),
                                void 0 !== c && (a.isCircular = c),
                                ba(t, a, l.query),
                                o = o && o.headers ? o.headers : {},
                                n.headers = Sa(Sa(Sa({}, r), o), l.headers),
                                [2, {
                                    url: wa(t),
                                    options: n
                                }]
                            })
                        })
                    }
                }
            }(s);
            return {
                v1BundlesThumbnailsGet: function(n, r, a, o, i) {
                    return Ra(this, void 0, Promise, function() {
                        var t;
                        return La(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, u.v1BundlesThumbnailsGet(n, r, a, o, i)];
                            case 1:
                                return t = e.sent(),
                                [2, Ca(t, y(), ga, s)]
                            }
                        })
                    })
                }
            }
        }
        var Ha, S = (Hr(Wa, Ha = bn),
        Wa.prototype.v1BundlesThumbnailsGet = function(e, t, n, r, a) {
            var o = this;
            return Va(this.configuration).v1BundlesThumbnailsGet(e, t, n, r, a).then(function(e) {
                return e(o.axios, o.basePath)
            })
        }
        ,
        Wa);
        function Wa() {
            return null !== Ha && Ha.apply(this, arguments) || this
        }
        function Ka(s) {
            var u = function(d) {
                var e = this;
                return {
                    v1DeveloperProductsIconsGet: function(i, s, u, c, l) {
                        return void 0 === l && (l = {}),
                        Ra(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return La(this, function(e) {
                                return Ga("v1DeveloperProductsIconsGet", "developerProductIds", i),
                                t = new URL("/v1/developer-products/icons",Ea),
                                d && (o = d.baseOptions),
                                n = Sa(Sa({
                                    method: "GET"
                                }, o), l),
                                r = {},
                                a = {},
                                i && (a.developerProductIds = i.join(Ia)),
                                void 0 !== s && (a.size = s),
                                void 0 !== u && (a.format = u),
                                void 0 !== c && (a.isCircular = c),
                                ba(t, a, l.query),
                                o = o && o.headers ? o.headers : {},
                                n.headers = Sa(Sa(Sa({}, r), o), l.headers),
                                [2, {
                                    url: wa(t),
                                    options: n
                                }]
                            })
                        })
                    }
                }
            }(s);
            return {
                v1DeveloperProductsIconsGet: function(n, r, a, o, i) {
                    return Ra(this, void 0, Promise, function() {
                        var t;
                        return La(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, u.v1DeveloperProductsIconsGet(n, r, a, o, i)];
                            case 1:
                                return t = e.sent(),
                                [2, Ca(t, y(), ga, s)]
                            }
                        })
                    })
                }
            }
        }
        var Xa, z = (Hr(Ja, Xa = bn),
        Ja.prototype.v1DeveloperProductsIconsGet = function(e, t, n, r, a) {
            var o = this;
            return Ka(this.configuration).v1DeveloperProductsIconsGet(e, t, n, r, a).then(function(e) {
                return e(o.axios, o.basePath)
            })
        }
        ,
        Ja);
        function Ja() {
            return null !== Xa && Xa.apply(this, arguments) || this
        }
        function Qa(s) {
            var u = function(d) {
                var e = this;
                return {
                    v1GamePassesGet: function(i, s, u, c, l) {
                        return void 0 === l && (l = {}),
                        Ra(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return La(this, function(e) {
                                return Ga("v1GamePassesGet", "gamePassIds", i),
                                t = new URL("/v1/game-passes",Ea),
                                d && (o = d.baseOptions),
                                n = Sa(Sa({
                                    method: "GET"
                                }, o), l),
                                r = {},
                                a = {},
                                i && (a.gamePassIds = i.join(Ia)),
                                void 0 !== s && (a.size = s),
                                void 0 !== u && (a.format = u),
                                void 0 !== c && (a.isCircular = c),
                                ba(t, a, l.query),
                                o = o && o.headers ? o.headers : {},
                                n.headers = Sa(Sa(Sa({}, r), o), l.headers),
                                [2, {
                                    url: wa(t),
                                    options: n
                                }]
                            })
                        })
                    }
                }
            }(s);
            return {
                v1GamePassesGet: function(n, r, a, o, i) {
                    return Ra(this, void 0, Promise, function() {
                        var t;
                        return La(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, u.v1GamePassesGet(n, r, a, o, i)];
                            case 1:
                                return t = e.sent(),
                                [2, Ca(t, y(), ga, s)]
                            }
                        })
                    })
                }
            }
        }
        var Ya, X = (Hr($a, Ya = bn),
        $a.prototype.v1GamePassesGet = function(e, t, n, r, a) {
            var o = this;
            return Qa(this.configuration).v1GamePassesGet(e, t, n, r, a).then(function(e) {
                return e(o.axios, o.basePath)
            })
        }
        ,
        $a);
        function $a() {
            return null !== Ya && Ya.apply(this, arguments) || this
        }
        function Za(c) {
            var l = function(v) {
                var e = this;
                return {
                    v1GamesIconsGet: function(i, s, u, c, l, d) {
                        return void 0 === d && (d = {}),
                        Ra(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return La(this, function(e) {
                                return Ga("v1GamesIconsGet", "universeIds", i),
                                t = new URL("/v1/games/icons",Ea),
                                v && (o = v.baseOptions),
                                n = Sa(Sa({
                                    method: "GET"
                                }, o), d),
                                r = {},
                                a = {},
                                i && (a.universeIds = i.join(Ia)),
                                void 0 !== s && (a.returnPolicy = s),
                                void 0 !== u && (a.size = u),
                                void 0 !== c && (a.format = c),
                                void 0 !== l && (a.isCircular = l),
                                ba(t, a, d.query),
                                o = o && o.headers ? o.headers : {},
                                n.headers = Sa(Sa(Sa({}, r), o), d.headers),
                                [2, {
                                    url: wa(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1GamesMultigetThumbnailsGet: function(i, s, u, c, l, d, h) {
                        return void 0 === h && (h = {}),
                        Ra(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return La(this, function(e) {
                                return Ga("v1GamesMultigetThumbnailsGet", "universeIds", i),
                                t = new URL("/v1/games/multiget/thumbnails",Ea),
                                v && (o = v.baseOptions),
                                n = Sa(Sa({
                                    method: "GET"
                                }, o), h),
                                r = {},
                                a = {},
                                i && (a.universeIds = i.join(Ia)),
                                void 0 !== s && (a.countPerUniverse = s),
                                void 0 !== u && (a.defaults = u),
                                void 0 !== c && (a.size = c),
                                void 0 !== l && (a.format = l),
                                void 0 !== d && (a.isCircular = d),
                                ba(t, a, h.query),
                                o = o && o.headers ? o.headers : {},
                                n.headers = Sa(Sa(Sa({}, r), o), h.headers),
                                [2, {
                                    url: wa(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1GamesUniverseIdThumbnailsGet: function(i, s, u, c, l, d) {
                        return void 0 === d && (d = {}),
                        Ra(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return La(this, function(e) {
                                return Ga("v1GamesUniverseIdThumbnailsGet", "universeId", i),
                                Ga("v1GamesUniverseIdThumbnailsGet", "thumbnailIds", s),
                                a = "/v1/games/{universeId}/thumbnails".replace("{universeId}", encodeURIComponent(String(i))),
                                t = new URL(a,Ea),
                                v && (o = v.baseOptions),
                                n = Sa(Sa({
                                    method: "GET"
                                }, o), d),
                                r = {},
                                a = {},
                                s && (a.thumbnailIds = s.join(Ia)),
                                void 0 !== u && (a.size = u),
                                void 0 !== c && (a.format = c),
                                void 0 !== l && (a.isCircular = l),
                                ba(t, a, d.query),
                                o = o && o.headers ? o.headers : {},
                                n.headers = Sa(Sa(Sa({}, r), o), d.headers),
                                [2, {
                                    url: wa(t),
                                    options: n
                                }]
                            })
                        })
                    }
                }
            }(c);
            return {
                v1GamesIconsGet: function(n, r, a, o, i, s) {
                    return Ra(this, void 0, Promise, function() {
                        var t;
                        return La(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, l.v1GamesIconsGet(n, r, a, o, i, s)];
                            case 1:
                                return t = e.sent(),
                                [2, Ca(t, y(), ga, c)]
                            }
                        })
                    })
                },
                v1GamesMultigetThumbnailsGet: function(n, r, a, o, i, s, u) {
                    return Ra(this, void 0, Promise, function() {
                        var t;
                        return La(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, l.v1GamesMultigetThumbnailsGet(n, r, a, o, i, s, u)];
                            case 1:
                                return t = e.sent(),
                                [2, Ca(t, y(), ga, c)]
                            }
                        })
                    })
                },
                v1GamesUniverseIdThumbnailsGet: function(n, r, a, o, i, s) {
                    return Ra(this, void 0, Promise, function() {
                        var t;
                        return La(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, l.v1GamesUniverseIdThumbnailsGet(n, r, a, o, i, s)];
                            case 1:
                                return t = e.sent(),
                                [2, Ca(t, y(), ga, c)]
                            }
                        })
                    })
                }
            }
        }
        var eo, Ln = (Hr(to, eo = bn),
        to.prototype.v1GamesIconsGet = function(e, t, n, r, a, o) {
            var i = this;
            return Za(this.configuration).v1GamesIconsGet(e, t, n, r, a, o).then(function(e) {
                return e(i.axios, i.basePath)
            })
        }
        ,
        to.prototype.v1GamesMultigetThumbnailsGet = function(e, t, n, r, a, o, i) {
            var s = this;
            return Za(this.configuration).v1GamesMultigetThumbnailsGet(e, t, n, r, a, o, i).then(function(e) {
                return e(s.axios, s.basePath)
            })
        }
        ,
        to.prototype.v1GamesUniverseIdThumbnailsGet = function(e, t, n, r, a, o) {
            var i = this;
            return Za(this.configuration).v1GamesUniverseIdThumbnailsGet(e, t, n, r, a, o).then(function(e) {
                return e(i.axios, i.basePath)
            })
        }
        ,
        to);
        function to() {
            return null !== eo && eo.apply(this, arguments) || this
        }
        function no(s) {
            var u = function(d) {
                var e = this;
                return {
                    v1GroupsIconsGet: function(i, s, u, c, l) {
                        return void 0 === l && (l = {}),
                        Ra(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return La(this, function(e) {
                                return Ga("v1GroupsIconsGet", "groupIds", i),
                                t = new URL("/v1/groups/icons",Ea),
                                d && (o = d.baseOptions),
                                n = Sa(Sa({
                                    method: "GET"
                                }, o), l),
                                r = {},
                                a = {},
                                i && (a.groupIds = i.join(Ia)),
                                void 0 !== s && (a.size = s),
                                void 0 !== u && (a.format = u),
                                void 0 !== c && (a.isCircular = c),
                                ba(t, a, l.query),
                                o = o && o.headers ? o.headers : {},
                                n.headers = Sa(Sa(Sa({}, r), o), l.headers),
                                [2, {
                                    url: wa(t),
                                    options: n
                                }]
                            })
                        })
                    }
                }
            }(s);
            return {
                v1GroupsIconsGet: function(n, r, a, o, i) {
                    return Ra(this, void 0, Promise, function() {
                        var t;
                        return La(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, u.v1GroupsIconsGet(n, r, a, o, i)];
                            case 1:
                                return t = e.sent(),
                                [2, Ca(t, y(), ga, s)]
                            }
                        })
                    })
                }
            }
        }
        var ro, ao, ae = (Hr(oo, ro = bn),
        oo.prototype.v1GroupsIconsGet = function(e, t, n, r, a) {
            var o = this;
            return no(this.configuration).v1GroupsIconsGet(e, t, n, r, a).then(function(e) {
                return e(o.axios, o.basePath)
            })
        }
        ,
        oo);
        function oo() {
            return null !== ro && ro.apply(this, arguments) || this
        }
        function io(r) {
            var a = function(i) {
                var e = this;
                return {
                    v1MetadataGet: function(o) {
                        return void 0 === o && (o = {}),
                        Ra(e, void 0, Promise, function() {
                            var t, n, r, a;
                            return La(this, function(e) {
                                return t = new URL("/v1/metadata",Ea),
                                i && (a = i.baseOptions),
                                n = Sa(Sa({
                                    method: "GET"
                                }, a), o),
                                r = {},
                                ba(t, {}, o.query),
                                a = a && a.headers ? a.headers : {},
                                n.headers = Sa(Sa(Sa({}, r), a), o.headers),
                                [2, {
                                    url: wa(t),
                                    options: n
                                }]
                            })
                        })
                    }
                }
            }(r);
            return {
                v1MetadataGet: function(n) {
                    return Ra(this, void 0, Promise, function() {
                        var t;
                        return La(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, a.v1MetadataGet(n)];
                            case 1:
                                return t = e.sent(),
                                [2, Ca(t, y(), ga, r)]
                            }
                        })
                    })
                }
            }
        }
        function so() {
            return null !== ao && ao.apply(this, arguments) || this
        }
        function uo(s) {
            var u = function(d) {
                var e = this;
                return {
                    v1UsersOutfitsGet: function(i, s, u, c, l) {
                        return void 0 === l && (l = {}),
                        Ra(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return La(this, function(e) {
                                return Ga("v1UsersOutfitsGet", "userOutfitIds", i),
                                t = new URL("/v1/users/outfits",Ea),
                                d && (o = d.baseOptions),
                                n = Sa(Sa({
                                    method: "GET"
                                }, o), l),
                                r = {},
                                a = {},
                                i && (a.userOutfitIds = i.join(Ia)),
                                void 0 !== s && (a.size = s),
                                void 0 !== u && (a.format = u),
                                void 0 !== c && (a.isCircular = c),
                                ba(t, a, l.query),
                                o = o && o.headers ? o.headers : {},
                                n.headers = Sa(Sa(Sa({}, r), o), l.headers),
                                [2, {
                                    url: wa(t),
                                    options: n
                                }]
                            })
                        })
                    }
                }
            }(s);
            return {
                v1UsersOutfitsGet: function(n, r, a, o, i) {
                    return Ra(this, void 0, Promise, function() {
                        var t;
                        return La(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, u.v1UsersOutfitsGet(n, r, a, o, i)];
                            case 1:
                                return t = e.sent(),
                                [2, Ca(t, y(), ga, s)]
                            }
                        })
                    })
                }
            }
        }
        Hr(so, ao = bn),
        so.prototype.v1MetadataGet = function(e) {
            var t = this;
            return io(this.configuration).v1MetadataGet(e).then(function(e) {
                return e(t.axios, t.basePath)
            })
        }
        ;
        var co, lo, ie = (Hr(ho, co = bn),
        ho.prototype.v1UsersOutfitsGet = function(e, t, n, r, a) {
            var o = this;
            return uo(this.configuration).v1UsersOutfitsGet(e, t, n, r, a).then(function(e) {
                return e(o.axios, o.basePath)
            })
        }
        ,
        ho);
        function ho() {
            return null !== co && co.apply(this, arguments) || this
        }
        function vo(u) {
            var c = function(h) {
                var e = this;
                return {
                    v1PlacesGameiconsGet: function(i, s, u, c, l, d) {
                        return void 0 === d && (d = {}),
                        Ra(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return La(this, function(e) {
                                return Ga("v1PlacesGameiconsGet", "placeIds", i),
                                t = new URL("/v1/places/gameicons",Ea),
                                h && (o = h.baseOptions),
                                n = Sa(Sa({
                                    method: "GET"
                                }, o), d),
                                r = {},
                                a = {},
                                i && (a.placeIds = i.join(Ia)),
                                void 0 !== s && (a.returnPolicy = s),
                                void 0 !== u && (a.size = u),
                                void 0 !== c && (a.format = c),
                                void 0 !== l && (a.isCircular = l),
                                ba(t, a, d.query),
                                o = o && o.headers ? o.headers : {},
                                n.headers = Sa(Sa(Sa({}, r), o), d.headers),
                                [2, {
                                    url: wa(t),
                                    options: n
                                }]
                            })
                        })
                    }
                }
            }(u);
            return {
                v1PlacesGameiconsGet: function(n, r, a, o, i, s) {
                    return Ra(this, void 0, Promise, function() {
                        var t;
                        return La(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, c.v1PlacesGameiconsGet(n, r, a, o, i, s)];
                            case 1:
                                return t = e.sent(),
                                [2, Ca(t, y(), ga, u)]
                            }
                        })
                    })
                }
            }
        }
        function po() {
            return null !== lo && lo.apply(this, arguments) || this
        }
        Hr(po, lo = bn),
        po.prototype.v1PlacesGameiconsGet = function(e, t, n, r, a, o) {
            var i = this;
            return vo(this.configuration).v1PlacesGameiconsGet(e, t, n, r, a, o).then(function(e) {
                return e(i.axios, i.basePath)
            })
        }
        ;
        var fo = m.EnvironmentUrls.thumbnailsApi
          , mo = new Ln
          , go = new X;
        (Ln = Go = Go || {}).PlaceHolder = "PlaceHolder",
        Ln.AutoGenerated = "AutoGenerated",
        Ln.ForceAutoGenerated = "ForceAutoGenerated",
        (X = Co = Co || {}).Large = "150x150",
        X.Default = "50x50",
        (Ln = Ro = Ro || {}).width768 = "768x432",
        Ln.width576 = "576x324",
        Ln.width480 = "480x270",
        Ln.width384 = "384x216",
        Ln.width256 = "256x144",
        (xo = xo || {}).Png = "Png";
        var Io, yo, X = {
            getIcons: function(e, t, n, r, a) {
                return mo.v1GamesIconsGet(e, t, n, r, a, {
                    withCredentials: !0
                })
            },
            getUniverseThumbnails: function(e, t, n, r) {
                return mo.v1GamesMultigetThumbnailsGet(e, 1, !0, t, n, r, {
                    withCredentials: !0
                }).then(function(e) {
                    var t = e.data
                      , n = e.status
                      , r = e.statusText
                      , a = e.headers
                      , e = e.request;
                    return {
                        data: {
                            data: null === (t = null == t ? void 0 : t.data) || void 0 === t ? void 0 : t.map(function(e) {
                                var t = null === (t = e.thumbnails) || void 0 === t ? void 0 : t[0];
                                return {
                                    targetId: e.universeId,
                                    state: null == t ? void 0 : t.state,
                                    imageUrl: null == t ? void 0 : t.imageUrl
                                }
                            })
                        },
                        status: n,
                        statusText: r,
                        headers: a,
                        request: e
                    }
                })
            },
            getAllUniverseThumbnails: function(e, t, n, r, a) {
                return void 0 === a && (a = 10),
                mo.v1GamesMultigetThumbnailsGet(e, a, !0, t, n, r, {
                    withCredentials: !0
                })
            },
            getGamePassIcons: function(e, t, n, r) {
                return go.v1GamePassesGet(e, t, n, r, {
                    withCredentials: !0
                })
            },
            getThumbnailsByThumbnailIds: function(e, t, n, r, a) {
                return mo.v1GamesUniverseIdThumbnailsGet(e, t, n, r, a, {
                    withCredentials: !0
                })
            },
            getPlacesGameIcons: function(e, t, n, r, a) {
                var o = {
                    url: fo + "/v1/places/gameicons",
                    withCredentials: !0,
                    retryable: !0
                };
                return rt.get(o, {
                    placeIds: e,
                    returnPolicy: t,
                    size: n,
                    format: r,
                    isCircular: a
                })
            },
            ReturnPolicy: Go,
            Size: Co,
            GameThumbnailSize: Ro,
            FileType: xo
        }, Po = new Z, Ln = {
            getMetadata: function() {
                return Po.v1TranslationAnalyticsMetadataGet({
                    withCredentials: !0
                })
            },
            requestReport: function(e, t, n, r, a) {
                a = {
                    startDateTime: t,
                    endDateTime: n,
                    reportType: r,
                    reportSubjectTargetId: a
                };
                return Po.v1TranslationAnalyticsGamesGameIdRequestTranslationAnalyticsReportPost(e, a, {
                    withCredentials: !0
                })
            },
            downloadReport: function(e, t, n, r, a) {
                return Po.v1TranslationAnalyticsGamesGameIdDownloadTranslationAnalyticsReportGet(e, t, n, r, a, {
                    withCredentials: !0,
                    responseType: "arraybuffer"
                })
            }
        }, Go = (Io = function(e, t) {
            return (Io = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            )(e, t)
        }
        ,
        function(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
            function n() {
                this.constructor = e
            }
            Io(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        ), bo = m.EnvironmentUrls.gamesApi.replace(/\/+$/, ""), wo = ",", Co = function(e, t, n) {
            void 0 === t && (t = bo),
            void 0 === n && (n = N),
            this.basePath = t,
            this.axios = n,
            e && (this.configuration = e,
            this.basePath = e.basePath || this.basePath)
        }, To = (yo = Error,
        Go(Ao, yo),
        Ao);
        function Ao(e, t) {
            t = yo.call(this, t) || this;
            return t.field = e,
            t.name = "RequiredError",
            t
        }
        var Eo, So, Ro = (Eo = function(e, t) {
            return (Eo = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            )(e, t)
        }
        ,
        function(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
            function n() {
                this.constructor = e
            }
            Eo(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        ), Lo = function() {
            return (Lo = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        };
        function qo(o) {
            return {
                v1GamesUniverseIdFavoritesCountGet: function(e, t) {
                    if (void 0 === t && (t = {}),
                    null == e)
                        throw new To("universeId","Required parameter universeId was null or undefined when calling v1GamesUniverseIdFavoritesCountGet.");
                    e = "/v1/games/{universeId}/favorites/count".replace("{universeId}", encodeURIComponent(String(e))),
                    e = wt.qg(e, !0);
                    o && (n = o.baseOptions);
                    var n = Lo(Lo({
                        method: "GET"
                    }, n), t);
                    return e.query = Lo(Lo(Lo({}, e.query), {}), t.query),
                    delete e.search,
                    n.headers = Lo(Lo({}, {}), t.headers),
                    {
                        url: wt.GP(e),
                        options: n
                    }
                },
                v1GamesUniverseIdFavoritesGet: function(e, t) {
                    if (void 0 === t && (t = {}),
                    null == e)
                        throw new To("universeId","Required parameter universeId was null or undefined when calling v1GamesUniverseIdFavoritesGet.");
                    e = "/v1/games/{universeId}/favorites".replace("{universeId}", encodeURIComponent(String(e))),
                    e = wt.qg(e, !0);
                    o && (n = o.baseOptions);
                    var n = Lo(Lo({
                        method: "GET"
                    }, n), t);
                    return e.query = Lo(Lo(Lo({}, e.query), {}), t.query),
                    delete e.search,
                    n.headers = Lo(Lo({}, {}), t.headers),
                    {
                        url: wt.GP(e),
                        options: n
                    }
                },
                v1GamesUniverseIdFavoritesPost: function(e, t, n) {
                    if (void 0 === n && (n = {}),
                    null == e)
                        throw new To("universeId","Required parameter universeId was null or undefined when calling v1GamesUniverseIdFavoritesPost.");
                    if (null == t)
                        throw new To("request","Required parameter request was null or undefined when calling v1GamesUniverseIdFavoritesPost.");
                    var r = "/v1/games/{universeId}/favorites".replace("{universeId}", encodeURIComponent(String(e)))
                      , e = wt.qg(r, !0);
                    o && (a = o.baseOptions);
                    var r = Lo(Lo({
                        method: "POST"
                    }, a), n)
                      , a = {};
                    a["Content-Type"] = "application/json",
                    e.query = Lo(Lo(Lo({}, e.query), {}), n.query),
                    delete e.search,
                    r.headers = Lo(Lo({}, a), n.headers);
                    return r.data = JSON.stringify(void 0 !== t ? t : {}),
                    {
                        url: wt.GP(e),
                        options: r
                    }
                }
            }
        }
        function Uo(a) {
            return {
                v1GamesUniverseIdFavoritesCountGet: function(e, t) {
                    var n = qo(a).v1GamesUniverseIdFavoritesCountGet(e, t);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = bo);
                        t = Lo(Lo({}, n.options), {
                            url: t + n.url
                        });
                        return e.request(t)
                    }
                },
                v1GamesUniverseIdFavoritesGet: function(e, t) {
                    var n = qo(a).v1GamesUniverseIdFavoritesGet(e, t);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = bo);
                        t = Lo(Lo({}, n.options), {
                            url: t + n.url
                        });
                        return e.request(t)
                    }
                },
                v1GamesUniverseIdFavoritesPost: function(e, t, n) {
                    var r = qo(a).v1GamesUniverseIdFavoritesPost(e, t, n);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = bo);
                        t = Lo(Lo({}, r.options), {
                            url: t + r.url
                        });
                        return e.request(t)
                    }
                }
            }
        }
        function Oo() {
            return null !== So && So.apply(this, arguments) || this
        }
        function Do(i) {
            return {
                v1GamesUniverseIdGamePassesGet: function(e, t, n, r, a) {
                    var s, o = (s = i,
                    function(e, t, n, r, a) {
                        if (void 0 === a && (a = {}),
                        null == e)
                            throw new To("universeId","Required parameter universeId was null or undefined when calling v1GamesUniverseIdGamePassesGet.");
                        var o = "/v1/games/{universeId}/game-passes".replace("{universeId}", encodeURIComponent(String(e)))
                          , e = wt.qg(o, !0);
                        s && (i = s.baseOptions);
                        var o = Lo(Lo({
                            method: "GET"
                        }, i), a)
                          , i = {};
                        return void 0 !== t && (i.sortOrder = t),
                        void 0 !== n && (i.limit = n),
                        void 0 !== r && (i.cursor = r),
                        e.query = Lo(Lo(Lo({}, e.query), i), a.query),
                        delete e.search,
                        o.headers = Lo(Lo({}, {}), a.headers),
                        {
                            url: wt.GP(e),
                            options: o
                        }
                    }(e, t, n, r, a));
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = bo);
                        t = Lo(Lo({}, o.options), {
                            url: t + o.url
                        });
                        return e.request(t)
                    }
                }
            }
        }
        (xo = {}).GamesDefaultSorts = "GamesDefaultSorts",
        xo.GamesAllSorts = "GamesAllSorts",
        xo.HomeSorts = "HomeSorts",
        xo.ChatSorts = "ChatSorts",
        xo.UnifiedHomeSorts = "UnifiedHomeSorts",
        xo.AbTestSorts = "AbTestSorts",
        xo.GamesPageAbTestSorts1 = "GamesPageAbTestSorts1",
        xo.GamesPageAbTestSorts2 = "GamesPageAbTestSorts2",
        (Z = {}).MorphToR6 = "MorphToR6",
        Z.PlayerChoice = "PlayerChoice",
        Z.MorphToR15 = "MorphToR15",
        (Go = {}).UnplayableOtherReason = "UnplayableOtherReason",
        Go.Playable = "Playable",
        Go.GuestProhibited = "GuestProhibited",
        Go.GameUnapproved = "GameUnapproved",
        Go.IncorrectConfiguration = "IncorrectConfiguration",
        Go.UniverseRootPlaceIsPrivate = "UniverseRootPlaceIsPrivate",
        Go.InsufficientPermissionFriendsOnly = "InsufficientPermissionFriendsOnly",
        Go.InsufficientPermissionGroupOnly = "InsufficientPermissionGroupOnly",
        Go.DeviceRestricted = "DeviceRestricted",
        Go.UnderReview = "UnderReview",
        Go.PurchaseRequired = "PurchaseRequired",
        Go.AccountRestricted = "AccountRestricted",
        Go.TemporarilyUnavailable = "TemporarilyUnavailable",
        (xo = {}).Facebook = "Facebook",
        xo.Twitter = "Twitter",
        xo.YouTube = "YouTube",
        xo.Twitch = "Twitch",
        xo.GooglePlus = "GooglePlus",
        xo.Discord = "Discord",
        xo.RobloxGroup = "RobloxGroup",
        xo.Amazon = "Amazon",
        (Z = {}).Asc = "Asc",
        Z.Desc = "Desc",
        (Go = {}).Forward = "Forward",
        Go.Backward = "Backward",
        Ro(Oo, So = Co),
        Oo.prototype.v1GamesUniverseIdFavoritesCountGet = function(e, t) {
            return Uo(this.configuration).v1GamesUniverseIdFavoritesCountGet(e, t)(this.axios, this.basePath)
        }
        ,
        Oo.prototype.v1GamesUniverseIdFavoritesGet = function(e, t) {
            return Uo(this.configuration).v1GamesUniverseIdFavoritesGet(e, t)(this.axios, this.basePath)
        }
        ,
        Oo.prototype.v1GamesUniverseIdFavoritesPost = function(e, t, n) {
            return Uo(this.configuration).v1GamesUniverseIdFavoritesPost(e, t, n)(this.axios, this.basePath)
        }
        ;
        var _o, xo = (Ro(Bo, _o = Co),
        Bo.prototype.v1GamesUniverseIdGamePassesGet = function(e, t, n, r, a) {
            return Do(this.configuration).v1GamesUniverseIdGamePassesGet(e, t, n, r, a)(this.axios, this.basePath)
        }
        ,
        Bo);
        function Bo() {
            return null !== _o && _o.apply(this, arguments) || this
        }
        function No(y) {
            return {
                v1GamesGameThumbnailGet: function(e, t, n, r) {
                    if (void 0 === r && (r = {}),
                    null == e)
                        throw new To("imageToken","Required parameter imageToken was null or undefined when calling v1GamesGameThumbnailGet.");
                    var a = wt.qg("/v1/games/game-thumbnail", !0);
                    y && (i = y.baseOptions);
                    var o = Lo(Lo({
                        method: "GET"
                    }, i), r)
                      , i = {};
                    return void 0 !== e && (i.imageToken = e),
                    void 0 !== t && (i.height = t),
                    void 0 !== n && (i.width = n),
                    a.query = Lo(Lo(Lo({}, a.query), i), r.query),
                    delete a.search,
                    o.headers = Lo(Lo({}, {}), r.headers),
                    {
                        url: wt.GP(a),
                        options: o
                    }
                },
                v1GamesGameThumbnailsGet: function(e, t, n, r) {
                    if (void 0 === r && (r = {}),
                    null == e)
                        throw new To("imageTokens","Required parameter imageTokens was null or undefined when calling v1GamesGameThumbnailsGet.");
                    var a = wt.qg("/v1/games/game-thumbnails", !0);
                    y && (i = y.baseOptions);
                    var o = Lo(Lo({
                        method: "GET"
                    }, i), r)
                      , i = {};
                    return e && (i.imageTokens = e),
                    void 0 !== t && (i.height = t),
                    void 0 !== n && (i.width = n),
                    a.query = Lo(Lo(Lo({}, a.query), i), r.query),
                    delete a.search,
                    o.headers = Lo(Lo({}, {}), r.headers),
                    {
                        url: wt.GP(a),
                        options: o
                    }
                },
                v1GamesGamesProductInfoGet: function(e, t) {
                    if (void 0 === t && (t = {}),
                    null == e)
                        throw new To("universeIds","Required parameter universeIds was null or undefined when calling v1GamesGamesProductInfoGet.");
                    var n = wt.qg("/v1/games/games-product-info", !0);
                    y && (a = y.baseOptions);
                    var r = Lo(Lo({
                        method: "GET"
                    }, a), t)
                      , a = {};
                    return e && (a.universeIds = e.join(wo)),
                    n.query = Lo(Lo(Lo({}, n.query), a), t.query),
                    delete n.search,
                    r.headers = Lo(Lo({}, {}), t.headers),
                    {
                        url: wt.GP(n),
                        options: r
                    }
                },
                v1GamesGet: function(e, t) {
                    if (void 0 === t && (t = {}),
                    null == e)
                        throw new To("universeIds","Required parameter universeIds was null or undefined when calling v1GamesGet.");
                    var n = wt.qg("/v1/games", !0);
                    y && (a = y.baseOptions);
                    var r = Lo(Lo({
                        method: "GET"
                    }, a), t)
                      , a = {};
                    return e && (a.universeIds = e.join(wo)),
                    n.query = Lo(Lo(Lo({}, n.query), a), t.query),
                    delete n.search,
                    r.headers = Lo(Lo({}, {}), t.headers),
                    {
                        url: wt.GP(n),
                        options: r
                    }
                },
                v1GamesListGet: function(e, t, n, r, a, o, i, s, u, c, l, d, h, v, p, f) {
                    void 0 === f && (f = {});
                    var m = wt.qg("/v1/games/list", !0);
                    y && (I = y.baseOptions);
                    var g = Lo(Lo({
                        method: "GET"
                    }, I), f)
                      , I = {};
                    return void 0 !== e && (I["model.sortToken"] = e),
                    void 0 !== t && (I["model.gameFilter"] = t),
                    void 0 !== n && (I["model.timeFilter"] = n),
                    void 0 !== r && (I["model.genreFilter"] = r),
                    void 0 !== a && (I["model.exclusiveStartId"] = a),
                    void 0 !== o && (I["model.sortOrder"] = o),
                    void 0 !== i && (I["model.gameSetTargetId"] = i),
                    void 0 !== s && (I["model.keyword"] = s),
                    void 0 !== u && (I["model.startRows"] = u),
                    void 0 !== c && (I["model.maxRows"] = c),
                    void 0 !== l && (I["model.isKeywordSuggestionEnabled"] = l),
                    void 0 !== d && (I["model.contextCountryRegionId"] = d),
                    void 0 !== h && (I["model.contextUniverseId"] = h),
                    void 0 !== v && (I["model.pageId"] = v),
                    void 0 !== p && (I["model.sortPosition"] = p),
                    m.query = Lo(Lo(Lo({}, m.query), I), f.query),
                    delete m.search,
                    g.headers = Lo(Lo({}, {}), f.headers),
                    {
                        url: wt.GP(m),
                        options: g
                    }
                },
                v1GamesMultigetPlaceDetailsGet: function(e, t) {
                    if (void 0 === t && (t = {}),
                    null == e)
                        throw new To("placeIds","Required parameter placeIds was null or undefined when calling v1GamesMultigetPlaceDetailsGet.");
                    var n = wt.qg("/v1/games/multiget-place-details", !0);
                    y && (a = y.baseOptions);
                    var r = Lo(Lo({
                        method: "GET"
                    }, a), t)
                      , a = {};
                    return e && (a.placeIds = e),
                    n.query = Lo(Lo(Lo({}, n.query), a), t.query),
                    delete n.search,
                    r.headers = Lo(Lo({}, {}), t.headers),
                    {
                        url: wt.GP(n),
                        options: r
                    }
                },
                v1GamesMultigetPlayabilityStatusGet: function(e, t) {
                    if (void 0 === t && (t = {}),
                    null == e)
                        throw new To("universeIds","Required parameter universeIds was null or undefined when calling v1GamesMultigetPlayabilityStatusGet.");
                    var n = wt.qg("/v1/games/multiget-playability-status", !0);
                    y && (a = y.baseOptions);
                    var r = Lo(Lo({
                        method: "GET"
                    }, a), t)
                      , a = {};
                    return e && (a.universeIds = e.join(wo)),
                    n.query = Lo(Lo(Lo({}, n.query), a), t.query),
                    delete n.search,
                    r.headers = Lo(Lo({}, {}), t.headers),
                    {
                        url: wt.GP(n),
                        options: r
                    }
                },
                v1GamesPlaceIdServersServerTypeGet: function(e, t, n, r, a, o) {
                    if (void 0 === o && (o = {}),
                    null == e)
                        throw new To("placeId","Required parameter placeId was null or undefined when calling v1GamesPlaceIdServersServerTypeGet.");
                    if (null == t)
                        throw new To("serverType","Required parameter serverType was null or undefined when calling v1GamesPlaceIdServersServerTypeGet.");
                    e = "/v1/games/{placeId}/servers/{serverType}".replace("{placeId}", encodeURIComponent(String(e))).replace("{serverType}", encodeURIComponent(String(t))),
                    t = wt.qg(e, !0);
                    y && (i = y.baseOptions);
                    var e = Lo(Lo({
                        method: "GET"
                    }, i), o)
                      , i = {};
                    return void 0 !== n && (i.sortOrder = n),
                    void 0 !== r && (i.limit = r),
                    void 0 !== a && (i.cursor = a),
                    t.query = Lo(Lo(Lo({}, t.query), i), o.query),
                    delete t.search,
                    e.headers = Lo(Lo({}, {}), o.headers),
                    {
                        url: wt.GP(t),
                        options: e
                    }
                },
                v1GamesPlacesPlaceIdMetadataPost: function(e, t, n) {
                    if (void 0 === n && (n = {}),
                    null == e)
                        throw new To("placeId","Required parameter placeId was null or undefined when calling v1GamesPlacesPlaceIdMetadataPost.");
                    if (null == t)
                        throw new To("request","Required parameter request was null or undefined when calling v1GamesPlacesPlaceIdMetadataPost.");
                    var r = "/v1/games/places/{placeId}/metadata".replace("{placeId}", encodeURIComponent(String(e)))
                      , e = wt.qg(r, !0);
                    y && (a = y.baseOptions);
                    var r = Lo(Lo({
                        method: "POST"
                    }, a), n)
                      , a = {};
                    a["Content-Type"] = "application/json",
                    e.query = Lo(Lo(Lo({}, e.query), {}), n.query),
                    delete e.search,
                    r.headers = Lo(Lo({}, a), n.headers);
                    return r.data = JSON.stringify(void 0 !== t ? t : {}),
                    {
                        url: wt.GP(e),
                        options: r
                    }
                },
                v1GamesRecommendationsAlgorithmAlgorithmNameGet: function(e, t, n, r) {
                    if (void 0 === r && (r = {}),
                    null == e)
                        throw new To("algorithmName","Required parameter algorithmName was null or undefined when calling v1GamesRecommendationsAlgorithmAlgorithmNameGet.");
                    var a = "/v1/games/recommendations/algorithm/{algorithmName}".replace("{algorithmName}", encodeURIComponent(String(e)))
                      , e = wt.qg(a, !0);
                    y && (o = y.baseOptions);
                    var a = Lo(Lo({
                        method: "GET"
                    }, o), r)
                      , o = {};
                    return void 0 !== t && (o["model.paginationKey"] = t),
                    void 0 !== n && (o["model.maxRows"] = n),
                    e.query = Lo(Lo(Lo({}, e.query), o), r.query),
                    delete e.search,
                    a.headers = Lo(Lo({}, {}), r.headers),
                    {
                        url: wt.GP(e),
                        options: a
                    }
                },
                v1GamesRecommendationsGameUniverseIdGet: function(e, t, n, r) {
                    if (void 0 === r && (r = {}),
                    null == e)
                        throw new To("universeId","Required parameter universeId was null or undefined when calling v1GamesRecommendationsGameUniverseIdGet.");
                    var a = "/v1/games/recommendations/game/{universeId}".replace("{universeId}", encodeURIComponent(String(e)))
                      , e = wt.qg(a, !0);
                    y && (o = y.baseOptions);
                    var a = Lo(Lo({
                        method: "GET"
                    }, o), r)
                      , o = {};
                    return void 0 !== t && (o["model.paginationKey"] = t),
                    void 0 !== n && (o["model.maxRows"] = n),
                    e.query = Lo(Lo(Lo({}, e.query), o), r.query),
                    delete e.search,
                    a.headers = Lo(Lo({}, {}), r.headers),
                    {
                        url: wt.GP(e),
                        options: a
                    }
                },
                v1GamesSortsGet: function(e, t) {
                    void 0 === t && (t = {});
                    var n = wt.qg("/v1/games/sorts", !0);
                    y && (a = y.baseOptions);
                    var r = Lo(Lo({
                        method: "GET"
                    }, a), t)
                      , a = {};
                    return void 0 !== e && (a["model.gameSortsContext"] = e),
                    n.query = Lo(Lo(Lo({}, n.query), a), t.query),
                    delete n.search,
                    r.headers = Lo(Lo({}, {}), t.headers),
                    {
                        url: wt.GP(n),
                        options: r
                    }
                },
                v1GamesUniverseIdIconGet: function(e, t) {
                    if (void 0 === t && (t = {}),
                    null == e)
                        throw new To("universeId","Required parameter universeId was null or undefined when calling v1GamesUniverseIdIconGet.");
                    e = "/v1/games/{universeId}/icon".replace("{universeId}", encodeURIComponent(String(e))),
                    e = wt.qg(e, !0);
                    y && (n = y.baseOptions);
                    var n = Lo(Lo({
                        method: "GET"
                    }, n), t);
                    return e.query = Lo(Lo(Lo({}, e.query), {}), t.query),
                    delete e.search,
                    n.headers = Lo(Lo({}, {}), t.headers),
                    {
                        url: wt.GP(e),
                        options: n
                    }
                },
                v1GamesUniverseIdMediaGet: function(e, t) {
                    if (void 0 === t && (t = {}),
                    null == e)
                        throw new To("universeId","Required parameter universeId was null or undefined when calling v1GamesUniverseIdMediaGet.");
                    e = "/v1/games/{universeId}/media".replace("{universeId}", encodeURIComponent(String(e))),
                    e = wt.qg(e, !0);
                    y && (n = y.baseOptions);
                    var n = Lo(Lo({
                        method: "GET"
                    }, n), t);
                    return e.query = Lo(Lo(Lo({}, e.query), {}), t.query),
                    delete e.search,
                    n.headers = Lo(Lo({}, {}), t.headers),
                    {
                        url: wt.GP(e),
                        options: n
                    }
                }
            }
        }
        function Fo(g) {
            return {
                v1GamesGameThumbnailGet: function(e, t, n, r) {
                    var a = No(g).v1GamesGameThumbnailGet(e, t, n, r);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = bo);
                        t = Lo(Lo({}, a.options), {
                            url: t + a.url
                        });
                        return e.request(t)
                    }
                },
                v1GamesGameThumbnailsGet: function(e, t, n, r) {
                    var a = No(g).v1GamesGameThumbnailsGet(e, t, n, r);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = bo);
                        t = Lo(Lo({}, a.options), {
                            url: t + a.url
                        });
                        return e.request(t)
                    }
                },
                v1GamesGamesProductInfoGet: function(e, t) {
                    var n = No(g).v1GamesGamesProductInfoGet(e, t);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = bo);
                        t = Lo(Lo({}, n.options), {
                            url: t + n.url
                        });
                        return e.request(t)
                    }
                },
                v1GamesGet: function(e, t) {
                    var n = No(g).v1GamesGet(e, t);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = bo);
                        t = Lo(Lo({}, n.options), {
                            url: t + n.url
                        });
                        return e.request(t)
                    }
                },
                v1GamesListGet: function(e, t, n, r, a, o, i, s, u, c, l, d, h, v, p, f) {
                    var m = No(g).v1GamesListGet(e, t, n, r, a, o, i, s, u, c, l, d, h, v, p, f);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = bo);
                        t = Lo(Lo({}, m.options), {
                            url: t + m.url
                        });
                        return e.request(t)
                    }
                },
                v1GamesMultigetPlaceDetailsGet: function(e, t) {
                    var n = No(g).v1GamesMultigetPlaceDetailsGet(e, t);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = bo);
                        t = Lo(Lo({}, n.options), {
                            url: t + n.url
                        });
                        return e.request(t)
                    }
                },
                v1GamesMultigetPlayabilityStatusGet: function(e, t) {
                    var n = No(g).v1GamesMultigetPlayabilityStatusGet(e, t);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = bo);
                        t = Lo(Lo({}, n.options), {
                            url: t + n.url
                        });
                        return e.request(t)
                    }
                },
                v1GamesPlaceIdServersServerTypeGet: function(e, t, n, r, a, o) {
                    var i = No(g).v1GamesPlaceIdServersServerTypeGet(e, t, n, r, a, o);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = bo);
                        t = Lo(Lo({}, i.options), {
                            url: t + i.url
                        });
                        return e.request(t)
                    }
                },
                v1GamesPlacesPlaceIdMetadataPost: function(e, t, n) {
                    var r = No(g).v1GamesPlacesPlaceIdMetadataPost(e, t, n);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = bo);
                        t = Lo(Lo({}, r.options), {
                            url: t + r.url
                        });
                        return e.request(t)
                    }
                },
                v1GamesRecommendationsAlgorithmAlgorithmNameGet: function(e, t, n, r) {
                    var a = No(g).v1GamesRecommendationsAlgorithmAlgorithmNameGet(e, t, n, r);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = bo);
                        t = Lo(Lo({}, a.options), {
                            url: t + a.url
                        });
                        return e.request(t)
                    }
                },
                v1GamesRecommendationsGameUniverseIdGet: function(e, t, n, r) {
                    var a = No(g).v1GamesRecommendationsGameUniverseIdGet(e, t, n, r);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = bo);
                        t = Lo(Lo({}, a.options), {
                            url: t + a.url
                        });
                        return e.request(t)
                    }
                },
                v1GamesSortsGet: function(e, t) {
                    var n = No(g).v1GamesSortsGet(e, t);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = bo);
                        t = Lo(Lo({}, n.options), {
                            url: t + n.url
                        });
                        return e.request(t)
                    }
                },
                v1GamesUniverseIdIconGet: function(e, t) {
                    var n = No(g).v1GamesUniverseIdIconGet(e, t);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = bo);
                        t = Lo(Lo({}, n.options), {
                            url: t + n.url
                        });
                        return e.request(t)
                    }
                },
                v1GamesUniverseIdMediaGet: function(e, t) {
                    var n = No(g).v1GamesUniverseIdMediaGet(e, t);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = bo);
                        t = Lo(Lo({}, n.options), {
                            url: t + n.url
                        });
                        return e.request(t)
                    }
                }
            }
        }
        var ko, Mo, jo, zo, Z = (Ro(Vo, ko = Co),
        Vo.prototype.v1GamesGameThumbnailGet = function(e, t, n, r) {
            return Fo(this.configuration).v1GamesGameThumbnailGet(e, t, n, r)(this.axios, this.basePath)
        }
        ,
        Vo.prototype.v1GamesGameThumbnailsGet = function(e, t, n, r) {
            return Fo(this.configuration).v1GamesGameThumbnailsGet(e, t, n, r)(this.axios, this.basePath)
        }
        ,
        Vo.prototype.v1GamesGamesProductInfoGet = function(e, t) {
            return Fo(this.configuration).v1GamesGamesProductInfoGet(e, t)(this.axios, this.basePath)
        }
        ,
        Vo.prototype.v1GamesGet = function(e, t) {
            return Fo(this.configuration).v1GamesGet(e, t)(this.axios, this.basePath)
        }
        ,
        Vo.prototype.v1GamesListGet = function(e, t, n, r, a, o, i, s, u, c, l, d, h, v, p, f) {
            return Fo(this.configuration).v1GamesListGet(e, t, n, r, a, o, i, s, u, c, l, d, h, v, p, f)(this.axios, this.basePath)
        }
        ,
        Vo.prototype.v1GamesMultigetPlaceDetailsGet = function(e, t) {
            return Fo(this.configuration).v1GamesMultigetPlaceDetailsGet(e, t)(this.axios, this.basePath)
        }
        ,
        Vo.prototype.v1GamesMultigetPlayabilityStatusGet = function(e, t) {
            return Fo(this.configuration).v1GamesMultigetPlayabilityStatusGet(e, t)(this.axios, this.basePath)
        }
        ,
        Vo.prototype.v1GamesPlaceIdServersServerTypeGet = function(e, t, n, r, a, o) {
            return Fo(this.configuration).v1GamesPlaceIdServersServerTypeGet(e, t, n, r, a, o)(this.axios, this.basePath)
        }
        ,
        Vo.prototype.v1GamesPlacesPlaceIdMetadataPost = function(e, t, n) {
            return Fo(this.configuration).v1GamesPlacesPlaceIdMetadataPost(e, t, n)(this.axios, this.basePath)
        }
        ,
        Vo.prototype.v1GamesRecommendationsAlgorithmAlgorithmNameGet = function(e, t, n, r) {
            return Fo(this.configuration).v1GamesRecommendationsAlgorithmAlgorithmNameGet(e, t, n, r)(this.axios, this.basePath)
        }
        ,
        Vo.prototype.v1GamesRecommendationsGameUniverseIdGet = function(e, t, n, r) {
            return Fo(this.configuration).v1GamesRecommendationsGameUniverseIdGet(e, t, n, r)(this.axios, this.basePath)
        }
        ,
        Vo.prototype.v1GamesSortsGet = function(e, t) {
            return Fo(this.configuration).v1GamesSortsGet(e, t)(this.axios, this.basePath)
        }
        ,
        Vo.prototype.v1GamesUniverseIdIconGet = function(e, t) {
            return Fo(this.configuration).v1GamesUniverseIdIconGet(e, t)(this.axios, this.basePath)
        }
        ,
        Vo.prototype.v1GamesUniverseIdMediaGet = function(e, t) {
            return Fo(this.configuration).v1GamesUniverseIdMediaGet(e, t)(this.axios, this.basePath)
        }
        ,
        Vo);
        function Vo() {
            return null !== ko && ko.apply(this, arguments) || this
        }
        function Ho(a) {
            return {
                v1GamesUniverseIdSocialLinksListGet: function(e, t) {
                    var r, n = (r = a,
                    function(e, t) {
                        if (void 0 === t && (t = {}),
                        null == e)
                            throw new To("universeId","Required parameter universeId was null or undefined when calling v1GamesUniverseIdSocialLinksListGet.");
                        e = "/v1/games/{universeId}/social-links/list".replace("{universeId}", encodeURIComponent(String(e))),
                        e = wt.qg(e, !0);
                        r && (n = r.baseOptions);
                        var n = Lo(Lo({
                            method: "GET"
                        }, n), t);
                        return e.query = Lo(Lo(Lo({}, e.query), {}), t.query),
                        delete e.search,
                        n.headers = Lo(Lo({}, {}), t.headers),
                        {
                            url: wt.GP(e),
                            options: n
                        }
                    }(e, t));
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = bo);
                        t = Lo(Lo({}, n.options), {
                            url: t + n.url
                        });
                        return e.request(t)
                    }
                }
            }
        }
        function Wo() {
            return null !== Mo && Mo.apply(this, arguments) || this
        }
        function Ko(o) {
            return {
                v1GamesVipServersUniverseIdPost: function(e, t, n) {
                    if (void 0 === n && (n = {}),
                    null == e)
                        throw new To("universeId","Required parameter universeId was null or undefined when calling v1GamesVipServersUniverseIdPost.");
                    if (null == t)
                        throw new To("requestBody","Required parameter requestBody was null or undefined when calling v1GamesVipServersUniverseIdPost.");
                    var r = "/v1/games/vip-servers/{universeId}".replace("{universeId}", encodeURIComponent(String(e)))
                      , e = wt.qg(r, !0);
                    o && (a = o.baseOptions);
                    var r = Lo(Lo({
                        method: "POST"
                    }, a), n)
                      , a = {};
                    a["Content-Type"] = "application/json",
                    e.query = Lo(Lo(Lo({}, e.query), {}), n.query),
                    delete e.search,
                    r.headers = Lo(Lo({}, a), n.headers);
                    return r.data = JSON.stringify(void 0 !== t ? t : {}),
                    {
                        url: wt.GP(e),
                        options: r
                    }
                },
                v1VipServersIdGet: function(e, t) {
                    if (void 0 === t && (t = {}),
                    null == e)
                        throw new To("id","Required parameter id was null or undefined when calling v1VipServersIdGet.");
                    e = "/v1/vip-servers/{id}".replace("{id}", encodeURIComponent(String(e))),
                    e = wt.qg(e, !0);
                    o && (n = o.baseOptions);
                    var n = Lo(Lo({
                        method: "GET"
                    }, n), t);
                    return e.query = Lo(Lo(Lo({}, e.query), {}), t.query),
                    delete e.search,
                    n.headers = Lo(Lo({}, {}), t.headers),
                    {
                        url: wt.GP(e),
                        options: n
                    }
                },
                v1VipServersIdPatch: function(e, t, n) {
                    if (void 0 === n && (n = {}),
                    null == e)
                        throw new To("id","Required parameter id was null or undefined when calling v1VipServersIdPatch.");
                    if (null == t)
                        throw new To("request","Required parameter request was null or undefined when calling v1VipServersIdPatch.");
                    var r = "/v1/vip-servers/{id}".replace("{id}", encodeURIComponent(String(e)))
                      , e = wt.qg(r, !0);
                    o && (a = o.baseOptions);
                    var r = Lo(Lo({
                        method: "PATCH"
                    }, a), n)
                      , a = {};
                    a["Content-Type"] = "application/json",
                    e.query = Lo(Lo(Lo({}, e.query), {}), n.query),
                    delete e.search,
                    r.headers = Lo(Lo({}, a), n.headers);
                    return r.data = JSON.stringify(void 0 !== t ? t : {}),
                    {
                        url: wt.GP(e),
                        options: r
                    }
                },
                v1VipServersIdPermissionsPatch: function(e, t, n) {
                    if (void 0 === n && (n = {}),
                    null == e)
                        throw new To("id","Required parameter id was null or undefined when calling v1VipServersIdPermissionsPatch.");
                    if (null == t)
                        throw new To("request","Required parameter request was null or undefined when calling v1VipServersIdPermissionsPatch.");
                    var r = "/v1/vip-servers/{id}/permissions".replace("{id}", encodeURIComponent(String(e)))
                      , e = wt.qg(r, !0);
                    o && (a = o.baseOptions);
                    var r = Lo(Lo({
                        method: "PATCH"
                    }, a), n)
                      , a = {};
                    a["Content-Type"] = "application/json",
                    e.query = Lo(Lo(Lo({}, e.query), {}), n.query),
                    delete e.search,
                    r.headers = Lo(Lo({}, a), n.headers);
                    return r.data = JSON.stringify(void 0 !== t ? t : {}),
                    {
                        url: wt.GP(e),
                        options: r
                    }
                },
                v1VipServersIdSubscriptionPatch: function(e, t, n) {
                    if (void 0 === n && (n = {}),
                    null == e)
                        throw new To("id","Required parameter id was null or undefined when calling v1VipServersIdSubscriptionPatch.");
                    if (null == t)
                        throw new To("request","Required parameter request was null or undefined when calling v1VipServersIdSubscriptionPatch.");
                    var r = "/v1/vip-servers/{id}/subscription".replace("{id}", encodeURIComponent(String(e)))
                      , e = wt.qg(r, !0);
                    o && (a = o.baseOptions);
                    var r = Lo(Lo({
                        method: "PATCH"
                    }, a), n)
                      , a = {};
                    a["Content-Type"] = "application/json",
                    e.query = Lo(Lo(Lo({}, e.query), {}), n.query),
                    delete e.search,
                    r.headers = Lo(Lo({}, a), n.headers);
                    return r.data = JSON.stringify(void 0 !== t ? t : {}),
                    {
                        url: wt.GP(e),
                        options: r
                    }
                }
            }
        }
        function Xo(a) {
            return {
                v1GamesVipServersUniverseIdPost: function(e, t, n) {
                    var r = Ko(a).v1GamesVipServersUniverseIdPost(e, t, n);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = bo);
                        t = Lo(Lo({}, r.options), {
                            url: t + r.url
                        });
                        return e.request(t)
                    }
                },
                v1VipServersIdGet: function(e, t) {
                    var n = Ko(a).v1VipServersIdGet(e, t);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = bo);
                        t = Lo(Lo({}, n.options), {
                            url: t + n.url
                        });
                        return e.request(t)
                    }
                },
                v1VipServersIdPatch: function(e, t, n) {
                    var r = Ko(a).v1VipServersIdPatch(e, t, n);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = bo);
                        t = Lo(Lo({}, r.options), {
                            url: t + r.url
                        });
                        return e.request(t)
                    }
                },
                v1VipServersIdPermissionsPatch: function(e, t, n) {
                    var r = Ko(a).v1VipServersIdPermissionsPatch(e, t, n);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = bo);
                        t = Lo(Lo({}, r.options), {
                            url: t + r.url
                        });
                        return e.request(t)
                    }
                },
                v1VipServersIdSubscriptionPatch: function(e, t, n) {
                    var r = Ko(a).v1VipServersIdSubscriptionPatch(e, t, n);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = bo);
                        t = Lo(Lo({}, r.options), {
                            url: t + r.url
                        });
                        return e.request(t)
                    }
                }
            }
        }
        function Jo() {
            return null !== jo && jo.apply(this, arguments) || this
        }
        function Qo(o) {
            return {
                v1GamesUniverseIdUserVotesPatch: function(e, t, n) {
                    if (void 0 === n && (n = {}),
                    null == e)
                        throw new To("universeId","Required parameter universeId was null or undefined when calling v1GamesUniverseIdUserVotesPatch.");
                    if (null == t)
                        throw new To("requestBody","Required parameter requestBody was null or undefined when calling v1GamesUniverseIdUserVotesPatch.");
                    var r = "/v1/games/{universeId}/user-votes".replace("{universeId}", encodeURIComponent(String(e)))
                      , e = wt.qg(r, !0);
                    o && (a = o.baseOptions);
                    var r = Lo(Lo({
                        method: "PATCH"
                    }, a), n)
                      , a = {};
                    a["Content-Type"] = "application/json",
                    e.query = Lo(Lo(Lo({}, e.query), {}), n.query),
                    delete e.search,
                    r.headers = Lo(Lo({}, a), n.headers);
                    return r.data = JSON.stringify(void 0 !== t ? t : {}),
                    {
                        url: wt.GP(e),
                        options: r
                    }
                },
                v1GamesUniverseIdVotesGet: function(e, t) {
                    if (void 0 === t && (t = {}),
                    null == e)
                        throw new To("universeId","Required parameter universeId was null or undefined when calling v1GamesUniverseIdVotesGet.");
                    e = "/v1/games/{universeId}/votes".replace("{universeId}", encodeURIComponent(String(e))),
                    e = wt.qg(e, !0);
                    o && (n = o.baseOptions);
                    var n = Lo(Lo({
                        method: "GET"
                    }, n), t);
                    return e.query = Lo(Lo(Lo({}, e.query), {}), t.query),
                    delete e.search,
                    n.headers = Lo(Lo({}, {}), t.headers),
                    {
                        url: wt.GP(e),
                        options: n
                    }
                },
                v1GamesUniverseIdVotesUserGet: function(e, t) {
                    if (void 0 === t && (t = {}),
                    null == e)
                        throw new To("universeId","Required parameter universeId was null or undefined when calling v1GamesUniverseIdVotesUserGet.");
                    e = "/v1/games/{universeId}/votes/user".replace("{universeId}", encodeURIComponent(String(e))),
                    e = wt.qg(e, !0);
                    o && (n = o.baseOptions);
                    var n = Lo(Lo({
                        method: "GET"
                    }, n), t);
                    return e.query = Lo(Lo(Lo({}, e.query), {}), t.query),
                    delete e.search,
                    n.headers = Lo(Lo({}, {}), t.headers),
                    {
                        url: wt.GP(e),
                        options: n
                    }
                },
                v1GamesVotesGet: function(e, t) {
                    if (void 0 === t && (t = {}),
                    null == e)
                        throw new To("universeIds","Required parameter universeIds was null or undefined when calling v1GamesVotesGet.");
                    var n = wt.qg("/v1/games/votes", !0);
                    o && (a = o.baseOptions);
                    var r = Lo(Lo({
                        method: "GET"
                    }, a), t)
                      , a = {};
                    return e && (a.universeIds = e.join(wo)),
                    n.query = Lo(Lo(Lo({}, n.query), a), t.query),
                    delete n.search,
                    r.headers = Lo(Lo({}, {}), t.headers),
                    {
                        url: wt.GP(n),
                        options: r
                    }
                }
            }
        }
        function Yo(a) {
            return {
                v1GamesUniverseIdUserVotesPatch: function(e, t, n) {
                    var r = Qo(a).v1GamesUniverseIdUserVotesPatch(e, t, n);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = bo);
                        t = Lo(Lo({}, r.options), {
                            url: t + r.url
                        });
                        return e.request(t)
                    }
                },
                v1GamesUniverseIdVotesGet: function(e, t) {
                    var n = Qo(a).v1GamesUniverseIdVotesGet(e, t);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = bo);
                        t = Lo(Lo({}, n.options), {
                            url: t + n.url
                        });
                        return e.request(t)
                    }
                },
                v1GamesUniverseIdVotesUserGet: function(e, t) {
                    var n = Qo(a).v1GamesUniverseIdVotesUserGet(e, t);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = bo);
                        t = Lo(Lo({}, n.options), {
                            url: t + n.url
                        });
                        return e.request(t)
                    }
                },
                v1GamesVotesGet: function(e, t) {
                    var n = Qo(a).v1GamesVotesGet(e, t);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = bo);
                        t = Lo(Lo({}, n.options), {
                            url: t + n.url
                        });
                        return e.request(t)
                    }
                }
            }
        }
        function $o() {
            return null !== zo && zo.apply(this, arguments) || this
        }
        Ro(Wo, Mo = Co),
        Wo.prototype.v1GamesUniverseIdSocialLinksListGet = function(e, t) {
            return Ho(this.configuration).v1GamesUniverseIdSocialLinksListGet(e, t)(this.axios, this.basePath)
        }
        ,
        Ro(Jo, jo = Co),
        Jo.prototype.v1GamesVipServersUniverseIdPost = function(e, t, n) {
            return Xo(this.configuration).v1GamesVipServersUniverseIdPost(e, t, n)(this.axios, this.basePath)
        }
        ,
        Jo.prototype.v1VipServersIdGet = function(e, t) {
            return Xo(this.configuration).v1VipServersIdGet(e, t)(this.axios, this.basePath)
        }
        ,
        Jo.prototype.v1VipServersIdPatch = function(e, t, n) {
            return Xo(this.configuration).v1VipServersIdPatch(e, t, n)(this.axios, this.basePath)
        }
        ,
        Jo.prototype.v1VipServersIdPermissionsPatch = function(e, t, n) {
            return Xo(this.configuration).v1VipServersIdPermissionsPatch(e, t, n)(this.axios, this.basePath)
        }
        ,
        Jo.prototype.v1VipServersIdSubscriptionPatch = function(e, t, n) {
            return Xo(this.configuration).v1VipServersIdSubscriptionPatch(e, t, n)(this.axios, this.basePath)
        }
        ,
        Ro($o, zo = Co),
        $o.prototype.v1GamesUniverseIdUserVotesPatch = function(e, t, n) {
            return Yo(this.configuration).v1GamesUniverseIdUserVotesPatch(e, t, n)(this.axios, this.basePath)
        }
        ,
        $o.prototype.v1GamesUniverseIdVotesGet = function(e, t) {
            return Yo(this.configuration).v1GamesUniverseIdVotesGet(e, t)(this.axios, this.basePath)
        }
        ,
        $o.prototype.v1GamesUniverseIdVotesUserGet = function(e, t) {
            return Yo(this.configuration).v1GamesUniverseIdVotesUserGet(e, t)(this.axios, this.basePath)
        }
        ,
        $o.prototype.v1GamesVotesGet = function(e, t) {
            return Yo(this.configuration).v1GamesVotesGet(e, t)(this.axios, this.basePath)
        }
        ;
        var Zo, ei, Go = (Zo = function(e, t) {
            return (Zo = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            )(e, t)
        }
        ,
        function(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
            function n() {
                this.constructor = e
            }
            Zo(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        ), ti = m.EnvironmentUrls.gamesApi.replace(/\/+$/, ""), Ro = function(e, t, n) {
            void 0 === t && (t = ti),
            void 0 === n && (n = N),
            this.basePath = t,
            this.axios = n,
            e && (this.configuration = e,
            this.basePath = e.basePath || this.basePath)
        }, ni = (ei = Error,
        Go(ri, ei),
        ri);
        function ri(e, t) {
            t = ei.call(this, t) || this;
            return t.field = e,
            t.name = "RequiredError",
            t
        }
        function ai(e, t, n) {
            if (null == n)
                throw new ni(t,"Required parameter " + t + " was null or undefined when calling " + e + ".")
        }
        function oi(e) {
            for (var t = [], n = 1; n < arguments.length; n++)
                t[n - 1] = arguments[n];
            for (var r = new URLSearchParams(e.search), a = 0, o = t; a < o.length; a++) {
                var i, s = o[a];
                for (i in s)
                    r.set(i, s[i])
            }
            e.search = r.toString()
        }
        function ii(e) {
            return e.pathname + e.search + e.hash
        }
        function si(n, r, a, o) {
            return function(e, t) {
                void 0 === e && (e = r),
                void 0 === t && (t = a);
                t = ci(ci({}, n.options), {
                    url: ((null == o ? void 0 : o.basePath) || t) + n.url
                });
                return e.request(t)
            }
        }
        var ui, ci = function() {
            return (ci = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        }, li = "https://example.com", Co = (ui = function(e, t) {
            return (ui = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            )(e, t)
        }
        ,
        function(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
            function n() {
                this.constructor = e
            }
            ui(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        ), di = function() {
            return (di = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        }, hi = function(e, i, s, u) {
            return new (s = s || Promise)(function(n, t) {
                function r(e) {
                    try {
                        o(u.next(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function a(e) {
                    try {
                        o(u.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function o(e) {
                    var t;
                    e.done ? n(e.value) : ((t = e.value)instanceof s ? t : new s(function(e) {
                        e(t)
                    }
                    )).then(r, a)
                }
                o((u = u.apply(e, i || [])).next())
            }
            )
        }, vi = function(n, r) {
            var a, o, i, s = {
                label: 0,
                sent: function() {
                    if (1 & i[0])
                        throw i[1];
                    return i[1]
                },
                trys: [],
                ops: []
            }, e = {
                next: t(0),
                throw: t(1),
                return: t(2)
            };
            return "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                return this
            }
            ),
            e;
            function t(t) {
                return function(e) {
                    return function(t) {
                        if (a)
                            throw new TypeError("Generator is already executing.");
                        for (; s; )
                            try {
                                if (a = 1,
                                o && (i = 2 & t[0] ? o.return : t[0] ? o.throw || ((i = o.return) && i.call(o),
                                0) : o.next) && !(i = i.call(o, t[1])).done)
                                    return i;
                                switch (o = 0,
                                i && (t = [2 & t[0], i.value]),
                                t[0]) {
                                case 0:
                                case 1:
                                    i = t;
                                    break;
                                case 4:
                                    return s.label++,
                                    {
                                        value: t[1],
                                        done: !1
                                    };
                                case 5:
                                    s.label++,
                                    o = t[1],
                                    t = [0];
                                    continue;
                                case 7:
                                    t = s.ops.pop(),
                                    s.trys.pop();
                                    continue;
                                default:
                                    if (!(i = 0 < (i = s.trys).length && i[i.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                        s = 0;
                                        continue
                                    }
                                    if (3 === t[0] && (!i || t[1] > i[0] && t[1] < i[3])) {
                                        s.label = t[1];
                                        break
                                    }
                                    if (6 === t[0] && s.label < i[1]) {
                                        s.label = i[1],
                                        i = t;
                                        break
                                    }
                                    if (i && s.label < i[2]) {
                                        s.label = i[2],
                                        s.ops.push(t);
                                        break
                                    }
                                    i[2] && s.ops.pop(),
                                    s.trys.pop();
                                    continue
                                }
                                t = r.call(n, s)
                            } catch (e) {
                                t = [6, e],
                                o = 0
                            } finally {
                                a = i = 0
                            }
                        if (5 & t[0])
                            throw t[1];
                        return {
                            value: t[0] ? t[1] : void 0,
                            done: !0
                        }
                    }([t, e])
                }
            }
        };
        function pi(u) {
            var c = function(h) {
                var e = this;
                return {
                    v2GamesUniverseIdMediaGet: function(o, i) {
                        return void 0 === i && (i = {}),
                        hi(e, void 0, Promise, function() {
                            var t, n, r, a;
                            return vi(this, function(e) {
                                return ai("v2GamesUniverseIdMediaGet", "universeId", o),
                                r = "/v2/games/{universeId}/media".replace("{universeId}", encodeURIComponent(String(o))),
                                t = new URL(r,li),
                                h && (a = h.baseOptions),
                                n = di(di({
                                    method: "GET"
                                }, a), i),
                                r = {},
                                oi(t, {}, i.query),
                                a = a && a.headers ? a.headers : {},
                                n.headers = di(di(di({}, r), a), i.headers),
                                [2, {
                                    url: ii(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v2GroupsGroupIdGamesGet: function(i, s, u, c, l, d) {
                        return void 0 === d && (d = {}),
                        hi(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return vi(this, function(e) {
                                return ai("v2GroupsGroupIdGamesGet", "groupId", i),
                                a = "/v2/groups/{groupId}/games".replace("{groupId}", encodeURIComponent(String(i))),
                                t = new URL(a,li),
                                h && (o = h.baseOptions),
                                n = di(di({
                                    method: "GET"
                                }, o), d),
                                r = {},
                                a = {},
                                void 0 !== s && (a.accessFilter = s),
                                void 0 !== u && (a.sortOrder = u),
                                void 0 !== c && (a.limit = c),
                                void 0 !== l && (a.cursor = l),
                                oi(t, a, d.query),
                                o = o && o.headers ? o.headers : {},
                                n.headers = di(di(di({}, r), o), d.headers),
                                [2, {
                                    url: ii(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v2GroupsGroupIdGamesV2Get: function(i, s, u, c, l, d) {
                        return void 0 === d && (d = {}),
                        hi(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return vi(this, function(e) {
                                return ai("v2GroupsGroupIdGamesV2Get", "groupId", i),
                                a = "/v2/groups/{groupId}/gamesV2".replace("{groupId}", encodeURIComponent(String(i))),
                                t = new URL(a,li),
                                h && (o = h.baseOptions),
                                n = di(di({
                                    method: "GET"
                                }, o), d),
                                r = {},
                                a = {},
                                void 0 !== s && (a.accessFilter = s),
                                void 0 !== u && (a.sortOrder = u),
                                void 0 !== c && (a.limit = c),
                                void 0 !== l && (a.cursor = l),
                                oi(t, a, d.query),
                                o = o && o.headers ? o.headers : {},
                                n.headers = di(di(di({}, r), o), d.headers),
                                [2, {
                                    url: ii(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v2UsersUserIdFavoriteGamesGet: function(i, s, u, c, l, d) {
                        return void 0 === d && (d = {}),
                        hi(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return vi(this, function(e) {
                                return ai("v2UsersUserIdFavoriteGamesGet", "userId", i),
                                a = "/v2/users/{userId}/favorite/games".replace("{userId}", encodeURIComponent(String(i))),
                                t = new URL(a,li),
                                h && (o = h.baseOptions),
                                n = di(di({
                                    method: "GET"
                                }, o), d),
                                r = {},
                                a = {},
                                void 0 !== s && (a.accessFilter = s),
                                void 0 !== u && (a.sortOrder = u),
                                void 0 !== c && (a.limit = c),
                                void 0 !== l && (a.cursor = l),
                                oi(t, a, d.query),
                                o = o && o.headers ? o.headers : {},
                                n.headers = di(di(di({}, r), o), d.headers),
                                [2, {
                                    url: ii(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v2UsersUserIdGamesGet: function(i, s, u, c, l, d) {
                        return void 0 === d && (d = {}),
                        hi(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return vi(this, function(e) {
                                return ai("v2UsersUserIdGamesGet", "userId", i),
                                a = "/v2/users/{userId}/games".replace("{userId}", encodeURIComponent(String(i))),
                                t = new URL(a,li),
                                h && (o = h.baseOptions),
                                n = di(di({
                                    method: "GET"
                                }, o), d),
                                r = {},
                                a = {},
                                void 0 !== s && (a.accessFilter = s),
                                void 0 !== u && (a.sortOrder = u),
                                void 0 !== c && (a.limit = c),
                                void 0 !== l && (a.cursor = l),
                                oi(t, a, d.query),
                                o = o && o.headers ? o.headers : {},
                                n.headers = di(di(di({}, r), o), d.headers),
                                [2, {
                                    url: ii(t),
                                    options: n
                                }]
                            })
                        })
                    }
                }
            }(u);
            return {
                v2GamesUniverseIdMediaGet: function(n, r) {
                    return hi(this, void 0, Promise, function() {
                        var t;
                        return vi(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, c.v2GamesUniverseIdMediaGet(n, r)];
                            case 1:
                                return t = e.sent(),
                                [2, si(t, y(), ti, u)]
                            }
                        })
                    })
                },
                v2GroupsGroupIdGamesGet: function(n, r, a, o, i, s) {
                    return hi(this, void 0, Promise, function() {
                        var t;
                        return vi(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, c.v2GroupsGroupIdGamesGet(n, r, a, o, i, s)];
                            case 1:
                                return t = e.sent(),
                                [2, si(t, y(), ti, u)]
                            }
                        })
                    })
                },
                v2GroupsGroupIdGamesV2Get: function(n, r, a, o, i, s) {
                    return hi(this, void 0, Promise, function() {
                        var t;
                        return vi(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, c.v2GroupsGroupIdGamesV2Get(n, r, a, o, i, s)];
                            case 1:
                                return t = e.sent(),
                                [2, si(t, y(), ti, u)]
                            }
                        })
                    })
                },
                v2UsersUserIdFavoriteGamesGet: function(n, r, a, o, i, s) {
                    return hi(this, void 0, Promise, function() {
                        var t;
                        return vi(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, c.v2UsersUserIdFavoriteGamesGet(n, r, a, o, i, s)];
                            case 1:
                                return t = e.sent(),
                                [2, si(t, y(), ti, u)]
                            }
                        })
                    })
                },
                v2UsersUserIdGamesGet: function(n, r, a, o, i, s) {
                    return hi(this, void 0, Promise, function() {
                        var t;
                        return vi(this, function(e) {
                            switch (e.label) {
                            case 0:
                                return [4, c.v2UsersUserIdGamesGet(n, r, a, o, i, s)];
                            case 1:
                                return t = e.sent(),
                                [2, si(t, y(), ti, u)]
                            }
                        })
                    })
                }
            }
        }
        (Go = {}).Asc = "Asc",
        Go.Desc = "Desc",
        (Go = {}).Forward = "Forward",
        Go.Backward = "Backward",
        (Go = {}).Asc = "Asc",
        Go.Desc = "Desc",
        (Go = {}).Forward = "Forward",
        Go.Backward = "Backward",
        (Go = {}).Image = "Image",
        Go.TShirt = "TShirt",
        Go.Audio = "Audio",
        Go.Mesh = "Mesh",
        Go.Lua = "Lua",
        Go.Html = "HTML",
        Go.Text = "Text",
        Go.Hat = "Hat",
        Go.Place = "Place",
        Go.Model = "Model",
        Go.Shirt = "Shirt",
        Go.Pants = "Pants",
        Go.Decal = "Decal",
        Go.Avatar = "Avatar",
        Go.Head = "Head",
        Go.Face = "Face",
        Go.Gear = "Gear",
        Go.Badge = "Badge",
        Go.GroupEmblem = "GroupEmblem",
        Go.Animation = "Animation",
        Go.Arms = "Arms",
        Go.Legs = "Legs",
        Go.Torso = "Torso",
        Go.RightArm = "RightArm",
        Go.LeftArm = "LeftArm",
        Go.LeftLeg = "LeftLeg",
        Go.RightLeg = "RightLeg",
        Go.Package = "Package",
        Go.YouTubeVideo = "YouTubeVideo",
        Go.GamePass = "GamePass",
        Go.App = "App",
        Go.Code = "Code",
        Go.Plugin = "Plugin",
        Go.SolidModel = "SolidModel",
        Go.MeshPart = "MeshPart",
        Go.HairAccessory = "HairAccessory",
        Go.FaceAccessory = "FaceAccessory",
        Go.NeckAccessory = "NeckAccessory",
        Go.ShoulderAccessory = "ShoulderAccessory",
        Go.FrontAccessory = "FrontAccessory",
        Go.BackAccessory = "BackAccessory",
        Go.WaistAccessory = "WaistAccessory",
        Go.ClimbAnimation = "ClimbAnimation",
        Go.DeathAnimation = "DeathAnimation",
        Go.FallAnimation = "FallAnimation",
        Go.IdleAnimation = "IdleAnimation",
        Go.JumpAnimation = "JumpAnimation",
        Go.RunAnimation = "RunAnimation",
        Go.SwimAnimation = "SwimAnimation",
        Go.WalkAnimation = "WalkAnimation",
        Go.PoseAnimation = "PoseAnimation",
        Go.LocalizationTableManifest = "LocalizationTableManifest",
        Go.LocalizationTableTranslation = "LocalizationTableTranslation",
        Go.EmoteAnimation = "EmoteAnimation",
        Go.Video = "Video",
        Go.TexturePack = "TexturePack",
        (Go = {}).User = "User",
        Go.Group = "Group";
        var fi, Co = (Co(mi, fi = Ro),
        mi.prototype.v2GamesUniverseIdMediaGet = function(e, t) {
            var n = this;
            return pi(this.configuration).v2GamesUniverseIdMediaGet(e, t).then(function(e) {
                return e(n.axios, n.basePath)
            })
        }
        ,
        mi.prototype.v2GroupsGroupIdGamesGet = function(e, t, n, r, a, o) {
            var i = this;
            return pi(this.configuration).v2GroupsGroupIdGamesGet(e, t, n, r, a, o).then(function(e) {
                return e(i.axios, i.basePath)
            })
        }
        ,
        mi.prototype.v2GroupsGroupIdGamesV2Get = function(e, t, n, r, a, o) {
            var i = this;
            return pi(this.configuration).v2GroupsGroupIdGamesV2Get(e, t, n, r, a, o).then(function(e) {
                return e(i.axios, i.basePath)
            })
        }
        ,
        mi.prototype.v2UsersUserIdFavoriteGamesGet = function(e, t, n, r, a, o) {
            var i = this;
            return pi(this.configuration).v2UsersUserIdFavoriteGamesGet(e, t, n, r, a, o).then(function(e) {
                return e(i.axios, i.basePath)
            })
        }
        ,
        mi.prototype.v2UsersUserIdGamesGet = function(e, t, n, r, a, o) {
            var i = this;
            return pi(this.configuration).v2UsersUserIdGamesGet(e, t, n, r, a, o).then(function(e) {
                return e(i.axios, i.basePath)
            })
        }
        ,
        mi);
        function mi() {
            return null !== fi && fi.apply(this, arguments) || this
        }
        var gi, Ii, yi = new Z, Pi = new Co, Gi = new xo, Ro = {
            getUniverseMedia: function(e) {
                return Pi.v2GamesUniverseIdMediaGet(e, {
                    withCredentials: !0
                })
            },
            getPlayabilityStatus: function(e) {
                return yi.v1GamesMultigetPlayabilityStatusGet(e, {
                    withCredentials: !0
                })
            },
            getPlaceDetails: function(e) {
                return yi.v1GamesMultigetPlaceDetailsGet(e, {
                    withCredentials: !0
                })
            },
            getProductInfo: function(e) {
                return yi.v1GamesGamesProductInfoGet(e, {
                    withCredentials: !0
                })
            },
            getGameDetails: function(e) {
                return yi.v1GamesGet(e, {
                    withCredentials: !0
                })
            },
            getGamePasses: function(e, t, n, r) {
                return Gi.v1GamesUniverseIdGamePassesGet(e, t, n, r)
            },
            getGamesSorts: function(e) {
                return yi.v1GamesSortsGet(e)
            },
            getGamesList: function(e, t, n, r, a, o, i, s, u, c, l, d, h, v, p, f) {
                return yi.v1GamesListGet(e, t, n, r, a, o, i, s, u, c, l, d, h, v, p, f)
            }
        }, Z = (gi = function(e, t) {
            return (gi = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            )(e, t)
        }
        ,
        function(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
            function n() {
                this.constructor = e
            }
            gi(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        ), bi = m.EnvironmentUrls.inventoryApi.replace(/\/+$/, ""), Co = function(e, t, n) {
            void 0 === t && (t = bi),
            void 0 === n && (n = N),
            this.basePath = t,
            this.axios = n,
            e && (this.configuration = e,
            this.basePath = e.basePath || this.basePath)
        }, wi = (Ii = Error,
        Z(Ci, Ii),
        Ci);
        function Ci(e, t) {
            t = Ii.call(this, t) || this;
            return t.field = e,
            t.name = "RequiredError",
            t
        }
        var Ti, xo = (Ti = function(e, t) {
            return (Ti = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            )(e, t)
        }
        ,
        function(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
            function n() {
                this.constructor = e
            }
            Ti(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        ), Ai = function() {
            return (Ai = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        };
        function Ei(u) {
            return {
                v2AssetsAssetIdOwnersGet: function(e, t, n, r, a) {
                    if (void 0 === a && (a = {}),
                    null == e)
                        throw new wi("assetId","Required parameter assetId was null or undefined when calling v2AssetsAssetIdOwnersGet.");
                    var o = "/v2/assets/{assetId}/owners".replace("{assetId}", encodeURIComponent(String(e)))
                      , e = wt.qg(o, !0);
                    u && (i = u.baseOptions);
                    var o = Ai(Ai({
                        method: "GET"
                    }, i), a)
                      , i = {};
                    return void 0 !== t && (i.sortOrder = t),
                    void 0 !== n && (i.limit = n),
                    void 0 !== r && (i.cursor = r),
                    e.query = Ai(Ai(Ai({}, e.query), i), a.query),
                    delete e.search,
                    o.headers = Ai(Ai({}, {}), a.headers),
                    {
                        url: wt.GP(e),
                        options: o
                    }
                },
                v2RecommendationsAssetTypeIdGet: function(e, t, n, r, a, o) {
                    if (void 0 === o && (o = {}),
                    null == e)
                        throw new wi("assetTypeId","Required parameter assetTypeId was null or undefined when calling v2RecommendationsAssetTypeIdGet.");
                    var i = "/v2/recommendations/{assetTypeId}".replace("{assetTypeId}", encodeURIComponent(String(e)))
                      , e = wt.qg(i, !0);
                    u && (s = u.baseOptions);
                    var i = Ai(Ai({
                        method: "GET"
                    }, s), o)
                      , s = {};
                    return void 0 !== t && (s.numItems = t),
                    void 0 !== n && (s.contextAssetId = n),
                    void 0 !== r && (s.thumbWidth = r),
                    void 0 !== a && (s.thumbHeight = a),
                    e.query = Ai(Ai(Ai({}, e.query), s), o.query),
                    delete e.search,
                    i.headers = Ai(Ai({}, {}), o.headers),
                    {
                        url: wt.GP(e),
                        options: i
                    }
                }
            }
        }
        function Si(s) {
            return {
                v2AssetsAssetIdOwnersGet: function(e, t, n, r, a) {
                    var o = Ei(s).v2AssetsAssetIdOwnersGet(e, t, n, r, a);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = bi);
                        t = Ai(Ai({}, o.options), {
                            url: t + o.url
                        });
                        return e.request(t)
                    }
                },
                v2RecommendationsAssetTypeIdGet: function(e, t, n, r, a, o) {
                    var i = Ei(s).v2RecommendationsAssetTypeIdGet(e, t, n, r, a, o);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = bi);
                        t = Ai(Ai({}, i.options), {
                            url: t + i.url
                        });
                        return e.request(t)
                    }
                }
            }
        }
        (Z = {}).Asc = "Asc",
        Z.Desc = "Desc",
        (Z = {}).Forward = "Forward",
        Z.Backward = "Backward",
        (Z = {}).User = "User",
        Z.Group = "Group",
        (Z = {}).None = "None",
        Z.BC = "BC",
        Z.TBC = "TBC",
        Z.OBC = "OBC",
        Z.RobloxPremium = "RobloxPremium";
        var Ri, Li, Z = (xo(qi, Ri = Co),
        qi.prototype.v2AssetsAssetIdOwnersGet = function(e, t, n, r, a) {
            return Si(this.configuration).v2AssetsAssetIdOwnersGet(e, t, n, r, a)(this.axios, this.basePath)
        }
        ,
        qi.prototype.v2RecommendationsAssetTypeIdGet = function(e, t, n, r, a, o) {
            return Si(this.configuration).v2RecommendationsAssetTypeIdGet(e, t, n, r, a, o)(this.axios, this.basePath)
        }
        ,
        qi);
        function qi() {
            return null !== Ri && Ri.apply(this, arguments) || this
        }
        function Ui(u) {
            return {
                v2UsersUserIdInventoryAssetTypeIdGet: function(e, t, n, r, a, o) {
                    var s, i = (s = u,
                    function(e, t, n, r, a, o) {
                        if (void 0 === o && (o = {}),
                        null == e)
                            throw new wi("userId","Required parameter userId was null or undefined when calling v2UsersUserIdInventoryAssetTypeIdGet.");
                        if (null == t)
                            throw new wi("assetTypeId","Required parameter assetTypeId was null or undefined when calling v2UsersUserIdInventoryAssetTypeIdGet.");
                        e = "/v2/users/{userId}/inventory/{assetTypeId}".replace("{userId}", encodeURIComponent(String(e))).replace("{assetTypeId}", encodeURIComponent(String(t))),
                        t = wt.qg(e, !0);
                        s && (i = s.baseOptions);
                        var e = Ai(Ai({
                            method: "GET"
                        }, i), o)
                          , i = {};
                        return void 0 !== n && (i.sortOrder = n),
                        void 0 !== r && (i.limit = r),
                        void 0 !== a && (i.cursor = a),
                        t.query = Ai(Ai(Ai({}, t.query), i), o.query),
                        delete t.search,
                        e.headers = Ai(Ai({}, {}), o.headers),
                        {
                            url: wt.GP(t),
                            options: e
                        }
                    }(e, t, n, r, a, o));
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = bi);
                        t = Ai(Ai({}, i.options), {
                            url: t + i.url
                        });
                        return e.request(t)
                    }
                }
            }
        }
        function Oi() {
            return null !== Li && Li.apply(this, arguments) || this
        }
        xo(Oi, Li = Co),
        Oi.prototype.v2UsersUserIdInventoryAssetTypeIdGet = function(e, t, n, r, a, o) {
            return Ui(this.configuration).v2UsersUserIdInventoryAssetTypeIdGet(e, t, n, r, a, o)(this.axios, this.basePath)
        }
        ;
        var Di, _i, xi = new Z, xo = {
            getRecommendations: function(e, t, n) {
                return xi.v2RecommendationsAssetTypeIdGet(e, t, n)
            }
        }, Bi = {
            getUserKey: function(e) {
                return "user_" + e
            },
            storage: function() {
                return m.LocalStorage ? m.LocalStorage.isAvailable() : localStorage
            },
            getLength: function() {
                return this.storage() ? localStorage.length : 0
            },
            getKey: function(e) {
                return this.storage() ? localStorage.key(e) : ""
            },
            setLocalStorage: function(e, t) {
                this.storage() && localStorage.setItem(e, JSON.stringify(t))
            },
            getLocalStorage: function(e) {
                if (this.storage())
                    return JSON.parse(localStorage.getItem(e))
            },
            listenLocalStorage: function(e) {
                this.storage() && void 0 !== e && (window.addEventListener ? window.addEventListener("storage", e, !1) : window.attachEvent("onstorage", e))
            },
            removeLocalStorage: function(e) {
                this.storage() && localStorage.removeItem(e)
            },
            saveDataByTimeStamp: function(e, t) {
                var n = (new Date).getTime()
                  , r = this.getLocalStorage(e);
                (r = r || {}).data = t,
                r.timeStamp = n,
                this.setLocalStorage(e, r)
            },
            fetchNonExpiredCachedData: function(e, t) {
                var n = (new Date).getTime()
                  , r = this.getLocalStorage(e);
                if (r && r.timeStamp) {
                    if (n - r.timeStamp < (t = t || 3e4))
                        return r;
                    this.removeLocalStorage(e)
                }
                return null
            }
        }, Co = (Di = function(e, t) {
            return (Di = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            )(e, t)
        }
        ,
        function(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
            function n() {
                this.constructor = e
            }
            Di(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        ), Ni = m.EnvironmentUrls.localeApi.replace(/\/+$/, ""), Z = function(e, t, n) {
            void 0 === t && (t = Ni),
            void 0 === n && (n = N),
            this.basePath = t,
            this.axios = n,
            e && (this.configuration = e,
            this.basePath = e.basePath || this.basePath)
        }, Fi = (_i = Error,
        Co(ki, _i),
        ki);
        function ki(e, t) {
            t = _i.call(this, t) || this;
            return t.field = e,
            t.name = "RequiredError",
            t
        }
        function Mi(o) {
            return {
                v1CountryRegionsGet: function(e) {
                    void 0 === e && (e = {});
                    var t = wt.qg("/v1/country-regions", !0);
                    o && (n = o.baseOptions);
                    var n = Ki(Ki({
                        method: "GET"
                    }, n), e);
                    return t.query = Ki(Ki(Ki({}, t.query), {}), e.query),
                    delete t.search,
                    n.headers = Ki(Ki({}, {}), e.headers),
                    {
                        url: wt.GP(t),
                        options: n
                    }
                },
                v1CountryRegionsUserCountryRegionGet: function(e) {
                    void 0 === e && (e = {});
                    var t = wt.qg("/v1/country-regions/user-country-region", !0);
                    o && (n = o.baseOptions);
                    var n = Ki(Ki({
                        method: "GET"
                    }, n), e);
                    return t.query = Ki(Ki(Ki({}, t.query), {}), e.query),
                    delete t.search,
                    n.headers = Ki(Ki({}, {}), e.headers),
                    {
                        url: wt.GP(t),
                        options: n
                    }
                },
                v1CountryRegionsUserCountryRegionPatch: function(e, t) {
                    if (void 0 === t && (t = {}),
                    null == e)
                        throw new Fi("userRequest","Required parameter userRequest was null or undefined when calling v1CountryRegionsUserCountryRegionPatch.");
                    var n = wt.qg("/v1/country-regions/user-country-region", !0);
                    o && (a = o.baseOptions);
                    var r = Ki(Ki({
                        method: "PATCH"
                    }, a), t)
                      , a = {};
                    a["Content-Type"] = "application/json",
                    n.query = Ki(Ki(Ki({}, n.query), {}), t.query),
                    delete n.search,
                    r.headers = Ki(Ki({}, a), t.headers);
                    return r.data = JSON.stringify(void 0 !== e ? e : {}),
                    {
                        url: wt.GP(n),
                        options: r
                    }
                }
            }
        }
        function ji(r) {
            return {
                v1CountryRegionsGet: function(e) {
                    var n = Mi(r).v1CountryRegionsGet(e);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = Ni);
                        t = Ki(Ki({}, n.options), {
                            url: t + n.url
                        });
                        return e.request(t)
                    }
                },
                v1CountryRegionsUserCountryRegionGet: function(e) {
                    var n = Mi(r).v1CountryRegionsUserCountryRegionGet(e);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = Ni);
                        t = Ki(Ki({}, n.options), {
                            url: t + n.url
                        });
                        return e.request(t)
                    }
                },
                v1CountryRegionsUserCountryRegionPatch: function(e, t) {
                    var n = Mi(r).v1CountryRegionsUserCountryRegionPatch(e, t);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = Ni);
                        t = Ki(Ki({}, n.options), {
                            url: t + n.url
                        });
                        return e.request(t)
                    }
                }
            }
        }
        var zi, Vi, Hi, Wi, Co = (zi = function(e, t) {
            return (zi = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            )(e, t)
        }
        ,
        function(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
            function n() {
                this.constructor = e
            }
            zi(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        ), Ki = function() {
            return (Ki = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        };
        function Xi() {
            return null !== Vi && Vi.apply(this, arguments) || this
        }
        function Ji(r) {
            return {
                v1LanguagesGet: function(e) {
                    void 0 === e && (e = {});
                    var t = wt.qg("/v1/languages", !0);
                    r && (n = r.baseOptions);
                    var n = Ki(Ki({
                        method: "GET"
                    }, n), e);
                    return t.query = Ki(Ki(Ki({}, t.query), {}), e.query),
                    delete t.search,
                    n.headers = Ki(Ki({}, {}), e.headers),
                    {
                        url: wt.GP(t),
                        options: n
                    }
                },
                v1LanguagesUserGeneratedContentGet: function(e) {
                    void 0 === e && (e = {});
                    var t = wt.qg("/v1/languages/user-generated-content", !0);
                    r && (n = r.baseOptions);
                    var n = Ki(Ki({
                        method: "GET"
                    }, n), e);
                    return t.query = Ki(Ki(Ki({}, t.query), {}), e.query),
                    delete t.search,
                    n.headers = Ki(Ki({}, {}), e.headers),
                    {
                        url: wt.GP(t),
                        options: n
                    }
                }
            }
        }
        function Qi(t) {
            return {
                v1LanguagesGet: function(e) {
                    var n = Ji(t).v1LanguagesGet(e);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = Ni);
                        t = Ki(Ki({}, n.options), {
                            url: t + n.url
                        });
                        return e.request(t)
                    }
                },
                v1LanguagesUserGeneratedContentGet: function(e) {
                    var n = Ji(t).v1LanguagesUserGeneratedContentGet(e);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = Ni);
                        t = Ki(Ki({}, n.options), {
                            url: t + n.url
                        });
                        return e.request(t)
                    }
                }
            }
        }
        function Yi() {
            return null !== Hi && Hi.apply(this, arguments) || this
        }
        function $i(o) {
            return {
                v1LocalesGet: function(e) {
                    void 0 === e && (e = {});
                    var t = wt.qg("/v1/locales", !0);
                    o && (n = o.baseOptions);
                    var n = Ki(Ki({
                        method: "GET"
                    }, n), e);
                    return t.query = Ki(Ki(Ki({}, t.query), {}), e.query),
                    delete t.search,
                    n.headers = Ki(Ki({}, {}), e.headers),
                    {
                        url: wt.GP(t),
                        options: n
                    }
                },
                v1LocalesSetUserSupportedLocalePost: function(e, t) {
                    if (void 0 === t && (t = {}),
                    null == e)
                        throw new Fi("userRequest","Required parameter userRequest was null or undefined when calling v1LocalesSetUserSupportedLocalePost.");
                    var n = wt.qg("/v1/locales/set-user-supported-locale", !0);
                    o && (a = o.baseOptions);
                    var r = Ki(Ki({
                        method: "POST"
                    }, a), t)
                      , a = {};
                    a["Content-Type"] = "application/json",
                    n.query = Ki(Ki(Ki({}, n.query), {}), t.query),
                    delete n.search,
                    r.headers = Ki(Ki({}, a), t.headers);
                    return r.data = JSON.stringify(void 0 !== e ? e : {}),
                    {
                        url: wt.GP(n),
                        options: r
                    }
                },
                v1LocalesSupportedLocalesGet: function(e) {
                    void 0 === e && (e = {});
                    var t = wt.qg("/v1/locales/supported-locales", !0);
                    o && (n = o.baseOptions);
                    var n = Ki(Ki({
                        method: "GET"
                    }, n), e);
                    return t.query = Ki(Ki(Ki({}, t.query), {}), e.query),
                    delete t.search,
                    n.headers = Ki(Ki({}, {}), e.headers),
                    {
                        url: wt.GP(t),
                        options: n
                    }
                },
                v1LocalesUserLocaleGet: function(e) {
                    void 0 === e && (e = {});
                    var t = wt.qg("/v1/locales/user-locale", !0);
                    o && (n = o.baseOptions);
                    var n = Ki(Ki({
                        method: "GET"
                    }, n), e);
                    return t.query = Ki(Ki(Ki({}, t.query), {}), e.query),
                    delete t.search,
                    n.headers = Ki(Ki({}, {}), e.headers),
                    {
                        url: wt.GP(t),
                        options: n
                    }
                },
                v1LocalesUserLocalizationLocusSupportedLocalesGet: function(e) {
                    void 0 === e && (e = {});
                    var t = wt.qg("/v1/locales/user-localization-locus-supported-locales", !0);
                    o && (n = o.baseOptions);
                    var n = Ki(Ki({
                        method: "GET"
                    }, n), e);
                    return t.query = Ki(Ki(Ki({}, t.query), {}), e.query),
                    delete t.search,
                    n.headers = Ki(Ki({}, {}), e.headers),
                    {
                        url: wt.GP(t),
                        options: n
                    }
                }
            }
        }
        function Zi(r) {
            return {
                v1LocalesGet: function(e) {
                    var n = $i(r).v1LocalesGet(e);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = Ni);
                        t = Ki(Ki({}, n.options), {
                            url: t + n.url
                        });
                        return e.request(t)
                    }
                },
                v1LocalesSetUserSupportedLocalePost: function(e, t) {
                    var n = $i(r).v1LocalesSetUserSupportedLocalePost(e, t);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = Ni);
                        t = Ki(Ki({}, n.options), {
                            url: t + n.url
                        });
                        return e.request(t)
                    }
                },
                v1LocalesSupportedLocalesGet: function(e) {
                    var n = $i(r).v1LocalesSupportedLocalesGet(e);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = Ni);
                        t = Ki(Ki({}, n.options), {
                            url: t + n.url
                        });
                        return e.request(t)
                    }
                },
                v1LocalesUserLocaleGet: function(e) {
                    var n = $i(r).v1LocalesUserLocaleGet(e);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = Ni);
                        t = Ki(Ki({}, n.options), {
                            url: t + n.url
                        });
                        return e.request(t)
                    }
                },
                v1LocalesUserLocalizationLocusSupportedLocalesGet: function(e) {
                    var n = $i(r).v1LocalesUserLocalizationLocusSupportedLocalesGet(e);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = Ni);
                        t = Ki(Ki({}, n.options), {
                            url: t + n.url
                        });
                        return e.request(t)
                    }
                }
            }
        }
        function es() {
            return null !== Wi && Wi.apply(this, arguments) || this
        }
        Co(Xi, Vi = Z),
        Xi.prototype.v1CountryRegionsGet = function(e) {
            return ji(this.configuration).v1CountryRegionsGet(e)(this.axios, this.basePath)
        }
        ,
        Xi.prototype.v1CountryRegionsUserCountryRegionGet = function(e) {
            return ji(this.configuration).v1CountryRegionsUserCountryRegionGet(e)(this.axios, this.basePath)
        }
        ,
        Xi.prototype.v1CountryRegionsUserCountryRegionPatch = function(e, t) {
            return ji(this.configuration).v1CountryRegionsUserCountryRegionPatch(e, t)(this.axios, this.basePath)
        }
        ,
        Co(Yi, Hi = Z),
        Yi.prototype.v1LanguagesGet = function(e) {
            return Qi(this.configuration).v1LanguagesGet(e)(this.axios, this.basePath)
        }
        ,
        Yi.prototype.v1LanguagesUserGeneratedContentGet = function(e) {
            return Qi(this.configuration).v1LanguagesUserGeneratedContentGet(e)(this.axios, this.basePath)
        }
        ;
        var ts, ns = new (Co(es, Wi = Z),
        es.prototype.v1LocalesGet = function(e) {
            return Zi(this.configuration).v1LocalesGet(e)(this.axios, this.basePath)
        }
        ,
        es.prototype.v1LocalesSetUserSupportedLocalePost = function(e, t) {
            return Zi(this.configuration).v1LocalesSetUserSupportedLocalePost(e, t)(this.axios, this.basePath)
        }
        ,
        es.prototype.v1LocalesSupportedLocalesGet = function(e) {
            return Zi(this.configuration).v1LocalesSupportedLocalesGet(e)(this.axios, this.basePath)
        }
        ,
        es.prototype.v1LocalesUserLocaleGet = function(e) {
            return Zi(this.configuration).v1LocalesUserLocaleGet(e)(this.axios, this.basePath)
        }
        ,
        es.prototype.v1LocalesUserLocalizationLocusSupportedLocalesGet = function(e) {
            return Zi(this.configuration).v1LocalesUserLocalizationLocusSupportedLocalesGet(e)(this.axios, this.basePath)
        }
        ,
        es);
        function rs() {
            return ns.v1LocalesGet({
                withCredentials: !0
            })
        }
        (ts = ts || {}).getLocales = "Roblox.Api.Locales.getLocales";
        var as, Z = {
            getLocales: rs,
            getUserLocale: function() {
                return ns.v1LocalesUserLocalizationLocusSupportedLocalesGet({
                    withCredentials: !0
                })
            },
            setUserLocale: function(e) {
                e = {
                    supportedLocaleCode: e
                };
                return ns.v1LocalesSetUserSupportedLocalePost(e, {
                    withCredentials: !0
                })
            },
            getLocalesWithCache: function(e) {
                return r = rs,
                a = ts.getLocales,
                o = e,
                new Promise(function(t, n) {
                    var e = Bi.fetchNonExpiredCachedData(a, o);
                    e ? t(e.data) : r().then(function(e) {
                        Bi.saveDataByTimeStamp(a, e.data),
                        t(e.data)
                    }, function(e) {
                        return n(e)
                    })
                }
                );
                var r, a, o
            }
        }, os = new re, is = new S, ss = new J, us = new ae, cs = new fe, ls = new z, ds = new ie, hs = new pe, ae = {
            getAssets: function(e, t, n, r, a) {
                return os.v1AssetsGet(e, t, n, r, a, {
                    withCredentials: !0
                })
            },
            getAvatars: function(e, t, n, r) {
                return ss.v1UsersAvatarGet(e, t, n, r, {
                    withCredentials: !0
                })
            },
            getAvatarHeadshots: function(e, t, n, r) {
                return ss.v1UsersAvatarHeadshotGet(e, t, n, r, {
                    withCredentials: !0
                })
            },
            getGroupIcons: function(e, t, n, r) {
                return us.v1GroupsIconsGet(e, t, n, r, {
                    withCredentials: !0
                })
            },
            getBadgeIcons: function(e, t, n, r) {
                return cs.v1BadgesIconsGet(e, t, n, r, {
                    withCredentials: !0
                })
            },
            getDeveloperProductIcons: function(e, t, n, r) {
                return ls.v1DeveloperProductsIconsGet(e, t, n, r, {
                    withCredentials: !0
                })
            },
            getBundles: function(e, t, n, r) {
                return is.v1BundlesThumbnailsGet(e, t, n, r, {
                    withCredentials: !0
                })
            },
            getUserOutfits: function(e, t, n, r) {
                return ds.v1UsersOutfitsGet(e, t, n, r, {
                    withCredentials: !0
                })
            },
            getBatchThumbnails: function(e) {
                return hs.v1BatchPost(e, {
                    withCredentials: !0
                })
            }
        }, vs = new f;
        (fe = as = as || {}).Language = "Language",
        fe.Locale = "Locale";
        var ps, fs, z = {
            getTranslationProgress: function(e, t) {
                return vs.v1GameLocalizationStatusTranslationCountsForLanguageOrLocaleGet(e, t, as.Language, {
                    withCredentials: !0
                })
            }
        }, ie = (ps = function(e, t) {
            return (ps = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            )(e, t)
        }
        ,
        function(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
            function n() {
                this.constructor = e
            }
            ps(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        ), ms = m.EnvironmentUrls.translationRolesApi.replace(/\/+$/, ""), pe = function(e, t, n) {
            void 0 === t && (t = ms),
            void 0 === n && (n = N),
            this.basePath = t,
            this.axios = n,
            e && (this.configuration = e,
            this.basePath = e.basePath || this.basePath)
        }, gs = (fs = Error,
        ie(Is, fs),
        Is);
        function Is(e, t) {
            t = fs.call(this, t) || this;
            return t.field = e,
            t.name = "RequiredError",
            t
        }
        var ys, Ps, f = (ys = function(e, t) {
            return (ys = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            )(e, t)
        }
        ,
        function(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
            function n() {
                this.constructor = e
            }
            ys(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        ), Gs = function() {
            return (Gs = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        };
        function bs(s) {
            return {
                v1GameLocalizationRolesGamesGameIdCurrentUserRolesGet: function(e, t) {
                    if (void 0 === t && (t = {}),
                    null == e)
                        throw new gs("gameId","Required parameter gameId was null or undefined when calling v1GameLocalizationRolesGamesGameIdCurrentUserRolesGet.");
                    e = "/v1/game-localization-roles/games/{gameId}/current-user/roles".replace("{gameId}", encodeURIComponent(String(e))),
                    e = wt.qg(e, !0);
                    s && (n = s.baseOptions);
                    var n = Gs(Gs({
                        method: "GET"
                    }, n), t);
                    return e.query = Gs(Gs(Gs({}, e.query), {}), t.query),
                    delete e.search,
                    n.headers = Gs(Gs({}, {}), t.headers),
                    {
                        url: wt.GP(e),
                        options: n
                    }
                },
                v1GameLocalizationRolesGamesGameIdPatch: function(e, t, n) {
                    if (void 0 === n && (n = {}),
                    null == e)
                        throw new gs("gameId","Required parameter gameId was null or undefined when calling v1GameLocalizationRolesGamesGameIdPatch.");
                    if (null == t)
                        throw new gs("request","Required parameter request was null or undefined when calling v1GameLocalizationRolesGamesGameIdPatch.");
                    var r = "/v1/game-localization-roles/games/{gameId}".replace("{gameId}", encodeURIComponent(String(e)))
                      , e = wt.qg(r, !0);
                    s && (a = s.baseOptions);
                    var r = Gs(Gs({
                        method: "PATCH"
                    }, a), n)
                      , a = {};
                    a["Content-Type"] = "application/json",
                    e.query = Gs(Gs(Gs({}, e.query), {}), n.query),
                    delete e.search,
                    r.headers = Gs(Gs({}, a), n.headers);
                    return r.data = JSON.stringify(void 0 !== t ? t : {}),
                    {
                        url: wt.GP(e),
                        options: r
                    }
                },
                v1GameLocalizationRolesGamesGameIdRolesRoleAssigneesGet: function(e, t, n) {
                    if (void 0 === n && (n = {}),
                    null == e)
                        throw new gs("gameId","Required parameter gameId was null or undefined when calling v1GameLocalizationRolesGamesGameIdRolesRoleAssigneesGet.");
                    if (null == t)
                        throw new gs("role","Required parameter role was null or undefined when calling v1GameLocalizationRolesGamesGameIdRolesRoleAssigneesGet.");
                    t = "/v1/game-localization-roles/games/{gameId}/roles/{role}/assignees".replace("{gameId}", encodeURIComponent(String(e))).replace("{role}", encodeURIComponent(String(t))),
                    t = wt.qg(t, !0);
                    s && (r = s.baseOptions);
                    var r = Gs(Gs({
                        method: "GET"
                    }, r), n);
                    return t.query = Gs(Gs(Gs({}, t.query), {}), n.query),
                    delete t.search,
                    r.headers = Gs(Gs({}, {}), n.headers),
                    {
                        url: wt.GP(t),
                        options: r
                    }
                },
                v1GameLocalizationRolesRolesRoleCurrentUserGet: function(e, t, n, r, a) {
                    if (void 0 === a && (a = {}),
                    null == e)
                        throw new gs("role","Required parameter role was null or undefined when calling v1GameLocalizationRolesRolesRoleCurrentUserGet.");
                    var o = "/v1/game-localization-roles/roles/{role}/current-user".replace("{role}", encodeURIComponent(String(e)))
                      , e = wt.qg(o, !0);
                    s && (i = s.baseOptions);
                    var o = Gs(Gs({
                        method: "GET"
                    }, i), a)
                      , i = {};
                    return void 0 !== t && (i.exclusiveStartKey = t),
                    void 0 !== n && (i.pageSize = n),
                    void 0 !== r && 0 < r && (i.groupId = r),
                    e.query = Gs(Gs(Gs({}, e.query), i), a.query),
                    delete e.search,
                    o.headers = Gs(Gs({}, {}), a.headers),
                    {
                        url: wt.GP(e),
                        options: o
                    }
                }
            }
        }
        function ws(i) {
            return {
                v1GameLocalizationRolesGamesGameIdCurrentUserRolesGet: function(e, t) {
                    var n = bs(i).v1GameLocalizationRolesGamesGameIdCurrentUserRolesGet(e, t);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = ms);
                        t = Gs(Gs({}, n.options), {
                            url: t + n.url
                        });
                        return e.request(t)
                    }
                },
                v1GameLocalizationRolesGamesGameIdPatch: function(e, t, n) {
                    var r = bs(i).v1GameLocalizationRolesGamesGameIdPatch(e, t, n);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = ms);
                        t = Gs(Gs({}, r.options), {
                            url: t + r.url
                        });
                        return e.request(t)
                    }
                },
                v1GameLocalizationRolesGamesGameIdRolesRoleAssigneesGet: function(e, t, n) {
                    var r = bs(i).v1GameLocalizationRolesGamesGameIdRolesRoleAssigneesGet(e, t, n);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = ms);
                        t = Gs(Gs({}, r.options), {
                            url: t + r.url
                        });
                        return e.request(t)
                    }
                },
                v1GameLocalizationRolesRolesRoleCurrentUserGet: function(e, t, n, r, a) {
                    var o = bs(i).v1GameLocalizationRolesRolesRoleCurrentUserGet(e, t, n, r, a);
                    return function(e, t) {
                        void 0 === e && (e = N),
                        void 0 === t && (t = ms);
                        t = Gs(Gs({}, o.options), {
                            url: t + o.url
                        });
                        return e.request(t)
                    }
                }
            }
        }
        function Cs() {
            return null !== Ps && Ps.apply(this, arguments) || this
        }
        (fe = {}).User = "user",
        fe.Group = "group",
        fe.GroupRole = "groupRole",
        (ie = {}).User = "user",
        ie.Group = "group",
        ie.GroupRole = "groupRole",
        (fe = {}).User = "user",
        fe.Group = "group",
        fe.GroupRole = "groupRole";
        var Ts, As = new (f(Cs, Ps = pe),
        Cs.prototype.v1GameLocalizationRolesGamesGameIdCurrentUserRolesGet = function(e, t) {
            return ws(this.configuration).v1GameLocalizationRolesGamesGameIdCurrentUserRolesGet(e, t)(this.axios, this.basePath)
        }
        ,
        Cs.prototype.v1GameLocalizationRolesGamesGameIdPatch = function(e, t, n) {
            return ws(this.configuration).v1GameLocalizationRolesGamesGameIdPatch(e, t, n)(this.axios, this.basePath)
        }
        ,
        Cs.prototype.v1GameLocalizationRolesGamesGameIdRolesRoleAssigneesGet = function(e, t, n) {
            return ws(this.configuration).v1GameLocalizationRolesGamesGameIdRolesRoleAssigneesGet(e, t, n)(this.axios, this.basePath)
        }
        ,
        Cs.prototype.v1GameLocalizationRolesRolesRoleCurrentUserGet = function(e, t, n, r, a) {
            return ws(this.configuration).v1GameLocalizationRolesRolesRoleCurrentUserGet(e, t, n, r, a)(this.axios, this.basePath)
        }
        ,
        Cs);
        (Ts = Ts || {}).Translator = "translator";
        var Es, ie = {
            getGamesListForTranslator: function(e, t, n) {
                return As.v1GameLocalizationRolesRolesRoleCurrentUserGet(Ts.Translator, t, e, n, {
                    withCredentials: !0
                })
            }
        }, Ss = {
            useCache: !1,
            expirationWindowMS: 3e4
        };
        function Rs(t, n) {
            return function(e) {
                e = Math.pow(2, e - 1) * t;
                return Math.min(n, e)
            }
        }
        function Ls(e, t) {
            this.store = new Map,
            this.useCache = e || !1,
            this.expirationWindowMS = t || 3e4,
            this.storeKeyPrefix = "CacheStore:BatchRequestProcessor::"
        }
        (fe = Es = Es || {}).processFailure = "processFailure",
        fe.unretriableFailure = "unretriableFailure",
        fe.maxAttemptsReached = "maxAttemptsReached";
        var qs = (Ls.prototype.getCacheKey = function(e) {
            return "" + this.storeKeyPrefix + e
        }
        ,
        Ls.prototype.has = function(e, t) {
            var n = t.useCache
              , t = t.expirationWindowMS
              , e = this.getCacheKey(e);
            return (n || this.useCache) && localStorage ? !!Bi.fetchNonExpiredCachedData(e, t || this.expirationWindowMS) : this.store.has(e)
        }
        ,
        Ls.prototype.set = function(e, t, n) {
            n = n.useCache,
            e = this.getCacheKey(e);
            (n || this.useCache) && localStorage && Bi.saveDataByTimeStamp(e, t),
            this.store.set(e, t)
        }
        ,
        Ls.prototype.get = function(e, t) {
            var n, r = t.useCache, t = t.expirationWindowMS, e = this.getCacheKey(e);
            return (r || this.useCache) && localStorage ? null == (n = Bi.fetchNonExpiredCachedData(e, t || this.expirationWindowMS)) ? void 0 : n.data : (n && this.store.set(e, null == n ? void 0 : n.data),
            this.store.get(e))
        }
        ,
        Ls.prototype.delete = function(e) {
            e = this.getCacheKey(e);
            localStorage && Bi.removeLocalStorage(e),
            this.store.delete(e)
        }
        ,
        Ls.prototype.clear = function() {
            if (this.store.clear(),
            localStorage) {
                for (var e = [], t = 0; t < localStorage.length; t++) {
                    var n = localStorage.key(t);
                    n.includes(this.storeKeyPrefix) && e.push(n)
                }
                for (var r = 0; r < e.length; r++)
                    localStorage.removeItem(e[r])
            }
        }
        ,
        Ls)
          , Us = function() {
            return (Us = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        };
        function Os(e, t, n) {
            this.requestQueue = [],
            this.concurrentRequestCount = 1,
            this.isQueueActive = !1,
            this.debug = !1;
            var r = n.cacheProperties
              , a = n.processBatchWaitTime
              , o = n.batchSize
              , i = n.maxRetryAttempts
              , s = n.getItemExpiration
              , u = n.getFailureCooldown
              , c = n.debugMode
              , l = n.concurrentRequestCount
              , d = r.useCache
              , n = r.expirationWindowMS;
            this.cacheProperties = r,
            this.completeItems = new qs(d,n),
            this.processBatchWaitTime = a,
            this.batchSize = o,
            this.maxRetryAttempts = i,
            this.getItemExpiration = s,
            this.getFailureCooldown = u,
            this.itemsProcessor = e,
            this.itemsSerializer = t,
            this.debug = c || !1,
            this.processorId = Date.now(),
            this.concurrentRequestCount = l
        }
        var Ds = (Os.prototype.handleBatchResult = function(e, n) {
            var r = this
              , a = 0
              , o = (new Date).getTime();
            e.forEach(function(e) {
                var t;
                r.completeItems.has(e.key, e.cacheProperties) ? (t = (new Date).getTime(),
                e.resolve(Us(Us({}, r.completeItems.get(e.key, e.cacheProperties)), {
                    performance: {
                        duration: t - e.startTime.getTime(),
                        retryAttempts: e.retryAttempts
                    }
                }))) : r.maxRetryAttempts && n !== Es.unretriableFailure ? (t = r.getFailureCooldown ? r.getFailureCooldown(e.retryAttempts) : 1e3,
                a = 0 < a ? Math.min(a, t) : t,
                ++e.retryAttempts <= r.maxRetryAttempts ? (e.queueAfter = o + t,
                r.requestQueue.unshift(e)) : e.reject(Es.maxAttemptsReached)) : (console.debug(n, e),
                e.reject(n))
            }),
            this.processEndTime = Date.now(),
            this.debug && console.debug(this.processorId + ": process queue ended", {
                duration: this.processEndTime - this.processStartTime,
                requestQueue: this.requestQueue,
                minimumCooldown: a,
                processBatchWaitTime: this.processBatchWaitTime
            }),
            0 < a && setTimeout(function() {
                return r.processQueue()
            }, a + this.processBatchWaitTime),
            this.concurrentRequestCount += 1,
            this.processQueue()
        }
        ,
        Os.prototype.processQueue = function() {
            var e, r = this;
            if (0 !== this.concurrentRequestCount && !this.isQueueActive) {
                this.processStartTime = Date.now();
                var t = []
                  , a = new Map
                  , n = []
                  , o = (new Date).getTime();
                for (this.isQueueActive = !0; t.length < this.batchSize && 0 < this.requestQueue.length; ) {
                    var i, s = this.requestQueue.shift();
                    s.queueAfter > o ? (a.set(s.key, s),
                    n.push(s)) : this.completeItems.has(s.key, s.cacheProperties) ? (i = (new Date).getTime(),
                    s.resolve(Us(Us({}, this.completeItems.get(s.key, s.cacheProperties)), {
                        performance: {
                            duration: i - s.startTime.getTime()
                        }
                    }))) : a.has(s.key) ? n.push(s) : (a.set(s.key, s),
                    t.push(s))
                }
                (e = this.requestQueue).push.apply(e, n),
                this.isQueueActive = !1,
                t.length <= 0 || (--this.concurrentRequestCount,
                this.processQueue(),
                this.debug && console.debug(this.processorId + ": process queue start", {
                    timeSinceLastStart: this.processEndTime ? this.processStartTime - this.processEndTime : 0,
                    startTime: this.processStartTime,
                    requestQueue: this.requestQueue,
                    batch: t.map(function(e) {
                        return e.key
                    })
                }),
                this.itemsProcessor(t).then(function(e) {
                    Object.entries(e).forEach(function(e) {
                        var t = e[0]
                          , n = e[1]
                          , e = a.get(t);
                        r.saveCompleteItem(t, n, null == e ? void 0 : e.cacheProperties)
                    }),
                    r.handleBatchResult(t, Es.processFailure)
                }, function(e) {
                    r.handleBatchResult(t, e)
                }))
            }
        }
        ,
        Os.prototype.saveCompleteItem = function(e, t, n) {
            var r = this;
            this.completeItems.set(e, t, n || this.cacheProperties),
            this.getItemExpiration && setTimeout(function() {
                r.completeItems.delete(e)
            }, this.getItemExpiration(e))
        }
        ,
        Os.prototype.queueItem = function(n, r, a) {
            var o = this;
            return new Promise(function(e, t) {
                o.requestQueue.push({
                    key: r || o.itemsSerializer(n),
                    itemId: n,
                    data: n,
                    retryAttempts: 0,
                    queueAfter: 0,
                    startTime: new Date,
                    cacheProperties: a || o.cacheProperties,
                    resolve: e,
                    reject: t
                }),
                setTimeout(function() {
                    return o.processQueue()
                }, o.processBatchWaitTime)
            }
            )
        }
        ,
        Os.prototype.invalidateItem = function(e, t) {
            e = t || this.itemsSerializer(e);
            return this.completeItems.delete(e)
        }
        ,
        Os.prototype.clearCache = function() {
            this.completeItems.clear()
        }
        ,
        Os);
        function _s() {
            this.createExponentialBackoffCooldown = Rs
        }
        new (f = (_s.prototype.createRequestProcessor = function(e, t, n) {
            return n.processBatchWaitTime || (n.processBatchWaitTime = 10),
            n.maxRetryAttempts || (n.maxRetryAttempts = 2),
            n.cacheProperties || (n.cacheProperties = Ss),
            n.concurrentRequestCount || (n.concurrentRequestCount = 1),
            new Ds(e,t,n)
        }
        ,
        _s));
        var xs, Bs = m.EnvironmentUrls.friendsApi, Ns = m.EnvironmentUrls.presenceApi, Fs = m.EnvironmentUrls.usersApi;
        function ks(e, t) {
            return t = Bs + "/v1/users/" + t + "/" + e,
            e === xs.Requests && (t = Bs + "/v1/my/friends/requests"),
            {
                url: t,
                retryable: !0,
                withCredentials: !0
            }
        }
        function Ms() {
            return {
                url: Ns + "/v1/presence/users",
                retryable: !1,
                withCredentials: !0
            }
        }
        function js(s) {
            return function(e) {
                var t, n, r = e[0], u = r.key, a = r.data, o = a.userId, c = a.isGuest, i = ks(s, o), t = (n = (t = a).cursor,
                e = t.sortOrder,
                r = t.userSort,
                o = t.limit,
                a = t.fetchMutualFriends,
                t = {},
                n && Object.assign(t, {
                    cursor: n
                }),
                e && Object.assign(t, {
                    sortOrder: e
                }),
                r && Object.assign(t, {
                    userSort: r
                }),
                o && Object.assign(t, {
                    limit: o
                }),
                a && Object.assign(t, {
                    fetchMutualFriends: a
                }),
                t);
                return rt.get(i, t).then(function(e) {
                    var r = {};
                    if (null == e || !e.data)
                        return r[u] = {
                            userData: []
                        },
                        r;
                    var t, n = e.data, a = n.data, o = n.previousPageCursor, i = n.nextPageCursor, s = (t = {},
                    a.forEach(function(e) {
                        t[e.id] = e,
                        t[e.id].profileUrl = "/users/" + e.id + "/profile",
                        t[e.id].presence = {}
                    }),
                    t);
                    if (c)
                        return r[u] = {
                            userData: a,
                            prevCursor: o,
                            nextCursor: i
                        },
                        r;
                    e = Ms(),
                    n = Object.keys(s).map(function(e) {
                        return parseInt(e, 10)
                    });
                    return rt.post(e, {
                        userIds: n
                    }).then(function(e) {
                        var t, n;
                        return t = s,
                        0 < (null === (e = null === (e = null == (n = e) ? void 0 : n.data) || void 0 === e ? void 0 : e.userPresences) || void 0 === e ? void 0 : e.length) && (n = n.data.userPresences,
                        Zs([], n).forEach(function(e) {
                            t[e.userId].presence = e
                        })),
                        r[u] = {
                            userData: a,
                            prevCursor: o,
                            nextCursor: i
                        },
                        r
                    }).catch(function(e) {
                        return console.debug(e),
                        r[u] = {
                            userData: a,
                            prevCursor: o,
                            nextCursor: i
                        },
                        r
                    })
                }).catch(function(e) {
                    return console.debug(e),
                    {}
                })
            }
        }
        function zs(e) {
            return void 0 === e && (e = window.location.search),
            au.parse(e)
        }
        function Vs(e) {
            return void 0 === e && (e = {}),
            au.stringify(e)
        }
        function Hs(e) {
            return m.Endpoints ? m.Endpoints.getAbsoluteUrl(e) : e
        }
        function Ws(e, t) {
            return Hs(e + "?" + Vs(t))
        }
        function Ks(e) {
            try {
                var t = new URL(e);
                return "http:" === t.protocol || "https:" === t.protocol
            } catch (e) {
                return !1
            }
        }
        function Xs() {
            return Bi.getLocalStorage(su)
        }
        function Js(e) {
            Bi.setLocalStorage(su, e)
        }
        function Qs(t) {
            var e = Bi.getLocalStorage(su) || {}
              , n = Math.floor(Date.now() / 1e3)
              , r = (null === (r = e[uu]) || void 0 === r ? void 0 : r.game) || [];
            (r = r.filter(function(e) {
                return e.gameId !== t
            })).push({
                gameId: t,
                clientEpochTimestamp: n
            }),
            20 < r.length && r.shift(),
            e[uu] = iu(iu({}, e[uu]), {
                game: r
            });
            try {
                Js(e)
            } catch (e) {
                console.error("Error setting AuthIntent data:", e)
            }
        }
        (pe = xs = xs || {}).Friends = "friends",
        pe.Followers = "followers",
        pe.Followings = "followings",
        pe.Requests = "requests",
        (fe = ru = ru || {}).Alphabetical = "Alphabetical",
        fe.StatusAlphabetical = "StatusAlphabetical",
        fe.StatusFrequents = "StatusFrequents";
        var Ys, $s, Zs = function(e, t) {
            for (var n = 0, r = t.length, a = e.length; n < r; n++,
            a++)
                e[a] = t[n];
            return e
        }, eu = (new f).createRequestProcessor(function(e) {
            var t = {
                url: Fs + "/v1/users",
                retryable: !0,
                withCredentials: !0
            }
              , e = e.map(function(e) {
                return e.data.userId
            });
            return rt.post(t, {
                userIds: e,
                excludeBannedUsers: !0
            }).then(function(e) {
                var e = e.data.data
                  , t = {};
                return e.forEach(function(e) {
                    t[e.id] = e
                }),
                t
            })
        }, function(e) {
            e = e.userId;
            return null == e ? void 0 : e.toString()
        }, {
            batchSize: 100,
            processBatchWaitTime: 1e3
        }), tu = new f, nu = new Map, pe = function(r) {
            var a = function(e, t, n) {
                if (nu.has(e))
                    return nu.get(e);
                n = tu.createRequestProcessor(t, n, {
                    batchSize: 1
                });
                return nu.set(e, n),
                n
            }(r, js(r), function(e) {
                e = e.userId;
                return null == e ? void 0 : e.toString()
            });
            return function(e, t) {
                var n, n = r + ":" + (n = e).userId + ":" + n.cursor + ":" + n.sortOrder + ":" + n.userSort + ":" + n.limit;
                return null != t && t.refreshCache && a.invalidateItem(e, n),
                a.queueItem(e, n, t)
            }
        }, ru = (null === (fe = null === (fe = window.CoreRobloxUtilities) || void 0 === fe ? void 0 : fe.dataStores) || void 0 === fe ? void 0 : fe.userDataStoreV2) || {
            getFriends: pe(xs.Friends),
            getFollowers: pe(xs.Followers),
            getFollowings: pe(xs.Followings),
            getFriendsRequests: pe(xs.Requests),
            getUser: function(e) {
                return eu.queueItem({
                    userId: e
                })
            },
            clearUserDataStoreCache: function() {
                nu.forEach(function(e) {
                    e.clearCache()
                })
            },
            maxFriendRequestNotificationCount: 500,
            maxMessagesNotificationCount: 500,
            FriendsUserSortType: ru
        }, au = $l(4343), ou = {
            getAbsoluteUrl: Hs,
            parseQueryString: zs,
            composeQueryString: Vs,
            getQueryParam: function(e) {
                return zs()[e]
            },
            formatUrl: wt.GP,
            resolveUrl: wt.hd,
            parseUrl: wt.qg,
            parseUrlAndQueryString: au.parseUrl,
            extractQueryString: au.extract,
            getGameDetailReferralUrls: function(e) {
                return Hs("/games/refer?" + Vs(e))
            },
            getUrlWithQueries: Ws,
            getUrlWithLocale: function(e, t) {
                return t ? Ws(e, {
                    locale: t
                }) : e
            },
            getHelpDeskUrl: function(e, t, n) {
                var r = n || "https://en.help.roblox.com/hc/";
                return !!(n = e) && /^[a-zA-Z0-9-_]+$/.test(n) ? r += function(e) {
                    var t = {
                        "zh-cn": "zh-cn",
                        zh_cn: "zh-cn",
                        "zh-cjv": "zh-cn",
                        zh_cjv: "zh-cn",
                        "zh-hans": "zh-cn",
                        zh_hans: "zh-cn",
                        "zh-tw": "zh-tw",
                        zh_tw: "zh-tw",
                        "zh-hant": "zh-tw",
                        zh_hant: "zh-tw",
                        "en-us": "en-us",
                        en_us: "en-us",
                        en: "en-us",
                        "en-gb": "en-gb",
                        en_gb: "en-gb",
                        "fr-ca": "fr-ca",
                        fr_ca: "fr-ca",
                        nb: "no",
                        "nb-no": "no",
                        nb_no: "no"
                    };
                    if (t[e])
                        return t[e];
                    e = e.split(/[^a-zA-Z0-9]/).filter(Boolean);
                    return e[0] || "en"
                }(e) : r += "en-us",
                !!(e = t) && /^[a-zA-Z0-9]+$/.test(e) && (r += "/articles/" + t),
                r
            },
            isValidHttpUrl: Ks,
            isValidStripeCheckoutUrl: function(e) {
                return Ks(e) && e.includes("checkout.stripe.com")
            }
        }, iu = function() {
            return (iu = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        }, su = "RBXAuthIntent", uu = "-1", ie = {
            authIntentDataStore: {
                addGameIdToUnClaimedAuthIntent: Qs,
                applyUserAuthIntent: function(e) {
                    var t = Bi.getLocalStorage(su);
                    t && t[uu] && (t[e] = t[uu],
                    delete t[uu],
                    Js(t))
                },
                retrieveAuthIntentDataForUser: function() {
                    if (m.CurrentUser.userId)
                        return Xs() && Xs()[m.CurrentUser.userId]
                },
                saveGameIntentFromReturnUrl: function() {
                    var e = ou.getQueryParam("returnUrl")
                      , e = /\/games\/(\d+)\//.exec(e);
                    e && Qs(e[1])
                },
                saveGameIntentFromCurrentUrl: function() {
                    var e = window.location.href
                      , e = /\/games\/(\d+)\//.exec(e);
                    e && Qs(e[1])
                },
                hasUnclaimedAuthIntent: function() {
                    var e = Bi.getLocalStorage(su);
                    return !(!e || !e[uu])
                }
            },
            catalogDataStore: ne,
            gameAutoLocalizationDataStore: Zr,
            gameAutomaticTranslationDataStore: oe,
            gameLanguagesDataStore: I,
            gameSourceLanguageDataStore: te,
            gameThumbnailsDataStore: X,
            gameTranslationAnalyticsDataStore: Ln,
            gamesDataStore: Ro,
            hbacIndexedDB: t,
            inventoryDataStore: xo,
            localeDataStore: Z,
            thumbnailsDataStore: ae,
            translationProgressDataStore: z,
            translationRolesDataStore: ie,
            userDataStore: ru,
            userDataStoreV2: ru
        };
        function cu(e, t, n) {
            return {
                type: "linkResolved",
                context: "deepLink",
                params: {
                    linkType: n,
                    linkStatus: e,
                    linkId: t
                }
            }
        }
        (ru = Ys = Ys || {}).GameDetails = "game_details",
        ru.Profile = "profile",
        ru.Home = "home",
        ru.Games = "games",
        ru.Avatar = "avatar",
        ru.Catalog = "catalog",
        ru.Friends = "friends",
        ru.ItemDetails = "item_details",
        ru.Navigation = "navigation",
        ru.PlaceId = "placeId",
        ru.UserId = "userId",
        ru.ShareLinks = "share_links",
        ru.Chat = "chat",
        ru.GiftCards = "gift_cards",
        ru.NotificationSettings = "notification_settings",
        ru.AccountInfo = "account_info",
        ru.PrivacySettings = "privacy_settings",
        ru.ParentalControls = "parental_controls",
        ru.SpendingSettings = "spending_settings",
        ru.Group = "group",
        ru.ExternalWebUrl = "external_web_link",
        (ru = $s = $s || {}).Asset = "Asset",
        ru.Bundle = "Bundle",
        ru.Look = "Look";
        var lu, du, hu, vu, pu, fu, mu, gu = ((ru = {})[$s.Asset] = "/catalog",
        ru[$s.Bundle] = "/bundles",
        ru[$s.Look] = "/looks",
        ru), Iu = ((ru = {})[Ys.Home] = "/home",
        ru[Ys.Games] = "/games",
        ru[Ys.Catalog] = "/catalog",
        ru[Ys.Friends] = "/users/friends",
        ru[Ys.GiftCards] = "/giftcards",
        ru[Ys.NotificationSettings] = "/my/account#!/notifications",
        ru[Ys.AccountInfo] = "/my/account#!/info",
        ru[Ys.PrivacySettings] = "/my/account#!/privacy",
        ru[Ys.ParentalControls] = "/my/account#!/parental-controls",
        ru[Ys.SpendingSettings] = "/my/account#!/billing",
        ru), yu = {
            Games: "/games",
            Users: "/users",
            Groups: "/groups",
            Profile: "/profile",
            GameStart: "/games/start",
            GiftCards: "/giftcards",
            ExperienceLauncher: "roblox://experiences/start?",
            Asset: "/catalog",
            Bundle: "/bundles",
            Look: "/looks",
            AppLauncher: "roblox://navigation",
            ContentPost: "/content_posts",
            Avatar: "/my/avatar"
        }, Pu = "DeeplinkParserNavigationFailed", Gu = "DeeplinkParserInviteResolutionFailed", bu = "DeeplinkParserNotificationInviteResolutionFailed", wu = "DeeplinkParserFriendRequestResolutionFailed", Cu = "DeeplinkParserProfileShareResolutionFailed", Tu = "DeeplinkParserScreenshotInviteShareResolutionFailed", Au = "DeeplinkParserPrivateServerLinkResolutionFailed", Eu = "DeeplinkParserExperienceDetailsResolutionFailed", Su = "DeeplinkParserAvatarItemDetailsResolutionFailed", Ru = "DeeplinkParserContentPostResolutionFailed", Lu = "DeeplinkParserExperienceEventResolutionFailed", qu = window.EventTracker ? EventTracker : {
            fireEvent: console.log,
            start: console.log,
            endSuccess: console.log,
            endCancel: console.log,
            endFailure: console.log
        };
        (lu = lu = lu || {}).Strict = "strict",
        lu.Lax = "lax",
        lu.None = "none",
        (lu = hu = hu || {}).PagingParametersChanged = "Paging parameters were changed",
        lu.GetItemsFailure = "Unable to get items",
        lu.InvalidPageNumber = "Invalid page number",
        (hu = du = du || {})[hu.Initialized = 0] = "Initialized",
        hu[hu.Idle = 1] = "Idle",
        hu[hu.Loading = 2] = "Loading",
        (pu = pu = pu || {}).Asc = "Asc",
        pu.Desc = "Desc",
        new Intl.DateTimeFormat(void 0,{
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: !0
        }),
        (pu = vu = vu || {})[pu.Windows = 0] = "Windows",
        pu[pu.macOS = 1] = "macOS",
        pu[pu.Linux = 2] = "Linux",
        pu[pu.Unix = 3] = "Unix",
        pu[pu.iOS = 4] = "iOS",
        pu[pu.Android = 5] = "Android",
        pu[pu.Unknown = 6] = "Unknown",
        (fu = fu = fu || {}).Unidentified = "Unidentified",
        fu.Alt = "Alt",
        fu.AltGraph = "AltGraph",
        fu.CapsLock = "CapsLock",
        fu.Control = "Control",
        fu.Fn = "Fn",
        fu.FnLock = "FnLock",
        fu.Hyper = "Hyper",
        fu.Meta = "Meta",
        fu.NumLock = "NumLock",
        fu.ScrollLock = "ScrollLock",
        fu.Shift = "Shift",
        fu.Super = "Super",
        fu.Symbol = "Symbol",
        fu.SymbolLock = "SymbolLock",
        fu.Enter = "Enter",
        fu.Tab = "Tab",
        fu.ArrowDown = "ArrowDown",
        fu.ArrowLeft = "ArrowLeft",
        fu.ArrowRight = "ArrowRight",
        fu.ArrowUp = "ArrowUp",
        fu.End = "End",
        fu.Home = "Home",
        fu.PageDown = "PageDown",
        fu.PageUp = "PageUp",
        fu.Backspace = "Backspace",
        fu.Clear = "Clear",
        fu.Copy = "Copy",
        fu.CrSel = "CrSel",
        fu.Cut = "Cut",
        fu.Delete = "Delete",
        fu.EraseEof = "EraseEof",
        fu.ExSel = "ExSel",
        fu.Insert = "Insert",
        fu.Paste = "Paste",
        fu.Redo = "Redo",
        fu.Undo = "Undo",
        fu.Accept = "Accept",
        fu.Again = "Again",
        fu.Attn = "Attn",
        fu.Cancel = "Cancel",
        fu.ContextMenu = "ContextMenu",
        fu.Escape = "Escape",
        fu.Execute = "Execute",
        fu.Find = "Find",
        fu.Finish = "Finish",
        fu.Help = "Help",
        fu.Pause = "Pause",
        fu.Play = "Play",
        fu.Props = "Props",
        fu.Select = "Select",
        fu.ZoomIn = "ZoomIn",
        fu.ZoomOut = "ZoomOut",
        fu.BrightnessDown = "BrightnessDown",
        fu.BrightnessUp = "BrightnessUp",
        fu.Eject = "Eject",
        fu.LogOff = "LogOff",
        fu.Power = "Power",
        fu.PowerOff = "PowerOff",
        fu.PrintScreen = "PrintScreen",
        fu.Hibernate = "Hibernate",
        fu.Standby = "Standby",
        fu.WakeUp = "WakeUp",
        fu.AllCandidates = "AllCandidates",
        fu.Alphanumeric = "Alphanumeric",
        fu.CodeInput = "CodeInput",
        fu.Compose = "Compose",
        fu.Convert = "Convert",
        fu.Dead = "Dead",
        fu.FinalMode = "FinalMode",
        fu.GroupFirst = "GroupFirst",
        fu.GroupLast = "GroupLast",
        fu.GroupNext = "GroupNext",
        fu.GroupPrevious = "GroupPrevious",
        fu.ModeChange = "ModeChange",
        fu.NextCandidate = "NextCandidate",
        fu.NonConvert = "NonConvert",
        fu.PreviousCandidate = "PreviousCandidate",
        fu.Process = "Process",
        fu.SingleCandidate = "SingleCandidate",
        fu.HangulMode = "HangulMode",
        fu.HanjaMode = "HanjaMode",
        fu.JunjaMode = "JunjaMode",
        fu.Eisu = "Eisu",
        fu.Hankaku = "Hankaku",
        fu.Hiragana = "Hiragana",
        fu.HiraganaKatakana = "HiraganaKatakana",
        fu.KanaMode = "KanaMode",
        fu.KanjiMode = "KanjiMode",
        fu.Katakana = "Katakana",
        fu.Romaji = "Romaji",
        fu.Zenkaku = "Zenkaku",
        fu.ZenkakuHanaku = "ZenkakuHanaku",
        fu.F1 = "F1",
        fu.F2 = "F2",
        fu.F3 = "F3",
        fu.F4 = "F4",
        fu.F5 = "F5",
        fu.F6 = "F6",
        fu.F7 = "F7",
        fu.F8 = "F8",
        fu.F9 = "F9",
        fu.F10 = "F10",
        fu.F11 = "F11",
        fu.F12 = "F12",
        fu.F13 = "F13",
        fu.F14 = "F14",
        fu.F15 = "F15",
        fu.F16 = "F16",
        fu.F17 = "F17",
        fu.F18 = "F18",
        fu.F19 = "F19",
        fu.F20 = "F20",
        fu.Soft1 = "Soft1",
        fu.Soft2 = "Soft2",
        fu.Soft3 = "Soft3",
        fu.Soft4 = "Soft4",
        fu.AppSwitch = "AppSwitch",
        fu.Call = "Call",
        fu.Camera = "Camera",
        fu.CameraFocus = "CameraFocus",
        fu.EndCall = "EndCall",
        fu.GoBack = "GoBack",
        fu.GoHome = "GoHome",
        fu.HeadsetHook = "HeadsetHook",
        fu.LastNumberRedial = "LastNumberRedial",
        fu.Notification = "Notification",
        fu.MannerMode = "MannerMode",
        fu.VoiceDial = "VoiceDial",
        fu.ChannelDown = "ChannelDown",
        fu.ChannelUp = "ChannelUp",
        fu.MediaFastForward = "MediaFastForward",
        fu.MediaPause = "MediaPause",
        fu.MediaPlay = "MediaPlay",
        fu.MediaPlayPause = "MediaPlayPause",
        fu.MediaRecord = "MediaRecord",
        fu.MediaRewind = "MediaRewind",
        fu.MediaStop = "MediaStop",
        fu.MediaTrackNext = "MediaTrackNext",
        fu.MediaTrackPrevious = "MediaTrackPrevious",
        fu.AudioBalanceLeft = "AudioBalanceLeft",
        fu.AudioBalanceRight = "AudioBalanceRight",
        fu.AudioBassDown = "AudioBassDown",
        fu.AudioBassBoostDown = "AudioBassBoostDown",
        fu.AudioBassBoostToggle = "AudioBassBoostToggle",
        fu.AudioBassBoostUp = "AudioBassBoostUp",
        fu.AudioBassUp = "AudioBassUp",
        fu.AudioFaderFront = "AudioFaderFront",
        fu.AudioFaderRear = "AudioFaderRear",
        fu.AudioSurroundModeNext = "AudioSurroundModeNext",
        fu.AudioTrebleDown = "AudioTrebleDown",
        fu.AudioTrebleUp = "AudioTrebleUp",
        fu.AudioVolumeDown = "AudioVolumeDown",
        fu.AudioVolumeMute = "AudioVolumeMute",
        fu.AudioVolumeUp = "AudioVolumeUp",
        fu.MicrophoneToggle = "MicrophoneToggle",
        fu.MicrophoneVolumeDown = "MicrophoneVolumeDown",
        fu.MicrophoneVolumeMute = "MicrophoneVolumeMute",
        fu.MicrophoneVolumeUp = "MicrophoneVolumeUp",
        fu.TV = "TV",
        fu.TV3DMode = "TV3DMode",
        fu.TVAntennaCable = "TVAntennaCable",
        fu.TVAudioDescription = "TVAudioDescription",
        fu.TVAudioDescriptionMixDown = "TVAudioDescriptionMixDown",
        fu.TVAudioDescriptionMixUp = "TVAudioDescriptionMixUp",
        fu.TVContentsMenu = "TVContentsMenu",
        fu.TVDataService = "TVDataService",
        fu.TVInput = "TVInput",
        fu.TVInputComponent1 = "TVInputComponent1",
        fu.TVInputComponent2 = "TVInputComponent2",
        fu.TVInputComposite1 = "TVInputComposite1",
        fu.TVInputComposite2 = "TVInputComposite2",
        fu.TVInputHDMI1 = "TVInputHDMI1",
        fu.TVInputHDMI2 = "TVInputHDMI2",
        fu.TVInputHDMI3 = "TVInputHDMI3",
        fu.TVInputHDMI4 = "TVInputHDMI4",
        fu.TVInputVGA1 = "TVInputVGA1",
        fu.TVMediaContext = "TVMediaContext",
        fu.TVNetwork = "TVNetwork",
        fu.TVNumberEntry = "TVNumberEntry",
        fu.TVPower = "TVPower",
        fu.TVRadioService = "TVRadioService",
        fu.TVSatellite = "TVSatellite",
        fu.TVSatelliteBS = "TVSatelliteBS",
        fu.TVSatelliteCS = "TVSatelliteCS",
        fu.TVSatelliteToggle = "TVSatelliteToggle",
        fu.TVTerrestrialAnalog = "TVTerrestrialAnalog",
        fu.TVTerrestrialDigital = "TVTerrestrialDigital",
        fu.TVTimer = "TVTimer",
        fu.AVRInput = "AVRInput",
        fu.AVRPower = "AVRPower",
        fu.ColorF0Red = "ColorF0Red",
        fu.ColorF1Green = "ColorF1Green",
        fu.ColorF2Yellow = "ColorF2Yellow",
        fu.ColorF3Blue = "ColorF3Blue",
        fu.ColorF4Grey = "ColorF4Grey",
        fu.ColorF5Brown = "ColorF5Brown",
        fu.ClosedCaptionToggle = "ClosedCaptionToggle",
        fu.Dimmer = "Dimmer",
        fu.DisplaySwap = "DisplaySwap",
        fu.DVR = "DVR",
        fu.Exit = "Exit",
        fu.FavoriteClear0 = "FavoriteClear0",
        fu.FavoriteClear1 = "FavoriteClear1",
        fu.FavoriteClear2 = "FavoriteClear2",
        fu.FavoriteClear3 = "FavoriteClear3",
        fu.FavoriteRecall0 = "FavoriteRecall0",
        fu.FavoriteRecall1 = "FavoriteRecall1",
        fu.FavoriteRecall2 = "FavoriteRecall2",
        fu.FavoriteRecall3 = "FavoriteRecall3",
        fu.FavoriteStore0 = "FavoriteStore0",
        fu.FavoriteStore1 = "FavoriteStore1",
        fu.FavoriteStore2 = "FavoriteStore2",
        fu.FavoriteStore3 = "FavoriteStore3",
        fu.Guide = "Guide",
        fu.GuideNextDay = "GuideNextDay",
        fu.GuidePreviousDay = "GuidePreviousDay",
        fu.Info = "Info",
        fu.InstantReplay = "InstantReplay",
        fu.Link = "Link",
        fu.ListProgram = "ListProgram",
        fu.LiveContent = "LiveContent",
        fu.Lock = "Lock",
        fu.MediaApps = "MediaApps",
        fu.MediaAudioTrack = "MediaAudioTrack",
        fu.MediaLast = "MediaLast",
        fu.MediaSkipBackward = "MediaSkipBackward",
        fu.MediaSkipForward = "MediaSkipForward",
        fu.MediaStepBackward = "MediaStepBackward",
        fu.MediaStepForward = "MediaStepForward",
        fu.MediaTopMenu = "MediaTopMenu",
        fu.NavigateIn = "NavigateIn",
        fu.NavigateNext = "NavigateNext",
        fu.NavigateOut = "NavigateOut",
        fu.NavigatePrevious = "NavigatePrevious",
        fu.NextFavoriteChannel = "NextFavoriteChannel",
        fu.NextUserProfile = "NextUserProfile",
        fu.OnDemand = "OnDemand",
        fu.Pairing = "Pairing",
        fu.PinPDown = "PinPDown",
        fu.PinPMove = "PinPMove",
        fu.PinPToggle = "PinPToggle",
        fu.PinPUp = "PinPUp",
        fu.PlaySpeedDown = "PlaySpeedDown",
        fu.PlaySpeedReset = "PlaySpeedReset",
        fu.PlaySpeedUp = "PlaySpeedUp",
        fu.RandomToggle = "RandomToggle",
        fu.RcLowBattery = "RcLowBattery",
        fu.RecordSpeedNext = "RecordSpeedNext",
        fu.RfBypass = "RfBypass",
        fu.ScanChannelsToggle = "ScanChannelsToggle",
        fu.ScreenModeNext = "ScreenModeNext",
        fu.Settings = "Settings",
        fu.SplitScreenToggle = "SplitScreenToggle",
        fu.STBInput = "STBInput",
        fu.STBPower = "STBPower",
        fu.Subtitle = "Subtitle",
        fu.Teletext = "Teletext",
        fu.VideoModeNext = "VideoModeNext",
        fu.Wink = "Wink",
        fu.ZoomToggle = "ZoomToggle",
        fu.SpeechCorrectionList = "SpeechCorrectionList",
        fu.SpeechInputToggle = "SpeechInputToggle",
        fu.Close = "Close",
        fu.New = "New",
        fu.Open = "Open",
        fu.Print = "Print",
        fu.Save = "Save",
        fu.SpellCheck = "SpellCheck",
        fu.MailForward = "MailForward",
        fu.MailReply = "MailReply",
        fu.MailSend = "MailSend",
        fu.LaunchCalculator = "LaunchCalculator",
        fu.LaunchCalendar = "LaunchCalendar",
        fu.LaunchContacts = "LaunchContacts",
        fu.LaunchMail = "LaunchMail",
        fu.LaunchMediaPlayer = "LaunchMediaPlayer",
        fu.LaunchMusicPlayer = "LaunchMusicPlayer",
        fu.LaunchMyComputer = "LaunchMyComputer",
        fu.LaunchPhone = "LaunchPhone",
        fu.LaunchScreenSaver = "LaunchScreenSaver",
        fu.LaunchSpreadsheet = "LaunchSpreadsheet",
        fu.LaunchWebBrowser = "LaunchWebBrowser",
        fu.LaunchWebCam = "LaunchWebCam",
        fu.LaunchWordProcessor = "LaunchWordProcessor",
        fu.LaunchApplication1 = "LaunchApplication1",
        fu.LaunchApplication2 = "LaunchApplication2",
        fu.LaunchApplication3 = "LaunchApplication3",
        fu.LaunchApplication4 = "LaunchApplication4",
        fu.LaunchApplication5 = "LaunchApplication5",
        fu.LaunchApplication6 = "LaunchApplication6",
        fu.LaunchApplication7 = "LaunchApplication7",
        fu.LaunchApplication8 = "LaunchApplication8",
        fu.LaunchApplication9 = "LaunchApplication9",
        fu.LaunchApplication10 = "LaunchApplication10",
        fu.LaunchApplication11 = "LaunchApplication11",
        fu.LaunchApplication12 = "LaunchApplication12",
        fu.LaunchApplication13 = "LaunchApplication13",
        fu.LaunchApplication14 = "LaunchApplication14",
        fu.LaunchApplication15 = "LaunchApplication15",
        fu.LaunchApplication16 = "LaunchApplication16",
        fu.BrowserBack = "BrowserBack",
        fu.BrowserFavorites = "BrowserFavorites",
        fu.BrowserForward = "BrowserForward",
        fu.BrowserHome = "BrowserHome",
        fu.BrowserRefresh = "BrowserRefresh",
        fu.BrowserSearch = "BrowserSearch",
        fu.BrowserStop = "BrowserStop",
        fu.Decimal = "Decimal",
        fu.Key11 = "Key11",
        fu.Key12 = "Key12",
        fu.Multiply = "Multiply",
        fu.Add = "Add",
        fu.Divide = "Divide",
        fu.Subtract = "Subtract",
        fu.Separator = "Separator",
        (Mu = Mu = Mu || {}).CONNECT = "CONNECT",
        Mu.DELETE = "DELETE",
        Mu.GET = "GET",
        Mu.HEAD = "HEAD",
        Mu.OPTIONS = "OPTIONS",
        Mu.PATCH = "PATCH",
        Mu.POST = "POST",
        Mu.PUT = "PUT",
        Mu.TRACE = "TRACE",
        (Mu = mu = mu || {}).processFailure = "processFailure",
        Mu.unretriableFailure = "unretriableFailure",
        Mu.maxAttemptsReached = "maxAttemptsReached";
        for (var Uu, Ou = new Uint8Array(16), Du = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i, _u = function(e) {
            return "string" == typeof e && Du.test(e)
        }, xu = [], Bu = 0; Bu < 256; ++Bu)
            xu.push((Bu + 256).toString(16).substr(1));
        var Nu = function(e) {
            var t = (xu[e[(t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0) + 0]] + xu[e[t + 1]] + xu[e[t + 2]] + xu[e[t + 3]] + "-" + xu[e[t + 4]] + xu[e[t + 5]] + "-" + xu[e[t + 6]] + xu[e[t + 7]] + "-" + xu[e[t + 8]] + xu[e[t + 9]] + "-" + xu[e[t + 10]] + xu[e[t + 11]] + xu[e[t + 12]] + xu[e[t + 13]] + xu[e[t + 14]] + xu[e[t + 15]]).toLowerCase();
            if (!_u(t))
                throw TypeError("Stringified UUID is invalid");
            return t
        };
        function Fu(e) {
            var t = e.eventName
              , n = e.ctx
              , e = e.properties;
            Ae.sendEventWithTarget(t, n, e)
        }
        function ku(e, t, n) {
            Ae.sendGamePlayEvent(e, t, void 0, n)
        }
        var Mu, ju = function(e, t, n) {
            var r = (e = e || {}).random || (e.rng || function() {
                if (!Uu && !(Uu = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto)))
                    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
                return Uu(Ou)
            }
            )();
            if (r[6] = 15 & r[6] | 64,
            r[8] = 63 & r[8] | 128,
            t) {
                n = n || 0;
                for (var a = 0; a < 16; ++a)
                    t[n + a] = r[a];
                return t
            }
            return Nu(r)
        }, zu = {
            buildPlayGameProperties: function(e, t, n, r, a, o, i) {
                return {
                    rootPlaceId: e,
                    placeId: t,
                    gameInstanceId: n,
                    playerId: r,
                    privateServerLinkCode: a,
                    referredByPlayerId: o,
                    joinData: i
                }
            },
            launchGame: function(e, t) {
                var n, r, a, o, i, s, u, c, l, d, h, v, p, f;
                m.GameLauncher && (o = m.GameLauncher.isJoinAttemptIdEnabled() ? ju() : void 0,
                i = t,
                m.GameLauncher.isJoinAttemptIdEnabled() && (i.properties.joinAttemptId = o),
                n = e.rootPlaceId,
                a = e.placeId,
                f = e.gameInstanceId,
                r = e.playerId,
                s = e.joinData,
                c = e.privateServerLinkCode,
                u = e.referredByPlayerId,
                a === n && f ? (i.properties.gameInstanceId = f,
                Fu(i),
                ku(i.gamePlayIntentEventCtx, n, o),
                v = a,
                p = f,
                t = o,
                e = i.gamePlayIntentEventCtx,
                f = u,
                m.GameLauncher.joinGameInstance(v, p, !0, !0, t, e, f)) : n && r ? (i.properties.playerId = r,
                Fu(i),
                ku(i.gamePlayIntentEventCtx, n, o),
                l = r,
                d = o,
                h = i.gamePlayIntentEventCtx,
                m.GameLauncher.followPlayerIntoGame(l, d, h)) : c ? (Fu(i),
                ku(i.gamePlayIntentEventCtx, a, o),
                l = a,
                d = c,
                h = o,
                c = i.gamePlayIntentEventCtx,
                m.GameLauncher.joinPrivateGame(l, null, d, h, c)) : (Fu(i),
                ku(i.gamePlayIntentEventCtx, a, o),
                a = a,
                o = o,
                i = i.gamePlayIntentEventCtx,
                s = s,
                u = u,
                m.GameLauncher.joinMultiplayerGame(a, !0, !1, o, i, s, u)))
            }
        }, Vu = {
            url: m.EnvironmentUrls.gamesApi + "/v1/games",
            withCredentials: !0
        }, Hu = function(e) {
            return rt.get(Vu, {
                universeIds: [e]
            }).then(function(e) {
                return null === (e = null === (e = null === (e = null == e ? void 0 : e.data) || void 0 === e ? void 0 : e.data) || void 0 === e ? void 0 : e[0]) || void 0 === e ? void 0 : e.rootPlaceId
            })
        }, Wu = {
            url: m.EnvironmentUrls.shareLinksApi + "/v1/resolve-link",
            withCredentials: !0
        }, Ku = function(e, t) {
            return rt.post(Wu, {
                linkId: e,
                linkType: t
            }).then(function(e) {
                return e
            })
        };
        (Mu = Ju = Ju || {}).PROFILE_SHARE = "ProfileShare",
        Mu.QR_CODE = "QrCode";
        var Xu, Ju, Qu = Ju;
        (Ju = Xu = Xu || {}).AVATAR_ITEM_DETAILS = "AvatarItemDetails",
        Ju.CONTENT_POST = "ContentPost",
        Ju.EXPERIENCE_INVITE = "ExperienceInvite",
        Ju.EXPERIENCE_AFFILIATE = "ExperienceAffiliate",
        Ju.FRIEND_INVITE = "FriendInvite",
        Ju.NOTIFICATION_EXPERIENCE_INVITE = "NotificationExperienceInvite",
        Ju.PROFILE = "Profile",
        Ju.SCREENSHOT_INVITE = "ScreenshotInvite",
        Ju.SERVER = "Server",
        Ju.EXPERIENCE_DETAILS = "ExperienceDetails",
        Ju.EXPERIENCE_EVENT = "ExperienceEvent",
        (Ju = Yu = Yu || {}).VALID = "Valid",
        Ju.EXPIRED = "Expired",
        Ju.INVITER_NOT_IN_EXPERIENCE = "InviterNotInExperience";
        var Yu, $u = Yu;
        (Yu = wc = wc || {}).VALID = "Valid",
        Yu.EXPIRED = "Expired",
        Yu.CONSUMED = "Consumed",
        Yu.SENDER_BLOCKED_RECIPIENT = "SenderBlockedRecipient",
        Yu.INVALID = "Invalid";
        var Zu = wc;
        (wc = Wc = Wc || {}).VALID = "Valid",
        wc.SENDER_BLOCKED_RECIPIENT = "SenderBlockedRecipient",
        wc.INVALID = "Invalid";
        var ec = Wc;
        (wc = vc = vc || {}).VALID = "Valid",
        wc.EXPIRED = "Expired",
        wc.INVITER_NOT_IN_EXPERIENCE = "InviterNotInExperience";
        var tc = vc;
        (Wc = yc = yc || {}).INVALID = "Invalid",
        Wc.VALID = "Valid",
        Wc.EXPIRED = "Expired";
        var nc = yc;
        (wc = dc = dc || {}).INVALID = "Invalid",
        wc.EXPIRED = "Expired",
        wc.VALID = "Valid";
        var rc = dc;
        (hc = hc || {}).Zendesk = "zendesk";
        var ac = hc;
        (vc = pc = pc || {}).INVALID = "Invalid",
        vc.EXPIRED = "Expired",
        vc.VALID = "Valid";
        var oc = pc;
        (Wc = Ic = Ic || {}).INVALID = "Invalid",
        Wc.VALID = "Valid";
        var ic = Ic;
        (yc = bc = bc || {}).INVALID = "Invalid",
        yc.EXPIRED = "Expired",
        yc.VALID = "Valid";
        var sc = bc;
        (wc = Qc = Qc || {}).INVALID = "Invalid",
        wc.VALID = "Valid";
        var uc = Qc;
        function cc(e, t) {
            var n = e.split("?")
              , e = n[0]
              , n = n[1]
              , n = new URLSearchParams(n);
            return t && (t.launchData && "" !== t.launchData && n.append("launchData", t.launchData),
            t.experienceEventId && "" !== t.experienceEventId && n.append("eventId", t.experienceEventId)),
            e + "?" + n.toString()
        }
        function lc(e) {
            for (var t = [], n = {}, r = e, a = mc.exec(e); a; )
                t.push(a[1]),
                a = mc.exec(e);
            for (var o = gc.exec(e); o; ) {
                var i = o[1]
                  , s = o[2];
                n[i] = s,
                o = gc.exec(e)
            }
            return {
                path: t,
                params: n,
                url: r
            }
        }
        var dc = function(e) {
            var t = e.path
              , r = e.params
              , n = t[1];
            if (Iu[n]) {
                s = Iu[n];
                for (var a = Object.keys(r), o = 0; o < a.length; o++)
                    var i = a[o]
                      , s = s.replace("{" + i + "}", r[i])
            } else if (u = r,
            n === Ys.ItemDetails && u.itemType && u.itemId)
                s = gu[r.itemType] + "/" + r.itemId;
            else {
                if (n === Ys.GameDetails && r.gameId)
                    return Hu(r.gameId).then(function(e) {
                        return !!e && (window.location.href = yu.Games + "/" + e,
                        !0)
                    }).catch(function() {
                        return !1
                    });
                if (n === Ys.Profile)
                    r.userId ? s = yu.Users + "/" + r.userId + yu.Profile : r.groupId && (s = yu.Groups + "/" + r.groupId);
                else if (n === Ys.GiftCards)
                    s = "" + yu.GiftCards;
                else if (n === Ys.ShareLinks)
                    switch (r.type) {
                    case Xu.EXPERIENCE_INVITE:
                        if (r.code)
                            return Ku(r.code, Xu.EXPERIENCE_INVITE).then(function(e) {
                                e = null === (n = null == e ? void 0 : e.data) || void 0 === n ? void 0 : n.experienceInviteData;
                                if (!e || !e.placeId)
                                    return !1;
                                var t, n = cu(e.status, r.code, Xu.EXPERIENCE_INVITE);
                                return Ae.sendEventWithTarget(n.type, n.context, n.params),
                                e.status === $u.VALID && e.instanceId ? (window.location.href = yu.Games + "/" + e.placeId,
                                zu.launchGame(zu.buildPlayGameProperties(e.placeId, e.placeId, e.instanceId, void 0, void 0, e.inviterId), (n = e.placeId.toString(),
                                t = r.code,
                                {
                                    eventName: "joinGameFromInviteLink",
                                    ctx: "shareLinks",
                                    gamePlayIntentEventCtx: "shareLinks",
                                    properties: {
                                        linkStatus: e.status,
                                        linkType: "ExperienceInvite",
                                        placeId: n,
                                        linkId: t
                                    }
                                })),
                                !0) : (e.status === $u.EXPIRED || e.status === $u.INVITER_NOT_IN_EXPERIENCE) && (window.localStorage.setItem("ref_info", btoa(JSON.stringify(((t = {})[e.placeId.toString()] = e.inviterId.toString(),
                                t)))),
                                window.location.href = yu.Games + "/" + e.placeId + "?experienceInviteLinkId=" + r.code + "&experienceInviteStatus=" + e.status,
                                !0)
                            }).catch(function() {
                                return (0,
                                qu.fireEvent)(Gu),
                                !1
                            });
                        break;
                    case Xu.NOTIFICATION_EXPERIENCE_INVITE:
                        if (r.code)
                            return Ku(r.code, Xu.NOTIFICATION_EXPERIENCE_INVITE).then(function(e) {
                                e = null === (t = null == e ? void 0 : e.data) || void 0 === t ? void 0 : t.notificationExperienceInviteData;
                                if (null != e && e.placeId) {
                                    var t = e.instanceId && e.status === $u.VALID
                                      , t = yu.ExperienceLauncher + "placeId=" + e.placeId + (e.launchData ? "&launchData=" + encodeURIComponent(encodeURIComponent(e.launchData)) : "") + (t ? "&gameInstanceId=" + e.instanceId : "") + (e.inviterId ? "&referredByPlayerId=" + e.inviterId : "");
                                    return m.ProtocolHandlerClientInterface.startGameWithDeepLinkUrl(t, e.placeId),
                                    !0
                                }
                                return !1
                            }).catch(function() {
                                return (0,
                                qu.fireEvent)(bu),
                                !1
                            });
                        break;
                    case Xu.FRIEND_INVITE:
                        if (r.code)
                            return Ku(r.code, Xu.FRIEND_INVITE).then(function(e) {
                                e = null === (t = null == e ? void 0 : e.data) || void 0 === t ? void 0 : t.friendInviteData;
                                if (!e || !e.senderUserId)
                                    return !1;
                                var t = cu(e.status, r.code, Xu.FRIEND_INVITE);
                                return Ae.sendEventWithTarget(t.type, t.context, t.params),
                                (e.status === Zu.VALID || e.status === Zu.CONSUMED || e.status === Zu.EXPIRED) && (window.location.href = yu.Users + "/" + e.senderUserId + yu.Profile,
                                !0)
                            }).catch(function() {
                                return (0,
                                qu.fireEvent)(wu),
                                !1
                            });
                        break;
                    case Xu.PROFILE:
                        if (r.code)
                            return Ku(r.code, Xu.PROFILE).then(function(e) {
                                e = null === (t = null == e ? void 0 : e.data) || void 0 === t ? void 0 : t.profileLinkResolutionResponseData;
                                if (!e || !e.userId)
                                    return !1;
                                var t = cu(e.status, r.code, Xu.PROFILE);
                                if (Ae.sendEventWithTarget(t.type, t.context, t.params),
                                e.status !== ec.VALID)
                                    return !1;
                                t = function(e) {
                                    switch (null == e ? void 0 : e.toLowerCase()) {
                                    case Qu.PROFILE_SHARE.toLowerCase():
                                        return Qu.PROFILE_SHARE;
                                    case Qu.QR_CODE.toLowerCase():
                                    default:
                                        return Qu.QR_CODE
                                    }
                                }(ou.getQueryParam("source"));
                                return window.location.href = yu.Users + "/" + e.userId + yu.Profile + "?friendshipSourceType=" + t,
                                !0
                            }).catch(function() {
                                return (0,
                                qu.fireEvent)(Cu),
                                !1
                            });
                        break;
                    case Xu.SCREENSHOT_INVITE:
                        if (r.code)
                            return Ku(r.code, Xu.SCREENSHOT_INVITE).then(function(e) {
                                e = null === (t = null == e ? void 0 : e.data) || void 0 === t ? void 0 : t.screenshotInviteData;
                                if (null == e || !e.placeId || ![tc.EXPIRED, tc.INVITER_NOT_IN_EXPERIENCE, tc.VALID].includes(e.status))
                                    return !1;
                                var t = cu(e.status, r.code, Xu.SCREENSHOT_INVITE);
                                if (Ae.sendEventWithTarget(t.type, t.context, t.params),
                                e.status === tc.EXPIRED || e.status === tc.INVITER_NOT_IN_EXPERIENCE)
                                    return window.location.href = yu.Games + "/" + e.placeId + "?experienceInviteLinkId=" + r.code + "&experienceInviteStatus=" + e.status,
                                    !0;
                                t = yu.ExperienceLauncher + "placeId=" + e.placeId;
                                return e.launchData && (t += "&launchData=" + encodeURIComponent(encodeURIComponent(e.launchData))),
                                e.instanceId && (t += "&gameInstanceId=" + e.instanceId),
                                m.ProtocolHandlerClientInterface.startGameWithDeepLinkUrl(t, e.placeId),
                                !0
                            }).catch(function() {
                                return (0,
                                qu.fireEvent)(Tu),
                                !1
                            });
                        break;
                    case Xu.SERVER:
                        if (r.code)
                            return Ku(r.code, Xu.SERVER).then(function(e) {
                                var n = null === (e = null == e ? void 0 : e.data) || void 0 === e ? void 0 : e.privateServerInviteData;
                                return !!(n && n.universeId && [nc.VALID, nc.EXPIRED].includes(n.status)) && (Hu(n.universeId.toString()).then(function(e) {
                                    if (!e)
                                        return !1;
                                    var t = cu(n.status, r.code, Xu.SERVER);
                                    return Ae.sendEventWithTarget(t.type, t.context, t.params),
                                    window.location.href = yu.Games + "/" + e + "?privateServerLinkCode=" + n.linkCode,
                                    !0
                                }).catch(function() {
                                    return !1
                                }),
                                !0)
                            }).catch(function() {
                                return (0,
                                qu.fireEvent)(Au),
                                !1
                            });
                        break;
                    case Xu.EXPERIENCE_AFFILIATE:
                        if (!r.code)
                            break;
                        return Ku(r.code, Xu.EXPERIENCE_AFFILIATE).then(function(e) {
                            var n = null === (e = null == e ? void 0 : e.data) || void 0 === e ? void 0 : e.experienceAffiliateData;
                            if (n.status !== ic.VALID)
                                return !1;
                            if (n && n.universeId)
                                return Hu(n.universeId.toString()).then(function(e) {
                                    if (!e)
                                        return !1;
                                    var t = cu(n.status, r.code, Xu.EXPERIENCE_AFFILIATE);
                                    Ae.sendEventWithTarget(t.type, t.context, t.params);
                                    t = window.location.protocol + "//" + window.location.hostname + window.location.pathname + "?type=" + Xu.EXPERIENCE_AFFILIATE + "&code=" + r.code,
                                    t = cc(t = yu.Games + "/" + e + "?shareLinkSourceType=" + Xu.EXPERIENCE_AFFILIATE + "&referralUrl=" + encodeURIComponent(t), n.joinData);
                                    return window.location.href = t,
                                    !0
                                }).catch(function() {
                                    return !1
                                });
                            e = cu(n.status, r.code, Xu.EXPERIENCE_AFFILIATE);
                            Ae.sendEventWithTarget(e.type, e.context, e.params);
                            e = window.location.protocol + "/" + window.location.hostname + window.location.pathname + "?type=" + Xu.EXPERIENCE_AFFILIATE + "&code=" + r.code;
                            return window.location.href = "/?referralUrl=" + encodeURIComponent(e),
                            !0
                        }).catch(function() {
                            return (0,
                            qu.fireEvent)(Eu),
                            !1
                        });
                    case Xu.EXPERIENCE_DETAILS:
                        if (!r.code)
                            break;
                        return Ku(r.code, Xu.EXPERIENCE_DETAILS).then(function(e) {
                            var n = null === (e = null == e ? void 0 : e.data) || void 0 === e ? void 0 : e.experienceDetailsInviteData;
                            return !(!n || !n.universeId || n.status !== rc.VALID) && Hu(n.universeId.toString()).then(function(e) {
                                if (!e)
                                    return !1;
                                var t = cu(n.status, r.code, Xu.EXPERIENCE_DETAILS);
                                return Ae.sendEventWithTarget(t.type, t.context, t.params),
                                window.location.href = yu.Games + "/" + e + "?shareLinkSourceType=" + Xu.EXPERIENCE_DETAILS,
                                !0
                            }).catch(function() {
                                return !1
                            })
                        }).catch(function() {
                            return (0,
                            qu.fireEvent)(Eu),
                            !1
                        });
                    case Xu.AVATAR_ITEM_DETAILS:
                        if (!r.code)
                            break;
                        return Ku(r.code, Xu.AVATAR_ITEM_DETAILS).then(function(e) {
                            var t = null === (n = null == e ? void 0 : e.data) || void 0 === n ? void 0 : n.avatarItemDetailsData;
                            if (!(t && t.itemId && "" !== t.itemId && "0" !== t.itemId && t.itemType && t.itemType in yu && t.status === oc.VALID))
                                return !1;
                            var e = t.itemType
                              , n = cu(t.status, r.code, Xu.AVATAR_ITEM_DETAILS);
                            return Ae.sendEventWithTarget(n.type, n.context, n.params),
                            window.location.href = yu[e] + "/" + t.itemId + "?pid=share&is_retargeting=true&deep_link_value=" + r.code,
                            !0
                        }).catch(function() {
                            return (0,
                            qu.fireEvent)(Su),
                            !1
                        });
                    case Xu.CONTENT_POST:
                        if (!r.code)
                            break;
                        return Ku(r.code, Xu.CONTENT_POST).then(function(e) {
                            e = null === (t = null == e ? void 0 : e.data) || void 0 === t ? void 0 : t.contentPostData;
                            if (!e || e.status !== sc.VALID)
                                return !1;
                            var t = cu(e.status, r.code, Xu.CONTENT_POST);
                            return Ae.sendEventWithTarget(t.type, t.context, t.params),
                            window.location.href = "" + yu.AppLauncher + yu.ContentPost + "?userId=" + e.postCreatorId + "&postId=" + e.postId,
                            window.location.href = yu.Users + "/" + e.postCreatorId + yu.Profile,
                            !0
                        }).catch(function() {
                            return (0,
                            qu.fireEvent)(Ru),
                            !1
                        });
                    case Xu.EXPERIENCE_EVENT:
                        if (!r.code)
                            break;
                        return Ku(r.code, Xu.EXPERIENCE_EVENT).then(function(e) {
                            e = null === (t = null == e ? void 0 : e.data) || void 0 === t ? void 0 : t.experienceEventData;
                            if (!e || !e.universeId || !e.placeId || e.status !== uc.VALID)
                                return !1;
                            var t = cu(e.status, r.code, Xu.EXPERIENCE_EVENT);
                            Ae.sendEventWithTarget(t.type, t.context, t.params);
                            t = cc(t = yu.ExperienceLauncher + "placeId=" + e.placeId, e.joinData);
                            return m.ProtocolHandlerClientInterface.startGameWithDeepLinkUrl(t, e.placeId),
                            !0
                        }).catch(function() {
                            return (0,
                            qu.fireEvent)(Lu),
                            !1
                        })
                    }
                else {
                    if (n === Ys.Chat && r.userId)
                        return bt.startDesktopAndMobileWebChat(r),
                        Promise.resolve(!0);
                    if (n === Ys.ExternalWebUrl) {
                        var u, c = void 0;
                        return r.domain === ac.Zendesk && (t = r.articleId,
                        u = r.locale,
                        (c = ou.getHelpDeskUrl(u, t)) && window.open(c, "_blank")),
                        Promise.resolve(!!c)
                    }
                    n === Ys.Avatar ? s = Object.keys(r).length ? e.url : "" + yu.Avatar : n === Ys.Group && r.groupId && (s = r.forumCategoryId && r.forumPostId && r.forumCommentId ? yu.Groups + "/" + r.groupId + "#!/forums/" + r.forumCategoryId + "/post/" + r.forumPostId + "/comment/" + r.forumCommentId : yu.Groups + "/" + r.groupId)
                }
            }
            return s ? window.location.href = s : (0,
            qu.fireEvent)(Pu),
            Promise.resolve(!!s)
        }
          , hc = function(e) {
            var t = e.params;
            return t.placeId ? (t.linkCode ? window.location.href = yu.Games + "/" + t.placeId + "?privateServerLinkCode=" + t.linkCode : t.accessCode ? window.location.href = yu.GameStart + "?placeId=" + t.placeId + "&accessCode=" + t.accessCode : t.launchData ? (e = yu.ExperienceLauncher + "placeId=" + t.placeId + (t.launchData ? "&launchData=" + t.launchData : ""),
            m.ProtocolHandlerClientInterface.startGameWithDeepLinkUrl(e, Number(t.placeId))) : m.GameLauncher.joinMultiplayerGame(parseFloat(t.placeId), !0, !1),
            Promise.resolve(!0)) : Promise.resolve(!1)
        }
          , vc = function(e) {
            e = e.params.userId;
            return e && (window.location.href = "/games/start?userId=" + e),
            Promise.resolve(!!e)
        }
          , pc = function(e) {
            e = e.params.groupId;
            return e && (window.location.href = "/groups/" + e),
            Promise.resolve(!!e)
        }
          , fc = ((Wc = {})[Ys.Navigation] = dc,
        Wc[Ys.PlaceId] = hc,
        Wc[Ys.UserId] = vc,
        Wc[Ys.Group] = pc,
        Wc)
          , mc = /\/(\w+)/g
          , gc = /(\w+)=([^&=]+)/g
          , Ic = {
            parseDeeplink: lc,
            navigateToDeepLink: function(e) {
                var t;
                if (m.DeviceMeta && (0,
                m.DeviceMeta)().isIosApp && m.Hybrid)
                    return null !== (t = m.Hybrid.Navigation) && void 0 !== t && t.navigateToFeature(((n = {}).feature = "DeepLink",
                    n.deepLinkUrlPath = e,
                    n), function() {
                        return !0
                    }),
                    Promise.resolve(!0);
                if (m.DeviceMeta && (0,
                m.DeviceMeta)().isInApp)
                    return window.location.href = e,
                    Promise.resolve(!0);
                var n = lc(e)
                  , e = fc[n.path[0]];
                return e ? e(n) : Promise.resolve(!1)
            }
        }
          , yc = {
            AvatarItemDetailsStatus: oc,
            ContentPostStatus: sc,
            ExperienceInviteStatus: $u,
            FriendInviteStatus: Zu,
            ProfileShareStatus: ec,
            PrivateServerLinkStatus: nc,
            ExperienceAffiliateStatus: ic,
            ExperienceEventStatus: uc
        };
        function Pc(e) {
            return e.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
        }
        function Gc(e) {
            var t = e.length % 4 ? 4 - e.length % 4 : 0;
            return e.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat(t)
        }
        Object.assign(g(), {
            DeepLinkService: Ic,
            ShareLinksType: Xu,
            ShareLinks: yc
        });
        var bc = Ic
          , wc = {
            base64StringToBase64UrlString: Pc,
            base64UrlStringToBase64String: Gc,
            convertPublicKeyParametersToStandardBase64: function(e) {
                var t = JSON.parse(e);
                if (t.publicKey.challenge = Gc(t.publicKey.challenge),
                t.publicKey.user && t.publicKey.user.id && (t.publicKey.user.id = Gc(t.publicKey.user.id)),
                t.publicKey.allowCredentials)
                    for (var n = 0; n < t.publicKey.allowCredentials.length; n++)
                        t.publicKey.allowCredentials[n].id = Gc(t.publicKey.allowCredentials[n].id);
                if (t.publicKey.excludeCredentials)
                    for (n = 0; n < t.publicKey.excludeCredentials.length; n++)
                        t.publicKey.excludeCredentials[n].id = Gc(t.publicKey.excludeCredentials[n].id);
                return t
            },
            formatCredentialAuthenticationResponseApp: function(e) {
                var t = JSON.parse(e)
                  , e = {
                    id: Pc(t.id),
                    type: t.type,
                    response: {
                        authenticatorData: Pc(t.response.authenticatorData),
                        clientDataJSON: Pc(t.response.clientDataJSON)
                    }
                };
                return "rawId"in t && (e.rawId = Pc(t.rawId)),
                "signature"in t.response && (e.response.signature = Pc(t.response.signature)),
                "userHandle"in t.response && (e.response.userHandle = Pc(t.response.userHandle)),
                JSON.stringify(e)
            },
            formatCredentialRegistrationResponseApp: function(e) {
                e = JSON.parse(e);
                return void 0 !== e.rawId ? JSON.stringify({
                    authenticatorAttachment: e.authenticatorAttachment,
                    id: Pc(e.id),
                    type: e.type,
                    rawId: Pc(e.rawId),
                    response: {
                        attestationObject: Pc(e.response.attestationObject),
                        clientDataJSON: Pc(e.response.clientDataJSON)
                    }
                }) : JSON.stringify({
                    authenticatorAttachment: e.authenticatorAttachment,
                    id: Pc(e.id),
                    type: e.type,
                    response: {
                        attestationObject: Pc(e.response.attestationObject),
                        clientDataJSON: Pc(e.response.clientDataJSON)
                    }
                })
            },
            formatCredentialRequestWeb: function(e) {
                var t = JSON.parse(e);
                if (t.publicKey.challenge = Gt.base64StringToArrayBuffer(t.publicKey.challenge),
                t.publicKey.allowCredentials)
                    for (var n = 0; n < t.publicKey.allowCredentials.length; n++)
                        t.publicKey.allowCredentials[n].id = Gt.base64StringToArrayBuffer(t.publicKey.allowCredentials[n].id);
                if (t.publicKey.user && t.publicKey.user.id && (t.publicKey.user.id = Gt.base64StringToArrayBuffer(t.publicKey.user.id)),
                t.publicKey.excludeCredentials)
                    for (n = 0; n < t.publicKey.excludeCredentials.length; n++)
                        t.publicKey.excludeCredentials[n].id = Gt.base64StringToArrayBuffer(t.publicKey.excludeCredentials[n].id);
                return t.publicKey
            },
            formatCredentialAuthenticationResponseWeb: function(e) {
                var t = e.response
                  , n = new Uint8Array(t.authenticatorData)
                  , r = new Uint8Array(t.clientDataJSON)
                  , a = new Uint8Array(e.rawId)
                  , o = new Uint8Array(t.signature)
                  , t = new Uint8Array(t.userHandle)
                  , t = {
                    id: e.id,
                    rawId: Pc(Gt.arrayBufferToBase64String(a)),
                    type: e.type,
                    response: {
                        authenticatorData: Pc(Gt.arrayBufferToBase64String(n)),
                        clientDataJSON: Pc(Gt.arrayBufferToBase64String(r)),
                        signature: Pc(Gt.arrayBufferToBase64String(o)),
                        userHandle: Pc(Gt.arrayBufferToBase64String(t))
                    }
                };
                return JSON.stringify(t)
            },
            formatCredentialRegistrationResponseWeb: function(e) {
                var t = e.response
                  , n = new Uint8Array(t.attestationObject)
                  , r = new Uint8Array(t.clientDataJSON)
                  , t = new Uint8Array(e.rawId);
                return JSON.stringify({
                    authenticatorAttachment: e.authenticatorAttachment,
                    id: e.id,
                    rawId: Pc(Gt.arrayBufferToBase64String(t)),
                    type: e.type,
                    response: {
                        attestationObject: Pc(Gt.arrayBufferToBase64String(n)),
                        clientDataJSON: Pc(Gt.arrayBufferToBase64String(r))
                    }
                })
            }
        }
          , Cc = (Qc = m.Hybrid || {}).Chat
          , Tc = Qc.Navigation
          , Ac = Qc.Overlay
          , Ec = Qc.Game
          , Sc = Qc.Localization;
        function Rc(e) {
            return void 0 === e ? function() {}
            : e
        }
        var dc = {
            startChatConversation: function(e, t) {
                Cc && Cc.startChatConversation(e, Rc(t))
            },
            startWebChatConversation: function(e, t) {
                Tc && Tc.startWebChatConversation(e, Rc(t))
            },
            navigateToFeature: function(e, t) {
                Tc && Tc.navigateToFeature(e, Rc(t))
            },
            openUserProfile: function(e, t) {
                Tc && Tc.openUserProfile(e, Rc(t))
            },
            close: function(e) {
                Ac && Ac.close(Rc(e))
            },
            launchGame: function(e, t) {
                Ec && Ec.launchGame(e, Rc(t))
            },
            localization: function(e, t) {
                Sc && Sc.languageChangeTrigger && Sc.languageChangeTrigger(e, Rc(t))
            }
        }
          , Lc = function() {
            return (Lc = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        };
        (hc = $c = $c || {}).GET_CREDENTIALS = "getCredentials",
        hc.REGISTER_CREDENTIALS = "registerCredentials",
        hc.CREDENTIALS_PROTOCOL_AVAILABLE = "credentialsProtocolAvailable",
        hc.GET_INTEGRITY_TOKEN = "getIntegrityToken";
        var qc, Uc = {}, Oc = {}, Dc = 0, vc = {
            FeatureTarget: $c,
            injectNativeResponse: function(e, t) {
                void 0 !== Oc[e] && Oc[e](String(t))
            },
            getNativeResponse: function(e, t, n) {
                var r, a = Dc += 1;
                return Uc[a] = new Promise(function(t) {
                    Oc[a] = function(e) {
                        t(e),
                        delete Uc[a],
                        delete Oc[a]
                    }
                }
                ),
                m.Hybrid && m.Hybrid.Navigation && m.Hybrid.Navigation.navigateToFeature({
                    feature: e,
                    data: Lc({
                        callId: a
                    }, t)
                }, function() {
                    return console.log("Hybrid Response Service: ", "Sent native request:", e)
                }),
                Promise.race([(r = n,
                new Promise(function(e) {
                    return setTimeout(function() {
                        return e(null)
                    }, r)
                }
                )), Uc[a]])
            }
        }, _c = (m.CurrentUser || {}).userId, xc = {
            friends: "Friends",
            followers: "Followers",
            requests: "Requests",
            followings: "Followings"
        }, Bc = {
            friendsDict: function(e) {
                return "Roblox.".concat(xc[e], "Dict.UserId").concat(_c || 0)
            }
        };
        (qc = qc || {}).EventTracker = "eventTracker";
        var Nc, Fc, kc, Mc, jc, zc, Vc, pc = {
            getEventTracker: function() {
                return function(e) {
                    try {
                        var t = window.sessionStorage.getItem(e) || "{}"
                          , t = JSON.parse(t);
                        if (t.constructor === Object)
                            return t
                    } catch (e) {}
                    return {}
                }(qc.EventTracker)
            }
        }, Hc = m.EnvironmentUrls.metricsApi, Wc = function() {
            var e = document.getElementsByName("performance")[0];
            return e ? {
                performanceMetricsBatchWaitTime: function(e) {
                    if (!e)
                        return 0;
                    e = e.split(":");
                    return 1e3 * (60 * parseInt(e[0], 10) * 60 + 60 * parseInt(e[1], 10) + parseInt(e[2], 10))
                }(e.getAttribute("data-ui-performance-metrics-batch-wait-time")),
                performanceMetricsBatchSize: parseInt(e.getAttribute("data-ui-performance-metrics-batch-size"), 10)
            } : {}
        }, Kc = function() {
            return (Kc = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        }, Xc = function(e, t) {
            var n = {};
            for (a in e)
                Object.prototype.hasOwnProperty.call(e, a) && t.indexOf(a) < 0 && (n[a] = e[a]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols)
                for (var r = 0, a = Object.getOwnPropertySymbols(e); r < a.length; r++)
                    t.indexOf(a[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, a[r]) && (n[a[r]] = e[a[r]]);
            return n
        }, yc = new f, Jc = 0, Qc = (Ic = Wc()).performanceMetricsBatchWaitTime, hc = Ic.performanceMetricsBatchSize, Yc = yc.createRequestProcessor(function(e) {
            var t = {
                url: Hc + "/v1/performance/measurements",
                retryable: !0,
                withCredentials: !0
            }
              , n = e.map(function(e) {
                e = e.data,
                e.taskId,
                e = Xc(e, ["taskId"]);
                return Kc({}, e)
            });
            return rt.post(t, n).then(function() {
                var t = {};
                return e.forEach(function(e) {
                    e = e.key;
                    t[e] = !0
                }),
                t
            })
        }, function(e) {
            e = e.taskId;
            return null == e ? void 0 : e.toString()
        }, {
            batchSize: hc || 100,
            processBatchWaitTime: Qc || 1e4
        }), $c = {
            logMeasurement: function(e) {
                var t = Jc;
                return Jc += 1,
                Yc.queueItem(Kc({
                    taskId: t
                }, e))
            }
        }, Zc = "RBXPaymentsFlowContext", el = new RegExp("^(?:.*; |)" + Zc + "=([^,]+),([^;]+)(?:;.*|)$");
        (f = Nc = Nc || {}).USER_PURCHASE_FLOW = "UserPurchaseFlow",
        f.USER_PURCHASE_STATUS = "UserPurchaseStatus",
        (Wc = Fc = Fc || {}).WEB_ROBUX_PURCHASE = "WebRobuxPurchase",
        Wc.WEB_PREMIUM_PURCHASE = "WebPremiumPurchase",
        Wc.WEB_CATALOG_ROBUX_UPSELL = "WebCatalogRobuxUpsell",
        Wc.WEB_CATALOG_PREMIUM_UPSELL = "WebCatalogPremiumUpsell",
        Wc.WEB_CATALOG_COLLECTIVE_ITEM_ROBUX_UPSELL = "WebCatalogCollectiveItemRobuxUpsell",
        Wc.WEB_CATALOG_BUNDLE_ITEM_ROBUX_UPSELL = "WebCatalogBundleItemRobuxUpsell",
        Wc.WEB_PAID_GAME_ROBUX_UPSELL = "WebPaidGameRobuxUpsell",
        Wc.WEB_GAME_PASS_ROBUX_UPSELL = "WebGamePassRobuxUpsell",
        Wc.WEB_DEVELOPER_PRODUCT_ROBUX_UPSELL = "WebDeveloperProductRobuxUpsell",
        Wc.WEB_PRIVATE_SERVER_ROBUX_UPSELL = "WebPrivateServerRobuxUpsell",
        Wc.WEB_CATALOG_CART_ROBUX_UPSELL = "WebCatalogCartRobuxUpsell",
        Wc.WEBVIEW_ROBUX_PURCHASE = "WebViewRobuxPurchase",
        Wc.WEBVIEW_PREMIUM_PURCHASE = "WebViewPremiumPurchase",
        (Ic = kc = kc || {}).ROBUX_UPSELL = "RobuxUpsell",
        Ic.ROBUX_UPSELL_EXCEED_LARGEST_PACKAGE = "RobuxUpsellExceedLargestPackage",
        Ic.PURCHASE_WARNING = "PurchaseWarning",
        Ic.LEAVE_ROBLOX_WARNING = "LeaveRobloxWarning",
        Ic.PREMIUM_DISCLOSURES = "PremiumDisclosures",
        Ic.PRODUCT_PURCHASE = "ProductPurchase",
        Ic.PRODUCT_PURCHASE_QUICK_PAY = "ProductPurchaseQuickPay",
        Ic.PREMIUM_PURCHASE = "PremiumPurchase",
        Ic.MEMBERSHIP = "Membership",
        Ic.MEMBERSHIP_ANGULAR = "MembershipAngular",
        Ic.PREMIUM_UPSELL = "PremiumUpsell",
        Ic.PAYMENT_METHOD = "PaymentMethod",
        Ic.NAVIGATION_MENU = "NavigationMenu",
        Ic.PREPARE_PAYMENT_ERROR_OCCURED = "PreparePaymentErrorOccured",
        Ic.XSOLLA = "Xsolla",
        Ic.XSOLLA_OTHER = "Xsolla Other",
        Ic.XSOLLA_SAVED_PAYMENT_METHOD = "Xsolla SavedCard",
        Ic.PAYPAL_POST_PROCESS = "Paypal Post Process",
        Ic.BRAINTREE_POST_PROCESS = "Braintree Post Process",
        Ic.ROBLOX_CREDIT = "Roblox Credit",
        Ic.ROBLOX_CREDIT_CAPTCHA = "Roblox Credit Captcha",
        Ic.LOADING = "Loading",
        Ic.CHECKOUT_SUCCESS = "Checkout Success",
        Ic.SUCCESS = "Success",
        Ic.ERROR = "Error",
        Ic.NAVIGATION_ROBUX_TEXT = "NavigationRobuxText",
        Ic.NAVIGATION_DROPDOWN_MENU = "NavigationDropdownMenu",
        Ic.LEFT_NAVIGATION_BAR = "LeftNavigationBar",
        Ic.TRANSACTION_PAGE = "TransactionPage",
        Ic.CATALOG_LIST_PAGE = "CatalogListPage",
        Ic.ROBLOX_CREDIT_SETTING_BILLING_PAGE = "RobloxCreditBillingPage",
        Ic.REDEEM_ROBLOX_CARD_PAGE = "RedeemRobloxCardPage",
        Ic.PURCHASE_VPC_MODAL = "PurchaseVpcModal",
        Ic.OPTIMIZED_PURCHASE_VPC_MODAL = "OptimizedPurchaseVpcModal",
        (yc = Mc = Mc || {}).VIEW_SHOWN = "ViewShown",
        yc.USER_INPUT = "UserInput",
        (hc = jc = jc || {}).SUBMIT_ORDER = "Submit Order",
        hc.REDEEM = "Redeem",
        hc.BUY_ROBUX = "Buy Robux",
        hc.BUY_ROBUX_AND_ITEM = "Buy Robux and Item",
        hc.BUY_GIFT_CARD = "Buy Gift Card",
        hc.CONTINUE_TO_CASHSTAR = "Continue to Cashstar",
        hc.CONTINUE_TO_VNG = "Continue to Vng",
        hc.EXTERNAL_LINK_MODAL = "External Link Modal",
        hc.CANCEL = "Cancel",
        hc.CLOSE = "Close",
        hc.CONTINUE = "Continue",
        hc.BACK = "Back",
        hc.CARD_NUMBER_FORM = "Card Number Form",
        hc.PAY_NOW = "Pay Now",
        hc.PROCEED_TO_CHECKOUT = "Proceed to Checkout",
        hc.SEND_RECEIPT_TO_EMAIL = "Send receipt to email",
        hc.OPEN_EXTERNAL_LINK = "External Link",
        hc.PAYMENT_METHOD_LIST = "Other payment method list",
        hc.GIFT_CARD = "Gift Card",
        hc.OK = "OK",
        hc.PREMIUM = "Premium",
        hc.GET_PREMIUM = "Get Premium",
        hc.GO_TO_ROBUX_STORE = "Go To Robux Store",
        hc.U13_PAYMENT_MODAL = "U13PaymentModal",
        hc.U13_PARENTAL_CONSENT_WARNING = "U13ParentalConsentWarning",
        hc.PAYMENT_MODAL_13_TO_17 = "PaymentModal13To17",
        hc.U13_MONTHLY_THRESHOLD_1_MODAL = "U13MonthlyThreshold1Modal",
        hc.U13_MONTHLY_THRESHOLD_2_MODAL = "U13MonthlyThreshold2Modal",
        hc.REQUIRE_EMAIL_VERIFICATION = "RequireEmailVerification",
        hc.PURCHASE = "PURCHASE",
        hc.REQUIRE_TWO_STEP_VERIFICATION = "RequireTwoStepVerification",
        hc.ROBUX_ICON = "Robux Icon",
        hc.PAGE_REFRESHED = "PageRefreshed",
        hc.BACK_FORWARD_DETECTED = "Back/Forward Triggered",
        hc.PAGE_LOADED_FROM_BACK_FORWARD_CACHE = "Back/Forward Triggered & Loaded From Cache",
        hc.GO_TO_ROBUX_PURCHASE_PAGE = "Go to Robux Purchase Page",
        hc.BILLING_EMAIL_NOT_PREFILLED = "Billing Email Not Prefilled",
        hc.CREDIT_CONVERSION = "Credit Conversion",
        hc.GO_TO_SETTINGS = "Go to Settings",
        hc.PREPARE_PAYMENT_REQUEST_FETCH_FAILED = "PreparePaymentRequestFetchFailed",
        hc.PREPARE_PAYMENT_REQUEST_FLOOD_CHECKED = "PreparePaymentRequestFloodChecked",
        hc.PREPARE_PAYMENT_REQUEST_REDIRECTED = "PreparePaymentRequestRedirected",
        hc.PAYMENT_METHOD_DROPDOWN = "Payment Method Dropdown",
        hc.USE_DIFFERENT_PAYMENT_METHOD = "Use Different Payment Method",
        (Qc = zc = zc || {}).ABANDONED = "Abandoned",
        Qc.FAILED_PREPARE_PAYMENT_REQUEST = "FailedPreparePaymentRequest",
        Qc.PASSED_PREPARE_PAYMENT_REQUEST = "PassedPreparePaymentRequest",
        Qc.REDIRECTED_TO_PREMIUM_PAGE = "RedirectedToPremiumPage",
        Qc.EXISTING_FLOW_OVERWRITTEN_BY = "ExistingFlowOverwrittenBy",
        Qc.PAYMENT_FLOW_STARTED = "PaymentFlowStarted",
        Qc.BROWSER_PAGE_CHANGED = "BrowserPageChanged",
        Qc.CAPTCHA = "Captcha",
        Qc.SUCCESS = "Success",
        Qc.ERROR = "Error",
        Qc.CONTINUE = "Continue",
        Qc.CANCEL = "Cancel",
        Qc.PAYMENT_FLOW_ENDED = "PaymentFlowEnded",
        (f = Vc = Vc || {}).GAME_PASS = "Game Pass",
        f.PRIVATE_SERVER = "Private Server",
        f.BUNDLE = "Bundle",
        f.PACKAGE = "Package",
        f.PLACE = "Place",
        f.DEVELOPER_PRODUCT = "Product";
        var tl, nl, rl = {
            WRONG_USAGE_OF_METHOD: (Wc = "UserPaymentFlow") + "WrongUsageOfMethod",
            PRE_LOADED_FROM_COOKIE: Wc + "PreLoadedFromCookie",
            EXISTING_FLOW_OVERWRITTEN_TRIGGERED: Wc + "ExistingFlowOverwrittenTriggered",
            NEW_FLOW_INITIATED_PREFIX: Wc + "NewFlowInitiatedFor",
            WRONG_DATA_IN_COOKIE: Wc + "WrongDataInCookie",
            STATUS_EVENT_TRIGGERED_WITHOUT_CTX: Wc + "StatusEventTriggeredWithoutCtx",
            MID_PURCHASE_STEP_TRIGGERED_WITHOUT_VALID_REFERRER: Wc + "MidPurchaseStepTriggeredWithoutValidReferrer",
            MID_PURCHASE_STEP_TRIGGERED_WITH_REFRESH: Wc + "MidPurchaseStepTriggeredWithRefresh",
            MID_PURCHASE_STEP_TRIGGERED_WITHOUT_VALID_CTX: Wc + "MidPurchaseStepTriggeredWithoutCtx",
            SEND_EVENT_WITHOUT_UUID_OR_CTX: Wc + "SendEventWithoutUuidOrCtx",
            FLOW_ABANDONED_DETECTED: Wc + "FlowAbandoned",
            PAGE_REFRESHED: Wc + "PageRefreshed",
            BACK_FORWARD_DETECTED: Wc + "BackForwardDetected",
            PAGE_LOADED_FROM_BACK_FORWARD_CACHE: Wc + "BackForwardDetectedLoadedFromCache",
            LOAD_PRE_EXISTING_CTX_ERROR: Wc + "LoadPreExistingCtxError",
            SEND_STATUS_EVENT_ERROR: Wc + "SendStatusEventError",
            SEND_USER_EVENT_ERROR: Wc + "SendUserEventError",
            START_FLOW_ERROR: Wc + "StartFlowError",
            EVENTS_REGISTER_ERROR: Wc + "EventsRegisterError",
            PERFORMANCE_NAVIGATION_TYPE_ERROR: Wc + "PerformanceNavigationTypeError",
            FLOW_ENDED: Wc + "FlowEnded"
        };
        function al(e, t) {
            this.purchaseFlowUuid = e,
            this.triggeringContext = t
        }
        (Ic = tl = tl || {}).FLOW_CONTINUE = "payment-user-journey:continue",
        Ic.FLOW_REFERRER_VALID = "payment-user-journey:referrer-valid",
        (yc = nl = nl || {}).NAVIGATE = "navigate",
        yc.RELOAD = "reload",
        yc.BACK_FORWARD = "back_forward";
        var ol = (al.prototype.save = function() {
            var e = this.purchaseFlowUuid + "," + this.triggeringContext;
            document.cookie = Zc + "=" + e + "; domain=." + m.EnvironmentUrls.domain + "; path=/; max-age=600"
        }
        ,
        al.stop = function() {
            document.cookie = Zc + "=; domain=." + m.EnvironmentUrls.domain + "; path=/; max-age=0"
        }
        ,
        al.loadFromCookie = function() {
            var e = el.exec(document.cookie);
            return el.lastIndex = 0,
            !Array.isArray(e) || e.length < 3 ? null : new al(e[1],e[2])
        }
        ,
        al)
          , il = "#header li a.robux-menu-btn"
          , sl = "display-price-container"
          , ul = "#item-details #upgrade-button"
          , cl = "#item-details .premium-prompt a"
          , ll = function() {
            return (ll = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        };
        function dl() {
            this.purchaseFlowUuid = void 0,
            this.triggerContext = void 0,
            this.ENUM_TRIGGERING_CONTEXT = Fc,
            this.ENUM_VIEW_NAME = kc,
            this.ENUM_PURCHASE_EVENT_TYPE = Mc,
            this.ENUM_VIEW_MESSAGE = jc,
            this.ENUM_PURCHASE_STATUS = zc,
            this.ENUM_CUSTOM_EVENT = tl,
            this.eventMetadata = {},
            this.loadPreExistingCtx(),
            this.setupEventListeners()
        }
        var hl, hc = new (dl.prototype.startPaymentFlow = function(e) {
            try {
                this.startPaymentFlowOrThrow(e)
            } catch (e) {
                (0,
                qu.fireEvent)(rl.START_FLOW_ERROR)
            }
        }
        ,
        dl.prototype.startPaymentFlowOrThrow = function(e) {
            var t;
            this.purchaseFlowUuid || (this.purchaseFlowUuid = null !== (t = dl.getUrlAnalyticId()) && void 0 !== t ? t : ju(),
            this.triggerContext = e,
            this.writePaymentFlowContextIntoCookie(),
            this.sendUserPurchaseStatusEvent(e, zc.PAYMENT_FLOW_STARTED),
            (0,
            qu.fireEvent)(rl.NEW_FLOW_INITIATED_PREFIX + this.triggerContext))
        }
        ,
        dl.prototype.startRobuxUpsellFlow = function(e, t, n, r, a) {
            void 0 === t && (t = !1),
            void 0 === n && (n = !1),
            void 0 === r && (r = !1),
            void 0 === a && (a = ""),
            this.eventMetadata.item_type = e,
            this.eventMetadata.item_id = a,
            e === Vc.GAME_PASS ? this.startPaymentFlow(Fc.WEB_GAME_PASS_ROBUX_UPSELL) : e === Vc.DEVELOPER_PRODUCT ? this.startPaymentFlow(Fc.WEB_DEVELOPER_PRODUCT_ROBUX_UPSELL) : e === Vc.PLACE ? this.startPaymentFlow(Fc.WEB_PAID_GAME_ROBUX_UPSELL) : e === Vc.PRIVATE_SERVER ? this.startPaymentFlow(Fc.WEB_PRIVATE_SERVER_ROBUX_UPSELL) : e === Vc.BUNDLE || e === Vc.PACKAGE ? this.startPaymentFlow(Fc.WEB_CATALOG_BUNDLE_ITEM_ROBUX_UPSELL) : t ? this.startPaymentFlow(Fc.WEB_CATALOG_COLLECTIVE_ITEM_ROBUX_UPSELL) : this.startPaymentFlow(Fc.WEB_CATALOG_ROBUX_UPSELL)
        }
        ,
        dl.prototype.sendUserPurchaseFlowEvent = function(e, t, n, r, a, o, i) {
            void 0 === t && (t = !1),
            void 0 === o && (o = {}),
            void 0 === i && (i = !1);
            try {
                var s = dl.ReclassifyPlatformTriggeringContext({
                    triggerContext: e
                });
                this.eventMetadata = ll(ll({}, this.eventMetadata), o),
                this.sendUserPurchaseFlowEventOrThrow(s, t, n, r, a, i)
            } catch (e) {
                (0,
                qu.fireEvent)(rl.SEND_USER_EVENT_ERROR)
            }
        }
        ,
        dl.prototype.sendUserPurchaseFlowEventOrThrow = function(e, t, n, r, a, o) {
            void 0 === t && (t = !1),
            void 0 === o && (o = !1),
            n || r || a ? (this.purchaseFlowUuid && this.triggerContext || !t || (0,
            qu.fireEvent)(rl.MID_PURCHASE_STEP_TRIGGERED_WITHOUT_VALID_CTX),
            this.startPaymentFlow(e),
            this.sendEvent(Nc.USER_PURCHASE_FLOW, n, r, a),
            o && this.handleTerminalPage()) : (0,
            qu.fireEvent)(rl.WRONG_USAGE_OF_METHOD)
        }
        ,
        dl.prototype.sendUserPurchaseStatusEvent = function(e, t, n, r) {
            try {
                var a = dl.ReclassifyPlatformTriggeringContext({
                    triggerContext: e
                });
                this.sendUserPurchaseStatusEventOrThrow(a, t, n, r)
            } catch (e) {
                (0,
                qu.fireEvent)(rl.SEND_STATUS_EVENT_ERROR)
            }
        }
        ,
        dl.prototype.sendUserPurchaseStatusEventOrThrow = function(e, t, n, r) {
            t || n || r ? (this.purchaseFlowUuid && this.triggerContext || ((0,
            qu.fireEvent)(rl.STATUS_EVENT_TRIGGERED_WITHOUT_CTX),
            this.startPaymentFlow(e)),
            this.sendEvent(Nc.USER_PURCHASE_STATUS, r, void 0, n, t),
            dl.isTerminalView(r) && this.handleTerminalPage()) : (0,
            qu.fireEvent)(rl.WRONG_USAGE_OF_METHOD)
        }
        ,
        dl.prototype.writePaymentFlowContextIntoCookie = function() {
            this.triggerContext && this.purchaseFlowUuid ? new ol(this.purchaseFlowUuid,this.triggerContext).save() : (0,
            qu.fireEvent)(rl.WRONG_DATA_IN_COOKIE)
        }
        ,
        dl.prototype.sendEvent = function(e, t, n, r, a, o) {
            var i, s, u, c;
            void 0 === o && (o = {}),
            this.purchaseFlowUuid && this.triggerContext ? (i = window.document.referrer || (null === (c = null === (u = null === window || void 0 === window ? void 0 : window.frames) || void 0 === u ? void 0 : u.top) || void 0 === c ? void 0 : c.document.referrer) || "",
            s = dl.extractView(i),
            u = dl.extractView(window.location.href),
            c = JSON.stringify(this.eventMetadata),
            this.viewName = null != t ? t : this.viewName,
            this.viewMessage = null != r ? r : this.viewMessage,
            m.EventStream.SendEventWithTarget(e, this.triggerContext, ll({
                purchase_flow_uuid: this.purchaseFlowUuid,
                view_name: this.viewName,
                purchase_event_type: n,
                view_message: this.viewMessage,
                status: a,
                refurl: i.substring(0, 200),
                prev_view_path: s,
                current_view_path: u,
                event_metadata: c
            }, o), m.EventStream.TargetTypes.WWW)) : (0,
            qu.fireEvent)(rl.SEND_EVENT_WITHOUT_UUID_OR_CTX)
        }
        ,
        dl.prototype.loadPreExistingCtx = function() {
            try {
                var e = ol.loadFromCookie();
                e && (this.purchaseFlowUuid = e.purchaseFlowUuid,
                this.triggerContext = e.triggeringContext)
            } catch (e) {
                (0,
                qu.fireEvent)(rl.LOAD_PRE_EXISTING_CTX_ERROR)
            }
        }
        ,
        dl.extractView = function(e) {
            if (!e)
                return "";
            e = new URL(e);
            return e ? e.hostname.endsWith("." + m.EnvironmentUrls.domain) ? e.pathname : "External" : ""
        }
        ,
        dl.wasPageLoadOfType = function(e) {
            try {
                return window.performance.getEntriesByType ? window.performance.getEntriesByType("navigation").map(function(e) {
                    return e.type
                }).includes(e) : dl.tryDeprecatedPageLoadOfType(e)
            } catch (e) {
                return (0,
                qu.fireEvent)(rl.PERFORMANCE_NAVIGATION_TYPE_ERROR),
                !1
            }
        }
        ,
        dl.tryDeprecatedPageLoadOfType = function(e) {
            if (!window.performance.navigation)
                return !1;
            switch (e) {
            case nl.BACK_FORWARD:
                return window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD;
            case nl.NAVIGATE:
                return window.performance.navigation.type === window.performance.navigation.TYPE_NAVIGATE;
            case nl.RELOAD:
                return window.performance.navigation.type === window.performance.navigation.TYPE_RELOAD;
            default:
                return !1
            }
        }
        ,
        dl.prototype.handleRefresh = function() {
            this.purchaseFlowUuid && dl.wasPageLoadOfType(nl.RELOAD) && (this.sendUserPurchaseStatusEvent(this.triggerContext, zc.BROWSER_PAGE_CHANGED, jc.PAGE_REFRESHED),
            (0,
            qu.fireEvent)(rl.PAGE_REFRESHED))
        }
        ,
        dl.prototype.handleGoBackForward = function(e) {
            this.purchaseFlowUuid && (e.persisted || dl.wasPageLoadOfType(nl.BACK_FORWARD)) && (this.sendUserPurchaseStatusEvent(this.triggerContext, zc.BROWSER_PAGE_CHANGED, e.persisted ? jc.PAGE_LOADED_FROM_BACK_FORWARD_CACHE : jc.BACK_FORWARD_DETECTED),
            (0,
            qu.fireEvent)(e.persisted ? rl.PAGE_LOADED_FROM_BACK_FORWARD_CACHE : rl.BACK_FORWARD_DETECTED))
        }
        ,
        dl.prototype.handleTerminalPage = function() {
            this.purchaseFlowUuid && (ol.stop(),
            this.sendUserPurchaseStatusEvent(this.triggerContext, zc.PAYMENT_FLOW_ENDED),
            (0,
            qu.fireEvent)(rl.FLOW_ENDED))
        }
        ,
        dl.isTerminalView = function(e) {
            return !(!e || e !== kc.CHECKOUT_SUCCESS)
        }
        ,
        dl.getUrlAnalyticId = function() {
            var e = new URLSearchParams(window.location.search);
            return e.has("analyticId") ? e.get("analyticId") : null
        }
        ,
        dl.prototype.setupEventListeners = function() {
            try {
                window.addEventListener("load", this.handleRefresh.bind(this)),
                window.addEventListener("pageshow", this.handleGoBackForward.bind(this))
            } catch (e) {
                (0,
                qu.fireEvent)(rl.EVENTS_REGISTER_ERROR)
            }
        }
        ,
        dl.ReclassifyPlatformTriggeringContext = function(e) {
            var t = e.triggerContext
              , n = m.DeviceMeta && ((0,
            m.DeviceMeta)().isAmazonApp || (0,
            m.DeviceMeta)().isUWPApp || (0,
            m.DeviceMeta)().isIosApp || (0,
            m.DeviceMeta)().isAndroidApp);
            switch (t) {
            case Fc.WEB_ROBUX_PURCHASE:
            case Fc.WEBVIEW_ROBUX_PURCHASE:
                return n ? Fc.WEBVIEW_ROBUX_PURCHASE : Fc.WEB_ROBUX_PURCHASE;
            case Fc.WEB_PREMIUM_PURCHASE:
            case Fc.WEBVIEW_PREMIUM_PURCHASE:
                return n ? Fc.WEBVIEW_PREMIUM_PURCHASE : Fc.WEB_PREMIUM_PURCHASE;
            default:
                return t
            }
        }
        ,
        dl.prototype.dispatchCustomEvent = function(e) {
            window.dispatchEvent(new CustomEvent(e))
        }
        ,
        dl);
        hl = hc,
        document.addEventListener("DOMContentLoaded", function() {
            var t, n, e;
            t = hl,
            null !== (e = document.querySelector(il)) && void 0 !== e && e.addEventListener("click", function(e) {
                t.sendUserPurchaseFlowEvent(t.ENUM_TRIGGERING_CONTEXT.WEB_ROBUX_PURCHASE, !1, t.ENUM_VIEW_NAME.NAVIGATION_MENU, t.ENUM_PURCHASE_EVENT_TYPE.USER_INPUT, e.target.innerText)
            }),
            document.getElementById(sl) || (n = hl,
            null !== (e = document.querySelector(ul)) && void 0 !== e && e.addEventListener("click", function(e) {
                n.sendUserPurchaseFlowEvent(n.ENUM_TRIGGERING_CONTEXT.WEB_PREMIUM_PURCHASE, !1, n.ENUM_VIEW_NAME.PREMIUM_UPSELL, n.ENUM_PURCHASE_EVENT_TYPE.USER_INPUT, n.ENUM_VIEW_MESSAGE.GET_PREMIUM)
            }),
            null !== (e = document.querySelector(cl)) && void 0 !== e && e.addEventListener("click", function(e) {
                n.sendUserPurchaseFlowEvent(n.ENUM_TRIGGERING_CONTEXT.WEB_PREMIUM_PURCHASE, !1, n.ENUM_VIEW_NAME.PREMIUM_UPSELL, n.ENUM_PURCHASE_EVENT_TYPE.USER_INPUT, e.target.innerText)
            }))
        });
        var Qc = hc
          , vl = m.EnvironmentUrls.friendsApi
          , pl = m.EnvironmentUrls.presenceApi
          , fl = m.EnvironmentUrls.websiteUrl
          , ml = function(e) {
            return "".concat(fl, "/users/").concat(e, "/profile")
        }
          , gl = function() {
            return "".concat(pl, "/v1/presence/users")
        }
          , Il = 100
          , yl = {
            friends: function(e) {
                return "".concat(vl, "/v1/users/").concat(e, "/friends")
            },
            followers: function(e) {
                return "".concat(vl, "/v1/users/").concat(e, "/followers")
            },
            followings: function(e) {
                return "".concat(vl, "/v1/users/").concat(e, "/followings")
            },
            friendrequests: function() {
                return "".concat(vl, "/v1/my/friends/requests")
            }
        };
        function Pl(r, a, o) {
            var e = {
                url: yl[a](m.CurrentUser.userId),
                retryable: !0,
                withCredentials: !0
            }
              , t = {
                url: gl(),
                retryable: !0,
                withCredentials: !0
            };
            return rt.get(e).then(function(e) {
                var e = e.data.data || e
                  , n = [];
                return r[a] = {},
                e.forEach(function(e) {
                    var t = e.id;
                    n.push(t),
                    e.profileUrl = ml(t),
                    r[a][t] = e
                }),
                rt.buildBatchPromises(n, Il, t, !0).then(function(e) {
                    var t, n;
                    return e && 0 < e.length && (t = [],
                    e.forEach(function(e) {
                        e = e.data.userPresences;
                        t = t.concat(e)
                    }),
                    t.forEach(function(e) {
                        r[a][e.userId].presence = e
                    })),
                    o && (Bi.saveDataByTimeStamp(Bc.friendsDict(a), r[a]),
                    n = a,
                    document.addEventListener("Roblox.Logout", function() {
                        Bi.removeLocalStorage(Bc.friendsDict(n))
                    })),
                    r[a]
                })
            })
        }
        function Gl(e, t, n) {
            var r = n.expirationMS
              , a = n.isEnabled;
            if (a) {
                var o = (n = t,
                r = r,
                (r = Bi.fetchNonExpiredCachedData(Bc.friendsDict(n), r)) ? r.data : null);
                if (o)
                    return new Promise(function(e) {
                        e(o)
                    }
                    )
            }
            return Pl(e, t, a)
        }
        function bl(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value"in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
        }
        function wl() {}
        (f = new (function() {
            function t() {
                !function(e) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this),
                this.callbacks = new Set,
                this.friendsDict = {}
            }
            var e, n, r;
            return e = t,
            (n = [{
                key: "unSubscribe",
                value: function(e) {
                    this.callbacks.delete(e)
                }
            }, {
                key: "subscribe",
                value: function(e, a, t) {
                    var o = this
                      , n = "function" == typeof e
                      , i = t && t.isEnabled;
                    n && this.callbacks.add(e),
                    i && this.friendsDict[a] ? n && e(this.friendsDict[a]) : Gl(this.friendsDict, a, t).then(function(t) {
                        var n, r;
                        i && (n = a,
                        (r = t) && document.addEventListener("Roblox.Presence.Update", function(e, t) {
                            t && setTimeout(function() {
                                t.forEach(function(e) {
                                    var t = e.userId;
                                    r[t] && (r[t].presence = e)
                                }),
                                Bi.saveDataByTimeStamp(Bc.friendsDict(n), r)
                            })
                        })),
                        o.friendsDict[a] = t,
                        o.callbacks.forEach(function(e) {
                            e(t)
                        })
                    })
                }
            }, {
                key: "refreshCacheData",
                value: function(e, t) {
                    t = t.isEnabled;
                    return Pl(this.friendsDict, e, t)
                }
            }]) && bl(e.prototype, n),
            r && bl(e, r),
            t
        }())).TYPE = {
            FRIENDS: "friends",
            FOLLOWERS: "followers",
            FOLLOWINGS: "followings",
            FRIENDREQUESTS: "friendrequests"
        },
        Wc = f,
        Ic = {
            observeVisibility: function(e, t) {
                var n = e.element
                  , r = e.threshold;
                try {
                    var a = new IntersectionObserver(function(e) {
                        e = e[0];
                        t(null == e ? void 0 : e.isIntersecting)
                    }
                    ,{
                        threshold: r
                    });
                    return a.observe(n),
                    function() {
                        return a.disconnect()
                    }
                } catch (e) {}
                return function() {}
            },
            observeChildrenVisibility: function(e, t) {
                var n = e.elements
                  , r = e.threshold;
                try {
                    var a = new window.IntersectionObserver(t,{
                        threshold: r
                    });
                    return n.forEach(function(e) {
                        a.observe(e)
                    }),
                    function() {
                        return a.disconnect()
                    }
                } catch (e) {}
                return function() {}
            }
        };
        var Cl, Tl, yc = (wl.prototype.getAbsoluteUrl = function(e) {
            if ("number" != typeof e)
                return null;
            var t = m.EnvironmentUrls.websiteUrl
              , e = ou.formatUrl({
                pathname: this.getRelativePath(e)
            });
            return ou.resolveUrl(t, e)
        }
        ,
        wl.prototype.navigateTo = function(e) {
            e = this.getAbsoluteUrl(e);
            e && window.location.assign(e)
        }
        ,
        wl);
        function Al() {
            return null !== Tl && Tl.apply(this, arguments) || this
        }
        var El, Sl, hc = ((Cl = function(e, t) {
            return (Cl = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            )(e, t)
        }
        ,
        function(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
            function n() {
                this.constructor = e
            }
            Cl(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        )(Al, Tl = yc),
        Al.prototype.getRelativePath = function(e) {
            return "/games/" + e
        }
        ,
        Al.prototype.getReferralPath = function() {
            return "/games/refer"
        }
        ,
        Al);
        function Rl() {
            return null !== Sl && Sl.apply(this, arguments) || this
        }
        var Ll, ql, f = ((El = function(e, t) {
            return (El = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            )(e, t)
        }
        ,
        function(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
            function n() {
                this.constructor = e
            }
            El(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        )(Rl, Sl = yc),
        Rl.prototype.getRelativePath = function(e) {
            return "/groups/" + e
        }
        ,
        Rl.prototype.getReferralPath = function() {
            return "/groups/refer"
        }
        ,
        Rl);
        function Ul() {
            return null !== ql && ql.apply(this, arguments) || this
        }
        var yc = ((Ll = function(e, t) {
            return (Ll = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            )(e, t)
        }
        ,
        function(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
            function n() {
                this.constructor = e
            }
            Ll(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        )(Ul, ql = yc),
        Ul.prototype.getRelativePath = function(e) {
            return "/users/" + e + "/profile"
        }
        ,
        Ul.prototype.getReferralPath = function() {
            return "/users/refer"
        }
        ,
        Ul)
          , hc = {
            game: new hc,
            group: new f,
            user: new yc
        }
          , f = jQuery
          , Ol = $l.n(f)
          , Dl = function() {
            return (Dl = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }
            ).apply(this, arguments)
        }
          , _l = !1
          , yc = function(e) {
            !e && _l || (Ol().ajaxPrefilter(function(h) {
                var v = h.error;
                return h.error = function(t, e, n) {
                    var r = "Generic Challenge:"
                      , a = "rblx-challenge-id"
                      , o = "rblx-challenge-type"
                      , i = "rblx-challenge-metadata"
                      , s = t.getAllResponseHeaders()
                      , u = {};
                    s && s.trim().split(/[\r\n]+/).forEach(function(e) {
                        var t = e.split(": ")
                          , e = t.shift()
                          , t = t.join(": ");
                        u[e] = t
                    });
                    var c = u["rblx-challenge-id"]
                      , l = u["rblx-challenge-type"]
                      , d = u["rblx-challenge-metadata"]
                      , s = void 0 !== c || void 0 !== l || void 0 !== d;
                    if (void 0 !== c && void 0 !== l && void 0 !== d) {
                        if (g() && g().AccountIntegrityChallengeService)
                            return void g().AccountIntegrityChallengeService.Generic.interceptChallenge({
                                retryRequest: function(e, t) {
                                    var n;
                                    h.headers = Dl(Dl({}, h.headers), ((n = {})[a] = e,
                                    n[o] = l,
                                    n[i] = t,
                                    n)),
                                    Ol().ajax(h)
                                },
                                containerId: "generic-challenge-container",
                                challengeId: c,
                                challengeTypeRaw: l,
                                challengeMetadataJsonBase64: d
                            }).catch(function(e) {
                                void 0 !== v && v(t, "error", e)
                            });
                        console.error(r, "Got challenge but challenge component not available")
                    } else
                        s && console.error(r, "Got only partial challenge headers");
                    void 0 !== v && v(t, e, n)
                }
                ,
                h
            }),
            _l = !0)
        };
        _l || yc();
        var f = yc
          , xl = "RBXCatalogUpsellData"
          , Bl = /RBXCatalogUpsellData=([^;]+)/
          , Nl = "UpsellUuid"
          , Fl = /((\/[\w-]+)+)\/(\d+)/g;
        function kl() {
            var e = xl + "=;path=/;domain=." + m.EnvironmentUrls.domain + ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
            document.cookie.includes(xl) && (document.cookie = e)
        }
        function Ml() {
            var e = Bl.exec(document.cookie)
              , t = ou.getQueryParam(Nl);
            if (!Array.isArray(e) || 2 !== e.length || !t)
                return kl(),
                {};
            var n = decodeURIComponent(e[1]).split(",");
            if (11 !== n.length)
                return kl(),
                {};
            var r = n[0]
              , a = n[1]
              , o = n[2]
              , i = n[3]
              , s = n[4]
              , u = n[5]
              , c = n[6] || void 0
              , l = n[7] || void 0
              , d = n[8] || void 0
              , h = n[9] || void 0
              , e = n[10] || void 0
              , n = Fl.exec(a);
            return Fl.lastIndex = 0,
            t === r && m.CurrentUser.userId === o && n ? {
                upsellUuid: r,
                targetItemUrl: a,
                userId: o,
                returnUrl: ou.formatUrl({
                    pathname: a,
                    query: ((a = {})[Nl] = r,
                    a)
                }),
                expectedCurrency: i,
                expectedPrice: s,
                expectedSellerId: u,
                userAssetId: c,
                productId: l,
                collectibleItemId: d,
                collectibleItemInstanceId: h,
                collectibleProductId: e
            } : (kl(),
            {})
        }
        var yc = {
            expireUpsellCookie: kl,
            getUpsellUuid: function() {
                var e = ou.getQueryParam(Nl);
                if (e || !document.cookie.includes(xl)) {
                    if (e && document.cookie.includes(xl))
                        if (e !== Ml().upsellUuid)
                            return void kl();
                    return e
                }
                kl()
            },
            parseUpsellCookie: Ml,
            constants: {
                UPSELL_COOKIE_KEY: xl,
                UPSELL_COOKIE_KEY_REGEX: Bl,
                UPSELL_QUERY_PARAM_KEY: Nl,
                UPSELL_TARGET_ITEM_URL_COOKIE_DATA_REGEX: Fl,
                UPSELL_TARGET_ITEM_URL_REGEX: /((\/[\w-]+)+)\/(\d+)/g
            }
        }
          , jl = ["click", "dblclick", "focus", "hover", "keypress", "mousedown", "mouseenter", "mouseover", "scroll", "touchmove", "touchstart"]
          , zl = 1e3
          , Vl = 6e5
          , Hl = 2e4
          , Wl = 1
          , Kl = "/universal-app-configuration/v1/behaviors/page-heartbeat-v2/content"
          , Xl = function(e, i, s, u) {
            return new (s = s || Promise)(function(n, t) {
                function r(e) {
                    try {
                        o(u.next(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function a(e) {
                    try {
                        o(u.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }
                function o(e) {
                    var t;
                    e.done ? n(e.value) : ((t = e.value)instanceof s ? t : new s(function(e) {
                        e(t)
                    }
                    )).then(r, a)
                }
                o((u = u.apply(e, i || [])).next())
            }
            )
        }
          , Jl = function(n, r) {
            var a, o, i, s = {
                label: 0,
                sent: function() {
                    if (1 & i[0])
                        throw i[1];
                    return i[1]
                },
                trys: [],
                ops: []
            }, e = {
                next: t(0),
                throw: t(1),
                return: t(2)
            };
            return "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                return this
            }
            ),
            e;
            function t(t) {
                return function(e) {
                    return function(t) {
                        if (a)
                            throw new TypeError("Generator is already executing.");
                        for (; s; )
                            try {
                                if (a = 1,
                                o && (i = 2 & t[0] ? o.return : t[0] ? o.throw || ((i = o.return) && i.call(o),
                                0) : o.next) && !(i = i.call(o, t[1])).done)
                                    return i;
                                switch (o = 0,
                                i && (t = [2 & t[0], i.value]),
                                t[0]) {
                                case 0:
                                case 1:
                                    i = t;
                                    break;
                                case 4:
                                    return s.label++,
                                    {
                                        value: t[1],
                                        done: !1
                                    };
                                case 5:
                                    s.label++,
                                    o = t[1],
                                    t = [0];
                                    continue;
                                case 7:
                                    t = s.ops.pop(),
                                    s.trys.pop();
                                    continue;
                                default:
                                    if (!(i = 0 < (i = s.trys).length && i[i.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                        s = 0;
                                        continue
                                    }
                                    if (3 === t[0] && (!i || t[1] > i[0] && t[1] < i[3])) {
                                        s.label = t[1];
                                        break
                                    }
                                    if (6 === t[0] && s.label < i[1]) {
                                        s.label = i[1],
                                        i = t;
                                        break
                                    }
                                    if (i && s.label < i[2]) {
                                        s.label = i[2],
                                        s.ops.push(t);
                                        break
                                    }
                                    i[2] && s.ops.pop(),
                                    s.trys.pop();
                                    continue
                                }
                                t = r.call(n, s)
                            } catch (e) {
                                t = [6, e],
                                o = 0
                            } finally {
                                a = i = 0
                            }
                        if (5 & t[0])
                            throw t[1];
                        return {
                            value: t[0] ? t[1] : void 0,
                            done: !0
                        }
                    }([t, e])
                }
            }
        }
          , Ql = (Yl.prototype.createWorker = function() {
            var e = (null !== (e = m.EnvironmentUrls.websiteUrl) && void 0 !== e ? e : "URL_NOT_FOUND") + "/worker-resources/script/?component=PageHeartbeatWorker&?v=" + this.workerVersion;
            return new Worker(e)
        }
        ,
        Yl.prototype.onActiveEvent = function() {
            this.lastActiveTime = new Date
        }
        ,
        Yl.prototype.start = function() {
            var e = this;
            this.isRunning || (this.worker ? this.worker.postMessage(this.heartbeatPulseIntervalMs) : setInterval(function() {
                return e.onInterval(e, {})
            }, this.heartbeatPulseIntervalMs),
            this.isRunning = !0)
        }
        ,
        Yl.prototype.onInterval = function(e, t) {
            var n = new Date
              , n = new Date(n.getTime() - e.activityTimeoutMs);
            this.lastActiveTime >= n && (g().EventStream.SendEventWithTarget("pageHeartbeat_v2", "heartbeat" + e.heartbeatCount, {}, g().EventStream.TargetTypes.WWW),
            e.incrementCount())
        }
        ,
        Yl.prototype.incrementCount = function() {
            this.heartbeatCount += 1
        }
        ,
        Yl);
        function Yl(e, t, n) {
            var r = this;
            this.isRunning = !1,
            this.lastActiveTime = new Date,
            this.heartbeatCount = 1,
            this.heartbeatPulseIntervalMs = e,
            this.activityTimeoutMs = t,
            this.workerVersion = n,
            window.Worker ? (this.worker = this.createWorker(),
            this.worker && (this.worker.onmessage = function(e) {
                return r.onInterval(r, e)
            }
            )) : this.worker = null
        }
        window.CoreRobloxUtilities = {
            cryptoUtil: Gt,
            boundAuthTokensHttpUtil: He,
            chatService: bt,
            dataStores: ie,
            entityUrl: hc,
            eventStreamService: Ae,
            fido2Util: wc,
            initializeGenericChallengeInterceptor: f,
            paymentFlowAnalyticsService: Qc,
            hybridService: dc,
            hybridResponseService: vc,
            localStorageService: Bi,
            localStorageNames: Bc,
            sessionStorageService: pc,
            playGameService: zu,
            userInfoService: Wc,
            metricsService: $c,
            deepLinkService: bc,
            elementVisibilityService: Ic,
            upsellUtil: yc
        },
        function() {
            var r;
            return Xl(this, void 0, Promise, function() {
                var t, n;
                return Jl(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return [4, function() {
                            var n;
                            return Xl(this, void 0, Promise, function() {
                                var t;
                                return Jl(this, function(e) {
                                    switch (e.label) {
                                    case 0:
                                        t = m.EnvironmentUrls.apiGatewayUrl,
                                        e.label = 1;
                                    case 1:
                                        return e.trys.push([1, 3, , 4]),
                                        [4, rt.get({
                                            url: "" + t + Kl
                                        })];
                                    case 2:
                                        return t = e.sent(),
                                        (t = null == t ? void 0 : t.data) ? [2, {
                                            isEnabled: Boolean(t.isEnabled),
                                            rolloutPermille: null !== (n = t.rolloutPermille) && void 0 !== n ? n : zl,
                                            activityTimeoutMs: null !== (n = t.activityTimeoutMs) && void 0 !== n ? n : Vl,
                                            heartbeatPulseIntervalMs: null !== (n = t.heartbeatPulseIntervalMs) && void 0 !== n ? n : Hl,
                                            workerVersion: null !== (n = t.workerVersion) && void 0 !== n ? n : Wl
                                        }] : [2, {
                                            isEnabled: !0,
                                            rolloutPermille: zl,
                                            activityTimeoutMs: Vl,
                                            heartbeatPulseIntervalMs: Hl,
                                            workerVersion: Wl
                                        }];
                                    case 3:
                                        return e.sent(),
                                        [2, {
                                            isEnabled: !0,
                                            rolloutPermille: zl,
                                            activityTimeoutMs: Vl,
                                            heartbeatPulseIntervalMs: Hl,
                                            workerVersion: Wl
                                        }];
                                    case 4:
                                        return [2]
                                    }
                                })
                            })
                        }()];
                    case 1:
                        return (t = e.sent()).isEnabled && null !== (r = g().CurrentUser) && void 0 !== r && r.userId && parseInt(g().CurrentUser.userId, 10) % 1e3 < t.rolloutPermille ? (n = new Ql(t.heartbeatPulseIntervalMs,t.activityTimeoutMs,t.workerVersion),
                        jl.forEach(function(e) {
                            window.addEventListener(e, function() {
                                n.onActiveEvent()
                            })
                        }),
                        n.start(),
                        [2]) : [2]
                    }
                })
            })
        }().catch(console.error)
    }()
}();
//# sourceMappingURL=https://js.rbxcdn.com/0649eca62111293357b7c7c35433c922-coreRobloxUtilities.bundle.min.js.map

/* Bundle detector */
window.Roblox && window.Roblox.BundleDetector && window.Roblox.BundleDetector.bundleDetected("CoreRobloxUtilities");
