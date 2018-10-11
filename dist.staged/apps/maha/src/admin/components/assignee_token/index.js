'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mahaAdmin = require('maha-admin');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AssigneeToken = function AssigneeToken(_ref) {
  var is_everyone = _ref.is_everyone,
      user = _ref.user,
      group = _ref.group,
      name = _ref.name,
      photo = _ref.photo;
  return _react2.default.createElement(
    'div',
    { className: 'assignee-token' },
    _react2.default.createElement(
      'div',
      { className: 'assignee-token-image' },
      is_everyone && _react2.default.createElement(
        'div',
        { className: 'assignee-token-icon' },
        _react2.default.createElement(_mahaAdmin.Avatar, { icon: 'globe', user: { full_name: 'Everyone' } })
      ),
      group && _react2.default.createElement(
        'div',
        { className: 'assignee-token-icon' },
        _react2.default.createElement(_mahaAdmin.Avatar, { icon: 'users', user: group, presence: false })
      ),
      user && _react2.default.createElement(
        'div',
        { className: 'assignee-token-avatar' },
        _react2.default.createElement(_mahaAdmin.Avatar, { user: user, presence: false })
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'assignee-token-name' },
      user && _react2.default.createElement(
        'span',
        null,
        user.full_name
      ),
      group && _react2.default.createElement(
        'span',
        null,
        group.title
      ),
      is_everyone && _react2.default.createElement(
        'span',
        null,
        'Everyone'
      )
    )
  );
};

AssigneeToken.propTypes = {
  name: _propTypes2.default.string,
  group: _propTypes2.default.object,
  is_everyone: _propTypes2.default.bool,
  photo: _propTypes2.default.string,
  user: _propTypes2.default.object
};

exports.default = AssigneeToken;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiQXNzaWduZWVUb2tlbiIsImlzX2V2ZXJ5b25lIiwidXNlciIsImdyb3VwIiwibmFtZSIsInBob3RvIiwiZnVsbF9uYW1lIiwidGl0bGUiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJzdHJpbmciLCJvYmplY3QiLCJib29sIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxnQkFBZ0IsU0FBaEJBLGFBQWdCO0FBQUEsTUFBR0MsV0FBSCxRQUFHQSxXQUFIO0FBQUEsTUFBZ0JDLElBQWhCLFFBQWdCQSxJQUFoQjtBQUFBLE1BQXNCQyxLQUF0QixRQUFzQkEsS0FBdEI7QUFBQSxNQUE2QkMsSUFBN0IsUUFBNkJBLElBQTdCO0FBQUEsTUFBbUNDLEtBQW5DLFFBQW1DQSxLQUFuQztBQUFBLFNBQ3BCO0FBQUE7QUFBQSxNQUFLLFdBQVUsZ0JBQWY7QUFDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLHNCQUFmO0FBQ0lKLHFCQUNBO0FBQUE7QUFBQSxVQUFLLFdBQVUscUJBQWY7QUFDRSxzQ0FBQyxpQkFBRCxJQUFRLE1BQUssT0FBYixFQUFxQixNQUFNLEVBQUVLLFdBQVcsVUFBYixFQUEzQjtBQURGLE9BRko7QUFNSUgsZUFDQTtBQUFBO0FBQUEsVUFBSyxXQUFVLHFCQUFmO0FBQ0Usc0NBQUMsaUJBQUQsSUFBUSxNQUFLLE9BQWIsRUFBcUIsTUFBT0EsS0FBNUIsRUFBb0MsVUFBVyxLQUEvQztBQURGLE9BUEo7QUFXSUQsY0FDQTtBQUFBO0FBQUEsVUFBSyxXQUFVLHVCQUFmO0FBQ0Usc0NBQUMsaUJBQUQsSUFBUSxNQUFPQSxJQUFmLEVBQXNCLFVBQVcsS0FBakM7QUFERjtBQVpKLEtBREY7QUFrQkU7QUFBQTtBQUFBLFFBQUssV0FBVSxxQkFBZjtBQUNJQSxjQUFRO0FBQUE7QUFBQTtBQUFRQSxhQUFLSTtBQUFiLE9BRFo7QUFFSUgsZUFBUztBQUFBO0FBQUE7QUFBUUEsY0FBTUk7QUFBZCxPQUZiO0FBR0lOLHFCQUFlO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFIbkI7QUFsQkYsR0FEb0I7QUFBQSxDQUF0Qjs7QUEyQkFELGNBQWNRLFNBQWQsR0FBMEI7QUFDeEJKLFFBQU1LLG9CQUFVQyxNQURRO0FBRXhCUCxTQUFPTSxvQkFBVUUsTUFGTztBQUd4QlYsZUFBYVEsb0JBQVVHLElBSEM7QUFJeEJQLFNBQU9JLG9CQUFVQyxNQUpPO0FBS3hCUixRQUFNTyxvQkFBVUU7QUFMUSxDQUExQjs7a0JBUWVYLGEiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEF2YXRhciB9IGZyb20gJ21haGEtYWRtaW4nXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmNvbnN0IEFzc2lnbmVlVG9rZW4gPSAoeyBpc19ldmVyeW9uZSwgdXNlciwgZ3JvdXAsIG5hbWUsIHBob3RvIH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJhc3NpZ25lZS10b2tlblwiPlxuICAgIDxkaXYgY2xhc3NOYW1lPVwiYXNzaWduZWUtdG9rZW4taW1hZ2VcIj5cbiAgICAgIHsgaXNfZXZlcnlvbmUgJiZcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhc3NpZ25lZS10b2tlbi1pY29uXCI+XG4gICAgICAgICAgPEF2YXRhciBpY29uPSdnbG9iZScgdXNlcj17eyBmdWxsX25hbWU6ICdFdmVyeW9uZScgfX0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICB9XG4gICAgICB7IGdyb3VwICYmXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXNzaWduZWUtdG9rZW4taWNvblwiPlxuICAgICAgICAgIDxBdmF0YXIgaWNvbj0ndXNlcnMnIHVzZXI9eyBncm91cCB9IHByZXNlbmNlPXsgZmFsc2UgfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIH1cbiAgICAgIHsgdXNlciAmJlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFzc2lnbmVlLXRva2VuLWF2YXRhclwiPlxuICAgICAgICAgIDxBdmF0YXIgdXNlcj17IHVzZXIgfSBwcmVzZW5jZT17IGZhbHNlIH0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICB9XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzc05hbWU9XCJhc3NpZ25lZS10b2tlbi1uYW1lXCI+XG4gICAgICB7IHVzZXIgJiYgPHNwYW4+eyB1c2VyLmZ1bGxfbmFtZSB9PC9zcGFuPiB9XG4gICAgICB7IGdyb3VwICYmIDxzcGFuPnsgZ3JvdXAudGl0bGUgfTwvc3Bhbj4gfVxuICAgICAgeyBpc19ldmVyeW9uZSAmJiA8c3Bhbj5FdmVyeW9uZTwvc3Bhbj4gfVxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbilcblxuQXNzaWduZWVUb2tlbi5wcm9wVHlwZXMgPSB7XG4gIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGdyb3VwOiBQcm9wVHlwZXMub2JqZWN0LFxuICBpc19ldmVyeW9uZTogUHJvcFR5cGVzLmJvb2wsXG4gIHBob3RvOiBQcm9wVHlwZXMuc3RyaW5nLFxuICB1c2VyOiBQcm9wVHlwZXMub2JqZWN0XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFzc2lnbmVlVG9rZW5cbiJdfQ==