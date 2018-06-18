'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DebugText = require('./DebugText');

var _DebugText2 = _interopRequireDefault(_DebugText);

var _config = require('./config');

var _ReportButton = require('./ReportButton');

var _ReportButton2 = _interopRequireDefault(_ReportButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AjaxToast = function (_Component) {
  _inherits(AjaxToast, _Component);

  function AjaxToast(props) {
    _classCallCheck(this, AjaxToast);

    var _this = _possibleConstructorReturn(this, (AjaxToast.__proto__ || Object.getPrototypeOf(AjaxToast)).call(this, props));

    _this.state = {
      info: {}
    };

    _this.getResponseData = function () {
      var data = _this.props.error.response.data;
      if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
        try {
          return JSON.stringify(data, null, 4);
        } catch (e) {
          return data;
        }
      }
      return data;
    };

    _this.state = {
      info: (0, _config.getConfig)().getInfo()
    };
    return _this;
  }

  _createClass(AjaxToast, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          message = _props.message,
          error = _props.error;
      var config = error.config;

      var _getConfig = (0, _config.getConfig)(),
          reportAjaxError = _getConfig.reportAjaxError;

      var info = this.state.info;

      return _react2.default.createElement(
        _react.Fragment,
        null,
        message,
        _react2.default.createElement('br', null),
        reportAjaxError && _react2.default.createElement(_ReportButton2.default, _extends({}, this.props, {
          report: reportAjaxError,
          info: info
        })),
        (0, _config.getConfig)().debug && _react2.default.createElement(
          _DebugText2.default,
          null,
          error.response.status,
          ' - ',
          config.method.toUpperCase(),
          ' ',
          config.url,
          _react2.default.createElement('hr', null),
          this.getResponseData()
        )
      );
    }
  }]);

  return AjaxToast;
}(_react.Component);

AjaxToast.propTypes = {
  message: _propTypes2.default.string,
  error: _propTypes2.default.object
};
exports.default = AjaxToast;