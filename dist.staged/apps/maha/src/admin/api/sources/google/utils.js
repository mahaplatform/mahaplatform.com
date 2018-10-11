'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getClient = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _profile = require('../../../../models/profile');

var _profile2 = _interopRequireDefault(_profile);

var _googleapis = require('googleapis');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getClient = exports.getClient = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx) {
    var auth, query, profile, client;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            auth = new _googleapis.google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.WEB_HOST + '/google/token');

            query = function query(qb) {
              return qb.innerJoin('maha_sources', 'maha_sources.id', 'maha_profiles.source_id');
            };

            _context.next = 4;
            return _profile2.default.query(query).where({ text: 'google', user_id: req.user.get('id') }).fetch({ transacting: trx });

          case 4:
            profile = _context.sent;


            //TODO: refresh token

            auth.setCredentials(profile.get('data'));

            client = _googleapis.google.drive({
              version: 'v3',
              auth: auth
            });
            return _context.abrupt('return', client);

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getClient(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiZ2V0Q2xpZW50IiwicmVxIiwidHJ4IiwiYXV0aCIsImdvb2dsZSIsIk9BdXRoMiIsInByb2Nlc3MiLCJlbnYiLCJHT09HTEVfQ0xJRU5UX0lEIiwiR09PR0xFX0NMSUVOVF9TRUNSRVQiLCJXRUJfSE9TVCIsInF1ZXJ5IiwicWIiLCJpbm5lckpvaW4iLCJQcm9maWxlIiwid2hlcmUiLCJ0ZXh0IiwidXNlcl9pZCIsInVzZXIiLCJnZXQiLCJmZXRjaCIsInRyYW5zYWN0aW5nIiwicHJvZmlsZSIsInNldENyZWRlbnRpYWxzIiwiY2xpZW50IiwiZHJpdmUiLCJ2ZXJzaW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRU8sSUFBTUE7QUFBQSxzRkFBWSxpQkFBT0MsR0FBUCxFQUFZQyxHQUFaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVqQkMsZ0JBRmlCLEdBRVYsSUFBSUMsbUJBQU9ELElBQVAsQ0FBWUUsTUFBaEIsQ0FBdUJDLFFBQVFDLEdBQVIsQ0FBWUMsZ0JBQW5DLEVBQXFERixRQUFRQyxHQUFSLENBQVlFLG9CQUFqRSxFQUEwRkgsUUFBUUMsR0FBUixDQUFZRyxRQUF0RyxtQkFGVTs7QUFJakJDLGlCQUppQixHQUlULFNBQVJBLEtBQVE7QUFBQSxxQkFBTUMsR0FBR0MsU0FBSCxDQUFhLGNBQWIsRUFBNkIsaUJBQTdCLEVBQWdELHlCQUFoRCxDQUFOO0FBQUEsYUFKUzs7QUFBQTtBQUFBLG1CQU1EQyxrQkFBUUgsS0FBUixDQUFjQSxLQUFkLEVBQXFCSSxLQUFyQixDQUEyQixFQUFFQyxNQUFNLFFBQVIsRUFBa0JDLFNBQVNoQixJQUFJaUIsSUFBSixDQUFTQyxHQUFULENBQWEsSUFBYixDQUEzQixFQUEzQixFQUEyRUMsS0FBM0UsQ0FBaUYsRUFBRUMsYUFBYW5CLEdBQWYsRUFBakYsQ0FOQzs7QUFBQTtBQU1qQm9CLG1CQU5pQjs7O0FBUXZCOztBQUVBbkIsaUJBQUtvQixjQUFMLENBQW9CRCxRQUFRSCxHQUFSLENBQVksTUFBWixDQUFwQjs7QUFFTUssa0JBWmlCLEdBWVJwQixtQkFBT3FCLEtBQVAsQ0FBYTtBQUMxQkMsdUJBQVMsSUFEaUI7QUFFMUJ2QjtBQUYwQixhQUFiLENBWlE7QUFBQSw2Q0FpQmhCcUIsTUFqQmdCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTiIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb2ZpbGUgZnJvbSAnLi4vLi4vLi4vLi4vbW9kZWxzL3Byb2ZpbGUnXG5pbXBvcnQgeyBnb29nbGUgfSBmcm9tICdnb29nbGVhcGlzJ1xuXG5leHBvcnQgY29uc3QgZ2V0Q2xpZW50ID0gYXN5bmMgKHJlcSwgdHJ4KSA9PiB7XG5cbiAgY29uc3QgYXV0aCA9IG5ldyBnb29nbGUuYXV0aC5PQXV0aDIocHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9JRCwgcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9TRUNSRVQsIGAke3Byb2Nlc3MuZW52LldFQl9IT1NUfS9nb29nbGUvdG9rZW5gKVxuXG4gIGNvbnN0IHF1ZXJ5ID0gcWIgPT4gcWIuaW5uZXJKb2luKCdtYWhhX3NvdXJjZXMnLCAnbWFoYV9zb3VyY2VzLmlkJywgJ21haGFfcHJvZmlsZXMuc291cmNlX2lkJylcblxuICBjb25zdCBwcm9maWxlID0gYXdhaXQgUHJvZmlsZS5xdWVyeShxdWVyeSkud2hlcmUoeyB0ZXh0OiAnZ29vZ2xlJywgdXNlcl9pZDogcmVxLnVzZXIuZ2V0KCdpZCcpfSkuZmV0Y2goeyB0cmFuc2FjdGluZzogdHJ4IH0pXG5cbiAgLy9UT0RPOiByZWZyZXNoIHRva2VuXG5cbiAgYXV0aC5zZXRDcmVkZW50aWFscyhwcm9maWxlLmdldCgnZGF0YScpKVxuXG4gIGNvbnN0IGNsaWVudCA9IGdvb2dsZS5kcml2ZSh7XG4gICAgdmVyc2lvbjogJ3YzJyxcbiAgICBhdXRoXG4gIH0pXG5cbiAgcmV0dXJuIGNsaWVudFxuXG59XG4iXX0=