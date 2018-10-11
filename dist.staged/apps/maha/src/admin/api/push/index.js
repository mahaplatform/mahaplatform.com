'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _server = require('../../../server');

var _manage = require('./manage');

var _manage2 = _interopRequireDefault(_manage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assetsSegment = new _server.Segment({
  routes: [_manage2.default]
});

exports.default = assetsSegment;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiYXNzZXRzU2VnbWVudCIsIlNlZ21lbnQiLCJyb3V0ZXMiLCJtYW5hZ2UiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxnQkFBZ0IsSUFBSUMsZUFBSixDQUFZO0FBQ2hDQyxVQUFRLENBQ05DLGdCQURNO0FBRHdCLENBQVosQ0FBdEI7O2tCQU1lSCxhIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZWdtZW50IH0gZnJvbSAnLi4vLi4vLi4vc2VydmVyJ1xuaW1wb3J0IG1hbmFnZSBmcm9tICcuL21hbmFnZSdcblxuY29uc3QgYXNzZXRzU2VnbWVudCA9IG5ldyBTZWdtZW50KHtcbiAgcm91dGVzOiBbXG4gICAgbWFuYWdlXG4gIF1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IGFzc2V0c1NlZ21lbnRcbiJdfQ==