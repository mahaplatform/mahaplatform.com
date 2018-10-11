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

var Security = function (_React$Component) {
  (0, _inherits3.default)(Security, _React$Component);

  function Security() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Security);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Security.__proto__ || Object.getPrototypeOf(Security)).call.apply(_ref, [this].concat(args))), _this), _this.answer1 = null, _this.answer2 = null, _this._handleSubmit = _this._handleSubmit.bind(_this), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Security, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var questions = this.props.questions;

      return _react2.default.createElement(
        'div',
        { className: 'maha-signin-panel' },
        _react2.default.createElement(
          'div',
          { className: 'maha-signin-header' },
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
                  _react2.default.createElement(_image2.default, { src: '/admin/images/maha.png', title: 'The Maha Platform', transforms: { fit: 'cover', w: 150, h: 150 } })
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
              'Verify your Identity'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'maha-signin-form' },
          _react2.default.createElement(
            'form',
            { className: 'ui form', onSubmit: this._handleSubmit },
            questions.map(function (question, index) {
              return _react2.default.createElement(
                'div',
                { className: 'field text-field', key: 'question_' + index },
                _react2.default.createElement(
                  'label',
                  null,
                  question.text
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'ui input' },
                  _react2.default.createElement('input', { type: 'test', className: 'form-control', autoComplete: 'off', autoCapitalize: 'off', autoCorrect: 'off', spellCheck: 'false', placeholder: 'Answer', ref: function ref(node) {
                      return _this2['answer' + (index + 1)] = node;
                    } })
                )
              );
            }),
            _react2.default.createElement(
              'div',
              { className: 'field button-field' },
              _react2.default.createElement(
                'button',
                { className: 'ui fluid large ' + (status === 'submitting' ? 'loading' : '') + ' button' },
                'Continue ',
                _react2.default.createElement('i', { className: 'right chevron icon' })
              )
            )
          )
        ),
        _react2.default.createElement('div', { className: 'maha-signin-footer' })
      );
    }
  }, {
    key: '_handleSubmit',
    value: function _handleSubmit(e) {
      var _props = this.props,
          token = _props.token,
          questions = _props.questions,
          onSecurity = _props.onSecurity;

      this.answer1.focus();
      var security_question_1_id = questions[0].id;
      var security_question_1_answer = this.answer1.value;
      var security_question_2_id = questions[1].id;
      var security_question_2_answer = this.answer2.value;
      onSecurity(token, security_question_1_id, security_question_1_answer, security_question_2_id, security_question_2_answer);
      e.preventDefault();
      return false;
    }
  }]);
  return Security;
}(_react2.default.Component);

Security.contextTypes = {
  admin: _propTypes2.default.object,
  flash: _propTypes2.default.object
};
Security.propTypes = {
  questions: _propTypes2.default.array,
  token: _propTypes2.default.string,
  onSecurity: _propTypes2.default.func
};
exports.default = Security;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiU2VjdXJpdHkiLCJhbnN3ZXIxIiwiYW5zd2VyMiIsIl9oYW5kbGVTdWJtaXQiLCJiaW5kIiwicXVlc3Rpb25zIiwicHJvcHMiLCJmaXQiLCJ3IiwiaCIsIm1hcCIsInF1ZXN0aW9uIiwiaW5kZXgiLCJ0ZXh0Iiwibm9kZSIsInN0YXR1cyIsImUiLCJ0b2tlbiIsIm9uU2VjdXJpdHkiLCJmb2N1cyIsInNlY3VyaXR5X3F1ZXN0aW9uXzFfaWQiLCJpZCIsInNlY3VyaXR5X3F1ZXN0aW9uXzFfYW5zd2VyIiwidmFsdWUiLCJzZWN1cml0eV9xdWVzdGlvbl8yX2lkIiwic2VjdXJpdHlfcXVlc3Rpb25fMl9hbnN3ZXIiLCJwcmV2ZW50RGVmYXVsdCIsIlJlYWN0IiwiQ29tcG9uZW50IiwiY29udGV4dFR5cGVzIiwiYWRtaW4iLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJmbGFzaCIsInByb3BUeXBlcyIsImFycmF5Iiwic3RyaW5nIiwiZnVuYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRU1BLFE7Ozs7Ozs7Ozs7Ozs7O3dNQWFKQyxPLEdBQVUsSSxRQUVWQyxPLEdBQVUsSSxRQUVWQyxhLEdBQWdCLE1BQUtBLGFBQUwsQ0FBbUJDLElBQW5CLE87Ozs7OzZCQUVQO0FBQUE7O0FBQUEsVUFDQ0MsU0FERCxHQUNlLEtBQUtDLEtBRHBCLENBQ0NELFNBREQ7O0FBRVAsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLG1CQUFmO0FBQ0U7QUFBQTtBQUFBLFlBQUssV0FBVSxvQkFBZjtBQUNFO0FBQUE7QUFBQSxjQUFLLFdBQVUscUJBQWY7QUFDRTtBQUFBO0FBQUEsZ0JBQUssV0FBVSxhQUFmO0FBQ0U7QUFBQTtBQUFBLGtCQUFLLFdBQVUsbUJBQWY7QUFDRTtBQUFBO0FBQUEsb0JBQUssV0FBVSxxQkFBZjtBQUNFLGdEQUFDLGVBQUQsSUFBTyxLQUFJLHdCQUFYLEVBQW9DLE9BQU0sbUJBQTFDLEVBQThELFlBQVksRUFBRUUsS0FBSyxPQUFQLEVBQWdCQyxHQUFHLEdBQW5CLEVBQXdCQyxHQUFHLEdBQTNCLEVBQTFFO0FBREY7QUFERjtBQURGLGFBREY7QUFRRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBUkY7QUFTRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBVEY7QUFERixTQURGO0FBY0U7QUFBQTtBQUFBLFlBQUssV0FBVSxrQkFBZjtBQUNFO0FBQUE7QUFBQSxjQUFNLFdBQVUsU0FBaEIsRUFBMEIsVUFBVyxLQUFLTixhQUExQztBQUNJRSxzQkFBVUssR0FBVixDQUFjLFVBQUNDLFFBQUQsRUFBV0MsS0FBWDtBQUFBLHFCQUNkO0FBQUE7QUFBQSxrQkFBSyxXQUFVLGtCQUFmLEVBQWtDLG1CQUFpQkEsS0FBbkQ7QUFDRTtBQUFBO0FBQUE7QUFBU0QsMkJBQVNFO0FBQWxCLGlCQURGO0FBRUU7QUFBQTtBQUFBLG9CQUFLLFdBQVUsVUFBZjtBQUNFLDJEQUFPLE1BQUssTUFBWixFQUFtQixXQUFVLGNBQTdCLEVBQTRDLGNBQWEsS0FBekQsRUFBK0QsZ0JBQWUsS0FBOUUsRUFBb0YsYUFBWSxLQUFoRyxFQUFzRyxZQUFXLE9BQWpILEVBQXlILGFBQVksUUFBckksRUFBOEksS0FBTSxhQUFDQyxJQUFEO0FBQUEsNkJBQVUsbUJBQWNGLFFBQVEsQ0FBdEIsS0FBNkJFLElBQXZDO0FBQUEscUJBQXBKO0FBREY7QUFGRixlQURjO0FBQUEsYUFBZCxDQURKO0FBU0U7QUFBQTtBQUFBLGdCQUFLLFdBQVUsb0JBQWY7QUFDRTtBQUFBO0FBQUEsa0JBQVEsZ0NBQThCQyxXQUFXLFlBQVosR0FBNEIsU0FBNUIsR0FBd0MsRUFBckUsYUFBUjtBQUFBO0FBQ1cscURBQUcsV0FBVSxvQkFBYjtBQURYO0FBREY7QUFURjtBQURGLFNBZEY7QUErQkUsK0NBQUssV0FBVSxvQkFBZjtBQS9CRixPQURGO0FBbUNEOzs7a0NBRWFDLEMsRUFBRztBQUFBLG1CQUMwQixLQUFLVixLQUQvQjtBQUFBLFVBQ1BXLEtBRE8sVUFDUEEsS0FETztBQUFBLFVBQ0FaLFNBREEsVUFDQUEsU0FEQTtBQUFBLFVBQ1dhLFVBRFgsVUFDV0EsVUFEWDs7QUFFZixXQUFLakIsT0FBTCxDQUFha0IsS0FBYjtBQUNBLFVBQU1DLHlCQUF5QmYsVUFBVSxDQUFWLEVBQWFnQixFQUE1QztBQUNBLFVBQU1DLDZCQUE2QixLQUFLckIsT0FBTCxDQUFhc0IsS0FBaEQ7QUFDQSxVQUFNQyx5QkFBeUJuQixVQUFVLENBQVYsRUFBYWdCLEVBQTVDO0FBQ0EsVUFBTUksNkJBQTZCLEtBQUt2QixPQUFMLENBQWFxQixLQUFoRDtBQUNBTCxpQkFBV0QsS0FBWCxFQUFrQkcsc0JBQWxCLEVBQTBDRSwwQkFBMUMsRUFBc0VFLHNCQUF0RSxFQUE4RkMsMEJBQTlGO0FBQ0FULFFBQUVVLGNBQUY7QUFDQSxhQUFPLEtBQVA7QUFDRDs7O0VBcEVvQkMsZ0JBQU1DLFM7O0FBQXZCNUIsUSxDQUVHNkIsWSxHQUFlO0FBQ3BCQyxTQUFPQyxvQkFBVUMsTUFERztBQUVwQkMsU0FBT0Ysb0JBQVVDO0FBRkcsQztBQUZsQmhDLFEsQ0FPR2tDLFMsR0FBWTtBQUNqQjdCLGFBQVcwQixvQkFBVUksS0FESjtBQUVqQmxCLFNBQU9jLG9CQUFVSyxNQUZBO0FBR2pCbEIsY0FBWWEsb0JBQVVNO0FBSEwsQztrQkFpRU5yQyxRIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5pbXBvcnQgSW1hZ2UgZnJvbSAnLi4vaW1hZ2UnXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmNsYXNzIFNlY3VyaXR5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xuICAgIGFkbWluOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGZsYXNoOiBQcm9wVHlwZXMub2JqZWN0XG4gIH1cblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIHF1ZXN0aW9uczogUHJvcFR5cGVzLmFycmF5LFxuICAgIHRva2VuOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uU2VjdXJpdHk6IFByb3BUeXBlcy5mdW5jXG4gIH1cblxuICBhbnN3ZXIxID0gbnVsbFxuXG4gIGFuc3dlcjIgPSBudWxsXG5cbiAgX2hhbmRsZVN1Ym1pdCA9IHRoaXMuX2hhbmRsZVN1Ym1pdC5iaW5kKHRoaXMpXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgcXVlc3Rpb25zIH0gPSB0aGlzLnByb3BzXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFoYS1zaWduaW4tcGFuZWxcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYWhhLXNpZ25pbi1oZWFkZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1haGEtc2lnbmluLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFoYS1hdmF0YXJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYWhhLWF2YXRhci1iYWRnZVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFoYS1hdmF0YXItd3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgPEltYWdlIHNyYz0nL2FkbWluL2ltYWdlcy9tYWhhLnBuZycgdGl0bGU9XCJUaGUgTWFoYSBQbGF0Zm9ybVwiIHRyYW5zZm9ybXM9e3sgZml0OiAnY292ZXInLCB3OiAxNTAsIGg6IDE1MCB9fSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGgyPlRoZSBNYWhhIFBsYXRmb3JtPC9oMj5cbiAgICAgICAgICAgIDxwPlZlcmlmeSB5b3VyIElkZW50aXR5PC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYWhhLXNpZ25pbi1mb3JtXCI+XG4gICAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwidWkgZm9ybVwiIG9uU3VibWl0PXsgdGhpcy5faGFuZGxlU3VibWl0IH0+XG4gICAgICAgICAgICB7IHF1ZXN0aW9ucy5tYXAoKHF1ZXN0aW9uLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpZWxkIHRleHQtZmllbGRcIiBrZXk9e2BxdWVzdGlvbl8ke2luZGV4fWB9PlxuICAgICAgICAgICAgICAgIDxsYWJlbD57IHF1ZXN0aW9uLnRleHQgfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1aSBpbnB1dFwiPlxuICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXN0XCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgYXV0b0NvbXBsZXRlPVwib2ZmXCIgYXV0b0NhcGl0YWxpemU9XCJvZmZcIiBhdXRvQ29ycmVjdD1cIm9mZlwiIHNwZWxsQ2hlY2s9XCJmYWxzZVwiIHBsYWNlaG9sZGVyPVwiQW5zd2VyXCIgcmVmPXsgKG5vZGUpID0+IHRoaXNbYGFuc3dlciR7aW5kZXggKyAxfWBdID0gbm9kZSB9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpZWxkIGJ1dHRvbi1maWVsZFwiPlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17YHVpIGZsdWlkIGxhcmdlICR7KHN0YXR1cyA9PT0gJ3N1Ym1pdHRpbmcnKSA/ICdsb2FkaW5nJyA6ICcnfSBidXR0b25gfT5cbiAgICAgICAgICAgICAgICBDb250aW51ZSA8aSBjbGFzc05hbWU9XCJyaWdodCBjaGV2cm9uIGljb25cIiAvPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFoYS1zaWduaW4tZm9vdGVyXCIgLz5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG4gIF9oYW5kbGVTdWJtaXQoZSkge1xuICAgIGNvbnN0IHsgdG9rZW4sIHF1ZXN0aW9ucywgb25TZWN1cml0eSB9ID0gdGhpcy5wcm9wc1xuICAgIHRoaXMuYW5zd2VyMS5mb2N1cygpXG4gICAgY29uc3Qgc2VjdXJpdHlfcXVlc3Rpb25fMV9pZCA9IHF1ZXN0aW9uc1swXS5pZFxuICAgIGNvbnN0IHNlY3VyaXR5X3F1ZXN0aW9uXzFfYW5zd2VyID0gdGhpcy5hbnN3ZXIxLnZhbHVlXG4gICAgY29uc3Qgc2VjdXJpdHlfcXVlc3Rpb25fMl9pZCA9IHF1ZXN0aW9uc1sxXS5pZFxuICAgIGNvbnN0IHNlY3VyaXR5X3F1ZXN0aW9uXzJfYW5zd2VyID0gdGhpcy5hbnN3ZXIyLnZhbHVlXG4gICAgb25TZWN1cml0eSh0b2tlbiwgc2VjdXJpdHlfcXVlc3Rpb25fMV9pZCwgc2VjdXJpdHlfcXVlc3Rpb25fMV9hbnN3ZXIsIHNlY3VyaXR5X3F1ZXN0aW9uXzJfaWQsIHNlY3VyaXR5X3F1ZXN0aW9uXzJfYW5zd2VyKVxuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VjdXJpdHlcbiJdfQ==