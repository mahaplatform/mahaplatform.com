'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../server');

var _asset = require('../../../services/asset');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _asset.processAsset)(req.params.id);

          case 2:
            return _context.abrupt('return', _context.sent);

          case 3:
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

var processRoute = new _server.Route({
  path: '/assets/:id/process',
  method: 'get',
  processor: processor
});

exports.default = processRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsInBhcmFtcyIsImlkIiwicHJvY2Vzc1JvdXRlIiwiUm91dGUiLCJwYXRoIiwibWV0aG9kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBRUEsSUFBTUE7QUFBQSxzRkFBWSxpQkFBT0MsR0FBUCxFQUFZQyxHQUFaLEVBQWlCQyxPQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFFSCx5QkFBYUYsSUFBSUcsTUFBSixDQUFXQyxFQUF4QixDQUZHOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztBQU1BLElBQU1DLGVBQWUsSUFBSUMsYUFBSixDQUFVO0FBQzdCQyxRQUFNLHFCQUR1QjtBQUU3QkMsVUFBUSxLQUZxQjtBQUc3QlQ7QUFINkIsQ0FBVixDQUFyQjs7a0JBTWVNLFkiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmVyJ1xuaW1wb3J0IHsgcHJvY2Vzc0Fzc2V0IH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvYXNzZXQnXG5cbmNvbnN0IHByb2Nlc3NvciA9IGFzeW5jIChyZXEsIHRyeCwgb3B0aW9ucykgPT4ge1xuXG4gIHJldHVybiBhd2FpdCBwcm9jZXNzQXNzZXQocmVxLnBhcmFtcy5pZClcblxufVxuXG5jb25zdCBwcm9jZXNzUm91dGUgPSBuZXcgUm91dGUoe1xuICBwYXRoOiAnL2Fzc2V0cy86aWQvcHJvY2VzcycsXG4gIG1ldGhvZDogJ2dldCcsXG4gIHByb2Nlc3NvclxufSlcblxuZXhwb3J0IGRlZmF1bHQgcHJvY2Vzc1JvdXRlXG4iXX0=