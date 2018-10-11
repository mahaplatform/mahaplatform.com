'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _user_tokens = require('../../../core/utils/user_tokens');

var _server = require('../../../server');

var _email = require('./email');

var _email2 = _interopRequireDefault(_email);

var _verify = require('./verify');

var _verify2 = _interopRequireDefault(_verify);

var _security = require('./security');

var _security2 = _interopRequireDefault(_security);

var _password = require('./password');

var _password2 = _interopRequireDefault(_password);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

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
    var token, _ref2, user, iat, reset_at;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = _getToken(req);
            _context.next = 3;
            return (0, _user_tokens.loadUserFromToken)('reset_id', token, trx);

          case 3:
            _ref2 = _context.sent;
            user = _ref2.user;
            iat = _ref2.iat;
            reset_at = user.get('reset_at');

            if (!(reset_at && (0, _moment2.default)(reset_at).unix() - iat > 0)) {
              _context.next = 9;
              break;
            }

            throw new _server.BackframeError({
              code: 404,
              message: 'This reset token has expired'
            });

          case 9:
            _context.next = 11;
            return user.load(['team'], { transacting: trx });

          case 11:

            req.team = user.related('team');

            req.user = user;

          case 13:
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

var authenticatedSegment = new _server.Segment({
  alterRequest: alterRequest,
  authenticated: false,
  routes: [_verify2.default, _security2.default, _password2.default]
});

var resetSegment = new _server.Segment({
  authenticated: false,
  path: '/reset',
  routes: [authenticatedSegment, _email2.default]
});

exports.default = resetSegment;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiX2dldFRva2VuIiwicmVxIiwiYm9keSIsInRva2VuIiwicXVlcnkiLCJoZWFkZXJzIiwiYXV0aG9yaXphdGlvbiIsIm1hdGNoZXMiLCJtYXRjaCIsImFsdGVyUmVxdWVzdCIsInRyeCIsIm9wdGlvbnMiLCJ1c2VyIiwiaWF0IiwicmVzZXRfYXQiLCJnZXQiLCJ1bml4IiwiQmFja2ZyYW1lRXJyb3IiLCJjb2RlIiwibWVzc2FnZSIsImxvYWQiLCJ0cmFuc2FjdGluZyIsInRlYW0iLCJyZWxhdGVkIiwiYXV0aGVudGljYXRlZFNlZ21lbnQiLCJTZWdtZW50IiwiYXV0aGVudGljYXRlZCIsInJvdXRlcyIsInZlcmlmeSIsInNlY3VyaXR5IiwicGFzc3dvcmQiLCJyZXNldFNlZ21lbnQiLCJwYXRoIiwiZW1haWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsWUFBWSxTQUFaQSxTQUFZLENBQUNDLEdBQUQsRUFBUzs7QUFFekIsTUFBR0EsSUFBSUMsSUFBSixDQUFTQyxLQUFaLEVBQW1CLE9BQU9GLElBQUlDLElBQUosQ0FBU0MsS0FBaEI7O0FBRW5CLE1BQUdGLElBQUlHLEtBQUosQ0FBVUQsS0FBYixFQUFvQixPQUFPRixJQUFJRyxLQUFKLENBQVVELEtBQWpCOztBQUVwQixNQUFHRixJQUFJSSxPQUFKLENBQVlDLGFBQWYsRUFBOEI7O0FBRTVCLFFBQU1DLFVBQVVOLElBQUlJLE9BQUosQ0FBWUMsYUFBWixDQUEwQkUsS0FBMUIsQ0FBZ0MsYUFBaEMsQ0FBaEI7O0FBRUEsUUFBRyxDQUFDRCxPQUFKLEVBQWEsT0FBTyxJQUFQOztBQUViLFdBQU9BLFFBQVEsQ0FBUixDQUFQO0FBRUQ7QUFFRixDQWhCRDs7QUFrQkEsSUFBTUU7QUFBQSxzRkFBZSxpQkFBT1IsR0FBUCxFQUFZUyxHQUFaLEVBQWlCQyxPQUFqQjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRWJSLGlCQUZhLEdBRUxILFVBQVVDLEdBQVYsQ0FGSztBQUFBO0FBQUEsbUJBSVMsb0NBQWtCLFVBQWxCLEVBQThCRSxLQUE5QixFQUFxQ08sR0FBckMsQ0FKVDs7QUFBQTtBQUFBO0FBSVhFLGdCQUpXLFNBSVhBLElBSlc7QUFJTEMsZUFKSyxTQUlMQSxHQUpLO0FBTWJDLG9CQU5hLEdBTUZGLEtBQUtHLEdBQUwsQ0FBUyxVQUFULENBTkU7O0FBQUEsa0JBUWhCRCxZQUFhLHNCQUFPQSxRQUFQLEVBQWlCRSxJQUFqQixLQUEwQkgsR0FBM0IsR0FBa0MsQ0FSOUI7QUFBQTtBQUFBO0FBQUE7O0FBQUEsa0JBU1gsSUFBSUksc0JBQUosQ0FBbUI7QUFDdkJDLG9CQUFNLEdBRGlCO0FBRXZCQyx1QkFBUztBQUZjLGFBQW5CLENBVFc7O0FBQUE7QUFBQTtBQUFBLG1CQWViUCxLQUFLUSxJQUFMLENBQVUsQ0FBQyxNQUFELENBQVYsRUFBb0IsRUFBRUMsYUFBYVgsR0FBZixFQUFwQixDQWZhOztBQUFBOztBQWlCbkJULGdCQUFJcUIsSUFBSixHQUFXVixLQUFLVyxPQUFMLENBQWEsTUFBYixDQUFYOztBQUVBdEIsZ0JBQUlXLElBQUosR0FBV0EsSUFBWDs7QUFuQm1CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQWY7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUF1QkEsSUFBTVksdUJBQXVCLElBQUlDLGVBQUosQ0FBWTtBQUN2Q2hCLDRCQUR1QztBQUV2Q2lCLGlCQUFlLEtBRndCO0FBR3ZDQyxVQUFRLENBQ05DLGdCQURNLEVBRU5DLGtCQUZNLEVBR05DLGtCQUhNO0FBSCtCLENBQVosQ0FBN0I7O0FBVUEsSUFBTUMsZUFBZSxJQUFJTixlQUFKLENBQVk7QUFDL0JDLGlCQUFlLEtBRGdCO0FBRS9CTSxRQUFNLFFBRnlCO0FBRy9CTCxVQUFRLENBQ05ILG9CQURNLEVBRU5TLGVBRk07QUFIdUIsQ0FBWixDQUFyQjs7a0JBU2VGLFkiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGxvYWRVc2VyRnJvbVRva2VuIH0gZnJvbSAnLi4vLi4vLi4vY29yZS91dGlscy91c2VyX3Rva2VucydcbmltcG9ydCB7IFNlZ21lbnQsIEJhY2tmcmFtZUVycm9yIH0gZnJvbSAnLi4vLi4vLi4vc2VydmVyJ1xuaW1wb3J0IGVtYWlsIGZyb20gJy4vZW1haWwnXG5pbXBvcnQgdmVyaWZ5IGZyb20gJy4vdmVyaWZ5J1xuaW1wb3J0IHNlY3VyaXR5IGZyb20gJy4vc2VjdXJpdHknXG5pbXBvcnQgcGFzc3dvcmQgZnJvbSAnLi9wYXNzd29yZCdcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50J1xuXG5jb25zdCBfZ2V0VG9rZW4gPSAocmVxKSA9PiB7XG5cbiAgaWYocmVxLmJvZHkudG9rZW4pIHJldHVybiByZXEuYm9keS50b2tlblxuXG4gIGlmKHJlcS5xdWVyeS50b2tlbikgcmV0dXJuIHJlcS5xdWVyeS50b2tlblxuXG4gIGlmKHJlcS5oZWFkZXJzLmF1dGhvcml6YXRpb24pIHtcblxuICAgIGNvbnN0IG1hdGNoZXMgPSByZXEuaGVhZGVycy5hdXRob3JpemF0aW9uLm1hdGNoKC9CZWFyZXIgKC4qKS8pXG5cbiAgICBpZighbWF0Y2hlcykgcmV0dXJuIG51bGxcblxuICAgIHJldHVybiBtYXRjaGVzWzFdXG5cbiAgfVxuXG59XG5cbmNvbnN0IGFsdGVyUmVxdWVzdCA9IGFzeW5jIChyZXEsIHRyeCwgb3B0aW9ucykgPT4ge1xuXG4gIGNvbnN0IHRva2VuID0gX2dldFRva2VuKHJlcSlcblxuICBjb25zdCB7IHVzZXIsIGlhdCB9ID0gYXdhaXQgbG9hZFVzZXJGcm9tVG9rZW4oJ3Jlc2V0X2lkJywgdG9rZW4sIHRyeClcblxuICBjb25zdCByZXNldF9hdCA9IHVzZXIuZ2V0KCdyZXNldF9hdCcpXG5cbiAgaWYocmVzZXRfYXQgJiYgKG1vbWVudChyZXNldF9hdCkudW5peCgpIC0gaWF0KSA+IDApIHtcbiAgICB0aHJvdyBuZXcgQmFja2ZyYW1lRXJyb3Ioe1xuICAgICAgY29kZTogNDA0LFxuICAgICAgbWVzc2FnZTogJ1RoaXMgcmVzZXQgdG9rZW4gaGFzIGV4cGlyZWQnXG4gICAgfSlcbiAgfVxuXG4gIGF3YWl0IHVzZXIubG9hZChbJ3RlYW0nXSwgeyB0cmFuc2FjdGluZzogdHJ4IH0pXG5cbiAgcmVxLnRlYW0gPSB1c2VyLnJlbGF0ZWQoJ3RlYW0nKVxuXG4gIHJlcS51c2VyID0gdXNlclxuXG59XG5cbmNvbnN0IGF1dGhlbnRpY2F0ZWRTZWdtZW50ID0gbmV3IFNlZ21lbnQoe1xuICBhbHRlclJlcXVlc3QsXG4gIGF1dGhlbnRpY2F0ZWQ6IGZhbHNlLFxuICByb3V0ZXM6IFtcbiAgICB2ZXJpZnksXG4gICAgc2VjdXJpdHksXG4gICAgcGFzc3dvcmRcbiAgXVxufSlcblxuY29uc3QgcmVzZXRTZWdtZW50ID0gbmV3IFNlZ21lbnQoe1xuICBhdXRoZW50aWNhdGVkOiBmYWxzZSxcbiAgcGF0aDogJy9yZXNldCcsXG4gIHJvdXRlczogW1xuICAgIGF1dGhlbnRpY2F0ZWRTZWdtZW50LFxuICAgIGVtYWlsXG4gIF1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IHJlc2V0U2VnbWVudFxuIl19