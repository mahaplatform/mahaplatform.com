'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../server');

var _profile = require('../../../models/profile');

var _profile2 = _interopRequireDefault(_profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var query, profile;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            query = function query(qb) {
              return qb.innerJoin('maha_sources', 'maha_sources.id', 'maha_profiles.source_id');
            };

            _context.next = 3;
            return _profile2.default.query(query).where({ text: req.params.source, user_id: req.user.get('id') }).fetch({ transacting: trx });

          case 3:
            profile = _context.sent;
            return _context.abrupt('return', profile !== null);

          case 5:
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

var checkRoute = new _server.Route({
  method: 'get',
  path: '/:source/check',
  processor: processor
});

exports.default = checkRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsInF1ZXJ5IiwicWIiLCJpbm5lckpvaW4iLCJQcm9maWxlIiwid2hlcmUiLCJ0ZXh0IiwicGFyYW1zIiwic291cmNlIiwidXNlcl9pZCIsInVzZXIiLCJnZXQiLCJmZXRjaCIsInRyYW5zYWN0aW5nIiwicHJvZmlsZSIsImNoZWNrUm91dGUiLCJSb3V0ZSIsIm1ldGhvZCIsInBhdGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7OztBQUVBLElBQU1BO0FBQUEsc0ZBQVksaUJBQU9DLEdBQVAsRUFBWUMsR0FBWixFQUFpQkMsT0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRVZDLGlCQUZVLEdBRUYsU0FBUkEsS0FBUTtBQUFBLHFCQUFNQyxHQUFHQyxTQUFILENBQWEsY0FBYixFQUE2QixpQkFBN0IsRUFBZ0QseUJBQWhELENBQU47QUFBQSxhQUZFOztBQUFBO0FBQUEsbUJBSU1DLGtCQUFRSCxLQUFSLENBQWNBLEtBQWQsRUFBcUJJLEtBQXJCLENBQTJCLEVBQUVDLE1BQU1SLElBQUlTLE1BQUosQ0FBV0MsTUFBbkIsRUFBMkJDLFNBQVNYLElBQUlZLElBQUosQ0FBU0MsR0FBVCxDQUFhLElBQWIsQ0FBcEMsRUFBM0IsRUFBb0ZDLEtBQXBGLENBQTBGLEVBQUVDLGFBQWFkLEdBQWYsRUFBMUYsQ0FKTjs7QUFBQTtBQUlWZSxtQkFKVTtBQUFBLDZDQU1SQSxZQUFZLElBTko7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztBQVVBLElBQU1DLGFBQWEsSUFBSUMsYUFBSixDQUFVO0FBQzNCQyxVQUFRLEtBRG1CO0FBRTNCQyxRQUFNLGdCQUZxQjtBQUczQnJCO0FBSDJCLENBQVYsQ0FBbkI7O2tCQU1la0IsVSIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGUgfSBmcm9tICcuLi8uLi8uLi9zZXJ2ZXInXG5pbXBvcnQgUHJvZmlsZSBmcm9tICcuLi8uLi8uLi9tb2RlbHMvcHJvZmlsZSdcblxuY29uc3QgcHJvY2Vzc29yID0gYXN5bmMgKHJlcSwgdHJ4LCBvcHRpb25zKSA9PiB7XG5cbiAgY29uc3QgcXVlcnkgPSBxYiA9PiBxYi5pbm5lckpvaW4oJ21haGFfc291cmNlcycsICdtYWhhX3NvdXJjZXMuaWQnLCAnbWFoYV9wcm9maWxlcy5zb3VyY2VfaWQnKVxuXG4gIGNvbnN0IHByb2ZpbGUgPSBhd2FpdCBQcm9maWxlLnF1ZXJ5KHF1ZXJ5KS53aGVyZSh7IHRleHQ6IHJlcS5wYXJhbXMuc291cmNlLCB1c2VyX2lkOiByZXEudXNlci5nZXQoJ2lkJyl9KS5mZXRjaCh7IHRyYW5zYWN0aW5nOiB0cnggfSlcblxuICByZXR1cm4gKHByb2ZpbGUgIT09IG51bGwpXG5cbn1cblxuY29uc3QgY2hlY2tSb3V0ZSA9IG5ldyBSb3V0ZSh7XG4gIG1ldGhvZDogJ2dldCcsXG4gIHBhdGg6ICcvOnNvdXJjZS9jaGVjaycsXG4gIHByb2Nlc3NvclxufSlcblxuZXhwb3J0IGRlZmF1bHQgY2hlY2tSb3V0ZVxuIl19