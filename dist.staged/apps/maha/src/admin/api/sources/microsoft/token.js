'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var token = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var result, data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return oauth2.authorizationCode.getToken({
              redirect_uri: process.env.WEB_HOST + '/admin/microsoft/token',
              scope: 'files.read.all',
              code: req.query.code
            });

          case 2:
            result = _context.sent;
            _context.next = 5;
            return oauth2.accessToken.create(result);

          case 5:
            data = _context.sent;
            return _context.abrupt('return', data.token);

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function token(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = token;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsib2F1dGgyIiwiT0F1dGgyIiwiY3JlYXRlIiwiY2xpZW50IiwiaWQiLCJwcm9jZXNzIiwiZW52IiwiTUlDUk9TT0ZUX0FQUF9JRCIsInNlY3JldCIsIk1JQ1JPU09GVF9BUFBfU0VDUkVUIiwiYXV0aCIsInRva2VuSG9zdCIsImF1dGhvcml6ZVBhdGgiLCJ0b2tlblBhdGgiLCJ0b2tlbiIsInJlcSIsInJlcyIsIm5leHQiLCJhdXRob3JpemF0aW9uQ29kZSIsImdldFRva2VuIiwicmVkaXJlY3RfdXJpIiwiV0VCX0hPU1QiLCJzY29wZSIsImNvZGUiLCJxdWVyeSIsInJlc3VsdCIsImFjY2Vzc1Rva2VuIiwiZGF0YSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0FBRUEsSUFBTUEsU0FBU0Msc0JBQU9DLE1BQVAsQ0FBYztBQUMzQkMsVUFBUTtBQUNOQyxRQUFJQyxRQUFRQyxHQUFSLENBQVlDLGdCQURWO0FBRU5DLFlBQVFILFFBQVFDLEdBQVIsQ0FBWUc7QUFGZCxHQURtQjtBQUszQkMsUUFBTTtBQUNKQyxlQUFXLG1DQURQO0FBRUpDLG1CQUFlLDhCQUZYO0FBR0pDLGVBQVc7QUFIUDtBQUxxQixDQUFkLENBQWY7O0FBWUEsSUFBTUM7QUFBQSxzRkFBUSxpQkFBT0MsR0FBUCxFQUFZQyxHQUFaLEVBQWlCQyxJQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUVPakIsT0FBT2tCLGlCQUFQLENBQXlCQyxRQUF6QixDQUFrQztBQUNuREMsNEJBQWlCZixRQUFRQyxHQUFSLENBQVllLFFBQTdCLDJCQURtRDtBQUVuREMscUJBQU8sZ0JBRjRDO0FBR25EQyxvQkFBTVIsSUFBSVMsS0FBSixDQUFVRDtBQUhtQyxhQUFsQyxDQUZQOztBQUFBO0FBRVJFLGtCQUZRO0FBQUE7QUFBQSxtQkFRT3pCLE9BQU8wQixXQUFQLENBQW1CeEIsTUFBbkIsQ0FBMEJ1QixNQUExQixDQVJQOztBQUFBO0FBUU5FLGdCQVJNO0FBQUEsNkNBVUxBLEtBQUtiLEtBVkE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBUjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztrQkFjZUEsSyIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE9BdXRoMiBmcm9tICdzaW1wbGUtb2F1dGgyJ1xuXG5jb25zdCBvYXV0aDIgPSBPQXV0aDIuY3JlYXRlKHtcbiAgY2xpZW50OiB7XG4gICAgaWQ6IHByb2Nlc3MuZW52Lk1JQ1JPU09GVF9BUFBfSUQsXG4gICAgc2VjcmV0OiBwcm9jZXNzLmVudi5NSUNST1NPRlRfQVBQX1NFQ1JFVFxuICB9LFxuICBhdXRoOiB7XG4gICAgdG9rZW5Ib3N0OiAnaHR0cHM6Ly9sb2dpbi5taWNyb3NvZnRvbmxpbmUuY29tJyxcbiAgICBhdXRob3JpemVQYXRoOiAnY29tbW9uL29hdXRoMi92Mi4wL2F1dGhvcml6ZScsXG4gICAgdG9rZW5QYXRoOiAnY29tbW9uL29hdXRoMi92Mi4wL3Rva2VuJ1xuICB9XG59KVxuXG5jb25zdCB0b2tlbiA9IGFzeW5jIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuXG4gIGxldCByZXN1bHQgPSBhd2FpdCBvYXV0aDIuYXV0aG9yaXphdGlvbkNvZGUuZ2V0VG9rZW4oe1xuICAgIHJlZGlyZWN0X3VyaTogYCR7cHJvY2Vzcy5lbnYuV0VCX0hPU1R9L2FkbWluL21pY3Jvc29mdC90b2tlbmAsXG4gICAgc2NvcGU6ICdmaWxlcy5yZWFkLmFsbCcsXG4gICAgY29kZTogcmVxLnF1ZXJ5LmNvZGVcbiAgfSlcblxuICBjb25zdCBkYXRhID0gYXdhaXQgb2F1dGgyLmFjY2Vzc1Rva2VuLmNyZWF0ZShyZXN1bHQpXG5cbiAgcmV0dXJuIGRhdGEudG9rZW5cblxufVxuXG5leHBvcnQgZGVmYXVsdCB0b2tlblxuIl19