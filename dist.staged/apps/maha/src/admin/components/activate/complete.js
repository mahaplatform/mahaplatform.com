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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Complete = function (_React$Component) {
  (0, _inherits3.default)(Complete, _React$Component);

  function Complete() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Complete);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Complete.__proto__ || Object.getPrototypeOf(Complete)).call.apply(_ref, [this].concat(args))), _this), _this._handleClick = _this._handleClick.bind(_this), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Complete, [{
    key: 'render',
    value: function render() {
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
              _react2.default.createElement('i', { className: 'fa fa-check-circle' })
            ),
            _react2.default.createElement(
              'h2',
              null,
              'Congratulations!'
            ),
            _react2.default.createElement(
              'p',
              null,
              'Your account has been successfully activated! You may now begin using the Maha Platform.'
            ),
            _react2.default.createElement(
              'div',
              { className: 'field button-field' },
              _react2.default.createElement(
                'button',
                { className: 'ui fluid large button', onClick: this._handleClick },
                'Continue ',
                _react2.default.createElement('i', { className: 'right chevron icon' })
              )
            )
          )
        )
      );
    }
  }, {
    key: '_handleClick',
    value: function _handleClick() {
      var _props = this.props,
          team = _props.team,
          token = _props.token,
          user = _props.user;
      var _context = this.context,
          admin = _context.admin,
          router = _context.router;

      if (user) {
        var index = _lodash2.default.findIndex(admin.teams, { id: team.id, user: { id: user.id } });
        if (index >= 0) {
          admin.signin(index, token);
        } else {
          admin.addTeam(team, token, user);
        }
        router.push('/admin');
      }
    }
  }]);
  return Complete;
}(_react2.default.Component);

Complete.contextTypes = {
  admin: _propTypes2.default.object,
  router: _propTypes2.default.object
};
Complete.propTypes = {
  team: _propTypes2.default.object,
  token: _propTypes2.default.string,
  user: _propTypes2.default.object,
  onChangeMode: _propTypes2.default.func
};
exports.default = Complete;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiQ29tcGxldGUiLCJfaGFuZGxlQ2xpY2siLCJiaW5kIiwicHJvcHMiLCJ0ZWFtIiwidG9rZW4iLCJ1c2VyIiwiY29udGV4dCIsImFkbWluIiwicm91dGVyIiwiaW5kZXgiLCJfIiwiZmluZEluZGV4IiwidGVhbXMiLCJpZCIsInNpZ25pbiIsImFkZFRlYW0iLCJwdXNoIiwiUmVhY3QiLCJDb21wb25lbnQiLCJjb250ZXh0VHlwZXMiLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJwcm9wVHlwZXMiLCJzdHJpbmciLCJvbkNoYW5nZU1vZGUiLCJmdW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFTUEsUTs7Ozs7Ozs7Ozs7Ozs7d01BY0pDLFksR0FBZSxNQUFLQSxZQUFMLENBQWtCQyxJQUFsQixPOzs7Ozs2QkFFTjtBQUNQLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxtQkFBZjtBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsa0JBQWY7QUFDRTtBQUFBO0FBQUEsY0FBSyxXQUFVLHFCQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQUksbURBQUcsV0FBVSxvQkFBYjtBQUFKLGFBREY7QUFFRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBRkY7QUFHRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBSEY7QUFPRTtBQUFBO0FBQUEsZ0JBQUssV0FBVSxvQkFBZjtBQUNFO0FBQUE7QUFBQSxrQkFBUSxXQUFVLHVCQUFsQixFQUEwQyxTQUFVLEtBQUtELFlBQXpEO0FBQUE7QUFDVyxxREFBRyxXQUFVLG9CQUFiO0FBRFg7QUFERjtBQVBGO0FBREY7QUFERixPQURGO0FBbUJEOzs7bUNBRWM7QUFBQSxtQkFDaUIsS0FBS0UsS0FEdEI7QUFBQSxVQUNMQyxJQURLLFVBQ0xBLElBREs7QUFBQSxVQUNDQyxLQURELFVBQ0NBLEtBREQ7QUFBQSxVQUNRQyxJQURSLFVBQ1FBLElBRFI7QUFBQSxxQkFFYSxLQUFLQyxPQUZsQjtBQUFBLFVBRUxDLEtBRkssWUFFTEEsS0FGSztBQUFBLFVBRUVDLE1BRkYsWUFFRUEsTUFGRjs7QUFHYixVQUFHSCxJQUFILEVBQVM7QUFDUCxZQUFNSSxRQUFRQyxpQkFBRUMsU0FBRixDQUFZSixNQUFNSyxLQUFsQixFQUF5QixFQUFFQyxJQUFJVixLQUFLVSxFQUFYLEVBQWVSLE1BQU0sRUFBRVEsSUFBSVIsS0FBS1EsRUFBWCxFQUFyQixFQUF6QixDQUFkO0FBQ0EsWUFBR0osU0FBUyxDQUFaLEVBQWU7QUFDYkYsZ0JBQU1PLE1BQU4sQ0FBYUwsS0FBYixFQUFvQkwsS0FBcEI7QUFDRCxTQUZELE1BRU87QUFDTEcsZ0JBQU1RLE9BQU4sQ0FBY1osSUFBZCxFQUFvQkMsS0FBcEIsRUFBMkJDLElBQTNCO0FBQ0Q7QUFDREcsZUFBT1EsSUFBUCxDQUFZLFFBQVo7QUFDRDtBQUNGOzs7RUFsRG9CQyxnQkFBTUMsUzs7QUFBdkJuQixRLENBRUdvQixZLEdBQWU7QUFDcEJaLFNBQU9hLG9CQUFVQyxNQURHO0FBRXBCYixVQUFRWSxvQkFBVUM7QUFGRSxDO0FBRmxCdEIsUSxDQU9HdUIsUyxHQUFZO0FBQ2pCbkIsUUFBTWlCLG9CQUFVQyxNQURDO0FBRWpCakIsU0FBT2dCLG9CQUFVRyxNQUZBO0FBR2pCbEIsUUFBTWUsb0JBQVVDLE1BSEM7QUFJakJHLGdCQUFjSixvQkFBVUs7QUFKUCxDO2tCQStDTjFCLFEiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCdcblxuY2xhc3MgQ29tcGxldGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgYWRtaW46IFByb3BUeXBlcy5vYmplY3QsXG4gICAgcm91dGVyOiBQcm9wVHlwZXMub2JqZWN0XG4gIH1cblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIHRlYW06IFByb3BUeXBlcy5vYmplY3QsXG4gICAgdG9rZW46IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdXNlcjogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBvbkNoYW5nZU1vZGU6IFByb3BUeXBlcy5mdW5jXG4gIH1cblxuICBfaGFuZGxlQ2xpY2sgPSB0aGlzLl9oYW5kbGVDbGljay5iaW5kKHRoaXMpXG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1haGEtc2lnbmluLXBhbmVsXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFoYS1zaWduaW4tZm9ybVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFoYS1zaWduaW4tY29udGVudFwiPlxuICAgICAgICAgICAgPGgxPjxpIGNsYXNzTmFtZT1cImZhIGZhLWNoZWNrLWNpcmNsZVwiIC8+PC9oMT5cbiAgICAgICAgICAgIDxoMj5Db25ncmF0dWxhdGlvbnMhPC9oMj5cbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICBZb3VyIGFjY291bnQgaGFzIGJlZW4gc3VjY2Vzc2Z1bGx5IGFjdGl2YXRlZCEgWW91IG1heSBub3cgYmVnaW5cbiAgICAgICAgICAgICAgdXNpbmcgdGhlIE1haGEgUGxhdGZvcm0uXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpZWxkIGJ1dHRvbi1maWVsZFwiPlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInVpIGZsdWlkIGxhcmdlIGJ1dHRvblwiIG9uQ2xpY2s9eyB0aGlzLl9oYW5kbGVDbGljayB9PlxuICAgICAgICAgICAgICAgIENvbnRpbnVlIDxpIGNsYXNzTmFtZT1cInJpZ2h0IGNoZXZyb24gaWNvblwiIC8+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbiAgX2hhbmRsZUNsaWNrKCkge1xuICAgIGNvbnN0IHsgdGVhbSwgdG9rZW4sIHVzZXIgfSA9IHRoaXMucHJvcHNcbiAgICBjb25zdCB7IGFkbWluLCByb3V0ZXIgfSA9IHRoaXMuY29udGV4dFxuICAgIGlmKHVzZXIpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gXy5maW5kSW5kZXgoYWRtaW4udGVhbXMsIHsgaWQ6IHRlYW0uaWQsIHVzZXI6IHsgaWQ6IHVzZXIuaWQgfSB9KVxuICAgICAgaWYoaW5kZXggPj0gMCkge1xuICAgICAgICBhZG1pbi5zaWduaW4oaW5kZXgsIHRva2VuKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWRtaW4uYWRkVGVhbSh0ZWFtLCB0b2tlbiwgdXNlcilcbiAgICAgIH1cbiAgICAgIHJvdXRlci5wdXNoKCcvYWRtaW4nKVxuICAgIH1cbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbXBsZXRlXG4iXX0=