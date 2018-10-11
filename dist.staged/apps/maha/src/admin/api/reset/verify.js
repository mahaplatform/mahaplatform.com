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

var _server = require('../../../server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var id, security_question;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = req.user.get('security_question_id');
            _context.next = 3;
            return _security_question2.default.where({ id: id }).fetch({ transacting: trx });

          case 3:
            security_question = _context.sent;

            if (security_question) {
              _context.next = 6;
              break;
            }

            throw new _server.BackframeError({
              code: 404,
              message: 'Unable to find security question'
            });

          case 6:
            _context.next = 8;
            return req.user.load('photo', { transacting: trx });

          case 8:
            return _context.abrupt('return', {
              user: {
                id: req.user.get('id'),
                first_name: req.user.get('first_name'),
                full_name: req.user.get('full_name'),
                initials: req.user.get('initials'),
                email: req.user.get('email'),
                photo: req.user.related('photo').get('path')
              },
              question: {
                text: security_question.get('text')
              }
            });

          case 9:
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
  path: '/verify',
  method: 'post',
  authenticated: false,
  processor: processor,
  rules: rules
});

exports.default = verifyRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsImlkIiwidXNlciIsImdldCIsIlNlY3VyaXR5UXVlc3Rpb24iLCJ3aGVyZSIsImZldGNoIiwidHJhbnNhY3RpbmciLCJzZWN1cml0eV9xdWVzdGlvbiIsIkJhY2tmcmFtZUVycm9yIiwiY29kZSIsIm1lc3NhZ2UiLCJsb2FkIiwiZmlyc3RfbmFtZSIsImZ1bGxfbmFtZSIsImluaXRpYWxzIiwiZW1haWwiLCJwaG90byIsInJlbGF0ZWQiLCJxdWVzdGlvbiIsInRleHQiLCJydWxlcyIsInRva2VuIiwidmVyaWZ5Um91dGUiLCJSb3V0ZSIsInBhdGgiLCJtZXRob2QiLCJhdXRoZW50aWNhdGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFNQTtBQUFBLHNGQUFZLGlCQUFPQyxHQUFQLEVBQVlDLEdBQVosRUFBaUJDLE9BQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVWQyxjQUZVLEdBRUxILElBQUlJLElBQUosQ0FBU0MsR0FBVCxDQUFhLHNCQUFiLENBRks7QUFBQTtBQUFBLG1CQUlnQkMsNEJBQWlCQyxLQUFqQixDQUF1QixFQUFFSixNQUFGLEVBQXZCLEVBQStCSyxLQUEvQixDQUFxQyxFQUFFQyxhQUFhUixHQUFmLEVBQXJDLENBSmhCOztBQUFBO0FBSVZTLDZCQUpVOztBQUFBLGdCQU1aQSxpQkFOWTtBQUFBO0FBQUE7QUFBQTs7QUFBQSxrQkFPUixJQUFJQyxzQkFBSixDQUFtQjtBQUN2QkMsb0JBQU0sR0FEaUI7QUFFdkJDLHVCQUFTO0FBRmMsYUFBbkIsQ0FQUTs7QUFBQTtBQUFBO0FBQUEsbUJBYVZiLElBQUlJLElBQUosQ0FBU1UsSUFBVCxDQUFjLE9BQWQsRUFBdUIsRUFBRUwsYUFBYVIsR0FBZixFQUF2QixDQWJVOztBQUFBO0FBQUEsNkNBZVQ7QUFDTEcsb0JBQU07QUFDSkQsb0JBQUlILElBQUlJLElBQUosQ0FBU0MsR0FBVCxDQUFhLElBQWIsQ0FEQTtBQUVKVSw0QkFBWWYsSUFBSUksSUFBSixDQUFTQyxHQUFULENBQWEsWUFBYixDQUZSO0FBR0pXLDJCQUFXaEIsSUFBSUksSUFBSixDQUFTQyxHQUFULENBQWEsV0FBYixDQUhQO0FBSUpZLDBCQUFVakIsSUFBSUksSUFBSixDQUFTQyxHQUFULENBQWEsVUFBYixDQUpOO0FBS0phLHVCQUFPbEIsSUFBSUksSUFBSixDQUFTQyxHQUFULENBQWEsT0FBYixDQUxIO0FBTUpjLHVCQUFPbkIsSUFBSUksSUFBSixDQUFTZ0IsT0FBVCxDQUFpQixPQUFqQixFQUEwQmYsR0FBMUIsQ0FBOEIsTUFBOUI7QUFOSCxlQUREO0FBU0xnQix3QkFBVTtBQUNSQyxzQkFBTVosa0JBQWtCTCxHQUFsQixDQUFzQixNQUF0QjtBQURFO0FBVEwsYUFmUzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFaOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBK0JBLElBQU1rQixRQUFRO0FBQ1pDLFNBQU87QUFESyxDQUFkOztBQUlBLElBQU1DLGNBQWMsSUFBSUMsYUFBSixDQUFVO0FBQzVCQyxRQUFNLFNBRHNCO0FBRTVCQyxVQUFRLE1BRm9CO0FBRzVCQyxpQkFBZSxLQUhhO0FBSTVCOUIsc0JBSjRCO0FBSzVCd0I7QUFMNEIsQ0FBVixDQUFwQjs7a0JBUWVFLFciLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTZWN1cml0eVF1ZXN0aW9uIGZyb20gJy4uLy4uLy4uL21vZGVscy9zZWN1cml0eV9xdWVzdGlvbidcbmltcG9ydCB7IFJvdXRlLCBCYWNrZnJhbWVFcnJvciB9IGZyb20gJy4uLy4uLy4uL3NlcnZlcidcblxuY29uc3QgcHJvY2Vzc29yID0gYXN5bmMgKHJlcSwgdHJ4LCBvcHRpb25zKSA9PiB7XG5cbiAgY29uc3QgaWQgPSByZXEudXNlci5nZXQoJ3NlY3VyaXR5X3F1ZXN0aW9uX2lkJylcblxuICBjb25zdCBzZWN1cml0eV9xdWVzdGlvbiA9IGF3YWl0IFNlY3VyaXR5UXVlc3Rpb24ud2hlcmUoeyBpZCB9KS5mZXRjaCh7IHRyYW5zYWN0aW5nOiB0cnggfSlcblxuICBpZighc2VjdXJpdHlfcXVlc3Rpb24pIHtcbiAgICB0aHJvdyBuZXcgQmFja2ZyYW1lRXJyb3Ioe1xuICAgICAgY29kZTogNDA0LFxuICAgICAgbWVzc2FnZTogJ1VuYWJsZSB0byBmaW5kIHNlY3VyaXR5IHF1ZXN0aW9uJ1xuICAgIH0pXG4gIH1cblxuICBhd2FpdCByZXEudXNlci5sb2FkKCdwaG90bycsIHsgdHJhbnNhY3Rpbmc6IHRyeCB9KVxuXG4gIHJldHVybiB7XG4gICAgdXNlcjoge1xuICAgICAgaWQ6IHJlcS51c2VyLmdldCgnaWQnKSxcbiAgICAgIGZpcnN0X25hbWU6IHJlcS51c2VyLmdldCgnZmlyc3RfbmFtZScpLFxuICAgICAgZnVsbF9uYW1lOiByZXEudXNlci5nZXQoJ2Z1bGxfbmFtZScpLFxuICAgICAgaW5pdGlhbHM6IHJlcS51c2VyLmdldCgnaW5pdGlhbHMnKSxcbiAgICAgIGVtYWlsOiByZXEudXNlci5nZXQoJ2VtYWlsJyksXG4gICAgICBwaG90bzogcmVxLnVzZXIucmVsYXRlZCgncGhvdG8nKS5nZXQoJ3BhdGgnKVxuICAgIH0sXG4gICAgcXVlc3Rpb246IHtcbiAgICAgIHRleHQ6IHNlY3VyaXR5X3F1ZXN0aW9uLmdldCgndGV4dCcpXG4gICAgfVxuICB9XG5cbn1cblxuY29uc3QgcnVsZXMgPSB7XG4gIHRva2VuOiAncmVxdWlyZWQnXG59XG5cbmNvbnN0IHZlcmlmeVJvdXRlID0gbmV3IFJvdXRlKHtcbiAgcGF0aDogJy92ZXJpZnknLFxuICBtZXRob2Q6ICdwb3N0JyxcbiAgYXV0aGVudGljYXRlZDogZmFsc2UsXG4gIHByb2Nlc3NvcixcbiAgcnVsZXNcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IHZlcmlmeVJvdXRlXG4iXX0=