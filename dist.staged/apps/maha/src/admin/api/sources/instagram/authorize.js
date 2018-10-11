'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../../server');

var _instagramNode = require('instagram-node');

var _instagramNode2 = _interopRequireDefault(_instagramNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ig = new _instagramNode2.default.instagram();

ig.use({
  client_id: process.env.INSTAGRAM_CLIENT_ID,
  client_secret: process.env.INSTAGRAM_CLIENT_SECRET
});

var redirect_uri = process.env.WEB_HOST + '/admin/instagram/token';

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var response;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return ig.get_authorization_url(redirect_uri, {
              scope: 'basic',
              state: req.user.get('id')
            });

          case 2:
            response = _context.sent;
            return _context.abrupt('return', response);

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
  path: '/instagram/authorize',
  processor: processor
});

exports.default = authorizeRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiaWciLCJJbnN0YWdyYW0iLCJpbnN0YWdyYW0iLCJ1c2UiLCJjbGllbnRfaWQiLCJwcm9jZXNzIiwiZW52IiwiSU5TVEFHUkFNX0NMSUVOVF9JRCIsImNsaWVudF9zZWNyZXQiLCJJTlNUQUdSQU1fQ0xJRU5UX1NFQ1JFVCIsInJlZGlyZWN0X3VyaSIsIldFQl9IT1NUIiwicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsImdldF9hdXRob3JpemF0aW9uX3VybCIsInNjb3BlIiwic3RhdGUiLCJ1c2VyIiwiZ2V0IiwicmVzcG9uc2UiLCJhdXRob3JpemVSb3V0ZSIsIlJvdXRlIiwibWV0aG9kIiwicGF0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsS0FBSyxJQUFJQyx3QkFBVUMsU0FBZCxFQUFYOztBQUVBRixHQUFHRyxHQUFILENBQU87QUFDTEMsYUFBV0MsUUFBUUMsR0FBUixDQUFZQyxtQkFEbEI7QUFFTEMsaUJBQWVILFFBQVFDLEdBQVIsQ0FBWUc7QUFGdEIsQ0FBUDs7QUFLQSxJQUFNQyxlQUFrQkwsUUFBUUMsR0FBUixDQUFZSyxRQUE5QiwyQkFBTjs7QUFFQSxJQUFNQztBQUFBLHNGQUFZLGlCQUFPQyxHQUFQLEVBQVlDLEdBQVosRUFBaUJDLE9BQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRU9mLEdBQUdnQixxQkFBSCxDQUF5Qk4sWUFBekIsRUFBdUM7QUFDNURPLHFCQUFPLE9BRHFEO0FBRTVEQyxxQkFBT0wsSUFBSU0sSUFBSixDQUFTQyxHQUFULENBQWEsSUFBYjtBQUZxRCxhQUF2QyxDQUZQOztBQUFBO0FBRVZDLG9CQUZVO0FBQUEsNkNBTVRBLFFBTlM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztBQVVBLElBQU1DLGlCQUFpQixJQUFJQyxhQUFKLENBQVU7QUFDL0JDLFVBQVEsS0FEdUI7QUFFL0JDLFFBQU0sc0JBRnlCO0FBRy9CYjtBQUgrQixDQUFWLENBQXZCOztrQkFNZVUsYyIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGUgfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2ZXInXG5pbXBvcnQgSW5zdGFncmFtIGZyb20gJ2luc3RhZ3JhbS1ub2RlJ1xuXG5jb25zdCBpZyA9IG5ldyBJbnN0YWdyYW0uaW5zdGFncmFtKClcblxuaWcudXNlKHtcbiAgY2xpZW50X2lkOiBwcm9jZXNzLmVudi5JTlNUQUdSQU1fQ0xJRU5UX0lELFxuICBjbGllbnRfc2VjcmV0OiBwcm9jZXNzLmVudi5JTlNUQUdSQU1fQ0xJRU5UX1NFQ1JFVFxufSlcblxuY29uc3QgcmVkaXJlY3RfdXJpID0gYCR7cHJvY2Vzcy5lbnYuV0VCX0hPU1R9L2FkbWluL2luc3RhZ3JhbS90b2tlbmBcblxuY29uc3QgcHJvY2Vzc29yID0gYXN5bmMgKHJlcSwgdHJ4LCBvcHRpb25zKSA9PiB7XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBpZy5nZXRfYXV0aG9yaXphdGlvbl91cmwocmVkaXJlY3RfdXJpLCB7XG4gICAgc2NvcGU6ICdiYXNpYycsXG4gICAgc3RhdGU6IHJlcS51c2VyLmdldCgnaWQnKVxuICB9KVxuICByZXR1cm4gcmVzcG9uc2VcblxufVxuXG5jb25zdCBhdXRob3JpemVSb3V0ZSA9IG5ldyBSb3V0ZSh7XG4gIG1ldGhvZDogJ2dldCcsXG4gIHBhdGg6ICcvaW5zdGFncmFtL2F1dGhvcml6ZScsXG4gIHByb2Nlc3NvclxufSlcblxuZXhwb3J0IGRlZmF1bHQgYXV0aG9yaXplUm91dGVcbiJdfQ==