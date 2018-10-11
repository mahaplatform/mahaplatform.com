'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = require('bluebird');

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _asset_serializer = require('../../../../serializers/asset_serializer');

var _asset_serializer2 = _interopRequireDefault(_asset_serializer);

var _server = require('../../../../server');

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var client, result, file_data, source, asset;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _utils.getClient)(req, trx);

          case 2:
            client = _context.sent;
            _context.next = 5;
            return (0, _bluebird.promisify)(client.media)(req.body.id);

          case 5:
            result = _context.sent;
            _context.next = 8;
            return _requestPromise2.default.get({ url: result.images.standard_resolution.url, encoding: null }).promise();

          case 8:
            file_data = _context.sent;
            _context.next = 11;
            return _server.Source.where({ text: 'instagram' }).fetch({ transacting: trx });

          case 11:
            source = _context.sent;
            _context.next = 14;
            return (0, _server.createAsset)({
              team_id: req.team.get('id'),
              user_id: req.user.get('id'),
              source_id: source.get('id'),
              source_identifier: req.body.id,
              file_name: req.body.id + '.jpg',
              file_data: file_data,
              content_type: 'image/jpeg'
            }, trx);

          case 14:
            asset = _context.sent;
            _context.next = 17;
            return asset.load(['source'], { transacting: trx });

          case 17:
            return _context.abrupt('return', (0, _asset_serializer2.default)(req, trx, asset));

          case 18:
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

var createRoute = new _server.Route({
  method: 'post',
  path: '/instagram/photos',
  processor: processor
});

exports.default = createRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsImNsaWVudCIsIm1lZGlhIiwiYm9keSIsImlkIiwicmVzdWx0IiwicmVxdWVzdCIsImdldCIsInVybCIsImltYWdlcyIsInN0YW5kYXJkX3Jlc29sdXRpb24iLCJlbmNvZGluZyIsInByb21pc2UiLCJmaWxlX2RhdGEiLCJTb3VyY2UiLCJ3aGVyZSIsInRleHQiLCJmZXRjaCIsInRyYW5zYWN0aW5nIiwic291cmNlIiwidGVhbV9pZCIsInRlYW0iLCJ1c2VyX2lkIiwidXNlciIsInNvdXJjZV9pZCIsInNvdXJjZV9pZGVudGlmaWVyIiwiZmlsZV9uYW1lIiwiY29udGVudF90eXBlIiwiYXNzZXQiLCJsb2FkIiwiY3JlYXRlUm91dGUiLCJSb3V0ZSIsIm1ldGhvZCIsInBhdGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFNQTtBQUFBLHNGQUFZLGlCQUFPQyxHQUFQLEVBQVlDLEdBQVosRUFBaUJDLE9BQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRUssc0JBQVVGLEdBQVYsRUFBZUMsR0FBZixDQUZMOztBQUFBO0FBRVZFLGtCQUZVO0FBQUE7QUFBQSxtQkFJSyx5QkFBa0JBLE9BQU9DLEtBQXpCLEVBQWdDSixJQUFJSyxJQUFKLENBQVNDLEVBQXpDLENBSkw7O0FBQUE7QUFJVkMsa0JBSlU7QUFBQTtBQUFBLG1CQU1RQyx5QkFBUUMsR0FBUixDQUFZLEVBQUVDLEtBQUtILE9BQU9JLE1BQVAsQ0FBY0MsbUJBQWQsQ0FBa0NGLEdBQXpDLEVBQThDRyxVQUFVLElBQXhELEVBQVosRUFBNEVDLE9BQTVFLEVBTlI7O0FBQUE7QUFNVkMscUJBTlU7QUFBQTtBQUFBLG1CQVFLQyxlQUFPQyxLQUFQLENBQWEsRUFBRUMsTUFBTSxXQUFSLEVBQWIsRUFBb0NDLEtBQXBDLENBQTBDLEVBQUVDLGFBQWFuQixHQUFmLEVBQTFDLENBUkw7O0FBQUE7QUFRVm9CLGtCQVJVO0FBQUE7QUFBQSxtQkFVSSx5QkFBWTtBQUM5QkMsdUJBQVN0QixJQUFJdUIsSUFBSixDQUFTZCxHQUFULENBQWEsSUFBYixDQURxQjtBQUU5QmUsdUJBQVN4QixJQUFJeUIsSUFBSixDQUFTaEIsR0FBVCxDQUFhLElBQWIsQ0FGcUI7QUFHOUJpQix5QkFBV0wsT0FBT1osR0FBUCxDQUFXLElBQVgsQ0FIbUI7QUFJOUJrQixpQ0FBbUIzQixJQUFJSyxJQUFKLENBQVNDLEVBSkU7QUFLOUJzQix5QkFBYzVCLElBQUlLLElBQUosQ0FBU0MsRUFBdkIsU0FMOEI7QUFNOUJTLGtDQU44QjtBQU85QmMsNEJBQWM7QUFQZ0IsYUFBWixFQVFqQjVCLEdBUmlCLENBVko7O0FBQUE7QUFVVjZCLGlCQVZVO0FBQUE7QUFBQSxtQkFvQlZBLE1BQU1DLElBQU4sQ0FBVyxDQUFDLFFBQUQsQ0FBWCxFQUF1QixFQUFFWCxhQUFhbkIsR0FBZixFQUF2QixDQXBCVTs7QUFBQTtBQUFBLDZDQXNCVCxnQ0FBZ0JELEdBQWhCLEVBQXFCQyxHQUFyQixFQUEwQjZCLEtBQTFCLENBdEJTOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUEwQkEsSUFBTUUsY0FBYyxJQUFJQyxhQUFKLENBQVU7QUFDNUJDLFVBQVEsTUFEb0I7QUFFNUJDLFFBQU0sbUJBRnNCO0FBRzVCcEM7QUFINEIsQ0FBVixDQUFwQjs7a0JBTWVpQyxXIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXNzZXRTZXJpYWxpemVyIGZyb20gJy4uLy4uLy4uLy4uL3NlcmlhbGl6ZXJzL2Fzc2V0X3NlcmlhbGl6ZXInXG5pbXBvcnQgeyBjcmVhdGVBc3NldCwgUm91dGUsIFNvdXJjZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NlcnZlcidcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3JlcXVlc3QtcHJvbWlzZSdcbmltcG9ydCB7IGdldENsaWVudCB9IGZyb20gJy4vdXRpbHMnXG5cbmNvbnN0IHByb2Nlc3NvciA9IGFzeW5jIChyZXEsIHRyeCwgb3B0aW9ucykgPT4ge1xuXG4gIGNvbnN0IGNsaWVudCA9IGF3YWl0IGdldENsaWVudChyZXEsIHRyeClcblxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBQcm9taXNlLnByb21pc2lmeShjbGllbnQubWVkaWEpKHJlcS5ib2R5LmlkKVxuXG4gIGNvbnN0IGZpbGVfZGF0YSA9IGF3YWl0IHJlcXVlc3QuZ2V0KHsgdXJsOiByZXN1bHQuaW1hZ2VzLnN0YW5kYXJkX3Jlc29sdXRpb24udXJsLCBlbmNvZGluZzogbnVsbCB9KS5wcm9taXNlKClcblxuICBjb25zdCBzb3VyY2UgPSBhd2FpdCBTb3VyY2Uud2hlcmUoeyB0ZXh0OiAnaW5zdGFncmFtJyB9KS5mZXRjaCh7IHRyYW5zYWN0aW5nOiB0cnggfSlcblxuICBjb25zdCBhc3NldCA9IGF3YWl0IGNyZWF0ZUFzc2V0KHtcbiAgICB0ZWFtX2lkOiByZXEudGVhbS5nZXQoJ2lkJyksXG4gICAgdXNlcl9pZDogcmVxLnVzZXIuZ2V0KCdpZCcpLFxuICAgIHNvdXJjZV9pZDogc291cmNlLmdldCgnaWQnKSxcbiAgICBzb3VyY2VfaWRlbnRpZmllcjogcmVxLmJvZHkuaWQsXG4gICAgZmlsZV9uYW1lOiBgJHtyZXEuYm9keS5pZH0uanBnYCxcbiAgICBmaWxlX2RhdGEsXG4gICAgY29udGVudF90eXBlOiAnaW1hZ2UvanBlZydcbiAgfSwgdHJ4KVxuXG4gIGF3YWl0IGFzc2V0LmxvYWQoWydzb3VyY2UnXSwgeyB0cmFuc2FjdGluZzogdHJ4IH0pXG5cbiAgcmV0dXJuIEFzc2V0U2VyaWFsaXplcihyZXEsIHRyeCwgYXNzZXQpXG5cbn1cblxuY29uc3QgY3JlYXRlUm91dGUgPSBuZXcgUm91dGUoe1xuICBtZXRob2Q6ICdwb3N0JyxcbiAgcGF0aDogJy9pbnN0YWdyYW0vcGhvdG9zJyxcbiAgcHJvY2Vzc29yXG59KVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVSb3V0ZVxuIl19