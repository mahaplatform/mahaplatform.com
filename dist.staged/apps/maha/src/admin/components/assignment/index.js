'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxRubberstamp = require('redux-rubberstamp');

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _assignment = require('./assignment');

var _assignment2 = _interopRequireDefault(_assignment);

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

var _selectors = require('./selectors');

var selectors = _interopRequireWildcard(_selectors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reduxRubberstamp.Factory)({
  namespace: 'maha.assignment',
  component: _assignment2.default,
  reducer: _reducer2.default,
  actions: actions,
  selectors: selectors
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiYWN0aW9ucyIsInNlbGVjdG9ycyIsIm5hbWVzcGFjZSIsImNvbXBvbmVudCIsImFzc2lnbm1lbnQiLCJyZWR1Y2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0lBQVlBLE87O0FBQ1o7O0lBQVlDLFM7Ozs7OztrQkFFRywrQkFBUTtBQUNyQkMsYUFBVyxpQkFEVTtBQUVyQkMsYUFBV0Msb0JBRlU7QUFHckJDLDRCQUhxQjtBQUlyQkwsa0JBSnFCO0FBS3JCQztBQUxxQixDQUFSLEMiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZhY3RvcnkgfSBmcm9tICdyZWR1eC1ydWJiZXJzdGFtcCdcbmltcG9ydCByZWR1Y2VyIGZyb20gJy4vcmVkdWNlcidcbmltcG9ydCBhc3NpZ25tZW50IGZyb20gJy4vYXNzaWdubWVudCdcbmltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnLi9hY3Rpb25zJ1xuaW1wb3J0ICogYXMgc2VsZWN0b3JzIGZyb20gJy4vc2VsZWN0b3JzJ1xuXG5leHBvcnQgZGVmYXVsdCBGYWN0b3J5KHtcbiAgbmFtZXNwYWNlOiAnbWFoYS5hc3NpZ25tZW50JyxcbiAgY29tcG9uZW50OiBhc3NpZ25tZW50LFxuICByZWR1Y2VyLFxuICBhY3Rpb25zLFxuICBzZWxlY3RvcnNcbn0pXG4iXX0=