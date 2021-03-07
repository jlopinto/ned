// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"4Qje1":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "a5b9af1718bceef0ebadaf858f6969e3";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
import type {
HMRAsset,
HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
(string): mixed;
cache: {|[string]: ParcelModule|};
hotData: mixed;
Module: any;
parent: ?ParcelRequire;
isParcelRequire: true;
modules: {|[string]: [Function, {|[string]: string|}]|};
HMR_BUNDLE_ID: string;
root: ParcelRequire;
}
interface ParcelModule {
hot: {|
data: mixed,
accept(cb: (Function) => void): void,
dispose(cb: (mixed) => void): void,
// accept(deps: Array<string> | string, cb: (Function) => void): void,
// decline(): void,
_acceptCallbacks: Array<(Function) => void>,
_disposeCallbacks: Array<(mixed) => void>,
|};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, /*: {|[string]: boolean|}*/
acceptedAssets, /*: {|[string]: boolean|}*/
/*: {|[string]: boolean|}*/
assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) /*: {data: string, ...}*/
  {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = /*: HMRMessage*/
    JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = /*: string*/
      links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, /*: ParcelRequire*/
asset) /*:  HMRAsset*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, /*: ParcelRequire*/
id, /*: ParcelRequire*/
/*: string*/
depsByBundle) /*: ?{ [string]: { [string]: string } }*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, /*: ParcelRequire*/
id) /*: string*/
{
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"292M2":[function(require,module,exports) {
var _srcIndex = require('../src/index');
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _srcIndexDefault = _parcelHelpers.interopDefault(_srcIndex);
var ned = new _srcIndexDefault.default();
var logEvent = (function () {
  var logs = [];
  function output() {
    var consoleOuput = document.querySelector('#console');
    var logMarkup = function (output) {
      return "<tr><td>" + output.eventName + "</td><td>" + output.delegatedTarget + "</td><td>" + output.originalEvent + "</td><td>" + output.target + "</td></tr>";
    };
    var revertlogs = logs;
    consoleOuput.innerHTML = revertlogs.map(function (log) {
      return logMarkup(log);
    }).join('');
  }
  return function (event) {
    var currentTarget = event.currentTarget;
    logs.push({
      eventName: event.eventName,
      delegatedTarget: [event.delegatedTarget.tagName.toLocaleLowerCase(), event.delegatedTarget.classList.toString().trim().replace(' ', '.')].join('.'),
      originalEvent: event.originalEvent.type + " => ." + event.originalEvent.target.classList.toString().replace(' ', '.'),
      target: currentTarget.tagName.toLocaleLowerCase() + "." + currentTarget.classList.toString().replace(' ', '.')
    });
    output();
  };
})();
var demo = function () {
  var myDelegatedEvent = {
    targets: '.btn--ned',
    elements: '.container',
    handler: function (event) {
      logEvent(event);
    },
    events: 'click.btnNed'
  };
  var myDirectEvent = {
    elements: '.btn--direct',
    handler: function (event) {
      console.log(event);
      var removed = ned.off({
        elements: event.delegatedTarget,
        events: 'click.btnDirect'
      });
      event.currentTarget.classList.remove('btn--direct');
      console.log({
        removed: removed
      });
      event.originalEvent.stopImmediatePropagation();
      logEvent(event);
    },
    events: 'click.btnDirect'
  };
  var myDirectEventOnce = {
    elements: '.btn--direct',
    handler: function (event) {
      logEvent(event);
    },
    events: 'click.btnDirectOnce'
  };
  var allBtnMousedown = {
    targets: '.btn',
    elements: '.container',
    handler: function (event) {
      var currentTarget = event.currentTarget;
      currentTarget.classList.add('click');
      logEvent(event);
    },
    events: 'mousedown.AllBtn'
  };
  var allBtnMouseup = {
    targets: '.btn',
    elements: '.container',
    handler: function (event) {
      var currentTarget = event.currentTarget;
      currentTarget.classList.remove('click');
      logEvent(event);
    },
    events: 'mouseup.AllBtn'
  };
  var complexEvent = {
    events: 'click.myClick mouseover.myClick',
    targets: '.btn__label, h2',
    elements: '.container, .nav',
    handler: function (event) {
      logEvent(event);
    }
  };
  ned.on(complexEvent);
  ned.on(myDelegatedEvent);
  ned.on(myDirectEvent);
  ned.once(myDirectEventOnce);
  ned.on(allBtnMousedown);
  ned.on(allBtnMouseup);
  ned.on({
    events: 'submit.myForm',
    elements: document.body,
    targets: '.myForm',
    handler: function (event) {
      logEvent(event);
      event.originalEvent.preventDefault();
      event.originalEvent.stopPropagation();
    }
  });
  // ned.fire({
  // element: '.btn--ned',
  // eventName: 'click'
  // });
  console.log(ned.getEvents());
};
ned.on({
  events: 'DOMContentLoaded',
  elements: window,
  handler: demo
});

},{"../src/index":"2BBot","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"2BBot":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "default", function () {
  return _namespacedEventDelegationDefault.default;
});
var _namespacedEventDelegation = require('./namespaced-event-delegation');
var _namespacedEventDelegationDefault = _parcelHelpers.interopDefault(_namespacedEventDelegation);

},{"./namespaced-event-delegation":"5xxJb","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"5xxJb":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _eventManager = require('./event-manager');
var _eventManagerDefault = _parcelHelpers.interopDefault(_eventManager);
var __extends = undefined && undefined.__extends || (function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || ({
      __proto__: []
    }) instanceof Array && (function (d, b) {
      d.__proto__ = b;
    }) || (function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    });
    return extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
var __assign = undefined && undefined.__assign || (function () {
  __assign = Object.assign || (function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  });
  return __assign.apply(this, arguments);
});
var NamespacedEventDelegation = /** @class*/
(function (_super) {
  __extends(NamespacedEventDelegation, _super);
  function NamespacedEventDelegation() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.on = function (_a) {
      var events = _a.events, elements = _a.elements, targets = _a.targets, handler = _a.handler, _b = _a.once, once = _b === void 0 ? false : _b;
      _this.candidates(elements, events, function (element, eventNamespace) {
        element.addEventListener(_this.extractEventName(eventNamespace), _this.addEvent(element, eventNamespace, function (originalEvent) {
          var handlerParams = {
            event: eventNamespace,
            delegatedTarget: element,
            currentTarget: element,
            originalEvent: originalEvent
          };
          if (targets) {
            var target = originalEvent.target.closest(targets);
            if (!target) {
              return false;
            }
            handlerParams = __assign(__assign({}, handlerParams), {
              currentTarget: target || handlerParams.delegatedTarget
            });
          }
          return handler(handlerParams);
        }), {
          once: once
        });
      });
    };
    _this.once = function (_a) {
      var events = _a.events, elements = _a.elements, targets = _a.targets, handler = _a.handler;
      return _this.on({
        events: events,
        elements: elements,
        targets: targets,
        handler: handler,
        once: true
      });
    };
    _this.off = function (_a) {
      var elements = _a.elements, events = _a.events;
      var removed = [];
      _this.getEvents().forEach(function (storedEvent) {
        _this.candidates(elements, events, function (element, event) {
          element.removeEventListener(_this.extractEventName(event), storedEvent.handler);
          removed.push(_this.removeEvents(element, event));
        });
      });
      return removed;
    };
    _this.fire = function (_a) {
      var elements = _a.elements, events = _a.events;
      var fired = [];
      var evt = document.createEvent('Event');
      _this.candidates(elements, events, function (element, event) {
        evt.initEvent(_this.extractEventName(event), true, true);
        fired.push(element.dispatchEvent(evt));
      });
      return fired;
    };
    _this.candidates = function (elements, events, fn) {
      var elementsArr = typeof elements === 'string' ? document.querySelectorAll(elements) : [elements];
      var eventsArr = events.split(' ');
      elementsArr.forEach(function (element) {
        return eventsArr.forEach(function (event) {
          return fn(element, event);
        });
      });
    };
    _this.extractEventName = function (eventName) {
      return eventName.split('.')[0];
    };
    return _this;
  }
  return NamespacedEventDelegation;
})(_eventManagerDefault.default);
exports.default = NamespacedEventDelegation;

},{"./event-manager":"11uml","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"11uml":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var EventManagerSingleton = /** @class*/
(function () {
  function EventManagerSingleton() {
    var _this = this;
    this.eventsMap = [];
    this.addEvent = function (element, eventName, handler) {
      _this.eventsMap.push({
        element: element,
        eventName: eventName,
        handler: handler
      });
      return handler;
    };
    this.removeEvents = function (element, eventName) {
      var eventsRemoved = 0;
      _this.eventsMap = _this.eventsMap.filter(function (event, index) {
        return event.element === element && event.eventName === eventName && delete _this.eventsMap[index] && eventsRemoved + 1;
      });
      return !!eventsRemoved;
    };
    this.getEvents = function (eventName) {
      if (eventName === void 0) {
        eventName = undefined;
      }
      return eventName ? _this.eventsMap.filter(function (event) {
        return event.eventName === eventName;
      }) : _this.eventsMap;
    };
    this.clearEvents = function () {
      _this.eventsMap = [];
    };
    if (EventManagerSingleton.instance) {
      return EventManagerSingleton.instance;
    }
    EventManagerSingleton.instance = this;
    return this;
  }
  return EventManagerSingleton;
})();
exports.default = EventManagerSingleton;

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"5gA8y":[function(require,module,exports) {
"use strict";

exports.interopDefault = function (a) {
  return a && a.__esModule ? a : {
    default: a
  };
};

exports.defineInteropFlag = function (a) {
  Object.defineProperty(a, '__esModule', {
    value: true
  });
};

exports.exportAll = function (source, dest) {
  Object.keys(source).forEach(function (key) {
    if (key === 'default' || key === '__esModule') {
      return;
    } // Skip duplicate re-exports when they have the same value.


    if (key in dest && dest[key] === source[key]) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function () {
        return source[key];
      }
    });
  });
  return dest;
};

exports.export = function (dest, destName, get) {
  Object.defineProperty(dest, destName, {
    enumerable: true,
    get: get
  });
};
},{}]},["4Qje1","292M2"], "292M2", "parcelRequire0598")

//# sourceMappingURL=index.8f6969e3.js.map
