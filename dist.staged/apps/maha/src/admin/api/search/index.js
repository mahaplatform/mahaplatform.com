'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _bluebird = require('bluebird');

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../server');

var _collect_objects = require('../../../core/utils/collect_objects');

var _collect_objects2 = _interopRequireDefault(_collect_objects);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchFiles = (0, _collect_objects2.default)('admin/search');

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, trx, options) {
    var query, term;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            query = req.query.q.toLowerCase();
            term = '%' + query.replace(' ', '%') + '%';
            _context3.next = 4;
            return (0, _bluebird.reduce)(searchFiles, function () {
              var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(combined, searchFile) {
                var search, models, results;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        search = searchFiles.default;

                        if (search) {
                          _context2.next = 3;
                          break;
                        }

                        return _context2.abrupt('return', combined);

                      case 3:
                        models = search;
                        _context2.next = 6;
                        return (0, _bluebird.reduce)(Object.keys(models), function () {
                          var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(results, model) {
                            var config, vector, fetchOptions, result;
                            return _regenerator2.default.wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    config = models[model];
                                    vector = config.fields.join(' || \' \' || ');
                                    fetchOptions = {
                                      withRelated: config.withRelated,
                                      transacting: trx
                                    };
                                    _context.next = 5;
                                    return config.model.query(function (qb) {

                                      qb.where({ team_id: req.team.get('id') });

                                      qb.whereRaw('lower(' + vector + ') LIKE \'' + term + '\'');
                                    }).fetchAll(fetchOptions);

                                  case 5:
                                    result = _context.sent;

                                    if (!(result.length === 0)) {
                                      _context.next = 8;
                                      break;
                                    }

                                    return _context.abrupt('return', results);

                                  case 8:
                                    return _context.abrupt('return', (0, _extends4.default)({}, results, (0, _defineProperty3.default)({}, model, {
                                      color: searchFile.config.color,
                                      icon: config.icon || searchFile.config.icon,
                                      results: result.map(config.serializer)
                                    })));

                                  case 9:
                                  case 'end':
                                    return _context.stop();
                                }
                              }
                            }, _callee, undefined);
                          }));

                          return function (_x6, _x7) {
                            return _ref3.apply(this, arguments);
                          };
                        }(), {});

                      case 6:
                        results = _context2.sent;
                        return _context2.abrupt('return', (0, _extends4.default)({}, combined, results));

                      case 8:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, undefined);
              }));

              return function (_x4, _x5) {
                return _ref2.apply(this, arguments);
              };
            }(), {});

          case 4:
            return _context3.abrupt('return', _context3.sent);

          case 5:
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

var searchRoute = new _server.Route({
  method: 'get',
  path: '/search',
  processor: processor
});

exports.default = searchRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsic2VhcmNoRmlsZXMiLCJwcm9jZXNzb3IiLCJyZXEiLCJ0cngiLCJvcHRpb25zIiwicXVlcnkiLCJxIiwidG9Mb3dlckNhc2UiLCJ0ZXJtIiwicmVwbGFjZSIsImNvbWJpbmVkIiwic2VhcmNoRmlsZSIsInNlYXJjaCIsImRlZmF1bHQiLCJtb2RlbHMiLCJPYmplY3QiLCJrZXlzIiwicmVzdWx0cyIsIm1vZGVsIiwiY29uZmlnIiwidmVjdG9yIiwiZmllbGRzIiwiam9pbiIsImZldGNoT3B0aW9ucyIsIndpdGhSZWxhdGVkIiwidHJhbnNhY3RpbmciLCJxYiIsIndoZXJlIiwidGVhbV9pZCIsInRlYW0iLCJnZXQiLCJ3aGVyZVJhdyIsImZldGNoQWxsIiwicmVzdWx0IiwibGVuZ3RoIiwiY29sb3IiLCJpY29uIiwibWFwIiwic2VyaWFsaXplciIsInNlYXJjaFJvdXRlIiwiUm91dGUiLCJtZXRob2QiLCJwYXRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsY0FBYywrQkFBZSxjQUFmLENBQXBCOztBQUVBLElBQU1DO0FBQUEsc0ZBQVksa0JBQU9DLEdBQVAsRUFBWUMsR0FBWixFQUFpQkMsT0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRVZDLGlCQUZVLEdBRUZILElBQUlHLEtBQUosQ0FBVUMsQ0FBVixDQUFZQyxXQUFaLEVBRkU7QUFJVkMsZ0JBSlUsU0FJQ0gsTUFBTUksT0FBTixDQUFjLEdBQWQsRUFBbUIsR0FBbkIsQ0FKRDtBQUFBO0FBQUEsbUJBTUgsc0JBQWVULFdBQWY7QUFBQSxtR0FBNEIsa0JBQU9VLFFBQVAsRUFBaUJDLFVBQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVqQ0MsOEJBRmlDLEdBRXhCWixZQUFZYSxPQUZZOztBQUFBLDRCQUluQ0QsTUFKbUM7QUFBQTtBQUFBO0FBQUE7O0FBQUEsMERBSXBCRixRQUpvQjs7QUFBQTtBQU1qQ0ksOEJBTmlDLEdBTXhCRixNQU53QjtBQUFBO0FBQUEsK0JBUWpCLHNCQUFlRyxPQUFPQyxJQUFQLENBQVlGLE1BQVosQ0FBZjtBQUFBLCtHQUFvQyxpQkFBT0csT0FBUCxFQUFnQkMsS0FBaEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRWxEQywwQ0FGa0QsR0FFekNMLE9BQU9JLEtBQVAsQ0FGeUM7QUFJbERFLDBDQUprRCxHQUl6Q0QsT0FBT0UsTUFBUCxDQUFjQyxJQUFkLENBQW1CLGVBQW5CLENBSnlDO0FBTWxEQyxnREFOa0QsR0FNbkM7QUFDbkJDLG1EQUFhTCxPQUFPSyxXQUREO0FBRW5CQyxtREFBYXRCO0FBRk0scUNBTm1DO0FBQUE7QUFBQSwyQ0FXbkNnQixPQUFPRCxLQUFQLENBQWFiLEtBQWIsQ0FBbUIsY0FBTTs7QUFFNUNxQix5Q0FBR0MsS0FBSCxDQUFTLEVBQUVDLFNBQVMxQixJQUFJMkIsSUFBSixDQUFTQyxHQUFULENBQWEsSUFBYixDQUFYLEVBQVQ7O0FBRUFKLHlDQUFHSyxRQUFILFlBQXFCWCxNQUFyQixpQkFBc0NaLElBQXRDO0FBRUQscUNBTm9CLEVBTWxCd0IsUUFOa0IsQ0FNVFQsWUFOUyxDQVhtQzs7QUFBQTtBQVdsRFUsMENBWGtEOztBQUFBLDBDQW1CckRBLE9BQU9DLE1BQVAsS0FBa0IsQ0FuQm1DO0FBQUE7QUFBQTtBQUFBOztBQUFBLHFFQW1CekJqQixPQW5CeUI7O0FBQUE7QUFBQSxnR0FzQm5EQSxPQXRCbUQsb0NBdUJyREMsS0F2QnFELEVBdUI3QztBQUNQaUIsNkNBQU94QixXQUFXUSxNQUFYLENBQWtCZ0IsS0FEbEI7QUFFUEMsNENBQU1qQixPQUFPaUIsSUFBUCxJQUFlekIsV0FBV1EsTUFBWCxDQUFrQmlCLElBRmhDO0FBR1BuQiwrQ0FBU2dCLE9BQU9JLEdBQVAsQ0FBV2xCLE9BQU9tQixVQUFsQjtBQUhGLHFDQXZCNkM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkJBQXBDOztBQUFBO0FBQUE7QUFBQTtBQUFBLDZCQThCbkIsRUE5Qm1CLENBUmlCOztBQUFBO0FBUWpDckIsK0JBUmlDO0FBQUEscUZBeUNsQ1AsUUF6Q2tDLEVBMENsQ08sT0ExQ2tDOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQTVCOztBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQTZDVixFQTdDVSxDQU5HOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztBQXVEQSxJQUFNc0IsY0FBYyxJQUFJQyxhQUFKLENBQVU7QUFDNUJDLFVBQVEsS0FEb0I7QUFFNUJDLFFBQU0sU0FGc0I7QUFHNUJ6QztBQUg0QixDQUFWLENBQXBCOztrQkFNZXNDLFciLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmVyJ1xuaW1wb3J0IGNvbGxlY3RPYmplY3RzIGZyb20gJy4uLy4uLy4uL2NvcmUvdXRpbHMvY29sbGVjdF9vYmplY3RzJ1xuXG5jb25zdCBzZWFyY2hGaWxlcyA9IGNvbGxlY3RPYmplY3RzKCdhZG1pbi9zZWFyY2gnKVxuXG5jb25zdCBwcm9jZXNzb3IgPSBhc3luYyAocmVxLCB0cngsIG9wdGlvbnMpID0+IHtcblxuICBjb25zdCBxdWVyeSA9IHJlcS5xdWVyeS5xLnRvTG93ZXJDYXNlKClcblxuICBjb25zdCB0ZXJtID0gYCUke3F1ZXJ5LnJlcGxhY2UoJyAnLCAnJScpfSVgXG5cbiAgcmV0dXJuIGF3YWl0IFByb21pc2UucmVkdWNlKHNlYXJjaEZpbGVzLCBhc3luYyAoY29tYmluZWQsIHNlYXJjaEZpbGUpID0+IHtcblxuICAgIGNvbnN0IHNlYXJjaCA9IHNlYXJjaEZpbGVzLmRlZmF1bHRcblxuICAgIGlmKCFzZWFyY2gpIHJldHVybiBjb21iaW5lZFxuXG4gICAgY29uc3QgbW9kZWxzID0gc2VhcmNoXG5cbiAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgUHJvbWlzZS5yZWR1Y2UoT2JqZWN0LmtleXMobW9kZWxzKSwgYXN5bmMgKHJlc3VsdHMsIG1vZGVsKSA9PiB7XG5cbiAgICAgIGNvbnN0IGNvbmZpZyA9IG1vZGVsc1ttb2RlbF1cblxuICAgICAgY29uc3QgdmVjdG9yID0gY29uZmlnLmZpZWxkcy5qb2luKCcgfHwgXFwnIFxcJyB8fCAnKVxuXG4gICAgICBjb25zdCBmZXRjaE9wdGlvbnMgPSB7XG4gICAgICAgIHdpdGhSZWxhdGVkOiBjb25maWcud2l0aFJlbGF0ZWQsXG4gICAgICAgIHRyYW5zYWN0aW5nOiB0cnhcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY29uZmlnLm1vZGVsLnF1ZXJ5KHFiID0+IHtcblxuICAgICAgICBxYi53aGVyZSh7IHRlYW1faWQ6IHJlcS50ZWFtLmdldCgnaWQnKSB9KVxuXG4gICAgICAgIHFiLndoZXJlUmF3KGBsb3dlcigke3ZlY3Rvcn0pIExJS0UgJyR7dGVybX0nYClcblxuICAgICAgfSkuZmV0Y2hBbGwoZmV0Y2hPcHRpb25zKVxuXG4gICAgICBpZihyZXN1bHQubGVuZ3RoID09PSAwKSByZXR1cm4gcmVzdWx0c1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5yZXN1bHRzLFxuICAgICAgICBbbW9kZWxdOiB7XG4gICAgICAgICAgY29sb3I6IHNlYXJjaEZpbGUuY29uZmlnLmNvbG9yLFxuICAgICAgICAgIGljb246IGNvbmZpZy5pY29uIHx8IHNlYXJjaEZpbGUuY29uZmlnLmljb24sXG4gICAgICAgICAgcmVzdWx0czogcmVzdWx0Lm1hcChjb25maWcuc2VyaWFsaXplcilcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgfSwge30pXG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uY29tYmluZWQsXG4gICAgICAuLi5yZXN1bHRzXG4gICAgfVxuXG4gIH0sIHt9KVxuXG59XG5cbmNvbnN0IHNlYXJjaFJvdXRlID0gbmV3IFJvdXRlKHtcbiAgbWV0aG9kOiAnZ2V0JyxcbiAgcGF0aDogJy9zZWFyY2gnLFxuICBwcm9jZXNzb3Jcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IHNlYXJjaFJvdXRlXG4iXX0=