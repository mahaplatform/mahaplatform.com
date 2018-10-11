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
    var select, result, count;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            select = options.knex.raw('count(maha_notifications.*) as unread');
            _context.next = 3;
            return options.knex('maha_notifications').transacting(trx).select(select).where({
              team_id: req.team.get('id'),
              user_id: req.user.get('id'),
              is_seen: false
            });

          case 3:
            result = _context.sent;
            count = parseInt(result[0].unread);
            return _context.abrupt('return', { count: count });

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

var unreadRoute = new _server.Route({
  path: '/unread',
  method: 'get',
  processor: processor
});

exports.default = unreadRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsInNlbGVjdCIsImtuZXgiLCJyYXciLCJ0cmFuc2FjdGluZyIsIndoZXJlIiwidGVhbV9pZCIsInRlYW0iLCJnZXQiLCJ1c2VyX2lkIiwidXNlciIsImlzX3NlZW4iLCJyZXN1bHQiLCJjb3VudCIsInBhcnNlSW50IiwidW5yZWFkIiwidW5yZWFkUm91dGUiLCJSb3V0ZSIsInBhdGgiLCJtZXRob2QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQSxJQUFNQTtBQUFBLHNGQUFZLGlCQUFPQyxHQUFQLEVBQVlDLEdBQVosRUFBaUJDLE9BQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVWQyxrQkFGVSxHQUVERCxRQUFRRSxJQUFSLENBQWFDLEdBQWIsQ0FBaUIsdUNBQWpCLENBRkM7QUFBQTtBQUFBLG1CQUlLSCxRQUFRRSxJQUFSLENBQWEsb0JBQWIsRUFBbUNFLFdBQW5DLENBQStDTCxHQUEvQyxFQUFvREUsTUFBcEQsQ0FBMkRBLE1BQTNELEVBQW1FSSxLQUFuRSxDQUF5RTtBQUM1RkMsdUJBQVNSLElBQUlTLElBQUosQ0FBU0MsR0FBVCxDQUFhLElBQWIsQ0FEbUY7QUFFNUZDLHVCQUFTWCxJQUFJWSxJQUFKLENBQVNGLEdBQVQsQ0FBYSxJQUFiLENBRm1GO0FBRzVGRyx1QkFBUztBQUhtRixhQUF6RSxDQUpMOztBQUFBO0FBSVZDLGtCQUpVO0FBVVZDLGlCQVZVLEdBVUZDLFNBQVNGLE9BQU8sQ0FBUCxFQUFVRyxNQUFuQixDQVZFO0FBQUEsNkNBWVQsRUFBRUYsWUFBRixFQVpTOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUFnQkEsSUFBTUcsY0FBYyxJQUFJQyxhQUFKLENBQVU7QUFDNUJDLFFBQU0sU0FEc0I7QUFFNUJDLFVBQVEsS0FGb0I7QUFHNUJ0QjtBQUg0QixDQUFWLENBQXBCOztrQkFNZW1CLFciLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmVyJ1xuXG5jb25zdCBwcm9jZXNzb3IgPSBhc3luYyAocmVxLCB0cngsIG9wdGlvbnMpID0+IHtcblxuICBjb25zdCBzZWxlY3QgPSBvcHRpb25zLmtuZXgucmF3KCdjb3VudChtYWhhX25vdGlmaWNhdGlvbnMuKikgYXMgdW5yZWFkJylcblxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBvcHRpb25zLmtuZXgoJ21haGFfbm90aWZpY2F0aW9ucycpLnRyYW5zYWN0aW5nKHRyeCkuc2VsZWN0KHNlbGVjdCkud2hlcmUoe1xuICAgIHRlYW1faWQ6IHJlcS50ZWFtLmdldCgnaWQnKSxcbiAgICB1c2VyX2lkOiByZXEudXNlci5nZXQoJ2lkJyksXG4gICAgaXNfc2VlbjogZmFsc2VcbiAgfSlcblxuICBjb25zdCBjb3VudCA9IHBhcnNlSW50KHJlc3VsdFswXS51bnJlYWQpXG5cbiAgcmV0dXJuIHsgY291bnQgfVxuXG59XG5cbmNvbnN0IHVucmVhZFJvdXRlID0gbmV3IFJvdXRlKHtcbiAgcGF0aDogJy91bnJlYWQnLFxuICBtZXRob2Q6ICdnZXQnLFxuICBwcm9jZXNzb3Jcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IHVucmVhZFJvdXRlXG4iXX0=