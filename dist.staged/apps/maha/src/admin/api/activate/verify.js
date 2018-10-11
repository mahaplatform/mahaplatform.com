'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _security_question = require('../../../models/security_question');

var _security_question2 = _interopRequireDefault(_security_question);

var _notification_method = require('../../../models/notification_method');

var _notification_method2 = _interopRequireDefault(_notification_method);

var _server = require('../../../server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var activity = function activity(req, trx, result, options) {
  return {
    story: 'claimed {object}',
    object_owner_id: req.user.get('id'),
    object_text: 'account activation',
    url: '/admin/team/users/' + req.user.get('id')
  };
};

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var questions, notification_methods;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return req.user.load(['photo'], { transacting: trx });

          case 2:
            if (!req.user.get('activated_at')) {
              _context.next = 4;
              break;
            }

            throw new _server.BackframeError({
              code: 404,
              message: 'This account has already been activated'
            });

          case 4:
            _context.next = 6;
            return _security_question2.default.fetchAll({ transacting: trx });

          case 6:
            questions = _context.sent;
            _context.next = 9;
            return _notification_method2.default.fetchAll({ transacting: trx });

          case 9:
            notification_methods = _context.sent;
            return _context.abrupt('return', {
              user: {
                id: req.user.get('id'),
                first_name: req.user.get('first_name'),
                last_name: req.user.get('last_name'),
                full_name: req.user.get('full_name'),
                initials: req.user.get('initials'),
                email: req.user.get('email'),
                photo_id: req.user.get('photo_id'),
                photo: req.user.related('photo').get('path')
              },
              questions: questions.map(function (question) {
                return {
                  id: question.get('id'),
                  text: question.get('text')
                };
              }),
              notification_methods: notification_methods.map(function (notification_method) {
                return {
                  id: notification_method.get('id'),
                  icon: notification_method.get('icon'),
                  title: notification_method.get('title'),
                  text: notification_method.get('text')
                };
              })
            });

          case 11:
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
  token: 'required'
};

var verifyRoute = new _server.Route({
  activity: activity,
  path: '/verify',
  method: 'post',
  authenticated: false,
  processor: processor,
  rules: rules
});

exports.default = verifyRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiYWN0aXZpdHkiLCJyZXEiLCJ0cngiLCJyZXN1bHQiLCJvcHRpb25zIiwic3RvcnkiLCJvYmplY3Rfb3duZXJfaWQiLCJ1c2VyIiwiZ2V0Iiwib2JqZWN0X3RleHQiLCJ1cmwiLCJwcm9jZXNzb3IiLCJsb2FkIiwidHJhbnNhY3RpbmciLCJCYWNrZnJhbWVFcnJvciIsImNvZGUiLCJtZXNzYWdlIiwiU2VjdXJpdHlRdWVzdGlvbiIsImZldGNoQWxsIiwicXVlc3Rpb25zIiwiTm90aWZpY2F0aW9uTWV0aG9kIiwibm90aWZpY2F0aW9uX21ldGhvZHMiLCJpZCIsImZpcnN0X25hbWUiLCJsYXN0X25hbWUiLCJmdWxsX25hbWUiLCJpbml0aWFscyIsImVtYWlsIiwicGhvdG9faWQiLCJwaG90byIsInJlbGF0ZWQiLCJtYXAiLCJxdWVzdGlvbiIsInRleHQiLCJub3RpZmljYXRpb25fbWV0aG9kIiwiaWNvbiIsInRpdGxlIiwicnVsZXMiLCJ0b2tlbiIsInZlcmlmeVJvdXRlIiwiUm91dGUiLCJwYXRoIiwibWV0aG9kIiwiYXV0aGVudGljYXRlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFNQSxXQUFXLFNBQVhBLFFBQVcsQ0FBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQVdDLE1BQVgsRUFBbUJDLE9BQW5CO0FBQUEsU0FBZ0M7QUFDL0NDLFdBQU8sa0JBRHdDO0FBRS9DQyxxQkFBaUJMLElBQUlNLElBQUosQ0FBU0MsR0FBVCxDQUFhLElBQWIsQ0FGOEI7QUFHL0NDLGlCQUFhLG9CQUhrQztBQUkvQ0MsZ0NBQTBCVCxJQUFJTSxJQUFKLENBQVNDLEdBQVQsQ0FBYSxJQUFiO0FBSnFCLEdBQWhDO0FBQUEsQ0FBakI7O0FBT0EsSUFBTUc7QUFBQSxzRkFBWSxpQkFBT1YsR0FBUCxFQUFZQyxHQUFaLEVBQWlCRSxPQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUVWSCxJQUFJTSxJQUFKLENBQVNLLElBQVQsQ0FBYyxDQUFDLE9BQUQsQ0FBZCxFQUF5QixFQUFFQyxhQUFhWCxHQUFmLEVBQXpCLENBRlU7O0FBQUE7QUFBQSxpQkFJYkQsSUFBSU0sSUFBSixDQUFTQyxHQUFULENBQWEsY0FBYixDQUphO0FBQUE7QUFBQTtBQUFBOztBQUFBLGtCQUtSLElBQUlNLHNCQUFKLENBQW1CO0FBQ3ZCQyxvQkFBTSxHQURpQjtBQUV2QkMsdUJBQVM7QUFGYyxhQUFuQixDQUxROztBQUFBO0FBQUE7QUFBQSxtQkFXUUMsNEJBQWlCQyxRQUFqQixDQUEwQixFQUFFTCxhQUFhWCxHQUFmLEVBQTFCLENBWFI7O0FBQUE7QUFXVmlCLHFCQVhVO0FBQUE7QUFBQSxtQkFhbUJDLDhCQUFtQkYsUUFBbkIsQ0FBNEIsRUFBRUwsYUFBYVgsR0FBZixFQUE1QixDQWJuQjs7QUFBQTtBQWFWbUIsZ0NBYlU7QUFBQSw2Q0FlVDtBQUNMZCxvQkFBTTtBQUNKZSxvQkFBSXJCLElBQUlNLElBQUosQ0FBU0MsR0FBVCxDQUFhLElBQWIsQ0FEQTtBQUVKZSw0QkFBWXRCLElBQUlNLElBQUosQ0FBU0MsR0FBVCxDQUFhLFlBQWIsQ0FGUjtBQUdKZ0IsMkJBQVd2QixJQUFJTSxJQUFKLENBQVNDLEdBQVQsQ0FBYSxXQUFiLENBSFA7QUFJSmlCLDJCQUFXeEIsSUFBSU0sSUFBSixDQUFTQyxHQUFULENBQWEsV0FBYixDQUpQO0FBS0prQiwwQkFBVXpCLElBQUlNLElBQUosQ0FBU0MsR0FBVCxDQUFhLFVBQWIsQ0FMTjtBQU1KbUIsdUJBQU8xQixJQUFJTSxJQUFKLENBQVNDLEdBQVQsQ0FBYSxPQUFiLENBTkg7QUFPSm9CLDBCQUFVM0IsSUFBSU0sSUFBSixDQUFTQyxHQUFULENBQWEsVUFBYixDQVBOO0FBUUpxQix1QkFBTzVCLElBQUlNLElBQUosQ0FBU3VCLE9BQVQsQ0FBaUIsT0FBakIsRUFBMEJ0QixHQUExQixDQUE4QixNQUE5QjtBQVJILGVBREQ7QUFXTFcseUJBQVdBLFVBQVVZLEdBQVYsQ0FBYztBQUFBLHVCQUFhO0FBQ3BDVCxzQkFBSVUsU0FBU3hCLEdBQVQsQ0FBYSxJQUFiLENBRGdDO0FBRXBDeUIsd0JBQU1ELFNBQVN4QixHQUFULENBQWEsTUFBYjtBQUY4QixpQkFBYjtBQUFBLGVBQWQsQ0FYTjtBQWVMYSxvQ0FBc0JBLHFCQUFxQlUsR0FBckIsQ0FBeUI7QUFBQSx1QkFBd0I7QUFDckVULHNCQUFJWSxvQkFBb0IxQixHQUFwQixDQUF3QixJQUF4QixDQURpRTtBQUVyRTJCLHdCQUFNRCxvQkFBb0IxQixHQUFwQixDQUF3QixNQUF4QixDQUYrRDtBQUdyRTRCLHlCQUFPRixvQkFBb0IxQixHQUFwQixDQUF3QixPQUF4QixDQUg4RDtBQUlyRXlCLHdCQUFNQyxvQkFBb0IxQixHQUFwQixDQUF3QixNQUF4QjtBQUorRCxpQkFBeEI7QUFBQSxlQUF6QjtBQWZqQixhQWZTOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUF3Q0EsSUFBTTZCLFFBQVE7QUFDWkMsU0FBTztBQURLLENBQWQ7O0FBSUEsSUFBTUMsY0FBYyxJQUFJQyxhQUFKLENBQVU7QUFDNUJ4QyxvQkFENEI7QUFFNUJ5QyxRQUFNLFNBRnNCO0FBRzVCQyxVQUFRLE1BSG9CO0FBSTVCQyxpQkFBZSxLQUphO0FBSzVCaEMsc0JBTDRCO0FBTTVCMEI7QUFONEIsQ0FBVixDQUFwQjs7a0JBU2VFLFciLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTZWN1cml0eVF1ZXN0aW9uIGZyb20gJy4uLy4uLy4uL21vZGVscy9zZWN1cml0eV9xdWVzdGlvbidcbmltcG9ydCBOb3RpZmljYXRpb25NZXRob2QgZnJvbSAnLi4vLi4vLi4vbW9kZWxzL25vdGlmaWNhdGlvbl9tZXRob2QnXG5pbXBvcnQgeyBCYWNrZnJhbWVFcnJvciwgUm91dGUgfSBmcm9tICcuLi8uLi8uLi9zZXJ2ZXInXG5cbmNvbnN0IGFjdGl2aXR5ID0gKHJlcSwgdHJ4LCByZXN1bHQsIG9wdGlvbnMpID0+ICh7XG4gIHN0b3J5OiAnY2xhaW1lZCB7b2JqZWN0fScsXG4gIG9iamVjdF9vd25lcl9pZDogcmVxLnVzZXIuZ2V0KCdpZCcpLFxuICBvYmplY3RfdGV4dDogJ2FjY291bnQgYWN0aXZhdGlvbicsXG4gIHVybDogYC9hZG1pbi90ZWFtL3VzZXJzLyR7cmVxLnVzZXIuZ2V0KCdpZCcpfWBcbn0pXG5cbmNvbnN0IHByb2Nlc3NvciA9IGFzeW5jIChyZXEsIHRyeCwgb3B0aW9ucykgPT4ge1xuXG4gIGF3YWl0IHJlcS51c2VyLmxvYWQoWydwaG90byddLCB7IHRyYW5zYWN0aW5nOiB0cnggfSlcblxuICBpZihyZXEudXNlci5nZXQoJ2FjdGl2YXRlZF9hdCcpKSB7XG4gICAgdGhyb3cgbmV3IEJhY2tmcmFtZUVycm9yKHtcbiAgICAgIGNvZGU6IDQwNCxcbiAgICAgIG1lc3NhZ2U6ICdUaGlzIGFjY291bnQgaGFzIGFscmVhZHkgYmVlbiBhY3RpdmF0ZWQnXG4gICAgfSlcbiAgfVxuXG4gIGNvbnN0IHF1ZXN0aW9ucyA9IGF3YWl0IFNlY3VyaXR5UXVlc3Rpb24uZmV0Y2hBbGwoeyB0cmFuc2FjdGluZzogdHJ4IH0pXG5cbiAgY29uc3Qgbm90aWZpY2F0aW9uX21ldGhvZHMgPSBhd2FpdCBOb3RpZmljYXRpb25NZXRob2QuZmV0Y2hBbGwoeyB0cmFuc2FjdGluZzogdHJ4IH0pXG5cbiAgcmV0dXJuIHtcbiAgICB1c2VyOiB7XG4gICAgICBpZDogcmVxLnVzZXIuZ2V0KCdpZCcpLFxuICAgICAgZmlyc3RfbmFtZTogcmVxLnVzZXIuZ2V0KCdmaXJzdF9uYW1lJyksXG4gICAgICBsYXN0X25hbWU6IHJlcS51c2VyLmdldCgnbGFzdF9uYW1lJyksXG4gICAgICBmdWxsX25hbWU6IHJlcS51c2VyLmdldCgnZnVsbF9uYW1lJyksXG4gICAgICBpbml0aWFsczogcmVxLnVzZXIuZ2V0KCdpbml0aWFscycpLFxuICAgICAgZW1haWw6IHJlcS51c2VyLmdldCgnZW1haWwnKSxcbiAgICAgIHBob3RvX2lkOiByZXEudXNlci5nZXQoJ3Bob3RvX2lkJyksXG4gICAgICBwaG90bzogcmVxLnVzZXIucmVsYXRlZCgncGhvdG8nKS5nZXQoJ3BhdGgnKVxuICAgIH0sXG4gICAgcXVlc3Rpb25zOiBxdWVzdGlvbnMubWFwKHF1ZXN0aW9uID0+ICh7XG4gICAgICBpZDogcXVlc3Rpb24uZ2V0KCdpZCcpLFxuICAgICAgdGV4dDogcXVlc3Rpb24uZ2V0KCd0ZXh0JylcbiAgICB9KSksXG4gICAgbm90aWZpY2F0aW9uX21ldGhvZHM6IG5vdGlmaWNhdGlvbl9tZXRob2RzLm1hcChub3RpZmljYXRpb25fbWV0aG9kID0+ICh7XG4gICAgICBpZDogbm90aWZpY2F0aW9uX21ldGhvZC5nZXQoJ2lkJyksXG4gICAgICBpY29uOiBub3RpZmljYXRpb25fbWV0aG9kLmdldCgnaWNvbicpLFxuICAgICAgdGl0bGU6IG5vdGlmaWNhdGlvbl9tZXRob2QuZ2V0KCd0aXRsZScpLFxuICAgICAgdGV4dDogbm90aWZpY2F0aW9uX21ldGhvZC5nZXQoJ3RleHQnKVxuICAgIH0pKVxuICB9XG5cbn1cblxuY29uc3QgcnVsZXMgPSB7XG4gIHRva2VuOiAncmVxdWlyZWQnXG59XG5cbmNvbnN0IHZlcmlmeVJvdXRlID0gbmV3IFJvdXRlKHtcbiAgYWN0aXZpdHksXG4gIHBhdGg6ICcvdmVyaWZ5JyxcbiAgbWV0aG9kOiAncG9zdCcsXG4gIGF1dGhlbnRpY2F0ZWQ6IGZhbHNlLFxuICBwcm9jZXNzb3IsXG4gIHJ1bGVzXG59KVxuXG5leHBvcnQgZGVmYXVsdCB2ZXJpZnlSb3V0ZVxuIl19