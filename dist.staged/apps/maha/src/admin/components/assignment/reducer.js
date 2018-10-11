'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INITIAL_STATE = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INITIAL_STATE = exports.INITIAL_STATE = {
  adding: false,
  assigned: {
    status: 'pending',
    records: []
  },
  q: '',
  unassigned: {
    status: 'pending',
    records: []
  }
};

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments[1];


  switch (action.type) {

    case 'ADD':
      return (0, _extends3.default)({}, state, {
        adding: false,
        assigned: (0, _extends3.default)({}, state.assigned, {
          records: [].concat((0, _toConsumableArray3.default)(state.assigned.records), [action.assignee])
        })
      });

    case 'BEGIN_ADD':
      return (0, _extends3.default)({}, state, {
        adding: true
      });

    case 'FETCH_ASSIGNED_REQUEST':
      return (0, _extends3.default)({}, state, {
        assigned: (0, _extends3.default)({}, state.assigned, {
          status: 'loading'
        })
      });

    case 'FETCH_ASSIGNED_SUCCESS':
      return (0, _extends3.default)({}, state, {
        assigned: {
          records: action.result.data,
          status: 'success'
        }
      });

    case 'FETCH_UNASSIGNED_REQUEST':
      return (0, _extends3.default)({}, state, {
        unassigned: (0, _extends3.default)({}, state.unassigned, {
          status: 'loading'
        })
      });

    case 'FETCH_UNASSIGNED_SUCCESS':
      return (0, _extends3.default)({}, state, {
        unassigned: {
          records: action.result.data,
          status: 'success'
        }
      });

    case 'QUERY':
      return (0, _extends3.default)({}, state, {
        q: action.q
      });

    case 'REMOVE':
      return (0, _extends3.default)({}, state, {
        assigned: (0, _extends3.default)({}, state.assigned, {
          records: [].concat((0, _toConsumableArray3.default)(state.assigned.records.filter(function (assignment, index) {
            return index !== action.index;
          })))
        })
      });

    case 'SAVE_REQUEST':
      return (0, _extends3.default)({}, state, {
        assigned: (0, _extends3.default)({}, state.assigned, {
          status: 'saving'
        })
      });

    case 'SAVE_SUCCESS':
      return (0, _extends3.default)({}, state, {
        assigned: (0, _extends3.default)({}, state.assigned, {
          status: 'saved'
        })
      });

    case 'SET':
      return (0, _extends3.default)({}, state, {
        assigned: {
          records: action.assigned,
          status: 'success'
        }
      });

    default:
      return state;

  }
};

exports.default = reducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiSU5JVElBTF9TVEFURSIsImFkZGluZyIsImFzc2lnbmVkIiwic3RhdHVzIiwicmVjb3JkcyIsInEiLCJ1bmFzc2lnbmVkIiwicmVkdWNlciIsInN0YXRlIiwiYWN0aW9uIiwidHlwZSIsImFzc2lnbmVlIiwicmVzdWx0IiwiZGF0YSIsImZpbHRlciIsImFzc2lnbm1lbnQiLCJpbmRleCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTyxJQUFNQSx3Q0FBZ0I7QUFDM0JDLFVBQVEsS0FEbUI7QUFFM0JDLFlBQVU7QUFDUkMsWUFBUSxTQURBO0FBRVJDLGFBQVM7QUFGRCxHQUZpQjtBQU0zQkMsS0FBRyxFQU53QjtBQU8zQkMsY0FBWTtBQUNWSCxZQUFRLFNBREU7QUFFVkMsYUFBUztBQUZDO0FBUGUsQ0FBdEI7O0FBYVAsSUFBTUcsVUFBVSxTQUFWQSxPQUFVLEdBQW1DO0FBQUEsTUFBbENDLEtBQWtDLHVFQUExQlIsYUFBMEI7QUFBQSxNQUFYUyxNQUFXOzs7QUFFakQsVUFBUUEsT0FBT0MsSUFBZjs7QUFFQSxTQUFLLEtBQUw7QUFDRSx3Q0FDS0YsS0FETDtBQUVFUCxnQkFBUSxLQUZWO0FBR0VDLDZDQUNLTSxNQUFNTixRQURYO0FBRUVFLDhEQUNLSSxNQUFNTixRQUFOLENBQWVFLE9BRHBCLElBRUVLLE9BQU9FLFFBRlQ7QUFGRjtBQUhGOztBQVlGLFNBQUssV0FBTDtBQUNFLHdDQUNLSCxLQURMO0FBRUVQLGdCQUFRO0FBRlY7O0FBS0YsU0FBSyx3QkFBTDtBQUNFLHdDQUNLTyxLQURMO0FBRUVOLDZDQUNLTSxNQUFNTixRQURYO0FBRUVDLGtCQUFRO0FBRlY7QUFGRjs7QUFRRixTQUFLLHdCQUFMO0FBQ0Usd0NBQ0tLLEtBREw7QUFFRU4sa0JBQVU7QUFDUkUsbUJBQVNLLE9BQU9HLE1BQVAsQ0FBY0MsSUFEZjtBQUVSVixrQkFBUTtBQUZBO0FBRlo7O0FBUUYsU0FBSywwQkFBTDtBQUNFLHdDQUNLSyxLQURMO0FBRUVGLCtDQUNLRSxNQUFNRixVQURYO0FBRUVILGtCQUFRO0FBRlY7QUFGRjs7QUFRRixTQUFLLDBCQUFMO0FBQ0Usd0NBQ0tLLEtBREw7QUFFRUYsb0JBQVk7QUFDVkYsbUJBQVNLLE9BQU9HLE1BQVAsQ0FBY0MsSUFEYjtBQUVWVixrQkFBUTtBQUZFO0FBRmQ7O0FBUUYsU0FBSyxPQUFMO0FBQ0Usd0NBQ0tLLEtBREw7QUFFRUgsV0FBR0ksT0FBT0o7QUFGWjs7QUFLRixTQUFLLFFBQUw7QUFDRSx3Q0FDS0csS0FETDtBQUVFTiw2Q0FDS00sTUFBTU4sUUFEWDtBQUVFRSw4REFDS0ksTUFBTU4sUUFBTixDQUFlRSxPQUFmLENBQXVCVSxNQUF2QixDQUE4QixVQUFDQyxVQUFELEVBQWFDLEtBQWIsRUFBdUI7QUFDdEQsbUJBQU9BLFVBQVVQLE9BQU9PLEtBQXhCO0FBQ0QsV0FGRSxDQURMO0FBRkY7QUFGRjs7QUFZRixTQUFLLGNBQUw7QUFDRSx3Q0FDS1IsS0FETDtBQUVFTiw2Q0FDS00sTUFBTU4sUUFEWDtBQUVFQyxrQkFBUTtBQUZWO0FBRkY7O0FBUUYsU0FBSyxjQUFMO0FBQ0Usd0NBQ0tLLEtBREw7QUFFRU4sNkNBQ0tNLE1BQU1OLFFBRFg7QUFFRUMsa0JBQVE7QUFGVjtBQUZGOztBQVFGLFNBQUssS0FBTDtBQUNFLHdDQUNLSyxLQURMO0FBRUVOLGtCQUFVO0FBQ1JFLG1CQUFTSyxPQUFPUCxRQURSO0FBRVJDLGtCQUFRO0FBRkE7QUFGWjs7QUFRRjtBQUNFLGFBQU9LLEtBQVA7O0FBeEdGO0FBNEdELENBOUdEOztrQkFnSGVELE8iLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBJTklUSUFMX1NUQVRFID0ge1xuICBhZGRpbmc6IGZhbHNlLFxuICBhc3NpZ25lZDoge1xuICAgIHN0YXR1czogJ3BlbmRpbmcnLFxuICAgIHJlY29yZHM6IFtdXG4gIH0sXG4gIHE6ICcnLFxuICB1bmFzc2lnbmVkOiB7XG4gICAgc3RhdHVzOiAncGVuZGluZycsXG4gICAgcmVjb3JkczogW11cbiAgfVxufVxuXG5jb25zdCByZWR1Y2VyID0gKHN0YXRlID0gSU5JVElBTF9TVEFURSwgYWN0aW9uKSA9PiB7XG5cbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuXG4gIGNhc2UgJ0FERCc6XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgYWRkaW5nOiBmYWxzZSxcbiAgICAgIGFzc2lnbmVkOiB7XG4gICAgICAgIC4uLnN0YXRlLmFzc2lnbmVkLFxuICAgICAgICByZWNvcmRzOiBbXG4gICAgICAgICAgLi4uc3RhdGUuYXNzaWduZWQucmVjb3JkcyxcbiAgICAgICAgICBhY3Rpb24uYXNzaWduZWVcbiAgICAgICAgXVxuICAgICAgfVxuICAgIH1cblxuICBjYXNlICdCRUdJTl9BREQnOlxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGFkZGluZzogdHJ1ZVxuICAgIH1cblxuICBjYXNlICdGRVRDSF9BU1NJR05FRF9SRVFVRVNUJzpcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBhc3NpZ25lZDoge1xuICAgICAgICAuLi5zdGF0ZS5hc3NpZ25lZCxcbiAgICAgICAgc3RhdHVzOiAnbG9hZGluZydcbiAgICAgIH1cbiAgICB9XG5cbiAgY2FzZSAnRkVUQ0hfQVNTSUdORURfU1VDQ0VTUyc6XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgYXNzaWduZWQ6IHtcbiAgICAgICAgcmVjb3JkczogYWN0aW9uLnJlc3VsdC5kYXRhLFxuICAgICAgICBzdGF0dXM6ICdzdWNjZXNzJ1xuICAgICAgfVxuICAgIH1cblxuICBjYXNlICdGRVRDSF9VTkFTU0lHTkVEX1JFUVVFU1QnOlxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIHVuYXNzaWduZWQ6IHtcbiAgICAgICAgLi4uc3RhdGUudW5hc3NpZ25lZCxcbiAgICAgICAgc3RhdHVzOiAnbG9hZGluZydcbiAgICAgIH1cbiAgICB9XG5cbiAgY2FzZSAnRkVUQ0hfVU5BU1NJR05FRF9TVUNDRVNTJzpcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICB1bmFzc2lnbmVkOiB7XG4gICAgICAgIHJlY29yZHM6IGFjdGlvbi5yZXN1bHQuZGF0YSxcbiAgICAgICAgc3RhdHVzOiAnc3VjY2VzcydcbiAgICAgIH1cbiAgICB9XG5cbiAgY2FzZSAnUVVFUlknOlxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIHE6IGFjdGlvbi5xXG4gICAgfVxuXG4gIGNhc2UgJ1JFTU9WRSc6XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgYXNzaWduZWQ6IHtcbiAgICAgICAgLi4uc3RhdGUuYXNzaWduZWQsXG4gICAgICAgIHJlY29yZHM6IFtcbiAgICAgICAgICAuLi5zdGF0ZS5hc3NpZ25lZC5yZWNvcmRzLmZpbHRlcigoYXNzaWdubWVudCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpbmRleCAhPT0gYWN0aW9uLmluZGV4XG4gICAgICAgICAgfSlcbiAgICAgICAgXVxuICAgICAgfVxuICAgIH1cblxuICBjYXNlICdTQVZFX1JFUVVFU1QnOlxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGFzc2lnbmVkOiB7XG4gICAgICAgIC4uLnN0YXRlLmFzc2lnbmVkLFxuICAgICAgICBzdGF0dXM6ICdzYXZpbmcnXG4gICAgICB9XG4gICAgfVxuXG4gIGNhc2UgJ1NBVkVfU1VDQ0VTUyc6XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgYXNzaWduZWQ6IHtcbiAgICAgICAgLi4uc3RhdGUuYXNzaWduZWQsXG4gICAgICAgIHN0YXR1czogJ3NhdmVkJ1xuICAgICAgfVxuICAgIH1cblxuICBjYXNlICdTRVQnOlxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGFzc2lnbmVkOiB7XG4gICAgICAgIHJlY29yZHM6IGFjdGlvbi5hc3NpZ25lZCxcbiAgICAgICAgc3RhdHVzOiAnc3VjY2VzcydcbiAgICAgIH1cbiAgICB9XG5cbiAgZGVmYXVsdDpcbiAgICByZXR1cm4gc3RhdGVcblxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgcmVkdWNlclxuIl19