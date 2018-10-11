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
    story: 'activated {object}',
    object_owner_id: req.user.get('id'),
    object_text: 'account',
    url: '/admin/team/users/' + req.user.get('id')
  };
};

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var notification_method_id, data, token;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (req.body.notification_method_id) {
              _context.next = 2;
              break;
            }

            throw new _server.BackframeError({
              code: 422,
              message: 'Please choose a notification method'
            });

          case 2:
            _context.prev = 2;
            notification_method_id = req.body.notification_method_id;
            data = { notification_method_id: notification_method_id, is_active: true, activated_at: (0, _moment2.default)() };
            _context.next = 7;
            return req.user.save(data, { patch: true, transacting: trx });

          case 7:
            _context.next = 9;
            return req.user.load(['team.logo', 'team.strategies'], { transacting: trx });

          case 9:
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](2);
            throw new _server.BackframeError({
              code: 422,
              message: 'Unable to update notification method'
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
              },
              user: {
                id: req.user.get('id'),
                full_name: req.user.get('full_name'),
                initials: req.user.get('initials'),
                email: req.user.get('email'),
                photo_id: req.user.get('photo_id'),
                photo: req.user.related('photo').get('path')
              }
            });

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 11]]);
  }));

  return function processor(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var rules = {
  token: 'required',
  notification_method_id: 'required'
};

var notificationsRoute = new _server.Route({
  activity: activity,
  path: '/notifications',
  method: 'post',
  authenticated: false,
  processor: processor,
  rules: rules
});

exports.default = notificationsRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiYWN0aXZpdHkiLCJyZXEiLCJ0cngiLCJyZXN1bHQiLCJvcHRpb25zIiwic3RvcnkiLCJvYmplY3Rfb3duZXJfaWQiLCJ1c2VyIiwiZ2V0Iiwib2JqZWN0X3RleHQiLCJ1cmwiLCJwcm9jZXNzb3IiLCJib2R5Iiwibm90aWZpY2F0aW9uX21ldGhvZF9pZCIsIkJhY2tmcmFtZUVycm9yIiwiY29kZSIsIm1lc3NhZ2UiLCJkYXRhIiwiaXNfYWN0aXZlIiwiYWN0aXZhdGVkX2F0Iiwic2F2ZSIsInBhdGNoIiwidHJhbnNhY3RpbmciLCJsb2FkIiwidG9rZW4iLCJ0ZWFtIiwiaWQiLCJyZWxhdGVkIiwidGl0bGUiLCJzdWJkb21haW4iLCJjb2xvciIsImxvZ28iLCJzdHJhdGVnaWVzIiwidG9KU09OIiwibWFwIiwic3RyYXRlZ3kiLCJuYW1lIiwiZnVsbF9uYW1lIiwiaW5pdGlhbHMiLCJlbWFpbCIsInBob3RvX2lkIiwicGhvdG8iLCJydWxlcyIsIm5vdGlmaWNhdGlvbnNSb3V0ZSIsIlJvdXRlIiwicGF0aCIsIm1ldGhvZCIsImF1dGhlbnRpY2F0ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLFdBQVcsU0FBWEEsUUFBVyxDQUFDQyxHQUFELEVBQU1DLEdBQU4sRUFBV0MsTUFBWCxFQUFtQkMsT0FBbkI7QUFBQSxTQUFnQztBQUMvQ0MsV0FBTyxvQkFEd0M7QUFFL0NDLHFCQUFpQkwsSUFBSU0sSUFBSixDQUFTQyxHQUFULENBQWEsSUFBYixDQUY4QjtBQUcvQ0MsaUJBQWEsU0FIa0M7QUFJL0NDLGdDQUEwQlQsSUFBSU0sSUFBSixDQUFTQyxHQUFULENBQWEsSUFBYjtBQUpxQixHQUFoQztBQUFBLENBQWpCOztBQU9BLElBQU1HO0FBQUEsc0ZBQVksaUJBQU9WLEdBQVAsRUFBWUMsR0FBWixFQUFpQkUsT0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFB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LG9CQURtQztBQUVuQzZDLFFBQU0sZ0JBRjZCO0FBR25DQyxVQUFRLE1BSDJCO0FBSW5DQyxpQkFBZSxLQUpvQjtBQUtuQ3BDLHNCQUxtQztBQU1uQytCO0FBTm1DLENBQVYsQ0FBM0I7O2tCQVNlQyxrQiIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlVXNlclRva2VuIH0gZnJvbSAnLi4vLi4vLi4vY29yZS91dGlscy91c2VyX3Rva2VucydcbmltcG9ydCB7IFJvdXRlLCBCYWNrZnJhbWVFcnJvciB9IGZyb20gJy4uLy4uLy4uL3NlcnZlcidcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50J1xuXG5jb25zdCBhY3Rpdml0eSA9IChyZXEsIHRyeCwgcmVzdWx0LCBvcHRpb25zKSA9PiAoe1xuICBzdG9yeTogJ2FjdGl2YXRlZCB7b2JqZWN0fScsXG4gIG9iamVjdF9vd25lcl9pZDogcmVxLnVzZXIuZ2V0KCdpZCcpLFxuICBvYmplY3RfdGV4dDogJ2FjY291bnQnLFxuICB1cmw6IGAvYWRtaW4vdGVhbS91c2Vycy8ke3JlcS51c2VyLmdldCgnaWQnKX1gXG59KVxuXG5jb25zdCBwcm9jZXNzb3IgPSBhc3luYyAocmVxLCB0cngsIG9wdGlvbnMpID0+IHtcblxuICBpZighcmVxLmJvZHkubm90aWZpY2F0aW9uX21ldGhvZF9pZCkge1xuICAgIHRocm93IG5ldyBCYWNrZnJhbWVFcnJvcih7XG4gICAgICBjb2RlOiA0MjIsXG4gICAgICBtZXNzYWdlOiAnUGxlYXNlIGNob29zZSBhIG5vdGlmaWNhdGlvbiBtZXRob2QnXG4gICAgfSlcbiAgfVxuXG4gIHRyeSB7XG5cbiAgICBjb25zdCBub3RpZmljYXRpb25fbWV0aG9kX2lkID0gcmVxLmJvZHkubm90aWZpY2F0aW9uX21ldGhvZF9pZFxuXG4gICAgY29uc3QgZGF0YSA9IHsgbm90aWZpY2F0aW9uX21ldGhvZF9pZCwgaXNfYWN0aXZlOiB0cnVlLCBhY3RpdmF0ZWRfYXQ6IG1vbWVudCgpIH1cblxuICAgIGF3YWl0IHJlcS51c2VyLnNhdmUoZGF0YSwgeyBwYXRjaDogdHJ1ZSwgdHJhbnNhY3Rpbmc6IHRyeCB9KVxuXG4gICAgYXdhaXQgcmVxLnVzZXIubG9hZChbJ3RlYW0ubG9nbycsJ3RlYW0uc3RyYXRlZ2llcyddLCB7IHRyYW5zYWN0aW5nOiB0cnggfSlcblxuICB9IGNhdGNoKGVycikge1xuXG4gICAgdGhyb3cgbmV3IEJhY2tmcmFtZUVycm9yKHtcbiAgICAgIGNvZGU6IDQyMixcbiAgICAgIG1lc3NhZ2U6ICdVbmFibGUgdG8gdXBkYXRlIG5vdGlmaWNhdGlvbiBtZXRob2QnXG4gICAgfSlcblxuICB9XG5cbiAgY29uc3QgdG9rZW4gPSBjcmVhdGVVc2VyVG9rZW4ocmVxLnVzZXIsICd1c2VyX2lkJylcblxuICByZXR1cm4ge1xuICAgIHRva2VuLFxuICAgIHRlYW06IHtcbiAgICAgIGlkOiByZXEudXNlci5yZWxhdGVkKCd0ZWFtJykuZ2V0KCdpZCcpLFxuICAgICAgdGl0bGU6IHJlcS51c2VyLnJlbGF0ZWQoJ3RlYW0nKS5nZXQoJ3RpdGxlJyksXG4gICAgICBzdWJkb21haW46IHJlcS51c2VyLnJlbGF0ZWQoJ3RlYW0nKS5nZXQoJ3N1YmRvbWFpbicpLFxuICAgICAgY29sb3I6IHJlcS51c2VyLnJlbGF0ZWQoJ3RlYW0nKS5nZXQoJ2NvbG9yJyksXG4gICAgICBsb2dvOiByZXEudXNlci5yZWxhdGVkKCd0ZWFtJykucmVsYXRlZCgnbG9nbycpLmdldCgncGF0aCcpLFxuICAgICAgc3RyYXRlZ2llczogcmVxLnVzZXIucmVsYXRlZCgndGVhbScpLnJlbGF0ZWQoJ3N0cmF0ZWdpZXMnKS50b0pTT04oKS5tYXAoc3RyYXRlZ3kgPT4gc3RyYXRlZ3kubmFtZSlcbiAgICB9LFxuICAgIHVzZXI6IHtcbiAgICAgIGlkOiByZXEudXNlci5nZXQoJ2lkJyksXG4gICAgICBmdWxsX25hbWU6IHJlcS51c2VyLmdldCgnZnVsbF9uYW1lJyksXG4gICAgICBpbml0aWFsczogcmVxLnVzZXIuZ2V0KCdpbml0aWFscycpLFxuICAgICAgZW1haWw6IHJlcS51c2VyLmdldCgnZW1haWwnKSxcbiAgICAgIHBob3RvX2lkOiByZXEudXNlci5nZXQoJ3Bob3RvX2lkJyksXG4gICAgICBwaG90bzogcmVxLnVzZXIucmVsYXRlZCgncGhvdG8nKS5nZXQoJ3BhdGgnKVxuICAgIH1cbiAgfVxuXG59XG5cbmNvbnN0IHJ1bGVzID0ge1xuICB0b2tlbjogJ3JlcXVpcmVkJyxcbiAgbm90aWZpY2F0aW9uX21ldGhvZF9pZDogJ3JlcXVpcmVkJ1xufVxuXG5jb25zdCBub3RpZmljYXRpb25zUm91dGUgPSBuZXcgUm91dGUoe1xuICBhY3Rpdml0eSxcbiAgcGF0aDogJy9ub3RpZmljYXRpb25zJyxcbiAgbWV0aG9kOiAncG9zdCcsXG4gIGF1dGhlbnRpY2F0ZWQ6IGZhbHNlLFxuICBwcm9jZXNzb3IsXG4gIHJ1bGVzXG59KVxuXG5leHBvcnQgZGVmYXVsdCBub3RpZmljYXRpb25zUm91dGVcbiJdfQ==