'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', req.query.columns.reduce(function (template, column) {
              return (0, _extends4.default)({}, template, (0, _defineProperty3.default)({}, column, ''));
            }, {}));

          case 1:
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

var templateRoute = new _server.Route({
  method: 'get',
  path: '/template',
  processor: processor
});

exports.default = templateRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsInF1ZXJ5IiwiY29sdW1ucyIsInJlZHVjZSIsInRlbXBsYXRlIiwiY29sdW1uIiwidGVtcGxhdGVSb3V0ZSIsIlJvdXRlIiwibWV0aG9kIiwicGF0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBRUEsSUFBTUE7QUFBQSxzRkFBWSxpQkFBT0MsR0FBUCxFQUFZQyxHQUFaLEVBQWlCQyxPQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsNkNBRVRGLElBQUlHLEtBQUosQ0FBVUMsT0FBVixDQUFrQkMsTUFBbEIsQ0FBeUIsVUFBQ0MsUUFBRCxFQUFXQyxNQUFYO0FBQUEsZ0RBQzNCRCxRQUQyQixvQ0FFN0JDLE1BRjZCLEVBRXBCLEVBRm9CO0FBQUEsYUFBekIsRUFHSCxFQUhHLENBRlM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztBQVNBLElBQU1DLGdCQUFnQixJQUFJQyxhQUFKLENBQVU7QUFDOUJDLFVBQVEsS0FEc0I7QUFFOUJDLFFBQU0sV0FGd0I7QUFHOUJaO0FBSDhCLENBQVYsQ0FBdEI7O2tCQU1lUyxhIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZlcidcblxuY29uc3QgcHJvY2Vzc29yID0gYXN5bmMgKHJlcSwgdHJ4LCBvcHRpb25zKSA9PiB7XG5cbiAgcmV0dXJuIHJlcS5xdWVyeS5jb2x1bW5zLnJlZHVjZSgodGVtcGxhdGUsIGNvbHVtbikgPT4gKHtcbiAgICAuLi50ZW1wbGF0ZSxcbiAgICBbY29sdW1uXTogJydcbiAgfSksIHt9KVxuXG59XG5cbmNvbnN0IHRlbXBsYXRlUm91dGUgPSBuZXcgUm91dGUoe1xuICBtZXRob2Q6ICdnZXQnLFxuICBwYXRoOiAnL3RlbXBsYXRlJyxcbiAgcHJvY2Vzc29yXG59KVxuXG5leHBvcnQgZGVmYXVsdCB0ZW1wbGF0ZVJvdXRlXG4iXX0=