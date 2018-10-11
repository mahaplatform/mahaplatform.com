'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = require('../../../server');

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var id, asset;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = req.params.id;
            _context.next = 3;
            return _server.Asset.where({ id: id }).fetch({ transacting: trx });

          case 3:
            asset = _context.sent;
            return _context.abrupt('return', asset);

          case 5:
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

var DownloadResponder = function (_Responder) {
  (0, _inherits3.default)(DownloadResponder, _Responder);

  function DownloadResponder() {
    (0, _classCallCheck3.default)(this, DownloadResponder);
    return (0, _possibleConstructorReturn3.default)(this, (DownloadResponder.__proto__ || Object.getPrototypeOf(DownloadResponder)).apply(this, arguments));
  }

  (0, _createClass3.default)(DownloadResponder, [{
    key: 'render',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var host, path, requestOptions, image;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                host = process.env.DATA_ASSET_CDN_HOST || process.env.DATA_ASSET_HOST || process.env.WEB_HOST;
                path = this.data.path;
                requestOptions = {
                  url: host + path,
                  encoding: null
                };
                _context2.next = 5;
                return new _bluebird2.default(function (resolve, reject) {
                  return (0, _request2.default)(requestOptions, function (error, response, body) {

                    if (error) reject(error);

                    resolve(body);
                  });
                });

              case 5:
                image = _context2.sent;


                this.res.setHeader('Content-disposition', 'attachment; filename=' + this.data.file_name);

                this.res.status(200).type(this.data.content_type).send(image);

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function render() {
        return _ref2.apply(this, arguments);
      }

      return render;
    }()
  }]);
  return DownloadResponder;
}(_server.Responder);

var downloadRoute = new _server.Route({
  method: 'get',
  path: '/assets/:id/download',
  processor: processor,
  responder: DownloadResponder
});

exports.default = downloadRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsImlkIiwicGFyYW1zIiwiQXNzZXQiLCJ3aGVyZSIsImZldGNoIiwidHJhbnNhY3RpbmciLCJhc3NldCIsIkRvd25sb2FkUmVzcG9uZGVyIiwiaG9zdCIsInByb2Nlc3MiLCJlbnYiLCJEQVRBX0FTU0VUX0NETl9IT1NUIiwiREFUQV9BU1NFVF9IT1NUIiwiV0VCX0hPU1QiLCJwYXRoIiwiZGF0YSIsInJlcXVlc3RPcHRpb25zIiwidXJsIiwiZW5jb2RpbmciLCJyZXNvbHZlIiwicmVqZWN0IiwiZXJyb3IiLCJyZXNwb25zZSIsImJvZHkiLCJpbWFnZSIsInJlcyIsInNldEhlYWRlciIsImZpbGVfbmFtZSIsInN0YXR1cyIsInR5cGUiLCJjb250ZW50X3R5cGUiLCJzZW5kIiwiUmVzcG9uZGVyIiwiZG93bmxvYWRSb3V0ZSIsIlJvdXRlIiwibWV0aG9kIiwicmVzcG9uZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7OztBQUVBLElBQU1BO0FBQUEsc0ZBQVksaUJBQU9DLEdBQVAsRUFBWUMsR0FBWixFQUFpQkMsT0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRVZDLGNBRlUsR0FFTEgsSUFBSUksTUFBSixDQUFXRCxFQUZOO0FBQUE7QUFBQSxtQkFJSUUsY0FBTUMsS0FBTixDQUFZLEVBQUVILE1BQUYsRUFBWixFQUFvQkksS0FBcEIsQ0FBMEIsRUFBRUMsYUFBYVAsR0FBZixFQUExQixDQUpKOztBQUFBO0FBSVZRLGlCQUpVO0FBQUEsNkNBTVRBLEtBTlM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztJQVNNQyxpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJSUMsb0IsR0FBT0MsUUFBUUMsR0FBUixDQUFZQyxtQkFBWixJQUFtQ0YsUUFBUUMsR0FBUixDQUFZRSxlQUEvQyxJQUFrRUgsUUFBUUMsR0FBUixDQUFZRyxRO0FBRXJGQyxvQixHQUFPLEtBQUtDLElBQUwsQ0FBVUQsSTtBQUVqQkUsOEIsR0FBaUI7QUFDckJDLHVCQUFLVCxPQUFPTSxJQURTO0FBRXJCSSw0QkFBVTtBQUZXLGlCOzt1QkFLSCx1QkFBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVY7QUFBQSx5QkFBcUIsdUJBQVFKLGNBQVIsRUFBd0IsVUFBQ0ssS0FBRCxFQUFRQyxRQUFSLEVBQWtCQyxJQUFsQixFQUEyQjs7QUFFdEcsd0JBQUdGLEtBQUgsRUFBVUQsT0FBT0MsS0FBUDs7QUFFVkYsNEJBQVFJLElBQVI7QUFFRCxtQkFOb0QsQ0FBckI7QUFBQSxpQkFBWixDOzs7QUFBZEMscUI7OztBQVFOLHFCQUFLQyxHQUFMLENBQVNDLFNBQVQsQ0FBbUIscUJBQW5CLDRCQUFrRSxLQUFLWCxJQUFMLENBQVVZLFNBQTVFOztBQUVBLHFCQUFLRixHQUFMLENBQVNHLE1BQVQsQ0FBZ0IsR0FBaEIsRUFBcUJDLElBQXJCLENBQTBCLEtBQUtkLElBQUwsQ0FBVWUsWUFBcEMsRUFBa0RDLElBQWxELENBQXVEUCxLQUF2RDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBdkI0QlEsaUI7O0FBNkJoQyxJQUFNQyxnQkFBZ0IsSUFBSUMsYUFBSixDQUFVO0FBQzlCQyxVQUFRLEtBRHNCO0FBRTlCckIsUUFBTSxzQkFGd0I7QUFHOUJsQixzQkFIOEI7QUFJOUJ3QyxhQUFXN0I7QUFKbUIsQ0FBVixDQUF0Qjs7a0JBT2UwQixhIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3NldCwgUmVzcG9uZGVyLCBSb3V0ZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZlcidcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3JlcXVlc3QnXG5cbmNvbnN0IHByb2Nlc3NvciA9IGFzeW5jIChyZXEsIHRyeCwgb3B0aW9ucykgPT4ge1xuXG4gIGNvbnN0IGlkID0gcmVxLnBhcmFtcy5pZFxuXG4gIGNvbnN0IGFzc2V0ID0gYXdhaXQgQXNzZXQud2hlcmUoeyBpZCB9KS5mZXRjaCh7IHRyYW5zYWN0aW5nOiB0cnggfSlcblxuICByZXR1cm4gYXNzZXRcbn1cblxuY2xhc3MgRG93bmxvYWRSZXNwb25kZXIgZXh0ZW5kcyBSZXNwb25kZXIge1xuXG4gIGFzeW5jIHJlbmRlcigpIHtcblxuICAgIGNvbnN0IGhvc3QgPSBwcm9jZXNzLmVudi5EQVRBX0FTU0VUX0NETl9IT1NUIHx8IHByb2Nlc3MuZW52LkRBVEFfQVNTRVRfSE9TVCB8fCBwcm9jZXNzLmVudi5XRUJfSE9TVFxuXG4gICAgY29uc3QgcGF0aCA9IHRoaXMuZGF0YS5wYXRoXG5cbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcbiAgICAgIHVybDogaG9zdCArIHBhdGgsXG4gICAgICBlbmNvZGluZzogbnVsbFxuICAgIH1cblxuICAgIGNvbnN0IGltYWdlID0gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gcmVxdWVzdChyZXF1ZXN0T3B0aW9ucywgKGVycm9yLCByZXNwb25zZSwgYm9keSkgPT4ge1xuXG4gICAgICBpZihlcnJvcikgcmVqZWN0KGVycm9yKVxuXG4gICAgICByZXNvbHZlKGJvZHkpXG5cbiAgICB9KSlcblxuICAgIHRoaXMucmVzLnNldEhlYWRlcignQ29udGVudC1kaXNwb3NpdGlvbicsIGBhdHRhY2htZW50OyBmaWxlbmFtZT0ke3RoaXMuZGF0YS5maWxlX25hbWV9YClcblxuICAgIHRoaXMucmVzLnN0YXR1cygyMDApLnR5cGUodGhpcy5kYXRhLmNvbnRlbnRfdHlwZSkuc2VuZChpbWFnZSlcblxuICB9XG5cbn1cblxuY29uc3QgZG93bmxvYWRSb3V0ZSA9IG5ldyBSb3V0ZSh7XG4gIG1ldGhvZDogJ2dldCcsXG4gIHBhdGg6ICcvYXNzZXRzLzppZC9kb3dubG9hZCcsXG4gIHByb2Nlc3NvcixcbiAgcmVzcG9uZGVyOiBEb3dubG9hZFJlc3BvbmRlclxufSlcblxuZXhwb3J0IGRlZmF1bHQgZG93bmxvYWRSb3V0ZVxuIl19