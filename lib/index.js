'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axiosInterceptor = require('./axiosInterceptor');

Object.defineProperty(exports, 'addErrorInterceptor', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_axiosInterceptor).default;
  }
});

var _config = require('./config');

Object.defineProperty(exports, 'getConfig', {
  enumerable: true,
  get: function get() {
    return _config.getConfig;
  }
});
Object.defineProperty(exports, 'setConfig', {
  enumerable: true,
  get: function get() {
    return _config.setConfig;
  }
});

var _onError = require('./onError');

Object.defineProperty(exports, 'onError', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_onError).default;
  }
});

var _throwIfErrors = require('./throwIfErrors');

Object.defineProperty(exports, 'throwIfErrors', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_throwIfErrors).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }