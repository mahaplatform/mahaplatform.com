'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _session_serializer = require('../../../serializers/session_serializer');

var _session_serializer2 = _interopRequireDefault(_session_serializer);

var _user_tokens = require('../../../core/utils/user_tokens');

var _device_value = require('../../../models/device_value');

var _device_value2 = _interopRequireDefault(_device_value);

var _session = require('../../../models/session');

var _session2 = _interopRequireDefault(_session);

var _device = require('../../../models/device');

var _device2 = _interopRequireDefault(_device);

var _server = require('../../../server');

var _uaParserJs = require('ua-parser-js');

var _uaParserJs2 = _interopRequireDefault(_uaParserJs);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _findOrCreateDevice(req, trx);

          case 2:
            req.device = _context.sent;
            _context.next = 5;
            return _findOrCreateSession(req, trx);

          case 5:
            req.session = _context.sent;


            req.token = (0, _user_tokens.createUserToken)(req.user, 'user_id', {
              session_id: req.session.get('id')
            });

            _context.next = 9;
            return (0, _session_serializer2.default)(req, trx, options);

          case 9:
            return _context.abrupt('return', _context.sent);

          case 10:
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

var _findOrCreateDevice = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, trx) {
    var fingerprint, ua, os_version_id, browser_version_id, device, device_type, device_type_id, os_name_id, browser_name_id;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            fingerprint = req.headers.fingerprint;
            ua = (0, _uaParserJs2.default)(req.headers['user-agent']);
            _context2.next = 4;
            return _findOrCreateDeviceValueId('os_version', ua.os.version, trx);

          case 4:
            os_version_id = _context2.sent;
            _context2.next = 7;
            return _findOrCreateDeviceValueId('browser_version', ua.browser.version, trx);

          case 7:
            browser_version_id = _context2.sent;
            _context2.next = 10;
            return _device2.default.where({ fingerprint: fingerprint }).fetch({ transacting: trx });

          case 10:
            device = _context2.sent;

            if (!device) {
              _context2.next = 15;
              break;
            }

            _context2.next = 14;
            return device.save({
              os_version_id: os_version_id,
              browser_version_id: browser_version_id
            }, { patch: true, transacting: trx });

          case 14:
            return _context2.abrupt('return', _context2.sent);

          case 15:
            device_type = ua.device.type || 'desktop';
            _context2.next = 18;
            return _findOrCreateDeviceValueId('device_type', device_type, trx);

          case 18:
            device_type_id = _context2.sent;
            _context2.next = 21;
            return _findOrCreateDeviceValueId('os_name', ua.os.name, trx);

          case 21:
            os_name_id = _context2.sent;
            _context2.next = 24;
            return _findOrCreateDeviceValueId('browser_name', ua.browser.name, trx);

          case 24:
            browser_name_id = _context2.sent;
            _context2.next = 27;
            return _device2.default.forge({
              os_version_id: os_version_id,
              browser_version_id: browser_version_id,
              device_type_id: device_type_id,
              os_name_id: os_name_id,
              browser_name_id: browser_name_id,
              fingerprint: fingerprint
            }).save(null, { transacting: trx });

          case 27:
            return _context2.abrupt('return', _context2.sent);

          case 28:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function _findOrCreateDevice(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var _findOrCreateDeviceValueId = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(type, textMixed, trx) {
    var text, value, newvalue;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            text = textMixed.toLowerCase();
            _context3.next = 3;
            return _device_value2.default.where({ type: type, text: text }).fetch({ transacting: trx });

          case 3:
            value = _context3.sent;

            if (!value) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt('return', value.get('id'));

          case 6:
            _context3.next = 8;
            return _device_value2.default.forge({ type: type, text: text }).save(null, { transacting: trx });

          case 8:
            newvalue = _context3.sent;

            if (!newvalue) {
              _context3.next = 11;
              break;
            }

            return _context3.abrupt('return', newvalue.get('id'));

          case 11:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function _findOrCreateDeviceValueId(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

var _findOrCreateSession = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, trx) {
    var session;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _session2.default.where({
              device_id: req.device.get('id'),
              user_id: req.user.get('id')
            }).fetch({ transacting: trx });

          case 2:
            session = _context4.sent;

            if (!session) {
              _context4.next = 5;
              break;
            }

            return _context4.abrupt('return', session);

          case 5:
            _context4.next = 7;
            return _session2.default.forge({
              team_id: req.team.get('id'),
              device_id: req.device.get('id'),
              user_id: req.user.get('id'),
              last_active_at: (0, _moment2.default)()
            }).save(null, { transacting: trx });

          case 7:
            return _context4.abrupt('return', _context4.sent);

          case 8:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function _findOrCreateSession(_x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();

var sessionRoute = new _server.Route({
  method: 'get',
  path: '/session',
  processor: processor
});

exports.default = sessionRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsicHJvY2Vzc29yIiwicmVxIiwidHJ4Iiwib3B0aW9ucyIsIl9maW5kT3JDcmVhdGVEZXZpY2UiLCJkZXZpY2UiLCJfZmluZE9yQ3JlYXRlU2Vzc2lvbiIsInNlc3Npb24iLCJ0b2tlbiIsInVzZXIiLCJzZXNzaW9uX2lkIiwiZ2V0IiwiZmluZ2VycHJpbnQiLCJoZWFkZXJzIiwidWEiLCJfZmluZE9yQ3JlYXRlRGV2aWNlVmFsdWVJZCIsIm9zIiwidmVyc2lvbiIsIm9zX3ZlcnNpb25faWQiLCJicm93c2VyIiwiYnJvd3Nlcl92ZXJzaW9uX2lkIiwiRGV2aWNlIiwid2hlcmUiLCJmZXRjaCIsInRyYW5zYWN0aW5nIiwic2F2ZSIsInBhdGNoIiwiZGV2aWNlX3R5cGUiLCJ0eXBlIiwiZGV2aWNlX3R5cGVfaWQiLCJuYW1lIiwib3NfbmFtZV9pZCIsImJyb3dzZXJfbmFtZV9pZCIsImZvcmdlIiwidGV4dE1peGVkIiwidGV4dCIsInRvTG93ZXJDYXNlIiwiRGV2aWNlVmFsdWUiLCJ2YWx1ZSIsIm5ld3ZhbHVlIiwiU2Vzc2lvbiIsImRldmljZV9pZCIsInVzZXJfaWQiLCJ0ZWFtX2lkIiwidGVhbSIsImxhc3RfYWN0aXZlX2F0Iiwic2Vzc2lvblJvdXRlIiwiUm91dGUiLCJtZXRob2QiLCJwYXRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUE7QUFBQSxzRkFBWSxpQkFBT0MsR0FBUCxFQUFZQyxHQUFaLEVBQWlCQyxPQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFFR0Msb0JBQW9CSCxHQUFwQixFQUF5QkMsR0FBekIsQ0FGSDs7QUFBQTtBQUVoQkQsZ0JBQUlJLE1BRlk7QUFBQTtBQUFBLG1CQUlJQyxxQkFBcUJMLEdBQXJCLEVBQTBCQyxHQUExQixDQUpKOztBQUFB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USxJQUFKLENBQVNFLEdBQVQsQ0FBYSxJQUFiLENBSGdCO0FBSXpCa0MsOEJBQWdCO0FBSlMsYUFBZCxFQUtWcEIsSUFMVSxDQUtMLElBTEssRUFLQyxFQUFFRCxhQUFhdEIsR0FBZixFQUxELENBVGM7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUF2Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztBQWtCQSxJQUFNNEMsZUFBZSxJQUFJQyxhQUFKLENBQVU7QUFDN0JDLFVBQVEsS0FEcUI7QUFFN0JDLFFBQU0sVUFGdUI7QUFHN0JqRDtBQUg2QixDQUFWLENBQXJCOztrQkFNZThDLFkiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzZXNzaW9uU2VyaWFsaXplciBmcm9tICcuLi8uLi8uLi9zZXJpYWxpemVycy9zZXNzaW9uX3NlcmlhbGl6ZXInXG5pbXBvcnQgeyBjcmVhdGVVc2VyVG9rZW4gfSBmcm9tICcuLi8uLi8uLi9jb3JlL3V0aWxzL3VzZXJfdG9rZW5zJ1xuaW1wb3J0IERldmljZVZhbHVlIGZyb20gJy4uLy4uLy4uL21vZGVscy9kZXZpY2VfdmFsdWUnXG5pbXBvcnQgU2Vzc2lvbiBmcm9tICcuLi8uLi8uLi9tb2RlbHMvc2Vzc2lvbidcbmltcG9ydCBEZXZpY2UgZnJvbSAnLi4vLi4vLi4vbW9kZWxzL2RldmljZSdcbmltcG9ydCB7IFJvdXRlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmVyJ1xuaW1wb3J0IFVBUGFyc2VyIGZyb20gJ3VhLXBhcnNlci1qcydcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50J1xuXG5jb25zdCBwcm9jZXNzb3IgPSBhc3luYyAocmVxLCB0cngsIG9wdGlvbnMpICA9PiB7XG5cbiAgcmVxLmRldmljZSA9IGF3YWl0IF9maW5kT3JDcmVhdGVEZXZpY2UocmVxLCB0cngpXG5cbiAgcmVxLnNlc3Npb24gPSBhd2FpdCBfZmluZE9yQ3JlYXRlU2Vzc2lvbihyZXEsIHRyeClcblxuICByZXEudG9rZW4gPSBjcmVhdGVVc2VyVG9rZW4ocmVxLnVzZXIsICd1c2VyX2lkJywge1xuICAgIHNlc3Npb25faWQ6IHJlcS5zZXNzaW9uLmdldCgnaWQnKVxuICB9KVxuXG4gIHJldHVybiBhd2FpdCBzZXNzaW9uU2VyaWFsaXplcihyZXEsIHRyeCwgb3B0aW9ucylcblxufVxuXG5jb25zdCBfZmluZE9yQ3JlYXRlRGV2aWNlID0gYXN5bmMgKHJlcSwgdHJ4KSA9PiB7XG5cbiAgY29uc3QgZmluZ2VycHJpbnQgPSByZXEuaGVhZGVycy5maW5nZXJwcmludFxuXG4gIGNvbnN0IHVhID0gVUFQYXJzZXIocmVxLmhlYWRlcnNbJ3VzZXItYWdlbnQnXSlcblxuICBjb25zdCBvc192ZXJzaW9uX2lkID0gYXdhaXQgX2ZpbmRPckNyZWF0ZURldmljZVZhbHVlSWQoJ29zX3ZlcnNpb24nLCB1YS5vcy52ZXJzaW9uLCB0cngpXG5cbiAgY29uc3QgYnJvd3Nlcl92ZXJzaW9uX2lkID0gYXdhaXQgX2ZpbmRPckNyZWF0ZURldmljZVZhbHVlSWQoJ2Jyb3dzZXJfdmVyc2lvbicsIHVhLmJyb3dzZXIudmVyc2lvbiwgdHJ4KVxuXG4gIGNvbnN0IGRldmljZSA9IGF3YWl0IERldmljZS53aGVyZSh7IGZpbmdlcnByaW50IH0pLmZldGNoKHsgdHJhbnNhY3Rpbmc6IHRyeCB9KVxuXG4gIGlmKGRldmljZSkgcmV0dXJuIGF3YWl0IGRldmljZS5zYXZlKHtcbiAgICBvc192ZXJzaW9uX2lkLFxuICAgIGJyb3dzZXJfdmVyc2lvbl9pZFxuICB9LCB7IHBhdGNoOiB0cnVlLCB0cmFuc2FjdGluZzogdHJ4IH0pXG5cbiAgY29uc3QgZGV2aWNlX3R5cGUgPSB1YS5kZXZpY2UudHlwZSB8fCAnZGVza3RvcCdcblxuICBjb25zdCBkZXZpY2VfdHlwZV9pZCA9IGF3YWl0IF9maW5kT3JDcmVhdGVEZXZpY2VWYWx1ZUlkKCdkZXZpY2VfdHlwZScsIGRldmljZV90eXBlLCB0cngpXG5cbiAgY29uc3Qgb3NfbmFtZV9pZCA9IGF3YWl0IF9maW5kT3JDcmVhdGVEZXZpY2VWYWx1ZUlkKCdvc19uYW1lJywgdWEub3MubmFtZSwgdHJ4KVxuXG4gIGNvbnN0IGJyb3dzZXJfbmFtZV9pZCA9IGF3YWl0IF9maW5kT3JDcmVhdGVEZXZpY2VWYWx1ZUlkKCdicm93c2VyX25hbWUnLCB1YS5icm93c2VyLm5hbWUsIHRyeClcblxuICByZXR1cm4gYXdhaXQgRGV2aWNlLmZvcmdlKHtcbiAgICBvc192ZXJzaW9uX2lkLFxuICAgIGJyb3dzZXJfdmVyc2lvbl9pZCxcbiAgICBkZXZpY2VfdHlwZV9pZCxcbiAgICBvc19uYW1lX2lkLFxuICAgIGJyb3dzZXJfbmFtZV9pZCxcbiAgICBmaW5nZXJwcmludFxuICB9KS5zYXZlKG51bGwsIHsgdHJhbnNhY3Rpbmc6IHRyeCB9KVxuXG59XG5cbmNvbnN0IF9maW5kT3JDcmVhdGVEZXZpY2VWYWx1ZUlkID0gYXN5bmMgKHR5cGUsIHRleHRNaXhlZCwgdHJ4KSA9PiB7XG5cbiAgY29uc3QgdGV4dCA9IHRleHRNaXhlZC50b0xvd2VyQ2FzZSgpXG5cbiAgY29uc3QgdmFsdWUgPSBhd2FpdCBEZXZpY2VWYWx1ZS53aGVyZSh7IHR5cGUsIHRleHQgfSkuZmV0Y2goeyB0cmFuc2FjdGluZzogdHJ4IH0pXG5cbiAgaWYodmFsdWUpIHJldHVybiB2YWx1ZS5nZXQoJ2lkJylcblxuICBjb25zdCBuZXd2YWx1ZSA9IGF3YWl0IERldmljZVZhbHVlLmZvcmdlKHsgdHlwZSwgdGV4dCB9KS5zYXZlKG51bGwsIHsgdHJhbnNhY3Rpbmc6IHRyeCB9KVxuXG4gIGlmKG5ld3ZhbHVlKSByZXR1cm4gbmV3dmFsdWUuZ2V0KCdpZCcpXG5cbn1cblxuY29uc3QgX2ZpbmRPckNyZWF0ZVNlc3Npb24gPSBhc3luYyAocmVxLCB0cngpID0+IHtcblxuICBjb25zdCBzZXNzaW9uID0gYXdhaXQgU2Vzc2lvbi53aGVyZSh7XG4gICAgZGV2aWNlX2lkOiByZXEuZGV2aWNlLmdldCgnaWQnKSxcbiAgICB1c2VyX2lkOiByZXEudXNlci5nZXQoJ2lkJylcbiAgfSkuZmV0Y2goeyB0cmFuc2FjdGluZzogdHJ4IH0pXG5cbiAgaWYoc2Vzc2lvbikgcmV0dXJuIHNlc3Npb25cblxuICByZXR1cm4gYXdhaXQgU2Vzc2lvbi5mb3JnZSh7XG4gICAgdGVhbV9pZDogcmVxLnRlYW0uZ2V0KCdpZCcpLFxuICAgIGRldmljZV9pZDogcmVxLmRldmljZS5nZXQoJ2lkJyksXG4gICAgdXNlcl9pZDogcmVxLnVzZXIuZ2V0KCdpZCcpLFxuICAgIGxhc3RfYWN0aXZlX2F0OiBtb21lbnQoKVxuICB9KS5zYXZlKG51bGwsIHsgdHJhbnNhY3Rpbmc6IHRyeCB9KVxuXG59XG5cbmNvbnN0IHNlc3Npb25Sb3V0ZSA9IG5ldyBSb3V0ZSh7XG4gIG1ldGhvZDogJ2dldCcsXG4gIHBhdGg6ICcvc2Vzc2lvbicsXG4gIHByb2Nlc3NvclxufSlcblxuZXhwb3J0IGRlZmF1bHQgc2Vzc2lvblJvdXRlXG4iXX0=