'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../server');

var _star = require('../../../models/star');

var _star2 = _interopRequireDefault(_star);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetchStar = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var _req$params, starrable_type, starrable_id, star;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$params = req.params, starrable_type = _req$params.starrable_type, starrable_id = _req$params.starrable_id;
            _context.next = 3;
            return _star2.default.where({
              user_id: req.user.get('id'),
              starrable_type: starrable_type,
              starrable_id: starrable_id
            }).fetch({ transacting: trx });

          case 3:
            star = _context.sent;

            if (!star) {
              _context.next = 8;
              break;
            }

            _context.next = 7;
            return star.destroy({ transacting: trx });

          case 7:
            return _context.abrupt('return', null);

          case 8:
            _context.next = 10;
            return _star2.default.forge({
              team_id: req.team.get('id'),
              user_id: req.user.get('id'),
              starrable_type: starrable_type,
              starrable_id: starrable_id
            }).save(null, { transacting: trx });

          case 10:
            return _context.abrupt('return', _context.sent);

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function fetchStar(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var processor = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, trx, options) {
    var star;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return fetchStar(req, trx, options);

          case 2:
            star = _context2.sent;
            _context2.next = 5;
            return _server.socket.in('/admin/stars').emit('message', {
              target: '/admin/stars',
              action: 'update_stars',
              data: {
                table: req.params.starrable_type,
                id: parseInt(req.params.starrable_id),
                starred: star !== null
              }
            });

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function processor(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var starRoute = new _server.Route({
  method: 'patch',
  path: '/:starrable_type/:starrable_id/star',
  processor: processor
});

exports.default = starRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiZmV0Y2hTdGFyIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsInBhcmFtcyIsInN0YXJyYWJsZV90eXBlIiwic3RhcnJhYmxlX2lkIiwiU3RhciIsIndoZXJlIiwidXNlcl9pZCIsInVzZXIiLCJnZXQiLCJmZXRjaCIsInRyYW5zYWN0aW5nIiwic3RhciIsImRlc3Ryb3kiLCJmb3JnZSIsInRlYW1faWQiLCJ0ZWFtIiwic2F2ZSIsInByb2Nlc3NvciIsInNvY2tldCIsImluIiwiZW1pdCIsInRhcmdldCIsImFjdGlvbiIsImRhdGEiLCJ0YWJsZSIsImlkIiwicGFyc2VJbnQiLCJzdGFycmVkIiwic3RhclJvdXRlIiwiUm91dGUiLCJtZXRob2QiLCJwYXRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BO0FBQUEsc0ZBQVksaUJBQU9DLEdBQVAsRUFBWUMsR0FBWixFQUFpQkMsT0FBakI7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUV5QkYsSUFBSUcsTUFGN0IsRUFFUkMsY0FGUSxlQUVSQSxjQUZRLEVBRVFDLFlBRlIsZUFFUUEsWUFGUjtBQUFBO0FBQUEsbUJBSUdDLGVBQUtDLEtBQUwsQ0FBVztBQUM1QkMsdUJBQVNSLElBQUlTLElBQUosQ0FBU0MsR0FBVCxDQUFhLElBQWIsQ0FEbUI7QUFFNUJOLDRDQUY0QjtBQUc1QkM7QUFINEIsYUFBWCxFQUloQk0sS0FKZ0IsQ0FJVixFQUFFQyxhQUFhWCxHQUFmLEVBSlUsQ0FKSDs7QUFBQTtBQUlWWSxnQkFKVTs7QUFBQSxpQkFVYkEsSUFWYTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLG1CQVlSQSxLQUFLQyxPQUFMLENBQWEsRUFBRUYsYUFBYVgsR0FBZixFQUFiLENBWlE7O0FBQUE7QUFBQSw2Q0FjUCxJQWRPOztBQUFBO0FBQUE7QUFBQSxtQkFrQkhLLGVBQUtTLEtBQUwsQ0FBVztBQUN0QkMsdUJBQVNoQixJQUFJaUIsSUFBSixDQUFTUCxHQUFULENBQWEsSUFBYixDQURhO0FBRXRCRix1QkFBU1IsSUFBSVMsSUFBSixDQUFTQyxHQUFULENBQWEsSUFBYixDQUZhO0FBR3RCTiw0Q0FIc0I7QUFJdEJDO0FBSnNCLGFBQVgsRUFLVmEsSUFMVSxDQUtMLElBTEssRUFLQyxFQUFFTixhQUFhWCxHQUFmLEVBTEQsQ0FsQkc7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFaOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBMkJBLElBQU1rQjtBQUFBLHVGQUFZLGtCQUFPbkIsR0FBUCxFQUFZQyxHQUFaLEVBQWlCQyxPQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUVHSCxVQUFVQyxHQUFWLEVBQWVDLEdBQWYsRUFBb0JDLE9BQXBCLENBRkg7O0FBQUE7QUFFVlcsZ0JBRlU7QUFBQTtBQUFBLG1CQUlWTyxlQUFPQyxFQUFQLENBQVUsY0FBVixFQUEwQkMsSUFBMUIsQ0FBK0IsU0FBL0IsRUFBMEM7QUFDOUNDLHNCQUFRLGNBRHNDO0FBRTlDQyxzQkFBUSxjQUZzQztBQUc5Q0Msb0JBQU07QUFDSkMsdUJBQU8xQixJQUFJRyxNQUFKLENBQVdDLGNBRGQ7QUFFSnVCLG9CQUFJQyxTQUFTNUIsSUFBSUcsTUFBSixDQUFXRSxZQUFwQixDQUZBO0FBR0p3Qix5QkFBU2hCLFNBQVM7QUFIZDtBQUh3QyxhQUExQyxDQUpVOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUFnQkEsSUFBTWlCLFlBQVksSUFBSUMsYUFBSixDQUFVO0FBQzFCQyxVQUFRLE9BRGtCO0FBRTFCQyxRQUFNLHFDQUZvQjtBQUcxQmQ7QUFIMEIsQ0FBVixDQUFsQjs7a0JBTWVXLFMiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlLCBzb2NrZXQgfSBmcm9tICcuLi8uLi8uLi9zZXJ2ZXInXG5pbXBvcnQgU3RhciBmcm9tICcuLi8uLi8uLi9tb2RlbHMvc3RhcidcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50J1xuXG5jb25zdCBmZXRjaFN0YXIgPSBhc3luYyAocmVxLCB0cngsIG9wdGlvbnMpID0+IHtcblxuICBjb25zdCB7IHN0YXJyYWJsZV90eXBlLCBzdGFycmFibGVfaWQgfSA9IHJlcS5wYXJhbXNcblxuICBjb25zdCBzdGFyID0gYXdhaXQgU3Rhci53aGVyZSh7XG4gICAgdXNlcl9pZDogcmVxLnVzZXIuZ2V0KCdpZCcpLFxuICAgIHN0YXJyYWJsZV90eXBlLFxuICAgIHN0YXJyYWJsZV9pZFxuICB9KS5mZXRjaCh7IHRyYW5zYWN0aW5nOiB0cnggfSlcblxuICBpZihzdGFyKSB7XG5cbiAgICBhd2FpdCBzdGFyLmRlc3Ryb3koeyB0cmFuc2FjdGluZzogdHJ4IH0pXG5cbiAgICByZXR1cm4gbnVsbFxuXG4gIH1cblxuICByZXR1cm4gYXdhaXQgU3Rhci5mb3JnZSh7XG4gICAgdGVhbV9pZDogcmVxLnRlYW0uZ2V0KCdpZCcpLFxuICAgIHVzZXJfaWQ6IHJlcS51c2VyLmdldCgnaWQnKSxcbiAgICBzdGFycmFibGVfdHlwZSxcbiAgICBzdGFycmFibGVfaWRcbiAgfSkuc2F2ZShudWxsLCB7IHRyYW5zYWN0aW5nOiB0cnggfSlcblxufVxuXG5jb25zdCBwcm9jZXNzb3IgPSBhc3luYyAocmVxLCB0cngsIG9wdGlvbnMpID0+IHtcblxuICBjb25zdCBzdGFyID0gYXdhaXQgZmV0Y2hTdGFyKHJlcSwgdHJ4LCBvcHRpb25zKVxuXG4gIGF3YWl0IHNvY2tldC5pbignL2FkbWluL3N0YXJzJykuZW1pdCgnbWVzc2FnZScsIHtcbiAgICB0YXJnZXQ6ICcvYWRtaW4vc3RhcnMnLFxuICAgIGFjdGlvbjogJ3VwZGF0ZV9zdGFycycsXG4gICAgZGF0YToge1xuICAgICAgdGFibGU6IHJlcS5wYXJhbXMuc3RhcnJhYmxlX3R5cGUsXG4gICAgICBpZDogcGFyc2VJbnQocmVxLnBhcmFtcy5zdGFycmFibGVfaWQpLFxuICAgICAgc3RhcnJlZDogc3RhciAhPT0gbnVsbFxuICAgIH1cbiAgfSlcblxufVxuXG5jb25zdCBzdGFyUm91dGUgPSBuZXcgUm91dGUoe1xuICBtZXRob2Q6ICdwYXRjaCcsXG4gIHBhdGg6ICcvOnN0YXJyYWJsZV90eXBlLzpzdGFycmFibGVfaWQvc3RhcicsXG4gIHByb2Nlc3NvclxufSlcblxuZXhwb3J0IGRlZmF1bHQgc3RhclJvdXRlXG4iXX0=