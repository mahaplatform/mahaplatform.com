require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./tmp/socket.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./apps/maha-chat/src/admin/socket.js":
/*!********************************************!*\
  !*** ./apps/maha-chat/src/admin/socket.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = __webpack_require__(/*! bluebird */ "bluebird");

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "./node_modules/babel-runtime/helpers/asyncToGenerator.js");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _maha = __webpack_require__(/*! maha */ "./apps/maha/src/server.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chat = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(io, socket) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:

            socket.on('chat', function () {
              var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(token, channel, data) {
                var subscriptions;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return (0, _maha.knex)('chat_subscriptions').where(function (qb) {

                          qb.where({ channel_id: data.data.channel_id });

                          if (data.data.exclude) qb.whereNotIn('user_id', data.data.exclude);
                        });

                      case 2:
                        subscriptions = _context2.sent;
                        _context2.next = 5;
                        return (0, _bluebird.map)(subscriptions, function () {
                          var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(subscription) {
                            return _regenerator2.default.wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    _context.next = 2;
                                    return io.in('/admin/users/' + subscription.user_id).emit('message', {
                                      target: '/admin/chat/messages',
                                      action: data.action,
                                      data: {
                                        channel_id: data.data.channel_id,
                                        user: data.data.user
                                      }
                                    });

                                  case 2:
                                  case 'end':
                                    return _context.stop();
                                }
                              }
                            }, _callee, undefined);
                          }));

                          return function (_x6) {
                            return _ref3.apply(this, arguments);
                          };
                        }());

                      case 5:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, undefined);
              }));

              return function (_x3, _x4, _x5) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function chat(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = chat;

/***/ }),

/***/ "./apps/maha-chat/src/app.js":
/*!***********************************!*\
  !*** ./apps/maha-chat/src/app.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var app = {
  code: 'chat',
  title: 'Chat',
  path: '/chat',
  category: 'communication',
  author: 'CCE Tompkins',
  description: 'Organization chat',
  version: '1.0.0',
  color: 'violet',
  icon: 'comments'
};

exports.default = app;

/***/ }),

/***/ "./apps/maha-competencies/src/app.js":
/*!*******************************************!*\
  !*** ./apps/maha-competencies/src/app.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var app = {
  code: 'competencies',
  title: 'Competencies',
  path: '/competencies',
  category: 'education',
  author: 'CCE Tompkins',
  description: 'Manage resources required for various job positions',
  version: '1.0.0',
  color: 'blue',
  icon: 'trophy'
};

exports.default = app;

/***/ }),

/***/ "./apps/maha-crm/src/app.js":
/*!**********************************!*\
  !*** ./apps/maha-crm/src/app.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var app = {
  code: 'crm',
  title: 'CRM',
  path: '/crm',
  category: 'administration',
  author: 'CCE Tompkins',
  description: 'Organizational Relationship Management',
  version: '1.0.0',
  color: 'olive',
  icon: 'id-card-o',
  weight: 10
};

exports.default = app;

/***/ }),

/***/ "./apps/maha-drive/src/app.js":
/*!************************************!*\
  !*** ./apps/maha-drive/src/app.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var app = {
  code: 'drive',
  title: 'Drive',
  path: '/drive',
  category: 'administration',
  author: 'CCE Tompkins',
  description: 'Organizational File System',
  version: '1.0.0',
  color: 'teal',
  icon: 'hdd-o'
};

exports.default = app;

/***/ }),

/***/ "./apps/maha-eatfresh/src/app.js":
/*!***************************************!*\
  !*** ./apps/maha-eatfresh/src/app.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var app = {
  code: 'eatfresh',
  title: 'Eat Fresh',
  path: '/eatfresh',
  category: 'education',
  author: 'CCE Tompkins',
  description: 'Help tourists find local food and farm resources',
  version: '1.0.0',
  color: 'orange',
  icon: 'spoon'
};

exports.default = app;

/***/ }),

/***/ "./apps/maha-expenses/src/app.js":
/*!***************************************!*\
  !*** ./apps/maha-expenses/src/app.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var app = {
  code: 'expenses',
  title: 'Expenses',
  path: '/expenses',
  category: 'finance',
  author: 'CCE Tompkins',
  description: 'Manage expenses for expenses, advances, and vehicle trips',
  version: '1.0.0',
  color: 'green',
  icon: 'dollar'
};

exports.default = app;

/***/ }),

/***/ "./apps/maha-platform/src/app.js":
/*!***************************************!*\
  !*** ./apps/maha-platform/src/app.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var app = {
  code: 'platform',
  title: 'Platform',
  path: '/platform',
  category: 'administration',
  author: 'CCE Tompkins',
  description: 'Platform Management Tools',
  version: '1.0.0',
  color: 'yellow',
  icon: 'cog',
  weight: 10
};

exports.default = app;

/***/ }),

/***/ "./apps/maha-team/src/app.js":
/*!***********************************!*\
  !*** ./apps/maha-team/src/app.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var app = {
  code: 'team',
  title: 'Team',
  path: '/team',
  category: 'Administration',
  author: 'CCE Tompkins',
  description: 'Manage platform configuration, users, apps, and access',
  version: '1.0.0',
  color: 'red',
  icon: 'users'
};

exports.default = app;

/***/ }),

/***/ "./apps/maha/src/app.js":
/*!******************************!*\
  !*** ./apps/maha/src/app.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var app = {
  code: 'maha',
  title: 'Maha',
  path: ''
};

exports.default = app;

/***/ }),

/***/ "./apps/maha/src/core/entities/socket.js":
/*!***********************************************!*\
  !*** ./apps/maha/src/core/entities/socket.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "./node_modules/babel-runtime/helpers/asyncToGenerator.js");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _console = __webpack_require__(/*! ../utils/console */ "./apps/maha/src/core/utils/console.js");

var _ping = __webpack_require__(/*! ../../core/lib/express/ping */ "./apps/maha/src/core/lib/express/ping.js");

var _ping2 = _interopRequireDefault(_ping);

var _socketio = __webpack_require__(/*! ../lib/socketio */ "./apps/maha/src/core/lib/socketio/index.js");

var _socketio2 = _interopRequireDefault(_socketio);

var _socket = __webpack_require__(/*! socket.io-redis */ "socket.io-redis");

var _socket2 = _interopRequireDefault(_socket);

var _socket3 = __webpack_require__(/*! socket.io */ "socket.io");

var _socket4 = _interopRequireDefault(_socket3);

var _express = __webpack_require__(/*! express */ "express");

var _express2 = _interopRequireDefault(_express);

var _chalk = __webpack_require__(/*! chalk */ "chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _http = __webpack_require__(/*! http */ "http");

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
  var server, transport, redis, io;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          server = (0, _express2.default)();


          server.use(_ping2.default);

          transport = _http2.default.createServer(server);
          redis = (0, _socket2.default)("redis://localhost:6379/14");
          io = (0, _socket4.default)(transport);


          io.adapter(redis);

          io.on('connection', function (sock) {
            return (0, _socketio2.default)(io, sock);
          });

          (0, _console.writePaddedLine)(_chalk2.default.grey('Starting socket on port ' + 8090), _chalk2.default.green('✔'), '#FFFFFF', true, true);

          transport.listen(8090);

        case 9:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
}));

/***/ }),

/***/ "./apps/maha/src/core/lib/express/ping.js":
/*!************************************************!*\
  !*** ./apps/maha/src/core/lib/express/ping.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var ping = function ping(req, res, next) {
  return res.status(200).send('pong');
};

exports.default = ping;

/***/ }),

/***/ "./apps/maha/src/core/lib/socketio/index.js":
/*!**************************************************!*\
  !*** ./apps/maha/src/core/lib/socketio/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = __webpack_require__(/*! bluebird */ "bluebird");

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "./node_modules/babel-runtime/helpers/asyncToGenerator.js");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _server = __webpack_require__(/*! ./server */ "./apps/maha/src/core/lib/socketio/server.js");

var _server2 = _interopRequireDefault(_server);

var _presence = __webpack_require__(/*! ./presence */ "./apps/maha/src/core/lib/socketio/presence.js");

var _presence2 = _interopRequireDefault(_presence);

var _collect_objects = __webpack_require__(/*! ../../utils/collect_objects */ "./apps/maha/src/core/utils/collect_objects.js");

var _collect_objects2 = _interopRequireDefault(_collect_objects);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sockets = (0, _collect_objects2.default)('admin/socket');

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(io, socket) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _server2.default)(io, socket);

          case 2:
            _context2.next = 4;
            return (0, _presence2.default)(io, socket);

          case 4:
            _context2.next = 6;
            return (0, _bluebird.map)(sockets, function () {
              var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(socketFile) {
                var handler;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        handler = socketFile.default;
                        _context.next = 3;
                        return handler(io, socket);

                      case 3:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./apps/maha/src/core/lib/socketio/presence.js":
/*!*****************************************************!*\
  !*** ./apps/maha/src/core/lib/socketio/presence.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(/*! babel-runtime/helpers/extends */ "./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = __webpack_require__(/*! babel-runtime/helpers/toConsumableArray */ "./node_modules/babel-runtime/helpers/toConsumableArray.js");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "./node_modules/babel-runtime/helpers/asyncToGenerator.js");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _presence = __webpack_require__(/*! ../../services/presence */ "./apps/maha/src/core/services/presence.js");

var _utils = __webpack_require__(/*! ./utils */ "./apps/maha/src/core/lib/socketio/utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var presence = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(io, socket) {
    var user, presence;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            user = null;
            _context5.next = 3;
            return (0, _presence.getPresence)();

          case 3:
            presence = _context5.sent;


            socket.emit('presence', presence);

            socket.on('signin', function () {
              var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(token, channel, data, callback) {
                var auth, users, presence;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return (0, _utils.authenticate)(token);

                      case 2:
                        auth = _context.sent;


                        user = auth.user;

                        if (user) {
                          _context.next = 6;
                          break;
                        }

                        return _context.abrupt('return');

                      case 6:
                        _context.next = 8;
                        return (0, _presence.getPresence)();

                      case 8:
                        users = _context.sent;
                        _context.next = 11;
                        return (0, _presence.setPresence)([].concat((0, _toConsumableArray3.default)(users.filter(function (item) {
                          return item.user_id !== user.get('id');
                        })), [{
                          user_id: user.get('id'),
                          session_id: auth.session.get('id'),
                          status: data.status
                        }]));

                      case 11:
                        presence = _context.sent;


                        io.emit('presence', presence);

                        callback();

                      case 14:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x3, _x4, _x5, _x6) {
                return _ref2.apply(this, arguments);
              };
            }());

            socket.on('signout', function () {
              var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(token, channel, data, callback) {
                var auth, users, presence;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return (0, _utils.authenticate)(token);

                      case 2:
                        auth = _context2.sent;


                        user = auth.user;

                        if (user) {
                          _context2.next = 6;
                          break;
                        }

                        return _context2.abrupt('return');

                      case 6:
                        _context2.next = 8;
                        return (0, _presence.getPresence)();

                      case 8:
                        users = _context2.sent;
                        _context2.next = 11;
                        return (0, _presence.setPresence)(users.filter(function (item) {

                          return item.user_id !== user.get('id');
                        }));

                      case 11:
                        presence = _context2.sent;


                        io.emit('presence', presence);

                        callback();

                      case 14:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, undefined);
              }));

              return function (_x7, _x8, _x9, _x10) {
                return _ref3.apply(this, arguments);
              };
            }());

            socket.on('status', function () {
              var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(token, channel, data) {
                var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};
                var auth, users, presence;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return (0, _utils.authenticate)(token);

                      case 2:
                        auth = _context3.sent;


                        user = auth.user;

                        if (user) {
                          _context3.next = 6;
                          break;
                        }

                        return _context3.abrupt('return');

                      case 6:
                        _context3.next = 8;
                        return (0, _presence.getPresence)();

                      case 8:
                        users = _context3.sent;
                        _context3.next = 11;
                        return (0, _presence.setPresence)(users.map(function (item) {
                          return (0, _extends3.default)({}, item, {
                            status: item.user_id === user.get('id') ? data.status : item.status
                          });
                        }));

                      case 11:
                        presence = _context3.sent;


                        io.emit('presence', presence);

                      case 13:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, undefined);
              }));

              return function (_x11, _x12, _x13) {
                return _ref4.apply(this, arguments);
              };
            }());

            socket.on('disconnect', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
              var users, presence;
              return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      _context4.next = 2;
                      return (0, _presence.getPresence)();

                    case 2:
                      users = _context4.sent;

                      if (user) {
                        _context4.next = 5;
                        break;
                      }

                      return _context4.abrupt('return');

                    case 5:
                      _context4.next = 7;
                      return (0, _presence.setPresence)(users.filter(function (item) {

                        return item.user_id !== user.get('id');
                      }));

                    case 7:
                      presence = _context4.sent;


                      user = null;

                      io.emit('presence', presence);

                    case 10:
                    case 'end':
                      return _context4.stop();
                  }
                }
              }, _callee4, undefined);
            })));

          case 9:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function presence(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = presence;

/***/ }),

/***/ "./apps/maha/src/core/lib/socketio/server.js":
/*!***************************************************!*\
  !*** ./apps/maha/src/core/lib/socketio/server.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "./node_modules/babel-runtime/helpers/asyncToGenerator.js");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _format_object_for_transport = __webpack_require__(/*! ../../utils/format_object_for_transport */ "./apps/maha/src/core/utils/format_object_for_transport.js");

var _format_object_for_transport2 = _interopRequireDefault(_format_object_for_transport);

var _utils = __webpack_require__(/*! ./utils */ "./apps/maha/src/core/lib/socketio/utils.js");

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(io, socket) {
    var channels, authorize;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            channels = [];

            authorize = function authorize(channel) {
              return _lodash2.default.includes(channels, channel);
            };

            socket.on('join', function () {
              var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(token, channel, data, callback) {
                var authenticated, authorized;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return (0, _utils.authenticate)(token);

                      case 2:
                        authenticated = _context.sent;
                        authorized = authorize(channel);


                        if (authenticated && !authorized) {

                          socket.join(channel);

                          channels.push(channel);
                        }

                        if (authenticated && callback) callback(true);

                      case 6:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x3, _x4, _x5, _x6) {
                return _ref2.apply(this, arguments);
              };
            }());

            socket.on('leave', function (token, channel, data, callback) {

              var authorized = authorize(channel);

              if (authorized) {

                socket.leave(channel);

                channels = channels.filter(function (ch) {
                  return ch !== channel;
                });
              }

              if (callback) callback(authorized);
            });

            socket.on('message', function (token, channel, data, callback) {

              var authorized = authorize(channel);

              if (authorized) io.in(channel).send((0, _format_object_for_transport2.default)(data));

              if (callback) callback(authorized);
            });

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function server(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = server;

/***/ }),

/***/ "./apps/maha/src/core/lib/socketio/utils.js":
/*!**************************************************!*\
  !*** ./apps/maha/src/core/lib/socketio/utils.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticate = undefined;

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "./node_modules/babel-runtime/helpers/asyncToGenerator.js");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _session = __webpack_require__(/*! ../../../models/session */ "./apps/maha/src/models/session.js");

var _session2 = _interopRequireDefault(_session);

var _jwt = __webpack_require__(/*! ../../services/jwt */ "./apps/maha/src/core/services/jwt.js");

var jwt = _interopRequireWildcard(_jwt);

var _user = __webpack_require__(/*! ../../../models/user */ "./apps/maha/src/models/user.js");

var _user2 = _interopRequireDefault(_user);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authenticate = exports.authenticate = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(token) {
    var tokenData, user, session;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (token) {
              _context.next = 2;
              break;
            }

            throw new Error('no token provided');

          case 2:
            tokenData = jwt.decode(token);

            if (tokenData.data.user_id) {
              _context.next = 5;
              break;
            }

            throw new Error('invalid token');

          case 5:
            _context.next = 7;
            return _user2.default.where({ id: tokenData.data.user_id }).fetch();

          case 7:
            user = _context.sent;

            if (user) {
              _context.next = 10;
              break;
            }

            throw new Error('invalid user');

          case 10:
            _context.next = 12;
            return _session2.default.where({ id: tokenData.data.session_id }).fetch();

          case 12:
            session = _context.sent;
            return _context.abrupt('return', {
              session: session,
              user: user
            });

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function authenticate(_x) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./apps/maha/src/core/objects/app.js":
/*!*******************************************!*\
  !*** ./apps/maha/src/core/objects/app.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App(options) {
  (0, _classCallCheck3.default)(this, App);


  this.config = options;
};

exports.default = App;

/***/ }),

/***/ "./apps/maha/src/core/objects/cron.js":
/*!********************************************!*\
  !*** ./apps/maha/src/core/objects/cron.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "./node_modules/babel-runtime/helpers/asyncToGenerator.js");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _knex = __webpack_require__(/*! ../services/knex */ "./apps/maha/src/core/services/knex.js");

var _knex2 = _interopRequireDefault(_knex);

var _logger = __webpack_require__(/*! ../utils/logger */ "./apps/maha/src/core/utils/logger.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cron = function cron(options) {

  return {
    name: options.name,
    schedule: options.schedule,
    handler: function handler() {
      return withLogger({
        name: options.name,
        processor: options.processor,
        afterCommit: options.afterCommit,
        beforeRollback: options.beforeRollback
      });
    }
  };
};

var withLogger = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
    var name = _ref2.name,
        processor = _ref2.processor,
        afterCommit = _ref2.afterCommit,
        beforeRollback = _ref2.beforeRollback;
    var requestId;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            requestId = _lodash2.default.random(100000, 999999).toString(36);


            (0, _logger.beginLogger)(requestId);

            _context.next = 4;
            return withTransaction({ processor: processor, afterCommit: afterCommit, beforeRollback: beforeRollback });

          case 4:

            (0, _logger.printCronLogger)(name, requestId);

            (0, _logger.endLogger)(requestId);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function withLogger(_x) {
    return _ref.apply(this, arguments);
  };
}();

var withTransaction = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_ref4) {
    var processor = _ref4.processor,
        afterCommit = _ref4.afterCommit,
        beforeRollback = _ref4.beforeRollback;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _knex2.default.transaction(function () {
              var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(trx) {
                var result;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return processor(trx);

                      case 3:
                        result = _context2.sent;
                        _context2.next = 6;
                        return trx.commit();

                      case 6:
                        if (!afterCommit) {
                          _context2.next = 9;
                          break;
                        }

                        _context2.next = 9;
                        return afterCommit(trx, result);

                      case 9:
                        _context2.next = 19;
                        break;

                      case 11:
                        _context2.prev = 11;
                        _context2.t0 = _context2['catch'](0);


                        console.log(_context2.t0);

                        if (!beforeRollback) {
                          _context2.next = 17;
                          break;
                        }

                        _context2.next = 17;
                        return beforeRollback(trx);

                      case 17:
                        _context2.next = 19;
                        return trx.rollback(_context2.t0);

                      case 19:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, undefined, [[0, 11]]);
              }));

              return function (_x3) {
                return _ref5.apply(this, arguments);
              };
            }());

          case 2:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function withTransaction(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = cron;

/***/ }),

/***/ "./apps/maha/src/core/objects/email.js":
/*!*********************************************!*\
  !*** ./apps/maha/src/core/objects/email.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var email = function email(options) {

  return options;
};

exports.default = email;

/***/ }),

/***/ "./apps/maha/src/core/objects/fixtures.js":
/*!************************************************!*\
  !*** ./apps/maha/src/core/objects/fixtures.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Fixtures = function Fixtures(options) {
  (0, _classCallCheck3.default)(this, Fixtures);


  return options;
};

exports.default = Fixtures;

/***/ }),

/***/ "./apps/maha/src/core/objects/mailbox.js":
/*!***********************************************!*\
  !*** ./apps/maha/src/core/objects/mailbox.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Mailbox = function Mailbox(options) {
  (0, _classCallCheck3.default)(this, Mailbox);


  return options;
};

exports.default = Mailbox;

/***/ }),

/***/ "./apps/maha/src/core/objects/migration.js":
/*!*************************************************!*\
  !*** ./apps/maha/src/core/objects/migration.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Migration = function Migration(options) {
  (0, _classCallCheck3.default)(this, Migration);


  return options;
};

exports.default = Migration;

/***/ }),

/***/ "./apps/maha/src/core/objects/model.js":
/*!*********************************************!*\
  !*** ./apps/maha/src/core/objects/model.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(/*! babel-runtime/helpers/toConsumableArray */ "./node_modules/babel-runtime/helpers/toConsumableArray.js");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = __webpack_require__(/*! babel-runtime/helpers/extends */ "./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _bookshelf = __webpack_require__(/*! ../services/bookshelf */ "./apps/maha/src/core/services/bookshelf.js");

var _bookshelf2 = _interopRequireDefault(_bookshelf);

__webpack_require__(/*! ../validations/later_than_validation */ "./apps/maha/src/core/validations/later_than_validation.js");

__webpack_require__(/*! ../validations/datestring_validation */ "./apps/maha/src/core/validations/datestring_validation.js");

__webpack_require__(/*! ../validations/currency_validation */ "./apps/maha/src/core/validations/currency_validation.js");

__webpack_require__(/*! ../validations/greater_than_field_validation */ "./apps/maha/src/core/validations/greater_than_field_validation.js");

__webpack_require__(/*! ../validations/time_validation */ "./apps/maha/src/core/validations/time_validation.js");

__webpack_require__(/*! ../validations/unique_validation */ "./apps/maha/src/core/validations/unique_validation.js");

var _checkit = __webpack_require__(/*! checkit */ "checkit");

var _checkit2 = _interopRequireDefault(_checkit);

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Model = function Model(options) {
  (0, _classCallCheck3.default)(this, Model);


  return _bookshelf2.default.Model.extend((0, _extends3.default)({

    hasTimestamps: options.hasTimestamps !== false,

    tableName: '',

    displayName: '',

    displayAttribute: '',

    rules: {},

    virtuals: {},

    initialize: function initialize(attrs, opts) {

      this.on('saving', this.validateSave);
    },

    fetch: function fetch() {
      var fetchOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


      return _bookshelf2.default.Model.prototype.fetch.call(this, mergeOptions(fetchOptions, options));
    },

    fetchAll: function fetchAll() {
      var fetchOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


      return _bookshelf2.default.Model.prototype.fetchAll.call(this, mergeOptions(fetchOptions, options));
    },

    validateSave: function validateSave(model, attrs, saveOptions) {

      if (saveOptions.skipValidation) return true;

      var rules = this.belongsToTeam !== false ? (0, _extends3.default)({}, saveOptions.withRules || this.rules, options.belongsToTeam !== false ? { team_id: 'required' } : {}) : {};

      return new _checkit2.default(rules).run(this.attributes, { tableName: this.tableName });
    },

    activities: function activities() {

      var Activity = __webpack_require__(/*! ../../models/activity */ "./apps/maha/src/models/activity.js").default;

      return this.morphMany(Activity, 'activable', ['object_table', 'object_id']);
    },

    audit: function audit() {

      var Audit = __webpack_require__(/*! ../../models/audit */ "./apps/maha/src/models/audit.js").default;

      return this.morphMany(Audit, 'auditable');
    },

    comments: function comments() {

      var Comment = __webpack_require__(/*! ../../models/comment */ "./apps/maha/src/models/comment.js").default;

      return this.morphMany(Comment, 'commentable');
    },

    likes: function likes() {

      var Like = __webpack_require__(/*! ../../models/like */ "./apps/maha/src/models/like.js").default;

      return this.morphMany(Like, 'likeable').query(function (qb) {

        qb.whereNull('unliked_at');
      });
    },

    listenings: function listenings() {

      var Listening = __webpack_require__(/*! ../../models/listening */ "./apps/maha/src/models/listening.js").default;

      return this.morphMany(Listening, 'listenable');
    },

    reviews: function reviews() {

      var Review = __webpack_require__(/*! ../../models/review */ "./apps/maha/src/models/review.js").default;

      return this.morphMany(Review, 'reviewable');
    },

    stars: function stars() {

      var Star = __webpack_require__(/*! ../../models/star */ "./apps/maha/src/models/star.js").default;

      return this.morphMany(Star, 'starrable');
    },

    team: function team() {

      var Team = __webpack_require__(/*! ../../models/team */ "./apps/maha/src/models/team.js").default;

      return this.belongsTo(Team, 'team_id');
    }

  }, options));
};

var mergeOptions = function mergeOptions(options, config) {
  return (0, _extends3.default)({}, options, {
    withRelated: [].concat((0, _toConsumableArray3.default)(coerceArray(options.withRelated)), (0, _toConsumableArray3.default)(coerceArray(config.withRelated)))
  });
};

var coerceArray = function coerceArray(value) {
  return !_lodash2.default.isNil(value) ? !_lodash2.default.isArray(value) ? [value] : value : [];
};

exports.default = Model;

/***/ }),

/***/ "./apps/maha/src/core/objects/navigation.js":
/*!**************************************************!*\
  !*** ./apps/maha/src/core/objects/navigation.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Navigation = function Navigation(options) {
  (0, _classCallCheck3.default)(this, Navigation);


  return options;
};

exports.default = Navigation;

/***/ }),

/***/ "./apps/maha/src/core/objects/notification_types.js":
/*!**********************************************************!*\
  !*** ./apps/maha/src/core/objects/notification_types.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var NotificationTypes = function NotificationTypes(options) {

  return options;
};

exports.default = NotificationTypes;

/***/ }),

/***/ "./apps/maha/src/core/objects/queue.js":
/*!*********************************************!*\
  !*** ./apps/maha/src/core/objects/queue.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = __webpack_require__(/*! bluebird */ "bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "./node_modules/babel-runtime/helpers/asyncToGenerator.js");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ "./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _logger = __webpack_require__(/*! ../utils/logger */ "./apps/maha/src/core/utils/logger.js");

var _knex = __webpack_require__(/*! ../services/knex */ "./apps/maha/src/core/services/knex.js");

var _knex2 = _interopRequireDefault(_knex);

var _ioredis = __webpack_require__(/*! ioredis */ "ioredis");

var _ioredis2 = _interopRequireDefault(_ioredis);

var _bull = __webpack_require__(/*! bull */ "bull");

var _bull2 = _interopRequireDefault(_bull);

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Queue = function () {
  function Queue(options) {
    (0, _classCallCheck3.default)(this, Queue);


    this._enqueue = options.enqueue;

    this.name = options.name;

    this.processor = options.processor;

    this.failed = options.failed;

    this.completed = options.completed;

    this.queue = new _bull2.default(this.name, null, null, { createClient: createClient });
  }

  (0, _createClass3.default)(Queue, [{
    key: 'start',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(options) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:

                if (this.processor) this.queue.process(wrapped(this.name, this.processor));

                if (this.failed) this.queue.on('failed', this.failed);

                if (this.completed) this.queue.on('completed', this.completed);

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function start(_x) {
        return _ref.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: 'enqueue',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, trx, options) {
        var _this = this;

        var job;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._enqueue(req, trx, options);

              case 2:
                job = _context2.sent;

                if (true) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt('return');

              case 5:
                _context2.next = 7;
                return new _bluebird2.default(function (resolve, reject) {

                  setTimeout(function () {

                    _this.queue.add(job, { delay: 2000, attempts: 3, backoff: 5000 });

                    resolve();
                  }, 500);
                });

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function enqueue(_x2, _x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return enqueue;
    }()
  }, {
    key: 'clean',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(type) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.queue.clean(0, type);

              case 2:
                return _context3.abrupt('return', _context3.sent);

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function clean(_x5) {
        return _ref3.apply(this, arguments);
      }

      return clean;
    }()
  }, {
    key: 'getJob',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(job_id) {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.queue.getJob(job_id);

              case 2:
                return _context4.abrupt('return', _context4.sent);

              case 3:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getJob(_x6) {
        return _ref4.apply(this, arguments);
      }

      return getJob;
    }()
  }]);
  return Queue;
}();

var wrapped = function wrapped(name, processor) {
  return function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(job, done) {
      var processorWithTransaction, processorWithLogger, is_prod, envProcessor;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              processorWithTransaction = withTransaction(processor, job);
              processorWithLogger = withLogger(name, processorWithTransaction, job);
              is_prod = "development" === 'production';
              envProcessor = !is_prod ? processorWithLogger : processorWithTransaction;
              _context5.prev = 4;
              _context5.next = 7;
              return envProcessor();

            case 7:

              done();

              _context5.next = 13;
              break;

            case 10:
              _context5.prev = 10;
              _context5.t0 = _context5['catch'](4);


              done(_context5.t0);

            case 13:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined, [[4, 10]]);
    }));

    return function (_x7, _x8) {
      return _ref5.apply(this, arguments);
    };
  }();
};

var withLogger = function withLogger(name, processor, job) {
  return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
    var requestId;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            requestId = _lodash2.default.random(100000, 999999).toString(36);


            (0, _logger.beginLogger)(requestId);

            _context6.next = 4;
            return processor();

          case 4:

            (0, _logger.printQueueLogger)(name, job, requestId);

            (0, _logger.endLogger)(requestId);

          case 6:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));
};

var withTransaction = function withTransaction(processor, job) {
  return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _knex2.default.transaction(function () {
              var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(trx) {
                return _regenerator2.default.wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.prev = 0;
                        _context7.next = 3;
                        return processor(job, trx);

                      case 3:
                        _context7.next = 5;
                        return trx.commit();

                      case 5:
                        _context7.next = 11;
                        break;

                      case 7:
                        _context7.prev = 7;
                        _context7.t0 = _context7['catch'](0);
                        _context7.next = 11;
                        return trx.rollback(_context7.t0);

                      case 11:
                      case 'end':
                        return _context7.stop();
                    }
                  }
                }, _callee7, undefined, [[0, 7]]);
              }));

              return function (_x9) {
                return _ref8.apply(this, arguments);
              };
            }());

          case 2:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  }));
};

// create reusable client, and subscriber connections. These get instantiated
// once per process and are reused across all queues running in that process

var client = new _ioredis2.default("redis://localhost:6379/14");

var subscriber = new _ioredis2.default("redis://localhost:6379/14");

var createClient = function createClient(type) {

  if (type === 'client') return client;

  if (type === 'subscriber') return subscriber;

  return new _ioredis2.default("redis://localhost:6379/14");
};

exports.default = Queue;

/***/ }),

/***/ "./apps/maha/src/core/objects/resources.js":
/*!*************************************************!*\
  !*** ./apps/maha/src/core/objects/resources.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(/*! babel-runtime/helpers/toConsumableArray */ "./node_modules/babel-runtime/helpers/toConsumableArray.js");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = __webpack_require__(/*! babel-runtime/helpers/extends */ "./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _backframe = __webpack_require__(/*! backframe */ "backframe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MahaResources = function MahaResources(options) {
  (0, _classCallCheck3.default)(this, MahaResources);


  return new _backframe.Resources((0, _extends3.default)({}, options, {
    dependents: [{ relationship: 'activities', strategy: 'destroy' }, { relationship: 'audit', strategy: 'destroy' }, { relationship: 'comments', strategy: 'destroy' }, { relationship: 'listenings', strategy: 'destroy' }].concat((0, _toConsumableArray3.default)(options.dependents || []))
  }));
};

exports.default = MahaResources;

/***/ }),

/***/ "./apps/maha/src/core/objects/rights.js":
/*!**********************************************!*\
  !*** ./apps/maha/src/core/objects/rights.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Rights = function Rights(options) {

  return options;
};

exports.default = Rights;

/***/ }),

/***/ "./apps/maha/src/core/objects/routes.js":
/*!**********************************************!*\
  !*** ./apps/maha/src/core/objects/routes.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Routes = function Routes(options) {
  (0, _classCallCheck3.default)(this, Routes);


  return options;
};

exports.default = Routes;

/***/ }),

/***/ "./apps/maha/src/core/objects/search.js":
/*!**********************************************!*\
  !*** ./apps/maha/src/core/objects/search.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var search = function search(options) {

  return options;
};

exports.default = search;

/***/ }),

/***/ "./apps/maha/src/core/objects/serializer.js":
/*!**************************************************!*\
  !*** ./apps/maha/src/core/objects/serializer.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var serializer = function serializer(options) {

  return options;
};

exports.default = serializer;

/***/ }),

/***/ "./apps/maha/src/core/services/aws.js":
/*!********************************************!*\
  !*** ./apps/maha/src/core/services/aws.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _awsSdk = __webpack_require__(/*! aws-sdk */ "aws-sdk");

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_awsSdk2.default.config.constructor({
  accessKeyId: "AKIAJGQBN7DJGZQOJS5A" || '',
  secretAccessKey: Object({"APPS":["maha","maha-chat","maha-competencies","maha-crm","maha-drive","maha-eatfresh","maha-expenses","maha-platform","maha-team"],"DATABASE_URL":"postgres://postgres@localhost:5432/maha","REDIS_URL":"redis://localhost:6379/14","SECRET":"fsad8fsad78fdshbfwbhse78yfw","SERVER_PORT":8080,"SOCKET_PORT":8090,"DOMAIN":"mahaplatform.com","EMAIL_REDIRECT":"greg@thinktopography.com","EMAIL_DELIVERY":"ses","ASSET_SOTRAGE":"s3","MICROSOFT_APP_ID":"c54c9b91-e766-4829-a530-34107843fe8d","MICROSOFT_APP_SECRET":"arYWE56%=:aehenRXUT372~","BOX_CLIENT_ID":"t36h58btxlcqtudbz30raq1bduibhndz","BOX_CLIENT_SECRET":"oJ4248556NlnViGrGzH0BrbY47r0ipkQ","DROPBOX_APP_KEY":"0c3b36vlsedljil","DROPBOX_APP_SECRET":"r5rcjmd22w0wq31","INSTAGRAM_CLIENT_ID":"0c3b36vlsedljil","INSTAGRAM_CLIENT_SECRET":"r5rcjmd22w0wq31","FACEBOOK_APP_ID":"712a7bfd4801443bafcca253e2fa05ef","FACEBOOK_APP_SECRET":"6ab01fce44a0467883e0af02f5486ff0","GOOGLE_CLIENT_ID":"457997349543-6vamfr7lcdli3g7ups2bubcvg4bnr0ie.apps.googleusercontent.com","GOOGLE_CLIENT_SECRET":"XOOoTscB04Zjqc04JvAS6mOL","ROLLBAR_CLIENT_TOKEN":"ad5c799fec6b4321bbefce7a39b72093","ROLLBAR_SERVER_TOKEN":"0b6e5aa764a948199bafa00407927b38","FCM_API_KEY":"AAAAaqLE8qc:APA91bGKmtxSVdBuOKbsSd_pSPpvyqA6hIkk9SbwpXje5GK-WOKCu0rSfpK7WS7XOncMHyTr3UyvVoKmFM5h5YG8RmC9hLDvwutyqJ2NUMOZPpG-8_Kxi26X3uO0cZiYj6LngyzjadhM","VAPID_PUBLIC_KEY":"BJ4QYD8rLzBxqWjz7bu-LNHgXKySMsIpOMcXc7Weq5rgPHsTtPIt303hhViecF-CUUGuh2WDIWLN_xPorx5EZvM","VAPID_PRIVATE_KEY":"ZNLVfNVxz4_zdurh-cueGqVtYgVIlKb3C7FW8H0NHCc","AWS_ACCESS_KEY_ID":"AKIAJGQBN7DJGZQOJS5A","AWS_SCRET_ACCESS_KEY":"4/9V6b39996bSZquf1YdBHbBRAMUZElkezDA4zd9","AWS_REGION":"us-east-1","AWS_BUCKET":"dev.cdn.mahaplatform.com","WEB_HOST":"http://localhost:8080","WEB_ASSET_HOST":"","DATA_ASSET_HOST":"http://dev.cdn.mahaplatform.com","WEB_ASSET_CDN_HOST":"","DATA_ASSET_CDNHOST":""}).AWS_SECRET_ACCESS_KEY || '',
  region: "us-east-1" || ''
});

module.exports = _awsSdk2.default;

/***/ }),

/***/ "./apps/maha/src/core/services/bookshelf.js":
/*!**************************************************!*\
  !*** ./apps/maha/src/core/services/bookshelf.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bookshelf = __webpack_require__(/*! bookshelf */ "bookshelf");

var _bookshelf2 = _interopRequireDefault(_bookshelf);

var _knex = __webpack_require__(/*! ./knex */ "./apps/maha/src/core/services/knex.js");

var _knex2 = _interopRequireDefault(_knex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bookshelf = (0, _bookshelf2.default)(_knex2.default);

bookshelf.plugin('virtuals');

exports.default = bookshelf;

/***/ }),

/***/ "./apps/maha/src/core/services/emitter.js":
/*!************************************************!*\
  !*** ./apps/maha/src/core/services/emitter.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _socket = __webpack_require__(/*! socket.io-emitter */ "socket.io-emitter");

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emitter = (0, _socket2.default)("redis://localhost:6379/14");

exports.default = emitter;

/***/ }),

/***/ "./apps/maha/src/core/services/jwt.js":
/*!********************************************!*\
  !*** ./apps/maha/src/core/services/jwt.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decode = exports.encode = undefined;

var _jsonwebtoken = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var encode = exports.encode = function encode(data, duration) {

  var iat = Math.floor(Date.now() / 1000);

  var exp = iat + duration;

  return _jsonwebtoken2.default.sign({ iat: iat, exp: exp, data: data }, "fsad8fsad78fdshbfwbhse78yfw");
};

var decode = exports.decode = function decode(token) {

  return _jsonwebtoken2.default.verify(token, "fsad8fsad78fdshbfwbhse78yfw");
};

/***/ }),

/***/ "./apps/maha/src/core/services/knex.js":
/*!*********************************************!*\
  !*** ./apps/maha/src/core/services/knex.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(/*! babel-runtime/helpers/slicedToArray */ "./node_modules/babel-runtime/helpers/slicedToArray.js");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _knex = __webpack_require__(/*! knex */ "knex");

var _knex2 = _interopRequireDefault(_knex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _process$env$DATABASE = "postgres://postgres@localhost:5432/maha".match(/(.*):\/\/\/?(.*)/),
    _process$env$DATABASE2 = (0, _slicedToArray3.default)(_process$env$DATABASE, 2),
    url = _process$env$DATABASE2[0],
    protocol = _process$env$DATABASE2[1];

var getClient = function getClient(protocol) {

  switch (protocol) {

    case 'postgres':
      return 'postgresql';

    default:
      return protocol;

  }
};

var getConnection = function getConnection(protocol, url) {

  switch (protocol) {

    default:
      return url;

  }
};

var getPool = function getPool(env) {
  return {
    min: env === 'test' ? 1 : 5,
    max: env === 'test' ? 1 : 30
  };
};

var config = {
  client: getClient(protocol),
  connection: getConnection(protocol, url),
  useNullAsDefault: true,
  pool: getPool("development")
};

var knex = new _knex2.default(config);

exports.default = knex;

/***/ }),

/***/ "./apps/maha/src/core/services/presence.js":
/*!*************************************************!*\
  !*** ./apps/maha/src/core/services/presence.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setPresence = exports.getPresence = undefined;

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "./node_modules/babel-runtime/helpers/asyncToGenerator.js");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _bluebird = __webpack_require__(/*! bluebird */ "bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

var _redis = __webpack_require__(/*! ./redis */ "./apps/maha/src/core/services/redis.js");

var _redis2 = _interopRequireDefault(_redis);

var _redisLock = __webpack_require__(/*! redis-lock */ "redis-lock");

var _redisLock2 = _interopRequireDefault(_redisLock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Lock = (0, _redisLock2.default)(_redis2.default);

var lock = function lock() {
  return new _bluebird2.default(function (resolve, reject) {

    Lock(_redis2.default, 500, resolve);
  });
};

var getPresence = exports.getPresence = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var users, unlock;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            users = null;
            _context.next = 3;
            return lock('presence');

          case 3:
            unlock = _context.sent;
            _context.t1 = JSON;
            _context.next = 7;
            return _redis2.default.getAsync('presence');

          case 7:
            _context.t2 = _context.sent;
            _context.t0 = _context.t1.parse.call(_context.t1, _context.t2);

            if (_context.t0) {
              _context.next = 11;
              break;
            }

            _context.t0 = [];

          case 11:
            users = _context.t0;


            unlock();

            return _context.abrupt('return', users);

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getPresence() {
    return _ref.apply(this, arguments);
  };
}();

var setPresence = exports.setPresence = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(presence) {
    var unlock;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return lock('presence');

          case 2:
            unlock = _context2.sent;
            _context2.next = 5;
            return _redis2.default.setAsync('presence', JSON.stringify(presence));

          case 5:

            unlock();

            return _context2.abrupt('return', presence);

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function setPresence(_x) {
    return _ref2.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./apps/maha/src/core/services/redis.js":
/*!**********************************************!*\
  !*** ./apps/maha/src/core/services/redis.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = __webpack_require__(/*! bluebird */ "bluebird");

var _redis = __webpack_require__(/*! redis */ "redis");

var _redis2 = _interopRequireDefault(_redis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _bluebird.promisifyAll)(_redis2.default.RedisClient.prototype);

exports.default = _redis2.default.createClient("redis://localhost:6379/14");

/***/ }),

/***/ "./apps/maha/src/core/services/ses.js":
/*!********************************************!*\
  !*** ./apps/maha/src/core/services/ses.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodemailer = __webpack_require__(/*! nodemailer */ "nodemailer");

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _aws = __webpack_require__(/*! ./aws */ "./apps/maha/src/core/services/aws.js");

var _aws2 = _interopRequireDefault(_aws);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SES = new _aws2.default.SES({ apiVersion: '2010-12-01' });

exports.default = _nodemailer2.default.createTransport({ SES: SES });

/***/ }),

/***/ "./apps/maha/src/core/services/webpush.js":
/*!************************************************!*\
  !*** ./apps/maha/src/core/services/webpush.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendViaPush = undefined;

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "./node_modules/babel-runtime/helpers/asyncToGenerator.js");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _webPush = __webpack_require__(/*! web-push */ "web-push");

var _webPush2 = _interopRequireDefault(_webPush);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sendViaPush = exports.sendViaPush = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(session, notification) {
    var payload;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            payload = JSON.stringify(notification);
            _context.next = 3;
            return _webPush2.default.sendNotification({
              endpoint: session.related('device').get('push_endpoint'),
              keys: {
                p256dh: session.related('device').get('push_p256dh'),
                auth: session.related('device').get('push_auth')
              }
            }, payload, {
              gcmAPIKey: "AAAAaqLE8qc:APA91bGKmtxSVdBuOKbsSd_pSPpvyqA6hIkk9SbwpXje5GK-WOKCu0rSfpK7WS7XOncMHyTr3UyvVoKmFM5h5YG8RmC9hLDvwutyqJ2NUMOZPpG-8_Kxi26X3uO0cZiYj6LngyzjadhM",
              vapidDetails: {
                subject: 'mailto:greg@thinktopography.com',
                publicKey: "BJ4QYD8rLzBxqWjz7bu-LNHgXKySMsIpOMcXc7Weq5rgPHsTtPIt303hhViecF-CUUGuh2WDIWLN_xPorx5EZvM",
                privateKey: "ZNLVfNVxz4_zdurh-cueGqVtYgVIlKb3C7FW8H0NHCc"
              }
            });

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function sendViaPush(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./apps/maha/src/core/utils/app_config.js":
/*!************************************************!*\
  !*** ./apps/maha/src/core/utils/app_config.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configs = undefined;

var _defineProperty2 = __webpack_require__(/*! babel-runtime/helpers/defineProperty */ "./node_modules/babel-runtime/helpers/defineProperty.js");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = __webpack_require__(/*! babel-runtime/helpers/extends */ "./node_modules/babel-runtime/helpers/extends.js");

var _extends4 = _interopRequireDefault(_extends3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configs = exports.configs = ["maha","maha-chat","maha-competencies","maha-crm","maha-drive","maha-eatfresh","maha-expenses","maha-platform","maha-team"].reduce(function (configs, app) {

  var config = __webpack_require__("./apps/" + app + "/src/app.js");

  return (0, _extends4.default)({}, configs, (0, _defineProperty3.default)({}, app, config.default));
}, {});

var appConfig = function appConfig(name) {

  return configs[name];
};

exports.default = appConfig;

/***/ }),

/***/ "./apps/maha/src/core/utils/collect_objects.js":
/*!*****************************************************!*\
  !*** ./apps/maha/src/core/utils/collect_objects.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(/*! babel-runtime/helpers/slicedToArray */ "./node_modules/babel-runtime/helpers/slicedToArray.js");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _toConsumableArray2 = __webpack_require__(/*! babel-runtime/helpers/toConsumableArray */ "./node_modules/babel-runtime/helpers/toConsumableArray.js");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _app_config = __webpack_require__(/*! ./app_config */ "./apps/maha/src/core/utils/app_config.js");

var _app_config2 = _interopRequireDefault(_app_config);

var _glob = __webpack_require__(/*! glob */ "glob");

var _glob2 = _interopRequireDefault(_glob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collectObjects = function collectObjects(pattern) {
  return [].concat((0, _toConsumableArray3.default)(_glob2.default.sync('apps/*/src/' + pattern)), (0, _toConsumableArray3.default)(_glob2.default.sync('apps/*/src/' + pattern + '/index.js'))).map(function (file) {
    var _file$match = file.match(/apps\/([^/]*)/),
        _file$match2 = (0, _slicedToArray3.default)(_file$match, 2),
        app = _file$match2[1];

    return {
      name: app,
      default: __webpack_require__('./' + file).default,
      config: (0, _app_config2.default)(app)
    };
  });
};

exports.default = collectObjects;

/***/ }),

/***/ "./apps/maha/src/core/utils/console.js":
/*!*********************************************!*\
  !*** ./apps/maha/src/core/utils/console.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writePaddedLine = undefined;

var _chalk = __webpack_require__(/*! chalk */ "chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _wrapAnsi = __webpack_require__(/*! wrap-ansi */ "wrap-ansi");

var _wrapAnsi2 = _interopRequireDefault(_wrapAnsi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var writePaddedLine = exports.writePaddedLine = function writePaddedLine(label) {
  var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var background = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#FFFFFF';
  var newline = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var rewind = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;


  var width = process.stdout.columns;

  var labelWidth = label ? stripAnsi(label).length : 0;

  var contentWidth = width - labelWidth - 6;

  var padded = (0, _wrapAnsi2.default)(text, contentWidth, { hard: true }).split('\n').map(function (chunkLine, index) {

    var intro = label ? index === 0 ? label + ' ' : Array(labelWidth + 2).join(' ') : '';

    var line = intro + chunkLine;

    var stripped = stripAnsi(line);

    var extraWidth = width - stripped.length - 4;

    var extra = extraWidth > 0 ? Array(extraWidth).join(' ') : '';

    var termination = newline ? '\n' : '';

    return _chalk2.default.bgHex(background).grey('  ' + line + extra + '  ' + termination);
  }).join('');

  if (rewind && process.stdout.cursorTo) process.stdout.cursorTo(0);

  process.stdout.write(padded);
};

var stripAnsi = function stripAnsi(text) {
  return text.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
};

/***/ }),

/***/ "./apps/maha/src/core/utils/format_object_for_transport.js":
/*!*****************************************************************!*\
  !*** ./apps/maha/src/core/utils/format_object_for_transport.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(/*! babel-runtime/helpers/defineProperty */ "./node_modules/babel-runtime/helpers/defineProperty.js");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = __webpack_require__(/*! babel-runtime/helpers/extends */ "./node_modules/babel-runtime/helpers/extends.js");

var _extends4 = _interopRequireDefault(_extends3);

var _moment = __webpack_require__(/*! moment */ "moment");

var _moment2 = _interopRequireDefault(_moment);

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formatObjectForTransport = function formatObjectForTransport(value) {

  if (_lodash2.default.isUndefined(value)) return null;

  if (_lodash2.default.isDate(value)) return (0, _moment2.default)(value).utc().format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';

  if (_lodash2.default.isPlainObject(value)) return Object.keys(value).reduce(function (formatted, key) {
    return (0, _extends4.default)({}, formatted, (0, _defineProperty3.default)({}, key, formatObjectForTransport(value[key])));
  }, {});

  return value;
};

exports.default = formatObjectForTransport;

/***/ }),

/***/ "./apps/maha/src/core/utils/logger.js":
/*!********************************************!*\
  !*** ./apps/maha/src/core/utils/logger.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printCronLogger = exports.printQueueLogger = exports.printMiddlewareLogger = exports.withLogger = exports.endLogger = exports.beginLogger = undefined;

var _slicedToArray2 = __webpack_require__(/*! babel-runtime/helpers/slicedToArray */ "./node_modules/babel-runtime/helpers/slicedToArray.js");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _console = __webpack_require__(/*! ../utils/console */ "./apps/maha/src/core/utils/console.js");

var _knex = __webpack_require__(/*! ../services/knex */ "./apps/maha/src/core/services/knex.js");

var _knex2 = _interopRequireDefault(_knex);

var _chalk = __webpack_require__(/*! chalk */ "chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _util = __webpack_require__(/*! util */ "util");

var _util2 = _interopRequireDefault(_util);

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requests = {};

var listeners = {};

var beginLogger = exports.beginLogger = function beginLogger(requestId) {

  if (!requests[requestId]) _createRequest(requestId);

  listeners[requestId] = {
    query: _startQuery(requestId),
    response: _endQuery(requestId)
  };

  _knex2.default.client.on('query', listeners[requestId].query).on('query-response', listeners[requestId].response);

  console.mail = _logMessage('mail', requestId);
};

var endLogger = exports.endLogger = function endLogger(requestId) {

  _knex2.default.client.removeListener('query', listeners[requestId].query).removeListener('query-response', listeners[requestId].response);

  delete requests[requestId];

  delete listeners[requestId];
};

var withLogger = exports.withLogger = function withLogger(middleware) {
  return function (req, res, next) {

    var requestId = _lodash2.default.random(100000, 999999).toString(36);

    beginLogger(requestId);

    middleware(req, res, next);

    res.on('finish', function () {

      printMiddlewareLogger(req, res, requestId);

      endLogger(requestId);
    });
  };
};

var printMiddlewareLogger = exports.printMiddlewareLogger = function printMiddlewareLogger(req, res, requestId) {

  requests[requestId].duration = _getDuration(requests[requestId].startTime);

  var request = requests[requestId];

  var _req$originalUrl$matc = req.originalUrl.match(/^([^?]*)(.*)?$/),
      _req$originalUrl$matc2 = (0, _slicedToArray3.default)(_req$originalUrl$matc, 2),
      url = _req$originalUrl$matc2[1];

  var _req$headers$host$mat = req.headers.host.match(/^([\w.]*):?(\d*)?$/),
      _req$headers$host$mat2 = (0, _slicedToArray3.default)(_req$headers$host$mat, 2),
      hostname = _req$headers$host$mat2[1];

  var title = ['REQUEST: ', req.method + ' ' + url];

  var head = [];

  if (!_lodash2.default.isNil(req.team)) head.push(['TEAM:    ', req.team.get('title') + ' [ ID# ' + req.team.get('id') + ' ]']);

  if (_lodash2.default.isString(req.app.get('title'))) head.push(['APP:     ', req.app.get('title')]);

  if (!_lodash2.default.isNil(req.user)) head.push(['USER:    ', req.user.get('full_name') + ' [ ID# ' + req.user.get('id') + ' ]']);

  head.push(['HOST:    ', hostname]);

  if (!_lodash2.default.isEmpty(req.params)) head.push(['PARAMS:  ', JSON.stringify(req.params)]);

  if (!_lodash2.default.isEmpty(req.body)) head.push(['BODY:    ', JSON.stringify(req.body)]);

  if (!_lodash2.default.isEmpty(req.query)) head.push(['QUERY:   ', JSON.stringify(req.query)]);

  head.push(['RESPONSE:', res.statusCode + ' rendered in ' + request.duration + ' ms']);

  _printLogger(title, head, request, '#DB2828');
};

var printQueueLogger = exports.printQueueLogger = function printQueueLogger(queue, job, requestId) {

  requests[requestId].duration = _getDuration(requests[requestId].startTime);

  var request = requests[requestId];

  var title = ['QUEUE:', queue];

  var head = [];

  head.push(['JOB:     ', JSON.stringify(job.data)]);

  head.push(['RESPONSE:', 'processed in ' + request.duration + ' ms']);

  _printLogger(title, head, request, '#A333C8');
};

var printCronLogger = exports.printCronLogger = function printCronLogger(cron, requestId) {

  requests[requestId].duration = _getDuration(requests[requestId].startTime);

  var request = requests[requestId];

  var head = [];

  var title = ['CRON:', cron];

  head.push(['RESPONSE:', 'processed in ' + request.duration + ' ms']);

  _printLogger(title, head, request, '#E03997');
};

var _startQuery = function _startQuery(requestId) {
  return function (query) {

    if (!requests[requestId]) _createRequest(requestId);

    if (!_hasUidBeenMapped(query.__knexUid) && !requests[requestId].__knexUid) {

      requests[requestId].__knexUid = query.__knexUid;
    }

    if (_getRequestIdFromUid(query.__knexUid) !== requestId) return;

    var uid = query.__knexQueryUid || query.sql;

    requests[requestId].log.push({
      type: 'query',
      uid: uid,
      duration: 0,
      startTime: process.hrtime(),
      sql: query.sql,
      bindings: query.bindings
    });
  };
};

var _endQuery = function _endQuery(requestId) {
  return function (response, query) {

    if (_getRequestIdFromUid(query.__knexUid) !== requestId) return;

    var uid = query.__knexQueryUid || query.sql;

    var index = _lodash2.default.findIndex(requests[requestId].log, { uid: uid });

    if (!requests[requestId].log[index]) return;

    requests[requestId].log[index].duration = _getDuration(requests[requestId].log[index].startTime);
  };
};

var _createRequest = function _createRequest(requestId) {

  requests[requestId] = {
    startTime: process.hrtime(),
    duration: null,
    log: []
  };
};
var _getDuration = function _getDuration(startTime) {

  var diff = process.hrtime(startTime);

  var ms = diff[0] * 1e3 + diff[1] * 1e-6;

  return ms.toFixed(3);
};

var _hasUidBeenMapped = function _hasUidBeenMapped(uid) {

  return Object.keys(requests).reduce(function (mapped, requestId) {

    return mapped || requests[requestId].__knexUid === uid;
  }, false);
};

var _getRequestIdFromUid = function _getRequestIdFromUid(uid) {

  return Object.keys(requests).reduce(function (found, requestId) {

    if (found) return found;

    return requests[requestId].__knexUid === uid ? requestId : null;
  }, null);
};

var _logMessage = function _logMessage(level, requestId) {

  return function () {

    if (!requests[requestId]) return;

    requests[requestId].log.push({
      type: 'log',
      level: level,
      message: _util2.default.format.apply(this, arguments)
    });
  };
};

var _printLogger = function _printLogger(title, head, request, color) {

  process.stdout.write('\n');

  (0, _console.writePaddedLine)(null, '', color);

  (0, _console.writePaddedLine)(_chalk2.default.bold.white(title[0]), _chalk2.default.white(title[1]), color);

  (0, _console.writePaddedLine)(null, '', color);

  (0, _console.writePaddedLine)(null, '', '#EEEEEE');

  head.map(function (line) {

    (0, _console.writePaddedLine)(_chalk2.default.black(line[0]), _chalk2.default.grey(line[1]), '#EEEEEE');
  });

  (0, _console.writePaddedLine)(null, '', '#EEEEEE');

  (0, _console.writePaddedLine)(null, '', '#FFFFFF');

  request.log.map(function (item) {

    if (item.type === 'query') {

      var bindings = item.bindings ? ' {' + item.bindings.join(', ') + '}' : '';

      var duration = item.duration ? ' ' + item.duration + ' ms' : '';

      var line = item.sql + _chalk2.default.magenta(bindings) + duration;

      (0, _console.writePaddedLine)(_chalk2.default.black('SQL:     '), line, '#FFFFFF');
    }

    if (item.type === 'log') {

      if (item.level === 'log') (0, _console.writePaddedLine)(_chalk2.default.black('LOG:     '), _chalk2.default.grey(item.message), '#FFFFFF');

      if (item.level === 'info') (0, _console.writePaddedLine)(_chalk2.default.black('INFO:    '), _chalk2.default.grey(item.message), '#FFFFFF');

      if (item.level === 'mail') (0, _console.writePaddedLine)(_chalk2.default.black('MAIL:    '), _chalk2.default.grey(item.message), '#FFFFFF');

      if (item.level === 'error') (0, _console.writePaddedLine)(_chalk2.default.black('ERROR:   '), _chalk2.default.red(item.message), '#FFFFFF');
    }
  });

  (0, _console.writePaddedLine)(null, '', '#FFFFFF');
};

/***/ }),

/***/ "./apps/maha/src/core/utils/model_activities.js":
/*!******************************************************!*\
  !*** ./apps/maha/src/core/utils/model_activities.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(/*! babel-runtime/helpers/defineProperty */ "./node_modules/babel-runtime/helpers/defineProperty.js");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = __webpack_require__(/*! babel-runtime/helpers/extends */ "./node_modules/babel-runtime/helpers/extends.js");

var _extends4 = _interopRequireDefault(_extends3);

var _collect_objects = __webpack_require__(/*! ./collect_objects */ "./apps/maha/src/core/utils/collect_objects.js");

var _collect_objects2 = _interopRequireDefault(_collect_objects);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapped = null;

var models = function models(table) {

  if (mapped) return mapped[table];

  mapped = (0, _collect_objects2.default)('models/*').reduce(function (objects, model) {

    var object = model.default;

    var instance = object.extend().__super__;

    return (0, _extends4.default)({}, objects, (0, _defineProperty3.default)({}, instance.tableName, {
      model: object,
      displayName: instance.displayName,
      displayAttribute: instance.displayAttribute
    }));
  }, {});

  return mapped[table];
};

exports.default = models;

/***/ }),

/***/ "./apps/maha/src/core/utils/model_helpers.js":
/*!***************************************************!*\
  !*** ./apps/maha/src/core/utils/model_helpers.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateRelated = undefined;

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = __webpack_require__(/*! babel-runtime/helpers/defineProperty */ "./node_modules/babel-runtime/helpers/defineProperty.js");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "./node_modules/babel-runtime/helpers/asyncToGenerator.js");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _backframe = __webpack_require__(/*! backframe */ "backframe");

var _backframe2 = _interopRequireDefault(_backframe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateRelated = exports.updateRelated = function updateRelated(related, table, param, result_key, foreign_key) {
  return function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, result, options) {
      var body_ids, ids, remove_ids, add_ids;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              body_ids = _lodash2.default.get(req, 'body.' + param);

              if (body_ids) {
                _context.next = 3;
                break;
              }

              return _context.abrupt('return');

            case 3:
              _context.prev = 3;
              _context.next = 6;
              return result.load([related], { transacting: trx });

            case 6:
              ids = result.related(related).map(function (item) {
                return item.id;
              });
              remove_ids = ids.filter(function (id) {
                return !_lodash2.default.includes(body_ids, id);
              });
              add_ids = body_ids.filter(function (id) {
                return !_lodash2.default.includes(ids, id);
              });

              if (!remove_ids) {
                _context.next = 12;
                break;
              }

              _context.next = 12;
              return options.knex(table).transacting(trx).where((0, _defineProperty3.default)({}, result_key, result.get('id'))).whereIn(foreign_key, remove_ids).delete();

            case 12:
              if (!add_ids) {
                _context.next = 15;
                break;
              }

              _context.next = 15;
              return options.knex(table).transacting(trx).insert(add_ids.map(function (id) {
                var _ref2;

                return _ref2 = {}, (0, _defineProperty3.default)(_ref2, result_key, result.get('id')), (0, _defineProperty3.default)(_ref2, foreign_key, id), _ref2;
              }));

            case 15:
              _context.next = 22;
              break;

            case 17:
              _context.prev = 17;
              _context.t0 = _context['catch'](3);

              if (!_context.t0.errors) {
                _context.next = 21;
                break;
              }

              throw new _backframe2.default({
                code: 422,
                message: 'Unable to update related',
                errors: _context.t0.toJSON()
              });

            case 21:
              throw _context.t0;

            case 22:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[3, 17]]);
    }));

    return function (_x, _x2, _x3, _x4) {
      return _ref.apply(this, arguments);
    };
  }();
};

/***/ }),

/***/ "./apps/maha/src/core/utils/send_mail.js":
/*!***********************************************!*\
  !*** ./apps/maha/src/core/utils/send_mail.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = __webpack_require__(/*! bluebird */ "bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = __webpack_require__(/*! babel-runtime/helpers/extends */ "./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "./node_modules/babel-runtime/helpers/asyncToGenerator.js");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _htmlEmailToText = __webpack_require__(/*! html-email-to-text */ "html-email-to-text");

var _htmlEmailToText2 = _interopRequireDefault(_htmlEmailToText);

var _ses = __webpack_require__(/*! ../services/ses */ "./apps/maha/src/core/services/ses.js");

var _ses2 = _interopRequireDefault(_ses);

var _inlineCss = __webpack_require__(/*! inline-css */ "inline-css");

var _inlineCss2 = _interopRequireDefault(_inlineCss);

var _moment = __webpack_require__(/*! moment */ "moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sendMail = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(email) {
    var html, rendered;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _inlineCss2.default)(email.html, { url: "http://localhost:8080", preserveMediaQueries: true });

          case 2:
            html = _context.sent;
            rendered = (0, _extends3.default)({}, email, {
              to: "greg@thinktopography.com" || email.to,
              html: html,
              text: (0, _htmlEmailToText2.default)(email.html)
            });
            _context.prev = 4;

            if (true) {
              _context.next = 9;
              break;
            }

            _context.next = 8;
            return _sendViaConsole(rendered);

          case 8:
            return _context.abrupt('return', _context.sent);

          case 9:
            if (false) {}

            _context.next = 12;
            return _sendViaSES(rendered);

          case 12:
            return _context.abrupt('return', _context.sent);

          case 13:
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context['catch'](4);
            return _context.abrupt('return', { error: _context.t0.message });

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[4, 15]]);
  }));

  return function sendMail(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _sendViaConsole = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(rendered) {
    var output;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            output = [Array(86).join('-'), 'TO: ' + rendered.to, 'SUBJECT: ' + rendered.subject, Array(86).join('-'), rendered.text, Array(86).join('-')];


            console.mail(output.join('\n'));

            return _context2.abrupt('return', { sent_at: (0, _moment2.default)() });

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function _sendViaConsole(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _sendViaSES = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(rendered) {
    var result;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return new _bluebird2.default(function (resolve, reject) {

              _ses2.default.sendMail(rendered, function () {
                var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(err, info) {
                  return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:

                          if (err) reject(err);

                          resolve(info);

                        case 2:
                        case 'end':
                          return _context3.stop();
                      }
                    }
                  }, _callee3, undefined);
                }));

                return function (_x4, _x5) {
                  return _ref4.apply(this, arguments);
                };
              }());
            });

          case 2:
            result = _context4.sent;
            return _context4.abrupt('return', { ses_id: result.response, sent_at: (0, _moment2.default)() });

          case 4:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function _sendViaSES(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = sendMail;

/***/ }),

/***/ "./apps/maha/src/core/utils/user_tokens.js":
/*!*************************************************!*\
  !*** ./apps/maha/src/core/utils/user_tokens.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadUserFromToken = exports.createUserToken = undefined;

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "./node_modules/babel-runtime/helpers/asyncToGenerator.js");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = __webpack_require__(/*! babel-runtime/helpers/defineProperty */ "./node_modules/babel-runtime/helpers/defineProperty.js");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = __webpack_require__(/*! babel-runtime/helpers/extends */ "./node_modules/babel-runtime/helpers/extends.js");

var _extends4 = _interopRequireDefault(_extends3);

var _jwt = __webpack_require__(/*! ../services/jwt */ "./apps/maha/src/core/services/jwt.js");

var jwt = _interopRequireWildcard(_jwt);

var _server = __webpack_require__(/*! ../../server */ "./apps/maha/src/server.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TWO_WEEKS = 60 * 60 * 24 * 7 * 2;

var createUserToken = exports.createUserToken = function createUserToken(user, key) {
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


  return jwt.encode((0, _extends4.default)((0, _defineProperty3.default)({}, key, user.get('id')), data), TWO_WEEKS);
};

var loadUserFromToken = exports.loadUserFromToken = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(key, token, trx) {
    var _ref2, data, iat, id, user;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _decode(token);

          case 2:
            _ref2 = _context.sent;
            data = _ref2.data;
            iat = _ref2.iat;
            id = data[key];

            if (id) {
              _context.next = 8;
              break;
            }

            throw new _server.BackframeError({
              code: 401,
              message: 'Invalid token'
            });

          case 8:
            _context.next = 10;
            return _server.User.where({ id: id }).fetch({ transacting: trx });

          case 10:
            user = _context.sent;

            if (user) {
              _context.next = 13;
              break;
            }

            throw new _server.BackframeError({
              code: 404,
              message: 'Unable to load user'
            });

          case 13:
            return _context.abrupt('return', (0, _extends4.default)({}, data, {
              user: user,
              iat: iat
            }));

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function loadUserFromToken(_x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var _decode = function _decode(token) {

  try {

    return jwt.decode(token);
  } catch (err) {

    if (err.name === 'TokenExpiredError') {
      throw new _server.BackframeError({
        code: 401,
        message: 'Expired token'
      });
    }

    throw new _server.BackframeError({
      code: 401,
      message: 'Invalid token'
    });
  }
};

/***/ }),

/***/ "./apps/maha/src/core/validations/currency_validation.js":
/*!***************************************************************!*\
  !*** ./apps/maha/src/core/validations/currency_validation.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _checkit = __webpack_require__(/*! checkit */ "checkit");

var _checkit2 = _interopRequireDefault(_checkit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_checkit2.default.Validator.prototype.currency = function (val) {
  var _this = this;

  var column = Object.keys(this._target).reduce(function (column, key) {
    return column || (_this._target[key] === val ? key : null);
  }, null);

  if (!val.match(/^\d{1,}\.\d{2}$/)) {
    throw new Error('The ' + column + ' must be valid currency');
  }

  return true;
};

/***/ }),

/***/ "./apps/maha/src/core/validations/datestring_validation.js":
/*!*****************************************************************!*\
  !*** ./apps/maha/src/core/validations/datestring_validation.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _checkit = __webpack_require__(/*! checkit */ "checkit");

var _checkit2 = _interopRequireDefault(_checkit);

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_checkit2.default.Validator.prototype.datestring = function (val) {
  var _this = this;

  var column = Object.keys(this._target).reduce(function (column, key) {
    return column || (_this._target[key] === val ? key : null);
  }, null);

  if (_lodash2.default.isString(val) && !val.match(/^\d{4}-\d{2}-\d{2}$/)) {
    throw new Error('The ' + column + ' must be in the format YYYY-MM-DD');
  }

  return true;
};

/***/ }),

/***/ "./apps/maha/src/core/validations/greater_than_field_validation.js":
/*!*************************************************************************!*\
  !*** ./apps/maha/src/core/validations/greater_than_field_validation.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _checkit = __webpack_require__(/*! checkit */ "checkit");

var _checkit2 = _interopRequireDefault(_checkit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_checkit2.default.Validator.prototype.greaterThanField = function (val, param) {

  if (val <= this._target[param]) throw new Error('must be greater than the ' + param);

  return true;
};

/***/ }),

/***/ "./apps/maha/src/core/validations/later_than_validation.js":
/*!*****************************************************************!*\
  !*** ./apps/maha/src/core/validations/later_than_validation.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _checkit = __webpack_require__(/*! checkit */ "checkit");

var _checkit2 = _interopRequireDefault(_checkit);

var _moment = __webpack_require__(/*! moment */ "moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_checkit2.default.Validator.prototype.laterThan = function (val, param) {

  var today = (0, _moment2.default)().format('YYYY-MM-DD');

  var first = (0, _moment2.default)(today + ' ' + this._target[param]);

  var last = (0, _moment2.default)(today + ' ' + val);

  console.log(first, last, last.diff(first) <= 0);

  if (last.diff(first) <= 0) throw new Error('must be after than the ' + param);

  return true;
};

/***/ }),

/***/ "./apps/maha/src/core/validations/time_validation.js":
/*!***********************************************************!*\
  !*** ./apps/maha/src/core/validations/time_validation.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _checkit = __webpack_require__(/*! checkit */ "checkit");

var _checkit2 = _interopRequireDefault(_checkit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_checkit2.default.Validator.prototype.time = function (val) {
  var _this = this;

  var column = Object.keys(this._target).reduce(function (column, key) {
    return column || (_this._target[key] === val ? key : null);
  }, null);

  if (val.match(/^(\d{1,2}):(\d{2}):?(\d{2})?\s?([am|pm]*)?$/i) === null) {
    throw new Error('The ' + column + ' must be valid time');
  }

  return true;
};

/***/ }),

/***/ "./apps/maha/src/core/validations/unique_validation.js":
/*!*************************************************************!*\
  !*** ./apps/maha/src/core/validations/unique_validation.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _knex = __webpack_require__(/*! ../services/knex */ "./apps/maha/src/core/services/knex.js");

var _knex2 = _interopRequireDefault(_knex);

var _checkit = __webpack_require__(/*! checkit */ "checkit");

var _checkit2 = _interopRequireDefault(_checkit);

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_checkit2.default.Validator.prototype.unique = function (val) {
  var _this = this;

  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


  var tableName = params.tableName || options.tableName;

  var column = Object.keys(this._target).reduce(function (column, key) {
    return column || (_this._target[key] === val ? key : null);
  }, null);

  var query = (0, _knex2.default)(tableName).where(column, '=', val);

  if (_lodash2.default.isString(params)) {
    params.split(',').map(function (key) {
      query = query.where(key, _this._target[key]);
    });
  }

  if (this._target.team_id) {
    query = query.where({ team_id: this._target.team_id });
  }

  if (this._target.id) {
    query = query.whereNot({ id: this._target.id });
  }

  return query.then(function (resp) {
    if (resp.length > 0) throw new Error('The ' + column + ' is already in use');
  });
};
_checkit2.default.Validator.prototype.unique.message = 'Foo';

/***/ }),

/***/ "./apps/maha/src/models/activity.js":
/*!******************************************!*\
  !*** ./apps/maha/src/models/activity.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

var _app = __webpack_require__(/*! ./app */ "./apps/maha/src/models/app.js");

var _app2 = _interopRequireDefault(_app);

var _story = __webpack_require__(/*! ./story */ "./apps/maha/src/models/story.js");

var _story2 = _interopRequireDefault(_story);

var _user = __webpack_require__(/*! ./user */ "./apps/maha/src/models/user.js");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Activity = new _model2.default({

  tableName: 'maha_activities',

  displayName: 'activity',

  rules: {
    user_id: ['required']
  },

  app: function app() {
    return this.belongsTo(_app2.default, 'app_id');
  },
  object_owner: function object_owner() {
    return this.belongsTo(_user2.default, 'object_owner_id');
  },
  story: function story() {
    return this.belongsTo(_story2.default, 'story_id');
  },
  user: function user() {
    return this.belongsTo(_user2.default, 'user_id');
  }
});

exports.default = Activity;

/***/ }),

/***/ "./apps/maha/src/models/app.js":
/*!*************************************!*\
  !*** ./apps/maha/src/models/app.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

var _app_author = __webpack_require__(/*! ./app_author */ "./apps/maha/src/models/app_author.js");

var _app_author2 = _interopRequireDefault(_app_author);

var _app_category = __webpack_require__(/*! ./app_category */ "./apps/maha/src/models/app_category.js");

var _app_category2 = _interopRequireDefault(_app_category);

var _role = __webpack_require__(/*! ./role */ "./apps/maha/src/models/role.js");

var _role2 = _interopRequireDefault(_role);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = new _model2.default({

  tableName: 'maha_apps',

  displayName: 'app',

  displayAttribute: 'title',

  rules: {
    title: ['required', 'unique']
  },

  author: function author() {
    return this.belongsTo(_app_author2.default, 'app_author_id');
  },
  category: function category() {
    return this.belongsTo(_app_category2.default, 'app_category_id');
  },
  roles: function roles() {
    return this.belongsToMany(_role2.default, 'maha_roles_apps', 'role_id', 'app_id');
  }
});

exports.default = App;

/***/ }),

/***/ "./apps/maha/src/models/app_author.js":
/*!********************************************!*\
  !*** ./apps/maha/src/models/app_author.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

var _app = __webpack_require__(/*! ./app */ "./apps/maha/src/models/app.js");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppAuthor = new _model2.default({

  tableName: 'maha_app_authors',

  displayName: 'app author',

  displayAttribute: 'name',

  rules: {
    name: ['required', 'unique']
  },

  apps: function apps() {
    return this.hasMany(_app2.default, 'app_author_id');
  }
});

exports.default = AppAuthor;

/***/ }),

/***/ "./apps/maha/src/models/app_category.js":
/*!**********************************************!*\
  !*** ./apps/maha/src/models/app_category.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

var _app = __webpack_require__(/*! ./app */ "./apps/maha/src/models/app.js");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppCategory = new _model2.default({

  tableName: 'maha_app_categories',

  displayName: 'app category',

  displayAttribute: 'title',

  rules: {
    title: ['required', 'unique']
  },

  apps: function apps() {
    return this.hasMany(_app2.default, 'app_category_id');
  }
});

exports.default = AppCategory;

/***/ }),

/***/ "./apps/maha/src/models/asset.js":
/*!***************************************!*\
  !*** ./apps/maha/src/models/asset.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

var _asset_status = __webpack_require__(/*! ./asset_status */ "./apps/maha/src/models/asset_status.js");

var _asset_status2 = _interopRequireDefault(_asset_status);

var _user = __webpack_require__(/*! ./user */ "./apps/maha/src/models/user.js");

var _user2 = _interopRequireDefault(_user);

var _source = __webpack_require__(/*! ./source */ "./apps/maha/src/models/source.js");

var _source2 = _interopRequireDefault(_source);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Assets = new _model2.default({

  tableName: 'maha_assets',

  displayName: 'asset',

  displayAttribute: 'file_name',

  virtuals: {

    extension: function extension() {
      return this.get('file_name').split('.').pop();
    },

    identifier: function identifier() {
      return this.get('file_size') + '-' + this.get('original_file_name').replace(/[^0-9a-zA-Z_-]/img, '');
    },

    is_image: function is_image() {
      return this.get('content_type').match(/image/) !== null;
    },

    has_preview: function has_preview() {
      var is_pdf = this.get('content_type').match(/pdf/) !== null;
      var is_doc = this.get('content_type').match(/msword/) !== null;
      var is_xls = this.get('content_type').match(/excel/) !== null;
      var is_openoffice = this.get('content_type').match(/officedocument/) !== null;
      var is_email = this.get('content_type').match(/rfc822/) !== null;
      var is_html = this.get('content_type').match(/html/) !== null;
      return is_pdf || is_doc || is_xls || is_email || is_openoffice || is_html;
    },

    path: function path() {
      return !this.isNew() ? '/assets/' + this.get('id') + '/' + this.get('file_name') : null;
    },

    url: function url() {
      var host = Object({"APPS":["maha","maha-chat","maha-competencies","maha-crm","maha-drive","maha-eatfresh","maha-expenses","maha-platform","maha-team"],"DATABASE_URL":"postgres://postgres@localhost:5432/maha","REDIS_URL":"redis://localhost:6379/14","SECRET":"fsad8fsad78fdshbfwbhse78yfw","SERVER_PORT":8080,"SOCKET_PORT":8090,"DOMAIN":"mahaplatform.com","EMAIL_REDIRECT":"greg@thinktopography.com","EMAIL_DELIVERY":"ses","ASSET_SOTRAGE":"s3","MICROSOFT_APP_ID":"c54c9b91-e766-4829-a530-34107843fe8d","MICROSOFT_APP_SECRET":"arYWE56%=:aehenRXUT372~","BOX_CLIENT_ID":"t36h58btxlcqtudbz30raq1bduibhndz","BOX_CLIENT_SECRET":"oJ4248556NlnViGrGzH0BrbY47r0ipkQ","DROPBOX_APP_KEY":"0c3b36vlsedljil","DROPBOX_APP_SECRET":"r5rcjmd22w0wq31","INSTAGRAM_CLIENT_ID":"0c3b36vlsedljil","INSTAGRAM_CLIENT_SECRET":"r5rcjmd22w0wq31","FACEBOOK_APP_ID":"712a7bfd4801443bafcca253e2fa05ef","FACEBOOK_APP_SECRET":"6ab01fce44a0467883e0af02f5486ff0","GOOGLE_CLIENT_ID":"457997349543-6vamfr7lcdli3g7ups2bubcvg4bnr0ie.apps.googleusercontent.com","GOOGLE_CLIENT_SECRET":"XOOoTscB04Zjqc04JvAS6mOL","ROLLBAR_CLIENT_TOKEN":"ad5c799fec6b4321bbefce7a39b72093","ROLLBAR_SERVER_TOKEN":"0b6e5aa764a948199bafa00407927b38","FCM_API_KEY":"AAAAaqLE8qc:APA91bGKmtxSVdBuOKbsSd_pSPpvyqA6hIkk9SbwpXje5GK-WOKCu0rSfpK7WS7XOncMHyTr3UyvVoKmFM5h5YG8RmC9hLDvwutyqJ2NUMOZPpG-8_Kxi26X3uO0cZiYj6LngyzjadhM","VAPID_PUBLIC_KEY":"BJ4QYD8rLzBxqWjz7bu-LNHgXKySMsIpOMcXc7Weq5rgPHsTtPIt303hhViecF-CUUGuh2WDIWLN_xPorx5EZvM","VAPID_PRIVATE_KEY":"ZNLVfNVxz4_zdurh-cueGqVtYgVIlKb3C7FW8H0NHCc","AWS_ACCESS_KEY_ID":"AKIAJGQBN7DJGZQOJS5A","AWS_SCRET_ACCESS_KEY":"4/9V6b39996bSZquf1YdBHbBRAMUZElkezDA4zd9","AWS_REGION":"us-east-1","AWS_BUCKET":"dev.cdn.mahaplatform.com","WEB_HOST":"http://localhost:8080","WEB_ASSET_HOST":"","DATA_ASSET_HOST":"http://dev.cdn.mahaplatform.com","WEB_ASSET_CDN_HOST":"","DATA_ASSET_CDNHOST":""}).DATA_ASSET_CDN_HOST || "http://dev.cdn.mahaplatform.com" || '';
      return !this.isNew() ? '' + host + this.get('path') : null;
    }

  },

  source: function source() {
    return this.belongsTo(_source2.default, 'source_id');
  },
  status: function status() {
    return this.belongsTo(_asset_status2.default, 'status_id');
  },
  user: function user() {
    return this.belongsTo(_user2.default, 'user_id');
  }
});

exports.default = Assets;

/***/ }),

/***/ "./apps/maha/src/models/asset_status.js":
/*!**********************************************!*\
  !*** ./apps/maha/src/models/asset_status.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AssetStatus = new _model2.default({

  tableName: 'maha_asset_statuses',

  displayName: 'status',

  displayAttribute: ''

});

exports.default = AssetStatus;

/***/ }),

/***/ "./apps/maha/src/models/attachment.js":
/*!********************************************!*\
  !*** ./apps/maha/src/models/attachment.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

var _asset = __webpack_require__(/*! ./asset */ "./apps/maha/src/models/asset.js");

var _asset2 = _interopRequireDefault(_asset);

var _service = __webpack_require__(/*! ./service */ "./apps/maha/src/models/service.js");

var _service2 = _interopRequireDefault(_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Attachment = new _model2.default({

  tableName: 'maha_attachments',

  displayName: 'attachment',

  displayAttribute: '',

  asset: function asset() {
    return this.belongsTo(_asset2.default, 'asset_id');
  },
  service: function service() {
    return this.belongsTo(_service2.default, 'service_id');
  }
});

exports.default = Attachment;

/***/ }),

/***/ "./apps/maha/src/models/audit.js":
/*!***************************************!*\
  !*** ./apps/maha/src/models/audit.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

var _story = __webpack_require__(/*! ./story */ "./apps/maha/src/models/story.js");

var _story2 = _interopRequireDefault(_story);

var _user = __webpack_require__(/*! ./user */ "./apps/maha/src/models/user.js");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Audit = new _model2.default({

  tableName: 'maha_audits',

  displayName: 'audit',

  displayAttribute: '',

  story: function story() {
    return this.belongsTo(_story2.default, 'story_id');
  },

  user: function user() {
    return this.belongsTo(_user2.default, 'user_id');
  }

});

exports.default = Audit;

/***/ }),

/***/ "./apps/maha/src/models/comment.js":
/*!*****************************************!*\
  !*** ./apps/maha/src/models/comment.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _attachment = __webpack_require__(/*! ./attachment */ "./apps/maha/src/models/attachment.js");

var _attachment2 = _interopRequireDefault(_attachment);

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

var _user = __webpack_require__(/*! ./user */ "./apps/maha/src/models/user.js");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Comment = new _model2.default({

  tableName: 'maha_comments',

  displayName: 'comment',

  displayAttribute: '',

  rules: {
    text: 'required'
  },

  attachments: function attachments() {
    return this.morphMany(_attachment2.default, 'attachable');
  },
  user: function user() {
    return this.belongsTo(_user2.default, 'user_id');
  }
});

exports.default = Comment;

/***/ }),

/***/ "./apps/maha/src/models/device.js":
/*!****************************************!*\
  !*** ./apps/maha/src/models/device.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _device_value = __webpack_require__(/*! ./device_value */ "./apps/maha/src/models/device_value.js");

var _device_value2 = _interopRequireDefault(_device_value);

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

var _user = __webpack_require__(/*! ./user */ "./apps/maha/src/models/user.js");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Device = new _model2.default({

  tableName: 'maha_devices',

  displayName: 'devices',

  displayAttribute: '',

  belongsToTeam: false,

  virtuals: {

    is_push_enabled: function is_push_enabled() {
      return this.get('push_auth') !== null;
    }

  },

  device_type: function device_type() {
    return this.belongsTo(_device_value2.default, 'device_type_id');
  },
  browser_name: function browser_name() {
    return this.belongsTo(_device_value2.default, 'browser_name_id');
  },
  browser_version: function browser_version() {
    return this.belongsTo(_device_value2.default, 'browser_version_id');
  },
  os_name: function os_name() {
    return this.belongsTo(_device_value2.default, 'os_name_id');
  },
  os_version: function os_version() {
    return this.belongsTo(_device_value2.default, 'os_version_id');
  },
  user: function user() {
    return this.belongsTo(_user2.default, 'user_id');
  }
});

exports.default = Device;

/***/ }),

/***/ "./apps/maha/src/models/device_value.js":
/*!**********************************************!*\
  !*** ./apps/maha/src/models/device_value.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DeviceValue = new _model2.default({

  tableName: 'maha_device_values',

  displayName: 'device_values',

  displayAttribute: '',

  belongsToTeam: false,

  hasTimestamps: false

});

exports.default = DeviceValue;

/***/ }),

/***/ "./apps/maha/src/models/domain.js":
/*!****************************************!*\
  !*** ./apps/maha/src/models/domain.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Domain = new _model2.default({

  tableName: 'maha_domains',

  displayName: 'domain',

  displayAttribute: 'title',

  rules: {
    title: 'required'
  }

});

exports.default = Domain;

/***/ }),

/***/ "./apps/maha/src/models/email.js":
/*!***************************************!*\
  !*** ./apps/maha/src/models/email.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

var _email_activity = __webpack_require__(/*! ./email_activity */ "./apps/maha/src/models/email_activity.js");

var _email_activity2 = _interopRequireDefault(_email_activity);

var _user = __webpack_require__(/*! ./user */ "./apps/maha/src/models/user.js");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Email = new _model2.default({

  tableName: 'maha_emails',

  displayName: 'email',

  displayAttribute: 'subject',

  activities: function activities() {
    return this.hasMany(_email_activity2.default, 'email_id');
  },
  user: function user() {
    return this.belongsTo(_user2.default, 'user_id');
  }
});

exports.default = Email;

/***/ }),

/***/ "./apps/maha/src/models/email_activity.js":
/*!************************************************!*\
  !*** ./apps/maha/src/models/email_activity.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

var _email_link = __webpack_require__(/*! ./email_link */ "./apps/maha/src/models/email_link.js");

var _email_link2 = _interopRequireDefault(_email_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EmailActivity = new _model2.default({

  tableName: 'maha_email_activities',

  displayName: 'email activity',

  link: function link() {
    return this.belongsTo(_email_link2.default, 'email_link_id');
  }
});

exports.default = EmailActivity;

/***/ }),

/***/ "./apps/maha/src/models/email_link.js":
/*!********************************************!*\
  !*** ./apps/maha/src/models/email_link.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EmailLink = new _model2.default({

  tableName: 'maha_email_links',

  displayName: 'maha_email_links',

  displayAttribute: 'text'

});

exports.default = EmailLink;

/***/ }),

/***/ "./apps/maha/src/models/email_template.js":
/*!************************************************!*\
  !*** ./apps/maha/src/models/email_template.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EmailTemplate = new _model2.default({

  tableName: 'maha_email_templates',

  displayName: 'email template',

  displayAttribute: 'name'

});

exports.default = EmailTemplate;

/***/ }),

/***/ "./apps/maha/src/models/group.js":
/*!***************************************!*\
  !*** ./apps/maha/src/models/group.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

var _user = __webpack_require__(/*! ./user */ "./apps/maha/src/models/user.js");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Group = new _model2.default({

  tableName: 'maha_groups',

  displayName: 'group',

  displayAttribute: 'title',

  rules: {
    title: ['required', 'unique']
  },

  users: function users() {
    return this.belongsToMany(_user2.default, 'maha_users_groups', 'group_id', 'user_id');
  }
});

exports.default = Group;

/***/ }),

/***/ "./apps/maha/src/models/import.js":
/*!****************************************!*\
  !*** ./apps/maha/src/models/import.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

var _asset = __webpack_require__(/*! ./asset */ "./apps/maha/src/models/asset.js");

var _asset2 = _interopRequireDefault(_asset);

var _import_item = __webpack_require__(/*! ./import_item */ "./apps/maha/src/models/import_item.js");

var _import_item2 = _interopRequireDefault(_import_item);

var _user = __webpack_require__(/*! ./user */ "./apps/maha/src/models/user.js");

var _user2 = _interopRequireDefault(_user);

var _moment = __webpack_require__(/*! moment */ "moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Import = new _model2.default({

  tableName: 'maha_imports',

  displayName: 'import',

  displayAttribute: 'description',

  rules: {
    asset_id: ['required']
  },

  virtuals: {

    description: function description() {
      if (this.get('name')) return this.get('name');
      if (this.get('asset_id')) return this.related('asset').get('original_file_name');
      return 'Import on ' + (0, _moment2.default)(this.get('created_at')).format('MM/DD/YYYY');
    }

  },

  asset: function asset() {
    return this.belongsTo(_asset2.default, 'asset_id');
  },
  items: function items() {
    return this.hasMany(_import_item2.default, 'import_id');
  },
  user: function user() {
    return this.belongsTo(_user2.default, 'user_id');
  }
});

exports.default = Import;

/***/ }),

/***/ "./apps/maha/src/models/import_item.js":
/*!*********************************************!*\
  !*** ./apps/maha/src/models/import_item.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

var _import2 = __webpack_require__(/*! ./import */ "./apps/maha/src/models/import.js");

var _import3 = _interopRequireDefault(_import2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImportItem = new _model2.default({

  tableName: 'maha_import_items',

  displayName: 'import_item',

  displayAttribute: '',

  rules: {},

  virtuals: {},

  belongsToTeam: false,

  hasTimestamps: false,

  import: function _import() {
    return this.belongsTo(_import3.default, 'import_id');
  }
});

exports.default = ImportItem;

/***/ }),

/***/ "./apps/maha/src/models/installation.js":
/*!**********************************************!*\
  !*** ./apps/maha/src/models/installation.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

var _app = __webpack_require__(/*! ./app */ "./apps/maha/src/models/app.js");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Installation = new _model2.default({

  tableName: 'maha_installations',

  displayName: 'app',

  displayAttribute: 'title',

  rules: {
    app_id: 'required'
  },

  virtuals: {
    title: function title() {
      return this.related('app').get('title');
    }
  },

  app: function app() {
    return this.belongsTo(_app2.default, 'app_id');
  }
});

exports.default = Installation;

/***/ }),

/***/ "./apps/maha/src/models/like.js":
/*!**************************************!*\
  !*** ./apps/maha/src/models/like.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

var _user = __webpack_require__(/*! ./user */ "./apps/maha/src/models/user.js");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Like = new _model2.default({

  tableName: 'maha_likes',

  displayName: 'like',

  displayAttribute: '',

  rules: {},

  virtuals: {},

  user: function user() {
    return this.belongsTo(_user2.default, 'user_id');
  }
});

exports.default = Like;

/***/ }),

/***/ "./apps/maha/src/models/listening.js":
/*!*******************************************!*\
  !*** ./apps/maha/src/models/listening.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

var _user = __webpack_require__(/*! ./user */ "./apps/maha/src/models/user.js");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Listening = new _model2.default({

  tableName: 'maha_listenings',

  displayName: 'listener',

  displayAttribute: '',

  rules: {
    listenable_type: 'required',
    listenable_id: 'required',
    user_id: 'required'
  },

  user: function user() {
    return this.belongsTo(_user2.default, 'user_id');
  }
});

exports.default = Listening;

/***/ }),

/***/ "./apps/maha/src/models/notification_method.js":
/*!*****************************************************!*\
  !*** ./apps/maha/src/models/notification_method.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

var _user = __webpack_require__(/*! ./user */ "./apps/maha/src/models/user.js");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotificationMethod = new _model2.default({

  tableName: 'maha_notification_methods',

  displayName: 'notification_method',

  displayAttribute: 'title',

  users: function users() {
    return this.belongsToMany(_user2.default, 'notification_method_id');
  }
});

exports.default = NotificationMethod;

/***/ }),

/***/ "./apps/maha/src/models/profile.js":
/*!*****************************************!*\
  !*** ./apps/maha/src/models/profile.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

var _source = __webpack_require__(/*! ./source */ "./apps/maha/src/models/source.js");

var _source2 = _interopRequireDefault(_source);

var _user = __webpack_require__(/*! ./user */ "./apps/maha/src/models/user.js");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Profile = new _model2.default({

  tableName: 'maha_profiles',

  displayName: 'profile',

  displayAttribute: 'type',

  rules: {},

  user: function user() {
    return this.belongsTo(_user2.default, 'user_id');
  },
  source: function source() {
    return this.belongsTo(_source2.default, 'source_id');
  }
});

exports.default = Profile;

/***/ }),

/***/ "./apps/maha/src/models/review.js":
/*!****************************************!*\
  !*** ./apps/maha/src/models/review.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _attachment = __webpack_require__(/*! ./attachment */ "./apps/maha/src/models/attachment.js");

var _attachment2 = _interopRequireDefault(_attachment);

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

var _user = __webpack_require__(/*! ./user */ "./apps/maha/src/models/user.js");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Review = new _model2.default({

  tableName: 'maha_reviews',

  displayName: 'review',

  displayAttribute: '',

  rules: {
    score: ['required', 'greaterThanEqualTo:0', 'lessThanEqualTo:5'],
    text: 'required'
  },

  virtuals: {},

  attachments: function attachments() {
    return this.morphMany(_attachment2.default, 'attachable');
  },
  user: function user() {
    return this.belongsTo(_user2.default, 'user_id');
  }
});

exports.default = Review;

/***/ }),

/***/ "./apps/maha/src/models/right.js":
/*!***************************************!*\
  !*** ./apps/maha/src/models/right.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

var _app = __webpack_require__(/*! ./app */ "./apps/maha/src/models/app.js");

var _app2 = _interopRequireDefault(_app);

var _role = __webpack_require__(/*! ./role */ "./apps/maha/src/models/role.js");

var _role2 = _interopRequireDefault(_role);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Right = new _model2.default({

  tableName: 'maha_rights',

  displayName: 'right',

  displayAttribute: 'text',

  withRelated: 'app',

  rules: {
    text: 'required',
    app_id: 'required'
  },

  virtuals: {

    code: function code() {
      return this.related('app').get('title').toLowerCase() + ':' + this.get('text').toLowerCase().replace(/\s/, '_');
    }

  },

  app: function app() {
    return this.belongsTo(_app2.default, 'app_id');
  },
  roles: function roles() {
    return this.belongsToMany(_role2.default, 'maha_users_roles', 'user_id', 'role_id');
  }
});

exports.default = Right;

/***/ }),

/***/ "./apps/maha/src/models/role.js":
/*!**************************************!*\
  !*** ./apps/maha/src/models/role.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

var _app = __webpack_require__(/*! ./app */ "./apps/maha/src/models/app.js");

var _app2 = _interopRequireDefault(_app);

var _right = __webpack_require__(/*! ./right */ "./apps/maha/src/models/right.js");

var _right2 = _interopRequireDefault(_right);

var _user = __webpack_require__(/*! ./user */ "./apps/maha/src/models/user.js");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Role = new _model2.default({

  tableName: 'maha_roles',

  displayName: 'role',

  displayAttribute: 'title',

  rules: {
    title: ['required', 'unique'],
    description: 'required'
  },

  apps: function apps() {
    return this.belongsToMany(_app2.default, 'maha_roles_apps', 'role_id', 'app_id');
  },
  rights: function rights() {
    return this.belongsToMany(_right2.default, 'maha_roles_rights', 'role_id', 'right_id');
  },
  users: function users() {
    return this.belongsToMany(_user2.default, 'maha_users_roles', 'role_id', 'user_id');
  }
});

exports.default = Role;

/***/ }),

/***/ "./apps/maha/src/models/security_question.js":
/*!***************************************************!*\
  !*** ./apps/maha/src/models/security_question.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SecurityQuestion = new _model2.default({

  tableName: 'maha_security_questions',

  displayName: 'security question',

  displayAttribute: 'text',

  rules: {
    text: ['required']
  }

});

exports.default = SecurityQuestion;

/***/ }),

/***/ "./apps/maha/src/models/service.js":
/*!*****************************************!*\
  !*** ./apps/maha/src/models/service.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

var _attachment = __webpack_require__(/*! ./attachment */ "./apps/maha/src/models/attachment.js");

var _attachment2 = _interopRequireDefault(_attachment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Service = new _model2.default({

  tableName: 'maha_services',

  displayName: 'attachment',

  displayAttribute: '',

  belongsToTeam: false,

  hasTimestamps: false,

  attachments: function attachments() {
    return this.hasMany(_attachment2.default, 'service_id');
  }
});

exports.default = Service;

/***/ }),

/***/ "./apps/maha/src/models/session.js":
/*!*****************************************!*\
  !*** ./apps/maha/src/models/session.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

var _device = __webpack_require__(/*! ./device */ "./apps/maha/src/models/device.js");

var _device2 = _interopRequireDefault(_device);

var _user = __webpack_require__(/*! ./user */ "./apps/maha/src/models/user.js");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Session = new _model2.default({

  tableName: 'maha_sessions',

  displayName: 'sessions',

  displayAttribute: '',

  device: function device() {
    return this.belongsTo(_device2.default, 'device_id');
  },
  user: function user() {
    return this.belongsTo(_user2.default, 'user_id');
  }
});

exports.default = Session;

/***/ }),

/***/ "./apps/maha/src/models/source.js":
/*!****************************************!*\
  !*** ./apps/maha/src/models/source.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

var _asset = __webpack_require__(/*! ./asset */ "./apps/maha/src/models/asset.js");

var _asset2 = _interopRequireDefault(_asset);

var _profile = __webpack_require__(/*! ./profile */ "./apps/maha/src/models/profile.js");

var _profile2 = _interopRequireDefault(_profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Source = new _model2.default({

  tableName: 'maha_sources',

  displayName: 'source',

  displayAttribute: 'source',

  rules: {},

  assets: function assets() {
    return this.hasMany(_asset2.default, 'asset_id');
  },
  profiles: function profiles() {
    return this.hasMany(_profile2.default, 'source_id');
  }
});

exports.default = Source;

/***/ }),

/***/ "./apps/maha/src/models/star.js":
/*!**************************************!*\
  !*** ./apps/maha/src/models/star.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

var _user = __webpack_require__(/*! ./user */ "./apps/maha/src/models/user.js");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Star = new _model2.default({

  tableName: 'maha_stars',

  displayName: 'star',

  displayAttribute: '',

  rules: {},

  virtuals: {},

  user: function user() {
    return this.belongsTo(_user2.default, 'user_id');
  }
});

exports.default = Star;

/***/ }),

/***/ "./apps/maha/src/models/story.js":
/*!***************************************!*\
  !*** ./apps/maha/src/models/story.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Story = new _model2.default({

  tableName: 'maha_stories',

  displayName: 'story',

  displayAttribute: 'text',

  hasTimestamps: [],

  belongsToTeam: false,

  rules: {
    text: 'required'
  }

});

exports.default = Story;

/***/ }),

/***/ "./apps/maha/src/models/strategy.js":
/*!******************************************!*\
  !*** ./apps/maha/src/models/strategy.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Strategy = new _model2.default({

  tableName: 'maha_strategies',

  displayName: 'strategy',

  displayAttribute: 'name',

  rules: {
    name: 'required'
  }

});

exports.default = Strategy;

/***/ }),

/***/ "./apps/maha/src/models/supervision.js":
/*!*********************************************!*\
  !*** ./apps/maha/src/models/supervision.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

var _user = __webpack_require__(/*! ./user */ "./apps/maha/src/models/user.js");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Supervision = new _model2.default({

  tableName: 'maha_supervisions',

  displayName: 'supervision',

  supervisor: function supervisor() {
    return this.belongsTo(_user2.default, 'supervisor_id');
  },
  employee: function employee() {
    return this.belongsTo(_user2.default, 'employee_id');
  }
});

exports.default = Supervision;

/***/ }),

/***/ "./apps/maha/src/models/supervisor.js":
/*!********************************************!*\
  !*** ./apps/maha/src/models/supervisor.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

var _user = __webpack_require__(/*! ./user */ "./apps/maha/src/models/user.js");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Supervisor = new _model2.default({

  tableName: 'maha_supervisors',

  displayName: 'supervisor',

  displayAttribute: 'full_name',

  rules: {
    user_id: 'required'
  },

  user: function user() {
    return this.belongsTo(_user2.default, 'user_id');
  }
});

exports.default = Supervisor;

/***/ }),

/***/ "./apps/maha/src/models/team.js":
/*!**************************************!*\
  !*** ./apps/maha/src/models/team.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

var _asset = __webpack_require__(/*! ./asset */ "./apps/maha/src/models/asset.js");

var _asset2 = _interopRequireDefault(_asset);

var _domain = __webpack_require__(/*! ./domain */ "./apps/maha/src/models/domain.js");

var _domain2 = _interopRequireDefault(_domain);

var _strategy = __webpack_require__(/*! ./strategy */ "./apps/maha/src/models/strategy.js");

var _strategy2 = _interopRequireDefault(_strategy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Team = new _model2.default({

  tableName: 'maha_teams',

  displayName: 'team',

  displayAttribute: 'title',

  belongsToTeam: false,

  withRelated: ['logo', 'strategies'],

  rules: {
    title: ['required', 'unique'],
    subdomain: ['required', 'unique']
  },

  domains: function domains() {
    return this.hasMany(_domain2.default, 'team_id');
  },
  logo: function logo() {
    return this.belongsTo(_asset2.default, 'logo_id');
  },
  strategies: function strategies() {
    return this.hasMany(_strategy2.default, 'team_id');
  }
});

exports.default = Team;

/***/ }),

/***/ "./apps/maha/src/models/user.js":
/*!**************************************!*\
  !*** ./apps/maha/src/models/user.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = __webpack_require__(/*! ../core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

var _bcryptNodejs = __webpack_require__(/*! bcrypt-nodejs */ "bcrypt-nodejs");

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _asset = __webpack_require__(/*! ./asset */ "./apps/maha/src/models/asset.js");

var _asset2 = _interopRequireDefault(_asset);

var _group = __webpack_require__(/*! ./group */ "./apps/maha/src/models/group.js");

var _group2 = _interopRequireDefault(_group);

var _role = __webpack_require__(/*! ./role */ "./apps/maha/src/models/role.js");

var _role2 = _interopRequireDefault(_role);

var _notification_method = __webpack_require__(/*! ./notification_method */ "./apps/maha/src/models/notification_method.js");

var _notification_method2 = _interopRequireDefault(_notification_method);

var _security_question = __webpack_require__(/*! ./security_question */ "./apps/maha/src/models/security_question.js");

var _security_question2 = _interopRequireDefault(_security_question);

var _supervision = __webpack_require__(/*! ./supervision */ "./apps/maha/src/models/supervision.js");

var _supervision2 = _interopRequireDefault(_supervision);

var _team = __webpack_require__(/*! ./team */ "./apps/maha/src/models/team.js");

var _team2 = _interopRequireDefault(_team);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = new _model2.default({

  tableName: 'maha_users',

  displayName: 'user',

  displayAttribute: 'full_name',

  withRelated: 'photo',

  rules: {
    first_name: 'required',
    last_name: 'required',
    email: ['required', 'email', 'unique']
  },

  virtuals: {

    full_name: function full_name() {
      return this.get('first_name') + ' ' + this.get('last_name');
    },

    f_last: function f_last() {
      return this.get('first_initial') + this.get('last_name').toLowerCase();
    },

    first_initial: function first_initial() {
      return this.get('first_name') ? this.get('first_name')[0].toLowerCase() : '';
    },

    last_initial: function last_initial() {
      return this.get('last_name') ? this.get('last_name')[0].toLowerCase() : '';
    },

    initials: function initials() {
      return this.get('first_initial') + this.get('last_initial');
    },

    rfc822: function rfc822() {
      return this.get('full_name') + ' <' + this.get('email') + '>';
    },

    group_ids: function group_ids() {
      return this.related('groups').map(function (group) {
        return group.id;
      });
    },

    role_ids: function role_ids() {
      return this.related('roles').map(function (role) {
        return role.id;
      });
    },

    supervisor_ids: function supervisor_ids() {
      return this.related('supervisors').map(function (supervisor) {
        return supervisor.id;
      });
    },

    password: {
      get: function get() {},
      set: function set(value) {
        var password_salt = _bcryptNodejs2.default.genSaltSync(10);
        this.set('password_salt', password_salt);
        this.set('password_hash', _bcryptNodejs2.default.hashSync(value, password_salt));
      }
    }

  },

  notification_method: function notification_method() {
    return this.belongsTo(_notification_method2.default, 'notification_method_id');
  },
  photo: function photo() {
    return this.belongsTo(_asset2.default, 'photo_id');
  },
  security_question: function security_question() {
    return this.belongsTo(_security_question2.default, 'security_question_id');
  },
  groups: function groups() {
    return this.belongsToMany(_group2.default, 'maha_users_groups', 'user_id', 'group_id');
  },
  roles: function roles() {
    return this.belongsToMany(_role2.default, 'maha_users_roles', 'user_id', 'role_id');
  },


  supervisors: function supervisors() {
    return this.hasMany(User).through(_supervision2.default, 'id', 'employee_id', 'supervisor_id');
  },

  team: function team() {
    return this.belongsTo(_team2.default, 'team_id');
  },
  authenticate: function authenticate(password) {
    return this.get('password_hash') === _bcryptNodejs2.default.hashSync(password, this.get('password_salt'));
  }
});

exports.default = User;

/***/ }),

/***/ "./apps/maha/src/queues sync recursive":
/*!***********************************!*\
  !*** ./apps/maha/src/queues sync ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "./apps/maha/src/queues sync recursive";

/***/ }),

/***/ "./apps/maha/src/queues/assemble_asset_queue.js":
/*!******************************************************!*\
  !*** ./apps/maha/src/queues/assemble_asset_queue.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "./node_modules/babel-runtime/helpers/asyncToGenerator.js");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _asset = __webpack_require__(/*! ../services/asset */ "./apps/maha/src/services/asset.js");

var _queue = __webpack_require__(/*! ../core/objects/queue */ "./apps/maha/src/core/objects/queue.js");

var _queue2 = _interopRequireDefault(_queue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var enqueue = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, asset_id) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', { asset_id: asset_id });

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function enqueue(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var processor = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(job, trx) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _asset.assembleAsset)(job.data.asset_id, trx);

          case 2:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function processor(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var assembleAssetQueue = new _queue2.default({
  name: 'assemble_asset',
  enqueue: enqueue,
  processor: processor
});

exports.default = assembleAssetQueue;

/***/ }),

/***/ "./apps/maha/src/queues/mailer_queue.js":
/*!**********************************************!*\
  !*** ./apps/maha/src/queues/mailer_queue.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = __webpack_require__(/*! bluebird */ "bluebird");

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = __webpack_require__(/*! babel-runtime/helpers/defineProperty */ "./node_modules/babel-runtime/helpers/defineProperty.js");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = __webpack_require__(/*! babel-runtime/helpers/extends */ "./node_modules/babel-runtime/helpers/extends.js");

var _extends4 = _interopRequireDefault(_extends3);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "./node_modules/babel-runtime/helpers/asyncToGenerator.js");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _collect_objects = __webpack_require__(/*! ../core/utils/collect_objects */ "./apps/maha/src/core/utils/collect_objects.js");

var _collect_objects2 = _interopRequireDefault(_collect_objects);

var _send_mail = __webpack_require__(/*! ../core/utils/send_mail */ "./apps/maha/src/core/utils/send_mail.js");

var _send_mail2 = _interopRequireDefault(_send_mail);

var _email_link = __webpack_require__(/*! ../models/email_link */ "./apps/maha/src/models/email_link.js");

var _email_link2 = _interopRequireDefault(_email_link);

var _queue = __webpack_require__(/*! ../core/objects/queue */ "./apps/maha/src/core/objects/queue.js");

var _queue2 = _interopRequireDefault(_queue);

var _email = __webpack_require__(/*! ../models/email */ "./apps/maha/src/models/email.js");

var _email2 = _interopRequireDefault(_email);

var _pluralize = __webpack_require__(/*! pluralize */ "pluralize");

var _pluralize2 = _interopRequireDefault(_pluralize);

var _numeral = __webpack_require__(/*! numeral */ "numeral");

var _numeral2 = _interopRequireDefault(_numeral);

var _cheerio = __webpack_require__(/*! cheerio */ "cheerio");

var _cheerio2 = _interopRequireDefault(_cheerio);

var _moment = __webpack_require__(/*! moment */ "moment");

var _moment2 = _interopRequireDefault(_moment);

var _path = __webpack_require__(/*! path */ "path");

var _path2 = _interopRequireDefault(_path);

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _ejs = __webpack_require__(/*! ejs */ "ejs");

var _ejs2 = _interopRequireDefault(_ejs);

var _fs = __webpack_require__(/*! fs */ "fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var enqueue = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var templates, template, team, innerContent, envelopeTemplate, html, data, email, email_id;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            templates = (0, _collect_objects2.default)('emails/*').reduce(function (emails, email) {

              var config = __webpack_require__("./apps/maha/src/queues sync recursive")(email.filepath).default;

              var templatePath = _path2.default.dirname(email.filepath);

              return (0, _extends4.default)({}, emails, (0, _defineProperty3.default)({}, config.code, {
                subject: config.subject,
                envelope: config.envelope,
                html: _fs2.default.readFileSync(_path2.default.join(templatePath, 'html.ejs')).toString()
              }));
            }, {});
            template = templates[options.template];

            if (!req.team) {
              _context.next = 5;
              break;
            }

            _context.next = 5;
            return req.team.load('logo', { transacting: trx });

          case 5:
            team = req.team ? req.team.toJSON() : null;


            options.data = (0, _extends4.default)({
              moment: _moment2.default,
              numeral: _numeral2.default,
              pluralize: _pluralize2.default,
              team: team
            }, options.data);

            innerContent = _ejs2.default.render(template.html, options.data);
            envelopeTemplate = _fs2.default.readFileSync(_path2.default.resolve(__dirname, '..', 'core', 'templates', 'envelope.ejs')).toString();
            html = template.envelope !== null ? _ejs2.default.render(envelopeTemplate, (0, _extends4.default)({}, options.data, { content: innerContent })) : innerContent;
            data = {
              team_id: options.team_id,
              user_id: options.user ? options.user.get('id') : null,
              to: options.to || options.user.get('rfc822'),
              subject: _ejs2.default.render(template.subject, options.data),
              html: html,
              code: _lodash2.default.random(100000, 999999).toString(36)
            };
            _context.next = 13;
            return _email2.default.forge(data).save(null, { transacting: trx });

          case 13:
            email = _context.sent;
            email_id = email.get('id');
            return _context.abrupt('return', { email_id: email_id });

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function enqueue(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var processor = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(job, trx) {
    var conditions, email, team, parsed, links, rendered, mapped, result;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            conditions = {
              id: job.data.email_id
            };
            _context3.next = 3;
            return _email2.default.where(conditions).fetch({ withRelated: ['team'], transacting: trx });

          case 3:
            email = _context3.sent;
            team = email.related('team');
            parsed = _cheerio2.default.load(email.get('html'));
            _context3.next = 8;
            return parsed('<img src="' + "http://localhost:8080" + '/v' + email.get('code') + '" />').appendTo('body');

          case 8:
            _context3.next = 10;
            return parsed('a').map(function (i, elem) {
              return {
                text: parsed(elem).text(),
                url: parsed(elem).attr('href')
              };
            }).get();

          case 10:
            links = _context3.sent;
            rendered = {
              from: team.get('title') + ' <mailer@mahaplatform.com>',
              to: email.get('to'),
              subject: email.get('subject'),
              html: parsed.html()
            };
            _context3.next = 14;
            return (0, _bluebird.reduce)(links, function () {
              var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(rendered, link) {
                var emailLink, newUrl;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return _findOrCreateLink(email, link, trx);

                      case 2:
                        emailLink = _context2.sent;
                        newUrl = "http://localhost:8080" + '/c' + email.get('code') + emailLink.get('code');
                        return _context2.abrupt('return', (0, _extends4.default)({}, rendered, {
                          html: rendered.html.replace(link.url, newUrl)
                        }));

                      case 5:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, undefined);
              }));

              return function (_x6, _x7) {
                return _ref3.apply(this, arguments);
              };
            }(), rendered);

          case 14:
            mapped = _context3.sent;
            _context3.next = 17;
            return (0, _send_mail2.default)(mapped);

          case 17:
            result = _context3.sent;
            _context3.next = 20;
            return email.save(result, { patch: true, transacting: trx });

          case 20:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function processor(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var _findOrCreateLink = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(email, link, trx) {
    var emailLink, data;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _email_link2.default.where(link).fetch({ transacting: trx });

          case 2:
            emailLink = _context4.sent;

            if (!emailLink) {
              _context4.next = 5;
              break;
            }

            return _context4.abrupt('return', emailLink);

          case 5:
            data = (0, _extends4.default)({
              team_id: email.get('team_id'),
              code: _lodash2.default.random(100000, 999999).toString(36)
            }, link);
            _context4.next = 8;
            return _email_link2.default.forge(data).save(null, { transacting: trx });

          case 8:
            return _context4.abrupt('return', _context4.sent);

          case 9:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function _findOrCreateLink(_x8, _x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();

var mailerQueue = new _queue2.default({
  name: 'mailer',
  enqueue: enqueue,
  processor: processor
});

exports.default = mailerQueue;
/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),

/***/ "./apps/maha/src/queues/process_asset_queue.js":
/*!*****************************************************!*\
  !*** ./apps/maha/src/queues/process_asset_queue.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "./node_modules/babel-runtime/helpers/asyncToGenerator.js");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _asset = __webpack_require__(/*! ../services/asset */ "./apps/maha/src/services/asset.js");

var _queue = __webpack_require__(/*! ../core/objects/queue */ "./apps/maha/src/core/objects/queue.js");

var _queue2 = _interopRequireDefault(_queue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var enqueue = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, asset_id) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', { asset_id: asset_id });

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function enqueue(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var processor = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(job, trx) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _asset.processAsset)(job.data.asset_id, trx);

          case 2:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function processor(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var processAssetQueue = new _queue2.default({
  name: 'process_asset',
  enqueue: enqueue,
  processor: processor
});

exports.default = processAssetQueue;

/***/ }),

/***/ "./apps/maha/src/serializers/asset_serializer.js":
/*!*******************************************************!*\
  !*** ./apps/maha/src/serializers/asset_serializer.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _serializer = __webpack_require__(/*! ../core/objects/serializer */ "./apps/maha/src/core/objects/serializer.js");

var _serializer2 = _interopRequireDefault(_serializer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assetSerializer = (0, _serializer2.default)(function (req, trx, result) {
  return {

    id: result.get('id'),

    original_file_name: result.get('original_file_name'),

    file_name: result.get('file_name'),

    content_type: result.get('content_type'),

    file_size: result.get('file_size'),

    chunks_total: result.get('chunks_total'),

    resized_url: result.get('resized_url'),

    path: result.get('path'),

    url: result.get('url'),

    source: result.related('source').get('text'),

    source_url: result.get('source_url'),

    user: user(result.related('user')),

    created_at: result.get('created_at'),

    updated_at: result.get('updated_at')

  };
});

var user = function user(_user, key) {

  if (!_user.id) return null;

  return {

    id: _user.get('id'),

    full_name: _user.get('full_name'),

    initials: _user.get('initials'),

    photo: _user.related('photo') ? _user.related('photo').get('path') : null

  };
};

exports.default = assetSerializer;

/***/ }),

/***/ "./apps/maha/src/serializers/import_serializer.js":
/*!********************************************************!*\
  !*** ./apps/maha/src/serializers/import_serializer.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _serializer = __webpack_require__(/*! ../core/objects/serializer */ "./apps/maha/src/core/objects/serializer.js");

var _serializer2 = _interopRequireDefault(_serializer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var importSerializer = (0, _serializer2.default)(function (req, trx, result) {
  return {

    id: result.get('id'),

    asset: asset(result.related('asset')),

    stage: result.get('stage'),

    delimiter: result.get('delimiter'),

    headers: result.get('headers'),

    mapping: result.get('mapping'),

    user: user(result.related('user')),

    name: result.get('name'),

    strategy: result.get('strategy'),

    object_type: result.get('object_type'),

    completed_count: result.get('completed_count'),

    valid_count: result.get('valid_count'),

    error_count: result.get('error_count'),

    omit_count: result.get('omit_count'),

    duplicate_count: result.get('duplicate_count'),

    nonunique_count: result.get('nonunique_count'),

    created_at: result.get('created_at'),

    updated_at: result.get('updated_at')

  };
});

var user = function user(_user) {

  if (!_user.id) return null;

  return {

    id: _user.get('id'),

    full_name: _user.get('full_name'),

    initials: _user.get('initials'),

    photo: _user.related('photo').get('path')

  };
};

var asset = function asset(_asset) {

  if (!_asset.id) return null;

  return {

    id: _asset.get('id'),

    content_type: _asset.get('content_type'),

    original_file_name: _asset.get('file_name'),

    file_name: _asset.get('file_name'),

    file_size: _asset.get('file_size'),

    icon: _asset.get('icon'),

    path: _asset.get('path'),

    source: _asset.related('source').get('text'),

    source_url: _asset.get('source_url')

  };
};

exports.default = importSerializer;

/***/ }),

/***/ "./apps/maha/src/server.js":
/*!*********************************!*\
  !*** ./apps/maha/src/server.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImportSerializer = exports.User = exports.Team = exports.Supervision = exports.Supervisor = exports.Story = exports.Star = exports.Source = exports.Session = exports.Role = exports.Review = exports.Right = exports.Listening = exports.Installation = exports.ImportItem = exports.Import = exports.Group = exports.EmailTemplate = exports.Email = exports.DeviceValue = exports.Comment = exports.Audit = exports.Attachment = exports.Asset = exports.AppCategory = exports.AppAuthor = exports.App = exports.Activity = exports.sendMail = exports.models = exports.appConfig = exports.collectObjects = exports.sendViaPush = exports.updateRelated = exports.createUserToken = exports.setPresence = exports.getPresence = exports.formatObjectForTransport = exports.extractAttachments = exports.createAssetFromUrl = exports.processAsset = exports.deleteAsset = exports.createAsset = exports.getAssetData = exports.processAssetQueue = exports.assembleAssetQueue = exports.mailer = exports.webpush = exports.aws = exports.socket = exports.redis = exports.knex = exports.search = exports.serializer = exports.Routes = exports.Rights = exports.Resources = exports.Queue = exports.NotificationTypes = exports.Navigation = exports.Model = exports.Migration = exports.Mailbox = exports.Fixtures = exports.email = exports.cron = exports.app = exports.Segment = exports.Responder = exports.Resource = exports.Route = exports.Plugin = exports.ListRoute = exports.BackframeError = undefined;

var _backframe = __webpack_require__(/*! backframe */ "backframe");

Object.defineProperty(exports, 'BackframeError', {
  enumerable: true,
  get: function get() {
    return _backframe.BackframeError;
  }
});
Object.defineProperty(exports, 'ListRoute', {
  enumerable: true,
  get: function get() {
    return _backframe.ListRoute;
  }
});
Object.defineProperty(exports, 'Plugin', {
  enumerable: true,
  get: function get() {
    return _backframe.Plugin;
  }
});
Object.defineProperty(exports, 'Route', {
  enumerable: true,
  get: function get() {
    return _backframe.Route;
  }
});
Object.defineProperty(exports, 'Resource', {
  enumerable: true,
  get: function get() {
    return _backframe.Resource;
  }
});
Object.defineProperty(exports, 'Responder', {
  enumerable: true,
  get: function get() {
    return _backframe.Responder;
  }
});
Object.defineProperty(exports, 'Segment', {
  enumerable: true,
  get: function get() {
    return _backframe.Segment;
  }
});

var _asset = __webpack_require__(/*! ./services/asset */ "./apps/maha/src/services/asset.js");

Object.defineProperty(exports, 'getAssetData', {
  enumerable: true,
  get: function get() {
    return _asset.getAssetData;
  }
});
Object.defineProperty(exports, 'createAsset', {
  enumerable: true,
  get: function get() {
    return _asset.createAsset;
  }
});
Object.defineProperty(exports, 'deleteAsset', {
  enumerable: true,
  get: function get() {
    return _asset.deleteAsset;
  }
});
Object.defineProperty(exports, 'processAsset', {
  enumerable: true,
  get: function get() {
    return _asset.processAsset;
  }
});
Object.defineProperty(exports, 'createAssetFromUrl', {
  enumerable: true,
  get: function get() {
    return _asset.createAssetFromUrl;
  }
});

var _attachment = __webpack_require__(/*! ./services/attachment */ "./apps/maha/src/services/attachment.js");

Object.defineProperty(exports, 'extractAttachments', {
  enumerable: true,
  get: function get() {
    return _attachment.extractAttachments;
  }
});

var _presence = __webpack_require__(/*! ./core/services/presence */ "./apps/maha/src/core/services/presence.js");

Object.defineProperty(exports, 'getPresence', {
  enumerable: true,
  get: function get() {
    return _presence.getPresence;
  }
});
Object.defineProperty(exports, 'setPresence', {
  enumerable: true,
  get: function get() {
    return _presence.setPresence;
  }
});

var _user_tokens = __webpack_require__(/*! ./core/utils/user_tokens */ "./apps/maha/src/core/utils/user_tokens.js");

Object.defineProperty(exports, 'createUserToken', {
  enumerable: true,
  get: function get() {
    return _user_tokens.createUserToken;
  }
});

var _model_helpers = __webpack_require__(/*! ./core/utils/model_helpers */ "./apps/maha/src/core/utils/model_helpers.js");

Object.defineProperty(exports, 'updateRelated', {
  enumerable: true,
  get: function get() {
    return _model_helpers.updateRelated;
  }
});

var _webpush2 = __webpack_require__(/*! ./core/services/webpush */ "./apps/maha/src/core/services/webpush.js");

Object.defineProperty(exports, 'sendViaPush', {
  enumerable: true,
  get: function get() {
    return _webpush2.sendViaPush;
  }
});

var _app2 = __webpack_require__(/*! ./core/objects/app */ "./apps/maha/src/core/objects/app.js");

var _app3 = _interopRequireDefault(_app2);

var _cron2 = __webpack_require__(/*! ./core/objects/cron */ "./apps/maha/src/core/objects/cron.js");

var _cron3 = _interopRequireDefault(_cron2);

var _email2 = __webpack_require__(/*! ./core/objects/email */ "./apps/maha/src/core/objects/email.js");

var _email3 = _interopRequireDefault(_email2);

var _fixtures = __webpack_require__(/*! ./core/objects/fixtures */ "./apps/maha/src/core/objects/fixtures.js");

var _fixtures2 = _interopRequireDefault(_fixtures);

var _mailbox = __webpack_require__(/*! ./core/objects/mailbox */ "./apps/maha/src/core/objects/mailbox.js");

var _mailbox2 = _interopRequireDefault(_mailbox);

var _migration = __webpack_require__(/*! ./core/objects/migration */ "./apps/maha/src/core/objects/migration.js");

var _migration2 = _interopRequireDefault(_migration);

var _model = __webpack_require__(/*! ./core/objects/model */ "./apps/maha/src/core/objects/model.js");

var _model2 = _interopRequireDefault(_model);

var _navigation = __webpack_require__(/*! ./core/objects/navigation */ "./apps/maha/src/core/objects/navigation.js");

var _navigation2 = _interopRequireDefault(_navigation);

var _notification_types = __webpack_require__(/*! ./core/objects/notification_types */ "./apps/maha/src/core/objects/notification_types.js");

var _notification_types2 = _interopRequireDefault(_notification_types);

var _queue = __webpack_require__(/*! ./core/objects/queue */ "./apps/maha/src/core/objects/queue.js");

var _queue2 = _interopRequireDefault(_queue);

var _resources = __webpack_require__(/*! ./core/objects/resources */ "./apps/maha/src/core/objects/resources.js");

var _resources2 = _interopRequireDefault(_resources);

var _rights = __webpack_require__(/*! ./core/objects/rights */ "./apps/maha/src/core/objects/rights.js");

var _rights2 = _interopRequireDefault(_rights);

var _routes = __webpack_require__(/*! ./core/objects/routes */ "./apps/maha/src/core/objects/routes.js");

var _routes2 = _interopRequireDefault(_routes);

var _serializer2 = __webpack_require__(/*! ./core/objects/serializer */ "./apps/maha/src/core/objects/serializer.js");

var _serializer3 = _interopRequireDefault(_serializer2);

var _search2 = __webpack_require__(/*! ./core/objects/search */ "./apps/maha/src/core/objects/search.js");

var _search3 = _interopRequireDefault(_search2);

var _knex2 = __webpack_require__(/*! ./core/services/knex */ "./apps/maha/src/core/services/knex.js");

var _knex3 = _interopRequireDefault(_knex2);

var _redis2 = __webpack_require__(/*! ./core/services/redis */ "./apps/maha/src/core/services/redis.js");

var _redis3 = _interopRequireDefault(_redis2);

var _emitter = __webpack_require__(/*! ./core/services/emitter */ "./apps/maha/src/core/services/emitter.js");

var _emitter2 = _interopRequireDefault(_emitter);

var _aws2 = __webpack_require__(/*! ./core/services/aws */ "./apps/maha/src/core/services/aws.js");

var _aws3 = _interopRequireDefault(_aws2);

var _webPush = __webpack_require__(/*! web-push */ "web-push");

var _webPush2 = _interopRequireDefault(_webPush);

var _mailer_queue = __webpack_require__(/*! ./queues/mailer_queue */ "./apps/maha/src/queues/mailer_queue.js");

var _mailer_queue2 = _interopRequireDefault(_mailer_queue);

var _assemble_asset_queue = __webpack_require__(/*! ./queues/assemble_asset_queue */ "./apps/maha/src/queues/assemble_asset_queue.js");

var _assemble_asset_queue2 = _interopRequireDefault(_assemble_asset_queue);

var _process_asset_queue = __webpack_require__(/*! ./queues/process_asset_queue */ "./apps/maha/src/queues/process_asset_queue.js");

var _process_asset_queue2 = _interopRequireDefault(_process_asset_queue);

var _format_object_for_transport = __webpack_require__(/*! ./core/utils/format_object_for_transport */ "./apps/maha/src/core/utils/format_object_for_transport.js");

var _format_object_for_transport2 = _interopRequireDefault(_format_object_for_transport);

var _collect_objects = __webpack_require__(/*! ./core/utils/collect_objects */ "./apps/maha/src/core/utils/collect_objects.js");

var _collect_objects2 = _interopRequireDefault(_collect_objects);

var _app_config = __webpack_require__(/*! ./core/utils/app_config */ "./apps/maha/src/core/utils/app_config.js");

var _app_config2 = _interopRequireDefault(_app_config);

var _model_activities = __webpack_require__(/*! ./core/utils/model_activities */ "./apps/maha/src/core/utils/model_activities.js");

var _model_activities2 = _interopRequireDefault(_model_activities);

var _send_mail = __webpack_require__(/*! ./core/utils/send_mail */ "./apps/maha/src/core/utils/send_mail.js");

var _send_mail2 = _interopRequireDefault(_send_mail);

var _activity = __webpack_require__(/*! ./models/activity */ "./apps/maha/src/models/activity.js");

var _activity2 = _interopRequireDefault(_activity);

var _app4 = __webpack_require__(/*! ./models/app */ "./apps/maha/src/models/app.js");

var _app5 = _interopRequireDefault(_app4);

var _app_author = __webpack_require__(/*! ./models/app_author */ "./apps/maha/src/models/app_author.js");

var _app_author2 = _interopRequireDefault(_app_author);

var _app_category = __webpack_require__(/*! ./models/app_category */ "./apps/maha/src/models/app_category.js");

var _app_category2 = _interopRequireDefault(_app_category);

var _asset2 = __webpack_require__(/*! ./models/asset */ "./apps/maha/src/models/asset.js");

var _asset3 = _interopRequireDefault(_asset2);

var _attachment2 = __webpack_require__(/*! ./models/attachment */ "./apps/maha/src/models/attachment.js");

var _attachment3 = _interopRequireDefault(_attachment2);

var _audit = __webpack_require__(/*! ./models/audit */ "./apps/maha/src/models/audit.js");

var _audit2 = _interopRequireDefault(_audit);

var _comment = __webpack_require__(/*! ./models/comment */ "./apps/maha/src/models/comment.js");

var _comment2 = _interopRequireDefault(_comment);

var _device_value = __webpack_require__(/*! ./models/device_value */ "./apps/maha/src/models/device_value.js");

var _device_value2 = _interopRequireDefault(_device_value);

var _email4 = __webpack_require__(/*! ./models/email */ "./apps/maha/src/models/email.js");

var _email5 = _interopRequireDefault(_email4);

var _email_template = __webpack_require__(/*! ./models/email_template */ "./apps/maha/src/models/email_template.js");

var _email_template2 = _interopRequireDefault(_email_template);

var _group = __webpack_require__(/*! ./models/group */ "./apps/maha/src/models/group.js");

var _group2 = _interopRequireDefault(_group);

var _import = __webpack_require__(/*! ./models/import */ "./apps/maha/src/models/import.js");

var _import2 = _interopRequireDefault(_import);

var _import_item = __webpack_require__(/*! ./models/import_item */ "./apps/maha/src/models/import_item.js");

var _import_item2 = _interopRequireDefault(_import_item);

var _installation = __webpack_require__(/*! ./models/installation */ "./apps/maha/src/models/installation.js");

var _installation2 = _interopRequireDefault(_installation);

var _listening = __webpack_require__(/*! ./models/listening */ "./apps/maha/src/models/listening.js");

var _listening2 = _interopRequireDefault(_listening);

var _right = __webpack_require__(/*! ./models/right */ "./apps/maha/src/models/right.js");

var _right2 = _interopRequireDefault(_right);

var _review = __webpack_require__(/*! ./models/review */ "./apps/maha/src/models/review.js");

var _review2 = _interopRequireDefault(_review);

var _role = __webpack_require__(/*! ./models/role */ "./apps/maha/src/models/role.js");

var _role2 = _interopRequireDefault(_role);

var _session = __webpack_require__(/*! ./models/session */ "./apps/maha/src/models/session.js");

var _session2 = _interopRequireDefault(_session);

var _source = __webpack_require__(/*! ./models/source */ "./apps/maha/src/models/source.js");

var _source2 = _interopRequireDefault(_source);

var _star = __webpack_require__(/*! ./models/star */ "./apps/maha/src/models/star.js");

var _star2 = _interopRequireDefault(_star);

var _story = __webpack_require__(/*! ./models/story */ "./apps/maha/src/models/story.js");

var _story2 = _interopRequireDefault(_story);

var _supervisor = __webpack_require__(/*! ./models/supervisor */ "./apps/maha/src/models/supervisor.js");

var _supervisor2 = _interopRequireDefault(_supervisor);

var _supervision = __webpack_require__(/*! ./models/supervision */ "./apps/maha/src/models/supervision.js");

var _supervision2 = _interopRequireDefault(_supervision);

var _team = __webpack_require__(/*! ./models/team */ "./apps/maha/src/models/team.js");

var _team2 = _interopRequireDefault(_team);

var _user = __webpack_require__(/*! ./models/user */ "./apps/maha/src/models/user.js");

var _user2 = _interopRequireDefault(_user);

var _import_serializer = __webpack_require__(/*! ./serializers/import_serializer */ "./apps/maha/src/serializers/import_serializer.js");

var _import_serializer2 = _interopRequireDefault(_import_serializer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.app = _app3.default;

// objects

exports.cron = _cron3.default;
exports.email = _email3.default;
exports.Fixtures = _fixtures2.default;
exports.Mailbox = _mailbox2.default;
exports.Migration = _migration2.default;
exports.Model = _model2.default;
exports.Navigation = _navigation2.default;
exports.NotificationTypes = _notification_types2.default;
exports.Queue = _queue2.default;
exports.Resources = _resources2.default;
exports.Rights = _rights2.default;
exports.Routes = _routes2.default;
exports.serializer = _serializer3.default;
exports.search = _search3.default;

// services

exports.knex = _knex3.default;
exports.redis = _redis3.default;
exports.socket = _emitter2.default;
exports.aws = _aws3.default;
exports.webpush = _webPush2.default;

// queues

exports.mailer = _mailer_queue2.default;
exports.assembleAssetQueue = _assemble_asset_queue2.default;
exports.processAssetQueue = _process_asset_queue2.default;

// services

// functions

exports.formatObjectForTransport = _format_object_for_transport2.default;
exports.collectObjects = _collect_objects2.default;
exports.appConfig = _app_config2.default;
exports.models = _model_activities2.default;
exports.sendMail = _send_mail2.default;

// models

exports.Activity = _activity2.default;
exports.App = _app5.default;
exports.AppAuthor = _app_author2.default;
exports.AppCategory = _app_category2.default;
exports.Asset = _asset3.default;
exports.Attachment = _attachment3.default;
exports.Audit = _audit2.default;
exports.Comment = _comment2.default;
exports.DeviceValue = _device_value2.default;
exports.Email = _email5.default;
exports.EmailTemplate = _email_template2.default;
exports.Group = _group2.default;
exports.Import = _import2.default;
exports.ImportItem = _import_item2.default;
exports.Installation = _installation2.default;
exports.Listening = _listening2.default;
exports.Right = _right2.default;
exports.Review = _review2.default;
exports.Role = _role2.default;
exports.Session = _session2.default;
exports.Source = _source2.default;
exports.Star = _star2.default;
exports.Story = _story2.default;
exports.Supervisor = _supervisor2.default;
exports.Supervision = _supervision2.default;
exports.Team = _team2.default;
exports.User = _user2.default;

// serializers

exports.ImportSerializer = _import_serializer2.default;

/***/ }),

/***/ "./apps/maha/src/services/asset.js":
/*!*****************************************!*\
  !*** ./apps/maha/src/services/asset.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAssetData = exports._getNormalizedFileName = exports.deleteAsset = exports.createAsset = exports.getAsset = exports.processAsset = exports.assembleAsset = exports.createAssetFromUrl = exports.uploadChunk = exports.checkUploadedFile = exports.validateRequest = undefined;

var _bluebird = __webpack_require__(/*! bluebird */ "bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

var _toConsumableArray2 = __webpack_require__(/*! babel-runtime/helpers/toConsumableArray */ "./node_modules/babel-runtime/helpers/toConsumableArray.js");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "./node_modules/babel-runtime/helpers/asyncToGenerator.js");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assemble_asset_queue = __webpack_require__(/*! ../queues/assemble_asset_queue */ "./apps/maha/src/queues/assemble_asset_queue.js");

var _assemble_asset_queue2 = _interopRequireDefault(_assemble_asset_queue);

var _asset_serializer = __webpack_require__(/*! ../serializers/asset_serializer */ "./apps/maha/src/serializers/asset_serializer.js");

var _asset_serializer2 = _interopRequireDefault(_asset_serializer);

var _process_asset_queue = __webpack_require__(/*! ../queues/process_asset_queue */ "./apps/maha/src/queues/process_asset_queue.js");

var _process_asset_queue2 = _interopRequireDefault(_process_asset_queue);

var _emitter = __webpack_require__(/*! ../core/services/emitter */ "./apps/maha/src/core/services/emitter.js");

var _emitter2 = _interopRequireDefault(_emitter);

var _backframe = __webpack_require__(/*! backframe */ "backframe");

var _aws = __webpack_require__(/*! ../core/services/aws */ "./apps/maha/src/core/services/aws.js");

var _aws2 = _interopRequireDefault(_aws);

var _source = __webpack_require__(/*! ../models/source */ "./apps/maha/src/models/source.js");

var _source2 = _interopRequireDefault(_source);

var _requestPromise = __webpack_require__(/*! request-promise */ "request-promise");

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _asset = __webpack_require__(/*! ../models/asset */ "./apps/maha/src/models/asset.js");

var _asset2 = _interopRequireDefault(_asset);

var _stream = __webpack_require__(/*! stream */ "stream");

var _webshot = __webpack_require__(/*! webshot */ "webshot");

var _webshot2 = _interopRequireDefault(_webshot);

var _mimeTypes = __webpack_require__(/*! mime-types */ "mime-types");

var _mimeTypes2 = _interopRequireDefault(_mimeTypes);

var _mkdirp = __webpack_require__(/*! mkdirp */ "mkdirp");

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _path = __webpack_require__(/*! path */ "path");

var _path2 = _interopRequireDefault(_path);

var _jimp = __webpack_require__(/*! jimp */ "jimp");

var _jimp2 = _interopRequireDefault(_jimp);

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _url = __webpack_require__(/*! url */ "url");

var _url2 = _interopRequireDefault(_url);

var _fs = __webpack_require__(/*! fs */ "fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var simpleParser = (0, _bluebird.promisify)(__webpack_require__(/*! mailparser */ "mailparser").simpleParser);

var execAsync = (0, _bluebird.promisify)(__webpack_require__(/*! child_process */ "child_process").exec);

var validateRequest = exports.validateRequest = function validateRequest(params, files, requireFile) {

  var maxChunkSize = 1024 * 128;

  var maxFileSize = 1024 * 1024 * 20;

  var chunkNumber = params.resumableChunkNumber;

  var chunkSize = params.resumableChunkSize;

  var totalSize = params.resumableTotalSize;

  var identifier = params.resumableIdentifier;

  var filename = params.resumableFilename;

  var totalChunks = params.resumableTotalChunks;

  if (!chunkNumber || !chunkSize || !totalSize || !identifier || !filename || !totalChunks) {
    throw new _backframe.BackframeError({
      code: 500,
      message: 'non_resumable_request'
    });
  }

  if (parseInt(chunkNumber) > parseInt(totalChunks)) {
    throw new _backframe.BackframeError({
      code: 500,
      message: 'invalid_resumable_request1'
    });
  }

  if (parseInt(chunkSize) > parseInt(maxChunkSize)) {
    throw new _backframe.BackframeError({
      code: 500,
      message: 'invalid_resumable_request2'
    });
  }

  if (parseInt(totalSize) > parseInt(maxFileSize)) {
    throw new _backframe.BackframeError({
      code: 500,
      message: 'invalid_resumable_request3'
    });
  }

  if (!requireFile) return;

  var filesize = files['file'].size;

  if (!files['file'] || !files['file'].size) {
    throw new _backframe.BackframeError({
      code: 500,
      message: 'invalid_resumable_request4'
    });
  }

  if (parseInt(chunkNumber) < parseInt(totalChunks) && parseInt(filesize) != parseInt(chunkSize)) {
    throw new _backframe.BackframeError({
      code: 500,
      message: 'invalid_resumable_request5'
    });
  }
};

var checkUploadedFile = exports.checkUploadedFile = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx) {
    var chunkFilename, exists;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            chunkFilename = _getChunkFilename(req.query.resumableIdentifier, req.query.resumableChunkNumber);
            _context.next = 3;
            return _chunkExists(chunkFilename);

          case 3:
            exists = _context.sent;

            if (exists) {
              _context.next = 6;
              break;
            }

            throw new _backframe.BackframeError({
              code: 204,
              message: 'not_found'
            });

          case 6:
            return _context.abrupt('return', 'found');

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function checkUploadedFile(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var uploadChunk = exports.uploadChunk = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, trx) {
    var identifier, chunkFilename, filedata, chunks, chunkArray, completed, data, asset;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            identifier = _cleanIdentifier(req.body.resumableIdentifier);
            chunkFilename = _getChunkFilename(identifier, req.body.resumableChunkNumber);


            _fs2.default.renameSync(req.files['file'].path, chunkFilename);

            filedata = _fs2.default.readFileSync(chunkFilename);
            _context2.next = 6;
            return _saveFile(filedata, chunkFilename, 'application/octet-stream');

          case 6:
            _context2.next = 8;
            return _unlinkChunk(chunkFilename);

          case 8:
            _context2.next = 10;
            return _listChunks();

          case 10:
            chunks = _context2.sent;
            chunkArray = [].concat((0, _toConsumableArray3.default)(Array(parseInt(req.body.resumableTotalChunks))));
            completed = chunkArray.reduce(function (completed, chunk, index) {

              return completed ? _lodash2.default.includes(chunks, _getChunkFilename(identifier, index + 1)) : false;
            }, true);

            if (completed) {
              _context2.next = 15;
              break;
            }

            return _context2.abrupt('return', 'partly_done');

          case 15:
            data = {
              team_id: req.team.get('id'),
              user_id: req.user.get('id'),
              source_id: 1,
              original_file_name: req.body.resumableFilename,
              file_name: _getNormalizedFileName(req.body.resumableFilename),
              content_type: req.body.resumableType,
              file_size: req.body.resumableTotalSize,
              chunks_total: req.body.resumableTotalChunks,
              status_id: 1
            };
            _context2.next = 18;
            return _asset2.default.forge(data).save(null, { transacting: trx });

          case 18:
            asset = _context2.sent;

            if (asset) {
              _context2.next = 21;
              break;
            }

            throw new _backframe.BackframeError({
              code: 500,
              message: 'Unable to create asset'
            });

          case 21:
            _context2.next = 23;
            return _assemble_asset_queue2.default.enqueue(req, trx, asset.get('id'));

          case 23:
            _context2.next = 25;
            return (0, _asset_serializer2.default)(req, trx, asset);

          case 25:
            return _context2.abrupt('return', _context2.sent);

          case 26:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function uploadChunk(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var createAssetFromUrl = exports.createAssetFromUrl = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, trx, url, team_id, user_id) {
    var head, file_data, parsed, source, asset;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _requestPromise2.default.head(url).promise();

          case 2:
            head = _context3.sent;
            _context3.next = 5;
            return _requestPromise2.default.get({ url: url, encoding: null }).promise();

          case 5:
            file_data = _context3.sent;
            parsed = _url2.default.parse(url);
            _context3.next = 9;
            return _source2.default.where({ text: 'web' }).fetch({ transacting: trx });

          case 9:
            source = _context3.sent;
            _context3.next = 12;
            return createAsset({
              team_id: req.team ? req.team.get('id') : team_id,
              user_id: req.team ? req.user.get('id') : user_id,
              source_id: source.get('id'),
              file_name: _path2.default.basename(parsed.pathname),
              file_data: file_data,
              content_type: head['content-type']
            }, trx);

          case 12:
            asset = _context3.sent;
            return _context3.abrupt('return', asset);

          case 14:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function createAssetFromUrl(_x5, _x6, _x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

var assembleAsset = exports.assembleAsset = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(id, trx) {
    var asset, fileData, normalizedData, status_id;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _asset2.default.where({ id: id }).fetch({ transacting: trx });

          case 2:
            asset = _context4.sent;

            if (asset) {
              _context4.next = 5;
              break;
            }

            throw new Error('Unable to find asset');

          case 5:
            _context4.next = 7;
            return _getAssembledData(asset);

          case 7:
            fileData = _context4.sent;
            _context4.next = 10;
            return _getNormalizedData(asset, fileData);

          case 10:
            normalizedData = _context4.sent;
            _context4.next = 13;
            return _saveFile(normalizedData, 'assets/' + asset.get('id') + '/' + asset.get('file_name'), asset.get('content_type'));

          case 13:
            _context4.next = 15;
            return _deleteChunks(asset);

          case 15:
            status_id = asset.get('has_preview') ? 2 : 3;
            _context4.next = 18;
            return asset.save({ status_id: status_id }, { transacting: trx });

          case 18:
            if (!asset.get('has_preview')) {
              _context4.next = 21;
              break;
            }

            _context4.next = 21;
            return _process_asset_queue2.default.enqueue(null, trx, asset.get('id'));

          case 21:
            _context4.next = 23;
            return _emitter2.default.in('/admin/assets/' + asset.get('id')).emit('message', {
              target: '/admin/assets/' + asset.get('id'),
              action: 'refresh',
              data: (0, _asset_serializer2.default)(null, null, asset)
            });

          case 23:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function assembleAsset(_x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();

var processAsset = exports.processAsset = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(id, trx) {
    var asset, fileData, previewData;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _asset2.default.where({ id: id }).fetch({ transacting: trx });

          case 2:
            asset = _context5.sent;

            if (asset) {
              _context5.next = 5;
              break;
            }

            throw new Error('Unable to find asset');

          case 5:
            _context5.next = 7;
            return getAssetData(asset);

          case 7:
            fileData = _context5.sent;
            _context5.next = 10;
            return _getPreviewData(asset, fileData, 'jpg');

          case 10:
            previewData = _context5.sent;
            _context5.next = 13;
            return _saveFile(previewData, 'assets/' + asset.get('id') + '/preview.jpg', 'image/jpeg');

          case 13:
            _context5.next = 15;
            return asset.save({ status_id: 3 }, { transacting: trx });

          case 15:
            _context5.next = 17;
            return _emitter2.default.in('/admin/assets/' + asset.get('id')).emit('message', {
              target: '/admin/assets/' + asset.get('id'),
              action: 'refresh',
              data: (0, _asset_serializer2.default)(null, null, asset)
            });

          case 17:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function processAsset(_x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}();

var getAsset = exports.getAsset = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(id, trx) {
    var asset;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _asset2.default.where({ id: id }).fetch({ transacting: trx });

          case 2:
            asset = _context6.sent;

            if (asset) {
              _context6.next = 5;
              break;
            }

            throw new Error('Unable to find asset');

          case 5:
            _context6.next = 7;
            return getAssetData(asset);

          case 7:
            return _context6.abrupt('return', _context6.sent);

          case 8:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function getAsset(_x14, _x15) {
    return _ref6.apply(this, arguments);
  };
}();

var createAsset = exports.createAsset = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(meta, trx) {
    var file_size, content_type, data, asset, normalizedData, previewData;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            file_size = meta.file_size || _getFilesize(meta.file_data);
            content_type = meta.content_type || _getContentType(meta.file_name);
            data = {
              team_id: meta.team_id,
              user_id: meta.user_id,
              source_id: meta.source_id,
              source_identifier: meta.source_identifier,
              source_url: meta.source_url,
              original_file_name: meta.file_name,
              file_name: _getNormalizedFileName(meta.file_name),
              content_type: content_type,
              file_size: file_size,
              chunks_total: 1,
              status_id: 2
            };
            _context7.next = 5;
            return _asset2.default.forge(data).save(null, { transacting: trx });

          case 5:
            asset = _context7.sent;
            _context7.next = 8;
            return _getNormalizedData(asset, meta.file_data);

          case 8:
            normalizedData = _context7.sent;
            _context7.next = 11;
            return _saveFile(normalizedData, 'assets/' + asset.get('id') + '/' + asset.get('file_name'), asset.get('content_type'));

          case 11:
            if (asset.get('is_image')) {
              _context7.next = 17;
              break;
            }

            _context7.next = 14;
            return _getPreviewData(asset, normalizedData, 'jpg');

          case 14:
            previewData = _context7.sent;
            _context7.next = 17;
            return _saveFile(previewData, 'assets/' + asset.get('id') + '/preview.jpg', 'image/jpeg');

          case 17:
            _context7.next = 19;
            return asset.save({ status_id: 3 }, { transacting: trx });

          case 19:
            return _context7.abrupt('return', asset);

          case 20:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function createAsset(_x16, _x17) {
    return _ref7.apply(this, arguments);
  };
}();

var deleteAsset = exports.deleteAsset = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(asset, trx) {
    var files;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            files = ['assets/' + asset.get('id') + '/' + asset.get('file_name')];


            if (asset.get('has_preview')) files.push('assets/' + asset.get('id') + '/preview.jpg');

            _context8.next = 4;
            return _deleteFiles(files);

          case 4:
            _context8.next = 6;
            return asset.destroy({ transacting: trx });

          case 6:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  }));

  return function deleteAsset(_x18, _x19) {
    return _ref8.apply(this, arguments);
  };
}();

var _getContentType = function _getContentType(file_name) {

  return _mimeTypes2.default.lookup(file_name);
};

var _getFilesize = function _getFilesize(fileData) {

  var random = _lodash2.default.random(100000000, 999999999).toString(36);

  var filePath = _path2.default.join('tmp', random);

  _fs2.default.writeFileSync(filePath, fileData);

  var fileStats = _fs2.default.statSync(filePath);

  _fs2.default.unlinkSync(filePath);

  return fileStats.size;
};

var _getNormalizedFileName = exports._getNormalizedFileName = function _getNormalizedFileName(filename) {

  var matches = filename.toLowerCase().match(/^(.*)\.([^?]*)\??(.*)$/);

  var basename = matches ? matches[1] : filename.toLowerCase();

  var extension = matches ? matches[2] : null;

  var rewritten = basename.replace(/[^0-9a-zA-Z-\s_.]/img, '').replace(/[\W_]/img, '-').replace(/-{2,}/g, '-');

  return rewritten + (extension ? '.' + extension : '');
};

var _chunkExists = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(filepath) {
    var chunks;
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _listChunks();

          case 2:
            chunks = _context9.sent;
            return _context9.abrupt('return', _lodash2.default.includes(chunks, filepath));

          case 4:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  }));

  return function _chunkExists(_x20) {
    return _ref9.apply(this, arguments);
  };
}();

var _bufferToStream = function _bufferToStream(buffer) {

  var stream = new _stream.Duplex();

  stream.push(buffer);

  stream.push(null);

  return stream;
};

var getAssetData = exports.getAssetData = function () {
  var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(asset) {
    var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'buffer';

    var Key, data, _s, file;

    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            Key = 'assets/' + asset.get('id') + '/' + asset.get('file_name');
            data = null;

            if (!(Object({"APPS":["maha","maha-chat","maha-competencies","maha-crm","maha-drive","maha-eatfresh","maha-expenses","maha-platform","maha-team"],"DATABASE_URL":"postgres://postgres@localhost:5432/maha","REDIS_URL":"redis://localhost:6379/14","SECRET":"fsad8fsad78fdshbfwbhse78yfw","SERVER_PORT":8080,"SOCKET_PORT":8090,"DOMAIN":"mahaplatform.com","EMAIL_REDIRECT":"greg@thinktopography.com","EMAIL_DELIVERY":"ses","ASSET_SOTRAGE":"s3","MICROSOFT_APP_ID":"c54c9b91-e766-4829-a530-34107843fe8d","MICROSOFT_APP_SECRET":"arYWE56%=:aehenRXUT372~","BOX_CLIENT_ID":"t36h58btxlcqtudbz30raq1bduibhndz","BOX_CLIENT_SECRET":"oJ4248556NlnViGrGzH0BrbY47r0ipkQ","DROPBOX_APP_KEY":"0c3b36vlsedljil","DROPBOX_APP_SECRET":"r5rcjmd22w0wq31","INSTAGRAM_CLIENT_ID":"0c3b36vlsedljil","INSTAGRAM_CLIENT_SECRET":"r5rcjmd22w0wq31","FACEBOOK_APP_ID":"712a7bfd4801443bafcca253e2fa05ef","FACEBOOK_APP_SECRET":"6ab01fce44a0467883e0af02f5486ff0","GOOGLE_CLIENT_ID":"457997349543-6vamfr7lcdli3g7ups2bubcvg4bnr0ie.apps.googleusercontent.com","GOOGLE_CLIENT_SECRET":"XOOoTscB04Zjqc04JvAS6mOL","ROLLBAR_CLIENT_TOKEN":"ad5c799fec6b4321bbefce7a39b72093","ROLLBAR_SERVER_TOKEN":"0b6e5aa764a948199bafa00407927b38","FCM_API_KEY":"AAAAaqLE8qc:APA91bGKmtxSVdBuOKbsSd_pSPpvyqA6hIkk9SbwpXje5GK-WOKCu0rSfpK7WS7XOncMHyTr3UyvVoKmFM5h5YG8RmC9hLDvwutyqJ2NUMOZPpG-8_Kxi26X3uO0cZiYj6LngyzjadhM","VAPID_PUBLIC_KEY":"BJ4QYD8rLzBxqWjz7bu-LNHgXKySMsIpOMcXc7Weq5rgPHsTtPIt303hhViecF-CUUGuh2WDIWLN_xPorx5EZvM","VAPID_PRIVATE_KEY":"ZNLVfNVxz4_zdurh-cueGqVtYgVIlKb3C7FW8H0NHCc","AWS_ACCESS_KEY_ID":"AKIAJGQBN7DJGZQOJS5A","AWS_SCRET_ACCESS_KEY":"4/9V6b39996bSZquf1YdBHbBRAMUZElkezDA4zd9","AWS_REGION":"us-east-1","AWS_BUCKET":"dev.cdn.mahaplatform.com","WEB_HOST":"http://localhost:8080","WEB_ASSET_HOST":"","DATA_ASSET_HOST":"http://dev.cdn.mahaplatform.com","WEB_ASSET_CDN_HOST":"","DATA_ASSET_CDNHOST":""}).ASSET_STORAGE === 's3')) {
              _context10.next = 10;
              break;
            }

            _s = _getS3();
            _context10.next = 6;
            return _s.getObject({
              Bucket: "dev.cdn.mahaplatform.com",
              Key: Key
            }).promise();

          case 6:
            file = _context10.sent;


            data = file.Body;

            _context10.next = 11;
            break;

          case 10:
            if (Object({"APPS":["maha","maha-chat","maha-competencies","maha-crm","maha-drive","maha-eatfresh","maha-expenses","maha-platform","maha-team"],"DATABASE_URL":"postgres://postgres@localhost:5432/maha","REDIS_URL":"redis://localhost:6379/14","SECRET":"fsad8fsad78fdshbfwbhse78yfw","SERVER_PORT":8080,"SOCKET_PORT":8090,"DOMAIN":"mahaplatform.com","EMAIL_REDIRECT":"greg@thinktopography.com","EMAIL_DELIVERY":"ses","ASSET_SOTRAGE":"s3","MICROSOFT_APP_ID":"c54c9b91-e766-4829-a530-34107843fe8d","MICROSOFT_APP_SECRET":"arYWE56%=:aehenRXUT372~","BOX_CLIENT_ID":"t36h58btxlcqtudbz30raq1bduibhndz","BOX_CLIENT_SECRET":"oJ4248556NlnViGrGzH0BrbY47r0ipkQ","DROPBOX_APP_KEY":"0c3b36vlsedljil","DROPBOX_APP_SECRET":"r5rcjmd22w0wq31","INSTAGRAM_CLIENT_ID":"0c3b36vlsedljil","INSTAGRAM_CLIENT_SECRET":"r5rcjmd22w0wq31","FACEBOOK_APP_ID":"712a7bfd4801443bafcca253e2fa05ef","FACEBOOK_APP_SECRET":"6ab01fce44a0467883e0af02f5486ff0","GOOGLE_CLIENT_ID":"457997349543-6vamfr7lcdli3g7ups2bubcvg4bnr0ie.apps.googleusercontent.com","GOOGLE_CLIENT_SECRET":"XOOoTscB04Zjqc04JvAS6mOL","ROLLBAR_CLIENT_TOKEN":"ad5c799fec6b4321bbefce7a39b72093","ROLLBAR_SERVER_TOKEN":"0b6e5aa764a948199bafa00407927b38","FCM_API_KEY":"AAAAaqLE8qc:APA91bGKmtxSVdBuOKbsSd_pSPpvyqA6hIkk9SbwpXje5GK-WOKCu0rSfpK7WS7XOncMHyTr3UyvVoKmFM5h5YG8RmC9hLDvwutyqJ2NUMOZPpG-8_Kxi26X3uO0cZiYj6LngyzjadhM","VAPID_PUBLIC_KEY":"BJ4QYD8rLzBxqWjz7bu-LNHgXKySMsIpOMcXc7Weq5rgPHsTtPIt303hhViecF-CUUGuh2WDIWLN_xPorx5EZvM","VAPID_PRIVATE_KEY":"ZNLVfNVxz4_zdurh-cueGqVtYgVIlKb3C7FW8H0NHCc","AWS_ACCESS_KEY_ID":"AKIAJGQBN7DJGZQOJS5A","AWS_SCRET_ACCESS_KEY":"4/9V6b39996bSZquf1YdBHbBRAMUZElkezDA4zd9","AWS_REGION":"us-east-1","AWS_BUCKET":"dev.cdn.mahaplatform.com","WEB_HOST":"http://localhost:8080","WEB_ASSET_HOST":"","DATA_ASSET_HOST":"http://dev.cdn.mahaplatform.com","WEB_ASSET_CDN_HOST":"","DATA_ASSET_CDNHOST":""}).ASSET_STORAGE === 'local') {

              data = _fs2.default.readFileSync(_path2.default.join('public', Key));
            }

          case 11:
            if (!(format === 'stream')) {
              _context10.next = 13;
              break;
            }

            return _context10.abrupt('return', _bufferToStream(data));

          case 13:
            if (!(format === 'string')) {
              _context10.next = 15;
              break;
            }

            return _context10.abrupt('return', data.toString('utf-8'));

          case 15:
            return _context10.abrupt('return', data);

          case 16:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  }));

  return function getAssetData(_x21) {
    return _ref10.apply(this, arguments);
  };
}();

var _getChunks = function () {
  var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(asset) {
    var totalChunks, chunkArray, chunks;
    return _regenerator2.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            totalChunks = parseInt(asset.get('chunks_total'));
            chunkArray = [].concat((0, _toConsumableArray3.default)(Array(parseInt(totalChunks))));
            _context12.next = 4;
            return (0, _bluebird.mapSeries)(chunkArray, function () {
              var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(item, index) {
                var Key, _s2, chunk;

                return _regenerator2.default.wrap(function _callee11$(_context11) {
                  while (1) {
                    switch (_context11.prev = _context11.next) {
                      case 0:
                        Key = 'tmp/' + asset.get('identifier') + '.' + (index + 1);

                        if (!(Object({"APPS":["maha","maha-chat","maha-competencies","maha-crm","maha-drive","maha-eatfresh","maha-expenses","maha-platform","maha-team"],"DATABASE_URL":"postgres://postgres@localhost:5432/maha","REDIS_URL":"redis://localhost:6379/14","SECRET":"fsad8fsad78fdshbfwbhse78yfw","SERVER_PORT":8080,"SOCKET_PORT":8090,"DOMAIN":"mahaplatform.com","EMAIL_REDIRECT":"greg@thinktopography.com","EMAIL_DELIVERY":"ses","ASSET_SOTRAGE":"s3","MICROSOFT_APP_ID":"c54c9b91-e766-4829-a530-34107843fe8d","MICROSOFT_APP_SECRET":"arYWE56%=:aehenRXUT372~","BOX_CLIENT_ID":"t36h58btxlcqtudbz30raq1bduibhndz","BOX_CLIENT_SECRET":"oJ4248556NlnViGrGzH0BrbY47r0ipkQ","DROPBOX_APP_KEY":"0c3b36vlsedljil","DROPBOX_APP_SECRET":"r5rcjmd22w0wq31","INSTAGRAM_CLIENT_ID":"0c3b36vlsedljil","INSTAGRAM_CLIENT_SECRET":"r5rcjmd22w0wq31","FACEBOOK_APP_ID":"712a7bfd4801443bafcca253e2fa05ef","FACEBOOK_APP_SECRET":"6ab01fce44a0467883e0af02f5486ff0","GOOGLE_CLIENT_ID":"457997349543-6vamfr7lcdli3g7ups2bubcvg4bnr0ie.apps.googleusercontent.com","GOOGLE_CLIENT_SECRET":"XOOoTscB04Zjqc04JvAS6mOL","ROLLBAR_CLIENT_TOKEN":"ad5c799fec6b4321bbefce7a39b72093","ROLLBAR_SERVER_TOKEN":"0b6e5aa764a948199bafa00407927b38","FCM_API_KEY":"AAAAaqLE8qc:APA91bGKmtxSVdBuOKbsSd_pSPpvyqA6hIkk9SbwpXje5GK-WOKCu0rSfpK7WS7XOncMHyTr3UyvVoKmFM5h5YG8RmC9hLDvwutyqJ2NUMOZPpG-8_Kxi26X3uO0cZiYj6LngyzjadhM","VAPID_PUBLIC_KEY":"BJ4QYD8rLzBxqWjz7bu-LNHgXKySMsIpOMcXc7Weq5rgPHsTtPIt303hhViecF-CUUGuh2WDIWLN_xPorx5EZvM","VAPID_PRIVATE_KEY":"ZNLVfNVxz4_zdurh-cueGqVtYgVIlKb3C7FW8H0NHCc","AWS_ACCESS_KEY_ID":"AKIAJGQBN7DJGZQOJS5A","AWS_SCRET_ACCESS_KEY":"4/9V6b39996bSZquf1YdBHbBRAMUZElkezDA4zd9","AWS_REGION":"us-east-1","AWS_BUCKET":"dev.cdn.mahaplatform.com","WEB_HOST":"http://localhost:8080","WEB_ASSET_HOST":"","DATA_ASSET_HOST":"http://dev.cdn.mahaplatform.com","WEB_ASSET_CDN_HOST":"","DATA_ASSET_CDNHOST":""}).ASSET_STORAGE === 's3')) {
                          _context11.next = 9;
                          break;
                        }

                        _s2 = _getS3();
                        _context11.next = 5;
                        return _s2.getObject({
                          Bucket: "dev.cdn.mahaplatform.com",
                          Key: Key
                        }).promise();

                      case 5:
                        chunk = _context11.sent;
                        return _context11.abrupt('return', chunk.Body);

                      case 9:
                        if (!(Object({"APPS":["maha","maha-chat","maha-competencies","maha-crm","maha-drive","maha-eatfresh","maha-expenses","maha-platform","maha-team"],"DATABASE_URL":"postgres://postgres@localhost:5432/maha","REDIS_URL":"redis://localhost:6379/14","SECRET":"fsad8fsad78fdshbfwbhse78yfw","SERVER_PORT":8080,"SOCKET_PORT":8090,"DOMAIN":"mahaplatform.com","EMAIL_REDIRECT":"greg@thinktopography.com","EMAIL_DELIVERY":"ses","ASSET_SOTRAGE":"s3","MICROSOFT_APP_ID":"c54c9b91-e766-4829-a530-34107843fe8d","MICROSOFT_APP_SECRET":"arYWE56%=:aehenRXUT372~","BOX_CLIENT_ID":"t36h58btxlcqtudbz30raq1bduibhndz","BOX_CLIENT_SECRET":"oJ4248556NlnViGrGzH0BrbY47r0ipkQ","DROPBOX_APP_KEY":"0c3b36vlsedljil","DROPBOX_APP_SECRET":"r5rcjmd22w0wq31","INSTAGRAM_CLIENT_ID":"0c3b36vlsedljil","INSTAGRAM_CLIENT_SECRET":"r5rcjmd22w0wq31","FACEBOOK_APP_ID":"712a7bfd4801443bafcca253e2fa05ef","FACEBOOK_APP_SECRET":"6ab01fce44a0467883e0af02f5486ff0","GOOGLE_CLIENT_ID":"457997349543-6vamfr7lcdli3g7ups2bubcvg4bnr0ie.apps.googleusercontent.com","GOOGLE_CLIENT_SECRET":"XOOoTscB04Zjqc04JvAS6mOL","ROLLBAR_CLIENT_TOKEN":"ad5c799fec6b4321bbefce7a39b72093","ROLLBAR_SERVER_TOKEN":"0b6e5aa764a948199bafa00407927b38","FCM_API_KEY":"AAAAaqLE8qc:APA91bGKmtxSVdBuOKbsSd_pSPpvyqA6hIkk9SbwpXje5GK-WOKCu0rSfpK7WS7XOncMHyTr3UyvVoKmFM5h5YG8RmC9hLDvwutyqJ2NUMOZPpG-8_Kxi26X3uO0cZiYj6LngyzjadhM","VAPID_PUBLIC_KEY":"BJ4QYD8rLzBxqWjz7bu-LNHgXKySMsIpOMcXc7Weq5rgPHsTtPIt303hhViecF-CUUGuh2WDIWLN_xPorx5EZvM","VAPID_PRIVATE_KEY":"ZNLVfNVxz4_zdurh-cueGqVtYgVIlKb3C7FW8H0NHCc","AWS_ACCESS_KEY_ID":"AKIAJGQBN7DJGZQOJS5A","AWS_SCRET_ACCESS_KEY":"4/9V6b39996bSZquf1YdBHbBRAMUZElkezDA4zd9","AWS_REGION":"us-east-1","AWS_BUCKET":"dev.cdn.mahaplatform.com","WEB_HOST":"http://localhost:8080","WEB_ASSET_HOST":"","DATA_ASSET_HOST":"http://dev.cdn.mahaplatform.com","WEB_ASSET_CDN_HOST":"","DATA_ASSET_CDNHOST":""}).ASSET_STORAGE === 'local')) {
                          _context11.next = 11;
                          break;
                        }

                        return _context11.abrupt('return', _fs2.default.readFileSync(_path2.default.join('public', Key)));

                      case 11:
                      case 'end':
                        return _context11.stop();
                    }
                  }
                }, _callee11, undefined);
              }));

              return function (_x24, _x25) {
                return _ref12.apply(this, arguments);
              };
            }());

          case 4:
            chunks = _context12.sent;
            return _context12.abrupt('return', chunks);

          case 6:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined);
  }));

  return function _getChunks(_x23) {
    return _ref11.apply(this, arguments);
  };
}();

var _listChunks = function () {
  var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13() {
    var _s3, parts;

    return _regenerator2.default.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            if (!(Object({"APPS":["maha","maha-chat","maha-competencies","maha-crm","maha-drive","maha-eatfresh","maha-expenses","maha-platform","maha-team"],"DATABASE_URL":"postgres://postgres@localhost:5432/maha","REDIS_URL":"redis://localhost:6379/14","SECRET":"fsad8fsad78fdshbfwbhse78yfw","SERVER_PORT":8080,"SOCKET_PORT":8090,"DOMAIN":"mahaplatform.com","EMAIL_REDIRECT":"greg@thinktopography.com","EMAIL_DELIVERY":"ses","ASSET_SOTRAGE":"s3","MICROSOFT_APP_ID":"c54c9b91-e766-4829-a530-34107843fe8d","MICROSOFT_APP_SECRET":"arYWE56%=:aehenRXUT372~","BOX_CLIENT_ID":"t36h58btxlcqtudbz30raq1bduibhndz","BOX_CLIENT_SECRET":"oJ4248556NlnViGrGzH0BrbY47r0ipkQ","DROPBOX_APP_KEY":"0c3b36vlsedljil","DROPBOX_APP_SECRET":"r5rcjmd22w0wq31","INSTAGRAM_CLIENT_ID":"0c3b36vlsedljil","INSTAGRAM_CLIENT_SECRET":"r5rcjmd22w0wq31","FACEBOOK_APP_ID":"712a7bfd4801443bafcca253e2fa05ef","FACEBOOK_APP_SECRET":"6ab01fce44a0467883e0af02f5486ff0","GOOGLE_CLIENT_ID":"457997349543-6vamfr7lcdli3g7ups2bubcvg4bnr0ie.apps.googleusercontent.com","GOOGLE_CLIENT_SECRET":"XOOoTscB04Zjqc04JvAS6mOL","ROLLBAR_CLIENT_TOKEN":"ad5c799fec6b4321bbefce7a39b72093","ROLLBAR_SERVER_TOKEN":"0b6e5aa764a948199bafa00407927b38","FCM_API_KEY":"AAAAaqLE8qc:APA91bGKmtxSVdBuOKbsSd_pSPpvyqA6hIkk9SbwpXje5GK-WOKCu0rSfpK7WS7XOncMHyTr3UyvVoKmFM5h5YG8RmC9hLDvwutyqJ2NUMOZPpG-8_Kxi26X3uO0cZiYj6LngyzjadhM","VAPID_PUBLIC_KEY":"BJ4QYD8rLzBxqWjz7bu-LNHgXKySMsIpOMcXc7Weq5rgPHsTtPIt303hhViecF-CUUGuh2WDIWLN_xPorx5EZvM","VAPID_PRIVATE_KEY":"ZNLVfNVxz4_zdurh-cueGqVtYgVIlKb3C7FW8H0NHCc","AWS_ACCESS_KEY_ID":"AKIAJGQBN7DJGZQOJS5A","AWS_SCRET_ACCESS_KEY":"4/9V6b39996bSZquf1YdBHbBRAMUZElkezDA4zd9","AWS_REGION":"us-east-1","AWS_BUCKET":"dev.cdn.mahaplatform.com","WEB_HOST":"http://localhost:8080","WEB_ASSET_HOST":"","DATA_ASSET_HOST":"http://dev.cdn.mahaplatform.com","WEB_ASSET_CDN_HOST":"","DATA_ASSET_CDNHOST":""}).ASSET_STORAGE === 's3')) {
              _context13.next = 8;
              break;
            }

            _s3 = _getS3();
            _context13.next = 4;
            return _s3.listObjects({
              Bucket: "dev.cdn.mahaplatform.com",
              Prefix: 'tmp'
            }).promise();

          case 4:
            parts = _context13.sent;
            return _context13.abrupt('return', parts.Contents.map(function (file) {
              return file.Key;
            }));

          case 8:
            if (!(Object({"APPS":["maha","maha-chat","maha-competencies","maha-crm","maha-drive","maha-eatfresh","maha-expenses","maha-platform","maha-team"],"DATABASE_URL":"postgres://postgres@localhost:5432/maha","REDIS_URL":"redis://localhost:6379/14","SECRET":"fsad8fsad78fdshbfwbhse78yfw","SERVER_PORT":8080,"SOCKET_PORT":8090,"DOMAIN":"mahaplatform.com","EMAIL_REDIRECT":"greg@thinktopography.com","EMAIL_DELIVERY":"ses","ASSET_SOTRAGE":"s3","MICROSOFT_APP_ID":"c54c9b91-e766-4829-a530-34107843fe8d","MICROSOFT_APP_SECRET":"arYWE56%=:aehenRXUT372~","BOX_CLIENT_ID":"t36h58btxlcqtudbz30raq1bduibhndz","BOX_CLIENT_SECRET":"oJ4248556NlnViGrGzH0BrbY47r0ipkQ","DROPBOX_APP_KEY":"0c3b36vlsedljil","DROPBOX_APP_SECRET":"r5rcjmd22w0wq31","INSTAGRAM_CLIENT_ID":"0c3b36vlsedljil","INSTAGRAM_CLIENT_SECRET":"r5rcjmd22w0wq31","FACEBOOK_APP_ID":"712a7bfd4801443bafcca253e2fa05ef","FACEBOOK_APP_SECRET":"6ab01fce44a0467883e0af02f5486ff0","GOOGLE_CLIENT_ID":"457997349543-6vamfr7lcdli3g7ups2bubcvg4bnr0ie.apps.googleusercontent.com","GOOGLE_CLIENT_SECRET":"XOOoTscB04Zjqc04JvAS6mOL","ROLLBAR_CLIENT_TOKEN":"ad5c799fec6b4321bbefce7a39b72093","ROLLBAR_SERVER_TOKEN":"0b6e5aa764a948199bafa00407927b38","FCM_API_KEY":"AAAAaqLE8qc:APA91bGKmtxSVdBuOKbsSd_pSPpvyqA6hIkk9SbwpXje5GK-WOKCu0rSfpK7WS7XOncMHyTr3UyvVoKmFM5h5YG8RmC9hLDvwutyqJ2NUMOZPpG-8_Kxi26X3uO0cZiYj6LngyzjadhM","VAPID_PUBLIC_KEY":"BJ4QYD8rLzBxqWjz7bu-LNHgXKySMsIpOMcXc7Weq5rgPHsTtPIt303hhViecF-CUUGuh2WDIWLN_xPorx5EZvM","VAPID_PRIVATE_KEY":"ZNLVfNVxz4_zdurh-cueGqVtYgVIlKb3C7FW8H0NHCc","AWS_ACCESS_KEY_ID":"AKIAJGQBN7DJGZQOJS5A","AWS_SCRET_ACCESS_KEY":"4/9V6b39996bSZquf1YdBHbBRAMUZElkezDA4zd9","AWS_REGION":"us-east-1","AWS_BUCKET":"dev.cdn.mahaplatform.com","WEB_HOST":"http://localhost:8080","WEB_ASSET_HOST":"","DATA_ASSET_HOST":"http://dev.cdn.mahaplatform.com","WEB_ASSET_CDN_HOST":"","DATA_ASSET_CDNHOST":""}).ASSET_STORAGE === 'local')) {
              _context13.next = 10;
              break;
            }

            return _context13.abrupt('return', _fs2.default.readdirSync(_path2.default.join('public', 'tmp')).map(function (file) {
              return 'tmp/' + file;
            }));

          case 10:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, undefined);
  }));

  return function _listChunks() {
    return _ref13.apply(this, arguments);
  };
}();

var _saveFile = function () {
  var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14(filedata, filepath, content_type) {
    var _s4, assetpath, assetname;

    return _regenerator2.default.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            if (!(Object({"APPS":["maha","maha-chat","maha-competencies","maha-crm","maha-drive","maha-eatfresh","maha-expenses","maha-platform","maha-team"],"DATABASE_URL":"postgres://postgres@localhost:5432/maha","REDIS_URL":"redis://localhost:6379/14","SECRET":"fsad8fsad78fdshbfwbhse78yfw","SERVER_PORT":8080,"SOCKET_PORT":8090,"DOMAIN":"mahaplatform.com","EMAIL_REDIRECT":"greg@thinktopography.com","EMAIL_DELIVERY":"ses","ASSET_SOTRAGE":"s3","MICROSOFT_APP_ID":"c54c9b91-e766-4829-a530-34107843fe8d","MICROSOFT_APP_SECRET":"arYWE56%=:aehenRXUT372~","BOX_CLIENT_ID":"t36h58btxlcqtudbz30raq1bduibhndz","BOX_CLIENT_SECRET":"oJ4248556NlnViGrGzH0BrbY47r0ipkQ","DROPBOX_APP_KEY":"0c3b36vlsedljil","DROPBOX_APP_SECRET":"r5rcjmd22w0wq31","INSTAGRAM_CLIENT_ID":"0c3b36vlsedljil","INSTAGRAM_CLIENT_SECRET":"r5rcjmd22w0wq31","FACEBOOK_APP_ID":"712a7bfd4801443bafcca253e2fa05ef","FACEBOOK_APP_SECRET":"6ab01fce44a0467883e0af02f5486ff0","GOOGLE_CLIENT_ID":"457997349543-6vamfr7lcdli3g7ups2bubcvg4bnr0ie.apps.googleusercontent.com","GOOGLE_CLIENT_SECRET":"XOOoTscB04Zjqc04JvAS6mOL","ROLLBAR_CLIENT_TOKEN":"ad5c799fec6b4321bbefce7a39b72093","ROLLBAR_SERVER_TOKEN":"0b6e5aa764a948199bafa00407927b38","FCM_API_KEY":"AAAAaqLE8qc:APA91bGKmtxSVdBuOKbsSd_pSPpvyqA6hIkk9SbwpXje5GK-WOKCu0rSfpK7WS7XOncMHyTr3UyvVoKmFM5h5YG8RmC9hLDvwutyqJ2NUMOZPpG-8_Kxi26X3uO0cZiYj6LngyzjadhM","VAPID_PUBLIC_KEY":"BJ4QYD8rLzBxqWjz7bu-LNHgXKySMsIpOMcXc7Weq5rgPHsTtPIt303hhViecF-CUUGuh2WDIWLN_xPorx5EZvM","VAPID_PRIVATE_KEY":"ZNLVfNVxz4_zdurh-cueGqVtYgVIlKb3C7FW8H0NHCc","AWS_ACCESS_KEY_ID":"AKIAJGQBN7DJGZQOJS5A","AWS_SCRET_ACCESS_KEY":"4/9V6b39996bSZquf1YdBHbBRAMUZElkezDA4zd9","AWS_REGION":"us-east-1","AWS_BUCKET":"dev.cdn.mahaplatform.com","WEB_HOST":"http://localhost:8080","WEB_ASSET_HOST":"","DATA_ASSET_HOST":"http://dev.cdn.mahaplatform.com","WEB_ASSET_CDN_HOST":"","DATA_ASSET_CDNHOST":""}).ASSET_STORAGE === 's3')) {
              _context14.next = 6;
              break;
            }

            _s4 = _getS3();
            _context14.next = 4;
            return _s4.upload({
              ACL: 'public-read',
              Body: filedata,
              Bucket: "dev.cdn.mahaplatform.com",
              ContentType: content_type,
              Key: filepath
            }).promise();

          case 4:
            _context14.next = 7;
            break;

          case 6:
            if (Object({"APPS":["maha","maha-chat","maha-competencies","maha-crm","maha-drive","maha-eatfresh","maha-expenses","maha-platform","maha-team"],"DATABASE_URL":"postgres://postgres@localhost:5432/maha","REDIS_URL":"redis://localhost:6379/14","SECRET":"fsad8fsad78fdshbfwbhse78yfw","SERVER_PORT":8080,"SOCKET_PORT":8090,"DOMAIN":"mahaplatform.com","EMAIL_REDIRECT":"greg@thinktopography.com","EMAIL_DELIVERY":"ses","ASSET_SOTRAGE":"s3","MICROSOFT_APP_ID":"c54c9b91-e766-4829-a530-34107843fe8d","MICROSOFT_APP_SECRET":"arYWE56%=:aehenRXUT372~","BOX_CLIENT_ID":"t36h58btxlcqtudbz30raq1bduibhndz","BOX_CLIENT_SECRET":"oJ4248556NlnViGrGzH0BrbY47r0ipkQ","DROPBOX_APP_KEY":"0c3b36vlsedljil","DROPBOX_APP_SECRET":"r5rcjmd22w0wq31","INSTAGRAM_CLIENT_ID":"0c3b36vlsedljil","INSTAGRAM_CLIENT_SECRET":"r5rcjmd22w0wq31","FACEBOOK_APP_ID":"712a7bfd4801443bafcca253e2fa05ef","FACEBOOK_APP_SECRET":"6ab01fce44a0467883e0af02f5486ff0","GOOGLE_CLIENT_ID":"457997349543-6vamfr7lcdli3g7ups2bubcvg4bnr0ie.apps.googleusercontent.com","GOOGLE_CLIENT_SECRET":"XOOoTscB04Zjqc04JvAS6mOL","ROLLBAR_CLIENT_TOKEN":"ad5c799fec6b4321bbefce7a39b72093","ROLLBAR_SERVER_TOKEN":"0b6e5aa764a948199bafa00407927b38","FCM_API_KEY":"AAAAaqLE8qc:APA91bGKmtxSVdBuOKbsSd_pSPpvyqA6hIkk9SbwpXje5GK-WOKCu0rSfpK7WS7XOncMHyTr3UyvVoKmFM5h5YG8RmC9hLDvwutyqJ2NUMOZPpG-8_Kxi26X3uO0cZiYj6LngyzjadhM","VAPID_PUBLIC_KEY":"BJ4QYD8rLzBxqWjz7bu-LNHgXKySMsIpOMcXc7Weq5rgPHsTtPIt303hhViecF-CUUGuh2WDIWLN_xPorx5EZvM","VAPID_PRIVATE_KEY":"ZNLVfNVxz4_zdurh-cueGqVtYgVIlKb3C7FW8H0NHCc","AWS_ACCESS_KEY_ID":"AKIAJGQBN7DJGZQOJS5A","AWS_SCRET_ACCESS_KEY":"4/9V6b39996bSZquf1YdBHbBRAMUZElkezDA4zd9","AWS_REGION":"us-east-1","AWS_BUCKET":"dev.cdn.mahaplatform.com","WEB_HOST":"http://localhost:8080","WEB_ASSET_HOST":"","DATA_ASSET_HOST":"http://dev.cdn.mahaplatform.com","WEB_ASSET_CDN_HOST":"","DATA_ASSET_CDNHOST":""}).ASSET_STORAGE === 'local') {
              assetpath = _path2.default.join.apply(_path2.default, ['public'].concat((0, _toConsumableArray3.default)(filepath.split('/').slice(0, -1))));
              assetname = filepath.split('/').pop();


              _mkdirp2.default.sync(assetpath);

              _fs2.default.writeFileSync(_path2.default.join(assetpath, assetname), filedata);
            }

          case 7:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, undefined);
  }));

  return function _saveFile(_x26, _x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}();

var _deleteFiles = function () {
  var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15(files) {
    var _s5;

    return _regenerator2.default.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            if (!(Object({"APPS":["maha","maha-chat","maha-competencies","maha-crm","maha-drive","maha-eatfresh","maha-expenses","maha-platform","maha-team"],"DATABASE_URL":"postgres://postgres@localhost:5432/maha","REDIS_URL":"redis://localhost:6379/14","SECRET":"fsad8fsad78fdshbfwbhse78yfw","SERVER_PORT":8080,"SOCKET_PORT":8090,"DOMAIN":"mahaplatform.com","EMAIL_REDIRECT":"greg@thinktopography.com","EMAIL_DELIVERY":"ses","ASSET_SOTRAGE":"s3","MICROSOFT_APP_ID":"c54c9b91-e766-4829-a530-34107843fe8d","MICROSOFT_APP_SECRET":"arYWE56%=:aehenRXUT372~","BOX_CLIENT_ID":"t36h58btxlcqtudbz30raq1bduibhndz","BOX_CLIENT_SECRET":"oJ4248556NlnViGrGzH0BrbY47r0ipkQ","DROPBOX_APP_KEY":"0c3b36vlsedljil","DROPBOX_APP_SECRET":"r5rcjmd22w0wq31","INSTAGRAM_CLIENT_ID":"0c3b36vlsedljil","INSTAGRAM_CLIENT_SECRET":"r5rcjmd22w0wq31","FACEBOOK_APP_ID":"712a7bfd4801443bafcca253e2fa05ef","FACEBOOK_APP_SECRET":"6ab01fce44a0467883e0af02f5486ff0","GOOGLE_CLIENT_ID":"457997349543-6vamfr7lcdli3g7ups2bubcvg4bnr0ie.apps.googleusercontent.com","GOOGLE_CLIENT_SECRET":"XOOoTscB04Zjqc04JvAS6mOL","ROLLBAR_CLIENT_TOKEN":"ad5c799fec6b4321bbefce7a39b72093","ROLLBAR_SERVER_TOKEN":"0b6e5aa764a948199bafa00407927b38","FCM_API_KEY":"AAAAaqLE8qc:APA91bGKmtxSVdBuOKbsSd_pSPpvyqA6hIkk9SbwpXje5GK-WOKCu0rSfpK7WS7XOncMHyTr3UyvVoKmFM5h5YG8RmC9hLDvwutyqJ2NUMOZPpG-8_Kxi26X3uO0cZiYj6LngyzjadhM","VAPID_PUBLIC_KEY":"BJ4QYD8rLzBxqWjz7bu-LNHgXKySMsIpOMcXc7Weq5rgPHsTtPIt303hhViecF-CUUGuh2WDIWLN_xPorx5EZvM","VAPID_PRIVATE_KEY":"ZNLVfNVxz4_zdurh-cueGqVtYgVIlKb3C7FW8H0NHCc","AWS_ACCESS_KEY_ID":"AKIAJGQBN7DJGZQOJS5A","AWS_SCRET_ACCESS_KEY":"4/9V6b39996bSZquf1YdBHbBRAMUZElkezDA4zd9","AWS_REGION":"us-east-1","AWS_BUCKET":"dev.cdn.mahaplatform.com","WEB_HOST":"http://localhost:8080","WEB_ASSET_HOST":"","DATA_ASSET_HOST":"http://dev.cdn.mahaplatform.com","WEB_ASSET_CDN_HOST":"","DATA_ASSET_CDNHOST":""}).ASSET_STORAGE === 's3')) {
              _context15.next = 6;
              break;
            }

            _s5 = _getS3();
            _context15.next = 4;
            return _s5.deleteObjects({
              Bucket: "dev.cdn.mahaplatform.com",
              Delete: {
                Objects: files.map(function (Key) {
                  return { Key: Key };
                })
              }
            }).promise();

          case 4:
            _context15.next = 7;
            break;

          case 6:
            if (Object({"APPS":["maha","maha-chat","maha-competencies","maha-crm","maha-drive","maha-eatfresh","maha-expenses","maha-platform","maha-team"],"DATABASE_URL":"postgres://postgres@localhost:5432/maha","REDIS_URL":"redis://localhost:6379/14","SECRET":"fsad8fsad78fdshbfwbhse78yfw","SERVER_PORT":8080,"SOCKET_PORT":8090,"DOMAIN":"mahaplatform.com","EMAIL_REDIRECT":"greg@thinktopography.com","EMAIL_DELIVERY":"ses","ASSET_SOTRAGE":"s3","MICROSOFT_APP_ID":"c54c9b91-e766-4829-a530-34107843fe8d","MICROSOFT_APP_SECRET":"arYWE56%=:aehenRXUT372~","BOX_CLIENT_ID":"t36h58btxlcqtudbz30raq1bduibhndz","BOX_CLIENT_SECRET":"oJ4248556NlnViGrGzH0BrbY47r0ipkQ","DROPBOX_APP_KEY":"0c3b36vlsedljil","DROPBOX_APP_SECRET":"r5rcjmd22w0wq31","INSTAGRAM_CLIENT_ID":"0c3b36vlsedljil","INSTAGRAM_CLIENT_SECRET":"r5rcjmd22w0wq31","FACEBOOK_APP_ID":"712a7bfd4801443bafcca253e2fa05ef","FACEBOOK_APP_SECRET":"6ab01fce44a0467883e0af02f5486ff0","GOOGLE_CLIENT_ID":"457997349543-6vamfr7lcdli3g7ups2bubcvg4bnr0ie.apps.googleusercontent.com","GOOGLE_CLIENT_SECRET":"XOOoTscB04Zjqc04JvAS6mOL","ROLLBAR_CLIENT_TOKEN":"ad5c799fec6b4321bbefce7a39b72093","ROLLBAR_SERVER_TOKEN":"0b6e5aa764a948199bafa00407927b38","FCM_API_KEY":"AAAAaqLE8qc:APA91bGKmtxSVdBuOKbsSd_pSPpvyqA6hIkk9SbwpXje5GK-WOKCu0rSfpK7WS7XOncMHyTr3UyvVoKmFM5h5YG8RmC9hLDvwutyqJ2NUMOZPpG-8_Kxi26X3uO0cZiYj6LngyzjadhM","VAPID_PUBLIC_KEY":"BJ4QYD8rLzBxqWjz7bu-LNHgXKySMsIpOMcXc7Weq5rgPHsTtPIt303hhViecF-CUUGuh2WDIWLN_xPorx5EZvM","VAPID_PRIVATE_KEY":"ZNLVfNVxz4_zdurh-cueGqVtYgVIlKb3C7FW8H0NHCc","AWS_ACCESS_KEY_ID":"AKIAJGQBN7DJGZQOJS5A","AWS_SCRET_ACCESS_KEY":"4/9V6b39996bSZquf1YdBHbBRAMUZElkezDA4zd9","AWS_REGION":"us-east-1","AWS_BUCKET":"dev.cdn.mahaplatform.com","WEB_HOST":"http://localhost:8080","WEB_ASSET_HOST":"","DATA_ASSET_HOST":"http://dev.cdn.mahaplatform.com","WEB_ASSET_CDN_HOST":"","DATA_ASSET_CDNHOST":""}).ASSET_STORAGE === 'local') {

              files.map(function (Key) {

                _fs2.default.unlinkSync(_path2.default.join('public', Key));
              });
            }

          case 7:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, undefined);
  }));

  return function _deleteFiles(_x29) {
    return _ref15.apply(this, arguments);
  };
}();

var _deleteChunks = function () {
  var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16(asset) {
    var totalChunks, chunkArray, filepaths;
    return _regenerator2.default.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            totalChunks = parseInt(asset.get('chunks_total'));
            chunkArray = [].concat((0, _toConsumableArray3.default)(Array(parseInt(totalChunks))));
            filepaths = chunkArray.map(function (i, index) {

              return _getChunkFilename(asset.get('identifier'), index + 1);
            });

            if (!(Object({"APPS":["maha","maha-chat","maha-competencies","maha-crm","maha-drive","maha-eatfresh","maha-expenses","maha-platform","maha-team"],"DATABASE_URL":"postgres://postgres@localhost:5432/maha","REDIS_URL":"redis://localhost:6379/14","SECRET":"fsad8fsad78fdshbfwbhse78yfw","SERVER_PORT":8080,"SOCKET_PORT":8090,"DOMAIN":"mahaplatform.com","EMAIL_REDIRECT":"greg@thinktopography.com","EMAIL_DELIVERY":"ses","ASSET_SOTRAGE":"s3","MICROSOFT_APP_ID":"c54c9b91-e766-4829-a530-34107843fe8d","MICROSOFT_APP_SECRET":"arYWE56%=:aehenRXUT372~","BOX_CLIENT_ID":"t36h58btxlcqtudbz30raq1bduibhndz","BOX_CLIENT_SECRET":"oJ4248556NlnViGrGzH0BrbY47r0ipkQ","DROPBOX_APP_KEY":"0c3b36vlsedljil","DROPBOX_APP_SECRET":"r5rcjmd22w0wq31","INSTAGRAM_CLIENT_ID":"0c3b36vlsedljil","INSTAGRAM_CLIENT_SECRET":"r5rcjmd22w0wq31","FACEBOOK_APP_ID":"712a7bfd4801443bafcca253e2fa05ef","FACEBOOK_APP_SECRET":"6ab01fce44a0467883e0af02f5486ff0","GOOGLE_CLIENT_ID":"457997349543-6vamfr7lcdli3g7ups2bubcvg4bnr0ie.apps.googleusercontent.com","GOOGLE_CLIENT_SECRET":"XOOoTscB04Zjqc04JvAS6mOL","ROLLBAR_CLIENT_TOKEN":"ad5c799fec6b4321bbefce7a39b72093","ROLLBAR_SERVER_TOKEN":"0b6e5aa764a948199bafa00407927b38","FCM_API_KEY":"AAAAaqLE8qc:APA91bGKmtxSVdBuOKbsSd_pSPpvyqA6hIkk9SbwpXje5GK-WOKCu0rSfpK7WS7XOncMHyTr3UyvVoKmFM5h5YG8RmC9hLDvwutyqJ2NUMOZPpG-8_Kxi26X3uO0cZiYj6LngyzjadhM","VAPID_PUBLIC_KEY":"BJ4QYD8rLzBxqWjz7bu-LNHgXKySMsIpOMcXc7Weq5rgPHsTtPIt303hhViecF-CUUGuh2WDIWLN_xPorx5EZvM","VAPID_PRIVATE_KEY":"ZNLVfNVxz4_zdurh-cueGqVtYgVIlKb3C7FW8H0NHCc","AWS_ACCESS_KEY_ID":"AKIAJGQBN7DJGZQOJS5A","AWS_SCRET_ACCESS_KEY":"4/9V6b39996bSZquf1YdBHbBRAMUZElkezDA4zd9","AWS_REGION":"us-east-1","AWS_BUCKET":"dev.cdn.mahaplatform.com","WEB_HOST":"http://localhost:8080","WEB_ASSET_HOST":"","DATA_ASSET_HOST":"http://dev.cdn.mahaplatform.com","WEB_ASSET_CDN_HOST":"","DATA_ASSET_CDNHOST":""}).ASSET_STORAGE === 's3')) {
              _context16.next = 8;
              break;
            }

            _context16.next = 6;
            return s3.deleteObjects({
              Bucket: "dev.cdn.mahaplatform.com",
              Delete: {
                Objects: filepaths.map(function (Key) {
                  return { Key: Key };
                })
              }
            }).promise();

          case 6:
            _context16.next = 9;
            break;

          case 8:
            if (Object({"APPS":["maha","maha-chat","maha-competencies","maha-crm","maha-drive","maha-eatfresh","maha-expenses","maha-platform","maha-team"],"DATABASE_URL":"postgres://postgres@localhost:5432/maha","REDIS_URL":"redis://localhost:6379/14","SECRET":"fsad8fsad78fdshbfwbhse78yfw","SERVER_PORT":8080,"SOCKET_PORT":8090,"DOMAIN":"mahaplatform.com","EMAIL_REDIRECT":"greg@thinktopography.com","EMAIL_DELIVERY":"ses","ASSET_SOTRAGE":"s3","MICROSOFT_APP_ID":"c54c9b91-e766-4829-a530-34107843fe8d","MICROSOFT_APP_SECRET":"arYWE56%=:aehenRXUT372~","BOX_CLIENT_ID":"t36h58btxlcqtudbz30raq1bduibhndz","BOX_CLIENT_SECRET":"oJ4248556NlnViGrGzH0BrbY47r0ipkQ","DROPBOX_APP_KEY":"0c3b36vlsedljil","DROPBOX_APP_SECRET":"r5rcjmd22w0wq31","INSTAGRAM_CLIENT_ID":"0c3b36vlsedljil","INSTAGRAM_CLIENT_SECRET":"r5rcjmd22w0wq31","FACEBOOK_APP_ID":"712a7bfd4801443bafcca253e2fa05ef","FACEBOOK_APP_SECRET":"6ab01fce44a0467883e0af02f5486ff0","GOOGLE_CLIENT_ID":"457997349543-6vamfr7lcdli3g7ups2bubcvg4bnr0ie.apps.googleusercontent.com","GOOGLE_CLIENT_SECRET":"XOOoTscB04Zjqc04JvAS6mOL","ROLLBAR_CLIENT_TOKEN":"ad5c799fec6b4321bbefce7a39b72093","ROLLBAR_SERVER_TOKEN":"0b6e5aa764a948199bafa00407927b38","FCM_API_KEY":"AAAAaqLE8qc:APA91bGKmtxSVdBuOKbsSd_pSPpvyqA6hIkk9SbwpXje5GK-WOKCu0rSfpK7WS7XOncMHyTr3UyvVoKmFM5h5YG8RmC9hLDvwutyqJ2NUMOZPpG-8_Kxi26X3uO0cZiYj6LngyzjadhM","VAPID_PUBLIC_KEY":"BJ4QYD8rLzBxqWjz7bu-LNHgXKySMsIpOMcXc7Weq5rgPHsTtPIt303hhViecF-CUUGuh2WDIWLN_xPorx5EZvM","VAPID_PRIVATE_KEY":"ZNLVfNVxz4_zdurh-cueGqVtYgVIlKb3C7FW8H0NHCc","AWS_ACCESS_KEY_ID":"AKIAJGQBN7DJGZQOJS5A","AWS_SCRET_ACCESS_KEY":"4/9V6b39996bSZquf1YdBHbBRAMUZElkezDA4zd9","AWS_REGION":"us-east-1","AWS_BUCKET":"dev.cdn.mahaplatform.com","WEB_HOST":"http://localhost:8080","WEB_ASSET_HOST":"","DATA_ASSET_HOST":"http://dev.cdn.mahaplatform.com","WEB_ASSET_CDN_HOST":"","DATA_ASSET_CDNHOST":""}).ASSET_STORAGE === 'local') {

              (0, _bluebird.mapSeries)(filepaths, function (filepath, index) {

                _fs2.default.unlinkSync(_path2.default.join('public', filepath));
              });
            }

          case 9:
          case 'end':
            return _context16.stop();
        }
      }
    }, _callee16, undefined);
  }));

  return function _deleteChunks(_x30) {
    return _ref16.apply(this, arguments);
  };
}();

var _getAssembledData = function () {
  var _ref17 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee17(asset) {
    var chunks;
    return _regenerator2.default.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return _getChunks(asset);

          case 2:
            chunks = _context17.sent;
            return _context17.abrupt('return', Buffer.concat(chunks));

          case 4:
          case 'end':
            return _context17.stop();
        }
      }
    }, _callee17, undefined);
  }));

  return function _getAssembledData(_x31) {
    return _ref17.apply(this, arguments);
  };
}();

var _getNormalizedData = function () {
  var _ref18 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee18(asset, fileData) {
    var content_type, isImage;
    return _regenerator2.default.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            content_type = asset.get('content_type');
            isImage = content_type.match(/image/) && content_type !== 'image/gif';

            if (!isImage) {
              _context18.next = 8;
              break;
            }

            _context18.next = 5;
            return _rotateImage(fileData);

          case 5:
            _context18.t0 = _context18.sent;
            _context18.next = 9;
            break;

          case 8:
            _context18.t0 = fileData;

          case 9:
            return _context18.abrupt('return', _context18.t0);

          case 10:
          case 'end':
            return _context18.stop();
        }
      }
    }, _callee18, undefined);
  }));

  return function _getNormalizedData(_x32, _x33) {
    return _ref18.apply(this, arguments);
  };
}();

var _getPreviewData = function () {
  var _ref19 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee19(asset, fileData, ext) {
    var pdfData, email, emailData;
    return _regenerator2.default.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            if (!(asset.get('extension') === 'xlsx')) {
              _context19.next = 7;
              break;
            }

            _context19.next = 3;
            return _convertOfficeFormat(fileData, 'pdf');

          case 3:
            pdfData = _context19.sent;
            _context19.next = 6;
            return _convertOfficeFormat(pdfData, 'jpg');

          case 6:
            return _context19.abrupt('return', _context19.sent);

          case 7:
            if (!(asset.get('content_type') === 'message/rfc822')) {
              _context19.next = 13;
              break;
            }

            _context19.next = 10;
            return simpleParser(fileData);

          case 10:
            email = _context19.sent;
            emailData = email.html || email.textAsHtml;
            return _context19.abrupt('return', _convertHtml(emailData));

          case 13:
            if (!(asset.get('content_type') === 'text/html')) {
              _context19.next = 15;
              break;
            }

            return _context19.abrupt('return', _convertHtml(fileData));

          case 15:
            _context19.next = 17;
            return _convertOfficeFormat(fileData, 'jpg');

          case 17:
            return _context19.abrupt('return', _context19.sent);

          case 18:
          case 'end':
            return _context19.stop();
        }
      }
    }, _callee19, undefined);
  }));

  return function _getPreviewData(_x34, _x35, _x36) {
    return _ref19.apply(this, arguments);
  };
}();

var _convertOfficeFormat = function () {
  var _ref20 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee20(filedata, format) {
    var random, outDir, filePath, previewPath, previewData;
    return _regenerator2.default.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            random = _lodash2.default.random(100000000, 999999999).toString(36);
            outDir = _path2.default.join('.', 'tmp');
            filePath = _path2.default.join(outDir, random);
            previewPath = _path2.default.join(outDir, random + '.preview.' + format);


            _fs2.default.writeFileSync(filePath, filedata);

            _context20.next = 7;
            return execAsync('soffice --convert-to preview.' + format + ' --outdir ' + outDir + ' ' + filePath);

          case 7:
            previewData = new Buffer(_fs2.default.readFileSync(previewPath), 'binary');


            _fs2.default.unlinkSync(filePath);

            _fs2.default.unlinkSync(previewPath);

            return _context20.abrupt('return', previewData);

          case 11:
          case 'end':
            return _context20.stop();
        }
      }
    }, _callee20, undefined);
  }));

  return function _convertOfficeFormat(_x37, _x38) {
    return _ref20.apply(this, arguments);
  };
}();

var _convertHtml = function () {
  var _ref21 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee21(html) {
    return _regenerator2.default.wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            _context21.next = 2;
            return new _bluebird2.default(function (resolve, reject) {

              var options = {
                siteType: 'html',
                streamType: 'jpg',
                defaultWhiteBackground: true,
                shotSize: {
                  width: 'window',
                  height: 'all'
                }
              };

              var ws = (0, _webshot2.default)(html, options);

              var buffer = [];

              ws.on('data', function (data) {
                return buffer.push(data);
              });

              ws.on('error', function (err) {
                return reject(new Error(err));
              });

              ws.on('end', function () {
                return resolve(Buffer.concat(buffer));
              });
            });

          case 2:
            return _context21.abrupt('return', _context21.sent);

          case 3:
          case 'end':
            return _context21.stop();
        }
      }
    }, _callee21, undefined);
  }));

  return function _convertHtml(_x39) {
    return _ref21.apply(this, arguments);
  };
}();

var _unlinkChunk = function () {
  var _ref22 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee22(filepath) {
    return _regenerator2.default.wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:

            _fs2.default.unlinkSync(filepath);

          case 1:
          case 'end':
            return _context22.stop();
        }
      }
    }, _callee22, undefined);
  }));

  return function _unlinkChunk(_x40) {
    return _ref22.apply(this, arguments);
  };
}();

var _rotateImage = function () {
  var _ref23 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee23(data) {
    var image;
    return _regenerator2.default.wrap(function _callee23$(_context23) {
      while (1) {
        switch (_context23.prev = _context23.next) {
          case 0:
            _context23.next = 2;
            return _jimp2.default.read(data);

          case 2:
            image = _context23.sent;

            if (image) {
              _context23.next = 5;
              break;
            }

            return _context23.abrupt('return', data);

          case 5:

            image.exifRotate();

            _context23.next = 8;
            return new _bluebird2.default(function (resolve, reject) {

              image.getBuffer(image.getMIME(), function (err, buffer) {

                if (err) reject(new Error(err));

                resolve(buffer);
              });
            });

          case 8:
            return _context23.abrupt('return', _context23.sent);

          case 9:
          case 'end':
            return _context23.stop();
        }
      }
    }, _callee23, undefined);
  }));

  return function _rotateImage(_x41) {
    return _ref23.apply(this, arguments);
  };
}();

var s3 = null;

var _getS3 = function _getS3() {

  if (s3) return s3;

  s3 = new _aws2.default.S3();

  return s3;
};

var _cleanIdentifier = function _cleanIdentifier(identifier) {
  return identifier.replace(/^0-9A-Za-z_-/img, '');
};

var _getChunkFilename = function _getChunkFilename(identifier, chunkNumber) {
  return _path2.default.join('.', 'tmp', _cleanIdentifier(identifier) + '.' + chunkNumber);
};

/***/ }),

/***/ "./apps/maha/src/services/attachment.js":
/*!**********************************************!*\
  !*** ./apps/maha/src/services/attachment.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractAttachments = undefined;

var _bluebird = __webpack_require__(/*! bluebird */ "bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

var _extends2 = __webpack_require__(/*! babel-runtime/helpers/extends */ "./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "./node_modules/babel-runtime/helpers/asyncToGenerator.js");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _toConsumableArray2 = __webpack_require__(/*! babel-runtime/helpers/toConsumableArray */ "./node_modules/babel-runtime/helpers/toConsumableArray.js");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _attachment = __webpack_require__(/*! ../models/attachment */ "./apps/maha/src/models/attachment.js");

var _attachment2 = _interopRequireDefault(_attachment);

var _service = __webpack_require__(/*! ../models/service */ "./apps/maha/src/models/service.js");

var _service2 = _interopRequireDefault(_service);

var _getUrls = __webpack_require__(/*! get-urls */ "get-urls");

var _getUrls2 = _interopRequireDefault(_getUrls);

var _cheerio = __webpack_require__(/*! cheerio */ "cheerio");

var _cheerio2 = _interopRequireDefault(_cheerio);

var _request = __webpack_require__(/*! request */ "request");

var _request2 = _interopRequireDefault(_request);

var _openGraph = __webpack_require__(/*! open-graph */ "open-graph");

var _openGraph2 = _interopRequireDefault(_openGraph);

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _url = __webpack_require__(/*! url */ "url");

var _url2 = _interopRequireDefault(_url);

var _os = __webpack_require__(/*! os */ "os");

var _os2 = _interopRequireDefault(_os);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ifaces = _os2.default.networkInterfaces();

var domains = ['localhost', 'dev.mahaplatform.com', "mahaplatform.com"].concat((0, _toConsumableArray3.default)(!_lodash2.default.isEmpty("http://dev.cdn.mahaplatform.com") ? [_url2.default.parse("http://dev.cdn.mahaplatform.com").hostname] : []), (0, _toConsumableArray3.default)(!_lodash2.default.isEmpty(Object({"APPS":["maha","maha-chat","maha-competencies","maha-crm","maha-drive","maha-eatfresh","maha-expenses","maha-platform","maha-team"],"DATABASE_URL":"postgres://postgres@localhost:5432/maha","REDIS_URL":"redis://localhost:6379/14","SECRET":"fsad8fsad78fdshbfwbhse78yfw","SERVER_PORT":8080,"SOCKET_PORT":8090,"DOMAIN":"mahaplatform.com","EMAIL_REDIRECT":"greg@thinktopography.com","EMAIL_DELIVERY":"ses","ASSET_SOTRAGE":"s3","MICROSOFT_APP_ID":"c54c9b91-e766-4829-a530-34107843fe8d","MICROSOFT_APP_SECRET":"arYWE56%=:aehenRXUT372~","BOX_CLIENT_ID":"t36h58btxlcqtudbz30raq1bduibhndz","BOX_CLIENT_SECRET":"oJ4248556NlnViGrGzH0BrbY47r0ipkQ","DROPBOX_APP_KEY":"0c3b36vlsedljil","DROPBOX_APP_SECRET":"r5rcjmd22w0wq31","INSTAGRAM_CLIENT_ID":"0c3b36vlsedljil","INSTAGRAM_CLIENT_SECRET":"r5rcjmd22w0wq31","FACEBOOK_APP_ID":"712a7bfd4801443bafcca253e2fa05ef","FACEBOOK_APP_SECRET":"6ab01fce44a0467883e0af02f5486ff0","GOOGLE_CLIENT_ID":"457997349543-6vamfr7lcdli3g7ups2bubcvg4bnr0ie.apps.googleusercontent.com","GOOGLE_CLIENT_SECRET":"XOOoTscB04Zjqc04JvAS6mOL","ROLLBAR_CLIENT_TOKEN":"ad5c799fec6b4321bbefce7a39b72093","ROLLBAR_SERVER_TOKEN":"0b6e5aa764a948199bafa00407927b38","FCM_API_KEY":"AAAAaqLE8qc:APA91bGKmtxSVdBuOKbsSd_pSPpvyqA6hIkk9SbwpXje5GK-WOKCu0rSfpK7WS7XOncMHyTr3UyvVoKmFM5h5YG8RmC9hLDvwutyqJ2NUMOZPpG-8_Kxi26X3uO0cZiYj6LngyzjadhM","VAPID_PUBLIC_KEY":"BJ4QYD8rLzBxqWjz7bu-LNHgXKySMsIpOMcXc7Weq5rgPHsTtPIt303hhViecF-CUUGuh2WDIWLN_xPorx5EZvM","VAPID_PRIVATE_KEY":"ZNLVfNVxz4_zdurh-cueGqVtYgVIlKb3C7FW8H0NHCc","AWS_ACCESS_KEY_ID":"AKIAJGQBN7DJGZQOJS5A","AWS_SCRET_ACCESS_KEY":"4/9V6b39996bSZquf1YdBHbBRAMUZElkezDA4zd9","AWS_REGION":"us-east-1","AWS_BUCKET":"dev.cdn.mahaplatform.com","WEB_HOST":"http://localhost:8080","WEB_ASSET_HOST":"","DATA_ASSET_HOST":"http://dev.cdn.mahaplatform.com","WEB_ASSET_CDN_HOST":"","DATA_ASSET_CDNHOST":""}).DATA_ASSET_CDN_HOST) ? [_url2.default.parse(Object({"APPS":["maha","maha-chat","maha-competencies","maha-crm","maha-drive","maha-eatfresh","maha-expenses","maha-platform","maha-team"],"DATABASE_URL":"postgres://postgres@localhost:5432/maha","REDIS_URL":"redis://localhost:6379/14","SECRET":"fsad8fsad78fdshbfwbhse78yfw","SERVER_PORT":8080,"SOCKET_PORT":8090,"DOMAIN":"mahaplatform.com","EMAIL_REDIRECT":"greg@thinktopography.com","EMAIL_DELIVERY":"ses","ASSET_SOTRAGE":"s3","MICROSOFT_APP_ID":"c54c9b91-e766-4829-a530-34107843fe8d","MICROSOFT_APP_SECRET":"arYWE56%=:aehenRXUT372~","BOX_CLIENT_ID":"t36h58btxlcqtudbz30raq1bduibhndz","BOX_CLIENT_SECRET":"oJ4248556NlnViGrGzH0BrbY47r0ipkQ","DROPBOX_APP_KEY":"0c3b36vlsedljil","DROPBOX_APP_SECRET":"r5rcjmd22w0wq31","INSTAGRAM_CLIENT_ID":"0c3b36vlsedljil","INSTAGRAM_CLIENT_SECRET":"r5rcjmd22w0wq31","FACEBOOK_APP_ID":"712a7bfd4801443bafcca253e2fa05ef","FACEBOOK_APP_SECRET":"6ab01fce44a0467883e0af02f5486ff0","GOOGLE_CLIENT_ID":"457997349543-6vamfr7lcdli3g7ups2bubcvg4bnr0ie.apps.googleusercontent.com","GOOGLE_CLIENT_SECRET":"XOOoTscB04Zjqc04JvAS6mOL","ROLLBAR_CLIENT_TOKEN":"ad5c799fec6b4321bbefce7a39b72093","ROLLBAR_SERVER_TOKEN":"0b6e5aa764a948199bafa00407927b38","FCM_API_KEY":"AAAAaqLE8qc:APA91bGKmtxSVdBuOKbsSd_pSPpvyqA6hIkk9SbwpXje5GK-WOKCu0rSfpK7WS7XOncMHyTr3UyvVoKmFM5h5YG8RmC9hLDvwutyqJ2NUMOZPpG-8_Kxi26X3uO0cZiYj6LngyzjadhM","VAPID_PUBLIC_KEY":"BJ4QYD8rLzBxqWjz7bu-LNHgXKySMsIpOMcXc7Weq5rgPHsTtPIt303hhViecF-CUUGuh2WDIWLN_xPorx5EZvM","VAPID_PRIVATE_KEY":"ZNLVfNVxz4_zdurh-cueGqVtYgVIlKb3C7FW8H0NHCc","AWS_ACCESS_KEY_ID":"AKIAJGQBN7DJGZQOJS5A","AWS_SCRET_ACCESS_KEY":"4/9V6b39996bSZquf1YdBHbBRAMUZElkezDA4zd9","AWS_REGION":"us-east-1","AWS_BUCKET":"dev.cdn.mahaplatform.com","WEB_HOST":"http://localhost:8080","WEB_ASSET_HOST":"","DATA_ASSET_HOST":"http://dev.cdn.mahaplatform.com","WEB_ASSET_CDN_HOST":"","DATA_ASSET_CDNHOST":""}).DATA_ASSET_CDN_HOST).hostname] : []));

var localhosts = Object.keys(ifaces).reduce(function (ips, iface) {
  return [].concat((0, _toConsumableArray3.default)(ips), (0, _toConsumableArray3.default)(ifaces[iface].map(function (adapter) {
    return adapter.address;
  })));
}, domains);

var download = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(url) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return new _bluebird2.default(function (resolve, reject) {

              (0, _request2.default)({
                url: url,
                rejectUnauthorized: false,
                encoding: 'utf8',
                gzip: true,
                jar: true
              }, function (err, res, body) {

                if (err) return reject(err);

                return resolve(res);
              });
            });

          case 2:
            return _context.abrupt('return', _context.sent);

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function download(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getMetaData = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(url, trx) {
    var uri, response, type;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            uri = _url2.default.parse(url);

            if (!_lodash2.default.includes(localhosts, uri.hostname)) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt('return', processLocalUrl(url, uri));

          case 3:
            _context2.next = 5;
            return download(url);

          case 5:
            response = _context2.sent;

            if (!(response.statusCode !== 200)) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt('return', null);

          case 8:
            type = response.headers['content-type'].split('/')[0];

            if (!(type === 'image')) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt('return', processImageUrl(url, response));

          case 11:
            return _context2.abrupt('return', processOpenGraphUrl(uri, url, response, trx));

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getMetaData(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var processLocalUrl = function processLocalUrl(url, uri) {

  var matches = uri.pathname.match(/assets\/(\d*)\/.*/);

  if (matches) return {
    type: 'asset',
    asset_id: matches[1],
    title_link: url
  };

  return processLocalPathname(uri.pathname);
};

var processLocalPathname = function processLocalPathname(pathname) {

  return {
    type: 'local',
    title_link: pathname
  };
};

var processImageUrl = function processImageUrl(url, response) {
  return {
    type: 'image',
    image_url: url
  };
};

var processOpenGraphUrl = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(uri, url, response, trx) {
    var meta, $, service;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            meta = _openGraph2.default.parse(response.body);
            $ = _cheerio2.default.load(response.body);
            _context3.next = 4;
            return getService($, url, trx);

          case 4:
            service = _context3.sent;

            if (!(Object.keys(meta).length > 0)) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt('return', (0, _extends3.default)({
              service_id: service.get('id'),
              text: meta.description ? meta.description.substr(0, 255) : '',
              title: meta.title,
              title_link: meta.url,
              type: getType(meta)
            }, getImage(uri, meta.image), getVideo(uri, meta.video)));

          case 7:
            return _context3.abrupt('return', {
              service_id: service.get('id'),
              text: $('meta[name=description]').attr('content') || $('meta[name=Description]').attr('content') || '',
              title: $('title').eq(0).text(),
              title_link: url,
              type: 'link'
            });

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function processOpenGraphUrl(_x4, _x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

var unpackOgArray = function unpackOgArray(value) {

  if (!value) return null;

  if (_lodash2.default.isArray(value)) return value[0];

  return value;
};

var getService = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4($, url, trx) {
    var uri, name, service, icons, href, icon;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            uri = _url2.default.parse(url);
            name = uri.hostname;
            _context4.next = 4;
            return _service2.default.where({ name: name }).fetch({ transacting: trx });

          case 4:
            service = _context4.sent;

            if (!service) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt('return', service);

          case 7:
            icons = [].concat((0, _toConsumableArray3.default)($('link[rel="icon"]').toArray()), (0, _toConsumableArray3.default)($('link[rel="shortcut icon"]').toArray()), (0, _toConsumableArray3.default)($('link[rel="Shortcut Icon"]').toArray()), (0, _toConsumableArray3.default)($('link[rel="apple-touch-icon"]').toArray()), (0, _toConsumableArray3.default)($('link[rel="image_src"]').toArray())).sort(function (a, b) {
              if (a.attribs.sizes > b.attribs.sizes) return -1;
              if (a.attribs.sizes < b.attribs.sizes) return 1;
              return 0;
            });
            href = icons.length > 0 ? icons[0].attribs.href : null;
            icon = href ? absoluteUrl(uri, href) : null;
            _context4.next = 12;
            return _service2.default.forge({ name: name, icon: icon }).save(null, { transacting: trx });

          case 12:
            return _context4.abrupt('return', _context4.sent);

          case 13:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function getService(_x8, _x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();

var getType = function getType(meta) {

  if (meta.type.match(/video/)) return 'video';

  return 'link';
};

var getImage = function getImage(uri, image) {

  if (!image) return {};

  var image_url = image.secure_url ? unpackOgArray(image.secure_url) : unpackOgArray(image.url);

  return {
    image_url: absoluteUrl(uri, image_url),
    image_width: unpackOgArray(image.width),
    image_height: unpackOgArray(image.height)
  };
};

var getVideo = function getVideo(uri, video) {

  if (!video) return {};

  var video_url = video.secure_url ? unpackOgArray(video.secure_url) : unpackOgArray(video.url);

  return {
    video_url: absoluteUrl(uri, video_url),
    video_width: unpackOgArray(video.width),
    video_height: unpackOgArray(video.height)
  };
};

var absoluteUrl = function absoluteUrl(uri, url) {

  return _url2.default.resolve(uri.protocol + '//' + uri.host + '/' + uri.pathname, url);
};

var createAttachment = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(attachable, index, url, trx) {
    var meta, data;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return getMetaData(url, trx);

          case 2:
            meta = _context5.sent;

            if (meta) {
              _context5.next = 5;
              break;
            }

            return _context5.abrupt('return', null);

          case 5:
            data = (0, _extends3.default)({
              team_id: attachable.get('team_id'),
              attachable_type: attachable.tableName,
              attachable_id: attachable.get('id'),
              delta: index,
              from_url: url
            }, meta);
            _context5.next = 8;
            return _attachment2.default.forge(data).save(null, { transacting: trx });

          case 8:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function createAttachment(_x11, _x12, _x13, _x14) {
    return _ref5.apply(this, arguments);
  };
}();

var extractAttachments = exports.extractAttachments = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(attachable, text, trx) {
    var urls;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            urls = (0, _getUrls2.default)(text, {
              sortQueryParameters: false,
              removeTrailingSlash: true,
              stripWWW: false,
              stripFragment: false,
              normalizeProtocol: false
            });

            if (!(urls.size === 0)) {
              _context7.next = 3;
              break;
            }

            return _context7.abrupt('return');

          case 3:
            _context7.next = 5;
            return (0, _bluebird.mapSeries)(urls, function () {
              var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(url, index) {
                var normalizedUrl;
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        normalizedUrl = normalizeUrl(text, url);
                        _context6.next = 3;
                        return createAttachment(attachable, index, normalizedUrl, trx);

                      case 3:
                      case 'end':
                        return _context6.stop();
                    }
                  }
                }, _callee6, undefined);
              }));

              return function (_x18, _x19) {
                return _ref7.apply(this, arguments);
              };
            }());

          case 5:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function extractAttachments(_x15, _x16, _x17) {
    return _ref6.apply(this, arguments);
  };
}();

var normalizeUrl = function normalizeUrl(text, url) {

  var normalized = url.replace('?null', '');

  if (text.search(normalized) < 0) {
    normalized = normalized.replace(/\/+$/, '');
  }

  return normalized;
};

/***/ }),

/***/ "./node_modules/babel-runtime/core-js/array/from.js":
/*!**********************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/array/from.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/array/from */ "./node_modules/core-js/library/fn/array/from.js"), __esModule: true };

/***/ }),

/***/ "./node_modules/babel-runtime/core-js/get-iterator.js":
/*!************************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/get-iterator.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/get-iterator */ "./node_modules/core-js/library/fn/get-iterator.js"), __esModule: true };

/***/ }),

/***/ "./node_modules/babel-runtime/core-js/is-iterable.js":
/*!***********************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/is-iterable.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/is-iterable */ "./node_modules/core-js/library/fn/is-iterable.js"), __esModule: true };

/***/ }),

/***/ "./node_modules/babel-runtime/core-js/object/assign.js":
/*!*************************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/object/assign.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/assign */ "./node_modules/core-js/library/fn/object/assign.js"), __esModule: true };

/***/ }),

/***/ "./node_modules/babel-runtime/core-js/object/define-property.js":
/*!**********************************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/object/define-property.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/define-property */ "./node_modules/core-js/library/fn/object/define-property.js"), __esModule: true };

/***/ }),

/***/ "./node_modules/babel-runtime/core-js/promise.js":
/*!*******************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/promise.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/promise */ "./node_modules/core-js/library/fn/promise.js"), __esModule: true };

/***/ }),

/***/ "./node_modules/babel-runtime/helpers/asyncToGenerator.js":
/*!****************************************************************!*\
  !*** ./node_modules/babel-runtime/helpers/asyncToGenerator.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _promise = __webpack_require__(/*! ../core-js/promise */ "./node_modules/babel-runtime/core-js/promise.js");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

/***/ }),

/***/ "./node_modules/babel-runtime/helpers/classCallCheck.js":
/*!**************************************************************!*\
  !*** ./node_modules/babel-runtime/helpers/classCallCheck.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),

/***/ "./node_modules/babel-runtime/helpers/createClass.js":
/*!***********************************************************!*\
  !*** ./node_modules/babel-runtime/helpers/createClass.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(/*! ../core-js/object/define-property */ "./node_modules/babel-runtime/core-js/object/define-property.js");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),

/***/ "./node_modules/babel-runtime/helpers/defineProperty.js":
/*!**************************************************************!*\
  !*** ./node_modules/babel-runtime/helpers/defineProperty.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(/*! ../core-js/object/define-property */ "./node_modules/babel-runtime/core-js/object/define-property.js");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),

/***/ "./node_modules/babel-runtime/helpers/extends.js":
/*!*******************************************************!*\
  !*** ./node_modules/babel-runtime/helpers/extends.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(/*! ../core-js/object/assign */ "./node_modules/babel-runtime/core-js/object/assign.js");

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),

/***/ "./node_modules/babel-runtime/helpers/slicedToArray.js":
/*!*************************************************************!*\
  !*** ./node_modules/babel-runtime/helpers/slicedToArray.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(/*! ../core-js/is-iterable */ "./node_modules/babel-runtime/core-js/is-iterable.js");

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(/*! ../core-js/get-iterator */ "./node_modules/babel-runtime/core-js/get-iterator.js");

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),

/***/ "./node_modules/babel-runtime/helpers/toConsumableArray.js":
/*!*****************************************************************!*\
  !*** ./node_modules/babel-runtime/helpers/toConsumableArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(/*! ../core-js/array/from */ "./node_modules/babel-runtime/core-js/array/from.js");

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),

/***/ "./node_modules/babel-runtime/regenerator/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/babel-runtime/regenerator/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "regenerator-runtime");


/***/ }),

/***/ "./node_modules/core-js/library/fn/array/from.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/library/fn/array/from.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.string.iterator */ "./node_modules/core-js/library/modules/es6.string.iterator.js");
__webpack_require__(/*! ../../modules/es6.array.from */ "./node_modules/core-js/library/modules/es6.array.from.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/core-js/library/modules/_core.js").Array.from;


/***/ }),

/***/ "./node_modules/core-js/library/fn/get-iterator.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/fn/get-iterator.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/web.dom.iterable */ "./node_modules/core-js/library/modules/web.dom.iterable.js");
__webpack_require__(/*! ../modules/es6.string.iterator */ "./node_modules/core-js/library/modules/es6.string.iterator.js");
module.exports = __webpack_require__(/*! ../modules/core.get-iterator */ "./node_modules/core-js/library/modules/core.get-iterator.js");


/***/ }),

/***/ "./node_modules/core-js/library/fn/is-iterable.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/library/fn/is-iterable.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/web.dom.iterable */ "./node_modules/core-js/library/modules/web.dom.iterable.js");
__webpack_require__(/*! ../modules/es6.string.iterator */ "./node_modules/core-js/library/modules/es6.string.iterator.js");
module.exports = __webpack_require__(/*! ../modules/core.is-iterable */ "./node_modules/core-js/library/modules/core.is-iterable.js");


/***/ }),

/***/ "./node_modules/core-js/library/fn/object/assign.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/fn/object/assign.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.assign */ "./node_modules/core-js/library/modules/es6.object.assign.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/core-js/library/modules/_core.js").Object.assign;


/***/ }),

/***/ "./node_modules/core-js/library/fn/object/define-property.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/library/fn/object/define-property.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.define-property */ "./node_modules/core-js/library/modules/es6.object.define-property.js");
var $Object = __webpack_require__(/*! ../../modules/_core */ "./node_modules/core-js/library/modules/_core.js").Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ "./node_modules/core-js/library/fn/promise.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/library/fn/promise.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.object.to-string */ "./node_modules/core-js/library/modules/es6.object.to-string.js");
__webpack_require__(/*! ../modules/es6.string.iterator */ "./node_modules/core-js/library/modules/es6.string.iterator.js");
__webpack_require__(/*! ../modules/web.dom.iterable */ "./node_modules/core-js/library/modules/web.dom.iterable.js");
__webpack_require__(/*! ../modules/es6.promise */ "./node_modules/core-js/library/modules/es6.promise.js");
__webpack_require__(/*! ../modules/es7.promise.finally */ "./node_modules/core-js/library/modules/es7.promise.finally.js");
__webpack_require__(/*! ../modules/es7.promise.try */ "./node_modules/core-js/library/modules/es7.promise.try.js");
module.exports = __webpack_require__(/*! ../modules/_core */ "./node_modules/core-js/library/modules/_core.js").Promise;


/***/ }),

/***/ "./node_modules/core-js/library/modules/_a-function.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_a-function.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_add-to-unscopables.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_add-to-unscopables.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),

/***/ "./node_modules/core-js/library/modules/_an-instance.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_an-instance.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_an-object.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_an-object.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/library/modules/_is-object.js");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_array-includes.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_array-includes.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/library/modules/_to-iobject.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/library/modules/_to-length.js");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/core-js/library/modules/_to-absolute-index.js");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_classof.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_classof.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/library/modules/_cof.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_cof.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_cof.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_core.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_core.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/library/modules/_create-property.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_create-property.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/library/modules/_object-dp.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/library/modules/_property-desc.js");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_ctx.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_ctx.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/library/modules/_a-function.js");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_defined.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_defined.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_descriptors.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_descriptors.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/library/modules/_fails.js")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/library/modules/_dom-create.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_dom-create.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/library/modules/_is-object.js");
var document = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_enum-bug-keys.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_enum-bug-keys.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "./node_modules/core-js/library/modules/_export.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_export.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/library/modules/_core.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/library/modules/_ctx.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/library/modules/_hide.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/library/modules/_has.js");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "./node_modules/core-js/library/modules/_fails.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_fails.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_for-of.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_for-of.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/library/modules/_ctx.js");
var call = __webpack_require__(/*! ./_iter-call */ "./node_modules/core-js/library/modules/_iter-call.js");
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ "./node_modules/core-js/library/modules/_is-array-iter.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/library/modules/_an-object.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/library/modules/_to-length.js");
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ "./node_modules/core-js/library/modules/core.get-iterator-method.js");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ "./node_modules/core-js/library/modules/_global.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_global.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/library/modules/_has.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_has.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_hide.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_hide.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/library/modules/_object-dp.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/library/modules/_property-desc.js");
module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/library/modules/_descriptors.js") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_html.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_html.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "./node_modules/core-js/library/modules/_ie8-dom-define.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_ie8-dom-define.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/library/modules/_descriptors.js") && !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/library/modules/_fails.js")(function () {
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/library/modules/_dom-create.js")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/library/modules/_invoke.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_invoke.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_iobject.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iobject.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/library/modules/_cof.js");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_is-array-iter.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_is-array-iter.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/library/modules/_iterators.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_is-object.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_is-object.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_iter-call.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iter-call.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/library/modules/_an-object.js");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_iter-create.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iter-create.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/library/modules/_object-create.js");
var descriptor = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/library/modules/_property-desc.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/library/modules/_set-to-string-tag.js");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ "./node_modules/core-js/library/modules/_hide.js")(IteratorPrototype, __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_iter-define.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iter-define.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/core-js/library/modules/_library.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/library/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/library/modules/_redefine.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/library/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/library/modules/_iterators.js");
var $iterCreate = __webpack_require__(/*! ./_iter-create */ "./node_modules/core-js/library/modules/_iter-create.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/library/modules/_set-to-string-tag.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/library/modules/_object-gpo.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_iter-detect.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iter-detect.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_iter-step.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iter-step.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_iterators.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iterators.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_library.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_library.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),

/***/ "./node_modules/core-js/library/modules/_microtask.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_microtask.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js");
var macrotask = __webpack_require__(/*! ./_task */ "./node_modules/core-js/library/modules/_task.js").set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/library/modules/_cof.js")(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_new-promise-capability.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_new-promise-capability.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/library/modules/_a-function.js");

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-assign.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-assign.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/library/modules/_object-keys.js");
var gOPS = __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/library/modules/_object-gops.js");
var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/library/modules/_object-pie.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/library/modules/_to-object.js");
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/library/modules/_iobject.js");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(/*! ./_fails */ "./node_modules/core-js/library/modules/_fails.js")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-create.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-create.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/library/modules/_an-object.js");
var dPs = __webpack_require__(/*! ./_object-dps */ "./node_modules/core-js/library/modules/_object-dps.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/library/modules/_enum-bug-keys.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/library/modules/_shared-key.js")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/library/modules/_dom-create.js")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ "./node_modules/core-js/library/modules/_html.js").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-dp.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-dp.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/library/modules/_an-object.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/core-js/library/modules/_ie8-dom-define.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/library/modules/_to-primitive.js");
var dP = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/library/modules/_descriptors.js") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-dps.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-dps.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/library/modules/_object-dp.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/library/modules/_an-object.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/library/modules/_object-keys.js");

module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/library/modules/_descriptors.js") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-gops.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-gops.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-gpo.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-gpo.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/library/modules/_has.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/library/modules/_to-object.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/library/modules/_shared-key.js")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-keys-internal.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-keys-internal.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/library/modules/_has.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/library/modules/_to-iobject.js");
var arrayIndexOf = __webpack_require__(/*! ./_array-includes */ "./node_modules/core-js/library/modules/_array-includes.js")(false);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/library/modules/_shared-key.js")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-keys.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-keys.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "./node_modules/core-js/library/modules/_object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/library/modules/_enum-bug-keys.js");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-pie.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-pie.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "./node_modules/core-js/library/modules/_perform.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_perform.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_promise-resolve.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_promise-resolve.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/library/modules/_an-object.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/library/modules/_is-object.js");
var newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ "./node_modules/core-js/library/modules/_new-promise-capability.js");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_property-desc.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_property-desc.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_redefine-all.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_redefine-all.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/library/modules/_hide.js");
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_redefine.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_redefine.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/library/modules/_hide.js");


/***/ }),

/***/ "./node_modules/core-js/library/modules/_set-species.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_set-species.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/library/modules/_core.js");
var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/library/modules/_object-dp.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/library/modules/_descriptors.js");
var SPECIES = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js")('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_set-to-string-tag.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_set-to-string-tag.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/library/modules/_object-dp.js").f;
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/library/modules/_has.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_shared-key.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_shared-key.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/library/modules/_shared.js")('keys');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/library/modules/_uid.js");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_shared.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_shared.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/library/modules/_core.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(/*! ./_library */ "./node_modules/core-js/library/modules/_library.js") ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "./node_modules/core-js/library/modules/_species-constructor.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_species-constructor.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/library/modules/_an-object.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/library/modules/_a-function.js");
var SPECIES = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_string-at.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_string-at.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/library/modules/_to-integer.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/library/modules/_defined.js");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_task.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_task.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/library/modules/_ctx.js");
var invoke = __webpack_require__(/*! ./_invoke */ "./node_modules/core-js/library/modules/_invoke.js");
var html = __webpack_require__(/*! ./_html */ "./node_modules/core-js/library/modules/_html.js");
var cel = __webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/library/modules/_dom-create.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js");
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(/*! ./_cof */ "./node_modules/core-js/library/modules/_cof.js")(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-absolute-index.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-absolute-index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/library/modules/_to-integer.js");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-integer.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-integer.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-iobject.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-iobject.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/library/modules/_iobject.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/library/modules/_defined.js");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-length.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-length.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/library/modules/_to-integer.js");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-object.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-object.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/library/modules/_defined.js");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-primitive.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-primitive.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/library/modules/_is-object.js");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_uid.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_uid.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_user-agent.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_user-agent.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js");
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),

/***/ "./node_modules/core-js/library/modules/_wks.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_wks.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/library/modules/_shared.js")('wks');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/library/modules/_uid.js");
var Symbol = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "./node_modules/core-js/library/modules/core.get-iterator-method.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js/library/modules/core.get-iterator-method.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./_classof */ "./node_modules/core-js/library/modules/_classof.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js")('iterator');
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/library/modules/_iterators.js");
module.exports = __webpack_require__(/*! ./_core */ "./node_modules/core-js/library/modules/_core.js").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/core.get-iterator.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/core.get-iterator.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/library/modules/_an-object.js");
var get = __webpack_require__(/*! ./core.get-iterator-method */ "./node_modules/core-js/library/modules/core.get-iterator-method.js");
module.exports = __webpack_require__(/*! ./_core */ "./node_modules/core-js/library/modules/_core.js").getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/core.is-iterable.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/core.is-iterable.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./_classof */ "./node_modules/core-js/library/modules/_classof.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js")('iterator');
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/library/modules/_iterators.js");
module.exports = __webpack_require__(/*! ./_core */ "./node_modules/core-js/library/modules/_core.js").isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.array.from.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.array.from.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/library/modules/_ctx.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/library/modules/_export.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/library/modules/_to-object.js");
var call = __webpack_require__(/*! ./_iter-call */ "./node_modules/core-js/library/modules/_iter-call.js");
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ "./node_modules/core-js/library/modules/_is-array-iter.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/library/modules/_to-length.js");
var createProperty = __webpack_require__(/*! ./_create-property */ "./node_modules/core-js/library/modules/_create-property.js");
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ "./node_modules/core-js/library/modules/core.get-iterator-method.js");

$export($export.S + $export.F * !__webpack_require__(/*! ./_iter-detect */ "./node_modules/core-js/library/modules/_iter-detect.js")(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.array.iterator.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.array.iterator.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/library/modules/_add-to-unscopables.js");
var step = __webpack_require__(/*! ./_iter-step */ "./node_modules/core-js/library/modules/_iter-step.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/library/modules/_iterators.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/library/modules/_to-iobject.js");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(/*! ./_iter-define */ "./node_modules/core-js/library/modules/_iter-define.js")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.object.assign.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.assign.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/library/modules/_export.js");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(/*! ./_object-assign */ "./node_modules/core-js/library/modules/_object-assign.js") });


/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.object.define-property.js":
/*!****************************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.define-property.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/library/modules/_export.js");
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/library/modules/_descriptors.js"), 'Object', { defineProperty: __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/library/modules/_object-dp.js").f });


/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.object.to-string.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.to-string.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.promise.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.promise.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/core-js/library/modules/_library.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/library/modules/_ctx.js");
var classof = __webpack_require__(/*! ./_classof */ "./node_modules/core-js/library/modules/_classof.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/library/modules/_export.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/library/modules/_is-object.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/library/modules/_a-function.js");
var anInstance = __webpack_require__(/*! ./_an-instance */ "./node_modules/core-js/library/modules/_an-instance.js");
var forOf = __webpack_require__(/*! ./_for-of */ "./node_modules/core-js/library/modules/_for-of.js");
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ "./node_modules/core-js/library/modules/_species-constructor.js");
var task = __webpack_require__(/*! ./_task */ "./node_modules/core-js/library/modules/_task.js").set;
var microtask = __webpack_require__(/*! ./_microtask */ "./node_modules/core-js/library/modules/_microtask.js")();
var newPromiseCapabilityModule = __webpack_require__(/*! ./_new-promise-capability */ "./node_modules/core-js/library/modules/_new-promise-capability.js");
var perform = __webpack_require__(/*! ./_perform */ "./node_modules/core-js/library/modules/_perform.js");
var userAgent = __webpack_require__(/*! ./_user-agent */ "./node_modules/core-js/library/modules/_user-agent.js");
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ "./node_modules/core-js/library/modules/_promise-resolve.js");
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js")('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(/*! ./_redefine-all */ "./node_modules/core-js/library/modules/_redefine-all.js")($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/library/modules/_set-to-string-tag.js")($Promise, PROMISE);
__webpack_require__(/*! ./_set-species */ "./node_modules/core-js/library/modules/_set-species.js")(PROMISE);
Wrapper = __webpack_require__(/*! ./_core */ "./node_modules/core-js/library/modules/_core.js")[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(/*! ./_iter-detect */ "./node_modules/core-js/library/modules/_iter-detect.js")(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.string.iterator.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.string.iterator.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(/*! ./_string-at */ "./node_modules/core-js/library/modules/_string-at.js")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(/*! ./_iter-define */ "./node_modules/core-js/library/modules/_iter-define.js")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "./node_modules/core-js/library/modules/es7.promise.finally.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es7.promise.finally.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/library/modules/_export.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/library/modules/_core.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js");
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ "./node_modules/core-js/library/modules/_species-constructor.js");
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ "./node_modules/core-js/library/modules/_promise-resolve.js");

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),

/***/ "./node_modules/core-js/library/modules/es7.promise.try.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es7.promise.try.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/library/modules/_export.js");
var newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ "./node_modules/core-js/library/modules/_new-promise-capability.js");
var perform = __webpack_require__(/*! ./_perform */ "./node_modules/core-js/library/modules/_perform.js");

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),

/***/ "./node_modules/core-js/library/modules/web.dom.iterable.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/web.dom.iterable.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./es6.array.iterator */ "./node_modules/core-js/library/modules/es6.array.iterator.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/library/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/library/modules/_iterators.js");
var TO_STRING_TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js")('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),

/***/ "./tmp/socket.js":
/*!***********************!*\
  !*** ./tmp/socket.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _socket = __webpack_require__(/*! ./apps/maha/src/core/entities/socket.js */ "./apps/maha/src/core/entities/socket.js");

var _socket2 = _interopRequireDefault(_socket);

var _app = __webpack_require__(/*! ./apps/maha-chat/src/app.js */ "./apps/maha-chat/src/app.js");

var _app2 = _interopRequireDefault(_app);

var _app3 = __webpack_require__(/*! ./apps/maha-competencies/src/app.js */ "./apps/maha-competencies/src/app.js");

var _app4 = _interopRequireDefault(_app3);

var _app5 = __webpack_require__(/*! ./apps/maha-crm/src/app.js */ "./apps/maha-crm/src/app.js");

var _app6 = _interopRequireDefault(_app5);

var _app7 = __webpack_require__(/*! ./apps/maha-drive/src/app.js */ "./apps/maha-drive/src/app.js");

var _app8 = _interopRequireDefault(_app7);

var _app9 = __webpack_require__(/*! ./apps/maha-eatfresh/src/app.js */ "./apps/maha-eatfresh/src/app.js");

var _app10 = _interopRequireDefault(_app9);

var _app11 = __webpack_require__(/*! ./apps/maha-expenses/src/app.js */ "./apps/maha-expenses/src/app.js");

var _app12 = _interopRequireDefault(_app11);

var _app13 = __webpack_require__(/*! ./apps/maha-platform/src/app.js */ "./apps/maha-platform/src/app.js");

var _app14 = _interopRequireDefault(_app13);

var _app15 = __webpack_require__(/*! ./apps/maha-team/src/app.js */ "./apps/maha-team/src/app.js");

var _app16 = _interopRequireDefault(_app15);

var _app17 = __webpack_require__(/*! ./apps/maha/src/app.js */ "./apps/maha/src/app.js");

var _app18 = _interopRequireDefault(_app17);

var _socket3 = __webpack_require__(/*! ./apps/maha-chat/src/admin/socket.js */ "./apps/maha-chat/src/admin/socket.js");

var _socket4 = _interopRequireDefault(_socket3);

var _events = __webpack_require__(/*! events */ "events");

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_events2.default.EventEmitter.defaultMaxListeners = 0;

(0, _socket2.default)();

/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),

/***/ "backframe":
/*!****************************!*\
  !*** external "backframe" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("backframe");

/***/ }),

/***/ "bcrypt-nodejs":
/*!********************************!*\
  !*** external "bcrypt-nodejs" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bcrypt-nodejs");

/***/ }),

/***/ "bluebird":
/*!***************************!*\
  !*** external "bluebird" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),

/***/ "bookshelf":
/*!****************************!*\
  !*** external "bookshelf" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bookshelf");

/***/ }),

/***/ "bull":
/*!***********************!*\
  !*** external "bull" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bull");

/***/ }),

/***/ "chalk":
/*!************************!*\
  !*** external "chalk" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),

/***/ "checkit":
/*!**************************!*\
  !*** external "checkit" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("checkit");

/***/ }),

/***/ "cheerio":
/*!**************************!*\
  !*** external "cheerio" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cheerio");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),

/***/ "ejs":
/*!**********************!*\
  !*** external "ejs" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ejs");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "get-urls":
/*!***************************!*\
  !*** external "get-urls" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("get-urls");

/***/ }),

/***/ "glob":
/*!***********************!*\
  !*** external "glob" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("glob");

/***/ }),

/***/ "html-email-to-text":
/*!*************************************!*\
  !*** external "html-email-to-text" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("html-email-to-text");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "inline-css":
/*!*****************************!*\
  !*** external "inline-css" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("inline-css");

/***/ }),

/***/ "ioredis":
/*!**************************!*\
  !*** external "ioredis" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ioredis");

/***/ }),

/***/ "jimp":
/*!***********************!*\
  !*** external "jimp" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jimp");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "knex":
/*!***********************!*\
  !*** external "knex" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("knex");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "mailparser":
/*!*****************************!*\
  !*** external "mailparser" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mailparser");

/***/ }),

/***/ "mime-types":
/*!*****************************!*\
  !*** external "mime-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mime-types");

/***/ }),

/***/ "mkdirp":
/*!*************************!*\
  !*** external "mkdirp" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mkdirp");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("nodemailer");

/***/ }),

/***/ "numeral":
/*!**************************!*\
  !*** external "numeral" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("numeral");

/***/ }),

/***/ "open-graph":
/*!*****************************!*\
  !*** external "open-graph" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("open-graph");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "pluralize":
/*!****************************!*\
  !*** external "pluralize" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("pluralize");

/***/ }),

/***/ "redis":
/*!************************!*\
  !*** external "redis" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redis");

/***/ }),

/***/ "redis-lock":
/*!*****************************!*\
  !*** external "redis-lock" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redis-lock");

/***/ }),

/***/ "regenerator-runtime":
/*!**************************************!*\
  !*** external "regenerator-runtime" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ }),

/***/ "request":
/*!**************************!*\
  !*** external "request" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ }),

/***/ "request-promise":
/*!**********************************!*\
  !*** external "request-promise" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("request-promise");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),

/***/ "socket.io-emitter":
/*!************************************!*\
  !*** external "socket.io-emitter" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("socket.io-emitter");

/***/ }),

/***/ "socket.io-redis":
/*!**********************************!*\
  !*** external "socket.io-redis" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("socket.io-redis");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),

/***/ "web-push":
/*!***************************!*\
  !*** external "web-push" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("web-push");

/***/ }),

/***/ "webshot":
/*!**************************!*\
  !*** external "webshot" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("webshot");

/***/ }),

/***/ "wrap-ansi":
/*!****************************!*\
  !*** external "wrap-ansi" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("wrap-ansi");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhLWNoYXQvc3JjL2FkbWluL3NvY2tldC5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEtY2hhdC9zcmMvYXBwLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS1jb21wZXRlbmNpZXMvc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEtY3JtL3NyYy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhLWRyaXZlL3NyYy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhLWVhdGZyZXNoL3NyYy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhLWV4cGVuc2VzL3NyYy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhLXBsYXRmb3JtL3NyYy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhLXRlYW0vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL2NvcmUvZW50aXRpZXMvc29ja2V0LmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvY29yZS9saWIvZXhwcmVzcy9waW5nLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvY29yZS9saWIvc29ja2V0aW8vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9jb3JlL2xpYi9zb2NrZXRpby9wcmVzZW5jZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL2NvcmUvbGliL3NvY2tldGlvL3NlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL2NvcmUvbGliL3NvY2tldGlvL3V0aWxzLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvY29yZS9vYmplY3RzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL2NvcmUvb2JqZWN0cy9jcm9uLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvY29yZS9vYmplY3RzL2VtYWlsLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvY29yZS9vYmplY3RzL2ZpeHR1cmVzLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvY29yZS9vYmplY3RzL21haWxib3guanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9jb3JlL29iamVjdHMvbWlncmF0aW9uLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvY29yZS9vYmplY3RzL21vZGVsLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvY29yZS9vYmplY3RzL25hdmlnYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9jb3JlL29iamVjdHMvbm90aWZpY2F0aW9uX3R5cGVzLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvY29yZS9vYmplY3RzL3F1ZXVlLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvY29yZS9vYmplY3RzL3Jlc291cmNlcy5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL2NvcmUvb2JqZWN0cy9yaWdodHMuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9jb3JlL29iamVjdHMvcm91dGVzLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvY29yZS9vYmplY3RzL3NlYXJjaC5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL2NvcmUvb2JqZWN0cy9zZXJpYWxpemVyLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvY29yZS9zZXJ2aWNlcy9hd3MuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9jb3JlL3NlcnZpY2VzL2Jvb2tzaGVsZi5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL2NvcmUvc2VydmljZXMvZW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL2NvcmUvc2VydmljZXMvand0LmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvY29yZS9zZXJ2aWNlcy9rbmV4LmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvY29yZS9zZXJ2aWNlcy9wcmVzZW5jZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL2NvcmUvc2VydmljZXMvcmVkaXMuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9jb3JlL3NlcnZpY2VzL3Nlcy5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL2NvcmUvc2VydmljZXMvd2VicHVzaC5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL2NvcmUvdXRpbHMvYXBwX2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL2NvcmUvdXRpbHMvY29sbGVjdF9vYmplY3RzLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvY29yZS91dGlscy9jb25zb2xlLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvY29yZS91dGlscy9mb3JtYXRfb2JqZWN0X2Zvcl90cmFuc3BvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9jb3JlL3V0aWxzL2xvZ2dlci5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL2NvcmUvdXRpbHMvbW9kZWxfYWN0aXZpdGllcy5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL2NvcmUvdXRpbHMvbW9kZWxfaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL2NvcmUvdXRpbHMvc2VuZF9tYWlsLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvY29yZS91dGlscy91c2VyX3Rva2Vucy5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL2NvcmUvdmFsaWRhdGlvbnMvY3VycmVuY3lfdmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL2NvcmUvdmFsaWRhdGlvbnMvZGF0ZXN0cmluZ192YWxpZGF0aW9uLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvY29yZS92YWxpZGF0aW9ucy9ncmVhdGVyX3RoYW5fZmllbGRfdmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL2NvcmUvdmFsaWRhdGlvbnMvbGF0ZXJfdGhhbl92YWxpZGF0aW9uLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvY29yZS92YWxpZGF0aW9ucy90aW1lX3ZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9jb3JlL3ZhbGlkYXRpb25zL3VuaXF1ZV92YWxpZGF0aW9uLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvbW9kZWxzL2FjdGl2aXR5LmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvbW9kZWxzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL21vZGVscy9hcHBfYXV0aG9yLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvbW9kZWxzL2FwcF9jYXRlZ29yeS5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL21vZGVscy9hc3NldC5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL21vZGVscy9hc3NldF9zdGF0dXMuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9tb2RlbHMvYXR0YWNobWVudC5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL21vZGVscy9hdWRpdC5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL21vZGVscy9jb21tZW50LmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvbW9kZWxzL2RldmljZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL21vZGVscy9kZXZpY2VfdmFsdWUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9tb2RlbHMvZG9tYWluLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvbW9kZWxzL2VtYWlsLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvbW9kZWxzL2VtYWlsX2FjdGl2aXR5LmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvbW9kZWxzL2VtYWlsX2xpbmsuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9tb2RlbHMvZW1haWxfdGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9tb2RlbHMvZ3JvdXAuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9tb2RlbHMvaW1wb3J0LmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvbW9kZWxzL2ltcG9ydF9pdGVtLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvbW9kZWxzL2luc3RhbGxhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL21vZGVscy9saWtlLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvbW9kZWxzL2xpc3RlbmluZy5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL21vZGVscy9ub3RpZmljYXRpb25fbWV0aG9kLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvbW9kZWxzL3Byb2ZpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9tb2RlbHMvcmV2aWV3LmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvbW9kZWxzL3JpZ2h0LmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvbW9kZWxzL3JvbGUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9tb2RlbHMvc2VjdXJpdHlfcXVlc3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9tb2RlbHMvc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL21vZGVscy9zZXNzaW9uLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvbW9kZWxzL3NvdXJjZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL21vZGVscy9zdGFyLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvbW9kZWxzL3N0b3J5LmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvbW9kZWxzL3N0cmF0ZWd5LmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvbW9kZWxzL3N1cGVydmlzaW9uLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvbW9kZWxzL3N1cGVydmlzb3IuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9tb2RlbHMvdGVhbS5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL21vZGVscy91c2VyLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvcXVldWVzIHN5bmMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9xdWV1ZXMvYXNzZW1ibGVfYXNzZXRfcXVldWUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9xdWV1ZXMvbWFpbGVyX3F1ZXVlLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvcXVldWVzL3Byb2Nlc3NfYXNzZXRfcXVldWUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9zZXJpYWxpemVycy9hc3NldF9zZXJpYWxpemVyLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvc2VyaWFsaXplcnMvaW1wb3J0X3NlcmlhbGl6ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9zZXJ2aWNlcy9hc3NldC5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL3NlcnZpY2VzL2F0dGFjaG1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvaXMtaXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvZXh0ZW5kcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy90b0NvbnN1bWFibGVBcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9yZWdlbmVyYXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2FycmF5L2Zyb20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hZGQtdG8tdW5zY29wYWJsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1pbnN0YW5jZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY2xhc3NvZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jcmVhdGUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZm9yLW9mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGFzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2h0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ludm9rZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jYWxsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGV0ZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1zdGVwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlcmF0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbGlicmFyeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX21pY3JvdGFzay5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX25ldy1wcm9taXNlLWNhcGFiaWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1ncG8uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3BlcmZvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9taXNlLXJlc29sdmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUtYWxsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtc3BlY2llcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NwZWNpZXMtY29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190YXNrLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tYWJzb2x1dGUtaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWxlbmd0aC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VzZXItYWdlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5mcm9tLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnByb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5wcm9taXNlLmZpbmFsbHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5wcm9taXNlLnRyeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi90bXAvc29ja2V0LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImF3cy1zZGtcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWNrZnJhbWVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiY3J5cHQtbm9kZWpzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmx1ZWJpcmRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJib29rc2hlbGZcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJidWxsXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY2hhbGtcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjaGVja2l0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY2hlZXJpb1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNoaWxkX3Byb2Nlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJlanNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJldmVudHNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJnZXQtdXJsc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImdsb2JcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodG1sLWVtYWlsLXRvLXRleHRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaW5saW5lLWNzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImlvcmVkaXNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqaW1wXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwianNvbndlYnRva2VuXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwia25leFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImxvZGFzaFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1haWxwYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtaW1lLXR5cGVzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWtkaXJwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9tZW50XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibm9kZW1haWxlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm51bWVyYWxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJvcGVuLWdyYXBoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwib3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGx1cmFsaXplXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkaXNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWRpcy1sb2NrXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVnZW5lcmF0b3ItcnVudGltZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlcXVlc3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZXF1ZXN0LXByb21pc2VcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzb2NrZXQuaW9cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzb2NrZXQuaW8tZW1pdHRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNvY2tldC5pby1yZWRpc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInN0cmVhbVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInVybFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInV0aWxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3ZWItcHVzaFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIndlYnNob3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3cmFwLWFuc2lcIiJdLCJuYW1lcyI6WyJjaGF0IiwiaW8iLCJzb2NrZXQiLCJvbiIsInRva2VuIiwiY2hhbm5lbCIsImRhdGEiLCJ3aGVyZSIsInFiIiwiY2hhbm5lbF9pZCIsImV4Y2x1ZGUiLCJ3aGVyZU5vdEluIiwic3Vic2NyaXB0aW9ucyIsInN1YnNjcmlwdGlvbiIsImluIiwidXNlcl9pZCIsImVtaXQiLCJ0YXJnZXQiLCJhY3Rpb24iLCJ1c2VyIiwiYXBwIiwiY29kZSIsInRpdGxlIiwicGF0aCIsImNhdGVnb3J5IiwiYXV0aG9yIiwiZGVzY3JpcHRpb24iLCJ2ZXJzaW9uIiwiY29sb3IiLCJpY29uIiwid2VpZ2h0Iiwic2VydmVyIiwidXNlIiwicGluZyIsInRyYW5zcG9ydCIsImh0dHAiLCJjcmVhdGVTZXJ2ZXIiLCJyZWRpcyIsInByb2Nlc3MiLCJhZGFwdGVyIiwic29jayIsImNoYWxrIiwiZ3JleSIsImdyZWVuIiwibGlzdGVuIiwicmVxIiwicmVzIiwibmV4dCIsInN0YXR1cyIsInNlbmQiLCJzb2NrZXRzIiwic29ja2V0RmlsZSIsImhhbmRsZXIiLCJkZWZhdWx0IiwicHJlc2VuY2UiLCJjYWxsYmFjayIsImF1dGgiLCJ1c2VycyIsImZpbHRlciIsIml0ZW0iLCJnZXQiLCJzZXNzaW9uX2lkIiwic2Vzc2lvbiIsIm1hcCIsImNoYW5uZWxzIiwiYXV0aG9yaXplIiwiXyIsImluY2x1ZGVzIiwiYXV0aGVudGljYXRlZCIsImF1dGhvcml6ZWQiLCJqb2luIiwicHVzaCIsImxlYXZlIiwiY2giLCJqd3QiLCJhdXRoZW50aWNhdGUiLCJFcnJvciIsInRva2VuRGF0YSIsImRlY29kZSIsIlVzZXIiLCJpZCIsImZldGNoIiwiU2Vzc2lvbiIsIkFwcCIsIm9wdGlvbnMiLCJjb25maWciLCJjcm9uIiwibmFtZSIsInNjaGVkdWxlIiwid2l0aExvZ2dlciIsInByb2Nlc3NvciIsImFmdGVyQ29tbWl0IiwiYmVmb3JlUm9sbGJhY2siLCJyZXF1ZXN0SWQiLCJyYW5kb20iLCJ0b1N0cmluZyIsIndpdGhUcmFuc2FjdGlvbiIsImtuZXgiLCJ0cmFuc2FjdGlvbiIsInRyeCIsInJlc3VsdCIsImNvbW1pdCIsImNvbnNvbGUiLCJsb2ciLCJyb2xsYmFjayIsImVtYWlsIiwiRml4dHVyZXMiLCJNYWlsYm94IiwiTWlncmF0aW9uIiwiTW9kZWwiLCJib29rc2hlbGYiLCJleHRlbmQiLCJoYXNUaW1lc3RhbXBzIiwidGFibGVOYW1lIiwiZGlzcGxheU5hbWUiLCJkaXNwbGF5QXR0cmlidXRlIiwicnVsZXMiLCJ2aXJ0dWFscyIsImluaXRpYWxpemUiLCJhdHRycyIsIm9wdHMiLCJ2YWxpZGF0ZVNhdmUiLCJmZXRjaE9wdGlvbnMiLCJwcm90b3R5cGUiLCJjYWxsIiwibWVyZ2VPcHRpb25zIiwiZmV0Y2hBbGwiLCJtb2RlbCIsInNhdmVPcHRpb25zIiwic2tpcFZhbGlkYXRpb24iLCJiZWxvbmdzVG9UZWFtIiwid2l0aFJ1bGVzIiwidGVhbV9pZCIsIkNoZWNraXQiLCJydW4iLCJhdHRyaWJ1dGVzIiwiYWN0aXZpdGllcyIsIkFjdGl2aXR5IiwicmVxdWlyZSIsIm1vcnBoTWFueSIsImF1ZGl0IiwiQXVkaXQiLCJjb21tZW50cyIsIkNvbW1lbnQiLCJsaWtlcyIsIkxpa2UiLCJxdWVyeSIsIndoZXJlTnVsbCIsImxpc3RlbmluZ3MiLCJMaXN0ZW5pbmciLCJyZXZpZXdzIiwiUmV2aWV3Iiwic3RhcnMiLCJTdGFyIiwidGVhbSIsIlRlYW0iLCJiZWxvbmdzVG8iLCJ3aXRoUmVsYXRlZCIsImNvZXJjZUFycmF5IiwidmFsdWUiLCJpc05pbCIsImlzQXJyYXkiLCJOYXZpZ2F0aW9uIiwiTm90aWZpY2F0aW9uVHlwZXMiLCJRdWV1ZSIsIl9lbnF1ZXVlIiwiZW5xdWV1ZSIsImZhaWxlZCIsImNvbXBsZXRlZCIsInF1ZXVlIiwiQnVsbCIsImNyZWF0ZUNsaWVudCIsIndyYXBwZWQiLCJqb2IiLCJyZXNvbHZlIiwicmVqZWN0Iiwic2V0VGltZW91dCIsImFkZCIsImRlbGF5IiwiYXR0ZW1wdHMiLCJiYWNrb2ZmIiwidHlwZSIsImNsZWFuIiwiam9iX2lkIiwiZ2V0Sm9iIiwiZG9uZSIsInByb2Nlc3NvcldpdGhUcmFuc2FjdGlvbiIsInByb2Nlc3NvcldpdGhMb2dnZXIiLCJpc19wcm9kIiwiZW52UHJvY2Vzc29yIiwiY2xpZW50Iiwic3Vic2NyaWJlciIsIk1haGFSZXNvdXJjZXMiLCJSZXNvdXJjZXMiLCJkZXBlbmRlbnRzIiwicmVsYXRpb25zaGlwIiwic3RyYXRlZ3kiLCJSaWdodHMiLCJSb3V0ZXMiLCJzZWFyY2giLCJzZXJpYWxpemVyIiwiYXdzIiwiY29uc3RydWN0b3IiLCJhY2Nlc3NLZXlJZCIsInNlY3JldEFjY2Vzc0tleSIsIkFXU19TRUNSRVRfQUNDRVNTX0tFWSIsInJlZ2lvbiIsIm1vZHVsZSIsImV4cG9ydHMiLCJwbHVnaW4iLCJlbWl0dGVyIiwiZW5jb2RlIiwiZHVyYXRpb24iLCJpYXQiLCJNYXRoIiwiZmxvb3IiLCJEYXRlIiwibm93IiwiZXhwIiwic2lnbiIsInZlcmlmeSIsIm1hdGNoIiwidXJsIiwicHJvdG9jb2wiLCJnZXRDbGllbnQiLCJnZXRDb25uZWN0aW9uIiwiZ2V0UG9vbCIsImVudiIsIm1pbiIsIm1heCIsImNvbm5lY3Rpb24iLCJ1c2VOdWxsQXNEZWZhdWx0IiwicG9vbCIsIktuZXgiLCJMb2NrIiwibG9jayIsImdldFByZXNlbmNlIiwidW5sb2NrIiwiSlNPTiIsImdldEFzeW5jIiwicGFyc2UiLCJzZXRQcmVzZW5jZSIsInNldEFzeW5jIiwic3RyaW5naWZ5IiwiUmVkaXNDbGllbnQiLCJTRVMiLCJhcGlWZXJzaW9uIiwibm9kZW1haWxlciIsImNyZWF0ZVRyYW5zcG9ydCIsInNlbmRWaWFQdXNoIiwibm90aWZpY2F0aW9uIiwicGF5bG9hZCIsIndlYnB1c2giLCJzZW5kTm90aWZpY2F0aW9uIiwiZW5kcG9pbnQiLCJyZWxhdGVkIiwia2V5cyIsInAyNTZkaCIsImdjbUFQSUtleSIsInZhcGlkRGV0YWlscyIsInN1YmplY3QiLCJwdWJsaWNLZXkiLCJwcml2YXRlS2V5IiwiVkFQSURfUFJJVkFURV9LRVkiLCJjb25maWdzIiwicmVkdWNlIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsImFwcENvbmZpZyIsImNvbGxlY3RPYmplY3RzIiwicGF0dGVybiIsImdsb2IiLCJzeW5jIiwiZmlsZSIsIndyaXRlUGFkZGVkTGluZSIsImxhYmVsIiwidGV4dCIsImJhY2tncm91bmQiLCJuZXdsaW5lIiwicmV3aW5kIiwid2lkdGgiLCJzdGRvdXQiLCJjb2x1bW5zIiwibGFiZWxXaWR0aCIsInN0cmlwQW5zaSIsImxlbmd0aCIsImNvbnRlbnRXaWR0aCIsInBhZGRlZCIsImhhcmQiLCJzcGxpdCIsImNodW5rTGluZSIsImluZGV4IiwiaW50cm8iLCJBcnJheSIsImxpbmUiLCJzdHJpcHBlZCIsImV4dHJhV2lkdGgiLCJleHRyYSIsInRlcm1pbmF0aW9uIiwiYmdIZXgiLCJjdXJzb3JUbyIsIndyaXRlIiwicmVwbGFjZSIsImZvcm1hdE9iamVjdEZvclRyYW5zcG9ydCIsImlzVW5kZWZpbmVkIiwiaXNEYXRlIiwidXRjIiwiZm9ybWF0IiwiaXNQbGFpbk9iamVjdCIsIk9iamVjdCIsImZvcm1hdHRlZCIsImtleSIsInJlcXVlc3RzIiwibGlzdGVuZXJzIiwiYmVnaW5Mb2dnZXIiLCJfY3JlYXRlUmVxdWVzdCIsIl9zdGFydFF1ZXJ5IiwicmVzcG9uc2UiLCJfZW5kUXVlcnkiLCJtYWlsIiwiX2xvZ01lc3NhZ2UiLCJlbmRMb2dnZXIiLCJyZW1vdmVMaXN0ZW5lciIsIm1pZGRsZXdhcmUiLCJwcmludE1pZGRsZXdhcmVMb2dnZXIiLCJfZ2V0RHVyYXRpb24iLCJzdGFydFRpbWUiLCJyZXF1ZXN0Iiwib3JpZ2luYWxVcmwiLCJoZWFkZXJzIiwiaG9zdCIsImhvc3RuYW1lIiwibWV0aG9kIiwiaGVhZCIsImlzU3RyaW5nIiwiaXNFbXB0eSIsInBhcmFtcyIsImJvZHkiLCJzdGF0dXNDb2RlIiwiX3ByaW50TG9nZ2VyIiwicHJpbnRRdWV1ZUxvZ2dlciIsInByaW50Q3JvbkxvZ2dlciIsIl9oYXNVaWRCZWVuTWFwcGVkIiwiX19rbmV4VWlkIiwiX2dldFJlcXVlc3RJZEZyb21VaWQiLCJ1aWQiLCJfX2tuZXhRdWVyeVVpZCIsInNxbCIsImhydGltZSIsImJpbmRpbmdzIiwiZmluZEluZGV4IiwiZGlmZiIsIm1zIiwidG9GaXhlZCIsIm1hcHBlZCIsImZvdW5kIiwibGV2ZWwiLCJtZXNzYWdlIiwidXRpbCIsImFwcGx5IiwiYXJndW1lbnRzIiwiYm9sZCIsIndoaXRlIiwiYmxhY2siLCJtYWdlbnRhIiwicmVkIiwibW9kZWxzIiwidGFibGUiLCJvYmplY3RzIiwib2JqZWN0IiwiaW5zdGFuY2UiLCJfX3N1cGVyX18iLCJ1cGRhdGVSZWxhdGVkIiwicGFyYW0iLCJyZXN1bHRfa2V5IiwiZm9yZWlnbl9rZXkiLCJib2R5X2lkcyIsImxvYWQiLCJ0cmFuc2FjdGluZyIsImlkcyIsInJlbW92ZV9pZHMiLCJhZGRfaWRzIiwid2hlcmVJbiIsImRlbGV0ZSIsImluc2VydCIsImVycm9ycyIsIkJhY2tmcmFtZUVycm9yIiwidG9KU09OIiwic2VuZE1haWwiLCJodG1sIiwicHJlc2VydmVNZWRpYVF1ZXJpZXMiLCJyZW5kZXJlZCIsInRvIiwiX3NlbmRWaWFDb25zb2xlIiwiX3NlbmRWaWFTRVMiLCJlcnJvciIsIm91dHB1dCIsInNlbnRfYXQiLCJzZXMiLCJlcnIiLCJpbmZvIiwic2VzX2lkIiwiVFdPX1dFRUtTIiwiY3JlYXRlVXNlclRva2VuIiwibG9hZFVzZXJGcm9tVG9rZW4iLCJfZGVjb2RlIiwiVmFsaWRhdG9yIiwiY3VycmVuY3kiLCJ2YWwiLCJjb2x1bW4iLCJfdGFyZ2V0IiwiZGF0ZXN0cmluZyIsImdyZWF0ZXJUaGFuRmllbGQiLCJsYXRlclRoYW4iLCJ0b2RheSIsImZpcnN0IiwibGFzdCIsInRpbWUiLCJ1bmlxdWUiLCJ3aGVyZU5vdCIsInRoZW4iLCJyZXNwIiwib2JqZWN0X293bmVyIiwic3RvcnkiLCJTdG9yeSIsIkF1dGhvciIsIkNhdGVnb3J5Iiwicm9sZXMiLCJiZWxvbmdzVG9NYW55IiwiUm9sZSIsIkFwcEF1dGhvciIsImFwcHMiLCJoYXNNYW55IiwiQXBwQ2F0ZWdvcnkiLCJBc3NldHMiLCJleHRlbnNpb24iLCJwb3AiLCJpZGVudGlmaWVyIiwiaXNfaW1hZ2UiLCJoYXNfcHJldmlldyIsImlzX3BkZiIsImlzX2RvYyIsImlzX3hscyIsImlzX29wZW5vZmZpY2UiLCJpc19lbWFpbCIsImlzX2h0bWwiLCJpc05ldyIsIkRBVEFfQVNTRVRfQ0ROX0hPU1QiLCJzb3VyY2UiLCJTb3VyY2UiLCJBc3NldFN0YXR1cyIsIkF0dGFjaG1lbnQiLCJhc3NldCIsIkFzc2V0Iiwic2VydmljZSIsIlNlcnZpY2UiLCJhdHRhY2htZW50cyIsIkRldmljZSIsImlzX3B1c2hfZW5hYmxlZCIsImRldmljZV90eXBlIiwiRGV2aWNlVmFsdWUiLCJicm93c2VyX25hbWUiLCJicm93c2VyX3ZlcnNpb24iLCJvc19uYW1lIiwib3NfdmVyc2lvbiIsIkRvbWFpbiIsIkVtYWlsIiwiRW1haWxBY3Rpdml0eSIsImxpbmsiLCJFbWFpbExpbmsiLCJFbWFpbFRlbXBsYXRlIiwiR3JvdXAiLCJJbXBvcnQiLCJhc3NldF9pZCIsIml0ZW1zIiwiSW1wb3J0SXRlbSIsImltcG9ydCIsIkluc3RhbGxhdGlvbiIsImFwcF9pZCIsImxpc3RlbmFibGVfdHlwZSIsImxpc3RlbmFibGVfaWQiLCJOb3RpZmljYXRpb25NZXRob2QiLCJQcm9maWxlIiwic2NvcmUiLCJSaWdodCIsInRvTG93ZXJDYXNlIiwicmlnaHRzIiwiU2VjdXJpdHlRdWVzdGlvbiIsImRldmljZSIsImFzc2V0cyIsInByb2ZpbGVzIiwiU3RyYXRlZ3kiLCJTdXBlcnZpc2lvbiIsInN1cGVydmlzb3IiLCJlbXBsb3llZSIsIlN1cGVydmlzb3IiLCJzdWJkb21haW4iLCJkb21haW5zIiwibG9nbyIsInN0cmF0ZWdpZXMiLCJmaXJzdF9uYW1lIiwibGFzdF9uYW1lIiwiZnVsbF9uYW1lIiwiZl9sYXN0IiwiZmlyc3RfaW5pdGlhbCIsImxhc3RfaW5pdGlhbCIsImluaXRpYWxzIiwicmZjODIyIiwiZ3JvdXBfaWRzIiwiZ3JvdXAiLCJyb2xlX2lkcyIsInJvbGUiLCJzdXBlcnZpc29yX2lkcyIsInBhc3N3b3JkIiwic2V0IiwicGFzc3dvcmRfc2FsdCIsImJjcnlwdCIsImdlblNhbHRTeW5jIiwiaGFzaFN5bmMiLCJub3RpZmljYXRpb25fbWV0aG9kIiwicGhvdG8iLCJzZWN1cml0eV9xdWVzdGlvbiIsImdyb3VwcyIsInN1cGVydmlzb3JzIiwidGhyb3VnaCIsImFzc2VtYmxlQXNzZXRRdWV1ZSIsInRlbXBsYXRlcyIsImVtYWlscyIsImZpbGVwYXRoIiwidGVtcGxhdGVQYXRoIiwiZGlybmFtZSIsImVudmVsb3BlIiwiZnMiLCJyZWFkRmlsZVN5bmMiLCJ0ZW1wbGF0ZSIsIm1vbWVudCIsIm51bWVyYWwiLCJwbHVyYWxpemUiLCJpbm5lckNvbnRlbnQiLCJlanMiLCJyZW5kZXIiLCJlbnZlbG9wZVRlbXBsYXRlIiwiX19kaXJuYW1lIiwiY29udGVudCIsImZvcmdlIiwic2F2ZSIsImVtYWlsX2lkIiwiY29uZGl0aW9ucyIsInBhcnNlZCIsImNoZWVyaW8iLCJhcHBlbmRUbyIsImkiLCJlbGVtIiwiYXR0ciIsImxpbmtzIiwiZnJvbSIsIl9maW5kT3JDcmVhdGVMaW5rIiwiZW1haWxMaW5rIiwibmV3VXJsIiwicGF0Y2giLCJtYWlsZXJRdWV1ZSIsInByb2Nlc3NBc3NldFF1ZXVlIiwiYXNzZXRTZXJpYWxpemVyIiwib3JpZ2luYWxfZmlsZV9uYW1lIiwiZmlsZV9uYW1lIiwiY29udGVudF90eXBlIiwiZmlsZV9zaXplIiwiY2h1bmtzX3RvdGFsIiwicmVzaXplZF91cmwiLCJzb3VyY2VfdXJsIiwiY3JlYXRlZF9hdCIsInVwZGF0ZWRfYXQiLCJpbXBvcnRTZXJpYWxpemVyIiwic3RhZ2UiLCJkZWxpbWl0ZXIiLCJtYXBwaW5nIiwib2JqZWN0X3R5cGUiLCJjb21wbGV0ZWRfY291bnQiLCJ2YWxpZF9jb3VudCIsImVycm9yX2NvdW50Iiwib21pdF9jb3VudCIsImR1cGxpY2F0ZV9jb3VudCIsIm5vbnVuaXF1ZV9jb3VudCIsIkxpc3RSb3V0ZSIsIlBsdWdpbiIsIlJvdXRlIiwiUmVzb3VyY2UiLCJSZXNwb25kZXIiLCJTZWdtZW50IiwiZ2V0QXNzZXREYXRhIiwiY3JlYXRlQXNzZXQiLCJkZWxldGVBc3NldCIsInByb2Nlc3NBc3NldCIsImNyZWF0ZUFzc2V0RnJvbVVybCIsImV4dHJhY3RBdHRhY2htZW50cyIsIm1haWxlciIsIkltcG9ydFNlcmlhbGl6ZXIiLCJzaW1wbGVQYXJzZXIiLCJleGVjQXN5bmMiLCJleGVjIiwidmFsaWRhdGVSZXF1ZXN0IiwiZmlsZXMiLCJyZXF1aXJlRmlsZSIsIm1heENodW5rU2l6ZSIsIm1heEZpbGVTaXplIiwiY2h1bmtOdW1iZXIiLCJyZXN1bWFibGVDaHVua051bWJlciIsImNodW5rU2l6ZSIsInJlc3VtYWJsZUNodW5rU2l6ZSIsInRvdGFsU2l6ZSIsInJlc3VtYWJsZVRvdGFsU2l6ZSIsInJlc3VtYWJsZUlkZW50aWZpZXIiLCJmaWxlbmFtZSIsInJlc3VtYWJsZUZpbGVuYW1lIiwidG90YWxDaHVua3MiLCJyZXN1bWFibGVUb3RhbENodW5rcyIsInBhcnNlSW50IiwiZmlsZXNpemUiLCJzaXplIiwiY2hlY2tVcGxvYWRlZEZpbGUiLCJjaHVua0ZpbGVuYW1lIiwiX2dldENodW5rRmlsZW5hbWUiLCJfY2h1bmtFeGlzdHMiLCJleGlzdHMiLCJ1cGxvYWRDaHVuayIsIl9jbGVhbklkZW50aWZpZXIiLCJyZW5hbWVTeW5jIiwiZmlsZWRhdGEiLCJfc2F2ZUZpbGUiLCJfdW5saW5rQ2h1bmsiLCJfbGlzdENodW5rcyIsImNodW5rcyIsImNodW5rQXJyYXkiLCJjaHVuayIsInNvdXJjZV9pZCIsIl9nZXROb3JtYWxpemVkRmlsZU5hbWUiLCJyZXN1bWFibGVUeXBlIiwic3RhdHVzX2lkIiwiQXNzZW1ibGVBc3NldFF1ZXVlIiwicHJvbWlzZSIsImVuY29kaW5nIiwiZmlsZV9kYXRhIiwiVXJsIiwiYmFzZW5hbWUiLCJwYXRobmFtZSIsImFzc2VtYmxlQXNzZXQiLCJfZ2V0QXNzZW1ibGVkRGF0YSIsImZpbGVEYXRhIiwiX2dldE5vcm1hbGl6ZWREYXRhIiwibm9ybWFsaXplZERhdGEiLCJfZGVsZXRlQ2h1bmtzIiwiUHJvY2Vzc0Fzc2V0UXVldWUiLCJfZ2V0UHJldmlld0RhdGEiLCJwcmV2aWV3RGF0YSIsImdldEFzc2V0IiwibWV0YSIsIl9nZXRGaWxlc2l6ZSIsIl9nZXRDb250ZW50VHlwZSIsInNvdXJjZV9pZGVudGlmaWVyIiwiX2RlbGV0ZUZpbGVzIiwiZGVzdHJveSIsIm1pbWUiLCJsb29rdXAiLCJmaWxlUGF0aCIsIndyaXRlRmlsZVN5bmMiLCJmaWxlU3RhdHMiLCJzdGF0U3luYyIsInVubGlua1N5bmMiLCJtYXRjaGVzIiwicmV3cml0dGVuIiwiX2J1ZmZlclRvU3RyZWFtIiwiYnVmZmVyIiwic3RyZWFtIiwiRHVwbGV4IiwiS2V5IiwiQVNTRVRfU1RPUkFHRSIsInMzIiwiX2dldFMzIiwiZ2V0T2JqZWN0IiwiQnVja2V0IiwiQm9keSIsIl9nZXRDaHVua3MiLCJsaXN0T2JqZWN0cyIsIlByZWZpeCIsInBhcnRzIiwiQ29udGVudHMiLCJyZWFkZGlyU3luYyIsInVwbG9hZCIsIkFDTCIsIkNvbnRlbnRUeXBlIiwiYXNzZXRwYXRoIiwic2xpY2UiLCJhc3NldG5hbWUiLCJta2RpcnAiLCJkZWxldGVPYmplY3RzIiwiRGVsZXRlIiwiT2JqZWN0cyIsImZpbGVwYXRocyIsIkJ1ZmZlciIsImNvbmNhdCIsImlzSW1hZ2UiLCJfcm90YXRlSW1hZ2UiLCJleHQiLCJfY29udmVydE9mZmljZUZvcm1hdCIsInBkZkRhdGEiLCJlbWFpbERhdGEiLCJ0ZXh0QXNIdG1sIiwiX2NvbnZlcnRIdG1sIiwib3V0RGlyIiwicHJldmlld1BhdGgiLCJzaXRlVHlwZSIsInN0cmVhbVR5cGUiLCJkZWZhdWx0V2hpdGVCYWNrZ3JvdW5kIiwic2hvdFNpemUiLCJoZWlnaHQiLCJ3cyIsIkppbXAiLCJyZWFkIiwiaW1hZ2UiLCJleGlmUm90YXRlIiwiZ2V0QnVmZmVyIiwiZ2V0TUlNRSIsIlMzIiwiaWZhY2VzIiwib3MiLCJuZXR3b3JrSW50ZXJmYWNlcyIsImxvY2FsaG9zdHMiLCJpcHMiLCJpZmFjZSIsImFkZHJlc3MiLCJkb3dubG9hZCIsInJlamVjdFVuYXV0aG9yaXplZCIsImd6aXAiLCJqYXIiLCJnZXRNZXRhRGF0YSIsInVyaSIsInByb2Nlc3NMb2NhbFVybCIsInByb2Nlc3NJbWFnZVVybCIsInByb2Nlc3NPcGVuR3JhcGhVcmwiLCJ0aXRsZV9saW5rIiwicHJvY2Vzc0xvY2FsUGF0aG5hbWUiLCJpbWFnZV91cmwiLCJvZyIsIiQiLCJnZXRTZXJ2aWNlIiwic2VydmljZV9pZCIsInN1YnN0ciIsImdldFR5cGUiLCJnZXRJbWFnZSIsImdldFZpZGVvIiwidmlkZW8iLCJlcSIsInVucGFja09nQXJyYXkiLCJpY29ucyIsInRvQXJyYXkiLCJzb3J0IiwiYSIsImIiLCJhdHRyaWJzIiwic2l6ZXMiLCJocmVmIiwiYWJzb2x1dGVVcmwiLCJzZWN1cmVfdXJsIiwiaW1hZ2Vfd2lkdGgiLCJpbWFnZV9oZWlnaHQiLCJ2aWRlb191cmwiLCJ2aWRlb193aWR0aCIsInZpZGVvX2hlaWdodCIsImNyZWF0ZUF0dGFjaG1lbnQiLCJhdHRhY2hhYmxlIiwiYXR0YWNoYWJsZV90eXBlIiwiYXR0YWNoYWJsZV9pZCIsImRlbHRhIiwiZnJvbV91cmwiLCJ1cmxzIiwic29ydFF1ZXJ5UGFyYW1ldGVycyIsInJlbW92ZVRyYWlsaW5nU2xhc2giLCJzdHJpcFdXVyIsInN0cmlwRnJhZ21lbnQiLCJub3JtYWxpemVQcm90b2NvbCIsIm5vcm1hbGl6ZWRVcmwiLCJub3JtYWxpemVVcmwiLCJub3JtYWxpemVkIiwiZXZlbnRzIiwiRXZlbnRFbWl0dGVyIiwiZGVmYXVsdE1heExpc3RlbmVycyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNB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Ozs7Ozs7Ozs7Ozs7OztBQ2xCQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBQyxpQkFBT0MsWUFBUCxDQUFvQkMsbUJBQXBCLEdBQTBDLENBQTFDOztBQUVBLHdCOzs7Ozs7Ozs7OztBQ2ZBLG9DOzs7Ozs7Ozs7OztBQ0FBLHNDOzs7Ozs7Ozs7OztBQ0FBLDBDOzs7Ozs7Ozs7OztBQ0FBLHFDOzs7Ozs7Ozs7OztBQ0FBLHNDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLDBDOzs7Ozs7Ozs7OztBQ0FBLGdDOzs7Ozs7Ozs7OztBQ0FBLG1DOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLCtCOzs7Ozs7Ozs7OztBQ0FBLHFDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLCtDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLHVDOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLG1DOzs7Ozs7Ozs7OztBQ0FBLHVDOzs7Ozs7Ozs7OztBQ0FBLHVDOzs7Ozs7Ozs7OztBQ0FBLG1DOzs7Ozs7Ozs7OztBQ0FBLG1DOzs7Ozs7Ozs7OztBQ0FBLHVDOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLHVDOzs7Ozs7Ozs7OztBQ0FBLCtCOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLHNDOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLHVDOzs7Ozs7Ozs7OztBQ0FBLGdEOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLDRDOzs7Ozs7Ozs7OztBQ0FBLHNDOzs7Ozs7Ozs7OztBQ0FBLDhDOzs7Ozs7Ozs7OztBQ0FBLDRDOzs7Ozs7Ozs7OztBQ0FBLG1DOzs7Ozs7Ozs7OztBQ0FBLGdDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLHFDOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLHNDIiwiZmlsZSI6InNvY2tldC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vdG1wL3NvY2tldC5qc1wiKTtcbiIsImltcG9ydCB7IGtuZXggfSBmcm9tICdtYWhhJ1xuXG5jb25zdCBjaGF0ID0gYXN5bmMgKGlvLCBzb2NrZXQpID0+IHtcblxuICBzb2NrZXQub24oJ2NoYXQnLCBhc3luYyAodG9rZW4sIGNoYW5uZWwsIGRhdGEpID0+IHtcblxuICAgIGNvbnN0IHN1YnNjcmlwdGlvbnMgPSBhd2FpdCBrbmV4KCdjaGF0X3N1YnNjcmlwdGlvbnMnKS53aGVyZShxYiA9PiB7XG5cbiAgICAgIHFiLndoZXJlKHsgY2hhbm5lbF9pZDogZGF0YS5kYXRhLmNoYW5uZWxfaWQgfSlcblxuICAgICAgaWYoZGF0YS5kYXRhLmV4Y2x1ZGUpIHFiLndoZXJlTm90SW4oJ3VzZXJfaWQnLCBkYXRhLmRhdGEuZXhjbHVkZSlcblxuICAgIH0pXG5cbiAgICBhd2FpdCBQcm9taXNlLm1hcChzdWJzY3JpcHRpb25zLCBhc3luYyAoc3Vic2NyaXB0aW9uKSA9PiB7XG5cbiAgICAgIGF3YWl0IGlvLmluKGAvYWRtaW4vdXNlcnMvJHtzdWJzY3JpcHRpb24udXNlcl9pZH1gKS5lbWl0KCdtZXNzYWdlJywge1xuICAgICAgICB0YXJnZXQ6ICcvYWRtaW4vY2hhdC9tZXNzYWdlcycsXG4gICAgICAgIGFjdGlvbjogZGF0YS5hY3Rpb24sXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBjaGFubmVsX2lkOiBkYXRhLmRhdGEuY2hhbm5lbF9pZCxcbiAgICAgICAgICB1c2VyOiBkYXRhLmRhdGEudXNlclxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgfSlcblxuICB9KVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNoYXRcbiIsImNvbnN0IGFwcCA9IHtcbiAgY29kZTogJ2NoYXQnLFxuICB0aXRsZTogJ0NoYXQnLFxuICBwYXRoOiAnL2NoYXQnLFxuICBjYXRlZ29yeTogJ2NvbW11bmljYXRpb24nLFxuICBhdXRob3I6ICdDQ0UgVG9tcGtpbnMnLFxuICBkZXNjcmlwdGlvbjogJ09yZ2FuaXphdGlvbiBjaGF0JyxcbiAgdmVyc2lvbjogJzEuMC4wJyxcbiAgY29sb3I6ICd2aW9sZXQnLFxuICBpY29uOiAnY29tbWVudHMnXG59XG5cbmV4cG9ydCBkZWZhdWx0IGFwcFxuIiwiY29uc3QgYXBwID0ge1xuICBjb2RlOiAnY29tcGV0ZW5jaWVzJyxcbiAgdGl0bGU6ICdDb21wZXRlbmNpZXMnLFxuICBwYXRoOiAnL2NvbXBldGVuY2llcycsXG4gIGNhdGVnb3J5OiAnZWR1Y2F0aW9uJyxcbiAgYXV0aG9yOiAnQ0NFIFRvbXBraW5zJyxcbiAgZGVzY3JpcHRpb246ICdNYW5hZ2UgcmVzb3VyY2VzIHJlcXVpcmVkIGZvciB2YXJpb3VzIGpvYiBwb3NpdGlvbnMnLFxuICB2ZXJzaW9uOiAnMS4wLjAnLFxuICBjb2xvcjogJ2JsdWUnLFxuICBpY29uOiAndHJvcGh5J1xufVxuXG5leHBvcnQgZGVmYXVsdCBhcHBcbiIsImNvbnN0IGFwcCA9IHtcbiAgY29kZTogJ2NybScsXG4gIHRpdGxlOiAnQ1JNJyxcbiAgcGF0aDogJy9jcm0nLFxuICBjYXRlZ29yeTogJ2FkbWluaXN0cmF0aW9uJyxcbiAgYXV0aG9yOiAnQ0NFIFRvbXBraW5zJyxcbiAgZGVzY3JpcHRpb246ICdPcmdhbml6YXRpb25hbCBSZWxhdGlvbnNoaXAgTWFuYWdlbWVudCcsXG4gIHZlcnNpb246ICcxLjAuMCcsXG4gIGNvbG9yOiAnb2xpdmUnLFxuICBpY29uOiAnaWQtY2FyZC1vJyxcbiAgd2VpZ2h0OiAxMFxufVxuXG5leHBvcnQgZGVmYXVsdCBhcHBcbiIsImNvbnN0IGFwcCA9IHtcbiAgY29kZTogJ2RyaXZlJyxcbiAgdGl0bGU6ICdEcml2ZScsXG4gIHBhdGg6ICcvZHJpdmUnLFxuICBjYXRlZ29yeTogJ2FkbWluaXN0cmF0aW9uJyxcbiAgYXV0aG9yOiAnQ0NFIFRvbXBraW5zJyxcbiAgZGVzY3JpcHRpb246ICdPcmdhbml6YXRpb25hbCBGaWxlIFN5c3RlbScsXG4gIHZlcnNpb246ICcxLjAuMCcsXG4gIGNvbG9yOiAndGVhbCcsXG4gIGljb246ICdoZGQtbydcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXBwXG4iLCJjb25zdCBhcHAgPSB7XG4gIGNvZGU6ICdlYXRmcmVzaCcsXG4gIHRpdGxlOiAnRWF0IEZyZXNoJyxcbiAgcGF0aDogJy9lYXRmcmVzaCcsXG4gIGNhdGVnb3J5OiAnZWR1Y2F0aW9uJyxcbiAgYXV0aG9yOiAnQ0NFIFRvbXBraW5zJyxcbiAgZGVzY3JpcHRpb246ICdIZWxwIHRvdXJpc3RzIGZpbmQgbG9jYWwgZm9vZCBhbmQgZmFybSByZXNvdXJjZXMnLFxuICB2ZXJzaW9uOiAnMS4wLjAnLFxuICBjb2xvcjogJ29yYW5nZScsXG4gIGljb246ICdzcG9vbidcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXBwXG4iLCJjb25zdCBhcHAgPSB7XG4gIGNvZGU6ICdleHBlbnNlcycsXG4gIHRpdGxlOiAnRXhwZW5zZXMnLFxuICBwYXRoOiAnL2V4cGVuc2VzJyxcbiAgY2F0ZWdvcnk6ICdmaW5hbmNlJyxcbiAgYXV0aG9yOiAnQ0NFIFRvbXBraW5zJyxcbiAgZGVzY3JpcHRpb246ICdNYW5hZ2UgZXhwZW5zZXMgZm9yIGV4cGVuc2VzLCBhZHZhbmNlcywgYW5kIHZlaGljbGUgdHJpcHMnLFxuICB2ZXJzaW9uOiAnMS4wLjAnLFxuICBjb2xvcjogJ2dyZWVuJyxcbiAgaWNvbjogJ2RvbGxhcidcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXBwXG4iLCJjb25zdCBhcHAgPSB7XG4gIGNvZGU6ICdwbGF0Zm9ybScsXG4gIHRpdGxlOiAnUGxhdGZvcm0nLFxuICBwYXRoOiAnL3BsYXRmb3JtJyxcbiAgY2F0ZWdvcnk6ICdhZG1pbmlzdHJhdGlvbicsXG4gIGF1dGhvcjogJ0NDRSBUb21wa2lucycsXG4gIGRlc2NyaXB0aW9uOiAnUGxhdGZvcm0gTWFuYWdlbWVudCBUb29scycsXG4gIHZlcnNpb246ICcxLjAuMCcsXG4gIGNvbG9yOiAneWVsbG93JyxcbiAgaWNvbjogJ2NvZycsXG4gIHdlaWdodDogMTBcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXBwXG4iLCJjb25zdCBhcHAgPSB7XG4gIGNvZGU6ICd0ZWFtJyxcbiAgdGl0bGU6ICdUZWFtJyxcbiAgcGF0aDogJy90ZWFtJyxcbiAgY2F0ZWdvcnk6ICdBZG1pbmlzdHJhdGlvbicsXG4gIGF1dGhvcjogJ0NDRSBUb21wa2lucycsXG4gIGRlc2NyaXB0aW9uOiAnTWFuYWdlIHBsYXRmb3JtIGNvbmZpZ3VyYXRpb24sIHVzZXJzLCBhcHBzLCBhbmQgYWNjZXNzJyxcbiAgdmVyc2lvbjogJzEuMC4wJyxcbiAgY29sb3I6ICdyZWQnLFxuICBpY29uOiAndXNlcnMnXG59XG5cbmV4cG9ydCBkZWZhdWx0IGFwcFxuIiwiY29uc3QgYXBwID0ge1xuICBjb2RlOiAnbWFoYScsXG4gIHRpdGxlOiAnTWFoYScsXG4gIHBhdGg6ICcnXG59XG5cbmV4cG9ydCBkZWZhdWx0IGFwcFxuIiwiaW1wb3J0IHsgd3JpdGVQYWRkZWRMaW5lIH0gZnJvbSAnLi4vdXRpbHMvY29uc29sZSdcbmltcG9ydCBwaW5nIGZyb20gJy4uLy4uL2NvcmUvbGliL2V4cHJlc3MvcGluZydcbmltcG9ydCBtaWRkbGV3YXJlIGZyb20gJy4uL2xpYi9zb2NrZXRpbydcbmltcG9ydCBSZWRpcyBmcm9tICdzb2NrZXQuaW8tcmVkaXMnXG5pbXBvcnQgc29ja2V0aW8gZnJvbSAnc29ja2V0LmlvJ1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcydcbmltcG9ydCBjaGFsayBmcm9tICdjaGFsaydcbmltcG9ydCBodHRwIGZyb20gJ2h0dHAnXG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jICgpID0+IHtcblxuICBjb25zdCBzZXJ2ZXIgPSBleHByZXNzKClcblxuICBzZXJ2ZXIudXNlKHBpbmcpXG5cbiAgY29uc3QgdHJhbnNwb3J0ID0gaHR0cC5jcmVhdGVTZXJ2ZXIoc2VydmVyKVxuXG4gIGNvbnN0IHJlZGlzID0gUmVkaXMocHJvY2Vzcy5lbnYuUkVESVNfVVJMKVxuXG4gIGNvbnN0IGlvID0gc29ja2V0aW8odHJhbnNwb3J0KVxuXG4gIGlvLmFkYXB0ZXIocmVkaXMpXG5cbiAgaW8ub24oJ2Nvbm5lY3Rpb24nLCAoc29jaykgPT4gbWlkZGxld2FyZShpbywgc29jaykpXG5cbiAgd3JpdGVQYWRkZWRMaW5lKGNoYWxrLmdyZXkoYFN0YXJ0aW5nIHNvY2tldCBvbiBwb3J0ICR7cHJvY2Vzcy5lbnYuU09DS0VUX1BPUlR9YCksIGNoYWxrLmdyZWVuKCfinJQnKSwgJyNGRkZGRkYnLCB0cnVlLCB0cnVlKVxuXG4gIHRyYW5zcG9ydC5saXN0ZW4ocHJvY2Vzcy5lbnYuU09DS0VUX1BPUlQpXG5cbn1cbiIsImNvbnN0IHBpbmcgPSAocmVxLCByZXMsIG5leHQpID0+IHJlcy5zdGF0dXMoMjAwKS5zZW5kKCdwb25nJylcblxuZXhwb3J0IGRlZmF1bHQgcGluZ1xuIiwiaW1wb3J0IHNlcnZlciBmcm9tICcuL3NlcnZlcidcbmltcG9ydCBwcmVzZW5jZSBmcm9tICcuL3ByZXNlbmNlJ1xuaW1wb3J0IGNvbGxlY3RPYmplY3RzIGZyb20gJy4uLy4uL3V0aWxzL2NvbGxlY3Rfb2JqZWN0cydcblxuY29uc3Qgc29ja2V0cyA9IGNvbGxlY3RPYmplY3RzKCdhZG1pbi9zb2NrZXQnKVxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoaW8sIHNvY2tldCkgPT4ge1xuXG4gIGF3YWl0IHNlcnZlcihpbywgc29ja2V0KVxuXG4gIGF3YWl0IHByZXNlbmNlKGlvLCBzb2NrZXQpXG5cbiAgYXdhaXQgUHJvbWlzZS5tYXAoc29ja2V0cywgYXN5bmMgc29ja2V0RmlsZSA9PiB7XG5cbiAgICBjb25zdCBoYW5kbGVyID0gc29ja2V0RmlsZS5kZWZhdWx0XG5cbiAgICBhd2FpdCBoYW5kbGVyKGlvLCBzb2NrZXQpXG5cbiAgfSlcblxufVxuIiwiaW1wb3J0IHsgZ2V0UHJlc2VuY2UsIHNldFByZXNlbmNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcHJlc2VuY2UnXG5pbXBvcnQgeyBhdXRoZW50aWNhdGUgfSBmcm9tICcuL3V0aWxzJ1xuXG5jb25zdCBwcmVzZW5jZSA9IGFzeW5jIChpbywgc29ja2V0KSA9PiB7XG5cbiAgbGV0IHVzZXIgPSBudWxsXG5cbiAgY29uc3QgcHJlc2VuY2UgPSBhd2FpdCBnZXRQcmVzZW5jZSgpXG5cbiAgc29ja2V0LmVtaXQoJ3ByZXNlbmNlJywgcHJlc2VuY2UpXG5cbiAgc29ja2V0Lm9uKCdzaWduaW4nLCBhc3luYyAodG9rZW4sIGNoYW5uZWwsIGRhdGEsIGNhbGxiYWNrKSA9PiB7XG5cbiAgICBjb25zdCBhdXRoID0gYXdhaXQgYXV0aGVudGljYXRlKHRva2VuKVxuXG4gICAgdXNlciA9IGF1dGgudXNlclxuXG4gICAgaWYoIXVzZXIpIHJldHVyblxuXG4gICAgY29uc3QgdXNlcnMgPSBhd2FpdCBnZXRQcmVzZW5jZSgpXG5cbiAgICBjb25zdCBwcmVzZW5jZSA9IGF3YWl0IHNldFByZXNlbmNlKFtcbiAgICAgIC4uLnVzZXJzLmZpbHRlcihpdGVtID0+IGl0ZW0udXNlcl9pZCAhPT0gdXNlci5nZXQoJ2lkJykpLFxuICAgICAge1xuICAgICAgICB1c2VyX2lkOiB1c2VyLmdldCgnaWQnKSxcbiAgICAgICAgc2Vzc2lvbl9pZDogYXV0aC5zZXNzaW9uLmdldCgnaWQnKSxcbiAgICAgICAgc3RhdHVzOiBkYXRhLnN0YXR1c1xuICAgICAgfVxuICAgIF0pXG5cbiAgICBpby5lbWl0KCdwcmVzZW5jZScsIHByZXNlbmNlKVxuXG4gICAgY2FsbGJhY2soKVxuXG4gIH0pXG5cbiAgc29ja2V0Lm9uKCdzaWdub3V0JywgYXN5bmMgKHRva2VuLCBjaGFubmVsLCBkYXRhLCBjYWxsYmFjaykgPT4ge1xuXG4gICAgY29uc3QgYXV0aCA9IGF3YWl0IGF1dGhlbnRpY2F0ZSh0b2tlbilcblxuICAgIHVzZXIgPSBhdXRoLnVzZXJcblxuICAgIGlmKCF1c2VyKSByZXR1cm5cblxuICAgIGNvbnN0IHVzZXJzID0gYXdhaXQgZ2V0UHJlc2VuY2UoKVxuXG4gICAgY29uc3QgcHJlc2VuY2UgPSBhd2FpdCBzZXRQcmVzZW5jZSh1c2Vycy5maWx0ZXIoaXRlbSA9PiB7XG5cbiAgICAgIHJldHVybiBpdGVtLnVzZXJfaWQgIT09IHVzZXIuZ2V0KCdpZCcpXG5cbiAgICB9KSlcblxuICAgIGlvLmVtaXQoJ3ByZXNlbmNlJywgcHJlc2VuY2UpXG5cbiAgICBjYWxsYmFjaygpXG5cbiAgfSlcblxuICBzb2NrZXQub24oJ3N0YXR1cycsIGFzeW5jICh0b2tlbiwgY2hhbm5lbCwgZGF0YSwgY2FsbGJhY2sgPSAoKSA9PiB7fSkgPT4ge1xuXG4gICAgY29uc3QgYXV0aCA9IGF3YWl0IGF1dGhlbnRpY2F0ZSh0b2tlbilcblxuICAgIHVzZXIgPSBhdXRoLnVzZXJcblxuICAgIGlmKCF1c2VyKSByZXR1cm5cblxuICAgIGNvbnN0IHVzZXJzID0gYXdhaXQgZ2V0UHJlc2VuY2UoKVxuXG4gICAgY29uc3QgcHJlc2VuY2UgPSBhd2FpdCBzZXRQcmVzZW5jZSh1c2Vycy5tYXAoaXRlbSA9PiAoe1xuICAgICAgLi4uaXRlbSxcbiAgICAgIHN0YXR1czogaXRlbS51c2VyX2lkID09PSB1c2VyLmdldCgnaWQnKSA/IGRhdGEuc3RhdHVzIDogaXRlbS5zdGF0dXNcbiAgICB9KSkpXG5cbiAgICBpby5lbWl0KCdwcmVzZW5jZScsIHByZXNlbmNlKVxuXG4gIH0pXG5cbiAgc29ja2V0Lm9uKCdkaXNjb25uZWN0JywgYXN5bmMgKCkgPT4ge1xuXG4gICAgY29uc3QgdXNlcnMgPSBhd2FpdCBnZXRQcmVzZW5jZSgpXG5cbiAgICBpZighdXNlcikgcmV0dXJuXG5cbiAgICBjb25zdCBwcmVzZW5jZSA9IGF3YWl0IHNldFByZXNlbmNlKHVzZXJzLmZpbHRlcihpdGVtID0+IHtcblxuICAgICAgcmV0dXJuIGl0ZW0udXNlcl9pZCAhPT0gdXNlci5nZXQoJ2lkJylcblxuICAgIH0pKVxuXG4gICAgdXNlciA9IG51bGxcblxuICAgIGlvLmVtaXQoJ3ByZXNlbmNlJywgcHJlc2VuY2UpXG5cbiAgfSlcblxufVxuXG5leHBvcnQgZGVmYXVsdCBwcmVzZW5jZVxuIiwiaW1wb3J0IGZvcm1hdE9iamVjdEZvclRyYW5zcG9ydCBmcm9tICcuLi8uLi91dGlscy9mb3JtYXRfb2JqZWN0X2Zvcl90cmFuc3BvcnQnXG5pbXBvcnQgeyBhdXRoZW50aWNhdGUgfSBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuXG5jb25zdCBzZXJ2ZXIgPSBhc3luYyAoaW8sIHNvY2tldCkgPT4ge1xuXG4gIGxldCBjaGFubmVscyA9IFtdXG5cbiAgY29uc3QgYXV0aG9yaXplID0gKGNoYW5uZWwpID0+IF8uaW5jbHVkZXMoY2hhbm5lbHMsIGNoYW5uZWwpXG5cbiAgc29ja2V0Lm9uKCdqb2luJywgYXN5bmMgKHRva2VuLCBjaGFubmVsLCBkYXRhLCBjYWxsYmFjaykgPT4ge1xuXG4gICAgY29uc3QgYXV0aGVudGljYXRlZCA9IGF3YWl0IGF1dGhlbnRpY2F0ZSh0b2tlbilcblxuICAgIGNvbnN0IGF1dGhvcml6ZWQgPSBhdXRob3JpemUoY2hhbm5lbClcblxuICAgIGlmKGF1dGhlbnRpY2F0ZWQgJiYgIWF1dGhvcml6ZWQpIHtcblxuICAgICAgc29ja2V0LmpvaW4oY2hhbm5lbClcblxuICAgICAgY2hhbm5lbHMucHVzaChjaGFubmVsKVxuXG4gICAgfVxuXG4gICAgaWYoYXV0aGVudGljYXRlZCAmJiBjYWxsYmFjaykgY2FsbGJhY2sodHJ1ZSlcblxuICB9KVxuXG4gIHNvY2tldC5vbignbGVhdmUnLCAodG9rZW4sIGNoYW5uZWwsIGRhdGEsIGNhbGxiYWNrKSA9PiB7XG5cbiAgICBjb25zdCBhdXRob3JpemVkID0gYXV0aG9yaXplKGNoYW5uZWwpXG5cbiAgICBpZihhdXRob3JpemVkKSB7XG5cbiAgICAgIHNvY2tldC5sZWF2ZShjaGFubmVsKVxuXG4gICAgICBjaGFubmVscyA9IGNoYW5uZWxzLmZpbHRlcihjaCA9PiBjaCAhPT0gY2hhbm5lbClcblxuICAgIH1cblxuICAgIGlmKGNhbGxiYWNrKSBjYWxsYmFjayhhdXRob3JpemVkKVxuXG4gIH0pXG5cbiAgc29ja2V0Lm9uKCdtZXNzYWdlJywgKHRva2VuLCBjaGFubmVsLCBkYXRhLCBjYWxsYmFjaykgPT4ge1xuXG4gICAgY29uc3QgYXV0aG9yaXplZCA9IGF1dGhvcml6ZShjaGFubmVsKVxuXG4gICAgaWYoYXV0aG9yaXplZCkgaW8uaW4oY2hhbm5lbCkuc2VuZChmb3JtYXRPYmplY3RGb3JUcmFuc3BvcnQoZGF0YSkpXG5cbiAgICBpZihjYWxsYmFjaykgY2FsbGJhY2soYXV0aG9yaXplZClcblxuICB9KVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IHNlcnZlclxuIiwiaW1wb3J0IFNlc3Npb24gZnJvbSAnLi4vLi4vLi4vbW9kZWxzL3Nlc3Npb24nXG5pbXBvcnQgKiBhcyBqd3QgZnJvbSAnLi4vLi4vc2VydmljZXMvand0J1xuaW1wb3J0IFVzZXIgZnJvbSAnLi4vLi4vLi4vbW9kZWxzL3VzZXInXG5cbmV4cG9ydCBjb25zdCBhdXRoZW50aWNhdGUgPSBhc3luYyAodG9rZW4pID0+IHtcblxuICBpZighdG9rZW4pIHRocm93IG5ldyBFcnJvcignbm8gdG9rZW4gcHJvdmlkZWQnKVxuXG4gIGNvbnN0IHRva2VuRGF0YSA9IGp3dC5kZWNvZGUodG9rZW4pXG5cbiAgaWYoIXRva2VuRGF0YS5kYXRhLnVzZXJfaWQpIHRocm93IG5ldyBFcnJvcignaW52YWxpZCB0b2tlbicpXG5cbiAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIud2hlcmUoeyBpZDogdG9rZW5EYXRhLmRhdGEudXNlcl9pZCB9KS5mZXRjaCgpXG5cbiAgaWYoIXVzZXIpIHRocm93IG5ldyBFcnJvcignaW52YWxpZCB1c2VyJylcblxuICBjb25zdCBzZXNzaW9uID0gYXdhaXQgU2Vzc2lvbi53aGVyZSh7IGlkOiB0b2tlbkRhdGEuZGF0YS5zZXNzaW9uX2lkIH0pLmZldGNoKClcblxuICByZXR1cm4ge1xuICAgIHNlc3Npb24sXG4gICAgdXNlclxuICB9XG5cbn1cbiIsImNsYXNzIEFwcCB7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuXG4gICAgdGhpcy5jb25maWcgPSBvcHRpb25zXG5cbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcFxuIiwiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IGtuZXggZnJvbSAnLi4vc2VydmljZXMva25leCdcbmltcG9ydCB7IGJlZ2luTG9nZ2VyLCBlbmRMb2dnZXIsIHByaW50Q3JvbkxvZ2dlciB9IGZyb20gJy4uL3V0aWxzL2xvZ2dlcidcblxuY29uc3QgY3JvbiA9IChvcHRpb25zKSA9PiB7XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBvcHRpb25zLm5hbWUsXG4gICAgc2NoZWR1bGU6IG9wdGlvbnMuc2NoZWR1bGUsXG4gICAgaGFuZGxlcjogKCkgPT4gd2l0aExvZ2dlcih7XG4gICAgICBuYW1lOiBvcHRpb25zLm5hbWUsXG4gICAgICBwcm9jZXNzb3I6IG9wdGlvbnMucHJvY2Vzc29yLFxuICAgICAgYWZ0ZXJDb21taXQ6IG9wdGlvbnMuYWZ0ZXJDb21taXQsXG4gICAgICBiZWZvcmVSb2xsYmFjazogb3B0aW9ucy5iZWZvcmVSb2xsYmFja1xuICAgIH0pXG4gIH1cblxufVxuXG5jb25zdCB3aXRoTG9nZ2VyID0gYXN5bmMgKHsgbmFtZSwgcHJvY2Vzc29yLCBhZnRlckNvbW1pdCwgYmVmb3JlUm9sbGJhY2sgfSkgPT4ge1xuXG4gIGNvbnN0IHJlcXVlc3RJZCA9IF8ucmFuZG9tKDEwMDAwMCwgOTk5OTk5KS50b1N0cmluZygzNilcblxuICBiZWdpbkxvZ2dlcihyZXF1ZXN0SWQpXG5cbiAgYXdhaXQgd2l0aFRyYW5zYWN0aW9uKHsgcHJvY2Vzc29yLCBhZnRlckNvbW1pdCwgYmVmb3JlUm9sbGJhY2sgfSlcblxuICBwcmludENyb25Mb2dnZXIobmFtZSwgcmVxdWVzdElkKVxuXG4gIGVuZExvZ2dlcihyZXF1ZXN0SWQpXG5cbn1cblxuY29uc3Qgd2l0aFRyYW5zYWN0aW9uID0gYXN5bmMgKHsgcHJvY2Vzc29yLCBhZnRlckNvbW1pdCwgYmVmb3JlUm9sbGJhY2sgfSkgPT4ge1xuXG4gIGF3YWl0IGtuZXgudHJhbnNhY3Rpb24oYXN5bmMgdHJ4ID0+IHtcblxuICAgIHRyeSB7XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHByb2Nlc3Nvcih0cngpXG5cbiAgICAgIGF3YWl0IHRyeC5jb21taXQoKVxuXG4gICAgICBpZihhZnRlckNvbW1pdCkgYXdhaXQgYWZ0ZXJDb21taXQodHJ4LCByZXN1bHQpXG5cbiAgICB9IGNhdGNoKGVycikge1xuXG4gICAgICBjb25zb2xlLmxvZyhlcnIpXG5cbiAgICAgIGlmKGJlZm9yZVJvbGxiYWNrKSBhd2FpdCBiZWZvcmVSb2xsYmFjayh0cngpXG5cbiAgICAgIGF3YWl0IHRyeC5yb2xsYmFjayhlcnIpXG5cbiAgICB9XG5cbiAgfSlcblxufVxuXG5leHBvcnQgZGVmYXVsdCBjcm9uXG4iLCJjb25zdCBlbWFpbCA9IChvcHRpb25zKSA9PiB7XG5cbiAgcmV0dXJuIG9wdGlvbnNcblxufVxuXG5leHBvcnQgZGVmYXVsdCBlbWFpbFxuIiwiY2xhc3MgRml4dHVyZXMge1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblxuICAgIHJldHVybiBvcHRpb25zXG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBGaXh0dXJlc1xuIiwiY2xhc3MgTWFpbGJveCB7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuXG4gICAgcmV0dXJuIG9wdGlvbnNcblxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWFpbGJveFxuIiwiY2xhc3MgTWlncmF0aW9uIHtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cbiAgICByZXR1cm4gb3B0aW9uc1xuXG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBNaWdyYXRpb25cbiIsImltcG9ydCBib29rc2hlbGYgZnJvbSAnLi4vc2VydmljZXMvYm9va3NoZWxmJ1xuaW1wb3J0ICcuLi92YWxpZGF0aW9ucy9sYXRlcl90aGFuX3ZhbGlkYXRpb24nXG5pbXBvcnQgJy4uL3ZhbGlkYXRpb25zL2RhdGVzdHJpbmdfdmFsaWRhdGlvbidcbmltcG9ydCAnLi4vdmFsaWRhdGlvbnMvY3VycmVuY3lfdmFsaWRhdGlvbidcbmltcG9ydCAnLi4vdmFsaWRhdGlvbnMvZ3JlYXRlcl90aGFuX2ZpZWxkX3ZhbGlkYXRpb24nXG5pbXBvcnQgJy4uL3ZhbGlkYXRpb25zL3RpbWVfdmFsaWRhdGlvbidcbmltcG9ydCAnLi4vdmFsaWRhdGlvbnMvdW5pcXVlX3ZhbGlkYXRpb24nXG5pbXBvcnQgQ2hlY2tpdCBmcm9tICAnY2hlY2tpdCdcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCdcblxuY2xhc3MgTW9kZWwge1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblxuICAgIHJldHVybiBib29rc2hlbGYuTW9kZWwuZXh0ZW5kKHtcblxuICAgICAgaGFzVGltZXN0YW1wczogb3B0aW9ucy5oYXNUaW1lc3RhbXBzICE9PSBmYWxzZSxcblxuICAgICAgdGFibGVOYW1lOiAnJyxcblxuICAgICAgZGlzcGxheU5hbWU6ICcnLFxuXG4gICAgICBkaXNwbGF5QXR0cmlidXRlOiAnJyxcblxuICAgICAgcnVsZXM6IHt9LFxuXG4gICAgICB2aXJ0dWFsczoge30sXG5cbiAgICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKGF0dHJzLCBvcHRzKSB7XG5cbiAgICAgICAgdGhpcy5vbignc2F2aW5nJywgdGhpcy52YWxpZGF0ZVNhdmUpXG5cbiAgICAgIH0sXG5cbiAgICAgIGZldGNoOiBmdW5jdGlvbihmZXRjaE9wdGlvbnMgPSB7fSkge1xuXG4gICAgICAgIHJldHVybiBib29rc2hlbGYuTW9kZWwucHJvdG90eXBlLmZldGNoLmNhbGwodGhpcywgbWVyZ2VPcHRpb25zKGZldGNoT3B0aW9ucywgb3B0aW9ucykpXG5cbiAgICAgIH0sXG5cbiAgICAgIGZldGNoQWxsOiBmdW5jdGlvbihmZXRjaE9wdGlvbnMgPSB7fSkge1xuXG4gICAgICAgIHJldHVybiBib29rc2hlbGYuTW9kZWwucHJvdG90eXBlLmZldGNoQWxsLmNhbGwodGhpcywgbWVyZ2VPcHRpb25zKGZldGNoT3B0aW9ucywgb3B0aW9ucykpXG5cbiAgICAgIH0sXG5cbiAgICAgIHZhbGlkYXRlU2F2ZTogZnVuY3Rpb24obW9kZWwsIGF0dHJzLCBzYXZlT3B0aW9ucykge1xuXG4gICAgICAgIGlmKHNhdmVPcHRpb25zLnNraXBWYWxpZGF0aW9uKSByZXR1cm4gdHJ1ZVxuXG4gICAgICAgIGNvbnN0IHJ1bGVzID0gKHRoaXMuYmVsb25nc1RvVGVhbSAhPT0gZmFsc2UpID8ge1xuICAgICAgICAgIC4uLihzYXZlT3B0aW9ucy53aXRoUnVsZXMgfHwgdGhpcy5ydWxlcyksXG4gICAgICAgICAgLi4uKG9wdGlvbnMuYmVsb25nc1RvVGVhbSAhPT0gZmFsc2UgPyB7IHRlYW1faWQ6ICdyZXF1aXJlZCcgfSA6IHt9KVxuICAgICAgICB9IDoge31cblxuICAgICAgICByZXR1cm4gbmV3IENoZWNraXQocnVsZXMpLnJ1bih0aGlzLmF0dHJpYnV0ZXMsIHsgdGFibGVOYW1lOiB0aGlzLnRhYmxlTmFtZSB9KVxuXG4gICAgICB9LFxuXG4gICAgICBhY3Rpdml0aWVzOiBmdW5jdGlvbigpIHtcblxuICAgICAgICBjb25zdCBBY3Rpdml0eSA9IHJlcXVpcmUoJy4uLy4uL21vZGVscy9hY3Rpdml0eScpLmRlZmF1bHRcblxuICAgICAgICByZXR1cm4gdGhpcy5tb3JwaE1hbnkoQWN0aXZpdHksICdhY3RpdmFibGUnLCBbJ29iamVjdF90YWJsZScsICdvYmplY3RfaWQnXSlcblxuICAgICAgfSxcblxuICAgICAgYXVkaXQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGNvbnN0IEF1ZGl0ID0gcmVxdWlyZSgnLi4vLi4vbW9kZWxzL2F1ZGl0JykuZGVmYXVsdFxuXG4gICAgICAgIHJldHVybiB0aGlzLm1vcnBoTWFueShBdWRpdCwgJ2F1ZGl0YWJsZScpXG5cbiAgICAgIH0sXG5cbiAgICAgIGNvbW1lbnRzOiBmdW5jdGlvbigpIHtcblxuICAgICAgICBjb25zdCBDb21tZW50ID0gcmVxdWlyZSgnLi4vLi4vbW9kZWxzL2NvbW1lbnQnKS5kZWZhdWx0XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubW9ycGhNYW55KENvbW1lbnQsICdjb21tZW50YWJsZScpXG5cbiAgICAgIH0sXG5cblxuICAgICAgbGlrZXM6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGNvbnN0IExpa2UgPSByZXF1aXJlKCcuLi8uLi9tb2RlbHMvbGlrZScpLmRlZmF1bHRcblxuICAgICAgICByZXR1cm4gdGhpcy5tb3JwaE1hbnkoTGlrZSwgJ2xpa2VhYmxlJykucXVlcnkocWIgPT4ge1xuXG4gICAgICAgICAgcWIud2hlcmVOdWxsKCd1bmxpa2VkX2F0JylcblxuICAgICAgICB9KVxuXG4gICAgICB9LFxuXG4gICAgICBsaXN0ZW5pbmdzOiBmdW5jdGlvbigpIHtcblxuICAgICAgICBjb25zdCBMaXN0ZW5pbmcgPSByZXF1aXJlKCcuLi8uLi9tb2RlbHMvbGlzdGVuaW5nJykuZGVmYXVsdFxuXG4gICAgICAgIHJldHVybiB0aGlzLm1vcnBoTWFueShMaXN0ZW5pbmcsICdsaXN0ZW5hYmxlJylcblxuICAgICAgfSxcblxuICAgICAgcmV2aWV3czogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgY29uc3QgUmV2aWV3ID0gcmVxdWlyZSgnLi4vLi4vbW9kZWxzL3JldmlldycpLmRlZmF1bHRcblxuICAgICAgICByZXR1cm4gdGhpcy5tb3JwaE1hbnkoUmV2aWV3LCAncmV2aWV3YWJsZScpXG5cbiAgICAgIH0sXG5cbiAgICAgIHN0YXJzOiBmdW5jdGlvbigpIHtcblxuICAgICAgICBjb25zdCBTdGFyID0gcmVxdWlyZSgnLi4vLi4vbW9kZWxzL3N0YXInKS5kZWZhdWx0XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubW9ycGhNYW55KFN0YXIsICdzdGFycmFibGUnKVxuXG4gICAgICB9LFxuXG4gICAgICB0ZWFtOiBmdW5jdGlvbigpIHtcblxuICAgICAgICBjb25zdCBUZWFtID0gcmVxdWlyZSgnLi4vLi4vbW9kZWxzL3RlYW0nKS5kZWZhdWx0XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYmVsb25nc1RvKFRlYW0sICd0ZWFtX2lkJylcblxuICAgICAgfSxcblxuICAgICAgLi4ub3B0aW9uc1xuXG4gICAgfSlcblxuICB9XG5cbn1cblxuY29uc3QgbWVyZ2VPcHRpb25zID0gKG9wdGlvbnMsIGNvbmZpZykgPT4gKHtcbiAgLi4ub3B0aW9ucyxcbiAgd2l0aFJlbGF0ZWQ6IFtcbiAgICAuLi5jb2VyY2VBcnJheShvcHRpb25zLndpdGhSZWxhdGVkKSxcbiAgICAuLi5jb2VyY2VBcnJheShjb25maWcud2l0aFJlbGF0ZWQpXG4gIF1cbn0pXG5cblxuY29uc3QgY29lcmNlQXJyYXkgPSAodmFsdWUpID0+ICFfLmlzTmlsKHZhbHVlKSA/ICghXy5pc0FycmF5KHZhbHVlKSA/IFt2YWx1ZV0gOiB2YWx1ZSkgOiBbXVxuXG5leHBvcnQgZGVmYXVsdCBNb2RlbFxuIiwiY2xhc3MgTmF2aWdhdGlvbiB7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuXG4gICAgcmV0dXJuIG9wdGlvbnNcblxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTmF2aWdhdGlvblxuIiwiY29uc3QgTm90aWZpY2F0aW9uVHlwZXMgPSAob3B0aW9ucykgPT4ge1xuXG4gIHJldHVybiBvcHRpb25zXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTm90aWZpY2F0aW9uVHlwZXNcbiIsImltcG9ydCB7IGJlZ2luTG9nZ2VyLCBlbmRMb2dnZXIsIHByaW50UXVldWVMb2dnZXIgfSBmcm9tICcuLi91dGlscy9sb2dnZXInXG5pbXBvcnQga25leCBmcm9tICcuLi9zZXJ2aWNlcy9rbmV4J1xuaW1wb3J0IHJlZGlzIGZyb20gJ2lvcmVkaXMnXG5pbXBvcnQgQnVsbCBmcm9tICdidWxsJ1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuXG5jbGFzcyBRdWV1ZSB7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuXG4gICAgdGhpcy5fZW5xdWV1ZSA9IG9wdGlvbnMuZW5xdWV1ZVxuXG4gICAgdGhpcy5uYW1lID0gb3B0aW9ucy5uYW1lXG5cbiAgICB0aGlzLnByb2Nlc3NvciA9IG9wdGlvbnMucHJvY2Vzc29yXG5cbiAgICB0aGlzLmZhaWxlZCA9IG9wdGlvbnMuZmFpbGVkXG5cbiAgICB0aGlzLmNvbXBsZXRlZCA9IG9wdGlvbnMuY29tcGxldGVkXG5cbiAgICB0aGlzLnF1ZXVlID0gbmV3IEJ1bGwodGhpcy5uYW1lLCBudWxsLCBudWxsLCB7IGNyZWF0ZUNsaWVudCB9KVxuXG4gIH1cblxuICBhc3luYyBzdGFydChvcHRpb25zKSB7XG5cbiAgICBpZih0aGlzLnByb2Nlc3NvcikgdGhpcy5xdWV1ZS5wcm9jZXNzKHdyYXBwZWQodGhpcy5uYW1lLCB0aGlzLnByb2Nlc3NvcikpXG5cbiAgICBpZih0aGlzLmZhaWxlZCkgdGhpcy5xdWV1ZS5vbignZmFpbGVkJywgdGhpcy5mYWlsZWQpXG5cbiAgICBpZih0aGlzLmNvbXBsZXRlZCkgdGhpcy5xdWV1ZS5vbignY29tcGxldGVkJywgdGhpcy5jb21wbGV0ZWQpXG5cbiAgfVxuXG4gIGFzeW5jIGVucXVldWUocmVxLCB0cngsIG9wdGlvbnMpIHtcblxuICAgIC8vIGJ1aWxkIGpvYiB3aXRoIG9iamVjdCdzIGVucXVldWUgbWV0aG9kXG4gICAgY29uc3Qgam9iID0gYXdhaXQgdGhpcy5fZW5xdWV1ZShyZXEsIHRyeCwgb3B0aW9ucylcblxuICAgIC8vIGRvbnQgYWRkIHRvIHJlZGlzIHF1ZXVlIGR1cmluZyB0ZXN0XG4gICAgaWYocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICd0ZXN0JykgcmV0dXJuXG5cbiAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICAgIHRoaXMucXVldWUuYWRkKGpvYiwgeyBkZWxheTogMjAwMCwgYXR0ZW1wdHM6IDMsIGJhY2tvZmY6IDUwMDAgfSlcblxuICAgICAgICByZXNvbHZlKClcblxuICAgICAgfSwgNTAwKVxuXG4gICAgfSlcblxuICB9XG5cbiAgYXN5bmMgY2xlYW4odHlwZSkge1xuXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMucXVldWUuY2xlYW4oMCwgdHlwZSlcblxuICB9XG5cbiAgYXN5bmMgZ2V0Sm9iKGpvYl9pZCkge1xuXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMucXVldWUuZ2V0Sm9iKGpvYl9pZClcblxuICB9XG5cbn1cblxuY29uc3Qgd3JhcHBlZCA9IChuYW1lLCBwcm9jZXNzb3IpID0+IGFzeW5jIChqb2IsIGRvbmUpID0+IHtcblxuICBjb25zdCBwcm9jZXNzb3JXaXRoVHJhbnNhY3Rpb24gPSB3aXRoVHJhbnNhY3Rpb24ocHJvY2Vzc29yLCBqb2IpXG5cbiAgY29uc3QgcHJvY2Vzc29yV2l0aExvZ2dlciA9IHdpdGhMb2dnZXIobmFtZSwgcHJvY2Vzc29yV2l0aFRyYW5zYWN0aW9uLCBqb2IpXG5cbiAgY29uc3QgaXNfcHJvZCA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbidcblxuICBjb25zdCBlbnZQcm9jZXNzb3IgPSAhaXNfcHJvZCA/IHByb2Nlc3NvcldpdGhMb2dnZXIgOiBwcm9jZXNzb3JXaXRoVHJhbnNhY3Rpb25cblxuICB0cnkge1xuXG4gICAgYXdhaXQgZW52UHJvY2Vzc29yKClcblxuICAgIGRvbmUoKVxuXG4gIH0gY2F0Y2goZXJyKSB7XG5cbiAgICBkb25lKGVycilcblxuICB9XG5cbn1cblxuY29uc3Qgd2l0aExvZ2dlciA9IChuYW1lLCBwcm9jZXNzb3IsIGpvYikgPT4gYXN5bmMgKCkgPT4ge1xuXG4gIGNvbnN0IHJlcXVlc3RJZCA9IF8ucmFuZG9tKDEwMDAwMCwgOTk5OTk5KS50b1N0cmluZygzNilcblxuICBiZWdpbkxvZ2dlcihyZXF1ZXN0SWQpXG5cbiAgYXdhaXQgcHJvY2Vzc29yKClcblxuICBwcmludFF1ZXVlTG9nZ2VyKG5hbWUsIGpvYiwgcmVxdWVzdElkKVxuXG4gIGVuZExvZ2dlcihyZXF1ZXN0SWQpXG5cbn1cblxuY29uc3Qgd2l0aFRyYW5zYWN0aW9uID0gKHByb2Nlc3Nvciwgam9iKSA9PiBhc3luYyAoKSA9PiB7XG5cbiAgYXdhaXQga25leC50cmFuc2FjdGlvbihhc3luYyB0cnggPT4ge1xuXG4gICAgdHJ5IHtcblxuICAgICAgYXdhaXQgcHJvY2Vzc29yKGpvYiwgdHJ4KVxuXG4gICAgICBhd2FpdCB0cnguY29tbWl0KClcblxuICAgIH0gY2F0Y2goZXJyKSB7XG5cbiAgICAgIGF3YWl0IHRyeC5yb2xsYmFjayhlcnIpXG5cbiAgICB9XG5cbiAgfSlcblxufVxuXG4vLyBjcmVhdGUgcmV1c2FibGUgY2xpZW50LCBhbmQgc3Vic2NyaWJlciBjb25uZWN0aW9ucy4gVGhlc2UgZ2V0IGluc3RhbnRpYXRlZFxuLy8gb25jZSBwZXIgcHJvY2VzcyBhbmQgYXJlIHJldXNlZCBhY3Jvc3MgYWxsIHF1ZXVlcyBydW5uaW5nIGluIHRoYXQgcHJvY2Vzc1xuXG5jb25zdCBjbGllbnQgPSBuZXcgcmVkaXMocHJvY2Vzcy5lbnYuUkVESVNfVVJMKVxuXG5jb25zdCBzdWJzY3JpYmVyID0gbmV3IHJlZGlzKHByb2Nlc3MuZW52LlJFRElTX1VSTClcblxuY29uc3QgY3JlYXRlQ2xpZW50ID0gKHR5cGUpID0+IHtcblxuICBpZih0eXBlID09PSAnY2xpZW50JykgcmV0dXJuIGNsaWVudFxuXG4gIGlmKHR5cGUgPT09ICdzdWJzY3JpYmVyJykgcmV0dXJuIHN1YnNjcmliZXJcblxuICByZXR1cm4gbmV3IHJlZGlzKHByb2Nlc3MuZW52LlJFRElTX1VSTClcblxufVxuXG5leHBvcnQgZGVmYXVsdCBRdWV1ZVxuIiwiaW1wb3J0IHsgUmVzb3VyY2VzIH0gZnJvbSAnYmFja2ZyYW1lJ1xuXG5jbGFzcyBNYWhhUmVzb3VyY2VzIHtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cbiAgICByZXR1cm4gbmV3IFJlc291cmNlcyh7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgZGVwZW5kZW50czogW1xuICAgICAgICB7IHJlbGF0aW9uc2hpcDogJ2FjdGl2aXRpZXMnLCBzdHJhdGVneTogJ2Rlc3Ryb3knIH0sXG4gICAgICAgIHsgcmVsYXRpb25zaGlwOiAnYXVkaXQnLCBzdHJhdGVneTogJ2Rlc3Ryb3knIH0sXG4gICAgICAgIHsgcmVsYXRpb25zaGlwOiAnY29tbWVudHMnLCBzdHJhdGVneTogJ2Rlc3Ryb3knIH0sXG4gICAgICAgIHsgcmVsYXRpb25zaGlwOiAnbGlzdGVuaW5ncycsIHN0cmF0ZWd5OiAnZGVzdHJveScgfSxcbiAgICAgICAgLi4ub3B0aW9ucy5kZXBlbmRlbnRzIHx8IFtdXG4gICAgICBdXG4gICAgfSlcblxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWFoYVJlc291cmNlc1xuIiwiY29uc3QgUmlnaHRzID0gKG9wdGlvbnMpID0+IHtcblxuICByZXR1cm4gb3B0aW9uc1xuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJpZ2h0c1xuIiwiY2xhc3MgUm91dGVzIHtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cbiAgICByZXR1cm4gb3B0aW9uc1xuXG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBSb3V0ZXNcbiIsImNvbnN0IHNlYXJjaCA9IChvcHRpb25zKSA9PiB7XG5cbiAgcmV0dXJuIG9wdGlvbnNcblxufVxuXG5leHBvcnQgZGVmYXVsdCBzZWFyY2hcbiIsImNvbnN0IHNlcmlhbGl6ZXIgPSAob3B0aW9ucykgPT4ge1xuXG4gIHJldHVybiBvcHRpb25zXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgc2VyaWFsaXplclxuIiwiaW1wb3J0IGF3cyBmcm9tICdhd3Mtc2RrJ1xuXG5hd3MuY29uZmlnLmNvbnN0cnVjdG9yKHtcbiAgYWNjZXNzS2V5SWQ6IHByb2Nlc3MuZW52LkFXU19BQ0NFU1NfS0VZX0lEIHx8ICcnLFxuICBzZWNyZXRBY2Nlc3NLZXk6IHByb2Nlc3MuZW52LkFXU19TRUNSRVRfQUNDRVNTX0tFWSB8fCAnJyxcbiAgcmVnaW9uOiBwcm9jZXNzLmVudi5BV1NfUkVHSU9OIHx8ICcnXG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IGF3c1xuIiwiaW1wb3J0IEJvb2tzaGVsZiBmcm9tICdib29rc2hlbGYnXG5pbXBvcnQga25leCBmcm9tICcuL2tuZXgnXG5cbmNvbnN0IGJvb2tzaGVsZiA9IEJvb2tzaGVsZihrbmV4KVxuXG5ib29rc2hlbGYucGx1Z2luKCd2aXJ0dWFscycpXG5cbmV4cG9ydCBkZWZhdWx0IGJvb2tzaGVsZlxuIiwiaW1wb3J0IEVtaXR0ZXIgZnJvbSAnc29ja2V0LmlvLWVtaXR0ZXInXG5cbmNvbnN0IGVtaXR0ZXIgPSBFbWl0dGVyKHByb2Nlc3MuZW52LlJFRElTX1VSTClcblxuZXhwb3J0IGRlZmF1bHQgZW1pdHRlclxuIiwiaW1wb3J0IGp3dCBmcm9tICdqc29ud2VidG9rZW4nXG5cbmV4cG9ydCBjb25zdCBlbmNvZGUgPSAoZGF0YSwgZHVyYXRpb24pID0+IHtcblxuICBjb25zdCBpYXQgPSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKVxuXG4gIGNvbnN0IGV4cCA9IGlhdCArIGR1cmF0aW9uXG5cbiAgcmV0dXJuIGp3dC5zaWduKHsgaWF0LCBleHAsIGRhdGEgfSwgcHJvY2Vzcy5lbnYuU0VDUkVUKVxuXG59XG5cbmV4cG9ydCBjb25zdCBkZWNvZGUgPSAodG9rZW4pID0+IHtcblxuICByZXR1cm4gand0LnZlcmlmeSh0b2tlbiwgcHJvY2Vzcy5lbnYuU0VDUkVUKVxuXG59IiwiaW1wb3J0IEtuZXggZnJvbSAna25leCdcblxuY29uc3QgW3VybCwgcHJvdG9jb2xdID0gcHJvY2Vzcy5lbnYuREFUQUJBU0VfVVJMLm1hdGNoKC8oLiopOlxcL1xcL1xcLz8oLiopLylcblxuY29uc3QgZ2V0Q2xpZW50ID0gKHByb3RvY29sKSA9PiB7XG5cbiAgc3dpdGNoKHByb3RvY29sKSB7XG5cbiAgY2FzZSAncG9zdGdyZXMnOlxuICAgIHJldHVybiAncG9zdGdyZXNxbCdcblxuICBkZWZhdWx0OlxuICAgIHJldHVybiBwcm90b2NvbFxuXG4gIH1cblxufVxuXG5jb25zdCBnZXRDb25uZWN0aW9uID0gKHByb3RvY29sLCB1cmwpID0+IHtcblxuICBzd2l0Y2gocHJvdG9jb2wpIHtcblxuICBkZWZhdWx0OlxuICAgIHJldHVybiB1cmxcblxuICB9XG5cbn1cblxuY29uc3QgZ2V0UG9vbCA9IChlbnYpID0+ICh7XG4gIG1pbjogKGVudiA9PT0gJ3Rlc3QnKSA/IDEgOiA1LFxuICBtYXg6IChlbnYgPT09ICd0ZXN0JykgPyAxIDogMzBcbn0pXG5cbmNvbnN0IGNvbmZpZyA9IHtcbiAgY2xpZW50OiBnZXRDbGllbnQocHJvdG9jb2wpLFxuICBjb25uZWN0aW9uOiBnZXRDb25uZWN0aW9uKHByb3RvY29sLCB1cmwpLFxuICB1c2VOdWxsQXNEZWZhdWx0OiB0cnVlLFxuICBwb29sOiBnZXRQb29sKHByb2Nlc3MuZW52Lk5PREVfRU5WKVxufVxuXG5jb25zdCBrbmV4ID0gbmV3IEtuZXgoY29uZmlnKVxuXG5leHBvcnQgZGVmYXVsdCBrbmV4XG4iLCJpbXBvcnQgcmVkaXMgZnJvbSAnLi9yZWRpcydcbmltcG9ydCBSZWRpc0xvY2sgZnJvbSAncmVkaXMtbG9jaydcblxuY29uc3QgTG9jayA9IFJlZGlzTG9jayhyZWRpcylcblxuY29uc3QgbG9jayA9ICgpID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICBMb2NrKHJlZGlzLCA1MDAsIHJlc29sdmUpXG5cbn0pXG5cbmV4cG9ydCBjb25zdCBnZXRQcmVzZW5jZSA9IGFzeW5jICgpID0+IHtcblxuICBsZXQgdXNlcnMgPSBudWxsXG5cbiAgY29uc3QgdW5sb2NrID0gYXdhaXQgbG9jaygncHJlc2VuY2UnKVxuXG4gIHVzZXJzID0gSlNPTi5wYXJzZShhd2FpdCByZWRpcy5nZXRBc3luYygncHJlc2VuY2UnKSkgfHwgW11cblxuICB1bmxvY2soKVxuXG4gIHJldHVybiB1c2Vyc1xuXG59XG5cbmV4cG9ydCBjb25zdCBzZXRQcmVzZW5jZSA9IGFzeW5jIChwcmVzZW5jZSkgPT4ge1xuXG4gIGNvbnN0IHVubG9jayA9IGF3YWl0IGxvY2soJ3ByZXNlbmNlJylcblxuICBhd2FpdCByZWRpcy5zZXRBc3luYygncHJlc2VuY2UnLCBKU09OLnN0cmluZ2lmeShwcmVzZW5jZSkpXG5cbiAgdW5sb2NrKClcblxuICByZXR1cm4gcHJlc2VuY2VcblxufVxuIiwiaW1wb3J0IHJlZGlzIGZyb20gJ3JlZGlzJ1xuXG5Qcm9taXNlLnByb21pc2lmeUFsbChyZWRpcy5SZWRpc0NsaWVudC5wcm90b3R5cGUpXG5cbmV4cG9ydCBkZWZhdWx0IHJlZGlzLmNyZWF0ZUNsaWVudChwcm9jZXNzLmVudi5SRURJU19VUkwpXG4iLCJpbXBvcnQgbm9kZW1haWxlciBmcm9tICdub2RlbWFpbGVyJ1xuaW1wb3J0IGF3cyBmcm9tICcuL2F3cydcblxuY29uc3QgU0VTID0gbmV3IGF3cy5TRVMoeyBhcGlWZXJzaW9uOiAnMjAxMC0xMi0wMScgfSlcblxuZXhwb3J0IGRlZmF1bHQgbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQoeyBTRVMgfSlcbiIsImltcG9ydCB3ZWJwdXNoIGZyb20gJ3dlYi1wdXNoJ1xuXG5leHBvcnQgY29uc3Qgc2VuZFZpYVB1c2ggPSBhc3luYyAoc2Vzc2lvbiwgbm90aWZpY2F0aW9uKSA9PiB7XG5cbiAgY29uc3QgcGF5bG9hZCA9IEpTT04uc3RyaW5naWZ5KG5vdGlmaWNhdGlvbilcblxuICBhd2FpdCB3ZWJwdXNoLnNlbmROb3RpZmljYXRpb24oe1xuICAgIGVuZHBvaW50OiBzZXNzaW9uLnJlbGF0ZWQoJ2RldmljZScpLmdldCgncHVzaF9lbmRwb2ludCcpLFxuICAgIGtleXM6IHtcbiAgICAgIHAyNTZkaDogc2Vzc2lvbi5yZWxhdGVkKCdkZXZpY2UnKS5nZXQoJ3B1c2hfcDI1NmRoJyksXG4gICAgICBhdXRoOiBzZXNzaW9uLnJlbGF0ZWQoJ2RldmljZScpLmdldCgncHVzaF9hdXRoJylcbiAgICB9XG4gIH0sIHBheWxvYWQsIHtcbiAgICBnY21BUElLZXk6IHByb2Nlc3MuZW52LkZDTV9BUElfS0VZLFxuICAgIHZhcGlkRGV0YWlsczoge1xuICAgICAgc3ViamVjdDogJ21haWx0bzpncmVnQHRoaW5rdG9wb2dyYXBoeS5jb20nLFxuICAgICAgcHVibGljS2V5OiBwcm9jZXNzLmVudi5WQVBJRF9QVUJMSUNfS0VZLFxuICAgICAgcHJpdmF0ZUtleTogcHJvY2Vzcy5lbnYuVkFQSURfUFJJVkFURV9LRVlcbiAgICB9XG4gIH0pXG5cbn1cbiIsImV4cG9ydCBjb25zdCBjb25maWdzID0gcHJvY2Vzcy5lbnYuQVBQUy5yZWR1Y2UoKGNvbmZpZ3MsIGFwcCkgPT4ge1xuXG4gIGNvbnN0IGNvbmZpZyA9IF9fd2VicGFja19yZXF1aXJlX18oYC4vYXBwcy8ke2FwcH0vc3JjL2FwcC5qc2ApXG5cbiAgcmV0dXJuIHtcbiAgICAuLi5jb25maWdzLFxuICAgIFthcHBdOiBjb25maWcuZGVmYXVsdFxuICB9XG5cbn0sIHt9KVxuXG5jb25zdCBhcHBDb25maWcgPSAobmFtZSkgPT4ge1xuXG4gIHJldHVybiBjb25maWdzW25hbWVdXG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBhcHBDb25maWdcbiIsImltcG9ydCBhcHBDb25maWcgZnJvbSAnLi9hcHBfY29uZmlnJ1xuaW1wb3J0IGdsb2IgZnJvbSAnZ2xvYidcblxuY29uc3QgY29sbGVjdE9iamVjdHMgPSAocGF0dGVybikgPT4gW1xuICAuLi5nbG9iLnN5bmMoYGFwcHMvKi9zcmMvJHtwYXR0ZXJufWApLFxuICAuLi5nbG9iLnN5bmMoYGFwcHMvKi9zcmMvJHtwYXR0ZXJufS9pbmRleC5qc2ApXG5dLm1hcChmaWxlID0+IHtcblxuICBjb25zdCBbLGFwcF0gPSBmaWxlLm1hdGNoKC9hcHBzXFwvKFteL10qKS8pXG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBhcHAsXG4gICAgZGVmYXVsdDogX193ZWJwYWNrX3JlcXVpcmVfXyhgLi8ke2ZpbGV9YCkuZGVmYXVsdCxcbiAgICBjb25maWc6IGFwcENvbmZpZyhhcHApXG4gIH1cblxufSlcblxuZXhwb3J0IGRlZmF1bHQgY29sbGVjdE9iamVjdHNcbiIsImltcG9ydCBjaGFsayBmcm9tICdjaGFsaydcbmltcG9ydCB3cmFwQW5zaSBmcm9tICd3cmFwLWFuc2knXG5cbmV4cG9ydCBjb25zdCB3cml0ZVBhZGRlZExpbmUgPSAobGFiZWwsIHRleHQgPSAnJywgYmFja2dyb3VuZCA9ICcjRkZGRkZGJywgbmV3bGluZSA9IHRydWUsIHJld2luZCA9IGZhbHNlKSA9PiB7XG5cbiAgY29uc3Qgd2lkdGggPSBwcm9jZXNzLnN0ZG91dC5jb2x1bW5zXG5cbiAgY29uc3QgbGFiZWxXaWR0aCA9IChsYWJlbCkgPyBzdHJpcEFuc2kobGFiZWwpLmxlbmd0aCA6IDBcblxuICBjb25zdCBjb250ZW50V2lkdGggPSB3aWR0aCAtIGxhYmVsV2lkdGggLSA2XG5cbiAgY29uc3QgcGFkZGVkID0gd3JhcEFuc2kodGV4dCwgY29udGVudFdpZHRoLCB7IGhhcmQ6IHRydWUgfSkuc3BsaXQoJ1xcbicpLm1hcCgoY2h1bmtMaW5lLCBpbmRleCk9PiB7XG5cbiAgICBjb25zdCBpbnRybyA9IGxhYmVsID8gKGluZGV4ID09PSAwID8gYCR7bGFiZWx9IGAgOiBBcnJheShsYWJlbFdpZHRoICsgMikuam9pbignICcpKSA6ICcnXG5cbiAgICBjb25zdCBsaW5lID0gaW50cm8gKyBjaHVua0xpbmVcblxuICAgIGNvbnN0IHN0cmlwcGVkID0gc3RyaXBBbnNpKGxpbmUpXG5cbiAgICBjb25zdCBleHRyYVdpZHRoID0gd2lkdGggLSBzdHJpcHBlZC5sZW5ndGggLSA0XG5cbiAgICBjb25zdCBleHRyYSA9IGV4dHJhV2lkdGggPiAwID8gQXJyYXkoZXh0cmFXaWR0aCkuam9pbignICcpIDogJydcblxuICAgIGNvbnN0IHRlcm1pbmF0aW9uID0gKG5ld2xpbmUpID8gJ1xcbicgOiAnJ1xuXG4gICAgcmV0dXJuIGNoYWxrLmJnSGV4KGJhY2tncm91bmQpLmdyZXkoJyAgJyArICBsaW5lICsgZXh0cmEgKyAnICAnICsgdGVybWluYXRpb24pXG5cblxuICB9KS5qb2luKCcnKVxuXG4gIGlmKHJld2luZCAmJiBwcm9jZXNzLnN0ZG91dC5jdXJzb3JUbykgcHJvY2Vzcy5zdGRvdXQuY3Vyc29yVG8oMClcblxuICBwcm9jZXNzLnN0ZG91dC53cml0ZShwYWRkZWQpXG5cbn1cblxuY29uc3Qgc3RyaXBBbnNpID0gKHRleHQpID0+IHRleHQucmVwbGFjZSgvW1xcdTAwMWJcXHUwMDliXVtbKCkjOz9dKig/OlswLTldezEsNH0oPzo7WzAtOV17MCw0fSkqKT9bMC05QS1PUlpjZi1ucXJ5PT48XS9nLCAnJylcbiIsImltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50J1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuXG5jb25zdCBmb3JtYXRPYmplY3RGb3JUcmFuc3BvcnQgPSAodmFsdWUpID0+IHtcblxuICBpZihfLmlzVW5kZWZpbmVkKHZhbHVlKSkgcmV0dXJuIG51bGxcblxuICBpZihfLmlzRGF0ZSh2YWx1ZSkpIHJldHVybiBtb21lbnQodmFsdWUpLnV0YygpLmZvcm1hdCgnWVlZWS1NTS1ERFRISDptbTpzcy5TU1MnKSArICdaJ1xuXG4gIGlmKF8uaXNQbGFpbk9iamVjdCh2YWx1ZSkpIHJldHVybiBPYmplY3Qua2V5cyh2YWx1ZSkucmVkdWNlKChmb3JtYXR0ZWQsIGtleSkgPT4gKHtcbiAgICAuLi5mb3JtYXR0ZWQsXG4gICAgW2tleV06IGZvcm1hdE9iamVjdEZvclRyYW5zcG9ydCh2YWx1ZVtrZXldKVxuICB9KSwge30pXG5cbiAgcmV0dXJuIHZhbHVlXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgZm9ybWF0T2JqZWN0Rm9yVHJhbnNwb3J0XG4iLCJpbXBvcnQgeyB3cml0ZVBhZGRlZExpbmUgfSBmcm9tICcuLi91dGlscy9jb25zb2xlJ1xuaW1wb3J0IGtuZXggZnJvbSAnLi4vc2VydmljZXMva25leCdcbmltcG9ydCBjaGFsayBmcm9tICdjaGFsaydcbmltcG9ydCB1dGlsIGZyb20gJ3V0aWwnXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5cbmNvbnN0IHJlcXVlc3RzID0ge31cblxuY29uc3QgbGlzdGVuZXJzID0ge31cblxuZXhwb3J0IGNvbnN0IGJlZ2luTG9nZ2VyID0gKHJlcXVlc3RJZCkgPT4ge1xuXG4gIGlmKCFyZXF1ZXN0c1tyZXF1ZXN0SWRdKSBfY3JlYXRlUmVxdWVzdChyZXF1ZXN0SWQpXG5cbiAgbGlzdGVuZXJzW3JlcXVlc3RJZF0gPSB7XG4gICAgcXVlcnk6IF9zdGFydFF1ZXJ5KHJlcXVlc3RJZCksXG4gICAgcmVzcG9uc2U6IF9lbmRRdWVyeShyZXF1ZXN0SWQpXG4gIH1cblxuICBrbmV4LmNsaWVudC5vbigncXVlcnknLCBsaXN0ZW5lcnNbcmVxdWVzdElkXS5xdWVyeSkub24oJ3F1ZXJ5LXJlc3BvbnNlJywgbGlzdGVuZXJzW3JlcXVlc3RJZF0ucmVzcG9uc2UpXG5cbiAgY29uc29sZS5tYWlsID0gX2xvZ01lc3NhZ2UoJ21haWwnLCByZXF1ZXN0SWQpXG5cbn1cblxuZXhwb3J0IGNvbnN0IGVuZExvZ2dlciA9IChyZXF1ZXN0SWQpID0+IHtcblxuICBrbmV4LmNsaWVudC5yZW1vdmVMaXN0ZW5lcigncXVlcnknLCBsaXN0ZW5lcnNbcmVxdWVzdElkXS5xdWVyeSkucmVtb3ZlTGlzdGVuZXIoJ3F1ZXJ5LXJlc3BvbnNlJywgbGlzdGVuZXJzW3JlcXVlc3RJZF0ucmVzcG9uc2UpXG5cbiAgZGVsZXRlIHJlcXVlc3RzW3JlcXVlc3RJZF1cblxuICBkZWxldGUgbGlzdGVuZXJzW3JlcXVlc3RJZF1cblxufVxuXG5leHBvcnQgY29uc3Qgd2l0aExvZ2dlciA9IChtaWRkbGV3YXJlKSA9PiAocmVxLCByZXMsIG5leHQpID0+IHtcblxuICBjb25zdCByZXF1ZXN0SWQgPSBfLnJhbmRvbSgxMDAwMDAsIDk5OTk5OSkudG9TdHJpbmcoMzYpXG5cbiAgYmVnaW5Mb2dnZXIocmVxdWVzdElkKVxuXG4gIG1pZGRsZXdhcmUocmVxLCByZXMsIG5leHQpXG5cbiAgcmVzLm9uKCdmaW5pc2gnLCAoKSA9PiB7XG5cbiAgICBwcmludE1pZGRsZXdhcmVMb2dnZXIocmVxLCByZXMsIHJlcXVlc3RJZClcblxuICAgIGVuZExvZ2dlcihyZXF1ZXN0SWQpXG5cbiAgfSlcblxufVxuXG5leHBvcnQgY29uc3QgcHJpbnRNaWRkbGV3YXJlTG9nZ2VyID0gKHJlcSwgcmVzLCByZXF1ZXN0SWQpID0+IHtcblxuICByZXF1ZXN0c1tyZXF1ZXN0SWRdLmR1cmF0aW9uID0gX2dldER1cmF0aW9uKHJlcXVlc3RzW3JlcXVlc3RJZF0uc3RhcnRUaW1lKVxuXG4gIGNvbnN0IHJlcXVlc3QgPSByZXF1ZXN0c1tyZXF1ZXN0SWRdXG5cbiAgY29uc3QgWyx1cmxdID0gcmVxLm9yaWdpbmFsVXJsLm1hdGNoKC9eKFteP10qKSguKik/JC8pXG5cbiAgY29uc3QgWyxob3N0bmFtZV0gPSByZXEuaGVhZGVycy5ob3N0Lm1hdGNoKC9eKFtcXHcuXSopOj8oXFxkKik/JC8pXG5cbiAgY29uc3QgdGl0bGUgPSBbJ1JFUVVFU1Q6ICcsIGAke3JlcS5tZXRob2R9ICR7dXJsfWBdXG5cbiAgY29uc3QgaGVhZCA9IFtdXG5cbiAgaWYoIV8uaXNOaWwocmVxLnRlYW0pKSBoZWFkLnB1c2goWydURUFNOiAgICAnLCBgJHtyZXEudGVhbS5nZXQoJ3RpdGxlJyl9IFsgSUQjICR7cmVxLnRlYW0uZ2V0KCdpZCcpfSBdYF0pXG5cbiAgaWYoXy5pc1N0cmluZyhyZXEuYXBwLmdldCgndGl0bGUnKSkpIGhlYWQucHVzaChbJ0FQUDogICAgICcsIHJlcS5hcHAuZ2V0KCd0aXRsZScpXSlcblxuICBpZighXy5pc05pbChyZXEudXNlcikpIGhlYWQucHVzaChbJ1VTRVI6ICAgICcsIGAke3JlcS51c2VyLmdldCgnZnVsbF9uYW1lJyl9IFsgSUQjICR7cmVxLnVzZXIuZ2V0KCdpZCcpfSBdYF0pXG5cbiAgaGVhZC5wdXNoKFsnSE9TVDogICAgJywgaG9zdG5hbWVdKVxuXG4gIGlmKCFfLmlzRW1wdHkocmVxLnBhcmFtcykpIGhlYWQucHVzaChbJ1BBUkFNUzogICcsIEpTT04uc3RyaW5naWZ5KHJlcS5wYXJhbXMpXSlcblxuICBpZighXy5pc0VtcHR5KHJlcS5ib2R5KSkgaGVhZC5wdXNoKFsnQk9EWTogICAgJywgSlNPTi5zdHJpbmdpZnkocmVxLmJvZHkpXSlcblxuICBpZighXy5pc0VtcHR5KHJlcS5xdWVyeSkpIGhlYWQucHVzaChbJ1FVRVJZOiAgICcsIEpTT04uc3RyaW5naWZ5KHJlcS5xdWVyeSldKVxuXG4gIGhlYWQucHVzaChbJ1JFU1BPTlNFOicsIGAke3Jlcy5zdGF0dXNDb2RlfSByZW5kZXJlZCBpbiAke3JlcXVlc3QuZHVyYXRpb259IG1zYF0pXG5cbiAgX3ByaW50TG9nZ2VyKHRpdGxlLCBoZWFkLCByZXF1ZXN0LCAnI0RCMjgyOCcpXG5cbn1cblxuZXhwb3J0IGNvbnN0IHByaW50UXVldWVMb2dnZXIgPSAocXVldWUsIGpvYiwgcmVxdWVzdElkKSA9PiB7XG5cbiAgcmVxdWVzdHNbcmVxdWVzdElkXS5kdXJhdGlvbiA9IF9nZXREdXJhdGlvbihyZXF1ZXN0c1tyZXF1ZXN0SWRdLnN0YXJ0VGltZSlcblxuICBjb25zdCByZXF1ZXN0ID0gcmVxdWVzdHNbcmVxdWVzdElkXVxuXG4gIGNvbnN0IHRpdGxlID0gWydRVUVVRTonLCBxdWV1ZV1cblxuICBjb25zdCBoZWFkID0gW11cblxuICBoZWFkLnB1c2goWydKT0I6ICAgICAnLCBKU09OLnN0cmluZ2lmeShqb2IuZGF0YSldKVxuXG4gIGhlYWQucHVzaChbJ1JFU1BPTlNFOicsIGBwcm9jZXNzZWQgaW4gJHtyZXF1ZXN0LmR1cmF0aW9ufSBtc2BdKVxuXG4gIF9wcmludExvZ2dlcih0aXRsZSwgaGVhZCwgcmVxdWVzdCwgJyNBMzMzQzgnKVxuXG59XG5cbmV4cG9ydCBjb25zdCBwcmludENyb25Mb2dnZXIgPSAoY3JvbiwgcmVxdWVzdElkKSA9PiB7XG5cbiAgcmVxdWVzdHNbcmVxdWVzdElkXS5kdXJhdGlvbiA9IF9nZXREdXJhdGlvbihyZXF1ZXN0c1tyZXF1ZXN0SWRdLnN0YXJ0VGltZSlcblxuICBjb25zdCByZXF1ZXN0ID0gcmVxdWVzdHNbcmVxdWVzdElkXVxuXG4gIGNvbnN0IGhlYWQgPSBbXVxuXG4gIGNvbnN0IHRpdGxlID0gWydDUk9OOicsIGNyb25dXG5cbiAgaGVhZC5wdXNoKFsnUkVTUE9OU0U6JywgYHByb2Nlc3NlZCBpbiAke3JlcXVlc3QuZHVyYXRpb259IG1zYF0pXG5cbiAgX3ByaW50TG9nZ2VyKHRpdGxlLCBoZWFkLCByZXF1ZXN0LCAnI0UwMzk5NycpXG5cblxufVxuXG5jb25zdCBfc3RhcnRRdWVyeSA9IHJlcXVlc3RJZCA9PiBxdWVyeSA9PiB7XG5cbiAgaWYoIXJlcXVlc3RzW3JlcXVlc3RJZF0pIF9jcmVhdGVSZXF1ZXN0KHJlcXVlc3RJZClcblxuICBpZighX2hhc1VpZEJlZW5NYXBwZWQocXVlcnkuX19rbmV4VWlkKSAmJiAhcmVxdWVzdHNbcmVxdWVzdElkXS5fX2tuZXhVaWQpIHtcblxuICAgIHJlcXVlc3RzW3JlcXVlc3RJZF0uX19rbmV4VWlkID0gcXVlcnkuX19rbmV4VWlkXG5cbiAgfVxuXG4gIGlmKF9nZXRSZXF1ZXN0SWRGcm9tVWlkKHF1ZXJ5Ll9fa25leFVpZCkgIT09IHJlcXVlc3RJZCkgcmV0dXJuXG5cbiAgY29uc3QgdWlkID0gcXVlcnkuX19rbmV4UXVlcnlVaWQgfHwgcXVlcnkuc3FsXG5cbiAgcmVxdWVzdHNbcmVxdWVzdElkXS5sb2cucHVzaCh7XG4gICAgdHlwZToncXVlcnknLFxuICAgIHVpZCxcbiAgICBkdXJhdGlvbjogMCxcbiAgICBzdGFydFRpbWU6IHByb2Nlc3MuaHJ0aW1lKCksXG4gICAgc3FsOiBxdWVyeS5zcWwsXG4gICAgYmluZGluZ3M6IHF1ZXJ5LmJpbmRpbmdzXG4gIH0pXG5cbn1cblxuY29uc3QgX2VuZFF1ZXJ5ID0gcmVxdWVzdElkID0+IChyZXNwb25zZSwgcXVlcnkpID0+IHtcblxuICBpZihfZ2V0UmVxdWVzdElkRnJvbVVpZChxdWVyeS5fX2tuZXhVaWQpICE9PSByZXF1ZXN0SWQpIHJldHVyblxuXG4gIGNvbnN0IHVpZCA9IHF1ZXJ5Ll9fa25leFF1ZXJ5VWlkIHx8IHF1ZXJ5LnNxbFxuXG4gIGNvbnN0IGluZGV4ID0gXy5maW5kSW5kZXgocmVxdWVzdHNbcmVxdWVzdElkXS5sb2csIHsgdWlkIH0gKVxuXG4gIGlmKCFyZXF1ZXN0c1tyZXF1ZXN0SWRdLmxvZ1tpbmRleF0pIHJldHVyblxuXG4gIHJlcXVlc3RzW3JlcXVlc3RJZF0ubG9nW2luZGV4XS5kdXJhdGlvbiA9IF9nZXREdXJhdGlvbihyZXF1ZXN0c1tyZXF1ZXN0SWRdLmxvZ1tpbmRleF0uc3RhcnRUaW1lKVxuXG59XG5cbmNvbnN0IF9jcmVhdGVSZXF1ZXN0ID0gKHJlcXVlc3RJZCkgPT4ge1xuXG4gIHJlcXVlc3RzW3JlcXVlc3RJZF0gPSB7XG4gICAgc3RhcnRUaW1lOiBwcm9jZXNzLmhydGltZSgpLFxuICAgIGR1cmF0aW9uOiBudWxsLFxuICAgIGxvZzogW11cbiAgfVxuXG59XG5jb25zdCBfZ2V0RHVyYXRpb24gPSAoc3RhcnRUaW1lKSA9PiB7XG5cbiAgY29uc3QgZGlmZiA9IHByb2Nlc3MuaHJ0aW1lKHN0YXJ0VGltZSlcblxuICBjb25zdCBtcyA9IGRpZmZbMF0gKiAxZTMgKyBkaWZmWzFdICogMWUtNlxuXG4gIHJldHVybiBtcy50b0ZpeGVkKDMpXG5cbn1cblxuY29uc3QgX2hhc1VpZEJlZW5NYXBwZWQgPSAodWlkKSA9PiB7XG5cbiAgcmV0dXJuIE9iamVjdC5rZXlzKHJlcXVlc3RzKS5yZWR1Y2UoKG1hcHBlZCwgcmVxdWVzdElkKSA9PiB7XG5cbiAgICByZXR1cm4gbWFwcGVkIHx8IHJlcXVlc3RzW3JlcXVlc3RJZF0uX19rbmV4VWlkID09PSB1aWRcblxuICB9LCBmYWxzZSlcblxufVxuXG5jb25zdCBfZ2V0UmVxdWVzdElkRnJvbVVpZCA9ICh1aWQpID0+IHtcblxuICByZXR1cm4gT2JqZWN0LmtleXMocmVxdWVzdHMpLnJlZHVjZSgoZm91bmQsIHJlcXVlc3RJZCkgPT4ge1xuXG4gICAgaWYoZm91bmQpIHJldHVybiBmb3VuZFxuXG4gICAgcmV0dXJuIChyZXF1ZXN0c1tyZXF1ZXN0SWRdLl9fa25leFVpZCA9PT0gdWlkKSA/IHJlcXVlc3RJZCA6IG51bGxcblxuICB9LCBudWxsKVxuXG59XG5cbmNvbnN0IF9sb2dNZXNzYWdlID0gKGxldmVsLCByZXF1ZXN0SWQpID0+IHtcblxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG5cbiAgICBpZighcmVxdWVzdHNbcmVxdWVzdElkXSkgcmV0dXJuXG5cbiAgICByZXF1ZXN0c1tyZXF1ZXN0SWRdLmxvZy5wdXNoKHtcbiAgICAgIHR5cGU6J2xvZycsXG4gICAgICBsZXZlbCxcbiAgICAgIG1lc3NhZ2U6IHV0aWwuZm9ybWF0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICB9KVxuXG4gIH1cbn1cblxuY29uc3QgX3ByaW50TG9nZ2VyID0gKHRpdGxlLCBoZWFkLCByZXF1ZXN0LCBjb2xvcikgPT4ge1xuXG4gIHByb2Nlc3Muc3Rkb3V0LndyaXRlKCdcXG4nKVxuXG4gIHdyaXRlUGFkZGVkTGluZShudWxsLCAnJywgY29sb3IpXG5cbiAgd3JpdGVQYWRkZWRMaW5lKGNoYWxrLmJvbGQud2hpdGUodGl0bGVbMF0pLCBjaGFsay53aGl0ZSh0aXRsZVsxXSksIGNvbG9yKVxuXG4gIHdyaXRlUGFkZGVkTGluZShudWxsLCAnJywgY29sb3IpXG5cbiAgd3JpdGVQYWRkZWRMaW5lKG51bGwsICcnLCAnI0VFRUVFRScpXG5cbiAgaGVhZC5tYXAobGluZSA9PiB7XG5cbiAgICB3cml0ZVBhZGRlZExpbmUoY2hhbGsuYmxhY2sobGluZVswXSksIGNoYWxrLmdyZXkobGluZVsxXSksICcjRUVFRUVFJylcblxuICB9KVxuXG4gIHdyaXRlUGFkZGVkTGluZShudWxsLCAnJywgJyNFRUVFRUUnKVxuXG4gIHdyaXRlUGFkZGVkTGluZShudWxsLCAnJywgJyNGRkZGRkYnKVxuXG4gIHJlcXVlc3QubG9nLm1hcChpdGVtID0+IHtcblxuICAgIGlmKGl0ZW0udHlwZSA9PT0gJ3F1ZXJ5Jykge1xuXG4gICAgICBjb25zdCBiaW5kaW5ncyA9IGl0ZW0uYmluZGluZ3MgPyBgIHske2l0ZW0uYmluZGluZ3Muam9pbignLCAnKX19YCA6JydcblxuICAgICAgY29uc3QgZHVyYXRpb24gPSBpdGVtLmR1cmF0aW9uID8gYCAke2l0ZW0uZHVyYXRpb259IG1zYCA6JydcblxuICAgICAgY29uc3QgbGluZSA9IGl0ZW0uc3FsICsgY2hhbGsubWFnZW50YShiaW5kaW5ncykgKyBkdXJhdGlvblxuXG4gICAgICB3cml0ZVBhZGRlZExpbmUoY2hhbGsuYmxhY2soJ1NRTDogICAgICcpLCBsaW5lLCAnI0ZGRkZGRicpXG5cbiAgICB9XG5cbiAgICBpZihpdGVtLnR5cGUgPT09ICdsb2cnKSB7XG5cbiAgICAgIGlmKGl0ZW0ubGV2ZWwgPT09ICdsb2cnKSB3cml0ZVBhZGRlZExpbmUoY2hhbGsuYmxhY2soJ0xPRzogICAgICcpLCBjaGFsay5ncmV5KGl0ZW0ubWVzc2FnZSksICcjRkZGRkZGJylcblxuICAgICAgaWYoaXRlbS5sZXZlbCA9PT0gJ2luZm8nKSB3cml0ZVBhZGRlZExpbmUoY2hhbGsuYmxhY2soJ0lORk86ICAgICcpLCBjaGFsay5ncmV5KGl0ZW0ubWVzc2FnZSksICcjRkZGRkZGJylcblxuICAgICAgaWYoaXRlbS5sZXZlbCA9PT0gJ21haWwnKSB3cml0ZVBhZGRlZExpbmUoY2hhbGsuYmxhY2soJ01BSUw6ICAgICcpLCBjaGFsay5ncmV5KGl0ZW0ubWVzc2FnZSksICcjRkZGRkZGJylcblxuICAgICAgaWYoaXRlbS5sZXZlbCA9PT0gJ2Vycm9yJykgd3JpdGVQYWRkZWRMaW5lKGNoYWxrLmJsYWNrKCdFUlJPUjogICAnKSwgY2hhbGsucmVkKGl0ZW0ubWVzc2FnZSksICcjRkZGRkZGJylcblxuICAgIH1cblxuICB9KVxuXG4gIHdyaXRlUGFkZGVkTGluZShudWxsLCAnJywgJyNGRkZGRkYnKVxuXG59XG4iLCJpbXBvcnQgY29sbGVjdE9iamVjdHMgZnJvbSAnLi9jb2xsZWN0X29iamVjdHMnXG5cbmxldCBtYXBwZWQgPSBudWxsXG5cbmNvbnN0IG1vZGVscyA9ICh0YWJsZSkgPT4ge1xuXG4gIGlmKG1hcHBlZCkgcmV0dXJuIG1hcHBlZFt0YWJsZV1cblxuICBtYXBwZWQgPSBjb2xsZWN0T2JqZWN0cygnbW9kZWxzLyonKS5yZWR1Y2UoKG9iamVjdHMsIG1vZGVsKSA9PiB7XG5cbiAgICBjb25zdCBvYmplY3QgPSBtb2RlbC5kZWZhdWx0XG5cbiAgICBjb25zdCBpbnN0YW5jZSA9IG9iamVjdC5leHRlbmQoKS5fX3N1cGVyX19cblxuICAgIHJldHVybiB7XG4gICAgICAuLi5vYmplY3RzLFxuICAgICAgW2luc3RhbmNlLnRhYmxlTmFtZV06IHtcbiAgICAgICAgbW9kZWw6IG9iamVjdCxcbiAgICAgICAgZGlzcGxheU5hbWU6IGluc3RhbmNlLmRpc3BsYXlOYW1lLFxuICAgICAgICBkaXNwbGF5QXR0cmlidXRlOiBpbnN0YW5jZS5kaXNwbGF5QXR0cmlidXRlXG4gICAgICB9XG4gICAgfVxuXG4gIH0sIHt9KVxuXG4gIHJldHVybiBtYXBwZWRbdGFibGVdXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbW9kZWxzXG4iLCJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgQmFja2ZyYW1lRXJyb3IgZnJvbSAnYmFja2ZyYW1lJ1xuXG5leHBvcnQgY29uc3QgdXBkYXRlUmVsYXRlZCA9IChyZWxhdGVkLCB0YWJsZSwgcGFyYW0sIHJlc3VsdF9rZXksIGZvcmVpZ25fa2V5KSA9PiBhc3luYyAocmVxLCB0cngsIHJlc3VsdCwgb3B0aW9ucykgPT4ge1xuXG4gIGNvbnN0IGJvZHlfaWRzID0gXy5nZXQocmVxLCBgYm9keS4ke3BhcmFtfWApXG5cbiAgaWYoIWJvZHlfaWRzKSByZXR1cm5cblxuICB0cnkge1xuXG4gICAgYXdhaXQgcmVzdWx0LmxvYWQoW3JlbGF0ZWRdLCB7IHRyYW5zYWN0aW5nOiB0cnggfSlcblxuICAgIGNvbnN0IGlkcyA9IHJlc3VsdC5yZWxhdGVkKHJlbGF0ZWQpLm1hcChpdGVtID0+IGl0ZW0uaWQpXG5cbiAgICBjb25zdCByZW1vdmVfaWRzID0gaWRzLmZpbHRlcihpZCA9PiAhXy5pbmNsdWRlcyhib2R5X2lkcywgaWQpKVxuXG4gICAgY29uc3QgYWRkX2lkcyA9IGJvZHlfaWRzLmZpbHRlcihpZCA9PiAhXy5pbmNsdWRlcyhpZHMsIGlkKSlcblxuICAgIGlmKHJlbW92ZV9pZHMpIGF3YWl0IG9wdGlvbnMua25leCh0YWJsZSkudHJhbnNhY3RpbmcodHJ4KS53aGVyZSh7XG4gICAgICBbcmVzdWx0X2tleV06IHJlc3VsdC5nZXQoJ2lkJylcbiAgICB9KS53aGVyZUluKGZvcmVpZ25fa2V5LCByZW1vdmVfaWRzKS5kZWxldGUoKVxuXG4gICAgaWYoYWRkX2lkcykgYXdhaXQgb3B0aW9ucy5rbmV4KHRhYmxlKS50cmFuc2FjdGluZyh0cngpLmluc2VydChhZGRfaWRzLm1hcChpZCA9PiAoe1xuICAgICAgW3Jlc3VsdF9rZXldOiByZXN1bHQuZ2V0KCdpZCcpLFxuICAgICAgW2ZvcmVpZ25fa2V5XTogaWRcbiAgICB9KSkpXG5cbiAgfSBjYXRjaChlcnIpIHtcblxuICAgIGlmKGVyci5lcnJvcnMpIHtcblxuICAgICAgdGhyb3cgbmV3IEJhY2tmcmFtZUVycm9yKHtcbiAgICAgICAgY29kZTogNDIyLFxuICAgICAgICBtZXNzYWdlOiAnVW5hYmxlIHRvIHVwZGF0ZSByZWxhdGVkJyxcbiAgICAgICAgZXJyb3JzOiBlcnIudG9KU09OKClcbiAgICAgIH0pXG5cbiAgICB9XG5cbiAgICB0aHJvdyBlcnJcblxuICB9XG5cbn1cbiIsImltcG9ydCBodG1sVG9UZXh0IGZyb20gJ2h0bWwtZW1haWwtdG8tdGV4dCdcbmltcG9ydCBzZXMgZnJvbSAnLi4vc2VydmljZXMvc2VzJ1xuaW1wb3J0IGlubGluZSBmcm9tICdpbmxpbmUtY3NzJ1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnXG5cbmNvbnN0IHNlbmRNYWlsID0gYXN5bmMgKGVtYWlsKSA9PiB7XG5cbiAgY29uc3QgaHRtbCA9IGF3YWl0IGlubGluZShlbWFpbC5odG1sLCB7IHVybDogcHJvY2Vzcy5lbnYuV0VCX0hPU1QsIHByZXNlcnZlTWVkaWFRdWVyaWVzOiB0cnVlIH0pXG5cbiAgY29uc3QgcmVuZGVyZWQgPSB7XG4gICAgLi4uZW1haWwsXG4gICAgdG86IHByb2Nlc3MuZW52LkVNQUlMX1JFRElSRUNUIHx8IGVtYWlsLnRvLFxuICAgIGh0bWwsXG4gICAgdGV4dDogaHRtbFRvVGV4dChlbWFpbC5odG1sKVxuICB9XG5cbiAgdHJ5IHtcblxuICAgIGlmKHByb2Nlc3MuZW52LkVNQUlMX0RFTElWRVJZID09PSAnY29uc29sZScpIHJldHVybiBhd2FpdCBfc2VuZFZpYUNvbnNvbGUocmVuZGVyZWQpXG5cbiAgICBpZihwcm9jZXNzLmVudi5FTUFJTF9ERUxJVkVSWSA9PT0gJ3NlcycpIHJldHVybiBhd2FpdCBfc2VuZFZpYVNFUyhyZW5kZXJlZClcblxuICB9IGNhdGNoKGVycikge1xuXG4gICAgcmV0dXJuIHsgZXJyb3I6IGVyci5tZXNzYWdlIH1cblxuICB9XG5cbn1cblxuY29uc3QgX3NlbmRWaWFDb25zb2xlID0gYXN5bmMgKHJlbmRlcmVkKSA9PiB7XG5cbiAgY29uc3Qgb3V0cHV0ID0gW1xuICAgIEFycmF5KDg2KS5qb2luKCctJyksXG4gICAgYFRPOiAke3JlbmRlcmVkLnRvfWAsXG4gICAgYFNVQkpFQ1Q6ICR7cmVuZGVyZWQuc3ViamVjdH1gLFxuICAgIEFycmF5KDg2KS5qb2luKCctJyksXG4gICAgcmVuZGVyZWQudGV4dCxcbiAgICBBcnJheSg4Nikuam9pbignLScpXG4gIF1cblxuICBjb25zb2xlLm1haWwob3V0cHV0LmpvaW4oJ1xcbicpKVxuXG4gIHJldHVybiB7IHNlbnRfYXQ6IG1vbWVudCgpIH1cblxufVxuXG5jb25zdCBfc2VuZFZpYVNFUyA9IGFzeW5jIChyZW5kZXJlZCkgPT4ge1xuXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIHNlcy5zZW5kTWFpbChyZW5kZXJlZCwgYXN5bmMgKGVyciwgaW5mbykgPT4ge1xuXG4gICAgICBpZihlcnIpIHJlamVjdChlcnIpXG5cbiAgICAgIHJlc29sdmUoaW5mbylcblxuICAgIH0pXG5cblxuICB9KVxuXG4gIHJldHVybiB7IHNlc19pZDogcmVzdWx0LnJlc3BvbnNlLCBzZW50X2F0OiBtb21lbnQoKSB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgc2VuZE1haWxcbiIsImltcG9ydCAqIGFzIGp3dCBmcm9tICcuLi9zZXJ2aWNlcy9qd3QnXG5pbXBvcnQgeyBCYWNrZnJhbWVFcnJvciwgVXNlciB9IGZyb20gJy4uLy4uL3NlcnZlcidcblxuY29uc3QgVFdPX1dFRUtTID0gNjAgKiA2MCAqIDI0ICogNyAqIDJcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVVzZXJUb2tlbiA9ICh1c2VyLCBrZXksIGRhdGEgPSB7fSkgPT4ge1xuXG4gIHJldHVybiBqd3QuZW5jb2RlKHtcbiAgICBba2V5XTogdXNlci5nZXQoJ2lkJyksXG4gICAgLi4uZGF0YVxuICB9LCBUV09fV0VFS1MpXG5cbn1cblxuZXhwb3J0IGNvbnN0IGxvYWRVc2VyRnJvbVRva2VuID0gYXN5bmMgKGtleSwgdG9rZW4sIHRyeCkgPT4ge1xuXG4gIGNvbnN0IHsgZGF0YSwgaWF0IH0gPSBhd2FpdCBfZGVjb2RlKHRva2VuKVxuXG4gIGNvbnN0IGlkID0gZGF0YVtrZXldXG5cbiAgaWYoIWlkKSB7XG4gICAgdGhyb3cgbmV3IEJhY2tmcmFtZUVycm9yKHtcbiAgICAgIGNvZGU6IDQwMSxcbiAgICAgIG1lc3NhZ2U6ICdJbnZhbGlkIHRva2VuJ1xuICAgIH0pXG4gIH1cblxuICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci53aGVyZSh7IGlkIH0pLmZldGNoKHsgdHJhbnNhY3Rpbmc6IHRyeCB9KVxuXG4gIGlmKCF1c2VyKSB7XG4gICAgdGhyb3cgbmV3IEJhY2tmcmFtZUVycm9yKHtcbiAgICAgIGNvZGU6IDQwNCxcbiAgICAgIG1lc3NhZ2U6ICdVbmFibGUgdG8gbG9hZCB1c2VyJ1xuICAgIH0pXG4gIH1cblxuICByZXR1cm4ge1xuICAgIC4uLmRhdGEsXG4gICAgdXNlcixcbiAgICBpYXRcbiAgfVxuXG59XG5cbmNvbnN0IF9kZWNvZGUgPSAodG9rZW4pID0+IHtcblxuICB0cnkge1xuXG4gICAgcmV0dXJuIGp3dC5kZWNvZGUodG9rZW4pXG5cbiAgfSBjYXRjaChlcnIpIHtcblxuICAgIGlmKGVyci5uYW1lID09PSAnVG9rZW5FeHBpcmVkRXJyb3InKSB7XG4gICAgICB0aHJvdyBuZXcgQmFja2ZyYW1lRXJyb3Ioe1xuICAgICAgICBjb2RlOiA0MDEsXG4gICAgICAgICBtZXNzYWdlOiAnRXhwaXJlZCB0b2tlbidcbiAgICAgICB9KVxuICAgIH1cblxuICAgIHRocm93IG5ldyBCYWNrZnJhbWVFcnJvcih7XG4gICAgICBjb2RlOiA0MDEsXG4gICAgICBtZXNzYWdlOiAnSW52YWxpZCB0b2tlbidcbiAgICB9KVxuXG4gIH1cblxufVxuIiwiaW1wb3J0IENoZWNraXQgZnJvbSAnY2hlY2tpdCdcblxuQ2hlY2tpdC5WYWxpZGF0b3IucHJvdG90eXBlLmN1cnJlbmN5ID0gZnVuY3Rpb24odmFsKSB7XG5cbiAgY29uc3QgY29sdW1uID0gT2JqZWN0LmtleXModGhpcy5fdGFyZ2V0KS5yZWR1Y2UoKGNvbHVtbiwga2V5KSA9PiB7XG4gICAgcmV0dXJuIGNvbHVtbiB8fCAodGhpcy5fdGFyZ2V0W2tleV0gPT09IHZhbCA/IGtleSA6IG51bGwpXG4gIH0sIG51bGwpXG5cbiAgaWYoIXZhbC5tYXRjaCgvXlxcZHsxLH1cXC5cXGR7Mn0kLykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAke2NvbHVtbn0gbXVzdCBiZSB2YWxpZCBjdXJyZW5jeWApXG4gIH1cblxuICByZXR1cm4gdHJ1ZVxuXG59XG4iLCJpbXBvcnQgQ2hlY2tpdCBmcm9tICdjaGVja2l0J1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuXG5DaGVja2l0LlZhbGlkYXRvci5wcm90b3R5cGUuZGF0ZXN0cmluZyA9IGZ1bmN0aW9uKHZhbCkge1xuXG4gIGNvbnN0IGNvbHVtbiA9IE9iamVjdC5rZXlzKHRoaXMuX3RhcmdldCkucmVkdWNlKChjb2x1bW4sIGtleSkgPT4ge1xuICAgIHJldHVybiBjb2x1bW4gfHwgKHRoaXMuX3RhcmdldFtrZXldID09PSB2YWwgPyBrZXkgOiBudWxsKVxuICB9LCBudWxsKVxuXG4gIGlmKF8uaXNTdHJpbmcodmFsKSAmJiAhdmFsLm1hdGNoKC9eXFxkezR9LVxcZHsyfS1cXGR7Mn0kLykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAke2NvbHVtbn0gbXVzdCBiZSBpbiB0aGUgZm9ybWF0IFlZWVktTU0tRERgKVxuICB9XG5cbiAgcmV0dXJuIHRydWVcblxufVxuIiwiaW1wb3J0IENoZWNraXQgZnJvbSAnY2hlY2tpdCdcblxuQ2hlY2tpdC5WYWxpZGF0b3IucHJvdG90eXBlLmdyZWF0ZXJUaGFuRmllbGQgPSBmdW5jdGlvbih2YWwsIHBhcmFtKSB7XG5cbiAgaWYodmFsIDw9IHRoaXMuX3RhcmdldFtwYXJhbV0pIHRocm93IG5ldyBFcnJvcihgbXVzdCBiZSBncmVhdGVyIHRoYW4gdGhlICR7cGFyYW19YClcblxuICByZXR1cm4gdHJ1ZVxuXG59XG4iLCJpbXBvcnQgQ2hlY2tpdCBmcm9tICdjaGVja2l0J1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnXG5cbkNoZWNraXQuVmFsaWRhdG9yLnByb3RvdHlwZS5sYXRlclRoYW4gPSBmdW5jdGlvbih2YWwsIHBhcmFtKSB7XG5cbiAgY29uc3QgdG9kYXkgPSBtb21lbnQoKS5mb3JtYXQoJ1lZWVktTU0tREQnKVxuXG4gIGNvbnN0IGZpcnN0ID0gbW9tZW50KGAke3RvZGF5fSAke3RoaXMuX3RhcmdldFtwYXJhbV19YClcblxuICBjb25zdCBsYXN0ID0gbW9tZW50KGAke3RvZGF5fSAke3ZhbH1gKVxuXG4gIGNvbnNvbGUubG9nKGZpcnN0LCBsYXN0LCBsYXN0LmRpZmYoZmlyc3QpIDw9IDApXG5cbiAgaWYobGFzdC5kaWZmKGZpcnN0KSA8PSAwKSB0aHJvdyBuZXcgRXJyb3IoYG11c3QgYmUgYWZ0ZXIgdGhhbiB0aGUgJHtwYXJhbX1gKVxuXG4gIHJldHVybiB0cnVlXG5cbn1cbiIsImltcG9ydCBDaGVja2l0IGZyb20gJ2NoZWNraXQnXG5cbkNoZWNraXQuVmFsaWRhdG9yLnByb3RvdHlwZS50aW1lID0gZnVuY3Rpb24odmFsKSB7XG5cbiAgY29uc3QgY29sdW1uID0gT2JqZWN0LmtleXModGhpcy5fdGFyZ2V0KS5yZWR1Y2UoKGNvbHVtbiwga2V5KSA9PiB7XG4gICAgcmV0dXJuIGNvbHVtbiB8fCAodGhpcy5fdGFyZ2V0W2tleV0gPT09IHZhbCA/IGtleSA6IG51bGwpXG4gIH0sIG51bGwpXG5cbiAgaWYodmFsLm1hdGNoKC9eKFxcZHsxLDJ9KTooXFxkezJ9KTo/KFxcZHsyfSk/XFxzPyhbYW18cG1dKik/JC9pKSA9PT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlICR7Y29sdW1ufSBtdXN0IGJlIHZhbGlkIHRpbWVgKVxuICB9XG5cbiAgcmV0dXJuIHRydWVcblxufVxuIiwiaW1wb3J0IGtuZXggZnJvbSAnLi4vc2VydmljZXMva25leCdcbmltcG9ydCBDaGVja2l0IGZyb20gJ2NoZWNraXQnXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5cbkNoZWNraXQuVmFsaWRhdG9yLnByb3RvdHlwZS51bmlxdWUgPSBmdW5jdGlvbih2YWwsIHBhcmFtcyA9IHt9LCBvcHRpb25zID0ge30pIHtcblxuICBjb25zdCB0YWJsZU5hbWUgPSBwYXJhbXMudGFibGVOYW1lIHx8IG9wdGlvbnMudGFibGVOYW1lXG5cbiAgY29uc3QgY29sdW1uID0gT2JqZWN0LmtleXModGhpcy5fdGFyZ2V0KS5yZWR1Y2UoKGNvbHVtbiwga2V5KSA9PiB7XG4gICAgcmV0dXJuIGNvbHVtbiB8fCAodGhpcy5fdGFyZ2V0W2tleV0gPT09IHZhbCA/IGtleSA6IG51bGwpXG4gIH0sIG51bGwpXG5cbiAgbGV0IHF1ZXJ5ID0ga25leCh0YWJsZU5hbWUpLndoZXJlKGNvbHVtbiwgJz0nLCB2YWwpXG5cbiAgaWYoXy5pc1N0cmluZyhwYXJhbXMpKSB7XG4gICAgcGFyYW1zLnNwbGl0KCcsJykubWFwKGtleSA9PiB7XG4gICAgICBxdWVyeSA9IHF1ZXJ5LndoZXJlKGtleSwgdGhpcy5fdGFyZ2V0W2tleV0pXG4gICAgfSlcbiAgfVxuXG4gIGlmKHRoaXMuX3RhcmdldC50ZWFtX2lkKSB7XG4gICAgcXVlcnkgPSBxdWVyeS53aGVyZSh7IHRlYW1faWQ6IHRoaXMuX3RhcmdldC50ZWFtX2lkfSlcbiAgfVxuXG4gIGlmKHRoaXMuX3RhcmdldC5pZCkge1xuICAgIHF1ZXJ5ID0gcXVlcnkud2hlcmVOb3QoeyBpZDogdGhpcy5fdGFyZ2V0LmlkIH0pXG4gIH1cblxuICByZXR1cm4gcXVlcnkudGhlbihyZXNwID0+IHtcbiAgICBpZihyZXNwLmxlbmd0aCA+IDApIHRocm93IG5ldyBFcnJvcihgVGhlICR7Y29sdW1ufSBpcyBhbHJlYWR5IGluIHVzZWApXG4gIH0pXG5cbn1cbkNoZWNraXQuVmFsaWRhdG9yLnByb3RvdHlwZS51bmlxdWUubWVzc2FnZSA9ICdGb28nXG4iLCJpbXBvcnQgTW9kZWwgZnJvbSAnLi4vY29yZS9vYmplY3RzL21vZGVsJ1xuaW1wb3J0IEFwcCBmcm9tICcuL2FwcCdcbmltcG9ydCBTdG9yeSBmcm9tICcuL3N0b3J5J1xuaW1wb3J0IFVzZXIgZnJvbSAnLi91c2VyJ1xuXG5jb25zdCBBY3Rpdml0eSA9IG5ldyBNb2RlbCh7XG5cbiAgdGFibGVOYW1lOiAnbWFoYV9hY3Rpdml0aWVzJyxcblxuICBkaXNwbGF5TmFtZTogJ2FjdGl2aXR5JyxcblxuICBydWxlczoge1xuICAgIHVzZXJfaWQ6IFsncmVxdWlyZWQnXVxuICB9LFxuXG4gIGFwcCgpIHtcbiAgICByZXR1cm4gdGhpcy5iZWxvbmdzVG8oQXBwLCAnYXBwX2lkJylcbiAgfSxcblxuICBvYmplY3Rfb3duZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmVsb25nc1RvKFVzZXIsICdvYmplY3Rfb3duZXJfaWQnKVxuICB9LFxuXG4gIHN0b3J5KCkge1xuICAgIHJldHVybiB0aGlzLmJlbG9uZ3NUbyhTdG9yeSwgJ3N0b3J5X2lkJylcbiAgfSxcblxuICB1c2VyKCkge1xuICAgIHJldHVybiB0aGlzLmJlbG9uZ3NUbyhVc2VyLCAndXNlcl9pZCcpXG4gIH1cblxufSlcblxuZXhwb3J0IGRlZmF1bHQgQWN0aXZpdHlcbiIsImltcG9ydCBNb2RlbCBmcm9tICcuLi9jb3JlL29iamVjdHMvbW9kZWwnXG5pbXBvcnQgQXV0aG9yIGZyb20gJy4vYXBwX2F1dGhvcidcbmltcG9ydCBDYXRlZ29yeSBmcm9tICcuL2FwcF9jYXRlZ29yeSdcbmltcG9ydCBSb2xlIGZyb20gJy4vcm9sZSdcblxuY29uc3QgQXBwID0gbmV3IE1vZGVsKHtcblxuICB0YWJsZU5hbWU6ICdtYWhhX2FwcHMnLFxuXG4gIGRpc3BsYXlOYW1lOiAnYXBwJyxcblxuICBkaXNwbGF5QXR0cmlidXRlOiAndGl0bGUnLFxuXG4gIHJ1bGVzOiB7XG4gICAgdGl0bGU6IFsncmVxdWlyZWQnLCAndW5pcXVlJ11cbiAgfSxcblxuICBhdXRob3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmVsb25nc1RvKEF1dGhvciwgJ2FwcF9hdXRob3JfaWQnKVxuICB9LFxuXG4gIGNhdGVnb3J5KCkge1xuICAgIHJldHVybiB0aGlzLmJlbG9uZ3NUbyhDYXRlZ29yeSwgJ2FwcF9jYXRlZ29yeV9pZCcpXG4gIH0sXG5cbiAgcm9sZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmVsb25nc1RvTWFueShSb2xlLCAnbWFoYV9yb2xlc19hcHBzJywgJ3JvbGVfaWQnLCAnYXBwX2lkJylcbiAgfVxuXG59KVxuXG5leHBvcnQgZGVmYXVsdCBBcHBcbiIsImltcG9ydCBNb2RlbCBmcm9tICcuLi9jb3JlL29iamVjdHMvbW9kZWwnXG5pbXBvcnQgQXBwIGZyb20gJy4vYXBwJ1xuXG5jb25zdCBBcHBBdXRob3IgPSBuZXcgTW9kZWwoe1xuXG4gIHRhYmxlTmFtZTogJ21haGFfYXBwX2F1dGhvcnMnLFxuXG4gIGRpc3BsYXlOYW1lOiAnYXBwIGF1dGhvcicsXG5cbiAgZGlzcGxheUF0dHJpYnV0ZTogJ25hbWUnLFxuXG4gIHJ1bGVzOiB7XG4gICAgbmFtZTogWydyZXF1aXJlZCcsICd1bmlxdWUnXVxuICB9LFxuXG4gIGFwcHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzTWFueShBcHAsICdhcHBfYXV0aG9yX2lkJylcbiAgfVxuXG59KVxuXG5leHBvcnQgZGVmYXVsdCBBcHBBdXRob3JcbiIsImltcG9ydCBNb2RlbCBmcm9tICcuLi9jb3JlL29iamVjdHMvbW9kZWwnXG5pbXBvcnQgQXBwIGZyb20gJy4vYXBwJ1xuXG5jb25zdCBBcHBDYXRlZ29yeSA9IG5ldyBNb2RlbCh7XG5cbiAgdGFibGVOYW1lOiAnbWFoYV9hcHBfY2F0ZWdvcmllcycsXG5cbiAgZGlzcGxheU5hbWU6ICdhcHAgY2F0ZWdvcnknLFxuXG4gIGRpc3BsYXlBdHRyaWJ1dGU6ICd0aXRsZScsXG5cbiAgcnVsZXM6IHtcbiAgICB0aXRsZTogWydyZXF1aXJlZCcsICd1bmlxdWUnXVxuICB9LFxuXG4gIGFwcHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzTWFueShBcHAsICdhcHBfY2F0ZWdvcnlfaWQnKVxuICB9XG5cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEFwcENhdGVnb3J5XG4iLCJpbXBvcnQgTW9kZWwgZnJvbSAnLi4vY29yZS9vYmplY3RzL21vZGVsJ1xuaW1wb3J0IEFzc2V0U3RhdHVzIGZyb20gJy4vYXNzZXRfc3RhdHVzJ1xuaW1wb3J0IFVzZXIgZnJvbSAnLi91c2VyJ1xuaW1wb3J0IFNvdXJjZSBmcm9tICcuL3NvdXJjZSdcblxuY29uc3QgQXNzZXRzID0gbmV3IE1vZGVsKHtcblxuICB0YWJsZU5hbWU6ICdtYWhhX2Fzc2V0cycsXG5cbiAgZGlzcGxheU5hbWU6ICdhc3NldCcsXG5cbiAgZGlzcGxheUF0dHJpYnV0ZTogJ2ZpbGVfbmFtZScsXG5cbiAgdmlydHVhbHM6IHtcblxuICAgIGV4dGVuc2lvbjogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoJ2ZpbGVfbmFtZScpLnNwbGl0KCcuJykucG9wKClcbiAgICB9LFxuXG4gICAgaWRlbnRpZmllcjogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoJ2ZpbGVfc2l6ZScpKyctJyt0aGlzLmdldCgnb3JpZ2luYWxfZmlsZV9uYW1lJykucmVwbGFjZSgvW14wLTlhLXpBLVpfLV0vaW1nLCAnJylcbiAgICB9LFxuXG4gICAgaXNfaW1hZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KCdjb250ZW50X3R5cGUnKS5tYXRjaCgvaW1hZ2UvKSAhPT0gbnVsbFxuICAgIH0sXG5cbiAgICBoYXNfcHJldmlldzogZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCBpc19wZGYgPSB0aGlzLmdldCgnY29udGVudF90eXBlJykubWF0Y2goL3BkZi8pICE9PSBudWxsXG4gICAgICBjb25zdCBpc19kb2MgPSB0aGlzLmdldCgnY29udGVudF90eXBlJykubWF0Y2goL21zd29yZC8pICE9PSBudWxsXG4gICAgICBjb25zdCBpc194bHMgPSB0aGlzLmdldCgnY29udGVudF90eXBlJykubWF0Y2goL2V4Y2VsLykgIT09IG51bGxcbiAgICAgIGNvbnN0IGlzX29wZW5vZmZpY2UgPSB0aGlzLmdldCgnY29udGVudF90eXBlJykubWF0Y2goL29mZmljZWRvY3VtZW50LykgIT09IG51bGxcbiAgICAgIGNvbnN0IGlzX2VtYWlsID0gdGhpcy5nZXQoJ2NvbnRlbnRfdHlwZScpLm1hdGNoKC9yZmM4MjIvKSAhPT0gbnVsbFxuICAgICAgY29uc3QgaXNfaHRtbCA9IHRoaXMuZ2V0KCdjb250ZW50X3R5cGUnKS5tYXRjaCgvaHRtbC8pICE9PSBudWxsXG4gICAgICByZXR1cm4gaXNfcGRmIHx8IGlzX2RvYyB8fCBpc194bHMgfHwgaXNfZW1haWwgfHwgaXNfb3Blbm9mZmljZSB8fCBpc19odG1sXG4gICAgfSxcblxuICAgIHBhdGg6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICghdGhpcy5pc05ldygpKSA/IGAvYXNzZXRzLyR7dGhpcy5nZXQoJ2lkJyl9LyR7dGhpcy5nZXQoJ2ZpbGVfbmFtZScpfWAgOiBudWxsXG4gICAgfSxcblxuICAgIHVybDogZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCBob3N0ID0gcHJvY2Vzcy5lbnYuREFUQV9BU1NFVF9DRE5fSE9TVCB8fCBwcm9jZXNzLmVudi5EQVRBX0FTU0VUX0hPU1QgfHwgJydcbiAgICAgIHJldHVybiAoIXRoaXMuaXNOZXcoKSkgPyBgJHtob3N0fSR7dGhpcy5nZXQoJ3BhdGgnKX1gIDogbnVsbFxuICAgIH1cblxuICB9LFxuXG4gIHNvdXJjZSgpIHtcbiAgICByZXR1cm4gdGhpcy5iZWxvbmdzVG8oU291cmNlLCAnc291cmNlX2lkJylcbiAgfSxcblxuICBzdGF0dXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmVsb25nc1RvKEFzc2V0U3RhdHVzLCAnc3RhdHVzX2lkJylcbiAgfSxcblxuICB1c2VyKCkge1xuICAgIHJldHVybiB0aGlzLmJlbG9uZ3NUbyhVc2VyLCAndXNlcl9pZCcpXG4gIH1cblxufSlcblxuZXhwb3J0IGRlZmF1bHQgQXNzZXRzXG4iLCJpbXBvcnQgTW9kZWwgZnJvbSAnLi4vY29yZS9vYmplY3RzL21vZGVsJ1xuXG5jb25zdCBBc3NldFN0YXR1cyA9IG5ldyBNb2RlbCh7XG5cbiAgdGFibGVOYW1lOiAnbWFoYV9hc3NldF9zdGF0dXNlcycsXG5cbiAgZGlzcGxheU5hbWU6ICdzdGF0dXMnLFxuXG4gIGRpc3BsYXlBdHRyaWJ1dGU6ICcnXG5cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEFzc2V0U3RhdHVzXG4iLCJpbXBvcnQgTW9kZWwgZnJvbSAnLi4vY29yZS9vYmplY3RzL21vZGVsJ1xuaW1wb3J0IEFzc2V0IGZyb20gJy4vYXNzZXQnXG5pbXBvcnQgU2VydmljZSBmcm9tICcuL3NlcnZpY2UnXG5cbmNvbnN0IEF0dGFjaG1lbnQgPSBuZXcgTW9kZWwoe1xuXG4gIHRhYmxlTmFtZTogJ21haGFfYXR0YWNobWVudHMnLFxuXG4gIGRpc3BsYXlOYW1lOiAnYXR0YWNobWVudCcsXG5cbiAgZGlzcGxheUF0dHJpYnV0ZTogJycsXG5cbiAgYXNzZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmVsb25nc1RvKEFzc2V0LCAnYXNzZXRfaWQnKVxuICB9LFxuXG4gIHNlcnZpY2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmVsb25nc1RvKFNlcnZpY2UsICdzZXJ2aWNlX2lkJylcbiAgfVxuXG59KVxuXG5leHBvcnQgZGVmYXVsdCBBdHRhY2htZW50XG4iLCJpbXBvcnQgTW9kZWwgZnJvbSAnLi4vY29yZS9vYmplY3RzL21vZGVsJ1xuaW1wb3J0IFN0b3J5IGZyb20gJy4vc3RvcnknXG5pbXBvcnQgVXNlciBmcm9tICcuL3VzZXInXG5cbmNvbnN0IEF1ZGl0ID0gbmV3IE1vZGVsKHtcblxuICB0YWJsZU5hbWU6ICdtYWhhX2F1ZGl0cycsXG5cbiAgZGlzcGxheU5hbWU6ICdhdWRpdCcsXG5cbiAgZGlzcGxheUF0dHJpYnV0ZTogJycsXG5cbiAgc3Rvcnk6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmJlbG9uZ3NUbyhTdG9yeSwgJ3N0b3J5X2lkJylcbiAgfSxcblxuICB1c2VyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5iZWxvbmdzVG8oVXNlciwgJ3VzZXJfaWQnKVxuICB9XG5cblxufSlcblxuZXhwb3J0IGRlZmF1bHQgQXVkaXRcbiIsImltcG9ydCBBdHRhY2htZW50IGZyb20gJy4vYXR0YWNobWVudCdcbmltcG9ydCBNb2RlbCBmcm9tICcuLi9jb3JlL29iamVjdHMvbW9kZWwnXG5pbXBvcnQgVXNlciBmcm9tICcuL3VzZXInXG5cbmNvbnN0IENvbW1lbnQgPSBuZXcgTW9kZWwoe1xuXG4gIHRhYmxlTmFtZTogJ21haGFfY29tbWVudHMnLFxuXG4gIGRpc3BsYXlOYW1lOiAnY29tbWVudCcsXG5cbiAgZGlzcGxheUF0dHJpYnV0ZTogJycsXG5cbiAgcnVsZXM6IHtcbiAgICB0ZXh0OiAncmVxdWlyZWQnXG4gIH0sXG5cbiAgYXR0YWNobWVudHMoKSB7XG4gICAgcmV0dXJuIHRoaXMubW9ycGhNYW55KEF0dGFjaG1lbnQsICdhdHRhY2hhYmxlJylcbiAgfSxcblxuICB1c2VyKCkge1xuICAgIHJldHVybiB0aGlzLmJlbG9uZ3NUbyhVc2VyLCAndXNlcl9pZCcpXG4gIH1cblxufSlcblxuZXhwb3J0IGRlZmF1bHQgQ29tbWVudFxuIiwiaW1wb3J0IERldmljZVZhbHVlIGZyb20gJy4vZGV2aWNlX3ZhbHVlJ1xuaW1wb3J0IE1vZGVsIGZyb20gJy4uL2NvcmUvb2JqZWN0cy9tb2RlbCdcbmltcG9ydCBVc2VyIGZyb20gJy4vdXNlcidcblxuY29uc3QgRGV2aWNlID0gbmV3IE1vZGVsKHtcblxuICB0YWJsZU5hbWU6ICdtYWhhX2RldmljZXMnLFxuXG4gIGRpc3BsYXlOYW1lOiAnZGV2aWNlcycsXG5cbiAgZGlzcGxheUF0dHJpYnV0ZTogJycsXG5cbiAgYmVsb25nc1RvVGVhbTogZmFsc2UsXG5cbiAgdmlydHVhbHM6IHtcblxuICAgIGlzX3B1c2hfZW5hYmxlZDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoJ3B1c2hfYXV0aCcpICE9PSBudWxsXG4gICAgfVxuXG4gIH0sXG5cbiAgZGV2aWNlX3R5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmVsb25nc1RvKERldmljZVZhbHVlLCAnZGV2aWNlX3R5cGVfaWQnKVxuICB9LFxuXG4gIGJyb3dzZXJfbmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5iZWxvbmdzVG8oRGV2aWNlVmFsdWUsICdicm93c2VyX25hbWVfaWQnKVxuICB9LFxuXG4gIGJyb3dzZXJfdmVyc2lvbigpIHtcbiAgICByZXR1cm4gdGhpcy5iZWxvbmdzVG8oRGV2aWNlVmFsdWUsICdicm93c2VyX3ZlcnNpb25faWQnKVxuICB9LFxuXG4gIG9zX25hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmVsb25nc1RvKERldmljZVZhbHVlLCAnb3NfbmFtZV9pZCcpXG4gIH0sXG5cbiAgb3NfdmVyc2lvbigpIHtcbiAgICByZXR1cm4gdGhpcy5iZWxvbmdzVG8oRGV2aWNlVmFsdWUsICdvc192ZXJzaW9uX2lkJylcbiAgfSxcblxuICB1c2VyKCkge1xuICAgIHJldHVybiB0aGlzLmJlbG9uZ3NUbyhVc2VyLCAndXNlcl9pZCcpXG4gIH1cblxufSlcblxuZXhwb3J0IGRlZmF1bHQgRGV2aWNlXG4iLCJpbXBvcnQgTW9kZWwgZnJvbSAnLi4vY29yZS9vYmplY3RzL21vZGVsJ1xuXG5jb25zdCBEZXZpY2VWYWx1ZSA9IG5ldyBNb2RlbCh7XG5cbiAgdGFibGVOYW1lOiAnbWFoYV9kZXZpY2VfdmFsdWVzJyxcblxuICBkaXNwbGF5TmFtZTogJ2RldmljZV92YWx1ZXMnLFxuXG4gIGRpc3BsYXlBdHRyaWJ1dGU6ICcnLFxuXG4gIGJlbG9uZ3NUb1RlYW06IGZhbHNlLFxuXG4gIGhhc1RpbWVzdGFtcHM6IGZhbHNlXG5cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IERldmljZVZhbHVlXG4iLCJpbXBvcnQgTW9kZWwgZnJvbSAnLi4vY29yZS9vYmplY3RzL21vZGVsJ1xuXG5jb25zdCBEb21haW4gPSBuZXcgTW9kZWwoe1xuXG4gIHRhYmxlTmFtZTogJ21haGFfZG9tYWlucycsXG5cbiAgZGlzcGxheU5hbWU6ICdkb21haW4nLFxuXG4gIGRpc3BsYXlBdHRyaWJ1dGU6ICd0aXRsZScsXG5cbiAgcnVsZXM6IHtcbiAgICB0aXRsZTogJ3JlcXVpcmVkJ1xuICB9XG5cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IERvbWFpblxuIiwiaW1wb3J0IE1vZGVsIGZyb20gJy4uL2NvcmUvb2JqZWN0cy9tb2RlbCdcbmltcG9ydCBFbWFpbEFjdGl2aXR5IGZyb20gJy4vZW1haWxfYWN0aXZpdHknXG5pbXBvcnQgVXNlciBmcm9tICcuL3VzZXInXG5cbmNvbnN0IEVtYWlsID0gbmV3IE1vZGVsKHtcblxuICB0YWJsZU5hbWU6ICdtYWhhX2VtYWlscycsXG5cbiAgZGlzcGxheU5hbWU6ICdlbWFpbCcsXG5cbiAgZGlzcGxheUF0dHJpYnV0ZTogJ3N1YmplY3QnLFxuXG4gIGFjdGl2aXRpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzTWFueShFbWFpbEFjdGl2aXR5LCAnZW1haWxfaWQnKVxuICB9LFxuXG4gIHVzZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmVsb25nc1RvKFVzZXIsICd1c2VyX2lkJylcbiAgfVxuXG59KVxuXG5leHBvcnQgZGVmYXVsdCBFbWFpbFxuIiwiaW1wb3J0IE1vZGVsIGZyb20gJy4uL2NvcmUvb2JqZWN0cy9tb2RlbCdcbmltcG9ydCBFbWFpbExpbmsgZnJvbSAnLi9lbWFpbF9saW5rJ1xuXG5jb25zdCBFbWFpbEFjdGl2aXR5ID0gbmV3IE1vZGVsKHtcblxuICB0YWJsZU5hbWU6ICdtYWhhX2VtYWlsX2FjdGl2aXRpZXMnLFxuXG4gIGRpc3BsYXlOYW1lOiAnZW1haWwgYWN0aXZpdHknLFxuXG4gIGxpbmsoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmVsb25nc1RvKEVtYWlsTGluaywgJ2VtYWlsX2xpbmtfaWQnKVxuICB9XG5cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEVtYWlsQWN0aXZpdHlcbiIsImltcG9ydCBNb2RlbCBmcm9tICcuLi9jb3JlL29iamVjdHMvbW9kZWwnXG5cbmNvbnN0IEVtYWlsTGluayA9IG5ldyBNb2RlbCh7XG5cbiAgdGFibGVOYW1lOiAnbWFoYV9lbWFpbF9saW5rcycsXG5cbiAgZGlzcGxheU5hbWU6ICdtYWhhX2VtYWlsX2xpbmtzJyxcblxuICBkaXNwbGF5QXR0cmlidXRlOiAndGV4dCdcblxufSlcblxuZXhwb3J0IGRlZmF1bHQgRW1haWxMaW5rXG4iLCJpbXBvcnQgTW9kZWwgZnJvbSAnLi4vY29yZS9vYmplY3RzL21vZGVsJ1xuXG5jb25zdCBFbWFpbFRlbXBsYXRlID0gbmV3IE1vZGVsKHtcblxuICB0YWJsZU5hbWU6ICdtYWhhX2VtYWlsX3RlbXBsYXRlcycsXG5cbiAgZGlzcGxheU5hbWU6ICdlbWFpbCB0ZW1wbGF0ZScsXG5cbiAgZGlzcGxheUF0dHJpYnV0ZTogJ25hbWUnXG5cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEVtYWlsVGVtcGxhdGVcbiIsImltcG9ydCBNb2RlbCBmcm9tICcuLi9jb3JlL29iamVjdHMvbW9kZWwnXG5pbXBvcnQgVXNlciBmcm9tICcuL3VzZXInXG5cbmNvbnN0IEdyb3VwID0gbmV3IE1vZGVsKHtcblxuICB0YWJsZU5hbWU6ICdtYWhhX2dyb3VwcycsXG5cbiAgZGlzcGxheU5hbWU6ICdncm91cCcsXG5cbiAgZGlzcGxheUF0dHJpYnV0ZTogJ3RpdGxlJyxcblxuICBydWxlczoge1xuICAgIHRpdGxlOiBbJ3JlcXVpcmVkJywgJ3VuaXF1ZSddXG4gIH0sXG5cbiAgdXNlcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmVsb25nc1RvTWFueShVc2VyLCAnbWFoYV91c2Vyc19ncm91cHMnLCAnZ3JvdXBfaWQnLCAndXNlcl9pZCcpXG4gIH1cblxufSlcblxuZXhwb3J0IGRlZmF1bHQgR3JvdXBcbiIsImltcG9ydCBNb2RlbCBmcm9tICcuLi9jb3JlL29iamVjdHMvbW9kZWwnXG5pbXBvcnQgQXNzZXQgZnJvbSAnLi9hc3NldCdcbmltcG9ydCBJbXBvcnRJdGVtIGZyb20gJy4vaW1wb3J0X2l0ZW0nXG5pbXBvcnQgVXNlciBmcm9tICcuL3VzZXInXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCdcblxuY29uc3QgSW1wb3J0ID0gbmV3IE1vZGVsKHtcblxuICB0YWJsZU5hbWU6ICdtYWhhX2ltcG9ydHMnLFxuXG4gIGRpc3BsYXlOYW1lOiAnaW1wb3J0JyxcblxuICBkaXNwbGF5QXR0cmlidXRlOiAnZGVzY3JpcHRpb24nLFxuXG4gIHJ1bGVzOiB7XG4gICAgYXNzZXRfaWQ6IFsncmVxdWlyZWQnXVxuICB9LFxuXG4gIHZpcnR1YWxzOiB7XG5cbiAgICBkZXNjcmlwdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICBpZih0aGlzLmdldCgnbmFtZScpKSByZXR1cm4gdGhpcy5nZXQoJ25hbWUnKVxuICAgICAgaWYodGhpcy5nZXQoJ2Fzc2V0X2lkJykpIHJldHVybiB0aGlzLnJlbGF0ZWQoJ2Fzc2V0JykuZ2V0KCdvcmlnaW5hbF9maWxlX25hbWUnKVxuICAgICAgcmV0dXJuIGBJbXBvcnQgb24gJHttb21lbnQodGhpcy5nZXQoJ2NyZWF0ZWRfYXQnKSkuZm9ybWF0KCdNTS9ERC9ZWVlZJyl9YFxuICAgIH1cblxuICB9LFxuXG4gIGFzc2V0KCkge1xuICAgIHJldHVybiB0aGlzLmJlbG9uZ3NUbyhBc3NldCwgJ2Fzc2V0X2lkJylcbiAgfSxcblxuICBpdGVtcygpIHtcbiAgICByZXR1cm4gdGhpcy5oYXNNYW55KEltcG9ydEl0ZW0sICdpbXBvcnRfaWQnKVxuICB9LFxuXG4gIHVzZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmVsb25nc1RvKFVzZXIsICd1c2VyX2lkJylcbiAgfVxuXG59KVxuXG5leHBvcnQgZGVmYXVsdCBJbXBvcnRcbiIsImltcG9ydCBNb2RlbCBmcm9tICcuLi9jb3JlL29iamVjdHMvbW9kZWwnXG5pbXBvcnQgSW1wb3J0IGZyb20gJy4vaW1wb3J0J1xuXG5jb25zdCBJbXBvcnRJdGVtID0gbmV3IE1vZGVsKHtcblxuICB0YWJsZU5hbWU6ICdtYWhhX2ltcG9ydF9pdGVtcycsXG5cbiAgZGlzcGxheU5hbWU6ICdpbXBvcnRfaXRlbScsXG5cbiAgZGlzcGxheUF0dHJpYnV0ZTogJycsXG5cbiAgcnVsZXM6IHt9LFxuXG4gIHZpcnR1YWxzOiB7fSxcblxuICBiZWxvbmdzVG9UZWFtOiBmYWxzZSxcblxuICBoYXNUaW1lc3RhbXBzOiBmYWxzZSxcblxuICBpbXBvcnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmVsb25nc1RvKEltcG9ydCwgJ2ltcG9ydF9pZCcpXG4gIH1cblxufSlcblxuZXhwb3J0IGRlZmF1bHQgSW1wb3J0SXRlbVxuIiwiaW1wb3J0IE1vZGVsIGZyb20gJy4uL2NvcmUvb2JqZWN0cy9tb2RlbCdcbmltcG9ydCBBcHAgZnJvbSAnLi9hcHAnXG5cbmNvbnN0IEluc3RhbGxhdGlvbiA9IG5ldyBNb2RlbCh7XG5cbiAgdGFibGVOYW1lOiAnbWFoYV9pbnN0YWxsYXRpb25zJyxcblxuICBkaXNwbGF5TmFtZTogJ2FwcCcsXG5cbiAgZGlzcGxheUF0dHJpYnV0ZTogJ3RpdGxlJyxcblxuICBydWxlczoge1xuICAgIGFwcF9pZDogJ3JlcXVpcmVkJ1xuICB9LFxuXG4gIHZpcnR1YWxzOiB7XG5cbiAgICB0aXRsZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlbGF0ZWQoJ2FwcCcpLmdldCgndGl0bGUnKVxuICAgIH1cblxuICB9LFxuXG4gIGFwcCgpIHtcbiAgICByZXR1cm4gdGhpcy5iZWxvbmdzVG8oQXBwLCAnYXBwX2lkJylcbiAgfVxuXG59KVxuXG5leHBvcnQgZGVmYXVsdCBJbnN0YWxsYXRpb25cbiIsImltcG9ydCBNb2RlbCBmcm9tICcuLi9jb3JlL29iamVjdHMvbW9kZWwnXG5pbXBvcnQgVXNlciBmcm9tICcuL3VzZXInXG5cbmNvbnN0IExpa2UgPSBuZXcgTW9kZWwoe1xuXG4gIHRhYmxlTmFtZTogJ21haGFfbGlrZXMnLFxuXG4gIGRpc3BsYXlOYW1lOiAnbGlrZScsXG5cbiAgZGlzcGxheUF0dHJpYnV0ZTogJycsXG5cbiAgcnVsZXM6IHtcblxuICB9LFxuXG4gIHZpcnR1YWxzOiB7XG5cbiAgfSxcblxuICB1c2VyKCkge1xuICAgIHJldHVybiB0aGlzLmJlbG9uZ3NUbyhVc2VyLCAndXNlcl9pZCcpXG4gIH1cblxufSlcblxuZXhwb3J0IGRlZmF1bHQgTGlrZVxuIiwiaW1wb3J0IE1vZGVsIGZyb20gJy4uL2NvcmUvb2JqZWN0cy9tb2RlbCdcbmltcG9ydCBVc2VyIGZyb20gJy4vdXNlcidcblxuY29uc3QgTGlzdGVuaW5nID0gbmV3IE1vZGVsKHtcblxuICB0YWJsZU5hbWU6ICdtYWhhX2xpc3RlbmluZ3MnLFxuXG4gIGRpc3BsYXlOYW1lOiAnbGlzdGVuZXInLFxuXG4gIGRpc3BsYXlBdHRyaWJ1dGU6ICcnLFxuXG4gIHJ1bGVzOiB7XG4gICAgbGlzdGVuYWJsZV90eXBlOiAncmVxdWlyZWQnLFxuICAgIGxpc3RlbmFibGVfaWQ6ICdyZXF1aXJlZCcsXG4gICAgdXNlcl9pZDogJ3JlcXVpcmVkJ1xuICB9LFxuXG4gIHVzZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmVsb25nc1RvKFVzZXIsICd1c2VyX2lkJylcbiAgfVxuXG59KVxuXG5leHBvcnQgZGVmYXVsdCBMaXN0ZW5pbmdcbiIsImltcG9ydCBNb2RlbCBmcm9tICcuLi9jb3JlL29iamVjdHMvbW9kZWwnXG5pbXBvcnQgVXNlciBmcm9tICcuL3VzZXInXG5cbmNvbnN0IE5vdGlmaWNhdGlvbk1ldGhvZCA9IG5ldyBNb2RlbCh7XG5cbiAgdGFibGVOYW1lOiAnbWFoYV9ub3RpZmljYXRpb25fbWV0aG9kcycsXG5cbiAgZGlzcGxheU5hbWU6ICdub3RpZmljYXRpb25fbWV0aG9kJyxcblxuICBkaXNwbGF5QXR0cmlidXRlOiAndGl0bGUnLFxuXG4gIHVzZXJzKCkge1xuICAgIHJldHVybiB0aGlzLmJlbG9uZ3NUb01hbnkoVXNlciwgJ25vdGlmaWNhdGlvbl9tZXRob2RfaWQnKVxuICB9XG5cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IE5vdGlmaWNhdGlvbk1ldGhvZFxuIiwiaW1wb3J0IE1vZGVsIGZyb20gJy4uL2NvcmUvb2JqZWN0cy9tb2RlbCdcbmltcG9ydCBTb3VyY2UgZnJvbSAnLi9zb3VyY2UnXG5pbXBvcnQgVXNlciBmcm9tICcuL3VzZXInXG5cbmNvbnN0IFByb2ZpbGUgPSBuZXcgTW9kZWwoe1xuXG4gIHRhYmxlTmFtZTogJ21haGFfcHJvZmlsZXMnLFxuXG4gIGRpc3BsYXlOYW1lOiAncHJvZmlsZScsXG5cbiAgZGlzcGxheUF0dHJpYnV0ZTogJ3R5cGUnLFxuXG4gIHJ1bGVzOiB7XG4gIH0sXG5cbiAgdXNlcigpIHtcbiAgICByZXR1cm4gdGhpcy5iZWxvbmdzVG8oVXNlciwgJ3VzZXJfaWQnKVxuICB9LFxuXG4gIHNvdXJjZSgpIHtcbiAgICByZXR1cm4gdGhpcy5iZWxvbmdzVG8oU291cmNlLCAnc291cmNlX2lkJylcbiAgfVxuXG59KVxuXG5leHBvcnQgZGVmYXVsdCBQcm9maWxlXG4iLCJpbXBvcnQgQXR0YWNobWVudCBmcm9tICcuL2F0dGFjaG1lbnQnXG5pbXBvcnQgTW9kZWwgZnJvbSAnLi4vY29yZS9vYmplY3RzL21vZGVsJ1xuaW1wb3J0IFVzZXIgZnJvbSAnLi91c2VyJ1xuXG5jb25zdCBSZXZpZXcgPSBuZXcgTW9kZWwoe1xuXG4gIHRhYmxlTmFtZTogJ21haGFfcmV2aWV3cycsXG5cbiAgZGlzcGxheU5hbWU6ICdyZXZpZXcnLFxuXG4gIGRpc3BsYXlBdHRyaWJ1dGU6ICcnLFxuXG4gIHJ1bGVzOiB7XG4gICAgc2NvcmU6IFsncmVxdWlyZWQnLCdncmVhdGVyVGhhbkVxdWFsVG86MCcsJ2xlc3NUaGFuRXF1YWxUbzo1J10sXG4gICAgdGV4dDogJ3JlcXVpcmVkJ1xuICB9LFxuXG4gIHZpcnR1YWxzOiB7XG5cbiAgfSxcblxuICBhdHRhY2htZW50cygpIHtcbiAgICByZXR1cm4gdGhpcy5tb3JwaE1hbnkoQXR0YWNobWVudCwgJ2F0dGFjaGFibGUnKVxuICB9LFxuXG4gIHVzZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmVsb25nc1RvKFVzZXIsICd1c2VyX2lkJylcbiAgfVxuXG59KVxuXG5leHBvcnQgZGVmYXVsdCBSZXZpZXdcbiIsImltcG9ydCBNb2RlbCBmcm9tICcuLi9jb3JlL29iamVjdHMvbW9kZWwnXG5pbXBvcnQgQXBwIGZyb20gJy4vYXBwJ1xuaW1wb3J0IFJvbGUgZnJvbSAnLi9yb2xlJ1xuXG5jb25zdCBSaWdodCA9IG5ldyBNb2RlbCh7XG5cbiAgdGFibGVOYW1lOiAnbWFoYV9yaWdodHMnLFxuXG4gIGRpc3BsYXlOYW1lOiAncmlnaHQnLFxuXG4gIGRpc3BsYXlBdHRyaWJ1dGU6ICd0ZXh0JyxcblxuICB3aXRoUmVsYXRlZDogJ2FwcCcsXG5cbiAgcnVsZXM6IHtcbiAgICB0ZXh0OiAncmVxdWlyZWQnLFxuICAgIGFwcF9pZDogJ3JlcXVpcmVkJ1xuICB9LFxuXG4gIHZpcnR1YWxzOiB7XG5cbiAgICBjb2RlOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlbGF0ZWQoJ2FwcCcpLmdldCgndGl0bGUnKS50b0xvd2VyQ2FzZSgpICsgJzonICsgdGhpcy5nZXQoJ3RleHQnKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccy8sICdfJylcbiAgICB9XG5cbiAgfSxcblxuICBhcHAoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmVsb25nc1RvKEFwcCwgJ2FwcF9pZCcpXG4gIH0sXG5cbiAgcm9sZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmVsb25nc1RvTWFueShSb2xlLCAnbWFoYV91c2Vyc19yb2xlcycsICd1c2VyX2lkJywgJ3JvbGVfaWQnKVxuICB9XG5cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFJpZ2h0XG4iLCJpbXBvcnQgTW9kZWwgZnJvbSAnLi4vY29yZS9vYmplY3RzL21vZGVsJ1xuaW1wb3J0IEFwcCBmcm9tICcuL2FwcCdcbmltcG9ydCBSaWdodCBmcm9tICcuL3JpZ2h0J1xuaW1wb3J0IFVzZXIgZnJvbSAnLi91c2VyJ1xuXG5jb25zdCBSb2xlID0gbmV3IE1vZGVsKHtcblxuICB0YWJsZU5hbWU6ICdtYWhhX3JvbGVzJyxcblxuICBkaXNwbGF5TmFtZTogJ3JvbGUnLFxuXG4gIGRpc3BsYXlBdHRyaWJ1dGU6ICd0aXRsZScsXG5cbiAgcnVsZXM6IHtcbiAgICB0aXRsZTogWydyZXF1aXJlZCcsICd1bmlxdWUnXSxcbiAgICBkZXNjcmlwdGlvbjogJ3JlcXVpcmVkJ1xuICB9LFxuXG4gIGFwcHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmVsb25nc1RvTWFueShBcHAsICdtYWhhX3JvbGVzX2FwcHMnLCAncm9sZV9pZCcsICdhcHBfaWQnKVxuICB9LFxuXG4gIHJpZ2h0cygpIHtcbiAgICByZXR1cm4gdGhpcy5iZWxvbmdzVG9NYW55KFJpZ2h0LCAnbWFoYV9yb2xlc19yaWdodHMnLCAncm9sZV9pZCcsICdyaWdodF9pZCcpXG4gIH0sXG5cbiAgdXNlcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmVsb25nc1RvTWFueShVc2VyLCAnbWFoYV91c2Vyc19yb2xlcycsICdyb2xlX2lkJywgJ3VzZXJfaWQnKVxuICB9XG5cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFJvbGVcbiIsImltcG9ydCBNb2RlbCBmcm9tICcuLi9jb3JlL29iamVjdHMvbW9kZWwnXG5cbmNvbnN0IFNlY3VyaXR5UXVlc3Rpb24gPSBuZXcgTW9kZWwoe1xuXG4gIHRhYmxlTmFtZTogJ21haGFfc2VjdXJpdHlfcXVlc3Rpb25zJyxcblxuICBkaXNwbGF5TmFtZTogJ3NlY3VyaXR5IHF1ZXN0aW9uJyxcblxuICBkaXNwbGF5QXR0cmlidXRlOiAndGV4dCcsXG5cbiAgcnVsZXM6IHtcbiAgICB0ZXh0OiBbJ3JlcXVpcmVkJ11cbiAgfVxuXG59KVxuXG5leHBvcnQgZGVmYXVsdCBTZWN1cml0eVF1ZXN0aW9uXG4iLCJpbXBvcnQgTW9kZWwgZnJvbSAnLi4vY29yZS9vYmplY3RzL21vZGVsJ1xuaW1wb3J0IEF0dGFjaG1lbnQgZnJvbSAnLi9hdHRhY2htZW50J1xuXG5jb25zdCBTZXJ2aWNlID0gbmV3IE1vZGVsKHtcblxuICB0YWJsZU5hbWU6ICdtYWhhX3NlcnZpY2VzJyxcblxuICBkaXNwbGF5TmFtZTogJ2F0dGFjaG1lbnQnLFxuXG4gIGRpc3BsYXlBdHRyaWJ1dGU6ICcnLFxuICBcbiAgYmVsb25nc1RvVGVhbTogZmFsc2UsXG4gIFxuICBoYXNUaW1lc3RhbXBzOiBmYWxzZSxcblxuICBhdHRhY2htZW50cygpIHtcbiAgICByZXR1cm4gdGhpcy5oYXNNYW55KEF0dGFjaG1lbnQsICdzZXJ2aWNlX2lkJylcbiAgfVxuXG59KVxuXG5leHBvcnQgZGVmYXVsdCBTZXJ2aWNlXG4iLCJpbXBvcnQgTW9kZWwgZnJvbSAnLi4vY29yZS9vYmplY3RzL21vZGVsJ1xuaW1wb3J0IERldmljZSBmcm9tICcuL2RldmljZSdcbmltcG9ydCBVc2VyIGZyb20gJy4vdXNlcidcblxuY29uc3QgU2Vzc2lvbiA9IG5ldyBNb2RlbCh7XG5cbiAgdGFibGVOYW1lOiAnbWFoYV9zZXNzaW9ucycsXG5cbiAgZGlzcGxheU5hbWU6ICdzZXNzaW9ucycsXG5cbiAgZGlzcGxheUF0dHJpYnV0ZTogJycsXG5cbiAgZGV2aWNlKCkge1xuICAgIHJldHVybiB0aGlzLmJlbG9uZ3NUbyhEZXZpY2UsICdkZXZpY2VfaWQnKVxuICB9LFxuXG4gIHVzZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmVsb25nc1RvKFVzZXIsICd1c2VyX2lkJylcbiAgfVxuXG59KVxuXG5leHBvcnQgZGVmYXVsdCBTZXNzaW9uXG4iLCJpbXBvcnQgTW9kZWwgZnJvbSAnLi4vY29yZS9vYmplY3RzL21vZGVsJ1xuaW1wb3J0IEFzc2V0IGZyb20gJy4vYXNzZXQnXG5pbXBvcnQgUHJvZmlsZSBmcm9tICcuL3Byb2ZpbGUnXG5cbmNvbnN0IFNvdXJjZSA9IG5ldyBNb2RlbCh7XG5cbiAgdGFibGVOYW1lOiAnbWFoYV9zb3VyY2VzJyxcblxuICBkaXNwbGF5TmFtZTogJ3NvdXJjZScsXG5cbiAgZGlzcGxheUF0dHJpYnV0ZTogJ3NvdXJjZScsXG5cbiAgcnVsZXM6IHtcbiAgfSxcblxuICBhc3NldHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzTWFueShBc3NldCwgJ2Fzc2V0X2lkJylcbiAgfSxcblxuICBwcm9maWxlcygpIHtcbiAgICByZXR1cm4gdGhpcy5oYXNNYW55KFByb2ZpbGUsICdzb3VyY2VfaWQnKVxuICB9XG5cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFNvdXJjZVxuIiwiaW1wb3J0IE1vZGVsIGZyb20gJy4uL2NvcmUvb2JqZWN0cy9tb2RlbCdcbmltcG9ydCBVc2VyIGZyb20gJy4vdXNlcidcblxuY29uc3QgU3RhciA9IG5ldyBNb2RlbCh7XG5cbiAgdGFibGVOYW1lOiAnbWFoYV9zdGFycycsXG5cbiAgZGlzcGxheU5hbWU6ICdzdGFyJyxcblxuICBkaXNwbGF5QXR0cmlidXRlOiAnJyxcblxuICBydWxlczoge1xuXG4gIH0sXG5cbiAgdmlydHVhbHM6IHtcblxuICB9LFxuXG4gIHVzZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmVsb25nc1RvKFVzZXIsICd1c2VyX2lkJylcbiAgfVxuXG59KVxuXG5leHBvcnQgZGVmYXVsdCBTdGFyXG4iLCJpbXBvcnQgTW9kZWwgZnJvbSAnLi4vY29yZS9vYmplY3RzL21vZGVsJ1xuXG5jb25zdCBTdG9yeSA9IG5ldyBNb2RlbCh7XG5cbiAgdGFibGVOYW1lOiAnbWFoYV9zdG9yaWVzJyxcblxuICBkaXNwbGF5TmFtZTogJ3N0b3J5JyxcblxuICBkaXNwbGF5QXR0cmlidXRlOiAndGV4dCcsXG5cbiAgaGFzVGltZXN0YW1wczogW10sXG5cbiAgYmVsb25nc1RvVGVhbTogZmFsc2UsXG5cbiAgcnVsZXM6IHtcbiAgICB0ZXh0OiAncmVxdWlyZWQnXG4gIH1cblxufSlcblxuZXhwb3J0IGRlZmF1bHQgU3RvcnlcbiIsImltcG9ydCBNb2RlbCBmcm9tICcuLi9jb3JlL29iamVjdHMvbW9kZWwnXG5cbmNvbnN0IFN0cmF0ZWd5ID0gbmV3IE1vZGVsKHtcblxuICB0YWJsZU5hbWU6ICdtYWhhX3N0cmF0ZWdpZXMnLFxuXG4gIGRpc3BsYXlOYW1lOiAnc3RyYXRlZ3knLFxuXG4gIGRpc3BsYXlBdHRyaWJ1dGU6ICduYW1lJyxcblxuICBydWxlczoge1xuICAgIG5hbWU6ICdyZXF1aXJlZCdcbiAgfVxuXG59KVxuXG5leHBvcnQgZGVmYXVsdCBTdHJhdGVneVxuIiwiaW1wb3J0IE1vZGVsIGZyb20gJy4uL2NvcmUvb2JqZWN0cy9tb2RlbCdcbmltcG9ydCBVc2VyIGZyb20gJy4vdXNlcidcblxuY29uc3QgU3VwZXJ2aXNpb24gPSBuZXcgTW9kZWwoe1xuXG4gIHRhYmxlTmFtZTogJ21haGFfc3VwZXJ2aXNpb25zJyxcblxuICBkaXNwbGF5TmFtZTogJ3N1cGVydmlzaW9uJyxcblxuICBzdXBlcnZpc29yKCkge1xuICAgIHJldHVybiB0aGlzLmJlbG9uZ3NUbyhVc2VyLCAnc3VwZXJ2aXNvcl9pZCcpXG4gIH0sXG5cbiAgZW1wbG95ZWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmVsb25nc1RvKFVzZXIsICdlbXBsb3llZV9pZCcpXG4gIH1cblxufSlcblxuZXhwb3J0IGRlZmF1bHQgU3VwZXJ2aXNpb25cbiIsImltcG9ydCBNb2RlbCBmcm9tICcuLi9jb3JlL29iamVjdHMvbW9kZWwnXG5pbXBvcnQgVXNlciBmcm9tICcuL3VzZXInXG5cbmNvbnN0IFN1cGVydmlzb3IgPSBuZXcgTW9kZWwoe1xuXG4gIHRhYmxlTmFtZTogJ21haGFfc3VwZXJ2aXNvcnMnLFxuXG4gIGRpc3BsYXlOYW1lOiAnc3VwZXJ2aXNvcicsXG5cbiAgZGlzcGxheUF0dHJpYnV0ZTogJ2Z1bGxfbmFtZScsXG5cbiAgcnVsZXM6IHtcbiAgICB1c2VyX2lkOiAncmVxdWlyZWQnXG4gIH0sXG5cbiAgdXNlcigpIHtcbiAgICByZXR1cm4gdGhpcy5iZWxvbmdzVG8oVXNlciwgJ3VzZXJfaWQnKVxuICB9XG5cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFN1cGVydmlzb3JcbiIsImltcG9ydCBNb2RlbCBmcm9tICcuLi9jb3JlL29iamVjdHMvbW9kZWwnXG5pbXBvcnQgQXNzZXQgZnJvbSAnLi9hc3NldCdcbmltcG9ydCBEb21haW4gZnJvbSAnLi9kb21haW4nXG5pbXBvcnQgU3RyYXRlZ3kgZnJvbSAnLi9zdHJhdGVneSdcblxuY29uc3QgVGVhbSA9IG5ldyBNb2RlbCh7XG5cbiAgdGFibGVOYW1lOiAnbWFoYV90ZWFtcycsXG5cbiAgZGlzcGxheU5hbWU6ICd0ZWFtJyxcblxuICBkaXNwbGF5QXR0cmlidXRlOiAndGl0bGUnLFxuXG4gIGJlbG9uZ3NUb1RlYW06IGZhbHNlLFxuXG4gIHdpdGhSZWxhdGVkOiBbJ2xvZ28nLCdzdHJhdGVnaWVzJ10sXG5cbiAgcnVsZXM6IHtcbiAgICB0aXRsZTogWydyZXF1aXJlZCcsICd1bmlxdWUnXSxcbiAgICBzdWJkb21haW46IFsncmVxdWlyZWQnLCAndW5pcXVlJ11cbiAgfSxcblxuICBkb21haW5zKCkge1xuICAgIHJldHVybiB0aGlzLmhhc01hbnkoRG9tYWluLCAndGVhbV9pZCcpXG4gIH0sXG5cbiAgbG9nbygpIHtcbiAgICByZXR1cm4gdGhpcy5iZWxvbmdzVG8oQXNzZXQsICdsb2dvX2lkJylcbiAgfSxcblxuICBzdHJhdGVnaWVzKCkge1xuICAgIHJldHVybiB0aGlzLmhhc01hbnkoU3RyYXRlZ3ksICd0ZWFtX2lkJylcbiAgfVxuXG59KVxuXG5leHBvcnQgZGVmYXVsdCBUZWFtXG4iLCJpbXBvcnQgTW9kZWwgZnJvbSAnLi4vY29yZS9vYmplY3RzL21vZGVsJ1xuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHQtbm9kZWpzJ1xuaW1wb3J0IEFzc2V0IGZyb20gJy4vYXNzZXQnXG5pbXBvcnQgR3JvdXAgZnJvbSAnLi9ncm91cCdcbmltcG9ydCBSb2xlIGZyb20gJy4vcm9sZSdcbmltcG9ydCBOb3RpZmljYXRpb25NZXRob2QgZnJvbSAnLi9ub3RpZmljYXRpb25fbWV0aG9kJ1xuaW1wb3J0IFNlY3VyaXR5UXVlc3Rpb24gZnJvbSAnLi9zZWN1cml0eV9xdWVzdGlvbidcbmltcG9ydCBTdXBlcnZpc2lvbiBmcm9tICcuL3N1cGVydmlzaW9uJ1xuaW1wb3J0IFRlYW0gZnJvbSAnLi90ZWFtJ1xuXG5jb25zdCBVc2VyID0gbmV3IE1vZGVsKHtcblxuICB0YWJsZU5hbWU6ICdtYWhhX3VzZXJzJyxcblxuICBkaXNwbGF5TmFtZTogJ3VzZXInLFxuXG4gIGRpc3BsYXlBdHRyaWJ1dGU6ICdmdWxsX25hbWUnLFxuXG4gIHdpdGhSZWxhdGVkOiAncGhvdG8nLFxuXG4gIHJ1bGVzOiB7XG4gICAgZmlyc3RfbmFtZTogJ3JlcXVpcmVkJyxcbiAgICBsYXN0X25hbWU6ICdyZXF1aXJlZCcsXG4gICAgZW1haWw6IFsncmVxdWlyZWQnLCAnZW1haWwnLCAndW5pcXVlJ11cbiAgfSxcblxuICB2aXJ0dWFsczoge1xuXG4gICAgZnVsbF9uYW1lOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldCgnZmlyc3RfbmFtZScpICsgJyAnICsgdGhpcy5nZXQoJ2xhc3RfbmFtZScpXG4gICAgfSxcblxuICAgIGZfbGFzdDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoJ2ZpcnN0X2luaXRpYWwnKSArIHRoaXMuZ2V0KCdsYXN0X25hbWUnKS50b0xvd2VyQ2FzZSgpXG4gICAgfSxcblxuICAgIGZpcnN0X2luaXRpYWw6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KCdmaXJzdF9uYW1lJykgPyB0aGlzLmdldCgnZmlyc3RfbmFtZScpWzBdLnRvTG93ZXJDYXNlKCkgOiAnJ1xuICAgIH0sXG5cbiAgICBsYXN0X2luaXRpYWw6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KCdsYXN0X25hbWUnKSA/IHRoaXMuZ2V0KCdsYXN0X25hbWUnKVswXS50b0xvd2VyQ2FzZSgpIDogJydcbiAgICB9LFxuXG4gICAgaW5pdGlhbHM6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KCdmaXJzdF9pbml0aWFsJykgKyB0aGlzLmdldCgnbGFzdF9pbml0aWFsJylcbiAgICB9LFxuXG4gICAgcmZjODIyOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBgJHt0aGlzLmdldCgnZnVsbF9uYW1lJyl9IDwke3RoaXMuZ2V0KCdlbWFpbCcpfT5gXG4gICAgfSxcblxuICAgIGdyb3VwX2lkczogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZWxhdGVkKCdncm91cHMnKS5tYXAoZ3JvdXAgPT4gZ3JvdXAuaWQpXG4gICAgfSxcblxuICAgIHJvbGVfaWRzOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlbGF0ZWQoJ3JvbGVzJykubWFwKHJvbGUgPT4gcm9sZS5pZClcbiAgICB9LFxuXG4gICAgc3VwZXJ2aXNvcl9pZHM6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMucmVsYXRlZCgnc3VwZXJ2aXNvcnMnKS5tYXAoc3VwZXJ2aXNvciA9PiBzdXBlcnZpc29yLmlkKVxuICAgIH0sXG5cbiAgICBwYXNzd29yZDoge1xuICAgICAgZ2V0KCkge30sXG4gICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgY29uc3QgcGFzc3dvcmRfc2FsdCA9IGJjcnlwdC5nZW5TYWx0U3luYygxMClcbiAgICAgICAgdGhpcy5zZXQoJ3Bhc3N3b3JkX3NhbHQnLCBwYXNzd29yZF9zYWx0KVxuICAgICAgICB0aGlzLnNldCgncGFzc3dvcmRfaGFzaCcsIGJjcnlwdC5oYXNoU3luYyh2YWx1ZSwgcGFzc3dvcmRfc2FsdCkpXG4gICAgICB9XG4gICAgfVxuXG4gIH0sXG5cbiAgbm90aWZpY2F0aW9uX21ldGhvZCgpIHtcbiAgICByZXR1cm4gdGhpcy5iZWxvbmdzVG8oTm90aWZpY2F0aW9uTWV0aG9kLCAnbm90aWZpY2F0aW9uX21ldGhvZF9pZCcpXG4gIH0sXG5cbiAgcGhvdG8oKSB7XG4gICAgcmV0dXJuIHRoaXMuYmVsb25nc1RvKEFzc2V0LCAncGhvdG9faWQnKVxuICB9LFxuXG4gIHNlY3VyaXR5X3F1ZXN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmJlbG9uZ3NUbyhTZWN1cml0eVF1ZXN0aW9uLCAnc2VjdXJpdHlfcXVlc3Rpb25faWQnKVxuICB9LFxuXG4gIGdyb3VwcygpIHtcbiAgICByZXR1cm4gdGhpcy5iZWxvbmdzVG9NYW55KEdyb3VwLCAnbWFoYV91c2Vyc19ncm91cHMnLCAndXNlcl9pZCcsICdncm91cF9pZCcpXG4gIH0sXG5cbiAgcm9sZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmVsb25nc1RvTWFueShSb2xlLCAnbWFoYV91c2Vyc19yb2xlcycsICd1c2VyX2lkJywgJ3JvbGVfaWQnKVxuICB9LFxuICBcbiAgc3VwZXJ2aXNvcnM6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmhhc01hbnkoVXNlcikudGhyb3VnaChTdXBlcnZpc2lvbiwgJ2lkJywgJ2VtcGxveWVlX2lkJywgJ3N1cGVydmlzb3JfaWQnKVxuICB9LFxuXG4gIHRlYW0oKSB7XG4gICAgcmV0dXJuIHRoaXMuYmVsb25nc1RvKFRlYW0sICd0ZWFtX2lkJylcbiAgfSxcblxuICBhdXRoZW50aWNhdGUocGFzc3dvcmQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXQoJ3Bhc3N3b3JkX2hhc2gnKSA9PT0gYmNyeXB0Lmhhc2hTeW5jKHBhc3N3b3JkLCB0aGlzLmdldCgncGFzc3dvcmRfc2FsdCcpKVxuICB9XG5cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJcbiIsImZ1bmN0aW9uIHdlYnBhY2tFbXB0eUNvbnRleHQocmVxKSB7XG5cdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHR0aHJvdyBlO1xufVxud2VicGFja0VtcHR5Q29udGV4dC5rZXlzID0gZnVuY3Rpb24oKSB7IHJldHVybiBbXTsgfTtcbndlYnBhY2tFbXB0eUNvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tFbXB0eUNvbnRleHQ7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tFbXB0eUNvbnRleHQ7XG53ZWJwYWNrRW1wdHlDb250ZXh0LmlkID0gXCIuL2FwcHMvbWFoYS9zcmMvcXVldWVzIHN5bmMgcmVjdXJzaXZlXCI7IiwiaW1wb3J0IHsgYXNzZW1ibGVBc3NldCB9IGZyb20gJy4uL3NlcnZpY2VzL2Fzc2V0J1xuaW1wb3J0IFF1ZXVlIGZyb20gJy4uL2NvcmUvb2JqZWN0cy9xdWV1ZSdcblxuY29uc3QgZW5xdWV1ZSA9IGFzeW5jIChyZXEsIHRyeCwgYXNzZXRfaWQpID0+IHtcblxuICByZXR1cm4geyBhc3NldF9pZCB9XG5cbn1cblxuY29uc3QgcHJvY2Vzc29yID0gYXN5bmMgKGpvYiwgdHJ4KSA9PiB7XG5cbiAgYXdhaXQgYXNzZW1ibGVBc3NldChqb2IuZGF0YS5hc3NldF9pZCwgdHJ4KVxuXG59XG5cbmNvbnN0IGFzc2VtYmxlQXNzZXRRdWV1ZSA9IG5ldyBRdWV1ZSh7XG4gIG5hbWU6ICdhc3NlbWJsZV9hc3NldCcsXG4gIGVucXVldWUsXG4gIHByb2Nlc3NvclxufSlcblxuZXhwb3J0IGRlZmF1bHQgYXNzZW1ibGVBc3NldFF1ZXVlXG4iLCJpbXBvcnQgY29sbGVjdE9iamVjdHMgZnJvbSAnLi4vY29yZS91dGlscy9jb2xsZWN0X29iamVjdHMnXG5pbXBvcnQgc2VuZE1haWwgZnJvbSAnLi4vY29yZS91dGlscy9zZW5kX21haWwnXG5pbXBvcnQgRW1haWxMaW5rIGZyb20gJy4uL21vZGVscy9lbWFpbF9saW5rJ1xuaW1wb3J0IFF1ZXVlIGZyb20gJy4uL2NvcmUvb2JqZWN0cy9xdWV1ZSdcbmltcG9ydCBFbWFpbCBmcm9tICcuLi9tb2RlbHMvZW1haWwnXG5pbXBvcnQgcGx1cmFsaXplIGZyb20gJ3BsdXJhbGl6ZSdcbmltcG9ydCBudW1lcmFsIGZyb20gJ251bWVyYWwnXG5pbXBvcnQgY2hlZXJpbyBmcm9tICdjaGVlcmlvJ1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IGVqcyBmcm9tICdlanMnXG5pbXBvcnQgZnMgZnJvbSAnZnMnXG5cbmNvbnN0IGVucXVldWUgPSBhc3luYyAocmVxLCB0cngsIG9wdGlvbnMpID0+IHtcblxuICBjb25zdCB0ZW1wbGF0ZXMgPSBjb2xsZWN0T2JqZWN0cygnZW1haWxzLyonKS5yZWR1Y2UoKGVtYWlscywgZW1haWwpID0+IHtcblxuICAgIGNvbnN0IGNvbmZpZyA9IHJlcXVpcmUoZW1haWwuZmlsZXBhdGgpLmRlZmF1bHRcblxuICAgIGNvbnN0IHRlbXBsYXRlUGF0aCA9IHBhdGguZGlybmFtZShlbWFpbC5maWxlcGF0aClcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5lbWFpbHMsXG4gICAgICBbY29uZmlnLmNvZGVdOiB7XG4gICAgICAgIHN1YmplY3Q6IGNvbmZpZy5zdWJqZWN0LFxuICAgICAgICBlbnZlbG9wZTogY29uZmlnLmVudmVsb3BlLFxuICAgICAgICBodG1sOiBmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKHRlbXBsYXRlUGF0aCwgJ2h0bWwuZWpzJykpLnRvU3RyaW5nKClcbiAgICAgIH1cbiAgICB9XG5cbiAgfSwge30pXG5cbiAgY29uc3QgdGVtcGxhdGUgPSB0ZW1wbGF0ZXNbb3B0aW9ucy50ZW1wbGF0ZV1cblxuICBpZihyZXEudGVhbSkgYXdhaXQgcmVxLnRlYW0ubG9hZCgnbG9nbycsIHsgdHJhbnNhY3Rpbmc6IHRyeCB9KVxuXG4gIGNvbnN0IHRlYW0gPSByZXEudGVhbSA/IHJlcS50ZWFtLnRvSlNPTigpIDogbnVsbFxuXG4gIG9wdGlvbnMuZGF0YSA9IHtcbiAgICBtb21lbnQsXG4gICAgbnVtZXJhbCxcbiAgICBwbHVyYWxpemUsXG4gICAgdGVhbSxcbiAgICAuLi5vcHRpb25zLmRhdGFcbiAgfVxuXG4gIGNvbnN0IGlubmVyQ29udGVudCA9IGVqcy5yZW5kZXIodGVtcGxhdGUuaHRtbCwgb3B0aW9ucy5kYXRhKVxuXG4gIGNvbnN0IGVudmVsb3BlVGVtcGxhdGUgPSBmcy5yZWFkRmlsZVN5bmMocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uJywgJ2NvcmUnLCAndGVtcGxhdGVzJywgJ2VudmVsb3BlLmVqcycpKS50b1N0cmluZygpXG5cbiAgY29uc3QgaHRtbCA9IHRlbXBsYXRlLmVudmVsb3BlICE9PSBudWxsID8gZWpzLnJlbmRlcihlbnZlbG9wZVRlbXBsYXRlLCB7IC4uLm9wdGlvbnMuZGF0YSwgY29udGVudDogaW5uZXJDb250ZW50fSkgOiBpbm5lckNvbnRlbnRcblxuICBjb25zdCBkYXRhID0ge1xuICAgIHRlYW1faWQ6IG9wdGlvbnMudGVhbV9pZCxcbiAgICB1c2VyX2lkOiBvcHRpb25zLnVzZXIgPyBvcHRpb25zLnVzZXIuZ2V0KCdpZCcpIDogbnVsbCxcbiAgICB0bzogb3B0aW9ucy50byB8fCBvcHRpb25zLnVzZXIuZ2V0KCdyZmM4MjInKSxcbiAgICBzdWJqZWN0OiBlanMucmVuZGVyKHRlbXBsYXRlLnN1YmplY3QsIG9wdGlvbnMuZGF0YSksXG4gICAgaHRtbCxcbiAgICBjb2RlOiBfLnJhbmRvbSgxMDAwMDAsIDk5OTk5OSkudG9TdHJpbmcoMzYpXG4gIH1cblxuICBjb25zdCBlbWFpbCA9IGF3YWl0IEVtYWlsLmZvcmdlKGRhdGEpLnNhdmUobnVsbCwgeyB0cmFuc2FjdGluZzogdHJ4IH0pXG5cbiAgY29uc3QgZW1haWxfaWQgPSBlbWFpbC5nZXQoJ2lkJylcblxuICByZXR1cm4geyBlbWFpbF9pZCB9XG5cbn1cblxuY29uc3QgcHJvY2Vzc29yID0gYXN5bmMgKGpvYiwgdHJ4KSA9PiB7XG5cbiAgY29uc3QgY29uZGl0aW9ucyA9IHtcbiAgICBpZDogam9iLmRhdGEuZW1haWxfaWRcbiAgfVxuXG4gIGNvbnN0IGVtYWlsID0gYXdhaXQgRW1haWwud2hlcmUoY29uZGl0aW9ucykuZmV0Y2goeyB3aXRoUmVsYXRlZDogWyd0ZWFtJ10sIHRyYW5zYWN0aW5nOiB0cnggfSlcblxuICBjb25zdCB0ZWFtID0gZW1haWwucmVsYXRlZCgndGVhbScpXG5cbiAgY29uc3QgcGFyc2VkID0gY2hlZXJpby5sb2FkKGVtYWlsLmdldCgnaHRtbCcpKVxuXG4gIGF3YWl0IHBhcnNlZChgPGltZyBzcmM9XCIke3Byb2Nlc3MuZW52LldFQl9IT1NUfS92JHtlbWFpbC5nZXQoJ2NvZGUnKX1cIiAvPmApLmFwcGVuZFRvKCdib2R5JylcblxuICBjb25zdCBsaW5rcyA9IGF3YWl0IHBhcnNlZCgnYScpLm1hcCgoaSwgZWxlbSkgPT4gKHtcbiAgICB0ZXh0OiBwYXJzZWQoZWxlbSkudGV4dCgpLFxuICAgIHVybDogcGFyc2VkKGVsZW0pLmF0dHIoJ2hyZWYnKVxuICB9KSkuZ2V0KClcblxuICBjb25zdCByZW5kZXJlZCA9IHtcbiAgICBmcm9tOiBgJHt0ZWFtLmdldCgndGl0bGUnKX0gPG1haWxlckBtYWhhcGxhdGZvcm0uY29tPmAsXG4gICAgdG86IGVtYWlsLmdldCgndG8nKSxcbiAgICBzdWJqZWN0OiBlbWFpbC5nZXQoJ3N1YmplY3QnKSxcbiAgICBodG1sOiBwYXJzZWQuaHRtbCgpXG4gIH1cblxuICBjb25zdCBtYXBwZWQgPSBhd2FpdCBQcm9taXNlLnJlZHVjZShsaW5rcywgYXN5bmMgKHJlbmRlcmVkLCBsaW5rKSA9PiB7XG5cbiAgICBjb25zdCBlbWFpbExpbmsgPSBhd2FpdCBfZmluZE9yQ3JlYXRlTGluayhlbWFpbCwgbGluaywgdHJ4KVxuXG4gICAgY29uc3QgbmV3VXJsID0gYCR7cHJvY2Vzcy5lbnYuV0VCX0hPU1R9L2Mke2VtYWlsLmdldCgnY29kZScpfSR7ZW1haWxMaW5rLmdldCgnY29kZScpfWBcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5yZW5kZXJlZCxcbiAgICAgIGh0bWw6IHJlbmRlcmVkLmh0bWwucmVwbGFjZShsaW5rLnVybCwgbmV3VXJsKVxuICAgIH1cblxuICB9LCByZW5kZXJlZClcblxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBzZW5kTWFpbChtYXBwZWQpXG5cbiAgYXdhaXQgZW1haWwuc2F2ZShyZXN1bHQsIHsgcGF0Y2g6IHRydWUsIHRyYW5zYWN0aW5nOiB0cnggfSlcblxufVxuXG5jb25zdCBfZmluZE9yQ3JlYXRlTGluayA9IGFzeW5jIChlbWFpbCwgbGluaywgdHJ4KSA9PiB7XG5cbiAgY29uc3QgZW1haWxMaW5rID0gYXdhaXQgRW1haWxMaW5rLndoZXJlKGxpbmspLmZldGNoKHsgdHJhbnNhY3Rpbmc6IHRyeCB9KVxuXG4gIGlmKGVtYWlsTGluaykgcmV0dXJuIGVtYWlsTGlua1xuXG4gIGNvbnN0IGRhdGEgPSB7XG4gICAgdGVhbV9pZDogZW1haWwuZ2V0KCd0ZWFtX2lkJyksXG4gICAgY29kZTogXy5yYW5kb20oMTAwMDAwLCA5OTk5OTkpLnRvU3RyaW5nKDM2KSxcbiAgICAuLi5saW5rXG4gIH1cblxuICByZXR1cm4gYXdhaXQgRW1haWxMaW5rLmZvcmdlKGRhdGEpLnNhdmUobnVsbCwgeyB0cmFuc2FjdGluZzogdHJ4IH0pXG5cbn1cblxuY29uc3QgbWFpbGVyUXVldWUgPSBuZXcgUXVldWUoe1xuICBuYW1lOiAnbWFpbGVyJyxcbiAgZW5xdWV1ZSxcbiAgcHJvY2Vzc29yXG59KVxuXG5leHBvcnQgZGVmYXVsdCBtYWlsZXJRdWV1ZVxuIiwiaW1wb3J0IHsgcHJvY2Vzc0Fzc2V0IH0gZnJvbSAnLi4vc2VydmljZXMvYXNzZXQnXG5pbXBvcnQgUXVldWUgZnJvbSAnLi4vY29yZS9vYmplY3RzL3F1ZXVlJ1xuXG5jb25zdCBlbnF1ZXVlID0gYXN5bmMgKHJlcSwgdHJ4LCBhc3NldF9pZCkgPT4ge1xuXG4gIHJldHVybiB7IGFzc2V0X2lkIH1cblxufVxuXG5jb25zdCBwcm9jZXNzb3IgPSBhc3luYyAoam9iLCB0cngpID0+IHtcblxuICBhd2FpdCBwcm9jZXNzQXNzZXQoam9iLmRhdGEuYXNzZXRfaWQsIHRyeClcblxufVxuXG5jb25zdCBwcm9jZXNzQXNzZXRRdWV1ZSA9IG5ldyBRdWV1ZSh7XG4gIG5hbWU6ICdwcm9jZXNzX2Fzc2V0JyxcbiAgZW5xdWV1ZSxcbiAgcHJvY2Vzc29yXG59KVxuXG5leHBvcnQgZGVmYXVsdCBwcm9jZXNzQXNzZXRRdWV1ZVxuIiwiaW1wb3J0IHNlcmlhbGl6ZXIgZnJvbSAnLi4vY29yZS9vYmplY3RzL3NlcmlhbGl6ZXInXG5cbmNvbnN0IGFzc2V0U2VyaWFsaXplciA9IHNlcmlhbGl6ZXIoKHJlcSwgdHJ4LCByZXN1bHQpID0+ICh7XG5cbiAgaWQ6IHJlc3VsdC5nZXQoJ2lkJyksXG5cbiAgb3JpZ2luYWxfZmlsZV9uYW1lOiByZXN1bHQuZ2V0KCdvcmlnaW5hbF9maWxlX25hbWUnKSxcblxuICBmaWxlX25hbWU6IHJlc3VsdC5nZXQoJ2ZpbGVfbmFtZScpLFxuXG4gIGNvbnRlbnRfdHlwZTogcmVzdWx0LmdldCgnY29udGVudF90eXBlJyksXG5cbiAgZmlsZV9zaXplOiByZXN1bHQuZ2V0KCdmaWxlX3NpemUnKSxcblxuICBjaHVua3NfdG90YWw6IHJlc3VsdC5nZXQoJ2NodW5rc190b3RhbCcpLFxuXG4gIHJlc2l6ZWRfdXJsOiByZXN1bHQuZ2V0KCdyZXNpemVkX3VybCcpLFxuXG4gIHBhdGg6IHJlc3VsdC5nZXQoJ3BhdGgnKSxcblxuICB1cmw6IHJlc3VsdC5nZXQoJ3VybCcpLFxuXG4gIHNvdXJjZTogcmVzdWx0LnJlbGF0ZWQoJ3NvdXJjZScpLmdldCgndGV4dCcpLFxuXG4gIHNvdXJjZV91cmw6IHJlc3VsdC5nZXQoJ3NvdXJjZV91cmwnKSxcblxuICB1c2VyOiB1c2VyKHJlc3VsdC5yZWxhdGVkKCd1c2VyJykpLFxuXG4gIGNyZWF0ZWRfYXQ6IHJlc3VsdC5nZXQoJ2NyZWF0ZWRfYXQnKSxcblxuICB1cGRhdGVkX2F0OiByZXN1bHQuZ2V0KCd1cGRhdGVkX2F0JylcblxufSkpXG5cbmNvbnN0IHVzZXIgPSAodXNlciwga2V5KSA9PiB7XG5cbiAgaWYoIXVzZXIuaWQpIHJldHVybiBudWxsXG5cbiAgcmV0dXJuIHtcblxuICAgIGlkOiB1c2VyLmdldCgnaWQnKSxcblxuICAgIGZ1bGxfbmFtZTogdXNlci5nZXQoJ2Z1bGxfbmFtZScpLFxuXG4gICAgaW5pdGlhbHM6IHVzZXIuZ2V0KCdpbml0aWFscycpLFxuXG4gICAgcGhvdG86IHVzZXIucmVsYXRlZCgncGhvdG8nKSA/IHVzZXIucmVsYXRlZCgncGhvdG8nKS5nZXQoJ3BhdGgnKSA6IG51bGxcblxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgYXNzZXRTZXJpYWxpemVyXG4iLCJpbXBvcnQgc2VyaWFsaXplciBmcm9tICcuLi9jb3JlL29iamVjdHMvc2VyaWFsaXplcidcblxuY29uc3QgaW1wb3J0U2VyaWFsaXplciA9IHNlcmlhbGl6ZXIoKHJlcSwgdHJ4LCByZXN1bHQpID0+ICh7XG5cbiAgaWQ6IHJlc3VsdC5nZXQoJ2lkJyksXG5cbiAgYXNzZXQ6IGFzc2V0KHJlc3VsdC5yZWxhdGVkKCdhc3NldCcpKSxcblxuICBzdGFnZTogcmVzdWx0LmdldCgnc3RhZ2UnKSxcblxuICBkZWxpbWl0ZXI6IHJlc3VsdC5nZXQoJ2RlbGltaXRlcicpLFxuXG4gIGhlYWRlcnM6IHJlc3VsdC5nZXQoJ2hlYWRlcnMnKSxcblxuICBtYXBwaW5nOiByZXN1bHQuZ2V0KCdtYXBwaW5nJyksXG5cbiAgdXNlcjogdXNlcihyZXN1bHQucmVsYXRlZCgndXNlcicpKSxcblxuICBuYW1lOiByZXN1bHQuZ2V0KCduYW1lJyksXG5cbiAgc3RyYXRlZ3k6IHJlc3VsdC5nZXQoJ3N0cmF0ZWd5JyksXG5cbiAgb2JqZWN0X3R5cGU6IHJlc3VsdC5nZXQoJ29iamVjdF90eXBlJyksXG5cbiAgY29tcGxldGVkX2NvdW50OiByZXN1bHQuZ2V0KCdjb21wbGV0ZWRfY291bnQnKSxcblxuICB2YWxpZF9jb3VudDogcmVzdWx0LmdldCgndmFsaWRfY291bnQnKSxcblxuICBlcnJvcl9jb3VudDogcmVzdWx0LmdldCgnZXJyb3JfY291bnQnKSxcblxuICBvbWl0X2NvdW50OiByZXN1bHQuZ2V0KCdvbWl0X2NvdW50JyksXG5cbiAgZHVwbGljYXRlX2NvdW50OiByZXN1bHQuZ2V0KCdkdXBsaWNhdGVfY291bnQnKSxcblxuICBub251bmlxdWVfY291bnQ6IHJlc3VsdC5nZXQoJ25vbnVuaXF1ZV9jb3VudCcpLFxuXG4gIGNyZWF0ZWRfYXQ6IHJlc3VsdC5nZXQoJ2NyZWF0ZWRfYXQnKSxcblxuICB1cGRhdGVkX2F0OiByZXN1bHQuZ2V0KCd1cGRhdGVkX2F0JylcblxufSkpXG5cbmNvbnN0IHVzZXIgPSAodXNlcikgPT4ge1xuXG4gIGlmKCF1c2VyLmlkKSByZXR1cm4gbnVsbFxuXG4gIHJldHVybiB7XG5cbiAgICBpZDogdXNlci5nZXQoJ2lkJyksXG5cbiAgICBmdWxsX25hbWU6IHVzZXIuZ2V0KCdmdWxsX25hbWUnKSxcblxuICAgIGluaXRpYWxzOiB1c2VyLmdldCgnaW5pdGlhbHMnKSxcblxuICAgIHBob3RvOiB1c2VyLnJlbGF0ZWQoJ3Bob3RvJykuZ2V0KCdwYXRoJylcblxuICB9XG5cbn1cblxuY29uc3QgYXNzZXQgPSAoYXNzZXQpID0+IHtcblxuICBpZighYXNzZXQuaWQpIHJldHVybiBudWxsXG5cbiAgcmV0dXJuIHtcblxuICAgIGlkOiBhc3NldC5nZXQoJ2lkJyksXG5cbiAgICBjb250ZW50X3R5cGU6IGFzc2V0LmdldCgnY29udGVudF90eXBlJyksXG5cbiAgICBvcmlnaW5hbF9maWxlX25hbWU6IGFzc2V0LmdldCgnZmlsZV9uYW1lJyksXG5cbiAgICBmaWxlX25hbWU6IGFzc2V0LmdldCgnZmlsZV9uYW1lJyksXG5cbiAgICBmaWxlX3NpemU6IGFzc2V0LmdldCgnZmlsZV9zaXplJyksXG5cbiAgICBpY29uOiBhc3NldC5nZXQoJ2ljb24nKSxcblxuICAgIHBhdGg6IGFzc2V0LmdldCgncGF0aCcpLFxuXG4gICAgc291cmNlOiBhc3NldC5yZWxhdGVkKCdzb3VyY2UnKS5nZXQoJ3RleHQnKSxcblxuICAgIHNvdXJjZV91cmw6IGFzc2V0LmdldCgnc291cmNlX3VybCcpXG5cbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGltcG9ydFNlcmlhbGl6ZXJcbiIsIi8vIGJhY2tmcmFtZVxuXG5leHBvcnQgeyBCYWNrZnJhbWVFcnJvciwgTGlzdFJvdXRlLCBQbHVnaW4sIFJvdXRlLCBSZXNvdXJjZSwgUmVzcG9uZGVyLCBTZWdtZW50IH0gZnJvbSAnYmFja2ZyYW1lJ1xuXG4vLyBvYmplY3RzXG5cbmV4cG9ydCBhcHAgZnJvbSAnLi9jb3JlL29iamVjdHMvYXBwJ1xuXG5leHBvcnQgY3JvbiBmcm9tICcuL2NvcmUvb2JqZWN0cy9jcm9uJ1xuXG5leHBvcnQgZW1haWwgZnJvbSAnLi9jb3JlL29iamVjdHMvZW1haWwnXG5cbmV4cG9ydCBGaXh0dXJlcyBmcm9tICcuL2NvcmUvb2JqZWN0cy9maXh0dXJlcydcblxuZXhwb3J0IE1haWxib3ggZnJvbSAnLi9jb3JlL29iamVjdHMvbWFpbGJveCdcblxuZXhwb3J0IE1pZ3JhdGlvbiBmcm9tICcuL2NvcmUvb2JqZWN0cy9taWdyYXRpb24nXG5cbmV4cG9ydCBNb2RlbCBmcm9tICcuL2NvcmUvb2JqZWN0cy9tb2RlbCdcblxuZXhwb3J0IE5hdmlnYXRpb24gZnJvbSAnLi9jb3JlL29iamVjdHMvbmF2aWdhdGlvbidcblxuZXhwb3J0IE5vdGlmaWNhdGlvblR5cGVzIGZyb20gJy4vY29yZS9vYmplY3RzL25vdGlmaWNhdGlvbl90eXBlcydcblxuZXhwb3J0IFF1ZXVlIGZyb20gJy4vY29yZS9vYmplY3RzL3F1ZXVlJ1xuXG5leHBvcnQgUmVzb3VyY2VzIGZyb20gJy4vY29yZS9vYmplY3RzL3Jlc291cmNlcydcblxuZXhwb3J0IFJpZ2h0cyBmcm9tICcuL2NvcmUvb2JqZWN0cy9yaWdodHMnXG5cbmV4cG9ydCBSb3V0ZXMgZnJvbSAnLi9jb3JlL29iamVjdHMvcm91dGVzJ1xuXG5leHBvcnQgc2VyaWFsaXplciBmcm9tICcuL2NvcmUvb2JqZWN0cy9zZXJpYWxpemVyJ1xuXG5leHBvcnQgc2VhcmNoIGZyb20gJy4vY29yZS9vYmplY3RzL3NlYXJjaCdcblxuLy8gc2VydmljZXNcblxuZXhwb3J0IGtuZXggZnJvbSAnLi9jb3JlL3NlcnZpY2VzL2tuZXgnXG5cbmV4cG9ydCByZWRpcyBmcm9tICcuL2NvcmUvc2VydmljZXMvcmVkaXMnXG5cbmV4cG9ydCBzb2NrZXQgZnJvbSAnLi9jb3JlL3NlcnZpY2VzL2VtaXR0ZXInXG5cbmV4cG9ydCBhd3MgZnJvbSAnLi9jb3JlL3NlcnZpY2VzL2F3cydcblxuZXhwb3J0IHdlYnB1c2ggZnJvbSAnd2ViLXB1c2gnXG5cbi8vIHF1ZXVlc1xuXG5leHBvcnQgbWFpbGVyIGZyb20gJy4vcXVldWVzL21haWxlcl9xdWV1ZSdcblxuZXhwb3J0IGFzc2VtYmxlQXNzZXRRdWV1ZSBmcm9tICcuL3F1ZXVlcy9hc3NlbWJsZV9hc3NldF9xdWV1ZSdcblxuZXhwb3J0IHByb2Nlc3NBc3NldFF1ZXVlIGZyb20gJy4vcXVldWVzL3Byb2Nlc3NfYXNzZXRfcXVldWUnXG5cbi8vIHNlcnZpY2VzXG5cbmV4cG9ydCB7IGdldEFzc2V0RGF0YSwgY3JlYXRlQXNzZXQsIGRlbGV0ZUFzc2V0LCBwcm9jZXNzQXNzZXQsIGNyZWF0ZUFzc2V0RnJvbVVybCB9IGZyb20gJy4vc2VydmljZXMvYXNzZXQnXG5cbmV4cG9ydCB7IGV4dHJhY3RBdHRhY2htZW50cyB9IGZyb20gJy4vc2VydmljZXMvYXR0YWNobWVudCdcblxuLy8gZnVuY3Rpb25zXG5cbmV4cG9ydCBmb3JtYXRPYmplY3RGb3JUcmFuc3BvcnQgZnJvbSAnLi9jb3JlL3V0aWxzL2Zvcm1hdF9vYmplY3RfZm9yX3RyYW5zcG9ydCdcblxuZXhwb3J0IHsgZ2V0UHJlc2VuY2UsIHNldFByZXNlbmNlIH0gZnJvbSAnLi9jb3JlL3NlcnZpY2VzL3ByZXNlbmNlJ1xuXG5leHBvcnQgeyBjcmVhdGVVc2VyVG9rZW4gfSBmcm9tICcuL2NvcmUvdXRpbHMvdXNlcl90b2tlbnMnXG5cbmV4cG9ydCB7IHVwZGF0ZVJlbGF0ZWQgfSBmcm9tICcuL2NvcmUvdXRpbHMvbW9kZWxfaGVscGVycydcblxuZXhwb3J0IHsgc2VuZFZpYVB1c2ggfSBmcm9tICcuL2NvcmUvc2VydmljZXMvd2VicHVzaCdcblxuZXhwb3J0IGNvbGxlY3RPYmplY3RzIGZyb20gJy4vY29yZS91dGlscy9jb2xsZWN0X29iamVjdHMnXG5cbmV4cG9ydCBhcHBDb25maWcgZnJvbSAnLi9jb3JlL3V0aWxzL2FwcF9jb25maWcnXG5cbmV4cG9ydCBtb2RlbHMgZnJvbSAnLi9jb3JlL3V0aWxzL21vZGVsX2FjdGl2aXRpZXMnXG5cbmV4cG9ydCBzZW5kTWFpbCBmcm9tICcuL2NvcmUvdXRpbHMvc2VuZF9tYWlsJ1xuXG4vLyBtb2RlbHNcblxuZXhwb3J0IEFjdGl2aXR5IGZyb20gJy4vbW9kZWxzL2FjdGl2aXR5J1xuXG5leHBvcnQgQXBwIGZyb20gJy4vbW9kZWxzL2FwcCdcblxuZXhwb3J0IEFwcEF1dGhvciBmcm9tICcuL21vZGVscy9hcHBfYXV0aG9yJ1xuXG5leHBvcnQgQXBwQ2F0ZWdvcnkgZnJvbSAnLi9tb2RlbHMvYXBwX2NhdGVnb3J5J1xuXG5leHBvcnQgQXNzZXQgZnJvbSAnLi9tb2RlbHMvYXNzZXQnXG5cbmV4cG9ydCBBdHRhY2htZW50IGZyb20gJy4vbW9kZWxzL2F0dGFjaG1lbnQnXG5cbmV4cG9ydCBBdWRpdCBmcm9tICcuL21vZGVscy9hdWRpdCdcblxuZXhwb3J0IENvbW1lbnQgZnJvbSAnLi9tb2RlbHMvY29tbWVudCdcblxuZXhwb3J0IERldmljZVZhbHVlIGZyb20gJy4vbW9kZWxzL2RldmljZV92YWx1ZSdcblxuZXhwb3J0IEVtYWlsIGZyb20gJy4vbW9kZWxzL2VtYWlsJ1xuXG5leHBvcnQgRW1haWxUZW1wbGF0ZSBmcm9tICcuL21vZGVscy9lbWFpbF90ZW1wbGF0ZSdcblxuZXhwb3J0IEdyb3VwIGZyb20gJy4vbW9kZWxzL2dyb3VwJ1xuXG5leHBvcnQgSW1wb3J0IGZyb20gJy4vbW9kZWxzL2ltcG9ydCdcblxuZXhwb3J0IEltcG9ydEl0ZW0gZnJvbSAnLi9tb2RlbHMvaW1wb3J0X2l0ZW0nXG5cbmV4cG9ydCBJbnN0YWxsYXRpb24gZnJvbSAnLi9tb2RlbHMvaW5zdGFsbGF0aW9uJ1xuXG5leHBvcnQgTGlzdGVuaW5nIGZyb20gJy4vbW9kZWxzL2xpc3RlbmluZydcblxuZXhwb3J0IFJpZ2h0IGZyb20gJy4vbW9kZWxzL3JpZ2h0J1xuXG5leHBvcnQgUmV2aWV3IGZyb20gJy4vbW9kZWxzL3JldmlldydcblxuZXhwb3J0IFJvbGUgZnJvbSAnLi9tb2RlbHMvcm9sZSdcblxuZXhwb3J0IFNlc3Npb24gZnJvbSAnLi9tb2RlbHMvc2Vzc2lvbidcblxuZXhwb3J0IFNvdXJjZSBmcm9tICcuL21vZGVscy9zb3VyY2UnXG5cbmV4cG9ydCBTdGFyIGZyb20gJy4vbW9kZWxzL3N0YXInXG5cbmV4cG9ydCBTdG9yeSBmcm9tICcuL21vZGVscy9zdG9yeSdcblxuZXhwb3J0IFN1cGVydmlzb3IgZnJvbSAnLi9tb2RlbHMvc3VwZXJ2aXNvcidcblxuZXhwb3J0IFN1cGVydmlzaW9uIGZyb20gJy4vbW9kZWxzL3N1cGVydmlzaW9uJ1xuXG5leHBvcnQgVGVhbSBmcm9tICcuL21vZGVscy90ZWFtJ1xuXG5leHBvcnQgVXNlciBmcm9tICcuL21vZGVscy91c2VyJ1xuXG4vLyBzZXJpYWxpemVyc1xuXG5leHBvcnQgSW1wb3J0U2VyaWFsaXplciBmcm9tICcuL3NlcmlhbGl6ZXJzL2ltcG9ydF9zZXJpYWxpemVyJ1xuIiwiaW1wb3J0IEFzc2VtYmxlQXNzZXRRdWV1ZSBmcm9tICcuLi9xdWV1ZXMvYXNzZW1ibGVfYXNzZXRfcXVldWUnXG5pbXBvcnQgQXNzZXRTZXJpYWxpemVyIGZyb20gJy4uL3NlcmlhbGl6ZXJzL2Fzc2V0X3NlcmlhbGl6ZXInXG5pbXBvcnQgUHJvY2Vzc0Fzc2V0UXVldWUgZnJvbSAnLi4vcXVldWVzL3Byb2Nlc3NfYXNzZXRfcXVldWUnXG5pbXBvcnQgc29ja2V0IGZyb20gJy4uL2NvcmUvc2VydmljZXMvZW1pdHRlcidcbmltcG9ydCB7IEJhY2tmcmFtZUVycm9yIH0gZnJvbSAnYmFja2ZyYW1lJ1xuaW1wb3J0IGF3cyBmcm9tICcuLi9jb3JlL3NlcnZpY2VzL2F3cydcbmltcG9ydCBTb3VyY2UgZnJvbSAnLi4vbW9kZWxzL3NvdXJjZSdcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3JlcXVlc3QtcHJvbWlzZSdcbmltcG9ydCBBc3NldCBmcm9tICcuLi9tb2RlbHMvYXNzZXQnXG5pbXBvcnQgeyBEdXBsZXggfSBmcm9tICdzdHJlYW0nXG5pbXBvcnQgd2Vic2hvdCBmcm9tICd3ZWJzaG90J1xuaW1wb3J0IG1pbWUgZnJvbSAnbWltZS10eXBlcydcbmltcG9ydCBta2RpcnAgZnJvbSAnbWtkaXJwJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBKaW1wIGZyb20gJ2ppbXAnXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgVXJsIGZyb20gJ3VybCdcbmltcG9ydCBmcyBmcm9tICdmcydcblxuY29uc3Qgc2ltcGxlUGFyc2VyID0gUHJvbWlzZS5wcm9taXNpZnkocmVxdWlyZSgnbWFpbHBhcnNlcicpLnNpbXBsZVBhcnNlcilcblxuY29uc3QgZXhlY0FzeW5jID0gUHJvbWlzZS5wcm9taXNpZnkocmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpLmV4ZWMpXG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZVJlcXVlc3QgPSAocGFyYW1zLCBmaWxlcywgcmVxdWlyZUZpbGUpID0+IHtcblxuICBjb25zdCBtYXhDaHVua1NpemUgPSAxMDI0ICogMTI4XG5cbiAgY29uc3QgbWF4RmlsZVNpemUgPSAxMDI0ICogMTAyNCAqIDIwXG5cbiAgY29uc3QgY2h1bmtOdW1iZXIgPSBwYXJhbXMucmVzdW1hYmxlQ2h1bmtOdW1iZXJcblxuICBjb25zdCBjaHVua1NpemUgPSBwYXJhbXMucmVzdW1hYmxlQ2h1bmtTaXplXG5cbiAgY29uc3QgdG90YWxTaXplID0gcGFyYW1zLnJlc3VtYWJsZVRvdGFsU2l6ZVxuXG4gIGNvbnN0IGlkZW50aWZpZXIgPSBwYXJhbXMucmVzdW1hYmxlSWRlbnRpZmllclxuXG4gIGNvbnN0IGZpbGVuYW1lID0gcGFyYW1zLnJlc3VtYWJsZUZpbGVuYW1lXG5cbiAgY29uc3QgdG90YWxDaHVua3MgPSBwYXJhbXMucmVzdW1hYmxlVG90YWxDaHVua3NcblxuICBpZiAoIWNodW5rTnVtYmVyIHx8ICFjaHVua1NpemUgfHwgIXRvdGFsU2l6ZSB8fCAhaWRlbnRpZmllciB8fCAhZmlsZW5hbWUgfHwgIXRvdGFsQ2h1bmtzKSB7XG4gICAgdGhyb3cgbmV3IEJhY2tmcmFtZUVycm9yKHtcbiAgICAgIGNvZGU6IDUwMCxcbiAgICAgIG1lc3NhZ2U6ICdub25fcmVzdW1hYmxlX3JlcXVlc3QnXG4gICAgfSlcbiAgfVxuXG4gIGlmIChwYXJzZUludChjaHVua051bWJlcikgPiBwYXJzZUludCh0b3RhbENodW5rcykpIHtcbiAgICB0aHJvdyBuZXcgQmFja2ZyYW1lRXJyb3Ioe1xuICAgICAgY29kZTogNTAwLFxuICAgICAgbWVzc2FnZTogJ2ludmFsaWRfcmVzdW1hYmxlX3JlcXVlc3QxJ1xuICAgIH0pXG4gIH1cblxuICBpZihwYXJzZUludChjaHVua1NpemUpID4gcGFyc2VJbnQobWF4Q2h1bmtTaXplKSkge1xuICAgIHRocm93IG5ldyBCYWNrZnJhbWVFcnJvcih7XG4gICAgICBjb2RlOiA1MDAsXG4gICAgICBtZXNzYWdlOiAnaW52YWxpZF9yZXN1bWFibGVfcmVxdWVzdDInXG4gICAgfSlcbiAgfVxuXG4gIGlmKHBhcnNlSW50KHRvdGFsU2l6ZSkgPiBwYXJzZUludChtYXhGaWxlU2l6ZSkpIHtcbiAgICB0aHJvdyBuZXcgQmFja2ZyYW1lRXJyb3Ioe1xuICAgICAgY29kZTogNTAwLFxuICAgICAgbWVzc2FnZTogJ2ludmFsaWRfcmVzdW1hYmxlX3JlcXVlc3QzJ1xuICAgIH0pXG4gIH1cblxuICBpZighcmVxdWlyZUZpbGUpIHJldHVyblxuXG4gIGNvbnN0IGZpbGVzaXplID0gZmlsZXNbJ2ZpbGUnXS5zaXplXG5cbiAgaWYoIWZpbGVzWydmaWxlJ10gfHwgIWZpbGVzWydmaWxlJ10uc2l6ZSkge1xuICAgIHRocm93IG5ldyBCYWNrZnJhbWVFcnJvcih7XG4gICAgICBjb2RlOiA1MDAsXG4gICAgICBtZXNzYWdlOiAnaW52YWxpZF9yZXN1bWFibGVfcmVxdWVzdDQnXG4gICAgfSlcbiAgfVxuXG4gIGlmKHBhcnNlSW50KGNodW5rTnVtYmVyKSA8IHBhcnNlSW50KHRvdGFsQ2h1bmtzKSAmJiBwYXJzZUludChmaWxlc2l6ZSkgIT0gcGFyc2VJbnQoY2h1bmtTaXplKSkge1xuICAgIHRocm93IG5ldyBCYWNrZnJhbWVFcnJvcih7XG4gICAgICBjb2RlOiA1MDAsXG4gICAgICBtZXNzYWdlOiAnaW52YWxpZF9yZXN1bWFibGVfcmVxdWVzdDUnXG4gICAgfSlcbiAgfVxuXG59XG5cbmV4cG9ydCBjb25zdCBjaGVja1VwbG9hZGVkRmlsZSA9IGFzeW5jIChyZXEsIHRyeCkgPT4ge1xuXG4gIGNvbnN0IGNodW5rRmlsZW5hbWUgPSBfZ2V0Q2h1bmtGaWxlbmFtZShyZXEucXVlcnkucmVzdW1hYmxlSWRlbnRpZmllciwgcmVxLnF1ZXJ5LnJlc3VtYWJsZUNodW5rTnVtYmVyKVxuXG4gIGNvbnN0IGV4aXN0cyA9IGF3YWl0IF9jaHVua0V4aXN0cyhjaHVua0ZpbGVuYW1lKVxuXG4gIGlmKCFleGlzdHMpIHtcbiAgICB0aHJvdyBuZXcgQmFja2ZyYW1lRXJyb3Ioe1xuICAgICAgY29kZTogMjA0LFxuICAgICAgbWVzc2FnZTogJ25vdF9mb3VuZCdcbiAgICB9KVxuICB9XG5cbiAgcmV0dXJuICdmb3VuZCdcblxufVxuXG5leHBvcnQgY29uc3QgdXBsb2FkQ2h1bmsgPSBhc3luYyAocmVxLCB0cngpID0+IHtcblxuICBjb25zdCBpZGVudGlmaWVyID0gX2NsZWFuSWRlbnRpZmllcihyZXEuYm9keS5yZXN1bWFibGVJZGVudGlmaWVyKVxuXG4gIGNvbnN0IGNodW5rRmlsZW5hbWUgPSBfZ2V0Q2h1bmtGaWxlbmFtZShpZGVudGlmaWVyLCByZXEuYm9keS5yZXN1bWFibGVDaHVua051bWJlcilcblxuICBmcy5yZW5hbWVTeW5jKHJlcS5maWxlc1snZmlsZSddLnBhdGgsIGNodW5rRmlsZW5hbWUpXG5cbiAgY29uc3QgZmlsZWRhdGEgPSBmcy5yZWFkRmlsZVN5bmMoY2h1bmtGaWxlbmFtZSlcblxuICBhd2FpdCBfc2F2ZUZpbGUoZmlsZWRhdGEsIGNodW5rRmlsZW5hbWUsICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nKVxuXG4gIGF3YWl0IF91bmxpbmtDaHVuayhjaHVua0ZpbGVuYW1lKVxuXG4gIGNvbnN0IGNodW5rcyA9IGF3YWl0IF9saXN0Q2h1bmtzKClcblxuICBjb25zdCBjaHVua0FycmF5ID0gWy4uLkFycmF5KHBhcnNlSW50KHJlcS5ib2R5LnJlc3VtYWJsZVRvdGFsQ2h1bmtzKSldXG5cbiAgY29uc3QgY29tcGxldGVkID0gY2h1bmtBcnJheS5yZWR1Y2UoKGNvbXBsZXRlZCwgY2h1bmssIGluZGV4KSA9PiB7XG5cbiAgICByZXR1cm4gY29tcGxldGVkID8gXy5pbmNsdWRlcyhjaHVua3MsIF9nZXRDaHVua0ZpbGVuYW1lKGlkZW50aWZpZXIsIGluZGV4ICsgMSkpIDogZmFsc2VcblxuICB9LCB0cnVlKVxuXG4gIGlmKCFjb21wbGV0ZWQpIHJldHVybiAncGFydGx5X2RvbmUnXG5cbiAgY29uc3QgZGF0YSA9IHtcbiAgICB0ZWFtX2lkOiByZXEudGVhbS5nZXQoJ2lkJyksXG4gICAgdXNlcl9pZDogcmVxLnVzZXIuZ2V0KCdpZCcpLFxuICAgIHNvdXJjZV9pZDogMSxcbiAgICBvcmlnaW5hbF9maWxlX25hbWU6IHJlcS5ib2R5LnJlc3VtYWJsZUZpbGVuYW1lLFxuICAgIGZpbGVfbmFtZTogX2dldE5vcm1hbGl6ZWRGaWxlTmFtZShyZXEuYm9keS5yZXN1bWFibGVGaWxlbmFtZSksXG4gICAgY29udGVudF90eXBlOiByZXEuYm9keS5yZXN1bWFibGVUeXBlLFxuICAgIGZpbGVfc2l6ZTogcmVxLmJvZHkucmVzdW1hYmxlVG90YWxTaXplLFxuICAgIGNodW5rc190b3RhbDogcmVxLmJvZHkucmVzdW1hYmxlVG90YWxDaHVua3MsXG4gICAgc3RhdHVzX2lkOiAxXG4gIH1cblxuICBjb25zdCBhc3NldCA9IGF3YWl0IEFzc2V0LmZvcmdlKGRhdGEpLnNhdmUobnVsbCwgeyB0cmFuc2FjdGluZzogdHJ4IH0pXG5cbiAgaWYoIWFzc2V0KSB7XG4gICAgdGhyb3cgbmV3IEJhY2tmcmFtZUVycm9yKHtcbiAgICAgIGNvZGU6IDUwMCxcbiAgICAgIG1lc3NhZ2U6ICdVbmFibGUgdG8gY3JlYXRlIGFzc2V0J1xuICAgIH0pXG4gIH1cblxuICBhd2FpdCBBc3NlbWJsZUFzc2V0UXVldWUuZW5xdWV1ZShyZXEsIHRyeCwgYXNzZXQuZ2V0KCdpZCcpKVxuXG4gIHJldHVybiBhd2FpdCBBc3NldFNlcmlhbGl6ZXIocmVxLCB0cngsIGFzc2V0KVxuXG59XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVBc3NldEZyb21VcmwgPSBhc3luYyAocmVxLCB0cngsIHVybCwgdGVhbV9pZCwgdXNlcl9pZCkgPT4ge1xuXG4gIGNvbnN0IGhlYWQgPSBhd2FpdCByZXF1ZXN0LmhlYWQodXJsKS5wcm9taXNlKClcblxuICBjb25zdCBmaWxlX2RhdGEgPSBhd2FpdCByZXF1ZXN0LmdldCh7IHVybCwgZW5jb2Rpbmc6IG51bGwgfSkucHJvbWlzZSgpXG5cbiAgY29uc3QgcGFyc2VkID0gVXJsLnBhcnNlKHVybClcblxuICBjb25zdCBzb3VyY2UgPSBhd2FpdCBTb3VyY2Uud2hlcmUoeyB0ZXh0OiAnd2ViJyB9KS5mZXRjaCh7IHRyYW5zYWN0aW5nOiB0cnggfSlcblxuICBjb25zdCBhc3NldCA9IGF3YWl0IGNyZWF0ZUFzc2V0KHtcbiAgICB0ZWFtX2lkOiAocmVxLnRlYW0pID8gcmVxLnRlYW0uZ2V0KCdpZCcpIDogdGVhbV9pZCxcbiAgICB1c2VyX2lkOiAocmVxLnRlYW0pID8gcmVxLnVzZXIuZ2V0KCdpZCcpIDogdXNlcl9pZCxcbiAgICBzb3VyY2VfaWQ6IHNvdXJjZS5nZXQoJ2lkJyksXG4gICAgZmlsZV9uYW1lOiBwYXRoLmJhc2VuYW1lKHBhcnNlZC5wYXRobmFtZSksXG4gICAgZmlsZV9kYXRhLFxuICAgIGNvbnRlbnRfdHlwZTogaGVhZFsnY29udGVudC10eXBlJ11cbiAgfSwgdHJ4KVxuXG4gIHJldHVybiBhc3NldFxuXG59XG5cbmV4cG9ydCBjb25zdCBhc3NlbWJsZUFzc2V0ID0gYXN5bmMgKGlkLCB0cngpID0+IHtcblxuICBjb25zdCBhc3NldCA9IGF3YWl0IEFzc2V0LndoZXJlKHsgaWQgfSkuZmV0Y2goeyB0cmFuc2FjdGluZzogdHJ4IH0pXG5cbiAgaWYoIWFzc2V0KSB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBmaW5kIGFzc2V0JyApXG5cbiAgY29uc3QgZmlsZURhdGEgPSBhd2FpdCBfZ2V0QXNzZW1ibGVkRGF0YShhc3NldClcblxuICBjb25zdCBub3JtYWxpemVkRGF0YSA9IGF3YWl0IF9nZXROb3JtYWxpemVkRGF0YShhc3NldCwgZmlsZURhdGEpXG5cbiAgYXdhaXQgX3NhdmVGaWxlKG5vcm1hbGl6ZWREYXRhLCBgYXNzZXRzLyR7YXNzZXQuZ2V0KCdpZCcpfS8ke2Fzc2V0LmdldCgnZmlsZV9uYW1lJyl9YCwgYXNzZXQuZ2V0KCdjb250ZW50X3R5cGUnKSlcblxuICBhd2FpdCBfZGVsZXRlQ2h1bmtzKGFzc2V0KVxuXG4gIGNvbnN0IHN0YXR1c19pZCA9IGFzc2V0LmdldCgnaGFzX3ByZXZpZXcnKSA/IDIgOiAzXG5cbiAgYXdhaXQgYXNzZXQuc2F2ZSh7IHN0YXR1c19pZCB9LCB7IHRyYW5zYWN0aW5nOiB0cnggfSlcblxuICBpZihhc3NldC5nZXQoJ2hhc19wcmV2aWV3JykpIGF3YWl0IFByb2Nlc3NBc3NldFF1ZXVlLmVucXVldWUobnVsbCwgdHJ4LCBhc3NldC5nZXQoJ2lkJykpXG5cbiAgYXdhaXQgc29ja2V0LmluKGAvYWRtaW4vYXNzZXRzLyR7YXNzZXQuZ2V0KCdpZCcpfWApLmVtaXQoJ21lc3NhZ2UnLCB7XG4gICAgdGFyZ2V0OiBgL2FkbWluL2Fzc2V0cy8ke2Fzc2V0LmdldCgnaWQnKX1gLFxuICAgIGFjdGlvbjogJ3JlZnJlc2gnLFxuICAgIGRhdGE6IEFzc2V0U2VyaWFsaXplcihudWxsLCBudWxsLCBhc3NldClcbiAgfSlcblxufVxuXG5leHBvcnQgY29uc3QgcHJvY2Vzc0Fzc2V0ID0gYXN5bmMgKGlkLCB0cngpID0+IHtcblxuICBjb25zdCBhc3NldCA9IGF3YWl0IEFzc2V0LndoZXJlKHsgaWQgfSkuZmV0Y2goeyB0cmFuc2FjdGluZzogdHJ4IH0pXG5cbiAgaWYoIWFzc2V0KSB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBmaW5kIGFzc2V0JyApXG5cbiAgY29uc3QgZmlsZURhdGEgPSBhd2FpdCBnZXRBc3NldERhdGEoYXNzZXQpXG5cbiAgY29uc3QgcHJldmlld0RhdGEgPSBhd2FpdCBfZ2V0UHJldmlld0RhdGEoYXNzZXQsIGZpbGVEYXRhLCAnanBnJylcblxuICBhd2FpdCBfc2F2ZUZpbGUocHJldmlld0RhdGEsIGBhc3NldHMvJHthc3NldC5nZXQoJ2lkJyl9L3ByZXZpZXcuanBnYCwgJ2ltYWdlL2pwZWcnKVxuXG4gIGF3YWl0IGFzc2V0LnNhdmUoeyBzdGF0dXNfaWQ6IDMgfSwgeyB0cmFuc2FjdGluZzogdHJ4IH0pXG5cbiAgYXdhaXQgc29ja2V0LmluKGAvYWRtaW4vYXNzZXRzLyR7YXNzZXQuZ2V0KCdpZCcpfWApLmVtaXQoJ21lc3NhZ2UnLCB7XG4gICAgdGFyZ2V0OiBgL2FkbWluL2Fzc2V0cy8ke2Fzc2V0LmdldCgnaWQnKX1gLFxuICAgIGFjdGlvbjogJ3JlZnJlc2gnLFxuICAgIGRhdGE6IEFzc2V0U2VyaWFsaXplcihudWxsLCBudWxsLCBhc3NldClcbiAgfSlcblxufVxuXG5leHBvcnQgY29uc3QgZ2V0QXNzZXQgPSBhc3luYyAoaWQsIHRyeCkgPT4ge1xuXG4gIGNvbnN0IGFzc2V0ID0gYXdhaXQgQXNzZXQud2hlcmUoeyBpZCB9KS5mZXRjaCh7IHRyYW5zYWN0aW5nOiB0cnggfSlcblxuICBpZighYXNzZXQpIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGZpbmQgYXNzZXQnIClcblxuICByZXR1cm4gYXdhaXQgZ2V0QXNzZXREYXRhKGFzc2V0KVxuXG59XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVBc3NldCA9IGFzeW5jIChtZXRhLCB0cngpID0+IHtcblxuICBjb25zdCBmaWxlX3NpemUgPSBtZXRhLmZpbGVfc2l6ZSB8fCBfZ2V0RmlsZXNpemUobWV0YS5maWxlX2RhdGEpXG5cbiAgY29uc3QgY29udGVudF90eXBlID0gbWV0YS5jb250ZW50X3R5cGUgfHwgX2dldENvbnRlbnRUeXBlKG1ldGEuZmlsZV9uYW1lKVxuXG4gIGNvbnN0IGRhdGEgPSB7XG4gICAgdGVhbV9pZDogbWV0YS50ZWFtX2lkLFxuICAgIHVzZXJfaWQ6IG1ldGEudXNlcl9pZCxcbiAgICBzb3VyY2VfaWQ6IG1ldGEuc291cmNlX2lkLFxuICAgIHNvdXJjZV9pZGVudGlmaWVyOiBtZXRhLnNvdXJjZV9pZGVudGlmaWVyLFxuICAgIHNvdXJjZV91cmw6IG1ldGEuc291cmNlX3VybCxcbiAgICBvcmlnaW5hbF9maWxlX25hbWU6IG1ldGEuZmlsZV9uYW1lLFxuICAgIGZpbGVfbmFtZTogX2dldE5vcm1hbGl6ZWRGaWxlTmFtZShtZXRhLmZpbGVfbmFtZSksXG4gICAgY29udGVudF90eXBlLFxuICAgIGZpbGVfc2l6ZSxcbiAgICBjaHVua3NfdG90YWw6IDEsXG4gICAgc3RhdHVzX2lkOiAyXG4gIH1cblxuICBjb25zdCBhc3NldCA9IGF3YWl0IEFzc2V0LmZvcmdlKGRhdGEpLnNhdmUobnVsbCwgeyB0cmFuc2FjdGluZzogdHJ4IH0pXG5cbiAgY29uc3Qgbm9ybWFsaXplZERhdGEgPSBhd2FpdCBfZ2V0Tm9ybWFsaXplZERhdGEoYXNzZXQsIG1ldGEuZmlsZV9kYXRhKVxuXG4gIGF3YWl0IF9zYXZlRmlsZShub3JtYWxpemVkRGF0YSwgYGFzc2V0cy8ke2Fzc2V0LmdldCgnaWQnKX0vJHthc3NldC5nZXQoJ2ZpbGVfbmFtZScpfWAsIGFzc2V0LmdldCgnY29udGVudF90eXBlJykpXG5cbiAgaWYoIWFzc2V0LmdldCgnaXNfaW1hZ2UnKSkge1xuXG4gICAgY29uc3QgcHJldmlld0RhdGEgPSBhd2FpdCBfZ2V0UHJldmlld0RhdGEoYXNzZXQsIG5vcm1hbGl6ZWREYXRhLCAnanBnJylcblxuICAgIGF3YWl0IF9zYXZlRmlsZShwcmV2aWV3RGF0YSwgYGFzc2V0cy8ke2Fzc2V0LmdldCgnaWQnKX0vcHJldmlldy5qcGdgLCAnaW1hZ2UvanBlZycpXG5cbiAgfVxuXG4gIGF3YWl0IGFzc2V0LnNhdmUoeyBzdGF0dXNfaWQ6IDMgfSwgeyB0cmFuc2FjdGluZzogdHJ4IH0pXG5cbiAgcmV0dXJuIGFzc2V0XG5cbn1cblxuZXhwb3J0IGNvbnN0IGRlbGV0ZUFzc2V0ID0gYXN5bmMgKGFzc2V0LCB0cngpID0+IHtcblxuICBjb25zdCBmaWxlcyA9IFtgYXNzZXRzLyR7YXNzZXQuZ2V0KCdpZCcpfS8ke2Fzc2V0LmdldCgnZmlsZV9uYW1lJyl9YF1cblxuICBpZihhc3NldC5nZXQoJ2hhc19wcmV2aWV3JykpIGZpbGVzLnB1c2goYGFzc2V0cy8ke2Fzc2V0LmdldCgnaWQnKX0vcHJldmlldy5qcGdgKVxuXG4gIGF3YWl0IF9kZWxldGVGaWxlcyhmaWxlcylcblxuICBhd2FpdCBhc3NldC5kZXN0cm95KHsgdHJhbnNhY3Rpbmc6IHRyeCB9KVxuXG59XG5cbmNvbnN0IF9nZXRDb250ZW50VHlwZSA9IChmaWxlX25hbWUpID0+IHtcblxuICByZXR1cm4gbWltZS5sb29rdXAoZmlsZV9uYW1lKVxufVxuXG5jb25zdCBfZ2V0RmlsZXNpemUgPSAoZmlsZURhdGEpID0+IHtcblxuICBjb25zdCByYW5kb20gPSBfLnJhbmRvbSgxMDAwMDAwMDAsIDk5OTk5OTk5OSkudG9TdHJpbmcoMzYpXG5cbiAgY29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4oJ3RtcCcsIHJhbmRvbSlcblxuICBmcy53cml0ZUZpbGVTeW5jKGZpbGVQYXRoLCBmaWxlRGF0YSlcblxuICBjb25zdCBmaWxlU3RhdHMgPSBmcy5zdGF0U3luYyhmaWxlUGF0aClcblxuICBmcy51bmxpbmtTeW5jKGZpbGVQYXRoKVxuXG4gIHJldHVybiBmaWxlU3RhdHMuc2l6ZVxuXG59XG5cbmV4cG9ydCBjb25zdCBfZ2V0Tm9ybWFsaXplZEZpbGVOYW1lID0gKGZpbGVuYW1lKSA9PiB7XG5cbiAgY29uc3QgbWF0Y2hlcyA9IGZpbGVuYW1lLnRvTG93ZXJDYXNlKCkubWF0Y2goL14oLiopXFwuKFteP10qKVxcPz8oLiopJC8pXG5cbiAgY29uc3QgYmFzZW5hbWUgPSBtYXRjaGVzID8gbWF0Y2hlc1sxXSA6IGZpbGVuYW1lLnRvTG93ZXJDYXNlKClcblxuICBjb25zdCBleHRlbnNpb24gPSBtYXRjaGVzID8gbWF0Y2hlc1syXSA6IG51bGxcblxuICBjb25zdCByZXdyaXR0ZW4gPSBiYXNlbmFtZS5yZXBsYWNlKC9bXjAtOWEtekEtWi1cXHNfLl0vaW1nLCAnJykucmVwbGFjZSgvW1xcV19dL2ltZywgJy0nKS5yZXBsYWNlKC8tezIsfS9nLCAnLScpXG5cbiAgcmV0dXJuIHJld3JpdHRlbiArIChleHRlbnNpb24gPyBgLiR7ZXh0ZW5zaW9ufWAgOiAnJylcblxufVxuXG5jb25zdCBfY2h1bmtFeGlzdHMgPSBhc3luYyAoZmlsZXBhdGgpID0+IHtcblxuICBjb25zdCBjaHVua3MgPSBhd2FpdCBfbGlzdENodW5rcygpXG5cbiAgcmV0dXJuIF8uaW5jbHVkZXMoY2h1bmtzLCBmaWxlcGF0aClcblxufVxuXG5jb25zdCBfYnVmZmVyVG9TdHJlYW0gPSAoYnVmZmVyKSA9PiB7XG5cbiAgbGV0IHN0cmVhbSA9IG5ldyBEdXBsZXgoKVxuXG4gIHN0cmVhbS5wdXNoKGJ1ZmZlcilcblxuICBzdHJlYW0ucHVzaChudWxsKVxuXG4gIHJldHVybiBzdHJlYW1cblxufVxuXG5leHBvcnQgY29uc3QgZ2V0QXNzZXREYXRhID0gYXN5bmMgKGFzc2V0LCBmb3JtYXQgPSAnYnVmZmVyJykgPT4ge1xuXG4gIGNvbnN0IEtleSA9IGBhc3NldHMvJHthc3NldC5nZXQoJ2lkJyl9LyR7YXNzZXQuZ2V0KCdmaWxlX25hbWUnKX1gXG5cbiAgbGV0IGRhdGEgPSBudWxsXG5cbiAgaWYocHJvY2Vzcy5lbnYuQVNTRVRfU1RPUkFHRSA9PT0gJ3MzJykge1xuXG4gICAgY29uc3QgczMgPSBfZ2V0UzMoKVxuXG4gICAgY29uc3QgZmlsZSA9IGF3YWl0IHMzLmdldE9iamVjdCh7XG4gICAgICBCdWNrZXQ6IHByb2Nlc3MuZW52LkFXU19CVUNLRVQsXG4gICAgICBLZXlcbiAgICB9KS5wcm9taXNlKClcblxuICAgIGRhdGEgPSBmaWxlLkJvZHlcblxuICB9IGVsc2UgaWYocHJvY2Vzcy5lbnYuQVNTRVRfU1RPUkFHRSA9PT0gJ2xvY2FsJykge1xuXG4gICAgZGF0YSA9IGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oJ3B1YmxpYycsIEtleSkpXG5cbiAgfVxuXG4gIGlmKGZvcm1hdCA9PT0gJ3N0cmVhbScpIHJldHVybiBfYnVmZmVyVG9TdHJlYW0oZGF0YSlcblxuICBpZihmb3JtYXQgPT09ICdzdHJpbmcnKSByZXR1cm4gZGF0YS50b1N0cmluZygndXRmLTgnKVxuXG4gIHJldHVybiBkYXRhXG5cbn1cblxuY29uc3QgX2dldENodW5rcyA9IGFzeW5jIChhc3NldCkgPT4ge1xuXG4gIGNvbnN0IHRvdGFsQ2h1bmtzID0gcGFyc2VJbnQoYXNzZXQuZ2V0KCdjaHVua3NfdG90YWwnKSlcblxuICBjb25zdCBjaHVua0FycmF5ID0gWy4uLkFycmF5KHBhcnNlSW50KHRvdGFsQ2h1bmtzKSldXG5cbiAgY29uc3QgY2h1bmtzID0gYXdhaXQgUHJvbWlzZS5tYXBTZXJpZXMoY2h1bmtBcnJheSwgYXN5bmMgKGl0ZW0sIGluZGV4KSA9PiB7XG5cbiAgICBjb25zdCBLZXkgPSBgdG1wLyR7YXNzZXQuZ2V0KCdpZGVudGlmaWVyJyl9LiR7aW5kZXggKyAxfWBcblxuICAgIGlmKHByb2Nlc3MuZW52LkFTU0VUX1NUT1JBR0UgPT09ICdzMycpIHtcblxuICAgICAgY29uc3QgczMgPSBfZ2V0UzMoKVxuXG4gICAgICBjb25zdCBjaHVuayA9IGF3YWl0IHMzLmdldE9iamVjdCh7XG4gICAgICAgIEJ1Y2tldDogcHJvY2Vzcy5lbnYuQVdTX0JVQ0tFVCxcbiAgICAgICAgS2V5XG4gICAgICB9KS5wcm9taXNlKClcblxuICAgICAgcmV0dXJuIGNodW5rLkJvZHlcblxuICAgIH0gZWxzZSBpZihwcm9jZXNzLmVudi5BU1NFVF9TVE9SQUdFID09PSAnbG9jYWwnKSB7XG5cbiAgICAgIHJldHVybiBmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKCdwdWJsaWMnLCBLZXkpKVxuXG4gICAgfVxuXG4gIH0pXG5cbiAgcmV0dXJuIGNodW5rc1xuXG5cbn1cblxuY29uc3QgX2xpc3RDaHVua3MgPSBhc3luYyAoKSA9PiB7XG5cbiAgaWYocHJvY2Vzcy5lbnYuQVNTRVRfU1RPUkFHRSA9PT0gJ3MzJykge1xuXG4gICAgY29uc3QgczMgPSBfZ2V0UzMoKVxuXG4gICAgY29uc3QgcGFydHMgPSBhd2FpdCBzMy5saXN0T2JqZWN0cyh7XG4gICAgICBCdWNrZXQ6IHByb2Nlc3MuZW52LkFXU19CVUNLRVQsXG4gICAgICBQcmVmaXg6ICd0bXAnXG4gICAgfSkucHJvbWlzZSgpXG5cbiAgICByZXR1cm4gcGFydHMuQ29udGVudHMubWFwKGZpbGUgPT4gZmlsZS5LZXkpXG5cbiAgfSBlbHNlIGlmKHByb2Nlc3MuZW52LkFTU0VUX1NUT1JBR0UgPT09ICdsb2NhbCcpIHtcblxuICAgIHJldHVybiBmcy5yZWFkZGlyU3luYyhwYXRoLmpvaW4oJ3B1YmxpYycsICd0bXAnKSkubWFwKGZpbGUgPT4gYHRtcC8ke2ZpbGV9YClcblxuICB9XG5cbn1cblxuY29uc3QgX3NhdmVGaWxlID0gYXN5bmMgKGZpbGVkYXRhLCBmaWxlcGF0aCwgY29udGVudF90eXBlKSA9PiB7XG5cbiAgaWYocHJvY2Vzcy5lbnYuQVNTRVRfU1RPUkFHRSA9PT0gJ3MzJykge1xuXG4gICAgY29uc3QgczMgPSBfZ2V0UzMoKVxuXG4gICAgYXdhaXQgczMudXBsb2FkKHtcbiAgICAgIEFDTDogJ3B1YmxpYy1yZWFkJyxcbiAgICAgIEJvZHk6IGZpbGVkYXRhLFxuICAgICAgQnVja2V0OiBwcm9jZXNzLmVudi5BV1NfQlVDS0VULFxuICAgICAgQ29udGVudFR5cGU6IGNvbnRlbnRfdHlwZSxcbiAgICAgIEtleTogZmlsZXBhdGhcbiAgICB9KS5wcm9taXNlKClcblxuICB9IGVsc2UgaWYocHJvY2Vzcy5lbnYuQVNTRVRfU1RPUkFHRSA9PT0gJ2xvY2FsJykge1xuXG4gICAgY29uc3QgYXNzZXRwYXRoID0gcGF0aC5qb2luKCdwdWJsaWMnLCAuLi5maWxlcGF0aC5zcGxpdCgnLycpLnNsaWNlKDAsLTEpKVxuXG4gICAgY29uc3QgYXNzZXRuYW1lID0gZmlsZXBhdGguc3BsaXQoJy8nKS5wb3AoKVxuXG4gICAgbWtkaXJwLnN5bmMoYXNzZXRwYXRoKVxuXG4gICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4oYXNzZXRwYXRoLCBhc3NldG5hbWUpLCBmaWxlZGF0YSlcblxuICB9XG5cbn1cblxuY29uc3QgX2RlbGV0ZUZpbGVzID0gYXN5bmMgKGZpbGVzKSA9PiB7XG5cbiAgaWYocHJvY2Vzcy5lbnYuQVNTRVRfU1RPUkFHRSA9PT0gJ3MzJykge1xuXG4gICAgY29uc3QgczMgPSBfZ2V0UzMoKVxuXG4gICAgYXdhaXQgczMuZGVsZXRlT2JqZWN0cyh7XG4gICAgICBCdWNrZXQ6IHByb2Nlc3MuZW52LkFXU19CVUNLRVQsXG4gICAgICBEZWxldGU6IHtcbiAgICAgICAgT2JqZWN0czogZmlsZXMubWFwKEtleSA9PiAoeyBLZXkgfSkpXG4gICAgICB9XG4gICAgfSkucHJvbWlzZSgpXG5cbiAgfSBlbHNlIGlmKHByb2Nlc3MuZW52LkFTU0VUX1NUT1JBR0UgPT09ICdsb2NhbCcpIHtcblxuICAgIGZpbGVzLm1hcChLZXkgPT4ge1xuXG4gICAgICBmcy51bmxpbmtTeW5jKHBhdGguam9pbigncHVibGljJywgS2V5KSlcblxuICAgIH0pXG5cbiAgfVxuXG59XG5cbmNvbnN0IF9kZWxldGVDaHVua3MgPSBhc3luYyAoYXNzZXQpID0+IHtcblxuICBjb25zdCB0b3RhbENodW5rcyA9IHBhcnNlSW50KGFzc2V0LmdldCgnY2h1bmtzX3RvdGFsJykpXG5cbiAgY29uc3QgY2h1bmtBcnJheSA9IFsuLi5BcnJheShwYXJzZUludCh0b3RhbENodW5rcykpXVxuXG4gIGNvbnN0IGZpbGVwYXRocyA9IGNodW5rQXJyYXkubWFwKChpLCBpbmRleCkgPT4ge1xuXG4gICAgcmV0dXJuIF9nZXRDaHVua0ZpbGVuYW1lKGFzc2V0LmdldCgnaWRlbnRpZmllcicpLCBpbmRleCArIDEpXG5cbiAgfSlcblxuICBpZihwcm9jZXNzLmVudi5BU1NFVF9TVE9SQUdFID09PSAnczMnKSB7XG5cbiAgICBhd2FpdCBzMy5kZWxldGVPYmplY3RzKHtcbiAgICAgIEJ1Y2tldDogcHJvY2Vzcy5lbnYuQVdTX0JVQ0tFVCxcbiAgICAgIERlbGV0ZToge1xuICAgICAgICBPYmplY3RzOiBmaWxlcGF0aHMubWFwKEtleSA9PiAoeyBLZXkgfSkpXG4gICAgICB9XG4gICAgfSkucHJvbWlzZSgpXG5cbiAgfSBlbHNlIGlmKHByb2Nlc3MuZW52LkFTU0VUX1NUT1JBR0UgPT09ICdsb2NhbCcpIHtcblxuICAgIFByb21pc2UubWFwU2VyaWVzKGZpbGVwYXRocywgKGZpbGVwYXRoLCBpbmRleCkgPT4ge1xuXG4gICAgICBmcy51bmxpbmtTeW5jKHBhdGguam9pbigncHVibGljJywgZmlsZXBhdGgpKVxuXG4gICAgfSlcblxuICB9XG5cbn1cblxuY29uc3QgX2dldEFzc2VtYmxlZERhdGEgPSBhc3luYyAoYXNzZXQpID0+IHtcblxuICBjb25zdCBjaHVua3MgPSBhd2FpdCBfZ2V0Q2h1bmtzKGFzc2V0KVxuXG4gIHJldHVybiBCdWZmZXIuY29uY2F0KGNodW5rcylcblxufVxuXG5jb25zdCBfZ2V0Tm9ybWFsaXplZERhdGEgPSBhc3luYyAoYXNzZXQsIGZpbGVEYXRhKSA9PiB7XG5cbiAgY29uc3QgY29udGVudF90eXBlID0gYXNzZXQuZ2V0KCdjb250ZW50X3R5cGUnKVxuXG4gIGNvbnN0IGlzSW1hZ2UgPSBjb250ZW50X3R5cGUubWF0Y2goL2ltYWdlLykgJiYgY29udGVudF90eXBlICE9PSAnaW1hZ2UvZ2lmJ1xuXG4gIHJldHVybiBpc0ltYWdlID8gYXdhaXQgX3JvdGF0ZUltYWdlKGZpbGVEYXRhKSA6IGZpbGVEYXRhXG5cbn1cblxuY29uc3QgX2dldFByZXZpZXdEYXRhID0gYXN5bmMgKGFzc2V0LCBmaWxlRGF0YSwgZXh0KSA9PiB7XG5cbiAgaWYoYXNzZXQuZ2V0KCdleHRlbnNpb24nKSA9PT0gJ3hsc3gnKSB7XG5cbiAgICBjb25zdCBwZGZEYXRhID0gYXdhaXQgX2NvbnZlcnRPZmZpY2VGb3JtYXQoZmlsZURhdGEsICdwZGYnKVxuXG4gICAgcmV0dXJuIGF3YWl0IF9jb252ZXJ0T2ZmaWNlRm9ybWF0KHBkZkRhdGEsICdqcGcnKVxuXG4gIH1cblxuICBpZihhc3NldC5nZXQoJ2NvbnRlbnRfdHlwZScpID09PSAnbWVzc2FnZS9yZmM4MjInKSB7XG5cbiAgICBjb25zdCBlbWFpbCA9IGF3YWl0IHNpbXBsZVBhcnNlcihmaWxlRGF0YSlcblxuICAgIGNvbnN0IGVtYWlsRGF0YSA9IGVtYWlsLmh0bWwgfHwgZW1haWwudGV4dEFzSHRtbFxuXG4gICAgcmV0dXJuIF9jb252ZXJ0SHRtbChlbWFpbERhdGEpXG5cbiAgfVxuXG4gIGlmKGFzc2V0LmdldCgnY29udGVudF90eXBlJykgPT09ICd0ZXh0L2h0bWwnKSB7XG5cbiAgICByZXR1cm4gX2NvbnZlcnRIdG1sKGZpbGVEYXRhKVxuXG4gIH1cblxuICByZXR1cm4gYXdhaXQgX2NvbnZlcnRPZmZpY2VGb3JtYXQoZmlsZURhdGEsICdqcGcnKVxuXG59XG5cbmNvbnN0IF9jb252ZXJ0T2ZmaWNlRm9ybWF0ID0gYXN5bmMgKGZpbGVkYXRhLCBmb3JtYXQpID0+IHtcblxuICBjb25zdCByYW5kb20gPSBfLnJhbmRvbSgxMDAwMDAwMDAsIDk5OTk5OTk5OSkudG9TdHJpbmcoMzYpXG5cbiAgY29uc3Qgb3V0RGlyID0gcGF0aC5qb2luKCcuJywgJ3RtcCcpXG5cbiAgY29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4ob3V0RGlyLCByYW5kb20pXG5cbiAgY29uc3QgcHJldmlld1BhdGggPSBwYXRoLmpvaW4ob3V0RGlyLCBgJHtyYW5kb219LnByZXZpZXcuJHtmb3JtYXR9YClcblxuICBmcy53cml0ZUZpbGVTeW5jKGZpbGVQYXRoLCBmaWxlZGF0YSlcblxuICBhd2FpdCBleGVjQXN5bmMoYHNvZmZpY2UgLS1jb252ZXJ0LXRvIHByZXZpZXcuJHtmb3JtYXR9IC0tb3V0ZGlyICR7b3V0RGlyfSAke2ZpbGVQYXRofWApXG5cbiAgY29uc3QgcHJldmlld0RhdGEgPSBuZXcgQnVmZmVyKGZzLnJlYWRGaWxlU3luYyhwcmV2aWV3UGF0aCksICdiaW5hcnknKVxuXG4gIGZzLnVubGlua1N5bmMoZmlsZVBhdGgpXG5cbiAgZnMudW5saW5rU3luYyhwcmV2aWV3UGF0aClcblxuICByZXR1cm4gcHJldmlld0RhdGFcblxufVxuXG5jb25zdCBfY29udmVydEh0bWwgPSBhc3luYyAoaHRtbCkgPT4ge1xuXG4gIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgc2l0ZVR5cGU6J2h0bWwnLFxuICAgICAgc3RyZWFtVHlwZTogJ2pwZycsXG4gICAgICBkZWZhdWx0V2hpdGVCYWNrZ3JvdW5kOiB0cnVlLFxuICAgICAgc2hvdFNpemU6IHtcbiAgICAgICAgd2lkdGg6ICd3aW5kb3cnLFxuICAgICAgICBoZWlnaHQ6ICdhbGwnXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgd3MgPSB3ZWJzaG90KGh0bWwsIG9wdGlvbnMpXG5cbiAgICBjb25zdCBidWZmZXIgPSBbXVxuXG4gICAgd3Mub24oJ2RhdGEnLCBkYXRhID0+IGJ1ZmZlci5wdXNoKGRhdGEpKVxuXG4gICAgd3Mub24oJ2Vycm9yJywgZXJyID0+IHJlamVjdChuZXcgRXJyb3IoZXJyKSkpXG5cbiAgICB3cy5vbignZW5kJywgKCkgPT4gcmVzb2x2ZShCdWZmZXIuY29uY2F0KGJ1ZmZlcikpKVxuXG4gIH0pXG5cbn1cblxuY29uc3QgX3VubGlua0NodW5rID0gYXN5bmMgKGZpbGVwYXRoKSA9PiB7XG5cbiAgZnMudW5saW5rU3luYyhmaWxlcGF0aClcblxufVxuXG5jb25zdCBfcm90YXRlSW1hZ2UgPSBhc3luYyAoZGF0YSkgPT4ge1xuXG4gIGNvbnN0IGltYWdlID0gYXdhaXQgSmltcC5yZWFkKGRhdGEpXG5cbiAgaWYoIWltYWdlKSByZXR1cm4gZGF0YVxuXG4gIGltYWdlLmV4aWZSb3RhdGUoKVxuXG4gIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICBpbWFnZS5nZXRCdWZmZXIoaW1hZ2UuZ2V0TUlNRSgpLCAoZXJyLCBidWZmZXIpID0+IHtcblxuICAgICAgaWYoZXJyKSByZWplY3QobmV3IEVycm9yKGVycikpXG5cbiAgICAgIHJlc29sdmUoYnVmZmVyKVxuXG4gICAgfSlcblxuICB9KVxuXG59XG5cbmxldCBzMyA9IG51bGxcblxuY29uc3QgX2dldFMzID0gKCkgPT4ge1xuXG4gIGlmKHMzKSByZXR1cm4gczNcblxuICBzMyA9IG5ldyBhd3MuUzMoKVxuXG4gIHJldHVybiBzM1xuXG59XG5cbmNvbnN0IF9jbGVhbklkZW50aWZpZXIgPSBpZGVudGlmaWVyID0+IHtcbiAgcmV0dXJuIGlkZW50aWZpZXIucmVwbGFjZSgvXjAtOUEtWmEtel8tL2ltZywgJycpXG59XG5cbmNvbnN0IF9nZXRDaHVua0ZpbGVuYW1lID0gKGlkZW50aWZpZXIsIGNodW5rTnVtYmVyLCApID0+IHtcbiAgcmV0dXJuIHBhdGguam9pbignLicsICd0bXAnLCBfY2xlYW5JZGVudGlmaWVyKGlkZW50aWZpZXIpKycuJytjaHVua051bWJlcilcbn1cbiIsImltcG9ydCBBdHRhY2htZW50IGZyb20gJy4uL21vZGVscy9hdHRhY2htZW50J1xuaW1wb3J0IFNlcnZpY2UgZnJvbSAnLi4vbW9kZWxzL3NlcnZpY2UnXG5pbXBvcnQgZ2V0VXJscyBmcm9tICdnZXQtdXJscydcbmltcG9ydCBjaGVlcmlvIGZyb20gJ2NoZWVyaW8nXG5pbXBvcnQgcmVxdWVzdCBmcm9tICdyZXF1ZXN0J1xuaW1wb3J0IG9nIGZyb20gJ29wZW4tZ3JhcGgnXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgVXJsIGZyb20gJ3VybCdcbmltcG9ydCBvcyBmcm9tICdvcydcblxuY29uc3QgaWZhY2VzID0gb3MubmV0d29ya0ludGVyZmFjZXMoKVxuXG5jb25zdCBkb21haW5zID0gW1xuICAnbG9jYWxob3N0JyxcbiAgJ2Rldi5tYWhhcGxhdGZvcm0uY29tJyxcbiAgcHJvY2Vzcy5lbnYuRE9NQUlOLFxuICAuLi4hXy5pc0VtcHR5KHByb2Nlc3MuZW52LkRBVEFfQVNTRVRfSE9TVCkgPyBbVXJsLnBhcnNlKHByb2Nlc3MuZW52LkRBVEFfQVNTRVRfSE9TVCkuaG9zdG5hbWVdIDogW10sXG4gIC4uLiFfLmlzRW1wdHkocHJvY2Vzcy5lbnYuREFUQV9BU1NFVF9DRE5fSE9TVCkgPyBbVXJsLnBhcnNlKHByb2Nlc3MuZW52LkRBVEFfQVNTRVRfQ0ROX0hPU1QpLmhvc3RuYW1lXSA6IFtdXG5dXG5cbmNvbnN0IGxvY2FsaG9zdHMgPSBPYmplY3Qua2V5cyhpZmFjZXMpLnJlZHVjZSgoaXBzLCBpZmFjZSkgPT4gW1xuICAuLi5pcHMsXG4gIC4uLmlmYWNlc1tpZmFjZV0ubWFwKGFkYXB0ZXIgPT4gYWRhcHRlci5hZGRyZXNzKVxuXSwgZG9tYWlucylcblxuY29uc3QgZG93bmxvYWQgPSBhc3luYyAodXJsKSA9PiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgcmVxdWVzdCh7XG4gICAgdXJsOiB1cmwsXG4gICAgcmVqZWN0VW5hdXRob3JpemVkOiBmYWxzZSxcbiAgICBlbmNvZGluZzogJ3V0ZjgnLFxuICAgIGd6aXA6IHRydWUsXG4gICAgamFyOiB0cnVlXG4gIH0sIChlcnIsIHJlcywgYm9keSkgPT4ge1xuXG4gICAgaWYoZXJyKSByZXR1cm4gcmVqZWN0KGVycilcblxuICAgIHJldHVybiByZXNvbHZlKHJlcylcblxuICB9KVxuXG59KVxuXG5jb25zdCBnZXRNZXRhRGF0YSA9IGFzeW5jICh1cmwsIHRyeCkgPT4ge1xuXG4gIGNvbnN0IHVyaSA9IFVybC5wYXJzZSh1cmwpXG5cbiAgaWYoXy5pbmNsdWRlcyhsb2NhbGhvc3RzLCB1cmkuaG9zdG5hbWUpKSByZXR1cm4gcHJvY2Vzc0xvY2FsVXJsKHVybCwgdXJpKVxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZG93bmxvYWQodXJsKVxuXG4gIGlmKHJlc3BvbnNlLnN0YXR1c0NvZGUgIT09IDIwMCkgcmV0dXJuIG51bGxcblxuICBjb25zdCB0eXBlID0gcmVzcG9uc2UuaGVhZGVyc1snY29udGVudC10eXBlJ10uc3BsaXQoJy8nKVswXVxuXG4gIGlmKHR5cGUgPT09ICdpbWFnZScpIHJldHVybiBwcm9jZXNzSW1hZ2VVcmwodXJsLCByZXNwb25zZSlcblxuICByZXR1cm4gcHJvY2Vzc09wZW5HcmFwaFVybCh1cmksIHVybCwgcmVzcG9uc2UsIHRyeClcblxufVxuXG5jb25zdCBwcm9jZXNzTG9jYWxVcmwgPSAodXJsLCB1cmkpID0+IHtcblxuICBjb25zdCBtYXRjaGVzID0gdXJpLnBhdGhuYW1lLm1hdGNoKC9hc3NldHNcXC8oXFxkKilcXC8uKi8pXG5cbiAgaWYobWF0Y2hlcykgcmV0dXJuIHtcbiAgICB0eXBlOiAnYXNzZXQnLFxuICAgIGFzc2V0X2lkOiBtYXRjaGVzWzFdLFxuICAgIHRpdGxlX2xpbms6IHVybFxuICB9XG5cbiAgcmV0dXJuIHByb2Nlc3NMb2NhbFBhdGhuYW1lKHVyaS5wYXRobmFtZSlcblxufVxuXG5jb25zdCBwcm9jZXNzTG9jYWxQYXRobmFtZSA9IChwYXRobmFtZSkgPT4ge1xuXG4gIHJldHVybiB7XG4gICAgdHlwZTogJ2xvY2FsJyxcbiAgICB0aXRsZV9saW5rOiBwYXRobmFtZVxuICB9XG5cbn1cblxuY29uc3QgcHJvY2Vzc0ltYWdlVXJsID0gKHVybCwgcmVzcG9uc2UpID0+ICh7XG4gIHR5cGU6ICdpbWFnZScsXG4gIGltYWdlX3VybDogdXJsXG59KVxuXG5jb25zdCBwcm9jZXNzT3BlbkdyYXBoVXJsID0gYXN5bmMgKHVyaSwgdXJsLCByZXNwb25zZSwgdHJ4KSA9PiB7XG5cbiAgY29uc3QgbWV0YSA9IG9nLnBhcnNlKHJlc3BvbnNlLmJvZHkpXG5cbiAgY29uc3QgJCA9IGNoZWVyaW8ubG9hZChyZXNwb25zZS5ib2R5KVxuXG4gIGNvbnN0IHNlcnZpY2UgPSBhd2FpdCBnZXRTZXJ2aWNlKCQsIHVybCwgdHJ4KVxuXG4gIGlmKE9iamVjdC5rZXlzKG1ldGEpLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2VydmljZV9pZDogc2VydmljZS5nZXQoJ2lkJyksXG4gICAgICB0ZXh0OiBtZXRhLmRlc2NyaXB0aW9uID8gbWV0YS5kZXNjcmlwdGlvbi5zdWJzdHIoMCwgMjU1KSA6ICcnLFxuICAgICAgdGl0bGU6IG1ldGEudGl0bGUsXG4gICAgICB0aXRsZV9saW5rOiBtZXRhLnVybCxcbiAgICAgIHR5cGU6IGdldFR5cGUobWV0YSksXG4gICAgICAuLi5nZXRJbWFnZSh1cmksIG1ldGEuaW1hZ2UpLFxuICAgICAgLi4uZ2V0VmlkZW8odXJpLCBtZXRhLnZpZGVvKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc2VydmljZV9pZDogc2VydmljZS5nZXQoJ2lkJyksXG4gICAgdGV4dDogJCgnbWV0YVtuYW1lPWRlc2NyaXB0aW9uXScpLmF0dHIoJ2NvbnRlbnQnKSB8fCAkKCdtZXRhW25hbWU9RGVzY3JpcHRpb25dJykuYXR0cignY29udGVudCcpIHx8ICcnLFxuICAgIHRpdGxlOiAkKCd0aXRsZScpLmVxKDApLnRleHQoKSxcbiAgICB0aXRsZV9saW5rOiB1cmwsXG4gICAgdHlwZTogJ2xpbmsnXG4gIH1cblxufVxuXG5jb25zdCB1bnBhY2tPZ0FycmF5ID0gKHZhbHVlKSA9PiB7XG5cbiAgaWYoIXZhbHVlKSByZXR1cm4gbnVsbFxuXG4gIGlmKF8uaXNBcnJheSh2YWx1ZSkpIHJldHVybiB2YWx1ZVswXVxuXG4gIHJldHVybiB2YWx1ZVxuXG59XG5cbmNvbnN0IGdldFNlcnZpY2UgPSBhc3luYyAoJCwgdXJsLCB0cngpID0+IHtcblxuICBjb25zdCB1cmkgPSBVcmwucGFyc2UodXJsKVxuXG4gIGNvbnN0IG5hbWUgPSB1cmkuaG9zdG5hbWVcblxuICBjb25zdCBzZXJ2aWNlID0gYXdhaXQgU2VydmljZS53aGVyZSh7IG5hbWUgfSkuZmV0Y2goeyB0cmFuc2FjdGluZzogdHJ4IH0pXG5cbiAgaWYoc2VydmljZSkgcmV0dXJuIHNlcnZpY2VcblxuICBjb25zdCBpY29ucyA9IFtcbiAgICAuLi4kKCdsaW5rW3JlbD1cImljb25cIl0nKS50b0FycmF5KCksXG4gICAgLi4uJCgnbGlua1tyZWw9XCJzaG9ydGN1dCBpY29uXCJdJykudG9BcnJheSgpLFxuICAgIC4uLiQoJ2xpbmtbcmVsPVwiU2hvcnRjdXQgSWNvblwiXScpLnRvQXJyYXkoKSxcbiAgICAuLi4kKCdsaW5rW3JlbD1cImFwcGxlLXRvdWNoLWljb25cIl0nKS50b0FycmF5KCksXG4gICAgLi4uJCgnbGlua1tyZWw9XCJpbWFnZV9zcmNcIl0nKS50b0FycmF5KClcbiAgXS5zb3J0KChhLCBiKSA9PiB7XG4gICAgaWYoYS5hdHRyaWJzLnNpemVzID4gYi5hdHRyaWJzLnNpemVzKSByZXR1cm4gLTFcbiAgICBpZihhLmF0dHJpYnMuc2l6ZXMgPCBiLmF0dHJpYnMuc2l6ZXMpIHJldHVybiAxXG4gICAgcmV0dXJuIDBcbiAgfSlcblxuICBjb25zdCBocmVmID0gaWNvbnMubGVuZ3RoID4gMCA/IGljb25zWzBdLmF0dHJpYnMuaHJlZiA6IG51bGxcblxuICBjb25zdCBpY29uID0gaHJlZiA/IGFic29sdXRlVXJsKHVyaSwgaHJlZikgOiBudWxsXG5cbiAgcmV0dXJuIGF3YWl0IFNlcnZpY2UuZm9yZ2UoeyBuYW1lLCBpY29uIH0pLnNhdmUobnVsbCwgeyB0cmFuc2FjdGluZzogdHJ4IH0pXG5cbn1cblxuY29uc3QgZ2V0VHlwZSA9IChtZXRhKSA9PiB7XG5cbiAgaWYobWV0YS50eXBlLm1hdGNoKC92aWRlby8pKSByZXR1cm4gJ3ZpZGVvJ1xuXG4gIHJldHVybiAnbGluaydcblxufVxuXG5jb25zdCBnZXRJbWFnZSA9ICh1cmksIGltYWdlKSA9PiB7XG5cbiAgaWYoIWltYWdlKSByZXR1cm4ge31cblxuICBjb25zdCBpbWFnZV91cmwgPSBpbWFnZS5zZWN1cmVfdXJsID8gdW5wYWNrT2dBcnJheShpbWFnZS5zZWN1cmVfdXJsKSA6IHVucGFja09nQXJyYXkoaW1hZ2UudXJsKVxuXG4gIHJldHVybiB7XG4gICAgaW1hZ2VfdXJsOiBhYnNvbHV0ZVVybCh1cmksIGltYWdlX3VybCksXG4gICAgaW1hZ2Vfd2lkdGg6IHVucGFja09nQXJyYXkoaW1hZ2Uud2lkdGgpLFxuICAgIGltYWdlX2hlaWdodDogIHVucGFja09nQXJyYXkoaW1hZ2UuaGVpZ2h0KVxuICB9XG5cbn1cblxuY29uc3QgZ2V0VmlkZW8gPSAodXJpLCB2aWRlbykgPT4ge1xuXG4gIGlmKCF2aWRlbykgcmV0dXJuIHt9XG5cbiAgY29uc3QgdmlkZW9fdXJsID0gdmlkZW8uc2VjdXJlX3VybCA/IHVucGFja09nQXJyYXkodmlkZW8uc2VjdXJlX3VybCkgOiB1bnBhY2tPZ0FycmF5KHZpZGVvLnVybClcblxuICByZXR1cm4ge1xuICAgIHZpZGVvX3VybDogYWJzb2x1dGVVcmwodXJpLCB2aWRlb191cmwpLFxuICAgIHZpZGVvX3dpZHRoOiB1bnBhY2tPZ0FycmF5KHZpZGVvLndpZHRoKSxcbiAgICB2aWRlb19oZWlnaHQ6IHVucGFja09nQXJyYXkodmlkZW8uaGVpZ2h0KVxuICB9XG5cbn1cblxuY29uc3QgYWJzb2x1dGVVcmwgPSAodXJpLCB1cmwpID0+IHtcblxuICByZXR1cm4gVXJsLnJlc29sdmUoYCR7dXJpLnByb3RvY29sfS8vJHt1cmkuaG9zdH0vJHt1cmkucGF0aG5hbWV9YCwgdXJsKVxuXG59XG5cbmNvbnN0IGNyZWF0ZUF0dGFjaG1lbnQgPSBhc3luYyAoYXR0YWNoYWJsZSwgaW5kZXgsIHVybCwgdHJ4KSA9PiB7XG5cbiAgY29uc3QgbWV0YSA9IGF3YWl0IGdldE1ldGFEYXRhKHVybCwgdHJ4KVxuXG4gIGlmKCFtZXRhKSByZXR1cm4gbnVsbFxuXG4gIGNvbnN0IGRhdGEgPSB7XG4gICAgdGVhbV9pZDogYXR0YWNoYWJsZS5nZXQoJ3RlYW1faWQnKSxcbiAgICBhdHRhY2hhYmxlX3R5cGU6IGF0dGFjaGFibGUudGFibGVOYW1lLFxuICAgIGF0dGFjaGFibGVfaWQ6IGF0dGFjaGFibGUuZ2V0KCdpZCcpLFxuICAgIGRlbHRhOiBpbmRleCxcbiAgICBmcm9tX3VybDogdXJsLFxuICAgIC4uLm1ldGFcbiAgfVxuXG4gIGF3YWl0IEF0dGFjaG1lbnQuZm9yZ2UoZGF0YSkuc2F2ZShudWxsLCB7IHRyYW5zYWN0aW5nOiB0cnggfSlcblxufVxuXG5leHBvcnQgY29uc3QgZXh0cmFjdEF0dGFjaG1lbnRzID0gYXN5bmMgKGF0dGFjaGFibGUsIHRleHQsIHRyeCkgPT4ge1xuXG4gIGNvbnN0IHVybHMgPSBnZXRVcmxzKHRleHQsIHtcbiAgICBzb3J0UXVlcnlQYXJhbWV0ZXJzOiBmYWxzZSxcbiAgICByZW1vdmVUcmFpbGluZ1NsYXNoOiB0cnVlLFxuICAgIHN0cmlwV1dXOiBmYWxzZSxcbiAgICBzdHJpcEZyYWdtZW50OiBmYWxzZSxcbiAgICBub3JtYWxpemVQcm90b2NvbDogZmFsc2VcbiAgfSlcblxuICBpZih1cmxzLnNpemUgPT09IDApIHJldHVyblxuXG4gIGF3YWl0IFByb21pc2UubWFwU2VyaWVzKHVybHMsIGFzeW5jKHVybCwgaW5kZXgpID0+IHtcblxuICAgIGNvbnN0IG5vcm1hbGl6ZWRVcmwgPSBub3JtYWxpemVVcmwodGV4dCwgdXJsKVxuXG4gICAgYXdhaXQgY3JlYXRlQXR0YWNobWVudChhdHRhY2hhYmxlLCBpbmRleCwgbm9ybWFsaXplZFVybCwgdHJ4KVxuXG4gIH0pXG5cblxufVxuXG5jb25zdCBub3JtYWxpemVVcmwgPSAodGV4dCwgdXJsKSA9PiB7XG5cbiAgbGV0IG5vcm1hbGl6ZWQgPSB1cmwucmVwbGFjZSgnP251bGwnLCAnJylcblxuICBpZih0ZXh0LnNlYXJjaChub3JtYWxpemVkKSA8IDApIHtcbiAgICBub3JtYWxpemVkID0gbm9ybWFsaXplZC5yZXBsYWNlKC9cXC8rJC8sICcnKVxuICB9XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZWRcblxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2FycmF5L2Zyb21cIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ25cIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9wcm9taXNlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfcHJvbWlzZSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL3Byb21pc2VcIik7XG5cbnZhciBfcHJvbWlzZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wcm9taXNlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGdlbiA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIG5ldyBfcHJvbWlzZTIuZGVmYXVsdChmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBmdW5jdGlvbiBzdGVwKGtleSwgYXJnKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdmFyIGluZm8gPSBnZW5ba2V5XShhcmcpO1xuICAgICAgICAgIHZhciB2YWx1ZSA9IGluZm8udmFsdWU7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIF9wcm9taXNlMi5kZWZhdWx0LnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBzdGVwKFwibmV4dFwiLCB2YWx1ZSk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgc3RlcChcInRocm93XCIsIGVycik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN0ZXAoXCJuZXh0XCIpO1xuICAgIH0pO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpO1xuXG52YXIgX2RlZmluZVByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmluZVByb3BlcnR5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICgwLCBfZGVmaW5lUHJvcGVydHkyLmRlZmF1bHQpKHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpO1xuXG52YXIgX2RlZmluZVByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmluZVByb3BlcnR5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgICgwLCBfZGVmaW5lUHJvcGVydHkyLmRlZmF1bHQpKG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2Fzc2lnblwiKTtcblxudmFyIF9hc3NpZ24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXNzaWduKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX2Fzc2lnbjIuZGVmYXVsdCB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfaXNJdGVyYWJsZTIgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9pcy1pdGVyYWJsZVwiKTtcblxudmFyIF9pc0l0ZXJhYmxlMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzSXRlcmFibGUyKTtcblxudmFyIF9nZXRJdGVyYXRvcjIgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9nZXQtaXRlcmF0b3JcIik7XG5cbnZhciBfZ2V0SXRlcmF0b3IzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0SXRlcmF0b3IyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkge1xuICAgIHZhciBfYXJyID0gW107XG4gICAgdmFyIF9uID0gdHJ1ZTtcbiAgICB2YXIgX2QgPSBmYWxzZTtcbiAgICB2YXIgX2UgPSB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgX2kgPSAoMCwgX2dldEl0ZXJhdG9yMy5kZWZhdWx0KShhcnIpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kID0gdHJ1ZTtcbiAgICAgIF9lID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gX2FycjtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgICAgcmV0dXJuIGFycjtcbiAgICB9IGVsc2UgaWYgKCgwLCBfaXNJdGVyYWJsZTMuZGVmYXVsdCkoT2JqZWN0KGFycikpKSB7XG4gICAgICByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbiAgICB9XG4gIH07XG59KCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZnJvbSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL2FycmF5L2Zyb21cIik7XG5cbnZhciBfZnJvbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9mcm9tKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgYXJyMltpXSA9IGFycltpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyMjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gKDAsIF9mcm9tMi5kZWZhdWx0KShhcnIpO1xuICB9XG59OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZ2VuZXJhdG9yLXJ1bnRpbWVcIik7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LmFycmF5LmZyb20nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLkFycmF5LmZyb207XG4iLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yJyk7XG4iLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUnKTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5hc3NpZ247XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpIHtcbiAgcmV0dXJuICRPYmplY3QuZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyk7XG59O1xuIiwicmVxdWlyZSgnLi4vbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZycpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnByb21pc2UnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM3LnByb21pc2UuZmluYWxseScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczcucHJvbWlzZS50cnknKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9fY29yZScpLlByb21pc2U7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBDb25zdHJ1Y3RvciwgbmFtZSwgZm9yYmlkZGVuRmllbGQpIHtcbiAgaWYgKCEoaXQgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikgfHwgKGZvcmJpZGRlbkZpZWxkICE9PSB1bmRlZmluZWQgJiYgZm9yYmlkZGVuRmllbGQgaW4gaXQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKG5hbWUgKyAnOiBpbmNvcnJlY3QgaW52b2NhdGlvbiEnKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuL190by1hYnNvbHV0ZS1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykgaWYgKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pIHtcbiAgICAgIGlmIChPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG4iLCIvLyBnZXR0aW5nIHRhZyBmcm9tIDE5LjEuMy42IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcoKVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xudmFyIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuLy8gRVMzIHdyb25nIGhlcmVcbnZhciBBUkcgPSBjb2YoZnVuY3Rpb24gKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGl0W2tleV07XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUQUcpKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07XG4iLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG4iLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0geyB2ZXJzaW9uOiAnMi41LjcnIH07XG5pZiAodHlwZW9mIF9fZSA9PSAnbnVtYmVyJykgX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgaW5kZXgsIHZhbHVlKSB7XG4gIGlmIChpbmRleCBpbiBvYmplY3QpICRkZWZpbmVQcm9wZXJ0eS5mKG9iamVjdCwgaW5kZXgsIGNyZWF0ZURlc2MoMCwgdmFsdWUpKTtcbiAgZWxzZSBvYmplY3RbaW5kZXhdID0gdmFsdWU7XG59O1xuIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQsIGxlbmd0aCkge1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZiAodGhhdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZm47XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuIiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCA9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudDtcbi8vIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnIGluIG9sZCBJRVxudmFyIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG4iLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24gKHR5cGUsIG5hbWUsIHNvdXJjZSkge1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRjtcbiAgdmFyIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0Lkc7XG4gIHZhciBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TO1xuICB2YXIgSVNfUFJPVE8gPSB0eXBlICYgJGV4cG9ydC5QO1xuICB2YXIgSVNfQklORCA9IHR5cGUgJiAkZXhwb3J0LkI7XG4gIHZhciBJU19XUkFQID0gdHlwZSAmICRleHBvcnQuVztcbiAgdmFyIGV4cG9ydHMgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KTtcbiAgdmFyIGV4cFByb3RvID0gZXhwb3J0c1tQUk9UT1RZUEVdO1xuICB2YXIgdGFyZ2V0ID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXTtcbiAgdmFyIGtleSwgb3duLCBvdXQ7XG4gIGlmIChJU19HTE9CQUwpIHNvdXJjZSA9IG5hbWU7XG4gIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgaWYgKG93biAmJiBoYXMoZXhwb3J0cywga2V5KSkgY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbiAoQykge1xuICAgICAgdmFyIEYgPSBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgICBpZiAodGhpcyBpbnN0YW5jZW9mIEMpIHtcbiAgICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBDKCk7XG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgQyhhKTtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBDKGEsIGIpO1xuICAgICAgICAgIH0gcmV0dXJuIG5ldyBDKGEsIGIsIGMpO1xuICAgICAgICB9IHJldHVybiBDLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5tZXRob2RzLiVOQU1FJVxuICAgIGlmIChJU19QUk9UTykge1xuICAgICAgKGV4cG9ydHMudmlydHVhbCB8fCAoZXhwb3J0cy52aXJ0dWFsID0ge30pKVtrZXldID0gb3V0O1xuICAgICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLnByb3RvdHlwZS4lTkFNRSVcbiAgICAgIGlmICh0eXBlICYgJGV4cG9ydC5SICYmIGV4cFByb3RvICYmICFleHBQcm90b1trZXldKSBoaWRlKGV4cFByb3RvLCBrZXksIG91dCk7XG4gICAgfVxuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuIiwidmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKTtcbnZhciBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgZ2V0SXRlckZuID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcbnZhciBCUkVBSyA9IHt9O1xudmFyIFJFVFVSTiA9IHt9O1xudmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyYWJsZSwgZW50cmllcywgZm4sIHRoYXQsIElURVJBVE9SKSB7XG4gIHZhciBpdGVyRm4gPSBJVEVSQVRPUiA/IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGl0ZXJhYmxlOyB9IDogZ2V0SXRlckZuKGl0ZXJhYmxlKTtcbiAgdmFyIGYgPSBjdHgoZm4sIHRoYXQsIGVudHJpZXMgPyAyIDogMSk7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBsZW5ndGgsIHN0ZXAsIGl0ZXJhdG9yLCByZXN1bHQ7XG4gIGlmICh0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdGVyYWJsZSArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICAvLyBmYXN0IGNhc2UgZm9yIGFycmF5cyB3aXRoIGRlZmF1bHQgaXRlcmF0b3JcbiAgaWYgKGlzQXJyYXlJdGVyKGl0ZXJGbikpIGZvciAobGVuZ3RoID0gdG9MZW5ndGgoaXRlcmFibGUubGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICByZXN1bHQgPSBlbnRyaWVzID8gZihhbk9iamVjdChzdGVwID0gaXRlcmFibGVbaW5kZXhdKVswXSwgc3RlcFsxXSkgOiBmKGl0ZXJhYmxlW2luZGV4XSk7XG4gICAgaWYgKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pIHJldHVybiByZXN1bHQ7XG4gIH0gZWxzZSBmb3IgKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoaXRlcmFibGUpOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7KSB7XG4gICAgcmVzdWx0ID0gY2FsbChpdGVyYXRvciwgZiwgc3RlcC52YWx1ZSwgZW50cmllcyk7XG4gICAgaWYgKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5leHBvcnRzLkJSRUFLID0gQlJFQUs7XG5leHBvcnRzLlJFVFVSTiA9IFJFVFVSTjtcbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGZcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmICh0eXBlb2YgX19nID09ICdudW1iZXInKSBfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbiIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG4iLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG4iLCJ2YXIgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudDtcbm1vZHVsZS5leHBvcnRzID0gZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuIiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdkaXYnKSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcbiIsIi8vIGZhc3QgYXBwbHksIGh0dHA6Ly9qc3BlcmYubG5raXQuY29tL2Zhc3QtYXBwbHkvNVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIGFyZ3MsIHRoYXQpIHtcbiAgdmFyIHVuID0gdGhhdCA9PT0gdW5kZWZpbmVkO1xuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gdW4gPyBmbigpXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQpO1xuICAgIGNhc2UgMTogcmV0dXJuIHVuID8gZm4oYXJnc1swXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICBjYXNlIDM6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgIGNhc2UgNDogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSk7XG4gIH0gcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3MpO1xufTtcbiIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07XG4iLCIvLyBjaGVjayBvbiBkZWZhdWx0IEFycmF5IGl0ZXJhdG9yXG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBBcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgIT09IHVuZGVmaW5lZCAmJiAoSXRlcmF0b3JzLkFycmF5ID09PSBpdCB8fCBBcnJheVByb3RvW0lURVJBVE9SXSA9PT0gaXQpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuIiwiLy8gY2FsbCBzb21ldGhpbmcgb24gaXRlcmF0b3Igc3RlcCB3aXRoIHNhZmUgY2xvc2luZyBvbiBlcnJvclxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyYXRvciwgZm4sIHZhbHVlLCBlbnRyaWVzKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGVudHJpZXMgPyBmbihhbk9iamVjdCh2YWx1ZSlbMF0sIHZhbHVlWzFdKSA6IGZuKHZhbHVlKTtcbiAgLy8gNy40LjYgSXRlcmF0b3JDbG9zZShpdGVyYXRvciwgY29tcGxldGlvbilcbiAgfSBjYXRjaCAoZSkge1xuICAgIHZhciByZXQgPSBpdGVyYXRvclsncmV0dXJuJ107XG4gICAgaWYgKHJldCAhPT0gdW5kZWZpbmVkKSBhbk9iamVjdChyZXQuY2FsbChpdGVyYXRvcikpO1xuICAgIHRocm93IGU7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpO1xudmFyIGRlc2NyaXB0b3IgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG5cbi8vIDI1LjEuMi4xLjEgJUl0ZXJhdG9yUHJvdG90eXBlJVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19oaWRlJykoSXRlcmF0b3JQcm90b3R5cGUsIHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpLCBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpIHtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7IG5leHQ6IGRlc2NyaXB0b3IoMSwgbmV4dCkgfSk7XG4gIHNldFRvU3RyaW5nVGFnKENvbnN0cnVjdG9yLCBOQU1FICsgJyBJdGVyYXRvcicpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZID0gcmVxdWlyZSgnLi9fbGlicmFyeScpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciAkaXRlckNyZWF0ZSA9IHJlcXVpcmUoJy4vX2l0ZXItY3JlYXRlJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgQlVHR1kgPSAhKFtdLmtleXMgJiYgJ25leHQnIGluIFtdLmtleXMoKSk7IC8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbnZhciBGRl9JVEVSQVRPUiA9ICdAQGl0ZXJhdG9yJztcbnZhciBLRVlTID0gJ2tleXMnO1xudmFyIFZBTFVFUyA9ICd2YWx1ZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCkge1xuICAkaXRlckNyZWF0ZShDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG4gIHZhciBnZXRNZXRob2QgPSBmdW5jdGlvbiAoa2luZCkge1xuICAgIGlmICghQlVHR1kgJiYga2luZCBpbiBwcm90bykgcmV0dXJuIHByb3RvW2tpbmRdO1xuICAgIHN3aXRjaCAoa2luZCkge1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gIH07XG4gIHZhciBUQUcgPSBOQU1FICsgJyBJdGVyYXRvcic7XG4gIHZhciBERUZfVkFMVUVTID0gREVGQVVMVCA9PSBWQUxVRVM7XG4gIHZhciBWQUxVRVNfQlVHID0gZmFsc2U7XG4gIHZhciBwcm90byA9IEJhc2UucHJvdG90eXBlO1xuICB2YXIgJG5hdGl2ZSA9IHByb3RvW0lURVJBVE9SXSB8fCBwcm90b1tGRl9JVEVSQVRPUl0gfHwgREVGQVVMVCAmJiBwcm90b1tERUZBVUxUXTtcbiAgdmFyICRkZWZhdWx0ID0gJG5hdGl2ZSB8fCBnZXRNZXRob2QoREVGQVVMVCk7XG4gIHZhciAkZW50cmllcyA9IERFRkFVTFQgPyAhREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKCdlbnRyaWVzJykgOiB1bmRlZmluZWQ7XG4gIHZhciAkYW55TmF0aXZlID0gTkFNRSA9PSAnQXJyYXknID8gcHJvdG8uZW50cmllcyB8fCAkbmF0aXZlIDogJG5hdGl2ZTtcbiAgdmFyIG1ldGhvZHMsIGtleSwgSXRlcmF0b3JQcm90b3R5cGU7XG4gIC8vIEZpeCBuYXRpdmVcbiAgaWYgKCRhbnlOYXRpdmUpIHtcbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKCRhbnlOYXRpdmUuY2FsbChuZXcgQmFzZSgpKSk7XG4gICAgaWYgKEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlICYmIEl0ZXJhdG9yUHJvdG90eXBlLm5leHQpIHtcbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEl0ZXJhdG9yUHJvdG90eXBlLCBUQUcsIHRydWUpO1xuICAgICAgLy8gZml4IGZvciBzb21lIG9sZCBlbmdpbmVzXG4gICAgICBpZiAoIUxJQlJBUlkgJiYgdHlwZW9mIEl0ZXJhdG9yUHJvdG90eXBlW0lURVJBVE9SXSAhPSAnZnVuY3Rpb24nKSBoaWRlKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgfVxuICB9XG4gIC8vIGZpeCBBcnJheSN7dmFsdWVzLCBAQGl0ZXJhdG9yfS5uYW1lIGluIFY4IC8gRkZcbiAgaWYgKERFRl9WQUxVRVMgJiYgJG5hdGl2ZSAmJiAkbmF0aXZlLm5hbWUgIT09IFZBTFVFUykge1xuICAgIFZBTFVFU19CVUcgPSB0cnVlO1xuICAgICRkZWZhdWx0ID0gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gJG5hdGl2ZS5jYWxsKHRoaXMpOyB9O1xuICB9XG4gIC8vIERlZmluZSBpdGVyYXRvclxuICBpZiAoKCFMSUJSQVJZIHx8IEZPUkNFRCkgJiYgKEJVR0dZIHx8IFZBTFVFU19CVUcgfHwgIXByb3RvW0lURVJBVE9SXSkpIHtcbiAgICBoaWRlKHByb3RvLCBJVEVSQVRPUiwgJGRlZmF1bHQpO1xuICB9XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gJGRlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddID0gcmV0dXJuVGhpcztcbiAgaWYgKERFRkFVTFQpIHtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiBERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6IElTX1NFVCA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogJGVudHJpZXNcbiAgICB9O1xuICAgIGlmIChGT1JDRUQpIGZvciAoa2V5IGluIG1ldGhvZHMpIHtcbiAgICAgIGlmICghKGtleSBpbiBwcm90bykpIHJlZGVmaW5lKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XG4gICAgfSBlbHNlICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKEJVR0dZIHx8IFZBTFVFU19CVUcpLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxuICByZXR1cm4gbWV0aG9kcztcbn07XG4iLCJ2YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBTQUZFX0NMT1NJTkcgPSBmYWxzZTtcblxudHJ5IHtcbiAgdmFyIHJpdGVyID0gWzddW0lURVJBVE9SXSgpO1xuICByaXRlclsncmV0dXJuJ10gPSBmdW5jdGlvbiAoKSB7IFNBRkVfQ0xPU0lORyA9IHRydWU7IH07XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby10aHJvdy1saXRlcmFsXG4gIEFycmF5LmZyb20ocml0ZXIsIGZ1bmN0aW9uICgpIHsgdGhyb3cgMjsgfSk7XG59IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYywgc2tpcENsb3NpbmcpIHtcbiAgaWYgKCFza2lwQ2xvc2luZyAmJiAhU0FGRV9DTE9TSU5HKSByZXR1cm4gZmFsc2U7XG4gIHZhciBzYWZlID0gZmFsc2U7XG4gIHRyeSB7XG4gICAgdmFyIGFyciA9IFs3XTtcbiAgICB2YXIgaXRlciA9IGFycltJVEVSQVRPUl0oKTtcbiAgICBpdGVyLm5leHQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB7IGRvbmU6IHNhZmUgPSB0cnVlIH07IH07XG4gICAgYXJyW0lURVJBVE9SXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGl0ZXI7IH07XG4gICAgZXhlYyhhcnIpO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIHNhZmU7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZG9uZSwgdmFsdWUpIHtcbiAgcmV0dXJuIHsgdmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmUgfTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB0cnVlO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIG1hY3JvdGFzayA9IHJlcXVpcmUoJy4vX3Rhc2snKS5zZXQ7XG52YXIgT2JzZXJ2ZXIgPSBnbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBnbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlO1xudmFyIGlzTm9kZSA9IHJlcXVpcmUoJy4vX2NvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBoZWFkLCBsYXN0LCBub3RpZnk7XG5cbiAgdmFyIGZsdXNoID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwYXJlbnQsIGZuO1xuICAgIGlmIChpc05vZGUgJiYgKHBhcmVudCA9IHByb2Nlc3MuZG9tYWluKSkgcGFyZW50LmV4aXQoKTtcbiAgICB3aGlsZSAoaGVhZCkge1xuICAgICAgZm4gPSBoZWFkLmZuO1xuICAgICAgaGVhZCA9IGhlYWQubmV4dDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGZuKCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChoZWFkKSBub3RpZnkoKTtcbiAgICAgICAgZWxzZSBsYXN0ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH0gbGFzdCA9IHVuZGVmaW5lZDtcbiAgICBpZiAocGFyZW50KSBwYXJlbnQuZW50ZXIoKTtcbiAgfTtcblxuICAvLyBOb2RlLmpzXG4gIGlmIChpc05vZGUpIHtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGZsdXNoKTtcbiAgICB9O1xuICAvLyBicm93c2VycyB3aXRoIE11dGF0aW9uT2JzZXJ2ZXIsIGV4Y2VwdCBpT1MgU2FmYXJpIC0gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzMzOVxuICB9IGVsc2UgaWYgKE9ic2VydmVyICYmICEoZ2xvYmFsLm5hdmlnYXRvciAmJiBnbG9iYWwubmF2aWdhdG9yLnN0YW5kYWxvbmUpKSB7XG4gICAgdmFyIHRvZ2dsZSA9IHRydWU7XG4gICAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gICAgbmV3IE9ic2VydmVyKGZsdXNoKS5vYnNlcnZlKG5vZGUsIHsgY2hhcmFjdGVyRGF0YTogdHJ1ZSB9KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBub2RlLmRhdGEgPSB0b2dnbGUgPSAhdG9nZ2xlO1xuICAgIH07XG4gIC8vIGVudmlyb25tZW50cyB3aXRoIG1heWJlIG5vbi1jb21wbGV0ZWx5IGNvcnJlY3QsIGJ1dCBleGlzdGVudCBQcm9taXNlXG4gIH0gZWxzZSBpZiAoUHJvbWlzZSAmJiBQcm9taXNlLnJlc29sdmUpIHtcbiAgICAvLyBQcm9taXNlLnJlc29sdmUgd2l0aG91dCBhbiBhcmd1bWVudCB0aHJvd3MgYW4gZXJyb3IgaW4gTEcgV2ViT1MgMlxuICAgIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcHJvbWlzZS50aGVuKGZsdXNoKTtcbiAgICB9O1xuICAvLyBmb3Igb3RoZXIgZW52aXJvbm1lbnRzIC0gbWFjcm90YXNrIGJhc2VkIG9uOlxuICAvLyAtIHNldEltbWVkaWF0ZVxuICAvLyAtIE1lc3NhZ2VDaGFubmVsXG4gIC8vIC0gd2luZG93LnBvc3RNZXNzYWdcbiAgLy8gLSBvbnJlYWR5c3RhdGVjaGFuZ2VcbiAgLy8gLSBzZXRUaW1lb3V0XG4gIH0gZWxzZSB7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gc3RyYW5nZSBJRSArIHdlYnBhY2sgZGV2IHNlcnZlciBidWcgLSB1c2UgLmNhbGwoZ2xvYmFsKVxuICAgICAgbWFjcm90YXNrLmNhbGwoZ2xvYmFsLCBmbHVzaCk7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoZm4pIHtcbiAgICB2YXIgdGFzayA9IHsgZm46IGZuLCBuZXh0OiB1bmRlZmluZWQgfTtcbiAgICBpZiAobGFzdCkgbGFzdC5uZXh0ID0gdGFzaztcbiAgICBpZiAoIWhlYWQpIHtcbiAgICAgIGhlYWQgPSB0YXNrO1xuICAgICAgbm90aWZ5KCk7XG4gICAgfSBsYXN0ID0gdGFzaztcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vLyAyNS40LjEuNSBOZXdQcm9taXNlQ2FwYWJpbGl0eShDKVxudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcblxuZnVuY3Rpb24gUHJvbWlzZUNhcGFiaWxpdHkoQykge1xuICB2YXIgcmVzb2x2ZSwgcmVqZWN0O1xuICB0aGlzLnByb21pc2UgPSBuZXcgQyhmdW5jdGlvbiAoJCRyZXNvbHZlLCAkJHJlamVjdCkge1xuICAgIGlmIChyZXNvbHZlICE9PSB1bmRlZmluZWQgfHwgcmVqZWN0ICE9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcignQmFkIFByb21pc2UgY29uc3RydWN0b3InKTtcbiAgICByZXNvbHZlID0gJCRyZXNvbHZlO1xuICAgIHJlamVjdCA9ICQkcmVqZWN0O1xuICB9KTtcbiAgdGhpcy5yZXNvbHZlID0gYUZ1bmN0aW9uKHJlc29sdmUpO1xuICB0aGlzLnJlamVjdCA9IGFGdW5jdGlvbihyZWplY3QpO1xufVxuXG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gKEMpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlQ2FwYWJpbGl0eShDKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vLyAxOS4xLjIuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlLCAuLi4pXG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG52YXIgZ09QUyA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJyk7XG52YXIgcElFID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciAkYXNzaWduID0gT2JqZWN0LmFzc2lnbjtcblxuLy8gc2hvdWxkIHdvcmsgd2l0aCBzeW1ib2xzIGFuZCBzaG91bGQgaGF2ZSBkZXRlcm1pbmlzdGljIHByb3BlcnR5IG9yZGVyIChWOCBidWcpXG5tb2R1bGUuZXhwb3J0cyA9ICEkYXNzaWduIHx8IHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICB2YXIgQSA9IHt9O1xuICB2YXIgQiA9IHt9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgdmFyIFMgPSBTeW1ib2woKTtcbiAgdmFyIEsgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuICBBW1NdID0gNztcbiAgSy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAoaykgeyBCW2tdID0gazsgfSk7XG4gIHJldHVybiAkYXNzaWduKHt9LCBBKVtTXSAhPSA3IHx8IE9iamVjdC5rZXlzKCRhc3NpZ24oe30sIEIpKS5qb2luKCcnKSAhPSBLO1xufSkgPyBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2UpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgVCA9IHRvT2JqZWN0KHRhcmdldCk7XG4gIHZhciBhTGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIGluZGV4ID0gMTtcbiAgdmFyIGdldFN5bWJvbHMgPSBnT1BTLmY7XG4gIHZhciBpc0VudW0gPSBwSUUuZjtcbiAgd2hpbGUgKGFMZW4gPiBpbmRleCkge1xuICAgIHZhciBTID0gSU9iamVjdChhcmd1bWVudHNbaW5kZXgrK10pO1xuICAgIHZhciBrZXlzID0gZ2V0U3ltYm9scyA/IGdldEtleXMoUykuY29uY2F0KGdldFN5bWJvbHMoUykpIDogZ2V0S2V5cyhTKTtcbiAgICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIGogPSAwO1xuICAgIHZhciBrZXk7XG4gICAgd2hpbGUgKGxlbmd0aCA+IGopIGlmIChpc0VudW0uY2FsbChTLCBrZXkgPSBrZXlzW2orK10pKSBUW2tleV0gPSBTW2tleV07XG4gIH0gcmV0dXJuIFQ7XG59IDogJGFzc2lnbjtcbiIsIi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgZFBzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwcycpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xudmFyIEVtcHR5ID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgY3JlYXRlRGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcbiAgdmFyIGlmcmFtZSA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnaWZyYW1lJyk7XG4gIHZhciBpID0gZW51bUJ1Z0tleXMubGVuZ3RoO1xuICB2YXIgbHQgPSAnPCc7XG4gIHZhciBndCA9ICc+JztcbiAgdmFyIGlmcmFtZURvY3VtZW50O1xuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgcmVxdWlyZSgnLi9faHRtbCcpLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDonOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNjcmlwdC11cmxcbiAgLy8gY3JlYXRlRGljdCA9IGlmcmFtZS5jb250ZW50V2luZG93Lk9iamVjdDtcbiAgLy8gaHRtbC5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKGx0ICsgJ3NjcmlwdCcgKyBndCArICdkb2N1bWVudC5GPU9iamVjdCcgKyBsdCArICcvc2NyaXB0JyArIGd0KTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgY3JlYXRlRGljdCA9IGlmcmFtZURvY3VtZW50LkY7XG4gIHdoaWxlIChpLS0pIGRlbGV0ZSBjcmVhdGVEaWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbaV1dO1xuICByZXR1cm4gY3JlYXRlRGljdCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmIChPICE9PSBudWxsKSB7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eSgpO1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBudWxsO1xuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgfSBlbHNlIHJlc3VsdCA9IGNyZWF0ZURpY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRQcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGRQID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG4iLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcykge1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgPSBnZXRLZXlzKFByb3BlcnRpZXMpO1xuICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gIHZhciBpID0gMDtcbiAgdmFyIFA7XG4gIHdoaWxlIChsZW5ndGggPiBpKSBkUC5mKE8sIFAgPSBrZXlzW2krK10sIFByb3BlcnRpZXNbUF0pO1xuICByZXR1cm4gTztcbn07XG4iLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuIiwiLy8gMTkuMS4yLjkgLyAxNS4yLjMuMiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xudmFyIE9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gKE8pIHtcbiAgTyA9IHRvT2JqZWN0KE8pO1xuICBpZiAoaGFzKE8sIElFX1BST1RPKSkgcmV0dXJuIE9bSUVfUFJPVE9dO1xuICBpZiAodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcikge1xuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvIDogbnVsbDtcbn07XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSBpZiAoa2V5ICE9IElFX1BST1RPKSBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG4iLCJleHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4geyBlOiBmYWxzZSwgdjogZXhlYygpIH07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4geyBlOiB0cnVlLCB2OiBlIH07XG4gIH1cbn07XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gcmVxdWlyZSgnLi9fbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDLCB4KSB7XG4gIGFuT2JqZWN0KEMpO1xuICBpZiAoaXNPYmplY3QoeCkgJiYgeC5jb25zdHJ1Y3RvciA9PT0gQykgcmV0dXJuIHg7XG4gIHZhciBwcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5LmYoQyk7XG4gIHZhciByZXNvbHZlID0gcHJvbWlzZUNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgcmVzb2x2ZSh4KTtcbiAgcmV0dXJuIHByb21pc2VDYXBhYmlsaXR5LnByb21pc2U7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYml0bWFwLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9O1xufTtcbiIsInZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBzcmMsIHNhZmUpIHtcbiAgZm9yICh2YXIga2V5IGluIHNyYykge1xuICAgIGlmIChzYWZlICYmIHRhcmdldFtrZXldKSB0YXJnZXRba2V5XSA9IHNyY1trZXldO1xuICAgIGVsc2UgaGlkZSh0YXJnZXQsIGtleSwgc3JjW2tleV0pO1xuICB9IHJldHVybiB0YXJnZXQ7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19oaWRlJyk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKTtcbnZhciBTUEVDSUVTID0gcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoS0VZKSB7XG4gIHZhciBDID0gdHlwZW9mIGNvcmVbS0VZXSA9PSAnZnVuY3Rpb24nID8gY29yZVtLRVldIDogZ2xvYmFsW0tFWV07XG4gIGlmIChERVNDUklQVE9SUyAmJiBDICYmICFDW1NQRUNJRVNdKSBkUC5mKEMsIFNQRUNJRVMsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9XG4gIH0pO1xufTtcbiIsInZhciBkZWYgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgdGFnLCBzdGF0KSB7XG4gIGlmIChpdCAmJiAhaGFzKGl0ID0gc3RhdCA/IGl0IDogaXQucHJvdG90eXBlLCBUQUcpKSBkZWYoaXQsIFRBRywgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiB0YWcgfSk7XG59O1xuIiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCdrZXlzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHNoYXJlZFtrZXldIHx8IChzaGFyZWRba2V5XSA9IHVpZChrZXkpKTtcbn07XG4iLCJ2YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiB7fSk7XG59KSgndmVyc2lvbnMnLCBbXSkucHVzaCh7XG4gIHZlcnNpb246IGNvcmUudmVyc2lvbixcbiAgbW9kZTogcmVxdWlyZSgnLi9fbGlicmFyeScpID8gJ3B1cmUnIDogJ2dsb2JhbCcsXG4gIGNvcHlyaWdodDogJ8KpIDIwMTggRGVuaXMgUHVzaGthcmV2ICh6bG9pcm9jay5ydSknXG59KTtcbiIsIi8vIDcuMy4yMCBTcGVjaWVzQ29uc3RydWN0b3IoTywgZGVmYXVsdENvbnN0cnVjdG9yKVxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xudmFyIFNQRUNJRVMgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTywgRCkge1xuICB2YXIgQyA9IGFuT2JqZWN0KE8pLmNvbnN0cnVjdG9yO1xuICB2YXIgUztcbiAgcmV0dXJuIEMgPT09IHVuZGVmaW5lZCB8fCAoUyA9IGFuT2JqZWN0KEMpW1NQRUNJRVNdKSA9PSB1bmRlZmluZWQgPyBEIDogYUZ1bmN0aW9uKFMpO1xufTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbi8vIHRydWUgIC0+IFN0cmluZyNhdFxuLy8gZmFsc2UgLT4gU3RyaW5nI2NvZGVQb2ludEF0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChUT19TVFJJTkcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0aGF0LCBwb3MpIHtcbiAgICB2YXIgcyA9IFN0cmluZyhkZWZpbmVkKHRoYXQpKTtcbiAgICB2YXIgaSA9IHRvSW50ZWdlcihwb3MpO1xuICAgIHZhciBsID0gcy5sZW5ndGg7XG4gICAgdmFyIGEsIGI7XG4gICAgaWYgKGkgPCAwIHx8IGkgPj0gbCkgcmV0dXJuIFRPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGEgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGEgPCAweGQ4MDAgfHwgYSA+IDB4ZGJmZiB8fCBpICsgMSA9PT0gbCB8fCAoYiA9IHMuY2hhckNvZGVBdChpICsgMSkpIDwgMHhkYzAwIHx8IGIgPiAweGRmZmZcbiAgICAgID8gVE9fU1RSSU5HID8gcy5jaGFyQXQoaSkgOiBhXG4gICAgICA6IFRPX1NUUklORyA/IHMuc2xpY2UoaSwgaSArIDIpIDogKGEgLSAweGQ4MDAgPDwgMTApICsgKGIgLSAweGRjMDApICsgMHgxMDAwMDtcbiAgfTtcbn07XG4iLCJ2YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgaW52b2tlID0gcmVxdWlyZSgnLi9faW52b2tlJyk7XG52YXIgaHRtbCA9IHJlcXVpcmUoJy4vX2h0bWwnKTtcbnZhciBjZWwgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIHNldFRhc2sgPSBnbG9iYWwuc2V0SW1tZWRpYXRlO1xudmFyIGNsZWFyVGFzayA9IGdsb2JhbC5jbGVhckltbWVkaWF0ZTtcbnZhciBNZXNzYWdlQ2hhbm5lbCA9IGdsb2JhbC5NZXNzYWdlQ2hhbm5lbDtcbnZhciBEaXNwYXRjaCA9IGdsb2JhbC5EaXNwYXRjaDtcbnZhciBjb3VudGVyID0gMDtcbnZhciBxdWV1ZSA9IHt9O1xudmFyIE9OUkVBRFlTVEFURUNIQU5HRSA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnO1xudmFyIGRlZmVyLCBjaGFubmVsLCBwb3J0O1xudmFyIHJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGlkID0gK3RoaXM7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgaWYgKHF1ZXVlLmhhc093blByb3BlcnR5KGlkKSkge1xuICAgIHZhciBmbiA9IHF1ZXVlW2lkXTtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICAgIGZuKCk7XG4gIH1cbn07XG52YXIgbGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgcnVuLmNhbGwoZXZlbnQuZGF0YSk7XG59O1xuLy8gTm9kZS5qcyAwLjkrICYgSUUxMCsgaGFzIHNldEltbWVkaWF0ZSwgb3RoZXJ3aXNlOlxuaWYgKCFzZXRUYXNrIHx8ICFjbGVhclRhc2spIHtcbiAgc2V0VGFzayA9IGZ1bmN0aW9uIHNldEltbWVkaWF0ZShmbikge1xuICAgIHZhciBhcmdzID0gW107XG4gICAgdmFyIGkgPSAxO1xuICAgIHdoaWxlIChhcmd1bWVudHMubGVuZ3RoID4gaSkgYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICBxdWV1ZVsrK2NvdW50ZXJdID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gICAgICBpbnZva2UodHlwZW9mIGZuID09ICdmdW5jdGlvbicgPyBmbiA6IEZ1bmN0aW9uKGZuKSwgYXJncyk7XG4gICAgfTtcbiAgICBkZWZlcihjb3VudGVyKTtcbiAgICByZXR1cm4gY291bnRlcjtcbiAgfTtcbiAgY2xlYXJUYXNrID0gZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaWQpIHtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICB9O1xuICAvLyBOb2RlLmpzIDAuOC1cbiAgaWYgKHJlcXVpcmUoJy4vX2NvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGN0eChydW4sIGlkLCAxKSk7XG4gICAgfTtcbiAgLy8gU3BoZXJlIChKUyBnYW1lIGVuZ2luZSkgRGlzcGF0Y2ggQVBJXG4gIH0gZWxzZSBpZiAoRGlzcGF0Y2ggJiYgRGlzcGF0Y2gubm93KSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIERpc3BhdGNoLm5vdyhjdHgocnVuLCBpZCwgMSkpO1xuICAgIH07XG4gIC8vIEJyb3dzZXJzIHdpdGggTWVzc2FnZUNoYW5uZWwsIGluY2x1ZGVzIFdlYldvcmtlcnNcbiAgfSBlbHNlIGlmIChNZXNzYWdlQ2hhbm5lbCkge1xuICAgIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICBwb3J0ID0gY2hhbm5lbC5wb3J0MjtcbiAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGxpc3RlbmVyO1xuICAgIGRlZmVyID0gY3R4KHBvcnQucG9zdE1lc3NhZ2UsIHBvcnQsIDEpO1xuICAvLyBCcm93c2VycyB3aXRoIHBvc3RNZXNzYWdlLCBza2lwIFdlYldvcmtlcnNcbiAgLy8gSUU4IGhhcyBwb3N0TWVzc2FnZSwgYnV0IGl0J3Mgc3luYyAmIHR5cGVvZiBpdHMgcG9zdE1lc3NhZ2UgaXMgJ29iamVjdCdcbiAgfSBlbHNlIGlmIChnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lciAmJiB0eXBlb2YgcG9zdE1lc3NhZ2UgPT0gJ2Z1bmN0aW9uJyAmJiAhZ2xvYmFsLmltcG9ydFNjcmlwdHMpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKGlkICsgJycsICcqJyk7XG4gICAgfTtcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGxpc3RlbmVyLCBmYWxzZSk7XG4gIC8vIElFOC1cbiAgfSBlbHNlIGlmIChPTlJFQURZU1RBVEVDSEFOR0UgaW4gY2VsKCdzY3JpcHQnKSkge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBodG1sLmFwcGVuZENoaWxkKGNlbCgnc2NyaXB0JykpW09OUkVBRFlTVEFURUNIQU5HRV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQodGhpcyk7XG4gICAgICAgIHJ1bi5jYWxsKGlkKTtcbiAgICAgIH07XG4gICAgfTtcbiAgLy8gUmVzdCBvbGQgYnJvd3NlcnNcbiAgfSBlbHNlIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgc2V0VGltZW91dChjdHgocnVuLCBpZCwgMSksIDApO1xuICAgIH07XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IHNldFRhc2ssXG4gIGNsZWFyOiBjbGVhclRhc2tcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5kZXgsIGxlbmd0aCkge1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTtcbiIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59O1xuIiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcbiIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuIiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG4iLCIvLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgUykge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYgKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICh0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAoIVMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG4iLCJ2YXIgaWQgPSAwO1xudmFyIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBuYXZpZ2F0b3IgPSBnbG9iYWwubmF2aWdhdG9yO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5hdmlnYXRvciAmJiBuYXZpZ2F0b3IudXNlckFnZW50IHx8ICcnO1xuIiwidmFyIHN0b3JlID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ3drcycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xudmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLlN5bWJvbDtcbnZhciBVU0VfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PSAnZnVuY3Rpb24nO1xuXG52YXIgJGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxuICAgIFVTRV9TWU1CT0wgJiYgU3ltYm9sW25hbWVdIHx8IChVU0VfU1lNQk9MID8gU3ltYm9sIDogdWlkKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xuXG4kZXhwb3J0cy5zdG9yZSA9IHN0b3JlO1xuIiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuL19jbGFzc29mJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmdldEl0ZXJhdG9yTWV0aG9kID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCAhPSB1bmRlZmluZWQpIHJldHVybiBpdFtJVEVSQVRPUl1cbiAgICB8fCBpdFsnQEBpdGVyYXRvciddXG4gICAgfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbn07XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBnZXQgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3IgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIGl0ZXJGbiA9IGdldChpdCk7XG4gIGlmICh0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICByZXR1cm4gYW5PYmplY3QoaXRlckZuLmNhbGwoaXQpKTtcbn07XG4iLCJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuaXNJdGVyYWJsZSA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgTyA9IE9iamVjdChpdCk7XG4gIHJldHVybiBPW0lURVJBVE9SXSAhPT0gdW5kZWZpbmVkXG4gICAgfHwgJ0BAaXRlcmF0b3InIGluIE9cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gICAgfHwgSXRlcmF0b3JzLmhhc093blByb3BlcnR5KGNsYXNzb2YoTykpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi9faXRlci1jYWxsJyk7XG52YXIgaXNBcnJheUl0ZXIgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX2NyZWF0ZS1wcm9wZXJ0eScpO1xudmFyIGdldEl0ZXJGbiA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2l0ZXItZGV0ZWN0JykoZnVuY3Rpb24gKGl0ZXIpIHsgQXJyYXkuZnJvbShpdGVyKTsgfSksICdBcnJheScsIHtcbiAgLy8gMjIuMS4yLjEgQXJyYXkuZnJvbShhcnJheUxpa2UsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICBmcm9tOiBmdW5jdGlvbiBmcm9tKGFycmF5TGlrZSAvKiAsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkICovKSB7XG4gICAgdmFyIE8gPSB0b09iamVjdChhcnJheUxpa2UpO1xuICAgIHZhciBDID0gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyA/IHRoaXMgOiBBcnJheTtcbiAgICB2YXIgYUxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgdmFyIG1hcGZuID0gYUxlbiA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQ7XG4gICAgdmFyIG1hcHBpbmcgPSBtYXBmbiAhPT0gdW5kZWZpbmVkO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGl0ZXJGbiA9IGdldEl0ZXJGbihPKTtcbiAgICB2YXIgbGVuZ3RoLCByZXN1bHQsIHN0ZXAsIGl0ZXJhdG9yO1xuICAgIGlmIChtYXBwaW5nKSBtYXBmbiA9IGN0eChtYXBmbiwgYUxlbiA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQsIDIpO1xuICAgIC8vIGlmIG9iamVjdCBpc24ndCBpdGVyYWJsZSBvciBpdCdzIGFycmF5IHdpdGggZGVmYXVsdCBpdGVyYXRvciAtIHVzZSBzaW1wbGUgY2FzZVxuICAgIGlmIChpdGVyRm4gIT0gdW5kZWZpbmVkICYmICEoQyA9PSBBcnJheSAmJiBpc0FycmF5SXRlcihpdGVyRm4pKSkge1xuICAgICAgZm9yIChpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKE8pLCByZXN1bHQgPSBuZXcgQygpOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7IGluZGV4KyspIHtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IGNhbGwoaXRlcmF0b3IsIG1hcGZuLCBbc3RlcC52YWx1ZSwgaW5kZXhdLCB0cnVlKSA6IHN0ZXAudmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgICBmb3IgKHJlc3VsdCA9IG5ldyBDKGxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIG1hcHBpbmcgPyBtYXBmbihPW2luZGV4XSwgaW5kZXgpIDogT1tpbmRleF0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQubGVuZ3RoID0gaW5kZXg7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4vX2FkZC10by11bnNjb3BhYmxlcycpO1xudmFyIHN0ZXAgPSByZXF1aXJlKCcuL19pdGVyLXN0ZXAnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG5cbi8vIDIyLjEuMy40IEFycmF5LnByb3RvdHlwZS5lbnRyaWVzKClcbi8vIDIyLjEuMy4xMyBBcnJheS5wcm90b3R5cGUua2V5cygpXG4vLyAyMi4xLjMuMjkgQXJyYXkucHJvdG90eXBlLnZhbHVlcygpXG4vLyAyMi4xLjMuMzAgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24gKGl0ZXJhdGVkLCBraW5kKSB7XG4gIHRoaXMuX3QgPSB0b0lPYmplY3QoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdGhpcy5fayA9IGtpbmQ7ICAgICAgICAgICAgICAgIC8vIGtpbmRcbi8vIDIyLjEuNS4yLjEgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24gKCkge1xuICB2YXIgTyA9IHRoaXMuX3Q7XG4gIHZhciBraW5kID0gdGhpcy5faztcbiAgdmFyIGluZGV4ID0gdGhpcy5faSsrO1xuICBpZiAoIU8gfHwgaW5kZXggPj0gTy5sZW5ndGgpIHtcbiAgICB0aGlzLl90ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBzdGVwKDEpO1xuICB9XG4gIGlmIChraW5kID09ICdrZXlzJykgcmV0dXJuIHN0ZXAoMCwgaW5kZXgpO1xuICBpZiAoa2luZCA9PSAndmFsdWVzJykgcmV0dXJuIHN0ZXAoMCwgT1tpbmRleF0pO1xuICByZXR1cm4gc3RlcCgwLCBbaW5kZXgsIE9baW5kZXhdXSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJSAoOS40LjQuNiwgOS40LjQuNylcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbmFkZFRvVW5zY29wYWJsZXMoJ2tleXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ3ZhbHVlcycpO1xuYWRkVG9VbnNjb3BhYmxlcygnZW50cmllcycpO1xuIiwiLy8gMTkuMS4zLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSlcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GLCAnT2JqZWN0JywgeyBhc3NpZ246IHJlcXVpcmUoJy4vX29iamVjdC1hc3NpZ24nKSB9KTtcbiIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSwgJ09iamVjdCcsIHsgZGVmaW5lUHJvcGVydHk6IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmYgfSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbnZhciBhbkluc3RhbmNlID0gcmVxdWlyZSgnLi9fYW4taW5zdGFuY2UnKTtcbnZhciBmb3JPZiA9IHJlcXVpcmUoJy4vX2Zvci1vZicpO1xudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX3NwZWNpZXMtY29uc3RydWN0b3InKTtcbnZhciB0YXNrID0gcmVxdWlyZSgnLi9fdGFzaycpLnNldDtcbnZhciBtaWNyb3Rhc2sgPSByZXF1aXJlKCcuL19taWNyb3Rhc2snKSgpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlID0gcmVxdWlyZSgnLi9fbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xudmFyIHBlcmZvcm0gPSByZXF1aXJlKCcuL19wZXJmb3JtJyk7XG52YXIgdXNlckFnZW50ID0gcmVxdWlyZSgnLi9fdXNlci1hZ2VudCcpO1xudmFyIHByb21pc2VSZXNvbHZlID0gcmVxdWlyZSgnLi9fcHJvbWlzZS1yZXNvbHZlJyk7XG52YXIgUFJPTUlTRSA9ICdQcm9taXNlJztcbnZhciBUeXBlRXJyb3IgPSBnbG9iYWwuVHlwZUVycm9yO1xudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciB2ZXJzaW9ucyA9IHByb2Nlc3MgJiYgcHJvY2Vzcy52ZXJzaW9ucztcbnZhciB2OCA9IHZlcnNpb25zICYmIHZlcnNpb25zLnY4IHx8ICcnO1xudmFyICRQcm9taXNlID0gZ2xvYmFsW1BST01JU0VdO1xudmFyIGlzTm9kZSA9IGNsYXNzb2YocHJvY2VzcykgPT0gJ3Byb2Nlc3MnO1xudmFyIGVtcHR5ID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xudmFyIEludGVybmFsLCBuZXdHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHksIE93blByb21pc2VDYXBhYmlsaXR5LCBXcmFwcGVyO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUuZjtcblxudmFyIFVTRV9OQVRJVkUgPSAhIWZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICAvLyBjb3JyZWN0IHN1YmNsYXNzaW5nIHdpdGggQEBzcGVjaWVzIHN1cHBvcnRcbiAgICB2YXIgcHJvbWlzZSA9ICRQcm9taXNlLnJlc29sdmUoMSk7XG4gICAgdmFyIEZha2VQcm9taXNlID0gKHByb21pc2UuY29uc3RydWN0b3IgPSB7fSlbcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKV0gPSBmdW5jdGlvbiAoZXhlYykge1xuICAgICAgZXhlYyhlbXB0eSwgZW1wdHkpO1xuICAgIH07XG4gICAgLy8gdW5oYW5kbGVkIHJlamVjdGlvbnMgdHJhY2tpbmcgc3VwcG9ydCwgTm9kZUpTIFByb21pc2Ugd2l0aG91dCBpdCBmYWlscyBAQHNwZWNpZXMgdGVzdFxuICAgIHJldHVybiAoaXNOb2RlIHx8IHR5cGVvZiBQcm9taXNlUmVqZWN0aW9uRXZlbnQgPT0gJ2Z1bmN0aW9uJylcbiAgICAgICYmIHByb21pc2UudGhlbihlbXB0eSkgaW5zdGFuY2VvZiBGYWtlUHJvbWlzZVxuICAgICAgLy8gdjggNi42IChOb2RlIDEwIGFuZCBDaHJvbWUgNjYpIGhhdmUgYSBidWcgd2l0aCByZXNvbHZpbmcgY3VzdG9tIHRoZW5hYmxlc1xuICAgICAgLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9ODMwNTY1XG4gICAgICAvLyB3ZSBjYW4ndCBkZXRlY3QgaXQgc3luY2hyb25vdXNseSwgc28ganVzdCBjaGVjayB2ZXJzaW9uc1xuICAgICAgJiYgdjguaW5kZXhPZignNi42JykgIT09IDBcbiAgICAgICYmIHVzZXJBZ2VudC5pbmRleE9mKCdDaHJvbWUvNjYnKSA9PT0gLTE7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxufSgpO1xuXG4vLyBoZWxwZXJzXG52YXIgaXNUaGVuYWJsZSA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgdGhlbjtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiB0eXBlb2YgKHRoZW4gPSBpdC50aGVuKSA9PSAnZnVuY3Rpb24nID8gdGhlbiA6IGZhbHNlO1xufTtcbnZhciBub3RpZnkgPSBmdW5jdGlvbiAocHJvbWlzZSwgaXNSZWplY3QpIHtcbiAgaWYgKHByb21pc2UuX24pIHJldHVybjtcbiAgcHJvbWlzZS5fbiA9IHRydWU7XG4gIHZhciBjaGFpbiA9IHByb21pc2UuX2M7XG4gIG1pY3JvdGFzayhmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZhbHVlID0gcHJvbWlzZS5fdjtcbiAgICB2YXIgb2sgPSBwcm9taXNlLl9zID09IDE7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBydW4gPSBmdW5jdGlvbiAocmVhY3Rpb24pIHtcbiAgICAgIHZhciBoYW5kbGVyID0gb2sgPyByZWFjdGlvbi5vayA6IHJlYWN0aW9uLmZhaWw7XG4gICAgICB2YXIgcmVzb2x2ZSA9IHJlYWN0aW9uLnJlc29sdmU7XG4gICAgICB2YXIgcmVqZWN0ID0gcmVhY3Rpb24ucmVqZWN0O1xuICAgICAgdmFyIGRvbWFpbiA9IHJlYWN0aW9uLmRvbWFpbjtcbiAgICAgIHZhciByZXN1bHQsIHRoZW4sIGV4aXRlZDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICAgICAgaWYgKCFvaykge1xuICAgICAgICAgICAgaWYgKHByb21pc2UuX2ggPT0gMikgb25IYW5kbGVVbmhhbmRsZWQocHJvbWlzZSk7XG4gICAgICAgICAgICBwcm9taXNlLl9oID0gMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGhhbmRsZXIgPT09IHRydWUpIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGRvbWFpbikgZG9tYWluLmVudGVyKCk7XG4gICAgICAgICAgICByZXN1bHQgPSBoYW5kbGVyKHZhbHVlKTsgLy8gbWF5IHRocm93XG4gICAgICAgICAgICBpZiAoZG9tYWluKSB7XG4gICAgICAgICAgICAgIGRvbWFpbi5leGl0KCk7XG4gICAgICAgICAgICAgIGV4aXRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChyZXN1bHQgPT09IHJlYWN0aW9uLnByb21pc2UpIHtcbiAgICAgICAgICAgIHJlamVjdChUeXBlRXJyb3IoJ1Byb21pc2UtY2hhaW4gY3ljbGUnKSk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGVuID0gaXNUaGVuYWJsZShyZXN1bHQpKSB7XG4gICAgICAgICAgICB0aGVuLmNhbGwocmVzdWx0LCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0gZWxzZSByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0gZWxzZSByZWplY3QodmFsdWUpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoZG9tYWluICYmICFleGl0ZWQpIGRvbWFpbi5leGl0KCk7XG4gICAgICAgIHJlamVjdChlKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHdoaWxlIChjaGFpbi5sZW5ndGggPiBpKSBydW4oY2hhaW5baSsrXSk7IC8vIHZhcmlhYmxlIGxlbmd0aCAtIGNhbid0IHVzZSBmb3JFYWNoXG4gICAgcHJvbWlzZS5fYyA9IFtdO1xuICAgIHByb21pc2UuX24gPSBmYWxzZTtcbiAgICBpZiAoaXNSZWplY3QgJiYgIXByb21pc2UuX2gpIG9uVW5oYW5kbGVkKHByb21pc2UpO1xuICB9KTtcbn07XG52YXIgb25VbmhhbmRsZWQgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xuICB0YXNrLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZhbHVlID0gcHJvbWlzZS5fdjtcbiAgICB2YXIgdW5oYW5kbGVkID0gaXNVbmhhbmRsZWQocHJvbWlzZSk7XG4gICAgdmFyIHJlc3VsdCwgaGFuZGxlciwgY29uc29sZTtcbiAgICBpZiAodW5oYW5kbGVkKSB7XG4gICAgICByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGlzTm9kZSkge1xuICAgICAgICAgIHByb2Nlc3MuZW1pdCgndW5oYW5kbGVkUmVqZWN0aW9uJywgdmFsdWUsIHByb21pc2UpO1xuICAgICAgICB9IGVsc2UgaWYgKGhhbmRsZXIgPSBnbG9iYWwub251bmhhbmRsZWRyZWplY3Rpb24pIHtcbiAgICAgICAgICBoYW5kbGVyKHsgcHJvbWlzZTogcHJvbWlzZSwgcmVhc29uOiB2YWx1ZSB9KTtcbiAgICAgICAgfSBlbHNlIGlmICgoY29uc29sZSA9IGdsb2JhbC5jb25zb2xlKSAmJiBjb25zb2xlLmVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignVW5oYW5kbGVkIHByb21pc2UgcmVqZWN0aW9uJywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIEJyb3dzZXJzIHNob3VsZCBub3QgdHJpZ2dlciBgcmVqZWN0aW9uSGFuZGxlZGAgZXZlbnQgaWYgaXQgd2FzIGhhbmRsZWQgaGVyZSwgTm9kZUpTIC0gc2hvdWxkXG4gICAgICBwcm9taXNlLl9oID0gaXNOb2RlIHx8IGlzVW5oYW5kbGVkKHByb21pc2UpID8gMiA6IDE7XG4gICAgfSBwcm9taXNlLl9hID0gdW5kZWZpbmVkO1xuICAgIGlmICh1bmhhbmRsZWQgJiYgcmVzdWx0LmUpIHRocm93IHJlc3VsdC52O1xuICB9KTtcbn07XG52YXIgaXNVbmhhbmRsZWQgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xuICByZXR1cm4gcHJvbWlzZS5faCAhPT0gMSAmJiAocHJvbWlzZS5fYSB8fCBwcm9taXNlLl9jKS5sZW5ndGggPT09IDA7XG59O1xudmFyIG9uSGFuZGxlVW5oYW5kbGVkID0gZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgdGFzay5jYWxsKGdsb2JhbCwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBoYW5kbGVyO1xuICAgIGlmIChpc05vZGUpIHtcbiAgICAgIHByb2Nlc3MuZW1pdCgncmVqZWN0aW9uSGFuZGxlZCcsIHByb21pc2UpO1xuICAgIH0gZWxzZSBpZiAoaGFuZGxlciA9IGdsb2JhbC5vbnJlamVjdGlvbmhhbmRsZWQpIHtcbiAgICAgIGhhbmRsZXIoeyBwcm9taXNlOiBwcm9taXNlLCByZWFzb246IHByb21pc2UuX3YgfSk7XG4gICAgfVxuICB9KTtcbn07XG52YXIgJHJlamVjdCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gIGlmIChwcm9taXNlLl9kKSByZXR1cm47XG4gIHByb21pc2UuX2QgPSB0cnVlO1xuICBwcm9taXNlID0gcHJvbWlzZS5fdyB8fCBwcm9taXNlOyAvLyB1bndyYXBcbiAgcHJvbWlzZS5fdiA9IHZhbHVlO1xuICBwcm9taXNlLl9zID0gMjtcbiAgaWYgKCFwcm9taXNlLl9hKSBwcm9taXNlLl9hID0gcHJvbWlzZS5fYy5zbGljZSgpO1xuICBub3RpZnkocHJvbWlzZSwgdHJ1ZSk7XG59O1xudmFyICRyZXNvbHZlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHZhciBwcm9taXNlID0gdGhpcztcbiAgdmFyIHRoZW47XG4gIGlmIChwcm9taXNlLl9kKSByZXR1cm47XG4gIHByb21pc2UuX2QgPSB0cnVlO1xuICBwcm9taXNlID0gcHJvbWlzZS5fdyB8fCBwcm9taXNlOyAvLyB1bndyYXBcbiAgdHJ5IHtcbiAgICBpZiAocHJvbWlzZSA9PT0gdmFsdWUpIHRocm93IFR5cGVFcnJvcihcIlByb21pc2UgY2FuJ3QgYmUgcmVzb2x2ZWQgaXRzZWxmXCIpO1xuICAgIGlmICh0aGVuID0gaXNUaGVuYWJsZSh2YWx1ZSkpIHtcbiAgICAgIG1pY3JvdGFzayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB3cmFwcGVyID0geyBfdzogcHJvbWlzZSwgX2Q6IGZhbHNlIH07IC8vIHdyYXBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGVuLmNhbGwodmFsdWUsIGN0eCgkcmVzb2x2ZSwgd3JhcHBlciwgMSksIGN0eCgkcmVqZWN0LCB3cmFwcGVyLCAxKSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAkcmVqZWN0LmNhbGwod3JhcHBlciwgZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9taXNlLl92ID0gdmFsdWU7XG4gICAgICBwcm9taXNlLl9zID0gMTtcbiAgICAgIG5vdGlmeShwcm9taXNlLCBmYWxzZSk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgJHJlamVjdC5jYWxsKHsgX3c6IHByb21pc2UsIF9kOiBmYWxzZSB9LCBlKTsgLy8gd3JhcFxuICB9XG59O1xuXG4vLyBjb25zdHJ1Y3RvciBwb2x5ZmlsbFxuaWYgKCFVU0VfTkFUSVZFKSB7XG4gIC8vIDI1LjQuMy4xIFByb21pc2UoZXhlY3V0b3IpXG4gICRQcm9taXNlID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcikge1xuICAgIGFuSW5zdGFuY2UodGhpcywgJFByb21pc2UsIFBST01JU0UsICdfaCcpO1xuICAgIGFGdW5jdGlvbihleGVjdXRvcik7XG4gICAgSW50ZXJuYWwuY2FsbCh0aGlzKTtcbiAgICB0cnkge1xuICAgICAgZXhlY3V0b3IoY3R4KCRyZXNvbHZlLCB0aGlzLCAxKSwgY3R4KCRyZWplY3QsIHRoaXMsIDEpKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICRyZWplY3QuY2FsbCh0aGlzLCBlcnIpO1xuICAgIH1cbiAgfTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gIEludGVybmFsID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcikge1xuICAgIHRoaXMuX2MgPSBbXTsgICAgICAgICAgICAgLy8gPC0gYXdhaXRpbmcgcmVhY3Rpb25zXG4gICAgdGhpcy5fYSA9IHVuZGVmaW5lZDsgICAgICAvLyA8LSBjaGVja2VkIGluIGlzVW5oYW5kbGVkIHJlYWN0aW9uc1xuICAgIHRoaXMuX3MgPSAwOyAgICAgICAgICAgICAgLy8gPC0gc3RhdGVcbiAgICB0aGlzLl9kID0gZmFsc2U7ICAgICAgICAgIC8vIDwtIGRvbmVcbiAgICB0aGlzLl92ID0gdW5kZWZpbmVkOyAgICAgIC8vIDwtIHZhbHVlXG4gICAgdGhpcy5faCA9IDA7ICAgICAgICAgICAgICAvLyA8LSByZWplY3Rpb24gc3RhdGUsIDAgLSBkZWZhdWx0LCAxIC0gaGFuZGxlZCwgMiAtIHVuaGFuZGxlZFxuICAgIHRoaXMuX24gPSBmYWxzZTsgICAgICAgICAgLy8gPC0gbm90aWZ5XG4gIH07XG4gIEludGVybmFsLnByb3RvdHlwZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lLWFsbCcpKCRQcm9taXNlLnByb3RvdHlwZSwge1xuICAgIC8vIDI1LjQuNS4zIFByb21pc2UucHJvdG90eXBlLnRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpXG4gICAgdGhlbjogZnVuY3Rpb24gdGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICAgICAgdmFyIHJlYWN0aW9uID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoc3BlY2llc0NvbnN0cnVjdG9yKHRoaXMsICRQcm9taXNlKSk7XG4gICAgICByZWFjdGlvbi5vayA9IHR5cGVvZiBvbkZ1bGZpbGxlZCA9PSAnZnVuY3Rpb24nID8gb25GdWxmaWxsZWQgOiB0cnVlO1xuICAgICAgcmVhY3Rpb24uZmFpbCA9IHR5cGVvZiBvblJlamVjdGVkID09ICdmdW5jdGlvbicgJiYgb25SZWplY3RlZDtcbiAgICAgIHJlYWN0aW9uLmRvbWFpbiA9IGlzTm9kZSA/IHByb2Nlc3MuZG9tYWluIDogdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fYy5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmICh0aGlzLl9hKSB0aGlzLl9hLnB1c2gocmVhY3Rpb24pO1xuICAgICAgaWYgKHRoaXMuX3MpIG5vdGlmeSh0aGlzLCBmYWxzZSk7XG4gICAgICByZXR1cm4gcmVhY3Rpb24ucHJvbWlzZTtcbiAgICB9LFxuICAgIC8vIDI1LjQuNS4xIFByb21pc2UucHJvdG90eXBlLmNhdGNoKG9uUmVqZWN0ZWQpXG4gICAgJ2NhdGNoJzogZnVuY3Rpb24gKG9uUmVqZWN0ZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBvblJlamVjdGVkKTtcbiAgICB9XG4gIH0pO1xuICBPd25Qcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBJbnRlcm5hbCgpO1xuICAgIHRoaXMucHJvbWlzZSA9IHByb21pc2U7XG4gICAgdGhpcy5yZXNvbHZlID0gY3R4KCRyZXNvbHZlLCBwcm9taXNlLCAxKTtcbiAgICB0aGlzLnJlamVjdCA9IGN0eCgkcmVqZWN0LCBwcm9taXNlLCAxKTtcbiAgfTtcbiAgbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUuZiA9IG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24gKEMpIHtcbiAgICByZXR1cm4gQyA9PT0gJFByb21pc2UgfHwgQyA9PT0gV3JhcHBlclxuICAgICAgPyBuZXcgT3duUHJvbWlzZUNhcGFiaWxpdHkoQylcbiAgICAgIDogbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICB9O1xufVxuXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCB7IFByb21pc2U6ICRQcm9taXNlIH0pO1xucmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKSgkUHJvbWlzZSwgUFJPTUlTRSk7XG5yZXF1aXJlKCcuL19zZXQtc3BlY2llcycpKFBST01JU0UpO1xuV3JhcHBlciA9IHJlcXVpcmUoJy4vX2NvcmUnKVtQUk9NSVNFXTtcblxuLy8gc3RhdGljc1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNSBQcm9taXNlLnJlamVjdChyKVxuICByZWplY3Q6IGZ1bmN0aW9uIHJlamVjdChyKSB7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSh0aGlzKTtcbiAgICB2YXIgJCRyZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICAkJHJlamVjdChyKTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTtcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKExJQlJBUlkgfHwgIVVTRV9OQVRJVkUpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC42IFByb21pc2UucmVzb2x2ZSh4KVxuICByZXNvbHZlOiBmdW5jdGlvbiByZXNvbHZlKHgpIHtcbiAgICByZXR1cm4gcHJvbWlzZVJlc29sdmUoTElCUkFSWSAmJiB0aGlzID09PSBXcmFwcGVyID8gJFByb21pc2UgOiB0aGlzLCB4KTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICEoVVNFX05BVElWRSAmJiByZXF1aXJlKCcuL19pdGVyLWRldGVjdCcpKGZ1bmN0aW9uIChpdGVyKSB7XG4gICRQcm9taXNlLmFsbChpdGVyKVsnY2F0Y2gnXShlbXB0eSk7XG59KSksIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjEgUHJvbWlzZS5hbGwoaXRlcmFibGUpXG4gIGFsbDogZnVuY3Rpb24gYWxsKGl0ZXJhYmxlKSB7XG4gICAgdmFyIEMgPSB0aGlzO1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoQyk7XG4gICAgdmFyIHJlc29sdmUgPSBjYXBhYmlsaXR5LnJlc29sdmU7XG4gICAgdmFyIHJlamVjdCA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICB2YXIgcmVtYWluaW5nID0gMTtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgICAgICAgdmFyICRpbmRleCA9IGluZGV4Kys7XG4gICAgICAgIHZhciBhbHJlYWR5Q2FsbGVkID0gZmFsc2U7XG4gICAgICAgIHZhbHVlcy5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgIHJlbWFpbmluZysrO1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICBpZiAoYWxyZWFkeUNhbGxlZCkgcmV0dXJuO1xuICAgICAgICAgIGFscmVhZHlDYWxsZWQgPSB0cnVlO1xuICAgICAgICAgIHZhbHVlc1skaW5kZXhdID0gdmFsdWU7XG4gICAgICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgICAgICB9LCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgICAtLXJlbWFpbmluZyB8fCByZXNvbHZlKHZhbHVlcyk7XG4gICAgfSk7XG4gICAgaWYgKHJlc3VsdC5lKSByZWplY3QocmVzdWx0LnYpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH0sXG4gIC8vIDI1LjQuNC40IFByb21pc2UucmFjZShpdGVyYWJsZSlcbiAgcmFjZTogZnVuY3Rpb24gcmFjZShpdGVyYWJsZSkge1xuICAgIHZhciBDID0gdGhpcztcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICAgIHZhciByZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKGNhcGFiaWxpdHkucmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuZSkgcmVqZWN0KHJlc3VsdC52KTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkYXQgPSByZXF1aXJlKCcuL19zdHJpbmctYXQnKSh0cnVlKTtcblxuLy8gMjEuMS4zLjI3IFN0cmluZy5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShTdHJpbmcsICdTdHJpbmcnLCBmdW5jdGlvbiAoaXRlcmF0ZWQpIHtcbiAgdGhpcy5fdCA9IFN0cmluZyhpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuLy8gMjEuMS41LjIuMSAlU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24gKCkge1xuICB2YXIgTyA9IHRoaXMuX3Q7XG4gIHZhciBpbmRleCA9IHRoaXMuX2k7XG4gIHZhciBwb2ludDtcbiAgaWYgKGluZGV4ID49IE8ubGVuZ3RoKSByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIHBvaW50ID0gJGF0KE8sIGluZGV4KTtcbiAgdGhpcy5faSArPSBwb2ludC5sZW5ndGg7XG4gIHJldHVybiB7IHZhbHVlOiBwb2ludCwgZG9uZTogZmFsc2UgfTtcbn0pO1xuIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtcHJvbWlzZS1maW5hbGx5XG4ndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi9fc3BlY2llcy1jb25zdHJ1Y3RvcicpO1xudmFyIHByb21pc2VSZXNvbHZlID0gcmVxdWlyZSgnLi9fcHJvbWlzZS1yZXNvbHZlJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5SLCAnUHJvbWlzZScsIHsgJ2ZpbmFsbHknOiBmdW5jdGlvbiAob25GaW5hbGx5KSB7XG4gIHZhciBDID0gc3BlY2llc0NvbnN0cnVjdG9yKHRoaXMsIGNvcmUuUHJvbWlzZSB8fCBnbG9iYWwuUHJvbWlzZSk7XG4gIHZhciBpc0Z1bmN0aW9uID0gdHlwZW9mIG9uRmluYWxseSA9PSAnZnVuY3Rpb24nO1xuICByZXR1cm4gdGhpcy50aGVuKFxuICAgIGlzRnVuY3Rpb24gPyBmdW5jdGlvbiAoeCkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlKEMsIG9uRmluYWxseSgpKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHg7IH0pO1xuICAgIH0gOiBvbkZpbmFsbHksXG4gICAgaXNGdW5jdGlvbiA/IGZ1bmN0aW9uIChlKSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmUoQywgb25GaW5hbGx5KCkpLnRoZW4oZnVuY3Rpb24gKCkgeyB0aHJvdyBlOyB9KTtcbiAgICB9IDogb25GaW5hbGx5XG4gICk7XG59IH0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtcHJvbWlzZS10cnlcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSByZXF1aXJlKCcuL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5Jyk7XG52YXIgcGVyZm9ybSA9IHJlcXVpcmUoJy4vX3BlcmZvcm0nKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdQcm9taXNlJywgeyAndHJ5JzogZnVuY3Rpb24gKGNhbGxiYWNrZm4pIHtcbiAgdmFyIHByb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkuZih0aGlzKTtcbiAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oY2FsbGJhY2tmbik7XG4gIChyZXN1bHQuZSA/IHByb21pc2VDYXBhYmlsaXR5LnJlamVjdCA6IHByb21pc2VDYXBhYmlsaXR5LnJlc29sdmUpKHJlc3VsdC52KTtcbiAgcmV0dXJuIHByb21pc2VDYXBhYmlsaXR5LnByb21pc2U7XG59IH0pO1xuIiwicmVxdWlyZSgnLi9lczYuYXJyYXkuaXRlcmF0b3InKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyIFRPX1NUUklOR19UQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxudmFyIERPTUl0ZXJhYmxlcyA9ICgnQ1NTUnVsZUxpc3QsQ1NTU3R5bGVEZWNsYXJhdGlvbixDU1NWYWx1ZUxpc3QsQ2xpZW50UmVjdExpc3QsRE9NUmVjdExpc3QsRE9NU3RyaW5nTGlzdCwnICtcbiAgJ0RPTVRva2VuTGlzdCxEYXRhVHJhbnNmZXJJdGVtTGlzdCxGaWxlTGlzdCxIVE1MQWxsQ29sbGVjdGlvbixIVE1MQ29sbGVjdGlvbixIVE1MRm9ybUVsZW1lbnQsSFRNTFNlbGVjdEVsZW1lbnQsJyArXG4gICdNZWRpYUxpc3QsTWltZVR5cGVBcnJheSxOYW1lZE5vZGVNYXAsTm9kZUxpc3QsUGFpbnRSZXF1ZXN0TGlzdCxQbHVnaW4sUGx1Z2luQXJyYXksU1ZHTGVuZ3RoTGlzdCxTVkdOdW1iZXJMaXN0LCcgK1xuICAnU1ZHUGF0aFNlZ0xpc3QsU1ZHUG9pbnRMaXN0LFNWR1N0cmluZ0xpc3QsU1ZHVHJhbnNmb3JtTGlzdCxTb3VyY2VCdWZmZXJMaXN0LFN0eWxlU2hlZXRMaXN0LFRleHRUcmFja0N1ZUxpc3QsJyArXG4gICdUZXh0VHJhY2tMaXN0LFRvdWNoTGlzdCcpLnNwbGl0KCcsJyk7XG5cbmZvciAodmFyIGkgPSAwOyBpIDwgRE9NSXRlcmFibGVzLmxlbmd0aDsgaSsrKSB7XG4gIHZhciBOQU1FID0gRE9NSXRlcmFibGVzW2ldO1xuICB2YXIgQ29sbGVjdGlvbiA9IGdsb2JhbFtOQU1FXTtcbiAgdmFyIHByb3RvID0gQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZTtcbiAgaWYgKHByb3RvICYmICFwcm90b1tUT19TVFJJTkdfVEFHXSkgaGlkZShwcm90bywgVE9fU1RSSU5HX1RBRywgTkFNRSk7XG4gIEl0ZXJhdG9yc1tOQU1FXSA9IEl0ZXJhdG9ycy5BcnJheTtcbn1cbiIsImltcG9ydCBzb2NrZXQgZnJvbSAnL1VzZXJzL21vY2hpbmkvV29ya3NwYWNlL21haGFwbGF0Zm9ybS5jb20vYXBwcy9tYWhhL3NyYy9jb3JlL2VudGl0aWVzL3NvY2tldC5qcydcbmltcG9ydCBjaGF0QXBwIGZyb20gJy9Vc2Vycy9tb2NoaW5pL1dvcmtzcGFjZS9tYWhhcGxhdGZvcm0uY29tL2FwcHMvbWFoYS1jaGF0L3NyYy9hcHAuanMnXG5pbXBvcnQgY29tcGV0ZW5jaWVzQXBwIGZyb20gJy9Vc2Vycy9tb2NoaW5pL1dvcmtzcGFjZS9tYWhhcGxhdGZvcm0uY29tL2FwcHMvbWFoYS1jb21wZXRlbmNpZXMvc3JjL2FwcC5qcydcbmltcG9ydCBjcm1BcHAgZnJvbSAnL1VzZXJzL21vY2hpbmkvV29ya3NwYWNlL21haGFwbGF0Zm9ybS5jb20vYXBwcy9tYWhhLWNybS9zcmMvYXBwLmpzJ1xuaW1wb3J0IGRyaXZlQXBwIGZyb20gJy9Vc2Vycy9tb2NoaW5pL1dvcmtzcGFjZS9tYWhhcGxhdGZvcm0uY29tL2FwcHMvbWFoYS1kcml2ZS9zcmMvYXBwLmpzJ1xuaW1wb3J0IGVhdGZyZXNoQXBwIGZyb20gJy9Vc2Vycy9tb2NoaW5pL1dvcmtzcGFjZS9tYWhhcGxhdGZvcm0uY29tL2FwcHMvbWFoYS1lYXRmcmVzaC9zcmMvYXBwLmpzJ1xuaW1wb3J0IGV4cGVuc2VzQXBwIGZyb20gJy9Vc2Vycy9tb2NoaW5pL1dvcmtzcGFjZS9tYWhhcGxhdGZvcm0uY29tL2FwcHMvbWFoYS1leHBlbnNlcy9zcmMvYXBwLmpzJ1xuaW1wb3J0IHBsYXRmb3JtQXBwIGZyb20gJy9Vc2Vycy9tb2NoaW5pL1dvcmtzcGFjZS9tYWhhcGxhdGZvcm0uY29tL2FwcHMvbWFoYS1wbGF0Zm9ybS9zcmMvYXBwLmpzJ1xuaW1wb3J0IHRlYW1BcHAgZnJvbSAnL1VzZXJzL21vY2hpbmkvV29ya3NwYWNlL21haGFwbGF0Zm9ybS5jb20vYXBwcy9tYWhhLXRlYW0vc3JjL2FwcC5qcydcbmltcG9ydCBtYWhhQXBwIGZyb20gJy9Vc2Vycy9tb2NoaW5pL1dvcmtzcGFjZS9tYWhhcGxhdGZvcm0uY29tL2FwcHMvbWFoYS9zcmMvYXBwLmpzJ1xuaW1wb3J0IGNoYXRTb2NrZXQgZnJvbSAnL1VzZXJzL21vY2hpbmkvV29ya3NwYWNlL21haGFwbGF0Zm9ybS5jb20vYXBwcy9tYWhhLWNoYXQvc3JjL2FkbWluL3NvY2tldC5qcydcbmltcG9ydCBldmVudHMgZnJvbSAnZXZlbnRzJ1xuXG5ldmVudHMuRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAwXG5cbnNvY2tldCgpXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhd3Mtc2RrXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhY2tmcmFtZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiY3J5cHQtbm9kZWpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJsdWViaXJkXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvb2tzaGVsZlwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJidWxsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoYWxrXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoZWNraXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2hlZXJpb1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjaGlsZF9wcm9jZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVqc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJldmVudHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJnZXQtdXJsc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJnbG9iXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0bWwtZW1haWwtdG8tdGV4dFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImlubGluZS1jc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaW9yZWRpc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJqaW1wXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpzb253ZWJ0b2tlblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJrbmV4XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImxvZGFzaFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYWlscGFyc2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1pbWUtdHlwZXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWtkaXJwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vbWVudFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlbWFpbGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm51bWVyYWxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwib3Blbi1ncmFwaFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJvc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBsdXJhbGl6ZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWRpc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWRpcy1sb2NrXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZ2VuZXJhdG9yLXJ1bnRpbWVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVxdWVzdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZXF1ZXN0LXByb21pc2VcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic29ja2V0LmlvXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNvY2tldC5pby1lbWl0dGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNvY2tldC5pby1yZWRpc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdHJlYW1cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXJsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInV0aWxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2ViLXB1c2hcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2Vic2hvdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3cmFwLWFuc2lcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==