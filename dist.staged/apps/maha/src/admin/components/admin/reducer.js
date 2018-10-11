'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INITIAL_STATE = {
  active: null,
  apps: null,
  fingerprint: null,
  status: 'pending',
  teams: null,
  user: null,
  presence: [],
  unseen: 0
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments[1];


  switch (action.type) {

    case 'LOAD_ADMIN_REQUEST':
      return (0, _extends3.default)({}, state, {
        status: 'loading'
      });

    case 'LOAD_ADMIN_SUCCESS':
      return (0, _extends3.default)({}, state, {
        fingerprint: _lodash2.default.random(100000000, 999999999).toString(36)
      }, action.value || { active: null, teams: [] }, {
        status: 'success'
      });

    case 'LOAD_ADMIN_FAILURE':
      return (0, _extends3.default)({}, state, {
        status: 'failure'
      });

    case 'ADD_TEAM':
      return (0, _extends3.default)({}, state, {
        active: state.teams ? state.teams.length : 0,
        teams: [].concat((0, _toConsumableArray3.default)(state.teams), [(0, _extends3.default)({}, action.team, {
          token: action.token,
          user: action.user
        })])
      });

    case 'SIGNIN':
      return (0, _extends3.default)({}, state, {
        active: action.index,
        teams: [].concat((0, _toConsumableArray3.default)(state.teams.slice(0, action.index)), [(0, _extends3.default)({}, state.teams[action.index], {
          token: action.token
        })], (0, _toConsumableArray3.default)(state.teams.slice(action.index + 1, state.teams.length)))
      });

    case 'SIGNOUT_SUCCESS':
      return (0, _extends3.default)({}, state, {
        active: null,
        teams: [].concat((0, _toConsumableArray3.default)(state.teams.slice(0, state.active)), [_lodash2.default.omit(state.teams[state.active], ['token'])], (0, _toConsumableArray3.default)(state.teams.slice(state.active + 1, state.teams.length)))
      });

    case 'REMOVE_TEAM':
      return (0, _extends3.default)({}, state, {
        teams: state.teams.filter(function (team, index) {
          return index !== action.index;
        })
      });

    case 'REMOVE_ALL_TEAMS':
      return (0, _extends3.default)({}, state, {
        teams: []
      });

    case 'SET_PRESENCE':
      return (0, _extends3.default)({}, state, {
        presence: action.presence
      });

    case 'CHOOSE_TEAM':
      return (0, _extends3.default)({}, state, {
        active: action.index
      });

    case 'LOAD_SESSION_SUCCESS':
      return (0, _extends3.default)({}, state, {
        teams: [].concat((0, _toConsumableArray3.default)(state.teams.slice(0, state.active)), [(0, _extends3.default)({}, state.teams[state.active], action.result.data.team, {
          user: action.result.data.user
        })], (0, _toConsumableArray3.default)(state.teams.slice(state.active + 1, state.teams.length))),
        apps: action.result.data.apps,
        user: action.result.data.user
      });

    case 'REMOVE_SESSION':
      return (0, _extends3.default)({}, state, {
        apps: null,
        user: null
      });

    case 'UPDATE_SESSION':
      return (0, _extends3.default)({}, state, action.session);

    case 'UPDATE_UNSEEN':
      return (0, _extends3.default)({}, state, {
        unseen: state.unseen + action.difference
      });

    default:
      return state;
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiSU5JVElBTF9TVEFURSIsImFjdGl2ZSIsImFwcHMiLCJmaW5nZXJwcmludCIsInN0YXR1cyIsInRlYW1zIiwidXNlciIsInByZXNlbmNlIiwidW5zZWVuIiwic3RhdGUiLCJhY3Rpb24iLCJ0eXBlIiwiXyIsInJhbmRvbSIsInRvU3RyaW5nIiwidmFsdWUiLCJsZW5ndGgiLCJ0ZWFtIiwidG9rZW4iLCJpbmRleCIsInNsaWNlIiwib21pdCIsImZpbHRlciIsInJlc3VsdCIsImRhdGEiLCJzZXNzaW9uIiwiZGlmZmVyZW5jZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0FBRUEsSUFBTUEsZ0JBQWdCO0FBQ3BCQyxVQUFRLElBRFk7QUFFcEJDLFFBQU0sSUFGYztBQUdwQkMsZUFBYSxJQUhPO0FBSXBCQyxVQUFRLFNBSlk7QUFLcEJDLFNBQU8sSUFMYTtBQU1wQkMsUUFBTSxJQU5jO0FBT3BCQyxZQUFVLEVBUFU7QUFRcEJDLFVBQVE7QUFSWSxDQUF0Qjs7a0JBV2UsWUFBbUM7QUFBQSxNQUFsQ0MsS0FBa0MsdUVBQTFCVCxhQUEwQjtBQUFBLE1BQVhVLE1BQVc7OztBQUVoRCxVQUFRQSxPQUFPQyxJQUFmOztBQUVBLFNBQUssb0JBQUw7QUFDRSx3Q0FDS0YsS0FETDtBQUVFTCxnQkFBUTtBQUZWOztBQUtGLFNBQUssb0JBQUw7QUFDRSx3Q0FDS0ssS0FETDtBQUVFTixxQkFBYVMsaUJBQUVDLE1BQUYsQ0FBUyxTQUFULEVBQW9CLFNBQXBCLEVBQStCQyxRQUEvQixDQUF3QyxFQUF4QztBQUZmLFNBR0tKLE9BQU9LLEtBQVAsSUFBZ0IsRUFBRWQsUUFBUSxJQUFWLEVBQWdCSSxPQUFPLEVBQXZCLEVBSHJCO0FBSUVELGdCQUFRO0FBSlY7O0FBT0YsU0FBSyxvQkFBTDtBQUNFLHdDQUNLSyxLQURMO0FBRUVMLGdCQUFRO0FBRlY7O0FBS0YsU0FBSyxVQUFMO0FBQ0Usd0NBQ0tLLEtBREw7QUFFRVIsZ0JBQVFRLE1BQU1KLEtBQU4sR0FBY0ksTUFBTUosS0FBTixDQUFZVyxNQUExQixHQUFtQyxDQUY3QztBQUdFWCwwREFDS0ksTUFBTUosS0FEWCwrQkFHT0ssT0FBT08sSUFIZDtBQUlJQyxpQkFBT1IsT0FBT1EsS0FKbEI7QUFLSVosZ0JBQU1JLE9BQU9KO0FBTGpCO0FBSEY7O0FBYUYsU0FBSyxRQUFMO0FBQ0Usd0NBQ0tHLEtBREw7QUFFRVIsZ0JBQVFTLE9BQU9TLEtBRmpCO0FBR0VkLDBEQUNLSSxNQUFNSixLQUFOLENBQVllLEtBQVosQ0FBa0IsQ0FBbEIsRUFBcUJWLE9BQU9TLEtBQTVCLENBREwsK0JBR09WLE1BQU1KLEtBQU4sQ0FBWUssT0FBT1MsS0FBbkIsQ0FIUDtBQUlJRCxpQkFBT1IsT0FBT1E7QUFKbEIsOENBTUtULE1BQU1KLEtBQU4sQ0FBWWUsS0FBWixDQUFrQlYsT0FBT1MsS0FBUCxHQUFlLENBQWpDLEVBQW9DVixNQUFNSixLQUFOLENBQVlXLE1BQWhELENBTkw7QUFIRjs7QUFhRixTQUFLLGlCQUFMO0FBQ0Usd0NBQ0tQLEtBREw7QUFFRVIsZ0JBQVEsSUFGVjtBQUdFSSwwREFDS0ksTUFBTUosS0FBTixDQUFZZSxLQUFaLENBQWtCLENBQWxCLEVBQXFCWCxNQUFNUixNQUEzQixDQURMLElBRUVXLGlCQUFFUyxJQUFGLENBQU9aLE1BQU1KLEtBQU4sQ0FBWUksTUFBTVIsTUFBbEIsQ0FBUCxFQUFrQyxDQUFDLE9BQUQsQ0FBbEMsQ0FGRixvQ0FHS1EsTUFBTUosS0FBTixDQUFZZSxLQUFaLENBQWtCWCxNQUFNUixNQUFOLEdBQWUsQ0FBakMsRUFBb0NRLE1BQU1KLEtBQU4sQ0FBWVcsTUFBaEQsQ0FITDtBQUhGOztBQVVGLFNBQUssYUFBTDtBQUNFLHdDQUNLUCxLQURMO0FBRUVKLGVBQU9JLE1BQU1KLEtBQU4sQ0FBWWlCLE1BQVosQ0FBbUIsVUFBQ0wsSUFBRCxFQUFPRSxLQUFQO0FBQUEsaUJBQWtCQSxVQUFVVCxPQUFPUyxLQUFuQztBQUFBLFNBQW5CO0FBRlQ7O0FBS0YsU0FBSyxrQkFBTDtBQUNFLHdDQUNLVixLQURMO0FBRUVKLGVBQU87QUFGVDs7QUFLRixTQUFLLGNBQUw7QUFDRSx3Q0FDS0ksS0FETDtBQUVFRixrQkFBVUcsT0FBT0g7QUFGbkI7O0FBS0YsU0FBSyxhQUFMO0FBQ0Usd0NBQ0tFLEtBREw7QUFFRVIsZ0JBQVFTLE9BQU9TO0FBRmpCOztBQUtGLFNBQUssc0JBQUw7QUFDRSx3Q0FDS1YsS0FETDtBQUVFSiwwREFDS0ksTUFBTUosS0FBTixDQUFZZSxLQUFaLENBQWtCLENBQWxCLEVBQXFCWCxNQUFNUixNQUEzQixDQURMLCtCQUdPUSxNQUFNSixLQUFOLENBQVlJLE1BQU1SLE1BQWxCLENBSFAsRUFJT1MsT0FBT2EsTUFBUCxDQUFjQyxJQUFkLENBQW1CUCxJQUoxQjtBQUtJWCxnQkFBTUksT0FBT2EsTUFBUCxDQUFjQyxJQUFkLENBQW1CbEI7QUFMN0IsOENBT0tHLE1BQU1KLEtBQU4sQ0FBWWUsS0FBWixDQUFrQlgsTUFBTVIsTUFBTixHQUFlLENBQWpDLEVBQW9DUSxNQUFNSixLQUFOLENBQVlXLE1BQWhELENBUEwsRUFGRjtBQVdFZCxjQUFNUSxPQUFPYSxNQUFQLENBQWNDLElBQWQsQ0FBbUJ0QixJQVgzQjtBQVlFSSxjQUFNSSxPQUFPYSxNQUFQLENBQWNDLElBQWQsQ0FBbUJsQjtBQVozQjs7QUFlRixTQUFLLGdCQUFMO0FBQ0Usd0NBQ0tHLEtBREw7QUFFRVAsY0FBTSxJQUZSO0FBR0VJLGNBQU07QUFIUjs7QUFNRixTQUFLLGdCQUFMO0FBQ0Usd0NBQ0tHLEtBREwsRUFFS0MsT0FBT2UsT0FGWjs7QUFLRixTQUFLLGVBQUw7QUFDRSx3Q0FDS2hCLEtBREw7QUFFRUQsZ0JBQVFDLE1BQU1ELE1BQU4sR0FBZUUsT0FBT2dCO0FBRmhDOztBQUtGO0FBQ0UsYUFBT2pCLEtBQVA7QUF6SEY7QUE0SEQsQyIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuXG5jb25zdCBJTklUSUFMX1NUQVRFID0ge1xuICBhY3RpdmU6IG51bGwsXG4gIGFwcHM6IG51bGwsXG4gIGZpbmdlcnByaW50OiBudWxsLFxuICBzdGF0dXM6ICdwZW5kaW5nJyxcbiAgdGVhbXM6IG51bGwsXG4gIHVzZXI6IG51bGwsXG4gIHByZXNlbmNlOiBbXSxcbiAgdW5zZWVuOiAwXG59XG5cbmV4cG9ydCBkZWZhdWx0IChzdGF0ZSA9IElOSVRJQUxfU1RBVEUsIGFjdGlvbikgPT4ge1xuXG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcblxuICBjYXNlICdMT0FEX0FETUlOX1JFUVVFU1QnOlxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIHN0YXR1czogJ2xvYWRpbmcnXG4gICAgfVxuXG4gIGNhc2UgJ0xPQURfQURNSU5fU1VDQ0VTUyc6XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgZmluZ2VycHJpbnQ6IF8ucmFuZG9tKDEwMDAwMDAwMCwgOTk5OTk5OTk5KS50b1N0cmluZygzNiksXG4gICAgICAuLi5hY3Rpb24udmFsdWUgfHwgeyBhY3RpdmU6IG51bGwsIHRlYW1zOiBbXSB9LFxuICAgICAgc3RhdHVzOiAnc3VjY2VzcydcbiAgICB9XG5cbiAgY2FzZSAnTE9BRF9BRE1JTl9GQUlMVVJFJzpcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBzdGF0dXM6ICdmYWlsdXJlJ1xuICAgIH1cblxuICBjYXNlICdBRERfVEVBTSc6XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgYWN0aXZlOiBzdGF0ZS50ZWFtcyA/IHN0YXRlLnRlYW1zLmxlbmd0aCA6IDAsXG4gICAgICB0ZWFtczogW1xuICAgICAgICAuLi5zdGF0ZS50ZWFtcyxcbiAgICAgICAge1xuICAgICAgICAgIC4uLmFjdGlvbi50ZWFtLFxuICAgICAgICAgIHRva2VuOiBhY3Rpb24udG9rZW4sXG4gICAgICAgICAgdXNlcjogYWN0aW9uLnVzZXJcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cblxuICBjYXNlICdTSUdOSU4nOlxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGFjdGl2ZTogYWN0aW9uLmluZGV4LFxuICAgICAgdGVhbXM6IFtcbiAgICAgICAgLi4uc3RhdGUudGVhbXMuc2xpY2UoMCwgYWN0aW9uLmluZGV4KSxcbiAgICAgICAge1xuICAgICAgICAgIC4uLnN0YXRlLnRlYW1zW2FjdGlvbi5pbmRleF0sXG4gICAgICAgICAgdG9rZW46IGFjdGlvbi50b2tlblxuICAgICAgICB9LFxuICAgICAgICAuLi5zdGF0ZS50ZWFtcy5zbGljZShhY3Rpb24uaW5kZXggKyAxLCBzdGF0ZS50ZWFtcy5sZW5ndGgpXG4gICAgICBdXG4gICAgfVxuXG4gIGNhc2UgJ1NJR05PVVRfU1VDQ0VTUyc6XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgYWN0aXZlOiBudWxsLFxuICAgICAgdGVhbXM6IFtcbiAgICAgICAgLi4uc3RhdGUudGVhbXMuc2xpY2UoMCwgc3RhdGUuYWN0aXZlKSxcbiAgICAgICAgXy5vbWl0KHN0YXRlLnRlYW1zW3N0YXRlLmFjdGl2ZV0sIFsndG9rZW4nXSksXG4gICAgICAgIC4uLnN0YXRlLnRlYW1zLnNsaWNlKHN0YXRlLmFjdGl2ZSArIDEsIHN0YXRlLnRlYW1zLmxlbmd0aClcbiAgICAgIF1cbiAgICB9XG5cbiAgY2FzZSAnUkVNT1ZFX1RFQU0nOlxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIHRlYW1zOiBzdGF0ZS50ZWFtcy5maWx0ZXIoKHRlYW0sIGluZGV4KSA9PiAoaW5kZXggIT09IGFjdGlvbi5pbmRleCkpXG4gICAgfVxuXG4gIGNhc2UgJ1JFTU9WRV9BTExfVEVBTVMnOlxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIHRlYW1zOiBbXVxuICAgIH1cblxuICBjYXNlICdTRVRfUFJFU0VOQ0UnOlxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIHByZXNlbmNlOiBhY3Rpb24ucHJlc2VuY2VcbiAgICB9XG5cbiAgY2FzZSAnQ0hPT1NFX1RFQU0nOlxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGFjdGl2ZTogYWN0aW9uLmluZGV4XG4gICAgfVxuXG4gIGNhc2UgJ0xPQURfU0VTU0lPTl9TVUNDRVNTJzpcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICB0ZWFtczogW1xuICAgICAgICAuLi5zdGF0ZS50ZWFtcy5zbGljZSgwLCBzdGF0ZS5hY3RpdmUpLFxuICAgICAgICB7XG4gICAgICAgICAgLi4uc3RhdGUudGVhbXNbc3RhdGUuYWN0aXZlXSxcbiAgICAgICAgICAuLi5hY3Rpb24ucmVzdWx0LmRhdGEudGVhbSxcbiAgICAgICAgICB1c2VyOiBhY3Rpb24ucmVzdWx0LmRhdGEudXNlclxuICAgICAgICB9LFxuICAgICAgICAuLi5zdGF0ZS50ZWFtcy5zbGljZShzdGF0ZS5hY3RpdmUgKyAxLCBzdGF0ZS50ZWFtcy5sZW5ndGgpXG4gICAgICBdLFxuICAgICAgYXBwczogYWN0aW9uLnJlc3VsdC5kYXRhLmFwcHMsXG4gICAgICB1c2VyOiBhY3Rpb24ucmVzdWx0LmRhdGEudXNlclxuICAgIH1cblxuICBjYXNlICdSRU1PVkVfU0VTU0lPTic6XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgYXBwczogbnVsbCxcbiAgICAgIHVzZXI6IG51bGxcbiAgICB9XG5cbiAgY2FzZSAnVVBEQVRFX1NFU1NJT04nOlxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIC4uLmFjdGlvbi5zZXNzaW9uXG4gICAgfVxuXG4gIGNhc2UgJ1VQREFURV9VTlNFRU4nOlxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIHVuc2Vlbjogc3RhdGUudW5zZWVuICsgYWN0aW9uLmRpZmZlcmVuY2VcbiAgICB9XG5cbiAgZGVmYXVsdDpcbiAgICByZXR1cm4gc3RhdGVcbiAgfVxuXG59XG4iXX0=