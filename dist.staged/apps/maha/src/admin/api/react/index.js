'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../server');

var _reaction = require('../../../models/reaction');

var _reaction2 = _interopRequireDefault(_reaction);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var _req$params, reactable_type, reactable_id, reaction, unserialized, reactions;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$params = req.params, reactable_type = _req$params.reactable_type, reactable_id = _req$params.reactable_id;
            _context.next = 3;
            return _reaction2.default.where({
              user_id: req.user.get('id'),
              reactable_type: reactable_type,
              reactable_id: reactable_id,
              type: req.params.type
            }).fetch({ transacting: trx });

          case 3:
            reaction = _context.sent;

            if (reaction) {
              _context.next = 9;
              break;
            }

            _context.next = 7;
            return _reaction2.default.forge({
              team_id: req.team.get('id'),
              user_id: req.user.get('id'),
              reactable_type: reactable_type,
              reactable_id: reactable_id,
              type: req.params.type
            }).save(null, { transacting: trx });

          case 7:
            _context.next = 11;
            break;

          case 9:
            _context.next = 11;
            return reaction.save({
              unreacted_at: reaction.get('unreacted_at') !== null ? null : (0, _moment2.default)()
            }, { patch: true, transacting: trx });

          case 11:
            _context.next = 13;
            return _reaction2.default.query(function (qb) {

              qb.where({
                reactable_type: reactable_type,
                reactable_id: reactable_id
              });

              qb.whereNull('unreacted_at');
            }).fetchAll({
              transacting: trx,
              withRelated: ['user.photo']
            });

          case 13:
            unserialized = _context.sent;
            reactions = unserialized.toArray().map(function (reaction) {
              return {
                id: reaction.related('user').get('id'),
                full_name: reaction.related('user').get('full_name'),
                initials: reaction.related('user').get('initials'),
                photo: reaction.related('user').related('photo').get('path'),
                type: reaction.get('type')
              };
            });
            _context.next = 17;
            return _server.socket.in('/admin/reactions').emit('message', {
              target: '/admin/reactions',
              action: 'update_reactions',
              data: {
                table: reactable_type,
                id: parseInt(reactable_id),
                reactions: reactions
              }
            });

          case 17:
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

var reactRoute = new _server.Route({
  method: 'patch',
  path: '/:reactable_type/:reactable_id/react/:type',
  processor: processor
});

exports.default = reactRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsInBhcmFtcyIsInJlYWN0YWJsZV90eXBlIiwicmVhY3RhYmxlX2lkIiwiUmVhY3Rpb24iLCJ3aGVyZSIsInVzZXJfaWQiLCJ1c2VyIiwiZ2V0IiwidHlwZSIsImZldGNoIiwidHJhbnNhY3RpbmciLCJyZWFjdGlvbiIsImZvcmdlIiwidGVhbV9pZCIsInRlYW0iLCJzYXZlIiwidW5yZWFjdGVkX2F0IiwicGF0Y2giLCJxdWVyeSIsInFiIiwid2hlcmVOdWxsIiwiZmV0Y2hBbGwiLCJ3aXRoUmVsYXRlZCIsInVuc2VyaWFsaXplZCIsInJlYWN0aW9ucyIsInRvQXJyYXkiLCJtYXAiLCJpZCIsInJlbGF0ZWQiLCJmdWxsX25hbWUiLCJpbml0aWFscyIsInBob3RvIiwic29ja2V0IiwiaW4iLCJlbWl0IiwidGFyZ2V0IiwiYWN0aW9uIiwiZGF0YSIsInRhYmxlIiwicGFyc2VJbnQiLCJyZWFjdFJvdXRlIiwiUm91dGUiLCJtZXRob2QiLCJwYXRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BO0FBQUEsc0ZBQVksaUJBQU9DLEdBQVAsRUFBWUMsR0FBWixFQUFpQkMsT0FBakI7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUV5QkYsSUFBSUcsTUFGN0IsRUFFUkMsY0FGUSxlQUVSQSxjQUZRLEVBRVFDLFlBRlIsZUFFUUEsWUFGUjtBQUFBO0FBQUEsbUJBSU9DLG1CQUFTQyxLQUFULENBQWU7QUFDcENDLHVCQUFTUixJQUFJUyxJQUFKLENBQVNDLEdBQVQsQ0FBYSxJQUFiLENBRDJCO0FBRXBDTiw0Q0FGb0M7QUFHcENDLHdDQUhvQztBQUlwQ00sb0JBQU1YLElBQUlHLE1BQUosQ0FBV1E7QUFKbUIsYUFBZixFQUtwQkMsS0FMb0IsQ0FLZCxFQUFFQyxhQUFhWixHQUFmLEVBTGMsQ0FKUDs7QUFBQTtBQUlWYSxvQkFKVTs7QUFBQSxnQkFXWkEsUUFYWTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLG1CQWFSUixtQkFBU1MsS0FBVCxDQUFlO0FBQ25CQyx1QkFBU2hCLElBQUlpQixJQUFKLENBQVNQLEdBQVQsQ0FBYSxJQUFiLENBRFU7QUFFbkJGLHVCQUFTUixJQUFJUyxJQUFKLENBQVNDLEdBQVQsQ0FBYSxJQUFiLENBRlU7QUFHbkJOLDRDQUhtQjtBQUluQkMsd0NBSm1CO0FBS25CTSxvQkFBTVgsSUFBSUcsTUFBSixDQUFXUTtBQUxFLGFBQWYsRUFNSE8sSUFORyxDQU1FLElBTkYsRUFNUSxFQUFFTCxhQUFhWixHQUFmLEVBTlIsQ0FiUTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLG1CQXVCUmEsU0FBU0ksSUFBVCxDQUFjO0FBQ2xCQyw0QkFBY0wsU0FBU0osR0FBVCxDQUFhLGNBQWIsTUFBaUMsSUFBakMsR0FBd0MsSUFBeEMsR0FBK0M7QUFEM0MsYUFBZCxFQUVILEVBQUVVLE9BQU8sSUFBVCxFQUFlUCxhQUFhWixHQUE1QixFQUZHLENBdkJROztBQUFBO0FBQUE7QUFBQSxtQkE2QldLLG1CQUFTZSxLQUFULENBQWUsY0FBTTs7QUFFOUNDLGlCQUFHZixLQUFILENBQVM7QUFDUEgsOENBRE87QUFFUEM7QUFGTyxlQUFUOztBQUtBaUIsaUJBQUdDLFNBQUgsQ0FBYSxjQUFiO0FBRUQsYUFUMEIsRUFTeEJDLFFBVHdCLENBU2Y7QUFDVlgsMkJBQWFaLEdBREg7QUFFVndCLDJCQUFhLENBQUMsWUFBRDtBQUZILGFBVGUsQ0E3Qlg7O0FBQUE7QUE2QlZDLHdCQTdCVTtBQTJDVkMscUJBM0NVLEdBMkNFRCxhQUFhRSxPQUFiLEdBQXVCQyxHQUF2QixDQUEyQjtBQUFBLHFCQUFhO0FBQ3hEQyxvQkFBSWhCLFNBQVNpQixPQUFULENBQWlCLE1BQWpCLEVBQXlCckIsR0FBekIsQ0FBNkIsSUFBN0IsQ0FEb0Q7QUFFeERzQiwyQkFBV2xCLFNBQVNpQixPQUFULENBQWlCLE1BQWpCLEVBQXlCckIsR0FBekIsQ0FBNkIsV0FBN0IsQ0FGNkM7QUFHeER1QiwwQkFBVW5CLFNBQVNpQixPQUFULENBQWlCLE1BQWpCLEVBQXlCckIsR0FBekIsQ0FBNkIsVUFBN0IsQ0FIOEM7QUFJeER3Qix1QkFBT3BCLFNBQVNpQixPQUFULENBQWlCLE1BQWpCLEVBQXlCQSxPQUF6QixDQUFpQyxPQUFqQyxFQUEwQ3JCLEdBQTFDLENBQThDLE1BQTlDLENBSmlEO0FBS3hEQyxzQkFBTUcsU0FBU0osR0FBVCxDQUFhLE1BQWI7QUFMa0QsZUFBYjtBQUFBLGFBQTNCLENBM0NGO0FBQUE7QUFBQSxtQkFtRFZ5QixlQUFPQyxFQUFQLENBQVUsa0JBQVYsRUFBOEJDLElBQTlCLENBQW1DLFNBQW5DLEVBQThDO0FBQ2xEQyxzQkFBUSxrQkFEMEM7QUFFbERDLHNCQUFRLGtCQUYwQztBQUdsREMsb0JBQU07QUFDSkMsdUJBQU9yQyxjQURIO0FBRUowQixvQkFBSVksU0FBU3JDLFlBQVQsQ0FGQTtBQUdKc0I7QUFISTtBQUg0QyxhQUE5QyxDQW5EVTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFaOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBK0RBLElBQU1nQixhQUFhLElBQUlDLGFBQUosQ0FBVTtBQUMzQkMsVUFBUSxPQURtQjtBQUUzQkMsUUFBTSw0Q0FGcUI7QUFHM0IvQztBQUgyQixDQUFWLENBQW5COztrQkFNZTRDLFUiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlLCBzb2NrZXQgfSBmcm9tICcuLi8uLi8uLi9zZXJ2ZXInXG5pbXBvcnQgUmVhY3Rpb24gZnJvbSAnLi4vLi4vLi4vbW9kZWxzL3JlYWN0aW9uJ1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnXG5cbmNvbnN0IHByb2Nlc3NvciA9IGFzeW5jIChyZXEsIHRyeCwgb3B0aW9ucykgPT4ge1xuXG4gIGNvbnN0IHsgcmVhY3RhYmxlX3R5cGUsIHJlYWN0YWJsZV9pZCB9ID0gcmVxLnBhcmFtc1xuXG4gIGNvbnN0IHJlYWN0aW9uID0gYXdhaXQgUmVhY3Rpb24ud2hlcmUoe1xuICAgIHVzZXJfaWQ6IHJlcS51c2VyLmdldCgnaWQnKSxcbiAgICByZWFjdGFibGVfdHlwZSxcbiAgICByZWFjdGFibGVfaWQsXG4gICAgdHlwZTogcmVxLnBhcmFtcy50eXBlXG4gIH0pLmZldGNoKHsgdHJhbnNhY3Rpbmc6IHRyeCB9KVxuXG4gIGlmKCFyZWFjdGlvbikge1xuXG4gICAgYXdhaXQgUmVhY3Rpb24uZm9yZ2Uoe1xuICAgICAgdGVhbV9pZDogcmVxLnRlYW0uZ2V0KCdpZCcpLFxuICAgICAgdXNlcl9pZDogcmVxLnVzZXIuZ2V0KCdpZCcpLFxuICAgICAgcmVhY3RhYmxlX3R5cGUsXG4gICAgICByZWFjdGFibGVfaWQsXG4gICAgICB0eXBlOiByZXEucGFyYW1zLnR5cGVcbiAgICB9KS5zYXZlKG51bGwsIHsgdHJhbnNhY3Rpbmc6IHRyeCB9KVxuXG4gIH0gZWxzZSB7XG5cbiAgICBhd2FpdCByZWFjdGlvbi5zYXZlKHtcbiAgICAgIHVucmVhY3RlZF9hdDogcmVhY3Rpb24uZ2V0KCd1bnJlYWN0ZWRfYXQnKSAhPT0gbnVsbCA/IG51bGwgOiBtb21lbnQoKVxuICAgIH0sIHsgcGF0Y2g6IHRydWUsIHRyYW5zYWN0aW5nOiB0cnggfSlcblxuICB9XG5cbiAgY29uc3QgdW5zZXJpYWxpemVkID0gYXdhaXQgUmVhY3Rpb24ucXVlcnkocWIgPT4ge1xuXG4gICAgcWIud2hlcmUoe1xuICAgICAgcmVhY3RhYmxlX3R5cGUsXG4gICAgICByZWFjdGFibGVfaWRcbiAgICB9KVxuXG4gICAgcWIud2hlcmVOdWxsKCd1bnJlYWN0ZWRfYXQnKVxuXG4gIH0pLmZldGNoQWxsKHtcbiAgICB0cmFuc2FjdGluZzogdHJ4LFxuICAgIHdpdGhSZWxhdGVkOiBbJ3VzZXIucGhvdG8nXVxuICB9KVxuXG4gIGNvbnN0IHJlYWN0aW9ucyA9IHVuc2VyaWFsaXplZC50b0FycmF5KCkubWFwKHJlYWN0aW9uID0+ICh7XG4gICAgaWQ6IHJlYWN0aW9uLnJlbGF0ZWQoJ3VzZXInKS5nZXQoJ2lkJyksXG4gICAgZnVsbF9uYW1lOiByZWFjdGlvbi5yZWxhdGVkKCd1c2VyJykuZ2V0KCdmdWxsX25hbWUnKSxcbiAgICBpbml0aWFsczogcmVhY3Rpb24ucmVsYXRlZCgndXNlcicpLmdldCgnaW5pdGlhbHMnKSxcbiAgICBwaG90bzogcmVhY3Rpb24ucmVsYXRlZCgndXNlcicpLnJlbGF0ZWQoJ3Bob3RvJykuZ2V0KCdwYXRoJyksXG4gICAgdHlwZTogcmVhY3Rpb24uZ2V0KCd0eXBlJylcbiAgfSkpXG5cbiAgYXdhaXQgc29ja2V0LmluKCcvYWRtaW4vcmVhY3Rpb25zJykuZW1pdCgnbWVzc2FnZScsIHtcbiAgICB0YXJnZXQ6ICcvYWRtaW4vcmVhY3Rpb25zJyxcbiAgICBhY3Rpb246ICd1cGRhdGVfcmVhY3Rpb25zJyxcbiAgICBkYXRhOiB7XG4gICAgICB0YWJsZTogcmVhY3RhYmxlX3R5cGUsXG4gICAgICBpZDogcGFyc2VJbnQocmVhY3RhYmxlX2lkKSxcbiAgICAgIHJlYWN0aW9uc1xuICAgIH1cbiAgfSlcblxufVxuXG5jb25zdCByZWFjdFJvdXRlID0gbmV3IFJvdXRlKHtcbiAgbWV0aG9kOiAncGF0Y2gnLFxuICBwYXRoOiAnLzpyZWFjdGFibGVfdHlwZS86cmVhY3RhYmxlX2lkL3JlYWN0Lzp0eXBlJyxcbiAgcHJvY2Vzc29yXG59KVxuXG5leHBvcnQgZGVmYXVsdCByZWFjdFJvdXRlXG4iXX0=