'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _reactTransitionGroup = require('react-transition-group');

var _notifications = require('./notifications');

var _notifications2 = _interopRequireDefault(_notifications);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _question = require('./question');

var _question2 = _interopRequireDefault(_question);

var _password = require('./password');

var _password2 = _interopRequireDefault(_password);

var _complete = require('./complete');

var _complete2 = _interopRequireDefault(_complete);

var _invalid = require('./invalid');

var _invalid2 = _interopRequireDefault(_invalid);

var _welcome = require('./welcome');

var _welcome2 = _interopRequireDefault(_welcome);

var _verify = require('./verify');

var _verify2 = _interopRequireDefault(_verify);

var _avatar = require('./avatar');

var _avatar2 = _interopRequireDefault(_avatar);

var _answer = require('./answer');

var _answer2 = _interopRequireDefault(_answer);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Activate = function (_React$Component) {
  (0, _inherits3.default)(Activate, _React$Component);

  function Activate(props) {
    (0, _classCallCheck3.default)(this, Activate);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Activate.__proto__ || Object.getPrototypeOf(Activate)).call(this, props));

    _this.classNames = '';
    _this.routes = [{ mode: 'verify', component: _verify2.default }, { mode: 'invalid', component: _invalid2.default }, { mode: 'welcome', component: _welcome2.default }, { mode: 'question', component: _question2.default }, { mode: 'answer', component: _answer2.default }, { mode: 'password', component: _password2.default }, { mode: 'avatar', component: _avatar2.default }, { mode: 'notifications', component: _notifications2.default }, { mode: 'complete', component: _complete2.default }];
    _this.state = {
      transition: 'next'
    };
    return _this;
  }

  (0, _createClass3.default)(Activate, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var mode = this.props.mode;
      var transition = this.state.transition;

      return _react2.default.createElement(
        'div',
        { className: 'maha-signin ' + transition },
        this.routes.map(function (route, index) {
          return _react2.default.createElement(
            _reactTransitionGroup.CSSTransition,
            { 'in': mode === route.mode, classNames: 'advance', timeout: 5000, mountOnEnter: true, unmountOnExit: true, key: index },
            _react2.default.createElement(route.component, _this2.props)
          );
        })
      );
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          location = _props.location,
          onVerify = _props.onVerify;

      var _location$pathname$ma = location.pathname.match(/^\/admin\/activate\/(.*)/),
          _location$pathname$ma2 = (0, _slicedToArray3.default)(_location$pathname$ma, 2),
          token = _location$pathname$ma2[1];

      onVerify(token);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      var mode = this.props.mode;

      if (nextProps.mode !== mode) {
        var oldIndex = _lodash2.default.findIndex(this.routes, { mode: mode });
        var newIndex = _lodash2.default.findIndex(this.routes, { mode: nextProps.mode });
        if (oldIndex >= 0) {
          var transition = newIndex >= oldIndex ? 'slide-next' : 'slide-back';
          this.setState({ transition: transition });
        }
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _context = this.context,
          flash = _context.flash,
          router = _context.router;
      var _props2 = this.props,
          error = _props2.error,
          mode = _props2.mode,
          status = _props2.status;

      if (prevProps.status !== status && status === 'failure') {
        flash.set('error', error);
      }
      if (mode !== prevProps.mode) {
        var pathname = '/admin/activate/' + mode;
        router.push(pathname);
      }
    }
  }]);
  return Activate;
}(_react2.default.Component);

Activate.contextTypes = {
  admin: _propTypes2.default.object,
  flash: _propTypes2.default.object,
  router: _propTypes2.default.object
};
Activate.propTypes = {
  error: _propTypes2.default.string,
  location: _propTypes2.default.string,
  mode: _propTypes2.default.string,
  status: _propTypes2.default.string,
  onVerify: _propTypes2.default.func
};
exports.default = Activate;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiQWN0aXZhdGUiLCJwcm9wcyIsImNsYXNzTmFtZXMiLCJyb3V0ZXMiLCJtb2RlIiwiY29tcG9uZW50IiwiVmVyaWZ5IiwiSW52YWxpZCIsIldlbGNvbWUiLCJRdWVzdGlvbiIsIkFuc3dlciIsIlBhc3N3b3JkIiwiQXZhdGFyIiwiTm90aWZpY2F0aW9ucyIsIkNvbXBsZXRlIiwic3RhdGUiLCJ0cmFuc2l0aW9uIiwibWFwIiwicm91dGUiLCJpbmRleCIsImxvY2F0aW9uIiwib25WZXJpZnkiLCJwYXRobmFtZSIsIm1hdGNoIiwidG9rZW4iLCJuZXh0UHJvcHMiLCJvbGRJbmRleCIsIl8iLCJmaW5kSW5kZXgiLCJuZXdJbmRleCIsInNldFN0YXRlIiwicHJldlByb3BzIiwiY29udGV4dCIsImZsYXNoIiwicm91dGVyIiwiZXJyb3IiLCJzdGF0dXMiLCJzZXQiLCJwdXNoIiwiUmVhY3QiLCJDb21wb25lbnQiLCJjb250ZXh0VHlwZXMiLCJhZG1pbiIsIlByb3BUeXBlcyIsIm9iamVjdCIsInByb3BUeXBlcyIsInN0cmluZyIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFTUEsUTs7O0FBZ0JKLG9CQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsa0lBQ1hBLEtBRFc7O0FBRWpCLFVBQUtDLFVBQUwsR0FBa0IsRUFBbEI7QUFDQSxVQUFLQyxNQUFMLEdBQWMsQ0FDWixFQUFFQyxNQUFNLFFBQVIsRUFBa0JDLFdBQVdDLGdCQUE3QixFQURZLEVBRVosRUFBRUYsTUFBTSxTQUFSLEVBQW1CQyxXQUFXRSxpQkFBOUIsRUFGWSxFQUdaLEVBQUVILE1BQU0sU0FBUixFQUFtQkMsV0FBV0csaUJBQTlCLEVB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QU1DLFM7O0FBQXZCeEMsUSxDQUVHeUMsWSxHQUFlO0FBQ3BCQyxTQUFPQyxvQkFBVUMsTUFERztBQUVwQlgsU0FBT1Usb0JBQVVDLE1BRkc7QUFHcEJWLFVBQVFTLG9CQUFVQztBQUhFLEM7QUFGbEI1QyxRLENBUUc2QyxTLEdBQVk7QUFDakJWLFNBQU9RLG9CQUFVRyxNQURBO0FBRWpCMUIsWUFBVXVCLG9CQUFVRyxNQUZIO0FBR2pCMUMsUUFBTXVDLG9CQUFVRyxNQUhDO0FBSWpCVixVQUFRTyxvQkFBVUcsTUFKRDtBQUtqQnpCLFlBQVVzQixvQkFBVUk7QUFMSCxDO2tCQTBFTi9DLFEiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENTU1RyYW5zaXRpb24gfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwJ1xuaW1wb3J0IE5vdGlmaWNhdGlvbnMgZnJvbSAnLi9ub3RpZmljYXRpb25zJ1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuaW1wb3J0IFF1ZXN0aW9uIGZyb20gJy4vcXVlc3Rpb24nXG5pbXBvcnQgUGFzc3dvcmQgZnJvbSAnLi9wYXNzd29yZCdcbmltcG9ydCBDb21wbGV0ZSBmcm9tICcuL2NvbXBsZXRlJ1xuaW1wb3J0IEludmFsaWQgZnJvbSAnLi9pbnZhbGlkJ1xuaW1wb3J0IFdlbGNvbWUgZnJvbSAnLi93ZWxjb21lJ1xuaW1wb3J0IFZlcmlmeSBmcm9tICcuL3ZlcmlmeSdcbmltcG9ydCBBdmF0YXIgZnJvbSAnLi9hdmF0YXInXG5pbXBvcnQgQW5zd2VyIGZyb20gJy4vYW5zd2VyJ1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuXG5jbGFzcyBBY3RpdmF0ZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICBhZG1pbjogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBmbGFzaDogUHJvcFR5cGVzLm9iamVjdCxcbiAgICByb3V0ZXI6IFByb3BUeXBlcy5vYmplY3RcbiAgfVxuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZXJyb3I6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbG9jYXRpb246IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbW9kZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzdGF0dXM6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgb25WZXJpZnk6IFByb3BUeXBlcy5mdW5jXG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMuY2xhc3NOYW1lcyA9ICcnXG4gICAgdGhpcy5yb3V0ZXMgPSBbXG4gICAgICB7IG1vZGU6ICd2ZXJpZnknLCBjb21wb25lbnQ6IFZlcmlmeSB9LFxuICAgICAgeyBtb2RlOiAnaW52YWxpZCcsIGNvbXBvbmVudDogSW52YWxpZCB9LFxuICAgICAgeyBtb2RlOiAnd2VsY29tZScsIGNvbXBvbmVudDogV2VsY29tZSB9LFxuICAgICAgeyBtb2RlOiAncXVlc3Rpb24nLCBjb21wb25lbnQ6IFF1ZXN0aW9uIH0sXG4gICAgICB7IG1vZGU6ICdhbnN3ZXInLCBjb21wb25lbnQ6IEFuc3dlciB9LFxuICAgICAgeyBtb2RlOiAncGFzc3dvcmQnLCBjb21wb25lbnQ6IFBhc3N3b3JkIH0sXG4gICAgICB7IG1vZGU6ICdhdmF0YXInLCBjb21wb25lbnQ6IEF2YXRhciB9LFxuICAgICAgeyBtb2RlOiAnbm90aWZpY2F0aW9ucycsIGNvbXBvbmVudDogTm90aWZpY2F0aW9ucyB9LFxuICAgICAgeyBtb2RlOiAnY29tcGxldGUnLCBjb21wb25lbnQ6IENvbXBsZXRlIH1cbiAgICBdXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHRyYW5zaXRpb246ICduZXh0J1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IG1vZGUgfSA9IHRoaXMucHJvcHNcbiAgICBjb25zdCB7IHRyYW5zaXRpb24gfSA9IHRoaXMuc3RhdGVcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2BtYWhhLXNpZ25pbiAke3RyYW5zaXRpb259YH0+XG4gICAgICAgIHsgdGhpcy5yb3V0ZXMubWFwKChyb3V0ZSwgaW5kZXgpID0+IChcbiAgICAgICAgICA8Q1NTVHJhbnNpdGlvbiBpbj17IG1vZGUgPT09IHJvdXRlLm1vZGUgfSBjbGFzc05hbWVzPVwiYWR2YW5jZVwiIHRpbWVvdXQ9eyA1MDAwIH0gbW91bnRPbkVudGVyPXsgdHJ1ZSB9IHVubW91bnRPbkV4aXQ9eyB0cnVlIH0ga2V5PXsgaW5kZXggfT5cbiAgICAgICAgICAgIDxyb3V0ZS5jb21wb25lbnQgeyAuLi50aGlzLnByb3BzIH0gLz5cbiAgICAgICAgICA8L0NTU1RyYW5zaXRpb24+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3QgeyBsb2NhdGlvbiwgb25WZXJpZnkgfSA9IHRoaXMucHJvcHNcbiAgICBjb25zdCBbLHRva2VuXSA9IGxvY2F0aW9uLnBhdGhuYW1lLm1hdGNoKC9eXFwvYWRtaW5cXC9hY3RpdmF0ZVxcLyguKikvKVxuICAgIG9uVmVyaWZ5KHRva2VuKVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVwZGF0ZShuZXh0UHJvcHMpIHtcbiAgICBjb25zdCB7IG1vZGUgfSA9IHRoaXMucHJvcHNcbiAgICBpZihuZXh0UHJvcHMubW9kZSAhPT0gbW9kZSkge1xuICAgICAgY29uc3Qgb2xkSW5kZXggPSBfLmZpbmRJbmRleCh0aGlzLnJvdXRlcywgeyBtb2RlIH0pXG4gICAgICBjb25zdCBuZXdJbmRleCA9IF8uZmluZEluZGV4KHRoaXMucm91dGVzLCB7IG1vZGU6IG5leHRQcm9wcy5tb2RlIH0pXG4gICAgICBpZihvbGRJbmRleCA+PSAwKSB7XG4gICAgICAgIGNvbnN0IHRyYW5zaXRpb24gPSAobmV3SW5kZXggPj0gb2xkSW5kZXgpID8gJ3NsaWRlLW5leHQnIDogJ3NsaWRlLWJhY2snXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB0cmFuc2l0aW9uIH0pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgIGNvbnN0IHsgZmxhc2gsIHJvdXRlciB9ID0gdGhpcy5jb250ZXh0XG4gICAgY29uc3QgeyBlcnJvciwgbW9kZSwgc3RhdHVzIH0gPSB0aGlzLnByb3BzXG4gICAgaWYocHJldlByb3BzLnN0YXR1cyAhPT0gc3RhdHVzICYmIHN0YXR1cyA9PT0gJ2ZhaWx1cmUnKSB7XG4gICAgICBmbGFzaC5zZXQoJ2Vycm9yJywgZXJyb3IpXG4gICAgfVxuICAgIGlmKG1vZGUgIT09IHByZXZQcm9wcy5tb2RlKSB7XG4gICAgICBjb25zdCBwYXRobmFtZSA9IGAvYWRtaW4vYWN0aXZhdGUvJHttb2RlfWBcbiAgICAgIHJvdXRlci5wdXNoKHBhdGhuYW1lKVxuICAgIH1cblxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQWN0aXZhdGVcbiJdfQ==