'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _maha = require('maha');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bar = (0, _maha.cron)({

  name: 'bar',

  schedule: "* * * * *",

  processor: function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(trx) {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _maha.User.query(function (qb) {
                return qb.select('id AS bar');
              }).where({ id: 1 }).fetch({ transacting: trx });

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function processor(_x) {
      return _ref.apply(this, arguments);
    };
  }()

});

exports.default = Bar;