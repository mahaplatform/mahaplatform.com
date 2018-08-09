'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.import_20170622 = exports.import_20171107 = exports.import_20171109 = exports.import_20171115 = exports.add_asset_previews = exports.fix_assets = exports._getNormalizedFileName = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _bluebird = require('bluebird');

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sync = require('csv-parse/lib/sync');

var _sync2 = _interopRequireDefault(_sync);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _mimeTypes = require('mime-types');

var _mimeTypes2 = _interopRequireDefault(_mimeTypes);

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _maha = require('maha');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _getNormalizedFileName = exports._getNormalizedFileName = function _getNormalizedFileName(filename) {

  var matches = filename.toLowerCase().match(/^(.*)\.(.*)$/);

  var basename = matches ? matches[1] : filename.toLowerCase();

  var extension = matches ? matches[2] : null;

  var rewritten = basename.replace(/[^0-9a-zA-Z-\s\_\.]/img, '').replace(/[\W\_]/img, '-').replace(/-{2,}/g, '-');

  return rewritten + (extension ? '.' + extension : '');
};

var fix_assets = exports.fix_assets = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _maha.knex.transaction(function () {
              var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(trx) {
                var assets, s3, objects, keys, files;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return _maha.Asset.query(function (qb) {
                          return qb.orderBy('id', 'asc');
                        }).fetchAll({ transacting: trx });

                      case 2:
                        assets = _context3.sent;
                        _context3.next = 5;
                        return (0, _bluebird.map)(assets.toArray(), function () {
                          var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(asset) {
                            var file_name;
                            return _regenerator2.default.wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    file_name = _getNormalizedFileName(asset.get('original_file_name'));
                                    _context.next = 3;
                                    return asset.save({ file_name: file_name }, { patch: true, transacting: trx });

                                  case 3:
                                  case 'end':
                                    return _context.stop();
                                }
                              }
                            }, _callee, undefined);
                          }));

                          return function (_x2) {
                            return _ref3.apply(this, arguments);
                          };
                        }());

                      case 5:
                        s3 = new _awsSdk2.default.S3();
                        _context3.next = 8;
                        return s3.listObjects({
                          Bucket: 'cdn.mahaplatform.com',
                          Prefix: 'assets'
                        }).promise();

                      case 8:
                        objects = _context3.sent;
                        keys = objects.Contents.map(function (object) {
                          return object.Key;
                        });
                        files = objects.Contents.reduce(function (map, object) {
                          var matches = object.Key.match(/^assets\/(\d*)\/(.*)$/);
                          if (!matches || matches[2] === 'preview.jpg') return map;
                          return (0, _extends4.default)({}, map, (0, _defineProperty3.default)({}, matches[1], object.Key));
                        }, {});
                        _context3.next = 13;
                        return (0, _bluebird.mapSeries)(assets.toArray(), function () {
                          var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(asset) {
                            var currentKey, rewrittenKey;
                            return _regenerator2.default.wrap(function _callee2$(_context2) {
                              while (1) {
                                switch (_context2.prev = _context2.next) {
                                  case 0:
                                    currentKey = files[asset.get('id')];
                                    rewrittenKey = 'assets/' + asset.get('id') + '/' + asset.get('file_name');

                                    if (!(currentKey !== rewrittenKey)) {
                                      _context2.next = 6;
                                      break;
                                    }

                                    console.log(currentKey + ' => ' + rewrittenKey);

                                    _context2.next = 6;
                                    return s3.copyObject({
                                      Bucket: 'cdn.mahaplatform.com',
                                      CopySource: '/cdn.mahaplatform.com/' + currentKey,
                                      Key: rewrittenKey
                                    }).promise();

                                  case 6:
                                  case 'end':
                                    return _context2.stop();
                                }
                              }
                            }, _callee2, undefined);
                          }));

                          return function (_x3) {
                            return _ref4.apply(this, arguments);
                          };
                        }());

                      case 13:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, undefined);
              }));

              return function (_x) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 2:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function fix_assets() {
    return _ref.apply(this, arguments);
  };
}();

var add_asset_previews = exports.add_asset_previews = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _maha.knex.transaction(function () {
              var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(trx) {
                var assets;
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.next = 2;
                        return _maha.Asset.query(function (qb) {
                          return qb.orderBy('id', 'asc');
                        }).fetchAll({ transacting: trx });

                      case 2:
                        assets = _context6.sent;
                        _context6.next = 5;
                        return (0, _bluebird.mapSeries)(assets.toArray(), function () {
                          var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(asset) {
                            var status_id;
                            return _regenerator2.default.wrap(function _callee5$(_context5) {
                              while (1) {
                                switch (_context5.prev = _context5.next) {
                                  case 0:

                                    console.log('processing asset ' + asset.get('id'));

                                    status_id = asset.get('is_image') ? 3 : 2;
                                    _context5.next = 4;
                                    return asset.save({ status_id: status_id }, { transacting: trx });

                                  case 4:
                                    if (asset.get('is_image')) {
                                      _context5.next = 7;
                                      break;
                                    }

                                    _context5.next = 7;
                                    return (0, _maha.processAsset)(asset.get('id'), trx);

                                  case 7:
                                  case 'end':
                                    return _context5.stop();
                                }
                              }
                            }, _callee5, undefined);
                          }));

                          return function (_x5) {
                            return _ref7.apply(this, arguments);
                          };
                        }());

                      case 5:
                      case 'end':
                        return _context6.stop();
                    }
                  }
                }, _callee6, undefined);
              }));

              return function (_x4) {
                return _ref6.apply(this, arguments);
              };
            }());

          case 2:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function add_asset_previews() {
    return _ref5.apply(this, arguments);
  };
}();

var import_members = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(members, project_id, member_type_id) {
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return (0, _bluebird.mapSeries)(members, function () {
              var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(netid) {
                var user, user_id, data;
                return _regenerator2.default.wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        _context8.next = 2;
                        return (0, _maha.knex)('maha_users').where({ email: netid.trim() + '@cornell.edu' });

                      case 2:
                        user = _context8.sent;
                        user_id = user[0].id;
                        data = { team_id: 1, member_type_id: member_type_id, project_id: project_id, user_id: user_id, is_active: true };
                        _context8.next = 7;
                        return (0, _maha.knex)('expenses_members').insert(data);

                      case 7:
                      case 'end':
                        return _context8.stop();
                    }
                  }
                }, _callee8, undefined);
              }));

              return function (_x9) {
                return _ref9.apply(this, arguments);
              };
            }());

          case 2:
            return _context9.abrupt('return', _context9.sent);

          case 3:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  }));

  return function import_members(_x6, _x7, _x8) {
    return _ref8.apply(this, arguments);
  };
}();

var import_20171115 = exports.import_20171115 = function () {
  var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12() {
    var met38, ljp9;
    return _regenerator2.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            met38 = toMatrix('20171115/met38-projects.tsv', '\t', true);
            _context12.next = 3;
            return (0, _bluebird.mapSeries)(met38, function () {
              var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(line) {
                var project_id;
                return _regenerator2.default.wrap(function _callee10$(_context10) {
                  while (1) {
                    switch (_context10.prev = _context10.next) {
                      case 0:
                        project_id = parseInt(line[0]);
                        _context10.next = 3;
                        return (0, _maha.knex)('expenses_members').where({ project_id: project_id }).delete();

                      case 3:
                        if (_lodash2.default.isEmpty(line[3].trim())) {
                          _context10.next = 6;
                          break;
                        }

                        _context10.next = 6;
                        return import_members(line[3].split(','), project_id, 1);

                      case 6:
                        if (_lodash2.default.isEmpty(line[4].trim())) {
                          _context10.next = 9;
                          break;
                        }

                        _context10.next = 9;
                        return import_members(line[4].split(','), project_id, 2);

                      case 9:
                        if (_lodash2.default.isEmpty(line[5].trim())) {
                          _context10.next = 12;
                          break;
                        }

                        _context10.next = 12;
                        return import_members(line[5].split(','), project_id, 3);

                      case 12:
                      case 'end':
                        return _context10.stop();
                    }
                  }
                }, _callee10, undefined);
              }));

              return function (_x10) {
                return _ref11.apply(this, arguments);
              };
            }());

          case 3:
            ljp9 = toMatrix('20171115/ljp9-projects.tsv', '\t', true);
            _context12.next = 6;
            return (0, _bluebird.mapSeries)(ljp9, function () {
              var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(line) {
                var project_id;
                return _regenerator2.default.wrap(function _callee11$(_context11) {
                  while (1) {
                    switch (_context11.prev = _context11.next) {
                      case 0:
                        project_id = parseInt(line[0]);
                        _context11.next = 3;
                        return (0, _maha.knex)('expenses_members').where({ project_id: project_id }).delete();

                      case 3:
                        if (_lodash2.default.isEmpty(line[3].trim())) {
                          _context11.next = 6;
                          break;
                        }

                        _context11.next = 6;
                        return import_members(line[3].split(','), project_id, 1);

                      case 6:
                        if (_lodash2.default.isEmpty(line[4].trim())) {
                          _context11.next = 9;
                          break;
                        }

                        _context11.next = 9;
                        return import_members(line[4].split(','), project_id, 2);

                      case 9:
                        if (_lodash2.default.isEmpty(line[5].trim())) {
                          _context11.next = 12;
                          break;
                        }

                        _context11.next = 12;
                        return import_members(line[5].split(','), project_id, 3);

                      case 12:
                      case 'end':
                        return _context11.stop();
                    }
                  }
                }, _callee11, undefined);
              }));

              return function (_x11) {
                return _ref12.apply(this, arguments);
              };
            }());

          case 6:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined);
  }));

  return function import_20171115() {
    return _ref10.apply(this, arguments);
  };
}();

var import_20171109 = exports.import_20171109 = function () {
  var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14() {
    var lines;
    return _regenerator2.default.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            lines = toMatrix('20171109/mr55-projects.tsv', '\t', true);
            _context14.next = 3;
            return (0, _bluebird.map)(lines, function () {
              var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(line) {
                var project_id;
                return _regenerator2.default.wrap(function _callee13$(_context13) {
                  while (1) {
                    switch (_context13.prev = _context13.next) {
                      case 0:
                        project_id = parseInt(line[0]);

                        if (!(line[5] !== '')) {
                          _context13.next = 7;
                          break;
                        }

                        _context13.next = 4;
                        return (0, _maha.knex)('expenses_members').where({ project_id: project_id }).delete();

                      case 4:
                        _context13.next = 6;
                        return (0, _maha.knex)('expenses_projects').where({ id: project_id }).delete();

                      case 6:
                        return _context13.abrupt('return');

                      case 7:
                        if (_lodash2.default.isEmpty(line[3].trim())) {
                          _context13.next = 10;
                          break;
                        }

                        _context13.next = 10;
                        return import_members(line[3].split(','), project_id, 2);

                      case 10:
                        if (_lodash2.default.isEmpty(line[4].trim())) {
                          _context13.next = 13;
                          break;
                        }

                        _context13.next = 13;
                        return import_members(line[4].split(','), project_id, 3);

                      case 13:
                      case 'end':
                        return _context13.stop();
                    }
                  }
                }, _callee13, undefined);
              }));

              return function (_x12) {
                return _ref14.apply(this, arguments);
              };
            }());

          case 3:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, undefined);
  }));

  return function import_20171109() {
    return _ref13.apply(this, arguments);
  };
}();

var import_20171107 = exports.import_20171107 = function () {
  var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16() {
    var employees;
    return _regenerator2.default.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            employees = toMatrix('20170622/employees.tsv', '\t', true);
            _context16.next = 3;
            return (0, _maha.knex)('maha_users_roles').delete();

          case 3:
            _context16.next = 5;
            return (0, _bluebird.map)(employees, function () {
              var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15(row) {
                var record;
                return _regenerator2.default.wrap(function _callee15$(_context15) {
                  while (1) {
                    switch (_context15.prev = _context15.next) {
                      case 0:
                        _context15.next = 2;
                        return (0, _maha.knex)('maha_users').where({ email: row[2] + '@cornell.edu' }).returning('id');

                      case 2:
                        record = _context15.sent;

                        if (!(row[6] === '1')) {
                          _context15.next = 6;
                          break;
                        }

                        _context15.next = 6;
                        return (0, _maha.knex)('maha_users_roles').insert({ user_id: record[0].id, role_id: 1 });

                      case 6:
                        if (!(row[7] === '1')) {
                          _context15.next = 9;
                          break;
                        }

                        _context15.next = 9;
                        return (0, _maha.knex)('maha_users_roles').insert({ user_id: record[0].id, role_id: 2 });

                      case 9:
                        if (!(row[8] === '1')) {
                          _context15.next = 12;
                          break;
                        }

                        _context15.next = 12;
                        return (0, _maha.knex)('maha_users_roles').insert({ user_id: record[0].id, role_id: 3 });

                      case 12:
                        if (!(row[9] === '1')) {
                          _context15.next = 15;
                          break;
                        }

                        _context15.next = 15;
                        return (0, _maha.knex)('maha_users_roles').insert({ user_id: record[0].id, role_id: 5 });

                      case 15:
                        if (!(row[10] === '1')) {
                          _context15.next = 18;
                          break;
                        }

                        _context15.next = 18;
                        return (0, _maha.knex)('maha_users_roles').insert({ user_id: record[0].id, role_id: 4 });

                      case 18:
                      case 'end':
                        return _context15.stop();
                    }
                  }
                }, _callee15, undefined);
              }));

              return function (_x13) {
                return _ref16.apply(this, arguments);
              };
            }());

          case 5:
          case 'end':
            return _context16.stop();
        }
      }
    }, _callee16, undefined);
  }));

  return function import_20171107() {
    return _ref15.apply(this, arguments);
  };
}();

var import_20170622 = exports.import_20170622 = function () {
  var _ref17 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee18() {
    var employees, projects, expenses, competencies, expectations, supervisors, assets, userData, supervisorData, projectData, expenseData, competencyData, expectationsData, filepath, s3;
    return _regenerator2.default.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.prev = 0;
            employees = toMatrix('20170622/employees.tsv', '\t', true);
            projects = toMatrix('20170622/projects.tsv', '\t', true);
            expenses = toMatrix('20170622/expense_types.tsv', '\t', true);
            competencies = toMatrix('20170622/competencies.tsv', '\t', true);
            expectations = toMatrix('20170622/expectations.tsv', '\t');
            supervisors = {};
            assets = [{
              id: 1,
              team_id: 1,
              original_file_name: 'cornell.jpg',
              file_name: 'cornell.jpg',
              content_type: 'image/jpeg',
              file_size: 17449,
              chunks_total: 1,
              created_at: (0, _moment2.default)(),
              updated_at: (0, _moment2.default)()
            }];
            userData = employees.reduce(function (data, record) {

              var user = _lodash2.default.find(data.users, { email: record[2] + '@cornell.edu' });

              var user_id = null;

              if (!user) {

                user_id = data.users.length + 1;

                var filename = record[2] + '.jpg';

                var _filepath = _path2.default.resolve('files', '20170622', 'photos', filename);

                var photoExists = _fs2.default.existsSync(_filepath);

                var asset_id = photoExists ? data.assets.length + 1 : null;

                if (photoExists) {

                  data.assets.push({
                    id: asset_id,
                    team_id: 1,
                    original_file_name: filename,
                    file_name: filename,
                    content_type: _mimeTypes2.default.lookup(_filepath),
                    file_size: _fs2.default.statSync(_filepath).size,
                    chunks_total: 1,
                    created_at: (0, _moment2.default)(),
                    updated_at: (0, _moment2.default)()
                  });
                }

                data.users.push({
                  id: user_id,
                  team_id: 1,
                  first_name: record[0],
                  last_name: record[1],
                  email: record[2] + '@cornell.edu',
                  password_salt: '$2a$10$wlhVrmkAu7H7Wttks/9vte',
                  password_hash: '$2a$10$wlhVrmkAu7H7Wttks/9vte8KTY6afM7XHdKTXadrXlpvpVgfHyx6m',
                  is_active: record[2] === 'gmk8',
                  photo_id: asset_id,
                  notification_method: 'immediately',
                  activated_at: record[2] === 'gmk8' ? (0, _moment2.default)() : null,
                  values: {
                    employee_id: record[3],
                    vendor_id: record[4]
                  },
                  created_at: (0, _moment2.default)(),
                  updated_at: (0, _moment2.default)()
                });

                var roles = [6, 7, 8, 9, 10];

                roles.map(function (index) {
                  if (record[index] == 1) {
                    data.users_roles.push({
                      user_id: user_id,
                      role_id: index - 5
                    });
                  }
                });
              } else {

                user_id = user.id;
              }

              if (!supervisors[record[5]]) supervisors[record[5]] = [];

              supervisors[record[5]].push(user_id);

              if (record[11]) {

                var group = findOrCreate(data.groups, { team_id: 1, title: sanitize(record[11]) }, true);

                data.users_groups.push({
                  user_id: user_id,
                  group_id: group.id
                });
              }

              return data;
            }, { assets: assets, users: [], users_roles: [], groups: [], users_groups: [] });
            supervisorData = Object.keys(supervisors).reduce(function (data, name) {
              var _name$match = name.match(/(.*) (.*)/),
                  _name$match2 = (0, _slicedToArray3.default)(_name$match, 3),
                  first_name = _name$match2[1],
                  last_name = _name$match2[2];

              var supervisor = _lodash2.default.find(userData.users, { first_name: first_name, last_name: last_name });

              data.supervisors.push({
                team_id: 1,
                user_id: supervisor.id,
                created_at: (0, _moment2.default)(),
                updated_at: (0, _moment2.default)()
              });

              data.supervisions = [].concat((0, _toConsumableArray3.default)(data.supervisions), (0, _toConsumableArray3.default)(supervisors[name].map(function (employee_id) {
                return {
                  team_id: 1,
                  supervisor_id: supervisor.id,
                  employee_id: employee_id,
                  created_at: (0, _moment2.default)(),
                  updated_at: (0, _moment2.default)()
                };
              })));

              return data;
            }, { supervisors: [], supervisions: [] });
            projectData = projects.reduce(function (data, record) {

              var project_id = data.projects.length + 1;

              data.projects.push({
                id: project_id,
                team_id: 1,
                title: record[1].trim().replace(/'/g, ''),
                is_active: true,
                integration: {
                  project_code: record[0].trim(),
                  program_code: record[2].trim(),
                  source_code: record[3].trim(),
                  match: record[4].trim()
                },
                created_at: (0, _moment2.default)(),
                updated_at: (0, _moment2.default)()
              });

              var fieldIndexes = [5, 6, 7];

              fieldIndexes.map(function (index) {

                if (record[index].length === 0) return;

                record[index].split('/').map(function (netid) {

                  var member = _lodash2.default.find(userData.users, { email: netid + '@cornell.edu' });

                  if (member) {

                    var user_id = member.id;

                    data.members.push({
                      team_id: 1,
                      project_id: project_id,
                      user_id: user_id,
                      member_type_id: index - 4,
                      is_active: true,
                      created_at: (0, _moment2.default)(),
                      updated_at: (0, _moment2.default)()
                    });
                  }
                });
              });

              return data;
            }, { projects: [], members: [] });
            expenseData = expenses.reduce(function (data, record) {

              var expense_type_id = data.expense_types.length + 1;

              data.expense_types.push({
                id: expense_type_id,
                team_id: 1,
                title: sanitize(record[0]),
                description: sanitize(record[1]),
                integration: {
                  expense_code: sanitize(record[2]),
                  source_code: sanitize(record[3])
                },
                created_at: (0, _moment2.default)(),
                updated_at: (0, _moment2.default)()
              });

              return data;
            }, { expense_types: [] });
            competencyData = competencies.reduce(function (data, record) {

              if (record[4].length > 1) {

                var category = findOrCreate(data.categories, { team_id: 1, title: sanitize(record[0]) }, true);

                var competency = findOrCreate(data.competencies, { team_id: 1, category_id: category.id, title: sanitize(record[1]), level: parseInt(record[2]), description: sanitize(record[3]) }, true, { title: sanitize(record[1]) });

                var resource = findOrCreate(data.resources, { team_id: 1, title: sanitize(record[4]), description: sanitize(record[5]), url: record[6], review_count: 0, review_average: 0 }, true, { title: sanitize(record[4]) });

                data.competencies_resources.push({
                  competency_id: competency.id,
                  resource_id: resource.id
                });
              }

              return data;
            }, { categories: [], competencies: [], resources: [], competencies_resources: [] });
            expectationsData = expectations.reduce(function (data, record, index) {

              var competency_id = record[2].length > 0 ? findOrCreate(competencyData.competencies, { team_id: 1, title: sanitize(record[2]), level: parseInt(record[3]) }, true).id : null;

              var classification_id = record[0].length > 0 ? findOrCreate(data.classifications, { team_id: 1, title: sanitize(record[0]) }, true).id : null;

              data.expectations.push({
                team_id: 1,
                classification_id: classification_id,
                competency_id: competency_id
              });

              return data;
            }, { expectations: [], classifications: [] });
            filepath = _path2.default.resolve('files', '20170622', 'photos', 'holi.jpg');


            userData.assets.push({
              id: userData.assets.length + 1,
              team_id: 1,
              original_file_name: 'holi.jpg',
              file_name: 'holi.jpg',
              content_type: _mimeTypes2.default.lookup(filepath),
              file_size: _fs2.default.statSync(filepath).size,
              chunks_total: 1,
              created_at: (0, _moment2.default)(),
              updated_at: (0, _moment2.default)()
            });

            writeFile('assets', 'maha_assets', userData.assets);

            writeFile('users', 'maha_users', userData.users);

            writeFile('users_roles', 'maha_users_roles', userData.users_roles);

            writeFile('groups', 'maha_groups', userData.groups);

            writeFile('users_groups', 'maha_users_groups', userData.users_groups);

            writeFile('projects', 'expenses_projects', projectData.projects);

            writeFile('members', 'expenses_members', projectData.members);

            writeFile('expense_types', 'expenses_expense_types', expenseData.expense_types);

            writeFile('supervisors', 'competencies_supervisors', supervisorData.supervisors);

            writeFile('supervisions', 'competencies_supervisions', supervisorData.supervisions);

            writeFile('categories', 'competencies_categories', competencyData.categories);

            writeFile('competencies', 'competencies_competencies', competencyData.competencies);

            writeFile('resources', 'competencies_resources', competencyData.resources);

            writeFile('competencies_resources', 'competencies_competencies_resources', competencyData.competencies_resources);

            writeFile('classifications', 'competencies_classifications', expectationsData.classifications);

            writeFile('expectations', 'competencies_expectations', expectationsData.expectations);

            _awsSdk2.default.config.constructor({
              accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
              region: process.env.AWS_REGION || ''
            });

            if (!(process.env.ASSET_STORAGE === 's3')) {
              _context18.next = 39;
              break;
            }

            s3 = new _awsSdk2.default.S3();
            _context18.next = 37;
            return (0, _bluebird.map)(userData.assets, function () {
              var _ref18 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee17(asset) {
                var filename, contentType, filepath;
                return _regenerator2.default.wrap(function _callee17$(_context17) {
                  while (1) {
                    switch (_context17.prev = _context17.next) {
                      case 0:
                        filename = asset.file_name;
                        contentType = asset.content_type;
                        filepath = _path2.default.join('files', '20170622', 'photos', asset.file_name);
                        _context17.next = 5;
                        return s3.upload({
                          Bucket: process.env.AWS_BUCKET,
                          Key: 'assets/' + asset.id + '/' + asset.file_name,
                          ACL: 'public-read',
                          Body: _fs2.default.readFileSync(filepath),
                          ContentType: contentType
                        }).promise();

                      case 5:
                      case 'end':
                        return _context17.stop();
                    }
                  }
                }, _callee17, undefined);
              }));

              return function (_x14) {
                return _ref18.apply(this, arguments);
              };
            }());

          case 37:
            _context18.next = 40;
            break;

          case 39:
            if (process.env.ASSET_STORAGE === 'local') {

              userData.assets.map(function (asset) {

                var filepath = _path2.default.join('files', '20170622', 'photos', asset.file_name);

                if (!_fs2.default.existsSync(_path2.default.resolve('public', 'assets'))) _fs2.default.mkdirSync(_path2.default.resolve('public', 'assets'));

                if (!_fs2.default.existsSync(_path2.default.resolve('public', 'assets', asset.id.toString()))) _fs2.default.mkdirSync(_path2.default.resolve('public', 'assets', asset.id.toString()));

                _fs2.default.writeFileSync(_path2.default.resolve('public', 'assets', asset.id.toString(), asset.file_name), _fs2.default.readFileSync(filepath));
              });
            }

          case 40:
            _context18.next = 45;
            break;

          case 42:
            _context18.prev = 42;
            _context18.t0 = _context18['catch'](0);


            console.log(_context18.t0);

          case 45:
          case 'end':
            return _context18.stop();
        }
      }
    }, _callee18, undefined, [[0, 42]]);
  }));

  return function import_20170622() {
    return _ref17.apply(this, arguments);
  };
}();

var writeFile = function writeFile(name, tableName, records) {

  var object = _lodash2.default.upperFirst(_lodash2.default.camelCase(name));

  _fs2.default.writeFileSync(_path2.default.join(__dirname, '..', '..', '..', 'src', 'db', 'seeds', name + '.js'), 'import { Fixtures } from \'maha\'\n\nconst ' + _lodash2.default.camelCase(object) + 'Fixtures = new Fixtures(' + toJSON({ tableName: tableName, records: records }) + ')\n\nexport default ' + _lodash2.default.camelCase(object) + 'Fixtures\n\n');
};

var toJSON = function toJSON(object) {
  return JSON.stringify(object, null, '  ').replace(/\"(\w*)\"\:/g, '$1:').replace(/\"/g, '\'');
};

var toMatrix = function toMatrix(filename, delimiter) {
  var excludeHeaders = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var parsed = (0, _sync2.default)(_fs2.default.readFileSync(_path2.default.resolve('files', filename), 'utf8'), { delimiter: delimiter, quote: '^' });
  return excludeHeaders ? parsed.slice(1) : parsed;
};

var sanitize = function sanitize(string) {
  if (!string) return null;
  return string.replace(/\'/g, '').trim();
};

var findOrCreate = function findOrCreate(collection, data, withId) {
  var compare = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;


  var item = _lodash2.default.find(collection, compare || data);

  if (item) return item;

  var id = collection.length + 1;

  var base = withId ? { id: id, team_id: 1 } : { team_id: 1 };

  var newitem = _lodash2.default.assign(base, data, {
    created_at: (0, _moment2.default)(),
    updated_at: (0, _moment2.default)()
  });

  collection.push(newitem);

  return newitem;
};
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_getNormalizedFileName, '_getNormalizedFileName', 'src/tasks/ccetc/ccetc.js');
  reactHotLoader.register(fix_assets, 'fix_assets', 'src/tasks/ccetc/ccetc.js');
  reactHotLoader.register(add_asset_previews, 'add_asset_previews', 'src/tasks/ccetc/ccetc.js');
  reactHotLoader.register(import_members, 'import_members', 'src/tasks/ccetc/ccetc.js');
  reactHotLoader.register(import_20171115, 'import_20171115', 'src/tasks/ccetc/ccetc.js');
  reactHotLoader.register(import_20171109, 'import_20171109', 'src/tasks/ccetc/ccetc.js');
  reactHotLoader.register(import_20171107, 'import_20171107', 'src/tasks/ccetc/ccetc.js');
  reactHotLoader.register(import_20170622, 'import_20170622', 'src/tasks/ccetc/ccetc.js');
  reactHotLoader.register(writeFile, 'writeFile', 'src/tasks/ccetc/ccetc.js');
  reactHotLoader.register(toJSON, 'toJSON', 'src/tasks/ccetc/ccetc.js');
  reactHotLoader.register(toMatrix, 'toMatrix', 'src/tasks/ccetc/ccetc.js');
  reactHotLoader.register(sanitize, 'sanitize', 'src/tasks/ccetc/ccetc.js');
  reactHotLoader.register(findOrCreate, 'findOrCreate', 'src/tasks/ccetc/ccetc.js');
  leaveModule(module);
})();

;