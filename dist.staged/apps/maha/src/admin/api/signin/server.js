'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _server = require('../../../server');

var _passportSaml = require('passport-saml');

var _passportGoogleOauth = require('passport-google-oauth20');

var _passportLdapauth = require('passport-ldapauth');

var _passportLdapauth2 = _interopRequireDefault(_passportLdapauth);

var _session_serializer = require('../../../serializers/session_serializer');

var _session_serializer2 = _interopRequireDefault(_session_serializer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var team = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var state;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (req.query.state) {
              _context.next = 2;
              break;
            }

            throw new Error({ code: 500, message: 'unable to load state' });

          case 2:
            state = JSON.parse(Buffer.from(req.query.state, 'base64'));
            _context.next = 5;
            return _server.Team.where({ id: state.team_id }).fetch();

          case 5:
            req.team = _context.sent;


            next();

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function team(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var cornell = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
    var config, state;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getStrategyConfig(req.team.get('id'), 'cornell');

          case 2:
            config = _context2.sent;
            state = getState(req.team.get('id'));


            _passport2.default.use(new _passportSaml.Strategy((0, _extends3.default)({}, config, {
              path: '/signin/cornell?state=' + state,
              acceptedClockSkewMs: 300000
            }), function (profile, done) {
              loadUserByEmail(profile.email, done);
            }));

            _passport2.default.authenticate('saml', { session: false })(req, res, next);

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function cornell(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var google = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res, next) {
    var config, state;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getStrategyConfig(req.team.get('id'), 'google');

          case 2:
            config = _context3.sent;
            state = getState(req.team.get('id'));


            _passport2.default.use(new _passportGoogleOauth.Strategy((0, _extends3.default)({}, config, {
              authorizationurl: '/adminhttps://accounts.google.com/o/oauth2/v2/auth?state=' + state,
              callbackURL: 'http://localhost:8080/admin/signin/google'
            }), function (accessToken, refreshToken, profile, done) {
              loadUserByEmail(profile.emails[0].value, done);
            }));

            _passport2.default.authenticate('google', { scope: ['profile', 'email'], session: false })(req, res, next);

          case 6:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function google(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

var ldap = function ldap(req, res, next) {

  _passport2.default.use(new _passportLdapauth2.default({
    url: 'ldap://0.0.0.0:1389',
    base: 'o=example',
    search: {
      filter: '(&(l=Seattle)(email=*@foo.com))'
    }
  }, function (req, user, done) {
    loadUserByEmail(user.email, done);
  }));

  _passport2.default.authenticate('ldapauth', { session: false })(req, res, next);
};

var loadUserByEmail = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(email, done) {
    var user;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _server.User.where({ email: email }).fetch();

          case 2:
            user = _context4.sent;

            if (user) {
              _context4.next = 5;
              break;
            }

            return _context4.abrupt('return', done(null, false, { message: 'cannot find user' }));

          case 5:
            return _context4.abrupt('return', done(null, user));

          case 6:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function loadUserByEmail(_x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();

var getStrategyConfig = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(team_id, name) {
    var strategy;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _server.Strategy.where({ team_id: team_id, name: name }).fetch();

          case 2:
            strategy = _context5.sent;
            return _context5.abrupt('return', strategy.get('config'));

          case 4:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function getStrategyConfig(_x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}();

var getState = function getState(team_id) {
  return new Buffer(JSON.stringify({ team_id: team_id })).toString('base64');
};

var success = function success(strategy) {
  return function () {
    var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res, next) {
      var team, session;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _server.Team.where({ id: req.user.get('team_id') }).fetch({ withRelated: ['logo'] });

            case 2:
              team = _context6.sent;

              if (team) {
                _context6.next = 5;
                break;
              }

              return _context6.abrupt('return', next(new Error({ code: 500, message: 'unable to load team' })));

            case 5:
              _context6.next = 7;
              return (0, _session_serializer2.default)(req, null, req.user);

            case 7:
              session = _context6.sent;


              res.render('success', { strategy: strategy, session: session });

            case 9:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    }));

    return function (_x14, _x15, _x16) {
      return _ref6.apply(this, arguments);
    };
  }();
};

var server = (0, _express2.default)();

server.set('views', _path2.default.join(__dirname));

server.set('view engine', 'ejs');

server.get('/signin/cornell', team, cornell, success('cornell'));

server.post('/signin/cornell', team, cornell, success('cornell'));

server.get('/signin/google', team, google, success('google'));

server.get('/signin/ldap', team, ldap, success('ldap'));

exports.default = server;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsidGVhbSIsInJlcSIsInJlcyIsIm5leHQiLCJxdWVyeSIsInN0YXRlIiwiRXJyb3IiLCJjb2RlIiwibWVzc2FnZSIsIkpTT04iLCJwYXJzZSIsIkJ1ZmZlciIsImZyb20iLCJUZWFtIiwid2hlcmUiLCJpZCIsInRlYW1faWQiLCJmZXRjaCIsImNvcm5lbGwiLCJnZXRTdHJhdGVneUNvbmZpZyIsImdldCIsImNvbmZpZyIsImdldFN0YXRlIiwicGFzc3BvcnQiLCJ1c2UiLCJTQU1MU3RyYXRlZ3kiLCJwYXRoIiwiYWNjZXB0ZWRDbG9ja1NrZXdNcyIsInByb2ZpbGUiLCJkb25lIiwibG9hZFVzZXJCeUVtYWlsIiwiZW1haWwiLCJhdXRoZW50aWNhdGUiLCJzZXNzaW9uIiwiZ29vZ2xlIiwiR29vZ2xlU3RyYXRlZ3kiLCJhdXRob3JpemF0aW9udXJsIiwiY2FsbGJhY2tVUkwiLCJhY2Nlc3NUb2tlbiIsInJlZnJlc2hUb2tlbiIsImVtYWlscyIsInZhbHVlIiwic2NvcGUiLCJsZGFwIiwiTERBUFN0cmF0ZWd5IiwidXJsIiwiYmFzZSIsInNlYXJjaCIsImZpbHRlciIsInVzZXIiLCJVc2VyIiwibmFtZSIsIlN0cmF0ZWd5Iiwic3RyYXRlZ3kiLCJzdHJpbmdpZnkiLCJ0b1N0cmluZyIsInN1Y2Nlc3MiLCJ3aXRoUmVsYXRlZCIsInJlbmRlciIsInNlcnZlciIsInNldCIsImpvaW4iLCJfX2Rpcm5hbWUiLCJwb3N0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQTtBQUFBLHNGQUFPLGlCQUFPQyxHQUFQLEVBQVlDLEdBQVosRUFBaUJDLElBQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQUVQRixJQUFJRyxLQUFKLENBQVVDLEtBRkg7QUFBQTtBQUFBO0FBQUE7O0FBQUEs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MEIsS0FBMUI7O0FBRUFELE9BQU92QyxHQUFQLENBQVcsaUJBQVgsRUFBOEJwQixJQUE5QixFQUFvQ2tCLE9BQXBDLEVBQTZDc0MsUUFBUSxTQUFSLENBQTdDOztBQUVBRyxPQUFPSSxJQUFQLENBQVksaUJBQVosRUFBK0IvRCxJQUEvQixFQUFxQ2tCLE9BQXJDLEVBQThDc0MsUUFBUSxTQUFSLENBQTlDOztBQUVBRyxPQUFPdkMsR0FBUCxDQUFXLGdCQUFYLEVBQTZCcEIsSUFBN0IsRUFBbUNrQyxNQUFuQyxFQUEyQ3NCLFFBQVEsUUFBUixDQUEzQzs7QUFFQUcsT0FBT3ZDLEdBQVAsQ0FBVyxjQUFYLEVBQTJCcEIsSUFBM0IsRUFBaUMyQyxJQUFqQyxFQUF1Q2EsUUFBUSxNQUFSLENBQXZDOztrQkFFZUcsTSIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnXG5pbXBvcnQgcGFzc3BvcnQgZnJvbSAncGFzc3BvcnQnXG5pbXBvcnQgeyBTdHJhdGVneSwgVGVhbSwgVXNlcn0gZnJvbSAnLi4vLi4vLi4vc2VydmVyJ1xuaW1wb3J0IHsgU3RyYXRlZ3kgYXMgU0FNTFN0cmF0ZWd5IH0gZnJvbSAncGFzc3BvcnQtc2FtbCdcbmltcG9ydCB7IFN0cmF0ZWd5IGFzIEdvb2dsZVN0cmF0ZWd5IH0gZnJvbSAncGFzc3BvcnQtZ29vZ2xlLW9hdXRoMjAnXG5pbXBvcnQgTERBUFN0cmF0ZWd5IGZyb20gJ3Bhc3Nwb3J0LWxkYXBhdXRoJ1xuaW1wb3J0IHNlc3Npb25TZXJpbGl6ZXIgZnJvbSAnLi4vLi4vLi4vc2VyaWFsaXplcnMvc2Vzc2lvbl9zZXJpYWxpemVyJ1xuXG5jb25zdCB0ZWFtID0gYXN5bmMgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG5cbiAgaWYoIXJlcS5xdWVyeS5zdGF0ZSkgdGhyb3cgbmV3IEVycm9yKHsgY29kZTogNTAwLCBtZXNzYWdlOiAndW5hYmxlIHRvIGxvYWQgc3RhdGUnIH0pXG5cbiAgY29uc3Qgc3RhdGUgPSBKU09OLnBhcnNlKEJ1ZmZlci5mcm9tKHJlcS5xdWVyeS5zdGF0ZSwgJ2Jhc2U2NCcpKVxuXG4gIHJlcS50ZWFtID0gYXdhaXQgVGVhbS53aGVyZSh7IGlkOiBzdGF0ZS50ZWFtX2lkIH0pLmZldGNoKClcblxuICBuZXh0KClcblxufVxuXG5jb25zdCBjb3JuZWxsID0gYXN5bmMgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG5cbiAgY29uc3QgY29uZmlnID0gYXdhaXQgZ2V0U3RyYXRlZ3lDb25maWcocmVxLnRlYW0uZ2V0KCdpZCcpLCAnY29ybmVsbCcpXG5cbiAgY29uc3Qgc3RhdGUgPSBnZXRTdGF0ZShyZXEudGVhbS5nZXQoJ2lkJykpXG5cbiAgcGFzc3BvcnQudXNlKG5ldyBTQU1MU3RyYXRlZ3koe1xuICAgIC4uLmNvbmZpZyxcbiAgICBwYXRoOiBgL3NpZ25pbi9jb3JuZWxsP3N0YXRlPSR7c3RhdGV9YCxcbiAgICBhY2NlcHRlZENsb2NrU2tld01zOiAzMDAwMDBcbiAgfSwgKHByb2ZpbGUsIGRvbmUpID0+IHtcbiAgICBsb2FkVXNlckJ5RW1haWwocHJvZmlsZS5lbWFpbCwgZG9uZSlcbiAgfSkpXG5cbiAgcGFzc3BvcnQuYXV0aGVudGljYXRlKCdzYW1sJywgeyBzZXNzaW9uOiBmYWxzZSB9KShyZXEsIHJlcywgbmV4dClcblxufVxuXG5jb25zdCBnb29nbGUgPSBhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcblxuICBjb25zdCBjb25maWcgPSBhd2FpdCBnZXRTdHJhdGVneUNvbmZpZyhyZXEudGVhbS5nZXQoJ2lkJyksICdnb29nbGUnKVxuXG4gIGNvbnN0IHN0YXRlID0gZ2V0U3RhdGUocmVxLnRlYW0uZ2V0KCdpZCcpKVxuXG4gIHBhc3Nwb3J0LnVzZShuZXcgR29vZ2xlU3RyYXRlZ3koe1xuICAgIC4uLmNvbmZpZyxcbiAgICBhdXRob3JpemF0aW9udXJsOiBgL2FkbWluaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL28vb2F1dGgyL3YyL2F1dGg/c3RhdGU9JHtzdGF0ZX1gLFxuICAgIGNhbGxiYWNrVVJMOiAnaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FkbWluL3NpZ25pbi9nb29nbGUnXG4gIH0sIChhY2Nlc3NUb2tlbiwgcmVmcmVzaFRva2VuLCBwcm9maWxlLCBkb25lKSA9PiB7XG4gICAgbG9hZFVzZXJCeUVtYWlsKHByb2ZpbGUuZW1haWxzWzBdLnZhbHVlLCBkb25lKVxuICB9KSlcblxuICBwYXNzcG9ydC5hdXRoZW50aWNhdGUoJ2dvb2dsZScsIHsgc2NvcGU6IFsncHJvZmlsZScsJ2VtYWlsJ10sIHNlc3Npb246IGZhbHNlIH0pKHJlcSwgcmVzLCBuZXh0KVxuXG59XG5cbmNvbnN0IGxkYXAgPSAocmVxLCByZXMsIG5leHQpID0+IHtcblxuICBwYXNzcG9ydC51c2UobmV3IExEQVBTdHJhdGVneSh7XG4gICAgdXJsOiAnbGRhcDovLzAuMC4wLjA6MTM4OScsXG4gICAgYmFzZTogJ289ZXhhbXBsZScsXG4gICAgc2VhcmNoOiB7XG4gICAgICBmaWx0ZXI6ICcoJihsPVNlYXR0bGUpKGVtYWlsPSpAZm9vLmNvbSkpJ1xuICAgIH1cbiAgfSwgKHJlcSwgdXNlciwgZG9uZSkgPT4ge1xuICAgIGxvYWRVc2VyQnlFbWFpbCh1c2VyLmVtYWlsLCBkb25lKVxuICB9KSlcblxuICBwYXNzcG9ydC5hdXRoZW50aWNhdGUoJ2xkYXBhdXRoJywgeyBzZXNzaW9uOiBmYWxzZSB9KShyZXEsIHJlcywgbmV4dClcblxufVxuXG5jb25zdCBsb2FkVXNlckJ5RW1haWwgPSBhc3luYyAoZW1haWwsIGRvbmUpID0+IHtcblxuICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci53aGVyZSh7IGVtYWlsIH0pLmZldGNoKClcblxuICBpZighdXNlcikgcmV0dXJuIGRvbmUobnVsbCwgZmFsc2UsIHsgbWVzc2FnZTogJ2Nhbm5vdCBmaW5kIHVzZXInIH0pXG5cbiAgcmV0dXJuIGRvbmUobnVsbCwgdXNlcilcblxufVxuXG5jb25zdCBnZXRTdHJhdGVneUNvbmZpZyA9IGFzeW5jICh0ZWFtX2lkLCBuYW1lKSA9PiB7XG5cbiAgY29uc3Qgc3RyYXRlZ3kgPSBhd2FpdCBTdHJhdGVneS53aGVyZSh7IHRlYW1faWQsIG5hbWUgfSkuZmV0Y2goKVxuXG4gIHJldHVybiBzdHJhdGVneS5nZXQoJ2NvbmZpZycpXG5cbn1cblxuY29uc3QgZ2V0U3RhdGUgPSB0ZWFtX2lkID0+IG5ldyBCdWZmZXIoSlNPTi5zdHJpbmdpZnkoeyB0ZWFtX2lkIH0pKS50b1N0cmluZygnYmFzZTY0JylcblxuY29uc3Qgc3VjY2VzcyA9IHN0cmF0ZWd5ID0+IGFzeW5jIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuXG4gIGNvbnN0IHRlYW0gPSBhd2FpdCBUZWFtLndoZXJlKHsgaWQ6IHJlcS51c2VyLmdldCgndGVhbV9pZCcpIH0pLmZldGNoKHsgd2l0aFJlbGF0ZWQ6IFsnbG9nbyddIH0pXG5cbiAgaWYoIXRlYW0pIHJldHVybiBuZXh0KG5ldyBFcnJvcih7IGNvZGU6IDUwMCwgbWVzc2FnZTogJ3VuYWJsZSB0byBsb2FkIHRlYW0nIH0pKVxuXG4gIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBzZXNzaW9uU2VyaWxpemVyKHJlcSwgbnVsbCwgcmVxLnVzZXIpXG5cbiAgcmVzLnJlbmRlcignc3VjY2VzcycsIHsgc3RyYXRlZ3ksIHNlc3Npb24gfSlcblxufVxuXG5jb25zdCBzZXJ2ZXIgPSBleHByZXNzKClcblxuc2VydmVyLnNldCgndmlld3MnLCBwYXRoLmpvaW4oX19kaXJuYW1lKSlcblxuc2VydmVyLnNldCgndmlldyBlbmdpbmUnLCAnZWpzJylcblxuc2VydmVyLmdldCgnL3NpZ25pbi9jb3JuZWxsJywgdGVhbSwgY29ybmVsbCwgc3VjY2VzcygnY29ybmVsbCcpKVxuXG5zZXJ2ZXIucG9zdCgnL3NpZ25pbi9jb3JuZWxsJywgdGVhbSwgY29ybmVsbCwgc3VjY2VzcygnY29ybmVsbCcpKVxuXG5zZXJ2ZXIuZ2V0KCcvc2lnbmluL2dvb2dsZScsIHRlYW0sIGdvb2dsZSwgc3VjY2VzcygnZ29vZ2xlJykpXG5cbnNlcnZlci5nZXQoJy9zaWduaW4vbGRhcCcsIHRlYW0sIGxkYXAsIHN1Y2Nlc3MoJ2xkYXAnKSlcblxuZXhwb3J0IGRlZmF1bHQgc2VydmVyXG4iXX0=