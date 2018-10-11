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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Answer = function (_React$Component) {
  (0, _inherits3.default)(Answer, _React$Component);

  function Answer() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Answer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Answer.__proto__ || Object.getPrototypeOf(Answer)).call.apply(_ref, [this].concat(args))), _this), _this.answer = null, _this._handleSubmit = _this._handleSubmit.bind(_this), _this._handleBack = _this._handleBack.bind(_this), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Answer, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          questions = _props.questions,
          question_id = _props.question_id;

      var question = _lodash2.default.find(questions, { id: question_id });
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
              'Answer your question'
            ),
            _react2.default.createElement(
              'p',
              null,
              question.text
            ),
            _react2.default.createElement(
              'form',
              { className: 'ui form', onSubmit: this._handleSubmit },
              _react2.default.createElement('input', { type: 'hidden', value: 'something' }),
              _react2.default.createElement(
                'div',
                { className: 'field text-field' },
                _react2.default.createElement(
                  'div',
                  { className: 'ui input' },
                  _react2.default.createElement('input', { type: 'text', className: 'form-control', autoComplete: 'off', autoCapitalize: 'off', autoCorrect: 'off', spellCheck: 'false', placeholder: 'Answer', ref: function ref(node) {
                      return _this2.answer = node;
                    } })
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'field' },
                _react2.default.createElement(
                  'button',
                  { className: 'ui fluid large ' + (status === 'submitting' ? 'loading' : '') + ' button' },
                  'Continue ',
                  _react2.default.createElement('i', { className: 'right chevron icon' })
                )
              ),
              _react2.default.createElement(
                'p',
                { onClick: this._handleBack },
                'Choose a different question'
              )
            )
          )
        )
      );
    }
  }, {
    key: '_handleBack',
    value: function _handleBack() {
      this.props.onChangeMode('question');
    }
  }, {
    key: '_handleSubmit',
    value: function _handleSubmit(e) {
      var _props2 = this.props,
          token = _props2.token,
          question_id = _props2.question_id,
          onSecurity = _props2.onSecurity;

      var security_question_id = question_id;
      var security_question_answer = this.answer.value;
      onSecurity(token, security_question_id, security_question_answer);
      e.preventDefault();
      return false;
    }
  }]);
  return Answer;
}(_react2.default.Component);

Answer.contextTypes = {
  admin: _propTypes2.default.object,
  flash: _propTypes2.default.object
};
Answer.propTypes = {
  questions: _propTypes2.default.array,
  question_id: _propTypes2.default.number,
  token: _propTypes2.default.string,
  onChangeMode: _propTypes2.default.func,
  onSecurity: _propTypes2.default.func
};
exports.default = Answer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiQW5zd2VyIiwiYW5zd2VyIiwiX2hhbmRsZVN1Ym1pdCIsImJpbmQiLCJfaGFuZGxlQmFjayIsInByb3BzIiwicXVlc3Rpb25zIiwicXVlc3Rpb25faWQiLCJxdWVzdGlvbiIsIl8iLCJmaW5kIiwiaWQiLCJ0ZXh0Iiwibm9kZSIsInN0YXR1cyIsIm9uQ2hhbmdlTW9kZSIsImUiLCJ0b2tlbiIsIm9uU2VjdXJpdHkiLCJzZWN1cml0eV9xdWVzdGlvbl9pZCIsInNlY3VyaXR5X3F1ZXN0aW9uX2Fuc3dlciIsInZhbHVlIiwicHJldmVudERlZmF1bHQiLCJSZWFjdCIsIkNvbXBvbmVudCIsImNvbnRleHRUeXBlcyIsImFkbWluIiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiZmxhc2giLCJwcm9wVHlwZXMiLCJhcnJheSIsIm51bWJlciIsInN0cmluZyIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVNQSxNOzs7Ozs7Ozs7Ozs7OztvTUFlSkMsTSxHQUFTLEksUUFFVEMsYSxHQUFnQixNQUFLQSxhQUFMLENBQW1CQyxJQUFuQixPLFFBQ2hCQyxXLEdBQWMsTUFBS0EsV0FBTCxDQUFpQkQsSUFBakIsTzs7Ozs7NkJBRUw7QUFBQTs7QUFBQSxtQkFDNEIsS0FBS0UsS0FEakM7QUFBQSxVQUNDQyxTQURELFVBQ0NBLFNBREQ7QUFBQSxVQUNZQyxXQURaLFVBQ1lBLFdBRFo7O0FBRVAsVUFBTUMsV0FBV0MsaUJBQUVDLElBQUYsQ0FBT0osU0FBUCxFQUFrQixFQUFFSyxJQUFJSixXQUFOLEVBQWxCLENBQWpCO0FBQ0EsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLG1CQUFmO0FBQ0U7QUFBQTtBQUFBLFlBQUssV0FBVSxrQkFBZjtBQUNFO0FBQUE7QUFBQSxjQUFLLFdBQVUscUJBQWY7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBREY7QUFFRTtBQUFBO0FBQUE7QUFBS0MsdUJBQVNJO0FBQWQsYUFGRjtBQUdFO0FBQUE7QUFBQSxnQkFBTSxXQUFVLFNBQWhCLEVBQTBCLFVBQVcsS0FBS1YsYUFBMUM7QUFDRSx1REFBTyxNQUFLLFFBQVosRUFBcUIsT0FBTSxXQUEzQixHQURGO0FBRUU7QUFBQTtBQUFBLGtCQUFLLFdBQVUsa0JBQWY7QUFDRTtBQUFBO0FBQUEsb0JBQUssV0FBVSxVQUFmO0FBQ0UsMkRBQU8sTUFBSyxNQUFaLEVBQW1CLFdBQVUsY0FBN0IsRUFBNEMsY0FBYSxLQUF6RCxFQUErRCxnQkFBZSxLQUE5RSxFQUFvRixhQUFZLEtBQWhHLEVBQXNHLFlBQVcsT0FBakgsRUFBeUgsYUFBWSxRQUFySSxFQUE4SSxLQUFNLGFBQUNXLElBQUQ7QUFBQSw2QkFBVSxPQUFLWixNQUFMLEdBQWNZLElBQXhCO0FBQUEscUJBQXBKO0FBREY7QUFERixlQUZGO0FBT0U7QUFBQTtBQUFBLGtCQUFLLFdBQVUsT0FBZjtBQUNFO0FBQUE7QUFBQSxvQkFBUSxnQ0FBOEJDLFdBQVcsWUFBWixHQUE0QixTQUE1QixHQUF3QyxFQUFyRSxhQUFSO0FBQUE7QUFDVyx1REFBRyxXQUFVLG9CQUFiO0FBRFg7QUFERixlQVBGO0FBWUU7QUFBQTtBQUFBLGtCQUFHLFNBQVUsS0FBS1YsV0FBbEI7QUFBQTtBQUFBO0FBWkY7QUFIRjtBQURGO0FBREYsT0FERjtBQXdCRDs7O2tDQUVhO0FBQ1osV0FBS0MsS0FBTCxDQUFXVSxZQUFYLENBQXdCLFVBQXhCO0FBQ0Q7OztrQ0FFYUMsQyxFQUFHO0FBQUEsb0JBQzRCLEtBQUtYLEtBRGpDO0FBQUEsVUFDUFksS0FETyxXQUNQQSxLQURPO0FBQUEsVUFDQVYsV0FEQSxXQUNBQSxXQURBO0FBQUEsVUFDYVcsVUFEYixXQUNhQSxVQURiOztBQUVmLFVBQU1DLHVCQUF1QlosV0FBN0I7QUFDQSxVQUFNYSwyQkFBMkIsS0FBS25CLE1BQUwsQ0FBWW9CLEtBQTdDO0FBQ0FILGlCQUFXRCxLQUFYLEVBQWtCRSxvQkFBbEIsRUFBd0NDLHdCQUF4QztBQUNBSixRQUFFTSxjQUFGO0FBQ0EsYUFBTyxLQUFQO0FBQ0Q7OztFQTVEa0JDLGdCQUFNQyxTOztBQUFyQnhCLE0sQ0FFR3lCLFksR0FBZTtBQUNwQkMsU0FBT0Msb0JBQVVDLE1BREc7QUFFcEJDLFNBQU9GLG9CQUFVQztBQUZHLEM7QUFGbEI1QixNLENBT0c4QixTLEdBQVk7QUFDakJ4QixhQUFXcUIsb0JBQVVJLEtBREo7QUFFakJ4QixlQUFhb0Isb0JBQVVLLE1BRk47QUFHakJmLFNBQU9VLG9CQUFVTSxNQUhBO0FBSWpCbEIsZ0JBQWNZLG9CQUFVTyxJQUpQO0FBS2pCaEIsY0FBWVMsb0JBQVVPO0FBTEwsQztrQkF5RE5sQyxNIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5cbmNsYXNzIEFuc3dlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICBhZG1pbjogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBmbGFzaDogUHJvcFR5cGVzLm9iamVjdFxuICB9XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBxdWVzdGlvbnM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBxdWVzdGlvbl9pZDogUHJvcFR5cGVzLm51bWJlcixcbiAgICB0b2tlbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvbkNoYW5nZU1vZGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2VjdXJpdHk6IFByb3BUeXBlcy5mdW5jXG4gIH1cblxuICBhbnN3ZXIgPSBudWxsXG5cbiAgX2hhbmRsZVN1Ym1pdCA9IHRoaXMuX2hhbmRsZVN1Ym1pdC5iaW5kKHRoaXMpXG4gIF9oYW5kbGVCYWNrID0gdGhpcy5faGFuZGxlQmFjay5iaW5kKHRoaXMpXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgcXVlc3Rpb25zLCBxdWVzdGlvbl9pZCB9ID0gdGhpcy5wcm9wc1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gXy5maW5kKHF1ZXN0aW9ucywgeyBpZDogcXVlc3Rpb25faWQgfSlcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYWhhLXNpZ25pbi1wYW5lbFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1haGEtc2lnbmluLWZvcm1cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1haGEtc2lnbmluLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxoMj5BbnN3ZXIgeW91ciBxdWVzdGlvbjwvaDI+XG4gICAgICAgICAgICA8cD57IHF1ZXN0aW9uLnRleHQgfTwvcD5cbiAgICAgICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cInVpIGZvcm1cIiBvblN1Ym1pdD17IHRoaXMuX2hhbmRsZVN1Ym1pdCB9PlxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIHZhbHVlPVwic29tZXRoaW5nXCIgLz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWVsZCB0ZXh0LWZpZWxkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1aSBpbnB1dFwiPlxuICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgYXV0b0NvbXBsZXRlPVwib2ZmXCIgYXV0b0NhcGl0YWxpemU9XCJvZmZcIiBhdXRvQ29ycmVjdD1cIm9mZlwiIHNwZWxsQ2hlY2s9XCJmYWxzZVwiIHBsYWNlaG9sZGVyPVwiQW5zd2VyXCIgcmVmPXsgKG5vZGUpID0+IHRoaXMuYW5zd2VyID0gbm9kZSB9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpZWxkXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e2B1aSBmbHVpZCBsYXJnZSAkeyhzdGF0dXMgPT09ICdzdWJtaXR0aW5nJykgPyAnbG9hZGluZycgOiAnJ30gYnV0dG9uYH0+XG4gICAgICAgICAgICAgICAgICBDb250aW51ZSA8aSBjbGFzc05hbWU9XCJyaWdodCBjaGV2cm9uIGljb25cIiAvPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHAgb25DbGljaz17IHRoaXMuX2hhbmRsZUJhY2sgfT5DaG9vc2UgYSBkaWZmZXJlbnQgcXVlc3Rpb248L3A+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbiAgX2hhbmRsZUJhY2soKSB7XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZU1vZGUoJ3F1ZXN0aW9uJylcbiAgfVxuXG4gIF9oYW5kbGVTdWJtaXQoZSkge1xuICAgIGNvbnN0IHsgdG9rZW4sIHF1ZXN0aW9uX2lkLCBvblNlY3VyaXR5IH0gPSB0aGlzLnByb3BzXG4gICAgY29uc3Qgc2VjdXJpdHlfcXVlc3Rpb25faWQgPSBxdWVzdGlvbl9pZFxuICAgIGNvbnN0IHNlY3VyaXR5X3F1ZXN0aW9uX2Fuc3dlciA9IHRoaXMuYW5zd2VyLnZhbHVlXG4gICAgb25TZWN1cml0eSh0b2tlbiwgc2VjdXJpdHlfcXVlc3Rpb25faWQsIHNlY3VyaXR5X3F1ZXN0aW9uX2Fuc3dlcilcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEFuc3dlclxuIl19