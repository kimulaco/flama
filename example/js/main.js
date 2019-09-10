(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}(function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var delay = function (time) {
        return new Promise(function (resolve, reject) {
            try {
                var timer_1 = setTimeout(function () {
                    clearTimeout(timer_1);
                    resolve();
                }, time);
            }
            catch (error) {
                reject(error);
            }
        });
    };

    var timer = {
        start: 0,
        duration: 500
    };
    var loopFrame = function (frameFunc, successCallback, failCallback) {
        try {
            var elapsed = Date.now() - timer.start;
            var progress = elapsed / timer.duration;
            frameFunc(progress);
            if (elapsed < timer.duration) {
                requestAnimationFrame(function () {
                    loopFrame(frameFunc, successCallback, failCallback);
                });
            }
            else {
                successCallback();
            }
        }
        catch (error) {
            failCallback();
        }
    };
    var frameAnimation = function (duration, frameFunc) {
        return new Promise(function (resolve, reject) {
            timer.start = Date.now();
            timer.duration = duration;
            loopFrame(frameFunc, function () {
                frameFunc(1);
                resolve();
            }, function () {
                reject();
            });
        });
    };

    var DEFAULT_DURATION = 500;
    var DEFAULT_DELAY = 0;

    var getStyle = function (element, styles) {
        var conputedStyles = getComputedStyle(element);
        var resultStyles = {};
        for (var _i = 0, styles_1 = styles; _i < styles_1.length; _i++) {
            var prop = styles_1[_i];
            resultStyles[prop] = parseInt(conputedStyles[prop], 16);
        }
        return resultStyles;
    };

    var _this = undefined;
    var animate = function (element, styles, option) {
        if (option === void 0) { option = {}; }
        return __awaiter(_this, void 0, void 0, function () {
            var optDuration, optDelay, computedStyles, diffStyles, property;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        optDuration = option.duration || DEFAULT_DURATION;
                        optDelay = option.delay || DEFAULT_DELAY;
                        computedStyles = getStyle(element, Object.keys(styles));
                        diffStyles = {};
                        for (property in computedStyles) {
                            diffStyles[property] = styles[property] - computedStyles[property];
                        }
                        if (!optDelay) return [3, 2];
                        return [4, delay(optDelay)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4, frameAnimation(optDuration, function (progress) {
                            for (property in styles) {
                                element.style[property] = (diffStyles[property] * progress) + computedStyles[property] + 'px';
                            }
                        })];
                    case 3: return [2, _a.sent()];
                }
            });
        });
    };

    var _this$1 = undefined;
    var setAnimate = function () {
        var btn = document.getElementById('F-button');
        var box = document.getElementById('F-box');
        if (!btn || !box)
            return;
        btn.addEventListener('click', function () { return __awaiter(_this$1, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, animate(box, {
                            'width': 200,
                            'height': 200,
                            'margin-top': 100,
                            'margin-left': 100,
                        })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        }); });
    };
    setAnimate();

}));
