"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _responseError = require("../error/response-error");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function filename(req, file, cb) {
    cb(null, req.user.id + '-' + new Date().getTime() + '-' + file.originalname);
  }
});
var filter = function filter(req, file, cb) {
  if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
    cb(null, true);
  } else {
    cb(new _responseError.ResponseError(400, 102, 'Format Image tidak sesuai'), false);
  }
};
var upload = exports.upload = (0, _multer["default"])({
  storage: storage,
  fileFilter: filter,
  limits: {
    fileSize: 2000000
  }
}).single('image');