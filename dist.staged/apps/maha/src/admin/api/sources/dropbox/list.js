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
    var client, _list, _search, folder_id, folder, q, next, result, records;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _utils.getClient)(req, trx);

          case 2:
            client = _context3.sent;

            _list = function () {
              var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var folder = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
                var cursor = arguments[1];
                var result;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!cursor) {
                          _context.next = 6;
                          break;
                        }

                        _context.next = 3;
                        return client({
                          resource: 'files/list_folder/continue',
                          parameters: {
                            cursor: cursor
                          }
                        });

                      case 3:
                        _context.t0 = _context.sent;
                        _context.next = 9;
                        break;

                      case 6:
                        _context.next = 8;
                        return client({
                          resource: 'files/list_folder',
                          parameters: {
                            path: folder,
                            limit: 20,
                            include_media_info: true
                          }
                        });

                      case 8:
                        _context.t0 = _context.sent;

                      case 9:
                        result = _context.t0;
                        return _context.abrupt('return', {
                          entries: result.entries,
                          cursor: result.has_more ? result.cursor : null
                        });

                      case 11:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function _list() {
                return _ref2.apply(this, arguments);
              };
            }();

            _search = function () {
              var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(query, start) {
                var result;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return client({
                          resource: 'files/search',
                          parameters: {
                            path: '',
                            max_results: 20,
                            start: start ? parseInt(start) : 0,
                            query: query
                          }
                        });

                      case 2:
                        result = _context2.sent;
                        return _context2.abrupt('return', {
                          entries: result.matches.map(function (match) {
                            return match.metadata;
                          }),
                          cursor: result.more ? result.start : null
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

            folder_id = _lodash2.default.get(req, 'query.$filter.folder_id.$eq');
            folder = folder_id === 'null' ? '' : folder_id;
            q = _lodash2.default.get(req.query, '$filter.q');
            next = _lodash2.default.get(req, 'query.$page.next');

            if (!q) {
              _context3.next = 15;
              break;
            }

            _context3.next = 12;
            return _search(q, next);

          case 12:
            _context3.t0 = _context3.sent;
            _context3.next = 18;
            break;

          case 15:
            _context3.next = 17;
            return _list(folder, next);

          case 17:
            _context3.t0 = _context3.sent;

          case 18:
            result = _context3.t0;
            records = result.entries.map(function (entry) {

              var content_type = _getContentType(entry.name);

              return {
                id: entry.id,
                type: entry['.tag'],
                name: entry.name,
                thumbnail: content_type.match(/image/) ? '/admin/dropbox/preview?path=' + encodeURIComponent(entry.path_lower) : null,
                content_type: content_type
              };
            });
            return _context3.abrupt('return', {
              records: records,
              skip: next ? 1 : 0,
              next: result.cursor
            });

          case 21:
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
  path: '/dropbox/files',
  processor: processor
});

exports.default = listRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsImNsaWVudCIsIl9saXN0IiwiZm9sZGVyIiwiY3Vyc29yIiwicmVzb3VyY2UiLCJwYXJhbWV0ZXJzIiwicGF0aCIsImxpbWl0IiwiaW5jbHVkZV9tZWRpYV9pbmZvIiwicmVzdWx0IiwiZW50cmllcyIsImhhc19tb3JlIiwiX3NlYXJjaCIsInF1ZXJ5Iiwic3RhcnQiLCJtYXhfcmVzdWx0cyIsInBhcnNlSW50IiwibWF0Y2hlcyIsIm1hcCIsIm1hdGNoIiwibWV0YWRhdGEiLCJtb3JlIiwiZm9sZGVyX2lkIiwiXyIsImdldCIsInEiLCJuZXh0IiwicmVjb3JkcyIsImNvbnRlbnRfdHlwZSIsIl9nZXRDb250ZW50VHlwZSIsImVudHJ5IiwibmFtZSIsImlkIiwidHlwZSIsInRodW1ibmFpbCIsImVuY29kZVVSSUNvbXBvbmVudCIsInBhdGhfbG93ZXIiLCJza2lwIiwiZXh0IiwiZXh0bmFtZSIsIm1pbWUiLCJsb29rdXAiLCJsaXN0Um91dGUiLCJSb3V0ZSIsIm1ldGhvZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BO0FBQUEsc0ZBQVksa0JBQU9DLEdBQVAsRUFBWUMsR0FBWixFQUFpQkMsT0FBakI7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRUssc0JBQVVGLEdBQVYsRUFBZUMsR0FBZixDQUZMOztBQUFBO0FBRVZFLGtCQUZVOztBQUlWQyxpQkFKVTtBQUFBLG1HQUlGO0FBQUEsb0JBQU9DLE1BQVAsdUVBQWdCLEVBQWhCO0FBQUEsb0JBQW9CQyxNQUFwQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw2QkFFR0EsTUFGSDtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLCtCQUVrQkgsT0FBTztBQUNuQ0ksb0NBQVUsNEJBRHlCO0FB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QixTQUFsQkEsZUFBa0IsQ0FBQ0UsSUFBRCxFQUFVO0FBQ2hDLE1BQU1PLE1BQU1oQyxlQUFLaUMsT0FBTCxDQUFhUixJQUFiLENBQVo7QUFDQSxNQUFNRSxPQUFPTyxvQkFBS0MsTUFBTCxDQUFZSCxHQUFaLENBQWI7QUFDQSxTQUFPTCxRQUFRLFlBQWY7QUFDRCxDQUpEOztBQU1BLElBQU1TLFlBQVksSUFBSUMsYUFBSixDQUFVO0FBQzFCQyxVQUFRLEtBRGtCO0FBRTFCdEMsUUFBTSxnQkFGb0I7QUFHMUJWO0FBSDBCLENBQVYsQ0FBbEI7O2tCQU1lOEMsUyIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGUgfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2ZXInXG5pbXBvcnQgeyBnZXRDbGllbnQgfSBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IG1pbWUgZnJvbSAnbWltZS10eXBlcydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5cbmNvbnN0IHByb2Nlc3NvciA9IGFzeW5jIChyZXEsIHRyeCwgb3B0aW9ucykgPT4ge1xuXG4gIGNvbnN0IGNsaWVudCA9IGF3YWl0IGdldENsaWVudChyZXEsIHRyeClcblxuICBjb25zdCBfbGlzdCA9IGFzeW5jIChmb2xkZXIgPSAnJywgY3Vyc29yKSA9PiB7XG5cbiAgICBjb25zdCByZXN1bHQgPSBjdXJzb3IgPyBhd2FpdCBjbGllbnQoe1xuICAgICAgcmVzb3VyY2U6ICdmaWxlcy9saXN0X2ZvbGRlci9jb250aW51ZScsXG4gICAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICAgIGN1cnNvclxuICAgICAgfVxuICAgIH0pIDogYXdhaXQgY2xpZW50KHtcbiAgICAgIHJlc291cmNlOiAnZmlsZXMvbGlzdF9mb2xkZXInLFxuICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICBwYXRoOiBmb2xkZXIsXG4gICAgICAgIGxpbWl0OiAyMCxcbiAgICAgICAgaW5jbHVkZV9tZWRpYV9pbmZvOiB0cnVlXG4gICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiB7XG4gICAgICBlbnRyaWVzOiByZXN1bHQuZW50cmllcyxcbiAgICAgIGN1cnNvcjogcmVzdWx0Lmhhc19tb3JlID8gcmVzdWx0LmN1cnNvciA6IG51bGxcbiAgICB9XG5cbiAgfVxuXG4gIGNvbnN0IF9zZWFyY2ggPSBhc3luYyAocXVlcnksIHN0YXJ0KSA9PiB7XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjbGllbnQoe1xuICAgICAgcmVzb3VyY2U6ICdmaWxlcy9zZWFyY2gnLFxuICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICBwYXRoOiAnJyxcbiAgICAgICAgbWF4X3Jlc3VsdHM6IDIwLFxuICAgICAgICBzdGFydDogc3RhcnQgPyBwYXJzZUludChzdGFydCkgOiAwLFxuICAgICAgICBxdWVyeVxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4ge1xuICAgICAgZW50cmllczogcmVzdWx0Lm1hdGNoZXMubWFwKG1hdGNoID0+IG1hdGNoLm1ldGFkYXRhKSxcbiAgICAgIGN1cnNvcjogcmVzdWx0Lm1vcmUgPyByZXN1bHQuc3RhcnQgOiBudWxsXG4gICAgfVxuXG4gIH1cblxuICBjb25zdCBmb2xkZXJfaWQgPSBfLmdldChyZXEsICdxdWVyeS4kZmlsdGVyLmZvbGRlcl9pZC4kZXEnKVxuXG4gIGNvbnN0IGZvbGRlciA9IGZvbGRlcl9pZCA9PT0gJ251bGwnID8gJycgOiBmb2xkZXJfaWRcblxuICBjb25zdCBxID0gXy5nZXQocmVxLnF1ZXJ5LCAnJGZpbHRlci5xJylcblxuICBjb25zdCBuZXh0ID0gXy5nZXQocmVxLCAncXVlcnkuJHBhZ2UubmV4dCcpXG5cbiAgY29uc3QgcmVzdWx0ID0gcSA/IGF3YWl0IF9zZWFyY2gocSwgbmV4dCkgOiBhd2FpdCBfbGlzdChmb2xkZXIsIG5leHQpXG5cbiAgY29uc3QgcmVjb3JkcyA9IHJlc3VsdC5lbnRyaWVzLm1hcChlbnRyeSA9PiB7XG5cbiAgICBjb25zdCBjb250ZW50X3R5cGUgPSBfZ2V0Q29udGVudFR5cGUoZW50cnkubmFtZSlcblxuICAgIHJldHVybiB7XG4gICAgICBpZDogZW50cnkuaWQsXG4gICAgICB0eXBlOiBlbnRyeVsnLnRhZyddLFxuICAgICAgbmFtZTogZW50cnkubmFtZSxcbiAgICAgIHRodW1ibmFpbDogY29udGVudF90eXBlLm1hdGNoKC9pbWFnZS8pID8gYC9hZG1pbi9kcm9wYm94L3ByZXZpZXc/cGF0aD0ke2VuY29kZVVSSUNvbXBvbmVudChlbnRyeS5wYXRoX2xvd2VyKX1gOiBudWxsLFxuICAgICAgY29udGVudF90eXBlXG4gICAgfVxuXG4gIH0pXG5cbiAgcmV0dXJuIHtcbiAgICByZWNvcmRzLFxuICAgIHNraXA6IG5leHQgPyAxIDogMCxcbiAgICBuZXh0OiByZXN1bHQuY3Vyc29yXG4gIH1cblxufVxuXG5jb25zdCBfZ2V0Q29udGVudFR5cGUgPSAobmFtZSkgPT4ge1xuICBjb25zdCBleHQgPSBwYXRoLmV4dG5hbWUobmFtZSlcbiAgY29uc3QgdHlwZSA9IG1pbWUubG9va3VwKGV4dClcbiAgcmV0dXJuIHR5cGUgfHwgJ3RleHQvcGxhaW4nXG59XG5cbmNvbnN0IGxpc3RSb3V0ZSA9IG5ldyBSb3V0ZSh7XG4gIG1ldGhvZDogJ2dldCcsXG4gIHBhdGg6ICcvZHJvcGJveC9maWxlcycsXG4gIHByb2Nlc3NvclxufSlcblxuZXhwb3J0IGRlZmF1bHQgbGlzdFJvdXRlXG4iXX0=