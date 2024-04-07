"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertToPlus7 = void 0;
var _moment = _interopRequireDefault(require("moment"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var convertToPlus7 = exports.convertToPlus7 = function convertToPlus7(dateTimeString) {
  return (0, _moment["default"])(dateTimeString).utcOffset('+07:00').format();
};