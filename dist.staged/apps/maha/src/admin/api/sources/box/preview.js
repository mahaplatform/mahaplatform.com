'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../../server');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var preview = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _server.knex.transaction(function () {
              var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(trx) {
                var client, result;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _server.User.where({ id: 79 }).fetch({ transacting: trx });

                      case 2:
                        req.user = _context.sent;
                        _context.next = 5;
                        return (0, _utils.getClient)(req, trx);

                      case 5:
                        client = _context.sent;
                        _context.next = 8;
                        return client.files.getThumbnail(req.query.path, {
                          min_width: 160,
                          min_height: 160
                        });

                      case 8:
                        result = _context.sent;


                        res.status(200).type('image/jpeg').end(result.file, 'binary');

                      case 10:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x4) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 2:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function preview(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = preview;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJldmlldyIsInJlcSIsInJlcyIsIm5leHQiLCJrbmV4IiwidHJhbnNhY3Rpb24iLCJ0cngiLCJVc2VyIiwid2hlcmUiLCJpZCIsImZldGNoIiwidHJhbnNhY3RpbmciLCJ1c2VyIiwiY2xpZW50IiwiZmlsZXMiLCJnZXRUaHVtYm5haWwiLCJxdWVyeSIsInBhdGgiLCJtaW5fd2lkdGgiLCJtaW5faGVpZ2h0IiwicmVzdWx0Iiwic3RhdHVzIiwidHlwZSIsImVuZCIsImZpbGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFFQSxJQUFNQTtBQUFBLHNGQUFVLGtCQUFPQyxHQUFQLEVBQVlDLEdBQVosRUFBaUJDLElBQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUVSQyxhQUFLQyxXQUFMO0FBQUEsbUdBQWlCLGlCQUFNQyxHQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsK0JBRUpDLGFBQUtDLEtBQUwsQ0FBVyxFQUFFQyxJQUFJLEVBQU4sRUFBWCxFQUF1QkMsS0FBdkIsQ0FBNkIsRUFBRUMsYUFBYUwsR0FBZixFQUE3QixDQUZJOztBQUFBO0FBRXJCTCw0QkFBSVcsSUFGaUI7QUFBQTtBQUFBLCtCQUlBLHNCQUFVWCxHQUFWLEVBQWVLLEdBQWYsQ0FKQTs7QUFBQTtBQUlmTyw4QkFKZTtBQUFBO0FBQUEsK0JBTUFBLE9BQU9DLEtBQVAsQ0FBYUMsWUFBYixDQUEwQmQsSUFBSWUsS0FBSixDQUFVQyxJQUFwQyxFQUEwQztBQUM3REMscUNBQVcsR0FEa0Q7QUFFN0RDLHNDQUFZO0FBRmlELHlCQUExQyxDQU5BOztBQUFBO0FBTWZDLDhCQU5lOzs7QUFXckJsQiw0QkFBSW1CLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQixZQUFyQixFQUFtQ0MsR0FBbkMsQ0FBdUNILE9BQU9JLElBQTlDLEVBQW9ELFFBQXBEOztBQVhxQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFqQjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFGUTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFWOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O2tCQW1CZXhCLE8iLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGtuZXgsIFVzZXIgfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2ZXInXG5pbXBvcnQgeyBnZXRDbGllbnQgfSBmcm9tICcuL3V0aWxzJ1xuXG5jb25zdCBwcmV2aWV3ID0gYXN5bmMgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG5cbiAgYXdhaXQga25leC50cmFuc2FjdGlvbihhc3luYyB0cnggPT4ge1xuXG4gICAgcmVxLnVzZXIgPSBhd2FpdCBVc2VyLndoZXJlKHsgaWQ6IDc5IH0pLmZldGNoKHsgdHJhbnNhY3Rpbmc6IHRyeCB9KVxuXG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgZ2V0Q2xpZW50KHJlcSwgdHJ4KVxuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2xpZW50LmZpbGVzLmdldFRodW1ibmFpbChyZXEucXVlcnkucGF0aCwge1xuICAgICAgbWluX3dpZHRoOiAxNjAsXG4gICAgICBtaW5faGVpZ2h0OiAxNjBcbiAgICB9KVxuXG4gICAgcmVzLnN0YXR1cygyMDApLnR5cGUoJ2ltYWdlL2pwZWcnKS5lbmQocmVzdWx0LmZpbGUsICdiaW5hcnknKVxuXG4gIH0pXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgcHJldmlld1xuIl19