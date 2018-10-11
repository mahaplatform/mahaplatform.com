'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var constraints, fields;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _getConstraints(req.params.tablename, options);

          case 2:
            constraints = _context.sent;
            _context.next = 5;
            return options.knex.raw('select * from information_schema.columns where table_name=\'' + req.params.tablename + '\'');

          case 5:
            fields = _context.sent;
            return _context.abrupt('return', fields.rows.map(function (field) {
              return {
                name: field.column_name,
                data_type: field.data_type,
                is_nullable: field.is_nullable === 'YES',
                column_default: field.column_default,
                related: constraints[field.column_name] || null
              };
            }));

          case 7:
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

var _getConstraints = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(table_name, options) {
    var table_constraints;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return options.knex.raw('SELECT ccu.table_name, kcu.column_name FROM information_schema.table_constraints tc JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name AND tc.table_schema = kcu.table_schema JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = tc.constraint_name AND ccu.table_schema = tc.table_schema where constraint_type = ? AND tc.table_name = ?', ['FOREIGN KEY', table_name]);

          case 2:
            table_constraints = _context2.sent;
            return _context2.abrupt('return', table_constraints.rows.reduce(function (table_constraints, table_constraint) {
              return (0, _extends4.default)({}, table_constraints, (0, _defineProperty3.default)({}, table_constraint.column_name, {
                table: table_constraint.table_name,
                column: table_constraint.column_name
              }));
            }, {}));

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function _getConstraints(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var fieldsRoute = new _server.Route({
  method: 'get',
  path: '/fields/:tablename',
  processor: processor
});

exports.default = fieldsRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsIl9nZXRDb25zdHJhaW50cyIsInBhcmFtcyIsInRhYmxlbmFtZSIsImNvbnN0cmFpbnRzIiwia25leCIsInJhdyIsImZpZWxkcyIsInJvd3MiLCJtYXAiLCJuYW1lIiwiZmllbGQiLCJjb2x1bW5fbmFtZSIsImRhdGFfdHlwZSIsImlzX251bGxhYmxlIiwiY29sdW1uX2RlZmF1bHQiLCJyZWxhdGVkIiwidGFibGVfbmFtZSIsInRhYmxlX2NvbnN0cmFpbnRzIiwicmVkdWNlIiwidGFibGVfY29uc3RyYWludCIsInRhYmxlIiwiY29sdW1uIiwiZmllbGRzUm91dGUiLCJSb3V0ZSIsIm1ldGhvZCIsInBhdGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBLElBQU1BO0FBQUEsc0ZBQVksaUJBQU9DLEdBQVAsRUFBWUMsR0FBWixFQUFpQkMsT0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFFVUMsZ0JBQWdCSCxJQUFJSSxNQUFKLENBQVdDLFNBQTNCLEVBQXNDSCxPQUF0QyxDQUZWOztBQUFBO0FBRVZJLHVCQUZVO0FBQUE7QUFBQSxtQkFJS0osUUFBUUssSUFBUixDQUFhQyxHQUFiLGtFQUErRVIsSUFBSUksTUFBSixDQUFXQyxTQUExRixRQUpMOztBQUFBO0FBSVZJLGtCQUpVO0FBQUEsNkNBTVRBLE9BQU9DLElBQVAsQ0FBWUMsR0FBWixDQUFnQjtBQUFBLHFCQUFVO0FBQy9CQyxzQkFBTUMsTUFBTUMsV0FEbUI7QUFFL0JDLDJCQUFXRixNQUFNRSxTQUZjO0FBRy9CQyw2QkFBYUgsTUFBTUcsV0FBTixLQUFzQixLQUhKO0FBSS9CQyxnQ0FBZ0JKLE1BQU1JLGNBSlM7QUFLL0JDLHlCQUFTWixZQUFZTyxNQUFNQyxXQUFsQixLQUFrQztBQUxaLGVBQVY7QUFBQSxhQUFoQixDQU5TOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUFnQkEsSUFBTVg7QUFBQSx1RkFBa0Isa0JBQU9nQixVQUFQLEVBQW1CakIsT0FBbkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFFVUEsUUFBUUssSUFBUixDQUFhQyxHQUFiLENBQWlCLCtZQUFqQixFQUFrYSxDQUFDLGFBQUQsRUFBZ0JXLFVBQWhCLENBQWxhLENBRlY7O0FBQUE7QUFFaEJDLDZCQUZnQjtBQUFBLDhDQUlmQSxrQkFBa0JWLElBQWxCLENBQXVCVyxNQUF2QixDQUE4QixVQUFDRCxpQkFBRCxFQUFvQkUsZ0JBQXBCO0FBQUEsZ0RBQ2hDRixpQkFEZ0Msb0NBRWxDRSxpQkFBaUJSLFdBRmlCLEVBRUg7QUFDOUJTLHVCQUFPRCxpQkFBaUJILFVBRE07QUFFOUJLLHdCQUFRRixpQkFBaUJSO0FBRkssZUFGRztBQUFBLGFBQTlCLEVBTUgsRUFORyxDQUplOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQWxCOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBY0EsSUFBTVcsY0FBYyxJQUFJQyxhQUFKLENBQVU7QUFDNUJDLFVBQVEsS0FEb0I7QUFFNUJDLFFBQU0sb0JBRnNCO0FBRzVCN0I7QUFINEIsQ0FBVixDQUFwQjs7a0JBTWUwQixXIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZlcidcblxuY29uc3QgcHJvY2Vzc29yID0gYXN5bmMgKHJlcSwgdHJ4LCBvcHRpb25zKSA9PiB7XG5cbiAgY29uc3QgY29uc3RyYWludHMgPSBhd2FpdCBfZ2V0Q29uc3RyYWludHMocmVxLnBhcmFtcy50YWJsZW5hbWUsIG9wdGlvbnMpXG5cbiAgY29uc3QgZmllbGRzID0gYXdhaXQgb3B0aW9ucy5rbmV4LnJhdyhgc2VsZWN0ICogZnJvbSBpbmZvcm1hdGlvbl9zY2hlbWEuY29sdW1ucyB3aGVyZSB0YWJsZV9uYW1lPScke3JlcS5wYXJhbXMudGFibGVuYW1lfSdgKVxuXG4gIHJldHVybiBmaWVsZHMucm93cy5tYXAoZmllbGQgPT4gKHtcbiAgICBuYW1lOiBmaWVsZC5jb2x1bW5fbmFtZSxcbiAgICBkYXRhX3R5cGU6IGZpZWxkLmRhdGFfdHlwZSxcbiAgICBpc19udWxsYWJsZTogZmllbGQuaXNfbnVsbGFibGUgPT09ICdZRVMnLFxuICAgIGNvbHVtbl9kZWZhdWx0OiBmaWVsZC5jb2x1bW5fZGVmYXVsdCxcbiAgICByZWxhdGVkOiBjb25zdHJhaW50c1tmaWVsZC5jb2x1bW5fbmFtZV0gfHwgbnVsbFxuICB9KSlcblxufVxuXG5jb25zdCBfZ2V0Q29uc3RyYWludHMgPSBhc3luYyAodGFibGVfbmFtZSwgb3B0aW9ucykgPT4ge1xuXG4gIGNvbnN0IHRhYmxlX2NvbnN0cmFpbnRzID0gYXdhaXQgb3B0aW9ucy5rbmV4LnJhdygnU0VMRUNUIGNjdS50YWJsZV9uYW1lLCBrY3UuY29sdW1uX25hbWUgRlJPTSBpbmZvcm1hdGlvbl9zY2hlbWEudGFibGVfY29uc3RyYWludHMgdGMgSk9JTiBpbmZvcm1hdGlvbl9zY2hlbWEua2V5X2NvbHVtbl91c2FnZSBrY3UgT04gdGMuY29uc3RyYWludF9uYW1lID0ga2N1LmNvbnN0cmFpbnRfbmFtZSBBTkQgdGMudGFibGVfc2NoZW1hID0ga2N1LnRhYmxlX3NjaGVtYSBKT0lOIGluZm9ybWF0aW9uX3NjaGVtYS5jb25zdHJhaW50X2NvbHVtbl91c2FnZSBBUyBjY3UgT04gY2N1LmNvbnN0cmFpbnRfbmFtZSA9IHRjLmNvbnN0cmFpbnRfbmFtZSBBTkQgY2N1LnRhYmxlX3NjaGVtYSA9IHRjLnRhYmxlX3NjaGVtYSB3aGVyZSBjb25zdHJhaW50X3R5cGUgPSA/IEFORCB0Yy50YWJsZV9uYW1lID0gPycsIFsnRk9SRUlHTiBLRVknLCB0YWJsZV9uYW1lXSlcblxuICByZXR1cm4gdGFibGVfY29uc3RyYWludHMucm93cy5yZWR1Y2UoKHRhYmxlX2NvbnN0cmFpbnRzLCB0YWJsZV9jb25zdHJhaW50KSA9PiAoe1xuICAgIC4uLnRhYmxlX2NvbnN0cmFpbnRzLFxuICAgIFt0YWJsZV9jb25zdHJhaW50LmNvbHVtbl9uYW1lXToge1xuICAgICAgdGFibGU6IHRhYmxlX2NvbnN0cmFpbnQudGFibGVfbmFtZSxcbiAgICAgIGNvbHVtbjogdGFibGVfY29uc3RyYWludC5jb2x1bW5fbmFtZVxuICAgIH1cbiAgfSksIHt9KVxuXG59XG5cbmNvbnN0IGZpZWxkc1JvdXRlID0gbmV3IFJvdXRlKHtcbiAgbWV0aG9kOiAnZ2V0JyxcbiAgcGF0aDogJy9maWVsZHMvOnRhYmxlbmFtZScsXG4gIHByb2Nlc3NvclxufSlcblxuZXhwb3J0IGRlZmF1bHQgZmllbGRzUm91dGVcbiJdfQ==