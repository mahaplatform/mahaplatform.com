'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appToken = function appToken(_ref) {
  var color = _ref.color,
      icon = _ref.icon,
      title = _ref.title;
  return _react2.default.createElement(
    'div',
    { className: 'maha-app-token' },
    _react2.default.createElement(
      'div',
      { className: 'maha-app-token-icon ' + color },
      _react2.default.createElement('i', { className: 'fa fa-fw fa-' + icon })
    ),
    title
  );
};

appToken.propTypes = {
  color: _propTypes2.default.string,
  icon: _propTypes2.default.string,
  title: _propTypes2.default.string
};

exports.default = appToken;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiYXBwVG9rZW4iLCJjb2xvciIsImljb24iLCJ0aXRsZSIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsInN0cmluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsV0FBVyxTQUFYQSxRQUFXO0FBQUEsTUFBR0MsS0FBSCxRQUFHQSxLQUFIO0FBQUEsTUFBVUMsSUFBVixRQUFVQSxJQUFWO0FBQUEsTUFBZ0JDLEtBQWhCLFFBQWdCQSxLQUFoQjtBQUFBLFNBQ2Y7QUFBQTtBQUFBLE1BQUssV0FBVSxnQkFBZjtBQUNFO0FBQUE7QUFBQSxRQUFLLG9DQUFtQ0YsS0FBeEM7QUFDRSwyQ0FBRyw0QkFBMkJDLElBQTlCO0FBREYsS0FERjtBQUlJQztBQUpKLEdBRGU7QUFBQSxDQUFqQjs7QUFTQUgsU0FBU0ksU0FBVCxHQUFxQjtBQUNuQkgsU0FBT0ksb0JBQVVDLE1BREU7QUFFbkJKLFFBQU1HLG9CQUFVQyxNQUZHO0FBR25CSCxTQUFPRSxvQkFBVUM7QUFIRSxDQUFyQjs7a0JBTWVOLFEiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY29uc3QgYXBwVG9rZW4gPSAoeyBjb2xvciwgaWNvbiwgdGl0bGUgfSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cIm1haGEtYXBwLXRva2VuXCI+XG4gICAgPGRpdiBjbGFzc05hbWU9eyBgbWFoYS1hcHAtdG9rZW4taWNvbiAke2NvbG9yfWAgfT5cbiAgICAgIDxpIGNsYXNzTmFtZT17IGBmYSBmYS1mdyBmYS0ke2ljb259YCB9IC8+XG4gICAgPC9kaXY+XG4gICAgeyB0aXRsZSB9XG4gIDwvZGl2PlxuKVxuXG5hcHBUb2tlbi5wcm9wVHlwZXMgPSB7XG4gIGNvbG9yOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBpY29uOiBQcm9wVHlwZXMuc3RyaW5nLFxuICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZ1xufVxuXG5leHBvcnQgZGVmYXVsdCBhcHBUb2tlblxuIl19