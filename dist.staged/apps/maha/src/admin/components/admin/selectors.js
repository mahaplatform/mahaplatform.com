'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.team = undefined;

var _reselect = require('reselect');

var teamsSelector = function teamsSelector(state) {
  return state.teams || [];
};

var activeSelector = function activeSelector(state) {
  return state.active;
};

var team = exports.team = (0, _reselect.createSelector)(teamsSelector, activeSelector, function (teams, active) {
  return teams !== null && active !== null ? teams[active] : null;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsidGVhbXNTZWxlY3RvciIsInN0YXRlIiwidGVhbXMiLCJhY3RpdmVTZWxlY3RvciIsImFjdGl2ZSIsInRlYW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQSxJQUFNQSxnQkFBZ0IsU0FBaEJBLGFBQWdCO0FBQUEsU0FBU0MsTUFBTUMsS0FBTixJQUFlLEVBQXhCO0FBQUEsQ0FBdEI7O0FBRUEsSUFBTUMsaUJBQWlCLFNBQWpCQSxjQUFpQjtBQUFBLFNBQVNGLE1BQU1HLE1BQWY7QUFBQSxDQUF2Qjs7QUFFTyxJQUFNQyxzQkFBTyw4QkFDbEJMLGFBRGtCLEVBRWxCRyxjQUZrQixFQUdsQixVQUFDRCxLQUFELEVBQVFFLE1BQVI7QUFBQSxTQUFvQkYsVUFBVSxJQUFWLElBQWtCRSxXQUFXLElBQTlCLEdBQXNDRixNQUFNRSxNQUFOLENBQXRDLEdBQXNELElBQXpFO0FBQUEsQ0FIa0IsQ0FBYiIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlU2VsZWN0b3IgfSBmcm9tICdyZXNlbGVjdCdcblxuY29uc3QgdGVhbXNTZWxlY3RvciA9IHN0YXRlID0+IHN0YXRlLnRlYW1zIHx8IFtdXG5cbmNvbnN0IGFjdGl2ZVNlbGVjdG9yID0gc3RhdGUgPT4gc3RhdGUuYWN0aXZlXG5cbmV4cG9ydCBjb25zdCB0ZWFtID0gY3JlYXRlU2VsZWN0b3IoXG4gIHRlYW1zU2VsZWN0b3IsXG4gIGFjdGl2ZVNlbGVjdG9yLFxuICAodGVhbXMsIGFjdGl2ZSkgPT4gKHRlYW1zICE9PSBudWxsICYmIGFjdGl2ZSAhPT0gbnVsbCkgPyB0ZWFtc1thY3RpdmVdIDogbnVsbFxuKVxuIl19