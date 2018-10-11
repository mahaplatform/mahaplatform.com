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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var activity = function activity(req, trx, result, options) {
  return {
    story: 'reset {object}',
    object_owner_id: req.user.get('id'),
    object_text: 'password',
    url: '/admin/team/users/' + req.user.get('id')
  };
};

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var token;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(!req.body.password || !req.body.confirmation)) {
              _context.next = 2;
              break;
            }

            throw new _server.BackframeError({
              code: 422,
              message: 'Please enter and confirm your password'
            });

          case 2:
            if (!(req.body.password !== req.body.confirmation)) {
              _context.next = 4;
              break;
            }

            throw new _server.BackframeError({
              code: 422,
              message: 'Password do not match'
            });

          case 4:
            _context.prev = 4;
            _context.next = 7;
            return req.user.save({ password: req.body.password, reset_at: (0, _moment2.default)() }, { patch: true, transacting: trx });

          case 7:
            _context.next = 9;
            return req.user.load(['team.logo', 'team.strategies'], { transacting: trx });

          case 9:
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](4);
            throw new _server.BackframeError({
              code: 422,
              message: 'Unable to update password'
            });

          case 14:
            token = (0, _user_tokens.createUserToken)(req.user, 'user_id');
            return _context.abrupt('return', {
              token: token,
              team: {
                id: req.user.related('team').get('id'),
                title: req.user.related('team').get('title'),
                subdomain: req.user.related('team').get('subdomain'),
                color: req.user.related('team').get('color'),
                logo: req.user.related('team').related('logo').get('path'),
                strategies: req.user.related('team').related('strategies').toJSON().map(function (strategy) {
                  return strategy.name;
                })
              }
            });

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[4, 11]]);
  }));

  return function processor(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var rules = {
  token: 'required'
};

var passwordRoute = new _server.Route({
  activity: activity,
  path: '/password',
  method: 'post',
  authenticated: false,
  processor: processor,
  rules: rules
});

exports.default = passwordRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiYWN0aXZpdHkiLCJyZXEiLCJ0cngiLCJyZXN1bHQiLCJvcHRpb25zIiwic3RvcnkiLCJvYmplY3Rfb3duZXJfaWQiLCJ1c2VyIiwiZ2V0Iiwib2JqZWN0X3RleHQiLCJ1cmwiLCJwcm9jZXNzb3IiLCJib2R5IiwicGFzc3dvcmQiLCJjb25maXJtYXRpb24iLCJCYWNrZnJhbWVFcnJvciIsImNvZGUiLCJtZXNzYWdlIiwic2F2ZSIsInJlc2V0X2F0IiwicGF0Y2giLCJ0cmFuc2FjdGluZyIsImxvYWQiLCJ0b2tlbiIsInRlYW0iLCJpZCIsInJlbGF0ZWQiLCJ0aXRsZSIsInN1YmRvbWFpbiIsImNvbG9yIiwibG9nbyIsInN0cmF0ZWdpZXMiLCJ0b0pTT04iLCJtYXAiLCJzdHJhdGVneSIsIm5hbWUiLCJydWxlcyIsInBhc3N3b3JkUm91dGUiLCJSb3V0ZSIsInBhdGgiLCJtZXRob2QiLCJhdXRoZW50aWNhdGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxXQUFXLFNBQVhBLFFBQVcsQ0FBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQVdDLE1BQVgsRUFBbUJDLE9BQW5CO0FBQUEsU0FBZ0M7QUFDL0NDLFdBQU8sZ0JBRHdDO0FBRS9DQyxxQkFBaUJMLElBQUlNLElBQUosQ0FBU0MsR0FBVCxDQUFhLElBQWIsQ0FGOEI7QUFHL0NDLGlCQUFhLFVBSGtDO0FBSS9DQyxnQ0FBMEJULElBQUlNLElBQUosQ0FBU0MsR0FBVCxDQUFhLElBQWI7QUFKcUIsR0FBaEM7QUFBQSxDQUFqQjs7QUFPQSxJQUFNRztBQUFBLHNGQUFZLGlCQUFPVixHQUFQLEVBQVlDLEdBQVosRUFBaUJFLE9BQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQUViLENBQUNILElBQUlXLElBQUosQ0FBU0MsUUFBVixJQUFzQixDQUFDWixJQUFJVyxJQUFKLENBQVNFLFlBRm5CO0FBQUE7QUFBQTtBQUFBOztBQUFBLGtCQUdSLElBQUlDLHNCQUFKLENBQW1CO0FBQ3ZCQyxvQkFBTSxHQURpQjtBQUV2QkMsdUJBQVM7QUFGYyxhQUFuQixDQUhROztBQUFBO0FBQUEsa0JBU2JoQixJQUFJVyxJQUFKLENBQVNDLFFBQVQsS0FBc0JaLElBQUlXLElBQUosQ0FBU0UsWUFUbEI7QUFBQTtBQUFBO0FBQUE7O0FBQUEsa0JBVVIsSUFBSUMsc0JBQUosQ0FBbUI7QUFDdkJDLG9CQUFNLEdBRGlCO0FBRXZCQyx1QkFBUztBQUZjLGFBQW5CLENBVlE7O0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBa0JSaEIsSUFBSU0sSUFBSixDQUFTVyxJQUFULENBQWMsRUFBRUwsVUFBVVosSUFBSVcsSUFBSixDQUFTQyxRQUFyQixFQUErQk0sVUFBVSx1QkFBekMsRUFBZCxFQUFtRSxFQUFFQyxPQUFPLElBQVQsRUFBZUMsYUFBYW5CLEdBQTVCLEVBQW5FLENBbEJROztBQUFBO0FBQUE7QUFBQSxtQkFvQlJELElBQUlNLElBQUosQ0FBU2UsSUFBVCxDQUFjLENBQUMsV0FBRCxFQUFhLGlCQUFiLENBQWQsRUFBK0MsRUFBRUQsYUFBYW5CLEdBQWYsRUFBL0MsQ0FwQlE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQXdCUixJQUFJYSxzQkFBSixDQUFtQjtBQUN2QkMsb0JBQU0sR0FEaUI7QUFFdkJDLHVCQUFTO0FBRmMsYUFBbkIsQ0F4QlE7O0FBQUE7QUErQlZNLGlCQS9CVSxHQStCRixrQ0FBZ0J0QixJQUFJTSxJQUFwQixFQUEwQixTQUExQixDQS9CRTtBQUFBLDZDQWlDVDtBQUNMZ0IsMEJBREs7QUFFTEMsb0JBQU07QUFDSkMsb0JBQUl4QixJQUFJTSxJQUFKLENBQVNtQixPQUFULENBQWlCLE1BQWpCLEVBQXlCbEIsR0FBekIsQ0FBNkIsSUFBN0IsQ0FEQTtBQUVKbUIsdUJBQU8xQixJQUFJTSxJQUFKLENBQVNtQixPQUFULENBQWlCLE1BQWpCLEVBQXlCbEIsR0FBekIsQ0FBNkIsT0FBN0IsQ0FGSDtBQUdKb0IsMkJBQVczQixJQUFJTSxJQUFKLENBQVNtQixPQUFULENBQWlCLE1BQWpCLEVBQXlCbEIsR0FBekIsQ0FBNkIsV0FBN0IsQ0FIUDtBQUlKcUIsdUJBQU81QixJQUFJTSxJQUFKLENBQVNtQixPQUFULENBQWlCLE1BQWpCLEVBQXlCbEIsR0FBekIsQ0FBNkIsT0FBN0IsQ0FKSDtBQUtKc0Isc0JBQU03QixJQUFJTSxJQUFKLENBQVNtQixPQUFULENBQWlCLE1BQWpCLEVBQXlCQSxPQUF6QixDQUFpQyxNQUFqQyxFQUF5Q2xCLEdBQXpDLENBQTZDLE1BQTdDLENBTEY7QUFNSnVCLDRCQUFZOUIsSUFBSU0sSUFBSixDQUFTbUIsT0FBVCxDQUFpQixNQUFqQixFQUF5QkEsT0FBekIsQ0FBaUMsWUFBakMsRUFBK0NNLE1BQS9DLEdBQXdEQyxHQUF4RCxDQUE0RDtBQUFBLHlCQUFZQyxTQUFTQyxJQUFyQjtBQUFBLGlCQUE1RDtBQU5SO0FBRkQsYUFqQ1M7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztBQStDQSxJQUFNQyxRQUFRO0FBQ1piLFNBQU87QUFESyxDQUFkOztBQUlBLElBQU1jLGdCQUFnQixJQUFJQyxhQUFKLENBQVU7QUFDOUJ0QyxvQkFEOEI7QUFFOUJ1QyxRQUFNLFdBRndCO0FBRzlCQyxVQUFRLE1BSHNCO0FBSTlCQyxpQkFBZSxLQUplO0FBSzlCOUIsc0JBTDhCO0FBTTlCeUI7QUFOOEIsQ0FBVixDQUF0Qjs7a0JBU2VDLGEiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVVzZXJUb2tlbiB9IGZyb20gJy4uLy4uLy4uL2NvcmUvdXRpbHMvdXNlcl90b2tlbnMnXG5pbXBvcnQgeyBSb3V0ZSwgQmFja2ZyYW1lRXJyb3IgfSBmcm9tICcuLi8uLi8uLi9zZXJ2ZXInXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCdcblxuY29uc3QgYWN0aXZpdHkgPSAocmVxLCB0cngsIHJlc3VsdCwgb3B0aW9ucykgPT4gKHtcbiAgc3Rvcnk6ICdyZXNldCB7b2JqZWN0fScsXG4gIG9iamVjdF9vd25lcl9pZDogcmVxLnVzZXIuZ2V0KCdpZCcpLFxuICBvYmplY3RfdGV4dDogJ3Bhc3N3b3JkJyxcbiAgdXJsOiBgL2FkbWluL3RlYW0vdXNlcnMvJHtyZXEudXNlci5nZXQoJ2lkJyl9YFxufSlcblxuY29uc3QgcHJvY2Vzc29yID0gYXN5bmMgKHJlcSwgdHJ4LCBvcHRpb25zKSA9PiB7XG5cbiAgaWYoIXJlcS5ib2R5LnBhc3N3b3JkIHx8ICFyZXEuYm9keS5jb25maXJtYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgQmFja2ZyYW1lRXJyb3Ioe1xuICAgICAgY29kZTogNDIyLFxuICAgICAgbWVzc2FnZTogJ1BsZWFzZSBlbnRlciBhbmQgY29uZmlybSB5b3VyIHBhc3N3b3JkJ1xuICAgIH0pXG4gIH1cblxuICBpZihyZXEuYm9keS5wYXNzd29yZCAhPT0gcmVxLmJvZHkuY29uZmlybWF0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEJhY2tmcmFtZUVycm9yKHtcbiAgICAgIGNvZGU6IDQyMixcbiAgICAgIG1lc3NhZ2U6ICdQYXNzd29yZCBkbyBub3QgbWF0Y2gnXG4gICAgfSlcbiAgfVxuXG4gIHRyeSB7XG5cbiAgICBhd2FpdCByZXEudXNlci5zYXZlKHsgcGFzc3dvcmQ6IHJlcS5ib2R5LnBhc3N3b3JkLCByZXNldF9hdDogbW9tZW50KCkgfSwgeyBwYXRjaDogdHJ1ZSwgdHJhbnNhY3Rpbmc6IHRyeCB9KVxuXG4gICAgYXdhaXQgcmVxLnVzZXIubG9hZChbJ3RlYW0ubG9nbycsJ3RlYW0uc3RyYXRlZ2llcyddLCB7IHRyYW5zYWN0aW5nOiB0cnggfSlcblxuICB9IGNhdGNoKGVycikge1xuXG4gICAgdGhyb3cgbmV3IEJhY2tmcmFtZUVycm9yKHtcbiAgICAgIGNvZGU6IDQyMixcbiAgICAgIG1lc3NhZ2U6ICdVbmFibGUgdG8gdXBkYXRlIHBhc3N3b3JkJ1xuICAgIH0pXG5cbiAgfVxuXG4gIGNvbnN0IHRva2VuID0gY3JlYXRlVXNlclRva2VuKHJlcS51c2VyLCAndXNlcl9pZCcpXG5cbiAgcmV0dXJuIHtcbiAgICB0b2tlbixcbiAgICB0ZWFtOiB7XG4gICAgICBpZDogcmVxLnVzZXIucmVsYXRlZCgndGVhbScpLmdldCgnaWQnKSxcbiAgICAgIHRpdGxlOiByZXEudXNlci5yZWxhdGVkKCd0ZWFtJykuZ2V0KCd0aXRsZScpLFxuICAgICAgc3ViZG9tYWluOiByZXEudXNlci5yZWxhdGVkKCd0ZWFtJykuZ2V0KCdzdWJkb21haW4nKSxcbiAgICAgIGNvbG9yOiByZXEudXNlci5yZWxhdGVkKCd0ZWFtJykuZ2V0KCdjb2xvcicpLFxuICAgICAgbG9nbzogcmVxLnVzZXIucmVsYXRlZCgndGVhbScpLnJlbGF0ZWQoJ2xvZ28nKS5nZXQoJ3BhdGgnKSxcbiAgICAgIHN0cmF0ZWdpZXM6IHJlcS51c2VyLnJlbGF0ZWQoJ3RlYW0nKS5yZWxhdGVkKCdzdHJhdGVnaWVzJykudG9KU09OKCkubWFwKHN0cmF0ZWd5ID0+IHN0cmF0ZWd5Lm5hbWUpXG4gICAgfVxuICB9XG5cbn1cblxuY29uc3QgcnVsZXMgPSB7XG4gIHRva2VuOiAncmVxdWlyZWQnXG59XG5cbmNvbnN0IHBhc3N3b3JkUm91dGUgPSBuZXcgUm91dGUoe1xuICBhY3Rpdml0eSxcbiAgcGF0aDogJy9wYXNzd29yZCcsXG4gIG1ldGhvZDogJ3Bvc3QnLFxuICBhdXRoZW50aWNhdGVkOiBmYWxzZSxcbiAgcHJvY2Vzc29yLFxuICBydWxlc1xufSlcblxuZXhwb3J0IGRlZmF1bHQgcGFzc3dvcmRSb3V0ZVxuIl19