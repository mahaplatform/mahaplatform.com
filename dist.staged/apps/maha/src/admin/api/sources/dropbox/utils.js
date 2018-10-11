'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getClient = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = require('bluebird');

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _profile = require('../../../../models/profile');

var _profile2 = _interopRequireDefault(_profile);

var _dropboxV2Api = require('dropbox-v2-api');

var _dropboxV2Api2 = _interopRequireDefault(_dropboxV2Api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getClient = exports.getClient = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx) {
    var query, profile, client;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            query = function query(qb) {
              return qb.innerJoin('maha_sources', 'maha_sources.id', 'maha_profiles.source_id');
            };

            _context.next = 3;
            return _profile2.default.query(query).where({ text: 'dropbox', user_id: req.user.get('id') }).fetch({ transacting: trx });

          case 3:
            profile = _context.sent;


            //TODO: refresh token

            client = new _dropboxV2Api2.default.authenticate({
              token: profile.get('data').access_token
            });
            return _context.abrupt('return', (0, _bluebird.promisify)(client));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiZ2V0Q2xpZW50IiwicmVxIiwidHJ4IiwicXVlcnkiLCJxYiIsImlubmVySm9pbiIsIlByb2ZpbGUiLCJ3aGVyZSIsInRleHQiLCJ1c2VyX2lkIiwidXNlciIsImdldCIsImZldGNoIiwidHJhbnNhY3RpbmciLCJwcm9maWxlIiwiY2xpZW50IiwiRHJvcGJveCIsImF1dGhlbnRpY2F0ZSIsInRva2VuIiwiYWNjZXNzX3Rva2VuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztBQUVPLElBQU1BO0FBQUEsc0ZBQVksaUJBQU9DLEdBQVAsRUFBWUMsR0FBWjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFakJDLGlCQUZpQixHQUVULFNBQVJBLEtBQVE7QUFBQSxxQkFBTUMsR0FBR0MsU0FBSCxDQUFhLGNBQWIsRUFBNkIsaUJBQTdCLEVBQWdELHlCQUFoRCxDQUFOO0FBQUEsYUFGUzs7QUFBQTtBQUFBLG1CQUlEQyxrQkFBUUgsS0FBUixDQUFjQSxLQUFkLEVBQXFCSSxLQUFyQixDQUEyQixFQUFFQyxNQUFNLFNBQVIsRUFBbUJDLFNBQVNSLElBQUlTLElBQUosQ0FBU0MsR0FBVCxDQUFhLElBQWIsQ0FBNUIsRUFBM0IsRUFBNEVDLEtBQTVFLENBQWtGLEVBQUVDLGFBQWFYLEdBQWYsRUFBbEYsQ0FKQzs7QUFBQTtBQUlqQlksbUJBSmlCOzs7QUFNdkI7O0FBRU1DLGtCQVJpQixHQVFSLElBQUlDLHVCQUFRQyxZQUFaLENBQXlCO0FBQ3RDQyxxQkFBT0osUUFBUUgsR0FBUixDQUFZLE1BQVosRUFBb0JRO0FBRFcsYUFBekIsQ0FSUTtBQUFBLDZDQVloQix5QkFBa0JKLE1BQWxCLENBWmdCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTiIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb2ZpbGUgZnJvbSAnLi4vLi4vLi4vLi4vbW9kZWxzL3Byb2ZpbGUnXG5pbXBvcnQgRHJvcGJveCBmcm9tICdkcm9wYm94LXYyLWFwaSdcblxuZXhwb3J0IGNvbnN0IGdldENsaWVudCA9IGFzeW5jIChyZXEsIHRyeCkgPT4ge1xuXG4gIGNvbnN0IHF1ZXJ5ID0gcWIgPT4gcWIuaW5uZXJKb2luKCdtYWhhX3NvdXJjZXMnLCAnbWFoYV9zb3VyY2VzLmlkJywgJ21haGFfcHJvZmlsZXMuc291cmNlX2lkJylcblxuICBjb25zdCBwcm9maWxlID0gYXdhaXQgUHJvZmlsZS5xdWVyeShxdWVyeSkud2hlcmUoeyB0ZXh0OiAnZHJvcGJveCcsIHVzZXJfaWQ6IHJlcS51c2VyLmdldCgnaWQnKX0pLmZldGNoKHsgdHJhbnNhY3Rpbmc6IHRyeCB9KVxuXG4gIC8vVE9ETzogcmVmcmVzaCB0b2tlblxuXG4gIGNvbnN0IGNsaWVudCA9IG5ldyBEcm9wYm94LmF1dGhlbnRpY2F0ZSh7XG4gICAgdG9rZW46IHByb2ZpbGUuZ2V0KCdkYXRhJykuYWNjZXNzX3Rva2VuXG4gIH0pXG5cbiAgcmV0dXJuIFByb21pc2UucHJvbWlzaWZ5KGNsaWVudClcblxufVxuIl19