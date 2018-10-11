'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _server = require('../server');

var _account = require('./api/account');

var _account2 = _interopRequireDefault(_account);

var _activate = require('./api/activate');

var _activate2 = _interopRequireDefault(_activate);

var _assets = require('./api/assets');

var _assets2 = _interopRequireDefault(_assets);

var _assignees = require('./api/assignees');

var _assignees2 = _interopRequireDefault(_assignees);

var _box = require('./api/sources/box');

var _box2 = _interopRequireDefault(_box);

var _check = require('./api/sources/check');

var _check2 = _interopRequireDefault(_check);

var _comments = require('./api/comments');

var _comments2 = _interopRequireDefault(_comments);

var _dropbox = require('./api/sources/dropbox');

var _dropbox2 = _interopRequireDefault(_dropbox);

var _facebook = require('./api/sources/facebook');

var _facebook2 = _interopRequireDefault(_facebook);

var _google = require('./api/sources/google');

var _google2 = _interopRequireDefault(_google);

var _microsoft = require('./api/sources/microsoft');

var _microsoft2 = _interopRequireDefault(_microsoft);

var _help = require('./api/help');

var _help2 = _interopRequireDefault(_help);

var _imports = require('./api/imports');

var _imports2 = _interopRequireDefault(_imports);

var _import_items = require('./api/import_items');

var _import_items2 = _interopRequireDefault(_import_items);

var _instagram = require('./api/sources/instagram');

var _instagram2 = _interopRequireDefault(_instagram);

var _notifications = require('./api/notifications');

var _notifications2 = _interopRequireDefault(_notifications);

var _notification_methods = require('./api/notification_methods');

var _notification_methods2 = _interopRequireDefault(_notification_methods);

var _profiles = require('./api/profiles');

var _profiles2 = _interopRequireDefault(_profiles);

var _sources = require('./api/sources');

var _sources2 = _interopRequireDefault(_sources);

var _preferences = require('./api/preferences');

var _preferences2 = _interopRequireDefault(_preferences);

var _push = require('./api/push');

var _push2 = _interopRequireDefault(_push);

var _react = require('./api/react');

var _react2 = _interopRequireDefault(_react);

var _reset = require('./api/reset');

var _reset2 = _interopRequireDefault(_reset);

var _reviews = require('./api/reviews');

var _reviews2 = _interopRequireDefault(_reviews);

var _searches = require('./api/searches');

var _searches2 = _interopRequireDefault(_searches);

var _search = require('./api/search');

var _search2 = _interopRequireDefault(_search);

var _session = require('./api/session');

var _session2 = _interopRequireDefault(_session);

var _signin = require('./api/signin');

var _signin2 = _interopRequireDefault(_signin);

var _signout = require('./api/signout');

var _signout2 = _interopRequireDefault(_signout);

var _stars = require('./api/stars');

var _stars2 = _interopRequireDefault(_stars);

var _users = require('./api/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authenticated = new _server.Segment({
  authenticated: true,
  routes: [_account2.default, _assets2.default, _assignees2.default, _box2.default, _check2.default, _comments2.default, _dropbox2.default, _facebook2.default, _google2.default, _help2.default, _microsoft2.default, _imports2.default, _import_items2.default, _instagram2.default, _notifications2.default, _notification_methods2.default, _reviews2.default, _preferences2.default, _sources2.default, _profiles2.default, _push2.default, _react2.default, _searches2.default, _search2.default, _session2.default, _signout2.default, _stars2.default, _users2.default]
});

var api = new _server.Segment({
  routes: [authenticated, _activate2.default, _signin2.default, _reset2.default]
});

exports.default = api;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiYXV0aGVudGljYXRlZCIsIlNlZ21lbnQiLCJyb3V0ZXMiLCJhY2NvdW50IiwiYXNzZXRzIiwiYXNzaWduZWVzIiwiYm94IiwiY2hlY2siLCJjb21tZW50cyIsImRyb3Bib3giLCJmYWNlYm9vayIsImdvb2dsZSIsImhlbHAiLCJtaWNyb3NvZnQiLCJpbXBvcnRzIiwiaW1wb3J0SXRlbXMiLCJpbnN0YWdyYW0iLCJub3RpZmljYXRpb25zIiwibm90aWZpY2F0aW9uTWV0aG9kcyIsInJldmlld3MiLCJwcmVmZXJlbmNlcyIsInNvdXJjZXMiLCJwcm9maWxlcyIsInB1c2giLCJyZWFjdCIsInNlYXJjaGVzIiwic2VhcmNoIiwic2Vzc2lvbiIsInNpZ25vdXQiLCJzdGFycyIsInVzZXJzIiwiYXBpIiwiYWN0aXZhdGUiLCJzaWduaW4iLCJyZXNldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLGdCQUFnQixJQUFJQyxlQUFKLENBQVk7QUFDaENELGlCQUFlLElBRGlCO0FBRWhDRSxVQUFRLENBQ05DLGlCQURNLEVBRU5DLGdCQUZNLEVBR05DLG1CQUhNLEVBSU5DLGFBSk0sRUFLTkMsZUFMTSxFQU1OQyxrQkFOTSxFQU9OQyxpQkFQTSxFQVFOQyxrQkFSTSxFQVNOQyxnQkFUTSxFQVVOQyxjQVZNLEVBV05DLG1CQVhNLEVBWU5DLGlCQVpNLEVBYU5DLHNCQWJNLEVBY05DLG1CQWRNLEVBZU5DLHVCQWZNLEVBZ0JOQyw4QkFoQk0sRUFpQk5DLGlCQWpCTSxFQWtCTkMscUJBbEJNLEVBbUJOQyxpQkFuQk0sRUFvQk5DLGtCQXBCTSxFQXFCTkMsY0FyQk0sRUFzQk5DLGVBdEJNLEVBdUJOQyxrQkF2Qk0sRUF3Qk5DLGdCQXhCTSxFQXlCTkMsaUJBekJNLEVBMEJOQyxpQkExQk0sRUEyQk5DLGVBM0JNLEVBNEJOQyxlQTVCTTtBQUZ3QixDQUFaLENBQXRCOztBQWtDQSxJQUFNQyxNQUFNLElBQUk5QixlQUFKLENBQVk7QUFDdEJDLFVBQVEsQ0FDTkYsYUFETSxFQUVOZ0Msa0JBRk0sRUFHTkMsZ0JBSE0sRUFJTkMsZUFKTTtBQURjLENBQVosQ0FBWjs7a0JBU2VILEciLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlZ21lbnQgfSBmcm9tICcuLi9zZXJ2ZXInXG5pbXBvcnQgYWNjb3VudCBmcm9tICcuL2FwaS9hY2NvdW50J1xuaW1wb3J0IGFjdGl2YXRlIGZyb20gJy4vYXBpL2FjdGl2YXRlJ1xuaW1wb3J0IGFzc2V0cyBmcm9tICcuL2FwaS9hc3NldHMnXG5pbXBvcnQgYXNzaWduZWVzIGZyb20gJy4vYXBpL2Fzc2lnbmVlcydcbmltcG9ydCBib3ggZnJvbSAnLi9hcGkvc291cmNlcy9ib3gnXG5pbXBvcnQgY2hlY2sgZnJvbSAnLi9hcGkvc291cmNlcy9jaGVjaydcbmltcG9ydCBjb21tZW50cyBmcm9tICcuL2FwaS9jb21tZW50cydcbmltcG9ydCBkcm9wYm94IGZyb20gJy4vYXBpL3NvdXJjZXMvZHJvcGJveCdcbmltcG9ydCBmYWNlYm9vayBmcm9tICcuL2FwaS9zb3VyY2VzL2ZhY2Vib29rJ1xuaW1wb3J0IGdvb2dsZSBmcm9tICcuL2FwaS9zb3VyY2VzL2dvb2dsZSdcbmltcG9ydCBtaWNyb3NvZnQgZnJvbSAnLi9hcGkvc291cmNlcy9taWNyb3NvZnQnXG5pbXBvcnQgaGVscCBmcm9tICcuL2FwaS9oZWxwJ1xuaW1wb3J0IGltcG9ydHMgZnJvbSAnLi9hcGkvaW1wb3J0cydcbmltcG9ydCBpbXBvcnRJdGVtcyBmcm9tICcuL2FwaS9pbXBvcnRfaXRlbXMnXG5pbXBvcnQgaW5zdGFncmFtIGZyb20gJy4vYXBpL3NvdXJjZXMvaW5zdGFncmFtJ1xuaW1wb3J0IG5vdGlmaWNhdGlvbnMgZnJvbSAnLi9hcGkvbm90aWZpY2F0aW9ucydcbmltcG9ydCBub3RpZmljYXRpb25NZXRob2RzIGZyb20gJy4vYXBpL25vdGlmaWNhdGlvbl9tZXRob2RzJ1xuaW1wb3J0IHByb2ZpbGVzIGZyb20gJy4vYXBpL3Byb2ZpbGVzJ1xuaW1wb3J0IHNvdXJjZXMgZnJvbSAnLi9hcGkvc291cmNlcydcbmltcG9ydCBwcmVmZXJlbmNlcyBmcm9tICcuL2FwaS9wcmVmZXJlbmNlcydcbmltcG9ydCBwdXNoIGZyb20gJy4vYXBpL3B1c2gnXG5pbXBvcnQgcmVhY3QgZnJvbSAnLi9hcGkvcmVhY3QnXG5pbXBvcnQgcmVzZXQgZnJvbSAnLi9hcGkvcmVzZXQnXG5pbXBvcnQgcmV2aWV3cyBmcm9tICcuL2FwaS9yZXZpZXdzJ1xuaW1wb3J0IHNlYXJjaGVzIGZyb20gJy4vYXBpL3NlYXJjaGVzJ1xuaW1wb3J0IHNlYXJjaCBmcm9tICcuL2FwaS9zZWFyY2gnXG5pbXBvcnQgc2Vzc2lvbiBmcm9tICcuL2FwaS9zZXNzaW9uJ1xuaW1wb3J0IHNpZ25pbiBmcm9tICcuL2FwaS9zaWduaW4nXG5pbXBvcnQgc2lnbm91dCBmcm9tICcuL2FwaS9zaWdub3V0J1xuaW1wb3J0IHN0YXJzIGZyb20gJy4vYXBpL3N0YXJzJ1xuaW1wb3J0IHVzZXJzIGZyb20gJy4vYXBpL3VzZXJzJ1xuXG5jb25zdCBhdXRoZW50aWNhdGVkID0gbmV3IFNlZ21lbnQoe1xuICBhdXRoZW50aWNhdGVkOiB0cnVlLFxuICByb3V0ZXM6IFtcbiAgICBhY2NvdW50LFxuICAgIGFzc2V0cyxcbiAgICBhc3NpZ25lZXMsXG4gICAgYm94LFxuICAgIGNoZWNrLFxuICAgIGNvbW1lbnRzLFxuICAgIGRyb3Bib3gsXG4gICAgZmFjZWJvb2ssXG4gICAgZ29vZ2xlLFxuICAgIGhlbHAsXG4gICAgbWljcm9zb2Z0LFxuICAgIGltcG9ydHMsXG4gICAgaW1wb3J0SXRlbXMsXG4gICAgaW5zdGFncmFtLFxuICAgIG5vdGlmaWNhdGlvbnMsXG4gICAgbm90aWZpY2F0aW9uTWV0aG9kcyxcbiAgICByZXZpZXdzLFxuICAgIHByZWZlcmVuY2VzLFxuICAgIHNvdXJjZXMsXG4gICAgcHJvZmlsZXMsXG4gICAgcHVzaCxcbiAgICByZWFjdCxcbiAgICBzZWFyY2hlcyxcbiAgICBzZWFyY2gsXG4gICAgc2Vzc2lvbixcbiAgICBzaWdub3V0LFxuICAgIHN0YXJzLFxuICAgIHVzZXJzXG4gIF1cbn0pXG5cbmNvbnN0IGFwaSA9IG5ldyBTZWdtZW50KHtcbiAgcm91dGVzOiBbXG4gICAgYXV0aGVudGljYXRlZCxcbiAgICBhY3RpdmF0ZSxcbiAgICBzaWduaW4sXG4gICAgcmVzZXRcbiAgXVxufSlcblxuZXhwb3J0IGRlZmF1bHQgYXBpXG4iXX0=