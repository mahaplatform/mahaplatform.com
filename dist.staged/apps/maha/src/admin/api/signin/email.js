'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var conditions, user;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (req.body.email) {
              _context.next = 2;
              break;
            }

            throw new _server.BackframeError({
              code: 422,
              message: 'Please enter your email'
            });

          case 2:
            conditions = {
              team_id: req.body.team_id,
              email: req.body.email
            };
            _context.next = 5;
            return _server.User.where(conditions).fetch({ withRelated: ['photo'], transacting: trx });

          case 5:
            user = _context.sent;

            if (user) {
              _context.next = 8;
              break;
            }

            throw new _server.BackframeError({
              code: 422,
              message: 'Unable to find this user'
            });

          case 8:
            if (user.get('activated_at')) {
              _context.next = 10;
              break;
            }

            throw new _server.BackframeError({
              code: 422,
              message: 'Your account has not been activated'
            });

          case 10:
            if (user.get('is_active')) {
              _context.next = 12;
              break;
            }

            throw new _server.BackframeError({
              code: 422,
              message: 'Your account has been disabled'
            });

          case 12:
            return _context.abrupt('return', {
              id: user.get('id'),
              full_name: user.get('full_name'),
              initials: user.get('initials'),
              email: user.get('email'),
              photo: user.related('photo').get('path')
            });

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function processor(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var rules = {
  team_id: 'required'
};

var emailRoute = new _server.Route({
  path: '/email',
  method: 'post',
  processor: processor,
  rules: rules
});

exports.default = emailRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsImJvZHkiLCJlbWFpbCIsIkJhY2tmcmFtZUVycm9yIiwiY29kZSIsIm1lc3NhZ2UiLCJjb25kaXRpb25zIiwidGVhbV9pZCIsIlVzZXIiLCJ3aGVyZSIsImZldGNoIiwid2l0aFJlbGF0ZWQiLCJ0cmFuc2FjdGluZyIsInVzZXIiLCJnZXQiLCJpZCIsImZ1bGxfbmFtZSIsImluaXRpYWxzIiwicGhvdG8iLCJyZWxhdGVkIiwicnVsZXMiLCJlbWFpbFJvdXRlIiwiUm91dGUiLCJwYXRoIiwibWV0aG9kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBRUEsSUFBTUE7QUFBQSxzRkFBWSxpQkFBT0MsR0FBUCxFQUFZQyxHQUFaLEVBQWlCQyxPQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFFWkYsSUFBSUcsSUFBSixDQUFTQyxLQUZHO0FBQUE7QUFBQTtBQUFBOztBQUFBLGtCQUdSLElBQUlDLHNCQUFKLENBQW1CO0FBQ3ZCQyxvQkFBTSxHQURpQjtBQUV2QkMsdUJBQVM7QUFGYyxhQUFuQixDQUhROztBQUFBO0FBU1ZDLHNCQVRVLEdBU0c7QUFDakJDLHVCQUFTVCxJQUFJRyxJQUFKLENBQVNNLE9BREQ7QUFFakJMLHFCQUFPSixJQUFJRyxJQUFKLENBQVNDO0FBRkMsYUFUSDtBQUFBO0FBQUEsbUJBY0dNLGFBQUtDLEtBQUwsQ0FBV0gsVUFBWCxFQUF1QkksS0FBdkIsQ0FBNkIsRUFBRUMsYUFBYSxDQUFDLE9BQUQsQ0FBZixFQUEwQkMsYUFBYWIsR0FBdkMsRUFBN0IsQ0FkSDs7QUFBQTtBQWNWYyxnQkFkVTs7QUFBQSxnQkFnQlpBLElBaEJZO0FBQUE7QUFBQTtBQUFBOztBQUFBLGtCQWlCUixJQUFJVixzQkFBSixDQUFtQjtBQUN2QkMsb0JBQU0sR0FEaUI7QUFFdkJDLHVCQUFTO0FBRmMsYUFBbkIsQ0FqQlE7O0FBQUE7QUFBQSxnQkF1QlpRLEtBQUtDLEdBQUwsQ0FBUyxjQUFULENBdkJZO0FBQUE7QUFBQTtBQUFBOztBQUFBLGtCQXdCUixJQUFJWCxzQkFBSixDQUFtQjtBQUN2QkMsb0JBQU0sR0FEaUI7QUFFdkJDLHVCQUFTO0FBRmMsYUFBbkIsQ0F4QlE7O0FBQUE7QUFBQSxnQkE4QlpRLEtBQUtDLEdBQUwsQ0FBUyxXQUFULENBOUJZO0FBQUE7QUFBQTtBQUFBOztBQUFBLGtCQStCUixJQUFJWCxzQkFBSixDQUFtQjtBQUN2QkMsb0JBQU0sR0FEaUI7QUFFdkJDLHVCQUFTO0FBRmMsYUFBbkIsQ0EvQlE7O0FBQUE7QUFBQSw2Q0FxQ1Q7QUFDTFUsa0JBQUlGLEtBQUtDLEdBQUwsQ0FBUyxJQUFULENBREM7QUFFTEUseUJBQVdILEtBQUtDLEdBQUwsQ0FBUyxXQUFULENBRk47QUFHTEcsd0JBQVVKLEtBQUtDLEdBQUwsQ0FBUyxVQUFULENBSEw7QUFJTFoscUJBQU9XLEtBQUtDLEdBQUwsQ0FBUyxPQUFULENBSkY7QUFLTEkscUJBQU9MLEtBQUtNLE9BQUwsQ0FBYSxPQUFiLEVBQXNCTCxHQUF0QixDQUEwQixNQUExQjtBQUxGLGFBckNTOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUErQ0EsSUFBTU0sUUFBUTtBQUNaYixXQUFTO0FBREcsQ0FBZDs7QUFJQSxJQUFNYyxhQUFhLElBQUlDLGFBQUosQ0FBVTtBQUMzQkMsUUFBTSxRQURxQjtBQUUzQkMsVUFBUSxNQUZtQjtBQUczQjNCLHNCQUgyQjtBQUkzQnVCO0FBSjJCLENBQVYsQ0FBbkI7O2tCQU9lQyxVIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZSwgQmFja2ZyYW1lRXJyb3IsIFVzZXIgfSBmcm9tICcuLi8uLi8uLi9zZXJ2ZXInXG5cbmNvbnN0IHByb2Nlc3NvciA9IGFzeW5jIChyZXEsIHRyeCwgb3B0aW9ucykgPT4ge1xuXG4gIGlmKCFyZXEuYm9keS5lbWFpbCkge1xuICAgIHRocm93IG5ldyBCYWNrZnJhbWVFcnJvcih7XG4gICAgICBjb2RlOiA0MjIsXG4gICAgICBtZXNzYWdlOiAnUGxlYXNlIGVudGVyIHlvdXIgZW1haWwnXG4gICAgfSlcbiAgfVxuXG4gIGNvbnN0IGNvbmRpdGlvbnMgPSB7XG4gICAgdGVhbV9pZDogcmVxLmJvZHkudGVhbV9pZCxcbiAgICBlbWFpbDogcmVxLmJvZHkuZW1haWxcbiAgfVxuXG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLndoZXJlKGNvbmRpdGlvbnMpLmZldGNoKHsgd2l0aFJlbGF0ZWQ6IFsncGhvdG8nXSwgdHJhbnNhY3Rpbmc6IHRyeCB9KVxuXG4gIGlmKCF1c2VyKSB7XG4gICAgdGhyb3cgbmV3IEJhY2tmcmFtZUVycm9yKHtcbiAgICAgIGNvZGU6IDQyMixcbiAgICAgIG1lc3NhZ2U6ICdVbmFibGUgdG8gZmluZCB0aGlzIHVzZXInXG4gICAgfSlcbiAgfVxuXG4gIGlmKCF1c2VyLmdldCgnYWN0aXZhdGVkX2F0JykpIHtcbiAgICB0aHJvdyBuZXcgQmFja2ZyYW1lRXJyb3Ioe1xuICAgICAgY29kZTogNDIyLFxuICAgICAgbWVzc2FnZTogJ1lvdXIgYWNjb3VudCBoYXMgbm90IGJlZW4gYWN0aXZhdGVkJ1xuICAgIH0pXG4gIH1cblxuICBpZighdXNlci5nZXQoJ2lzX2FjdGl2ZScpKSB7XG4gICAgdGhyb3cgbmV3IEJhY2tmcmFtZUVycm9yKHtcbiAgICAgIGNvZGU6IDQyMixcbiAgICAgIG1lc3NhZ2U6ICdZb3VyIGFjY291bnQgaGFzIGJlZW4gZGlzYWJsZWQnXG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaWQ6IHVzZXIuZ2V0KCdpZCcpLFxuICAgIGZ1bGxfbmFtZTogdXNlci5nZXQoJ2Z1bGxfbmFtZScpLFxuICAgIGluaXRpYWxzOiB1c2VyLmdldCgnaW5pdGlhbHMnKSxcbiAgICBlbWFpbDogdXNlci5nZXQoJ2VtYWlsJyksXG4gICAgcGhvdG86IHVzZXIucmVsYXRlZCgncGhvdG8nKS5nZXQoJ3BhdGgnKVxuICB9XG5cbn1cblxuY29uc3QgcnVsZXMgPSB7XG4gIHRlYW1faWQ6ICdyZXF1aXJlZCdcbn1cblxuY29uc3QgZW1haWxSb3V0ZSA9IG5ldyBSb3V0ZSh7XG4gIHBhdGg6ICcvZW1haWwnLFxuICBtZXRob2Q6ICdwb3N0JyxcbiAgcHJvY2Vzc29yLFxuICBydWxlc1xufSlcblxuZXhwb3J0IGRlZmF1bHQgZW1haWxSb3V0ZVxuIl19