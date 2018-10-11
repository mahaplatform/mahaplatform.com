'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../../server');

var _googleapis = require('googleapis');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = new _googleapis.google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.WEB_HOST + '/admin/google/token');

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var authUrl;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            authUrl = auth.generateAuthUrl({
              access_type: 'offline',
              state: req.user.get('id'),
              prompt: 'consent',
              scope: ['https://www.googleapis.com/auth/drive.readonly', 'https://www.googleapis.com/auth/drive.photos.readonly']
            });
            return _context.abrupt('return', authUrl);

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
  path: '/google/authorize',
  processor: processor
});

exports.default = authorizeRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiYXV0aCIsImdvb2dsZSIsIk9BdXRoMiIsInByb2Nlc3MiLCJlbnYiLCJHT09HTEVfQ0xJRU5UX0lEIiwiR09PR0xFX0NMSUVOVF9TRUNSRVQiLCJXRUJfSE9TVCIsInByb2Nlc3NvciIsInJlcSIsInRyeCIsIm9wdGlvbnMiLCJhdXRoVXJsIiwiZ2VuZXJhdGVBdXRoVXJsIiwiYWNjZXNzX3R5cGUiLCJzdGF0ZSIsInVzZXIiLCJnZXQiLCJwcm9tcHQiLCJzY29wZSIsImF1dGhvcml6ZVJvdXRlIiwiUm91dGUiLCJtZXRob2QiLCJwYXRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBRUEsSUFBTUEsT0FBTyxJQUFJQyxtQkFBT0QsSUFBUCxDQUFZRSxNQUFoQixDQUF1QkMsUUFBUUMsR0FBUixDQUFZQyxnQkFBbkMsRUFBcURGLFFBQVFDLEdBQVIsQ0FBWUUsb0JBQWpFLEVBQTBGSCxRQUFRQyxHQUFSLENBQVlHLFFBQXRHLHlCQUFiOztBQUVBLElBQU1DO0FBQUEsc0ZBQVksaUJBQU9DLEdBQVAsRUFBWUMsR0FBWixFQUFpQkMsT0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRVZDLG1CQUZVLEdBRUFaLEtBQUthLGVBQUwsQ0FBcUI7QUFDbkNDLDJCQUFhLFNBRHNCO0FBRW5DQyxxQkFBT04sSUFBSU8sSUFBSixDQUFTQyxHQUFULENBQWEsSUFBYixDQUY0QjtBQUduQ0Msc0JBQVEsU0FIMkI7QUFJbkNDLHFCQUFPLENBQ0wsZ0RBREssRUFFTCx1REFGSztBQUo0QixhQUFyQixDQUZBO0FBQUEsNkNBWVRQLE9BWlM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztBQWdCQSxJQUFNUSxpQkFBaUIsSUFBSUMsYUFBSixDQUFVO0FBQy9CQyxVQUFRLEtBRHVCO0FBRS9CQyxRQUFNLG1CQUZ5QjtBQUcvQmY7QUFIK0IsQ0FBVixDQUF2Qjs7a0JBTWVZLGMiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmVyJ1xuaW1wb3J0IHsgZ29vZ2xlIH0gZnJvbSAnZ29vZ2xlYXBpcydcblxuY29uc3QgYXV0aCA9IG5ldyBnb29nbGUuYXV0aC5PQXV0aDIocHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9JRCwgcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9TRUNSRVQsIGAke3Byb2Nlc3MuZW52LldFQl9IT1NUfS9hZG1pbi9nb29nbGUvdG9rZW5gKVxuXG5jb25zdCBwcm9jZXNzb3IgPSBhc3luYyAocmVxLCB0cngsIG9wdGlvbnMpID0+IHtcblxuICBjb25zdCBhdXRoVXJsID0gYXV0aC5nZW5lcmF0ZUF1dGhVcmwoe1xuICAgIGFjY2Vzc190eXBlOiAnb2ZmbGluZScsXG4gICAgc3RhdGU6IHJlcS51c2VyLmdldCgnaWQnKSxcbiAgICBwcm9tcHQ6ICdjb25zZW50JyxcbiAgICBzY29wZTogW1xuICAgICAgJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvZHJpdmUucmVhZG9ubHknLFxuICAgICAgJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvZHJpdmUucGhvdG9zLnJlYWRvbmx5J1xuICAgIF1cbiAgfSlcblxuICByZXR1cm4gYXV0aFVybFxuXG59XG5cbmNvbnN0IGF1dGhvcml6ZVJvdXRlID0gbmV3IFJvdXRlKHtcbiAgbWV0aG9kOiAnZ2V0JyxcbiAgcGF0aDogJy9nb29nbGUvYXV0aG9yaXplJyxcbiAgcHJvY2Vzc29yXG59KVxuXG5leHBvcnQgZGVmYXVsdCBhdXRob3JpemVSb3V0ZVxuIl19