'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _maha = require('maha');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var InstallTeamApps = new _maha.Migration({

  up: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(knex) {
      var maha, team_id, user, user_id, role, teams;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _maha.Team.forge({
                title: 'MAHA Platform',
                subdomain: 'maha',
                color: 'red'
              }).save(null);

            case 2:
              maha = _context.sent;
              team_id = maha.get('id');
              _context.next = 6;
              return _maha.User.forge({
                team_id: team_id,
                first_name: 'Greg',
                last_name: 'Kops',
                email: 'greg@thinktopography.com',
                password: 'mahaplatform',
                is_active: true,
                activated_at: (0, _moment2.default)(),
                values: {}
              }).save(null);

            case 6:
              user = _context.sent;
              user_id = user.get('id');
              _context.next = 10;
              return knex('maha_strategies').insert({
                team_id: team_id,
                name: 'local',
                created_at: (0, _moment2.default)(),
                updated_at: (0, _moment2.default)()
              });

            case 10:
              _context.next = 12;
              return knex('maha_installations').insert([{
                team_id: team_id,
                app_id: 1,
                settings: {},
                created_at: (0, _moment2.default)(),
                updated_at: (0, _moment2.default)()
              }, {
                team_id: team_id,
                app_id: 9,
                settings: {},
                created_at: (0, _moment2.default)(),
                updated_at: (0, _moment2.default)()
              }]);

            case 12:
              _context.next = 14;
              return knex('maha_roles').insert({
                team_id: 1,
                title: 'Team Administrators',
                description: 'Team Administrators',
                created_at: (0, _moment2.default)(),
                updated_at: (0, _moment2.default)()
              }).returning('id');

            case 14:
              role = _context.sent;
              _context.next = 17;
              return knex('maha_roles_apps').insert([{
                role_id: role[0],
                app_id: 1
              }, {
                role_id: role[0],
                app_id: 9
              }]);

            case 17:
              _context.next = 19;
              return knex('maha_roles_rights').insert([{
                role_id: role[0],
                right_id: 1
              }, {
                role_id: role[0],
                right_id: 2
              }, {
                role_id: role[0],
                right_id: 3
              }]);

            case 19:
              _context.next = 21;
              return knex('maha_users_roles').insert({
                role_id: role[0],
                user_id: user_id
              });

            case 21:
              teams = [{ id: 1, app_ids: [1, 2, 3, 5, 6, 7, 8] }, { id: 7, app_ids: [1, 4] }, { id: team_id, app_ids: [1, 9] }];
              _context.next = 24;
              return knex('maha_teams_apps').insert(teams.reduce(function (apps, team) {
                return [].concat((0, _toConsumableArray3.default)(apps), (0, _toConsumableArray3.default)(team.app_ids.map(function (app_id) {
                  return {
                    team_id: team.id,
                    app_id: app_id
                  };
                })));
              }, []));

            case 24:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function up(_x) {
      return _ref.apply(this, arguments);
    };
  }(),

  down: function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(knex) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function down(_x2) {
      return _ref2.apply(this, arguments);
    };
  }()

});

var _default = InstallTeamApps;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(InstallTeamApps, 'InstallTeamApps', 'src/db/migrations/20180204175200_install_team_apps.js');
  reactHotLoader.register(_default, 'default', 'src/db/migrations/20180204175200_install_team_apps.js');
  leaveModule(module);
})();

;