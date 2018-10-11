'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../server');

var _notification_serializer = require('../../../serializers/notification_serializer');

var _notification_serializer2 = _interopRequireDefault(_notification_serializer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var notification;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return req.resource.save({ is_visited: true }, { patch: true, transacting: trx });

          case 2:
            notification = _context.sent;


            notification.load(['app', 'story', 'subject', 'user'], { transacting: trx });

            return _context.abrupt('return', (0, _notification_serializer2.default)(req, trx, notification));

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

var visitedRoute = new _server.Route({
  path: '/visited',
  method: 'patch',
  processor: processor,
  refresh: refresh
});

exports.default = visitedRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsInJlc291cmNlIiwic2F2ZSIsImlzX3Zpc2l0ZWQiLCJwYXRjaCIsInRyYW5zYWN0aW5nIiwibm90aWZpY2F0aW9uIiwibG9hZCIsInJlZnJlc2giLCJyZXN1bHQiLCJjaGFubmVsIiwidGFyZ2V0IiwidmlzaXRlZFJvdXRlIiwiUm91dGUiLCJwYXRoIiwibWV0aG9kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQTtBQUFBLHNGQUFZLGlCQUFPQyxHQUFQLEVBQVlDLEdBQVosRUFBaUJDLE9BQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRVdGLElBQUlHLFFBQUosQ0FBYUMsSUFBYixDQUFrQixFQUFFQyxZQUFZLElBQWQsRUFBbEIsRUFBd0MsRUFBRUMsT0FBTyxJQUFULEVBQWVDLGFBQWFOLEdBQTVCLEVBQXhDLENBRlg7O0FBQUE7QUFFVk8sd0JBRlU7OztBQUloQkEseUJBQWFDLElBQWIsQ0FBa0IsQ0FBQyxLQUFELEVBQU8sT0FBUCxFQUFlLFNBQWYsRUFBeUIsTUFBekIsQ0FBbEIsRUFBb0QsRUFBRUYsYUFBYU4sR0FBZixFQUFwRDs7QUFKZ0IsNkNBTVQsdUNBQXVCRCxHQUF2QixFQUE0QkMsR0FBNUIsRUFBaUNPLFlBQWpDLENBTlM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztBQVVBLElBQU1FLFVBQVUsU0FBVkEsT0FBVSxDQUFDVixHQUFELEVBQU1DLEdBQU4sRUFBV1UsTUFBWCxFQUFtQlQsT0FBbkI7QUFBQSxTQUErQixDQUM3QyxFQUFFVSxTQUFTLGFBQVgsRUFBMEJDLFFBQVEsc0JBQWxDLEVBRDZDLENBQS9CO0FBQUEsQ0FBaEI7O0FBSUEsSUFBTUMsZUFBZSxJQUFJQyxhQUFKLENBQVU7QUFDN0JDLFFBQU0sVUFEdUI7QUFFN0JDLFVBQVEsT0FGcUI7QUFHN0JsQixzQkFINkI7QUFJN0JXO0FBSjZCLENBQVYsQ0FBckI7O2tCQU9lSSxZIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZlcidcbmltcG9ydCBOb3RpZmljYXRpb25TZXJpYWxpemVyIGZyb20gJy4uLy4uLy4uL3NlcmlhbGl6ZXJzL25vdGlmaWNhdGlvbl9zZXJpYWxpemVyJ1xuXG5jb25zdCBwcm9jZXNzb3IgPSBhc3luYyAocmVxLCB0cngsIG9wdGlvbnMpID0+IHtcblxuICBjb25zdCBub3RpZmljYXRpb24gPSBhd2FpdCByZXEucmVzb3VyY2Uuc2F2ZSh7IGlzX3Zpc2l0ZWQ6IHRydWUgfSwgeyBwYXRjaDogdHJ1ZSwgdHJhbnNhY3Rpbmc6IHRyeCB9KVxuXG4gIG5vdGlmaWNhdGlvbi5sb2FkKFsnYXBwJywnc3RvcnknLCdzdWJqZWN0JywndXNlciddLCB7IHRyYW5zYWN0aW5nOiB0cnggfSlcblxuICByZXR1cm4gTm90aWZpY2F0aW9uU2VyaWFsaXplcihyZXEsIHRyeCwgbm90aWZpY2F0aW9uKVxuXG59XG5cbmNvbnN0IHJlZnJlc2ggPSAocmVxLCB0cngsIHJlc3VsdCwgb3B0aW9ucykgPT4gW1xuICB7IGNoYW5uZWw6ICcvYWRtaW4vdXNlcicsIHRhcmdldDogJy9hZG1pbi9ub3RpZmljYXRpb25zJyB9XG5dXG5cbmNvbnN0IHZpc2l0ZWRSb3V0ZSA9IG5ldyBSb3V0ZSh7XG4gIHBhdGg6ICcvdmlzaXRlZCcsXG4gIG1ldGhvZDogJ3BhdGNoJyxcbiAgcHJvY2Vzc29yLFxuICByZWZyZXNoXG59KVxuXG5leHBvcnQgZGVmYXVsdCB2aXNpdGVkUm91dGVcbiJdfQ==