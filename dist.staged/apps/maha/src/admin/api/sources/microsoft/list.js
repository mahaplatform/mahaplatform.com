'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../../server');

var _utils = require('./utils');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var client, folder_id, folder, skiptoken, q, endpoint, skip, url, result, records;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _utils.getClient)(req, trx);

          case 2:
            client = _context.sent;
            folder_id = _lodash2.default.get(req, 'query.$filter.folder_id.$eq') || 'null';
            folder = folder_id === 'null' ? '/root' : '/items/' + folder_id;
            skiptoken = _lodash2.default.get(req, 'query.$page.next');
            q = _lodash2.default.get(req.query, '$filter.q');
            endpoint = q ? '/search(q=\'' + q + '\')' : '/children';
            skip = skiptoken ? '$skiptoken=' + skiptoken : '';
            url = '/me/drive' + folder + endpoint + '?$expand=thumbnails' + skip;
            _context.next = 12;
            return client.api(url).get();

          case 12:
            result = _context.sent;
            records = result.value.map(function (entry) {
              return {
                id: entry.id,
                type: entry.file ? 'file' : 'folder',
                content_type: entry.file ? entry.file.mimeType : 'plain/text',
                thumbnail: entry.file && entry.file.mimeType.match(/image/) ? entry.thumbnails[0].medium.url : null,
                name: entry.name
              };
            });
            return _context.abrupt('return', {
              records: records,
              skip: skiptoken ? 1 : 0,
              next: result['@odata.nextLink'] ? result['@odata.nextLink'].match(/skiptoken=(.*)/)[1] : null
            });

          case 15:
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
  path: '/microsoft/files',
  processor: processor
});

exports.default = listRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsImNsaWVudCIsImZvbGRlcl9pZCIsIl8iLCJnZXQiLCJmb2xkZXIiLCJza2lwdG9rZW4iLCJxIiwicXVlcnkiLCJlbmRwb2ludCIsInNraXAiLCJ1cmwiLCJhcGkiLCJyZXN1bHQiLCJyZWNvcmRzIiwidmFsdWUiLCJtYXAiLCJpZCIsImVudHJ5IiwidHlwZSIsImZpbGUiLCJjb250ZW50X3R5cGUiLCJtaW1lVHlwZSIsInRodW1ibmFpbCIsIm1hdGNoIiwidGh1bWJuYWlscyIsIm1lZGl1bSIsIm5hbWUiLCJuZXh0IiwibGlzdFJvdXRlIiwiUm91dGUiLCJtZXRob2QiLCJwYXRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQTtBQUFBLHNGQUFZLGlCQUFPQyxHQUFQLEVBQVlDLEdBQVosRUFBaUJDLE9BQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRUssc0JBQVVGLEdBQVYsRUFBZUMsR0FBZixDQUZMOztBQUFBO0FBRVZFLGtCQUZVO0FBSVZDLHFCQUpVLEdBSUVDLGlCQUFFQyxHQUFGLENBQU1OLEdBQU4sRUFBVyw2QkFBWCxLQUE2QyxNQUovQztBQU1WTyxrQkFOVSxHQU1ESCxjQUFjLE1BQWQsR0FBdUIsT0FBdkIsZUFBMkNBLFNBTjFDO0FBUVZJLHFCQVJVLEdBUUVILGlCQUFFQyxHQUFGLENBQU1OLEdBQU4sRUFBVyxrQkFBWCxDQVJGO0FBVVZTLGFBVlUsR0FVTkosaUJBQUVDLEdBQUYsQ0FBTU4sSUFBSVUsS0FBVixFQUFpQixXQUFqQixDQVZNO0FBWVZDLG9CQVpVLEdBWUNGLHFCQUFrQkEsQ0FBbEIsV0FBMEIsV0FaM0I7QUFjVkcsZ0JBZFUsR0FjSEosNEJBQTBCQSxTQUExQixHQUF3QyxFQWRyQztBQWdCVkssZUFoQlUsaUJBZ0JRTixNQWhCUixHQWdCaUJJLFFBaEJqQiwyQkFnQitDQyxJQWhCL0M7QUFBQTtBQUFBLG1CQWtCS1QsT0FBT1csR0FBUCxDQUFXRCxHQUFYLEVBQWdCUCxHQUFoQixFQWxCTDs7QUFBQTtBQWtCVlMsa0JBbEJVO0FBcUJWQyxtQkFyQlUsR0FxQkFELE9BQU9FLEtBQVAsQ0FBYUMsR0FBYixDQUFpQjtBQUFBLHFCQUFVO0FBQ3pDQyxvQkFBSUMsTUFBTUQsRUFEK0I7QUFFekNFLHNCQUFNRCxNQUFNRSxJQUFOLEdBQWEsTUFBYixHQUFzQixRQUZhO0FBR3pDQyw4QkFBY0gsTUFBTUUsSUFBTixHQUFhRixNQUFNRSxJQUFOLENBQVdFLFFBQXhCLEdBQW1DLFlBSFI7QUFJekNDLDJCQUFXTCxNQUFNRSxJQUFOLElBQWNGLE1BQU1FLElBQU4sQ0FBV0UsUUFBWCxDQUFvQkUsS0FBcEIsQ0FBMEIsT0FBMUIsQ0FBZCxHQUFtRE4sTUFBTU8sVUFBTixDQUFpQixDQUFqQixFQUFvQkMsTUFBcEIsQ0FBMkJmLEdBQTlFLEdBQW9GLElBSnREO0FBS3pDZ0Isc0JBQU1ULE1BQU1TO0FBTDZCLGVBQVY7QUFBQSxhQUFqQixDQXJCQTtBQUFBLDZDQTZCVDtBQUNMYiw4QkFESztBQUVMSixvQkFBTUosWUFBWSxDQUFaLEdBQWdCLENBRmpCO0FBR0xzQixvQkFBTWYsT0FBTyxpQkFBUCxJQUE0QkEsT0FBTyxpQkFBUCxFQUEwQlcsS0FBMUIsQ0FBZ0MsZ0JBQWhDLEVBQWtELENBQWxELENBQTVCLEdBQW1GO0FBSHBGLGFBN0JTOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUFxQ0EsSUFBTUssWUFBWSxJQUFJQyxhQUFKLENBQVU7QUFDMUJDLFVBQVEsS0FEa0I7QUFFMUJDLFFBQU0sa0JBRm9CO0FBRzFCbkM7QUFIMEIsQ0FBVixDQUFsQjs7a0JBTWVnQyxTIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NlcnZlcidcbmltcG9ydCB7IGdldENsaWVudCB9IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5cbmNvbnN0IHByb2Nlc3NvciA9IGFzeW5jIChyZXEsIHRyeCwgb3B0aW9ucykgPT4ge1xuXG4gIGNvbnN0IGNsaWVudCA9IGF3YWl0IGdldENsaWVudChyZXEsIHRyeClcblxuICBjb25zdCBmb2xkZXJfaWQgPSBfLmdldChyZXEsICdxdWVyeS4kZmlsdGVyLmZvbGRlcl9pZC4kZXEnKSB8fCAnbnVsbCdcblxuICBjb25zdCBmb2xkZXIgPSBmb2xkZXJfaWQgPT09ICdudWxsJyA/ICcvcm9vdCcgOiBgL2l0ZW1zLyR7Zm9sZGVyX2lkfWBcblxuICBjb25zdCBza2lwdG9rZW4gPSBfLmdldChyZXEsICdxdWVyeS4kcGFnZS5uZXh0JylcblxuICBjb25zdCBxID0gXy5nZXQocmVxLnF1ZXJ5LCAnJGZpbHRlci5xJylcblxuICBjb25zdCBlbmRwb2ludCA9IHEgPyBgL3NlYXJjaChxPScke3F9JylgIDogJy9jaGlsZHJlbidcblxuICBjb25zdCBza2lwID0gc2tpcHRva2VuID8gYCRza2lwdG9rZW49JHtza2lwdG9rZW59YCA6ICcnXG5cbiAgY29uc3QgdXJsID0gYC9tZS9kcml2ZSR7Zm9sZGVyfSR7ZW5kcG9pbnR9PyRleHBhbmQ9dGh1bWJuYWlscyR7c2tpcH1gXG5cbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2xpZW50LmFwaSh1cmwpLmdldCgpXG5cblxuICBjb25zdCByZWNvcmRzID0gcmVzdWx0LnZhbHVlLm1hcChlbnRyeSA9PiAoe1xuICAgIGlkOiBlbnRyeS5pZCxcbiAgICB0eXBlOiBlbnRyeS5maWxlID8gJ2ZpbGUnIDogJ2ZvbGRlcicsXG4gICAgY29udGVudF90eXBlOiBlbnRyeS5maWxlID8gZW50cnkuZmlsZS5taW1lVHlwZSA6ICdwbGFpbi90ZXh0JyxcbiAgICB0aHVtYm5haWw6IGVudHJ5LmZpbGUgJiYgZW50cnkuZmlsZS5taW1lVHlwZS5tYXRjaCgvaW1hZ2UvKSA/IGVudHJ5LnRodW1ibmFpbHNbMF0ubWVkaXVtLnVybCA6IG51bGwsXG4gICAgbmFtZTogZW50cnkubmFtZVxuICB9KSlcblxuICByZXR1cm4ge1xuICAgIHJlY29yZHMsXG4gICAgc2tpcDogc2tpcHRva2VuID8gMSA6IDAsXG4gICAgbmV4dDogcmVzdWx0WydAb2RhdGEubmV4dExpbmsnXSA/IHJlc3VsdFsnQG9kYXRhLm5leHRMaW5rJ10ubWF0Y2goL3NraXB0b2tlbj0oLiopLylbMV0gOiBudWxsXG4gIH1cblxufVxuXG5jb25zdCBsaXN0Um91dGUgPSBuZXcgUm91dGUoe1xuICBtZXRob2Q6ICdnZXQnLFxuICBwYXRoOiAnL21pY3Jvc29mdC9maWxlcycsXG4gIHByb2Nlc3NvclxufSlcblxuZXhwb3J0IGRlZmF1bHQgbGlzdFJvdXRlXG4iXX0=