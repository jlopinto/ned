// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
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
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../src/event-manager.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var EventManagerSingleton =
/** @class */
function () {
  function EventManagerSingleton() {
    var _this = this;

    this.eventsMap = [];

    this.addEvent = function (eventNamespace, event) {
      _this.eventsMap.push({
        eventNamespace: eventNamespace,
        handler: event
      });

      return event;
    };

    this.removeEvents = function (eventNamespace) {
      var eventsRemoved = _this.eventsMap.some(function (event) {
        return event.eventNamespace === eventNamespace;
      });

      _this.eventsMap.forEach(function (event, index) {
        if (event.eventNamespace === eventNamespace) {
          delete _this.eventsMap[index];
        }
      });

      return eventsRemoved;
    };

    this.getEvents = function (eventNamespace) {
      if (eventNamespace === void 0) {
        eventNamespace = undefined;
      }

      return eventNamespace ? _this.eventsMap.filter(function (event) {
        return event.eventNamespace === eventNamespace;
      }) : _this.eventsMap;
    };

    if (EventManagerSingleton.instance) {
      return EventManagerSingleton.instance;
    }

    EventManagerSingleton.instance = this;
    return this;
  }

  return EventManagerSingleton;
}();

exports.default = EventManagerSingleton;
},{}],"../src/namespaced-event-delegation.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var event_manager_1 = __importDefault(require("./event-manager"));

var NamespacedEventDelegation =
/** @class */
function (_super) {
  __extends(NamespacedEventDelegation, _super);

  function NamespacedEventDelegation() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.extractEventName = function (eventName) {
      return eventName.split('.')[0];
    };

    _this.on = function (_a) {
      var eventName = _a.eventName,
          targetSelector = _a.targetSelector,
          handler = _a.handler,
          delegatedTarget = _a.delegatedTarget,
          _b = _a.once,
          once = _b === void 0 ? false : _b;

      var delegatedEvent = function delegatedEvent(event) {
        var handlerParams = {
          eventName: eventName,
          delegatedTarget: delegatedTarget,
          currentTarget: delegatedTarget,
          originalEvent: event
        };

        if (targetSelector) {
          var target = event.target.closest(targetSelector);

          if (!target) {
            return false;
          }

          handlerParams = __assign(__assign({}, handlerParams), {
            currentTarget: target || handlerParams.delegatedTarget
          });
        }

        return handler(handlerParams);
      };

      delegatedTarget.addEventListener(_this.extractEventName(eventName), _this.addEvent(eventName, delegatedEvent), {
        once: once
      });
      return _this.getEvents();
    };

    _this.once = function (_a) {
      var eventName = _a.eventName,
          targetSelector = _a.targetSelector,
          handler = _a.handler,
          delegatedTarget = _a.delegatedTarget;
      return _this.on({
        eventName: eventName,
        targetSelector: targetSelector,
        handler: handler,
        delegatedTarget: delegatedTarget,
        once: true
      });
    };

    _this.off = function (_a) {
      var delegatedTarget = _a.delegatedTarget,
          eventName = _a.eventName;

      _this.getEvents(eventName).forEach(function (event) {
        delegatedTarget.removeEventListener(_this.extractEventName(eventName), event.handler);
      });

      return _this.removeEvents(eventName);
    };

    _this.fire = function (_a) {
      var delegatedTarget = _a.delegatedTarget,
          eventName = _a.eventName;
      var evt = document.createEvent('Event');
      evt.initEvent(_this.extractEventName(eventName), true, true);
      return delegatedTarget.dispatchEvent(evt);
    };

    return _this;
  }

  return NamespacedEventDelegation;
}(event_manager_1.default);

exports.default = NamespacedEventDelegation;
},{"./event-manager":"../src/event-manager.ts"}],"../src/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var namespaced_event_delegation_1 = require("./namespaced-event-delegation");

Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return namespaced_event_delegation_1.default;
  }
});
},{"./namespaced-event-delegation":"../src/namespaced-event-delegation.ts"}],"demo.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var index_1 = __importDefault(require("../src/index"));

var eventDelegation = new index_1.default();

var logEvent = function () {
  var logs = [];

  function output() {
    var consoleOuput = document.querySelector('#console');

    var logMarkup = function logMarkup(output) {
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
}();

window.addEventListener('DOMContentLoaded', function () {
  var delegatedTarget = document.querySelector('.content');
  var myDelegatedEvent = {
    targetSelector: '.btn--ned',
    delegatedTarget: delegatedTarget,
    handler: function handler(event) {
      logEvent(event);
    },
    eventName: 'click.btnNed'
  };
  var myDirectEvent = {
    delegatedTarget: document.querySelector('.btn--direct'),
    handler: function handler(event) {
      var removed = eventDelegation.off({
        delegatedTarget: document.querySelector('.btn--direct'),
        eventName: 'click.btnDirect'
      });
      event.currentTarget.classList.remove('btn--direct');
      console.log({
        removed: removed
      });
      logEvent(event);
    },
    eventName: 'click.btnDirect'
  };
  var allBtnMousedown = {
    targetSelector: '.btn',
    delegatedTarget: delegatedTarget,
    handler: function handler(event) {
      console.log(event);
      var currentTarget = event.currentTarget;
      currentTarget.classList.add('click');
      logEvent(event);
    },
    eventName: 'mousedown.AllBtn'
  };
  var allBtnMouseup = {
    targetSelector: '.btn',
    delegatedTarget: delegatedTarget,
    handler: function handler(event) {
      var currentTarget = event.currentTarget;
      currentTarget.classList.remove('click');
      logEvent(event);
    },
    eventName: 'mouseup.AllBtn'
  };
  eventDelegation.on(myDelegatedEvent);
  eventDelegation.on(myDirectEvent);
  eventDelegation.on(allBtnMousedown);
  eventDelegation.on(allBtnMouseup);
  console.log(eventDelegation.on({
    eventName: 'submit.myForm',
    delegatedTarget: document.body,
    targetSelector: '.myForm',
    handler: function handler(event) {
      logEvent(event);
      event.originalEvent.preventDefault();
      event.originalEvent.stopPropagation();
    }
  }));
  eventDelegation.fire({
    delegatedTarget: document.querySelector('.btn--ned'),
    eventName: 'click'
  });
});
},{"../src/index":"../src/index.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53499" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
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
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
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

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
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
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","demo.ts"], "Ned")
//# sourceMappingURL=/demo.56710ae6.js.map