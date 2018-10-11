'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

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
            return client.api('/me/drive/items/' + req.body.id).get();

          case 5:
            result = _context.sent;
            _context.next = 8;
            return _requestPromise2.default.get({ url: result['@microsoft.graph.downloadUrl'], encoding: null }).promise();

          case 8:
            file_data = _context.sent;
            _context.next = 11;
            return _server.Source.where({ text: 'microsoft' }).fetch({ transacting: trx });

          case 11:
            source = _context.sent;
            _context.next = 14;
            return (0, _server.createAsset)({
              team_id: req.team.get('id'),
              user_id: req.user.get('id'),
              source_id: source.get('id'),
              source_identifier: req.body.id,
              source_url: result.webUrl,
              file_name: result.name,
              file_data: file_data,
              content_type: result.file ? result.file.mimeType : 'plain/text'
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
  path: '/microsoft/files',
  processor: processor
});

exports.default = createRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsImNsaWVudCIsImFwaSIsImJvZHkiLCJpZCIsImdldCIsInJlc3VsdCIsInJlcXVlc3QiLCJ1cmwiLCJlbmNvZGluZyIsInByb21pc2UiLCJmaWxlX2RhdGEiLCJTb3VyY2UiLCJ3aGVyZSIsInRleHQiLCJmZXRjaCIsInRyYW5zYWN0aW5nIiwic291cmNlIiwidGVhbV9pZCIsInRlYW0iLCJ1c2VyX2lkIiwidXNlciIsInNvdXJjZV9pZCIsInNvdXJjZV9pZGVudGlmaWVyIiwic291cmNlX3VybCIsIndlYlVybCIsImZpbGVfbmFtZSIsIm5hbWUiLCJjb250ZW50X3R5cGUiLCJmaWxlIiwibWltZVR5cGUiLCJhc3NldCIsImxvYWQiLCJjcmVhdGVSb3V0ZSIsIlJvdXRlIiwibWV0aG9kIiwicGF0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFNQTtBQUFBLHNGQUFZLGlCQUFPQyxHQUFQLEVBQVlDLEdBQVosRUFBaUJDLE9BQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRUssc0JBQVVGLEdBQVYsRUFBZUMsR0FBZixDQUZMOztBQUFBO0FBRVZFLGtCQUZVO0FBQUE7QUFBQSxtQkFJS0EsT0FBT0MsR0FBUCxzQkFBOEJKLElBQUlLLElBQUosQ0FBU0MsRUFBdkMsRUFBNkNDLEdBQTdDLEVBSkw7O0FBQUE7QUFJVkMsa0JBSlU7QUFBQTtBQUFBLG1CQU1RQyx5QkFBUUYsR0FBUixDQUFZLEVBQUVHLEtBQUtGLE9BQU8sOEJBQVAsQ0FBUCxFQUErQ0csVUFBVSxJQUF6RCxFQUFaLEVBQTZFQyxPQUE3RSxFQU5SOztBQUFBO0FBTVZDLHFCQU5VO0FBQUE7QUFBQSxtQkFRS0MsZUFBT0MsS0FBUCxDQUFhLEVBQUVDLE1BQU0sV0FBUixFQUFiLEVBQW9DQyxLQUFwQyxDQUEwQyxFQUFFQyxhQUFhakIsR0FBZixFQUExQyxDQVJMOztBQUFBO0FBUVZrQixrQkFSVTtBQUFBO0FBQUEsbUJBVUkseUJBQVk7QUFDOUJDLHVCQUFTcEIsSUFBSXFCLElBQUosQ0FBU2QsR0FBVCxDQUFhLElBQWIsQ0FEcUI7QUFFOUJlLHVCQUFTdEIsSUFBSXVCLElBQUosQ0FBU2hCLEdBQVQsQ0FBYSxJQUFiLENBRnFCO0FBRzlCaUIseUJBQVdMLE9BQU9aLEdBQVAsQ0FBVyxJQUFYLENBSG1CO0FBSTlCa0IsaUNBQW1CekIsSUFBSUssSUFBSixDQUFTQyxFQUpFO0FBSzlCb0IsMEJBQVlsQixPQUFPbUIsTUFMVztBQU05QkMseUJBQVdwQixPQUFPcUIsSUFOWTtBQU85QmhCLGtDQVA4QjtBQVE5QmlCLDRCQUFjdEIsT0FBT3VCLElBQVAsR0FBY3ZCLE9BQU91QixJQUFQLENBQVlDLFFBQTFCLEdBQXFDO0FBUnJCLGFBQVosRUFTakIvQixHQVRpQixDQVZKOztBQUFBO0FBVVZnQyxpQkFWVTtBQUFBO0FBQUEsbUJBcUJWQSxNQUFNQyxJQUFOLENBQVcsQ0FBQyxRQUFELENBQVgsRUFBdUIsRUFBRWhCLGFBQWFqQixHQUFmLEVBQXZCLENBckJVOztBQUFBO0FBQUEsNkNBdUJULGdDQUFnQkQsR0FBaEIsRUFBcUJDLEdBQXJCLEVBQTBCZ0MsS0FBMUIsQ0F2QlM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztBQTJCQSxJQUFNRSxjQUFjLElBQUlDLGFBQUosQ0FBVTtBQUM1QkMsVUFBUSxNQURvQjtBQUU1QkMsUUFBTSxrQkFGc0I7QUFHNUJ2QztBQUg0QixDQUFWLENBQXBCOztrQkFNZW9DLFciLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBc3NldFNlcmlhbGl6ZXIgZnJvbSAnLi4vLi4vLi4vLi4vc2VyaWFsaXplcnMvYXNzZXRfc2VyaWFsaXplcidcbmltcG9ydCB7IGNyZWF0ZUFzc2V0LCBSb3V0ZSwgU291cmNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmVyJ1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAncmVxdWVzdC1wcm9taXNlJ1xuaW1wb3J0IHsgZ2V0Q2xpZW50IH0gZnJvbSAnLi91dGlscydcblxuY29uc3QgcHJvY2Vzc29yID0gYXN5bmMgKHJlcSwgdHJ4LCBvcHRpb25zKSA9PiB7XG5cbiAgY29uc3QgY2xpZW50ID0gYXdhaXQgZ2V0Q2xpZW50KHJlcSwgdHJ4KVxuXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNsaWVudC5hcGkoYC9tZS9kcml2ZS9pdGVtcy8ke3JlcS5ib2R5LmlkfWApLmdldCgpXG5cbiAgY29uc3QgZmlsZV9kYXRhID0gYXdhaXQgcmVxdWVzdC5nZXQoeyB1cmw6IHJlc3VsdFsnQG1pY3Jvc29mdC5ncmFwaC5kb3dubG9hZFVybCddLCBlbmNvZGluZzogbnVsbCB9KS5wcm9taXNlKClcblxuICBjb25zdCBzb3VyY2UgPSBhd2FpdCBTb3VyY2Uud2hlcmUoeyB0ZXh0OiAnbWljcm9zb2Z0JyB9KS5mZXRjaCh7IHRyYW5zYWN0aW5nOiB0cnggfSlcblxuICBjb25zdCBhc3NldCA9IGF3YWl0IGNyZWF0ZUFzc2V0KHtcbiAgICB0ZWFtX2lkOiByZXEudGVhbS5nZXQoJ2lkJyksXG4gICAgdXNlcl9pZDogcmVxLnVzZXIuZ2V0KCdpZCcpLFxuICAgIHNvdXJjZV9pZDogc291cmNlLmdldCgnaWQnKSxcbiAgICBzb3VyY2VfaWRlbnRpZmllcjogcmVxLmJvZHkuaWQsXG4gICAgc291cmNlX3VybDogcmVzdWx0LndlYlVybCxcbiAgICBmaWxlX25hbWU6IHJlc3VsdC5uYW1lLFxuICAgIGZpbGVfZGF0YSxcbiAgICBjb250ZW50X3R5cGU6IHJlc3VsdC5maWxlID8gcmVzdWx0LmZpbGUubWltZVR5cGUgOiAncGxhaW4vdGV4dCdcbiAgfSwgdHJ4KVxuXG4gIGF3YWl0IGFzc2V0LmxvYWQoWydzb3VyY2UnXSwgeyB0cmFuc2FjdGluZzogdHJ4IH0pXG5cbiAgcmV0dXJuIEFzc2V0U2VyaWFsaXplcihyZXEsIHRyeCwgYXNzZXQpXG5cbn1cblxuY29uc3QgY3JlYXRlUm91dGUgPSBuZXcgUm91dGUoe1xuICBtZXRob2Q6ICdwb3N0JyxcbiAgcGF0aDogJy9taWNyb3NvZnQvZmlsZXMnLFxuICBwcm9jZXNzb3Jcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVJvdXRlXG4iXX0=