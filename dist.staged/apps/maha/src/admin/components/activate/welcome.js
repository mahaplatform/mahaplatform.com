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

var _image = require('../image');

var _image2 = _interopRequireDefault(_image);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Welcome = function (_React$Component) {
  (0, _inherits3.default)(Welcome, _React$Component);

  function Welcome() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Welcome);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Welcome.__proto__ || Object.getPrototypeOf(Welcome)).call.apply(_ref, [this].concat(args))), _this), _this._handleClick = _this._handleClick.bind(_this), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Welcome, [{
    key: 'render',
    value: function render() {
      var user = this.props.user;

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
              'div',
              { className: 'maha-avatar' },
              _react2.default.createElement(
                'div',
                { className: 'maha-avatar-badge' },
                _react2.default.createElement(
                  'div',
                  { className: 'maha-avatar-wrapper' },
                  _react2.default.createElement(_image2.default, { src: '/images/maha.png', title: 'The Maha Platform', transforms: { fit: 'cover', w: 150, h: 150 } })
                )
              )
            ),
            _react2.default.createElement(
              'h2',
              null,
              'The Maha Platform'
            ),
            _react2.default.createElement(
              'p',
              null,
              'Hi ',
              user.first_name,
              ' and welcome to the Maha Platform! Thank you for verifying your email address. Let\'s take a few moments to set up your account.'
            ),
            _react2.default.createElement(
              'div',
              { className: 'field button-field' },
              _react2.default.createElement(
                'button',
                { className: 'ui fluid large button', onClick: this._handleClick },
                'Continue ',
                _react2.default.createElement('i', { className: 'right chevron icon' })
              )
            )
          )
        )
      );
    }
  }, {
    key: '_handleClick',
    value: function _handleClick() {
      this.props.onChangeMode('question');
    }
  }]);
  return Welcome;
}(_react2.default.Component);

Welcome.propTypes = {
  user: _propTypes2.default.object,
  onChangeMode: _propTypes2.default.func
};
exports.default = Welcome;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiV2VsY29tZSIsIl9oYW5kbGVDbGljayIsImJpbmQiLCJ1c2VyIiwicHJvcHMiLCJmaXQiLCJ3IiwiaCIsImZpcnN0X25hbWUiLCJvbkNoYW5nZU1vZGUiLCJSZWFjdCIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdCIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVNQSxPOzs7Ozs7Ozs7Ozs7OztzTUFPSkMsWSxHQUFlLE1BQUtBLFlBQUwsQ0FBa0JDLElBQWxCLE87Ozs7OzZCQUVOO0FBQUEsVUFDQ0MsSUFERCxHQUNVLEtBQUtDLEtBRGYsQ0FDQ0QsSUFERDs7QUFFUCxhQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsbUJBQWY7QUFDRTtBQUFBO0FBQUEsWUFBSyxXQUFVLGtCQUFmO0FBQ0U7QUFBQTtBQUFBLGNBQUssV0FBVSxxQkFBZjtBQUNFO0FBQUE7QUFBQSxnQkFBSyxXQUFVLGFBQWY7QUFDRTtBQUFBO0FBQUEsa0JBQUssV0FBVSxtQkFBZjtBQUNFO0FBQUE7QUFBQSxvQkFBSyxXQUFVLHFCQUFmO0FBQ0UsZ0RBQUMsZUFBRCxJQUFPLEtBQUksa0JBQVgsRUFBOEIsT0FBTSxtQkFBcEMsRUFBd0QsWUFBWSxFQUFFRSxLQUFLLE9BQVAsRUFBZ0JDLEdBQUcsR0FBbkIsRUFBd0JDLEdBQUcsR0FBM0IsRUFBcEU7QUFERjtBQURGO0FBREYsYUFERjtBQVFFO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFSRjtBQVNFO0FBQUE7QUFBQTtBQUFBO0FBQ09KLG1CQUFLSyxVQURaO0FBQUE7QUFBQSxhQVRGO0FBY0U7QUFBQTtBQUFBLGdCQUFLLFdBQVUsb0JBQWY7QUFDRTtBQUFBO0FBQUEsa0JBQVEsV0FBVSx1QkFBbEIsRUFBMEMsU0FBVSxLQUFLUCxZQUF6RDtBQUFBO0FBQ1cscURBQUcsV0FBVSxvQkFBYjtBQURYO0FBREY7QUFkRjtBQURGO0FBREYsT0FERjtBQTBCRDs7O21DQUVjO0FBQ2IsV0FBS0csS0FBTCxDQUFXSyxZQUFYLENBQXdCLFVBQXhCO0FBQ0Q7OztFQXpDbUJDLGdCQUFNQyxTOztBQUF0QlgsTyxDQUVHWSxTLEdBQVk7QUFDakJULFFBQU1VLG9CQUFVQyxNQURDO0FBRWpCTCxnQkFBY0ksb0JBQVVFO0FBRlAsQztrQkEyQ05mLE8iLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcbmltcG9ydCBJbWFnZSBmcm9tICcuLi9pbWFnZSdcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY2xhc3MgV2VsY29tZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICB1c2VyOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIG9uQ2hhbmdlTW9kZTogUHJvcFR5cGVzLmZ1bmNcbiAgfVxuXG4gIF9oYW5kbGVDbGljayA9IHRoaXMuX2hhbmRsZUNsaWNrLmJpbmQodGhpcylcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyB1c2VyIH0gPSB0aGlzLnByb3BzXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFoYS1zaWduaW4tcGFuZWxcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYWhhLXNpZ25pbi1mb3JtXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYWhhLXNpZ25pbi1jb250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1haGEtYXZhdGFyXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFoYS1hdmF0YXItYmFkZ2VcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1haGEtYXZhdGFyLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxJbWFnZSBzcmM9Jy9pbWFnZXMvbWFoYS5wbmcnIHRpdGxlPVwiVGhlIE1haGEgUGxhdGZvcm1cIiB0cmFuc2Zvcm1zPXt7IGZpdDogJ2NvdmVyJywgdzogMTUwLCBoOiAxNTAgfX0gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxoMj5UaGUgTWFoYSBQbGF0Zm9ybTwvaDI+XG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgSGkgeyB1c2VyLmZpcnN0X25hbWV9IGFuZCB3ZWxjb21lIHRvIHRoZSBNYWhhIFBsYXRmb3JtISBUaGFuayB5b3VcbiAgICAgICAgICAgICAgZm9yIHZlcmlmeWluZyB5b3VyIGVtYWlsIGFkZHJlc3MuIExldCZhcG9zO3MgdGFrZSBhIGZldyBtb21lbnRzIHRvIHNldFxuICAgICAgICAgICAgICB1cCB5b3VyIGFjY291bnQuXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpZWxkIGJ1dHRvbi1maWVsZFwiPlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInVpIGZsdWlkIGxhcmdlIGJ1dHRvblwiIG9uQ2xpY2s9eyB0aGlzLl9oYW5kbGVDbGljayB9PlxuICAgICAgICAgICAgICAgIENvbnRpbnVlIDxpIGNsYXNzTmFtZT1cInJpZ2h0IGNoZXZyb24gaWNvblwiIC8+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbiAgX2hhbmRsZUNsaWNrKCkge1xuICAgIHRoaXMucHJvcHMub25DaGFuZ2VNb2RlKCdxdWVzdGlvbicpXG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBXZWxjb21lXG4iXX0=