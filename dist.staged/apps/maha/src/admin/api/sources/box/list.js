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

var _mimeTypes = require('mime-types');

var _mimeTypes2 = _interopRequireDefault(_mimeTypes);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, trx, options) {
    var client, fields, _list, _search, q, next, result, records;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _utils.getClient)(req, trx);

          case 2:
            client = _context3.sent;
            fields = 'name,modified_at,size,url,permissions,sync_state';

            _list = function () {
              var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(offset) {
                var result, next;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return client.folders.getItems(0, { fields: fields, offset: offset, limit: 20 });

                      case 2:
                        result = _context.sent;
                        next = result.offset + result.limit;
                        return _context.abrupt('return', {
                          entries: result.entries,
                          next: next - 1 < result.total_count ? next : null
                        });

                      case 5:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function _list(_x4) {
                return _ref2.apply(this, arguments);
              };
            }();

            _search = function () {
              var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(query, next) {
                var result;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return client.search.query(query, { fields: fields, offset: 0, limit: 20 });

                      case 2:
                        result = _context2.sent;
                        return _context2.abrupt('return', {
                          entries: result.entries
                        });

                      case 4:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, undefined);
              }));

              return function _search(_x5, _x6) {
                return _ref3.apply(this, arguments);
              };
            }();

            q = _lodash2.default.get(req.query, '$filter.q');
            next = _lodash2.default.get(req, 'query.$page.next');

            if (!q) {
              _context3.next = 14;
              break;
            }

            _context3.next = 11;
            return _search(q, next);

          case 11:
            _context3.t0 = _context3.sent;
            _context3.next = 17;
            break;

          case 14:
            _context3.next = 16;
            return _list(next);

          case 16:
            _context3.t0 = _context3.sent;

          case 17:
            result = _context3.t0;
            records = result.entries.map(function (entry) {

              var content_type = _getContentType(entry.name);

              return {
                id: entry.id,
                type: entry.type,
                name: entry.name,
                thumbnail: content_type.match(/image/) ? '/admin/box/preview?path=' + entry.id : null,
                content_type: content_type
              };
            });
            return _context3.abrupt('return', {
              records: records,
              next: result.next,
              skip: next ? 1 : 0
            });

          case 20:
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

var _getContentType = function _getContentType(name) {
  var ext = _path2.default.extname(name);
  var type = _mimeTypes2.default.lookup(ext);
  return type || 'text/plain';
};

var listRoute = new _server.Route({
  method: 'get',
  path: '/box/files',
  processor: processor
});

exports.default = listRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsImNsaWVudCIsImZpZWxkcyIsIl9saXN0Iiwib2Zmc2V0IiwiZm9sZGVycyIsImdldEl0ZW1zIiwibGltaXQiLCJyZXN1bHQiLCJuZXh0IiwiZW50cmllcyIsInRvdGFsX2NvdW50IiwiX3NlYXJjaCIsInF1ZXJ5Iiwic2VhcmNoIiwicSIsIl8iLCJnZXQiLCJyZWNvcmRzIiwibWFwIiwiY29udGVudF90eXBlIiwiX2dldENvbnRlbnRUeXBlIiwiZW50cnkiLCJuYW1lIiwiaWQiLCJ0eXBlIiwidGh1bWJuYWlsIiwibWF0Y2giLCJza2lwIiwiZXh0IiwicGF0aCIsImV4dG5hbWUiLCJtaW1lIiwibG9va3VwIiwibGlzdFJvdXRlIiwiUm91dGUiLCJtZXRob2QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQTtBQUFBLHNGQUFZLGtCQUFPQyxHQUFQLEVBQVlDLEdBQVosRUFBaUJDLE9BQWpCO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUVLLHNCQUFVRixHQUFWLEVBQWVDLEdBQWYsQ0FGTDs7QUFBQTtBQUVWRSxrQkFGVTtBQUlWQyxrQkFKVSxHQUlELGtEQUpDOztBQU1WQyxpQkFOVTtBQUFBLG1HQU1GLGlCQUFPQyxNQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsK0JBRVNILE9BQU9JLE9BQVAsQ0FBZUMsUUFBZixDQUF3QixDQUF4QixFQUEyQixFQUFFSixjQUFGLEVBQVVFLGNBQVYsRUFBa0JHLE9BQU8sRUFBekIsRUFBM0IsQ0FGVDs7QUFBQTtBQUVOQyw4QkFGTTtBQUlOQyw0QkFKTSxHQUlDRCxPQUFPSixNQUFQLEdBQWdCSSxPQUFPRCxLQUp4QjtBQUFBLHlEQU1MO0FBQ0xHLG1DQUFTRixPQUFPRSxPQURYO0FBRUxELGdDQUFRQSxPQUFPLENBQVIsR0FBYUQsT0FBT0csV0FBckIsR0FBb0NGLElBQXBDLEdBQTJDO0FBRjVDLHlCQU5LOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBTkU7O0FBQUEsOEJBTVZOLEtBTlU7QUFBQTtBQUFBO0FBQUE7O0FBbUJWUyxtQkFuQlU7QUFBQSxtR0FtQkEsa0JBQU9DLEtBQVAsRUFBY0osSUFBZDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLCtCQUVPUixPQUFPYSxNQUFQLENBQWNELEtBQWQsQ0FBb0JBLEtBQXBCLEVBQTJCLEVBQUVYLGNBQUYsRUFBVUUsUUFBUSxDQUFsQixFQUFxQkcsT0FBTyxFQUE1QixFQUEzQixDQUZQOztBQUFBO0FBRVJDLDhCQUZRO0FBQUEsMERBSVA7QUFDTEUsbUNBQVNGLE9BQU9FO0FBRFgseUJBSk87O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFuQkE7O0FBQUEsOEJBbUJWRSxPQW5CVTtBQUFBO0FBQUE7QUFBQTs7QUE2QlZHLGFBN0JVLEdBNkJOQyxpQkFBRUMsR0FBRixDQUFNbkIsSUFBSWUsS0FBVixFQUFpQixXQUFqQixDQTdCTTtBQStCVkosZ0JBL0JVLEdBK0JITyxpQkFBRUMsR0FBRixDQUFNbkIsR0FBTixFQUFXLGtCQUFYLENBL0JHOztBQUFBLGlCQWlDRGlCLENBakNDO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsbUJBaUNTSCxRQUFRRyxDQUFSLEVBQVdOLElBQVgsQ0FqQ1Q7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLG1CQWlDa0NOLE1BQU1NLElBQU4sQ0FqQ2xDOztBQUFBO0FBQUE7O0FBQUE7QUFpQ1ZELGtCQWpDVTtBQW1DVlUsbUJBbkNVLEdBbUNBVixPQUFPRSxPQUFQLENBQWVTLEdBQWYsQ0FBbUIsaUJBQVM7O0FBRTFDLGtCQUFNQyxlQUFlQyxnQkFBZ0JDLE1BQU1DLElBQXRCLENBQXJCOztBQUVBLHFCQUFPO0FBQ0xDLG9CQUFJRixNQUFNRSxFQURMO0FBRUxDLHNCQUFNSCxNQUFNRyxJQUZQO0FBR0xGLHNCQUFNRCxNQUFNQyxJQUhQO0FBSUxHLDJCQUFXTixhQUFhTyxLQUFiLENBQW1CLE9BQW5CLGlDQUF5REwsTUFBTUUsRUFBL0QsR0FBcUUsSUFKM0U7QUFLTEo7QUFMSyxlQUFQO0FBUUQsYUFaZSxDQW5DQTtBQUFBLDhDQWlEVDtBQUNMRiw4QkFESztBQUVMVCxvQkFBTUQsT0FBT0MsSUFGUjtBQUdMbUIsb0JBQU1uQixPQUFPLENBQVAsR0FBVztBQUhaLGFBakRTOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUF5REEsSUFBTVksa0JBQWtCLFNBQWxCQSxlQUFrQixDQUFDRSxJQUFELEVBQVU7QUFDaEMsTUFBTU0sTUFBTUMsZUFBS0MsT0FBTCxDQUFhUixJQUFiLENBQVo7QUFDQSxNQUFNRSxPQUFPTyxvQkFBS0MsTUFBTCxDQUFZSixHQUFaLENBQWI7QUFDQSxTQUFPSixRQUFRLFlBQWY7QUFDRCxDQUpEOztBQU1BLElBQU1TLFlBQVksSUFBSUMsYUFBSixDQUFVO0FBQzFCQyxVQUFRLEtBRGtCO0FBRTFCTixRQUFNLFlBRm9CO0FBRzFCakM7QUFIMEIsQ0FBVixDQUFsQjs7a0JBTWVxQyxTIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NlcnZlcidcbmltcG9ydCB7IGdldENsaWVudCB9IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgbWltZSBmcm9tICdtaW1lLXR5cGVzJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCdcblxuY29uc3QgcHJvY2Vzc29yID0gYXN5bmMgKHJlcSwgdHJ4LCBvcHRpb25zKSA9PiB7XG5cbiAgY29uc3QgY2xpZW50ID0gYXdhaXQgZ2V0Q2xpZW50KHJlcSwgdHJ4KVxuXG4gIGNvbnN0IGZpZWxkcyA9ICduYW1lLG1vZGlmaWVkX2F0LHNpemUsdXJsLHBlcm1pc3Npb25zLHN5bmNfc3RhdGUnXG5cbiAgY29uc3QgX2xpc3QgPSBhc3luYyAob2Zmc2V0KSA9PiB7XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjbGllbnQuZm9sZGVycy5nZXRJdGVtcygwLCB7IGZpZWxkcywgb2Zmc2V0LCBsaW1pdDogMjAgfSlcblxuICAgIGNvbnN0IG5leHQgPSByZXN1bHQub2Zmc2V0ICsgcmVzdWx0LmxpbWl0XG5cbiAgICByZXR1cm4ge1xuICAgICAgZW50cmllczogcmVzdWx0LmVudHJpZXMsXG4gICAgICBuZXh0OiAoKG5leHQgLSAxKSA8IHJlc3VsdC50b3RhbF9jb3VudCkgPyBuZXh0IDogbnVsbFxuICAgIH1cblxuICB9XG5cbiAgY29uc3QgX3NlYXJjaCA9IGFzeW5jIChxdWVyeSwgbmV4dCkgPT4ge1xuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2xpZW50LnNlYXJjaC5xdWVyeShxdWVyeSwgeyBmaWVsZHMsIG9mZnNldDogMCwgbGltaXQ6IDIwIH0pXG5cbiAgICByZXR1cm4ge1xuICAgICAgZW50cmllczogcmVzdWx0LmVudHJpZXNcbiAgICB9XG5cbiAgfVxuXG4gIGNvbnN0IHEgPSBfLmdldChyZXEucXVlcnksICckZmlsdGVyLnEnKVxuXG4gIGNvbnN0IG5leHQgPSBfLmdldChyZXEsICdxdWVyeS4kcGFnZS5uZXh0JylcblxuICBjb25zdCByZXN1bHQgPSBxID8gYXdhaXQgX3NlYXJjaChxLCBuZXh0KSA6IGF3YWl0IF9saXN0KG5leHQpXG5cbiAgY29uc3QgcmVjb3JkcyA9IHJlc3VsdC5lbnRyaWVzLm1hcChlbnRyeSA9PiB7XG5cbiAgICBjb25zdCBjb250ZW50X3R5cGUgPSBfZ2V0Q29udGVudFR5cGUoZW50cnkubmFtZSlcblxuICAgIHJldHVybiB7XG4gICAgICBpZDogZW50cnkuaWQsXG4gICAgICB0eXBlOiBlbnRyeS50eXBlLFxuICAgICAgbmFtZTogZW50cnkubmFtZSxcbiAgICAgIHRodW1ibmFpbDogY29udGVudF90eXBlLm1hdGNoKC9pbWFnZS8pID8gYC9hZG1pbi9ib3gvcHJldmlldz9wYXRoPSR7ZW50cnkuaWR9YDogbnVsbCxcbiAgICAgIGNvbnRlbnRfdHlwZVxuICAgIH1cblxuICB9KVxuXG4gIHJldHVybiB7XG4gICAgcmVjb3JkcyxcbiAgICBuZXh0OiByZXN1bHQubmV4dCxcbiAgICBza2lwOiBuZXh0ID8gMSA6IDBcbiAgfVxuXG59XG5cbmNvbnN0IF9nZXRDb250ZW50VHlwZSA9IChuYW1lKSA9PiB7XG4gIGNvbnN0IGV4dCA9IHBhdGguZXh0bmFtZShuYW1lKVxuICBjb25zdCB0eXBlID0gbWltZS5sb29rdXAoZXh0KVxuICByZXR1cm4gdHlwZSB8fCAndGV4dC9wbGFpbidcbn1cblxuY29uc3QgbGlzdFJvdXRlID0gbmV3IFJvdXRlKHtcbiAgbWV0aG9kOiAnZ2V0JyxcbiAgcGF0aDogJy9ib3gvZmlsZXMnLFxuICBwcm9jZXNzb3Jcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IGxpc3RSb3V0ZVxuIl19