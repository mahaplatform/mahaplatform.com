'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../server');

var _parse = require('../../../core/utils/parse');

var _parse2 = _interopRequireDefault(_parse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var asset;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _server.Asset.where({
              id: req.resource.get('asset_id')
            }).fetch({
              transacting: trx
            });

          case 2:
            asset = _context.sent;
            _context.next = 5;
            return (0, _parse2.default)({
              asset: asset,
              quote: req.body.quote,
              delimiter: req.body.delimiter,
              headers: req.body.headers
            });

          case 5:
            return _context.abrupt('return', _context.sent);

          case 6:
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

var previewRoute = new _server.Route({
  method: 'post',
  path: '/preview',
  processor: processor
});

exports.default = previewRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsIkFzc2V0Iiwid2hlcmUiLCJpZCIsInJlc291cmNlIiwiZ2V0IiwiZmV0Y2giLCJ0cmFuc2FjdGluZyIsImFzc2V0IiwicXVvdGUiLCJib2R5IiwiZGVsaW1pdGVyIiwiaGVhZGVycyIsInByZXZpZXdSb3V0ZSIsIlJvdXRlIiwibWV0aG9kIiwicGF0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7O0FBRUEsSUFBTUE7QUFBQSxzRkFBWSxpQkFBT0MsR0FBUCxFQUFZQyxHQUFaLEVBQWlCQyxPQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUVJQyxjQUFNQyxLQUFOLENBQVk7QUFDOUJDLGtCQUFHTCxJQUFJTSxRQUFKLENBQWFDLEdBQWIsQ0FBaUIsVUFBakI7QUFEMkIsYUFBWixFQUVqQkMsS0FGaUIsQ0FFWDtBQUNQQywyQkFBYVI7QUFETixhQUZXLENBRko7O0FBQUE7QUFFVlMsaUJBRlU7QUFBQTtBQUFBLG1CQVFILHFCQUFNO0FBQ2pCQSwwQkFEaUI7QUFFakJDLHFCQUFPWCxJQUFJWSxJQUFKLENBQVNELEtBRkM7QUFHakJFLHlCQUFXYixJQUFJWSxJQUFKLENBQVNDLFNBSEg7QUFJakJDLHVCQUFTZCxJQUFJWSxJQUFKLENBQVNFO0FBSkQsYUFBTixDQVJHOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztBQWlCQSxJQUFNQyxlQUFlLElBQUlDLGFBQUosQ0FBVTtBQUM3QkMsVUFBUSxNQURxQjtBQUU3QkMsUUFBTSxVQUZ1QjtBQUc3Qm5CO0FBSDZCLENBQVYsQ0FBckI7O2tCQU1lZ0IsWSIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXNzZXQsIFJvdXRlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmVyJ1xuaW1wb3J0IHBhcnNlIGZyb20gJy4uLy4uLy4uL2NvcmUvdXRpbHMvcGFyc2UnXG5cbmNvbnN0IHByb2Nlc3NvciA9IGFzeW5jIChyZXEsIHRyeCwgb3B0aW9ucykgPT4ge1xuXG4gIGNvbnN0IGFzc2V0ID0gYXdhaXQgQXNzZXQud2hlcmUoe1xuICAgIGlkOnJlcS5yZXNvdXJjZS5nZXQoJ2Fzc2V0X2lkJylcbiAgfSkuZmV0Y2goe1xuICAgIHRyYW5zYWN0aW5nOiB0cnhcbiAgfSlcblxuICByZXR1cm4gYXdhaXQgcGFyc2Uoe1xuICAgIGFzc2V0LFxuICAgIHF1b3RlOiByZXEuYm9keS5xdW90ZSxcbiAgICBkZWxpbWl0ZXI6IHJlcS5ib2R5LmRlbGltaXRlcixcbiAgICBoZWFkZXJzOiByZXEuYm9keS5oZWFkZXJzXG4gIH0pXG5cbn1cblxuY29uc3QgcHJldmlld1JvdXRlID0gbmV3IFJvdXRlKHtcbiAgbWV0aG9kOiAncG9zdCcsXG4gIHBhdGg6ICcvcHJldmlldycsXG4gIHByb2Nlc3NvclxufSlcblxuZXhwb3J0IGRlZmF1bHQgcHJldmlld1JvdXRlXG4iXX0=