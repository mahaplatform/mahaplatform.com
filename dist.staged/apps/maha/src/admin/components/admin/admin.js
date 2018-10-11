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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _loader = require('../loader');

var _loader2 = _interopRequireDefault(_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Admin = function (_React$Component) {
  (0, _inherits3.default)(Admin, _React$Component);

  function Admin() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Admin);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Admin.__proto__ || Object.getPrototypeOf(Admin)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      host: 'browser',
      path: null,
      search: null,
      hash: null
    }, _this._handleAddTeam = _this._handleAddTeam.bind(_this), _this._handleBlurFocus = _this._handleBlurFocus.bind(_this), _this._handleCheckAccess = _this._handleCheckAccess.bind(_this), _this._handleChooseTeam = _this._handleChooseTeam.bind(_this), _this._handleForcedSignout = _this._handleForcedSignout.bind(_this), _this._handlePresence = _this._handlePresence.bind(_this), _this._handleReloadSession = _this._handleReloadSession.bind(_this), _this._handleRemoveTeam = _this._handleRemoveTeam.bind(_this), _this._handleSignin = _this._handleSignin.bind(_this), _this._handleSignout = _this._handleSignout.bind(_this), _this._handleUpdateUnseen = _this._handleUpdateUnseen.bind(_this), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Admin, [{
    key: 'render',
    value: function render() {
      var status = this.props.status;

      if (status === 'loading') return _react2.default.createElement(_loader2.default, null);
      return this.props.children;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var router = this.context.router;
      var _context$router = this.context.router,
          pathname = _context$router.pathname,
          search = _context$router.search,
          hash = _context$router.hash;

      this.setState({ host: this._getHost() });
      this.props.onLoadAdmin();
      if (pathname.match(/\/(activate|signin|reset).*/)) return;
      this.setState({ pathname: pathname, search: search, hash: hash });
      router.replace('/admin');
      window.addEventListener('blur', this._handleBlurFocus, false);
      window.addEventListener('focus', this._handleBlurFocus, false);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _props = this.props,
          active = _props.active,
          fingerprint = _props.fingerprint,
          teams = _props.teams,
          team = _props.team,
          unseen = _props.unseen,
          user = _props.user,
          onLoadSession = _props.onLoadSession,
          onSaveAdmin = _props.onSaveAdmin;
      var router = this.context.router;
      var _state = this.state,
          pathname = _state.pathname,
          search = _state.search,
          hash = _state.hash;

      if (_lodash2.default.get(prevProps, 'team.user.id') !== _lodash2.default.get(team, 'user.id')) {
        if (!_lodash2.default.isNil(prevProps.team)) this._closeSockets(prevProps.team);
        if (!_lodash2.default.isNil(team)) onLoadSession(team.token, fingerprint);
      }
      if (!_lodash2.default.isEqual(prevProps.teams, teams)) {
        var reservedPath = ['activate', 'reset', 'signin'].reduce(function (reserved, path) {
          return reserved || router.pathname.startsWith('/admin/' + path);
        }, false);
        if (!team && !reservedPath) router.replace('/admin/signin');
        if (!user) onSaveAdmin({ active: active, fingerprint: fingerprint, teams: teams });
      }
      if (!_lodash2.default.isEqual(prevProps.user, user)) {
        onSaveAdmin({ active: active, fingerprint: fingerprint, teams: teams });
      }
      if (_lodash2.default.get(prevProps, 'user.id') !== _lodash2.default.get(user, 'id') && !_lodash2.default.isNil(user)) {
        this.context.logger.login(user);
        this._openSockets(team);
        if (router.pathname.match(/\/(activate|signin|reset).*/)) return;
        if (pathname) {
          setTimeout(function () {
            return router.push({ pathname: pathname, search: search, hash: hash });
          }, 250);
          this.setState({ pathname: null, search: null, hash: null });
        }
      }
      if (unseen !== prevProps.unseen) {
        var count = unseen < 10 ? unseen : 'x';
        var link = document.getElementById('favicon');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = '/admin/images/icons/favicon-' + count + '.png';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('blur', this._handleBlurFocus);
      window.removeEventListener('focus', this._handleBlurFocus);
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      var _props2 = this.props,
          apps = _props2.apps,
          active = _props2.active,
          teams = _props2.teams,
          team = _props2.team,
          unseen = _props2.unseen,
          user = _props2.user;

      return {
        admin: {
          apps: apps,
          active: active,
          teams: teams,
          team: team,
          unseen: unseen,
          user: user,
          addTeam: this._handleAddTeam,
          checkAccess: this._handleCheckAccess,
          chooseTeam: this._handleChooseTeam,
          removeTeam: this._handleRemoveTeam,
          signin: this._handleSignin,
          signout: this._handleSignout,
          updateUnseen: this._handleUpdateUnseen
        }
      };
    }
  }, {
    key: '_getHost',
    value: function _getHost() {
      if (navigator.userAgent.search('Cordova') >= 0) {
        return 'cordova';
      } else if (navigator.userAgent.search('Electron') >= 0) {
        return 'electron';
      } else {
        return 'browser';
      }
    }
  }, {
    key: '_openSockets',
    value: function _openSockets(team) {
      var network = this.context.network;

      network.join(['/admin/users/' + team.user.id, '/admin/teams/' + team.id]);
      network.subscribe([{ action: 'session', handler: this._handleReloadSession }, { action: 'signout', handler: this._handleForcedSignout }, { action: 'presence', handler: this._handlePresence }]);
      network.signin({
        status: document.hasFocus() ? 'active' : 'absent'
      });
    }
  }, {
    key: '_closeSockets',
    value: function _closeSockets(team) {
      var network = this.context.network;

      network.leave(['/admin/users/' + team.user.id, '/admin/teams/' + team.id]);
      network.unsubscribe([{ action: 'session', handler: this._handleReloadSession }, { action: 'signout', handler: this._handleForcedSignout }, { action: 'presence', handler: this._handlePresence }]);
      network.signout();
    }
  }, {
    key: '_handleForcedSignout',
    value: function _handleForcedSignout() {
      var flash = this.context.flash;

      this._handleSignout();
      flash.set('info', 'Your account has been signed out of all devices');
    }
  }, {
    key: '_handleAddTeam',
    value: function _handleAddTeam(team, token, user) {
      this.props.onAddTeam(team, token, user);
    }
  }, {
    key: '_handleBlurFocus',
    value: function _handleBlurFocus() {
      var team = this.props.team;

      if (!team) return;
      this.context.network.emit('status', {
        status: document.hasFocus() ? 'active' : 'absent'
      });
    }
  }, {
    key: '_handleCheckAccess',
    value: function _handleCheckAccess(code) {
      return _lodash2.default.findIndex(this.props.apps, { code: code }) >= 0;
    }
  }, {
    key: '_handleChooseTeam',
    value: function _handleChooseTeam(index) {
      var router = this.context.router;
      var _props3 = this.props,
          active = _props3.active,
          onChooseTeam = _props3.onChooseTeam;

      if (index === active) {
        router.push('/admin');
      } else {
        onChooseTeam(index);
      }
    }
  }, {
    key: '_handleRemoveTeam',
    value: function _handleRemoveTeam(index) {
      this.props.onRemoveTeam(index);
    }
  }, {
    key: '_handleSignout',
    value: function _handleSignout() {
      var _props4 = this.props,
          active = _props4.active,
          onRemoveSession = _props4.onRemoveSession,
          onSignout = _props4.onSignout;

      onRemoveSession();
      onSignout(active);
    }
  }, {
    key: '_handleSignin',
    value: function _handleSignin(index, token) {
      this.props.onSignin(index, token);
    }
  }, {
    key: '_handlePresence',
    value: function _handlePresence(presence) {
      this.props.onSetPresence(presence);
    }
  }, {
    key: '_handleReloadSession',
    value: function _handleReloadSession() {
      var _props5 = this.props,
          team = _props5.team,
          onLoadSession = _props5.onLoadSession;

      onLoadSession(team.token);
    }
  }, {
    key: '_handleUpdateUnseen',
    value: function _handleUpdateUnseen(difference) {
      this.props.onUpdateUnseen(difference);
    }
  }]);
  return Admin;
}(_react2.default.Component);

Admin.childContextTypes = {
  admin: _propTypes2.default.object
};
Admin.contextTypes = {
  flash: _propTypes2.default.object,
  logger: _propTypes2.default.object,
  network: _propTypes2.default.object,
  router: _propTypes2.default.object
};
Admin.propTypes = {
  active: _propTypes2.default.number,
  apps: _propTypes2.default.array,
  children: _propTypes2.default.any,
  fingerprint: _propTypes2.default.string,
  presence: _propTypes2.default.array,
  sessions: _propTypes2.default.array,
  session: _propTypes2.default.object,
  status: _propTypes2.default.string,
  teams: _propTypes2.default.array,
  team: _propTypes2.default.object,
  unseen: _propTypes2.default.number,
  user: _propTypes2.default.object,
  onAddTeam: _propTypes2.default.func,
  onChooseTeam: _propTypes2.default.func,
  onLoadAdmin: _propTypes2.default.func,
  onLoadSession: _propTypes2.default.func,
  onRemoveSession: _propTypes2.default.func,
  onRemoveTeam: _propTypes2.default.func,
  onSaveAdmin: _propTypes2.default.func,
  onSetPresence: _propTypes2.default.func,
  onSignin: _propTypes2.default.func,
  onSignout: _propTypes2.default.func,
  onUpdateSession: _propTypes2.default.func,
  onUpdateUnseen: _propTypes2.default.func
};
exports.default = Admin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiQWRtaW4iLCJzdGF0ZSIsImhvc3QiLCJwYXRoIiwic2VhcmNoIiwiaGFzaCIsIl9oYW5kbGVBZGRUZWFtIiwiYmluZCIsIl9oYW5kbGVCbHVyRm9jdXMiLCJfaGFuZGxlQ2hlY2tBY2Nlc3MiLCJfaGFuZGxlQ2hvb3NlVGVhbSIsIl9oYW5kbGVGb3JjZWRTaWdub3V0IiwiX2hhbmRsZVByZXNlbmNlIiwiX2hhbmRsZVJlbG9hZFNlc3Npb24iLCJfaGFuZGxlUmVtb3ZlVGVhbSIsIl9oYW5kbGVTaWduaW4iLCJfaGFuZGxlU2lnbm91dCIsIl9oYW5kbGVVcGRhdGVVbnNlZW4iLCJzdGF0dXMiLCJwcm9wcyIsImNoaWxkcmVuIiwicm91dGVyIiwiY29udGV4dCIsInBhdGhuYW1lIiwic2V0U3RhdGUiLCJfZ2V0SG9zdCIsIm9uTG9hZEFkbWluIiwibWF0Y2giLCJyZXBsYWNlIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInByZXZQcm9wcyIsImFjdGl2ZSIsImZpbmdlcnByaW50IiwidGVhbXMiLCJ0ZWFtIiwidW5zZWVuIiwidXNlciIsIm9uTG9hZFNlc3Npb24iLCJvblNhdmVBZG1pbiIsIl8iLCJnZXQiLCJpc05pbCIsIl9jbG9zZVNvY2tldHMiLCJ0b2tlbiIsImlzRXF1YWwiLCJyZXNlcnZlZFBhdGgiLCJyZWR1Y2UiLCJyZXNlcnZlZCIsInN0YXJ0c1dpdGgiLCJsb2dnZXIiLCJsb2dpbiIsIl9vcGVuU29ja2V0cyIsInNldFRpbWVvdXQiLCJwdXNoIiwiY291bnQiLCJsaW5rIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInR5cGUiLCJyZWwiLCJocmVmIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJhcHBlbmRDaGlsZCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJhcHBzIiwiYWRtaW4iLCJhZGRUZWFtIiwiY2hlY2tBY2Nlc3MiLCJjaG9vc2VUZWFtIiwicmVtb3ZlVGVhbSIsInNpZ25pbiIsInNpZ25vdXQiLCJ1cGRhdGVVbnNlZW4iLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJuZXR3b3JrIiwiam9pbiIsImlkIiwic3Vic2NyaWJlIiwiYWN0aW9uIiwiaGFuZGxlciIsImhhc0ZvY3VzIiwibGVhdmUiLCJ1bnN1YnNjcmliZSIsImZsYXNoIiwic2V0Iiwib25BZGRUZWFtIiwiZW1pdCIsImNvZGUiLCJmaW5kSW5kZXgiLCJpbmRleCIsIm9uQ2hvb3NlVGVhbSIsIm9uUmVtb3ZlVGVhbSIsIm9uUmVtb3ZlU2Vzc2lvbiIsIm9uU2lnbm91dCIsIm9uU2lnbmluIiwicHJlc2VuY2UiLCJvblNldFByZXNlbmNlIiwiZGlmZmVyZW5jZSIsIm9uVXBkYXRlVW5zZWVuIiwiUmVhY3QiLCJDb21wb25lbnQiLCJjaGlsZENvbnRleHRUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdCIsImNvbnRleHRUeXBlcyIsInByb3BUeXBlcyIsIm51bWJlciIsImFycmF5IiwiYW55Iiwic3RyaW5nIiwic2Vzc2lvbnMiLCJzZXNzaW9uIiwiZnVuYyIsIm9uVXBkYXRlU2Vzc2lvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFTUEsSzs7Ozs7Ozs7Ozs7Ozs7a01Bd0NKQyxLLEdBQVE7QUFDTkMsWUFBTSxTQURBO0FBRU5DLFlBQU0sSUFGQTtBQUdOQyxjQUFRLElBSEY7QUFJTkMsWUFBTTtBQUpBLEssUUFPUkMsYyxHQUFpQixNQUFLQSxjQUFMLENBQW9CQyxJQUFwQixPLFFBQ2pCQyxnQixHQUFtQixNQUFLQSxnQkFBTCxDQUFzQkQsSUFBdEIsTyxRQUNuQkUsa0IsR0FBcUIsTUFBS0Esa0JBQUwsQ0FBd0JGLElBQXhCLE8sUUFDckJHLGlCLEdBQW9CLE1BQUtBLGlCQUFMLENBQXVCSCxJQUF2QixPLFFBQ3BCSSxvQixHQUF1QixNQUFLQSxvQkFBTCxDQUEwQkosSUFBMUIsTyxRQUN2QkssZSxHQUFrQixNQUFLQSxlQUFMLENBQXFC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VCxvQkFBVUMsTUFQRjtBQVFqQnZGLFVBQVFzRixvQkFBVU8sTUFSRDtBQVNqQjdFLFNBQU9zRSxvQkFBVUssS0FUQTtBQVVqQjFFLFFBQU1xRSxvQkFBVUMsTUFWQztBQVdqQnJFLFVBQVFvRSxvQkFBVUksTUFYRDtBQVlqQnZFLFFBQU1tRSxvQkFBVUMsTUFaQztBQWFqQmxCLGFBQVdpQixvQkFBVVUsSUFiSjtBQWNqQnRCLGdCQUFjWSxvQkFBVVUsSUFkUDtBQWVqQnhGLGVBQWE4RSxvQkFBVVUsSUFmTjtBQWdCakI1RSxpQkFBZWtFLG9CQUFVVSxJQWhCUjtBQWlCakJwQixtQkFBaUJVLG9CQUFVVSxJQWpCVjtBQWtCakJyQixnQkFBY1csb0JBQVVVLElBbEJQO0FBbUJqQjNFLGVBQWFpRSxvQkFBVVUsSUFuQk47QUFvQmpCaEIsaUJBQWVNLG9CQUFVVSxJQXBCUjtBQXFCakJsQixZQUFVUSxvQkFBVVUsSUFyQkg7QUFzQmpCbkIsYUFBV1Msb0JBQVVVLElBdEJKO0FBdUJqQkMsbUJBQWlCWCxvQkFBVVUsSUF2QlY7QUF3QmpCZCxrQkFBZ0JJLG9CQUFVVTtBQXhCVCxDO2tCQW9PTmxILEsiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCdcbmltcG9ydCBMb2FkZXIgZnJvbSAnLi4vbG9hZGVyJ1xuXG5jbGFzcyBBZG1pbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzID0ge1xuICAgIGFkbWluOiBQcm9wVHlwZXMub2JqZWN0XG4gIH1cblxuICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgIGZsYXNoOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGxvZ2dlcjogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBuZXR3b3JrOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHJvdXRlcjogUHJvcFR5cGVzLm9iamVjdFxuICB9XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBhY3RpdmU6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgYXBwczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMuYW55LFxuICAgIGZpbmdlcnByaW50OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHByZXNlbmNlOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgc2Vzc2lvbnM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBzZXNzaW9uOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHN0YXR1czogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0ZWFtczogUHJvcFR5cGVzLmFycmF5LFxuICAgIHRlYW06IFByb3BUeXBlcy5vYmplY3QsXG4gICAgdW5zZWVuOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHVzZXI6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgb25BZGRUZWFtOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNob29zZVRlYW06IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uTG9hZEFkbWluOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkxvYWRTZXNzaW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblJlbW92ZVNlc3Npb246IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uUmVtb3ZlVGVhbTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TYXZlQWRtaW46IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2V0UHJlc2VuY2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2lnbmluOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblNpZ25vdXQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uVXBkYXRlU2Vzc2lvbjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25VcGRhdGVVbnNlZW46IFByb3BUeXBlcy5mdW5jXG4gIH1cblxuICBzdGF0ZSA9IHtcbiAgICBob3N0OiAnYnJvd3NlcicsXG4gICAgcGF0aDogbnVsbCxcbiAgICBzZWFyY2g6IG51bGwsXG4gICAgaGFzaDogbnVsbFxuICB9XG5cbiAgX2hhbmRsZUFkZFRlYW0gPSB0aGlzLl9oYW5kbGVBZGRUZWFtLmJpbmQodGhpcylcbiAgX2hhbmRsZUJsdXJGb2N1cyA9IHRoaXMuX2hhbmRsZUJsdXJGb2N1cy5iaW5kKHRoaXMpXG4gIF9oYW5kbGVDaGVja0FjY2VzcyA9IHRoaXMuX2hhbmRsZUNoZWNrQWNjZXNzLmJpbmQodGhpcylcbiAgX2hhbmRsZUNob29zZVRlYW0gPSB0aGlzLl9oYW5kbGVDaG9vc2VUZWFtLmJpbmQodGhpcylcbiAgX2hhbmRsZUZvcmNlZFNpZ25vdXQgPSB0aGlzLl9oYW5kbGVGb3JjZWRTaWdub3V0LmJpbmQodGhpcylcbiAgX2hhbmRsZVByZXNlbmNlID0gdGhpcy5faGFuZGxlUHJlc2VuY2UuYmluZCh0aGlzKVxuICBfaGFuZGxlUmVsb2FkU2Vzc2lvbiA9IHRoaXMuX2hhbmRsZVJlbG9hZFNlc3Npb24uYmluZCh0aGlzKVxuICBfaGFuZGxlUmVtb3ZlVGVhbSA9IHRoaXMuX2hhbmRsZVJlbW92ZVRlYW0uYmluZCh0aGlzKVxuICBfaGFuZGxlU2lnbmluID0gdGhpcy5faGFuZGxlU2lnbmluLmJpbmQodGhpcylcbiAgX2hhbmRsZVNpZ25vdXQgPSB0aGlzLl9oYW5kbGVTaWdub3V0LmJpbmQodGhpcylcbiAgX2hhbmRsZVVwZGF0ZVVuc2VlbiA9IHRoaXMuX2hhbmRsZVVwZGF0ZVVuc2Vlbi5iaW5kKHRoaXMpXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgc3RhdHVzIH0gPSB0aGlzLnByb3BzXG4gICAgaWYoc3RhdHVzID09PSAnbG9hZGluZycpIHJldHVybiA8TG9hZGVyIC8+XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHsgcm91dGVyIH0gPSB0aGlzLmNvbnRleHRcbiAgICBjb25zdCB7IHBhdGhuYW1lLCBzZWFyY2gsIGhhc2ggfSA9IHRoaXMuY29udGV4dC5yb3V0ZXJcbiAgICB0aGlzLnNldFN0YXRlKHsgaG9zdDogdGhpcy5fZ2V0SG9zdCgpIH0pXG4gICAgdGhpcy5wcm9wcy5vbkxvYWRBZG1pbigpXG4gICAgaWYocGF0aG5hbWUubWF0Y2goL1xcLyhhY3RpdmF0ZXxzaWduaW58cmVzZXQpLiovKSkgcmV0dXJuXG4gICAgdGhpcy5zZXRTdGF0ZSh7IHBhdGhuYW1lLCBzZWFyY2gsIGhhc2ggfSlcbiAgICByb3V0ZXIucmVwbGFjZSgnL2FkbWluJylcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMuX2hhbmRsZUJsdXJGb2N1cywgZmFsc2UpXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5faGFuZGxlQmx1ckZvY3VzLCBmYWxzZSlcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICBjb25zdCB7IGFjdGl2ZSwgZmluZ2VycHJpbnQsIHRlYW1zLCB0ZWFtLCB1bnNlZW4sIHVzZXIsIG9uTG9hZFNlc3Npb24sIG9uU2F2ZUFkbWluIH0gPSB0aGlzLnByb3BzXG4gICAgY29uc3QgeyByb3V0ZXIgfSA9IHRoaXMuY29udGV4dFxuICAgIGNvbnN0IHsgcGF0aG5hbWUsIHNlYXJjaCwgaGFzaCB9ID0gdGhpcy5zdGF0ZVxuICAgIGlmKF8uZ2V0KHByZXZQcm9wcywgJ3RlYW0udXNlci5pZCcpICE9PSBfLmdldCh0ZWFtLCAndXNlci5pZCcpKSB7XG4gICAgICBpZighXy5pc05pbChwcmV2UHJvcHMudGVhbSkpIHRoaXMuX2Nsb3NlU29ja2V0cyhwcmV2UHJvcHMudGVhbSlcbiAgICAgIGlmKCFfLmlzTmlsKHRlYW0pKSBvbkxvYWRTZXNzaW9uKHRlYW0udG9rZW4sIGZpbmdlcnByaW50KVxuICAgIH1cbiAgICBpZighXy5pc0VxdWFsKHByZXZQcm9wcy50ZWFtcywgdGVhbXMpKSB7XG4gICAgICBjb25zdCByZXNlcnZlZFBhdGggPSBbJ2FjdGl2YXRlJywncmVzZXQnLCdzaWduaW4nXS5yZWR1Y2UoKHJlc2VydmVkLCBwYXRoKSA9PiB7XG4gICAgICAgIHJldHVybiByZXNlcnZlZCB8fCByb3V0ZXIucGF0aG5hbWUuc3RhcnRzV2l0aChgL2FkbWluLyR7cGF0aH1gKVxuICAgICAgfSwgZmFsc2UpXG4gICAgICBpZighdGVhbSAmJiAhcmVzZXJ2ZWRQYXRoKSByb3V0ZXIucmVwbGFjZSgnL2FkbWluL3NpZ25pbicpXG4gICAgICBpZighdXNlcikgb25TYXZlQWRtaW4oeyBhY3RpdmUsIGZpbmdlcnByaW50LCB0ZWFtcyB9KVxuICAgIH1cbiAgICBpZighXy5pc0VxdWFsKHByZXZQcm9wcy51c2VyLCB1c2VyKSkge1xuICAgICAgb25TYXZlQWRtaW4oeyBhY3RpdmUsIGZpbmdlcnByaW50LCB0ZWFtcyB9KVxuICAgIH1cbiAgICBpZihfLmdldChwcmV2UHJvcHMsICd1c2VyLmlkJykgIT09IF8uZ2V0KHVzZXIsICdpZCcpICYmICFfLmlzTmlsKHVzZXIpKSB7XG4gICAgICB0aGlzLmNvbnRleHQubG9nZ2VyLmxvZ2luKHVzZXIpXG4gICAgICB0aGlzLl9vcGVuU29ja2V0cyh0ZWFtKVxuICAgICAgaWYocm91dGVyLnBhdGhuYW1lLm1hdGNoKC9cXC8oYWN0aXZhdGV8c2lnbmlufHJlc2V0KS4qLykpIHJldHVyblxuICAgICAgaWYocGF0aG5hbWUpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiByb3V0ZXIucHVzaCh7IHBhdGhuYW1lLCBzZWFyY2gsIGhhc2ggfSksIDI1MClcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHBhdGhuYW1lOiBudWxsLCBzZWFyY2g6IG51bGwsIGhhc2g6IG51bGwgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgaWYodW5zZWVuICE9PSBwcmV2UHJvcHMudW5zZWVuKSB7XG4gICAgICBjb25zdCBjb3VudCA9IHVuc2VlbiA8IDEwID8gdW5zZWVuIDogJ3gnXG4gICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zhdmljb24nKVxuICAgICAgbGluay50eXBlID0gJ2ltYWdlL3gtaWNvbidcbiAgICAgIGxpbmsucmVsID0gJ3Nob3J0Y3V0IGljb24nXG4gICAgICBsaW5rLmhyZWYgPSBgL2FkbWluL2ltYWdlcy9pY29ucy9mYXZpY29uLSR7Y291bnR9LnBuZ2BcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQobGluaylcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMuX2hhbmRsZUJsdXJGb2N1cylcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLl9oYW5kbGVCbHVyRm9jdXMpXG4gIH1cblxuICBnZXRDaGlsZENvbnRleHQoKSB7XG4gICAgY29uc3QgeyBhcHBzLCBhY3RpdmUsIHRlYW1zLCB0ZWFtLCB1bnNlZW4sIHVzZXIgfSA9IHRoaXMucHJvcHNcbiAgICByZXR1cm4ge1xuICAgICAgYWRtaW46IHtcbiAgICAgICAgYXBwcyxcbiAgICAgICAgYWN0aXZlLFxuICAgICAgICB0ZWFtcyxcbiAgICAgICAgdGVhbSxcbiAgICAgICAgdW5zZWVuLFxuICAgICAgICB1c2VyLFxuICAgICAgICBhZGRUZWFtOiB0aGlzLl9oYW5kbGVBZGRUZWFtLFxuICAgICAgICBjaGVja0FjY2VzczogdGhpcy5faGFuZGxlQ2hlY2tBY2Nlc3MsXG4gICAgICAgIGNob29zZVRlYW06IHRoaXMuX2hhbmRsZUNob29zZVRlYW0sXG4gICAgICAgIHJlbW92ZVRlYW06IHRoaXMuX2hhbmRsZVJlbW92ZVRlYW0sXG4gICAgICAgIHNpZ25pbjogdGhpcy5faGFuZGxlU2lnbmluLFxuICAgICAgICBzaWdub3V0OiB0aGlzLl9oYW5kbGVTaWdub3V0LFxuICAgICAgICB1cGRhdGVVbnNlZW46IHRoaXMuX2hhbmRsZVVwZGF0ZVVuc2VlblxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9nZXRIb3N0KCkge1xuICAgIGlmKG5hdmlnYXRvci51c2VyQWdlbnQuc2VhcmNoKCdDb3Jkb3ZhJykgPj0gMCkge1xuICAgICAgcmV0dXJuICdjb3Jkb3ZhJ1xuICAgIH0gZWxzZSBpZihuYXZpZ2F0b3IudXNlckFnZW50LnNlYXJjaCgnRWxlY3Ryb24nKSA+PSAwKSB7XG4gICAgICByZXR1cm4gJ2VsZWN0cm9uJ1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJ2Jyb3dzZXInXG4gICAgfVxuICB9XG5cbiAgX29wZW5Tb2NrZXRzKHRlYW0pIHtcbiAgICBjb25zdCB7IG5ldHdvcmsgfSA9IHRoaXMuY29udGV4dFxuICAgIG5ldHdvcmsuam9pbihbXG4gICAgICBgL2FkbWluL3VzZXJzLyR7dGVhbS51c2VyLmlkfWAsXG4gICAgICBgL2FkbWluL3RlYW1zLyR7dGVhbS5pZH1gXG4gICAgXSlcbiAgICBuZXR3b3JrLnN1YnNjcmliZShbXG4gICAgICB7IGFjdGlvbjogJ3Nlc3Npb24nLCBoYW5kbGVyOiB0aGlzLl9oYW5kbGVSZWxvYWRTZXNzaW9uIH0sXG4gICAgICB7IGFjdGlvbjogJ3NpZ25vdXQnLCBoYW5kbGVyOiB0aGlzLl9oYW5kbGVGb3JjZWRTaWdub3V0IH0sXG4gICAgICB7IGFjdGlvbjogJ3ByZXNlbmNlJywgaGFuZGxlcjogdGhpcy5faGFuZGxlUHJlc2VuY2UgfVxuICAgIF0pXG4gICAgbmV0d29yay5zaWduaW4oe1xuICAgICAgc3RhdHVzOiBkb2N1bWVudC5oYXNGb2N1cygpID8gJ2FjdGl2ZScgOiAnYWJzZW50J1xuICAgIH0pXG4gIH1cblxuICBfY2xvc2VTb2NrZXRzKHRlYW0pIHtcbiAgICBjb25zdCB7IG5ldHdvcmsgfSA9IHRoaXMuY29udGV4dFxuICAgIG5ldHdvcmsubGVhdmUoW1xuICAgICAgYC9hZG1pbi91c2Vycy8ke3RlYW0udXNlci5pZH1gLFxuICAgICAgYC9hZG1pbi90ZWFtcy8ke3RlYW0uaWR9YFxuICAgIF0pXG4gICAgbmV0d29yay51bnN1YnNjcmliZShbXG4gICAgICB7IGFjdGlvbjogJ3Nlc3Npb24nLCBoYW5kbGVyOiB0aGlzLl9oYW5kbGVSZWxvYWRTZXNzaW9uIH0sXG4gICAgICB7IGFjdGlvbjogJ3NpZ25vdXQnLCBoYW5kbGVyOiB0aGlzLl9oYW5kbGVGb3JjZWRTaWdub3V0IH0sXG4gICAgICB7IGFjdGlvbjogJ3ByZXNlbmNlJywgaGFuZGxlcjogdGhpcy5faGFuZGxlUHJlc2VuY2UgfVxuICAgIF0pXG4gICAgbmV0d29yay5zaWdub3V0KClcbiAgfVxuXG4gIF9oYW5kbGVGb3JjZWRTaWdub3V0KCkge1xuICAgIGNvbnN0IHsgZmxhc2ggfSA9IHRoaXMuY29udGV4dFxuICAgIHRoaXMuX2hhbmRsZVNpZ25vdXQoKVxuICAgIGZsYXNoLnNldCgnaW5mbycsICdZb3VyIGFjY291bnQgaGFzIGJlZW4gc2lnbmVkIG91dCBvZiBhbGwgZGV2aWNlcycpXG4gIH1cblxuICBfaGFuZGxlQWRkVGVhbSh0ZWFtLCB0b2tlbiwgdXNlcikge1xuICAgIHRoaXMucHJvcHMub25BZGRUZWFtKHRlYW0sIHRva2VuLCB1c2VyKVxuICB9XG5cbiAgX2hhbmRsZUJsdXJGb2N1cygpIHtcbiAgICBjb25zdCB7IHRlYW0gfSA9IHRoaXMucHJvcHNcbiAgICBpZighdGVhbSkgcmV0dXJuXG4gICAgdGhpcy5jb250ZXh0Lm5ldHdvcmsuZW1pdCgnc3RhdHVzJywge1xuICAgICAgc3RhdHVzOiBkb2N1bWVudC5oYXNGb2N1cygpID8gJ2FjdGl2ZScgOiAnYWJzZW50J1xuICAgIH0pXG4gIH1cblxuICBfaGFuZGxlQ2hlY2tBY2Nlc3MoY29kZSkge1xuICAgIHJldHVybiAoXy5maW5kSW5kZXgodGhpcy5wcm9wcy5hcHBzLCB7IGNvZGUgfSkgPj0gMClcbiAgfVxuXG4gIF9oYW5kbGVDaG9vc2VUZWFtKGluZGV4KSB7XG4gICAgY29uc3QgeyByb3V0ZXIgfSA9IHRoaXMuY29udGV4dFxuICAgIGNvbnN0IHsgYWN0aXZlLCBvbkNob29zZVRlYW0gfSA9IHRoaXMucHJvcHNcbiAgICBpZihpbmRleCA9PT0gYWN0aXZlKSB7XG4gICAgICByb3V0ZXIucHVzaCgnL2FkbWluJylcbiAgICB9IGVsc2Uge1xuICAgICAgb25DaG9vc2VUZWFtKGluZGV4KVxuICAgIH1cbiAgfVxuXG4gIF9oYW5kbGVSZW1vdmVUZWFtKGluZGV4KSB7XG4gICAgdGhpcy5wcm9wcy5vblJlbW92ZVRlYW0oaW5kZXgpXG4gIH1cblxuICBfaGFuZGxlU2lnbm91dCgpIHtcbiAgICBjb25zdCB7IGFjdGl2ZSwgb25SZW1vdmVTZXNzaW9uLCBvblNpZ25vdXQgfSA9IHRoaXMucHJvcHNcbiAgICBvblJlbW92ZVNlc3Npb24oKVxuICAgIG9uU2lnbm91dChhY3RpdmUpXG4gIH1cblxuICBfaGFuZGxlU2lnbmluKGluZGV4LCB0b2tlbikge1xuICAgIHRoaXMucHJvcHMub25TaWduaW4oaW5kZXgsIHRva2VuKVxuICB9XG5cbiAgX2hhbmRsZVByZXNlbmNlKHByZXNlbmNlKSB7XG4gICAgdGhpcy5wcm9wcy5vblNldFByZXNlbmNlKHByZXNlbmNlKVxuICB9XG5cbiAgX2hhbmRsZVJlbG9hZFNlc3Npb24oKSB7XG4gICAgY29uc3QgeyB0ZWFtLCBvbkxvYWRTZXNzaW9uIH0gPSB0aGlzLnByb3BzXG4gICAgb25Mb2FkU2Vzc2lvbih0ZWFtLnRva2VuKVxuICB9XG5cbiAgX2hhbmRsZVVwZGF0ZVVuc2VlbihkaWZmZXJlbmNlKSB7XG4gICAgdGhpcy5wcm9wcy5vblVwZGF0ZVVuc2VlbihkaWZmZXJlbmNlKVxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQWRtaW5cbiJdfQ==