'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _server = require('../../../server');

var _show = require('./show');

var _show2 = _interopRequireDefault(_show);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var helpSegment = new _server.Segment({
  routes: [_show2.default]
});

exports.default = helpSegment;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiaGVscFNlZ21lbnQiLCJTZWdtZW50Iiwicm91dGVzIiwic2hvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLGNBQWMsSUFBSUMsZUFBSixDQUFZO0FBQzlCQyxVQUFRLENBQ05DLGNBRE07QUFEc0IsQ0FBWixDQUFwQjs7a0JBTWVILFciLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlZ21lbnQgfSBmcm9tICcuLi8uLi8uLi9zZXJ2ZXInXG5pbXBvcnQgc2hvdyBmcm9tICcuL3Nob3cnXG5cbmNvbnN0IGhlbHBTZWdtZW50ID0gbmV3IFNlZ21lbnQoe1xuICByb3V0ZXM6IFtcbiAgICBzaG93XG4gIF1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IGhlbHBTZWdtZW50XG4iXX0=