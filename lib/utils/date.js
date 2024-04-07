"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.datenow = void 0;
var datenow = exports.datenow = function datenow() {
  var today = new Date();
  var date = today.getDate();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();
  return "".concat(year).concat(month).concat(date);
};