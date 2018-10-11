'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../server');

var _import = require('../../../models/import');

var _import2 = _interopRequireDefault(_import);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var imp;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return req.resource.save({
              is_omitted: true
            }, { patch: true, transacting: trx });

          case 2:
            _context.next = 4;
            return _import2.default.where({
              id: req.params.import_id
            }).fetch({
              transacting: trx
            });

          case 4:
            imp = _context.sent;
            _context.next = 7;
            return imp.save({
              omit_count: imp.get('omit_count') + 1,
              error_count: imp.get('error_count') - 1
            }, {
              patch: true,
              transacting: trx
            });

          case 7:
            return _context.abrupt('return', imp);

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function processor(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var refresh = function refresh(req, trx, result, options) {
  return '/admin/imports/' + result.id;
};

var omitRoute = new _server.Route({
  method: 'patch',
  path: '/omit',
  processor: processor,
  refresh: refresh,
  serializer: _server.ImportSerializer
});

exports.default = omitRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsInJlc291cmNlIiwic2F2ZSIsImlzX29taXR0ZWQiLCJwYXRjaCIsInRyYW5zYWN0aW5nIiwiSW1wb3J0Iiwid2hlcmUiLCJpZCIsInBhcmFtcyIsImltcG9ydF9pZCIsImZldGNoIiwiaW1wIiwib21pdF9jb3VudCIsImdldCIsImVycm9yX2NvdW50IiwicmVmcmVzaCIsInJlc3VsdCIsIm9taXRSb3V0ZSIsIlJvdXRlIiwibWV0aG9kIiwicGF0aCIsInNlcmlhbGl6ZXIiLCJJbXBvcnRTZXJpYWxpemVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQTtBQUFBLHNGQUFZLGlCQUFPQyxHQUFQLEVBQVlDLEdBQVosRUFBaUJDLE9BQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRVZGLElBQUlHLFFBQUosQ0FBYUMsSUFBYixDQUFrQjtBQUN0QkMsMEJBQVk7QUFEVSxhQUFsQixFQUVILEVBQUVDLE9BQU8sSUFBVCxFQUFlQyxhQUFhTixHQUE1QixFQUZHLENBRlU7O0FBQUE7QUFBQTtBQUFBLG1CQU1FTyxpQkFBT0MsS0FBUCxDQUFhO0FBQzdCQyxrQkFBSVYsSUFBSVcsTUFBSixDQUFXQztBQURjLGFBQWIsRUFFZkMsS0FGZSxDQUVUO0FBQ1BOLDJCQUFhTjtBQUROLGFBRlMsQ0FORjs7QUFBQTtBQU1WYSxlQU5VO0FBQUE7QUFBQSxtQkFZVkEsSUFBSVYsSUFBSixDQUFTO0FBQ2JXLDBCQUFhRCxJQUFJRSxHQUFKLENBQVEsWUFBUixJQUF3QixDQUR4QjtBQUViQywyQkFBY0gsSUFBSUUsR0FBSixDQUFRLGFBQVIsSUFBeUI7QUFGMUIsYUFBVCxFQUdIO0FBQ0RWLHFCQUFPLElBRE47QUFFREMsMkJBQWFOO0FBRlosYUFIRyxDQVpVOztBQUFBO0FBQUEsNkNBb0JUYSxHQXBCUzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFaOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBd0JBLElBQU1JLFVBQVUsU0FBVkEsT0FBVSxDQUFDbEIsR0FBRCxFQUFNQyxHQUFOLEVBQVdrQixNQUFYLEVBQW1CakIsT0FBbkI7QUFBQSw2QkFBaURpQixPQUFPVCxFQUF4RDtBQUFBLENBQWhCOztBQUVBLElBQU1VLFlBQVksSUFBSUMsYUFBSixDQUFVO0FBQzFCQyxVQUFRLE9BRGtCO0FBRTFCQyxRQUFNLE9BRm9CO0FBRzFCeEIsc0JBSDBCO0FBSTFCbUIsa0JBSjBCO0FBSzFCTSxjQUFZQztBQUxjLENBQVYsQ0FBbEI7O2tCQVFlTCxTIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZSwgSW1wb3J0U2VyaWFsaXplciB9IGZyb20gJy4uLy4uLy4uL3NlcnZlcidcbmltcG9ydCBJbXBvcnQgZnJvbSAnLi4vLi4vLi4vbW9kZWxzL2ltcG9ydCdcblxuY29uc3QgcHJvY2Vzc29yID0gYXN5bmMgKHJlcSwgdHJ4LCBvcHRpb25zKSA9PiB7XG5cbiAgYXdhaXQgcmVxLnJlc291cmNlLnNhdmUoe1xuICAgIGlzX29taXR0ZWQ6IHRydWVcbiAgfSwgeyBwYXRjaDogdHJ1ZSwgdHJhbnNhY3Rpbmc6IHRyeCB9KVxuXG4gIGNvbnN0IGltcCA9IGF3YWl0IEltcG9ydC53aGVyZSh7XG4gICAgaWQ6IHJlcS5wYXJhbXMuaW1wb3J0X2lkXG4gIH0pLmZldGNoKHtcbiAgICB0cmFuc2FjdGluZzogdHJ4XG4gIH0pXG5cbiAgYXdhaXQgaW1wLnNhdmUoe1xuICAgIG9taXRfY291bnQ6IChpbXAuZ2V0KCdvbWl0X2NvdW50JykgKyAxKSxcbiAgICBlcnJvcl9jb3VudDogKGltcC5nZXQoJ2Vycm9yX2NvdW50JykgLSAxKVxuICB9LCB7XG4gICAgcGF0Y2g6IHRydWUsXG4gICAgdHJhbnNhY3Rpbmc6IHRyeFxuICB9KVxuXG4gIHJldHVybiBpbXBcblxufVxuXG5jb25zdCByZWZyZXNoID0gKHJlcSwgdHJ4LCByZXN1bHQsIG9wdGlvbnMpID0+IGAvYWRtaW4vaW1wb3J0cy8ke3Jlc3VsdC5pZH1gXG5cbmNvbnN0IG9taXRSb3V0ZSA9IG5ldyBSb3V0ZSh7XG4gIG1ldGhvZDogJ3BhdGNoJyxcbiAgcGF0aDogJy9vbWl0JyxcbiAgcHJvY2Vzc29yLFxuICByZWZyZXNoLFxuICBzZXJpYWxpemVyOiBJbXBvcnRTZXJpYWxpemVyXG59KVxuXG5leHBvcnQgZGVmYXVsdCBvbWl0Um91dGVcbiJdfQ==