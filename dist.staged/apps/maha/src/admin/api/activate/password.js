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
            if (!(!req.body.password || !req.body.confirmation)) {
              _context.next = 2;
              break;
            }

            throw new _server.BackframeError({
              code: 422,
              message: 'Please enter and confirm your password'
            });

          case 2:
            if (!(req.body.password !== req.body.confirmation)) {
              _context.next = 4;
              break;
            }

            throw new _server.BackframeError({
              code: 422,
              message: 'Password do not match'
            });

          case 4:
            _context.next = 6;
            return (0, _user_tokens.loadUserFromToken)('activation_id', req.body.token, trx);

          case 6:
            _ref2 = _context.sent;
            user = _ref2.user;
            _context.prev = 8;
            data = { password: req.body.password };
            _context.next = 12;
            return user.save(data, { patch: true, transacting: trx });

          case 12:
            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context['catch'](8);
            throw new _server.BackframeError({ code: 422, message: 'Unable to update password' });

          case 17:
            return _context.abrupt('return', {
              photo_id: user.get('photo_id')
            });

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[8, 14]]);
  }));

  return function processor(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var rules = {
  token: 'required'
};

var passwordRoute = new _server.Route({
  path: '/password',
  method: 'post',
  authenticated: false,
  processor: processor,
  rules: rules
});

exports.default = passwordRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsImJvZHkiLCJwYXNzd29yZCIsImNvbmZpcm1hdGlvbiIsIkJhY2tmcmFtZUVycm9yIiwiY29kZSIsIm1lc3NhZ2UiLCJ0b2tlbiIsInVzZXIiLCJkYXRhIiwic2F2ZSIsInBhdGNoIiwidHJhbnNhY3RpbmciLCJwaG90b19pZCIsImdldCIsInJ1bGVzIiwicGFzc3dvcmRSb3V0ZSIsIlJvdXRlIiwicGF0aCIsIm1ldGhvZCIsImF1dGhlbnRpY2F0ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFFQSxJQUFNQTtBQUFBLHNGQUFZLGlCQUFPQyxHQUFQLEVBQVlDLEdBQVosRUFBaUJDLE9BQWpCO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFFYixDQUFDRixJQUFJRyxJQUFKLENBQVNDLFFBQVYsSUFBc0IsQ0FBQ0osSUFBSUcsSUFBSixDQUFTRSxZQUZuQjtBQUFBO0FBQUE7QUFBQTs7QUFBQSxrQkFHUixJQUFJQyxzQkFBSixDQUFtQjtBQUN2QkMsb0JBQU0sR0FEaUI7QUFFdkJDLHVCQUFTO0FBRmMsYUFBbkIsQ0FIUTs7QUFBQTtBQUFBLGtCQVNiUixJQUFJRyxJQUFKLENBQVNDLFFBQVQsS0FBc0JKLElBQUlHLElBQUosQ0FBU0UsWUFUbEI7QUFBQTtBQUFBO0FBQUE7O0FBQUEsa0JBVVIsSUFBSUMsc0JBQUosQ0FBbUI7QUFDdkJDLG9CQUFNLEdBRGlCO0FBRXZCQyx1QkFBUztBQUZjLGFBQW5CLENBVlE7O0FBQUE7QUFBQTtBQUFBLG1CQWdCTyxvQ0FBa0IsZUFBbEIsRUFBbUNSLElBQUlHLElBQUosQ0FBU00sS0FBNUMsRUFBbURSLEdBQW5ELENBaEJQOztBQUFBO0FBQUE7QUFnQlJTLGdCQWhCUSxTQWdCUkEsSUFoQlE7QUFBQTtBQW9CUkMsZ0JBcEJRLEdBb0JELEVBQUVQLFVBQVVKLElBQUlHLElBQUosQ0FBU0MsUUFBckIsRUFwQkM7QUFBQTtBQUFBLG1CQXNCUk0sS0FBS0UsSUFBTCxDQUFVRCxJQUFWLEVBQWdCLEVBQUVFLE9BQU8sSUFBVCxFQUFlQyxhQUFhYixHQUE1QixFQUFoQixDQXRCUTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBMEJSLElBQUlLLHNCQUFKLENBQW1CLEVBQUVDLE1BQU0sR0FBUixFQUFhQyxTQUFTLDJCQUF0QixFQUFuQixDQTFCUTs7QUFBQTtBQUFBLDZDQThCVDtBQUNMTyx3QkFBVUwsS0FBS00sR0FBTCxDQUFTLFVBQVQ7QUFETCxhQTlCUzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFaOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBb0NBLElBQU1DLFFBQVE7QUFDWlIsU0FBTztBQURLLENBQWQ7O0FBSUEsSUFBTVMsZ0JBQWdCLElBQUlDLGFBQUosQ0FBVTtBQUM5QkMsUUFBTSxXQUR3QjtBQUU5QkMsVUFBUSxNQUZzQjtBQUc5QkMsaUJBQWUsS0FIZTtBQUk5QnZCLHNCQUo4QjtBQUs5QmtCO0FBTDhCLENBQVYsQ0FBdEI7O2tCQVFlQyxhIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBsb2FkVXNlckZyb21Ub2tlbiB9IGZyb20gJy4uLy4uLy4uL2NvcmUvdXRpbHMvdXNlcl90b2tlbnMnXG5pbXBvcnQgeyBSb3V0ZSwgQmFja2ZyYW1lRXJyb3IgfSBmcm9tICcuLi8uLi8uLi9zZXJ2ZXInXG5cbmNvbnN0IHByb2Nlc3NvciA9IGFzeW5jIChyZXEsIHRyeCwgb3B0aW9ucykgPT4ge1xuXG4gIGlmKCFyZXEuYm9keS5wYXNzd29yZCB8fCAhcmVxLmJvZHkuY29uZmlybWF0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEJhY2tmcmFtZUVycm9yKHtcbiAgICAgIGNvZGU6IDQyMixcbiAgICAgIG1lc3NhZ2U6ICdQbGVhc2UgZW50ZXIgYW5kIGNvbmZpcm0geW91ciBwYXNzd29yZCdcbiAgICB9KVxuICB9XG5cbiAgaWYocmVxLmJvZHkucGFzc3dvcmQgIT09IHJlcS5ib2R5LmNvbmZpcm1hdGlvbikge1xuICAgIHRocm93IG5ldyBCYWNrZnJhbWVFcnJvcih7XG4gICAgICBjb2RlOiA0MjIsXG4gICAgICBtZXNzYWdlOiAnUGFzc3dvcmQgZG8gbm90IG1hdGNoJ1xuICAgIH0pXG4gIH1cblxuICBjb25zdCB7IHVzZXIgfSA9IGF3YWl0IGxvYWRVc2VyRnJvbVRva2VuKCdhY3RpdmF0aW9uX2lkJywgcmVxLmJvZHkudG9rZW4sIHRyeClcblxuICB0cnkge1xuXG4gICAgY29uc3QgZGF0YSA9IHsgcGFzc3dvcmQ6IHJlcS5ib2R5LnBhc3N3b3JkIH1cblxuICAgIGF3YWl0IHVzZXIuc2F2ZShkYXRhLCB7IHBhdGNoOiB0cnVlLCB0cmFuc2FjdGluZzogdHJ4IH0pXG5cbiAgfSBjYXRjaChlcnIpIHtcblxuICAgIHRocm93IG5ldyBCYWNrZnJhbWVFcnJvcih7IGNvZGU6IDQyMiwgbWVzc2FnZTogJ1VuYWJsZSB0byB1cGRhdGUgcGFzc3dvcmQnIH0pXG5cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcGhvdG9faWQ6IHVzZXIuZ2V0KCdwaG90b19pZCcpXG4gIH1cblxufVxuXG5jb25zdCBydWxlcyA9IHtcbiAgdG9rZW46ICdyZXF1aXJlZCdcbn1cblxuY29uc3QgcGFzc3dvcmRSb3V0ZSA9IG5ldyBSb3V0ZSh7XG4gIHBhdGg6ICcvcGFzc3dvcmQnLFxuICBtZXRob2Q6ICdwb3N0JyxcbiAgYXV0aGVudGljYXRlZDogZmFsc2UsXG4gIHByb2Nlc3NvcixcbiAgcnVsZXNcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IHBhc3N3b3JkUm91dGVcbiJdfQ==