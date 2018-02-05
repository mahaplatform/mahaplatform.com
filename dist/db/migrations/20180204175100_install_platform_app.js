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

var InstallPlatformApp = new _maha.Migration({

  up: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(knex) {
      var app, role;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return knex('maha_roles').whereIn('id', [1, 16]).update({ title: 'Team Administrators' });

            case 2:
              _context.next = 4;
              return _context.sent;

            case 4:
              _context.next = 6;
              return knex('maha_apps').insert({
                title: 'Platform',
                app_category_id: 1,
                app_author_id: 1,
                description: 'Platform Management',
                version: '1.0.0',
                color: 'yellow',
                icon: 'cog',
                created_at: (0, _moment2.default)(),
                updated_at: (0, _moment2.default)()
              }).returning('id');

            case 6:
              app = _context.sent;
              _context.next = 9;
              return knex('maha_installations').insert({
                team_id: 1,
                app_id: app[0],
                settings: {},
                created_at: (0, _moment2.default)(),
                updated_at: (0, _moment2.default)()
              });

            case 9:
              _context.next = 11;
              return knex('maha_roles').insert({
                team_id: 1,
                title: 'Platform Administrators',
                description: 'Platform Administrators',
                created_at: (0, _moment2.default)(),
                updated_at: (0, _moment2.default)()
              }).returning('id');

            case 11:
              role = _context.sent;
              _context.next = 14;
              return knex('maha_roles_apps').insert({
                role_id: role[0],
                app_id: app[0]
              });

            case 14:
              _context.next = 16;
              return knex('maha_users_roles').insert({
                role_id: role[0],
                user_id: 79
              });

            case 16:
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

exports.default = InstallPlatformApp;