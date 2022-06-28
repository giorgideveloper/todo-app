"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sweetalert = _interopRequireDefault(require("sweetalert2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function toast(icon, title) {
  var Toast = _sweetalert["default"].mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: function didOpen(toast) {
      toast.addEventListener('mouseenter', _sweetalert["default"].stopTimer);
      toast.addEventListener('mouseleave', _sweetalert["default"].resumeTimer);
    }
  });

  Toast.fire({
    icon: icon,
    title: title
  });
}

var _default = toast;
exports["default"] = _default;