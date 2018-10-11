'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var activity = function activity(req, trx, result, options) {
  return {
    story: 'updated {object}',
    object_owner_id: req.user.get('id'),
    object_text: 'account',
    url: '/admin/team/users/' + req.user.get('id')
  };
};

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return req.user.save({
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              email: req.body.email,
              secondary_email: req.body.secondary_email
            }, {
              patch: true,
              transacting: trx
            });

          case 3:
            req.user = _context.sent;
            return _context.abrupt('return', {
              first_name: req.user.get('first_name'),
              last_name: req.user.get('last_name'),
              email: req.user.get('email'),
              secondary_email: req.user.get('secondary_email')
            });

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);
            throw new _server.BackframeError({
              code: 422,
              message: 'Unable to save account',
              errors: _context.t0.toJSON()
            });

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function processor(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var messages = function messages(req, trx, result, options) {
  return {
    channel: 'user',
    action: 'session'
  };
};

var updateRoute = new _server.Route({
  activity: activity,
  messages: messages,
  method: 'patch',
  path: '',
  processor: processor
});

exports.default = updateRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiYWN0aXZpdHkiLCJyZXEiLCJ0cngiLCJyZXN1bHQiLCJvcHRpb25zIiwic3RvcnkiLCJvYmplY3Rfb3duZXJfaWQiLCJ1c2VyIiwiZ2V0Iiwib2JqZWN0X3RleHQiLCJ1cmwiLCJwcm9jZXNzb3IiLCJzYXZlIiwiZmlyc3RfbmFtZSIsImJvZHkiLCJsYXN0X25hbWUiLCJlbWFpbCIsInNlY29uZGFyeV9lbWFpbCIsInBhdGNoIiwidHJhbnNhY3RpbmciLCJCYWNrZnJhbWVFcnJvciIsImNvZGUiLCJtZXNzYWdlIiwiZXJyb3JzIiwidG9KU09OIiwibWVzc2FnZXMiLCJjaGFubmVsIiwiYWN0aW9uIiwidXBkYXRlUm91dGUiLCJSb3V0ZSIsIm1ldGhvZCIsInBhdGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQSxJQUFNQSxXQUFXLFNBQVhBLFFBQVcsQ0FBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQVdDLE1BQVgsRUFBbUJDLE9BQW5CO0FBQUEsU0FBZ0M7QUFDL0NDLFdBQU8sa0JBRHdDO0FBRS9DQyxxQkFBaUJMLElBQUlNLElBQUosQ0FBU0MsR0FBVCxDQUFhLElBQWIsQ0FGOEI7QUFHL0NDLGlCQUFhLFNBSGtDO0FBSS9DQyxnQ0FBMEJULElBQUlNLElBQUosQ0FBU0MsR0FBVCxDQUFhLElBQWI7QUFKcUIsR0FBaEM7QUFBQSxDQUFqQjs7QUFPQSxJQUFNRztBQUFBLHNGQUFZLGlCQUFPVixHQUFQLEVBQVlDLEdBQVosRUFBaUJFLE9BQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBSUdILElBQUlNLElBQUosQ0FBU0ssSUFBVCxDQUFjO0FBQzdCQywwQkFBWVosSUFBSWEsSUFBSixDQUFTRCxVQURRO0FBRTdCRSx5QkFBV2QsSUFBSWEsSUFBSixDQUFTQyxTQUZTO0FBRzdCQyxxQkFBT2YsSUFBSWEsSUFBSixDQUFTRSxLQUhhO0FBSTdCQywrQkFBaUJoQixJQUFJYSxJQUFKLENBQVNHO0FBSkcsYUFBZCxFQUtkO0FBQ0RDLHFCQUFPLElBRE47QUFFREMsMkJBQWFqQjtBQUZaLGFBTGMsQ0FKSDs7QUFBQTtBQUlkRCxnQkFBSU0sSUFKVTtBQUFBLDZDQWNQO0FBQ0xNLDBCQUFZWixJQUFJTSxJQUFKLENBQVNDLEdBQVQsQ0FBYSxZQUFiLENBRFA7QUFFTE8seUJBQVdkLElBQUlNLElBQUosQ0FBU0MsR0FBVCxDQUFhLFdBQWIsQ0FGTjtBQUdMUSxxQkFBT2YsSUFBSU0sSUFBSixDQUFTQyxHQUFULENBQWEsT0FBYixDQUhGO0FBSUxTLCtCQUFpQmhCLElBQUlNLElBQUosQ0FBU0MsR0FBVCxDQUFhLGlCQUFiO0FBSlosYUFkTzs7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkF1QlIsSUFBSVksc0JBQUosQ0FBbUI7QUFDdkJDLG9CQUFNLEdBRGlCO0FBRXZCQyx1QkFBUyx3QkFGYztBQUd2QkMsc0JBQVEsWUFBSUMsTUFBSjtBQUhlLGFBQW5CLENBdkJROztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUFpQ0EsSUFBTUMsV0FBVyxTQUFYQSxRQUFXLENBQUN4QixHQUFELEVBQU1DLEdBQU4sRUFBV0MsTUFBWCxFQUFtQkMsT0FBbkI7QUFBQSxTQUFnQztBQUMvQ3NCLGFBQVMsTUFEc0M7QUFFL0NDLFlBQVE7QUFGdUMsR0FBaEM7QUFBQSxDQUFqQjs7QUFLQSxJQUFNQyxjQUFjLElBQUlDLGFBQUosQ0FBVTtBQUM1QjdCLG9CQUQ0QjtBQUU1QnlCLG9CQUY0QjtBQUc1QkssVUFBUSxPQUhvQjtBQUk1QkMsUUFBTSxFQUpzQjtBQUs1QnBCO0FBTDRCLENBQVYsQ0FBcEI7O2tCQVFlaUIsVyIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGUsIEJhY2tmcmFtZUVycm9yIH0gZnJvbSAnLi4vLi4vLi4vc2VydmVyJ1xuXG5jb25zdCBhY3Rpdml0eSA9IChyZXEsIHRyeCwgcmVzdWx0LCBvcHRpb25zKSA9PiAoe1xuICBzdG9yeTogJ3VwZGF0ZWQge29iamVjdH0nLFxuICBvYmplY3Rfb3duZXJfaWQ6IHJlcS51c2VyLmdldCgnaWQnKSxcbiAgb2JqZWN0X3RleHQ6ICdhY2NvdW50JyxcbiAgdXJsOiBgL2FkbWluL3RlYW0vdXNlcnMvJHtyZXEudXNlci5nZXQoJ2lkJyl9YFxufSlcblxuY29uc3QgcHJvY2Vzc29yID0gYXN5bmMgKHJlcSwgdHJ4LCBvcHRpb25zKSA9PiB7XG5cbiAgdHJ5IHtcblxuICAgIHJlcS51c2VyID0gYXdhaXQgcmVxLnVzZXIuc2F2ZSh7XG4gICAgICBmaXJzdF9uYW1lOiByZXEuYm9keS5maXJzdF9uYW1lLFxuICAgICAgbGFzdF9uYW1lOiByZXEuYm9keS5sYXN0X25hbWUsXG4gICAgICBlbWFpbDogcmVxLmJvZHkuZW1haWwsXG4gICAgICBzZWNvbmRhcnlfZW1haWw6IHJlcS5ib2R5LnNlY29uZGFyeV9lbWFpbFxuICAgIH0sIHtcbiAgICAgIHBhdGNoOiB0cnVlLFxuICAgICAgdHJhbnNhY3Rpbmc6IHRyeFxuICAgIH0pXG5cbiAgICByZXR1cm4ge1xuICAgICAgZmlyc3RfbmFtZTogcmVxLnVzZXIuZ2V0KCdmaXJzdF9uYW1lJyksXG4gICAgICBsYXN0X25hbWU6IHJlcS51c2VyLmdldCgnbGFzdF9uYW1lJyksXG4gICAgICBlbWFpbDogcmVxLnVzZXIuZ2V0KCdlbWFpbCcpLFxuICAgICAgc2Vjb25kYXJ5X2VtYWlsOiByZXEudXNlci5nZXQoJ3NlY29uZGFyeV9lbWFpbCcpXG4gICAgfVxuXG4gIH0gY2F0Y2goZXJyKSB7XG5cbiAgICB0aHJvdyBuZXcgQmFja2ZyYW1lRXJyb3Ioe1xuICAgICAgY29kZTogNDIyLFxuICAgICAgbWVzc2FnZTogJ1VuYWJsZSB0byBzYXZlIGFjY291bnQnLFxuICAgICAgZXJyb3JzOiBlcnIudG9KU09OKClcbiAgICB9KVxuXG4gIH1cblxufVxuXG5jb25zdCBtZXNzYWdlcyA9IChyZXEsIHRyeCwgcmVzdWx0LCBvcHRpb25zKSA9PiAoe1xuICBjaGFubmVsOiAndXNlcicsXG4gIGFjdGlvbjogJ3Nlc3Npb24nXG59KVxuXG5jb25zdCB1cGRhdGVSb3V0ZSA9IG5ldyBSb3V0ZSh7XG4gIGFjdGl2aXR5LFxuICBtZXNzYWdlcyxcbiAgbWV0aG9kOiAncGF0Y2gnLFxuICBwYXRoOiAnJyxcbiAgcHJvY2Vzc29yXG59KVxuXG5leHBvcnQgZGVmYXVsdCB1cGRhdGVSb3V0ZVxuIl19