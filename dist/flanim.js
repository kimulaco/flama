(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.flanim = {}));
}(this, function (exports) { 'use strict';

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
              resolve();
          }, function () {
              reject();
          });
      });
  };

  exports.delay = delay;
  exports.frameAnimation = frameAnimation;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
