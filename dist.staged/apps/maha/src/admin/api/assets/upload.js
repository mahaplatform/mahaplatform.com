'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _asset = require('../../../services/asset');

var _server = require('../../../server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _asset.validateRequest)(req.body, req.files, false);

          case 2:
            _context.next = 4;
            return (0, _asset.uploadChunk)(req, trx);

          case 4:
            return _context.abrupt('return', _context.sent);

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

var uploadRoute = new _server.Route({
  path: '/assets/upload',
  method: 'post',
  processor: processor
});

exports.default = uploadRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsImJvZHkiLCJmaWxlcyIsInVwbG9hZFJvdXRlIiwiUm91dGUiLCJwYXRoIiwibWV0aG9kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBRUEsSUFBTUE7QUFBQSxzRkFBWSxpQkFBT0MsR0FBUCxFQUFZQyxHQUFaLEVBQWlCQyxPQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFFViw0QkFBZ0JGLElBQUlHLElBQXBCLEVBQTBCSCxJQUFJSSxLQUE5QixFQUFxQyxLQUFyQyxDQUZVOztBQUFBO0FBQUE7QUFBQSxtQkFJSCx3QkFBWUosR0FBWixFQUFpQkMsR0FBakIsQ0FKRzs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUFRQSxJQUFNSSxjQUFjLElBQUlDLGFBQUosQ0FBVTtBQUM1QkMsUUFBTSxnQkFEc0I7QUFFNUJDLFVBQVEsTUFGb0I7QUFHNUJUO0FBSDRCLENBQVYsQ0FBcEI7O2tCQU1lTSxXIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB2YWxpZGF0ZVJlcXVlc3QsIHVwbG9hZENodW5rIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvYXNzZXQnXG5pbXBvcnQgeyBSb3V0ZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZlcidcblxuY29uc3QgcHJvY2Vzc29yID0gYXN5bmMgKHJlcSwgdHJ4LCBvcHRpb25zKSA9PiB7XG5cbiAgYXdhaXQgdmFsaWRhdGVSZXF1ZXN0KHJlcS5ib2R5LCByZXEuZmlsZXMsIGZhbHNlKVxuXG4gIHJldHVybiBhd2FpdCB1cGxvYWRDaHVuayhyZXEsIHRyeClcblxufVxuXG5jb25zdCB1cGxvYWRSb3V0ZSA9IG5ldyBSb3V0ZSh7XG4gIHBhdGg6ICcvYXNzZXRzL3VwbG9hZCcsXG4gIG1ldGhvZDogJ3Bvc3QnLFxuICBwcm9jZXNzb3Jcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IHVwbG9hZFJvdXRlXG4iXX0=