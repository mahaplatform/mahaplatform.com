'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ids = exports.unassigned = undefined;

var _reselect = require('reselect');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var unfiltered = function unfiltered(state, props) {
  return {
    status: state.unassigned.status,
    records: state.unassigned.records || []
  };
};

var assigned = function assigned(state, props) {
  return {
    status: state.assigned.status,
    records: state.assigned.records || []
  };
};

var q = function q(state, props) {
  return state.q.toLowerCase();
};

var filtered = (0, _reselect.createSelector)(unfiltered, q, function (unassigned, q) {
  return {
    status: unassigned.status,
    records: unassigned.records.filter(function (record) {
      if (q.length === 0) return true;
      return record.full_name.toLowerCase().search(q) >= 0;
    })
  };
});

var unassigned = exports.unassigned = (0, _reselect.createSelector)(filtered, assigned, function (filtered, assigned) {
  return {
    status: filtered.status,
    records: filtered.records.filter(function (record) {
      return _lodash2.default.findIndex(assigned.records, { id: record.id }) < 0;
    })
  };
});

var ids = exports.ids = (0, _reselect.createSelector)(assigned, function (assigned) {
  return assigned.records.map(function (item) {
    return item.id;
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsidW5maWx0ZXJlZCIsInN0YXRlIiwicHJvcHMiLCJzdGF0dXMiLCJ1bmFzc2lnbmVkIiwicmVjb3JkcyIsImFzc2lnbmVkIiwicSIsInRvTG93ZXJDYXNlIiwiZmlsdGVyZWQiLCJmaWx0ZXIiLCJsZW5ndGgiLCJyZWNvcmQiLCJmdWxsX25hbWUiLCJzZWFyY2giLCJfIiwiZmluZEluZGV4IiwiaWQiLCJpZHMiLCJtYXAiLCJpdGVtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLGFBQWEsU0FBYkEsVUFBYSxDQUFDQyxLQUFELEVBQVFDLEtBQVI7QUFBQSxTQUFtQjtBQUNwQ0MsWUFBUUYsTUFBTUcsVUFBTixDQUFpQkQsTUFEVztBQUVwQ0UsYUFBU0osTUFBTUcsVUFBTixDQUFpQkMsT0FBakIsSUFBNEI7QUFGRCxHQUFuQjtBQUFBLENBQW5COztBQUtBLElBQU1DLFdBQVcsU0FBWEEsUUFBVyxDQUFDTCxLQUFELEVBQVFDLEtBQVI7QUFBQSxTQUFtQjtBQUNsQ0MsWUFBUUYsTUFBTUssUUFBTixDQUFlSCxNQURXO0FBRWxDRSxhQUFTSixNQUFNSyxRQUFOLENBQWVELE9BQWYsSUFBMEI7QUFGRCxHQUFuQjtBQUFBLENBQWpCOztBQUtBLElBQU1FLElBQUksU0FBSkEsQ0FBSSxDQUFDTixLQUFELEVBQVFDLEtBQVI7QUFBQSxTQUFrQkQsTUFBTU0sQ0FBTixDQUFRQyxXQUFSLEVBQWxCO0FBQUEsQ0FBVjs7QUFFQSxJQUFNQyxXQUFXLDhCQUNmVCxVQURlLEVBRWZPLENBRmUsRUFHZixVQUFDSCxVQUFELEVBQWFHLENBQWI7QUFBQSxTQUFvQjtBQUNsQkosWUFBUUMsV0FBV0QsTUFERDtBQUVsQkUsYUFBU0QsV0FBV0MsT0FBWCxDQUFtQkssTUFBbkIsQ0FBMEIsa0JBQVU7QUFDM0MsVUFBR0gsRUFBRUksTUFBRixLQUFhLENBQWhCLEVBQW1CLE9BQU8sSUFBUDtBQUNuQixhQUFPQyxPQUFPQyxTQUFQLENBQWlCTCxXQUFqQixHQUErQk0sTUFBL0IsQ0FBc0NQLENBQXRDLEtBQTRDLENBQW5EO0FBQ0QsS0FIUTtBQUZTLEdBQXBCO0FBQUEsQ0FIZSxDQUFqQjs7QUFZTyxJQUFNSCxrQ0FBYSw4QkFDeEJLLFFBRHdCLEVBRXhCSCxRQUZ3QixFQUd4QixVQUFDRyxRQUFELEVBQVdILFFBQVg7QUFBQSxTQUF5QjtBQUN2QkgsWUFBUU0sU0FBU04sTUFETTtBQUV2QkUsYUFBU0ksU0FBU0osT0FBVCxDQUFpQkssTUFBakIsQ0FBd0Isa0JBQVU7QUFDekMsYUFBT0ssaUJBQUVDLFNBQUYsQ0FBWVYsU0FBU0QsT0FBckIsRUFBOEIsRUFBRVksSUFBSUwsT0FBT0ssRUFBYixFQUE5QixJQUFtRCxDQUExRDtBQUNELEtBRlE7QUFGYyxHQUF6QjtBQUFBLENBSHdCLENBQW5COztBQVdBLElBQU1DLG9CQUFNLDhCQUNqQlosUUFEaUIsRUFFakIsVUFBQ0EsUUFBRDtBQUFBLFNBQWNBLFNBQVNELE9BQVQsQ0FBaUJjLEdBQWpCLENBQXFCO0FBQUEsV0FBUUMsS0FBS0gsRUFBYjtBQUFBLEdBQXJCLENBQWQ7QUFBQSxDQUZpQixDQUFaIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVTZWxlY3RvciB9IGZyb20gJ3Jlc2VsZWN0J1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuXG5jb25zdCB1bmZpbHRlcmVkID0gKHN0YXRlLCBwcm9wcykgPT4gKHtcbiAgc3RhdHVzOiBzdGF0ZS51bmFzc2lnbmVkLnN0YXR1cyxcbiAgcmVjb3Jkczogc3RhdGUudW5hc3NpZ25lZC5yZWNvcmRzIHx8IFtdXG59KVxuXG5jb25zdCBhc3NpZ25lZCA9IChzdGF0ZSwgcHJvcHMpID0+ICh7XG4gIHN0YXR1czogc3RhdGUuYXNzaWduZWQuc3RhdHVzLFxuICByZWNvcmRzOiBzdGF0ZS5hc3NpZ25lZC5yZWNvcmRzIHx8IFtdXG59KVxuXG5jb25zdCBxID0gKHN0YXRlLCBwcm9wcykgPT4gc3RhdGUucS50b0xvd2VyQ2FzZSgpXG5cbmNvbnN0IGZpbHRlcmVkID0gY3JlYXRlU2VsZWN0b3IoXG4gIHVuZmlsdGVyZWQsXG4gIHEsXG4gICh1bmFzc2lnbmVkLCBxKSA9PiAoe1xuICAgIHN0YXR1czogdW5hc3NpZ25lZC5zdGF0dXMsXG4gICAgcmVjb3JkczogdW5hc3NpZ25lZC5yZWNvcmRzLmZpbHRlcihyZWNvcmQgPT4ge1xuICAgICAgaWYocS5sZW5ndGggPT09IDApIHJldHVybiB0cnVlXG4gICAgICByZXR1cm4gcmVjb3JkLmZ1bGxfbmFtZS50b0xvd2VyQ2FzZSgpLnNlYXJjaChxKSA+PSAwXG4gICAgfSlcbiAgfSlcbilcblxuZXhwb3J0IGNvbnN0IHVuYXNzaWduZWQgPSBjcmVhdGVTZWxlY3RvcihcbiAgZmlsdGVyZWQsXG4gIGFzc2lnbmVkLFxuICAoZmlsdGVyZWQsIGFzc2lnbmVkKSA9PiAoe1xuICAgIHN0YXR1czogZmlsdGVyZWQuc3RhdHVzLFxuICAgIHJlY29yZHM6IGZpbHRlcmVkLnJlY29yZHMuZmlsdGVyKHJlY29yZCA9PiB7XG4gICAgICByZXR1cm4gXy5maW5kSW5kZXgoYXNzaWduZWQucmVjb3JkcywgeyBpZDogcmVjb3JkLmlkIH0pIDwgMFxuICAgIH0pXG4gIH0pXG4pXG5cbmV4cG9ydCBjb25zdCBpZHMgPSBjcmVhdGVTZWxlY3RvcihcbiAgYXNzaWduZWQsXG4gIChhc3NpZ25lZCkgPT4gYXNzaWduZWQucmVjb3Jkcy5tYXAoaXRlbSA9PiBpdGVtLmlkKVxuKVxuIl19