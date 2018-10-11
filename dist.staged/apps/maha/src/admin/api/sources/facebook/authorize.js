'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _server = require('../../../../server');

var _fb = require('fb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fb = new _fb.Facebook({
  appId: process.env.FACEBOOK_APP_ID,
  appSecret: process.env.FACEBOOK_APP_SECRET,
  Promise: _bluebird2.default
});

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var response;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fb.getLoginUrl({
              scope: 'user_photos',
              redirect_uri: process.env.WEB_HOST + '/admin/facebook/token',
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
  path: '/facebook/authorize',
  processor: processor
});

exports.default = authorizeRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiZmIiLCJGYWNlYm9vayIsImFwcElkIiwicHJvY2VzcyIsImVudiIsIkZBQ0VCT09LX0FQUF9JRCIsImFwcFNlY3JldCIsIkZBQ0VCT09LX0FQUF9TRUNSRVQiLCJQcm9taXNlIiwicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsImdldExvZ2luVXJsIiwic2NvcGUiLCJyZWRpcmVjdF91cmkiLCJXRUJfSE9TVCIsInN0YXRlIiwidXNlciIsImdldCIsInJlc3BvbnNlIiwiYXV0aG9yaXplUm91dGUiLCJSb3V0ZSIsIm1ldGhvZCIsInBhdGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBRUEsSUFBTUEsS0FBSyxJQUFJQyxZQUFKLENBQWE7QUFDdEJDLFNBQU9DLFFBQVFDLEdBQVIsQ0FBWUMsZUFERztBQUV0QkMsYUFBV0gsUUFBUUMsR0FBUixDQUFZRyxtQkFGRDtBQUd0QkM7QUFIc0IsQ0FBYixDQUFYOztBQU1BLElBQU1DO0FBQUEsc0ZBQVksaUJBQU9DLEdBQVAsRUFBWUMsR0FBWixFQUFpQkMsT0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFFT1osR0FBR2EsV0FBSCxDQUFlO0FBQ3BDQyxxQkFBTyxhQUQ2QjtBQUVwQ0MsNEJBQWlCWixRQUFRQyxHQUFSLENBQVlZLFFBQTdCLDBCQUZvQztBQUdwQ0MscUJBQU9QLElBQUlRLElBQUosQ0FBU0MsR0FBVCxDQUFhLElBQWI7QUFINkIsYUFBZixDQUZQOztBQUFBO0FBRVZDLG9CQUZVO0FBQUEsNkNBUVRBLFFBUlM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztBQVlBLElBQU1DLGlCQUFpQixJQUFJQyxhQUFKLENBQVU7QUFDL0JDLFVBQVEsS0FEdUI7QUFFL0JDLFFBQU0scUJBRnlCO0FBRy9CZjtBQUgrQixDQUFWLENBQXZCOztrQkFNZVksYyIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGUgfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2ZXInXG5pbXBvcnQgeyBGYWNlYm9vayB9IGZyb20gJ2ZiJ1xuXG5jb25zdCBmYiA9IG5ldyBGYWNlYm9vayh7XG4gIGFwcElkOiBwcm9jZXNzLmVudi5GQUNFQk9PS19BUFBfSUQsXG4gIGFwcFNlY3JldDogcHJvY2Vzcy5lbnYuRkFDRUJPT0tfQVBQX1NFQ1JFVCxcbiAgUHJvbWlzZVxufSlcblxuY29uc3QgcHJvY2Vzc29yID0gYXN5bmMgKHJlcSwgdHJ4LCBvcHRpb25zKSA9PiB7XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmYi5nZXRMb2dpblVybCh7XG4gICAgc2NvcGU6ICd1c2VyX3Bob3RvcycsXG4gICAgcmVkaXJlY3RfdXJpOiBgJHtwcm9jZXNzLmVudi5XRUJfSE9TVH0vYWRtaW4vZmFjZWJvb2svdG9rZW5gLFxuICAgIHN0YXRlOiByZXEudXNlci5nZXQoJ2lkJylcbiAgfSlcblxuICByZXR1cm4gcmVzcG9uc2VcblxufVxuXG5jb25zdCBhdXRob3JpemVSb3V0ZSA9IG5ldyBSb3V0ZSh7XG4gIG1ldGhvZDogJ2dldCcsXG4gIHBhdGg6ICcvZmFjZWJvb2svYXV0aG9yaXplJyxcbiAgcHJvY2Vzc29yXG59KVxuXG5leHBvcnQgZGVmYXVsdCBhdXRob3JpemVSb3V0ZVxuIl19