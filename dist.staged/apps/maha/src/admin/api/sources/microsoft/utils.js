'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getClient = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _microsoftGraphClient = require('@microsoft/microsoft-graph-client');

var _profile = require('../../../../models/profile');

var _profile2 = _interopRequireDefault(_profile);

var _simpleOauth = require('simple-oauth2');

var _simpleOauth2 = _interopRequireDefault(_simpleOauth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getOauth2 = function getOauth2() {
  return _simpleOauth2.default.create({
    client: {
      id: process.env.MICROSOFT_APP_ID,
      secret: process.env.MICROSOFT_APP_SECRET
    },
    auth: {
      tokenHost: 'https://login.microsoftonline.com',
      authorizePath: 'common/oauth2/v2.0/authorize',
      tokenPath: 'common/oauth2/v2.0/token'
    }
  });
};

var getClient = exports.getClient = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx) {
    var query, profile, expiration, oauth2, data, client;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            query = function query(qb) {
              return qb.innerJoin('maha_sources', 'maha_sources.id', 'maha_profiles.source_id');
            };

            _context.next = 3;
            return _profile2.default.query(query).where({ text: 'microsoft', user_id: req.user.get('id') }).fetch({ transacting: trx });

          case 3:
            profile = _context.sent;
            expiration = new Date(parseFloat(new Date(profile.get('data').expires_at).getTime() - 300000));

            if (!(expiration <= new Date())) {
              _context.next = 12;
              break;
            }

            oauth2 = getOauth2();
            _context.next = 9;
            return oauth2.accessToken.create({ refresh_token: profile.get('data').refresh_token }).refresh();

          case 9:
            data = _context.sent;
            _context.next = 12;
            return profile.save({ data: data.token }, { patch: true, transacting: trx });

          case 12:
            client = _microsoftGraphClient.Client.init({
              authProvider: function authProvider(done) {
                return done(null, profile.get('data').access_token);
              }
            });
            return _context.abrupt('return', client);

          case 14:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiZ2V0T2F1dGgyIiwiT0F1dGgyIiwiY3JlYXRlIiwiY2xpZW50IiwiaWQiLCJwcm9jZXNzIiwiZW52IiwiTUlDUk9TT0ZUX0FQUF9JRCIsInNlY3JldCIsIk1JQ1JPU09GVF9BUFBfU0VDUkVUIiwiYXV0aCIsInRva2VuSG9zdCIsImF1dGhvcml6ZVBhdGgiLCJ0b2tlblBhdGgiLCJnZXRDbGllbnQiLCJyZXEiLCJ0cngiLCJxdWVyeSIsInFiIiwiaW5uZXJKb2luIiwiUHJvZmlsZSIsIndoZXJlIiwidGV4dCIsInVzZXJfaWQiLCJ1c2VyIiwiZ2V0IiwiZmV0Y2giLCJ0cmFuc2FjdGluZyIsInByb2ZpbGUiLCJleHBpcmF0aW9uIiwiRGF0ZSIsInBhcnNlRmxvYXQiLCJleHBpcmVzX2F0IiwiZ2V0VGltZSIsIm9hdXRoMiIsImFjY2Vzc1Rva2VuIiwicmVmcmVzaF90b2tlbiIsInJlZnJlc2giLCJkYXRhIiwic2F2ZSIsInRva2VuIiwicGF0Y2giLCJDbGllbnQiLCJpbml0IiwiYXV0aFByb3ZpZGVyIiwiZG9uZSIsImFjY2Vzc190b2tlbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsWUFBWSxTQUFaQSxTQUFZO0FBQUEsU0FBTUMsc0JBQU9DLE1BQVAsQ0FBYztBQUNwQ0MsWUFBUTtBQUNOQyxVQUFJQyxRQUFRQyxHQUFSLENBQVlDLGdCQURWO0FBRU5DLGNBQVFILFFBQVFDLEdBQVIsQ0FBWUc7QUFGZCxLQUQ0QjtBQUtwQ0MsVUFBTTtBQUNKQyxpQkFBVyxtQ0FEUDtBQUVKQyxxQkFBZSw4QkFGWDtBQUdKQyxpQkFBVztBQUhQO0FBTDhCLEdBQWQsQ0FBTjtBQUFBLENBQWxCOztBQVlPLElBQU1DO0FBQUEsc0ZBQVksaUJBQU9DLEdBQVAsRUFBWUMsR0FBWjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFakJDLGlCQUZpQixHQUVULFNBQVJBLEtBQVE7QUFBQSxxQkFBTUMsR0FBR0MsU0FBSCxDQUFhLGNBQWIsRUFBNkIsaUJBQTdCLEVBQWdELHlCQUFoRCxDQUFOO0FBQUEsYUFGUzs7QUFBQTtBQUFBLG1CQUlEQyxrQkFBUUgsS0FBUixDQUFjQSxLQUFkLEVBQXFCSSxLQUFyQixDQUEyQixFQUFFQyxNQUFNLFdBQVIsRUFBcUJDLFNBQVNSLElBQUlTLElBQUosQ0FBU0MsR0FBVCxDQUFhLElBQWIsQ0FBOUIsRUFBM0IsRUFBOEVDLEtBQTlFLENBQW9GLEVBQUVDLGFBQWFYLEdBQWYsRUFBcEYsQ0FKQzs7QUFBQTtBQUlqQlksbUJBSmlCO0FBTWpCQyxzQkFOaUIsR0FNSixJQUFJQyxJQUFKLENBQVNDLFdBQVcsSUFBSUQsSUFBSixDQUFTRixRQUFRSCxHQUFSLENBQVksTUFBWixFQUFvQk8sVUFBN0IsRUFBeUNDLE9BQXpDLEtBQXFELE1BQWhFLENBQVQsQ0FOSTs7QUFBQSxrQkFRcEJKLGNBQWMsSUFBSUMsSUFBSixFQVJNO0FBQUE7QUFBQTtBQUFBOztBQVVmSSxrQkFWZSxHQVVObEMsV0FWTTtBQUFBO0FBQUEsbUJBWUZrQyxPQUFPQyxXQUFQLENBQW1CakMsTUFBbkIsQ0FBMEIsRUFBRWtDLGVBQWVSLFFBQVFILEdBQVIsQ0FBWSxNQUFaLEVBQW9CVyxhQUFyQyxFQUExQixFQUFnRkMsT0FBaEYsRUFaRTs7QUFBQTtBQVlmQyxnQkFaZTtBQUFBO0FBQUEsbUJBY2ZWLFFBQVFXLElBQVIsQ0FBYSxFQUFFRCxNQUFNQSxLQUFLRSxLQUFiLEVBQWIsRUFBbUMsRUFBRUMsT0FBTyxJQUFULEVBQWVkLGFBQWFYLEdBQTVCLEVBQW5DLENBZGU7O0FBQUE7QUFrQmpCYixrQkFsQmlCLEdBa0JSdUMsNkJBQU9DLElBQVAsQ0FBWTtBQUN6QkMsNEJBQWMsc0JBQUNDLElBQUQ7QUFBQSx1QkFBVUEsS0FBSyxJQUFMLEVBQVdqQixRQUFRSCxHQUFSLENBQVksTUFBWixFQUFvQnFCLFlBQS9CLENBQVY7QUFBQTtBQURXLGFBQVosQ0FsQlE7QUFBQSw2Q0FzQmhCM0MsTUF0QmdCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTiIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSAnQG1pY3Jvc29mdC9taWNyb3NvZnQtZ3JhcGgtY2xpZW50J1xuaW1wb3J0IFByb2ZpbGUgZnJvbSAnLi4vLi4vLi4vLi4vbW9kZWxzL3Byb2ZpbGUnXG5pbXBvcnQgT0F1dGgyIGZyb20gJ3NpbXBsZS1vYXV0aDInXG5cbmNvbnN0IGdldE9hdXRoMiA9ICgpID0+IE9BdXRoMi5jcmVhdGUoe1xuICBjbGllbnQ6IHtcbiAgICBpZDogcHJvY2Vzcy5lbnYuTUlDUk9TT0ZUX0FQUF9JRCxcbiAgICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk1JQ1JPU09GVF9BUFBfU0VDUkVUXG4gIH0sXG4gIGF1dGg6IHtcbiAgICB0b2tlbkhvc3Q6ICdodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20nLFxuICAgIGF1dGhvcml6ZVBhdGg6ICdjb21tb24vb2F1dGgyL3YyLjAvYXV0aG9yaXplJyxcbiAgICB0b2tlblBhdGg6ICdjb21tb24vb2F1dGgyL3YyLjAvdG9rZW4nXG4gIH1cbn0pXG5cbmV4cG9ydCBjb25zdCBnZXRDbGllbnQgPSBhc3luYyAocmVxLCB0cngpID0+IHtcblxuICBjb25zdCBxdWVyeSA9IHFiID0+IHFiLmlubmVySm9pbignbWFoYV9zb3VyY2VzJywgJ21haGFfc291cmNlcy5pZCcsICdtYWhhX3Byb2ZpbGVzLnNvdXJjZV9pZCcpXG5cbiAgY29uc3QgcHJvZmlsZSA9IGF3YWl0IFByb2ZpbGUucXVlcnkocXVlcnkpLndoZXJlKHsgdGV4dDogJ21pY3Jvc29mdCcsIHVzZXJfaWQ6IHJlcS51c2VyLmdldCgnaWQnKX0pLmZldGNoKHsgdHJhbnNhY3Rpbmc6IHRyeCB9KVxuXG4gIGNvbnN0IGV4cGlyYXRpb24gPSBuZXcgRGF0ZShwYXJzZUZsb2F0KG5ldyBEYXRlKHByb2ZpbGUuZ2V0KCdkYXRhJykuZXhwaXJlc19hdCkuZ2V0VGltZSgpIC0gMzAwMDAwKSlcblxuICBpZihleHBpcmF0aW9uIDw9IG5ldyBEYXRlKCkpIHtcblxuICAgIGNvbnN0IG9hdXRoMiA9IGdldE9hdXRoMigpXG5cbiAgICBjb25zdCBkYXRhID0gYXdhaXQgb2F1dGgyLmFjY2Vzc1Rva2VuLmNyZWF0ZSh7IHJlZnJlc2hfdG9rZW46IHByb2ZpbGUuZ2V0KCdkYXRhJykucmVmcmVzaF90b2tlbiB9KS5yZWZyZXNoKClcblxuICAgIGF3YWl0IHByb2ZpbGUuc2F2ZSh7IGRhdGE6IGRhdGEudG9rZW4gfSwgeyBwYXRjaDogdHJ1ZSwgdHJhbnNhY3Rpbmc6IHRyeCB9KVxuXG4gIH1cblxuICBjb25zdCBjbGllbnQgPSBDbGllbnQuaW5pdCh7XG4gICAgYXV0aFByb3ZpZGVyOiAoZG9uZSkgPT4gZG9uZShudWxsLCBwcm9maWxlLmdldCgnZGF0YScpLmFjY2Vzc190b2tlbilcbiAgfSlcblxuICByZXR1cm4gY2xpZW50XG5cbn1cbiJdfQ==