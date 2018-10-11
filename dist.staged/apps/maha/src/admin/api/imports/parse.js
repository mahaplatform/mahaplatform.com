'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _import_serializer = require('../../../serializers/import_serializer');

var _import_serializer2 = _interopRequireDefault(_import_serializer);

var _server = require('../../../server');

var _import_parse_queue = require('../../../queues/import_parse_queue');

var _import_parse_queue2 = _interopRequireDefault(_import_parse_queue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:

            _import_parse_queue2.default.enqueue(req, trx, {
              id: req.resource.get('id'),
              rules: req.body.rules,
              table: req.body.table,
              primaryKey: req.body.primaryKey
            });

            return _context.abrupt('return', req.resource);

          case 2:
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

var parseRoute = new _server.Route({
  method: 'post',
  path: '/parse',
  processor: processor,
  serializer: _import_serializer2.default
});

exports.default = parseRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsIkltcG9ydFBhcnNlUXVldWUiLCJlbnF1ZXVlIiwiaWQiLCJyZXNvdXJjZSIsImdldCIsInJ1bGVzIiwiYm9keSIsInRhYmxlIiwicHJpbWFyeUtleSIsInBhcnNlUm91dGUiLCJSb3V0ZSIsIm1ldGhvZCIsInBhdGgiLCJzZXJpYWxpemVyIiwiSW1wb3J0U2VyaWFsaXplciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQTtBQUFBLHNGQUFZLGlCQUFPQyxHQUFQLEVBQVlDLEdBQVosRUFBaUJDLE9BQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBRWhCQyx5Q0FBaUJDLE9BQWpCLENBQXlCSixHQUF6QixFQUE4QkMsR0FBOUIsRUFBbUM7QUFDakNJLGtCQUFJTCxJQUFJTSxRQUFKLENBQWFDLEdBQWIsQ0FBaUIsSUFBakIsQ0FENkI7QUFFakNDLHFCQUFPUixJQUFJUyxJQUFKLENBQVNELEtBRmlCO0FBR2pDRSxxQkFBT1YsSUFBSVMsSUFBSixDQUFTQyxLQUhpQjtBQUlqQ0MsMEJBQVlYLElBQUlTLElBQUosQ0FBU0U7QUFKWSxhQUFuQzs7QUFGZ0IsNkNBU1RYLElBQUlNLFFBVEs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztBQWFBLElBQU1NLGFBQWEsSUFBSUMsYUFBSixDQUFVO0FBQzNCQyxVQUFRLE1BRG1CO0FBRTNCQyxRQUFNLFFBRnFCO0FBRzNCaEIsc0JBSDJCO0FBSTNCaUIsY0FBWUM7QUFKZSxDQUFWLENBQW5COztrQkFPZUwsVSIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEltcG9ydFNlcmlhbGl6ZXIgZnJvbSAnLi4vLi4vLi4vc2VyaWFsaXplcnMvaW1wb3J0X3NlcmlhbGl6ZXInXG5pbXBvcnQgeyBSb3V0ZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZlcidcbmltcG9ydCBJbXBvcnRQYXJzZVF1ZXVlIGZyb20gJy4uLy4uLy4uL3F1ZXVlcy9pbXBvcnRfcGFyc2VfcXVldWUnXG5cbmNvbnN0IHByb2Nlc3NvciA9IGFzeW5jIChyZXEsIHRyeCwgb3B0aW9ucykgPT4ge1xuXG4gIEltcG9ydFBhcnNlUXVldWUuZW5xdWV1ZShyZXEsIHRyeCwge1xuICAgIGlkOiByZXEucmVzb3VyY2UuZ2V0KCdpZCcpLFxuICAgIHJ1bGVzOiByZXEuYm9keS5ydWxlcyxcbiAgICB0YWJsZTogcmVxLmJvZHkudGFibGUsXG4gICAgcHJpbWFyeUtleTogcmVxLmJvZHkucHJpbWFyeUtleVxuICB9KVxuXG4gIHJldHVybiByZXEucmVzb3VyY2VcblxufVxuXG5jb25zdCBwYXJzZVJvdXRlID0gbmV3IFJvdXRlKHtcbiAgbWV0aG9kOiAncG9zdCcsXG4gIHBhdGg6ICcvcGFyc2UnLFxuICBwcm9jZXNzb3IsXG4gIHNlcmlhbGl6ZXI6IEltcG9ydFNlcmlhbGl6ZXJcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IHBhcnNlUm91dGVcbiJdfQ==