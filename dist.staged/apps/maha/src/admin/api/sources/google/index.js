'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _server = require('../../../../server');

var _authorize = require('./authorize');

var _authorize2 = _interopRequireDefault(_authorize);

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _create = require('./create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var googleSegment = new _server.Segment({
  routes: [_authorize2.default, _create2.default, _list2.default]
});

exports.default = googleSegment;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiZ29vZ2xlU2VnbWVudCIsIlNlZ21lbnQiLCJyb3V0ZXMiLCJhdXRob3JpemUiLCJjcmVhdGUiLCJsaXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLGdCQUFnQixJQUFJQyxlQUFKLENBQVk7QUFDaENDLFVBQVEsQ0FDTkMsbUJBRE0sRUFFTkMsZ0JBRk0sRUFHTkMsY0FITTtBQUR3QixDQUFaLENBQXRCOztrQkFRZUwsYSIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VnbWVudCB9IGZyb20gJy4uLy4uLy4uLy4uL3NlcnZlcidcbmltcG9ydCBhdXRob3JpemUgZnJvbSAnLi9hdXRob3JpemUnXG5pbXBvcnQgbGlzdCBmcm9tICcuL2xpc3QnXG5pbXBvcnQgY3JlYXRlIGZyb20gJy4vY3JlYXRlJ1xuXG5jb25zdCBnb29nbGVTZWdtZW50ID0gbmV3IFNlZ21lbnQoe1xuICByb3V0ZXM6IFtcbiAgICBhdXRob3JpemUsXG4gICAgY3JlYXRlLFxuICAgIGxpc3RcbiAgXVxufSlcblxuZXhwb3J0IGRlZmF1bHQgZ29vZ2xlU2VnbWVudFxuIl19