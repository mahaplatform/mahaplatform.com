'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxRubberstamp = require('redux-rubberstamp');

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _admin = require('./admin');

var _admin2 = _interopRequireDefault(_admin);

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

var _selectors = require('./selectors');

var selectors = _interopRequireWildcard(_selectors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reduxRubberstamp.Singleton)({
  namespace: 'maha.admin',
  component: _admin2.default,
  reducer: _reducer2.default,
  actions: actions,
  selectors: selectors
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiYWN0aW9ucyIsInNlbGVjdG9ycyIsIm5hbWVzcGFjZSIsImNvbXBvbmVudCIsImFkbWluIiwicmVkdWNlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztJQUFZQSxPOztBQUNaOztJQUFZQyxTOzs7Ozs7a0JBRUcsaUNBQVU7QUFDdkJDLGFBQVcsWUFEWTtBQUV2QkMsYUFBV0MsZUFGWTtBQUd2QkMsNEJBSHVCO0FBSXZCTCxrQkFKdUI7QUFLdkJDO0FBTHVCLENBQVYsQyIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2luZ2xldG9uIH0gZnJvbSAncmVkdXgtcnViYmVyc3RhbXAnXG5pbXBvcnQgcmVkdWNlciBmcm9tICcuL3JlZHVjZXInXG5pbXBvcnQgYWRtaW4gZnJvbSAnLi9hZG1pbidcbmltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnLi9hY3Rpb25zJ1xuaW1wb3J0ICogYXMgc2VsZWN0b3JzIGZyb20gJy4vc2VsZWN0b3JzJ1xuXG5leHBvcnQgZGVmYXVsdCBTaW5nbGV0b24oe1xuICBuYW1lc3BhY2U6ICdtYWhhLmFkbWluJyxcbiAgY29tcG9uZW50OiBhZG1pbixcbiAgcmVkdWNlcixcbiAgYWN0aW9ucyxcbiAgc2VsZWN0b3JzXG59KVxuIl19