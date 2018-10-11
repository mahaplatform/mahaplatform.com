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
    story: 'changed {object}',
    object_owner_id: req.user.get('id'),
    object_text: 'photo',
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
              photo_id: req.body.photo_id
            }, {
              patch: true,
              transacting: trx
            });

          case 3:
            req.user = _context.sent;
            return _context.abrupt('return', {
              photo_id: req.user.get('photo_id')
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

var photoRoute = new _server.Route({
  activity: activity,
  messages: messages,
  method: 'patch',
  path: '/photo',
  processor: processor
});

exports.default = photoRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiYWN0aXZpdHkiLCJyZXEiLCJ0cngiLCJyZXN1bHQiLCJvcHRpb25zIiwic3RvcnkiLCJvYmplY3Rfb3duZXJfaWQiLCJ1c2VyIiwiZ2V0Iiwib2JqZWN0X3RleHQiLCJ1cmwiLCJwcm9jZXNzb3IiLCJzYXZlIiwicGhvdG9faWQiLCJib2R5IiwicGF0Y2giLCJ0cmFuc2FjdGluZyIsIkJhY2tmcmFtZUVycm9yIiwiY29kZSIsIm1lc3NhZ2UiLCJlcnJvcnMiLCJ0b0pTT04iLCJtZXNzYWdlcyIsImNoYW5uZWwiLCJhY3Rpb24iLCJwaG90b1JvdXRlIiwiUm91dGUiLCJtZXRob2QiLCJwYXRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBRUEsSUFBTUEsV0FBVyxTQUFYQSxRQUFXLENBQUNDLEdBQUQsRUFBTUMsR0FBTixFQUFXQyxNQUFYLEVBQW1CQyxPQUFuQjtBQUFBLFNBQWdDO0FBQy9DQyxXQUFPLGtCQUR3QztBQUUvQ0MscUJBQWlCTCxJQUFJTSxJQUFKLENBQVNDLEdBQVQsQ0FBYSxJQUFiLENBRjhCO0FBRy9DQyxpQkFBYSxPQUhrQztBQUkvQ0MsZ0NBQTBCVCxJQUFJTSxJQUFKLENBQVNDLEdBQVQsQ0FBYSxJQUFiO0FBSnFCLEdBQWhDO0FBQUEsQ0FBakI7O0FBT0EsSUFBTUc7QUFBQSxzRkFBWSxpQkFBT1YsR0FBUCxFQUFZQyxHQUFaLEVBQWlCRSxPQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUlHSCxJQUFJTSxJQUFKLENBQVNLLElBQVQsQ0FBYztBQUM3QkMsd0JBQVVaLElBQUlhLElBQUosQ0FBU0Q7QUFEVSxhQUFkLEVBRWQ7QUFDREUscUJBQU8sSUFETjtBQUVEQywyQkFBYWQ7QUFGWixhQUZjLENBSkg7O0FBQUE7QUFJZEQsZ0JBQUlNLElBSlU7QUFBQSw2Q0FXUDtBQUNMTSx3QkFBVVosSUFBSU0sSUFBSixDQUFTQyxHQUFULENBQWEsVUFBYjtBQURMLGFBWE87O0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBaUJSLElBQUlTLHNCQUFKLENBQW1CO0FBQ3ZCQyxvQkFBTSxHQURpQjtBQUV2QkMsdUJBQVMsd0JBRmM7QUFHdkJDLHNCQUFRLFlBQUlDLE1BQUo7QUFIZSxhQUFuQixDQWpCUTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFaOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBMkJBLElBQU1DLFdBQVcsU0FBWEEsUUFBVyxDQUFDckIsR0FBRCxFQUFNQyxHQUFOLEVBQVdDLE1BQVgsRUFBbUJDLE9BQW5CO0FBQUEsU0FBZ0M7QUFDL0NtQixhQUFTLE1BRHNDO0FBRS9DQyxZQUFRO0FBRnVDLEdBQWhDO0FBQUEsQ0FBakI7O0FBS0EsSUFBTUMsYUFBYSxJQUFJQyxhQUFKLENBQVU7QUFDM0IxQixvQkFEMkI7QUFFM0JzQixvQkFGMkI7QUFHM0JLLFVBQVEsT0FIbUI7QUFJM0JDLFFBQU0sUUFKcUI7QUFLM0JqQjtBQUwyQixDQUFWLENBQW5COztrQkFRZWMsVSIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGUsIEJhY2tmcmFtZUVycm9yIH0gZnJvbSAnLi4vLi4vLi4vc2VydmVyJ1xuXG5jb25zdCBhY3Rpdml0eSA9IChyZXEsIHRyeCwgcmVzdWx0LCBvcHRpb25zKSA9PiAoe1xuICBzdG9yeTogJ2NoYW5nZWQge29iamVjdH0nLFxuICBvYmplY3Rfb3duZXJfaWQ6IHJlcS51c2VyLmdldCgnaWQnKSxcbiAgb2JqZWN0X3RleHQ6ICdwaG90bycsXG4gIHVybDogYC9hZG1pbi90ZWFtL3VzZXJzLyR7cmVxLnVzZXIuZ2V0KCdpZCcpfWBcbn0pXG5cbmNvbnN0IHByb2Nlc3NvciA9IGFzeW5jIChyZXEsIHRyeCwgb3B0aW9ucykgPT4ge1xuXG4gIHRyeSB7XG5cbiAgICByZXEudXNlciA9IGF3YWl0IHJlcS51c2VyLnNhdmUoe1xuICAgICAgcGhvdG9faWQ6IHJlcS5ib2R5LnBob3RvX2lkXG4gICAgfSwge1xuICAgICAgcGF0Y2g6IHRydWUsXG4gICAgICB0cmFuc2FjdGluZzogdHJ4XG4gICAgfSlcblxuICAgIHJldHVybiB7XG4gICAgICBwaG90b19pZDogcmVxLnVzZXIuZ2V0KCdwaG90b19pZCcpXG4gICAgfVxuXG4gIH0gY2F0Y2goZXJyKSB7XG5cbiAgICB0aHJvdyBuZXcgQmFja2ZyYW1lRXJyb3Ioe1xuICAgICAgY29kZTogNDIyLFxuICAgICAgbWVzc2FnZTogJ1VuYWJsZSB0byBzYXZlIGFjY291bnQnLFxuICAgICAgZXJyb3JzOiBlcnIudG9KU09OKClcbiAgICB9KVxuXG4gIH1cblxufVxuXG5jb25zdCBtZXNzYWdlcyA9IChyZXEsIHRyeCwgcmVzdWx0LCBvcHRpb25zKSA9PiAoe1xuICBjaGFubmVsOiAndXNlcicsXG4gIGFjdGlvbjogJ3Nlc3Npb24nXG59KVxuXG5jb25zdCBwaG90b1JvdXRlID0gbmV3IFJvdXRlKHtcbiAgYWN0aXZpdHksXG4gIG1lc3NhZ2VzLFxuICBtZXRob2Q6ICdwYXRjaCcsXG4gIHBhdGg6ICcvcGhvdG8nLFxuICBwcm9jZXNzb3Jcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IHBob3RvUm91dGVcbiJdfQ==