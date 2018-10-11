'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = require('bluebird');

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../../server');

var _utils = require('./utils');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var client, max_id, config, result, records, next;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _utils.getClient)(req, trx);

          case 2:
            client = _context.sent;
            max_id = _lodash2.default.get(req, 'query.$page.next');
            config = max_id ? { max_id: max_id } : {};
            _context.next = 7;
            return (0, _bluebird.promisify)(client.user_self_media_recent)(config);

          case 7:
            result = _context.sent;
            records = result.map(function (result) {
              return {
                id: result.id,
                caption: result.caption ? result.caption.text : null,
                thumbnail: result.images.thumbnail.url,
                image: result.images.standard_resolution.url
              };
            });
            next = records.length > 0 ? records[records.length - 1].id : null;
            return _context.abrupt('return', {
              records: records,
              skip: max_id ? 1 : 0,
              next: next
            });

          case 11:
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

var listRoute = new _server.Route({
  method: 'get',
  path: '/instagram/photos',
  processor: processor
});

exports.default = listRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsImNsaWVudCIsIm1heF9pZCIsIl8iLCJnZXQiLCJjb25maWciLCJ1c2VyX3NlbGZfbWVkaWFfcmVjZW50IiwicmVzdWx0IiwicmVjb3JkcyIsIm1hcCIsImlkIiwiY2FwdGlvbiIsInRleHQiLCJ0aHVtYm5haWwiLCJpbWFnZXMiLCJ1cmwiLCJpbWFnZSIsInN0YW5kYXJkX3Jlc29sdXRpb24iLCJuZXh0IiwibGVuZ3RoIiwic2tpcCIsImxpc3RSb3V0ZSIsIlJvdXRlIiwibWV0aG9kIiwicGF0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQTtBQUFBLHNGQUFZLGlCQUFPQyxHQUFQLEVBQVlDLEdBQVosRUFBaUJDLE9BQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRUssc0JBQVVGLEdBQVYsRUFBZUMsR0FBZixDQUZMOztBQUFBO0FBRVZFLGtCQUZVO0FBSVZDLGtCQUpVLEdBSURDLGlCQUFFQyxHQUFGLENBQU1OLEdBQU4sRUFBVyxrQkFBWCxDQUpDO0FBTVZPLGtCQU5VLEdBTURILFNBQVMsRUFBRUEsY0FBRixFQUFULEdBQXNCLEVBTnJCO0FBQUE7QUFBQSxtQkFRSyx5QkFBa0JELE9BQU9LLHNCQUF6QixFQUFpREQsTUFBakQsQ0FSTDs7QUFBQTtBQVFWRSxrQkFSVTtBQVVWQyxtQkFWVSxHQVVBRCxPQUFPRSxHQUFQLENBQVc7QUFBQSxxQkFBVztBQUNwQ0Msb0JBQUlILE9BQU9HLEVBRHlCO0FBRXBDQyx5QkFBU0osT0FBT0ksT0FBUCxHQUFpQkosT0FBT0ksT0FBUCxDQUFlQyxJQUFoQyxHQUF1QyxJQUZaO0FBR3BDQywyQkFBV04sT0FBT08sTUFBUCxDQUFjRCxTQUFkLENBQXdCRSxHQUhDO0FBSXBDQyx1QkFBT1QsT0FBT08sTUFBUCxDQUFjRyxtQkFBZCxDQUFrQ0Y7QUFKTCxlQUFYO0FBQUEsYUFBWCxDQVZBO0FBaUJWRyxnQkFqQlUsR0FpQkhWLFFBQVFXLE1BQVIsR0FBaUIsQ0FBakIsR0FBcUJYLFFBQVFBLFFBQVFXLE1BQVIsR0FBaUIsQ0FBekIsRUFBNEJULEVBQWpELEdBQXNELElBakJuRDtBQUFBLDZDQW1CVDtBQUNMRiw4QkFESztBQUVMWSxvQkFBTWxCLFNBQVMsQ0FBVCxHQUFhLENBRmQ7QUFHTGdCO0FBSEssYUFuQlM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztBQTJCQSxJQUFNRyxZQUFZLElBQUlDLGFBQUosQ0FBVTtBQUMxQkMsVUFBUSxLQURrQjtBQUUxQkMsUUFBTSxtQkFGb0I7QUFHMUIzQjtBQUgwQixDQUFWLENBQWxCOztrQkFNZXdCLFMiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmVyJ1xuaW1wb3J0IHsgZ2V0Q2xpZW50IH0gZnJvbSAnLi91dGlscydcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCdcblxuY29uc3QgcHJvY2Vzc29yID0gYXN5bmMgKHJlcSwgdHJ4LCBvcHRpb25zKSA9PiB7XG5cbiAgY29uc3QgY2xpZW50ID0gYXdhaXQgZ2V0Q2xpZW50KHJlcSwgdHJ4KVxuXG4gIGNvbnN0IG1heF9pZCA9IF8uZ2V0KHJlcSwgJ3F1ZXJ5LiRwYWdlLm5leHQnKVxuXG4gIGNvbnN0IGNvbmZpZyA9IG1heF9pZCA/IHsgbWF4X2lkIH0gOiB7fVxuXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IFByb21pc2UucHJvbWlzaWZ5KGNsaWVudC51c2VyX3NlbGZfbWVkaWFfcmVjZW50KShjb25maWcpXG5cbiAgY29uc3QgcmVjb3JkcyA9IHJlc3VsdC5tYXAocmVzdWx0ID0+ICh7XG4gICAgaWQ6IHJlc3VsdC5pZCxcbiAgICBjYXB0aW9uOiByZXN1bHQuY2FwdGlvbiA/IHJlc3VsdC5jYXB0aW9uLnRleHQgOiBudWxsLFxuICAgIHRodW1ibmFpbDogcmVzdWx0LmltYWdlcy50aHVtYm5haWwudXJsLFxuICAgIGltYWdlOiByZXN1bHQuaW1hZ2VzLnN0YW5kYXJkX3Jlc29sdXRpb24udXJsXG4gIH0pKVxuXG4gIGNvbnN0IG5leHQgPSByZWNvcmRzLmxlbmd0aCA+IDAgPyByZWNvcmRzW3JlY29yZHMubGVuZ3RoIC0gMV0uaWQgOiBudWxsXG5cbiAgcmV0dXJuIHtcbiAgICByZWNvcmRzLFxuICAgIHNraXA6IG1heF9pZCA/IDEgOiAwLFxuICAgIG5leHRcbiAgfVxuXG59XG5cbmNvbnN0IGxpc3RSb3V0ZSA9IG5ldyBSb3V0ZSh7XG4gIG1ldGhvZDogJ2dldCcsXG4gIHBhdGg6ICcvaW5zdGFncmFtL3Bob3RvcycsXG4gIHByb2Nlc3NvclxufSlcblxuZXhwb3J0IGRlZmF1bHQgbGlzdFJvdXRlXG4iXX0=