"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logging = void 0;
var _winston = _interopRequireDefault(require("winston"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var logging = exports.logging = _winston["default"].createLogger({
  level: "debug",
  format: _winston["default"].format.json(),
  transports: [new _winston["default"].transports.Console({})]
});