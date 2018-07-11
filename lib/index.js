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

var _onCatch = require('./onCatch');

Object.defineProperty(exports, 'onCatch', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_onCatch).default;
  }
});

var _ifErrorsProp = require('./ifErrorsProp');

Object.defineProperty(exports, 'ifErrorsProp', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ifErrorsProp).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }