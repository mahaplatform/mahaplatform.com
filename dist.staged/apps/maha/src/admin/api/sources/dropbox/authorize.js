'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../../server');

var _dropboxV2Api = require('dropbox-v2-api');

var _dropboxV2Api2 = _interopRequireDefault(_dropboxV2Api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dropbox = new _dropboxV2Api2.default.authenticate({
  client_id: process.env.DROPBOX_APP_KEY,
  client_secret: process.env.DROPBOX_APP_SECRET,
  redirect_uri: process.env.WEB_HOST + '/admin/dropbox/token'
});

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var url;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return dropbox.generateAuthUrl();

          case 2:
            url = _context.sent;
            return _context.abrupt('return', url + '&state=' + req.user.get('id'));

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
  path: '/dropbox/authorize',
  processor: processor
});

exports.default = authorizeRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiZHJvcGJveCIsIkRyb3Bib3giLCJhdXRoZW50aWNhdGUiLCJjbGllbnRfaWQiLCJwcm9jZXNzIiwiZW52IiwiRFJPUEJPWF9BUFBfS0VZIiwiY2xpZW50X3NlY3JldCIsIkRST1BCT1hfQVBQX1NFQ1JFVCIsInJlZGlyZWN0X3VyaSIsIldFQl9IT1NUIiwicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsImdlbmVyYXRlQXV0aFVybCIsInVybCIsInVzZXIiLCJnZXQiLCJhdXRob3JpemVSb3V0ZSIsIlJvdXRlIiwibWV0aG9kIiwicGF0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsVUFBVSxJQUFJQyx1QkFBUUMsWUFBWixDQUF5QjtBQUN2Q0MsYUFBV0MsUUFBUUMsR0FBUixDQUFZQyxlQURnQjtBQUV2Q0MsaUJBQWVILFFBQVFDLEdBQVIsQ0FBWUcsa0JBRlk7QUFHdkNDLGdCQUFpQkwsUUFBUUMsR0FBUixDQUFZSyxRQUE3QjtBQUh1QyxDQUF6QixDQUFoQjs7QUFNQSxJQUFNQztBQUFBLHNGQUFZLGlCQUFPQyxHQUFQLEVBQVlDLEdBQVosRUFBaUJDLE9BQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRUVkLFFBQVFlLGVBQVIsRUFGRjs7QUFBQTtBQUVWQyxlQUZVO0FBQUEsNkNBSU5BLEdBSk0sZUFJT0osSUFBSUssSUFBSixDQUFTQyxHQUFULENBQWEsSUFBYixDQUpQOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUFRQSxJQUFNQyxpQkFBaUIsSUFBSUMsYUFBSixDQUFVO0FBQy9CQyxVQUFRLEtBRHVCO0FBRS9CQyxRQUFNLG9CQUZ5QjtBQUcvQlg7QUFIK0IsQ0FBVixDQUF2Qjs7a0JBTWVRLGMiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmVyJ1xuaW1wb3J0IERyb3Bib3ggZnJvbSAnZHJvcGJveC12Mi1hcGknXG5cbmNvbnN0IGRyb3Bib3ggPSBuZXcgRHJvcGJveC5hdXRoZW50aWNhdGUoe1xuICBjbGllbnRfaWQ6IHByb2Nlc3MuZW52LkRST1BCT1hfQVBQX0tFWSxcbiAgY2xpZW50X3NlY3JldDogcHJvY2Vzcy5lbnYuRFJPUEJPWF9BUFBfU0VDUkVULFxuICByZWRpcmVjdF91cmk6IGAke3Byb2Nlc3MuZW52LldFQl9IT1NUfS9hZG1pbi9kcm9wYm94L3Rva2VuYFxufSlcblxuY29uc3QgcHJvY2Vzc29yID0gYXN5bmMgKHJlcSwgdHJ4LCBvcHRpb25zKSA9PiB7XG5cbiAgY29uc3QgdXJsID0gYXdhaXQgZHJvcGJveC5nZW5lcmF0ZUF1dGhVcmwoKVxuXG4gIHJldHVybiBgJHt1cmx9JnN0YXRlPSR7cmVxLnVzZXIuZ2V0KCdpZCcpfWBcblxufVxuXG5jb25zdCBhdXRob3JpemVSb3V0ZSA9IG5ldyBSb3V0ZSh7XG4gIG1ldGhvZDogJ2dldCcsXG4gIHBhdGg6ICcvZHJvcGJveC9hdXRob3JpemUnLFxuICBwcm9jZXNzb3Jcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IGF1dGhvcml6ZVJvdXRlXG4iXX0=