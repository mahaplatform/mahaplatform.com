'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../server');

var _notification = require('../../../models/notification');

var _notification2 = _interopRequireDefault(_notification);

var _notification_serializer = require('../../../serializers/notification_serializer');

var _notification_serializer2 = _interopRequireDefault(_notification_serializer);

var _seen = require('./seen');

var _seen2 = _interopRequireDefault(_seen);

var _visited = require('./visited');

var _visited2 = _interopRequireDefault(_visited);

var _unread = require('./unread');

var _unread2 = _interopRequireDefault(_unread);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var afterListProcessor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, result, options) {
    var user_id;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user_id = req.user.get('id');
            _context.next = 3;
            return options.knex('maha_notifications').transacting(trx).where({ user_id: user_id }).update({ is_seen: true });

          case 3:
            _context.next = 5;
            return _server.socket.emit('/notifications/unread').emit('message', {
              channel: '/admin/notifications/unread',
              action: 'refresh',
              data: null
            });

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function afterListProcessor(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var notificationResources = new _server.Resources({
  afterProcessor: {
    list: afterListProcessor
  },
  collectionActions: [_seen2.default, _unread2.default],
  defaultSort: '-created_at',
  memberActions: [_visited2.default],
  model: _notification2.default,
  only: ['list'],
  ownedByUser: true,
  path: '/notifications',
  serializer: _notification_serializer2.default,
  sortParams: ['created_at'],
  withRelated: ['subject.photo', 'app', 'story', 'object_owner', 'user']
});

exports.default = notificationResources;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiYWZ0ZXJMaXN0UHJvY2Vzc29yIiwicmVxIiwidHJ4IiwicmVzdWx0Iiwib3B0aW9ucyIsInVzZXJfaWQiLCJ1c2VyIiwiZ2V0Iiwia25leCIsInRyYW5zYWN0aW5nIiwid2hlcmUiLCJ1cGRhdGUiLCJpc19zZWVuIiwic29ja2V0IiwiZW1pdCIsImNoYW5uZWwiLCJhY3Rpb24iLCJkYXRhIiwibm90aWZpY2F0aW9uUmVzb3VyY2VzIiwiUmVzb3VyY2VzIiwiYWZ0ZXJQcm9jZXNzb3IiLCJsaXN0IiwiY29sbGVjdGlvbkFjdGlvbnMiLCJzZWVuIiwidW5yZWFkIiwiZGVmYXVsdFNvcnQiLCJtZW1iZXJBY3Rpb25zIiwidmlzaXRlZCIsIm1vZGVsIiwiTm90aWZpY2F0aW9uIiwib25seSIsIm93bmVkQnlVc2VyIiwicGF0aCIsInNlcmlhbGl6ZXIiLCJOb3RpZmljYXRpb25TZXJpYWxpemVyIiwic29ydFBhcmFtcyIsIndpdGhSZWxhdGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BO0FBQUEsc0ZBQXFCLGlCQUFPQyxHQUFQLEVBQVlDLEdBQVosRUFBaUJDLE1BQWpCLEVBQXlCQyxPQUF6QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFbkJDLG1CQUZtQixHQUVUSixJQUFJSyxJQUFKLENBQVNDLEdBQVQsQ0FBYSxJQUFiLENBRlM7QUFBQTtBQUFBLG1CQUluQkgsUUFBUUksSUFBUixDQUFhLG9CQUFiLEVBQW1DQyxXQUFuQyxDQUErQ1AsR0FBL0MsRUFBb0RRLEtBQXBELENBQTBELEVBQUVMLGdCQUFGLEVBQTFELEVBQXVFTSxNQUF2RSxDQUE4RSxFQUFFQyxTQUFTLElBQVgsRUFBOUUsQ0FKbUI7O0FBQUE7QUFBQTtBQUFBLG1CQU1uQkMsZUFBT0MsSUFBUCxDQUFZLHVCQUFaLEVBQXFDQSxJQUFyQyxDQUEwQyxTQUExQyxFQUFxRDtBQUN6REMsdUJBQVMsNkJBRGdEO0FBRXpEQyxzQkFBUSxTQUZpRDtBQUd6REMsb0JBQU07QUFIbUQsYUFBckQsQ0FObUI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBckI7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUFjQSxJQUFNQyx3QkFBd0IsSUFBSUMsaUJBQUosQ0FBYztBQUMxQ0Msa0JBQWdCO0FBQ2RDLFVBQU1yQjtBQURRLEdBRDBCO0FBSTFDc0IscUJBQW1CLENBQ2pCQyxjQURpQixFQUVqQkMsZ0JBRmlCLENBSnVCO0FBUTFDQyxlQUFhLGFBUjZCO0FBUzFDQyxpQkFBZSxDQUNiQyxpQkFEYSxDQVQyQjtBQVkxQ0MsU0FBT0Msc0JBWm1DO0FBYTFDQyxRQUFNLENBQUMsTUFBRCxDQWJvQztBQWMxQ0MsZUFBYSxJQWQ2QjtBQWUxQ0MsUUFBTSxnQkFmb0M7QUFnQjFDQyxjQUFZQyxpQ0FoQjhCO0FBaUIxQ0MsY0FBWSxDQUFDLFlBQUQsQ0FqQjhCO0FBa0IxQ0MsZUFBYSxDQUFDLGVBQUQsRUFBaUIsS0FBakIsRUFBdUIsT0FBdkIsRUFBK0IsY0FBL0IsRUFBOEMsTUFBOUM7QUFsQjZCLENBQWQsQ0FBOUI7O2tCQXNCZWxCLHFCIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzb2NrZXQsIFJlc291cmNlcyB9IGZyb20gJy4uLy4uLy4uL3NlcnZlcidcbmltcG9ydCBOb3RpZmljYXRpb24gZnJvbSAnLi4vLi4vLi4vbW9kZWxzL25vdGlmaWNhdGlvbidcbmltcG9ydCBOb3RpZmljYXRpb25TZXJpYWxpemVyIGZyb20gJy4uLy4uLy4uL3NlcmlhbGl6ZXJzL25vdGlmaWNhdGlvbl9zZXJpYWxpemVyJ1xuaW1wb3J0IHNlZW4gZnJvbSAnLi9zZWVuJ1xuaW1wb3J0IHZpc2l0ZWQgZnJvbSAnLi92aXNpdGVkJ1xuaW1wb3J0IHVucmVhZCBmcm9tICcuL3VucmVhZCdcblxuY29uc3QgYWZ0ZXJMaXN0UHJvY2Vzc29yID0gYXN5bmMgKHJlcSwgdHJ4LCByZXN1bHQsIG9wdGlvbnMpID0+IHtcblxuICBjb25zdCB1c2VyX2lkID0gcmVxLnVzZXIuZ2V0KCdpZCcpXG5cbiAgYXdhaXQgb3B0aW9ucy5rbmV4KCdtYWhhX25vdGlmaWNhdGlvbnMnKS50cmFuc2FjdGluZyh0cngpLndoZXJlKHsgdXNlcl9pZCB9KS51cGRhdGUoeyBpc19zZWVuOiB0cnVlIH0pXG5cbiAgYXdhaXQgc29ja2V0LmVtaXQoJy9ub3RpZmljYXRpb25zL3VucmVhZCcpLmVtaXQoJ21lc3NhZ2UnLCB7XG4gICAgY2hhbm5lbDogJy9hZG1pbi9ub3RpZmljYXRpb25zL3VucmVhZCcsXG4gICAgYWN0aW9uOiAncmVmcmVzaCcsXG4gICAgZGF0YTogbnVsbFxuICB9KVxuXG59XG5cbmNvbnN0IG5vdGlmaWNhdGlvblJlc291cmNlcyA9IG5ldyBSZXNvdXJjZXMoe1xuICBhZnRlclByb2Nlc3Nvcjoge1xuICAgIGxpc3Q6IGFmdGVyTGlzdFByb2Nlc3NvclxuICB9LFxuICBjb2xsZWN0aW9uQWN0aW9uczogW1xuICAgIHNlZW4sXG4gICAgdW5yZWFkXG4gIF0sXG4gIGRlZmF1bHRTb3J0OiAnLWNyZWF0ZWRfYXQnLFxuICBtZW1iZXJBY3Rpb25zOiBbXG4gICAgdmlzaXRlZFxuICBdLFxuICBtb2RlbDogTm90aWZpY2F0aW9uLFxuICBvbmx5OiBbJ2xpc3QnXSxcbiAgb3duZWRCeVVzZXI6IHRydWUsXG4gIHBhdGg6ICcvbm90aWZpY2F0aW9ucycsXG4gIHNlcmlhbGl6ZXI6IE5vdGlmaWNhdGlvblNlcmlhbGl6ZXIsXG4gIHNvcnRQYXJhbXM6IFsnY3JlYXRlZF9hdCddLFxuICB3aXRoUmVsYXRlZDogWydzdWJqZWN0LnBob3RvJywnYXBwJywnc3RvcnknLCdvYmplY3Rfb3duZXInLCd1c2VyJ11cbn0pXG5cblxuZXhwb3J0IGRlZmF1bHQgbm90aWZpY2F0aW9uUmVzb3VyY2VzXG4iXX0=