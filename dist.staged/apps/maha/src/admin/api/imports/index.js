'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _server = require('../../../server');

var _import = require('../../../models/import');

var _import2 = _interopRequireDefault(_import);

var _import_serializer = require('../../../serializers/import_serializer');

var _import_serializer2 = _interopRequireDefault(_import_serializer);

var _preview = require('./preview');

var _preview2 = _interopRequireDefault(_preview);

var _parse = require('./parse');

var _parse2 = _interopRequireDefault(_parse);

var _process = require('./process');

var _process2 = _interopRequireDefault(_process);

var _omiterrors = require('./omiterrors');

var _omiterrors2 = _interopRequireDefault(_omiterrors);

var _fields = require('./fields');

var _fields2 = _interopRequireDefault(_fields);

var _tables = require('./tables');

var _tables2 = _interopRequireDefault(_tables);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var activity = function activity(story) {
  return function (req, trx, result, options) {
    return {
      story: story,
      object: result,
      url: '/admin/imports/' + result.get('id')
    };
  };
};

var activities = {
  create: activity('created {object}'),
  destroy: activity('deleted {object}')
};

var importResources = new _server.Resources({
  activities: activities,
  allowedParams: ['object_type', 'asset_id', 'stage', 'delimiter', 'headers', 'mapping', 'name', 'strategy'],
  collectionActions: [_fields2.default, _template2.default, _tables2.default],
  defaultSort: '-created_at',
  dependents: [{ relationship: 'items', strategy: 'destroy' }],
  filterParams: ['object_type', 'stage'],
  model: _import2.default,
  memberActions: [_preview2.default, _parse2.default, _process2.default, _omiterrors2.default],
  ownedByUser: true,
  path: '/imports',
  serializer: _import_serializer2.default,
  withRelated: ['asset', 'user.photo']
});

exports.default = importResources;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiYWN0aXZpdHkiLCJyZXEiLCJ0cngiLCJyZXN1bHQiLCJvcHRpb25zIiwic3RvcnkiLCJvYmplY3QiLCJ1cmwiLCJnZXQiLCJhY3Rpdml0aWVzIiwiY3JlYXRlIiwiZGVzdHJveSIsImltcG9ydFJlc291cmNlcyIsIlJlc291cmNlcyIsImFsbG93ZWRQYXJhbXMiLCJjb2xsZWN0aW9uQWN0aW9ucyIsImZpZWxkcyIsInRlbXBsYXRlIiwidGFibGVzIiwiZGVmYXVsdFNvcnQiLCJkZXBlbmRlbnRzIiwicmVsYXRpb25zaGlwIiwic3RyYXRlZ3kiLCJmaWx0ZXJQYXJhbXMiLCJtb2RlbCIsIkltcG9ydCIsIm1lbWJlckFjdGlvbnMiLCJwcmV2aWV3IiwicGFyc2UiLCJwcm9jZXNzcyIsIm9taXRlcnJvcnMiLCJvd25lZEJ5VXNlciIsInBhdGgiLCJzZXJpYWxpemVyIiwiSW1wb3J0U2VyaWFsaXplciIsIndpdGhSZWxhdGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLFdBQVcsU0FBWEEsUUFBVztBQUFBLFNBQVMsVUFBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQVdDLE1BQVgsRUFBbUJDLE9BQW5CO0FBQUEsV0FBZ0M7QUFDeERDLGtCQUR3RDtBQUV4REMsY0FBUUgsTUFGZ0Q7QUFHeERJLCtCQUF1QkosT0FBT0ssR0FBUCxDQUFXLElBQVg7QUFIaUMsS0FBaEM7QUFBQSxHQUFUO0FBQUEsQ0FBakI7O0FBTUEsSUFBTUMsYUFBYTtBQUNqQkMsVUFBUVYsU0FBUyxrQkFBVCxDQURTO0FBRWpCVyxXQUFTWCxTQUFTLGtCQUFUO0FBRlEsQ0FBbkI7O0FBS0EsSUFBTVksa0JBQWtCLElBQUlDLGlCQUFKLENBQWM7QUFDcENKLHdCQURvQztBQUVwQ0ssaUJBQWUsQ0FBQyxhQUFELEVBQWUsVUFBZixFQUEwQixPQUExQixFQUFrQyxXQUFsQyxFQUE4QyxTQUE5QyxFQUF3RCxTQUF4RCxFQUFrRSxNQUFsRSxFQUF5RSxVQUF6RSxDQUZxQjtBQUdwQ0MscUJBQW1CLENBQ2pCQyxnQkFEaUIsRUFFakJDLGtCQUZpQixFQUdqQkMsZ0JBSGlCLENBSGlCO0FBUXBDQyxlQUFhLGFBUnVCO0FBU3BDQyxjQUFZLENBQ1YsRUFBRUMsY0FBYyxPQUFoQixFQUF5QkMsVUFBVSxTQUFuQyxFQURVLENBVHdCO0FBWXBDQyxnQkFBYyxDQUFDLGFBQUQsRUFBZSxPQUFmLENBWnNCO0FBYXBDQyxTQUFPQyxnQkFiNkI7QUFjcENDLGlCQUFlLENBQ2JDLGlCQURhLEVBRWJDLGVBRmEsRUFHYkMsaUJBSGEsRUFJYkMsb0JBSmEsQ0FkcUI7QUFvQnBDQyxlQUFhLElBcEJ1QjtBQXFCcENDLFFBQU0sVUFyQjhCO0FBc0JwQ0MsY0FBWUMsMkJBdEJ3QjtBQXVCcENDLGVBQWEsQ0FBQyxPQUFELEVBQVMsWUFBVDtBQXZCdUIsQ0FBZCxDQUF4Qjs7a0JBMEJldkIsZSIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVzb3VyY2VzIH0gZnJvbSAnLi4vLi4vLi4vc2VydmVyJ1xuaW1wb3J0IEltcG9ydCBmcm9tICcuLi8uLi8uLi9tb2RlbHMvaW1wb3J0J1xuaW1wb3J0IEltcG9ydFNlcmlhbGl6ZXIgZnJvbSAnLi4vLi4vLi4vc2VyaWFsaXplcnMvaW1wb3J0X3NlcmlhbGl6ZXInXG5pbXBvcnQgcHJldmlldyBmcm9tICcuL3ByZXZpZXcnXG5pbXBvcnQgcGFyc2UgZnJvbSAnLi9wYXJzZSdcbmltcG9ydCBwcm9jZXNzcyBmcm9tICcuL3Byb2Nlc3MnXG5pbXBvcnQgb21pdGVycm9ycyBmcm9tICcuL29taXRlcnJvcnMnXG5pbXBvcnQgZmllbGRzIGZyb20gJy4vZmllbGRzJ1xuaW1wb3J0IHRhYmxlcyBmcm9tICcuL3RhYmxlcydcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL3RlbXBsYXRlJ1xuXG5jb25zdCBhY3Rpdml0eSA9IHN0b3J5ID0+IChyZXEsIHRyeCwgcmVzdWx0LCBvcHRpb25zKSA9PiAoe1xuICBzdG9yeSxcbiAgb2JqZWN0OiByZXN1bHQsXG4gIHVybDogYC9hZG1pbi9pbXBvcnRzLyR7cmVzdWx0LmdldCgnaWQnKX1gXG59KVxuXG5jb25zdCBhY3Rpdml0aWVzID0ge1xuICBjcmVhdGU6IGFjdGl2aXR5KCdjcmVhdGVkIHtvYmplY3R9JyksXG4gIGRlc3Ryb3k6IGFjdGl2aXR5KCdkZWxldGVkIHtvYmplY3R9Jylcbn1cblxuY29uc3QgaW1wb3J0UmVzb3VyY2VzID0gbmV3IFJlc291cmNlcyh7XG4gIGFjdGl2aXRpZXMsXG4gIGFsbG93ZWRQYXJhbXM6IFsnb2JqZWN0X3R5cGUnLCdhc3NldF9pZCcsJ3N0YWdlJywnZGVsaW1pdGVyJywnaGVhZGVycycsJ21hcHBpbmcnLCduYW1lJywnc3RyYXRlZ3knXSxcbiAgY29sbGVjdGlvbkFjdGlvbnM6IFtcbiAgICBmaWVsZHMsXG4gICAgdGVtcGxhdGUsXG4gICAgdGFibGVzXG4gIF0sXG4gIGRlZmF1bHRTb3J0OiAnLWNyZWF0ZWRfYXQnLFxuICBkZXBlbmRlbnRzOiBbXG4gICAgeyByZWxhdGlvbnNoaXA6ICdpdGVtcycsIHN0cmF0ZWd5OiAnZGVzdHJveScgfVxuICBdLFxuICBmaWx0ZXJQYXJhbXM6IFsnb2JqZWN0X3R5cGUnLCdzdGFnZSddLFxuICBtb2RlbDogSW1wb3J0LFxuICBtZW1iZXJBY3Rpb25zOiBbXG4gICAgcHJldmlldyxcbiAgICBwYXJzZSxcbiAgICBwcm9jZXNzcyxcbiAgICBvbWl0ZXJyb3JzXG4gIF0sXG4gIG93bmVkQnlVc2VyOiB0cnVlLFxuICBwYXRoOiAnL2ltcG9ydHMnLFxuICBzZXJpYWxpemVyOiBJbXBvcnRTZXJpYWxpemVyLFxuICB3aXRoUmVsYXRlZDogWydhc3NldCcsJ3VzZXIucGhvdG8nXVxufSlcblxuZXhwb3J0IGRlZmF1bHQgaW1wb3J0UmVzb3VyY2VzXG4iXX0=