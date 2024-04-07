"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dbPool = void 0;
var _mysql = _interopRequireDefault(require("mysql2"));
var _config = require("../config");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var dbPool = exports.dbPool = _mysql["default"].createPool({
  host: _config.config.DB_HOST,
  user: _config.config.DB_USER,
  password: _config.config.DB_PASSWORD,
  database: _config.config.DB_NAME
}).promise();