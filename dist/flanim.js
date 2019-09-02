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

  exports.delay = delay;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
