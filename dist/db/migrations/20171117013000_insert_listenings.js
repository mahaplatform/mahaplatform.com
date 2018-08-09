'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _bluebird = require('bluebird');

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _maha = require('maha');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var InsertListenings = new _maha.Migration({

  up: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(knex) {
      var tables;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              tables = ['expenses_advances', 'expenses_expenses', 'expenses_trips'];
              _context3.next = 3;
              return (0, _bluebird.mapSeries)(tables, function () {
                var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(table) {
                  var items;
                  return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return knex(table);

                        case 2:
                          items = _context2.sent;
                          _context2.next = 5;
                          return (0, _bluebird.mapSeries)(items, function () {
                            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(item) {
                              var project_id, approvers, subscriber_ids, listenings;
                              return _regenerator2.default.wrap(function _callee$(_context) {
                                while (1) {
                                  switch (_context.prev = _context.next) {
                                    case 0:
                                      project_id = item.project_id;
                                      _context.next = 3;
                                      return knex('expenses_members').where({ project_id: project_id }).whereIn('member_type_id', [1, 2]);

                                    case 3:
                                      approvers = _context.sent;
                                      subscriber_ids = [item.user_id].concat((0, _toConsumableArray3.default)(approvers.map(function (approver) {
                                        return approver.user_id;
                                      })));
                                      listenings = subscriber_ids.map(function (user_id) {
                                        return {
                                          team_id: 1,
                                          user_id: user_id,
                                          listenable_type: table,
                                          listenable_id: item.id
                                        };
                                      });
                                      _context.next = 8;
                                      return knex('maha_listenings').insert(listenings);

                                    case 8:
                                    case 'end':
                                      return _context.stop();
                                  }
                                }
                              }, _callee, undefined);
                            }));

                            return function (_x3) {
                              return _ref3.apply(this, arguments);
                            };
                          }());

                        case 5:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _callee2, undefined);
                }));

                return function (_x2) {
                  return _ref2.apply(this, arguments);
                };
              }());

            case 3:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function up(_x) {
      return _ref.apply(this, arguments);
    };
  }(),

  down: function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(knex) {
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function down(_x4) {
      return _ref4.apply(this, arguments);
    };
  }()

});

var _default = InsertListenings;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(InsertListenings, 'InsertListenings', 'src/db/migrations/20171117013000_insert_listenings.js');
  reactHotLoader.register(_default, 'default', 'src/db/migrations/20171117013000_insert_listenings.js');
  leaveModule(module);
})();

;