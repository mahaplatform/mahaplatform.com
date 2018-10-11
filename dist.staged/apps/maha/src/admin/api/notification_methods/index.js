'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _server = require('../../../server');

var _notification_method = require('../../../models/notification_method');

var _notification_method2 = _interopRequireDefault(_notification_method);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var notificationMethodResources = new _server.Resources({
  defaultSort: 'id',
  model: _notification_method2.default,
  path: '/notification_methods',
  only: ['list'],
  ownedByTeam: false
});

exports.default = notificationMethodResources;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsibm90aWZpY2F0aW9uTWV0aG9kUmVzb3VyY2VzIiwiUmVzb3VyY2VzIiwiZGVmYXVsdFNvcnQiLCJtb2RlbCIsIk5vdGlmaWNhdGlvbk1ldGhvZCIsInBhdGgiLCJvbmx5Iiwib3duZWRCeVRlYW0iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQSw4QkFBOEIsSUFBSUMsaUJBQUosQ0FBYztBQUNoREMsZUFBYSxJQURtQztBQUVoREMsU0FBT0MsNkJBRnlDO0FBR2hEQyxRQUFNLHVCQUgwQztBQUloREMsUUFBTSxDQUFDLE1BQUQsQ0FKMEM7QUFLaERDLGVBQWE7QUFMbUMsQ0FBZCxDQUFwQzs7a0JBUWVQLDJCIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXNvdXJjZXMgfSBmcm9tICcuLi8uLi8uLi9zZXJ2ZXInXG5pbXBvcnQgTm90aWZpY2F0aW9uTWV0aG9kIGZyb20gJy4uLy4uLy4uL21vZGVscy9ub3RpZmljYXRpb25fbWV0aG9kJ1xuXG5jb25zdCBub3RpZmljYXRpb25NZXRob2RSZXNvdXJjZXMgPSBuZXcgUmVzb3VyY2VzKHtcbiAgZGVmYXVsdFNvcnQ6ICdpZCcsXG4gIG1vZGVsOiBOb3RpZmljYXRpb25NZXRob2QsXG4gIHBhdGg6ICcvbm90aWZpY2F0aW9uX21ldGhvZHMnLFxuICBvbmx5OiBbJ2xpc3QnXSxcbiAgb3duZWRCeVRlYW06IGZhbHNlXG59KVxuXG5leHBvcnQgZGVmYXVsdCBub3RpZmljYXRpb25NZXRob2RSZXNvdXJjZXNcbiJdfQ==