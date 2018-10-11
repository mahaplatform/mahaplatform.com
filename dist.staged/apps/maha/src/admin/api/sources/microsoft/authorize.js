'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../../server');

var _simpleOauth = require('simple-oauth2');

var _simpleOauth2 = _interopRequireDefault(_simpleOauth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var oauth2 = _simpleOauth2.default.create({
  client: {
    id: process.env.MICROSOFT_APP_ID,
    secret: process.env.MICROSOFT_APP_SECRET
  },
  auth: {
    tokenHost: 'https://login.microsoftonline.com',
    authorizePath: 'common/oauth2/v2.0/authorize',
    tokenPath: 'common/oauth2/v2.0/token'
  }
});

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var url;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return oauth2.authorizationCode.authorizeURL({
              redirect_uri: process.env.WEB_HOST + '/admin/microsoft/token',
              scope: 'offline_access files.read.all',
              state: req.user.get('id')
            });

          case 2:
            url = _context.sent;
            return _context.abrupt('return', url);

          case 4:
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
  path: '/microsoft/authorize',
  processor: processor
});

exports.default = authorizeRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsib2F1dGgyIiwiT0F1dGgyIiwiY3JlYXRlIiwiY2xpZW50IiwiaWQiLCJwcm9jZXNzIiwiZW52IiwiTUlDUk9TT0ZUX0FQUF9JRCIsInNlY3JldCIsIk1JQ1JPU09GVF9BUFBfU0VDUkVUIiwiYXV0aCIsInRva2VuSG9zdCIsImF1dGhvcml6ZVBhdGgiLCJ0b2tlblBhdGgiLCJwcm9jZXNzb3IiLCJyZXEiLCJ0cngiLCJvcHRpb25zIiwiYXV0aG9yaXphdGlvbkNvZGUiLCJhdXRob3JpemVVUkwiLCJyZWRpcmVjdF91cmkiLCJXRUJfSE9TVCIsInNjb3BlIiwic3RhdGUiLCJ1c2VyIiwiZ2V0IiwidXJsIiwiYXV0aG9yaXplUm91dGUiLCJSb3V0ZSIsIm1ldGhvZCIsInBhdGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLFNBQVNDLHNCQUFPQyxNQUFQLENBQWM7QUFDM0JDLFVBQVE7QUFDTkMsUUFBSUMsUUFBUUMsR0FBUixDQUFZQyxnQkFEVjtBQUVOQyxZQUFRSCxRQUFRQyxHQUFSLENBQVlHO0FBRmQsR0FEbUI7QUFLM0JDLFFBQU07QUFDSkMsZUFBVyxtQ0FEUDtBQUVKQyxtQkFBZSw4QkFGWDtBQUdKQyxlQUFXO0FBSFA7QUFMcUIsQ0FBZCxDQUFmOztBQVlBLElBQU1DO0FBQUEsc0ZBQVksaUJBQU9DLEdBQVAsRUFBWUMsR0FBWixFQUFpQkMsT0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFFRWpCLE9BQU9rQixpQkFBUCxDQUF5QkMsWUFBekIsQ0FBc0M7QUFDdERDLDRCQUFpQmYsUUFBUUMsR0FBUixDQUFZZSxRQUE3QiwyQkFEc0Q7QUFFdERDLHFCQUFPLCtCQUYrQztBQUd0REMscUJBQU9SLElBQUlTLElBQUosQ0FBU0MsR0FBVCxDQUFhLElBQWI7QUFIK0MsYUFBdEMsQ0FGRjs7QUFBQTtBQUVWQyxlQUZVO0FBQUEsNkNBUVRBLEdBUlM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztBQVlBLElBQU1DLGlCQUFpQixJQUFJQyxhQUFKLENBQVU7QUFDL0JDLFVBQVEsS0FEdUI7QUFFL0JDLFFBQU0sc0JBRnlCO0FBRy9CaEI7QUFIK0IsQ0FBVixDQUF2Qjs7a0JBTWVhLGMiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmVyJ1xuaW1wb3J0IE9BdXRoMiBmcm9tICdzaW1wbGUtb2F1dGgyJ1xuXG5jb25zdCBvYXV0aDIgPSBPQXV0aDIuY3JlYXRlKHtcbiAgY2xpZW50OiB7XG4gICAgaWQ6IHByb2Nlc3MuZW52Lk1JQ1JPU09GVF9BUFBfSUQsXG4gICAgc2VjcmV0OiBwcm9jZXNzLmVudi5NSUNST1NPRlRfQVBQX1NFQ1JFVFxuICB9LFxuICBhdXRoOiB7XG4gICAgdG9rZW5Ib3N0OiAnaHR0cHM6Ly9sb2dpbi5taWNyb3NvZnRvbmxpbmUuY29tJyxcbiAgICBhdXRob3JpemVQYXRoOiAnY29tbW9uL29hdXRoMi92Mi4wL2F1dGhvcml6ZScsXG4gICAgdG9rZW5QYXRoOiAnY29tbW9uL29hdXRoMi92Mi4wL3Rva2VuJ1xuICB9XG59KVxuXG5jb25zdCBwcm9jZXNzb3IgPSBhc3luYyAocmVxLCB0cngsIG9wdGlvbnMpID0+IHtcblxuICBjb25zdCB1cmwgPSBhd2FpdCBvYXV0aDIuYXV0aG9yaXphdGlvbkNvZGUuYXV0aG9yaXplVVJMKHtcbiAgICByZWRpcmVjdF91cmk6IGAke3Byb2Nlc3MuZW52LldFQl9IT1NUfS9hZG1pbi9taWNyb3NvZnQvdG9rZW5gLFxuICAgIHNjb3BlOiAnb2ZmbGluZV9hY2Nlc3MgZmlsZXMucmVhZC5hbGwnLFxuICAgIHN0YXRlOiByZXEudXNlci5nZXQoJ2lkJylcbiAgfSlcblxuICByZXR1cm4gdXJsXG5cbn1cblxuY29uc3QgYXV0aG9yaXplUm91dGUgPSBuZXcgUm91dGUoe1xuICBtZXRob2Q6ICdnZXQnLFxuICBwYXRoOiAnL21pY3Jvc29mdC9hdXRob3JpemUnLFxuICBwcm9jZXNzb3Jcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IGF1dGhvcml6ZVJvdXRlXG4iXX0=