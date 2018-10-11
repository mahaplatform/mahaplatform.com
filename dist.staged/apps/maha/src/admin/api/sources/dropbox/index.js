'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _server = require('../../../../server');

var _authorize = require('./authorize');

var _authorize2 = _interopRequireDefault(_authorize);

var _create = require('./create');

var _create2 = _interopRequireDefault(_create);

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dropboxSegment = new _server.Segment({
  routes: [_authorize2.default, _create2.default, _list2.default]
});

exports.default = dropboxSegment;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiZHJvcGJveFNlZ21lbnQiLCJTZWdtZW50Iiwicm91dGVzIiwiYXV0aG9yaXplIiwiY3JlYXRlIiwibGlzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxpQkFBaUIsSUFBSUMsZUFBSixDQUFZO0FBQ2pDQyxVQUFRLENBQ05DLG1CQURNLEVBRU5DLGdCQUZNLEVBR05DLGNBSE07QUFEeUIsQ0FBWixDQUF2Qjs7a0JBUWVMLGMiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlZ21lbnQgfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2ZXInXG5pbXBvcnQgYXV0aG9yaXplIGZyb20gJy4vYXV0aG9yaXplJ1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuL2NyZWF0ZSdcbmltcG9ydCBsaXN0IGZyb20gJy4vbGlzdCdcblxuY29uc3QgZHJvcGJveFNlZ21lbnQgPSBuZXcgU2VnbWVudCh7XG4gIHJvdXRlczogW1xuICAgIGF1dGhvcml6ZSxcbiAgICBjcmVhdGUsXG4gICAgbGlzdFxuICBdXG59KVxuXG5leHBvcnQgZGVmYXVsdCBkcm9wYm94U2VnbWVudFxuIl19