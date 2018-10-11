'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../server');

var _asset_serializer = require('../../../serializers/asset_serializer');

var _asset_serializer2 = _interopRequireDefault(_asset_serializer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var asset;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _server.createAssetFromUrl)(req, trx, req.body.url);

          case 3:
            asset = _context.sent;
            _context.next = 6;
            return asset.load(['user.photo', 'source'], { transacting: trx });

          case 6:
            return _context.abrupt('return', asset);

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](0);
            throw new _server.BackframeError({
              code: 404,
              message: 'Unable to load url'
            });

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 9]]);
  }));

  return function processor(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var importRoute = new _server.Route({
  method: 'post',
  path: '/assets/url',
  processor: processor,
  serializer: _asset_serializer2.default
});

exports.default = importRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsImJvZHkiLCJ1cmwiLCJhc3NldCIsImxvYWQiLCJ0cmFuc2FjdGluZyIsIkJhY2tmcmFtZUVycm9yIiwiY29kZSIsIm1lc3NhZ2UiLCJpbXBvcnRSb3V0ZSIsIlJvdXRlIiwibWV0aG9kIiwicGF0aCIsInNlcmlhbGl6ZXIiLCJBc3NldFNlcmlhbGl6ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7OztBQUVBLElBQU1BO0FBQUEsc0ZBQVksaUJBQU9DLEdBQVAsRUFBWUMsR0FBWixFQUFpQkMsT0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUlNLGdDQUFtQkYsR0FBbkIsRUFBd0JDLEdBQXhCLEVBQTZCRCxJQUFJRyxJQUFKLENBQVNDLEdBQXRDLENBSk47O0FBQUE7QUFJUkMsaUJBSlE7QUFBQTtBQUFBLG1CQU1SQSxNQUFNQyxJQUFOLENBQVcsQ0FBQyxZQUFELEVBQWMsUUFBZCxDQUFYLEVBQW9DLEVBQUVDLGFBQWFOLEdBQWYsRUFBcEMsQ0FOUTs7QUFBQTtBQUFBLDZDQVFQSSxLQVJPOztBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQVlSLElBQUlHLHNCQUFKLENBQW1CO0FBQ3ZCQyxvQkFBTSxHQURpQjtBQUV2QkMsdUJBQVM7QUFGYyxhQUFuQixDQVpROztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUFxQkEsSUFBTUMsY0FBYyxJQUFJQyxhQUFKLENBQVU7QUFDNUJDLFVBQVEsTUFEb0I7QUFFNUJDLFFBQU0sYUFGc0I7QUFHNUJmLHNCQUg0QjtBQUk1QmdCLGNBQVlDO0FBSmdCLENBQVYsQ0FBcEI7O2tCQU9lTCxXIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVBc3NldEZyb21VcmwsIEJhY2tmcmFtZUVycm9yLCBSb3V0ZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZlcidcbmltcG9ydCBBc3NldFNlcmlhbGl6ZXIgZnJvbSAnLi4vLi4vLi4vc2VyaWFsaXplcnMvYXNzZXRfc2VyaWFsaXplcidcblxuY29uc3QgcHJvY2Vzc29yID0gYXN5bmMgKHJlcSwgdHJ4LCBvcHRpb25zKSA9PiB7XG5cbiAgdHJ5IHtcblxuICAgIGNvbnN0IGFzc2V0ID0gYXdhaXQgY3JlYXRlQXNzZXRGcm9tVXJsKHJlcSwgdHJ4LCByZXEuYm9keS51cmwpXG5cbiAgICBhd2FpdCBhc3NldC5sb2FkKFsndXNlci5waG90bycsJ3NvdXJjZSddLCB7IHRyYW5zYWN0aW5nOiB0cnggfSlcblxuICAgIHJldHVybiBhc3NldFxuXG4gIH0gY2F0Y2goZSkge1xuXG4gICAgdGhyb3cgbmV3IEJhY2tmcmFtZUVycm9yKHtcbiAgICAgIGNvZGU6IDQwNCxcbiAgICAgIG1lc3NhZ2U6ICdVbmFibGUgdG8gbG9hZCB1cmwnXG4gICAgfSlcblxuICB9XG5cbn1cblxuY29uc3QgaW1wb3J0Um91dGUgPSBuZXcgUm91dGUoe1xuICBtZXRob2Q6ICdwb3N0JyxcbiAgcGF0aDogJy9hc3NldHMvdXJsJyxcbiAgcHJvY2Vzc29yLFxuICBzZXJpYWxpemVyOiBBc3NldFNlcmlhbGl6ZXJcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IGltcG9ydFJvdXRlXG4iXX0=