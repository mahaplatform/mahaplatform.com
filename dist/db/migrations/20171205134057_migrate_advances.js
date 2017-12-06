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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MigrateAdvances = new _maha.Migration({

  up: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(knex) {
      var ids;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              ids = [1, 5, 7, 8];
              _context2.next = 3;
              return (0, _bluebird.map)(ids, function () {
                var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(id) {
                  var advance, check_id;
                  return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return knex('expenses_advances').where({ id: id });

                        case 2:
                          advance = _context.sent;
                          _context.next = 5;
                          return knex('expenses_checks').insert({
                            team_id: advance[0].team_id,
                            user_id: advance[0].user_id,
                            project_id: advance[0].project_id,
                            expense_type_id: advance[0].expense_type_id,
                            vendor_id: advance[0].vendor_id,
                            status_id: advance[0].status_id,
                            delivery_method: advance[0].delivery_method,
                            date_needed: advance[0].date_needed,
                            amount: advance[0].amount,
                            description: advance[0].description,
                            batch_id: advance[0].batch_id,
                            created_at: advance[0].created_at,
                            updated_at: advance[0].updated_at
                          }).returning('id');

                        case 5:
                          check_id = _context.sent;
                          _context.next = 8;
                          return knex('maha_listenings').where({ listenable_type: 'expenses_advances', listenable_id: id }).update({
                            listenable_type: 'expenses_checks',
                            listenable_id: check_id[0]
                          });

                        case 8:
                          _context.next = 10;
                          return knex('maha_comments').where({ commentable_type: 'expenses_advances', commentable_id: id }).update({
                            commentable_type: 'expenses_checks',
                            commentable_id: check_id[0]
                          });

                        case 10:
                          _context.next = 12;
                          return knex('maha_audits').where({ auditable_type: 'expenses_advances', auditable_id: id }).update({
                            auditable_type: 'expenses_checks',
                            auditable_id: check_id[0]
                          });

                        case 12:
                          _context.next = 14;
                          return knex('maha_activities').where({ object_table: 'expenses_advances', object_id: id }).update({
                            object_table: 'expenses_checks',
                            object_id: check_id[0]
                          });

                        case 14:
                          _context.next = 16;
                          return knex('expenses_advances').where({ id: id }).del();

                        case 16:
                          _context.next = 18;
                          return _context.sent;

                        case 18:
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

            case 3:
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

exports.default = MigrateAdvances;