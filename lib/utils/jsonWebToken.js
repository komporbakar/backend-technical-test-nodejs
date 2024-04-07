"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyJWT = exports.createToken = exports.createJWT = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _config = require("../config");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var createToken = exports.createToken = function createToken(payload) {
  return {
    id: payload.id,
    email: payload.email
  };
};
var createJWT = exports.createJWT = function createJWT(_ref) {
  var payload = _ref.payload;
  var token = _jsonwebtoken["default"].sign(payload, _config.config.JWT_SECRET, {
    expiresIn: _config.config.JWT_EXPIRES
  });
  return token;
};
var verifyJWT = exports.verifyJWT = function verifyJWT(_ref2) {
  var token = _ref2.token;
  return _jsonwebtoken["default"].verify(token, _config.config.JWT_SECRET);
};