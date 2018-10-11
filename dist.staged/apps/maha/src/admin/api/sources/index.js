'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _server = require('../../../server');

var _source = require('../../../models/source');

var _source2 = _interopRequireDefault(_source);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var serializer = function serializer(req, trx, result) {
  return {
    id: result.get('id'),
    text: result.get('text')
  };
};

var defaultQuery = function defaultQuery(req, trx, qb) {

  qb.whereRaw('id > ?', 4);
};

var sourcesListRoute = new _server.ListRoute({
  defaultQuery: defaultQuery,
  defaultSort: 'id',
  model: _source2.default,
  ownedByTeam: false,
  path: '/profiles/sources',
  serializer: serializer
});

exports.default = sourcesListRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsic2VyaWFsaXplciIsInJlcSIsInRyeCIsInJlc3VsdCIsImlkIiwiZ2V0IiwidGV4dCIsImRlZmF1bHRRdWVyeSIsInFiIiwid2hlcmVSYXciLCJzb3VyY2VzTGlzdFJvdXRlIiwiTGlzdFJvdXRlIiwiZGVmYXVsdFNvcnQiLCJtb2RlbCIsIlNvdXJjZSIsIm93bmVkQnlUZWFtIiwicGF0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLGFBQWEsU0FBYkEsVUFBYSxDQUFDQyxHQUFELEVBQU1DLEdBQU4sRUFBV0MsTUFBWDtBQUFBLFNBQXVCO0FBQ3hDQyxRQUFJRCxPQUFPRSxHQUFQLENBQVcsSUFBWCxDQURvQztBQUV4Q0MsVUFBTUgsT0FBT0UsR0FBUCxDQUFXLE1BQVg7QUFGa0MsR0FBdkI7QUFBQSxDQUFuQjs7QUFLQSxJQUFNRSxlQUFlLFNBQWZBLFlBQWUsQ0FBQ04sR0FBRCxFQUFNQyxHQUFOLEVBQVdNLEVBQVgsRUFBa0I7O0FBRXJDQSxLQUFHQyxRQUFILENBQVksUUFBWixFQUFzQixDQUF0QjtBQUVELENBSkQ7O0FBTUEsSUFBTUMsbUJBQW1CLElBQUlDLGlCQUFKLENBQWM7QUFDckNKLDRCQURxQztBQUVyQ0ssZUFBYSxJQUZ3QjtBQUdyQ0MsU0FBT0MsZ0JBSDhCO0FBSXJDQyxlQUFhLEtBSndCO0FBS3JDQyxRQUFNLG1CQUwrQjtBQU1yQ2hCO0FBTnFDLENBQWQsQ0FBekI7O2tCQVNlVSxnQiIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGlzdFJvdXRlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmVyJ1xuaW1wb3J0IFNvdXJjZSBmcm9tICcuLi8uLi8uLi9tb2RlbHMvc291cmNlJ1xuXG5jb25zdCBzZXJpYWxpemVyID0gKHJlcSwgdHJ4LCByZXN1bHQpID0+ICh7XG4gIGlkOiByZXN1bHQuZ2V0KCdpZCcpLFxuICB0ZXh0OiByZXN1bHQuZ2V0KCd0ZXh0Jylcbn0pXG5cbmNvbnN0IGRlZmF1bHRRdWVyeSA9IChyZXEsIHRyeCwgcWIpID0+IHtcblxuICBxYi53aGVyZVJhdygnaWQgPiA/JywgNClcblxufVxuXG5jb25zdCBzb3VyY2VzTGlzdFJvdXRlID0gbmV3IExpc3RSb3V0ZSh7XG4gIGRlZmF1bHRRdWVyeSxcbiAgZGVmYXVsdFNvcnQ6ICdpZCcsXG4gIG1vZGVsOiBTb3VyY2UsXG4gIG93bmVkQnlUZWFtOiBmYWxzZSxcbiAgcGF0aDogJy9wcm9maWxlcy9zb3VyY2VzJyxcbiAgc2VyaWFsaXplclxufSlcblxuZXhwb3J0IGRlZmF1bHQgc291cmNlc0xpc3RSb3V0ZVxuIl19