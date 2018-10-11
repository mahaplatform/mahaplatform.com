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

var _reactRedux = require('react-redux');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _avatar = require('../avatar');

var _avatar2 = _interopRequireDefault(_avatar);

var _edit = require('./edit');

var _edit2 = _interopRequireDefault(_edit);

var _photo = require('./photo');

var _photo2 = _interopRequireDefault(_photo);

var _password = require('./password');

var _password2 = _interopRequireDefault(_password);

var _preferences = require('./preferences');

var _preferences2 = _interopRequireDefault(_preferences);

var _profiles = require('../profiles');

var _profiles2 = _interopRequireDefault(_profiles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Account = function (_React$Component) {
  (0, _inherits3.default)(Account, _React$Component);

  function Account() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Account);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Account.__proto__ || Object.getPrototypeOf(Account)).call.apply(_ref, [this].concat(args))), _this), _this._handleEdit = _this._handleModal.bind(_this, _edit2.default), _this._handlePhoto = _this._handleModal.bind(_this, _photo2.default), _this._handlePassword = _this._handleModal.bind(_this, _password2.default), _this._handleProfiles = _this._handleModal.bind(_this, _profiles2.default), _this._handlePreferences = _this._handleModal.bind(_this, _preferences2.default), _this._handleSignout = _this._handleSignout.bind(_this), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Account, [{
    key: 'render',
    value: function render() {
      var user = this.props.user;

      return _react2.default.createElement(
        'div',
        { className: 'maha-account-panel' },
        _react2.default.createElement(
          'div',
          { className: 'maha-account-identity' },
          _react2.default.createElement(_avatar2.default, { user: user, width: '150', presence: false }),
          _react2.default.createElement(
            'h2',
            null,
            user.full_name
          ),
          _react2.default.createElement(
            'p',
            null,
            user.email
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'maha-account-tasks' },
          _react2.default.createElement(
            'div',
            { className: 'maha-account-task', onClick: this._handleEdit },
            _react2.default.createElement('i', { className: 'fa fa-fw fa-pencil' }),
            ' Edit account'
          ),
          _react2.default.createElement(
            'div',
            { className: 'maha-account-task', onClick: this._handlePhoto },
            _react2.default.createElement('i', { className: 'fa fa-fw fa-picture-o' }),
            ' ',
            user.photo ? 'Change photo' : 'Upload photo'
          ),
          _react2.default.createElement(
            'div',
            { className: 'maha-account-task', onClick: this._handlePassword },
            _react2.default.createElement('i', { className: 'fa fa-fw fa-lock' }),
            ' Change password'
          ),
          _react2.default.createElement(
            'div',
            { className: 'maha-account-task', onClick: this._handleProfiles },
            _react2.default.createElement('i', { className: 'fa fa-fw fa-id-card' }),
            ' Manage profiles'
          ),
          _react2.default.createElement(
            'div',
            { className: 'maha-account-task', onClick: this._handlePreferences },
            _react2.default.createElement('i', { className: 'fa fa-fw fa-bell' }),
            ' Configure notifications'
          ),
          _react2.default.createElement(
            'div',
            { className: 'maha-account-task', onClick: this._handleSignout },
            _react2.default.createElement('i', { className: 'fa fa-fw fa-power-off' }),
            ' Sign out'
          )
        )
      );
    }
  }, {
    key: '_handleModal',
    value: function _handleModal(component) {
      var _this2 = this;

      this.props.onDone();
      setTimeout(function () {
        return _this2.context.modal.open(component);
      }, 250);
    }
  }, {
    key: '_handleCloseDrawer',
    value: function _handleCloseDrawer() {
      this.props.onDone();
    }
  }, {
    key: '_handleSignout',
    value: function _handleSignout() {
      this.props.onDone();
      this.context.admin.signout();
    }
  }]);
  return Account;
}(_react2.default.Component);

Account.contextTypes = {
  admin: _propTypes2.default.object,
  modal: _propTypes2.default.object,
  session: _propTypes2.default.object
};
Account.propTypes = {
  user: _propTypes2.default.object,
  onDone: _propTypes2.default.func
};
Account.defaultProps = {
  onDone: function onDone() {}
};


var mapStateToProps = function mapStateToProps(state, props) {
  return {
    user: state.maha.admin.user
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Account);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiQWNjb3VudCIsIl9oYW5kbGVFZGl0IiwiX2hhbmRsZU1vZGFsIiwiYmluZCIsIkVkaXQiLCJfaGFuZGxlUGhvdG8iLCJQaG90byIsIl9oYW5kbGVQYXNzd29yZCIsIlBhc3N3b3JkIiwiX2hhbmRsZVByb2ZpbGVzIiwiUHJvZmlsZXMiLCJfaGFuZGxlUHJlZmVyZW5jZXMiLCJQcmVmZXJlbmNlcyIsIl9oYW5kbGVTaWdub3V0IiwidXNlciIsInByb3BzIiwiZnVsbF9uYW1lIiwiZW1haWwiLCJwaG90byIsImNvbXBvbmVudCIsIm9uRG9uZSIsInNldFRpbWVvdXQiLCJjb250ZXh0IiwibW9kYWwiLCJvcGVuIiwiYWRtaW4iLCJzaWdub3V0IiwiUmVhY3QiLCJDb21wb25lbnQiLCJjb250ZXh0VHlwZXMiLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJzZXNzaW9uIiwicHJvcFR5cGVzIiwiZnVuYyIsImRlZmF1bHRQcm9wcyIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwibWFoYSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVNQSxPOzs7Ozs7Ozs7Ozs7OztzTUFpQkpDLFcsR0FBYyxNQUFLQyxZQUFMLENBQWtCQyxJQUFsQixRQUE2QkMsY0FBN0IsQyxRQUNkQyxZLEdBQWUsTUFBS0gsWUFBTCxDQUFrQkMsSUFBbEIsUUFBNkJHLGVBQTdCLEMsUUFDZkMsZSxHQUFrQixNQUFLTCxZQUFMLENBQWtCQyxJQUFsQixRQUE2Qkssa0JBQTdCLEMsUUFDbEJDLGUsR0FBa0IsTUFBS1AsWUFBTCxDQUFrQkMsSUFBbEIsUUFBNkJPLGtCQUE3QixDLFFBQ2xCQyxrQixHQUFxQixNQUFLVCxZQUFMLENBQWtCQyxJQUFsQixRQUE2QlMscUJBQTdCLEMsUUFDckJDLGMsR0FBaUIsTUFBS0EsY0FBTCxDQUFvQlYsSUFBcEIsTzs7Ozs7NkJBRVI7QUFBQSxVQUNDVyxJQURELEdBQ1UsS0FBS0MsS0FEZixDQUNDRCxJQUREOztBQUVQLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxvQkFBZjtBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsdUJBQWY7QUFDRSx3Q0FBQyxnQkFBRCxJQUFRLE1BQU9BLElBQWYsRUFBc0IsT0FBTSxLQUE1QixFQUFrQyxVQUFXLEtBQTdDLEdBREY7QUFFRTtBQUFBO0FBQUE7QUFBTUEsaUJBQUtFO0FBQVgsV0FGRjtBQUdFO0FBQUE7QUFBQTtBQUFLRixpQkFBS0c7QUFBVjtBQUhGLFNBREY7QUFNRTtBQUFBO0FBQUEsWUFBSyxXQUFVLG9CQUFmO0FBQ0U7QUFBQTtBQUFBLGNBQUssV0FBVSxtQkFBZixFQUFtQyxTQUFVLEtBQUtoQixXQUFsRDtBQUNFLGlEQUFHLFdBQVUsb0JBQWIsR0FERjtBQUFBO0FBQUEsV0FERjtBQUlFO0FBQUE7QUFBQSxjQUFLLFdBQVUsbUJBQWYsRUFBbUMsU0FBVSxLQUFLSSxZQUFsRDtBQUNFLGlEQUFHLFdBQVUsdUJBQWIsR0FERjtBQUFBO0FBQzRDUyxpQkFBS0ksS0FBTCxHQUFhLGNBQWIsR0FBOEI7QUFEMUUsV0FKRjtBQU9FO0FBQUE7QUFBQSxjQUFLLFdBQVUsbUJBQWYsRUFBbUMsU0FBVSxLQUFLWCxlQUFsRDtBQUNFLGlEQUFHLFdBQVUsa0JBQWIsR0FERjtBQUFBO0FBQUEsV0FQRjtBQVVFO0FBQUE7QUFBQSxjQUFLLFdBQVUsbUJBQWYsRUFBbUMsU0FBVSxLQUFLRSxlQUFsRDtBQUNFLGlEQUFHLFdBQVUscUJBQWIsR0FERjtBQUFBO0FBQUEsV0FWRjtBQWFFO0FBQUE7QUFBQSxjQUFLLFdBQVUsbUJBQWYsRUFBbUMsU0FBVSxLQUFLRSxrQkFBbEQ7QUFDRSxpREFBRyxXQUFVLGtCQUFiLEdBREY7QUFBQTtBQUFBLFdBYkY7QUFnQkU7QUFBQTtBQUFBLGNBQUssV0FBVSxtQkFBZixFQUFtQyxTQUFVLEtBQUtFLGNBQWxEO0FBQ0UsaURBQUcsV0FBVSx1QkFBYixHQURGO0FBQUE7QUFBQTtBQWhCRjtBQU5GLE9BREY7QUE2QkQ7OztpQ0FFWU0sUyxFQUFXO0FBQUE7O0FBQ3RCLFdBQUtKLEtBQUwsQ0FBV0ssTUFBWDtBQUNBQyxpQkFBVztBQUFBLGVBQU0sT0FBS0MsT0FBTCxDQUFhQyxLQUFiLENBQW1CQyxJQUFuQixDQUF3QkwsU0FBeEIsQ0FBTjtBQUFBLE9BQVgsRUFBcUQsR0FBckQ7QUFDRDs7O3lDQUVvQjtBQUNuQixXQUFLSixLQUFMLENBQVdLLE1BQVg7QUFDRDs7O3FDQUVnQjtBQUNmLFdBQUtMLEtBQUwsQ0FBV0ssTUFBWDtBQUNBLFdBQUtFLE9BQUwsQ0FBYUcsS0FBYixDQUFtQkMsT0FBbkI7QUFDRDs7O0VBckVtQkMsZ0JBQU1DLFM7O0FBQXRCNUIsTyxDQUVHNkIsWSxHQUFlO0FBQ3BCSixTQUFPSyxvQkFBVUMsTUFERztBQUVwQlIsU0FBT08sb0JBQVVDLE1BRkc7QUFHcEJDLFdBQVNGLG9CQUFVQztBQUhDLEM7QUFGbEIvQixPLENBUUdpQyxTLEdBQVk7QUFDakJuQixRQUFNZ0Isb0JBQVVDLE1BREM7QUFFakJYLFVBQVFVLG9CQUFVSTtBQUZELEM7QUFSZmxDLE8sQ0FhR21DLFksR0FBZTtBQUNwQmYsVUFBUSxrQkFBTSxDQUFFO0FBREksQzs7O0FBNER4QixJQUFNZ0Isa0JBQWtCLFNBQWxCQSxlQUFrQixDQUFDQyxLQUFELEVBQVF0QixLQUFSO0FBQUEsU0FBbUI7QUFDekNELFVBQU11QixNQUFNQyxJQUFOLENBQVdiLEtBQVgsQ0FBaUJYO0FBRGtCLEdBQW5CO0FBQUEsQ0FBeEI7O2tCQUllLHlCQUFRc0IsZUFBUixFQUF5QnBDLE9BQXpCLEMiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcbmltcG9ydCBBdmF0YXIgZnJvbSAnLi4vYXZhdGFyJ1xuaW1wb3J0IEVkaXQgZnJvbSAnLi9lZGl0J1xuaW1wb3J0IFBob3RvIGZyb20gJy4vcGhvdG8nXG5pbXBvcnQgUGFzc3dvcmQgZnJvbSAnLi9wYXNzd29yZCdcbmltcG9ydCBQcmVmZXJlbmNlcyBmcm9tICcuL3ByZWZlcmVuY2VzJ1xuaW1wb3J0IFByb2ZpbGVzIGZyb20gJy4uL3Byb2ZpbGVzJ1xuXG5jbGFzcyBBY2NvdW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgIGFkbWluOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIG1vZGFsOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHNlc3Npb246IFByb3BUeXBlcy5vYmplY3RcbiAgfVxuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgdXNlcjogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBvbkRvbmU6IFByb3BUeXBlcy5mdW5jXG4gIH1cblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIG9uRG9uZTogKCkgPT4ge31cbiAgfVxuXG4gIF9oYW5kbGVFZGl0ID0gdGhpcy5faGFuZGxlTW9kYWwuYmluZCh0aGlzLCBFZGl0KVxuICBfaGFuZGxlUGhvdG8gPSB0aGlzLl9oYW5kbGVNb2RhbC5iaW5kKHRoaXMsIFBob3RvKVxuICBfaGFuZGxlUGFzc3dvcmQgPSB0aGlzLl9oYW5kbGVNb2RhbC5iaW5kKHRoaXMsIFBhc3N3b3JkKVxuICBfaGFuZGxlUHJvZmlsZXMgPSB0aGlzLl9oYW5kbGVNb2RhbC5iaW5kKHRoaXMsIFByb2ZpbGVzKVxuICBfaGFuZGxlUHJlZmVyZW5jZXMgPSB0aGlzLl9oYW5kbGVNb2RhbC5iaW5kKHRoaXMsIFByZWZlcmVuY2VzKVxuICBfaGFuZGxlU2lnbm91dCA9IHRoaXMuX2hhbmRsZVNpZ25vdXQuYmluZCh0aGlzKVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHVzZXIgfSA9IHRoaXMucHJvcHNcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYWhhLWFjY291bnQtcGFuZWxcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYWhhLWFjY291bnQtaWRlbnRpdHlcIj5cbiAgICAgICAgICA8QXZhdGFyIHVzZXI9eyB1c2VyIH0gd2lkdGg9XCIxNTBcIiBwcmVzZW5jZT17IGZhbHNlIH0gLz5cbiAgICAgICAgICA8aDI+eyB1c2VyLmZ1bGxfbmFtZSB9PC9oMj5cbiAgICAgICAgICA8cD57IHVzZXIuZW1haWwgfTwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFoYS1hY2NvdW50LXRhc2tzXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYWhhLWFjY291bnQtdGFza1wiIG9uQ2xpY2s9eyB0aGlzLl9oYW5kbGVFZGl0IH0+XG4gICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1mdyBmYS1wZW5jaWxcIiAvPiBFZGl0IGFjY291bnRcbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1haGEtYWNjb3VudC10YXNrXCIgb25DbGljaz17IHRoaXMuX2hhbmRsZVBob3RvIH0+XG4gICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1mdyBmYS1waWN0dXJlLW9cIiAvPiB7IHVzZXIucGhvdG8gPyAnQ2hhbmdlIHBob3RvJyA6ICdVcGxvYWQgcGhvdG8nIH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1haGEtYWNjb3VudC10YXNrXCIgb25DbGljaz17IHRoaXMuX2hhbmRsZVBhc3N3b3JkIH0+XG4gICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1mdyBmYS1sb2NrXCIgLz4gQ2hhbmdlIHBhc3N3b3JkXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYWhhLWFjY291bnQtdGFza1wiIG9uQ2xpY2s9eyB0aGlzLl9oYW5kbGVQcm9maWxlcyB9PlxuICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtZncgZmEtaWQtY2FyZFwiIC8+IE1hbmFnZSBwcm9maWxlc1xuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFoYS1hY2NvdW50LXRhc2tcIiBvbkNsaWNrPXsgdGhpcy5faGFuZGxlUHJlZmVyZW5jZXMgfT5cbiAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWZ3IGZhLWJlbGxcIiAvPiBDb25maWd1cmUgbm90aWZpY2F0aW9uc1xuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFoYS1hY2NvdW50LXRhc2tcIiBvbkNsaWNrPXsgdGhpcy5faGFuZGxlU2lnbm91dCB9PlxuICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtZncgZmEtcG93ZXItb2ZmXCIgLz4gU2lnbiBvdXRcbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxuICBfaGFuZGxlTW9kYWwoY29tcG9uZW50KSB7XG4gICAgdGhpcy5wcm9wcy5vbkRvbmUoKVxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5jb250ZXh0Lm1vZGFsLm9wZW4oY29tcG9uZW50KSwgMjUwKVxuICB9XG5cbiAgX2hhbmRsZUNsb3NlRHJhd2VyKCkge1xuICAgIHRoaXMucHJvcHMub25Eb25lKClcbiAgfVxuXG4gIF9oYW5kbGVTaWdub3V0KCkge1xuICAgIHRoaXMucHJvcHMub25Eb25lKClcbiAgICB0aGlzLmNvbnRleHQuYWRtaW4uc2lnbm91dCgpXG4gIH1cblxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUsIHByb3BzKSA9PiAoe1xuICB1c2VyOiBzdGF0ZS5tYWhhLmFkbWluLnVzZXJcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzKShBY2NvdW50KVxuIl19