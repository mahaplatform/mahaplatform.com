'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = require('bluebird');

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, trx, options) {
    var notification_method_id, user_id;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            notification_method_id = req.body.notification_method_id;
            user_id = req.user.get('id');
            _context2.next = 4;
            return req.user.save({ notification_method_id: notification_method_id }, { patch: true, transacting: trx });

          case 4:
            _context2.next = 6;
            return options.knex('maha_users_notification_types').transacting('trx').where({ user_id: user_id }).delete();

          case 6:
            _context2.next = 8;
            return (0, _bluebird.map)(req.body.ignored, function () {
              var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(notification_type_id) {
                var data;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        data = { user_id: user_id, notification_type_id: notification_type_id };
                        _context.next = 3;
                        return options.knex('maha_users_notification_types').transacting('trx').insert(data);

                      case 3:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x4) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 8:
            return _context2.abrupt('return', {});

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function processor(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var activity = function activity(req, trx, result, options) {
  return {
    story: 'changed {object}',
    object_owner_id: req.user.get('id'),
    object_text: 'notification preferences',
    url: '/admin/team/users/' + req.user.get('id')
  };
};

var passwordRoute = new _server.Route({
  activity: activity,
  method: 'patch',
  path: '',
  processor: processor
});

exports.default = passwordRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsIm5vdGlmaWNhdGlvbl9tZXRob2RfaWQiLCJib2R5IiwidXNlcl9pZCIsInVzZXIiLCJnZXQiLCJzYXZlIiwicGF0Y2giLCJ0cmFuc2FjdGluZyIsImtuZXgiLCJ3aGVyZSIsImRlbGV0ZSIsImlnbm9yZWQiLCJub3RpZmljYXRpb25fdHlwZV9pZCIsImRhdGEiLCJpbnNlcnQiLCJhY3Rpdml0eSIsInJlc3VsdCIsInN0b3J5Iiwib2JqZWN0X293bmVyX2lkIiwib2JqZWN0X3RleHQiLCJ1cmwiLCJwYXNzd29yZFJvdXRlIiwiUm91dGUiLCJtZXRob2QiLCJwYXRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQSxJQUFNQTtBQUFBLHNGQUFZLGtCQUFPQyxHQUFQLEVBQVlDLEdBQVosRUFBaUJDLE9BQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVWQyxrQ0FGVSxHQUVlSCxJQUFJSSxJQUFKLENBQVNELHNCQUZ4QjtBQUlWRSxtQkFKVSxHQUlBTCxJQUFJTSxJQUFKLENBQVNDLEdBQVQsQ0FBYSxJQUFiLENBSkE7QUFBQTtBQUFBLG1CQU1WUCxJQUFJTSxJQUFKLENBQVNFLElBQVQsQ0FBYyxFQUFFTCw4Q0FBRixFQUFkLEVBQTBDLEVBQUVNLE9BQU8sSUFBVCxFQUFlQyxhQUFhVCxHQUE1QixFQUExQyxDQU5VOztBQUFBO0FBQUE7QUFBQSxtQkFRVkMsUUFBUVMsSUFBUixDQUFhLCtCQUFiLEVBQThDRCxXQUE5QyxDQUEwRCxLQUExRCxFQUFpRUUsS0FBakUsQ0FBdUUsRUFBRVAsZ0JBQUYsRUFBdkUsRUFBb0ZRLE1BQXBGLEVBUlU7O0FBQUE7QUFBQTtBQUFBLG1CQVVWLG1CQUFZYixJQUFJSSxJQUFKLENBQVNVLE9BQXJCO0FBQUEsbUdBQThCLGlCQUFPQyxvQkFBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFNUJDLDRCQUY0QixHQUVyQixFQUFFWCxnQkFBRixFQUFXVSwwQ0FBWCxFQUZxQjtBQUFBO0FBQUEsK0JBSTVCYixRQUFRUyxJQUFSLENBQWEsK0JBQWIsRUFBOENELFdBQTlDLENBQTBELEtBQTFELEVBQWlFTyxNQUFqRSxDQUF3RUQsSUFBeEUsQ0FKNEI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBOUI7O0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBVlU7O0FBQUE7QUFBQSw4Q0FrQlQsRUFsQlM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztBQXNCQSxJQUFNRSxXQUFXLFNBQVhBLFFBQVcsQ0FBQ2xCLEdBQUQsRUFBTUMsR0FBTixFQUFXa0IsTUFBWCxFQUFtQmpCLE9BQW5CO0FBQUEsU0FBZ0M7QUFDL0NrQixXQUFPLGtCQUR3QztBQUUvQ0MscUJBQWlCckIsSUFBSU0sSUFBSixDQUFTQyxHQUFULENBQWEsSUFBYixDQUY4QjtBQUcvQ2UsaUJBQWEsMEJBSGtDO0FBSS9DQyxnQ0FBMEJ2QixJQUFJTSxJQUFKLENBQVNDLEdBQVQsQ0FBYSxJQUFiO0FBSnFCLEdBQWhDO0FBQUEsQ0FBakI7O0FBT0EsSUFBTWlCLGdCQUFnQixJQUFJQyxhQUFKLENBQVU7QUFDOUJQLG9CQUQ4QjtBQUU5QlEsVUFBUSxPQUZzQjtBQUc5QkMsUUFBTSxFQUh3QjtBQUk5QjVCO0FBSjhCLENBQVYsQ0FBdEI7O2tCQU9leUIsYSIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGUgfSBmcm9tICcuLi8uLi8uLi9zZXJ2ZXInXG5cbmNvbnN0IHByb2Nlc3NvciA9IGFzeW5jIChyZXEsIHRyeCwgb3B0aW9ucykgPT4ge1xuXG4gIGNvbnN0IG5vdGlmaWNhdGlvbl9tZXRob2RfaWQgPSByZXEuYm9keS5ub3RpZmljYXRpb25fbWV0aG9kX2lkXG5cbiAgY29uc3QgdXNlcl9pZCA9IHJlcS51c2VyLmdldCgnaWQnKVxuXG4gIGF3YWl0IHJlcS51c2VyLnNhdmUoeyBub3RpZmljYXRpb25fbWV0aG9kX2lkIH0sIHsgcGF0Y2g6IHRydWUsIHRyYW5zYWN0aW5nOiB0cnggfSlcblxuICBhd2FpdCBvcHRpb25zLmtuZXgoJ21haGFfdXNlcnNfbm90aWZpY2F0aW9uX3R5cGVzJykudHJhbnNhY3RpbmcoJ3RyeCcpLndoZXJlKHsgdXNlcl9pZCB9KS5kZWxldGUoKVxuXG4gIGF3YWl0IFByb21pc2UubWFwKHJlcS5ib2R5Lmlnbm9yZWQsIGFzeW5jIChub3RpZmljYXRpb25fdHlwZV9pZCkgPT4ge1xuXG4gICAgY29uc3QgZGF0YSA9IHsgdXNlcl9pZCwgbm90aWZpY2F0aW9uX3R5cGVfaWQgfVxuXG4gICAgYXdhaXQgb3B0aW9ucy5rbmV4KCdtYWhhX3VzZXJzX25vdGlmaWNhdGlvbl90eXBlcycpLnRyYW5zYWN0aW5nKCd0cngnKS5pbnNlcnQoZGF0YSlcblxuICB9KVxuXG4gIHJldHVybiB7fVxuXG59XG5cbmNvbnN0IGFjdGl2aXR5ID0gKHJlcSwgdHJ4LCByZXN1bHQsIG9wdGlvbnMpID0+ICh7XG4gIHN0b3J5OiAnY2hhbmdlZCB7b2JqZWN0fScsXG4gIG9iamVjdF9vd25lcl9pZDogcmVxLnVzZXIuZ2V0KCdpZCcpLFxuICBvYmplY3RfdGV4dDogJ25vdGlmaWNhdGlvbiBwcmVmZXJlbmNlcycsXG4gIHVybDogYC9hZG1pbi90ZWFtL3VzZXJzLyR7cmVxLnVzZXIuZ2V0KCdpZCcpfWBcbn0pXG5cbmNvbnN0IHBhc3N3b3JkUm91dGUgPSBuZXcgUm91dGUoe1xuICBhY3Rpdml0eSxcbiAgbWV0aG9kOiAncGF0Y2gnLFxuICBwYXRoOiAnJyxcbiAgcHJvY2Vzc29yXG59KVxuXG5leHBvcnQgZGVmYXVsdCBwYXNzd29yZFJvdXRlXG4iXX0=