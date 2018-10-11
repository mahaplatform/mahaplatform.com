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

var _subscriptions = require('../subscriptions');

var _subscriptions2 = _interopRequireDefault(_subscriptions);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mahaAdmin = require('maha-admin');

var _push = require('./push');

var _push2 = _interopRequireDefault(_push);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Preferences = function (_React$Component) {
  (0, _inherits3.default)(Preferences, _React$Component);

  function Preferences() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Preferences);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Preferences.__proto__ || Object.getPrototypeOf(Preferences)).call.apply(_ref, [this].concat(args))), _this), _this._handleCancel = _this._handleCancel.bind(_this), _this._handleSuccess = _this._handleSuccess.bind(_this), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Preferences, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_mahaAdmin.Form, this._getForm());
    }
  }, {
    key: '_getForm',
    value: function _getForm() {
      return {
        title: 'Notifications',
        method: 'patch',
        endpoint: '/api/admin/account/preferences',
        action: '/api/admin/account/preferences',
        onCancel: this._handleCancel,
        onSuccess: this._handleSuccess,
        before: _react2.default.createElement(_push2.default, null),
        sections: [{
          fields: [{ label: 'Delivery Method', instructions: 'If you are not signed in when a notification arrives, we can send you an email. Please indicate how you would like to be contacted when you miss a notification.', name: 'notification_method_id', type: 'radiogroup', endpoint: '/api/admin/notification_methods', value: 'id', text: 'title', format: _notification_method_token2.default }, { label: 'Subscriptions', instructions: 'Please inform me when the following events occur', name: 'ignored', type: _subscriptions2.default }]
        }]
      };
    }
  }, {
    key: '_handleCancel',
    value: function _handleCancel() {
      this.context.modal.close();
    }
  }, {
    key: '_handleSuccess',
    value: function _handleSuccess(user) {
      this.context.modal.close();
      this.context.flash.set('success', 'Your notification preferences were successfully updated');
    }
  }]);
  return Preferences;
}(_react2.default.Component);

Preferences.contextTypes = {
  flash: _propTypes2.default.object,
  modal: _propTypes2.default.object
};
exports.default = Preferences;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiUHJlZmVyZW5jZXMiLCJfaGFuZGxlQ2FuY2VsIiwiYmluZCIsIl9oYW5kbGVTdWNjZXNzIiwiX2dldEZvcm0iLCJ0aXRsZSIsIm1ldGhvZCIsImVuZHBvaW50IiwiYWN0aW9uIiwib25DYW5jZWwiLCJvblN1Y2Nlc3MiLCJiZWZvcmUiLCJzZWN0aW9ucyIsImZpZWxkcyIsImxhYmVsIiwiaW5zdHJ1Y3Rpb25zIiwibmFtZSIsInR5cGUiLCJ2YWx1ZSIsInRleHQiLCJmb3JtYXQiLCJOb3RpZmljYXRpb25NZXRob2RUb2tlbiIsIlN1YnNjcmlwdGlvbnMiLCJjb250ZXh0IiwibW9kYWwiLCJjbG9zZSIsInVzZXIiLCJmbGFzaCIsInNldCIsIlJlYWN0IiwiQ29tcG9uZW50IiwiY29udGV4dFR5cGVzIiwiUHJvcFR5cGVzIiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRU1BLFc7Ozs7Ozs7Ozs7Ozs7OzhNQU9KQyxhLEdBQWdCLE1BQUtBLGFBQUwsQ0FBbUJDLElBQW5CLE8sUUFDaEJDLGMsR0FBaUIsTUFBS0EsY0FBTCxDQUFvQkQsSUFBcEIsTzs7Ozs7NkJBRVI7QUFDUCxhQUFPLDhCQUFDLGVBQUQsRUFBVyxLQUFLRSxRQUFMLEVBQVgsQ0FBUDtBQUNEOzs7K0JBRVU7QUFDVCxhQUFPO0FBQ0xDLGVBQU8sZUFERjtBQUVMQyxnQkFBUSxPQUZIO0FBR0xDLGtCQUFVLGdDQUhMO0FBSUxDLGdCQUFRLGdDQUpIO0FBS0xDLGtCQUFVLEtBQUtSLGFBTFY7QUFNTFMsbUJBQVcsS0FBS1AsY0FOWDtBQU9MUSxnQkFBUSw4QkFBQyxjQUFELE9BUEg7QUFRTEMsa0JBQVUsQ0FDUjtBQUNFQyxrQkFBUSxDQUNOLEVBQUVDLE9BQU8saUJBQVQsRUFBNEJDLGNBQWMsa0tBQTFDLEVBQThNQyxNQUFNLHdCQUFwTixFQUE4T0MsTUFBTSxZQUFwUCxFQUFrUVYsVUFBVSxpQ0FBNVEsRUFBK1NXLE9BQU8sSUFBdFQsRUFBNFRDLE1BQU0sT0FBbFUsRUFBMlVDLFFBQVFDLG1DQUFuVixFQURNLEVBRU4sRUFBRVAsT0FBTyxlQUFULEVBQTBCQyxjQUFjLGtEQUF4QyxFQUE0RkMsTUFBTSxTQUFsRyxFQUE2R0MsTUFBTUssdUJBQW5ILEVBRk07QUFEVixTQURRO0FBUkwsT0FBUDtBQWlCRDs7O29DQUVlO0FBQ2QsV0FBS0MsT0FBTCxDQUFhQyxLQUFiLENBQW1CQyxLQUFuQjtBQUNEOzs7bUNBRWNDLEksRUFBTTtBQUNuQixXQUFLSCxPQUFMLENBQWFDLEtBQWIsQ0FBbUJDLEtBQW5CO0FBQ0EsV0FBS0YsT0FBTCxDQUFhSSxLQUFiLENBQW1CQyxHQUFuQixDQUF1QixTQUF2QixFQUFrQyx5REFBbEM7QUFDRDs7O0VBekN1QkMsZ0JBQU1DLFM7O0FBQTFCOUIsVyxDQUVHK0IsWSxHQUFlO0FBQ3BCSixTQUFPSyxvQkFBVUMsTUFERztBQUVwQlQsU0FBT1Esb0JBQVVDO0FBRkcsQztrQkEyQ1RqQyxXIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTm90aWZpY2F0aW9uTWV0aG9kVG9rZW4gZnJvbSAnLi4vbm90aWZpY2F0aW9uX21ldGhvZF90b2tlbidcbmltcG9ydCBTdWJzY3JpcHRpb25zIGZyb20gJy4uL3N1YnNjcmlwdGlvbnMnXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnbWFoYS1hZG1pbidcbmltcG9ydCBQdXNoIGZyb20gJy4vcHVzaCdcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY2xhc3MgUHJlZmVyZW5jZXMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgZmxhc2g6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgbW9kYWw6IFByb3BUeXBlcy5vYmplY3RcbiAgfVxuXG4gIF9oYW5kbGVDYW5jZWwgPSB0aGlzLl9oYW5kbGVDYW5jZWwuYmluZCh0aGlzKVxuICBfaGFuZGxlU3VjY2VzcyA9IHRoaXMuX2hhbmRsZVN1Y2Nlc3MuYmluZCh0aGlzKVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gPEZvcm0geyAuLi50aGlzLl9nZXRGb3JtKCkgfSAvPlxuICB9XG5cbiAgX2dldEZvcm0oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiAnTm90aWZpY2F0aW9ucycsXG4gICAgICBtZXRob2Q6ICdwYXRjaCcsXG4gICAgICBlbmRwb2ludDogJy9hcGkvYWRtaW4vYWNjb3VudC9wcmVmZXJlbmNlcycsXG4gICAgICBhY3Rpb246ICcvYXBpL2FkbWluL2FjY291bnQvcHJlZmVyZW5jZXMnLFxuICAgICAgb25DYW5jZWw6IHRoaXMuX2hhbmRsZUNhbmNlbCxcbiAgICAgIG9uU3VjY2VzczogdGhpcy5faGFuZGxlU3VjY2VzcyxcbiAgICAgIGJlZm9yZTogPFB1c2ggLz4sXG4gICAgICBzZWN0aW9uczogW1xuICAgICAgICB7XG4gICAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7IGxhYmVsOiAnRGVsaXZlcnkgTWV0aG9kJywgaW5zdHJ1Y3Rpb25zOiAnSWYgeW91IGFyZSBub3Qgc2lnbmVkIGluIHdoZW4gYSBub3RpZmljYXRpb24gYXJyaXZlcywgd2UgY2FuIHNlbmQgeW91IGFuIGVtYWlsLiBQbGVhc2UgaW5kaWNhdGUgaG93IHlvdSB3b3VsZCBsaWtlIHRvIGJlIGNvbnRhY3RlZCB3aGVuIHlvdSBtaXNzIGEgbm90aWZpY2F0aW9uLicsIG5hbWU6ICdub3RpZmljYXRpb25fbWV0aG9kX2lkJywgdHlwZTogJ3JhZGlvZ3JvdXAnLCBlbmRwb2ludDogJy9hcGkvYWRtaW4vbm90aWZpY2F0aW9uX21ldGhvZHMnLCB2YWx1ZTogJ2lkJywgdGV4dDogJ3RpdGxlJywgZm9ybWF0OiBOb3RpZmljYXRpb25NZXRob2RUb2tlbiB9LFxuICAgICAgICAgICAgeyBsYWJlbDogJ1N1YnNjcmlwdGlvbnMnLCBpbnN0cnVjdGlvbnM6ICdQbGVhc2UgaW5mb3JtIG1lIHdoZW4gdGhlIGZvbGxvd2luZyBldmVudHMgb2NjdXInLCBuYW1lOiAnaWdub3JlZCcsIHR5cGU6IFN1YnNjcmlwdGlvbnMgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgfVxuXG4gIF9oYW5kbGVDYW5jZWwoKSB7XG4gICAgdGhpcy5jb250ZXh0Lm1vZGFsLmNsb3NlKClcbiAgfVxuXG4gIF9oYW5kbGVTdWNjZXNzKHVzZXIpIHtcbiAgICB0aGlzLmNvbnRleHQubW9kYWwuY2xvc2UoKVxuICAgIHRoaXMuY29udGV4dC5mbGFzaC5zZXQoJ3N1Y2Nlc3MnLCAnWW91ciBub3RpZmljYXRpb24gcHJlZmVyZW5jZXMgd2VyZSBzdWNjZXNzZnVsbHkgdXBkYXRlZCcpXG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBQcmVmZXJlbmNlc1xuIl19