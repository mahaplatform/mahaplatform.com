'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alert = undefined;

var _reselect = require('reselect');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var alertsSelector = function alertsSelector(state) {
  return state.alerts;
};

var alert = exports.alert = (0, _reselect.createSelector)(alertsSelector, function (alerts) {
  return alerts.length > 0 ? _lodash2.default.sortBy(alerts, 'priority')[alerts.length - 1] : null;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiYWxlcnRzU2VsZWN0b3IiLCJzdGF0ZSIsImFsZXJ0cyIsImFsZXJ0IiwibGVuZ3RoIiwiXyIsInNvcnRCeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxpQkFBaUIsU0FBakJBLGNBQWlCO0FBQUEsU0FBU0MsTUFBTUMsTUFBZjtBQUFBLENBQXZCOztBQUVPLElBQU1DLHdCQUFRLDhCQUNuQkgsY0FEbUIsRUFFbkIsVUFBQ0UsTUFBRDtBQUFBLFNBQVlBLE9BQU9FLE1BQVAsR0FBZ0IsQ0FBaEIsR0FBb0JDLGlCQUFFQyxNQUFGLENBQVNKLE1BQVQsRUFBaUIsVUFBakIsRUFBNkJBLE9BQU9FLE1BQVAsR0FBZ0IsQ0FBN0MsQ0FBcEIsR0FBc0UsSUFBbEY7QUFBQSxDQUZtQixDQUFkIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVTZWxlY3RvciB9IGZyb20gJ3Jlc2VsZWN0J1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuXG5jb25zdCBhbGVydHNTZWxlY3RvciA9IHN0YXRlID0+IHN0YXRlLmFsZXJ0c1xuXG5leHBvcnQgY29uc3QgYWxlcnQgPSBjcmVhdGVTZWxlY3RvcihcbiAgYWxlcnRzU2VsZWN0b3IsXG4gIChhbGVydHMpID0+IGFsZXJ0cy5sZW5ndGggPiAwID8gXy5zb3J0QnkoYWxlcnRzLCAncHJpb3JpdHknKVthbGVydHMubGVuZ3RoIC0gMV0gOiBudWxsXG4pXG4iXX0=