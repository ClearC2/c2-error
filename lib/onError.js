'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactToastify = require('react-toastify');

var _ComponentToast = require('./ComponentToast');

var _ComponentToast2 = _interopRequireDefault(_ComponentToast);

var _config = require('./config');

var _getDisplayName = require('./getDisplayName');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (_ref) {
  var placeholder = _ref.placeholder,
      message = _ref.message,
      _ref$type = _ref.type,
      type = _ref$type === undefined ? 'error' : _ref$type,
      options = _ref.options,
      componentName = _ref.componentName;
  return function (WrappedComponent) {
    var _class, _temp2;

    return _temp2 = _class = function (_Component) {
      _inherits(_class, _Component);

      function _class() {
        var _ref2;

        var _temp, _this, _ret;

        _classCallCheck(this, _class);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref2, [this].concat(args))), _this), _this.state = {
          error: false
        }, _temp), _possibleConstructorReturn(_this, _ret);
      }

      _createClass(_class, [{
        key: 'componentDidCatch',
        value: function componentDidCatch(error, errorInfo) {
          this.setState({ error: true });
          if (typeof message === 'function') {
            message = message(this.props, error, errorInfo);
          }
          if (!message) return;
          if (typeof _reactToastify.toast[type] !== 'function') {
            type = 'error';
          }
          if (componentName) {
            message = componentName + ': ' + message;
          }
          var toastOptions = _extends({}, (0, _config.getConfig)().toastOptions, options);
          _reactToastify.toast[type](_react2.default.createElement(_ComponentToast2.default, {
            message: message,
            error: error,
            errorInfo: errorInfo,
            componentProps: this.props
          }), toastOptions);
        }
      }, {
        key: 'render',
        value: function render() {
          return this.state.error ? placeholder || _react2.default.createElement(
            Fragment,
            null,
            'Error'
          ) : _react2.default.createElement(WrappedComponent, this.props);
        }
      }]);

      return _class;
    }(_react.Component), _class.displayName = 'onError(' + (0, _getDisplayName2.default)(WrappedComponent) + ')', _temp2;
  };
};