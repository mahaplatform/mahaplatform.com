'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = require('bluebird');

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

var AdjustFolders = new _maha.Migration({

  up: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(knex) {
      var everyone, folders;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return knex('maha_groups').update({ is_everyone: false });

            case 2:
              _context2.next = 4;
              return _maha.Group.forge({
                team_id: 1,
                title: 'Everyone',
                is_everyone: true
              }).save();

            case 4:
              everyone = _context2.sent;
              _context2.next = 7;
              return knex('drive_access').whereIn('id', [3, 4, 5, 6]).del();

            case 7:
              _context2.next = 9;
              return knex('drive_folders');

            case 9:
              folders = _context2.sent;
              _context2.next = 12;
              return (0, _bluebird.mapSeries)(folders, function () {
                var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(folder) {
                  var approvers;
                  return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return knex('drive_access').insert({
                            team_id: 1,
                            folder_id: folder.id,
                            group_id: 10,
                            access_type_id: 2,
                            created_at: (0, _moment2.default)(),
                            updated_at: (0, _moment2.default)()
                          });

                        case 2:
                          approvers = _context.sent;

                        case 3:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, undefined);
                }));

                return function (_x2) {
                  return _ref2.apply(this, arguments);
                };
              }());

            case 12:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function up(_x) {
      return _ref.apply(this, arguments);
    };
  }(),

  down: function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(knex) {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function down(_x3) {
      return _ref3.apply(this, arguments);
    };
  }()

});

var _default = AdjustFolders;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(AdjustFolders, 'AdjustFolders', 'src/db/migrations/20180105033357_adjust_folders.js');
  reactHotLoader.register(_default, 'default', 'src/db/migrations/20180105033357_adjust_folders.js');
  leaveModule(module);
})();

;