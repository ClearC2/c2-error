'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactToastify = require('react-toastify');

var _errorBoundaryHOC = require('./errorBoundaryHOC');

var _errorBoundaryHOC2 = _interopRequireDefault(_errorBoundaryHOC);

var _ComponentToast = require('./ComponentToast');

var _ComponentToast2 = _interopRequireDefault(_ComponentToast);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === undefined ? 'Error' : _ref$placeholder,
      message = _ref.message,
      _ref$type = _ref.type,
      type = _ref$type === undefined ? 'error' : _ref$type,
      options = _ref.options;
  return (0, _errorBoundaryHOC2.default)({
    placeholder: placeholder,
    onCatch: function onCatch(error, errorInfo, props) {
      if (!message) return;
      var toastOptions = _extends({}, (0, _config.getConfig)().toastOptions, options);
      _reactToastify.toast[type](_react2.default.createElement(_ComponentToast2.default, {
        message: message,
        error: error,
        errorInfo: errorInfo,
        componentProps: props
      }), toastOptions);
    }
  });
};