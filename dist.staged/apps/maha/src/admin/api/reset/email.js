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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var activity = function activity(req, trx, result, options) {
  return {
    story: 'requested {object}',
    object_owner_id: req.user.get('id'),
    object_text: 'password reset',
    url: '/admin/team/users/' + req.user.get('id')
  };
};

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var conditions, token, message;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            conditions = {
              team_id: req.body.team_id,
              email: req.body.email
            };
            _context.next = 3;
            return _server.User.where(conditions).fetch({ withRelated: ['team'], transacting: trx });

          case 3:
            req.user = _context.sent;


            req.team = req.user.related('team');

            if (req.user) {
              _context.next = 7;
              break;
            }

            throw new _server.BackframeError({
              code: 404,
              message: 'Unable to find this user'
            });

          case 7:
            if (req.user.get('is_active')) {
              _context.next = 9;
              break;
            }

            throw new _server.BackframeError({
              code: 403,
              message: 'Your account has been disabled'
            });

          case 9:
            token = (0, _user_tokens.createUserToken)(req.user, 'reset_id');
            message = {
              team_id: req.body.team_id,
              user: req.user,
              template: 'team.reset',
              data: {
                first_name: req.user.get('first_name'),
                reset_url: process.env.WEB_HOST + '/admin/reset/' + token
              }
            };
            _context.next = 13;
            return _server.mailer.enqueue(req, trx, message);

          case 13:
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

var rules = {
  team_id: 'required',
  email: 'required'
};

var emailRoute = new _server.Route({
  activity: activity,
  path: '/email',
  method: 'post',
  authenticated: false,
  processor: processor,
  rules: rules
});

exports.default = emailRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiYWN0aXZpdHkiLCJyZXEiLCJ0cngiLCJyZXN1bHQiLCJvcHRpb25zIiwic3RvcnkiLCJvYmplY3Rfb3duZXJfaWQiLCJ1c2VyIiwiZ2V0Iiwib2JqZWN0X3RleHQiLCJ1cmwiLCJwcm9jZXNzb3IiLCJjb25kaXRpb25zIiwidGVhbV9pZCIsImJvZHkiLCJlbWFpbCIsIlVzZXIiLCJ3aGVyZSIsImZldGNoIiwid2l0aFJlbGF0ZWQiLCJ0cmFuc2FjdGluZyIsInRlYW0iLCJyZWxhdGVkIiwiQmFja2ZyYW1lRXJyb3IiLCJjb2RlIiwibWVzc2FnZSIsInRva2VuIiwidGVtcGxhdGUiLCJkYXRhIiwiZmlyc3RfbmFtZSIsInJlc2V0X3VybCIsInByb2Nlc3MiLCJlbnYiLCJXRUJfSE9TVCIsIm1haWxlciIsImVucXVldWUiLCJydWxlcyIsImVtYWlsUm91dGUiLCJSb3V0ZSIsInBhdGgiLCJtZXRob2QiLCJhdXRoZW50aWNhdGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBRUEsSUFBTUEsV0FBVyxTQUFYQSxRQUFXLENBQUNDLEdBQUQsRUFBTUMsR0FBTixFQUFXQyxNQUFYLEVBQW1CQyxPQUFuQjtBQUFBLFNBQWdDO0FBQy9DQyxXQUFPLG9CQUR3QztBQUUvQ0MscUJBQWlCTCxJQUFJTSxJQUFKLENBQVNDLEdBQVQsQ0FBYSxJQUFiLENBRjhCO0FBRy9DQyxpQkFBYSxnQkFIa0M7QUFJL0NDLGdDQUEwQlQsSUFBSU0sSUFBSixDQUFTQyxHQUFULENBQWEsSUFBYjtBQUpxQixHQUFoQztBQUFBLENBQWpCOztBQU9BLElBQU1HO0FBQUEsc0ZBQVksaUJBQU9WLEdBQVAsRUFBWUMsR0FBWixFQUFpQkUsT0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRVZRLHNCQUZVLEdBRUc7QUFDakJDLHVCQUFTWixJQUFJYSxJQUFKLENBQVNELE9BREQ7QUFFakJFLHFCQUFPZCxJQUFJYSxJQUFKLENBQVNDO0FBRkMsYUFGSDtBQUFBO0FBQUEsbUJBT0NDLGFBQUtDLEtBQUwsQ0FBV0wsVUFBWCxFQUF1Qk0sS0FBdkIsQ0FBNkIsRUFBRUMsYUFBYSxDQUFDLE1BQUQsQ0FBZixFQUF5QkMsYUFBYWxCLEdBQXRDLEVBQTdCLENBUEQ7O0FBQUE7QUFPaEJELGdCQUFJTSxJQVBZOzs7QUFTaEJOLGdCQUFJb0IsSUFBSixHQUFXcEIsSUFBSU0sSUFBSixDQUFTZSxPQUFULENBQWlCLE1BQWpCLENBQVg7O0FBVGdCLGdCQVdackIsSUFBSU0sSUFYUTtBQUFBO0FBQUE7QUFBQTs7QUFBQSxrQkFZUixJQUFJZ0Isc0JBQUosQ0FBbUI7QUFDdkJDLG9CQUFNLEdBRGlCO0FBRXZCQyx1QkFBUztBQUZjLGFBQW5CLENBWlE7O0FBQUE7QUFBQSxnQkFrQlp4QixJQUFJTSxJQUFKLENBQVNDLEdBQVQsQ0FBYSxXQUFiLENBbEJZO0FBQUE7QUFBQTtBQUFBOztBQUFBLGtCQW1CUixJQUFJZSxzQkFBSixDQUFtQjtBQUN2QkMsb0JBQU0sR0FEaUI7QUFFdkJDLHVCQUFTO0FBRmMsYUFBbkIsQ0FuQlE7O0FBQUE7QUF5QlZDLGlCQXpCVSxHQXlCRixrQ0FBZ0J6QixJQUFJTSxJQUFwQixFQUEwQixVQUExQixDQXpCRTtBQTJCVmtCLG1CQTNCVSxHQTJCQTtBQUNkWix1QkFBU1osSUFBSWEsSUFBSixDQUFTRCxPQURKO0FBRWROLG9CQUFNTixJQUFJTSxJQUZJO0FBR2RvQix3QkFBVSxZQUhJO0FBSWRDLG9CQUFNO0FBQ0pDLDRCQUFZNUIsSUFBSU0sSUFBSixDQUFTQyxHQUFULENBQWEsWUFBYixDQURSO0FBRUpzQiwyQkFBY0MsUUFBUUMsR0FBUixDQUFZQyxRQUExQixxQkFBa0RQO0FBRjlDO0FBSlEsYUEzQkE7QUFBQTtBQUFBLG1CQXFDVlEsZUFBT0MsT0FBUCxDQUFlbEMsR0FBZixFQUFvQkMsR0FBcEIsRUFBeUJ1QixPQUF6QixDQXJDVTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFaOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBeUNBLElBQU1XLFFBQVE7QUFDWnZCLFdBQVMsVUFERztBQUVaRSxTQUFPO0FBRkssQ0FBZDs7QUFLQSxJQUFNc0IsYUFBYSxJQUFJQyxhQUFKLENBQVU7QUFDM0J0QyxvQkFEMkI7QUFFM0J1QyxRQUFNLFFBRnFCO0FBRzNCQyxVQUFRLE1BSG1CO0FBSTNCQyxpQkFBZSxLQUpZO0FBSzNCOUIsc0JBTDJCO0FBTTNCeUI7QUFOMkIsQ0FBVixDQUFuQjs7a0JBU2VDLFUiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVVzZXJUb2tlbiB9IGZyb20gJy4uLy4uLy4uL2NvcmUvdXRpbHMvdXNlcl90b2tlbnMnXG5pbXBvcnQgeyBSb3V0ZSwgbWFpbGVyLCBCYWNrZnJhbWVFcnJvciwgVXNlciB9IGZyb20gJy4uLy4uLy4uL3NlcnZlcidcblxuY29uc3QgYWN0aXZpdHkgPSAocmVxLCB0cngsIHJlc3VsdCwgb3B0aW9ucykgPT4gKHtcbiAgc3Rvcnk6ICdyZXF1ZXN0ZWQge29iamVjdH0nLFxuICBvYmplY3Rfb3duZXJfaWQ6IHJlcS51c2VyLmdldCgnaWQnKSxcbiAgb2JqZWN0X3RleHQ6ICdwYXNzd29yZCByZXNldCcsXG4gIHVybDogYC9hZG1pbi90ZWFtL3VzZXJzLyR7cmVxLnVzZXIuZ2V0KCdpZCcpfWBcbn0pXG5cbmNvbnN0IHByb2Nlc3NvciA9IGFzeW5jIChyZXEsIHRyeCwgb3B0aW9ucykgPT4ge1xuXG4gIGNvbnN0IGNvbmRpdGlvbnMgPSB7XG4gICAgdGVhbV9pZDogcmVxLmJvZHkudGVhbV9pZCxcbiAgICBlbWFpbDogcmVxLmJvZHkuZW1haWxcbiAgfVxuXG4gIHJlcS51c2VyID0gYXdhaXQgVXNlci53aGVyZShjb25kaXRpb25zKS5mZXRjaCh7IHdpdGhSZWxhdGVkOiBbJ3RlYW0nXSwgdHJhbnNhY3Rpbmc6IHRyeCB9KVxuXG4gIHJlcS50ZWFtID0gcmVxLnVzZXIucmVsYXRlZCgndGVhbScpXG5cbiAgaWYoIXJlcS51c2VyKSB7XG4gICAgdGhyb3cgbmV3IEJhY2tmcmFtZUVycm9yKHtcbiAgICAgIGNvZGU6IDQwNCxcbiAgICAgIG1lc3NhZ2U6ICdVbmFibGUgdG8gZmluZCB0aGlzIHVzZXInXG4gICAgfSlcbiAgfVxuXG4gIGlmKCFyZXEudXNlci5nZXQoJ2lzX2FjdGl2ZScpKSB7XG4gICAgdGhyb3cgbmV3IEJhY2tmcmFtZUVycm9yKHtcbiAgICAgIGNvZGU6IDQwMyxcbiAgICAgIG1lc3NhZ2U6ICdZb3VyIGFjY291bnQgaGFzIGJlZW4gZGlzYWJsZWQnXG4gICAgfSlcbiAgfVxuXG4gIGNvbnN0IHRva2VuID0gY3JlYXRlVXNlclRva2VuKHJlcS51c2VyLCAncmVzZXRfaWQnKVxuXG4gIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgdGVhbV9pZDogcmVxLmJvZHkudGVhbV9pZCxcbiAgICB1c2VyOiByZXEudXNlcixcbiAgICB0ZW1wbGF0ZTogJ3RlYW0ucmVzZXQnLFxuICAgIGRhdGE6IHtcbiAgICAgIGZpcnN0X25hbWU6IHJlcS51c2VyLmdldCgnZmlyc3RfbmFtZScpLFxuICAgICAgcmVzZXRfdXJsOiBgJHtwcm9jZXNzLmVudi5XRUJfSE9TVH0vYWRtaW4vcmVzZXQvJHt0b2tlbn1gXG4gICAgfVxuICB9XG5cbiAgYXdhaXQgbWFpbGVyLmVucXVldWUocmVxLCB0cngsIG1lc3NhZ2UpXG5cbn1cblxuY29uc3QgcnVsZXMgPSB7XG4gIHRlYW1faWQ6ICdyZXF1aXJlZCcsXG4gIGVtYWlsOiAncmVxdWlyZWQnXG59XG5cbmNvbnN0IGVtYWlsUm91dGUgPSBuZXcgUm91dGUoe1xuICBhY3Rpdml0eSxcbiAgcGF0aDogJy9lbWFpbCcsXG4gIG1ldGhvZDogJ3Bvc3QnLFxuICBhdXRoZW50aWNhdGVkOiBmYWxzZSxcbiAgcHJvY2Vzc29yLFxuICBydWxlc1xufSlcblxuZXhwb3J0IGRlZmF1bHQgZW1haWxSb3V0ZVxuIl19