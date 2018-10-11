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

var facebookSegment = new _server.Segment({
  routes: [_authorize2.default, _list2.default, _create2.default]
});

exports.default = facebookSegment;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiZmFjZWJvb2tTZWdtZW50IiwiU2VnbWVudCIsInJvdXRlcyIsImF1dGhvcml6ZSIsImxpc3QiLCJjcmVhdGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsa0JBQWtCLElBQUlDLGVBQUosQ0FBWTtBQUNsQ0MsVUFBUSxDQUNOQyxtQkFETSxFQUVOQyxjQUZNLEVBR05DLGdCQUhNO0FBRDBCLENBQVosQ0FBeEI7O2tCQVFlTCxlIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZWdtZW50IH0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmVyJ1xuaW1wb3J0IGF1dGhvcml6ZSBmcm9tICcuL2F1dGhvcml6ZSdcbmltcG9ydCBsaXN0IGZyb20gJy4vbGlzdCdcbmltcG9ydCBjcmVhdGUgZnJvbSAnLi9jcmVhdGUnXG5cbmNvbnN0IGZhY2Vib29rU2VnbWVudCA9IG5ldyBTZWdtZW50KHtcbiAgcm91dGVzOiBbXG4gICAgYXV0aG9yaXplLFxuICAgIGxpc3QsXG4gICAgY3JlYXRlXG4gIF1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IGZhY2Vib29rU2VnbWVudFxuIl19