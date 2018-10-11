'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _server = require('../../../server');

var _password = require('./password');

var _password2 = _interopRequireDefault(_password);

var _update = require('./update');

var _update2 = _interopRequireDefault(_update);

var _photo = require('./photo');

var _photo2 = _interopRequireDefault(_photo);

var _show = require('./show');

var _show2 = _interopRequireDefault(_show);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var accountSegment = new _server.Segment({
  path: '/account',
  routes: [_show2.default, _update2.default, _password2.default, _photo2.default]
});

exports.default = accountSegment;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiYWNjb3VudFNlZ21lbnQiLCJTZWdtZW50IiwicGF0aCIsInJvdXRlcyIsInNob3ciLCJ1cGRhdGUiLCJwYXNzd29yZCIsInBob3RvIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsaUJBQWlCLElBQUlDLGVBQUosQ0FBWTtBQUNqQ0MsUUFBTSxVQUQyQjtBQUVqQ0MsVUFBUSxDQUNOQyxjQURNLEVBRU5DLGdCQUZNLEVBR05DLGtCQUhNLEVBSU5DLGVBSk07QUFGeUIsQ0FBWixDQUF2Qjs7a0JBVWVQLGMiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlZ21lbnQgfSBmcm9tICcuLi8uLi8uLi9zZXJ2ZXInXG5pbXBvcnQgcGFzc3dvcmQgZnJvbSAnLi9wYXNzd29yZCdcbmltcG9ydCB1cGRhdGUgZnJvbSAnLi91cGRhdGUnXG5pbXBvcnQgcGhvdG8gZnJvbSAnLi9waG90bydcbmltcG9ydCBzaG93IGZyb20gJy4vc2hvdydcblxuY29uc3QgYWNjb3VudFNlZ21lbnQgPSBuZXcgU2VnbWVudCh7XG4gIHBhdGg6ICcvYWNjb3VudCcsXG4gIHJvdXRlczogW1xuICAgIHNob3csXG4gICAgdXBkYXRlLFxuICAgIHBhc3N3b3JkLFxuICAgIHBob3RvXG4gIF1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IGFjY291bnRTZWdtZW50XG4iXX0=