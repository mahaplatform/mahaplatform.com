'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _attachment = require('../../../services/attachment');

var _comment_serializer = require('../../../serializers/comment_serializer');

var _comment_serializer2 = _interopRequireDefault(_comment_serializer);

var _model_activities = require('../../../core/utils/model_activities');

var _model_activities2 = _interopRequireDefault(_model_activities);

var _listening = require('../../../models/listening');

var _listening2 = _interopRequireDefault(_listening);

var _comment = require('../../../models/comment');

var _comment2 = _interopRequireDefault(_comment);

var _server = require('../../../server');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listeners = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, result, options) {
    var team_id, listenable_type, listenable_id, user_id, active_listeners, active_listener_ids, data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            team_id = req.team.get('id');
            listenable_type = result.get('commentable_type');
            listenable_id = result.get('commentable_id');
            user_id = result.get('user_id');
            _context.next = 6;
            return _listening2.default.where({ team_id: team_id, listenable_type: listenable_type, listenable_id: listenable_id }).fetchAll({ transacting: trx });

          case 6:
            active_listeners = _context.sent;
            active_listener_ids = active_listeners.map(function (listener) {
              return listener.get('user_id');
            });

            if (!_lodash2.default.includes(active_listener_ids, user_id)) {
              _context.next = 10;
              break;
            }

            return _context.abrupt('return');

          case 10:
            data = {
              team_id: team_id,
              listenable_type: listenable_type,
              listenable_id: listenable_id,
              user_id: user_id
            };
            _context.next = 13;
            return _listening2.default.forge(data).save(null, { transacting: trx });

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function listeners(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var richComments = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, trx, result, options) {
    var text;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            text = req.body.text.replace('<p>', '').replace('</p>', '\r\n');
            _context2.next = 3;
            return (0, _attachment.extractAttachments)(result, text, trx);

          case 3:
            _context2.next = 5;
            return result.load(['attachments.asset.source', 'attachments.service'], { transacting: trx });

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function richComments(_x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

var afterCreateProcessor = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, trx, result, options) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return listeners(req, trx, result, options);

          case 2:
            _context3.next = 4;
            return richComments(req, trx, result, options);

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function afterCreateProcessor(_x9, _x10, _x11, _x12) {
    return _ref3.apply(this, arguments);
  };
}();

var defaultQuery = function defaultQuery(req, trx, qb, options) {

  qb.where({ commentable_type: req.params.commentable_type });

  qb.where({ commentable_id: req.params.commentable_id });

  qb.orderBy('created_at', 'asc');
};

var defaultParams = function defaultParams(req, trx, options) {
  return {
    user_id: req.user.get('id'),
    commentable_type: req.params.commentable_type,
    commentable_id: req.params.commentable_id
  };
};

var notification = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, trx, result, options) {
    var model, object, conditions, query, listeners;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            model = (0, _model_activities2.default)(result.get('commentable_type')).model;
            _context4.next = 3;
            return model.where({ id: result.get('commentable_id') }).fetch({ transacting: trx });

          case 3:
            object = _context4.sent;
            conditions = {
              team_id: req.team.get('id'),
              listenable_type: result.get('commentable_type'),
              listenable_id: result.get('commentable_id')
            };

            query = function query(qb) {

              qb.whereNull('unsubscribed_at');

              qb.whereNot('user_id', req.user.get('id'));
            };

            _context4.next = 8;
            return _listening2.default.query(query).where(conditions).fetchAll({ transacting: trx });

          case 8:
            listeners = _context4.sent;
            return _context4.abrupt('return', {
              type: 'team:item_comment',
              recipient_ids: listeners.map(function (listener) {
                return listener.get('user_id');
              }),
              subject_id: req.user.get('id'),
              story: 'commented on {object}',
              owner_id: object.get('owner_id'),
              object: object,
              url: object.get('url')
            });

          case 10:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function notification(_x13, _x14, _x15, _x16) {
    return _ref4.apply(this, arguments);
  };
}();

var messages = {
  create: function create(req, trx, result, options) {
    return {
      channel: '/admin/' + req.params.commentable_type + '/' + req.params.commentable_id + '/comments',
      action: 'add_comment',
      data: {
        comment: (0, _comment_serializer2.default)(req, trx, result)
      }
    };
  },
  update: function update(req, trx, result, options) {
    return {
      channel: '/admin/' + req.params.commentable_type + '/' + req.params.commentable_id + '/comments',
      action: 'replace_comment',
      data: {
        comment: (0, _comment_serializer2.default)(req, trx, result)
      }
    };
  },
  destroy: function destroy(req, trx, result, options) {
    return {
      channel: '/admin/' + req.params.commentable_type + '/' + req.params.commentable_id + '/comments',
      action: 'remove_comment',
      data: {
        uid: req.params.uid
      }
    };
  }
};

var commentResources = new _server.Resources({
  afterProcessor: {
    create: afterCreateProcessor,
    update: richComments
  },
  allowedParams: ['uid', 'text', 'quoted_comment_id'],
  defaultParams: defaultParams,
  defaultQuery: defaultQuery,
  messages: messages,
  model: _comment2.default,
  notification: {
    create: notification
  },
  only: ['list', 'create', 'update', 'destroy'],
  path: '/:commentable_type/:commentable_id/comments',
  primaryKey: 'uid',
  serializer: _comment_serializer2.default,
  withRelated: ['user.photo', 'attachments.asset.source', 'attachments.service', 'listenings', 'reactions.user.photo', 'quoted_comment.user.photo']
});

exports.default = commentResources;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsibGlzdGVuZXJzIiwicmVxIiwidHJ4IiwicmVzdWx0Iiwib3B0aW9ucyIsInRlYW1faWQiLCJ0ZWFtIiwiZ2V0IiwibGlzdGVuYWJsZV90eXBlIiwibGlzdGVuYWJsZV9pZCIsInVzZXJfaWQiLCJMaXN0ZW5pbmciLCJ3aGVyZSIsImZldGNoQWxsIiwidHJhbnNhY3RpbmciLCJhY3RpdmVfbGlzdGVuZXJzIiwiYWN0aXZlX2xpc3RlbmVyX2lkcyIsIm1hcCIsImxpc3RlbmVyIiwiXyIsImluY2x1ZGVzIiwiZGF0YSIsImZvcmdlIiwic2F2ZSIsInJpY2hDb21tZW50cyIsInRleHQiLCJib2R5IiwicmVwbGFjZSIsImxvYWQiLCJhZnRlckNyZWF0ZVByb2Nlc3NvciIsImRlZmF1bHRRdWVyeSIsInFiIiwiY29tbWVudGFibGVfdHlwZSIsInBhcmFtcyIsImNvbW1lbnRhYmxlX2lkIiwib3JkZXJCeSIsImRlZmF1bHRQYXJhbXMiLCJ1c2VyIiwibm90aWZpY2F0aW9uIiwibW9kZWwiLCJpZCIsImZldGNoIiwib2JqZWN0IiwiY29uZGl0aW9ucyIsInF1ZXJ5Iiwid2hlcmVOdWxsIiwid2hlcmVOb3QiLCJ0eXBlIiwicmVjaXBpZW50X2lkcyIsInN1YmplY3RfaWQiLCJzdG9yeSIsIm93bmVyX2lkIiwidXJsIiwibWVzc2FnZXMiLCJjcmVhdGUiLCJjaGFubmVsIiwiYWN0aW9uIiwiY29tbWVudCIsInVwZGF0ZSIsImRlc3Ryb3kiLCJ1aWQiLCJjb21tZW50UmVzb3VyY2VzIiwiUmVzb3VyY2VzIiwiYWZ0ZXJQcm9jZXNzb3IiLCJhbGxvd2VkUGFyYW1zIiwiQ29tbWVudCIsIm9ubHkiLCJwYXRoIiwicHJpbWFyeUtleSIsInNlcmlhbGl6ZXIiLCJDb21tZW50U2VyaWFsaXplciIsIndpdGhSZWxhdGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBLElBQU1BO0FBQUEsc0ZBQVksaUJBQU9DLEdBQVAsRUFBWUMsR0FBWixFQUFpQkMsTUFBakIsRUFBeUJDLE9BQXpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVWQyxtQkFGVSxHQUVBSixJQUFJSyxJQUFKLENBQVNDLEdBQVQsQ0FBYSxJQUFiLENBRkE7QUFJVkMsMkJBSlUsR0FJUUwsT0FBT0ksR0FBUCxDQUFXLGtCQUFYLENBSlI7QUFNVkUseUJBTlUsR0FNTU4sT0FBT0ksR0FBUCxDQUFXLGdCQUFYLENBTk47QUFRVkcsbUJBUlUsR0FRQVAsT0FBT0ksR0FBUCxDQUFXLFNBQVgsQ0FSQTtBQUFBO0FBQUEsbUJBVWVJLG9CQUFVQyxLQUFWLENBQWdCLEVBQUVQLGdCQUFGLEVBQVdHLGdDQUFYLEVBQTRCQyw0QkFBNUIsRUFBaEIsRUFBNERJLFFBQTVELENBQXFFLEVBQUVDLGFBQWFaLEdBQWYsRUFBckUsQ0FWZjs7QUFBQTtBQVVWYSw0QkFWVTtBQVlWQywrQkFaVSxHQVlZRCxpQkFBaUJFLEdBQWpCLENBQXFCO0FBQUEscUJBQVlDLFNBQVNYLEdBQVQsQ0FBYSxTQUFiLENBQVo7QUFBQSxhQUFyQixDQVpaOztBQUFBLGlCQWNiWSxpQkFBRUMsUUFBRixDQUFXSixtQkFBWCxFQUFnQ04sT0FBaEMsQ0FkYTtBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQWdCVlcsZ0JBaEJVLEdBZ0JIO0FBQ1hoQiw4QkFEVztBQUVYRyw4Q0FGVztBQUdYQywwQ0FIVztBQUlYQztBQUpXLGFBaEJHO0FBQUE7QUFBQSxtQkF1QlZDLG9CQUFVVyxLQUFWLENBQWdCRCxJQUFoQixFQUFzQkUsSUFBdEIsQ0FBMkIsSUFBM0IsRUFBaUMsRUFBRVQsYUFBYVosR0FBZixFQUFqQyxDQXZCVTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFaOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBMkJBLElBQU1zQjtBQUFBLHVGQUFlLGtCQUFPdkIsR0FBUCxFQUFZQyxHQUFaLEVBQWlCQyxNQUFqQixFQUF5QkMsT0FBekI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRWJxQixnQkFGYSxHQUVOeEIsSUFBSXlCLElBQUosQ0FBU0QsSUFBVCxDQUFjRSxPQUFkLENBQXNCLEtBQXRCLEVBQTRCLEVBQTVCLEVBQWdDQSxPQUFoQyxDQUF3QyxNQUF4QyxFQUFnRCxNQUFoRCxDQUZNO0FBQUE7QUFBQSxtQkFJYixvQ0FBbUJ4QixNQUFuQixFQUEyQnNCLElBQTNCLEVBQWlDdkIsR0FBakMsQ0FKYTs7QUFBQTtBQUFBO0FBQUEsbUJBTWJDLE9BQU95QixJQUFQLENBQVksQ0FBQywwQkFBRCxFQUE0QixxQkFBNUIsQ0FBWixFQUFnRSxFQUFFZCxhQUFhWixHQUFmLEVBQWhFLENBTmE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBZjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztBQVVBLElBQU0yQjtBQUFBLHVGQUF1QixrQkFBTzVCLEdBQVAsRUFBWUMsR0FBWixFQUFpQkMsTUFBakIsRUFBeUJDLE9BQXpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUVyQkosVUFBVUMsR0FBVixFQUFlQyxHQUFmLEVBQW9CQyxNQUFwQixFQUE0QkMsT0FBNUIsQ0FGcUI7O0FBQUE7QUFBQTtBQUFBLG1CQUlyQm9CLGFBQWF2QixHQUFiLEVBQWtCQyxHQUFsQixFQUF1QkMsTUFBdkIsRUFBK0JDLE9BQS9CLENBSnFCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQXZCOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBUUEsSUFBTTBCLGVBQWUsU0FBZkEsWUFBZSxDQUFDN0IsR0FBRCxFQUFNQyxHQUFOLEVBQVc2QixFQUFYLEVBQWUzQixPQUFmLEVBQTJCOztBQUU5QzJCLEtBQUduQixLQUFILENBQVMsRUFBRW9CLGtCQUFrQi9CLElBQUlnQyxNQUFKLENBQVdELGdCQUEvQixFQUFUOztBQUVBRCxLQUFHbkIsS0FBSCxDQUFTLEVBQUVzQixnQkFBZ0JqQyxJQUFJZ0MsTUFBSixDQUFXQyxjQUE3QixFQUFUOztBQUVBSCxLQUFHSSxPQUFILENBQVcsWUFBWCxFQUF5QixLQUF6QjtBQUVELENBUkQ7O0FBVUEsSUFBTUMsZ0JBQWdCLFNBQWhCQSxhQUFnQixDQUFDbkMsR0FBRCxFQUFNQyxHQUFOLEVBQVdFLE9BQVg7QUFBQSxTQUF3QjtBQUM1Q00sYUFBU1QsSUFBSW9DLElBQUosQ0FBUzlCLEdBQVQsQ0FBYSxJQUFiLENBRG1DO0FBRTVDeUIsc0JBQWtCL0IsSUFBSWdDLE1BQUosQ0FBV0QsZ0JBRmU7QUFHNUNFLG9CQUFnQmpDLElBQUlnQyxNQUFKLENBQVdDO0FBSGlCLEdBQXhCO0FBQUEsQ0FBdEI7O0FBTUEsSUFBTUk7QUFBQSx1RkFBZSxrQkFBT3JDLEdBQVAsRUFBWUMsR0FBWixFQUFpQkMsTUFBakIsRUFBeUJDLE9BQXpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVibUMsaUJBRmEsR0FFTCxnQ0FBT3BDLE9BQU9JLEdBQVAsQ0FBVyxrQkFBWCxDQUFQLEVBQXVDZ0MsS0FGbEM7QUFBQTtBQUFBLG1CQUlFQSxNQUFNM0IsS0FBTixDQUFZLEVBQUU0QixJQUFJckMsT0FBT0ksR0FBUCxDQUFXLGdCQUFYLENBQU4sRUFBWixFQUFrRGtDLEtBQWxELENBQXdELEVBQUUzQixhQUFhWixHQUFmLEVBQXhELENBSkY7O0FBQUE7QUFJYndDLGtCQUphO0FBTWJDLHNCQU5hLEdBTUE7QUFDakJ0Qyx1QkFBU0osSUFBSUssSUFBSixDQUFTQyxHQUFULENBQWEsSUFBYixDQURRO0FBRWpCQywrQkFBaUJMLE9BQU9JLEdBQVAsQ0FBVyxrQkFBWCxDQUZBO0FBR2pCRSw2QkFBZU4sT0FBT0ksR0FBUCxDQUFXLGdCQUFYO0FBSEUsYUFOQTs7QUFZYnFDLGlCQVphLEdBWUwsU0FBUkEsS0FBUSxLQUFNOztBQUVsQmIsaUJBQUdjLFNBQUgsQ0FBYSxpQkFBYjs7QUFFQWQsaUJBQUdlLFFBQUgsQ0FBWSxTQUFaLEVBQXVCN0MsSUFBSW9DLElBQUosQ0FBUzlCLEdBQVQsQ0FBYSxJQUFiLENBQXZCO0FBRUQsYUFsQmtCOztBQUFBO0FBQUEsbUJBb0JLSSxvQkFBVWlDLEtBQVYsQ0FBZ0JBLEtBQWhCLEVBQXVCaEMsS0FBdkIsQ0FBNkIrQixVQUE3QixFQUF5QzlCLFFBQXpDLENBQWtELEVBQUVDLGFBQWFaLEdBQWYsRUFBbEQsQ0FwQkw7O0FBQUE7QUFvQmJGLHFCQXBCYTtBQUFBLDhDQXNCWjtBQUNMK0Msb0JBQU0sbUJBREQ7QUFFTEMsNkJBQWVoRCxVQUFVaUIsR0FBVixDQUFjO0FBQUEsdUJBQVlDLFNBQVNYLEdBQVQsQ0FBYSxTQUFiLENBQVo7QUFBQSxlQUFkLENBRlY7QUFHTDBDLDBCQUFZaEQsSUFBSW9DLElBQUosQ0FBUzlCLEdBQVQsQ0FBYSxJQUFiLENBSFA7QUFJTDJDLHFCQUFPLHVCQUpGO0FBS0xDLHdCQUFVVCxPQUFPbkMsR0FBUCxDQUFXLFVBQVgsQ0FMTDtBQU1MbUMsNEJBTks7QUFPTFUsbUJBQUtWLE9BQU9uQyxHQUFQLENBQVcsS0FBWDtBQVBBLGFBdEJZOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQWY7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUFrQ0EsSUFBTThDLFdBQVc7QUFDZkMsVUFBUSxnQkFBQ3JELEdBQUQsRUFBTUMsR0FBTixFQUFXQyxNQUFYLEVBQW1CQyxPQUFuQjtBQUFBLFdBQWdDO0FBQ3RDbUQsMkJBQW1CdEQsSUFBSWdDLE1BQUosQ0FBV0QsZ0JBQTlCLFNBQWtEL0IsSUFBSWdDLE1BQUosQ0FBV0MsY0FBN0QsY0FEc0M7QUFFdENzQixjQUFRLGFBRjhCO0FBR3RDbkMsWUFBTTtBQUNKb0MsaUJBQVMsa0NBQWtCeEQsR0FBbEIsRUFBdUJDLEdBQXZCLEVBQTRCQyxNQUE1QjtBQURMO0FBSGdDLEtBQWhDO0FBQUEsR0FETztBQVFmdUQsVUFBUSxnQkFBQ3pELEdBQUQsRUFBTUMsR0FBTixFQUFXQyxNQUFYLEVBQW1CQyxPQUFuQjtBQUFBLFdBQWdDO0FBQ3RDbUQsMkJBQW1CdEQsSUFBSWdDLE1BQUosQ0FBV0QsZ0JBQTlCLFNBQWtEL0IsSUFBSWdDLE1BQUosQ0FBV0MsY0FBN0QsY0FEc0M7QUFFdENzQixjQUFRLGlCQUY4QjtBQUd0Q25DLFlBQU07QUFDSm9DLGlCQUFTLGtDQUFrQnhELEdBQWxCLEVBQXVCQyxHQUF2QixFQUE0QkMsTUFBNUI7QUFETDtBQUhnQyxLQUFoQztBQUFBLEdBUk87QUFlZndELFdBQVMsaUJBQUMxRCxHQUFELEVBQU1DLEdBQU4sRUFBV0MsTUFBWCxFQUFtQkMsT0FBbkI7QUFBQSxXQUFnQztBQUN2Q21ELDJCQUFtQnRELElBQUlnQyxNQUFKLENBQVdELGdCQUE5QixTQUFrRC9CLElBQUlnQyxNQUFKLENBQVdDLGNBQTdELGNBRHVDO0FBRXZDc0IsY0FBUSxnQkFGK0I7QUFHdkNuQyxZQUFNO0FBQ0p1QyxhQUFLM0QsSUFBSWdDLE1BQUosQ0FBVzJCO0FBRFo7QUFIaUMsS0FBaEM7QUFBQTtBQWZNLENBQWpCOztBQXdCQSxJQUFNQyxtQkFBbUIsSUFBSUMsaUJBQUosQ0FBYztBQUNyQ0Msa0JBQWdCO0FBQ2RULFlBQVF6QixvQkFETTtBQUVkNkIsWUFBUWxDO0FBRk0sR0FEcUI7QUFLckN3QyxpQkFBZSxDQUFDLEtBQUQsRUFBTyxNQUFQLEVBQWMsbUJBQWQsQ0FMc0I7QUFNckM1Qiw4QkFOcUM7QUFPckNOLDRCQVBxQztBQVFyQ3VCLG9CQVJxQztBQVNyQ2QsU0FBTzBCLGlCQVQ4QjtBQVVyQzNCLGdCQUFjO0FBQ1pnQixZQUFRaEI7QUFESSxHQVZ1QjtBQWFyQzRCLFFBQU0sQ0FBQyxNQUFELEVBQVEsUUFBUixFQUFpQixRQUFqQixFQUEwQixTQUExQixDQWIrQjtBQWNyQ0MsUUFBTSw2Q0FkK0I7QUFlckNDLGNBQVksS0FmeUI7QUFnQnJDQyxjQUFZQyw0QkFoQnlCO0FBaUJyQ0MsZUFBYSxDQUFDLFlBQUQsRUFBYywwQkFBZCxFQUF5QyxxQkFBekMsRUFBK0QsWUFBL0QsRUFBNEUsc0JBQTVFLEVBQW1HLDJCQUFuRztBQWpCd0IsQ0FBZCxDQUF6Qjs7a0JBb0JlVixnQiIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXh0cmFjdEF0dGFjaG1lbnRzIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvYXR0YWNobWVudCdcbmltcG9ydCBDb21tZW50U2VyaWFsaXplciBmcm9tICcuLi8uLi8uLi9zZXJpYWxpemVycy9jb21tZW50X3NlcmlhbGl6ZXInXG5pbXBvcnQgbW9kZWxzIGZyb20gJy4uLy4uLy4uL2NvcmUvdXRpbHMvbW9kZWxfYWN0aXZpdGllcydcbmltcG9ydCBMaXN0ZW5pbmcgZnJvbSAnLi4vLi4vLi4vbW9kZWxzL2xpc3RlbmluZydcbmltcG9ydCBDb21tZW50IGZyb20gJy4uLy4uLy4uL21vZGVscy9jb21tZW50J1xuaW1wb3J0IHsgUmVzb3VyY2VzIH0gZnJvbSAnLi4vLi4vLi4vc2VydmVyJ1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuXG5jb25zdCBsaXN0ZW5lcnMgPSBhc3luYyAocmVxLCB0cngsIHJlc3VsdCwgb3B0aW9ucykgPT4ge1xuXG4gIGNvbnN0IHRlYW1faWQgPSByZXEudGVhbS5nZXQoJ2lkJylcblxuICBjb25zdCBsaXN0ZW5hYmxlX3R5cGUgPSByZXN1bHQuZ2V0KCdjb21tZW50YWJsZV90eXBlJylcblxuICBjb25zdCBsaXN0ZW5hYmxlX2lkID0gcmVzdWx0LmdldCgnY29tbWVudGFibGVfaWQnKVxuXG4gIGNvbnN0IHVzZXJfaWQgPSByZXN1bHQuZ2V0KCd1c2VyX2lkJylcblxuICBjb25zdCBhY3RpdmVfbGlzdGVuZXJzID0gYXdhaXQgTGlzdGVuaW5nLndoZXJlKHsgdGVhbV9pZCwgbGlzdGVuYWJsZV90eXBlLCBsaXN0ZW5hYmxlX2lkfSkuZmV0Y2hBbGwoeyB0cmFuc2FjdGluZzogdHJ4IH0pXG5cbiAgY29uc3QgYWN0aXZlX2xpc3RlbmVyX2lkcyA9IGFjdGl2ZV9saXN0ZW5lcnMubWFwKGxpc3RlbmVyID0+IGxpc3RlbmVyLmdldCgndXNlcl9pZCcpKVxuXG4gIGlmKF8uaW5jbHVkZXMoYWN0aXZlX2xpc3RlbmVyX2lkcywgdXNlcl9pZCkpIHJldHVyblxuXG4gIGNvbnN0IGRhdGEgPSB7XG4gICAgdGVhbV9pZCxcbiAgICBsaXN0ZW5hYmxlX3R5cGUsXG4gICAgbGlzdGVuYWJsZV9pZCxcbiAgICB1c2VyX2lkXG4gIH1cblxuICBhd2FpdCBMaXN0ZW5pbmcuZm9yZ2UoZGF0YSkuc2F2ZShudWxsLCB7IHRyYW5zYWN0aW5nOiB0cnggfSlcblxufVxuXG5jb25zdCByaWNoQ29tbWVudHMgPSBhc3luYyAocmVxLCB0cngsIHJlc3VsdCwgb3B0aW9ucykgPT4ge1xuXG4gIGNvbnN0IHRleHQgPSByZXEuYm9keS50ZXh0LnJlcGxhY2UoJzxwPicsJycpLnJlcGxhY2UoJzwvcD4nLCAnXFxyXFxuJylcblxuICBhd2FpdCBleHRyYWN0QXR0YWNobWVudHMocmVzdWx0LCB0ZXh0LCB0cngpXG5cbiAgYXdhaXQgcmVzdWx0LmxvYWQoWydhdHRhY2htZW50cy5hc3NldC5zb3VyY2UnLCdhdHRhY2htZW50cy5zZXJ2aWNlJ10sIHsgdHJhbnNhY3Rpbmc6IHRyeCB9KVxuXG59XG5cbmNvbnN0IGFmdGVyQ3JlYXRlUHJvY2Vzc29yID0gYXN5bmMgKHJlcSwgdHJ4LCByZXN1bHQsIG9wdGlvbnMpID0+IHtcblxuICBhd2FpdCBsaXN0ZW5lcnMocmVxLCB0cngsIHJlc3VsdCwgb3B0aW9ucylcblxuICBhd2FpdCByaWNoQ29tbWVudHMocmVxLCB0cngsIHJlc3VsdCwgb3B0aW9ucylcblxufVxuXG5jb25zdCBkZWZhdWx0UXVlcnkgPSAocmVxLCB0cngsIHFiLCBvcHRpb25zKSA9PiB7XG5cbiAgcWIud2hlcmUoeyBjb21tZW50YWJsZV90eXBlOiByZXEucGFyYW1zLmNvbW1lbnRhYmxlX3R5cGUgfSlcblxuICBxYi53aGVyZSh7IGNvbW1lbnRhYmxlX2lkOiByZXEucGFyYW1zLmNvbW1lbnRhYmxlX2lkIH0pXG5cbiAgcWIub3JkZXJCeSgnY3JlYXRlZF9hdCcsICdhc2MnKVxuXG59XG5cbmNvbnN0IGRlZmF1bHRQYXJhbXMgPSAocmVxLCB0cngsIG9wdGlvbnMpID0+ICh7XG4gIHVzZXJfaWQ6IHJlcS51c2VyLmdldCgnaWQnKSxcbiAgY29tbWVudGFibGVfdHlwZTogcmVxLnBhcmFtcy5jb21tZW50YWJsZV90eXBlLFxuICBjb21tZW50YWJsZV9pZDogcmVxLnBhcmFtcy5jb21tZW50YWJsZV9pZFxufSlcblxuY29uc3Qgbm90aWZpY2F0aW9uID0gYXN5bmMgKHJlcSwgdHJ4LCByZXN1bHQsIG9wdGlvbnMpID0+IHtcblxuICBjb25zdCBtb2RlbCA9IG1vZGVscyhyZXN1bHQuZ2V0KCdjb21tZW50YWJsZV90eXBlJykpLm1vZGVsXG5cbiAgY29uc3Qgb2JqZWN0ID0gYXdhaXQgbW9kZWwud2hlcmUoeyBpZDogcmVzdWx0LmdldCgnY29tbWVudGFibGVfaWQnKSB9KS5mZXRjaCh7IHRyYW5zYWN0aW5nOiB0cnggfSlcblxuICBjb25zdCBjb25kaXRpb25zID0ge1xuICAgIHRlYW1faWQ6IHJlcS50ZWFtLmdldCgnaWQnKSxcbiAgICBsaXN0ZW5hYmxlX3R5cGU6IHJlc3VsdC5nZXQoJ2NvbW1lbnRhYmxlX3R5cGUnKSxcbiAgICBsaXN0ZW5hYmxlX2lkOiByZXN1bHQuZ2V0KCdjb21tZW50YWJsZV9pZCcpXG4gIH1cblxuICBjb25zdCBxdWVyeSA9IHFiID0+IHtcblxuICAgIHFiLndoZXJlTnVsbCgndW5zdWJzY3JpYmVkX2F0JylcblxuICAgIHFiLndoZXJlTm90KCd1c2VyX2lkJywgcmVxLnVzZXIuZ2V0KCdpZCcpKVxuXG4gIH1cblxuICBjb25zdCBsaXN0ZW5lcnMgPSBhd2FpdCBMaXN0ZW5pbmcucXVlcnkocXVlcnkpLndoZXJlKGNvbmRpdGlvbnMpLmZldGNoQWxsKHsgdHJhbnNhY3Rpbmc6IHRyeCB9KVxuXG4gIHJldHVybiB7XG4gICAgdHlwZTogJ3RlYW06aXRlbV9jb21tZW50JyxcbiAgICByZWNpcGllbnRfaWRzOiBsaXN0ZW5lcnMubWFwKGxpc3RlbmVyID0+IGxpc3RlbmVyLmdldCgndXNlcl9pZCcpKSxcbiAgICBzdWJqZWN0X2lkOiByZXEudXNlci5nZXQoJ2lkJyksXG4gICAgc3Rvcnk6ICdjb21tZW50ZWQgb24ge29iamVjdH0nLFxuICAgIG93bmVyX2lkOiBvYmplY3QuZ2V0KCdvd25lcl9pZCcpLFxuICAgIG9iamVjdCxcbiAgICB1cmw6IG9iamVjdC5nZXQoJ3VybCcpXG4gIH1cblxufVxuXG5jb25zdCBtZXNzYWdlcyA9IHtcbiAgY3JlYXRlOiAocmVxLCB0cngsIHJlc3VsdCwgb3B0aW9ucykgPT4gKHtcbiAgICBjaGFubmVsOiBgL2FkbWluLyR7cmVxLnBhcmFtcy5jb21tZW50YWJsZV90eXBlfS8ke3JlcS5wYXJhbXMuY29tbWVudGFibGVfaWR9L2NvbW1lbnRzYCxcbiAgICBhY3Rpb246ICdhZGRfY29tbWVudCcsXG4gICAgZGF0YToge1xuICAgICAgY29tbWVudDogQ29tbWVudFNlcmlhbGl6ZXIocmVxLCB0cngsIHJlc3VsdClcbiAgICB9XG4gIH0pLFxuICB1cGRhdGU6IChyZXEsIHRyeCwgcmVzdWx0LCBvcHRpb25zKSA9PiAoe1xuICAgIGNoYW5uZWw6IGAvYWRtaW4vJHtyZXEucGFyYW1zLmNvbW1lbnRhYmxlX3R5cGV9LyR7cmVxLnBhcmFtcy5jb21tZW50YWJsZV9pZH0vY29tbWVudHNgLFxuICAgIGFjdGlvbjogJ3JlcGxhY2VfY29tbWVudCcsXG4gICAgZGF0YToge1xuICAgICAgY29tbWVudDogQ29tbWVudFNlcmlhbGl6ZXIocmVxLCB0cngsIHJlc3VsdClcbiAgICB9XG4gIH0pLFxuICBkZXN0cm95OiAocmVxLCB0cngsIHJlc3VsdCwgb3B0aW9ucykgPT4gKHtcbiAgICBjaGFubmVsOiBgL2FkbWluLyR7cmVxLnBhcmFtcy5jb21tZW50YWJsZV90eXBlfS8ke3JlcS5wYXJhbXMuY29tbWVudGFibGVfaWR9L2NvbW1lbnRzYCxcbiAgICBhY3Rpb246ICdyZW1vdmVfY29tbWVudCcsXG4gICAgZGF0YToge1xuICAgICAgdWlkOiByZXEucGFyYW1zLnVpZFxuICAgIH1cbiAgfSlcbn1cblxuY29uc3QgY29tbWVudFJlc291cmNlcyA9IG5ldyBSZXNvdXJjZXMoe1xuICBhZnRlclByb2Nlc3Nvcjoge1xuICAgIGNyZWF0ZTogYWZ0ZXJDcmVhdGVQcm9jZXNzb3IsXG4gICAgdXBkYXRlOiByaWNoQ29tbWVudHNcbiAgfSxcbiAgYWxsb3dlZFBhcmFtczogWyd1aWQnLCd0ZXh0JywncXVvdGVkX2NvbW1lbnRfaWQnXSxcbiAgZGVmYXVsdFBhcmFtcyxcbiAgZGVmYXVsdFF1ZXJ5LFxuICBtZXNzYWdlcyxcbiAgbW9kZWw6IENvbW1lbnQsXG4gIG5vdGlmaWNhdGlvbjoge1xuICAgIGNyZWF0ZTogbm90aWZpY2F0aW9uXG4gIH0sXG4gIG9ubHk6IFsnbGlzdCcsJ2NyZWF0ZScsJ3VwZGF0ZScsJ2Rlc3Ryb3knXSxcbiAgcGF0aDogJy86Y29tbWVudGFibGVfdHlwZS86Y29tbWVudGFibGVfaWQvY29tbWVudHMnLFxuICBwcmltYXJ5S2V5OiAndWlkJyxcbiAgc2VyaWFsaXplcjogQ29tbWVudFNlcmlhbGl6ZXIsXG4gIHdpdGhSZWxhdGVkOiBbJ3VzZXIucGhvdG8nLCdhdHRhY2htZW50cy5hc3NldC5zb3VyY2UnLCdhdHRhY2htZW50cy5zZXJ2aWNlJywnbGlzdGVuaW5ncycsJ3JlYWN0aW9ucy51c2VyLnBob3RvJywncXVvdGVkX2NvbW1lbnQudXNlci5waG90byddXG59KVxuXG5leHBvcnQgZGVmYXVsdCBjb21tZW50UmVzb3VyY2VzXG4iXX0=