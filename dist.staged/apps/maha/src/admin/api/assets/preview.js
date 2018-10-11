'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../server');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handler = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:

            res.sendFile(_path2.default.join('uploads', req.params.id));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function handler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var previewRoute = new _server.Route({
  path: '/assets/:id/preview',
  method: 'get',
  handler: handler
});

exports.default = previewRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiaGFuZGxlciIsInJlcSIsInJlcyIsInNlbmRGaWxlIiwicGF0aCIsImpvaW4iLCJwYXJhbXMiLCJpZCIsInByZXZpZXdSb3V0ZSIsIlJvdXRlIiwibWV0aG9kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQTtBQUFBLHNGQUFVLGlCQUFPQyxHQUFQLEVBQVlDLEdBQVo7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFFZEEsZ0JBQUlDLFFBQUosQ0FBYUMsZUFBS0MsSUFBTCxDQUFVLFNBQVYsRUFBcUJKLElBQUlLLE1BQUosQ0FBV0MsRUFBaEMsQ0FBYjs7QUFGYztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFWOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBTUEsSUFBTUMsZUFBZSxJQUFJQyxhQUFKLENBQVU7QUFDN0JMLFFBQU0scUJBRHVCO0FBRTdCTSxVQUFRLEtBRnFCO0FBRzdCVjtBQUg2QixDQUFWLENBQXJCOztrQkFNZVEsWSIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGUgfSBmcm9tICcuLi8uLi8uLi9zZXJ2ZXInXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuXG5jb25zdCBoYW5kbGVyID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG5cbiAgcmVzLnNlbmRGaWxlKHBhdGguam9pbigndXBsb2FkcycsIHJlcS5wYXJhbXMuaWQpKVxuXG59XG5cbmNvbnN0IHByZXZpZXdSb3V0ZSA9IG5ldyBSb3V0ZSh7XG4gIHBhdGg6ICcvYXNzZXRzLzppZC9wcmV2aWV3JyxcbiAgbWV0aG9kOiAnZ2V0JyxcbiAgaGFuZGxlclxufSlcblxuZXhwb3J0IGRlZmF1bHQgcHJldmlld1JvdXRlXG4iXX0=