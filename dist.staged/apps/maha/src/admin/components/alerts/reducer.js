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
  alerts: []
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments[1];


  switch (action.type) {

    case 'PUSH':
      return (0, _extends3.default)({}, state, {
        alerts: [].concat((0, _toConsumableArray3.default)(state.alerts), [action.alert])
      });

    case 'POP':
      return (0, _extends3.default)({}, state, {
        alerts: state.alerts.slice(0, -1)
      });

    default:
      return state;
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiSU5JVElBTF9TVEFURSIsImFsZXJ0cyIsInN0YXRlIiwiYWN0aW9uIiwidHlwZSIsImFsZXJ0Iiwic2xpY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU8sSUFBTUEsd0NBQWdCO0FBQzNCQyxVQUFRO0FBRG1CLENBQXRCOztrQkFJUSxZQUFtQztBQUFBLE1BQWxDQyxLQUFrQyx1RUFBMUJGLGFBQTBCO0FBQUEsTUFBWEcsTUFBVzs7O0FBRWhELFVBQVFBLE9BQU9DLElBQWY7O0FBRUEsU0FBSyxNQUFMO0FBQ0Usd0NBQ0tGLEtBREw7QUFFRUQsMkRBQ0tDLE1BQU1ELE1BRFgsSUFFRUUsT0FBT0UsS0FGVDtBQUZGOztBQVFGLFNBQUssS0FBTDtBQUNFLHdDQUNLSCxLQURMO0FBRUVELGdCQUFRQyxNQUFNRCxNQUFOLENBQWFLLEtBQWIsQ0FBbUIsQ0FBbkIsRUFBcUIsQ0FBQyxDQUF0QjtBQUZWOztBQUtGO0FBQ0UsYUFBT0osS0FBUDtBQWxCRjtBQXFCRCxDIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgSU5JVElBTF9TVEFURSA9IHtcbiAgYWxlcnRzOiBbXVxufVxuXG5leHBvcnQgZGVmYXVsdCAoc3RhdGUgPSBJTklUSUFMX1NUQVRFLCBhY3Rpb24pID0+IHtcblxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG5cbiAgY2FzZSAnUFVTSCc6XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgYWxlcnRzOiBbXG4gICAgICAgIC4uLnN0YXRlLmFsZXJ0cyxcbiAgICAgICAgYWN0aW9uLmFsZXJ0XG4gICAgICBdXG4gICAgfVxuXG4gIGNhc2UgJ1BPUCc6XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgYWxlcnRzOiBzdGF0ZS5hbGVydHMuc2xpY2UoMCwtMSlcbiAgICB9XG5cbiAgZGVmYXVsdDpcbiAgICByZXR1cm4gc3RhdGVcbiAgfVxuXG59XG4iXX0=