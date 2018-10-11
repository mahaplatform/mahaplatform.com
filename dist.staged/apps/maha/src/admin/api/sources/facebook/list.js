'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../../server');

var _utils = require('./utils');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var client, cursor, query, result, records;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _utils.getClient)(req, trx);

          case 2:
            client = _context.sent;
            cursor = _lodash2.default.get(req, 'query.$page.next');
            query = cursor ? '?after=' + cursor : '';
            _context.next = 7;
            return client.api('me/photos' + query, {
              fields: ['id', 'name', 'images'],
              limit: 100
            });

          case 7:
            result = _context.sent;
            records = result.data.map(function (result) {
              return {
                id: result.id,
                name: result.name,
                image: result.images.reduce(function (found, image) {
                  if (found) return found;
                  return image.height === 225 ? image.source : null;
                }, null)
              };
            });
            return _context.abrupt('return', {
              records: records,
              skip: cursor ? 1 : 0,
              next: result.paging ? result.paging.cursors.after : null
            });

          case 10:
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
  path: '/facebook/photos',
  processor: processor
});

exports.default = listRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsImNsaWVudCIsImN1cnNvciIsIl8iLCJnZXQiLCJxdWVyeSIsImFwaSIsImZpZWxkcyIsImxpbWl0IiwicmVzdWx0IiwicmVjb3JkcyIsImRhdGEiLCJtYXAiLCJpZCIsIm5hbWUiLCJpbWFnZSIsImltYWdlcyIsInJlZHVjZSIsImZvdW5kIiwiaGVpZ2h0Iiwic291cmNlIiwic2tpcCIsIm5leHQiLCJwYWdpbmciLCJjdXJzb3JzIiwiYWZ0ZXIiLCJsaXN0Um91dGUiLCJSb3V0ZSIsIm1ldGhvZCIsInBhdGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBLElBQU1BO0FBQUEsc0ZBQVksaUJBQU9DLEdBQVAsRUFBWUMsR0FBWixFQUFpQkMsT0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFFSyxzQkFBVUYsR0FBVixFQUFlQyxHQUFmLENBRkw7O0FBQUE7QUFFVkUsa0JBRlU7QUFJVkMsa0JBSlUsR0FJREMsaUJBQUVDLEdBQUYsQ0FBTU4sR0FBTixFQUFXLGtCQUFYLENBSkM7QUFNVk8saUJBTlUsR0FNRkgscUJBQW1CQSxNQUFuQixHQUE4QixFQU41QjtBQUFBO0FBQUEsbUJBUUtELE9BQU9LLEdBQVAsZUFBdUJELEtBQXZCLEVBQWdDO0FBQ25ERSxzQkFBUSxDQUFDLElBQUQsRUFBTSxNQUFOLEVBQWEsUUFBYixDQUQyQztBQUVuREMscUJBQU87QUFGNEMsYUFBaEMsQ0FSTDs7QUFBQTtBQVFWQyxrQkFSVTtBQWFWQyxtQkFiVSxHQWFBRCxPQUFPRSxJQUFQLENBQVlDLEdBQVosQ0FBZ0I7QUFBQSxxQkFBVztBQUN6Q0Msb0JBQUlKLE9BQU9JLEVBRDhCO0FBRXpDQyxzQkFBTUwsT0FBT0ssSUFGNEI7QUFHekNDLHVCQUFPTixPQUFPTyxNQUFQLENBQWNDLE1BQWQsQ0FBcUIsVUFBQ0MsS0FBRCxFQUFRSCxLQUFSLEVBQWtCO0FBQzVDLHNCQUFHRyxLQUFILEVBQVUsT0FBT0EsS0FBUDtBQUNWLHlCQUFPSCxNQUFNSSxNQUFOLEtBQWlCLEdBQWpCLEdBQXVCSixNQUFNSyxNQUE3QixHQUFzQyxJQUE3QztBQUNELGlCQUhNLEVBR0osSUFISTtBQUhrQyxlQUFYO0FBQUEsYUFBaEIsQ0FiQTtBQUFBLDZDQXNCVDtBQUNMViw4QkFESztBQUVMVyxvQkFBTW5CLFNBQVMsQ0FBVCxHQUFhLENBRmQ7QUFHTG9CLG9CQUFNYixPQUFPYyxNQUFQLEdBQWdCZCxPQUFPYyxNQUFQLENBQWNDLE9BQWQsQ0FBc0JDLEtBQXRDLEdBQThDO0FBSC9DLGFBdEJTOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUE4QkEsSUFBTUMsWUFBWSxJQUFJQyxhQUFKLENBQVU7QUFDMUJDLFVBQVEsS0FEa0I7QUFFMUJDLFFBQU0sa0JBRm9CO0FBRzFCaEM7QUFIMEIsQ0FBVixDQUFsQjs7a0JBTWU2QixTIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NlcnZlcidcbmltcG9ydCB7IGdldENsaWVudCB9IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5cbmNvbnN0IHByb2Nlc3NvciA9IGFzeW5jIChyZXEsIHRyeCwgb3B0aW9ucykgPT4ge1xuXG4gIGNvbnN0IGNsaWVudCA9IGF3YWl0IGdldENsaWVudChyZXEsIHRyeClcblxuICBjb25zdCBjdXJzb3IgPSBfLmdldChyZXEsICdxdWVyeS4kcGFnZS5uZXh0JylcblxuICBjb25zdCBxdWVyeSA9IGN1cnNvciA/IGA/YWZ0ZXI9JHtjdXJzb3J9YCA6ICcnXG5cbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2xpZW50LmFwaShgbWUvcGhvdG9zJHtxdWVyeX1gLCB7XG4gICAgZmllbGRzOiBbJ2lkJywnbmFtZScsJ2ltYWdlcyddLFxuICAgIGxpbWl0OiAxMDBcbiAgfSlcblxuICBjb25zdCByZWNvcmRzID0gcmVzdWx0LmRhdGEubWFwKHJlc3VsdCA9PiAoe1xuICAgIGlkOiByZXN1bHQuaWQsXG4gICAgbmFtZTogcmVzdWx0Lm5hbWUsXG4gICAgaW1hZ2U6IHJlc3VsdC5pbWFnZXMucmVkdWNlKChmb3VuZCwgaW1hZ2UpID0+IHtcbiAgICAgIGlmKGZvdW5kKSByZXR1cm4gZm91bmRcbiAgICAgIHJldHVybiBpbWFnZS5oZWlnaHQgPT09IDIyNSA/IGltYWdlLnNvdXJjZSA6IG51bGxcbiAgICB9LCBudWxsKVxuICB9KSlcblxuICByZXR1cm4ge1xuICAgIHJlY29yZHMsXG4gICAgc2tpcDogY3Vyc29yID8gMSA6IDAsXG4gICAgbmV4dDogcmVzdWx0LnBhZ2luZyA/IHJlc3VsdC5wYWdpbmcuY3Vyc29ycy5hZnRlciA6IG51bGxcbiAgfVxuICBcbn1cblxuY29uc3QgbGlzdFJvdXRlID0gbmV3IFJvdXRlKHtcbiAgbWV0aG9kOiAnZ2V0JyxcbiAgcGF0aDogJy9mYWNlYm9vay9waG90b3MnLFxuICBwcm9jZXNzb3Jcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IGxpc3RSb3V0ZVxuIl19