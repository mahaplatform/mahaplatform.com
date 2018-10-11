'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getClient = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _profile = require('../../../../models/profile');

var _profile2 = _interopRequireDefault(_profile);

var _fb = require('fb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var client = new _fb.Facebook({
  appId: process.env.FACEBOOK_APP_ID,
  appSecret: process.env.FACEBOOK_APP_SECRET,
  Promise: _bluebird2.default
});

var getClient = exports.getClient = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx) {
    var query, profile;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            query = function query(qb) {
              return qb.innerJoin('maha_sources', 'maha_sources.id', 'maha_profiles.source_id');
            };

            _context.next = 3;
            return _profile2.default.query(query).where({ text: 'facebook', user_id: req.user.get('id') }).fetch({ transacting: trx });

          case 3:
            profile = _context.sent;


            //TODO: refresh token

            client.setAccessToken(profile.get('data').access_token);

            return _context.abrupt('return', client);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getClient(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiY2xpZW50IiwiRmFjZWJvb2siLCJhcHBJZCIsInByb2Nlc3MiLCJlbnYiLCJGQUNFQk9PS19BUFBfSUQiLCJhcHBTZWNyZXQiLCJGQUNFQk9PS19BUFBfU0VDUkVUIiwiUHJvbWlzZSIsImdldENsaWVudCIsInJlcSIsInRyeCIsInF1ZXJ5IiwicWIiLCJpbm5lckpvaW4iLCJQcm9maWxlIiwid2hlcmUiLCJ0ZXh0IiwidXNlcl9pZCIsInVzZXIiLCJnZXQiLCJmZXRjaCIsInRyYW5zYWN0aW5nIiwicHJvZmlsZSIsInNldEFjY2Vzc1Rva2VuIiwiYWNjZXNzX3Rva2VuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBLElBQU1BLFNBQVMsSUFBSUMsWUFBSixDQUFhO0FBQzFCQyxTQUFPQyxRQUFRQyxHQUFSLENBQVlDLGVBRE87QUFFMUJDLGFBQVdILFFBQVFDLEdBQVIsQ0FBWUcsbUJBRkc7QUFHMUJDO0FBSDBCLENBQWIsQ0FBZjs7QUFNTyxJQUFNQztBQUFBLHNGQUFZLGlCQUFPQyxHQUFQLEVBQVlDLEdBQVo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRWpCQyxpQkFGaUIsR0FFVCxTQUFSQSxLQUFRO0FBQUEscUJBQU1DLEdBQUdDLFNBQUgsQ0FBYSxjQUFiLEVBQTZCLGlCQUE3QixFQUFnRCx5QkFBaEQsQ0FBTjtBQUFBLGFBRlM7O0FBQUE7QUFBQSxtQkFJREMsa0JBQVFILEtBQVIsQ0FBY0EsS0FBZCxFQUFxQkksS0FBckIsQ0FBMkIsRUFBRUMsTUFBTSxVQUFSLEVBQW9CQyxTQUFTUixJQUFJUyxJQUFKLENBQVNDLEdBQVQsQ0FBYSxJQUFiLENBQTdCLEVBQTNCLEVBQTZFQyxLQUE3RSxDQUFtRixFQUFFQyxhQUFhWCxHQUFmLEVBQW5GLENBSkM7O0FBQUE7QUFJakJZLG1CQUppQjs7O0FBTXZCOztBQUVBdkIsbUJBQU93QixjQUFQLENBQXNCRCxRQUFRSCxHQUFSLENBQVksTUFBWixFQUFvQkssWUFBMUM7O0FBUnVCLDZDQVVoQnpCLE1BVmdCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTiIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb2ZpbGUgZnJvbSAnLi4vLi4vLi4vLi4vbW9kZWxzL3Byb2ZpbGUnXG5pbXBvcnQgeyBGYWNlYm9vayB9IGZyb20gJ2ZiJ1xuXG5jb25zdCBjbGllbnQgPSBuZXcgRmFjZWJvb2soe1xuICBhcHBJZDogcHJvY2Vzcy5lbnYuRkFDRUJPT0tfQVBQX0lELFxuICBhcHBTZWNyZXQ6IHByb2Nlc3MuZW52LkZBQ0VCT09LX0FQUF9TRUNSRVQsXG4gIFByb21pc2Vcbn0pXG5cbmV4cG9ydCBjb25zdCBnZXRDbGllbnQgPSBhc3luYyAocmVxLCB0cngpID0+IHtcblxuICBjb25zdCBxdWVyeSA9IHFiID0+IHFiLmlubmVySm9pbignbWFoYV9zb3VyY2VzJywgJ21haGFfc291cmNlcy5pZCcsICdtYWhhX3Byb2ZpbGVzLnNvdXJjZV9pZCcpXG5cbiAgY29uc3QgcHJvZmlsZSA9IGF3YWl0IFByb2ZpbGUucXVlcnkocXVlcnkpLndoZXJlKHsgdGV4dDogJ2ZhY2Vib29rJywgdXNlcl9pZDogcmVxLnVzZXIuZ2V0KCdpZCcpfSkuZmV0Y2goeyB0cmFuc2FjdGluZzogdHJ4IH0pXG5cbiAgLy9UT0RPOiByZWZyZXNoIHRva2VuXG5cbiAgY2xpZW50LnNldEFjY2Vzc1Rva2VuKHByb2ZpbGUuZ2V0KCdkYXRhJykuYWNjZXNzX3Rva2VuKVxuXG4gIHJldHVybiBjbGllbnRcblxufVxuIl19