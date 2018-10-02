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
/******/ 	return __webpack_require__(__webpack_require__.s = "./tmp/cron.js");
/******/ })
/************************************************************************/
/******/ ({

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

/***/ "./apps/maha/src/core/entities/cron.js":
/*!*********************************************!*\
  !*** ./apps/maha/src/core/entities/cron.js ***!
  \*********************************************/
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

var _collect_objects = __webpack_require__(/*! ../../core/utils/collect_objects */ "./apps/maha/src/core/utils/collect_objects.js");

var _collect_objects2 = _interopRequireDefault(_collect_objects);

var _console = __webpack_require__(/*! ../../core/utils/console */ "./apps/maha/src/core/utils/console.js");

var _later = __webpack_require__(/*! later */ "later");

var _later2 = _interopRequireDefault(_later);

var _chalk = __webpack_require__(/*! chalk */ "chalk");

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
  var cronFiles;
  return _regenerator2.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          cronFiles = (0, _collect_objects2.default)('cron/*');
          _context2.next = 3;
          return (0, _bluebird.map)(cronFiles, function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(cronFile) {
              var cron, schedule;
              return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      cron = cronFile.default;


                      (0, _console.writePaddedLine)(_chalk2.default.grey('Starting ' + cron.name), '', '#FFFFFF', false);

                      schedule = _later2.default.parse.cron(cron.schedule, true);


                      _later2.default.setInterval(cron.handler, schedule);

                      (0, _console.writePaddedLine)(_chalk2.default.grey('Starting ' + cron.name), _chalk2.default.green('✔'), '#FFFFFF', true, true);

                    case 5:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee, undefined);
            }));

            return function (_x) {
              return _ref2.apply(this, arguments);
            };
          }());

        case 3:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, undefined);
}));

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

/***/ "./apps/maha/src/cron/notification_cron.js":
/*!*************************************************!*\
  !*** ./apps/maha/src/cron/notification_cron.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.afterCommit = exports.processor = undefined;

var _bluebird = __webpack_require__(/*! bluebird */ "bluebird");

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = __webpack_require__(/*! babel-runtime/helpers/defineProperty */ "./node_modules/babel-runtime/helpers/defineProperty.js");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = __webpack_require__(/*! babel-runtime/helpers/toConsumableArray */ "./node_modules/babel-runtime/helpers/toConsumableArray.js");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends3 = __webpack_require__(/*! babel-runtime/helpers/extends */ "./node_modules/babel-runtime/helpers/extends.js");

var _extends4 = _interopRequireDefault(_extends3);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "./node_modules/babel-runtime/helpers/asyncToGenerator.js");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _notification_serializer = __webpack_require__(/*! ../serializers/notification_serializer */ "./apps/maha/src/serializers/notification_serializer.js");

var _notification_serializer2 = _interopRequireDefault(_notification_serializer);

var _notification = __webpack_require__(/*! ../models/notification */ "./apps/maha/src/models/notification.js");

var _notification2 = _interopRequireDefault(_notification);

var _send_mail = __webpack_require__(/*! ../core/utils/send_mail */ "./apps/maha/src/core/utils/send_mail.js");

var _send_mail2 = _interopRequireDefault(_send_mail);

var _emitter = __webpack_require__(/*! ../core/services/emitter */ "./apps/maha/src/core/services/emitter.js");

var _emitter2 = _interopRequireDefault(_emitter);

var _knex = __webpack_require__(/*! ../core/services/knex */ "./apps/maha/src/core/services/knex.js");

var _knex2 = _interopRequireDefault(_knex);

var _cron = __webpack_require__(/*! ../core/objects/cron */ "./apps/maha/src/core/objects/cron.js");

var _cron2 = _interopRequireDefault(_cron);

var _pluralize = __webpack_require__(/*! pluralize */ "pluralize");

var _pluralize2 = _interopRequireDefault(_pluralize);

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

var mahaRoot = _path2.default.resolve('apps', 'maha', 'src');

var messageTemplate = _fs2.default.readFileSync(_path2.default.join(mahaRoot, 'emails', 'notification_email', 'html.ejs')).toString();

var envelopeTemplate = _fs2.default.readFileSync(_path2.default.join(mahaRoot, 'core', 'templates', 'envelope.ejs')).toString();

var host = "http://localhost:8080";

var processor = exports.processor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(trx) {
    var notification_method_id, notifications, serialized, users;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            notification_method_id = 2;
            _context2.next = 3;
            return _notification2.default.query(function (qb) {

              qb.joinRaw('inner join "maha_users" on "maha_users"."id"="maha_notifications"."user_id" and "maha_users"."notification_method_id"=?', notification_method_id);

              qb.where('maha_notifications.created_at', '<', (0, _moment2.default)().subtract(5, 'minutes'));

              qb.where('maha_notifications.is_delivered', false);

              qb.orderBy('created_at', 'desc');
            }).fetchAll({ withRelated: ['app', 'object_owner', 'subject.photo', 'story', 'team', 'user'], transacting: trx });

          case 3:
            notifications = _context2.sent;
            serialized = notifications.map(function (notification) {
              return (0, _notification_serializer2.default)(null, null, notification);
            });
            users = serialized.reduce(function (users, notification) {
              return (0, _extends4.default)({}, users, (0, _defineProperty3.default)({}, notification.user.id, {
                user: notification.user,
                notifications: [].concat((0, _toConsumableArray3.default)(_lodash2.default.get(users, '[' + notification.user.id + '].notifications') || []), [(0, _extends4.default)({}, notification, {
                  description: _getDescription(notification)
                })])
              }));
            }, []);
            _context2.next = 8;
            return (0, _bluebird.map)(Object.keys(users), function () {
              var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(user_id) {
                var user, content, html, email, ids;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        user = users[user_id].user;
                        content = _ejs2.default.render(messageTemplate, { moment: _moment2.default, pluralize: _pluralize2.default, host: host, notification_method_id: notification_method_id, user: user, notifications: users[user_id].notifications });
                        html = _ejs2.default.render(envelopeTemplate, { moment: _moment2.default, host: host, content: content });
                        email = {
                          from: notifications.toArray()[0].related('team').get('title') + ' <mailer@mahaplatform.com>',
                          to: user.rfc822,
                          subject: 'Here\'s what you\'ve missed!',
                          html: html,
                          list: {
                            unsubscribe: {
                              url: host + '#preferences',
                              comment: 'Unsubscribe'
                            }
                          }
                        };
                        _context.next = 6;
                        return (0, _send_mail2.default)(email);

                      case 6:
                        ids = users[user_id].notifications.slice(0, 6).map(function (notification) {
                          return notification.id;
                        });
                        _context.next = 9;
                        return (0, _knex2.default)('maha_notifications').transacting(trx).whereIn('id', ids).update({ is_delivered: true });

                      case 9:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x2) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 8:
            return _context2.abrupt('return', notifications.map(function (notification) {
              return notification;
            }));

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function processor(_x) {
    return _ref.apply(this, arguments);
  };
}();

var afterCommit = exports.afterCommit = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(trx, result) {
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _bluebird.map)(result, function () {
              var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(notification) {
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return _emitter2.default.in('/admin/users/' + notification.get('user_id')).emit('message', {
                          target: '/admin/users/' + notification.get('user_id'),
                          action: 'session',
                          data: null
                        });

                      case 2:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, undefined);
              }));

              return function (_x5) {
                return _ref4.apply(this, arguments);
              };
            }());

          case 2:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function afterCommit(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

var _getDescription = function _getDescription(notification) {

  return notification.story.replace('{object}', _getDescriptionArticle(notification) + ' ' + notification.object.type + ' <strong>' + notification.object.text + '</strong>');
};

var _getDescriptionArticle = function _getDescriptionArticle(notification) {

  if (notification.object.owner_id === notification.subject.id) return 'their';

  if (notification.object.owner_id === notification.user.id) return 'your';

  return 'the';
};

var digestCron = (0, _cron2.default)({
  name: 'notification',
  schedule: '0 0 2 * * *',
  processor: processor,
  afterCommit: afterCommit
});

exports.default = digestCron;

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

/***/ "./apps/maha/src/models/notification.js":
/*!**********************************************!*\
  !*** ./apps/maha/src/models/notification.js ***!
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

var _story = __webpack_require__(/*! ./story */ "./apps/maha/src/models/story.js");

var _story2 = _interopRequireDefault(_story);

var _user = __webpack_require__(/*! ./user */ "./apps/maha/src/models/user.js");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Notification = new _model2.default({

  tableName: 'maha_notifications',

  displayName: 'notification',

  rules: {
    user_id: ['required']
  },

  app: function app() {
    return this.belongsTo(_app2.default, 'app_id');
  },
  object_owner: function object_owner() {
    return this.belongsTo(_user2.default, 'object_owner_id');
  },
  subject: function subject() {
    return this.belongsTo(_user2.default, 'subject_id');
  },
  object: function object() {
    return this.morphTo('object', ['object_table', 'object_id']);
  },
  story: function story() {
    return this.belongsTo(_story2.default, 'story_id');
  },
  user: function user() {
    return this.belongsTo(_user2.default, 'user_id');
  }
});

exports.default = Notification;

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

/***/ "./apps/maha/src/serializers/notification_serializer.js":
/*!**************************************************************!*\
  !*** ./apps/maha/src/serializers/notification_serializer.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _serializer = __webpack_require__(/*! ../core/objects/serializer */ "./apps/maha/src/core/objects/serializer.js");

var _serializer2 = _interopRequireDefault(_serializer);

var _model_activities = __webpack_require__(/*! ../core/utils/model_activities */ "./apps/maha/src/core/utils/model_activities.js");

var _model_activities2 = _interopRequireDefault(_model_activities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var notificationSerializer = (0, _serializer2.default)(function (req, trx, result) {

  var user = userData(result.related('user'));

  var subject = userData(result.related('subject'));

  var object = objectData(result);

  var subject_text = subjectText(subject, user);

  var article_text = articleText(subject, object, user);

  var object_text = objectText(subject, object, user);

  var story = result.related('story').get('text');

  var description = [];

  if (subject_text) description.push(subject_text);

  description.push(story.replace('{object}', '' + article_text + object_text));

  return {

    id: result.get('id'),

    code: result.get('code'),

    url: result.get('url'),

    is_seen: result.get('is_seen'),

    is_visited: result.get('is_visited'),

    app: app(result.related('app')),

    user: user,

    subject: subject,

    object: object,

    subject_text: subject_text,

    article_text: article_text,

    story: story,

    object_text: object_text,

    description: description.join(' '),

    created_at: result.get('created_at'),

    updated_at: result.get('updated_at')

  };
});

var app = function app(_app) {
  return {

    id: _app.get('id'),

    title: _app.get('title'),

    color: _app.get('color'),

    icon: _app.get('icon')

  };
};

var userData = function userData(result) {

  if (!result.id) return null;

  return {

    id: result.get('id'),

    first_name: result.get('first_name'),

    last_name: result.get('last_name'),

    full_name: result.get('full_name'),

    initials: result.get('initials'),

    rfc822: result.get('rfc822'),

    photo: result.related('photo').get('path')

  };
};

var objectData = function objectData(result) {

  var model = (0, _model_activities2.default)(result.get('object_table'));

  if (!result.get('object_text')) return null;

  return {

    id: result.get('object_id'),

    owner_id: result.get('object_owner_id'),

    owner_full_name: result.related('object_owner').get('full_name'),

    type: model.displayName,

    text: result.get('object_text')

  };
};

var subjectText = function subjectText(subject, user) {

  if (!subject) return null;

  return subject.id === user.id ? 'You' : subject.full_name;
};

var articleText = function articleText(subject, object, user) {
  var type = object.type ? ' ' + object.type : '';
  if (object.owner_id === null) {
    return 'the' + type + ' ';
  } else if (object.owner_id === user.id && (subject.id !== object.owner_id || !object.id)) {
    return 'your' + type + ' ';
  } else if (object.owner_id !== user.id && subject.id !== object.owner_id) {
    return object.owner_full_name + '\'s' + type + ' ';
  } else if (object.owner_id !== user.id && object.owner_id === subject.id) {
    return 'their' + type + ' ';
  } else {
    return 'the' + type + ' ';
  }
};

var objectText = function objectText(subject, object, user) {
  if (object.type === 'user' && object.id === user.id) {
    return 'yourself';
  } else if (object.type === 'user' && object.id === subject.id) {
    return 'themself';
  }
  return object.text;
};

exports.default = notificationSerializer;

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

/***/ "./tmp/cron.js":
/*!*********************!*\
  !*** ./tmp/cron.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _cron = __webpack_require__(/*! ./apps/maha/src/core/entities/cron.js */ "./apps/maha/src/core/entities/cron.js");

var _cron2 = _interopRequireDefault(_cron);

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

var _notification_cron = __webpack_require__(/*! ./apps/maha/src/cron/notification_cron.js */ "./apps/maha/src/cron/notification_cron.js");

var _notification_cron2 = _interopRequireDefault(_notification_cron);

var _events = __webpack_require__(/*! events */ "events");

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_events2.default.EventEmitter.defaultMaxListeners = 0;

(0, _cron2.default)();

/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

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

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

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

/***/ "inline-css":
/*!*****************************!*\
  !*** external "inline-css" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("inline-css");

/***/ }),

/***/ "knex":
/*!***********************!*\
  !*** external "knex" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("knex");

/***/ }),

/***/ "later":
/*!************************!*\
  !*** external "later" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("later");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

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

/***/ "regenerator-runtime":
/*!**************************************!*\
  !*** external "regenerator-runtime" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ }),

/***/ "socket.io-emitter":
/*!************************************!*\
  !*** external "socket.io-emitter" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("socket.io-emitter");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("util");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhLWNoYXQvc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEtY29tcGV0ZW5jaWVzL3NyYy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhLWNybS9zcmMvYXBwLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS1kcml2ZS9zcmMvYXBwLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS1lYXRmcmVzaC9zcmMvYXBwLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS1leHBlbnNlcy9zcmMvYXBwLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS1wbGF0Zm9ybS9zcmMvYXBwLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS10ZWFtL3NyYy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9jb3JlL2VudGl0aWVzL2Nyb24uanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9jb3JlL29iamVjdHMvY3Jvbi5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL2NvcmUvb2JqZWN0cy9tb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL2NvcmUvb2JqZWN0cy9zZXJpYWxpemVyLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvY29yZS9zZXJ2aWNlcy9hd3MuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9jb3JlL3NlcnZpY2VzL2Jvb2tzaGVsZi5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL2NvcmUvc2VydmljZXMvZW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL2NvcmUvc2VydmljZXMva25leC5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL2NvcmUvc2VydmljZXMvc2VzLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvY29yZS91dGlscy9hcHBfY29uZmlnLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvY29yZS91dGlscy9jb2xsZWN0X29iamVjdHMuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9jb3JlL3V0aWxzL2NvbnNvbGUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9jb3JlL3V0aWxzL2xvZ2dlci5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL2NvcmUvdXRpbHMvbW9kZWxfYWN0aXZpdGllcy5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL2NvcmUvdXRpbHMvc2VuZF9tYWlsLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvY29yZS92YWxpZGF0aW9ucy9jdXJyZW5jeV92YWxpZGF0aW9uLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvY29yZS92YWxpZGF0aW9ucy9kYXRlc3RyaW5nX3ZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9jb3JlL3ZhbGlkYXRpb25zL2dyZWF0ZXJfdGhhbl9maWVsZF92YWxpZGF0aW9uLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvY29yZS92YWxpZGF0aW9ucy9sYXRlcl90aGFuX3ZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9jb3JlL3ZhbGlkYXRpb25zL3RpbWVfdmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL2NvcmUvdmFsaWRhdGlvbnMvdW5pcXVlX3ZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9jcm9uL25vdGlmaWNhdGlvbl9jcm9uLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvbW9kZWxzL2FjdGl2aXR5LmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvbW9kZWxzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL21vZGVscy9hcHBfYXV0aG9yLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvbW9kZWxzL2FwcF9jYXRlZ29yeS5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL21vZGVscy9hc3NldC5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL21vZGVscy9hc3NldF9zdGF0dXMuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9tb2RlbHMvYXR0YWNobWVudC5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL21vZGVscy9hdWRpdC5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL21vZGVscy9jb21tZW50LmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvbW9kZWxzL2RvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL21vZGVscy9ncm91cC5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL21vZGVscy9saWtlLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvbW9kZWxzL2xpc3RlbmluZy5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL21vZGVscy9ub3RpZmljYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9tb2RlbHMvbm90aWZpY2F0aW9uX21ldGhvZC5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL21vZGVscy9wcm9maWxlLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvbW9kZWxzL3Jldmlldy5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL21vZGVscy9yaWdodC5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL21vZGVscy9yb2xlLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvbW9kZWxzL3NlY3VyaXR5X3F1ZXN0aW9uLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvbW9kZWxzL3NlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9tb2RlbHMvc291cmNlLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvbW9kZWxzL3N0YXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9tb2RlbHMvc3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9tb2RlbHMvc3RyYXRlZ3kuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9tb2RlbHMvc3VwZXJ2aXNpb24uanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9tYWhhL3NyYy9tb2RlbHMvdGVhbS5qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL21haGEvc3JjL21vZGVscy91c2VyLmpzIiwid2VicGFjazovLy8uL2FwcHMvbWFoYS9zcmMvc2VyaWFsaXplcnMvbm90aWZpY2F0aW9uX3NlcmlhbGl6ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvaXMtaXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2V4dGVuZHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvdG9Db25zdW1hYmxlQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvcmVnZW5lcmF0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9hcnJheS9mcm9tLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vaXMtaXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYWRkLXRvLXVuc2NvcGFibGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4taW5zdGFuY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NsYXNzb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3JlYXRlLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Zvci1vZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19odG1sLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pbnZva2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtYXJyYXktaXRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY2FsbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY3JlYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRldGVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItc3RlcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXJhdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2xpYnJhcnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19taWNyb3Rhc2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHBzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ3BvLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wZXJmb3JtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvbWlzZS1yZXNvbHZlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLWFsbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXNwZWNpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zcGVjaWVzLWNvbnN0cnVjdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3RyaW5nLWF0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdGFzay5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWlvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191c2VyLWFnZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmlzLWl0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuZnJvbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5wcm9taXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcucHJvbWlzZS5maW5hbGx5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcucHJvbWlzZS50cnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vdG1wL2Nyb24uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXdzLXNka1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJjcnlwdC1ub2RlanNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJibHVlYmlyZFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJvb2tzaGVsZlwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNoYWxrXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY2hlY2tpdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImVqc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV2ZW50c1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZ2xvYlwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0bWwtZW1haWwtdG8tdGV4dFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImlubGluZS1jc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrbmV4XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibGF0ZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJsb2Rhc2hcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb21lbnRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJub2RlbWFpbGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInBsdXJhbGl6ZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZ2VuZXJhdG9yLXJ1bnRpbWVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzb2NrZXQuaW8tZW1pdHRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInV0aWxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3cmFwLWFuc2lcIiJdLCJuYW1lcyI6WyJhcHAiLCJjb2RlIiwidGl0bGUiLCJwYXRoIiwiY2F0ZWdvcnkiLCJhdXRob3IiLCJkZXNjcmlwdGlvbiIsInZlcnNpb24iLCJjb2xvciIsImljb24iLCJ3ZWlnaHQiLCJjcm9uRmlsZXMiLCJjcm9uRmlsZSIsImNyb24iLCJkZWZhdWx0IiwiY2hhbGsiLCJncmV5IiwibmFtZSIsInNjaGVkdWxlIiwibGF0ZXIiLCJwYXJzZSIsInNldEludGVydmFsIiwiaGFuZGxlciIsImdyZWVuIiwib3B0aW9ucyIsIndpdGhMb2dnZXIiLCJwcm9jZXNzb3IiLCJhZnRlckNvbW1pdCIsImJlZm9yZVJvbGxiYWNrIiwicmVxdWVzdElkIiwiXyIsInJhbmRvbSIsInRvU3RyaW5nIiwid2l0aFRyYW5zYWN0aW9uIiwia25leCIsInRyYW5zYWN0aW9uIiwidHJ4IiwicmVzdWx0IiwiY29tbWl0IiwiY29uc29sZSIsImxvZyIsInJvbGxiYWNrIiwiTW9kZWwiLCJib29rc2hlbGYiLCJleHRlbmQiLCJoYXNUaW1lc3RhbXBzIiwidGFibGVOYW1lIiwiZGlzcGxheU5hbWUiLCJkaXNwbGF5QXR0cmlidXRlIiwicnVsZXMiLCJ2aXJ0dWFscyIsImluaXRpYWxpemUiLCJhdHRycyIsIm9wdHMiLCJvbiIsInZhbGlkYXRlU2F2ZSIsImZldGNoIiwiZmV0Y2hPcHRpb25zIiwicHJvdG90eXBlIiwiY2FsbCIsIm1lcmdlT3B0aW9ucyIsImZldGNoQWxsIiwibW9kZWwiLCJzYXZlT3B0aW9ucyIsInNraXBWYWxpZGF0aW9uIiwiYmVsb25nc1RvVGVhbSIsIndpdGhSdWxlcyIsInRlYW1faWQiLCJDaGVja2l0IiwicnVuIiwiYXR0cmlidXRlcyIsImFjdGl2aXRpZXMiLCJBY3Rpdml0eSIsInJlcXVpcmUiLCJtb3JwaE1hbnkiLCJhdWRpdCIsIkF1ZGl0IiwiY29tbWVudHMiLCJDb21tZW50IiwibGlrZXMiLCJMaWtlIiwicXVlcnkiLCJxYiIsIndoZXJlTnVsbCIsImxpc3RlbmluZ3MiLCJMaXN0ZW5pbmciLCJyZXZpZXdzIiwiUmV2aWV3Iiwic3RhcnMiLCJTdGFyIiwidGVhbSIsIlRlYW0iLCJiZWxvbmdzVG8iLCJjb25maWciLCJ3aXRoUmVsYXRlZCIsImNvZXJjZUFycmF5IiwidmFsdWUiLCJpc05pbCIsImlzQXJyYXkiLCJzZXJpYWxpemVyIiwiYXdzIiwiY29uc3RydWN0b3IiLCJhY2Nlc3NLZXlJZCIsInByb2Nlc3MiLCJzZWNyZXRBY2Nlc3NLZXkiLCJBV1NfU0VDUkVUX0FDQ0VTU19LRVkiLCJyZWdpb24iLCJtb2R1bGUiLCJleHBvcnRzIiwicGx1Z2luIiwiZW1pdHRlciIsIm1hdGNoIiwidXJsIiwicHJvdG9jb2wiLCJnZXRDbGllbnQiLCJnZXRDb25uZWN0aW9uIiwiZ2V0UG9vbCIsImVudiIsIm1pbiIsIm1heCIsImNsaWVudCIsImNvbm5lY3Rpb24iLCJ1c2VOdWxsQXNEZWZhdWx0IiwicG9vbCIsIktuZXgiLCJTRVMiLCJhcGlWZXJzaW9uIiwibm9kZW1haWxlciIsImNyZWF0ZVRyYW5zcG9ydCIsImNvbmZpZ3MiLCJyZWR1Y2UiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwiYXBwQ29uZmlnIiwiY29sbGVjdE9iamVjdHMiLCJwYXR0ZXJuIiwiZ2xvYiIsInN5bmMiLCJtYXAiLCJmaWxlIiwid3JpdGVQYWRkZWRMaW5lIiwibGFiZWwiLCJ0ZXh0IiwiYmFja2dyb3VuZCIsIm5ld2xpbmUiLCJyZXdpbmQiLCJ3aWR0aCIsInN0ZG91dCIsImNvbHVtbnMiLCJsYWJlbFdpZHRoIiwic3RyaXBBbnNpIiwibGVuZ3RoIiwiY29udGVudFdpZHRoIiwicGFkZGVkIiwiaGFyZCIsInNwbGl0IiwiY2h1bmtMaW5lIiwiaW5kZXgiLCJpbnRybyIsIkFycmF5Iiwiam9pbiIsImxpbmUiLCJzdHJpcHBlZCIsImV4dHJhV2lkdGgiLCJleHRyYSIsInRlcm1pbmF0aW9uIiwiYmdIZXgiLCJjdXJzb3JUbyIsIndyaXRlIiwicmVwbGFjZSIsInJlcXVlc3RzIiwibGlzdGVuZXJzIiwiYmVnaW5Mb2dnZXIiLCJfY3JlYXRlUmVxdWVzdCIsIl9zdGFydFF1ZXJ5IiwicmVzcG9uc2UiLCJfZW5kUXVlcnkiLCJtYWlsIiwiX2xvZ01lc3NhZ2UiLCJlbmRMb2dnZXIiLCJyZW1vdmVMaXN0ZW5lciIsIm1pZGRsZXdhcmUiLCJyZXEiLCJyZXMiLCJuZXh0IiwicHJpbnRNaWRkbGV3YXJlTG9nZ2VyIiwiZHVyYXRpb24iLCJfZ2V0RHVyYXRpb24iLCJzdGFydFRpbWUiLCJyZXF1ZXN0Iiwib3JpZ2luYWxVcmwiLCJoZWFkZXJzIiwiaG9zdCIsImhvc3RuYW1lIiwibWV0aG9kIiwiaGVhZCIsInB1c2giLCJnZXQiLCJpc1N0cmluZyIsInVzZXIiLCJpc0VtcHR5IiwicGFyYW1zIiwiSlNPTiIsInN0cmluZ2lmeSIsImJvZHkiLCJzdGF0dXNDb2RlIiwiX3ByaW50TG9nZ2VyIiwicHJpbnRRdWV1ZUxvZ2dlciIsInF1ZXVlIiwiam9iIiwiZGF0YSIsInByaW50Q3JvbkxvZ2dlciIsIl9oYXNVaWRCZWVuTWFwcGVkIiwiX19rbmV4VWlkIiwiX2dldFJlcXVlc3RJZEZyb21VaWQiLCJ1aWQiLCJfX2tuZXhRdWVyeVVpZCIsInNxbCIsInR5cGUiLCJocnRpbWUiLCJiaW5kaW5ncyIsImZpbmRJbmRleCIsImRpZmYiLCJtcyIsInRvRml4ZWQiLCJPYmplY3QiLCJrZXlzIiwibWFwcGVkIiwiZm91bmQiLCJsZXZlbCIsIm1lc3NhZ2UiLCJ1dGlsIiwiZm9ybWF0IiwiYXBwbHkiLCJhcmd1bWVudHMiLCJib2xkIiwid2hpdGUiLCJibGFjayIsIml0ZW0iLCJtYWdlbnRhIiwicmVkIiwibW9kZWxzIiwidGFibGUiLCJvYmplY3RzIiwib2JqZWN0IiwiaW5zdGFuY2UiLCJfX3N1cGVyX18iLCJzZW5kTWFpbCIsImVtYWlsIiwiaHRtbCIsInByZXNlcnZlTWVkaWFRdWVyaWVzIiwicmVuZGVyZWQiLCJ0byIsIl9zZW5kVmlhQ29uc29sZSIsIl9zZW5kVmlhU0VTIiwiZXJyb3IiLCJvdXRwdXQiLCJzdWJqZWN0Iiwic2VudF9hdCIsInJlc29sdmUiLCJyZWplY3QiLCJzZXMiLCJlcnIiLCJpbmZvIiwic2VzX2lkIiwiVmFsaWRhdG9yIiwiY3VycmVuY3kiLCJ2YWwiLCJjb2x1bW4iLCJfdGFyZ2V0Iiwia2V5IiwiRXJyb3IiLCJkYXRlc3RyaW5nIiwiZ3JlYXRlclRoYW5GaWVsZCIsInBhcmFtIiwibGF0ZXJUaGFuIiwidG9kYXkiLCJmaXJzdCIsImxhc3QiLCJ0aW1lIiwidW5pcXVlIiwid2hlcmUiLCJpZCIsIndoZXJlTm90IiwidGhlbiIsInJlc3AiLCJtYWhhUm9vdCIsIm1lc3NhZ2VUZW1wbGF0ZSIsImZzIiwicmVhZEZpbGVTeW5jIiwiZW52ZWxvcGVUZW1wbGF0ZSIsIm5vdGlmaWNhdGlvbl9tZXRob2RfaWQiLCJOb3RpZmljYXRpb24iLCJqb2luUmF3Iiwic3VidHJhY3QiLCJvcmRlckJ5IiwidHJhbnNhY3RpbmciLCJub3RpZmljYXRpb25zIiwic2VyaWFsaXplZCIsIm5vdGlmaWNhdGlvbiIsInVzZXJzIiwiX2dldERlc2NyaXB0aW9uIiwidXNlcl9pZCIsImNvbnRlbnQiLCJlanMiLCJyZW5kZXIiLCJtb21lbnQiLCJwbHVyYWxpemUiLCJmcm9tIiwidG9BcnJheSIsInJlbGF0ZWQiLCJyZmM4MjIiLCJsaXN0IiwidW5zdWJzY3JpYmUiLCJjb21tZW50IiwiaWRzIiwic2xpY2UiLCJ3aGVyZUluIiwidXBkYXRlIiwiaXNfZGVsaXZlcmVkIiwic29ja2V0IiwiaW4iLCJlbWl0IiwidGFyZ2V0IiwiYWN0aW9uIiwic3RvcnkiLCJfZ2V0RGVzY3JpcHRpb25BcnRpY2xlIiwib3duZXJfaWQiLCJkaWdlc3RDcm9uIiwiQXBwIiwib2JqZWN0X293bmVyIiwiVXNlciIsIlN0b3J5IiwiQXV0aG9yIiwiQ2F0ZWdvcnkiLCJyb2xlcyIsImJlbG9uZ3NUb01hbnkiLCJSb2xlIiwiQXBwQXV0aG9yIiwiYXBwcyIsImhhc01hbnkiLCJBcHBDYXRlZ29yeSIsIkFzc2V0cyIsImV4dGVuc2lvbiIsInBvcCIsImlkZW50aWZpZXIiLCJpc19pbWFnZSIsImhhc19wcmV2aWV3IiwiaXNfcGRmIiwiaXNfZG9jIiwiaXNfeGxzIiwiaXNfb3Blbm9mZmljZSIsImlzX2VtYWlsIiwiaXNfaHRtbCIsImlzTmV3IiwiREFUQV9BU1NFVF9DRE5fSE9TVCIsInNvdXJjZSIsIlNvdXJjZSIsInN0YXR1cyIsIkFzc2V0U3RhdHVzIiwiQXR0YWNobWVudCIsImFzc2V0IiwiQXNzZXQiLCJzZXJ2aWNlIiwiU2VydmljZSIsImF0dGFjaG1lbnRzIiwiRG9tYWluIiwiR3JvdXAiLCJsaXN0ZW5hYmxlX3R5cGUiLCJsaXN0ZW5hYmxlX2lkIiwibW9ycGhUbyIsIk5vdGlmaWNhdGlvbk1ldGhvZCIsIlByb2ZpbGUiLCJzY29yZSIsIlJpZ2h0IiwiYXBwX2lkIiwidG9Mb3dlckNhc2UiLCJyaWdodHMiLCJTZWN1cml0eVF1ZXN0aW9uIiwiYXNzZXRzIiwicHJvZmlsZXMiLCJTdHJhdGVneSIsIlN1cGVydmlzaW9uIiwic3VwZXJ2aXNvciIsImVtcGxveWVlIiwic3ViZG9tYWluIiwiZG9tYWlucyIsImxvZ28iLCJzdHJhdGVnaWVzIiwiZmlyc3RfbmFtZSIsImxhc3RfbmFtZSIsImZ1bGxfbmFtZSIsImZfbGFzdCIsImZpcnN0X2luaXRpYWwiLCJsYXN0X2luaXRpYWwiLCJpbml0aWFscyIsImdyb3VwX2lkcyIsImdyb3VwIiwicm9sZV9pZHMiLCJyb2xlIiwic3VwZXJ2aXNvcl9pZHMiLCJwYXNzd29yZCIsInNldCIsInBhc3N3b3JkX3NhbHQiLCJiY3J5cHQiLCJnZW5TYWx0U3luYyIsImhhc2hTeW5jIiwibm90aWZpY2F0aW9uX21ldGhvZCIsInBob3RvIiwic2VjdXJpdHlfcXVlc3Rpb24iLCJncm91cHMiLCJzdXBlcnZpc29ycyIsInRocm91Z2giLCJhdXRoZW50aWNhdGUiLCJub3RpZmljYXRpb25TZXJpYWxpemVyIiwidXNlckRhdGEiLCJvYmplY3REYXRhIiwic3ViamVjdF90ZXh0Iiwic3ViamVjdFRleHQiLCJhcnRpY2xlX3RleHQiLCJhcnRpY2xlVGV4dCIsIm9iamVjdF90ZXh0Iiwib2JqZWN0VGV4dCIsImlzX3NlZW4iLCJpc192aXNpdGVkIiwiY3JlYXRlZF9hdCIsInVwZGF0ZWRfYXQiLCJvd25lcl9mdWxsX25hbWUiLCJldmVudHMiLCJFdmVudEVtaXR0ZXIiLCJkZWZhdWx0TWF4TGlzdGVuZXJzIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFD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QUNBO0FBQ0EsQ0FBQyxFQUFFOzs7Ozs7Ozs7Ozs7QUNYSCxtQkFBTyxDQUFDLDBGQUFzQjtBQUM5QixhQUFhLG1CQUFPLENBQUMsb0VBQVc7QUFDaEMsV0FBVyxtQkFBTyxDQUFDLGdFQUFTO0FBQzVCLGdCQUFnQixtQkFBTyxDQUFDLDBFQUFjO0FBQ3RDLG9CQUFvQixtQkFBTyxDQUFDLDhEQUFROztBQUVwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGVBQWUseUJBQXlCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEJBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUFjLGlCQUFPQyxZQUFQLENBQW9CQyxtQkFBcEIsR0FBMEMsQ0FBMUM7O0FBRUEsc0I7Ozs7Ozs7Ozs7O0FDZkEsb0M7Ozs7Ozs7Ozs7O0FDQUEsMEM7Ozs7Ozs7Ozs7O0FDQUEscUM7Ozs7Ozs7Ozs7O0FDQUEsc0M7Ozs7Ozs7Ozs7O0FDQUEsa0M7Ozs7Ozs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7O0FDQUEsZ0M7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsK0I7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsK0M7Ozs7Ozs7Ozs7O0FDQUEsdUM7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsa0M7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsdUM7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsc0M7Ozs7Ozs7Ozs7O0FDQUEsZ0Q7Ozs7Ozs7Ozs7O0FDQUEsOEM7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsc0MiLCJmaWxlIjoiY3Jvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vdG1wL2Nyb24uanNcIik7XG4iLCJjb25zdCBhcHAgPSB7XG4gIGNvZGU6ICdjaGF0JyxcbiAgdGl0bGU6ICdDaGF0JyxcbiAgcGF0aDogJy9jaGF0JyxcbiAgY2F0ZWdvcnk6ICdjb21tdW5pY2F0aW9uJyxcbiAgYXV0aG9yOiAnQ0NFIFRvbXBraW5zJyxcbiAgZGVzY3JpcHRpb246ICdPcmdhbml6YXRpb24gY2hhdCcsXG4gIHZlcnNpb246ICcxLjAuMCcsXG4gIGNvbG9yOiAndmlvbGV0JyxcbiAgaWNvbjogJ2NvbW1lbnRzJ1xufVxuXG5leHBvcnQgZGVmYXVsdCBhcHBcbiIsImNvbnN0IGFwcCA9IHtcbiAgY29kZTogJ2NvbXBldGVuY2llcycsXG4gIHRpdGxlOiAnQ29tcGV0ZW5jaWVzJyxcbiAgcGF0aDogJy9jb21wZXRlbmNpZXMnLFxuICBjYXRlZ29yeTogJ2VkdWNhdGlvbicsXG4gIGF1dGhvcjogJ0NDRSBUb21wa2lucycsXG4gIGRlc2NyaXB0aW9uOiAnTWFuYWdlIHJlc291cmNlcyByZXF1aXJlZCBmb3IgdmFyaW91cyBqb2IgcG9zaXRpb25zJyxcbiAgdmVyc2lvbjogJzEuMC4wJyxcbiAgY29sb3I6ICdibHVlJyxcbiAgaWNvbjogJ3Ryb3BoeSdcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXBwXG4iLCJjb25zdCBhcHAgPSB7XG4gIGNvZGU6ICdjcm0nLFxuICB0aXRsZTogJ0NSTScsXG4gIHBhdGg6ICcvY3JtJyxcbiAgY2F0ZWdvcnk6ICdhZG1pbmlzdHJhdGlvbicsXG4gIGF1dGhvcjogJ0NDRSBUb21wa2lucycsXG4gIGRlc2NyaXB0aW9uOiAnT3JnYW5pemF0aW9uYWwgUmVsYXRpb25zaGlwIE1hbmFnZW1lbnQnLFxuICB2ZXJzaW9uOiAnMS4wLjAnLFxuICBjb2xvcjogJ29saXZlJyxcbiAgaWNvbjogJ2lkLWNhcmQtbycsXG4gIHdlaWdodDogMTBcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXBwXG4iLCJjb25zdCBhcHAgPSB7XG4gIGNvZGU6ICdkcml2ZScsXG4gIHRpdGxlOiAnRHJpdmUnLFxuICBwYXRoOiAnL2RyaXZlJyxcbiAgY2F0ZWdvcnk6ICdhZG1pbmlzdHJhdGlvbicsXG4gIGF1dGhvcjogJ0NDRSBUb21wa2lucycsXG4gIGRlc2NyaXB0aW9uOiAnT3JnYW5pemF0aW9uYWwgRmlsZSBTeXN0ZW0nLFxuICB2ZXJzaW9uOiAnMS4wLjAnLFxuICBjb2xvcjogJ3RlYWwnLFxuICBpY29uOiAnaGRkLW8nXG59XG5cbmV4cG9ydCBkZWZhdWx0IGFwcFxuIiwiY29uc3QgYXBwID0ge1xuICBjb2RlOiAnZWF0ZnJlc2gnLFxuICB0aXRsZTogJ0VhdCBGcmVzaCcsXG4gIHBhdGg6ICcvZWF0ZnJlc2gnLFxuICBjYXRlZ29yeTogJ2VkdWNhdGlvbicsXG4gIGF1dGhvcjogJ0NDRSBUb21wa2lucycsXG4gIGRlc2NyaXB0aW9uOiAnSGVscCB0b3VyaXN0cyBmaW5kIGxvY2FsIGZvb2QgYW5kIGZhcm0gcmVzb3VyY2VzJyxcbiAgdmVyc2lvbjogJzEuMC4wJyxcbiAgY29sb3I6ICdvcmFuZ2UnLFxuICBpY29uOiAnc3Bvb24nXG59XG5cbmV4cG9ydCBkZWZhdWx0IGFwcFxuIiwiY29uc3QgYXBwID0ge1xuICBjb2RlOiAnZXhwZW5zZXMnLFxuICB0aXRsZTogJ0V4cGVuc2VzJyxcbiAgcGF0aDogJy9leHBlbnNlcycsXG4gIGNhdGVnb3J5OiAnZmluYW5jZScsXG4gIGF1dGhvcjogJ0NDRSBUb21wa2lucycsXG4gIGRlc2NyaXB0aW9uOiAnTWFuYWdlIGV4cGVuc2VzIGZvciBleHBlbnNlcywgYWR2YW5jZXMsIGFuZCB2ZWhpY2xlIHRyaXBzJyxcbiAgdmVyc2lvbjogJzEuMC4wJyxcbiAgY29sb3I6ICdncmVlbicsXG4gIGljb246ICdkb2xsYXInXG59XG5cbmV4cG9ydCBkZWZhdWx0IGFwcFxuIiwiY29uc3QgYXBwID0ge1xuICBjb2RlOiAncGxhdGZvcm0nLFxuICB0aXRsZTogJ1BsYXRmb3JtJyxcbiAgcGF0aDogJy9wbGF0Zm9ybScsXG4gIGNhdGVnb3J5OiAnYWRtaW5pc3RyYXRpb24nLFxuICBhdXRob3I6ICdDQ0UgVG9tcGtpbnMnLFxuICBkZXNjcmlwdGlvbjogJ1BsYXRmb3JtIE1hbmFnZW1lbnQgVG9vbHMnLFxuICB2ZXJzaW9uOiAnMS4wLjAnLFxuICBjb2xvcjogJ3llbGxvdycsXG4gIGljb246ICdjb2cnLFxuICB3ZWlnaHQ6IDEwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGFwcFxuIiwiY29uc3QgYXBwID0ge1xuICBjb2RlOiAndGVhbScsXG4gIHRpdGxlOiAnVGVhbScsXG4gIHBhdGg6ICcvdGVhbScsXG4gIGNhdGVnb3J5OiAnQWRtaW5pc3RyYXRpb24nLFxuICBhdXRob3I6ICdDQ0UgVG9tcGtpbnMnLFxuICBkZXNjcmlwdGlvbjogJ01hbmFnZSBwbGF0Zm9ybSBjb25maWd1cmF0aW9uLCB1c2VycywgYXBwcywgYW5kIGFjY2VzcycsXG4gIHZlcnNpb246ICcxLjAuMCcsXG4gIGNvbG9yOiAncmVkJyxcbiAgaWNvbjogJ3VzZXJzJ1xufVxuXG5leHBvcnQgZGVmYXVsdCBhcHBcbiIsImNvbnN0IGFwcCA9IHtcbiAgY29kZTogJ21haGEnLFxuICB0aXRsZTogJ01haGEnLFxuICBwYXRoOiAnJ1xufVxuXG5leHBvcnQgZGVmYXVsdCBhcHBcbiIsImltcG9ydCBjb2xsZWN0T2JqZWN0cyBmcm9tICcuLi8uLi9jb3JlL3V0aWxzL2NvbGxlY3Rfb2JqZWN0cydcbmltcG9ydCB7IHdyaXRlUGFkZGVkTGluZSB9IGZyb20gJy4uLy4uL2NvcmUvdXRpbHMvY29uc29sZSdcbmltcG9ydCBsYXRlciBmcm9tICdsYXRlcidcbmltcG9ydCBjaGFsayBmcm9tICdjaGFsaydcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKCkgPT4ge1xuXG4gIGNvbnN0IGNyb25GaWxlcyA9IGNvbGxlY3RPYmplY3RzKCdjcm9uLyonKVxuXG4gIGF3YWl0IFByb21pc2UubWFwKGNyb25GaWxlcywgYXN5bmMgKGNyb25GaWxlKSA9PiB7XG5cbiAgICBjb25zdCBjcm9uID0gY3JvbkZpbGUuZGVmYXVsdFxuXG4gICAgd3JpdGVQYWRkZWRMaW5lKGNoYWxrLmdyZXkoYFN0YXJ0aW5nICR7Y3Jvbi5uYW1lfWApLCAnJywgJyNGRkZGRkYnLCBmYWxzZSlcblxuICAgIGNvbnN0IHNjaGVkdWxlID0gbGF0ZXIucGFyc2UuY3Jvbihjcm9uLnNjaGVkdWxlLCB0cnVlKVxuXG4gICAgbGF0ZXIuc2V0SW50ZXJ2YWwoY3Jvbi5oYW5kbGVyLCBzY2hlZHVsZSlcblxuICAgIHdyaXRlUGFkZGVkTGluZShjaGFsay5ncmV5KGBTdGFydGluZyAke2Nyb24ubmFtZX1gKSwgY2hhbGsuZ3JlZW4oJ+KclCcpLCAnI0ZGRkZGRicsIHRydWUsIHRydWUpXG5cbiAgfSlcblxufVxuIiwiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IGtuZXggZnJvbSAnLi4vc2VydmljZXMva25leCdcbmltcG9ydCB7IGJlZ2luTG9nZ2VyLCBlbmRMb2dnZXIsIHByaW50Q3JvbkxvZ2dlciB9IGZyb20gJy4uL3V0aWxzL2xvZ2dlcidcblxuY29uc3QgY3JvbiA9IChvcHRpb25zKSA9PiB7XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBvcHRpb25zLm5hbWUsXG4gICAgc2NoZWR1bGU6IG9wdGlvbnMuc2NoZWR1bGUsXG4gICAgaGFuZGxlcjogKCkgPT4gd2l0aExvZ2dlcih7XG4gICAgICBuYW1lOiBvcHRpb25zLm5hbWUsXG4gICAgICBwcm9jZXNzb3I6IG9wdGlvbnMucHJvY2Vzc29yLFxuICAgICAgYWZ0ZXJDb21taXQ6IG9wdGlvbnMuYWZ0ZXJDb21taXQsXG4gICAgICBiZWZvcmVSb2xsYmFjazogb3B0aW9ucy5iZWZvcmVSb2xsYmFja1xuICAgIH0pXG4gIH1cblxufVxuXG5jb25zdCB3aXRoTG9nZ2VyID0gYXN5bmMgKHsgbmFtZSwgcHJvY2Vzc29yLCBhZnRlckNvbW1pdCwgYmVmb3JlUm9sbGJhY2sgfSkgPT4ge1xuXG4gIGNvbnN0IHJlcXVlc3RJZCA9IF8ucmFuZG9tKDEwMDAwMCwgOTk5OTk5KS50b1N0cmluZygzNilcblxuICBiZWdpbkxvZ2dlcihyZXF1ZXN0SWQpXG5cbiAgYXdhaXQgd2l0aFRyYW5zYWN0aW9uKHsgcHJvY2Vzc29yLCBhZnRlckNvbW1pdCwgYmVmb3JlUm9sbGJhY2sgfSlcblxuICBwcmludENyb25Mb2dnZXIobmFtZSwgcmVxdWVzdElkKVxuXG4gIGVuZExvZ2dlcihyZXF1ZXN0SWQpXG5cbn1cblxuY29uc3Qgd2l0aFRyYW5zYWN0aW9uID0gYXN5bmMgKHsgcHJvY2Vzc29yLCBhZnRlckNvbW1pdCwgYmVmb3JlUm9sbGJhY2sgfSkgPT4ge1xuXG4gIGF3YWl0IGtuZXgudHJhbnNhY3Rpb24oYXN5bmMgdHJ4ID0+IHtcblxuICAgIHRyeSB7XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHByb2Nlc3Nvcih0cngpXG5cbiAgICAgIGF3YWl0IHRyeC5jb21taXQoKVxuXG4gICAgICBpZihhZnRlckNvbW1pdCkgYXdhaXQgYWZ0ZXJDb21taXQodHJ4LCByZXN1bHQpXG5cbiAgICB9IGNhdGNoKGVycikge1xuXG4gICAgICBjb25zb2xlLmxvZyhlcnIpXG5cbiAgICAgIGlmKGJlZm9yZVJvbGxiYWNrKSBhd2FpdCBiZWZvcmVSb2xsYmFjayh0cngpXG5cbiAgICAgIGF3YWl0IHRyeC5yb2xsYmFjayhlcnIpXG5cbiAgICB9XG5cbiAgfSlcblxufVxuXG5leHBvcnQgZGVmYXVsdCBjcm9uXG4iLCJpbXBvcnQgYm9va3NoZWxmIGZyb20gJy4uL3NlcnZpY2VzL2Jvb2tzaGVsZidcbmltcG9ydCAnLi4vdmFsaWRhdGlvbnMvbGF0ZXJfdGhhbl92YWxpZGF0aW9uJ1xuaW1wb3J0ICcuLi92YWxpZGF0aW9ucy9kYXRlc3RyaW5nX3ZhbGlkYXRpb24nXG5pbXBvcnQgJy4uL3ZhbGlkYXRpb25zL2N1cnJlbmN5X3ZhbGlkYXRpb24nXG5pbXBvcnQgJy4uL3ZhbGlkYXRpb25zL2dyZWF0ZXJfdGhhbl9maWVsZF92YWxpZGF0aW9uJ1xuaW1wb3J0ICcuLi92YWxpZGF0aW9ucy90aW1lX3ZhbGlkYXRpb24nXG5pbXBvcnQgJy4uL3ZhbGlkYXRpb25zL3VuaXF1ZV92YWxpZGF0aW9uJ1xuaW1wb3J0IENoZWNraXQgZnJvbSAgJ2NoZWNraXQnXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5cbmNsYXNzIE1vZGVsIHtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cbiAgICByZXR1cm4gYm9va3NoZWxmLk1vZGVsLmV4dGVuZCh7XG5cbiAgICAgIGhhc1RpbWVzdGFtcHM6IG9wdGlvbnMuaGFzVGltZXN0YW1wcyAhPT0gZmFsc2UsXG5cbiAgICAgIHRhYmxlTmFtZTogJycsXG5cbiAgICAgIGRpc3BsYXlOYW1lOiAnJyxcblxuICAgICAgZGlzcGxheUF0dHJpYnV0ZTogJycsXG5cbiAgICAgIHJ1bGVzOiB7fSxcblxuICAgICAgdmlydHVhbHM6IHt9LFxuXG4gICAgICBpbml0aWFsaXplOiBmdW5jdGlvbihhdHRycywgb3B0cykge1xuXG4gICAgICAgIHRoaXMub24oJ3NhdmluZycsIHRoaXMudmFsaWRhdGVTYXZlKVxuXG4gICAgICB9LFxuXG4gICAgICBmZXRjaDogZnVuY3Rpb24oZmV0Y2hPcHRpb25zID0ge30pIHtcblxuICAgICAgICByZXR1cm4gYm9va3NoZWxmLk1vZGVsLnByb3RvdHlwZS5mZXRjaC5jYWxsKHRoaXMsIG1lcmdlT3B0aW9ucyhmZXRjaE9wdGlvbnMsIG9wdGlvbnMpKVxuXG4gICAgICB9LFxuXG4gICAgICBmZXRjaEFsbDogZnVuY3Rpb24oZmV0Y2hPcHRpb25zID0ge30pIHtcblxuICAgICAgICByZXR1cm4gYm9va3NoZWxmLk1vZGVsLnByb3RvdHlwZS5mZXRjaEFsbC5jYWxsKHRoaXMsIG1lcmdlT3B0aW9ucyhmZXRjaE9wdGlvbnMsIG9wdGlvbnMpKVxuXG4gICAgICB9LFxuXG4gICAgICB2YWxpZGF0ZVNhdmU6IGZ1bmN0aW9uKG1vZGVsLCBhdHRycywgc2F2ZU9wdGlvbnMpIHtcblxuICAgICAgICBpZihzYXZlT3B0aW9ucy5za2lwVmFsaWRhdGlvbikgcmV0dXJuIHRydWVcblxuICAgICAgICBjb25zdCBydWxlcyA9ICh0aGlzLmJlbG9uZ3NUb1RlYW0gIT09IGZhbHNlKSA/IHtcbiAgICAgICAgICAuLi4oc2F2ZU9wdGlvbnMud2l0aFJ1bGVzIHx8IHRoaXMucnVsZXMpLFxuICAgICAgICAgIC4uLihvcHRpb25zLmJlbG9uZ3NUb1RlYW0gIT09IGZhbHNlID8geyB0ZWFtX2lkOiAncmVxdWlyZWQnIH0gOiB7fSlcbiAgICAgICAgfSA6IHt9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBDaGVja2l0KHJ1bGVzKS5ydW4odGhpcy5hdHRyaWJ1dGVzLCB7IHRhYmxlTmFtZTogdGhpcy50YWJsZU5hbWUgfSlcblxuICAgICAgfSxcblxuICAgICAgYWN0aXZpdGllczogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgY29uc3QgQWN0aXZpdHkgPSByZXF1aXJlKCcuLi8uLi9tb2RlbHMvYWN0aXZpdHknKS5kZWZhdWx0XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubW9ycGhNYW55KEFjdGl2aXR5LCAnYWN0aXZhYmxlJywgWydvYmplY3RfdGFibGUnLCAnb2JqZWN0X2lkJ10pXG5cbiAgICAgIH0sXG5cbiAgICAgIGF1ZGl0OiBmdW5jdGlvbigpIHtcblxuICAgICAgICBjb25zdCBBdWRpdCA9IHJlcXVpcmUoJy4uLy4uL21vZGVscy9hdWRpdCcpLmRlZmF1bHRcblxuICAgICAgICByZXR1cm4gdGhpcy5tb3JwaE1hbnkoQXVkaXQsICdhdWRpdGFibGUnKVxuXG4gICAgICB9LFxuXG4gICAgICBjb21tZW50czogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgY29uc3QgQ29tbWVudCA9IHJlcXVpcmUoJy4uLy4uL21vZGVscy9jb21tZW50JykuZGVmYXVsdFxuXG4gICAgICAgIHJldHVybiB0aGlzLm1vcnBoTWFueShDb21tZW50LCAnY29tbWVudGFibGUnKVxuXG4gICAgICB9LFxuXG5cbiAgICAgIGxpa2VzOiBmdW5jdGlvbigpIHtcblxuICAgICAgICBjb25zdCBMaWtlID0gcmVxdWlyZSgnLi4vLi4vbW9kZWxzL2xpa2UnKS5kZWZhdWx0XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubW9ycGhNYW55KExpa2UsICdsaWtlYWJsZScpLnF1ZXJ5KHFiID0+IHtcblxuICAgICAgICAgIHFiLndoZXJlTnVsbCgndW5saWtlZF9hdCcpXG5cbiAgICAgICAgfSlcblxuICAgICAgfSxcblxuICAgICAgbGlzdGVuaW5nczogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgY29uc3QgTGlzdGVuaW5nID0gcmVxdWlyZSgnLi4vLi4vbW9kZWxzL2xpc3RlbmluZycpLmRlZmF1bHRcblxuICAgICAgICByZXR1cm4gdGhpcy5tb3JwaE1hbnkoTGlzdGVuaW5nLCAnbGlzdGVuYWJsZScpXG5cbiAgICAgIH0sXG5cbiAgICAgIHJldmlld3M6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGNvbnN0IFJldmlldyA9IHJlcXVpcmUoJy4uLy4uL21vZGVscy9yZXZpZXcnKS5kZWZhdWx0XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubW9ycGhNYW55KFJldmlldywgJ3Jldmlld2FibGUnKVxuXG4gICAgICB9LFxuXG4gICAgICBzdGFyczogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgY29uc3QgU3RhciA9IHJlcXVpcmUoJy4uLy4uL21vZGVscy9zdGFyJykuZGVmYXVsdFxuXG4gICAgICAgIHJldHVybiB0aGlzLm1vcnBoTWFueShTdGFyLCAnc3RhcnJhYmxlJylcblxuICAgICAgfSxcblxuICAgICAgdGVhbTogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgY29uc3QgVGVhbSA9IHJlcXVpcmUoJy4uLy4uL21vZGVscy90ZWFtJykuZGVmYXVsdFxuXG4gICAgICAgIHJldHVybiB0aGlzLmJlbG9uZ3NUbyhUZWFtLCAndGVhbV9pZCcpXG5cbiAgICAgIH0sXG5cbiAgICAgIC4uLm9wdGlvbnNcblxuICAgIH0pXG5cbiAgfVxuXG59XG5cbmNvbnN0IG1lcmdlT3B0aW9ucyA9IChvcHRpb25zLCBjb25maWcpID0+ICh7XG4gIC4uLm9wdGlvbnMsXG4gIHdpdGhSZWxhdGVkOiBbXG4gICAgLi4uY29lcmNlQXJyYXkob3B0aW9ucy53aXRoUmVsYXRlZCksXG4gICAgLi4uY29lcmNlQXJyYXkoY29uZmlnLndpdGhSZWxhdGVkKVxuICBdXG59KVxuXG5cbmNvbnN0IGNvZXJjZUFycmF5ID0gKHZhbHVlKSA9PiAhXy5pc05pbCh2YWx1ZSkgPyAoIV8uaXNBcnJheSh2YWx1ZSkgPyBbdmFsdWVdIDogdmFsdWUpIDogW11cblxuZXhwb3J0IGRlZmF1bHQgTW9kZWxcbiIsImNvbnN0IHNlcmlhbGl6ZXIgPSAob3B0aW9ucykgPT4ge1xuXG4gIHJldHVybiBvcHRpb25zXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgc2VyaWFsaXplclxuIiwiaW1wb3J0IGF3cyBmcm9tICdhd3Mtc2RrJ1xuXG5hd3MuY29uZmlnLmNvbnN0cnVjdG9yKHtcbiAgYWNjZXNzS2V5SWQ6IHByb2Nlc3MuZW52LkFXU19BQ0NFU1NfS0VZX0lEIHx8ICcnLFxuICBzZWNyZXRBY2Nlc3NLZXk6IHByb2Nlc3MuZW52LkFXU19TRUNSRVRfQUNDRVNTX0tFWSB8fCAnJyxcbiAgcmVnaW9uOiBwcm9jZXNzLmVudi5BV1NfUkVHSU9OIHx8ICcnXG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IGF3c1xuIiwiaW1wb3J0IEJvb2tzaGVsZiBmcm9tICdib29rc2hlbGYnXG5pbXBvcnQga25leCBmcm9tICcuL2tuZXgnXG5cbmNvbnN0IGJvb2tzaGVsZiA9IEJvb2tzaGVsZihrbmV4KVxuXG5ib29rc2hlbGYucGx1Z2luKCd2aXJ0dWFscycpXG5cbmV4cG9ydCBkZWZhdWx0IGJvb2tzaGVsZlxuIiwiaW1wb3J0IEVtaXR0ZXIgZnJvbSAnc29ja2V0LmlvLWVtaXR0ZXInXG5cbmNvbnN0IGVtaXR0ZXIgPSBFbWl0dGVyKHByb2Nlc3MuZW52LlJFRElTX1VSTClcblxuZXhwb3J0IGRlZmF1bHQgZW1pdHRlclxuIiwiaW1wb3J0IEtuZXggZnJvbSAna25leCdcblxuY29uc3QgW3VybCwgcHJvdG9jb2xdID0gcHJvY2Vzcy5lbnYuREFUQUJBU0VfVVJMLm1hdGNoKC8oLiopOlxcL1xcL1xcLz8oLiopLylcblxuY29uc3QgZ2V0Q2xpZW50ID0gKHByb3RvY29sKSA9PiB7XG5cbiAgc3dpdGNoKHByb3RvY29sKSB7XG5cbiAgY2FzZSAncG9zdGdyZXMnOlxuICAgIHJldHVybiAncG9zdGdyZXNxbCdcblxuICBkZWZhdWx0OlxuICAgIHJldHVybiBwcm90b2NvbFxuXG4gIH1cblxufVxuXG5jb25zdCBnZXRDb25uZWN0aW9uID0gKHByb3RvY29sLCB1cmwpID0+IHtcblxuICBzd2l0Y2gocHJvdG9jb2wpIHtcblxuICBkZWZhdWx0OlxuICAgIHJldHVybiB1cmxcblxuICB9XG5cbn1cblxuY29uc3QgZ2V0UG9vbCA9IChlbnYpID0+ICh7XG4gIG1pbjogKGVudiA9PT0gJ3Rlc3QnKSA/IDEgOiA1LFxuICBtYXg6IChlbnYgPT09ICd0ZXN0JykgPyAxIDogMzBcbn0pXG5cbmNvbnN0IGNvbmZpZyA9IHtcbiAgY2xpZW50OiBnZXRDbGllbnQocHJvdG9jb2wpLFxuICBjb25uZWN0aW9uOiBnZXRDb25uZWN0aW9uKHByb3RvY29sLCB1cmwpLFxuICB1c2VOdWxsQXNEZWZhdWx0OiB0cnVlLFxuICBwb29sOiBnZXRQb29sKHByb2Nlc3MuZW52Lk5PREVfRU5WKVxufVxuXG5jb25zdCBrbmV4ID0gbmV3IEtuZXgoY29uZmlnKVxuXG5leHBvcnQgZGVmYXVsdCBrbmV4XG4iLCJpbXBvcnQgbm9kZW1haWxlciBmcm9tICdub2RlbWFpbGVyJ1xuaW1wb3J0IGF3cyBmcm9tICcuL2F3cydcblxuY29uc3QgU0VTID0gbmV3IGF3cy5TRVMoeyBhcGlWZXJzaW9uOiAnMjAxMC0xMi0wMScgfSlcblxuZXhwb3J0IGRlZmF1bHQgbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQoeyBTRVMgfSlcbiIsImV4cG9ydCBjb25zdCBjb25maWdzID0gcHJvY2Vzcy5lbnYuQVBQUy5yZWR1Y2UoKGNvbmZpZ3MsIGFwcCkgPT4ge1xuXG4gIGNvbnN0IGNvbmZpZyA9IF9fd2VicGFja19yZXF1aXJlX18oYC4vYXBwcy8ke2FwcH0vc3JjL2FwcC5qc2ApXG5cbiAgcmV0dXJuIHtcbiAgICAuLi5jb25maWdzLFxuICAgIFthcHBdOiBjb25maWcuZGVmYXVsdFxuICB9XG5cbn0sIHt9KVxuXG5jb25zdCBhcHBDb25maWcgPSAobmFtZSkgPT4ge1xuXG4gIHJldHVybiBjb25maWdzW25hbWVdXG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBhcHBDb25maWdcbiIsImltcG9ydCBhcHBDb25maWcgZnJvbSAnLi9hcHBfY29uZmlnJ1xuaW1wb3J0IGdsb2IgZnJvbSAnZ2xvYidcblxuY29uc3QgY29sbGVjdE9iamVjdHMgPSAocGF0dGVybikgPT4gW1xuICAuLi5nbG9iLnN5bmMoYGFwcHMvKi9zcmMvJHtwYXR0ZXJufWApLFxuICAuLi5nbG9iLnN5bmMoYGFwcHMvKi9zcmMvJHtwYXR0ZXJufS9pbmRleC5qc2ApXG5dLm1hcChmaWxlID0+IHtcblxuICBjb25zdCBbLGFwcF0gPSBmaWxlLm1hdGNoKC9hcHBzXFwvKFteL10qKS8pXG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBhcHAsXG4gICAgZGVmYXVsdDogX193ZWJwYWNrX3JlcXVpcmVfXyhgLi8ke2ZpbGV9YCkuZGVmYXVsdCxcbiAgICBjb25maWc6IGFwcENvbmZpZyhhcHApXG4gIH1cblxufSlcblxuZXhwb3J0IGRlZmF1bHQgY29sbGVjdE9iamVjdHNcbiIsImltcG9ydCBjaGFsayBmcm9tICdjaGFsaydcbmltcG9ydCB3cmFwQW5zaSBmcm9tICd3cmFwLWFuc2knXG5cbmV4cG9ydCBjb25zdCB3cml0ZVBhZGRlZExpbmUgPSAobGFiZWwsIHRleHQgPSAnJywgYmFja2dyb3VuZCA9ICcjRkZGRkZGJywgbmV3bGluZSA9IHRydWUsIHJld2luZCA9IGZhbHNlKSA9PiB7XG5cbiAgY29uc3Qgd2lkdGggPSBwcm9jZXNzLnN0ZG91dC5jb2x1bW5zXG5cbiAgY29uc3QgbGFiZWxXaWR0aCA9IChsYWJlbCkgPyBzdHJpcEFuc2kobGFiZWwpLmxlbmd0aCA6IDBcblxuICBjb25zdCBjb250ZW50V2lkdGggPSB3aWR0aCAtIGxhYmVsV2lkdGggLSA2XG5cbiAgY29uc3QgcGFkZGVkID0gd3JhcEFuc2kodGV4dCwgY29udGVudFdpZHRoLCB7IGhhcmQ6IHRydWUgfSkuc3BsaXQoJ1xcbicpLm1hcCgoY2h1bmtMaW5lLCBpbmRleCk9PiB7XG5cbiAgICBjb25zdCBpbnRybyA9IGxhYmVsID8gKGluZGV4ID09PSAwID8gYCR7bGFiZWx9IGAgOiBBcnJheShsYWJlbFdpZHRoICsgMikuam9pbignICcpKSA6ICcnXG5cbiAgICBjb25zdCBsaW5lID0gaW50cm8gKyBjaHVua0xpbmVcblxuICAgIGNvbnN0IHN0cmlwcGVkID0gc3RyaXBBbnNpKGxpbmUpXG5cbiAgICBjb25zdCBleHRyYVdpZHRoID0gd2lkdGggLSBzdHJpcHBlZC5sZW5ndGggLSA0XG5cbiAgICBjb25zdCBleHRyYSA9IGV4dHJhV2lkdGggPiAwID8gQXJyYXkoZXh0cmFXaWR0aCkuam9pbignICcpIDogJydcblxuICAgIGNvbnN0IHRlcm1pbmF0aW9uID0gKG5ld2xpbmUpID8gJ1xcbicgOiAnJ1xuXG4gICAgcmV0dXJuIGNoYWxrLmJnSGV4KGJhY2tncm91bmQpLmdyZXkoJyAgJyArICBsaW5lICsgZXh0cmEgKyAnICAnICsgdGVybWluYXRpb24pXG5cblxuICB9KS5qb2luKCcnKVxuXG4gIGlmKHJld2luZCAmJiBwcm9jZXNzLnN0ZG91dC5jdXJzb3JUbykgcHJvY2Vzcy5zdGRvdXQuY3Vyc29yVG8oMClcblxuICBwcm9jZXNzLnN0ZG91dC53cml0ZShwYWRkZWQpXG5cbn1cblxuY29uc3Qgc3RyaXBBbnNpID0gKHRleHQpID0+IHRleHQucmVwbGFjZSgvW1xcdTAwMWJcXHUwMDliXVtbKCkjOz9dKig/OlswLTldezEsNH0oPzo7WzAtOV17MCw0fSkqKT9bMC05QS1PUlpjZi1ucXJ5PT48XS9nLCAnJylcbiIsImltcG9ydCB7IHdyaXRlUGFkZGVkTGluZSB9IGZyb20gJy4uL3V0aWxzL2NvbnNvbGUnXG5pbXBvcnQga25leCBmcm9tICcuLi9zZXJ2aWNlcy9rbmV4J1xuaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJ1xuaW1wb3J0IHV0aWwgZnJvbSAndXRpbCdcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCdcblxuY29uc3QgcmVxdWVzdHMgPSB7fVxuXG5jb25zdCBsaXN0ZW5lcnMgPSB7fVxuXG5leHBvcnQgY29uc3QgYmVnaW5Mb2dnZXIgPSAocmVxdWVzdElkKSA9PiB7XG5cbiAgaWYoIXJlcXVlc3RzW3JlcXVlc3RJZF0pIF9jcmVhdGVSZXF1ZXN0KHJlcXVlc3RJZClcblxuICBsaXN0ZW5lcnNbcmVxdWVzdElkXSA9IHtcbiAgICBxdWVyeTogX3N0YXJ0UXVlcnkocmVxdWVzdElkKSxcbiAgICByZXNwb25zZTogX2VuZFF1ZXJ5KHJlcXVlc3RJZClcbiAgfVxuXG4gIGtuZXguY2xpZW50Lm9uKCdxdWVyeScsIGxpc3RlbmVyc1tyZXF1ZXN0SWRdLnF1ZXJ5KS5vbigncXVlcnktcmVzcG9uc2UnLCBsaXN0ZW5lcnNbcmVxdWVzdElkXS5yZXNwb25zZSlcblxuICBjb25zb2xlLm1haWwgPSBfbG9nTWVzc2FnZSgnbWFpbCcsIHJlcXVlc3RJZClcblxufVxuXG5leHBvcnQgY29uc3QgZW5kTG9nZ2VyID0gKHJlcXVlc3RJZCkgPT4ge1xuXG4gIGtuZXguY2xpZW50LnJlbW92ZUxpc3RlbmVyKCdxdWVyeScsIGxpc3RlbmVyc1tyZXF1ZXN0SWRdLnF1ZXJ5KS5yZW1vdmVMaXN0ZW5lcigncXVlcnktcmVzcG9uc2UnLCBsaXN0ZW5lcnNbcmVxdWVzdElkXS5yZXNwb25zZSlcblxuICBkZWxldGUgcmVxdWVzdHNbcmVxdWVzdElkXVxuXG4gIGRlbGV0ZSBsaXN0ZW5lcnNbcmVxdWVzdElkXVxuXG59XG5cbmV4cG9ydCBjb25zdCB3aXRoTG9nZ2VyID0gKG1pZGRsZXdhcmUpID0+IChyZXEsIHJlcywgbmV4dCkgPT4ge1xuXG4gIGNvbnN0IHJlcXVlc3RJZCA9IF8ucmFuZG9tKDEwMDAwMCwgOTk5OTk5KS50b1N0cmluZygzNilcblxuICBiZWdpbkxvZ2dlcihyZXF1ZXN0SWQpXG5cbiAgbWlkZGxld2FyZShyZXEsIHJlcywgbmV4dClcblxuICByZXMub24oJ2ZpbmlzaCcsICgpID0+IHtcblxuICAgIHByaW50TWlkZGxld2FyZUxvZ2dlcihyZXEsIHJlcywgcmVxdWVzdElkKVxuXG4gICAgZW5kTG9nZ2VyKHJlcXVlc3RJZClcblxuICB9KVxuXG59XG5cbmV4cG9ydCBjb25zdCBwcmludE1pZGRsZXdhcmVMb2dnZXIgPSAocmVxLCByZXMsIHJlcXVlc3RJZCkgPT4ge1xuXG4gIHJlcXVlc3RzW3JlcXVlc3RJZF0uZHVyYXRpb24gPSBfZ2V0RHVyYXRpb24ocmVxdWVzdHNbcmVxdWVzdElkXS5zdGFydFRpbWUpXG5cbiAgY29uc3QgcmVxdWVzdCA9IHJlcXVlc3RzW3JlcXVlc3RJZF1cblxuICBjb25zdCBbLHVybF0gPSByZXEub3JpZ2luYWxVcmwubWF0Y2goL14oW14/XSopKC4qKT8kLylcblxuICBjb25zdCBbLGhvc3RuYW1lXSA9IHJlcS5oZWFkZXJzLmhvc3QubWF0Y2goL14oW1xcdy5dKik6PyhcXGQqKT8kLylcblxuICBjb25zdCB0aXRsZSA9IFsnUkVRVUVTVDogJywgYCR7cmVxLm1ldGhvZH0gJHt1cmx9YF1cblxuICBjb25zdCBoZWFkID0gW11cblxuICBpZighXy5pc05pbChyZXEudGVhbSkpIGhlYWQucHVzaChbJ1RFQU06ICAgICcsIGAke3JlcS50ZWFtLmdldCgndGl0bGUnKX0gWyBJRCMgJHtyZXEudGVhbS5nZXQoJ2lkJyl9IF1gXSlcblxuICBpZihfLmlzU3RyaW5nKHJlcS5hcHAuZ2V0KCd0aXRsZScpKSkgaGVhZC5wdXNoKFsnQVBQOiAgICAgJywgcmVxLmFwcC5nZXQoJ3RpdGxlJyldKVxuXG4gIGlmKCFfLmlzTmlsKHJlcS51c2VyKSkgaGVhZC5wdXNoKFsnVVNFUjogICAgJywgYCR7cmVxLnVzZXIuZ2V0KCdmdWxsX25hbWUnKX0gWyBJRCMgJHtyZXEudXNlci5nZXQoJ2lkJyl9IF1gXSlcblxuICBoZWFkLnB1c2goWydIT1NUOiAgICAnLCBob3N0bmFtZV0pXG5cbiAgaWYoIV8uaXNFbXB0eShyZXEucGFyYW1zKSkgaGVhZC5wdXNoKFsnUEFSQU1TOiAgJywgSlNPTi5zdHJpbmdpZnkocmVxLnBhcmFtcyldKVxuXG4gIGlmKCFfLmlzRW1wdHkocmVxLmJvZHkpKSBoZWFkLnB1c2goWydCT0RZOiAgICAnLCBKU09OLnN0cmluZ2lmeShyZXEuYm9keSldKVxuXG4gIGlmKCFfLmlzRW1wdHkocmVxLnF1ZXJ5KSkgaGVhZC5wdXNoKFsnUVVFUlk6ICAgJywgSlNPTi5zdHJpbmdpZnkocmVxLnF1ZXJ5KV0pXG5cbiAgaGVhZC5wdXNoKFsnUkVTUE9OU0U6JywgYCR7cmVzLnN0YXR1c0NvZGV9IHJlbmRlcmVkIGluICR7cmVxdWVzdC5kdXJhdGlvbn0gbXNgXSlcblxuICBfcHJpbnRMb2dnZXIodGl0bGUsIGhlYWQsIHJlcXVlc3QsICcjREIyODI4JylcblxufVxuXG5leHBvcnQgY29uc3QgcHJpbnRRdWV1ZUxvZ2dlciA9IChxdWV1ZSwgam9iLCByZXF1ZXN0SWQpID0+IHtcblxuICByZXF1ZXN0c1tyZXF1ZXN0SWRdLmR1cmF0aW9uID0gX2dldER1cmF0aW9uKHJlcXVlc3RzW3JlcXVlc3RJZF0uc3RhcnRUaW1lKVxuXG4gIGNvbnN0IHJlcXVlc3QgPSByZXF1ZXN0c1tyZXF1ZXN0SWRdXG5cbiAgY29uc3QgdGl0bGUgPSBbJ1FVRVVFOicsIHF1ZXVlXVxuXG4gIGNvbnN0IGhlYWQgPSBbXVxuXG4gIGhlYWQucHVzaChbJ0pPQjogICAgICcsIEpTT04uc3RyaW5naWZ5KGpvYi5kYXRhKV0pXG5cbiAgaGVhZC5wdXNoKFsnUkVTUE9OU0U6JywgYHByb2Nlc3NlZCBpbiAke3JlcXVlc3QuZHVyYXRpb259IG1zYF0pXG5cbiAgX3ByaW50TG9nZ2VyKHRpdGxlLCBoZWFkLCByZXF1ZXN0LCAnI0EzMzNDOCcpXG5cbn1cblxuZXhwb3J0IGNvbnN0IHByaW50Q3JvbkxvZ2dlciA9IChjcm9uLCByZXF1ZXN0SWQpID0+IHtcblxuICByZXF1ZXN0c1tyZXF1ZXN0SWRdLmR1cmF0aW9uID0gX2dldER1cmF0aW9uKHJlcXVlc3RzW3JlcXVlc3RJZF0uc3RhcnRUaW1lKVxuXG4gIGNvbnN0IHJlcXVlc3QgPSByZXF1ZXN0c1tyZXF1ZXN0SWRdXG5cbiAgY29uc3QgaGVhZCA9IFtdXG5cbiAgY29uc3QgdGl0bGUgPSBbJ0NST046JywgY3Jvbl1cblxuICBoZWFkLnB1c2goWydSRVNQT05TRTonLCBgcHJvY2Vzc2VkIGluICR7cmVxdWVzdC5kdXJhdGlvbn0gbXNgXSlcblxuICBfcHJpbnRMb2dnZXIodGl0bGUsIGhlYWQsIHJlcXVlc3QsICcjRTAzOTk3JylcblxuXG59XG5cbmNvbnN0IF9zdGFydFF1ZXJ5ID0gcmVxdWVzdElkID0+IHF1ZXJ5ID0+IHtcblxuICBpZighcmVxdWVzdHNbcmVxdWVzdElkXSkgX2NyZWF0ZVJlcXVlc3QocmVxdWVzdElkKVxuXG4gIGlmKCFfaGFzVWlkQmVlbk1hcHBlZChxdWVyeS5fX2tuZXhVaWQpICYmICFyZXF1ZXN0c1tyZXF1ZXN0SWRdLl9fa25leFVpZCkge1xuXG4gICAgcmVxdWVzdHNbcmVxdWVzdElkXS5fX2tuZXhVaWQgPSBxdWVyeS5fX2tuZXhVaWRcblxuICB9XG5cbiAgaWYoX2dldFJlcXVlc3RJZEZyb21VaWQocXVlcnkuX19rbmV4VWlkKSAhPT0gcmVxdWVzdElkKSByZXR1cm5cblxuICBjb25zdCB1aWQgPSBxdWVyeS5fX2tuZXhRdWVyeVVpZCB8fCBxdWVyeS5zcWxcblxuICByZXF1ZXN0c1tyZXF1ZXN0SWRdLmxvZy5wdXNoKHtcbiAgICB0eXBlOidxdWVyeScsXG4gICAgdWlkLFxuICAgIGR1cmF0aW9uOiAwLFxuICAgIHN0YXJ0VGltZTogcHJvY2Vzcy5ocnRpbWUoKSxcbiAgICBzcWw6IHF1ZXJ5LnNxbCxcbiAgICBiaW5kaW5nczogcXVlcnkuYmluZGluZ3NcbiAgfSlcblxufVxuXG5jb25zdCBfZW5kUXVlcnkgPSByZXF1ZXN0SWQgPT4gKHJlc3BvbnNlLCBxdWVyeSkgPT4ge1xuXG4gIGlmKF9nZXRSZXF1ZXN0SWRGcm9tVWlkKHF1ZXJ5Ll9fa25leFVpZCkgIT09IHJlcXVlc3RJZCkgcmV0dXJuXG5cbiAgY29uc3QgdWlkID0gcXVlcnkuX19rbmV4UXVlcnlVaWQgfHwgcXVlcnkuc3FsXG5cbiAgY29uc3QgaW5kZXggPSBfLmZpbmRJbmRleChyZXF1ZXN0c1tyZXF1ZXN0SWRdLmxvZywgeyB1aWQgfSApXG5cbiAgaWYoIXJlcXVlc3RzW3JlcXVlc3RJZF0ubG9nW2luZGV4XSkgcmV0dXJuXG5cbiAgcmVxdWVzdHNbcmVxdWVzdElkXS5sb2dbaW5kZXhdLmR1cmF0aW9uID0gX2dldER1cmF0aW9uKHJlcXVlc3RzW3JlcXVlc3RJZF0ubG9nW2luZGV4XS5zdGFydFRpbWUpXG5cbn1cblxuY29uc3QgX2NyZWF0ZVJlcXVlc3QgPSAocmVxdWVzdElkKSA9PiB7XG5cbiAgcmVxdWVzdHNbcmVxdWVzdElkXSA9IHtcbiAgICBzdGFydFRpbWU6IHByb2Nlc3MuaHJ0aW1lKCksXG4gICAgZHVyYXRpb246IG51bGwsXG4gICAgbG9nOiBbXVxuICB9XG5cbn1cbmNvbnN0IF9nZXREdXJhdGlvbiA9IChzdGFydFRpbWUpID0+IHtcblxuICBjb25zdCBkaWZmID0gcHJvY2Vzcy5ocnRpbWUoc3RhcnRUaW1lKVxuXG4gIGNvbnN0IG1zID0gZGlmZlswXSAqIDFlMyArIGRpZmZbMV0gKiAxZS02XG5cbiAgcmV0dXJuIG1zLnRvRml4ZWQoMylcblxufVxuXG5jb25zdCBfaGFzVWlkQmVlbk1hcHBlZCA9ICh1aWQpID0+IHtcblxuICByZXR1cm4gT2JqZWN0LmtleXMocmVxdWVzdHMpLnJlZHVjZSgobWFwcGVkLCByZXF1ZXN0SWQpID0+IHtcblxuICAgIHJldHVybiBtYXBwZWQgfHwgcmVxdWVzdHNbcmVxdWVzdElkXS5fX2tuZXhVaWQgPT09IHVpZFxuXG4gIH0sIGZhbHNlKVxuXG59XG5cbmNvbnN0IF9nZXRSZXF1ZXN0SWRGcm9tVWlkID0gKHVpZCkgPT4ge1xuXG4gIHJldHVybiBPYmplY3Qua2V5cyhyZXF1ZXN0cykucmVkdWNlKChmb3VuZCwgcmVxdWVzdElkKSA9PiB7XG5cbiAgICBpZihmb3VuZCkgcmV0dXJuIGZvdW5kXG5cbiAgICByZXR1cm4gKHJlcXVlc3RzW3JlcXVlc3RJZF0uX19rbmV4VWlkID09PSB1aWQpID8gcmVxdWVzdElkIDogbnVsbFxuXG4gIH0sIG51bGwpXG5cbn1cblxuY29uc3QgX2xvZ01lc3NhZ2UgPSAobGV2ZWwsIHJlcXVlc3RJZCkgPT4ge1xuXG4gIHJldHVybiBmdW5jdGlvbigpIHtcblxuICAgIGlmKCFyZXF1ZXN0c1tyZXF1ZXN0SWRdKSByZXR1cm5cblxuICAgIHJlcXVlc3RzW3JlcXVlc3RJZF0ubG9nLnB1c2goe1xuICAgICAgdHlwZTonbG9nJyxcbiAgICAgIGxldmVsLFxuICAgICAgbWVzc2FnZTogdXRpbC5mb3JtYXQuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgIH0pXG5cbiAgfVxufVxuXG5jb25zdCBfcHJpbnRMb2dnZXIgPSAodGl0bGUsIGhlYWQsIHJlcXVlc3QsIGNvbG9yKSA9PiB7XG5cbiAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoJ1xcbicpXG5cbiAgd3JpdGVQYWRkZWRMaW5lKG51bGwsICcnLCBjb2xvcilcblxuICB3cml0ZVBhZGRlZExpbmUoY2hhbGsuYm9sZC53aGl0ZSh0aXRsZVswXSksIGNoYWxrLndoaXRlKHRpdGxlWzFdKSwgY29sb3IpXG5cbiAgd3JpdGVQYWRkZWRMaW5lKG51bGwsICcnLCBjb2xvcilcblxuICB3cml0ZVBhZGRlZExpbmUobnVsbCwgJycsICcjRUVFRUVFJylcblxuICBoZWFkLm1hcChsaW5lID0+IHtcblxuICAgIHdyaXRlUGFkZGVkTGluZShjaGFsay5ibGFjayhsaW5lWzBdKSwgY2hhbGsuZ3JleShsaW5lWzFdKSwgJyNFRUVFRUUnKVxuXG4gIH0pXG5cbiAgd3JpdGVQYWRkZWRMaW5lKG51bGwsICcnLCAnI0VFRUVFRScpXG5cbiAgd3JpdGVQYWRkZWRMaW5lKG51bGwsICcnLCAnI0ZGRkZGRicpXG5cbiAgcmVxdWVzdC5sb2cubWFwKGl0ZW0gPT4ge1xuXG4gICAgaWYoaXRlbS50eXBlID09PSAncXVlcnknKSB7XG5cbiAgICAgIGNvbnN0IGJpbmRpbmdzID0gaXRlbS5iaW5kaW5ncyA/IGAgeyR7aXRlbS5iaW5kaW5ncy5qb2luKCcsICcpfX1gIDonJ1xuXG4gICAgICBjb25zdCBkdXJhdGlvbiA9IGl0ZW0uZHVyYXRpb24gPyBgICR7aXRlbS5kdXJhdGlvbn0gbXNgIDonJ1xuXG4gICAgICBjb25zdCBsaW5lID0gaXRlbS5zcWwgKyBjaGFsay5tYWdlbnRhKGJpbmRpbmdzKSArIGR1cmF0aW9uXG5cbiAgICAgIHdyaXRlUGFkZGVkTGluZShjaGFsay5ibGFjaygnU1FMOiAgICAgJyksIGxpbmUsICcjRkZGRkZGJylcblxuICAgIH1cblxuICAgIGlmKGl0ZW0udHlwZSA9PT0gJ2xvZycpIHtcblxuICAgICAgaWYoaXRlbS5sZXZlbCA9PT0gJ2xvZycpIHdyaXRlUGFkZGVkTGluZShjaGFsay5ibGFjaygnTE9HOiAgICAgJyksIGNoYWxrLmdyZXkoaXRlbS5tZXNzYWdlKSwgJyNGRkZGRkYnKVxuXG4gICAgICBpZihpdGVtLmxldmVsID09PSAnaW5mbycpIHdyaXRlUGFkZGVkTGluZShjaGFsay5ibGFjaygnSU5GTzogICAgJyksIGNoYWxrLmdyZXkoaXRlbS5tZXNzYWdlKSwgJyNGRkZGRkYnKVxuXG4gICAgICBpZihpdGVtLmxldmVsID09PSAnbWFpbCcpIHdyaXRlUGFkZGVkTGluZShjaGFsay5ibGFjaygnTUFJTDogICAgJyksIGNoYWxrLmdyZXkoaXRlbS5tZXNzYWdlKSwgJyNGRkZGRkYnKVxuXG4gICAgICBpZihpdGVtLmxldmVsID09PSAnZXJyb3InKSB3cml0ZVBhZGRlZExpbmUoY2hhbGsuYmxhY2soJ0VSUk9SOiAgICcpLCBjaGFsay5yZWQoaXRlbS5tZXNzYWdlKSwgJyNGRkZGRkYnKVxuXG4gICAgfVxuXG4gIH0pXG5cbiAgd3JpdGVQYWRkZWRMaW5lKG51bGwsICcnLCAnI0ZGRkZGRicpXG5cbn1cbiIsImltcG9ydCBjb2xsZWN0T2JqZWN0cyBmcm9tICcuL2NvbGxlY3Rfb2JqZWN0cydcblxubGV0IG1hcHBlZCA9IG51bGxcblxuY29uc3QgbW9kZWxzID0gKHRhYmxlKSA9PiB7XG5cbiAgaWYobWFwcGVkKSByZXR1cm4gbWFwcGVkW3RhYmxlXVxuXG4gIG1hcHBlZCA9IGNvbGxlY3RPYmplY3RzKCdtb2RlbHMvKicpLnJlZHVjZSgob2JqZWN0cywgbW9kZWwpID0+IHtcblxuICAgIGNvbnN0IG9iamVjdCA9IG1vZGVsLmRlZmF1bHRcblxuICAgIGNvbnN0IGluc3RhbmNlID0gb2JqZWN0LmV4dGVuZCgpLl9fc3VwZXJfX1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLm9iamVjdHMsXG4gICAgICBbaW5zdGFuY2UudGFibGVOYW1lXToge1xuICAgICAgICBtb2RlbDogb2JqZWN0LFxuICAgICAgICBkaXNwbGF5TmFtZTogaW5zdGFuY2UuZGlzcGxheU5hbWUsXG4gICAgICAgIGRpc3BsYXlBdHRyaWJ1dGU6IGluc3RhbmNlLmRpc3BsYXlBdHRyaWJ1dGVcbiAgICAgIH1cbiAgICB9XG5cbiAgfSwge30pXG5cbiAgcmV0dXJuIG1hcHBlZFt0YWJsZV1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBtb2RlbHNcbiIsImltcG9ydCBodG1sVG9UZXh0IGZyb20gJ2h0bWwtZW1haWwtdG8tdGV4dCdcbmltcG9ydCBzZXMgZnJvbSAnLi4vc2VydmljZXMvc2VzJ1xuaW1wb3J0IGlubGluZSBmcm9tICdpbmxpbmUtY3NzJ1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnXG5cbmNvbnN0IHNlbmRNYWlsID0gYXN5bmMgKGVtYWlsKSA9PiB7XG5cbiAgY29uc3QgaHRtbCA9IGF3YWl0IGlubGluZShlbWFpbC5odG1sLCB7IHVybDogcHJvY2Vzcy5lbnYuV0VCX0hPU1QsIHByZXNlcnZlTWVkaWFRdWVyaWVzOiB0cnVlIH0pXG5cbiAgY29uc3QgcmVuZGVyZWQgPSB7XG4gICAgLi4uZW1haWwsXG4gICAgdG86IHByb2Nlc3MuZW52LkVNQUlMX1JFRElSRUNUIHx8IGVtYWlsLnRvLFxuICAgIGh0bWwsXG4gICAgdGV4dDogaHRtbFRvVGV4dChlbWFpbC5odG1sKVxuICB9XG5cbiAgdHJ5IHtcblxuICAgIGlmKHByb2Nlc3MuZW52LkVNQUlMX0RFTElWRVJZID09PSAnY29uc29sZScpIHJldHVybiBhd2FpdCBfc2VuZFZpYUNvbnNvbGUocmVuZGVyZWQpXG5cbiAgICBpZihwcm9jZXNzLmVudi5FTUFJTF9ERUxJVkVSWSA9PT0gJ3NlcycpIHJldHVybiBhd2FpdCBfc2VuZFZpYVNFUyhyZW5kZXJlZClcblxuICB9IGNhdGNoKGVycikge1xuXG4gICAgcmV0dXJuIHsgZXJyb3I6IGVyci5tZXNzYWdlIH1cblxuICB9XG5cbn1cblxuY29uc3QgX3NlbmRWaWFDb25zb2xlID0gYXN5bmMgKHJlbmRlcmVkKSA9PiB7XG5cbiAgY29uc3Qgb3V0cHV0ID0gW1xuICAgIEFycmF5KDg2KS5qb2luKCctJyksXG4gICAgYFRPOiAke3JlbmRlcmVkLnRvfWAsXG4gICAgYFNVQkpFQ1Q6ICR7cmVuZGVyZWQuc3ViamVjdH1gLFxuICAgIEFycmF5KDg2KS5qb2luKCctJyksXG4gICAgcmVuZGVyZWQudGV4dCxcbiAgICBBcnJheSg4Nikuam9pbignLScpXG4gIF1cblxuICBjb25zb2xlLm1haWwob3V0cHV0LmpvaW4oJ1xcbicpKVxuXG4gIHJldHVybiB7IHNlbnRfYXQ6IG1vbWVudCgpIH1cblxufVxuXG5jb25zdCBfc2VuZFZpYVNFUyA9IGFzeW5jIChyZW5kZXJlZCkgPT4ge1xuXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIHNlcy5zZW5kTWFpbChyZW5kZXJlZCwgYXN5bmMgKGVyciwgaW5mbykgPT4ge1xuXG4gICAgICBpZihlcnIpIHJlamVjdChlcnIpXG5cbiAgICAgIHJlc29sdmUoaW5mbylcblxuICAgIH0pXG5cblxuICB9KVxuXG4gIHJldHVybiB7IHNlc19pZDogcmVzdWx0LnJlc3BvbnNlLCBzZW50X2F0OiBtb21lbnQoKSB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgc2VuZE1haWxcbiIsImltcG9ydCBDaGVja2l0IGZyb20gJ2NoZWNraXQnXG5cbkNoZWNraXQuVmFsaWRhdG9yLnByb3RvdHlwZS5jdXJyZW5jeSA9IGZ1bmN0aW9uKHZhbCkge1xuXG4gIGNvbnN0IGNvbHVtbiA9IE9iamVjdC5rZXlzKHRoaXMuX3RhcmdldCkucmVkdWNlKChjb2x1bW4sIGtleSkgPT4ge1xuICAgIHJldHVybiBjb2x1bW4gfHwgKHRoaXMuX3RhcmdldFtrZXldID09PSB2YWwgPyBrZXkgOiBudWxsKVxuICB9LCBudWxsKVxuXG4gIGlmKCF2YWwubWF0Y2goL15cXGR7MSx9XFwuXFxkezJ9JC8pKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJHtjb2x1bW59IG11c3QgYmUgdmFsaWQgY3VycmVuY3lgKVxuICB9XG5cbiAgcmV0dXJuIHRydWVcblxufVxuIiwiaW1wb3J0IENoZWNraXQgZnJvbSAnY2hlY2tpdCdcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCdcblxuQ2hlY2tpdC5WYWxpZGF0b3IucHJvdG90eXBlLmRhdGVzdHJpbmcgPSBmdW5jdGlvbih2YWwpIHtcblxuICBjb25zdCBjb2x1bW4gPSBPYmplY3Qua2V5cyh0aGlzLl90YXJnZXQpLnJlZHVjZSgoY29sdW1uLCBrZXkpID0+IHtcbiAgICByZXR1cm4gY29sdW1uIHx8ICh0aGlzLl90YXJnZXRba2V5XSA9PT0gdmFsID8ga2V5IDogbnVsbClcbiAgfSwgbnVsbClcblxuICBpZihfLmlzU3RyaW5nKHZhbCkgJiYgIXZhbC5tYXRjaCgvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9JC8pKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJHtjb2x1bW59IG11c3QgYmUgaW4gdGhlIGZvcm1hdCBZWVlZLU1NLUREYClcbiAgfVxuXG4gIHJldHVybiB0cnVlXG5cbn1cbiIsImltcG9ydCBDaGVja2l0IGZyb20gJ2NoZWNraXQnXG5cbkNoZWNraXQuVmFsaWRhdG9yLnByb3RvdHlwZS5ncmVhdGVyVGhhbkZpZWxkID0gZnVuY3Rpb24odmFsLCBwYXJhbSkge1xuXG4gIGlmKHZhbCA8PSB0aGlzLl90YXJnZXRbcGFyYW1dKSB0aHJvdyBuZXcgRXJyb3IoYG11c3QgYmUgZ3JlYXRlciB0aGFuIHRoZSAke3BhcmFtfWApXG5cbiAgcmV0dXJuIHRydWVcblxufVxuIiwiaW1wb3J0IENoZWNraXQgZnJvbSAnY2hlY2tpdCdcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50J1xuXG5DaGVja2l0LlZhbGlkYXRvci5wcm90b3R5cGUubGF0ZXJUaGFuID0gZnVuY3Rpb24odmFsLCBwYXJhbSkge1xuXG4gIGNvbnN0IHRvZGF5ID0gbW9tZW50KCkuZm9ybWF0KCdZWVlZLU1NLUREJylcblxuICBjb25zdCBmaXJzdCA9IG1vbWVudChgJHt0b2RheX0gJHt0aGlzLl90YXJnZXRbcGFyYW1dfWApXG5cbiAgY29uc3QgbGFzdCA9IG1vbWVudChgJHt0b2RheX0gJHt2YWx9YClcblxuICBjb25zb2xlLmxvZyhmaXJzdCwgbGFzdCwgbGFzdC5kaWZmKGZpcnN0KSA8PSAwKVxuXG4gIGlmKGxhc3QuZGlmZihmaXJzdCkgPD0gMCkgdGhyb3cgbmV3IEVycm9yKGBtdXN0IGJlIGFmdGVyIHRoYW4gdGhlICR7cGFyYW19YClcblxuICByZXR1cm4gdHJ1ZVxuXG59XG4iLCJpbXBvcnQgQ2hlY2tpdCBmcm9tICdjaGVja2l0J1xuXG5DaGVja2l0LlZhbGlkYXRvci5wcm90b3R5cGUudGltZSA9IGZ1bmN0aW9uKHZhbCkge1xuXG4gIGNvbnN0IGNvbHVtbiA9IE9iamVjdC5rZXlzKHRoaXMuX3RhcmdldCkucmVkdWNlKChjb2x1bW4sIGtleSkgPT4ge1xuICAgIHJldHVybiBjb2x1bW4gfHwgKHRoaXMuX3RhcmdldFtrZXldID09PSB2YWwgPyBrZXkgOiBudWxsKVxuICB9LCBudWxsKVxuXG4gIGlmKHZhbC5tYXRjaCgvXihcXGR7MSwyfSk6KFxcZHsyfSk6PyhcXGR7Mn0pP1xccz8oW2FtfHBtXSopPyQvaSkgPT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAke2NvbHVtbn0gbXVzdCBiZSB2YWxpZCB0aW1lYClcbiAgfVxuXG4gIHJldHVybiB0cnVlXG5cbn1cbiIsImltcG9ydCBrbmV4IGZyb20gJy4uL3NlcnZpY2VzL2tuZXgnXG5pbXBvcnQgQ2hlY2tpdCBmcm9tICdjaGVja2l0J1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuXG5DaGVja2l0LlZhbGlkYXRvci5wcm90b3R5cGUudW5pcXVlID0gZnVuY3Rpb24odmFsLCBwYXJhbXMgPSB7fSwgb3B0aW9ucyA9IHt9KSB7XG5cbiAgY29uc3QgdGFibGVOYW1lID0gcGFyYW1zLnRhYmxlTmFtZSB8fCBvcHRpb25zLnRhYmxlTmFtZVxuXG4gIGNvbnN0IGNvbHVtbiA9IE9iamVjdC5rZXlzKHRoaXMuX3RhcmdldCkucmVkdWNlKChjb2x1bW4sIGtleSkgPT4ge1xuICAgIHJldHVybiBjb2x1bW4gfHwgKHRoaXMuX3RhcmdldFtrZXldID09PSB2YWwgPyBrZXkgOiBudWxsKVxuICB9LCBudWxsKVxuXG4gIGxldCBxdWVyeSA9IGtuZXgodGFibGVOYW1lKS53aGVyZShjb2x1bW4sICc9JywgdmFsKVxuXG4gIGlmKF8uaXNTdHJpbmcocGFyYW1zKSkge1xuICAgIHBhcmFtcy5zcGxpdCgnLCcpLm1hcChrZXkgPT4ge1xuICAgICAgcXVlcnkgPSBxdWVyeS53aGVyZShrZXksIHRoaXMuX3RhcmdldFtrZXldKVxuICAgIH0pXG4gIH1cblxuICBpZih0aGlzLl90YXJnZXQudGVhbV9pZCkge1xuICAgIHF1ZXJ5ID0gcXVlcnkud2hlcmUoeyB0ZWFtX2lkOiB0aGlzLl90YXJnZXQudGVhbV9pZH0pXG4gIH1cblxuICBpZih0aGlzLl90YXJnZXQuaWQpIHtcbiAgICBxdWVyeSA9IHF1ZXJ5LndoZXJlTm90KHsgaWQ6IHRoaXMuX3RhcmdldC5pZCB9KVxuICB9XG5cbiAgcmV0dXJuIHF1ZXJ5LnRoZW4ocmVzcCA9PiB7XG4gICAgaWYocmVzcC5sZW5ndGggPiAwKSB0aHJvdyBuZXcgRXJyb3IoYFRoZSAke2NvbHVtbn0gaXMgYWxyZWFkeSBpbiB1c2VgKVxuICB9KVxuXG59XG5DaGVja2l0LlZhbGlkYXRvci5wcm90b3R5cGUudW5pcXVlLm1lc3NhZ2UgPSAnRm9vJ1xuIiwiaW1wb3J0IE5vdGlmaWNhdGlvblNlcmlhbGl6ZXIgZnJvbSAnLi4vc2VyaWFsaXplcnMvbm90aWZpY2F0aW9uX3NlcmlhbGl6ZXInXG5pbXBvcnQgTm90aWZpY2F0aW9uIGZyb20gJy4uL21vZGVscy9ub3RpZmljYXRpb24nXG5pbXBvcnQgc2VuZE1haWwgZnJvbSAnLi4vY29yZS91dGlscy9zZW5kX21haWwnXG5pbXBvcnQgc29ja2V0IGZyb20gJy4uL2NvcmUvc2VydmljZXMvZW1pdHRlcidcbmltcG9ydCBrbmV4IGZyb20gJy4uL2NvcmUvc2VydmljZXMva25leCdcbmltcG9ydCBjcm9uIGZyb20gJy4uL2NvcmUvb2JqZWN0cy9jcm9uJ1xuaW1wb3J0IHBsdXJhbGl6ZSBmcm9tICdwbHVyYWxpemUnXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgZWpzIGZyb20gJ2VqcydcbmltcG9ydCBmcyBmcm9tICdmcydcblxuY29uc3QgbWFoYVJvb3QgPSBwYXRoLnJlc29sdmUoJ2FwcHMnLCAnbWFoYScsICdzcmMnKVxuXG5jb25zdCBtZXNzYWdlVGVtcGxhdGUgPSBmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKG1haGFSb290LCAnZW1haWxzJywgJ25vdGlmaWNhdGlvbl9lbWFpbCcsICdodG1sLmVqcycpKS50b1N0cmluZygpXG5cbmNvbnN0IGVudmVsb3BlVGVtcGxhdGUgPSBmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKG1haGFSb290LCAnY29yZScsICd0ZW1wbGF0ZXMnLCAnZW52ZWxvcGUuZWpzJykpLnRvU3RyaW5nKClcblxuY29uc3QgaG9zdCA9IHByb2Nlc3MuZW52LldFQl9IT1NUXG5cbmV4cG9ydCBjb25zdCBwcm9jZXNzb3IgPSBhc3luYyAodHJ4KSA9PiB7XG5cbiAgY29uc3Qgbm90aWZpY2F0aW9uX21ldGhvZF9pZCA9IDJcblxuICBjb25zdCBub3RpZmljYXRpb25zID0gYXdhaXQgTm90aWZpY2F0aW9uLnF1ZXJ5KHFiID0+IHtcblxuICAgIHFiLmpvaW5SYXcoJ2lubmVyIGpvaW4gXCJtYWhhX3VzZXJzXCIgb24gXCJtYWhhX3VzZXJzXCIuXCJpZFwiPVwibWFoYV9ub3RpZmljYXRpb25zXCIuXCJ1c2VyX2lkXCIgYW5kIFwibWFoYV91c2Vyc1wiLlwibm90aWZpY2F0aW9uX21ldGhvZF9pZFwiPT8nLCBub3RpZmljYXRpb25fbWV0aG9kX2lkKVxuXG4gICAgcWIud2hlcmUoJ21haGFfbm90aWZpY2F0aW9ucy5jcmVhdGVkX2F0JywgJzwnLCBtb21lbnQoKS5zdWJ0cmFjdCg1LCAnbWludXRlcycpKVxuXG4gICAgcWIud2hlcmUoJ21haGFfbm90aWZpY2F0aW9ucy5pc19kZWxpdmVyZWQnLCBmYWxzZSlcblxuICAgIHFiLm9yZGVyQnkoJ2NyZWF0ZWRfYXQnLCAnZGVzYycpXG5cbiAgfSkuZmV0Y2hBbGwoeyB3aXRoUmVsYXRlZDogWydhcHAnLCAnb2JqZWN0X293bmVyJywgJ3N1YmplY3QucGhvdG8nLCAnc3RvcnknLCAndGVhbScsICd1c2VyJ10sIHRyYW5zYWN0aW5nOiB0cnggfSlcblxuICBjb25zdCBzZXJpYWxpemVkID0gbm90aWZpY2F0aW9ucy5tYXAobm90aWZpY2F0aW9uID0+IE5vdGlmaWNhdGlvblNlcmlhbGl6ZXIobnVsbCwgbnVsbCwgbm90aWZpY2F0aW9uKSlcblxuICBjb25zdCB1c2VycyA9IHNlcmlhbGl6ZWQucmVkdWNlKCh1c2Vycywgbm90aWZpY2F0aW9uKSA9PiAoe1xuICAgIC4uLnVzZXJzLFxuICAgIFtub3RpZmljYXRpb24udXNlci5pZF06IHtcbiAgICAgIHVzZXI6IG5vdGlmaWNhdGlvbi51c2VyLFxuICAgICAgbm90aWZpY2F0aW9uczogW1xuICAgICAgICAuLi5fLmdldCh1c2VycywgYFske25vdGlmaWNhdGlvbi51c2VyLmlkfV0ubm90aWZpY2F0aW9uc2ApIHx8IFtdLFxuICAgICAgICB7XG4gICAgICAgICAgLi4ubm90aWZpY2F0aW9uLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBfZ2V0RGVzY3JpcHRpb24obm90aWZpY2F0aW9uKVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9KSwgW10pXG5cbiAgYXdhaXQgUHJvbWlzZS5tYXAoT2JqZWN0LmtleXModXNlcnMpLCBhc3luYyAodXNlcl9pZCkgPT4ge1xuXG4gICAgY29uc3QgdXNlciA9IHVzZXJzW3VzZXJfaWRdLnVzZXJcblxuICAgIGNvbnN0IGNvbnRlbnQgPSBlanMucmVuZGVyKG1lc3NhZ2VUZW1wbGF0ZSwgeyBtb21lbnQsIHBsdXJhbGl6ZSwgaG9zdCwgbm90aWZpY2F0aW9uX21ldGhvZF9pZCwgdXNlciwgbm90aWZpY2F0aW9uczogdXNlcnNbdXNlcl9pZF0ubm90aWZpY2F0aW9ucyB9KVxuXG4gICAgY29uc3QgaHRtbCA9IGVqcy5yZW5kZXIoZW52ZWxvcGVUZW1wbGF0ZSwgeyBtb21lbnQsIGhvc3QsIGNvbnRlbnQgfSlcblxuICAgIGNvbnN0IGVtYWlsID0ge1xuICAgICAgZnJvbTogYCR7bm90aWZpY2F0aW9ucy50b0FycmF5KClbMF0ucmVsYXRlZCgndGVhbScpLmdldCgndGl0bGUnKX0gPG1haWxlckBtYWhhcGxhdGZvcm0uY29tPmAsXG4gICAgICB0bzogdXNlci5yZmM4MjIsXG4gICAgICBzdWJqZWN0OiAnSGVyZVxcJ3Mgd2hhdCB5b3VcXCd2ZSBtaXNzZWQhJyxcbiAgICAgIGh0bWwsXG4gICAgICBsaXN0OiB7XG4gICAgICAgIHVuc3Vic2NyaWJlOiB7XG4gICAgICAgICAgdXJsOiBob3N0KycjcHJlZmVyZW5jZXMnLFxuICAgICAgICAgIGNvbW1lbnQ6ICdVbnN1YnNjcmliZSdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGF3YWl0IHNlbmRNYWlsKGVtYWlsKVxuXG4gICAgY29uc3QgaWRzID0gdXNlcnNbdXNlcl9pZF0ubm90aWZpY2F0aW9ucy5zbGljZSgwLCA2KS5tYXAobm90aWZpY2F0aW9uID0+IG5vdGlmaWNhdGlvbi5pZClcblxuICAgIGF3YWl0IGtuZXgoJ21haGFfbm90aWZpY2F0aW9ucycpLnRyYW5zYWN0aW5nKHRyeCkud2hlcmVJbignaWQnLCBpZHMpLnVwZGF0ZSh7IGlzX2RlbGl2ZXJlZDogdHJ1ZSB9KVxuXG4gIH0pXG5cbiAgcmV0dXJuIG5vdGlmaWNhdGlvbnMubWFwKG5vdGlmaWNhdGlvbiA9PiBub3RpZmljYXRpb24pXG5cbn1cblxuZXhwb3J0IGNvbnN0IGFmdGVyQ29tbWl0ID0gYXN5bmMgKHRyeCwgcmVzdWx0KSA9PiB7XG5cbiAgYXdhaXQgUHJvbWlzZS5tYXAocmVzdWx0LCBhc3luYyAobm90aWZpY2F0aW9uKSA9PiB7XG5cbiAgICBhd2FpdCBzb2NrZXQuaW4oYC9hZG1pbi91c2Vycy8ke25vdGlmaWNhdGlvbi5nZXQoJ3VzZXJfaWQnKX1gKS5lbWl0KCdtZXNzYWdlJywge1xuICAgICAgdGFyZ2V0OiBgL2FkbWluL3VzZXJzLyR7bm90aWZpY2F0aW9uLmdldCgndXNlcl9pZCcpfWAsXG4gICAgICBhY3Rpb246ICdzZXNzaW9uJyxcbiAgICAgIGRhdGE6IG51bGxcbiAgICB9KVxuXG4gIH0pXG5cblxufVxuXG5jb25zdCBfZ2V0RGVzY3JpcHRpb24gPSAobm90aWZpY2F0aW9uKSA9PiB7XG5cbiAgcmV0dXJuIG5vdGlmaWNhdGlvbi5zdG9yeS5yZXBsYWNlKCd7b2JqZWN0fScsIGAke19nZXREZXNjcmlwdGlvbkFydGljbGUobm90aWZpY2F0aW9uKX0gJHtub3RpZmljYXRpb24ub2JqZWN0LnR5cGV9IDxzdHJvbmc+JHtub3RpZmljYXRpb24ub2JqZWN0LnRleHR9PC9zdHJvbmc+YClcblxufVxuXG5jb25zdCBfZ2V0RGVzY3JpcHRpb25BcnRpY2xlID0gKG5vdGlmaWNhdGlvbikgPT4ge1xuXG4gIGlmKG5vdGlmaWNhdGlvbi5vYmplY3Qub3duZXJfaWQgPT09IG5vdGlmaWNhdGlvbi5zdWJqZWN0LmlkKSByZXR1cm4gJ3RoZWlyJ1xuXG4gIGlmKG5vdGlmaWNhdGlvbi5vYmplY3Qub3duZXJfaWQgPT09IG5vdGlmaWNhdGlvbi51c2VyLmlkKSByZXR1cm4gJ3lvdXInXG5cbiAgcmV0dXJuICd0aGUnXG5cbn1cblxuY29uc3QgZGlnZXN0Q3JvbiA9IGNyb24oe1xuICBuYW1lOiAnbm90aWZpY2F0aW9uJyxcbiAgc2NoZWR1bGU6ICcwIDAgMiAqICogKicsXG4gIHByb2Nlc3NvcjogcHJvY2Vzc29yLFxuICBhZnRlckNvbW1pdFxufSlcblxuZXhwb3J0IGRlZmF1bHQgZGlnZXN0Q3JvblxuIiwiaW1wb3J0IE1vZGVsIGZyb20gJy4uL2NvcmUvb2JqZWN0cy9tb2RlbCdcbmltcG9ydCBBcHAgZnJvbSAnLi9hcHAnXG5pbXBvcnQgU3RvcnkgZnJvbSAnLi9zdG9yeSdcbmltcG9ydCBVc2VyIGZyb20gJy4vdXNlcidcblxuY29uc3QgQWN0aXZpdHkgPSBuZXcgTW9kZWwoe1xuXG4gIHRhYmxlTmFtZTogJ21haGFfYWN0aXZpdGllcycsXG5cbiAgZGlzcGxheU5hbWU6ICdhY3Rpdml0eScsXG5cbiAgcnVsZXM6IHtcbiAgICB1c2VyX2lkOiBbJ3JlcXVpcmVkJ11cbiAgfSxcblxuICBhcHAoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmVsb25nc1RvKEFwcCwgJ2FwcF9pZCcpXG4gIH0sXG5cbiAgb2JqZWN0X293bmVyKCkge1xuICAgIHJldHVybiB0aGlzLmJlbG9uZ3NUbyhVc2VyLCAnb2JqZWN0X293bmVyX2lkJylcbiAgfSxcblxuICBzdG9yeSgpIHtcbiAgICByZXR1cm4gdGhpcy5iZWxvbmdzVG8oU3RvcnksICdzdG9yeV9pZCcpXG4gIH0sXG5cbiAgdXNlcigpIHtcbiAgICByZXR1cm4gdGhpcy5iZWxvbmdzVG8oVXNlciwgJ3VzZXJfaWQnKVxuICB9XG5cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEFjdGl2aXR5XG4iLCJpbXBvcnQgTW9kZWwgZnJvbSAnLi4vY29yZS9vYmplY3RzL21vZGVsJ1xuaW1wb3J0IEF1dGhvciBmcm9tICcuL2FwcF9hdXRob3InXG5pbXBvcnQgQ2F0ZWdvcnkgZnJvbSAnLi9hcHBfY2F0ZWdvcnknXG5pbXBvcnQgUm9sZSBmcm9tICcuL3JvbGUnXG5cbmNvbnN0IEFwcCA9IG5ldyBNb2RlbCh7XG5cbiAgdGFibGVOYW1lOiAnbWFoYV9hcHBzJyxcblxuICBkaXNwbGF5TmFtZTogJ2FwcCcsXG5cbiAgZGlzcGxheUF0dHJpYnV0ZTogJ3RpdGxlJyxcblxuICBydWxlczoge1xuICAgIHRpdGxlOiBbJ3JlcXVpcmVkJywgJ3VuaXF1ZSddXG4gIH0sXG5cbiAgYXV0aG9yKCkge1xuICAgIHJldHVybiB0aGlzLmJlbG9uZ3NUbyhBdXRob3IsICdhcHBfYXV0aG9yX2lkJylcbiAgfSxcblxuICBjYXRlZ29yeSgpIHtcbiAgICByZXR1cm4gdGhpcy5iZWxvbmdzVG8oQ2F0ZWdvcnksICdhcHBfY2F0ZWdvcnlfaWQnKVxuICB9LFxuXG4gIHJvbGVzKCkge1xuICAgIHJldHVybiB0aGlzLmJlbG9uZ3NUb01hbnkoUm9sZSwgJ21haGFfcm9sZXNfYXBwcycsICdyb2xlX2lkJywgJ2FwcF9pZCcpXG4gIH1cblxufSlcblxuZXhwb3J0IGRlZmF1bHQgQXBwXG4iLCJpbXBvcnQgTW9kZWwgZnJvbSAnLi4vY29yZS9vYmplY3RzL21vZGVsJ1xuaW1wb3J0IEFwcCBmcm9tICcuL2FwcCdcblxuY29uc3QgQXBwQXV0aG9yID0gbmV3IE1vZGVsKHtcblxuICB0YWJsZU5hbWU6ICdtYWhhX2FwcF9hdXRob3JzJyxcblxuICBkaXNwbGF5TmFtZTogJ2FwcCBhdXRob3InLFxuXG4gIGRpc3BsYXlBdHRyaWJ1dGU6ICduYW1lJyxcblxuICBydWxlczoge1xuICAgIG5hbWU6IFsncmVxdWlyZWQnLCAndW5pcXVlJ11cbiAgfSxcblxuICBhcHBzKCkge1xuICAgIHJldHVybiB0aGlzLmhhc01hbnkoQXBwLCAnYXBwX2F1dGhvcl9pZCcpXG4gIH1cblxufSlcblxuZXhwb3J0IGRlZmF1bHQgQXBwQXV0aG9yXG4iLCJpbXBvcnQgTW9kZWwgZnJvbSAnLi4vY29yZS9vYmplY3RzL21vZGVsJ1xuaW1wb3J0IEFwcCBmcm9tICcuL2FwcCdcblxuY29uc3QgQXBwQ2F0ZWdvcnkgPSBuZXcgTW9kZWwoe1xuXG4gIHRhYmxlTmFtZTogJ21haGFfYXBwX2NhdGVnb3JpZXMnLFxuXG4gIGRpc3BsYXlOYW1lOiAnYXBwIGNhdGVnb3J5JyxcblxuICBkaXNwbGF5QXR0cmlidXRlOiAndGl0bGUnLFxuXG4gIHJ1bGVzOiB7XG4gICAgdGl0bGU6IFsncmVxdWlyZWQnLCAndW5pcXVlJ11cbiAgfSxcblxuICBhcHBzKCkge1xuICAgIHJldHVybiB0aGlzLmhhc01hbnkoQXBwLCAnYXBwX2NhdGVnb3J5X2lkJylcbiAgfVxuXG59KVxuXG5leHBvcnQgZGVmYXVsdCBBcHBDYXRlZ29yeVxuIiwiaW1wb3J0IE1vZGVsIGZyb20gJy4uL2NvcmUvb2JqZWN0cy9tb2RlbCdcbmltcG9ydCBBc3NldFN0YXR1cyBmcm9tICcuL2Fzc2V0X3N0YXR1cydcbmltcG9ydCBVc2VyIGZyb20gJy4vdXNlcidcbmltcG9ydCBTb3VyY2UgZnJvbSAnLi9zb3VyY2UnXG5cbmNvbnN0IEFzc2V0cyA9IG5ldyBNb2RlbCh7XG5cbiAgdGFibGVOYW1lOiAnbWFoYV9hc3NldHMnLFxuXG4gIGRpc3BsYXlOYW1lOiAnYXNzZXQnLFxuXG4gIGRpc3BsYXlBdHRyaWJ1dGU6ICdmaWxlX25hbWUnLFxuXG4gIHZpcnR1YWxzOiB7XG5cbiAgICBleHRlbnNpb246IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KCdmaWxlX25hbWUnKS5zcGxpdCgnLicpLnBvcCgpXG4gICAgfSxcblxuICAgIGlkZW50aWZpZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KCdmaWxlX3NpemUnKSsnLScrdGhpcy5nZXQoJ29yaWdpbmFsX2ZpbGVfbmFtZScpLnJlcGxhY2UoL1teMC05YS16QS1aXy1dL2ltZywgJycpXG4gICAgfSxcblxuICAgIGlzX2ltYWdlOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldCgnY29udGVudF90eXBlJykubWF0Y2goL2ltYWdlLykgIT09IG51bGxcbiAgICB9LFxuXG4gICAgaGFzX3ByZXZpZXc6IGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgaXNfcGRmID0gdGhpcy5nZXQoJ2NvbnRlbnRfdHlwZScpLm1hdGNoKC9wZGYvKSAhPT0gbnVsbFxuICAgICAgY29uc3QgaXNfZG9jID0gdGhpcy5nZXQoJ2NvbnRlbnRfdHlwZScpLm1hdGNoKC9tc3dvcmQvKSAhPT0gbnVsbFxuICAgICAgY29uc3QgaXNfeGxzID0gdGhpcy5nZXQoJ2NvbnRlbnRfdHlwZScpLm1hdGNoKC9leGNlbC8pICE9PSBudWxsXG4gICAgICBjb25zdCBpc19vcGVub2ZmaWNlID0gdGhpcy5nZXQoJ2NvbnRlbnRfdHlwZScpLm1hdGNoKC9vZmZpY2Vkb2N1bWVudC8pICE9PSBudWxsXG4gICAgICBjb25zdCBpc19lbWFpbCA9IHRoaXMuZ2V0KCdjb250ZW50X3R5cGUnKS5tYXRjaCgvcmZjODIyLykgIT09IG51bGxcbiAgICAgIGNvbnN0IGlzX2h0bWwgPSB0aGlzLmdldCgnY29udGVudF90eXBlJykubWF0Y2goL2h0bWwvKSAhPT0gbnVsbFxuICAgICAgcmV0dXJuIGlzX3BkZiB8fCBpc19kb2MgfHwgaXNfeGxzIHx8IGlzX2VtYWlsIHx8IGlzX29wZW5vZmZpY2UgfHwgaXNfaHRtbFxuICAgIH0sXG5cbiAgICBwYXRoOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAoIXRoaXMuaXNOZXcoKSkgPyBgL2Fzc2V0cy8ke3RoaXMuZ2V0KCdpZCcpfS8ke3RoaXMuZ2V0KCdmaWxlX25hbWUnKX1gIDogbnVsbFxuICAgIH0sXG5cbiAgICB1cmw6IGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgaG9zdCA9IHByb2Nlc3MuZW52LkRBVEFfQVNTRVRfQ0ROX0hPU1QgfHwgcHJvY2Vzcy5lbnYuREFUQV9BU1NFVF9IT1NUIHx8ICcnXG4gICAgICByZXR1cm4gKCF0aGlzLmlzTmV3KCkpID8gYCR7aG9zdH0ke3RoaXMuZ2V0KCdwYXRoJyl9YCA6IG51bGxcbiAgICB9XG5cbiAgfSxcblxuICBzb3VyY2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmVsb25nc1RvKFNvdXJjZSwgJ3NvdXJjZV9pZCcpXG4gIH0sXG5cbiAgc3RhdHVzKCkge1xuICAgIHJldHVybiB0aGlzLmJlbG9uZ3NUbyhBc3NldFN0YXR1cywgJ3N0YXR1c19pZCcpXG4gIH0sXG5cbiAgdXNlcigpIHtcbiAgICByZXR1cm4gdGhpcy5iZWxvbmdzVG8oVXNlciwgJ3VzZXJfaWQnKVxuICB9XG5cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEFzc2V0c1xuIiwiaW1wb3J0IE1vZGVsIGZyb20gJy4uL2NvcmUvb2JqZWN0cy9tb2RlbCdcblxuY29uc3QgQXNzZXRTdGF0dXMgPSBuZXcgTW9kZWwoe1xuXG4gIHRhYmxlTmFtZTogJ21haGFfYXNzZXRfc3RhdHVzZXMnLFxuXG4gIGRpc3BsYXlOYW1lOiAnc3RhdHVzJyxcblxuICBkaXNwbGF5QXR0cmlidXRlOiAnJ1xuXG59KVxuXG5leHBvcnQgZGVmYXVsdCBBc3NldFN0YXR1c1xuIiwiaW1wb3J0IE1vZGVsIGZyb20gJy4uL2NvcmUvb2JqZWN0cy9tb2RlbCdcbmltcG9ydCBBc3NldCBmcm9tICcuL2Fzc2V0J1xuaW1wb3J0IFNlcnZpY2UgZnJvbSAnLi9zZXJ2aWNlJ1xuXG5jb25zdCBBdHRhY2htZW50ID0gbmV3IE1vZGVsKHtcblxuICB0YWJsZU5hbWU6ICdtYWhhX2F0dGFjaG1lbnRzJyxcblxuICBkaXNwbGF5TmFtZTogJ2F0dGFjaG1lbnQnLFxuXG4gIGRpc3BsYXlBdHRyaWJ1dGU6ICcnLFxuXG4gIGFzc2V0KCkge1xuICAgIHJldHVybiB0aGlzLmJlbG9uZ3NUbyhBc3NldCwgJ2Fzc2V0X2lkJylcbiAgfSxcblxuICBzZXJ2aWNlKCkge1xuICAgIHJldHVybiB0aGlzLmJlbG9uZ3NUbyhTZXJ2aWNlLCAnc2VydmljZV9pZCcpXG4gIH1cblxufSlcblxuZXhwb3J0IGRlZmF1bHQgQXR0YWNobWVudFxuIiwiaW1wb3J0IE1vZGVsIGZyb20gJy4uL2NvcmUvb2JqZWN0cy9tb2RlbCdcbmltcG9ydCBTdG9yeSBmcm9tICcuL3N0b3J5J1xuaW1wb3J0IFVzZXIgZnJvbSAnLi91c2VyJ1xuXG5jb25zdCBBdWRpdCA9IG5ldyBNb2RlbCh7XG5cbiAgdGFibGVOYW1lOiAnbWFoYV9hdWRpdHMnLFxuXG4gIGRpc3BsYXlOYW1lOiAnYXVkaXQnLFxuXG4gIGRpc3BsYXlBdHRyaWJ1dGU6ICcnLFxuXG4gIHN0b3J5OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5iZWxvbmdzVG8oU3RvcnksICdzdG9yeV9pZCcpXG4gIH0sXG5cbiAgdXNlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuYmVsb25nc1RvKFVzZXIsICd1c2VyX2lkJylcbiAgfVxuXG5cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEF1ZGl0XG4iLCJpbXBvcnQgQXR0YWNobWVudCBmcm9tICcuL2F0dGFjaG1lbnQnXG5pbXBvcnQgTW9kZWwgZnJvbSAnLi4vY29yZS9vYmplY3RzL21vZGVsJ1xuaW1wb3J0IFVzZXIgZnJvbSAnLi91c2VyJ1xuXG5jb25zdCBDb21tZW50ID0gbmV3IE1vZGVsKHtcblxuICB0YWJsZU5hbWU6ICdtYWhhX2NvbW1lbnRzJyxcblxuICBkaXNwbGF5TmFtZTogJ2NvbW1lbnQnLFxuXG4gIGRpc3BsYXlBdHRyaWJ1dGU6ICcnLFxuXG4gIHJ1bGVzOiB7XG4gICAgdGV4dDogJ3JlcXVpcmVkJ1xuICB9LFxuXG4gIGF0dGFjaG1lbnRzKCkge1xuICAgIHJldHVybiB0aGlzLm1vcnBoTWFueShBdHRhY2htZW50LCAnYXR0YWNoYWJsZScpXG4gIH0sXG5cbiAgdXNlcigpIHtcbiAgICByZXR1cm4gdGhpcy5iZWxvbmdzVG8oVXNlciwgJ3VzZXJfaWQnKVxuICB9XG5cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IENvbW1lbnRcbiIsImltcG9ydCBNb2RlbCBmcm9tICcuLi9jb3JlL29iamVjdHMvbW9kZWwnXG5cbmNvbnN0IERvbWFpbiA9IG5ldyBNb2RlbCh7XG5cbiAgdGFibGVOYW1lOiAnbWFoYV9kb21haW5zJyxcblxuICBkaXNwbGF5TmFtZTogJ2RvbWFpbicsXG5cbiAgZGlzcGxheUF0dHJpYnV0ZTogJ3RpdGxlJyxcblxuICBydWxlczoge1xuICAgIHRpdGxlOiAncmVxdWlyZWQnXG4gIH1cblxufSlcblxuZXhwb3J0IGRlZmF1bHQgRG9tYWluXG4iLCJpbXBvcnQgTW9kZWwgZnJvbSAnLi4vY29yZS9vYmplY3RzL21vZGVsJ1xuaW1wb3J0IFVzZXIgZnJvbSAnLi91c2VyJ1xuXG5jb25zdCBHcm91cCA9IG5ldyBNb2RlbCh7XG5cbiAgdGFibGVOYW1lOiAnbWFoYV9ncm91cHMnLFxuXG4gIGRpc3BsYXlOYW1lOiAnZ3JvdXAnLFxuXG4gIGRpc3BsYXlBdHRyaWJ1dGU6ICd0aXRsZScsXG5cbiAgcnVsZXM6IHtcbiAgICB0aXRsZTogWydyZXF1aXJlZCcsICd1bmlxdWUnXVxuICB9LFxuXG4gIHVzZXJzKCkge1xuICAgIHJldHVybiB0aGlzLmJlbG9uZ3NUb01hbnkoVXNlciwgJ21haGFfdXNlcnNfZ3JvdXBzJywgJ2dyb3VwX2lkJywgJ3VzZXJfaWQnKVxuICB9XG5cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEdyb3VwXG4iLCJpbXBvcnQgTW9kZWwgZnJvbSAnLi4vY29yZS9vYmplY3RzL21vZGVsJ1xuaW1wb3J0IFVzZXIgZnJvbSAnLi91c2VyJ1xuXG5jb25zdCBMaWtlID0gbmV3IE1vZGVsKHtcblxuICB0YWJsZU5hbWU6ICdtYWhhX2xpa2VzJyxcblxuICBkaXNwbGF5TmFtZTogJ2xpa2UnLFxuXG4gIGRpc3BsYXlBdHRyaWJ1dGU6ICcnLFxuXG4gIHJ1bGVzOiB7XG5cbiAgfSxcblxuICB2aXJ0dWFsczoge1xuXG4gIH0sXG5cbiAgdXNlcigpIHtcbiAgICByZXR1cm4gdGhpcy5iZWxvbmdzVG8oVXNlciwgJ3VzZXJfaWQnKVxuICB9XG5cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IExpa2VcbiIsImltcG9ydCBNb2RlbCBmcm9tICcuLi9jb3JlL29iamVjdHMvbW9kZWwnXG5pbXBvcnQgVXNlciBmcm9tICcuL3VzZXInXG5cbmNvbnN0IExpc3RlbmluZyA9IG5ldyBNb2RlbCh7XG5cbiAgdGFibGVOYW1lOiAnbWFoYV9saXN0ZW5pbmdzJyxcblxuICBkaXNwbGF5TmFtZTogJ2xpc3RlbmVyJyxcblxuICBkaXNwbGF5QXR0cmlidXRlOiAnJyxcblxuICBydWxlczoge1xuICAgIGxpc3RlbmFibGVfdHlwZTogJ3JlcXVpcmVkJyxcbiAgICBsaXN0ZW5hYmxlX2lkOiAncmVxdWlyZWQnLFxuICAgIHVzZXJfaWQ6ICdyZXF1aXJlZCdcbiAgfSxcblxuICB1c2VyKCkge1xuICAgIHJldHVybiB0aGlzLmJlbG9uZ3NUbyhVc2VyLCAndXNlcl9pZCcpXG4gIH1cblxufSlcblxuZXhwb3J0IGRlZmF1bHQgTGlzdGVuaW5nXG4iLCJpbXBvcnQgTW9kZWwgZnJvbSAnLi4vY29yZS9vYmplY3RzL21vZGVsJ1xuaW1wb3J0IEFwcCBmcm9tICcuL2FwcCdcbmltcG9ydCBTdG9yeSBmcm9tICcuL3N0b3J5J1xuaW1wb3J0IFVzZXIgZnJvbSAnLi91c2VyJ1xuXG5jb25zdCBOb3RpZmljYXRpb24gPSBuZXcgTW9kZWwoe1xuXG4gIHRhYmxlTmFtZTogJ21haGFfbm90aWZpY2F0aW9ucycsXG5cbiAgZGlzcGxheU5hbWU6ICdub3RpZmljYXRpb24nLFxuXG4gIHJ1bGVzOiB7XG4gICAgdXNlcl9pZDogWydyZXF1aXJlZCddXG4gIH0sXG5cbiAgYXBwKCkge1xuICAgIHJldHVybiB0aGlzLmJlbG9uZ3NUbyhBcHAsICdhcHBfaWQnKVxuICB9LFxuXG4gIG9iamVjdF9vd25lcigpIHtcbiAgICByZXR1cm4gdGhpcy5iZWxvbmdzVG8oVXNlciwgJ29iamVjdF9vd25lcl9pZCcpXG4gIH0sXG5cbiAgc3ViamVjdCgpIHtcbiAgICByZXR1cm4gdGhpcy5iZWxvbmdzVG8oVXNlciwgJ3N1YmplY3RfaWQnKVxuICB9LFxuXG4gIG9iamVjdCgpIHtcbiAgICByZXR1cm4gdGhpcy5tb3JwaFRvKCdvYmplY3QnLCBbJ29iamVjdF90YWJsZScsICdvYmplY3RfaWQnXSlcbiAgfSxcblxuICBzdG9yeSgpIHtcbiAgICByZXR1cm4gdGhpcy5iZWxvbmdzVG8oU3RvcnksICdzdG9yeV9pZCcpXG4gIH0sXG5cbiAgdXNlcigpIHtcbiAgICByZXR1cm4gdGhpcy5iZWxvbmdzVG8oVXNlciwgJ3VzZXJfaWQnKVxuICB9XG5cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IE5vdGlmaWNhdGlvblxuIiwiaW1wb3J0IE1vZGVsIGZyb20gJy4uL2NvcmUvb2JqZWN0cy9tb2RlbCdcbmltcG9ydCBVc2VyIGZyb20gJy4vdXNlcidcblxuY29uc3QgTm90aWZpY2F0aW9uTWV0aG9kID0gbmV3IE1vZGVsKHtcblxuICB0YWJsZU5hbWU6ICdtYWhhX25vdGlmaWNhdGlvbl9tZXRob2RzJyxcblxuICBkaXNwbGF5TmFtZTogJ25vdGlmaWNhdGlvbl9tZXRob2QnLFxuXG4gIGRpc3BsYXlBdHRyaWJ1dGU6ICd0aXRsZScsXG5cbiAgdXNlcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmVsb25nc1RvTWFueShVc2VyLCAnbm90aWZpY2F0aW9uX21ldGhvZF9pZCcpXG4gIH1cblxufSlcblxuZXhwb3J0IGRlZmF1bHQgTm90aWZpY2F0aW9uTWV0aG9kXG4iLCJpbXBvcnQgTW9kZWwgZnJvbSAnLi4vY29yZS9vYmplY3RzL21vZGVsJ1xuaW1wb3J0IFNvdXJjZSBmcm9tICcuL3NvdXJjZSdcbmltcG9ydCBVc2VyIGZyb20gJy4vdXNlcidcblxuY29uc3QgUHJvZmlsZSA9IG5ldyBNb2RlbCh7XG5cbiAgdGFibGVOYW1lOiAnbWFoYV9wcm9maWxlcycsXG5cbiAgZGlzcGxheU5hbWU6ICdwcm9maWxlJyxcblxuICBkaXNwbGF5QXR0cmlidXRlOiAndHlwZScsXG5cbiAgcnVsZXM6IHtcbiAgfSxcblxuICB1c2VyKCkge1xuICAgIHJldHVybiB0aGlzLmJlbG9uZ3NUbyhVc2VyLCAndXNlcl9pZCcpXG4gIH0sXG5cbiAgc291cmNlKCkge1xuICAgIHJldHVybiB0aGlzLmJlbG9uZ3NUbyhTb3VyY2UsICdzb3VyY2VfaWQnKVxuICB9XG5cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFByb2ZpbGVcbiIsImltcG9ydCBBdHRhY2htZW50IGZyb20gJy4vYXR0YWNobWVudCdcbmltcG9ydCBNb2RlbCBmcm9tICcuLi9jb3JlL29iamVjdHMvbW9kZWwnXG5pbXBvcnQgVXNlciBmcm9tICcuL3VzZXInXG5cbmNvbnN0IFJldmlldyA9IG5ldyBNb2RlbCh7XG5cbiAgdGFibGVOYW1lOiAnbWFoYV9yZXZpZXdzJyxcblxuICBkaXNwbGF5TmFtZTogJ3JldmlldycsXG5cbiAgZGlzcGxheUF0dHJpYnV0ZTogJycsXG5cbiAgcnVsZXM6IHtcbiAgICBzY29yZTogWydyZXF1aXJlZCcsJ2dyZWF0ZXJUaGFuRXF1YWxUbzowJywnbGVzc1RoYW5FcXVhbFRvOjUnXSxcbiAgICB0ZXh0OiAncmVxdWlyZWQnXG4gIH0sXG5cbiAgdmlydHVhbHM6IHtcblxuICB9LFxuXG4gIGF0dGFjaG1lbnRzKCkge1xuICAgIHJldHVybiB0aGlzLm1vcnBoTWFueShBdHRhY2htZW50LCAnYXR0YWNoYWJsZScpXG4gIH0sXG5cbiAgdXNlcigpIHtcbiAgICByZXR1cm4gdGhpcy5iZWxvbmdzVG8oVXNlciwgJ3VzZXJfaWQnKVxuICB9XG5cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFJldmlld1xuIiwiaW1wb3J0IE1vZGVsIGZyb20gJy4uL2NvcmUvb2JqZWN0cy9tb2RlbCdcbmltcG9ydCBBcHAgZnJvbSAnLi9hcHAnXG5pbXBvcnQgUm9sZSBmcm9tICcuL3JvbGUnXG5cbmNvbnN0IFJpZ2h0ID0gbmV3IE1vZGVsKHtcblxuICB0YWJsZU5hbWU6ICdtYWhhX3JpZ2h0cycsXG5cbiAgZGlzcGxheU5hbWU6ICdyaWdodCcsXG5cbiAgZGlzcGxheUF0dHJpYnV0ZTogJ3RleHQnLFxuXG4gIHdpdGhSZWxhdGVkOiAnYXBwJyxcblxuICBydWxlczoge1xuICAgIHRleHQ6ICdyZXF1aXJlZCcsXG4gICAgYXBwX2lkOiAncmVxdWlyZWQnXG4gIH0sXG5cbiAgdmlydHVhbHM6IHtcblxuICAgIGNvZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMucmVsYXRlZCgnYXBwJykuZ2V0KCd0aXRsZScpLnRvTG93ZXJDYXNlKCkgKyAnOicgKyB0aGlzLmdldCgndGV4dCcpLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzLywgJ18nKVxuICAgIH1cblxuICB9LFxuXG4gIGFwcCgpIHtcbiAgICByZXR1cm4gdGhpcy5iZWxvbmdzVG8oQXBwLCAnYXBwX2lkJylcbiAgfSxcblxuICByb2xlcygpIHtcbiAgICByZXR1cm4gdGhpcy5iZWxvbmdzVG9NYW55KFJvbGUsICdtYWhhX3VzZXJzX3JvbGVzJywgJ3VzZXJfaWQnLCAncm9sZV9pZCcpXG4gIH1cblxufSlcblxuZXhwb3J0IGRlZmF1bHQgUmlnaHRcbiIsImltcG9ydCBNb2RlbCBmcm9tICcuLi9jb3JlL29iamVjdHMvbW9kZWwnXG5pbXBvcnQgQXBwIGZyb20gJy4vYXBwJ1xuaW1wb3J0IFJpZ2h0IGZyb20gJy4vcmlnaHQnXG5pbXBvcnQgVXNlciBmcm9tICcuL3VzZXInXG5cbmNvbnN0IFJvbGUgPSBuZXcgTW9kZWwoe1xuXG4gIHRhYmxlTmFtZTogJ21haGFfcm9sZXMnLFxuXG4gIGRpc3BsYXlOYW1lOiAncm9sZScsXG5cbiAgZGlzcGxheUF0dHJpYnV0ZTogJ3RpdGxlJyxcblxuICBydWxlczoge1xuICAgIHRpdGxlOiBbJ3JlcXVpcmVkJywgJ3VuaXF1ZSddLFxuICAgIGRlc2NyaXB0aW9uOiAncmVxdWlyZWQnXG4gIH0sXG5cbiAgYXBwcygpIHtcbiAgICByZXR1cm4gdGhpcy5iZWxvbmdzVG9NYW55KEFwcCwgJ21haGFfcm9sZXNfYXBwcycsICdyb2xlX2lkJywgJ2FwcF9pZCcpXG4gIH0sXG5cbiAgcmlnaHRzKCkge1xuICAgIHJldHVybiB0aGlzLmJlbG9uZ3NUb01hbnkoUmlnaHQsICdtYWhhX3JvbGVzX3JpZ2h0cycsICdyb2xlX2lkJywgJ3JpZ2h0X2lkJylcbiAgfSxcblxuICB1c2VycygpIHtcbiAgICByZXR1cm4gdGhpcy5iZWxvbmdzVG9NYW55KFVzZXIsICdtYWhhX3VzZXJzX3JvbGVzJywgJ3JvbGVfaWQnLCAndXNlcl9pZCcpXG4gIH1cblxufSlcblxuZXhwb3J0IGRlZmF1bHQgUm9sZVxuIiwiaW1wb3J0IE1vZGVsIGZyb20gJy4uL2NvcmUvb2JqZWN0cy9tb2RlbCdcblxuY29uc3QgU2VjdXJpdHlRdWVzdGlvbiA9IG5ldyBNb2RlbCh7XG5cbiAgdGFibGVOYW1lOiAnbWFoYV9zZWN1cml0eV9xdWVzdGlvbnMnLFxuXG4gIGRpc3BsYXlOYW1lOiAnc2VjdXJpdHkgcXVlc3Rpb24nLFxuXG4gIGRpc3BsYXlBdHRyaWJ1dGU6ICd0ZXh0JyxcblxuICBydWxlczoge1xuICAgIHRleHQ6IFsncmVxdWlyZWQnXVxuICB9XG5cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFNlY3VyaXR5UXVlc3Rpb25cbiIsImltcG9ydCBNb2RlbCBmcm9tICcuLi9jb3JlL29iamVjdHMvbW9kZWwnXG5pbXBvcnQgQXR0YWNobWVudCBmcm9tICcuL2F0dGFjaG1lbnQnXG5cbmNvbnN0IFNlcnZpY2UgPSBuZXcgTW9kZWwoe1xuXG4gIHRhYmxlTmFtZTogJ21haGFfc2VydmljZXMnLFxuXG4gIGRpc3BsYXlOYW1lOiAnYXR0YWNobWVudCcsXG5cbiAgZGlzcGxheUF0dHJpYnV0ZTogJycsXG4gIFxuICBiZWxvbmdzVG9UZWFtOiBmYWxzZSxcbiAgXG4gIGhhc1RpbWVzdGFtcHM6IGZhbHNlLFxuXG4gIGF0dGFjaG1lbnRzKCkge1xuICAgIHJldHVybiB0aGlzLmhhc01hbnkoQXR0YWNobWVudCwgJ3NlcnZpY2VfaWQnKVxuICB9XG5cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFNlcnZpY2VcbiIsImltcG9ydCBNb2RlbCBmcm9tICcuLi9jb3JlL29iamVjdHMvbW9kZWwnXG5pbXBvcnQgQXNzZXQgZnJvbSAnLi9hc3NldCdcbmltcG9ydCBQcm9maWxlIGZyb20gJy4vcHJvZmlsZSdcblxuY29uc3QgU291cmNlID0gbmV3IE1vZGVsKHtcblxuICB0YWJsZU5hbWU6ICdtYWhhX3NvdXJjZXMnLFxuXG4gIGRpc3BsYXlOYW1lOiAnc291cmNlJyxcblxuICBkaXNwbGF5QXR0cmlidXRlOiAnc291cmNlJyxcblxuICBydWxlczoge1xuICB9LFxuXG4gIGFzc2V0cygpIHtcbiAgICByZXR1cm4gdGhpcy5oYXNNYW55KEFzc2V0LCAnYXNzZXRfaWQnKVxuICB9LFxuXG4gIHByb2ZpbGVzKCkge1xuICAgIHJldHVybiB0aGlzLmhhc01hbnkoUHJvZmlsZSwgJ3NvdXJjZV9pZCcpXG4gIH1cblxufSlcblxuZXhwb3J0IGRlZmF1bHQgU291cmNlXG4iLCJpbXBvcnQgTW9kZWwgZnJvbSAnLi4vY29yZS9vYmplY3RzL21vZGVsJ1xuaW1wb3J0IFVzZXIgZnJvbSAnLi91c2VyJ1xuXG5jb25zdCBTdGFyID0gbmV3IE1vZGVsKHtcblxuICB0YWJsZU5hbWU6ICdtYWhhX3N0YXJzJyxcblxuICBkaXNwbGF5TmFtZTogJ3N0YXInLFxuXG4gIGRpc3BsYXlBdHRyaWJ1dGU6ICcnLFxuXG4gIHJ1bGVzOiB7XG5cbiAgfSxcblxuICB2aXJ0dWFsczoge1xuXG4gIH0sXG5cbiAgdXNlcigpIHtcbiAgICByZXR1cm4gdGhpcy5iZWxvbmdzVG8oVXNlciwgJ3VzZXJfaWQnKVxuICB9XG5cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFN0YXJcbiIsImltcG9ydCBNb2RlbCBmcm9tICcuLi9jb3JlL29iamVjdHMvbW9kZWwnXG5cbmNvbnN0IFN0b3J5ID0gbmV3IE1vZGVsKHtcblxuICB0YWJsZU5hbWU6ICdtYWhhX3N0b3JpZXMnLFxuXG4gIGRpc3BsYXlOYW1lOiAnc3RvcnknLFxuXG4gIGRpc3BsYXlBdHRyaWJ1dGU6ICd0ZXh0JyxcblxuICBoYXNUaW1lc3RhbXBzOiBbXSxcblxuICBiZWxvbmdzVG9UZWFtOiBmYWxzZSxcblxuICBydWxlczoge1xuICAgIHRleHQ6ICdyZXF1aXJlZCdcbiAgfVxuXG59KVxuXG5leHBvcnQgZGVmYXVsdCBTdG9yeVxuIiwiaW1wb3J0IE1vZGVsIGZyb20gJy4uL2NvcmUvb2JqZWN0cy9tb2RlbCdcblxuY29uc3QgU3RyYXRlZ3kgPSBuZXcgTW9kZWwoe1xuXG4gIHRhYmxlTmFtZTogJ21haGFfc3RyYXRlZ2llcycsXG5cbiAgZGlzcGxheU5hbWU6ICdzdHJhdGVneScsXG5cbiAgZGlzcGxheUF0dHJpYnV0ZTogJ25hbWUnLFxuXG4gIHJ1bGVzOiB7XG4gICAgbmFtZTogJ3JlcXVpcmVkJ1xuICB9XG5cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFN0cmF0ZWd5XG4iLCJpbXBvcnQgTW9kZWwgZnJvbSAnLi4vY29yZS9vYmplY3RzL21vZGVsJ1xuaW1wb3J0IFVzZXIgZnJvbSAnLi91c2VyJ1xuXG5jb25zdCBTdXBlcnZpc2lvbiA9IG5ldyBNb2RlbCh7XG5cbiAgdGFibGVOYW1lOiAnbWFoYV9zdXBlcnZpc2lvbnMnLFxuXG4gIGRpc3BsYXlOYW1lOiAnc3VwZXJ2aXNpb24nLFxuXG4gIHN1cGVydmlzb3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmVsb25nc1RvKFVzZXIsICdzdXBlcnZpc29yX2lkJylcbiAgfSxcblxuICBlbXBsb3llZSgpIHtcbiAgICByZXR1cm4gdGhpcy5iZWxvbmdzVG8oVXNlciwgJ2VtcGxveWVlX2lkJylcbiAgfVxuXG59KVxuXG5leHBvcnQgZGVmYXVsdCBTdXBlcnZpc2lvblxuIiwiaW1wb3J0IE1vZGVsIGZyb20gJy4uL2NvcmUvb2JqZWN0cy9tb2RlbCdcbmltcG9ydCBBc3NldCBmcm9tICcuL2Fzc2V0J1xuaW1wb3J0IERvbWFpbiBmcm9tICcuL2RvbWFpbidcbmltcG9ydCBTdHJhdGVneSBmcm9tICcuL3N0cmF0ZWd5J1xuXG5jb25zdCBUZWFtID0gbmV3IE1vZGVsKHtcblxuICB0YWJsZU5hbWU6ICdtYWhhX3RlYW1zJyxcblxuICBkaXNwbGF5TmFtZTogJ3RlYW0nLFxuXG4gIGRpc3BsYXlBdHRyaWJ1dGU6ICd0aXRsZScsXG5cbiAgYmVsb25nc1RvVGVhbTogZmFsc2UsXG5cbiAgd2l0aFJlbGF0ZWQ6IFsnbG9nbycsJ3N0cmF0ZWdpZXMnXSxcblxuICBydWxlczoge1xuICAgIHRpdGxlOiBbJ3JlcXVpcmVkJywgJ3VuaXF1ZSddLFxuICAgIHN1YmRvbWFpbjogWydyZXF1aXJlZCcsICd1bmlxdWUnXVxuICB9LFxuXG4gIGRvbWFpbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzTWFueShEb21haW4sICd0ZWFtX2lkJylcbiAgfSxcblxuICBsb2dvKCkge1xuICAgIHJldHVybiB0aGlzLmJlbG9uZ3NUbyhBc3NldCwgJ2xvZ29faWQnKVxuICB9LFxuXG4gIHN0cmF0ZWdpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzTWFueShTdHJhdGVneSwgJ3RlYW1faWQnKVxuICB9XG5cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFRlYW1cbiIsImltcG9ydCBNb2RlbCBmcm9tICcuLi9jb3JlL29iamVjdHMvbW9kZWwnXG5pbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdC1ub2RlanMnXG5pbXBvcnQgQXNzZXQgZnJvbSAnLi9hc3NldCdcbmltcG9ydCBHcm91cCBmcm9tICcuL2dyb3VwJ1xuaW1wb3J0IFJvbGUgZnJvbSAnLi9yb2xlJ1xuaW1wb3J0IE5vdGlmaWNhdGlvbk1ldGhvZCBmcm9tICcuL25vdGlmaWNhdGlvbl9tZXRob2QnXG5pbXBvcnQgU2VjdXJpdHlRdWVzdGlvbiBmcm9tICcuL3NlY3VyaXR5X3F1ZXN0aW9uJ1xuaW1wb3J0IFN1cGVydmlzaW9uIGZyb20gJy4vc3VwZXJ2aXNpb24nXG5pbXBvcnQgVGVhbSBmcm9tICcuL3RlYW0nXG5cbmNvbnN0IFVzZXIgPSBuZXcgTW9kZWwoe1xuXG4gIHRhYmxlTmFtZTogJ21haGFfdXNlcnMnLFxuXG4gIGRpc3BsYXlOYW1lOiAndXNlcicsXG5cbiAgZGlzcGxheUF0dHJpYnV0ZTogJ2Z1bGxfbmFtZScsXG5cbiAgd2l0aFJlbGF0ZWQ6ICdwaG90bycsXG5cbiAgcnVsZXM6IHtcbiAgICBmaXJzdF9uYW1lOiAncmVxdWlyZWQnLFxuICAgIGxhc3RfbmFtZTogJ3JlcXVpcmVkJyxcbiAgICBlbWFpbDogWydyZXF1aXJlZCcsICdlbWFpbCcsICd1bmlxdWUnXVxuICB9LFxuXG4gIHZpcnR1YWxzOiB7XG5cbiAgICBmdWxsX25hbWU6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KCdmaXJzdF9uYW1lJykgKyAnICcgKyB0aGlzLmdldCgnbGFzdF9uYW1lJylcbiAgICB9LFxuXG4gICAgZl9sYXN0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldCgnZmlyc3RfaW5pdGlhbCcpICsgdGhpcy5nZXQoJ2xhc3RfbmFtZScpLnRvTG93ZXJDYXNlKClcbiAgICB9LFxuXG4gICAgZmlyc3RfaW5pdGlhbDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoJ2ZpcnN0X25hbWUnKSA/IHRoaXMuZ2V0KCdmaXJzdF9uYW1lJylbMF0udG9Mb3dlckNhc2UoKSA6ICcnXG4gICAgfSxcblxuICAgIGxhc3RfaW5pdGlhbDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoJ2xhc3RfbmFtZScpID8gdGhpcy5nZXQoJ2xhc3RfbmFtZScpWzBdLnRvTG93ZXJDYXNlKCkgOiAnJ1xuICAgIH0sXG5cbiAgICBpbml0aWFsczogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoJ2ZpcnN0X2luaXRpYWwnKSArIHRoaXMuZ2V0KCdsYXN0X2luaXRpYWwnKVxuICAgIH0sXG5cbiAgICByZmM4MjI6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGAke3RoaXMuZ2V0KCdmdWxsX25hbWUnKX0gPCR7dGhpcy5nZXQoJ2VtYWlsJyl9PmBcbiAgICB9LFxuXG4gICAgZ3JvdXBfaWRzOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlbGF0ZWQoJ2dyb3VwcycpLm1hcChncm91cCA9PiBncm91cC5pZClcbiAgICB9LFxuXG4gICAgcm9sZV9pZHM6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMucmVsYXRlZCgncm9sZXMnKS5tYXAocm9sZSA9PiByb2xlLmlkKVxuICAgIH0sXG5cbiAgICBzdXBlcnZpc29yX2lkczogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZWxhdGVkKCdzdXBlcnZpc29ycycpLm1hcChzdXBlcnZpc29yID0+IHN1cGVydmlzb3IuaWQpXG4gICAgfSxcblxuICAgIHBhc3N3b3JkOiB7XG4gICAgICBnZXQoKSB7fSxcbiAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICBjb25zdCBwYXNzd29yZF9zYWx0ID0gYmNyeXB0LmdlblNhbHRTeW5jKDEwKVxuICAgICAgICB0aGlzLnNldCgncGFzc3dvcmRfc2FsdCcsIHBhc3N3b3JkX3NhbHQpXG4gICAgICAgIHRoaXMuc2V0KCdwYXNzd29yZF9oYXNoJywgYmNyeXB0Lmhhc2hTeW5jKHZhbHVlLCBwYXNzd29yZF9zYWx0KSlcbiAgICAgIH1cbiAgICB9XG5cbiAgfSxcblxuICBub3RpZmljYXRpb25fbWV0aG9kKCkge1xuICAgIHJldHVybiB0aGlzLmJlbG9uZ3NUbyhOb3RpZmljYXRpb25NZXRob2QsICdub3RpZmljYXRpb25fbWV0aG9kX2lkJylcbiAgfSxcblxuICBwaG90bygpIHtcbiAgICByZXR1cm4gdGhpcy5iZWxvbmdzVG8oQXNzZXQsICdwaG90b19pZCcpXG4gIH0sXG5cbiAgc2VjdXJpdHlfcXVlc3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuYmVsb25nc1RvKFNlY3VyaXR5UXVlc3Rpb24sICdzZWN1cml0eV9xdWVzdGlvbl9pZCcpXG4gIH0sXG5cbiAgZ3JvdXBzKCkge1xuICAgIHJldHVybiB0aGlzLmJlbG9uZ3NUb01hbnkoR3JvdXAsICdtYWhhX3VzZXJzX2dyb3VwcycsICd1c2VyX2lkJywgJ2dyb3VwX2lkJylcbiAgfSxcblxuICByb2xlcygpIHtcbiAgICByZXR1cm4gdGhpcy5iZWxvbmdzVG9NYW55KFJvbGUsICdtYWhhX3VzZXJzX3JvbGVzJywgJ3VzZXJfaWQnLCAncm9sZV9pZCcpXG4gIH0sXG4gIFxuICBzdXBlcnZpc29yczogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzTWFueShVc2VyKS50aHJvdWdoKFN1cGVydmlzaW9uLCAnaWQnLCAnZW1wbG95ZWVfaWQnLCAnc3VwZXJ2aXNvcl9pZCcpXG4gIH0sXG5cbiAgdGVhbSgpIHtcbiAgICByZXR1cm4gdGhpcy5iZWxvbmdzVG8oVGVhbSwgJ3RlYW1faWQnKVxuICB9LFxuXG4gIGF1dGhlbnRpY2F0ZShwYXNzd29yZCkge1xuICAgIHJldHVybiB0aGlzLmdldCgncGFzc3dvcmRfaGFzaCcpID09PSBiY3J5cHQuaGFzaFN5bmMocGFzc3dvcmQsIHRoaXMuZ2V0KCdwYXNzd29yZF9zYWx0JykpXG4gIH1cblxufSlcblxuZXhwb3J0IGRlZmF1bHQgVXNlclxuIiwiaW1wb3J0IHNlcmlhbGl6ZXIgZnJvbSAnLi4vY29yZS9vYmplY3RzL3NlcmlhbGl6ZXInXG5pbXBvcnQgbW9kZWxzIGZyb20gJy4uL2NvcmUvdXRpbHMvbW9kZWxfYWN0aXZpdGllcydcblxuY29uc3Qgbm90aWZpY2F0aW9uU2VyaWFsaXplciA9IHNlcmlhbGl6ZXIoKHJlcSwgdHJ4LCByZXN1bHQpID0+IHtcblxuICBjb25zdCB1c2VyID0gdXNlckRhdGEocmVzdWx0LnJlbGF0ZWQoJ3VzZXInKSlcblxuICBjb25zdCBzdWJqZWN0ID0gdXNlckRhdGEocmVzdWx0LnJlbGF0ZWQoJ3N1YmplY3QnKSlcblxuICBjb25zdCBvYmplY3QgPSBvYmplY3REYXRhKHJlc3VsdClcblxuICBjb25zdCBzdWJqZWN0X3RleHQgPSBzdWJqZWN0VGV4dChzdWJqZWN0LCB1c2VyKVxuXG4gIGNvbnN0IGFydGljbGVfdGV4dCA9IGFydGljbGVUZXh0KHN1YmplY3QsIG9iamVjdCwgdXNlcilcblxuICBjb25zdCBvYmplY3RfdGV4dCA9IG9iamVjdFRleHQoc3ViamVjdCwgb2JqZWN0LCB1c2VyKVxuXG4gIGNvbnN0IHN0b3J5ID0gcmVzdWx0LnJlbGF0ZWQoJ3N0b3J5JykuZ2V0KCd0ZXh0JylcblxuICBjb25zdCBkZXNjcmlwdGlvbiA9IFtdXG5cbiAgaWYoc3ViamVjdF90ZXh0KSBkZXNjcmlwdGlvbi5wdXNoKHN1YmplY3RfdGV4dClcblxuICBkZXNjcmlwdGlvbi5wdXNoKHN0b3J5LnJlcGxhY2UoJ3tvYmplY3R9JywgYCR7YXJ0aWNsZV90ZXh0fSR7b2JqZWN0X3RleHR9YCkpXG5cbiAgcmV0dXJuIHtcblxuICAgIGlkOiByZXN1bHQuZ2V0KCdpZCcpLFxuXG4gICAgY29kZTogcmVzdWx0LmdldCgnY29kZScpLFxuXG4gICAgdXJsOiByZXN1bHQuZ2V0KCd1cmwnKSxcblxuICAgIGlzX3NlZW46IHJlc3VsdC5nZXQoJ2lzX3NlZW4nKSxcblxuICAgIGlzX3Zpc2l0ZWQ6IHJlc3VsdC5nZXQoJ2lzX3Zpc2l0ZWQnKSxcblxuICAgIGFwcDogYXBwKHJlc3VsdC5yZWxhdGVkKCdhcHAnKSksXG5cbiAgICB1c2VyLFxuXG4gICAgc3ViamVjdCxcblxuICAgIG9iamVjdCxcblxuICAgIHN1YmplY3RfdGV4dCxcblxuICAgIGFydGljbGVfdGV4dCxcblxuICAgIHN0b3J5LFxuXG4gICAgb2JqZWN0X3RleHQsXG5cbiAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24uam9pbignICcpLFxuXG4gICAgY3JlYXRlZF9hdDogcmVzdWx0LmdldCgnY3JlYXRlZF9hdCcpLFxuXG4gICAgdXBkYXRlZF9hdDogcmVzdWx0LmdldCgndXBkYXRlZF9hdCcpXG5cbiAgfVxuXG59KVxuXG5jb25zdCBhcHAgPSAoYXBwKSA9PiAoe1xuXG4gIGlkOiBhcHAuZ2V0KCdpZCcpLFxuXG4gIHRpdGxlOiBhcHAuZ2V0KCd0aXRsZScpLFxuXG4gIGNvbG9yOiBhcHAuZ2V0KCdjb2xvcicpLFxuXG4gIGljb246IGFwcC5nZXQoJ2ljb24nKVxuXG59KVxuXG5jb25zdCB1c2VyRGF0YSA9IChyZXN1bHQpID0+IHtcblxuICBpZighcmVzdWx0LmlkKSByZXR1cm4gbnVsbFxuXG4gIHJldHVybiB7XG5cbiAgICBpZDogcmVzdWx0LmdldCgnaWQnKSxcblxuICAgIGZpcnN0X25hbWU6IHJlc3VsdC5nZXQoJ2ZpcnN0X25hbWUnKSxcblxuICAgIGxhc3RfbmFtZTogcmVzdWx0LmdldCgnbGFzdF9uYW1lJyksXG5cbiAgICBmdWxsX25hbWU6IHJlc3VsdC5nZXQoJ2Z1bGxfbmFtZScpLFxuXG4gICAgaW5pdGlhbHM6IHJlc3VsdC5nZXQoJ2luaXRpYWxzJyksXG5cbiAgICByZmM4MjI6IHJlc3VsdC5nZXQoJ3JmYzgyMicpLFxuXG4gICAgcGhvdG86IHJlc3VsdC5yZWxhdGVkKCdwaG90bycpLmdldCgncGF0aCcpXG5cbiAgfVxuXG59XG5cbmNvbnN0IG9iamVjdERhdGEgPSAocmVzdWx0KSA9PiB7XG5cbiAgY29uc3QgbW9kZWwgPSBtb2RlbHMocmVzdWx0LmdldCgnb2JqZWN0X3RhYmxlJykpXG5cbiAgaWYoIXJlc3VsdC5nZXQoJ29iamVjdF90ZXh0JykpIHJldHVybiBudWxsXG5cbiAgcmV0dXJuIHtcblxuICAgIGlkOiByZXN1bHQuZ2V0KCdvYmplY3RfaWQnKSxcblxuICAgIG93bmVyX2lkOiByZXN1bHQuZ2V0KCdvYmplY3Rfb3duZXJfaWQnKSxcblxuICAgIG93bmVyX2Z1bGxfbmFtZTogcmVzdWx0LnJlbGF0ZWQoJ29iamVjdF9vd25lcicpLmdldCgnZnVsbF9uYW1lJyksXG5cbiAgICB0eXBlOiBtb2RlbC5kaXNwbGF5TmFtZSxcblxuICAgIHRleHQ6IHJlc3VsdC5nZXQoJ29iamVjdF90ZXh0JylcblxuICB9XG5cbn1cblxuY29uc3Qgc3ViamVjdFRleHQgPSAoc3ViamVjdCwgdXNlcikgPT4ge1xuXG4gIGlmKCFzdWJqZWN0KSByZXR1cm4gbnVsbFxuXG4gIHJldHVybiAoc3ViamVjdC5pZCA9PT0gdXNlci5pZCkgPyAnWW91JyA6IHN1YmplY3QuZnVsbF9uYW1lXG5cbn1cblxuY29uc3QgYXJ0aWNsZVRleHQgPSAoc3ViamVjdCwgb2JqZWN0LCB1c2VyKSA9PiB7XG4gIGNvbnN0IHR5cGUgPSBvYmplY3QudHlwZSA/IGAgJHtvYmplY3QudHlwZX1gIDogJydcbiAgaWYob2JqZWN0Lm93bmVyX2lkID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGB0aGUke3R5cGV9IGBcbiAgfSBlbHNlIGlmKG9iamVjdC5vd25lcl9pZCA9PT0gdXNlci5pZCAmJiAoc3ViamVjdC5pZCAhPT0gb2JqZWN0Lm93bmVyX2lkIHx8ICFvYmplY3QuaWQpKSB7XG4gICAgcmV0dXJuIGB5b3VyJHt0eXBlfSBgXG4gIH0gZWxzZSBpZihvYmplY3Qub3duZXJfaWQgIT09IHVzZXIuaWQgJiYgc3ViamVjdC5pZCAhPT0gb2JqZWN0Lm93bmVyX2lkICkge1xuICAgIHJldHVybiBgJHtvYmplY3Qub3duZXJfZnVsbF9uYW1lfSdzJHt0eXBlfSBgXG4gIH0gZWxzZSBpZihvYmplY3Qub3duZXJfaWQgIT09IHVzZXIuaWQgJiYgb2JqZWN0Lm93bmVyX2lkID09PSBzdWJqZWN0LmlkKSB7XG4gICAgcmV0dXJuIGB0aGVpciR7dHlwZX0gYFxuICB9IGVsc2Uge1xuICAgIHJldHVybiBgdGhlJHt0eXBlfSBgXG4gIH1cbn1cblxuY29uc3Qgb2JqZWN0VGV4dCA9IChzdWJqZWN0LCBvYmplY3QsIHVzZXIpID0+IHtcbiAgaWYob2JqZWN0LnR5cGUgPT09ICd1c2VyJyAmJiBvYmplY3QuaWQgPT09IHVzZXIuaWQpIHtcbiAgICByZXR1cm4gJ3lvdXJzZWxmJ1xuICB9IGVsc2UgaWYob2JqZWN0LnR5cGUgPT09ICd1c2VyJyAmJiBvYmplY3QuaWQgPT09IHN1YmplY3QuaWQpIHtcbiAgICByZXR1cm4gJ3RoZW1zZWxmJ1xuICB9XG4gIHJldHVybiBvYmplY3QudGV4dFxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RpZmljYXRpb25TZXJpYWxpemVyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3JcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vaXMtaXRlcmFibGVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnblwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2VcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9wcm9taXNlID0gcmVxdWlyZShcIi4uL2NvcmUtanMvcHJvbWlzZVwiKTtcblxudmFyIF9wcm9taXNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Byb21pc2UpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZ2VuID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICByZXR1cm4gbmV3IF9wcm9taXNlMi5kZWZhdWx0KGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGZ1bmN0aW9uIHN0ZXAoa2V5LCBhcmcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7XG4gICAgICAgICAgdmFyIHZhbHVlID0gaW5mby52YWx1ZTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gX3Byb21pc2UyLmRlZmF1bHQucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHN0ZXAoXCJuZXh0XCIsIHZhbHVlKTtcbiAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBzdGVwKFwidGhyb3dcIiwgZXJyKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3RlcChcIm5leHRcIik7XG4gICAgfSk7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIik7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVmaW5lUHJvcGVydHkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvYXNzaWduXCIpO1xuXG52YXIgX2Fzc2lnbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hc3NpZ24pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfYXNzaWduMi5kZWZhdWx0IHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9pc0l0ZXJhYmxlMiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL2lzLWl0ZXJhYmxlXCIpO1xuXG52YXIgX2lzSXRlcmFibGUzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNJdGVyYWJsZTIpO1xuXG52YXIgX2dldEl0ZXJhdG9yMiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL2dldC1pdGVyYXRvclwiKTtcblxudmFyIF9nZXRJdGVyYXRvcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXRJdGVyYXRvcjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7XG4gICAgdmFyIF9hcnIgPSBbXTtcbiAgICB2YXIgX24gPSB0cnVlO1xuICAgIHZhciBfZCA9IGZhbHNlO1xuICAgIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBfaSA9ICgwLCBfZ2V0SXRlcmF0b3IzLmRlZmF1bHQpKGFyciksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2QgPSB0cnVlO1xuICAgICAgX2UgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBfYXJyO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH0gZWxzZSBpZiAoKDAsIF9pc0l0ZXJhYmxlMy5kZWZhdWx0KShPYmplY3QoYXJyKSkpIHtcbiAgICAgIHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xuICAgIH1cbiAgfTtcbn0oKTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9mcm9tID0gcmVxdWlyZShcIi4uL2NvcmUtanMvYXJyYXkvZnJvbVwiKTtcblxudmFyIF9mcm9tMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Zyb20pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcnIyW2ldID0gYXJyW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBhcnIyO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAoMCwgX2Zyb20yLmRlZmF1bHQpKGFycik7XG4gIH1cbn07IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVnZW5lcmF0b3ItcnVudGltZVwiKTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuYXJyYXkuZnJvbScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuQXJyYXkuZnJvbTtcbiIsInJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3InKTtcbiIsInJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvY29yZS5pcy1pdGVyYWJsZScpO1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmFzc2lnbjtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHknKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYykge1xuICByZXR1cm4gJE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKTtcbn07XG4iLCJyZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYucHJvbWlzZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczcucHJvbWlzZS5maW5hbGx5Jyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNy5wcm9taXNlLnRyeScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL19jb3JlJykuUHJvbWlzZTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICh0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIENvbnN0cnVjdG9yLCBuYW1lLCBmb3JiaWRkZW5GaWVsZCkge1xuICBpZiAoIShpdCBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSB8fCAoZm9yYmlkZGVuRmllbGQgIT09IHVuZGVmaW5lZCAmJiBmb3JiaWRkZW5GaWVsZCBpbiBpdCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IobmFtZSArICc6IGluY29ycmVjdCBpbnZvY2F0aW9uIScpO1xuICB9IHJldHVybiBpdDtcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4vX3RvLWFic29sdXRlLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0lPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSBpZiAoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTykge1xuICAgICAgaWYgKE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcbiIsIi8vIGdldHRpbmcgdGFnIGZyb20gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG52YXIgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG4vLyBFUzMgd3JvbmcgaGVyZVxudmFyIEFSRyA9IGNvZihmdW5jdGlvbiAoKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT0gJ0FyZ3VtZW50cyc7XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIFNjcmlwdCBBY2Nlc3MgRGVuaWVkIGVycm9yXG52YXIgdHJ5R2V0ID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gaXRba2V5XTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgTywgVCwgQjtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKFQgPSB0cnlHZXQoTyA9IE9iamVjdChpdCksIFRBRykpID09ICdzdHJpbmcnID8gVFxuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQVJHID8gY29mKE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKEIgPSBjb2YoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiBCO1xufTtcbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcbiIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7IHZlcnNpb246ICcyLjUuNycgfTtcbmlmICh0eXBlb2YgX19lID09ICdudW1iZXInKSBfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4iLCIndXNlIHN0cmljdCc7XG52YXIgJGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBpbmRleCwgdmFsdWUpIHtcbiAgaWYgKGluZGV4IGluIG9iamVjdCkgJGRlZmluZVByb3BlcnR5LmYob2JqZWN0LCBpbmRleCwgY3JlYXRlRGVzYygwLCB2YWx1ZSkpO1xuICBlbHNlIG9iamVjdFtpbmRleF0gPSB2YWx1ZTtcbn07XG4iLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgdGhhdCwgbGVuZ3RoKSB7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmICh0aGF0ID09PSB1bmRlZmluZWQpIHJldHVybiBmbjtcbiAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG4iLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcbiIsIi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gKFxuICAnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJ1xuKS5zcGxpdCgnLCcpO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbiAodHlwZSwgbmFtZSwgc291cmNlKSB7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GO1xuICB2YXIgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuRztcbiAgdmFyIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlM7XG4gIHZhciBJU19QUk9UTyA9IHR5cGUgJiAkZXhwb3J0LlA7XG4gIHZhciBJU19CSU5EID0gdHlwZSAmICRleHBvcnQuQjtcbiAgdmFyIElTX1dSQVAgPSB0eXBlICYgJGV4cG9ydC5XO1xuICB2YXIgZXhwb3J0cyA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pO1xuICB2YXIgZXhwUHJvdG8gPSBleHBvcnRzW1BST1RPVFlQRV07XG4gIHZhciB0YXJnZXQgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdO1xuICB2YXIga2V5LCBvd24sIG91dDtcbiAgaWYgKElTX0dMT0JBTCkgc291cmNlID0gbmFtZTtcbiAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZiAob3duICYmIGhhcyhleHBvcnRzLCBrZXkpKSBjb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIDogSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICA6IElTX1dSQVAgJiYgdGFyZ2V0W2tleV0gPT0gb3V0ID8gKGZ1bmN0aW9uIChDKSB7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgQykge1xuICAgICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEMoKTtcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBDKGEpO1xuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IEMoYSwgYik7XG4gICAgICAgICAgfSByZXR1cm4gbmV3IEMoYSwgYiwgYyk7XG4gICAgICAgIH0gcmV0dXJuIEMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLm1ldGhvZHMuJU5BTUUlXG4gICAgaWYgKElTX1BST1RPKSB7XG4gICAgICAoZXhwb3J0cy52aXJ0dWFsIHx8IChleHBvcnRzLnZpcnR1YWwgPSB7fSkpW2tleV0gPSBvdXQ7XG4gICAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUucHJvdG90eXBlLiVOQU1FJVxuICAgICAgaWYgKHR5cGUgJiAkZXhwb3J0LlIgJiYgZXhwUHJvdG8gJiYgIWV4cFByb3RvW2tleV0pIGhpZGUoZXhwUHJvdG8sIGtleSwgb3V0KTtcbiAgICB9XG4gIH1cbn07XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG4iLCJ2YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4vX2l0ZXItY2FsbCcpO1xudmFyIGlzQXJyYXlJdGVyID0gcmVxdWlyZSgnLi9faXMtYXJyYXktaXRlcicpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciBnZXRJdGVyRm4gPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xudmFyIEJSRUFLID0ge307XG52YXIgUkVUVVJOID0ge307XG52YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZXJhYmxlLCBlbnRyaWVzLCBmbiwgdGhhdCwgSVRFUkFUT1IpIHtcbiAgdmFyIGl0ZXJGbiA9IElURVJBVE9SID8gZnVuY3Rpb24gKCkgeyByZXR1cm4gaXRlcmFibGU7IH0gOiBnZXRJdGVyRm4oaXRlcmFibGUpO1xuICB2YXIgZiA9IGN0eChmbiwgdGhhdCwgZW50cmllcyA/IDIgOiAxKTtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxlbmd0aCwgc3RlcCwgaXRlcmF0b3IsIHJlc3VsdDtcbiAgaWYgKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ZXJhYmxlICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIC8vIGZhc3QgY2FzZSBmb3IgYXJyYXlzIHdpdGggZGVmYXVsdCBpdGVyYXRvclxuICBpZiAoaXNBcnJheUl0ZXIoaXRlckZuKSkgZm9yIChsZW5ndGggPSB0b0xlbmd0aChpdGVyYWJsZS5sZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgIHJlc3VsdCA9IGVudHJpZXMgPyBmKGFuT2JqZWN0KHN0ZXAgPSBpdGVyYWJsZVtpbmRleF0pWzBdLCBzdGVwWzFdKSA6IGYoaXRlcmFibGVbaW5kZXhdKTtcbiAgICBpZiAocmVzdWx0ID09PSBCUkVBSyB8fCByZXN1bHQgPT09IFJFVFVSTikgcmV0dXJuIHJlc3VsdDtcbiAgfSBlbHNlIGZvciAoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChpdGVyYWJsZSk7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTspIHtcbiAgICByZXN1bHQgPSBjYWxsKGl0ZXJhdG9yLCBmLCBzdGVwLnZhbHVlLCBlbnRyaWVzKTtcbiAgICBpZiAocmVzdWx0ID09PSBCUkVBSyB8fCByZXN1bHQgPT09IFJFVFVSTikgcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcbmV4cG9ydHMuQlJFQUsgPSBCUkVBSztcbmV4cG9ydHMuUkVUVVJOID0gUkVUVVJOO1xuIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYgKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpIF9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcbiIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcbiIsInZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xubW9kdWxlLmV4cG9ydHMgPSBkb2N1bWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuIiwiLy8gZmFzdCBhcHBseSwgaHR0cDovL2pzcGVyZi5sbmtpdC5jb20vZmFzdC1hcHBseS81XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgYXJncywgdGhhdCkge1xuICB2YXIgdW4gPSB0aGF0ID09PSB1bmRlZmluZWQ7XG4gIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IHJldHVybiB1biA/IGZuKClcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCk7XG4gICAgY2FzZSAxOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgY2FzZSA0OiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKTtcbiAgfSByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJncyk7XG59O1xuIiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcbiIsIi8vIGNoZWNrIG9uIGRlZmF1bHQgQXJyYXkgaXRlcmF0b3JcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG9bSVRFUkFUT1JdID09PSBpdCk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG4iLCIvLyBjYWxsIHNvbWV0aGluZyBvbiBpdGVyYXRvciBzdGVwIHdpdGggc2FmZSBjbG9zaW5nIG9uIGVycm9yXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZXJhdG9yLCBmbiwgdmFsdWUsIGVudHJpZXMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZW50cmllcyA/IGZuKGFuT2JqZWN0KHZhbHVlKVswXSwgdmFsdWVbMV0pIDogZm4odmFsdWUpO1xuICAvLyA3LjQuNiBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yLCBjb21wbGV0aW9uKVxuICB9IGNhdGNoIChlKSB7XG4gICAgdmFyIHJldCA9IGl0ZXJhdG9yWydyZXR1cm4nXTtcbiAgICBpZiAocmV0ICE9PSB1bmRlZmluZWQpIGFuT2JqZWN0KHJldC5jYWxsKGl0ZXJhdG9yKSk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJyk7XG52YXIgZGVzY3JpcHRvciA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2hpZGUnKShJdGVyYXRvclByb3RvdHlwZSwgcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyksIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCkge1xuICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHsgbmV4dDogZGVzY3JpcHRvcigxLCBuZXh0KSB9KTtcbiAgc2V0VG9TdHJpbmdUYWcoQ29uc3RydWN0b3IsIE5BTUUgKyAnIEl0ZXJhdG9yJyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgPSByZXF1aXJlKCcuL19saWJyYXJ5Jyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyICRpdGVyQ3JlYXRlID0gcmVxdWlyZSgnLi9faXRlci1jcmVhdGUnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBCVUdHWSA9ICEoW10ua2V5cyAmJiAnbmV4dCcgaW4gW10ua2V5cygpKTsgLy8gU2FmYXJpIGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxudmFyIEZGX0lURVJBVE9SID0gJ0BAaXRlcmF0b3InO1xudmFyIEtFWVMgPSAna2V5cyc7XG52YXIgVkFMVUVTID0gJ3ZhbHVlcyc7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQmFzZSwgTkFNRSwgQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0VEKSB7XG4gICRpdGVyQ3JlYXRlKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcbiAgdmFyIGdldE1ldGhvZCA9IGZ1bmN0aW9uIChraW5kKSB7XG4gICAgaWYgKCFCVUdHWSAmJiBraW5kIGluIHByb3RvKSByZXR1cm4gcHJvdG9ba2luZF07XG4gICAgc3dpdGNoIChraW5kKSB7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgfTtcbiAgdmFyIFRBRyA9IE5BTUUgKyAnIEl0ZXJhdG9yJztcbiAgdmFyIERFRl9WQUxVRVMgPSBERUZBVUxUID09IFZBTFVFUztcbiAgdmFyIFZBTFVFU19CVUcgPSBmYWxzZTtcbiAgdmFyIHByb3RvID0gQmFzZS5wcm90b3R5cGU7XG4gIHZhciAkbmF0aXZlID0gcHJvdG9bSVRFUkFUT1JdIHx8IHByb3RvW0ZGX0lURVJBVE9SXSB8fCBERUZBVUxUICYmIHByb3RvW0RFRkFVTFRdO1xuICB2YXIgJGRlZmF1bHQgPSAkbmF0aXZlIHx8IGdldE1ldGhvZChERUZBVUxUKTtcbiAgdmFyICRlbnRyaWVzID0gREVGQVVMVCA/ICFERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoJ2VudHJpZXMnKSA6IHVuZGVmaW5lZDtcbiAgdmFyICRhbnlOYXRpdmUgPSBOQU1FID09ICdBcnJheScgPyBwcm90by5lbnRyaWVzIHx8ICRuYXRpdmUgOiAkbmF0aXZlO1xuICB2YXIgbWV0aG9kcywga2V5LCBJdGVyYXRvclByb3RvdHlwZTtcbiAgLy8gRml4IG5hdGl2ZVxuICBpZiAoJGFueU5hdGl2ZSkge1xuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoJGFueU5hdGl2ZS5jYWxsKG5ldyBCYXNlKCkpKTtcbiAgICBpZiAoSXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUgJiYgSXRlcmF0b3JQcm90b3R5cGUubmV4dCkge1xuICAgICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgICAgc2V0VG9TdHJpbmdUYWcoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XG4gICAgICAvLyBmaXggZm9yIHNvbWUgb2xkIGVuZ2luZXNcbiAgICAgIGlmICghTElCUkFSWSAmJiB0eXBlb2YgSXRlcmF0b3JQcm90b3R5cGVbSVRFUkFUT1JdICE9ICdmdW5jdGlvbicpIGhpZGUoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgICB9XG4gIH1cbiAgLy8gZml4IEFycmF5I3t2YWx1ZXMsIEBAaXRlcmF0b3J9Lm5hbWUgaW4gVjggLyBGRlxuICBpZiAoREVGX1ZBTFVFUyAmJiAkbmF0aXZlICYmICRuYXRpdmUubmFtZSAhPT0gVkFMVUVTKSB7XG4gICAgVkFMVUVTX0JVRyA9IHRydWU7XG4gICAgJGRlZmF1bHQgPSBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiAkbmF0aXZlLmNhbGwodGhpcyk7IH07XG4gIH1cbiAgLy8gRGVmaW5lIGl0ZXJhdG9yXG4gIGlmICgoIUxJQlJBUlkgfHwgRk9SQ0VEKSAmJiAoQlVHR1kgfHwgVkFMVUVTX0JVRyB8fCAhcHJvdG9bSVRFUkFUT1JdKSkge1xuICAgIGhpZGUocHJvdG8sIElURVJBVE9SLCAkZGVmYXVsdCk7XG4gIH1cbiAgLy8gUGx1ZyBmb3IgbGlicmFyeVxuICBJdGVyYXRvcnNbTkFNRV0gPSAkZGVmYXVsdDtcbiAgSXRlcmF0b3JzW1RBR10gPSByZXR1cm5UaGlzO1xuICBpZiAoREVGQVVMVCkge1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICB2YWx1ZXM6IERFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChWQUxVRVMpLFxuICAgICAga2V5czogSVNfU0VUID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiAkZW50cmllc1xuICAgIH07XG4gICAgaWYgKEZPUkNFRCkgZm9yIChrZXkgaW4gbWV0aG9kcykge1xuICAgICAgaWYgKCEoa2V5IGluIHByb3RvKSkgcmVkZWZpbmUocHJvdG8sIGtleSwgbWV0aG9kc1trZXldKTtcbiAgICB9IGVsc2UgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoQlVHR1kgfHwgVkFMVUVTX0JVRyksIE5BTUUsIG1ldGhvZHMpO1xuICB9XG4gIHJldHVybiBtZXRob2RzO1xufTtcbiIsInZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIFNBRkVfQ0xPU0lORyA9IGZhbHNlO1xuXG50cnkge1xuICB2YXIgcml0ZXIgPSBbN11bSVRFUkFUT1JdKCk7XG4gIHJpdGVyWydyZXR1cm4nXSA9IGZ1bmN0aW9uICgpIHsgU0FGRV9DTE9TSU5HID0gdHJ1ZTsgfTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXRocm93LWxpdGVyYWxcbiAgQXJyYXkuZnJvbShyaXRlciwgZnVuY3Rpb24gKCkgeyB0aHJvdyAyOyB9KTtcbn0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjLCBza2lwQ2xvc2luZykge1xuICBpZiAoIXNraXBDbG9zaW5nICYmICFTQUZFX0NMT1NJTkcpIHJldHVybiBmYWxzZTtcbiAgdmFyIHNhZmUgPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICB2YXIgYXJyID0gWzddO1xuICAgIHZhciBpdGVyID0gYXJyW0lURVJBVE9SXSgpO1xuICAgIGl0ZXIubmV4dCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHsgZG9uZTogc2FmZSA9IHRydWUgfTsgfTtcbiAgICBhcnJbSVRFUkFUT1JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gaXRlcjsgfTtcbiAgICBleGVjKGFycik7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gc2FmZTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkb25lLCB2YWx1ZSkge1xuICByZXR1cm4geyB2YWx1ZTogdmFsdWUsIGRvbmU6ICEhZG9uZSB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge307XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHRydWU7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgbWFjcm90YXNrID0gcmVxdWlyZSgnLi9fdGFzaycpLnNldDtcbnZhciBPYnNlcnZlciA9IGdsb2JhbC5NdXRhdGlvbk9ic2VydmVyIHx8IGdsb2JhbC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyO1xudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciBQcm9taXNlID0gZ2xvYmFsLlByb21pc2U7XG52YXIgaXNOb2RlID0gcmVxdWlyZSgnLi9fY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhlYWQsIGxhc3QsIG5vdGlmeTtcblxuICB2YXIgZmx1c2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHBhcmVudCwgZm47XG4gICAgaWYgKGlzTm9kZSAmJiAocGFyZW50ID0gcHJvY2Vzcy5kb21haW4pKSBwYXJlbnQuZXhpdCgpO1xuICAgIHdoaWxlIChoZWFkKSB7XG4gICAgICBmbiA9IGhlYWQuZm47XG4gICAgICBoZWFkID0gaGVhZC5uZXh0O1xuICAgICAgdHJ5IHtcbiAgICAgICAgZm4oKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKGhlYWQpIG5vdGlmeSgpO1xuICAgICAgICBlbHNlIGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfSBsYXN0ID0gdW5kZWZpbmVkO1xuICAgIGlmIChwYXJlbnQpIHBhcmVudC5lbnRlcigpO1xuICB9O1xuXG4gIC8vIE5vZGUuanNcbiAgaWYgKGlzTm9kZSkge1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soZmx1c2gpO1xuICAgIH07XG4gIC8vIGJyb3dzZXJzIHdpdGggTXV0YXRpb25PYnNlcnZlciwgZXhjZXB0IGlPUyBTYWZhcmkgLSBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMzM5XG4gIH0gZWxzZSBpZiAoT2JzZXJ2ZXIgJiYgIShnbG9iYWwubmF2aWdhdG9yICYmIGdsb2JhbC5uYXZpZ2F0b3Iuc3RhbmRhbG9uZSkpIHtcbiAgICB2YXIgdG9nZ2xlID0gdHJ1ZTtcbiAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgICBuZXcgT2JzZXJ2ZXIoZmx1c2gpLm9ic2VydmUobm9kZSwgeyBjaGFyYWN0ZXJEYXRhOiB0cnVlIH0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIG5vZGUuZGF0YSA9IHRvZ2dsZSA9ICF0b2dnbGU7XG4gICAgfTtcbiAgLy8gZW52aXJvbm1lbnRzIHdpdGggbWF5YmUgbm9uLWNvbXBsZXRlbHkgY29ycmVjdCwgYnV0IGV4aXN0ZW50IFByb21pc2VcbiAgfSBlbHNlIGlmIChQcm9taXNlICYmIFByb21pc2UucmVzb2x2ZSkge1xuICAgIC8vIFByb21pc2UucmVzb2x2ZSB3aXRob3V0IGFuIGFyZ3VtZW50IHRocm93cyBhbiBlcnJvciBpbiBMRyBXZWJPUyAyXG4gICAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUodW5kZWZpbmVkKTtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBwcm9taXNlLnRoZW4oZmx1c2gpO1xuICAgIH07XG4gIC8vIGZvciBvdGhlciBlbnZpcm9ubWVudHMgLSBtYWNyb3Rhc2sgYmFzZWQgb246XG4gIC8vIC0gc2V0SW1tZWRpYXRlXG4gIC8vIC0gTWVzc2FnZUNoYW5uZWxcbiAgLy8gLSB3aW5kb3cucG9zdE1lc3NhZ1xuICAvLyAtIG9ucmVhZHlzdGF0ZWNoYW5nZVxuICAvLyAtIHNldFRpbWVvdXRcbiAgfSBlbHNlIHtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBzdHJhbmdlIElFICsgd2VicGFjayBkZXYgc2VydmVyIGJ1ZyAtIHVzZSAuY2FsbChnbG9iYWwpXG4gICAgICBtYWNyb3Rhc2suY2FsbChnbG9iYWwsIGZsdXNoKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChmbikge1xuICAgIHZhciB0YXNrID0geyBmbjogZm4sIG5leHQ6IHVuZGVmaW5lZCB9O1xuICAgIGlmIChsYXN0KSBsYXN0Lm5leHQgPSB0YXNrO1xuICAgIGlmICghaGVhZCkge1xuICAgICAgaGVhZCA9IHRhc2s7XG4gICAgICBub3RpZnkoKTtcbiAgICB9IGxhc3QgPSB0YXNrO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIDI1LjQuMS41IE5ld1Byb21pc2VDYXBhYmlsaXR5KEMpXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xuXG5mdW5jdGlvbiBQcm9taXNlQ2FwYWJpbGl0eShDKSB7XG4gIHZhciByZXNvbHZlLCByZWplY3Q7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBDKGZ1bmN0aW9uICgkJHJlc29sdmUsICQkcmVqZWN0KSB7XG4gICAgaWYgKHJlc29sdmUgIT09IHVuZGVmaW5lZCB8fCByZWplY3QgIT09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKCdCYWQgUHJvbWlzZSBjb25zdHJ1Y3RvcicpO1xuICAgIHJlc29sdmUgPSAkJHJlc29sdmU7XG4gICAgcmVqZWN0ID0gJCRyZWplY3Q7XG4gIH0pO1xuICB0aGlzLnJlc29sdmUgPSBhRnVuY3Rpb24ocmVzb2x2ZSk7XG4gIHRoaXMucmVqZWN0ID0gYUZ1bmN0aW9uKHJlamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzLmYgPSBmdW5jdGlvbiAoQykge1xuICByZXR1cm4gbmV3IFByb21pc2VDYXBhYmlsaXR5KEMpO1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BTID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKTtcbnZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyICRhc3NpZ24gPSBPYmplY3QuYXNzaWduO1xuXG4vLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1Zylcbm1vZHVsZS5leHBvcnRzID0gISRhc3NpZ24gfHwgcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHZhciBBID0ge307XG4gIHZhciBCID0ge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgUyA9IFN5bWJvbCgpO1xuICB2YXIgSyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbU10gPSA3O1xuICBLLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7IEJba10gPSBrOyB9KTtcbiAgcmV0dXJuICRhc3NpZ24oe30sIEEpW1NdICE9IDcgfHwgT2JqZWN0LmtleXMoJGFzc2lnbih7fSwgQikpLmpvaW4oJycpICE9IEs7XG59KSA/IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHZhciBUID0gdG9PYmplY3QodGFyZ2V0KTtcbiAgdmFyIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSAxO1xuICB2YXIgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgdmFyIGlzRW51bSA9IHBJRS5mO1xuICB3aGlsZSAoYUxlbiA+IGluZGV4KSB7XG4gICAgdmFyIFMgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSk7XG4gICAgdmFyIGtleXMgPSBnZXRTeW1ib2xzID8gZ2V0S2V5cyhTKS5jb25jYXQoZ2V0U3ltYm9scyhTKSkgOiBnZXRLZXlzKFMpO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaiA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaikgaWYgKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpIFRba2V5XSA9IFNba2V5XTtcbiAgfSByZXR1cm4gVDtcbn0gOiAkYXNzaWduO1xuIiwiLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBkUHMgPSByZXF1aXJlKCcuL19vYmplY3QtZHBzJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG52YXIgRW1wdHkgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBjcmVhdGVEaWN0ID0gZnVuY3Rpb24gKCkge1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdpZnJhbWUnKTtcbiAgdmFyIGkgPSBlbnVtQnVnS2V5cy5sZW5ndGg7XG4gIHZhciBsdCA9ICc8JztcbiAgdmFyIGd0ID0gJz4nO1xuICB2YXIgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICByZXF1aXJlKCcuL19odG1sJykuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0Oic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2NyaXB0LXVybFxuICAvLyBjcmVhdGVEaWN0ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuT2JqZWN0O1xuICAvLyBodG1sLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUobHQgKyAnc2NyaXB0JyArIGd0ICsgJ2RvY3VtZW50LkY9T2JqZWN0JyArIGx0ICsgJy9zY3JpcHQnICsgZ3QpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICBjcmVhdGVEaWN0ID0gaWZyYW1lRG9jdW1lbnQuRjtcbiAgd2hpbGUgKGktLSkgZGVsZXRlIGNyZWF0ZURpY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tpXV07XG4gIHJldHVybiBjcmVhdGVEaWN0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKE8gIT09IG51bGwpIHtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5KCk7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gY3JlYXRlRGljdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZFBzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgZFAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYgKCd2YWx1ZScgaW4gQXR0cmlidXRlcykgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcbiIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyA9IGdldEtleXMoUHJvcGVydGllcyk7XG4gIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGkgPSAwO1xuICB2YXIgUDtcbiAgd2hpbGUgKGxlbmd0aCA+IGkpIGRQLmYoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XG4gIHJldHVybiBPO1xufTtcbiIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG4iLCIvLyAxOS4xLjIuOSAvIDE1LjIuMy4yIE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG52YXIgT2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiAoTykge1xuICBPID0gdG9PYmplY3QoTyk7XG4gIGlmIChoYXMoTywgSUVfUFJPVE8pKSByZXR1cm4gT1tJRV9QUk9UT107XG4gIGlmICh0eXBlb2YgTy5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmIE8gaW5zdGFuY2VvZiBPLmNvbnN0cnVjdG9yKSB7XG4gICAgcmV0dXJuIE8uY29uc3RydWN0b3IucHJvdG90eXBlO1xuICB9IHJldHVybiBPIGluc3RhbmNlb2YgT2JqZWN0ID8gT2JqZWN0UHJvdG8gOiBudWxsO1xufTtcbiIsInZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgYXJyYXlJbmRleE9mID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZXMpIHtcbiAgdmFyIE8gPSB0b0lPYmplY3Qob2JqZWN0KTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIE8pIGlmIChrZXkgIT0gSUVfUFJPVE8pIGhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTykge1xuICByZXR1cm4gJGtleXMoTywgZW51bUJ1Z0tleXMpO1xufTtcbiIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiB7IGU6IGZhbHNlLCB2OiBleGVjKCkgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB7IGU6IHRydWUsIHY6IGUgfTtcbiAgfVxufTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSByZXF1aXJlKCcuL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEMsIHgpIHtcbiAgYW5PYmplY3QoQyk7XG4gIGlmIChpc09iamVjdCh4KSAmJiB4LmNvbnN0cnVjdG9yID09PSBDKSByZXR1cm4geDtcbiAgdmFyIHByb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkuZihDKTtcbiAgdmFyIHJlc29sdmUgPSBwcm9taXNlQ2FwYWJpbGl0eS5yZXNvbHZlO1xuICByZXNvbHZlKHgpO1xuICByZXR1cm4gcHJvbWlzZUNhcGFiaWxpdHkucHJvbWlzZTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuIiwidmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0YXJnZXQsIHNyYywgc2FmZSkge1xuICBmb3IgKHZhciBrZXkgaW4gc3JjKSB7XG4gICAgaWYgKHNhZmUgJiYgdGFyZ2V0W2tleV0pIHRhcmdldFtrZXldID0gc3JjW2tleV07XG4gICAgZWxzZSBoaWRlKHRhcmdldCwga2V5LCBzcmNba2V5XSk7XG4gIH0gcmV0dXJuIHRhcmdldDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpO1xudmFyIFNQRUNJRVMgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChLRVkpIHtcbiAgdmFyIEMgPSB0eXBlb2YgY29yZVtLRVldID09ICdmdW5jdGlvbicgPyBjb3JlW0tFWV0gOiBnbG9iYWxbS0VZXTtcbiAgaWYgKERFU0NSSVBUT1JTICYmIEMgJiYgIUNbU1BFQ0lFU10pIGRQLmYoQywgU1BFQ0lFUywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH1cbiAgfSk7XG59O1xuIiwidmFyIGRlZiA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCB0YWcsIHN0YXQpIHtcbiAgaWYgKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpIGRlZihpdCwgVEFHLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHRhZyB9KTtcbn07XG4iLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTtcbiIsInZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nO1xudmFyIHN0b3JlID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IHt9KTtcbn0pKCd2ZXJzaW9ucycsIFtdKS5wdXNoKHtcbiAgdmVyc2lvbjogY29yZS52ZXJzaW9uLFxuICBtb2RlOiByZXF1aXJlKCcuL19saWJyYXJ5JykgPyAncHVyZScgOiAnZ2xvYmFsJyxcbiAgY29weXJpZ2h0OiAnwqkgMjAxOCBEZW5pcyBQdXNoa2FyZXYgKHpsb2lyb2NrLnJ1KSdcbn0pO1xuIiwiLy8gNy4zLjIwIFNwZWNpZXNDb25zdHJ1Y3RvcihPLCBkZWZhdWx0Q29uc3RydWN0b3IpXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG52YXIgU1BFQ0lFUyA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBEKSB7XG4gIHZhciBDID0gYW5PYmplY3QoTykuY29uc3RydWN0b3I7XG4gIHZhciBTO1xuICByZXR1cm4gQyA9PT0gdW5kZWZpbmVkIHx8IChTID0gYW5PYmplY3QoQylbU1BFQ0lFU10pID09IHVuZGVmaW5lZCA/IEQgOiBhRnVuY3Rpb24oUyk7XG59O1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xuLy8gdHJ1ZSAgLT4gU3RyaW5nI2F0XG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFRPX1NUUklORykge1xuICByZXR1cm4gZnVuY3Rpb24gKHRoYXQsIHBvcykge1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpO1xuICAgIHZhciBpID0gdG9JbnRlZ2VyKHBvcyk7XG4gICAgdmFyIGwgPSBzLmxlbmd0aDtcbiAgICB2YXIgYSwgYjtcbiAgICBpZiAoaSA8IDAgfHwgaSA+PSBsKSByZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gYSA8IDB4ZDgwMCB8fCBhID4gMHhkYmZmIHx8IGkgKyAxID09PSBsIHx8IChiID0gcy5jaGFyQ29kZUF0KGkgKyAxKSkgPCAweGRjMDAgfHwgYiA+IDB4ZGZmZlxuICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcbiAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcbiIsInZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBpbnZva2UgPSByZXF1aXJlKCcuL19pbnZva2UnKTtcbnZhciBodG1sID0gcmVxdWlyZSgnLi9faHRtbCcpO1xudmFyIGNlbCA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgc2V0VGFzayA9IGdsb2JhbC5zZXRJbW1lZGlhdGU7XG52YXIgY2xlYXJUYXNrID0gZ2xvYmFsLmNsZWFySW1tZWRpYXRlO1xudmFyIE1lc3NhZ2VDaGFubmVsID0gZ2xvYmFsLk1lc3NhZ2VDaGFubmVsO1xudmFyIERpc3BhdGNoID0gZ2xvYmFsLkRpc3BhdGNoO1xudmFyIGNvdW50ZXIgPSAwO1xudmFyIHF1ZXVlID0ge307XG52YXIgT05SRUFEWVNUQVRFQ0hBTkdFID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSc7XG52YXIgZGVmZXIsIGNoYW5uZWwsIHBvcnQ7XG52YXIgcnVuID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaWQgPSArdGhpcztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICBpZiAocXVldWUuaGFzT3duUHJvcGVydHkoaWQpKSB7XG4gICAgdmFyIGZuID0gcXVldWVbaWRdO1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gICAgZm4oKTtcbiAgfVxufTtcbnZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudCkge1xuICBydW4uY2FsbChldmVudC5kYXRhKTtcbn07XG4vLyBOb2RlLmpzIDAuOSsgJiBJRTEwKyBoYXMgc2V0SW1tZWRpYXRlLCBvdGhlcndpc2U6XG5pZiAoIXNldFRhc2sgfHwgIWNsZWFyVGFzaykge1xuICBzZXRUYXNrID0gZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGZuKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICB2YXIgaSA9IDE7XG4gICAgd2hpbGUgKGFyZ3VtZW50cy5sZW5ndGggPiBpKSBhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xuICAgIHF1ZXVlWysrY291bnRlcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgICAgIGludm9rZSh0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJyA/IGZuIDogRnVuY3Rpb24oZm4pLCBhcmdzKTtcbiAgICB9O1xuICAgIGRlZmVyKGNvdW50ZXIpO1xuICAgIHJldHVybiBjb3VudGVyO1xuICB9O1xuICBjbGVhclRhc2sgPSBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShpZCkge1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gIH07XG4gIC8vIE5vZGUuanMgMC44LVxuICBpZiAocmVxdWlyZSgnLi9fY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soY3R4KHJ1biwgaWQsIDEpKTtcbiAgICB9O1xuICAvLyBTcGhlcmUgKEpTIGdhbWUgZW5naW5lKSBEaXNwYXRjaCBBUElcbiAgfSBlbHNlIGlmIChEaXNwYXRjaCAmJiBEaXNwYXRjaC5ub3cpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgRGlzcGF0Y2gubm93KGN0eChydW4sIGlkLCAxKSk7XG4gICAgfTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBNZXNzYWdlQ2hhbm5lbCwgaW5jbHVkZXMgV2ViV29ya2Vyc1xuICB9IGVsc2UgaWYgKE1lc3NhZ2VDaGFubmVsKSB7XG4gICAgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIHBvcnQgPSBjaGFubmVsLnBvcnQyO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGlzdGVuZXI7XG4gICAgZGVmZXIgPSBjdHgocG9ydC5wb3N0TWVzc2FnZSwgcG9ydCwgMSk7XG4gIC8vIEJyb3dzZXJzIHdpdGggcG9zdE1lc3NhZ2UsIHNraXAgV2ViV29ya2Vyc1xuICAvLyBJRTggaGFzIHBvc3RNZXNzYWdlLCBidXQgaXQncyBzeW5jICYgdHlwZW9mIGl0cyBwb3N0TWVzc2FnZSBpcyAnb2JqZWN0J1xuICB9IGVsc2UgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyICYmIHR5cGVvZiBwb3N0TWVzc2FnZSA9PSAnZnVuY3Rpb24nICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0cykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoaWQgKyAnJywgJyonKTtcbiAgICB9O1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgLy8gSUU4LVxuICB9IGVsc2UgaWYgKE9OUkVBRFlTVEFURUNIQU5HRSBpbiBjZWwoJ3NjcmlwdCcpKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoY2VsKCdzY3JpcHQnKSlbT05SRUFEWVNUQVRFQ0hBTkdFXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaHRtbC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgICAgcnVuLmNhbGwoaWQpO1xuICAgICAgfTtcbiAgICB9O1xuICAvLyBSZXN0IG9sZCBicm93c2Vyc1xuICB9IGVsc2Uge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBzZXRUaW1lb3V0KGN0eChydW4sIGlkLCAxKSwgMCk7XG4gICAgfTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogc2V0VGFzayxcbiAgY2xlYXI6IGNsZWFyVGFza1xufTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59O1xuIiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCA9IE1hdGguY2VpbDtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07XG4iLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuIiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG4iLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcbiIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBTKSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSByZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcbiIsInZhciBpZCA9IDA7XG52YXIgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIG5hdmlnYXRvciA9IGdsb2JhbC5uYXZpZ2F0b3I7XG5cbm1vZHVsZS5leHBvcnRzID0gbmF2aWdhdG9yICYmIG5hdmlnYXRvci51c2VyQWdlbnQgfHwgJyc7XG4iLCJ2YXIgc3RvcmUgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgnd2tzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG52YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuU3ltYm9sO1xudmFyIFVTRV9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09ICdmdW5jdGlvbic7XG5cbnZhciAkZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgVVNFX1NZTUJPTCAmJiBTeW1ib2xbbmFtZV0gfHwgKFVTRV9TWU1CT0wgPyBTeW1ib2wgOiB1aWQpKCdTeW1ib2wuJyArIG5hbWUpKTtcbn07XG5cbiRleHBvcnRzLnN0b3JlID0gc3RvcmU7XG4iLCJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3JNZXRob2QgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ICE9IHVuZGVmaW5lZCkgcmV0dXJuIGl0W0lURVJBVE9SXVxuICAgIHx8IGl0WydAQGl0ZXJhdG9yJ11cbiAgICB8fCBJdGVyYXRvcnNbY2xhc3NvZihpdCldO1xufTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGdldCA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvciA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgaXRlckZuID0gZ2V0KGl0KTtcbiAgaWYgKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIHJldHVybiBhbk9iamVjdChpdGVyRm4uY2FsbChpdCkpO1xufTtcbiIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5pc0l0ZXJhYmxlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBPID0gT2JqZWN0KGl0KTtcbiAgcmV0dXJuIE9bSVRFUkFUT1JdICE9PSB1bmRlZmluZWRcbiAgICB8fCAnQEBpdGVyYXRvcicgaW4gT1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgICB8fCBJdGVyYXRvcnMuaGFzT3duUHJvcGVydHkoY2xhc3NvZihPKSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKTtcbnZhciBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fY3JlYXRlLXByb3BlcnR5Jyk7XG52YXIgZ2V0SXRlckZuID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKShmdW5jdGlvbiAoaXRlcikgeyBBcnJheS5mcm9tKGl0ZXIpOyB9KSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjIuMSBBcnJheS5mcm9tKGFycmF5TGlrZSwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQpXG4gIGZyb206IGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlIC8qICwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQgKi8pIHtcbiAgICB2YXIgTyA9IHRvT2JqZWN0KGFycmF5TGlrZSk7XG4gICAgdmFyIEMgPSB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nID8gdGhpcyA6IEFycmF5O1xuICAgIHZhciBhTGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB2YXIgbWFwZm4gPSBhTGVuID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcbiAgICB2YXIgbWFwcGluZyA9IG1hcGZuICE9PSB1bmRlZmluZWQ7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgaXRlckZuID0gZ2V0SXRlckZuKE8pO1xuICAgIHZhciBsZW5ndGgsIHJlc3VsdCwgc3RlcCwgaXRlcmF0b3I7XG4gICAgaWYgKG1hcHBpbmcpIG1hcGZuID0gY3R4KG1hcGZuLCBhTGVuID4gMiA/IGFyZ3VtZW50c1syXSA6IHVuZGVmaW5lZCwgMik7XG4gICAgLy8gaWYgb2JqZWN0IGlzbid0IGl0ZXJhYmxlIG9yIGl0J3MgYXJyYXkgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yIC0gdXNlIHNpbXBsZSBjYXNlXG4gICAgaWYgKGl0ZXJGbiAhPSB1bmRlZmluZWQgJiYgIShDID09IEFycmF5ICYmIGlzQXJyYXlJdGVyKGl0ZXJGbikpKSB7XG4gICAgICBmb3IgKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoTyksIHJlc3VsdCA9IG5ldyBDKCk7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgaW5kZXgrKykge1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCBtYXBwaW5nID8gY2FsbChpdGVyYXRvciwgbWFwZm4sIFtzdGVwLnZhbHVlLCBpbmRleF0sIHRydWUpIDogc3RlcC52YWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICAgIGZvciAocmVzdWx0ID0gbmV3IEMobGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IG1hcGZuKE9baW5kZXhdLCBpbmRleCkgOiBPW2luZGV4XSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5sZW5ndGggPSBpbmRleDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJyk7XG52YXIgc3RlcCA9IHJlcXVpcmUoJy4vX2l0ZXItc3RlcCcpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcblxuLy8gMjIuMS4zLjQgQXJyYXkucHJvdG90eXBlLmVudHJpZXMoKVxuLy8gMjIuMS4zLjEzIEFycmF5LnByb3RvdHlwZS5rZXlzKClcbi8vIDIyLjEuMy4yOSBBcnJheS5wcm90b3R5cGUudmFsdWVzKClcbi8vIDIyLjEuMy4zMCBBcnJheS5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbiAoaXRlcmF0ZWQsIGtpbmQpIHtcbiAgdGhpcy5fdCA9IHRvSU9iamVjdChpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICB0aGlzLl9rID0ga2luZDsgICAgICAgICAgICAgICAgLy8ga2luZFxuLy8gMjIuMS41LjIuMSAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbiAoKSB7XG4gIHZhciBPID0gdGhpcy5fdDtcbiAgdmFyIGtpbmQgPSB0aGlzLl9rO1xuICB2YXIgaW5kZXggPSB0aGlzLl9pKys7XG4gIGlmICghTyB8fCBpbmRleCA+PSBPLmxlbmd0aCkge1xuICAgIHRoaXMuX3QgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYgKGtpbmQgPT0gJ2tleXMnKSByZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmIChraW5kID09ICd2YWx1ZXMnKSByZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlICg5LjQuNC42LCA5LjQuNC43KVxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7XG4iLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYsICdPYmplY3QnLCB7IGFzc2lnbjogcmVxdWlyZSgnLi9fb2JqZWN0LWFzc2lnbicpIH0pO1xuIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbi8vIDE5LjEuMi40IC8gMTUuMi4zLjYgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpLCAnT2JqZWN0JywgeyBkZWZpbmVQcm9wZXJ0eTogcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZiB9KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZID0gcmVxdWlyZSgnLi9fbGlicmFyeScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuL19jbGFzc29mJyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xudmFyIGFuSW5zdGFuY2UgPSByZXF1aXJlKCcuL19hbi1pbnN0YW5jZScpO1xudmFyIGZvck9mID0gcmVxdWlyZSgnLi9fZm9yLW9mJyk7XG52YXIgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi9fc3BlY2llcy1jb25zdHJ1Y3RvcicpO1xudmFyIHRhc2sgPSByZXF1aXJlKCcuL190YXNrJykuc2V0O1xudmFyIG1pY3JvdGFzayA9IHJlcXVpcmUoJy4vX21pY3JvdGFzaycpKCk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUgPSByZXF1aXJlKCcuL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5Jyk7XG52YXIgcGVyZm9ybSA9IHJlcXVpcmUoJy4vX3BlcmZvcm0nKTtcbnZhciB1c2VyQWdlbnQgPSByZXF1aXJlKCcuL191c2VyLWFnZW50Jyk7XG52YXIgcHJvbWlzZVJlc29sdmUgPSByZXF1aXJlKCcuL19wcm9taXNlLXJlc29sdmUnKTtcbnZhciBQUk9NSVNFID0gJ1Byb21pc2UnO1xudmFyIFR5cGVFcnJvciA9IGdsb2JhbC5UeXBlRXJyb3I7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIHZlcnNpb25zID0gcHJvY2VzcyAmJiBwcm9jZXNzLnZlcnNpb25zO1xudmFyIHY4ID0gdmVyc2lvbnMgJiYgdmVyc2lvbnMudjggfHwgJyc7XG52YXIgJFByb21pc2UgPSBnbG9iYWxbUFJPTUlTRV07XG52YXIgaXNOb2RlID0gY2xhc3NvZihwcm9jZXNzKSA9PSAncHJvY2Vzcyc7XG52YXIgZW1wdHkgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG52YXIgSW50ZXJuYWwsIG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eSwgT3duUHJvbWlzZUNhcGFiaWxpdHksIFdyYXBwZXI7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZS5mO1xuXG52YXIgVVNFX05BVElWRSA9ICEhZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIC8vIGNvcnJlY3Qgc3ViY2xhc3Npbmcgd2l0aCBAQHNwZWNpZXMgc3VwcG9ydFxuICAgIHZhciBwcm9taXNlID0gJFByb21pc2UucmVzb2x2ZSgxKTtcbiAgICB2YXIgRmFrZVByb21pc2UgPSAocHJvbWlzZS5jb25zdHJ1Y3RvciA9IHt9KVtyZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpXSA9IGZ1bmN0aW9uIChleGVjKSB7XG4gICAgICBleGVjKGVtcHR5LCBlbXB0eSk7XG4gICAgfTtcbiAgICAvLyB1bmhhbmRsZWQgcmVqZWN0aW9ucyB0cmFja2luZyBzdXBwb3J0LCBOb2RlSlMgUHJvbWlzZSB3aXRob3V0IGl0IGZhaWxzIEBAc3BlY2llcyB0ZXN0XG4gICAgcmV0dXJuIChpc05vZGUgfHwgdHlwZW9mIFByb21pc2VSZWplY3Rpb25FdmVudCA9PSAnZnVuY3Rpb24nKVxuICAgICAgJiYgcHJvbWlzZS50aGVuKGVtcHR5KSBpbnN0YW5jZW9mIEZha2VQcm9taXNlXG4gICAgICAvLyB2OCA2LjYgKE5vZGUgMTAgYW5kIENocm9tZSA2NikgaGF2ZSBhIGJ1ZyB3aXRoIHJlc29sdmluZyBjdXN0b20gdGhlbmFibGVzXG4gICAgICAvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD04MzA1NjVcbiAgICAgIC8vIHdlIGNhbid0IGRldGVjdCBpdCBzeW5jaHJvbm91c2x5LCBzbyBqdXN0IGNoZWNrIHZlcnNpb25zXG4gICAgICAmJiB2OC5pbmRleE9mKCc2LjYnKSAhPT0gMFxuICAgICAgJiYgdXNlckFnZW50LmluZGV4T2YoJ0Nocm9tZS82NicpID09PSAtMTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG59KCk7XG5cbi8vIGhlbHBlcnNcbnZhciBpc1RoZW5hYmxlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciB0aGVuO1xuICByZXR1cm4gaXNPYmplY3QoaXQpICYmIHR5cGVvZiAodGhlbiA9IGl0LnRoZW4pID09ICdmdW5jdGlvbicgPyB0aGVuIDogZmFsc2U7XG59O1xudmFyIG5vdGlmeSA9IGZ1bmN0aW9uIChwcm9taXNlLCBpc1JlamVjdCkge1xuICBpZiAocHJvbWlzZS5fbikgcmV0dXJuO1xuICBwcm9taXNlLl9uID0gdHJ1ZTtcbiAgdmFyIGNoYWluID0gcHJvbWlzZS5fYztcbiAgbWljcm90YXNrKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdmFsdWUgPSBwcm9taXNlLl92O1xuICAgIHZhciBvayA9IHByb21pc2UuX3MgPT0gMTtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIHJ1biA9IGZ1bmN0aW9uIChyZWFjdGlvbikge1xuICAgICAgdmFyIGhhbmRsZXIgPSBvayA/IHJlYWN0aW9uLm9rIDogcmVhY3Rpb24uZmFpbDtcbiAgICAgIHZhciByZXNvbHZlID0gcmVhY3Rpb24ucmVzb2x2ZTtcbiAgICAgIHZhciByZWplY3QgPSByZWFjdGlvbi5yZWplY3Q7XG4gICAgICB2YXIgZG9tYWluID0gcmVhY3Rpb24uZG9tYWluO1xuICAgICAgdmFyIHJlc3VsdCwgdGhlbiwgZXhpdGVkO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKGhhbmRsZXIpIHtcbiAgICAgICAgICBpZiAoIW9rKSB7XG4gICAgICAgICAgICBpZiAocHJvbWlzZS5faCA9PSAyKSBvbkhhbmRsZVVuaGFuZGxlZChwcm9taXNlKTtcbiAgICAgICAgICAgIHByb21pc2UuX2ggPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaGFuZGxlciA9PT0gdHJ1ZSkgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoZG9tYWluKSBkb21haW4uZW50ZXIoKTtcbiAgICAgICAgICAgIHJlc3VsdCA9IGhhbmRsZXIodmFsdWUpOyAvLyBtYXkgdGhyb3dcbiAgICAgICAgICAgIGlmIChkb21haW4pIHtcbiAgICAgICAgICAgICAgZG9tYWluLmV4aXQoKTtcbiAgICAgICAgICAgICAgZXhpdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gcmVhY3Rpb24ucHJvbWlzZSkge1xuICAgICAgICAgICAgcmVqZWN0KFR5cGVFcnJvcignUHJvbWlzZS1jaGFpbiBjeWNsZScpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoZW4gPSBpc1RoZW5hYmxlKHJlc3VsdCkpIHtcbiAgICAgICAgICAgIHRoZW4uY2FsbChyZXN1bHQsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSBlbHNlIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHJlamVjdCh2YWx1ZSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChkb21haW4gJiYgIWV4aXRlZCkgZG9tYWluLmV4aXQoKTtcbiAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgfVxuICAgIH07XG4gICAgd2hpbGUgKGNoYWluLmxlbmd0aCA+IGkpIHJ1bihjaGFpbltpKytdKTsgLy8gdmFyaWFibGUgbGVuZ3RoIC0gY2FuJ3QgdXNlIGZvckVhY2hcbiAgICBwcm9taXNlLl9jID0gW107XG4gICAgcHJvbWlzZS5fbiA9IGZhbHNlO1xuICAgIGlmIChpc1JlamVjdCAmJiAhcHJvbWlzZS5faCkgb25VbmhhbmRsZWQocHJvbWlzZSk7XG4gIH0pO1xufTtcbnZhciBvblVuaGFuZGxlZCA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdmFsdWUgPSBwcm9taXNlLl92O1xuICAgIHZhciB1bmhhbmRsZWQgPSBpc1VuaGFuZGxlZChwcm9taXNlKTtcbiAgICB2YXIgcmVzdWx0LCBoYW5kbGVyLCBjb25zb2xlO1xuICAgIGlmICh1bmhhbmRsZWQpIHtcbiAgICAgIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoaXNOb2RlKSB7XG4gICAgICAgICAgcHJvY2Vzcy5lbWl0KCd1bmhhbmRsZWRSZWplY3Rpb24nLCB2YWx1ZSwgcHJvbWlzZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaGFuZGxlciA9IGdsb2JhbC5vbnVuaGFuZGxlZHJlamVjdGlvbikge1xuICAgICAgICAgIGhhbmRsZXIoeyBwcm9taXNlOiBwcm9taXNlLCByZWFzb246IHZhbHVlIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKChjb25zb2xlID0gZ2xvYmFsLmNvbnNvbGUpICYmIGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdVbmhhbmRsZWQgcHJvbWlzZSByZWplY3Rpb24nLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gQnJvd3NlcnMgc2hvdWxkIG5vdCB0cmlnZ2VyIGByZWplY3Rpb25IYW5kbGVkYCBldmVudCBpZiBpdCB3YXMgaGFuZGxlZCBoZXJlLCBOb2RlSlMgLSBzaG91bGRcbiAgICAgIHByb21pc2UuX2ggPSBpc05vZGUgfHwgaXNVbmhhbmRsZWQocHJvbWlzZSkgPyAyIDogMTtcbiAgICB9IHByb21pc2UuX2EgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHVuaGFuZGxlZCAmJiByZXN1bHQuZSkgdGhyb3cgcmVzdWx0LnY7XG4gIH0pO1xufTtcbnZhciBpc1VuaGFuZGxlZCA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gIHJldHVybiBwcm9taXNlLl9oICE9PSAxICYmIChwcm9taXNlLl9hIHx8IHByb21pc2UuX2MpLmxlbmd0aCA9PT0gMDtcbn07XG52YXIgb25IYW5kbGVVbmhhbmRsZWQgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xuICB0YXNrLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGhhbmRsZXI7XG4gICAgaWYgKGlzTm9kZSkge1xuICAgICAgcHJvY2Vzcy5lbWl0KCdyZWplY3Rpb25IYW5kbGVkJywgcHJvbWlzZSk7XG4gICAgfSBlbHNlIGlmIChoYW5kbGVyID0gZ2xvYmFsLm9ucmVqZWN0aW9uaGFuZGxlZCkge1xuICAgICAgaGFuZGxlcih7IHByb21pc2U6IHByb21pc2UsIHJlYXNvbjogcHJvbWlzZS5fdiB9KTtcbiAgICB9XG4gIH0pO1xufTtcbnZhciAkcmVqZWN0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHZhciBwcm9taXNlID0gdGhpcztcbiAgaWYgKHByb21pc2UuX2QpIHJldHVybjtcbiAgcHJvbWlzZS5fZCA9IHRydWU7XG4gIHByb21pc2UgPSBwcm9taXNlLl93IHx8IHByb21pc2U7IC8vIHVud3JhcFxuICBwcm9taXNlLl92ID0gdmFsdWU7XG4gIHByb21pc2UuX3MgPSAyO1xuICBpZiAoIXByb21pc2UuX2EpIHByb21pc2UuX2EgPSBwcm9taXNlLl9jLnNsaWNlKCk7XG4gIG5vdGlmeShwcm9taXNlLCB0cnVlKTtcbn07XG52YXIgJHJlc29sdmUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgdmFyIHByb21pc2UgPSB0aGlzO1xuICB2YXIgdGhlbjtcbiAgaWYgKHByb21pc2UuX2QpIHJldHVybjtcbiAgcHJvbWlzZS5fZCA9IHRydWU7XG4gIHByb21pc2UgPSBwcm9taXNlLl93IHx8IHByb21pc2U7IC8vIHVud3JhcFxuICB0cnkge1xuICAgIGlmIChwcm9taXNlID09PSB2YWx1ZSkgdGhyb3cgVHlwZUVycm9yKFwiUHJvbWlzZSBjYW4ndCBiZSByZXNvbHZlZCBpdHNlbGZcIik7XG4gICAgaWYgKHRoZW4gPSBpc1RoZW5hYmxlKHZhbHVlKSkge1xuICAgICAgbWljcm90YXNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHdyYXBwZXIgPSB7IF93OiBwcm9taXNlLCBfZDogZmFsc2UgfTsgLy8gd3JhcFxuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoZW4uY2FsbCh2YWx1ZSwgY3R4KCRyZXNvbHZlLCB3cmFwcGVyLCAxKSwgY3R4KCRyZWplY3QsIHdyYXBwZXIsIDEpKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICRyZWplY3QuY2FsbCh3cmFwcGVyLCBlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb21pc2UuX3YgPSB2YWx1ZTtcbiAgICAgIHByb21pc2UuX3MgPSAxO1xuICAgICAgbm90aWZ5KHByb21pc2UsIGZhbHNlKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAkcmVqZWN0LmNhbGwoeyBfdzogcHJvbWlzZSwgX2Q6IGZhbHNlIH0sIGUpOyAvLyB3cmFwXG4gIH1cbn07XG5cbi8vIGNvbnN0cnVjdG9yIHBvbHlmaWxsXG5pZiAoIVVTRV9OQVRJVkUpIHtcbiAgLy8gMjUuNC4zLjEgUHJvbWlzZShleGVjdXRvcilcbiAgJFByb21pc2UgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKSB7XG4gICAgYW5JbnN0YW5jZSh0aGlzLCAkUHJvbWlzZSwgUFJPTUlTRSwgJ19oJyk7XG4gICAgYUZ1bmN0aW9uKGV4ZWN1dG9yKTtcbiAgICBJbnRlcm5hbC5jYWxsKHRoaXMpO1xuICAgIHRyeSB7XG4gICAgICBleGVjdXRvcihjdHgoJHJlc29sdmUsIHRoaXMsIDEpLCBjdHgoJHJlamVjdCwgdGhpcywgMSkpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgJHJlamVjdC5jYWxsKHRoaXMsIGVycik7XG4gICAgfVxuICB9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgSW50ZXJuYWwgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKSB7XG4gICAgdGhpcy5fYyA9IFtdOyAgICAgICAgICAgICAvLyA8LSBhd2FpdGluZyByZWFjdGlvbnNcbiAgICB0aGlzLl9hID0gdW5kZWZpbmVkOyAgICAgIC8vIDwtIGNoZWNrZWQgaW4gaXNVbmhhbmRsZWQgcmVhY3Rpb25zXG4gICAgdGhpcy5fcyA9IDA7ICAgICAgICAgICAgICAvLyA8LSBzdGF0ZVxuICAgIHRoaXMuX2QgPSBmYWxzZTsgICAgICAgICAgLy8gPC0gZG9uZVxuICAgIHRoaXMuX3YgPSB1bmRlZmluZWQ7ICAgICAgLy8gPC0gdmFsdWVcbiAgICB0aGlzLl9oID0gMDsgICAgICAgICAgICAgIC8vIDwtIHJlamVjdGlvbiBzdGF0ZSwgMCAtIGRlZmF1bHQsIDEgLSBoYW5kbGVkLCAyIC0gdW5oYW5kbGVkXG4gICAgdGhpcy5fbiA9IGZhbHNlOyAgICAgICAgICAvLyA8LSBub3RpZnlcbiAgfTtcbiAgSW50ZXJuYWwucHJvdG90eXBlID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUtYWxsJykoJFByb21pc2UucHJvdG90eXBlLCB7XG4gICAgLy8gMjUuNC41LjMgUHJvbWlzZS5wcm90b3R5cGUudGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZClcbiAgICB0aGVuOiBmdW5jdGlvbiB0aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gICAgICB2YXIgcmVhY3Rpb24gPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShzcGVjaWVzQ29uc3RydWN0b3IodGhpcywgJFByb21pc2UpKTtcbiAgICAgIHJlYWN0aW9uLm9rID0gdHlwZW9mIG9uRnVsZmlsbGVkID09ICdmdW5jdGlvbicgPyBvbkZ1bGZpbGxlZCA6IHRydWU7XG4gICAgICByZWFjdGlvbi5mYWlsID0gdHlwZW9mIG9uUmVqZWN0ZWQgPT0gJ2Z1bmN0aW9uJyAmJiBvblJlamVjdGVkO1xuICAgICAgcmVhY3Rpb24uZG9tYWluID0gaXNOb2RlID8gcHJvY2Vzcy5kb21haW4gOiB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9jLnB1c2gocmVhY3Rpb24pO1xuICAgICAgaWYgKHRoaXMuX2EpIHRoaXMuX2EucHVzaChyZWFjdGlvbik7XG4gICAgICBpZiAodGhpcy5fcykgbm90aWZ5KHRoaXMsIGZhbHNlKTtcbiAgICAgIHJldHVybiByZWFjdGlvbi5wcm9taXNlO1xuICAgIH0sXG4gICAgLy8gMjUuNC41LjEgUHJvbWlzZS5wcm90b3R5cGUuY2F0Y2gob25SZWplY3RlZClcbiAgICAnY2F0Y2gnOiBmdW5jdGlvbiAob25SZWplY3RlZCkge1xuICAgICAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIG9uUmVqZWN0ZWQpO1xuICAgIH1cbiAgfSk7XG4gIE93blByb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwcm9taXNlID0gbmV3IEludGVybmFsKCk7XG4gICAgdGhpcy5wcm9taXNlID0gcHJvbWlzZTtcbiAgICB0aGlzLnJlc29sdmUgPSBjdHgoJHJlc29sdmUsIHByb21pc2UsIDEpO1xuICAgIHRoaXMucmVqZWN0ID0gY3R4KCRyZWplY3QsIHByb21pc2UsIDEpO1xuICB9O1xuICBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZS5mID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbiAoQykge1xuICAgIHJldHVybiBDID09PSAkUHJvbWlzZSB8fCBDID09PSBXcmFwcGVyXG4gICAgICA/IG5ldyBPd25Qcm9taXNlQ2FwYWJpbGl0eShDKVxuICAgICAgOiBuZXdHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHkoQyk7XG4gIH07XG59XG5cbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIHsgUHJvbWlzZTogJFByb21pc2UgfSk7XG5yZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpKCRQcm9taXNlLCBQUk9NSVNFKTtcbnJlcXVpcmUoJy4vX3NldC1zcGVjaWVzJykoUFJPTUlTRSk7XG5XcmFwcGVyID0gcmVxdWlyZSgnLi9fY29yZScpW1BST01JU0VdO1xuXG4vLyBzdGF0aWNzXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC41IFByb21pc2UucmVqZWN0KHIpXG4gIHJlamVjdDogZnVuY3Rpb24gcmVqZWN0KHIpIHtcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHRoaXMpO1xuICAgIHZhciAkJHJlamVjdCA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgICQkcmVqZWN0KHIpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoTElCUkFSWSB8fCAhVVNFX05BVElWRSksIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjYgUHJvbWlzZS5yZXNvbHZlKHgpXG4gIHJlc29sdmU6IGZ1bmN0aW9uIHJlc29sdmUoeCkge1xuICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZShMSUJSQVJZICYmIHRoaXMgPT09IFdyYXBwZXIgPyAkUHJvbWlzZSA6IHRoaXMsIHgpO1xuICB9XG59KTtcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIShVU0VfTkFUSVZFICYmIHJlcXVpcmUoJy4vX2l0ZXItZGV0ZWN0JykoZnVuY3Rpb24gKGl0ZXIpIHtcbiAgJFByb21pc2UuYWxsKGl0ZXIpWydjYXRjaCddKGVtcHR5KTtcbn0pKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuMSBQcm9taXNlLmFsbChpdGVyYWJsZSlcbiAgYWxsOiBmdW5jdGlvbiBhbGwoaXRlcmFibGUpIHtcbiAgICB2YXIgQyA9IHRoaXM7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgICB2YXIgcmVzb2x2ZSA9IGNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgICB2YXIgcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgIHZhciByZW1haW5pbmcgPSAxO1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICB2YXIgJGluZGV4ID0gaW5kZXgrKztcbiAgICAgICAgdmFyIGFscmVhZHlDYWxsZWQgPSBmYWxzZTtcbiAgICAgICAgdmFsdWVzLnB1c2godW5kZWZpbmVkKTtcbiAgICAgICAgcmVtYWluaW5nKys7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIGlmIChhbHJlYWR5Q2FsbGVkKSByZXR1cm47XG4gICAgICAgICAgYWxyZWFkeUNhbGxlZCA9IHRydWU7XG4gICAgICAgICAgdmFsdWVzWyRpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgICAtLXJlbWFpbmluZyB8fCByZXNvbHZlKHZhbHVlcyk7XG4gICAgICAgIH0sIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICB9KTtcbiAgICBpZiAocmVzdWx0LmUpIHJlamVjdChyZXN1bHQudik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfSxcbiAgLy8gMjUuNC40LjQgUHJvbWlzZS5yYWNlKGl0ZXJhYmxlKVxuICByYWNlOiBmdW5jdGlvbiByYWNlKGl0ZXJhYmxlKSB7XG4gICAgdmFyIEMgPSB0aGlzO1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoQyk7XG4gICAgdmFyIHJlamVjdCA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oY2FwYWJpbGl0eS5yZXNvbHZlLCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYgKHJlc3VsdC5lKSByZWplY3QocmVzdWx0LnYpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRhdCA9IHJlcXVpcmUoJy4vX3N0cmluZy1hdCcpKHRydWUpO1xuXG4vLyAyMS4xLjMuMjcgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uIChpdGVyYXRlZCkge1xuICB0aGlzLl90ID0gU3RyaW5nKGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4vLyAyMS4xLjUuMi4xICVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbiAoKSB7XG4gIHZhciBPID0gdGhpcy5fdDtcbiAgdmFyIGluZGV4ID0gdGhpcy5faTtcbiAgdmFyIHBvaW50O1xuICBpZiAoaW5kZXggPj0gTy5sZW5ndGgpIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgcG9pbnQgPSAkYXQoTywgaW5kZXgpO1xuICB0aGlzLl9pICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHsgdmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZSB9O1xufSk7XG4iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1wcm9taXNlLWZpbmFsbHlcbid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL19zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG52YXIgcHJvbWlzZVJlc29sdmUgPSByZXF1aXJlKCcuL19wcm9taXNlLXJlc29sdmUnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LlIsICdQcm9taXNlJywgeyAnZmluYWxseSc6IGZ1bmN0aW9uIChvbkZpbmFsbHkpIHtcbiAgdmFyIEMgPSBzcGVjaWVzQ29uc3RydWN0b3IodGhpcywgY29yZS5Qcm9taXNlIHx8IGdsb2JhbC5Qcm9taXNlKTtcbiAgdmFyIGlzRnVuY3Rpb24gPSB0eXBlb2Ygb25GaW5hbGx5ID09ICdmdW5jdGlvbic7XG4gIHJldHVybiB0aGlzLnRoZW4oXG4gICAgaXNGdW5jdGlvbiA/IGZ1bmN0aW9uICh4KSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmUoQywgb25GaW5hbGx5KCkpLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4geDsgfSk7XG4gICAgfSA6IG9uRmluYWxseSxcbiAgICBpc0Z1bmN0aW9uID8gZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZShDLCBvbkZpbmFsbHkoKSkudGhlbihmdW5jdGlvbiAoKSB7IHRocm93IGU7IH0pO1xuICAgIH0gOiBvbkZpbmFsbHlcbiAgKTtcbn0gfSk7XG4iLCIndXNlIHN0cmljdCc7XG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1wcm9taXNlLXRyeVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IHJlcXVpcmUoJy4vX25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcbnZhciBwZXJmb3JtID0gcmVxdWlyZSgnLi9fcGVyZm9ybScpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1Byb21pc2UnLCB7ICd0cnknOiBmdW5jdGlvbiAoY2FsbGJhY2tmbikge1xuICB2YXIgcHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eS5mKHRoaXMpO1xuICB2YXIgcmVzdWx0ID0gcGVyZm9ybShjYWxsYmFja2ZuKTtcbiAgKHJlc3VsdC5lID8gcHJvbWlzZUNhcGFiaWxpdHkucmVqZWN0IDogcHJvbWlzZUNhcGFiaWxpdHkucmVzb2x2ZSkocmVzdWx0LnYpO1xuICByZXR1cm4gcHJvbWlzZUNhcGFiaWxpdHkucHJvbWlzZTtcbn0gfSk7XG4iLCJyZXF1aXJlKCcuL2VzNi5hcnJheS5pdGVyYXRvcicpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgVE9fU1RSSU5HX1RBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuXG52YXIgRE9NSXRlcmFibGVzID0gKCdDU1NSdWxlTGlzdCxDU1NTdHlsZURlY2xhcmF0aW9uLENTU1ZhbHVlTGlzdCxDbGllbnRSZWN0TGlzdCxET01SZWN0TGlzdCxET01TdHJpbmdMaXN0LCcgK1xuICAnRE9NVG9rZW5MaXN0LERhdGFUcmFuc2Zlckl0ZW1MaXN0LEZpbGVMaXN0LEhUTUxBbGxDb2xsZWN0aW9uLEhUTUxDb2xsZWN0aW9uLEhUTUxGb3JtRWxlbWVudCxIVE1MU2VsZWN0RWxlbWVudCwnICtcbiAgJ01lZGlhTGlzdCxNaW1lVHlwZUFycmF5LE5hbWVkTm9kZU1hcCxOb2RlTGlzdCxQYWludFJlcXVlc3RMaXN0LFBsdWdpbixQbHVnaW5BcnJheSxTVkdMZW5ndGhMaXN0LFNWR051bWJlckxpc3QsJyArXG4gICdTVkdQYXRoU2VnTGlzdCxTVkdQb2ludExpc3QsU1ZHU3RyaW5nTGlzdCxTVkdUcmFuc2Zvcm1MaXN0LFNvdXJjZUJ1ZmZlckxpc3QsU3R5bGVTaGVldExpc3QsVGV4dFRyYWNrQ3VlTGlzdCwnICtcbiAgJ1RleHRUcmFja0xpc3QsVG91Y2hMaXN0Jykuc3BsaXQoJywnKTtcblxuZm9yICh2YXIgaSA9IDA7IGkgPCBET01JdGVyYWJsZXMubGVuZ3RoOyBpKyspIHtcbiAgdmFyIE5BTUUgPSBET01JdGVyYWJsZXNbaV07XG4gIHZhciBDb2xsZWN0aW9uID0gZ2xvYmFsW05BTUVdO1xuICB2YXIgcHJvdG8gPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlO1xuICBpZiAocHJvdG8gJiYgIXByb3RvW1RPX1NUUklOR19UQUddKSBoaWRlKHByb3RvLCBUT19TVFJJTkdfVEFHLCBOQU1FKTtcbiAgSXRlcmF0b3JzW05BTUVdID0gSXRlcmF0b3JzLkFycmF5O1xufVxuIiwiaW1wb3J0IGNyb24gZnJvbSAnL1VzZXJzL21vY2hpbmkvV29ya3NwYWNlL21haGFwbGF0Zm9ybS5jb20vYXBwcy9tYWhhL3NyYy9jb3JlL2VudGl0aWVzL2Nyb24uanMnXG5pbXBvcnQgY2hhdEFwcCBmcm9tICcvVXNlcnMvbW9jaGluaS9Xb3Jrc3BhY2UvbWFoYXBsYXRmb3JtLmNvbS9hcHBzL21haGEtY2hhdC9zcmMvYXBwLmpzJ1xuaW1wb3J0IGNvbXBldGVuY2llc0FwcCBmcm9tICcvVXNlcnMvbW9jaGluaS9Xb3Jrc3BhY2UvbWFoYXBsYXRmb3JtLmNvbS9hcHBzL21haGEtY29tcGV0ZW5jaWVzL3NyYy9hcHAuanMnXG5pbXBvcnQgY3JtQXBwIGZyb20gJy9Vc2Vycy9tb2NoaW5pL1dvcmtzcGFjZS9tYWhhcGxhdGZvcm0uY29tL2FwcHMvbWFoYS1jcm0vc3JjL2FwcC5qcydcbmltcG9ydCBkcml2ZUFwcCBmcm9tICcvVXNlcnMvbW9jaGluaS9Xb3Jrc3BhY2UvbWFoYXBsYXRmb3JtLmNvbS9hcHBzL21haGEtZHJpdmUvc3JjL2FwcC5qcydcbmltcG9ydCBlYXRmcmVzaEFwcCBmcm9tICcvVXNlcnMvbW9jaGluaS9Xb3Jrc3BhY2UvbWFoYXBsYXRmb3JtLmNvbS9hcHBzL21haGEtZWF0ZnJlc2gvc3JjL2FwcC5qcydcbmltcG9ydCBleHBlbnNlc0FwcCBmcm9tICcvVXNlcnMvbW9jaGluaS9Xb3Jrc3BhY2UvbWFoYXBsYXRmb3JtLmNvbS9hcHBzL21haGEtZXhwZW5zZXMvc3JjL2FwcC5qcydcbmltcG9ydCBwbGF0Zm9ybUFwcCBmcm9tICcvVXNlcnMvbW9jaGluaS9Xb3Jrc3BhY2UvbWFoYXBsYXRmb3JtLmNvbS9hcHBzL21haGEtcGxhdGZvcm0vc3JjL2FwcC5qcydcbmltcG9ydCB0ZWFtQXBwIGZyb20gJy9Vc2Vycy9tb2NoaW5pL1dvcmtzcGFjZS9tYWhhcGxhdGZvcm0uY29tL2FwcHMvbWFoYS10ZWFtL3NyYy9hcHAuanMnXG5pbXBvcnQgbWFoYUFwcCBmcm9tICcvVXNlcnMvbW9jaGluaS9Xb3Jrc3BhY2UvbWFoYXBsYXRmb3JtLmNvbS9hcHBzL21haGEvc3JjL2FwcC5qcydcbmltcG9ydCBtYWhhbm90aWZpY2F0aW9uQ3JvbiBmcm9tICcvVXNlcnMvbW9jaGluaS9Xb3Jrc3BhY2UvbWFoYXBsYXRmb3JtLmNvbS9hcHBzL21haGEvc3JjL2Nyb24vbm90aWZpY2F0aW9uX2Nyb24uanMnXG5pbXBvcnQgZXZlbnRzIGZyb20gJ2V2ZW50cydcblxuZXZlbnRzLkV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzID0gMFxuXG5jcm9uKClcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF3cy1zZGtcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmNyeXB0LW5vZGVqc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJibHVlYmlyZFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib29rc2hlbGZcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2hhbGtcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2hlY2tpdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJlanNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXZlbnRzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImdsb2JcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHRtbC1lbWFpbC10by10ZXh0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImlubGluZS1jc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwia25leFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJsYXRlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJsb2Rhc2hcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9tZW50XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGVtYWlsZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwbHVyYWxpemVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVnZW5lcmF0b3ItcnVudGltZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzb2NrZXQuaW8tZW1pdHRlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1dGlsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndyYXAtYW5zaVwiKTsiXSwic291cmNlUm9vdCI6IiJ9