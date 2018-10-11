'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../server');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = _lodash2.default.pick(req.body, ['password']);
            _context.next = 3;
            return req.user.save(data, { patch: true, transacting: trx });

          case 3:
            return _context.abrupt('return', true);

          case 4:
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

var activity = function activity(req, trx, result, options) {
  return {
    story: 'changed {object}',
    object_owner_id: req.user.get('id'),
    object_text: 'password',
    url: '/admin/team/users/' + req.user.get('id')
  };
};

var validOldPassword = function validOldPassword(user) {
  return function (old_password) {
    if (!user.authenticate(old_password)) {
      throw new Error('Invalid password');
    }
  };
};

var rules = function rules(req, trx, options) {
  return {
    old_password: ['required', validOldPassword(req.user)],
    password: 'required',
    confirmation: ['required', 'matchesField:password']
  };
};

var passwordRoute = new _server.Route({
  activity: activity,
  method: 'patch',
  path: '/password',
  processor: processor,
  rules: rules
});

exports.default = passwordRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsImRhdGEiLCJfIiwicGljayIsImJvZHkiLCJ1c2VyIiwic2F2ZSIsInBhdGNoIiwidHJhbnNhY3RpbmciLCJhY3Rpdml0eSIsInJlc3VsdCIsInN0b3J5Iiwib2JqZWN0X293bmVyX2lkIiwiZ2V0Iiwib2JqZWN0X3RleHQiLCJ1cmwiLCJ2YWxpZE9sZFBhc3N3b3JkIiwib2xkX3Bhc3N3b3JkIiwiYXV0aGVudGljYXRlIiwiRXJyb3IiLCJydWxlcyIsInBhc3N3b3JkIiwiY29uZmlybWF0aW9uIiwicGFzc3dvcmRSb3V0ZSIsIlJvdXRlIiwibWV0aG9kIiwicGF0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7O0FBRUEsSUFBTUE7QUFBQSxzRkFBWSxpQkFBT0MsR0FBUCxFQUFZQyxHQUFaLEVBQWlCQyxPQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFVkMsZ0JBRlUsR0FFSEMsaUJBQUVDLElBQUYsQ0FBT0wsSUFBSU0sSUFBWCxFQUFpQixDQUFDLFVBQUQsQ0FBakIsQ0FGRztBQUFBO0FBQUEsbUJBSVZOLElBQUlPLElBQUosQ0FBU0MsSUFBVCxDQUFjTCxJQUFkLEVBQW9CLEVBQUVNLE9BQU8sSUFBVCxFQUFlQyxhQUFhVCxHQUE1QixFQUFwQixDQUpVOztBQUFBO0FBQUEsNkNBTVQsSUFOUzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFaOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBVUEsSUFBTVUsV0FBVyxTQUFYQSxRQUFXLENBQUNYLEdBQUQsRUFBTUMsR0FBTixFQUFXVyxNQUFYLEVBQW1CVixPQUFuQjtBQUFBLFNBQWdDO0FBQy9DVyxXQUFPLGtCQUR3QztBQUUvQ0MscUJBQWlCZCxJQUFJTyxJQUFKLENBQVNRLEdBQVQsQ0FBYSxJQUFiLENBRjhCO0FBRy9DQyxpQkFBYSxVQUhrQztBQUkvQ0MsZ0NBQTBCakIsSUFBSU8sSUFBSixDQUFTUSxHQUFULENBQWEsSUFBYjtBQUpxQixHQUFoQztBQUFBLENBQWpCOztBQU9BLElBQU1HLG1CQUFtQixTQUFuQkEsZ0JBQW1CLENBQUNYLElBQUQ7QUFBQSxTQUFVLFVBQUNZLFlBQUQsRUFBa0I7QUFDbkQsUUFBRyxDQUFDWixLQUFLYSxZQUFMLENBQWtCRCxZQUFsQixDQUFKLEVBQXFDO0FBQ25DLFlBQU0sSUFBSUUsS0FBSixDQUFVLGtCQUFWLENBQU47QUFDRDtBQUNGLEdBSndCO0FBQUEsQ0FBekI7O0FBTUEsSUFBTUMsUUFBUSxTQUFSQSxLQUFRLENBQUN0QixHQUFELEVBQU1DLEdBQU4sRUFBV0MsT0FBWDtBQUFBLFNBQXdCO0FBQ3BDaUIsa0JBQWMsQ0FBQyxVQUFELEVBQWFELGlCQUFpQmxCLElBQUlPLElBQXJCLENBQWIsQ0FEc0I7QUFFcENnQixjQUFVLFVBRjBCO0FBR3BDQyxrQkFBYyxDQUFDLFVBQUQsRUFBYSx1QkFBYjtBQUhzQixHQUF4QjtBQUFBLENBQWQ7O0FBTUEsSUFBTUMsZ0JBQWdCLElBQUlDLGFBQUosQ0FBVTtBQUM5QmYsb0JBRDhCO0FBRTlCZ0IsVUFBUSxPQUZzQjtBQUc5QkMsUUFBTSxXQUh3QjtBQUk5QjdCLHNCQUo4QjtBQUs5QnVCO0FBTDhCLENBQVYsQ0FBdEI7O2tCQVFlRyxhIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZlcidcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCdcblxuY29uc3QgcHJvY2Vzc29yID0gYXN5bmMgKHJlcSwgdHJ4LCBvcHRpb25zKSA9PiB7XG5cbiAgY29uc3QgZGF0YSA9IF8ucGljayhyZXEuYm9keSwgWydwYXNzd29yZCddKVxuXG4gIGF3YWl0IHJlcS51c2VyLnNhdmUoZGF0YSwgeyBwYXRjaDogdHJ1ZSwgdHJhbnNhY3Rpbmc6IHRyeCB9KVxuXG4gIHJldHVybiB0cnVlXG5cbn1cblxuY29uc3QgYWN0aXZpdHkgPSAocmVxLCB0cngsIHJlc3VsdCwgb3B0aW9ucykgPT4gKHtcbiAgc3Rvcnk6ICdjaGFuZ2VkIHtvYmplY3R9JyxcbiAgb2JqZWN0X293bmVyX2lkOiByZXEudXNlci5nZXQoJ2lkJyksXG4gIG9iamVjdF90ZXh0OiAncGFzc3dvcmQnLFxuICB1cmw6IGAvYWRtaW4vdGVhbS91c2Vycy8ke3JlcS51c2VyLmdldCgnaWQnKX1gXG59KVxuXG5jb25zdCB2YWxpZE9sZFBhc3N3b3JkID0gKHVzZXIpID0+IChvbGRfcGFzc3dvcmQpID0+IHtcbiAgaWYoIXVzZXIuYXV0aGVudGljYXRlKG9sZF9wYXNzd29yZCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgcGFzc3dvcmQnKVxuICB9XG59XG5cbmNvbnN0IHJ1bGVzID0gKHJlcSwgdHJ4LCBvcHRpb25zKSA9PiAoe1xuICBvbGRfcGFzc3dvcmQ6IFsncmVxdWlyZWQnLCB2YWxpZE9sZFBhc3N3b3JkKHJlcS51c2VyKV0sXG4gIHBhc3N3b3JkOiAncmVxdWlyZWQnLFxuICBjb25maXJtYXRpb246IFsncmVxdWlyZWQnLCAnbWF0Y2hlc0ZpZWxkOnBhc3N3b3JkJ11cbn0pXG5cbmNvbnN0IHBhc3N3b3JkUm91dGUgPSBuZXcgUm91dGUoe1xuICBhY3Rpdml0eSxcbiAgbWV0aG9kOiAncGF0Y2gnLFxuICBwYXRoOiAnL3Bhc3N3b3JkJyxcbiAgcHJvY2Vzc29yLFxuICBydWxlc1xufSlcblxuZXhwb3J0IGRlZmF1bHQgcGFzc3dvcmRSb3V0ZVxuIl19