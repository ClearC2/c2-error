"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.setConfig = setConfig;
exports.getConfig = getConfig;
var config = {
  debug: false,
  toastOptions: {
    autoClose: false,
    closeOnClick: false
  },
  reportAjaxError: null,
  reportComponentError: null,
  getInfo: function getInfo() {
    return {
      url: window.location.href,
      date: new Date()
    };
  }
};

function setConfig() {
  var cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  config = _extends({}, config, cfg);
}

function getConfig() {
  return _extends({}, config);
}