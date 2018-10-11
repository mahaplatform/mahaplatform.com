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
    var data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            data = { photo_id: req.body.photo_id };
            _context.next = 4;
            return req.user.save(data, { patch: true, transacting: trx });

          case 4:
            _context.next = 6;
            return req.user.load(['photo'], { transacting: trx });

          case 6:
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context['catch'](0);
            throw new _server.BackframeError({
              code: 422,
              message: 'Unable to save avatar'
            });

          case 11:
            return _context.abrupt('return', {
              id: req.user.related('photo').get('id'),
              photo: req.user.related('photo').get('path')
            });

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 8]]);
  }));

  return function processor(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var rules = {
  token: 'required',
  photo_id: 'required'
};

var passwordRoute = new _server.Route({
  path: '/avatar',
  method: 'post',
  authenticated: false,
  processor: processor,
  rules: rules
});

exports.default = passwordRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsImRhdGEiLCJwaG90b19pZCIsImJvZHkiLCJ1c2VyIiwic2F2ZSIsInBhdGNoIiwidHJhbnNhY3RpbmciLCJsb2FkIiwiQmFja2ZyYW1lRXJyb3IiLCJjb2RlIiwibWVzc2FnZSIsImlkIiwicmVsYXRlZCIsImdldCIsInBob3RvIiwicnVsZXMiLCJ0b2tlbiIsInBhc3N3b3JkUm91dGUiLCJSb3V0ZSIsInBhdGgiLCJtZXRob2QiLCJhdXRoZW50aWNhdGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBRUEsSUFBTUE7QUFBQSxzRkFBWSxpQkFBT0MsR0FBUCxFQUFZQyxHQUFaLEVBQWlCQyxPQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlSQyxnQkFKUSxHQUlELEVBQUVDLFVBQVVKLElBQUlLLElBQUosQ0FBU0QsUUFBckIsRUFKQztBQUFBO0FBQUEsbUJBTVJKLElBQUlNLElBQUosQ0FBU0MsSUFBVCxDQUFjSixJQUFkLEVBQW9CLEVBQUVLLE9BQU8sSUFBVCxFQUFlQyxhQUFhUixHQUE1QixFQUFwQixDQU5ROztBQUFBO0FBQUE7QUFBQSxtQkFRUkQsSUFBSU0sSUFBSixDQUFTSSxJQUFULENBQWMsQ0FBQyxPQUFELENBQWQsRUFBeUIsRUFBRUQsYUFBYVIsR0FBZixFQUF6QixDQVJROztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFZUixJQUFJVSxzQkFBSixDQUFtQjtBQUN2QkMsb0JBQU0sR0FEaUI7QUFFdkJDLHVCQUFTO0FBRmMsYUFBbkIsQ0FaUTs7QUFBQTtBQUFBLDZDQW1CVDtBQUNMQyxrQkFBSWQsSUFBSU0sSUFBSixDQUFTUyxPQUFULENBQWlCLE9BQWpCLEVBQTBCQyxHQUExQixDQUE4QixJQUE5QixDQURDO0FBRUxDLHFCQUFPakIsSUFBSU0sSUFBSixDQUFTUyxPQUFULENBQWlCLE9BQWpCLEVBQTBCQyxHQUExQixDQUE4QixNQUE5QjtBQUZGLGFBbkJTOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUEwQkEsSUFBTUUsUUFBUTtBQUNaQyxTQUFPLFVBREs7QUFFWmYsWUFBVTtBQUZFLENBQWQ7O0FBS0EsSUFBTWdCLGdCQUFnQixJQUFJQyxhQUFKLENBQVU7QUFDOUJDLFFBQU0sU0FEd0I7QUFFOUJDLFVBQVEsTUFGc0I7QUFHOUJDLGlCQUFlLEtBSGU7QUFJOUJ6QixzQkFKOEI7QUFLOUJtQjtBQUw4QixDQUFWLENBQXRCOztrQkFRZUUsYSIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGUsIEJhY2tmcmFtZUVycm9yIH0gZnJvbSAnLi4vLi4vLi4vc2VydmVyJ1xuXG5jb25zdCBwcm9jZXNzb3IgPSBhc3luYyAocmVxLCB0cngsIG9wdGlvbnMpID0+IHtcblxuICB0cnkge1xuXG4gICAgY29uc3QgZGF0YSA9IHsgcGhvdG9faWQ6IHJlcS5ib2R5LnBob3RvX2lkIH1cblxuICAgIGF3YWl0IHJlcS51c2VyLnNhdmUoZGF0YSwgeyBwYXRjaDogdHJ1ZSwgdHJhbnNhY3Rpbmc6IHRyeCB9KVxuXG4gICAgYXdhaXQgcmVxLnVzZXIubG9hZChbJ3Bob3RvJ10sIHsgdHJhbnNhY3Rpbmc6IHRyeCB9KVxuXG4gIH0gY2F0Y2goZXJyKSB7XG5cbiAgICB0aHJvdyBuZXcgQmFja2ZyYW1lRXJyb3Ioe1xuICAgICAgY29kZTogNDIyLFxuICAgICAgbWVzc2FnZTogJ1VuYWJsZSB0byBzYXZlIGF2YXRhcidcbiAgICB9KVxuXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGlkOiByZXEudXNlci5yZWxhdGVkKCdwaG90bycpLmdldCgnaWQnKSxcbiAgICBwaG90bzogcmVxLnVzZXIucmVsYXRlZCgncGhvdG8nKS5nZXQoJ3BhdGgnKVxuICB9XG5cbn1cblxuY29uc3QgcnVsZXMgPSB7XG4gIHRva2VuOiAncmVxdWlyZWQnLFxuICBwaG90b19pZDogJ3JlcXVpcmVkJ1xufVxuXG5jb25zdCBwYXNzd29yZFJvdXRlID0gbmV3IFJvdXRlKHtcbiAgcGF0aDogJy9hdmF0YXInLFxuICBtZXRob2Q6ICdwb3N0JyxcbiAgYXV0aGVudGljYXRlZDogZmFsc2UsXG4gIHByb2Nlc3NvcixcbiAgcnVsZXNcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IHBhc3N3b3JkUm91dGVcbiJdfQ==