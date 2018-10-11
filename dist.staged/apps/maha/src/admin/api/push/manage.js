'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return req.device.save({
              push_endpoint: req.body.endpoint,
              push_p256dh: req.body.p256dh,
              push_auth: req.body.auth
            }, {
              patch: true,
              transacting: trx
            });

          case 3:
            return _context.abrupt('return', true);

          case 6:
            _context.prev = 6;
            _context.t0 = _context['catch'](0);
            throw new _server.BackframeError({
              code: 422,
              message: 'Unable to save subscription'
            });

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 6]]);
  }));

  return function processor(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var rules = {
  agent: 'required',
  endpoint: 'required',
  p256dh: 'required',
  auth: 'required'
};

var manageRoute = new _server.Route({
  path: '/push',
  method: 'post',
  processor: processor,
  rules: rules
});

exports.default = manageRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsImRldmljZSIsInNhdmUiLCJwdXNoX2VuZHBvaW50IiwiYm9keSIsImVuZHBvaW50IiwicHVzaF9wMjU2ZGgiLCJwMjU2ZGgiLCJwdXNoX2F1dGgiLCJhdXRoIiwicGF0Y2giLCJ0cmFuc2FjdGluZyIsIkJhY2tmcmFtZUVycm9yIiwiY29kZSIsIm1lc3NhZ2UiLCJydWxlcyIsImFnZW50IiwibWFuYWdlUm91dGUiLCJSb3V0ZSIsInBhdGgiLCJtZXRob2QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQSxJQUFNQTtBQUFBLHNGQUFZLGlCQUFPQyxHQUFQLEVBQVlDLEdBQVosRUFBaUJDLE9BQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBSVJGLElBQUlHLE1BQUosQ0FBV0MsSUFBWCxDQUFnQjtBQUNwQkMsNkJBQWVMLElBQUlNLElBQUosQ0FBU0MsUUFESjtBQUVwQkMsMkJBQWFSLElBQUlNLElBQUosQ0FBU0csTUFGRjtBQUdwQkMseUJBQVdWLElBQUlNLElBQUosQ0FBU0s7QUFIQSxhQUFoQixFQUlIO0FBQ0RDLHFCQUFPLElBRE47QUFFREMsMkJBQWFaO0FBRlosYUFKRyxDQUpROztBQUFBO0FBQUEsNkNBYVAsSUFiTzs7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFpQlIsSUFBSWEsc0JBQUosQ0FBbUI7QUFDdkJDLG9CQUFNLEdBRGlCO0FBRXZCQyx1QkFBUztBQUZjLGFBQW5CLENBakJROztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUEwQkEsSUFBTUMsUUFBUTtBQUNaQyxTQUFPLFVBREs7QUFFWlgsWUFBVSxVQUZFO0FBR1pFLFVBQVEsVUFISTtBQUlaRSxRQUFNO0FBSk0sQ0FBZDs7QUFPQSxJQUFNUSxjQUFjLElBQUlDLGFBQUosQ0FBVTtBQUM1QkMsUUFBTSxPQURzQjtBQUU1QkMsVUFBUSxNQUZvQjtBQUc1QnZCLHNCQUg0QjtBQUk1QmtCO0FBSjRCLENBQVYsQ0FBcEI7O2tCQU9lRSxXIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYWNrZnJhbWVFcnJvciwgUm91dGUgfSBmcm9tICcuLi8uLi8uLi9zZXJ2ZXInXG5cbmNvbnN0IHByb2Nlc3NvciA9IGFzeW5jIChyZXEsIHRyeCwgb3B0aW9ucykgPT4ge1xuXG4gIHRyeSB7XG5cbiAgICBhd2FpdCByZXEuZGV2aWNlLnNhdmUoe1xuICAgICAgcHVzaF9lbmRwb2ludDogcmVxLmJvZHkuZW5kcG9pbnQsXG4gICAgICBwdXNoX3AyNTZkaDogcmVxLmJvZHkucDI1NmRoLFxuICAgICAgcHVzaF9hdXRoOiByZXEuYm9keS5hdXRoXG4gICAgfSwge1xuICAgICAgcGF0Y2g6IHRydWUsXG4gICAgICB0cmFuc2FjdGluZzogdHJ4XG4gICAgfSlcblxuICAgIHJldHVybiB0cnVlXG5cbiAgfSBjYXRjaChlcnIpIHtcblxuICAgIHRocm93IG5ldyBCYWNrZnJhbWVFcnJvcih7XG4gICAgICBjb2RlOiA0MjIsXG4gICAgICBtZXNzYWdlOiAnVW5hYmxlIHRvIHNhdmUgc3Vic2NyaXB0aW9uJ1xuICAgIH0pXG5cbiAgfVxuXG59XG5cbmNvbnN0IHJ1bGVzID0ge1xuICBhZ2VudDogJ3JlcXVpcmVkJyxcbiAgZW5kcG9pbnQ6ICdyZXF1aXJlZCcsXG4gIHAyNTZkaDogJ3JlcXVpcmVkJyxcbiAgYXV0aDogJ3JlcXVpcmVkJ1xufVxuXG5jb25zdCBtYW5hZ2VSb3V0ZSA9IG5ldyBSb3V0ZSh7XG4gIHBhdGg6ICcvcHVzaCcsXG4gIG1ldGhvZDogJ3Bvc3QnLFxuICBwcm9jZXNzb3IsXG4gIHJ1bGVzXG59KVxuXG5leHBvcnQgZGVmYXVsdCBtYW5hZ2VSb3V0ZVxuIl19