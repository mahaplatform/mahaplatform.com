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

var _notification_method_token = require('../notification_method_token');

var _notification_method_token2 = _interopRequireDefault(_notification_method_token);

var _client = require('../../../client');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Notifications = function (_React$Component) {
  (0, _inherits3.default)(Notifications, _React$Component);

  function Notifications() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Notifications);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Notifications.__proto__ || Object.getPrototypeOf(Notifications)).call.apply(_ref, [this].concat(args))), _this), _this._handleNotification = _this._handleNotification.bind(_this), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Notifications, [{
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
              'h2',
              null,
              'Notification Preferences'
            ),
            _react2.default.createElement(
              'p',
              null,
              'If you are not signed in when a notification arrives, we can send you an email. Please indicate how you would like to be contacted when you miss a notification.'
            ),
            _react2.default.createElement(_client.RadioGroup, this._getRadioGroup())
          )
        )
      );
    }
  }, {
    key: '_getRadioGroup',
    value: function _getRadioGroup() {
      return {
        options: this.props.notification_methods,
        value: 'id',
        text: 'title',
        format: _notification_method_token2.default,
        onChange: this._handleNotification
      };
    }
  }, {
    key: '_handleNotification',
    value: function _handleNotification(value) {
      this.props.onNotifications(this.props.token, value);
    }
  }]);
  return Notifications;
}(_react2.default.Component);

Notifications.propTypes = {
  notification_methods: _propTypes2.default.array,
  token: _propTypes2.default.string,
  onNotifications: _propTypes2.default.func
};
exports.default = Notifications;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiTm90aWZpY2F0aW9ucyIsIl9oYW5kbGVOb3RpZmljYXRpb24iLCJiaW5kIiwiX2dldFJhZGlvR3JvdXAiLCJvcHRpb25zIiwicHJvcHMiLCJub3RpZmljYXRpb25fbWV0aG9kcyIsInZhbHVlIiwidGV4dCIsImZvcm1hdCIsIk5vdGlmaWNhdGlvbk1ldGhvZFRva2VuIiwib25DaGFuZ2UiLCJvbk5vdGlmaWNhdGlvbnMiLCJ0b2tlbiIsIlJlYWN0IiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwiYXJyYXkiLCJzdHJpbmciLCJmdW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFTUEsYTs7Ozs7Ozs7Ozs7Ozs7a05BUUpDLG1CLEdBQXNCLE1BQUtBLG1CQUFMLENBQXlCQyxJQUF6QixPOzs7Ozs2QkFFYjtBQUNQLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxtQkFBZjtBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsa0JBQWY7QUFDRTtBQUFBO0FBQUEsY0FBSyxXQUFVLHFCQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQURGO0FBRUU7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUZGO0FBT0UsMENBQUMsa0JBQUQsRUFBaUIsS0FBS0MsY0FBTCxFQUFqQjtBQVBGO0FBREY7QUFERixPQURGO0FBZUQ7OztxQ0FFZ0I7QUFDZixhQUFPO0FBQ0xDLGlCQUFTLEtBQUtDLEtBQUwsQ0FBV0Msb0JBRGY7QUFFTEMsZUFBTyxJQUZGO0FBR0xDLGNBQU0sT0FIRDtBQUlMQyxnQkFBUUMsbUNBSkg7QUFLTEMsa0JBQVUsS0FBS1Y7QUFMVixPQUFQO0FBT0Q7Ozt3Q0FFbUJNLEssRUFBTztBQUN6QixXQUFLRixLQUFMLENBQVdPLGVBQVgsQ0FBMkIsS0FBS1AsS0FBTCxDQUFXUSxLQUF0QyxFQUE2Q04sS0FBN0M7QUFDRDs7O0VBeEN5Qk8sZ0JBQU1DLFM7O0FBQTVCZixhLENBRUdnQixTLEdBQVk7QUFDakJWLHdCQUFzQlcsb0JBQVVDLEtBRGY7QUFFakJMLFNBQU9JLG9CQUFVRSxNQUZBO0FBR2pCUCxtQkFBaUJLLG9CQUFVRztBQUhWLEM7a0JBMENOcEIsYSIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5vdGlmaWNhdGlvbk1ldGhvZFRva2VuIGZyb20gJy4uL25vdGlmaWNhdGlvbl9tZXRob2RfdG9rZW4nXG5pbXBvcnQgeyBSYWRpb0dyb3VwIH0gZnJvbSAnLi4vLi4vLi4vY2xpZW50J1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5jbGFzcyBOb3RpZmljYXRpb25zIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG5vdGlmaWNhdGlvbl9tZXRob2RzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgdG9rZW46IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgb25Ob3RpZmljYXRpb25zOiBQcm9wVHlwZXMuZnVuY1xuICB9XG5cbiAgX2hhbmRsZU5vdGlmaWNhdGlvbiA9IHRoaXMuX2hhbmRsZU5vdGlmaWNhdGlvbi5iaW5kKHRoaXMpXG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1haGEtc2lnbmluLXBhbmVsXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFoYS1zaWduaW4tZm9ybVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFoYS1zaWduaW4tY29udGVudFwiPlxuICAgICAgICAgICAgPGgyPk5vdGlmaWNhdGlvbiBQcmVmZXJlbmNlczwvaDI+XG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgSWYgeW91IGFyZSBub3Qgc2lnbmVkIGluIHdoZW4gYSBub3RpZmljYXRpb24gYXJyaXZlcywgd2UgY2FuXG4gICAgICAgICAgICAgIHNlbmQgeW91IGFuIGVtYWlsLiBQbGVhc2UgaW5kaWNhdGUgaG93IHlvdSB3b3VsZCBsaWtlIHRvXG4gICAgICAgICAgICAgIGJlIGNvbnRhY3RlZCB3aGVuIHlvdSBtaXNzIGEgbm90aWZpY2F0aW9uLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPFJhZGlvR3JvdXAgeyAuLi50aGlzLl9nZXRSYWRpb0dyb3VwKCl9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbiAgX2dldFJhZGlvR3JvdXAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9wdGlvbnM6IHRoaXMucHJvcHMubm90aWZpY2F0aW9uX21ldGhvZHMsXG4gICAgICB2YWx1ZTogJ2lkJyxcbiAgICAgIHRleHQ6ICd0aXRsZScsXG4gICAgICBmb3JtYXQ6IE5vdGlmaWNhdGlvbk1ldGhvZFRva2VuLFxuICAgICAgb25DaGFuZ2U6IHRoaXMuX2hhbmRsZU5vdGlmaWNhdGlvblxuICAgIH1cbiAgfVxuXG4gIF9oYW5kbGVOb3RpZmljYXRpb24odmFsdWUpIHtcbiAgICB0aGlzLnByb3BzLm9uTm90aWZpY2F0aW9ucyh0aGlzLnByb3BzLnRva2VuLCB2YWx1ZSlcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IE5vdGlmaWNhdGlvbnNcbiJdfQ==