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

var _mahaAdmin = require('maha-admin');

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

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Password.__proto__ || Object.getPrototypeOf(Password)).call.apply(_ref, [this].concat(args))), _this), _this._handleCancel = _this._handleCancel.bind(_this), _this._handleSuccess = _this._handleSuccess.bind(_this), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Password, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_mahaAdmin.Form, this._getForm());
    }
  }, {
    key: '_getForm',
    value: function _getForm() {
      return {
        title: 'Change Password',
        method: 'patch',
        action: '/api/admin/account/password',
        onCancel: this._handleCancel,
        onSuccess: this._handleSuccess,
        sections: [{
          fields: [{ label: 'Old Password', name: 'old_password', type: 'password', placeholder: 'Old Password', required: true }, { label: 'New Password', name: 'password', type: 'password', placeholder: 'New Password', required: true }, { label: 'Confirm Password', name: 'confirmation', type: 'password', placeholder: 'Confirm Password', required: true }]
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
      this.context.flash.set('success', 'Your password was successfully changed');
    }
  }]);
  return Password;
}(_react2.default.Component);

Password.contextTypes = {
  flash: _propTypes2.default.object,
  modal: _propTypes2.default.object
};
exports.default = Password;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiUGFzc3dvcmQiLCJfaGFuZGxlQ2FuY2VsIiwiYmluZCIsIl9oYW5kbGVTdWNjZXNzIiwiX2dldEZvcm0iLCJ0aXRsZSIsIm1ldGhvZCIsImFjdGlvbiIsIm9uQ2FuY2VsIiwib25TdWNjZXNzIiwic2VjdGlvbnMiLCJmaWVsZHMiLCJsYWJlbCIsIm5hbWUiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJyZXF1aXJlZCIsImNvbnRleHQiLCJtb2RhbCIsImNsb3NlIiwidXNlciIsImZsYXNoIiwic2V0IiwiUmVhY3QiLCJDb21wb25lbnQiLCJjb250ZXh0VHlwZXMiLCJQcm9wVHlwZXMiLCJvYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7SUFFTUEsUTs7Ozs7Ozs7Ozs7Ozs7d01BT0pDLGEsR0FBZ0IsTUFBS0EsYUFBTCxDQUFtQkMsSUFBbkIsTyxRQUNoQkMsYyxHQUFpQixNQUFLQSxjQUFMLENBQW9CRCxJQUFwQixPOzs7Ozs2QkFFUjtBQUNQLGFBQU8sOEJBQUMsZUFBRCxFQUFXLEtBQUtFLFFBQUwsRUFBWCxDQUFQO0FBQ0Q7OzsrQkFFVTtBQUNULGFBQU87QUFDTEMsZUFBTyxpQkFERjtBQUVMQyxnQkFBUSxPQUZIO0FBR0xDLGdCQUFRLDZCQUhIO0FBSUxDLGtCQUFVLEtBQUtQLGFBSlY7QUFLTFEsbUJBQVcsS0FBS04sY0FMWDtBQU1MTyxrQkFBVSxDQUNSO0FBQ0VDLGtCQUFRLENBQ04sRUFBRUMsT0FBTyxjQUFULEVBQXlCQyxNQUFNLGNBQS9CLEVBQStDQyxNQUFNLFVBQXJELEVBQWlFQyxhQUFhLGNBQTlFLEVBQThGQyxVQUFVLElBQXhHLEVBRE0sRUFFTixFQUFFSixPQUFPLGNBQVQsRUFBeUJDLE1BQU0sVUFBL0IsRUFBMkNDLE1BQU0sVUFBakQsRUFBNkRDLGFBQWEsY0FBMUUsRUFBMEZDLFVBQVUsSUFBcEcsRUFGTSxFQUdOLEVBQUVKLE9BQU8sa0JBQVQsRUFBNkJDLE1BQU0sY0FBbkMsRUFBbURDLE1BQU0sVUFBekQsRUFBcUVDLGFBQWEsa0JBQWxGLEVBQXNHQyxVQUFVLElBQWhILEVBSE07QUFEVixTQURRO0FBTkwsT0FBUDtBQWdCRDs7O29DQUVlO0FBQ2QsV0FBS0MsT0FBTCxDQUFhQyxLQUFiLENBQW1CQyxLQUFuQjtBQUNEOzs7bUNBRWNDLEksRUFBTTtBQUNuQixXQUFLSCxPQUFMLENBQWFDLEtBQWIsQ0FBbUJDLEtBQW5CO0FBQ0EsV0FBS0YsT0FBTCxDQUFhSSxLQUFiLENBQW1CQyxHQUFuQixDQUF1QixTQUF2QixFQUFrQyx3Q0FBbEM7QUFDRDs7O0VBeENvQkMsZ0JBQU1DLFM7O0FBQXZCeEIsUSxDQUVHeUIsWSxHQUFlO0FBQ3BCSixTQUFPSyxvQkFBVUMsTUFERztBQUVwQlQsU0FBT1Esb0JBQVVDO0FBRkcsQztrQkEwQ1QzQixRIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnbWFoYS1hZG1pbidcblxuY2xhc3MgUGFzc3dvcmQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgZmxhc2g6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgbW9kYWw6IFByb3BUeXBlcy5vYmplY3RcbiAgfVxuXG4gIF9oYW5kbGVDYW5jZWwgPSB0aGlzLl9oYW5kbGVDYW5jZWwuYmluZCh0aGlzKVxuICBfaGFuZGxlU3VjY2VzcyA9IHRoaXMuX2hhbmRsZVN1Y2Nlc3MuYmluZCh0aGlzKVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gPEZvcm0geyAuLi50aGlzLl9nZXRGb3JtKCkgfSAvPlxuICB9XG5cbiAgX2dldEZvcm0oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiAnQ2hhbmdlIFBhc3N3b3JkJyxcbiAgICAgIG1ldGhvZDogJ3BhdGNoJyxcbiAgICAgIGFjdGlvbjogJy9hcGkvYWRtaW4vYWNjb3VudC9wYXNzd29yZCcsXG4gICAgICBvbkNhbmNlbDogdGhpcy5faGFuZGxlQ2FuY2VsLFxuICAgICAgb25TdWNjZXNzOiB0aGlzLl9oYW5kbGVTdWNjZXNzLFxuICAgICAgc2VjdGlvbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGZpZWxkczogW1xuICAgICAgICAgICAgeyBsYWJlbDogJ09sZCBQYXNzd29yZCcsIG5hbWU6ICdvbGRfcGFzc3dvcmQnLCB0eXBlOiAncGFzc3dvcmQnLCBwbGFjZWhvbGRlcjogJ09sZCBQYXNzd29yZCcsIHJlcXVpcmVkOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGxhYmVsOiAnTmV3IFBhc3N3b3JkJywgbmFtZTogJ3Bhc3N3b3JkJywgdHlwZTogJ3Bhc3N3b3JkJywgcGxhY2Vob2xkZXI6ICdOZXcgUGFzc3dvcmQnLCByZXF1aXJlZDogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBsYWJlbDogJ0NvbmZpcm0gUGFzc3dvcmQnLCBuYW1lOiAnY29uZmlybWF0aW9uJywgdHlwZTogJ3Bhc3N3b3JkJywgcGxhY2Vob2xkZXI6ICdDb25maXJtIFBhc3N3b3JkJywgcmVxdWlyZWQ6IHRydWUgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgfVxuXG4gIF9oYW5kbGVDYW5jZWwoKSB7XG4gICAgdGhpcy5jb250ZXh0Lm1vZGFsLmNsb3NlKClcbiAgfVxuXG4gIF9oYW5kbGVTdWNjZXNzKHVzZXIpIHtcbiAgICB0aGlzLmNvbnRleHQubW9kYWwuY2xvc2UoKVxuICAgIHRoaXMuY29udGV4dC5mbGFzaC5zZXQoJ3N1Y2Nlc3MnLCAnWW91ciBwYXNzd29yZCB3YXMgc3VjY2Vzc2Z1bGx5IGNoYW5nZWQnKVxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGFzc3dvcmRcbiJdfQ==