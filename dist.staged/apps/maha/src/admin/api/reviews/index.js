'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _review_serializer = require('../../../serializers/review_serializer');

var _review_serializer2 = _interopRequireDefault(_review_serializer);

var _review = require('../../../models/review');

var _review2 = _interopRequireDefault(_review);

var _server = require('../../../server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var afterCreateProcessor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, result, options) {
    var conditions, review_average, review_count, data, id;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            conditions = {
              reviewable_type: req.params.reviewable_type,
              reviewable_id: req.params.reviewable_id
            };
            _context.next = 3;
            return options.knex('maha_reviews').transacting(trx).avg('score').where(conditions);

          case 3:
            review_average = _context.sent;
            _context.next = 6;
            return options.knex('maha_reviews').transacting(trx).count('*').where(conditions);

          case 6:
            review_count = _context.sent;
            data = {
              review_average: review_average[0].avg,
              review_count: review_count[0].count
            };
            id = req.params.reviewable_id;
            _context.next = 11;
            return options.knex(req.params.reviewable_type).transacting(trx).where({ id: id }).update(data);

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function afterCreateProcessor(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var defaultQuery = function defaultQuery(req, trx, qb, options) {

  qb.where({ reviewable_type: req.params.reviewable_type });

  qb.where({ reviewable_id: req.params.reviewable_id });

  qb.orderBy('created_at', 'asc');
};

var defaultParams = function defaultParams(req, trx, options) {
  return {
    user_id: req.user.get('id'),
    reviewable_type: req.params.reviewable_type,
    reviewable_id: req.params.reviewable_id
  };
};

var messages = {
  create: function create(req, trx, result, options) {
    return {
      channel: '/admin/' + req.params.reviewable_type + '/' + req.params.reviewable_id + '/reviews',
      action: 'add',
      data: {
        review: (0, _review_serializer2.default)(req, trx, result)
      }
    };
  },
  update: function update(req, trx, result, options) {
    return {
      channel: '/admin/' + req.params.reviewable_type + '/' + req.params.reviewable_id + '/reviews',
      action: 'replace',
      data: {
        review: (0, _review_serializer2.default)(req, trx, result)
      }
    };
  },
  destroy: function destroy(req, trx, result, options) {
    return {
      channel: '/admin/' + req.params.reviewable_type + '/' + req.params.reviewable_id + '/reviews',
      action: 'remove',
      data: {
        uid: req.params.uid
      }
    };
  }
};

var reviewResources = new _server.Resources({
  afterProcessor: {
    create: afterCreateProcessor
  },
  allowedParams: ['uid', 'score', 'text'],
  defaultParams: defaultParams,
  defaultQuery: defaultQuery,
  messages: messages,
  model: _review2.default,
  only: ['list', 'create', 'update', 'destroy'],
  path: '/:reviewable_type/:reviewable_id/reviews',
  primaryKey: 'uid',
  serializer: _review_serializer2.default,
  withRelated: ['user.photo']
});

exports.default = reviewResources;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiYWZ0ZXJDcmVhdGVQcm9jZXNzb3IiLCJyZXEiLCJ0cngiLCJyZXN1bHQiLCJvcHRpb25zIiwiY29uZGl0aW9ucyIsInJldmlld2FibGVfdHlwZSIsInBhcmFtcyIsInJldmlld2FibGVfaWQiLCJrbmV4IiwidHJhbnNhY3RpbmciLCJhdmciLCJ3aGVyZSIsInJldmlld19hdmVyYWdlIiwiY291bnQiLCJyZXZpZXdfY291bnQiLCJkYXRhIiwiaWQiLCJ1cGRhdGUiLCJkZWZhdWx0UXVlcnkiLCJxYiIsIm9yZGVyQnkiLCJkZWZhdWx0UGFyYW1zIiwidXNlcl9pZCIsInVzZXIiLCJnZXQiLCJtZXNzYWdlcyIsImNyZWF0ZSIsImNoYW5uZWwiLCJhY3Rpb24iLCJyZXZpZXciLCJkZXN0cm95IiwidWlkIiwicmV2aWV3UmVzb3VyY2VzIiwiUmVzb3VyY2VzIiwiYWZ0ZXJQcm9jZXNzb3IiLCJhbGxvd2VkUGFyYW1zIiwibW9kZWwiLCJSZXZpZXciLCJvbmx5IiwicGF0aCIsInByaW1hcnlLZXkiLCJzZXJpYWxpemVyIiwiUmV2aWV3U2VyaWFsaXplciIsIndpdGhSZWxhdGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBLElBQU1BO0FBQUEsc0ZBQXVCLGlCQUFPQyxHQUFQLEVBQVlDLEdBQVosRUFBaUJDLE1BQWpCLEVBQXlCQyxPQUF6QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFckJDLHNCQUZxQixHQUVSO0FBQ2pCQywrQkFBaUJMLElBQUlNLE1BQUosQ0FBV0QsZUFEWDtBQUVqQkUsNkJBQWVQLElBQUlNLE1BQUosQ0FBV0M7QUFGVCxhQUZRO0FBQUE7QUFBQSxtQkFPRUosUUFBUUssSUFBUixDQUFhLGNBQWIsRUFBNkJDLFdBQTdCLENBQXlDUixHQUF6QyxFQUE4Q1MsR0FBOUMsQ0FBa0QsT0FBbEQsRUFBMkRDLEtBQTNELENBQWlFUCxVQUFqRSxDQVBG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LGtCQUFrQixJQUFJQyxpQkFBSixDQUFjO0FBQ3BDQyxrQkFBZ0I7QUFDZFIsWUFBUTNCO0FBRE0sR0FEb0I7QUFJcENvQyxpQkFBZSxDQUFDLEtBQUQsRUFBTyxPQUFQLEVBQWUsTUFBZixDQUpxQjtBQUtwQ2QsOEJBTG9DO0FBTXBDSCw0QkFOb0M7QUFPcENPLG9CQVBvQztBQVFwQ1csU0FBT0MsZ0JBUjZCO0FBU3BDQyxRQUFNLENBQUMsTUFBRCxFQUFRLFFBQVIsRUFBaUIsUUFBakIsRUFBMEIsU0FBMUIsQ0FUOEI7QUFVcENDLFFBQU0sMENBVjhCO0FBV3BDQyxjQUFZLEtBWHdCO0FBWXBDQyxjQUFZQywyQkFad0I7QUFhcENDLGVBQWEsQ0FBQyxZQUFEO0FBYnVCLENBQWQsQ0FBeEI7O2tCQWdCZVgsZSIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJldmlld1NlcmlhbGl6ZXIgZnJvbSAnLi4vLi4vLi4vc2VyaWFsaXplcnMvcmV2aWV3X3NlcmlhbGl6ZXInXG5pbXBvcnQgUmV2aWV3IGZyb20gJy4uLy4uLy4uL21vZGVscy9yZXZpZXcnXG5pbXBvcnQgeyBSZXNvdXJjZXMgfSBmcm9tICcuLi8uLi8uLi9zZXJ2ZXInXG5cbmNvbnN0IGFmdGVyQ3JlYXRlUHJvY2Vzc29yID0gYXN5bmMgKHJlcSwgdHJ4LCByZXN1bHQsIG9wdGlvbnMpID0+IHtcblxuICBjb25zdCBjb25kaXRpb25zID0ge1xuICAgIHJldmlld2FibGVfdHlwZTogcmVxLnBhcmFtcy5yZXZpZXdhYmxlX3R5cGUsXG4gICAgcmV2aWV3YWJsZV9pZDogcmVxLnBhcmFtcy5yZXZpZXdhYmxlX2lkXG4gIH1cblxuICBjb25zdCByZXZpZXdfYXZlcmFnZSA9IGF3YWl0IG9wdGlvbnMua25leCgnbWFoYV9yZXZpZXdzJykudHJhbnNhY3RpbmcodHJ4KS5hdmcoJ3Njb3JlJykud2hlcmUoY29uZGl0aW9ucylcblxuICBjb25zdCByZXZpZXdfY291bnQgPSBhd2FpdCBvcHRpb25zLmtuZXgoJ21haGFfcmV2aWV3cycpLnRyYW5zYWN0aW5nKHRyeCkuY291bnQoJyonKS53aGVyZShjb25kaXRpb25zKVxuXG4gIGNvbnN0IGRhdGEgPSB7XG4gICAgcmV2aWV3X2F2ZXJhZ2U6IHJldmlld19hdmVyYWdlWzBdLmF2ZyxcbiAgICByZXZpZXdfY291bnQ6IHJldmlld19jb3VudFswXS5jb3VudFxuICB9XG5cbiAgY29uc3QgaWQgPSByZXEucGFyYW1zLnJldmlld2FibGVfaWRcblxuICBhd2FpdCBvcHRpb25zLmtuZXgocmVxLnBhcmFtcy5yZXZpZXdhYmxlX3R5cGUpLnRyYW5zYWN0aW5nKHRyeCkud2hlcmUoeyBpZCB9KS51cGRhdGUoZGF0YSlcblxufVxuXG5jb25zdCBkZWZhdWx0UXVlcnkgPSAocmVxLCB0cngsIHFiLCBvcHRpb25zKSA9PiB7XG5cbiAgcWIud2hlcmUoeyByZXZpZXdhYmxlX3R5cGU6IHJlcS5wYXJhbXMucmV2aWV3YWJsZV90eXBlIH0pXG5cbiAgcWIud2hlcmUoeyByZXZpZXdhYmxlX2lkOiByZXEucGFyYW1zLnJldmlld2FibGVfaWQgfSlcblxuICBxYi5vcmRlckJ5KCdjcmVhdGVkX2F0JywgJ2FzYycpXG5cbn1cblxuY29uc3QgZGVmYXVsdFBhcmFtcyA9IChyZXEsIHRyeCwgb3B0aW9ucykgPT4gKHtcbiAgdXNlcl9pZDogcmVxLnVzZXIuZ2V0KCdpZCcpLFxuICByZXZpZXdhYmxlX3R5cGU6IHJlcS5wYXJhbXMucmV2aWV3YWJsZV90eXBlLFxuICByZXZpZXdhYmxlX2lkOiByZXEucGFyYW1zLnJldmlld2FibGVfaWRcbn0pXG5cbmNvbnN0IG1lc3NhZ2VzID0ge1xuICBjcmVhdGU6IChyZXEsIHRyeCwgcmVzdWx0LCBvcHRpb25zKSA9PiAoe1xuICAgIGNoYW5uZWw6IGAvYWRtaW4vJHtyZXEucGFyYW1zLnJldmlld2FibGVfdHlwZX0vJHtyZXEucGFyYW1zLnJldmlld2FibGVfaWR9L3Jldmlld3NgLFxuICAgIGFjdGlvbjogJ2FkZCcsXG4gICAgZGF0YToge1xuICAgICAgcmV2aWV3OiBSZXZpZXdTZXJpYWxpemVyKHJlcSwgdHJ4LCByZXN1bHQpXG4gICAgfVxuICB9KSxcbiAgdXBkYXRlOiAocmVxLCB0cngsIHJlc3VsdCwgb3B0aW9ucykgPT4gKHtcbiAgICBjaGFubmVsOiBgL2FkbWluLyR7cmVxLnBhcmFtcy5yZXZpZXdhYmxlX3R5cGV9LyR7cmVxLnBhcmFtcy5yZXZpZXdhYmxlX2lkfS9yZXZpZXdzYCxcbiAgICBhY3Rpb246ICdyZXBsYWNlJyxcbiAgICBkYXRhOiB7XG4gICAgICByZXZpZXc6IFJldmlld1NlcmlhbGl6ZXIocmVxLCB0cngsIHJlc3VsdClcbiAgICB9XG4gIH0pLFxuICBkZXN0cm95OiAocmVxLCB0cngsIHJlc3VsdCwgb3B0aW9ucykgPT4gKHtcbiAgICBjaGFubmVsOiBgL2FkbWluLyR7cmVxLnBhcmFtcy5yZXZpZXdhYmxlX3R5cGV9LyR7cmVxLnBhcmFtcy5yZXZpZXdhYmxlX2lkfS9yZXZpZXdzYCxcbiAgICBhY3Rpb246ICdyZW1vdmUnLFxuICAgIGRhdGE6IHtcbiAgICAgIHVpZDogcmVxLnBhcmFtcy51aWRcbiAgICB9XG4gIH0pXG59XG5cbmNvbnN0IHJldmlld1Jlc291cmNlcyA9IG5ldyBSZXNvdXJjZXMoe1xuICBhZnRlclByb2Nlc3Nvcjoge1xuICAgIGNyZWF0ZTogYWZ0ZXJDcmVhdGVQcm9jZXNzb3JcbiAgfSxcbiAgYWxsb3dlZFBhcmFtczogWyd1aWQnLCdzY29yZScsJ3RleHQnXSxcbiAgZGVmYXVsdFBhcmFtcyxcbiAgZGVmYXVsdFF1ZXJ5LFxuICBtZXNzYWdlcyxcbiAgbW9kZWw6IFJldmlldyxcbiAgb25seTogWydsaXN0JywnY3JlYXRlJywndXBkYXRlJywnZGVzdHJveSddLFxuICBwYXRoOiAnLzpyZXZpZXdhYmxlX3R5cGUvOnJldmlld2FibGVfaWQvcmV2aWV3cycsXG4gIHByaW1hcnlLZXk6ICd1aWQnLFxuICBzZXJpYWxpemVyOiBSZXZpZXdTZXJpYWxpemVyLFxuICB3aXRoUmVsYXRlZDogWyd1c2VyLnBob3RvJ11cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IHJldmlld1Jlc291cmNlc1xuIl19