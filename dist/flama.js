(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.flama = {}));
}(this, function (exports) { 'use strict';

  var delay = function (time) {
      return new Promise(function (resolve, reject) {
          try {
              setTimeout(function () {
                  resolve();
              }, time);
          }
          catch (error) {
              reject(error);
          }
      });
  };

  var FlameAnimation = (function () {
      function FlameAnimation() {
          this.requestId = 0;
          this.startTime = 0;
          this.duration = 500;
      }
      FlameAnimation.prototype.loopFrame = function (frameFunc, successCallback, failCallback) {
          var _this = this;
          try {
              var elapsed = Date.now() - this.startTime;
              var progress = elapsed / this.duration;
              frameFunc(progress);
              if (elapsed < this.duration) {
                  this.requestId = requestAnimationFrame(function () {
                      _this.loopFrame(frameFunc, successCallback, failCallback);
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
      FlameAnimation.prototype.start = function (duration, frameFunc) {
          var _this = this;
          return new Promise(function (resolve, reject) {
              _this.startTime = Date.now();
              _this.duration = duration;
              _this.loopFrame(frameFunc, function () {
                  frameFunc(1);
                  resolve();
              }, function () {
                  reject();
              });
          });
      };
      FlameAnimation.prototype.stop = function () {
          cancelAnimationFrame(this.requestId);
      };
      return FlameAnimation;
  }());
  var frameAnimation = new FlameAnimation();

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

  var DEFAULT_DURATION = 500;
  var DEFAULT_DELAY = 0;
  var DEFAULT_EASING = 'linear';

  var easing = {
      linear: function (t) {
          return t;
      },
      easeInQuad: function (t) {
          return t * t;
      },
      easeOutQuad: function (t) {
          return t * (2 - t);
      },
      easeInOutQuad: function (t) {
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      },
      easeInCubic: function (t) {
          return t * t * t;
      },
      easeOutCubic: function (t) {
          return --t * t * t + 1;
      },
      easeInOutCubic: function (t) {
          return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      },
      easeInQuart: function (t) {
          return t * t * t * t;
      },
      easeOutQuart: function (t) {
          return 1 - --t * t * t * t;
      },
      easeInOutQuart: function (t) {
          return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
      },
      easeInQuint: function (t) {
          return t * t * t * t * t;
      },
      easeOutQuint: function (t) {
          return 1 + --t * t * t * t * t;
      },
      easeInOutQuint: function (t) {
          return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
      }
  };

  var splitValueUnit = function (value) {
      var units = ['px', '%', 'vw', 'vh', 'em', 'rem'];
      var unit;
      for (var _i = 0, units_1 = units; _i < units_1.length; _i++) {
          unit = units_1[_i];
          var regexp = new RegExp(unit + "$");
          if (regexp.test(value)) {
              return {
                  value: parseInt(value.replace(regexp, ''), 10),
                  unit: unit
              };
          }
      }
      return {
          value: Number(value),
          unit: 'px'
      };
  };
  var getStyle = function (element, styles) {
      var conputedStyles = getComputedStyle(element);
      var resultStyles = {};
      for (var _i = 0, styles_1 = styles; _i < styles_1.length; _i++) {
          var prop = styles_1[_i];
          resultStyles[prop] = conputedStyles[prop];
      }
      return resultStyles;
  };

  var FlamaAnimate = (function () {
      function FlamaAnimate() {
          this.option = {
              duration: DEFAULT_DURATION,
              delay: DEFAULT_DELAY,
              easing: DEFAULT_EASING
          };
      }
      FlamaAnimate.prototype.createDiffStyles = function (styles, computedStyles) {
          var diffStyles = {};
          var prop;
          for (prop in computedStyles) {
              var style = splitValueUnit(styles[prop]);
              var computedStyle = splitValueUnit(computedStyles[prop]);
              diffStyles[prop] = {
                  value: style.value - computedStyle.value,
                  unit: style.unit
              };
          }
          return diffStyles;
      };
      FlamaAnimate.prototype.start = function (element, styles, option) {
          if (option === void 0) { option = {}; }
          return __awaiter(this, void 0, void 0, function () {
              var computedStyles, diffStyles;
              var _this = this;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          this.option = Object.assign(this.option, option);
                          computedStyles = getStyle(element, Object.keys(styles));
                          diffStyles = this.createDiffStyles(styles, computedStyles);
                          if (!this.option.delay) return [3, 2];
                          return [4, delay(this.option.delay)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [4, frameAnimation.start(this.option.duration, function (progress) {
                              var prop;
                              for (prop in styles) {
                                  var easingProgress = easing[_this.option.easing](progress);
                                  var styleDiff = diffStyles[prop].value * easingProgress;
                                  var styleValue = styleDiff + splitValueUnit(computedStyles[prop]).value;
                                  element.style.setProperty(prop, "" + styleValue + diffStyles[prop].unit);
                              }
                          })];
                      case 3: return [2, _a.sent()];
                  }
              });
          });
      };
      return FlamaAnimate;
  }());
  var flamaAnimate = new FlamaAnimate();

  exports.animate = flamaAnimate;
  exports.delay = delay;
  exports.frameAnimation = frameAnimation;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
