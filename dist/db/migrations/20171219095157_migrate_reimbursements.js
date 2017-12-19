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

var MigrateReimbursements = new _maha.Migration({

  up: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(knex) {
      var expenses;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return knex('expenses_expenses').whereNull('account_id');

            case 2:
              expenses = _context2.sent;
              _context2.next = 5;
              return (0, _bluebird.map)(expenses, function () {
                var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(expense) {
                  var id, reimbursement_id;
                  return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          id = expense.id;
                          _context.next = 3;
                          return knex('expenses_reimbursements').insert({
                            team_id: expense.team_id,
                            user_id: expense.user_id,
                            project_id: expense.project_id,
                            expense_type_id: expense.expense_type_id,
                            vendor_id: expense.vendor_id,
                            status_id: expense.status_id,
                            date: expense.date,
                            amount: expense.amount,
                            description: expense.description,
                            batch_id: expense.batch_id,
                            created_at: expense.created_at,
                            updated_at: expense.updated_at
                          }).returning('id');

                        case 3:
                          reimbursement_id = _context.sent;
                          _context.next = 6;
                          return knex('expenses_receipts').where({ expense_id: id }).update({
                            expense_id: null,
                            reimbursement_id: reimbursement_id[0]
                          });

                        case 6:
                          _context.next = 8;
                          return knex('maha_listenings').where({ listenable_type: 'expenses_advances', listenable_id: id }).update({
                            listenable_type: 'expenses_reimbursements',
                            listenable_id: reimbursement_id[0]
                          });

                        case 8:
                          _context.next = 10;
                          return knex('maha_comments').where({ commentable_type: 'expenses_expenses', commentable_id: id }).update({
                            commentable_type: 'expenses_reimbursements',
                            commentable_id: reimbursement_id[0]
                          });

                        case 10:
                          _context.next = 12;
                          return knex('maha_audits').where({ auditable_type: 'expenses_expenses', auditable_id: id }).update({
                            auditable_type: 'expenses_reimbursements',
                            auditable_id: reimbursement_id[0]
                          });

                        case 12:
                          _context.next = 14;
                          return knex('maha_activities').where({ object_table: 'expenses_expenses', object_id: id }).update({
                            object_table: 'expenses_reimbursements',
                            object_id: reimbursement_id[0]
                          });

                        case 14:
                          _context.next = 16;
                          return knex('expenses_expenses').where({ id: id }).del();

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

            case 5:
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

exports.default = MigrateReimbursements;