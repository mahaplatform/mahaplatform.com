'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../server');

var _import = require('../../../models/import');

var _import2 = _interopRequireDefault(_import);

var _flat = require('flat');

var _flat2 = _interopRequireDefault(_flat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var imp;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return req.resource.save({
              is_valid: true
            }, { patch: true, transacting: trx });

          case 2:
            _context.next = 4;
            return _import2.default.where({
              id: req.params.import_id
            }).fetch({
              transacting: trx
            });

          case 4:
            imp = _context.sent;
            _context.next = 7;
            return imp.save({
              valid_count: imp.get('valid_count') + 1,
              error_count: imp.get('error_count') - 1
            }, {
              patch: true,
              transacting: trx
            });

          case 7:
            return _context.abrupt('return', imp);

          case 8:
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

var refresh = function refresh(req, trx, result, options) {
  return '/admin/imports/' + result.id;
};

var rules = function rules(req, trx, options) {
  return (0, _flat2.default)(req.body.rules, { maxDepth: 2 });
};

var fixRoute = new _server.Route({
  method: 'patch',
  path: '/fix',
  processor: processor,
  refresh: refresh,
  rules: rules,
  serializer: _server.ImportSerializer
});

exports.default = fixRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsInJlc291cmNlIiwic2F2ZSIsImlzX3ZhbGlkIiwicGF0Y2giLCJ0cmFuc2FjdGluZyIsIkltcG9ydCIsIndoZXJlIiwiaWQiLCJwYXJhbXMiLCJpbXBvcnRfaWQiLCJmZXRjaCIsImltcCIsInZhbGlkX2NvdW50IiwiZ2V0IiwiZXJyb3JfY291bnQiLCJyZWZyZXNoIiwicmVzdWx0IiwicnVsZXMiLCJib2R5IiwibWF4RGVwdGgiLCJmaXhSb3V0ZSIsIlJvdXRlIiwibWV0aG9kIiwicGF0aCIsInNlcmlhbGl6ZXIiLCJJbXBvcnRTZXJpYWxpemVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BO0FBQUEsc0ZBQVksaUJBQU9DLEdBQVAsRUFBWUMsR0FBWixFQUFpQkMsT0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFFVkYsSUFBSUcsUUFBSixDQUFhQyxJQUFiLENBQWtCO0FBQ3RCQyx3QkFBVTtBQURZLGFBQWxCLEVBRUgsRUFBRUMsT0FBTyxJQUFULEVBQWVDLGFBQWFOLEdBQTVCLEVBRkcsQ0FGVTs7QUFBQTtBQUFBO0FBQUEsbUJBTUVPLGlCQUFPQyxLQUFQLENBQWE7QUFDN0JDLGtCQUFJVixJQUFJVyxNQUFKLENBQVdDO0FBRGMsYUFBYixFQUVmQyxLQUZlLENBRVQ7QUFDUE4sMkJBQWFOO0FBRE4sYUFGUyxDQU5GOztBQUFBO0FBTVZhLGVBTlU7QUFBQTtBQUFBLG1CQVlWQSxJQUFJVixJQUFKLENBQVM7QUFDYlcsMkJBQWNELElBQUlFLEdBQUosQ0FBUSxhQUFSLElBQXlCLENBRDFCO0FBRWJDLDJCQUFjSCxJQUFJRSxHQUFKLENBQVEsYUFBUixJQUF5QjtBQUYxQixhQUFULEVBR0g7QUFDRFYscUJBQU8sSUFETjtBQUVEQywyQkFBYU47QUFGWixhQUhHLENBWlU7O0FBQUE7QUFBQSw2Q0FvQlRhLEdBcEJTOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUF3QkEsSUFBTUksVUFBVSxTQUFWQSxPQUFVLENBQUNsQixHQUFELEVBQU1DLEdBQU4sRUFBV2tCLE1BQVgsRUFBbUJqQixPQUFuQjtBQUFBLDZCQUFpRGlCLE9BQU9ULEVBQXhEO0FBQUEsQ0FBaEI7O0FBRUEsSUFBTVUsUUFBUSxTQUFSQSxLQUFRLENBQUNwQixHQUFELEVBQUtDLEdBQUwsRUFBU0MsT0FBVDtBQUFBLFNBQXFCLG9CQUFLRixJQUFJcUIsSUFBSixDQUFTRCxLQUFkLEVBQXFCLEVBQUVFLFVBQVUsQ0FBWixFQUFyQixDQUFyQjtBQUFBLENBQWQ7O0FBRUEsSUFBTUMsV0FBVyxJQUFJQyxhQUFKLENBQVU7QUFDekJDLFVBQVEsT0FEaUI7QUFFekJDLFFBQU0sTUFGbUI7QUFHekIzQixzQkFIeUI7QUFJekJtQixrQkFKeUI7QUFLekJFLGNBTHlCO0FBTXpCTyxjQUFZQztBQU5hLENBQVYsQ0FBakI7O2tCQVNlTCxRIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZSwgSW1wb3J0U2VyaWFsaXplciB9IGZyb20gJy4uLy4uLy4uL3NlcnZlcidcbmltcG9ydCBJbXBvcnQgZnJvbSAnLi4vLi4vLi4vbW9kZWxzL2ltcG9ydCdcbmltcG9ydCBmbGF0IGZyb20gJ2ZsYXQnXG5cbmNvbnN0IHByb2Nlc3NvciA9IGFzeW5jIChyZXEsIHRyeCwgb3B0aW9ucykgPT4ge1xuXG4gIGF3YWl0IHJlcS5yZXNvdXJjZS5zYXZlKHtcbiAgICBpc192YWxpZDogdHJ1ZVxuICB9LCB7IHBhdGNoOiB0cnVlLCB0cmFuc2FjdGluZzogdHJ4IH0pXG5cbiAgY29uc3QgaW1wID0gYXdhaXQgSW1wb3J0LndoZXJlKHtcbiAgICBpZDogcmVxLnBhcmFtcy5pbXBvcnRfaWRcbiAgfSkuZmV0Y2goe1xuICAgIHRyYW5zYWN0aW5nOiB0cnhcbiAgfSlcblxuICBhd2FpdCBpbXAuc2F2ZSh7XG4gICAgdmFsaWRfY291bnQ6IChpbXAuZ2V0KCd2YWxpZF9jb3VudCcpICsgMSksXG4gICAgZXJyb3JfY291bnQ6IChpbXAuZ2V0KCdlcnJvcl9jb3VudCcpIC0gMSlcbiAgfSwge1xuICAgIHBhdGNoOiB0cnVlLFxuICAgIHRyYW5zYWN0aW5nOiB0cnhcbiAgfSlcblxuICByZXR1cm4gaW1wXG5cbn1cblxuY29uc3QgcmVmcmVzaCA9IChyZXEsIHRyeCwgcmVzdWx0LCBvcHRpb25zKSA9PiBgL2FkbWluL2ltcG9ydHMvJHtyZXN1bHQuaWR9YFxuXG5jb25zdCBydWxlcyA9IChyZXEsdHJ4LG9wdGlvbnMpID0+IGZsYXQocmVxLmJvZHkucnVsZXMsIHsgbWF4RGVwdGg6IDIgfSlcblxuY29uc3QgZml4Um91dGUgPSBuZXcgUm91dGUoe1xuICBtZXRob2Q6ICdwYXRjaCcsXG4gIHBhdGg6ICcvZml4JyxcbiAgcHJvY2Vzc29yLFxuICByZWZyZXNoLFxuICBydWxlcyxcbiAgc2VyaWFsaXplcjogSW1wb3J0U2VyaWFsaXplclxufSlcblxuZXhwb3J0IGRlZmF1bHQgZml4Um91dGVcbiJdfQ==