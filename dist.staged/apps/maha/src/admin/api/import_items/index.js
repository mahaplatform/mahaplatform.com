'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _server = require('../../../server');

var _import_item = require('../../../models/import_item');

var _import_item2 = _interopRequireDefault(_import_item);

var _import_item_serializer = require('../../../serializers/import_item_serializer');

var _import_item_serializer2 = _interopRequireDefault(_import_item_serializer);

var _omit = require('./omit');

var _omit2 = _interopRequireDefault(_omit);

var _fix = require('./fix');

var _fix2 = _interopRequireDefault(_fix);

var _flat = require('flat');

var _flat2 = _interopRequireDefault(_flat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultQuery = function defaultQuery(req, trx, qb) {

  qb.where({ import_id: req.params.import_id });
};

var refresh = function refresh(req, trx, result, options) {
  return '/admin/imports/' + result.id;
};

var importItemResources = new _server.Resources({
  defaultQuery: defaultQuery,
  defaultSort: 'id',
  allowedParams: ['values'],
  filterParams: ['is_valid', 'is_omitted', 'is_nonunique', 'is_duplicate'],
  model: _import_item2.default,
  memberActions: [_omit2.default, _fix2.default],
  only: ['list', 'show', 'edit', 'update'],
  ownedByTeam: false,
  path: '/imports/:import_id/items',
  refresh: {
    update: refresh
  },
  serializer: _import_item_serializer2.default
});

exports.default = importItemResources;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiZGVmYXVsdFF1ZXJ5IiwicmVxIiwidHJ4IiwicWIiLCJ3aGVyZSIsImltcG9ydF9pZCIsInBhcmFtcyIsInJlZnJlc2giLCJyZXN1bHQiLCJvcHRpb25zIiwiaWQiLCJpbXBvcnRJdGVtUmVzb3VyY2VzIiwiUmVzb3VyY2VzIiwiZGVmYXVsdFNvcnQiLCJhbGxvd2VkUGFyYW1zIiwiZmlsdGVyUGFyYW1zIiwibW9kZWwiLCJJbXBvcnRJdGVtIiwibWVtYmVyQWN0aW9ucyIsIm9taXQiLCJmaXgiLCJvbmx5Iiwib3duZWRCeVRlYW0iLCJwYXRoIiwidXBkYXRlIiwic2VyaWFsaXplciIsIkltcG9ydEl0ZW1TZXJpYWxpemVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxlQUFlLFNBQWZBLFlBQWUsQ0FBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQVdDLEVBQVgsRUFBa0I7O0FBRXJDQSxLQUFHQyxLQUFILENBQVMsRUFBRUMsV0FBV0osSUFBSUssTUFBSixDQUFXRCxTQUF4QixFQUFUO0FBRUQsQ0FKRDs7QUFNQSxJQUFNRSxVQUFVLFNBQVZBLE9BQVUsQ0FBQ04sR0FBRCxFQUFNQyxHQUFOLEVBQVdNLE1BQVgsRUFBbUJDLE9BQW5CO0FBQUEsNkJBQWlERCxPQUFPRSxFQUF4RDtBQUFBLENBQWhCOztBQUVBLElBQU1DLHNCQUFzQixJQUFJQyxpQkFBSixDQUFjO0FBQ3hDWiw0QkFEd0M7QUFFeENhLGVBQWEsSUFGMkI7QUFHeENDLGlCQUFlLENBQUMsUUFBRCxDQUh5QjtBQUl4Q0MsZ0JBQWEsQ0FBQyxVQUFELEVBQVksWUFBWixFQUF5QixjQUF6QixFQUF3QyxjQUF4QyxDQUoyQjtBQUt4Q0MsU0FBT0MscUJBTGlDO0FBTXhDQyxpQkFBZSxDQUNiQyxjQURhLEVBRWJDLGFBRmEsQ0FOeUI7QUFVeENDLFFBQU0sQ0FBQyxNQUFELEVBQVEsTUFBUixFQUFlLE1BQWYsRUFBc0IsUUFBdEIsQ0FWa0M7QUFXeENDLGVBQWEsS0FYMkI7QUFZeENDLFFBQU0sMkJBWmtDO0FBYXhDaEIsV0FBUztBQUNQaUIsWUFBUWpCO0FBREQsR0FiK0I7QUFnQnhDa0IsY0FBWUM7QUFoQjRCLENBQWQsQ0FBNUI7O2tCQW1CZWYsbUIiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlc291cmNlcyB9IGZyb20gJy4uLy4uLy4uL3NlcnZlcidcbmltcG9ydCBJbXBvcnRJdGVtIGZyb20gJy4uLy4uLy4uL21vZGVscy9pbXBvcnRfaXRlbSdcbmltcG9ydCBJbXBvcnRJdGVtU2VyaWFsaXplciBmcm9tICcuLi8uLi8uLi9zZXJpYWxpemVycy9pbXBvcnRfaXRlbV9zZXJpYWxpemVyJ1xuaW1wb3J0IG9taXQgZnJvbSAnLi9vbWl0J1xuaW1wb3J0IGZpeCBmcm9tICcuL2ZpeCdcbmltcG9ydCBmbGF0IGZyb20gJ2ZsYXQnXG5cbmNvbnN0IGRlZmF1bHRRdWVyeSA9IChyZXEsIHRyeCwgcWIpID0+IHtcblxuICBxYi53aGVyZSh7IGltcG9ydF9pZDogcmVxLnBhcmFtcy5pbXBvcnRfaWQgfSlcblxufVxuXG5jb25zdCByZWZyZXNoID0gKHJlcSwgdHJ4LCByZXN1bHQsIG9wdGlvbnMpID0+IGAvYWRtaW4vaW1wb3J0cy8ke3Jlc3VsdC5pZH1gXG5cbmNvbnN0IGltcG9ydEl0ZW1SZXNvdXJjZXMgPSBuZXcgUmVzb3VyY2VzKHtcbiAgZGVmYXVsdFF1ZXJ5LFxuICBkZWZhdWx0U29ydDogJ2lkJyxcbiAgYWxsb3dlZFBhcmFtczogWyd2YWx1ZXMnXSxcbiAgZmlsdGVyUGFyYW1zOlsnaXNfdmFsaWQnLCdpc19vbWl0dGVkJywnaXNfbm9udW5pcXVlJywnaXNfZHVwbGljYXRlJ10sXG4gIG1vZGVsOiBJbXBvcnRJdGVtLFxuICBtZW1iZXJBY3Rpb25zOiBbXG4gICAgb21pdCxcbiAgICBmaXhcbiAgXSxcbiAgb25seTogWydsaXN0Jywnc2hvdycsJ2VkaXQnLCd1cGRhdGUnXSxcbiAgb3duZWRCeVRlYW06IGZhbHNlLFxuICBwYXRoOiAnL2ltcG9ydHMvOmltcG9ydF9pZC9pdGVtcycsXG4gIHJlZnJlc2g6IHtcbiAgICB1cGRhdGU6IHJlZnJlc2hcbiAgfSxcbiAgc2VyaWFsaXplcjogSW1wb3J0SXRlbVNlcmlhbGl6ZXJcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IGltcG9ydEl0ZW1SZXNvdXJjZXNcbiJdfQ==