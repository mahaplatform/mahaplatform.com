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

var _alert = require('./alert');

var _alert2 = _interopRequireDefault(_alert);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Alerts = function (_React$Component) {
  (0, _inherits3.default)(Alerts, _React$Component);

  function Alerts() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Alerts);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Alerts.__proto__ || Object.getPrototypeOf(Alerts)).call.apply(_ref, [this].concat(args))), _this), _this._handlePush = _this._handlePush.bind(_this), _this._handlePop = _this._handlePop.bind(_this), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Alerts, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          alert = _props.alert;
      var pathname = this.context.router.pathname;

      var showAlerts = !pathname.match(/\/(activate|signin|reset).*/);
      return _react2.default.createElement(
        'div',
        { className: 'maha-alerts' },
        showAlerts && alert && _react2.default.createElement(_alert2.default, alert),
        children
      );
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        alerts: {
          push: this._handlePush,
          pop: this._handlePop
        }
      };
    }
  }, {
    key: '_handlePush',
    value: function _handlePush(alert) {
      this.props.onPush(alert);
    }
  }, {
    key: '_handlePop',
    value: function _handlePop() {
      this.props.onPop();
    }
  }]);
  return Alerts;
}(_react2.default.Component);

Alerts.childContextTypes = {
  alerts: _propTypes2.default.object
};
Alerts.contextTypes = {
  router: _propTypes2.default.object
};
Alerts.propTypes = {
  alerts: _propTypes2.default.array,
  alert: _propTypes2.default.object,
  children: _propTypes2.default.any,
  onPush: _propTypes2.default.func,
  onPop: _propTypes2.default.func
};
exports.default = Alerts;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiQWxlcnRzIiwiX2hhbmRsZVB1c2giLCJiaW5kIiwiX2hhbmRsZVBvcCIsInByb3BzIiwiY2hpbGRyZW4iLCJhbGVydCIsInBhdGhuYW1lIiwiY29udGV4dCIsInJvdXRlciIsInNob3dBbGVydHMiLCJtYXRjaCIsImFsZXJ0cyIsInB1c2giLCJwb3AiLCJvblB1c2giLCJvblBvcCIsIlJlYWN0IiwiQ29tcG9uZW50IiwiY2hpbGRDb250ZXh0VHlwZXMiLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJjb250ZXh0VHlwZXMiLCJwcm9wVHlwZXMiLCJhcnJheSIsImFueSIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVNQSxNOzs7Ozs7Ozs7Ozs7OztvTUFrQkpDLFcsR0FBYyxNQUFLQSxXQUFMLENBQWlCQyxJQUFqQixPLFFBQ2RDLFUsR0FBWSxNQUFLQSxVQUFMLENBQWdCRCxJQUFoQixPOzs7Ozs2QkFFSDtBQUFBLG1CQUNxQixLQUFLRSxLQUQxQjtBQUFBLFVBQ0NDLFFBREQsVUFDQ0EsUUFERDtBQUFBLFVBQ1dDLEtBRFgsVUFDV0EsS0FEWDtBQUFBLFVBRUNDLFFBRkQsR0FFYyxLQUFLQyxPQUFMLENBQWFDLE1BRjNCLENBRUNGLFFBRkQ7O0FBR1AsVUFBTUcsYUFBYSxDQUFDSCxTQUFTSSxLQUFULENBQWUsNkJBQWYsQ0FBcEI7QUFDQSxhQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsYUFBZjtBQUNJRCxzQkFBY0osS0FBZCxJQUF1Qiw4QkFBQyxlQUFELEVBQVlBLEtBQVosQ0FEM0I7QUFFSUQ7QUFGSixPQURGO0FBTUQ7OztzQ0FFaUI7QUFDaEIsYUFBTztBQUNMTyxnQkFBUTtBQUNOQyxnQkFBTSxLQUFLWixXQURMO0FBRU5hLGVBQUssS0FBS1g7QUFGSjtBQURILE9BQVA7QUFNRDs7O2dDQUVXRyxLLEVBQU87QUFDakIsV0FBS0YsS0FBTCxDQUFXVyxNQUFYLENBQWtCVCxLQUFsQjtBQUNEOzs7aUNBRVk7QUFDWCxXQUFLRixLQUFMLENBQVdZLEtBQVg7QUFDRDs7O0VBaERrQkMsZ0JBQU1DLFM7O0FBQXJCbEIsTSxDQUVHbUIsaUIsR0FBb0I7QUFDekJQLFVBQVFRLG9CQUFVQztBQURPLEM7QUFGdkJyQixNLENBTUdzQixZLEdBQWU7QUFDcEJiLFVBQVFXLG9CQUFVQztBQURFLEM7QUFObEJyQixNLENBVUd1QixTLEdBQVk7QUFDakJYLFVBQVFRLG9CQUFVSSxLQUREO0FBRWpCbEIsU0FBT2Msb0JBQVVDLE1BRkE7QUFHakJoQixZQUFVZSxvQkFBVUssR0FISDtBQUlqQlYsVUFBUUssb0JBQVVNLElBSkQ7QUFLakJWLFNBQU9JLG9CQUFVTTtBQUxBLEM7a0JBMENOMUIsTSIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuaW1wb3J0IEFsZXJ0IGZyb20gJy4vYWxlcnQnXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmNsYXNzIEFsZXJ0cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzID0ge1xuICAgIGFsZXJ0czogUHJvcFR5cGVzLm9iamVjdFxuICB9XG5cbiAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICByb3V0ZXI6IFByb3BUeXBlcy5vYmplY3RcbiAgfVxuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgYWxlcnRzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgYWxlcnQ6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5hbnksXG4gICAgb25QdXNoOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblBvcDogUHJvcFR5cGVzLmZ1bmNcbiAgfVxuXG4gIF9oYW5kbGVQdXNoID0gdGhpcy5faGFuZGxlUHVzaC5iaW5kKHRoaXMpXG4gIF9oYW5kbGVQb3AgPXRoaXMuX2hhbmRsZVBvcC5iaW5kKHRoaXMpXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY2hpbGRyZW4sIGFsZXJ0IH0gPSB0aGlzLnByb3BzXG4gICAgY29uc3QgeyBwYXRobmFtZSB9ID0gdGhpcy5jb250ZXh0LnJvdXRlclxuICAgIGNvbnN0IHNob3dBbGVydHMgPSAhcGF0aG5hbWUubWF0Y2goL1xcLyhhY3RpdmF0ZXxzaWduaW58cmVzZXQpLiovKVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1haGEtYWxlcnRzXCI+XG4gICAgICAgIHsgc2hvd0FsZXJ0cyAmJiBhbGVydCAmJiA8QWxlcnQgeyAuLi5hbGVydCB9IC8+IH1cbiAgICAgICAgeyBjaGlsZHJlbiB9XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxuICBnZXRDaGlsZENvbnRleHQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFsZXJ0czoge1xuICAgICAgICBwdXNoOiB0aGlzLl9oYW5kbGVQdXNoLFxuICAgICAgICBwb3A6IHRoaXMuX2hhbmRsZVBvcFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9oYW5kbGVQdXNoKGFsZXJ0KSB7XG4gICAgdGhpcy5wcm9wcy5vblB1c2goYWxlcnQpXG4gIH1cblxuICBfaGFuZGxlUG9wKCkge1xuICAgIHRoaXMucHJvcHMub25Qb3AoKVxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQWxlcnRzXG4iXX0=