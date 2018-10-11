'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../server');

var _search = require('../../../models/search');

var _search2 = _interopRequireDefault(_search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var user_id;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user_id = req.user.get('id');
            _context.next = 3;
            return _search2.default.where({ user_id: user_id }).destroy({ transacting: trx });

          case 3:
            return _context.abrupt('return', true);

          case 4:
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

var clearRoute = new _server.Route({
  path: '/clear',
  method: 'patch',
  processor: processor
});

exports.default = clearRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsInVzZXJfaWQiLCJ1c2VyIiwiZ2V0IiwiU2VhcmNoIiwid2hlcmUiLCJkZXN0cm95IiwidHJhbnNhY3RpbmciLCJjbGVhclJvdXRlIiwiUm91dGUiLCJwYXRoIiwibWV0aG9kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQTtBQUFBLHNGQUFZLGlCQUFPQyxHQUFQLEVBQVlDLEdBQVosRUFBaUJDLE9BQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVWQyxtQkFGVSxHQUVBSCxJQUFJSSxJQUFKLENBQVNDLEdBQVQsQ0FBYSxJQUFiLENBRkE7QUFBQTtBQUFBLG1CQUlWQyxpQkFBT0MsS0FBUCxDQUFhLEVBQUVKLGdCQUFGLEVBQWIsRUFBMEJLLE9BQTFCLENBQWtDLEVBQUVDLGFBQWFSLEdBQWYsRUFBbEMsQ0FKVTs7QUFBQTtBQUFBLDZDQU1ULElBTlM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztBQVVBLElBQU1TLGFBQWEsSUFBSUMsYUFBSixDQUFVO0FBQzNCQyxRQUFNLFFBRHFCO0FBRTNCQyxVQUFRLE9BRm1CO0FBRzNCZDtBQUgyQixDQUFWLENBQW5COztrQkFNZVcsVSIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGUgfSBmcm9tICcuLi8uLi8uLi9zZXJ2ZXInXG5pbXBvcnQgU2VhcmNoIGZyb20gJy4uLy4uLy4uL21vZGVscy9zZWFyY2gnXG5cbmNvbnN0IHByb2Nlc3NvciA9IGFzeW5jIChyZXEsIHRyeCwgb3B0aW9ucykgPT4ge1xuXG4gIGNvbnN0IHVzZXJfaWQgPSByZXEudXNlci5nZXQoJ2lkJylcblxuICBhd2FpdCBTZWFyY2gud2hlcmUoeyB1c2VyX2lkIH0pLmRlc3Ryb3koeyB0cmFuc2FjdGluZzogdHJ4IH0pXG5cbiAgcmV0dXJuIHRydWVcblxufVxuXG5jb25zdCBjbGVhclJvdXRlID0gbmV3IFJvdXRlKHtcbiAgcGF0aDogJy9jbGVhcicsXG4gIG1ldGhvZDogJ3BhdGNoJyxcbiAgcHJvY2Vzc29yXG59KVxuXG5leHBvcnQgZGVmYXVsdCBjbGVhclJvdXRlXG4iXX0=