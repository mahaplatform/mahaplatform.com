'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _user_tokens = require('../../../core/utils/user_tokens');

var _notifications = require('./notifications');

var _notifications2 = _interopRequireDefault(_notifications);

var _server = require('../../../server');

var _security = require('./security');

var _security2 = _interopRequireDefault(_security);

var _password = require('./password');

var _password2 = _interopRequireDefault(_password);

var _assets = require('../assets');

var _assets2 = _interopRequireDefault(_assets);

var _verify = require('./verify');

var _verify2 = _interopRequireDefault(_verify);

var _avatar = require('./avatar');

var _avatar2 = _interopRequireDefault(_avatar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _getToken = function _getToken(req) {

  if (req.body.token) return req.body.token;

  if (req.query.token) return req.query.token;

  if (req.headers.authorization) {

    var matches = req.headers.authorization.match(/Bearer (.*)/);

    if (!matches) return null;

    return matches[1];
  }
};

var alterRequest = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var token, _ref2, user;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = _getToken(req);
            _context.next = 3;
            return (0, _user_tokens.loadUserFromToken)('activation_id', token, trx);

          case 3:
            _ref2 = _context.sent;
            user = _ref2.user;
            _context.next = 7;
            return user.load(['team'], { transacting: trx });

          case 7:

            req.team = user.related('team');

            req.user = user;

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function alterRequest(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var activateSegment = new _server.Segment({
  alterRequest: alterRequest,
  authenticated: false,
  path: '/activate',
  routes: [_verify2.default, _security2.default, _password2.default, _avatar2.default, _notifications2.default, _assets2.default]
});

exports.default = activateSegment;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiX2dldFRva2VuIiwicmVxIiwiYm9keSIsInRva2VuIiwicXVlcnkiLCJoZWFkZXJzIiwiYXV0aG9yaXphdGlvbiIsIm1hdGNoZXMiLCJtYXRjaCIsImFsdGVyUmVxdWVzdCIsInRyeCIsIm9wdGlvbnMiLCJ1c2VyIiwibG9hZCIsInRyYW5zYWN0aW5nIiwidGVhbSIsInJlbGF0ZWQiLCJhY3RpdmF0ZVNlZ21lbnQiLCJTZWdtZW50IiwiYXV0aGVudGljYXRlZCIsInBhdGgiLCJyb3V0ZXMiLCJ2ZXJpZnkiLCJzZWN1cml0eSIsInBhc3N3b3JkIiwiYXZhdGFyIiwibm90aWZpY2F0aW9ucyIsImFzc2V0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLFlBQVksU0FBWkEsU0FBWSxDQUFDQyxHQUFELEVBQVM7O0FBRXpCLE1BQUdBLElBQUlDLElBQUosQ0FBU0MsS0FBWixFQUFtQixPQUFPRixJQUFJQyxJQUFKLENBQVNDLEtBQWhCOztBQUVuQixNQUFHRixJQUFJRyxLQUFKLENBQVVELEtBQWIsRUFBb0IsT0FBT0YsSUFBSUcsS0FBSixDQUFVRCxLQUFqQjs7QUFFcEIsTUFBR0YsSUFBSUksT0FBSixDQUFZQyxhQUFmLEVBQThCOztBQUU1QixRQUFNQyxVQUFVTixJQUFJSSxPQUFKLENBQVlDLGFBQVosQ0FBMEJFLEtBQTFCLENBQWdDLGFBQWhDLENBQWhCOztBQUVBLFFBQUcsQ0FBQ0QsT0FBSixFQUFhLE9BQU8sSUFBUDs7QUFFYixXQUFPQSxRQUFRLENBQVIsQ0FBUDtBQUVEO0FBRUYsQ0FoQkQ7O0FBa0JBLElBQU1FO0FBQUEsc0ZBQWUsaUJBQU9SLEdBQVAsRUFBWVMsR0FBWixFQUFpQkMsT0FBakI7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUViUixpQkFGYSxHQUVMSCxVQUFVQyxHQUFWLENBRks7QUFBQTtBQUFBLG1CQUlJLG9DQUFrQixlQUFsQixFQUFtQ0UsS0FBbkMsRUFBMENPLEdBQTFDLENBSko7O0FBQUE7QUFBQTtBQUlYRSxnQkFKVyxTQUlYQSxJQUpXO0FBQUE7QUFBQSxtQkFNYkEsS0FBS0MsSUFBTCxDQUFVLENBQUMsTUFBRCxDQUFWLEVBQW9CLEVBQUVDLGFBQWFKLEdBQWYsRUFBcEIsQ0FOYTs7QUFBQTs7QUFRbkJULGdCQUFJYyxJQUFKLEdBQVdILEtBQUtJLE9BQUwsQ0FBYSxNQUFiLENBQVg7O0FBRUFmLGdCQUFJVyxJQUFKLEdBQVdBLElBQVg7O0FBVm1CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQWY7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUFjQSxJQUFNSyxrQkFBa0IsSUFBSUMsZUFBSixDQUFZO0FBQ2xDVCw0QkFEa0M7QUFFbENVLGlCQUFlLEtBRm1CO0FBR2xDQyxRQUFNLFdBSDRCO0FBSWxDQyxVQUFRLENBQ05DLGdCQURNLEVBRU5DLGtCQUZNLEVBR05DLGtCQUhNLEVBSU5DLGdCQUpNLEVBS05DLHVCQUxNLEVBTU5DLGdCQU5NO0FBSjBCLENBQVosQ0FBeEI7O2tCQWNlVixlIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBsb2FkVXNlckZyb21Ub2tlbiB9IGZyb20gJy4uLy4uLy4uL2NvcmUvdXRpbHMvdXNlcl90b2tlbnMnXG5pbXBvcnQgbm90aWZpY2F0aW9ucyBmcm9tICcuL25vdGlmaWNhdGlvbnMnXG5pbXBvcnQgeyBTZWdtZW50IH0gZnJvbSAnLi4vLi4vLi4vc2VydmVyJ1xuaW1wb3J0IHNlY3VyaXR5IGZyb20gJy4vc2VjdXJpdHknXG5pbXBvcnQgcGFzc3dvcmQgZnJvbSAnLi9wYXNzd29yZCdcbmltcG9ydCBhc3NldHMgZnJvbSAnLi4vYXNzZXRzJ1xuaW1wb3J0IHZlcmlmeSBmcm9tICcuL3ZlcmlmeSdcbmltcG9ydCBhdmF0YXIgZnJvbSAnLi9hdmF0YXInXG5cbmNvbnN0IF9nZXRUb2tlbiA9IChyZXEpID0+IHtcblxuICBpZihyZXEuYm9keS50b2tlbikgcmV0dXJuIHJlcS5ib2R5LnRva2VuXG5cbiAgaWYocmVxLnF1ZXJ5LnRva2VuKSByZXR1cm4gcmVxLnF1ZXJ5LnRva2VuXG5cbiAgaWYocmVxLmhlYWRlcnMuYXV0aG9yaXphdGlvbikge1xuXG4gICAgY29uc3QgbWF0Y2hlcyA9IHJlcS5oZWFkZXJzLmF1dGhvcml6YXRpb24ubWF0Y2goL0JlYXJlciAoLiopLylcblxuICAgIGlmKCFtYXRjaGVzKSByZXR1cm4gbnVsbFxuXG4gICAgcmV0dXJuIG1hdGNoZXNbMV1cblxuICB9XG5cbn1cblxuY29uc3QgYWx0ZXJSZXF1ZXN0ID0gYXN5bmMgKHJlcSwgdHJ4LCBvcHRpb25zKSA9PiB7XG5cbiAgY29uc3QgdG9rZW4gPSBfZ2V0VG9rZW4ocmVxKVxuXG4gIGNvbnN0IHsgdXNlciB9ID0gYXdhaXQgbG9hZFVzZXJGcm9tVG9rZW4oJ2FjdGl2YXRpb25faWQnLCB0b2tlbiwgdHJ4KVxuXG4gIGF3YWl0IHVzZXIubG9hZChbJ3RlYW0nXSwgeyB0cmFuc2FjdGluZzogdHJ4IH0pXG5cbiAgcmVxLnRlYW0gPSB1c2VyLnJlbGF0ZWQoJ3RlYW0nKVxuXG4gIHJlcS51c2VyID0gdXNlclxuXG59XG5cbmNvbnN0IGFjdGl2YXRlU2VnbWVudCA9IG5ldyBTZWdtZW50KHtcbiAgYWx0ZXJSZXF1ZXN0LFxuICBhdXRoZW50aWNhdGVkOiBmYWxzZSxcbiAgcGF0aDogJy9hY3RpdmF0ZScsXG4gIHJvdXRlczogW1xuICAgIHZlcmlmeSxcbiAgICBzZWN1cml0eSxcbiAgICBwYXNzd29yZCxcbiAgICBhdmF0YXIsXG4gICAgbm90aWZpY2F0aW9ucyxcbiAgICBhc3NldHNcbiAgXVxufSlcblxuZXhwb3J0IGRlZmF1bHQgYWN0aXZhdGVTZWdtZW50XG4iXX0=