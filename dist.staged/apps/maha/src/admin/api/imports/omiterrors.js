'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = require('bluebird');

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../server');

var _import_item = require('../../../models/import_item');

var _import_item2 = _interopRequireDefault(_import_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, trx, options) {
    var items;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _import_item2.default.where({
              import_id: req.params.id,
              is_valid: false
            }).fetchAll({
              transacting: trx
            });

          case 2:
            items = _context2.sent;
            _context2.next = 5;
            return (0, _bluebird.mapSeries)(items.toArray(), function () {
              var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(item) {
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return item.save({
                          is_omitted: true
                        }, {
                          patch: true,
                          transacting: trx
                        });

                      case 2:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x4) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 5:
            _context2.next = 7;
            return req.resource.save({
              error_count: 0,
              omit_count: req.resource.get('error_count') + req.resource.get('omit_count')
            }, { patch: true, transacting: trx });

          case 7:
            return _context2.abrupt('return', req.resource);

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function processor(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var omitErrorsRoute = new _server.Route({
  method: 'post',
  path: '/omiterrors',
  processor: processor,
  serializer: _server.ImportSerializer
});

exports.default = omitErrorsRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsIkltcG9ydEl0ZW0iLCJ3aGVyZSIsImltcG9ydF9pZCIsInBhcmFtcyIsImlkIiwiaXNfdmFsaWQiLCJmZXRjaEFsbCIsInRyYW5zYWN0aW5nIiwiaXRlbXMiLCJ0b0FycmF5IiwiaXRlbSIsInNhdmUiLCJpc19vbWl0dGVkIiwicGF0Y2giLCJyZXNvdXJjZSIsImVycm9yX2NvdW50Iiwib21pdF9jb3VudCIsImdldCIsIm9taXRFcnJvcnNSb3V0ZSIsIlJvdXRlIiwibWV0aG9kIiwicGF0aCIsInNlcmlhbGl6ZXIiLCJJbXBvcnRTZXJpYWxpemVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7OztBQUVBLElBQU1BO0FBQUEsc0ZBQVksa0JBQU9DLEdBQVAsRUFBWUMsR0FBWixFQUFpQkMsT0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFFSUMsc0JBQVdDLEtBQVgsQ0FBaUI7QUFDbkNDLHlCQUFXTCxJQUFJTSxNQUFKLENBQVdDLEVBRGE7QUFFbkNDLHdCQUFVO0FBRnlCLGFBQWpCLEVBR2pCQyxRQUhpQixDQUdSO0FBQ1ZDLDJCQUFhVDtBQURILGFBSFEsQ0FGSjs7QUFBQTtBQUVWVSxpQkFGVTtBQUFBO0FBQUEsbUJBU1YseUJBQWtCQSxNQUFNQyxPQUFOLEVBQWxCO0FBQUEsbUdBQW1DLGlCQUFPQyxJQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLCtCQUVqQ0EsS0FBS0MsSUFBTCxDQUFVO0FBQ2RDLHNDQUFZO0FBREUseUJBQVYsRUFFSDtBQUNEQyxpQ0FBTyxJQUROO0FBRUROLHVDQUFhVDtBQUZaLHlCQUZHLENBRmlDOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQW5DOztBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQVRVOztBQUFBO0FBQUE7QUFBQSxtQkFvQlZELElBQUlpQixRQUFKLENBQWFILElBQWIsQ0FBa0I7QUFDdEJJLDJCQUFhLENBRFM7QUFFdEJDLDBCQUFhbkIsSUFBSWlCLFFBQUosQ0FBYUcsR0FBYixDQUFpQixhQUFqQixJQUFrQ3BCLElBQUlpQixRQUFKLENBQWFHLEdBQWIsQ0FBaUIsWUFBakI7QUFGekIsYUFBbEIsRUFHSCxFQUFFSixPQUFPLElBQVQsRUFBZU4sYUFBYVQsR0FBNUIsRUFIRyxDQXBCVTs7QUFBQTtBQUFBLDhDQXlCVEQsSUFBSWlCLFFBekJLOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUE2QkEsSUFBTUksa0JBQWtCLElBQUlDLGFBQUosQ0FBVTtBQUNoQ0MsVUFBUSxNQUR3QjtBQUVoQ0MsUUFBTSxhQUYwQjtBQUdoQ3pCLHNCQUhnQztBQUloQzBCLGNBQVlDO0FBSm9CLENBQVYsQ0FBeEI7O2tCQU9lTCxlIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZSwgSW1wb3J0U2VyaWFsaXplciB9IGZyb20gJy4uLy4uLy4uL3NlcnZlcidcbmltcG9ydCBJbXBvcnRJdGVtIGZyb20gJy4uLy4uLy4uL21vZGVscy9pbXBvcnRfaXRlbSdcblxuY29uc3QgcHJvY2Vzc29yID0gYXN5bmMgKHJlcSwgdHJ4LCBvcHRpb25zKSA9PiB7XG5cbiAgY29uc3QgaXRlbXMgPSBhd2FpdCBJbXBvcnRJdGVtLndoZXJlKHtcbiAgICBpbXBvcnRfaWQ6IHJlcS5wYXJhbXMuaWQsXG4gICAgaXNfdmFsaWQ6IGZhbHNlXG4gIH0pLmZldGNoQWxsKHtcbiAgICB0cmFuc2FjdGluZzogdHJ4XG4gIH0pXG5cbiAgYXdhaXQgUHJvbWlzZS5tYXBTZXJpZXMoaXRlbXMudG9BcnJheSgpLCBhc3luYyAoaXRlbSkgPT4ge1xuXG4gICAgYXdhaXQgaXRlbS5zYXZlKHtcbiAgICAgIGlzX29taXR0ZWQ6IHRydWVcbiAgICB9LCB7XG4gICAgICBwYXRjaDogdHJ1ZSxcbiAgICAgIHRyYW5zYWN0aW5nOiB0cnhcbiAgICB9KVxuXG4gIH0pXG5cbiAgYXdhaXQgcmVxLnJlc291cmNlLnNhdmUoe1xuICAgIGVycm9yX2NvdW50OiAwLFxuICAgIG9taXRfY291bnQ6IChyZXEucmVzb3VyY2UuZ2V0KCdlcnJvcl9jb3VudCcpICsgcmVxLnJlc291cmNlLmdldCgnb21pdF9jb3VudCcpKVxuICB9LCB7IHBhdGNoOiB0cnVlLCB0cmFuc2FjdGluZzogdHJ4IH0pXG5cbiAgcmV0dXJuIHJlcS5yZXNvdXJjZVxuXG59XG5cbmNvbnN0IG9taXRFcnJvcnNSb3V0ZSA9IG5ldyBSb3V0ZSh7XG4gIG1ldGhvZDogJ3Bvc3QnLFxuICBwYXRoOiAnL29taXRlcnJvcnMnLFxuICBwcm9jZXNzb3IsXG4gIHNlcmlhbGl6ZXI6IEltcG9ydFNlcmlhbGl6ZXJcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IG9taXRFcnJvcnNSb3V0ZVxuIl19