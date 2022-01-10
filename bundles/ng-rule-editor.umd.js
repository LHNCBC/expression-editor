(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('tslib'), require('@angular/core'), require('@angular/common'), require('@angular/cdk/a11y'), require('@angular/cdk/drag-drop'), require('@angular/cdk/clipboard'), require('@angular/material/tooltip'), require('@angular/material/radio'), require('@angular/animations'), require('@angular/animations/browser'), require('@angular/material/snack-bar'), require('autocomplete-lhc'), require('@angular/common/http')) :
    typeof define === 'function' && define.amd ? define('ng-rule-editor', ['exports', 'tslib', '@angular/core', '@angular/common', '@angular/cdk/a11y', '@angular/cdk/drag-drop', '@angular/cdk/clipboard', '@angular/material/tooltip', '@angular/material/radio', '@angular/animations', '@angular/animations/browser', '@angular/material/snack-bar', 'autocomplete-lhc', '@angular/common/http'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["ng-rule-editor"] = {}, global.tslib, global.ng.core, global.ng.common, global.ng.cdk.a11y, global.ng.cdk.dragDrop, global.ng.cdk.clipboard, global.ng.material.tooltip, global.ng.material.radio, global.ng.animations, global.ng.animations.browser, global.ng.material.snackBar, global.Def, global.ng.common.http));
})(this, (function (exports, tslib_1, i0, common, a11y, dragDrop, clipboard, tooltip, radio, animations, browser, snackBar, Def, http) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var tslib_1__namespace = /*#__PURE__*/_interopNamespace(tslib_1);
    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var Def__default = /*#__PURE__*/_interopDefaultLegacy(Def);

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    function isFunction(x) {
        return typeof x === 'function';
    }

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    var _enable_super_gross_mode_that_will_cause_bad_things = false;
    var config = {
        Promise: undefined,
        set useDeprecatedSynchronousErrorHandling(value) {
            if (value) {
                var error = /*@__PURE__*/ new Error();
                /*@__PURE__*/ console.warn('DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' + error.stack);
            }
            else if (_enable_super_gross_mode_that_will_cause_bad_things) {
                /*@__PURE__*/ console.log('RxJS: Back to a better error behavior. Thank you. <3');
            }
            _enable_super_gross_mode_that_will_cause_bad_things = value;
        },
        get useDeprecatedSynchronousErrorHandling() {
            return _enable_super_gross_mode_that_will_cause_bad_things;
        },
    };

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    function hostReportError(err) {
        setTimeout(function () { throw err; }, 0);
    }

    /** PURE_IMPORTS_START _config,_util_hostReportError PURE_IMPORTS_END */
    var empty$1 = {
        closed: true,
        next: function (value) { },
        error: function (err) {
            if (config.useDeprecatedSynchronousErrorHandling) {
                throw err;
            }
            else {
                hostReportError(err);
            }
        },
        complete: function () { }
    };

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    var isArray$1 = /*@__PURE__*/ (function () { return Array.isArray || (function (x) { return x && typeof x.length === 'number'; }); })();

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    function isObject(x) {
        return x !== null && typeof x === 'object';
    }

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    var UnsubscriptionErrorImpl = /*@__PURE__*/ (function () {
        function UnsubscriptionErrorImpl(errors) {
            Error.call(this);
            this.message = errors ?
                errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ') : '';
            this.name = 'UnsubscriptionError';
            this.errors = errors;
            return this;
        }
        UnsubscriptionErrorImpl.prototype = /*@__PURE__*/ Object.create(Error.prototype);
        return UnsubscriptionErrorImpl;
    })();
    var UnsubscriptionError = UnsubscriptionErrorImpl;

    /** PURE_IMPORTS_START _util_isArray,_util_isObject,_util_isFunction,_util_UnsubscriptionError PURE_IMPORTS_END */
    var Subscription = /*@__PURE__*/ (function () {
        function Subscription(unsubscribe) {
            this.closed = false;
            this._parentOrParents = null;
            this._subscriptions = null;
            if (unsubscribe) {
                this._ctorUnsubscribe = true;
                this._unsubscribe = unsubscribe;
            }
        }
        Subscription.prototype.unsubscribe = function () {
            var errors;
            if (this.closed) {
                return;
            }
            var _a = this, _parentOrParents = _a._parentOrParents, _ctorUnsubscribe = _a._ctorUnsubscribe, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
            this.closed = true;
            this._parentOrParents = null;
            this._subscriptions = null;
            if (_parentOrParents instanceof Subscription) {
                _parentOrParents.remove(this);
            }
            else if (_parentOrParents !== null) {
                for (var index = 0; index < _parentOrParents.length; ++index) {
                    var parent_1 = _parentOrParents[index];
                    parent_1.remove(this);
                }
            }
            if (isFunction(_unsubscribe)) {
                if (_ctorUnsubscribe) {
                    this._unsubscribe = undefined;
                }
                try {
                    _unsubscribe.call(this);
                }
                catch (e) {
                    errors = e instanceof UnsubscriptionError ? flattenUnsubscriptionErrors(e.errors) : [e];
                }
            }
            if (isArray$1(_subscriptions)) {
                var index = -1;
                var len = _subscriptions.length;
                while (++index < len) {
                    var sub = _subscriptions[index];
                    if (isObject(sub)) {
                        try {
                            sub.unsubscribe();
                        }
                        catch (e) {
                            errors = errors || [];
                            if (e instanceof UnsubscriptionError) {
                                errors = errors.concat(flattenUnsubscriptionErrors(e.errors));
                            }
                            else {
                                errors.push(e);
                            }
                        }
                    }
                }
            }
            if (errors) {
                throw new UnsubscriptionError(errors);
            }
        };
        Subscription.prototype.add = function (teardown) {
            var subscription = teardown;
            if (!teardown) {
                return Subscription.EMPTY;
            }
            switch (typeof teardown) {
                case 'function':
                    subscription = new Subscription(teardown);
                case 'object':
                    if (subscription === this || subscription.closed || typeof subscription.unsubscribe !== 'function') {
                        return subscription;
                    }
                    else if (this.closed) {
                        subscription.unsubscribe();
                        return subscription;
                    }
                    else if (!(subscription instanceof Subscription)) {
                        var tmp = subscription;
                        subscription = new Subscription();
                        subscription._subscriptions = [tmp];
                    }
                    break;
                default: {
                    throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
                }
            }
            var _parentOrParents = subscription._parentOrParents;
            if (_parentOrParents === null) {
                subscription._parentOrParents = this;
            }
            else if (_parentOrParents instanceof Subscription) {
                if (_parentOrParents === this) {
                    return subscription;
                }
                subscription._parentOrParents = [_parentOrParents, this];
            }
            else if (_parentOrParents.indexOf(this) === -1) {
                _parentOrParents.push(this);
            }
            else {
                return subscription;
            }
            var subscriptions = this._subscriptions;
            if (subscriptions === null) {
                this._subscriptions = [subscription];
            }
            else {
                subscriptions.push(subscription);
            }
            return subscription;
        };
        Subscription.prototype.remove = function (subscription) {
            var subscriptions = this._subscriptions;
            if (subscriptions) {
                var subscriptionIndex = subscriptions.indexOf(subscription);
                if (subscriptionIndex !== -1) {
                    subscriptions.splice(subscriptionIndex, 1);
                }
            }
        };
        Subscription.EMPTY = (function (empty) {
            empty.closed = true;
            return empty;
        }(new Subscription()));
        return Subscription;
    }());
    function flattenUnsubscriptionErrors(errors) {
        return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError) ? err.errors : err); }, []);
    }

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    var rxSubscriber = /*@__PURE__*/ (function () {
        return typeof Symbol === 'function'
            ? /*@__PURE__*/ Symbol('rxSubscriber')
            : '@@rxSubscriber_' + /*@__PURE__*/ Math.random();
    })();
    var $$rxSubscriber = rxSubscriber;

    /** PURE_IMPORTS_START tslib,_util_isFunction,_Observer,_Subscription,_internal_symbol_rxSubscriber,_config,_util_hostReportError PURE_IMPORTS_END */
    var Subscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(Subscriber, _super);
        function Subscriber(destinationOrNext, error, complete) {
            var _this = _super.call(this) || this;
            _this.syncErrorValue = null;
            _this.syncErrorThrown = false;
            _this.syncErrorThrowable = false;
            _this.isStopped = false;
            switch (arguments.length) {
                case 0:
                    _this.destination = empty$1;
                    break;
                case 1:
                    if (!destinationOrNext) {
                        _this.destination = empty$1;
                        break;
                    }
                    if (typeof destinationOrNext === 'object') {
                        if (destinationOrNext instanceof Subscriber) {
                            _this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
                            _this.destination = destinationOrNext;
                            destinationOrNext.add(_this);
                        }
                        else {
                            _this.syncErrorThrowable = true;
                            _this.destination = new SafeSubscriber(_this, destinationOrNext);
                        }
                        break;
                    }
                default:
                    _this.syncErrorThrowable = true;
                    _this.destination = new SafeSubscriber(_this, destinationOrNext, error, complete);
                    break;
            }
            return _this;
        }
        Subscriber.prototype[rxSubscriber] = function () { return this; };
        Subscriber.create = function (next, error, complete) {
            var subscriber = new Subscriber(next, error, complete);
            subscriber.syncErrorThrowable = false;
            return subscriber;
        };
        Subscriber.prototype.next = function (value) {
            if (!this.isStopped) {
                this._next(value);
            }
        };
        Subscriber.prototype.error = function (err) {
            if (!this.isStopped) {
                this.isStopped = true;
                this._error(err);
            }
        };
        Subscriber.prototype.complete = function () {
            if (!this.isStopped) {
                this.isStopped = true;
                this._complete();
            }
        };
        Subscriber.prototype.unsubscribe = function () {
            if (this.closed) {
                return;
            }
            this.isStopped = true;
            _super.prototype.unsubscribe.call(this);
        };
        Subscriber.prototype._next = function (value) {
            this.destination.next(value);
        };
        Subscriber.prototype._error = function (err) {
            this.destination.error(err);
            this.unsubscribe();
        };
        Subscriber.prototype._complete = function () {
            this.destination.complete();
            this.unsubscribe();
        };
        Subscriber.prototype._unsubscribeAndRecycle = function () {
            var _parentOrParents = this._parentOrParents;
            this._parentOrParents = null;
            this.unsubscribe();
            this.closed = false;
            this.isStopped = false;
            this._parentOrParents = _parentOrParents;
            return this;
        };
        return Subscriber;
    }(Subscription));
    var SafeSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(SafeSubscriber, _super);
        function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
            var _this = _super.call(this) || this;
            _this._parentSubscriber = _parentSubscriber;
            var next;
            var context = _this;
            if (isFunction(observerOrNext)) {
                next = observerOrNext;
            }
            else if (observerOrNext) {
                next = observerOrNext.next;
                error = observerOrNext.error;
                complete = observerOrNext.complete;
                if (observerOrNext !== empty$1) {
                    context = Object.create(observerOrNext);
                    if (isFunction(context.unsubscribe)) {
                        _this.add(context.unsubscribe.bind(context));
                    }
                    context.unsubscribe = _this.unsubscribe.bind(_this);
                }
            }
            _this._context = context;
            _this._next = next;
            _this._error = error;
            _this._complete = complete;
            return _this;
        }
        SafeSubscriber.prototype.next = function (value) {
            if (!this.isStopped && this._next) {
                var _parentSubscriber = this._parentSubscriber;
                if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._next, value);
                }
                else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                    this.unsubscribe();
                }
            }
        };
        SafeSubscriber.prototype.error = function (err) {
            if (!this.isStopped) {
                var _parentSubscriber = this._parentSubscriber;
                var useDeprecatedSynchronousErrorHandling = config.useDeprecatedSynchronousErrorHandling;
                if (this._error) {
                    if (!useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                        this.__tryOrUnsub(this._error, err);
                        this.unsubscribe();
                    }
                    else {
                        this.__tryOrSetError(_parentSubscriber, this._error, err);
                        this.unsubscribe();
                    }
                }
                else if (!_parentSubscriber.syncErrorThrowable) {
                    this.unsubscribe();
                    if (useDeprecatedSynchronousErrorHandling) {
                        throw err;
                    }
                    hostReportError(err);
                }
                else {
                    if (useDeprecatedSynchronousErrorHandling) {
                        _parentSubscriber.syncErrorValue = err;
                        _parentSubscriber.syncErrorThrown = true;
                    }
                    else {
                        hostReportError(err);
                    }
                    this.unsubscribe();
                }
            }
        };
        SafeSubscriber.prototype.complete = function () {
            var _this = this;
            if (!this.isStopped) {
                var _parentSubscriber = this._parentSubscriber;
                if (this._complete) {
                    var wrappedComplete = function () { return _this._complete.call(_this._context); };
                    if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                        this.__tryOrUnsub(wrappedComplete);
                        this.unsubscribe();
                    }
                    else {
                        this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                        this.unsubscribe();
                    }
                }
                else {
                    this.unsubscribe();
                }
            }
        };
        SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
            try {
                fn.call(this._context, value);
            }
            catch (err) {
                this.unsubscribe();
                if (config.useDeprecatedSynchronousErrorHandling) {
                    throw err;
                }
                else {
                    hostReportError(err);
                }
            }
        };
        SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
            if (!config.useDeprecatedSynchronousErrorHandling) {
                throw new Error('bad call');
            }
            try {
                fn.call(this._context, value);
            }
            catch (err) {
                if (config.useDeprecatedSynchronousErrorHandling) {
                    parent.syncErrorValue = err;
                    parent.syncErrorThrown = true;
                    return true;
                }
                else {
                    hostReportError(err);
                    return true;
                }
            }
            return false;
        };
        SafeSubscriber.prototype._unsubscribe = function () {
            var _parentSubscriber = this._parentSubscriber;
            this._context = null;
            this._parentSubscriber = null;
            _parentSubscriber.unsubscribe();
        };
        return SafeSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START _Subscriber PURE_IMPORTS_END */
    function canReportError(observer) {
        while (observer) {
            var _a = observer, closed_1 = _a.closed, destination = _a.destination, isStopped = _a.isStopped;
            if (closed_1 || isStopped) {
                return false;
            }
            else if (destination && destination instanceof Subscriber) {
                observer = destination;
            }
            else {
                observer = null;
            }
        }
        return true;
    }

    /** PURE_IMPORTS_START _Subscriber,_symbol_rxSubscriber,_Observer PURE_IMPORTS_END */
    function toSubscriber(nextOrObserver, error, complete) {
        if (nextOrObserver) {
            if (nextOrObserver instanceof Subscriber) {
                return nextOrObserver;
            }
            if (nextOrObserver[rxSubscriber]) {
                return nextOrObserver[rxSubscriber]();
            }
        }
        if (!nextOrObserver && !error && !complete) {
            return new Subscriber(empty$1);
        }
        return new Subscriber(nextOrObserver, error, complete);
    }

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    var observable = /*@__PURE__*/ (function () { return typeof Symbol === 'function' && Symbol.observable || '@@observable'; })();

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    function identity(x) {
        return x;
    }

    /** PURE_IMPORTS_START _identity PURE_IMPORTS_END */
    function pipe() {
        var fns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fns[_i] = arguments[_i];
        }
        return pipeFromArray(fns);
    }
    function pipeFromArray(fns) {
        if (fns.length === 0) {
            return identity;
        }
        if (fns.length === 1) {
            return fns[0];
        }
        return function piped(input) {
            return fns.reduce(function (prev, fn) { return fn(prev); }, input);
        };
    }

    /** PURE_IMPORTS_START _util_canReportError,_util_toSubscriber,_symbol_observable,_util_pipe,_config PURE_IMPORTS_END */
    var Observable = /*@__PURE__*/ (function () {
        function Observable(subscribe) {
            this._isScalar = false;
            if (subscribe) {
                this._subscribe = subscribe;
            }
        }
        Observable.prototype.lift = function (operator) {
            var observable = new Observable();
            observable.source = this;
            observable.operator = operator;
            return observable;
        };
        Observable.prototype.subscribe = function (observerOrNext, error, complete) {
            var operator = this.operator;
            var sink = toSubscriber(observerOrNext, error, complete);
            if (operator) {
                sink.add(operator.call(sink, this.source));
            }
            else {
                sink.add(this.source || (config.useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable) ?
                    this._subscribe(sink) :
                    this._trySubscribe(sink));
            }
            if (config.useDeprecatedSynchronousErrorHandling) {
                if (sink.syncErrorThrowable) {
                    sink.syncErrorThrowable = false;
                    if (sink.syncErrorThrown) {
                        throw sink.syncErrorValue;
                    }
                }
            }
            return sink;
        };
        Observable.prototype._trySubscribe = function (sink) {
            try {
                return this._subscribe(sink);
            }
            catch (err) {
                if (config.useDeprecatedSynchronousErrorHandling) {
                    sink.syncErrorThrown = true;
                    sink.syncErrorValue = err;
                }
                if (canReportError(sink)) {
                    sink.error(err);
                }
                else {
                    console.warn(err);
                }
            }
        };
        Observable.prototype.forEach = function (next, promiseCtor) {
            var _this = this;
            promiseCtor = getPromiseCtor(promiseCtor);
            return new promiseCtor(function (resolve, reject) {
                var subscription;
                subscription = _this.subscribe(function (value) {
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        if (subscription) {
                            subscription.unsubscribe();
                        }
                    }
                }, reject, resolve);
            });
        };
        Observable.prototype._subscribe = function (subscriber) {
            var source = this.source;
            return source && source.subscribe(subscriber);
        };
        Observable.prototype[observable] = function () {
            return this;
        };
        Observable.prototype.pipe = function () {
            var operations = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                operations[_i] = arguments[_i];
            }
            if (operations.length === 0) {
                return this;
            }
            return pipeFromArray(operations)(this);
        };
        Observable.prototype.toPromise = function (promiseCtor) {
            var _this = this;
            promiseCtor = getPromiseCtor(promiseCtor);
            return new promiseCtor(function (resolve, reject) {
                var value;
                _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
            });
        };
        Observable.create = function (subscribe) {
            return new Observable(subscribe);
        };
        return Observable;
    }());
    function getPromiseCtor(promiseCtor) {
        if (!promiseCtor) {
            promiseCtor = config.Promise || Promise;
        }
        if (!promiseCtor) {
            throw new Error('no Promise impl found');
        }
        return promiseCtor;
    }

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    var ObjectUnsubscribedErrorImpl = /*@__PURE__*/ (function () {
        function ObjectUnsubscribedErrorImpl() {
            Error.call(this);
            this.message = 'object unsubscribed';
            this.name = 'ObjectUnsubscribedError';
            return this;
        }
        ObjectUnsubscribedErrorImpl.prototype = /*@__PURE__*/ Object.create(Error.prototype);
        return ObjectUnsubscribedErrorImpl;
    })();
    var ObjectUnsubscribedError = ObjectUnsubscribedErrorImpl;

    /** PURE_IMPORTS_START tslib,_Subscription PURE_IMPORTS_END */
    var SubjectSubscription = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(SubjectSubscription, _super);
        function SubjectSubscription(subject, subscriber) {
            var _this = _super.call(this) || this;
            _this.subject = subject;
            _this.subscriber = subscriber;
            _this.closed = false;
            return _this;
        }
        SubjectSubscription.prototype.unsubscribe = function () {
            if (this.closed) {
                return;
            }
            this.closed = true;
            var subject = this.subject;
            var observers = subject.observers;
            this.subject = null;
            if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
                return;
            }
            var subscriberIndex = observers.indexOf(this.subscriber);
            if (subscriberIndex !== -1) {
                observers.splice(subscriberIndex, 1);
            }
        };
        return SubjectSubscription;
    }(Subscription));

    /** PURE_IMPORTS_START tslib,_Observable,_Subscriber,_Subscription,_util_ObjectUnsubscribedError,_SubjectSubscription,_internal_symbol_rxSubscriber PURE_IMPORTS_END */
    var SubjectSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(SubjectSubscriber, _super);
        function SubjectSubscriber(destination) {
            var _this = _super.call(this, destination) || this;
            _this.destination = destination;
            return _this;
        }
        return SubjectSubscriber;
    }(Subscriber));
    var Subject = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(Subject, _super);
        function Subject() {
            var _this = _super.call(this) || this;
            _this.observers = [];
            _this.closed = false;
            _this.isStopped = false;
            _this.hasError = false;
            _this.thrownError = null;
            return _this;
        }
        Subject.prototype[rxSubscriber] = function () {
            return new SubjectSubscriber(this);
        };
        Subject.prototype.lift = function (operator) {
            var subject = new AnonymousSubject(this, this);
            subject.operator = operator;
            return subject;
        };
        Subject.prototype.next = function (value) {
            if (this.closed) {
                throw new ObjectUnsubscribedError();
            }
            if (!this.isStopped) {
                var observers = this.observers;
                var len = observers.length;
                var copy = observers.slice();
                for (var i = 0; i < len; i++) {
                    copy[i].next(value);
                }
            }
        };
        Subject.prototype.error = function (err) {
            if (this.closed) {
                throw new ObjectUnsubscribedError();
            }
            this.hasError = true;
            this.thrownError = err;
            this.isStopped = true;
            var observers = this.observers;
            var len = observers.length;
            var copy = observers.slice();
            for (var i = 0; i < len; i++) {
                copy[i].error(err);
            }
            this.observers.length = 0;
        };
        Subject.prototype.complete = function () {
            if (this.closed) {
                throw new ObjectUnsubscribedError();
            }
            this.isStopped = true;
            var observers = this.observers;
            var len = observers.length;
            var copy = observers.slice();
            for (var i = 0; i < len; i++) {
                copy[i].complete();
            }
            this.observers.length = 0;
        };
        Subject.prototype.unsubscribe = function () {
            this.isStopped = true;
            this.closed = true;
            this.observers = null;
        };
        Subject.prototype._trySubscribe = function (subscriber) {
            if (this.closed) {
                throw new ObjectUnsubscribedError();
            }
            else {
                return _super.prototype._trySubscribe.call(this, subscriber);
            }
        };
        Subject.prototype._subscribe = function (subscriber) {
            if (this.closed) {
                throw new ObjectUnsubscribedError();
            }
            else if (this.hasError) {
                subscriber.error(this.thrownError);
                return Subscription.EMPTY;
            }
            else if (this.isStopped) {
                subscriber.complete();
                return Subscription.EMPTY;
            }
            else {
                this.observers.push(subscriber);
                return new SubjectSubscription(this, subscriber);
            }
        };
        Subject.prototype.asObservable = function () {
            var observable = new Observable();
            observable.source = this;
            return observable;
        };
        Subject.create = function (destination, source) {
            return new AnonymousSubject(destination, source);
        };
        return Subject;
    }(Observable));
    var AnonymousSubject = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(AnonymousSubject, _super);
        function AnonymousSubject(destination, source) {
            var _this = _super.call(this) || this;
            _this.destination = destination;
            _this.source = source;
            return _this;
        }
        AnonymousSubject.prototype.next = function (value) {
            var destination = this.destination;
            if (destination && destination.next) {
                destination.next(value);
            }
        };
        AnonymousSubject.prototype.error = function (err) {
            var destination = this.destination;
            if (destination && destination.error) {
                this.destination.error(err);
            }
        };
        AnonymousSubject.prototype.complete = function () {
            var destination = this.destination;
            if (destination && destination.complete) {
                this.destination.complete();
            }
        };
        AnonymousSubject.prototype._subscribe = function (subscriber) {
            var source = this.source;
            if (source) {
                return this.source.subscribe(subscriber);
            }
            else {
                return Subscription.EMPTY;
            }
        };
        return AnonymousSubject;
    }(Subject));

    /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
    function refCount() {
        return function refCountOperatorFunction(source) {
            return source.lift(new RefCountOperator$1(source));
        };
    }
    var RefCountOperator$1 = /*@__PURE__*/ (function () {
        function RefCountOperator(connectable) {
            this.connectable = connectable;
        }
        RefCountOperator.prototype.call = function (subscriber, source) {
            var connectable = this.connectable;
            connectable._refCount++;
            var refCounter = new RefCountSubscriber$1(subscriber, connectable);
            var subscription = source.subscribe(refCounter);
            if (!refCounter.closed) {
                refCounter.connection = connectable.connect();
            }
            return subscription;
        };
        return RefCountOperator;
    }());
    var RefCountSubscriber$1 = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(RefCountSubscriber, _super);
        function RefCountSubscriber(destination, connectable) {
            var _this = _super.call(this, destination) || this;
            _this.connectable = connectable;
            return _this;
        }
        RefCountSubscriber.prototype._unsubscribe = function () {
            var connectable = this.connectable;
            if (!connectable) {
                this.connection = null;
                return;
            }
            this.connectable = null;
            var refCount = connectable._refCount;
            if (refCount <= 0) {
                this.connection = null;
                return;
            }
            connectable._refCount = refCount - 1;
            if (refCount > 1) {
                this.connection = null;
                return;
            }
            var connection = this.connection;
            var sharedConnection = connectable._connection;
            this.connection = null;
            if (sharedConnection && (!connection || sharedConnection === connection)) {
                sharedConnection.unsubscribe();
            }
        };
        return RefCountSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START tslib,_Subject,_Observable,_Subscriber,_Subscription,_operators_refCount PURE_IMPORTS_END */
    var ConnectableObservable = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(ConnectableObservable, _super);
        function ConnectableObservable(source, subjectFactory) {
            var _this = _super.call(this) || this;
            _this.source = source;
            _this.subjectFactory = subjectFactory;
            _this._refCount = 0;
            _this._isComplete = false;
            return _this;
        }
        ConnectableObservable.prototype._subscribe = function (subscriber) {
            return this.getSubject().subscribe(subscriber);
        };
        ConnectableObservable.prototype.getSubject = function () {
            var subject = this._subject;
            if (!subject || subject.isStopped) {
                this._subject = this.subjectFactory();
            }
            return this._subject;
        };
        ConnectableObservable.prototype.connect = function () {
            var connection = this._connection;
            if (!connection) {
                this._isComplete = false;
                connection = this._connection = new Subscription();
                connection.add(this.source
                    .subscribe(new ConnectableSubscriber(this.getSubject(), this)));
                if (connection.closed) {
                    this._connection = null;
                    connection = Subscription.EMPTY;
                }
            }
            return connection;
        };
        ConnectableObservable.prototype.refCount = function () {
            return refCount()(this);
        };
        return ConnectableObservable;
    }(Observable));
    var connectableObservableDescriptor = /*@__PURE__*/ (function () {
        var connectableProto = ConnectableObservable.prototype;
        return {
            operator: { value: null },
            _refCount: { value: 0, writable: true },
            _subject: { value: null, writable: true },
            _connection: { value: null, writable: true },
            _subscribe: { value: connectableProto._subscribe },
            _isComplete: { value: connectableProto._isComplete, writable: true },
            getSubject: { value: connectableProto.getSubject },
            connect: { value: connectableProto.connect },
            refCount: { value: connectableProto.refCount }
        };
    })();
    var ConnectableSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(ConnectableSubscriber, _super);
        function ConnectableSubscriber(destination, connectable) {
            var _this = _super.call(this, destination) || this;
            _this.connectable = connectable;
            return _this;
        }
        ConnectableSubscriber.prototype._error = function (err) {
            this._unsubscribe();
            _super.prototype._error.call(this, err);
        };
        ConnectableSubscriber.prototype._complete = function () {
            this.connectable._isComplete = true;
            this._unsubscribe();
            _super.prototype._complete.call(this);
        };
        ConnectableSubscriber.prototype._unsubscribe = function () {
            var connectable = this.connectable;
            if (connectable) {
                this.connectable = null;
                var connection = connectable._connection;
                connectable._refCount = 0;
                connectable._subject = null;
                connectable._connection = null;
                if (connection) {
                    connection.unsubscribe();
                }
            }
        };
        return ConnectableSubscriber;
    }(SubjectSubscriber));
    var RefCountOperator = /*@__PURE__*/ (function () {
        function RefCountOperator(connectable) {
            this.connectable = connectable;
        }
        RefCountOperator.prototype.call = function (subscriber, source) {
            var connectable = this.connectable;
            connectable._refCount++;
            var refCounter = new RefCountSubscriber(subscriber, connectable);
            var subscription = source.subscribe(refCounter);
            if (!refCounter.closed) {
                refCounter.connection = connectable.connect();
            }
            return subscription;
        };
        return RefCountOperator;
    }());
    var RefCountSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(RefCountSubscriber, _super);
        function RefCountSubscriber(destination, connectable) {
            var _this = _super.call(this, destination) || this;
            _this.connectable = connectable;
            return _this;
        }
        RefCountSubscriber.prototype._unsubscribe = function () {
            var connectable = this.connectable;
            if (!connectable) {
                this.connection = null;
                return;
            }
            this.connectable = null;
            var refCount = connectable._refCount;
            if (refCount <= 0) {
                this.connection = null;
                return;
            }
            connectable._refCount = refCount - 1;
            if (refCount > 1) {
                this.connection = null;
                return;
            }
            var connection = this.connection;
            var sharedConnection = connectable._connection;
            this.connection = null;
            if (sharedConnection && (!connection || sharedConnection === connection)) {
                sharedConnection.unsubscribe();
            }
        };
        return RefCountSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START tslib,_Subscriber,_Subscription,_Observable,_Subject PURE_IMPORTS_END */
    function groupBy(keySelector, elementSelector, durationSelector, subjectSelector) {
        return function (source) {
            return source.lift(new GroupByOperator(keySelector, elementSelector, durationSelector, subjectSelector));
        };
    }
    var GroupByOperator = /*@__PURE__*/ (function () {
        function GroupByOperator(keySelector, elementSelector, durationSelector, subjectSelector) {
            this.keySelector = keySelector;
            this.elementSelector = elementSelector;
            this.durationSelector = durationSelector;
            this.subjectSelector = subjectSelector;
        }
        GroupByOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new GroupBySubscriber(subscriber, this.keySelector, this.elementSelector, this.durationSelector, this.subjectSelector));
        };
        return GroupByOperator;
    }());
    var GroupBySubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(GroupBySubscriber, _super);
        function GroupBySubscriber(destination, keySelector, elementSelector, durationSelector, subjectSelector) {
            var _this = _super.call(this, destination) || this;
            _this.keySelector = keySelector;
            _this.elementSelector = elementSelector;
            _this.durationSelector = durationSelector;
            _this.subjectSelector = subjectSelector;
            _this.groups = null;
            _this.attemptedToUnsubscribe = false;
            _this.count = 0;
            return _this;
        }
        GroupBySubscriber.prototype._next = function (value) {
            var key;
            try {
                key = this.keySelector(value);
            }
            catch (err) {
                this.error(err);
                return;
            }
            this._group(value, key);
        };
        GroupBySubscriber.prototype._group = function (value, key) {
            var groups = this.groups;
            if (!groups) {
                groups = this.groups = new Map();
            }
            var group = groups.get(key);
            var element;
            if (this.elementSelector) {
                try {
                    element = this.elementSelector(value);
                }
                catch (err) {
                    this.error(err);
                }
            }
            else {
                element = value;
            }
            if (!group) {
                group = (this.subjectSelector ? this.subjectSelector() : new Subject());
                groups.set(key, group);
                var groupedObservable = new GroupedObservable(key, group, this);
                this.destination.next(groupedObservable);
                if (this.durationSelector) {
                    var duration = void 0;
                    try {
                        duration = this.durationSelector(new GroupedObservable(key, group));
                    }
                    catch (err) {
                        this.error(err);
                        return;
                    }
                    this.add(duration.subscribe(new GroupDurationSubscriber(key, group, this)));
                }
            }
            if (!group.closed) {
                group.next(element);
            }
        };
        GroupBySubscriber.prototype._error = function (err) {
            var groups = this.groups;
            if (groups) {
                groups.forEach(function (group, key) {
                    group.error(err);
                });
                groups.clear();
            }
            this.destination.error(err);
        };
        GroupBySubscriber.prototype._complete = function () {
            var groups = this.groups;
            if (groups) {
                groups.forEach(function (group, key) {
                    group.complete();
                });
                groups.clear();
            }
            this.destination.complete();
        };
        GroupBySubscriber.prototype.removeGroup = function (key) {
            this.groups.delete(key);
        };
        GroupBySubscriber.prototype.unsubscribe = function () {
            if (!this.closed) {
                this.attemptedToUnsubscribe = true;
                if (this.count === 0) {
                    _super.prototype.unsubscribe.call(this);
                }
            }
        };
        return GroupBySubscriber;
    }(Subscriber));
    var GroupDurationSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(GroupDurationSubscriber, _super);
        function GroupDurationSubscriber(key, group, parent) {
            var _this = _super.call(this, group) || this;
            _this.key = key;
            _this.group = group;
            _this.parent = parent;
            return _this;
        }
        GroupDurationSubscriber.prototype._next = function (value) {
            this.complete();
        };
        GroupDurationSubscriber.prototype._unsubscribe = function () {
            var _a = this, parent = _a.parent, key = _a.key;
            this.key = this.parent = null;
            if (parent) {
                parent.removeGroup(key);
            }
        };
        return GroupDurationSubscriber;
    }(Subscriber));
    var GroupedObservable = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(GroupedObservable, _super);
        function GroupedObservable(key, groupSubject, refCountSubscription) {
            var _this = _super.call(this) || this;
            _this.key = key;
            _this.groupSubject = groupSubject;
            _this.refCountSubscription = refCountSubscription;
            return _this;
        }
        GroupedObservable.prototype._subscribe = function (subscriber) {
            var subscription = new Subscription();
            var _a = this, refCountSubscription = _a.refCountSubscription, groupSubject = _a.groupSubject;
            if (refCountSubscription && !refCountSubscription.closed) {
                subscription.add(new InnerRefCountSubscription(refCountSubscription));
            }
            subscription.add(groupSubject.subscribe(subscriber));
            return subscription;
        };
        return GroupedObservable;
    }(Observable));
    var InnerRefCountSubscription = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(InnerRefCountSubscription, _super);
        function InnerRefCountSubscription(parent) {
            var _this = _super.call(this) || this;
            _this.parent = parent;
            parent.count++;
            return _this;
        }
        InnerRefCountSubscription.prototype.unsubscribe = function () {
            var parent = this.parent;
            if (!parent.closed && !this.closed) {
                _super.prototype.unsubscribe.call(this);
                parent.count -= 1;
                if (parent.count === 0 && parent.attemptedToUnsubscribe) {
                    parent.unsubscribe();
                }
            }
        };
        return InnerRefCountSubscription;
    }(Subscription));

    /** PURE_IMPORTS_START tslib,_Subject,_util_ObjectUnsubscribedError PURE_IMPORTS_END */
    var BehaviorSubject = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(BehaviorSubject, _super);
        function BehaviorSubject(_value) {
            var _this = _super.call(this) || this;
            _this._value = _value;
            return _this;
        }
        Object.defineProperty(BehaviorSubject.prototype, "value", {
            get: function () {
                return this.getValue();
            },
            enumerable: true,
            configurable: true
        });
        BehaviorSubject.prototype._subscribe = function (subscriber) {
            var subscription = _super.prototype._subscribe.call(this, subscriber);
            if (subscription && !subscription.closed) {
                subscriber.next(this._value);
            }
            return subscription;
        };
        BehaviorSubject.prototype.getValue = function () {
            if (this.hasError) {
                throw this.thrownError;
            }
            else if (this.closed) {
                throw new ObjectUnsubscribedError();
            }
            else {
                return this._value;
            }
        };
        BehaviorSubject.prototype.next = function (value) {
            _super.prototype.next.call(this, this._value = value);
        };
        return BehaviorSubject;
    }(Subject));

    /** PURE_IMPORTS_START tslib,_Subscription PURE_IMPORTS_END */
    var Action = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(Action, _super);
        function Action(scheduler, work) {
            return _super.call(this) || this;
        }
        Action.prototype.schedule = function (state, delay) {
            if (delay === void 0) {
                delay = 0;
            }
            return this;
        };
        return Action;
    }(Subscription));

    /** PURE_IMPORTS_START tslib,_Action PURE_IMPORTS_END */
    var AsyncAction = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(AsyncAction, _super);
        function AsyncAction(scheduler, work) {
            var _this = _super.call(this, scheduler, work) || this;
            _this.scheduler = scheduler;
            _this.work = work;
            _this.pending = false;
            return _this;
        }
        AsyncAction.prototype.schedule = function (state, delay) {
            if (delay === void 0) {
                delay = 0;
            }
            if (this.closed) {
                return this;
            }
            this.state = state;
            var id = this.id;
            var scheduler = this.scheduler;
            if (id != null) {
                this.id = this.recycleAsyncId(scheduler, id, delay);
            }
            this.pending = true;
            this.delay = delay;
            this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
            return this;
        };
        AsyncAction.prototype.requestAsyncId = function (scheduler, id, delay) {
            if (delay === void 0) {
                delay = 0;
            }
            return setInterval(scheduler.flush.bind(scheduler, this), delay);
        };
        AsyncAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
            if (delay === void 0) {
                delay = 0;
            }
            if (delay !== null && this.delay === delay && this.pending === false) {
                return id;
            }
            clearInterval(id);
            return undefined;
        };
        AsyncAction.prototype.execute = function (state, delay) {
            if (this.closed) {
                return new Error('executing a cancelled action');
            }
            this.pending = false;
            var error = this._execute(state, delay);
            if (error) {
                return error;
            }
            else if (this.pending === false && this.id != null) {
                this.id = this.recycleAsyncId(this.scheduler, this.id, null);
            }
        };
        AsyncAction.prototype._execute = function (state, delay) {
            var errored = false;
            var errorValue = undefined;
            try {
                this.work(state);
            }
            catch (e) {
                errored = true;
                errorValue = !!e && e || new Error(e);
            }
            if (errored) {
                this.unsubscribe();
                return errorValue;
            }
        };
        AsyncAction.prototype._unsubscribe = function () {
            var id = this.id;
            var scheduler = this.scheduler;
            var actions = scheduler.actions;
            var index = actions.indexOf(this);
            this.work = null;
            this.state = null;
            this.pending = false;
            this.scheduler = null;
            if (index !== -1) {
                actions.splice(index, 1);
            }
            if (id != null) {
                this.id = this.recycleAsyncId(scheduler, id, null);
            }
            this.delay = null;
        };
        return AsyncAction;
    }(Action));

    /** PURE_IMPORTS_START tslib,_AsyncAction PURE_IMPORTS_END */
    var QueueAction = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(QueueAction, _super);
        function QueueAction(scheduler, work) {
            var _this = _super.call(this, scheduler, work) || this;
            _this.scheduler = scheduler;
            _this.work = work;
            return _this;
        }
        QueueAction.prototype.schedule = function (state, delay) {
            if (delay === void 0) {
                delay = 0;
            }
            if (delay > 0) {
                return _super.prototype.schedule.call(this, state, delay);
            }
            this.delay = delay;
            this.state = state;
            this.scheduler.flush(this);
            return this;
        };
        QueueAction.prototype.execute = function (state, delay) {
            return (delay > 0 || this.closed) ?
                _super.prototype.execute.call(this, state, delay) :
                this._execute(state, delay);
        };
        QueueAction.prototype.requestAsyncId = function (scheduler, id, delay) {
            if (delay === void 0) {
                delay = 0;
            }
            if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
                return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
            }
            return scheduler.flush(this);
        };
        return QueueAction;
    }(AsyncAction));

    var Scheduler = /*@__PURE__*/ (function () {
        function Scheduler(SchedulerAction, now) {
            if (now === void 0) {
                now = Scheduler.now;
            }
            this.SchedulerAction = SchedulerAction;
            this.now = now;
        }
        Scheduler.prototype.schedule = function (work, delay, state) {
            if (delay === void 0) {
                delay = 0;
            }
            return new this.SchedulerAction(this, work).schedule(state, delay);
        };
        Scheduler.now = function () { return Date.now(); };
        return Scheduler;
    }());

    /** PURE_IMPORTS_START tslib,_Scheduler PURE_IMPORTS_END */
    var AsyncScheduler = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(AsyncScheduler, _super);
        function AsyncScheduler(SchedulerAction, now) {
            if (now === void 0) {
                now = Scheduler.now;
            }
            var _this = _super.call(this, SchedulerAction, function () {
                if (AsyncScheduler.delegate && AsyncScheduler.delegate !== _this) {
                    return AsyncScheduler.delegate.now();
                }
                else {
                    return now();
                }
            }) || this;
            _this.actions = [];
            _this.active = false;
            _this.scheduled = undefined;
            return _this;
        }
        AsyncScheduler.prototype.schedule = function (work, delay, state) {
            if (delay === void 0) {
                delay = 0;
            }
            if (AsyncScheduler.delegate && AsyncScheduler.delegate !== this) {
                return AsyncScheduler.delegate.schedule(work, delay, state);
            }
            else {
                return _super.prototype.schedule.call(this, work, delay, state);
            }
        };
        AsyncScheduler.prototype.flush = function (action) {
            var actions = this.actions;
            if (this.active) {
                actions.push(action);
                return;
            }
            var error;
            this.active = true;
            do {
                if (error = action.execute(action.state, action.delay)) {
                    break;
                }
            } while (action = actions.shift());
            this.active = false;
            if (error) {
                while (action = actions.shift()) {
                    action.unsubscribe();
                }
                throw error;
            }
        };
        return AsyncScheduler;
    }(Scheduler));

    /** PURE_IMPORTS_START tslib,_AsyncScheduler PURE_IMPORTS_END */
    var QueueScheduler = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(QueueScheduler, _super);
        function QueueScheduler() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return QueueScheduler;
    }(AsyncScheduler));

    /** PURE_IMPORTS_START _QueueAction,_QueueScheduler PURE_IMPORTS_END */
    var queueScheduler = /*@__PURE__*/ new QueueScheduler(QueueAction);
    var queue = queueScheduler;

    /** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */
    var EMPTY = /*@__PURE__*/ new Observable(function (subscriber) { return subscriber.complete(); });
    function empty(scheduler) {
        return scheduler ? emptyScheduled(scheduler) : EMPTY;
    }
    function emptyScheduled(scheduler) {
        return new Observable(function (subscriber) { return scheduler.schedule(function () { return subscriber.complete(); }); });
    }

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    function isScheduler(value) {
        return value && typeof value.schedule === 'function';
    }

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    var subscribeToArray = function (array) {
        return function (subscriber) {
            for (var i = 0, len = array.length; i < len && !subscriber.closed; i++) {
                subscriber.next(array[i]);
            }
            subscriber.complete();
        };
    };

    /** PURE_IMPORTS_START _Observable,_Subscription PURE_IMPORTS_END */
    function scheduleArray(input, scheduler) {
        return new Observable(function (subscriber) {
            var sub = new Subscription();
            var i = 0;
            sub.add(scheduler.schedule(function () {
                if (i === input.length) {
                    subscriber.complete();
                    return;
                }
                subscriber.next(input[i++]);
                if (!subscriber.closed) {
                    sub.add(this.schedule());
                }
            }));
            return sub;
        });
    }

    /** PURE_IMPORTS_START _Observable,_util_subscribeToArray,_scheduled_scheduleArray PURE_IMPORTS_END */
    function fromArray(input, scheduler) {
        if (!scheduler) {
            return new Observable(subscribeToArray(input));
        }
        else {
            return scheduleArray(input, scheduler);
        }
    }

    /** PURE_IMPORTS_START _util_isScheduler,_fromArray,_scheduled_scheduleArray PURE_IMPORTS_END */
    function of() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var scheduler = args[args.length - 1];
        if (isScheduler(scheduler)) {
            args.pop();
            return scheduleArray(args, scheduler);
        }
        else {
            return fromArray(args);
        }
    }

    /** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */
    function throwError(error, scheduler) {
        if (!scheduler) {
            return new Observable(function (subscriber) { return subscriber.error(error); });
        }
        else {
            return new Observable(function (subscriber) { return scheduler.schedule(dispatch$7, 0, { error: error, subscriber: subscriber }); });
        }
    }
    function dispatch$7(_a) {
        var error = _a.error, subscriber = _a.subscriber;
        subscriber.error(error);
    }

    /** PURE_IMPORTS_START _observable_empty,_observable_of,_observable_throwError PURE_IMPORTS_END */
    var NotificationKind;
    /*@__PURE__*/ (function (NotificationKind) {
        NotificationKind["NEXT"] = "N";
        NotificationKind["ERROR"] = "E";
        NotificationKind["COMPLETE"] = "C";
    })(NotificationKind || (NotificationKind = {}));
    var Notification = /*@__PURE__*/ (function () {
        function Notification(kind, value, error) {
            this.kind = kind;
            this.value = value;
            this.error = error;
            this.hasValue = kind === 'N';
        }
        Notification.prototype.observe = function (observer) {
            switch (this.kind) {
                case 'N':
                    return observer.next && observer.next(this.value);
                case 'E':
                    return observer.error && observer.error(this.error);
                case 'C':
                    return observer.complete && observer.complete();
            }
        };
        Notification.prototype.do = function (next, error, complete) {
            var kind = this.kind;
            switch (kind) {
                case 'N':
                    return next && next(this.value);
                case 'E':
                    return error && error(this.error);
                case 'C':
                    return complete && complete();
            }
        };
        Notification.prototype.accept = function (nextOrObserver, error, complete) {
            if (nextOrObserver && typeof nextOrObserver.next === 'function') {
                return this.observe(nextOrObserver);
            }
            else {
                return this.do(nextOrObserver, error, complete);
            }
        };
        Notification.prototype.toObservable = function () {
            var kind = this.kind;
            switch (kind) {
                case 'N':
                    return of(this.value);
                case 'E':
                    return throwError(this.error);
                case 'C':
                    return empty();
            }
            throw new Error('unexpected notification kind value');
        };
        Notification.createNext = function (value) {
            if (typeof value !== 'undefined') {
                return new Notification('N', value);
            }
            return Notification.undefinedValueNotification;
        };
        Notification.createError = function (err) {
            return new Notification('E', undefined, err);
        };
        Notification.createComplete = function () {
            return Notification.completeNotification;
        };
        Notification.completeNotification = new Notification('C');
        Notification.undefinedValueNotification = new Notification('N', undefined);
        return Notification;
    }());

    /** PURE_IMPORTS_START tslib,_Subscriber,_Notification PURE_IMPORTS_END */
    function observeOn(scheduler, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        return function observeOnOperatorFunction(source) {
            return source.lift(new ObserveOnOperator(scheduler, delay));
        };
    }
    var ObserveOnOperator = /*@__PURE__*/ (function () {
        function ObserveOnOperator(scheduler, delay) {
            if (delay === void 0) {
                delay = 0;
            }
            this.scheduler = scheduler;
            this.delay = delay;
        }
        ObserveOnOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new ObserveOnSubscriber(subscriber, this.scheduler, this.delay));
        };
        return ObserveOnOperator;
    }());
    var ObserveOnSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(ObserveOnSubscriber, _super);
        function ObserveOnSubscriber(destination, scheduler, delay) {
            if (delay === void 0) {
                delay = 0;
            }
            var _this = _super.call(this, destination) || this;
            _this.scheduler = scheduler;
            _this.delay = delay;
            return _this;
        }
        ObserveOnSubscriber.dispatch = function (arg) {
            var notification = arg.notification, destination = arg.destination;
            notification.observe(destination);
            this.unsubscribe();
        };
        ObserveOnSubscriber.prototype.scheduleMessage = function (notification) {
            var destination = this.destination;
            destination.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
        };
        ObserveOnSubscriber.prototype._next = function (value) {
            this.scheduleMessage(Notification.createNext(value));
        };
        ObserveOnSubscriber.prototype._error = function (err) {
            this.scheduleMessage(Notification.createError(err));
            this.unsubscribe();
        };
        ObserveOnSubscriber.prototype._complete = function () {
            this.scheduleMessage(Notification.createComplete());
            this.unsubscribe();
        };
        return ObserveOnSubscriber;
    }(Subscriber));
    var ObserveOnMessage = /*@__PURE__*/ (function () {
        function ObserveOnMessage(notification, destination) {
            this.notification = notification;
            this.destination = destination;
        }
        return ObserveOnMessage;
    }());

    /** PURE_IMPORTS_START tslib,_Subject,_scheduler_queue,_Subscription,_operators_observeOn,_util_ObjectUnsubscribedError,_SubjectSubscription PURE_IMPORTS_END */
    var ReplaySubject = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(ReplaySubject, _super);
        function ReplaySubject(bufferSize, windowTime, scheduler) {
            if (bufferSize === void 0) {
                bufferSize = Number.POSITIVE_INFINITY;
            }
            if (windowTime === void 0) {
                windowTime = Number.POSITIVE_INFINITY;
            }
            var _this = _super.call(this) || this;
            _this.scheduler = scheduler;
            _this._events = [];
            _this._infiniteTimeWindow = false;
            _this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
            _this._windowTime = windowTime < 1 ? 1 : windowTime;
            if (windowTime === Number.POSITIVE_INFINITY) {
                _this._infiniteTimeWindow = true;
                _this.next = _this.nextInfiniteTimeWindow;
            }
            else {
                _this.next = _this.nextTimeWindow;
            }
            return _this;
        }
        ReplaySubject.prototype.nextInfiniteTimeWindow = function (value) {
            if (!this.isStopped) {
                var _events = this._events;
                _events.push(value);
                if (_events.length > this._bufferSize) {
                    _events.shift();
                }
            }
            _super.prototype.next.call(this, value);
        };
        ReplaySubject.prototype.nextTimeWindow = function (value) {
            if (!this.isStopped) {
                this._events.push(new ReplayEvent(this._getNow(), value));
                this._trimBufferThenGetEvents();
            }
            _super.prototype.next.call(this, value);
        };
        ReplaySubject.prototype._subscribe = function (subscriber) {
            var _infiniteTimeWindow = this._infiniteTimeWindow;
            var _events = _infiniteTimeWindow ? this._events : this._trimBufferThenGetEvents();
            var scheduler = this.scheduler;
            var len = _events.length;
            var subscription;
            if (this.closed) {
                throw new ObjectUnsubscribedError();
            }
            else if (this.isStopped || this.hasError) {
                subscription = Subscription.EMPTY;
            }
            else {
                this.observers.push(subscriber);
                subscription = new SubjectSubscription(this, subscriber);
            }
            if (scheduler) {
                subscriber.add(subscriber = new ObserveOnSubscriber(subscriber, scheduler));
            }
            if (_infiniteTimeWindow) {
                for (var i = 0; i < len && !subscriber.closed; i++) {
                    subscriber.next(_events[i]);
                }
            }
            else {
                for (var i = 0; i < len && !subscriber.closed; i++) {
                    subscriber.next(_events[i].value);
                }
            }
            if (this.hasError) {
                subscriber.error(this.thrownError);
            }
            else if (this.isStopped) {
                subscriber.complete();
            }
            return subscription;
        };
        ReplaySubject.prototype._getNow = function () {
            return (this.scheduler || queue).now();
        };
        ReplaySubject.prototype._trimBufferThenGetEvents = function () {
            var now = this._getNow();
            var _bufferSize = this._bufferSize;
            var _windowTime = this._windowTime;
            var _events = this._events;
            var eventsCount = _events.length;
            var spliceCount = 0;
            while (spliceCount < eventsCount) {
                if ((now - _events[spliceCount].time) < _windowTime) {
                    break;
                }
                spliceCount++;
            }
            if (eventsCount > _bufferSize) {
                spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
            }
            if (spliceCount > 0) {
                _events.splice(0, spliceCount);
            }
            return _events;
        };
        return ReplaySubject;
    }(Subject));
    var ReplayEvent = /*@__PURE__*/ (function () {
        function ReplayEvent(time, value) {
            this.time = time;
            this.value = value;
        }
        return ReplayEvent;
    }());

    /** PURE_IMPORTS_START tslib,_Subject,_Subscription PURE_IMPORTS_END */
    var AsyncSubject = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(AsyncSubject, _super);
        function AsyncSubject() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.value = null;
            _this.hasNext = false;
            _this.hasCompleted = false;
            return _this;
        }
        AsyncSubject.prototype._subscribe = function (subscriber) {
            if (this.hasError) {
                subscriber.error(this.thrownError);
                return Subscription.EMPTY;
            }
            else if (this.hasCompleted && this.hasNext) {
                subscriber.next(this.value);
                subscriber.complete();
                return Subscription.EMPTY;
            }
            return _super.prototype._subscribe.call(this, subscriber);
        };
        AsyncSubject.prototype.next = function (value) {
            if (!this.hasCompleted) {
                this.value = value;
                this.hasNext = true;
            }
        };
        AsyncSubject.prototype.error = function (error) {
            if (!this.hasCompleted) {
                _super.prototype.error.call(this, error);
            }
        };
        AsyncSubject.prototype.complete = function () {
            this.hasCompleted = true;
            if (this.hasNext) {
                _super.prototype.next.call(this, this.value);
            }
            _super.prototype.complete.call(this);
        };
        return AsyncSubject;
    }(Subject));

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    var nextHandle = 1;
    var RESOLVED = /*@__PURE__*/ (function () { return /*@__PURE__*/ Promise.resolve(); })();
    var activeHandles = {};
    function findAndClearHandle(handle) {
        if (handle in activeHandles) {
            delete activeHandles[handle];
            return true;
        }
        return false;
    }
    var Immediate = {
        setImmediate: function (cb) {
            var handle = nextHandle++;
            activeHandles[handle] = true;
            RESOLVED.then(function () { return findAndClearHandle(handle) && cb(); });
            return handle;
        },
        clearImmediate: function (handle) {
            findAndClearHandle(handle);
        },
    };
    var TestTools = {
        pending: function () {
            return Object.keys(activeHandles).length;
        }
    };

    /** PURE_IMPORTS_START tslib,_util_Immediate,_AsyncAction PURE_IMPORTS_END */
    var AsapAction = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(AsapAction, _super);
        function AsapAction(scheduler, work) {
            var _this = _super.call(this, scheduler, work) || this;
            _this.scheduler = scheduler;
            _this.work = work;
            return _this;
        }
        AsapAction.prototype.requestAsyncId = function (scheduler, id, delay) {
            if (delay === void 0) {
                delay = 0;
            }
            if (delay !== null && delay > 0) {
                return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
            }
            scheduler.actions.push(this);
            return scheduler.scheduled || (scheduler.scheduled = Immediate.setImmediate(scheduler.flush.bind(scheduler, null)));
        };
        AsapAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
            if (delay === void 0) {
                delay = 0;
            }
            if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
                return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
            }
            if (scheduler.actions.length === 0) {
                Immediate.clearImmediate(id);
                scheduler.scheduled = undefined;
            }
            return undefined;
        };
        return AsapAction;
    }(AsyncAction));

    /** PURE_IMPORTS_START tslib,_AsyncScheduler PURE_IMPORTS_END */
    var AsapScheduler = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(AsapScheduler, _super);
        function AsapScheduler() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AsapScheduler.prototype.flush = function (action) {
            this.active = true;
            this.scheduled = undefined;
            var actions = this.actions;
            var error;
            var index = -1;
            var count = actions.length;
            action = action || actions.shift();
            do {
                if (error = action.execute(action.state, action.delay)) {
                    break;
                }
            } while (++index < count && (action = actions.shift()));
            this.active = false;
            if (error) {
                while (++index < count && (action = actions.shift())) {
                    action.unsubscribe();
                }
                throw error;
            }
        };
        return AsapScheduler;
    }(AsyncScheduler));

    /** PURE_IMPORTS_START _AsapAction,_AsapScheduler PURE_IMPORTS_END */
    var asapScheduler = /*@__PURE__*/ new AsapScheduler(AsapAction);
    var asap = asapScheduler;

    /** PURE_IMPORTS_START _AsyncAction,_AsyncScheduler PURE_IMPORTS_END */
    var asyncScheduler = /*@__PURE__*/ new AsyncScheduler(AsyncAction);
    var async = asyncScheduler;

    /** PURE_IMPORTS_START tslib,_AsyncAction PURE_IMPORTS_END */
    var AnimationFrameAction = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(AnimationFrameAction, _super);
        function AnimationFrameAction(scheduler, work) {
            var _this = _super.call(this, scheduler, work) || this;
            _this.scheduler = scheduler;
            _this.work = work;
            return _this;
        }
        AnimationFrameAction.prototype.requestAsyncId = function (scheduler, id, delay) {
            if (delay === void 0) {
                delay = 0;
            }
            if (delay !== null && delay > 0) {
                return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
            }
            scheduler.actions.push(this);
            return scheduler.scheduled || (scheduler.scheduled = requestAnimationFrame(function () { return scheduler.flush(null); }));
        };
        AnimationFrameAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
            if (delay === void 0) {
                delay = 0;
            }
            if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
                return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
            }
            if (scheduler.actions.length === 0) {
                cancelAnimationFrame(id);
                scheduler.scheduled = undefined;
            }
            return undefined;
        };
        return AnimationFrameAction;
    }(AsyncAction));

    /** PURE_IMPORTS_START tslib,_AsyncScheduler PURE_IMPORTS_END */
    var AnimationFrameScheduler = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(AnimationFrameScheduler, _super);
        function AnimationFrameScheduler() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AnimationFrameScheduler.prototype.flush = function (action) {
            this.active = true;
            this.scheduled = undefined;
            var actions = this.actions;
            var error;
            var index = -1;
            var count = actions.length;
            action = action || actions.shift();
            do {
                if (error = action.execute(action.state, action.delay)) {
                    break;
                }
            } while (++index < count && (action = actions.shift()));
            this.active = false;
            if (error) {
                while (++index < count && (action = actions.shift())) {
                    action.unsubscribe();
                }
                throw error;
            }
        };
        return AnimationFrameScheduler;
    }(AsyncScheduler));

    /** PURE_IMPORTS_START _AnimationFrameAction,_AnimationFrameScheduler PURE_IMPORTS_END */
    var animationFrameScheduler = /*@__PURE__*/ new AnimationFrameScheduler(AnimationFrameAction);
    var animationFrame = animationFrameScheduler;

    /** PURE_IMPORTS_START tslib,_AsyncAction,_AsyncScheduler PURE_IMPORTS_END */
    var VirtualTimeScheduler = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(VirtualTimeScheduler, _super);
        function VirtualTimeScheduler(SchedulerAction, maxFrames) {
            if (SchedulerAction === void 0) {
                SchedulerAction = VirtualAction;
            }
            if (maxFrames === void 0) {
                maxFrames = Number.POSITIVE_INFINITY;
            }
            var _this = _super.call(this, SchedulerAction, function () { return _this.frame; }) || this;
            _this.maxFrames = maxFrames;
            _this.frame = 0;
            _this.index = -1;
            return _this;
        }
        VirtualTimeScheduler.prototype.flush = function () {
            var _a = this, actions = _a.actions, maxFrames = _a.maxFrames;
            var error, action;
            while ((action = actions[0]) && action.delay <= maxFrames) {
                actions.shift();
                this.frame = action.delay;
                if (error = action.execute(action.state, action.delay)) {
                    break;
                }
            }
            if (error) {
                while (action = actions.shift()) {
                    action.unsubscribe();
                }
                throw error;
            }
        };
        VirtualTimeScheduler.frameTimeFactor = 10;
        return VirtualTimeScheduler;
    }(AsyncScheduler));
    var VirtualAction = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(VirtualAction, _super);
        function VirtualAction(scheduler, work, index) {
            if (index === void 0) {
                index = scheduler.index += 1;
            }
            var _this = _super.call(this, scheduler, work) || this;
            _this.scheduler = scheduler;
            _this.work = work;
            _this.index = index;
            _this.active = true;
            _this.index = scheduler.index = index;
            return _this;
        }
        VirtualAction.prototype.schedule = function (state, delay) {
            if (delay === void 0) {
                delay = 0;
            }
            if (!this.id) {
                return _super.prototype.schedule.call(this, state, delay);
            }
            this.active = false;
            var action = new VirtualAction(this.scheduler, this.work);
            this.add(action);
            return action.schedule(state, delay);
        };
        VirtualAction.prototype.requestAsyncId = function (scheduler, id, delay) {
            if (delay === void 0) {
                delay = 0;
            }
            this.delay = scheduler.frame + delay;
            var actions = scheduler.actions;
            actions.push(this);
            actions.sort(VirtualAction.sortActions);
            return true;
        };
        VirtualAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
            if (delay === void 0) {
                delay = 0;
            }
            return undefined;
        };
        VirtualAction.prototype._execute = function (state, delay) {
            if (this.active === true) {
                return _super.prototype._execute.call(this, state, delay);
            }
        };
        VirtualAction.sortActions = function (a, b) {
            if (a.delay === b.delay) {
                if (a.index === b.index) {
                    return 0;
                }
                else if (a.index > b.index) {
                    return 1;
                }
                else {
                    return -1;
                }
            }
            else if (a.delay > b.delay) {
                return 1;
            }
            else {
                return -1;
            }
        };
        return VirtualAction;
    }(AsyncAction));

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    function noop() { }

    /** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */
    function isObservable(obj) {
        return !!obj && (obj instanceof Observable || (typeof obj.lift === 'function' && typeof obj.subscribe === 'function'));
    }

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    var ArgumentOutOfRangeErrorImpl = /*@__PURE__*/ (function () {
        function ArgumentOutOfRangeErrorImpl() {
            Error.call(this);
            this.message = 'argument out of range';
            this.name = 'ArgumentOutOfRangeError';
            return this;
        }
        ArgumentOutOfRangeErrorImpl.prototype = /*@__PURE__*/ Object.create(Error.prototype);
        return ArgumentOutOfRangeErrorImpl;
    })();
    var ArgumentOutOfRangeError = ArgumentOutOfRangeErrorImpl;

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    var EmptyErrorImpl = /*@__PURE__*/ (function () {
        function EmptyErrorImpl() {
            Error.call(this);
            this.message = 'no elements in sequence';
            this.name = 'EmptyError';
            return this;
        }
        EmptyErrorImpl.prototype = /*@__PURE__*/ Object.create(Error.prototype);
        return EmptyErrorImpl;
    })();
    var EmptyError = EmptyErrorImpl;

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    var TimeoutErrorImpl = /*@__PURE__*/ (function () {
        function TimeoutErrorImpl() {
            Error.call(this);
            this.message = 'Timeout has occurred';
            this.name = 'TimeoutError';
            return this;
        }
        TimeoutErrorImpl.prototype = /*@__PURE__*/ Object.create(Error.prototype);
        return TimeoutErrorImpl;
    })();
    var TimeoutError = TimeoutErrorImpl;

    /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
    function map(project, thisArg) {
        return function mapOperation(source) {
            if (typeof project !== 'function') {
                throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
            }
            return source.lift(new MapOperator(project, thisArg));
        };
    }
    var MapOperator = /*@__PURE__*/ (function () {
        function MapOperator(project, thisArg) {
            this.project = project;
            this.thisArg = thisArg;
        }
        MapOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
        };
        return MapOperator;
    }());
    var MapSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(MapSubscriber, _super);
        function MapSubscriber(destination, project, thisArg) {
            var _this = _super.call(this, destination) || this;
            _this.project = project;
            _this.count = 0;
            _this.thisArg = thisArg || _this;
            return _this;
        }
        MapSubscriber.prototype._next = function (value) {
            var result;
            try {
                result = this.project.call(this.thisArg, value, this.count++);
            }
            catch (err) {
                this.destination.error(err);
                return;
            }
            this.destination.next(result);
        };
        return MapSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START _Observable,_AsyncSubject,_operators_map,_util_canReportError,_util_isArray,_util_isScheduler PURE_IMPORTS_END */
    function bindCallback(callbackFunc, resultSelector, scheduler) {
        if (resultSelector) {
            if (isScheduler(resultSelector)) {
                scheduler = resultSelector;
            }
            else {
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return bindCallback(callbackFunc, scheduler).apply(void 0, args).pipe(map(function (args) { return isArray$1(args) ? resultSelector.apply(void 0, args) : resultSelector(args); }));
                };
            }
        }
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var context = this;
            var subject;
            var params = {
                context: context,
                subject: subject,
                callbackFunc: callbackFunc,
                scheduler: scheduler,
            };
            return new Observable(function (subscriber) {
                if (!scheduler) {
                    if (!subject) {
                        subject = new AsyncSubject();
                        var handler = function () {
                            var innerArgs = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                innerArgs[_i] = arguments[_i];
                            }
                            subject.next(innerArgs.length <= 1 ? innerArgs[0] : innerArgs);
                            subject.complete();
                        };
                        try {
                            callbackFunc.apply(context, args.concat([handler]));
                        }
                        catch (err) {
                            if (canReportError(subject)) {
                                subject.error(err);
                            }
                            else {
                                console.warn(err);
                            }
                        }
                    }
                    return subject.subscribe(subscriber);
                }
                else {
                    var state = {
                        args: args, subscriber: subscriber, params: params,
                    };
                    return scheduler.schedule(dispatch$6, 0, state);
                }
            });
        };
    }
    function dispatch$6(state) {
        var _this = this;
        var self = this;
        var args = state.args, subscriber = state.subscriber, params = state.params;
        var callbackFunc = params.callbackFunc, context = params.context, scheduler = params.scheduler;
        var subject = params.subject;
        if (!subject) {
            subject = params.subject = new AsyncSubject();
            var handler = function () {
                var innerArgs = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    innerArgs[_i] = arguments[_i];
                }
                var value = innerArgs.length <= 1 ? innerArgs[0] : innerArgs;
                _this.add(scheduler.schedule(dispatchNext$3, 0, { value: value, subject: subject }));
            };
            try {
                callbackFunc.apply(context, args.concat([handler]));
            }
            catch (err) {
                subject.error(err);
            }
        }
        this.add(subject.subscribe(subscriber));
    }
    function dispatchNext$3(state) {
        var value = state.value, subject = state.subject;
        subject.next(value);
        subject.complete();
    }
    function dispatchError$1(state) {
        var err = state.err, subject = state.subject;
        subject.error(err);
    }

    /** PURE_IMPORTS_START _Observable,_AsyncSubject,_operators_map,_util_canReportError,_util_isScheduler,_util_isArray PURE_IMPORTS_END */
    function bindNodeCallback(callbackFunc, resultSelector, scheduler) {
        if (resultSelector) {
            if (isScheduler(resultSelector)) {
                scheduler = resultSelector;
            }
            else {
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return bindNodeCallback(callbackFunc, scheduler).apply(void 0, args).pipe(map(function (args) { return isArray$1(args) ? resultSelector.apply(void 0, args) : resultSelector(args); }));
                };
            }
        }
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var params = {
                subject: undefined,
                args: args,
                callbackFunc: callbackFunc,
                scheduler: scheduler,
                context: this,
            };
            return new Observable(function (subscriber) {
                var context = params.context;
                var subject = params.subject;
                if (!scheduler) {
                    if (!subject) {
                        subject = params.subject = new AsyncSubject();
                        var handler = function () {
                            var innerArgs = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                innerArgs[_i] = arguments[_i];
                            }
                            var err = innerArgs.shift();
                            if (err) {
                                subject.error(err);
                                return;
                            }
                            subject.next(innerArgs.length <= 1 ? innerArgs[0] : innerArgs);
                            subject.complete();
                        };
                        try {
                            callbackFunc.apply(context, args.concat([handler]));
                        }
                        catch (err) {
                            if (canReportError(subject)) {
                                subject.error(err);
                            }
                            else {
                                console.warn(err);
                            }
                        }
                    }
                    return subject.subscribe(subscriber);
                }
                else {
                    return scheduler.schedule(dispatch$5, 0, { params: params, subscriber: subscriber, context: context });
                }
            });
        };
    }
    function dispatch$5(state) {
        var _this = this;
        var params = state.params, subscriber = state.subscriber, context = state.context;
        var callbackFunc = params.callbackFunc, args = params.args, scheduler = params.scheduler;
        var subject = params.subject;
        if (!subject) {
            subject = params.subject = new AsyncSubject();
            var handler = function () {
                var innerArgs = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    innerArgs[_i] = arguments[_i];
                }
                var err = innerArgs.shift();
                if (err) {
                    _this.add(scheduler.schedule(dispatchError, 0, { err: err, subject: subject }));
                }
                else {
                    var value = innerArgs.length <= 1 ? innerArgs[0] : innerArgs;
                    _this.add(scheduler.schedule(dispatchNext$2, 0, { value: value, subject: subject }));
                }
            };
            try {
                callbackFunc.apply(context, args.concat([handler]));
            }
            catch (err) {
                this.add(scheduler.schedule(dispatchError, 0, { err: err, subject: subject }));
            }
        }
        this.add(subject.subscribe(subscriber));
    }
    function dispatchNext$2(arg) {
        var value = arg.value, subject = arg.subject;
        subject.next(value);
        subject.complete();
    }
    function dispatchError(arg) {
        var err = arg.err, subject = arg.subject;
        subject.error(err);
    }

    /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
    var OuterSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(OuterSubscriber, _super);
        function OuterSubscriber() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            this.destination.next(innerValue);
        };
        OuterSubscriber.prototype.notifyError = function (error, innerSub) {
            this.destination.error(error);
        };
        OuterSubscriber.prototype.notifyComplete = function (innerSub) {
            this.destination.complete();
        };
        return OuterSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
    var InnerSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(InnerSubscriber, _super);
        function InnerSubscriber(parent, outerValue, outerIndex) {
            var _this = _super.call(this) || this;
            _this.parent = parent;
            _this.outerValue = outerValue;
            _this.outerIndex = outerIndex;
            _this.index = 0;
            return _this;
        }
        InnerSubscriber.prototype._next = function (value) {
            this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
        };
        InnerSubscriber.prototype._error = function (error) {
            this.parent.notifyError(error, this);
            this.unsubscribe();
        };
        InnerSubscriber.prototype._complete = function () {
            this.parent.notifyComplete(this);
            this.unsubscribe();
        };
        return InnerSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START _hostReportError PURE_IMPORTS_END */
    var subscribeToPromise = function (promise) {
        return function (subscriber) {
            promise.then(function (value) {
                if (!subscriber.closed) {
                    subscriber.next(value);
                    subscriber.complete();
                }
            }, function (err) { return subscriber.error(err); })
                .then(null, hostReportError);
            return subscriber;
        };
    };

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    function getSymbolIterator() {
        if (typeof Symbol !== 'function' || !Symbol.iterator) {
            return '@@iterator';
        }
        return Symbol.iterator;
    }
    var iterator = /*@__PURE__*/ getSymbolIterator();
    var $$iterator = iterator;

    /** PURE_IMPORTS_START _symbol_iterator PURE_IMPORTS_END */
    var subscribeToIterable = function (iterable) {
        return function (subscriber) {
            var iterator$1 = iterable[iterator]();
            do {
                var item = void 0;
                try {
                    item = iterator$1.next();
                }
                catch (err) {
                    subscriber.error(err);
                    return subscriber;
                }
                if (item.done) {
                    subscriber.complete();
                    break;
                }
                subscriber.next(item.value);
                if (subscriber.closed) {
                    break;
                }
            } while (true);
            if (typeof iterator$1.return === 'function') {
                subscriber.add(function () {
                    if (iterator$1.return) {
                        iterator$1.return();
                    }
                });
            }
            return subscriber;
        };
    };

    /** PURE_IMPORTS_START _symbol_observable PURE_IMPORTS_END */
    var subscribeToObservable = function (obj) {
        return function (subscriber) {
            var obs = obj[observable]();
            if (typeof obs.subscribe !== 'function') {
                throw new TypeError('Provided object does not correctly implement Symbol.observable');
            }
            else {
                return obs.subscribe(subscriber);
            }
        };
    };

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    var isArrayLike = (function (x) { return x && typeof x.length === 'number' && typeof x !== 'function'; });

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    function isPromise(value) {
        return !!value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
    }

    /** PURE_IMPORTS_START _subscribeToArray,_subscribeToPromise,_subscribeToIterable,_subscribeToObservable,_isArrayLike,_isPromise,_isObject,_symbol_iterator,_symbol_observable PURE_IMPORTS_END */
    var subscribeTo = function (result) {
        if (!!result && typeof result[observable] === 'function') {
            return subscribeToObservable(result);
        }
        else if (isArrayLike(result)) {
            return subscribeToArray(result);
        }
        else if (isPromise(result)) {
            return subscribeToPromise(result);
        }
        else if (!!result && typeof result[iterator] === 'function') {
            return subscribeToIterable(result);
        }
        else {
            var value = isObject(result) ? 'an invalid object' : "'" + result + "'";
            var msg = "You provided " + value + " where a stream was expected."
                + ' You can provide an Observable, Promise, Array, or Iterable.';
            throw new TypeError(msg);
        }
    };

    /** PURE_IMPORTS_START _InnerSubscriber,_subscribeTo,_Observable PURE_IMPORTS_END */
    function subscribeToResult(outerSubscriber, result, outerValue, outerIndex, innerSubscriber) {
        if (innerSubscriber === void 0) {
            innerSubscriber = new InnerSubscriber(outerSubscriber, outerValue, outerIndex);
        }
        if (innerSubscriber.closed) {
            return undefined;
        }
        if (result instanceof Observable) {
            return result.subscribe(innerSubscriber);
        }
        return subscribeTo(result)(innerSubscriber);
    }

    /** PURE_IMPORTS_START tslib,_util_isScheduler,_util_isArray,_OuterSubscriber,_util_subscribeToResult,_fromArray PURE_IMPORTS_END */
    var NONE = {};
    function combineLatest$1() {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            observables[_i] = arguments[_i];
        }
        var resultSelector = undefined;
        var scheduler = undefined;
        if (isScheduler(observables[observables.length - 1])) {
            scheduler = observables.pop();
        }
        if (typeof observables[observables.length - 1] === 'function') {
            resultSelector = observables.pop();
        }
        if (observables.length === 1 && isArray$1(observables[0])) {
            observables = observables[0];
        }
        return fromArray(observables, scheduler).lift(new CombineLatestOperator(resultSelector));
    }
    var CombineLatestOperator = /*@__PURE__*/ (function () {
        function CombineLatestOperator(resultSelector) {
            this.resultSelector = resultSelector;
        }
        CombineLatestOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new CombineLatestSubscriber(subscriber, this.resultSelector));
        };
        return CombineLatestOperator;
    }());
    var CombineLatestSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(CombineLatestSubscriber, _super);
        function CombineLatestSubscriber(destination, resultSelector) {
            var _this = _super.call(this, destination) || this;
            _this.resultSelector = resultSelector;
            _this.active = 0;
            _this.values = [];
            _this.observables = [];
            return _this;
        }
        CombineLatestSubscriber.prototype._next = function (observable) {
            this.values.push(NONE);
            this.observables.push(observable);
        };
        CombineLatestSubscriber.prototype._complete = function () {
            var observables = this.observables;
            var len = observables.length;
            if (len === 0) {
                this.destination.complete();
            }
            else {
                this.active = len;
                this.toRespond = len;
                for (var i = 0; i < len; i++) {
                    var observable = observables[i];
                    this.add(subscribeToResult(this, observable, undefined, i));
                }
            }
        };
        CombineLatestSubscriber.prototype.notifyComplete = function (unused) {
            if ((this.active -= 1) === 0) {
                this.destination.complete();
            }
        };
        CombineLatestSubscriber.prototype.notifyNext = function (_outerValue, innerValue, outerIndex) {
            var values = this.values;
            var oldVal = values[outerIndex];
            var toRespond = !this.toRespond
                ? 0
                : oldVal === NONE ? --this.toRespond : this.toRespond;
            values[outerIndex] = innerValue;
            if (toRespond === 0) {
                if (this.resultSelector) {
                    this._tryResultSelector(values);
                }
                else {
                    this.destination.next(values.slice());
                }
            }
        };
        CombineLatestSubscriber.prototype._tryResultSelector = function (values) {
            var result;
            try {
                result = this.resultSelector.apply(this, values);
            }
            catch (err) {
                this.destination.error(err);
                return;
            }
            this.destination.next(result);
        };
        return CombineLatestSubscriber;
    }(OuterSubscriber));

    /** PURE_IMPORTS_START _Observable,_Subscription,_symbol_observable PURE_IMPORTS_END */
    function scheduleObservable(input, scheduler) {
        return new Observable(function (subscriber) {
            var sub = new Subscription();
            sub.add(scheduler.schedule(function () {
                var observable$1 = input[observable]();
                sub.add(observable$1.subscribe({
                    next: function (value) { sub.add(scheduler.schedule(function () { return subscriber.next(value); })); },
                    error: function (err) { sub.add(scheduler.schedule(function () { return subscriber.error(err); })); },
                    complete: function () { sub.add(scheduler.schedule(function () { return subscriber.complete(); })); },
                }));
            }));
            return sub;
        });
    }

    /** PURE_IMPORTS_START _Observable,_Subscription PURE_IMPORTS_END */
    function schedulePromise(input, scheduler) {
        return new Observable(function (subscriber) {
            var sub = new Subscription();
            sub.add(scheduler.schedule(function () {
                return input.then(function (value) {
                    sub.add(scheduler.schedule(function () {
                        subscriber.next(value);
                        sub.add(scheduler.schedule(function () { return subscriber.complete(); }));
                    }));
                }, function (err) {
                    sub.add(scheduler.schedule(function () { return subscriber.error(err); }));
                });
            }));
            return sub;
        });
    }

    /** PURE_IMPORTS_START _Observable,_Subscription,_symbol_iterator PURE_IMPORTS_END */
    function scheduleIterable(input, scheduler) {
        if (!input) {
            throw new Error('Iterable cannot be null');
        }
        return new Observable(function (subscriber) {
            var sub = new Subscription();
            var iterator$1;
            sub.add(function () {
                if (iterator$1 && typeof iterator$1.return === 'function') {
                    iterator$1.return();
                }
            });
            sub.add(scheduler.schedule(function () {
                iterator$1 = input[iterator]();
                sub.add(scheduler.schedule(function () {
                    if (subscriber.closed) {
                        return;
                    }
                    var value;
                    var done;
                    try {
                        var result = iterator$1.next();
                        value = result.value;
                        done = result.done;
                    }
                    catch (err) {
                        subscriber.error(err);
                        return;
                    }
                    if (done) {
                        subscriber.complete();
                    }
                    else {
                        subscriber.next(value);
                        this.schedule();
                    }
                }));
            }));
            return sub;
        });
    }

    /** PURE_IMPORTS_START _symbol_observable PURE_IMPORTS_END */
    function isInteropObservable(input) {
        return input && typeof input[observable] === 'function';
    }

    /** PURE_IMPORTS_START _symbol_iterator PURE_IMPORTS_END */
    function isIterable(input) {
        return input && typeof input[iterator] === 'function';
    }

    /** PURE_IMPORTS_START _scheduleObservable,_schedulePromise,_scheduleArray,_scheduleIterable,_util_isInteropObservable,_util_isPromise,_util_isArrayLike,_util_isIterable PURE_IMPORTS_END */
    function scheduled(input, scheduler) {
        if (input != null) {
            if (isInteropObservable(input)) {
                return scheduleObservable(input, scheduler);
            }
            else if (isPromise(input)) {
                return schedulePromise(input, scheduler);
            }
            else if (isArrayLike(input)) {
                return scheduleArray(input, scheduler);
            }
            else if (isIterable(input) || typeof input === 'string') {
                return scheduleIterable(input, scheduler);
            }
        }
        throw new TypeError((input !== null && typeof input || input) + ' is not observable');
    }

    /** PURE_IMPORTS_START _Observable,_util_subscribeTo,_scheduled_scheduled PURE_IMPORTS_END */
    function from(input, scheduler) {
        if (!scheduler) {
            if (input instanceof Observable) {
                return input;
            }
            return new Observable(subscribeTo(input));
        }
        else {
            return scheduled(input, scheduler);
        }
    }

    /** PURE_IMPORTS_START tslib,_Subscriber,_Observable,_util_subscribeTo PURE_IMPORTS_END */
    var SimpleInnerSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(SimpleInnerSubscriber, _super);
        function SimpleInnerSubscriber(parent) {
            var _this = _super.call(this) || this;
            _this.parent = parent;
            return _this;
        }
        SimpleInnerSubscriber.prototype._next = function (value) {
            this.parent.notifyNext(value);
        };
        SimpleInnerSubscriber.prototype._error = function (error) {
            this.parent.notifyError(error);
            this.unsubscribe();
        };
        SimpleInnerSubscriber.prototype._complete = function () {
            this.parent.notifyComplete();
            this.unsubscribe();
        };
        return SimpleInnerSubscriber;
    }(Subscriber));
    var ComplexInnerSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(ComplexInnerSubscriber, _super);
        function ComplexInnerSubscriber(parent, outerValue, outerIndex) {
            var _this = _super.call(this) || this;
            _this.parent = parent;
            _this.outerValue = outerValue;
            _this.outerIndex = outerIndex;
            return _this;
        }
        ComplexInnerSubscriber.prototype._next = function (value) {
            this.parent.notifyNext(this.outerValue, value, this.outerIndex, this);
        };
        ComplexInnerSubscriber.prototype._error = function (error) {
            this.parent.notifyError(error);
            this.unsubscribe();
        };
        ComplexInnerSubscriber.prototype._complete = function () {
            this.parent.notifyComplete(this);
            this.unsubscribe();
        };
        return ComplexInnerSubscriber;
    }(Subscriber));
    var SimpleOuterSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(SimpleOuterSubscriber, _super);
        function SimpleOuterSubscriber() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SimpleOuterSubscriber.prototype.notifyNext = function (innerValue) {
            this.destination.next(innerValue);
        };
        SimpleOuterSubscriber.prototype.notifyError = function (err) {
            this.destination.error(err);
        };
        SimpleOuterSubscriber.prototype.notifyComplete = function () {
            this.destination.complete();
        };
        return SimpleOuterSubscriber;
    }(Subscriber));
    var ComplexOuterSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(ComplexOuterSubscriber, _super);
        function ComplexOuterSubscriber() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ComplexOuterSubscriber.prototype.notifyNext = function (_outerValue, innerValue, _outerIndex, _innerSub) {
            this.destination.next(innerValue);
        };
        ComplexOuterSubscriber.prototype.notifyError = function (error) {
            this.destination.error(error);
        };
        ComplexOuterSubscriber.prototype.notifyComplete = function (_innerSub) {
            this.destination.complete();
        };
        return ComplexOuterSubscriber;
    }(Subscriber));
    function innerSubscribe(result, innerSubscriber) {
        if (innerSubscriber.closed) {
            return undefined;
        }
        if (result instanceof Observable) {
            return result.subscribe(innerSubscriber);
        }
        var subscription;
        try {
            subscription = subscribeTo(result)(innerSubscriber);
        }
        catch (error) {
            innerSubscriber.error(error);
        }
        return subscription;
    }

    /** PURE_IMPORTS_START tslib,_map,_observable_from,_innerSubscribe PURE_IMPORTS_END */
    function mergeMap(project, resultSelector, concurrent) {
        if (concurrent === void 0) {
            concurrent = Number.POSITIVE_INFINITY;
        }
        if (typeof resultSelector === 'function') {
            return function (source) { return source.pipe(mergeMap(function (a, i) { return from(project(a, i)).pipe(map(function (b, ii) { return resultSelector(a, b, i, ii); })); }, concurrent)); };
        }
        else if (typeof resultSelector === 'number') {
            concurrent = resultSelector;
        }
        return function (source) { return source.lift(new MergeMapOperator(project, concurrent)); };
    }
    var MergeMapOperator = /*@__PURE__*/ (function () {
        function MergeMapOperator(project, concurrent) {
            if (concurrent === void 0) {
                concurrent = Number.POSITIVE_INFINITY;
            }
            this.project = project;
            this.concurrent = concurrent;
        }
        MergeMapOperator.prototype.call = function (observer, source) {
            return source.subscribe(new MergeMapSubscriber(observer, this.project, this.concurrent));
        };
        return MergeMapOperator;
    }());
    var MergeMapSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(MergeMapSubscriber, _super);
        function MergeMapSubscriber(destination, project, concurrent) {
            if (concurrent === void 0) {
                concurrent = Number.POSITIVE_INFINITY;
            }
            var _this = _super.call(this, destination) || this;
            _this.project = project;
            _this.concurrent = concurrent;
            _this.hasCompleted = false;
            _this.buffer = [];
            _this.active = 0;
            _this.index = 0;
            return _this;
        }
        MergeMapSubscriber.prototype._next = function (value) {
            if (this.active < this.concurrent) {
                this._tryNext(value);
            }
            else {
                this.buffer.push(value);
            }
        };
        MergeMapSubscriber.prototype._tryNext = function (value) {
            var result;
            var index = this.index++;
            try {
                result = this.project(value, index);
            }
            catch (err) {
                this.destination.error(err);
                return;
            }
            this.active++;
            this._innerSub(result);
        };
        MergeMapSubscriber.prototype._innerSub = function (ish) {
            var innerSubscriber = new SimpleInnerSubscriber(this);
            var destination = this.destination;
            destination.add(innerSubscriber);
            var innerSubscription = innerSubscribe(ish, innerSubscriber);
            if (innerSubscription !== innerSubscriber) {
                destination.add(innerSubscription);
            }
        };
        MergeMapSubscriber.prototype._complete = function () {
            this.hasCompleted = true;
            if (this.active === 0 && this.buffer.length === 0) {
                this.destination.complete();
            }
            this.unsubscribe();
        };
        MergeMapSubscriber.prototype.notifyNext = function (innerValue) {
            this.destination.next(innerValue);
        };
        MergeMapSubscriber.prototype.notifyComplete = function () {
            var buffer = this.buffer;
            this.active--;
            if (buffer.length > 0) {
                this._next(buffer.shift());
            }
            else if (this.active === 0 && this.hasCompleted) {
                this.destination.complete();
            }
        };
        return MergeMapSubscriber;
    }(SimpleOuterSubscriber));
    var flatMap = mergeMap;

    /** PURE_IMPORTS_START _mergeMap,_util_identity PURE_IMPORTS_END */
    function mergeAll(concurrent) {
        if (concurrent === void 0) {
            concurrent = Number.POSITIVE_INFINITY;
        }
        return mergeMap(identity, concurrent);
    }

    /** PURE_IMPORTS_START _mergeAll PURE_IMPORTS_END */
    function concatAll() {
        return mergeAll(1);
    }

    /** PURE_IMPORTS_START _of,_operators_concatAll PURE_IMPORTS_END */
    function concat$1() {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            observables[_i] = arguments[_i];
        }
        return concatAll()(of.apply(void 0, observables));
    }

    /** PURE_IMPORTS_START _Observable,_from,_empty PURE_IMPORTS_END */
    function defer(observableFactory) {
        return new Observable(function (subscriber) {
            var input;
            try {
                input = observableFactory();
            }
            catch (err) {
                subscriber.error(err);
                return undefined;
            }
            var source = input ? from(input) : empty();
            return source.subscribe(subscriber);
        });
    }

    /** PURE_IMPORTS_START _Observable,_util_isArray,_operators_map,_util_isObject,_from PURE_IMPORTS_END */
    function forkJoin() {
        var sources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            sources[_i] = arguments[_i];
        }
        if (sources.length === 1) {
            var first_1 = sources[0];
            if (isArray$1(first_1)) {
                return forkJoinInternal(first_1, null);
            }
            if (isObject(first_1) && Object.getPrototypeOf(first_1) === Object.prototype) {
                var keys = Object.keys(first_1);
                return forkJoinInternal(keys.map(function (key) { return first_1[key]; }), keys);
            }
        }
        if (typeof sources[sources.length - 1] === 'function') {
            var resultSelector_1 = sources.pop();
            sources = (sources.length === 1 && isArray$1(sources[0])) ? sources[0] : sources;
            return forkJoinInternal(sources, null).pipe(map(function (args) { return resultSelector_1.apply(void 0, args); }));
        }
        return forkJoinInternal(sources, null);
    }
    function forkJoinInternal(sources, keys) {
        return new Observable(function (subscriber) {
            var len = sources.length;
            if (len === 0) {
                subscriber.complete();
                return;
            }
            var values = new Array(len);
            var completed = 0;
            var emitted = 0;
            var _loop_1 = function (i) {
                var source = from(sources[i]);
                var hasValue = false;
                subscriber.add(source.subscribe({
                    next: function (value) {
                        if (!hasValue) {
                            hasValue = true;
                            emitted++;
                        }
                        values[i] = value;
                    },
                    error: function (err) { return subscriber.error(err); },
                    complete: function () {
                        completed++;
                        if (completed === len || !hasValue) {
                            if (emitted === len) {
                                subscriber.next(keys ?
                                    keys.reduce(function (result, key, i) { return (result[key] = values[i], result); }, {}) :
                                    values);
                            }
                            subscriber.complete();
                        }
                    }
                }));
            };
            for (var i = 0; i < len; i++) {
                _loop_1(i);
            }
        });
    }

    /** PURE_IMPORTS_START _Observable,_util_isArray,_util_isFunction,_operators_map PURE_IMPORTS_END */
    var toString = /*@__PURE__*/ (function () { return Object.prototype.toString; })();
    function fromEvent(target, eventName, options, resultSelector) {
        if (isFunction(options)) {
            resultSelector = options;
            options = undefined;
        }
        if (resultSelector) {
            return fromEvent(target, eventName, options).pipe(map(function (args) { return isArray$1(args) ? resultSelector.apply(void 0, args) : resultSelector(args); }));
        }
        return new Observable(function (subscriber) {
            function handler(e) {
                if (arguments.length > 1) {
                    subscriber.next(Array.prototype.slice.call(arguments));
                }
                else {
                    subscriber.next(e);
                }
            }
            setupSubscription(target, eventName, handler, subscriber, options);
        });
    }
    function setupSubscription(sourceObj, eventName, handler, subscriber, options) {
        var unsubscribe;
        if (isEventTarget(sourceObj)) {
            var source_1 = sourceObj;
            sourceObj.addEventListener(eventName, handler, options);
            unsubscribe = function () { return source_1.removeEventListener(eventName, handler, options); };
        }
        else if (isJQueryStyleEventEmitter(sourceObj)) {
            var source_2 = sourceObj;
            sourceObj.on(eventName, handler);
            unsubscribe = function () { return source_2.off(eventName, handler); };
        }
        else if (isNodeStyleEventEmitter(sourceObj)) {
            var source_3 = sourceObj;
            sourceObj.addListener(eventName, handler);
            unsubscribe = function () { return source_3.removeListener(eventName, handler); };
        }
        else if (sourceObj && sourceObj.length) {
            for (var i = 0, len = sourceObj.length; i < len; i++) {
                setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
            }
        }
        else {
            throw new TypeError('Invalid event target');
        }
        subscriber.add(unsubscribe);
    }
    function isNodeStyleEventEmitter(sourceObj) {
        return sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
    }
    function isJQueryStyleEventEmitter(sourceObj) {
        return sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
    }
    function isEventTarget(sourceObj) {
        return sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
    }

    /** PURE_IMPORTS_START _Observable,_util_isArray,_util_isFunction,_operators_map PURE_IMPORTS_END */
    function fromEventPattern(addHandler, removeHandler, resultSelector) {
        if (resultSelector) {
            return fromEventPattern(addHandler, removeHandler).pipe(map(function (args) { return isArray$1(args) ? resultSelector.apply(void 0, args) : resultSelector(args); }));
        }
        return new Observable(function (subscriber) {
            var handler = function () {
                var e = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    e[_i] = arguments[_i];
                }
                return subscriber.next(e.length === 1 ? e[0] : e);
            };
            var retValue;
            try {
                retValue = addHandler(handler);
            }
            catch (err) {
                subscriber.error(err);
                return undefined;
            }
            if (!isFunction(removeHandler)) {
                return undefined;
            }
            return function () { return removeHandler(handler, retValue); };
        });
    }

    /** PURE_IMPORTS_START _Observable,_util_identity,_util_isScheduler PURE_IMPORTS_END */
    function generate(initialStateOrOptions, condition, iterate, resultSelectorOrObservable, scheduler) {
        var resultSelector;
        var initialState;
        if (arguments.length == 1) {
            var options = initialStateOrOptions;
            initialState = options.initialState;
            condition = options.condition;
            iterate = options.iterate;
            resultSelector = options.resultSelector || identity;
            scheduler = options.scheduler;
        }
        else if (resultSelectorOrObservable === undefined || isScheduler(resultSelectorOrObservable)) {
            initialState = initialStateOrOptions;
            resultSelector = identity;
            scheduler = resultSelectorOrObservable;
        }
        else {
            initialState = initialStateOrOptions;
            resultSelector = resultSelectorOrObservable;
        }
        return new Observable(function (subscriber) {
            var state = initialState;
            if (scheduler) {
                return scheduler.schedule(dispatch$4, 0, {
                    subscriber: subscriber,
                    iterate: iterate,
                    condition: condition,
                    resultSelector: resultSelector,
                    state: state
                });
            }
            do {
                if (condition) {
                    var conditionResult = void 0;
                    try {
                        conditionResult = condition(state);
                    }
                    catch (err) {
                        subscriber.error(err);
                        return undefined;
                    }
                    if (!conditionResult) {
                        subscriber.complete();
                        break;
                    }
                }
                var value = void 0;
                try {
                    value = resultSelector(state);
                }
                catch (err) {
                    subscriber.error(err);
                    return undefined;
                }
                subscriber.next(value);
                if (subscriber.closed) {
                    break;
                }
                try {
                    state = iterate(state);
                }
                catch (err) {
                    subscriber.error(err);
                    return undefined;
                }
            } while (true);
            return undefined;
        });
    }
    function dispatch$4(state) {
        var subscriber = state.subscriber, condition = state.condition;
        if (subscriber.closed) {
            return undefined;
        }
        if (state.needIterate) {
            try {
                state.state = state.iterate(state.state);
            }
            catch (err) {
                subscriber.error(err);
                return undefined;
            }
        }
        else {
            state.needIterate = true;
        }
        if (condition) {
            var conditionResult = void 0;
            try {
                conditionResult = condition(state.state);
            }
            catch (err) {
                subscriber.error(err);
                return undefined;
            }
            if (!conditionResult) {
                subscriber.complete();
                return undefined;
            }
            if (subscriber.closed) {
                return undefined;
            }
        }
        var value;
        try {
            value = state.resultSelector(state.state);
        }
        catch (err) {
            subscriber.error(err);
            return undefined;
        }
        if (subscriber.closed) {
            return undefined;
        }
        subscriber.next(value);
        if (subscriber.closed) {
            return undefined;
        }
        return this.schedule(state);
    }

    /** PURE_IMPORTS_START _defer,_empty PURE_IMPORTS_END */
    function iif(condition, trueResult, falseResult) {
        if (trueResult === void 0) {
            trueResult = EMPTY;
        }
        if (falseResult === void 0) {
            falseResult = EMPTY;
        }
        return defer(function () { return condition() ? trueResult : falseResult; });
    }

    /** PURE_IMPORTS_START _isArray PURE_IMPORTS_END */
    function isNumeric(val) {
        return !isArray$1(val) && (val - parseFloat(val) + 1) >= 0;
    }

    /** PURE_IMPORTS_START _Observable,_scheduler_async,_util_isNumeric PURE_IMPORTS_END */
    function interval(period, scheduler) {
        if (period === void 0) {
            period = 0;
        }
        if (scheduler === void 0) {
            scheduler = async;
        }
        if (!isNumeric(period) || period < 0) {
            period = 0;
        }
        if (!scheduler || typeof scheduler.schedule !== 'function') {
            scheduler = async;
        }
        return new Observable(function (subscriber) {
            subscriber.add(scheduler.schedule(dispatch$3, period, { subscriber: subscriber, counter: 0, period: period }));
            return subscriber;
        });
    }
    function dispatch$3(state) {
        var subscriber = state.subscriber, counter = state.counter, period = state.period;
        subscriber.next(counter);
        this.schedule({ subscriber: subscriber, counter: counter + 1, period: period }, period);
    }

    /** PURE_IMPORTS_START _Observable,_util_isScheduler,_operators_mergeAll,_fromArray PURE_IMPORTS_END */
    function merge$1() {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            observables[_i] = arguments[_i];
        }
        var concurrent = Number.POSITIVE_INFINITY;
        var scheduler = null;
        var last = observables[observables.length - 1];
        if (isScheduler(last)) {
            scheduler = observables.pop();
            if (observables.length > 1 && typeof observables[observables.length - 1] === 'number') {
                concurrent = observables.pop();
            }
        }
        else if (typeof last === 'number') {
            concurrent = observables.pop();
        }
        if (scheduler === null && observables.length === 1 && observables[0] instanceof Observable) {
            return observables[0];
        }
        return mergeAll(concurrent)(fromArray(observables, scheduler));
    }

    /** PURE_IMPORTS_START _Observable,_util_noop PURE_IMPORTS_END */
    var NEVER = /*@__PURE__*/ new Observable(noop);
    function never() {
        return NEVER;
    }

    /** PURE_IMPORTS_START _Observable,_from,_util_isArray,_empty PURE_IMPORTS_END */
    function onErrorResumeNext$1() {
        var sources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            sources[_i] = arguments[_i];
        }
        if (sources.length === 0) {
            return EMPTY;
        }
        var first = sources[0], remainder = sources.slice(1);
        if (sources.length === 1 && isArray$1(first)) {
            return onErrorResumeNext$1.apply(void 0, first);
        }
        return new Observable(function (subscriber) {
            var subNext = function () { return subscriber.add(onErrorResumeNext$1.apply(void 0, remainder).subscribe(subscriber)); };
            return from(first).subscribe({
                next: function (value) { subscriber.next(value); },
                error: subNext,
                complete: subNext,
            });
        });
    }

    /** PURE_IMPORTS_START _Observable,_Subscription PURE_IMPORTS_END */
    function pairs(obj, scheduler) {
        if (!scheduler) {
            return new Observable(function (subscriber) {
                var keys = Object.keys(obj);
                for (var i = 0; i < keys.length && !subscriber.closed; i++) {
                    var key = keys[i];
                    if (obj.hasOwnProperty(key)) {
                        subscriber.next([key, obj[key]]);
                    }
                }
                subscriber.complete();
            });
        }
        else {
            return new Observable(function (subscriber) {
                var keys = Object.keys(obj);
                var subscription = new Subscription();
                subscription.add(scheduler.schedule(dispatch$2, 0, { keys: keys, index: 0, subscriber: subscriber, subscription: subscription, obj: obj }));
                return subscription;
            });
        }
    }
    function dispatch$2(state) {
        var keys = state.keys, index = state.index, subscriber = state.subscriber, subscription = state.subscription, obj = state.obj;
        if (!subscriber.closed) {
            if (index < keys.length) {
                var key = keys[index];
                subscriber.next([key, obj[key]]);
                subscription.add(this.schedule({ keys: keys, index: index + 1, subscriber: subscriber, subscription: subscription, obj: obj }));
            }
            else {
                subscriber.complete();
            }
        }
    }

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    function not(pred, thisArg) {
        function notPred() {
            return !(notPred.pred.apply(notPred.thisArg, arguments));
        }
        notPred.pred = pred;
        notPred.thisArg = thisArg;
        return notPred;
    }

    /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
    function filter(predicate, thisArg) {
        return function filterOperatorFunction(source) {
            return source.lift(new FilterOperator(predicate, thisArg));
        };
    }
    var FilterOperator = /*@__PURE__*/ (function () {
        function FilterOperator(predicate, thisArg) {
            this.predicate = predicate;
            this.thisArg = thisArg;
        }
        FilterOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
        };
        return FilterOperator;
    }());
    var FilterSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(FilterSubscriber, _super);
        function FilterSubscriber(destination, predicate, thisArg) {
            var _this = _super.call(this, destination) || this;
            _this.predicate = predicate;
            _this.thisArg = thisArg;
            _this.count = 0;
            return _this;
        }
        FilterSubscriber.prototype._next = function (value) {
            var result;
            try {
                result = this.predicate.call(this.thisArg, value, this.count++);
            }
            catch (err) {
                this.destination.error(err);
                return;
            }
            if (result) {
                this.destination.next(value);
            }
        };
        return FilterSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START _util_not,_util_subscribeTo,_operators_filter,_Observable PURE_IMPORTS_END */
    function partition$1(source, predicate, thisArg) {
        return [
            filter(predicate, thisArg)(new Observable(subscribeTo(source))),
            filter(not(predicate, thisArg))(new Observable(subscribeTo(source)))
        ];
    }

    /** PURE_IMPORTS_START tslib,_util_isArray,_fromArray,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */
    function race$1() {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            observables[_i] = arguments[_i];
        }
        if (observables.length === 1) {
            if (isArray$1(observables[0])) {
                observables = observables[0];
            }
            else {
                return observables[0];
            }
        }
        return fromArray(observables, undefined).lift(new RaceOperator());
    }
    var RaceOperator = /*@__PURE__*/ (function () {
        function RaceOperator() {
        }
        RaceOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new RaceSubscriber(subscriber));
        };
        return RaceOperator;
    }());
    var RaceSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(RaceSubscriber, _super);
        function RaceSubscriber(destination) {
            var _this = _super.call(this, destination) || this;
            _this.hasFirst = false;
            _this.observables = [];
            _this.subscriptions = [];
            return _this;
        }
        RaceSubscriber.prototype._next = function (observable) {
            this.observables.push(observable);
        };
        RaceSubscriber.prototype._complete = function () {
            var observables = this.observables;
            var len = observables.length;
            if (len === 0) {
                this.destination.complete();
            }
            else {
                for (var i = 0; i < len && !this.hasFirst; i++) {
                    var observable = observables[i];
                    var subscription = subscribeToResult(this, observable, undefined, i);
                    if (this.subscriptions) {
                        this.subscriptions.push(subscription);
                    }
                    this.add(subscription);
                }
                this.observables = null;
            }
        };
        RaceSubscriber.prototype.notifyNext = function (_outerValue, innerValue, outerIndex) {
            if (!this.hasFirst) {
                this.hasFirst = true;
                for (var i = 0; i < this.subscriptions.length; i++) {
                    if (i !== outerIndex) {
                        var subscription = this.subscriptions[i];
                        subscription.unsubscribe();
                        this.remove(subscription);
                    }
                }
                this.subscriptions = null;
            }
            this.destination.next(innerValue);
        };
        return RaceSubscriber;
    }(OuterSubscriber));

    /** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */
    function range(start, count, scheduler) {
        if (start === void 0) {
            start = 0;
        }
        return new Observable(function (subscriber) {
            if (count === undefined) {
                count = start;
                start = 0;
            }
            var index = 0;
            var current = start;
            if (scheduler) {
                return scheduler.schedule(dispatch$1, 0, {
                    index: index, count: count, start: start, subscriber: subscriber
                });
            }
            else {
                do {
                    if (index++ >= count) {
                        subscriber.complete();
                        break;
                    }
                    subscriber.next(current++);
                    if (subscriber.closed) {
                        break;
                    }
                } while (true);
            }
            return undefined;
        });
    }
    function dispatch$1(state) {
        var start = state.start, index = state.index, count = state.count, subscriber = state.subscriber;
        if (index >= count) {
            subscriber.complete();
            return;
        }
        subscriber.next(start);
        if (subscriber.closed) {
            return;
        }
        state.index = index + 1;
        state.start = start + 1;
        this.schedule(state);
    }

    /** PURE_IMPORTS_START _Observable,_scheduler_async,_util_isNumeric,_util_isScheduler PURE_IMPORTS_END */
    function timer(dueTime, periodOrScheduler, scheduler) {
        if (dueTime === void 0) {
            dueTime = 0;
        }
        var period = -1;
        if (isNumeric(periodOrScheduler)) {
            period = Number(periodOrScheduler) < 1 && 1 || Number(periodOrScheduler);
        }
        else if (isScheduler(periodOrScheduler)) {
            scheduler = periodOrScheduler;
        }
        if (!isScheduler(scheduler)) {
            scheduler = async;
        }
        return new Observable(function (subscriber) {
            var due = isNumeric(dueTime)
                ? dueTime
                : (+dueTime - scheduler.now());
            return scheduler.schedule(dispatch, due, {
                index: 0, period: period, subscriber: subscriber
            });
        });
    }
    function dispatch(state) {
        var index = state.index, period = state.period, subscriber = state.subscriber;
        subscriber.next(index);
        if (subscriber.closed) {
            return;
        }
        else if (period === -1) {
            return subscriber.complete();
        }
        state.index = index + 1;
        this.schedule(state, period);
    }

    /** PURE_IMPORTS_START _Observable,_from,_empty PURE_IMPORTS_END */
    function using(resourceFactory, observableFactory) {
        return new Observable(function (subscriber) {
            var resource;
            try {
                resource = resourceFactory();
            }
            catch (err) {
                subscriber.error(err);
                return undefined;
            }
            var result;
            try {
                result = observableFactory(resource);
            }
            catch (err) {
                subscriber.error(err);
                return undefined;
            }
            var source = result ? from(result) : EMPTY;
            var subscription = source.subscribe(subscriber);
            return function () {
                subscription.unsubscribe();
                if (resource) {
                    resource.unsubscribe();
                }
            };
        });
    }

    /** PURE_IMPORTS_START tslib,_fromArray,_util_isArray,_Subscriber,_.._internal_symbol_iterator,_innerSubscribe PURE_IMPORTS_END */
    function zip$1() {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            observables[_i] = arguments[_i];
        }
        var resultSelector = observables[observables.length - 1];
        if (typeof resultSelector === 'function') {
            observables.pop();
        }
        return fromArray(observables, undefined).lift(new ZipOperator(resultSelector));
    }
    var ZipOperator = /*@__PURE__*/ (function () {
        function ZipOperator(resultSelector) {
            this.resultSelector = resultSelector;
        }
        ZipOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new ZipSubscriber(subscriber, this.resultSelector));
        };
        return ZipOperator;
    }());
    var ZipSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(ZipSubscriber, _super);
        function ZipSubscriber(destination, resultSelector, values) {
            if (values === void 0) {
                values = Object.create(null);
            }
            var _this = _super.call(this, destination) || this;
            _this.resultSelector = resultSelector;
            _this.iterators = [];
            _this.active = 0;
            _this.resultSelector = (typeof resultSelector === 'function') ? resultSelector : undefined;
            return _this;
        }
        ZipSubscriber.prototype._next = function (value) {
            var iterators = this.iterators;
            if (isArray$1(value)) {
                iterators.push(new StaticArrayIterator(value));
            }
            else if (typeof value[iterator] === 'function') {
                iterators.push(new StaticIterator(value[iterator]()));
            }
            else {
                iterators.push(new ZipBufferIterator(this.destination, this, value));
            }
        };
        ZipSubscriber.prototype._complete = function () {
            var iterators = this.iterators;
            var len = iterators.length;
            this.unsubscribe();
            if (len === 0) {
                this.destination.complete();
                return;
            }
            this.active = len;
            for (var i = 0; i < len; i++) {
                var iterator = iterators[i];
                if (iterator.stillUnsubscribed) {
                    var destination = this.destination;
                    destination.add(iterator.subscribe());
                }
                else {
                    this.active--;
                }
            }
        };
        ZipSubscriber.prototype.notifyInactive = function () {
            this.active--;
            if (this.active === 0) {
                this.destination.complete();
            }
        };
        ZipSubscriber.prototype.checkIterators = function () {
            var iterators = this.iterators;
            var len = iterators.length;
            var destination = this.destination;
            for (var i = 0; i < len; i++) {
                var iterator = iterators[i];
                if (typeof iterator.hasValue === 'function' && !iterator.hasValue()) {
                    return;
                }
            }
            var shouldComplete = false;
            var args = [];
            for (var i = 0; i < len; i++) {
                var iterator = iterators[i];
                var result = iterator.next();
                if (iterator.hasCompleted()) {
                    shouldComplete = true;
                }
                if (result.done) {
                    destination.complete();
                    return;
                }
                args.push(result.value);
            }
            if (this.resultSelector) {
                this._tryresultSelector(args);
            }
            else {
                destination.next(args);
            }
            if (shouldComplete) {
                destination.complete();
            }
        };
        ZipSubscriber.prototype._tryresultSelector = function (args) {
            var result;
            try {
                result = this.resultSelector.apply(this, args);
            }
            catch (err) {
                this.destination.error(err);
                return;
            }
            this.destination.next(result);
        };
        return ZipSubscriber;
    }(Subscriber));
    var StaticIterator = /*@__PURE__*/ (function () {
        function StaticIterator(iterator) {
            this.iterator = iterator;
            this.nextResult = iterator.next();
        }
        StaticIterator.prototype.hasValue = function () {
            return true;
        };
        StaticIterator.prototype.next = function () {
            var result = this.nextResult;
            this.nextResult = this.iterator.next();
            return result;
        };
        StaticIterator.prototype.hasCompleted = function () {
            var nextResult = this.nextResult;
            return Boolean(nextResult && nextResult.done);
        };
        return StaticIterator;
    }());
    var StaticArrayIterator = /*@__PURE__*/ (function () {
        function StaticArrayIterator(array) {
            this.array = array;
            this.index = 0;
            this.length = 0;
            this.length = array.length;
        }
        StaticArrayIterator.prototype[iterator] = function () {
            return this;
        };
        StaticArrayIterator.prototype.next = function (value) {
            var i = this.index++;
            var array = this.array;
            return i < this.length ? { value: array[i], done: false } : { value: null, done: true };
        };
        StaticArrayIterator.prototype.hasValue = function () {
            return this.array.length > this.index;
        };
        StaticArrayIterator.prototype.hasCompleted = function () {
            return this.array.length === this.index;
        };
        return StaticArrayIterator;
    }());
    var ZipBufferIterator = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(ZipBufferIterator, _super);
        function ZipBufferIterator(destination, parent, observable) {
            var _this = _super.call(this, destination) || this;
            _this.parent = parent;
            _this.observable = observable;
            _this.stillUnsubscribed = true;
            _this.buffer = [];
            _this.isComplete = false;
            return _this;
        }
        ZipBufferIterator.prototype[iterator] = function () {
            return this;
        };
        ZipBufferIterator.prototype.next = function () {
            var buffer = this.buffer;
            if (buffer.length === 0 && this.isComplete) {
                return { value: null, done: true };
            }
            else {
                return { value: buffer.shift(), done: false };
            }
        };
        ZipBufferIterator.prototype.hasValue = function () {
            return this.buffer.length > 0;
        };
        ZipBufferIterator.prototype.hasCompleted = function () {
            return this.buffer.length === 0 && this.isComplete;
        };
        ZipBufferIterator.prototype.notifyComplete = function () {
            if (this.buffer.length > 0) {
                this.isComplete = true;
                this.parent.notifyInactive();
            }
            else {
                this.destination.complete();
            }
        };
        ZipBufferIterator.prototype.notifyNext = function (innerValue) {
            this.buffer.push(innerValue);
            this.parent.checkIterators();
        };
        ZipBufferIterator.prototype.subscribe = function () {
            return innerSubscribe(this.observable, new SimpleInnerSubscriber(this));
        };
        return ZipBufferIterator;
    }(SimpleOuterSubscriber));

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */

    var toStringFunction = Function.prototype.toString;
    var create = Object.create, defineProperty = Object.defineProperty, getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor, getOwnPropertyNames = Object.getOwnPropertyNames, getOwnPropertySymbols = Object.getOwnPropertySymbols, getPrototypeOf = Object.getPrototypeOf;
    var _a = Object.prototype, hasOwnProperty = _a.hasOwnProperty, propertyIsEnumerable = _a.propertyIsEnumerable;
    /**
     * @enum
     *
     * @const {Object} SUPPORTS
     *
     * @property {boolean} SYMBOL_PROPERTIES are symbol properties supported
     * @property {boolean} WEAKMAP is WeakMap supported
     */
    var SUPPORTS = {
        SYMBOL_PROPERTIES: typeof getOwnPropertySymbols === 'function',
        WEAKMAP: typeof WeakMap === 'function',
    };
    /**
     * @function createCache
     *
     * @description
     * get a new cache object to prevent circular references
     *
     * @returns the new cache object
     */
    var createCache = function () {
        if (SUPPORTS.WEAKMAP) {
            return new WeakMap();
        }
        // tiny implementation of WeakMap
        var object = create({
            has: function (key) { return !!~object._keys.indexOf(key); },
            set: function (key, value) {
                object._keys.push(key);
                object._values.push(value);
            },
            get: function (key) { return object._values[object._keys.indexOf(key)]; },
        });
        object._keys = [];
        object._values = [];
        return object;
    };
    /**
     * @function getCleanClone
     *
     * @description
     * get an empty version of the object with the same prototype it has
     *
     * @param object the object to build a clean clone from
     * @param realm the realm the object resides in
     * @returns the empty cloned object
     */
    var getCleanClone = function (object, realm) {
        if (!object.constructor) {
            return create(null);
        }
        var Constructor = object.constructor;
        var prototype = object.__proto__ || getPrototypeOf(object);
        if (Constructor === realm.Object) {
            return prototype === realm.Object.prototype ? {} : create(prototype);
        }
        if (~toStringFunction.call(Constructor).indexOf('[native code]')) {
            try {
                return new Constructor();
            }
            catch (_a) { }
        }
        return create(prototype);
    };
    /**
     * @function getObjectCloneLoose
     *
     * @description
     * get a copy of the object based on loose rules, meaning all enumerable keys
     * and symbols are copied, but property descriptors are not considered
     *
     * @param object the object to clone
     * @param realm the realm the object resides in
     * @param handleCopy the function that handles copying the object
     * @returns the copied object
     */
    var getObjectCloneLoose = function (object, realm, handleCopy, cache) {
        var clone = getCleanClone(object, realm);
        // set in the cache immediately to be able to reuse the object recursively
        cache.set(object, clone);
        for (var key in object) {
            if (hasOwnProperty.call(object, key)) {
                clone[key] = handleCopy(object[key], cache);
            }
        }
        if (SUPPORTS.SYMBOL_PROPERTIES) {
            var symbols = getOwnPropertySymbols(object);
            var length_1 = symbols.length;
            if (length_1) {
                for (var index = 0, symbol = void 0; index < length_1; index++) {
                    symbol = symbols[index];
                    if (propertyIsEnumerable.call(object, symbol)) {
                        clone[symbol] = handleCopy(object[symbol], cache);
                    }
                }
            }
        }
        return clone;
    };
    /**
     * @function getObjectCloneStrict
     *
     * @description
     * get a copy of the object based on strict rules, meaning all keys and symbols
     * are copied based on the original property descriptors
     *
     * @param object the object to clone
     * @param realm the realm the object resides in
     * @param handleCopy the function that handles copying the object
     * @returns the copied object
     */
    var getObjectCloneStrict = function (object, realm, handleCopy, cache) {
        var clone = getCleanClone(object, realm);
        // set in the cache immediately to be able to reuse the object recursively
        cache.set(object, clone);
        var properties = SUPPORTS.SYMBOL_PROPERTIES
            ? getOwnPropertyNames(object).concat(getOwnPropertySymbols(object))
            : getOwnPropertyNames(object);
        var length = properties.length;
        if (length) {
            for (var index = 0, property = void 0, descriptor = void 0; index < length; index++) {
                property = properties[index];
                if (property !== 'callee' && property !== 'caller') {
                    descriptor = getOwnPropertyDescriptor(object, property);
                    if (descriptor) {
                        // Only clone the value if actually a value, not a getter / setter.
                        if (!descriptor.get && !descriptor.set) {
                            descriptor.value = handleCopy(object[property], cache);
                        }
                        try {
                            defineProperty(clone, property, descriptor);
                        }
                        catch (error) {
                            // Tee above can fail on node in edge cases, so fall back to the loose assignment.
                            clone[property] = descriptor.value;
                        }
                    }
                    else {
                        // In extra edge cases where the property descriptor cannot be retrived, fall back to
                        // the loose assignment.
                        clone[property] = handleCopy(object[property], cache);
                    }
                }
            }
        }
        return clone;
    };
    /**
     * @function getRegExpFlags
     *
     * @description
     * get the flags to apply to the copied regexp
     *
     * @param regExp the regexp to get the flags of
     * @returns the flags for the regexp
     */
    var getRegExpFlags = function (regExp) {
        var flags = '';
        if (regExp.global) {
            flags += 'g';
        }
        if (regExp.ignoreCase) {
            flags += 'i';
        }
        if (regExp.multiline) {
            flags += 'm';
        }
        if (regExp.unicode) {
            flags += 'u';
        }
        if (regExp.sticky) {
            flags += 'y';
        }
        return flags;
    };
    // utils
    var isArray = Array.isArray;
    var GLOBAL_THIS = (function () {
        if (typeof self !== 'undefined') {
            return self;
        }
        if (typeof window !== 'undefined') {
            return window;
        }
        if (typeof global !== 'undefined') {
            return global;
        }
        if (console && console.error) {
            console.error('Unable to locate global object, returning "this".');
        }
    })();
    /**
     * @function copy
     *
     * @description
     * copy an object deeply as much as possible
     *
     * If `strict` is applied, then all properties (including non-enumerable ones)
     * are copied with their original property descriptors on both objects and arrays.
     *
     * The object is compared to the global constructors in the `realm` provided,
     * and the native constructor is always used to ensure that extensions of native
     * objects (allows in ES2015+) are maintained.
     *
     * @param object the object to copy
     * @param [options] the options for copying with
     * @param [options.isStrict] should the copy be strict
     * @param [options.realm] the realm (this) object the object is copied from
     * @returns the copied object
     */
    function copy(object, options) {
        // manually coalesced instead of default parameters for performance
        var isStrict = !!(options && options.isStrict);
        var realm = (options && options.realm) || GLOBAL_THIS;
        var getObjectClone = isStrict
            ? getObjectCloneStrict
            : getObjectCloneLoose;
        /**
         * @function handleCopy
         *
         * @description
         * copy the object recursively based on its type
         *
         * @param object the object to copy
         * @returns the copied object
         */
        var handleCopy = function (object, cache) {
            if (!object || typeof object !== 'object') {
                return object;
            }
            if (cache.has(object)) {
                return cache.get(object);
            }
            var Constructor = object.constructor;
            // plain objects
            if (Constructor === realm.Object) {
                return getObjectClone(object, realm, handleCopy, cache);
            }
            var clone;
            // arrays
            if (isArray(object)) {
                // if strict, include non-standard properties
                if (isStrict) {
                    return getObjectCloneStrict(object, realm, handleCopy, cache);
                }
                var length_1 = object.length;
                clone = new Constructor();
                cache.set(object, clone);
                for (var index = 0; index < length_1; index++) {
                    clone[index] = handleCopy(object[index], cache);
                }
                return clone;
            }
            // dates
            if (object instanceof realm.Date) {
                return new Constructor(object.getTime());
            }
            // regexps
            if (object instanceof realm.RegExp) {
                clone = new Constructor(object.source, object.flags || getRegExpFlags(object));
                clone.lastIndex = object.lastIndex;
                return clone;
            }
            // maps
            if (realm.Map && object instanceof realm.Map) {
                clone = new Constructor();
                cache.set(object, clone);
                object.forEach(function (value, key) {
                    clone.set(key, handleCopy(value, cache));
                });
                return clone;
            }
            // sets
            if (realm.Set && object instanceof realm.Set) {
                clone = new Constructor();
                cache.set(object, clone);
                object.forEach(function (value) {
                    clone.add(handleCopy(value, cache));
                });
                return clone;
            }
            // blobs
            if (realm.Blob && object instanceof realm.Blob) {
                return object.slice(0, object.size, object.type);
            }
            // buffers (node-only)
            if (realm.Buffer && realm.Buffer.isBuffer(object)) {
                clone = realm.Buffer.allocUnsafe
                    ? realm.Buffer.allocUnsafe(object.length)
                    : new Constructor(object.length);
                cache.set(object, clone);
                object.copy(clone);
                return clone;
            }
            // arraybuffers / dataviews
            if (realm.ArrayBuffer) {
                // dataviews
                if (realm.ArrayBuffer.isView(object)) {
                    clone = new Constructor(object.buffer.slice(0));
                    cache.set(object, clone);
                    return clone;
                }
                // arraybuffers
                if (object instanceof realm.ArrayBuffer) {
                    clone = object.slice(0);
                    cache.set(object, clone);
                    return clone;
                }
            }
            // if the object cannot / should not be cloned, don't
            if (
            // promise-like
            typeof object.then === 'function' ||
                // errors
                object instanceof Error ||
                // weakmaps
                (realm.WeakMap && object instanceof realm.WeakMap) ||
                // weaksets
                (realm.WeakSet && object instanceof realm.WeakSet)) {
                return object;
            }
            // assume anything left is a custom constructor
            return getObjectClone(object, realm, handleCopy, cache);
        };
        return handleCopy(object, createCache());
    }
    // Adding reference to allow usage in CommonJS libraries compiled using TSC, which
    // expects there to be a default property on the exported object. See
    // [#37](https://github.com/planttheidea/fast-copy/issues/37) for details.
    copy.default = copy;
    /**
     * @function strictCopy
     *
     * @description
     * copy the object with `strict` option pre-applied
     *
     * @param object the object to copy
     * @param [options] the options for copying with
     * @param [options.realm] the realm (this) object the object is copied from
     * @returns the copied object
     */
    copy.strict = function strictCopy(object, options) {
        return copy(object, {
            isStrict: true,
            realm: options ? options.realm : void 0,
        });
    };

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

    // Supported unit conversions. Key is the "from" and value is the "to" array
    var UNIT_CONVERSION = {
        kg: [{ unit: 'lbs', factor: 2.20462 }],
        lbs: [{ unit: 'kg', factor: 0.453592 }],
        '[in_i]': [{ unit: 'cm', factor: 2.54 }, { unit: 'm', factor: 0.0254 }]
    };

    var RuleEditorService = /** @class */ (function () {
        function RuleEditorService() {
            this.syntaxType = 'simple';
            this.uneditableVariablesChange = new Subject();
            this.variablesChange = new Subject();
            this.questionsChange = new Subject();
            this.mightBeScoreChange = new Subject();
            this.finalExpressionChange = new Subject();
            this.disableAdvancedChange = new Subject();
            this.needsAdvancedInterface = false;
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
         * Get the list of uneditable variables based on the FHIR Questionnaire
         * @param questionnaire - FHIR Questionnaire
         */
        RuleEditorService.prototype.getUneditableVariables = function (questionnaire) {
            var _this = this;
            if (Array.isArray(questionnaire.extension)) {
                return questionnaire.extension.reduce(function (accumulator, extension) {
                    var _a, _b;
                    if (extension.url === _this.LAUNCH_CONTEXT_URI && extension.extension) {
                        var uneditableVariable = {
                            name: extension.extension.find(function (e) { return e.url === 'name'; }).valueId,
                            type: (_a = extension.extension.filter(function (e) { return e.url === 'type'; })) === null || _a === void 0 ? void 0 : _a.map(function (e) { return e.valueCode; }).join('|'),
                            description: (_b = extension.extension.find(function (e) { return e.url === 'description'; })) === null || _b === void 0 ? void 0 : _b.valueString
                        };
                        accumulator.push(uneditableVariable);
                    }
                    return accumulator;
                }, []);
            }
            return [];
        };
        /**
         * Get and remove the variables from the FHIR object
         * @param questionnaire
         */
        RuleEditorService.prototype.extractVariables = function (questionnaire) {
            var _this = this;
            // Look at the top level fhirpath related extensions to populate the editable variables
            // TODO look at the focus item variables
            if (questionnaire.extension) {
                var variables_1 = [];
                var nonVariableExtensions_1 = [];
                // Add an index to each extension which we will then use to get the
                // variables back in the correct order. __$index will be removed on save
                questionnaire.extension = questionnaire.extension.map(function (e, i) { return (Object.assign(Object.assign({}, e), { __$index: i })); });
                questionnaire.extension.forEach(function (extension) {
                    if (extension.url === _this.VARIABLE_EXTENSION && extension.valueExpression) {
                        switch (extension.valueExpression.language) {
                            case _this.LANGUAGE_FHIRPATH:
                                var fhirPathVarToAdd = _this.processVariable(extension.valueExpression.name, extension.valueExpression.expression, extension.__$index, extension.valueExpression.extension);
                                if (fhirPathVarToAdd.type === 'expression') {
                                    _this.needsAdvancedInterface = true;
                                }
                                variables_1.push(fhirPathVarToAdd);
                                break;
                            case _this.LANGUAGE_FHIR_QUERY:
                                var queryVarToAdd = _this.processQueryVariable(extension.valueExpression.name, extension.valueExpression.expression, extension.__$index);
                                if (queryVarToAdd.type === 'query') {
                                    _this.needsAdvancedInterface = true;
                                }
                                variables_1.push(queryVarToAdd);
                                break;
                        }
                    }
                    else {
                        nonVariableExtensions_1.push(extension);
                    }
                });
                // Remove the variables so they can be re-added on export
                questionnaire.extension = nonVariableExtensions_1;
                return variables_1;
            }
            return [];
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
         * @param questionnaire - FHIR Questionnaire
         * @param linkIdContext - linkId to exclude from calculation
         * @return number of score questions on the questionnaire
         */
        RuleEditorService.prototype.getScoreQuestionCount = function (questionnaire, linkIdContext) {
            var _this = this;
            var scoreQuestions = 0;
            questionnaire.item.forEach(function (item) {
                if (_this.itemHasScore(item)) {
                    scoreQuestions++;
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
            this.linkIdContext = linkIdContext; // TODO change notification for linkId?
            this.fhir = copy(questionnaire);
            var loadSuccess = false;
            if (this.fhir.resourceType === 'Questionnaire' && this.fhir.item && this.fhir.item.length) {
                // If there is at least one score question we will ask the user if they
                // want to calculate the score
                var SCORE_MIN_QUESTIONS = 1;
                this.mightBeScore = this.getScoreQuestionCount(this.fhir, linkIdContext) > SCORE_MIN_QUESTIONS;
                this.mightBeScoreChange.next(this.mightBeScore);
                this.uneditableVariables = this.getUneditableVariables(this.fhir);
                this.uneditableVariablesChange.next(this.uneditableVariables);
                this.linkIdToQuestion = {};
                this.needsAdvancedInterface = false;
                this.processItem(this.fhir.item);
                this.variables = this.extractVariables(this.fhir);
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
                    this.questions.push({
                        linkId: e.linkId,
                        text: text.length > MAX_Q_LEN ? text.substring(0, MAX_Q_LEN) + '...' : text,
                        unit: this.getQuestionUnits(e.linkId)
                    });
                }
                this.questionsChange.next(this.questions);
                var expression = this.extractExpression(expressionUri, this.fhir.item, linkIdContext);
                if (expression !== null) {
                    // @ts-ignore
                    this.finalExpression = expression.valueExpression.expression;
                    this.caseStatements = this.finalExpression.match(CASE_REGEX) !== null;
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
                }
                this.finalExpressionChange.next(this.finalExpression);
                loadSuccess = true;
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
            var e_1, _c;
            var _this = this;
            try {
                for (var items_1 = tslib_1.__values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                    var item = items_1_1.value;
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
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (items_1_1 && !items_1_1.done && (_c = items_1.return)) _c.call(items_1);
                }
                finally { if (e_1) throw e_1.error; }
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
                    if (UNIT_CONVERSION.hasOwnProperty(sourceUnits)) {
                        var conversions = UNIT_CONVERSION[sourceUnits];
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
            var e_2, _c, e_3, _d;
            // All letters which can be used for a simple variable name
            var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
            // First pass is with a single character variable name. Other passes are with two
            var firstLetterAlphabet = [''].concat(alphabet);
            try {
                for (var firstLetterAlphabet_1 = tslib_1.__values(firstLetterAlphabet), firstLetterAlphabet_1_1 = firstLetterAlphabet_1.next(); !firstLetterAlphabet_1_1.done; firstLetterAlphabet_1_1 = firstLetterAlphabet_1.next()) {
                    var firstLetter = firstLetterAlphabet_1_1.value;
                    var _loop_1 = function (secondLetter) {
                        var potentialName = firstLetter + secondLetter;
                        var count = existingNames.filter(function (e) { return e === potentialName; });
                        if (count.length === 0) {
                            return { value: potentialName };
                        }
                    };
                    try {
                        for (var alphabet_1 = (e_3 = void 0, tslib_1.__values(alphabet)), alphabet_1_1 = alphabet_1.next(); !alphabet_1_1.done; alphabet_1_1 = alphabet_1.next()) {
                            var secondLetter = alphabet_1_1.value;
                            var state_1 = _loop_1(secondLetter);
                            if (typeof state_1 === "object")
                                return state_1.value;
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (alphabet_1_1 && !alphabet_1_1.done && (_d = alphabet_1.return)) _d.call(alphabet_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (firstLetterAlphabet_1_1 && !firstLetterAlphabet_1_1.done && (_c = firstLetterAlphabet_1.return)) _c.call(firstLetterAlphabet_1);
                }
                finally { if (e_2) throw e_2.error; }
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
            // TODO support for different variable scopes
            // Copy the fhir object so we can export more than once
            // (if we add our data the second export will have duplicates)
            var fhir = copy(this.fhir);
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
            if (fhir.extension) {
                // Introduce variables present before
                fhir.extension = fhir.extension.concat(variablesPresentInitially);
                // Sort by index
                fhir.extension.sort(function (a, b) { return a.__$index - b.__$index; });
                // Add variables added by the user
                fhir.extension = fhir.extension.concat(variablesAdded);
            }
            else {
                fhir.extension = variablesPresentInitially.concat(variablesAdded);
            }
            // Remove __$index
            fhir.extension = fhir.extension.map(function (_a) {
                var __$index = _a.__$index, other = tslib_1.__rest(_a, ["__$index"]);
                return other;
            });
            var finalExpressionExtension = {
                url: url,
                valueExpression: {
                    language: this.LANGUAGE_FHIRPATH,
                    expression: finalExpression
                }
            };
            // TODO keep existing extensions
            if (this.syntaxType === 'simple') {
                finalExpressionExtension.valueExpression.extension = [{
                        url: this.SIMPLE_SYNTAX_EXTENSION,
                        valueString: this.simpleExpression
                    }];
            }
            this.insertExtensions(fhir.item, this.linkIdContext, [finalExpressionExtension]);
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
                    var name = 'patient';
                    var type = 'Patient';
                    var description = 'For filling in patient information as the subject for the form';
                    fhir.extension.push({
                        url: this.LAUNCH_CONTEXT_URI,
                        extension: [
                            { url: 'name', valueId: name },
                            { url: 'type', valueCode: type },
                            { url: 'description', valueString: description }
                        ]
                    });
                    this.uneditableVariables.push({
                        name: name,
                        type: type,
                        description: description
                    });
                    this.uneditableVariablesChange.next(this.uneditableVariables);
                }
            }
            return fhir;
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
         * Given the current FHIR questionnaire definition and a linkId return a new FHIR
         * Questionnaire with a calculated expression at the given linkId which sums up
         * all the ordinal values in the questionnaire
         */
        RuleEditorService.prototype.addSumOfScores = function () {
            var _this = this;
            var fhir = this.fhir;
            var linkIdContext = this.linkIdContext;
            var variableNames = [];
            var scoreQuestionLinkIds = [];
            // Get an array of linkIds for score questions
            fhir.item.forEach(function (item) {
                if (item.linkId !== linkIdContext && _this.itemHasScore(item)) {
                    scoreQuestionLinkIds.push(item.linkId);
                }
            });
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
            this.insertExtensions(fhir.item, linkIdContext, scoreQuestions);
            return fhir;
        };
        /**
         * Checks if the referenced Questionnaire item is a score calculation added by
         * the Rule Editor
         * @param questionnaire - FHIR Questionnaire
         * @param linkId - Questionnaire item Link ID to check
         * @return True if the question at linkId is a score calculation created by
         * the Rule Editor, false otherwise
         */
        RuleEditorService.prototype.isScoreCalculation = function (questionnaire, linkId) {
            var _this = this;
            var checkForScore = function (item) {
                if (linkId === item.linkId) {
                    var isScore = item.extension.find(function (extension) { return !!_this.isScoreExtension(extension); });
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
                    item.extension = item.extension.filter(function (extension) { return !_this.isScoreExtension(extension); });
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
        RuleEditorService.prototype.isScoreExtension = function (extension) {
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
        RuleEditorService.prototype.insertExtensions = function (items, linkId, extensions) {
            var e_4, _c;
            try {
                for (var items_2 = tslib_1.__values(items), items_2_1 = items_2.next(); !items_2_1.done; items_2_1 = items_2.next()) {
                    var item = items_2_1.value;
                    if (item.linkId === linkId) {
                        if (item.extension) {
                            item.extension = item.extension.concat(extensions);
                        }
                        else {
                            item.extension = extensions;
                        }
                        break;
                    }
                    else if (item.item) {
                        this.insertExtensions(item.item, linkId, extensions);
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (items_2_1 && !items_2_1.done && (_c = items_2.return)) _c.call(items_2);
                }
                finally { if (e_4) throw e_4.error; }
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
                var factor = UNIT_CONVERSION[unit].find(function (e) { return e.unit === toUnit; }).factor;
                return "%resource.item.where(linkId='" + linkId + "').answer.value*" + factor;
            }
            else {
                return "%resource.item.where(linkId='" + linkId + "').answer.value";
            }
        };
        return RuleEditorService;
    }());
    RuleEditorService.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function RuleEditorService_Factory() { return new RuleEditorService(); }, token: RuleEditorService, providedIn: "root" });
    RuleEditorService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    RuleEditorService.ctorParameters = function () { return []; };

    var RuleEditorComponent = /** @class */ (function () {
        function RuleEditorComponent(variableService, liveAnnouncer) {
            this.variableService = variableService;
            this.liveAnnouncer = liveAnnouncer;
            this.advancedInterface = false;
            this.fhirQuestionnaire = null;
            this.itemLinkId = null;
            this.submitButtonName = 'Submit';
            this.titleName = 'Rule Editor';
            this.expressionLabel = 'Final Expression';
            this.expressionUri = 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression';
            this.lhcStyle = {};
            this.save = new i0.EventEmitter();
            this.errorLoading = 'Could not detect a FHIR Questionnaire; please try a different file.';
            this.datePipe = new common.DatePipe('en-US');
            this.suggestions = [];
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
        RuleEditorComponent.prototype.ngDestroy = function () {
            this.calculateSumSubscription.unsubscribe();
            this.finalExpressionSubscription.unsubscribe();
            this.variablesSubscription.unsubscribe();
            this.disableAdvancedSubscription.unsubscribe();
        };
        /**
         * Angular lifecycle hook called on input changes
         */
        RuleEditorComponent.prototype.ngOnChanges = function (args) {
            this.reload();
        };
        /**
         * Re-import fhir and context and show the form
         */
        RuleEditorComponent.prototype.reload = function () {
            if (this.fhirQuestionnaire !== null && this.itemLinkId !== null) {
                this.loadError = !this.variableService.import(this.expressionUri, this.fhirQuestionnaire, this.itemLinkId);
                if (this.loadError) {
                    this.liveAnnouncer.announce(this.errorLoading);
                }
                this.disableInterfaceToggle = this.variableService.needsAdvancedInterface;
                this.advancedInterface = this.variableService.needsAdvancedInterface;
            }
            this.simpleExpression = this.variableService.simpleExpression;
            this.linkIdContext = this.variableService.linkIdContext;
            this.expressionSyntax = this.variableService.syntaxType;
            this.caseStatements = this.variableService.caseStatements;
            this.calculateSum = this.variableService.mightBeScore;
            this.finalExpression = this.variableService.finalExpression;
            this.variables = this.variableService.variables.map(function (e) { return e.label; });
        };
        /**
         * Export FHIR Questionnaire and download as a file
         */
        RuleEditorComponent.prototype.export = function () {
            this.save.emit(this.variableService.export(this.expressionUri, this.finalExpression));
        };
        /**
         * Create a new instance of a FHIR questionnaire file by summing all ordinal
         * values
         */
        RuleEditorComponent.prototype.addSumOfScores = function () {
            this.save.emit(this.variableService.addSumOfScores());
        };
        /**
         * Called when the syntax type is changed to clean up expressions if the data cannot be converted
         * @param $event - event from from the caller
         */
        RuleEditorComponent.prototype.onSyntaxChange = function ($event) {
            var newSyntax = $event.value;
            // Clear the existing expression if switching away from fhirpath
            if (newSyntax === 'simple') {
                this.finalExpression = '';
            }
            this.variableService.syntaxType = newSyntax;
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
        return RuleEditorComponent;
    }());
    RuleEditorComponent.decorators = [
        { type: i0.Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'lhc-rule-editor',
                    template: "<div *ngIf=\"loadError\" class=\"error\">{{errorLoading}}</div>\n<lhc-calculate-sum-prompt *ngIf=\"calculateSum && !loadError\" (export)=\"addSumOfScores()\" [lhcStyle]=\"lhcStyle\"></lhc-calculate-sum-prompt>\n<div *ngIf=\"!calculateSum && !loadError\">\n  <h1 [style]=\"lhcStyle.h1\">{{titleName}}</h1>\n\n  <span class=\"checkbox\" matTooltip=\"When in the advanced interface you can edit FHIRPath and x-fhir-query directly. This mode is automatically enabled for complex Questionnaires.\">\n    <input type=\"checkbox\" id=\"advanced-interface\" [disabled]=\"disableInterfaceToggle\"\n           [(ngModel)]=\"advancedInterface\">\n    <label for=\"advanced-interface\">Advanced interface</label>\n  </span>\n\n  <section id=\"uneditable-variables-section\" class=\"mb-3\">\n    <lhc-uneditable-variables></lhc-uneditable-variables>\n  </section>\n\n  <section id=\"variables-section\" class=\"mb-3\">\n    <lhc-variables [lhcStyle]=\"lhcStyle\" [advancedInterface]=\"advancedInterface\"></lhc-variables>\n  </section>\n\n  <section id=\"final-expression-section\" class=\"mb-3\">\n    <h2 [style]=\"lhcStyle.h2\">{{expressionLabel}}</h2>\n\n    <div class=\"checkbox\">\n      <input type=\"checkbox\" id=\"case-statements\" [(ngModel)]=\"caseStatements\">\n      <label for=\"case-statements\">Use case statements</label>\n    </div>\n\n    <div class=\"flex-container\">\n      <div class=\"expression-type\" *ngIf=\"advancedInterface\">\n        <select class=\"form-control\" [(ngModel)]=\"expressionSyntax\" (change)=\"onTypeChange($event)\" aria-label=\"Expression syntax type\" [ngStyle]=\"lhcStyle.select\">\n          <option value=\"simple\">Easy Path Expression</option>\n          <option value=\"fhirpath\">FHIRPath Expression</option>\n        </select>\n      </div>\n      <div *ngIf=\"!caseStatements\" class=\"expression\" [ngSwitch]=\"expressionSyntax\">\n        <lhc-syntax-converter\n          *ngSwitchCase=\"'simple'\"\n          [simple]=\"simpleExpression\"\n          [variables]=\"variables\"\n          (expressionChange)=\"updateFinalExpression($event)\"\n          (simpleChange)=\"updateSimpleExpression($event)\"\n          [lhcStyle]=\"lhcStyle\"></lhc-syntax-converter>\n        <input type=\"text\" aria-label=\"FHIRPath\" *ngSwitchCase=\"'fhirpath'\" id=\"final-expression\" class=\"form-control\" [(ngModel)]=\"finalExpression\" [ngStyle]=\"lhcStyle.input\">\n      </div>\n      <lhc-case-statements\n        *ngIf=\"caseStatements\"\n        [syntax]=\"expressionSyntax\"\n        [simpleExpression]=\"simpleExpression\"\n        [expression]=\"finalExpression\"\n        [lhcStyle]=\"lhcStyle\"\n        (expressionChange)=\"updateFinalExpression($event)\"\n        (simpleChange)=\"updateSimpleExpression($event)\">\n      </lhc-case-statements>\n    </div>\n  </section>\n\n  <button class=\"primary\" (click)=\"export()\" [ngStyle]=\"lhcStyle.buttonPrimary\" id=\"export\">{{submitButtonName}}</button>\n</div>\n",
                    styles: [".toolbar-button{height:2.7rem}.file-import{width:4.6rem;color:transparent}.file-import::-webkit-file-upload-button{visibility:hidden}.file-import:before{content:\"Import\";display:inline-block;cursor:pointer;color:#fff}mat-radio-button{margin-left:1em}h1{margin-top:0}.flex-container{display:flex;flex-wrap:wrap;flex-direction:row}.expression,.expression-type{display:flex;padding:.5rem}.expression-type{flex:0 0 15em}.expression{flex:1 0 30em;min-width:0}input[type=text],select{height:2rem;font-size:1rem;width:100%;margin-bottom:.5rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}button{height:2.5rem;border:none;border-radius:4px;padding:0 2em;font-size:1rem}.primary{background-color:#00f;color:#fff}lhc-case-statements{flex:100%;padding:.5rem}.checkbox{padding:.5rem}@media (max-width:975px){.flex-container{flex-direction:column}.expression,.expression-type{flex:100%}}"]
                },] }
    ];
    RuleEditorComponent.ctorParameters = function () { return [
        { type: RuleEditorService },
        { type: a11y.LiveAnnouncer }
    ]; };
    RuleEditorComponent.propDecorators = {
        advancedInterface: [{ type: i0.Input }],
        fhirQuestionnaire: [{ type: i0.Input }],
        itemLinkId: [{ type: i0.Input }],
        submitButtonName: [{ type: i0.Input }],
        titleName: [{ type: i0.Input }],
        expressionLabel: [{ type: i0.Input }],
        expressionUri: [{ type: i0.Input }],
        lhcStyle: [{ type: i0.Input }],
        save: [{ type: i0.Output }]
    };

    /** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */
    function audit(durationSelector) {
        return function auditOperatorFunction(source) {
            return source.lift(new AuditOperator(durationSelector));
        };
    }
    var AuditOperator = /*@__PURE__*/ (function () {
        function AuditOperator(durationSelector) {
            this.durationSelector = durationSelector;
        }
        AuditOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new AuditSubscriber(subscriber, this.durationSelector));
        };
        return AuditOperator;
    }());
    var AuditSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(AuditSubscriber, _super);
        function AuditSubscriber(destination, durationSelector) {
            var _this = _super.call(this, destination) || this;
            _this.durationSelector = durationSelector;
            _this.hasValue = false;
            return _this;
        }
        AuditSubscriber.prototype._next = function (value) {
            this.value = value;
            this.hasValue = true;
            if (!this.throttled) {
                var duration = void 0;
                try {
                    var durationSelector = this.durationSelector;
                    duration = durationSelector(value);
                }
                catch (err) {
                    return this.destination.error(err);
                }
                var innerSubscription = innerSubscribe(duration, new SimpleInnerSubscriber(this));
                if (!innerSubscription || innerSubscription.closed) {
                    this.clearThrottle();
                }
                else {
                    this.add(this.throttled = innerSubscription);
                }
            }
        };
        AuditSubscriber.prototype.clearThrottle = function () {
            var _a = this, value = _a.value, hasValue = _a.hasValue, throttled = _a.throttled;
            if (throttled) {
                this.remove(throttled);
                this.throttled = undefined;
                throttled.unsubscribe();
            }
            if (hasValue) {
                this.value = undefined;
                this.hasValue = false;
                this.destination.next(value);
            }
        };
        AuditSubscriber.prototype.notifyNext = function () {
            this.clearThrottle();
        };
        AuditSubscriber.prototype.notifyComplete = function () {
            this.clearThrottle();
        };
        return AuditSubscriber;
    }(SimpleOuterSubscriber));

    /** PURE_IMPORTS_START _scheduler_async,_audit,_observable_timer PURE_IMPORTS_END */
    function auditTime(duration, scheduler) {
        if (scheduler === void 0) {
            scheduler = async;
        }
        return audit(function () { return timer(duration, scheduler); });
    }

    /** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */
    function buffer(closingNotifier) {
        return function bufferOperatorFunction(source) {
            return source.lift(new BufferOperator(closingNotifier));
        };
    }
    var BufferOperator = /*@__PURE__*/ (function () {
        function BufferOperator(closingNotifier) {
            this.closingNotifier = closingNotifier;
        }
        BufferOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new BufferSubscriber(subscriber, this.closingNotifier));
        };
        return BufferOperator;
    }());
    var BufferSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(BufferSubscriber, _super);
        function BufferSubscriber(destination, closingNotifier) {
            var _this = _super.call(this, destination) || this;
            _this.buffer = [];
            _this.add(innerSubscribe(closingNotifier, new SimpleInnerSubscriber(_this)));
            return _this;
        }
        BufferSubscriber.prototype._next = function (value) {
            this.buffer.push(value);
        };
        BufferSubscriber.prototype.notifyNext = function () {
            var buffer = this.buffer;
            this.buffer = [];
            this.destination.next(buffer);
        };
        return BufferSubscriber;
    }(SimpleOuterSubscriber));

    /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
    function bufferCount(bufferSize, startBufferEvery) {
        if (startBufferEvery === void 0) {
            startBufferEvery = null;
        }
        return function bufferCountOperatorFunction(source) {
            return source.lift(new BufferCountOperator(bufferSize, startBufferEvery));
        };
    }
    var BufferCountOperator = /*@__PURE__*/ (function () {
        function BufferCountOperator(bufferSize, startBufferEvery) {
            this.bufferSize = bufferSize;
            this.startBufferEvery = startBufferEvery;
            if (!startBufferEvery || bufferSize === startBufferEvery) {
                this.subscriberClass = BufferCountSubscriber;
            }
            else {
                this.subscriberClass = BufferSkipCountSubscriber;
            }
        }
        BufferCountOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new this.subscriberClass(subscriber, this.bufferSize, this.startBufferEvery));
        };
        return BufferCountOperator;
    }());
    var BufferCountSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(BufferCountSubscriber, _super);
        function BufferCountSubscriber(destination, bufferSize) {
            var _this = _super.call(this, destination) || this;
            _this.bufferSize = bufferSize;
            _this.buffer = [];
            return _this;
        }
        BufferCountSubscriber.prototype._next = function (value) {
            var buffer = this.buffer;
            buffer.push(value);
            if (buffer.length == this.bufferSize) {
                this.destination.next(buffer);
                this.buffer = [];
            }
        };
        BufferCountSubscriber.prototype._complete = function () {
            var buffer = this.buffer;
            if (buffer.length > 0) {
                this.destination.next(buffer);
            }
            _super.prototype._complete.call(this);
        };
        return BufferCountSubscriber;
    }(Subscriber));
    var BufferSkipCountSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(BufferSkipCountSubscriber, _super);
        function BufferSkipCountSubscriber(destination, bufferSize, startBufferEvery) {
            var _this = _super.call(this, destination) || this;
            _this.bufferSize = bufferSize;
            _this.startBufferEvery = startBufferEvery;
            _this.buffers = [];
            _this.count = 0;
            return _this;
        }
        BufferSkipCountSubscriber.prototype._next = function (value) {
            var _a = this, bufferSize = _a.bufferSize, startBufferEvery = _a.startBufferEvery, buffers = _a.buffers, count = _a.count;
            this.count++;
            if (count % startBufferEvery === 0) {
                buffers.push([]);
            }
            for (var i = buffers.length; i--;) {
                var buffer = buffers[i];
                buffer.push(value);
                if (buffer.length === bufferSize) {
                    buffers.splice(i, 1);
                    this.destination.next(buffer);
                }
            }
        };
        BufferSkipCountSubscriber.prototype._complete = function () {
            var _a = this, buffers = _a.buffers, destination = _a.destination;
            while (buffers.length > 0) {
                var buffer = buffers.shift();
                if (buffer.length > 0) {
                    destination.next(buffer);
                }
            }
            _super.prototype._complete.call(this);
        };
        return BufferSkipCountSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START tslib,_scheduler_async,_Subscriber,_util_isScheduler PURE_IMPORTS_END */
    function bufferTime(bufferTimeSpan) {
        var length = arguments.length;
        var scheduler = async;
        if (isScheduler(arguments[arguments.length - 1])) {
            scheduler = arguments[arguments.length - 1];
            length--;
        }
        var bufferCreationInterval = null;
        if (length >= 2) {
            bufferCreationInterval = arguments[1];
        }
        var maxBufferSize = Number.POSITIVE_INFINITY;
        if (length >= 3) {
            maxBufferSize = arguments[2];
        }
        return function bufferTimeOperatorFunction(source) {
            return source.lift(new BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler));
        };
    }
    var BufferTimeOperator = /*@__PURE__*/ (function () {
        function BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler) {
            this.bufferTimeSpan = bufferTimeSpan;
            this.bufferCreationInterval = bufferCreationInterval;
            this.maxBufferSize = maxBufferSize;
            this.scheduler = scheduler;
        }
        BufferTimeOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new BufferTimeSubscriber(subscriber, this.bufferTimeSpan, this.bufferCreationInterval, this.maxBufferSize, this.scheduler));
        };
        return BufferTimeOperator;
    }());
    var Context = /*@__PURE__*/ (function () {
        function Context() {
            this.buffer = [];
        }
        return Context;
    }());
    var BufferTimeSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(BufferTimeSubscriber, _super);
        function BufferTimeSubscriber(destination, bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler) {
            var _this = _super.call(this, destination) || this;
            _this.bufferTimeSpan = bufferTimeSpan;
            _this.bufferCreationInterval = bufferCreationInterval;
            _this.maxBufferSize = maxBufferSize;
            _this.scheduler = scheduler;
            _this.contexts = [];
            var context = _this.openContext();
            _this.timespanOnly = bufferCreationInterval == null || bufferCreationInterval < 0;
            if (_this.timespanOnly) {
                var timeSpanOnlyState = { subscriber: _this, context: context, bufferTimeSpan: bufferTimeSpan };
                _this.add(context.closeAction = scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
            }
            else {
                var closeState = { subscriber: _this, context: context };
                var creationState = { bufferTimeSpan: bufferTimeSpan, bufferCreationInterval: bufferCreationInterval, subscriber: _this, scheduler: scheduler };
                _this.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, closeState));
                _this.add(scheduler.schedule(dispatchBufferCreation, bufferCreationInterval, creationState));
            }
            return _this;
        }
        BufferTimeSubscriber.prototype._next = function (value) {
            var contexts = this.contexts;
            var len = contexts.length;
            var filledBufferContext;
            for (var i = 0; i < len; i++) {
                var context_1 = contexts[i];
                var buffer = context_1.buffer;
                buffer.push(value);
                if (buffer.length == this.maxBufferSize) {
                    filledBufferContext = context_1;
                }
            }
            if (filledBufferContext) {
                this.onBufferFull(filledBufferContext);
            }
        };
        BufferTimeSubscriber.prototype._error = function (err) {
            this.contexts.length = 0;
            _super.prototype._error.call(this, err);
        };
        BufferTimeSubscriber.prototype._complete = function () {
            var _a = this, contexts = _a.contexts, destination = _a.destination;
            while (contexts.length > 0) {
                var context_2 = contexts.shift();
                destination.next(context_2.buffer);
            }
            _super.prototype._complete.call(this);
        };
        BufferTimeSubscriber.prototype._unsubscribe = function () {
            this.contexts = null;
        };
        BufferTimeSubscriber.prototype.onBufferFull = function (context) {
            this.closeContext(context);
            var closeAction = context.closeAction;
            closeAction.unsubscribe();
            this.remove(closeAction);
            if (!this.closed && this.timespanOnly) {
                context = this.openContext();
                var bufferTimeSpan = this.bufferTimeSpan;
                var timeSpanOnlyState = { subscriber: this, context: context, bufferTimeSpan: bufferTimeSpan };
                this.add(context.closeAction = this.scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
            }
        };
        BufferTimeSubscriber.prototype.openContext = function () {
            var context = new Context();
            this.contexts.push(context);
            return context;
        };
        BufferTimeSubscriber.prototype.closeContext = function (context) {
            this.destination.next(context.buffer);
            var contexts = this.contexts;
            var spliceIndex = contexts ? contexts.indexOf(context) : -1;
            if (spliceIndex >= 0) {
                contexts.splice(contexts.indexOf(context), 1);
            }
        };
        return BufferTimeSubscriber;
    }(Subscriber));
    function dispatchBufferTimeSpanOnly(state) {
        var subscriber = state.subscriber;
        var prevContext = state.context;
        if (prevContext) {
            subscriber.closeContext(prevContext);
        }
        if (!subscriber.closed) {
            state.context = subscriber.openContext();
            state.context.closeAction = this.schedule(state, state.bufferTimeSpan);
        }
    }
    function dispatchBufferCreation(state) {
        var bufferCreationInterval = state.bufferCreationInterval, bufferTimeSpan = state.bufferTimeSpan, subscriber = state.subscriber, scheduler = state.scheduler;
        var context = subscriber.openContext();
        var action = this;
        if (!subscriber.closed) {
            subscriber.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, { subscriber: subscriber, context: context }));
            action.schedule(state, bufferCreationInterval);
        }
    }
    function dispatchBufferClose(arg) {
        var subscriber = arg.subscriber, context = arg.context;
        subscriber.closeContext(context);
    }

    /** PURE_IMPORTS_START tslib,_Subscription,_util_subscribeToResult,_OuterSubscriber PURE_IMPORTS_END */
    function bufferToggle(openings, closingSelector) {
        return function bufferToggleOperatorFunction(source) {
            return source.lift(new BufferToggleOperator(openings, closingSelector));
        };
    }
    var BufferToggleOperator = /*@__PURE__*/ (function () {
        function BufferToggleOperator(openings, closingSelector) {
            this.openings = openings;
            this.closingSelector = closingSelector;
        }
        BufferToggleOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new BufferToggleSubscriber(subscriber, this.openings, this.closingSelector));
        };
        return BufferToggleOperator;
    }());
    var BufferToggleSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(BufferToggleSubscriber, _super);
        function BufferToggleSubscriber(destination, openings, closingSelector) {
            var _this = _super.call(this, destination) || this;
            _this.closingSelector = closingSelector;
            _this.contexts = [];
            _this.add(subscribeToResult(_this, openings));
            return _this;
        }
        BufferToggleSubscriber.prototype._next = function (value) {
            var contexts = this.contexts;
            var len = contexts.length;
            for (var i = 0; i < len; i++) {
                contexts[i].buffer.push(value);
            }
        };
        BufferToggleSubscriber.prototype._error = function (err) {
            var contexts = this.contexts;
            while (contexts.length > 0) {
                var context_1 = contexts.shift();
                context_1.subscription.unsubscribe();
                context_1.buffer = null;
                context_1.subscription = null;
            }
            this.contexts = null;
            _super.prototype._error.call(this, err);
        };
        BufferToggleSubscriber.prototype._complete = function () {
            var contexts = this.contexts;
            while (contexts.length > 0) {
                var context_2 = contexts.shift();
                this.destination.next(context_2.buffer);
                context_2.subscription.unsubscribe();
                context_2.buffer = null;
                context_2.subscription = null;
            }
            this.contexts = null;
            _super.prototype._complete.call(this);
        };
        BufferToggleSubscriber.prototype.notifyNext = function (outerValue, innerValue) {
            outerValue ? this.closeBuffer(outerValue) : this.openBuffer(innerValue);
        };
        BufferToggleSubscriber.prototype.notifyComplete = function (innerSub) {
            this.closeBuffer(innerSub.context);
        };
        BufferToggleSubscriber.prototype.openBuffer = function (value) {
            try {
                var closingSelector = this.closingSelector;
                var closingNotifier = closingSelector.call(this, value);
                if (closingNotifier) {
                    this.trySubscribe(closingNotifier);
                }
            }
            catch (err) {
                this._error(err);
            }
        };
        BufferToggleSubscriber.prototype.closeBuffer = function (context) {
            var contexts = this.contexts;
            if (contexts && context) {
                var buffer = context.buffer, subscription = context.subscription;
                this.destination.next(buffer);
                contexts.splice(contexts.indexOf(context), 1);
                this.remove(subscription);
                subscription.unsubscribe();
            }
        };
        BufferToggleSubscriber.prototype.trySubscribe = function (closingNotifier) {
            var contexts = this.contexts;
            var buffer = [];
            var subscription = new Subscription();
            var context = { buffer: buffer, subscription: subscription };
            contexts.push(context);
            var innerSubscription = subscribeToResult(this, closingNotifier, context);
            if (!innerSubscription || innerSubscription.closed) {
                this.closeBuffer(context);
            }
            else {
                innerSubscription.context = context;
                this.add(innerSubscription);
                subscription.add(innerSubscription);
            }
        };
        return BufferToggleSubscriber;
    }(OuterSubscriber));

    /** PURE_IMPORTS_START tslib,_Subscription,_innerSubscribe PURE_IMPORTS_END */
    function bufferWhen(closingSelector) {
        return function (source) {
            return source.lift(new BufferWhenOperator(closingSelector));
        };
    }
    var BufferWhenOperator = /*@__PURE__*/ (function () {
        function BufferWhenOperator(closingSelector) {
            this.closingSelector = closingSelector;
        }
        BufferWhenOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new BufferWhenSubscriber(subscriber, this.closingSelector));
        };
        return BufferWhenOperator;
    }());
    var BufferWhenSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(BufferWhenSubscriber, _super);
        function BufferWhenSubscriber(destination, closingSelector) {
            var _this = _super.call(this, destination) || this;
            _this.closingSelector = closingSelector;
            _this.subscribing = false;
            _this.openBuffer();
            return _this;
        }
        BufferWhenSubscriber.prototype._next = function (value) {
            this.buffer.push(value);
        };
        BufferWhenSubscriber.prototype._complete = function () {
            var buffer = this.buffer;
            if (buffer) {
                this.destination.next(buffer);
            }
            _super.prototype._complete.call(this);
        };
        BufferWhenSubscriber.prototype._unsubscribe = function () {
            this.buffer = undefined;
            this.subscribing = false;
        };
        BufferWhenSubscriber.prototype.notifyNext = function () {
            this.openBuffer();
        };
        BufferWhenSubscriber.prototype.notifyComplete = function () {
            if (this.subscribing) {
                this.complete();
            }
            else {
                this.openBuffer();
            }
        };
        BufferWhenSubscriber.prototype.openBuffer = function () {
            var closingSubscription = this.closingSubscription;
            if (closingSubscription) {
                this.remove(closingSubscription);
                closingSubscription.unsubscribe();
            }
            var buffer = this.buffer;
            if (this.buffer) {
                this.destination.next(buffer);
            }
            this.buffer = [];
            var closingNotifier;
            try {
                var closingSelector = this.closingSelector;
                closingNotifier = closingSelector();
            }
            catch (err) {
                return this.error(err);
            }
            closingSubscription = new Subscription();
            this.closingSubscription = closingSubscription;
            this.add(closingSubscription);
            this.subscribing = true;
            closingSubscription.add(innerSubscribe(closingNotifier, new SimpleInnerSubscriber(this)));
            this.subscribing = false;
        };
        return BufferWhenSubscriber;
    }(SimpleOuterSubscriber));

    /** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */
    function catchError(selector) {
        return function catchErrorOperatorFunction(source) {
            var operator = new CatchOperator(selector);
            var caught = source.lift(operator);
            return (operator.caught = caught);
        };
    }
    var CatchOperator = /*@__PURE__*/ (function () {
        function CatchOperator(selector) {
            this.selector = selector;
        }
        CatchOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new CatchSubscriber(subscriber, this.selector, this.caught));
        };
        return CatchOperator;
    }());
    var CatchSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(CatchSubscriber, _super);
        function CatchSubscriber(destination, selector, caught) {
            var _this = _super.call(this, destination) || this;
            _this.selector = selector;
            _this.caught = caught;
            return _this;
        }
        CatchSubscriber.prototype.error = function (err) {
            if (!this.isStopped) {
                var result = void 0;
                try {
                    result = this.selector(err, this.caught);
                }
                catch (err2) {
                    _super.prototype.error.call(this, err2);
                    return;
                }
                this._unsubscribeAndRecycle();
                var innerSubscriber = new SimpleInnerSubscriber(this);
                this.add(innerSubscriber);
                var innerSubscription = innerSubscribe(result, innerSubscriber);
                if (innerSubscription !== innerSubscriber) {
                    this.add(innerSubscription);
                }
            }
        };
        return CatchSubscriber;
    }(SimpleOuterSubscriber));

    /** PURE_IMPORTS_START _observable_combineLatest PURE_IMPORTS_END */
    function combineAll(project) {
        return function (source) { return source.lift(new CombineLatestOperator(project)); };
    }

    /** PURE_IMPORTS_START _util_isArray,_observable_combineLatest,_observable_from PURE_IMPORTS_END */
    var none = {};
    function combineLatest() {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            observables[_i] = arguments[_i];
        }
        var project = null;
        if (typeof observables[observables.length - 1] === 'function') {
            project = observables.pop();
        }
        if (observables.length === 1 && isArray$1(observables[0])) {
            observables = observables[0].slice();
        }
        return function (source) { return source.lift.call(from([source].concat(observables)), new CombineLatestOperator(project)); };
    }

    /** PURE_IMPORTS_START _observable_concat PURE_IMPORTS_END */
    function concat() {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            observables[_i] = arguments[_i];
        }
        return function (source) { return source.lift.call(concat$1.apply(void 0, [source].concat(observables))); };
    }

    /** PURE_IMPORTS_START _mergeMap PURE_IMPORTS_END */
    function concatMap(project, resultSelector) {
        return mergeMap(project, resultSelector, 1);
    }

    /** PURE_IMPORTS_START _concatMap PURE_IMPORTS_END */
    function concatMapTo(innerObservable, resultSelector) {
        return concatMap(function () { return innerObservable; }, resultSelector);
    }

    /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
    function count(predicate) {
        return function (source) { return source.lift(new CountOperator(predicate, source)); };
    }
    var CountOperator = /*@__PURE__*/ (function () {
        function CountOperator(predicate, source) {
            this.predicate = predicate;
            this.source = source;
        }
        CountOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new CountSubscriber(subscriber, this.predicate, this.source));
        };
        return CountOperator;
    }());
    var CountSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(CountSubscriber, _super);
        function CountSubscriber(destination, predicate, source) {
            var _this = _super.call(this, destination) || this;
            _this.predicate = predicate;
            _this.source = source;
            _this.count = 0;
            _this.index = 0;
            return _this;
        }
        CountSubscriber.prototype._next = function (value) {
            if (this.predicate) {
                this._tryPredicate(value);
            }
            else {
                this.count++;
            }
        };
        CountSubscriber.prototype._tryPredicate = function (value) {
            var result;
            try {
                result = this.predicate(value, this.index++, this.source);
            }
            catch (err) {
                this.destination.error(err);
                return;
            }
            if (result) {
                this.count++;
            }
        };
        CountSubscriber.prototype._complete = function () {
            this.destination.next(this.count);
            this.destination.complete();
        };
        return CountSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */
    function debounce(durationSelector) {
        return function (source) { return source.lift(new DebounceOperator(durationSelector)); };
    }
    var DebounceOperator = /*@__PURE__*/ (function () {
        function DebounceOperator(durationSelector) {
            this.durationSelector = durationSelector;
        }
        DebounceOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new DebounceSubscriber(subscriber, this.durationSelector));
        };
        return DebounceOperator;
    }());
    var DebounceSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(DebounceSubscriber, _super);
        function DebounceSubscriber(destination, durationSelector) {
            var _this = _super.call(this, destination) || this;
            _this.durationSelector = durationSelector;
            _this.hasValue = false;
            return _this;
        }
        DebounceSubscriber.prototype._next = function (value) {
            try {
                var result = this.durationSelector.call(this, value);
                if (result) {
                    this._tryNext(value, result);
                }
            }
            catch (err) {
                this.destination.error(err);
            }
        };
        DebounceSubscriber.prototype._complete = function () {
            this.emitValue();
            this.destination.complete();
        };
        DebounceSubscriber.prototype._tryNext = function (value, duration) {
            var subscription = this.durationSubscription;
            this.value = value;
            this.hasValue = true;
            if (subscription) {
                subscription.unsubscribe();
                this.remove(subscription);
            }
            subscription = innerSubscribe(duration, new SimpleInnerSubscriber(this));
            if (subscription && !subscription.closed) {
                this.add(this.durationSubscription = subscription);
            }
        };
        DebounceSubscriber.prototype.notifyNext = function () {
            this.emitValue();
        };
        DebounceSubscriber.prototype.notifyComplete = function () {
            this.emitValue();
        };
        DebounceSubscriber.prototype.emitValue = function () {
            if (this.hasValue) {
                var value = this.value;
                var subscription = this.durationSubscription;
                if (subscription) {
                    this.durationSubscription = undefined;
                    subscription.unsubscribe();
                    this.remove(subscription);
                }
                this.value = undefined;
                this.hasValue = false;
                _super.prototype._next.call(this, value);
            }
        };
        return DebounceSubscriber;
    }(SimpleOuterSubscriber));

    /** PURE_IMPORTS_START tslib,_Subscriber,_scheduler_async PURE_IMPORTS_END */
    function debounceTime(dueTime, scheduler) {
        if (scheduler === void 0) {
            scheduler = async;
        }
        return function (source) { return source.lift(new DebounceTimeOperator(dueTime, scheduler)); };
    }
    var DebounceTimeOperator = /*@__PURE__*/ (function () {
        function DebounceTimeOperator(dueTime, scheduler) {
            this.dueTime = dueTime;
            this.scheduler = scheduler;
        }
        DebounceTimeOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new DebounceTimeSubscriber(subscriber, this.dueTime, this.scheduler));
        };
        return DebounceTimeOperator;
    }());
    var DebounceTimeSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(DebounceTimeSubscriber, _super);
        function DebounceTimeSubscriber(destination, dueTime, scheduler) {
            var _this = _super.call(this, destination) || this;
            _this.dueTime = dueTime;
            _this.scheduler = scheduler;
            _this.debouncedSubscription = null;
            _this.lastValue = null;
            _this.hasValue = false;
            return _this;
        }
        DebounceTimeSubscriber.prototype._next = function (value) {
            this.clearDebounce();
            this.lastValue = value;
            this.hasValue = true;
            this.add(this.debouncedSubscription = this.scheduler.schedule(dispatchNext$1, this.dueTime, this));
        };
        DebounceTimeSubscriber.prototype._complete = function () {
            this.debouncedNext();
            this.destination.complete();
        };
        DebounceTimeSubscriber.prototype.debouncedNext = function () {
            this.clearDebounce();
            if (this.hasValue) {
                var lastValue = this.lastValue;
                this.lastValue = null;
                this.hasValue = false;
                this.destination.next(lastValue);
            }
        };
        DebounceTimeSubscriber.prototype.clearDebounce = function () {
            var debouncedSubscription = this.debouncedSubscription;
            if (debouncedSubscription !== null) {
                this.remove(debouncedSubscription);
                debouncedSubscription.unsubscribe();
                this.debouncedSubscription = null;
            }
        };
        return DebounceTimeSubscriber;
    }(Subscriber));
    function dispatchNext$1(subscriber) {
        subscriber.debouncedNext();
    }

    /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
    function defaultIfEmpty(defaultValue) {
        if (defaultValue === void 0) {
            defaultValue = null;
        }
        return function (source) { return source.lift(new DefaultIfEmptyOperator(defaultValue)); };
    }
    var DefaultIfEmptyOperator = /*@__PURE__*/ (function () {
        function DefaultIfEmptyOperator(defaultValue) {
            this.defaultValue = defaultValue;
        }
        DefaultIfEmptyOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new DefaultIfEmptySubscriber(subscriber, this.defaultValue));
        };
        return DefaultIfEmptyOperator;
    }());
    var DefaultIfEmptySubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(DefaultIfEmptySubscriber, _super);
        function DefaultIfEmptySubscriber(destination, defaultValue) {
            var _this = _super.call(this, destination) || this;
            _this.defaultValue = defaultValue;
            _this.isEmpty = true;
            return _this;
        }
        DefaultIfEmptySubscriber.prototype._next = function (value) {
            this.isEmpty = false;
            this.destination.next(value);
        };
        DefaultIfEmptySubscriber.prototype._complete = function () {
            if (this.isEmpty) {
                this.destination.next(this.defaultValue);
            }
            this.destination.complete();
        };
        return DefaultIfEmptySubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    function isDate(value) {
        return value instanceof Date && !isNaN(+value);
    }

    /** PURE_IMPORTS_START tslib,_scheduler_async,_util_isDate,_Subscriber,_Notification PURE_IMPORTS_END */
    function delay(delay, scheduler) {
        if (scheduler === void 0) {
            scheduler = async;
        }
        var absoluteDelay = isDate(delay);
        var delayFor = absoluteDelay ? (+delay - scheduler.now()) : Math.abs(delay);
        return function (source) { return source.lift(new DelayOperator(delayFor, scheduler)); };
    }
    var DelayOperator = /*@__PURE__*/ (function () {
        function DelayOperator(delay, scheduler) {
            this.delay = delay;
            this.scheduler = scheduler;
        }
        DelayOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new DelaySubscriber(subscriber, this.delay, this.scheduler));
        };
        return DelayOperator;
    }());
    var DelaySubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(DelaySubscriber, _super);
        function DelaySubscriber(destination, delay, scheduler) {
            var _this = _super.call(this, destination) || this;
            _this.delay = delay;
            _this.scheduler = scheduler;
            _this.queue = [];
            _this.active = false;
            _this.errored = false;
            return _this;
        }
        DelaySubscriber.dispatch = function (state) {
            var source = state.source;
            var queue = source.queue;
            var scheduler = state.scheduler;
            var destination = state.destination;
            while (queue.length > 0 && (queue[0].time - scheduler.now()) <= 0) {
                queue.shift().notification.observe(destination);
            }
            if (queue.length > 0) {
                var delay_1 = Math.max(0, queue[0].time - scheduler.now());
                this.schedule(state, delay_1);
            }
            else {
                this.unsubscribe();
                source.active = false;
            }
        };
        DelaySubscriber.prototype._schedule = function (scheduler) {
            this.active = true;
            var destination = this.destination;
            destination.add(scheduler.schedule(DelaySubscriber.dispatch, this.delay, {
                source: this, destination: this.destination, scheduler: scheduler
            }));
        };
        DelaySubscriber.prototype.scheduleNotification = function (notification) {
            if (this.errored === true) {
                return;
            }
            var scheduler = this.scheduler;
            var message = new DelayMessage(scheduler.now() + this.delay, notification);
            this.queue.push(message);
            if (this.active === false) {
                this._schedule(scheduler);
            }
        };
        DelaySubscriber.prototype._next = function (value) {
            this.scheduleNotification(Notification.createNext(value));
        };
        DelaySubscriber.prototype._error = function (err) {
            this.errored = true;
            this.queue = [];
            this.destination.error(err);
            this.unsubscribe();
        };
        DelaySubscriber.prototype._complete = function () {
            this.scheduleNotification(Notification.createComplete());
            this.unsubscribe();
        };
        return DelaySubscriber;
    }(Subscriber));
    var DelayMessage = /*@__PURE__*/ (function () {
        function DelayMessage(time, notification) {
            this.time = time;
            this.notification = notification;
        }
        return DelayMessage;
    }());

    /** PURE_IMPORTS_START tslib,_Subscriber,_Observable,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */
    function delayWhen(delayDurationSelector, subscriptionDelay) {
        if (subscriptionDelay) {
            return function (source) {
                return new SubscriptionDelayObservable(source, subscriptionDelay)
                    .lift(new DelayWhenOperator(delayDurationSelector));
            };
        }
        return function (source) { return source.lift(new DelayWhenOperator(delayDurationSelector)); };
    }
    var DelayWhenOperator = /*@__PURE__*/ (function () {
        function DelayWhenOperator(delayDurationSelector) {
            this.delayDurationSelector = delayDurationSelector;
        }
        DelayWhenOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new DelayWhenSubscriber(subscriber, this.delayDurationSelector));
        };
        return DelayWhenOperator;
    }());
    var DelayWhenSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(DelayWhenSubscriber, _super);
        function DelayWhenSubscriber(destination, delayDurationSelector) {
            var _this = _super.call(this, destination) || this;
            _this.delayDurationSelector = delayDurationSelector;
            _this.completed = false;
            _this.delayNotifierSubscriptions = [];
            _this.index = 0;
            return _this;
        }
        DelayWhenSubscriber.prototype.notifyNext = function (outerValue, _innerValue, _outerIndex, _innerIndex, innerSub) {
            this.destination.next(outerValue);
            this.removeSubscription(innerSub);
            this.tryComplete();
        };
        DelayWhenSubscriber.prototype.notifyError = function (error, innerSub) {
            this._error(error);
        };
        DelayWhenSubscriber.prototype.notifyComplete = function (innerSub) {
            var value = this.removeSubscription(innerSub);
            if (value) {
                this.destination.next(value);
            }
            this.tryComplete();
        };
        DelayWhenSubscriber.prototype._next = function (value) {
            var index = this.index++;
            try {
                var delayNotifier = this.delayDurationSelector(value, index);
                if (delayNotifier) {
                    this.tryDelay(delayNotifier, value);
                }
            }
            catch (err) {
                this.destination.error(err);
            }
        };
        DelayWhenSubscriber.prototype._complete = function () {
            this.completed = true;
            this.tryComplete();
            this.unsubscribe();
        };
        DelayWhenSubscriber.prototype.removeSubscription = function (subscription) {
            subscription.unsubscribe();
            var subscriptionIdx = this.delayNotifierSubscriptions.indexOf(subscription);
            if (subscriptionIdx !== -1) {
                this.delayNotifierSubscriptions.splice(subscriptionIdx, 1);
            }
            return subscription.outerValue;
        };
        DelayWhenSubscriber.prototype.tryDelay = function (delayNotifier, value) {
            var notifierSubscription = subscribeToResult(this, delayNotifier, value);
            if (notifierSubscription && !notifierSubscription.closed) {
                var destination = this.destination;
                destination.add(notifierSubscription);
                this.delayNotifierSubscriptions.push(notifierSubscription);
            }
        };
        DelayWhenSubscriber.prototype.tryComplete = function () {
            if (this.completed && this.delayNotifierSubscriptions.length === 0) {
                this.destination.complete();
            }
        };
        return DelayWhenSubscriber;
    }(OuterSubscriber));
    var SubscriptionDelayObservable = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(SubscriptionDelayObservable, _super);
        function SubscriptionDelayObservable(source, subscriptionDelay) {
            var _this = _super.call(this) || this;
            _this.source = source;
            _this.subscriptionDelay = subscriptionDelay;
            return _this;
        }
        SubscriptionDelayObservable.prototype._subscribe = function (subscriber) {
            this.subscriptionDelay.subscribe(new SubscriptionDelaySubscriber(subscriber, this.source));
        };
        return SubscriptionDelayObservable;
    }(Observable));
    var SubscriptionDelaySubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(SubscriptionDelaySubscriber, _super);
        function SubscriptionDelaySubscriber(parent, source) {
            var _this = _super.call(this) || this;
            _this.parent = parent;
            _this.source = source;
            _this.sourceSubscribed = false;
            return _this;
        }
        SubscriptionDelaySubscriber.prototype._next = function (unused) {
            this.subscribeToSource();
        };
        SubscriptionDelaySubscriber.prototype._error = function (err) {
            this.unsubscribe();
            this.parent.error(err);
        };
        SubscriptionDelaySubscriber.prototype._complete = function () {
            this.unsubscribe();
            this.subscribeToSource();
        };
        SubscriptionDelaySubscriber.prototype.subscribeToSource = function () {
            if (!this.sourceSubscribed) {
                this.sourceSubscribed = true;
                this.unsubscribe();
                this.source.subscribe(this.parent);
            }
        };
        return SubscriptionDelaySubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
    function dematerialize() {
        return function dematerializeOperatorFunction(source) {
            return source.lift(new DeMaterializeOperator());
        };
    }
    var DeMaterializeOperator = /*@__PURE__*/ (function () {
        function DeMaterializeOperator() {
        }
        DeMaterializeOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new DeMaterializeSubscriber(subscriber));
        };
        return DeMaterializeOperator;
    }());
    var DeMaterializeSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(DeMaterializeSubscriber, _super);
        function DeMaterializeSubscriber(destination) {
            return _super.call(this, destination) || this;
        }
        DeMaterializeSubscriber.prototype._next = function (value) {
            value.observe(this.destination);
        };
        return DeMaterializeSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */
    function distinct(keySelector, flushes) {
        return function (source) { return source.lift(new DistinctOperator(keySelector, flushes)); };
    }
    var DistinctOperator = /*@__PURE__*/ (function () {
        function DistinctOperator(keySelector, flushes) {
            this.keySelector = keySelector;
            this.flushes = flushes;
        }
        DistinctOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new DistinctSubscriber(subscriber, this.keySelector, this.flushes));
        };
        return DistinctOperator;
    }());
    var DistinctSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(DistinctSubscriber, _super);
        function DistinctSubscriber(destination, keySelector, flushes) {
            var _this = _super.call(this, destination) || this;
            _this.keySelector = keySelector;
            _this.values = new Set();
            if (flushes) {
                _this.add(innerSubscribe(flushes, new SimpleInnerSubscriber(_this)));
            }
            return _this;
        }
        DistinctSubscriber.prototype.notifyNext = function () {
            this.values.clear();
        };
        DistinctSubscriber.prototype.notifyError = function (error) {
            this._error(error);
        };
        DistinctSubscriber.prototype._next = function (value) {
            if (this.keySelector) {
                this._useKeySelector(value);
            }
            else {
                this._finalizeNext(value, value);
            }
        };
        DistinctSubscriber.prototype._useKeySelector = function (value) {
            var key;
            var destination = this.destination;
            try {
                key = this.keySelector(value);
            }
            catch (err) {
                destination.error(err);
                return;
            }
            this._finalizeNext(key, value);
        };
        DistinctSubscriber.prototype._finalizeNext = function (key, value) {
            var values = this.values;
            if (!values.has(key)) {
                values.add(key);
                this.destination.next(value);
            }
        };
        return DistinctSubscriber;
    }(SimpleOuterSubscriber));

    /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
    function distinctUntilChanged(compare, keySelector) {
        return function (source) { return source.lift(new DistinctUntilChangedOperator(compare, keySelector)); };
    }
    var DistinctUntilChangedOperator = /*@__PURE__*/ (function () {
        function DistinctUntilChangedOperator(compare, keySelector) {
            this.compare = compare;
            this.keySelector = keySelector;
        }
        DistinctUntilChangedOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new DistinctUntilChangedSubscriber(subscriber, this.compare, this.keySelector));
        };
        return DistinctUntilChangedOperator;
    }());
    var DistinctUntilChangedSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(DistinctUntilChangedSubscriber, _super);
        function DistinctUntilChangedSubscriber(destination, compare, keySelector) {
            var _this = _super.call(this, destination) || this;
            _this.keySelector = keySelector;
            _this.hasKey = false;
            if (typeof compare === 'function') {
                _this.compare = compare;
            }
            return _this;
        }
        DistinctUntilChangedSubscriber.prototype.compare = function (x, y) {
            return x === y;
        };
        DistinctUntilChangedSubscriber.prototype._next = function (value) {
            var key;
            try {
                var keySelector = this.keySelector;
                key = keySelector ? keySelector(value) : value;
            }
            catch (err) {
                return this.destination.error(err);
            }
            var result = false;
            if (this.hasKey) {
                try {
                    var compare = this.compare;
                    result = compare(this.key, key);
                }
                catch (err) {
                    return this.destination.error(err);
                }
            }
            else {
                this.hasKey = true;
            }
            if (!result) {
                this.key = key;
                this.destination.next(value);
            }
        };
        return DistinctUntilChangedSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START _distinctUntilChanged PURE_IMPORTS_END */
    function distinctUntilKeyChanged(key, compare) {
        return distinctUntilChanged(function (x, y) { return compare ? compare(x[key], y[key]) : x[key] === y[key]; });
    }

    /** PURE_IMPORTS_START tslib,_util_EmptyError,_Subscriber PURE_IMPORTS_END */
    function throwIfEmpty(errorFactory) {
        if (errorFactory === void 0) {
            errorFactory = defaultErrorFactory;
        }
        return function (source) {
            return source.lift(new ThrowIfEmptyOperator(errorFactory));
        };
    }
    var ThrowIfEmptyOperator = /*@__PURE__*/ (function () {
        function ThrowIfEmptyOperator(errorFactory) {
            this.errorFactory = errorFactory;
        }
        ThrowIfEmptyOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new ThrowIfEmptySubscriber(subscriber, this.errorFactory));
        };
        return ThrowIfEmptyOperator;
    }());
    var ThrowIfEmptySubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(ThrowIfEmptySubscriber, _super);
        function ThrowIfEmptySubscriber(destination, errorFactory) {
            var _this = _super.call(this, destination) || this;
            _this.errorFactory = errorFactory;
            _this.hasValue = false;
            return _this;
        }
        ThrowIfEmptySubscriber.prototype._next = function (value) {
            this.hasValue = true;
            this.destination.next(value);
        };
        ThrowIfEmptySubscriber.prototype._complete = function () {
            if (!this.hasValue) {
                var err = void 0;
                try {
                    err = this.errorFactory();
                }
                catch (e) {
                    err = e;
                }
                this.destination.error(err);
            }
            else {
                return this.destination.complete();
            }
        };
        return ThrowIfEmptySubscriber;
    }(Subscriber));
    function defaultErrorFactory() {
        return new EmptyError();
    }

    /** PURE_IMPORTS_START tslib,_Subscriber,_util_ArgumentOutOfRangeError,_observable_empty PURE_IMPORTS_END */
    function take(count) {
        return function (source) {
            if (count === 0) {
                return empty();
            }
            else {
                return source.lift(new TakeOperator(count));
            }
        };
    }
    var TakeOperator = /*@__PURE__*/ (function () {
        function TakeOperator(total) {
            this.total = total;
            if (this.total < 0) {
                throw new ArgumentOutOfRangeError;
            }
        }
        TakeOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new TakeSubscriber(subscriber, this.total));
        };
        return TakeOperator;
    }());
    var TakeSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(TakeSubscriber, _super);
        function TakeSubscriber(destination, total) {
            var _this = _super.call(this, destination) || this;
            _this.total = total;
            _this.count = 0;
            return _this;
        }
        TakeSubscriber.prototype._next = function (value) {
            var total = this.total;
            var count = ++this.count;
            if (count <= total) {
                this.destination.next(value);
                if (count === total) {
                    this.destination.complete();
                    this.unsubscribe();
                }
            }
        };
        return TakeSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START _util_ArgumentOutOfRangeError,_filter,_throwIfEmpty,_defaultIfEmpty,_take PURE_IMPORTS_END */
    function elementAt(index, defaultValue) {
        if (index < 0) {
            throw new ArgumentOutOfRangeError();
        }
        var hasDefaultValue = arguments.length >= 2;
        return function (source) {
            return source.pipe(filter(function (v, i) { return i === index; }), take(1), hasDefaultValue
                ? defaultIfEmpty(defaultValue)
                : throwIfEmpty(function () { return new ArgumentOutOfRangeError(); }));
        };
    }

    /** PURE_IMPORTS_START _observable_concat,_observable_of PURE_IMPORTS_END */
    function endWith() {
        var array = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            array[_i] = arguments[_i];
        }
        return function (source) { return concat$1(source, of.apply(void 0, array)); };
    }

    /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
    function every(predicate, thisArg) {
        return function (source) { return source.lift(new EveryOperator(predicate, thisArg, source)); };
    }
    var EveryOperator = /*@__PURE__*/ (function () {
        function EveryOperator(predicate, thisArg, source) {
            this.predicate = predicate;
            this.thisArg = thisArg;
            this.source = source;
        }
        EveryOperator.prototype.call = function (observer, source) {
            return source.subscribe(new EverySubscriber(observer, this.predicate, this.thisArg, this.source));
        };
        return EveryOperator;
    }());
    var EverySubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(EverySubscriber, _super);
        function EverySubscriber(destination, predicate, thisArg, source) {
            var _this = _super.call(this, destination) || this;
            _this.predicate = predicate;
            _this.thisArg = thisArg;
            _this.source = source;
            _this.index = 0;
            _this.thisArg = thisArg || _this;
            return _this;
        }
        EverySubscriber.prototype.notifyComplete = function (everyValueMatch) {
            this.destination.next(everyValueMatch);
            this.destination.complete();
        };
        EverySubscriber.prototype._next = function (value) {
            var result = false;
            try {
                result = this.predicate.call(this.thisArg, value, this.index++, this.source);
            }
            catch (err) {
                this.destination.error(err);
                return;
            }
            if (!result) {
                this.notifyComplete(false);
            }
        };
        EverySubscriber.prototype._complete = function () {
            this.notifyComplete(true);
        };
        return EverySubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */
    function exhaust() {
        return function (source) { return source.lift(new SwitchFirstOperator()); };
    }
    var SwitchFirstOperator = /*@__PURE__*/ (function () {
        function SwitchFirstOperator() {
        }
        SwitchFirstOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new SwitchFirstSubscriber(subscriber));
        };
        return SwitchFirstOperator;
    }());
    var SwitchFirstSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(SwitchFirstSubscriber, _super);
        function SwitchFirstSubscriber(destination) {
            var _this = _super.call(this, destination) || this;
            _this.hasCompleted = false;
            _this.hasSubscription = false;
            return _this;
        }
        SwitchFirstSubscriber.prototype._next = function (value) {
            if (!this.hasSubscription) {
                this.hasSubscription = true;
                this.add(innerSubscribe(value, new SimpleInnerSubscriber(this)));
            }
        };
        SwitchFirstSubscriber.prototype._complete = function () {
            this.hasCompleted = true;
            if (!this.hasSubscription) {
                this.destination.complete();
            }
        };
        SwitchFirstSubscriber.prototype.notifyComplete = function () {
            this.hasSubscription = false;
            if (this.hasCompleted) {
                this.destination.complete();
            }
        };
        return SwitchFirstSubscriber;
    }(SimpleOuterSubscriber));

    /** PURE_IMPORTS_START tslib,_map,_observable_from,_innerSubscribe PURE_IMPORTS_END */
    function exhaustMap(project, resultSelector) {
        if (resultSelector) {
            return function (source) { return source.pipe(exhaustMap(function (a, i) { return from(project(a, i)).pipe(map(function (b, ii) { return resultSelector(a, b, i, ii); })); })); };
        }
        return function (source) {
            return source.lift(new ExhaustMapOperator(project));
        };
    }
    var ExhaustMapOperator = /*@__PURE__*/ (function () {
        function ExhaustMapOperator(project) {
            this.project = project;
        }
        ExhaustMapOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new ExhaustMapSubscriber(subscriber, this.project));
        };
        return ExhaustMapOperator;
    }());
    var ExhaustMapSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(ExhaustMapSubscriber, _super);
        function ExhaustMapSubscriber(destination, project) {
            var _this = _super.call(this, destination) || this;
            _this.project = project;
            _this.hasSubscription = false;
            _this.hasCompleted = false;
            _this.index = 0;
            return _this;
        }
        ExhaustMapSubscriber.prototype._next = function (value) {
            if (!this.hasSubscription) {
                this.tryNext(value);
            }
        };
        ExhaustMapSubscriber.prototype.tryNext = function (value) {
            var result;
            var index = this.index++;
            try {
                result = this.project(value, index);
            }
            catch (err) {
                this.destination.error(err);
                return;
            }
            this.hasSubscription = true;
            this._innerSub(result);
        };
        ExhaustMapSubscriber.prototype._innerSub = function (result) {
            var innerSubscriber = new SimpleInnerSubscriber(this);
            var destination = this.destination;
            destination.add(innerSubscriber);
            var innerSubscription = innerSubscribe(result, innerSubscriber);
            if (innerSubscription !== innerSubscriber) {
                destination.add(innerSubscription);
            }
        };
        ExhaustMapSubscriber.prototype._complete = function () {
            this.hasCompleted = true;
            if (!this.hasSubscription) {
                this.destination.complete();
            }
            this.unsubscribe();
        };
        ExhaustMapSubscriber.prototype.notifyNext = function (innerValue) {
            this.destination.next(innerValue);
        };
        ExhaustMapSubscriber.prototype.notifyError = function (err) {
            this.destination.error(err);
        };
        ExhaustMapSubscriber.prototype.notifyComplete = function () {
            this.hasSubscription = false;
            if (this.hasCompleted) {
                this.destination.complete();
            }
        };
        return ExhaustMapSubscriber;
    }(SimpleOuterSubscriber));

    /** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */
    function expand(project, concurrent, scheduler) {
        if (concurrent === void 0) {
            concurrent = Number.POSITIVE_INFINITY;
        }
        concurrent = (concurrent || 0) < 1 ? Number.POSITIVE_INFINITY : concurrent;
        return function (source) { return source.lift(new ExpandOperator(project, concurrent, scheduler)); };
    }
    var ExpandOperator = /*@__PURE__*/ (function () {
        function ExpandOperator(project, concurrent, scheduler) {
            this.project = project;
            this.concurrent = concurrent;
            this.scheduler = scheduler;
        }
        ExpandOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new ExpandSubscriber(subscriber, this.project, this.concurrent, this.scheduler));
        };
        return ExpandOperator;
    }());
    var ExpandSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(ExpandSubscriber, _super);
        function ExpandSubscriber(destination, project, concurrent, scheduler) {
            var _this = _super.call(this, destination) || this;
            _this.project = project;
            _this.concurrent = concurrent;
            _this.scheduler = scheduler;
            _this.index = 0;
            _this.active = 0;
            _this.hasCompleted = false;
            if (concurrent < Number.POSITIVE_INFINITY) {
                _this.buffer = [];
            }
            return _this;
        }
        ExpandSubscriber.dispatch = function (arg) {
            var subscriber = arg.subscriber, result = arg.result, value = arg.value, index = arg.index;
            subscriber.subscribeToProjection(result, value, index);
        };
        ExpandSubscriber.prototype._next = function (value) {
            var destination = this.destination;
            if (destination.closed) {
                this._complete();
                return;
            }
            var index = this.index++;
            if (this.active < this.concurrent) {
                destination.next(value);
                try {
                    var project = this.project;
                    var result = project(value, index);
                    if (!this.scheduler) {
                        this.subscribeToProjection(result, value, index);
                    }
                    else {
                        var state = { subscriber: this, result: result, value: value, index: index };
                        var destination_1 = this.destination;
                        destination_1.add(this.scheduler.schedule(ExpandSubscriber.dispatch, 0, state));
                    }
                }
                catch (e) {
                    destination.error(e);
                }
            }
            else {
                this.buffer.push(value);
            }
        };
        ExpandSubscriber.prototype.subscribeToProjection = function (result, value, index) {
            this.active++;
            var destination = this.destination;
            destination.add(innerSubscribe(result, new SimpleInnerSubscriber(this)));
        };
        ExpandSubscriber.prototype._complete = function () {
            this.hasCompleted = true;
            if (this.hasCompleted && this.active === 0) {
                this.destination.complete();
            }
            this.unsubscribe();
        };
        ExpandSubscriber.prototype.notifyNext = function (innerValue) {
            this._next(innerValue);
        };
        ExpandSubscriber.prototype.notifyComplete = function () {
            var buffer = this.buffer;
            this.active--;
            if (buffer && buffer.length > 0) {
                this._next(buffer.shift());
            }
            if (this.hasCompleted && this.active === 0) {
                this.destination.complete();
            }
        };
        return ExpandSubscriber;
    }(SimpleOuterSubscriber));

    /** PURE_IMPORTS_START tslib,_Subscriber,_Subscription PURE_IMPORTS_END */
    function finalize(callback) {
        return function (source) { return source.lift(new FinallyOperator(callback)); };
    }
    var FinallyOperator = /*@__PURE__*/ (function () {
        function FinallyOperator(callback) {
            this.callback = callback;
        }
        FinallyOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new FinallySubscriber(subscriber, this.callback));
        };
        return FinallyOperator;
    }());
    var FinallySubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(FinallySubscriber, _super);
        function FinallySubscriber(destination, callback) {
            var _this = _super.call(this, destination) || this;
            _this.add(new Subscription(callback));
            return _this;
        }
        return FinallySubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
    function find(predicate, thisArg) {
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate is not a function');
        }
        return function (source) { return source.lift(new FindValueOperator(predicate, source, false, thisArg)); };
    }
    var FindValueOperator = /*@__PURE__*/ (function () {
        function FindValueOperator(predicate, source, yieldIndex, thisArg) {
            this.predicate = predicate;
            this.source = source;
            this.yieldIndex = yieldIndex;
            this.thisArg = thisArg;
        }
        FindValueOperator.prototype.call = function (observer, source) {
            return source.subscribe(new FindValueSubscriber(observer, this.predicate, this.source, this.yieldIndex, this.thisArg));
        };
        return FindValueOperator;
    }());
    var FindValueSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(FindValueSubscriber, _super);
        function FindValueSubscriber(destination, predicate, source, yieldIndex, thisArg) {
            var _this = _super.call(this, destination) || this;
            _this.predicate = predicate;
            _this.source = source;
            _this.yieldIndex = yieldIndex;
            _this.thisArg = thisArg;
            _this.index = 0;
            return _this;
        }
        FindValueSubscriber.prototype.notifyComplete = function (value) {
            var destination = this.destination;
            destination.next(value);
            destination.complete();
            this.unsubscribe();
        };
        FindValueSubscriber.prototype._next = function (value) {
            var _a = this, predicate = _a.predicate, thisArg = _a.thisArg;
            var index = this.index++;
            try {
                var result = predicate.call(thisArg || this, value, index, this.source);
                if (result) {
                    this.notifyComplete(this.yieldIndex ? index : value);
                }
            }
            catch (err) {
                this.destination.error(err);
            }
        };
        FindValueSubscriber.prototype._complete = function () {
            this.notifyComplete(this.yieldIndex ? -1 : undefined);
        };
        return FindValueSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START _operators_find PURE_IMPORTS_END */
    function findIndex(predicate, thisArg) {
        return function (source) { return source.lift(new FindValueOperator(predicate, source, true, thisArg)); };
    }

    /** PURE_IMPORTS_START _util_EmptyError,_filter,_take,_defaultIfEmpty,_throwIfEmpty,_util_identity PURE_IMPORTS_END */
    function first(predicate, defaultValue) {
        var hasDefaultValue = arguments.length >= 2;
        return function (source) { return source.pipe(predicate ? filter(function (v, i) { return predicate(v, i, source); }) : identity, take(1), hasDefaultValue ? defaultIfEmpty(defaultValue) : throwIfEmpty(function () { return new EmptyError(); })); };
    }

    /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
    function ignoreElements() {
        return function ignoreElementsOperatorFunction(source) {
            return source.lift(new IgnoreElementsOperator());
        };
    }
    var IgnoreElementsOperator = /*@__PURE__*/ (function () {
        function IgnoreElementsOperator() {
        }
        IgnoreElementsOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new IgnoreElementsSubscriber(subscriber));
        };
        return IgnoreElementsOperator;
    }());
    var IgnoreElementsSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(IgnoreElementsSubscriber, _super);
        function IgnoreElementsSubscriber() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        IgnoreElementsSubscriber.prototype._next = function (unused) {
        };
        return IgnoreElementsSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
    function isEmpty() {
        return function (source) { return source.lift(new IsEmptyOperator()); };
    }
    var IsEmptyOperator = /*@__PURE__*/ (function () {
        function IsEmptyOperator() {
        }
        IsEmptyOperator.prototype.call = function (observer, source) {
            return source.subscribe(new IsEmptySubscriber(observer));
        };
        return IsEmptyOperator;
    }());
    var IsEmptySubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(IsEmptySubscriber, _super);
        function IsEmptySubscriber(destination) {
            return _super.call(this, destination) || this;
        }
        IsEmptySubscriber.prototype.notifyComplete = function (isEmpty) {
            var destination = this.destination;
            destination.next(isEmpty);
            destination.complete();
        };
        IsEmptySubscriber.prototype._next = function (value) {
            this.notifyComplete(false);
        };
        IsEmptySubscriber.prototype._complete = function () {
            this.notifyComplete(true);
        };
        return IsEmptySubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START tslib,_Subscriber,_util_ArgumentOutOfRangeError,_observable_empty PURE_IMPORTS_END */
    function takeLast(count) {
        return function takeLastOperatorFunction(source) {
            if (count === 0) {
                return empty();
            }
            else {
                return source.lift(new TakeLastOperator(count));
            }
        };
    }
    var TakeLastOperator = /*@__PURE__*/ (function () {
        function TakeLastOperator(total) {
            this.total = total;
            if (this.total < 0) {
                throw new ArgumentOutOfRangeError;
            }
        }
        TakeLastOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new TakeLastSubscriber(subscriber, this.total));
        };
        return TakeLastOperator;
    }());
    var TakeLastSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(TakeLastSubscriber, _super);
        function TakeLastSubscriber(destination, total) {
            var _this = _super.call(this, destination) || this;
            _this.total = total;
            _this.ring = new Array();
            _this.count = 0;
            return _this;
        }
        TakeLastSubscriber.prototype._next = function (value) {
            var ring = this.ring;
            var total = this.total;
            var count = this.count++;
            if (ring.length < total) {
                ring.push(value);
            }
            else {
                var index = count % total;
                ring[index] = value;
            }
        };
        TakeLastSubscriber.prototype._complete = function () {
            var destination = this.destination;
            var count = this.count;
            if (count > 0) {
                var total = this.count >= this.total ? this.total : this.count;
                var ring = this.ring;
                for (var i = 0; i < total; i++) {
                    var idx = (count++) % total;
                    destination.next(ring[idx]);
                }
            }
            destination.complete();
        };
        return TakeLastSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START _util_EmptyError,_filter,_takeLast,_throwIfEmpty,_defaultIfEmpty,_util_identity PURE_IMPORTS_END */
    function last(predicate, defaultValue) {
        var hasDefaultValue = arguments.length >= 2;
        return function (source) { return source.pipe(predicate ? filter(function (v, i) { return predicate(v, i, source); }) : identity, takeLast(1), hasDefaultValue ? defaultIfEmpty(defaultValue) : throwIfEmpty(function () { return new EmptyError(); })); };
    }

    /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
    function mapTo(value) {
        return function (source) { return source.lift(new MapToOperator(value)); };
    }
    var MapToOperator = /*@__PURE__*/ (function () {
        function MapToOperator(value) {
            this.value = value;
        }
        MapToOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new MapToSubscriber(subscriber, this.value));
        };
        return MapToOperator;
    }());
    var MapToSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(MapToSubscriber, _super);
        function MapToSubscriber(destination, value) {
            var _this = _super.call(this, destination) || this;
            _this.value = value;
            return _this;
        }
        MapToSubscriber.prototype._next = function (x) {
            this.destination.next(this.value);
        };
        return MapToSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START tslib,_Subscriber,_Notification PURE_IMPORTS_END */
    function materialize() {
        return function materializeOperatorFunction(source) {
            return source.lift(new MaterializeOperator());
        };
    }
    var MaterializeOperator = /*@__PURE__*/ (function () {
        function MaterializeOperator() {
        }
        MaterializeOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new MaterializeSubscriber(subscriber));
        };
        return MaterializeOperator;
    }());
    var MaterializeSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(MaterializeSubscriber, _super);
        function MaterializeSubscriber(destination) {
            return _super.call(this, destination) || this;
        }
        MaterializeSubscriber.prototype._next = function (value) {
            this.destination.next(Notification.createNext(value));
        };
        MaterializeSubscriber.prototype._error = function (err) {
            var destination = this.destination;
            destination.next(Notification.createError(err));
            destination.complete();
        };
        MaterializeSubscriber.prototype._complete = function () {
            var destination = this.destination;
            destination.next(Notification.createComplete());
            destination.complete();
        };
        return MaterializeSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
    function scan(accumulator, seed) {
        var hasSeed = false;
        if (arguments.length >= 2) {
            hasSeed = true;
        }
        return function scanOperatorFunction(source) {
            return source.lift(new ScanOperator(accumulator, seed, hasSeed));
        };
    }
    var ScanOperator = /*@__PURE__*/ (function () {
        function ScanOperator(accumulator, seed, hasSeed) {
            if (hasSeed === void 0) {
                hasSeed = false;
            }
            this.accumulator = accumulator;
            this.seed = seed;
            this.hasSeed = hasSeed;
        }
        ScanOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new ScanSubscriber(subscriber, this.accumulator, this.seed, this.hasSeed));
        };
        return ScanOperator;
    }());
    var ScanSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(ScanSubscriber, _super);
        function ScanSubscriber(destination, accumulator, _seed, hasSeed) {
            var _this = _super.call(this, destination) || this;
            _this.accumulator = accumulator;
            _this._seed = _seed;
            _this.hasSeed = hasSeed;
            _this.index = 0;
            return _this;
        }
        Object.defineProperty(ScanSubscriber.prototype, "seed", {
            get: function () {
                return this._seed;
            },
            set: function (value) {
                this.hasSeed = true;
                this._seed = value;
            },
            enumerable: true,
            configurable: true
        });
        ScanSubscriber.prototype._next = function (value) {
            if (!this.hasSeed) {
                this.seed = value;
                this.destination.next(value);
            }
            else {
                return this._tryNext(value);
            }
        };
        ScanSubscriber.prototype._tryNext = function (value) {
            var index = this.index++;
            var result;
            try {
                result = this.accumulator(this.seed, value, index);
            }
            catch (err) {
                this.destination.error(err);
            }
            this.seed = result;
            this.destination.next(result);
        };
        return ScanSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START _scan,_takeLast,_defaultIfEmpty,_util_pipe PURE_IMPORTS_END */
    function reduce(accumulator, seed) {
        if (arguments.length >= 2) {
            return function reduceOperatorFunctionWithSeed(source) {
                return pipe(scan(accumulator, seed), takeLast(1), defaultIfEmpty(seed))(source);
            };
        }
        return function reduceOperatorFunction(source) {
            return pipe(scan(function (acc, value, index) { return accumulator(acc, value, index + 1); }), takeLast(1))(source);
        };
    }

    /** PURE_IMPORTS_START _reduce PURE_IMPORTS_END */
    function max(comparer) {
        var max = (typeof comparer === 'function')
            ? function (x, y) { return comparer(x, y) > 0 ? x : y; }
            : function (x, y) { return x > y ? x : y; };
        return reduce(max);
    }

    /** PURE_IMPORTS_START _observable_merge PURE_IMPORTS_END */
    function merge() {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            observables[_i] = arguments[_i];
        }
        return function (source) { return source.lift.call(merge$1.apply(void 0, [source].concat(observables))); };
    }

    /** PURE_IMPORTS_START _mergeMap PURE_IMPORTS_END */
    function mergeMapTo(innerObservable, resultSelector, concurrent) {
        if (concurrent === void 0) {
            concurrent = Number.POSITIVE_INFINITY;
        }
        if (typeof resultSelector === 'function') {
            return mergeMap(function () { return innerObservable; }, resultSelector, concurrent);
        }
        if (typeof resultSelector === 'number') {
            concurrent = resultSelector;
        }
        return mergeMap(function () { return innerObservable; }, concurrent);
    }

    /** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */
    function mergeScan(accumulator, seed, concurrent) {
        if (concurrent === void 0) {
            concurrent = Number.POSITIVE_INFINITY;
        }
        return function (source) { return source.lift(new MergeScanOperator(accumulator, seed, concurrent)); };
    }
    var MergeScanOperator = /*@__PURE__*/ (function () {
        function MergeScanOperator(accumulator, seed, concurrent) {
            this.accumulator = accumulator;
            this.seed = seed;
            this.concurrent = concurrent;
        }
        MergeScanOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new MergeScanSubscriber(subscriber, this.accumulator, this.seed, this.concurrent));
        };
        return MergeScanOperator;
    }());
    var MergeScanSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(MergeScanSubscriber, _super);
        function MergeScanSubscriber(destination, accumulator, acc, concurrent) {
            var _this = _super.call(this, destination) || this;
            _this.accumulator = accumulator;
            _this.acc = acc;
            _this.concurrent = concurrent;
            _this.hasValue = false;
            _this.hasCompleted = false;
            _this.buffer = [];
            _this.active = 0;
            _this.index = 0;
            return _this;
        }
        MergeScanSubscriber.prototype._next = function (value) {
            if (this.active < this.concurrent) {
                var index = this.index++;
                var destination = this.destination;
                var ish = void 0;
                try {
                    var accumulator = this.accumulator;
                    ish = accumulator(this.acc, value, index);
                }
                catch (e) {
                    return destination.error(e);
                }
                this.active++;
                this._innerSub(ish);
            }
            else {
                this.buffer.push(value);
            }
        };
        MergeScanSubscriber.prototype._innerSub = function (ish) {
            var innerSubscriber = new SimpleInnerSubscriber(this);
            var destination = this.destination;
            destination.add(innerSubscriber);
            var innerSubscription = innerSubscribe(ish, innerSubscriber);
            if (innerSubscription !== innerSubscriber) {
                destination.add(innerSubscription);
            }
        };
        MergeScanSubscriber.prototype._complete = function () {
            this.hasCompleted = true;
            if (this.active === 0 && this.buffer.length === 0) {
                if (this.hasValue === false) {
                    this.destination.next(this.acc);
                }
                this.destination.complete();
            }
            this.unsubscribe();
        };
        MergeScanSubscriber.prototype.notifyNext = function (innerValue) {
            var destination = this.destination;
            this.acc = innerValue;
            this.hasValue = true;
            destination.next(innerValue);
        };
        MergeScanSubscriber.prototype.notifyComplete = function () {
            var buffer = this.buffer;
            this.active--;
            if (buffer.length > 0) {
                this._next(buffer.shift());
            }
            else if (this.active === 0 && this.hasCompleted) {
                if (this.hasValue === false) {
                    this.destination.next(this.acc);
                }
                this.destination.complete();
            }
        };
        return MergeScanSubscriber;
    }(SimpleOuterSubscriber));

    /** PURE_IMPORTS_START _reduce PURE_IMPORTS_END */
    function min(comparer) {
        var min = (typeof comparer === 'function')
            ? function (x, y) { return comparer(x, y) < 0 ? x : y; }
            : function (x, y) { return x < y ? x : y; };
        return reduce(min);
    }

    /** PURE_IMPORTS_START _observable_ConnectableObservable PURE_IMPORTS_END */
    function multicast(subjectOrSubjectFactory, selector) {
        return function multicastOperatorFunction(source) {
            var subjectFactory;
            if (typeof subjectOrSubjectFactory === 'function') {
                subjectFactory = subjectOrSubjectFactory;
            }
            else {
                subjectFactory = function subjectFactory() {
                    return subjectOrSubjectFactory;
                };
            }
            if (typeof selector === 'function') {
                return source.lift(new MulticastOperator(subjectFactory, selector));
            }
            var connectable = Object.create(source, connectableObservableDescriptor);
            connectable.source = source;
            connectable.subjectFactory = subjectFactory;
            return connectable;
        };
    }
    var MulticastOperator = /*@__PURE__*/ (function () {
        function MulticastOperator(subjectFactory, selector) {
            this.subjectFactory = subjectFactory;
            this.selector = selector;
        }
        MulticastOperator.prototype.call = function (subscriber, source) {
            var selector = this.selector;
            var subject = this.subjectFactory();
            var subscription = selector(subject).subscribe(subscriber);
            subscription.add(source.subscribe(subject));
            return subscription;
        };
        return MulticastOperator;
    }());

    /** PURE_IMPORTS_START tslib,_observable_from,_util_isArray,_innerSubscribe PURE_IMPORTS_END */
    function onErrorResumeNext() {
        var nextSources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            nextSources[_i] = arguments[_i];
        }
        if (nextSources.length === 1 && isArray$1(nextSources[0])) {
            nextSources = nextSources[0];
        }
        return function (source) { return source.lift(new OnErrorResumeNextOperator(nextSources)); };
    }
    function onErrorResumeNextStatic() {
        var nextSources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            nextSources[_i] = arguments[_i];
        }
        var source = undefined;
        if (nextSources.length === 1 && isArray$1(nextSources[0])) {
            nextSources = nextSources[0];
        }
        source = nextSources.shift();
        return from(source).lift(new OnErrorResumeNextOperator(nextSources));
    }
    var OnErrorResumeNextOperator = /*@__PURE__*/ (function () {
        function OnErrorResumeNextOperator(nextSources) {
            this.nextSources = nextSources;
        }
        OnErrorResumeNextOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new OnErrorResumeNextSubscriber(subscriber, this.nextSources));
        };
        return OnErrorResumeNextOperator;
    }());
    var OnErrorResumeNextSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(OnErrorResumeNextSubscriber, _super);
        function OnErrorResumeNextSubscriber(destination, nextSources) {
            var _this = _super.call(this, destination) || this;
            _this.destination = destination;
            _this.nextSources = nextSources;
            return _this;
        }
        OnErrorResumeNextSubscriber.prototype.notifyError = function () {
            this.subscribeToNextSource();
        };
        OnErrorResumeNextSubscriber.prototype.notifyComplete = function () {
            this.subscribeToNextSource();
        };
        OnErrorResumeNextSubscriber.prototype._error = function (err) {
            this.subscribeToNextSource();
            this.unsubscribe();
        };
        OnErrorResumeNextSubscriber.prototype._complete = function () {
            this.subscribeToNextSource();
            this.unsubscribe();
        };
        OnErrorResumeNextSubscriber.prototype.subscribeToNextSource = function () {
            var next = this.nextSources.shift();
            if (!!next) {
                var innerSubscriber = new SimpleInnerSubscriber(this);
                var destination = this.destination;
                destination.add(innerSubscriber);
                var innerSubscription = innerSubscribe(next, innerSubscriber);
                if (innerSubscription !== innerSubscriber) {
                    destination.add(innerSubscription);
                }
            }
            else {
                this.destination.complete();
            }
        };
        return OnErrorResumeNextSubscriber;
    }(SimpleOuterSubscriber));

    /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
    function pairwise() {
        return function (source) { return source.lift(new PairwiseOperator()); };
    }
    var PairwiseOperator = /*@__PURE__*/ (function () {
        function PairwiseOperator() {
        }
        PairwiseOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new PairwiseSubscriber(subscriber));
        };
        return PairwiseOperator;
    }());
    var PairwiseSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(PairwiseSubscriber, _super);
        function PairwiseSubscriber(destination) {
            var _this = _super.call(this, destination) || this;
            _this.hasPrev = false;
            return _this;
        }
        PairwiseSubscriber.prototype._next = function (value) {
            var pair;
            if (this.hasPrev) {
                pair = [this.prev, value];
            }
            else {
                this.hasPrev = true;
            }
            this.prev = value;
            if (pair) {
                this.destination.next(pair);
            }
        };
        return PairwiseSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START _util_not,_filter PURE_IMPORTS_END */
    function partition(predicate, thisArg) {
        return function (source) {
            return [
                filter(predicate, thisArg)(source),
                filter(not(predicate, thisArg))(source)
            ];
        };
    }

    /** PURE_IMPORTS_START _map PURE_IMPORTS_END */
    function pluck() {
        var properties = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            properties[_i] = arguments[_i];
        }
        var length = properties.length;
        if (length === 0) {
            throw new Error('list of properties cannot be empty.');
        }
        return function (source) { return map(plucker(properties, length))(source); };
    }
    function plucker(props, length) {
        var mapper = function (x) {
            var currentProp = x;
            for (var i = 0; i < length; i++) {
                var p = currentProp != null ? currentProp[props[i]] : undefined;
                if (p !== void 0) {
                    currentProp = p;
                }
                else {
                    return undefined;
                }
            }
            return currentProp;
        };
        return mapper;
    }

    /** PURE_IMPORTS_START _Subject,_multicast PURE_IMPORTS_END */
    function publish(selector) {
        return selector ?
            multicast(function () { return new Subject(); }, selector) :
            multicast(new Subject());
    }

    /** PURE_IMPORTS_START _BehaviorSubject,_multicast PURE_IMPORTS_END */
    function publishBehavior(value) {
        return function (source) { return multicast(new BehaviorSubject(value))(source); };
    }

    /** PURE_IMPORTS_START _AsyncSubject,_multicast PURE_IMPORTS_END */
    function publishLast() {
        return function (source) { return multicast(new AsyncSubject())(source); };
    }

    /** PURE_IMPORTS_START _ReplaySubject,_multicast PURE_IMPORTS_END */
    function publishReplay(bufferSize, windowTime, selectorOrScheduler, scheduler) {
        if (selectorOrScheduler && typeof selectorOrScheduler !== 'function') {
            scheduler = selectorOrScheduler;
        }
        var selector = typeof selectorOrScheduler === 'function' ? selectorOrScheduler : undefined;
        var subject = new ReplaySubject(bufferSize, windowTime, scheduler);
        return function (source) { return multicast(function () { return subject; }, selector)(source); };
    }

    /** PURE_IMPORTS_START _util_isArray,_observable_race PURE_IMPORTS_END */
    function race() {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            observables[_i] = arguments[_i];
        }
        return function raceOperatorFunction(source) {
            if (observables.length === 1 && isArray$1(observables[0])) {
                observables = observables[0];
            }
            return source.lift.call(race$1.apply(void 0, [source].concat(observables)));
        };
    }

    /** PURE_IMPORTS_START tslib,_Subscriber,_observable_empty PURE_IMPORTS_END */
    function repeat(count) {
        if (count === void 0) {
            count = -1;
        }
        return function (source) {
            if (count === 0) {
                return empty();
            }
            else if (count < 0) {
                return source.lift(new RepeatOperator(-1, source));
            }
            else {
                return source.lift(new RepeatOperator(count - 1, source));
            }
        };
    }
    var RepeatOperator = /*@__PURE__*/ (function () {
        function RepeatOperator(count, source) {
            this.count = count;
            this.source = source;
        }
        RepeatOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new RepeatSubscriber(subscriber, this.count, this.source));
        };
        return RepeatOperator;
    }());
    var RepeatSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(RepeatSubscriber, _super);
        function RepeatSubscriber(destination, count, source) {
            var _this = _super.call(this, destination) || this;
            _this.count = count;
            _this.source = source;
            return _this;
        }
        RepeatSubscriber.prototype.complete = function () {
            if (!this.isStopped) {
                var _a = this, source = _a.source, count = _a.count;
                if (count === 0) {
                    return _super.prototype.complete.call(this);
                }
                else if (count > -1) {
                    this.count = count - 1;
                }
                source.subscribe(this._unsubscribeAndRecycle());
            }
        };
        return RepeatSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START tslib,_Subject,_innerSubscribe PURE_IMPORTS_END */
    function repeatWhen(notifier) {
        return function (source) { return source.lift(new RepeatWhenOperator(notifier)); };
    }
    var RepeatWhenOperator = /*@__PURE__*/ (function () {
        function RepeatWhenOperator(notifier) {
            this.notifier = notifier;
        }
        RepeatWhenOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new RepeatWhenSubscriber(subscriber, this.notifier, source));
        };
        return RepeatWhenOperator;
    }());
    var RepeatWhenSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(RepeatWhenSubscriber, _super);
        function RepeatWhenSubscriber(destination, notifier, source) {
            var _this = _super.call(this, destination) || this;
            _this.notifier = notifier;
            _this.source = source;
            _this.sourceIsBeingSubscribedTo = true;
            return _this;
        }
        RepeatWhenSubscriber.prototype.notifyNext = function () {
            this.sourceIsBeingSubscribedTo = true;
            this.source.subscribe(this);
        };
        RepeatWhenSubscriber.prototype.notifyComplete = function () {
            if (this.sourceIsBeingSubscribedTo === false) {
                return _super.prototype.complete.call(this);
            }
        };
        RepeatWhenSubscriber.prototype.complete = function () {
            this.sourceIsBeingSubscribedTo = false;
            if (!this.isStopped) {
                if (!this.retries) {
                    this.subscribeToRetries();
                }
                if (!this.retriesSubscription || this.retriesSubscription.closed) {
                    return _super.prototype.complete.call(this);
                }
                this._unsubscribeAndRecycle();
                this.notifications.next(undefined);
            }
        };
        RepeatWhenSubscriber.prototype._unsubscribe = function () {
            var _a = this, notifications = _a.notifications, retriesSubscription = _a.retriesSubscription;
            if (notifications) {
                notifications.unsubscribe();
                this.notifications = undefined;
            }
            if (retriesSubscription) {
                retriesSubscription.unsubscribe();
                this.retriesSubscription = undefined;
            }
            this.retries = undefined;
        };
        RepeatWhenSubscriber.prototype._unsubscribeAndRecycle = function () {
            var _unsubscribe = this._unsubscribe;
            this._unsubscribe = null;
            _super.prototype._unsubscribeAndRecycle.call(this);
            this._unsubscribe = _unsubscribe;
            return this;
        };
        RepeatWhenSubscriber.prototype.subscribeToRetries = function () {
            this.notifications = new Subject();
            var retries;
            try {
                var notifier = this.notifier;
                retries = notifier(this.notifications);
            }
            catch (e) {
                return _super.prototype.complete.call(this);
            }
            this.retries = retries;
            this.retriesSubscription = innerSubscribe(retries, new SimpleInnerSubscriber(this));
        };
        return RepeatWhenSubscriber;
    }(SimpleOuterSubscriber));

    /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
    function retry(count) {
        if (count === void 0) {
            count = -1;
        }
        return function (source) { return source.lift(new RetryOperator(count, source)); };
    }
    var RetryOperator = /*@__PURE__*/ (function () {
        function RetryOperator(count, source) {
            this.count = count;
            this.source = source;
        }
        RetryOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new RetrySubscriber(subscriber, this.count, this.source));
        };
        return RetryOperator;
    }());
    var RetrySubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(RetrySubscriber, _super);
        function RetrySubscriber(destination, count, source) {
            var _this = _super.call(this, destination) || this;
            _this.count = count;
            _this.source = source;
            return _this;
        }
        RetrySubscriber.prototype.error = function (err) {
            if (!this.isStopped) {
                var _a = this, source = _a.source, count = _a.count;
                if (count === 0) {
                    return _super.prototype.error.call(this, err);
                }
                else if (count > -1) {
                    this.count = count - 1;
                }
                source.subscribe(this._unsubscribeAndRecycle());
            }
        };
        return RetrySubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START tslib,_Subject,_innerSubscribe PURE_IMPORTS_END */
    function retryWhen(notifier) {
        return function (source) { return source.lift(new RetryWhenOperator(notifier, source)); };
    }
    var RetryWhenOperator = /*@__PURE__*/ (function () {
        function RetryWhenOperator(notifier, source) {
            this.notifier = notifier;
            this.source = source;
        }
        RetryWhenOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new RetryWhenSubscriber(subscriber, this.notifier, this.source));
        };
        return RetryWhenOperator;
    }());
    var RetryWhenSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(RetryWhenSubscriber, _super);
        function RetryWhenSubscriber(destination, notifier, source) {
            var _this = _super.call(this, destination) || this;
            _this.notifier = notifier;
            _this.source = source;
            return _this;
        }
        RetryWhenSubscriber.prototype.error = function (err) {
            if (!this.isStopped) {
                var errors = this.errors;
                var retries = this.retries;
                var retriesSubscription = this.retriesSubscription;
                if (!retries) {
                    errors = new Subject();
                    try {
                        var notifier = this.notifier;
                        retries = notifier(errors);
                    }
                    catch (e) {
                        return _super.prototype.error.call(this, e);
                    }
                    retriesSubscription = innerSubscribe(retries, new SimpleInnerSubscriber(this));
                }
                else {
                    this.errors = undefined;
                    this.retriesSubscription = undefined;
                }
                this._unsubscribeAndRecycle();
                this.errors = errors;
                this.retries = retries;
                this.retriesSubscription = retriesSubscription;
                errors.next(err);
            }
        };
        RetryWhenSubscriber.prototype._unsubscribe = function () {
            var _a = this, errors = _a.errors, retriesSubscription = _a.retriesSubscription;
            if (errors) {
                errors.unsubscribe();
                this.errors = undefined;
            }
            if (retriesSubscription) {
                retriesSubscription.unsubscribe();
                this.retriesSubscription = undefined;
            }
            this.retries = undefined;
        };
        RetryWhenSubscriber.prototype.notifyNext = function () {
            var _unsubscribe = this._unsubscribe;
            this._unsubscribe = null;
            this._unsubscribeAndRecycle();
            this._unsubscribe = _unsubscribe;
            this.source.subscribe(this);
        };
        return RetryWhenSubscriber;
    }(SimpleOuterSubscriber));

    /** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */
    function sample(notifier) {
        return function (source) { return source.lift(new SampleOperator(notifier)); };
    }
    var SampleOperator = /*@__PURE__*/ (function () {
        function SampleOperator(notifier) {
            this.notifier = notifier;
        }
        SampleOperator.prototype.call = function (subscriber, source) {
            var sampleSubscriber = new SampleSubscriber(subscriber);
            var subscription = source.subscribe(sampleSubscriber);
            subscription.add(innerSubscribe(this.notifier, new SimpleInnerSubscriber(sampleSubscriber)));
            return subscription;
        };
        return SampleOperator;
    }());
    var SampleSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(SampleSubscriber, _super);
        function SampleSubscriber() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.hasValue = false;
            return _this;
        }
        SampleSubscriber.prototype._next = function (value) {
            this.value = value;
            this.hasValue = true;
        };
        SampleSubscriber.prototype.notifyNext = function () {
            this.emitValue();
        };
        SampleSubscriber.prototype.notifyComplete = function () {
            this.emitValue();
        };
        SampleSubscriber.prototype.emitValue = function () {
            if (this.hasValue) {
                this.hasValue = false;
                this.destination.next(this.value);
            }
        };
        return SampleSubscriber;
    }(SimpleOuterSubscriber));

    /** PURE_IMPORTS_START tslib,_Subscriber,_scheduler_async PURE_IMPORTS_END */
    function sampleTime(period, scheduler) {
        if (scheduler === void 0) {
            scheduler = async;
        }
        return function (source) { return source.lift(new SampleTimeOperator(period, scheduler)); };
    }
    var SampleTimeOperator = /*@__PURE__*/ (function () {
        function SampleTimeOperator(period, scheduler) {
            this.period = period;
            this.scheduler = scheduler;
        }
        SampleTimeOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new SampleTimeSubscriber(subscriber, this.period, this.scheduler));
        };
        return SampleTimeOperator;
    }());
    var SampleTimeSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(SampleTimeSubscriber, _super);
        function SampleTimeSubscriber(destination, period, scheduler) {
            var _this = _super.call(this, destination) || this;
            _this.period = period;
            _this.scheduler = scheduler;
            _this.hasValue = false;
            _this.add(scheduler.schedule(dispatchNotification, period, { subscriber: _this, period: period }));
            return _this;
        }
        SampleTimeSubscriber.prototype._next = function (value) {
            this.lastValue = value;
            this.hasValue = true;
        };
        SampleTimeSubscriber.prototype.notifyNext = function () {
            if (this.hasValue) {
                this.hasValue = false;
                this.destination.next(this.lastValue);
            }
        };
        return SampleTimeSubscriber;
    }(Subscriber));
    function dispatchNotification(state) {
        var subscriber = state.subscriber, period = state.period;
        subscriber.notifyNext();
        this.schedule(state, period);
    }

    /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
    function sequenceEqual(compareTo, comparator) {
        return function (source) { return source.lift(new SequenceEqualOperator(compareTo, comparator)); };
    }
    var SequenceEqualOperator = /*@__PURE__*/ (function () {
        function SequenceEqualOperator(compareTo, comparator) {
            this.compareTo = compareTo;
            this.comparator = comparator;
        }
        SequenceEqualOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new SequenceEqualSubscriber(subscriber, this.compareTo, this.comparator));
        };
        return SequenceEqualOperator;
    }());
    var SequenceEqualSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(SequenceEqualSubscriber, _super);
        function SequenceEqualSubscriber(destination, compareTo, comparator) {
            var _this = _super.call(this, destination) || this;
            _this.compareTo = compareTo;
            _this.comparator = comparator;
            _this._a = [];
            _this._b = [];
            _this._oneComplete = false;
            _this.destination.add(compareTo.subscribe(new SequenceEqualCompareToSubscriber(destination, _this)));
            return _this;
        }
        SequenceEqualSubscriber.prototype._next = function (value) {
            if (this._oneComplete && this._b.length === 0) {
                this.emit(false);
            }
            else {
                this._a.push(value);
                this.checkValues();
            }
        };
        SequenceEqualSubscriber.prototype._complete = function () {
            if (this._oneComplete) {
                this.emit(this._a.length === 0 && this._b.length === 0);
            }
            else {
                this._oneComplete = true;
            }
            this.unsubscribe();
        };
        SequenceEqualSubscriber.prototype.checkValues = function () {
            var _c = this, _a = _c._a, _b = _c._b, comparator = _c.comparator;
            while (_a.length > 0 && _b.length > 0) {
                var a = _a.shift();
                var b = _b.shift();
                var areEqual = false;
                try {
                    areEqual = comparator ? comparator(a, b) : a === b;
                }
                catch (e) {
                    this.destination.error(e);
                }
                if (!areEqual) {
                    this.emit(false);
                }
            }
        };
        SequenceEqualSubscriber.prototype.emit = function (value) {
            var destination = this.destination;
            destination.next(value);
            destination.complete();
        };
        SequenceEqualSubscriber.prototype.nextB = function (value) {
            if (this._oneComplete && this._a.length === 0) {
                this.emit(false);
            }
            else {
                this._b.push(value);
                this.checkValues();
            }
        };
        SequenceEqualSubscriber.prototype.completeB = function () {
            if (this._oneComplete) {
                this.emit(this._a.length === 0 && this._b.length === 0);
            }
            else {
                this._oneComplete = true;
            }
        };
        return SequenceEqualSubscriber;
    }(Subscriber));
    var SequenceEqualCompareToSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(SequenceEqualCompareToSubscriber, _super);
        function SequenceEqualCompareToSubscriber(destination, parent) {
            var _this = _super.call(this, destination) || this;
            _this.parent = parent;
            return _this;
        }
        SequenceEqualCompareToSubscriber.prototype._next = function (value) {
            this.parent.nextB(value);
        };
        SequenceEqualCompareToSubscriber.prototype._error = function (err) {
            this.parent.error(err);
            this.unsubscribe();
        };
        SequenceEqualCompareToSubscriber.prototype._complete = function () {
            this.parent.completeB();
            this.unsubscribe();
        };
        return SequenceEqualCompareToSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START _multicast,_refCount,_Subject PURE_IMPORTS_END */
    function shareSubjectFactory() {
        return new Subject();
    }
    function share() {
        return function (source) { return refCount()(multicast(shareSubjectFactory)(source)); };
    }

    /** PURE_IMPORTS_START _ReplaySubject PURE_IMPORTS_END */
    function shareReplay(configOrBufferSize, windowTime, scheduler) {
        var config;
        if (configOrBufferSize && typeof configOrBufferSize === 'object') {
            config = configOrBufferSize;
        }
        else {
            config = {
                bufferSize: configOrBufferSize,
                windowTime: windowTime,
                refCount: false,
                scheduler: scheduler,
            };
        }
        return function (source) { return source.lift(shareReplayOperator(config)); };
    }
    function shareReplayOperator(_a) {
        var _b = _a.bufferSize, bufferSize = _b === void 0 ? Number.POSITIVE_INFINITY : _b, _c = _a.windowTime, windowTime = _c === void 0 ? Number.POSITIVE_INFINITY : _c, useRefCount = _a.refCount, scheduler = _a.scheduler;
        var subject;
        var refCount = 0;
        var subscription;
        var hasError = false;
        var isComplete = false;
        return function shareReplayOperation(source) {
            refCount++;
            var innerSub;
            if (!subject || hasError) {
                hasError = false;
                subject = new ReplaySubject(bufferSize, windowTime, scheduler);
                innerSub = subject.subscribe(this);
                subscription = source.subscribe({
                    next: function (value) {
                        subject.next(value);
                    },
                    error: function (err) {
                        hasError = true;
                        subject.error(err);
                    },
                    complete: function () {
                        isComplete = true;
                        subscription = undefined;
                        subject.complete();
                    },
                });
                if (isComplete) {
                    subscription = undefined;
                }
            }
            else {
                innerSub = subject.subscribe(this);
            }
            this.add(function () {
                refCount--;
                innerSub.unsubscribe();
                innerSub = undefined;
                if (subscription && !isComplete && useRefCount && refCount === 0) {
                    subscription.unsubscribe();
                    subscription = undefined;
                    subject = undefined;
                }
            });
        };
    }

    /** PURE_IMPORTS_START tslib,_Subscriber,_util_EmptyError PURE_IMPORTS_END */
    function single(predicate) {
        return function (source) { return source.lift(new SingleOperator(predicate, source)); };
    }
    var SingleOperator = /*@__PURE__*/ (function () {
        function SingleOperator(predicate, source) {
            this.predicate = predicate;
            this.source = source;
        }
        SingleOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new SingleSubscriber(subscriber, this.predicate, this.source));
        };
        return SingleOperator;
    }());
    var SingleSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(SingleSubscriber, _super);
        function SingleSubscriber(destination, predicate, source) {
            var _this = _super.call(this, destination) || this;
            _this.predicate = predicate;
            _this.source = source;
            _this.seenValue = false;
            _this.index = 0;
            return _this;
        }
        SingleSubscriber.prototype.applySingleValue = function (value) {
            if (this.seenValue) {
                this.destination.error('Sequence contains more than one element');
            }
            else {
                this.seenValue = true;
                this.singleValue = value;
            }
        };
        SingleSubscriber.prototype._next = function (value) {
            var index = this.index++;
            if (this.predicate) {
                this.tryNext(value, index);
            }
            else {
                this.applySingleValue(value);
            }
        };
        SingleSubscriber.prototype.tryNext = function (value, index) {
            try {
                if (this.predicate(value, index, this.source)) {
                    this.applySingleValue(value);
                }
            }
            catch (err) {
                this.destination.error(err);
            }
        };
        SingleSubscriber.prototype._complete = function () {
            var destination = this.destination;
            if (this.index > 0) {
                destination.next(this.seenValue ? this.singleValue : undefined);
                destination.complete();
            }
            else {
                destination.error(new EmptyError);
            }
        };
        return SingleSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
    function skip(count) {
        return function (source) { return source.lift(new SkipOperator(count)); };
    }
    var SkipOperator = /*@__PURE__*/ (function () {
        function SkipOperator(total) {
            this.total = total;
        }
        SkipOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new SkipSubscriber(subscriber, this.total));
        };
        return SkipOperator;
    }());
    var SkipSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(SkipSubscriber, _super);
        function SkipSubscriber(destination, total) {
            var _this = _super.call(this, destination) || this;
            _this.total = total;
            _this.count = 0;
            return _this;
        }
        SkipSubscriber.prototype._next = function (x) {
            if (++this.count > this.total) {
                this.destination.next(x);
            }
        };
        return SkipSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START tslib,_Subscriber,_util_ArgumentOutOfRangeError PURE_IMPORTS_END */
    function skipLast(count) {
        return function (source) { return source.lift(new SkipLastOperator(count)); };
    }
    var SkipLastOperator = /*@__PURE__*/ (function () {
        function SkipLastOperator(_skipCount) {
            this._skipCount = _skipCount;
            if (this._skipCount < 0) {
                throw new ArgumentOutOfRangeError;
            }
        }
        SkipLastOperator.prototype.call = function (subscriber, source) {
            if (this._skipCount === 0) {
                return source.subscribe(new Subscriber(subscriber));
            }
            else {
                return source.subscribe(new SkipLastSubscriber(subscriber, this._skipCount));
            }
        };
        return SkipLastOperator;
    }());
    var SkipLastSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(SkipLastSubscriber, _super);
        function SkipLastSubscriber(destination, _skipCount) {
            var _this = _super.call(this, destination) || this;
            _this._skipCount = _skipCount;
            _this._count = 0;
            _this._ring = new Array(_skipCount);
            return _this;
        }
        SkipLastSubscriber.prototype._next = function (value) {
            var skipCount = this._skipCount;
            var count = this._count++;
            if (count < skipCount) {
                this._ring[count] = value;
            }
            else {
                var currentIndex = count % skipCount;
                var ring = this._ring;
                var oldValue = ring[currentIndex];
                ring[currentIndex] = value;
                this.destination.next(oldValue);
            }
        };
        return SkipLastSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */
    function skipUntil(notifier) {
        return function (source) { return source.lift(new SkipUntilOperator(notifier)); };
    }
    var SkipUntilOperator = /*@__PURE__*/ (function () {
        function SkipUntilOperator(notifier) {
            this.notifier = notifier;
        }
        SkipUntilOperator.prototype.call = function (destination, source) {
            return source.subscribe(new SkipUntilSubscriber(destination, this.notifier));
        };
        return SkipUntilOperator;
    }());
    var SkipUntilSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(SkipUntilSubscriber, _super);
        function SkipUntilSubscriber(destination, notifier) {
            var _this = _super.call(this, destination) || this;
            _this.hasValue = false;
            var innerSubscriber = new SimpleInnerSubscriber(_this);
            _this.add(innerSubscriber);
            _this.innerSubscription = innerSubscriber;
            var innerSubscription = innerSubscribe(notifier, innerSubscriber);
            if (innerSubscription !== innerSubscriber) {
                _this.add(innerSubscription);
                _this.innerSubscription = innerSubscription;
            }
            return _this;
        }
        SkipUntilSubscriber.prototype._next = function (value) {
            if (this.hasValue) {
                _super.prototype._next.call(this, value);
            }
        };
        SkipUntilSubscriber.prototype.notifyNext = function () {
            this.hasValue = true;
            if (this.innerSubscription) {
                this.innerSubscription.unsubscribe();
            }
        };
        SkipUntilSubscriber.prototype.notifyComplete = function () {
        };
        return SkipUntilSubscriber;
    }(SimpleOuterSubscriber));

    /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
    function skipWhile(predicate) {
        return function (source) { return source.lift(new SkipWhileOperator(predicate)); };
    }
    var SkipWhileOperator = /*@__PURE__*/ (function () {
        function SkipWhileOperator(predicate) {
            this.predicate = predicate;
        }
        SkipWhileOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new SkipWhileSubscriber(subscriber, this.predicate));
        };
        return SkipWhileOperator;
    }());
    var SkipWhileSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(SkipWhileSubscriber, _super);
        function SkipWhileSubscriber(destination, predicate) {
            var _this = _super.call(this, destination) || this;
            _this.predicate = predicate;
            _this.skipping = true;
            _this.index = 0;
            return _this;
        }
        SkipWhileSubscriber.prototype._next = function (value) {
            var destination = this.destination;
            if (this.skipping) {
                this.tryCallPredicate(value);
            }
            if (!this.skipping) {
                destination.next(value);
            }
        };
        SkipWhileSubscriber.prototype.tryCallPredicate = function (value) {
            try {
                var result = this.predicate(value, this.index++);
                this.skipping = Boolean(result);
            }
            catch (err) {
                this.destination.error(err);
            }
        };
        return SkipWhileSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START _observable_concat,_util_isScheduler PURE_IMPORTS_END */
    function startWith() {
        var array = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            array[_i] = arguments[_i];
        }
        var scheduler = array[array.length - 1];
        if (isScheduler(scheduler)) {
            array.pop();
            return function (source) { return concat$1(array, source, scheduler); };
        }
        else {
            return function (source) { return concat$1(array, source); };
        }
    }

    /** PURE_IMPORTS_START tslib,_Observable,_scheduler_asap,_util_isNumeric PURE_IMPORTS_END */
    var SubscribeOnObservable = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(SubscribeOnObservable, _super);
        function SubscribeOnObservable(source, delayTime, scheduler) {
            if (delayTime === void 0) {
                delayTime = 0;
            }
            if (scheduler === void 0) {
                scheduler = asap;
            }
            var _this = _super.call(this) || this;
            _this.source = source;
            _this.delayTime = delayTime;
            _this.scheduler = scheduler;
            if (!isNumeric(delayTime) || delayTime < 0) {
                _this.delayTime = 0;
            }
            if (!scheduler || typeof scheduler.schedule !== 'function') {
                _this.scheduler = asap;
            }
            return _this;
        }
        SubscribeOnObservable.create = function (source, delay, scheduler) {
            if (delay === void 0) {
                delay = 0;
            }
            if (scheduler === void 0) {
                scheduler = asap;
            }
            return new SubscribeOnObservable(source, delay, scheduler);
        };
        SubscribeOnObservable.dispatch = function (arg) {
            var source = arg.source, subscriber = arg.subscriber;
            return this.add(source.subscribe(subscriber));
        };
        SubscribeOnObservable.prototype._subscribe = function (subscriber) {
            var delay = this.delayTime;
            var source = this.source;
            var scheduler = this.scheduler;
            return scheduler.schedule(SubscribeOnObservable.dispatch, delay, {
                source: source, subscriber: subscriber
            });
        };
        return SubscribeOnObservable;
    }(Observable));

    /** PURE_IMPORTS_START _observable_SubscribeOnObservable PURE_IMPORTS_END */
    function subscribeOn(scheduler, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        return function subscribeOnOperatorFunction(source) {
            return source.lift(new SubscribeOnOperator(scheduler, delay));
        };
    }
    var SubscribeOnOperator = /*@__PURE__*/ (function () {
        function SubscribeOnOperator(scheduler, delay) {
            this.scheduler = scheduler;
            this.delay = delay;
        }
        SubscribeOnOperator.prototype.call = function (subscriber, source) {
            return new SubscribeOnObservable(source, this.delay, this.scheduler).subscribe(subscriber);
        };
        return SubscribeOnOperator;
    }());

    /** PURE_IMPORTS_START tslib,_map,_observable_from,_innerSubscribe PURE_IMPORTS_END */
    function switchMap(project, resultSelector) {
        if (typeof resultSelector === 'function') {
            return function (source) { return source.pipe(switchMap(function (a, i) { return from(project(a, i)).pipe(map(function (b, ii) { return resultSelector(a, b, i, ii); })); })); };
        }
        return function (source) { return source.lift(new SwitchMapOperator(project)); };
    }
    var SwitchMapOperator = /*@__PURE__*/ (function () {
        function SwitchMapOperator(project) {
            this.project = project;
        }
        SwitchMapOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new SwitchMapSubscriber(subscriber, this.project));
        };
        return SwitchMapOperator;
    }());
    var SwitchMapSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(SwitchMapSubscriber, _super);
        function SwitchMapSubscriber(destination, project) {
            var _this = _super.call(this, destination) || this;
            _this.project = project;
            _this.index = 0;
            return _this;
        }
        SwitchMapSubscriber.prototype._next = function (value) {
            var result;
            var index = this.index++;
            try {
                result = this.project(value, index);
            }
            catch (error) {
                this.destination.error(error);
                return;
            }
            this._innerSub(result);
        };
        SwitchMapSubscriber.prototype._innerSub = function (result) {
            var innerSubscription = this.innerSubscription;
            if (innerSubscription) {
                innerSubscription.unsubscribe();
            }
            var innerSubscriber = new SimpleInnerSubscriber(this);
            var destination = this.destination;
            destination.add(innerSubscriber);
            this.innerSubscription = innerSubscribe(result, innerSubscriber);
            if (this.innerSubscription !== innerSubscriber) {
                destination.add(this.innerSubscription);
            }
        };
        SwitchMapSubscriber.prototype._complete = function () {
            var innerSubscription = this.innerSubscription;
            if (!innerSubscription || innerSubscription.closed) {
                _super.prototype._complete.call(this);
            }
            this.unsubscribe();
        };
        SwitchMapSubscriber.prototype._unsubscribe = function () {
            this.innerSubscription = undefined;
        };
        SwitchMapSubscriber.prototype.notifyComplete = function () {
            this.innerSubscription = undefined;
            if (this.isStopped) {
                _super.prototype._complete.call(this);
            }
        };
        SwitchMapSubscriber.prototype.notifyNext = function (innerValue) {
            this.destination.next(innerValue);
        };
        return SwitchMapSubscriber;
    }(SimpleOuterSubscriber));

    /** PURE_IMPORTS_START _switchMap,_util_identity PURE_IMPORTS_END */
    function switchAll() {
        return switchMap(identity);
    }

    /** PURE_IMPORTS_START _switchMap PURE_IMPORTS_END */
    function switchMapTo(innerObservable, resultSelector) {
        return resultSelector ? switchMap(function () { return innerObservable; }, resultSelector) : switchMap(function () { return innerObservable; });
    }

    /** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */
    function takeUntil(notifier) {
        return function (source) { return source.lift(new TakeUntilOperator(notifier)); };
    }
    var TakeUntilOperator = /*@__PURE__*/ (function () {
        function TakeUntilOperator(notifier) {
            this.notifier = notifier;
        }
        TakeUntilOperator.prototype.call = function (subscriber, source) {
            var takeUntilSubscriber = new TakeUntilSubscriber(subscriber);
            var notifierSubscription = innerSubscribe(this.notifier, new SimpleInnerSubscriber(takeUntilSubscriber));
            if (notifierSubscription && !takeUntilSubscriber.seenValue) {
                takeUntilSubscriber.add(notifierSubscription);
                return source.subscribe(takeUntilSubscriber);
            }
            return takeUntilSubscriber;
        };
        return TakeUntilOperator;
    }());
    var TakeUntilSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(TakeUntilSubscriber, _super);
        function TakeUntilSubscriber(destination) {
            var _this = _super.call(this, destination) || this;
            _this.seenValue = false;
            return _this;
        }
        TakeUntilSubscriber.prototype.notifyNext = function () {
            this.seenValue = true;
            this.complete();
        };
        TakeUntilSubscriber.prototype.notifyComplete = function () {
        };
        return TakeUntilSubscriber;
    }(SimpleOuterSubscriber));

    /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
    function takeWhile(predicate, inclusive) {
        if (inclusive === void 0) {
            inclusive = false;
        }
        return function (source) {
            return source.lift(new TakeWhileOperator(predicate, inclusive));
        };
    }
    var TakeWhileOperator = /*@__PURE__*/ (function () {
        function TakeWhileOperator(predicate, inclusive) {
            this.predicate = predicate;
            this.inclusive = inclusive;
        }
        TakeWhileOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new TakeWhileSubscriber(subscriber, this.predicate, this.inclusive));
        };
        return TakeWhileOperator;
    }());
    var TakeWhileSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(TakeWhileSubscriber, _super);
        function TakeWhileSubscriber(destination, predicate, inclusive) {
            var _this = _super.call(this, destination) || this;
            _this.predicate = predicate;
            _this.inclusive = inclusive;
            _this.index = 0;
            return _this;
        }
        TakeWhileSubscriber.prototype._next = function (value) {
            var destination = this.destination;
            var result;
            try {
                result = this.predicate(value, this.index++);
            }
            catch (err) {
                destination.error(err);
                return;
            }
            this.nextOrComplete(value, result);
        };
        TakeWhileSubscriber.prototype.nextOrComplete = function (value, predicateResult) {
            var destination = this.destination;
            if (Boolean(predicateResult)) {
                destination.next(value);
            }
            else {
                if (this.inclusive) {
                    destination.next(value);
                }
                destination.complete();
            }
        };
        return TakeWhileSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START tslib,_Subscriber,_util_noop,_util_isFunction PURE_IMPORTS_END */
    function tap(nextOrObserver, error, complete) {
        return function tapOperatorFunction(source) {
            return source.lift(new DoOperator(nextOrObserver, error, complete));
        };
    }
    var DoOperator = /*@__PURE__*/ (function () {
        function DoOperator(nextOrObserver, error, complete) {
            this.nextOrObserver = nextOrObserver;
            this.error = error;
            this.complete = complete;
        }
        DoOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new TapSubscriber(subscriber, this.nextOrObserver, this.error, this.complete));
        };
        return DoOperator;
    }());
    var TapSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(TapSubscriber, _super);
        function TapSubscriber(destination, observerOrNext, error, complete) {
            var _this = _super.call(this, destination) || this;
            _this._tapNext = noop;
            _this._tapError = noop;
            _this._tapComplete = noop;
            _this._tapError = error || noop;
            _this._tapComplete = complete || noop;
            if (isFunction(observerOrNext)) {
                _this._context = _this;
                _this._tapNext = observerOrNext;
            }
            else if (observerOrNext) {
                _this._context = observerOrNext;
                _this._tapNext = observerOrNext.next || noop;
                _this._tapError = observerOrNext.error || noop;
                _this._tapComplete = observerOrNext.complete || noop;
            }
            return _this;
        }
        TapSubscriber.prototype._next = function (value) {
            try {
                this._tapNext.call(this._context, value);
            }
            catch (err) {
                this.destination.error(err);
                return;
            }
            this.destination.next(value);
        };
        TapSubscriber.prototype._error = function (err) {
            try {
                this._tapError.call(this._context, err);
            }
            catch (err) {
                this.destination.error(err);
                return;
            }
            this.destination.error(err);
        };
        TapSubscriber.prototype._complete = function () {
            try {
                this._tapComplete.call(this._context);
            }
            catch (err) {
                this.destination.error(err);
                return;
            }
            return this.destination.complete();
        };
        return TapSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */
    var defaultThrottleConfig = {
        leading: true,
        trailing: false
    };
    function throttle(durationSelector, config) {
        if (config === void 0) {
            config = defaultThrottleConfig;
        }
        return function (source) { return source.lift(new ThrottleOperator(durationSelector, !!config.leading, !!config.trailing)); };
    }
    var ThrottleOperator = /*@__PURE__*/ (function () {
        function ThrottleOperator(durationSelector, leading, trailing) {
            this.durationSelector = durationSelector;
            this.leading = leading;
            this.trailing = trailing;
        }
        ThrottleOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new ThrottleSubscriber(subscriber, this.durationSelector, this.leading, this.trailing));
        };
        return ThrottleOperator;
    }());
    var ThrottleSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(ThrottleSubscriber, _super);
        function ThrottleSubscriber(destination, durationSelector, _leading, _trailing) {
            var _this = _super.call(this, destination) || this;
            _this.destination = destination;
            _this.durationSelector = durationSelector;
            _this._leading = _leading;
            _this._trailing = _trailing;
            _this._hasValue = false;
            return _this;
        }
        ThrottleSubscriber.prototype._next = function (value) {
            this._hasValue = true;
            this._sendValue = value;
            if (!this._throttled) {
                if (this._leading) {
                    this.send();
                }
                else {
                    this.throttle(value);
                }
            }
        };
        ThrottleSubscriber.prototype.send = function () {
            var _a = this, _hasValue = _a._hasValue, _sendValue = _a._sendValue;
            if (_hasValue) {
                this.destination.next(_sendValue);
                this.throttle(_sendValue);
            }
            this._hasValue = false;
            this._sendValue = undefined;
        };
        ThrottleSubscriber.prototype.throttle = function (value) {
            var duration = this.tryDurationSelector(value);
            if (!!duration) {
                this.add(this._throttled = innerSubscribe(duration, new SimpleInnerSubscriber(this)));
            }
        };
        ThrottleSubscriber.prototype.tryDurationSelector = function (value) {
            try {
                return this.durationSelector(value);
            }
            catch (err) {
                this.destination.error(err);
                return null;
            }
        };
        ThrottleSubscriber.prototype.throttlingDone = function () {
            var _a = this, _throttled = _a._throttled, _trailing = _a._trailing;
            if (_throttled) {
                _throttled.unsubscribe();
            }
            this._throttled = undefined;
            if (_trailing) {
                this.send();
            }
        };
        ThrottleSubscriber.prototype.notifyNext = function () {
            this.throttlingDone();
        };
        ThrottleSubscriber.prototype.notifyComplete = function () {
            this.throttlingDone();
        };
        return ThrottleSubscriber;
    }(SimpleOuterSubscriber));

    /** PURE_IMPORTS_START tslib,_Subscriber,_scheduler_async,_throttle PURE_IMPORTS_END */
    function throttleTime(duration, scheduler, config) {
        if (scheduler === void 0) {
            scheduler = async;
        }
        if (config === void 0) {
            config = defaultThrottleConfig;
        }
        return function (source) { return source.lift(new ThrottleTimeOperator(duration, scheduler, config.leading, config.trailing)); };
    }
    var ThrottleTimeOperator = /*@__PURE__*/ (function () {
        function ThrottleTimeOperator(duration, scheduler, leading, trailing) {
            this.duration = duration;
            this.scheduler = scheduler;
            this.leading = leading;
            this.trailing = trailing;
        }
        ThrottleTimeOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new ThrottleTimeSubscriber(subscriber, this.duration, this.scheduler, this.leading, this.trailing));
        };
        return ThrottleTimeOperator;
    }());
    var ThrottleTimeSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(ThrottleTimeSubscriber, _super);
        function ThrottleTimeSubscriber(destination, duration, scheduler, leading, trailing) {
            var _this = _super.call(this, destination) || this;
            _this.duration = duration;
            _this.scheduler = scheduler;
            _this.leading = leading;
            _this.trailing = trailing;
            _this._hasTrailingValue = false;
            _this._trailingValue = null;
            return _this;
        }
        ThrottleTimeSubscriber.prototype._next = function (value) {
            if (this.throttled) {
                if (this.trailing) {
                    this._trailingValue = value;
                    this._hasTrailingValue = true;
                }
            }
            else {
                this.add(this.throttled = this.scheduler.schedule(dispatchNext, this.duration, { subscriber: this }));
                if (this.leading) {
                    this.destination.next(value);
                }
                else if (this.trailing) {
                    this._trailingValue = value;
                    this._hasTrailingValue = true;
                }
            }
        };
        ThrottleTimeSubscriber.prototype._complete = function () {
            if (this._hasTrailingValue) {
                this.destination.next(this._trailingValue);
                this.destination.complete();
            }
            else {
                this.destination.complete();
            }
        };
        ThrottleTimeSubscriber.prototype.clearThrottle = function () {
            var throttled = this.throttled;
            if (throttled) {
                if (this.trailing && this._hasTrailingValue) {
                    this.destination.next(this._trailingValue);
                    this._trailingValue = null;
                    this._hasTrailingValue = false;
                }
                throttled.unsubscribe();
                this.remove(throttled);
                this.throttled = null;
            }
        };
        return ThrottleTimeSubscriber;
    }(Subscriber));
    function dispatchNext(arg) {
        var subscriber = arg.subscriber;
        subscriber.clearThrottle();
    }

    /** PURE_IMPORTS_START _scheduler_async,_scan,_observable_defer,_map PURE_IMPORTS_END */
    function timeInterval(scheduler) {
        if (scheduler === void 0) {
            scheduler = async;
        }
        return function (source) {
            return defer(function () {
                return source.pipe(scan(function (_a, value) {
                    var current = _a.current;
                    return ({ value: value, current: scheduler.now(), last: current });
                }, { current: scheduler.now(), value: undefined, last: undefined }), map(function (_a) {
                    var current = _a.current, last = _a.last, value = _a.value;
                    return new TimeInterval(value, current - last);
                }));
            });
        };
    }
    var TimeInterval = /*@__PURE__*/ (function () {
        function TimeInterval(value, interval) {
            this.value = value;
            this.interval = interval;
        }
        return TimeInterval;
    }());

    /** PURE_IMPORTS_START tslib,_scheduler_async,_util_isDate,_innerSubscribe PURE_IMPORTS_END */
    function timeoutWith(due, withObservable, scheduler) {
        if (scheduler === void 0) {
            scheduler = async;
        }
        return function (source) {
            var absoluteTimeout = isDate(due);
            var waitFor = absoluteTimeout ? (+due - scheduler.now()) : Math.abs(due);
            return source.lift(new TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler));
        };
    }
    var TimeoutWithOperator = /*@__PURE__*/ (function () {
        function TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler) {
            this.waitFor = waitFor;
            this.absoluteTimeout = absoluteTimeout;
            this.withObservable = withObservable;
            this.scheduler = scheduler;
        }
        TimeoutWithOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new TimeoutWithSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.withObservable, this.scheduler));
        };
        return TimeoutWithOperator;
    }());
    var TimeoutWithSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(TimeoutWithSubscriber, _super);
        function TimeoutWithSubscriber(destination, absoluteTimeout, waitFor, withObservable, scheduler) {
            var _this = _super.call(this, destination) || this;
            _this.absoluteTimeout = absoluteTimeout;
            _this.waitFor = waitFor;
            _this.withObservable = withObservable;
            _this.scheduler = scheduler;
            _this.scheduleTimeout();
            return _this;
        }
        TimeoutWithSubscriber.dispatchTimeout = function (subscriber) {
            var withObservable = subscriber.withObservable;
            subscriber._unsubscribeAndRecycle();
            subscriber.add(innerSubscribe(withObservable, new SimpleInnerSubscriber(subscriber)));
        };
        TimeoutWithSubscriber.prototype.scheduleTimeout = function () {
            var action = this.action;
            if (action) {
                this.action = action.schedule(this, this.waitFor);
            }
            else {
                this.add(this.action = this.scheduler.schedule(TimeoutWithSubscriber.dispatchTimeout, this.waitFor, this));
            }
        };
        TimeoutWithSubscriber.prototype._next = function (value) {
            if (!this.absoluteTimeout) {
                this.scheduleTimeout();
            }
            _super.prototype._next.call(this, value);
        };
        TimeoutWithSubscriber.prototype._unsubscribe = function () {
            this.action = undefined;
            this.scheduler = null;
            this.withObservable = null;
        };
        return TimeoutWithSubscriber;
    }(SimpleOuterSubscriber));

    /** PURE_IMPORTS_START _scheduler_async,_util_TimeoutError,_timeoutWith,_observable_throwError PURE_IMPORTS_END */
    function timeout(due, scheduler) {
        if (scheduler === void 0) {
            scheduler = async;
        }
        return timeoutWith(due, throwError(new TimeoutError()), scheduler);
    }

    /** PURE_IMPORTS_START _scheduler_async,_map PURE_IMPORTS_END */
    function timestamp(scheduler) {
        if (scheduler === void 0) {
            scheduler = async;
        }
        return map(function (value) { return new Timestamp(value, scheduler.now()); });
    }
    var Timestamp = /*@__PURE__*/ (function () {
        function Timestamp(value, timestamp) {
            this.value = value;
            this.timestamp = timestamp;
        }
        return Timestamp;
    }());

    /** PURE_IMPORTS_START _reduce PURE_IMPORTS_END */
    function toArrayReducer(arr, item, index) {
        if (index === 0) {
            return [item];
        }
        arr.push(item);
        return arr;
    }
    function toArray() {
        return reduce(toArrayReducer, []);
    }

    /** PURE_IMPORTS_START tslib,_Subject,_innerSubscribe PURE_IMPORTS_END */
    function window$1(windowBoundaries) {
        return function windowOperatorFunction(source) {
            return source.lift(new WindowOperator$1(windowBoundaries));
        };
    }
    var WindowOperator$1 = /*@__PURE__*/ (function () {
        function WindowOperator(windowBoundaries) {
            this.windowBoundaries = windowBoundaries;
        }
        WindowOperator.prototype.call = function (subscriber, source) {
            var windowSubscriber = new WindowSubscriber$1(subscriber);
            var sourceSubscription = source.subscribe(windowSubscriber);
            if (!sourceSubscription.closed) {
                windowSubscriber.add(innerSubscribe(this.windowBoundaries, new SimpleInnerSubscriber(windowSubscriber)));
            }
            return sourceSubscription;
        };
        return WindowOperator;
    }());
    var WindowSubscriber$1 = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(WindowSubscriber, _super);
        function WindowSubscriber(destination) {
            var _this = _super.call(this, destination) || this;
            _this.window = new Subject();
            destination.next(_this.window);
            return _this;
        }
        WindowSubscriber.prototype.notifyNext = function () {
            this.openWindow();
        };
        WindowSubscriber.prototype.notifyError = function (error) {
            this._error(error);
        };
        WindowSubscriber.prototype.notifyComplete = function () {
            this._complete();
        };
        WindowSubscriber.prototype._next = function (value) {
            this.window.next(value);
        };
        WindowSubscriber.prototype._error = function (err) {
            this.window.error(err);
            this.destination.error(err);
        };
        WindowSubscriber.prototype._complete = function () {
            this.window.complete();
            this.destination.complete();
        };
        WindowSubscriber.prototype._unsubscribe = function () {
            this.window = null;
        };
        WindowSubscriber.prototype.openWindow = function () {
            var prevWindow = this.window;
            if (prevWindow) {
                prevWindow.complete();
            }
            var destination = this.destination;
            var newWindow = this.window = new Subject();
            destination.next(newWindow);
        };
        return WindowSubscriber;
    }(SimpleOuterSubscriber));

    /** PURE_IMPORTS_START tslib,_Subscriber,_Subject PURE_IMPORTS_END */
    function windowCount(windowSize, startWindowEvery) {
        if (startWindowEvery === void 0) {
            startWindowEvery = 0;
        }
        return function windowCountOperatorFunction(source) {
            return source.lift(new WindowCountOperator(windowSize, startWindowEvery));
        };
    }
    var WindowCountOperator = /*@__PURE__*/ (function () {
        function WindowCountOperator(windowSize, startWindowEvery) {
            this.windowSize = windowSize;
            this.startWindowEvery = startWindowEvery;
        }
        WindowCountOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new WindowCountSubscriber(subscriber, this.windowSize, this.startWindowEvery));
        };
        return WindowCountOperator;
    }());
    var WindowCountSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(WindowCountSubscriber, _super);
        function WindowCountSubscriber(destination, windowSize, startWindowEvery) {
            var _this = _super.call(this, destination) || this;
            _this.destination = destination;
            _this.windowSize = windowSize;
            _this.startWindowEvery = startWindowEvery;
            _this.windows = [new Subject()];
            _this.count = 0;
            destination.next(_this.windows[0]);
            return _this;
        }
        WindowCountSubscriber.prototype._next = function (value) {
            var startWindowEvery = (this.startWindowEvery > 0) ? this.startWindowEvery : this.windowSize;
            var destination = this.destination;
            var windowSize = this.windowSize;
            var windows = this.windows;
            var len = windows.length;
            for (var i = 0; i < len && !this.closed; i++) {
                windows[i].next(value);
            }
            var c = this.count - windowSize + 1;
            if (c >= 0 && c % startWindowEvery === 0 && !this.closed) {
                windows.shift().complete();
            }
            if (++this.count % startWindowEvery === 0 && !this.closed) {
                var window_1 = new Subject();
                windows.push(window_1);
                destination.next(window_1);
            }
        };
        WindowCountSubscriber.prototype._error = function (err) {
            var windows = this.windows;
            if (windows) {
                while (windows.length > 0 && !this.closed) {
                    windows.shift().error(err);
                }
            }
            this.destination.error(err);
        };
        WindowCountSubscriber.prototype._complete = function () {
            var windows = this.windows;
            if (windows) {
                while (windows.length > 0 && !this.closed) {
                    windows.shift().complete();
                }
            }
            this.destination.complete();
        };
        WindowCountSubscriber.prototype._unsubscribe = function () {
            this.count = 0;
            this.windows = null;
        };
        return WindowCountSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START tslib,_Subject,_scheduler_async,_Subscriber,_util_isNumeric,_util_isScheduler PURE_IMPORTS_END */
    function windowTime(windowTimeSpan) {
        var scheduler = async;
        var windowCreationInterval = null;
        var maxWindowSize = Number.POSITIVE_INFINITY;
        if (isScheduler(arguments[3])) {
            scheduler = arguments[3];
        }
        if (isScheduler(arguments[2])) {
            scheduler = arguments[2];
        }
        else if (isNumeric(arguments[2])) {
            maxWindowSize = Number(arguments[2]);
        }
        if (isScheduler(arguments[1])) {
            scheduler = arguments[1];
        }
        else if (isNumeric(arguments[1])) {
            windowCreationInterval = Number(arguments[1]);
        }
        return function windowTimeOperatorFunction(source) {
            return source.lift(new WindowTimeOperator(windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler));
        };
    }
    var WindowTimeOperator = /*@__PURE__*/ (function () {
        function WindowTimeOperator(windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler) {
            this.windowTimeSpan = windowTimeSpan;
            this.windowCreationInterval = windowCreationInterval;
            this.maxWindowSize = maxWindowSize;
            this.scheduler = scheduler;
        }
        WindowTimeOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new WindowTimeSubscriber(subscriber, this.windowTimeSpan, this.windowCreationInterval, this.maxWindowSize, this.scheduler));
        };
        return WindowTimeOperator;
    }());
    var CountedSubject = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(CountedSubject, _super);
        function CountedSubject() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._numberOfNextedValues = 0;
            return _this;
        }
        CountedSubject.prototype.next = function (value) {
            this._numberOfNextedValues++;
            _super.prototype.next.call(this, value);
        };
        Object.defineProperty(CountedSubject.prototype, "numberOfNextedValues", {
            get: function () {
                return this._numberOfNextedValues;
            },
            enumerable: true,
            configurable: true
        });
        return CountedSubject;
    }(Subject));
    var WindowTimeSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(WindowTimeSubscriber, _super);
        function WindowTimeSubscriber(destination, windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler) {
            var _this = _super.call(this, destination) || this;
            _this.destination = destination;
            _this.windowTimeSpan = windowTimeSpan;
            _this.windowCreationInterval = windowCreationInterval;
            _this.maxWindowSize = maxWindowSize;
            _this.scheduler = scheduler;
            _this.windows = [];
            var window = _this.openWindow();
            if (windowCreationInterval !== null && windowCreationInterval >= 0) {
                var closeState = { subscriber: _this, window: window, context: null };
                var creationState = { windowTimeSpan: windowTimeSpan, windowCreationInterval: windowCreationInterval, subscriber: _this, scheduler: scheduler };
                _this.add(scheduler.schedule(dispatchWindowClose, windowTimeSpan, closeState));
                _this.add(scheduler.schedule(dispatchWindowCreation, windowCreationInterval, creationState));
            }
            else {
                var timeSpanOnlyState = { subscriber: _this, window: window, windowTimeSpan: windowTimeSpan };
                _this.add(scheduler.schedule(dispatchWindowTimeSpanOnly, windowTimeSpan, timeSpanOnlyState));
            }
            return _this;
        }
        WindowTimeSubscriber.prototype._next = function (value) {
            var windows = this.windows;
            var len = windows.length;
            for (var i = 0; i < len; i++) {
                var window_1 = windows[i];
                if (!window_1.closed) {
                    window_1.next(value);
                    if (window_1.numberOfNextedValues >= this.maxWindowSize) {
                        this.closeWindow(window_1);
                    }
                }
            }
        };
        WindowTimeSubscriber.prototype._error = function (err) {
            var windows = this.windows;
            while (windows.length > 0) {
                windows.shift().error(err);
            }
            this.destination.error(err);
        };
        WindowTimeSubscriber.prototype._complete = function () {
            var windows = this.windows;
            while (windows.length > 0) {
                var window_2 = windows.shift();
                if (!window_2.closed) {
                    window_2.complete();
                }
            }
            this.destination.complete();
        };
        WindowTimeSubscriber.prototype.openWindow = function () {
            var window = new CountedSubject();
            this.windows.push(window);
            var destination = this.destination;
            destination.next(window);
            return window;
        };
        WindowTimeSubscriber.prototype.closeWindow = function (window) {
            window.complete();
            var windows = this.windows;
            windows.splice(windows.indexOf(window), 1);
        };
        return WindowTimeSubscriber;
    }(Subscriber));
    function dispatchWindowTimeSpanOnly(state) {
        var subscriber = state.subscriber, windowTimeSpan = state.windowTimeSpan, window = state.window;
        if (window) {
            subscriber.closeWindow(window);
        }
        state.window = subscriber.openWindow();
        this.schedule(state, windowTimeSpan);
    }
    function dispatchWindowCreation(state) {
        var windowTimeSpan = state.windowTimeSpan, subscriber = state.subscriber, scheduler = state.scheduler, windowCreationInterval = state.windowCreationInterval;
        var window = subscriber.openWindow();
        var action = this;
        var context = { action: action, subscription: null };
        var timeSpanState = { subscriber: subscriber, window: window, context: context };
        context.subscription = scheduler.schedule(dispatchWindowClose, windowTimeSpan, timeSpanState);
        action.add(context.subscription);
        action.schedule(state, windowCreationInterval);
    }
    function dispatchWindowClose(state) {
        var subscriber = state.subscriber, window = state.window, context = state.context;
        if (context && context.action && context.subscription) {
            context.action.remove(context.subscription);
        }
        subscriber.closeWindow(window);
    }

    /** PURE_IMPORTS_START tslib,_Subject,_Subscription,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */
    function windowToggle(openings, closingSelector) {
        return function (source) { return source.lift(new WindowToggleOperator(openings, closingSelector)); };
    }
    var WindowToggleOperator = /*@__PURE__*/ (function () {
        function WindowToggleOperator(openings, closingSelector) {
            this.openings = openings;
            this.closingSelector = closingSelector;
        }
        WindowToggleOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new WindowToggleSubscriber(subscriber, this.openings, this.closingSelector));
        };
        return WindowToggleOperator;
    }());
    var WindowToggleSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(WindowToggleSubscriber, _super);
        function WindowToggleSubscriber(destination, openings, closingSelector) {
            var _this = _super.call(this, destination) || this;
            _this.openings = openings;
            _this.closingSelector = closingSelector;
            _this.contexts = [];
            _this.add(_this.openSubscription = subscribeToResult(_this, openings, openings));
            return _this;
        }
        WindowToggleSubscriber.prototype._next = function (value) {
            var contexts = this.contexts;
            if (contexts) {
                var len = contexts.length;
                for (var i = 0; i < len; i++) {
                    contexts[i].window.next(value);
                }
            }
        };
        WindowToggleSubscriber.prototype._error = function (err) {
            var contexts = this.contexts;
            this.contexts = null;
            if (contexts) {
                var len = contexts.length;
                var index = -1;
                while (++index < len) {
                    var context_1 = contexts[index];
                    context_1.window.error(err);
                    context_1.subscription.unsubscribe();
                }
            }
            _super.prototype._error.call(this, err);
        };
        WindowToggleSubscriber.prototype._complete = function () {
            var contexts = this.contexts;
            this.contexts = null;
            if (contexts) {
                var len = contexts.length;
                var index = -1;
                while (++index < len) {
                    var context_2 = contexts[index];
                    context_2.window.complete();
                    context_2.subscription.unsubscribe();
                }
            }
            _super.prototype._complete.call(this);
        };
        WindowToggleSubscriber.prototype._unsubscribe = function () {
            var contexts = this.contexts;
            this.contexts = null;
            if (contexts) {
                var len = contexts.length;
                var index = -1;
                while (++index < len) {
                    var context_3 = contexts[index];
                    context_3.window.unsubscribe();
                    context_3.subscription.unsubscribe();
                }
            }
        };
        WindowToggleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            if (outerValue === this.openings) {
                var closingNotifier = void 0;
                try {
                    var closingSelector = this.closingSelector;
                    closingNotifier = closingSelector(innerValue);
                }
                catch (e) {
                    return this.error(e);
                }
                var window_1 = new Subject();
                var subscription = new Subscription();
                var context_4 = { window: window_1, subscription: subscription };
                this.contexts.push(context_4);
                var innerSubscription = subscribeToResult(this, closingNotifier, context_4);
                if (innerSubscription.closed) {
                    this.closeWindow(this.contexts.length - 1);
                }
                else {
                    innerSubscription.context = context_4;
                    subscription.add(innerSubscription);
                }
                this.destination.next(window_1);
            }
            else {
                this.closeWindow(this.contexts.indexOf(outerValue));
            }
        };
        WindowToggleSubscriber.prototype.notifyError = function (err) {
            this.error(err);
        };
        WindowToggleSubscriber.prototype.notifyComplete = function (inner) {
            if (inner !== this.openSubscription) {
                this.closeWindow(this.contexts.indexOf(inner.context));
            }
        };
        WindowToggleSubscriber.prototype.closeWindow = function (index) {
            if (index === -1) {
                return;
            }
            var contexts = this.contexts;
            var context = contexts[index];
            var window = context.window, subscription = context.subscription;
            contexts.splice(index, 1);
            window.complete();
            subscription.unsubscribe();
        };
        return WindowToggleSubscriber;
    }(OuterSubscriber));

    /** PURE_IMPORTS_START tslib,_Subject,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */
    function windowWhen(closingSelector) {
        return function windowWhenOperatorFunction(source) {
            return source.lift(new WindowOperator(closingSelector));
        };
    }
    var WindowOperator = /*@__PURE__*/ (function () {
        function WindowOperator(closingSelector) {
            this.closingSelector = closingSelector;
        }
        WindowOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new WindowSubscriber(subscriber, this.closingSelector));
        };
        return WindowOperator;
    }());
    var WindowSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(WindowSubscriber, _super);
        function WindowSubscriber(destination, closingSelector) {
            var _this = _super.call(this, destination) || this;
            _this.destination = destination;
            _this.closingSelector = closingSelector;
            _this.openWindow();
            return _this;
        }
        WindowSubscriber.prototype.notifyNext = function (_outerValue, _innerValue, _outerIndex, _innerIndex, innerSub) {
            this.openWindow(innerSub);
        };
        WindowSubscriber.prototype.notifyError = function (error) {
            this._error(error);
        };
        WindowSubscriber.prototype.notifyComplete = function (innerSub) {
            this.openWindow(innerSub);
        };
        WindowSubscriber.prototype._next = function (value) {
            this.window.next(value);
        };
        WindowSubscriber.prototype._error = function (err) {
            this.window.error(err);
            this.destination.error(err);
            this.unsubscribeClosingNotification();
        };
        WindowSubscriber.prototype._complete = function () {
            this.window.complete();
            this.destination.complete();
            this.unsubscribeClosingNotification();
        };
        WindowSubscriber.prototype.unsubscribeClosingNotification = function () {
            if (this.closingNotification) {
                this.closingNotification.unsubscribe();
            }
        };
        WindowSubscriber.prototype.openWindow = function (innerSub) {
            if (innerSub === void 0) {
                innerSub = null;
            }
            if (innerSub) {
                this.remove(innerSub);
                innerSub.unsubscribe();
            }
            var prevWindow = this.window;
            if (prevWindow) {
                prevWindow.complete();
            }
            var window = this.window = new Subject();
            this.destination.next(window);
            var closingNotifier;
            try {
                var closingSelector = this.closingSelector;
                closingNotifier = closingSelector();
            }
            catch (e) {
                this.destination.error(e);
                this.window.error(e);
                return;
            }
            this.add(this.closingNotification = subscribeToResult(this, closingNotifier));
        };
        return WindowSubscriber;
    }(OuterSubscriber));

    /** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */
    function withLatestFrom() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return function (source) {
            var project;
            if (typeof args[args.length - 1] === 'function') {
                project = args.pop();
            }
            var observables = args;
            return source.lift(new WithLatestFromOperator(observables, project));
        };
    }
    var WithLatestFromOperator = /*@__PURE__*/ (function () {
        function WithLatestFromOperator(observables, project) {
            this.observables = observables;
            this.project = project;
        }
        WithLatestFromOperator.prototype.call = function (subscriber, source) {
            return source.subscribe(new WithLatestFromSubscriber(subscriber, this.observables, this.project));
        };
        return WithLatestFromOperator;
    }());
    var WithLatestFromSubscriber = /*@__PURE__*/ (function (_super) {
        tslib_1__namespace.__extends(WithLatestFromSubscriber, _super);
        function WithLatestFromSubscriber(destination, observables, project) {
            var _this = _super.call(this, destination) || this;
            _this.observables = observables;
            _this.project = project;
            _this.toRespond = [];
            var len = observables.length;
            _this.values = new Array(len);
            for (var i = 0; i < len; i++) {
                _this.toRespond.push(i);
            }
            for (var i = 0; i < len; i++) {
                var observable = observables[i];
                _this.add(subscribeToResult(_this, observable, undefined, i));
            }
            return _this;
        }
        WithLatestFromSubscriber.prototype.notifyNext = function (_outerValue, innerValue, outerIndex) {
            this.values[outerIndex] = innerValue;
            var toRespond = this.toRespond;
            if (toRespond.length > 0) {
                var found = toRespond.indexOf(outerIndex);
                if (found !== -1) {
                    toRespond.splice(found, 1);
                }
            }
        };
        WithLatestFromSubscriber.prototype.notifyComplete = function () {
        };
        WithLatestFromSubscriber.prototype._next = function (value) {
            if (this.toRespond.length === 0) {
                var args = [value].concat(this.values);
                if (this.project) {
                    this._tryProject(args);
                }
                else {
                    this.destination.next(args);
                }
            }
        };
        WithLatestFromSubscriber.prototype._tryProject = function (args) {
            var result;
            try {
                result = this.project.apply(this, args);
            }
            catch (err) {
                this.destination.error(err);
                return;
            }
            this.destination.next(result);
        };
        return WithLatestFromSubscriber;
    }(OuterSubscriber));

    /** PURE_IMPORTS_START _observable_zip PURE_IMPORTS_END */
    function zip() {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            observables[_i] = arguments[_i];
        }
        return function zipOperatorFunction(source) {
            return source.lift.call(zip$1.apply(void 0, [source].concat(observables)));
        };
    }

    /** PURE_IMPORTS_START _observable_zip PURE_IMPORTS_END */
    function zipAll(project) {
        return function (source) { return source.lift(new ZipOperator(project)); };
    }

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */

    /**
     * @license Angular v11.0.9
     * (c) 2010-2020 Google LLC. https://angular.io/
     * License: MIT
     */
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Used to provide a `ControlValueAccessor` for form controls.
     *
     * See `DefaultValueAccessor` for how to implement one.
     *
     * @publicApi
     */
    var NG_VALUE_ACCESSOR = new i0.InjectionToken('NgValueAccessor');
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var CHECKBOX_VALUE_ACCESSOR = {
        provide: NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return CheckboxControlValueAccessor; }),
        multi: true,
    };
    /**
     * @description
     * A `ControlValueAccessor` for writing a value and listening to changes on a checkbox input
     * element.
     *
     * @usageNotes
     *
     * ### Using a checkbox with a reactive form.
     *
     * The following example shows how to use a checkbox with a reactive form.
     *
     * ```ts
     * const rememberLoginControl = new FormControl();
     * ```
     *
     * ```
     * <input type="checkbox" [formControl]="rememberLoginControl">
     * ```
     *
     * @ngModule ReactiveFormsModule
     * @ngModule FormsModule
     * @publicApi
     */
    var CheckboxControlValueAccessor = /** @class */ (function () {
        function CheckboxControlValueAccessor(_renderer, _elementRef) {
            this._renderer = _renderer;
            this._elementRef = _elementRef;
            /**
             * The registered callback function called when a change event occurs on the input element.
             * @nodoc
             */
            this.onChange = function (_) { };
            /**
             * The registered callback function called when a blur event occurs on the input element.
             * @nodoc
             */
            this.onTouched = function () { };
        }
        /**
         * Sets the "checked" property on the input element.
         * @nodoc
         */
        CheckboxControlValueAccessor.prototype.writeValue = function (value) {
            this._renderer.setProperty(this._elementRef.nativeElement, 'checked', value);
        };
        /**
         * Registers a function called when the control value changes.
         * @nodoc
         */
        CheckboxControlValueAccessor.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        /**
         * Registers a function called when the control is touched.
         * @nodoc
         */
        CheckboxControlValueAccessor.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        /**
         * Sets the "disabled" property on the input element.
         * @nodoc
         */
        CheckboxControlValueAccessor.prototype.setDisabledState = function (isDisabled) {
            this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
        };
        return CheckboxControlValueAccessor;
    }());
    CheckboxControlValueAccessor.decorators = [
        { type: i0.Directive, args: [{
                    selector: 'input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]',
                    host: { '(change)': 'onChange($event.target.checked)', '(blur)': 'onTouched()' },
                    providers: [CHECKBOX_VALUE_ACCESSOR]
                },] }
    ];
    CheckboxControlValueAccessor.ctorParameters = function () { return [
        { type: i0.Renderer2 },
        { type: i0.ElementRef }
    ]; };
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var DEFAULT_VALUE_ACCESSOR = {
        provide: NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return DefaultValueAccessor; }),
        multi: true
    };
    /**
     * We must check whether the agent is Android because composition events
     * behave differently between iOS and Android.
     */
    function _isAndroid() {
        var userAgent = common["ɵgetDOM"]() ? common["ɵgetDOM"]().getUserAgent() : '';
        return /android (\d+)/.test(userAgent.toLowerCase());
    }
    /**
     * @description
     * Provide this token to control if form directives buffer IME input until
     * the "compositionend" event occurs.
     * @publicApi
     */
    var COMPOSITION_BUFFER_MODE = new i0.InjectionToken('CompositionEventMode');
    /**
     * @description
     *
     * {@searchKeywords ngDefaultControl}
     *
     * The default `ControlValueAccessor` for writing a value and listening to changes on input
     * elements. The accessor is used by the `FormControlDirective`, `FormControlName`, and
     * `NgModel` directives.
     *
     * @usageNotes
     *
     * ### Using the default value accessor
     *
     * The following example shows how to use an input element that activates the default value accessor
     * (in this case, a text field).
     *
     * ```ts
     * const firstNameControl = new FormControl();
     * ```
     *
     * ```
     * <input type="text" [formControl]="firstNameControl">
     * ```
     *
     * This value accessor is used by default for `<input type="text">` and `<textarea>` elements, but
     * you could also use it for custom components that have similar behavior and do not require special
     * processing. In order to attach the default value accessor to a custom element, add the
     * `ngDefaultControl` attribute as shown below.
     *
     * ```
     * <custom-input-component ngDefaultControl [(ngModel)]="value"></custom-input-component>
     * ```
     *
     * @ngModule ReactiveFormsModule
     * @ngModule FormsModule
     * @publicApi
     */
    var DefaultValueAccessor = /** @class */ (function () {
        function DefaultValueAccessor(_renderer, _elementRef, _compositionMode) {
            this._renderer = _renderer;
            this._elementRef = _elementRef;
            this._compositionMode = _compositionMode;
            /**
             * The registered callback function called when an input event occurs on the input element.
             * @nodoc
             */
            this.onChange = function (_) { };
            /**
             * The registered callback function called when a blur event occurs on the input element.
             * @nodoc
             */
            this.onTouched = function () { };
            /** Whether the user is creating a composition string (IME events). */
            this._composing = false;
            if (this._compositionMode == null) {
                this._compositionMode = !_isAndroid();
            }
        }
        /**
         * Sets the "value" property on the input element.
         * @nodoc
         */
        DefaultValueAccessor.prototype.writeValue = function (value) {
            var normalizedValue = value == null ? '' : value;
            this._renderer.setProperty(this._elementRef.nativeElement, 'value', normalizedValue);
        };
        /**
         * Registers a function called when the control value changes.
         * @nodoc
         */
        DefaultValueAccessor.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        /**
         * Registers a function called when the control is touched.
         * @nodoc
         */
        DefaultValueAccessor.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        /**
         * Sets the "disabled" property on the input element.
         * @nodoc
         */
        DefaultValueAccessor.prototype.setDisabledState = function (isDisabled) {
            this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
        };
        /** @internal */
        DefaultValueAccessor.prototype._handleInput = function (value) {
            if (!this._compositionMode || (this._compositionMode && !this._composing)) {
                this.onChange(value);
            }
        };
        /** @internal */
        DefaultValueAccessor.prototype._compositionStart = function () {
            this._composing = true;
        };
        /** @internal */
        DefaultValueAccessor.prototype._compositionEnd = function (value) {
            this._composing = false;
            this._compositionMode && this.onChange(value);
        };
        return DefaultValueAccessor;
    }());
    DefaultValueAccessor.decorators = [
        { type: i0.Directive, args: [{
                    selector: 'input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]',
                    // TODO: vsavkin replace the above selector with the one below it once
                    // https://github.com/angular/angular/issues/3011 is implemented
                    // selector: '[ngModel],[formControl],[formControlName]',
                    host: {
                        '(input)': '$any(this)._handleInput($event.target.value)',
                        '(blur)': 'onTouched()',
                        '(compositionstart)': '$any(this)._compositionStart()',
                        '(compositionend)': '$any(this)._compositionEnd($event.target.value)'
                    },
                    providers: [DEFAULT_VALUE_ACCESSOR]
                },] }
    ];
    DefaultValueAccessor.ctorParameters = function () { return [
        { type: i0.Renderer2 },
        { type: i0.ElementRef },
        { type: Boolean, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [COMPOSITION_BUFFER_MODE,] }] }
    ]; };
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function isEmptyInputValue(value) {
        // we don't check for string here so it also works with arrays
        return value == null || value.length === 0;
    }
    function hasValidLength(value) {
        // non-strict comparison is intentional, to check for both `null` and `undefined` values
        return value != null && typeof value.length === 'number';
    }
    /**
     * @description
     * An `InjectionToken` for registering additional synchronous validators used with
     * `AbstractControl`s.
     *
     * @see `NG_ASYNC_VALIDATORS`
     *
     * @usageNotes
     *
     * ### Providing a custom validator
     *
     * The following example registers a custom validator directive. Adding the validator to the
     * existing collection of validators requires the `multi: true` option.
     *
     * ```typescript
     * @Directive({
     *   selector: '[customValidator]',
     *   providers: [{provide: NG_VALIDATORS, useExisting: CustomValidatorDirective, multi: true}]
     * })
     * class CustomValidatorDirective implements Validator {
     *   validate(control: AbstractControl): ValidationErrors | null {
     *     return { 'custom': true };
     *   }
     * }
     * ```
     *
     * @publicApi
     */
    var NG_VALIDATORS = new i0.InjectionToken('NgValidators');
    /**
     * @description
     * An `InjectionToken` for registering additional asynchronous validators used with
     * `AbstractControl`s.
     *
     * @see `NG_VALIDATORS`
     *
     * @publicApi
     */
    var NG_ASYNC_VALIDATORS = new i0.InjectionToken('NgAsyncValidators');
    /**
     * A regular expression that matches valid e-mail addresses.
     *
     * At a high level, this regexp matches e-mail addresses of the format `local-part@tld`, where:
     * - `local-part` consists of one or more of the allowed characters (alphanumeric and some
     *   punctuation symbols).
     * - `local-part` cannot begin or end with a period (`.`).
     * - `local-part` cannot be longer than 64 characters.
     * - `tld` consists of one or more `labels` separated by periods (`.`). For example `localhost` or
     *   `foo.com`.
     * - A `label` consists of one or more of the allowed characters (alphanumeric, dashes (`-`) and
     *   periods (`.`)).
     * - A `label` cannot begin or end with a dash (`-`) or a period (`.`).
     * - A `label` cannot be longer than 63 characters.
     * - The whole address cannot be longer than 254 characters.
     *
     * ## Implementation background
     *
     * This regexp was ported over from AngularJS (see there for git history):
     * https://github.com/angular/angular.js/blob/c133ef836/src/ng/directive/input.js#L27
     * It is based on the
     * [WHATWG version](https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address) with
     * some enhancements to incorporate more RFC rules (such as rules related to domain names and the
     * lengths of different parts of the address). The main differences from the WHATWG version are:
     *   - Disallow `local-part` to begin or end with a period (`.`).
     *   - Disallow `local-part` length to exceed 64 characters.
     *   - Disallow total address length to exceed 254 characters.
     *
     * See [this commit](https://github.com/angular/angular.js/commit/f3f5cf72e) for more details.
     */
    var EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    /**
     * @description
     * Provides a set of built-in validators that can be used by form controls.
     *
     * A validator is a function that processes a `FormControl` or collection of
     * controls and returns an error map or null. A null map means that validation has passed.
     *
     * @see [Form Validation](/guide/form-validation)
     *
     * @publicApi
     */
    var Validators = /** @class */ (function () {
        function Validators() {
        }
        /**
         * @description
         * Validator that requires the control's value to be greater than or equal to the provided number.
         * The validator exists only as a function and not as a directive.
         *
         * @usageNotes
         *
         * ### Validate against a minimum of 3
         *
         * ```typescript
         * const control = new FormControl(2, Validators.min(3));
         *
         * console.log(control.errors); // {min: {min: 3, actual: 2}}
         * ```
         *
         * @returns A validator function that returns an error map with the
         * `min` property if the validation check fails, otherwise `null`.
         *
         * @see `updateValueAndValidity()`
         *
         */
        Validators.min = function (min) {
            return function (control) {
                if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
                    return null; // don't validate empty values to allow optional controls
                }
                var value = parseFloat(control.value);
                // Controls with NaN values after parsing should be treated as not having a
                // minimum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-min
                return !isNaN(value) && value < min ? { 'min': { 'min': min, 'actual': control.value } } : null;
            };
        };
        /**
         * @description
         * Validator that requires the control's value to be less than or equal to the provided number.
         * The validator exists only as a function and not as a directive.
         *
         * @usageNotes
         *
         * ### Validate against a maximum of 15
         *
         * ```typescript
         * const control = new FormControl(16, Validators.max(15));
         *
         * console.log(control.errors); // {max: {max: 15, actual: 16}}
         * ```
         *
         * @returns A validator function that returns an error map with the
         * `max` property if the validation check fails, otherwise `null`.
         *
         * @see `updateValueAndValidity()`
         *
         */
        Validators.max = function (max) {
            return function (control) {
                if (isEmptyInputValue(control.value) || isEmptyInputValue(max)) {
                    return null; // don't validate empty values to allow optional controls
                }
                var value = parseFloat(control.value);
                // Controls with NaN values after parsing should be treated as not having a
                // maximum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-max
                return !isNaN(value) && value > max ? { 'max': { 'max': max, 'actual': control.value } } : null;
            };
        };
        /**
         * @description
         * Validator that requires the control have a non-empty value.
         *
         * @usageNotes
         *
         * ### Validate that the field is non-empty
         *
         * ```typescript
         * const control = new FormControl('', Validators.required);
         *
         * console.log(control.errors); // {required: true}
         * ```
         *
         * @returns An error map with the `required` property
         * if the validation check fails, otherwise `null`.
         *
         * @see `updateValueAndValidity()`
         *
         */
        Validators.required = function (control) {
            return isEmptyInputValue(control.value) ? { 'required': true } : null;
        };
        /**
         * @description
         * Validator that requires the control's value be true. This validator is commonly
         * used for required checkboxes.
         *
         * @usageNotes
         *
         * ### Validate that the field value is true
         *
         * ```typescript
         * const control = new FormControl('', Validators.requiredTrue);
         *
         * console.log(control.errors); // {required: true}
         * ```
         *
         * @returns An error map that contains the `required` property
         * set to `true` if the validation check fails, otherwise `null`.
         *
         * @see `updateValueAndValidity()`
         *
         */
        Validators.requiredTrue = function (control) {
            return control.value === true ? null : { 'required': true };
        };
        /**
         * @description
         * Validator that requires the control's value pass an email validation test.
         *
         * Tests the value using a [regular
         * expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
         * pattern suitable for common usecases. The pattern is based on the definition of a valid email
         * address in the [WHATWG HTML
         * specification](https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address) with
         * some enhancements to incorporate more RFC rules (such as rules related to domain names and the
         * lengths of different parts of the address).
         *
         * The differences from the WHATWG version include:
         * - Disallow `local-part` (the part before the `@` symbol) to begin or end with a period (`.`).
         * - Disallow `local-part` to be longer than 64 characters.
         * - Disallow the whole address to be longer than 254 characters.
         *
         * If this pattern does not satisfy your business needs, you can use `Validators.pattern()` to
         * validate the value against a different pattern.
         *
         * @usageNotes
         *
         * ### Validate that the field matches a valid email pattern
         *
         * ```typescript
         * const control = new FormControl('bad@', Validators.email);
         *
         * console.log(control.errors); // {email: true}
         * ```
         *
         * @returns An error map with the `email` property
         * if the validation check fails, otherwise `null`.
         *
         * @see `updateValueAndValidity()`
         *
         */
        Validators.email = function (control) {
            if (isEmptyInputValue(control.value)) {
                return null; // don't validate empty values to allow optional controls
            }
            return EMAIL_REGEXP.test(control.value) ? null : { 'email': true };
        };
        /**
         * @description
         * Validator that requires the length of the control's value to be greater than or equal
         * to the provided minimum length. This validator is also provided by default if you use the
         * the HTML5 `minlength` attribute. Note that the `minLength` validator is intended to be used
         * only for types that have a numeric `length` property, such as strings or arrays. The
         * `minLength` validator logic is also not invoked for values when their `length` property is 0
         * (for example in case of an empty string or an empty array), to support optional controls. You
         * can use the standard `required` validator if empty values should not be considered valid.
         *
         * @usageNotes
         *
         * ### Validate that the field has a minimum of 3 characters
         *
         * ```typescript
         * const control = new FormControl('ng', Validators.minLength(3));
         *
         * console.log(control.errors); // {minlength: {requiredLength: 3, actualLength: 2}}
         * ```
         *
         * ```html
         * <input minlength="5">
         * ```
         *
         * @returns A validator function that returns an error map with the
         * `minlength` property if the validation check fails, otherwise `null`.
         *
         * @see `updateValueAndValidity()`
         *
         */
        Validators.minLength = function (minLength) {
            return function (control) {
                if (isEmptyInputValue(control.value) || !hasValidLength(control.value)) {
                    // don't validate empty values to allow optional controls
                    // don't validate values without `length` property
                    return null;
                }
                return control.value.length < minLength ?
                    { 'minlength': { 'requiredLength': minLength, 'actualLength': control.value.length } } :
                    null;
            };
        };
        /**
         * @description
         * Validator that requires the length of the control's value to be less than or equal
         * to the provided maximum length. This validator is also provided by default if you use the
         * the HTML5 `maxlength` attribute. Note that the `maxLength` validator is intended to be used
         * only for types that have a numeric `length` property, such as strings or arrays.
         *
         * @usageNotes
         *
         * ### Validate that the field has maximum of 5 characters
         *
         * ```typescript
         * const control = new FormControl('Angular', Validators.maxLength(5));
         *
         * console.log(control.errors); // {maxlength: {requiredLength: 5, actualLength: 7}}
         * ```
         *
         * ```html
         * <input maxlength="5">
         * ```
         *
         * @returns A validator function that returns an error map with the
         * `maxlength` property if the validation check fails, otherwise `null`.
         *
         * @see `updateValueAndValidity()`
         *
         */
        Validators.maxLength = function (maxLength) {
            return function (control) {
                return hasValidLength(control.value) && control.value.length > maxLength ?
                    { 'maxlength': { 'requiredLength': maxLength, 'actualLength': control.value.length } } :
                    null;
            };
        };
        /**
         * @description
         * Validator that requires the control's value to match a regex pattern. This validator is also
         * provided by default if you use the HTML5 `pattern` attribute.
         *
         * @usageNotes
         *
         * ### Validate that the field only contains letters or spaces
         *
         * ```typescript
         * const control = new FormControl('1', Validators.pattern('[a-zA-Z ]*'));
         *
         * console.log(control.errors); // {pattern: {requiredPattern: '^[a-zA-Z ]*$', actualValue: '1'}}
         * ```
         *
         * ```html
         * <input pattern="[a-zA-Z ]*">
         * ```
         *
         * ### Pattern matching with the global or sticky flag
         *
         * `RegExp` objects created with the `g` or `y` flags that are passed into `Validators.pattern`
         * can produce different results on the same input when validations are run consecutively. This is
         * due to how the behavior of `RegExp.prototype.test` is
         * specified in [ECMA-262](https://tc39.es/ecma262/#sec-regexpbuiltinexec)
         * (`RegExp` preserves the index of the last match when the global or sticky flag is used).
         * Due to this behavior, it is recommended that when using
         * `Validators.pattern` you **do not** pass in a `RegExp` object with either the global or sticky
         * flag enabled.
         *
         * ```typescript
         * // Not recommended (since the `g` flag is used)
         * const controlOne = new FormControl('1', Validators.pattern(/foo/g));
         *
         * // Good
         * const controlTwo = new FormControl('1', Validators.pattern(/foo/));
         * ```
         *
         * @param pattern A regular expression to be used as is to test the values, or a string.
         * If a string is passed, the `^` character is prepended and the `$` character is
         * appended to the provided string (if not already present), and the resulting regular
         * expression is used to test the values.
         *
         * @returns A validator function that returns an error map with the
         * `pattern` property if the validation check fails, otherwise `null`.
         *
         * @see `updateValueAndValidity()`
         *
         */
        Validators.pattern = function (pattern) {
            if (!pattern)
                return Validators.nullValidator;
            var regex;
            var regexStr;
            if (typeof pattern === 'string') {
                regexStr = '';
                if (pattern.charAt(0) !== '^')
                    regexStr += '^';
                regexStr += pattern;
                if (pattern.charAt(pattern.length - 1) !== '$')
                    regexStr += '$';
                regex = new RegExp(regexStr);
            }
            else {
                regexStr = pattern.toString();
                regex = pattern;
            }
            return function (control) {
                if (isEmptyInputValue(control.value)) {
                    return null; // don't validate empty values to allow optional controls
                }
                var value = control.value;
                return regex.test(value) ? null :
                    { 'pattern': { 'requiredPattern': regexStr, 'actualValue': value } };
            };
        };
        /**
         * @description
         * Validator that performs no operation.
         *
         * @see `updateValueAndValidity()`
         *
         */
        Validators.nullValidator = function (control) {
            return null;
        };
        Validators.compose = function (validators) {
            if (!validators)
                return null;
            var presentValidators = validators.filter(isPresent);
            if (presentValidators.length == 0)
                return null;
            return function (control) {
                return mergeErrors(executeValidators(control, presentValidators));
            };
        };
        /**
         * @description
         * Compose multiple async validators into a single function that returns the union
         * of the individual error objects for the provided control.
         *
         * @returns A validator function that returns an error map with the
         * merged error objects of the async validators if the validation check fails, otherwise `null`.
         *
         * @see `updateValueAndValidity()`
         *
         */
        Validators.composeAsync = function (validators) {
            if (!validators)
                return null;
            var presentValidators = validators.filter(isPresent);
            if (presentValidators.length == 0)
                return null;
            return function (control) {
                var observables = executeValidators(control, presentValidators).map(toObservable);
                return forkJoin(observables).pipe(map(mergeErrors));
            };
        };
        return Validators;
    }());
    function isPresent(o) {
        return o != null;
    }
    function toObservable(r) {
        var obs = i0["ɵisPromise"](r) ? from(r) : r;
        if (!(i0["ɵisObservable"](obs)) && (typeof ngDevMode === 'undefined' || ngDevMode)) {
            throw new Error("Expected validator to return Promise or Observable.");
        }
        return obs;
    }
    function mergeErrors(arrayOfErrors) {
        var res = {};
        // Not using Array.reduce here due to a Chrome 80 bug
        // https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
        arrayOfErrors.forEach(function (errors) {
            res = errors != null ? Object.assign(Object.assign({}, res), errors) : res;
        });
        return Object.keys(res).length === 0 ? null : res;
    }
    function executeValidators(control, validators) {
        return validators.map(function (validator) { return validator(control); });
    }
    function isValidatorFn(validator) {
        return !validator.validate;
    }
    /**
     * Given the list of validators that may contain both functions as well as classes, return the list
     * of validator functions (convert validator classes into validator functions). This is needed to
     * have consistent structure in validators list before composing them.
     *
     * @param validators The set of validators that may contain validators both in plain function form
     *     as well as represented as a validator class.
     */
    function normalizeValidators(validators) {
        return validators.map(function (validator) {
            return isValidatorFn(validator) ?
                validator :
                (function (c) { return validator.validate(c); });
        });
    }
    /**
     * Merges synchronous validators into a single validator function (combined using
     * `Validators.compose`).
     */
    function composeValidators(validators) {
        return validators != null ? Validators.compose(normalizeValidators(validators)) :
            null;
    }
    /**
     * Merges asynchronous validators into a single validator function (combined using
     * `Validators.composeAsync`).
     */
    function composeAsyncValidators(validators) {
        return validators != null ?
            Validators.composeAsync(normalizeValidators(validators)) :
            null;
    }
    /**
     * Merges raw control validators with a given directive validator and returns the combined list of
     * validators as an array.
     */
    function mergeValidators(controlValidators, dirValidator) {
        if (controlValidators === null)
            return [dirValidator];
        return Array.isArray(controlValidators) ? tslib_1.__spread(controlValidators, [dirValidator]) :
            [controlValidators, dirValidator];
    }
    /**
     * Retrieves the list of raw synchronous validators attached to a given control.
     */
    function getControlValidators(control) {
        return control._rawValidators;
    }
    /**
     * Retrieves the list of raw asynchronous validators attached to a given control.
     */
    function getControlAsyncValidators(control) {
        return control._rawAsyncValidators;
    }
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * @description
     * Base class for control directives.
     *
     * This class is only used internally in the `ReactiveFormsModule` and the `FormsModule`.
     *
     * @publicApi
     */
    var AbstractControlDirective = /** @class */ (function () {
        function AbstractControlDirective() {
            /**
             * Set of synchronous validators as they were provided while calling `setValidators` function.
             * @internal
             */
            this._rawValidators = [];
            /**
             * Set of asynchronous validators as they were provided while calling `setAsyncValidators`
             * function.
             * @internal
             */
            this._rawAsyncValidators = [];
            /*
             * The set of callbacks to be invoked when directive instance is being destroyed.
             */
            this._onDestroyCallbacks = [];
        }
        Object.defineProperty(AbstractControlDirective.prototype, "value", {
            /**
             * @description
             * Reports the value of the control if it is present, otherwise null.
             */
            get: function () {
                return this.control ? this.control.value : null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AbstractControlDirective.prototype, "valid", {
            /**
             * @description
             * Reports whether the control is valid. A control is considered valid if no
             * validation errors exist with the current value.
             * If the control is not present, null is returned.
             */
            get: function () {
                return this.control ? this.control.valid : null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AbstractControlDirective.prototype, "invalid", {
            /**
             * @description
             * Reports whether the control is invalid, meaning that an error exists in the input value.
             * If the control is not present, null is returned.
             */
            get: function () {
                return this.control ? this.control.invalid : null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AbstractControlDirective.prototype, "pending", {
            /**
             * @description
             * Reports whether a control is pending, meaning that that async validation is occurring and
             * errors are not yet available for the input value. If the control is not present, null is
             * returned.
             */
            get: function () {
                return this.control ? this.control.pending : null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AbstractControlDirective.prototype, "disabled", {
            /**
             * @description
             * Reports whether the control is disabled, meaning that the control is disabled
             * in the UI and is exempt from validation checks and excluded from aggregate
             * values of ancestor controls. If the control is not present, null is returned.
             */
            get: function () {
                return this.control ? this.control.disabled : null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AbstractControlDirective.prototype, "enabled", {
            /**
             * @description
             * Reports whether the control is enabled, meaning that the control is included in ancestor
             * calculations of validity or value. If the control is not present, null is returned.
             */
            get: function () {
                return this.control ? this.control.enabled : null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AbstractControlDirective.prototype, "errors", {
            /**
             * @description
             * Reports the control's validation errors. If the control is not present, null is returned.
             */
            get: function () {
                return this.control ? this.control.errors : null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AbstractControlDirective.prototype, "pristine", {
            /**
             * @description
             * Reports whether the control is pristine, meaning that the user has not yet changed
             * the value in the UI. If the control is not present, null is returned.
             */
            get: function () {
                return this.control ? this.control.pristine : null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AbstractControlDirective.prototype, "dirty", {
            /**
             * @description
             * Reports whether the control is dirty, meaning that the user has changed
             * the value in the UI. If the control is not present, null is returned.
             */
            get: function () {
                return this.control ? this.control.dirty : null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AbstractControlDirective.prototype, "touched", {
            /**
             * @description
             * Reports whether the control is touched, meaning that the user has triggered
             * a `blur` event on it. If the control is not present, null is returned.
             */
            get: function () {
                return this.control ? this.control.touched : null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AbstractControlDirective.prototype, "status", {
            /**
             * @description
             * Reports the validation status of the control. Possible values include:
             * 'VALID', 'INVALID', 'DISABLED', and 'PENDING'.
             * If the control is not present, null is returned.
             */
            get: function () {
                return this.control ? this.control.status : null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AbstractControlDirective.prototype, "untouched", {
            /**
             * @description
             * Reports whether the control is untouched, meaning that the user has not yet triggered
             * a `blur` event on it. If the control is not present, null is returned.
             */
            get: function () {
                return this.control ? this.control.untouched : null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AbstractControlDirective.prototype, "statusChanges", {
            /**
             * @description
             * Returns a multicasting observable that emits a validation status whenever it is
             * calculated for the control. If the control is not present, null is returned.
             */
            get: function () {
                return this.control ? this.control.statusChanges : null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AbstractControlDirective.prototype, "valueChanges", {
            /**
             * @description
             * Returns a multicasting observable of value changes for the control that emits every time the
             * value of the control changes in the UI or programmatically.
             * If the control is not present, null is returned.
             */
            get: function () {
                return this.control ? this.control.valueChanges : null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AbstractControlDirective.prototype, "path", {
            /**
             * @description
             * Returns an array that represents the path from the top-level form to this control.
             * Each index is the string name of the control on that level.
             */
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Sets synchronous validators for this directive.
         * @internal
         */
        AbstractControlDirective.prototype._setValidators = function (validators) {
            this._rawValidators = validators || [];
            this._composedValidatorFn = composeValidators(this._rawValidators);
        };
        /**
         * Sets asynchronous validators for this directive.
         * @internal
         */
        AbstractControlDirective.prototype._setAsyncValidators = function (validators) {
            this._rawAsyncValidators = validators || [];
            this._composedAsyncValidatorFn = composeAsyncValidators(this._rawAsyncValidators);
        };
        Object.defineProperty(AbstractControlDirective.prototype, "validator", {
            /**
             * @description
             * Synchronous validator function composed of all the synchronous validators registered with this
             * directive.
             */
            get: function () {
                return this._composedValidatorFn || null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AbstractControlDirective.prototype, "asyncValidator", {
            /**
             * @description
             * Asynchronous validator function composed of all the asynchronous validators registered with
             * this directive.
             */
            get: function () {
                return this._composedAsyncValidatorFn || null;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Internal function to register callbacks that should be invoked
         * when directive instance is being destroyed.
         * @internal
         */
        AbstractControlDirective.prototype._registerOnDestroy = function (fn) {
            this._onDestroyCallbacks.push(fn);
        };
        /**
         * Internal function to invoke all registered "on destroy" callbacks.
         * Note: calling this function also clears the list of callbacks.
         * @internal
         */
        AbstractControlDirective.prototype._invokeOnDestroyCallbacks = function () {
            this._onDestroyCallbacks.forEach(function (fn) { return fn(); });
            this._onDestroyCallbacks = [];
        };
        /**
         * @description
         * Resets the control with the provided value if the control is present.
         */
        AbstractControlDirective.prototype.reset = function (value) {
            if (value === void 0) { value = undefined; }
            if (this.control)
                this.control.reset(value);
        };
        /**
         * @description
         * Reports whether the control with the given path has the error specified.
         *
         * @param errorCode The code of the error to check
         * @param path A list of control names that designates how to move from the current control
         * to the control that should be queried for errors.
         *
         * @usageNotes
         * For example, for the following `FormGroup`:
         *
         * ```
         * form = new FormGroup({
         *   address: new FormGroup({ street: new FormControl() })
         * });
         * ```
         *
         * The path to the 'street' control from the root form would be 'address' -> 'street'.
         *
         * It can be provided to this method in one of two formats:
         *
         * 1. An array of string control names, e.g. `['address', 'street']`
         * 1. A period-delimited list of control names in one string, e.g. `'address.street'`
         *
         * If no path is given, this method checks for the error on the current control.
         *
         * @returns whether the given error is present in the control at the given path.
         *
         * If the control is not present, false is returned.
         */
        AbstractControlDirective.prototype.hasError = function (errorCode, path) {
            return this.control ? this.control.hasError(errorCode, path) : false;
        };
        /**
         * @description
         * Reports error data for the control with the given path.
         *
         * @param errorCode The code of the error to check
         * @param path A list of control names that designates how to move from the current control
         * to the control that should be queried for errors.
         *
         * @usageNotes
         * For example, for the following `FormGroup`:
         *
         * ```
         * form = new FormGroup({
         *   address: new FormGroup({ street: new FormControl() })
         * });
         * ```
         *
         * The path to the 'street' control from the root form would be 'address' -> 'street'.
         *
         * It can be provided to this method in one of two formats:
         *
         * 1. An array of string control names, e.g. `['address', 'street']`
         * 1. A period-delimited list of control names in one string, e.g. `'address.street'`
         *
         * @returns error data for that particular error. If the control or error is not present,
         * null is returned.
         */
        AbstractControlDirective.prototype.getError = function (errorCode, path) {
            return this.control ? this.control.getError(errorCode, path) : null;
        };
        return AbstractControlDirective;
    }());
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * @description
     * A base class for directives that contain multiple registered instances of `NgControl`.
     * Only used by the forms module.
     *
     * @publicApi
     */
    var ControlContainer = /** @class */ (function (_super) {
        tslib_1.__extends(ControlContainer, _super);
        function ControlContainer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(ControlContainer.prototype, "formDirective", {
            /**
             * @description
             * The top-level form directive for the control.
             */
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ControlContainer.prototype, "path", {
            /**
             * @description
             * The path to this group.
             */
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        return ControlContainer;
    }(AbstractControlDirective));
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * @description
     * A base class that all `FormControl`-based directives extend. It binds a `FormControl`
     * object to a DOM element.
     *
     * @publicApi
     */
    var NgControl = /** @class */ (function (_super) {
        tslib_1.__extends(NgControl, _super);
        function NgControl() {
            var _this = _super.apply(this, tslib_1.__spread(arguments)) || this;
            /**
             * @description
             * The parent form for the control.
             *
             * @internal
             */
            _this._parent = null;
            /**
             * @description
             * The name for the control
             */
            _this.name = null;
            /**
             * @description
             * The value accessor for the control
             */
            _this.valueAccessor = null;
            return _this;
        }
        return NgControl;
    }(AbstractControlDirective));
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var AbstractControlStatus = /** @class */ (function () {
        function AbstractControlStatus(cd) {
            this._cd = cd;
        }
        Object.defineProperty(AbstractControlStatus.prototype, "ngClassUntouched", {
            get: function () {
                var _a, _b, _c;
                return (_c = (_b = (_a = this._cd) === null || _a === void 0 ? void 0 : _a.control) === null || _b === void 0 ? void 0 : _b.untouched) !== null && _c !== void 0 ? _c : false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AbstractControlStatus.prototype, "ngClassTouched", {
            get: function () {
                var _a, _b, _c;
                return (_c = (_b = (_a = this._cd) === null || _a === void 0 ? void 0 : _a.control) === null || _b === void 0 ? void 0 : _b.touched) !== null && _c !== void 0 ? _c : false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AbstractControlStatus.prototype, "ngClassPristine", {
            get: function () {
                var _a, _b, _c;
                return (_c = (_b = (_a = this._cd) === null || _a === void 0 ? void 0 : _a.control) === null || _b === void 0 ? void 0 : _b.pristine) !== null && _c !== void 0 ? _c : false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AbstractControlStatus.prototype, "ngClassDirty", {
            get: function () {
                var _a, _b, _c;
                return (_c = (_b = (_a = this._cd) === null || _a === void 0 ? void 0 : _a.control) === null || _b === void 0 ? void 0 : _b.dirty) !== null && _c !== void 0 ? _c : false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AbstractControlStatus.prototype, "ngClassValid", {
            get: function () {
                var _a, _b, _c;
                return (_c = (_b = (_a = this._cd) === null || _a === void 0 ? void 0 : _a.control) === null || _b === void 0 ? void 0 : _b.valid) !== null && _c !== void 0 ? _c : false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AbstractControlStatus.prototype, "ngClassInvalid", {
            get: function () {
                var _a, _b, _c;
                return (_c = (_b = (_a = this._cd) === null || _a === void 0 ? void 0 : _a.control) === null || _b === void 0 ? void 0 : _b.invalid) !== null && _c !== void 0 ? _c : false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AbstractControlStatus.prototype, "ngClassPending", {
            get: function () {
                var _a, _b, _c;
                return (_c = (_b = (_a = this._cd) === null || _a === void 0 ? void 0 : _a.control) === null || _b === void 0 ? void 0 : _b.pending) !== null && _c !== void 0 ? _c : false;
            },
            enumerable: false,
            configurable: true
        });
        return AbstractControlStatus;
    }());
    var ngControlStatusHost = {
        '[class.ng-untouched]': 'ngClassUntouched',
        '[class.ng-touched]': 'ngClassTouched',
        '[class.ng-pristine]': 'ngClassPristine',
        '[class.ng-dirty]': 'ngClassDirty',
        '[class.ng-valid]': 'ngClassValid',
        '[class.ng-invalid]': 'ngClassInvalid',
        '[class.ng-pending]': 'ngClassPending',
    };
    /**
     * @description
     * Directive automatically applied to Angular form controls that sets CSS classes
     * based on control status.
     *
     * @usageNotes
     *
     * ### CSS classes applied
     *
     * The following classes are applied as the properties become true:
     *
     * * ng-valid
     * * ng-invalid
     * * ng-pending
     * * ng-pristine
     * * ng-dirty
     * * ng-untouched
     * * ng-touched
     *
     * @ngModule ReactiveFormsModule
     * @ngModule FormsModule
     * @publicApi
     */
    var NgControlStatus = /** @class */ (function (_super) {
        tslib_1.__extends(NgControlStatus, _super);
        function NgControlStatus(cd) {
            return _super.call(this, cd) || this;
        }
        return NgControlStatus;
    }(AbstractControlStatus));
    NgControlStatus.decorators = [
        { type: i0.Directive, args: [{ selector: '[formControlName],[ngModel],[formControl]', host: ngControlStatusHost },] }
    ];
    NgControlStatus.ctorParameters = function () { return [
        { type: NgControl, decorators: [{ type: i0.Self }] }
    ]; };
    /**
     * @description
     * Directive automatically applied to Angular form groups that sets CSS classes
     * based on control status (valid/invalid/dirty/etc).
     *
     * @see `NgControlStatus`
     *
     * @ngModule ReactiveFormsModule
     * @ngModule FormsModule
     * @publicApi
     */
    var NgControlStatusGroup = /** @class */ (function (_super) {
        tslib_1.__extends(NgControlStatusGroup, _super);
        function NgControlStatusGroup(cd) {
            return _super.call(this, cd) || this;
        }
        return NgControlStatusGroup;
    }(AbstractControlStatus));
    NgControlStatusGroup.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]',
                    host: ngControlStatusHost
                },] }
    ];
    NgControlStatusGroup.ctorParameters = function () { return [
        { type: ControlContainer, decorators: [{ type: i0.Optional }, { type: i0.Self }] }
    ]; };
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var NUMBER_VALUE_ACCESSOR = {
        provide: NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return NumberValueAccessor; }),
        multi: true
    };
    /**
     * @description
     * The `ControlValueAccessor` for writing a number value and listening to number input changes.
     * The value accessor is used by the `FormControlDirective`, `FormControlName`, and `NgModel`
     * directives.
     *
     * @usageNotes
     *
     * ### Using a number input with a reactive form.
     *
     * The following example shows how to use a number input with a reactive form.
     *
     * ```ts
     * const totalCountControl = new FormControl();
     * ```
     *
     * ```
     * <input type="number" [formControl]="totalCountControl">
     * ```
     *
     * @ngModule ReactiveFormsModule
     * @ngModule FormsModule
     * @publicApi
     */
    var NumberValueAccessor = /** @class */ (function () {
        function NumberValueAccessor(_renderer, _elementRef) {
            this._renderer = _renderer;
            this._elementRef = _elementRef;
            /**
             * The registered callback function called when a change or input event occurs on the input
             * element.
             * @nodoc
             */
            this.onChange = function (_) { };
            /**
             * The registered callback function called when a blur event occurs on the input element.
             * @nodoc
             */
            this.onTouched = function () { };
        }
        /**
         * Sets the "value" property on the input element.
         * @nodoc
         */
        NumberValueAccessor.prototype.writeValue = function (value) {
            // The value needs to be normalized for IE9, otherwise it is set to 'null' when null
            var normalizedValue = value == null ? '' : value;
            this._renderer.setProperty(this._elementRef.nativeElement, 'value', normalizedValue);
        };
        /**
         * Registers a function called when the control value changes.
         * @nodoc
         */
        NumberValueAccessor.prototype.registerOnChange = function (fn) {
            this.onChange = function (value) {
                fn(value == '' ? null : parseFloat(value));
            };
        };
        /**
         * Registers a function called when the control is touched.
         * @nodoc
         */
        NumberValueAccessor.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        /**
         * Sets the "disabled" property on the input element.
         * @nodoc
         */
        NumberValueAccessor.prototype.setDisabledState = function (isDisabled) {
            this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
        };
        return NumberValueAccessor;
    }());
    NumberValueAccessor.decorators = [
        { type: i0.Directive, args: [{
                    selector: 'input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]',
                    host: { '(input)': 'onChange($event.target.value)', '(blur)': 'onTouched()' },
                    providers: [NUMBER_VALUE_ACCESSOR]
                },] }
    ];
    NumberValueAccessor.ctorParameters = function () { return [
        { type: i0.Renderer2 },
        { type: i0.ElementRef }
    ]; };
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var RADIO_VALUE_ACCESSOR = {
        provide: NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return RadioControlValueAccessor; }),
        multi: true
    };
    function throwNameError() {
        throw new Error("\n      If you define both a name and a formControlName attribute on your radio button, their values\n      must match. Ex: <input type=\"radio\" formControlName=\"food\" name=\"food\">\n    ");
    }
    /**
     * @description
     * Class used by Angular to track radio buttons. For internal use only.
     */
    var RadioControlRegistry = /** @class */ (function () {
        function RadioControlRegistry() {
            this._accessors = [];
        }
        /**
         * @description
         * Adds a control to the internal registry. For internal use only.
         */
        RadioControlRegistry.prototype.add = function (control, accessor) {
            this._accessors.push([control, accessor]);
        };
        /**
         * @description
         * Removes a control from the internal registry. For internal use only.
         */
        RadioControlRegistry.prototype.remove = function (accessor) {
            for (var i = this._accessors.length - 1; i >= 0; --i) {
                if (this._accessors[i][1] === accessor) {
                    this._accessors.splice(i, 1);
                    return;
                }
            }
        };
        /**
         * @description
         * Selects a radio button. For internal use only.
         */
        RadioControlRegistry.prototype.select = function (accessor) {
            var _this = this;
            this._accessors.forEach(function (c) {
                if (_this._isSameGroup(c, accessor) && c[1] !== accessor) {
                    c[1].fireUncheck(accessor.value);
                }
            });
        };
        RadioControlRegistry.prototype._isSameGroup = function (controlPair, accessor) {
            if (!controlPair[0].control)
                return false;
            return controlPair[0]._parent === accessor._control._parent &&
                controlPair[1].name === accessor.name;
        };
        return RadioControlRegistry;
    }());
    RadioControlRegistry.decorators = [
        { type: i0.Injectable }
    ];
    /**
     * @description
     * The `ControlValueAccessor` for writing radio control values and listening to radio control
     * changes. The value accessor is used by the `FormControlDirective`, `FormControlName`, and
     * `NgModel` directives.
     *
     * @usageNotes
     *
     * ### Using radio buttons with reactive form directives
     *
     * The follow example shows how to use radio buttons in a reactive form. When using radio buttons in
     * a reactive form, radio buttons in the same group should have the same `formControlName`.
     * Providing a `name` attribute is optional.
     *
     * {@example forms/ts/reactiveRadioButtons/reactive_radio_button_example.ts region='Reactive'}
     *
     * @ngModule ReactiveFormsModule
     * @ngModule FormsModule
     * @publicApi
     */
    var RadioControlValueAccessor = /** @class */ (function () {
        function RadioControlValueAccessor(_renderer, _elementRef, _registry, _injector) {
            this._renderer = _renderer;
            this._elementRef = _elementRef;
            this._registry = _registry;
            this._injector = _injector;
            /**
             * The registered callback function called when a change event occurs on the input element.
             * @nodoc
             */
            this.onChange = function () { };
            /**
             * The registered callback function called when a blur event occurs on the input element.
             * @nodoc
             */
            this.onTouched = function () { };
        }
        /** @nodoc */
        RadioControlValueAccessor.prototype.ngOnInit = function () {
            this._control = this._injector.get(NgControl);
            this._checkName();
            this._registry.add(this._control, this);
        };
        /** @nodoc */
        RadioControlValueAccessor.prototype.ngOnDestroy = function () {
            this._registry.remove(this);
        };
        /**
         * Sets the "checked" property value on the radio input element.
         * @nodoc
         */
        RadioControlValueAccessor.prototype.writeValue = function (value) {
            this._state = value === this.value;
            this._renderer.setProperty(this._elementRef.nativeElement, 'checked', this._state);
        };
        /**
         * Registers a function called when the control value changes.
         * @nodoc
         */
        RadioControlValueAccessor.prototype.registerOnChange = function (fn) {
            var _this = this;
            this._fn = fn;
            this.onChange = function () {
                fn(_this.value);
                _this._registry.select(_this);
            };
        };
        /**
         * Sets the "value" on the radio input element and unchecks it.
         *
         * @param value
         */
        RadioControlValueAccessor.prototype.fireUncheck = function (value) {
            this.writeValue(value);
        };
        /**
         * Registers a function called when the control is touched.
         * @nodoc
         */
        RadioControlValueAccessor.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        /**
         * Sets the "disabled" property on the input element.
         * @nodoc
         */
        RadioControlValueAccessor.prototype.setDisabledState = function (isDisabled) {
            this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
        };
        RadioControlValueAccessor.prototype._checkName = function () {
            if (this.name && this.formControlName && this.name !== this.formControlName &&
                (typeof ngDevMode === 'undefined' || ngDevMode)) {
                throwNameError();
            }
            if (!this.name && this.formControlName)
                this.name = this.formControlName;
        };
        return RadioControlValueAccessor;
    }());
    RadioControlValueAccessor.decorators = [
        { type: i0.Directive, args: [{
                    selector: 'input[type=radio][formControlName],input[type=radio][formControl],input[type=radio][ngModel]',
                    host: { '(change)': 'onChange()', '(blur)': 'onTouched()' },
                    providers: [RADIO_VALUE_ACCESSOR]
                },] }
    ];
    RadioControlValueAccessor.ctorParameters = function () { return [
        { type: i0.Renderer2 },
        { type: i0.ElementRef },
        { type: RadioControlRegistry },
        { type: i0.Injector }
    ]; };
    RadioControlValueAccessor.propDecorators = {
        name: [{ type: i0.Input }],
        formControlName: [{ type: i0.Input }],
        value: [{ type: i0.Input }]
    };
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var RANGE_VALUE_ACCESSOR = {
        provide: NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return RangeValueAccessor; }),
        multi: true
    };
    /**
     * @description
     * The `ControlValueAccessor` for writing a range value and listening to range input changes.
     * The value accessor is used by the `FormControlDirective`, `FormControlName`, and  `NgModel`
     * directives.
     *
     * @usageNotes
     *
     * ### Using a range input with a reactive form
     *
     * The following example shows how to use a range input with a reactive form.
     *
     * ```ts
     * const ageControl = new FormControl();
     * ```
     *
     * ```
     * <input type="range" [formControl]="ageControl">
     * ```
     *
     * @ngModule ReactiveFormsModule
     * @ngModule FormsModule
     * @publicApi
     */
    var RangeValueAccessor = /** @class */ (function () {
        function RangeValueAccessor(_renderer, _elementRef) {
            this._renderer = _renderer;
            this._elementRef = _elementRef;
            /**
             * The registered callback function called when a change or input event occurs on the input
             * element.
             * @nodoc
             */
            this.onChange = function (_) { };
            /**
             * The registered callback function called when a blur event occurs on the input element.
             * @nodoc
             */
            this.onTouched = function () { };
        }
        /**
         * Sets the "value" property on the input element.
         * @nodoc
         */
        RangeValueAccessor.prototype.writeValue = function (value) {
            this._renderer.setProperty(this._elementRef.nativeElement, 'value', parseFloat(value));
        };
        /**
         * Registers a function called when the control value changes.
         * @nodoc
         */
        RangeValueAccessor.prototype.registerOnChange = function (fn) {
            this.onChange = function (value) {
                fn(value == '' ? null : parseFloat(value));
            };
        };
        /**
         * Registers a function called when the control is touched.
         * @nodoc
         */
        RangeValueAccessor.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        /**
         * Sets the "disabled" property on the range input element.
         * @nodoc
         */
        RangeValueAccessor.prototype.setDisabledState = function (isDisabled) {
            this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
        };
        return RangeValueAccessor;
    }());
    RangeValueAccessor.decorators = [
        { type: i0.Directive, args: [{
                    selector: 'input[type=range][formControlName],input[type=range][formControl],input[type=range][ngModel]',
                    host: {
                        '(change)': 'onChange($event.target.value)',
                        '(input)': 'onChange($event.target.value)',
                        '(blur)': 'onTouched()'
                    },
                    providers: [RANGE_VALUE_ACCESSOR]
                },] }
    ];
    RangeValueAccessor.ctorParameters = function () { return [
        { type: i0.Renderer2 },
        { type: i0.ElementRef }
    ]; };
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var FormErrorExamples = {
        formControlName: "\n    <div [formGroup]=\"myGroup\">\n      <input formControlName=\"firstName\">\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       firstName: new FormControl()\n    });",
        formGroupName: "\n    <div [formGroup]=\"myGroup\">\n       <div formGroupName=\"person\">\n          <input formControlName=\"firstName\">\n       </div>\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       person: new FormGroup({ firstName: new FormControl() })\n    });",
        formArrayName: "\n    <div [formGroup]=\"myGroup\">\n      <div formArrayName=\"cities\">\n        <div *ngFor=\"let city of cityArray.controls; index as i\">\n          <input [formControlName]=\"i\">\n        </div>\n      </div>\n    </div>\n\n    In your class:\n\n    this.cityArray = new FormArray([new FormControl('SF')]);\n    this.myGroup = new FormGroup({\n      cities: this.cityArray\n    });",
        ngModelGroup: "\n    <form>\n       <div ngModelGroup=\"person\">\n          <input [(ngModel)]=\"person.name\" name=\"firstName\">\n       </div>\n    </form>",
        ngModelWithFormGroup: "\n    <div [formGroup]=\"myGroup\">\n       <input formControlName=\"firstName\">\n       <input [(ngModel)]=\"showMoreControls\" [ngModelOptions]=\"{standalone: true}\">\n    </div>\n  "
    };
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var ReactiveErrors = /** @class */ (function () {
        function ReactiveErrors() {
        }
        ReactiveErrors.controlParentException = function () {
            throw new Error("formControlName must be used with a parent formGroup directive.  You'll want to add a formGroup\n       directive and pass it an existing FormGroup instance (you can create one in your class).\n\n      Example:\n\n      " + FormErrorExamples.formControlName);
        };
        ReactiveErrors.ngModelGroupException = function () {
            throw new Error("formControlName cannot be used with an ngModelGroup parent. It is only compatible with parents\n       that also have a \"form\" prefix: formGroupName, formArrayName, or formGroup.\n\n       Option 1:  Update the parent to be formGroupName (reactive form strategy)\n\n        " + FormErrorExamples.formGroupName + "\n\n        Option 2: Use ngModel instead of formControlName (template-driven strategy)\n\n        " + FormErrorExamples.ngModelGroup);
        };
        ReactiveErrors.missingFormException = function () {
            throw new Error("formGroup expects a FormGroup instance. Please pass one in.\n\n       Example:\n\n       " + FormErrorExamples.formControlName);
        };
        ReactiveErrors.groupParentException = function () {
            throw new Error("formGroupName must be used with a parent formGroup directive.  You'll want to add a formGroup\n      directive and pass it an existing FormGroup instance (you can create one in your class).\n\n      Example:\n\n      " + FormErrorExamples.formGroupName);
        };
        ReactiveErrors.arrayParentException = function () {
            throw new Error("formArrayName must be used with a parent formGroup directive.  You'll want to add a formGroup\n       directive and pass it an existing FormGroup instance (you can create one in your class).\n\n        Example:\n\n        " + FormErrorExamples.formArrayName);
        };
        ReactiveErrors.disabledAttrWarning = function () {
            console.warn("\n      It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true\n      when you set up this control in your component class, the disabled attribute will actually be set in the DOM for\n      you. We recommend using this approach to avoid 'changed after checked' errors.\n\n      Example:\n      form = new FormGroup({\n        first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),\n        last: new FormControl('Drew', Validators.required)\n      });\n    ");
        };
        ReactiveErrors.ngModelWarning = function (directiveName) {
            console.warn("\n    It looks like you're using ngModel on the same form field as " + directiveName + ".\n    Support for using the ngModel input property and ngModelChange event with\n    reactive form directives has been deprecated in Angular v6 and will be removed\n    in a future version of Angular.\n\n    For more information on this, see our API docs here:\n    https://angular.io/api/forms/" + (directiveName === 'formControl' ? 'FormControlDirective' :
                'FormControlName') + "#use-with-ngmodel\n    ");
        };
        return ReactiveErrors;
    }());
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var SELECT_VALUE_ACCESSOR = {
        provide: NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return SelectControlValueAccessor; }),
        multi: true
    };
    function _buildValueString(id, value) {
        if (id == null)
            return "" + value;
        if (value && typeof value === 'object')
            value = 'Object';
        return (id + ": " + value).slice(0, 50);
    }
    function _extractId(valueString) {
        return valueString.split(':')[0];
    }
    /**
     * @description
     * The `ControlValueAccessor` for writing select control values and listening to select control
     * changes. The value accessor is used by the `FormControlDirective`, `FormControlName`, and
     * `NgModel` directives.
     *
     * @usageNotes
     *
     * ### Using select controls in a reactive form
     *
     * The following examples show how to use a select control in a reactive form.
     *
     * {@example forms/ts/reactiveSelectControl/reactive_select_control_example.ts region='Component'}
     *
     * ### Using select controls in a template-driven form
     *
     * To use a select in a template-driven form, simply add an `ngModel` and a `name`
     * attribute to the main `<select>` tag.
     *
     * {@example forms/ts/selectControl/select_control_example.ts region='Component'}
     *
     * ### Customizing option selection
     *
     * Angular uses object identity to select option. It's possible for the identities of items
     * to change while the data does not. This can happen, for example, if the items are produced
     * from an RPC to the server, and that RPC is re-run. Even if the data hasn't changed, the
     * second response will produce objects with different identities.
     *
     * To customize the default option comparison algorithm, `<select>` supports `compareWith` input.
     * `compareWith` takes a **function** which has two arguments: `option1` and `option2`.
     * If `compareWith` is given, Angular selects option by the return value of the function.
     *
     * ```ts
     * const selectedCountriesControl = new FormControl();
     * ```
     *
     * ```
     * <select [compareWith]="compareFn"  [formControl]="selectedCountriesControl">
     *     <option *ngFor="let country of countries" [ngValue]="country">
     *         {{country.name}}
     *     </option>
     * </select>
     *
     * compareFn(c1: Country, c2: Country): boolean {
     *     return c1 && c2 ? c1.id === c2.id : c1 === c2;
     * }
     * ```
     *
     * **Note:** We listen to the 'change' event because 'input' events aren't fired
     * for selects in Firefox and IE:
     * https://bugzilla.mozilla.org/show_bug.cgi?id=1024350
     * https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/4660045/
     *
     * @ngModule ReactiveFormsModule
     * @ngModule FormsModule
     * @publicApi
     */
    var SelectControlValueAccessor = /** @class */ (function () {
        function SelectControlValueAccessor(_renderer, _elementRef) {
            this._renderer = _renderer;
            this._elementRef = _elementRef;
            /** @internal */
            this._optionMap = new Map();
            /** @internal */
            this._idCounter = 0;
            /**
             * The registered callback function called when a change event occurs on the input element.
             * @nodoc
             */
            this.onChange = function (_) { };
            /**
             * The registered callback function called when a blur event occurs on the input element.
             * @nodoc
             */
            this.onTouched = function () { };
            this._compareWith = Object.is;
        }
        Object.defineProperty(SelectControlValueAccessor.prototype, "compareWith", {
            /**
             * @description
             * Tracks the option comparison algorithm for tracking identities when
             * checking for changes.
             */
            set: function (fn) {
                if (typeof fn !== 'function' && (typeof ngDevMode === 'undefined' || ngDevMode)) {
                    throw new Error("compareWith must be a function, but received " + JSON.stringify(fn));
                }
                this._compareWith = fn;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Sets the "value" property on the input element. The "selectedIndex"
         * property is also set if an ID is provided on the option element.
         * @nodoc
         */
        SelectControlValueAccessor.prototype.writeValue = function (value) {
            this.value = value;
            var id = this._getOptionId(value);
            if (id == null) {
                this._renderer.setProperty(this._elementRef.nativeElement, 'selectedIndex', -1);
            }
            var valueString = _buildValueString(id, value);
            this._renderer.setProperty(this._elementRef.nativeElement, 'value', valueString);
        };
        /**
         * Registers a function called when the control value changes.
         * @nodoc
         */
        SelectControlValueAccessor.prototype.registerOnChange = function (fn) {
            var _this = this;
            this.onChange = function (valueString) {
                _this.value = _this._getOptionValue(valueString);
                fn(_this.value);
            };
        };
        /**
         * Registers a function called when the control is touched.
         * @nodoc
         */
        SelectControlValueAccessor.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        /**
         * Sets the "disabled" property on the select input element.
         * @nodoc
         */
        SelectControlValueAccessor.prototype.setDisabledState = function (isDisabled) {
            this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
        };
        /** @internal */
        SelectControlValueAccessor.prototype._registerOption = function () {
            return (this._idCounter++).toString();
        };
        /** @internal */
        SelectControlValueAccessor.prototype._getOptionId = function (value) {
            var e_1, _d;
            try {
                for (var _e = tslib_1.__values(Array.from(this._optionMap.keys())), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var id = _f.value;
                    if (this._compareWith(this._optionMap.get(id), value))
                        return id;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_d = _e.return)) _d.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return null;
        };
        /** @internal */
        SelectControlValueAccessor.prototype._getOptionValue = function (valueString) {
            var id = _extractId(valueString);
            return this._optionMap.has(id) ? this._optionMap.get(id) : valueString;
        };
        return SelectControlValueAccessor;
    }());
    SelectControlValueAccessor.decorators = [
        { type: i0.Directive, args: [{
                    selector: 'select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]',
                    host: { '(change)': 'onChange($event.target.value)', '(blur)': 'onTouched()' },
                    providers: [SELECT_VALUE_ACCESSOR]
                },] }
    ];
    SelectControlValueAccessor.ctorParameters = function () { return [
        { type: i0.Renderer2 },
        { type: i0.ElementRef }
    ]; };
    SelectControlValueAccessor.propDecorators = {
        compareWith: [{ type: i0.Input }]
    };
    /**
     * @description
     * Marks `<option>` as dynamic, so Angular can be notified when options change.
     *
     * @see `SelectControlValueAccessor`
     *
     * @ngModule ReactiveFormsModule
     * @ngModule FormsModule
     * @publicApi
     */
    var NgSelectOption = /** @class */ (function () {
        function NgSelectOption(_element, _renderer, _select) {
            this._element = _element;
            this._renderer = _renderer;
            this._select = _select;
            if (this._select)
                this.id = this._select._registerOption();
        }
        Object.defineProperty(NgSelectOption.prototype, "ngValue", {
            /**
             * @description
             * Tracks the value bound to the option element. Unlike the value binding,
             * ngValue supports binding to objects.
             */
            set: function (value) {
                if (this._select == null)
                    return;
                this._select._optionMap.set(this.id, value);
                this._setElementValue(_buildValueString(this.id, value));
                this._select.writeValue(this._select.value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgSelectOption.prototype, "value", {
            /**
             * @description
             * Tracks simple string values bound to the option element.
             * For objects, use the `ngValue` input binding.
             */
            set: function (value) {
                this._setElementValue(value);
                if (this._select)
                    this._select.writeValue(this._select.value);
            },
            enumerable: false,
            configurable: true
        });
        /** @internal */
        NgSelectOption.prototype._setElementValue = function (value) {
            this._renderer.setProperty(this._element.nativeElement, 'value', value);
        };
        /** @nodoc */
        NgSelectOption.prototype.ngOnDestroy = function () {
            if (this._select) {
                this._select._optionMap.delete(this.id);
                this._select.writeValue(this._select.value);
            }
        };
        return NgSelectOption;
    }());
    NgSelectOption.decorators = [
        { type: i0.Directive, args: [{ selector: 'option' },] }
    ];
    NgSelectOption.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: i0.Renderer2 },
        { type: SelectControlValueAccessor, decorators: [{ type: i0.Optional }, { type: i0.Host }] }
    ]; };
    NgSelectOption.propDecorators = {
        ngValue: [{ type: i0.Input, args: ['ngValue',] }],
        value: [{ type: i0.Input, args: ['value',] }]
    };
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var SELECT_MULTIPLE_VALUE_ACCESSOR = {
        provide: NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return SelectMultipleControlValueAccessor; }),
        multi: true
    };
    function _buildValueString$1(id, value) {
        if (id == null)
            return "" + value;
        if (typeof value === 'string')
            value = "'" + value + "'";
        if (value && typeof value === 'object')
            value = 'Object';
        return (id + ": " + value).slice(0, 50);
    }
    function _extractId$1(valueString) {
        return valueString.split(':')[0];
    }
    /** Mock interface for HTMLCollection */
    var HTMLCollection = /** @class */ (function () {
        function HTMLCollection() {
        }
        return HTMLCollection;
    }());
    /**
     * @description
     * The `ControlValueAccessor` for writing multi-select control values and listening to multi-select
     * control changes. The value accessor is used by the `FormControlDirective`, `FormControlName`, and
     * `NgModel` directives.
     *
     * @see `SelectControlValueAccessor`
     *
     * @usageNotes
     *
     * ### Using a multi-select control
     *
     * The follow example shows you how to use a multi-select control with a reactive form.
     *
     * ```ts
     * const countryControl = new FormControl();
     * ```
     *
     * ```
     * <select multiple name="countries" [formControl]="countryControl">
     *   <option *ngFor="let country of countries" [ngValue]="country">
     *     {{ country.name }}
     *   </option>
     * </select>
     * ```
     *
     * ### Customizing option selection
     *
     * To customize the default option comparison algorithm, `<select>` supports `compareWith` input.
     * See the `SelectControlValueAccessor` for usage.
     *
     * @ngModule ReactiveFormsModule
     * @ngModule FormsModule
     * @publicApi
     */
    var SelectMultipleControlValueAccessor = /** @class */ (function () {
        function SelectMultipleControlValueAccessor(_renderer, _elementRef) {
            this._renderer = _renderer;
            this._elementRef = _elementRef;
            /** @internal */
            this._optionMap = new Map();
            /** @internal */
            this._idCounter = 0;
            /**
             * The registered callback function called when a change event occurs on the input element.
             * @nodoc
             */
            this.onChange = function (_) { };
            /**
             * The registered callback function called when a blur event occurs on the input element.
             * @nodoc
             */
            this.onTouched = function () { };
            this._compareWith = Object.is;
        }
        Object.defineProperty(SelectMultipleControlValueAccessor.prototype, "compareWith", {
            /**
             * @description
             * Tracks the option comparison algorithm for tracking identities when
             * checking for changes.
             */
            set: function (fn) {
                if (typeof fn !== 'function' && (typeof ngDevMode === 'undefined' || ngDevMode)) {
                    throw new Error("compareWith must be a function, but received " + JSON.stringify(fn));
                }
                this._compareWith = fn;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Sets the "value" property on one or of more of the select's options.
         * @nodoc
         */
        SelectMultipleControlValueAccessor.prototype.writeValue = function (value) {
            var _this = this;
            this.value = value;
            var optionSelectedStateSetter;
            if (Array.isArray(value)) {
                // convert values to ids
                var ids_1 = value.map(function (v) { return _this._getOptionId(v); });
                optionSelectedStateSetter = function (opt, o) {
                    opt._setSelected(ids_1.indexOf(o.toString()) > -1);
                };
            }
            else {
                optionSelectedStateSetter = function (opt, o) {
                    opt._setSelected(false);
                };
            }
            this._optionMap.forEach(optionSelectedStateSetter);
        };
        /**
         * Registers a function called when the control value changes
         * and writes an array of the selected options.
         * @nodoc
         */
        SelectMultipleControlValueAccessor.prototype.registerOnChange = function (fn) {
            var _this = this;
            this.onChange = function (_) {
                var selected = [];
                if (_.selectedOptions !== undefined) {
                    var options = _.selectedOptions;
                    for (var i = 0; i < options.length; i++) {
                        var opt = options.item(i);
                        var val = _this._getOptionValue(opt.value);
                        selected.push(val);
                    }
                }
                // Degrade on IE
                else {
                    var options = _.options;
                    for (var i = 0; i < options.length; i++) {
                        var opt = options.item(i);
                        if (opt.selected) {
                            var val = _this._getOptionValue(opt.value);
                            selected.push(val);
                        }
                    }
                }
                _this.value = selected;
                fn(selected);
            };
        };
        /**
         * Registers a function called when the control is touched.
         * @nodoc
         */
        SelectMultipleControlValueAccessor.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        /**
         * Sets the "disabled" property on the select input element.
         * @nodoc
         */
        SelectMultipleControlValueAccessor.prototype.setDisabledState = function (isDisabled) {
            this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
        };
        /** @internal */
        SelectMultipleControlValueAccessor.prototype._registerOption = function (value) {
            var id = (this._idCounter++).toString();
            this._optionMap.set(id, value);
            return id;
        };
        /** @internal */
        SelectMultipleControlValueAccessor.prototype._getOptionId = function (value) {
            var e_2, _d;
            try {
                for (var _e = tslib_1.__values(Array.from(this._optionMap.keys())), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var id = _f.value;
                    if (this._compareWith(this._optionMap.get(id)._value, value))
                        return id;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_d = _e.return)) _d.call(_e);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return null;
        };
        /** @internal */
        SelectMultipleControlValueAccessor.prototype._getOptionValue = function (valueString) {
            var id = _extractId$1(valueString);
            return this._optionMap.has(id) ? this._optionMap.get(id)._value : valueString;
        };
        return SelectMultipleControlValueAccessor;
    }());
    SelectMultipleControlValueAccessor.decorators = [
        { type: i0.Directive, args: [{
                    selector: 'select[multiple][formControlName],select[multiple][formControl],select[multiple][ngModel]',
                    host: { '(change)': 'onChange($event.target)', '(blur)': 'onTouched()' },
                    providers: [SELECT_MULTIPLE_VALUE_ACCESSOR]
                },] }
    ];
    SelectMultipleControlValueAccessor.ctorParameters = function () { return [
        { type: i0.Renderer2 },
        { type: i0.ElementRef }
    ]; };
    SelectMultipleControlValueAccessor.propDecorators = {
        compareWith: [{ type: i0.Input }]
    };
    /**
     * @description
     * Marks `<option>` as dynamic, so Angular can be notified when options change.
     *
     * @see `SelectMultipleControlValueAccessor`
     *
     * @ngModule ReactiveFormsModule
     * @ngModule FormsModule
     * @publicApi
     */
    var ɵNgSelectMultipleOption = /** @class */ (function () {
        function ɵNgSelectMultipleOption(_element, _renderer, _select) {
            this._element = _element;
            this._renderer = _renderer;
            this._select = _select;
            if (this._select) {
                this.id = this._select._registerOption(this);
            }
        }
        Object.defineProperty(ɵNgSelectMultipleOption.prototype, "ngValue", {
            /**
             * @description
             * Tracks the value bound to the option element. Unlike the value binding,
             * ngValue supports binding to objects.
             */
            set: function (value) {
                if (this._select == null)
                    return;
                this._value = value;
                this._setElementValue(_buildValueString$1(this.id, value));
                this._select.writeValue(this._select.value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ɵNgSelectMultipleOption.prototype, "value", {
            /**
             * @description
             * Tracks simple string values bound to the option element.
             * For objects, use the `ngValue` input binding.
             */
            set: function (value) {
                if (this._select) {
                    this._value = value;
                    this._setElementValue(_buildValueString$1(this.id, value));
                    this._select.writeValue(this._select.value);
                }
                else {
                    this._setElementValue(value);
                }
            },
            enumerable: false,
            configurable: true
        });
        /** @internal */
        ɵNgSelectMultipleOption.prototype._setElementValue = function (value) {
            this._renderer.setProperty(this._element.nativeElement, 'value', value);
        };
        /** @internal */
        ɵNgSelectMultipleOption.prototype._setSelected = function (selected) {
            this._renderer.setProperty(this._element.nativeElement, 'selected', selected);
        };
        /** @nodoc */
        ɵNgSelectMultipleOption.prototype.ngOnDestroy = function () {
            if (this._select) {
                this._select._optionMap.delete(this.id);
                this._select.writeValue(this._select.value);
            }
        };
        return ɵNgSelectMultipleOption;
    }());
    ɵNgSelectMultipleOption.decorators = [
        { type: i0.Directive, args: [{ selector: 'option' },] }
    ];
    ɵNgSelectMultipleOption.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: i0.Renderer2 },
        { type: SelectMultipleControlValueAccessor, decorators: [{ type: i0.Optional }, { type: i0.Host }] }
    ]; };
    ɵNgSelectMultipleOption.propDecorators = {
        ngValue: [{ type: i0.Input, args: ['ngValue',] }],
        value: [{ type: i0.Input, args: ['value',] }]
    };
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function controlPath(name, parent) {
        return tslib_1.__spread(parent.path, [name]);
    }
    function setUpControl(control, dir) {
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            if (!control)
                _throwError(dir, 'Cannot find control with');
            if (!dir.valueAccessor)
                _throwError(dir, 'No value accessor for form control with');
        }
        setUpValidators(control, dir, /* handleOnValidatorChange */ true);
        dir.valueAccessor.writeValue(control.value);
        setUpViewChangePipeline(control, dir);
        setUpModelChangePipeline(control, dir);
        setUpBlurPipeline(control, dir);
        setUpDisabledChangeHandler(control, dir);
    }
    function cleanUpControl(control, dir) {
        var noop = function () {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                _noControlError(dir);
            }
        };
        dir.valueAccessor.registerOnChange(noop);
        dir.valueAccessor.registerOnTouched(noop);
        cleanUpValidators(control, dir, /* handleOnValidatorChange */ true);
        if (control) {
            dir._invokeOnDestroyCallbacks();
            control._registerOnCollectionChange(function () { });
        }
    }
    function registerOnValidatorChange(validators, onChange) {
        validators.forEach(function (validator) {
            if (validator.registerOnValidatorChange)
                validator.registerOnValidatorChange(onChange);
        });
    }
    /**
     * Sets up disabled change handler function on a given form control if ControlValueAccessor
     * associated with a given directive instance supports the `setDisabledState` call.
     *
     * @param control Form control where disabled change handler should be setup.
     * @param dir Corresponding directive instance associated with this control.
     */
    function setUpDisabledChangeHandler(control, dir) {
        if (dir.valueAccessor.setDisabledState) {
            var onDisabledChange_1 = function (isDisabled) {
                dir.valueAccessor.setDisabledState(isDisabled);
            };
            control.registerOnDisabledChange(onDisabledChange_1);
            // Register a callback function to cleanup disabled change handler
            // from a control instance when a directive is destroyed.
            dir._registerOnDestroy(function () {
                control._unregisterOnDisabledChange(onDisabledChange_1);
            });
        }
    }
    /**
     * Sets up sync and async directive validators on provided form control.
     * This function merges validators from the directive into the validators of the control.
     *
     * @param control Form control where directive validators should be setup.
     * @param dir Directive instance that contains validators to be setup.
     * @param handleOnValidatorChange Flag that determines whether directive validators should be setup
     *     to handle validator input change.
     */
    function setUpValidators(control, dir, handleOnValidatorChange) {
        var validators = getControlValidators(control);
        if (dir.validator !== null) {
            control.setValidators(mergeValidators(validators, dir.validator));
        }
        else if (typeof validators === 'function') {
            // If sync validators are represented by a single validator function, we force the
            // `Validators.compose` call to happen by executing the `setValidators` function with
            // an array that contains that function. We need this to avoid possible discrepancies in
            // validators behavior, so sync validators are always processed by the `Validators.compose`.
            // Note: we should consider moving this logic inside the `setValidators` function itself, so we
            // have consistent behavior on AbstractControl API level. The same applies to the async
            // validators logic below.
            control.setValidators([validators]);
        }
        var asyncValidators = getControlAsyncValidators(control);
        if (dir.asyncValidator !== null) {
            control.setAsyncValidators(mergeValidators(asyncValidators, dir.asyncValidator));
        }
        else if (typeof asyncValidators === 'function') {
            control.setAsyncValidators([asyncValidators]);
        }
        // Re-run validation when validator binding changes, e.g. minlength=3 -> minlength=4
        if (handleOnValidatorChange) {
            var onValidatorChange = function () { return control.updateValueAndValidity(); };
            registerOnValidatorChange(dir._rawValidators, onValidatorChange);
            registerOnValidatorChange(dir._rawAsyncValidators, onValidatorChange);
        }
    }
    /**
     * Cleans up sync and async directive validators on provided form control.
     * This function reverts the setup performed by the `setUpValidators` function, i.e.
     * removes directive-specific validators from a given control instance.
     *
     * @param control Form control from where directive validators should be removed.
     * @param dir Directive instance that contains validators to be removed.
     * @param handleOnValidatorChange Flag that determines whether directive validators should also be
     *     cleaned up to stop handling validator input change (if previously configured to do so).
     */
    function cleanUpValidators(control, dir, handleOnValidatorChange) {
        if (control !== null) {
            if (dir.validator !== null) {
                var validators = getControlValidators(control);
                if (Array.isArray(validators) && validators.length > 0) {
                    // Filter out directive validator function.
                    control.setValidators(validators.filter(function (validator) { return validator !== dir.validator; }));
                }
            }
            if (dir.asyncValidator !== null) {
                var asyncValidators = getControlAsyncValidators(control);
                if (Array.isArray(asyncValidators) && asyncValidators.length > 0) {
                    // Filter out directive async validator function.
                    control.setAsyncValidators(asyncValidators.filter(function (asyncValidator) { return asyncValidator !== dir.asyncValidator; }));
                }
            }
        }
        if (handleOnValidatorChange) {
            // Clear onValidatorChange callbacks by providing a noop function.
            var noop = function () { };
            registerOnValidatorChange(dir._rawValidators, noop);
            registerOnValidatorChange(dir._rawAsyncValidators, noop);
        }
    }
    function setUpViewChangePipeline(control, dir) {
        dir.valueAccessor.registerOnChange(function (newValue) {
            control._pendingValue = newValue;
            control._pendingChange = true;
            control._pendingDirty = true;
            if (control.updateOn === 'change')
                updateControl(control, dir);
        });
    }
    function setUpBlurPipeline(control, dir) {
        dir.valueAccessor.registerOnTouched(function () {
            control._pendingTouched = true;
            if (control.updateOn === 'blur' && control._pendingChange)
                updateControl(control, dir);
            if (control.updateOn !== 'submit')
                control.markAsTouched();
        });
    }
    function updateControl(control, dir) {
        if (control._pendingDirty)
            control.markAsDirty();
        control.setValue(control._pendingValue, { emitModelToViewChange: false });
        dir.viewToModelUpdate(control._pendingValue);
        control._pendingChange = false;
    }
    function setUpModelChangePipeline(control, dir) {
        var onChange = function (newValue, emitModelEvent) {
            // control -> view
            dir.valueAccessor.writeValue(newValue);
            // control -> ngModel
            if (emitModelEvent)
                dir.viewToModelUpdate(newValue);
        };
        control.registerOnChange(onChange);
        // Register a callback function to cleanup onChange handler
        // from a control instance when a directive is destroyed.
        dir._registerOnDestroy(function () {
            control._unregisterOnChange(onChange);
        });
    }
    function setUpFormContainer(control, dir) {
        if (control == null && (typeof ngDevMode === 'undefined' || ngDevMode))
            _throwError(dir, 'Cannot find control with');
        setUpValidators(control, dir, /* handleOnValidatorChange */ false);
    }
    function _noControlError(dir) {
        return _throwError(dir, 'There is no FormControl instance attached to form control element with');
    }
    function _throwError(dir, message) {
        var messageEnd;
        if (dir.path.length > 1) {
            messageEnd = "path: '" + dir.path.join(' -> ') + "'";
        }
        else if (dir.path[0]) {
            messageEnd = "name: '" + dir.path + "'";
        }
        else {
            messageEnd = 'unspecified name attribute';
        }
        throw new Error(message + " " + messageEnd);
    }
    function isPropertyUpdated(changes, viewModel) {
        if (!changes.hasOwnProperty('model'))
            return false;
        var change = changes['model'];
        if (change.isFirstChange())
            return true;
        return !Object.is(viewModel, change.currentValue);
    }
    var BUILTIN_ACCESSORS = [
        CheckboxControlValueAccessor,
        RangeValueAccessor,
        NumberValueAccessor,
        SelectControlValueAccessor,
        SelectMultipleControlValueAccessor,
        RadioControlValueAccessor,
    ];
    function isBuiltInAccessor(valueAccessor) {
        return BUILTIN_ACCESSORS.some(function (a) { return valueAccessor.constructor === a; });
    }
    function syncPendingControls(form, directives) {
        form._syncPendingControls();
        directives.forEach(function (dir) {
            var control = dir.control;
            if (control.updateOn === 'submit' && control._pendingChange) {
                dir.viewToModelUpdate(control._pendingValue);
                control._pendingChange = false;
            }
        });
    }
    // TODO: vsavkin remove it once https://github.com/angular/angular/issues/3011 is implemented
    function selectValueAccessor(dir, valueAccessors) {
        if (!valueAccessors)
            return null;
        if (!Array.isArray(valueAccessors) && (typeof ngDevMode === 'undefined' || ngDevMode))
            _throwError(dir, 'Value accessor was not provided as an array for form control with');
        var defaultAccessor = undefined;
        var builtinAccessor = undefined;
        var customAccessor = undefined;
        valueAccessors.forEach(function (v) {
            if (v.constructor === DefaultValueAccessor) {
                defaultAccessor = v;
            }
            else if (isBuiltInAccessor(v)) {
                if (builtinAccessor && (typeof ngDevMode === 'undefined' || ngDevMode))
                    _throwError(dir, 'More than one built-in value accessor matches form control with');
                builtinAccessor = v;
            }
            else {
                if (customAccessor && (typeof ngDevMode === 'undefined' || ngDevMode))
                    _throwError(dir, 'More than one custom value accessor matches form control with');
                customAccessor = v;
            }
        });
        if (customAccessor)
            return customAccessor;
        if (builtinAccessor)
            return builtinAccessor;
        if (defaultAccessor)
            return defaultAccessor;
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            _throwError(dir, 'No valid value accessor for form control with');
        }
        return null;
    }
    function removeListItem(list, el) {
        var index = list.indexOf(el);
        if (index > -1)
            list.splice(index, 1);
    }
    // TODO(kara): remove after deprecation period
    function _ngModelWarning(name, type, instance, warningConfig) {
        if (warningConfig === 'never')
            return;
        if (((warningConfig === null || warningConfig === 'once') && !type._ngModelWarningSentOnce) ||
            (warningConfig === 'always' && !instance._ngModelWarningSent)) {
            ReactiveErrors.ngModelWarning(name);
            type._ngModelWarningSentOnce = true;
            instance._ngModelWarningSent = true;
        }
    }
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Reports that a FormControl is valid, meaning that no errors exist in the input value.
     *
     * @see `status`
     */
    var VALID = 'VALID';
    /**
     * Reports that a FormControl is invalid, meaning that an error exists in the input value.
     *
     * @see `status`
     */
    var INVALID = 'INVALID';
    /**
     * Reports that a FormControl is pending, meaning that that async validation is occurring and
     * errors are not yet available for the input value.
     *
     * @see `markAsPending`
     * @see `status`
     */
    var PENDING = 'PENDING';
    /**
     * Reports that a FormControl is disabled, meaning that the control is exempt from ancestor
     * calculations of validity or value.
     *
     * @see `markAsDisabled`
     * @see `status`
     */
    var DISABLED = 'DISABLED';
    function _find(control, path, delimiter) {
        if (path == null)
            return null;
        if (!Array.isArray(path)) {
            path = path.split(delimiter);
        }
        if (Array.isArray(path) && path.length === 0)
            return null;
        // Not using Array.reduce here due to a Chrome 80 bug
        // https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
        var controlToFind = control;
        path.forEach(function (name) {
            if (controlToFind instanceof FormGroup) {
                controlToFind = controlToFind.controls.hasOwnProperty(name) ?
                    controlToFind.controls[name] :
                    null;
            }
            else if (controlToFind instanceof FormArray) {
                controlToFind = controlToFind.at(name) || null;
            }
            else {
                controlToFind = null;
            }
        });
        return controlToFind;
    }
    /**
     * Gets validators from either an options object or given validators.
     */
    function pickValidators(validatorOrOpts) {
        return (isOptionsObj(validatorOrOpts) ? validatorOrOpts.validators : validatorOrOpts) || null;
    }
    /**
     * Creates validator function by combining provided validators.
     */
    function coerceToValidator(validator) {
        return Array.isArray(validator) ? composeValidators(validator) : validator || null;
    }
    /**
     * Gets async validators from either an options object or given validators.
     */
    function pickAsyncValidators(asyncValidator, validatorOrOpts) {
        return (isOptionsObj(validatorOrOpts) ? validatorOrOpts.asyncValidators : asyncValidator) || null;
    }
    /**
     * Creates async validator function by combining provided async validators.
     */
    function coerceToAsyncValidator(asyncValidator) {
        return Array.isArray(asyncValidator) ? composeAsyncValidators(asyncValidator) :
            asyncValidator || null;
    }
    function isOptionsObj(validatorOrOpts) {
        return validatorOrOpts != null && !Array.isArray(validatorOrOpts) &&
            typeof validatorOrOpts === 'object';
    }
    /**
     * This is the base class for `FormControl`, `FormGroup`, and `FormArray`.
     *
     * It provides some of the shared behavior that all controls and groups of controls have, like
     * running validators, calculating status, and resetting state. It also defines the properties
     * that are shared between all sub-classes, like `value`, `valid`, and `dirty`. It shouldn't be
     * instantiated directly.
     *
     * @see [Forms Guide](/guide/forms)
     * @see [Reactive Forms Guide](/guide/reactive-forms)
     * @see [Dynamic Forms Guide](/guide/dynamic-form)
     *
     * @publicApi
     */
    var AbstractControl = /** @class */ (function () {
        /**
         * Initialize the AbstractControl instance.
         *
         * @param validators The function or array of functions that is used to determine the validity of
         *     this control synchronously.
         * @param asyncValidators The function or array of functions that is used to determine validity of
         *     this control asynchronously.
         */
        function AbstractControl(validators, asyncValidators) {
            /**
             * Indicates that a control has its own pending asynchronous validation in progress.
             *
             * @internal
             */
            this._hasOwnPendingAsyncValidator = false;
            /** @internal */
            this._onCollectionChange = function () { };
            this._parent = null;
            /**
             * A control is `pristine` if the user has not yet changed
             * the value in the UI.
             *
             * @returns True if the user has not yet changed the value in the UI; compare `dirty`.
             * Programmatic changes to a control's value do not mark it dirty.
             */
            this.pristine = true;
            /**
             * True if the control is marked as `touched`.
             *
             * A control is marked `touched` once the user has triggered
             * a `blur` event on it.
             */
            this.touched = false;
            /** @internal */
            this._onDisabledChange = [];
            this._rawValidators = validators;
            this._rawAsyncValidators = asyncValidators;
            this._composedValidatorFn = coerceToValidator(this._rawValidators);
            this._composedAsyncValidatorFn = coerceToAsyncValidator(this._rawAsyncValidators);
        }
        Object.defineProperty(AbstractControl.prototype, "validator", {
            /**
             * The function that is used to determine the validity of this control synchronously.
             */
            get: function () {
                return this._composedValidatorFn;
            },
            set: function (validatorFn) {
                this._rawValidators = this._composedValidatorFn = validatorFn;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AbstractControl.prototype, "asyncValidator", {
            /**
             * The function that is used to determine the validity of this control asynchronously.
             */
            get: function () {
                return this._composedAsyncValidatorFn;
            },
            set: function (asyncValidatorFn) {
                this._rawAsyncValidators = this._composedAsyncValidatorFn = asyncValidatorFn;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AbstractControl.prototype, "parent", {
            /**
             * The parent control.
             */
            get: function () {
                return this._parent;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AbstractControl.prototype, "valid", {
            /**
             * A control is `valid` when its `status` is `VALID`.
             *
             * @see {@link AbstractControl.status}
             *
             * @returns True if the control has passed all of its validation tests,
             * false otherwise.
             */
            get: function () {
                return this.status === VALID;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AbstractControl.prototype, "invalid", {
            /**
             * A control is `invalid` when its `status` is `INVALID`.
             *
             * @see {@link AbstractControl.status}
             *
             * @returns True if this control has failed one or more of its validation checks,
             * false otherwise.
             */
            get: function () {
                return this.status === INVALID;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AbstractControl.prototype, "pending", {
            /**
             * A control is `pending` when its `status` is `PENDING`.
             *
             * @see {@link AbstractControl.status}
             *
             * @returns True if this control is in the process of conducting a validation check,
             * false otherwise.
             */
            get: function () {
                return this.status == PENDING;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AbstractControl.prototype, "disabled", {
            /**
             * A control is `disabled` when its `status` is `DISABLED`.
             *
             * Disabled controls are exempt from validation checks and
             * are not included in the aggregate value of their ancestor
             * controls.
             *
             * @see {@link AbstractControl.status}
             *
             * @returns True if the control is disabled, false otherwise.
             */
            get: function () {
                return this.status === DISABLED;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AbstractControl.prototype, "enabled", {
            /**
             * A control is `enabled` as long as its `status` is not `DISABLED`.
             *
             * @returns True if the control has any status other than 'DISABLED',
             * false if the status is 'DISABLED'.
             *
             * @see {@link AbstractControl.status}
             *
             */
            get: function () {
                return this.status !== DISABLED;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AbstractControl.prototype, "dirty", {
            /**
             * A control is `dirty` if the user has changed the value
             * in the UI.
             *
             * @returns True if the user has changed the value of this control in the UI; compare `pristine`.
             * Programmatic changes to a control's value do not mark it dirty.
             */
            get: function () {
                return !this.pristine;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AbstractControl.prototype, "untouched", {
            /**
             * True if the control has not been marked as touched
             *
             * A control is `untouched` if the user has not yet triggered
             * a `blur` event on it.
             */
            get: function () {
                return !this.touched;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AbstractControl.prototype, "updateOn", {
            /**
             * Reports the update strategy of the `AbstractControl` (meaning
             * the event on which the control updates itself).
             * Possible values: `'change'` | `'blur'` | `'submit'`
             * Default value: `'change'`
             */
            get: function () {
                return this._updateOn ? this._updateOn : (this.parent ? this.parent.updateOn : 'change');
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Sets the synchronous validators that are active on this control.  Calling
         * this overwrites any existing sync validators.
         *
         * When you add or remove a validator at run time, you must call
         * `updateValueAndValidity()` for the new validation to take effect.
         *
         */
        AbstractControl.prototype.setValidators = function (newValidator) {
            this._rawValidators = newValidator;
            this._composedValidatorFn = coerceToValidator(newValidator);
        };
        /**
         * Sets the async validators that are active on this control. Calling this
         * overwrites any existing async validators.
         *
         * When you add or remove a validator at run time, you must call
         * `updateValueAndValidity()` for the new validation to take effect.
         *
         */
        AbstractControl.prototype.setAsyncValidators = function (newValidator) {
            this._rawAsyncValidators = newValidator;
            this._composedAsyncValidatorFn = coerceToAsyncValidator(newValidator);
        };
        /**
         * Empties out the sync validator list.
         *
         * When you add or remove a validator at run time, you must call
         * `updateValueAndValidity()` for the new validation to take effect.
         *
         */
        AbstractControl.prototype.clearValidators = function () {
            this.validator = null;
        };
        /**
         * Empties out the async validator list.
         *
         * When you add or remove a validator at run time, you must call
         * `updateValueAndValidity()` for the new validation to take effect.
         *
         */
        AbstractControl.prototype.clearAsyncValidators = function () {
            this.asyncValidator = null;
        };
        /**
         * Marks the control as `touched`. A control is touched by focus and
         * blur events that do not change the value.
         *
         * @see `markAsUntouched()`
         * @see `markAsDirty()`
         * @see `markAsPristine()`
         *
         * @param opts Configuration options that determine how the control propagates changes
         * and emits events after marking is applied.
         * * `onlySelf`: When true, mark only this control. When false or not supplied,
         * marks all direct ancestors. Default is false.
         */
        AbstractControl.prototype.markAsTouched = function (opts) {
            if (opts === void 0) { opts = {}; }
            this.touched = true;
            if (this._parent && !opts.onlySelf) {
                this._parent.markAsTouched(opts);
            }
        };
        /**
         * Marks the control and all its descendant controls as `touched`.
         * @see `markAsTouched()`
         */
        AbstractControl.prototype.markAllAsTouched = function () {
            this.markAsTouched({ onlySelf: true });
            this._forEachChild(function (control) { return control.markAllAsTouched(); });
        };
        /**
         * Marks the control as `untouched`.
         *
         * If the control has any children, also marks all children as `untouched`
         * and recalculates the `touched` status of all parent controls.
         *
         * @see `markAsTouched()`
         * @see `markAsDirty()`
         * @see `markAsPristine()`
         *
         * @param opts Configuration options that determine how the control propagates changes
         * and emits events after the marking is applied.
         * * `onlySelf`: When true, mark only this control. When false or not supplied,
         * marks all direct ancestors. Default is false.
         */
        AbstractControl.prototype.markAsUntouched = function (opts) {
            if (opts === void 0) { opts = {}; }
            this.touched = false;
            this._pendingTouched = false;
            this._forEachChild(function (control) {
                control.markAsUntouched({ onlySelf: true });
            });
            if (this._parent && !opts.onlySelf) {
                this._parent._updateTouched(opts);
            }
        };
        /**
         * Marks the control as `dirty`. A control becomes dirty when
         * the control's value is changed through the UI; compare `markAsTouched`.
         *
         * @see `markAsTouched()`
         * @see `markAsUntouched()`
         * @see `markAsPristine()`
         *
         * @param opts Configuration options that determine how the control propagates changes
         * and emits events after marking is applied.
         * * `onlySelf`: When true, mark only this control. When false or not supplied,
         * marks all direct ancestors. Default is false.
         */
        AbstractControl.prototype.markAsDirty = function (opts) {
            if (opts === void 0) { opts = {}; }
            this.pristine = false;
            if (this._parent && !opts.onlySelf) {
                this._parent.markAsDirty(opts);
            }
        };
        /**
         * Marks the control as `pristine`.
         *
         * If the control has any children, marks all children as `pristine`,
         * and recalculates the `pristine` status of all parent
         * controls.
         *
         * @see `markAsTouched()`
         * @see `markAsUntouched()`
         * @see `markAsDirty()`
         *
         * @param opts Configuration options that determine how the control emits events after
         * marking is applied.
         * * `onlySelf`: When true, mark only this control. When false or not supplied,
         * marks all direct ancestors. Default is false.
         */
        AbstractControl.prototype.markAsPristine = function (opts) {
            if (opts === void 0) { opts = {}; }
            this.pristine = true;
            this._pendingDirty = false;
            this._forEachChild(function (control) {
                control.markAsPristine({ onlySelf: true });
            });
            if (this._parent && !opts.onlySelf) {
                this._parent._updatePristine(opts);
            }
        };
        /**
         * Marks the control as `pending`.
         *
         * A control is pending while the control performs async validation.
         *
         * @see {@link AbstractControl.status}
         *
         * @param opts Configuration options that determine how the control propagates changes and
         * emits events after marking is applied.
         * * `onlySelf`: When true, mark only this control. When false or not supplied,
         * marks all direct ancestors. Default is false.
         * * `emitEvent`: When true or not supplied (the default), the `statusChanges`
         * observable emits an event with the latest status the control is marked pending.
         * When false, no events are emitted.
         *
         */
        AbstractControl.prototype.markAsPending = function (opts) {
            if (opts === void 0) { opts = {}; }
            this.status = PENDING;
            if (opts.emitEvent !== false) {
                this.statusChanges.emit(this.status);
            }
            if (this._parent && !opts.onlySelf) {
                this._parent.markAsPending(opts);
            }
        };
        /**
         * Disables the control. This means the control is exempt from validation checks and
         * excluded from the aggregate value of any parent. Its status is `DISABLED`.
         *
         * If the control has children, all children are also disabled.
         *
         * @see {@link AbstractControl.status}
         *
         * @param opts Configuration options that determine how the control propagates
         * changes and emits events after the control is disabled.
         * * `onlySelf`: When true, mark only this control. When false or not supplied,
         * marks all direct ancestors. Default is false.
         * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
         * `valueChanges`
         * observables emit events with the latest status and value when the control is disabled.
         * When false, no events are emitted.
         */
        AbstractControl.prototype.disable = function (opts) {
            if (opts === void 0) { opts = {}; }
            // If parent has been marked artificially dirty we don't want to re-calculate the
            // parent's dirtiness based on the children.
            var skipPristineCheck = this._parentMarkedDirty(opts.onlySelf);
            this.status = DISABLED;
            this.errors = null;
            this._forEachChild(function (control) {
                control.disable(Object.assign(Object.assign({}, opts), { onlySelf: true }));
            });
            this._updateValue();
            if (opts.emitEvent !== false) {
                this.valueChanges.emit(this.value);
                this.statusChanges.emit(this.status);
            }
            this._updateAncestors(Object.assign(Object.assign({}, opts), { skipPristineCheck: skipPristineCheck }));
            this._onDisabledChange.forEach(function (changeFn) { return changeFn(true); });
        };
        /**
         * Enables the control. This means the control is included in validation checks and
         * the aggregate value of its parent. Its status recalculates based on its value and
         * its validators.
         *
         * By default, if the control has children, all children are enabled.
         *
         * @see {@link AbstractControl.status}
         *
         * @param opts Configure options that control how the control propagates changes and
         * emits events when marked as untouched
         * * `onlySelf`: When true, mark only this control. When false or not supplied,
         * marks all direct ancestors. Default is false.
         * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
         * `valueChanges`
         * observables emit events with the latest status and value when the control is enabled.
         * When false, no events are emitted.
         */
        AbstractControl.prototype.enable = function (opts) {
            if (opts === void 0) { opts = {}; }
            // If parent has been marked artificially dirty we don't want to re-calculate the
            // parent's dirtiness based on the children.
            var skipPristineCheck = this._parentMarkedDirty(opts.onlySelf);
            this.status = VALID;
            this._forEachChild(function (control) {
                control.enable(Object.assign(Object.assign({}, opts), { onlySelf: true }));
            });
            this.updateValueAndValidity({ onlySelf: true, emitEvent: opts.emitEvent });
            this._updateAncestors(Object.assign(Object.assign({}, opts), { skipPristineCheck: skipPristineCheck }));
            this._onDisabledChange.forEach(function (changeFn) { return changeFn(false); });
        };
        AbstractControl.prototype._updateAncestors = function (opts) {
            if (this._parent && !opts.onlySelf) {
                this._parent.updateValueAndValidity(opts);
                if (!opts.skipPristineCheck) {
                    this._parent._updatePristine();
                }
                this._parent._updateTouched();
            }
        };
        /**
         * @param parent Sets the parent of the control
         */
        AbstractControl.prototype.setParent = function (parent) {
            this._parent = parent;
        };
        /**
         * Recalculates the value and validation status of the control.
         *
         * By default, it also updates the value and validity of its ancestors.
         *
         * @param opts Configuration options determine how the control propagates changes and emits events
         * after updates and validity checks are applied.
         * * `onlySelf`: When true, only update this control. When false or not supplied,
         * update all direct ancestors. Default is false.
         * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
         * `valueChanges`
         * observables emit events with the latest status and value when the control is updated.
         * When false, no events are emitted.
         */
        AbstractControl.prototype.updateValueAndValidity = function (opts) {
            if (opts === void 0) { opts = {}; }
            this._setInitialStatus();
            this._updateValue();
            if (this.enabled) {
                this._cancelExistingSubscription();
                this.errors = this._runValidator();
                this.status = this._calculateStatus();
                if (this.status === VALID || this.status === PENDING) {
                    this._runAsyncValidator(opts.emitEvent);
                }
            }
            if (opts.emitEvent !== false) {
                this.valueChanges.emit(this.value);
                this.statusChanges.emit(this.status);
            }
            if (this._parent && !opts.onlySelf) {
                this._parent.updateValueAndValidity(opts);
            }
        };
        /** @internal */
        AbstractControl.prototype._updateTreeValidity = function (opts) {
            if (opts === void 0) { opts = { emitEvent: true }; }
            this._forEachChild(function (ctrl) { return ctrl._updateTreeValidity(opts); });
            this.updateValueAndValidity({ onlySelf: true, emitEvent: opts.emitEvent });
        };
        AbstractControl.prototype._setInitialStatus = function () {
            this.status = this._allControlsDisabled() ? DISABLED : VALID;
        };
        AbstractControl.prototype._runValidator = function () {
            return this.validator ? this.validator(this) : null;
        };
        AbstractControl.prototype._runAsyncValidator = function (emitEvent) {
            var _this = this;
            if (this.asyncValidator) {
                this.status = PENDING;
                this._hasOwnPendingAsyncValidator = true;
                var obs = toObservable(this.asyncValidator(this));
                this._asyncValidationSubscription = obs.subscribe(function (errors) {
                    _this._hasOwnPendingAsyncValidator = false;
                    // This will trigger the recalculation of the validation status, which depends on
                    // the state of the asynchronous validation (whether it is in progress or not). So, it is
                    // necessary that we have updated the `_hasOwnPendingAsyncValidator` boolean flag first.
                    _this.setErrors(errors, { emitEvent: emitEvent });
                });
            }
        };
        AbstractControl.prototype._cancelExistingSubscription = function () {
            if (this._asyncValidationSubscription) {
                this._asyncValidationSubscription.unsubscribe();
                this._hasOwnPendingAsyncValidator = false;
            }
        };
        /**
         * Sets errors on a form control when running validations manually, rather than automatically.
         *
         * Calling `setErrors` also updates the validity of the parent control.
         *
         * @usageNotes
         *
         * ### Manually set the errors for a control
         *
         * ```
         * const login = new FormControl('someLogin');
         * login.setErrors({
         *   notUnique: true
         * });
         *
         * expect(login.valid).toEqual(false);
         * expect(login.errors).toEqual({ notUnique: true });
         *
         * login.setValue('someOtherLogin');
         *
         * expect(login.valid).toEqual(true);
         * ```
         */
        AbstractControl.prototype.setErrors = function (errors, opts) {
            if (opts === void 0) { opts = {}; }
            this.errors = errors;
            this._updateControlsErrors(opts.emitEvent !== false);
        };
        /**
         * Retrieves a child control given the control's name or path.
         *
         * @param path A dot-delimited string or array of string/number values that define the path to the
         * control.
         *
         * @usageNotes
         * ### Retrieve a nested control
         *
         * For example, to get a `name` control nested within a `person` sub-group:
         *
         * * `this.form.get('person.name');`
         *
         * -OR-
         *
         * * `this.form.get(['person', 'name']);`
         */
        AbstractControl.prototype.get = function (path) {
            return _find(this, path, '.');
        };
        /**
         * @description
         * Reports error data for the control with the given path.
         *
         * @param errorCode The code of the error to check
         * @param path A list of control names that designates how to move from the current control
         * to the control that should be queried for errors.
         *
         * @usageNotes
         * For example, for the following `FormGroup`:
         *
         * ```
         * form = new FormGroup({
         *   address: new FormGroup({ street: new FormControl() })
         * });
         * ```
         *
         * The path to the 'street' control from the root form would be 'address' -> 'street'.
         *
         * It can be provided to this method in one of two formats:
         *
         * 1. An array of string control names, e.g. `['address', 'street']`
         * 1. A period-delimited list of control names in one string, e.g. `'address.street'`
         *
         * @returns error data for that particular error. If the control or error is not present,
         * null is returned.
         */
        AbstractControl.prototype.getError = function (errorCode, path) {
            var control = path ? this.get(path) : this;
            return control && control.errors ? control.errors[errorCode] : null;
        };
        /**
         * @description
         * Reports whether the control with the given path has the error specified.
         *
         * @param errorCode The code of the error to check
         * @param path A list of control names that designates how to move from the current control
         * to the control that should be queried for errors.
         *
         * @usageNotes
         * For example, for the following `FormGroup`:
         *
         * ```
         * form = new FormGroup({
         *   address: new FormGroup({ street: new FormControl() })
         * });
         * ```
         *
         * The path to the 'street' control from the root form would be 'address' -> 'street'.
         *
         * It can be provided to this method in one of two formats:
         *
         * 1. An array of string control names, e.g. `['address', 'street']`
         * 1. A period-delimited list of control names in one string, e.g. `'address.street'`
         *
         * If no path is given, this method checks for the error on the current control.
         *
         * @returns whether the given error is present in the control at the given path.
         *
         * If the control is not present, false is returned.
         */
        AbstractControl.prototype.hasError = function (errorCode, path) {
            return !!this.getError(errorCode, path);
        };
        Object.defineProperty(AbstractControl.prototype, "root", {
            /**
             * Retrieves the top-level ancestor of this control.
             */
            get: function () {
                var x = this;
                while (x._parent) {
                    x = x._parent;
                }
                return x;
            },
            enumerable: false,
            configurable: true
        });
        /** @internal */
        AbstractControl.prototype._updateControlsErrors = function (emitEvent) {
            this.status = this._calculateStatus();
            if (emitEvent) {
                this.statusChanges.emit(this.status);
            }
            if (this._parent) {
                this._parent._updateControlsErrors(emitEvent);
            }
        };
        /** @internal */
        AbstractControl.prototype._initObservables = function () {
            this.valueChanges = new i0.EventEmitter();
            this.statusChanges = new i0.EventEmitter();
        };
        AbstractControl.prototype._calculateStatus = function () {
            if (this._allControlsDisabled())
                return DISABLED;
            if (this.errors)
                return INVALID;
            if (this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(PENDING))
                return PENDING;
            if (this._anyControlsHaveStatus(INVALID))
                return INVALID;
            return VALID;
        };
        /** @internal */
        AbstractControl.prototype._anyControlsHaveStatus = function (status) {
            return this._anyControls(function (control) { return control.status === status; });
        };
        /** @internal */
        AbstractControl.prototype._anyControlsDirty = function () {
            return this._anyControls(function (control) { return control.dirty; });
        };
        /** @internal */
        AbstractControl.prototype._anyControlsTouched = function () {
            return this._anyControls(function (control) { return control.touched; });
        };
        /** @internal */
        AbstractControl.prototype._updatePristine = function (opts) {
            if (opts === void 0) { opts = {}; }
            this.pristine = !this._anyControlsDirty();
            if (this._parent && !opts.onlySelf) {
                this._parent._updatePristine(opts);
            }
        };
        /** @internal */
        AbstractControl.prototype._updateTouched = function (opts) {
            if (opts === void 0) { opts = {}; }
            this.touched = this._anyControlsTouched();
            if (this._parent && !opts.onlySelf) {
                this._parent._updateTouched(opts);
            }
        };
        /** @internal */
        AbstractControl.prototype._isBoxedValue = function (formState) {
            return typeof formState === 'object' && formState !== null &&
                Object.keys(formState).length === 2 && 'value' in formState && 'disabled' in formState;
        };
        /** @internal */
        AbstractControl.prototype._registerOnCollectionChange = function (fn) {
            this._onCollectionChange = fn;
        };
        /** @internal */
        AbstractControl.prototype._setUpdateStrategy = function (opts) {
            if (isOptionsObj(opts) && opts.updateOn != null) {
                this._updateOn = opts.updateOn;
            }
        };
        /**
         * Check to see if parent has been marked artificially dirty.
         *
         * @internal
         */
        AbstractControl.prototype._parentMarkedDirty = function (onlySelf) {
            var parentDirty = this._parent && this._parent.dirty;
            return !onlySelf && !!parentDirty && !this._parent._anyControlsDirty();
        };
        return AbstractControl;
    }());
    /**
     * Tracks the value and validation status of an individual form control.
     *
     * This is one of the three fundamental building blocks of Angular forms, along with
     * `FormGroup` and `FormArray`. It extends the `AbstractControl` class that
     * implements most of the base functionality for accessing the value, validation status,
     * user interactions and events. See [usage examples below](#usage-notes).
     *
     * @see `AbstractControl`
     * @see [Reactive Forms Guide](guide/reactive-forms)
     * @see [Usage Notes](#usage-notes)
     *
     * @usageNotes
     *
     * ### Initializing Form Controls
     *
     * Instantiate a `FormControl`, with an initial value.
     *
     * ```ts
     * const control = new FormControl('some value');
     * console.log(control.value);     // 'some value'
     *```
     *
     * The following example initializes the control with a form state object. The `value`
     * and `disabled` keys are required in this case.
     *
     * ```ts
     * const control = new FormControl({ value: 'n/a', disabled: true });
     * console.log(control.value);     // 'n/a'
     * console.log(control.status);    // 'DISABLED'
     * ```
     *
     * The following example initializes the control with a sync validator.
     *
     * ```ts
     * const control = new FormControl('', Validators.required);
     * console.log(control.value);      // ''
     * console.log(control.status);     // 'INVALID'
     * ```
     *
     * The following example initializes the control using an options object.
     *
     * ```ts
     * const control = new FormControl('', {
     *    validators: Validators.required,
     *    asyncValidators: myAsyncValidator
     * });
     * ```
     *
     * ### Configure the control to update on a blur event
     *
     * Set the `updateOn` option to `'blur'` to update on the blur `event`.
     *
     * ```ts
     * const control = new FormControl('', { updateOn: 'blur' });
     * ```
     *
     * ### Configure the control to update on a submit event
     *
     * Set the `updateOn` option to `'submit'` to update on a submit `event`.
     *
     * ```ts
     * const control = new FormControl('', { updateOn: 'submit' });
     * ```
     *
     * ### Reset the control back to an initial value
     *
     * You reset to a specific form state by passing through a standalone
     * value or a form state object that contains both a value and a disabled state
     * (these are the only two properties that cannot be calculated).
     *
     * ```ts
     * const control = new FormControl('Nancy');
     *
     * console.log(control.value); // 'Nancy'
     *
     * control.reset('Drew');
     *
     * console.log(control.value); // 'Drew'
     * ```
     *
     * ### Reset the control back to an initial value and disabled
     *
     * ```
     * const control = new FormControl('Nancy');
     *
     * console.log(control.value); // 'Nancy'
     * console.log(control.status); // 'VALID'
     *
     * control.reset({ value: 'Drew', disabled: true });
     *
     * console.log(control.value); // 'Drew'
     * console.log(control.status); // 'DISABLED'
     * ```
     *
     * @publicApi
     */
    var FormControl = /** @class */ (function (_super) {
        tslib_1.__extends(FormControl, _super);
        /**
         * Creates a new `FormControl` instance.
         *
         * @param formState Initializes the control with an initial value,
         * or an object that defines the initial value and disabled state.
         *
         * @param validatorOrOpts A synchronous validator function, or an array of
         * such functions, or an `AbstractControlOptions` object that contains validation functions
         * and a validation trigger.
         *
         * @param asyncValidator A single async validator or array of async validator functions
         *
         */
        function FormControl(formState, validatorOrOpts, asyncValidator) {
            if (formState === void 0) { formState = null; }
            var _this = _super.call(this, pickValidators(validatorOrOpts), pickAsyncValidators(asyncValidator, validatorOrOpts)) || this;
            /** @internal */
            _this._onChange = [];
            _this._applyFormState(formState);
            _this._setUpdateStrategy(validatorOrOpts);
            _this._initObservables();
            _this.updateValueAndValidity({
                onlySelf: true,
                // If `asyncValidator` is present, it will trigger control status change from `PENDING` to
                // `VALID` or `INVALID`.
                // The status should be broadcasted via the `statusChanges` observable, so we set `emitEvent`
                // to `true` to allow that during the control creation process.
                emitEvent: !!asyncValidator
            });
            return _this;
        }
        /**
         * Sets a new value for the form control.
         *
         * @param value The new value for the control.
         * @param options Configuration options that determine how the control propagates changes
         * and emits events when the value changes.
         * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
         * updateValueAndValidity} method.
         *
         * * `onlySelf`: When true, each change only affects this control, and not its parent. Default is
         * false.
         * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
         * `valueChanges`
         * observables emit events with the latest status and value when the control value is updated.
         * When false, no events are emitted.
         * * `emitModelToViewChange`: When true or not supplied  (the default), each change triggers an
         * `onChange` event to
         * update the view.
         * * `emitViewToModelChange`: When true or not supplied (the default), each change triggers an
         * `ngModelChange`
         * event to update the model.
         *
         */
        FormControl.prototype.setValue = function (value, options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            this.value = this._pendingValue = value;
            if (this._onChange.length && options.emitModelToViewChange !== false) {
                this._onChange.forEach(function (changeFn) { return changeFn(_this.value, options.emitViewToModelChange !== false); });
            }
            this.updateValueAndValidity(options);
        };
        /**
         * Patches the value of a control.
         *
         * This function is functionally the same as {@link FormControl#setValue setValue} at this level.
         * It exists for symmetry with {@link FormGroup#patchValue patchValue} on `FormGroups` and
         * `FormArrays`, where it does behave differently.
         *
         * @see `setValue` for options
         */
        FormControl.prototype.patchValue = function (value, options) {
            if (options === void 0) { options = {}; }
            this.setValue(value, options);
        };
        /**
         * Resets the form control, marking it `pristine` and `untouched`, and setting
         * the value to null.
         *
         * @param formState Resets the control with an initial value,
         * or an object that defines the initial value and disabled state.
         *
         * @param options Configuration options that determine how the control propagates changes
         * and emits events after the value changes.
         *
         * * `onlySelf`: When true, each change only affects this control, and not its parent. Default is
         * false.
         * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
         * `valueChanges`
         * observables emit events with the latest status and value when the control is reset.
         * When false, no events are emitted.
         *
         */
        FormControl.prototype.reset = function (formState, options) {
            if (formState === void 0) { formState = null; }
            if (options === void 0) { options = {}; }
            this._applyFormState(formState);
            this.markAsPristine(options);
            this.markAsUntouched(options);
            this.setValue(this.value, options);
            this._pendingChange = false;
        };
        /**
         * @internal
         */
        FormControl.prototype._updateValue = function () { };
        /**
         * @internal
         */
        FormControl.prototype._anyControls = function (condition) {
            return false;
        };
        /**
         * @internal
         */
        FormControl.prototype._allControlsDisabled = function () {
            return this.disabled;
        };
        /**
         * Register a listener for change events.
         *
         * @param fn The method that is called when the value changes
         */
        FormControl.prototype.registerOnChange = function (fn) {
            this._onChange.push(fn);
        };
        /**
         * Internal function to unregister a change events listener.
         * @internal
         */
        FormControl.prototype._unregisterOnChange = function (fn) {
            removeListItem(this._onChange, fn);
        };
        /**
         * Register a listener for disabled events.
         *
         * @param fn The method that is called when the disabled status changes.
         */
        FormControl.prototype.registerOnDisabledChange = function (fn) {
            this._onDisabledChange.push(fn);
        };
        /**
         * Internal function to unregister a disabled event listener.
         * @internal
         */
        FormControl.prototype._unregisterOnDisabledChange = function (fn) {
            removeListItem(this._onDisabledChange, fn);
        };
        /**
         * @internal
         */
        FormControl.prototype._forEachChild = function (cb) { };
        /** @internal */
        FormControl.prototype._syncPendingControls = function () {
            if (this.updateOn === 'submit') {
                if (this._pendingDirty)
                    this.markAsDirty();
                if (this._pendingTouched)
                    this.markAsTouched();
                if (this._pendingChange) {
                    this.setValue(this._pendingValue, { onlySelf: true, emitModelToViewChange: false });
                    return true;
                }
            }
            return false;
        };
        FormControl.prototype._applyFormState = function (formState) {
            if (this._isBoxedValue(formState)) {
                this.value = this._pendingValue = formState.value;
                formState.disabled ? this.disable({ onlySelf: true, emitEvent: false }) :
                    this.enable({ onlySelf: true, emitEvent: false });
            }
            else {
                this.value = this._pendingValue = formState;
            }
        };
        return FormControl;
    }(AbstractControl));
    /**
     * Tracks the value and validity state of a group of `FormControl` instances.
     *
     * A `FormGroup` aggregates the values of each child `FormControl` into one object,
     * with each control name as the key.  It calculates its status by reducing the status values
     * of its children. For example, if one of the controls in a group is invalid, the entire
     * group becomes invalid.
     *
     * `FormGroup` is one of the three fundamental building blocks used to define forms in Angular,
     * along with `FormControl` and `FormArray`.
     *
     * When instantiating a `FormGroup`, pass in a collection of child controls as the first
     * argument. The key for each child registers the name for the control.
     *
     * @usageNotes
     *
     * ### Create a form group with 2 controls
     *
     * ```
     * const form = new FormGroup({
     *   first: new FormControl('Nancy', Validators.minLength(2)),
     *   last: new FormControl('Drew'),
     * });
     *
     * console.log(form.value);   // {first: 'Nancy', last; 'Drew'}
     * console.log(form.status);  // 'VALID'
     * ```
     *
     * ### Create a form group with a group-level validator
     *
     * You include group-level validators as the second arg, or group-level async
     * validators as the third arg. These come in handy when you want to perform validation
     * that considers the value of more than one child control.
     *
     * ```
     * const form = new FormGroup({
     *   password: new FormControl('', Validators.minLength(2)),
     *   passwordConfirm: new FormControl('', Validators.minLength(2)),
     * }, passwordMatchValidator);
     *
     *
     * function passwordMatchValidator(g: FormGroup) {
     *    return g.get('password').value === g.get('passwordConfirm').value
     *       ? null : {'mismatch': true};
     * }
     * ```
     *
     * Like `FormControl` instances, you choose to pass in
     * validators and async validators as part of an options object.
     *
     * ```
     * const form = new FormGroup({
     *   password: new FormControl('')
     *   passwordConfirm: new FormControl('')
     * }, { validators: passwordMatchValidator, asyncValidators: otherValidator });
     * ```
     *
     * ### Set the updateOn property for all controls in a form group
     *
     * The options object is used to set a default value for each child
     * control's `updateOn` property. If you set `updateOn` to `'blur'` at the
     * group level, all child controls default to 'blur', unless the child
     * has explicitly specified a different `updateOn` value.
     *
     * ```ts
     * const c = new FormGroup({
     *   one: new FormControl()
     * }, { updateOn: 'blur' });
     * ```
     *
     * @publicApi
     */
    var FormGroup = /** @class */ (function (_super) {
        tslib_1.__extends(FormGroup, _super);
        /**
         * Creates a new `FormGroup` instance.
         *
         * @param controls A collection of child controls. The key for each child is the name
         * under which it is registered.
         *
         * @param validatorOrOpts A synchronous validator function, or an array of
         * such functions, or an `AbstractControlOptions` object that contains validation functions
         * and a validation trigger.
         *
         * @param asyncValidator A single async validator or array of async validator functions
         *
         */
        function FormGroup(controls, validatorOrOpts, asyncValidator) {
            var _this = _super.call(this, pickValidators(validatorOrOpts), pickAsyncValidators(asyncValidator, validatorOrOpts)) || this;
            _this.controls = controls;
            _this._initObservables();
            _this._setUpdateStrategy(validatorOrOpts);
            _this._setUpControls();
            _this.updateValueAndValidity({
                onlySelf: true,
                // If `asyncValidator` is present, it will trigger control status change from `PENDING` to
                // `VALID` or `INVALID`. The status should be broadcasted via the `statusChanges` observable,
                // so we set `emitEvent` to `true` to allow that during the control creation process.
                emitEvent: !!asyncValidator
            });
            return _this;
        }
        /**
         * Registers a control with the group's list of controls.
         *
         * This method does not update the value or validity of the control.
         * Use {@link FormGroup#addControl addControl} instead.
         *
         * @param name The control name to register in the collection
         * @param control Provides the control for the given name
         */
        FormGroup.prototype.registerControl = function (name, control) {
            if (this.controls[name])
                return this.controls[name];
            this.controls[name] = control;
            control.setParent(this);
            control._registerOnCollectionChange(this._onCollectionChange);
            return control;
        };
        /**
         * Add a control to this group.
         *
         * This method also updates the value and validity of the control.
         *
         * @param name The control name to add to the collection
         * @param control Provides the control for the given name
         */
        FormGroup.prototype.addControl = function (name, control) {
            this.registerControl(name, control);
            this.updateValueAndValidity();
            this._onCollectionChange();
        };
        /**
         * Remove a control from this group.
         *
         * @param name The control name to remove from the collection
         */
        FormGroup.prototype.removeControl = function (name) {
            if (this.controls[name])
                this.controls[name]._registerOnCollectionChange(function () { });
            delete (this.controls[name]);
            this.updateValueAndValidity();
            this._onCollectionChange();
        };
        /**
         * Replace an existing control.
         *
         * @param name The control name to replace in the collection
         * @param control Provides the control for the given name
         */
        FormGroup.prototype.setControl = function (name, control) {
            if (this.controls[name])
                this.controls[name]._registerOnCollectionChange(function () { });
            delete (this.controls[name]);
            if (control)
                this.registerControl(name, control);
            this.updateValueAndValidity();
            this._onCollectionChange();
        };
        /**
         * Check whether there is an enabled control with the given name in the group.
         *
         * Reports false for disabled controls. If you'd like to check for existence in the group
         * only, use {@link AbstractControl#get get} instead.
         *
         * @param controlName The control name to check for existence in the collection
         *
         * @returns false for disabled controls, true otherwise.
         */
        FormGroup.prototype.contains = function (controlName) {
            return this.controls.hasOwnProperty(controlName) && this.controls[controlName].enabled;
        };
        /**
         * Sets the value of the `FormGroup`. It accepts an object that matches
         * the structure of the group, with control names as keys.
         *
         * @usageNotes
         * ### Set the complete value for the form group
         *
         * ```
         * const form = new FormGroup({
         *   first: new FormControl(),
         *   last: new FormControl()
         * });
         *
         * console.log(form.value);   // {first: null, last: null}
         *
         * form.setValue({first: 'Nancy', last: 'Drew'});
         * console.log(form.value);   // {first: 'Nancy', last: 'Drew'}
         * ```
         *
         * @throws When strict checks fail, such as setting the value of a control
         * that doesn't exist or if you exclude a value of a control that does exist.
         *
         * @param value The new value for the control that matches the structure of the group.
         * @param options Configuration options that determine how the control propagates changes
         * and emits events after the value changes.
         * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
         * updateValueAndValidity} method.
         *
         * * `onlySelf`: When true, each change only affects this control, and not its parent. Default is
         * false.
         * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
         * `valueChanges`
         * observables emit events with the latest status and value when the control value is updated.
         * When false, no events are emitted.
         */
        FormGroup.prototype.setValue = function (value, options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            this._checkAllValuesPresent(value);
            Object.keys(value).forEach(function (name) {
                _this._throwIfControlMissing(name);
                _this.controls[name].setValue(value[name], { onlySelf: true, emitEvent: options.emitEvent });
            });
            this.updateValueAndValidity(options);
        };
        /**
         * Patches the value of the `FormGroup`. It accepts an object with control
         * names as keys, and does its best to match the values to the correct controls
         * in the group.
         *
         * It accepts both super-sets and sub-sets of the group without throwing an error.
         *
         * @usageNotes
         * ### Patch the value for a form group
         *
         * ```
         * const form = new FormGroup({
         *    first: new FormControl(),
         *    last: new FormControl()
         * });
         * console.log(form.value);   // {first: null, last: null}
         *
         * form.patchValue({first: 'Nancy'});
         * console.log(form.value);   // {first: 'Nancy', last: null}
         * ```
         *
         * @param value The object that matches the structure of the group.
         * @param options Configuration options that determine how the control propagates changes and
         * emits events after the value is patched.
         * * `onlySelf`: When true, each change only affects this control and not its parent. Default is
         * true.
         * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
         * `valueChanges`
         * observables emit events with the latest status and value when the control value is updated.
         * When false, no events are emitted.
         * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
         * updateValueAndValidity} method.
         */
        FormGroup.prototype.patchValue = function (value, options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            Object.keys(value).forEach(function (name) {
                if (_this.controls[name]) {
                    _this.controls[name].patchValue(value[name], { onlySelf: true, emitEvent: options.emitEvent });
                }
            });
            this.updateValueAndValidity(options);
        };
        /**
         * Resets the `FormGroup`, marks all descendants `pristine` and `untouched` and sets
         * the value of all descendants to null.
         *
         * You reset to a specific form state by passing in a map of states
         * that matches the structure of your form, with control names as keys. The state
         * is a standalone value or a form state object with both a value and a disabled
         * status.
         *
         * @param value Resets the control with an initial value,
         * or an object that defines the initial value and disabled state.
         *
         * @param options Configuration options that determine how the control propagates changes
         * and emits events when the group is reset.
         * * `onlySelf`: When true, each change only affects this control, and not its parent. Default is
         * false.
         * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
         * `valueChanges`
         * observables emit events with the latest status and value when the control is reset.
         * When false, no events are emitted.
         * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
         * updateValueAndValidity} method.
         *
         * @usageNotes
         *
         * ### Reset the form group values
         *
         * ```ts
         * const form = new FormGroup({
         *   first: new FormControl('first name'),
         *   last: new FormControl('last name')
         * });
         *
         * console.log(form.value);  // {first: 'first name', last: 'last name'}
         *
         * form.reset({ first: 'name', last: 'last name' });
         *
         * console.log(form.value);  // {first: 'name', last: 'last name'}
         * ```
         *
         * ### Reset the form group values and disabled status
         *
         * ```
         * const form = new FormGroup({
         *   first: new FormControl('first name'),
         *   last: new FormControl('last name')
         * });
         *
         * form.reset({
         *   first: {value: 'name', disabled: true},
         *   last: 'last'
         * });
         *
         * console.log(form.value);  // {last: 'last'}
         * console.log(form.get('first').status);  // 'DISABLED'
         * ```
         */
        FormGroup.prototype.reset = function (value, options) {
            if (value === void 0) { value = {}; }
            if (options === void 0) { options = {}; }
            this._forEachChild(function (control, name) {
                control.reset(value[name], { onlySelf: true, emitEvent: options.emitEvent });
            });
            this._updatePristine(options);
            this._updateTouched(options);
            this.updateValueAndValidity(options);
        };
        /**
         * The aggregate value of the `FormGroup`, including any disabled controls.
         *
         * Retrieves all values regardless of disabled status.
         * The `value` property is the best way to get the value of the group, because
         * it excludes disabled controls in the `FormGroup`.
         */
        FormGroup.prototype.getRawValue = function () {
            return this._reduceChildren({}, function (acc, control, name) {
                acc[name] = control instanceof FormControl ? control.value : control.getRawValue();
                return acc;
            });
        };
        /** @internal */
        FormGroup.prototype._syncPendingControls = function () {
            var subtreeUpdated = this._reduceChildren(false, function (updated, child) {
                return child._syncPendingControls() ? true : updated;
            });
            if (subtreeUpdated)
                this.updateValueAndValidity({ onlySelf: true });
            return subtreeUpdated;
        };
        /** @internal */
        FormGroup.prototype._throwIfControlMissing = function (name) {
            if (!Object.keys(this.controls).length) {
                throw new Error("\n        There are no form controls registered with this group yet. If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ");
            }
            if (!this.controls[name]) {
                throw new Error("Cannot find form control with name: " + name + ".");
            }
        };
        /** @internal */
        FormGroup.prototype._forEachChild = function (cb) {
            var _this = this;
            Object.keys(this.controls).forEach(function (k) { return cb(_this.controls[k], k); });
        };
        /** @internal */
        FormGroup.prototype._setUpControls = function () {
            var _this = this;
            this._forEachChild(function (control) {
                control.setParent(_this);
                control._registerOnCollectionChange(_this._onCollectionChange);
            });
        };
        /** @internal */
        FormGroup.prototype._updateValue = function () {
            this.value = this._reduceValue();
        };
        /** @internal */
        FormGroup.prototype._anyControls = function (condition) {
            var e_3, _d;
            try {
                for (var _e = tslib_1.__values(Object.keys(this.controls)), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var controlName = _f.value;
                    var control = this.controls[controlName];
                    if (this.contains(controlName) && condition(control)) {
                        return true;
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_d = _e.return)) _d.call(_e);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return false;
        };
        /** @internal */
        FormGroup.prototype._reduceValue = function () {
            var _this = this;
            return this._reduceChildren({}, function (acc, control, name) {
                if (control.enabled || _this.disabled) {
                    acc[name] = control.value;
                }
                return acc;
            });
        };
        /** @internal */
        FormGroup.prototype._reduceChildren = function (initValue, fn) {
            var res = initValue;
            this._forEachChild(function (control, name) {
                res = fn(res, control, name);
            });
            return res;
        };
        /** @internal */
        FormGroup.prototype._allControlsDisabled = function () {
            var e_4, _d;
            try {
                for (var _e = tslib_1.__values(Object.keys(this.controls)), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var controlName = _f.value;
                    if (this.controls[controlName].enabled) {
                        return false;
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_d = _e.return)) _d.call(_e);
                }
                finally { if (e_4) throw e_4.error; }
            }
            return Object.keys(this.controls).length > 0 || this.disabled;
        };
        /** @internal */
        FormGroup.prototype._checkAllValuesPresent = function (value) {
            this._forEachChild(function (control, name) {
                if (value[name] === undefined) {
                    throw new Error("Must supply a value for form control with name: '" + name + "'.");
                }
            });
        };
        return FormGroup;
    }(AbstractControl));
    /**
     * Tracks the value and validity state of an array of `FormControl`,
     * `FormGroup` or `FormArray` instances.
     *
     * A `FormArray` aggregates the values of each child `FormControl` into an array.
     * It calculates its status by reducing the status values of its children. For example, if one of
     * the controls in a `FormArray` is invalid, the entire array becomes invalid.
     *
     * `FormArray` is one of the three fundamental building blocks used to define forms in Angular,
     * along with `FormControl` and `FormGroup`.
     *
     * @usageNotes
     *
     * ### Create an array of form controls
     *
     * ```
     * const arr = new FormArray([
     *   new FormControl('Nancy', Validators.minLength(2)),
     *   new FormControl('Drew'),
     * ]);
     *
     * console.log(arr.value);   // ['Nancy', 'Drew']
     * console.log(arr.status);  // 'VALID'
     * ```
     *
     * ### Create a form array with array-level validators
     *
     * You include array-level validators and async validators. These come in handy
     * when you want to perform validation that considers the value of more than one child
     * control.
     *
     * The two types of validators are passed in separately as the second and third arg
     * respectively, or together as part of an options object.
     *
     * ```
     * const arr = new FormArray([
     *   new FormControl('Nancy'),
     *   new FormControl('Drew')
     * ], {validators: myValidator, asyncValidators: myAsyncValidator});
     * ```
     *
     * ### Set the updateOn property for all controls in a form array
     *
     * The options object is used to set a default value for each child
     * control's `updateOn` property. If you set `updateOn` to `'blur'` at the
     * array level, all child controls default to 'blur', unless the child
     * has explicitly specified a different `updateOn` value.
     *
     * ```ts
     * const arr = new FormArray([
     *    new FormControl()
     * ], {updateOn: 'blur'});
     * ```
     *
     * ### Adding or removing controls from a form array
     *
     * To change the controls in the array, use the `push`, `insert`, `removeAt` or `clear` methods
     * in `FormArray` itself. These methods ensure the controls are properly tracked in the
     * form's hierarchy. Do not modify the array of `AbstractControl`s used to instantiate
     * the `FormArray` directly, as that result in strange and unexpected behavior such
     * as broken change detection.
     *
     * @publicApi
     */
    var FormArray = /** @class */ (function (_super) {
        tslib_1.__extends(FormArray, _super);
        /**
         * Creates a new `FormArray` instance.
         *
         * @param controls An array of child controls. Each child control is given an index
         * where it is registered.
         *
         * @param validatorOrOpts A synchronous validator function, or an array of
         * such functions, or an `AbstractControlOptions` object that contains validation functions
         * and a validation trigger.
         *
         * @param asyncValidator A single async validator or array of async validator functions
         *
         */
        function FormArray(controls, validatorOrOpts, asyncValidator) {
            var _this = _super.call(this, pickValidators(validatorOrOpts), pickAsyncValidators(asyncValidator, validatorOrOpts)) || this;
            _this.controls = controls;
            _this._initObservables();
            _this._setUpdateStrategy(validatorOrOpts);
            _this._setUpControls();
            _this.updateValueAndValidity({
                onlySelf: true,
                // If `asyncValidator` is present, it will trigger control status change from `PENDING` to
                // `VALID` or `INVALID`.
                // The status should be broadcasted via the `statusChanges` observable, so we set `emitEvent`
                // to `true` to allow that during the control creation process.
                emitEvent: !!asyncValidator
            });
            return _this;
        }
        /**
         * Get the `AbstractControl` at the given `index` in the array.
         *
         * @param index Index in the array to retrieve the control
         */
        FormArray.prototype.at = function (index) {
            return this.controls[index];
        };
        /**
         * Insert a new `AbstractControl` at the end of the array.
         *
         * @param control Form control to be inserted
         */
        FormArray.prototype.push = function (control) {
            this.controls.push(control);
            this._registerControl(control);
            this.updateValueAndValidity();
            this._onCollectionChange();
        };
        /**
         * Insert a new `AbstractControl` at the given `index` in the array.
         *
         * @param index Index in the array to insert the control
         * @param control Form control to be inserted
         */
        FormArray.prototype.insert = function (index, control) {
            this.controls.splice(index, 0, control);
            this._registerControl(control);
            this.updateValueAndValidity();
        };
        /**
         * Remove the control at the given `index` in the array.
         *
         * @param index Index in the array to remove the control
         */
        FormArray.prototype.removeAt = function (index) {
            if (this.controls[index])
                this.controls[index]._registerOnCollectionChange(function () { });
            this.controls.splice(index, 1);
            this.updateValueAndValidity();
        };
        /**
         * Replace an existing control.
         *
         * @param index Index in the array to replace the control
         * @param control The `AbstractControl` control to replace the existing control
         */
        FormArray.prototype.setControl = function (index, control) {
            if (this.controls[index])
                this.controls[index]._registerOnCollectionChange(function () { });
            this.controls.splice(index, 1);
            if (control) {
                this.controls.splice(index, 0, control);
                this._registerControl(control);
            }
            this.updateValueAndValidity();
            this._onCollectionChange();
        };
        Object.defineProperty(FormArray.prototype, "length", {
            /**
             * Length of the control array.
             */
            get: function () {
                return this.controls.length;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Sets the value of the `FormArray`. It accepts an array that matches
         * the structure of the control.
         *
         * This method performs strict checks, and throws an error if you try
         * to set the value of a control that doesn't exist or if you exclude the
         * value of a control.
         *
         * @usageNotes
         * ### Set the values for the controls in the form array
         *
         * ```
         * const arr = new FormArray([
         *   new FormControl(),
         *   new FormControl()
         * ]);
         * console.log(arr.value);   // [null, null]
         *
         * arr.setValue(['Nancy', 'Drew']);
         * console.log(arr.value);   // ['Nancy', 'Drew']
         * ```
         *
         * @param value Array of values for the controls
         * @param options Configure options that determine how the control propagates changes and
         * emits events after the value changes
         *
         * * `onlySelf`: When true, each change only affects this control, and not its parent. Default
         * is false.
         * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
         * `valueChanges`
         * observables emit events with the latest status and value when the control value is updated.
         * When false, no events are emitted.
         * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
         * updateValueAndValidity} method.
         */
        FormArray.prototype.setValue = function (value, options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            this._checkAllValuesPresent(value);
            value.forEach(function (newValue, index) {
                _this._throwIfControlMissing(index);
                _this.at(index).setValue(newValue, { onlySelf: true, emitEvent: options.emitEvent });
            });
            this.updateValueAndValidity(options);
        };
        /**
         * Patches the value of the `FormArray`. It accepts an array that matches the
         * structure of the control, and does its best to match the values to the correct
         * controls in the group.
         *
         * It accepts both super-sets and sub-sets of the array without throwing an error.
         *
         * @usageNotes
         * ### Patch the values for controls in a form array
         *
         * ```
         * const arr = new FormArray([
         *    new FormControl(),
         *    new FormControl()
         * ]);
         * console.log(arr.value);   // [null, null]
         *
         * arr.patchValue(['Nancy']);
         * console.log(arr.value);   // ['Nancy', null]
         * ```
         *
         * @param value Array of latest values for the controls
         * @param options Configure options that determine how the control propagates changes and
         * emits events after the value changes
         *
         * * `onlySelf`: When true, each change only affects this control, and not its parent. Default
         * is false.
         * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
         * `valueChanges`
         * observables emit events with the latest status and value when the control value is updated.
         * When false, no events are emitted.
         * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
         * updateValueAndValidity} method.
         */
        FormArray.prototype.patchValue = function (value, options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            value.forEach(function (newValue, index) {
                if (_this.at(index)) {
                    _this.at(index).patchValue(newValue, { onlySelf: true, emitEvent: options.emitEvent });
                }
            });
            this.updateValueAndValidity(options);
        };
        /**
         * Resets the `FormArray` and all descendants are marked `pristine` and `untouched`, and the
         * value of all descendants to null or null maps.
         *
         * You reset to a specific form state by passing in an array of states
         * that matches the structure of the control. The state is a standalone value
         * or a form state object with both a value and a disabled status.
         *
         * @usageNotes
         * ### Reset the values in a form array
         *
         * ```ts
         * const arr = new FormArray([
         *    new FormControl(),
         *    new FormControl()
         * ]);
         * arr.reset(['name', 'last name']);
         *
         * console.log(this.arr.value);  // ['name', 'last name']
         * ```
         *
         * ### Reset the values in a form array and the disabled status for the first control
         *
         * ```
         * this.arr.reset([
         *   {value: 'name', disabled: true},
         *   'last'
         * ]);
         *
         * console.log(this.arr.value);  // ['name', 'last name']
         * console.log(this.arr.get(0).status);  // 'DISABLED'
         * ```
         *
         * @param value Array of values for the controls
         * @param options Configure options that determine how the control propagates changes and
         * emits events after the value changes
         *
         * * `onlySelf`: When true, each change only affects this control, and not its parent. Default
         * is false.
         * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
         * `valueChanges`
         * observables emit events with the latest status and value when the control is reset.
         * When false, no events are emitted.
         * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
         * updateValueAndValidity} method.
         */
        FormArray.prototype.reset = function (value, options) {
            if (value === void 0) { value = []; }
            if (options === void 0) { options = {}; }
            this._forEachChild(function (control, index) {
                control.reset(value[index], { onlySelf: true, emitEvent: options.emitEvent });
            });
            this._updatePristine(options);
            this._updateTouched(options);
            this.updateValueAndValidity(options);
        };
        /**
         * The aggregate value of the array, including any disabled controls.
         *
         * Reports all values regardless of disabled status.
         * For enabled controls only, the `value` property is the best way to get the value of the array.
         */
        FormArray.prototype.getRawValue = function () {
            return this.controls.map(function (control) {
                return control instanceof FormControl ? control.value : control.getRawValue();
            });
        };
        /**
         * Remove all controls in the `FormArray`.
         *
         * @usageNotes
         * ### Remove all elements from a FormArray
         *
         * ```ts
         * const arr = new FormArray([
         *    new FormControl(),
         *    new FormControl()
         * ]);
         * console.log(arr.length);  // 2
         *
         * arr.clear();
         * console.log(arr.length);  // 0
         * ```
         *
         * It's a simpler and more efficient alternative to removing all elements one by one:
         *
         * ```ts
         * const arr = new FormArray([
         *    new FormControl(),
         *    new FormControl()
         * ]);
         *
         * while (arr.length) {
         *    arr.removeAt(0);
         * }
         * ```
         */
        FormArray.prototype.clear = function () {
            if (this.controls.length < 1)
                return;
            this._forEachChild(function (control) { return control._registerOnCollectionChange(function () { }); });
            this.controls.splice(0);
            this.updateValueAndValidity();
        };
        /** @internal */
        FormArray.prototype._syncPendingControls = function () {
            var subtreeUpdated = this.controls.reduce(function (updated, child) {
                return child._syncPendingControls() ? true : updated;
            }, false);
            if (subtreeUpdated)
                this.updateValueAndValidity({ onlySelf: true });
            return subtreeUpdated;
        };
        /** @internal */
        FormArray.prototype._throwIfControlMissing = function (index) {
            if (!this.controls.length) {
                throw new Error("\n        There are no form controls registered with this array yet. If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ");
            }
            if (!this.at(index)) {
                throw new Error("Cannot find form control at index " + index);
            }
        };
        /** @internal */
        FormArray.prototype._forEachChild = function (cb) {
            this.controls.forEach(function (control, index) {
                cb(control, index);
            });
        };
        /** @internal */
        FormArray.prototype._updateValue = function () {
            var _this = this;
            this.value =
                this.controls.filter(function (control) { return control.enabled || _this.disabled; })
                    .map(function (control) { return control.value; });
        };
        /** @internal */
        FormArray.prototype._anyControls = function (condition) {
            return this.controls.some(function (control) { return control.enabled && condition(control); });
        };
        /** @internal */
        FormArray.prototype._setUpControls = function () {
            var _this = this;
            this._forEachChild(function (control) { return _this._registerControl(control); });
        };
        /** @internal */
        FormArray.prototype._checkAllValuesPresent = function (value) {
            this._forEachChild(function (control, i) {
                if (value[i] === undefined) {
                    throw new Error("Must supply a value for form control at index: " + i + ".");
                }
            });
        };
        /** @internal */
        FormArray.prototype._allControlsDisabled = function () {
            var e_5, _d;
            try {
                for (var _e = tslib_1.__values(this.controls), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var control = _f.value;
                    if (control.enabled)
                        return false;
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_d = _e.return)) _d.call(_e);
                }
                finally { if (e_5) throw e_5.error; }
            }
            return this.controls.length > 0 || this.disabled;
        };
        FormArray.prototype._registerControl = function (control) {
            control.setParent(this);
            control._registerOnCollectionChange(this._onCollectionChange);
        };
        return FormArray;
    }(AbstractControl));
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var formDirectiveProvider = {
        provide: ControlContainer,
        useExisting: i0.forwardRef(function () { return NgForm; })
    };
    var ɵ0$5 = function () { return Promise.resolve(null); };
    var resolvedPromise = (ɵ0$5)();
    /**
     * @description
     * Creates a top-level `FormGroup` instance and binds it to a form
     * to track aggregate form value and validation status.
     *
     * As soon as you import the `FormsModule`, this directive becomes active by default on
     * all `<form>` tags.  You don't need to add a special selector.
     *
     * You optionally export the directive into a local template variable using `ngForm` as the key
     * (ex: `#myForm="ngForm"`). This is optional, but useful.  Many properties from the underlying
     * `FormGroup` instance are duplicated on the directive itself, so a reference to it
     * gives you access to the aggregate value and validity status of the form, as well as
     * user interaction properties like `dirty` and `touched`.
     *
     * To register child controls with the form, use `NgModel` with a `name`
     * attribute. You may use `NgModelGroup` to create sub-groups within the form.
     *
     * If necessary, listen to the directive's `ngSubmit` event to be notified when the user has
     * triggered a form submission. The `ngSubmit` event emits the original form
     * submission event.
     *
     * In template driven forms, all `<form>` tags are automatically tagged as `NgForm`.
     * To import the `FormsModule` but skip its usage in some forms,
     * for example, to use native HTML5 validation, add the `ngNoForm` and the `<form>`
     * tags won't create an `NgForm` directive. In reactive forms, using `ngNoForm` is
     * unnecessary because the `<form>` tags are inert. In that case, you would
     * refrain from using the `formGroup` directive.
     *
     * @usageNotes
     *
     * ### Listening for form submission
     *
     * The following example shows how to capture the form values from the "ngSubmit" event.
     *
     * {@example forms/ts/simpleForm/simple_form_example.ts region='Component'}
     *
     * ### Setting the update options
     *
     * The following example shows you how to change the "updateOn" option from its default using
     * ngFormOptions.
     *
     * ```html
     * <form [ngFormOptions]="{updateOn: 'blur'}">
     *    <input name="one" ngModel>  <!-- this ngModel will update on blur -->
     * </form>
     * ```
     *
     * ### Native DOM validation UI
     *
     * In order to prevent the native DOM form validation UI from interfering with Angular's form
     * validation, Angular automatically adds the `novalidate` attribute on any `<form>` whenever
     * `FormModule` or `ReactiveFormModule` are imported into the application.
     * If you want to explicitly enable native DOM validation UI with Angular forms, you can add the
     * `ngNativeValidate` attribute to the `<form>` element:
     *
     * ```html
     * <form ngNativeValidate>
     *   ...
     * </form>
     * ```
     *
     * @ngModule FormsModule
     * @publicApi
     */
    var NgForm = /** @class */ (function (_super) {
        tslib_1.__extends(NgForm, _super);
        function NgForm(validators, asyncValidators) {
            var _this = _super.call(this) || this;
            /**
             * @description
             * Returns whether the form submission has been triggered.
             */
            _this.submitted = false;
            _this._directives = [];
            /**
             * @description
             * Event emitter for the "ngSubmit" event
             */
            _this.ngSubmit = new i0.EventEmitter();
            _this.form =
                new FormGroup({}, composeValidators(validators), composeAsyncValidators(asyncValidators));
            return _this;
        }
        /** @nodoc */
        NgForm.prototype.ngAfterViewInit = function () {
            this._setUpdateStrategy();
        };
        Object.defineProperty(NgForm.prototype, "formDirective", {
            /**
             * @description
             * The directive instance.
             */
            get: function () {
                return this;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgForm.prototype, "control", {
            /**
             * @description
             * The internal `FormGroup` instance.
             */
            get: function () {
                return this.form;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgForm.prototype, "path", {
            /**
             * @description
             * Returns an array representing the path to this group. Because this directive
             * always lives at the top level of a form, it is always an empty array.
             */
            get: function () {
                return [];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgForm.prototype, "controls", {
            /**
             * @description
             * Returns a map of the controls in this group.
             */
            get: function () {
                return this.form.controls;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @description
         * Method that sets up the control directive in this group, re-calculates its value
         * and validity, and adds the instance to the internal list of directives.
         *
         * @param dir The `NgModel` directive instance.
         */
        NgForm.prototype.addControl = function (dir) {
            var _this = this;
            resolvedPromise.then(function () {
                var container = _this._findContainer(dir.path);
                dir.control =
                    container.registerControl(dir.name, dir.control);
                setUpControl(dir.control, dir);
                dir.control.updateValueAndValidity({ emitEvent: false });
                _this._directives.push(dir);
            });
        };
        /**
         * @description
         * Retrieves the `FormControl` instance from the provided `NgModel` directive.
         *
         * @param dir The `NgModel` directive instance.
         */
        NgForm.prototype.getControl = function (dir) {
            return this.form.get(dir.path);
        };
        /**
         * @description
         * Removes the `NgModel` instance from the internal list of directives
         *
         * @param dir The `NgModel` directive instance.
         */
        NgForm.prototype.removeControl = function (dir) {
            var _this = this;
            resolvedPromise.then(function () {
                var container = _this._findContainer(dir.path);
                if (container) {
                    container.removeControl(dir.name);
                }
                removeListItem(_this._directives, dir);
            });
        };
        /**
         * @description
         * Adds a new `NgModelGroup` directive instance to the form.
         *
         * @param dir The `NgModelGroup` directive instance.
         */
        NgForm.prototype.addFormGroup = function (dir) {
            var _this = this;
            resolvedPromise.then(function () {
                var container = _this._findContainer(dir.path);
                var group = new FormGroup({});
                setUpFormContainer(group, dir);
                container.registerControl(dir.name, group);
                group.updateValueAndValidity({ emitEvent: false });
            });
        };
        /**
         * @description
         * Removes the `NgModelGroup` directive instance from the form.
         *
         * @param dir The `NgModelGroup` directive instance.
         */
        NgForm.prototype.removeFormGroup = function (dir) {
            var _this = this;
            resolvedPromise.then(function () {
                var container = _this._findContainer(dir.path);
                if (container) {
                    container.removeControl(dir.name);
                }
            });
        };
        /**
         * @description
         * Retrieves the `FormGroup` for a provided `NgModelGroup` directive instance
         *
         * @param dir The `NgModelGroup` directive instance.
         */
        NgForm.prototype.getFormGroup = function (dir) {
            return this.form.get(dir.path);
        };
        /**
         * Sets the new value for the provided `NgControl` directive.
         *
         * @param dir The `NgControl` directive instance.
         * @param value The new value for the directive's control.
         */
        NgForm.prototype.updateModel = function (dir, value) {
            var _this = this;
            resolvedPromise.then(function () {
                var ctrl = _this.form.get(dir.path);
                ctrl.setValue(value);
            });
        };
        /**
         * @description
         * Sets the value for this `FormGroup`.
         *
         * @param value The new value
         */
        NgForm.prototype.setValue = function (value) {
            this.control.setValue(value);
        };
        /**
         * @description
         * Method called when the "submit" event is triggered on the form.
         * Triggers the `ngSubmit` emitter to emit the "submit" event as its payload.
         *
         * @param $event The "submit" event object
         */
        NgForm.prototype.onSubmit = function ($event) {
            this.submitted = true;
            syncPendingControls(this.form, this._directives);
            this.ngSubmit.emit($event);
            return false;
        };
        /**
         * @description
         * Method called when the "reset" event is triggered on the form.
         */
        NgForm.prototype.onReset = function () {
            this.resetForm();
        };
        /**
         * @description
         * Resets the form to an initial value and resets its submitted status.
         *
         * @param value The new value for the form.
         */
        NgForm.prototype.resetForm = function (value) {
            if (value === void 0) { value = undefined; }
            this.form.reset(value);
            this.submitted = false;
        };
        NgForm.prototype._setUpdateStrategy = function () {
            if (this.options && this.options.updateOn != null) {
                this.form._updateOn = this.options.updateOn;
            }
        };
        /** @internal */
        NgForm.prototype._findContainer = function (path) {
            path.pop();
            return path.length ? this.form.get(path) : this.form;
        };
        return NgForm;
    }(ControlContainer));
    NgForm.decorators = [
        { type: i0.Directive, args: [{
                    selector: 'form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]',
                    providers: [formDirectiveProvider],
                    host: { '(submit)': 'onSubmit($event)', '(reset)': 'onReset()' },
                    outputs: ['ngSubmit'],
                    exportAs: 'ngForm'
                },] }
    ];
    NgForm.ctorParameters = function () { return [
        { type: Array, decorators: [{ type: i0.Optional }, { type: i0.Self }, { type: i0.Inject, args: [NG_VALIDATORS,] }] },
        { type: Array, decorators: [{ type: i0.Optional }, { type: i0.Self }, { type: i0.Inject, args: [NG_ASYNC_VALIDATORS,] }] }
    ]; };
    NgForm.propDecorators = {
        options: [{ type: i0.Input, args: ['ngFormOptions',] }]
    };
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * @description
     * A base class for code shared between the `NgModelGroup` and `FormGroupName` directives.
     *
     * @publicApi
     */
    var AbstractFormGroupDirective = /** @class */ (function (_super) {
        tslib_1.__extends(AbstractFormGroupDirective, _super);
        function AbstractFormGroupDirective() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /** @nodoc */
        AbstractFormGroupDirective.prototype.ngOnInit = function () {
            this._checkParentType();
            // Register the group with its parent group.
            this.formDirective.addFormGroup(this);
        };
        /** @nodoc */
        AbstractFormGroupDirective.prototype.ngOnDestroy = function () {
            if (this.formDirective) {
                // Remove the group from its parent group.
                this.formDirective.removeFormGroup(this);
            }
        };
        Object.defineProperty(AbstractFormGroupDirective.prototype, "control", {
            /**
             * @description
             * The `FormGroup` bound to this directive.
             */
            get: function () {
                return this.formDirective.getFormGroup(this);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AbstractFormGroupDirective.prototype, "path", {
            /**
             * @description
             * The path to this group from the top-level directive.
             */
            get: function () {
                return controlPath(this.name == null ? this.name : this.name.toString(), this._parent);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AbstractFormGroupDirective.prototype, "formDirective", {
            /**
             * @description
             * The top-level directive for this group if present, otherwise null.
             */
            get: function () {
                return this._parent ? this._parent.formDirective : null;
            },
            enumerable: false,
            configurable: true
        });
        /** @internal */
        AbstractFormGroupDirective.prototype._checkParentType = function () { };
        return AbstractFormGroupDirective;
    }(ControlContainer));
    AbstractFormGroupDirective.decorators = [
        { type: i0.Directive }
    ];
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var TemplateDrivenErrors = /** @class */ (function () {
        function TemplateDrivenErrors() {
        }
        TemplateDrivenErrors.modelParentException = function () {
            throw new Error("\n      ngModel cannot be used to register form controls with a parent formGroup directive.  Try using\n      formGroup's partner directive \"formControlName\" instead.  Example:\n\n      " + FormErrorExamples.formControlName + "\n\n      Or, if you'd like to avoid registering this form control, indicate that it's standalone in ngModelOptions:\n\n      Example:\n\n      " + FormErrorExamples.ngModelWithFormGroup);
        };
        TemplateDrivenErrors.formGroupNameException = function () {
            throw new Error("\n      ngModel cannot be used to register form controls with a parent formGroupName or formArrayName directive.\n\n      Option 1: Use formControlName instead of ngModel (reactive strategy):\n\n      " + FormErrorExamples.formGroupName + "\n\n      Option 2:  Update ngModel's parent be ngModelGroup (template-driven strategy):\n\n      " + FormErrorExamples.ngModelGroup);
        };
        TemplateDrivenErrors.missingNameException = function () {
            throw new Error("If ngModel is used within a form tag, either the name attribute must be set or the form\n      control must be defined as 'standalone' in ngModelOptions.\n\n      Example 1: <input [(ngModel)]=\"person.firstName\" name=\"first\">\n      Example 2: <input [(ngModel)]=\"person.firstName\" [ngModelOptions]=\"{standalone: true}\">");
        };
        TemplateDrivenErrors.modelGroupParentException = function () {
            throw new Error("\n      ngModelGroup cannot be used with a parent formGroup directive.\n\n      Option 1: Use formGroupName instead of ngModelGroup (reactive strategy):\n\n      " + FormErrorExamples.formGroupName + "\n\n      Option 2:  Use a regular form tag instead of the formGroup directive (template-driven strategy):\n\n      " + FormErrorExamples.ngModelGroup);
        };
        return TemplateDrivenErrors;
    }());
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var modelGroupProvider = {
        provide: ControlContainer,
        useExisting: i0.forwardRef(function () { return NgModelGroup; })
    };
    /**
     * @description
     * Creates and binds a `FormGroup` instance to a DOM element.
     *
     * This directive can only be used as a child of `NgForm` (within `<form>` tags).
     *
     * Use this directive to validate a sub-group of your form separately from the
     * rest of your form, or if some values in your domain model make more sense
     * to consume together in a nested object.
     *
     * Provide a name for the sub-group and it will become the key
     * for the sub-group in the form's full value. If you need direct access, export the directive into
     * a local template variable using `ngModelGroup` (ex: `#myGroup="ngModelGroup"`).
     *
     * @usageNotes
     *
     * ### Consuming controls in a grouping
     *
     * The following example shows you how to combine controls together in a sub-group
     * of the form.
     *
     * {@example forms/ts/ngModelGroup/ng_model_group_example.ts region='Component'}
     *
     * @ngModule FormsModule
     * @publicApi
     */
    var NgModelGroup = /** @class */ (function (_super) {
        tslib_1.__extends(NgModelGroup, _super);
        function NgModelGroup(parent, validators, asyncValidators) {
            var _this = _super.call(this) || this;
            _this._parent = parent;
            _this._setValidators(validators);
            _this._setAsyncValidators(asyncValidators);
            return _this;
        }
        /** @internal */
        NgModelGroup.prototype._checkParentType = function () {
            if (!(this._parent instanceof NgModelGroup) && !(this._parent instanceof NgForm) &&
                (typeof ngDevMode === 'undefined' || ngDevMode)) {
                TemplateDrivenErrors.modelGroupParentException();
            }
        };
        return NgModelGroup;
    }(AbstractFormGroupDirective));
    NgModelGroup.decorators = [
        { type: i0.Directive, args: [{ selector: '[ngModelGroup]', providers: [modelGroupProvider], exportAs: 'ngModelGroup' },] }
    ];
    NgModelGroup.ctorParameters = function () { return [
        { type: ControlContainer, decorators: [{ type: i0.Host }, { type: i0.SkipSelf }] },
        { type: Array, decorators: [{ type: i0.Optional }, { type: i0.Self }, { type: i0.Inject, args: [NG_VALIDATORS,] }] },
        { type: Array, decorators: [{ type: i0.Optional }, { type: i0.Self }, { type: i0.Inject, args: [NG_ASYNC_VALIDATORS,] }] }
    ]; };
    NgModelGroup.propDecorators = {
        name: [{ type: i0.Input, args: ['ngModelGroup',] }]
    };
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var formControlBinding = {
        provide: NgControl,
        useExisting: i0.forwardRef(function () { return NgModel; })
    };
    var ɵ0$1$1 = function () { return Promise.resolve(null); };
    /**
     * `ngModel` forces an additional change detection run when its inputs change:
     * E.g.:
     * ```
     * <div>{{myModel.valid}}</div>
     * <input [(ngModel)]="myValue" #myModel="ngModel">
     * ```
     * I.e. `ngModel` can export itself on the element and then be used in the template.
     * Normally, this would result in expressions before the `input` that use the exported directive
     * to have an old value as they have been
     * dirty checked before. As this is a very common case for `ngModel`, we added this second change
     * detection run.
     *
     * Notes:
     * - this is just one extra run no matter how many `ngModel`s have been changed.
     * - this is a general problem when using `exportAs` for directives!
     */
    var resolvedPromise$1 = (ɵ0$1$1)();
    /**
     * @description
     * Creates a `FormControl` instance from a domain model and binds it
     * to a form control element.
     *
     * The `FormControl` instance tracks the value, user interaction, and
     * validation status of the control and keeps the view synced with the model. If used
     * within a parent form, the directive also registers itself with the form as a child
     * control.
     *
     * This directive is used by itself or as part of a larger form. Use the
     * `ngModel` selector to activate it.
     *
     * It accepts a domain model as an optional `Input`. If you have a one-way binding
     * to `ngModel` with `[]` syntax, changing the domain model's value in the component
     * class sets the value in the view. If you have a two-way binding with `[()]` syntax
     * (also known as 'banana-in-a-box syntax'), the value in the UI always syncs back to
     * the domain model in your class.
     *
     * To inspect the properties of the associated `FormControl` (like the validity state),
     * export the directive into a local template variable using `ngModel` as the key (ex:
     * `#myVar="ngModel"`). You can then access the control using the directive's `control` property.
     * However, the most commonly used properties (like `valid` and `dirty`) also exist on the control
     * for direct access. See a full list of properties directly available in
     * `AbstractControlDirective`.
     *
     * @see `RadioControlValueAccessor`
     * @see `SelectControlValueAccessor`
     *
     * @usageNotes
     *
     * ### Using ngModel on a standalone control
     *
     * The following examples show a simple standalone control using `ngModel`:
     *
     * {@example forms/ts/simpleNgModel/simple_ng_model_example.ts region='Component'}
     *
     * When using the `ngModel` within `<form>` tags, you'll also need to supply a `name` attribute
     * so that the control can be registered with the parent form under that name.
     *
     * In the context of a parent form, it's often unnecessary to include one-way or two-way binding,
     * as the parent form syncs the value for you. You access its properties by exporting it into a
     * local template variable using `ngForm` such as (`#f="ngForm"`). Use the variable where
     * needed on form submission.
     *
     * If you do need to populate initial values into your form, using a one-way binding for
     * `ngModel` tends to be sufficient as long as you use the exported form's value rather
     * than the domain model's value on submit.
     *
     * ### Using ngModel within a form
     *
     * The following example shows controls using `ngModel` within a form:
     *
     * {@example forms/ts/simpleForm/simple_form_example.ts region='Component'}
     *
     * ### Using a standalone ngModel within a group
     *
     * The following example shows you how to use a standalone ngModel control
     * within a form. This controls the display of the form, but doesn't contain form data.
     *
     * ```html
     * <form>
     *   <input name="login" ngModel placeholder="Login">
     *   <input type="checkbox" ngModel [ngModelOptions]="{standalone: true}"> Show more options?
     * </form>
     * <!-- form value: {login: ''} -->
     * ```
     *
     * ### Setting the ngModel `name` attribute through options
     *
     * The following example shows you an alternate way to set the name attribute. Here,
     * an attribute identified as name is used within a custom form control component. To still be able
     * to specify the NgModel's name, you must specify it using the `ngModelOptions` input instead.
     *
     * ```html
     * <form>
     *   <my-custom-form-control name="Nancy" ngModel [ngModelOptions]="{name: 'user'}">
     *   </my-custom-form-control>
     * </form>
     * <!-- form value: {user: ''} -->
     * ```
     *
     * @ngModule FormsModule
     * @publicApi
     */
    var NgModel = /** @class */ (function (_super) {
        tslib_1.__extends(NgModel, _super);
        function NgModel(parent, validators, asyncValidators, valueAccessors) {
            var _this = _super.call(this) || this;
            _this.control = new FormControl();
            /** @internal */
            _this._registered = false;
            /**
             * @description
             * Event emitter for producing the `ngModelChange` event after
             * the view model updates.
             */
            _this.update = new i0.EventEmitter();
            _this._parent = parent;
            _this._setValidators(validators);
            _this._setAsyncValidators(asyncValidators);
            _this.valueAccessor = selectValueAccessor(_this, valueAccessors);
            return _this;
        }
        /** @nodoc */
        NgModel.prototype.ngOnChanges = function (changes) {
            this._checkForErrors();
            if (!this._registered)
                this._setUpControl();
            if ('isDisabled' in changes) {
                this._updateDisabled(changes);
            }
            if (isPropertyUpdated(changes, this.viewModel)) {
                this._updateValue(this.model);
                this.viewModel = this.model;
            }
        };
        /** @nodoc */
        NgModel.prototype.ngOnDestroy = function () {
            this.formDirective && this.formDirective.removeControl(this);
        };
        Object.defineProperty(NgModel.prototype, "path", {
            /**
             * @description
             * Returns an array that represents the path from the top-level form to this control.
             * Each index is the string name of the control on that level.
             */
            get: function () {
                return this._parent ? controlPath(this.name, this._parent) : [this.name];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgModel.prototype, "formDirective", {
            /**
             * @description
             * The top-level directive for this control if present, otherwise null.
             */
            get: function () {
                return this._parent ? this._parent.formDirective : null;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @description
         * Sets the new value for the view model and emits an `ngModelChange` event.
         *
         * @param newValue The new value emitted by `ngModelChange`.
         */
        NgModel.prototype.viewToModelUpdate = function (newValue) {
            this.viewModel = newValue;
            this.update.emit(newValue);
        };
        NgModel.prototype._setUpControl = function () {
            this._setUpdateStrategy();
            this._isStandalone() ? this._setUpStandalone() : this.formDirective.addControl(this);
            this._registered = true;
        };
        NgModel.prototype._setUpdateStrategy = function () {
            if (this.options && this.options.updateOn != null) {
                this.control._updateOn = this.options.updateOn;
            }
        };
        NgModel.prototype._isStandalone = function () {
            return !this._parent || !!(this.options && this.options.standalone);
        };
        NgModel.prototype._setUpStandalone = function () {
            setUpControl(this.control, this);
            this.control.updateValueAndValidity({ emitEvent: false });
        };
        NgModel.prototype._checkForErrors = function () {
            if (!this._isStandalone()) {
                this._checkParentType();
            }
            this._checkName();
        };
        NgModel.prototype._checkParentType = function () {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                if (!(this._parent instanceof NgModelGroup) &&
                    this._parent instanceof AbstractFormGroupDirective) {
                    TemplateDrivenErrors.formGroupNameException();
                }
                else if (!(this._parent instanceof NgModelGroup) && !(this._parent instanceof NgForm)) {
                    TemplateDrivenErrors.modelParentException();
                }
            }
        };
        NgModel.prototype._checkName = function () {
            if (this.options && this.options.name)
                this.name = this.options.name;
            if (!this._isStandalone() && !this.name && (typeof ngDevMode === 'undefined' || ngDevMode)) {
                TemplateDrivenErrors.missingNameException();
            }
        };
        NgModel.prototype._updateValue = function (value) {
            var _this = this;
            resolvedPromise$1.then(function () {
                _this.control.setValue(value, { emitViewToModelChange: false });
            });
        };
        NgModel.prototype._updateDisabled = function (changes) {
            var _this = this;
            var disabledValue = changes['isDisabled'].currentValue;
            var isDisabled = disabledValue === '' || (disabledValue && disabledValue !== 'false');
            resolvedPromise$1.then(function () {
                if (isDisabled && !_this.control.disabled) {
                    _this.control.disable();
                }
                else if (!isDisabled && _this.control.disabled) {
                    _this.control.enable();
                }
            });
        };
        return NgModel;
    }(NgControl));
    NgModel.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[ngModel]:not([formControlName]):not([formControl])',
                    providers: [formControlBinding],
                    exportAs: 'ngModel'
                },] }
    ];
    NgModel.ctorParameters = function () { return [
        { type: ControlContainer, decorators: [{ type: i0.Optional }, { type: i0.Host }] },
        { type: Array, decorators: [{ type: i0.Optional }, { type: i0.Self }, { type: i0.Inject, args: [NG_VALIDATORS,] }] },
        { type: Array, decorators: [{ type: i0.Optional }, { type: i0.Self }, { type: i0.Inject, args: [NG_ASYNC_VALIDATORS,] }] },
        { type: Array, decorators: [{ type: i0.Optional }, { type: i0.Self }, { type: i0.Inject, args: [NG_VALUE_ACCESSOR,] }] }
    ]; };
    NgModel.propDecorators = {
        name: [{ type: i0.Input }],
        isDisabled: [{ type: i0.Input, args: ['disabled',] }],
        model: [{ type: i0.Input, args: ['ngModel',] }],
        options: [{ type: i0.Input, args: ['ngModelOptions',] }],
        update: [{ type: i0.Output, args: ['ngModelChange',] }]
    };
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * @description
     *
     * Adds `novalidate` attribute to all forms by default.
     *
     * `novalidate` is used to disable browser's native form validation.
     *
     * If you want to use native validation with Angular forms, just add `ngNativeValidate` attribute:
     *
     * ```
     * <form ngNativeValidate></form>
     * ```
     *
     * @publicApi
     * @ngModule ReactiveFormsModule
     * @ngModule FormsModule
     */
    var ɵNgNoValidate = /** @class */ (function () {
        function ɵNgNoValidate() {
        }
        return ɵNgNoValidate;
    }());
    ɵNgNoValidate.decorators = [
        { type: i0.Directive, args: [{
                    selector: 'form:not([ngNoForm]):not([ngNativeValidate])',
                    host: { 'novalidate': '' },
                },] }
    ];
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Token to provide to turn off the ngModel warning on formControl and formControlName.
     */
    var NG_MODEL_WITH_FORM_CONTROL_WARNING = new i0.InjectionToken('NgModelWithFormControlWarning');
    var formControlBinding$1 = {
        provide: NgControl,
        useExisting: i0.forwardRef(function () { return FormControlDirective; })
    };
    /**
     * @description
     * Synchronizes a standalone `FormControl` instance to a form control element.
     *
     * Note that support for using the `ngModel` input property and `ngModelChange` event with reactive
     * form directives was deprecated in Angular v6 and is scheduled for removal in
     * a future version of Angular.
     * For details, see [Deprecated features](guide/deprecations#ngmodel-with-reactive-forms).
     *
     * @see [Reactive Forms Guide](guide/reactive-forms)
     * @see `FormControl`
     * @see `AbstractControl`
     *
     * @usageNotes
     *
     * The following example shows how to register a standalone control and set its value.
     *
     * {@example forms/ts/simpleFormControl/simple_form_control_example.ts region='Component'}
     *
     * @ngModule ReactiveFormsModule
     * @publicApi
     */
    var FormControlDirective = /** @class */ (function (_super) {
        tslib_1.__extends(FormControlDirective, _super);
        function FormControlDirective(validators, asyncValidators, valueAccessors, _ngModelWarningConfig) {
            var _this = _super.call(this) || this;
            _this._ngModelWarningConfig = _ngModelWarningConfig;
            /** @deprecated as of v6 */
            _this.update = new i0.EventEmitter();
            /**
             * @description
             * Instance property used to track whether an ngModel warning has been sent out for this
             * particular `FormControlDirective` instance. Used to support warning config of "always".
             *
             * @internal
             */
            _this._ngModelWarningSent = false;
            _this._setValidators(validators);
            _this._setAsyncValidators(asyncValidators);
            _this.valueAccessor = selectValueAccessor(_this, valueAccessors);
            return _this;
        }
        Object.defineProperty(FormControlDirective.prototype, "isDisabled", {
            /**
             * @description
             * Triggers a warning in dev mode that this input should not be used with reactive forms.
             */
            set: function (isDisabled) {
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    ReactiveErrors.disabledAttrWarning();
                }
            },
            enumerable: false,
            configurable: true
        });
        /** @nodoc */
        FormControlDirective.prototype.ngOnChanges = function (changes) {
            if (this._isControlChanged(changes)) {
                setUpControl(this.form, this);
                if (this.control.disabled && this.valueAccessor.setDisabledState) {
                    this.valueAccessor.setDisabledState(true);
                }
                this.form.updateValueAndValidity({ emitEvent: false });
            }
            if (isPropertyUpdated(changes, this.viewModel)) {
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    _ngModelWarning('formControl', FormControlDirective, this, this._ngModelWarningConfig);
                }
                this.form.setValue(this.model);
                this.viewModel = this.model;
            }
        };
        Object.defineProperty(FormControlDirective.prototype, "path", {
            /**
             * @description
             * Returns an array that represents the path from the top-level form to this control.
             * Each index is the string name of the control on that level.
             */
            get: function () {
                return [];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FormControlDirective.prototype, "control", {
            /**
             * @description
             * The `FormControl` bound to this directive.
             */
            get: function () {
                return this.form;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @description
         * Sets the new value for the view model and emits an `ngModelChange` event.
         *
         * @param newValue The new value for the view model.
         */
        FormControlDirective.prototype.viewToModelUpdate = function (newValue) {
            this.viewModel = newValue;
            this.update.emit(newValue);
        };
        FormControlDirective.prototype._isControlChanged = function (changes) {
            return changes.hasOwnProperty('form');
        };
        return FormControlDirective;
    }(NgControl));
    /**
     * @description
     * Static property used to track whether any ngModel warnings have been sent across
     * all instances of FormControlDirective. Used to support warning config of "once".
     *
     * @internal
     */
    FormControlDirective._ngModelWarningSentOnce = false;
    FormControlDirective.decorators = [
        { type: i0.Directive, args: [{ selector: '[formControl]', providers: [formControlBinding$1], exportAs: 'ngForm' },] }
    ];
    FormControlDirective.ctorParameters = function () { return [
        { type: Array, decorators: [{ type: i0.Optional }, { type: i0.Self }, { type: i0.Inject, args: [NG_VALIDATORS,] }] },
        { type: Array, decorators: [{ type: i0.Optional }, { type: i0.Self }, { type: i0.Inject, args: [NG_ASYNC_VALIDATORS,] }] },
        { type: Array, decorators: [{ type: i0.Optional }, { type: i0.Self }, { type: i0.Inject, args: [NG_VALUE_ACCESSOR,] }] },
        { type: String, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [NG_MODEL_WITH_FORM_CONTROL_WARNING,] }] }
    ]; };
    FormControlDirective.propDecorators = {
        form: [{ type: i0.Input, args: ['formControl',] }],
        isDisabled: [{ type: i0.Input, args: ['disabled',] }],
        model: [{ type: i0.Input, args: ['ngModel',] }],
        update: [{ type: i0.Output, args: ['ngModelChange',] }]
    };
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var formDirectiveProvider$1 = {
        provide: ControlContainer,
        useExisting: i0.forwardRef(function () { return FormGroupDirective; })
    };
    /**
     * @description
     *
     * Binds an existing `FormGroup` to a DOM element.
     *
     * This directive accepts an existing `FormGroup` instance. It will then use this
     * `FormGroup` instance to match any child `FormControl`, `FormGroup`,
     * and `FormArray` instances to child `FormControlName`, `FormGroupName`,
     * and `FormArrayName` directives.
     *
     * @see [Reactive Forms Guide](guide/reactive-forms)
     * @see `AbstractControl`
     *
     * ### Register Form Group
     *
     * The following example registers a `FormGroup` with first name and last name controls,
     * and listens for the *ngSubmit* event when the button is clicked.
     *
     * {@example forms/ts/simpleFormGroup/simple_form_group_example.ts region='Component'}
     *
     * @ngModule ReactiveFormsModule
     * @publicApi
     */
    var FormGroupDirective = /** @class */ (function (_super) {
        tslib_1.__extends(FormGroupDirective, _super);
        function FormGroupDirective(validators, asyncValidators) {
            var _this = _super.call(this) || this;
            _this.validators = validators;
            _this.asyncValidators = asyncValidators;
            /**
             * @description
             * Reports whether the form submission has been triggered.
             */
            _this.submitted = false;
            /**
             * @description
             * Tracks the list of added `FormControlName` instances
             */
            _this.directives = [];
            /**
             * @description
             * Tracks the `FormGroup` bound to this directive.
             */
            _this.form = null;
            /**
             * @description
             * Emits an event when the form submission has been triggered.
             */
            _this.ngSubmit = new i0.EventEmitter();
            _this._setValidators(validators);
            _this._setAsyncValidators(asyncValidators);
            return _this;
        }
        /** @nodoc */
        FormGroupDirective.prototype.ngOnChanges = function (changes) {
            this._checkFormPresent();
            if (changes.hasOwnProperty('form')) {
                this._updateValidators();
                this._updateDomValue();
                this._updateRegistrations();
                this._oldForm = this.form;
            }
        };
        Object.defineProperty(FormGroupDirective.prototype, "formDirective", {
            /**
             * @description
             * Returns this directive's instance.
             */
            get: function () {
                return this;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FormGroupDirective.prototype, "control", {
            /**
             * @description
             * Returns the `FormGroup` bound to this directive.
             */
            get: function () {
                return this.form;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FormGroupDirective.prototype, "path", {
            /**
             * @description
             * Returns an array representing the path to this group. Because this directive
             * always lives at the top level of a form, it always an empty array.
             */
            get: function () {
                return [];
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @description
         * Method that sets up the control directive in this group, re-calculates its value
         * and validity, and adds the instance to the internal list of directives.
         *
         * @param dir The `FormControlName` directive instance.
         */
        FormGroupDirective.prototype.addControl = function (dir) {
            var ctrl = this.form.get(dir.path);
            setUpControl(ctrl, dir);
            ctrl.updateValueAndValidity({ emitEvent: false });
            this.directives.push(dir);
            return ctrl;
        };
        /**
         * @description
         * Retrieves the `FormControl` instance from the provided `FormControlName` directive
         *
         * @param dir The `FormControlName` directive instance.
         */
        FormGroupDirective.prototype.getControl = function (dir) {
            return this.form.get(dir.path);
        };
        /**
         * @description
         * Removes the `FormControlName` instance from the internal list of directives
         *
         * @param dir The `FormControlName` directive instance.
         */
        FormGroupDirective.prototype.removeControl = function (dir) {
            removeListItem(this.directives, dir);
        };
        /**
         * Adds a new `FormGroupName` directive instance to the form.
         *
         * @param dir The `FormGroupName` directive instance.
         */
        FormGroupDirective.prototype.addFormGroup = function (dir) {
            var ctrl = this.form.get(dir.path);
            setUpFormContainer(ctrl, dir);
            ctrl.updateValueAndValidity({ emitEvent: false });
        };
        /**
         * No-op method to remove the form group.
         *
         * @param dir The `FormGroupName` directive instance.
         */
        FormGroupDirective.prototype.removeFormGroup = function (dir) { };
        /**
         * @description
         * Retrieves the `FormGroup` for a provided `FormGroupName` directive instance
         *
         * @param dir The `FormGroupName` directive instance.
         */
        FormGroupDirective.prototype.getFormGroup = function (dir) {
            return this.form.get(dir.path);
        };
        /**
         * Adds a new `FormArrayName` directive instance to the form.
         *
         * @param dir The `FormArrayName` directive instance.
         */
        FormGroupDirective.prototype.addFormArray = function (dir) {
            var ctrl = this.form.get(dir.path);
            setUpFormContainer(ctrl, dir);
            ctrl.updateValueAndValidity({ emitEvent: false });
        };
        /**
         * No-op method to remove the form array.
         *
         * @param dir The `FormArrayName` directive instance.
         */
        FormGroupDirective.prototype.removeFormArray = function (dir) { };
        /**
         * @description
         * Retrieves the `FormArray` for a provided `FormArrayName` directive instance.
         *
         * @param dir The `FormArrayName` directive instance.
         */
        FormGroupDirective.prototype.getFormArray = function (dir) {
            return this.form.get(dir.path);
        };
        /**
         * Sets the new value for the provided `FormControlName` directive.
         *
         * @param dir The `FormControlName` directive instance.
         * @param value The new value for the directive's control.
         */
        FormGroupDirective.prototype.updateModel = function (dir, value) {
            var ctrl = this.form.get(dir.path);
            ctrl.setValue(value);
        };
        /**
         * @description
         * Method called with the "submit" event is triggered on the form.
         * Triggers the `ngSubmit` emitter to emit the "submit" event as its payload.
         *
         * @param $event The "submit" event object
         */
        FormGroupDirective.prototype.onSubmit = function ($event) {
            this.submitted = true;
            syncPendingControls(this.form, this.directives);
            this.ngSubmit.emit($event);
            return false;
        };
        /**
         * @description
         * Method called when the "reset" event is triggered on the form.
         */
        FormGroupDirective.prototype.onReset = function () {
            this.resetForm();
        };
        /**
         * @description
         * Resets the form to an initial value and resets its submitted status.
         *
         * @param value The new value for the form.
         */
        FormGroupDirective.prototype.resetForm = function (value) {
            if (value === void 0) { value = undefined; }
            this.form.reset(value);
            this.submitted = false;
        };
        /** @internal */
        FormGroupDirective.prototype._updateDomValue = function () {
            var _this = this;
            this.directives.forEach(function (dir) {
                var newCtrl = _this.form.get(dir.path);
                if (dir.control !== newCtrl) {
                    // Note: the value of the `dir.control` may not be defined, for example when it's a first
                    // `FormControl` that is added to a `FormGroup` instance (via `addControl` call).
                    cleanUpControl(dir.control || null, dir);
                    if (newCtrl)
                        setUpControl(newCtrl, dir);
                    dir.control = newCtrl;
                }
            });
            this.form._updateTreeValidity({ emitEvent: false });
        };
        FormGroupDirective.prototype._updateRegistrations = function () {
            var _this = this;
            this.form._registerOnCollectionChange(function () { return _this._updateDomValue(); });
            if (this._oldForm) {
                this._oldForm._registerOnCollectionChange(function () { });
            }
        };
        FormGroupDirective.prototype._updateValidators = function () {
            setUpValidators(this.form, this, /* handleOnValidatorChange */ false);
            if (this._oldForm) {
                cleanUpValidators(this._oldForm, this, /* handleOnValidatorChange */ false);
            }
        };
        FormGroupDirective.prototype._checkFormPresent = function () {
            if (!this.form && (typeof ngDevMode === 'undefined' || ngDevMode)) {
                ReactiveErrors.missingFormException();
            }
        };
        return FormGroupDirective;
    }(ControlContainer));
    FormGroupDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[formGroup]',
                    providers: [formDirectiveProvider$1],
                    host: { '(submit)': 'onSubmit($event)', '(reset)': 'onReset()' },
                    exportAs: 'ngForm'
                },] }
    ];
    FormGroupDirective.ctorParameters = function () { return [
        { type: Array, decorators: [{ type: i0.Optional }, { type: i0.Self }, { type: i0.Inject, args: [NG_VALIDATORS,] }] },
        { type: Array, decorators: [{ type: i0.Optional }, { type: i0.Self }, { type: i0.Inject, args: [NG_ASYNC_VALIDATORS,] }] }
    ]; };
    FormGroupDirective.propDecorators = {
        form: [{ type: i0.Input, args: ['formGroup',] }],
        ngSubmit: [{ type: i0.Output }]
    };
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var formGroupNameProvider = {
        provide: ControlContainer,
        useExisting: i0.forwardRef(function () { return FormGroupName; })
    };
    /**
     * @description
     *
     * Syncs a nested `FormGroup` to a DOM element.
     *
     * This directive can only be used with a parent `FormGroupDirective`.
     *
     * It accepts the string name of the nested `FormGroup` to link, and
     * looks for a `FormGroup` registered with that name in the parent
     * `FormGroup` instance you passed into `FormGroupDirective`.
     *
     * Use nested form groups to validate a sub-group of a
     * form separately from the rest or to group the values of certain
     * controls into their own nested object.
     *
     * @see [Reactive Forms Guide](guide/reactive-forms)
     *
     * @usageNotes
     *
     * ### Access the group by name
     *
     * The following example uses the {@link AbstractControl#get get} method to access the
     * associated `FormGroup`
     *
     * ```ts
     *   this.form.get('name');
     * ```
     *
     * ### Access individual controls in the group
     *
     * The following example uses the {@link AbstractControl#get get} method to access
     * individual controls within the group using dot syntax.
     *
     * ```ts
     *   this.form.get('name.first');
     * ```
     *
     * ### Register a nested `FormGroup`.
     *
     * The following example registers a nested *name* `FormGroup` within an existing `FormGroup`,
     * and provides methods to retrieve the nested `FormGroup` and individual controls.
     *
     * {@example forms/ts/nestedFormGroup/nested_form_group_example.ts region='Component'}
     *
     * @ngModule ReactiveFormsModule
     * @publicApi
     */
    var FormGroupName = /** @class */ (function (_super) {
        tslib_1.__extends(FormGroupName, _super);
        function FormGroupName(parent, validators, asyncValidators) {
            var _this = _super.call(this) || this;
            _this._parent = parent;
            _this._setValidators(validators);
            _this._setAsyncValidators(asyncValidators);
            return _this;
        }
        /** @internal */
        FormGroupName.prototype._checkParentType = function () {
            if (_hasInvalidParent(this._parent) && (typeof ngDevMode === 'undefined' || ngDevMode)) {
                ReactiveErrors.groupParentException();
            }
        };
        return FormGroupName;
    }(AbstractFormGroupDirective));
    FormGroupName.decorators = [
        { type: i0.Directive, args: [{ selector: '[formGroupName]', providers: [formGroupNameProvider] },] }
    ];
    FormGroupName.ctorParameters = function () { return [
        { type: ControlContainer, decorators: [{ type: i0.Optional }, { type: i0.Host }, { type: i0.SkipSelf }] },
        { type: Array, decorators: [{ type: i0.Optional }, { type: i0.Self }, { type: i0.Inject, args: [NG_VALIDATORS,] }] },
        { type: Array, decorators: [{ type: i0.Optional }, { type: i0.Self }, { type: i0.Inject, args: [NG_ASYNC_VALIDATORS,] }] }
    ]; };
    FormGroupName.propDecorators = {
        name: [{ type: i0.Input, args: ['formGroupName',] }]
    };
    var formArrayNameProvider = {
        provide: ControlContainer,
        useExisting: i0.forwardRef(function () { return FormArrayName; })
    };
    /**
     * @description
     *
     * Syncs a nested `FormArray` to a DOM element.
     *
     * This directive is designed to be used with a parent `FormGroupDirective` (selector:
     * `[formGroup]`).
     *
     * It accepts the string name of the nested `FormArray` you want to link, and
     * will look for a `FormArray` registered with that name in the parent
     * `FormGroup` instance you passed into `FormGroupDirective`.
     *
     * @see [Reactive Forms Guide](guide/reactive-forms)
     * @see `AbstractControl`
     *
     * @usageNotes
     *
     * ### Example
     *
     * {@example forms/ts/nestedFormArray/nested_form_array_example.ts region='Component'}
     *
     * @ngModule ReactiveFormsModule
     * @publicApi
     */
    var FormArrayName = /** @class */ (function (_super) {
        tslib_1.__extends(FormArrayName, _super);
        function FormArrayName(parent, validators, asyncValidators) {
            var _this = _super.call(this) || this;
            _this._parent = parent;
            _this._setValidators(validators);
            _this._setAsyncValidators(asyncValidators);
            return _this;
        }
        /**
         * A lifecycle method called when the directive's inputs are initialized. For internal use only.
         * @throws If the directive does not have a valid parent.
         * @nodoc
         */
        FormArrayName.prototype.ngOnInit = function () {
            this._checkParentType();
            this.formDirective.addFormArray(this);
        };
        /**
         * A lifecycle method called before the directive's instance is destroyed. For internal use only.
         * @nodoc
         */
        FormArrayName.prototype.ngOnDestroy = function () {
            if (this.formDirective) {
                this.formDirective.removeFormArray(this);
            }
        };
        Object.defineProperty(FormArrayName.prototype, "control", {
            /**
             * @description
             * The `FormArray` bound to this directive.
             */
            get: function () {
                return this.formDirective.getFormArray(this);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FormArrayName.prototype, "formDirective", {
            /**
             * @description
             * The top-level directive for this group if present, otherwise null.
             */
            get: function () {
                return this._parent ? this._parent.formDirective : null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FormArrayName.prototype, "path", {
            /**
             * @description
             * Returns an array that represents the path from the top-level form to this control.
             * Each index is the string name of the control on that level.
             */
            get: function () {
                return controlPath(this.name == null ? this.name : this.name.toString(), this._parent);
            },
            enumerable: false,
            configurable: true
        });
        FormArrayName.prototype._checkParentType = function () {
            if (_hasInvalidParent(this._parent) && (typeof ngDevMode === 'undefined' || ngDevMode)) {
                ReactiveErrors.arrayParentException();
            }
        };
        return FormArrayName;
    }(ControlContainer));
    FormArrayName.decorators = [
        { type: i0.Directive, args: [{ selector: '[formArrayName]', providers: [formArrayNameProvider] },] }
    ];
    FormArrayName.ctorParameters = function () { return [
        { type: ControlContainer, decorators: [{ type: i0.Optional }, { type: i0.Host }, { type: i0.SkipSelf }] },
        { type: Array, decorators: [{ type: i0.Optional }, { type: i0.Self }, { type: i0.Inject, args: [NG_VALIDATORS,] }] },
        { type: Array, decorators: [{ type: i0.Optional }, { type: i0.Self }, { type: i0.Inject, args: [NG_ASYNC_VALIDATORS,] }] }
    ]; };
    FormArrayName.propDecorators = {
        name: [{ type: i0.Input, args: ['formArrayName',] }]
    };
    function _hasInvalidParent(parent) {
        return !(parent instanceof FormGroupName) && !(parent instanceof FormGroupDirective) &&
            !(parent instanceof FormArrayName);
    }
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var controlNameBinding = {
        provide: NgControl,
        useExisting: i0.forwardRef(function () { return FormControlName; })
    };
    /**
     * @description
     * Syncs a `FormControl` in an existing `FormGroup` to a form control
     * element by name.
     *
     * @see [Reactive Forms Guide](guide/reactive-forms)
     * @see `FormControl`
     * @see `AbstractControl`
     *
     * @usageNotes
     *
     * ### Register `FormControl` within a group
     *
     * The following example shows how to register multiple form controls within a form group
     * and set their value.
     *
     * {@example forms/ts/simpleFormGroup/simple_form_group_example.ts region='Component'}
     *
     * To see `formControlName` examples with different form control types, see:
     *
     * * Radio buttons: `RadioControlValueAccessor`
     * * Selects: `SelectControlValueAccessor`
     *
     * ### Use with ngModel is deprecated
     *
     * Support for using the `ngModel` input property and `ngModelChange` event with reactive
     * form directives has been deprecated in Angular v6 and is scheduled for removal in
     * a future version of Angular.
     *
     * For details, see [Deprecated features](guide/deprecations#ngmodel-with-reactive-forms).
     *
     * @ngModule ReactiveFormsModule
     * @publicApi
     */
    var FormControlName = /** @class */ (function (_super) {
        tslib_1.__extends(FormControlName, _super);
        function FormControlName(parent, validators, asyncValidators, valueAccessors, _ngModelWarningConfig) {
            var _this = _super.call(this) || this;
            _this._ngModelWarningConfig = _ngModelWarningConfig;
            _this._added = false;
            /** @deprecated as of v6 */
            _this.update = new i0.EventEmitter();
            /**
             * @description
             * Instance property used to track whether an ngModel warning has been sent out for this
             * particular FormControlName instance. Used to support warning config of "always".
             *
             * @internal
             */
            _this._ngModelWarningSent = false;
            _this._parent = parent;
            _this._setValidators(validators);
            _this._setAsyncValidators(asyncValidators);
            _this.valueAccessor = selectValueAccessor(_this, valueAccessors);
            return _this;
        }
        Object.defineProperty(FormControlName.prototype, "isDisabled", {
            /**
             * @description
             * Triggers a warning in dev mode that this input should not be used with reactive forms.
             */
            set: function (isDisabled) {
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    ReactiveErrors.disabledAttrWarning();
                }
            },
            enumerable: false,
            configurable: true
        });
        /** @nodoc */
        FormControlName.prototype.ngOnChanges = function (changes) {
            if (!this._added)
                this._setUpControl();
            if (isPropertyUpdated(changes, this.viewModel)) {
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    _ngModelWarning('formControlName', FormControlName, this, this._ngModelWarningConfig);
                }
                this.viewModel = this.model;
                this.formDirective.updateModel(this, this.model);
            }
        };
        /** @nodoc */
        FormControlName.prototype.ngOnDestroy = function () {
            if (this.formDirective) {
                this.formDirective.removeControl(this);
            }
        };
        /**
         * @description
         * Sets the new value for the view model and emits an `ngModelChange` event.
         *
         * @param newValue The new value for the view model.
         */
        FormControlName.prototype.viewToModelUpdate = function (newValue) {
            this.viewModel = newValue;
            this.update.emit(newValue);
        };
        Object.defineProperty(FormControlName.prototype, "path", {
            /**
             * @description
             * Returns an array that represents the path from the top-level form to this control.
             * Each index is the string name of the control on that level.
             */
            get: function () {
                return controlPath(this.name == null ? this.name : this.name.toString(), this._parent);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FormControlName.prototype, "formDirective", {
            /**
             * @description
             * The top-level directive for this group if present, otherwise null.
             */
            get: function () {
                return this._parent ? this._parent.formDirective : null;
            },
            enumerable: false,
            configurable: true
        });
        FormControlName.prototype._checkParentType = function () {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                if (!(this._parent instanceof FormGroupName) &&
                    this._parent instanceof AbstractFormGroupDirective) {
                    ReactiveErrors.ngModelGroupException();
                }
                else if (!(this._parent instanceof FormGroupName) &&
                    !(this._parent instanceof FormGroupDirective) &&
                    !(this._parent instanceof FormArrayName)) {
                    ReactiveErrors.controlParentException();
                }
            }
        };
        FormControlName.prototype._setUpControl = function () {
            this._checkParentType();
            this.control = this.formDirective.addControl(this);
            if (this.control.disabled && this.valueAccessor.setDisabledState) {
                this.valueAccessor.setDisabledState(true);
            }
            this._added = true;
        };
        return FormControlName;
    }(NgControl));
    /**
     * @description
     * Static property used to track whether any ngModel warnings have been sent across
     * all instances of FormControlName. Used to support warning config of "once".
     *
     * @internal
     */
    FormControlName._ngModelWarningSentOnce = false;
    FormControlName.decorators = [
        { type: i0.Directive, args: [{ selector: '[formControlName]', providers: [controlNameBinding] },] }
    ];
    FormControlName.ctorParameters = function () { return [
        { type: ControlContainer, decorators: [{ type: i0.Optional }, { type: i0.Host }, { type: i0.SkipSelf }] },
        { type: Array, decorators: [{ type: i0.Optional }, { type: i0.Self }, { type: i0.Inject, args: [NG_VALIDATORS,] }] },
        { type: Array, decorators: [{ type: i0.Optional }, { type: i0.Self }, { type: i0.Inject, args: [NG_ASYNC_VALIDATORS,] }] },
        { type: Array, decorators: [{ type: i0.Optional }, { type: i0.Self }, { type: i0.Inject, args: [NG_VALUE_ACCESSOR,] }] },
        { type: String, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [NG_MODEL_WITH_FORM_CONTROL_WARNING,] }] }
    ]; };
    FormControlName.propDecorators = {
        name: [{ type: i0.Input, args: ['formControlName',] }],
        isDisabled: [{ type: i0.Input, args: ['disabled',] }],
        model: [{ type: i0.Input, args: ['ngModel',] }],
        update: [{ type: i0.Output, args: ['ngModelChange',] }]
    };
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * @description
     * Provider which adds `RequiredValidator` to the `NG_VALIDATORS` multi-provider list.
     */
    var REQUIRED_VALIDATOR = {
        provide: NG_VALIDATORS,
        useExisting: i0.forwardRef(function () { return RequiredValidator; }),
        multi: true
    };
    /**
     * @description
     * Provider which adds `CheckboxRequiredValidator` to the `NG_VALIDATORS` multi-provider list.
     */
    var CHECKBOX_REQUIRED_VALIDATOR = {
        provide: NG_VALIDATORS,
        useExisting: i0.forwardRef(function () { return CheckboxRequiredValidator; }),
        multi: true
    };
    /**
     * @description
     * A directive that adds the `required` validator to any controls marked with the
     * `required` attribute. The directive is provided with the `NG_VALIDATORS` multi-provider list.
     *
     * @see [Form Validation](guide/form-validation)
     *
     * @usageNotes
     *
     * ### Adding a required validator using template-driven forms
     *
     * ```
     * <input name="fullName" ngModel required>
     * ```
     *
     * @ngModule FormsModule
     * @ngModule ReactiveFormsModule
     * @publicApi
     */
    var RequiredValidator = /** @class */ (function () {
        function RequiredValidator() {
            this._required = false;
        }
        Object.defineProperty(RequiredValidator.prototype, "required", {
            /**
             * @description
             * Tracks changes to the required attribute bound to this directive.
             */
            get: function () {
                return this._required;
            },
            set: function (value) {
                this._required = value != null && value !== false && "" + value !== 'false';
                if (this._onChange)
                    this._onChange();
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Method that validates whether the control is empty.
         * Returns the validation result if enabled, otherwise null.
         * @nodoc
         */
        RequiredValidator.prototype.validate = function (control) {
            return this.required ? Validators.required(control) : null;
        };
        /**
         * Registers a callback function to call when the validator inputs change.
         * @nodoc
         */
        RequiredValidator.prototype.registerOnValidatorChange = function (fn) {
            this._onChange = fn;
        };
        return RequiredValidator;
    }());
    RequiredValidator.decorators = [
        { type: i0.Directive, args: [{
                    selector: ':not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]',
                    providers: [REQUIRED_VALIDATOR],
                    host: { '[attr.required]': 'required ? "" : null' }
                },] }
    ];
    RequiredValidator.propDecorators = {
        required: [{ type: i0.Input }]
    };
    /**
     * A Directive that adds the `required` validator to checkbox controls marked with the
     * `required` attribute. The directive is provided with the `NG_VALIDATORS` multi-provider list.
     *
     * @see [Form Validation](guide/form-validation)
     *
     * @usageNotes
     *
     * ### Adding a required checkbox validator using template-driven forms
     *
     * The following example shows how to add a checkbox required validator to an input attached to an
     * ngModel binding.
     *
     * ```
     * <input type="checkbox" name="active" ngModel required>
     * ```
     *
     * @publicApi
     * @ngModule FormsModule
     * @ngModule ReactiveFormsModule
     */
    var CheckboxRequiredValidator = /** @class */ (function (_super) {
        tslib_1.__extends(CheckboxRequiredValidator, _super);
        function CheckboxRequiredValidator() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Method that validates whether or not the checkbox has been checked.
         * Returns the validation result if enabled, otherwise null.
         * @nodoc
         */
        CheckboxRequiredValidator.prototype.validate = function (control) {
            return this.required ? Validators.requiredTrue(control) : null;
        };
        return CheckboxRequiredValidator;
    }(RequiredValidator));
    CheckboxRequiredValidator.decorators = [
        { type: i0.Directive, args: [{
                    selector: 'input[type=checkbox][required][formControlName],input[type=checkbox][required][formControl],input[type=checkbox][required][ngModel]',
                    providers: [CHECKBOX_REQUIRED_VALIDATOR],
                    host: { '[attr.required]': 'required ? "" : null' }
                },] }
    ];
    /**
     * @description
     * Provider which adds `EmailValidator` to the `NG_VALIDATORS` multi-provider list.
     */
    var EMAIL_VALIDATOR = {
        provide: NG_VALIDATORS,
        useExisting: i0.forwardRef(function () { return EmailValidator; }),
        multi: true
    };
    /**
     * A directive that adds the `email` validator to controls marked with the
     * `email` attribute. The directive is provided with the `NG_VALIDATORS` multi-provider list.
     *
     * @see [Form Validation](guide/form-validation)
     *
     * @usageNotes
     *
     * ### Adding an email validator
     *
     * The following example shows how to add an email validator to an input attached to an ngModel
     * binding.
     *
     * ```
     * <input type="email" name="email" ngModel email>
     * <input type="email" name="email" ngModel email="true">
     * <input type="email" name="email" ngModel [email]="true">
     * ```
     *
     * @publicApi
     * @ngModule FormsModule
     * @ngModule ReactiveFormsModule
     */
    var EmailValidator = /** @class */ (function () {
        function EmailValidator() {
            this._enabled = false;
        }
        Object.defineProperty(EmailValidator.prototype, "email", {
            /**
             * @description
             * Tracks changes to the email attribute bound to this directive.
             */
            set: function (value) {
                this._enabled = value === '' || value === true || value === 'true';
                if (this._onChange)
                    this._onChange();
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Method that validates whether an email address is valid.
         * Returns the validation result if enabled, otherwise null.
         * @nodoc
         */
        EmailValidator.prototype.validate = function (control) {
            return this._enabled ? Validators.email(control) : null;
        };
        /**
         * Registers a callback function to call when the validator inputs change.
         * @nodoc
         */
        EmailValidator.prototype.registerOnValidatorChange = function (fn) {
            this._onChange = fn;
        };
        return EmailValidator;
    }());
    EmailValidator.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[email][formControlName],[email][formControl],[email][ngModel]',
                    providers: [EMAIL_VALIDATOR]
                },] }
    ];
    EmailValidator.propDecorators = {
        email: [{ type: i0.Input }]
    };
    /**
     * @description
     * Provider which adds `MinLengthValidator` to the `NG_VALIDATORS` multi-provider list.
     */
    var MIN_LENGTH_VALIDATOR = {
        provide: NG_VALIDATORS,
        useExisting: i0.forwardRef(function () { return MinLengthValidator; }),
        multi: true
    };
    /**
     * A directive that adds minimum length validation to controls marked with the
     * `minlength` attribute. The directive is provided with the `NG_VALIDATORS` multi-provider list.
     *
     * @see [Form Validation](guide/form-validation)
     *
     * @usageNotes
     *
     * ### Adding a minimum length validator
     *
     * The following example shows how to add a minimum length validator to an input attached to an
     * ngModel binding.
     *
     * ```html
     * <input name="firstName" ngModel minlength="4">
     * ```
     *
     * @ngModule ReactiveFormsModule
     * @ngModule FormsModule
     * @publicApi
     */
    var MinLengthValidator = /** @class */ (function () {
        function MinLengthValidator() {
            this._validator = Validators.nullValidator;
        }
        /** @nodoc */
        MinLengthValidator.prototype.ngOnChanges = function (changes) {
            if ('minlength' in changes) {
                this._createValidator();
                if (this._onChange)
                    this._onChange();
            }
        };
        /**
         * Method that validates whether the value meets a minimum length requirement.
         * Returns the validation result if enabled, otherwise null.
         * @nodoc
         */
        MinLengthValidator.prototype.validate = function (control) {
            return this.minlength == null ? null : this._validator(control);
        };
        /**
         * Registers a callback function to call when the validator inputs change.
         * @nodoc
         */
        MinLengthValidator.prototype.registerOnValidatorChange = function (fn) {
            this._onChange = fn;
        };
        MinLengthValidator.prototype._createValidator = function () {
            this._validator = Validators.minLength(typeof this.minlength === 'number' ? this.minlength : parseInt(this.minlength, 10));
        };
        return MinLengthValidator;
    }());
    MinLengthValidator.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[minlength][formControlName],[minlength][formControl],[minlength][ngModel]',
                    providers: [MIN_LENGTH_VALIDATOR],
                    host: { '[attr.minlength]': 'minlength ? minlength : null' }
                },] }
    ];
    MinLengthValidator.propDecorators = {
        minlength: [{ type: i0.Input }]
    };
    /**
     * @description
     * Provider which adds `MaxLengthValidator` to the `NG_VALIDATORS` multi-provider list.
     */
    var MAX_LENGTH_VALIDATOR = {
        provide: NG_VALIDATORS,
        useExisting: i0.forwardRef(function () { return MaxLengthValidator; }),
        multi: true
    };
    /**
     * A directive that adds max length validation to controls marked with the
     * `maxlength` attribute. The directive is provided with the `NG_VALIDATORS` multi-provider list.
     *
     * @see [Form Validation](guide/form-validation)
     *
     * @usageNotes
     *
     * ### Adding a maximum length validator
     *
     * The following example shows how to add a maximum length validator to an input attached to an
     * ngModel binding.
     *
     * ```html
     * <input name="firstName" ngModel maxlength="25">
     * ```
     *
     * @ngModule ReactiveFormsModule
     * @ngModule FormsModule
     * @publicApi
     */
    var MaxLengthValidator = /** @class */ (function () {
        function MaxLengthValidator() {
            this._validator = Validators.nullValidator;
        }
        /** @nodoc */
        MaxLengthValidator.prototype.ngOnChanges = function (changes) {
            if ('maxlength' in changes) {
                this._createValidator();
                if (this._onChange)
                    this._onChange();
            }
        };
        /**
         * Method that validates whether the value exceeds the maximum length requirement.
         * @nodoc
         */
        MaxLengthValidator.prototype.validate = function (control) {
            return this.maxlength != null ? this._validator(control) : null;
        };
        /**
         * Registers a callback function to call when the validator inputs change.
         * @nodoc
         */
        MaxLengthValidator.prototype.registerOnValidatorChange = function (fn) {
            this._onChange = fn;
        };
        MaxLengthValidator.prototype._createValidator = function () {
            this._validator = Validators.maxLength(typeof this.maxlength === 'number' ? this.maxlength : parseInt(this.maxlength, 10));
        };
        return MaxLengthValidator;
    }());
    MaxLengthValidator.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]',
                    providers: [MAX_LENGTH_VALIDATOR],
                    host: { '[attr.maxlength]': 'maxlength ? maxlength : null' }
                },] }
    ];
    MaxLengthValidator.propDecorators = {
        maxlength: [{ type: i0.Input }]
    };
    /**
     * @description
     * Provider which adds `PatternValidator` to the `NG_VALIDATORS` multi-provider list.
     */
    var PATTERN_VALIDATOR = {
        provide: NG_VALIDATORS,
        useExisting: i0.forwardRef(function () { return PatternValidator; }),
        multi: true
    };
    /**
     * @description
     * A directive that adds regex pattern validation to controls marked with the
     * `pattern` attribute. The regex must match the entire control value.
     * The directive is provided with the `NG_VALIDATORS` multi-provider list.
     *
     * @see [Form Validation](guide/form-validation)
     *
     * @usageNotes
     *
     * ### Adding a pattern validator
     *
     * The following example shows how to add a pattern validator to an input attached to an
     * ngModel binding.
     *
     * ```html
     * <input name="firstName" ngModel pattern="[a-zA-Z ]*">
     * ```
     *
     * @ngModule ReactiveFormsModule
     * @ngModule FormsModule
     * @publicApi
     */
    var PatternValidator = /** @class */ (function () {
        function PatternValidator() {
            this._validator = Validators.nullValidator;
        }
        /** @nodoc */
        PatternValidator.prototype.ngOnChanges = function (changes) {
            if ('pattern' in changes) {
                this._createValidator();
                if (this._onChange)
                    this._onChange();
            }
        };
        /**
         * Method that validates whether the value matches the the pattern requirement.
         * @nodoc
         */
        PatternValidator.prototype.validate = function (control) {
            return this._validator(control);
        };
        /**
         * Registers a callback function to call when the validator inputs change.
         * @nodoc
         */
        PatternValidator.prototype.registerOnValidatorChange = function (fn) {
            this._onChange = fn;
        };
        PatternValidator.prototype._createValidator = function () {
            this._validator = Validators.pattern(this.pattern);
        };
        return PatternValidator;
    }());
    PatternValidator.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[pattern][formControlName],[pattern][formControl],[pattern][ngModel]',
                    providers: [PATTERN_VALIDATOR],
                    host: { '[attr.pattern]': 'pattern ? pattern : null' }
                },] }
    ];
    PatternValidator.propDecorators = {
        pattern: [{ type: i0.Input }]
    };
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var SHARED_FORM_DIRECTIVES = [
        ɵNgNoValidate,
        NgSelectOption,
        ɵNgSelectMultipleOption,
        DefaultValueAccessor,
        NumberValueAccessor,
        RangeValueAccessor,
        CheckboxControlValueAccessor,
        SelectControlValueAccessor,
        SelectMultipleControlValueAccessor,
        RadioControlValueAccessor,
        NgControlStatus,
        NgControlStatusGroup,
        RequiredValidator,
        MinLengthValidator,
        MaxLengthValidator,
        PatternValidator,
        CheckboxRequiredValidator,
        EmailValidator,
    ];
    var TEMPLATE_DRIVEN_DIRECTIVES = [NgModel, NgModelGroup, NgForm];
    var REACTIVE_DRIVEN_DIRECTIVES = [FormControlDirective, FormGroupDirective, FormControlName, FormGroupName, FormArrayName];
    /**
     * Internal module used for sharing directives between FormsModule and ReactiveFormsModule
     */
    var ɵInternalFormsSharedModule = /** @class */ (function () {
        function ɵInternalFormsSharedModule() {
        }
        return ɵInternalFormsSharedModule;
    }());
    ɵInternalFormsSharedModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: SHARED_FORM_DIRECTIVES,
                    exports: SHARED_FORM_DIRECTIVES,
                },] }
    ];
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function isAbstractControlOptions(options) {
        return options.asyncValidators !== undefined ||
            options.validators !== undefined ||
            options.updateOn !== undefined;
    }
    /**
     * @description
     * Creates an `AbstractControl` from a user-specified configuration.
     *
     * The `FormBuilder` provides syntactic sugar that shortens creating instances of a `FormControl`,
     * `FormGroup`, or `FormArray`. It reduces the amount of boilerplate needed to build complex
     * forms.
     *
     * @see [Reactive Forms Guide](/guide/reactive-forms)
     *
     * @publicApi
     */
    var FormBuilder = /** @class */ (function () {
        function FormBuilder() {
        }
        FormBuilder.prototype.group = function (controlsConfig, options) {
            if (options === void 0) { options = null; }
            var controls = this._reduceControls(controlsConfig);
            var validators = null;
            var asyncValidators = null;
            var updateOn = undefined;
            if (options != null) {
                if (isAbstractControlOptions(options)) {
                    // `options` are `AbstractControlOptions`
                    validators = options.validators != null ? options.validators : null;
                    asyncValidators = options.asyncValidators != null ? options.asyncValidators : null;
                    updateOn = options.updateOn != null ? options.updateOn : undefined;
                }
                else {
                    // `options` are legacy form group options
                    validators = options['validator'] != null ? options['validator'] : null;
                    asyncValidators = options['asyncValidator'] != null ? options['asyncValidator'] : null;
                }
            }
            return new FormGroup(controls, { asyncValidators: asyncValidators, updateOn: updateOn, validators: validators });
        };
        /**
         * @description
         * Construct a new `FormControl` with the given state, validators and options.
         *
         * @param formState Initializes the control with an initial state value, or
         * with an object that contains both a value and a disabled status.
         *
         * @param validatorOrOpts A synchronous validator function, or an array of
         * such functions, or an `AbstractControlOptions` object that contains
         * validation functions and a validation trigger.
         *
         * @param asyncValidator A single async validator or array of async validator
         * functions.
         *
         * @usageNotes
         *
         * ### Initialize a control as disabled
         *
         * The following example returns a control with an initial value in a disabled state.
         *
         * <code-example path="forms/ts/formBuilder/form_builder_example.ts" region="disabled-control">
         * </code-example>
         */
        FormBuilder.prototype.control = function (formState, validatorOrOpts, asyncValidator) {
            return new FormControl(formState, validatorOrOpts, asyncValidator);
        };
        /**
         * Constructs a new `FormArray` from the given array of configurations,
         * validators and options.
         *
         * @param controlsConfig An array of child controls or control configs. Each
         * child control is given an index when it is registered.
         *
         * @param validatorOrOpts A synchronous validator function, or an array of
         * such functions, or an `AbstractControlOptions` object that contains
         * validation functions and a validation trigger.
         *
         * @param asyncValidator A single async validator or array of async validator
         * functions.
         */
        FormBuilder.prototype.array = function (controlsConfig, validatorOrOpts, asyncValidator) {
            var _this = this;
            var controls = controlsConfig.map(function (c) { return _this._createControl(c); });
            return new FormArray(controls, validatorOrOpts, asyncValidator);
        };
        /** @internal */
        FormBuilder.prototype._reduceControls = function (controlsConfig) {
            var _this = this;
            var controls = {};
            Object.keys(controlsConfig).forEach(function (controlName) {
                controls[controlName] = _this._createControl(controlsConfig[controlName]);
            });
            return controls;
        };
        /** @internal */
        FormBuilder.prototype._createControl = function (controlConfig) {
            if (controlConfig instanceof FormControl || controlConfig instanceof FormGroup ||
                controlConfig instanceof FormArray) {
                return controlConfig;
            }
            else if (Array.isArray(controlConfig)) {
                var value = controlConfig[0];
                var validator = controlConfig.length > 1 ? controlConfig[1] : null;
                var asyncValidator = controlConfig.length > 2 ? controlConfig[2] : null;
                return this.control(value, validator, asyncValidator);
            }
            else {
                return this.control(controlConfig);
            }
        };
        return FormBuilder;
    }());
    FormBuilder.decorators = [
        { type: i0.Injectable }
    ];
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * @publicApi
     */
    var VERSION$1 = new i0.Version('11.0.9');
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Exports the required providers and directives for template-driven forms,
     * making them available for import by NgModules that import this module.
     *
     * @see [Forms Overview](/guide/forms-overview)
     * @see [Template-driven Forms Guide](/guide/forms)
     *
     * @publicApi
     */
    var FormsModule = /** @class */ (function () {
        function FormsModule() {
        }
        return FormsModule;
    }());
    FormsModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: TEMPLATE_DRIVEN_DIRECTIVES,
                    providers: [RadioControlRegistry],
                    exports: [ɵInternalFormsSharedModule, TEMPLATE_DRIVEN_DIRECTIVES]
                },] }
    ];
    /**
     * Exports the required infrastructure and directives for reactive forms,
     * making them available for import by NgModules that import this module.
     *
     * @see [Forms Overview](guide/forms-overview)
     * @see [Reactive Forms Guide](guide/reactive-forms)
     *
     * @publicApi
     */
    var ReactiveFormsModule = /** @class */ (function () {
        function ReactiveFormsModule() {
        }
        /**
         * @description
         * Provides options for configuring the reactive forms module.
         *
         * @param opts An object of configuration options
         * * `warnOnNgModelWithFormControl` Configures when to emit a warning when an `ngModel`
         * binding is used with reactive form directives.
         */
        ReactiveFormsModule.withConfig = function (opts) {
            return {
                ngModule: ReactiveFormsModule,
                providers: [
                    { provide: NG_MODEL_WITH_FORM_CONTROL_WARNING, useValue: opts.warnOnNgModelWithFormControl }
                ]
            };
        };
        return ReactiveFormsModule;
    }());
    ReactiveFormsModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [REACTIVE_DRIVEN_DIRECTIVES],
                    providers: [FormBuilder, RadioControlRegistry],
                    exports: [ɵInternalFormsSharedModule, REACTIVE_DRIVEN_DIRECTIVES]
                },] }
    ];

    /**
     * @license Angular v11.0.9
     * (c) 2010-2020 Google LLC. https://angular.io/
     * License: MIT
     */
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Provides DOM operations in any browser environment.
     *
     * @security Tread carefully! Interacting with the DOM directly is dangerous and
     * can introduce XSS risks.
     */
    var GenericBrowserDomAdapter = /** @class */ (function (_super) {
        tslib_1.__extends(GenericBrowserDomAdapter, _super);
        function GenericBrowserDomAdapter() {
            return _super.call(this) || this;
        }
        GenericBrowserDomAdapter.prototype.supportsDOMEvents = function () {
            return true;
        };
        return GenericBrowserDomAdapter;
    }(common["ɵDomAdapter"]));
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var ɵ0 = function () {
        if (i0["ɵglobal"]['Node']) {
            return i0["ɵglobal"]['Node'].prototype.contains || function (node) {
                return !!(this.compareDocumentPosition(node) & 16);
            };
        }
        return undefined;
    };
    var nodeContains = (ɵ0)();
    /**
     * A `DomAdapter` powered by full browser DOM APIs.
     *
     * @security Tread carefully! Interacting with the DOM directly is dangerous and
     * can introduce XSS risks.
     */
    /* tslint:disable:requireParameterType no-console */
    var BrowserDomAdapter = /** @class */ (function (_super) {
        tslib_1.__extends(BrowserDomAdapter, _super);
        function BrowserDomAdapter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BrowserDomAdapter.makeCurrent = function () {
            common["ɵsetRootDomAdapter"](new BrowserDomAdapter());
        };
        BrowserDomAdapter.prototype.getProperty = function (el, name) {
            return el[name];
        };
        BrowserDomAdapter.prototype.log = function (error) {
            if (window.console) {
                window.console.log && window.console.log(error);
            }
        };
        BrowserDomAdapter.prototype.logGroup = function (error) {
            if (window.console) {
                window.console.group && window.console.group(error);
            }
        };
        BrowserDomAdapter.prototype.logGroupEnd = function () {
            if (window.console) {
                window.console.groupEnd && window.console.groupEnd();
            }
        };
        BrowserDomAdapter.prototype.onAndCancel = function (el, evt, listener) {
            el.addEventListener(evt, listener, false);
            // Needed to follow Dart's subscription semantic, until fix of
            // https://code.google.com/p/dart/issues/detail?id=17406
            return function () {
                el.removeEventListener(evt, listener, false);
            };
        };
        BrowserDomAdapter.prototype.dispatchEvent = function (el, evt) {
            el.dispatchEvent(evt);
        };
        BrowserDomAdapter.prototype.remove = function (node) {
            if (node.parentNode) {
                node.parentNode.removeChild(node);
            }
            return node;
        };
        BrowserDomAdapter.prototype.getValue = function (el) {
            return el.value;
        };
        BrowserDomAdapter.prototype.createElement = function (tagName, doc) {
            doc = doc || this.getDefaultDocument();
            return doc.createElement(tagName);
        };
        BrowserDomAdapter.prototype.createHtmlDocument = function () {
            return document.implementation.createHTMLDocument('fakeTitle');
        };
        BrowserDomAdapter.prototype.getDefaultDocument = function () {
            return document;
        };
        BrowserDomAdapter.prototype.isElementNode = function (node) {
            return node.nodeType === Node.ELEMENT_NODE;
        };
        BrowserDomAdapter.prototype.isShadowRoot = function (node) {
            return node instanceof DocumentFragment;
        };
        BrowserDomAdapter.prototype.getGlobalEventTarget = function (doc, target) {
            if (target === 'window') {
                return window;
            }
            if (target === 'document') {
                return doc;
            }
            if (target === 'body') {
                return doc.body;
            }
            return null;
        };
        BrowserDomAdapter.prototype.getHistory = function () {
            return window.history;
        };
        BrowserDomAdapter.prototype.getLocation = function () {
            return window.location;
        };
        BrowserDomAdapter.prototype.getBaseHref = function (doc) {
            var href = getBaseElementHref();
            return href == null ? null : relativePath(href);
        };
        BrowserDomAdapter.prototype.resetBaseElement = function () {
            baseElement = null;
        };
        BrowserDomAdapter.prototype.getUserAgent = function () {
            return window.navigator.userAgent;
        };
        BrowserDomAdapter.prototype.performanceNow = function () {
            // performance.now() is not available in all browsers, see
            // https://caniuse.com/high-resolution-time
            return window.performance && window.performance.now ? window.performance.now() :
                new Date().getTime();
        };
        BrowserDomAdapter.prototype.supportsCookies = function () {
            return true;
        };
        BrowserDomAdapter.prototype.getCookie = function (name) {
            return common["ɵparseCookieValue"](document.cookie, name);
        };
        return BrowserDomAdapter;
    }(GenericBrowserDomAdapter));
    var baseElement = null;
    function getBaseElementHref() {
        if (!baseElement) {
            baseElement = document.querySelector('base');
            if (!baseElement) {
                return null;
            }
        }
        return baseElement.getAttribute('href');
    }
    // based on urlUtils.js in AngularJS 1
    var urlParsingNode;
    function relativePath(url) {
        if (!urlParsingNode) {
            urlParsingNode = document.createElement('a');
        }
        urlParsingNode.setAttribute('href', url);
        return (urlParsingNode.pathname.charAt(0) === '/') ? urlParsingNode.pathname :
            '/' + urlParsingNode.pathname;
    }
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * An id that identifies a particular application being bootstrapped, that should
     * match across the client/server boundary.
     */
    var TRANSITION_ID = new i0.InjectionToken('TRANSITION_ID');
    function appInitializerFactory(transitionId, document, injector) {
        return function () {
            // Wait for all application initializers to be completed before removing the styles set by
            // the server.
            injector.get(i0.ApplicationInitStatus).donePromise.then(function () {
                var dom = common["ɵgetDOM"]();
                var styles = Array.prototype.slice.apply(document.querySelectorAll("style[ng-transition]"));
                styles.filter(function (el) { return el.getAttribute('ng-transition') === transitionId; })
                    .forEach(function (el) { return dom.remove(el); });
            });
        };
    }
    var SERVER_TRANSITION_PROVIDERS = [
        {
            provide: i0.APP_INITIALIZER,
            useFactory: appInitializerFactory,
            deps: [TRANSITION_ID, common.DOCUMENT, i0.Injector],
            multi: true
        },
    ];
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var BrowserGetTestability = /** @class */ (function () {
        function BrowserGetTestability() {
        }
        BrowserGetTestability.init = function () {
            i0.setTestabilityGetter(new BrowserGetTestability());
        };
        BrowserGetTestability.prototype.addToWindow = function (registry) {
            i0["ɵglobal"]['getAngularTestability'] = function (elem, findInAncestors) {
                if (findInAncestors === void 0) { findInAncestors = true; }
                var testability = registry.findTestabilityInTree(elem, findInAncestors);
                if (testability == null) {
                    throw new Error('Could not find testability for element.');
                }
                return testability;
            };
            i0["ɵglobal"]['getAllAngularTestabilities'] = function () { return registry.getAllTestabilities(); };
            i0["ɵglobal"]['getAllAngularRootElements'] = function () { return registry.getAllRootElements(); };
            var whenAllStable = function (callback /** TODO #9100 */) {
                var testabilities = i0["ɵglobal"]['getAllAngularTestabilities']();
                var count = testabilities.length;
                var didWork = false;
                var decrement = function (didWork_ /** TODO #9100 */) {
                    didWork = didWork || didWork_;
                    count--;
                    if (count == 0) {
                        callback(didWork);
                    }
                };
                testabilities.forEach(function (testability /** TODO #9100 */) {
                    testability.whenStable(decrement);
                });
            };
            if (!i0["ɵglobal"]['frameworkStabilizers']) {
                i0["ɵglobal"]['frameworkStabilizers'] = [];
            }
            i0["ɵglobal"]['frameworkStabilizers'].push(whenAllStable);
        };
        BrowserGetTestability.prototype.findTestabilityInTree = function (registry, elem, findInAncestors) {
            if (elem == null) {
                return null;
            }
            var t = registry.getTestability(elem);
            if (t != null) {
                return t;
            }
            else if (!findInAncestors) {
                return null;
            }
            if (common["ɵgetDOM"]().isShadowRoot(elem)) {
                return this.findTestabilityInTree(registry, elem.host, true);
            }
            return this.findTestabilityInTree(registry, elem.parentElement, true);
        };
        return BrowserGetTestability;
    }());
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var CAMEL_CASE_REGEXP = /([A-Z])/g;
    var DASH_CASE_REGEXP = /-([a-z])/g;
    function camelCaseToDashCase(input) {
        return input.replace(CAMEL_CASE_REGEXP, function () {
            var m = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                m[_i] = arguments[_i];
            }
            return '-' + m[1].toLowerCase();
        });
    }
    function dashCaseToCamelCase(input) {
        return input.replace(DASH_CASE_REGEXP, function () {
            var m = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                m[_i] = arguments[_i];
            }
            return m[1].toUpperCase();
        });
    }
    /**
     * Exports the value under a given `name` in the global property `ng`. For example `ng.probe` if
     * `name` is `'probe'`.
     * @param name Name under which it will be exported. Keep in mind this will be a property of the
     * global `ng` object.
     * @param value The value to export.
     */
    function exportNgVar(name, value) {
        if (typeof COMPILED === 'undefined' || !COMPILED) {
            // Note: we can't export `ng` when using closure enhanced optimization as:
            // - closure declares globals itself for minified names, which sometimes clobber our `ng` global
            // - we can't declare a closure extern as the namespace `ng` is already used within Google
            //   for typings for angularJS (via `goog.provide('ng....')`).
            var ng = i0["ɵglobal"]['ng'] = i0["ɵglobal"]['ng'] || {};
            ng[name] = value;
        }
    }
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var ɵ0$1 = function () { return ({
        'ApplicationRef': i0.ApplicationRef,
        'NgZone': i0.NgZone,
    }); };
    var CORE_TOKENS = (ɵ0$1)();
    var INSPECT_GLOBAL_NAME = 'probe';
    var CORE_TOKENS_GLOBAL_NAME = 'coreTokens';
    /**
     * Returns a {@link DebugElement} for the given native DOM element, or
     * null if the given native element does not have an Angular view associated
     * with it.
     */
    function inspectNativeElementR2(element) {
        return i0["ɵgetDebugNodeR2"](element);
    }
    function _createNgProbeR2(coreTokens) {
        exportNgVar(INSPECT_GLOBAL_NAME, inspectNativeElementR2);
        exportNgVar(CORE_TOKENS_GLOBAL_NAME, Object.assign(Object.assign({}, CORE_TOKENS), _ngProbeTokensToMap(coreTokens || [])));
        return function () { return inspectNativeElementR2; };
    }
    function _ngProbeTokensToMap(tokens) {
        return tokens.reduce(function (prev, t) { return (prev[t.name] = t.token, prev); }, {});
    }
    /**
     * In Ivy, we don't support NgProbe because we have our own set of testing utilities
     * with more robust functionality.
     *
     * We shouldn't bring in NgProbe because it prevents DebugNode and friends from
     * tree-shaking properly.
     */
    var ELEMENT_PROBE_PROVIDERS__POST_R3__ = [];
    /**
     * Providers which support debugging Angular applications (e.g. via `ng.probe`).
     */
    var ELEMENT_PROBE_PROVIDERS__PRE_R3__ = [
        {
            provide: i0.APP_INITIALIZER,
            useFactory: _createNgProbeR2,
            deps: [
                [i0.NgProbeToken, new i0.Optional()],
            ],
            multi: true,
        },
    ];
    var ELEMENT_PROBE_PROVIDERS = ELEMENT_PROBE_PROVIDERS__PRE_R3__;
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * The injection token for the event-manager plug-in service.
     *
     * @publicApi
     */
    var EVENT_MANAGER_PLUGINS = new i0.InjectionToken('EventManagerPlugins');
    /**
     * An injectable service that provides event management for Angular
     * through a browser plug-in.
     *
     * @publicApi
     */
    var EventManager = /** @class */ (function () {
        /**
         * Initializes an instance of the event-manager service.
         */
        function EventManager(plugins, _zone) {
            var _this = this;
            this._zone = _zone;
            this._eventNameToPlugin = new Map();
            plugins.forEach(function (p) { return p.manager = _this; });
            this._plugins = plugins.slice().reverse();
        }
        /**
         * Registers a handler for a specific element and event.
         *
         * @param element The HTML element to receive event notifications.
         * @param eventName The name of the event to listen for.
         * @param handler A function to call when the notification occurs. Receives the
         * event object as an argument.
         * @returns  A callback function that can be used to remove the handler.
         */
        EventManager.prototype.addEventListener = function (element, eventName, handler) {
            var plugin = this._findPluginFor(eventName);
            return plugin.addEventListener(element, eventName, handler);
        };
        /**
         * Registers a global handler for an event in a target view.
         *
         * @param target A target for global event notifications. One of "window", "document", or "body".
         * @param eventName The name of the event to listen for.
         * @param handler A function to call when the notification occurs. Receives the
         * event object as an argument.
         * @returns A callback function that can be used to remove the handler.
         */
        EventManager.prototype.addGlobalEventListener = function (target, eventName, handler) {
            var plugin = this._findPluginFor(eventName);
            return plugin.addGlobalEventListener(target, eventName, handler);
        };
        /**
         * Retrieves the compilation zone in which event listeners are registered.
         */
        EventManager.prototype.getZone = function () {
            return this._zone;
        };
        /** @internal */
        EventManager.prototype._findPluginFor = function (eventName) {
            var plugin = this._eventNameToPlugin.get(eventName);
            if (plugin) {
                return plugin;
            }
            var plugins = this._plugins;
            for (var i = 0; i < plugins.length; i++) {
                var plugin_1 = plugins[i];
                if (plugin_1.supports(eventName)) {
                    this._eventNameToPlugin.set(eventName, plugin_1);
                    return plugin_1;
                }
            }
            throw new Error("No event manager plugin found for event " + eventName);
        };
        return EventManager;
    }());
    EventManager.decorators = [
        { type: i0.Injectable }
    ];
    EventManager.ctorParameters = function () { return [
        { type: Array, decorators: [{ type: i0.Inject, args: [EVENT_MANAGER_PLUGINS,] }] },
        { type: i0.NgZone }
    ]; };
    var EventManagerPlugin = /** @class */ (function () {
        function EventManagerPlugin(_doc) {
            this._doc = _doc;
        }
        EventManagerPlugin.prototype.addGlobalEventListener = function (element, eventName, handler) {
            var target = common["ɵgetDOM"]().getGlobalEventTarget(this._doc, element);
            if (!target) {
                throw new Error("Unsupported event target " + target + " for event " + eventName);
            }
            return this.addEventListener(target, eventName, handler);
        };
        return EventManagerPlugin;
    }());
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var SharedStylesHost = /** @class */ (function () {
        function SharedStylesHost() {
            /** @internal */
            this._stylesSet = new Set();
        }
        SharedStylesHost.prototype.addStyles = function (styles) {
            var _this = this;
            var additions = new Set();
            styles.forEach(function (style) {
                if (!_this._stylesSet.has(style)) {
                    _this._stylesSet.add(style);
                    additions.add(style);
                }
            });
            this.onStylesAdded(additions);
        };
        SharedStylesHost.prototype.onStylesAdded = function (additions) { };
        SharedStylesHost.prototype.getAllStyles = function () {
            return Array.from(this._stylesSet);
        };
        return SharedStylesHost;
    }());
    SharedStylesHost.decorators = [
        { type: i0.Injectable }
    ];
    var DomSharedStylesHost = /** @class */ (function (_super) {
        tslib_1.__extends(DomSharedStylesHost, _super);
        function DomSharedStylesHost(_doc) {
            var _this = _super.call(this) || this;
            _this._doc = _doc;
            _this._hostNodes = new Set();
            _this._styleNodes = new Set();
            _this._hostNodes.add(_doc.head);
            return _this;
        }
        DomSharedStylesHost.prototype._addStylesToHost = function (styles, host) {
            var _this = this;
            styles.forEach(function (style) {
                var styleEl = _this._doc.createElement('style');
                styleEl.textContent = style;
                _this._styleNodes.add(host.appendChild(styleEl));
            });
        };
        DomSharedStylesHost.prototype.addHost = function (hostNode) {
            this._addStylesToHost(this._stylesSet, hostNode);
            this._hostNodes.add(hostNode);
        };
        DomSharedStylesHost.prototype.removeHost = function (hostNode) {
            this._hostNodes.delete(hostNode);
        };
        DomSharedStylesHost.prototype.onStylesAdded = function (additions) {
            var _this = this;
            this._hostNodes.forEach(function (hostNode) { return _this._addStylesToHost(additions, hostNode); });
        };
        DomSharedStylesHost.prototype.ngOnDestroy = function () {
            this._styleNodes.forEach(function (styleNode) { return common["ɵgetDOM"]().remove(styleNode); });
        };
        return DomSharedStylesHost;
    }(SharedStylesHost));
    DomSharedStylesHost.decorators = [
        { type: i0.Injectable }
    ];
    DomSharedStylesHost.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: [common.DOCUMENT,] }] }
    ]; };
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var NAMESPACE_URIS = {
        'svg': 'http://www.w3.org/2000/svg',
        'xhtml': 'http://www.w3.org/1999/xhtml',
        'xlink': 'http://www.w3.org/1999/xlink',
        'xml': 'http://www.w3.org/XML/1998/namespace',
        'xmlns': 'http://www.w3.org/2000/xmlns/',
    };
    var COMPONENT_REGEX = /%COMP%/g;
    var NG_DEV_MODE = typeof ngDevMode === 'undefined' || !!ngDevMode;
    var COMPONENT_VARIABLE = '%COMP%';
    var HOST_ATTR = "_nghost-" + COMPONENT_VARIABLE;
    var CONTENT_ATTR = "_ngcontent-" + COMPONENT_VARIABLE;
    function shimContentAttribute(componentShortId) {
        return CONTENT_ATTR.replace(COMPONENT_REGEX, componentShortId);
    }
    function shimHostAttribute(componentShortId) {
        return HOST_ATTR.replace(COMPONENT_REGEX, componentShortId);
    }
    function flattenStyles(compId, styles, target) {
        for (var i = 0; i < styles.length; i++) {
            var style = styles[i];
            if (Array.isArray(style)) {
                flattenStyles(compId, style, target);
            }
            else {
                style = style.replace(COMPONENT_REGEX, compId);
                target.push(style);
            }
        }
        return target;
    }
    function decoratePreventDefault(eventHandler) {
        // `DebugNode.triggerEventHandler` needs to know if the listener was created with
        // decoratePreventDefault or is a listener added outside the Angular context so it can handle the
        // two differently. In the first case, the special '__ngUnwrap__' token is passed to the unwrap
        // the listener (see below).
        return function (event) {
            // Ivy uses '__ngUnwrap__' as a special token that allows us to unwrap the function
            // so that it can be invoked programmatically by `DebugNode.triggerEventHandler`. The debug_node
            // can inspect the listener toString contents for the existence of this special token. Because
            // the token is a string literal, it is ensured to not be modified by compiled code.
            if (event === '__ngUnwrap__') {
                return eventHandler;
            }
            var allowDefaultBehavior = eventHandler(event);
            if (allowDefaultBehavior === false) {
                // TODO(tbosch): move preventDefault into event plugins...
                event.preventDefault();
                event.returnValue = false;
            }
            return undefined;
        };
    }
    var hasLoggedNativeEncapsulationWarning = false;
    var DomRendererFactory2 = /** @class */ (function () {
        function DomRendererFactory2(eventManager, sharedStylesHost, appId) {
            this.eventManager = eventManager;
            this.sharedStylesHost = sharedStylesHost;
            this.appId = appId;
            this.rendererByCompId = new Map();
            this.defaultRenderer = new DefaultDomRenderer2(eventManager);
        }
        DomRendererFactory2.prototype.createRenderer = function (element, type) {
            if (!element || !type) {
                return this.defaultRenderer;
            }
            switch (type.encapsulation) {
                case i0.ViewEncapsulation.Emulated: {
                    var renderer = this.rendererByCompId.get(type.id);
                    if (!renderer) {
                        renderer = new EmulatedEncapsulationDomRenderer2(this.eventManager, this.sharedStylesHost, type, this.appId);
                        this.rendererByCompId.set(type.id, renderer);
                    }
                    renderer.applyToHost(element);
                    return renderer;
                }
                case 1:
                case i0.ViewEncapsulation.ShadowDom:
                    // TODO(FW-2290): remove the `case 1:` fallback logic and the warning in v12.
                    if ((typeof ngDevMode === 'undefined' || ngDevMode) &&
                        !hasLoggedNativeEncapsulationWarning && type.encapsulation === 1) {
                        hasLoggedNativeEncapsulationWarning = true;
                        console.warn('ViewEncapsulation.Native is no longer supported. Falling back to ViewEncapsulation.ShadowDom. The fallback will be removed in v12.');
                    }
                    return new ShadowDomRenderer(this.eventManager, this.sharedStylesHost, element, type);
                default: {
                    if (!this.rendererByCompId.has(type.id)) {
                        var styles = flattenStyles(type.id, type.styles, []);
                        this.sharedStylesHost.addStyles(styles);
                        this.rendererByCompId.set(type.id, this.defaultRenderer);
                    }
                    return this.defaultRenderer;
                }
            }
        };
        DomRendererFactory2.prototype.begin = function () { };
        DomRendererFactory2.prototype.end = function () { };
        return DomRendererFactory2;
    }());
    DomRendererFactory2.decorators = [
        { type: i0.Injectable }
    ];
    DomRendererFactory2.ctorParameters = function () { return [
        { type: EventManager },
        { type: DomSharedStylesHost },
        { type: String, decorators: [{ type: i0.Inject, args: [i0.APP_ID,] }] }
    ]; };
    var DefaultDomRenderer2 = /** @class */ (function () {
        function DefaultDomRenderer2(eventManager) {
            this.eventManager = eventManager;
            this.data = Object.create(null);
        }
        DefaultDomRenderer2.prototype.destroy = function () { };
        DefaultDomRenderer2.prototype.createElement = function (name, namespace) {
            if (namespace) {
                // In cases where Ivy (not ViewEngine) is giving us the actual namespace, the look up by key
                // will result in undefined, so we just return the namespace here.
                return document.createElementNS(NAMESPACE_URIS[namespace] || namespace, name);
            }
            return document.createElement(name);
        };
        DefaultDomRenderer2.prototype.createComment = function (value) {
            return document.createComment(value);
        };
        DefaultDomRenderer2.prototype.createText = function (value) {
            return document.createTextNode(value);
        };
        DefaultDomRenderer2.prototype.appendChild = function (parent, newChild) {
            parent.appendChild(newChild);
        };
        DefaultDomRenderer2.prototype.insertBefore = function (parent, newChild, refChild) {
            if (parent) {
                parent.insertBefore(newChild, refChild);
            }
        };
        DefaultDomRenderer2.prototype.removeChild = function (parent, oldChild) {
            if (parent) {
                parent.removeChild(oldChild);
            }
        };
        DefaultDomRenderer2.prototype.selectRootElement = function (selectorOrNode, preserveContent) {
            var el = typeof selectorOrNode === 'string' ? document.querySelector(selectorOrNode) :
                selectorOrNode;
            if (!el) {
                throw new Error("The selector \"" + selectorOrNode + "\" did not match any elements");
            }
            if (!preserveContent) {
                el.textContent = '';
            }
            return el;
        };
        DefaultDomRenderer2.prototype.parentNode = function (node) {
            return node.parentNode;
        };
        DefaultDomRenderer2.prototype.nextSibling = function (node) {
            return node.nextSibling;
        };
        DefaultDomRenderer2.prototype.setAttribute = function (el, name, value, namespace) {
            if (namespace) {
                name = namespace + ':' + name;
                // TODO(FW-811): Ivy may cause issues here because it's passing around
                // full URIs for namespaces, therefore this lookup will fail.
                var namespaceUri = NAMESPACE_URIS[namespace];
                if (namespaceUri) {
                    el.setAttributeNS(namespaceUri, name, value);
                }
                else {
                    el.setAttribute(name, value);
                }
            }
            else {
                el.setAttribute(name, value);
            }
        };
        DefaultDomRenderer2.prototype.removeAttribute = function (el, name, namespace) {
            if (namespace) {
                // TODO(FW-811): Ivy may cause issues here because it's passing around
                // full URIs for namespaces, therefore this lookup will fail.
                var namespaceUri = NAMESPACE_URIS[namespace];
                if (namespaceUri) {
                    el.removeAttributeNS(namespaceUri, name);
                }
                else {
                    // TODO(FW-811): Since ivy is passing around full URIs for namespaces
                    // this could result in properties like `http://www.w3.org/2000/svg:cx="123"`,
                    // which is wrong.
                    el.removeAttribute(namespace + ":" + name);
                }
            }
            else {
                el.removeAttribute(name);
            }
        };
        DefaultDomRenderer2.prototype.addClass = function (el, name) {
            el.classList.add(name);
        };
        DefaultDomRenderer2.prototype.removeClass = function (el, name) {
            el.classList.remove(name);
        };
        DefaultDomRenderer2.prototype.setStyle = function (el, style, value, flags) {
            if (flags & (i0.RendererStyleFlags2.DashCase | i0.RendererStyleFlags2.Important)) {
                el.style.setProperty(style, value, flags & i0.RendererStyleFlags2.Important ? 'important' : '');
            }
            else {
                el.style[style] = value;
            }
        };
        DefaultDomRenderer2.prototype.removeStyle = function (el, style, flags) {
            if (flags & i0.RendererStyleFlags2.DashCase) {
                el.style.removeProperty(style);
            }
            else {
                // IE requires '' instead of null
                // see https://github.com/angular/angular/issues/7916
                el.style[style] = '';
            }
        };
        DefaultDomRenderer2.prototype.setProperty = function (el, name, value) {
            NG_DEV_MODE && checkNoSyntheticProp(name, 'property');
            el[name] = value;
        };
        DefaultDomRenderer2.prototype.setValue = function (node, value) {
            node.nodeValue = value;
        };
        DefaultDomRenderer2.prototype.listen = function (target, event, callback) {
            NG_DEV_MODE && checkNoSyntheticProp(event, 'listener');
            if (typeof target === 'string') {
                return this.eventManager.addGlobalEventListener(target, event, decoratePreventDefault(callback));
            }
            return this.eventManager.addEventListener(target, event, decoratePreventDefault(callback));
        };
        return DefaultDomRenderer2;
    }());
    var ɵ0$2 = function () { return '@'.charCodeAt(0); };
    var AT_CHARCODE = (ɵ0$2)();
    function checkNoSyntheticProp(name, nameKind) {
        if (name.charCodeAt(0) === AT_CHARCODE) {
            throw new Error("Found the synthetic " + nameKind + " " + name + ". Please include either \"BrowserAnimationsModule\" or \"NoopAnimationsModule\" in your application.");
        }
    }
    var EmulatedEncapsulationDomRenderer2 = /** @class */ (function (_super) {
        tslib_1.__extends(EmulatedEncapsulationDomRenderer2, _super);
        function EmulatedEncapsulationDomRenderer2(eventManager, sharedStylesHost, component, appId) {
            var _this = _super.call(this, eventManager) || this;
            _this.component = component;
            var styles = flattenStyles(appId + '-' + component.id, component.styles, []);
            sharedStylesHost.addStyles(styles);
            _this.contentAttr = shimContentAttribute(appId + '-' + component.id);
            _this.hostAttr = shimHostAttribute(appId + '-' + component.id);
            return _this;
        }
        EmulatedEncapsulationDomRenderer2.prototype.applyToHost = function (element) {
            _super.prototype.setAttribute.call(this, element, this.hostAttr, '');
        };
        EmulatedEncapsulationDomRenderer2.prototype.createElement = function (parent, name) {
            var el = _super.prototype.createElement.call(this, parent, name);
            _super.prototype.setAttribute.call(this, el, this.contentAttr, '');
            return el;
        };
        return EmulatedEncapsulationDomRenderer2;
    }(DefaultDomRenderer2));
    var ShadowDomRenderer = /** @class */ (function (_super) {
        tslib_1.__extends(ShadowDomRenderer, _super);
        function ShadowDomRenderer(eventManager, sharedStylesHost, hostEl, component) {
            var _this = _super.call(this, eventManager) || this;
            _this.sharedStylesHost = sharedStylesHost;
            _this.hostEl = hostEl;
            _this.shadowRoot = hostEl.attachShadow({ mode: 'open' });
            _this.sharedStylesHost.addHost(_this.shadowRoot);
            var styles = flattenStyles(component.id, component.styles, []);
            for (var i = 0; i < styles.length; i++) {
                var styleEl = document.createElement('style');
                styleEl.textContent = styles[i];
                _this.shadowRoot.appendChild(styleEl);
            }
            return _this;
        }
        ShadowDomRenderer.prototype.nodeOrShadowRoot = function (node) {
            return node === this.hostEl ? this.shadowRoot : node;
        };
        ShadowDomRenderer.prototype.destroy = function () {
            this.sharedStylesHost.removeHost(this.shadowRoot);
        };
        ShadowDomRenderer.prototype.appendChild = function (parent, newChild) {
            return _super.prototype.appendChild.call(this, this.nodeOrShadowRoot(parent), newChild);
        };
        ShadowDomRenderer.prototype.insertBefore = function (parent, newChild, refChild) {
            return _super.prototype.insertBefore.call(this, this.nodeOrShadowRoot(parent), newChild, refChild);
        };
        ShadowDomRenderer.prototype.removeChild = function (parent, oldChild) {
            return _super.prototype.removeChild.call(this, this.nodeOrShadowRoot(parent), oldChild);
        };
        ShadowDomRenderer.prototype.parentNode = function (node) {
            return this.nodeOrShadowRoot(_super.prototype.parentNode.call(this, this.nodeOrShadowRoot(node)));
        };
        return ShadowDomRenderer;
    }(DefaultDomRenderer2));
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var DomEventsPlugin = /** @class */ (function (_super) {
        tslib_1.__extends(DomEventsPlugin, _super);
        function DomEventsPlugin(doc) {
            return _super.call(this, doc) || this;
        }
        // This plugin should come last in the list of plugins, because it accepts all
        // events.
        DomEventsPlugin.prototype.supports = function (eventName) {
            return true;
        };
        DomEventsPlugin.prototype.addEventListener = function (element, eventName, handler) {
            var _this = this;
            element.addEventListener(eventName, handler, false);
            return function () { return _this.removeEventListener(element, eventName, handler); };
        };
        DomEventsPlugin.prototype.removeEventListener = function (target, eventName, callback) {
            return target.removeEventListener(eventName, callback);
        };
        return DomEventsPlugin;
    }(EventManagerPlugin));
    DomEventsPlugin.decorators = [
        { type: i0.Injectable }
    ];
    DomEventsPlugin.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: [common.DOCUMENT,] }] }
    ]; };
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Supported HammerJS recognizer event names.
     */
    var EVENT_NAMES = {
        // pan
        'pan': true,
        'panstart': true,
        'panmove': true,
        'panend': true,
        'pancancel': true,
        'panleft': true,
        'panright': true,
        'panup': true,
        'pandown': true,
        // pinch
        'pinch': true,
        'pinchstart': true,
        'pinchmove': true,
        'pinchend': true,
        'pinchcancel': true,
        'pinchin': true,
        'pinchout': true,
        // press
        'press': true,
        'pressup': true,
        // rotate
        'rotate': true,
        'rotatestart': true,
        'rotatemove': true,
        'rotateend': true,
        'rotatecancel': true,
        // swipe
        'swipe': true,
        'swipeleft': true,
        'swiperight': true,
        'swipeup': true,
        'swipedown': true,
        // tap
        'tap': true,
    };
    /**
     * DI token for providing [HammerJS](https://hammerjs.github.io/) support to Angular.
     * @see `HammerGestureConfig`
     *
     * @ngModule HammerModule
     * @publicApi
     */
    var HAMMER_GESTURE_CONFIG = new i0.InjectionToken('HammerGestureConfig');
    /**
     * Injection token used to provide a {@link HammerLoader} to Angular.
     *
     * @publicApi
     */
    var HAMMER_LOADER = new i0.InjectionToken('HammerLoader');
    /**
     * An injectable [HammerJS Manager](https://hammerjs.github.io/api/#hammermanager)
     * for gesture recognition. Configures specific event recognition.
     * @publicApi
     */
    var HammerGestureConfig = /** @class */ (function () {
        function HammerGestureConfig() {
            /**
             * A set of supported event names for gestures to be used in Angular.
             * Angular supports all built-in recognizers, as listed in
             * [HammerJS documentation](https://hammerjs.github.io/).
             */
            this.events = [];
            /**
             * Maps gesture event names to a set of configuration options
             * that specify overrides to the default values for specific properties.
             *
             * The key is a supported event name to be configured,
             * and the options object contains a set of properties, with override values
             * to be applied to the named recognizer event.
             * For example, to disable recognition of the rotate event, specify
             *  `{"rotate": {"enable": false}}`.
             *
             * Properties that are not present take the HammerJS default values.
             * For information about which properties are supported for which events,
             * and their allowed and default values, see
             * [HammerJS documentation](https://hammerjs.github.io/).
             *
             */
            this.overrides = {};
        }
        /**
         * Creates a [HammerJS Manager](https://hammerjs.github.io/api/#hammermanager)
         * and attaches it to a given HTML element.
         * @param element The element that will recognize gestures.
         * @returns A HammerJS event-manager object.
         */
        HammerGestureConfig.prototype.buildHammer = function (element) {
            var mc = new Hammer(element, this.options);
            mc.get('pinch').set({ enable: true });
            mc.get('rotate').set({ enable: true });
            for (var eventName in this.overrides) {
                mc.get(eventName).set(this.overrides[eventName]);
            }
            return mc;
        };
        return HammerGestureConfig;
    }());
    HammerGestureConfig.decorators = [
        { type: i0.Injectable }
    ];
    /**
     * Event plugin that adds Hammer support to an application.
     *
     * @ngModule HammerModule
     */
    var HammerGesturesPlugin = /** @class */ (function (_super) {
        tslib_1.__extends(HammerGesturesPlugin, _super);
        function HammerGesturesPlugin(doc, _config, console, loader) {
            var _this = _super.call(this, doc) || this;
            _this._config = _config;
            _this.console = console;
            _this.loader = loader;
            return _this;
        }
        HammerGesturesPlugin.prototype.supports = function (eventName) {
            if (!EVENT_NAMES.hasOwnProperty(eventName.toLowerCase()) && !this.isCustomEvent(eventName)) {
                return false;
            }
            if (!window.Hammer && !this.loader) {
                this.console.warn("The \"" + eventName + "\" event cannot be bound because Hammer.JS is not " +
                    "loaded and no custom loader has been specified.");
                return false;
            }
            return true;
        };
        HammerGesturesPlugin.prototype.addEventListener = function (element, eventName, handler) {
            var _this = this;
            var zone = this.manager.getZone();
            eventName = eventName.toLowerCase();
            // If Hammer is not present but a loader is specified, we defer adding the event listener
            // until Hammer is loaded.
            if (!window.Hammer && this.loader) {
                // This `addEventListener` method returns a function to remove the added listener.
                // Until Hammer is loaded, the returned function needs to *cancel* the registration rather
                // than remove anything.
                var cancelRegistration_1 = false;
                var deregister_1 = function () {
                    cancelRegistration_1 = true;
                };
                this.loader()
                    .then(function () {
                    // If Hammer isn't actually loaded when the custom loader resolves, give up.
                    if (!window.Hammer) {
                        _this.console.warn("The custom HAMMER_LOADER completed, but Hammer.JS is not present.");
                        deregister_1 = function () { };
                        return;
                    }
                    if (!cancelRegistration_1) {
                        // Now that Hammer is loaded and the listener is being loaded for real,
                        // the deregistration function changes from canceling registration to removal.
                        deregister_1 = _this.addEventListener(element, eventName, handler);
                    }
                })
                    .catch(function () {
                    _this.console.warn("The \"" + eventName + "\" event cannot be bound because the custom " +
                        "Hammer.JS loader failed.");
                    deregister_1 = function () { };
                });
                // Return a function that *executes* `deregister` (and not `deregister` itself) so that we
                // can change the behavior of `deregister` once the listener is added. Using a closure in
                // this way allows us to avoid any additional data structures to track listener removal.
                return function () {
                    deregister_1();
                };
            }
            return zone.runOutsideAngular(function () {
                // Creating the manager bind events, must be done outside of angular
                var mc = _this._config.buildHammer(element);
                var callback = function (eventObj) {
                    zone.runGuarded(function () {
                        handler(eventObj);
                    });
                };
                mc.on(eventName, callback);
                return function () {
                    mc.off(eventName, callback);
                    // destroy mc to prevent memory leak
                    if (typeof mc.destroy === 'function') {
                        mc.destroy();
                    }
                };
            });
        };
        HammerGesturesPlugin.prototype.isCustomEvent = function (eventName) {
            return this._config.events.indexOf(eventName) > -1;
        };
        return HammerGesturesPlugin;
    }(EventManagerPlugin));
    HammerGesturesPlugin.decorators = [
        { type: i0.Injectable }
    ];
    HammerGesturesPlugin.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: [common.DOCUMENT,] }] },
        { type: HammerGestureConfig, decorators: [{ type: i0.Inject, args: [HAMMER_GESTURE_CONFIG,] }] },
        { type: i0["ɵConsole"] },
        { type: undefined, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [HAMMER_LOADER,] }] }
    ]; };
    /**
     * In Ivy, support for Hammer gestures is optional, so applications must
     * import the `HammerModule` at root to turn on support. This means that
     * Hammer-specific code can be tree-shaken away if not needed.
     */
    var HAMMER_PROVIDERS__POST_R3__ = [];
    /**
     * In View Engine, support for Hammer gestures is built-in by default.
     */
    var HAMMER_PROVIDERS__PRE_R3__ = [
        {
            provide: EVENT_MANAGER_PLUGINS,
            useClass: HammerGesturesPlugin,
            multi: true,
            deps: [common.DOCUMENT, HAMMER_GESTURE_CONFIG, i0["ɵConsole"], [new i0.Optional(), HAMMER_LOADER]]
        },
        { provide: HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig, deps: [] },
    ];
    var HAMMER_PROVIDERS = HAMMER_PROVIDERS__PRE_R3__;
    /**
     * Adds support for HammerJS.
     *
     * Import this module at the root of your application so that Angular can work with
     * HammerJS to detect gesture events.
     *
     * Note that applications still need to include the HammerJS script itself. This module
     * simply sets up the coordination layer between HammerJS and Angular's EventManager.
     *
     * @publicApi
     */
    var HammerModule = /** @class */ (function () {
        function HammerModule() {
        }
        return HammerModule;
    }());
    HammerModule.decorators = [
        { type: i0.NgModule, args: [{ providers: HAMMER_PROVIDERS__PRE_R3__ },] }
    ];
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Defines supported modifiers for key events.
     */
    var MODIFIER_KEYS = ['alt', 'control', 'meta', 'shift'];
    var DOM_KEY_LOCATION_NUMPAD = 3;
    // Map to convert some key or keyIdentifier values to what will be returned by getEventKey
    var _keyMap = {
        // The following values are here for cross-browser compatibility and to match the W3C standard
        // cf https://www.w3.org/TR/DOM-Level-3-Events-key/
        '\b': 'Backspace',
        '\t': 'Tab',
        '\x7F': 'Delete',
        '\x1B': 'Escape',
        'Del': 'Delete',
        'Esc': 'Escape',
        'Left': 'ArrowLeft',
        'Right': 'ArrowRight',
        'Up': 'ArrowUp',
        'Down': 'ArrowDown',
        'Menu': 'ContextMenu',
        'Scroll': 'ScrollLock',
        'Win': 'OS'
    };
    // There is a bug in Chrome for numeric keypad keys:
    // https://code.google.com/p/chromium/issues/detail?id=155654
    // 1, 2, 3 ... are reported as A, B, C ...
    var _chromeNumKeyPadMap = {
        'A': '1',
        'B': '2',
        'C': '3',
        'D': '4',
        'E': '5',
        'F': '6',
        'G': '7',
        'H': '8',
        'I': '9',
        'J': '*',
        'K': '+',
        'M': '-',
        'N': '.',
        'O': '/',
        '\x60': '0',
        '\x90': 'NumLock'
    };
    var ɵ0$3 = function (event) { return event.altKey; }, ɵ1 = function (event) { return event.ctrlKey; }, ɵ2 = function (event) { return event.metaKey; }, ɵ3 = function (event) { return event.shiftKey; };
    /**
     * Retrieves modifiers from key-event objects.
     */
    var MODIFIER_KEY_GETTERS = {
        'alt': ɵ0$3,
        'control': ɵ1,
        'meta': ɵ2,
        'shift': ɵ3
    };
    /**
     * @publicApi
     * A browser plug-in that provides support for handling of key events in Angular.
     */
    var KeyEventsPlugin = /** @class */ (function (_super) {
        tslib_1.__extends(KeyEventsPlugin, _super);
        /**
         * Initializes an instance of the browser plug-in.
         * @param doc The document in which key events will be detected.
         */
        function KeyEventsPlugin(doc) {
            return _super.call(this, doc) || this;
        }
        /**
         * Reports whether a named key event is supported.
         * @param eventName The event name to query.
         * @return True if the named key event is supported.
         */
        KeyEventsPlugin.prototype.supports = function (eventName) {
            return KeyEventsPlugin.parseEventName(eventName) != null;
        };
        /**
         * Registers a handler for a specific element and key event.
         * @param element The HTML element to receive event notifications.
         * @param eventName The name of the key event to listen for.
         * @param handler A function to call when the notification occurs. Receives the
         * event object as an argument.
         * @returns The key event that was registered.
         */
        KeyEventsPlugin.prototype.addEventListener = function (element, eventName, handler) {
            var parsedEvent = KeyEventsPlugin.parseEventName(eventName);
            var outsideHandler = KeyEventsPlugin.eventCallback(parsedEvent['fullKey'], handler, this.manager.getZone());
            return this.manager.getZone().runOutsideAngular(function () {
                return common["ɵgetDOM"]().onAndCancel(element, parsedEvent['domEventName'], outsideHandler);
            });
        };
        KeyEventsPlugin.parseEventName = function (eventName) {
            var parts = eventName.toLowerCase().split('.');
            var domEventName = parts.shift();
            if ((parts.length === 0) || !(domEventName === 'keydown' || domEventName === 'keyup')) {
                return null;
            }
            var key = KeyEventsPlugin._normalizeKey(parts.pop());
            var fullKey = '';
            MODIFIER_KEYS.forEach(function (modifierName) {
                var index = parts.indexOf(modifierName);
                if (index > -1) {
                    parts.splice(index, 1);
                    fullKey += modifierName + '.';
                }
            });
            fullKey += key;
            if (parts.length != 0 || key.length === 0) {
                // returning null instead of throwing to let another plugin process the event
                return null;
            }
            // NOTE: Please don't rewrite this as so, as it will break JSCompiler property renaming.
            //       The code must remain in the `result['domEventName']` form.
            // return {domEventName, fullKey};
            var result = {};
            result['domEventName'] = domEventName;
            result['fullKey'] = fullKey;
            return result;
        };
        KeyEventsPlugin.getEventFullKey = function (event) {
            var fullKey = '';
            var key = getEventKey(event);
            key = key.toLowerCase();
            if (key === ' ') {
                key = 'space'; // for readability
            }
            else if (key === '.') {
                key = 'dot'; // because '.' is used as a separator in event names
            }
            MODIFIER_KEYS.forEach(function (modifierName) {
                if (modifierName != key) {
                    var modifierGetter = MODIFIER_KEY_GETTERS[modifierName];
                    if (modifierGetter(event)) {
                        fullKey += modifierName + '.';
                    }
                }
            });
            fullKey += key;
            return fullKey;
        };
        /**
         * Configures a handler callback for a key event.
         * @param fullKey The event name that combines all simultaneous keystrokes.
         * @param handler The function that responds to the key event.
         * @param zone The zone in which the event occurred.
         * @returns A callback function.
         */
        KeyEventsPlugin.eventCallback = function (fullKey, handler, zone) {
            return function (event /** TODO #9100 */) {
                if (KeyEventsPlugin.getEventFullKey(event) === fullKey) {
                    zone.runGuarded(function () { return handler(event); });
                }
            };
        };
        /** @internal */
        KeyEventsPlugin._normalizeKey = function (keyName) {
            // TODO: switch to a Map if the mapping grows too much
            switch (keyName) {
                case 'esc':
                    return 'escape';
                default:
                    return keyName;
            }
        };
        return KeyEventsPlugin;
    }(EventManagerPlugin));
    KeyEventsPlugin.decorators = [
        { type: i0.Injectable }
    ];
    KeyEventsPlugin.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: [common.DOCUMENT,] }] }
    ]; };
    function getEventKey(event) {
        var key = event.key;
        if (key == null) {
            key = event.keyIdentifier;
            // keyIdentifier is defined in the old draft of DOM Level 3 Events implemented by Chrome and
            // Safari cf
            // https://www.w3.org/TR/2007/WD-DOM-Level-3-Events-20071221/events.html#Events-KeyboardEvents-Interfaces
            if (key == null) {
                return 'Unidentified';
            }
            if (key.startsWith('U+')) {
                key = String.fromCharCode(parseInt(key.substring(2), 16));
                if (event.location === DOM_KEY_LOCATION_NUMPAD && _chromeNumKeyPadMap.hasOwnProperty(key)) {
                    // There is a bug in Chrome for numeric keypad keys:
                    // https://code.google.com/p/chromium/issues/detail?id=155654
                    // 1, 2, 3 ... are reported as A, B, C ...
                    key = _chromeNumKeyPadMap[key];
                }
            }
        }
        return _keyMap[key] || key;
    }
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * DomSanitizer helps preventing Cross Site Scripting Security bugs (XSS) by sanitizing
     * values to be safe to use in the different DOM contexts.
     *
     * For example, when binding a URL in an `<a [href]="someValue">` hyperlink, `someValue` will be
     * sanitized so that an attacker cannot inject e.g. a `javascript:` URL that would execute code on
     * the website.
     *
     * In specific situations, it might be necessary to disable sanitization, for example if the
     * application genuinely needs to produce a `javascript:` style link with a dynamic value in it.
     * Users can bypass security by constructing a value with one of the `bypassSecurityTrust...`
     * methods, and then binding to that value from the template.
     *
     * These situations should be very rare, and extraordinary care must be taken to avoid creating a
     * Cross Site Scripting (XSS) security bug!
     *
     * When using `bypassSecurityTrust...`, make sure to call the method as early as possible and as
     * close as possible to the source of the value, to make it easy to verify no security bug is
     * created by its use.
     *
     * It is not required (and not recommended) to bypass security if the value is safe, e.g. a URL that
     * does not start with a suspicious protocol, or an HTML snippet that does not contain dangerous
     * code. The sanitizer leaves safe values intact.
     *
     * @security Calling any of the `bypassSecurityTrust...` APIs disables Angular's built-in
     * sanitization for the value passed in. Carefully check and audit all values and code paths going
     * into this call. Make sure any user data is appropriately escaped for this security context.
     * For more detail, see the [Security Guide](https://g.co/ng/security).
     *
     * @publicApi
     */
    var DomSanitizer = /** @class */ (function () {
        function DomSanitizer() {
        }
        return DomSanitizer;
    }());
    DomSanitizer.ɵprov = i0["ɵɵdefineInjectable"]({ factory: function DomSanitizer_Factory() { return i0["ɵɵinject"](DomSanitizerImpl); }, token: DomSanitizer, providedIn: "root" });
    DomSanitizer.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root', useExisting: i0.forwardRef(function () { return DomSanitizerImpl; }) },] }
    ];
    function domSanitizerImplFactory(injector) {
        return new DomSanitizerImpl(injector.get(common.DOCUMENT));
    }
    var DomSanitizerImpl = /** @class */ (function (_super) {
        tslib_1.__extends(DomSanitizerImpl, _super);
        function DomSanitizerImpl(_doc) {
            var _this = _super.call(this) || this;
            _this._doc = _doc;
            return _this;
        }
        DomSanitizerImpl.prototype.sanitize = function (ctx, value) {
            if (value == null)
                return null;
            switch (ctx) {
                case i0.SecurityContext.NONE:
                    return value;
                case i0.SecurityContext.HTML:
                    if (i0["ɵallowSanitizationBypassAndThrow"](value, "HTML" /* Html */)) {
                        return i0["ɵunwrapSafeValue"](value);
                    }
                    return i0["ɵ_sanitizeHtml"](this._doc, String(value));
                case i0.SecurityContext.STYLE:
                    if (i0["ɵallowSanitizationBypassAndThrow"](value, "Style" /* Style */)) {
                        return i0["ɵunwrapSafeValue"](value);
                    }
                    return value;
                case i0.SecurityContext.SCRIPT:
                    if (i0["ɵallowSanitizationBypassAndThrow"](value, "Script" /* Script */)) {
                        return i0["ɵunwrapSafeValue"](value);
                    }
                    throw new Error('unsafe value used in a script context');
                case i0.SecurityContext.URL:
                    var type = i0["ɵgetSanitizationBypassType"](value);
                    if (i0["ɵallowSanitizationBypassAndThrow"](value, "URL" /* Url */)) {
                        return i0["ɵunwrapSafeValue"](value);
                    }
                    return i0["ɵ_sanitizeUrl"](String(value));
                case i0.SecurityContext.RESOURCE_URL:
                    if (i0["ɵallowSanitizationBypassAndThrow"](value, "ResourceURL" /* ResourceUrl */)) {
                        return i0["ɵunwrapSafeValue"](value);
                    }
                    throw new Error('unsafe value used in a resource URL context (see https://g.co/ng/security#xss)');
                default:
                    throw new Error("Unexpected SecurityContext " + ctx + " (see https://g.co/ng/security#xss)");
            }
        };
        DomSanitizerImpl.prototype.bypassSecurityTrustHtml = function (value) {
            return i0["ɵbypassSanitizationTrustHtml"](value);
        };
        DomSanitizerImpl.prototype.bypassSecurityTrustStyle = function (value) {
            return i0["ɵbypassSanitizationTrustStyle"](value);
        };
        DomSanitizerImpl.prototype.bypassSecurityTrustScript = function (value) {
            return i0["ɵbypassSanitizationTrustScript"](value);
        };
        DomSanitizerImpl.prototype.bypassSecurityTrustUrl = function (value) {
            return i0["ɵbypassSanitizationTrustUrl"](value);
        };
        DomSanitizerImpl.prototype.bypassSecurityTrustResourceUrl = function (value) {
            return i0["ɵbypassSanitizationTrustResourceUrl"](value);
        };
        return DomSanitizerImpl;
    }(DomSanitizer));
    DomSanitizerImpl.ɵprov = i0["ɵɵdefineInjectable"]({ factory: function DomSanitizerImpl_Factory() { return domSanitizerImplFactory(i0["ɵɵinject"](i0.INJECTOR)); }, token: DomSanitizerImpl, providedIn: "root" });
    DomSanitizerImpl.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root', useFactory: domSanitizerImplFactory, deps: [i0.Injector] },] }
    ];
    DomSanitizerImpl.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: [common.DOCUMENT,] }] }
    ]; };
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function initDomAdapter() {
        BrowserDomAdapter.makeCurrent();
        BrowserGetTestability.init();
    }
    function errorHandler() {
        return new i0.ErrorHandler();
    }
    function _document() {
        // Tell ivy about the global document
        i0["ɵsetDocument"](document);
        return document;
    }
    var ɵ0$4 = common["ɵPLATFORM_BROWSER_ID"];
    var INTERNAL_BROWSER_PLATFORM_PROVIDERS = [
        { provide: i0.PLATFORM_ID, useValue: ɵ0$4 },
        { provide: i0.PLATFORM_INITIALIZER, useValue: initDomAdapter, multi: true },
        { provide: common.DOCUMENT, useFactory: _document, deps: [] },
    ];
    var BROWSER_SANITIZATION_PROVIDERS__PRE_R3__ = [
        { provide: i0.Sanitizer, useExisting: DomSanitizer },
        { provide: DomSanitizer, useClass: DomSanitizerImpl, deps: [common.DOCUMENT] },
    ];
    var BROWSER_SANITIZATION_PROVIDERS__POST_R3__ = [];
    /**
     * @security Replacing built-in sanitization providers exposes the application to XSS risks.
     * Attacker-controlled data introduced by an unsanitized provider could expose your
     * application to XSS risks. For more detail, see the [Security Guide](https://g.co/ng/security).
     * @publicApi
     */
    var BROWSER_SANITIZATION_PROVIDERS = BROWSER_SANITIZATION_PROVIDERS__PRE_R3__;
    /**
     * A factory function that returns a `PlatformRef` instance associated with browser service
     * providers.
     *
     * @publicApi
     */
    var platformBrowser = i0.createPlatformFactory(i0.platformCore, 'browser', INTERNAL_BROWSER_PLATFORM_PROVIDERS);
    var BROWSER_MODULE_PROVIDERS = [
        BROWSER_SANITIZATION_PROVIDERS,
        { provide: i0["ɵINJECTOR_SCOPE"], useValue: 'root' },
        { provide: i0.ErrorHandler, useFactory: errorHandler, deps: [] },
        {
            provide: EVENT_MANAGER_PLUGINS,
            useClass: DomEventsPlugin,
            multi: true,
            deps: [common.DOCUMENT, i0.NgZone, i0.PLATFORM_ID]
        },
        { provide: EVENT_MANAGER_PLUGINS, useClass: KeyEventsPlugin, multi: true, deps: [common.DOCUMENT] },
        HAMMER_PROVIDERS,
        {
            provide: DomRendererFactory2,
            useClass: DomRendererFactory2,
            deps: [EventManager, DomSharedStylesHost, i0.APP_ID]
        },
        { provide: i0.RendererFactory2, useExisting: DomRendererFactory2 },
        { provide: SharedStylesHost, useExisting: DomSharedStylesHost },
        { provide: DomSharedStylesHost, useClass: DomSharedStylesHost, deps: [common.DOCUMENT] },
        { provide: i0.Testability, useClass: i0.Testability, deps: [i0.NgZone] },
        { provide: EventManager, useClass: EventManager, deps: [EVENT_MANAGER_PLUGINS, i0.NgZone] },
        ELEMENT_PROBE_PROVIDERS,
    ];
    /**
     * Exports required infrastructure for all Angular apps.
     * Included by default in all Angular apps created with the CLI
     * `new` command.
     * Re-exports `CommonModule` and `ApplicationModule`, making their
     * exports and providers available to all apps.
     *
     * @publicApi
     */
    var BrowserModule = /** @class */ (function () {
        function BrowserModule(parentModule) {
            if (parentModule) {
                throw new Error("BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.");
            }
        }
        /**
         * Configures a browser-based app to transition from a server-rendered app, if
         * one is present on the page.
         *
         * @param params An object containing an identifier for the app to transition.
         * The ID must match between the client and server versions of the app.
         * @returns The reconfigured `BrowserModule` to import into the app's root `AppModule`.
         */
        BrowserModule.withServerTransition = function (params) {
            return {
                ngModule: BrowserModule,
                providers: [
                    { provide: i0.APP_ID, useValue: params.appId },
                    { provide: TRANSITION_ID, useExisting: i0.APP_ID },
                    SERVER_TRANSITION_PROVIDERS,
                ],
            };
        };
        return BrowserModule;
    }());
    BrowserModule.decorators = [
        { type: i0.NgModule, args: [{ providers: BROWSER_MODULE_PROVIDERS, exports: [common.CommonModule, i0.ApplicationModule] },] }
    ];
    BrowserModule.ctorParameters = function () { return [
        { type: BrowserModule, decorators: [{ type: i0.Optional }, { type: i0.SkipSelf }, { type: i0.Inject, args: [BrowserModule,] }] }
    ]; };
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Factory to create a `Meta` service instance for the current DOM document.
     */
    function createMeta() {
        return new Meta(i0["ɵɵinject"](common.DOCUMENT));
    }
    /**
     * A service for managing HTML `<meta>` tags.
     *
     * Properties of the `MetaDefinition` object match the attributes of the
     * HTML `<meta>` tag. These tags define document metadata that is important for
     * things like configuring a Content Security Policy, defining browser compatibility
     * and security settings, setting HTTP Headers, defining rich content for social sharing,
     * and Search Engine Optimization (SEO).
     *
     * To identify specific `<meta>` tags in a document, use an attribute selection
     * string in the format `"tag_attribute='value string'"`.
     * For example, an `attrSelector` value of `"name='description'"` matches a tag
     * whose `name` attribute has the value `"description"`.
     * Selectors are used with the `querySelector()` Document method,
     * in the format `meta[{attrSelector}]`.
     *
     * @see [HTML meta tag](https://developer.mozilla.org/docs/Web/HTML/Element/meta)
     * @see [Document.querySelector()](https://developer.mozilla.org/docs/Web/API/Document/querySelector)
     *
     *
     * @publicApi
     */
    var Meta = /** @class */ (function () {
        function Meta(_doc) {
            this._doc = _doc;
            this._dom = common["ɵgetDOM"]();
        }
        /**
         * Retrieves or creates a specific `<meta>` tag element in the current HTML document.
         * In searching for an existing tag, Angular attempts to match the `name` or `property` attribute
         * values in the provided tag definition, and verifies that all other attribute values are equal.
         * If an existing element is found, it is returned and is not modified in any way.
         * @param tag The definition of a `<meta>` element to match or create.
         * @param forceCreation True to create a new element without checking whether one already exists.
         * @returns The existing element with the same attributes and values if found,
         * the new element if no match is found, or `null` if the tag parameter is not defined.
         */
        Meta.prototype.addTag = function (tag, forceCreation) {
            if (forceCreation === void 0) { forceCreation = false; }
            if (!tag)
                return null;
            return this._getOrCreateElement(tag, forceCreation);
        };
        /**
         * Retrieves or creates a set of `<meta>` tag elements in the current HTML document.
         * In searching for an existing tag, Angular attempts to match the `name` or `property` attribute
         * values in the provided tag definition, and verifies that all other attribute values are equal.
         * @param tags An array of tag definitions to match or create.
         * @param forceCreation True to create new elements without checking whether they already exist.
         * @returns The matching elements if found, or the new elements.
         */
        Meta.prototype.addTags = function (tags, forceCreation) {
            var _this = this;
            if (forceCreation === void 0) { forceCreation = false; }
            if (!tags)
                return [];
            return tags.reduce(function (result, tag) {
                if (tag) {
                    result.push(_this._getOrCreateElement(tag, forceCreation));
                }
                return result;
            }, []);
        };
        /**
         * Retrieves a `<meta>` tag element in the current HTML document.
         * @param attrSelector The tag attribute and value to match against, in the format
         * `"tag_attribute='value string'"`.
         * @returns The matching element, if any.
         */
        Meta.prototype.getTag = function (attrSelector) {
            if (!attrSelector)
                return null;
            return this._doc.querySelector("meta[" + attrSelector + "]") || null;
        };
        /**
         * Retrieves a set of `<meta>` tag elements in the current HTML document.
         * @param attrSelector The tag attribute and value to match against, in the format
         * `"tag_attribute='value string'"`.
         * @returns The matching elements, if any.
         */
        Meta.prototype.getTags = function (attrSelector) {
            if (!attrSelector)
                return [];
            var list /*NodeList*/ = this._doc.querySelectorAll("meta[" + attrSelector + "]");
            return list ? [].slice.call(list) : [];
        };
        /**
         * Modifies an existing `<meta>` tag element in the current HTML document.
         * @param tag The tag description with which to replace the existing tag content.
         * @param selector A tag attribute and value to match against, to identify
         * an existing tag. A string in the format `"tag_attribute=`value string`"`.
         * If not supplied, matches a tag with the same `name` or `property` attribute value as the
         * replacement tag.
         * @return The modified element.
         */
        Meta.prototype.updateTag = function (tag, selector) {
            if (!tag)
                return null;
            selector = selector || this._parseSelector(tag);
            var meta = this.getTag(selector);
            if (meta) {
                return this._setMetaElementAttributes(tag, meta);
            }
            return this._getOrCreateElement(tag, true);
        };
        /**
         * Removes an existing `<meta>` tag element from the current HTML document.
         * @param attrSelector A tag attribute and value to match against, to identify
         * an existing tag. A string in the format `"tag_attribute=`value string`"`.
         */
        Meta.prototype.removeTag = function (attrSelector) {
            this.removeTagElement(this.getTag(attrSelector));
        };
        /**
         * Removes an existing `<meta>` tag element from the current HTML document.
         * @param meta The tag definition to match against to identify an existing tag.
         */
        Meta.prototype.removeTagElement = function (meta) {
            if (meta) {
                this._dom.remove(meta);
            }
        };
        Meta.prototype._getOrCreateElement = function (meta, forceCreation) {
            if (forceCreation === void 0) { forceCreation = false; }
            if (!forceCreation) {
                var selector = this._parseSelector(meta);
                var elem = this.getTag(selector);
                // It's allowed to have multiple elements with the same name so it's not enough to
                // just check that element with the same name already present on the page. We also need to
                // check if element has tag attributes
                if (elem && this._containsAttributes(meta, elem))
                    return elem;
            }
            var element = this._dom.createElement('meta');
            this._setMetaElementAttributes(meta, element);
            var head = this._doc.getElementsByTagName('head')[0];
            head.appendChild(element);
            return element;
        };
        Meta.prototype._setMetaElementAttributes = function (tag, el) {
            var _this = this;
            Object.keys(tag).forEach(function (prop) { return el.setAttribute(_this._getMetaKeyMap(prop), tag[prop]); });
            return el;
        };
        Meta.prototype._parseSelector = function (tag) {
            var attr = tag.name ? 'name' : 'property';
            return attr + "=\"" + tag[attr] + "\"";
        };
        Meta.prototype._containsAttributes = function (tag, elem) {
            var _this = this;
            return Object.keys(tag).every(function (key) { return elem.getAttribute(_this._getMetaKeyMap(key)) === tag[key]; });
        };
        Meta.prototype._getMetaKeyMap = function (prop) {
            return META_KEYS_MAP[prop] || prop;
        };
        return Meta;
    }());
    Meta.ɵprov = i0["ɵɵdefineInjectable"]({ factory: createMeta, token: Meta, providedIn: "root" });
    Meta.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root', useFactory: createMeta, deps: [] },] }
    ];
    Meta.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: [common.DOCUMENT,] }] }
    ]; };
    /**
     * Mapping for MetaDefinition properties with their correct meta attribute names
     */
    var META_KEYS_MAP = {
        httpEquiv: 'http-equiv'
    };
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Factory to create Title service.
     */
    function createTitle() {
        return new Title(i0["ɵɵinject"](common.DOCUMENT));
    }
    /**
     * A service that can be used to get and set the title of a current HTML document.
     *
     * Since an Angular application can't be bootstrapped on the entire HTML document (`<html>` tag)
     * it is not possible to bind to the `text` property of the `HTMLTitleElement` elements
     * (representing the `<title>` tag). Instead, this service can be used to set and get the current
     * title value.
     *
     * @publicApi
     */
    var Title = /** @class */ (function () {
        function Title(_doc) {
            this._doc = _doc;
        }
        /**
         * Get the title of the current HTML document.
         */
        Title.prototype.getTitle = function () {
            return this._doc.title;
        };
        /**
         * Set the title of the current HTML document.
         * @param newTitle
         */
        Title.prototype.setTitle = function (newTitle) {
            this._doc.title = newTitle || '';
        };
        return Title;
    }());
    Title.ɵprov = i0["ɵɵdefineInjectable"]({ factory: createTitle, token: Title, providedIn: "root" });
    Title.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root', useFactory: createTitle, deps: [] },] }
    ];
    Title.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: [common.DOCUMENT,] }] }
    ]; };
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var win = typeof window !== 'undefined' && window || {};
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var ChangeDetectionPerfRecord = /** @class */ (function () {
        function ChangeDetectionPerfRecord(msPerTick, numTicks) {
            this.msPerTick = msPerTick;
            this.numTicks = numTicks;
        }
        return ChangeDetectionPerfRecord;
    }());
    /**
     * Entry point for all Angular profiling-related debug tools. This object
     * corresponds to the `ng.profiler` in the dev console.
     */
    var AngularProfiler = /** @class */ (function () {
        function AngularProfiler(ref) {
            this.appRef = ref.injector.get(i0.ApplicationRef);
        }
        // tslint:disable:no-console
        /**
         * Exercises change detection in a loop and then prints the average amount of
         * time in milliseconds how long a single round of change detection takes for
         * the current state of the UI. It runs a minimum of 5 rounds for a minimum
         * of 500 milliseconds.
         *
         * Optionally, a user may pass a `config` parameter containing a map of
         * options. Supported options are:
         *
         * `record` (boolean) - causes the profiler to record a CPU profile while
         * it exercises the change detector. Example:
         *
         * ```
         * ng.profiler.timeChangeDetection({record: true})
         * ```
         */
        AngularProfiler.prototype.timeChangeDetection = function (config) {
            var record = config && config['record'];
            var profileName = 'Change Detection';
            // Profiler is not available in Android browsers without dev tools opened
            var isProfilerAvailable = win.console.profile != null;
            if (record && isProfilerAvailable) {
                win.console.profile(profileName);
            }
            var start = common["ɵgetDOM"]().performanceNow();
            var numTicks = 0;
            while (numTicks < 5 || (common["ɵgetDOM"]().performanceNow() - start) < 500) {
                this.appRef.tick();
                numTicks++;
            }
            var end = common["ɵgetDOM"]().performanceNow();
            if (record && isProfilerAvailable) {
                win.console.profileEnd(profileName);
            }
            var msPerTick = (end - start) / numTicks;
            win.console.log("ran " + numTicks + " change detection cycles");
            win.console.log(msPerTick.toFixed(2) + " ms per check");
            return new ChangeDetectionPerfRecord(msPerTick, numTicks);
        };
        return AngularProfiler;
    }());
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var PROFILER_GLOBAL_NAME = 'profiler';
    /**
     * Enabled Angular debug tools that are accessible via your browser's
     * developer console.
     *
     * Usage:
     *
     * 1. Open developer console (e.g. in Chrome Ctrl + Shift + j)
     * 1. Type `ng.` (usually the console will show auto-complete suggestion)
     * 1. Try the change detection profiler `ng.profiler.timeChangeDetection()`
     *    then hit Enter.
     *
     * @publicApi
     */
    function enableDebugTools(ref) {
        exportNgVar(PROFILER_GLOBAL_NAME, new AngularProfiler(ref));
        return ref;
    }
    /**
     * Disables Angular tools.
     *
     * @publicApi
     */
    function disableDebugTools() {
        exportNgVar(PROFILER_GLOBAL_NAME, null);
    }
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function escapeHtml(text) {
        var escapedText = {
            '&': '&a;',
            '"': '&q;',
            '\'': '&s;',
            '<': '&l;',
            '>': '&g;',
        };
        return text.replace(/[&"'<>]/g, function (s) { return escapedText[s]; });
    }
    function unescapeHtml(text) {
        var unescapedText = {
            '&a;': '&',
            '&q;': '"',
            '&s;': '\'',
            '&l;': '<',
            '&g;': '>',
        };
        return text.replace(/&[^;]+;/g, function (s) { return unescapedText[s]; });
    }
    /**
     * Create a `StateKey<T>` that can be used to store value of type T with `TransferState`.
     *
     * Example:
     *
     * ```
     * const COUNTER_KEY = makeStateKey<number>('counter');
     * let value = 10;
     *
     * transferState.set(COUNTER_KEY, value);
     * ```
     *
     * @publicApi
     */
    function makeStateKey(key) {
        return key;
    }
    /**
     * A key value store that is transferred from the application on the server side to the application
     * on the client side.
     *
     * `TransferState` will be available as an injectable token. To use it import
     * `ServerTransferStateModule` on the server and `BrowserTransferStateModule` on the client.
     *
     * The values in the store are serialized/deserialized using JSON.stringify/JSON.parse. So only
     * boolean, number, string, null and non-class objects will be serialized and deserialized in a
     * non-lossy manner.
     *
     * @publicApi
     */
    var TransferState = /** @class */ (function () {
        function TransferState() {
            this.store = {};
            this.onSerializeCallbacks = {};
        }
        /** @internal */
        TransferState.init = function (initState) {
            var transferState = new TransferState();
            transferState.store = initState;
            return transferState;
        };
        /**
         * Get the value corresponding to a key. Return `defaultValue` if key is not found.
         */
        TransferState.prototype.get = function (key, defaultValue) {
            return this.store[key] !== undefined ? this.store[key] : defaultValue;
        };
        /**
         * Set the value corresponding to a key.
         */
        TransferState.prototype.set = function (key, value) {
            this.store[key] = value;
        };
        /**
         * Remove a key from the store.
         */
        TransferState.prototype.remove = function (key) {
            delete this.store[key];
        };
        /**
         * Test whether a key exists in the store.
         */
        TransferState.prototype.hasKey = function (key) {
            return this.store.hasOwnProperty(key);
        };
        /**
         * Register a callback to provide the value for a key when `toJson` is called.
         */
        TransferState.prototype.onSerialize = function (key, callback) {
            this.onSerializeCallbacks[key] = callback;
        };
        /**
         * Serialize the current state of the store to JSON.
         */
        TransferState.prototype.toJson = function () {
            // Call the onSerialize callbacks and put those values into the store.
            for (var key in this.onSerializeCallbacks) {
                if (this.onSerializeCallbacks.hasOwnProperty(key)) {
                    try {
                        this.store[key] = this.onSerializeCallbacks[key]();
                    }
                    catch (e) {
                        console.warn('Exception in onSerialize callback: ', e);
                    }
                }
            }
            return JSON.stringify(this.store);
        };
        return TransferState;
    }());
    TransferState.decorators = [
        { type: i0.Injectable }
    ];
    function initTransferState(doc, appId) {
        // Locate the script tag with the JSON data transferred from the server.
        // The id of the script tag is set to the Angular appId + 'state'.
        var script = doc.getElementById(appId + '-state');
        var initialState = {};
        if (script && script.textContent) {
            try {
                initialState = JSON.parse(unescapeHtml(script.textContent));
            }
            catch (e) {
                console.warn('Exception while restoring TransferState for app ' + appId, e);
            }
        }
        return TransferState.init(initialState);
    }
    /**
     * NgModule to install on the client side while using the `TransferState` to transfer state from
     * server to client.
     *
     * @publicApi
     */
    var BrowserTransferStateModule = /** @class */ (function () {
        function BrowserTransferStateModule() {
        }
        return BrowserTransferStateModule;
    }());
    BrowserTransferStateModule.decorators = [
        { type: i0.NgModule, args: [{
                    providers: [{ provide: TransferState, useFactory: initTransferState, deps: [common.DOCUMENT, i0.APP_ID] }],
                },] }
    ];
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Predicates for use with {@link DebugElement}'s query functions.
     *
     * @publicApi
     */
    var By = /** @class */ (function () {
        function By() {
        }
        /**
         * Match all nodes.
         *
         * @usageNotes
         * ### Example
         *
         * {@example platform-browser/dom/debug/ts/by/by.ts region='by_all'}
         */
        By.all = function () {
            return function () { return true; };
        };
        /**
         * Match elements by the given CSS selector.
         *
         * @usageNotes
         * ### Example
         *
         * {@example platform-browser/dom/debug/ts/by/by.ts region='by_css'}
         */
        By.css = function (selector) {
            return function (debugElement) {
                return debugElement.nativeElement != null ?
                    elementMatches(debugElement.nativeElement, selector) :
                    false;
            };
        };
        /**
         * Match nodes that have the given directive present.
         *
         * @usageNotes
         * ### Example
         *
         * {@example platform-browser/dom/debug/ts/by/by.ts region='by_directive'}
         */
        By.directive = function (type) {
            return function (debugNode) { return debugNode.providerTokens.indexOf(type) !== -1; };
        };
        return By;
    }());
    function elementMatches(n, selector) {
        if (common["ɵgetDOM"]().isElementNode(n)) {
            return n.matches && n.matches(selector) ||
                n.msMatchesSelector && n.msMatchesSelector(selector) ||
                n.webkitMatchesSelector && n.webkitMatchesSelector(selector);
        }
        return false;
    }
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * @publicApi
     */
    var VERSION = new i0.Version('11.0.9');

    /**
     * @license Angular v11.0.9
     * (c) 2010-2020 Google LLC. https://angular.io/
     * License: MIT
     */
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var BrowserAnimationBuilder = /** @class */ (function (_super) {
        tslib_1.__extends(BrowserAnimationBuilder, _super);
        function BrowserAnimationBuilder(rootRenderer, doc) {
            var _this = _super.call(this) || this;
            _this._nextAnimationId = 0;
            var typeData = { id: '0', encapsulation: i0.ViewEncapsulation.None, styles: [], data: { animation: [] } };
            _this._renderer = rootRenderer.createRenderer(doc.body, typeData);
            return _this;
        }
        BrowserAnimationBuilder.prototype.build = function (animation) {
            var id = this._nextAnimationId.toString();
            this._nextAnimationId++;
            var entry = Array.isArray(animation) ? animations.sequence(animation) : animation;
            issueAnimationCommand(this._renderer, null, id, 'register', [entry]);
            return new BrowserAnimationFactory(id, this._renderer);
        };
        return BrowserAnimationBuilder;
    }(animations.AnimationBuilder));
    BrowserAnimationBuilder.decorators = [
        { type: i0.Injectable }
    ];
    BrowserAnimationBuilder.ctorParameters = function () { return [
        { type: i0.RendererFactory2 },
        { type: undefined, decorators: [{ type: i0.Inject, args: [common.DOCUMENT,] }] }
    ]; };
    var BrowserAnimationFactory = /** @class */ (function (_super) {
        tslib_1.__extends(BrowserAnimationFactory, _super);
        function BrowserAnimationFactory(_id, _renderer) {
            var _this = _super.call(this) || this;
            _this._id = _id;
            _this._renderer = _renderer;
            return _this;
        }
        BrowserAnimationFactory.prototype.create = function (element, options) {
            return new RendererAnimationPlayer(this._id, element, options || {}, this._renderer);
        };
        return BrowserAnimationFactory;
    }(animations.AnimationFactory));
    var RendererAnimationPlayer = /** @class */ (function () {
        function RendererAnimationPlayer(id, element, options, _renderer) {
            this.id = id;
            this.element = element;
            this._renderer = _renderer;
            this.parentPlayer = null;
            this._started = false;
            this.totalTime = 0;
            this._command('create', options);
        }
        RendererAnimationPlayer.prototype._listen = function (eventName, callback) {
            return this._renderer.listen(this.element, "@@" + this.id + ":" + eventName, callback);
        };
        RendererAnimationPlayer.prototype._command = function (command) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return issueAnimationCommand(this._renderer, this.element, this.id, command, args);
        };
        RendererAnimationPlayer.prototype.onDone = function (fn) {
            this._listen('done', fn);
        };
        RendererAnimationPlayer.prototype.onStart = function (fn) {
            this._listen('start', fn);
        };
        RendererAnimationPlayer.prototype.onDestroy = function (fn) {
            this._listen('destroy', fn);
        };
        RendererAnimationPlayer.prototype.init = function () {
            this._command('init');
        };
        RendererAnimationPlayer.prototype.hasStarted = function () {
            return this._started;
        };
        RendererAnimationPlayer.prototype.play = function () {
            this._command('play');
            this._started = true;
        };
        RendererAnimationPlayer.prototype.pause = function () {
            this._command('pause');
        };
        RendererAnimationPlayer.prototype.restart = function () {
            this._command('restart');
        };
        RendererAnimationPlayer.prototype.finish = function () {
            this._command('finish');
        };
        RendererAnimationPlayer.prototype.destroy = function () {
            this._command('destroy');
        };
        RendererAnimationPlayer.prototype.reset = function () {
            this._command('reset');
        };
        RendererAnimationPlayer.prototype.setPosition = function (p) {
            this._command('setPosition', p);
        };
        RendererAnimationPlayer.prototype.getPosition = function () {
            var _a, _b;
            return (_b = (_a = this._renderer.engine.players[+this.id]) === null || _a === void 0 ? void 0 : _a.getPosition()) !== null && _b !== void 0 ? _b : 0;
        };
        return RendererAnimationPlayer;
    }());
    function issueAnimationCommand(renderer, element, id, command, args) {
        return renderer.setProperty(element, "@@" + id + ":" + command, args);
    }
    var ANIMATION_PREFIX = '@';
    var DISABLE_ANIMATIONS_FLAG = '@.disabled';
    var AnimationRendererFactory = /** @class */ (function () {
        function AnimationRendererFactory(delegate, engine, _zone) {
            this.delegate = delegate;
            this.engine = engine;
            this._zone = _zone;
            this._currentId = 0;
            this._microtaskId = 1;
            this._animationCallbacksBuffer = [];
            this._rendererCache = new Map();
            this._cdRecurDepth = 0;
            this.promise = Promise.resolve(0);
            engine.onRemovalComplete = function (element, delegate) {
                // Note: if an component element has a leave animation, and the component
                // a host leave animation, the view engine will call `removeChild` for the parent
                // component renderer as well as for the child component renderer.
                // Therefore, we need to check if we already removed the element.
                if (delegate && delegate.parentNode(element)) {
                    delegate.removeChild(element.parentNode, element);
                }
            };
        }
        AnimationRendererFactory.prototype.createRenderer = function (hostElement, type) {
            var _this = this;
            var EMPTY_NAMESPACE_ID = '';
            // cache the delegates to find out which cached delegate can
            // be used by which cached renderer
            var delegate = this.delegate.createRenderer(hostElement, type);
            if (!hostElement || !type || !type.data || !type.data['animation']) {
                var renderer = this._rendererCache.get(delegate);
                if (!renderer) {
                    renderer = new BaseAnimationRenderer(EMPTY_NAMESPACE_ID, delegate, this.engine);
                    // only cache this result when the base renderer is used
                    this._rendererCache.set(delegate, renderer);
                }
                return renderer;
            }
            var componentId = type.id;
            var namespaceId = type.id + '-' + this._currentId;
            this._currentId++;
            this.engine.register(namespaceId, hostElement);
            var registerTrigger = function (trigger) {
                if (Array.isArray(trigger)) {
                    trigger.forEach(registerTrigger);
                }
                else {
                    _this.engine.registerTrigger(componentId, namespaceId, hostElement, trigger.name, trigger);
                }
            };
            var animationTriggers = type.data['animation'];
            animationTriggers.forEach(registerTrigger);
            return new AnimationRenderer(this, namespaceId, delegate, this.engine);
        };
        AnimationRendererFactory.prototype.begin = function () {
            this._cdRecurDepth++;
            if (this.delegate.begin) {
                this.delegate.begin();
            }
        };
        AnimationRendererFactory.prototype._scheduleCountTask = function () {
            var _this = this;
            // always use promise to schedule microtask instead of use Zone
            this.promise.then(function () {
                _this._microtaskId++;
            });
        };
        /** @internal */
        AnimationRendererFactory.prototype.scheduleListenerCallback = function (count, fn, data) {
            var _this = this;
            if (count >= 0 && count < this._microtaskId) {
                this._zone.run(function () { return fn(data); });
                return;
            }
            if (this._animationCallbacksBuffer.length == 0) {
                Promise.resolve(null).then(function () {
                    _this._zone.run(function () {
                        _this._animationCallbacksBuffer.forEach(function (tuple) {
                            var _c = tslib_1.__read(tuple, 2), fn = _c[0], data = _c[1];
                            fn(data);
                        });
                        _this._animationCallbacksBuffer = [];
                    });
                });
            }
            this._animationCallbacksBuffer.push([fn, data]);
        };
        AnimationRendererFactory.prototype.end = function () {
            var _this = this;
            this._cdRecurDepth--;
            // this is to prevent animations from running twice when an inner
            // component does CD when a parent component instead has inserted it
            if (this._cdRecurDepth == 0) {
                this._zone.runOutsideAngular(function () {
                    _this._scheduleCountTask();
                    _this.engine.flush(_this._microtaskId);
                });
            }
            if (this.delegate.end) {
                this.delegate.end();
            }
        };
        AnimationRendererFactory.prototype.whenRenderingDone = function () {
            return this.engine.whenRenderingDone();
        };
        return AnimationRendererFactory;
    }());
    AnimationRendererFactory.decorators = [
        { type: i0.Injectable }
    ];
    AnimationRendererFactory.ctorParameters = function () { return [
        { type: i0.RendererFactory2 },
        { type: browser["ɵAnimationEngine"] },
        { type: i0.NgZone }
    ]; };
    var BaseAnimationRenderer = /** @class */ (function () {
        function BaseAnimationRenderer(namespaceId, delegate, engine) {
            this.namespaceId = namespaceId;
            this.delegate = delegate;
            this.engine = engine;
            this.destroyNode = this.delegate.destroyNode ? function (n) { return delegate.destroyNode(n); } : null;
        }
        Object.defineProperty(BaseAnimationRenderer.prototype, "data", {
            get: function () {
                return this.delegate.data;
            },
            enumerable: false,
            configurable: true
        });
        BaseAnimationRenderer.prototype.destroy = function () {
            this.engine.destroy(this.namespaceId, this.delegate);
            this.delegate.destroy();
        };
        BaseAnimationRenderer.prototype.createElement = function (name, namespace) {
            return this.delegate.createElement(name, namespace);
        };
        BaseAnimationRenderer.prototype.createComment = function (value) {
            return this.delegate.createComment(value);
        };
        BaseAnimationRenderer.prototype.createText = function (value) {
            return this.delegate.createText(value);
        };
        BaseAnimationRenderer.prototype.appendChild = function (parent, newChild) {
            this.delegate.appendChild(parent, newChild);
            this.engine.onInsert(this.namespaceId, newChild, parent, false);
        };
        BaseAnimationRenderer.prototype.insertBefore = function (parent, newChild, refChild, isMove) {
            if (isMove === void 0) { isMove = true; }
            this.delegate.insertBefore(parent, newChild, refChild);
            // If `isMove` true than we should animate this insert.
            this.engine.onInsert(this.namespaceId, newChild, parent, isMove);
        };
        BaseAnimationRenderer.prototype.removeChild = function (parent, oldChild, isHostElement) {
            this.engine.onRemove(this.namespaceId, oldChild, this.delegate, isHostElement);
        };
        BaseAnimationRenderer.prototype.selectRootElement = function (selectorOrNode, preserveContent) {
            return this.delegate.selectRootElement(selectorOrNode, preserveContent);
        };
        BaseAnimationRenderer.prototype.parentNode = function (node) {
            return this.delegate.parentNode(node);
        };
        BaseAnimationRenderer.prototype.nextSibling = function (node) {
            return this.delegate.nextSibling(node);
        };
        BaseAnimationRenderer.prototype.setAttribute = function (el, name, value, namespace) {
            this.delegate.setAttribute(el, name, value, namespace);
        };
        BaseAnimationRenderer.prototype.removeAttribute = function (el, name, namespace) {
            this.delegate.removeAttribute(el, name, namespace);
        };
        BaseAnimationRenderer.prototype.addClass = function (el, name) {
            this.delegate.addClass(el, name);
        };
        BaseAnimationRenderer.prototype.removeClass = function (el, name) {
            this.delegate.removeClass(el, name);
        };
        BaseAnimationRenderer.prototype.setStyle = function (el, style, value, flags) {
            this.delegate.setStyle(el, style, value, flags);
        };
        BaseAnimationRenderer.prototype.removeStyle = function (el, style, flags) {
            this.delegate.removeStyle(el, style, flags);
        };
        BaseAnimationRenderer.prototype.setProperty = function (el, name, value) {
            if (name.charAt(0) == ANIMATION_PREFIX && name == DISABLE_ANIMATIONS_FLAG) {
                this.disableAnimations(el, !!value);
            }
            else {
                this.delegate.setProperty(el, name, value);
            }
        };
        BaseAnimationRenderer.prototype.setValue = function (node, value) {
            this.delegate.setValue(node, value);
        };
        BaseAnimationRenderer.prototype.listen = function (target, eventName, callback) {
            return this.delegate.listen(target, eventName, callback);
        };
        BaseAnimationRenderer.prototype.disableAnimations = function (element, value) {
            this.engine.disableAnimations(element, value);
        };
        return BaseAnimationRenderer;
    }());
    var AnimationRenderer = /** @class */ (function (_super) {
        tslib_1.__extends(AnimationRenderer, _super);
        function AnimationRenderer(factory, namespaceId, delegate, engine) {
            var _this = _super.call(this, namespaceId, delegate, engine) || this;
            _this.factory = factory;
            _this.namespaceId = namespaceId;
            return _this;
        }
        AnimationRenderer.prototype.setProperty = function (el, name, value) {
            if (name.charAt(0) == ANIMATION_PREFIX) {
                if (name.charAt(1) == '.' && name == DISABLE_ANIMATIONS_FLAG) {
                    value = value === undefined ? true : !!value;
                    this.disableAnimations(el, value);
                }
                else {
                    this.engine.process(this.namespaceId, el, name.substr(1), value);
                }
            }
            else {
                this.delegate.setProperty(el, name, value);
            }
        };
        AnimationRenderer.prototype.listen = function (target, eventName, callback) {
            var _c;
            var _this = this;
            if (eventName.charAt(0) == ANIMATION_PREFIX) {
                var element = resolveElementFromTarget(target);
                var name = eventName.substr(1);
                var phase = '';
                // @listener.phase is for trigger animation callbacks
                // @@listener is for animation builder callbacks
                if (name.charAt(0) != ANIMATION_PREFIX) {
                    _c = tslib_1.__read(parseTriggerCallbackName(name), 2), name = _c[0], phase = _c[1];
                }
                return this.engine.listen(this.namespaceId, element, name, phase, function (event) {
                    var countId = event['_data'] || -1;
                    _this.factory.scheduleListenerCallback(countId, callback, event);
                });
            }
            return this.delegate.listen(target, eventName, callback);
        };
        return AnimationRenderer;
    }(BaseAnimationRenderer));
    function resolveElementFromTarget(target) {
        switch (target) {
            case 'body':
                return document.body;
            case 'document':
                return document;
            case 'window':
                return window;
            default:
                return target;
        }
    }
    function parseTriggerCallbackName(triggerName) {
        var dotIndex = triggerName.indexOf('.');
        var trigger = triggerName.substring(0, dotIndex);
        var phase = triggerName.substr(dotIndex + 1);
        return [trigger, phase];
    }
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var InjectableAnimationEngine = /** @class */ (function (_super) {
        tslib_1.__extends(InjectableAnimationEngine, _super);
        function InjectableAnimationEngine(doc, driver, normalizer) {
            return _super.call(this, doc.body, driver, normalizer) || this;
        }
        return InjectableAnimationEngine;
    }(browser["ɵAnimationEngine"]));
    InjectableAnimationEngine.decorators = [
        { type: i0.Injectable }
    ];
    InjectableAnimationEngine.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: [common.DOCUMENT,] }] },
        { type: browser.AnimationDriver },
        { type: browser["ɵAnimationStyleNormalizer"] }
    ]; };
    function instantiateSupportedAnimationDriver() {
        return browser["ɵsupportsWebAnimations"]() ? new browser["ɵWebAnimationsDriver"]() : new browser["ɵCssKeyframesDriver"]();
    }
    function instantiateDefaultStyleNormalizer() {
        return new browser["ɵWebAnimationsStyleNormalizer"]();
    }
    function instantiateRendererFactory(renderer, engine, zone) {
        return new AnimationRendererFactory(renderer, engine, zone);
    }
    /**
     * @publicApi
     */
    var ANIMATION_MODULE_TYPE = new i0.InjectionToken('AnimationModuleType');
    var SHARED_ANIMATION_PROVIDERS = [
        { provide: animations.AnimationBuilder, useClass: BrowserAnimationBuilder },
        { provide: browser["ɵAnimationStyleNormalizer"], useFactory: instantiateDefaultStyleNormalizer },
        { provide: browser["ɵAnimationEngine"], useClass: InjectableAnimationEngine }, {
            provide: i0.RendererFactory2,
            useFactory: instantiateRendererFactory,
            deps: [DomRendererFactory2, browser["ɵAnimationEngine"], i0.NgZone]
        }
    ];
    /**
     * Separate providers from the actual module so that we can do a local modification in Google3 to
     * include them in the BrowserModule.
     */
    var BROWSER_ANIMATIONS_PROVIDERS = tslib_1.__spread([
        { provide: browser.AnimationDriver, useFactory: instantiateSupportedAnimationDriver },
        { provide: ANIMATION_MODULE_TYPE, useValue: 'BrowserAnimations' }
    ], SHARED_ANIMATION_PROVIDERS);
    /**
     * Separate providers from the actual module so that we can do a local modification in Google3 to
     * include them in the BrowserTestingModule.
     */
    var BROWSER_NOOP_ANIMATIONS_PROVIDERS = tslib_1.__spread([
        { provide: browser.AnimationDriver, useClass: browser["ɵNoopAnimationDriver"] },
        { provide: ANIMATION_MODULE_TYPE, useValue: 'NoopAnimations' }
    ], SHARED_ANIMATION_PROVIDERS);
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Exports `BrowserModule` with additional [dependency-injection providers](guide/glossary#provider)
     * for use with animations. See [Animations](guide/animations).
     * @publicApi
     */
    var BrowserAnimationsModule = /** @class */ (function () {
        function BrowserAnimationsModule() {
        }
        return BrowserAnimationsModule;
    }());
    BrowserAnimationsModule.decorators = [
        { type: i0.NgModule, args: [{
                    exports: [BrowserModule],
                    providers: BROWSER_ANIMATIONS_PROVIDERS,
                },] }
    ];
    /**
     * A null player that must be imported to allow disabling of animations.
     * @publicApi
     */
    var NoopAnimationsModule = /** @class */ (function () {
        function NoopAnimationsModule() {
        }
        return NoopAnimationsModule;
    }());
    NoopAnimationsModule.decorators = [
        { type: i0.NgModule, args: [{
                    exports: [BrowserModule],
                    providers: BROWSER_NOOP_ANIMATIONS_PROVIDERS,
                },] }
    ];

    var VariablesComponent = /** @class */ (function () {
        function VariablesComponent(ruleEditorService) {
            this.ruleEditorService = ruleEditorService;
            this.lhcStyle = {};
            this.variableType = SimpleVariableType;
            this.levels = [{
                    level: 0,
                    name: 'Top Level Scope'
                }
            ];
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
                this.variableType = this.advancedInterface ? AllVariableType : SimpleVariableType;
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
        VariablesComponent.prototype.ngDestroy = function () {
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
            dragDrop.moveItemInArray(this.variables, event.previousIndex, event.currentIndex);
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
        return VariablesComponent;
    }());
    VariablesComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lhc-variables',
                    template: "<h2 [style]=\"lhcStyle.h2\">Variables</h2>\n\n<div class=\"container\">\n  <div class=\"variable-header\" [style]=\"lhcStyle.variableHeader\" aria-hidden=\"true\">\n    <div class=\"variable-column-label\">Label</div>\n    <div class=\"variable-column-type\">Variable Type</div>\n    <div class=\"variable-column-details\">Question/FHIRPath Expression/FHIR Query</div>\n  </div>\n  <div cdkDropList (cdkDropListDropped)=\"drop($event)\">\n    <div class=\"variable-row drag-variable\" [style]=\"lhcStyle.variableRow\" *ngFor=\"let variable of variables; index as i\" [id]=\"'row-' + i\" cdkDrag>\n      <div class=\"variable-column-label\">\n        <!-- Inline SVG for the row drag and drop handle -->\n        <svg cdkDragHandle xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" fill=\"currentColor\" class=\"handle\" viewBox=\"0 0 16 16\">\n          <path d=\"M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z\"/>\n        </svg>\n        <input [id]=\"'variable-label-' + i\" [(ngModel)]=\"variable.label\" (change)=\"onNameChange()\" [style]=\"lhcStyle.input\" class=\"label\" aria-label=\"Variable label\" />\n      </div>\n      <div class=\"variable-column-type\">\n        <select [id]=\"'variable-type-' + i\" [(ngModel)]=\"variable.type\" (change)=\"onTypeChange($event)\" [style]=\"lhcStyle.select\" aria-label=\"Variable type\">\n          <option value=\"\" disabled hidden>Select...</option>\n          <option *ngFor=\"let type of variableType | keyvalue\" value=\"{{type.key}}\">{{type.value}}</option>\n        </select>\n      </div>\n      <div class=\"variable-column-details\" [ngSwitch]=\"variable.type\">\n        <lhc-question [variable]=\"variable\" *ngSwitchCase=\"'question'\" [lhcStyle]=\"lhcStyle\"></lhc-question>\n        <lhc-query-observation [variable]=\"variable\" [index]=\"i\" *ngSwitchCase=\"'queryObservation'\" [lhcStyle]=\"lhcStyle\"></lhc-query-observation>\n        <div class=\"form-inline\" *ngSwitchCase=\"'simple'\">\n          <lhc-syntax-converter\n            [id]=\"'variable-expression-' + i\"\n            [simple]=\"variable.simple\"\n            [variables]=\"getAvailableVariables(i)\"\n            [lhcStyle]=\"lhcStyle\"\n            (simpleChange)=\"updateSimpleExpression(i, $event)\"\n            (expressionChange)=\"updateExpression(i, $event)\">\n          </lhc-syntax-converter>\n        </div>\n        <div class=\"form-inline\" *ngSwitchCase=\"'expression'\">\n          <input [id]=\"'variable-expression-' + i\" [(ngModel)]=\"variable.expression\" [style]=\"lhcStyle.input\" aria-label=\"FHIRPath Expression\" />\n        </div>\n        <div class=\"form-inline\" *ngSwitchCase=\"'query'\">\n          <input [id]=\"'variable-expression-' + i\" [(ngModel)]=\"variable.expression\" [style]=\"lhcStyle.input\"\n                 aria-label=\"FHIR Query\" placeholder=\"x-fhir-query\" />\n        </div>\n      </div>\n      <div class=\"variable-column-actions\">\n        <button class=\"btn btn-danger remove-variable\" aria-label=\"Remove variable\" title=\"Remove variable\" [style]=\"lhcStyle.buttonDanger\" (click)=\"onRemove(i)\">x</button>\n      </div>\n    </div>\n    <div *ngIf=\"!variables.length\" class=\"no-variables\">No variables, please <a href=\"#\" (click)=\"onAdd()\">add one</a>.</div>\n  </div>\n</div>\n\n<button id=\"add-variable\" class=\"btn btn-secondary mt-2\" (click)=\"onAdd()\" [ngStyle]=\"lhcStyle.buttonSecondary\">Add variable</button>\n",
                    styles: ["*{box-sizing:border-box}.variable-header,.variable-row{display:flex;flex-direction:row;flex-wrap:wrap}.variable-header>.variable-column-label{padding-left:1.6em}.variable-column-label>input,.variable-column-type select{width:100%;height:2rem;font-size:1rem}.variable-column-details,.variable-column-label,.variable-column-type{padding:.5rem}.variable-column-label{display:flex;flex:0 0 12em}.label{flex-grow:100}.variable-column-type{flex:0 0 15em}.variable-column-details{flex:1 0 25em;min-width:0}.variable-column-actions button{height:2rem;width:2rem;background-color:#8b0000;color:#fff;padding:0}.variable-column-actions{flex:0 0 auto;padding-top:.5rem;padding-left:.5rem}@media (max-width:975px){.variable-row{flex-direction:column}.variable-column-label,.variable-column-type{flex:100%}.variable-column-details{flex:20 0 10em}.variable-column-actions{flex:auto}}.drag-variable{padding:.75rem 0;border-top:1px solid rgba(0,0,0,.1);color:rgba(0,0,0,.87);display:flex;flex-direction:row;justify-content:space-between;box-sizing:border-box;background:#fff}.handle{cursor:move;margin-top:.4rem}.no-variables{padding:2rem}.cdk-drag-preview{box-sizing:border-box;border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drag-placeholder{opacity:0}.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}input,select{height:2rem;font-size:1rem;width:100%;margin-bottom:1rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}button{height:2.5rem;border:none;border-radius:4px;padding:0 2em;font-size:1rem}"]
                },] }
    ];
    VariablesComponent.ctorParameters = function () { return [
        { type: RuleEditorService }
    ]; };
    VariablesComponent.propDecorators = {
        lhcStyle: [{ type: i0.Input }],
        advancedInterface: [{ type: i0.Input }]
    };

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
        UneditableVariablesComponent.prototype.ngDestroy = function () {
            this.uneditableVariablesSubscription.unsubscribe();
        };
        return UneditableVariablesComponent;
    }());
    UneditableVariablesComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lhc-uneditable-variables',
                    template: "<div *ngIf=\"uneditableVariables.length\">\n  <h2>Variables in Scope for This Item</h2>\n\n  <div class=\"container\">\n    <div class=\"variable-header\">\n      <div class=\"variable-column-label\">Label</div>\n      <div class=\"variable-column-type\">Variable Type</div>\n      <div class=\"variable-column-details\">Description</div>\n    </div>\n    <div class=\"variable-row\" *ngFor=\"let variable of uneditableVariables\">\n      <div class=\"variable-column-label\">{{variable.name}}</div>\n      <div class=\"variable-column-type\">{{variable.type}}</div>\n      <div class=\"variable-column-details\">{{variable.description}}</div>\n    </div>\n  </div>\n</div>\n",
                    styles: ["*{box-sizing:border-box}.variable-header,.variable-row{display:flex;flex-direction:row;flex-wrap:wrap}.variable-row{border-top:1px solid rgba(0,0,0,.1)}.variable-column-details,.variable-column-label,.variable-column-type{padding:.5rem}.variable-column-label{display:flex;flex:0 0 12em}.variable-column-type{flex:0 0 15em}.variable-column-details{flex:1 0 25em;min-width:0}@media (max-width:975px){.variable-row{flex-direction:column}.variable-column-label,.variable-column-type{flex:100%}.variable-column-details{flex:auto}}"]
                },] }
    ];
    UneditableVariablesComponent.ctorParameters = function () { return [
        { type: RuleEditorService }
    ]; };

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
            return UNIT_CONVERSION[unit];
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
        return QuestionComponent;
    }());
    QuestionComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lhc-question',
                    template: "<div class=\"form-inline question\">\n  <div class=\"question-select\">\n    <select [(ngModel)]=\"linkId\" (change)=\"onChange(true)\" [style]=\"lhcStyle.select\" aria-label=\"Question\">\n      <option value=\"\" disabled hidden>Select...</option>\n      <option *ngFor=\"let question of questions\" [value]=\"question.linkId\">\n        {{question.text + ' (' + question.linkId + ')'}}\n      </option>\n    </select>\n  </div>\n\n  <div class=\"unit-select\">\n    <select *ngIf=\"conversionOptions\" [(ngModel)]=\"toUnit\" [style]=\"lhcStyle.select\"\n            (change)=\"onChange(false)\" aria-label=\"Unit conversion\">\n      <option value=\"\">Keep form units ({{unit}})</option>\n      <option *ngFor=\"let u of conversionOptions\" value=\"{{u.unit}}\">Convert to {{u.unit}}</option>\n    </select>\n\n    <div *ngIf=\"isNonConvertibleUnit\" class=\"detail\">{{unit}}</div>\n    <div *ngIf=\"itemHasScore\" class=\"detail\">Score</div>\n  </div>\n</div>\n\n<lhc-syntax-preview [syntax]=\"variable.expression\" [lhcStyle]=\"lhcStyle\"></lhc-syntax-preview>\n",
                    styles: [".question{display:flex;flex-wrap:wrap;flex-direction:row}.detail{margin-top:.5rem}.question-select,.unit-select{box-sizing:border-box;margin-bottom:.5rem}.question-select{flex:50%;padding-right:.5rem}.unit-select{flex:50%;padding-left:.5rem}select{width:100%;font-size:1rem;height:2rem}@media (max-width:975px){.question{flex-direction:column}.question-select,.unit-select{flex:100%;padding:0}}input,select{height:2rem;font-size:1rem;width:100%;margin-bottom:.5rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}"]
                },] }
    ];
    QuestionComponent.ctorParameters = function () { return [
        { type: RuleEditorService }
    ]; };
    QuestionComponent.propDecorators = {
        variable: [{ type: i0.Input }],
        lhcStyle: [{ type: i0.Input }]
    };

    var CalculateSumPromptComponent = /** @class */ (function () {
        function CalculateSumPromptComponent(ruleEditorService) {
            this.ruleEditorService = ruleEditorService;
            this.lhcStyle = {};
            this.export = new i0.EventEmitter();
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
        return CalculateSumPromptComponent;
    }());
    CalculateSumPromptComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lhc-calculate-sum-prompt',
                    template: "<div class=\"score-modal\">\n  <p [style]=\"lhcStyle.description\">It looks like this might be a score calculation.</p>\n\n  <p [style]=\"lhcStyle.description\">Would you like to calculate the sum of scores?</p>\n\n  <button class=\"primary\" (click)=\"onExportClick()\" [style]=\"lhcStyle.buttonPrimary\" id=\"export-score\">Yes</button>\n  <button (click)=\"onCloseClick()\" id=\"skip-export-score\">No</button>\n</div>\n",
                    styles: ["*{font-size:1rem}.score-modal{text-align:center}button{margin:0 .5em;height:2.5rem;border:none;border-radius:4px;padding:0 2em;font-size:1rem}"]
                },] }
    ];
    CalculateSumPromptComponent.ctorParameters = function () { return [
        { type: RuleEditorService }
    ]; };
    CalculateSumPromptComponent.propDecorators = {
        lhcStyle: [{ type: i0.Input }],
        export: [{ type: i0.Output }]
    };

    /**
     * Full fhirconvert function: validates, converts, then identifies variables.
     * @param {string} str - inputted normal syntax expression
     * @param {Array} vars - array of usable variables entered by user
     * @returns converted fhirpath expression
     */
    function fhirconvert(str, vars) {
        if (validate(str, vars)) {
            return varfind(convert(str), vars);
        }
        else {
            return null;
        }
    }
    // Array of usable operators
    var ops = [
        "+",
        "-",
        "*",
        "/",
        "^",
        "**",
        "||",
        "&&",
        "<",
        ">",
        "=",
        "!=",
        "!~",
        ">=",
        "<=",
        "xor",
        "XOR",
        "implies",
        "IMPLIES",
        "and",
        "or",
        "AND",
        "OR"
    ];
    // Array of usable functions
    var funs = [
        "CEILING",
        "FLOOR",
        "ABS",
        "TRUNCATE",
        "EXP",
        "SQRT",
        "LN",
        "LOG",
        "ceiling",
        "floor",
        "abs",
        "truncate",
        "exp",
        "sqrt",
        "ln",
        "log",
        "NOT",
        "not",
    ];
    // Array of functions with no arguments
    var funs2 = [
        "CEILING",
        "FLOOR",
        "ABS",
        "TRUNCATE",
        "EXP",
        "SQRT",
        "LN",
        "NOT",
        "ceiling",
        "floor",
        "abs",
        "truncate",
        "exp",
        "sqrt",
        "ln",
        "not"
    ];
    /**
     * Verifies normal syntax by confirming var names, function names,
     * syntax, and number of parenthesis.
     * @param {string} str - inputted normal syntax expression
     * @param {Array} vars - array of usable variables
     * @returns boolean, valid or invalid
     */
    function validate(str, vars) {
        // Operator Validation
        var len = str.length;
        var op = "";
        // Loop to identify operator strings
        for (var j = 0; j < len; j++) {
            // If operator char, append to op
            if (!(/[a-zA-Z0-9.,\s()\\-]/.test(str[j]))) {
                op = op + str[j];
                if (j == len - 1 || j == 0) {
                    return false;
                }
            }
            // Checks operator if length > 1 and operator string ends
            else if (op.length > 0) {
                if (!(ops.includes(op))) {
                    return false;
                }
                // Validates expression to left of operator
                var lsearch = true;
                var op_l = j - op.length - 1;
                while (lsearch) {
                    if (!(/[\s]/.test(str[op_l]))) {
                        if (!(/[a-zA-Z0-9.,)\\-]/.test(str[op_l]))) {
                            return false;
                        }
                        lsearch = false;
                    }
                    else {
                        op_l -= 1;
                    }
                }
                // Validates expression to right of operator
                var rsearch = true;
                var op_r = j;
                if (op_r > len - 1) {
                    return false;
                }
                while (rsearch) {
                    if (!(/[\s]/.test(str[op_r]))) {
                        if (!(/[a-zA-Z0-9.(\\-]/.test(str[op_r]))) {
                            return false;
                        }
                        rsearch = false;
                    }
                    else {
                        op_r += 1;
                    }
                }
                op = "";
            }
            else {
                op = "";
            }
        }
        // Function validation
        var lcount = 0;
        var rcount = 0;
        var substr = "";
        // Loop to checks parenthesis and identify non-operator strings
        for (var i = 0; i < len; i++) {
            if (str[i] == "(") {
                lcount += 1;
            }
            if (str[i] == ")") {
                rcount += 1;
            }
            if (rcount > lcount) {
                return false;
            }
            // If usable char, add to substring
            if (/[a-zA-Z0-9]/.test(str[i])) {
                substr = substr + str[i];
            }
            // Checks if substring is valid
            if ((str[i + 1] == null || !(/[[a-zA-Z0-9]/.test(str[i + 1])))) {
                if ((funs.includes(substr) && str[i + 1] == "(") || substr == "") {
                    substr = "";
                }
                else if (vars.includes(substr) || (ops.includes(substr) || !(isNaN(substr)))) {
                    substr = "";
                }
                else {
                    return false;
                }
            }
        }
        return lcount == rcount;
    }
    /**
     * Identifies convertable functions in expression and converts them recursively.
     * @param {string} str - inputted normal syntax expression
     * @returns expression with converted functions
     */
    function convert(str) {
        var count = 0;
        if (str.includes("^")) {
            var i = str.indexOf("^");
            var base = lfind(str, i);
            var power = rfind(str, i);
            str =
                str.slice(0, i - base.length) +
                    base.trim() +
                    ".power(" +
                    power.trim() +
                    ")" +
                    str.slice(i + power.length + 1);
            count += 1;
        }
        if (str.includes("**")) {
            var i = str.indexOf("**");
            var base = lfind(str, i);
            var power = rfind(str, i + 1);
            str =
                str.slice(0, i - base.length) +
                    base.trim() +
                    ".power(" +
                    power.trim() +
                    ")" +
                    str.slice(i + power.length + 2);
            count += 1;
        }
        for (var f = 0; f < funs2.length; f++) {
            if (str.includes(funs2[f])) {
                if (str[str.indexOf(funs2[f]) - 1] != ".") {
                    str = funcappend(str, funs2[f]);
                    count += 1;
                }
            }
        }
        if (str.includes("LOG")) {
            str = logappend(str, "LOG");
            count += 1;
        }
        if (str.includes("log")) {
            if (str[str.indexOf("log") - 1] != ".") {
                str = logappend(str, "log");
                count += 1;
            }
        }
        if (str.includes("OR")) {
            str = str.replace("OR", "or");
            count += 1;
        }
        if (str.includes("AND")) {
            str = str.replace("AND", "and");
            count += 1;
        }
        if (str.includes("||")) {
            str = str.replace("||", "or");
            count += 1;
        }
        if (str.includes("&&")) {
            str = str.replace("&&", "and");
            count += 1;
        }
        if (count != 0) {
            return convert(str);
        }
        else {
            return str;
        }
    }
    /**
     * Identifies functions and appends them in fhirpath form
     * @param {string} str - inputted normal syntax expression
     * @param {string} func - function in inputted normal syntax expression
     * @returns expression with converted function
     */
    function funcappend(str, func) {
        var i = str.indexOf(func);
        var j = i + func.length;
        var k = j;
        var eq = false;
        var open = 0;
        var close = 0;
        while (!eq) {
            if (str[k] == "(") {
                open += 1;
            }
            if (str[k] == ")") {
                close += 1;
            }
            if (open == close) {
                eq = true;
            }
            else {
                k += 1;
            }
        }
        return (str.slice(0, i).trim() +
            str.slice(j, k + 1).trim() +
            "." +
            func.toLowerCase() +
            "()" +
            str.slice(k + 1).trim());
    }
    /**
     * Same as funcappend, but in LOG format
     * @param {string} str - inputted normal syntax expression
     * @param {string} func - "LOG" or "log"
     * @returns expression with converted log function
     */
    function logappend(str, func) {
        var i = str.indexOf(func);
        var j = i + 3;
        var k = j;
        var cma = -1;
        var eq = false;
        var open = 0;
        var close = 0;
        while (!eq) {
            if (str[k] == "(") {
                open += 1;
            }
            if (str[k] == ")") {
                close += 1;
            }
            if (open == close + 1 && k != j && str[k] == ",") {
                cma = k;
            }
            if (open == close) {
                eq = true;
            }
            else {
                k += 1;
            }
        }
        return (str.slice(0, i).trim() +
            "(" +
            str.slice(cma + 1, k).trim() +
            ")" +
            ".log(" +
            str.slice(j + 1, cma).trim() +
            ")" +
            str.slice(k + 1).trim());
    }
    /**
     * Identifies expression to left of operator
     * @param {string} str - inputted expression
     * @param {int} i - operator index
     * @returns expression to left of operator
     */
    function lfind(str, i) {
        if (str[i - 1] != ")") {
            var search = true;
            var lstr = "";
            while (search) {
                if (i < 2) {
                    search = false;
                }
                if (/[a-zA-Z0-9.-\s]/.test(str[i - 1])) {
                    lstr = str[i - 1] + lstr;
                    i -= 1;
                }
                else {
                    search = false;
                }
            }
            return lstr;
        }
        else {
            var eq = false;
            var open = 0;
            var close = 0;
            var k = i - 1;
            while (!eq) {
                if (str[k] == "(") {
                    open += 1;
                }
                if (str[k] == ")") {
                    close += 1;
                }
                if (open == close) {
                    eq = true;
                }
                else {
                    k -= 1;
                }
            }
            return str.slice(k, i);
        }
    }
    /**
     * Identifies expression to right of operator
     * @param {string} str - inputted expression
     * @param {int} i - operator index
     * @returns expression to right of operator
     */
    function rfind(str, i) {
        if (str[i + 1] != "(") {
            var search = true;
            var rstr = "";
            while (search) {
                if (str[i + 2] == undefined) {
                    search = false;
                }
                if (/[a-zA-Z0-9.\s()\\-]/.test(str[i + 1])) {
                    rstr = rstr + str[i + 1];
                    i += 1;
                }
                else {
                    search = false;
                }
            }
            return rstr;
        }
        else {
            return str.slice(i + 1, str.slice(i).indexOf(")") + i + 1);
        }
    }
    /**
     * Identifies variables in expression and adds %
     * @param {string} str - converted expression
     * @param {Array} vars - array of usable variables
     * @returns converted expression with formatted variables
     */
    function varfind(str, vars) {
        var end = false;
        var i = 0;
        var j = 0;
        var v = "";
        while (!end) {
            if (str[i] == null) {
                end = true;
            }
            else {
                if (/[a-zA-Z0-9]/.test(str[i])) {
                    v = v + str[i];
                }
                else {
                    j = i - v.length;
                    if (vars.includes(v)) {
                        str = str.slice(0, j) + "%" + str.slice(j);
                        i += 1;
                    }
                    v = "";
                }
                if (str[i + 1] == null) {
                    j = i - v.length + 1;
                    if (vars.includes(v)) {
                        str = str.slice(0, j) + "%" + str.slice(j);
                        i += 1;
                    }
                }
                i += 1;
            }
        }
        return str;
    }

    var EasyPathExpressionsPipe = /** @class */ (function () {
        function EasyPathExpressionsPipe() {
        }
        EasyPathExpressionsPipe.prototype.transform = function (value, variables) {
            if (value !== undefined) {
                var fhirPath = fhirconvert(value, variables);
                if (fhirPath !== null) {
                    return fhirPath;
                }
            }
            return 'Not valid';
        };
        return EasyPathExpressionsPipe;
    }());
    EasyPathExpressionsPipe.decorators = [
        { type: i0.Pipe, args: [{
                    name: 'easyPathExpressions'
                },] }
    ];

    var SyntaxConverterComponent = /** @class */ (function () {
        function SyntaxConverterComponent() {
            this.lhcStyle = {};
            this.simpleChange = new i0.EventEmitter();
            this.expressionChange = new i0.EventEmitter();
            this.jsToFhirPathPipe = new EasyPathExpressionsPipe();
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
        return SyntaxConverterComponent;
    }());
    SyntaxConverterComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lhc-syntax-converter',
                    template: "<input [(ngModel)]=\"simple\" (ngModelChange)=\"onExpressionChange($event)\" class=\"simple-expression\"\n       aria-label=\"Easy Path Expression\" [style]=\"lhcStyle.input\" />\n<lhc-syntax-preview [syntax]=\"fhirPathExpression\"></lhc-syntax-preview>\n",
                    styles: [":host{width:100%}input,select{height:2rem;font-size:1rem;width:100%;margin-bottom:.5rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}"]
                },] }
    ];
    SyntaxConverterComponent.ctorParameters = function () { return []; };
    SyntaxConverterComponent.propDecorators = {
        simple: [{ type: i0.Input }],
        variables: [{ type: i0.Input }],
        lhcStyle: [{ type: i0.Input }],
        simpleChange: [{ type: i0.Output }],
        expressionChange: [{ type: i0.Output }]
    };

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
        return SyntaxPreviewComponent;
    }());
    SyntaxPreviewComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lhc-syntax-preview',
                    template: "<div class=\"text-muted syntax-preview\" [ngStyle]=\"lhcStyle\" *ngIf=\"syntax || showWhenEmpty\">\n  <div class=\"fhirpath\">\n    FHIRPath:\n    <pre class=\"d-inline text-muted syntax\" matTooltip=\"{{syntax}}\">\n      {{syntax}}\n    </pre>\n  </div>\n  <button class=\"copy\" #toolTip=\"matTooltip\" matTooltip=\"Copy to clipboard\"\n          [cdkCopyToClipboard]=\"syntax\" (click)=\"copyNotification(toolTip)\" aria-label=\"Copy to clipboard\">\n    <!-- Copy icon https://fonts.google.com/icons?icon.query=copy -->\n    <svg xmlns=\"http://www.w3.org/2000/svg\" height=\"16px\" viewBox=\"0 0 24 24\" width=\"24px\" fill=\"#000000\">\n      <path d=\"M0 0h24v24H0V0z\" fill=\"none\"/>\n      <path d=\"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z\"/>\n    </svg>\n  </button>\n</div>\n",
                    styles: [".syntax,:host{overflow:hidden}.syntax{white-space:nowrap;text-overflow:ellipsis}.text-muted{margin:0;color:#555;font-size:.8rem}.syntax-preview{display:flex;width:100%}.fhirpath{flex:1 0 10em;min-width:0;padding-right:1em}.copy{margin-top:1em;flex:0 0 3em;border:none;background:transparent}::ng-deep .mat-tooltip{overflow-wrap:break-word}"]
                },] }
    ];
    SyntaxPreviewComponent.ctorParameters = function () { return [
        { type: snackBar.MatSnackBar }
    ]; };
    SyntaxPreviewComponent.propDecorators = {
        syntax: [{ type: i0.Input }],
        lhcStyle: [{ type: i0.Input }],
        showWhenEmpty: [{ type: i0.Input }]
    };

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
            this.autoComplete = new Def__default["default"].Autocompleter.Search(this.autoCompleteElement.nativeElement, this.queryUrl, {
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
            Def__default["default"].Autocompleter.Event.observeListSelections("autocomplete-" + this.index, function () {
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
        return QueryObservationComponent;
    }());
    QueryObservationComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lhc-query-observation',
                    template: "<div class=\"form-inline query\">\n  <div class=\"query-select\">\n    <input [style]=\"lhcStyle.input\" placeholder=\"LOINC Name / LOINC Number / Other Code\"\n           class=\"query-autocomplete\" #autoComplete id=\"autocomplete-{{index}}\" />\n  </div>\n  <div class=\"time-input\">\n    <input [style]=\"lhcStyle.input\" [(ngModel)]=\"timeInterval\" (change)=\"onChange()\"\n           aria-label=\"Time interval\" type=\"number\" min=\"1\" />\n  </div>\n  <div class=\"time-select\">\n    <select [style]=\"lhcStyle.input\" [(ngModel)]=\"timeIntervalUnit\"\n            (change)=\"onChange()\" aria-label=\"Time interval units\">\n      <option value=\"days\">Day(s)</option>\n      <option value=\"weeks\">Week(s)</option>\n      <option value=\"months\">Month(s)</option>\n      <option value=\"years\">Year(s)</option>\n    </select>\n  </div>\n</div>\n<div class=\"syntax-preview text-muted\" [ngStyle]=\"lhcStyle\" *ngIf=\"codes.length\">\n  x-fhir-query: <pre class=\"d-inline text-muted\" title=\"{{expression}}\">{{expression}}</pre>\n</div>\n",
                    styles: [".query{display:flex;flex-wrap:wrap;flex-direction:row}.detail{margin-top:.5rem}.question-select,.unit-select{box-sizing:border-box;margin-bottom:.5rem}.query-select{flex:1 0 6em;padding-right:.5rem}.time-input,.time-select{flex:0 0 7em;padding-left:.5rem}select{width:100%;font-size:1rem;height:2rem}@media (max-width:975px){.question{flex-direction:column}.question-select,.unit-select{flex:100%;padding:0}}input,select{height:2rem;font-size:1rem;width:100%;margin-bottom:.5rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}.text-muted{margin:0;color:#555;font-size:.8rem}.syntax-preview{margin-top:1em}.syntax-preview>pre{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"]
                },] }
    ];
    QueryObservationComponent.ctorParameters = function () { return [
        { type: http.HttpClient }
    ]; };
    QueryObservationComponent.propDecorators = {
        variable: [{ type: i0.Input }],
        index: [{ type: i0.Input }],
        lhcStyle: [{ type: i0.Input }],
        autoCompleteElement: [{ type: i0.ViewChild, args: ['autoComplete',] }]
    };

    var CaseStatementsComponent = /** @class */ (function () {
        function CaseStatementsComponent(ruleEditorService) {
            this.ruleEditorService = ruleEditorService;
            this.lhcStyle = {};
            this.expressionChange = new i0.EventEmitter();
            this.simpleChange = new i0.EventEmitter();
            this.STRING_REGEX = /^'(.*)'$/;
            this.pipe = new EasyPathExpressionsPipe();
            this.outputExpressions = true;
            this.cases = [{ condition: '', simpleCondition: '', output: '', simpleOutput: '' }];
            this.output = '';
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
            var matches = expression.match(CASE_REGEX);
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
            if (level === this.cases.length - 1) {
                var defaultCase = this.transformIfSimple(isSimple ?
                    this.simpleDefaultCase : this.defaultCase, true);
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
            dragDrop.moveItemInArray(this.cases, event.previousIndex, event.currentIndex);
            this.onChange();
        };
        return CaseStatementsComponent;
    }());
    CaseStatementsComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lhc-case-statements',
                    template: "<div class=\"container\">\n  <div class=\"case-header\" [style]=\"lhcStyle.variableHeader\" aria-hidden=\"true\">\n    <div class=\"case-condition-column\">When expression is true</div>\n    <div class=\"case-output-column\">\n      Output\n      <input type=\"checkbox\" id=\"output-expressions\" [(ngModel)]=\"outputExpressions\" (change)=\"onChange()\">\n      <label for=\"output-expressions\">Use expressions (strings if unchecked)</label>\n    </div>\n  </div>\n  <div cdkDropList (cdkDropListDropped)=\"drop($event)\">\n    <div class=\"case-row drag-case\" [style]=\"lhcStyle.variableRow\" *ngFor=\"let caseStatement of cases; index as i\" [id]=\"'row-' + i\" cdkDrag>\n      <div class=\"case-condition-column\">\n        <!-- Inline SVG for the row drag and drop handle -->\n        <svg cdkDragHandle xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" fill=\"currentColor\" class=\"handle\" viewBox=\"0 0 16 16\">\n          <path d=\"M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z\"/>\n        </svg>\n        <input *ngIf=\"syntax !== 'simple'\" type=\"text\" [id]=\"'case-condition-' + i\" [(ngModel)]=\"caseStatement.condition\" (ngModelChange)=\"onChange()\" [style]=\"lhcStyle.input\" class=\"condition\" aria-label=\"Case condition\" />\n        <input *ngIf=\"syntax === 'simple'\" type=\"text\" [id]=\"'case-condition-' + i\" [(ngModel)]=\"caseStatement.simpleCondition\" (ngModelChange)=\"onChange()\" [style]=\"lhcStyle.input\" class=\"condition\" aria-label=\"Case condition\" />\n        <span class=\"arrow\">\u2192</span>\n      </div>\n      <div class=\"case-output-column\">\n        <input *ngIf=\"syntax !== 'simple'\" type=\"text\" [id]=\"'case-output-' + i\" [(ngModel)]=\"caseStatement.output\" (ngModelChange)=\"onChange()\" [style]=\"lhcStyle.input\" class=\"output\" aria-label=\"Case output\" />\n        <input *ngIf=\"syntax === 'simple'\" type=\"text\" [id]=\"'case-output-' + i\" [(ngModel)]=\"caseStatement.simpleOutput\" (ngModelChange)=\"onChange()\" [style]=\"lhcStyle.input\" class=\"output\" aria-label=\"Case output\" />\n      </div>\n      <div class=\"case-column-actions\" *ngIf=\"cases.length > 1\">\n        <button class=\"btn btn-danger remove-case\" aria-label=\"Remove case\" title=\"Remove case\" [style]=\"lhcStyle.buttonDanger\" (click)=\"onRemove(i)\">x</button>\n      </div>\n    </div>\n  </div>\n</div>\n\n<button id=\"add-case\" class=\"btn btn-secondary mt-2\" (click)=\"onAdd()\" [ngStyle]=\"lhcStyle.buttonSecondary\">Add case</button>\n\n<div class=\"case-row\">\n  <div class=\"case-condition-column\"></div>\n  <div class=\"case-output-column\">\n    <label>\n      Default output value:\n      <input *ngIf=\"syntax !== 'simple'\" type=\"text\" [(ngModel)]=\"defaultCase\" (ngModelChange)=\"onChange()\" [style]=\"lhcStyle.input\" class=\"default\" />\n      <input *ngIf=\"syntax === 'simple'\" type=\"text\" [(ngModel)]=\"simpleDefaultCase\" (ngModelChange)=\"onChange()\" [style]=\"lhcStyle.input\" class=\"default\" />\n    </label>\n  </div>\n</div>\n<lhc-syntax-preview [lhcStyle]=\"lhcStyle\" [syntax]=\"output\"></lhc-syntax-preview>\n",
                    styles: ["*{box-sizing:border-box}.case-header,.case-row{display:flex;flex-direction:row;flex-wrap:wrap}.case-header>.case-column-label{padding-left:1.6em}.case-condition-column>input,.case-output-column select{width:100%;height:2rem;font-size:1rem}.case-condition-column,.case-output-column{padding:.5rem}.case-condition-column{display:flex;flex:0 0 50%}.condition,.output{flex-grow:100}.case-actions-column{flex:auto}.case-output-column{flex:1 0 40%;min-width:0}.case-column-actions button{height:2rem;width:2rem;background-color:#8b0000;color:#fff;padding:0}.case-column-actions{flex:0 0 auto;padding-top:.5rem;padding-left:.5rem}@media (max-width:975px){.case-row{flex-direction:column}.case-condition-column{flex:100%}.case-output-column{flex:20 0 10em}.case-actions-column{flex:auto}}.drag-case{padding:.75rem 0;border-top:1px solid rgba(0,0,0,.1);color:rgba(0,0,0,.87);display:flex;flex-direction:row;justify-content:space-between;box-sizing:border-box;background:#fff}.handle{cursor:move;margin-top:.4rem}.cdk-drag-preview{box-sizing:border-box;border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drag-placeholder{opacity:0}.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}#output-expressions{margin-left:2em}input[type=text],select{height:2rem;font-size:1rem;width:100%;margin-bottom:1rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}button{height:2.5rem;border:none;border-radius:4px;padding:0 2em;font-size:1rem}.arrow{font-size:1.6em;padding-left:.5em}.default{margin-top:.5rem}.syntax{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.text-muted{margin:0;color:#555;font-size:.8rem}.copy{margin-top:1em;flex:0 0 3em;border:none;background:transparent}::ng-deep .mat-tooltip{overflow-wrap:break-word}"]
                },] }
    ];
    CaseStatementsComponent.ctorParameters = function () { return [
        { type: RuleEditorService }
    ]; };
    CaseStatementsComponent.propDecorators = {
        lhcStyle: [{ type: i0.Input }],
        syntax: [{ type: i0.Input }],
        simpleExpression: [{ type: i0.Input }],
        expression: [{ type: i0.Input }],
        expressionChange: [{ type: i0.Output }],
        simpleChange: [{ type: i0.Output }]
    };

    var RuleEditorModule = /** @class */ (function () {
        function RuleEditorModule() {
        }
        return RuleEditorModule;
    }());
    RuleEditorModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [
                        RuleEditorComponent,
                        VariablesComponent,
                        UneditableVariablesComponent,
                        QuestionComponent,
                        CalculateSumPromptComponent,
                        EasyPathExpressionsPipe,
                        SyntaxConverterComponent,
                        SyntaxPreviewComponent,
                        QueryObservationComponent,
                        CaseStatementsComponent
                    ],
                    imports: [
                        FormsModule,
                        BrowserAnimationsModule,
                        dragDrop.DragDropModule,
                        radio.MatRadioModule,
                        clipboard.ClipboardModule,
                        tooltip.MatTooltipModule,
                        snackBar.MatSnackBarModule
                    ],
                    exports: [
                        RuleEditorComponent
                    ]
                },] }
    ];

    /*
     * Public API Surface of ng-rule-editor
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.RuleEditorComponent = RuleEditorComponent;
    exports.RuleEditorModule = RuleEditorModule;
    exports.RuleEditorService = RuleEditorService;
    exports["ɵa"] = VariablesComponent;
    exports["ɵb"] = UneditableVariablesComponent;
    exports["ɵc"] = QuestionComponent;
    exports["ɵd"] = CalculateSumPromptComponent;
    exports["ɵe"] = EasyPathExpressionsPipe;
    exports["ɵf"] = SyntaxConverterComponent;
    exports["ɵg"] = SyntaxPreviewComponent;
    exports["ɵh"] = QueryObservationComponent;
    exports["ɵi"] = CaseStatementsComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ng-rule-editor.umd.js.map
