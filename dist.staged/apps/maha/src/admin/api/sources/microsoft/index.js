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

var microsoftSegment = new _server.Segment({
  routes: [_authorize2.default, _create2.default, _list2.default]
});

exports.default = microsoftSegment;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsibWljcm9zb2Z0U2VnbWVudCIsIlNlZ21lbnQiLCJyb3V0ZXMiLCJhdXRob3JpemUiLCJjcmVhdGUiLCJsaXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLG1CQUFtQixJQUFJQyxlQUFKLENBQVk7QUFDbkNDLFVBQVEsQ0FDTkMsbUJBRE0sRUFFTkMsZ0JBRk0sRUFHTkMsY0FITTtBQUQyQixDQUFaLENBQXpCOztrQkFRZUwsZ0IiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlZ21lbnQgfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2ZXInXG5pbXBvcnQgYXV0aG9yaXplIGZyb20gJy4vYXV0aG9yaXplJ1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuL2NyZWF0ZSdcbmltcG9ydCBsaXN0IGZyb20gJy4vbGlzdCdcblxuY29uc3QgbWljcm9zb2Z0U2VnbWVudCA9IG5ldyBTZWdtZW50KHtcbiAgcm91dGVzOiBbXG4gICAgYXV0aG9yaXplLFxuICAgIGNyZWF0ZSxcbiAgICBsaXN0XG4gIF1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IG1pY3Jvc29mdFNlZ21lbnRcbiJdfQ==