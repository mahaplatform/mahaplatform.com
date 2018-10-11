'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../server');

var _user_tokens = require('../../../core/utils/user_tokens');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var conditions, user, token;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (req.body.password) {
              _context.next = 2;
              break;
            }

            throw new _server.BackframeError({
              code: 422,
              message: 'Please enter your password'
            });

          case 2:
            conditions = {
              team_id: req.body.team_id,
              email: req.body.email
            };
            _context.next = 5;
            return _server.User.where(conditions).fetch({ transacting: trx });

          case 5:
            user = _context.sent;

            if (user) {
              _context.next = 8;
              break;
            }

            throw new _server.BackframeError({ code: 422, message: 'Unable to find this user' });

          case 8:
            if (user.authenticate(req.body.password)) {
              _context.next = 10;
              break;
            }

            throw new _server.BackframeError({
              code: 422,
              message: 'Invalid password'
            });

          case 10:
            token = (0, _user_tokens.createUserToken)(user, 'user_id');
            return _context.abrupt('return', { token: token });

          case 12:
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
  team_id: 'required',
  email: 'required'
};

var passwordRoute = new _server.Route({
  path: '/password',
  method: 'post',
  processor: processor,
  rules: rules
});

exports.default = passwordRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsImJvZHkiLCJwYXNzd29yZCIsIkJhY2tmcmFtZUVycm9yIiwiY29kZSIsIm1lc3NhZ2UiLCJjb25kaXRpb25zIiwidGVhbV9pZCIsImVtYWlsIiwiVXNlciIsIndoZXJlIiwiZmV0Y2giLCJ0cmFuc2FjdGluZyIsInVzZXIiLCJhdXRoZW50aWNhdGUiLCJ0b2tlbiIsInJ1bGVzIiwicGFzc3dvcmRSb3V0ZSIsIlJvdXRlIiwicGF0aCIsIm1ldGhvZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUVBLElBQU1BO0FBQUEsc0ZBQVksaUJBQU9DLEdBQVAsRUFBWUMsR0FBWixFQUFpQkMsT0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBRVpGLElBQUlHLElBQUosQ0FBU0MsUUFGRztBQUFBO0FBQUE7QUFBQTs7QUFBQSxrQkFHUixJQUFJQyxzQkFBSixDQUFtQjtBQUN2QkMsb0JBQU0sR0FEaUI7QUFFdkJDLHVCQUFTO0FBRmMsYUFBbkIsQ0FIUTs7QUFBQTtBQVNWQyxzQkFUVSxHQVNHO0FBQ2pCQyx1QkFBU1QsSUFBSUcsSUFBSixDQUFTTSxPQUREO0FBRWpCQyxxQkFBT1YsSUFBSUcsSUFBSixDQUFTTztBQUZDLGFBVEg7QUFBQTtBQUFBLG1CQWNHQyxhQUFLQyxLQUFMLENBQVdKLFVBQVgsRUFBdUJLLEtBQXZCLENBQTZCLEVBQUVDLGFBQWFiLEdBQWYsRUFBN0IsQ0FkSDs7QUFBQTtBQWNWYyxnQkFkVTs7QUFBQSxnQkFnQlpBLElBaEJZO0FBQUE7QUFBQTtBQUFBOztBQUFBLGtCQWdCQSxJQUFJVixzQkFBSixDQUFtQixFQUFFQyxNQUFNLEdBQVIsRUFBYUMsU0FBUywwQkFBdEIsRUFBbkIsQ0FoQkE7O0FBQUE7QUFBQSxnQkFrQlpRLEtBQUtDLFlBQUwsQ0FBa0JoQixJQUFJRyxJQUFKLENBQVNDLFFBQTNCLENBbEJZO0FBQUE7QUFBQTtBQUFBOztBQUFBLGtCQW1CUixJQUFJQyxzQkFBSixDQUFtQjtBQUN2QkMsb0JBQU0sR0FEaUI7QUFFdkJDLHVCQUFTO0FBRmMsYUFBbkIsQ0FuQlE7O0FBQUE7QUF5QlZVLGlCQXpCVSxHQXlCRixrQ0FBZ0JGLElBQWhCLEVBQXNCLFNBQXRCLENBekJFO0FBQUEsNkNBMkJULEVBQUVFLFlBQUYsRUEzQlM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztBQStCQSxJQUFNQyxRQUFRO0FBQ1pULFdBQVMsVUFERztBQUVaQyxTQUFPO0FBRkssQ0FBZDs7QUFLQSxJQUFNUyxnQkFBZ0IsSUFBSUMsYUFBSixDQUFVO0FBQzlCQyxRQUFNLFdBRHdCO0FBRTlCQyxVQUFRLE1BRnNCO0FBRzlCdkIsc0JBSDhCO0FBSTlCbUI7QUFKOEIsQ0FBVixDQUF0Qjs7a0JBT2VDLGEiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlLCBCYWNrZnJhbWVFcnJvciwgVXNlciB9IGZyb20gJy4uLy4uLy4uL3NlcnZlcidcbmltcG9ydCB7IGNyZWF0ZVVzZXJUb2tlbiB9IGZyb20gJy4uLy4uLy4uL2NvcmUvdXRpbHMvdXNlcl90b2tlbnMnXG5cbmNvbnN0IHByb2Nlc3NvciA9IGFzeW5jIChyZXEsIHRyeCwgb3B0aW9ucykgPT4ge1xuXG4gIGlmKCFyZXEuYm9keS5wYXNzd29yZCkge1xuICAgIHRocm93IG5ldyBCYWNrZnJhbWVFcnJvcih7XG4gICAgICBjb2RlOiA0MjIsXG4gICAgICBtZXNzYWdlOiAnUGxlYXNlIGVudGVyIHlvdXIgcGFzc3dvcmQnXG4gICAgfSlcbiAgfVxuXG4gIGNvbnN0IGNvbmRpdGlvbnMgPSB7XG4gICAgdGVhbV9pZDogcmVxLmJvZHkudGVhbV9pZCxcbiAgICBlbWFpbDogcmVxLmJvZHkuZW1haWxcbiAgfVxuXG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLndoZXJlKGNvbmRpdGlvbnMpLmZldGNoKHsgdHJhbnNhY3Rpbmc6IHRyeCB9KVxuXG4gIGlmKCF1c2VyKSB0aHJvdyBuZXcgQmFja2ZyYW1lRXJyb3IoeyBjb2RlOiA0MjIsIG1lc3NhZ2U6ICdVbmFibGUgdG8gZmluZCB0aGlzIHVzZXInfSlcblxuICBpZighdXNlci5hdXRoZW50aWNhdGUocmVxLmJvZHkucGFzc3dvcmQpKSB7XG4gICAgdGhyb3cgbmV3IEJhY2tmcmFtZUVycm9yKHtcbiAgICAgIGNvZGU6IDQyMixcbiAgICAgIG1lc3NhZ2U6ICdJbnZhbGlkIHBhc3N3b3JkJ1xuICAgIH0pXG4gIH1cblxuICBjb25zdCB0b2tlbiA9IGNyZWF0ZVVzZXJUb2tlbih1c2VyLCAndXNlcl9pZCcpXG5cbiAgcmV0dXJuIHsgdG9rZW4gfVxuXG59XG5cbmNvbnN0IHJ1bGVzID0ge1xuICB0ZWFtX2lkOiAncmVxdWlyZWQnLFxuICBlbWFpbDogJ3JlcXVpcmVkJ1xufVxuXG5jb25zdCBwYXNzd29yZFJvdXRlID0gbmV3IFJvdXRlKHtcbiAgcGF0aDogJy9wYXNzd29yZCcsXG4gIG1ldGhvZDogJ3Bvc3QnLFxuICBwcm9jZXNzb3IsXG4gIHJ1bGVzXG59KVxuXG5leHBvcnQgZGVmYXVsdCBwYXNzd29yZFJvdXRlXG4iXX0=