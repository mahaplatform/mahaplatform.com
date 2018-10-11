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
    var answer;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (req.body.answer) {
              _context.next = 2;
              break;
            }

            throw new _server.BackframeError({
              code: 422,
              message: 'Please answer the question'
            });

          case 2:
            answer = req.user.get('security_question_answer');

            if (!(req.body.answer !== answer)) {
              _context.next = 5;
              break;
            }

            throw new _server.BackframeError({
              code: 422,
              message: 'Invalid securty answer'
            });

          case 5:
            return _context.abrupt('return', true);

          case 6:
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
  token: 'required'
};

var securityRoute = new _server.Route({
  path: '/security',
  method: 'post',
  authenticated: false,
  processor: processor,
  rules: rules
});

exports.default = securityRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsImJvZHkiLCJhbnN3ZXIiLCJCYWNrZnJhbWVFcnJvciIsImNvZGUiLCJtZXNzYWdlIiwidXNlciIsImdldCIsInJ1bGVzIiwidG9rZW4iLCJzZWN1cml0eVJvdXRlIiwiUm91dGUiLCJwYXRoIiwibWV0aG9kIiwiYXV0aGVudGljYXRlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBLElBQU1BO0FBQUEsc0ZBQVksaUJBQU9DLEdBQVAsRUFBWUMsR0FBWixFQUFpQkMsT0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBRVpGLElBQUlHLElBQUosQ0FBU0MsTUFGRztBQUFBO0FBQUE7QUFBQTs7QUFBQSxrQkFHUixJQUFJQyxzQkFBSixDQUFtQjtBQUN2QkMsb0JBQU0sR0FEaUI7QUFFdkJDLHVCQUFTO0FBRmMsYUFBbkIsQ0FIUTs7QUFBQTtBQVNWSCxrQkFUVSxHQVNESixJQUFJUSxJQUFKLENBQVNDLEdBQVQsQ0FBYSwwQkFBYixDQVRDOztBQUFBLGtCQVdiVCxJQUFJRyxJQUFKLENBQVNDLE1BQVQsS0FBb0JBLE1BWFA7QUFBQTtBQUFBO0FBQUE7O0FBQUEsa0JBWVIsSUFBSUMsc0JBQUosQ0FBbUI7QUFDdkJDLG9CQUFNLEdBRGlCO0FBRXZCQyx1QkFBUztBQUZjLGFBQW5CLENBWlE7O0FBQUE7QUFBQSw2Q0FrQlQsSUFsQlM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztBQXNCQSxJQUFNRyxRQUFRO0FBQ1pDLFNBQU87QUFESyxDQUFkOztBQUlBLElBQU1DLGdCQUFnQixJQUFJQyxhQUFKLENBQVU7QUFDOUJDLFFBQU0sV0FEd0I7QUFFOUJDLFVBQVEsTUFGc0I7QUFHOUJDLGlCQUFlLEtBSGU7QUFJOUJqQixzQkFKOEI7QUFLOUJXO0FBTDhCLENBQVYsQ0FBdEI7O2tCQVFlRSxhIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZSwgQmFja2ZyYW1lRXJyb3IgfSBmcm9tICcuLi8uLi8uLi9zZXJ2ZXInXG5cbmNvbnN0IHByb2Nlc3NvciA9IGFzeW5jIChyZXEsIHRyeCwgb3B0aW9ucykgPT4ge1xuXG4gIGlmKCFyZXEuYm9keS5hbnN3ZXIpIHtcbiAgICB0aHJvdyBuZXcgQmFja2ZyYW1lRXJyb3Ioe1xuICAgICAgY29kZTogNDIyLFxuICAgICAgbWVzc2FnZTogJ1BsZWFzZSBhbnN3ZXIgdGhlIHF1ZXN0aW9uJ1xuICAgIH0pXG4gIH1cblxuICBjb25zdCBhbnN3ZXIgPSByZXEudXNlci5nZXQoJ3NlY3VyaXR5X3F1ZXN0aW9uX2Fuc3dlcicpXG5cbiAgaWYocmVxLmJvZHkuYW5zd2VyICE9PSBhbnN3ZXIpIHtcbiAgICB0aHJvdyBuZXcgQmFja2ZyYW1lRXJyb3Ioe1xuICAgICAgY29kZTogNDIyLFxuICAgICAgbWVzc2FnZTogJ0ludmFsaWQgc2VjdXJ0eSBhbnN3ZXInXG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiB0cnVlXG5cbn1cblxuY29uc3QgcnVsZXMgPSB7XG4gIHRva2VuOiAncmVxdWlyZWQnXG59XG5cbmNvbnN0IHNlY3VyaXR5Um91dGUgPSBuZXcgUm91dGUoe1xuICBwYXRoOiAnL3NlY3VyaXR5JyxcbiAgbWV0aG9kOiAncG9zdCcsXG4gIGF1dGhlbnRpY2F0ZWQ6IGZhbHNlLFxuICBwcm9jZXNzb3IsXG4gIHJ1bGVzXG59KVxuXG5leHBvcnQgZGVmYXVsdCBzZWN1cml0eVJvdXRlXG4iXX0=