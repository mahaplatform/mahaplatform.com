'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../server');

var _notification_type = require('../../../models/notification_type');

var _notification_type2 = _interopRequireDefault(_notification_type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var notification_types, notifications;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _notification_type2.default.fetchAll({ transacting: trx });

          case 2:
            notification_types = _context.sent;
            notifications = notification_types.reduce(function (sorted, notification_type) {
              return (0, _extends4.default)({}, sorted, (0, _defineProperty3.default)({}, notification_type.get('app_id'), [].concat((0, _toConsumableArray3.default)(sorted[notification_type.get('app_id')] || []), [notification_type])));
            }, {});
            return _context.abrupt('return', Object.keys(req.apps).reduce(function (subscriptions, code) {
              if (!notifications[req.apps[code].id]) return subscriptions;
              return [].concat((0, _toConsumableArray3.default)(subscriptions), [{
                title: req.apps[code].label,
                icon: req.apps[code].icon,
                color: req.apps[code].color,
                notifications: notifications[req.apps[code].id]
              }]);
            }, []));

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

var preferencesRoute = new _server.Route({
  method: 'get',
  path: '/notifications',
  processor: processor
});

exports.default = preferencesRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsIk5vdGlmaWNhdGlvblR5cGUiLCJmZXRjaEFsbCIsInRyYW5zYWN0aW5nIiwibm90aWZpY2F0aW9uX3R5cGVzIiwibm90aWZpY2F0aW9ucyIsInJlZHVjZSIsInNvcnRlZCIsIm5vdGlmaWNhdGlvbl90eXBlIiwiZ2V0IiwiT2JqZWN0Iiwia2V5cyIsImFwcHMiLCJzdWJzY3JpcHRpb25zIiwiY29kZSIsImlkIiwidGl0bGUiLCJsYWJlbCIsImljb24iLCJjb2xvciIsInByZWZlcmVuY2VzUm91dGUiLCJSb3V0ZSIsIm1ldGhvZCIsInBhdGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7OztBQUVBLElBQU1BO0FBQUEsc0ZBQVksaUJBQU9DLEdBQVAsRUFBWUMsR0FBWixFQUFpQkMsT0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFFaUJDLDRCQUFpQkMsUUFBakIsQ0FBMEIsRUFBRUMsYUFBYUosR0FBZixFQUExQixDQUZqQjs7QUFBQTtBQUVWSyw4QkFGVTtBQUlWQyx5QkFKVSxHQUlNRCxtQkFBbUJFLE1BQW5CLENBQTBCLFVBQUNDLE1BQUQsRUFBU0MsaUJBQVQ7QUFBQSxnREFDM0NELE1BRDJDLG9DQUU3Q0Msa0JBQWtCQyxHQUFsQixDQUFzQixRQUF0QixDQUY2Qyw2Q0FHekNGLE9BQU9DLGtCQUFrQkMsR0FBbEIsQ0FBc0IsUUFBdEIsQ0FBUCxLQUEyQyxFQUhGLElBSTVDRCxpQkFKNEM7QUFBQSxhQUExQixFQU1sQixFQU5rQixDQUpOO0FBQUEsNkNBWVRFLE9BQU9DLElBQVAsQ0FBWWIsSUFBSWMsSUFBaEIsRUFBc0JOLE1BQXRCLENBQTZCLFVBQUNPLGFBQUQsRUFBZ0JDLElBQWhCLEVBQXlCO0FBQzNELGtCQUFHLENBQUNULGNBQWNQLElBQUljLElBQUosQ0FBU0UsSUFBVCxFQUFlQyxFQUE3QixDQUFKLEVBQXNDLE9BQU9GLGFBQVA7QUFDdEMsZ0VBQ0tBLGFBREwsSUFFRTtBQUNFRyx1QkFBT2xCLElBQUljLElBQUosQ0FBU0UsSUFBVCxFQUFlRyxLQUR4QjtBQUVFQyxzQkFBTXBCLElBQUljLElBQUosQ0FBU0UsSUFBVCxFQUFlSSxJQUZ2QjtBQUdFQyx1QkFBT3JCLElBQUljLElBQUosQ0FBU0UsSUFBVCxFQUFlSyxLQUh4QjtBQUlFZCwrQkFBZUEsY0FBY1AsSUFBSWMsSUFBSixDQUFTRSxJQUFULEVBQWVDLEVBQTdCO0FBSmpCLGVBRkY7QUFTRCxhQVhNLEVBV0osRUFYSSxDQVpTOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUEyQkEsSUFBTUssbUJBQW1CLElBQUlDLGFBQUosQ0FBVTtBQUNqQ0MsVUFBUSxLQUR5QjtBQUVqQ0MsUUFBTSxnQkFGMkI7QUFHakMxQjtBQUhpQyxDQUFWLENBQXpCOztrQkFNZXVCLGdCIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZlcidcbmltcG9ydCBOb3RpZmljYXRpb25UeXBlIGZyb20gJy4uLy4uLy4uL21vZGVscy9ub3RpZmljYXRpb25fdHlwZSdcblxuY29uc3QgcHJvY2Vzc29yID0gYXN5bmMgKHJlcSwgdHJ4LCBvcHRpb25zKSA9PiB7XG5cbiAgY29uc3Qgbm90aWZpY2F0aW9uX3R5cGVzID0gYXdhaXQgTm90aWZpY2F0aW9uVHlwZS5mZXRjaEFsbCh7IHRyYW5zYWN0aW5nOiB0cnggfSlcblxuICBjb25zdCBub3RpZmljYXRpb25zID0gbm90aWZpY2F0aW9uX3R5cGVzLnJlZHVjZSgoc29ydGVkLCBub3RpZmljYXRpb25fdHlwZSkgPT4gKHtcbiAgICAuLi5zb3J0ZWQsXG4gICAgW25vdGlmaWNhdGlvbl90eXBlLmdldCgnYXBwX2lkJyldOiBbXG4gICAgICAuLi5zb3J0ZWRbbm90aWZpY2F0aW9uX3R5cGUuZ2V0KCdhcHBfaWQnKV0gfHwgW10sXG4gICAgICBub3RpZmljYXRpb25fdHlwZVxuICAgIF1cbiAgfSksIHt9KVxuXG4gIHJldHVybiBPYmplY3Qua2V5cyhyZXEuYXBwcykucmVkdWNlKChzdWJzY3JpcHRpb25zLCBjb2RlKSA9PiB7XG4gICAgaWYoIW5vdGlmaWNhdGlvbnNbcmVxLmFwcHNbY29kZV0uaWRdKSByZXR1cm4gc3Vic2NyaXB0aW9ucyBcbiAgICByZXR1cm4gW1xuICAgICAgLi4uc3Vic2NyaXB0aW9ucyxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6IHJlcS5hcHBzW2NvZGVdLmxhYmVsLFxuICAgICAgICBpY29uOiByZXEuYXBwc1tjb2RlXS5pY29uLFxuICAgICAgICBjb2xvcjogcmVxLmFwcHNbY29kZV0uY29sb3IsXG4gICAgICAgIG5vdGlmaWNhdGlvbnM6IG5vdGlmaWNhdGlvbnNbcmVxLmFwcHNbY29kZV0uaWRdXG4gICAgICB9XG4gICAgXVxuICB9LCBbXSlcblxufVxuXG5jb25zdCBwcmVmZXJlbmNlc1JvdXRlID0gbmV3IFJvdXRlKHtcbiAgbWV0aG9kOiAnZ2V0JyxcbiAgcGF0aDogJy9ub3RpZmljYXRpb25zJyxcbiAgcHJvY2Vzc29yXG59KVxuXG5leHBvcnQgZGVmYXVsdCBwcmVmZXJlbmNlc1JvdXRlXG4iXX0=