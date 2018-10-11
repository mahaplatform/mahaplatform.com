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

var _utils = require('./utils');

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _mimeTypes = require('mime-types');

var _mimeTypes2 = _interopRequireDefault(_mimeTypes);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var client, meta, url, file_data, source, asset;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _utils.getClient)(req, trx);

          case 2:
            client = _context.sent;
            _context.next = 5;
            return client.files.get(req.body.id);

          case 5:
            meta = _context.sent;
            _context.next = 8;
            return client.files.getDownloadURL(req.body.id);

          case 8:
            url = _context.sent;
            _context.next = 11;
            return _requestPromise2.default.get({ url: url, encoding: null }).promise();

          case 11:
            file_data = _context.sent;
            _context.next = 14;
            return _server.Source.where({ text: 'box' }).fetch({ transacting: trx });

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
  path: '/box/files',
  processor: processor
});

exports.default = createRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsImNsaWVudCIsImZpbGVzIiwiZ2V0IiwiYm9keSIsImlkIiwibWV0YSIsImdldERvd25sb2FkVVJMIiwidXJsIiwicmVxdWVzdCIsImVuY29kaW5nIiwicHJvbWlzZSIsImZpbGVfZGF0YSIsIlNvdXJjZSIsIndoZXJlIiwidGV4dCIsImZldGNoIiwidHJhbnNhY3RpbmciLCJzb3VyY2UiLCJ0ZWFtX2lkIiwidGVhbSIsInVzZXJfaWQiLCJ1c2VyIiwic291cmNlX2lkIiwic291cmNlX2lkZW50aWZpZXIiLCJmaWxlX25hbWUiLCJuYW1lIiwiY29udGVudF90eXBlIiwiX2dldENvbnRlbnRUeXBlIiwiYXNzZXQiLCJsb2FkIiwiZXh0IiwicGF0aCIsImV4dG5hbWUiLCJ0eXBlIiwibWltZSIsImxvb2t1cCIsImNyZWF0ZVJvdXRlIiwiUm91dGUiLCJtZXRob2QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BO0FBQUEsc0ZBQVksaUJBQU9DLEdBQVAsRUFBWUMsR0FBWixFQUFpQkMsT0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFFSyxzQkFBVUYsR0FBVixFQUFlQyxHQUFmLENBRkw7O0FBQUE7QUFFVkUsa0JBRlU7QUFBQTtBQUFBLG1CQUlHQSxPQUFPQyxLQUFQLENBQWFDLEdBQWIsQ0FBaUJMLElBQUlNLElBQUosQ0FBU0MsRUFBMUIsQ0FKSDs7QUFBQTtBQUlWQyxnQkFKVTtBQUFBO0FBQUEsbUJBTUVMLE9BQU9DLEtBQVAsQ0FBYUssY0FBYixDQUE0QlQsSUFBSU0sSUFBSixDQUFTQyxFQUFyQyxDQU5GOztBQUFBO0FBTVZHLGVBTlU7QUFBQTtBQUFBLG1CQVFRQyx5QkFBUU4sR0FBUixDQUFZLEVBQUVLLFFBQUYsRUFBT0UsVUFBVSxJQUFqQixFQUFaLEVBQXFDQyxPQUFyQyxFQVJSOztBQUFBO0FBUVZDLHFCQVJVO0FBQUE7QUFBQSxtQkFVS0MsZUFBT0MsS0FBUCxDQUFhLEVBQUVDLE1BQU0sS0FBUixFQUFiLEVBQThCQyxLQUE5QixDQUFvQyxFQUFFQyxhQUFhbEIsR0FBZixFQUFwQyxDQVZMOztBQUFBO0FBVVZtQixrQkFWVTtBQUFBO0FBQUEsbUJBWUkseUJBQVk7QUFDOUJDLHVCQUFTckIsSUFBSXNCLElBQUosQ0FBU2pCLEdBQVQsQ0FBYSxJQUFiLENBRHFCO0FBRTlCa0IsdUJBQVN2QixJQUFJd0IsSUFBSixDQUFTbkIsR0FBVCxDQUFhLElBQWIsQ0FGcUI7QUFHOUJvQix5QkFBV0wsT0FBT2YsR0FBUCxDQUFXLElBQVgsQ0FIbUI7QUFJOUJxQixpQ0FBbUIxQixJQUFJTSxJQUFKLENBQVNDLEVBSkU7QUFLOUJvQix5QkFBV25CLEtBQUtvQixJQUxjO0FBTTlCZCxrQ0FOOEI7QUFPOUJlLDRCQUFjQyxnQkFBZ0J0QixLQUFLb0IsSUFBckI7QUFQZ0IsYUFBWixFQVFqQjNCLEdBUmlCLENBWko7O0FBQUE7QUFZVjhCLGlCQVpVO0FBQUE7QUFBQSxtQkFzQlZBLE1BQU1DLElBQU4sQ0FBVyxDQUFDLFFBQUQsQ0FBWCxFQUF1QixFQUFFYixhQUFhbEIsR0FBZixFQUF2QixDQXRCVTs7QUFBQTtBQUFBLDZDQXdCVCxnQ0FBZ0JELEdBQWhCLEVBQXFCQyxHQUFyQixFQUEwQjhCLEtBQTFCLENBeEJTOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUE0QkEsSUFBTUQsa0JBQWtCLFNBQWxCQSxlQUFrQixDQUFDRixJQUFELEVBQVU7QUFDaEMsTUFBTUssTUFBTUMsZUFBS0MsT0FBTCxDQUFhUCxJQUFiLENBQVo7QUFDQSxNQUFNUSxPQUFPQyxvQkFBS0MsTUFBTCxDQUFZTCxHQUFaLENBQWI7QUFDQSxTQUFPRyxRQUFRLFlBQWY7QUFDRCxDQUpEOztBQU1BLElBQU1HLGNBQWMsSUFBSUMsYUFBSixDQUFVO0FBQzVCQyxVQUFRLE1BRG9CO0FBRTVCUCxRQUFNLFlBRnNCO0FBRzVCbkM7QUFINEIsQ0FBVixDQUFwQjs7a0JBTWV3QyxXIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXNzZXRTZXJpYWxpemVyIGZyb20gJy4uLy4uLy4uLy4uL3NlcmlhbGl6ZXJzL2Fzc2V0X3NlcmlhbGl6ZXInXG5pbXBvcnQgeyBjcmVhdGVBc3NldCwgUm91dGUsIFNvdXJjZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NlcnZlcidcbmltcG9ydCB7IGdldENsaWVudCB9IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgcmVxdWVzdCBmcm9tICdyZXF1ZXN0LXByb21pc2UnXG5pbXBvcnQgbWltZSBmcm9tICdtaW1lLXR5cGVzJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcblxuY29uc3QgcHJvY2Vzc29yID0gYXN5bmMgKHJlcSwgdHJ4LCBvcHRpb25zKSA9PiB7XG5cbiAgY29uc3QgY2xpZW50ID0gYXdhaXQgZ2V0Q2xpZW50KHJlcSwgdHJ4KVxuXG4gIGNvbnN0IG1ldGEgPSBhd2FpdCBjbGllbnQuZmlsZXMuZ2V0KHJlcS5ib2R5LmlkKVxuXG4gIGNvbnN0IHVybCA9IGF3YWl0IGNsaWVudC5maWxlcy5nZXREb3dubG9hZFVSTChyZXEuYm9keS5pZClcblxuICBjb25zdCBmaWxlX2RhdGEgPSBhd2FpdCByZXF1ZXN0LmdldCh7IHVybCwgZW5jb2Rpbmc6IG51bGwgfSkucHJvbWlzZSgpXG5cbiAgY29uc3Qgc291cmNlID0gYXdhaXQgU291cmNlLndoZXJlKHsgdGV4dDogJ2JveCcgfSkuZmV0Y2goeyB0cmFuc2FjdGluZzogdHJ4IH0pXG5cbiAgY29uc3QgYXNzZXQgPSBhd2FpdCBjcmVhdGVBc3NldCh7XG4gICAgdGVhbV9pZDogcmVxLnRlYW0uZ2V0KCdpZCcpLFxuICAgIHVzZXJfaWQ6IHJlcS51c2VyLmdldCgnaWQnKSxcbiAgICBzb3VyY2VfaWQ6IHNvdXJjZS5nZXQoJ2lkJyksXG4gICAgc291cmNlX2lkZW50aWZpZXI6IHJlcS5ib2R5LmlkLFxuICAgIGZpbGVfbmFtZTogbWV0YS5uYW1lLFxuICAgIGZpbGVfZGF0YSxcbiAgICBjb250ZW50X3R5cGU6IF9nZXRDb250ZW50VHlwZShtZXRhLm5hbWUpXG4gIH0sIHRyeClcblxuICBhd2FpdCBhc3NldC5sb2FkKFsnc291cmNlJ10sIHsgdHJhbnNhY3Rpbmc6IHRyeCB9KVxuXG4gIHJldHVybiBBc3NldFNlcmlhbGl6ZXIocmVxLCB0cngsIGFzc2V0KVxuICBcbn1cblxuY29uc3QgX2dldENvbnRlbnRUeXBlID0gKG5hbWUpID0+IHtcbiAgY29uc3QgZXh0ID0gcGF0aC5leHRuYW1lKG5hbWUpXG4gIGNvbnN0IHR5cGUgPSBtaW1lLmxvb2t1cChleHQpXG4gIHJldHVybiB0eXBlIHx8ICd0ZXh0L3BsYWluJ1xufVxuXG5jb25zdCBjcmVhdGVSb3V0ZSA9IG5ldyBSb3V0ZSh7XG4gIG1ldGhvZDogJ3Bvc3QnLFxuICBwYXRoOiAnL2JveC9maWxlcycsXG4gIHByb2Nlc3NvclxufSlcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlUm91dGVcbiJdfQ==