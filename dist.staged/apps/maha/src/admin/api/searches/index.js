'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _server = require('../../../server');

var _search = require('../../../models/search');

var _search2 = _interopRequireDefault(_search);

var _search_serializer = require('../../../serializers/search_serializer');

var _search_serializer2 = _interopRequireDefault(_search_serializer);

var _clear = require('./clear');

var _clear2 = _interopRequireDefault(_clear);

var _save = require('./save');

var _save2 = _interopRequireDefault(_save);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchResources = new _server.Resources({
  allowedParams: ['text', 'route', 'extra'],
  collectionActions: [_clear2.default, _save2.default],
  defaultSort: ['-updated_at'],
  model: _search2.default,
  only: ['list'],
  ownedByUser: true,
  path: '/searches',
  serializer: _search_serializer2.default
});

exports.default = searchResources;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsic2VhcmNoUmVzb3VyY2VzIiwiUmVzb3VyY2VzIiwiYWxsb3dlZFBhcmFtcyIsImNvbGxlY3Rpb25BY3Rpb25zIiwiY2xlYXIiLCJzYXZlIiwiZGVmYXVsdFNvcnQiLCJtb2RlbCIsIlNlYXJjaCIsIm9ubHkiLCJvd25lZEJ5VXNlciIsInBhdGgiLCJzZXJpYWxpemVyIiwiU2VhcmNoU2VyaWFsaXplciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLGtCQUFrQixJQUFJQyxpQkFBSixDQUFjO0FBQ3BDQyxpQkFBZSxDQUFDLE1BQUQsRUFBUyxPQUFULEVBQWtCLE9BQWxCLENBRHFCO0FBRXBDQyxxQkFBbUIsQ0FDakJDLGVBRGlCLEVBRWpCQyxjQUZpQixDQUZpQjtBQU1wQ0MsZUFBYSxDQUFDLGFBQUQsQ0FOdUI7QUFPcENDLFNBQU9DLGdCQVA2QjtBQVFwQ0MsUUFBTSxDQUFDLE1BQUQsQ0FSOEI7QUFTcENDLGVBQWEsSUFUdUI7QUFVcENDLFFBQU0sV0FWOEI7QUFXcENDLGNBQVlDO0FBWHdCLENBQWQsQ0FBeEI7O2tCQWNlYixlIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXNvdXJjZXMgfSBmcm9tICcuLi8uLi8uLi9zZXJ2ZXInXG5pbXBvcnQgU2VhcmNoIGZyb20gJy4uLy4uLy4uL21vZGVscy9zZWFyY2gnXG5pbXBvcnQgU2VhcmNoU2VyaWFsaXplciBmcm9tICcuLi8uLi8uLi9zZXJpYWxpemVycy9zZWFyY2hfc2VyaWFsaXplcidcbmltcG9ydCBjbGVhciBmcm9tICcuL2NsZWFyJ1xuaW1wb3J0IHNhdmUgZnJvbSAnLi9zYXZlJ1xuXG5jb25zdCBzZWFyY2hSZXNvdXJjZXMgPSBuZXcgUmVzb3VyY2VzKHtcbiAgYWxsb3dlZFBhcmFtczogWyd0ZXh0JywgJ3JvdXRlJywgJ2V4dHJhJ10sXG4gIGNvbGxlY3Rpb25BY3Rpb25zOiBbXG4gICAgY2xlYXIsXG4gICAgc2F2ZSAgICBcbiAgXSxcbiAgZGVmYXVsdFNvcnQ6IFsnLXVwZGF0ZWRfYXQnXSxcbiAgbW9kZWw6IFNlYXJjaCxcbiAgb25seTogWydsaXN0J10sXG4gIG93bmVkQnlVc2VyOiB0cnVlLFxuICBwYXRoOiAnL3NlYXJjaGVzJyxcbiAgc2VyaWFsaXplcjogU2VhcmNoU2VyaWFsaXplclxufSlcblxuZXhwb3J0IGRlZmF1bHQgc2VhcmNoUmVzb3VyY2VzXG4iXX0=