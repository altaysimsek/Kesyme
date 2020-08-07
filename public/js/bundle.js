(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw ((a.code = "MODULE_NOT_FOUND"), a);
        }
        var p = (n[i] = { exports: {} });
        e[i][0].call(
          p.exports,
          function (r) {
            var n = e[i][1][r];
            return o(n || r);
          },
          p,
          p.exports,
          r,
          e,
          n,
          t
        );
      }
      return n[i].exports;
    }
    for (
      var u = "function" == typeof require && require, i = 0;
      i < t.length;
      i++
    )
      o(t[i]);
    return o;
  }
  return r;
})()(
  {
    1: [
      function (require, module, exports) {
        // shim for using process in browser
        var process = (module.exports = {});

        // cached from whatever global is present so that test runners that stub it
        // don't break things.  But we need to wrap it in a try catch in case it is
        // wrapped in strict mode code which doesn't define any globals.  It's inside a
        // function because try/catches deoptimize in certain engines.

        var cachedSetTimeout;
        var cachedClearTimeout;

        function defaultSetTimout() {
          throw new Error("setTimeout has not been defined");
        }
        function defaultClearTimeout() {
          throw new Error("clearTimeout has not been defined");
        }
        (function () {
          try {
            if (typeof setTimeout === "function") {
              cachedSetTimeout = setTimeout;
            } else {
              cachedSetTimeout = defaultSetTimout;
            }
          } catch (e) {
            cachedSetTimeout = defaultSetTimout;
          }
          try {
            if (typeof clearTimeout === "function") {
              cachedClearTimeout = clearTimeout;
            } else {
              cachedClearTimeout = defaultClearTimeout;
            }
          } catch (e) {
            cachedClearTimeout = defaultClearTimeout;
          }
        })();
        function runTimeout(fun) {
          if (cachedSetTimeout === setTimeout) {
            //normal enviroments in sane situations
            return setTimeout(fun, 0);
          }
          // if setTimeout wasn't available but was latter defined
          if (
            (cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) &&
            setTimeout
          ) {
            cachedSetTimeout = setTimeout;
            return setTimeout(fun, 0);
          }
          try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedSetTimeout(fun, 0);
          } catch (e) {
            try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
              return cachedSetTimeout.call(null, fun, 0);
            } catch (e) {
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
              return cachedSetTimeout.call(this, fun, 0);
            }
          }
        }
        function runClearTimeout(marker) {
          if (cachedClearTimeout === clearTimeout) {
            //normal enviroments in sane situations
            return clearTimeout(marker);
          }
          // if clearTimeout wasn't available but was latter defined
          if (
            (cachedClearTimeout === defaultClearTimeout ||
              !cachedClearTimeout) &&
            clearTimeout
          ) {
            cachedClearTimeout = clearTimeout;
            return clearTimeout(marker);
          }
          try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedClearTimeout(marker);
          } catch (e) {
            try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
              return cachedClearTimeout.call(null, marker);
            } catch (e) {
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
              // Some versions of I.E. have different rules for clearTimeout vs setTimeout
              return cachedClearTimeout.call(this, marker);
            }
          }
        }
        var queue = [];
        var draining = false;
        var currentQueue;
        var queueIndex = -1;

        function cleanUpNextTick() {
          if (!draining || !currentQueue) {
            return;
          }
          draining = false;
          if (currentQueue.length) {
            queue = currentQueue.concat(queue);
          } else {
            queueIndex = -1;
          }
          if (queue.length) {
            drainQueue();
          }
        }

        function drainQueue() {
          if (draining) {
            return;
          }
          var timeout = runTimeout(cleanUpNextTick);
          draining = true;

          var len = queue.length;
          while (len) {
            currentQueue = queue;
            queue = [];
            while (++queueIndex < len) {
              if (currentQueue) {
                currentQueue[queueIndex].run();
              }
            }
            queueIndex = -1;
            len = queue.length;
          }
          currentQueue = null;
          draining = false;
          runClearTimeout(timeout);
        }

        process.nextTick = function (fun) {
          var args = new Array(arguments.length - 1);
          if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
              args[i - 1] = arguments[i];
            }
          }
          queue.push(new Item(fun, args));
          if (queue.length === 1 && !draining) {
            runTimeout(drainQueue);
          }
        };

        // v8 likes predictible objects
        function Item(fun, array) {
          this.fun = fun;
          this.array = array;
        }
        Item.prototype.run = function () {
          this.fun.apply(null, this.array);
        };
        process.title = "browser";
        process.browser = true;
        process.env = {};
        process.argv = [];
        process.version = ""; // empty string to avoid regexp issues
        process.versions = {};

        function noop() {}

        process.on = noop;
        process.addListener = noop;
        process.once = noop;
        process.off = noop;
        process.removeListener = noop;
        process.removeAllListeners = noop;
        process.emit = noop;
        process.prependListener = noop;
        process.prependOnceListener = noop;

        process.listeners = function (name) {
          return [];
        };

        process.binding = function (name) {
          throw new Error("process.binding is not supported");
        };

        process.cwd = function () {
          return "/";
        };
        process.chdir = function (dir) {
          throw new Error("process.chdir is not supported");
        };
        process.umask = function () {
          return 0;
        };
      },
      {},
    ],
    2: [
      function (require, module, exports) {
        module.exports = require("./lib/axios");
      },
      { "./lib/axios": 4 },
    ],
    3: [
      function (require, module, exports) {
        "use strict";

        var utils = require("./../utils");
        var settle = require("./../core/settle");
        var buildURL = require("./../helpers/buildURL");
        var buildFullPath = require("../core/buildFullPath");
        var parseHeaders = require("./../helpers/parseHeaders");
        var isURLSameOrigin = require("./../helpers/isURLSameOrigin");
        var createError = require("../core/createError");

        module.exports = function xhrAdapter(config) {
          return new Promise(function dispatchXhrRequest(resolve, reject) {
            var requestData = config.data;
            var requestHeaders = config.headers;

            if (utils.isFormData(requestData)) {
              delete requestHeaders["Content-Type"]; // Let the browser set it
            }

            var request = new XMLHttpRequest();

            // HTTP basic authentication
            if (config.auth) {
              var username = config.auth.username || "";
              var password = config.auth.password || "";
              requestHeaders.Authorization =
                "Basic " + btoa(username + ":" + password);
            }

            var fullPath = buildFullPath(config.baseURL, config.url);
            request.open(
              config.method.toUpperCase(),
              buildURL(fullPath, config.params, config.paramsSerializer),
              true
            );

            // Set the request timeout in MS
            request.timeout = config.timeout;

            // Listen for ready state
            request.onreadystatechange = function handleLoad() {
              if (!request || request.readyState !== 4) {
                return;
              }

              // The request errored out and we didn't get a response, this will be
              // handled by onerror instead
              // With one exception: request that using file: protocol, most browsers
              // will return status as 0 even though it's a successful request
              if (
                request.status === 0 &&
                !(
                  request.responseURL &&
                  request.responseURL.indexOf("file:") === 0
                )
              ) {
                return;
              }

              // Prepare the response
              var responseHeaders =
                "getAllResponseHeaders" in request
                  ? parseHeaders(request.getAllResponseHeaders())
                  : null;
              var responseData =
                !config.responseType || config.responseType === "text"
                  ? request.responseText
                  : request.response;
              var response = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config: config,
                request: request,
              };

              settle(resolve, reject, response);

              // Clean up request
              request = null;
            };

            // Handle browser request cancellation (as opposed to a manual cancellation)
            request.onabort = function handleAbort() {
              if (!request) {
                return;
              }

              reject(
                createError("Request aborted", config, "ECONNABORTED", request)
              );

              // Clean up request
              request = null;
            };

            // Handle low level network errors
            request.onerror = function handleError() {
              // Real errors are hidden from us by the browser
              // onerror should only fire if it's a network error
              reject(createError("Network Error", config, null, request));

              // Clean up request
              request = null;
            };

            // Handle timeout
            request.ontimeout = function handleTimeout() {
              var timeoutErrorMessage =
                "timeout of " + config.timeout + "ms exceeded";
              if (config.timeoutErrorMessage) {
                timeoutErrorMessage = config.timeoutErrorMessage;
              }
              reject(
                createError(
                  timeoutErrorMessage,
                  config,
                  "ECONNABORTED",
                  request
                )
              );

              // Clean up request
              request = null;
            };

            // Add xsrf header
            // This is only done if running in a standard browser environment.
            // Specifically not if we're in a web worker, or react-native.
            if (utils.isStandardBrowserEnv()) {
              var cookies = require("./../helpers/cookies");

              // Add xsrf header
              var xsrfValue =
                (config.withCredentials || isURLSameOrigin(fullPath)) &&
                config.xsrfCookieName
                  ? cookies.read(config.xsrfCookieName)
                  : undefined;

              if (xsrfValue) {
                requestHeaders[config.xsrfHeaderName] = xsrfValue;
              }
            }

            // Add headers to the request
            if ("setRequestHeader" in request) {
              utils.forEach(requestHeaders, function setRequestHeader(
                val,
                key
              ) {
                if (
                  typeof requestData === "undefined" &&
                  key.toLowerCase() === "content-type"
                ) {
                  // Remove Content-Type if data is undefined
                  delete requestHeaders[key];
                } else {
                  // Otherwise add header to the request
                  request.setRequestHeader(key, val);
                }
              });
            }

            // Add withCredentials to request if needed
            if (!utils.isUndefined(config.withCredentials)) {
              request.withCredentials = !!config.withCredentials;
            }

            // Add responseType to request if needed
            if (config.responseType) {
              try {
                request.responseType = config.responseType;
              } catch (e) {
                // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
                // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
                if (config.responseType !== "json") {
                  throw e;
                }
              }
            }

            // Handle progress if needed
            if (typeof config.onDownloadProgress === "function") {
              request.addEventListener("progress", config.onDownloadProgress);
            }

            // Not all browsers support upload events
            if (
              typeof config.onUploadProgress === "function" &&
              request.upload
            ) {
              request.upload.addEventListener(
                "progress",
                config.onUploadProgress
              );
            }

            if (config.cancelToken) {
              // Handle cancellation
              config.cancelToken.promise.then(function onCanceled(cancel) {
                if (!request) {
                  return;
                }

                request.abort();
                reject(cancel);
                // Clean up request
                request = null;
              });
            }

            if (requestData === undefined) {
              requestData = null;
            }

            // Send the request
            request.send(requestData);
          });
        };
      },
      {
        "../core/buildFullPath": 10,
        "../core/createError": 11,
        "./../core/settle": 15,
        "./../helpers/buildURL": 19,
        "./../helpers/cookies": 21,
        "./../helpers/isURLSameOrigin": 23,
        "./../helpers/parseHeaders": 25,
        "./../utils": 27,
      },
    ],
    4: [
      function (require, module, exports) {
        "use strict";

        var utils = require("./utils");
        var bind = require("./helpers/bind");
        var Axios = require("./core/Axios");
        var mergeConfig = require("./core/mergeConfig");
        var defaults = require("./defaults");

        /**
         * Create an instance of Axios
         *
         * @param {Object} defaultConfig The default config for the instance
         * @return {Axios} A new instance of Axios
         */
        function createInstance(defaultConfig) {
          var context = new Axios(defaultConfig);
          var instance = bind(Axios.prototype.request, context);

          // Copy axios.prototype to instance
          utils.extend(instance, Axios.prototype, context);

          // Copy context to instance
          utils.extend(instance, context);

          return instance;
        }

        // Create the default instance to be exported
        var axios = createInstance(defaults);

        // Expose Axios class to allow class inheritance
        axios.Axios = Axios;

        // Factory for creating new instances
        axios.create = function create(instanceConfig) {
          return createInstance(mergeConfig(axios.defaults, instanceConfig));
        };

        // Expose Cancel & CancelToken
        axios.Cancel = require("./cancel/Cancel");
        axios.CancelToken = require("./cancel/CancelToken");
        axios.isCancel = require("./cancel/isCancel");

        // Expose all/spread
        axios.all = function all(promises) {
          return Promise.all(promises);
        };
        axios.spread = require("./helpers/spread");

        module.exports = axios;

        // Allow use of default import syntax in TypeScript
        module.exports.default = axios;
      },
      {
        "./cancel/Cancel": 5,
        "./cancel/CancelToken": 6,
        "./cancel/isCancel": 7,
        "./core/Axios": 8,
        "./core/mergeConfig": 14,
        "./defaults": 17,
        "./helpers/bind": 18,
        "./helpers/spread": 26,
        "./utils": 27,
      },
    ],
    5: [
      function (require, module, exports) {
        "use strict";

        /**
         * A `Cancel` is an object that is thrown when an operation is canceled.
         *
         * @class
         * @param {string=} message The message.
         */
        function Cancel(message) {
          this.message = message;
        }

        Cancel.prototype.toString = function toString() {
          return "Cancel" + (this.message ? ": " + this.message : "");
        };

        Cancel.prototype.__CANCEL__ = true;

        module.exports = Cancel;
      },
      {},
    ],
    6: [
      function (require, module, exports) {
        "use strict";

        var Cancel = require("./Cancel");

        /**
         * A `CancelToken` is an object that can be used to request cancellation of an operation.
         *
         * @class
         * @param {Function} executor The executor function.
         */
        function CancelToken(executor) {
          if (typeof executor !== "function") {
            throw new TypeError("executor must be a function.");
          }

          var resolvePromise;
          this.promise = new Promise(function promiseExecutor(resolve) {
            resolvePromise = resolve;
          });

          var token = this;
          executor(function cancel(message) {
            if (token.reason) {
              // Cancellation has already been requested
              return;
            }

            token.reason = new Cancel(message);
            resolvePromise(token.reason);
          });
        }

        /**
         * Throws a `Cancel` if cancellation has been requested.
         */
        CancelToken.prototype.throwIfRequested = function throwIfRequested() {
          if (this.reason) {
            throw this.reason;
          }
        };

        /**
         * Returns an object that contains a new `CancelToken` and a function that, when called,
         * cancels the `CancelToken`.
         */
        CancelToken.source = function source() {
          var cancel;
          var token = new CancelToken(function executor(c) {
            cancel = c;
          });
          return {
            token: token,
            cancel: cancel,
          };
        };

        module.exports = CancelToken;
      },
      { "./Cancel": 5 },
    ],
    7: [
      function (require, module, exports) {
        "use strict";

        module.exports = function isCancel(value) {
          return !!(value && value.__CANCEL__);
        };
      },
      {},
    ],
    8: [
      function (require, module, exports) {
        "use strict";

        var utils = require("./../utils");
        var buildURL = require("../helpers/buildURL");
        var InterceptorManager = require("./InterceptorManager");
        var dispatchRequest = require("./dispatchRequest");
        var mergeConfig = require("./mergeConfig");

        /**
         * Create a new instance of Axios
         *
         * @param {Object} instanceConfig The default config for the instance
         */
        function Axios(instanceConfig) {
          this.defaults = instanceConfig;
          this.interceptors = {
            request: new InterceptorManager(),
            response: new InterceptorManager(),
          };
        }

        /**
         * Dispatch a request
         *
         * @param {Object} config The config specific for this request (merged with this.defaults)
         */
        Axios.prototype.request = function request(config) {
          /*eslint no-param-reassign:0*/
          // Allow for axios('example/url'[, config]) a la fetch API
          if (typeof config === "string") {
            config = arguments[1] || {};
            config.url = arguments[0];
          } else {
            config = config || {};
          }

          config = mergeConfig(this.defaults, config);

          // Set config.method
          if (config.method) {
            config.method = config.method.toLowerCase();
          } else if (this.defaults.method) {
            config.method = this.defaults.method.toLowerCase();
          } else {
            config.method = "get";
          }

          // Hook up interceptors middleware
          var chain = [dispatchRequest, undefined];
          var promise = Promise.resolve(config);

          this.interceptors.request.forEach(function unshiftRequestInterceptors(
            interceptor
          ) {
            chain.unshift(interceptor.fulfilled, interceptor.rejected);
          });

          this.interceptors.response.forEach(function pushResponseInterceptors(
            interceptor
          ) {
            chain.push(interceptor.fulfilled, interceptor.rejected);
          });

          while (chain.length) {
            promise = promise.then(chain.shift(), chain.shift());
          }

          return promise;
        };

        Axios.prototype.getUri = function getUri(config) {
          config = mergeConfig(this.defaults, config);
          return buildURL(
            config.url,
            config.params,
            config.paramsSerializer
          ).replace(/^\?/, "");
        };

        // Provide aliases for supported request methods
        utils.forEach(
          ["delete", "get", "head", "options"],
          function forEachMethodNoData(method) {
            /*eslint func-names:0*/
            Axios.prototype[method] = function (url, config) {
              return this.request(
                utils.merge(config || {}, {
                  method: method,
                  url: url,
                })
              );
            };
          }
        );

        utils.forEach(["post", "put", "patch"], function forEachMethodWithData(
          method
        ) {
          /*eslint func-names:0*/
          Axios.prototype[method] = function (url, data, config) {
            return this.request(
              utils.merge(config || {}, {
                method: method,
                url: url,
                data: data,
              })
            );
          };
        });

        module.exports = Axios;
      },
      {
        "../helpers/buildURL": 19,
        "./../utils": 27,
        "./InterceptorManager": 9,
        "./dispatchRequest": 12,
        "./mergeConfig": 14,
      },
    ],
    9: [
      function (require, module, exports) {
        "use strict";

        var utils = require("./../utils");

        function InterceptorManager() {
          this.handlers = [];
        }

        /**
         * Add a new interceptor to the stack
         *
         * @param {Function} fulfilled The function to handle `then` for a `Promise`
         * @param {Function} rejected The function to handle `reject` for a `Promise`
         *
         * @return {Number} An ID used to remove interceptor later
         */
        InterceptorManager.prototype.use = function use(fulfilled, rejected) {
          this.handlers.push({
            fulfilled: fulfilled,
            rejected: rejected,
          });
          return this.handlers.length - 1;
        };

        /**
         * Remove an interceptor from the stack
         *
         * @param {Number} id The ID that was returned by `use`
         */
        InterceptorManager.prototype.eject = function eject(id) {
          if (this.handlers[id]) {
            this.handlers[id] = null;
          }
        };

        /**
         * Iterate over all the registered interceptors
         *
         * This method is particularly useful for skipping over any
         * interceptors that may have become `null` calling `eject`.
         *
         * @param {Function} fn The function to call for each interceptor
         */
        InterceptorManager.prototype.forEach = function forEach(fn) {
          utils.forEach(this.handlers, function forEachHandler(h) {
            if (h !== null) {
              fn(h);
            }
          });
        };

        module.exports = InterceptorManager;
      },
      { "./../utils": 27 },
    ],
    10: [
      function (require, module, exports) {
        "use strict";

        var isAbsoluteURL = require("../helpers/isAbsoluteURL");
        var combineURLs = require("../helpers/combineURLs");

        /**
         * Creates a new URL by combining the baseURL with the requestedURL,
         * only when the requestedURL is not already an absolute URL.
         * If the requestURL is absolute, this function returns the requestedURL untouched.
         *
         * @param {string} baseURL The base URL
         * @param {string} requestedURL Absolute or relative URL to combine
         * @returns {string} The combined full path
         */
        module.exports = function buildFullPath(baseURL, requestedURL) {
          if (baseURL && !isAbsoluteURL(requestedURL)) {
            return combineURLs(baseURL, requestedURL);
          }
          return requestedURL;
        };
      },
      { "../helpers/combineURLs": 20, "../helpers/isAbsoluteURL": 22 },
    ],
    11: [
      function (require, module, exports) {
        "use strict";

        var enhanceError = require("./enhanceError");

        /**
         * Create an Error with the specified message, config, error code, request and response.
         *
         * @param {string} message The error message.
         * @param {Object} config The config.
         * @param {string} [code] The error code (for example, 'ECONNABORTED').
         * @param {Object} [request] The request.
         * @param {Object} [response] The response.
         * @returns {Error} The created error.
         */
        module.exports = function createError(
          message,
          config,
          code,
          request,
          response
        ) {
          var error = new Error(message);
          return enhanceError(error, config, code, request, response);
        };
      },
      { "./enhanceError": 13 },
    ],
    12: [
      function (require, module, exports) {
        "use strict";

        var utils = require("./../utils");
        var transformData = require("./transformData");
        var isCancel = require("../cancel/isCancel");
        var defaults = require("../defaults");

        /**
         * Throws a `Cancel` if cancellation has been requested.
         */
        function throwIfCancellationRequested(config) {
          if (config.cancelToken) {
            config.cancelToken.throwIfRequested();
          }
        }

        /**
         * Dispatch a request to the server using the configured adapter.
         *
         * @param {object} config The config that is to be used for the request
         * @returns {Promise} The Promise to be fulfilled
         */
        module.exports = function dispatchRequest(config) {
          throwIfCancellationRequested(config);

          // Ensure headers exist
          config.headers = config.headers || {};

          // Transform request data
          config.data = transformData(
            config.data,
            config.headers,
            config.transformRequest
          );

          // Flatten headers
          config.headers = utils.merge(
            config.headers.common || {},
            config.headers[config.method] || {},
            config.headers
          );

          utils.forEach(
            ["delete", "get", "head", "post", "put", "patch", "common"],
            function cleanHeaderConfig(method) {
              delete config.headers[method];
            }
          );

          var adapter = config.adapter || defaults.adapter;

          return adapter(config).then(
            function onAdapterResolution(response) {
              throwIfCancellationRequested(config);

              // Transform response data
              response.data = transformData(
                response.data,
                response.headers,
                config.transformResponse
              );

              return response;
            },
            function onAdapterRejection(reason) {
              if (!isCancel(reason)) {
                throwIfCancellationRequested(config);

                // Transform response data
                if (reason && reason.response) {
                  reason.response.data = transformData(
                    reason.response.data,
                    reason.response.headers,
                    config.transformResponse
                  );
                }
              }

              return Promise.reject(reason);
            }
          );
        };
      },
      {
        "../cancel/isCancel": 7,
        "../defaults": 17,
        "./../utils": 27,
        "./transformData": 16,
      },
    ],
    13: [
      function (require, module, exports) {
        "use strict";

        /**
         * Update an Error with the specified config, error code, and response.
         *
         * @param {Error} error The error to update.
         * @param {Object} config The config.
         * @param {string} [code] The error code (for example, 'ECONNABORTED').
         * @param {Object} [request] The request.
         * @param {Object} [response] The response.
         * @returns {Error} The error.
         */
        module.exports = function enhanceError(
          error,
          config,
          code,
          request,
          response
        ) {
          error.config = config;
          if (code) {
            error.code = code;
          }

          error.request = request;
          error.response = response;
          error.isAxiosError = true;

          error.toJSON = function () {
            return {
              // Standard
              message: this.message,
              name: this.name,
              // Microsoft
              description: this.description,
              number: this.number,
              // Mozilla
              fileName: this.fileName,
              lineNumber: this.lineNumber,
              columnNumber: this.columnNumber,
              stack: this.stack,
              // Axios
              config: this.config,
              code: this.code,
            };
          };
          return error;
        };
      },
      {},
    ],
    14: [
      function (require, module, exports) {
        "use strict";

        var utils = require("../utils");

        /**
         * Config-specific merge-function which creates a new config-object
         * by merging two configuration objects together.
         *
         * @param {Object} config1
         * @param {Object} config2
         * @returns {Object} New object resulting from merging config2 to config1
         */
        module.exports = function mergeConfig(config1, config2) {
          // eslint-disable-next-line no-param-reassign
          config2 = config2 || {};
          var config = {};

          var valueFromConfig2Keys = ["url", "method", "params", "data"];
          var mergeDeepPropertiesKeys = ["headers", "auth", "proxy"];
          var defaultToConfig2Keys = [
            "baseURL",
            "url",
            "transformRequest",
            "transformResponse",
            "paramsSerializer",
            "timeout",
            "withCredentials",
            "adapter",
            "responseType",
            "xsrfCookieName",
            "xsrfHeaderName",
            "onUploadProgress",
            "onDownloadProgress",
            "maxContentLength",
            "validateStatus",
            "maxRedirects",
            "httpAgent",
            "httpsAgent",
            "cancelToken",
            "socketPath",
          ];

          utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
            if (typeof config2[prop] !== "undefined") {
              config[prop] = config2[prop];
            }
          });

          utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(
            prop
          ) {
            if (utils.isObject(config2[prop])) {
              config[prop] = utils.deepMerge(config1[prop], config2[prop]);
            } else if (typeof config2[prop] !== "undefined") {
              config[prop] = config2[prop];
            } else if (utils.isObject(config1[prop])) {
              config[prop] = utils.deepMerge(config1[prop]);
            } else if (typeof config1[prop] !== "undefined") {
              config[prop] = config1[prop];
            }
          });

          utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
            if (typeof config2[prop] !== "undefined") {
              config[prop] = config2[prop];
            } else if (typeof config1[prop] !== "undefined") {
              config[prop] = config1[prop];
            }
          });

          var axiosKeys = valueFromConfig2Keys
            .concat(mergeDeepPropertiesKeys)
            .concat(defaultToConfig2Keys);

          var otherKeys = Object.keys(config2).filter(function filterAxiosKeys(
            key
          ) {
            return axiosKeys.indexOf(key) === -1;
          });

          utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
            if (typeof config2[prop] !== "undefined") {
              config[prop] = config2[prop];
            } else if (typeof config1[prop] !== "undefined") {
              config[prop] = config1[prop];
            }
          });

          return config;
        };
      },
      { "../utils": 27 },
    ],
    15: [
      function (require, module, exports) {
        "use strict";

        var createError = require("./createError");

        /**
         * Resolve or reject a Promise based on response status.
         *
         * @param {Function} resolve A function that resolves the promise.
         * @param {Function} reject A function that rejects the promise.
         * @param {object} response The response.
         */
        module.exports = function settle(resolve, reject, response) {
          var validateStatus = response.config.validateStatus;
          if (!validateStatus || validateStatus(response.status)) {
            resolve(response);
          } else {
            reject(
              createError(
                "Request failed with status code " + response.status,
                response.config,
                null,
                response.request,
                response
              )
            );
          }
        };
      },
      { "./createError": 11 },
    ],
    16: [
      function (require, module, exports) {
        "use strict";

        var utils = require("./../utils");

        /**
         * Transform the data for a request or a response
         *
         * @param {Object|String} data The data to be transformed
         * @param {Array} headers The headers for the request or response
         * @param {Array|Function} fns A single function or Array of functions
         * @returns {*} The resulting transformed data
         */
        module.exports = function transformData(data, headers, fns) {
          /*eslint no-param-reassign:0*/
          utils.forEach(fns, function transform(fn) {
            data = fn(data, headers);
          });

          return data;
        };
      },
      { "./../utils": 27 },
    ],
    17: [
      function (require, module, exports) {
        (function (process) {
          "use strict";

          var utils = require("./utils");
          var normalizeHeaderName = require("./helpers/normalizeHeaderName");

          var DEFAULT_CONTENT_TYPE = {
            "Content-Type": "application/x-www-form-urlencoded",
          };

          function setContentTypeIfUnset(headers, value) {
            if (
              !utils.isUndefined(headers) &&
              utils.isUndefined(headers["Content-Type"])
            ) {
              headers["Content-Type"] = value;
            }
          }

          function getDefaultAdapter() {
            var adapter;
            if (typeof XMLHttpRequest !== "undefined") {
              // For browsers use XHR adapter
              adapter = require("./adapters/xhr");
            } else if (
              typeof process !== "undefined" &&
              Object.prototype.toString.call(process) === "[object process]"
            ) {
              // For node use HTTP adapter
              adapter = require("./adapters/http");
            }
            return adapter;
          }

          var defaults = {
            adapter: getDefaultAdapter(),

            transformRequest: [
              function transformRequest(data, headers) {
                normalizeHeaderName(headers, "Accept");
                normalizeHeaderName(headers, "Content-Type");
                if (
                  utils.isFormData(data) ||
                  utils.isArrayBuffer(data) ||
                  utils.isBuffer(data) ||
                  utils.isStream(data) ||
                  utils.isFile(data) ||
                  utils.isBlob(data)
                ) {
                  return data;
                }
                if (utils.isArrayBufferView(data)) {
                  return data.buffer;
                }
                if (utils.isURLSearchParams(data)) {
                  setContentTypeIfUnset(
                    headers,
                    "application/x-www-form-urlencoded;charset=utf-8"
                  );
                  return data.toString();
                }
                if (utils.isObject(data)) {
                  setContentTypeIfUnset(
                    headers,
                    "application/json;charset=utf-8"
                  );
                  return JSON.stringify(data);
                }
                return data;
              },
            ],

            transformResponse: [
              function transformResponse(data) {
                /*eslint no-param-reassign:0*/
                if (typeof data === "string") {
                  try {
                    data = JSON.parse(data);
                  } catch (e) {
                    /* Ignore */
                  }
                }
                return data;
              },
            ],

            /**
             * A timeout in milliseconds to abort a request. If set to 0 (default) a
             * timeout is not created.
             */
            timeout: 0,

            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN",

            maxContentLength: -1,

            validateStatus: function validateStatus(status) {
              return status >= 200 && status < 300;
            },
          };

          defaults.headers = {
            common: {
              Accept: "application/json, text/plain, */*",
            },
          };

          utils.forEach(["delete", "get", "head"], function forEachMethodNoData(
            method
          ) {
            defaults.headers[method] = {};
          });

          utils.forEach(
            ["post", "put", "patch"],
            function forEachMethodWithData(method) {
              defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
            }
          );

          module.exports = defaults;
        }.call(this, require("_process")));
      },
      {
        "./adapters/http": 3,
        "./adapters/xhr": 3,
        "./helpers/normalizeHeaderName": 24,
        "./utils": 27,
        _process: 1,
      },
    ],
    18: [
      function (require, module, exports) {
        "use strict";

        module.exports = function bind(fn, thisArg) {
          return function wrap() {
            var args = new Array(arguments.length);
            for (var i = 0; i < args.length; i++) {
              args[i] = arguments[i];
            }
            return fn.apply(thisArg, args);
          };
        };
      },
      {},
    ],
    19: [
      function (require, module, exports) {
        "use strict";

        var utils = require("./../utils");

        function encode(val) {
          return encodeURIComponent(val)
            .replace(/%40/gi, "@")
            .replace(/%3A/gi, ":")
            .replace(/%24/g, "$")
            .replace(/%2C/gi, ",")
            .replace(/%20/g, "+")
            .replace(/%5B/gi, "[")
            .replace(/%5D/gi, "]");
        }

        /**
         * Build a URL by appending params to the end
         *
         * @param {string} url The base of the url (e.g., http://www.google.com)
         * @param {object} [params] The params to be appended
         * @returns {string} The formatted url
         */
        module.exports = function buildURL(url, params, paramsSerializer) {
          /*eslint no-param-reassign:0*/
          if (!params) {
            return url;
          }

          var serializedParams;
          if (paramsSerializer) {
            serializedParams = paramsSerializer(params);
          } else if (utils.isURLSearchParams(params)) {
            serializedParams = params.toString();
          } else {
            var parts = [];

            utils.forEach(params, function serialize(val, key) {
              if (val === null || typeof val === "undefined") {
                return;
              }

              if (utils.isArray(val)) {
                key = key + "[]";
              } else {
                val = [val];
              }

              utils.forEach(val, function parseValue(v) {
                if (utils.isDate(v)) {
                  v = v.toISOString();
                } else if (utils.isObject(v)) {
                  v = JSON.stringify(v);
                }
                parts.push(encode(key) + "=" + encode(v));
              });
            });

            serializedParams = parts.join("&");
          }

          if (serializedParams) {
            var hashmarkIndex = url.indexOf("#");
            if (hashmarkIndex !== -1) {
              url = url.slice(0, hashmarkIndex);
            }

            url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
          }

          return url;
        };
      },
      { "./../utils": 27 },
    ],
    20: [
      function (require, module, exports) {
        "use strict";

        /**
         * Creates a new URL by combining the specified URLs
         *
         * @param {string} baseURL The base URL
         * @param {string} relativeURL The relative URL
         * @returns {string} The combined URL
         */
        module.exports = function combineURLs(baseURL, relativeURL) {
          return relativeURL
            ? baseURL.replace(/\/+$/, "") +
                "/" +
                relativeURL.replace(/^\/+/, "")
            : baseURL;
        };
      },
      {},
    ],
    21: [
      function (require, module, exports) {
        "use strict";

        var utils = require("./../utils");

        module.exports = utils.isStandardBrowserEnv()
          ? // Standard browser envs support document.cookie
            (function standardBrowserEnv() {
              return {
                write: function write(
                  name,
                  value,
                  expires,
                  path,
                  domain,
                  secure
                ) {
                  var cookie = [];
                  cookie.push(name + "=" + encodeURIComponent(value));

                  if (utils.isNumber(expires)) {
                    cookie.push("expires=" + new Date(expires).toGMTString());
                  }

                  if (utils.isString(path)) {
                    cookie.push("path=" + path);
                  }

                  if (utils.isString(domain)) {
                    cookie.push("domain=" + domain);
                  }

                  if (secure === true) {
                    cookie.push("secure");
                  }

                  document.cookie = cookie.join("; ");
                },

                read: function read(name) {
                  var match = document.cookie.match(
                    new RegExp("(^|;\\s*)(" + name + ")=([^;]*)")
                  );
                  return match ? decodeURIComponent(match[3]) : null;
                },

                remove: function remove(name) {
                  this.write(name, "", Date.now() - 86400000);
                },
              };
            })()
          : // Non standard browser env (web workers, react-native) lack needed support.
            (function nonStandardBrowserEnv() {
              return {
                write: function write() {},
                read: function read() {
                  return null;
                },
                remove: function remove() {},
              };
            })();
      },
      { "./../utils": 27 },
    ],
    22: [
      function (require, module, exports) {
        "use strict";

        /**
         * Determines whether the specified URL is absolute
         *
         * @param {string} url The URL to test
         * @returns {boolean} True if the specified URL is absolute, otherwise false
         */
        module.exports = function isAbsoluteURL(url) {
          // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
          // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
          // by any combination of letters, digits, plus, period, or hyphen.
          return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
        };
      },
      {},
    ],
    23: [
      function (require, module, exports) {
        "use strict";

        var utils = require("./../utils");

        module.exports = utils.isStandardBrowserEnv()
          ? // Standard browser envs have full support of the APIs needed to test
            // whether the request URL is of the same origin as current location.
            (function standardBrowserEnv() {
              var msie = /(msie|trident)/i.test(navigator.userAgent);
              var urlParsingNode = document.createElement("a");
              var originURL;

              /**
               * Parse a URL to discover it's components
               *
               * @param {String} url The URL to be parsed
               * @returns {Object}
               */
              function resolveURL(url) {
                var href = url;

                if (msie) {
                  // IE needs attribute set twice to normalize properties
                  urlParsingNode.setAttribute("href", href);
                  href = urlParsingNode.href;
                }

                urlParsingNode.setAttribute("href", href);

                // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
                return {
                  href: urlParsingNode.href,
                  protocol: urlParsingNode.protocol
                    ? urlParsingNode.protocol.replace(/:$/, "")
                    : "",
                  host: urlParsingNode.host,
                  search: urlParsingNode.search
                    ? urlParsingNode.search.replace(/^\?/, "")
                    : "",
                  hash: urlParsingNode.hash
                    ? urlParsingNode.hash.replace(/^#/, "")
                    : "",
                  hostname: urlParsingNode.hostname,
                  port: urlParsingNode.port,
                  pathname:
                    urlParsingNode.pathname.charAt(0) === "/"
                      ? urlParsingNode.pathname
                      : "/" + urlParsingNode.pathname,
                };
              }

              originURL = resolveURL(window.location.href);

              /**
               * Determine if a URL shares the same origin as the current location
               *
               * @param {String} requestURL The URL to test
               * @returns {boolean} True if URL shares the same origin, otherwise false
               */
              return function isURLSameOrigin(requestURL) {
                var parsed = utils.isString(requestURL)
                  ? resolveURL(requestURL)
                  : requestURL;
                return (
                  parsed.protocol === originURL.protocol &&
                  parsed.host === originURL.host
                );
              };
            })()
          : // Non standard browser envs (web workers, react-native) lack needed support.
            (function nonStandardBrowserEnv() {
              return function isURLSameOrigin() {
                return true;
              };
            })();
      },
      { "./../utils": 27 },
    ],
    24: [
      function (require, module, exports) {
        "use strict";

        var utils = require("../utils");

        module.exports = function normalizeHeaderName(headers, normalizedName) {
          utils.forEach(headers, function processHeader(value, name) {
            if (
              name !== normalizedName &&
              name.toUpperCase() === normalizedName.toUpperCase()
            ) {
              headers[normalizedName] = value;
              delete headers[name];
            }
          });
        };
      },
      { "../utils": 27 },
    ],
    25: [
      function (require, module, exports) {
        "use strict";

        var utils = require("./../utils");

        // Headers whose duplicates are ignored by node
        // c.f. https://nodejs.org/api/http.html#http_message_headers
        var ignoreDuplicateOf = [
          "age",
          "authorization",
          "content-length",
          "content-type",
          "etag",
          "expires",
          "from",
          "host",
          "if-modified-since",
          "if-unmodified-since",
          "last-modified",
          "location",
          "max-forwards",
          "proxy-authorization",
          "referer",
          "retry-after",
          "user-agent",
        ];

        /**
         * Parse headers into an object
         *
         * ```
         * Date: Wed, 27 Aug 2014 08:58:49 GMT
         * Content-Type: application/json
         * Connection: keep-alive
         * Transfer-Encoding: chunked
         * ```
         *
         * @param {String} headers Headers needing to be parsed
         * @returns {Object} Headers parsed into an object
         */
        module.exports = function parseHeaders(headers) {
          var parsed = {};
          var key;
          var val;
          var i;

          if (!headers) {
            return parsed;
          }

          utils.forEach(headers.split("\n"), function parser(line) {
            i = line.indexOf(":");
            key = utils.trim(line.substr(0, i)).toLowerCase();
            val = utils.trim(line.substr(i + 1));

            if (key) {
              if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
                return;
              }
              if (key === "set-cookie") {
                parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
              } else {
                parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
              }
            }
          });

          return parsed;
        };
      },
      { "./../utils": 27 },
    ],
    26: [
      function (require, module, exports) {
        "use strict";

        /**
         * Syntactic sugar for invoking a function and expanding an array for arguments.
         *
         * Common use case would be to use `Function.prototype.apply`.
         *
         *  ```js
         *  function f(x, y, z) {}
         *  var args = [1, 2, 3];
         *  f.apply(null, args);
         *  ```
         *
         * With `spread` this example can be re-written.
         *
         *  ```js
         *  spread(function(x, y, z) {})([1, 2, 3]);
         *  ```
         *
         * @param {Function} callback
         * @returns {Function}
         */
        module.exports = function spread(callback) {
          return function wrap(arr) {
            return callback.apply(null, arr);
          };
        };
      },
      {},
    ],
    27: [
      function (require, module, exports) {
        "use strict";

        var bind = require("./helpers/bind");

        /*global toString:true*/

        // utils is a library of generic helper functions non-specific to axios

        var toString = Object.prototype.toString;

        /**
         * Determine if a value is an Array
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is an Array, otherwise false
         */
        function isArray(val) {
          return toString.call(val) === "[object Array]";
        }

        /**
         * Determine if a value is undefined
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if the value is undefined, otherwise false
         */
        function isUndefined(val) {
          return typeof val === "undefined";
        }

        /**
         * Determine if a value is a Buffer
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a Buffer, otherwise false
         */
        function isBuffer(val) {
          return (
            val !== null &&
            !isUndefined(val) &&
            val.constructor !== null &&
            !isUndefined(val.constructor) &&
            typeof val.constructor.isBuffer === "function" &&
            val.constructor.isBuffer(val)
          );
        }

        /**
         * Determine if a value is an ArrayBuffer
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is an ArrayBuffer, otherwise false
         */
        function isArrayBuffer(val) {
          return toString.call(val) === "[object ArrayBuffer]";
        }

        /**
         * Determine if a value is a FormData
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is an FormData, otherwise false
         */
        function isFormData(val) {
          return typeof FormData !== "undefined" && val instanceof FormData;
        }

        /**
         * Determine if a value is a view on an ArrayBuffer
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
         */
        function isArrayBufferView(val) {
          var result;
          if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
            result = ArrayBuffer.isView(val);
          } else {
            result = val && val.buffer && val.buffer instanceof ArrayBuffer;
          }
          return result;
        }

        /**
         * Determine if a value is a String
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a String, otherwise false
         */
        function isString(val) {
          return typeof val === "string";
        }

        /**
         * Determine if a value is a Number
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a Number, otherwise false
         */
        function isNumber(val) {
          return typeof val === "number";
        }

        /**
         * Determine if a value is an Object
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is an Object, otherwise false
         */
        function isObject(val) {
          return val !== null && typeof val === "object";
        }

        /**
         * Determine if a value is a Date
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a Date, otherwise false
         */
        function isDate(val) {
          return toString.call(val) === "[object Date]";
        }

        /**
         * Determine if a value is a File
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a File, otherwise false
         */
        function isFile(val) {
          return toString.call(val) === "[object File]";
        }

        /**
         * Determine if a value is a Blob
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a Blob, otherwise false
         */
        function isBlob(val) {
          return toString.call(val) === "[object Blob]";
        }

        /**
         * Determine if a value is a Function
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a Function, otherwise false
         */
        function isFunction(val) {
          return toString.call(val) === "[object Function]";
        }

        /**
         * Determine if a value is a Stream
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a Stream, otherwise false
         */
        function isStream(val) {
          return isObject(val) && isFunction(val.pipe);
        }

        /**
         * Determine if a value is a URLSearchParams object
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a URLSearchParams object, otherwise false
         */
        function isURLSearchParams(val) {
          return (
            typeof URLSearchParams !== "undefined" &&
            val instanceof URLSearchParams
          );
        }

        /**
         * Trim excess whitespace off the beginning and end of a string
         *
         * @param {String} str The String to trim
         * @returns {String} The String freed of excess whitespace
         */
        function trim(str) {
          return str.replace(/^\s*/, "").replace(/\s*$/, "");
        }

        /**
         * Determine if we're running in a standard browser environment
         *
         * This allows axios to run in a web worker, and react-native.
         * Both environments support XMLHttpRequest, but not fully standard globals.
         *
         * web workers:
         *  typeof window -> undefined
         *  typeof document -> undefined
         *
         * react-native:
         *  navigator.product -> 'ReactNative'
         * nativescript
         *  navigator.product -> 'NativeScript' or 'NS'
         */
        function isStandardBrowserEnv() {
          if (
            typeof navigator !== "undefined" &&
            (navigator.product === "ReactNative" ||
              navigator.product === "NativeScript" ||
              navigator.product === "NS")
          ) {
            return false;
          }
          return (
            typeof window !== "undefined" && typeof document !== "undefined"
          );
        }

        /**
         * Iterate over an Array or an Object invoking a function for each item.
         *
         * If `obj` is an Array callback will be called passing
         * the value, index, and complete array for each item.
         *
         * If 'obj' is an Object callback will be called passing
         * the value, key, and complete object for each property.
         *
         * @param {Object|Array} obj The object to iterate
         * @param {Function} fn The callback to invoke for each item
         */
        function forEach(obj, fn) {
          // Don't bother if no value provided
          if (obj === null || typeof obj === "undefined") {
            return;
          }

          // Force an array if not already something iterable
          if (typeof obj !== "object") {
            /*eslint no-param-reassign:0*/
            obj = [obj];
          }

          if (isArray(obj)) {
            // Iterate over array values
            for (var i = 0, l = obj.length; i < l; i++) {
              fn.call(null, obj[i], i, obj);
            }
          } else {
            // Iterate over object keys
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) {
                fn.call(null, obj[key], key, obj);
              }
            }
          }
        }

        /**
         * Accepts varargs expecting each argument to be an object, then
         * immutably merges the properties of each object and returns result.
         *
         * When multiple objects contain the same key the later object in
         * the arguments list will take precedence.
         *
         * Example:
         *
         * ```js
         * var result = merge({foo: 123}, {foo: 456});
         * console.log(result.foo); // outputs 456
         * ```
         *
         * @param {Object} obj1 Object to merge
         * @returns {Object} Result of all merge properties
         */
        function merge(/* obj1, obj2, obj3, ... */) {
          var result = {};
          function assignValue(val, key) {
            if (typeof result[key] === "object" && typeof val === "object") {
              result[key] = merge(result[key], val);
            } else {
              result[key] = val;
            }
          }

          for (var i = 0, l = arguments.length; i < l; i++) {
            forEach(arguments[i], assignValue);
          }
          return result;
        }

        /**
         * Function equal to merge with the difference being that no reference
         * to original objects is kept.
         *
         * @see merge
         * @param {Object} obj1 Object to merge
         * @returns {Object} Result of all merge properties
         */
        function deepMerge(/* obj1, obj2, obj3, ... */) {
          var result = {};
          function assignValue(val, key) {
            if (typeof result[key] === "object" && typeof val === "object") {
              result[key] = deepMerge(result[key], val);
            } else if (typeof val === "object") {
              result[key] = deepMerge({}, val);
            } else {
              result[key] = val;
            }
          }

          for (var i = 0, l = arguments.length; i < l; i++) {
            forEach(arguments[i], assignValue);
          }
          return result;
        }

        /**
         * Extends object a by mutably adding to it the properties of object b.
         *
         * @param {Object} a The object to be extended
         * @param {Object} b The object to copy properties from
         * @param {Object} thisArg The object to bind function to
         * @return {Object} The resulting value of object a
         */
        function extend(a, b, thisArg) {
          forEach(b, function assignValue(val, key) {
            if (thisArg && typeof val === "function") {
              a[key] = bind(val, thisArg);
            } else {
              a[key] = val;
            }
          });
          return a;
        }

        module.exports = {
          isArray: isArray,
          isArrayBuffer: isArrayBuffer,
          isBuffer: isBuffer,
          isFormData: isFormData,
          isArrayBufferView: isArrayBufferView,
          isString: isString,
          isNumber: isNumber,
          isObject: isObject,
          isUndefined: isUndefined,
          isDate: isDate,
          isFile: isFile,
          isBlob: isBlob,
          isFunction: isFunction,
          isStream: isStream,
          isURLSearchParams: isURLSearchParams,
          isStandardBrowserEnv: isStandardBrowserEnv,
          forEach: forEach,
          merge: merge,
          deepMerge: deepMerge,
          extend: extend,
          trim: trim,
        };
      },
      { "./helpers/bind": 18 },
    ],
    28: [
      function (require, module, exports) {
        /*!
         * validate.js 0.13.1
         *
         * (c) 2013-2019 Nicklas Ansman, 2013 Wrapp
         * Validate.js may be freely distributed under the MIT license.
         * For all details and documentation:
         * http://validatejs.org/
         */

        (function (exports, module, define) {
          "use strict";

          // The main function that calls the validators specified by the constraints.
          // The options are the following:
          //   - format (string) - An option that controls how the returned value is formatted
          //     * flat - Returns a flat array of just the error messages
          //     * grouped - Returns the messages grouped by attribute (default)
          //     * detailed - Returns an array of the raw validation data
          //   - fullMessages (boolean) - If `true` (default) the attribute name is prepended to the error.
          //
          // Please note that the options are also passed to each validator.
          var validate = function (attributes, constraints, options) {
            options = v.extend({}, v.options, options);

            var results = v.runValidations(attributes, constraints, options),
              attr,
              validator;

            if (
              results.some(function (r) {
                return v.isPromise(r.error);
              })
            ) {
              throw new Error(
                "Use validate.async if you want support for promises"
              );
            }
            return validate.processValidationResults(results, options);
          };

          var v = validate;

          // Copies over attributes from one or more sources to a single destination.
          // Very much similar to underscore's extend.
          // The first argument is the target object and the remaining arguments will be
          // used as sources.
          v.extend = function (obj) {
            [].slice.call(arguments, 1).forEach(function (source) {
              for (var attr in source) {
                obj[attr] = source[attr];
              }
            });
            return obj;
          };

          v.extend(validate, {
            // This is the version of the library as a semver.
            // The toString function will allow it to be coerced into a string
            version: {
              major: 0,
              minor: 13,
              patch: 1,
              metadata: null,
              toString: function () {
                var version = v.format("%{major}.%{minor}.%{patch}", v.version);
                if (!v.isEmpty(v.version.metadata)) {
                  version += "+" + v.version.metadata;
                }
                return version;
              },
            },

            // Below is the dependencies that are used in validate.js

            // The constructor of the Promise implementation.
            // If you are using Q.js, RSVP or any other A+ compatible implementation
            // override this attribute to be the constructor of that promise.
            // Since jQuery promises aren't A+ compatible they won't work.
            Promise:
              typeof Promise !== "undefined"
                ? Promise
                : /* istanbul ignore next */ null,

            EMPTY_STRING_REGEXP: /^\s*$/,

            // Runs the validators specified by the constraints object.
            // Will return an array of the format:
            //     [{attribute: "<attribute name>", error: "<validation result>"}, ...]
            runValidations: function (attributes, constraints, options) {
              var results = [],
                attr,
                validatorName,
                value,
                validators,
                validator,
                validatorOptions,
                error;

              if (v.isDomElement(attributes) || v.isJqueryElement(attributes)) {
                attributes = v.collectFormValues(attributes);
              }

              // Loops through each constraints, finds the correct validator and run it.
              for (attr in constraints) {
                value = v.getDeepObjectValue(attributes, attr);
                // This allows the constraints for an attribute to be a function.
                // The function will be called with the value, attribute name, the complete dict of
                // attributes as well as the options and constraints passed in.
                // This is useful when you want to have different
                // validations depending on the attribute value.
                validators = v.result(
                  constraints[attr],
                  value,
                  attributes,
                  attr,
                  options,
                  constraints
                );

                for (validatorName in validators) {
                  validator = v.validators[validatorName];

                  if (!validator) {
                    error = v.format("Unknown validator %{name}", {
                      name: validatorName,
                    });
                    throw new Error(error);
                  }

                  validatorOptions = validators[validatorName];
                  // This allows the options to be a function. The function will be
                  // called with the value, attribute name, the complete dict of
                  // attributes as well as the options and constraints passed in.
                  // This is useful when you want to have different
                  // validations depending on the attribute value.
                  validatorOptions = v.result(
                    validatorOptions,
                    value,
                    attributes,
                    attr,
                    options,
                    constraints
                  );
                  if (!validatorOptions) {
                    continue;
                  }
                  results.push({
                    attribute: attr,
                    value: value,
                    validator: validatorName,
                    globalOptions: options,
                    attributes: attributes,
                    options: validatorOptions,
                    error: validator.call(
                      validator,
                      value,
                      validatorOptions,
                      attr,
                      attributes,
                      options
                    ),
                  });
                }
              }

              return results;
            },

            // Takes the output from runValidations and converts it to the correct
            // output format.
            processValidationResults: function (errors, options) {
              errors = v.pruneEmptyErrors(errors, options);
              errors = v.expandMultipleErrors(errors, options);
              errors = v.convertErrorMessages(errors, options);

              var format = options.format || "grouped";

              if (typeof v.formatters[format] === "function") {
                errors = v.formatters[format](errors);
              } else {
                throw new Error(v.format("Unknown format %{format}", options));
              }

              return v.isEmpty(errors) ? undefined : errors;
            },

            // Runs the validations with support for promises.
            // This function will return a promise that is settled when all the
            // validation promises have been completed.
            // It can be called even if no validations returned a promise.
            async: function (attributes, constraints, options) {
              options = v.extend({}, v.async.options, options);

              var WrapErrors =
                options.wrapErrors ||
                function (errors) {
                  return errors;
                };

              // Removes unknown attributes
              if (options.cleanAttributes !== false) {
                attributes = v.cleanAttributes(attributes, constraints);
              }

              var results = v.runValidations(attributes, constraints, options);

              return new v.Promise(function (resolve, reject) {
                v.waitForResults(results).then(
                  function () {
                    var errors = v.processValidationResults(results, options);
                    if (errors) {
                      reject(
                        new WrapErrors(errors, options, attributes, constraints)
                      );
                    } else {
                      resolve(attributes);
                    }
                  },
                  function (err) {
                    reject(err);
                  }
                );
              });
            },

            single: function (value, constraints, options) {
              options = v.extend({}, v.single.options, options, {
                format: "flat",
                fullMessages: false,
              });
              return v({ single: value }, { single: constraints }, options);
            },

            // Returns a promise that is resolved when all promises in the results array
            // are settled. The promise returned from this function is always resolved,
            // never rejected.
            // This function modifies the input argument, it replaces the promises
            // with the value returned from the promise.
            waitForResults: function (results) {
              // Create a sequence of all the results starting with a resolved promise.
              return results.reduce(
                function (memo, result) {
                  // If this result isn't a promise skip it in the sequence.
                  if (!v.isPromise(result.error)) {
                    return memo;
                  }

                  return memo.then(function () {
                    return result.error.then(function (error) {
                      result.error = error || null;
                    });
                  });
                },
                new v.Promise(function (r) {
                  r();
                })
              ); // A resolved promise
            },

            // If the given argument is a call: function the and: function return the value
            // otherwise just return the value. Additional arguments will be passed as
            // arguments to the function.
            // Example:
            // ```
            // result('foo') // 'foo'
            // result(Math.max, 1, 2) // 2
            // ```
            result: function (value) {
              var args = [].slice.call(arguments, 1);
              if (typeof value === "function") {
                value = value.apply(null, args);
              }
              return value;
            },

            // Checks if the value is a number. This function does not consider NaN a
            // number like many other `isNumber` functions do.
            isNumber: function (value) {
              return typeof value === "number" && !isNaN(value);
            },

            // Returns false if the object is not a function
            isFunction: function (value) {
              return typeof value === "function";
            },

            // A simple check to verify that the value is an integer. Uses `isNumber`
            // and a simple modulo check.
            isInteger: function (value) {
              return v.isNumber(value) && value % 1 === 0;
            },

            // Checks if the value is a boolean
            isBoolean: function (value) {
              return typeof value === "boolean";
            },

            // Uses the `Object` function to check if the given argument is an object.
            isObject: function (obj) {
              return obj === Object(obj);
            },

            // Simply checks if the object is an instance of a date
            isDate: function (obj) {
              return obj instanceof Date;
            },

            // Returns false if the object is `null` of `undefined`
            isDefined: function (obj) {
              return obj !== null && obj !== undefined;
            },

            // Checks if the given argument is a promise. Anything with a `then`
            // function is considered a promise.
            isPromise: function (p) {
              return !!p && v.isFunction(p.then);
            },

            isJqueryElement: function (o) {
              return o && v.isString(o.jquery);
            },

            isDomElement: function (o) {
              if (!o) {
                return false;
              }

              if (!o.querySelectorAll || !o.querySelector) {
                return false;
              }

              if (v.isObject(document) && o === document) {
                return true;
              }

              // http://stackoverflow.com/a/384380/699304
              /* istanbul ignore else */
              if (typeof HTMLElement === "object") {
                return o instanceof HTMLElement;
              } else {
                return (
                  o &&
                  typeof o === "object" &&
                  o !== null &&
                  o.nodeType === 1 &&
                  typeof o.nodeName === "string"
                );
              }
            },

            isEmpty: function (value) {
              var attr;

              // Null and undefined are empty
              if (!v.isDefined(value)) {
                return true;
              }

              // functions are non empty
              if (v.isFunction(value)) {
                return false;
              }

              // Whitespace only strings are empty
              if (v.isString(value)) {
                return v.EMPTY_STRING_REGEXP.test(value);
              }

              // For arrays we use the length property
              if (v.isArray(value)) {
                return value.length === 0;
              }

              // Dates have no attributes but aren't empty
              if (v.isDate(value)) {
                return false;
              }

              // If we find at least one property we consider it non empty
              if (v.isObject(value)) {
                for (attr in value) {
                  return false;
                }
                return true;
              }

              return false;
            },

            // Formats the specified strings with the given values like so:
            // ```
            // format("Foo: %{foo}", {foo: "bar"}) // "Foo bar"
            // ```
            // If you want to write %{...} without having it replaced simply
            // prefix it with % like this `Foo: %%{foo}` and it will be returned
            // as `"Foo: %{foo}"`
            format: v.extend(
              function (str, vals) {
                if (!v.isString(str)) {
                  return str;
                }
                return str.replace(v.format.FORMAT_REGEXP, function (
                  m0,
                  m1,
                  m2
                ) {
                  if (m1 === "%") {
                    return "%{" + m2 + "}";
                  } else {
                    return String(vals[m2]);
                  }
                });
              },
              {
                // Finds %{key} style patterns in the given string
                FORMAT_REGEXP: /(%?)%\{([^\}]+)\}/g,
              }
            ),

            // "Prettifies" the given string.
            // Prettifying means replacing [.\_-] with spaces as well as splitting
            // camel case words.
            prettify: function (str) {
              if (v.isNumber(str)) {
                // If there are more than 2 decimals round it to two
                if ((str * 100) % 1 === 0) {
                  return "" + str;
                } else {
                  return parseFloat(Math.round(str * 100) / 100).toFixed(2);
                }
              }

              if (v.isArray(str)) {
                return str
                  .map(function (s) {
                    return v.prettify(s);
                  })
                  .join(", ");
              }

              if (v.isObject(str)) {
                if (!v.isDefined(str.toString)) {
                  return JSON.stringify(str);
                }

                return str.toString();
              }

              // Ensure the string is actually a string
              str = "" + str;

              return (
                str
                  // Splits keys separated by periods
                  .replace(/([^\s])\.([^\s])/g, "$1 $2")
                  // Removes backslashes
                  .replace(/\\+/g, "")
                  // Replaces - and - with space
                  .replace(/[_-]/g, " ")
                  // Splits camel cased words
                  .replace(/([a-z])([A-Z])/g, function (m0, m1, m2) {
                    return "" + m1 + " " + m2.toLowerCase();
                  })
                  .toLowerCase()
              );
            },

            stringifyValue: function (value, options) {
              var prettify = (options && options.prettify) || v.prettify;
              return prettify(value);
            },

            isString: function (value) {
              return typeof value === "string";
            },

            isArray: function (value) {
              return {}.toString.call(value) === "[object Array]";
            },

            // Checks if the object is a hash, which is equivalent to an object that
            // is neither an array nor a function.
            isHash: function (value) {
              return (
                v.isObject(value) && !v.isArray(value) && !v.isFunction(value)
              );
            },

            contains: function (obj, value) {
              if (!v.isDefined(obj)) {
                return false;
              }
              if (v.isArray(obj)) {
                return obj.indexOf(value) !== -1;
              }
              return value in obj;
            },

            unique: function (array) {
              if (!v.isArray(array)) {
                return array;
              }
              return array.filter(function (el, index, array) {
                return array.indexOf(el) == index;
              });
            },

            forEachKeyInKeypath: function (object, keypath, callback) {
              if (!v.isString(keypath)) {
                return undefined;
              }

              var key = "",
                i,
                escape = false;

              for (i = 0; i < keypath.length; ++i) {
                switch (keypath[i]) {
                  case ".":
                    if (escape) {
                      escape = false;
                      key += ".";
                    } else {
                      object = callback(object, key, false);
                      key = "";
                    }
                    break;

                  case "\\":
                    if (escape) {
                      escape = false;
                      key += "\\";
                    } else {
                      escape = true;
                    }
                    break;

                  default:
                    escape = false;
                    key += keypath[i];
                    break;
                }
              }

              return callback(object, key, true);
            },

            getDeepObjectValue: function (obj, keypath) {
              if (!v.isObject(obj)) {
                return undefined;
              }

              return v.forEachKeyInKeypath(obj, keypath, function (obj, key) {
                if (v.isObject(obj)) {
                  return obj[key];
                }
              });
            },

            // This returns an object with all the values of the form.
            // It uses the input name as key and the value as value
            // So for example this:
            // <input type="text" name="email" value="foo@bar.com" />
            // would return:
            // {email: "foo@bar.com"}
            collectFormValues: function (form, options) {
              var values = {},
                i,
                j,
                input,
                inputs,
                option,
                value;

              if (v.isJqueryElement(form)) {
                form = form[0];
              }

              if (!form) {
                return values;
              }

              options = options || {};

              inputs = form.querySelectorAll("input[name], textarea[name]");
              for (i = 0; i < inputs.length; ++i) {
                input = inputs.item(i);

                if (v.isDefined(input.getAttribute("data-ignored"))) {
                  continue;
                }

                var name = input.name.replace(/\./g, "\\\\.");
                value = v.sanitizeFormValue(input.value, options);
                if (input.type === "number") {
                  value = value ? +value : null;
                } else if (input.type === "checkbox") {
                  if (input.attributes.value) {
                    if (!input.checked) {
                      value = values[name] || null;
                    }
                  } else {
                    value = input.checked;
                  }
                } else if (input.type === "radio") {
                  if (!input.checked) {
                    value = values[name] || null;
                  }
                }
                values[name] = value;
              }

              inputs = form.querySelectorAll("select[name]");
              for (i = 0; i < inputs.length; ++i) {
                input = inputs.item(i);
                if (v.isDefined(input.getAttribute("data-ignored"))) {
                  continue;
                }

                if (input.multiple) {
                  value = [];
                  for (j in input.options) {
                    option = input.options[j];
                    if (option && option.selected) {
                      value.push(v.sanitizeFormValue(option.value, options));
                    }
                  }
                } else {
                  var _val =
                    typeof input.options[input.selectedIndex] !== "undefined"
                      ? input.options[input.selectedIndex].value
                      : /* istanbul ignore next */ "";
                  value = v.sanitizeFormValue(_val, options);
                }
                values[input.name] = value;
              }

              return values;
            },

            sanitizeFormValue: function (value, options) {
              if (options.trim && v.isString(value)) {
                value = value.trim();
              }

              if (options.nullify !== false && value === "") {
                return null;
              }
              return value;
            },

            capitalize: function (str) {
              if (!v.isString(str)) {
                return str;
              }
              return str[0].toUpperCase() + str.slice(1);
            },

            // Remove all errors who's error attribute is empty (null or undefined)
            pruneEmptyErrors: function (errors) {
              return errors.filter(function (error) {
                return !v.isEmpty(error.error);
              });
            },

            // In
            // [{error: ["err1", "err2"], ...}]
            // Out
            // [{error: "err1", ...}, {error: "err2", ...}]
            //
            // All attributes in an error with multiple messages are duplicated
            // when expanding the errors.
            expandMultipleErrors: function (errors) {
              var ret = [];
              errors.forEach(function (error) {
                // Removes errors without a message
                if (v.isArray(error.error)) {
                  error.error.forEach(function (msg) {
                    ret.push(v.extend({}, error, { error: msg }));
                  });
                } else {
                  ret.push(error);
                }
              });
              return ret;
            },

            // Converts the error mesages by prepending the attribute name unless the
            // message is prefixed by ^
            convertErrorMessages: function (errors, options) {
              options = options || {};

              var ret = [],
                prettify = options.prettify || v.prettify;
              errors.forEach(function (errorInfo) {
                var error = v.result(
                  errorInfo.error,
                  errorInfo.value,
                  errorInfo.attribute,
                  errorInfo.options,
                  errorInfo.attributes,
                  errorInfo.globalOptions
                );

                if (!v.isString(error)) {
                  ret.push(errorInfo);
                  return;
                }

                if (error[0] === "^") {
                  error = error.slice(1);
                } else if (options.fullMessages !== false) {
                  error =
                    v.capitalize(prettify(errorInfo.attribute)) + " " + error;
                }
                error = error.replace(/\\\^/g, "^");
                error = v.format(error, {
                  value: v.stringifyValue(errorInfo.value, options),
                });
                ret.push(v.extend({}, errorInfo, { error: error }));
              });
              return ret;
            },

            // In:
            // [{attribute: "<attributeName>", ...}]
            // Out:
            // {"<attributeName>": [{attribute: "<attributeName>", ...}]}
            groupErrorsByAttribute: function (errors) {
              var ret = {};
              errors.forEach(function (error) {
                var list = ret[error.attribute];
                if (list) {
                  list.push(error);
                } else {
                  ret[error.attribute] = [error];
                }
              });
              return ret;
            },

            // In:
            // [{error: "<message 1>", ...}, {error: "<message 2>", ...}]
            // Out:
            // ["<message 1>", "<message 2>"]
            flattenErrorsToArray: function (errors) {
              return errors
                .map(function (error) {
                  return error.error;
                })
                .filter(function (value, index, self) {
                  return self.indexOf(value) === index;
                });
            },

            cleanAttributes: function (attributes, whitelist) {
              function whitelistCreator(obj, key, last) {
                if (v.isObject(obj[key])) {
                  return obj[key];
                }
                return (obj[key] = last ? true : {});
              }

              function buildObjectWhitelist(whitelist) {
                var ow = {},
                  lastObject,
                  attr;
                for (attr in whitelist) {
                  if (!whitelist[attr]) {
                    continue;
                  }
                  v.forEachKeyInKeypath(ow, attr, whitelistCreator);
                }
                return ow;
              }

              function cleanRecursive(attributes, whitelist) {
                if (!v.isObject(attributes)) {
                  return attributes;
                }

                var ret = v.extend({}, attributes),
                  w,
                  attribute;

                for (attribute in attributes) {
                  w = whitelist[attribute];

                  if (v.isObject(w)) {
                    ret[attribute] = cleanRecursive(ret[attribute], w);
                  } else if (!w) {
                    delete ret[attribute];
                  }
                }
                return ret;
              }

              if (!v.isObject(whitelist) || !v.isObject(attributes)) {
                return {};
              }

              whitelist = buildObjectWhitelist(whitelist);
              return cleanRecursive(attributes, whitelist);
            },

            exposeModule: function (validate, root, exports, module, define) {
              if (exports) {
                if (module && module.exports) {
                  exports = module.exports = validate;
                }
                exports.validate = validate;
              } else {
                root.validate = validate;
                if (validate.isFunction(define) && define.amd) {
                  define([], function () {
                    return validate;
                  });
                }
              }
            },

            warn: function (msg) {
              if (typeof console !== "undefined" && console.warn) {
                console.warn("[validate.js] " + msg);
              }
            },

            error: function (msg) {
              if (typeof console !== "undefined" && console.error) {
                console.error("[validate.js] " + msg);
              }
            },
          });

          validate.validators = {
            // Presence validates that the value isn't empty
            presence: function (value, options) {
              options = v.extend({}, this.options, options);
              if (
                options.allowEmpty !== false
                  ? !v.isDefined(value)
                  : v.isEmpty(value)
              ) {
                return options.message || this.message || "can't be blank";
              }
            },
            length: function (value, options, attribute) {
              // Empty values are allowed
              if (!v.isDefined(value)) {
                return;
              }

              options = v.extend({}, this.options, options);

              var is = options.is,
                maximum = options.maximum,
                minimum = options.minimum,
                tokenizer =
                  options.tokenizer ||
                  function (val) {
                    return val;
                  },
                err,
                errors = [];

              value = tokenizer(value);
              var length = value.length;
              if (!v.isNumber(length)) {
                return (
                  options.message || this.notValid || "has an incorrect length"
                );
              }

              // Is checks
              if (v.isNumber(is) && length !== is) {
                err =
                  options.wrongLength ||
                  this.wrongLength ||
                  "is the wrong length (should be %{count} characters)";
                errors.push(v.format(err, { count: is }));
              }

              if (v.isNumber(minimum) && length < minimum) {
                err =
                  options.tooShort ||
                  this.tooShort ||
                  "is too short (minimum is %{count} characters)";
                errors.push(v.format(err, { count: minimum }));
              }

              if (v.isNumber(maximum) && length > maximum) {
                err =
                  options.tooLong ||
                  this.tooLong ||
                  "is too long (maximum is %{count} characters)";
                errors.push(v.format(err, { count: maximum }));
              }

              if (errors.length > 0) {
                return options.message || errors;
              }
            },
            numericality: function (
              value,
              options,
              attribute,
              attributes,
              globalOptions
            ) {
              // Empty values are fine
              if (!v.isDefined(value)) {
                return;
              }

              options = v.extend({}, this.options, options);

              var errors = [],
                name,
                count,
                checks = {
                  greaterThan: function (v, c) {
                    return v > c;
                  },
                  greaterThanOrEqualTo: function (v, c) {
                    return v >= c;
                  },
                  equalTo: function (v, c) {
                    return v === c;
                  },
                  lessThan: function (v, c) {
                    return v < c;
                  },
                  lessThanOrEqualTo: function (v, c) {
                    return v <= c;
                  },
                  divisibleBy: function (v, c) {
                    return v % c === 0;
                  },
                },
                prettify =
                  options.prettify ||
                  (globalOptions && globalOptions.prettify) ||
                  v.prettify;

              // Strict will check that it is a valid looking number
              if (v.isString(value) && options.strict) {
                var pattern = "^-?(0|[1-9]\\d*)";
                if (!options.onlyInteger) {
                  pattern += "(\\.\\d+)?";
                }
                pattern += "$";

                if (!new RegExp(pattern).test(value)) {
                  return (
                    options.message ||
                    options.notValid ||
                    this.notValid ||
                    this.message ||
                    "must be a valid number"
                  );
                }
              }

              // Coerce the value to a number unless we're being strict.
              if (
                options.noStrings !== true &&
                v.isString(value) &&
                !v.isEmpty(value)
              ) {
                value = +value;
              }

              // If it's not a number we shouldn't continue since it will compare it.
              if (!v.isNumber(value)) {
                return (
                  options.message ||
                  options.notValid ||
                  this.notValid ||
                  this.message ||
                  "is not a number"
                );
              }

              // Same logic as above, sort of. Don't bother with comparisons if this
              // doesn't pass.
              if (options.onlyInteger && !v.isInteger(value)) {
                return (
                  options.message ||
                  options.notInteger ||
                  this.notInteger ||
                  this.message ||
                  "must be an integer"
                );
              }

              for (name in checks) {
                count = options[name];
                if (v.isNumber(count) && !checks[name](value, count)) {
                  // This picks the default message if specified
                  // For example the greaterThan check uses the message from
                  // this.notGreaterThan so we capitalize the name and prepend "not"
                  var key = "not" + v.capitalize(name);
                  var msg =
                    options[key] ||
                    this[key] ||
                    this.message ||
                    "must be %{type} %{count}";

                  errors.push(
                    v.format(msg, {
                      count: count,
                      type: prettify(name),
                    })
                  );
                }
              }

              if (options.odd && value % 2 !== 1) {
                errors.push(
                  options.notOdd || this.notOdd || this.message || "must be odd"
                );
              }
              if (options.even && value % 2 !== 0) {
                errors.push(
                  options.notEven ||
                    this.notEven ||
                    this.message ||
                    "must be even"
                );
              }

              if (errors.length) {
                return options.message || errors;
              }
            },
            datetime: v.extend(
              function (value, options) {
                if (!v.isFunction(this.parse) || !v.isFunction(this.format)) {
                  throw new Error(
                    "Both the parse and format functions needs to be set to use the datetime/date validator"
                  );
                }

                // Empty values are fine
                if (!v.isDefined(value)) {
                  return;
                }

                options = v.extend({}, this.options, options);

                var err,
                  errors = [],
                  earliest = options.earliest
                    ? this.parse(options.earliest, options)
                    : NaN,
                  latest = options.latest
                    ? this.parse(options.latest, options)
                    : NaN;

                value = this.parse(value, options);

                // 86400000 is the number of milliseconds in a day, this is used to remove
                // the time from the date
                if (
                  isNaN(value) ||
                  (options.dateOnly && value % 86400000 !== 0)
                ) {
                  err =
                    options.notValid ||
                    options.message ||
                    this.notValid ||
                    "must be a valid date";
                  return v.format(err, { value: arguments[0] });
                }

                if (!isNaN(earliest) && value < earliest) {
                  err =
                    options.tooEarly ||
                    options.message ||
                    this.tooEarly ||
                    "must be no earlier than %{date}";
                  err = v.format(err, {
                    value: this.format(value, options),
                    date: this.format(earliest, options),
                  });
                  errors.push(err);
                }

                if (!isNaN(latest) && value > latest) {
                  err =
                    options.tooLate ||
                    options.message ||
                    this.tooLate ||
                    "must be no later than %{date}";
                  err = v.format(err, {
                    date: this.format(latest, options),
                    value: this.format(value, options),
                  });
                  errors.push(err);
                }

                if (errors.length) {
                  return v.unique(errors);
                }
              },
              {
                parse: null,
                format: null,
              }
            ),
            date: function (value, options) {
              options = v.extend({}, options, { dateOnly: true });
              return v.validators.datetime.call(
                v.validators.datetime,
                value,
                options
              );
            },
            format: function (value, options) {
              if (v.isString(options) || options instanceof RegExp) {
                options = { pattern: options };
              }

              options = v.extend({}, this.options, options);

              var message = options.message || this.message || "is invalid",
                pattern = options.pattern,
                match;

              // Empty values are allowed
              if (!v.isDefined(value)) {
                return;
              }
              if (!v.isString(value)) {
                return message;
              }

              if (v.isString(pattern)) {
                pattern = new RegExp(options.pattern, options.flags);
              }
              match = pattern.exec(value);
              if (!match || match[0].length != value.length) {
                return message;
              }
            },
            inclusion: function (value, options) {
              // Empty values are fine
              if (!v.isDefined(value)) {
                return;
              }
              if (v.isArray(options)) {
                options = { within: options };
              }
              options = v.extend({}, this.options, options);
              if (v.contains(options.within, value)) {
                return;
              }
              var message =
                options.message ||
                this.message ||
                "^%{value} is not included in the list";
              return v.format(message, { value: value });
            },
            exclusion: function (value, options) {
              // Empty values are fine
              if (!v.isDefined(value)) {
                return;
              }
              if (v.isArray(options)) {
                options = { within: options };
              }
              options = v.extend({}, this.options, options);
              if (!v.contains(options.within, value)) {
                return;
              }
              var message =
                options.message || this.message || "^%{value} is restricted";
              if (v.isString(options.within[value])) {
                value = options.within[value];
              }
              return v.format(message, { value: value });
            },
            email: v.extend(
              function (value, options) {
                options = v.extend({}, this.options, options);
                var message =
                  options.message || this.message || "is not a valid email";
                // Empty values are fine
                if (!v.isDefined(value)) {
                  return;
                }
                if (!v.isString(value)) {
                  return message;
                }
                if (!this.PATTERN.exec(value)) {
                  return message;
                }
              },
              {
                PATTERN: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i,
              }
            ),
            equality: function (
              value,
              options,
              attribute,
              attributes,
              globalOptions
            ) {
              if (!v.isDefined(value)) {
                return;
              }

              if (v.isString(options)) {
                options = { attribute: options };
              }
              options = v.extend({}, this.options, options);
              var message =
                options.message ||
                this.message ||
                "is not equal to %{attribute}";

              if (
                v.isEmpty(options.attribute) ||
                !v.isString(options.attribute)
              ) {
                throw new Error("The attribute must be a non empty string");
              }

              var otherValue = v.getDeepObjectValue(
                  attributes,
                  options.attribute
                ),
                comparator =
                  options.comparator ||
                  function (v1, v2) {
                    return v1 === v2;
                  },
                prettify =
                  options.prettify ||
                  (globalOptions && globalOptions.prettify) ||
                  v.prettify;

              if (
                !comparator(value, otherValue, options, attribute, attributes)
              ) {
                return v.format(message, {
                  attribute: prettify(options.attribute),
                });
              }
            },
            // A URL validator that is used to validate URLs with the ability to
            // restrict schemes and some domains.
            url: function (value, options) {
              if (!v.isDefined(value)) {
                return;
              }

              options = v.extend({}, this.options, options);

              var message =
                  options.message || this.message || "is not a valid url",
                schemes = options.schemes || this.schemes || ["http", "https"],
                allowLocal = options.allowLocal || this.allowLocal || false,
                allowDataUrl =
                  options.allowDataUrl || this.allowDataUrl || false;
              if (!v.isString(value)) {
                return message;
              }

              // https://gist.github.com/dperini/729294
              var regex =
                "^" +
                // protocol identifier
                "(?:(?:" +
                schemes.join("|") +
                ")://)" +
                // user:pass authentication
                "(?:\\S+(?::\\S*)?@)?" +
                "(?:";

              var tld = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))";

              if (allowLocal) {
                tld += "?";
              } else {
                regex +=
                  // IP address exclusion
                  // private & local networks
                  "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
                  "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
                  "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})";
              }

              regex +=
                // IP address dotted notation octets
                // excludes loopback network 0.0.0.0
                // excludes reserved space >= 224.0.0.0
                // excludes network & broacast addresses
                // (first & last IP address of each class)
                "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
                "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
                "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
                "|" +
                // host name
                "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
                // domain name
                "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
                tld +
                ")" +
                // port number
                "(?::\\d{2,5})?" +
                // resource path
                "(?:[/?#]\\S*)?" +
                "$";

              if (allowDataUrl) {
                // RFC 2397
                var mediaType = "\\w+\\/[-+.\\w]+(?:;[\\w=]+)*";
                var urlchar = "[A-Za-z0-9-_.!~\\*'();\\/?:@&=+$,%]*";
                var dataurl =
                  "data:(?:" + mediaType + ")?(?:;base64)?," + urlchar;
                regex = "(?:" + regex + ")|(?:^" + dataurl + "$)";
              }

              var PATTERN = new RegExp(regex, "i");
              if (!PATTERN.exec(value)) {
                return message;
              }
            },
            type: v.extend(
              function (
                value,
                originalOptions,
                attribute,
                attributes,
                globalOptions
              ) {
                if (v.isString(originalOptions)) {
                  originalOptions = { type: originalOptions };
                }

                if (!v.isDefined(value)) {
                  return;
                }

                var options = v.extend({}, this.options, originalOptions);

                var type = options.type;
                if (!v.isDefined(type)) {
                  throw new Error("No type was specified");
                }

                var check;
                if (v.isFunction(type)) {
                  check = type;
                } else {
                  check = this.types[type];
                }

                if (!v.isFunction(check)) {
                  throw new Error(
                    "validate.validators.type.types." +
                      type +
                      " must be a function."
                  );
                }

                if (
                  !check(value, options, attribute, attributes, globalOptions)
                ) {
                  var message =
                    originalOptions.message ||
                    this.messages[type] ||
                    this.message ||
                    options.message ||
                    (v.isFunction(type)
                      ? "must be of the correct type"
                      : "must be of type %{type}");

                  if (v.isFunction(message)) {
                    message = message(
                      value,
                      originalOptions,
                      attribute,
                      attributes,
                      globalOptions
                    );
                  }

                  return v.format(message, {
                    attribute: v.prettify(attribute),
                    type: type,
                  });
                }
              },
              {
                types: {
                  object: function (value) {
                    return v.isObject(value) && !v.isArray(value);
                  },
                  array: v.isArray,
                  integer: v.isInteger,
                  number: v.isNumber,
                  string: v.isString,
                  date: v.isDate,
                  boolean: v.isBoolean,
                },
                messages: {},
              }
            ),
          };

          validate.formatters = {
            detailed: function (errors) {
              return errors;
            },
            flat: v.flattenErrorsToArray,
            grouped: function (errors) {
              var attr;

              errors = v.groupErrorsByAttribute(errors);
              for (attr in errors) {
                errors[attr] = v.flattenErrorsToArray(errors[attr]);
              }
              return errors;
            },
            constraint: function (errors) {
              var attr;
              errors = v.groupErrorsByAttribute(errors);
              for (attr in errors) {
                errors[attr] = errors[attr]
                  .map(function (result) {
                    return result.validator;
                  })
                  .sort();
              }
              return errors;
            },
          };

          validate.exposeModule(validate, this, exports, module, define);
        }.call(
          this,
          typeof exports !== "undefined"
            ? /* istanbul ignore next */ exports
            : null,
          typeof module !== "undefined"
            ? /* istanbul ignore next */ module
            : null,
          typeof define !== "undefined"
            ? /* istanbul ignore next */ define
            : null
        ));
      },
      {},
    ],
    29: [
      function (require, module, exports) {
        const axios = require("axios");
        const validate = require("validate.js");

        new Vue({
          el: "#app",
          delimiters: ["%{", "}"],
          data: {
            user: {
              username: "",
              password: "",
              email: "",
            },
            error: {
              toggle: false,
              data: [],
            },
          },
          methods: {
            postIt: function (event) {
              //ID: 1 Kullanıcı adı boş veya yeterli uzunlukta değil(en az 2 harf)
              //ID: 2 Kullanıcı şifresi boş veya 6 karakterden ksıa
              var constraints = {
                from: {
                  email: true
                }
              };
              
              const user = this.user;
              this.error.data = [];
              this.error.toggle = false;
              if (user.username.trim() == "" || user.username.length < 2) {
                this.error.data.push({
                  id: "1",
                  desc:
                    "Kullanıcı adı boş veya yeterli uzunlukta değil(en az 2 harf)",
                });
              }
              if (user.password == "" || user.password.length < 6) {
                this.error.data.push({
                  id: "2",
                  desc:
                    "Kullanıcı şifresi boş veya 6 karakterden kısa",
                });
              }
              
              
              const emailVer = validate({from: user.email}, constraints);
              if (user.email == "" || emailVer != undefined) {
                this.error.data.push({
                  id: "3",
                  desc:
                    "Email alanı boş veya geçersiz bir email adresi girildi.",
                });
              }

              if(this.error.data.length != 0){
                this.error.toggle = true;
                return false;
              }else{
                axios.post("/register", {
                  username: this.user.username,
                  email: this.user.email,
                  password: this.user.password,
                })
                .then(function ({ data }) {
                  if(!data.success){
                    alert('Bir sorun ile karsilasildi.')
                  }else{
                    window.location.href = '/';
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
              }
              
              
            },
          },
        });
      },
      { axios: 2, "validate.js": 28 },
    ],
  },
  {},
  [29]
);
