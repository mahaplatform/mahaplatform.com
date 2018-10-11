'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INITIAL_STATE = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INITIAL_STATE = exports.INITIAL_STATE = {
  error: null,
  message: null,
  mode: 'verify',
  notification_methods: null,
  status: 'pending',
  token: null,
  team: null,
  photo_id: null,
  questions: null,
  question_id: null,
  user: null
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments[1];


  switch (action.type) {

    case 'VERIFY_REQUEST':
      return (0, _extends3.default)({}, state, {
        error: null,
        status: 'submitting',
        token: action.request.params.token
      });

    case 'PASSWORD_REQUEST':
    case 'SECURITY_REQUEST':
    case 'AVATAR_REQUEST':
    case 'NOTIFICATIONS_REQUEST':
      return (0, _extends3.default)({}, state, {
        error: null,
        status: 'submitting'
      });

    case 'PASSWORD_FAILURE':
    case 'SECURITY_FAILURE':
    case 'AVATAR_FAILURE':
    case 'NOTIFICATIONS_FAILURE':
      return (0, _extends3.default)({}, state, {
        status: 'failure',
        error: action.result.meta.message
      });

    case 'VERIFY_FAILURE':
      return (0, _extends3.default)({}, state, {
        mode: 'invalid',
        status: 'failure',
        message: action.result.meta.message
      });

    case 'VERIFY_SUCCESS':
      return (0, _extends3.default)({}, state, {
        mode: 'welcome',
        questions: action.result.data.questions,
        notification_methods: action.result.data.notification_methods,
        status: 'success',
        user: action.result.data.user
      });

    case 'SECURITY_SUCCESS':
      return (0, _extends3.default)({}, state, {
        status: 'success',
        mode: 'password'
      });

    case 'PASSWORD_SUCCESS':
      return (0, _extends3.default)({}, state, {
        photo_id: action.result.data.photo_id,
        status: 'success',
        mode: 'avatar'
      });

    case 'AVATAR_SUCCESS':
      return (0, _extends3.default)({}, state, {
        mode: 'notifications'
      });

    case 'NOTIFICATIONS_SUCCESS':
      return (0, _extends3.default)({}, state, {
        team: action.result.data.team,
        token: action.result.data.token,
        user: action.result.data.user,
        mode: 'complete'
      });

    case 'CHANGE_MODE':
      return (0, _extends3.default)({}, state, {
        mode: action.mode
      });

    case 'CHOOSE_QUESTION':
      return (0, _extends3.default)({}, state, {
        mode: 'answer',
        question_id: action.id
      });

    case 'SET_PHOTO_ID':
      return (0, _extends3.default)({}, state, {
        photo_id: action.id
      });

    case 'RESET':
      return INITIAL_STATE;

    default:
      return state;
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiSU5JVElBTF9TVEFURSIsImVycm9yIiwibWVzc2FnZSIsIm1vZGUiLCJub3RpZmljYXRpb25fbWV0aG9kcyIsInN0YXR1cyIsInRva2VuIiwidGVhbSIsInBob3RvX2lkIiwicXVlc3Rpb25zIiwicXVlc3Rpb25faWQiLCJ1c2VyIiwic3RhdGUiLCJhY3Rpb24iLCJ0eXBlIiwicmVxdWVzdCIsInBhcmFtcyIsInJlc3VsdCIsIm1ldGEiLCJkYXRhIiwiaWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBTyxJQUFNQSx3Q0FBZ0I7QUFDM0JDLFNBQU8sSUFEb0I7QUFFM0JDLFdBQVMsSUFGa0I7QUFHM0JDLFFBQU0sUUFIcUI7QUFJM0JDLHdCQUFzQixJQUpLO0FBSzNCQyxVQUFRLFNBTG1CO0FBTTNCQyxTQUFPLElBTm9CO0FBTzNCQyxRQUFNLElBUHFCO0FBUTNCQyxZQUFVLElBUmlCO0FBUzNCQyxhQUFXLElBVGdCO0FBVTNCQyxlQUFhLElBVmM7QUFXM0JDLFFBQU07QUFYcUIsQ0FBdEI7O2tCQWNRLFlBQW1DO0FBQUEsTUFBbENDLEtBQWtDLHVFQUExQlosYUFBMEI7QUFBQSxNQUFYYSxNQUFXOzs7QUFFaEQsVUFBUUEsT0FBT0MsSUFBZjs7QUFFQSxTQUFLLGdCQUFMO0FBQ0Usd0NBQ0tGLEtBREw7QUFFRVgsZUFBTyxJQUZUO0FBR0VJLGdCQUFRLFlBSFY7QUFJRUMsZUFBT08sT0FBT0UsT0FBUCxDQUFlQyxNQUFmLENBQXNCVjtBQUovQjs7QUFPRixTQUFLLGtCQUFMO0FBQ0EsU0FBSyxrQkFBTDtBQUNBLFNBQUssZ0JBQUw7QUFDQSxTQUFLLHVCQUFMO0FBQ0Usd0NBQ0tNLEtBREw7QUFFRVgsZUFBTyxJQUZUO0FBR0VJLGdCQUFRO0FBSFY7O0FBTUYsU0FBSyxrQkFBTDtBQUNBLFNBQUssa0JBQUw7QUFDQSxTQUFLLGdCQUFMO0FBQ0EsU0FBSyx1QkFBTDtBQUNFLHdDQUNLTyxLQURMO0FBRUVQLGdCQUFRLFNBRlY7QUFHRUosZUFBT1ksT0FBT0ksTUFBUCxDQUFjQyxJQUFkLENBQW1CaEI7QUFINUI7O0FBTUYsU0FBSyxnQkFBTDtBQUNFLHdDQUNLVSxLQURMO0FBRUVULGNBQU0sU0FGUjtBQUdFRSxnQkFBUSxTQUhWO0FBSUVILGlCQUFTVyxPQUFPSSxNQUFQLENBQWNDLElBQWQsQ0FBbUJoQjtBQUo5Qjs7QUFPRixTQUFLLGdCQUFMO0FBQ0Usd0NBQ0tVLEtBREw7QUFFRVQsY0FBTSxTQUZSO0FBR0VNLG1CQUFXSSxPQUFPSSxNQUFQLENBQWNFLElBQWQsQ0FBbUJWLFNBSGhDO0FBSUVMLDhCQUFzQlMsT0FBT0ksTUFBUCxDQUFjRSxJQUFkLENBQW1CZixvQkFKM0M7QUFLRUMsZ0JBQVEsU0FMVjtBQU1FTSxjQUFNRSxPQUFPSSxNQUFQLENBQWNFLElBQWQsQ0FBbUJSO0FBTjNCOztBQVNGLFNBQUssa0JBQUw7QUFDRSx3Q0FDS0MsS0FETDtBQUVFUCxnQkFBUSxTQUZWO0FBR0VGLGNBQU07QUFIUjs7QUFNRixTQUFLLGtCQUFMO0FBQ0Usd0NBQ0tTLEtBREw7QUFFRUosa0JBQVVLLE9BQU9JLE1BQVAsQ0FBY0UsSUFBZCxDQUFtQlgsUUFGL0I7QUFHRUgsZ0JBQVEsU0FIVjtBQUlFRixjQUFNO0FBSlI7O0FBT0YsU0FBSyxnQkFBTDtBQUNFLHdDQUNLUyxLQURMO0FBRUVULGNBQU07QUFGUjs7QUFLRixTQUFLLHVCQUFMO0FBQ0Usd0NBQ0tTLEtBREw7QUFFRUwsY0FBTU0sT0FBT0ksTUFBUCxDQUFjRSxJQUFkLENBQW1CWixJQUYzQjtBQUdFRCxlQUFPTyxPQUFPSSxNQUFQLENBQWNFLElBQWQsQ0FBbUJiLEtBSDVCO0FBSUVLLGNBQU1FLE9BQU9JLE1BQVAsQ0FBY0UsSUFBZCxDQUFtQlIsSUFKM0I7QUFLRVIsY0FBTTtBQUxSOztBQVFGLFNBQUssYUFBTDtBQUNFLHdDQUNLUyxLQURMO0FBRUVULGNBQU1VLE9BQU9WO0FBRmY7O0FBS0YsU0FBSyxpQkFBTDtBQUNFLHdDQUNLUyxLQURMO0FBRUVULGNBQU0sUUFGUjtBQUdFTyxxQkFBYUcsT0FBT087QUFIdEI7O0FBTUYsU0FBSyxjQUFMO0FBQ0Usd0NBQ0tSLEtBREw7QUFFRUosa0JBQVVLLE9BQU9PO0FBRm5COztBQUtGLFNBQUssT0FBTDtBQUNFLGFBQU9wQixhQUFQOztBQUVGO0FBQ0UsYUFBT1ksS0FBUDtBQXJHRjtBQXdHRCxDIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgSU5JVElBTF9TVEFURSA9IHtcbiAgZXJyb3I6IG51bGwsXG4gIG1lc3NhZ2U6IG51bGwsXG4gIG1vZGU6ICd2ZXJpZnknLFxuICBub3RpZmljYXRpb25fbWV0aG9kczogbnVsbCxcbiAgc3RhdHVzOiAncGVuZGluZycsXG4gIHRva2VuOiBudWxsLFxuICB0ZWFtOiBudWxsLFxuICBwaG90b19pZDogbnVsbCxcbiAgcXVlc3Rpb25zOiBudWxsLFxuICBxdWVzdGlvbl9pZDogbnVsbCxcbiAgdXNlcjogbnVsbFxufVxuXG5leHBvcnQgZGVmYXVsdCAoc3RhdGUgPSBJTklUSUFMX1NUQVRFLCBhY3Rpb24pID0+IHtcblxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG5cbiAgY2FzZSAnVkVSSUZZX1JFUVVFU1QnOlxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGVycm9yOiBudWxsLFxuICAgICAgc3RhdHVzOiAnc3VibWl0dGluZycsXG4gICAgICB0b2tlbjogYWN0aW9uLnJlcXVlc3QucGFyYW1zLnRva2VuXG4gICAgfVxuXG4gIGNhc2UgJ1BBU1NXT1JEX1JFUVVFU1QnOlxuICBjYXNlICdTRUNVUklUWV9SRVFVRVNUJzpcbiAgY2FzZSAnQVZBVEFSX1JFUVVFU1QnOlxuICBjYXNlICdOT1RJRklDQVRJT05TX1JFUVVFU1QnOlxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGVycm9yOiBudWxsLFxuICAgICAgc3RhdHVzOiAnc3VibWl0dGluZydcbiAgICB9XG5cbiAgY2FzZSAnUEFTU1dPUkRfRkFJTFVSRSc6XG4gIGNhc2UgJ1NFQ1VSSVRZX0ZBSUxVUkUnOlxuICBjYXNlICdBVkFUQVJfRkFJTFVSRSc6XG4gIGNhc2UgJ05PVElGSUNBVElPTlNfRkFJTFVSRSc6XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgc3RhdHVzOiAnZmFpbHVyZScsXG4gICAgICBlcnJvcjogYWN0aW9uLnJlc3VsdC5tZXRhLm1lc3NhZ2VcbiAgICB9XG5cbiAgY2FzZSAnVkVSSUZZX0ZBSUxVUkUnOlxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIG1vZGU6ICdpbnZhbGlkJyxcbiAgICAgIHN0YXR1czogJ2ZhaWx1cmUnLFxuICAgICAgbWVzc2FnZTogYWN0aW9uLnJlc3VsdC5tZXRhLm1lc3NhZ2VcbiAgICB9XG5cbiAgY2FzZSAnVkVSSUZZX1NVQ0NFU1MnOlxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIG1vZGU6ICd3ZWxjb21lJyxcbiAgICAgIHF1ZXN0aW9uczogYWN0aW9uLnJlc3VsdC5kYXRhLnF1ZXN0aW9ucyxcbiAgICAgIG5vdGlmaWNhdGlvbl9tZXRob2RzOiBhY3Rpb24ucmVzdWx0LmRhdGEubm90aWZpY2F0aW9uX21ldGhvZHMsXG4gICAgICBzdGF0dXM6ICdzdWNjZXNzJyxcbiAgICAgIHVzZXI6IGFjdGlvbi5yZXN1bHQuZGF0YS51c2VyXG4gICAgfVxuXG4gIGNhc2UgJ1NFQ1VSSVRZX1NVQ0NFU1MnOlxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIHN0YXR1czogJ3N1Y2Nlc3MnLFxuICAgICAgbW9kZTogJ3Bhc3N3b3JkJ1xuICAgIH1cblxuICBjYXNlICdQQVNTV09SRF9TVUNDRVNTJzpcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBwaG90b19pZDogYWN0aW9uLnJlc3VsdC5kYXRhLnBob3RvX2lkLFxuICAgICAgc3RhdHVzOiAnc3VjY2VzcycsXG4gICAgICBtb2RlOiAnYXZhdGFyJ1xuICAgIH1cblxuICBjYXNlICdBVkFUQVJfU1VDQ0VTUyc6XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgbW9kZTogJ25vdGlmaWNhdGlvbnMnXG4gICAgfVxuXG4gIGNhc2UgJ05PVElGSUNBVElPTlNfU1VDQ0VTUyc6XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgdGVhbTogYWN0aW9uLnJlc3VsdC5kYXRhLnRlYW0sXG4gICAgICB0b2tlbjogYWN0aW9uLnJlc3VsdC5kYXRhLnRva2VuLFxuICAgICAgdXNlcjogYWN0aW9uLnJlc3VsdC5kYXRhLnVzZXIsXG4gICAgICBtb2RlOiAnY29tcGxldGUnXG4gICAgfVxuXG4gIGNhc2UgJ0NIQU5HRV9NT0RFJzpcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBtb2RlOiBhY3Rpb24ubW9kZVxuICAgIH1cblxuICBjYXNlICdDSE9PU0VfUVVFU1RJT04nOlxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIG1vZGU6ICdhbnN3ZXInLFxuICAgICAgcXVlc3Rpb25faWQ6IGFjdGlvbi5pZFxuICAgIH1cblxuICBjYXNlICdTRVRfUEhPVE9fSUQnOlxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIHBob3RvX2lkOiBhY3Rpb24uaWRcbiAgICB9XG5cbiAgY2FzZSAnUkVTRVQnOlxuICAgIHJldHVybiBJTklUSUFMX1NUQVRFXG5cbiAgZGVmYXVsdDpcbiAgICByZXR1cm4gc3RhdGVcbiAgfVxuXG59XG4iXX0=