'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _server = require('../../../server');

var _asset = require('../../../models/asset');

var _asset2 = _interopRequireDefault(_asset);

var _asset_serializer = require('../../../serializers/asset_serializer');

var _asset_serializer2 = _interopRequireDefault(_asset_serializer);

var _download = require('./download');

var _download2 = _interopRequireDefault(_download);

var _preview = require('./preview');

var _preview2 = _interopRequireDefault(_preview);

var _test = require('./test');

var _test2 = _interopRequireDefault(_test);

var _upload = require('./upload');

var _upload2 = _interopRequireDefault(_upload);

var _process = require('./process');

var _process2 = _interopRequireDefault(_process);

var _import = require('./import');

var _import2 = _interopRequireDefault(_import);

var _url = require('./url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assetResources = new _server.Resources({
  model: _asset2.default,
  only: ['list', 'show'],
  path: '/assets',
  serializer: _asset_serializer2.default,
  withRelated: ['source', 'user.photo']
});

var assetsSegment = new _server.Segment({
  routes: [_import2.default, _url2.default, _preview2.default, _test2.default, _download2.default, _upload2.default, _process2.default, assetResources]
});

exports.default = assetsSegment;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiYXNzZXRSZXNvdXJjZXMiLCJSZXNvdXJjZXMiLCJtb2RlbCIsIkFzc2V0Iiwib25seSIsInBhdGgiLCJzZXJpYWxpemVyIiwiQXNzZXRTZXJpYWxpemVyIiwid2l0aFJlbGF0ZWQiLCJhc3NldHNTZWdtZW50IiwiU2VnbWVudCIsInJvdXRlcyIsImltcCIsInVybCIsInByZXZpZXciLCJ0ZXN0IiwiZG93bmxvYWQiLCJ1cGxvYWQiLCJwcm9jZXNzQXNzZXQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsaUJBQWlCLElBQUlDLGlCQUFKLENBQWM7QUFDbkNDLFNBQU9DLGVBRDRCO0FBRW5DQyxRQUFNLENBQUMsTUFBRCxFQUFRLE1BQVIsQ0FGNkI7QUFHbkNDLFFBQU0sU0FINkI7QUFJbkNDLGNBQVlDLDBCQUp1QjtBQUtuQ0MsZUFBYSxDQUFDLFFBQUQsRUFBVSxZQUFWO0FBTHNCLENBQWQsQ0FBdkI7O0FBUUEsSUFBTUMsZ0JBQWdCLElBQUlDLGVBQUosQ0FBWTtBQUNoQ0MsVUFBUSxDQUNOQyxnQkFETSxFQUVOQyxhQUZNLEVBR05DLGlCQUhNLEVBSU5DLGNBSk0sRUFLTkMsa0JBTE0sRUFNTkMsZ0JBTk0sRUFPTkMsaUJBUE0sRUFRTmxCLGNBUk07QUFEd0IsQ0FBWixDQUF0Qjs7a0JBYWVTLGEiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlc291cmNlcywgU2VnbWVudCB9IGZyb20gJy4uLy4uLy4uL3NlcnZlcidcbmltcG9ydCBBc3NldCBmcm9tICcuLi8uLi8uLi9tb2RlbHMvYXNzZXQnXG5pbXBvcnQgQXNzZXRTZXJpYWxpemVyIGZyb20gJy4uLy4uLy4uL3NlcmlhbGl6ZXJzL2Fzc2V0X3NlcmlhbGl6ZXInXG5pbXBvcnQgZG93bmxvYWQgZnJvbSAnLi9kb3dubG9hZCdcbmltcG9ydCBwcmV2aWV3IGZyb20gJy4vcHJldmlldydcbmltcG9ydCB0ZXN0IGZyb20gJy4vdGVzdCdcbmltcG9ydCB1cGxvYWQgZnJvbSAnLi91cGxvYWQnXG5pbXBvcnQgcHJvY2Vzc0Fzc2V0IGZyb20gJy4vcHJvY2VzcydcbmltcG9ydCBpbXAgZnJvbSAnLi9pbXBvcnQnXG5pbXBvcnQgdXJsIGZyb20gJy4vdXJsJ1xuXG5jb25zdCBhc3NldFJlc291cmNlcyA9IG5ldyBSZXNvdXJjZXMoe1xuICBtb2RlbDogQXNzZXQsXG4gIG9ubHk6IFsnbGlzdCcsJ3Nob3cnXSxcbiAgcGF0aDogJy9hc3NldHMnLFxuICBzZXJpYWxpemVyOiBBc3NldFNlcmlhbGl6ZXIsXG4gIHdpdGhSZWxhdGVkOiBbJ3NvdXJjZScsJ3VzZXIucGhvdG8nXVxufSlcblxuY29uc3QgYXNzZXRzU2VnbWVudCA9IG5ldyBTZWdtZW50KHtcbiAgcm91dGVzOiBbXG4gICAgaW1wLFxuICAgIHVybCxcbiAgICBwcmV2aWV3LFxuICAgIHRlc3QsXG4gICAgZG93bmxvYWQsXG4gICAgdXBsb2FkLFxuICAgIHByb2Nlc3NBc3NldCwgXG4gICAgYXNzZXRSZXNvdXJjZXNcbiAgXVxufSlcblxuZXhwb3J0IGRlZmF1bHQgYXNzZXRzU2VnbWVudFxuIl19