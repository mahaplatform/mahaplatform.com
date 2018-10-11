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
                var client, result, data;
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
                        return client({
                          resource: 'files/get_thumbnail_batch',
                          parameters: {
                            entries: [{
                              path: req.query.path,
                              format: 'jpeg',
                              size: 'w128h128',
                              mode: 'strict'
                            }]
                          }
                        });

                      case 8:
                        result = _context.sent;
                        data = new Buffer(result.entries[0].thumbnail, 'base64');


                        res.status(200).type('image/jpeg').end(data, 'binary');

                      case 11:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJldmlldyIsInJlcSIsInJlcyIsIm5leHQiLCJrbmV4IiwidHJhbnNhY3Rpb24iLCJ0cngiLCJVc2VyIiwid2hlcmUiLCJpZCIsImZldGNoIiwidHJhbnNhY3RpbmciLCJ1c2VyIiwiY2xpZW50IiwicmVzb3VyY2UiLCJwYXJhbWV0ZXJzIiwiZW50cmllcyIsInBhdGgiLCJxdWVyeSIsImZvcm1hdCIsInNpemUiLCJtb2RlIiwicmVzdWx0IiwiZGF0YSIsIkJ1ZmZlciIsInRodW1ibmFpbCIsInN0YXR1cyIsInR5cGUiLCJlbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFFQSxJQUFNQTtBQUFBLHNGQUFVLGtCQUFPQyxHQUFQLEVBQVlDLEdBQVosRUFBaUJDLElBQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUVSQyxhQUFLQyxXQUFMO0FBQUEsbUdBQWlCLGlCQUFNQyxHQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsK0JBRUpDLGFBQUtDLEtBQUwsQ0FBVyxFQUFFQyxJQUFJLEVBQU4sRUFBWCxFQUF1QkMsS0FBdkIsQ0FBNkIsRUFBRUMsYUFBYUwsR0FBZixFQUE3QixDQUZJOztBQUFBO0FBRXJCTCw0QkFBSVcsSUFGaUI7QUFBQTtBQUFBLCtCQUlBLHNCQUFVWCxHQUFWLEVBQWVLLEdBQWYsQ0FKQTs7QUFBQTtBQUlmTyw4QkFKZTtBQUFBO0FBQUEsK0JBTUFBLE9BQU87QUFDMUJDLG9DQUFVLDJCQURnQjtBQUUxQkMsc0NBQVk7QUFDVkMscUNBQVMsQ0FDUDtBQUNFQyxvQ0FBTWhCLElBQUlpQixLQUFKLENBQVVELElBRGxCO0FBRUVFLHNDQUFRLE1BRlY7QUFHRUMsb0NBQU0sVUFIUjtBQUlFQyxvQ0FBTTtBQUpSLDZCQURPO0FBREM7QUFGYyx5QkFBUCxDQU5BOztBQUFBO0FBTWZDLDhCQU5lO0FBb0JmQyw0QkFwQmUsR0FvQlIsSUFBSUMsTUFBSixDQUFXRixPQUFPTixPQUFQLENBQWUsQ0FBZixFQUFrQlMsU0FBN0IsRUFBd0MsUUFBeEMsQ0FwQlE7OztBQXNCckJ2Qiw0QkFBSXdCLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQixZQUFyQixFQUFtQ0MsR0FBbkMsQ0FBdUNMLElBQXZDLEVBQTZDLFFBQTdDOztBQXRCcUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBakI7O0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBRlE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBVjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztrQkE4QmV2QixPIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBrbmV4LCBVc2VyIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmVyJ1xuaW1wb3J0IHsgZ2V0Q2xpZW50IH0gZnJvbSAnLi91dGlscydcblxuY29uc3QgcHJldmlldyA9IGFzeW5jIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuXG4gIGF3YWl0IGtuZXgudHJhbnNhY3Rpb24oYXN5bmMgdHJ4ID0+IHtcblxuICAgIHJlcS51c2VyID0gYXdhaXQgVXNlci53aGVyZSh7IGlkOiA3OSB9KS5mZXRjaCh7IHRyYW5zYWN0aW5nOiB0cnggfSlcblxuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IGdldENsaWVudChyZXEsIHRyeClcblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNsaWVudCh7XG4gICAgICByZXNvdXJjZTogJ2ZpbGVzL2dldF90aHVtYm5haWxfYmF0Y2gnLFxuICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICBlbnRyaWVzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgcGF0aDogcmVxLnF1ZXJ5LnBhdGgsXG4gICAgICAgICAgICBmb3JtYXQ6ICdqcGVnJyxcbiAgICAgICAgICAgIHNpemU6ICd3MTI4aDEyOCcsXG4gICAgICAgICAgICBtb2RlOiAnc3RyaWN0J1xuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCBkYXRhID0gbmV3IEJ1ZmZlcihyZXN1bHQuZW50cmllc1swXS50aHVtYm5haWwsICdiYXNlNjQnKVxuXG4gICAgcmVzLnN0YXR1cygyMDApLnR5cGUoJ2ltYWdlL2pwZWcnKS5lbmQoZGF0YSwgJ2JpbmFyeScpXG5cbiAgfSlcblxufVxuXG5leHBvcnQgZGVmYXVsdCBwcmV2aWV3XG4iXX0=