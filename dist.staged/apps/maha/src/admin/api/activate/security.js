'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _user_tokens = require('../../../core/utils/user_tokens');

var _server = require('../../../server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var _ref2, user, data;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _user_tokens.loadUserFromToken)('activation_id', req.body.token, trx);

          case 2:
            _ref2 = _context.sent;
            user = _ref2.user;
            data = {
              security_question_id: req.body.security_question_id,
              security_question_answer: req.body.security_question_answer
            };
            _context.next = 7;
            return user.save(data, { patch: true, transacting: trx });

          case 7:
            return _context.abrupt('return', true);

          case 8:
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
  token: 'required',
  security_question_id: 'required',
  security_question_answer: 'required'
};

var securityRoute = new _server.Route({
  path: '/security',
  method: 'post',
  authenticated: false,
  processor: processor,
  rules: rules
});

exports.default = securityRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsImJvZHkiLCJ0b2tlbiIsInVzZXIiLCJkYXRhIiwic2VjdXJpdHlfcXVlc3Rpb25faWQiLCJzZWN1cml0eV9xdWVzdGlvbl9hbnN3ZXIiLCJzYXZlIiwicGF0Y2giLCJ0cmFuc2FjdGluZyIsInJ1bGVzIiwic2VjdXJpdHlSb3V0ZSIsIlJvdXRlIiwicGF0aCIsIm1ldGhvZCIsImF1dGhlbnRpY2F0ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFFQSxJQUFNQTtBQUFBLHNGQUFZLGlCQUFPQyxHQUFQLEVBQVlDLEdBQVosRUFBaUJDLE9BQWpCO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUVPLG9DQUFrQixlQUFsQixFQUFtQ0YsSUFBSUcsSUFBSixDQUFTQyxLQUE1QyxFQUFtREgsR0FBbkQsQ0FGUDs7QUFBQTtBQUFBO0FBRVJJLGdCQUZRLFNBRVJBLElBRlE7QUFJVkMsZ0JBSlUsR0FJSDtBQUNYQyxvQ0FBc0JQLElBQUlHLElBQUosQ0FBU0ksb0JBRHBCO0FBRVhDLHdDQUEwQlIsSUFBSUcsSUFBSixDQUFTSztBQUZ4QixhQUpHO0FBQUE7QUFBQSxtQkFTVkgsS0FBS0ksSUFBTCxDQUFVSCxJQUFWLEVBQWdCLEVBQUVJLE9BQU8sSUFBVCxFQUFlQyxhQUFhVixHQUE1QixFQUFoQixDQVRVOztBQUFBO0FBQUEsNkNBV1QsSUFYUzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFaOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBZUEsSUFBTVcsUUFBUTtBQUNaUixTQUFPLFVBREs7QUFFWkcsd0JBQXNCLFVBRlY7QUFHWkMsNEJBQTBCO0FBSGQsQ0FBZDs7QUFNQSxJQUFNSyxnQkFBZ0IsSUFBSUMsYUFBSixDQUFVO0FBQzlCQyxRQUFNLFdBRHdCO0FBRTlCQyxVQUFRLE1BRnNCO0FBRzlCQyxpQkFBZSxLQUhlO0FBSTlCbEIsc0JBSjhCO0FBSzlCYTtBQUw4QixDQUFWLENBQXRCOztrQkFRZUMsYSIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbG9hZFVzZXJGcm9tVG9rZW4gfSBmcm9tICcuLi8uLi8uLi9jb3JlL3V0aWxzL3VzZXJfdG9rZW5zJ1xuaW1wb3J0IHsgUm91dGUsIEJhY2tmcmFtZUVycm9yIH0gZnJvbSAnLi4vLi4vLi4vc2VydmVyJ1xuXG5jb25zdCBwcm9jZXNzb3IgPSBhc3luYyAocmVxLCB0cngsIG9wdGlvbnMpID0+IHtcblxuICBjb25zdCB7IHVzZXIgfSA9IGF3YWl0IGxvYWRVc2VyRnJvbVRva2VuKCdhY3RpdmF0aW9uX2lkJywgcmVxLmJvZHkudG9rZW4sIHRyeClcblxuICBjb25zdCBkYXRhID0ge1xuICAgIHNlY3VyaXR5X3F1ZXN0aW9uX2lkOiByZXEuYm9keS5zZWN1cml0eV9xdWVzdGlvbl9pZCxcbiAgICBzZWN1cml0eV9xdWVzdGlvbl9hbnN3ZXI6IHJlcS5ib2R5LnNlY3VyaXR5X3F1ZXN0aW9uX2Fuc3dlclxuICB9XG5cbiAgYXdhaXQgdXNlci5zYXZlKGRhdGEsIHsgcGF0Y2g6IHRydWUsIHRyYW5zYWN0aW5nOiB0cnggfSlcblxuICByZXR1cm4gdHJ1ZVxuXG59XG5cbmNvbnN0IHJ1bGVzID0ge1xuICB0b2tlbjogJ3JlcXVpcmVkJyxcbiAgc2VjdXJpdHlfcXVlc3Rpb25faWQ6ICdyZXF1aXJlZCcsXG4gIHNlY3VyaXR5X3F1ZXN0aW9uX2Fuc3dlcjogJ3JlcXVpcmVkJ1xufVxuXG5jb25zdCBzZWN1cml0eVJvdXRlID0gbmV3IFJvdXRlKHtcbiAgcGF0aDogJy9zZWN1cml0eScsXG4gIG1ldGhvZDogJ3Bvc3QnLFxuICBhdXRoZW50aWNhdGVkOiBmYWxzZSxcbiAgcHJvY2Vzc29yLFxuICBydWxlc1xufSlcblxuZXhwb3J0IGRlZmF1bHQgc2VjdXJpdHlSb3V0ZVxuIl19