'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Alert = function Alert(_ref) {
  var color = _ref.color,
      component = _ref.component,
      message = _ref.message;


  var Component = component;

  return _react2.default.createElement(
    'div',
    { className: 'maha-alert ' + color },
    message && _react2.default.createElement(
      'div',
      { className: 'maha-alert-message' },
      message
    ),
    component && _react2.default.createElement(Component, null)
  );
};

Alert.propTypes = {
  color: _propTypes2.default.string,
  component: _propTypes2.default.any,
  message: _propTypes2.default.string
};

exports.default = Alert;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiQWxlcnQiLCJjb2xvciIsImNvbXBvbmVudCIsIm1lc3NhZ2UiLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJzdHJpbmciLCJhbnkiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLFFBQVEsU0FBUkEsS0FBUSxPQUFtQztBQUFBLE1BQWhDQyxLQUFnQyxRQUFoQ0EsS0FBZ0M7QUFBQSxNQUF6QkMsU0FBeUIsUUFBekJBLFNBQXlCO0FBQUEsTUFBZEMsT0FBYyxRQUFkQSxPQUFjOzs7QUFFL0MsTUFBTUMsWUFBWUYsU0FBbEI7O0FBRUEsU0FDRTtBQUFBO0FBQUEsTUFBSywyQkFBeUJELEtBQTlCO0FBQ0lFLGVBQ0E7QUFBQTtBQUFBLFFBQUssV0FBVSxvQkFBZjtBQUNJQTtBQURKLEtBRko7QUFNSUQsaUJBQWEsOEJBQUMsU0FBRDtBQU5qQixHQURGO0FBV0QsQ0FmRDs7QUFpQkFGLE1BQU1LLFNBQU4sR0FBa0I7QUFDaEJKLFNBQU9LLG9CQUFVQyxNQUREO0FBRWhCTCxhQUFXSSxvQkFBVUUsR0FGTDtBQUdoQkwsV0FBU0csb0JBQVVDO0FBSEgsQ0FBbEI7O2tCQU1lUCxLIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmNvbnN0IEFsZXJ0ID0gKHsgY29sb3IsIGNvbXBvbmVudCwgbWVzc2FnZSB9KSA9PiB7XG5cbiAgY29uc3QgQ29tcG9uZW50ID0gY29tcG9uZW50XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17YG1haGEtYWxlcnQgJHtjb2xvcn1gfT5cbiAgICAgIHsgbWVzc2FnZSAmJlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1haGEtYWxlcnQtbWVzc2FnZVwiPlxuICAgICAgICAgIHsgbWVzc2FnZSB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgfVxuICAgICAgeyBjb21wb25lbnQgJiYgPENvbXBvbmVudCAvPiB9XG4gICAgPC9kaXY+XG4gIClcblxufVxuXG5BbGVydC5wcm9wVHlwZXMgPSB7XG4gIGNvbG9yOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBjb21wb25lbnQ6IFByb3BUeXBlcy5hbnksXG4gIG1lc3NhZ2U6IFByb3BUeXBlcy5zdHJpbmdcbn1cblxuZXhwb3J0IGRlZmF1bHQgQWxlcnRcbiJdfQ==