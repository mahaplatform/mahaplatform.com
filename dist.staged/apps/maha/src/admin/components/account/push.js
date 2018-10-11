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

var _mahaAdmin = require('maha-admin');

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Push = function (_React$Component) {
  (0, _inherits3.default)(Push, _React$Component);

  function Push() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Push);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Push.__proto__ || Object.getPrototypeOf(Push)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      value: null
    }, _this._handleClick = _this._handleClick.bind(_this), _this._handleToggle = _this._handleToggle.bind(_this), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Push, [{
    key: 'render',
    value: function render() {
      var value = this.state.value;

      return _react2.default.createElement(
        'div',
        { className: 'push-section' },
        value != null && window.Notification && navigator.serviceWorker && _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'label',
            null,
            'Push Notifications'
          ),
          _react2.default.createElement(
            'div',
            { className: 'toggle-row ' + (value ? 'granted' : 'not-granted'), onClick: this._handleClick },
            value && _react2.default.createElement('i', { className: 'fa fa-check-circle' }),
            !value && _react2.default.createElement(_mahaAdmin.Checkbox, this._getCheckbox()),
            _react2.default.createElement(
              'div',
              { className: 'text' },
              value && "Great, you've got push notifications enabled!",
              !value && "Uh oh, you aren't getting desktop notifications! Click here to enable them."
            )
          )
        )
      );
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.push) {
        this._updatePushValue();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.push != this.props.push && prevProps.push != '') {
        this._updatePushValue();
      }
    }
  }, {
    key: '_updatePushValue',
    value: function _updatePushValue() {
      var push = this.props.push;

      if (push === 'unknown' || push === 'never') {
        this.setState({ value: false });
      } else {
        this.setState({ value: true });
      }
    }
  }, {
    key: '_getCheckbox',
    value: function _getCheckbox() {
      var push = this.props.push;

      return {
        defaultValue: this.state.value,
        disabled: push != 'granted' ? false : true
      };
    }
  }, {
    key: '_handleClick',
    value: function _handleClick(e) {
      this._handleToggle();
      e.stopPropagation();
    }
  }, {
    key: '_handleToggle',
    value: function _handleToggle(e) {
      var host = this.context.host;
      var push = this.props.push;

      if (push != 'granted') {
        host.promptNotifications();
      }
    }
  }]);
  return Push;
}(_react2.default.Component);

Push.contextTypes = {
  host: _propTypes2.default.object
};
Push.defaultProps = {
  push: _propTypes2.default.string
};


var mapStateToProps = function mapStateToProps(state, props) {
  return {
    push: state.maha.browser.push
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Push);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiUHVzaCIsInN0YXRlIiwidmFsdWUiLCJfaGFuZGxlQ2xpY2siLCJiaW5kIiwiX2hhbmRsZVRvZ2dsZSIsIndpbmRvdyIsIk5vdGlmaWNhdGlvbiIsIm5hdmlnYXRvciIsInNlcnZpY2VXb3JrZXIiLCJfZ2V0Q2hlY2tib3giLCJwcm9wcyIsInB1c2giLCJfdXBkYXRlUHVzaFZhbHVlIiwicHJldlByb3BzIiwic2V0U3RhdGUiLCJkZWZhdWx0VmFsdWUiLCJkaXNhYmxlZCIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJob3N0IiwiY29udGV4dCIsInByb21wdE5vdGlmaWNhdGlvbnMiLCJSZWFjdCIsIkNvbXBvbmVudCIsImNvbnRleHRUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdCIsImRlZmF1bHRQcm9wcyIsInN0cmluZyIsIm1hcFN0YXRlVG9Qcm9wcyIsIm1haGEiLCJicm93c2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRU1BLEk7Ozs7Ozs7Ozs7Ozs7O2dNQVVKQyxLLEdBQVE7QUFDTkMsYUFBTztBQURELEssUUFJUkMsWSxHQUFlLE1BQUtBLFlBQUwsQ0FBa0JDLElBQWxCLE8sUUFDZkMsYSxHQUFnQixNQUFLQSxhQUFMLENBQW1CRCxJQUFuQixPOzs7Ozs2QkFFUDtBQUFBLFVBQ0NGLEtBREQsR0FDVyxLQUFLRCxLQURoQixDQUNDQyxLQUREOztBQUVQLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxjQUFmO0FBQ0lBLGlCQUFTLElBQVQsSUFBaUJJLE9BQU9DLFlBQXhCLElBQXdDQyxVQUFVQyxhQUFsRCxJQUNBO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FERjtBQUVFO0FBQUE7QUFBQSxjQUFLLDRCQUEyQlAsS0FBRCxHQUFVLFNBQVYsR0FBc0IsYUFBaEQsQ0FBTCxFQUF1RSxTQUFVLEtBQUtDLFlBQXRGO0FBQ0lELHFCQUFTLHFDQUFHLFdBQVUsb0JBQWIsR0FEYjtBQUVJLGFBQUNBLEtBQUQsSUFBVSw4QkFBQyxtQkFBRCxFQUFlLEtBQUtRLFlBQUwsRUFBZixDQUZkO0FBR0U7QUFBQTtBQUFBLGdCQUFLLFdBQVUsTUFBZjtBQUNJUix1QkFBUywrQ0FEYjtBQUVJLGVBQUNBLEtBQUQsSUFBVTtBQUZkO0FBSEY7QUFGRjtBQUZKLE9BREY7QUFpQkQ7Ozt3Q0FFa0I7QUFDakIsVUFBSSxLQUFLUyxLQUFMLENBQVdDLElBQWYsRUFBcUI7QUFDbkIsYUFBS0MsZ0JBQUw7QUFDRDtBQUNGOzs7dUNBRWtCQyxTLEVBQVU7QUFDM0IsVUFBSUEsVUFBVUYsSUFBVixJQUFrQixLQUFLRCxLQUFMLENBQVdDLElBQTdCLElBQXFDRSxVQUFVRixJQUFWLElBQWtCLEVBQTNELEVBQStEO0FBQzdELGFBQUtDLGdCQUFMO0FBQ0Q7QUFDRjs7O3VDQUVpQjtBQUFBLFVBQ1JELElBRFEsR0FDQyxLQUFLRCxLQUROLENBQ1JDLElBRFE7O0FBRWhCLFVBQUlBLFNBQVMsU0FBVCxJQUFzQkEsU0FBUyxPQUFuQyxFQUE0QztBQUMxQyxhQUFLRyxRQUFMLENBQWMsRUFBRWIsT0FBTyxLQUFULEVBQWQ7QUFDRCxPQUZELE1BRU87QUFDTCxhQUFLYSxRQUFMLENBQWMsRUFBRWIsT0FBTyxJQUFULEVBQWQ7QUFDRDtBQUNGOzs7bUNBRWE7QUFBQSxVQUNKVSxJQURJLEdBQ0ssS0FBS0QsS0FEVixDQUNKQyxJQURJOztBQUVaLGFBQU87QUFDTEksc0JBQWMsS0FBS2YsS0FBTCxDQUFXQyxLQURwQjtBQUVMZSxrQkFBV0wsUUFBUSxTQUFULEdBQXNCLEtBQXRCLEdBQThCO0FBRm5DLE9BQVA7QUFJRDs7O2lDQUVZTSxDLEVBQUc7QUFDZCxXQUFLYixhQUFMO0FBQ0FhLFFBQUVDLGVBQUY7QUFDRDs7O2tDQUVhRCxDLEVBQUc7QUFBQSxVQUNQRSxJQURPLEdBQ0UsS0FBS0MsT0FEUCxDQUNQRCxJQURPO0FBQUEsVUFFUFIsSUFGTyxHQUVFLEtBQUtELEtBRlAsQ0FFUEMsSUFGTzs7QUFHZixVQUFJQSxRQUFRLFNBQVosRUFBdUI7QUFDckJRLGFBQUtFLG1CQUFMO0FBQ0Q7QUFDRjs7O0VBOUVnQkMsZ0JBQU1DLFM7O0FBQW5CeEIsSSxDQUVHeUIsWSxHQUFlO0FBQ3BCTCxRQUFNTSxvQkFBVUM7QUFESSxDO0FBRmxCM0IsSSxDQU1HNEIsWSxHQUFlO0FBQ3BCaEIsUUFBTWMsb0JBQVVHO0FBREksQzs7O0FBNEV4QixJQUFNQyxrQkFBa0IsU0FBbEJBLGVBQWtCLENBQUM3QixLQUFELEVBQVFVLEtBQVI7QUFBQSxTQUFtQjtBQUN6Q0MsVUFBTVgsTUFBTThCLElBQU4sQ0FBV0MsT0FBWCxDQUFtQnBCO0FBRGdCLEdBQW5CO0FBQUEsQ0FBeEI7O2tCQUllLHlCQUFRa0IsZUFBUixFQUF5QjlCLElBQXpCLEMiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm0sIENoZWNrYm94IH0gZnJvbSAnbWFoYS1hZG1pbidcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY2xhc3MgUHVzaCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICBob3N0OiBQcm9wVHlwZXMub2JqZWN0XG4gIH1cblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHB1c2g6IFByb3BUeXBlcy5zdHJpbmdcbiAgfVxuXG4gIHN0YXRlID0ge1xuICAgIHZhbHVlOiBudWxsXG4gIH1cblxuICBfaGFuZGxlQ2xpY2sgPSB0aGlzLl9oYW5kbGVDbGljay5iaW5kKHRoaXMpXG4gIF9oYW5kbGVUb2dnbGUgPSB0aGlzLl9oYW5kbGVUb2dnbGUuYmluZCh0aGlzKVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHZhbHVlIH0gPSB0aGlzLnN0YXRlXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHVzaC1zZWN0aW9uXCI+XG4gICAgICAgIHsgdmFsdWUgIT0gbnVsbCAmJiB3aW5kb3cuTm90aWZpY2F0aW9uICYmIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyICYmXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxsYWJlbD5QdXNoIE5vdGlmaWNhdGlvbnM8L2xhYmVsPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBgdG9nZ2xlLXJvdyAkeyh2YWx1ZSkgPyAnZ3JhbnRlZCcgOiAnbm90LWdyYW50ZWQnfWAgfSBvbkNsaWNrPXsgdGhpcy5faGFuZGxlQ2xpY2sgfT5cbiAgICAgICAgICAgICAgeyB2YWx1ZSAmJiA8aSBjbGFzc05hbWU9XCJmYSBmYS1jaGVjay1jaXJjbGVcIiAvPiB9XG4gICAgICAgICAgICAgIHsgIXZhbHVlICYmIDxDaGVja2JveCB7IC4uLnRoaXMuX2dldENoZWNrYm94KCkgfSAvPiB9XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dFwiPlxuICAgICAgICAgICAgICAgIHsgdmFsdWUgJiYgXCJHcmVhdCwgeW91J3ZlIGdvdCBwdXNoIG5vdGlmaWNhdGlvbnMgZW5hYmxlZCFcIiB9XG4gICAgICAgICAgICAgICAgeyAhdmFsdWUgJiYgXCJVaCBvaCwgeW91IGFyZW4ndCBnZXR0aW5nIGRlc2t0b3Agbm90aWZpY2F0aW9ucyEgQ2xpY2sgaGVyZSB0byBlbmFibGUgdGhlbS5cIiB9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgaWYoIHRoaXMucHJvcHMucHVzaCApe1xuICAgICAgdGhpcy5fdXBkYXRlUHVzaFZhbHVlKClcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKXtcbiAgICBpZiggcHJldlByb3BzLnB1c2ggIT0gdGhpcy5wcm9wcy5wdXNoICYmIHByZXZQcm9wcy5wdXNoICE9ICcnICl7XG4gICAgICB0aGlzLl91cGRhdGVQdXNoVmFsdWUoKVxuICAgIH1cbiAgfVxuXG4gIF91cGRhdGVQdXNoVmFsdWUoKXtcbiAgICBjb25zdCB7IHB1c2ggfSA9IHRoaXMucHJvcHNcbiAgICBpZiggcHVzaCA9PT0gJ3Vua25vd24nIHx8IHB1c2ggPT09ICduZXZlcicgKXtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZTogZmFsc2UgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbHVlOiB0cnVlIH0pXG4gICAgfVxuICB9XG5cbiAgX2dldENoZWNrYm94KCl7XG4gICAgY29uc3QgeyBwdXNoIH0gPSB0aGlzLnByb3BzXG4gICAgcmV0dXJuIHtcbiAgICAgIGRlZmF1bHRWYWx1ZTogdGhpcy5zdGF0ZS52YWx1ZSxcbiAgICAgIGRpc2FibGVkOiAocHVzaCAhPSAnZ3JhbnRlZCcpID8gZmFsc2UgOiB0cnVlXG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZUNsaWNrKGUpIHtcbiAgICB0aGlzLl9oYW5kbGVUb2dnbGUoKVxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgfVxuXG4gIF9oYW5kbGVUb2dnbGUoZSkge1xuICAgIGNvbnN0IHsgaG9zdCB9ID0gdGhpcy5jb250ZXh0XG4gICAgY29uc3QgeyBwdXNoIH0gPSB0aGlzLnByb3BzXG4gICAgaWYoIHB1c2ggIT0gJ2dyYW50ZWQnICl7XG4gICAgICBob3N0LnByb21wdE5vdGlmaWNhdGlvbnMoKVxuICAgIH1cbiAgfVxuXG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSwgcHJvcHMpID0+ICh7XG4gIHB1c2g6IHN0YXRlLm1haGEuYnJvd3Nlci5wdXNoXG59KVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcykoUHVzaClcbiJdfQ==