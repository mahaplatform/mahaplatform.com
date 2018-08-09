'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

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

var InstallTasks = new _maha.Migration({

  up: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(knex) {
      var app, role;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return knex('maha_apps').insert({
                title: 'Tasks',
                app_category_id: 1,
                app_author_id: 1,
                description: 'Organization Task Management',
                version: '1.0.0',
                color: 'pink',
                icon: 'check',
                created_at: (0, _moment2.default)(),
                updated_at: (0, _moment2.default)()
              }).returning('id');

            case 2:
              app = _context.sent;
              _context.next = 5;
              return knex('maha_installations').insert({
                team_id: 1,
                app_id: app[0],
                settings: {},
                created_at: (0, _moment2.default)(),
                updated_at: (0, _moment2.default)()
              });

            case 5:
              _context.next = 7;
              return knex('maha_roles').insert({
                team_id: 1,
                title: 'Task Beta Testers',
                description: 'Task Beta Testers',
                created_at: (0, _moment2.default)(),
                updated_at: (0, _moment2.default)()
              }).returning('id');

            case 7:
              role = _context.sent;
              _context.next = 10;
              return knex('maha_roles_apps').insert({
                role_id: role[0],
                app_id: app[0]
              });

            case 10:
              _context.next = 12;
              return knex('maha_users_roles').insert({
                role_id: role[0],
                user_id: 79
              });

            case 12:
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

var _default = InstallTasks;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(InstallTasks, 'InstallTasks', 'src/db/migrations/20180118103000_install_tasks.js');
  reactHotLoader.register(_default, 'default', 'src/db/migrations/20180118103000_install_tasks.js');
  leaveModule(module);
})();

;