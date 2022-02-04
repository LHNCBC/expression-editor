/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"runtime": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// run deferred modules from other chunks
/******/ 	checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ([]);
//# sourceMappingURL=runtime.js.map
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["polyfills"],{

/***/ "0TWp":
/*!*******************************************!*\
  !*** ./node_modules/zone.js/dist/zone.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
* @license Angular v9.1.0-next.4+61.sha-e552591.with-local-changes
* (c) 2010-2020 Google LLC. https://angular.io/
* License: MIT
*/
(function (factory) {
   true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
})(function () {
  'use strict';
  /**
   * @license
   * Copyright Google Inc. All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   */

  var Zone$1 = function (global) {
    var performance = global['performance'];

    function mark(name) {
      performance && performance['mark'] && performance['mark'](name);
    }

    function performanceMeasure(name, label) {
      performance && performance['measure'] && performance['measure'](name, label);
    }

    mark('Zone'); // Initialize before it's accessed below.
    // __Zone_symbol_prefix global can be used to override the default zone
    // symbol prefix with a custom one if needed.

    var symbolPrefix = global['__Zone_symbol_prefix'] || '__zone_symbol__';

    function __symbol__(name) {
      return symbolPrefix + name;
    }

    var checkDuplicate = global[__symbol__('forceDuplicateZoneCheck')] === true;

    if (global['Zone']) {
      // if global['Zone'] already exists (maybe zone.js was already loaded or
      // some other lib also registered a global object named Zone), we may need
      // to throw an error, but sometimes user may not want this error.
      // For example,
      // we have two web pages, page1 includes zone.js, page2 doesn't.
      // and the 1st time user load page1 and page2, everything work fine,
      // but when user load page2 again, error occurs because global['Zone'] already exists.
      // so we add a flag to let user choose whether to throw this error or not.
      // By default, if existing Zone is from zone.js, we will not throw the error.
      if (checkDuplicate || typeof global['Zone'].__symbol__ !== 'function') {
        throw new Error('Zone already loaded.');
      } else {
        return global['Zone'];
      }
    }

    var Zone = function () {
      function Zone(parent, zoneSpec) {
        this._parent = parent;
        this._name = zoneSpec ? zoneSpec.name || 'unnamed' : '<root>';
        this._properties = zoneSpec && zoneSpec.properties || {};
        this._zoneDelegate = new ZoneDelegate(this, this._parent && this._parent._zoneDelegate, zoneSpec);
      }

      Zone.assertZonePatched = function () {
        if (global['Promise'] !== patches['ZoneAwarePromise']) {
          throw new Error('Zone.js has detected that ZoneAwarePromise `(window|global).Promise` ' + 'has been overwritten.\n' + 'Most likely cause is that a Promise polyfill has been loaded ' + 'after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. ' + 'If you must load one, do so before loading zone.js.)');
        }
      };

      Object.defineProperty(Zone, "root", {
        get: function get() {
          var zone = Zone.current;

          while (zone.parent) {
            zone = zone.parent;
          }

          return zone;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(Zone, "current", {
        get: function get() {
          return _currentZoneFrame.zone;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(Zone, "currentTask", {
        get: function get() {
          return _currentTask;
        },
        enumerable: true,
        configurable: true
      }); // tslint:disable-next-line:require-internal-with-underscore

      Zone.__load_patch = function (name, fn) {
        if (patches.hasOwnProperty(name)) {
          if (checkDuplicate) {
            throw Error('Already loaded patch: ' + name);
          }
        } else if (!global['__Zone_disable_' + name]) {
          var perfName = 'Zone:' + name;
          mark(perfName);
          patches[name] = fn(global, Zone, _api);
          performanceMeasure(perfName, perfName);
        }
      };

      Object.defineProperty(Zone.prototype, "parent", {
        get: function get() {
          return this._parent;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(Zone.prototype, "name", {
        get: function get() {
          return this._name;
        },
        enumerable: true,
        configurable: true
      });

      Zone.prototype.get = function (key) {
        var zone = this.getZoneWith(key);
        if (zone) return zone._properties[key];
      };

      Zone.prototype.getZoneWith = function (key) {
        var current = this;

        while (current) {
          if (current._properties.hasOwnProperty(key)) {
            return current;
          }

          current = current._parent;
        }

        return null;
      };

      Zone.prototype.fork = function (zoneSpec) {
        if (!zoneSpec) throw new Error('ZoneSpec required!');
        return this._zoneDelegate.fork(this, zoneSpec);
      };

      Zone.prototype.wrap = function (callback, source) {
        if (typeof callback !== 'function') {
          throw new Error('Expecting function got: ' + callback);
        }

        var _callback = this._zoneDelegate.intercept(this, callback, source);

        var zone = this;
        return function () {
          return zone.runGuarded(_callback, this, arguments, source);
        };
      };

      Zone.prototype.run = function (callback, applyThis, applyArgs, source) {
        _currentZoneFrame = {
          parent: _currentZoneFrame,
          zone: this
        };

        try {
          return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
        } finally {
          _currentZoneFrame = _currentZoneFrame.parent;
        }
      };

      Zone.prototype.runGuarded = function (callback, applyThis, applyArgs, source) {
        if (applyThis === void 0) {
          applyThis = null;
        }

        _currentZoneFrame = {
          parent: _currentZoneFrame,
          zone: this
        };

        try {
          try {
            return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
          } catch (error) {
            if (this._zoneDelegate.handleError(this, error)) {
              throw error;
            }
          }
        } finally {
          _currentZoneFrame = _currentZoneFrame.parent;
        }
      };

      Zone.prototype.runTask = function (task, applyThis, applyArgs) {
        if (task.zone != this) {
          throw new Error('A task can only be run in the zone of creation! (Creation: ' + (task.zone || NO_ZONE).name + '; Execution: ' + this.name + ')');
        } // https://github.com/angular/zone.js/issues/778, sometimes eventTask
        // will run in notScheduled(canceled) state, we should not try to
        // run such kind of task but just return


        if (task.state === notScheduled && (task.type === eventTask || task.type === macroTask)) {
          return;
        }

        var reEntryGuard = task.state != running;
        reEntryGuard && task._transitionTo(running, scheduled);
        task.runCount++;
        var previousTask = _currentTask;
        _currentTask = task;
        _currentZoneFrame = {
          parent: _currentZoneFrame,
          zone: this
        };

        try {
          if (task.type == macroTask && task.data && !task.data.isPeriodic) {
            task.cancelFn = undefined;
          }

          try {
            return this._zoneDelegate.invokeTask(this, task, applyThis, applyArgs);
          } catch (error) {
            if (this._zoneDelegate.handleError(this, error)) {
              throw error;
            }
          }
        } finally {
          // if the task's state is notScheduled or unknown, then it has already been cancelled
          // we should not reset the state to scheduled
          if (task.state !== notScheduled && task.state !== unknown) {
            if (task.type == eventTask || task.data && task.data.isPeriodic) {
              reEntryGuard && task._transitionTo(scheduled, running);
            } else {
              task.runCount = 0;

              this._updateTaskCount(task, -1);

              reEntryGuard && task._transitionTo(notScheduled, running, notScheduled);
            }
          }

          _currentZoneFrame = _currentZoneFrame.parent;
          _currentTask = previousTask;
        }
      };

      Zone.prototype.scheduleTask = function (task) {
        if (task.zone && task.zone !== this) {
          // check if the task was rescheduled, the newZone
          // should not be the children of the original zone
          var newZone = this;

          while (newZone) {
            if (newZone === task.zone) {
              throw Error("can not reschedule task to " + this.name + " which is descendants of the original zone " + task.zone.name);
            }

            newZone = newZone.parent;
          }
        }

        task._transitionTo(scheduling, notScheduled);

        var zoneDelegates = [];
        task._zoneDelegates = zoneDelegates;
        task._zone = this;

        try {
          task = this._zoneDelegate.scheduleTask(this, task);
        } catch (err) {
          // should set task's state to unknown when scheduleTask throw error
          // because the err may from reschedule, so the fromState maybe notScheduled
          task._transitionTo(unknown, scheduling, notScheduled); // TODO: @JiaLiPassion, should we check the result from handleError?


          this._zoneDelegate.handleError(this, err);

          throw err;
        }

        if (task._zoneDelegates === zoneDelegates) {
          // we have to check because internally the delegate can reschedule the task.
          this._updateTaskCount(task, 1);
        }

        if (task.state == scheduling) {
          task._transitionTo(scheduled, scheduling);
        }

        return task;
      };

      Zone.prototype.scheduleMicroTask = function (source, callback, data, customSchedule) {
        return this.scheduleTask(new ZoneTask(microTask, source, callback, data, customSchedule, undefined));
      };

      Zone.prototype.scheduleMacroTask = function (source, callback, data, customSchedule, customCancel) {
        return this.scheduleTask(new ZoneTask(macroTask, source, callback, data, customSchedule, customCancel));
      };

      Zone.prototype.scheduleEventTask = function (source, callback, data, customSchedule, customCancel) {
        return this.scheduleTask(new ZoneTask(eventTask, source, callback, data, customSchedule, customCancel));
      };

      Zone.prototype.cancelTask = function (task) {
        if (task.zone != this) throw new Error('A task can only be cancelled in the zone of creation! (Creation: ' + (task.zone || NO_ZONE).name + '; Execution: ' + this.name + ')');

        task._transitionTo(canceling, scheduled, running);

        try {
          this._zoneDelegate.cancelTask(this, task);
        } catch (err) {
          // if error occurs when cancelTask, transit the state to unknown
          task._transitionTo(unknown, canceling);

          this._zoneDelegate.handleError(this, err);

          throw err;
        }

        this._updateTaskCount(task, -1);

        task._transitionTo(notScheduled, canceling);

        task.runCount = 0;
        return task;
      };

      Zone.prototype._updateTaskCount = function (task, count) {
        var zoneDelegates = task._zoneDelegates;

        if (count == -1) {
          task._zoneDelegates = null;
        }

        for (var i = 0; i < zoneDelegates.length; i++) {
          zoneDelegates[i]._updateTaskCount(task.type, count);
        }
      };

      return Zone;
    }(); // tslint:disable-next-line:require-internal-with-underscore


    Zone.__symbol__ = __symbol__;
    var DELEGATE_ZS = {
      name: '',
      onHasTask: function onHasTask(delegate, _, target, hasTaskState) {
        return delegate.hasTask(target, hasTaskState);
      },
      onScheduleTask: function onScheduleTask(delegate, _, target, task) {
        return delegate.scheduleTask(target, task);
      },
      onInvokeTask: function onInvokeTask(delegate, _, target, task, applyThis, applyArgs) {
        return delegate.invokeTask(target, task, applyThis, applyArgs);
      },
      onCancelTask: function onCancelTask(delegate, _, target, task) {
        return delegate.cancelTask(target, task);
      }
    };

    var ZoneDelegate = function () {
      function ZoneDelegate(zone, parentDelegate, zoneSpec) {
        this._taskCounts = {
          'microTask': 0,
          'macroTask': 0,
          'eventTask': 0
        };
        this.zone = zone;
        this._parentDelegate = parentDelegate;
        this._forkZS = zoneSpec && (zoneSpec && zoneSpec.onFork ? zoneSpec : parentDelegate._forkZS);
        this._forkDlgt = zoneSpec && (zoneSpec.onFork ? parentDelegate : parentDelegate._forkDlgt);
        this._forkCurrZone = zoneSpec && (zoneSpec.onFork ? this.zone : parentDelegate._forkCurrZone);
        this._interceptZS = zoneSpec && (zoneSpec.onIntercept ? zoneSpec : parentDelegate._interceptZS);
        this._interceptDlgt = zoneSpec && (zoneSpec.onIntercept ? parentDelegate : parentDelegate._interceptDlgt);
        this._interceptCurrZone = zoneSpec && (zoneSpec.onIntercept ? this.zone : parentDelegate._interceptCurrZone);
        this._invokeZS = zoneSpec && (zoneSpec.onInvoke ? zoneSpec : parentDelegate._invokeZS);
        this._invokeDlgt = zoneSpec && (zoneSpec.onInvoke ? parentDelegate : parentDelegate._invokeDlgt);
        this._invokeCurrZone = zoneSpec && (zoneSpec.onInvoke ? this.zone : parentDelegate._invokeCurrZone);
        this._handleErrorZS = zoneSpec && (zoneSpec.onHandleError ? zoneSpec : parentDelegate._handleErrorZS);
        this._handleErrorDlgt = zoneSpec && (zoneSpec.onHandleError ? parentDelegate : parentDelegate._handleErrorDlgt);
        this._handleErrorCurrZone = zoneSpec && (zoneSpec.onHandleError ? this.zone : parentDelegate._handleErrorCurrZone);
        this._scheduleTaskZS = zoneSpec && (zoneSpec.onScheduleTask ? zoneSpec : parentDelegate._scheduleTaskZS);
        this._scheduleTaskDlgt = zoneSpec && (zoneSpec.onScheduleTask ? parentDelegate : parentDelegate._scheduleTaskDlgt);
        this._scheduleTaskCurrZone = zoneSpec && (zoneSpec.onScheduleTask ? this.zone : parentDelegate._scheduleTaskCurrZone);
        this._invokeTaskZS = zoneSpec && (zoneSpec.onInvokeTask ? zoneSpec : parentDelegate._invokeTaskZS);
        this._invokeTaskDlgt = zoneSpec && (zoneSpec.onInvokeTask ? parentDelegate : parentDelegate._invokeTaskDlgt);
        this._invokeTaskCurrZone = zoneSpec && (zoneSpec.onInvokeTask ? this.zone : parentDelegate._invokeTaskCurrZone);
        this._cancelTaskZS = zoneSpec && (zoneSpec.onCancelTask ? zoneSpec : parentDelegate._cancelTaskZS);
        this._cancelTaskDlgt = zoneSpec && (zoneSpec.onCancelTask ? parentDelegate : parentDelegate._cancelTaskDlgt);
        this._cancelTaskCurrZone = zoneSpec && (zoneSpec.onCancelTask ? this.zone : parentDelegate._cancelTaskCurrZone);
        this._hasTaskZS = null;
        this._hasTaskDlgt = null;
        this._hasTaskDlgtOwner = null;
        this._hasTaskCurrZone = null;
        var zoneSpecHasTask = zoneSpec && zoneSpec.onHasTask;
        var parentHasTask = parentDelegate && parentDelegate._hasTaskZS;

        if (zoneSpecHasTask || parentHasTask) {
          // If we need to report hasTask, than this ZS needs to do ref counting on tasks. In such
          // a case all task related interceptors must go through this ZD. We can't short circuit it.
          this._hasTaskZS = zoneSpecHasTask ? zoneSpec : DELEGATE_ZS;
          this._hasTaskDlgt = parentDelegate;
          this._hasTaskDlgtOwner = this;
          this._hasTaskCurrZone = zone;

          if (!zoneSpec.onScheduleTask) {
            this._scheduleTaskZS = DELEGATE_ZS;
            this._scheduleTaskDlgt = parentDelegate;
            this._scheduleTaskCurrZone = this.zone;
          }

          if (!zoneSpec.onInvokeTask) {
            this._invokeTaskZS = DELEGATE_ZS;
            this._invokeTaskDlgt = parentDelegate;
            this._invokeTaskCurrZone = this.zone;
          }

          if (!zoneSpec.onCancelTask) {
            this._cancelTaskZS = DELEGATE_ZS;
            this._cancelTaskDlgt = parentDelegate;
            this._cancelTaskCurrZone = this.zone;
          }
        }
      }

      ZoneDelegate.prototype.fork = function (targetZone, zoneSpec) {
        return this._forkZS ? this._forkZS.onFork(this._forkDlgt, this.zone, targetZone, zoneSpec) : new Zone(targetZone, zoneSpec);
      };

      ZoneDelegate.prototype.intercept = function (targetZone, callback, source) {
        return this._interceptZS ? this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, targetZone, callback, source) : callback;
      };

      ZoneDelegate.prototype.invoke = function (targetZone, callback, applyThis, applyArgs, source) {
        return this._invokeZS ? this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, targetZone, callback, applyThis, applyArgs, source) : callback.apply(applyThis, applyArgs);
      };

      ZoneDelegate.prototype.handleError = function (targetZone, error) {
        return this._handleErrorZS ? this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, targetZone, error) : true;
      };

      ZoneDelegate.prototype.scheduleTask = function (targetZone, task) {
        var returnTask = task;

        if (this._scheduleTaskZS) {
          if (this._hasTaskZS) {
            returnTask._zoneDelegates.push(this._hasTaskDlgtOwner);
          } // clang-format off


          returnTask = this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, targetZone, task); // clang-format on

          if (!returnTask) returnTask = task;
        } else {
          if (task.scheduleFn) {
            task.scheduleFn(task);
          } else if (task.type == microTask) {
            scheduleMicroTask(task);
          } else {
            throw new Error('Task is missing scheduleFn.');
          }
        }

        return returnTask;
      };

      ZoneDelegate.prototype.invokeTask = function (targetZone, task, applyThis, applyArgs) {
        return this._invokeTaskZS ? this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, targetZone, task, applyThis, applyArgs) : task.callback.apply(applyThis, applyArgs);
      };

      ZoneDelegate.prototype.cancelTask = function (targetZone, task) {
        var value;

        if (this._cancelTaskZS) {
          value = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, targetZone, task);
        } else {
          if (!task.cancelFn) {
            throw Error('Task is not cancelable');
          }

          value = task.cancelFn(task);
        }

        return value;
      };

      ZoneDelegate.prototype.hasTask = function (targetZone, isEmpty) {
        // hasTask should not throw error so other ZoneDelegate
        // can still trigger hasTask callback
        try {
          this._hasTaskZS && this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, targetZone, isEmpty);
        } catch (err) {
          this.handleError(targetZone, err);
        }
      }; // tslint:disable-next-line:require-internal-with-underscore


      ZoneDelegate.prototype._updateTaskCount = function (type, count) {
        var counts = this._taskCounts;
        var prev = counts[type];
        var next = counts[type] = prev + count;

        if (next < 0) {
          throw new Error('More tasks executed then were scheduled.');
        }

        if (prev == 0 || next == 0) {
          var isEmpty = {
            microTask: counts['microTask'] > 0,
            macroTask: counts['macroTask'] > 0,
            eventTask: counts['eventTask'] > 0,
            change: type
          };
          this.hasTask(this.zone, isEmpty);
        }
      };

      return ZoneDelegate;
    }();

    var ZoneTask = function () {
      function ZoneTask(type, source, callback, options, scheduleFn, cancelFn) {
        // tslint:disable-next-line:require-internal-with-underscore
        this._zone = null;
        this.runCount = 0; // tslint:disable-next-line:require-internal-with-underscore

        this._zoneDelegates = null; // tslint:disable-next-line:require-internal-with-underscore

        this._state = 'notScheduled';
        this.type = type;
        this.source = source;
        this.data = options;
        this.scheduleFn = scheduleFn;
        this.cancelFn = cancelFn;

        if (!callback) {
          throw new Error('callback is not defined');
        }

        this.callback = callback;
        var self = this; // TODO: @JiaLiPassion options should have interface

        if (type === eventTask && options && options.useG) {
          this.invoke = ZoneTask.invokeTask;
        } else {
          this.invoke = function () {
            return ZoneTask.invokeTask.call(global, self, this, arguments);
          };
        }
      }

      ZoneTask.invokeTask = function (task, target, args) {
        if (!task) {
          task = this;
        }

        _numberOfNestedTaskFrames++;

        try {
          task.runCount++;
          return task.zone.runTask(task, target, args);
        } finally {
          if (_numberOfNestedTaskFrames == 1) {
            drainMicroTaskQueue();
          }

          _numberOfNestedTaskFrames--;
        }
      };

      Object.defineProperty(ZoneTask.prototype, "zone", {
        get: function get() {
          return this._zone;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ZoneTask.prototype, "state", {
        get: function get() {
          return this._state;
        },
        enumerable: true,
        configurable: true
      });

      ZoneTask.prototype.cancelScheduleRequest = function () {
        this._transitionTo(notScheduled, scheduling);
      }; // tslint:disable-next-line:require-internal-with-underscore


      ZoneTask.prototype._transitionTo = function (toState, fromState1, fromState2) {
        if (this._state === fromState1 || this._state === fromState2) {
          this._state = toState;

          if (toState == notScheduled) {
            this._zoneDelegates = null;
          }
        } else {
          throw new Error(this.type + " '" + this.source + "': can not transition to '" + toState + "', expecting state '" + fromState1 + "'" + (fromState2 ? ' or \'' + fromState2 + '\'' : '') + ", was '" + this._state + "'.");
        }
      };

      ZoneTask.prototype.toString = function () {
        if (this.data && typeof this.data.handleId !== 'undefined') {
          return this.data.handleId.toString();
        } else {
          return Object.prototype.toString.call(this);
        }
      }; // add toJSON method to prevent cyclic error when
      // call JSON.stringify(zoneTask)


      ZoneTask.prototype.toJSON = function () {
        return {
          type: this.type,
          state: this.state,
          source: this.source,
          zone: this.zone.name,
          runCount: this.runCount
        };
      };

      return ZoneTask;
    }(); //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    ///  MICROTASK QUEUE
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////


    var symbolSetTimeout = __symbol__('setTimeout');

    var symbolPromise = __symbol__('Promise');

    var symbolThen = __symbol__('then');

    var _microTaskQueue = [];
    var _isDrainingMicrotaskQueue = false;
    var nativeMicroTaskQueuePromise;

    function scheduleMicroTask(task) {
      // if we are not running in any task, and there has not been anything scheduled
      // we must bootstrap the initial task creation by manually scheduling the drain
      if (_numberOfNestedTaskFrames === 0 && _microTaskQueue.length === 0) {
        // We are not running in Task, so we need to kickstart the microtask queue.
        if (!nativeMicroTaskQueuePromise) {
          if (global[symbolPromise]) {
            nativeMicroTaskQueuePromise = global[symbolPromise].resolve(0);
          }
        }

        if (nativeMicroTaskQueuePromise) {
          var nativeThen = nativeMicroTaskQueuePromise[symbolThen];

          if (!nativeThen) {
            // native Promise is not patchable, we need to use `then` directly
            // issue 1078
            nativeThen = nativeMicroTaskQueuePromise['then'];
          }

          nativeThen.call(nativeMicroTaskQueuePromise, drainMicroTaskQueue);
        } else {
          global[symbolSetTimeout](drainMicroTaskQueue, 0);
        }
      }

      task && _microTaskQueue.push(task);
    }

    function drainMicroTaskQueue() {
      if (!_isDrainingMicrotaskQueue) {
        _isDrainingMicrotaskQueue = true;

        while (_microTaskQueue.length) {
          var queue = _microTaskQueue;
          _microTaskQueue = [];

          for (var i = 0; i < queue.length; i++) {
            var task = queue[i];

            try {
              task.zone.runTask(task, null, null);
            } catch (error) {
              _api.onUnhandledError(error);
            }
          }
        }

        _api.microtaskDrainDone();

        _isDrainingMicrotaskQueue = false;
      }
    } //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    ///  BOOTSTRAP
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////


    var NO_ZONE = {
      name: 'NO ZONE'
    };
    var notScheduled = 'notScheduled',
        scheduling = 'scheduling',
        scheduled = 'scheduled',
        running = 'running',
        canceling = 'canceling',
        unknown = 'unknown';
    var microTask = 'microTask',
        macroTask = 'macroTask',
        eventTask = 'eventTask';
    var patches = {};
    var _api = {
      symbol: __symbol__,
      currentZoneFrame: function currentZoneFrame() {
        return _currentZoneFrame;
      },
      onUnhandledError: noop,
      microtaskDrainDone: noop,
      scheduleMicroTask: scheduleMicroTask,
      showUncaughtError: function showUncaughtError() {
        return !Zone[__symbol__('ignoreConsoleErrorUncaughtError')];
      },
      patchEventTarget: function patchEventTarget() {
        return [];
      },
      patchOnProperties: noop,
      patchMethod: function patchMethod() {
        return noop;
      },
      bindArguments: function bindArguments() {
        return [];
      },
      patchThen: function patchThen() {
        return noop;
      },
      patchMacroTask: function patchMacroTask() {
        return noop;
      },
      setNativePromise: function setNativePromise(NativePromise) {
        // sometimes NativePromise.resolve static function
        // is not ready yet, (such as core-js/es6.promise)
        // so we need to check here.
        if (NativePromise && typeof NativePromise.resolve === 'function') {
          nativeMicroTaskQueuePromise = NativePromise.resolve(0);
        }
      },
      patchEventPrototype: function patchEventPrototype() {
        return noop;
      },
      isIEOrEdge: function isIEOrEdge() {
        return false;
      },
      getGlobalObjects: function getGlobalObjects() {
        return undefined;
      },
      ObjectDefineProperty: function ObjectDefineProperty() {
        return noop;
      },
      ObjectGetOwnPropertyDescriptor: function ObjectGetOwnPropertyDescriptor() {
        return undefined;
      },
      ObjectCreate: function ObjectCreate() {
        return undefined;
      },
      ArraySlice: function ArraySlice() {
        return [];
      },
      patchClass: function patchClass() {
        return noop;
      },
      wrapWithCurrentZone: function wrapWithCurrentZone() {
        return noop;
      },
      filterProperties: function filterProperties() {
        return [];
      },
      attachOriginToPatched: function attachOriginToPatched() {
        return noop;
      },
      _redefineProperty: function _redefineProperty() {
        return noop;
      },
      patchCallbacks: function patchCallbacks() {
        return noop;
      }
    };
    var _currentZoneFrame = {
      parent: null,
      zone: new Zone(null, null)
    };
    var _currentTask = null;
    var _numberOfNestedTaskFrames = 0;

    function noop() {}

    performanceMeasure('Zone', 'Zone');
    return global['Zone'] = Zone;
  }(typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || global);
  /**
   * @license
   * Copyright Google Inc. All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   */


  Zone.__load_patch('ZoneAwarePromise', function (global, Zone, api) {
    var ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var ObjectDefineProperty = Object.defineProperty;

    function readableObjectToString(obj) {
      if (obj && obj.toString === Object.prototype.toString) {
        var className = obj.constructor && obj.constructor.name;
        return (className ? className : '') + ': ' + JSON.stringify(obj);
      }

      return obj ? obj.toString() : Object.prototype.toString.call(obj);
    }

    var __symbol__ = api.symbol;
    var _uncaughtPromiseErrors = [];
    var isDisableWrappingUncaughtPromiseRejection = global[__symbol__('DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION')] === true;

    var symbolPromise = __symbol__('Promise');

    var symbolThen = __symbol__('then');

    var creationTrace = '__creationTrace__';

    api.onUnhandledError = function (e) {
      if (api.showUncaughtError()) {
        var rejection = e && e.rejection;

        if (rejection) {
          console.error('Unhandled Promise rejection:', rejection instanceof Error ? rejection.message : rejection, '; Zone:', e.zone.name, '; Task:', e.task && e.task.source, '; Value:', rejection, rejection instanceof Error ? rejection.stack : undefined);
        } else {
          console.error(e);
        }
      }
    };

    api.microtaskDrainDone = function () {
      var _loop_1 = function _loop_1() {
        var uncaughtPromiseError = _uncaughtPromiseErrors.shift();

        try {
          uncaughtPromiseError.zone.runGuarded(function () {
            throw uncaughtPromiseError;
          });
        } catch (error) {
          handleUnhandledRejection(error);
        }
      };

      while (_uncaughtPromiseErrors.length) {
        _loop_1();
      }
    };

    var UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL = __symbol__('unhandledPromiseRejectionHandler');

    function handleUnhandledRejection(e) {
      api.onUnhandledError(e);

      try {
        var handler = Zone[UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL];

        if (typeof handler === 'function') {
          handler.call(this, e);
        }
      } catch (err) {}
    }

    function isThenable(value) {
      return value && value.then;
    }

    function forwardResolution(value) {
      return value;
    }

    function forwardRejection(rejection) {
      return ZoneAwarePromise.reject(rejection);
    }

    var symbolState = __symbol__('state');

    var symbolValue = __symbol__('value');

    var symbolFinally = __symbol__('finally');

    var symbolParentPromiseValue = __symbol__('parentPromiseValue');

    var symbolParentPromiseState = __symbol__('parentPromiseState');

    var source = 'Promise.then';
    var UNRESOLVED = null;
    var RESOLVED = true;
    var REJECTED = false;
    var REJECTED_NO_CATCH = 0;

    function makeResolver(promise, state) {
      return function (v) {
        try {
          resolvePromise(promise, state, v);
        } catch (err) {
          resolvePromise(promise, false, err);
        } // Do not return value or you will break the Promise spec.

      };
    }

    var once = function once() {
      var wasCalled = false;
      return function wrapper(wrappedFunction) {
        return function () {
          if (wasCalled) {
            return;
          }

          wasCalled = true;
          wrappedFunction.apply(null, arguments);
        };
      };
    };

    var TYPE_ERROR = 'Promise resolved with itself';

    var CURRENT_TASK_TRACE_SYMBOL = __symbol__('currentTaskTrace'); // Promise Resolution


    function resolvePromise(promise, state, value) {
      var onceWrapper = once();

      if (promise === value) {
        throw new TypeError(TYPE_ERROR);
      }

      if (promise[symbolState] === UNRESOLVED) {
        // should only get value.then once based on promise spec.
        var then = null;

        try {
          if (typeof value === 'object' || typeof value === 'function') {
            then = value && value.then;
          }
        } catch (err) {
          onceWrapper(function () {
            resolvePromise(promise, false, err);
          })();
          return promise;
        } // if (value instanceof ZoneAwarePromise) {


        if (state !== REJECTED && value instanceof ZoneAwarePromise && value.hasOwnProperty(symbolState) && value.hasOwnProperty(symbolValue) && value[symbolState] !== UNRESOLVED) {
          clearRejectedNoCatch(value);
          resolvePromise(promise, value[symbolState], value[symbolValue]);
        } else if (state !== REJECTED && typeof then === 'function') {
          try {
            then.call(value, onceWrapper(makeResolver(promise, state)), onceWrapper(makeResolver(promise, false)));
          } catch (err) {
            onceWrapper(function () {
              resolvePromise(promise, false, err);
            })();
          }
        } else {
          promise[symbolState] = state;
          var queue = promise[symbolValue];
          promise[symbolValue] = value;

          if (promise[symbolFinally] === symbolFinally) {
            // the promise is generated by Promise.prototype.finally
            if (state === RESOLVED) {
              // the state is resolved, should ignore the value
              // and use parent promise value
              promise[symbolState] = promise[symbolParentPromiseState];
              promise[symbolValue] = promise[symbolParentPromiseValue];
            }
          } // record task information in value when error occurs, so we can
          // do some additional work such as render longStackTrace


          if (state === REJECTED && value instanceof Error) {
            // check if longStackTraceZone is here
            var trace = Zone.currentTask && Zone.currentTask.data && Zone.currentTask.data[creationTrace];

            if (trace) {
              // only keep the long stack trace into error when in longStackTraceZone
              ObjectDefineProperty(value, CURRENT_TASK_TRACE_SYMBOL, {
                configurable: true,
                enumerable: false,
                writable: true,
                value: trace
              });
            }
          }

          for (var i = 0; i < queue.length;) {
            scheduleResolveOrReject(promise, queue[i++], queue[i++], queue[i++], queue[i++]);
          }

          if (queue.length == 0 && state == REJECTED) {
            promise[symbolState] = REJECTED_NO_CATCH;
            var uncaughtPromiseError = value;

            if (!isDisableWrappingUncaughtPromiseRejection) {
              // If disable wrapping uncaught promise reject
              // and the rejected value is an Error object,
              // use the value instead of wrapping it.
              try {
                // Here we throws a new Error to print more readable error log
                // and if the value is not an error, zone.js builds an `Error`
                // Object here to attach the stack information.
                throw new Error('Uncaught (in promise): ' + readableObjectToString(value) + (value && value.stack ? '\n' + value.stack : ''));
              } catch (err) {
                uncaughtPromiseError = err;
              }
            }

            uncaughtPromiseError.rejection = value;
            uncaughtPromiseError.promise = promise;
            uncaughtPromiseError.zone = Zone.current;
            uncaughtPromiseError.task = Zone.currentTask;

            _uncaughtPromiseErrors.push(uncaughtPromiseError);

            api.scheduleMicroTask(); // to make sure that it is running
          }
        }
      } // Resolving an already resolved promise is a noop.


      return promise;
    }

    var REJECTION_HANDLED_HANDLER = __symbol__('rejectionHandledHandler');

    function clearRejectedNoCatch(promise) {
      if (promise[symbolState] === REJECTED_NO_CATCH) {
        // if the promise is rejected no catch status
        // and queue.length > 0, means there is a error handler
        // here to handle the rejected promise, we should trigger
        // windows.rejectionhandled eventHandler or nodejs rejectionHandled
        // eventHandler
        try {
          var handler = Zone[REJECTION_HANDLED_HANDLER];

          if (handler && typeof handler === 'function') {
            handler.call(this, {
              rejection: promise[symbolValue],
              promise: promise
            });
          }
        } catch (err) {}

        promise[symbolState] = REJECTED;

        for (var i = 0; i < _uncaughtPromiseErrors.length; i++) {
          if (promise === _uncaughtPromiseErrors[i].promise) {
            _uncaughtPromiseErrors.splice(i, 1);
          }
        }
      }
    }

    function scheduleResolveOrReject(promise, zone, chainPromise, onFulfilled, onRejected) {
      clearRejectedNoCatch(promise);
      var promiseState = promise[symbolState];
      var delegate = promiseState ? typeof onFulfilled === 'function' ? onFulfilled : forwardResolution : typeof onRejected === 'function' ? onRejected : forwardRejection;
      zone.scheduleMicroTask(source, function () {
        try {
          var parentPromiseValue = promise[symbolValue];
          var isFinallyPromise = !!chainPromise && symbolFinally === chainPromise[symbolFinally];

          if (isFinallyPromise) {
            // if the promise is generated from finally call, keep parent promise's state and value
            chainPromise[symbolParentPromiseValue] = parentPromiseValue;
            chainPromise[symbolParentPromiseState] = promiseState;
          } // should not pass value to finally callback


          var value = zone.run(delegate, undefined, isFinallyPromise && delegate !== forwardRejection && delegate !== forwardResolution ? [] : [parentPromiseValue]);
          resolvePromise(chainPromise, true, value);
        } catch (error) {
          // if error occurs, should always return this error
          resolvePromise(chainPromise, false, error);
        }
      }, chainPromise);
    }

    var ZONE_AWARE_PROMISE_TO_STRING = 'function ZoneAwarePromise() { [native code] }';

    var noop = function noop() {};

    var ZoneAwarePromise = function () {
      function ZoneAwarePromise(executor) {
        var promise = this;

        if (!(promise instanceof ZoneAwarePromise)) {
          throw new Error('Must be an instanceof Promise.');
        }

        promise[symbolState] = UNRESOLVED;
        promise[symbolValue] = []; // queue;

        try {
          executor && executor(makeResolver(promise, RESOLVED), makeResolver(promise, REJECTED));
        } catch (error) {
          resolvePromise(promise, false, error);
        }
      }

      ZoneAwarePromise.toString = function () {
        return ZONE_AWARE_PROMISE_TO_STRING;
      };

      ZoneAwarePromise.resolve = function (value) {
        return resolvePromise(new this(null), RESOLVED, value);
      };

      ZoneAwarePromise.reject = function (error) {
        return resolvePromise(new this(null), REJECTED, error);
      };

      ZoneAwarePromise.race = function (values) {
        var resolve;
        var reject;
        var promise = new this(function (res, rej) {
          resolve = res;
          reject = rej;
        });

        function onResolve(value) {
          resolve(value);
        }

        function onReject(error) {
          reject(error);
        }

        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
          var value = values_1[_i];

          if (!isThenable(value)) {
            value = this.resolve(value);
          }

          value.then(onResolve, onReject);
        }

        return promise;
      };

      ZoneAwarePromise.all = function (values) {
        return ZoneAwarePromise.allWithCallback(values);
      };

      ZoneAwarePromise.allSettled = function (values) {
        var P = this && this.prototype instanceof ZoneAwarePromise ? this : ZoneAwarePromise;
        return P.allWithCallback(values, {
          thenCallback: function thenCallback(value) {
            return {
              status: 'fulfilled',
              value: value
            };
          },
          errorCallback: function errorCallback(err) {
            return {
              status: 'rejected',
              reason: err
            };
          }
        });
      };

      ZoneAwarePromise.allWithCallback = function (values, callback) {
        var resolve;
        var reject;
        var promise = new this(function (res, rej) {
          resolve = res;
          reject = rej;
        }); // Start at 2 to prevent prematurely resolving if .then is called immediately.

        var unresolvedCount = 2;
        var valueIndex = 0;
        var resolvedValues = [];

        var _loop_2 = function _loop_2(value) {
          if (!isThenable(value)) {
            value = this_1.resolve(value);
          }

          var curValueIndex = valueIndex;

          try {
            value.then(function (value) {
              resolvedValues[curValueIndex] = callback ? callback.thenCallback(value) : value;
              unresolvedCount--;

              if (unresolvedCount === 0) {
                resolve(resolvedValues);
              }
            }, function (err) {
              if (!callback) {
                reject(err);
              } else {
                resolvedValues[curValueIndex] = callback.errorCallback(err);
                unresolvedCount--;

                if (unresolvedCount === 0) {
                  resolve(resolvedValues);
                }
              }
            });
          } catch (thenErr) {
            reject(thenErr);
          }

          unresolvedCount++;
          valueIndex++;
        };

        var this_1 = this;

        for (var _i = 0, values_2 = values; _i < values_2.length; _i++) {
          var value = values_2[_i];

          _loop_2(value);
        } // Make the unresolvedCount zero-based again.


        unresolvedCount -= 2;

        if (unresolvedCount === 0) {
          resolve(resolvedValues);
        }

        return promise;
      };

      Object.defineProperty(ZoneAwarePromise.prototype, Symbol.toStringTag, {
        get: function get() {
          return 'Promise';
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ZoneAwarePromise.prototype, Symbol.species, {
        get: function get() {
          return ZoneAwarePromise;
        },
        enumerable: true,
        configurable: true
      });

      ZoneAwarePromise.prototype.then = function (onFulfilled, onRejected) {
        var C = this.constructor[Symbol.species];

        if (!C || typeof C !== 'function') {
          C = this.constructor || ZoneAwarePromise;
        }

        var chainPromise = new C(noop);
        var zone = Zone.current;

        if (this[symbolState] == UNRESOLVED) {
          this[symbolValue].push(zone, chainPromise, onFulfilled, onRejected);
        } else {
          scheduleResolveOrReject(this, zone, chainPromise, onFulfilled, onRejected);
        }

        return chainPromise;
      };

      ZoneAwarePromise.prototype.catch = function (onRejected) {
        return this.then(null, onRejected);
      };

      ZoneAwarePromise.prototype.finally = function (onFinally) {
        var C = this.constructor[Symbol.species];

        if (!C || typeof C !== 'function') {
          C = ZoneAwarePromise;
        }

        var chainPromise = new C(noop);
        chainPromise[symbolFinally] = symbolFinally;
        var zone = Zone.current;

        if (this[symbolState] == UNRESOLVED) {
          this[symbolValue].push(zone, chainPromise, onFinally, onFinally);
        } else {
          scheduleResolveOrReject(this, zone, chainPromise, onFinally, onFinally);
        }

        return chainPromise;
      };

      return ZoneAwarePromise;
    }(); // Protect against aggressive optimizers dropping seemingly unused properties.
    // E.g. Closure Compiler in advanced mode.


    ZoneAwarePromise['resolve'] = ZoneAwarePromise.resolve;
    ZoneAwarePromise['reject'] = ZoneAwarePromise.reject;
    ZoneAwarePromise['race'] = ZoneAwarePromise.race;
    ZoneAwarePromise['all'] = ZoneAwarePromise.all;
    var NativePromise = global[symbolPromise] = global['Promise'];

    var ZONE_AWARE_PROMISE = Zone.__symbol__('ZoneAwarePromise');

    var desc = ObjectGetOwnPropertyDescriptor(global, 'Promise');

    if (!desc || desc.configurable) {
      desc && delete desc.writable;
      desc && delete desc.value;

      if (!desc) {
        desc = {
          configurable: true,
          enumerable: true
        };
      }

      desc.get = function () {
        // if we already set ZoneAwarePromise, use patched one
        // otherwise return native one.
        return global[ZONE_AWARE_PROMISE] ? global[ZONE_AWARE_PROMISE] : global[symbolPromise];
      };

      desc.set = function (NewNativePromise) {
        if (NewNativePromise === ZoneAwarePromise) {
          // if the NewNativePromise is ZoneAwarePromise
          // save to global
          global[ZONE_AWARE_PROMISE] = NewNativePromise;
        } else {
          // if the NewNativePromise is not ZoneAwarePromise
          // for example: after load zone.js, some library just
          // set es6-promise to global, if we set it to global
          // directly, assertZonePatched will fail and angular
          // will not loaded, so we just set the NewNativePromise
          // to global[symbolPromise], so the result is just like
          // we load ES6 Promise before zone.js
          global[symbolPromise] = NewNativePromise;

          if (!NewNativePromise.prototype[symbolThen]) {
            patchThen(NewNativePromise);
          }

          api.setNativePromise(NewNativePromise);
        }
      };

      ObjectDefineProperty(global, 'Promise', desc);
    }

    global['Promise'] = ZoneAwarePromise;

    var symbolThenPatched = __symbol__('thenPatched');

    function patchThen(Ctor) {
      var proto = Ctor.prototype;
      var prop = ObjectGetOwnPropertyDescriptor(proto, 'then');

      if (prop && (prop.writable === false || !prop.configurable)) {
        // check Ctor.prototype.then propertyDescriptor is writable or not
        // in meteor env, writable is false, we should ignore such case
        return;
      }

      var originalThen = proto.then; // Keep a reference to the original method.

      proto[symbolThen] = originalThen;

      Ctor.prototype.then = function (onResolve, onReject) {
        var _this = this;

        var wrapped = new ZoneAwarePromise(function (resolve, reject) {
          originalThen.call(_this, resolve, reject);
        });
        return wrapped.then(onResolve, onReject);
      };

      Ctor[symbolThenPatched] = true;
    }

    api.patchThen = patchThen;

    function zoneify(fn) {
      return function () {
        var resultPromise = fn.apply(this, arguments);

        if (resultPromise instanceof ZoneAwarePromise) {
          return resultPromise;
        }

        var ctor = resultPromise.constructor;

        if (!ctor[symbolThenPatched]) {
          patchThen(ctor);
        }

        return resultPromise;
      };
    }

    if (NativePromise) {
      patchThen(NativePromise);
      var fetch_1 = global['fetch'];

      if (typeof fetch_1 == 'function') {
        global[api.symbol('fetch')] = fetch_1;
        global['fetch'] = zoneify(fetch_1);
      }
    } // This is not part of public API, but it is useful for tests, so we expose it.


    Promise[Zone.__symbol__('uncaughtPromiseErrors')] = _uncaughtPromiseErrors;
    return ZoneAwarePromise;
  });
  /**
   * @license
   * Copyright Google Inc. All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   */

  /**
   * Suppress closure compiler errors about unknown 'Zone' variable
   * @fileoverview
   * @suppress {undefinedVars,globalThis,missingRequire}
   */
  /// <reference types="node"/>
  // issue #989, to reduce bundle size, use short name

  /** Object.getOwnPropertyDescriptor */


  var ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  /** Object.defineProperty */

  var ObjectDefineProperty = Object.defineProperty;
  /** Object.getPrototypeOf */

  var ObjectGetPrototypeOf = Object.getPrototypeOf;
  /** Object.create */

  var ObjectCreate = Object.create;
  /** Array.prototype.slice */

  var ArraySlice = Array.prototype.slice;
  /** addEventListener string const */

  var ADD_EVENT_LISTENER_STR = 'addEventListener';
  /** removeEventListener string const */

  var REMOVE_EVENT_LISTENER_STR = 'removeEventListener';
  /** zoneSymbol addEventListener */

  var ZONE_SYMBOL_ADD_EVENT_LISTENER = Zone.__symbol__(ADD_EVENT_LISTENER_STR);
  /** zoneSymbol removeEventListener */


  var ZONE_SYMBOL_REMOVE_EVENT_LISTENER = Zone.__symbol__(REMOVE_EVENT_LISTENER_STR);
  /** true string const */


  var TRUE_STR = 'true';
  /** false string const */

  var FALSE_STR = 'false';
  /** Zone symbol prefix string const. */

  var ZONE_SYMBOL_PREFIX = Zone.__symbol__('');

  function wrapWithCurrentZone(callback, source) {
    return Zone.current.wrap(callback, source);
  }

  function scheduleMacroTaskWithCurrentZone(source, callback, data, customSchedule, customCancel) {
    return Zone.current.scheduleMacroTask(source, callback, data, customSchedule, customCancel);
  }

  var zoneSymbol = Zone.__symbol__;
  var isWindowExists = typeof window !== 'undefined';
  var internalWindow = isWindowExists ? window : undefined;

  var _global = isWindowExists && internalWindow || typeof self === 'object' && self || global;

  var REMOVE_ATTRIBUTE = 'removeAttribute';
  var NULL_ON_PROP_VALUE = [null];

  function bindArguments(args, source) {
    for (var i = args.length - 1; i >= 0; i--) {
      if (typeof args[i] === 'function') {
        args[i] = wrapWithCurrentZone(args[i], source + '_' + i);
      }
    }

    return args;
  }

  function patchPrototype(prototype, fnNames) {
    var source = prototype.constructor['name'];

    var _loop_3 = function _loop_3(i) {
      var name_1 = fnNames[i];
      var delegate = prototype[name_1];

      if (delegate) {
        var prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, name_1);

        if (!isPropertyWritable(prototypeDesc)) {
          return "continue";
        }

        prototype[name_1] = function (delegate) {
          var patched = function patched() {
            return delegate.apply(this, bindArguments(arguments, source + '.' + name_1));
          };

          attachOriginToPatched(patched, delegate);
          return patched;
        }(delegate);
      }
    };

    for (var i = 0; i < fnNames.length; i++) {
      _loop_3(i);
    }
  }

  function isPropertyWritable(propertyDesc) {
    if (!propertyDesc) {
      return true;
    }

    if (propertyDesc.writable === false) {
      return false;
    }

    return !(typeof propertyDesc.get === 'function' && typeof propertyDesc.set === 'undefined');
  }

  var isWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope; // Make sure to access `process` through `_global` so that WebPack does not accidentally browserify
  // this code.

  var isNode = !('nw' in _global) && typeof _global.process !== 'undefined' && {}.toString.call(_global.process) === '[object process]';
  var isBrowser = !isNode && !isWebWorker && !!(isWindowExists && internalWindow['HTMLElement']); // we are in electron of nw, so we are both browser and nodejs
  // Make sure to access `process` through `_global` so that WebPack does not accidentally browserify
  // this code.

  var isMix = typeof _global.process !== 'undefined' && {}.toString.call(_global.process) === '[object process]' && !isWebWorker && !!(isWindowExists && internalWindow['HTMLElement']);
  var zoneSymbolEventNames = {};

  var wrapFn = function wrapFn(event) {
    // https://github.com/angular/zone.js/issues/911, in IE, sometimes
    // event will be undefined, so we need to use window.event
    event = event || _global.event;

    if (!event) {
      return;
    }

    var eventNameSymbol = zoneSymbolEventNames[event.type];

    if (!eventNameSymbol) {
      eventNameSymbol = zoneSymbolEventNames[event.type] = zoneSymbol('ON_PROPERTY' + event.type);
    }

    var target = this || event.target || _global;
    var listener = target[eventNameSymbol];
    var result;

    if (isBrowser && target === internalWindow && event.type === 'error') {
      // window.onerror have different signiture
      // https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror#window.onerror
      // and onerror callback will prevent default when callback return true
      var errorEvent = event;
      result = listener && listener.call(this, errorEvent.message, errorEvent.filename, errorEvent.lineno, errorEvent.colno, errorEvent.error);

      if (result === true) {
        event.preventDefault();
      }
    } else {
      result = listener && listener.apply(this, arguments);

      if (result != undefined && !result) {
        event.preventDefault();
      }
    }

    return result;
  };

  function patchProperty(obj, prop, prototype) {
    var desc = ObjectGetOwnPropertyDescriptor(obj, prop);

    if (!desc && prototype) {
      // when patch window object, use prototype to check prop exist or not
      var prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, prop);

      if (prototypeDesc) {
        desc = {
          enumerable: true,
          configurable: true
        };
      }
    } // if the descriptor not exists or is not configurable
    // just return


    if (!desc || !desc.configurable) {
      return;
    }

    var onPropPatchedSymbol = zoneSymbol('on' + prop + 'patched');

    if (obj.hasOwnProperty(onPropPatchedSymbol) && obj[onPropPatchedSymbol]) {
      return;
    } // A property descriptor cannot have getter/setter and be writable
    // deleting the writable and value properties avoids this error:
    //
    // TypeError: property descriptors must not specify a value or be writable when a
    // getter or setter has been specified


    delete desc.writable;
    delete desc.value;
    var originalDescGet = desc.get;
    var originalDescSet = desc.set; // substr(2) cuz 'onclick' -> 'click', etc

    var eventName = prop.substr(2);
    var eventNameSymbol = zoneSymbolEventNames[eventName];

    if (!eventNameSymbol) {
      eventNameSymbol = zoneSymbolEventNames[eventName] = zoneSymbol('ON_PROPERTY' + eventName);
    }

    desc.set = function (newValue) {
      // in some of windows's onproperty callback, this is undefined
      // so we need to check it
      var target = this;

      if (!target && obj === _global) {
        target = _global;
      }

      if (!target) {
        return;
      }

      var previousValue = target[eventNameSymbol];

      if (previousValue) {
        target.removeEventListener(eventName, wrapFn);
      } // issue #978, when onload handler was added before loading zone.js
      // we should remove it with originalDescSet


      if (originalDescSet) {
        originalDescSet.apply(target, NULL_ON_PROP_VALUE);
      }

      if (typeof newValue === 'function') {
        target[eventNameSymbol] = newValue;
        target.addEventListener(eventName, wrapFn, false);
      } else {
        target[eventNameSymbol] = null;
      }
    }; // The getter would return undefined for unassigned properties but the default value of an
    // unassigned property is null


    desc.get = function () {
      // in some of windows's onproperty callback, this is undefined
      // so we need to check it
      var target = this;

      if (!target && obj === _global) {
        target = _global;
      }

      if (!target) {
        return null;
      }

      var listener = target[eventNameSymbol];

      if (listener) {
        return listener;
      } else if (originalDescGet) {
        // result will be null when use inline event attribute,
        // such as <button onclick="func();">OK</button>
        // because the onclick function is internal raw uncompiled handler
        // the onclick will be evaluated when first time event was triggered or
        // the property is accessed, https://github.com/angular/zone.js/issues/525
        // so we should use original native get to retrieve the handler
        var value = originalDescGet && originalDescGet.call(this);

        if (value) {
          desc.set.call(this, value);

          if (typeof target[REMOVE_ATTRIBUTE] === 'function') {
            target.removeAttribute(prop);
          }

          return value;
        }
      }

      return null;
    };

    ObjectDefineProperty(obj, prop, desc);
    obj[onPropPatchedSymbol] = true;
  }

  function patchOnProperties(obj, properties, prototype) {
    if (properties) {
      for (var i = 0; i < properties.length; i++) {
        patchProperty(obj, 'on' + properties[i], prototype);
      }
    } else {
      var onProperties = [];

      for (var prop in obj) {
        if (prop.substr(0, 2) == 'on') {
          onProperties.push(prop);
        }
      }

      for (var j = 0; j < onProperties.length; j++) {
        patchProperty(obj, onProperties[j], prototype);
      }
    }
  }

  var originalInstanceKey = zoneSymbol('originalInstance'); // wrap some native API on `window`

  function patchClass(className) {
    var OriginalClass = _global[className];
    if (!OriginalClass) return; // keep original class in global

    _global[zoneSymbol(className)] = OriginalClass;

    _global[className] = function () {
      var a = bindArguments(arguments, className);

      switch (a.length) {
        case 0:
          this[originalInstanceKey] = new OriginalClass();
          break;

        case 1:
          this[originalInstanceKey] = new OriginalClass(a[0]);
          break;

        case 2:
          this[originalInstanceKey] = new OriginalClass(a[0], a[1]);
          break;

        case 3:
          this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2]);
          break;

        case 4:
          this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2], a[3]);
          break;

        default:
          throw new Error('Arg list too long.');
      }
    }; // attach original delegate to patched function


    attachOriginToPatched(_global[className], OriginalClass);
    var instance = new OriginalClass(function () {});
    var prop;

    for (prop in instance) {
      // https://bugs.webkit.org/show_bug.cgi?id=44721
      if (className === 'XMLHttpRequest' && prop === 'responseBlob') continue;

      (function (prop) {
        if (typeof instance[prop] === 'function') {
          _global[className].prototype[prop] = function () {
            return this[originalInstanceKey][prop].apply(this[originalInstanceKey], arguments);
          };
        } else {
          ObjectDefineProperty(_global[className].prototype, prop, {
            set: function set(fn) {
              if (typeof fn === 'function') {
                this[originalInstanceKey][prop] = wrapWithCurrentZone(fn, className + '.' + prop); // keep callback in wrapped function so we can
                // use it in Function.prototype.toString to return
                // the native one.

                attachOriginToPatched(this[originalInstanceKey][prop], fn);
              } else {
                this[originalInstanceKey][prop] = fn;
              }
            },
            get: function get() {
              return this[originalInstanceKey][prop];
            }
          });
        }
      })(prop);
    }

    for (prop in OriginalClass) {
      if (prop !== 'prototype' && OriginalClass.hasOwnProperty(prop)) {
        _global[className][prop] = OriginalClass[prop];
      }
    }
  }

  function copySymbolProperties(src, dest) {
    if (typeof Object.getOwnPropertySymbols !== 'function') {
      return;
    }

    var symbols = Object.getOwnPropertySymbols(src);
    symbols.forEach(function (symbol) {
      var desc = Object.getOwnPropertyDescriptor(src, symbol);
      Object.defineProperty(dest, symbol, {
        get: function get() {
          return src[symbol];
        },
        set: function set(value) {
          if (desc && (!desc.writable || typeof desc.set !== 'function')) {
            // if src[symbol] is not writable or not have a setter, just return
            return;
          }

          src[symbol] = value;
        },
        enumerable: desc ? desc.enumerable : true,
        configurable: desc ? desc.configurable : true
      });
    });
  }

  var shouldCopySymbolProperties = false;

  function patchMethod(target, name, patchFn) {
    var proto = target;

    while (proto && !proto.hasOwnProperty(name)) {
      proto = ObjectGetPrototypeOf(proto);
    }

    if (!proto && target[name]) {
      // somehow we did not find it, but we can see it. This happens on IE for Window properties.
      proto = target;
    }

    var delegateName = zoneSymbol(name);
    var delegate = null;

    if (proto && !(delegate = proto[delegateName])) {
      delegate = proto[delegateName] = proto[name]; // check whether proto[name] is writable
      // some property is readonly in safari, such as HtmlCanvasElement.prototype.toBlob

      var desc = proto && ObjectGetOwnPropertyDescriptor(proto, name);

      if (isPropertyWritable(desc)) {
        var patchDelegate_1 = patchFn(delegate, delegateName, name);

        proto[name] = function () {
          return patchDelegate_1(this, arguments);
        };

        attachOriginToPatched(proto[name], delegate);

        if (shouldCopySymbolProperties) {
          copySymbolProperties(delegate, proto[name]);
        }
      }
    }

    return delegate;
  } // TODO: @JiaLiPassion, support cancel task later if necessary


  function patchMacroTask(obj, funcName, metaCreator) {
    var setNative = null;

    function scheduleTask(task) {
      var data = task.data;

      data.args[data.cbIdx] = function () {
        task.invoke.apply(this, arguments);
      };

      setNative.apply(data.target, data.args);
      return task;
    }

    setNative = patchMethod(obj, funcName, function (delegate) {
      return function (self, args) {
        var meta = metaCreator(self, args);

        if (meta.cbIdx >= 0 && typeof args[meta.cbIdx] === 'function') {
          return scheduleMacroTaskWithCurrentZone(meta.name, args[meta.cbIdx], meta, scheduleTask);
        } else {
          // cause an error by calling it directly.
          return delegate.apply(self, args);
        }
      };
    });
  }

  function attachOriginToPatched(patched, original) {
    patched[zoneSymbol('OriginalDelegate')] = original;
  }

  var isDetectedIEOrEdge = false;
  var ieOrEdge = false;

  function isIE() {
    try {
      var ua = internalWindow.navigator.userAgent;

      if (ua.indexOf('MSIE ') !== -1 || ua.indexOf('Trident/') !== -1) {
        return true;
      }
    } catch (error) {}

    return false;
  }

  function isIEOrEdge() {
    if (isDetectedIEOrEdge) {
      return ieOrEdge;
    }

    isDetectedIEOrEdge = true;

    try {
      var ua = internalWindow.navigator.userAgent;

      if (ua.indexOf('MSIE ') !== -1 || ua.indexOf('Trident/') !== -1 || ua.indexOf('Edge/') !== -1) {
        ieOrEdge = true;
      }
    } catch (error) {}

    return ieOrEdge;
  }
  /**
   * @license
   * Copyright Google Inc. All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   */
  // override Function.prototype.toString to make zone.js patched function
  // look like native function


  Zone.__load_patch('toString', function (global) {
    // patch Func.prototype.toString to let them look like native
    var originalFunctionToString = Function.prototype.toString;
    var ORIGINAL_DELEGATE_SYMBOL = zoneSymbol('OriginalDelegate');
    var PROMISE_SYMBOL = zoneSymbol('Promise');
    var ERROR_SYMBOL = zoneSymbol('Error');

    var newFunctionToString = function toString() {
      if (typeof this === 'function') {
        var originalDelegate = this[ORIGINAL_DELEGATE_SYMBOL];

        if (originalDelegate) {
          if (typeof originalDelegate === 'function') {
            return originalFunctionToString.call(originalDelegate);
          } else {
            return Object.prototype.toString.call(originalDelegate);
          }
        }

        if (this === Promise) {
          var nativePromise = global[PROMISE_SYMBOL];

          if (nativePromise) {
            return originalFunctionToString.call(nativePromise);
          }
        }

        if (this === Error) {
          var nativeError = global[ERROR_SYMBOL];

          if (nativeError) {
            return originalFunctionToString.call(nativeError);
          }
        }
      }

      return originalFunctionToString.call(this);
    };

    newFunctionToString[ORIGINAL_DELEGATE_SYMBOL] = originalFunctionToString;
    Function.prototype.toString = newFunctionToString; // patch Object.prototype.toString to let them look like native

    var originalObjectToString = Object.prototype.toString;
    var PROMISE_OBJECT_TO_STRING = '[object Promise]';

    Object.prototype.toString = function () {
      if (this instanceof Promise) {
        return PROMISE_OBJECT_TO_STRING;
      }

      return originalObjectToString.call(this);
    };
  });
  /**
   * @license
   * Copyright Google Inc. All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   */


  var passiveSupported = false;

  if (typeof window !== 'undefined') {
    try {
      var options = Object.defineProperty({}, 'passive', {
        get: function get() {
          passiveSupported = true;
        }
      });
      window.addEventListener('test', options, options);
      window.removeEventListener('test', options, options);
    } catch (err) {
      passiveSupported = false;
    }
  } // an identifier to tell ZoneTask do not create a new invoke closure


  var OPTIMIZED_ZONE_EVENT_TASK_DATA = {
    useG: true
  };
  var zoneSymbolEventNames$1 = {};
  var globalSources = {};
  var EVENT_NAME_SYMBOL_REGX = new RegExp('^' + ZONE_SYMBOL_PREFIX + '(\\w+)(true|false)$');
  var IMMEDIATE_PROPAGATION_SYMBOL = zoneSymbol('propagationStopped');

  function prepareEventNames(eventName, eventNameToString) {
    var falseEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + FALSE_STR;
    var trueEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + TRUE_STR;
    var symbol = ZONE_SYMBOL_PREFIX + falseEventName;
    var symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
    zoneSymbolEventNames$1[eventName] = {};
    zoneSymbolEventNames$1[eventName][FALSE_STR] = symbol;
    zoneSymbolEventNames$1[eventName][TRUE_STR] = symbolCapture;
  }

  function patchEventTarget(_global, apis, patchOptions) {
    var ADD_EVENT_LISTENER = patchOptions && patchOptions.add || ADD_EVENT_LISTENER_STR;
    var REMOVE_EVENT_LISTENER = patchOptions && patchOptions.rm || REMOVE_EVENT_LISTENER_STR;
    var LISTENERS_EVENT_LISTENER = patchOptions && patchOptions.listeners || 'eventListeners';
    var REMOVE_ALL_LISTENERS_EVENT_LISTENER = patchOptions && patchOptions.rmAll || 'removeAllListeners';
    var zoneSymbolAddEventListener = zoneSymbol(ADD_EVENT_LISTENER);
    var ADD_EVENT_LISTENER_SOURCE = '.' + ADD_EVENT_LISTENER + ':';
    var PREPEND_EVENT_LISTENER = 'prependListener';
    var PREPEND_EVENT_LISTENER_SOURCE = '.' + PREPEND_EVENT_LISTENER + ':';

    var invokeTask = function invokeTask(task, target, event) {
      // for better performance, check isRemoved which is set
      // by removeEventListener
      if (task.isRemoved) {
        return;
      }

      var delegate = task.callback;

      if (typeof delegate === 'object' && delegate.handleEvent) {
        // create the bind version of handleEvent when invoke
        task.callback = function (event) {
          return delegate.handleEvent(event);
        };

        task.originalDelegate = delegate;
      } // invoke static task.invoke


      task.invoke(task, target, [event]);
      var options = task.options;

      if (options && typeof options === 'object' && options.once) {
        // if options.once is true, after invoke once remove listener here
        // only browser need to do this, nodejs eventEmitter will cal removeListener
        // inside EventEmitter.once
        var delegate_1 = task.originalDelegate ? task.originalDelegate : task.callback;
        target[REMOVE_EVENT_LISTENER].call(target, event.type, delegate_1, options);
      }
    }; // global shared zoneAwareCallback to handle all event callback with capture = false


    var globalZoneAwareCallback = function globalZoneAwareCallback(event) {
      // https://github.com/angular/zone.js/issues/911, in IE, sometimes
      // event will be undefined, so we need to use window.event
      event = event || _global.event;

      if (!event) {
        return;
      } // event.target is needed for Samsung TV and SourceBuffer
      // || global is needed https://github.com/angular/zone.js/issues/190


      var target = this || event.target || _global;
      var tasks = target[zoneSymbolEventNames$1[event.type][FALSE_STR]];

      if (tasks) {
        // invoke all tasks which attached to current target with given event.type and capture = false
        // for performance concern, if task.length === 1, just invoke
        if (tasks.length === 1) {
          invokeTask(tasks[0], target, event);
        } else {
          // https://github.com/angular/zone.js/issues/836
          // copy the tasks array before invoke, to avoid
          // the callback will remove itself or other listener
          var copyTasks = tasks.slice();

          for (var i = 0; i < copyTasks.length; i++) {
            if (event && event[IMMEDIATE_PROPAGATION_SYMBOL] === true) {
              break;
            }

            invokeTask(copyTasks[i], target, event);
          }
        }
      }
    }; // global shared zoneAwareCallback to handle all event callback with capture = true


    var globalZoneAwareCaptureCallback = function globalZoneAwareCaptureCallback(event) {
      // https://github.com/angular/zone.js/issues/911, in IE, sometimes
      // event will be undefined, so we need to use window.event
      event = event || _global.event;

      if (!event) {
        return;
      } // event.target is needed for Samsung TV and SourceBuffer
      // || global is needed https://github.com/angular/zone.js/issues/190


      var target = this || event.target || _global;
      var tasks = target[zoneSymbolEventNames$1[event.type][TRUE_STR]];

      if (tasks) {
        // invoke all tasks which attached to current target with given event.type and capture = false
        // for performance concern, if task.length === 1, just invoke
        if (tasks.length === 1) {
          invokeTask(tasks[0], target, event);
        } else {
          // https://github.com/angular/zone.js/issues/836
          // copy the tasks array before invoke, to avoid
          // the callback will remove itself or other listener
          var copyTasks = tasks.slice();

          for (var i = 0; i < copyTasks.length; i++) {
            if (event && event[IMMEDIATE_PROPAGATION_SYMBOL] === true) {
              break;
            }

            invokeTask(copyTasks[i], target, event);
          }
        }
      }
    };

    function patchEventTargetMethods(obj, patchOptions) {
      if (!obj) {
        return false;
      }

      var useGlobalCallback = true;

      if (patchOptions && patchOptions.useG !== undefined) {
        useGlobalCallback = patchOptions.useG;
      }

      var validateHandler = patchOptions && patchOptions.vh;
      var checkDuplicate = true;

      if (patchOptions && patchOptions.chkDup !== undefined) {
        checkDuplicate = patchOptions.chkDup;
      }

      var returnTarget = false;

      if (patchOptions && patchOptions.rt !== undefined) {
        returnTarget = patchOptions.rt;
      }

      var proto = obj;

      while (proto && !proto.hasOwnProperty(ADD_EVENT_LISTENER)) {
        proto = ObjectGetPrototypeOf(proto);
      }

      if (!proto && obj[ADD_EVENT_LISTENER]) {
        // somehow we did not find it, but we can see it. This happens on IE for Window properties.
        proto = obj;
      }

      if (!proto) {
        return false;
      }

      if (proto[zoneSymbolAddEventListener]) {
        return false;
      }

      var eventNameToString = patchOptions && patchOptions.eventNameToString; // a shared global taskData to pass data for scheduleEventTask
      // so we do not need to create a new object just for pass some data

      var taskData = {};
      var nativeAddEventListener = proto[zoneSymbolAddEventListener] = proto[ADD_EVENT_LISTENER];
      var nativeRemoveEventListener = proto[zoneSymbol(REMOVE_EVENT_LISTENER)] = proto[REMOVE_EVENT_LISTENER];
      var nativeListeners = proto[zoneSymbol(LISTENERS_EVENT_LISTENER)] = proto[LISTENERS_EVENT_LISTENER];
      var nativeRemoveAllListeners = proto[zoneSymbol(REMOVE_ALL_LISTENERS_EVENT_LISTENER)] = proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER];
      var nativePrependEventListener;

      if (patchOptions && patchOptions.prepend) {
        nativePrependEventListener = proto[zoneSymbol(patchOptions.prepend)] = proto[patchOptions.prepend];
      }
      /**
       * This util function will build an option object with passive option
       * to handle all possible input from the user.
       */


      function buildEventListenerOptions(options, passive) {
        if (!passiveSupported && typeof options === 'object' && options) {
          // doesn't support passive but user want to pass an object as options.
          // this will not work on some old browser, so we just pass a boolean
          // as useCapture parameter
          return !!options.capture;
        }

        if (!passiveSupported || !passive) {
          return options;
        }

        if (typeof options === 'boolean') {
          return {
            capture: options,
            passive: true
          };
        }

        if (!options) {
          return {
            passive: true
          };
        }

        if (typeof options === 'object' && options.passive !== false) {
          return Object.assign(Object.assign({}, options), {
            passive: true
          });
        }

        return options;
      }

      var customScheduleGlobal = function customScheduleGlobal(task) {
        // if there is already a task for the eventName + capture,
        // just return, because we use the shared globalZoneAwareCallback here.
        if (taskData.isExisting) {
          return;
        }

        return nativeAddEventListener.call(taskData.target, taskData.eventName, taskData.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, taskData.options);
      };

      var customCancelGlobal = function customCancelGlobal(task) {
        // if task is not marked as isRemoved, this call is directly
        // from Zone.prototype.cancelTask, we should remove the task
        // from tasksList of target first
        if (!task.isRemoved) {
          var symbolEventNames = zoneSymbolEventNames$1[task.eventName];
          var symbolEventName = void 0;

          if (symbolEventNames) {
            symbolEventName = symbolEventNames[task.capture ? TRUE_STR : FALSE_STR];
          }

          var existingTasks = symbolEventName && task.target[symbolEventName];

          if (existingTasks) {
            for (var i = 0; i < existingTasks.length; i++) {
              var existingTask = existingTasks[i];

              if (existingTask === task) {
                existingTasks.splice(i, 1); // set isRemoved to data for faster invokeTask check

                task.isRemoved = true;

                if (existingTasks.length === 0) {
                  // all tasks for the eventName + capture have gone,
                  // remove globalZoneAwareCallback and remove the task cache from target
                  task.allRemoved = true;
                  task.target[symbolEventName] = null;
                }

                break;
              }
            }
          }
        } // if all tasks for the eventName + capture have gone,
        // we will really remove the global event callback,
        // if not, return


        if (!task.allRemoved) {
          return;
        }

        return nativeRemoveEventListener.call(task.target, task.eventName, task.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, task.options);
      };

      var customScheduleNonGlobal = function customScheduleNonGlobal(task) {
        return nativeAddEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
      };

      var customSchedulePrepend = function customSchedulePrepend(task) {
        return nativePrependEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
      };

      var customCancelNonGlobal = function customCancelNonGlobal(task) {
        return nativeRemoveEventListener.call(task.target, task.eventName, task.invoke, task.options);
      };

      var customSchedule = useGlobalCallback ? customScheduleGlobal : customScheduleNonGlobal;
      var customCancel = useGlobalCallback ? customCancelGlobal : customCancelNonGlobal;

      var compareTaskCallbackVsDelegate = function compareTaskCallbackVsDelegate(task, delegate) {
        var typeOfDelegate = typeof delegate;
        return typeOfDelegate === 'function' && task.callback === delegate || typeOfDelegate === 'object' && task.originalDelegate === delegate;
      };

      var compare = patchOptions && patchOptions.diff ? patchOptions.diff : compareTaskCallbackVsDelegate;
      var blackListedEvents = Zone[zoneSymbol('BLACK_LISTED_EVENTS')];

      var passiveEvents = _global[zoneSymbol('PASSIVE_EVENTS')];

      var makeAddListener = function makeAddListener(nativeListener, addSource, customScheduleFn, customCancelFn, returnTarget, prepend) {
        if (returnTarget === void 0) {
          returnTarget = false;
        }

        if (prepend === void 0) {
          prepend = false;
        }

        return function () {
          var target = this || _global;
          var eventName = arguments[0];

          if (patchOptions && patchOptions.transferEventName) {
            eventName = patchOptions.transferEventName(eventName);
          }

          var delegate = arguments[1];

          if (!delegate) {
            return nativeListener.apply(this, arguments);
          }

          if (isNode && eventName === 'uncaughtException') {
            // don't patch uncaughtException of nodejs to prevent endless loop
            return nativeListener.apply(this, arguments);
          } // don't create the bind delegate function for handleEvent
          // case here to improve addEventListener performance
          // we will create the bind delegate when invoke


          var isHandleEvent = false;

          if (typeof delegate !== 'function') {
            if (!delegate.handleEvent) {
              return nativeListener.apply(this, arguments);
            }

            isHandleEvent = true;
          }

          if (validateHandler && !validateHandler(nativeListener, delegate, target, arguments)) {
            return;
          }

          var passive = passiveSupported && !!passiveEvents && passiveEvents.indexOf(eventName) !== -1;
          var options = buildEventListenerOptions(arguments[2], passive);

          if (blackListedEvents) {
            // check black list
            for (var i = 0; i < blackListedEvents.length; i++) {
              if (eventName === blackListedEvents[i]) {
                if (passive) {
                  return nativeListener.call(target, eventName, delegate, options);
                } else {
                  return nativeListener.apply(this, arguments);
                }
              }
            }
          }

          var capture = !options ? false : typeof options === 'boolean' ? true : options.capture;
          var once = options && typeof options === 'object' ? options.once : false;
          var zone = Zone.current;
          var symbolEventNames = zoneSymbolEventNames$1[eventName];

          if (!symbolEventNames) {
            prepareEventNames(eventName, eventNameToString);
            symbolEventNames = zoneSymbolEventNames$1[eventName];
          }

          var symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
          var existingTasks = target[symbolEventName];
          var isExisting = false;

          if (existingTasks) {
            // already have task registered
            isExisting = true;

            if (checkDuplicate) {
              for (var i = 0; i < existingTasks.length; i++) {
                if (compare(existingTasks[i], delegate)) {
                  // same callback, same capture, same event name, just return
                  return;
                }
              }
            }
          } else {
            existingTasks = target[symbolEventName] = [];
          }

          var source;
          var constructorName = target.constructor['name'];
          var targetSource = globalSources[constructorName];

          if (targetSource) {
            source = targetSource[eventName];
          }

          if (!source) {
            source = constructorName + addSource + (eventNameToString ? eventNameToString(eventName) : eventName);
          } // do not create a new object as task.data to pass those things
          // just use the global shared one


          taskData.options = options;

          if (once) {
            // if addEventListener with once options, we don't pass it to
            // native addEventListener, instead we keep the once setting
            // and handle ourselves.
            taskData.options.once = false;
          }

          taskData.target = target;
          taskData.capture = capture;
          taskData.eventName = eventName;
          taskData.isExisting = isExisting;
          var data = useGlobalCallback ? OPTIMIZED_ZONE_EVENT_TASK_DATA : undefined; // keep taskData into data to allow onScheduleEventTask to access the task information

          if (data) {
            data.taskData = taskData;
          }

          var task = zone.scheduleEventTask(source, delegate, data, customScheduleFn, customCancelFn); // should clear taskData.target to avoid memory leak
          // issue, https://github.com/angular/angular/issues/20442

          taskData.target = null; // need to clear up taskData because it is a global object

          if (data) {
            data.taskData = null;
          } // have to save those information to task in case
          // application may call task.zone.cancelTask() directly


          if (once) {
            options.once = true;
          }

          if (!(!passiveSupported && typeof task.options === 'boolean')) {
            // if not support passive, and we pass an option object
            // to addEventListener, we should save the options to task
            task.options = options;
          }

          task.target = target;
          task.capture = capture;
          task.eventName = eventName;

          if (isHandleEvent) {
            // save original delegate for compare to check duplicate
            task.originalDelegate = delegate;
          }

          if (!prepend) {
            existingTasks.push(task);
          } else {
            existingTasks.unshift(task);
          }

          if (returnTarget) {
            return target;
          }
        };
      };

      proto[ADD_EVENT_LISTENER] = makeAddListener(nativeAddEventListener, ADD_EVENT_LISTENER_SOURCE, customSchedule, customCancel, returnTarget);

      if (nativePrependEventListener) {
        proto[PREPEND_EVENT_LISTENER] = makeAddListener(nativePrependEventListener, PREPEND_EVENT_LISTENER_SOURCE, customSchedulePrepend, customCancel, returnTarget, true);
      }

      proto[REMOVE_EVENT_LISTENER] = function () {
        var target = this || _global;
        var eventName = arguments[0];

        if (patchOptions && patchOptions.transferEventName) {
          eventName = patchOptions.transferEventName(eventName);
        }

        var options = arguments[2];
        var capture = !options ? false : typeof options === 'boolean' ? true : options.capture;
        var delegate = arguments[1];

        if (!delegate) {
          return nativeRemoveEventListener.apply(this, arguments);
        }

        if (validateHandler && !validateHandler(nativeRemoveEventListener, delegate, target, arguments)) {
          return;
        }

        var symbolEventNames = zoneSymbolEventNames$1[eventName];
        var symbolEventName;

        if (symbolEventNames) {
          symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
        }

        var existingTasks = symbolEventName && target[symbolEventName];

        if (existingTasks) {
          for (var i = 0; i < existingTasks.length; i++) {
            var existingTask = existingTasks[i];

            if (compare(existingTask, delegate)) {
              existingTasks.splice(i, 1); // set isRemoved to data for faster invokeTask check

              existingTask.isRemoved = true;

              if (existingTasks.length === 0) {
                // all tasks for the eventName + capture have gone,
                // remove globalZoneAwareCallback and remove the task cache from target
                existingTask.allRemoved = true;
                target[symbolEventName] = null; // in the target, we have an event listener which is added by on_property
                // such as target.onclick = function() {}, so we need to clear this internal
                // property too if all delegates all removed

                if (typeof eventName === 'string') {
                  var onPropertySymbol = ZONE_SYMBOL_PREFIX + 'ON_PROPERTY' + eventName;
                  target[onPropertySymbol] = null;
                }
              }

              existingTask.zone.cancelTask(existingTask);

              if (returnTarget) {
                return target;
              }

              return;
            }
          }
        } // issue 930, didn't find the event name or callback
        // from zone kept existingTasks, the callback maybe
        // added outside of zone, we need to call native removeEventListener
        // to try to remove it.


        return nativeRemoveEventListener.apply(this, arguments);
      };

      proto[LISTENERS_EVENT_LISTENER] = function () {
        var target = this || _global;
        var eventName = arguments[0];

        if (patchOptions && patchOptions.transferEventName) {
          eventName = patchOptions.transferEventName(eventName);
        }

        var listeners = [];
        var tasks = findEventTasks(target, eventNameToString ? eventNameToString(eventName) : eventName);

        for (var i = 0; i < tasks.length; i++) {
          var task = tasks[i];
          var delegate = task.originalDelegate ? task.originalDelegate : task.callback;
          listeners.push(delegate);
        }

        return listeners;
      };

      proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER] = function () {
        var target = this || _global;
        var eventName = arguments[0];

        if (!eventName) {
          var keys = Object.keys(target);

          for (var i = 0; i < keys.length; i++) {
            var prop = keys[i];
            var match = EVENT_NAME_SYMBOL_REGX.exec(prop);
            var evtName = match && match[1]; // in nodejs EventEmitter, removeListener event is
            // used for monitoring the removeListener call,
            // so just keep removeListener eventListener until
            // all other eventListeners are removed

            if (evtName && evtName !== 'removeListener') {
              this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, evtName);
            }
          } // remove removeListener listener finally


          this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, 'removeListener');
        } else {
          if (patchOptions && patchOptions.transferEventName) {
            eventName = patchOptions.transferEventName(eventName);
          }

          var symbolEventNames = zoneSymbolEventNames$1[eventName];

          if (symbolEventNames) {
            var symbolEventName = symbolEventNames[FALSE_STR];
            var symbolCaptureEventName = symbolEventNames[TRUE_STR];
            var tasks = target[symbolEventName];
            var captureTasks = target[symbolCaptureEventName];

            if (tasks) {
              var removeTasks = tasks.slice();

              for (var i = 0; i < removeTasks.length; i++) {
                var task = removeTasks[i];
                var delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
              }
            }

            if (captureTasks) {
              var removeTasks = captureTasks.slice();

              for (var i = 0; i < removeTasks.length; i++) {
                var task = removeTasks[i];
                var delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
              }
            }
          }
        }

        if (returnTarget) {
          return this;
        }
      }; // for native toString patch


      attachOriginToPatched(proto[ADD_EVENT_LISTENER], nativeAddEventListener);
      attachOriginToPatched(proto[REMOVE_EVENT_LISTENER], nativeRemoveEventListener);

      if (nativeRemoveAllListeners) {
        attachOriginToPatched(proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER], nativeRemoveAllListeners);
      }

      if (nativeListeners) {
        attachOriginToPatched(proto[LISTENERS_EVENT_LISTENER], nativeListeners);
      }

      return true;
    }

    var results = [];

    for (var i = 0; i < apis.length; i++) {
      results[i] = patchEventTargetMethods(apis[i], patchOptions);
    }

    return results;
  }

  function findEventTasks(target, eventName) {
    if (!eventName) {
      var foundTasks = [];

      for (var prop in target) {
        var match = EVENT_NAME_SYMBOL_REGX.exec(prop);
        var evtName = match && match[1];

        if (evtName && (!eventName || evtName === eventName)) {
          var tasks = target[prop];

          if (tasks) {
            for (var i = 0; i < tasks.length; i++) {
              foundTasks.push(tasks[i]);
            }
          }
        }
      }

      return foundTasks;
    }

    var symbolEventName = zoneSymbolEventNames$1[eventName];

    if (!symbolEventName) {
      prepareEventNames(eventName);
      symbolEventName = zoneSymbolEventNames$1[eventName];
    }

    var captureFalseTasks = target[symbolEventName[FALSE_STR]];
    var captureTrueTasks = target[symbolEventName[TRUE_STR]];

    if (!captureFalseTasks) {
      return captureTrueTasks ? captureTrueTasks.slice() : [];
    } else {
      return captureTrueTasks ? captureFalseTasks.concat(captureTrueTasks) : captureFalseTasks.slice();
    }
  }

  function patchEventPrototype(global, api) {
    var Event = global['Event'];

    if (Event && Event.prototype) {
      api.patchMethod(Event.prototype, 'stopImmediatePropagation', function (delegate) {
        return function (self, args) {
          self[IMMEDIATE_PROPAGATION_SYMBOL] = true; // we need to call the native stopImmediatePropagation
          // in case in some hybrid application, some part of
          // application will be controlled by zone, some are not

          delegate && delegate.apply(self, args);
        };
      });
    }
  }
  /**
   * @license
   * Copyright Google Inc. All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   */


  function patchCallbacks(api, target, targetName, method, callbacks) {
    var symbol = Zone.__symbol__(method);

    if (target[symbol]) {
      return;
    }

    var nativeDelegate = target[symbol] = target[method];

    target[method] = function (name, opts, options) {
      if (opts && opts.prototype) {
        callbacks.forEach(function (callback) {
          var source = targetName + "." + method + "::" + callback;
          var prototype = opts.prototype;

          if (prototype.hasOwnProperty(callback)) {
            var descriptor = api.ObjectGetOwnPropertyDescriptor(prototype, callback);

            if (descriptor && descriptor.value) {
              descriptor.value = api.wrapWithCurrentZone(descriptor.value, source);

              api._redefineProperty(opts.prototype, callback, descriptor);
            } else if (prototype[callback]) {
              prototype[callback] = api.wrapWithCurrentZone(prototype[callback], source);
            }
          } else if (prototype[callback]) {
            prototype[callback] = api.wrapWithCurrentZone(prototype[callback], source);
          }
        });
      }

      return nativeDelegate.call(target, name, opts, options);
    };

    api.attachOriginToPatched(target[method], nativeDelegate);
  }
  /**
   * @license
   * Copyright Google Inc. All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   */


  var globalEventHandlersEventNames = ['abort', 'animationcancel', 'animationend', 'animationiteration', 'auxclick', 'beforeinput', 'blur', 'cancel', 'canplay', 'canplaythrough', 'change', 'compositionstart', 'compositionupdate', 'compositionend', 'cuechange', 'click', 'close', 'contextmenu', 'curechange', 'dblclick', 'drag', 'dragend', 'dragenter', 'dragexit', 'dragleave', 'dragover', 'drop', 'durationchange', 'emptied', 'ended', 'error', 'focus', 'focusin', 'focusout', 'gotpointercapture', 'input', 'invalid', 'keydown', 'keypress', 'keyup', 'load', 'loadstart', 'loadeddata', 'loadedmetadata', 'lostpointercapture', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'mousewheel', 'orientationchange', 'pause', 'play', 'playing', 'pointercancel', 'pointerdown', 'pointerenter', 'pointerleave', 'pointerlockchange', 'mozpointerlockchange', 'webkitpointerlockerchange', 'pointerlockerror', 'mozpointerlockerror', 'webkitpointerlockerror', 'pointermove', 'pointout', 'pointerover', 'pointerup', 'progress', 'ratechange', 'reset', 'resize', 'scroll', 'seeked', 'seeking', 'select', 'selectionchange', 'selectstart', 'show', 'sort', 'stalled', 'submit', 'suspend', 'timeupdate', 'volumechange', 'touchcancel', 'touchmove', 'touchstart', 'touchend', 'transitioncancel', 'transitionend', 'waiting', 'wheel'];
  var documentEventNames = ['afterscriptexecute', 'beforescriptexecute', 'DOMContentLoaded', 'freeze', 'fullscreenchange', 'mozfullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange', 'fullscreenerror', 'mozfullscreenerror', 'webkitfullscreenerror', 'msfullscreenerror', 'readystatechange', 'visibilitychange', 'resume'];
  var windowEventNames = ['absolutedeviceorientation', 'afterinput', 'afterprint', 'appinstalled', 'beforeinstallprompt', 'beforeprint', 'beforeunload', 'devicelight', 'devicemotion', 'deviceorientation', 'deviceorientationabsolute', 'deviceproximity', 'hashchange', 'languagechange', 'message', 'mozbeforepaint', 'offline', 'online', 'paint', 'pageshow', 'pagehide', 'popstate', 'rejectionhandled', 'storage', 'unhandledrejection', 'unload', 'userproximity', 'vrdisplayconnected', 'vrdisplaydisconnected', 'vrdisplaypresentchange'];
  var htmlElementEventNames = ['beforecopy', 'beforecut', 'beforepaste', 'copy', 'cut', 'paste', 'dragstart', 'loadend', 'animationstart', 'search', 'transitionrun', 'transitionstart', 'webkitanimationend', 'webkitanimationiteration', 'webkitanimationstart', 'webkittransitionend'];
  var mediaElementEventNames = ['encrypted', 'waitingforkey', 'msneedkey', 'mozinterruptbegin', 'mozinterruptend'];
  var ieElementEventNames = ['activate', 'afterupdate', 'ariarequest', 'beforeactivate', 'beforedeactivate', 'beforeeditfocus', 'beforeupdate', 'cellchange', 'controlselect', 'dataavailable', 'datasetchanged', 'datasetcomplete', 'errorupdate', 'filterchange', 'layoutcomplete', 'losecapture', 'move', 'moveend', 'movestart', 'propertychange', 'resizeend', 'resizestart', 'rowenter', 'rowexit', 'rowsdelete', 'rowsinserted', 'command', 'compassneedscalibration', 'deactivate', 'help', 'mscontentzoom', 'msmanipulationstatechanged', 'msgesturechange', 'msgesturedoubletap', 'msgestureend', 'msgesturehold', 'msgesturestart', 'msgesturetap', 'msgotpointercapture', 'msinertiastart', 'mslostpointercapture', 'mspointercancel', 'mspointerdown', 'mspointerenter', 'mspointerhover', 'mspointerleave', 'mspointermove', 'mspointerout', 'mspointerover', 'mspointerup', 'pointerout', 'mssitemodejumplistitemremoved', 'msthumbnailclick', 'stop', 'storagecommit'];
  var webglEventNames = ['webglcontextrestored', 'webglcontextlost', 'webglcontextcreationerror'];
  var formEventNames = ['autocomplete', 'autocompleteerror'];
  var detailEventNames = ['toggle'];
  var frameEventNames = ['load'];
  var frameSetEventNames = ['blur', 'error', 'focus', 'load', 'resize', 'scroll', 'messageerror'];
  var marqueeEventNames = ['bounce', 'finish', 'start'];
  var XMLHttpRequestEventNames = ['loadstart', 'progress', 'abort', 'error', 'load', 'progress', 'timeout', 'loadend', 'readystatechange'];
  var IDBIndexEventNames = ['upgradeneeded', 'complete', 'abort', 'success', 'error', 'blocked', 'versionchange', 'close'];
  var websocketEventNames = ['close', 'error', 'open', 'message'];
  var workerEventNames = ['error', 'message'];
  var eventNames = globalEventHandlersEventNames.concat(webglEventNames, formEventNames, detailEventNames, documentEventNames, windowEventNames, htmlElementEventNames, ieElementEventNames);

  function filterProperties(target, onProperties, ignoreProperties) {
    if (!ignoreProperties || ignoreProperties.length === 0) {
      return onProperties;
    }

    var tip = ignoreProperties.filter(function (ip) {
      return ip.target === target;
    });

    if (!tip || tip.length === 0) {
      return onProperties;
    }

    var targetIgnoreProperties = tip[0].ignoreProperties;
    return onProperties.filter(function (op) {
      return targetIgnoreProperties.indexOf(op) === -1;
    });
  }

  function patchFilteredProperties(target, onProperties, ignoreProperties, prototype) {
    // check whether target is available, sometimes target will be undefined
    // because different browser or some 3rd party plugin.
    if (!target) {
      return;
    }

    var filteredProperties = filterProperties(target, onProperties, ignoreProperties);
    patchOnProperties(target, filteredProperties, prototype);
  }

  function propertyDescriptorPatch(api, _global) {
    if (isNode && !isMix) {
      return;
    }

    if (Zone[api.symbol('patchEvents')]) {
      // events are already been patched by legacy patch.
      return;
    }

    var supportsWebSocket = typeof WebSocket !== 'undefined';
    var ignoreProperties = _global['__Zone_ignore_on_properties']; // for browsers that we can patch the descriptor:  Chrome & Firefox

    if (isBrowser) {
      var internalWindow_1 = window;
      var ignoreErrorProperties = isIE ? [{
        target: internalWindow_1,
        ignoreProperties: ['error']
      }] : []; // in IE/Edge, onProp not exist in window object, but in WindowPrototype
      // so we need to pass WindowPrototype to check onProp exist or not

      patchFilteredProperties(internalWindow_1, eventNames.concat(['messageerror']), ignoreProperties ? ignoreProperties.concat(ignoreErrorProperties) : ignoreProperties, ObjectGetPrototypeOf(internalWindow_1));
      patchFilteredProperties(Document.prototype, eventNames, ignoreProperties);

      if (typeof internalWindow_1['SVGElement'] !== 'undefined') {
        patchFilteredProperties(internalWindow_1['SVGElement'].prototype, eventNames, ignoreProperties);
      }

      patchFilteredProperties(Element.prototype, eventNames, ignoreProperties);
      patchFilteredProperties(HTMLElement.prototype, eventNames, ignoreProperties);
      patchFilteredProperties(HTMLMediaElement.prototype, mediaElementEventNames, ignoreProperties);
      patchFilteredProperties(HTMLFrameSetElement.prototype, windowEventNames.concat(frameSetEventNames), ignoreProperties);
      patchFilteredProperties(HTMLBodyElement.prototype, windowEventNames.concat(frameSetEventNames), ignoreProperties);
      patchFilteredProperties(HTMLFrameElement.prototype, frameEventNames, ignoreProperties);
      patchFilteredProperties(HTMLIFrameElement.prototype, frameEventNames, ignoreProperties);
      var HTMLMarqueeElement_1 = internalWindow_1['HTMLMarqueeElement'];

      if (HTMLMarqueeElement_1) {
        patchFilteredProperties(HTMLMarqueeElement_1.prototype, marqueeEventNames, ignoreProperties);
      }

      var Worker_1 = internalWindow_1['Worker'];

      if (Worker_1) {
        patchFilteredProperties(Worker_1.prototype, workerEventNames, ignoreProperties);
      }
    }

    var XMLHttpRequest = _global['XMLHttpRequest'];

    if (XMLHttpRequest) {
      // XMLHttpRequest is not available in ServiceWorker, so we need to check here
      patchFilteredProperties(XMLHttpRequest.prototype, XMLHttpRequestEventNames, ignoreProperties);
    }

    var XMLHttpRequestEventTarget = _global['XMLHttpRequestEventTarget'];

    if (XMLHttpRequestEventTarget) {
      patchFilteredProperties(XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype, XMLHttpRequestEventNames, ignoreProperties);
    }

    if (typeof IDBIndex !== 'undefined') {
      patchFilteredProperties(IDBIndex.prototype, IDBIndexEventNames, ignoreProperties);
      patchFilteredProperties(IDBRequest.prototype, IDBIndexEventNames, ignoreProperties);
      patchFilteredProperties(IDBOpenDBRequest.prototype, IDBIndexEventNames, ignoreProperties);
      patchFilteredProperties(IDBDatabase.prototype, IDBIndexEventNames, ignoreProperties);
      patchFilteredProperties(IDBTransaction.prototype, IDBIndexEventNames, ignoreProperties);
      patchFilteredProperties(IDBCursor.prototype, IDBIndexEventNames, ignoreProperties);
    }

    if (supportsWebSocket) {
      patchFilteredProperties(WebSocket.prototype, websocketEventNames, ignoreProperties);
    }
  }
  /**
   * @license
   * Copyright Google Inc. All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   */


  Zone.__load_patch('util', function (global, Zone, api) {
    api.patchOnProperties = patchOnProperties;
    api.patchMethod = patchMethod;
    api.bindArguments = bindArguments;
    api.patchMacroTask = patchMacroTask; // In earlier version of zone.js (<0.9.0), we use env name `__zone_symbol__BLACK_LISTED_EVENTS` to
    // define which events will not be patched by `Zone.js`.
    // In newer version (>=0.9.0), we change the env name to `__zone_symbol__UNPATCHED_EVENTS` to keep
    // the name consistent with angular repo.
    // The  `__zone_symbol__BLACK_LISTED_EVENTS` is deprecated, but it is still be supported for
    // backwards compatibility.

    var SYMBOL_BLACK_LISTED_EVENTS = Zone.__symbol__('BLACK_LISTED_EVENTS');

    var SYMBOL_UNPATCHED_EVENTS = Zone.__symbol__('UNPATCHED_EVENTS');

    if (global[SYMBOL_UNPATCHED_EVENTS]) {
      global[SYMBOL_BLACK_LISTED_EVENTS] = global[SYMBOL_UNPATCHED_EVENTS];
    }

    if (global[SYMBOL_BLACK_LISTED_EVENTS]) {
      Zone[SYMBOL_BLACK_LISTED_EVENTS] = Zone[SYMBOL_UNPATCHED_EVENTS] = global[SYMBOL_BLACK_LISTED_EVENTS];
    }

    api.patchEventPrototype = patchEventPrototype;
    api.patchEventTarget = patchEventTarget;
    api.isIEOrEdge = isIEOrEdge;
    api.ObjectDefineProperty = ObjectDefineProperty;
    api.ObjectGetOwnPropertyDescriptor = ObjectGetOwnPropertyDescriptor;
    api.ObjectCreate = ObjectCreate;
    api.ArraySlice = ArraySlice;
    api.patchClass = patchClass;
    api.wrapWithCurrentZone = wrapWithCurrentZone;
    api.filterProperties = filterProperties;
    api.attachOriginToPatched = attachOriginToPatched;
    api._redefineProperty = Object.defineProperty;
    api.patchCallbacks = patchCallbacks;

    api.getGlobalObjects = function () {
      return {
        globalSources: globalSources,
        zoneSymbolEventNames: zoneSymbolEventNames$1,
        eventNames: eventNames,
        isBrowser: isBrowser,
        isMix: isMix,
        isNode: isNode,
        TRUE_STR: TRUE_STR,
        FALSE_STR: FALSE_STR,
        ZONE_SYMBOL_PREFIX: ZONE_SYMBOL_PREFIX,
        ADD_EVENT_LISTENER_STR: ADD_EVENT_LISTENER_STR,
        REMOVE_EVENT_LISTENER_STR: REMOVE_EVENT_LISTENER_STR
      };
    };
  });
  /**
   * @license
   * Copyright Google Inc. All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   */

  /*
   * This is necessary for Chrome and Chrome mobile, to enable
   * things like redefining `createdCallback` on an element.
   */


  var zoneSymbol$1;

  var _defineProperty;

  var _getOwnPropertyDescriptor;

  var _create;

  var unconfigurablesKey;

  function propertyPatch() {
    zoneSymbol$1 = Zone.__symbol__;
    _defineProperty = Object[zoneSymbol$1('defineProperty')] = Object.defineProperty;
    _getOwnPropertyDescriptor = Object[zoneSymbol$1('getOwnPropertyDescriptor')] = Object.getOwnPropertyDescriptor;
    _create = Object.create;
    unconfigurablesKey = zoneSymbol$1('unconfigurables');

    Object.defineProperty = function (obj, prop, desc) {
      if (isUnconfigurable(obj, prop)) {
        throw new TypeError('Cannot assign to read only property \'' + prop + '\' of ' + obj);
      }

      var originalConfigurableFlag = desc.configurable;

      if (prop !== 'prototype') {
        desc = rewriteDescriptor(obj, prop, desc);
      }

      return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
    };

    Object.defineProperties = function (obj, props) {
      Object.keys(props).forEach(function (prop) {
        Object.defineProperty(obj, prop, props[prop]);
      });
      return obj;
    };

    Object.create = function (obj, proto) {
      if (typeof proto === 'object' && !Object.isFrozen(proto)) {
        Object.keys(proto).forEach(function (prop) {
          proto[prop] = rewriteDescriptor(obj, prop, proto[prop]);
        });
      }

      return _create(obj, proto);
    };

    Object.getOwnPropertyDescriptor = function (obj, prop) {
      var desc = _getOwnPropertyDescriptor(obj, prop);

      if (desc && isUnconfigurable(obj, prop)) {
        desc.configurable = false;
      }

      return desc;
    };
  }

  function _redefineProperty(obj, prop, desc) {
    var originalConfigurableFlag = desc.configurable;
    desc = rewriteDescriptor(obj, prop, desc);
    return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
  }

  function isUnconfigurable(obj, prop) {
    return obj && obj[unconfigurablesKey] && obj[unconfigurablesKey][prop];
  }

  function rewriteDescriptor(obj, prop, desc) {
    // issue-927, if the desc is frozen, don't try to change the desc
    if (!Object.isFrozen(desc)) {
      desc.configurable = true;
    }

    if (!desc.configurable) {
      // issue-927, if the obj is frozen, don't try to set the desc to obj
      if (!obj[unconfigurablesKey] && !Object.isFrozen(obj)) {
        _defineProperty(obj, unconfigurablesKey, {
          writable: true,
          value: {}
        });
      }

      if (obj[unconfigurablesKey]) {
        obj[unconfigurablesKey][prop] = true;
      }
    }

    return desc;
  }

  function _tryDefineProperty(obj, prop, desc, originalConfigurableFlag) {
    try {
      return _defineProperty(obj, prop, desc);
    } catch (error) {
      if (desc.configurable) {
        // In case of errors, when the configurable flag was likely set by rewriteDescriptor(), let's
        // retry with the original flag value
        if (typeof originalConfigurableFlag == 'undefined') {
          delete desc.configurable;
        } else {
          desc.configurable = originalConfigurableFlag;
        }

        try {
          return _defineProperty(obj, prop, desc);
        } catch (error) {
          var descJson = null;

          try {
            descJson = JSON.stringify(desc);
          } catch (error) {
            descJson = desc.toString();
          }

          console.log("Attempting to configure '" + prop + "' with descriptor '" + descJson + "' on object '" + obj + "' and got error, giving up: " + error);
        }
      } else {
        throw error;
      }
    }
  }
  /**
   * @license
   * Copyright Google Inc. All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   */


  function eventTargetLegacyPatch(_global, api) {
    var _a = api.getGlobalObjects(),
        eventNames = _a.eventNames,
        globalSources = _a.globalSources,
        zoneSymbolEventNames = _a.zoneSymbolEventNames,
        TRUE_STR = _a.TRUE_STR,
        FALSE_STR = _a.FALSE_STR,
        ZONE_SYMBOL_PREFIX = _a.ZONE_SYMBOL_PREFIX;

    var WTF_ISSUE_555 = 'Anchor,Area,Audio,BR,Base,BaseFont,Body,Button,Canvas,Content,DList,Directory,Div,Embed,FieldSet,Font,Form,Frame,FrameSet,HR,Head,Heading,Html,IFrame,Image,Input,Keygen,LI,Label,Legend,Link,Map,Marquee,Media,Menu,Meta,Meter,Mod,OList,Object,OptGroup,Option,Output,Paragraph,Pre,Progress,Quote,Script,Select,Source,Span,Style,TableCaption,TableCell,TableCol,Table,TableRow,TableSection,TextArea,Title,Track,UList,Unknown,Video';
    var NO_EVENT_TARGET = 'ApplicationCache,EventSource,FileReader,InputMethodContext,MediaController,MessagePort,Node,Performance,SVGElementInstance,SharedWorker,TextTrack,TextTrackCue,TextTrackList,WebKitNamedFlow,Window,Worker,WorkerGlobalScope,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload,IDBRequest,IDBOpenDBRequest,IDBDatabase,IDBTransaction,IDBCursor,DBIndex,WebSocket'.split(',');
    var EVENT_TARGET = 'EventTarget';
    var apis = [];
    var isWtf = _global['wtf'];
    var WTF_ISSUE_555_ARRAY = WTF_ISSUE_555.split(',');

    if (isWtf) {
      // Workaround for: https://github.com/google/tracing-framework/issues/555
      apis = WTF_ISSUE_555_ARRAY.map(function (v) {
        return 'HTML' + v + 'Element';
      }).concat(NO_EVENT_TARGET);
    } else if (_global[EVENT_TARGET]) {
      apis.push(EVENT_TARGET);
    } else {
      // Note: EventTarget is not available in all browsers,
      // if it's not available, we instead patch the APIs in the IDL that inherit from EventTarget
      apis = NO_EVENT_TARGET;
    }

    var isDisableIECheck = _global['__Zone_disable_IE_check'] || false;
    var isEnableCrossContextCheck = _global['__Zone_enable_cross_context_check'] || false;
    var ieOrEdge = api.isIEOrEdge();
    var ADD_EVENT_LISTENER_SOURCE = '.addEventListener:';
    var FUNCTION_WRAPPER = '[object FunctionWrapper]';
    var BROWSER_TOOLS = 'function __BROWSERTOOLS_CONSOLE_SAFEFUNC() { [native code] }';
    var pointerEventsMap = {
      'MSPointerCancel': 'pointercancel',
      'MSPointerDown': 'pointerdown',
      'MSPointerEnter': 'pointerenter',
      'MSPointerHover': 'pointerhover',
      'MSPointerLeave': 'pointerleave',
      'MSPointerMove': 'pointermove',
      'MSPointerOut': 'pointerout',
      'MSPointerOver': 'pointerover',
      'MSPointerUp': 'pointerup'
    }; //  predefine all __zone_symbol__ + eventName + true/false string

    for (var i = 0; i < eventNames.length; i++) {
      var eventName = eventNames[i];
      var falseEventName = eventName + FALSE_STR;
      var trueEventName = eventName + TRUE_STR;
      var symbol = ZONE_SYMBOL_PREFIX + falseEventName;
      var symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
      zoneSymbolEventNames[eventName] = {};
      zoneSymbolEventNames[eventName][FALSE_STR] = symbol;
      zoneSymbolEventNames[eventName][TRUE_STR] = symbolCapture;
    } //  predefine all task.source string


    for (var i = 0; i < WTF_ISSUE_555_ARRAY.length; i++) {
      var target = WTF_ISSUE_555_ARRAY[i];
      var targets = globalSources[target] = {};

      for (var j = 0; j < eventNames.length; j++) {
        var eventName = eventNames[j];
        targets[eventName] = target + ADD_EVENT_LISTENER_SOURCE + eventName;
      }
    }

    var checkIEAndCrossContext = function checkIEAndCrossContext(nativeDelegate, delegate, target, args) {
      if (!isDisableIECheck && ieOrEdge) {
        if (isEnableCrossContextCheck) {
          try {
            var testString = delegate.toString();

            if (testString === FUNCTION_WRAPPER || testString == BROWSER_TOOLS) {
              nativeDelegate.apply(target, args);
              return false;
            }
          } catch (error) {
            nativeDelegate.apply(target, args);
            return false;
          }
        } else {
          var testString = delegate.toString();

          if (testString === FUNCTION_WRAPPER || testString == BROWSER_TOOLS) {
            nativeDelegate.apply(target, args);
            return false;
          }
        }
      } else if (isEnableCrossContextCheck) {
        try {
          delegate.toString();
        } catch (error) {
          nativeDelegate.apply(target, args);
          return false;
        }
      }

      return true;
    };

    var apiTypes = [];

    for (var i = 0; i < apis.length; i++) {
      var type = _global[apis[i]];
      apiTypes.push(type && type.prototype);
    } // vh is validateHandler to check event handler
    // is valid or not(for security check)


    api.patchEventTarget(_global, apiTypes, {
      vh: checkIEAndCrossContext,
      transferEventName: function transferEventName(eventName) {
        var pointerEventName = pointerEventsMap[eventName];
        return pointerEventName || eventName;
      }
    });
    Zone[api.symbol('patchEventTarget')] = !!_global[EVENT_TARGET];
    return true;
  }
  /**
   * @license
   * Copyright Google Inc. All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   */
  // we have to patch the instance since the proto is non-configurable


  function apply(api, _global) {
    var _a = api.getGlobalObjects(),
        ADD_EVENT_LISTENER_STR = _a.ADD_EVENT_LISTENER_STR,
        REMOVE_EVENT_LISTENER_STR = _a.REMOVE_EVENT_LISTENER_STR;

    var WS = _global.WebSocket; // On Safari window.EventTarget doesn't exist so need to patch WS add/removeEventListener
    // On older Chrome, no need since EventTarget was already patched

    if (!_global.EventTarget) {
      api.patchEventTarget(_global, [WS.prototype]);
    }

    _global.WebSocket = function (x, y) {
      var socket = arguments.length > 1 ? new WS(x, y) : new WS(x);
      var proxySocket;
      var proxySocketProto; // Safari 7.0 has non-configurable own 'onmessage' and friends properties on the socket instance

      var onmessageDesc = api.ObjectGetOwnPropertyDescriptor(socket, 'onmessage');

      if (onmessageDesc && onmessageDesc.configurable === false) {
        proxySocket = api.ObjectCreate(socket); // socket have own property descriptor 'onopen', 'onmessage', 'onclose', 'onerror'
        // but proxySocket not, so we will keep socket as prototype and pass it to
        // patchOnProperties method

        proxySocketProto = socket;
        [ADD_EVENT_LISTENER_STR, REMOVE_EVENT_LISTENER_STR, 'send', 'close'].forEach(function (propName) {
          proxySocket[propName] = function () {
            var args = api.ArraySlice.call(arguments);

            if (propName === ADD_EVENT_LISTENER_STR || propName === REMOVE_EVENT_LISTENER_STR) {
              var eventName = args.length > 0 ? args[0] : undefined;

              if (eventName) {
                var propertySymbol = Zone.__symbol__('ON_PROPERTY' + eventName);

                socket[propertySymbol] = proxySocket[propertySymbol];
              }
            }

            return socket[propName].apply(socket, args);
          };
        });
      } else {
        // we can patch the real socket
        proxySocket = socket;
      }

      api.patchOnProperties(proxySocket, ['close', 'error', 'message', 'open'], proxySocketProto);
      return proxySocket;
    };

    var globalWebSocket = _global['WebSocket'];

    for (var prop in WS) {
      globalWebSocket[prop] = WS[prop];
    }
  }
  /**
   * @license
   * Copyright Google Inc. All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   */


  function propertyDescriptorLegacyPatch(api, _global) {
    var _a = api.getGlobalObjects(),
        isNode = _a.isNode,
        isMix = _a.isMix;

    if (isNode && !isMix) {
      return;
    }

    if (!canPatchViaPropertyDescriptor(api, _global)) {
      var supportsWebSocket = typeof WebSocket !== 'undefined'; // Safari, Android browsers (Jelly Bean)

      patchViaCapturingAllTheEvents(api);
      api.patchClass('XMLHttpRequest');

      if (supportsWebSocket) {
        apply(api, _global);
      }

      Zone[api.symbol('patchEvents')] = true;
    }
  }

  function canPatchViaPropertyDescriptor(api, _global) {
    var _a = api.getGlobalObjects(),
        isBrowser = _a.isBrowser,
        isMix = _a.isMix;

    if ((isBrowser || isMix) && !api.ObjectGetOwnPropertyDescriptor(HTMLElement.prototype, 'onclick') && typeof Element !== 'undefined') {
      // WebKit https://bugs.webkit.org/show_bug.cgi?id=134364
      // IDL interface attributes are not configurable
      var desc = api.ObjectGetOwnPropertyDescriptor(Element.prototype, 'onclick');
      if (desc && !desc.configurable) return false; // try to use onclick to detect whether we can patch via propertyDescriptor
      // because XMLHttpRequest is not available in service worker

      if (desc) {
        api.ObjectDefineProperty(Element.prototype, 'onclick', {
          enumerable: true,
          configurable: true,
          get: function get() {
            return true;
          }
        });
        var div = document.createElement('div');
        var result = !!div.onclick;
        api.ObjectDefineProperty(Element.prototype, 'onclick', desc);
        return result;
      }
    }

    var XMLHttpRequest = _global['XMLHttpRequest'];

    if (!XMLHttpRequest) {
      // XMLHttpRequest is not available in service worker
      return false;
    }

    var ON_READY_STATE_CHANGE = 'onreadystatechange';
    var XMLHttpRequestPrototype = XMLHttpRequest.prototype;
    var xhrDesc = api.ObjectGetOwnPropertyDescriptor(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE); // add enumerable and configurable here because in opera
    // by default XMLHttpRequest.prototype.onreadystatechange is undefined
    // without adding enumerable and configurable will cause onreadystatechange
    // non-configurable
    // and if XMLHttpRequest.prototype.onreadystatechange is undefined,
    // we should set a real desc instead a fake one

    if (xhrDesc) {
      api.ObjectDefineProperty(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE, {
        enumerable: true,
        configurable: true,
        get: function get() {
          return true;
        }
      });
      var req = new XMLHttpRequest();
      var result = !!req.onreadystatechange; // restore original desc

      api.ObjectDefineProperty(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE, xhrDesc || {});
      return result;
    } else {
      var SYMBOL_FAKE_ONREADYSTATECHANGE_1 = api.symbol('fake');
      api.ObjectDefineProperty(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE, {
        enumerable: true,
        configurable: true,
        get: function get() {
          return this[SYMBOL_FAKE_ONREADYSTATECHANGE_1];
        },
        set: function set(value) {
          this[SYMBOL_FAKE_ONREADYSTATECHANGE_1] = value;
        }
      });
      var req = new XMLHttpRequest();

      var detectFunc = function detectFunc() {};

      req.onreadystatechange = detectFunc;
      var result = req[SYMBOL_FAKE_ONREADYSTATECHANGE_1] === detectFunc;
      req.onreadystatechange = null;
      return result;
    }
  } // Whenever any eventListener fires, we check the eventListener target and all parents
  // for `onwhatever` properties and replace them with zone-bound functions
  // - Chrome (for now)


  function patchViaCapturingAllTheEvents(api) {
    var eventNames = api.getGlobalObjects().eventNames;
    var unboundKey = api.symbol('unbound');

    var _loop_4 = function _loop_4(i) {
      var property = eventNames[i];
      var onproperty = 'on' + property;
      self.addEventListener(property, function (event) {
        var elt = event.target,
            bound,
            source;

        if (elt) {
          source = elt.constructor['name'] + '.' + onproperty;
        } else {
          source = 'unknown.' + onproperty;
        }

        while (elt) {
          if (elt[onproperty] && !elt[onproperty][unboundKey]) {
            bound = api.wrapWithCurrentZone(elt[onproperty], source);
            bound[unboundKey] = elt[onproperty];
            elt[onproperty] = bound;
          }

          elt = elt.parentElement;
        }
      }, true);
    };

    for (var i = 0; i < eventNames.length; i++) {
      _loop_4(i);
    }
  }
  /**
   * @license
   * Copyright Google Inc. All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   */


  function registerElementPatch(_global, api) {
    var _a = api.getGlobalObjects(),
        isBrowser = _a.isBrowser,
        isMix = _a.isMix;

    if (!isBrowser && !isMix || !('registerElement' in _global.document)) {
      return;
    }

    var callbacks = ['createdCallback', 'attachedCallback', 'detachedCallback', 'attributeChangedCallback'];
    api.patchCallbacks(api, document, 'Document', 'registerElement', callbacks);
  }
  /**
   * @license
   * Copyright Google Inc. All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   */


  (function (_global) {
    var symbolPrefix = _global['__Zone_symbol_prefix'] || '__zone_symbol__';

    function __symbol__(name) {
      return symbolPrefix + name;
    }

    _global[__symbol__('legacyPatch')] = function () {
      var Zone = _global['Zone'];

      Zone.__load_patch('defineProperty', function (global, Zone, api) {
        api._redefineProperty = _redefineProperty;
        propertyPatch();
      });

      Zone.__load_patch('registerElement', function (global, Zone, api) {
        registerElementPatch(global, api);
      });

      Zone.__load_patch('EventTargetLegacy', function (global, Zone, api) {
        eventTargetLegacyPatch(global, api);
        propertyDescriptorLegacyPatch(api, global);
      });
    };
  })(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {});
  /**
   * @license
   * Copyright Google Inc. All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   */


  var taskSymbol = zoneSymbol('zoneTask');

  function patchTimer(window, setName, cancelName, nameSuffix) {
    var setNative = null;
    var clearNative = null;
    setName += nameSuffix;
    cancelName += nameSuffix;
    var tasksByHandleId = {};

    function scheduleTask(task) {
      var data = task.data;

      function timer() {
        try {
          task.invoke.apply(this, arguments);
        } finally {
          // issue-934, task will be cancelled
          // even it is a periodic task such as
          // setInterval
          if (!(task.data && task.data.isPeriodic)) {
            if (typeof data.handleId === 'number') {
              // in non-nodejs env, we remove timerId
              // from local cache
              delete tasksByHandleId[data.handleId];
            } else if (data.handleId) {
              // Node returns complex objects as handleIds
              // we remove task reference from timer object
              data.handleId[taskSymbol] = null;
            }
          }
        }
      }

      data.args[0] = timer;
      data.handleId = setNative.apply(window, data.args);
      return task;
    }

    function clearTask(task) {
      return clearNative(task.data.handleId);
    }

    setNative = patchMethod(window, setName, function (delegate) {
      return function (self, args) {
        if (typeof args[0] === 'function') {
          var options = {
            isPeriodic: nameSuffix === 'Interval',
            delay: nameSuffix === 'Timeout' || nameSuffix === 'Interval' ? args[1] || 0 : undefined,
            args: args
          };
          var task = scheduleMacroTaskWithCurrentZone(setName, args[0], options, scheduleTask, clearTask);

          if (!task) {
            return task;
          } // Node.js must additionally support the ref and unref functions.


          var handle = task.data.handleId;

          if (typeof handle === 'number') {
            // for non nodejs env, we save handleId: task
            // mapping in local cache for clearTimeout
            tasksByHandleId[handle] = task;
          } else if (handle) {
            // for nodejs env, we save task
            // reference in timerId Object for clearTimeout
            handle[taskSymbol] = task;
          } // check whether handle is null, because some polyfill or browser
          // may return undefined from setTimeout/setInterval/setImmediate/requestAnimationFrame


          if (handle && handle.ref && handle.unref && typeof handle.ref === 'function' && typeof handle.unref === 'function') {
            task.ref = handle.ref.bind(handle);
            task.unref = handle.unref.bind(handle);
          }

          if (typeof handle === 'number' || handle) {
            return handle;
          }

          return task;
        } else {
          // cause an error by calling it directly.
          return delegate.apply(window, args);
        }
      };
    });
    clearNative = patchMethod(window, cancelName, function (delegate) {
      return function (self, args) {
        var id = args[0];
        var task;

        if (typeof id === 'number') {
          // non nodejs env.
          task = tasksByHandleId[id];
        } else {
          // nodejs env.
          task = id && id[taskSymbol]; // other environments.

          if (!task) {
            task = id;
          }
        }

        if (task && typeof task.type === 'string') {
          if (task.state !== 'notScheduled' && (task.cancelFn && task.data.isPeriodic || task.runCount === 0)) {
            if (typeof id === 'number') {
              delete tasksByHandleId[id];
            } else if (id) {
              id[taskSymbol] = null;
            } // Do not cancel already canceled functions


            task.zone.cancelTask(task);
          }
        } else {
          // cause an error by calling it directly.
          delegate.apply(window, args);
        }
      };
    });
  }
  /**
   * @license
   * Copyright Google Inc. All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   */


  function patchCustomElements(_global, api) {
    var _a = api.getGlobalObjects(),
        isBrowser = _a.isBrowser,
        isMix = _a.isMix;

    if (!isBrowser && !isMix || !_global['customElements'] || !('customElements' in _global)) {
      return;
    }

    var callbacks = ['connectedCallback', 'disconnectedCallback', 'adoptedCallback', 'attributeChangedCallback'];
    api.patchCallbacks(api, _global.customElements, 'customElements', 'define', callbacks);
  }
  /**
   * @license
   * Copyright Google Inc. All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   */


  function eventTargetPatch(_global, api) {
    if (Zone[api.symbol('patchEventTarget')]) {
      // EventTarget is already patched.
      return;
    }

    var _a = api.getGlobalObjects(),
        eventNames = _a.eventNames,
        zoneSymbolEventNames = _a.zoneSymbolEventNames,
        TRUE_STR = _a.TRUE_STR,
        FALSE_STR = _a.FALSE_STR,
        ZONE_SYMBOL_PREFIX = _a.ZONE_SYMBOL_PREFIX; //  predefine all __zone_symbol__ + eventName + true/false string


    for (var i = 0; i < eventNames.length; i++) {
      var eventName = eventNames[i];
      var falseEventName = eventName + FALSE_STR;
      var trueEventName = eventName + TRUE_STR;
      var symbol = ZONE_SYMBOL_PREFIX + falseEventName;
      var symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
      zoneSymbolEventNames[eventName] = {};
      zoneSymbolEventNames[eventName][FALSE_STR] = symbol;
      zoneSymbolEventNames[eventName][TRUE_STR] = symbolCapture;
    }

    var EVENT_TARGET = _global['EventTarget'];

    if (!EVENT_TARGET || !EVENT_TARGET.prototype) {
      return;
    }

    api.patchEventTarget(_global, [EVENT_TARGET && EVENT_TARGET.prototype]);
    return true;
  }

  function patchEvent(global, api) {
    api.patchEventPrototype(global, api);
  }
  /**
   * @license
   * Copyright Google Inc. All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   */


  Zone.__load_patch('legacy', function (global) {
    var legacyPatch = global[Zone.__symbol__('legacyPatch')];

    if (legacyPatch) {
      legacyPatch();
    }
  });

  Zone.__load_patch('timers', function (global) {
    var set = 'set';
    var clear = 'clear';
    patchTimer(global, set, clear, 'Timeout');
    patchTimer(global, set, clear, 'Interval');
    patchTimer(global, set, clear, 'Immediate');
  });

  Zone.__load_patch('requestAnimationFrame', function (global) {
    patchTimer(global, 'request', 'cancel', 'AnimationFrame');
    patchTimer(global, 'mozRequest', 'mozCancel', 'AnimationFrame');
    patchTimer(global, 'webkitRequest', 'webkitCancel', 'AnimationFrame');
  });

  Zone.__load_patch('blocking', function (global, Zone) {
    var blockingMethods = ['alert', 'prompt', 'confirm'];

    for (var i = 0; i < blockingMethods.length; i++) {
      var name_2 = blockingMethods[i];
      patchMethod(global, name_2, function (delegate, symbol, name) {
        return function (s, args) {
          return Zone.current.run(delegate, global, args, name);
        };
      });
    }
  });

  Zone.__load_patch('EventTarget', function (global, Zone, api) {
    patchEvent(global, api);
    eventTargetPatch(global, api); // patch XMLHttpRequestEventTarget's addEventListener/removeEventListener

    var XMLHttpRequestEventTarget = global['XMLHttpRequestEventTarget'];

    if (XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype) {
      api.patchEventTarget(global, [XMLHttpRequestEventTarget.prototype]);
    }

    patchClass('MutationObserver');
    patchClass('WebKitMutationObserver');
    patchClass('IntersectionObserver');
    patchClass('FileReader');
  });

  Zone.__load_patch('on_property', function (global, Zone, api) {
    propertyDescriptorPatch(api, global);
  });

  Zone.__load_patch('customElements', function (global, Zone, api) {
    patchCustomElements(global, api);
  });

  Zone.__load_patch('XHR', function (global, Zone) {
    // Treat XMLHttpRequest as a macrotask.
    patchXHR(global);
    var XHR_TASK = zoneSymbol('xhrTask');
    var XHR_SYNC = zoneSymbol('xhrSync');
    var XHR_LISTENER = zoneSymbol('xhrListener');
    var XHR_SCHEDULED = zoneSymbol('xhrScheduled');
    var XHR_URL = zoneSymbol('xhrURL');
    var XHR_ERROR_BEFORE_SCHEDULED = zoneSymbol('xhrErrorBeforeScheduled');

    function patchXHR(window) {
      var XMLHttpRequest = window['XMLHttpRequest'];

      if (!XMLHttpRequest) {
        // XMLHttpRequest is not available in service worker
        return;
      }

      var XMLHttpRequestPrototype = XMLHttpRequest.prototype;

      function findPendingTask(target) {
        return target[XHR_TASK];
      }

      var oriAddListener = XMLHttpRequestPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
      var oriRemoveListener = XMLHttpRequestPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];

      if (!oriAddListener) {
        var XMLHttpRequestEventTarget_1 = window['XMLHttpRequestEventTarget'];

        if (XMLHttpRequestEventTarget_1) {
          var XMLHttpRequestEventTargetPrototype = XMLHttpRequestEventTarget_1.prototype;
          oriAddListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
          oriRemoveListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
        }
      }

      var READY_STATE_CHANGE = 'readystatechange';
      var SCHEDULED = 'scheduled';

      function scheduleTask(task) {
        var data = task.data;
        var target = data.target;
        target[XHR_SCHEDULED] = false;
        target[XHR_ERROR_BEFORE_SCHEDULED] = false; // remove existing event listener

        var listener = target[XHR_LISTENER];

        if (!oriAddListener) {
          oriAddListener = target[ZONE_SYMBOL_ADD_EVENT_LISTENER];
          oriRemoveListener = target[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
        }

        if (listener) {
          oriRemoveListener.call(target, READY_STATE_CHANGE, listener);
        }

        var newListener = target[XHR_LISTENER] = function () {
          if (target.readyState === target.DONE) {
            // sometimes on some browsers XMLHttpRequest will fire onreadystatechange with
            // readyState=4 multiple times, so we need to check task state here
            if (!data.aborted && target[XHR_SCHEDULED] && task.state === SCHEDULED) {
              // check whether the xhr has registered onload listener
              // if that is the case, the task should invoke after all
              // onload listeners finish.
              var loadTasks = target[Zone.__symbol__('loadfalse')];

              if (loadTasks && loadTasks.length > 0) {
                var oriInvoke_1 = task.invoke;

                task.invoke = function () {
                  // need to load the tasks again, because in other
                  // load listener, they may remove themselves
                  var loadTasks = target[Zone.__symbol__('loadfalse')];

                  for (var i = 0; i < loadTasks.length; i++) {
                    if (loadTasks[i] === task) {
                      loadTasks.splice(i, 1);
                    }
                  }

                  if (!data.aborted && task.state === SCHEDULED) {
                    oriInvoke_1.call(task);
                  }
                };

                loadTasks.push(task);
              } else {
                task.invoke();
              }
            } else if (!data.aborted && target[XHR_SCHEDULED] === false) {
              // error occurs when xhr.send()
              target[XHR_ERROR_BEFORE_SCHEDULED] = true;
            }
          }
        };

        oriAddListener.call(target, READY_STATE_CHANGE, newListener);
        var storedTask = target[XHR_TASK];

        if (!storedTask) {
          target[XHR_TASK] = task;
        }

        sendNative.apply(target, data.args);
        target[XHR_SCHEDULED] = true;
        return task;
      }

      function placeholderCallback() {}

      function clearTask(task) {
        var data = task.data; // Note - ideally, we would call data.target.removeEventListener here, but it's too late
        // to prevent it from firing. So instead, we store info for the event listener.

        data.aborted = true;
        return abortNative.apply(data.target, data.args);
      }

      var openNative = patchMethod(XMLHttpRequestPrototype, 'open', function () {
        return function (self, args) {
          self[XHR_SYNC] = args[2] == false;
          self[XHR_URL] = args[1];
          return openNative.apply(self, args);
        };
      });
      var XMLHTTPREQUEST_SOURCE = 'XMLHttpRequest.send';
      var fetchTaskAborting = zoneSymbol('fetchTaskAborting');
      var fetchTaskScheduling = zoneSymbol('fetchTaskScheduling');
      var sendNative = patchMethod(XMLHttpRequestPrototype, 'send', function () {
        return function (self, args) {
          if (Zone.current[fetchTaskScheduling] === true) {
            // a fetch is scheduling, so we are using xhr to polyfill fetch
            // and because we already schedule macroTask for fetch, we should
            // not schedule a macroTask for xhr again
            return sendNative.apply(self, args);
          }

          if (self[XHR_SYNC]) {
            // if the XHR is sync there is no task to schedule, just execute the code.
            return sendNative.apply(self, args);
          } else {
            var options = {
              target: self,
              url: self[XHR_URL],
              isPeriodic: false,
              args: args,
              aborted: false
            };
            var task = scheduleMacroTaskWithCurrentZone(XMLHTTPREQUEST_SOURCE, placeholderCallback, options, scheduleTask, clearTask);

            if (self && self[XHR_ERROR_BEFORE_SCHEDULED] === true && !options.aborted && task.state === SCHEDULED) {
              // xhr request throw error when send
              // we should invoke task instead of leaving a scheduled
              // pending macroTask
              task.invoke();
            }
          }
        };
      });
      var abortNative = patchMethod(XMLHttpRequestPrototype, 'abort', function () {
        return function (self, args) {
          var task = findPendingTask(self);

          if (task && typeof task.type == 'string') {
            // If the XHR has already completed, do nothing.
            // If the XHR has already been aborted, do nothing.
            // Fix #569, call abort multiple times before done will cause
            // macroTask task count be negative number
            if (task.cancelFn == null || task.data && task.data.aborted) {
              return;
            }

            task.zone.cancelTask(task);
          } else if (Zone.current[fetchTaskAborting] === true) {
            // the abort is called from fetch polyfill, we need to call native abort of XHR.
            return abortNative.apply(self, args);
          } // Otherwise, we are trying to abort an XHR which has not yet been sent, so there is no
          // task
          // to cancel. Do nothing.

        };
      });
    }
  });

  Zone.__load_patch('geolocation', function (global) {
    /// GEO_LOCATION
    if (global['navigator'] && global['navigator'].geolocation) {
      patchPrototype(global['navigator'].geolocation, ['getCurrentPosition', 'watchPosition']);
    }
  });

  Zone.__load_patch('PromiseRejectionEvent', function (global, Zone) {
    // handle unhandled promise rejection
    function findPromiseRejectionHandler(evtName) {
      return function (e) {
        var eventTasks = findEventTasks(global, evtName);
        eventTasks.forEach(function (eventTask) {
          // windows has added unhandledrejection event listener
          // trigger the event listener
          var PromiseRejectionEvent = global['PromiseRejectionEvent'];

          if (PromiseRejectionEvent) {
            var evt = new PromiseRejectionEvent(evtName, {
              promise: e.promise,
              reason: e.rejection
            });
            eventTask.invoke(evt);
          }
        });
      };
    }

    if (global['PromiseRejectionEvent']) {
      Zone[zoneSymbol('unhandledPromiseRejectionHandler')] = findPromiseRejectionHandler('unhandledrejection');
      Zone[zoneSymbol('rejectionHandledHandler')] = findPromiseRejectionHandler('rejectionhandled');
    }
  });
});

/***/ }),

/***/ 1:
/*!*****************************************************!*\
  !*** multi ./projects/rule-editor/src/polyfills.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/mazilumt/dev/pr-rule-editor/projects/rule-editor/src/polyfills.ts */"ip4w");


/***/ }),

/***/ "ip4w":
/*!***********************************************!*\
  !*** ./projects/rule-editor/src/polyfills.ts ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zone.js/dist/zone */ "0TWp");
/* harmony import */ var zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_0__);
/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/guide/browser-support
 */
/***************************************************************************************************
 * BROWSER POLYFILLS
 */
/** IE11 requires the following for NgClass support on SVG elements */
// import 'classlist.js';  // Run `npm install --save classlist.js`.
/**
 * Web Animations `@angular/platform-browser/animations`
 * Only required if AnimationBuilder is used within the application and using IE/Edge or Safari.
 * Standard animation support in Angular DOES NOT require any polyfills (as of Angular 6.0).
 */
// import 'web-animations-js';  // Run `npm install --save web-animations-js`.
/**
 * By default, zone.js will patch all possible macroTask and DomEvents
 * user can disable parts of macroTask/DomEvents patch by setting following flags
 * because those flags need to be set before `zone.js` being loaded, and webpack
 * will put import in the top of bundle, so user need to create a separate file
 * in this directory (for example: zone-flags.ts), and put the following flags
 * into that file, and then add the following code before importing zone.js.
 * import './zone-flags';
 *
 * The flags allowed in zone-flags.ts are listed here.
 *
 * The following flags will work for all browsers.
 *
 * (window as any).__Zone_disable_requestAnimationFrame = true; // disable patch requestAnimationFrame
 * (window as any).__Zone_disable_on_property = true; // disable patch onProperty such as onclick
 * (window as any).__zone_symbol__UNPATCHED_EVENTS = ['scroll', 'mousemove']; // disable patch specified eventNames
 *
 *  in IE/Edge developer tools, the addEventListener will also be wrapped by zone.js
 *  with the following flag, it will bypass `zone.js` patch for IE/Edge
 *
 *  (window as any).__Zone_enable_cross_context_check = true;
 *
 */
/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
 // Included with Angular CLI.
/***************************************************************************************************
 * APPLICATION IMPORTS
 */


/***/ })

},[[1,"runtime"]]]);
//# sourceMappingURL=polyfills.js.map
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!************************************************!*\
  !*** multi ./projects/rule-editor/src/main.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/mazilumt/dev/pr-rule-editor/projects/rule-editor/src/main.ts */"pB9l");


/***/ }),

/***/ "1Ui2":
/*!************************************************************************!*\
  !*** ./projects/ng-rule-editor/src/lib/question/question.component.ts ***!
  \************************************************************************/
/*! exports provided: QuestionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionComponent", function() { return QuestionComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _units__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../units */ "SeNc");
/* harmony import */ var _rule_editor_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rule-editor.service */ "QVwf");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _syntax_preview_syntax_preview_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../syntax-preview/syntax-preview.component */ "mzme");







function QuestionComponent_option_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "option", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var question_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", question_r4.linkId);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", question_r4.text + " (" + question_r4.linkId + ")", " ");
} }
function QuestionComponent_select_7_option_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "option", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var u_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", u_r6.unit);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Convert to ", u_r6.unit, "");
} }
function QuestionComponent_select_7_Template(rf, ctx) { if (rf & 1) {
    var _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "select", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function QuestionComponent_select_7_Template_select_ngModelChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); var ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r7.toUnit = $event; })("change", function QuestionComponent_select_7_Template_select_change_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r9.onChange(false); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "option", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, QuestionComponent_select_7_option_3_Template, 2, 2, "option", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMap"](ctx_r1.lhcStyle.select);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r1.toUnit);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Keep form units (", ctx_r1.unit, ")");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r1.conversionOptions);
} }
function QuestionComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r2.unit);
} }
function QuestionComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Score");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
var QuestionComponent = /** @class */ (function () {
    function QuestionComponent(variableService) {
        this.variableService = variableService;
        this.lhcStyle = {};
        this.linkId = '';
        this.itemHasScore = false;
        this.isNonConvertibleUnit = false;
    }
    /**
     * Angular lifecycle hook called when the component is initialized
     */
    QuestionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.linkId = this.variable.linkId ? this.variable.linkId : '';
        this.toUnit = this.variable.unit ? this.variable.unit : '';
        this.questions = this.variableService.questions;
        this.onChange(false);
        this.variableService.questionsChange.subscribe(function (questions) {
            _this.questions = questions;
        });
    };
    /**
     * Get the question based on linkId
     * @param linkId - FHIR linkId
     */
    QuestionComponent.prototype.getQuestion = function (linkId) {
        return this.questions.find(function (q) {
            return q.linkId === linkId;
        });
    };
    /**
     * Get the list of units we can convert to based on the starting unit
     * @param unit - Starting unit
     */
    QuestionComponent.prototype.getConversionOptions = function (unit) {
        return _units__WEBPACK_IMPORTED_MODULE_1__["UNIT_CONVERSION"][unit];
    };
    /**
     * Called when the questionnaire question or unit is changed
     * @param isQuestion - The change was for a question
     */
    QuestionComponent.prototype.onChange = function (isQuestion) {
        if (isQuestion) {
            // Reset the conversion options when the question changes
            this.toUnit = '';
        }
        // If we already have a question selected (as opposed to the select... prompt)
        if (this.linkId) {
            var question = this.getQuestion(this.linkId);
            this.unit = question === null || question === void 0 ? void 0 : question.unit;
            this.conversionOptions = this.getConversionOptions(this.unit);
            this.isNonConvertibleUnit = this.unit && !this.conversionOptions;
            // Check if this is a score
            if (!this.conversionOptions && !this.isNonConvertibleUnit) {
                this.itemHasScore = this.variableService.itemHasScore(this.linkId);
            }
            else {
                this.itemHasScore = false;
            }
            this.variable.expression = this.variableService.valueOrScoreExpression(this.linkId, this.itemHasScore, !this.isNonConvertibleUnit, this.unit, this.toUnit);
        }
    };
    QuestionComponent.ɵfac = function QuestionComponent_Factory(t) { return new (t || QuestionComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_rule_editor_service__WEBPACK_IMPORTED_MODULE_2__["RuleEditorService"])); };
    QuestionComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: QuestionComponent, selectors: [["lhc-question"]], inputs: { variable: "variable", lhcStyle: "lhcStyle" }, decls: 11, vars: 9, consts: [[1, "form-inline", "question"], [1, "question-select"], ["aria-label", "Question", 3, "ngModel", "ngModelChange", "change"], ["value", "", "disabled", "", "hidden", ""], [3, "value", 4, "ngFor", "ngForOf"], [1, "unit-select"], ["aria-label", "Unit conversion", 3, "ngModel", "style", "ngModelChange", "change", 4, "ngIf"], ["class", "detail", 4, "ngIf"], [3, "syntax", "lhcStyle"], [3, "value"], ["aria-label", "Unit conversion", 3, "ngModel", "ngModelChange", "change"], ["value", ""], [1, "detail"]], template: function QuestionComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "select", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function QuestionComponent_Template_select_ngModelChange_2_listener($event) { return ctx.linkId = $event; })("change", function QuestionComponent_Template_select_change_2_listener() { return ctx.onChange(true); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "option", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Select...");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, QuestionComponent_option_5_Template, 2, 2, "option", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, QuestionComponent_select_7_Template, 4, 5, "select", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, QuestionComponent_div_8_Template, 2, 1, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, QuestionComponent_div_9_Template, 2, 0, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "lhc-syntax-preview", 8);
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMap"](ctx.lhcStyle.select);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.linkId);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.questions);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.conversionOptions);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isNonConvertibleUnit);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.itemHasScore);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("syntax", ctx.variable.expression)("lhcStyle", ctx.lhcStyle);
        } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["SelectControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵangular_packages_forms_forms_x"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _syntax_preview_syntax_preview_component__WEBPACK_IMPORTED_MODULE_5__["SyntaxPreviewComponent"]], styles: [".question[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  flex-direction: row;\n}\n\n.detail[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n}\n\n.question-select[_ngcontent-%COMP%], .unit-select[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n  margin-bottom: 0.5rem;\n}\n\n.question-select[_ngcontent-%COMP%] {\n  flex: 50%;\n  padding-right: 0.5rem;\n}\n\n.unit-select[_ngcontent-%COMP%] {\n  flex: 50%;\n  padding-left: 0.5rem;\n}\n\nselect[_ngcontent-%COMP%] {\n  width: 100%;\n  font-size: 1rem;\n  height: 2rem;\n}\n\n@media (max-width: 975px) {\n  .question[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .question-select[_ngcontent-%COMP%], .unit-select[_ngcontent-%COMP%] {\n    flex: 100%;\n    padding: 0;\n  }\n}\n\ninput[_ngcontent-%COMP%], select[_ngcontent-%COMP%] {\n  height: 2rem;\n  font-size: 1rem;\n  width: 100%;\n  margin-bottom: 0.5rem;\n  box-sizing: border-box;\n  border: 1px solid #999;\n  background-color: white;\n  border-radius: 4px;\n  padding: 0 0.5em;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInF1ZXN0aW9uLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFhO0VBQ2IsZUFBZTtFQUNmLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0QixxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxTQUFTO0VBQ1QscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsU0FBUztFQUNULG9CQUFvQjtBQUN0Qjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxlQUFlO0VBQ2YsWUFBWTtBQUNkOztBQUVBO0VBQ0U7SUFDRSxzQkFBc0I7RUFDeEI7O0VBRUE7SUFDRSxVQUFVO0lBQ1YsVUFBVTtFQUNaO0FBQ0Y7O0FBRUE7RUFDRSxZQUFZO0VBQ1osZUFBZTtFQUNmLFdBQVc7RUFDWCxxQkFBcUI7RUFDckIsc0JBQXNCO0VBQ3RCLHNCQUFzQjtFQUN0Qix1QkFBdUI7RUFDdkIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtBQUNsQiIsImZpbGUiOiJxdWVzdGlvbi5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnF1ZXN0aW9uIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xufVxuXG4uZGV0YWlsIHtcbiAgbWFyZ2luLXRvcDogMC41cmVtO1xufVxuXG4ucXVlc3Rpb24tc2VsZWN0LCAudW5pdC1zZWxlY3Qge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG59XG5cbi5xdWVzdGlvbi1zZWxlY3Qge1xuICBmbGV4OiA1MCU7XG4gIHBhZGRpbmctcmlnaHQ6IDAuNXJlbTtcbn1cblxuLnVuaXQtc2VsZWN0IHtcbiAgZmxleDogNTAlO1xuICBwYWRkaW5nLWxlZnQ6IDAuNXJlbTtcbn1cblxuc2VsZWN0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgaGVpZ2h0OiAycmVtO1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogOTc1cHgpIHtcbiAgLnF1ZXN0aW9uIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICB9XG5cbiAgLnF1ZXN0aW9uLXNlbGVjdCwgLnVuaXQtc2VsZWN0IHtcbiAgICBmbGV4OiAxMDAlO1xuICAgIHBhZGRpbmc6IDA7XG4gIH1cbn1cblxuaW5wdXQsIHNlbGVjdCB7XG4gIGhlaWdodDogMnJlbTtcbiAgZm9udC1zaXplOiAxcmVtO1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBib3JkZXI6IDFweCBzb2xpZCAjOTk5O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBwYWRkaW5nOiAwIDAuNWVtO1xufVxuIl19 */"] });
    return QuestionComponent;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](QuestionComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'lhc-question',
                templateUrl: './question.component.html',
                styleUrls: ['./question.component.css']
            }]
    }], function () { return [{ type: _rule_editor_service__WEBPACK_IMPORTED_MODULE_2__["RuleEditorService"] }]; }, { variable: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], lhcStyle: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "1pom":
/*!**************************************************************************!*\
  !*** ./projects/ng-rule-editor/src/lib/variables/variables.component.ts ***!
  \**************************************************************************/
/*! exports provided: VariablesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VariablesComponent", function() { return VariablesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _variable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../variable */ "Yej3");
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/drag-drop */ "5+WD");
/* harmony import */ var _rule_editor_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../rule-editor.service */ "QVwf");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _question_question_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../question/question.component */ "1Ui2");
/* harmony import */ var _query_observation_query_observation_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../query-observation/query-observation.component */ "mBuv");
/* harmony import */ var _syntax_converter_syntax_converter_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../syntax-converter/syntax-converter.component */ "Y+kQ");











function VariablesComponent_div_11_option_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "option", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var type_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", type_r10.key);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](type_r10.value);
} }
function VariablesComponent_div_11_lhc_question_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "lhc-question", 23);
} if (rf & 2) {
    var variable_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("variable", variable_r2)("lhcStyle", ctx_r5.lhcStyle);
} }
function VariablesComponent_div_11_lhc_query_observation_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "lhc-query-observation", 24);
} if (rf & 2) {
    var ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    var variable_r2 = ctx_r12.$implicit;
    var i_r3 = ctx_r12.index;
    var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("variable", variable_r2)("index", i_r3)("lhcStyle", ctx_r6.lhcStyle);
} }
function VariablesComponent_div_11_div_14_Template(rf, ctx) { if (rf & 1) {
    var _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "lhc-syntax-converter", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("simpleChange", function VariablesComponent_div_11_div_14_Template_lhc_syntax_converter_simpleChange_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15); var i_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index; var ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r13.updateSimpleExpression(i_r3, $event); })("expressionChange", function VariablesComponent_div_11_div_14_Template_lhc_syntax_converter_expressionChange_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15); var i_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index; var ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r16.updateExpression(i_r3, $event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    var i_r3 = ctx_r18.index;
    var variable_r2 = ctx_r18.$implicit;
    var ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("id", "variable-expression-" + i_r3)("simple", variable_r2.simple)("variables", ctx_r7.getAvailableVariables(i_r3))("lhcStyle", ctx_r7.lhcStyle);
} }
function VariablesComponent_div_11_div_15_Template(rf, ctx) { if (rf & 1) {
    var _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "input", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function VariablesComponent_div_11_div_15_Template_input_ngModelChange_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r21); var variable_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; return variable_r2.expression = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    var i_r3 = ctx_r22.index;
    var variable_r2 = ctx_r22.$implicit;
    var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMap"](ctx_r8.lhcStyle.input);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("id", "variable-expression-" + i_r3)("ngModel", variable_r2.expression);
} }
function VariablesComponent_div_11_div_16_Template(rf, ctx) { if (rf & 1) {
    var _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "input", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function VariablesComponent_div_11_div_16_Template_input_ngModelChange_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r25); var variable_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; return variable_r2.expression = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    var i_r3 = ctx_r26.index;
    var variable_r2 = ctx_r26.$implicit;
    var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMap"](ctx_r9.lhcStyle.input);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("id", "variable-expression-" + i_r3)("ngModel", variable_r2.expression);
} }
function VariablesComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    var _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "svg", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "path", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "input", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function VariablesComponent_div_11_Template_input_ngModelChange_4_listener($event) { var variable_r2 = ctx.$implicit; return variable_r2.label = $event; })("change", function VariablesComponent_div_11_Template_input_change_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r29); var ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r28.onNameChange(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "select", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function VariablesComponent_div_11_Template_select_ngModelChange_6_listener($event) { var variable_r2 = ctx.$implicit; return variable_r2.type = $event; })("change", function VariablesComponent_div_11_Template_select_change_6_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r29); var ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r31.onTypeChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "option", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Select...");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, VariablesComponent_div_11_option_9_Template, 2, 2, "option", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](10, "keyvalue");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, VariablesComponent_div_11_lhc_question_12_Template, 1, 2, "lhc-question", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, VariablesComponent_div_11_lhc_query_observation_13_Template, 1, 3, "lhc-query-observation", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, VariablesComponent_div_11_div_14_Template, 2, 4, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, VariablesComponent_div_11_div_15_Template, 2, 4, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, VariablesComponent_div_11_div_16_Template, 2, 4, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function VariablesComponent_div_11_Template_button_click_18_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r29); var i_r3 = ctx.index; var ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r32.onRemove(i_r3); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "x");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var variable_r2 = ctx.$implicit;
    var i_r3 = ctx.index;
    var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMap"](ctx_r0.lhcStyle.variableRow);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("id", "row-" + i_r3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMap"](ctx_r0.lhcStyle.input);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("id", "variable-label-" + i_r3)("ngModel", variable_r2.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMap"](ctx_r0.lhcStyle.select);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("id", "variable-type-" + i_r3)("ngModel", variable_r2.type);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](10, 20, ctx_r0.variableType));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitch", variable_r2.type);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "question");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "queryObservation");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "simple");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "expression");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "query");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMap"](ctx_r0.lhcStyle.buttonDanger);
} }
function VariablesComponent_div_12_Template(rf, ctx) { if (rf & 1) {
    var _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "No variables, please ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "a", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function VariablesComponent_div_12_Template_a_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r34); var ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r33.onAdd(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "add one");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, ".");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
var VariablesComponent = /** @class */ (function () {
    function VariablesComponent(ruleEditorService) {
        this.ruleEditorService = ruleEditorService;
        this.lhcStyle = {};
        this.variableType = _variable__WEBPACK_IMPORTED_MODULE_1__["SimpleVariableType"];
    }
    /**
     * Angular lifecycle hook called when the component is initialized
     */
    VariablesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.variables = this.ruleEditorService.variables;
        this.variableSubscription = this.ruleEditorService.variablesChange.subscribe(function (variables) {
            _this.variables = variables;
        });
    };
    /**
     * Angular lifecycle hook called when bound property changes
     */
    VariablesComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.advancedInterface) {
            this.variableType = this.advancedInterface ? _variable__WEBPACK_IMPORTED_MODULE_1__["AllVariableType"] : _variable__WEBPACK_IMPORTED_MODULE_1__["SimpleVariableType"];
            if (this.variables) {
                var previousValues_1 = [];
                this.variables.forEach(function (variable, index) {
                    previousValues_1[index] = variable.type;
                    variable.type = '';
                });
                // Not sure of a better way of setting the previous values than this
                setTimeout(function () {
                    previousValues_1.forEach(function (type, index) {
                        _this.variables[index].type = type;
                    });
                }, 10);
            }
        }
    };
    /**
     * Angular lifecycle hook called before the component is destroyed
     */
    VariablesComponent.prototype.ngOnDestroy = function () {
        this.variableSubscription.unsubscribe();
    };
    /**
     * Called when adding a new variable
     */
    VariablesComponent.prototype.onAdd = function () {
        this.ruleEditorService.addVariable();
    };
    /**
     * Remove a variable at an index
     * @param i - index to remove
     */
    VariablesComponent.prototype.onRemove = function (i) {
        this.ruleEditorService.remove(i);
    };
    /**
     * Drag and drop rearrange of variable order
     * @param event - drag and drop event
     */
    VariablesComponent.prototype.drop = function (event) {
        Object(_angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_2__["moveItemInArray"])(this.variables, event.previousIndex, event.currentIndex);
    };
    /**
     * Update the preview when the variable name changes
     */
    VariablesComponent.prototype.onNameChange = function () {
        this.ruleEditorService.update();
    };
    /**
     * Toggle the advanced interface based on the type
     */
    VariablesComponent.prototype.onTypeChange = function (event) {
        if (event.target.value === 'query' || event.target.value === 'expression') {
            this.ruleEditorService.checkAdvancedInterface(true);
        }
        else {
            // Need to check all other variables and the final expression before we
            // allow the advanced interface to be removed
            this.ruleEditorService.checkAdvancedInterface();
        }
    };
    /**
     * Get the labels of available variables at the current index
     * @param index - Index of variable we're editing
     */
    VariablesComponent.prototype.getAvailableVariables = function (index) {
        var uneditableVariables = this.ruleEditorService.uneditableVariables.map(function (e) { return e.name; });
        // Only return variables up to but not including index
        var editableVariables = this.variables.map(function (e) { return e.label; }).slice(0, index);
        return uneditableVariables.concat(editableVariables);
    };
    /**
     * Update the expression for variable at the given index.
     * @param i - index
     * @param expression - new expression to use
     */
    VariablesComponent.prototype.updateExpression = function (i, expression) {
        this.variables[i].expression = expression;
    };
    /**
     * Update the Easy Path for variable at the given index.
     * @param i - index
     * @param easyPath - new expression to use
     */
    VariablesComponent.prototype.updateSimpleExpression = function (i, easyPath) {
        this.variables[i].simple = easyPath;
    };
    VariablesComponent.ɵfac = function VariablesComponent_Factory(t) { return new (t || VariablesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_rule_editor_service__WEBPACK_IMPORTED_MODULE_3__["RuleEditorService"])); };
    VariablesComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: VariablesComponent, selectors: [["lhc-variables"]], inputs: { lhcStyle: "lhcStyle", advancedInterface: "advancedInterface" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]], decls: 15, vars: 7, consts: [[1, "container"], ["aria-hidden", "true", 1, "variable-header"], [1, "variable-column-label"], [1, "variable-column-type"], [1, "variable-column-details"], ["cdkDropList", "", 3, "cdkDropListDropped"], ["class", "variable-row drag-variable", "cdkDrag", "", 3, "style", "id", 4, "ngFor", "ngForOf"], ["class", "no-variables", 4, "ngIf"], ["id", "add-variable", 1, "btn", "btn-secondary", "mt-2", 3, "ngStyle", "click"], ["cdkDrag", "", 1, "variable-row", "drag-variable", 3, "id"], ["cdkDragHandle", "", "xmlns", "http://www.w3.org/2000/svg", "width", "20", "height", "20", "fill", "currentColor", "viewBox", "0 0 16 16", 1, "handle"], ["d", "M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"], ["aria-label", "Variable label", 1, "label", 3, "id", "ngModel", "ngModelChange", "change"], ["aria-label", "Variable type", 3, "id", "ngModel", "ngModelChange", "change"], ["value", "", "disabled", "", "hidden", ""], [3, "value", 4, "ngFor", "ngForOf"], [1, "variable-column-details", 3, "ngSwitch"], [3, "variable", "lhcStyle", 4, "ngSwitchCase"], [3, "variable", "index", "lhcStyle", 4, "ngSwitchCase"], ["class", "form-inline", 4, "ngSwitchCase"], [1, "variable-column-actions"], ["aria-label", "Remove variable", "title", "Remove variable", 1, "btn", "btn-danger", "remove-variable", 3, "click"], [3, "value"], [3, "variable", "lhcStyle"], [3, "variable", "index", "lhcStyle"], [1, "form-inline"], [3, "id", "simple", "variables", "lhcStyle", "simpleChange", "expressionChange"], ["aria-label", "FHIRPath Expression", 3, "id", "ngModel", "ngModelChange"], ["aria-label", "FHIR Query", "placeholder", "x-fhir-query", 3, "id", "ngModel", "ngModelChange"], [1, "no-variables"], ["href", "#", 3, "click"]], template: function VariablesComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h2");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Item Variables");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Label");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Variable Type");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Question/FHIRPath Expression/FHIR Query");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("cdkDropListDropped", function VariablesComponent_Template_div_cdkDropListDropped_10_listener($event) { return ctx.drop($event); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, VariablesComponent_div_11_Template, 20, 22, "div", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, VariablesComponent_div_12_Template, 5, 0, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "button", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function VariablesComponent_Template_button_click_13_listener() { return ctx.onAdd(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Add variable");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMap"](ctx.lhcStyle.h2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMap"](ctx.lhcStyle.variableHeader);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.variables);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.variables.length);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", ctx.lhcStyle.buttonSecondary);
        } }, directives: [_angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_2__["CdkDropList"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgStyle"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_2__["CdkDrag"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_2__["CdkDragHandle"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["SelectControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵangular_packages_forms_forms_x"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgSwitch"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgSwitchCase"], _question_question_component__WEBPACK_IMPORTED_MODULE_6__["QuestionComponent"], _query_observation_query_observation_component__WEBPACK_IMPORTED_MODULE_7__["QueryObservationComponent"], _syntax_converter_syntax_converter_component__WEBPACK_IMPORTED_MODULE_8__["SyntaxConverterComponent"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["KeyValuePipe"]], styles: ["*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n\n.variable-row[_ngcontent-%COMP%], .variable-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n}\n\n.variable-header[_ngcontent-%COMP%]    > .variable-column-label[_ngcontent-%COMP%] {\n  padding-left: 1.6em;\n}\n\n.variable-column-label[_ngcontent-%COMP%]    > input[_ngcontent-%COMP%], .variable-column-type[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 2rem;\n  font-size: 1rem;\n}\n\n.variable-column-label[_ngcontent-%COMP%], .variable-column-type[_ngcontent-%COMP%], .variable-column-details[_ngcontent-%COMP%] {\n  padding: 0.5rem;\n}\n\n.variable-column-label[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 0 0 12em;\n}\n\n.label[_ngcontent-%COMP%] {\n  flex-grow: 100;\n}\n\n.variable-column-type[_ngcontent-%COMP%] {\n  flex: 0 0 15em;\n}\n\n.variable-column-details[_ngcontent-%COMP%] {\n  flex: 1 0 25em;\n  min-width: 0;\n}\n\n.variable-column-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  height: 2rem;\n  width: 2rem;\n  background-color: darkred;\n  color: white;\n  padding: 0;\n}\n\n.variable-column-actions[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  padding-top: 0.5rem;\n  padding-left: 0.5rem;\n}\n\n@media (max-width: 975px) {\n  .variable-row[_ngcontent-%COMP%] {flex-direction: column;}\n  .variable-column-label[_ngcontent-%COMP%], .variable-column-type[_ngcontent-%COMP%] {flex: 100%;}\n  .variable-column-details[_ngcontent-%COMP%] {flex: 20 0 10em;}\n  .variable-column-actions[_ngcontent-%COMP%] {flex: auto;}\n}\n\n.drag-variable[_ngcontent-%COMP%] {\n  padding: 0.75rem 0;\n  border-top: solid 1px rgba(0, 0, 0, 0.1);\n  color: rgba(0, 0, 0, 0.87);\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  box-sizing: border-box;\n  background: white;\n}\n\n.handle[_ngcontent-%COMP%] {\n  cursor: move;\n  margin-top: 0.4rem;\n}\n\n.no-variables[_ngcontent-%COMP%] {\n  padding: 2rem;\n}\n\n.cdk-drag-preview[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n  border-radius: 4px;\n  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),\n  0 8px 10px 1px rgba(0, 0, 0, 0.14),\n  0 3px 14px 2px rgba(0, 0, 0, 0.12);\n}\n\n.cdk-drag-placeholder[_ngcontent-%COMP%] {\n  opacity: 0;\n}\n\n.cdk-drag-animating[_ngcontent-%COMP%] {\n  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);\n}\n\ninput[_ngcontent-%COMP%], select[_ngcontent-%COMP%] {\n  height: 2rem;\n  font-size: 1rem;\n  width: 100%;\n  margin-bottom: 1rem;\n  box-sizing: border-box;\n  border: 1px solid #999;\n  background-color: white;\n  border-radius: 4px;\n  padding: 0 0.5em;\n}\n\nbutton[_ngcontent-%COMP%] {\n  height: 2.5rem;\n  border: none;\n  border-radius: 4px;\n  padding: 0 2em;\n  font-size: 1rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZhcmlhYmxlcy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsWUFBWTtBQUNkOztBQUVBO0VBQ0UsWUFBWTtFQUNaLFdBQVc7RUFDWCx5QkFBeUI7RUFDekIsWUFBWTtFQUNaLFVBQVU7QUFDWjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxtQkFBbUI7RUFDbkIsb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0UsZUFBZSxzQkFBc0IsQ0FBQztFQUN0QywrQ0FBK0MsVUFBVSxDQUFDO0VBQzFELDBCQUEwQixlQUFlLENBQUM7RUFDMUMsMEJBQTBCLFVBQVUsQ0FBQztBQUN2Qzs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQix3Q0FBd0M7RUFDeEMsMEJBQTBCO0VBQzFCLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsOEJBQThCO0VBQzlCLHNCQUFzQjtFQUN0QixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLGtCQUFrQjtFQUNsQjs7b0NBRWtDO0FBQ3BDOztBQUVBO0VBQ0UsVUFBVTtBQUNaOztBQUVBO0VBQ0Usc0RBQXNEO0FBQ3hEOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGVBQWU7RUFDZixXQUFXO0VBQ1gsbUJBQW1CO0VBQ25CLHNCQUFzQjtFQUN0QixzQkFBc0I7RUFDdEIsdUJBQXVCO0VBQ3ZCLGtCQUFrQjtFQUNsQixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixjQUFjO0VBQ2QsZUFBZTtBQUNqQiIsImZpbGUiOiJ2YXJpYWJsZXMuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIioge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG4udmFyaWFibGUtcm93LCAudmFyaWFibGUtaGVhZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgZmxleC13cmFwOiB3cmFwO1xufVxuXG4udmFyaWFibGUtaGVhZGVyID4gLnZhcmlhYmxlLWNvbHVtbi1sYWJlbCB7XG4gIHBhZGRpbmctbGVmdDogMS42ZW07XG59XG5cbi52YXJpYWJsZS1jb2x1bW4tbGFiZWwgPiBpbnB1dCwgLnZhcmlhYmxlLWNvbHVtbi10eXBlIHNlbGVjdCB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDJyZW07XG4gIGZvbnQtc2l6ZTogMXJlbTtcbn1cblxuLnZhcmlhYmxlLWNvbHVtbi1sYWJlbCwgLnZhcmlhYmxlLWNvbHVtbi10eXBlLCAudmFyaWFibGUtY29sdW1uLWRldGFpbHMge1xuICBwYWRkaW5nOiAwLjVyZW07XG59XG5cbi52YXJpYWJsZS1jb2x1bW4tbGFiZWwge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4OiAwIDAgMTJlbTtcbn1cblxuLmxhYmVsIHtcbiAgZmxleC1ncm93OiAxMDA7XG59XG5cbi52YXJpYWJsZS1jb2x1bW4tdHlwZSB7XG4gIGZsZXg6IDAgMCAxNWVtO1xufVxuXG4udmFyaWFibGUtY29sdW1uLWRldGFpbHMge1xuICBmbGV4OiAxIDAgMjVlbTtcbiAgbWluLXdpZHRoOiAwO1xufVxuXG4udmFyaWFibGUtY29sdW1uLWFjdGlvbnMgYnV0dG9uIHtcbiAgaGVpZ2h0OiAycmVtO1xuICB3aWR0aDogMnJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogZGFya3JlZDtcbiAgY29sb3I6IHdoaXRlO1xuICBwYWRkaW5nOiAwO1xufVxuXG4udmFyaWFibGUtY29sdW1uLWFjdGlvbnMge1xuICBmbGV4OiAwIDAgYXV0bztcbiAgcGFkZGluZy10b3A6IDAuNXJlbTtcbiAgcGFkZGluZy1sZWZ0OiAwLjVyZW07XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA5NzVweCkge1xuICAudmFyaWFibGUtcm93IHtmbGV4LWRpcmVjdGlvbjogY29sdW1uO31cbiAgLnZhcmlhYmxlLWNvbHVtbi1sYWJlbCwgLnZhcmlhYmxlLWNvbHVtbi10eXBlIHtmbGV4OiAxMDAlO31cbiAgLnZhcmlhYmxlLWNvbHVtbi1kZXRhaWxzIHtmbGV4OiAyMCAwIDEwZW07fVxuICAudmFyaWFibGUtY29sdW1uLWFjdGlvbnMge2ZsZXg6IGF1dG87fVxufVxuXG4uZHJhZy12YXJpYWJsZSB7XG4gIHBhZGRpbmc6IDAuNzVyZW0gMDtcbiAgYm9yZGVyLXRvcDogc29saWQgMXB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC44Nyk7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG59XG5cbi5oYW5kbGUge1xuICBjdXJzb3I6IG1vdmU7XG4gIG1hcmdpbi10b3A6IDAuNHJlbTtcbn1cblxuLm5vLXZhcmlhYmxlcyB7XG4gIHBhZGRpbmc6IDJyZW07XG59XG5cbi5jZGstZHJhZy1wcmV2aWV3IHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBib3gtc2hhZG93OiAwIDVweCA1cHggLTNweCByZ2JhKDAsIDAsIDAsIDAuMiksXG4gIDAgOHB4IDEwcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4xNCksXG4gIDAgM3B4IDE0cHggMnB4IHJnYmEoMCwgMCwgMCwgMC4xMik7XG59XG5cbi5jZGstZHJhZy1wbGFjZWhvbGRlciB7XG4gIG9wYWNpdHk6IDA7XG59XG5cbi5jZGstZHJhZy1hbmltYXRpbmcge1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMjUwbXMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSk7XG59XG5cbmlucHV0LCBzZWxlY3Qge1xuICBoZWlnaHQ6IDJyZW07XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGJvcmRlcjogMXB4IHNvbGlkICM5OTk7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIHBhZGRpbmc6IDAgMC41ZW07XG59XG5cbmJ1dHRvbiB7XG4gIGhlaWdodDogMi41cmVtO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgcGFkZGluZzogMCAyZW07XG4gIGZvbnQtc2l6ZTogMXJlbTtcbn1cbiJdfQ== */"] });
    return VariablesComponent;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](VariablesComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'lhc-variables',
                templateUrl: './variables.component.html',
                styleUrls: ['./variables.component.css']
            }]
    }], function () { return [{ type: _rule_editor_service__WEBPACK_IMPORTED_MODULE_3__["RuleEditorService"] }]; }, { lhcStyle: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], advancedInterface: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "3WTK":
/*!****************************************************!*\
  !*** ./projects/rule-editor/src/app/app.module.ts ***!
  \****************************************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var projects_ng_rule_editor_src_public_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! projects/ng-rule-editor/src/public-api */ "GLEk");
/* harmony import */ var _angular_elements__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/elements */ "Dti6");





var AppModule = /** @class */ (function () {
    function AppModule(injector) {
        this.injector = injector;
    }
    AppModule.prototype.ngDoBootstrap = function () {
        var RuleEditor = Object(_angular_elements__WEBPACK_IMPORTED_MODULE_3__["createCustomElement"])(projects_ng_rule_editor_src_public_api__WEBPACK_IMPORTED_MODULE_2__["RuleEditorComponent"], { injector: this.injector });
        customElements.define('lhc-rule-editor', RuleEditor);
    };
    AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule });
    AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"])); }, providers: [], imports: [[
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                projects_ng_rule_editor_src_public_api__WEBPACK_IMPORTED_MODULE_2__["RuleEditorModule"]
            ]] });
    return AppModule;
}());

(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        projects_ng_rule_editor_src_public_api__WEBPACK_IMPORTED_MODULE_2__["RuleEditorModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    projects_ng_rule_editor_src_public_api__WEBPACK_IMPORTED_MODULE_2__["RuleEditorModule"]
                ],
                providers: [],
                bootstrap: []
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"] }]; }, null); })();


/***/ }),

/***/ "5rxE":
/*!************************************************************************************************!*\
  !*** ./projects/ng-rule-editor/src/lib/calculate-sum-prompt/calculate-sum-prompt.component.ts ***!
  \************************************************************************************************/
/*! exports provided: CalculateSumPromptComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalculateSumPromptComponent", function() { return CalculateSumPromptComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _rule_editor_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../rule-editor.service */ "QVwf");



var CalculateSumPromptComponent = /** @class */ (function () {
    function CalculateSumPromptComponent(ruleEditorService) {
        this.ruleEditorService = ruleEditorService;
        this.lhcStyle = {};
        this.export = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    /**
     * Angular lifecycle hook called when the component is initialized
     */
    CalculateSumPromptComponent.prototype.ngOnInit = function () { };
    /**
     * Close the dialog by specifying this should not be a score calculation
     */
    CalculateSumPromptComponent.prototype.onCloseClick = function () {
        this.ruleEditorService.toggleMightBeScore();
    };
    /**
     * Export the sum of scores as a FHIR Questionnaire
     */
    CalculateSumPromptComponent.prototype.onExportClick = function () {
        this.export.emit();
    };
    CalculateSumPromptComponent.ɵfac = function CalculateSumPromptComponent_Factory(t) { return new (t || CalculateSumPromptComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_rule_editor_service__WEBPACK_IMPORTED_MODULE_1__["RuleEditorService"])); };
    CalculateSumPromptComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CalculateSumPromptComponent, selectors: [["lhc-calculate-sum-prompt"]], inputs: { lhcStyle: "lhcStyle" }, outputs: { export: "export" }, decls: 9, vars: 6, consts: [[1, "score-modal"], ["id", "export-score", 1, "primary", 3, "click"], ["id", "skip-export-score", 3, "click"]], template: function CalculateSumPromptComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "It looks like this might be a score calculation.");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Would you like to calculate the sum of scores?");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CalculateSumPromptComponent_Template_button_click_5_listener() { return ctx.onExportClick(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Yes");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CalculateSumPromptComponent_Template_button_click_7_listener() { return ctx.onCloseClick(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "No");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMap"](ctx.lhcStyle.description);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMap"](ctx.lhcStyle.description);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMap"](ctx.lhcStyle.buttonPrimary);
        } }, styles: ["*[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n\n.score-modal[_ngcontent-%COMP%] {\n  text-align: center;\n}\n\nbutton[_ngcontent-%COMP%] {\n  margin: 0 0.5em;\n}\n\nbutton[_ngcontent-%COMP%] {\n  height: 2.5rem;\n  border: none;\n  border-radius: 4px;\n  padding: 0 2em;\n  font-size: 1rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbGN1bGF0ZS1zdW0tcHJvbXB0LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLGNBQWM7RUFDZCxlQUFlO0FBQ2pCIiwiZmlsZSI6ImNhbGN1bGF0ZS1zdW0tcHJvbXB0LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIqIHtcbiAgZm9udC1zaXplOiAxcmVtO1xufVxuXG4uc2NvcmUtbW9kYWwge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbmJ1dHRvbiB7XG4gIG1hcmdpbjogMCAwLjVlbTtcbn1cblxuYnV0dG9uIHtcbiAgaGVpZ2h0OiAyLjVyZW07XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBwYWRkaW5nOiAwIDJlbTtcbiAgZm9udC1zaXplOiAxcmVtO1xufVxuIl19 */"] });
    return CalculateSumPromptComponent;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CalculateSumPromptComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'lhc-calculate-sum-prompt',
                templateUrl: './calculate-sum-prompt.component.html',
                styleUrls: ['./calculate-sum-prompt.component.css']
            }]
    }], function () { return [{ type: _rule_editor_service__WEBPACK_IMPORTED_MODULE_1__["RuleEditorService"] }]; }, { lhcStyle: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], export: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "EtS3":
/*!***************************************************************************!*\
  !*** ./projects/rule-editor/$$_lazy_route_resource lazy namespace object ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "EtS3";

/***/ }),

/***/ "FzVF":
/*!************************************************************************************************!*\
  !*** ./projects/ng-rule-editor/src/lib/uneditable-variables/uneditable-variables.component.ts ***!
  \************************************************************************************************/
/*! exports provided: UneditableVariablesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UneditableVariablesComponent", function() { return UneditableVariablesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _rule_editor_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../rule-editor.service */ "QVwf");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");




function UneditableVariablesComponent_div_0_div_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var variable_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](variable_r2.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](variable_r2.type);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](variable_r2.description);
} }
function UneditableVariablesComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Variables in Scope for This Item");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Variable Type");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Description/Expression");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, UneditableVariablesComponent_div_0_div_11_Template, 7, 3, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.uneditableVariables);
} }
var UneditableVariablesComponent = /** @class */ (function () {
    function UneditableVariablesComponent(variableService) {
        this.variableService = variableService;
    }
    /**
     * Angular lifecycle hook called when the component is initialized
     */
    UneditableVariablesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.uneditableVariables = this.variableService.uneditableVariables;
        this.uneditableVariablesSubscription =
            this.variableService.uneditableVariablesChange.subscribe(function (variables) {
                _this.uneditableVariables = variables;
            });
    };
    /**
     * Angular lifecycle hook called before the component is destroyed
     */
    UneditableVariablesComponent.prototype.ngOnDestroy = function () {
        this.uneditableVariablesSubscription.unsubscribe();
    };
    UneditableVariablesComponent.ɵfac = function UneditableVariablesComponent_Factory(t) { return new (t || UneditableVariablesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_rule_editor_service__WEBPACK_IMPORTED_MODULE_1__["RuleEditorService"])); };
    UneditableVariablesComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: UneditableVariablesComponent, selectors: [["lhc-uneditable-variables"]], decls: 1, vars: 1, consts: [[4, "ngIf"], [1, "container"], [1, "variable-header"], [1, "variable-column-label"], [1, "variable-column-type"], [1, "variable-column-details"], ["class", "variable-row", 4, "ngFor", "ngForOf"], [1, "variable-row"]], template: function UneditableVariablesComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, UneditableVariablesComponent_div_0_Template, 12, 1, "div", 0);
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.uneditableVariables.length);
        } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"]], styles: ["*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n\n.variable-row[_ngcontent-%COMP%], .variable-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n}\n\n.variable-row[_ngcontent-%COMP%] {\n  border-top: 1px solid rgba(0,0,0,.1);\n}\n\n.variable-column-label[_ngcontent-%COMP%], .variable-column-type[_ngcontent-%COMP%], .variable-column-details[_ngcontent-%COMP%] {\n  padding: 0.5rem;\n}\n\n.variable-column-label[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 0 0 12em;\n}\n\n.variable-column-type[_ngcontent-%COMP%] {\n  flex: 0 0 15em;\n}\n\n.variable-column-details[_ngcontent-%COMP%] {\n  flex: 1 0 25em;\n  min-width: 0;\n}\n\n@media (max-width: 975px) {\n  .variable-row[_ngcontent-%COMP%] {flex-direction: column;}\n  .variable-column-label[_ngcontent-%COMP%], .variable-column-type[_ngcontent-%COMP%] {flex: 100%;}\n  .variable-column-details[_ngcontent-%COMP%] {flex: auto;}\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuZWRpdGFibGUtdmFyaWFibGVzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxvQ0FBb0M7QUFDdEM7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsY0FBYztFQUNkLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGVBQWUsc0JBQXNCLENBQUM7RUFDdEMsK0NBQStDLFVBQVUsQ0FBQztFQUMxRCwwQkFBMEIsVUFBVSxDQUFDO0FBQ3ZDIiwiZmlsZSI6InVuZWRpdGFibGUtdmFyaWFibGVzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIqIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cblxuLnZhcmlhYmxlLXJvdywgLnZhcmlhYmxlLWhlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGZsZXgtd3JhcDogd3JhcDtcbn1cblxuLnZhcmlhYmxlLXJvdyB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCByZ2JhKDAsMCwwLC4xKTtcbn1cblxuLnZhcmlhYmxlLWNvbHVtbi1sYWJlbCwgLnZhcmlhYmxlLWNvbHVtbi10eXBlLCAudmFyaWFibGUtY29sdW1uLWRldGFpbHMge1xuICBwYWRkaW5nOiAwLjVyZW07XG59XG5cbi52YXJpYWJsZS1jb2x1bW4tbGFiZWwge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4OiAwIDAgMTJlbTtcbn1cblxuLnZhcmlhYmxlLWNvbHVtbi10eXBlIHtcbiAgZmxleDogMCAwIDE1ZW07XG59XG5cbi52YXJpYWJsZS1jb2x1bW4tZGV0YWlscyB7XG4gIGZsZXg6IDEgMCAyNWVtO1xuICBtaW4td2lkdGg6IDA7XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA5NzVweCkge1xuICAudmFyaWFibGUtcm93IHtmbGV4LWRpcmVjdGlvbjogY29sdW1uO31cbiAgLnZhcmlhYmxlLWNvbHVtbi1sYWJlbCwgLnZhcmlhYmxlLWNvbHVtbi10eXBlIHtmbGV4OiAxMDAlO31cbiAgLnZhcmlhYmxlLWNvbHVtbi1kZXRhaWxzIHtmbGV4OiBhdXRvO31cbn1cbiJdfQ== */"] });
    return UneditableVariablesComponent;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UneditableVariablesComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'lhc-uneditable-variables',
                templateUrl: './uneditable-variables.component.html',
                styleUrls: ['./uneditable-variables.component.css']
            }]
    }], function () { return [{ type: _rule_editor_service__WEBPACK_IMPORTED_MODULE_1__["RuleEditorService"] }]; }, null); })();


/***/ }),

/***/ "GLEk":
/*!***************************************************!*\
  !*** ./projects/ng-rule-editor/src/public-api.ts ***!
  \***************************************************/
/*! exports provided: RuleEditorService, RuleEditorComponent, RuleEditorModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_rule_editor_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/rule-editor.service */ "QVwf");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RuleEditorService", function() { return _lib_rule_editor_service__WEBPACK_IMPORTED_MODULE_0__["RuleEditorService"]; });

/* harmony import */ var _lib_rule_editor_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/rule-editor.component */ "Q3cl");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RuleEditorComponent", function() { return _lib_rule_editor_component__WEBPACK_IMPORTED_MODULE_1__["RuleEditorComponent"]; });

/* harmony import */ var _lib_rule_editor_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/rule-editor.module */ "T2r1");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RuleEditorModule", function() { return _lib_rule_editor_module__WEBPACK_IMPORTED_MODULE_2__["RuleEditorModule"]; });

/*
 * Public API Surface of ng-rule-editor
 */





/***/ }),

/***/ "PgwD":
/*!***********************************************************************!*\
  !*** ./projects/ng-rule-editor/src/lib/easy-path-expressions.pipe.ts ***!
  \***********************************************************************/
/*! exports provided: EasyPathExpressionsPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EasyPathExpressionsPipe", function() { return EasyPathExpressionsPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var easy_path_expressions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! easy-path-expressions */ "zL9l");



var EasyPathExpressionsPipe = /** @class */ (function () {
    function EasyPathExpressionsPipe() {
    }
    EasyPathExpressionsPipe.prototype.transform = function (value, variables) {
        if (value !== undefined) {
            var fhirPath = easy_path_expressions__WEBPACK_IMPORTED_MODULE_1__["fhirConvert"](value, variables);
            if (fhirPath !== null) {
                return fhirPath;
            }
        }
        return 'Not valid';
    };
    EasyPathExpressionsPipe.ɵfac = function EasyPathExpressionsPipe_Factory(t) { return new (t || EasyPathExpressionsPipe)(); };
    EasyPathExpressionsPipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "easyPathExpressions", type: EasyPathExpressionsPipe, pure: true });
    return EasyPathExpressionsPipe;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](EasyPathExpressionsPipe, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"],
        args: [{
                name: 'easyPathExpressions'
            }]
    }], null, null); })();


/***/ }),

/***/ "Q3cl":
/*!******************************************************************!*\
  !*** ./projects/ng-rule-editor/src/lib/rule-editor.component.ts ***!
  \******************************************************************/
/*! exports provided: RuleEditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RuleEditorComponent", function() { return RuleEditorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _rule_editor_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rule-editor.service */ "QVwf");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/a11y */ "u47x");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _calculate_sum_prompt_calculate_sum_prompt_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./calculate-sum-prompt/calculate-sum-prompt.component */ "5rxE");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/tooltip */ "Qu3c");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _uneditable_variables_uneditable_variables_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./uneditable-variables/uneditable-variables.component */ "FzVF");
/* harmony import */ var _variables_variables_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./variables/variables.component */ "1pom");
/* harmony import */ var _syntax_converter_syntax_converter_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./syntax-converter/syntax-converter.component */ "Y+kQ");
/* harmony import */ var _case_statements_case_statements_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./case-statements/case-statements.component */ "e6+w");












function RuleEditorComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.errorLoading);
} }
function RuleEditorComponent_lhc_calculate_sum_prompt_1_Template(rf, ctx) { if (rf & 1) {
    var _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "lhc-calculate-sum-prompt", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("export", function RuleEditorComponent_lhc_calculate_sum_prompt_1_Template_lhc_calculate_sum_prompt_export_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4); var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r3.addSumOfScores(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("lhcStyle", ctx_r1.lhcStyle);
} }
function RuleEditorComponent_div_2_section_11_div_8_Template(rf, ctx) { if (rf & 1) {
    var _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "select", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function RuleEditorComponent_div_2_section_11_div_8_Template_select_ngModelChange_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r10); var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3); return ctx_r9.expressionSyntax = $event; })("change", function RuleEditorComponent_div_2_section_11_div_8_Template_select_change_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r10); var ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3); return ctx_r11.onTypeChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "option", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Easy Path Expression");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "FHIRPath Expression");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r6.expressionSyntax)("ngStyle", ctx_r6.lhcStyle.select);
} }
function RuleEditorComponent_div_2_section_11_div_9_lhc_syntax_converter_1_Template(rf, ctx) { if (rf & 1) {
    var _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "lhc-syntax-converter", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("expressionChange", function RuleEditorComponent_div_2_section_11_div_9_lhc_syntax_converter_1_Template_lhc_syntax_converter_expressionChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15); var ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](4); return ctx_r14.updateFinalExpression($event); })("simpleChange", function RuleEditorComponent_div_2_section_11_div_9_lhc_syntax_converter_1_Template_lhc_syntax_converter_simpleChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15); var ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](4); return ctx_r16.updateSimpleExpression($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("simple", ctx_r12.simpleExpression)("variables", ctx_r12.variables)("lhcStyle", ctx_r12.lhcStyle);
} }
function RuleEditorComponent_div_2_section_11_div_9_input_2_Template(rf, ctx) { if (rf & 1) {
    var _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "input", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function RuleEditorComponent_div_2_section_11_div_9_input_2_Template_input_ngModelChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r18); var ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](4); return ctx_r17.finalExpression = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r13.finalExpression)("ngStyle", ctx_r13.lhcStyle.input);
} }
function RuleEditorComponent_div_2_section_11_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, RuleEditorComponent_div_2_section_11_div_9_lhc_syntax_converter_1_Template, 1, 3, "lhc-syntax-converter", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, RuleEditorComponent_div_2_section_11_div_9_input_2_Template, 1, 2, "input", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitch", ctx_r7.expressionSyntax);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "simple");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "fhirpath");
} }
function RuleEditorComponent_div_2_section_11_lhc_case_statements_10_Template(rf, ctx) { if (rf & 1) {
    var _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "lhc-case-statements", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("expressionChange", function RuleEditorComponent_div_2_section_11_lhc_case_statements_10_Template_lhc_case_statements_expressionChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r20); var ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3); return ctx_r19.updateFinalExpression($event); })("simpleChange", function RuleEditorComponent_div_2_section_11_lhc_case_statements_10_Template_lhc_case_statements_simpleChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r20); var ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3); return ctx_r21.updateSimpleExpression($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("syntax", ctx_r8.expressionSyntax)("simpleExpression", ctx_r8.simpleExpression)("expression", ctx_r8.finalExpression)("lhcStyle", ctx_r8.lhcStyle);
} }
function RuleEditorComponent_div_2_section_11_Template(rf, ctx) { if (rf & 1) {
    var _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "input", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function RuleEditorComponent_div_2_section_11_Template_input_ngModelChange_4_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r23); var ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r22.caseStatements = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "label", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Use case statements");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, RuleEditorComponent_div_2_section_11_div_8_Template, 6, 2, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, RuleEditorComponent_div_2_section_11_div_9_Template, 3, 3, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, RuleEditorComponent_div_2_section_11_lhc_case_statements_10_Template, 1, 4, "lhc-case-statements", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMap"](ctx_r5.lhcStyle.h2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r5.expressionLabel);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r5.caseStatements);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r5.advancedInterface);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r5.caseStatements);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r5.caseStatements);
} }
function RuleEditorComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    var _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "input", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function RuleEditorComponent_div_2_Template_input_ngModelChange_4_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r25); var ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r24.advancedInterface = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "label", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Advanced interface");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "section", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "lhc-uneditable-variables");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "section", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "lhc-variables", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, RuleEditorComponent_div_2_section_11_Template, 11, 7, "section", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function RuleEditorComponent_div_2_Template_button_click_12_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r25); var ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r26.export(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMap"](ctx_r2.lhcStyle.h1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r2.titleName);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r2.disableInterfaceToggle)("ngModel", ctx_r2.advancedInterface);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("lhcStyle", ctx_r2.lhcStyle)("advancedInterface", ctx_r2.advancedInterface);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r2.expressionUri);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", ctx_r2.lhcStyle.buttonPrimary);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r2.submitButtonName);
} }
var RuleEditorComponent = /** @class */ (function () {
    function RuleEditorComponent(variableService, liveAnnouncer) {
        this.variableService = variableService;
        this.liveAnnouncer = liveAnnouncer;
        this.advancedInterface = false;
        this.doNotAskToCalculateScore = false;
        this.fhirQuestionnaire = null;
        this.itemLinkId = null;
        this.submitButtonName = 'Submit';
        this.titleName = 'Rule Editor';
        this.expressionLabel = 'Final Expression';
        this.expressionUri = '';
        this.lhcStyle = {};
        this.save = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.errorLoading = 'Could not detect a FHIR Questionnaire; please try a different file.';
        this.disableInterfaceToggle = false;
        this.loadError = false;
    }
    RuleEditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.calculateSumSubscription = this.variableService.mightBeScoreChange.subscribe(function (mightBeScore) {
            _this.calculateSum = mightBeScore;
        });
        this.finalExpressionSubscription = this.variableService.finalExpressionChange.subscribe(function (finalExpression) {
            _this.finalExpression = finalExpression;
        });
        this.variablesSubscription = this.variableService.variablesChange.subscribe(function (variables) {
            _this.variables = variables.map(function (e) { return e.label; });
        });
        this.disableAdvancedSubscription = this.variableService.disableAdvancedChange.subscribe(function (disable) {
            _this.disableInterfaceToggle = disable;
        });
    };
    /**
     * Angular lifecycle hook called before the component is destroyed
     */
    RuleEditorComponent.prototype.ngOnDestroy = function () {
        this.calculateSumSubscription.unsubscribe();
        this.finalExpressionSubscription.unsubscribe();
        this.variablesSubscription.unsubscribe();
        this.disableAdvancedSubscription.unsubscribe();
    };
    /**
     * Angular lifecycle hook called on input changes
     */
    RuleEditorComponent.prototype.ngOnChanges = function () {
        this.reload();
    };
    /**
     * Re-import fhir and context and show the form
     */
    RuleEditorComponent.prototype.reload = function () {
        if (this.fhirQuestionnaire instanceof Object) {
            this.variableService.doNotAskToCalculateScore = this.doNotAskToCalculateScore;
            this.loadError = !this.variableService.import(this.expressionUri, this.fhirQuestionnaire, this.itemLinkId);
            if (this.loadError) {
                this.liveAnnouncer.announce(this.errorLoading);
            }
            this.disableInterfaceToggle = this.variableService.needsAdvancedInterface;
            this.advancedInterface = this.variableService.needsAdvancedInterface;
        }
        this.caseStatements = this.variableService.caseStatements;
        this.simpleExpression = this.variableService.simpleExpression;
        this.linkIdContext = this.variableService.linkIdContext;
        this.expressionSyntax = this.variableService.syntaxType;
        this.calculateSum = this.variableService.mightBeScore;
        this.finalExpressionExtension = this.variableService.finalExpressionExtension;
        this.finalExpression = this.variableService.finalExpression;
        this.variables = this.variableService.uneditableVariables.map(function (e) { return e.name; }).concat(this.variableService.variables.map(function (e) { return e.label; }));
    };
    /**
     * Export FHIR Questionnaire and download as a file
     */
    RuleEditorComponent.prototype.export = function () {
        var finalExpression = this.finalExpressionExtension;
        finalExpression.valueExpression.expression = this.finalExpression;
        this.save.emit(this.variableService.export(this.expressionUri, finalExpression));
    };
    /**
     * Create a new instance of a FHIR questionnaire file by summing all ordinal
     * values
     */
    RuleEditorComponent.prototype.addSumOfScores = function () {
        this.save.emit(this.variableService.addSumOfScores());
    };
    /**
     * Update the final expression
     */
    RuleEditorComponent.prototype.updateFinalExpression = function (expression) {
        this.finalExpression = expression;
    };
    /**
     * Update the simple final expression
     */
    RuleEditorComponent.prototype.updateSimpleExpression = function (simple) {
        this.simpleExpression = simple;
    };
    /**
     * Toggle the advanced interface based on the type
     */
    RuleEditorComponent.prototype.onTypeChange = function (event) {
        if (event.target.value === 'fhirpath') {
            this.variableService.checkAdvancedInterface(true);
        }
        else {
            // Need to check all other variables and the final expression before we
            // allow the advanced interface to be removed
            this.variableService.checkAdvancedInterface();
        }
        if (this.variableService.needsAdvancedInterface) {
            this.advancedInterface = true;
            this.disableInterfaceToggle = true;
        }
        else {
            this.disableInterfaceToggle = false;
        }
    };
    RuleEditorComponent.ɵfac = function RuleEditorComponent_Factory(t) { return new (t || RuleEditorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_rule_editor_service__WEBPACK_IMPORTED_MODULE_1__["RuleEditorService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_2__["LiveAnnouncer"])); };
    RuleEditorComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: RuleEditorComponent, selectors: [["lhc-rule-editor"]], inputs: { advancedInterface: "advancedInterface", doNotAskToCalculateScore: "doNotAskToCalculateScore", fhirQuestionnaire: "fhirQuestionnaire", itemLinkId: "itemLinkId", submitButtonName: "submitButtonName", titleName: "titleName", expressionLabel: "expressionLabel", expressionUri: "expressionUri", lhcStyle: "lhcStyle" }, outputs: { save: "save" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]], decls: 3, vars: 3, consts: [["class", "error", 4, "ngIf"], [3, "lhcStyle", "export", 4, "ngIf"], [4, "ngIf"], [1, "error"], [3, "lhcStyle", "export"], ["matTooltip", "When in the advanced interface you can edit FHIRPath and x-fhir-query directly. This mode is automatically enabled for complex Questionnaires.", 1, "checkbox"], ["type", "checkbox", "id", "advanced-interface", 3, "disabled", "ngModel", "ngModelChange"], ["for", "advanced-interface"], ["id", "uneditable-variables-section", 1, "mb-3"], ["id", "variables-section", 1, "mb-3"], [3, "lhcStyle", "advancedInterface"], ["id", "final-expression-section", "class", "mb-3", 4, "ngIf"], ["id", "export", 1, "primary", 3, "ngStyle", "click"], ["id", "final-expression-section", 1, "mb-3"], [1, "checkbox"], ["type", "checkbox", "id", "case-statements", 3, "ngModel", "ngModelChange"], ["for", "case-statements"], [1, "flex-container"], ["class", "expression-type", 4, "ngIf"], ["class", "expression", 3, "ngSwitch", 4, "ngIf"], [3, "syntax", "simpleExpression", "expression", "lhcStyle", "expressionChange", "simpleChange", 4, "ngIf"], [1, "expression-type"], ["aria-label", "Expression syntax type", 1, "form-control", 3, "ngModel", "ngStyle", "ngModelChange", "change"], ["value", "simple"], ["value", "fhirpath"], [1, "expression", 3, "ngSwitch"], [3, "simple", "variables", "lhcStyle", "expressionChange", "simpleChange", 4, "ngSwitchCase"], ["type", "text", "aria-label", "FHIRPath", "id", "final-expression", "class", "form-control", 3, "ngModel", "ngStyle", "ngModelChange", 4, "ngSwitchCase"], [3, "simple", "variables", "lhcStyle", "expressionChange", "simpleChange"], ["type", "text", "aria-label", "FHIRPath", "id", "final-expression", 1, "form-control", 3, "ngModel", "ngStyle", "ngModelChange"], [3, "syntax", "simpleExpression", "expression", "lhcStyle", "expressionChange", "simpleChange"]], template: function RuleEditorComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, RuleEditorComponent_div_0_Template, 2, 1, "div", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, RuleEditorComponent_lhc_calculate_sum_prompt_1_Template, 1, 1, "lhc-calculate-sum-prompt", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, RuleEditorComponent_div_2_Template, 14, 10, "div", 2);
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.loadError);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.calculateSum && !ctx.loadError);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.calculateSum && !ctx.loadError);
        } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _calculate_sum_prompt_calculate_sum_prompt_component__WEBPACK_IMPORTED_MODULE_4__["CalculateSumPromptComponent"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_5__["MatTooltip"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["CheckboxControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgModel"], _uneditable_variables_uneditable_variables_component__WEBPACK_IMPORTED_MODULE_7__["UneditableVariablesComponent"], _variables_variables_component__WEBPACK_IMPORTED_MODULE_8__["VariablesComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgStyle"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["SelectControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ɵangular_packages_forms_forms_x"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgSwitch"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgSwitchCase"], _syntax_converter_syntax_converter_component__WEBPACK_IMPORTED_MODULE_9__["SyntaxConverterComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["DefaultValueAccessor"], _case_statements_case_statements_component__WEBPACK_IMPORTED_MODULE_10__["CaseStatementsComponent"]], styles: [".toolbar-button[_ngcontent-%COMP%] {\n  height: 2.7rem;\n}\n\n.file-import[_ngcontent-%COMP%] {\n  width: 4.6rem;\n  color: transparent;\n}\n\n.file-import[_ngcontent-%COMP%]::-webkit-file-upload-button {\n  visibility: hidden;\n}\n\n.file-import[_ngcontent-%COMP%]::before {\n  content: 'Import';\n  display: inline-block;\n  cursor: pointer;\n  color: #fff;\n}\n\nmat-radio-button[_ngcontent-%COMP%] {\n  margin-left: 1em;\n}\n\nh1[_ngcontent-%COMP%] {\n  margin-top: 0;\n}\n\n.flex-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  flex-direction: row;\n}\n\n.expression[_ngcontent-%COMP%], .expression-type[_ngcontent-%COMP%] {\n  display: flex;\n  padding: 0.5rem;\n}\n\n.expression-type[_ngcontent-%COMP%] {\n  flex: 0 0 15em;\n}\n\n.expression[_ngcontent-%COMP%] {\n  flex: 1 0 30em;\n  min-width: 0;\n}\n\ninput[type=text][_ngcontent-%COMP%], select[_ngcontent-%COMP%] {\n  height: 2rem;\n  font-size: 1rem;\n  width: 100%;\n  margin-bottom: 0.5rem;\n  box-sizing: border-box;\n  border: 1px solid #999;\n  background-color: white;\n  border-radius: 4px;\n  padding: 0 0.5em;\n}\n\nbutton[_ngcontent-%COMP%] {\n  height: 2.5rem;\n  border: none;\n  border-radius: 4px;\n  padding: 0 2em;\n  font-size: 1rem;\n}\n\n.primary[_ngcontent-%COMP%] {\n  background-color: blue;\n  color: white;\n}\n\nlhc-case-statements[_ngcontent-%COMP%] {\n  flex: 100%;\n  width: 100%;\n  padding: 0.5rem;\n}\n\n.checkbox[_ngcontent-%COMP%] {\n  padding: 0.5rem;\n}\n\n#export[_ngcontent-%COMP%] {\n  margin-top: 1em;\n}\n\n@media (max-width: 975px) {\n  .flex-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .expression-type[_ngcontent-%COMP%], .expression[_ngcontent-%COMP%] {\n    flex: 100%;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGUtZWRpdG9yLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixxQkFBcUI7RUFDckIsZUFBZTtFQUNmLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGFBQWE7RUFDYixlQUFlO0VBQ2YsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsY0FBYztFQUNkLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFlBQVk7RUFDWixlQUFlO0VBQ2YsV0FBVztFQUNYLHFCQUFxQjtFQUNyQixzQkFBc0I7RUFDdEIsc0JBQXNCO0VBQ3RCLHVCQUF1QjtFQUN2QixrQkFBa0I7RUFDbEIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsY0FBYztFQUNkLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsY0FBYztFQUNkLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsWUFBWTtBQUNkOztBQUVBO0VBQ0UsVUFBVTtFQUNWLFdBQVc7RUFDWCxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRTtJQUNFLHNCQUFzQjtFQUN4QjtFQUNBO0lBQ0UsVUFBVTtFQUNaO0FBQ0YiLCJmaWxlIjoicnVsZS1lZGl0b3IuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi50b29sYmFyLWJ1dHRvbiB7XG4gIGhlaWdodDogMi43cmVtO1xufVxuXG4uZmlsZS1pbXBvcnQge1xuICB3aWR0aDogNC42cmVtO1xuICBjb2xvcjogdHJhbnNwYXJlbnQ7XG59XG5cbi5maWxlLWltcG9ydDo6LXdlYmtpdC1maWxlLXVwbG9hZC1idXR0b24ge1xuICB2aXNpYmlsaXR5OiBoaWRkZW47XG59XG5cbi5maWxlLWltcG9ydDo6YmVmb3JlIHtcbiAgY29udGVudDogJ0ltcG9ydCc7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBjb2xvcjogI2ZmZjtcbn1cblxubWF0LXJhZGlvLWJ1dHRvbiB7XG4gIG1hcmdpbi1sZWZ0OiAxZW07XG59XG5cbmgxIHtcbiAgbWFyZ2luLXRvcDogMDtcbn1cblxuLmZsZXgtY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xufVxuXG4uZXhwcmVzc2lvbiwgLmV4cHJlc3Npb24tdHlwZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHBhZGRpbmc6IDAuNXJlbTtcbn1cblxuLmV4cHJlc3Npb24tdHlwZSB7XG4gIGZsZXg6IDAgMCAxNWVtO1xufVxuXG4uZXhwcmVzc2lvbiB7XG4gIGZsZXg6IDEgMCAzMGVtO1xuICBtaW4td2lkdGg6IDA7XG59XG5cbmlucHV0W3R5cGU9dGV4dF0sIHNlbGVjdCB7XG4gIGhlaWdodDogMnJlbTtcbiAgZm9udC1zaXplOiAxcmVtO1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBib3JkZXI6IDFweCBzb2xpZCAjOTk5O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBwYWRkaW5nOiAwIDAuNWVtO1xufVxuXG5idXR0b24ge1xuICBoZWlnaHQ6IDIuNXJlbTtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIHBhZGRpbmc6IDAgMmVtO1xuICBmb250LXNpemU6IDFyZW07XG59XG5cbi5wcmltYXJ5IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZTtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG5saGMtY2FzZS1zdGF0ZW1lbnRzIHtcbiAgZmxleDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDAuNXJlbTtcbn1cblxuLmNoZWNrYm94IHtcbiAgcGFkZGluZzogMC41cmVtO1xufVxuXG4jZXhwb3J0IHtcbiAgbWFyZ2luLXRvcDogMWVtO1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogOTc1cHgpIHtcbiAgLmZsZXgtY29udGFpbmVyIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICB9XG4gIC5leHByZXNzaW9uLXR5cGUsIC5leHByZXNzaW9uIHtcbiAgICBmbGV4OiAxMDAlO1xuICB9XG59XG4iXX0= */"] });
    return RuleEditorComponent;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RuleEditorComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                // tslint:disable-next-line:component-selector
                selector: 'lhc-rule-editor',
                templateUrl: 'rule-editor.component.html',
                styleUrls: ['rule-editor.component.css']
            }]
    }], function () { return [{ type: _rule_editor_service__WEBPACK_IMPORTED_MODULE_1__["RuleEditorService"] }, { type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_2__["LiveAnnouncer"] }]; }, { advancedInterface: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], doNotAskToCalculateScore: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], fhirQuestionnaire: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], itemLinkId: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], submitButtonName: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], titleName: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], expressionLabel: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], expressionUri: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], lhcStyle: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], save: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "QVwf":
/*!****************************************************************!*\
  !*** ./projects/ng-rule-editor/src/lib/rule-editor.service.ts ***!
  \****************************************************************/
/*! exports provided: RuleEditorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RuleEditorService", function() { return RuleEditorService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! fast-copy */ "Q1PT");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _variable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./variable */ "Yej3");
/* harmony import */ var _units__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./units */ "SeNc");







var RuleEditorService = /** @class */ (function () {
    function RuleEditorService() {
        this.syntaxType = 'simple';
        this.uneditableVariablesChange = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.variablesChange = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.questionsChange = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.mightBeScoreChange = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.finalExpressionChange = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.disableAdvancedChange = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.needsAdvancedInterface = false;
        this.doNotAskToCalculateScore = false;
        this.LANGUAGE_FHIRPATH = 'text/fhirpath';
        this.LANGUAGE_FHIR_QUERY = 'application/x-fhir-query';
        this.QUESTION_REGEX = /^%resource\.item\.where\(linkId='(.*)'\)\.answer\.value(?:\*(\d*\.?\d*))?$/;
        this.QUERY_REGEX = /^Observation\?code=(.+)&date=gt{{today\(\)-(\d+) (.+)}}&patient={{%patient.id}}&_sort=-date&_count=1$/;
        this.VARIABLE_EXTENSION = 'http://hl7.org/fhir/StructureDefinition/variable';
        this.SCORE_VARIABLE_EXTENSION = 'http://lhcforms.nlm.nih.gov/fhir/ext/rule-editor-score-variable';
        this.SCORE_EXPRESSION_EXTENSION = 'http://lhcforms.nlm.nih.gov/fhir/ext/rule-editor-expression';
        this.SIMPLE_SYNTAX_EXTENSION = 'http://lhcforms.nlm.nih.gov/fhir/ext/simple-syntax';
        this.CALCULATED_EXPRESSION = 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression';
        this.LAUNCH_CONTEXT_URI = 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-launchContext';
        this.linkIdToQuestion = {};
        this.mightBeScore = false;
        this.variables = [];
        this.uneditableVariables = [];
    }
    /**
     * Create a new variable
     */
    RuleEditorService.prototype.addVariable = function () {
        // Get all the existing variable names
        var existingNames = this.variables.map(function (e) { return e.label; })
            .concat(this.uneditableVariables.map(function (e) { return e.name; }));
        this.variables.push({
            label: this.getNewLabelName(existingNames),
            type: 'question',
            expression: ''
        });
        this.variablesChange.next(this.variables);
    };
    /**
     * Remove a variable
     * @param i - index of variable to remove
     */
    RuleEditorService.prototype.remove = function (i) {
        this.variables.splice(i, 1);
    };
    /**
     * Trigger an update (used when changing variable names to update the preview)
     */
    RuleEditorService.prototype.update = function () {
        this.variablesChange.next(this.variables);
    };
    /**
     * Checks the advanced interface status and allows toggle if no expressions or
     * queries are present
     * @param toggleOn - Set the advanced interface on (without having to run checks)
     */
    RuleEditorService.prototype.checkAdvancedInterface = function (toggleOn) {
        if (toggleOn) {
            this.needsAdvancedInterface = true;
        }
        else {
            var needsAdvanced = false;
            // Check variables
            if (this.variables.find(function (e) { return e.type === 'expression' || e.type === 'query'; }) !== undefined) {
                needsAdvanced = true;
            }
            // Check final expression
            if (this.syntaxType === 'fhirpath') {
                needsAdvanced = true;
            }
            this.needsAdvancedInterface = needsAdvanced;
        }
        this.disableAdvancedChange.next(this.needsAdvancedInterface);
    };
    /**
     * Get the list of uneditable variables based on the FHIR Questionnaire:
     * Launch context + variables outside not on the current item scope
     * @param questionnaire - FHIR Questionnaire
     * @param linkIdContext - Context to use for final expression
     * @param launchContextOnly - Only show the launch context related extensions (default: false)
     */
    RuleEditorService.prototype.getUneditableVariables = function (questionnaire, linkIdContext, launchContextOnly) {
        var _this = this;
        if (launchContextOnly === void 0) { launchContextOnly = false; }
        var uneditableVariables = [];
        if (Array.isArray(questionnaire.extension)) {
            var variables = questionnaire.extension.reduce(function (accumulator, extension) {
                var _a, _b;
                if (extension.url === _this.LAUNCH_CONTEXT_URI && extension.extension) {
                    accumulator.push({
                        name: extension.extension.find(function (e) { return e.url === 'name'; }).valueId,
                        type: (_a = extension.extension.filter(function (e) { return e.url === 'type'; })) === null || _a === void 0 ? void 0 : _a.map(function (e) { return e.valueCode; }).join('|'),
                        description: (_b = extension.extension.find(function (e) { return e.url === 'description'; })) === null || _b === void 0 ? void 0 : _b.valueString
                    });
                }
                else if (_this.isVariable(extension) && !launchContextOnly) {
                    accumulator.push({
                        name: extension.valueExpression.name,
                        type: 'Variable',
                        description: extension.valueExpression.expression,
                    });
                }
                return accumulator;
            }, []);
            uneditableVariables.push.apply(uneditableVariables, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(variables));
        }
        // Get the variables on item ancestors where linkId matches
        if (questionnaire.item instanceof Array && !launchContextOnly) {
            var ancestors = this.getAncestors(questionnaire.item, linkIdContext, []);
            if (ancestors instanceof Array) {
                ancestors.forEach(function (currentItem) {
                    if (currentItem.extension instanceof Array) {
                        currentItem.extension.forEach(function (extension) {
                            if (_this.isVariable(extension)) {
                                uneditableVariables.push({
                                    name: extension.valueExpression.name,
                                    type: 'Item variable',
                                    description: extension.valueExpression.expression,
                                });
                            }
                        });
                    }
                });
            }
        }
        return uneditableVariables;
    };
    /**
     * Find the ancestors of an item given the linkId and return those items.
     * @param items - Items array
     * @param itemLinkId - The item for which to determine ancestors
     * @param ancestors - Array of ancestor items. Empty array for root level
     * @return
     */
    RuleEditorService.prototype.getAncestors = function (items, itemLinkId, ancestors) {
        var e_1, _a;
        try {
            for (var items_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                var currentItem = items_1_1.value;
                if (currentItem.linkId === itemLinkId) {
                    return ancestors;
                }
                if (currentItem.item instanceof Array) {
                    var tmp = this.getAncestors(currentItem.item, itemLinkId, ancestors.concat(currentItem));
                    if (tmp !== null) {
                        return tmp;
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return null;
    };
    /**
     * Returns true if extension is a variable with FHIRPath or FHIR Query as the
     * language
     * @param extension - FHIR extension
     * @return true if extension is a variable
     * @private
     */
    RuleEditorService.prototype.isVariable = function (extension) {
        return extension.url === this.VARIABLE_EXTENSION && extension.valueExpression &&
            (extension.valueExpression.language === this.LANGUAGE_FHIRPATH ||
                extension.valueExpression.language === this.LANGUAGE_FHIR_QUERY);
    };
    /**
     * Get and remove the variables from the FHIR object
     * @param items - Question array
     * @param linkIdContext - Context to use for extracting variables
     * @return Array of variables
     */
    RuleEditorService.prototype.extractVariablesFromItems = function (items, linkIdContext) {
        // Look at the item fhirpath related extensions to populate the editable variables
        var e_2, _a;
        var item = items.find(function (e) { return e.linkId === linkIdContext && e.extension; });
        if (item) {
            return this.extractVariablesFromExtensions(item);
        }
        else {
            if (items.item && items.item.length) {
                try {
                    for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(items.item), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var searchItem = _c.value;
                        if (searchItem.item) {
                            var ret = this.extractVariablesFromItems(searchItem.item, linkIdContext);
                            if (ret.length) {
                                return ret;
                            }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            return [];
        }
    };
    /**
     * Get and remove the variables from an item or FHIR questionnaire
     * @param item - FHIR Questionnaire or item
     * @return Array of variables
     * @private
     */
    RuleEditorService.prototype.extractVariablesFromExtensions = function (item) {
        var _this = this;
        var variables = [];
        var nonVariableExtensions = [];
        // Add an index to each extension which we will then use to get the
        // variables back in the correct order. __$index will be removed on save
        item.extension = item.extension.map(function (e, i) { return (Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, e), { __$index: i })); });
        item.extension.forEach(function (extension) {
            if (extension.url === _this.VARIABLE_EXTENSION && extension.valueExpression) {
                switch (extension.valueExpression.language) {
                    case _this.LANGUAGE_FHIRPATH:
                        var fhirPathVarToAdd = _this.processVariable(extension.valueExpression.name, extension.valueExpression.expression, extension.__$index, extension.valueExpression.extension);
                        if (fhirPathVarToAdd.type === 'expression') {
                            _this.needsAdvancedInterface = true;
                        }
                        variables.push(fhirPathVarToAdd);
                        break;
                    case _this.LANGUAGE_FHIR_QUERY:
                        var queryVarToAdd = _this.processQueryVariable(extension.valueExpression.name, extension.valueExpression.expression, extension.__$index);
                        if (queryVarToAdd.type === 'query') {
                            _this.needsAdvancedInterface = true;
                        }
                        variables.push(queryVarToAdd);
                        break;
                }
            }
            else {
                nonVariableExtensions.push(extension);
            }
        });
        // Remove the variables so they can be re-added on export
        item.extension = nonVariableExtensions;
        return variables;
    };
    /**
     * Get and remove the variables from the FHIR object
     * @param fhir - FHIR Questionnaire
     */
    RuleEditorService.prototype.extractTopLevelVariables = function (fhir) {
        if (fhir.extension instanceof Array) {
            return this.extractVariablesFromExtensions(fhir);
        }
        else {
            return [];
        }
    };
    /**
     * Check if the current item has an ordinalValue extension on the answer
     * @param item - Question item or linkId
     */
    RuleEditorService.prototype.itemHasScore = function (item) {
        if (typeof item === 'string') {
            item = this.linkIdToQuestion[item];
        }
        return (item.answerOption || []).some(function (answerOption) {
            return (answerOption.extension || []).some(function (extension) {
                return extension.url === 'http://hl7.org/fhir/StructureDefinition/ordinalValue';
            });
        });
    };
    /**
     * Get the number of ordinalValue on the answers of the questions on the
     * Questionnaire
     * @param item - FHIR Questionnaire or item
     * @param linkIdContext - linkId to exclude from calculation
     * @return number of score questions on the questionnaire, -1 if not should
     *   not calculate score (has repeating groups which are not supported)
     */
    RuleEditorService.prototype.getScoreQuestionCount = function (item, linkIdContext) {
        var _this = this;
        var scoreQuestions = 0;
        item.item.forEach(function (currentItem) {
            if (currentItem.repeats) {
                return -1;
            }
            if (_this.itemHasScore(currentItem)) {
                scoreQuestions++;
            }
            if (currentItem.item instanceof Array) {
                var nestedScoreQuestionCount = _this.getScoreQuestionCount(currentItem, linkIdContext);
                if (nestedScoreQuestionCount === -1) {
                    return -1;
                }
                else {
                    scoreQuestions += nestedScoreQuestionCount;
                }
            }
        });
        return scoreQuestions;
    };
    /**
     * Import a FHIR Questionnaire to populate questions
     * @param expressionUri - URI of expression extension on linkIdContext question
     *  to extract and modify
     * @param questionnaire - FHIR Questionnaire
     * @param linkIdContext - Context to use for final expression
     * @return true if load was successful
     */
    RuleEditorService.prototype.import = function (expressionUri, questionnaire, linkIdContext) {
        this.linkIdContext = linkIdContext;
        this.fhir = fast_copy__WEBPACK_IMPORTED_MODULE_3___default()(questionnaire);
        var loadSuccess = this.fhir.resourceType === 'Questionnaire';
        if (loadSuccess && this.fhir.item && this.fhir.item.length) {
            if (!this.doNotAskToCalculateScore) {
                // If there is at least one score question we will ask the user if they
                // want to calculate the score
                var SCORE_MIN_QUESTIONS = 1;
                this.mightBeScore = this.getScoreQuestionCount(this.fhir, linkIdContext) > SCORE_MIN_QUESTIONS;
                this.mightBeScoreChange.next(this.mightBeScore);
            }
            this.linkIdToQuestion = {};
            this.needsAdvancedInterface = false;
            this.caseStatements = false;
            this.processItem(this.fhir.item);
            if (linkIdContext !== undefined && linkIdContext !== '') {
                this.uneditableVariables = this.getUneditableVariables(this.fhir, linkIdContext);
                this.variables = this.extractVariablesFromItems(this.fhir.item, linkIdContext);
            }
            else {
                this.uneditableVariables = this.getUneditableVariables(this.fhir, linkIdContext, true);
                this.variables = this.extractTopLevelVariables(this.fhir);
                // Since we don't have a target item the output expression does not make sense so hide it.
                expressionUri = '';
            }
            this.uneditableVariablesChange.next(this.uneditableVariables);
            this.variablesChange.next(this.variables);
            this.questions = [];
            // tslint:disable-next-line:forin
            for (var key in this.linkIdToQuestion) {
                if (!this.linkIdToQuestion.hasOwnProperty(key)) {
                    return;
                }
                var e = this.linkIdToQuestion[key];
                // TODO decimal vs choice
                var MAX_Q_LEN = 60; // Maximum question length before truncating.
                var text = e.text;
                if (e.text) {
                    this.questions.push({
                        linkId: e.linkId,
                        text: text.length > MAX_Q_LEN ? text.substring(0, MAX_Q_LEN) + '...' : text,
                        unit: this.getQuestionUnits(e.linkId)
                    });
                }
            }
            this.questionsChange.next(this.questions);
            if (expressionUri) {
                var expression = this.extractExpression(expressionUri, this.fhir.item, linkIdContext);
                if (expression !== null) {
                    // @ts-ignore
                    this.finalExpression = expression.valueExpression.expression;
                    this.finalExpressionExtension = expression;
                    this.caseStatements = this.finalExpression.match(_variable__WEBPACK_IMPORTED_MODULE_4__["CASE_REGEX"]) !== null;
                    var simpleSyntax = this.extractSimpleSyntax(expression);
                    if (simpleSyntax === null && this.finalExpression !== '') {
                        this.syntaxType = 'fhirpath';
                        this.needsAdvancedInterface = true;
                    }
                    else {
                        this.syntaxType = 'simple';
                        this.simpleExpression = simpleSyntax;
                    }
                }
                else {
                    // Reset input to be a blank simple expression if there is nothing on
                    // the form
                    this.syntaxType = 'simple';
                    this.simpleExpression = '';
                    this.finalExpression = '';
                    this.finalExpressionExtension = {
                        url: expressionUri,
                        valueExpression: {
                            language: 'text/fhirpath',
                            expression: this.finalExpression
                        }
                    };
                }
                this.finalExpressionChange.next(this.finalExpression);
            }
        }
        return loadSuccess;
    };
    /**
     * Process nested FHIR Questionnaire items
     * @param items - Current level of item nesting
     * @private
     */
    RuleEditorService.prototype.processItem = function (items) {
        var _this = this;
        items.forEach(function (e) {
            _this.linkIdToQuestion[e.linkId] = e;
            if (e.item) {
                _this.processItem(e.item);
            }
        });
    };
    /**
     * Get and remove the simple syntax if available. If not return null
     * @param expression
     */
    RuleEditorService.prototype.extractSimpleSyntax = function (expression) {
        var _this = this;
        if (expression.valueExpression && expression.valueExpression.extension) {
            var customExtension = expression.valueExpression.extension.find(function (e) {
                return e.url === _this.SIMPLE_SYNTAX_EXTENSION;
            });
            if (customExtension !== undefined) {
                return customExtension.valueString; // TODO move to code
            }
        }
        return null;
    };
    /**
     * Get and remove the final expression
     * @param expressionUri - Expression extension URL
     * @param items - FHIR questionnaire item array
     * @param linkId - linkId of question where to extract expression
     */
    RuleEditorService.prototype.extractExpression = function (expressionUri, items, linkId) {
        var e_3, _a;
        var _this = this;
        try {
            for (var items_2 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(items), items_2_1 = items_2.next(); !items_2_1.done; items_2_1 = items_2.next()) {
                var item = items_2_1.value;
                if (item.linkId === linkId && item.extension) {
                    var extensionIndex = item.extension.findIndex(function (e) {
                        return e.url === expressionUri && e.valueExpression.language === _this.LANGUAGE_FHIRPATH &&
                            e.valueExpression.expression;
                    });
                    if (extensionIndex !== -1) {
                        var finalExpression = item.extension[extensionIndex];
                        item.extension.splice(extensionIndex, 1);
                        return finalExpression;
                    }
                }
                else if (item.item) {
                    return this.extractExpression(expressionUri, item.item, linkId);
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (items_2_1 && !items_2_1.done && (_a = items_2.return)) _a.call(items_2);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return null;
    };
    /**
     * Process a FHIRPath expression into a more user friendly format if possible.
     * If the format of the FHIRPath matches a format we can display with a
     * question dropdown, etc show that. If not show the FHIRPath expression.
     * @param name - Name to assign variable
     * @param expression - Expression to process
     * @param index - Original order in extension list
     * @param extensions - Any additional extensions (for simple fhirpath etc)
     * @return Variable type which can be used by the Rule Editor to show a
     * question, expression etc
     * @private
     */
    RuleEditorService.prototype.processVariable = function (name, expression, index, extensions) {
        var _this = this;
        var matches = expression.match(this.QUESTION_REGEX);
        var simpleExtension = extensions && extensions.find(function (e) { return e.url === _this.SIMPLE_SYNTAX_EXTENSION; });
        if (matches !== null) {
            var linkId = matches[1];
            var factor_1 = matches[2];
            var variable = {
                __$index: index,
                label: name,
                type: 'question',
                linkId: linkId,
                expression: expression
            };
            if (factor_1) {
                // We might be able to do unit conversion
                var sourceUnits = this.getQuestionUnits(linkId);
                if (_units__WEBPACK_IMPORTED_MODULE_5__["UNIT_CONVERSION"].hasOwnProperty(sourceUnits)) {
                    var conversions = _units__WEBPACK_IMPORTED_MODULE_5__["UNIT_CONVERSION"][sourceUnits];
                    var conversion = conversions.find(function (e) {
                        return e.factor.toString() === factor_1;
                    });
                    variable.unit = conversion.unit;
                }
            }
            return variable;
        }
        else if (simpleExtension !== undefined) {
            return {
                __$index: index,
                label: name,
                type: 'simple',
                expression: expression,
                simple: simpleExtension.valueString
            };
        }
        else {
            return {
                __$index: index,
                label: name,
                type: 'expression',
                expression: expression
            };
        }
    };
    /**
     * Process a x-fhir-query expression into a more user friendly format if
     * possible. Show a code autocomplete field if possible if not show the
     * expression editing field.
     * @param name - Name to assign variable
     * @param expression - Expression to process
     * @param index - Original order in extension list
     * @return Variable type which can be used by the Rule Editor to show a
     * question, expression etc
     * @private
     */
    RuleEditorService.prototype.processQueryVariable = function (name, expression, index) {
        var matches = expression.match(this.QUERY_REGEX);
        if (matches !== null) {
            var codes = matches[1].split('%2C'); // URL encoded comma ','
            var timeInterval = parseInt(matches[2], 10);
            var timeIntervalUnits = matches[3];
            return {
                __$index: index,
                label: name,
                type: 'queryObservation',
                codes: codes,
                timeInterval: timeInterval,
                timeIntervalUnit: timeIntervalUnits,
                expression: expression
            };
        }
        else {
            return {
                __$index: index,
                label: name,
                type: 'query',
                expression: expression
            };
        }
    };
    // TODO check behavior of repeating linkId
    /**
     * Get question units for the question
     * @param linkId - Question linkId
     * @private
     */
    RuleEditorService.prototype.getQuestionUnits = function (linkId) {
        var QUESTIONNAIRE_UNIT = 'http://hl7.org/fhir/StructureDefinition/questionnaire-unit';
        var question = this.linkIdToQuestion[linkId];
        if (question.extension) {
            var extension = question.extension.find(function (e) {
                return e.url === QUESTIONNAIRE_UNIT &&
                    e.valueCoding.system && e.valueCoding.system === 'http://unitsofmeasure.org';
            });
            if (extension && extension.valueCoding.code) {
                return extension.valueCoding.code;
            }
        }
        return null;
    };
    /**
     * Generate a label name like A, B, C, ... AA, AB which is not already used
     * @param existingNames {string[]} - Array of names already used by existing variables
     * @private
     */
    RuleEditorService.prototype.getNewLabelName = function (existingNames) {
        var e_4, _a, e_5, _b;
        // All letters which can be used for a simple variable name
        var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
        // First pass is with a single character variable name. Other passes are with two
        var firstLetterAlphabet = [''].concat(alphabet);
        try {
            for (var firstLetterAlphabet_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(firstLetterAlphabet), firstLetterAlphabet_1_1 = firstLetterAlphabet_1.next(); !firstLetterAlphabet_1_1.done; firstLetterAlphabet_1_1 = firstLetterAlphabet_1.next()) {
                var firstLetter = firstLetterAlphabet_1_1.value;
                var _loop_1 = function (secondLetter) {
                    var potentialName = firstLetter + secondLetter;
                    var count = existingNames.filter(function (e) { return e === potentialName; });
                    if (count.length === 0) {
                        return { value: potentialName };
                    }
                };
                try {
                    for (var alphabet_1 = (e_5 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(alphabet)), alphabet_1_1 = alphabet_1.next(); !alphabet_1_1.done; alphabet_1_1 = alphabet_1.next()) {
                        var secondLetter = alphabet_1_1.value;
                        var state_1 = _loop_1(secondLetter);
                        if (typeof state_1 === "object")
                            return state_1.value;
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (alphabet_1_1 && !alphabet_1_1.done && (_b = alphabet_1.return)) _b.call(alphabet_1);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (firstLetterAlphabet_1_1 && !firstLetterAlphabet_1_1.done && (_a = firstLetterAlphabet_1.return)) _a.call(firstLetterAlphabet_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        // Don't return a suggested name if we exhausted all combinations
        return '';
    };
    /**
     * Toggle the mightBeScore
     */
    RuleEditorService.prototype.toggleMightBeScore = function () {
        this.mightBeScore = !this.mightBeScore;
        this.mightBeScoreChange.next(this.mightBeScore);
    };
    /**
     * Add variables and finalExpression and return the new FHIR Questionnaire
     * @param url Extension URL to use for the expression
     * @param finalExpression
     */
    RuleEditorService.prototype.export = function (url, finalExpression) {
        var _this = this;
        // Copy the fhir object, so we can export more than once
        // (if we add our data the second export will have duplicates)
        var fhir = fast_copy__WEBPACK_IMPORTED_MODULE_3___default()(this.fhir);
        var variablesToAdd = this.variables.map(function (e) {
            var variable = {
                __$index: e.__$index,
                url: _this.VARIABLE_EXTENSION,
                valueExpression: {
                    name: e.label,
                    language: e.type === 'query' ? _this.LANGUAGE_FHIR_QUERY : _this.LANGUAGE_FHIRPATH,
                    expression: e.expression
                }
            };
            if (e.type === 'simple') {
                // @ts-ignore
                variable.valueExpression.extension = [{
                        url: _this.SIMPLE_SYNTAX_EXTENSION,
                        valueString: e.simple
                    }];
            }
            return variable;
        });
        // Split the variables into two buckets: Variables present when
        // Questionnaire was imported and variables added by the user using the Rule
        // Editor. Add variables present initially among the existing extensions.
        // Add the remaining variables at the end
        var variablesPresentInitially = [];
        var variablesAdded = [];
        variablesToAdd.forEach(function (e) {
            if (e.__$index === undefined) {
                variablesAdded.push(e);
            }
            else {
                variablesPresentInitially.push(e);
            }
        });
        if (this.syntaxType === 'simple') {
            this.findOrAddExtension(finalExpression.valueExpression.extension, this.SIMPLE_SYNTAX_EXTENSION, 'String', this.simpleExpression);
        }
        if (this.linkIdContext !== undefined && this.linkIdContext !== null && this.linkIdContext !== '') {
            // Treat the final expression as an added variable since it needs to go after the variables added
            this.insertExtensions(fhir, fhir.item, this.linkIdContext, variablesPresentInitially, variablesAdded.concat(finalExpression));
        }
        else {
            this.insertExtensions(fhir, fhir.item, this.linkIdContext, variablesPresentInitially, variablesAdded);
        }
        // If there are any query observation extensions check to make sure there is
        // a patient launch context. If there is not add one.
        var hasQueryObservations = this.variables.find(function (e) {
            return e.type === 'queryObservation';
        });
        if (hasQueryObservations !== undefined) {
            var patientLaunchContext = fhir.extension.find(function (extension) {
                if (extension.url === _this.LAUNCH_CONTEXT_URI &&
                    Array.isArray(extension.extension)) {
                    var patientName = extension.extension.find(function (subExtension) {
                        return subExtension.url === 'name' && subExtension.valueId === 'patient';
                    });
                    if (patientName !== undefined) {
                        return true;
                    }
                }
                return false;
            });
            if (patientLaunchContext === undefined) {
                // Add launchContext
                if (!Array.isArray(fhir.extension)) {
                    fhir.extension = [];
                }
                var name_1 = 'patient';
                var type = 'Patient';
                var description = 'For filling in patient information as the subject for the form';
                fhir.extension.push({
                    url: this.LAUNCH_CONTEXT_URI,
                    extension: [
                        { url: 'name', valueId: name_1 },
                        { url: 'type', valueCode: type },
                        { url: 'description', valueString: description }
                    ]
                });
                this.uneditableVariables.push({
                    name: name_1,
                    type: type,
                    description: description
                });
                this.uneditableVariablesChange.next(this.uneditableVariables);
            }
        }
        return fhir;
    };
    /**
     * Given an extension array, find an extension based on the URI and update the
     * value for the type. If one does not exist add it to the extension list
     * @param extension - Extension array
     * @param uri - URI to search for
     * @param type - Type of value
     * @param value - Value
     * @private
     */
    RuleEditorService.prototype.findOrAddExtension = function (extension, uri, type, value) {
        var _a;
        if (extension instanceof Array) {
            var index = extension.findIndex(function (e) { return e.url === uri; });
            var extensionToAdd = (_a = {
                    url: uri
                },
                _a['value' + type] = value,
                _a);
            if (index === -1) {
                extension.push(extensionToAdd);
            }
            else {
                extension[index] = extensionToAdd;
            }
        }
    };
    /**
     * Takes FHIR questionnaire definition and a linkId and returns the FHIR
     * Questionnaire with a calculated expression at the given linkId which sums up
     * all the ordinal values in the questionnaire
     * @param questionnaire - FHIR Questionnaire
     * @param linkId - Question linkId
     */
    RuleEditorService.prototype.addTotalScoreRule = function (questionnaire, linkId) {
        this.fhir = questionnaire;
        this.linkIdContext = linkId;
        return this.addSumOfScores();
    };
    /**
     * Get a list of item ids based on the logic for `addSumOfScores()`
     * @param items - FHIR item array
     * @param linkId - Link ID context
     */
    RuleEditorService.prototype.getScoreItemIds = function (items, linkId) {
        var scoreItemIds = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.linkId === linkId) {
                // Do not consider items at or below the linkId context required
                break;
            }
            else if (this.hasRuleEditorExtension(item) || item.repeats === true) {
                // If the current item is already a score calculation or this is
                // repeating we should not consider it or any items above
                scoreItemIds = [];
            }
            else if (this.itemHasScore(item)) {
                scoreItemIds.push(item.linkId);
            }
            // Work with nested items
            if (item.item) {
                scoreItemIds = scoreItemIds.concat(this.getScoreItemIds(item.item, linkId));
            }
        }
        return scoreItemIds;
    };
    /**
     * Given the current FHIR questionnaire definition and a linkId return a new FHIR
     * Questionnaire with a calculated expression at the given linkId which sums up
     * all the ordinal values in the questionnaire:
     *  * Assume scored items are above (in question order) the total score item.
     *  * If a preceding item is also a total score item, don’t consider any earlier items.
     */
    RuleEditorService.prototype.addSumOfScores = function () {
        var _this = this;
        var fhir = this.fhir;
        var linkIdContext = this.linkIdContext;
        var variableNames = [];
        // Get an array of linkIds for score questions
        var scoreQuestionLinkIds = this.getScoreItemIds(fhir.item, linkIdContext);
        // Get as many short suggested variable names as we have score questions
        scoreQuestionLinkIds.forEach(function () {
            variableNames.push(_this.getNewLabelName(variableNames));
        });
        var scoreQuestions = scoreQuestionLinkIds.map(function (e, i) {
            return {
                url: _this.VARIABLE_EXTENSION,
                valueExpression: {
                    name: variableNames[i],
                    language: _this.LANGUAGE_FHIRPATH,
                    expression: "%questionnaire.item.where(linkId = '" + e + "').answerOption" +
                        (".where(valueCoding.code=%resource.item.where(linkId = '" + e + "').answer.valueCoding.code).extension") +
                        ".where(url='http://hl7.org/fhir/StructureDefinition/ordinalValue').valueDecimal",
                    extension: [{
                            url: _this.SCORE_VARIABLE_EXTENSION
                        }]
                }
            };
        });
        var anyQuestionAnswered = {
            url: this.VARIABLE_EXTENSION,
            valueExpression: {
                name: 'any_questions_answered',
                language: this.LANGUAGE_FHIRPATH,
                expression: variableNames.map(function (e) { return "%" + e + ".exists()"; }).join(' or '),
                extension: [{
                        url: this.SCORE_VARIABLE_EXTENSION
                    }]
            }
        };
        var sumString = variableNames.map(function (e) { return "iif(%" + e + ".exists(), %" + e + ", 0)"; }).join(' + ');
        var totalCalculation = {
            url: this.CALCULATED_EXPRESSION,
            valueExpression: {
                description: 'Total score calculation',
                language: this.LANGUAGE_FHIRPATH,
                expression: "iif(%any_questions_answered, " + sumString + ", {})",
                extension: [{
                        url: this.SCORE_EXPRESSION_EXTENSION
                    }]
            }
        };
        scoreQuestions.push(anyQuestionAnswered);
        // @ts-ignore
        scoreQuestions.push(totalCalculation);
        this.insertExtensions(fhir, fhir.item, linkIdContext, [], scoreQuestions);
        return fhir;
    };
    /**
     * Checks if the referenced Questionnaire item is a score calculation added by
     * the Rule Editor
     * @param questionnaire - FHIR Questionnaire
     * @param linkId - Questionnaire item Link ID to check, if not provided check
     * all items on the questionnaire
     * @return True if the question at linkId is a score calculation created by
     * the Rule Editor, false otherwise
     */
    RuleEditorService.prototype.isScoreCalculation = function (questionnaire, linkId) {
        var _this = this;
        var checkForScore = function (item) {
            if (linkId === undefined || linkId === item.linkId) {
                var isScore = _this.hasRuleEditorExtension(item);
                if (isScore) {
                    return true;
                }
            }
            if (item.item) {
                var subItemHasScore = item.item.find(function (subItem) { return checkForScore(subItem); });
                if (subItemHasScore) {
                    return true;
                }
            }
            return false;
        };
        return !!questionnaire.item.find(function (item) { return checkForScore(item); });
    };
    /**
     * Returns true if the current item has a custom Rule Editor score extension
     * (indicating it was previously modified by the Rule Editor)
     * @param item
     * @private
     */
    RuleEditorService.prototype.hasRuleEditorExtension = function (item) {
        var _this = this;
        if (item.extension) {
            return item.extension.find(function (extension) { return !!_this.isRuleEditorExtension(extension); });
        }
        else {
            return false;
        }
    };
    /**
     * Updates a FHIR questionnaire score calculation on the item identified by
     * the linkId
     * @param questionnaire - FHIR Questionnaire
     * @param linkId - Questionnaire item Link ID to update
     * @return Questionnaire with updated calculation
     */
    RuleEditorService.prototype.updateScoreCalculation = function (questionnaire, linkId) {
        this.removeSumOfScores(questionnaire, linkId);
        return this.addTotalScoreRule(questionnaire, linkId);
    };
    /**
     * Removes score calculations added by the rule editor on the entire
     * questionnaire or on a specific item
     * @param questionnaire - FHIR Questionnaire
     * @param linkId - Questionnaire item Link ID where to remove score. If empty
     * try to remove scores from all items.
     * @return Questionnaire without the score calculation variable and expression
     */
    RuleEditorService.prototype.removeSumOfScores = function (questionnaire, linkId) {
        var _this = this;
        this.fhir = questionnaire;
        var removeItemScoreVariables = function (item) {
            if (linkId === undefined || linkId === item.linkId) {
                item.extension = item.extension.filter(function (extension) { return !_this.isRuleEditorExtension(extension); });
            }
            if (item.item) {
                item.item.forEach(function (subItem) { return removeItemScoreVariables(subItem); });
            }
        };
        this.fhir.item.forEach(removeItemScoreVariables);
        return this.fhir;
    };
    /**
     * Returns true if the extension has an extension for calculating score false otherwise
     * @param extension - FHIR Extension object
     * @private
     */
    RuleEditorService.prototype.isRuleEditorExtension = function (extension) {
        var _this = this;
        if (extension.valueExpression && extension.valueExpression.extension &&
            extension.valueExpression.extension.length) {
            return !!extension.valueExpression.extension.find(function (e) { return e &&
                (e.url === _this.SCORE_VARIABLE_EXTENSION ||
                    e.url === _this.SCORE_EXPRESSION_EXTENSION); });
        }
        else {
            return false;
        }
    };
    RuleEditorService.prototype.insertExtensions = function (fhir, items, linkId, variablesPresentInitially, variablesAdded) {
        var e_6, _a;
        if (linkId === undefined || linkId === null || linkId === '') {
            addOrInsertExtensions(fhir);
        }
        else {
            try {
                for (var items_3 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(items), items_3_1 = items_3.next(); !items_3_1.done; items_3_1 = items_3.next()) {
                    var item = items_3_1.value;
                    if (item.linkId === linkId) {
                        addOrInsertExtensions(item);
                        break;
                    }
                    else if (item.item) {
                        this.insertExtensions(fhir, item.item, linkId, variablesPresentInitially, variablesAdded);
                    }
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (items_3_1 && !items_3_1.done && (_a = items_3.return)) _a.call(items_3);
                }
                finally { if (e_6) throw e_6.error; }
            }
        }
        function addOrInsertExtensions(item) {
            if (item.extension) {
                // Introduce variables present before
                item.extension = item.extension.concat(variablesPresentInitially);
                // Sort by index
                item.extension.sort(function (a, b) { return a.__$index - b.__$index; });
                // Add variables added by the user
                item.extension = item.extension.concat(variablesAdded);
            }
            else {
                item.extension = variablesPresentInitially.concat(variablesAdded);
            }
            // Remove __$index
            item.extension = item.extension.map(function (_a) {
                var __$index = _a.__$index, other = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(_a, ["__$index"]);
                return other;
            });
        }
    };
    /**
     * Get the expression for a question
     * @param linkId - Question linkId
     * @param itemHasScore - Answer has an ordinalValue extension
     * @param convertible - Units can be converted
     * @param unit - Base units
     * @param toUnit - Destination units
     */
    RuleEditorService.prototype.valueOrScoreExpression = function (linkId, itemHasScore, convertible, unit, toUnit) {
        if (itemHasScore) {
            return "%questionnaire.item.where(linkId = '" + linkId + "').answerOption" +
                (".where(valueCoding.code=%resource.item.where(linkId = '" + linkId + "').answer.valueCoding.code).extension") +
                ".where(url='http://hl7.org/fhir/StructureDefinition/ordinalValue').valueDecimal";
        }
        else if (convertible && unit && toUnit) {
            var factor = _units__WEBPACK_IMPORTED_MODULE_5__["UNIT_CONVERSION"][unit].find(function (e) { return e.unit === toUnit; }).factor;
            return "%resource.item.where(linkId='" + linkId + "').answer.value*" + factor;
        }
        else {
            return "%resource.item.where(linkId='" + linkId + "').answer.value";
        }
    };
    RuleEditorService.ɵfac = function RuleEditorService_Factory(t) { return new (t || RuleEditorService)(); };
    RuleEditorService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: RuleEditorService, factory: RuleEditorService.ɵfac, providedIn: 'root' });
    return RuleEditorService;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](RuleEditorService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "SeNc":
/*!**************************************************!*\
  !*** ./projects/ng-rule-editor/src/lib/units.ts ***!
  \**************************************************/
/*! exports provided: UNIT_CONVERSION */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UNIT_CONVERSION", function() { return UNIT_CONVERSION; });
// Supported unit conversions. Key is the "from" and value is the "to" array
var UNIT_CONVERSION = {
    kg: [{ unit: 'lbs', factor: 2.20462 }],
    lbs: [{ unit: 'kg', factor: 0.453592 }],
    '[in_i]': [{ unit: 'cm', factor: 2.54 }, { unit: 'm', factor: 0.0254 }]
};


/***/ }),

/***/ "T2r1":
/*!***************************************************************!*\
  !*** ./projects/ng-rule-editor/src/lib/rule-editor.module.ts ***!
  \***************************************************************/
/*! exports provided: RuleEditorModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RuleEditorModule", function() { return RuleEditorModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/drag-drop */ "5+WD");
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/clipboard */ "UXJo");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/tooltip */ "Qu3c");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/radio */ "QibW");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/snack-bar */ "dNgK");
/* harmony import */ var _rule_editor_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./rule-editor.component */ "Q3cl");
/* harmony import */ var _variables_variables_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./variables/variables.component */ "1pom");
/* harmony import */ var _uneditable_variables_uneditable_variables_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./uneditable-variables/uneditable-variables.component */ "FzVF");
/* harmony import */ var _question_question_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./question/question.component */ "1Ui2");
/* harmony import */ var _calculate_sum_prompt_calculate_sum_prompt_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./calculate-sum-prompt/calculate-sum-prompt.component */ "5rxE");
/* harmony import */ var _easy_path_expressions_pipe__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./easy-path-expressions.pipe */ "PgwD");
/* harmony import */ var _syntax_converter_syntax_converter_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./syntax-converter/syntax-converter.component */ "Y+kQ");
/* harmony import */ var _syntax_preview_syntax_preview_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./syntax-preview/syntax-preview.component */ "mzme");
/* harmony import */ var _query_observation_query_observation_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./query-observation/query-observation.component */ "mBuv");
/* harmony import */ var _case_statements_case_statements_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./case-statements/case-statements.component */ "e6+w");



















var RuleEditorModule = /** @class */ (function () {
    function RuleEditorModule() {
    }
    RuleEditorModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: RuleEditorModule });
    RuleEditorModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function RuleEditorModule_Factory(t) { return new (t || RuleEditorModule)(); }, imports: [[
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
                _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_2__["DragDropModule"],
                _angular_material_radio__WEBPACK_IMPORTED_MODULE_5__["MatRadioModule"],
                _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_3__["ClipboardModule"],
                _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_4__["MatTooltipModule"],
                _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_7__["MatSnackBarModule"]
            ]] });
    return RuleEditorModule;
}());

(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](RuleEditorModule, { declarations: [_rule_editor_component__WEBPACK_IMPORTED_MODULE_8__["RuleEditorComponent"],
        _variables_variables_component__WEBPACK_IMPORTED_MODULE_9__["VariablesComponent"],
        _uneditable_variables_uneditable_variables_component__WEBPACK_IMPORTED_MODULE_10__["UneditableVariablesComponent"],
        _question_question_component__WEBPACK_IMPORTED_MODULE_11__["QuestionComponent"],
        _calculate_sum_prompt_calculate_sum_prompt_component__WEBPACK_IMPORTED_MODULE_12__["CalculateSumPromptComponent"],
        _easy_path_expressions_pipe__WEBPACK_IMPORTED_MODULE_13__["EasyPathExpressionsPipe"],
        _syntax_converter_syntax_converter_component__WEBPACK_IMPORTED_MODULE_14__["SyntaxConverterComponent"],
        _syntax_preview_syntax_preview_component__WEBPACK_IMPORTED_MODULE_15__["SyntaxPreviewComponent"],
        _query_observation_query_observation_component__WEBPACK_IMPORTED_MODULE_16__["QueryObservationComponent"],
        _case_statements_case_statements_component__WEBPACK_IMPORTED_MODULE_17__["CaseStatementsComponent"]], imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
        _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_2__["DragDropModule"],
        _angular_material_radio__WEBPACK_IMPORTED_MODULE_5__["MatRadioModule"],
        _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_3__["ClipboardModule"],
        _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_4__["MatTooltipModule"],
        _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_7__["MatSnackBarModule"]], exports: [_rule_editor_component__WEBPACK_IMPORTED_MODULE_8__["RuleEditorComponent"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RuleEditorModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [
                    _rule_editor_component__WEBPACK_IMPORTED_MODULE_8__["RuleEditorComponent"],
                    _variables_variables_component__WEBPACK_IMPORTED_MODULE_9__["VariablesComponent"],
                    _uneditable_variables_uneditable_variables_component__WEBPACK_IMPORTED_MODULE_10__["UneditableVariablesComponent"],
                    _question_question_component__WEBPACK_IMPORTED_MODULE_11__["QuestionComponent"],
                    _calculate_sum_prompt_calculate_sum_prompt_component__WEBPACK_IMPORTED_MODULE_12__["CalculateSumPromptComponent"],
                    _easy_path_expressions_pipe__WEBPACK_IMPORTED_MODULE_13__["EasyPathExpressionsPipe"],
                    _syntax_converter_syntax_converter_component__WEBPACK_IMPORTED_MODULE_14__["SyntaxConverterComponent"],
                    _syntax_preview_syntax_preview_component__WEBPACK_IMPORTED_MODULE_15__["SyntaxPreviewComponent"],
                    _query_observation_query_observation_component__WEBPACK_IMPORTED_MODULE_16__["QueryObservationComponent"],
                    _case_statements_case_statements_component__WEBPACK_IMPORTED_MODULE_17__["CaseStatementsComponent"]
                ],
                imports: [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
                    _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_2__["DragDropModule"],
                    _angular_material_radio__WEBPACK_IMPORTED_MODULE_5__["MatRadioModule"],
                    _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_3__["ClipboardModule"],
                    _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_4__["MatTooltipModule"],
                    _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_7__["MatSnackBarModule"]
                ],
                exports: [
                    _rule_editor_component__WEBPACK_IMPORTED_MODULE_8__["RuleEditorComponent"]
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "Y+kQ":
/*!****************************************************************************************!*\
  !*** ./projects/ng-rule-editor/src/lib/syntax-converter/syntax-converter.component.ts ***!
  \****************************************************************************************/
/*! exports provided: SyntaxConverterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SyntaxConverterComponent", function() { return SyntaxConverterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _easy_path_expressions_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../easy-path-expressions.pipe */ "PgwD");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _syntax_preview_syntax_preview_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../syntax-preview/syntax-preview.component */ "mzme");





var SyntaxConverterComponent = /** @class */ (function () {
    function SyntaxConverterComponent() {
        this.lhcStyle = {};
        this.simpleChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.expressionChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.jsToFhirPathPipe = new _easy_path_expressions_pipe__WEBPACK_IMPORTED_MODULE_1__["EasyPathExpressionsPipe"]();
    }
    SyntaxConverterComponent.prototype.ngOnChanges = function () {
        this.onExpressionChange(this.simple);
    };
    SyntaxConverterComponent.prototype.onExpressionChange = function (simple) {
        var fhirPath = this.jsToFhirPathPipe.transform(simple, this.variables);
        this.fhirPathExpression = fhirPath;
        this.simpleChange.emit(simple);
        this.expressionChange.emit(fhirPath);
    };
    SyntaxConverterComponent.ɵfac = function SyntaxConverterComponent_Factory(t) { return new (t || SyntaxConverterComponent)(); };
    SyntaxConverterComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SyntaxConverterComponent, selectors: [["lhc-syntax-converter"]], inputs: { simple: "simple", variables: "variables", lhcStyle: "lhcStyle" }, outputs: { simpleChange: "simpleChange", expressionChange: "expressionChange" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]], decls: 2, vars: 4, consts: [["aria-label", "Easy Path Expression", 1, "simple-expression", 3, "ngModel", "ngModelChange"], [3, "syntax"]], template: function SyntaxConverterComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "input", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function SyntaxConverterComponent_Template_input_ngModelChange_0_listener($event) { return ctx.simple = $event; })("ngModelChange", function SyntaxConverterComponent_Template_input_ngModelChange_0_listener($event) { return ctx.onExpressionChange($event); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "lhc-syntax-preview", 1);
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMap"](ctx.lhcStyle.input);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.simple);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("syntax", ctx.fhirPathExpression);
        } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgModel"], _syntax_preview_syntax_preview_component__WEBPACK_IMPORTED_MODULE_3__["SyntaxPreviewComponent"]], styles: ["[_nghost-%COMP%] {\n  width: 100%;\n}\n\ninput[_ngcontent-%COMP%], select[_ngcontent-%COMP%] {\n  height: 2rem;\n  font-size: 1rem;\n  width: 100%;\n  margin-bottom: 0.5rem;\n  box-sizing: border-box;\n  border: 1px solid #999;\n  background-color: white;\n  border-radius: 4px;\n  padding: 0 0.5em;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN5bnRheC1jb252ZXJ0ZXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFlBQVk7RUFDWixlQUFlO0VBQ2YsV0FBVztFQUNYLHFCQUFxQjtFQUNyQixzQkFBc0I7RUFDdEIsc0JBQXNCO0VBQ3RCLHVCQUF1QjtFQUN2QixrQkFBa0I7RUFDbEIsZ0JBQWdCO0FBQ2xCIiwiZmlsZSI6InN5bnRheC1jb252ZXJ0ZXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbmlucHV0LCBzZWxlY3Qge1xuICBoZWlnaHQ6IDJyZW07XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgYm9yZGVyOiAxcHggc29saWQgIzk5OTtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgcGFkZGluZzogMCAwLjVlbTtcbn1cbiJdfQ== */"] });
    return SyntaxConverterComponent;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SyntaxConverterComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'lhc-syntax-converter',
                templateUrl: './syntax-converter.component.html',
                styleUrls: ['./syntax-converter.component.css']
            }]
    }], function () { return []; }, { simple: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], variables: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], lhcStyle: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], simpleChange: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], expressionChange: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "Yej3":
/*!*****************************************************!*\
  !*** ./projects/ng-rule-editor/src/lib/variable.ts ***!
  \*****************************************************/
/*! exports provided: AllVariableType, SimpleVariableType, CASE_REGEX */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AllVariableType", function() { return AllVariableType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimpleVariableType", function() { return SimpleVariableType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_REGEX", function() { return CASE_REGEX; });
var AllVariableType;
(function (AllVariableType) {
    AllVariableType["question"] = "Question";
    AllVariableType["expression"] = "FHIRPath Expression";
    AllVariableType["simple"] = "Easy Path Expression";
    AllVariableType["query"] = "FHIR Query";
    AllVariableType["queryObservation"] = "FHIR Query (Observation)";
})(AllVariableType || (AllVariableType = {}));
var SimpleVariableType;
(function (SimpleVariableType) {
    SimpleVariableType["question"] = "Question";
    SimpleVariableType["simple"] = "Easy Path Expression";
    SimpleVariableType["queryObservation"] = "FHIR Query (Observation)";
})(SimpleVariableType || (SimpleVariableType = {}));
var CASE_REGEX = /^\s*iif\s*\((.*)\)\s*$/;


/***/ }),

/***/ "YszZ":
/*!**************************************************************!*\
  !*** ./projects/rule-editor/src/environments/environment.ts ***!
  \**************************************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "e6+w":
/*!**************************************************************************************!*\
  !*** ./projects/ng-rule-editor/src/lib/case-statements/case-statements.component.ts ***!
  \**************************************************************************************/
/*! exports provided: CaseStatementsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CaseStatementsComponent", function() { return CaseStatementsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/drag-drop */ "5+WD");
/* harmony import */ var _variable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../variable */ "Yej3");
/* harmony import */ var _easy_path_expressions_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../easy-path-expressions.pipe */ "PgwD");
/* harmony import */ var _rule_editor_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../rule-editor.service */ "QVwf");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _syntax_preview_syntax_preview_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../syntax-preview/syntax-preview.component */ "mzme");










function CaseStatementsComponent_div_10_input_4_Template(rf, ctx) { if (rf & 1) {
    var _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "input", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function CaseStatementsComponent_div_10_input_4_Template_input_ngModelChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13); var caseStatement_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; return caseStatement_r4.condition = $event; })("ngModelChange", function CaseStatementsComponent_div_10_input_4_Template_input_ngModelChange_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13); var ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r14.onChange(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    var i_r5 = ctx_r15.index;
    var caseStatement_r4 = ctx_r15.$implicit;
    var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMap"](ctx_r6.lhcStyle.input);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("id", "case-condition-" + i_r5)("ngModel", caseStatement_r4.condition);
} }
function CaseStatementsComponent_div_10_input_5_Template(rf, ctx) { if (rf & 1) {
    var _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "input", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function CaseStatementsComponent_div_10_input_5_Template_input_ngModelChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r18); var caseStatement_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; return caseStatement_r4.simpleCondition = $event; })("ngModelChange", function CaseStatementsComponent_div_10_input_5_Template_input_ngModelChange_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r18); var ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r19.onChange(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    var i_r5 = ctx_r20.index;
    var caseStatement_r4 = ctx_r20.$implicit;
    var ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMap"](ctx_r7.lhcStyle.input);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("id", "case-condition-" + i_r5)("ngModel", caseStatement_r4.simpleCondition);
} }
function CaseStatementsComponent_div_10_input_9_Template(rf, ctx) { if (rf & 1) {
    var _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "input", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function CaseStatementsComponent_div_10_input_9_Template_input_ngModelChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r23); var caseStatement_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; return caseStatement_r4.output = $event; })("ngModelChange", function CaseStatementsComponent_div_10_input_9_Template_input_ngModelChange_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r23); var ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r24.onChange(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    var i_r5 = ctx_r25.index;
    var caseStatement_r4 = ctx_r25.$implicit;
    var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMap"](ctx_r8.lhcStyle.input);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("id", "case-output-" + i_r5)("ngModel", caseStatement_r4.output);
} }
function CaseStatementsComponent_div_10_input_10_Template(rf, ctx) { if (rf & 1) {
    var _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "input", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function CaseStatementsComponent_div_10_input_10_Template_input_ngModelChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r28); var caseStatement_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; return caseStatement_r4.simpleOutput = $event; })("ngModelChange", function CaseStatementsComponent_div_10_input_10_Template_input_ngModelChange_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r28); var ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r29.onChange(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    var i_r5 = ctx_r30.index;
    var caseStatement_r4 = ctx_r30.$implicit;
    var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMap"](ctx_r9.lhcStyle.input);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("id", "case-output-" + i_r5)("ngModel", caseStatement_r4.simpleOutput);
} }
function CaseStatementsComponent_div_10_div_11_Template(rf, ctx) { if (rf & 1) {
    var _r33 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CaseStatementsComponent_div_10_div_11_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r33); var i_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index; var ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r31.onRemove(i_r5); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "x");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMap"](ctx_r10.lhcStyle.buttonDanger);
} }
function CaseStatementsComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "svg", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "path", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, CaseStatementsComponent_div_10_input_4_Template, 1, 4, "input", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, CaseStatementsComponent_div_10_input_5_Template, 1, 4, "input", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "span", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "\u2192");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, CaseStatementsComponent_div_10_input_9_Template, 1, 4, "input", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, CaseStatementsComponent_div_10_input_10_Template, 1, 4, "input", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, CaseStatementsComponent_div_10_div_11_Template, 3, 2, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var i_r5 = ctx.index;
    var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMap"](ctx_r0.lhcStyle.variableRow);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("id", "row-" + i_r5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.syntax !== "simple");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.syntax === "simple");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.syntax !== "simple");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.syntax === "simple");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.cases.length > 1);
} }
function CaseStatementsComponent_input_18_Template(rf, ctx) { if (rf & 1) {
    var _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "input", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function CaseStatementsComponent_input_18_Template_input_ngModelChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r35); var ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r34.defaultCase = $event; })("ngModelChange", function CaseStatementsComponent_input_18_Template_input_ngModelChange_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r35); var ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r36.onChange(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMap"](ctx_r1.lhcStyle.input);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r1.defaultCase);
} }
function CaseStatementsComponent_input_19_Template(rf, ctx) { if (rf & 1) {
    var _r38 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "input", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function CaseStatementsComponent_input_19_Template_input_ngModelChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r38); var ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r37.simpleDefaultCase = $event; })("ngModelChange", function CaseStatementsComponent_input_19_Template_input_ngModelChange_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r38); var ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r39.onChange(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMap"](ctx_r2.lhcStyle.input);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r2.simpleDefaultCase);
} }
function CaseStatementsComponent_lhc_syntax_preview_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "lhc-syntax-preview", 24);
} if (rf & 2) {
    var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("lhcStyle", ctx_r3.lhcStyle)("syntax", ctx_r3.output);
} }
var CaseStatementsComponent = /** @class */ (function () {
    function CaseStatementsComponent(ruleEditorService) {
        this.ruleEditorService = ruleEditorService;
        this.lhcStyle = {};
        this.expressionChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.simpleChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.STRING_REGEX = /^'(.*)'$/;
        this.pipe = new _easy_path_expressions_pipe__WEBPACK_IMPORTED_MODULE_3__["EasyPathExpressionsPipe"]();
        this.outputExpressions = true;
        this.cases = [{ condition: '', simpleCondition: '', output: '', simpleOutput: '' }];
        this.output = '';
        this.hidePreview = false;
    }
    /**
     * Angular lifecycle hook for initialization
     */
    CaseStatementsComponent.prototype.ngOnInit = function () {
        if (this.syntax === 'fhirpath' && this.expression !== undefined) {
            this.parseIif(this.expression, 0);
        }
        else if (this.syntax === 'simple' && this.simpleExpression !== undefined) {
            this.parseSimpleCases();
        }
        this.output = this.getIif(0);
    };
    /**
     * Parses the Easy Path expression and populates the case editor. Toggles "use
     * expressions" off if output is only strings.
     */
    CaseStatementsComponent.prototype.parseSimpleCases = function () {
        var _this = this;
        this.parseIif(this.simpleExpression, 0);
        // If all output values are strings toggle off "use expressions"
        var outputString = this.cases.find(function (e) { return (!_this.isString(e.simpleOutput)); });
        var defaultIsString = this.isString(this.simpleDefaultCase);
        if (outputString === undefined && defaultIsString) {
            this.outputExpressions = false;
            // Remove quotes from output strings and default case
            this.cases.forEach(function (e) {
                e.simpleOutput = _this.removeQuotes(e.simpleOutput);
            });
            this.simpleDefaultCase = this.removeQuotes(this.simpleDefaultCase);
        }
    };
    /**
     * Checks if the expression is a string
     */
    CaseStatementsComponent.prototype.isString = function (expression) {
        return this.STRING_REGEX.test(expression);
    };
    /**
     * Removes surrounding quotes
     */
    CaseStatementsComponent.prototype.removeQuotes = function (expression) {
        return expression.match(this.STRING_REGEX)[1];
    };
    /**
     * Angular lifecycle hook for changes
     */
    CaseStatementsComponent.prototype.ngOnChanges = function (changes) {
        if (changes.syntax && this.syntax === 'simple' && changes.syntax.firstChange === false) {
            this.parseSimpleCases();
            this.onChange();
        }
        else if (changes.syntax && this.syntax === 'fhirpath' && changes.syntax.firstChange === false) {
            this.outputExpressions = true;
            this.parseIif(this.expression, 0);
            this.onChange();
        }
    };
    /**
     * Called when adding a new case
     */
    CaseStatementsComponent.prototype.onAdd = function () {
        this.cases.push({ condition: '', simpleCondition: '', output: '', simpleOutput: '' });
        this.onChange();
        // TODO select next input box that was added
    };
    /**
     * Remove the case at an index
     * @param i - index to remove
     */
    CaseStatementsComponent.prototype.onRemove = function (i) {
        this.cases.splice(i, 1);
        this.onChange();
    };
    /**
     * Angular lifecycle hook for changes
     */
    CaseStatementsComponent.prototype.onChange = function () {
        this.output = this.getIif(0);
        this.expressionChange.emit(this.output);
        this.simpleChange.emit(this.simpleExpression);
    };
    /**
     * Parse iif expression at specified level. Top level is 0
     * @param expression - expression to parse
     * @param level - depth or level of expression nesting
     */
    CaseStatementsComponent.prototype.parseIif = function (expression, level) {
        // If expressions don't start with iif( and end with ) they cannot be parsed
        var matches = expression.match(_variable__WEBPACK_IMPORTED_MODULE_2__["CASE_REGEX"]);
        if (matches !== null) {
            var iifContents = matches[1];
            var commaMatches = 0;
            var nestingLevel = 0;
            var comma1 = -1;
            var comma2 = -1;
            // Check where the ',' is relative to depth as indicated by parenthesis
            for (var i = 0; i < iifContents.length; i++) {
                switch (iifContents[i]) {
                    case '(':
                        nestingLevel++;
                        break;
                    case ')':
                        nestingLevel--;
                        break;
                    case ',':
                        if (nestingLevel === 0) {
                            commaMatches++;
                            if (comma1 === -1) {
                                comma1 = i;
                            }
                            else if (comma2 === -1) {
                                comma2 = i;
                            }
                        }
                        break;
                }
            }
            if (commaMatches === 2 && nestingLevel === 0) {
                // Clear out any existing cases if we have a match for iif
                if (level === 0) {
                    this.cases = [];
                }
                var condition = iifContents.substring(0, comma1).trim();
                var trueCase = iifContents.substring(comma1 + 1, comma2).trim();
                var falseCase = iifContents.substring(comma2 + 1, iifContents.length).trim();
                if (this.syntax === 'simple') {
                    var variableNames = this.ruleEditorService.variables.map(function (e) { return e.label; });
                    this.cases.push({
                        simpleCondition: condition,
                        simpleOutput: trueCase,
                        condition: this.pipe.transform(condition, variableNames),
                        output: this.pipe.transform(trueCase, variableNames)
                    });
                }
                else {
                    this.cases.push({
                        condition: condition,
                        output: trueCase
                    });
                }
                var parseResult = this.parseIif(falseCase, level + 1);
                if (parseResult === false && this.syntax !== 'simple') {
                    this.defaultCase = falseCase;
                }
                else if (parseResult === false && this.syntax === 'simple') {
                    this.simpleDefaultCase = falseCase;
                }
                return true;
            }
        }
        return false;
    };
    /**
     * Get an iif expression given a nesting level
     * @param level - nesting level
     */
    CaseStatementsComponent.prototype.getIif = function (level) {
        var isSimple = this.syntax === 'simple';
        var output = this.transformIfSimple(isSimple ?
            this.cases[level].simpleOutput :
            this.cases[level].output, true);
        var condition = this.transformIfSimple(isSimple ?
            this.cases[level].simpleCondition :
            this.cases[level].condition, false);
        var defaultCase = this.transformIfSimple(isSimple ?
            this.simpleDefaultCase : this.defaultCase, true);
        if (level === 0) {
            this.hidePreview = condition === '' || output === '' || defaultCase === '';
        }
        if (level === this.cases.length - 1) {
            return "iif(" + condition + "," + output + "," + defaultCase + ")";
        }
        else {
            return "iif(" + condition + "," + output + "," + this.getIif(level + 1) + ")";
        }
    };
    /**
     * Transform the expression parameter if the syntax type is Easy Path,
     * otherwise return the expression. Additionally if this is an output column
     * and output expressions are off surround with quotes.
     * @param expression - Easy Path or FHIRPath expression
     * @param isOutput - True if processing an output or default value
     * @return FHIRPath Expression
     */
    CaseStatementsComponent.prototype.transformIfSimple = function (expression, isOutput) {
        if (expression === undefined) {
            return '';
        }
        var processedExpression = expression;
        if (isOutput && !this.outputExpressions) {
            processedExpression = "'" + processedExpression + "'"; // TODO should we escape the expression?
        }
        // Convert when syntax is simple but not in the output column is outputExpressions is disabled
        if (this.syntax === 'simple' && !(isOutput && !this.outputExpressions)) {
            return this.pipe.transform(processedExpression, this.ruleEditorService.variables.map(function (e) { return e.label; }));
        }
        else {
            return processedExpression;
        }
    };
    /**
     * Drag and drop rearrange of variable order
     * @param event - drag and drop event
     */
    CaseStatementsComponent.prototype.drop = function (event) {
        Object(_angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_1__["moveItemInArray"])(this.cases, event.previousIndex, event.currentIndex);
        this.onChange();
    };
    CaseStatementsComponent.ɵfac = function CaseStatementsComponent_Factory(t) { return new (t || CaseStatementsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_rule_editor_service__WEBPACK_IMPORTED_MODULE_4__["RuleEditorService"])); };
    CaseStatementsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CaseStatementsComponent, selectors: [["lhc-case-statements"]], inputs: { lhcStyle: "lhcStyle", syntax: "syntax", simpleExpression: "simpleExpression", expression: "expression" }, outputs: { expressionChange: "expressionChange", simpleChange: "simpleChange" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]], decls: 21, vars: 8, consts: [[1, "container"], ["aria-hidden", "true", 1, "case-header"], [1, "case-condition-column"], [1, "case-output-column"], ["type", "checkbox", "id", "output-expressions", 3, "ngModel", "ngModelChange", "change"], ["for", "output-expressions"], ["cdkDropList", "", 3, "cdkDropListDropped"], ["class", "case-row drag-case", "cdkDrag", "", 3, "style", "id", 4, "ngFor", "ngForOf"], ["id", "add-case", 1, "btn", "btn-secondary", "mt-2", 3, "ngStyle", "click"], [1, "case-row"], ["type", "text", "class", "default", 3, "ngModel", "style", "ngModelChange", 4, "ngIf"], [3, "lhcStyle", "syntax", 4, "ngIf"], ["cdkDrag", "", 1, "case-row", "drag-case", 3, "id"], ["cdkDragHandle", "", "xmlns", "http://www.w3.org/2000/svg", "width", "20", "height", "20", "fill", "currentColor", "viewBox", "0 0 16 16", 1, "handle"], ["d", "M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"], ["type", "text", "class", "condition", "aria-label", "Case condition", 3, "id", "ngModel", "style", "ngModelChange", 4, "ngIf"], [1, "arrow"], ["type", "text", "class", "output", "aria-label", "Case output", 3, "id", "ngModel", "style", "ngModelChange", 4, "ngIf"], ["class", "case-column-actions", 4, "ngIf"], ["type", "text", "aria-label", "Case condition", 1, "condition", 3, "id", "ngModel", "ngModelChange"], ["type", "text", "aria-label", "Case output", 1, "output", 3, "id", "ngModel", "ngModelChange"], [1, "case-column-actions"], ["aria-label", "Remove case", "title", "Remove case", 1, "btn", "btn-danger", "remove-case", 3, "click"], ["type", "text", 1, "default", 3, "ngModel", "ngModelChange"], [3, "lhcStyle", "syntax"]], template: function CaseStatementsComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "When expression is true");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " Output ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "input", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function CaseStatementsComponent_Template_input_ngModelChange_6_listener($event) { return ctx.outputExpressions = $event; })("change", function CaseStatementsComponent_Template_input_change_6_listener() { return ctx.onChange(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "label", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Use expressions (strings if unchecked)");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("cdkDropListDropped", function CaseStatementsComponent_Template_div_cdkDropListDropped_9_listener($event) { return ctx.drop($event); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, CaseStatementsComponent_div_10_Template, 12, 8, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "button", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CaseStatementsComponent_Template_button_click_11_listener() { return ctx.onAdd(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Add case");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "label");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, " Default output value: ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](18, CaseStatementsComponent_input_18_Template, 1, 3, "input", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](19, CaseStatementsComponent_input_19_Template, 1, 3, "input", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](20, CaseStatementsComponent_lhc_syntax_preview_20_Template, 1, 2, "lhc-syntax-preview", 11);
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMap"](ctx.lhcStyle.variableHeader);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.outputExpressions);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.cases);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", ctx.lhcStyle.buttonSecondary);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.syntax !== "simple");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.syntax === "simple");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.hidePreview);
        } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["CheckboxControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgModel"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_1__["CdkDropList"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgStyle"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_1__["CdkDrag"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_1__["CdkDragHandle"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["DefaultValueAccessor"], _syntax_preview_syntax_preview_component__WEBPACK_IMPORTED_MODULE_7__["SyntaxPreviewComponent"]], styles: ["*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n\n.case-row[_ngcontent-%COMP%], .case-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n}\n\n.case-header[_ngcontent-%COMP%]    > .case-column-label[_ngcontent-%COMP%] {\n  padding-left: 1.6em;\n}\n\n.case-condition-column[_ngcontent-%COMP%]    > input[_ngcontent-%COMP%], .case-output-column[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 2rem;\n  font-size: 1rem;\n}\n\n.case-condition-column[_ngcontent-%COMP%], .case-output-column[_ngcontent-%COMP%] {\n  padding: 0.5rem;\n}\n\n.case-condition-column[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 0 0 50%;\n}\n\n.condition[_ngcontent-%COMP%], .output[_ngcontent-%COMP%] {\n  flex-grow: 100;\n}\n\n.case-actions-column[_ngcontent-%COMP%] {\n  flex: auto;\n}\n\n.case-output-column[_ngcontent-%COMP%] {\n  flex: 1 0 40%;\n  min-width: 0;\n}\n\n.case-column-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  height: 2rem;\n  width: 2rem;\n  background-color: darkred;\n  color: white;\n  padding: 0;\n}\n\n.case-column-actions[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  padding-top: 0.5rem;\n  padding-left: 0.5rem;\n}\n\n@media (max-width: 975px) {\n  .case-row[_ngcontent-%COMP%] {flex-direction: column;}\n  .case-condition-column[_ngcontent-%COMP%] {flex: 100%;}\n  .case-output-column[_ngcontent-%COMP%] {flex: 20 0 10em;}\n  .case-actions-column[_ngcontent-%COMP%] {flex: auto;}\n}\n\n.drag-case[_ngcontent-%COMP%] {\n  padding: 0.75rem 0;\n  border-top: solid 1px rgba(0, 0, 0, 0.1);\n  color: rgba(0, 0, 0, 0.87);\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  box-sizing: border-box;\n  background: white;\n}\n\n.handle[_ngcontent-%COMP%] {\n  cursor: move;\n  margin-top: 0.4rem;\n}\n\n.cdk-drag-preview[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n  border-radius: 4px;\n  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),\n  0 8px 10px 1px rgba(0, 0, 0, 0.14),\n  0 3px 14px 2px rgba(0, 0, 0, 0.12);\n}\n\n.cdk-drag-placeholder[_ngcontent-%COMP%] {\n  opacity: 0;\n}\n\n.cdk-drag-animating[_ngcontent-%COMP%] {\n  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);\n}\n\n#output-expressions[_ngcontent-%COMP%] {\n  margin-left: 2em;\n}\n\ninput[type=text][_ngcontent-%COMP%], select[_ngcontent-%COMP%] {\n  height: 2rem;\n  font-size: 1rem;\n  width: 100%;\n  margin-bottom: 1rem;\n  box-sizing: border-box;\n  border: 1px solid #999;\n  background-color: white;\n  border-radius: 4px;\n  padding: 0 0.5em;\n}\n\nbutton[_ngcontent-%COMP%] {\n  height: 2.5rem;\n  border: none;\n  border-radius: 4px;\n  padding: 0 2em;\n  font-size: 1rem;\n}\n\n.arrow[_ngcontent-%COMP%] {\n  font-size: 1.6em;\n  padding-left: 0.5em;\n}\n\n.default[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n}\n\n.syntax[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.text-muted[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #555;\n  font-size: 0.8rem;\n}\n\n.copy[_ngcontent-%COMP%] {\n  margin-top: 1em;\n  flex: 0 0 3em;\n  border: none;\n  background: transparent;\n}\n\n  .mat-tooltip {\n  overflow-wrap: break-word;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhc2Utc3RhdGVtZW50cy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsVUFBVTtBQUNaOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFlBQVk7RUFDWixXQUFXO0VBQ1gseUJBQXlCO0VBQ3pCLFlBQVk7RUFDWixVQUFVO0FBQ1o7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsbUJBQW1CO0VBQ25CLG9CQUFvQjtBQUN0Qjs7QUFFQTtFQUNFLFdBQVcsc0JBQXNCLENBQUM7RUFDbEMsd0JBQXdCLFVBQVUsQ0FBQztFQUNuQyxxQkFBcUIsZUFBZSxDQUFDO0VBQ3JDLHNCQUFzQixVQUFVLENBQUM7QUFDbkM7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsd0NBQXdDO0VBQ3hDLDBCQUEwQjtFQUMxQixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLDhCQUE4QjtFQUM5QixzQkFBc0I7RUFDdEIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsWUFBWTtFQUNaLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0QixrQkFBa0I7RUFDbEI7O29DQUVrQztBQUNwQzs7QUFFQTtFQUNFLFVBQVU7QUFDWjs7QUFFQTtFQUNFLHNEQUFzRDtBQUN4RDs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixlQUFlO0VBQ2YsV0FBVztFQUNYLG1CQUFtQjtFQUNuQixzQkFBc0I7RUFDdEIsc0JBQXNCO0VBQ3RCLHVCQUF1QjtFQUN2QixrQkFBa0I7RUFDbEIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsY0FBYztFQUNkLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsY0FBYztFQUNkLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLGdCQUFnQjtFQUNoQix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxTQUFTO0VBQ1QsV0FBVztFQUNYLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixhQUFhO0VBQ2IsWUFBWTtFQUNaLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQiIsImZpbGUiOiJjYXNlLXN0YXRlbWVudHMuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIioge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG4uY2FzZS1yb3csIC5jYXNlLWhlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGZsZXgtd3JhcDogd3JhcDtcbn1cblxuLmNhc2UtaGVhZGVyID4gLmNhc2UtY29sdW1uLWxhYmVsIHtcbiAgcGFkZGluZy1sZWZ0OiAxLjZlbTtcbn1cblxuLmNhc2UtY29uZGl0aW9uLWNvbHVtbiA+IGlucHV0LCAuY2FzZS1vdXRwdXQtY29sdW1uIHNlbGVjdCB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDJyZW07XG4gIGZvbnQtc2l6ZTogMXJlbTtcbn1cblxuLmNhc2UtY29uZGl0aW9uLWNvbHVtbiwgLmNhc2Utb3V0cHV0LWNvbHVtbiB7XG4gIHBhZGRpbmc6IDAuNXJlbTtcbn1cblxuLmNhc2UtY29uZGl0aW9uLWNvbHVtbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXg6IDAgMCA1MCU7XG59XG5cbi5jb25kaXRpb24sIC5vdXRwdXQge1xuICBmbGV4LWdyb3c6IDEwMDtcbn1cblxuLmNhc2UtYWN0aW9ucy1jb2x1bW4ge1xuICBmbGV4OiBhdXRvO1xufVxuXG4uY2FzZS1vdXRwdXQtY29sdW1uIHtcbiAgZmxleDogMSAwIDQwJTtcbiAgbWluLXdpZHRoOiAwO1xufVxuXG4uY2FzZS1jb2x1bW4tYWN0aW9ucyBidXR0b24ge1xuICBoZWlnaHQ6IDJyZW07XG4gIHdpZHRoOiAycmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBkYXJrcmVkO1xuICBjb2xvcjogd2hpdGU7XG4gIHBhZGRpbmc6IDA7XG59XG5cbi5jYXNlLWNvbHVtbi1hY3Rpb25zIHtcbiAgZmxleDogMCAwIGF1dG87XG4gIHBhZGRpbmctdG9wOiAwLjVyZW07XG4gIHBhZGRpbmctbGVmdDogMC41cmVtO1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogOTc1cHgpIHtcbiAgLmNhc2Utcm93IHtmbGV4LWRpcmVjdGlvbjogY29sdW1uO31cbiAgLmNhc2UtY29uZGl0aW9uLWNvbHVtbiB7ZmxleDogMTAwJTt9XG4gIC5jYXNlLW91dHB1dC1jb2x1bW4ge2ZsZXg6IDIwIDAgMTBlbTt9XG4gIC5jYXNlLWFjdGlvbnMtY29sdW1uIHtmbGV4OiBhdXRvO31cbn1cblxuLmRyYWctY2FzZSB7XG4gIHBhZGRpbmc6IDAuNzVyZW0gMDtcbiAgYm9yZGVyLXRvcDogc29saWQgMXB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC44Nyk7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG59XG5cbi5oYW5kbGUge1xuICBjdXJzb3I6IG1vdmU7XG4gIG1hcmdpbi10b3A6IDAuNHJlbTtcbn1cblxuLmNkay1kcmFnLXByZXZpZXcge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJveC1zaGFkb3c6IDAgNXB4IDVweCAtM3B4IHJnYmEoMCwgMCwgMCwgMC4yKSxcbiAgMCA4cHggMTBweCAxcHggcmdiYSgwLCAwLCAwLCAwLjE0KSxcbiAgMCAzcHggMTRweCAycHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcbn1cblxuLmNkay1kcmFnLXBsYWNlaG9sZGVyIHtcbiAgb3BhY2l0eTogMDtcbn1cblxuLmNkay1kcmFnLWFuaW1hdGluZyB7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAyNTBtcyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKTtcbn1cblxuI291dHB1dC1leHByZXNzaW9ucyB7XG4gIG1hcmdpbi1sZWZ0OiAyZW07XG59XG5cbmlucHV0W3R5cGU9dGV4dF0sIHNlbGVjdCB7XG4gIGhlaWdodDogMnJlbTtcbiAgZm9udC1zaXplOiAxcmVtO1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgYm9yZGVyOiAxcHggc29saWQgIzk5OTtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgcGFkZGluZzogMCAwLjVlbTtcbn1cblxuYnV0dG9uIHtcbiAgaGVpZ2h0OiAyLjVyZW07XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBwYWRkaW5nOiAwIDJlbTtcbiAgZm9udC1zaXplOiAxcmVtO1xufVxuXG4uYXJyb3cge1xuICBmb250LXNpemU6IDEuNmVtO1xuICBwYWRkaW5nLWxlZnQ6IDAuNWVtO1xufVxuXG4uZGVmYXVsdCB7XG4gIG1hcmdpbi10b3A6IDAuNXJlbTtcbn1cblxuLnN5bnRheCB7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xufVxuXG4udGV4dC1tdXRlZCB7XG4gIG1hcmdpbjogMDtcbiAgY29sb3I6ICM1NTU7XG4gIGZvbnQtc2l6ZTogMC44cmVtO1xufVxuXG4uY29weSB7XG4gIG1hcmdpbi10b3A6IDFlbTtcbiAgZmxleDogMCAwIDNlbTtcbiAgYm9yZGVyOiBub25lO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbn1cblxuOjpuZy1kZWVwIC5tYXQtdG9vbHRpcCB7XG4gIG92ZXJmbG93LXdyYXA6IGJyZWFrLXdvcmQ7XG59XG4iXX0= */"] });
    return CaseStatementsComponent;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CaseStatementsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'lhc-case-statements',
                templateUrl: './case-statements.component.html',
                styleUrls: ['./case-statements.component.css']
            }]
    }], function () { return [{ type: _rule_editor_service__WEBPACK_IMPORTED_MODULE_4__["RuleEditorService"] }]; }, { lhcStyle: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], syntax: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], simpleExpression: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], expression: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], expressionChange: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], simpleChange: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "mBuv":
/*!******************************************************************************************!*\
  !*** ./projects/ng-rule-editor/src/lib/query-observation/query-observation.component.ts ***!
  \******************************************************************************************/
/*! exports provided: QueryObservationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryObservationComponent", function() { return QueryObservationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var autocomplete_lhc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! autocomplete-lhc */ "0QMv");
/* harmony import */ var autocomplete_lhc__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(autocomplete_lhc__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");






var _c0 = ["autoComplete"];
function QueryObservationComponent_div_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " x-fhir-query: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "pre", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", ctx_r1.lhcStyle);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("title", ctx_r1.expression);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r1.expression);
} }
var QueryObservationComponent = /** @class */ (function () {
    function QueryObservationComponent(http) {
        this.http = http;
        this.queryUrl = 'https://clinicaltables.nlm.nih.gov/api/loinc_items/v3/search?df=text,LOINC_NUM';
        this.lhcStyle = {};
    }
    QueryObservationComponent.prototype.ngOnInit = function () {
        if (this.variable !== undefined) {
            this.codes = (this.variable.codes !== undefined) ? this.variable.codes : [];
            this.timeInterval = this.variable.timeInterval || 1;
            this.timeIntervalUnit = this.variable.timeIntervalUnit || 'months';
            this.expression = this.variable.expression;
        }
        else {
            this.codes = [];
        }
    };
    /**
     * After the autocomplete is ready to be interacted with fetch the name for
     * any codes already in the query search.
     */
    QueryObservationComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.autoComplete = new autocomplete_lhc__WEBPACK_IMPORTED_MODULE_1___default.a.Autocompleter.Search(this.autoCompleteElement.nativeElement, this.queryUrl, {
            tableFormat: true,
            valueCols: [0, 1],
            colHeaders: ['Text', 'LOINC Number'],
            maxSelect: '*'
        });
        this.codes.forEach(function (code) {
            var matches = code.match(/http:\/\/loinc.org\|(.+)/);
            if (matches !== null) {
                var loincCode_1 = matches[1];
                // LOINC Code
                _this.http.get(_this.queryUrl + "&terms=" + loincCode_1)
                    .subscribe(function (data) {
                    var namePosition = 3;
                    var name = [data[namePosition][0][0], loincCode_1].join(' - ');
                    _this.autoComplete.storeSelectedItem(name, loincCode_1);
                    _this.autoComplete.addToSelectedArea(name);
                });
            }
            else {
                // Non-loinc code
                _this.autoComplete.storeSelectedItem(code, undefined);
                _this.autoComplete.addToSelectedArea(code);
            }
        });
        autocomplete_lhc__WEBPACK_IMPORTED_MODULE_1___default.a.Autocompleter.Event.observeListSelections("autocomplete-" + this.index, function () {
            var selectedItemData = _this.autoComplete.getSelectedItemData();
            // If there is no code then this is not a loinc code and we need to get
            // the value from the array above
            _this.codes = _this.autoComplete.getSelectedCodes().map(function (code, index) {
                return (code === undefined) ? selectedItemData[index].text : "http://loinc.org|" + code;
            });
            _this.onChange();
        });
    };
    /**
     * Angular lifecycle hook
     */
    QueryObservationComponent.prototype.ngOnDestroy = function () {
        if (this.autoComplete !== undefined) {
            this.autoComplete.destroy();
        }
    };
    /**
     * On changes update the expression and preview
     */
    QueryObservationComponent.prototype.onChange = function () {
        // Separate with URL encoded version of the comma: ','
        var codes = this.codes.join('%2C');
        this.variable.expression = this.expression =
            "Observation?code=" + codes + "&" +
                ("date=gt{{today()-" + this.timeInterval + " " + this.timeIntervalUnit + "}}&") +
                "patient={{%patient.id}}&_sort=-date&_count=1";
    };
    QueryObservationComponent.ɵfac = function QueryObservationComponent_Factory(t) { return new (t || QueryObservationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"])); };
    QueryObservationComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: QueryObservationComponent, selectors: [["lhc-query-observation"]], viewQuery: function QueryObservationComponent_Query(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
        } if (rf & 2) {
            var _t = void 0;
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.autoCompleteElement = _t.first);
        } }, inputs: { variable: "variable", index: "index", lhcStyle: "lhcStyle" }, decls: 17, vars: 10, consts: [[1, "form-inline", "query"], [1, "query-select"], ["placeholder", "LOINC Name / LOINC Number / Other Code", 1, "query-autocomplete", 3, "id"], ["autoComplete", ""], [1, "time-input"], ["aria-label", "Time interval", "type", "number", "min", "1", 3, "ngModel", "ngModelChange", "change"], [1, "time-select"], ["aria-label", "Time interval units", 3, "ngModel", "ngModelChange", "change"], ["value", "days"], ["value", "weeks"], ["value", "months"], ["value", "years"], ["class", "syntax-preview text-muted", 3, "ngStyle", 4, "ngIf"], [1, "syntax-preview", "text-muted", 3, "ngStyle"], [1, "d-inline", "text-muted", 3, "title"]], template: function QueryObservationComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "input", 2, 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "input", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function QueryObservationComponent_Template_input_ngModelChange_5_listener($event) { return ctx.timeInterval = $event; })("change", function QueryObservationComponent_Template_input_change_5_listener() { return ctx.onChange(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "select", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function QueryObservationComponent_Template_select_ngModelChange_7_listener($event) { return ctx.timeIntervalUnit = $event; })("change", function QueryObservationComponent_Template_select_change_7_listener() { return ctx.onChange(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "option", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Day(s)");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "option", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Week(s)");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "option", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Month(s)");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "option", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Year(s)");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, QueryObservationComponent_div_16_Template, 4, 3, "div", 12);
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMap"](ctx.lhcStyle.input);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("id", "autocomplete-", ctx.index, "");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMap"](ctx.lhcStyle.input);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.timeInterval);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMap"](ctx.lhcStyle.input);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.timeIntervalUnit);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.codes.length);
        } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["NumberValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["SelectControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵangular_packages_forms_forms_x"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgStyle"]], styles: [".query[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  flex-direction: row;\n}\n\n.detail[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n}\n\n.question-select[_ngcontent-%COMP%], .unit-select[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n  margin-bottom: 0.5rem;\n}\n\n.query-select[_ngcontent-%COMP%] {\n  flex: 1 0 6em;\n  padding-right: 0.5rem;\n}\n\n.time-input[_ngcontent-%COMP%], .time-select[_ngcontent-%COMP%] {\n  flex: 0 0 7em;\n  padding-left: 0.5rem;\n}\n\nselect[_ngcontent-%COMP%] {\n  width: 100%;\n  font-size: 1rem;\n  height: 2rem;\n}\n\n@media (max-width: 975px) {\n  .question[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .question-select[_ngcontent-%COMP%], .unit-select[_ngcontent-%COMP%] {\n    flex: 100%;\n    padding: 0;\n  }\n}\n\ninput[_ngcontent-%COMP%], select[_ngcontent-%COMP%] {\n  height: 2rem;\n  font-size: 1rem;\n  width: 100%;\n  margin-bottom: 0.5rem;\n  box-sizing: border-box;\n  border: 1px solid #999;\n  background-color: white;\n  border-radius: 4px;\n  padding: 0 0.5em;\n}\n\n.text-muted[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #555;\n  font-size: .8rem;\n}\n\n.syntax-preview[_ngcontent-%COMP%] {\n  margin-top: 1em;\n}\n\n.syntax-preview[_ngcontent-%COMP%]    > pre[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInF1ZXJ5LW9ic2VydmF0aW9uLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFhO0VBQ2IsZUFBZTtFQUNmLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0QixxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG9CQUFvQjtBQUN0Qjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxlQUFlO0VBQ2YsWUFBWTtBQUNkOztBQUVBO0VBQ0U7SUFDRSxzQkFBc0I7RUFDeEI7O0VBRUE7SUFDRSxVQUFVO0lBQ1YsVUFBVTtFQUNaO0FBQ0Y7O0FBRUE7RUFDRSxZQUFZO0VBQ1osZUFBZTtFQUNmLFdBQVc7RUFDWCxxQkFBcUI7RUFDckIsc0JBQXNCO0VBQ3RCLHNCQUFzQjtFQUN0Qix1QkFBdUI7RUFDdkIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFNBQVM7RUFDVCxXQUFXO0VBQ1gsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLG1CQUFtQjtFQUNuQixnQkFBZ0I7RUFDaEIsdUJBQXVCO0FBQ3pCIiwiZmlsZSI6InF1ZXJ5LW9ic2VydmF0aW9uLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucXVlcnkge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG59XG5cbi5kZXRhaWwge1xuICBtYXJnaW4tdG9wOiAwLjVyZW07XG59XG5cbi5xdWVzdGlvbi1zZWxlY3QsIC51bml0LXNlbGVjdCB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcbn1cblxuLnF1ZXJ5LXNlbGVjdCB7XG4gIGZsZXg6IDEgMCA2ZW07XG4gIHBhZGRpbmctcmlnaHQ6IDAuNXJlbTtcbn1cblxuLnRpbWUtaW5wdXQsIC50aW1lLXNlbGVjdCB7XG4gIGZsZXg6IDAgMCA3ZW07XG4gIHBhZGRpbmctbGVmdDogMC41cmVtO1xufVxuXG5zZWxlY3Qge1xuICB3aWR0aDogMTAwJTtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBoZWlnaHQ6IDJyZW07XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA5NzVweCkge1xuICAucXVlc3Rpb24ge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIH1cblxuICAucXVlc3Rpb24tc2VsZWN0LCAudW5pdC1zZWxlY3Qge1xuICAgIGZsZXg6IDEwMCU7XG4gICAgcGFkZGluZzogMDtcbiAgfVxufVxuXG5pbnB1dCwgc2VsZWN0IHtcbiAgaGVpZ2h0OiAycmVtO1xuICBmb250LXNpemU6IDFyZW07XG4gIHdpZHRoOiAxMDAlO1xuICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGJvcmRlcjogMXB4IHNvbGlkICM5OTk7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIHBhZGRpbmc6IDAgMC41ZW07XG59XG5cbi50ZXh0LW11dGVkIHtcbiAgbWFyZ2luOiAwO1xuICBjb2xvcjogIzU1NTtcbiAgZm9udC1zaXplOiAuOHJlbTtcbn1cblxuLnN5bnRheC1wcmV2aWV3IHtcbiAgbWFyZ2luLXRvcDogMWVtO1xufVxuXG4uc3ludGF4LXByZXZpZXcgPiBwcmUge1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbn1cbiJdfQ== */"] });
    return QueryObservationComponent;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](QueryObservationComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'lhc-query-observation',
                templateUrl: './query-observation.component.html',
                styleUrls: ['./query-observation.component.css']
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }]; }, { variable: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], index: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], lhcStyle: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], autoCompleteElement: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['autoComplete']
        }] }); })();


/***/ }),

/***/ "mzme":
/*!************************************************************************************!*\
  !*** ./projects/ng-rule-editor/src/lib/syntax-preview/syntax-preview.component.ts ***!
  \************************************************************************************/
/*! exports provided: SyntaxPreviewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SyntaxPreviewComponent", function() { return SyntaxPreviewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/snack-bar */ "dNgK");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/tooltip */ "Qu3c");
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/clipboard */ "UXJo");






function SyntaxPreviewComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " FHIRPath: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "pre", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SyntaxPreviewComponent_div_0_Template_button_click_5_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r1.copyNotification(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "svg", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "path", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "path", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", ctx_r0.lhcStyle);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("matTooltip", ctx_r0.syntax);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("      ", ctx_r0.syntax, "\n    ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("cdkCopyToClipboard", ctx_r0.syntax);
} }
var SyntaxPreviewComponent = /** @class */ (function () {
    function SyntaxPreviewComponent(snackBar) {
        this.snackBar = snackBar;
        this.showWhenEmpty = false;
    }
    SyntaxPreviewComponent.prototype.ngOnInit = function () {
    };
    /**
     * Show an ephemeral notification that the value was copied.
     */
    SyntaxPreviewComponent.prototype.copyNotification = function () {
        this.snackBar.open('Copied to clipboard', null, {
            duration: 2000
        });
    };
    SyntaxPreviewComponent.ɵfac = function SyntaxPreviewComponent_Factory(t) { return new (t || SyntaxPreviewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_1__["MatSnackBar"])); };
    SyntaxPreviewComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SyntaxPreviewComponent, selectors: [["lhc-syntax-preview"]], inputs: { syntax: "syntax", lhcStyle: "lhcStyle", showWhenEmpty: "showWhenEmpty" }, decls: 1, vars: 1, consts: [["class", "text-muted syntax-preview", 3, "ngStyle", 4, "ngIf"], [1, "text-muted", "syntax-preview", 3, "ngStyle"], [1, "fhirpath"], [1, "d-inline", "text-muted", "syntax", 3, "matTooltip"], ["matTooltip", "Copy to clipboard", "aria-label", "Copy to clipboard", 1, "copy", 3, "cdkCopyToClipboard", "click"], ["xmlns", "http://www.w3.org/2000/svg", "height", "16px", "viewBox", "0 0 24 24", "width", "24px", "fill", "#000000"], ["d", "M0 0h24v24H0V0z", "fill", "none"], ["d", "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"]], template: function SyntaxPreviewComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, SyntaxPreviewComponent_div_0_Template, 9, 4, "div", 0);
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.syntax || ctx.showWhenEmpty);
        } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgStyle"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_3__["MatTooltip"], _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_4__["CdkCopyToClipboard"]], styles: ["[_nghost-%COMP%] {\n  overflow: hidden;\n}\n\n.syntax[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.text-muted[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #555;\n  font-size: 0.8rem;\n}\n\n.syntax-preview[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n}\n\n.fhirpath[_ngcontent-%COMP%] {\n  flex: 1 0 10em;\n  min-width: 0;\n  padding-right: 1em;\n}\n\n.copy[_ngcontent-%COMP%] {\n  margin-top: 1em;\n  flex: 0 0 3em;\n  border: none;\n  background: transparent;\n}\n\n  .mat-tooltip {\n  overflow-wrap: break-word;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN5bnRheC1wcmV2aWV3LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsZ0JBQWdCO0VBQ2hCLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLFNBQVM7RUFDVCxXQUFXO0VBQ1gsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsYUFBYTtFQUNiLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxZQUFZO0VBQ1osa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGFBQWE7RUFDYixZQUFZO0VBQ1osdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCIiwiZmlsZSI6InN5bnRheC1wcmV2aWV3LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi5zeW50YXgge1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbn1cblxuLnRleHQtbXV0ZWQge1xuICBtYXJnaW46IDA7XG4gIGNvbG9yOiAjNTU1O1xuICBmb250LXNpemU6IDAuOHJlbTtcbn1cblxuLnN5bnRheC1wcmV2aWV3IHtcbiAgZGlzcGxheTogZmxleDtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5maGlycGF0aCB7XG4gIGZsZXg6IDEgMCAxMGVtO1xuICBtaW4td2lkdGg6IDA7XG4gIHBhZGRpbmctcmlnaHQ6IDFlbTtcbn1cblxuLmNvcHkge1xuICBtYXJnaW4tdG9wOiAxZW07XG4gIGZsZXg6IDAgMCAzZW07XG4gIGJvcmRlcjogbm9uZTtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG59XG5cbjo6bmctZGVlcCAubWF0LXRvb2x0aXAge1xuICBvdmVyZmxvdy13cmFwOiBicmVhay13b3JkO1xufVxuIl19 */"] });
    return SyntaxPreviewComponent;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SyntaxPreviewComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'lhc-syntax-preview',
                templateUrl: './syntax-preview.component.html',
                styleUrls: ['./syntax-preview.component.css']
            }]
    }], function () { return [{ type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_1__["MatSnackBar"] }]; }, { syntax: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], lhcStyle: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], showWhenEmpty: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "pB9l":
/*!******************************************!*\
  !*** ./projects/rule-editor/src/main.ts ***!
  \******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "YszZ");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "3WTK");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map