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

var _googleapis = require('googleapis');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = new _googleapis.google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.WEB_HOST + '/admin/google/token');

var token = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return new _bluebird2.default(function (resolve, reject) {
              auth.getToken(req.query.code, function (err, data) {
                if (err) reject(err);
                resolve(data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiYXV0aCIsImdvb2dsZSIsIk9BdXRoMiIsInByb2Nlc3MiLCJlbnYiLCJHT09HTEVfQ0xJRU5UX0lEIiwiR09PR0xFX0NMSUVOVF9TRUNSRVQiLCJXRUJfSE9TVCIsInRva2VuIiwicmVxIiwicmVzIiwibmV4dCIsInJlc29sdmUiLCJyZWplY3QiLCJnZXRUb2tlbiIsInF1ZXJ5IiwiY29kZSIsImVyciIsImRhdGEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBRUEsSUFBTUEsT0FBTyxJQUFJQyxtQkFBT0QsSUFBUCxDQUFZRSxNQUFoQixDQUF1QkMsUUFBUUMsR0FBUixDQUFZQyxnQkFBbkMsRUFBcURGLFFBQVFDLEdBQVIsQ0FBWUUsb0JBQWpFLEVBQTBGSCxRQUFRQyxHQUFSLENBQVlHLFFBQXRHLHlCQUFiOztBQUVBLElBQU1DO0FBQUEsc0ZBQVEsaUJBQU9DLEdBQVAsRUFBWUMsR0FBWixFQUFpQkMsSUFBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFFTyx1QkFBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDbERiLG1CQUFLYyxRQUFMLENBQWNMLElBQUlNLEtBQUosQ0FBVUMsSUFBeEIsRUFBOEIsVUFBQ0MsR0FBRCxFQUFNQyxJQUFOLEVBQWU7QUFDM0Msb0JBQUdELEdBQUgsRUFBUUosT0FBT0ksR0FBUDtBQUNSTCx3QkFBUU0sSUFBUjtBQUNELGVBSEQ7QUFJRCxhQUxrQixDQUZQOztBQUFBO0FBRU5BLGdCQUZNO0FBQUEsNkNBU0xBLElBVEs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBUjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztrQkFhZVYsSyIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ29vZ2xlIH0gZnJvbSAnZ29vZ2xlYXBpcydcblxuY29uc3QgYXV0aCA9IG5ldyBnb29nbGUuYXV0aC5PQXV0aDIocHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9JRCwgcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9TRUNSRVQsIGAke3Byb2Nlc3MuZW52LldFQl9IT1NUfS9hZG1pbi9nb29nbGUvdG9rZW5gKVxuXG5jb25zdCB0b2tlbiA9IGFzeW5jIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuXG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgYXV0aC5nZXRUb2tlbihyZXEucXVlcnkuY29kZSwgKGVyciwgZGF0YSkgPT4ge1xuICAgICAgaWYoZXJyKSByZWplY3QoZXJyKVxuICAgICAgcmVzb2x2ZShkYXRhKVxuICAgIH0pXG4gIH0pXG5cbiAgcmV0dXJuIGRhdGFcblxufVxuXG5leHBvcnQgZGVmYXVsdCB0b2tlblxuIl19