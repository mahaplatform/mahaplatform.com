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
    var team, strategies;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (req.body.subdomain) {
              _context.next = 2;
              break;
            }

            throw new _server.BackframeError({
              code: 422,
              message: 'Please enter your team\'s domain'
            });

          case 2:
            _context.next = 4;
            return _server.Team.where({
              subdomain: req.body.subdomain
            }).fetch({
              withRelated: ['logo', 'strategies'],
              transacting: trx
            });

          case 4:
            team = _context.sent;

            if (team) {
              _context.next = 7;
              break;
            }

            throw new _server.BackframeError({
              code: 422,
              message: 'Unable to find this domain'
            });

          case 7:
            strategies = team.related('strategies').toJSON().map(function (strategy) {
              return strategy.name;
            });
            return _context.abrupt('return', {
              id: team.get('id'),
              title: team.get('title'),
              subdomain: team.get('subdomain'),
              color: team.get('color'),
              logo: team.related('logo').get('path'),
              strategies: strategies
            });

          case 9:
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

var teamRoute = new _server.Route({
  path: '/team',
  method: 'post',
  processor: processor
});

exports.default = teamRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsImJvZHkiLCJzdWJkb21haW4iLCJCYWNrZnJhbWVFcnJvciIsImNvZGUiLCJtZXNzYWdlIiwiVGVhbSIsIndoZXJlIiwiZmV0Y2giLCJ3aXRoUmVsYXRlZCIsInRyYW5zYWN0aW5nIiwidGVhbSIsInN0cmF0ZWdpZXMiLCJyZWxhdGVkIiwidG9KU09OIiwibWFwIiwic3RyYXRlZ3kiLCJuYW1lIiwiaWQiLCJnZXQiLCJ0aXRsZSIsImNvbG9yIiwibG9nbyIsInRlYW1Sb3V0ZSIsIlJvdXRlIiwicGF0aCIsIm1ldGhvZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBLElBQU1BO0FBQUEsc0ZBQVksaUJBQU9DLEdBQVAsRUFBWUMsR0FBWixFQUFpQkMsT0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBRVpGLElBQUlHLElBQUosQ0FBU0MsU0FGRztBQUFBO0FBQUE7QUFBQTs7QUFBQSxrQkFHUixJQUFJQyxzQkFBSixDQUFtQjtBQUN2QkMsb0JBQU0sR0FEaUI7QUFFdkJDLHVCQUFTO0FBRmMsYUFBbkIsQ0FIUTs7QUFBQTtBQUFBO0FBQUEsbUJBU0dDLGFBQUtDLEtBQUwsQ0FBVztBQUM1QkwseUJBQVdKLElBQUlHLElBQUosQ0FBU0M7QUFEUSxhQUFYLEVBRWhCTSxLQUZnQixDQUVWO0FBQ1BDLDJCQUFhLENBQUMsTUFBRCxFQUFRLFlBQVIsQ0FETjtBQUVQQywyQkFBYVg7QUFGTixhQUZVLENBVEg7O0FBQUE7QUFTVlksZ0JBVFU7O0FBQUEsZ0JBZ0JaQSxJQWhCWTtBQUFBO0FBQUE7QUFBQTs7QUFBQSxrQkFpQlIsSUFBSVIsc0JBQUosQ0FBbUI7QUFDdkJDLG9CQUFNLEdBRGlCO0FBRXZCQyx1QkFBUztBQUZjLGFBQW5CLENBakJROztBQUFBO0FBdUJWTyxzQkF2QlUsR0F1QkdELEtBQUtFLE9BQUwsQ0FBYSxZQUFiLEVBQTJCQyxNQUEzQixHQUFvQ0MsR0FBcEMsQ0FBd0M7QUFBQSxxQkFBWUMsU0FBU0MsSUFBckI7QUFBQSxhQUF4QyxDQXZCSDtBQUFBLDZDQXlCVDtBQUNMQyxrQkFBSVAsS0FBS1EsR0FBTCxDQUFTLElBQVQsQ0FEQztBQUVMQyxxQkFBT1QsS0FBS1EsR0FBTCxDQUFTLE9BQVQsQ0FGRjtBQUdMakIseUJBQVdTLEtBQUtRLEdBQUwsQ0FBUyxXQUFULENBSE47QUFJTEUscUJBQU9WLEtBQUtRLEdBQUwsQ0FBUyxPQUFULENBSkY7QUFLTEcsb0JBQU1YLEtBQUtFLE9BQUwsQ0FBYSxNQUFiLEVBQXFCTSxHQUFyQixDQUF5QixNQUF6QixDQUxEO0FBTUxQO0FBTkssYUF6QlM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztBQW9DQSxJQUFNVyxZQUFZLElBQUlDLGFBQUosQ0FBVTtBQUMxQkMsUUFBTSxPQURvQjtBQUUxQkMsVUFBUSxNQUZrQjtBQUcxQjdCO0FBSDBCLENBQVYsQ0FBbEI7O2tCQU1lMEIsUyIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGUsIEJhY2tmcmFtZUVycm9yLCBUZWFtIH0gZnJvbSAnLi4vLi4vLi4vc2VydmVyJ1xuXG5jb25zdCBwcm9jZXNzb3IgPSBhc3luYyAocmVxLCB0cngsIG9wdGlvbnMpID0+IHtcblxuICBpZighcmVxLmJvZHkuc3ViZG9tYWluKSB7XG4gICAgdGhyb3cgbmV3IEJhY2tmcmFtZUVycm9yKHtcbiAgICAgIGNvZGU6IDQyMixcbiAgICAgIG1lc3NhZ2U6ICdQbGVhc2UgZW50ZXIgeW91ciB0ZWFtXFwncyBkb21haW4nXG4gICAgfSlcbiAgfVxuXG4gIGNvbnN0IHRlYW0gPSBhd2FpdCBUZWFtLndoZXJlKHtcbiAgICBzdWJkb21haW46IHJlcS5ib2R5LnN1YmRvbWFpblxuICB9KS5mZXRjaCh7XG4gICAgd2l0aFJlbGF0ZWQ6IFsnbG9nbycsJ3N0cmF0ZWdpZXMnXSxcbiAgICB0cmFuc2FjdGluZzogdHJ4XG4gIH0pXG5cbiAgaWYoIXRlYW0pIHtcbiAgICB0aHJvdyBuZXcgQmFja2ZyYW1lRXJyb3Ioe1xuICAgICAgY29kZTogNDIyLFxuICAgICAgbWVzc2FnZTogJ1VuYWJsZSB0byBmaW5kIHRoaXMgZG9tYWluJ1xuICAgIH0pXG4gIH1cblxuICBjb25zdCBzdHJhdGVnaWVzID0gdGVhbS5yZWxhdGVkKCdzdHJhdGVnaWVzJykudG9KU09OKCkubWFwKHN0cmF0ZWd5ID0+IHN0cmF0ZWd5Lm5hbWUpXG5cbiAgcmV0dXJuIHtcbiAgICBpZDogdGVhbS5nZXQoJ2lkJyksXG4gICAgdGl0bGU6IHRlYW0uZ2V0KCd0aXRsZScpLFxuICAgIHN1YmRvbWFpbjogdGVhbS5nZXQoJ3N1YmRvbWFpbicpLFxuICAgIGNvbG9yOiB0ZWFtLmdldCgnY29sb3InKSxcbiAgICBsb2dvOiB0ZWFtLnJlbGF0ZWQoJ2xvZ28nKS5nZXQoJ3BhdGgnKSxcbiAgICBzdHJhdGVnaWVzXG4gIH1cblxufVxuXG5jb25zdCB0ZWFtUm91dGUgPSBuZXcgUm91dGUoe1xuICBwYXRoOiAnL3RlYW0nLFxuICBtZXRob2Q6ICdwb3N0JyxcbiAgcHJvY2Vzc29yXG59KVxuXG5leHBvcnQgZGVmYXVsdCB0ZWFtUm91dGVcbiJdfQ==