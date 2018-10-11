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

var _instagramNode = require('instagram-node');

var _instagramNode2 = _interopRequireDefault(_instagramNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var client = new _instagramNode2.default.instagram();

client.use({
  client_id: process.env.INSTAGRAM_CLIENT_ID,
  client_secret: process.env.INSTAGRAM_CLIENT_SECRET
});

var getClient = exports.getClient = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx) {
    var query, profile;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            query = function query(qb) {
              return qb.innerJoin('maha_sources', 'maha_sources.id', 'maha_profiles.source_id');
            };

            _context.next = 3;
            return _profile2.default.query(query).where({ text: 'instagram', user_id: req.user.get('id') }).fetch({ transacting: trx });

          case 3:
            profile = _context.sent;


            client.use({ access_token: profile.get('data').access_token });

            //TODO: refresh token

            return _context.abrupt('return', client);

          case 6:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiY2xpZW50IiwiSW5zdGFncmFtIiwiaW5zdGFncmFtIiwidXNlIiwiY2xpZW50X2lkIiwicHJvY2VzcyIsImVudiIsIklOU1RBR1JBTV9DTElFTlRfSUQiLCJjbGllbnRfc2VjcmV0IiwiSU5TVEFHUkFNX0NMSUVOVF9TRUNSRVQiLCJnZXRDbGllbnQiLCJyZXEiLCJ0cngiLCJxdWVyeSIsInFiIiwiaW5uZXJKb2luIiwiUHJvZmlsZSIsIndoZXJlIiwidGV4dCIsInVzZXJfaWQiLCJ1c2VyIiwiZ2V0IiwiZmV0Y2giLCJ0cmFuc2FjdGluZyIsInByb2ZpbGUiLCJhY2Nlc3NfdG9rZW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLFNBQVMsSUFBSUMsd0JBQVVDLFNBQWQsRUFBZjs7QUFFQUYsT0FBT0csR0FBUCxDQUFXO0FBQ1RDLGFBQVdDLFFBQVFDLEdBQVIsQ0FBWUMsbUJBRGQ7QUFFVEMsaUJBQWVILFFBQVFDLEdBQVIsQ0FBWUc7QUFGbEIsQ0FBWDs7QUFLTyxJQUFNQztBQUFBLHNGQUFZLGlCQUFPQyxHQUFQLEVBQVlDLEdBQVo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRWpCQyxpQkFGaUIsR0FFVCxTQUFSQSxLQUFRO0FBQUEscUJBQU1DLEdBQUdDLFNBQUgsQ0FBYSxjQUFiLEVBQTZCLGlCQUE3QixFQUFnRCx5QkFBaEQsQ0FBTjtBQUFBLGFBRlM7O0FBQUE7QUFBQSxtQkFJREMsa0JBQVFILEtBQVIsQ0FBY0EsS0FBZCxFQUFxQkksS0FBckIsQ0FBMkIsRUFBRUMsTUFBTSxXQUFSLEVBQXFCQyxTQUFTUixJQUFJUyxJQUFKLENBQVNDLEdBQVQsQ0FBYSxJQUFiLENBQTlCLEVBQTNCLEVBQThFQyxLQUE5RSxDQUFvRixFQUFFQyxhQUFhWCxHQUFmLEVBQXBGLENBSkM7O0FBQUE7QUFJakJZLG1CQUppQjs7O0FBTXZCeEIsbUJBQU9HLEdBQVAsQ0FBVyxFQUFFc0IsY0FBY0QsUUFBUUgsR0FBUixDQUFZLE1BQVosRUFBb0JJLFlBQXBDLEVBQVg7O0FBRUE7O0FBUnVCLDZDQVVoQnpCLE1BVmdCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTiIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb2ZpbGUgZnJvbSAnLi4vLi4vLi4vLi4vbW9kZWxzL3Byb2ZpbGUnXG5pbXBvcnQgSW5zdGFncmFtIGZyb20gJ2luc3RhZ3JhbS1ub2RlJ1xuXG5jb25zdCBjbGllbnQgPSBuZXcgSW5zdGFncmFtLmluc3RhZ3JhbSgpXG5cbmNsaWVudC51c2Uoe1xuICBjbGllbnRfaWQ6IHByb2Nlc3MuZW52LklOU1RBR1JBTV9DTElFTlRfSUQsXG4gIGNsaWVudF9zZWNyZXQ6IHByb2Nlc3MuZW52LklOU1RBR1JBTV9DTElFTlRfU0VDUkVUXG59KVxuXG5leHBvcnQgY29uc3QgZ2V0Q2xpZW50ID0gYXN5bmMgKHJlcSwgdHJ4KSA9PiB7XG5cbiAgY29uc3QgcXVlcnkgPSBxYiA9PiBxYi5pbm5lckpvaW4oJ21haGFfc291cmNlcycsICdtYWhhX3NvdXJjZXMuaWQnLCAnbWFoYV9wcm9maWxlcy5zb3VyY2VfaWQnKVxuXG4gIGNvbnN0IHByb2ZpbGUgPSBhd2FpdCBQcm9maWxlLnF1ZXJ5KHF1ZXJ5KS53aGVyZSh7IHRleHQ6ICdpbnN0YWdyYW0nLCB1c2VyX2lkOiByZXEudXNlci5nZXQoJ2lkJyl9KS5mZXRjaCh7IHRyYW5zYWN0aW5nOiB0cnggfSlcblxuICBjbGllbnQudXNlKHsgYWNjZXNzX3Rva2VuOiBwcm9maWxlLmdldCgnZGF0YScpLmFjY2Vzc190b2tlbiB9KVxuXG4gIC8vVE9ETzogcmVmcmVzaCB0b2tlblxuXG4gIHJldHVybiBjbGllbnRcblxufVxuIl19