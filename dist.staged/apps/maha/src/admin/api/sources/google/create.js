'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _asset_serializer = require('../../../../serializers/asset_serializer');

var _asset_serializer2 = _interopRequireDefault(_asset_serializer);

var _server = require('../../../../server');

var _utils = require('./utils');

var _mimeTypes = require('mime-types');

var _mimeTypes2 = _interopRequireDefault(_mimeTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, trx, options) {
    var drive, meta, _export, _get, file, source, asset;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _utils.getClient)(req, trx);

          case 2:
            drive = _context3.sent;
            _context3.next = 5;
            return (0, _bluebird.promisify)(drive.files.get)({
              fileId: req.body.id,
              fields: 'id, name, mimeType, webViewLink'
            });

          case 5:
            meta = _context3.sent;

            _export = function () {
              var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(fileId, mime_type) {
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return (0, _bluebird.promisify)(drive.files.export)({
                          fileId: fileId,
                          mimeType: _getMime(mime_type)
                        }, {
                          responseType: 'stream'
                        });

                      case 2:
                        return _context.abrupt('return', _context.sent);

                      case 3:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function _export(_x4, _x5) {
                return _ref2.apply(this, arguments);
              };
            }();

            _get = function () {
              var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(fileId) {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return (0, _bluebird.promisify)(drive.files.get)({
                          fileId: fileId,
                          alt: 'media'
                        }, {
                          responseType: 'stream'
                        });

                      case 2:
                        return _context2.abrupt('return', _context2.sent);

                      case 3:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, undefined);
              }));

              return function _get(_x6) {
                return _ref3.apply(this, arguments);
              };
            }();

            if (!meta.data.mimeType.match(/google/)) {
              _context3.next = 14;
              break;
            }

            _context3.next = 11;
            return _export(req.body.id, meta.data.mimeType);

          case 11:
            _context3.t0 = _context3.sent;
            _context3.next = 17;
            break;

          case 14:
            _context3.next = 16;
            return _get(req.body.id);

          case 16:
            _context3.t0 = _context3.sent;

          case 17:
            file = _context3.t0;
            _context3.next = 20;
            return _server.Source.where({ text: 'google' }).fetch({ transacting: trx });

          case 20:
            source = _context3.sent;
            _context3.next = 23;
            return (0, _server.createAsset)({
              team_id: req.team.get('id'),
              user_id: req.user.get('id'),
              source_id: source.get('id'),
              source_identifier: req.body.id,
              source_url: meta.data.mimeType.match(/google/) ? meta.data.webViewLink : null,
              file_name: _withExt(meta.data.name, meta.data.mimeType),
              file_data: file.data,
              content_type: file.headers['content-type']
            }, trx);

          case 23:
            asset = _context3.sent;
            _context3.next = 26;
            return asset.load(['source'], { transacting: trx });

          case 26:
            return _context3.abrupt('return', (0, _asset_serializer2.default)(req, trx, asset));

          case 27:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function processor(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _getMime = function _getMime(type) {

  if (type === 'application/vnd.google-apps.spreadsheet') {
    return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  } else if (type === 'application/vnd.google-apps.document') {
    return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  } else if (type === 'application/vnd.google-apps.presentation') {
    return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
  } else if (type === 'application/vnd.google-apps.drawing') {
    return 'image/jpeg';
  } else {
    return type;
  }
};

var _withExt = function _withExt(filename, type) {

  var matches = filename.match(/(.*)\.(.*)/);

  var basename = matches === null ? filename : matches[1];

  return basename + '.' + _getExt(type);
};

var _getExt = function _getExt(type) {

  if (type === 'application/vnd.google-apps.spreadsheet') {
    return 'xlsx';
  } else if (type === 'application/vnd.google-apps.document') {
    return 'docx';
  } else if (type === 'application/vnd.google-apps.presentation') {
    return 'pptx';
  } else if (type === 'application/vnd.google-apps.drawing') {
    return 'jpg';
  } else {
    return _mimeTypes2.default.extension(type);
  }
};

var listRoute = new _server.Route({
  method: 'post',
  path: '/google/files',
  processor: processor
});

exports.default = listRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsImRyaXZlIiwiZmlsZXMiLCJnZXQiLCJmaWxlSWQiLCJib2R5IiwiaWQiLCJmaWVsZHMiLCJtZXRhIiwiX2V4cG9ydCIsIm1pbWVfdHlwZSIsImV4cG9ydCIsIm1pbWVUeXBlIiwiX2dldE1pbWUiLCJyZXNwb25zZVR5cGUiLCJfZ2V0IiwiYWx0IiwiZGF0YSIsIm1hdGNoIiwiZmlsZSIsIlNvdXJjZSIsIndoZXJlIiwidGV4dCIsImZldGNoIiwidHJhbnNhY3RpbmciLCJzb3VyY2UiLCJ0ZWFtX2lkIiwidGVhbSIsInVzZXJfaWQiLCJ1c2VyIiwic291cmNlX2lkIiwic291cmNlX2lkZW50aWZpZXIiLCJzb3VyY2VfdXJsIiwid2ViVmlld0xpbmsiLCJmaWxlX25hbWUiLCJfd2l0aEV4dCIsIm5hbWUiLCJmaWxlX2RhdGEiLCJjb250ZW50X3R5cGUiLCJoZWFkZXJzIiwiYXNzZXQiLCJsb2FkIiwidHlwZSIsImZpbGVuYW1lIiwibWF0Y2hlcyIsImJhc2VuYW1lIiwiX2dldEV4dCIsIm1pbWUiLCJleHRlbnNpb24iLCJsaXN0Um91dGUiLCJSb3V0ZSIsIm1ldGhvZCIsInBhdGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQTtBQUFBLHNGQUFZLGtCQUFPQyxHQUFQLEVBQVlDLEdBQVosRUFBaUJDLE9BQWpCO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUVJLHNCQUFVRixHQUFWLEVBQWVDLEdBQWYsQ0FGSjs7QUFBQTtBQUVWRSxpQkFGVTtBQUFBO0FBQUEsbUJBSUcseUJBQWtCQSxNQUFNQyxLQUFOLENBQVlDLEdBQTlCLEVBQW1DO0FBQ3BEQyxzQkFBUU4sSUFBSU8sSUFBSixDQUFTQyxFQURtQztBQUVwREMsc0JBQVE7QUFGNEMsYUFBbkMsQ0FKSDs7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Y2VzQ29udGVudCI6WyJpbXBvcnQgQXNzZXRTZXJpYWxpemVyIGZyb20gJy4uLy4uLy4uLy4uL3NlcmlhbGl6ZXJzL2Fzc2V0X3NlcmlhbGl6ZXInXG5pbXBvcnQgeyBjcmVhdGVBc3NldCwgUm91dGUsIFNvdXJjZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NlcnZlcidcbmltcG9ydCB7IGdldENsaWVudCB9IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgbWltZSBmcm9tICdtaW1lLXR5cGVzJ1xuXG5jb25zdCBwcm9jZXNzb3IgPSBhc3luYyAocmVxLCB0cngsIG9wdGlvbnMpID0+IHtcblxuICBjb25zdCBkcml2ZSA9IGF3YWl0IGdldENsaWVudChyZXEsIHRyeClcblxuICBjb25zdCBtZXRhID0gYXdhaXQgUHJvbWlzZS5wcm9taXNpZnkoZHJpdmUuZmlsZXMuZ2V0KSh7XG4gICAgZmlsZUlkOiByZXEuYm9keS5pZCxcbiAgICBmaWVsZHM6ICdpZCwgbmFtZSwgbWltZVR5cGUsIHdlYlZpZXdMaW5rJ1xuICB9KVxuXG4gIGNvbnN0IF9leHBvcnQgPSBhc3luYyAoZmlsZUlkLCBtaW1lX3R5cGUpID0+IHtcblxuICAgIHJldHVybiBhd2FpdCBQcm9taXNlLnByb21pc2lmeShkcml2ZS5maWxlcy5leHBvcnQpKHtcbiAgICAgIGZpbGVJZCxcbiAgICAgIG1pbWVUeXBlOiBfZ2V0TWltZShtaW1lX3R5cGUpXG4gICAgfSx7XG4gICAgICByZXNwb25zZVR5cGU6ICdzdHJlYW0nXG4gICAgfSlcblxuICB9XG5cbiAgY29uc3QgX2dldCA9IGFzeW5jIChmaWxlSWQpID0+IHtcblxuICAgIHJldHVybiBhd2FpdCBQcm9taXNlLnByb21pc2lmeShkcml2ZS5maWxlcy5nZXQpKHtcbiAgICAgIGZpbGVJZCxcbiAgICAgIGFsdDogJ21lZGlhJ1xuICAgIH0se1xuICAgICAgcmVzcG9uc2VUeXBlOiAnc3RyZWFtJ1xuICAgIH0pXG5cbiAgfVxuXG4gIGNvbnN0IGZpbGUgPSBtZXRhLmRhdGEubWltZVR5cGUubWF0Y2goL2dvb2dsZS8pID8gYXdhaXQgX2V4cG9ydChyZXEuYm9keS5pZCwgbWV0YS5kYXRhLm1pbWVUeXBlKSA6IGF3YWl0IF9nZXQocmVxLmJvZHkuaWQpXG5cbiAgY29uc3Qgc291cmNlID0gYXdhaXQgU291cmNlLndoZXJlKHsgdGV4dDogJ2dvb2dsZScgfSkuZmV0Y2goeyB0cmFuc2FjdGluZzogdHJ4IH0pXG5cbiAgY29uc3QgYXNzZXQgPSBhd2FpdCBjcmVhdGVBc3NldCh7XG4gICAgdGVhbV9pZDogcmVxLnRlYW0uZ2V0KCdpZCcpLFxuICAgIHVzZXJfaWQ6IHJlcS51c2VyLmdldCgnaWQnKSxcbiAgICBzb3VyY2VfaWQ6IHNvdXJjZS5nZXQoJ2lkJyksXG4gICAgc291cmNlX2lkZW50aWZpZXI6IHJlcS5ib2R5LmlkLFxuICAgIHNvdXJjZV91cmw6IG1ldGEuZGF0YS5taW1lVHlwZS5tYXRjaCgvZ29vZ2xlLykgPyBtZXRhLmRhdGEud2ViVmlld0xpbmsgOiBudWxsLFxuICAgIGZpbGVfbmFtZTogX3dpdGhFeHQobWV0YS5kYXRhLm5hbWUsIG1ldGEuZGF0YS5taW1lVHlwZSksXG4gICAgZmlsZV9kYXRhOiBmaWxlLmRhdGEsXG4gICAgY29udGVudF90eXBlOiBmaWxlLmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddXG4gIH0sIHRyeClcblxuICBhd2FpdCBhc3NldC5sb2FkKFsnc291cmNlJ10sIHsgdHJhbnNhY3Rpbmc6IHRyeCB9KVxuXG4gIHJldHVybiBBc3NldFNlcmlhbGl6ZXIocmVxLCB0cngsIGFzc2V0KVxuXG59XG5cbmNvbnN0IF9nZXRNaW1lID0gKHR5cGUpID0+IHtcblxuICBpZih0eXBlID09PSAnYXBwbGljYXRpb24vdm5kLmdvb2dsZS1hcHBzLnNwcmVhZHNoZWV0Jykge1xuICAgIHJldHVybiAnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnNwcmVhZHNoZWV0bWwuc2hlZXQnXG4gIH0gZWxzZSBpZih0eXBlID09PSAnYXBwbGljYXRpb24vdm5kLmdvb2dsZS1hcHBzLmRvY3VtZW50Jykge1xuICAgIHJldHVybiAnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LndvcmRwcm9jZXNzaW5nbWwuZG9jdW1lbnQnXG4gIH0gZWxzZSBpZih0eXBlID09PSAnYXBwbGljYXRpb24vdm5kLmdvb2dsZS1hcHBzLnByZXNlbnRhdGlvbicpIHtcbiAgICByZXR1cm4gJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC5wcmVzZW50YXRpb25tbC5wcmVzZW50YXRpb24nXG4gIH0gZWxzZSBpZih0eXBlID09PSAnYXBwbGljYXRpb24vdm5kLmdvb2dsZS1hcHBzLmRyYXdpbmcnKSB7XG4gICAgcmV0dXJuICdpbWFnZS9qcGVnJ1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0eXBlXG4gIH1cblxuXG5cbn1cblxuY29uc3QgX3dpdGhFeHQgPSAoZmlsZW5hbWUsIHR5cGUpID0+IHtcblxuICBjb25zdCBtYXRjaGVzID0gZmlsZW5hbWUubWF0Y2goLyguKilcXC4oLiopLylcblxuICBjb25zdCBiYXNlbmFtZSA9IChtYXRjaGVzID09PSBudWxsKSA/IGZpbGVuYW1lIDogbWF0Y2hlc1sxXVxuXG4gIHJldHVybiBgJHtiYXNlbmFtZX0uJHtfZ2V0RXh0KHR5cGUpfWBcblxufVxuXG5jb25zdCBfZ2V0RXh0ID0gKHR5cGUpID0+IHtcblxuICBpZih0eXBlID09PSAnYXBwbGljYXRpb24vdm5kLmdvb2dsZS1hcHBzLnNwcmVhZHNoZWV0Jykge1xuICAgIHJldHVybiAneGxzeCdcbiAgfSBlbHNlIGlmKHR5cGUgPT09ICdhcHBsaWNhdGlvbi92bmQuZ29vZ2xlLWFwcHMuZG9jdW1lbnQnKSB7XG4gICAgcmV0dXJuICdkb2N4J1xuICB9IGVsc2UgaWYodHlwZSA9PT0gJ2FwcGxpY2F0aW9uL3ZuZC5nb29nbGUtYXBwcy5wcmVzZW50YXRpb24nKSB7XG4gICAgcmV0dXJuICdwcHR4J1xuICB9IGVsc2UgaWYodHlwZSA9PT0gJ2FwcGxpY2F0aW9uL3ZuZC5nb29nbGUtYXBwcy5kcmF3aW5nJykge1xuICAgIHJldHVybiAnanBnJ1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBtaW1lLmV4dGVuc2lvbih0eXBlKVxuICB9XG5cbn1cblxuY29uc3QgbGlzdFJvdXRlID0gbmV3IFJvdXRlKHtcbiAgbWV0aG9kOiAncG9zdCcsXG4gIHBhdGg6ICcvZ29vZ2xlL2ZpbGVzJyxcbiAgcHJvY2Vzc29yXG59KVxuXG5leHBvcnQgZGVmYXVsdCBsaXN0Um91dGVcbiJdfQ==