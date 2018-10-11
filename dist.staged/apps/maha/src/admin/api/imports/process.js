'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../server');

var _import_process_queue = require('../../../queues/import_process_queue');

var _import_process_queue2 = _interopRequireDefault(_import_process_queue);

var _import_item = require('../../../models/import_item');

var _import_item2 = _interopRequireDefault(_import_item);

var _import = require('../../../models/import');

var _import2 = _interopRequireDefault(_import);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:

            _import_process_queue2.default.enqueue(req, trx, {
              id: req.resource.get('id'),
              destination: req.body.destination,
              defaultParams: req.body.defaultParams,
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

var refresh = function refresh(req, trx, result, options) {
  return '/admin/imports/' + result.id;
};

var processRoute = new _server.Route({
  method: 'post',
  path: '/process',
  processor: processor,
  refresh: refresh,
  serializer: _server.ImportSerializer
});

exports.default = processRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsIkltcG9ydFByb2Nlc3NRdWV1ZSIsImVucXVldWUiLCJpZCIsInJlc291cmNlIiwiZ2V0IiwiZGVzdGluYXRpb24iLCJib2R5IiwiZGVmYXVsdFBhcmFtcyIsInRhYmxlIiwicHJpbWFyeUtleSIsInJlZnJlc2giLCJyZXN1bHQiLCJwcm9jZXNzUm91dGUiLCJSb3V0ZSIsIm1ldGhvZCIsInBhdGgiLCJzZXJpYWxpemVyIiwiSW1wb3J0U2VyaWFsaXplciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQTtBQUFBLHNGQUFZLGlCQUFPQyxHQUFQLEVBQVlDLEdBQVosRUFBaUJDLE9BQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBRWhCQywyQ0FBbUJDLE9BQW5CLENBQTJCSixHQUEzQixFQUFnQ0MsR0FBaEMsRUFBcUM7QUFDbkNJLGtCQUFJTCxJQUFJTSxRQUFKLENBQWFDLEdBQWIsQ0FBaUIsSUFBakIsQ0FEK0I7QUFFbkNDLDJCQUFhUixJQUFJUyxJQUFKLENBQVNELFdBRmE7QUFHbkNFLDZCQUFlVixJQUFJUyxJQUFKLENBQVNDLGFBSFc7QUFJbkNDLHFCQUFPWCxJQUFJUyxJQUFKLENBQVNFLEtBSm1CO0FBS25DQywwQkFBWVosSUFBSVMsSUFBSixDQUFTRztBQUxjLGFBQXJDOztBQUZnQiw2Q0FVVFosSUFBSU0sUUFWSzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFaOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBY0EsSUFBTU8sVUFBVSxTQUFWQSxPQUFVLENBQUNiLEdBQUQsRUFBTUMsR0FBTixFQUFXYSxNQUFYLEVBQW1CWixPQUFuQjtBQUFBLDZCQUFpRFksT0FBT1QsRUFBeEQ7QUFBQSxDQUFoQjs7QUFFQSxJQUFNVSxlQUFlLElBQUlDLGFBQUosQ0FBVTtBQUM3QkMsVUFBUSxNQURxQjtBQUU3QkMsUUFBTSxVQUZ1QjtBQUc3Qm5CLHNCQUg2QjtBQUk3QmMsa0JBSjZCO0FBSzdCTSxjQUFZQztBQUxpQixDQUFWLENBQXJCOztrQkFRZUwsWSIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGUsIEltcG9ydFNlcmlhbGl6ZXIgfSBmcm9tICcuLi8uLi8uLi9zZXJ2ZXInXG5pbXBvcnQgSW1wb3J0UHJvY2Vzc1F1ZXVlIGZyb20gJy4uLy4uLy4uL3F1ZXVlcy9pbXBvcnRfcHJvY2Vzc19xdWV1ZSdcbmltcG9ydCBJbXBvcnRJdGVtIGZyb20gJy4uLy4uLy4uL21vZGVscy9pbXBvcnRfaXRlbSdcbmltcG9ydCBJbXBvcnQgZnJvbSAnLi4vLi4vLi4vbW9kZWxzL2ltcG9ydCdcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50J1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuXG5jb25zdCBwcm9jZXNzb3IgPSBhc3luYyAocmVxLCB0cngsIG9wdGlvbnMpID0+IHtcblxuICBJbXBvcnRQcm9jZXNzUXVldWUuZW5xdWV1ZShyZXEsIHRyeCwge1xuICAgIGlkOiByZXEucmVzb3VyY2UuZ2V0KCdpZCcpLFxuICAgIGRlc3RpbmF0aW9uOiByZXEuYm9keS5kZXN0aW5hdGlvbixcbiAgICBkZWZhdWx0UGFyYW1zOiByZXEuYm9keS5kZWZhdWx0UGFyYW1zLFxuICAgIHRhYmxlOiByZXEuYm9keS50YWJsZSxcbiAgICBwcmltYXJ5S2V5OiByZXEuYm9keS5wcmltYXJ5S2V5XG4gIH0pXG5cbiAgcmV0dXJuIHJlcS5yZXNvdXJjZVxuXG59XG5cbmNvbnN0IHJlZnJlc2ggPSAocmVxLCB0cngsIHJlc3VsdCwgb3B0aW9ucykgPT4gYC9hZG1pbi9pbXBvcnRzLyR7cmVzdWx0LmlkfWBcblxuY29uc3QgcHJvY2Vzc1JvdXRlID0gbmV3IFJvdXRlKHtcbiAgbWV0aG9kOiAncG9zdCcsXG4gIHBhdGg6ICcvcHJvY2VzcycsXG4gIHByb2Nlc3NvcixcbiAgcmVmcmVzaCxcbiAgc2VyaWFsaXplcjogSW1wb3J0U2VyaWFsaXplclxufSlcblxuZXhwb3J0IGRlZmF1bHQgcHJvY2Vzc1JvdXRlXG4iXX0=