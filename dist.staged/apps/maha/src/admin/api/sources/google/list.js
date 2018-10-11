'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = require('bluebird');

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../../server');

var _utils = require('./utils');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var drive, folder_id, q, folder, pageToken, result, records;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _utils.getClient)(req, trx);

          case 2:
            drive = _context.sent;
            folder_id = _lodash2.default.get(req, 'query.$filter.folder_id.$eq');
            q = _lodash2.default.get(req, 'query.$filter.q');
            folder = folder_id === 'null' ? 'root' : folder_id;
            pageToken = _lodash2.default.get(req, 'query.$page.next');
            _context.next = 9;
            return (0, _bluebird.promisify)(drive.files.list)({
              supportsTeamDrives: true,
              includeTeamDriveItems: true,
              pageSize: 100,
              pageToken: pageToken,
              orderBy: q ? null : 'folder,name',
              q: q ? 'fullText contains \'' + q + '\'' : '\'' + folder + '\' in parents',
              spaces: 'drive',
              fields: 'nextPageToken, files(id, name, mimeType, thumbnailLink)'
            });

          case 9:
            result = _context.sent;
            records = result.data.files.map(function (entry) {
              return {
                id: entry.id,
                name: entry.name,
                type: entry.mimeType.match(/folder/) ? 'folder' : 'file',
                thumbnail: entry.mimeType.match(/image/) ? entry.thumbnailLink : null,
                content_type: entry.mimeType
              };
            });
            return _context.abrupt('return', {
              next: result.data.nextPageToken || null,
              skip: pageToken ? 1 : 0,
              records: records
            });

          case 12:
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

var listRoute = new _server.Route({
  method: 'get',
  path: '/google/files',
  processor: processor
});

exports.default = listRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsImRyaXZlIiwiZm9sZGVyX2lkIiwiXyIsImdldCIsInEiLCJmb2xkZXIiLCJwYWdlVG9rZW4iLCJmaWxlcyIsImxpc3QiLCJzdXBwb3J0c1RlYW1Ecml2ZXMiLCJpbmNsdWRlVGVhbURyaXZlSXRlbXMiLCJwYWdlU2l6ZSIsIm9yZGVyQnkiLCJzcGFjZXMiLCJmaWVsZHMiLCJyZXN1bHQiLCJyZWNvcmRzIiwiZGF0YSIsIm1hcCIsImlkIiwiZW50cnkiLCJuYW1lIiwidHlwZSIsIm1pbWVUeXBlIiwibWF0Y2giLCJ0aHVtYm5haWwiLCJ0aHVtYm5haWxMaW5rIiwiY29udGVudF90eXBlIiwibmV4dCIsIm5leHRQYWdlVG9rZW4iLCJza2lwIiwibGlzdFJvdXRlIiwiUm91dGUiLCJtZXRob2QiLCJwYXRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBLElBQU1BO0FBQUEsc0ZBQVksaUJBQU9DLEdBQVAsRUFBWUMsR0FBWixFQUFpQkMsT0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFFSSxzQkFBVUYsR0FBVixFQUFlQyxHQUFmLENBRko7O0FBQUE7QUFFVkUsaUJBRlU7QUFJVkMscUJBSlUsR0FJRUMsaUJBQUVDLEdBQUYsQ0FBTU4sR0FBTixFQUFXLDZCQUFYLENBSkY7QUFNVk8sYUFOVSxHQU1ORixpQkFBRUMsR0FBRixDQUFNTixHQUFOLEVBQVcsaUJBQVgsQ0FOTTtBQVFWUSxrQkFSVSxHQVFBSixjQUFjLE1BQWYsR0FBeUIsTUFBekIsR0FBa0NBLFNBUmpDO0FBVVZLLHFCQVZVLEdBVUVKLGlCQUFFQyxHQUFGLENBQU1OLEdBQU4sRUFBVyxrQkFBWCxDQVZGO0FBQUE7QUFBQSxtQkFZSyx5QkFBa0JHLE1BQU1PLEtBQU4sQ0FBWUMsSUFBOUIsRUFBb0M7QUFDdkRDLGtDQUFvQixJQURtQztBQUV2REMscUNBQXVCLElBRmdDO0FBR3ZEQyx3QkFBVSxHQUg2QztBQUl2REwsa0NBSnVEO0FBS3ZETSx1QkFBU1IsSUFBSSxJQUFKLEdBQVcsYUFMbUM7QUFNdkRBLGlCQUFHQSw2QkFBMEJBLENBQTFCLGlCQUFxQ0MsTUFBckMsa0JBTm9EO0FBT3ZEUSxzQkFBUSxPQVArQztBQVF2REMsc0JBQVE7QUFSK0MsYUFBcEMsQ0FaTDs7QUFBQTtBQVlWQyxrQkFaVTtBQXVCVkMsbUJBdkJVLEdBdUJBRCxPQUFPRSxJQUFQLENBQVlWLEtBQVosQ0FBa0JXLEdBQWxCLENBQXNCO0FBQUEscUJBQVU7QUFDOUNDLG9CQUFJQyxNQUFNRCxFQURvQztBQUU5Q0Usc0JBQU1ELE1BQU1DLElBRmtDO0FBRzlDQyxzQkFBTUYsTUFBTUcsUUFBTixDQUFlQyxLQUFmLENBQXFCLFFBQXJCLElBQWlDLFFBQWpDLEdBQTRDLE1BSEo7QUFJOUNDLDJCQUFXTCxNQUFNRyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsT0FBckIsSUFBZ0NKLE1BQU1NLGFBQXRDLEdBQXNELElBSm5CO0FBSzlDQyw4QkFBY1AsTUFBTUc7QUFMMEIsZUFBVjtBQUFBLGFBQXRCLENBdkJBO0FBQUEsNkNBK0JUO0FBQ0xLLG9CQUFNYixPQUFPRSxJQUFQLENBQVlZLGFBQVosSUFBNkIsSUFEOUI7QUFFTEMsb0JBQU14QixZQUFZLENBQVosR0FBZ0IsQ0FGakI7QUFHTFU7QUFISyxhQS9CUzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFaOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBdUNBLElBQU1lLFlBQVksSUFBSUMsYUFBSixDQUFVO0FBQzFCQyxVQUFRLEtBRGtCO0FBRTFCQyxRQUFNLGVBRm9CO0FBRzFCdEM7QUFIMEIsQ0FBVixDQUFsQjs7a0JBTWVtQyxTIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NlcnZlcidcbmltcG9ydCB7IGdldENsaWVudCB9IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5cbmNvbnN0IHByb2Nlc3NvciA9IGFzeW5jIChyZXEsIHRyeCwgb3B0aW9ucykgPT4ge1xuXG4gIGNvbnN0IGRyaXZlID0gYXdhaXQgZ2V0Q2xpZW50KHJlcSwgdHJ4KVxuXG4gIGNvbnN0IGZvbGRlcl9pZCA9IF8uZ2V0KHJlcSwgJ3F1ZXJ5LiRmaWx0ZXIuZm9sZGVyX2lkLiRlcScpXG5cbiAgY29uc3QgcSA9IF8uZ2V0KHJlcSwgJ3F1ZXJ5LiRmaWx0ZXIucScpXG5cbiAgY29uc3QgZm9sZGVyID0gKGZvbGRlcl9pZCA9PT0gJ251bGwnKSA/ICdyb290JyA6IGZvbGRlcl9pZFxuXG4gIGNvbnN0IHBhZ2VUb2tlbiA9IF8uZ2V0KHJlcSwgJ3F1ZXJ5LiRwYWdlLm5leHQnKVxuXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IFByb21pc2UucHJvbWlzaWZ5KGRyaXZlLmZpbGVzLmxpc3QpKHtcbiAgICBzdXBwb3J0c1RlYW1Ecml2ZXM6IHRydWUsXG4gICAgaW5jbHVkZVRlYW1Ecml2ZUl0ZW1zOiB0cnVlLFxuICAgIHBhZ2VTaXplOiAxMDAsXG4gICAgcGFnZVRva2VuLFxuICAgIG9yZGVyQnk6IHEgPyBudWxsIDogJ2ZvbGRlcixuYW1lJyxcbiAgICBxOiBxID8gYGZ1bGxUZXh0IGNvbnRhaW5zICcke3F9J2AgOiBgJyR7Zm9sZGVyfScgaW4gcGFyZW50c2AsXG4gICAgc3BhY2VzOiAnZHJpdmUnLFxuICAgIGZpZWxkczogJ25leHRQYWdlVG9rZW4sIGZpbGVzKGlkLCBuYW1lLCBtaW1lVHlwZSwgdGh1bWJuYWlsTGluayknXG4gIH0pXG5cbiAgY29uc3QgcmVjb3JkcyA9IHJlc3VsdC5kYXRhLmZpbGVzLm1hcChlbnRyeSA9PiAoe1xuICAgIGlkOiBlbnRyeS5pZCxcbiAgICBuYW1lOiBlbnRyeS5uYW1lLFxuICAgIHR5cGU6IGVudHJ5Lm1pbWVUeXBlLm1hdGNoKC9mb2xkZXIvKSA/ICdmb2xkZXInIDogJ2ZpbGUnLFxuICAgIHRodW1ibmFpbDogZW50cnkubWltZVR5cGUubWF0Y2goL2ltYWdlLykgPyBlbnRyeS50aHVtYm5haWxMaW5rIDogbnVsbCxcbiAgICBjb250ZW50X3R5cGU6IGVudHJ5Lm1pbWVUeXBlXG4gIH0pKVxuXG4gIHJldHVybiB7XG4gICAgbmV4dDogcmVzdWx0LmRhdGEubmV4dFBhZ2VUb2tlbiB8fCBudWxsLFxuICAgIHNraXA6IHBhZ2VUb2tlbiA/IDEgOiAwLFxuICAgIHJlY29yZHNcbiAgfVxuXG59XG5cbmNvbnN0IGxpc3RSb3V0ZSA9IG5ldyBSb3V0ZSh7XG4gIG1ldGhvZDogJ2dldCcsXG4gIHBhdGg6ICcvZ29vZ2xlL2ZpbGVzJyxcbiAgcHJvY2Vzc29yXG59KVxuXG5leHBvcnQgZGVmYXVsdCBsaXN0Um91dGVcbiJdfQ==