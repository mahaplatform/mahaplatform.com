'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = require('bluebird');

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _instagramNode = require('instagram-node');

var _instagramNode2 = _interopRequireDefault(_instagramNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ig = new _instagramNode2.default.instagram();

ig.use({
  client_id: process.env.INSTAGRAM_CLIENT_ID,
  client_secret: process.env.INSTAGRAM_CLIENT_SECRET
});

var redirect_uri = process.env.WEB_HOST + '/admin/instagram/token';

var token = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _bluebird.promisify)(ig.authorize_user)(req.query.code, redirect_uri);

          case 2:
            data = _context.sent;
            return _context.abrupt('return', {
              access_token: data.access_token
            });

          case 4:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiaWciLCJJbnN0YWdyYW0iLCJpbnN0YWdyYW0iLCJ1c2UiLCJjbGllbnRfaWQiLCJwcm9jZXNzIiwiZW52IiwiSU5TVEFHUkFNX0NMSUVOVF9JRCIsImNsaWVudF9zZWNyZXQiLCJJTlNUQUdSQU1fQ0xJRU5UX1NFQ1JFVCIsInJlZGlyZWN0X3VyaSIsIldFQl9IT1NUIiwidG9rZW4iLCJyZXEiLCJyZXMiLCJuZXh0IiwiYXV0aG9yaXplX3VzZXIiLCJxdWVyeSIsImNvZGUiLCJkYXRhIiwiYWNjZXNzX3Rva2VuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztBQUVBLElBQU1BLEtBQUssSUFBSUMsd0JBQVVDLFNBQWQsRUFBWDs7QUFFQUYsR0FBR0csR0FBSCxDQUFPO0FBQ0xDLGFBQVdDLFFBQVFDLEdBQVIsQ0FBWUMsbUJBRGxCO0FBRUxDLGlCQUFlSCxRQUFRQyxHQUFSLENBQVlHO0FBRnRCLENBQVA7O0FBS0EsSUFBTUMsZUFBa0JMLFFBQVFDLEdBQVIsQ0FBWUssUUFBOUIsMkJBQU47O0FBRUEsSUFBTUM7QUFBQSxzRkFBUSxpQkFBT0MsR0FBUCxFQUFZQyxHQUFaLEVBQWlCQyxJQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUVPLHlCQUFrQmYsR0FBR2dCLGNBQXJCLEVBQXFDSCxJQUFJSSxLQUFKLENBQVVDLElBQS9DLEVBQXFEUixZQUFyRCxDQUZQOztBQUFBO0FBRU5TLGdCQUZNO0FBQUEsNkNBSUw7QUFDTEMsNEJBQWNELEtBQUtDO0FBRGQsYUFKSzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFSOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O2tCQVVlUixLIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSW5zdGFncmFtIGZyb20gJ2luc3RhZ3JhbS1ub2RlJ1xuXG5jb25zdCBpZyA9IG5ldyBJbnN0YWdyYW0uaW5zdGFncmFtKClcblxuaWcudXNlKHtcbiAgY2xpZW50X2lkOiBwcm9jZXNzLmVudi5JTlNUQUdSQU1fQ0xJRU5UX0lELFxuICBjbGllbnRfc2VjcmV0OiBwcm9jZXNzLmVudi5JTlNUQUdSQU1fQ0xJRU5UX1NFQ1JFVFxufSlcblxuY29uc3QgcmVkaXJlY3RfdXJpID0gYCR7cHJvY2Vzcy5lbnYuV0VCX0hPU1R9L2FkbWluL2luc3RhZ3JhbS90b2tlbmBcblxuY29uc3QgdG9rZW4gPSBhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcblxuICBjb25zdCBkYXRhID0gYXdhaXQgUHJvbWlzZS5wcm9taXNpZnkoaWcuYXV0aG9yaXplX3VzZXIpKHJlcS5xdWVyeS5jb2RlLCByZWRpcmVjdF91cmkpXG5cbiAgcmV0dXJuIHtcbiAgICBhY2Nlc3NfdG9rZW46IGRhdGEuYWNjZXNzX3Rva2VuXG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCB0b2tlblxuIl19