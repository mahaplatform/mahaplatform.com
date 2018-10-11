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

var _boxNodeSdk = require('box-node-sdk');

var _boxNodeSdk2 = _interopRequireDefault(_boxNodeSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var box = new _boxNodeSdk2.default({
  clientID: process.env.BOX_CLIENT_ID,
  clientSecret: process.env.BOX_CLIENT_SECRET
});

var getClient = exports.getClient = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx) {
    var query, profile, expiration, data, client;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            query = function query(qb) {
              return qb.innerJoin('maha_sources', 'maha_sources.id', 'maha_profiles.source_id');
            };

            _context.next = 3;
            return _profile2.default.query(query).where({ text: 'box', user_id: req.user.get('id') }).fetch({ transacting: trx });

          case 3:
            profile = _context.sent;
            expiration = new Date(parseFloat(profile.get('data').acquiredAtMS + profile.get('data').accessTokenTTLMS - 300000));

            if (!(expiration <= new Date())) {
              _context.next = 11;
              break;
            }

            _context.next = 8;
            return box.getTokensRefreshGrant(profile.get('data').refreshToken);

          case 8:
            data = _context.sent;
            _context.next = 11;
            return profile.save({ data: data }, { patch: true, transacting: trx });

          case 11:
            client = box.getBasicClient(profile.get('data').accessToken);
            return _context.abrupt('return', client);

          case 13:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiYm94IiwiQm94IiwiY2xpZW50SUQiLCJwcm9jZXNzIiwiZW52IiwiQk9YX0NMSUVOVF9JRCIsImNsaWVudFNlY3JldCIsIkJPWF9DTElFTlRfU0VDUkVUIiwiZ2V0Q2xpZW50IiwicmVxIiwidHJ4IiwicXVlcnkiLCJxYiIsImlubmVySm9pbiIsIlByb2ZpbGUiLCJ3aGVyZSIsInRleHQiLCJ1c2VyX2lkIiwidXNlciIsImdldCIsImZldGNoIiwidHJhbnNhY3RpbmciLCJwcm9maWxlIiwiZXhwaXJhdGlvbiIsIkRhdGUiLCJwYXJzZUZsb2F0IiwiYWNxdWlyZWRBdE1TIiwiYWNjZXNzVG9rZW5UVExNUyIsImdldFRva2Vuc1JlZnJlc2hHcmFudCIsInJlZnJlc2hUb2tlbiIsImRhdGEiLCJzYXZlIiwicGF0Y2giLCJjbGllbnQiLCJnZXRCYXNpY0NsaWVudCIsImFjY2Vzc1Rva2VuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxNQUFNLElBQUlDLG9CQUFKLENBQVE7QUFDbEJDLFlBQVVDLFFBQVFDLEdBQVIsQ0FBWUMsYUFESjtBQUVsQkMsZ0JBQWNILFFBQVFDLEdBQVIsQ0FBWUc7QUFGUixDQUFSLENBQVo7O0FBS08sSUFBTUM7QUFBQSxzRkFBWSxpQkFBT0MsR0FBUCxFQUFZQyxHQUFaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVqQkMsaUJBRmlCLEdBRVQsU0FBUkEsS0FBUTtBQUFBLHFCQUFNQyxHQUFHQyxTQUFILENBQWEsY0FBYixFQUE2QixpQkFBN0IsRUFBZ0QseUJBQWhELENBQU47QUFBQSxhQUZTOztBQUFBO0FBQUEsbUJBSURDLGtCQUFRSCxLQUFSLENBQWNBLEtBQWQsRUFBcUJJLEtBQXJCLENBQTJCLEVBQUVDLE1BQU0sS0FBUixFQUFlQyxTQUFTUixJQUFJUyxJQUFKLENBQVNDLEdBQVQsQ0FBYSxJQUFiLENBQXhCLEVBQTNCLEVBQXdFQyxLQUF4RSxDQUE4RSxFQUFFQyxhQUFhWCxHQUFmLEVBQTlFLENBSkM7O0FBQUE7QUFJakJZLG1CQUppQjtBQU1qQkMsc0JBTmlCLEdBTUosSUFBSUMsSUFBSixDQUFTQyxXQUFXSCxRQUFRSCxHQUFSLENBQVksTUFBWixFQUFvQk8sWUFBcEIsR0FBbUNKLFFBQVFILEdBQVIsQ0FBWSxNQUFaLEVBQW9CUSxnQkFBdkQsR0FBMEUsTUFBckYsQ0FBVCxDQU5JOztBQUFBLGtCQVFwQkosY0FBYyxJQUFJQyxJQUFKLEVBUk07QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxtQkFVRnhCLElBQUk0QixxQkFBSixDQUEwQk4sUUFBUUgsR0FBUixDQUFZLE1BQVosRUFBb0JVLFlBQTlDLENBVkU7O0FBQUE7QUFVZkMsZ0JBVmU7QUFBQTtBQUFBLG1CQVlmUixRQUFRUyxJQUFSLENBQWEsRUFBRUQsVUFBRixFQUFiLEVBQXVCLEVBQUVFLE9BQU8sSUFBVCxFQUFlWCxhQUFhWCxHQUE1QixFQUF2QixDQVplOztBQUFBO0FBZ0JqQnVCLGtCQWhCaUIsR0FnQlJqQyxJQUFJa0MsY0FBSixDQUFtQlosUUFBUUgsR0FBUixDQUFZLE1BQVosRUFBb0JnQixXQUF2QyxDQWhCUTtBQUFBLDZDQWtCaEJGLE1BbEJnQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFaOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU4iLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9maWxlIGZyb20gJy4uLy4uLy4uLy4uL21vZGVscy9wcm9maWxlJ1xuaW1wb3J0IEJveCBmcm9tICdib3gtbm9kZS1zZGsnXG5cbmNvbnN0IGJveCA9IG5ldyBCb3goe1xuICBjbGllbnRJRDogcHJvY2Vzcy5lbnYuQk9YX0NMSUVOVF9JRCxcbiAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5CT1hfQ0xJRU5UX1NFQ1JFVFxufSlcblxuZXhwb3J0IGNvbnN0IGdldENsaWVudCA9IGFzeW5jIChyZXEsIHRyeCkgPT4ge1xuXG4gIGNvbnN0IHF1ZXJ5ID0gcWIgPT4gcWIuaW5uZXJKb2luKCdtYWhhX3NvdXJjZXMnLCAnbWFoYV9zb3VyY2VzLmlkJywgJ21haGFfcHJvZmlsZXMuc291cmNlX2lkJylcblxuICBjb25zdCBwcm9maWxlID0gYXdhaXQgUHJvZmlsZS5xdWVyeShxdWVyeSkud2hlcmUoeyB0ZXh0OiAnYm94JywgdXNlcl9pZDogcmVxLnVzZXIuZ2V0KCdpZCcpfSkuZmV0Y2goeyB0cmFuc2FjdGluZzogdHJ4IH0pXG5cbiAgY29uc3QgZXhwaXJhdGlvbiA9IG5ldyBEYXRlKHBhcnNlRmxvYXQocHJvZmlsZS5nZXQoJ2RhdGEnKS5hY3F1aXJlZEF0TVMgKyBwcm9maWxlLmdldCgnZGF0YScpLmFjY2Vzc1Rva2VuVFRMTVMgLSAzMDAwMDApKVxuXG4gIGlmKGV4cGlyYXRpb24gPD0gbmV3IERhdGUoKSkge1xuXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IGJveC5nZXRUb2tlbnNSZWZyZXNoR3JhbnQocHJvZmlsZS5nZXQoJ2RhdGEnKS5yZWZyZXNoVG9rZW4pXG5cbiAgICBhd2FpdCBwcm9maWxlLnNhdmUoeyBkYXRhIH0sIHsgcGF0Y2g6IHRydWUsIHRyYW5zYWN0aW5nOiB0cnggfSlcblxuICB9XG5cbiAgY29uc3QgY2xpZW50ID0gYm94LmdldEJhc2ljQ2xpZW50KHByb2ZpbGUuZ2V0KCdkYXRhJykuYWNjZXNzVG9rZW4pXG5cbiAgcmV0dXJuIGNsaWVudFxuXG59XG4iXX0=