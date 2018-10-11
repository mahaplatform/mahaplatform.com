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

var _client = require('../../../client');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Question = function (_React$Component) {
  (0, _inherits3.default)(Question, _React$Component);

  function Question() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Question);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Question.__proto__ || Object.getPrototypeOf(Question)).call.apply(_ref, [this].concat(args))), _this), _this._handleChooseQuestion = _this._handleChooseQuestion.bind(_this), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Question, [{
    key: 'render',
    value: function render() {
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
              'Choose a Security Question'
            ),
            _react2.default.createElement(
              'p',
              null,
              'In the event that you forget your password, we\'ll need a way to make sure that you are you. Please choose a security question to help protect your account.'
            ),
            _react2.default.createElement(_client.RadioGroup, this._getRadioGroup())
          )
        )
      );
    }
  }, {
    key: '_getRadioGroup',
    value: function _getRadioGroup() {
      return {
        options: this.props.questions,
        value: 'id',
        text: 'text',
        onChange: this._handleChooseQuestion
      };
    }
  }, {
    key: '_handleChooseQuestion',
    value: function _handleChooseQuestion(id) {
      this.props.onChooseQuestion(id);
    }
  }]);
  return Question;
}(_react2.default.Component);

Question.contextTypes = {};
Question.propTypes = {
  questions: _propTypes2.default.array,
  token: _propTypes2.default.string,
  onChooseQuestion: _propTypes2.default.func
};
exports.default = Question;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiUXVlc3Rpb24iLCJfaGFuZGxlQ2hvb3NlUXVlc3Rpb24iLCJiaW5kIiwiX2dldFJhZGlvR3JvdXAiLCJvcHRpb25zIiwicHJvcHMiLCJxdWVzdGlvbnMiLCJ2YWx1ZSIsInRleHQiLCJvbkNoYW5nZSIsImlkIiwib25DaG9vc2VRdWVzdGlvbiIsIlJlYWN0IiwiQ29tcG9uZW50IiwiY29udGV4dFR5cGVzIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwiYXJyYXkiLCJ0b2tlbiIsInN0cmluZyIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFTUEsUTs7Ozs7Ozs7Ozs7Ozs7d01BV0pDLHFCLEdBQXdCLE1BQUtBLHFCQUFMLENBQTJCQyxJQUEzQixPOzs7Ozs2QkFFZjtBQUNQLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxtQkFBZjtBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsa0JBQWY7QUFDRTtBQUFBO0FBQUEsY0FBSyxXQUFVLHFCQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQURGO0FBRUU7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUZGO0FBS0UsMENBQUMsa0JBQUQsRUFBaUIsS0FBS0MsY0FBTCxFQUFqQjtBQUxGO0FBREY7QUFERixPQURGO0FBYUQ7OztxQ0FFZ0I7QUFDZixhQUFPO0FBQ0xDLGlCQUFTLEtBQUtDLEtBQUwsQ0FBV0MsU0FEZjtBQUVMQyxlQUFPLElBRkY7QUFHTEMsY0FBTSxNQUhEO0FBSUxDLGtCQUFVLEtBQUtSO0FBSlYsT0FBUDtBQU1EOzs7MENBRXFCUyxFLEVBQUk7QUFDeEIsV0FBS0wsS0FBTCxDQUFXTSxnQkFBWCxDQUE0QkQsRUFBNUI7QUFDRDs7O0VBeENvQkUsZ0JBQU1DLFM7O0FBQXZCYixRLENBRUdjLFksR0FBZSxFO0FBRmxCZCxRLENBS0dlLFMsR0FBWTtBQUNqQlQsYUFBV1Usb0JBQVVDLEtBREo7QUFFakJDLFNBQU9GLG9CQUFVRyxNQUZBO0FBR2pCUixvQkFBa0JLLG9CQUFVSTtBQUhYLEM7a0JBdUNOcEIsUSIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmFkaW9Hcm91cCB9IGZyb20gJy4uLy4uLy4uL2NsaWVudCdcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY2xhc3MgUXVlc3Rpb24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gIH1cblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIHF1ZXN0aW9uczogUHJvcFR5cGVzLmFycmF5LFxuICAgIHRva2VuOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uQ2hvb3NlUXVlc3Rpb246IFByb3BUeXBlcy5mdW5jXG4gIH1cblxuICBfaGFuZGxlQ2hvb3NlUXVlc3Rpb24gPSB0aGlzLl9oYW5kbGVDaG9vc2VRdWVzdGlvbi5iaW5kKHRoaXMpXG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1haGEtc2lnbmluLXBhbmVsXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFoYS1zaWduaW4tZm9ybVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFoYS1zaWduaW4tY29udGVudFwiPlxuICAgICAgICAgICAgPGgyPkNob29zZSBhIFNlY3VyaXR5IFF1ZXN0aW9uPC9oMj5cbiAgICAgICAgICAgIDxwPkluIHRoZSBldmVudCB0aGF0IHlvdSBmb3JnZXQgeW91ciBwYXNzd29yZCwgd2UmYXBvcztsbCBuZWVkIGEgd2F5IHRvXG4gICAgICAgICAgICBtYWtlIHN1cmUgdGhhdCB5b3UgYXJlIHlvdS4gUGxlYXNlIGNob29zZSBhIHNlY3VyaXR5IHF1ZXN0aW9uXG4gICAgICAgICAgICB0byBoZWxwIHByb3RlY3QgeW91ciBhY2NvdW50LjwvcD5cbiAgICAgICAgICAgIDxSYWRpb0dyb3VwIHsgLi4udGhpcy5fZ2V0UmFkaW9Hcm91cCgpfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG4gIF9nZXRSYWRpb0dyb3VwKCkge1xuICAgIHJldHVybiB7XG4gICAgICBvcHRpb25zOiB0aGlzLnByb3BzLnF1ZXN0aW9ucyxcbiAgICAgIHZhbHVlOiAnaWQnLFxuICAgICAgdGV4dDogJ3RleHQnLFxuICAgICAgb25DaGFuZ2U6IHRoaXMuX2hhbmRsZUNob29zZVF1ZXN0aW9uXG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZUNob29zZVF1ZXN0aW9uKGlkKSB7XG4gICAgdGhpcy5wcm9wcy5vbkNob29zZVF1ZXN0aW9uKGlkKVxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUXVlc3Rpb25cbiJdfQ==