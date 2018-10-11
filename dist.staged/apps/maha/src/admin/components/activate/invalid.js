'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Invalid = function (_React$Component) {
  (0, _inherits3.default)(Invalid, _React$Component);

  function Invalid() {
    (0, _classCallCheck3.default)(this, Invalid);
    return (0, _possibleConstructorReturn3.default)(this, (Invalid.__proto__ || Object.getPrototypeOf(Invalid)).apply(this, arguments));
  }

  (0, _createClass3.default)(Invalid, [{
    key: 'render',
    value: function render() {
      var message = this.props.message;

      return _react2.default.createElement(
        'div',
        { className: 'maha-signin-panel' },
        _react2.default.createElement(
          'div',
          { className: 'maha-signin-form' },
          _react2.default.createElement(
            'div',
            { className: 'maha-signin-content' },
            _react2.default.createElement(
              'h1',
              null,
              _react2.default.createElement('i', { className: 'fa fa-warning' })
            ),
            _react2.default.createElement(
              'h2',
              null,
              'There was a problem'
            ),
            _react2.default.createElement(
              'h3',
              null,
              message
            )
          )
        )
      );
    }
  }]);
  return Invalid;
}(_react2.default.Component);

Invalid.propTypes = {
  message: _propTypes2.default.string
};
exports.default = Invalid;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiSW52YWxpZCIsIm1lc3NhZ2UiLCJwcm9wcyIsIlJlYWN0IiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwic3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0lBRU1BLE87Ozs7Ozs7Ozs7NkJBTUs7QUFBQSxVQUNDQyxPQURELEdBQ2EsS0FBS0MsS0FEbEIsQ0FDQ0QsT0FERDs7QUFFUCxhQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsbUJBQWY7QUFDRTtBQUFBO0FBQUEsWUFBSyxXQUFVLGtCQUFmO0FBQ0U7QUFBQTtBQUFBLGNBQUssV0FBVSxxQkFBZjtBQUNFO0FBQUE7QUFBQTtBQUFJLG1EQUFHLFdBQVUsZUFBYjtBQUFKLGFBREY7QUFFRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBRkY7QUFHRTtBQUFBO0FBQUE7QUFBTUE7QUFBTjtBQUhGO0FBREY7QUFERixPQURGO0FBV0Q7OztFQW5CbUJFLGdCQUFNQyxTOztBQUF0QkosTyxDQUVHSyxTLEdBQVk7QUFDakJKLFdBQVNLLG9CQUFVQztBQURGLEM7a0JBcUJOUCxPIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5cbmNsYXNzIEludmFsaWQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZ1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgbWVzc2FnZSB9ID0gdGhpcy5wcm9wc1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1haGEtc2lnbmluLXBhbmVsXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFoYS1zaWduaW4tZm9ybVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFoYS1zaWduaW4tY29udGVudFwiPlxuICAgICAgICAgICAgPGgxPjxpIGNsYXNzTmFtZT1cImZhIGZhLXdhcm5pbmdcIiAvPjwvaDE+XG4gICAgICAgICAgICA8aDI+VGhlcmUgd2FzIGEgcHJvYmxlbTwvaDI+XG4gICAgICAgICAgICA8aDM+eyBtZXNzYWdlIH08L2gzPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEludmFsaWRcbiJdfQ==