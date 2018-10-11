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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _client = require('../../../client');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Avatar = function (_React$Component) {
  (0, _inherits3.default)(Avatar, _React$Component);

  function Avatar() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Avatar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Avatar.__proto__ || Object.getPrototypeOf(Avatar)).call.apply(_ref, [this].concat(args))), _this), _this._handleClick = _this._handleClick.bind(_this), _this._handleChange = _this._handleChange.bind(_this), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Avatar, [{
    key: 'render',
    value: function render() {
      var photo_id = this.props.photo_id;

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
              'Upload a Photo'
            ),
            _react2.default.createElement(
              'p',
              null,
              'Please select a photo to help others identify you and your content across the platform'
            ),
            _react2.default.createElement(_client.FileField, this._getFilefield()),
            _react2.default.createElement(
              'div',
              { className: 'field button-field' },
              _react2.default.createElement(
                'button',
                { className: 'ui fluid large button', onClick: this._handleClick },
                photo_id ? 'Continue' : 'Skip',
                ' ',
                _react2.default.createElement('i', { className: 'right chevron icon' })
              )
            )
          )
        )
      );
    }
  }, {
    key: '_getFilefield',
    value: function _getFilefield() {
      var _props = this.props,
          token = _props.token,
          photo_id = _props.photo_id;

      return {
        type: 'filefield',
        button: _react2.default.createElement(
          'div',
          { className: 'maha-signin-avatar' },
          _react2.default.createElement(
            'div',
            { className: 'maha-signin-avatar-placeholder' },
            _react2.default.createElement('i', { className: 'fa fa-user-circle' })
          )
        ),
        action: '/api/admin/activate/assets/upload',
        endpoint: '/api/admin/activate/assets',
        token: token,
        multiple: false,
        defaultValue: photo_id,
        onChange: this._handleChange
      };
    }
  }, {
    key: '_handleBack',
    value: function _handleBack() {
      this.props.onChangeMode('password');
    }
  }, {
    key: '_handleChange',
    value: function _handleChange(id) {
      this.props.onSetPhotoId(id);
    }
  }, {
    key: '_handleClick',
    value: function _handleClick() {
      var _props2 = this.props,
          token = _props2.token,
          photo_id = _props2.photo_id;

      if (!photo_id) return this.props.onChangeMode('notifications');
      this.props.onAvatar(token, photo_id);
    }
  }]);
  return Avatar;
}(_react2.default.Component);

Avatar.contextTypes = {
  admin: _propTypes2.default.object
};
Avatar.propTypes = {
  token: _propTypes2.default.string,
  photo_id: _propTypes2.default.number,
  onAvatar: _propTypes2.default.func,
  onSetPhotoId: _propTypes2.default.func,
  onChangeMode: _propTypes2.default.func
};
exports.default = Avatar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiQXZhdGFyIiwiX2hhbmRsZUNsaWNrIiwiYmluZCIsIl9oYW5kbGVDaGFuZ2UiLCJwaG90b19pZCIsInByb3BzIiwiX2dldEZpbGVmaWVsZCIsInRva2VuIiwidHlwZSIsImJ1dHRvbiIsImFjdGlvbiIsImVuZHBvaW50IiwibXVsdGlwbGUiLCJkZWZhdWx0VmFsdWUiLCJvbkNoYW5nZSIsIm9uQ2hhbmdlTW9kZSIsImlkIiwib25TZXRQaG90b0lkIiwib25BdmF0YXIiLCJSZWFjdCIsIkNvbXBvbmVudCIsImNvbnRleHRUeXBlcyIsImFkbWluIiwiUHJvcFR5cGVzIiwib2JqZWN0IiwicHJvcFR5cGVzIiwic3RyaW5nIiwibnVtYmVyIiwiZnVuYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztJQUVNQSxNOzs7Ozs7Ozs7Ozs7OztvTUFjSkMsWSxHQUFlLE1BQUtBLFlBQUwsQ0FBa0JDLElBQWxCLE8sUUFDZkMsYSxHQUFnQixNQUFLQSxhQUFMLENBQW1CRCxJQUFuQixPOzs7Ozs2QkFFUDtBQUFBLFVBQ0NFLFFBREQsR0FDYyxLQUFLQyxLQURuQixDQUNDRCxRQUREOztBQUVQLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxtQkFBZjtBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsa0JBQWY7QUFDRTtBQUFBO0FBQUEsY0FBSyxXQUFVLHFCQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQURGO0FBRUU7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUZGO0FBSUUsMENBQUMsaUJBQUQsRUFBZ0IsS0FBS0UsYUFBTCxFQUFoQixDQUpGO0FBS0U7QUFBQTtBQUFBLGdCQUFLLFdBQVUsb0JBQWY7QUFDRTtBQUFBO0FBQUEsa0JBQVEsV0FBVSx1QkFBbEIsRUFBMEMsU0FBVSxLQUFLTCxZQUF6RDtBQUNJRywyQkFBVyxVQUFYLEdBQXdCLE1BRDVCO0FBQUE7QUFDcUMscURBQUcsV0FBVSxvQkFBYjtBQURyQztBQURGO0FBTEY7QUFERjtBQURGLE9BREY7QUFpQkQ7OztvQ0FFZTtBQUFBLG1CQUNjLEtBQUtDLEtBRG5CO0FBQUEsVUFDTkUsS0FETSxVQUNOQSxLQURNO0FBQUEsVUFDQ0gsUUFERCxVQUNDQSxRQUREOztBQUVkLGFBQU87QUFDTEksY0FBTSxXQUREO0FBRUxDLGdCQUFRO0FBQUE7QUFBQSxZQUFLLFdBQVUsb0JBQWY7QUFBb0M7QUFBQTtBQUFBLGNBQUssV0FBVSxnQ0FBZjtBQUFnRCxpREFBRyxXQUFVLG1CQUFiO0FBQWhEO0FBQXBDLFNBRkg7QUFHTEMsZ0JBQVEsbUNBSEg7QUFJTEMsa0JBQVUsNEJBSkw7QUFLTEosb0JBTEs7QUFNTEssa0JBQVUsS0FOTDtBQU9MQyxzQkFBY1QsUUFQVDtBQVFMVSxrQkFBVSxLQUFLWDtBQVJWLE9BQVA7QUFXRDs7O2tDQUVhO0FBQ1osV0FBS0UsS0FBTCxDQUFXVSxZQUFYLENBQXdCLFVBQXhCO0FBQ0Q7OztrQ0FFYUMsRSxFQUFJO0FBQ2hCLFdBQUtYLEtBQUwsQ0FBV1ksWUFBWCxDQUF3QkQsRUFBeEI7QUFDRDs7O21DQUVjO0FBQUEsb0JBQ2UsS0FBS1gsS0FEcEI7QUFBQSxVQUNMRSxLQURLLFdBQ0xBLEtBREs7QUFBQSxVQUNFSCxRQURGLFdBQ0VBLFFBREY7O0FBRWIsVUFBRyxDQUFDQSxRQUFKLEVBQWMsT0FBTyxLQUFLQyxLQUFMLENBQVdVLFlBQVgsQ0FBd0IsZUFBeEIsQ0FBUDtBQUNkLFdBQUtWLEtBQUwsQ0FBV2EsUUFBWCxDQUFvQlgsS0FBcEIsRUFBMkJILFFBQTNCO0FBQ0Q7OztFQWpFa0JlLGdCQUFNQyxTOztBQUFyQnBCLE0sQ0FFR3FCLFksR0FBZTtBQUNwQkMsU0FBT0Msb0JBQVVDO0FBREcsQztBQUZsQnhCLE0sQ0FNR3lCLFMsR0FBWTtBQUNqQmxCLFNBQU9nQixvQkFBVUcsTUFEQTtBQUVqQnRCLFlBQVVtQixvQkFBVUksTUFGSDtBQUdqQlQsWUFBVUssb0JBQVVLLElBSEg7QUFJakJYLGdCQUFjTSxvQkFBVUssSUFKUDtBQUtqQmIsZ0JBQWNRLG9CQUFVSztBQUxQLEM7a0JBK0RONUIsTSIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgRmlsZUZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vY2xpZW50J1xuXG5jbGFzcyBBdmF0YXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgYWRtaW46IFByb3BUeXBlcy5vYmplY3RcbiAgfVxuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgdG9rZW46IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcGhvdG9faWQ6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgb25BdmF0YXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2V0UGhvdG9JZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DaGFuZ2VNb2RlOiBQcm9wVHlwZXMuZnVuY1xuICB9XG5cbiAgX2hhbmRsZUNsaWNrID0gdGhpcy5faGFuZGxlQ2xpY2suYmluZCh0aGlzKVxuICBfaGFuZGxlQ2hhbmdlID0gdGhpcy5faGFuZGxlQ2hhbmdlLmJpbmQodGhpcylcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBwaG90b19pZCB9ID0gdGhpcy5wcm9wc1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1haGEtc2lnbmluLXBhbmVsXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFoYS1zaWduaW4tZm9ybVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFoYS1zaWduaW4tY29udGVudFwiPlxuICAgICAgICAgICAgPGgyPlVwbG9hZCBhIFBob3RvPC9oMj5cbiAgICAgICAgICAgIDxwPlBsZWFzZSBzZWxlY3QgYSBwaG90byB0byBoZWxwIG90aGVycyBpZGVudGlmeSB5b3UgYW5kXG4gICAgICAgICAgICAgIHlvdXIgY29udGVudCBhY3Jvc3MgdGhlIHBsYXRmb3JtPC9wPlxuICAgICAgICAgICAgPEZpbGVGaWVsZCB7IC4uLnRoaXMuX2dldEZpbGVmaWVsZCgpIH0gLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmllbGQgYnV0dG9uLWZpZWxkXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwidWkgZmx1aWQgbGFyZ2UgYnV0dG9uXCIgb25DbGljaz17IHRoaXMuX2hhbmRsZUNsaWNrIH0+XG4gICAgICAgICAgICAgICAgeyBwaG90b19pZCA/ICdDb250aW51ZScgOiAnU2tpcCcgfSA8aSBjbGFzc05hbWU9XCJyaWdodCBjaGV2cm9uIGljb25cIiAvPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG4gIF9nZXRGaWxlZmllbGQoKSB7XG4gICAgY29uc3QgeyB0b2tlbiwgcGhvdG9faWQgfSA9IHRoaXMucHJvcHNcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ2ZpbGVmaWVsZCcsXG4gICAgICBidXR0b246IDxkaXYgY2xhc3NOYW1lPVwibWFoYS1zaWduaW4tYXZhdGFyXCI+PGRpdiBjbGFzc05hbWU9XCJtYWhhLXNpZ25pbi1hdmF0YXItcGxhY2Vob2xkZXJcIj48aSBjbGFzc05hbWU9XCJmYSBmYS11c2VyLWNpcmNsZVwiIC8+PC9kaXY+PC9kaXY+LFxuICAgICAgYWN0aW9uOiAnL2FwaS9hZG1pbi9hY3RpdmF0ZS9hc3NldHMvdXBsb2FkJyxcbiAgICAgIGVuZHBvaW50OiAnL2FwaS9hZG1pbi9hY3RpdmF0ZS9hc3NldHMnLFxuICAgICAgdG9rZW4sXG4gICAgICBtdWx0aXBsZTogZmFsc2UsXG4gICAgICBkZWZhdWx0VmFsdWU6IHBob3RvX2lkLFxuICAgICAgb25DaGFuZ2U6IHRoaXMuX2hhbmRsZUNoYW5nZVxuICAgIH1cblxuICB9XG5cbiAgX2hhbmRsZUJhY2soKSB7XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZU1vZGUoJ3Bhc3N3b3JkJylcbiAgfVxuXG4gIF9oYW5kbGVDaGFuZ2UoaWQpIHtcbiAgICB0aGlzLnByb3BzLm9uU2V0UGhvdG9JZChpZClcbiAgfVxuXG4gIF9oYW5kbGVDbGljaygpIHtcbiAgICBjb25zdCB7IHRva2VuLCBwaG90b19pZCB9ID0gdGhpcy5wcm9wc1xuICAgIGlmKCFwaG90b19pZCkgcmV0dXJuIHRoaXMucHJvcHMub25DaGFuZ2VNb2RlKCdub3RpZmljYXRpb25zJylcbiAgICB0aGlzLnByb3BzLm9uQXZhdGFyKHRva2VuLCBwaG90b19pZClcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEF2YXRhclxuIl19