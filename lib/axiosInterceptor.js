'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = addErrorInterceptor;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactToastify = require('react-toastify');

var _config = require('./config');

var _AjaxToast = require('./AjaxToast');

var _AjaxToast2 = _interopRequireDefault(_AjaxToast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var errorInterceptor = function errorInterceptor(error) {
  // cancelled requests do not have config
  if (!error.config) return Promise.reject(error);

  var toastConfig = typeof error.config.onError === 'function' ? error.config.onError(error) : error.config.onError;

  if (typeof toastConfig === 'string') {
    toastConfig = {
      message: toastConfig
    };
  }

  if ((typeof toastConfig === 'undefined' ? 'undefined' : _typeof(toastConfig)) === 'object') {
    var _toastConfig = toastConfig,
        _toastConfig$message = _toastConfig.message,
        message = _toastConfig$message === undefined ? 'Error' : _toastConfig$message,
        _toastConfig$type = _toastConfig.type,
        type = _toastConfig$type === undefined ? 'error' : _toastConfig$type;

    var instanceToastOptions = toastConfig.options || {};
    var options = _extends({}, (0, _config.getConfig)().toastOptions, instanceToastOptions);
    if (message) {
      _reactToastify.toast[type](_react2.default.createElement(_AjaxToast2.default, {
        message: message,
        error: error
      }), options);
    }
  }
  return Promise.reject(error);
};

function addErrorInterceptor(ajax) {
  ajax.interceptors.response.use(null, errorInterceptor);
}