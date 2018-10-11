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

var _mimeTypes = require('mime-types');

var _mimeTypes2 = _interopRequireDefault(_mimeTypes);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var client, meta, result, file_data, source, asset;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _utils.getClient)(req, trx);

          case 2:
            client = _context.sent;
            _context.next = 5;
            return client({
              resource: 'files/get_metadata',
              parameters: {
                path: req.body.id
              }
            });

          case 5:
            meta = _context.sent;
            _context.next = 8;
            return client({
              resource: 'files/get_temporary_link',
              parameters: {
                path: req.body.id
              }
            });

          case 8:
            result = _context.sent;
            _context.next = 11;
            return _requestPromise2.default.get({ url: result.link, encoding: null }).promise();

          case 11:
            file_data = _context.sent;
            _context.next = 14;
            return _server.Source.where({ text: 'dropbox' }).fetch({ transacting: trx });

          case 14:
            source = _context.sent;
            _context.next = 17;
            return (0, _server.createAsset)({
              team_id: req.team.get('id'),
              user_id: req.user.get('id'),
              source_id: source.get('id'),
              source_identifier: req.body.id,
              file_name: meta.name,
              file_data: file_data,
              content_type: _getContentType(meta.name)
            }, trx);

          case 17:
            asset = _context.sent;
            _context.next = 20;
            return asset.load(['source'], { transacting: trx });

          case 20:
            return _context.abrupt('return', (0, _asset_serializer2.default)(req, trx, asset));

          case 21:
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

var _getContentType = function _getContentType(name) {
  var ext = _path2.default.extname(name);
  var type = _mimeTypes2.default.lookup(ext);
  return type || 'text/plain';
};

var createRoute = new _server.Route({
  method: 'post',
  path: '/dropbox/files',
  processor: processor
});

exports.default = createRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsImNsaWVudCIsInJlc291cmNlIiwicGFyYW1ldGVycyIsInBhdGgiLCJib2R5IiwiaWQiLCJtZXRhIiwicmVzdWx0IiwicmVxdWVzdCIsImdldCIsInVybCIsImxpbmsiLCJlbmNvZGluZyIsInByb21pc2UiLCJmaWxlX2RhdGEiLCJTb3VyY2UiLCJ3aGVyZSIsInRleHQiLCJmZXRjaCIsInRyYW5zYWN0aW5nIiwic291cmNlIiwidGVhbV9pZCIsInRlYW0iLCJ1c2VyX2lkIiwidXNlciIsInNvdXJjZV9pZCIsInNvdXJjZV9pZGVudGlmaWVyIiwiZmlsZV9uYW1lIiwibmFtZSIsImNvbnRlbnRfdHlwZSIsIl9nZXRDb250ZW50VHlwZSIsImFzc2V0IiwibG9hZCIsImV4dCIsImV4dG5hbWUiLCJ0eXBlIiwibWltZSIsImxvb2t1cCIsImNyZWF0ZVJvdXRlIiwiUm91dGUiLCJtZXRob2QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7OztBQUdBLElBQU1BO0FBQUEsc0ZBQVksaUJBQU9DLEdBQVAsRUFBWUMsR0FBWixFQUFpQkMsT0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFFSyxzQkFBVUYsR0FBVixFQUFlQyxHQUFmLENBRkw7O0FBQUE7QUFFVkUsa0JBRlU7QUFBQTtBQUFBLG1CQUlHQSxPQUFPO0FBQ3hCQyx3QkFBVSxvQkFEYztBQUV4QkMsMEJBQVk7QUFDVkMsc0JBQU1OLElBQUlPLElBQUosQ0FBU0M7QUFETDtBQUZZLGFBQVAsQ0FKSDs7QUFBQTtBQUlWQyxnQkFKVTtBQUFBO0FBQUEsbUJBV0tOLE9BQU87QUFDMUJDLHdCQUFVLDBCQURnQjtBQUUxQkMsMEJBQVk7QUFDVkMsc0JBQU1OLElBQUlPLElBQUosQ0FBU0M7QUFETDtBQUZjLGFBQVAsQ0FYTDs7QUFBQTtBQVdWRSxrQkFYVTtBQUFBO0FBQUEsbUJBa0JRQyx5QkFBUUMsR0FBUixDQUFZLEVBQUVDLEtBQUtILE9BQU9JLElBQWQsRUFBb0JDLFVBQVUsSUFBOUIsRUFBWixFQUFrREMsT0FBbEQsRUFsQlI7O0FBQUE7QUFrQlZDLHFCQWxCVTtBQUFBO0FBQUEsbUJBb0JLQyxlQUFPQyxLQUFQLENBQWEsRUFBRUMsTUFBTSxTQUFSLEVBQWIsRUFBa0NDLEtBQWxDLENBQXdDLEVBQUVDLGFBQWFyQixHQUFmLEVBQXhDLENBcEJMOztBQUFBO0FBb0JWc0Isa0JBcEJVO0FBQUE7QUFBQSxtQkFzQkkseUJBQVk7QUFDOUJDLHVCQUFTeEIsSUFBSXlCLElBQUosQ0FBU2IsR0FBVCxDQUFhLElBQWIsQ0FEcUI7QUFFOUJjLHVCQUFTMUIsSUFBSTJCLElBQUosQ0FBU2YsR0FBVCxDQUFhLElBQWIsQ0FGcUI7QUFHOUJnQix5QkFBV0wsT0FBT1gsR0FBUCxDQUFXLElBQVgsQ0FIbUI7QUFJOUJpQixpQ0FBbUI3QixJQUFJTyxJQUFKLENBQVNDLEVBSkU7QUFLOUJzQix5QkFBV3JCLEtBQUtzQixJQUxjO0FBTTlCZCxrQ0FOOEI7QUFPOUJlLDRCQUFjQyxnQkFBZ0J4QixLQUFLc0IsSUFBckI7QUFQZ0IsYUFBWixFQVFqQjlCLEdBUmlCLENBdEJKOztBQUFBO0FBc0JWaUMsaUJBdEJVO0FBQUE7QUFBQSxtQkFnQ1ZBLE1BQU1DLElBQU4sQ0FBVyxDQUFDLFFBQUQsQ0FBWCxFQUF1QixFQUFFYixhQUFhckIsR0FBZixFQUF2QixDQWhDVTs7QUFBQTtBQUFBLDZDQWtDVCxnQ0FBZ0JELEdBQWhCLEVBQXFCQyxHQUFyQixFQUEwQmlDLEtBQTFCLENBbENTOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUFzQ0EsSUFBTUQsa0JBQWtCLFNBQWxCQSxlQUFrQixDQUFDRixJQUFELEVBQVU7QUFDaEMsTUFBTUssTUFBTTlCLGVBQUsrQixPQUFMLENBQWFOLElBQWIsQ0FBWjtBQUNBLE1BQU1PLE9BQU9DLG9CQUFLQyxNQUFMLENBQVlKLEdBQVosQ0FBYjtBQUNBLFNBQU9FLFFBQVEsWUFBZjtBQUNELENBSkQ7O0FBTUEsSUFBTUcsY0FBYyxJQUFJQyxhQUFKLENBQVU7QUFDNUJDLFVBQVEsTUFEb0I7QUFFNUJyQyxRQUFNLGdCQUZzQjtBQUc1QlA7QUFINEIsQ0FBVixDQUFwQjs7a0JBTWUwQyxXIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXNzZXRTZXJpYWxpemVyIGZyb20gJy4uLy4uLy4uLy4uL3NlcmlhbGl6ZXJzL2Fzc2V0X3NlcmlhbGl6ZXInXG5pbXBvcnQgeyBjcmVhdGVBc3NldCwgUm91dGUsIFNvdXJjZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NlcnZlcidcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3JlcXVlc3QtcHJvbWlzZSdcbmltcG9ydCB7IGdldENsaWVudCB9IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgbWltZSBmcm9tICdtaW1lLXR5cGVzJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcblxuXG5jb25zdCBwcm9jZXNzb3IgPSBhc3luYyAocmVxLCB0cngsIG9wdGlvbnMpID0+IHtcblxuICBjb25zdCBjbGllbnQgPSBhd2FpdCBnZXRDbGllbnQocmVxLCB0cngpXG5cbiAgY29uc3QgbWV0YSA9IGF3YWl0IGNsaWVudCh7XG4gICAgcmVzb3VyY2U6ICdmaWxlcy9nZXRfbWV0YWRhdGEnLFxuICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgIHBhdGg6IHJlcS5ib2R5LmlkXG4gICAgfVxuICB9KVxuXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNsaWVudCh7XG4gICAgcmVzb3VyY2U6ICdmaWxlcy9nZXRfdGVtcG9yYXJ5X2xpbmsnLFxuICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgIHBhdGg6IHJlcS5ib2R5LmlkXG4gICAgfVxuICB9KVxuXG4gIGNvbnN0IGZpbGVfZGF0YSA9IGF3YWl0IHJlcXVlc3QuZ2V0KHsgdXJsOiByZXN1bHQubGluaywgZW5jb2Rpbmc6IG51bGwgfSkucHJvbWlzZSgpXG5cbiAgY29uc3Qgc291cmNlID0gYXdhaXQgU291cmNlLndoZXJlKHsgdGV4dDogJ2Ryb3Bib3gnIH0pLmZldGNoKHsgdHJhbnNhY3Rpbmc6IHRyeCB9KVxuXG4gIGNvbnN0IGFzc2V0ID0gYXdhaXQgY3JlYXRlQXNzZXQoe1xuICAgIHRlYW1faWQ6IHJlcS50ZWFtLmdldCgnaWQnKSxcbiAgICB1c2VyX2lkOiByZXEudXNlci5nZXQoJ2lkJyksXG4gICAgc291cmNlX2lkOiBzb3VyY2UuZ2V0KCdpZCcpLFxuICAgIHNvdXJjZV9pZGVudGlmaWVyOiByZXEuYm9keS5pZCxcbiAgICBmaWxlX25hbWU6IG1ldGEubmFtZSxcbiAgICBmaWxlX2RhdGEsXG4gICAgY29udGVudF90eXBlOiBfZ2V0Q29udGVudFR5cGUobWV0YS5uYW1lKVxuICB9LCB0cngpXG5cbiAgYXdhaXQgYXNzZXQubG9hZChbJ3NvdXJjZSddLCB7IHRyYW5zYWN0aW5nOiB0cnggfSlcblxuICByZXR1cm4gQXNzZXRTZXJpYWxpemVyKHJlcSwgdHJ4LCBhc3NldClcblxufVxuXG5jb25zdCBfZ2V0Q29udGVudFR5cGUgPSAobmFtZSkgPT4ge1xuICBjb25zdCBleHQgPSBwYXRoLmV4dG5hbWUobmFtZSlcbiAgY29uc3QgdHlwZSA9IG1pbWUubG9va3VwKGV4dClcbiAgcmV0dXJuIHR5cGUgfHwgJ3RleHQvcGxhaW4nXG59XG5cbmNvbnN0IGNyZWF0ZVJvdXRlID0gbmV3IFJvdXRlKHtcbiAgbWV0aG9kOiAncG9zdCcsXG4gIHBhdGg6ICcvZHJvcGJveC9maWxlcycsXG4gIHByb2Nlc3NvclxufSlcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlUm91dGVcbiJdfQ==