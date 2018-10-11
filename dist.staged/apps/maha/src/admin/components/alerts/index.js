'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxRubberstamp = require('redux-rubberstamp');

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _alerts = require('./alerts');

var _alerts2 = _interopRequireDefault(_alerts);

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

var _selectors = require('./selectors');

var selectors = _interopRequireWildcard(_selectors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reduxRubberstamp.Singleton)({
  namespace: 'maha.alerts',
  component: _alerts2.default,
  reducer: _reducer2.default,
  actions: actions,
  selectors: selectors
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiYWN0aW9ucyIsInNlbGVjdG9ycyIsIm5hbWVzcGFjZSIsImNvbXBvbmVudCIsImFsZXJ0cyIsInJlZHVjZXIiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7SUFBWUEsTzs7QUFDWjs7SUFBWUMsUzs7Ozs7O2tCQUVHLGlDQUFVO0FBQ3ZCQyxhQUFXLGFBRFk7QUFFdkJDLGFBQVdDLGdCQUZZO0FBR3ZCQyw0QkFIdUI7QUFJdkJMLGtCQUp1QjtBQUt2QkM7QUFMdUIsQ0FBVixDIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaW5nbGV0b24gfSBmcm9tICdyZWR1eC1ydWJiZXJzdGFtcCdcbmltcG9ydCByZWR1Y2VyIGZyb20gJy4vcmVkdWNlcidcbmltcG9ydCBhbGVydHMgZnJvbSAnLi9hbGVydHMnXG5pbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJy4vYWN0aW9ucydcbmltcG9ydCAqIGFzIHNlbGVjdG9ycyBmcm9tICcuL3NlbGVjdG9ycydcblxuZXhwb3J0IGRlZmF1bHQgU2luZ2xldG9uKHtcbiAgbmFtZXNwYWNlOiAnbWFoYS5hbGVydHMnLFxuICBjb21wb25lbnQ6IGFsZXJ0cyxcbiAgcmVkdWNlcixcbiAgYWN0aW9ucyxcbiAgc2VsZWN0b3JzXG59KVxuIl19