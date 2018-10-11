'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../../server');

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var query;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            query = _qs2.default.stringify({
              response_type: 'code',
              client_id: process.env.BOX_CLIENT_ID,
              redirect_uri: process.env.WEB_HOST + '/admin/box/token',
              state: req.user.get('id')
            });
            return _context.abrupt('return', 'https://account.box.com/api/oauth2/authorize?' + query);

          case 2:
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

var authorizeRoute = new _server.Route({
  method: 'get',
  path: '/box/authorize',
  processor: processor
});

exports.default = authorizeRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsInF1ZXJ5IiwicXMiLCJzdHJpbmdpZnkiLCJyZXNwb25zZV90eXBlIiwiY2xpZW50X2lkIiwicHJvY2VzcyIsImVudiIsIkJPWF9DTElFTlRfSUQiLCJyZWRpcmVjdF91cmkiLCJXRUJfSE9TVCIsInN0YXRlIiwidXNlciIsImdldCIsImF1dGhvcml6ZVJvdXRlIiwiUm91dGUiLCJtZXRob2QiLCJwYXRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQTtBQUFBLHNGQUFZLGlCQUFPQyxHQUFQLEVBQVlDLEdBQVosRUFBaUJDLE9BQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVWQyxpQkFGVSxHQUVGQyxhQUFHQyxTQUFILENBQWE7QUFDekJDLDZCQUFlLE1BRFU7QUFFekJDLHlCQUFXQyxRQUFRQyxHQUFSLENBQVlDLGFBRkU7QUFHekJDLDRCQUFpQkgsUUFBUUMsR0FBUixDQUFZRyxRQUE3QixxQkFIeUI7QUFJekJDLHFCQUFPYixJQUFJYyxJQUFKLENBQVNDLEdBQVQsQ0FBYSxJQUFiO0FBSmtCLGFBQWIsQ0FGRTtBQUFBLCtGQVN1Q1osS0FUdkM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztBQWFBLElBQU1hLGlCQUFpQixJQUFJQyxhQUFKLENBQVU7QUFDL0JDLFVBQVEsS0FEdUI7QUFFL0JDLFFBQU0sZ0JBRnlCO0FBRy9CcEI7QUFIK0IsQ0FBVixDQUF2Qjs7a0JBTWVpQixjIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NlcnZlcidcbmltcG9ydCBxcyBmcm9tICdxcydcblxuY29uc3QgcHJvY2Vzc29yID0gYXN5bmMgKHJlcSwgdHJ4LCBvcHRpb25zKSA9PiB7XG5cbiAgY29uc3QgcXVlcnkgPSBxcy5zdHJpbmdpZnkoe1xuICAgIHJlc3BvbnNlX3R5cGU6ICdjb2RlJyxcbiAgICBjbGllbnRfaWQ6IHByb2Nlc3MuZW52LkJPWF9DTElFTlRfSUQsXG4gICAgcmVkaXJlY3RfdXJpOiBgJHtwcm9jZXNzLmVudi5XRUJfSE9TVH0vYWRtaW4vYm94L3Rva2VuYCxcbiAgICBzdGF0ZTogcmVxLnVzZXIuZ2V0KCdpZCcpXG4gIH0pXG5cbiAgcmV0dXJuIGBodHRwczovL2FjY291bnQuYm94LmNvbS9hcGkvb2F1dGgyL2F1dGhvcml6ZT8ke3F1ZXJ5fWBcblxufVxuXG5jb25zdCBhdXRob3JpemVSb3V0ZSA9IG5ldyBSb3V0ZSh7XG4gIG1ldGhvZDogJ2dldCcsXG4gIHBhdGg6ICcvYm94L2F1dGhvcml6ZScsXG4gIHByb2Nlc3NvclxufSlcblxuZXhwb3J0IGRlZmF1bHQgYXV0aG9yaXplUm91dGVcbiJdfQ==