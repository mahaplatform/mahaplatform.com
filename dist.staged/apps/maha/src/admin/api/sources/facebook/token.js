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

var _fb = require('fb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fb = new _fb.Facebook({
  appId: process.env.FACEBOOK_APP_ID,
  appSecret: process.env.FACEBOOK_APP_SECRET,
  Promise: _bluebird2.default
});

var token = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fb.api('oauth/access_token', {
              client_id: process.env.FACEBOOK_APP_ID,
              client_secret: process.env.FACEBOOK_APP_SECRET,
              redirect_uri: process.env.WEB_HOST + '/admin/facebook/token',
              code: req.query.code
            });

          case 2:
            data = _context.sent;
            return _context.abrupt('return', data);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiZmIiLCJGYWNlYm9vayIsImFwcElkIiwicHJvY2VzcyIsImVudiIsIkZBQ0VCT09LX0FQUF9JRCIsImFwcFNlY3JldCIsIkZBQ0VCT09LX0FQUF9TRUNSRVQiLCJQcm9taXNlIiwidG9rZW4iLCJyZXEiLCJyZXMiLCJuZXh0IiwiYXBpIiwiY2xpZW50X2lkIiwiY2xpZW50X3NlY3JldCIsInJlZGlyZWN0X3VyaSIsIldFQl9IT1NUIiwiY29kZSIsInF1ZXJ5IiwiZGF0YSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQSxJQUFNQSxLQUFLLElBQUlDLFlBQUosQ0FBYTtBQUN0QkMsU0FBT0MsUUFBUUMsR0FBUixDQUFZQyxlQURHO0FBRXRCQyxhQUFXSCxRQUFRQyxHQUFSLENBQVlHLG1CQUZEO0FBR3RCQztBQUhzQixDQUFiLENBQVg7O0FBTUEsSUFBTUM7QUFBQSxzRkFBUSxpQkFBT0MsR0FBUCxFQUFZQyxHQUFaLEVBQWlCQyxJQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUVPWixHQUFHYSxHQUFILENBQU8sb0JBQVAsRUFBNkI7QUFDOUNDLHlCQUFXWCxRQUFRQyxHQUFSLENBQVlDLGVBRHVCO0FBRTlDVSw2QkFBZVosUUFBUUMsR0FBUixDQUFZRyxtQkFGbUI7QUFHOUNTLDRCQUFpQmIsUUFBUUMsR0FBUixDQUFZYSxRQUE3QiwwQkFIOEM7QUFJOUNDLG9CQUFNUixJQUFJUyxLQUFKLENBQVVEO0FBSjhCLGFBQTdCLENBRlA7O0FBQUE7QUFFTkUsZ0JBRk07QUFBQSw2Q0FTTEEsSUFUSzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFSOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O2tCQWFlWCxLIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGYWNlYm9vayB9IGZyb20gJ2ZiJ1xuXG5jb25zdCBmYiA9IG5ldyBGYWNlYm9vayh7XG4gIGFwcElkOiBwcm9jZXNzLmVudi5GQUNFQk9PS19BUFBfSUQsXG4gIGFwcFNlY3JldDogcHJvY2Vzcy5lbnYuRkFDRUJPT0tfQVBQX1NFQ1JFVCxcbiAgUHJvbWlzZVxufSlcblxuY29uc3QgdG9rZW4gPSBhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcblxuICBjb25zdCBkYXRhID0gYXdhaXQgZmIuYXBpKCdvYXV0aC9hY2Nlc3NfdG9rZW4nLCB7XG4gICAgY2xpZW50X2lkOiBwcm9jZXNzLmVudi5GQUNFQk9PS19BUFBfSUQsXG4gICAgY2xpZW50X3NlY3JldDogcHJvY2Vzcy5lbnYuRkFDRUJPT0tfQVBQX1NFQ1JFVCxcbiAgICByZWRpcmVjdF91cmk6IGAke3Byb2Nlc3MuZW52LldFQl9IT1NUfS9hZG1pbi9mYWNlYm9vay90b2tlbmAsXG4gICAgY29kZTogcmVxLnF1ZXJ5LmNvZGVcbiAgfSlcblxuICByZXR1cm4gZGF0YVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IHRva2VuXG4iXX0=