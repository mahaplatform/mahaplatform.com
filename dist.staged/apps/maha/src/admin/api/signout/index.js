'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _session = require('../../../models/session');

var _session2 = _interopRequireDefault(_session);

var _server = require('../../../server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx) {
    var user_id, device_id, session, team_id;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user_id = req.user.get('id');
            device_id = req.device.get('id');
            _context.next = 4;
            return _session2.default.where({ device_id: device_id, user_id: user_id }).fetch({ transacting: trx });

          case 4:
            session = _context.sent;


            session.destroy({ transacting: trx });

            team_id = req.team.get('id');
            return _context.abrupt('return', { team_id: team_id });

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function processor(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var signoutRoute = new _server.Route({
  method: 'delete',
  path: '/session',
  processor: processor
});

exports.default = signoutRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4IiwidXNlcl9pZCIsInVzZXIiLCJnZXQiLCJkZXZpY2VfaWQiLCJkZXZpY2UiLCJTZXNzaW9uIiwid2hlcmUiLCJmZXRjaCIsInRyYW5zYWN0aW5nIiwic2Vzc2lvbiIsImRlc3Ryb3kiLCJ0ZWFtX2lkIiwidGVhbSIsInNpZ25vdXRSb3V0ZSIsIlJvdXRlIiwibWV0aG9kIiwicGF0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUEsSUFBTUE7QUFBQSxzRkFBWSxpQkFBT0MsR0FBUCxFQUFZQyxHQUFaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVWQyxtQkFGVSxHQUVBRixJQUFJRyxJQUFKLENBQVNDLEdBQVQsQ0FBYSxJQUFiLENBRkE7QUFJVkMscUJBSlUsR0FJRUwsSUFBSU0sTUFBSixDQUFXRixHQUFYLENBQWUsSUFBZixDQUpGO0FBQUE7QUFBQSxtQkFNTUcsa0JBQVFDLEtBQVIsQ0FBYyxFQUFFSCxvQkFBRixFQUFhSCxnQkFBYixFQUFkLEVBQXNDTyxLQUF0QyxDQUE0QyxFQUFFQyxhQUFhVCxHQUFmLEVBQTVDLENBTk47O0FBQUE7QUFNVlUsbUJBTlU7OztBQVFoQkEsb0JBQVFDLE9BQVIsQ0FBZ0IsRUFBRUYsYUFBYVQsR0FBZixFQUFoQjs7QUFFTVksbUJBVlUsR0FVQWIsSUFBSWMsSUFBSixDQUFTVixHQUFULENBQWEsSUFBYixDQVZBO0FBQUEsNkNBWVQsRUFBRVMsZ0JBQUYsRUFaUzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFaOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBZ0JBLElBQU1FLGVBQWUsSUFBSUMsYUFBSixDQUFVO0FBQzdCQyxVQUFRLFFBRHFCO0FBRTdCQyxRQUFNLFVBRnVCO0FBRzdCbkI7QUFINkIsQ0FBVixDQUFyQjs7a0JBTWVnQixZIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2Vzc2lvbiBmcm9tICcuLi8uLi8uLi9tb2RlbHMvc2Vzc2lvbidcbmltcG9ydCB7IFJvdXRlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmVyJ1xuXG5jb25zdCBwcm9jZXNzb3IgPSBhc3luYyAocmVxLCB0cngpID0+IHtcbiAgXG4gIGNvbnN0IHVzZXJfaWQgPSByZXEudXNlci5nZXQoJ2lkJylcblxuICBjb25zdCBkZXZpY2VfaWQgPSByZXEuZGV2aWNlLmdldCgnaWQnKVxuICBcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IFNlc3Npb24ud2hlcmUoeyBkZXZpY2VfaWQsIHVzZXJfaWQgfSkuZmV0Y2goeyB0cmFuc2FjdGluZzogdHJ4IH0pXG4gIFxuICBzZXNzaW9uLmRlc3Ryb3koeyB0cmFuc2FjdGluZzogdHJ4IH0pXG4gIFxuICBjb25zdCB0ZWFtX2lkID0gcmVxLnRlYW0uZ2V0KCdpZCcpXG4gIFxuICByZXR1cm4geyB0ZWFtX2lkIH1cbiAgXG59XG5cbmNvbnN0IHNpZ25vdXRSb3V0ZSA9IG5ldyBSb3V0ZSh7XG4gIG1ldGhvZDogJ2RlbGV0ZScsXG4gIHBhdGg6ICcvc2Vzc2lvbicsXG4gIHByb2Nlc3NvclxufSlcblxuZXhwb3J0IGRlZmF1bHQgc2lnbm91dFJvdXRlXG4iXX0=