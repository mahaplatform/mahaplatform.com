'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Token = function Token(_ref) {
  var text = _ref.text,
      value = _ref.value;
  return _react2.default.createElement(
    'div',
    { className: 'reframe-value-token' },
    _lodash2.default.get(value, text)
  );
};

Token.propTypes = {
  text: _propTypes2.default.any,
  value: _propTypes2.default.object
};

exports.default = Token;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiVG9rZW4iLCJ0ZXh0IiwidmFsdWUiLCJfIiwiZ2V0IiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwiYW55Iiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLFFBQVEsU0FBUkEsS0FBUTtBQUFBLE1BQUdDLElBQUgsUUFBR0EsSUFBSDtBQUFBLE1BQVNDLEtBQVQsUUFBU0EsS0FBVDtBQUFBLFNBQ1o7QUFBQTtBQUFBLE1BQUssV0FBVSxxQkFBZjtBQUNJQyxxQkFBRUMsR0FBRixDQUFNRixLQUFOLEVBQWFELElBQWI7QUFESixHQURZO0FBQUEsQ0FBZDs7QUFNQUQsTUFBTUssU0FBTixHQUFrQjtBQUNoQkosUUFBTUssb0JBQVVDLEdBREE7QUFFaEJMLFNBQU9JLG9CQUFVRTtBQUZELENBQWxCOztrQkFLZVIsSyIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuXG5jb25zdCBUb2tlbiA9ICh7IHRleHQsIHZhbHVlIH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJyZWZyYW1lLXZhbHVlLXRva2VuXCI+XG4gICAgeyBfLmdldCh2YWx1ZSwgdGV4dCkgfVxuICA8L2Rpdj5cbilcblxuVG9rZW4ucHJvcFR5cGVzID0ge1xuICB0ZXh0OiBQcm9wVHlwZXMuYW55LFxuICB2YWx1ZTogUHJvcFR5cGVzLm9iamVjdFxufVxuXG5leHBvcnQgZGVmYXVsdCBUb2tlblxuIl19