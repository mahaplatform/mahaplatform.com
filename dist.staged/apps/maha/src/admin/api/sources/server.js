'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _emitter = require('../../../core/services/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _preview = require('./dropbox/preview');

var _preview2 = _interopRequireDefault(_preview);

var _profile = require('../../../models/profile');

var _profile2 = _interopRequireDefault(_profile);

var _source = require('../../../models/source');

var _source2 = _interopRequireDefault(_source);

var _token = require('./microsoft/token');

var _token2 = _interopRequireDefault(_token);

var _token3 = require('./instagram/token');

var _token4 = _interopRequireDefault(_token3);

var _token5 = require('./facebook/token');

var _token6 = _interopRequireDefault(_token5);

var _user = require('../../../models/user');

var _user2 = _interopRequireDefault(_user);

var _preview3 = require('./box/preview');

var _preview4 = _interopRequireDefault(_preview3);

var _token7 = require('./dropbox/token');

var _token8 = _interopRequireDefault(_token7);

var _token9 = require('./google/token');

var _token10 = _interopRequireDefault(_token9);

var _token11 = require('./box/token');

var _token12 = _interopRequireDefault(_token11);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var token = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
    var getData, data, source;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _user2.default.where({ id: req.query.state }).fetch();

          case 2:
            req.user = _context2.sent;

            getData = function () {
              var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(source) {
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!(source === 'facebook')) {
                          _context.next = 4;
                          break;
                        }

                        _context.next = 3;
                        return (0, _token6.default)(req, res, next);

                      case 3:
                        return _context.abrupt('return', _context.sent);

                      case 4:
                        if (!(source === 'google')) {
                          _context.next = 8;
                          break;
                        }

                        _context.next = 7;
                        return (0, _token10.default)(req, res, next);

                      case 7:
                        return _context.abrupt('return', _context.sent);

                      case 8:
                        if (!(source === 'microsoft')) {
                          _context.next = 12;
                          break;
                        }

                        _context.next = 11;
                        return (0, _token2.default)(req, res, next);

                      case 11:
                        return _context.abrupt('return', _context.sent);

                      case 12:
                        if (!(source === 'instagram')) {
                          _context.next = 16;
                          break;
                        }

                        _context.next = 15;
                        return (0, _token4.default)(req, res, next);

                      case 15:
                        return _context.abrupt('return', _context.sent);

                      case 16:
                        if (!(source === 'dropbox')) {
                          _context.next = 20;
                          break;
                        }

                        _context.next = 19;
                        return (0, _token8.default)(req, res, next);

                      case 19:
                        return _context.abrupt('return', _context.sent);

                      case 20:
                        if (!(source === 'box')) {
                          _context.next = 24;
                          break;
                        }

                        _context.next = 23;
                        return (0, _token12.default)(req, res, next);

                      case 23:
                        return _context.abrupt('return', _context.sent);

                      case 24:
                        return _context.abrupt('return', null);

                      case 25:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function getData(_x4) {
                return _ref2.apply(this, arguments);
              };
            }();

            _context2.next = 6;
            return getData(req.params.source);

          case 6:
            data = _context2.sent;

            if (data) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt('return');

          case 9:
            _context2.next = 11;
            return _source2.default.where({ text: req.params.source }).fetch();

          case 11:
            source = _context2.sent;
            _context2.next = 14;
            return _profile2.default.forge({
              team_id: req.user.get('team_id'),
              user_id: req.user.get('id'),
              source_id: source.get('id'),
              data: data
            }).save();

          case 14:
            _context2.next = 16;
            return _emitter2.default.in('/admin/users/' + req.user.get('id')).emit('message', {
              target: '/admin/' + req.params.source + '/authorized',
              action: 'refresh'
            });

          case 16:
            _context2.next = 18;
            return _emitter2.default.in('/admin/users/' + req.user.get('id')).emit('message', {
              target: '/admin/account/profiles',
              action: 'refresh'
            });

          case 18:

            res.render('token');

          case 19:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function token(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var preview = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res, next) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(req.params.source === 'box')) {
              _context3.next = 3;
              break;
            }

            _context3.next = 3;
            return (0, _preview4.default)(req, res, next);

          case 3:
            if (!(req.params.source === 'dropbox')) {
              _context3.next = 6;
              break;
            }

            _context3.next = 6;
            return (0, _preview2.default)(req, res, next);

          case 6:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function preview(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

var server = (0, _express2.default)();

server.set('views', _path2.default.join(__dirname));

server.set('view engine', 'ejs');

server.get('/:source/token', token);

server.get('/:source/preview', preview);

exports.default = server;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsidG9rZW4iLCJyZXEiLCJyZXMiLCJuZXh0IiwiVXNlciIsIndoZXJlIiwiaWQiLCJxdWVyeSIsInN0YXRlIiwiZmV0Y2giLCJ1c2VyIiwiZ2V0RGF0YSIsInNvdXJjZSIsInBhcmFtcyIsImRhdGEiLCJTb3VyY2UiLCJ0ZXh0IiwiUHJvZmlsZSIsImZvcmdlIiwidGVhbV9pZCIsImdldCIsInVzZXJfaWQiLCJzb3VyY2VfaWQiLCJzYXZlIiwic29ja2V0IiwiaW4iLCJlbWl0IiwidGFyZ2V0IiwiYWN0aW9uIiwicmVuZGVyIiwicHJldmlldyIsInNlcnZlciIsInNldCIsInBhdGgiLCJqb2luIiwiX19kaXJuYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BO0FBQUEsc0ZBQVEsa0JBQU9DLEdBQVAsRUFBWUMsR0FBWixFQUFpQkMsSUFBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFFS0MsZUFBS0MsS0FBTCxDQUFXLEVBQUVDLElBQUlMLElBQUlNLEtBQUosQ0FBVUMsS0FBaEIsRUFBWCxFQUFvQ0MsS0FBcEMsRUFGTDs7QUFBQTtBQUVaUixnQkFBSVMsSUFGUTs7QUFJTkMsbUJBSk07QUFBQSxtR0FJSSxpQkFBT0MsTUFBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsOEJBRVhBLFdBQVcsVUFGQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLCtCQUV5QixxQkFBU1gsR0FBVCxFQUFjQyxHQUFkLEVBQW1CQyxJQUFuQixDQUZ6Qjs7QUFBQTtBQUFBOztBQUFBO0FBQUEsOEJBSVhTLFdBQVcsUUFKQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLCtCQUl1Qixz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LHVCQUFlWCxHQUFmLEVBQW9CQyxHQUFwQixFQUF5QkMsSUFBekIsQ0FKNUI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBVjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztBQVFBLElBQU00QixTQUFTLHdCQUFmOztBQUVBQSxPQUFPQyxHQUFQLENBQVcsT0FBWCxFQUFvQkMsZUFBS0MsSUFBTCxDQUFVQyxTQUFWLENBQXBCOztBQUVBSixPQUFPQyxHQUFQLENBQVcsYUFBWCxFQUEwQixLQUExQjs7QUFFQUQsT0FBT1gsR0FBUCxDQUFXLGdCQUFYLEVBQTZCcEIsS0FBN0I7O0FBRUErQixPQUFPWCxHQUFQLENBQVcsa0JBQVgsRUFBK0JVLE9BQS9COztrQkFFZUMsTSIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHNvY2tldCBmcm9tICcuLi8uLi8uLi9jb3JlL3NlcnZpY2VzL2VtaXR0ZXInXG5pbXBvcnQgZHJvcGJveFByZXZpZXcgZnJvbSAnLi9kcm9wYm94L3ByZXZpZXcnXG5pbXBvcnQgUHJvZmlsZSBmcm9tICcuLi8uLi8uLi9tb2RlbHMvcHJvZmlsZSdcbmltcG9ydCBTb3VyY2UgZnJvbSAnLi4vLi4vLi4vbW9kZWxzL3NvdXJjZSdcbmltcG9ydCBtaWNyb3NvZnQgZnJvbSAnLi9taWNyb3NvZnQvdG9rZW4nXG5pbXBvcnQgaW5zdGFncmFtIGZyb20gJy4vaW5zdGFncmFtL3Rva2VuJ1xuaW1wb3J0IGZhY2Vib29rIGZyb20gJy4vZmFjZWJvb2svdG9rZW4nXG5pbXBvcnQgVXNlciBmcm9tICcuLi8uLi8uLi9tb2RlbHMvdXNlcidcbmltcG9ydCBib3hQcmV2aWV3IGZyb20gJy4vYm94L3ByZXZpZXcnXG5pbXBvcnQgZHJvcGJveCBmcm9tICcuL2Ryb3Bib3gvdG9rZW4nXG5pbXBvcnQgZ29vZ2xlIGZyb20gJy4vZ29vZ2xlL3Rva2VuJ1xuaW1wb3J0IGJveCBmcm9tICcuL2JveC90b2tlbidcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuXG5jb25zdCB0b2tlbiA9IGFzeW5jIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuXG4gIHJlcS51c2VyID0gYXdhaXQgVXNlci53aGVyZSh7IGlkOiByZXEucXVlcnkuc3RhdGUgfSkuZmV0Y2goKVxuXG4gIGNvbnN0IGdldERhdGEgPSBhc3luYyAoc291cmNlKSA9PiB7XG5cbiAgICBpZihzb3VyY2UgPT09ICdmYWNlYm9vaycpIHJldHVybiBhd2FpdCBmYWNlYm9vayhyZXEsIHJlcywgbmV4dClcblxuICAgIGlmKHNvdXJjZSA9PT0gJ2dvb2dsZScpIHJldHVybiBhd2FpdCBnb29nbGUocmVxLCByZXMsIG5leHQpXG5cbiAgICBpZihzb3VyY2UgPT09ICdtaWNyb3NvZnQnKSByZXR1cm4gYXdhaXQgbWljcm9zb2Z0KHJlcSwgcmVzLCBuZXh0KVxuXG4gICAgaWYoc291cmNlID09PSAnaW5zdGFncmFtJykgcmV0dXJuIGF3YWl0IGluc3RhZ3JhbShyZXEsIHJlcywgbmV4dClcblxuICAgIGlmKHNvdXJjZSA9PT0gJ2Ryb3Bib3gnKSByZXR1cm4gYXdhaXQgZHJvcGJveChyZXEsIHJlcywgbmV4dClcblxuICAgIGlmKHNvdXJjZSA9PT0gJ2JveCcpIHJldHVybiBhd2FpdCBib3gocmVxLCByZXMsIG5leHQpXG5cbiAgICByZXR1cm4gbnVsbFxuXG4gIH1cblxuICBjb25zdCBkYXRhID0gYXdhaXQgZ2V0RGF0YShyZXEucGFyYW1zLnNvdXJjZSlcblxuICBpZighZGF0YSkgcmV0dXJuXG5cbiAgY29uc3Qgc291cmNlID0gYXdhaXQgU291cmNlLndoZXJlKHsgdGV4dDogcmVxLnBhcmFtcy5zb3VyY2UgfSkuZmV0Y2goKVxuXG4gIGF3YWl0IFByb2ZpbGUuZm9yZ2Uoe1xuICAgIHRlYW1faWQ6IHJlcS51c2VyLmdldCgndGVhbV9pZCcpLFxuICAgIHVzZXJfaWQ6IHJlcS51c2VyLmdldCgnaWQnKSxcbiAgICBzb3VyY2VfaWQ6IHNvdXJjZS5nZXQoJ2lkJyksXG4gICAgZGF0YVxuICB9KS5zYXZlKClcblxuICBhd2FpdCBzb2NrZXQuaW4oYC9hZG1pbi91c2Vycy8ke3JlcS51c2VyLmdldCgnaWQnKX1gKS5lbWl0KCdtZXNzYWdlJywge1xuICAgIHRhcmdldDogYC9hZG1pbi8ke3JlcS5wYXJhbXMuc291cmNlfS9hdXRob3JpemVkYCxcbiAgICBhY3Rpb246ICdyZWZyZXNoJ1xuICB9KVxuXG4gIGF3YWl0IHNvY2tldC5pbihgL2FkbWluL3VzZXJzLyR7cmVxLnVzZXIuZ2V0KCdpZCcpfWApLmVtaXQoJ21lc3NhZ2UnLCB7XG4gICAgdGFyZ2V0OiAnL2FkbWluL2FjY291bnQvcHJvZmlsZXMnLFxuICAgIGFjdGlvbjogJ3JlZnJlc2gnXG4gIH0pXG5cbiAgcmVzLnJlbmRlcigndG9rZW4nKVxuXG59XG5cbmNvbnN0IHByZXZpZXcgPSBhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcblxuICBpZihyZXEucGFyYW1zLnNvdXJjZSA9PT0gJ2JveCcpIGF3YWl0IGJveFByZXZpZXcocmVxLCByZXMsIG5leHQpXG5cbiAgaWYocmVxLnBhcmFtcy5zb3VyY2UgPT09ICdkcm9wYm94JykgYXdhaXQgZHJvcGJveFByZXZpZXcocmVxLCByZXMsIG5leHQpXG5cbn1cblxuY29uc3Qgc2VydmVyID0gZXhwcmVzcygpXG5cbnNlcnZlci5zZXQoJ3ZpZXdzJywgcGF0aC5qb2luKF9fZGlybmFtZSkpXG5cbnNlcnZlci5zZXQoJ3ZpZXcgZW5naW5lJywgJ2VqcycpXG5cbnNlcnZlci5nZXQoJy86c291cmNlL3Rva2VuJywgdG9rZW4pXG5cbnNlcnZlci5nZXQoJy86c291cmNlL3ByZXZpZXcnLCBwcmV2aWV3KVxuXG5leHBvcnQgZGVmYXVsdCBzZXJ2ZXJcbiJdfQ==