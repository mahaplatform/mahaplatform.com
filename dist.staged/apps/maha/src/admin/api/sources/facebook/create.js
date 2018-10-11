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
    var client, result, image, file_data, source, asset;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _utils.getClient)(req, trx);

          case 2:
            client = _context.sent;
            _context.next = 5;
            return client.api(req.body.id, { fields: ['id', 'name', 'images'] });

          case 5:
            result = _context.sent;
            image = result.images.reduce(function (largest, image) {
              return largest === null || image.width > largest.width ? image : largest;
            }, null);
            _context.next = 9;
            return _requestPromise2.default.get({ url: image.source, encoding: null }).promise();

          case 9:
            file_data = _context.sent;
            _context.next = 12;
            return _server.Source.where({ text: 'facebook' }).fetch({ transacting: trx });

          case 12:
            source = _context.sent;
            _context.next = 15;
            return (0, _server.createAsset)({
              team_id: req.team.get('id'),
              user_id: req.user.get('id'),
              source_id: source.get('id'),
              source_identifier: req.body.id,
              file_name: req.body.id + '.jpg',
              file_data: file_data,
              content_type: 'image/jpeg'
            }, trx);

          case 15:
            asset = _context.sent;
            _context.next = 18;
            return asset.load(['source'], { transacting: trx });

          case 18:
            return _context.abrupt('return', (0, _asset_serializer2.default)(req, trx, asset));

          case 19:
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
  path: '/facebook/photos',
  processor: processor
});

exports.default = createRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsImNsaWVudCIsImFwaSIsImJvZHkiLCJpZCIsImZpZWxkcyIsInJlc3VsdCIsImltYWdlIiwiaW1hZ2VzIiwicmVkdWNlIiwibGFyZ2VzdCIsIndpZHRoIiwicmVxdWVzdCIsImdldCIsInVybCIsInNvdXJjZSIsImVuY29kaW5nIiwicHJvbWlzZSIsImZpbGVfZGF0YSIsIlNvdXJjZSIsIndoZXJlIiwidGV4dCIsImZldGNoIiwidHJhbnNhY3RpbmciLCJ0ZWFtX2lkIiwidGVhbSIsInVzZXJfaWQiLCJ1c2VyIiwic291cmNlX2lkIiwic291cmNlX2lkZW50aWZpZXIiLCJmaWxlX25hbWUiLCJjb250ZW50X3R5cGUiLCJhc3NldCIsImxvYWQiLCJjcmVhdGVSb3V0ZSIsIlJvdXRlIiwibWV0aG9kIiwicGF0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFNQTtBQUFBLHNGQUFZLGlCQUFPQyxHQUFQLEVBQVlDLEdBQVosRUFBaUJDLE9BQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRUssc0JBQVVGLEdBQVYsRUFBZUMsR0FBZixDQUZMOztBQUFBO0FBRVZFLGtCQUZVO0FBQUE7QUFBQSxtQkFJS0EsT0FBT0MsR0FBUCxDQUFXSixJQUFJSyxJQUFKLENBQVNDLEVBQXBCLEVBQXdCLEVBQUVDLFFBQVEsQ0FBQyxJQUFELEVBQU0sTUFBTixFQUFhLFFBQWIsQ0FBVixFQUF4QixDQUpMOztBQUFBO0FBSVZDLGtCQUpVO0FBTVZDLGlCQU5VLEdBTUZELE9BQU9FLE1BQVAsQ0FBY0MsTUFBZCxDQUFxQixVQUFDQyxPQUFELEVBQVVILEtBQVYsRUFBb0I7QUFDckQscUJBQVFHLFlBQVksSUFBWixJQUFvQkgsTUFBTUksS0FBTixHQUFjRCxRQUFRQyxLQUEzQyxHQUFvREosS0FBcEQsR0FBNERHLE9BQW5FO0FBQ0QsYUFGYSxFQUVYLElBRlcsQ0FORTtBQUFBO0FBQUEsbUJBVVFFLHlCQUFRQyxHQUFSLENBQVksRUFBRUMsS0FBS1AsTUFBTVEsTUFBYixFQUFxQkMsVUFBVSxJQUEvQixFQUFaLEVBQW1EQyxPQUFuRCxFQVZSOztBQUFBO0FBVVZDLHFCQVZVO0FBQUE7QUFBQSxtQkFZS0MsZUFBT0MsS0FBUCxDQUFhLEVBQUVDLE1BQU0sVUFBUixFQUFiLEVBQW1DQyxLQUFuQyxDQUF5QyxFQUFFQyxhQUFheEIsR0FBZixFQUF6QyxDQVpMOztBQUFBO0FBWVZnQixrQkFaVTtBQUFBO0FBQUEsbUJBY0kseUJBQVk7QUFDOUJTLHVCQUFTMUIsSUFBSTJCLElBQUosQ0FBU1osR0FBVCxDQUFhLElBQWIsQ0FEcUI7QUFFOUJhLHVCQUFTNUIsSUFBSTZCLElBQUosQ0FBU2QsR0FBVCxDQUFhLElBQWIsQ0FGcUI7QUFHOUJlLHlCQUFXYixPQUFPRixHQUFQLENBQVcsSUFBWCxDQUhtQjtBQUk5QmdCLGlDQUFtQi9CLElBQUlLLElBQUosQ0FBU0MsRUFKRTtBQUs5QjBCLHlCQUFjaEMsSUFBSUssSUFBSixDQUFTQyxFQUF2QixTQUw4QjtBQU05QmMsa0NBTjhCO0FBTzlCYSw0QkFBYztBQVBnQixhQUFaLEVBUWpCaEMsR0FSaUIsQ0FkSjs7QUFBQTtBQWNWaUMsaUJBZFU7QUFBQTtBQUFBLG1CQXdCVkEsTUFBTUMsSUFBTixDQUFXLENBQUMsUUFBRCxDQUFYLEVBQXVCLEVBQUVWLGFBQWF4QixHQUFmLEVBQXZCLENBeEJVOztBQUFBO0FBQUEsNkNBMEJULGdDQUFnQkQsR0FBaEIsRUFBcUJDLEdBQXJCLEVBQTBCaUMsS0FBMUIsQ0ExQlM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztBQThCQSxJQUFNRSxjQUFjLElBQUlDLGFBQUosQ0FBVTtBQUM1QkMsVUFBUSxNQURvQjtBQUU1QkMsUUFBTSxrQkFGc0I7QUFHNUJ4QztBQUg0QixDQUFWLENBQXBCOztrQkFNZXFDLFciLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBc3NldFNlcmlhbGl6ZXIgZnJvbSAnLi4vLi4vLi4vLi4vc2VyaWFsaXplcnMvYXNzZXRfc2VyaWFsaXplcidcbmltcG9ydCB7IGNyZWF0ZUFzc2V0LCBSb3V0ZSwgU291cmNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmVyJ1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAncmVxdWVzdC1wcm9taXNlJ1xuaW1wb3J0IHsgZ2V0Q2xpZW50IH0gZnJvbSAnLi91dGlscydcblxuY29uc3QgcHJvY2Vzc29yID0gYXN5bmMgKHJlcSwgdHJ4LCBvcHRpb25zKSA9PiB7XG5cbiAgY29uc3QgY2xpZW50ID0gYXdhaXQgZ2V0Q2xpZW50KHJlcSwgdHJ4KVxuXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNsaWVudC5hcGkocmVxLmJvZHkuaWQsIHsgZmllbGRzOiBbJ2lkJywnbmFtZScsJ2ltYWdlcyddIH0pXG5cbiAgY29uc3QgaW1hZ2UgPSByZXN1bHQuaW1hZ2VzLnJlZHVjZSgobGFyZ2VzdCwgaW1hZ2UpID0+IHtcbiAgICByZXR1cm4gKGxhcmdlc3QgPT09IG51bGwgfHwgaW1hZ2Uud2lkdGggPiBsYXJnZXN0LndpZHRoKSA/IGltYWdlIDogbGFyZ2VzdFxuICB9LCBudWxsKVxuXG4gIGNvbnN0IGZpbGVfZGF0YSA9IGF3YWl0IHJlcXVlc3QuZ2V0KHsgdXJsOiBpbWFnZS5zb3VyY2UsIGVuY29kaW5nOiBudWxsIH0pLnByb21pc2UoKVxuXG4gIGNvbnN0IHNvdXJjZSA9IGF3YWl0IFNvdXJjZS53aGVyZSh7IHRleHQ6ICdmYWNlYm9vaycgfSkuZmV0Y2goeyB0cmFuc2FjdGluZzogdHJ4IH0pXG5cbiAgY29uc3QgYXNzZXQgPSBhd2FpdCBjcmVhdGVBc3NldCh7XG4gICAgdGVhbV9pZDogcmVxLnRlYW0uZ2V0KCdpZCcpLFxuICAgIHVzZXJfaWQ6IHJlcS51c2VyLmdldCgnaWQnKSxcbiAgICBzb3VyY2VfaWQ6IHNvdXJjZS5nZXQoJ2lkJyksXG4gICAgc291cmNlX2lkZW50aWZpZXI6IHJlcS5ib2R5LmlkLFxuICAgIGZpbGVfbmFtZTogYCR7cmVxLmJvZHkuaWR9LmpwZ2AsXG4gICAgZmlsZV9kYXRhLFxuICAgIGNvbnRlbnRfdHlwZTogJ2ltYWdlL2pwZWcnXG4gIH0sIHRyeClcblxuICBhd2FpdCBhc3NldC5sb2FkKFsnc291cmNlJ10sIHsgdHJhbnNhY3Rpbmc6IHRyeCB9KVxuXG4gIHJldHVybiBBc3NldFNlcmlhbGl6ZXIocmVxLCB0cngsIGFzc2V0KVxuXG59XG5cbmNvbnN0IGNyZWF0ZVJvdXRlID0gbmV3IFJvdXRlKHtcbiAgbWV0aG9kOiAncG9zdCcsXG4gIHBhdGg6ICcvZmFjZWJvb2svcGhvdG9zJyxcbiAgcHJvY2Vzc29yXG59KVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVSb3V0ZVxuIl19