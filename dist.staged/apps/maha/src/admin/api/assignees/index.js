'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _server = require('../../../server');

var _assignee = require('../../../models/assignee');

var _assignee2 = _interopRequireDefault(_assignee);

var _assignee_serializer = require('../../../serializers/assignee_serializer');

var _assignee_serializer2 = _interopRequireDefault(_assignee_serializer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assigneeResources = new _server.Resources({
  defaultSort: ['id'],
  model: _assignee2.default,
  path: '/assignees',
  only: ['list'],
  serializer: _assignee_serializer2.default,
  searchParams: ['name'],
  sortParams: ['id'],
  withRelated: ['user.photo', 'group']
});

exports.default = assigneeResources;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiYXNzaWduZWVSZXNvdXJjZXMiLCJSZXNvdXJjZXMiLCJkZWZhdWx0U29ydCIsIm1vZGVsIiwiQXNzaWduZWUiLCJwYXRoIiwib25seSIsInNlcmlhbGl6ZXIiLCJBc3NpZ25lZVNlcmlhbGl6ZXIiLCJzZWFyY2hQYXJhbXMiLCJzb3J0UGFyYW1zIiwid2l0aFJlbGF0ZWQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLG9CQUFvQixJQUFJQyxpQkFBSixDQUFjO0FBQ3RDQyxlQUFhLENBQUMsSUFBRCxDQUR5QjtBQUV0Q0MsU0FBT0Msa0JBRitCO0FBR3RDQyxRQUFNLFlBSGdDO0FBSXRDQyxRQUFNLENBQUMsTUFBRCxDQUpnQztBQUt0Q0MsY0FBWUMsNkJBTDBCO0FBTXRDQyxnQkFBYyxDQUFDLE1BQUQsQ0FOd0I7QUFPdENDLGNBQVksQ0FBQyxJQUFELENBUDBCO0FBUXRDQyxlQUFhLENBQUMsWUFBRCxFQUFjLE9BQWQ7QUFSeUIsQ0FBZCxDQUExQjs7a0JBV2VYLGlCIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXNvdXJjZXMgfSBmcm9tICcuLi8uLi8uLi9zZXJ2ZXInXG5pbXBvcnQgQXNzaWduZWUgZnJvbSAnLi4vLi4vLi4vbW9kZWxzL2Fzc2lnbmVlJ1xuaW1wb3J0IEFzc2lnbmVlU2VyaWFsaXplciBmcm9tICcuLi8uLi8uLi9zZXJpYWxpemVycy9hc3NpZ25lZV9zZXJpYWxpemVyJ1xuXG5jb25zdCBhc3NpZ25lZVJlc291cmNlcyA9IG5ldyBSZXNvdXJjZXMoe1xuICBkZWZhdWx0U29ydDogWydpZCddLFxuICBtb2RlbDogQXNzaWduZWUsXG4gIHBhdGg6ICcvYXNzaWduZWVzJyxcbiAgb25seTogWydsaXN0J10sXG4gIHNlcmlhbGl6ZXI6IEFzc2lnbmVlU2VyaWFsaXplcixcbiAgc2VhcmNoUGFyYW1zOiBbJ25hbWUnXSxcbiAgc29ydFBhcmFtczogWydpZCddLFxuICB3aXRoUmVsYXRlZDogWyd1c2VyLnBob3RvJywnZ3JvdXAnXVxufSlcblxuZXhwb3J0IGRlZmF1bHQgYXNzaWduZWVSZXNvdXJjZXNcbiJdfQ==