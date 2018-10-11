'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../server');

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var response;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _requestPromise2.default.head(req.query.url).promise();

          case 3:
            response = _context.sent;
            return _context.abrupt('return', response);

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);
            throw new _server.BackframeError({
              code: 404,
              message: 'Unable to load url'
            });

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function processor(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var urlRoute = new _server.Route({
  method: 'get',
  path: '/assets/url',
  processor: processor
});

exports.default = urlRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsInJlcXVlc3QiLCJoZWFkIiwicXVlcnkiLCJ1cmwiLCJwcm9taXNlIiwicmVzcG9uc2UiLCJCYWNrZnJhbWVFcnJvciIsImNvZGUiLCJtZXNzYWdlIiwidXJsUm91dGUiLCJSb3V0ZSIsIm1ldGhvZCIsInBhdGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7OztBQUVBLElBQU1BO0FBQUEsc0ZBQVksaUJBQU9DLEdBQVAsRUFBWUMsR0FBWixFQUFpQkMsT0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUlTQyx5QkFBUUMsSUFBUixDQUFhSixJQUFJSyxLQUFKLENBQVVDLEdBQXZCLEVBQTRCQyxPQUE1QixFQUpUOztBQUFBO0FBSVJDLG9CQUpRO0FBQUEsNkNBTVBBLFFBTk87O0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBVVIsSUFBSUMsc0JBQUosQ0FBbUI7QUFDdkJDLG9CQUFNLEdBRGlCO0FBRXZCQyx1QkFBUztBQUZjLGFBQW5CLENBVlE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztBQW1CQSxJQUFNQyxXQUFXLElBQUlDLGFBQUosQ0FBVTtBQUN6QkMsVUFBUSxLQURpQjtBQUV6QkMsUUFBTSxhQUZtQjtBQUd6QmhCO0FBSHlCLENBQVYsQ0FBakI7O2tCQU1lYSxRIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYWNrZnJhbWVFcnJvciwgUm91dGUgfSBmcm9tICcuLi8uLi8uLi9zZXJ2ZXInXG5pbXBvcnQgcmVxdWVzdCBmcm9tICdyZXF1ZXN0LXByb21pc2UnXG5cbmNvbnN0IHByb2Nlc3NvciA9IGFzeW5jIChyZXEsIHRyeCwgb3B0aW9ucykgPT4ge1xuXG4gIHRyeSB7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHJlcXVlc3QuaGVhZChyZXEucXVlcnkudXJsKS5wcm9taXNlKClcblxuICAgIHJldHVybiByZXNwb25zZVxuXG4gIH0gY2F0Y2goZSkge1xuXG4gICAgdGhyb3cgbmV3IEJhY2tmcmFtZUVycm9yKHtcbiAgICAgIGNvZGU6IDQwNCxcbiAgICAgIG1lc3NhZ2U6ICdVbmFibGUgdG8gbG9hZCB1cmwnXG4gICAgfSlcblxuICB9XG5cbn1cblxuY29uc3QgdXJsUm91dGUgPSBuZXcgUm91dGUoe1xuICBtZXRob2Q6ICdnZXQnLFxuICBwYXRoOiAnL2Fzc2V0cy91cmwnLFxuICBwcm9jZXNzb3Jcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IHVybFJvdXRlXG4iXX0=