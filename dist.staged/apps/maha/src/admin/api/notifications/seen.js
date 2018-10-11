'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../server');

var _notification = require('../../../models/notification');

var _notification2 = _interopRequireDefault(_notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (req.body.ids) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return', {});

          case 2:
            _context.next = 4;
            return _notification2.default.query().whereIn('id', req.body.ids).transacting(trx).update({ is_seen: true });

          case 4:
            return _context.abrupt('return', true);

          case 5:
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

var refresh = function refresh(req, trx, result, options) {
  return [{ channel: '/admin/user', target: '/admin/notifications' }];
};

var seenRoute = new _server.Route({
  path: '/seen',
  method: 'patch',
  processor: processor,
  refresh: refresh
});

exports.default = seenRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsImJvZHkiLCJpZHMiLCJOb3RpZmljYXRpb24iLCJxdWVyeSIsIndoZXJlSW4iLCJ0cmFuc2FjdGluZyIsInVwZGF0ZSIsImlzX3NlZW4iLCJyZWZyZXNoIiwicmVzdWx0IiwiY2hhbm5lbCIsInRhcmdldCIsInNlZW5Sb3V0ZSIsIlJvdXRlIiwicGF0aCIsIm1ldGhvZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7O0FBRUEsSUFBTUE7QUFBQSxzRkFBWSxpQkFBT0MsR0FBUCxFQUFZQyxHQUFaLEVBQWlCQyxPQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBRVpGLElBQUlHLElBQUosQ0FBU0MsR0FGRztBQUFBO0FBQUE7QUFBQTs7QUFBQSw2Q0FFUyxFQUZUOztBQUFBO0FBQUE7QUFBQSxtQkFJVkMsdUJBQWFDLEtBQWIsR0FBcUJDLE9BQXJCLENBQTZCLElBQTdCLEVBQW1DUCxJQUFJRyxJQUFKLENBQVNDLEdBQTVDLEVBQWlESSxXQUFqRCxDQUE2RFAsR0FBN0QsRUFBa0VRLE1BQWxFLENBQXlFLEVBQUVDLFNBQVMsSUFBWCxFQUF6RSxDQUpVOztBQUFBO0FBQUEsNkNBTVQsSUFOUzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFaOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBVUEsSUFBTUMsVUFBVSxTQUFWQSxPQUFVLENBQUNYLEdBQUQsRUFBTUMsR0FBTixFQUFXVyxNQUFYLEVBQW1CVixPQUFuQjtBQUFBLFNBQStCLENBQzdDLEVBQUVXLFNBQVMsYUFBWCxFQUEwQkMsUUFBUSxzQkFBbEMsRUFENkMsQ0FBL0I7QUFBQSxDQUFoQjs7QUFJQSxJQUFNQyxZQUFZLElBQUlDLGFBQUosQ0FBVTtBQUMxQkMsUUFBTSxPQURvQjtBQUUxQkMsVUFBUSxPQUZrQjtBQUcxQm5CLHNCQUgwQjtBQUkxQlk7QUFKMEIsQ0FBVixDQUFsQjs7a0JBT2VJLFMiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmVyJ1xuaW1wb3J0IE5vdGlmaWNhdGlvbiBmcm9tICcuLi8uLi8uLi9tb2RlbHMvbm90aWZpY2F0aW9uJ1xuXG5jb25zdCBwcm9jZXNzb3IgPSBhc3luYyAocmVxLCB0cngsIG9wdGlvbnMpID0+IHtcblxuICBpZighcmVxLmJvZHkuaWRzKSByZXR1cm4ge31cblxuICBhd2FpdCBOb3RpZmljYXRpb24ucXVlcnkoKS53aGVyZUluKCdpZCcsIHJlcS5ib2R5LmlkcykudHJhbnNhY3RpbmcodHJ4KS51cGRhdGUoeyBpc19zZWVuOiB0cnVlIH0pXG5cbiAgcmV0dXJuIHRydWVcblxufVxuXG5jb25zdCByZWZyZXNoID0gKHJlcSwgdHJ4LCByZXN1bHQsIG9wdGlvbnMpID0+IFtcbiAgeyBjaGFubmVsOiAnL2FkbWluL3VzZXInLCB0YXJnZXQ6ICcvYWRtaW4vbm90aWZpY2F0aW9ucycgfVxuXVxuXG5jb25zdCBzZWVuUm91dGUgPSBuZXcgUm91dGUoe1xuICBwYXRoOiAnL3NlZW4nLFxuICBtZXRob2Q6ICdwYXRjaCcsXG4gIHByb2Nlc3NvcixcbiAgcmVmcmVzaFxufSlcblxuZXhwb3J0IGRlZmF1bHQgc2VlblJvdXRlXG4iXX0=