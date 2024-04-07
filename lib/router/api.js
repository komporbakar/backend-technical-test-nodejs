"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;
var _express = _interopRequireDefault(require("express"));
var _informationController = require("../controller/information-controller");
var _transactionController = require("../controller/transaction-controller");
var _userController = require("../controller/user-controller");
var _authMiddleware = require("../middleware/auth-middleware");
var _multer = require("../middleware/multer");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = exports.router = _express["default"].Router();
router.use(_authMiddleware.authenticate);
router.get('/profile', _userController.UserController.getUser);
router.put('/profile/update', _userController.UserController.updateProfile);
router.put('/profile/image', _multer.upload, _userController.UserController.updateProfileImage);

//Service
router.get('/banner', _informationController.InformationController.getBanner);
router.get('/services', _informationController.InformationController.getService);

//Transaction
router.get('/balance', _transactionController.TransactionController.getBalance);
router.post('/topup', _transactionController.TransactionController.topupBalance);
router.post('/transaction', _transactionController.TransactionController.createTransaction);
router.get('/transaction/history', _transactionController.TransactionController.getTransaction);