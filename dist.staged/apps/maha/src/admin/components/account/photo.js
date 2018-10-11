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

var Photo = function (_React$Component) {
  (0, _inherits3.default)(Photo, _React$Component);

  function Photo() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Photo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Photo.__proto__ || Object.getPrototypeOf(Photo)).call.apply(_ref, [this].concat(args))), _this), _this._handleCancel = _this._handleCancel.bind(_this), _this._handleSuccess = _this._handleSuccess.bind(_this), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Photo, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_mahaAdmin.Form, this._getForm());
    }
  }, {
    key: '_getForm',
    value: function _getForm() {
      var token = this.context.admin.team.token;

      return {
        title: 'Edit Photo',
        method: 'patch',
        endpoint: '/api/admin/account',
        action: '/api/admin/account/photo',
        onCancel: this._handleCancel,
        onSuccess: this._handleSuccess,
        sections: [{
          fields: [{ label: 'Photo', name: 'photo_id', type: 'filefield', prompt: 'Choose Photo', action: '/api/admin/assets/upload', endpoint: '/api/admin/assets', token: token, multiple: false }]
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
      this.context.flash.set('success', 'Your photo was successfully changed');
    }
  }]);
  return Photo;
}(_react2.default.Component);

Photo.contextTypes = {
  admin: _propTypes2.default.object,
  flash: _propTypes2.default.object,
  modal: _propTypes2.default.object
};
exports.default = Photo;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiUGhvdG8iLCJfaGFuZGxlQ2FuY2VsIiwiYmluZCIsIl9oYW5kbGVTdWNjZXNzIiwiX2dldEZvcm0iLCJ0b2tlbiIsImNvbnRleHQiLCJhZG1pbiIsInRlYW0iLCJ0aXRsZSIsIm1ldGhvZCIsImVuZHBvaW50IiwiYWN0aW9uIiwib25DYW5jZWwiLCJvblN1Y2Nlc3MiLCJzZWN0aW9ucyIsImZpZWxkcyIsImxhYmVsIiwibmFtZSIsInR5cGUiLCJwcm9tcHQiLCJtdWx0aXBsZSIsIm1vZGFsIiwiY2xvc2UiLCJmbGFzaCIsInNldCIsIlJlYWN0IiwiQ29tcG9uZW50IiwiY29udGV4dFR5cGVzIiwiUHJvcFR5cGVzIiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0lBRU1BLEs7Ozs7Ozs7Ozs7Ozs7O2tNQVFKQyxhLEdBQWdCLE1BQUtBLGFBQUwsQ0FBbUJDLElBQW5CLE8sUUFDaEJDLGMsR0FBaUIsTUFBS0EsY0FBTCxDQUFvQkQsSUFBcEIsTzs7Ozs7NkJBRVI7QUFDUCxhQUFPLDhCQUFDLGVBQUQsRUFBVyxLQUFLRSxRQUFMLEVBQVgsQ0FBUDtBQUNEOzs7K0JBRVU7QUFBQSxVQUNEQyxLQURDLEdBQ1MsS0FBS0MsT0FBTCxDQUFhQyxLQUFiLENBQW1CQyxJQUQ1QixDQUNESCxLQURDOztBQUVULGFBQU87QUFDTEksZUFBTyxZQURGO0FBRUxDLGdCQUFRLE9BRkg7QUFHTEMsa0JBQVUsb0JBSEw7QUFJTEMsZ0JBQVEsMEJBSkg7QUFLTEMsa0JBQVUsS0FBS1osYUFMVjtBQU1MYSxtQkFBVyxLQUFLWCxjQU5YO0FBT0xZLGtCQUFVLENBQ1I7QUFDRUMsa0JBQVEsQ0FDTixFQUFFQyxPQUFPLE9BQVQsRUFBa0JDLE1BQU0sVUFBeEIsRUFBb0NDLE1BQU0sV0FBMUMsRUFBdURDLFFBQVEsY0FBL0QsRUFBK0VSLFFBQVEsMEJBQXZGLEVBQW1IRCxVQUFVLG1CQUE3SCxFQUFrSk4sWUFBbEosRUFBeUpnQixVQUFVLEtBQW5LLEVBRE07QUFEVixTQURRO0FBUEwsT0FBUDtBQWVEOzs7b0NBRWU7QUFDZCxXQUFLZixPQUFMLENBQWFnQixLQUFiLENBQW1CQyxLQUFuQjtBQUNEOzs7cUNBRWdCO0FBQ2YsV0FBS2pCLE9BQUwsQ0FBYWdCLEtBQWIsQ0FBbUJDLEtBQW5CO0FBQ0EsV0FBS2pCLE9BQUwsQ0FBYWtCLEtBQWIsQ0FBbUJDLEdBQW5CLENBQXVCLFNBQXZCLEVBQWtDLHFDQUFsQztBQUNEOzs7RUF6Q2lCQyxnQkFBTUMsUzs7QUFBcEIzQixLLENBRUc0QixZLEdBQWU7QUFDcEJyQixTQUFPc0Isb0JBQVVDLE1BREc7QUFFcEJOLFNBQU9LLG9CQUFVQyxNQUZHO0FBR3BCUixTQUFPTyxvQkFBVUM7QUFIRyxDO2tCQTJDVDlCLEsiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcbmltcG9ydCB7IEZvcm0gfSBmcm9tICdtYWhhLWFkbWluJ1xuXG5jbGFzcyBQaG90byBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICBhZG1pbjogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBmbGFzaDogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBtb2RhbDogUHJvcFR5cGVzLm9iamVjdFxuICB9XG5cbiAgX2hhbmRsZUNhbmNlbCA9IHRoaXMuX2hhbmRsZUNhbmNlbC5iaW5kKHRoaXMpXG4gIF9oYW5kbGVTdWNjZXNzID0gdGhpcy5faGFuZGxlU3VjY2Vzcy5iaW5kKHRoaXMpXG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiA8Rm9ybSB7IC4uLnRoaXMuX2dldEZvcm0oKSB9IC8+XG4gIH1cblxuICBfZ2V0Rm9ybSgpIHtcbiAgICBjb25zdCB7IHRva2VuIH0gPSB0aGlzLmNvbnRleHQuYWRtaW4udGVhbVxuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogJ0VkaXQgUGhvdG8nLFxuICAgICAgbWV0aG9kOiAncGF0Y2gnLFxuICAgICAgZW5kcG9pbnQ6ICcvYXBpL2FkbWluL2FjY291bnQnLFxuICAgICAgYWN0aW9uOiAnL2FwaS9hZG1pbi9hY2NvdW50L3Bob3RvJyxcbiAgICAgIG9uQ2FuY2VsOiB0aGlzLl9oYW5kbGVDYW5jZWwsXG4gICAgICBvblN1Y2Nlc3M6IHRoaXMuX2hhbmRsZVN1Y2Nlc3MsXG4gICAgICBzZWN0aW9uczogW1xuICAgICAgICB7XG4gICAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7IGxhYmVsOiAnUGhvdG8nLCBuYW1lOiAncGhvdG9faWQnLCB0eXBlOiAnZmlsZWZpZWxkJywgcHJvbXB0OiAnQ2hvb3NlIFBob3RvJywgYWN0aW9uOiAnL2FwaS9hZG1pbi9hc3NldHMvdXBsb2FkJywgZW5kcG9pbnQ6ICcvYXBpL2FkbWluL2Fzc2V0cycsIHRva2VuLCBtdWx0aXBsZTogZmFsc2UgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgfVxuXG4gIF9oYW5kbGVDYW5jZWwoKSB7XG4gICAgdGhpcy5jb250ZXh0Lm1vZGFsLmNsb3NlKClcbiAgfVxuXG4gIF9oYW5kbGVTdWNjZXNzKCkge1xuICAgIHRoaXMuY29udGV4dC5tb2RhbC5jbG9zZSgpXG4gICAgdGhpcy5jb250ZXh0LmZsYXNoLnNldCgnc3VjY2VzcycsICdZb3VyIHBob3RvIHdhcyBzdWNjZXNzZnVsbHkgY2hhbmdlZCcpXG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBQaG90b1xuIl19