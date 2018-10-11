'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _server = require('../../../server');

var _update = require('./update');

var _update2 = _interopRequireDefault(_update);

var _show = require('./show');

var _show2 = _interopRequireDefault(_show);

var _notifications = require('./notifications');

var _notifications2 = _interopRequireDefault(_notifications);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var preferencesSegment = new _server.Segment({
  path: '/account/preferences',
  routes: [_show2.default, _notifications2.default, _update2.default]
});

exports.default = preferencesSegment;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJlZmVyZW5jZXNTZWdtZW50IiwiU2VnbWVudCIsInBhdGgiLCJyb3V0ZXMiLCJzaG93Iiwibm90aWZpY2F0aW9ucyIsInVwZGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxxQkFBcUIsSUFBSUMsZUFBSixDQUFZO0FBQ3JDQyxRQUFNLHNCQUQrQjtBQUVyQ0MsVUFBUSxDQUNOQyxjQURNLEVBRU5DLHVCQUZNLEVBR05DLGdCQUhNO0FBRjZCLENBQVosQ0FBM0I7O2tCQVNlTixrQiIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VnbWVudCB9IGZyb20gJy4uLy4uLy4uL3NlcnZlcidcbmltcG9ydCB1cGRhdGUgZnJvbSAnLi91cGRhdGUnXG5pbXBvcnQgc2hvdyBmcm9tICcuL3Nob3cnXG5pbXBvcnQgbm90aWZpY2F0aW9ucyBmcm9tICcuL25vdGlmaWNhdGlvbnMnXG5cbmNvbnN0IHByZWZlcmVuY2VzU2VnbWVudCA9IG5ldyBTZWdtZW50KHtcbiAgcGF0aDogJy9hY2NvdW50L3ByZWZlcmVuY2VzJyxcbiAgcm91dGVzOiBbXG4gICAgc2hvdyxcbiAgICBub3RpZmljYXRpb25zLFxuICAgIHVwZGF0ZVxuICBdXG59KVxuXG5leHBvcnQgZGVmYXVsdCBwcmVmZXJlbmNlc1NlZ21lbnRcbiJdfQ==