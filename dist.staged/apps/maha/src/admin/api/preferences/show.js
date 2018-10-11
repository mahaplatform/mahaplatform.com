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
    var user_id, user_notificaton_types, ignored;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user_id = req.user.get('id');
            _context.next = 3;
            return options.knex('maha_users_notification_types').transacting(trx).where({ user_id: user_id });

          case 3:
            user_notificaton_types = _context.sent;
            ignored = user_notificaton_types.map(function (user_notificaton_type) {
              return user_notificaton_type.notification_type_id;
            });
            return _context.abrupt('return', {
              notification_method_id: req.user.get('notification_method_id'),
              ignored: ignored
            });

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

var preferencesRoute = new _server.Route({
  method: 'get',
  path: '',
  processor: processor
});

exports.default = preferencesRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsInVzZXJfaWQiLCJ1c2VyIiwiZ2V0Iiwia25leCIsInRyYW5zYWN0aW5nIiwid2hlcmUiLCJ1c2VyX25vdGlmaWNhdG9uX3R5cGVzIiwiaWdub3JlZCIsIm1hcCIsInVzZXJfbm90aWZpY2F0b25fdHlwZSIsIm5vdGlmaWNhdGlvbl90eXBlX2lkIiwibm90aWZpY2F0aW9uX21ldGhvZF9pZCIsInByZWZlcmVuY2VzUm91dGUiLCJSb3V0ZSIsIm1ldGhvZCIsInBhdGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQSxJQUFNQTtBQUFBLHNGQUFZLGlCQUFPQyxHQUFQLEVBQVlDLEdBQVosRUFBaUJDLE9BQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVWQyxtQkFGVSxHQUVBSCxJQUFJSSxJQUFKLENBQVNDLEdBQVQsQ0FBYSxJQUFiLENBRkE7QUFBQTtBQUFBLG1CQUlxQkgsUUFBUUksSUFBUixDQUFhLCtCQUFiLEVBQThDQyxXQUE5QyxDQUEwRE4sR0FBMUQsRUFBK0RPLEtBQS9ELENBQXFFLEVBQUVMLGdCQUFGLEVBQXJFLENBSnJCOztBQUFBO0FBSVZNLGtDQUpVO0FBTVZDLG1CQU5VLEdBTUFELHVCQUF1QkUsR0FBdkIsQ0FBMkI7QUFBQSxxQkFBeUJDLHNCQUFzQkMsb0JBQS9DO0FBQUEsYUFBM0IsQ0FOQTtBQUFBLDZDQVFUO0FBQ0xDLHNDQUF3QmQsSUFBSUksSUFBSixDQUFTQyxHQUFULENBQWEsd0JBQWIsQ0FEbkI7QUFFTEs7QUFGSyxhQVJTOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUFlQSxJQUFNSyxtQkFBbUIsSUFBSUMsYUFBSixDQUFVO0FBQ2pDQyxVQUFRLEtBRHlCO0FBRWpDQyxRQUFNLEVBRjJCO0FBR2pDbkI7QUFIaUMsQ0FBVixDQUF6Qjs7a0JBTWVnQixnQiIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGUgfSBmcm9tICcuLi8uLi8uLi9zZXJ2ZXInXG5cbmNvbnN0IHByb2Nlc3NvciA9IGFzeW5jIChyZXEsIHRyeCwgb3B0aW9ucykgPT4ge1xuXG4gIGNvbnN0IHVzZXJfaWQgPSByZXEudXNlci5nZXQoJ2lkJylcblxuICBjb25zdCB1c2VyX25vdGlmaWNhdG9uX3R5cGVzID0gYXdhaXQgb3B0aW9ucy5rbmV4KCdtYWhhX3VzZXJzX25vdGlmaWNhdGlvbl90eXBlcycpLnRyYW5zYWN0aW5nKHRyeCkud2hlcmUoeyB1c2VyX2lkIH0pXG5cbiAgY29uc3QgaWdub3JlZCA9IHVzZXJfbm90aWZpY2F0b25fdHlwZXMubWFwKHVzZXJfbm90aWZpY2F0b25fdHlwZSA9PiB1c2VyX25vdGlmaWNhdG9uX3R5cGUubm90aWZpY2F0aW9uX3R5cGVfaWQpXG5cbiAgcmV0dXJuIHtcbiAgICBub3RpZmljYXRpb25fbWV0aG9kX2lkOiByZXEudXNlci5nZXQoJ25vdGlmaWNhdGlvbl9tZXRob2RfaWQnKSxcbiAgICBpZ25vcmVkXG4gIH1cblxufVxuXG5jb25zdCBwcmVmZXJlbmNlc1JvdXRlID0gbmV3IFJvdXRlKHtcbiAgbWV0aG9kOiAnZ2V0JyxcbiAgcGF0aDogJycsXG4gIHByb2Nlc3NvclxufSlcblxuZXhwb3J0IGRlZmF1bHQgcHJlZmVyZW5jZXNSb3V0ZVxuIl19