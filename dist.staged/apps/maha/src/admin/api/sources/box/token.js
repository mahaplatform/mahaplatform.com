'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _boxNodeSdk = require('box-node-sdk');

var _boxNodeSdk2 = _interopRequireDefault(_boxNodeSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var box = new _boxNodeSdk2.default({
  clientID: process.env.BOX_CLIENT_ID,
  clientSecret: process.env.BOX_CLIENT_SECRET
});

var token = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return new _bluebird2.default(function (resolve, reject) {

              box.getTokensAuthorizationCodeGrant(req.query.code, null, function (err, token) {

                if (err) reject(err);

                resolve(token);
              });
            });

          case 2:
            data = _context.sent;
            return _context.abrupt('return', data);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function token(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = token;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiYm94IiwiQm94IiwiY2xpZW50SUQiLCJwcm9jZXNzIiwiZW52IiwiQk9YX0NMSUVOVF9JRCIsImNsaWVudFNlY3JldCIsIkJPWF9DTElFTlRfU0VDUkVUIiwidG9rZW4iLCJyZXEiLCJyZXMiLCJuZXh0IiwicmVzb2x2ZSIsInJlamVjdCIsImdldFRva2Vuc0F1dGhvcml6YXRpb25Db2RlR3JhbnQiLCJxdWVyeSIsImNvZGUiLCJlcnIiLCJkYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0FBRUEsSUFBTUEsTUFBTSxJQUFJQyxvQkFBSixDQUFRO0FBQ2xCQyxZQUFVQyxRQUFRQyxHQUFSLENBQVlDLGFBREo7QUFFbEJDLGdCQUFjSCxRQUFRQyxHQUFSLENBQVlHO0FBRlIsQ0FBUixDQUFaOztBQUtBLElBQU1DO0FBQUEsc0ZBQVEsaUJBQU9DLEdBQVAsRUFBWUMsR0FBWixFQUFpQkMsSUFBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFFTyx1QkFBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7O0FBRWxEYixrQkFBSWMsK0JBQUosQ0FBb0NMLElBQUlNLEtBQUosQ0FBVUMsSUFBOUMsRUFBb0QsSUFBcEQsRUFBMEQsVUFBQ0MsR0FBRCxFQUFNVCxLQUFOLEVBQWdCOztBQUV4RSxvQkFBR1MsR0FBSCxFQUFRSixPQUFPSSxHQUFQOztBQUVSTCx3QkFBUUosS0FBUjtBQUVELGVBTkQ7QUFRRCxhQVZrQixDQUZQOztBQUFBO0FBRU5VLGdCQUZNO0FBQUEsNkNBY0xBLElBZEs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBUjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztrQkFrQmVWLEsiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCb3ggZnJvbSAnYm94LW5vZGUtc2RrJ1xuXG5jb25zdCBib3ggPSBuZXcgQm94KHtcbiAgY2xpZW50SUQ6IHByb2Nlc3MuZW52LkJPWF9DTElFTlRfSUQsXG4gIGNsaWVudFNlY3JldDogcHJvY2Vzcy5lbnYuQk9YX0NMSUVOVF9TRUNSRVRcbn0pXG5cbmNvbnN0IHRva2VuID0gYXN5bmMgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG5cbiAgY29uc3QgZGF0YSA9IGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIGJveC5nZXRUb2tlbnNBdXRob3JpemF0aW9uQ29kZUdyYW50KHJlcS5xdWVyeS5jb2RlLCBudWxsLCAoZXJyLCB0b2tlbikgPT4ge1xuXG4gICAgICBpZihlcnIpIHJlamVjdChlcnIpXG5cbiAgICAgIHJlc29sdmUodG9rZW4pXG5cbiAgICB9KVxuXG4gIH0pXG5cbiAgcmV0dXJuIGRhdGFcblxufVxuXG5leHBvcnQgZGVmYXVsdCB0b2tlblxuIl19