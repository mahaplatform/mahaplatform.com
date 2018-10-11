'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxRubberstamp = require('redux-rubberstamp');

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _activate = require('./activate');

var _activate2 = _interopRequireDefault(_activate);

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reduxRubberstamp.Singleton)({
  namespace: 'maha.activate',
  component: _activate2.default,
  reducer: _reducer2.default,
  actions: actions
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiYWN0aW9ucyIsIm5hbWVzcGFjZSIsImNvbXBvbmVudCIsImFjdGl2YXRlIiwicmVkdWNlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztJQUFZQSxPOzs7Ozs7a0JBRUcsaUNBQVU7QUFDdkJDLGFBQVcsZUFEWTtBQUV2QkMsYUFBV0Msa0JBRlk7QUFHdkJDLDRCQUh1QjtBQUl2Qko7QUFKdUIsQ0FBVixDIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaW5nbGV0b24gfSBmcm9tICdyZWR1eC1ydWJiZXJzdGFtcCdcbmltcG9ydCByZWR1Y2VyIGZyb20gJy4vcmVkdWNlcidcbmltcG9ydCBhY3RpdmF0ZSBmcm9tICcuL2FjdGl2YXRlJ1xuaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICcuL2FjdGlvbnMnXG5cbmV4cG9ydCBkZWZhdWx0IFNpbmdsZXRvbih7XG4gIG5hbWVzcGFjZTogJ21haGEuYWN0aXZhdGUnLFxuICBjb21wb25lbnQ6IGFjdGl2YXRlLFxuICByZWR1Y2VyLFxuICBhY3Rpb25zXG59KVxuIl19