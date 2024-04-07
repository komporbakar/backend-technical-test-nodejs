"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publicRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = require("../controller/user-controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var publicRouter = exports.publicRouter = _express["default"].Router();
publicRouter.post('/registration', _userController.UserController.register);
publicRouter.post('/login', _userController.UserController.login);