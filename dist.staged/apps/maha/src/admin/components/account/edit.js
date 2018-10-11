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

var Edit = function (_React$Component) {
  (0, _inherits3.default)(Edit, _React$Component);

  function Edit() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Edit);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Edit.__proto__ || Object.getPrototypeOf(Edit)).call.apply(_ref, [this].concat(args))), _this), _this._handleCancel = _this._handleCancel.bind(_this), _this._handleSuccess = _this._handleSuccess.bind(_this), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Edit, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_mahaAdmin.Form, this._getForm());
    }
  }, {
    key: '_getForm',
    value: function _getForm() {
      return {
        title: 'Edit Account',
        method: 'patch',
        endpoint: '/api/admin/account',
        action: '/api/admin/account',
        onCancel: this._handleCancel,
        onSuccess: this._handleSuccess,
        sections: [{
          fields: [{ label: 'First Name', name: 'first_name', type: 'textfield', placeholder: 'First Name', required: true }, { label: 'Last Name', name: 'last_name', type: 'textfield', placeholder: 'Last Name', required: true }, { label: 'Email', name: 'email', type: 'textfield', placeholder: 'Email', required: true }, { label: 'Secondary Email', name: 'secondary_email', type: 'textfield', placeholder: 'Secondary Email', required: true }]
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
    value: function _handleSuccess() {
      this.context.modal.close();
      this.context.flash.set('success', 'Your account was successfully updated');
    }
  }]);
  return Edit;
}(_react2.default.Component);

Edit.contextTypes = {
  flash: _propTypes2.default.object,
  modal: _propTypes2.default.object
};
exports.default = Edit;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiRWRpdCIsIl9oYW5kbGVDYW5jZWwiLCJiaW5kIiwiX2hhbmRsZVN1Y2Nlc3MiLCJfZ2V0Rm9ybSIsInRpdGxlIiwibWV0aG9kIiwiZW5kcG9pbnQiLCJhY3Rpb24iLCJvbkNhbmNlbCIsIm9uU3VjY2VzcyIsInNlY3Rpb25zIiwiZmllbGRzIiwibGFiZWwiLCJuYW1lIiwidHlwZSIsInBsYWNlaG9sZGVyIiwicmVxdWlyZWQiLCJjb250ZXh0IiwibW9kYWwiLCJjbG9zZSIsImZsYXNoIiwic2V0IiwiUmVhY3QiLCJDb21wb25lbnQiLCJjb250ZXh0VHlwZXMiLCJQcm9wVHlwZXMiLCJvYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7SUFFTUEsSTs7Ozs7Ozs7Ozs7Ozs7Z01BT0pDLGEsR0FBZ0IsTUFBS0EsYUFBTCxDQUFtQkMsSUFBbkIsTyxRQUNoQkMsYyxHQUFpQixNQUFLQSxjQUFMLENBQW9CRCxJQUFwQixPOzs7Ozs2QkFFUjtBQUNQLGFBQU8sOEJBQUMsZUFBRCxFQUFXLEtBQUtFLFFBQUwsRUFBWCxDQUFQO0FBQ0Q7OzsrQkFFVTtBQUNULGFBQU87QUFDTEMsZUFBTyxjQURGO0FBRUxDLGdCQUFRLE9BRkg7QUFHTEMsa0JBQVUsb0JBSEw7QUFJTEMsZ0JBQVEsb0JBSkg7QUFLTEMsa0JBQVUsS0FBS1IsYUFMVjtBQU1MUyxtQkFBVyxLQUFLUCxjQU5YO0FBT0xRLGtCQUFVLENBQ1I7QUFDRUMsa0JBQVEsQ0FDTixFQUFFQyxPQUFPLFlBQVQsRUFBdUJDLE1BQU0sWUFBN0IsRUFBMkNDLE1BQU0sV0FBakQsRUFBOERDLGFBQWEsWUFBM0UsRUFBeUZDLFVBQVUsSUFBbkcsRUFETSxFQUVOLEVBQUVKLE9BQU8sV0FBVCxFQUFzQkMsTUFBTSxXQUE1QixFQUF5Q0MsTUFBTSxXQUEvQyxFQUE0REMsYUFBYSxXQUF6RSxFQUFzRkMsVUFBVSxJQUFoRyxFQUZNLEVBR04sRUFBRUosT0FBTyxPQUFULEVBQWtCQyxNQUFNLE9BQXhCLEVBQWlDQyxNQUFNLFdBQXZDLEVBQW9EQyxhQUFhLE9BQWpFLEVBQTBFQyxVQUFVLElBQXBGLEVBSE0sRUFJTixFQUFFSixPQUFPLGlCQUFULEVBQTRCQyxNQUFNLGlCQUFsQyxFQUFxREMsTUFBTSxXQUEzRCxFQUF3RUMsYUFBYSxpQkFBckYsRUFBd0dDLFVBQVUsSUFBbEgsRUFKTTtBQURWLFNBRFE7QUFQTCxPQUFQO0FBa0JEOzs7b0NBRWU7QUFDZCxXQUFLQyxPQUFMLENBQWFDLEtBQWIsQ0FBbUJDLEtBQW5CO0FBQ0Q7OztxQ0FFZ0I7QUFDZixXQUFLRixPQUFMLENBQWFDLEtBQWIsQ0FBbUJDLEtBQW5CO0FBQ0EsV0FBS0YsT0FBTCxDQUFhRyxLQUFiLENBQW1CQyxHQUFuQixDQUF1QixTQUF2QixFQUFrQyx1Q0FBbEM7QUFDRDs7O0VBMUNnQkMsZ0JBQU1DLFM7O0FBQW5CeEIsSSxDQUVHeUIsWSxHQUFlO0FBQ3BCSixTQUFPSyxvQkFBVUMsTUFERztBQUVwQlIsU0FBT08sb0JBQVVDO0FBRkcsQztrQkE0Q1QzQixJIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnbWFoYS1hZG1pbidcblxuY2xhc3MgRWRpdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICBmbGFzaDogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBtb2RhbDogUHJvcFR5cGVzLm9iamVjdFxuICB9XG5cbiAgX2hhbmRsZUNhbmNlbCA9IHRoaXMuX2hhbmRsZUNhbmNlbC5iaW5kKHRoaXMpXG4gIF9oYW5kbGVTdWNjZXNzID0gdGhpcy5faGFuZGxlU3VjY2Vzcy5iaW5kKHRoaXMpXG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiA8Rm9ybSB7IC4uLnRoaXMuX2dldEZvcm0oKSB9IC8+XG4gIH1cblxuICBfZ2V0Rm9ybSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6ICdFZGl0IEFjY291bnQnLFxuICAgICAgbWV0aG9kOiAncGF0Y2gnLFxuICAgICAgZW5kcG9pbnQ6ICcvYXBpL2FkbWluL2FjY291bnQnLFxuICAgICAgYWN0aW9uOiAnL2FwaS9hZG1pbi9hY2NvdW50JyxcbiAgICAgIG9uQ2FuY2VsOiB0aGlzLl9oYW5kbGVDYW5jZWwsXG4gICAgICBvblN1Y2Nlc3M6IHRoaXMuX2hhbmRsZVN1Y2Nlc3MsXG4gICAgICBzZWN0aW9uczogW1xuICAgICAgICB7XG4gICAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7IGxhYmVsOiAnRmlyc3QgTmFtZScsIG5hbWU6ICdmaXJzdF9uYW1lJywgdHlwZTogJ3RleHRmaWVsZCcsIHBsYWNlaG9sZGVyOiAnRmlyc3QgTmFtZScsIHJlcXVpcmVkOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGxhYmVsOiAnTGFzdCBOYW1lJywgbmFtZTogJ2xhc3RfbmFtZScsIHR5cGU6ICd0ZXh0ZmllbGQnLCBwbGFjZWhvbGRlcjogJ0xhc3QgTmFtZScsIHJlcXVpcmVkOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGxhYmVsOiAnRW1haWwnLCBuYW1lOiAnZW1haWwnLCB0eXBlOiAndGV4dGZpZWxkJywgcGxhY2Vob2xkZXI6ICdFbWFpbCcsIHJlcXVpcmVkOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGxhYmVsOiAnU2Vjb25kYXJ5IEVtYWlsJywgbmFtZTogJ3NlY29uZGFyeV9lbWFpbCcsIHR5cGU6ICd0ZXh0ZmllbGQnLCBwbGFjZWhvbGRlcjogJ1NlY29uZGFyeSBFbWFpbCcsIHJlcXVpcmVkOiB0cnVlIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH1cblxuICBfaGFuZGxlQ2FuY2VsKCkge1xuICAgIHRoaXMuY29udGV4dC5tb2RhbC5jbG9zZSgpXG4gIH1cblxuICBfaGFuZGxlU3VjY2VzcygpIHtcbiAgICB0aGlzLmNvbnRleHQubW9kYWwuY2xvc2UoKVxuICAgIHRoaXMuY29udGV4dC5mbGFzaC5zZXQoJ3N1Y2Nlc3MnLCAnWW91ciBhY2NvdW50IHdhcyBzdWNjZXNzZnVsbHkgdXBkYXRlZCcpXG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBFZGl0XG4iXX0=