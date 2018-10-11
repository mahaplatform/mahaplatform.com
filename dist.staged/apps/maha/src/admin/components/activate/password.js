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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Password = function (_React$Component) {
  (0, _inherits3.default)(Password, _React$Component);

  function Password() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Password);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Password.__proto__ || Object.getPrototypeOf(Password)).call.apply(_ref, [this].concat(args))), _this), _this.password = null, _this.confirmation = null, _this._handleSubmit = _this._handleSubmit.bind(_this), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Password, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

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
              'h2',
              null,
              'Choose a Password'
            ),
            _react2.default.createElement(
              'p',
              null,
              'Enter and confirm the password that you will use to signin.'
            )
          ),
          _react2.default.createElement(
            'form',
            { className: 'ui form', onSubmit: this._handleSubmit },
            _react2.default.createElement('input', { type: 'hidden', value: 'something' }),
            _react2.default.createElement(
              'div',
              { className: 'field text-field' },
              _react2.default.createElement(
                'div',
                { className: 'ui left icon input' },
                _react2.default.createElement('i', { className: 'lock icon' }),
                _react2.default.createElement('input', { type: 'password', className: 'form-control', autoComplete: 'off', autoCapitalize: 'off', autoCorrect: 'off', spellCheck: 'false', placeholder: 'Password', ref: function ref(node) {
                    return _this2.password = node;
                  } })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'field text-field' },
              _react2.default.createElement(
                'div',
                { className: 'ui left icon input' },
                _react2.default.createElement('i', { className: 'lock icon' }),
                _react2.default.createElement('input', { type: 'password', className: 'form-control', autoComplete: 'off', autoCapitalize: 'off', autoCorrect: 'off', spellCheck: 'false', placeholder: 'Confirm', ref: function ref(node) {
                    return _this2.confirmation = node;
                  } })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'field button-field' },
              _react2.default.createElement(
                'button',
                { className: 'ui fluid large ' + (status === 'submitting' ? 'loading' : '') + ' button' },
                'Continue ',
                _react2.default.createElement('i', { className: 'right chevron icon' })
              )
            )
          )
        )
      );
    }
  }, {
    key: '_handleBack',
    value: function _handleBack() {
      this.props.onChangeMode('answer');
    }
  }, {
    key: '_handleSubmit',
    value: function _handleSubmit(e) {
      var _props = this.props,
          token = _props.token,
          onPassword = _props.onPassword;

      this.password.focus();
      var password = this.password.value;
      var confirmation = this.confirmation.value;
      onPassword(token, password, confirmation);
      e.preventDefault();
      return false;
    }
  }]);
  return Password;
}(_react2.default.Component);

Password.contextTypes = {
  admin: _propTypes2.default.object,
  flash: _propTypes2.default.object
};
Password.propTypes = {
  question: _propTypes2.default.object,
  team: _propTypes2.default.object,
  token: _propTypes2.default.string,
  user: _propTypes2.default.object,
  onChangeMode: _propTypes2.default.func,
  onPassword: _propTypes2.default.func
};
exports.default = Password;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiUGFzc3dvcmQiLCJwYXNzd29yZCIsImNvbmZpcm1hdGlvbiIsIl9oYW5kbGVTdWJtaXQiLCJiaW5kIiwibm9kZSIsInN0YXR1cyIsInByb3BzIiwib25DaGFuZ2VNb2RlIiwiZSIsInRva2VuIiwib25QYXNzd29yZCIsImZvY3VzIiwidmFsdWUiLCJwcmV2ZW50RGVmYXVsdCIsIlJlYWN0IiwiQ29tcG9uZW50IiwiY29udGV4dFR5cGVzIiwiYWRtaW4iLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJmbGFzaCIsInByb3BUeXBlcyIsInF1ZXN0aW9uIiwidGVhbSIsInN0cmluZyIsInVzZXIiLCJmdW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0lBRU1BLFE7Ozs7Ozs7Ozs7Ozs7O3dNQWdCSkMsUSxHQUFXLEksUUFFWEMsWSxHQUFlLEksUUFFZkMsYSxHQUFnQixNQUFLQSxhQUFMLENBQW1CQyxJQUFuQixPOzs7Ozs2QkFFUDtBQUFBOztBQUNQLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxtQkFBZjtBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsa0JBQWY7QUFDRTtBQUFBO0FBQUEsY0FBSyxXQUFVLHFCQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQURGO0FBRUU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUZGLFdBREY7QUFLRTtBQUFBO0FBQUEsY0FBTSxXQUFVLFNBQWhCLEVBQTBCLFVBQVcsS0FBS0QsYUFBMUM7QUFDRSxxREFBTyxNQUFLLFFBQVosRUFBcUIsT0FBTSxXQUEzQixHQURGO0FBRUU7QUFBQTtBQUFBLGdCQUFLLFdBQVUsa0JBQWY7QUFDRTtBQUFBO0FBQUEsa0JBQUssV0FBVSxvQkFBZjtBQUNFLHFEQUFHLFdBQVUsV0FBYixHQURGO0FBRUUseURBQU8sTUFBSyxVQUFaLEVBQXVCLFdBQVUsY0FBakMsRUFBZ0QsY0FBYSxLQUE3RCxFQUFtRSxnQkFBZSxLQUFsRixFQUF3RixhQUFZLEtBQXBHLEVBQTBHLFlBQVcsT0FBckgsRUFBNkgsYUFBWSxVQUF6SSxFQUFvSixLQUFNLGFBQUNFLElBQUQ7QUFBQSwyQkFBVSxPQUFLSixRQUFMLEdBQWdCSSxJQUExQjtBQUFBLG1CQUExSjtBQUZGO0FBREYsYUFGRjtBQVFFO0FBQUE7QUFBQSxnQkFBSyxXQUFVLGtCQUFmO0FBQ0U7QUFBQTtBQUFBLGtCQUFLLFdBQVUsb0JBQWY7QUFDRSxxREFBRyxXQUFVLFdBQWIsR0FERjtBQUVFLHlEQUFPLE1BQUssVUFBWixFQUF1QixXQUFVLGNBQWpDLEVBQWdELGNBQWEsS0FBN0QsRUFBbUUsZ0JBQWUsS0FBbEYsRUFBd0YsYUFBWSxLQUFwRyxFQUEwRyxZQUFXLE9BQXJILEVBQTZILGFBQVksU0FBekksRUFBbUosS0FBTSxhQUFDQSxJQUFEO0FBQUEsMkJBQVUsT0FBS0gsWUFBTCxHQUFvQkcsSUFBOUI7QUFBQSxtQkFBeko7QUFGRjtBQURGLGFBUkY7QUFjRTtBQUFBO0FBQUEsZ0JBQUssV0FBVSxvQkFBZjtBQUNFO0FBQUE7QUFBQSxrQkFBUSxnQ0FBOEJDLFdBQVcsWUFBWixHQUE0QixTQUE1QixHQUF3QyxFQUFyRSxhQUFSO0FBQUE7QUFDVyxxREFBRyxXQUFVLG9CQUFiO0FBRFg7QUFERjtBQWRGO0FBTEY7QUFERixPQURGO0FBOEJEOzs7a0NBRWE7QUFDWixXQUFLQyxLQUFMLENBQVdDLFlBQVgsQ0FBd0IsUUFBeEI7QUFDRDs7O2tDQUVhQyxDLEVBQUc7QUFBQSxtQkFDZSxLQUFLRixLQURwQjtBQUFBLFVBQ1BHLEtBRE8sVUFDUEEsS0FETztBQUFBLFVBQ0FDLFVBREEsVUFDQUEsVUFEQTs7QUFFZixXQUFLVixRQUFMLENBQWNXLEtBQWQ7QUFDQSxVQUFNWCxXQUFXLEtBQUtBLFFBQUwsQ0FBY1ksS0FBL0I7QUFDQSxVQUFNWCxlQUFlLEtBQUtBLFlBQUwsQ0FBa0JXLEtBQXZDO0FBQ0FGLGlCQUFXRCxLQUFYLEVBQWtCVCxRQUFsQixFQUE0QkMsWUFBNUI7QUFDQU8sUUFBRUssY0FBRjtBQUNBLGFBQU8sS0FBUDtBQUNEOzs7RUFuRW9CQyxnQkFBTUMsUzs7QUFBdkJoQixRLENBRUdpQixZLEdBQWU7QUFDcEJDLFNBQU9DLG9CQUFVQyxNQURHO0FBRXBCQyxTQUFPRixvQkFBVUM7QUFGRyxDO0FBRmxCcEIsUSxDQU9Hc0IsUyxHQUFZO0FBQ2pCQyxZQUFVSixvQkFBVUMsTUFESDtBQUVqQkksUUFBTUwsb0JBQVVDLE1BRkM7QUFHakJWLFNBQU9TLG9CQUFVTSxNQUhBO0FBSWpCQyxRQUFNUCxvQkFBVUMsTUFKQztBQUtqQlosZ0JBQWNXLG9CQUFVUSxJQUxQO0FBTWpCaEIsY0FBWVEsb0JBQVVRO0FBTkwsQztrQkFnRU4zQixRIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmNsYXNzIFBhc3N3b3JkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgIGFkbWluOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGZsYXNoOiBQcm9wVHlwZXMub2JqZWN0XG4gIH1cblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIHF1ZXN0aW9uOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHRlYW06IFByb3BUeXBlcy5vYmplY3QsXG4gICAgdG9rZW46IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdXNlcjogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBvbkNoYW5nZU1vZGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uUGFzc3dvcmQ6IFByb3BUeXBlcy5mdW5jXG4gIH1cblxuICBwYXNzd29yZCA9IG51bGxcblxuICBjb25maXJtYXRpb24gPSBudWxsXG5cbiAgX2hhbmRsZVN1Ym1pdCA9IHRoaXMuX2hhbmRsZVN1Ym1pdC5iaW5kKHRoaXMpXG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1haGEtc2lnbmluLXBhbmVsXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFoYS1zaWduaW4tZm9ybVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFoYS1zaWduaW4tY29udGVudFwiPlxuICAgICAgICAgICAgPGgyPkNob29zZSBhIFBhc3N3b3JkPC9oMj5cbiAgICAgICAgICAgIDxwPkVudGVyIGFuZCBjb25maXJtIHRoZSBwYXNzd29yZCB0aGF0IHlvdSB3aWxsIHVzZSB0byBzaWduaW4uPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cInVpIGZvcm1cIiBvblN1Ym1pdD17IHRoaXMuX2hhbmRsZVN1Ym1pdCB9PlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cInNvbWV0aGluZ1wiIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpZWxkIHRleHQtZmllbGRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1aSBsZWZ0IGljb24gaW5wdXRcIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJsb2NrIGljb25cIj48L2k+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIGF1dG9Db21wbGV0ZT1cIm9mZlwiIGF1dG9DYXBpdGFsaXplPVwib2ZmXCIgYXV0b0NvcnJlY3Q9XCJvZmZcIiBzcGVsbENoZWNrPVwiZmFsc2VcIiBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCIgcmVmPXsgKG5vZGUpID0+IHRoaXMucGFzc3dvcmQgPSBub2RlIH0gLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmllbGQgdGV4dC1maWVsZFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInVpIGxlZnQgaWNvbiBpbnB1dFwiPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImxvY2sgaWNvblwiPjwvaT5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgYXV0b0NvbXBsZXRlPVwib2ZmXCIgYXV0b0NhcGl0YWxpemU9XCJvZmZcIiBhdXRvQ29ycmVjdD1cIm9mZlwiIHNwZWxsQ2hlY2s9XCJmYWxzZVwiIHBsYWNlaG9sZGVyPVwiQ29uZmlybVwiIHJlZj17IChub2RlKSA9PiB0aGlzLmNvbmZpcm1hdGlvbiA9IG5vZGUgfSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWVsZCBidXR0b24tZmllbGRcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e2B1aSBmbHVpZCBsYXJnZSAkeyhzdGF0dXMgPT09ICdzdWJtaXR0aW5nJykgPyAnbG9hZGluZycgOiAnJ30gYnV0dG9uYH0+XG4gICAgICAgICAgICAgICAgQ29udGludWUgPGkgY2xhc3NOYW1lPVwicmlnaHQgY2hldnJvbiBpY29uXCIgLz5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbiAgX2hhbmRsZUJhY2soKSB7XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZU1vZGUoJ2Fuc3dlcicpXG4gIH1cblxuICBfaGFuZGxlU3VibWl0KGUpIHtcbiAgICBjb25zdCB7IHRva2VuLCBvblBhc3N3b3JkIH0gPSB0aGlzLnByb3BzXG4gICAgdGhpcy5wYXNzd29yZC5mb2N1cygpXG4gICAgY29uc3QgcGFzc3dvcmQgPSB0aGlzLnBhc3N3b3JkLnZhbHVlXG4gICAgY29uc3QgY29uZmlybWF0aW9uID0gdGhpcy5jb25maXJtYXRpb24udmFsdWVcbiAgICBvblBhc3N3b3JkKHRva2VuLCBwYXNzd29yZCwgY29uZmlybWF0aW9uKVxuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGFzc3dvcmRcbiJdfQ==