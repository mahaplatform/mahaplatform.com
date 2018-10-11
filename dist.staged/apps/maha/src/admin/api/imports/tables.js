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
    var related_tables;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return options.knex.raw('SELECT ccu.table_name, c.column_name, c.data_type FROM information_schema.table_constraints tc INNER JOIN information_schema.constraint_column_usage ccu ON ccu.constraint_name=tc.constraint_name INNER JOIN information_schema.columns as c ON ccu.table_name=c.table_name AND tc.table_schema=\'public\' WHERE tc.constraint_type=? AND tc.table_name=?', ['FOREIGN KEY', req.params.tablename]);

          case 2:
            related_tables = _context.sent;
            return _context.abrupt('return', related_tables.rows.map(function (table) {
              return {
                table: table.table_name,
                field: table.column_name
              };
            }));

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

var tablesRoute = new _server.Route({
  method: 'get',
  path: '/tables/:tablename',
  processor: processor
});

exports.default = tablesRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsImtuZXgiLCJyYXciLCJwYXJhbXMiLCJ0YWJsZW5hbWUiLCJyZWxhdGVkX3RhYmxlcyIsInJvd3MiLCJtYXAiLCJ0YWJsZSIsInRhYmxlX25hbWUiLCJmaWVsZCIsImNvbHVtbl9uYW1lIiwidGFibGVzUm91dGUiLCJSb3V0ZSIsIm1ldGhvZCIsInBhdGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQSxJQUFNQTtBQUFBLHNGQUFZLGlCQUFPQyxHQUFQLEVBQVlDLEdBQVosRUFBaUJDLE9BQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRWFBLFFBQVFDLElBQVIsQ0FBYUMsR0FBYixDQUFpQiw0VkFBakIsRUFBK1csQ0FBQyxhQUFELEVBQWdCSixJQUFJSyxNQUFKLENBQVdDLFNBQTNCLENBQS9XLENBRmI7O0FBQUE7QUFFVkMsMEJBRlU7QUFBQSw2Q0FJVEEsZUFBZUMsSUFBZixDQUFvQkMsR0FBcEIsQ0FBd0I7QUFBQSxxQkFBVTtBQUN2Q0MsdUJBQU9BLE1BQU1DLFVBRDBCO0FBRXZDQyx1QkFBT0YsTUFBTUc7QUFGMEIsZUFBVjtBQUFBLGFBQXhCLENBSlM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztBQVdBLElBQU1DLGNBQWMsSUFBSUMsYUFBSixDQUFVO0FBQzVCQyxVQUFRLEtBRG9CO0FBRTVCQyxRQUFNLG9CQUZzQjtBQUc1QmxCO0FBSDRCLENBQVYsQ0FBcEI7O2tCQU1lZSxXIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZlcidcblxuY29uc3QgcHJvY2Vzc29yID0gYXN5bmMgKHJlcSwgdHJ4LCBvcHRpb25zKSA9PiB7XG5cbiAgY29uc3QgcmVsYXRlZF90YWJsZXMgPSBhd2FpdCBvcHRpb25zLmtuZXgucmF3KCdTRUxFQ1QgY2N1LnRhYmxlX25hbWUsIGMuY29sdW1uX25hbWUsIGMuZGF0YV90eXBlIEZST00gaW5mb3JtYXRpb25fc2NoZW1hLnRhYmxlX2NvbnN0cmFpbnRzIHRjIElOTkVSIEpPSU4gaW5mb3JtYXRpb25fc2NoZW1hLmNvbnN0cmFpbnRfY29sdW1uX3VzYWdlIGNjdSBPTiBjY3UuY29uc3RyYWludF9uYW1lPXRjLmNvbnN0cmFpbnRfbmFtZSBJTk5FUiBKT0lOIGluZm9ybWF0aW9uX3NjaGVtYS5jb2x1bW5zIGFzIGMgT04gY2N1LnRhYmxlX25hbWU9Yy50YWJsZV9uYW1lIEFORCB0Yy50YWJsZV9zY2hlbWE9XFwncHVibGljXFwnIFdIRVJFIHRjLmNvbnN0cmFpbnRfdHlwZT0/IEFORCB0Yy50YWJsZV9uYW1lPT8nLCBbJ0ZPUkVJR04gS0VZJywgcmVxLnBhcmFtcy50YWJsZW5hbWVdKVxuXG4gIHJldHVybiByZWxhdGVkX3RhYmxlcy5yb3dzLm1hcCh0YWJsZSA9PiAoe1xuICAgIHRhYmxlOiB0YWJsZS50YWJsZV9uYW1lLFxuICAgIGZpZWxkOiB0YWJsZS5jb2x1bW5fbmFtZVxuICB9KSlcblxufVxuXG5jb25zdCB0YWJsZXNSb3V0ZSA9IG5ldyBSb3V0ZSh7XG4gIG1ldGhvZDogJ2dldCcsXG4gIHBhdGg6ICcvdGFibGVzLzp0YWJsZW5hbWUnLFxuICBwcm9jZXNzb3Jcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IHRhYmxlc1JvdXRlXG4iXX0=