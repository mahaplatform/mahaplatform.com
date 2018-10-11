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

var _dropboxV2Api = require('dropbox-v2-api');

var _dropboxV2Api2 = _interopRequireDefault(_dropboxV2Api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dropbox = new _dropboxV2Api2.default.authenticate({
  client_id: process.env.DROPBOX_APP_KEY,
  client_secret: process.env.DROPBOX_APP_SECRET,
  redirect_uri: process.env.WEB_HOST + '/admin/dropbox/token'
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

              dropbox.getToken(req.query.code, function (err, result, response) {

                if (err) return reject(err);

                resolve(result);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiZHJvcGJveCIsIkRyb3Bib3giLCJhdXRoZW50aWNhdGUiLCJjbGllbnRfaWQiLCJwcm9jZXNzIiwiZW52IiwiRFJPUEJPWF9BUFBfS0VZIiwiY2xpZW50X3NlY3JldCIsIkRST1BCT1hfQVBQX1NFQ1JFVCIsInJlZGlyZWN0X3VyaSIsIldFQl9IT1NUIiwidG9rZW4iLCJyZXEiLCJyZXMiLCJuZXh0IiwicmVzb2x2ZSIsInJlamVjdCIsImdldFRva2VuIiwicXVlcnkiLCJjb2RlIiwiZXJyIiwicmVzdWx0IiwicmVzcG9uc2UiLCJkYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0FBRUEsSUFBTUEsVUFBVSxJQUFJQyx1QkFBUUMsWUFBWixDQUF5QjtBQUN2Q0MsYUFBV0MsUUFBUUMsR0FBUixDQUFZQyxlQURnQjtBQUV2Q0MsaUJBQWVILFFBQVFDLEdBQVIsQ0FBWUcsa0JBRlk7QUFHdkNDLGdCQUFpQkwsUUFBUUMsR0FBUixDQUFZSyxRQUE3QjtBQUh1QyxDQUF6QixDQUFoQjs7QUFNQSxJQUFNQztBQUFBLHNGQUFRLGlCQUFPQyxHQUFQLEVBQVlDLEdBQVosRUFBaUJDLElBQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRU8sdUJBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCOztBQUVsRGhCLHNCQUFRaUIsUUFBUixDQUFpQkwsSUFBSU0sS0FBSixDQUFVQyxJQUEzQixFQUFpQyxVQUFDQyxHQUFELEVBQU1DLE1BQU4sRUFBY0MsUUFBZCxFQUEyQjs7QUFFMUQsb0JBQUdGLEdBQUgsRUFBUSxPQUFPSixPQUFPSSxHQUFQLENBQVA7O0FBRVJMLHdCQUFRTSxNQUFSO0FBRUQsZUFORDtBQVFELGFBVmtCLENBRlA7O0FBQUE7QUFFTkUsZ0JBRk07QUFBQSw2Q0FjTEEsSUFkSzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFSOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O2tCQWtCZVosSyIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERyb3Bib3ggZnJvbSAnZHJvcGJveC12Mi1hcGknXG5cbmNvbnN0IGRyb3Bib3ggPSBuZXcgRHJvcGJveC5hdXRoZW50aWNhdGUoe1xuICBjbGllbnRfaWQ6IHByb2Nlc3MuZW52LkRST1BCT1hfQVBQX0tFWSxcbiAgY2xpZW50X3NlY3JldDogcHJvY2Vzcy5lbnYuRFJPUEJPWF9BUFBfU0VDUkVULFxuICByZWRpcmVjdF91cmk6IGAke3Byb2Nlc3MuZW52LldFQl9IT1NUfS9hZG1pbi9kcm9wYm94L3Rva2VuYFxufSlcblxuY29uc3QgdG9rZW4gPSBhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcblxuICBjb25zdCBkYXRhID0gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgZHJvcGJveC5nZXRUb2tlbihyZXEucXVlcnkuY29kZSwgKGVyciwgcmVzdWx0LCByZXNwb25zZSkgPT4ge1xuXG4gICAgICBpZihlcnIpIHJldHVybiByZWplY3QoZXJyKVxuXG4gICAgICByZXNvbHZlKHJlc3VsdClcblxuICAgIH0pXG5cbiAgfSlcblxuICByZXR1cm4gZGF0YVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IHRva2VuXG4iXX0=