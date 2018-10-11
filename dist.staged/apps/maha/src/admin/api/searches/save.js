'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _bluebird = require('bluebird');

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../server');

var _search = require('../../../models/search');

var _search2 = _interopRequireDefault(_search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, trx, options) {
    var defaultParams, data, search;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _bluebird.reduce)(options.defaultParams, function () {
              var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(params, defaultParams) {
                var defaults;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return defaultParams(req, trx, options);

                      case 2:
                        defaults = _context.sent;
                        return _context.abrupt('return', (0, _extends3.default)({}, params, defaults));

                      case 4:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x4, _x5) {
                return _ref2.apply(this, arguments);
              };
            }(), {});

          case 2:
            defaultParams = _context2.sent;
            data = (0, _extends3.default)({}, defaultParams, {
              route: req.body.route,
              text: req.body.text
            });
            _context2.next = 6;
            return _search2.default.where(data).fetch({ transacting: trx });

          case 6:
            search = _context2.sent;

            if (!search) {
              _context2.next = 11;
              break;
            }

            _context2.next = 10;
            return search.save({}, { patch: true, transacting: trx });

          case 10:
            return _context2.abrupt('return', true);

          case 11:
            _context2.next = 13;
            return _search2.default.forge((0, _extends3.default)({}, data, { extra: req.body.extra })).save(null, { transacting: trx });

          case 13:
            return _context2.abrupt('return', true);

          case 14:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function processor(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var saveRoute = new _server.Route({
  path: '',
  method: 'post',
  processor: processor
});

exports.default = saveRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsImRlZmF1bHRQYXJhbXMiLCJwYXJhbXMiLCJkZWZhdWx0cyIsImRhdGEiLCJyb3V0ZSIsImJvZHkiLCJ0ZXh0IiwiU2VhcmNoIiwid2hlcmUiLCJmZXRjaCIsInRyYW5zYWN0aW5nIiwic2VhcmNoIiwic2F2ZSIsInBhdGNoIiwiZm9yZ2UiLCJleHRyYSIsInNhdmVSb3V0ZSIsIlJvdXRlIiwicGF0aCIsIm1ldGhvZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7O0FBRUEsSUFBTUE7QUFBQSxzRkFBWSxrQkFBT0MsR0FBUCxFQUFZQyxHQUFaLEVBQWlCQyxPQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUVZLHNCQUFlQSxRQUFRQyxhQUF2QjtBQUFBLG1HQUFzQyxpQkFBT0MsTUFBUCxFQUFlRCxhQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsK0JBRXpDQSxjQUFjSCxHQUFkLEVBQW1CQyxHQUFuQixFQUF3QkMsT0FBeEIsQ0FGeUM7O0FBQUE7QUFFMURHLGdDQUYwRDtBQUFBLG9GQUszREQsTUFMMkQsRUFNM0RDLFFBTjJEOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQXRDOztBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQVN6QixFQVR5QixDQUZaOztBQUFBO0FBRVZGLHlCQUZVO0FBYVZHLGdCQWJVLDhCQWNYSCxhQWRXO0FBZWRJLHFCQUFPUCxJQUFJUSxJQUFKLENBQVNELEtBZkY7QUFnQmRFLG9CQUFNVCxJQUFJUSxJQUFKLENBQVNDO0FBaEJEO0FBQUE7QUFBQSxtQkFtQktDLGlCQUFPQyxLQUFQLENBQWFMLElBQWIsRUFBbUJNLEtBQW5CLENBQXlCLEVBQUVDLGFBQWFaLEdBQWYsRUFBekIsQ0FuQkw7O0FBQUE7QUFtQlZhLGtCQW5CVTs7QUFBQSxpQkFxQmJBLE1BckJhO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsbUJBc0JSQSxPQUFPQyxJQUFQLENBQVksRUFBWixFQUFnQixFQUFFQyxPQUFPLElBQVQsRUFBZUgsYUFBYVosR0FBNUIsRUFBaEIsQ0F0QlE7O0FBQUE7QUFBQSw4Q0F1QlAsSUF2Qk87O0FBQUE7QUFBQTtBQUFBLG1CQTBCVlMsaUJBQU9PLEtBQVAsNEJBQWtCWCxJQUFsQixJQUF3QlksT0FBT2xCLElBQUlRLElBQUosQ0FBU1UsS0FBeEMsS0FBaURILElBQWpELENBQXNELElBQXRELEVBQTRELEVBQUVGLGFBQWFaLEdBQWYsRUFBNUQsQ0ExQlU7O0FBQUE7QUFBQSw4Q0E0QlQsSUE1QlM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztBQWdDQSxJQUFNa0IsWUFBWSxJQUFJQyxhQUFKLENBQVU7QUFDMUJDLFFBQU0sRUFEb0I7QUFFMUJDLFVBQVEsTUFGa0I7QUFHMUJ2QjtBQUgwQixDQUFWLENBQWxCOztrQkFNZW9CLFMiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmVyJ1xuaW1wb3J0IFNlYXJjaCBmcm9tICcuLi8uLi8uLi9tb2RlbHMvc2VhcmNoJ1xuXG5jb25zdCBwcm9jZXNzb3IgPSBhc3luYyAocmVxLCB0cngsIG9wdGlvbnMpID0+IHtcblxuICBjb25zdCBkZWZhdWx0UGFyYW1zID0gYXdhaXQgUHJvbWlzZS5yZWR1Y2Uob3B0aW9ucy5kZWZhdWx0UGFyYW1zLCBhc3luYyAocGFyYW1zLCBkZWZhdWx0UGFyYW1zKSA9PiB7XG5cbiAgICBjb25zdCBkZWZhdWx0cyA9IGF3YWl0IGRlZmF1bHRQYXJhbXMocmVxLCB0cngsIG9wdGlvbnMpXG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4ucGFyYW1zLFxuICAgICAgLi4uZGVmYXVsdHNcbiAgICB9XG5cbiAgfSwge30pXG5cbiAgY29uc3QgZGF0YSA9IHtcbiAgICAuLi5kZWZhdWx0UGFyYW1zLFxuICAgIHJvdXRlOiByZXEuYm9keS5yb3V0ZSxcbiAgICB0ZXh0OiByZXEuYm9keS50ZXh0XG4gIH1cblxuICBjb25zdCBzZWFyY2ggPSBhd2FpdCBTZWFyY2gud2hlcmUoZGF0YSkuZmV0Y2goeyB0cmFuc2FjdGluZzogdHJ4IH0pXG5cbiAgaWYoc2VhcmNoKSB7XG4gICAgYXdhaXQgc2VhcmNoLnNhdmUoe30sIHsgcGF0Y2g6IHRydWUsIHRyYW5zYWN0aW5nOiB0cnggfSlcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgYXdhaXQgU2VhcmNoLmZvcmdlKHsgLi4uZGF0YSwgZXh0cmE6IHJlcS5ib2R5LmV4dHJhIH0pLnNhdmUobnVsbCwgeyB0cmFuc2FjdGluZzogdHJ4IH0pXG5cbiAgcmV0dXJuIHRydWVcblxufVxuXG5jb25zdCBzYXZlUm91dGUgPSBuZXcgUm91dGUoe1xuICBwYXRoOiAnJyxcbiAgbWV0aG9kOiAncG9zdCcsXG4gIHByb2Nlc3NvclxufSlcblxuZXhwb3J0IGRlZmF1bHQgc2F2ZVJvdXRlXG4iXX0=