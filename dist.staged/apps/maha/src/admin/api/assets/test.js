'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../server');

var _asset = require('../../../services/asset');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _asset.validateRequest)(req.query, req.files, false);

          case 2:
            _context.next = 4;
            return (0, _asset.checkUploadedFile)(req, trx);

          case 4:
            return _context.abrupt('return', _context.sent);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function processor(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var testRoute = new _server.Route({
  path: '/assets/upload',
  method: 'get',
  processor: processor
});

exports.default = testRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsInF1ZXJ5IiwiZmlsZXMiLCJ0ZXN0Um91dGUiLCJSb3V0ZSIsInBhdGgiLCJtZXRob2QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFFQSxJQUFNQTtBQUFBLHNGQUFZLGlCQUFPQyxHQUFQLEVBQVlDLEdBQVosRUFBaUJDLE9BQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUVWLDRCQUFnQkYsSUFBSUcsS0FBcEIsRUFBMkJILElBQUlJLEtBQS9CLEVBQXNDLEtBQXRDLENBRlU7O0FBQUE7QUFBQTtBQUFBLG1CQUlILDhCQUFrQkosR0FBbEIsRUFBdUJDLEdBQXZCLENBSkc7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFaOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBUUEsSUFBTUksWUFBWSxJQUFJQyxhQUFKLENBQVU7QUFDMUJDLFFBQU0sZ0JBRG9CO0FBRTFCQyxVQUFRLEtBRmtCO0FBRzFCVDtBQUgwQixDQUFWLENBQWxCOztrQkFNZU0sUyIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGUgfSBmcm9tICcuLi8uLi8uLi9zZXJ2ZXInXG5pbXBvcnQgeyB2YWxpZGF0ZVJlcXVlc3QsIGNoZWNrVXBsb2FkZWRGaWxlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvYXNzZXQnXG5cbmNvbnN0IHByb2Nlc3NvciA9IGFzeW5jIChyZXEsIHRyeCwgb3B0aW9ucykgPT4ge1xuXG4gIGF3YWl0IHZhbGlkYXRlUmVxdWVzdChyZXEucXVlcnksIHJlcS5maWxlcywgZmFsc2UpXG5cbiAgcmV0dXJuIGF3YWl0IGNoZWNrVXBsb2FkZWRGaWxlKHJlcSwgdHJ4KVxuXG59XG5cbmNvbnN0IHRlc3RSb3V0ZSA9IG5ldyBSb3V0ZSh7XG4gIHBhdGg6ICcvYXNzZXRzL3VwbG9hZCcsXG4gIG1ldGhvZDogJ2dldCcsXG4gIHByb2Nlc3NvclxufSlcblxuZXhwb3J0IGRlZmF1bHQgdGVzdFJvdXRlXG4iXX0=