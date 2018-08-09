'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setup = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = require('bluebird');

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _maha = require('maha');

var _sync = require('csv-parse/lib/sync');

var _sync2 = _interopRequireDefault(_sync);

var _mimeTypes = require('mime-types');

var _mimeTypes2 = _interopRequireDefault(_mimeTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var setup = exports.setup = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _maha.knex.transaction(function () {
              var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(trx) {
                var cceniagra, team_id, platformAdministrator, users, attractions, offerings, categories;
                return _regenerator2.default.wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        _context8.prev = 0;
                        _context8.next = 3;
                        return _maha.Team.forge({
                          title: 'CCE Niagra',
                          subdomain: 'cceniagra',
                          color: 'red'
                        }).save(null, { transacting: trx });

                      case 3:
                        cceniagra = _context8.sent;
                        team_id = cceniagra.get('id');
                        _context8.next = 7;
                        return (0, _maha.knex)('maha_strategies').transacting(trx).insert({
                          team_id: team_id,
                          name: 'local',
                          created_at: (0, _moment2.default)(),
                          updated_at: (0, _moment2.default)()
                        });

                      case 7:
                        _context8.next = 9;
                        return (0, _maha.knex)('maha_installations').transacting(trx).insert([{
                          team_id: team_id,
                          app_id: 1,
                          settings: {},
                          created_at: (0, _moment2.default)(),
                          updated_at: (0, _moment2.default)()
                        }, {
                          team_id: team_id,
                          app_id: 4,
                          settings: {},
                          created_at: (0, _moment2.default)(),
                          updated_at: (0, _moment2.default)()
                        }]);

                      case 9:
                        _context8.next = 11;
                        return (0, _maha.knex)('maha_roles').transacting(trx).insert({
                          team_id: team_id,
                          title: 'Platform Administrators',
                          description: 'Users who have adminstrative access to the entire platform',
                          created_at: (0, _moment2.default)(),
                          updated_at: (0, _moment2.default)()
                        }).returning('id');

                      case 11:
                        platformAdministrator = _context8.sent;
                        _context8.next = 14;
                        return (0, _maha.knex)('maha_roles_apps').transacting(trx).insert([{
                          role_id: platformAdministrator[0],
                          app_id: 1
                        }, {
                          role_id: platformAdministrator[0],
                          app_id: 4
                        }]);

                      case 14:
                        _context8.next = 16;
                        return (0, _maha.knex)('maha_roles_rights').transacting(trx).insert([{
                          role_id: platformAdministrator[0],
                          right_id: 1
                        }, {
                          role_id: platformAdministrator[0],
                          right_id: 2
                        }, {
                          role_id: platformAdministrator[0],
                          right_id: 3
                        }]);

                      case 16:
                        users = toMatrix('cceniagra/users.tsv', '\t', true);
                        _context8.next = 19;
                        return (0, _bluebird.mapSeries)(users, function () {
                          var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(line) {
                            var url, userAssetData, userAsset, user;
                            return _regenerator2.default.wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    url = line[4];
                                    _context.next = 3;
                                    return downloadAsset(url);

                                  case 3:
                                    userAssetData = _context.sent;
                                    _context.next = 6;
                                    return (0, _maha.createAsset)({
                                      team_id: team_id,
                                      file_name: url.split('/').pop(),
                                      content_type: 'image/jpeg',
                                      file_data: userAssetData
                                    }, trx);

                                  case 6:
                                    userAsset = _context.sent;
                                    _context.next = 9;
                                    return _maha.User.forge({
                                      team_id: team_id,
                                      first_name: line[0],
                                      last_name: line[1],
                                      email: line[2],
                                      password: 'cceniagra',
                                      photo_id: userAsset.get('id'),
                                      is_active: line[3] === '1',
                                      activated_at: line[3] === '1' ? (0, _moment2.default)() : null,
                                      values: {}
                                    }).save(null, { transacting: trx });

                                  case 9:
                                    user = _context.sent;
                                    _context.next = 12;
                                    return (0, _maha.knex)('maha_users_roles').transacting(trx).insert({
                                      user_id: user.get('id'),
                                      role_id: platformAdministrator[0]
                                    });

                                  case 12:
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

                      case 19:
                        attractions = toMatrix('cceniagra/attractions.tsv', '\t', true);
                        _context8.next = 22;
                        return (0, _bluebird.mapSeries)(attractions, function () {
                          var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(line) {
                            var county_id, matches, banner, bannerAsset, bannerData, photo_id, attraction, attraction_id;
                            return _regenerator2.default.wrap(function _callee5$(_context5) {
                              while (1) {
                                switch (_context5.prev = _context5.next) {
                                  case 0:

                                    console.log('Attraction: ' + line[0]);

                                    _context5.next = 3;
                                    return findOrCreateCountyId(team_id, _lodash2.default.upperFirst(line[6]).trim(), trx);

                                  case 3:
                                    county_id = _context5.sent;
                                    matches = line[31].match(/^([^?]*).*$/);
                                    banner = matches ? matches[1] : null;
                                    bannerAsset = null;

                                    if (!line[31]) {
                                      _context5.next = 15;
                                      break;
                                    }

                                    _context5.next = 10;
                                    return downloadAsset(line[31]);

                                  case 10:
                                    bannerData = _context5.sent;


                                    console.log('uploading ' + banner);

                                    _context5.next = 14;
                                    return (0, _maha.createAsset)({
                                      team_id: team_id,
                                      file_name: banner.split('/').pop(),
                                      content_type: 'image/jpeg',
                                      file_data: bannerData
                                    }, trx);

                                  case 14:
                                    bannerAsset = _context5.sent;

                                  case 15:
                                    photo_id = bannerAsset ? bannerAsset.get('id') : null;
                                    _context5.next = 18;
                                    return (0, _maha.knex)('eatfresh_attractions').transacting(trx).insert({
                                      team_id: team_id,
                                      title: line[0],
                                      slug: toSlug(line[0]),
                                      photo_id: photo_id,
                                      address_1: line[1],
                                      address_2: line[2],
                                      city: line[3],
                                      state: line[4],
                                      zip: line[5],
                                      county_id: county_id,
                                      phone: line[7],
                                      hours_of_operation: line[8],
                                      website: line[9],
                                      facebook: line[10],
                                      is_free_range: line[11].toLowerCase() === 'yes',
                                      is_vegetarian: line[12].toLowerCase() === 'yes',
                                      is_organic: line[13].toLowerCase() === 'yes',
                                      is_accessible: line[14].toLowerCase() === 'yes',
                                      is_family_friendly: line[15].toLowerCase() === 'yes',
                                      is_senior: line[16].toLowerCase() === 'yes',
                                      is_military: line[17].toLowerCase() === 'yes',
                                      is_family_owned: line[18].toLowerCase() === 'yes',
                                      is_approved: true,
                                      created_at: (0, _moment2.default)(),
                                      updated_at: (0, _moment2.default)()
                                    }).returning('id');

                                  case 18:
                                    attraction = _context5.sent;
                                    attraction_id = attraction[0];
                                    _context5.next = 22;
                                    return (0, _bluebird.mapSeries)([19, 20, 21, 22, 23, 24], function () {
                                      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(index) {
                                        var category_id;
                                        return _regenerator2.default.wrap(function _callee2$(_context2) {
                                          while (1) {
                                            switch (_context2.prev = _context2.next) {
                                              case 0:
                                                _context2.next = 2;
                                                return findOrCreateRelatedId('eatfresh_categories', team_id, _lodash2.default.upperFirst(line[index]).trim(), trx);

                                              case 2:
                                                category_id = _context2.sent;

                                                if (category_id) {
                                                  _context2.next = 5;
                                                  break;
                                                }

                                                return _context2.abrupt('return');

                                              case 5:
                                                _context2.next = 7;
                                                return (0, _maha.knex)('eatfresh_categories_attractions').transacting(trx).insert({
                                                  attraction_id: attraction_id,
                                                  category_id: category_id
                                                });

                                              case 7:
                                              case 'end':
                                                return _context2.stop();
                                            }
                                          }
                                        }, _callee2, undefined);
                                      }));

                                      return function (_x4) {
                                        return _ref5.apply(this, arguments);
                                      };
                                    }());

                                  case 22:
                                    _context5.next = 24;
                                    return (0, _bluebird.mapSeries)([25, 26, 27, 28, 29, 30], function () {
                                      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(index) {
                                        var offering_id;
                                        return _regenerator2.default.wrap(function _callee3$(_context3) {
                                          while (1) {
                                            switch (_context3.prev = _context3.next) {
                                              case 0:
                                                _context3.next = 2;
                                                return findOrCreateRelatedId('eatfresh_offerings', team_id, _lodash2.default.upperFirst(line[index]).trim(), trx);

                                              case 2:
                                                offering_id = _context3.sent;

                                                if (offering_id) {
                                                  _context3.next = 5;
                                                  break;
                                                }

                                                return _context3.abrupt('return');

                                              case 5:
                                                _context3.next = 7;
                                                return (0, _maha.knex)('eatfresh_offerings_attractions').transacting(trx).insert({
                                                  attraction_id: attraction_id,
                                                  offering_id: offering_id
                                                });

                                              case 7:
                                              case 'end':
                                                return _context3.stop();
                                            }
                                          }
                                        }, _callee3, undefined);
                                      }));

                                      return function (_x5) {
                                        return _ref6.apply(this, arguments);
                                      };
                                    }());

                                  case 24:
                                    _context5.next = 26;
                                    return (0, _bluebird.mapSeries)([32, 33, 34, 35, 36, 37], function () {
                                      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(index) {
                                        var photoData, photoAsset, asset_id;
                                        return _regenerator2.default.wrap(function _callee4$(_context4) {
                                          while (1) {
                                            switch (_context4.prev = _context4.next) {
                                              case 0:
                                                if (!line[index]) {
                                                  _context4.next = 11;
                                                  break;
                                                }

                                                _context4.next = 3;
                                                return downloadAsset(line[index]);

                                              case 3:
                                                photoData = _context4.sent;


                                                console.log('Uploading photo ' + (index + 1));

                                                _context4.next = 7;
                                                return (0, _maha.createAsset)({
                                                  team_id: team_id,
                                                  file_name: line[index].split('/').pop(),
                                                  content_type: 'image/jpeg',
                                                  file_data: photoData
                                                }, trx);

                                              case 7:
                                                photoAsset = _context4.sent;
                                                asset_id = photoAsset.get('id');
                                                _context4.next = 11;
                                                return (0, _maha.knex)('eatfresh_photos').transacting(trx).insert({
                                                  team_id: team_id,
                                                  attraction_id: attraction_id,
                                                  asset_id: asset_id,
                                                  created_at: (0, _moment2.default)(),
                                                  updated_at: (0, _moment2.default)()
                                                });

                                              case 11:
                                              case 'end':
                                                return _context4.stop();
                                            }
                                          }
                                        }, _callee4, undefined);
                                      }));

                                      return function (_x6) {
                                        return _ref7.apply(this, arguments);
                                      };
                                    }());

                                  case 26:
                                  case 'end':
                                    return _context5.stop();
                                }
                              }
                            }, _callee5, undefined);
                          }));

                          return function (_x3) {
                            return _ref4.apply(this, arguments);
                          };
                        }());

                      case 22:
                        offerings = toMatrix('cceniagra/offerings.tsv', '\t', true);
                        _context8.next = 25;
                        return (0, _bluebird.mapSeries)(offerings, function () {
                          var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(line) {
                            var _line$1$match, _line$1$match2, url, offeringAsset, offeringAssetData, offering_asset_id, offering_id;

                            return _regenerator2.default.wrap(function _callee6$(_context6) {
                              while (1) {
                                switch (_context6.prev = _context6.next) {
                                  case 0:

                                    console.log('Offering: ' + line[0]);

                                    _line$1$match = line[1].match(/^([^?]*).*$/), _line$1$match2 = (0, _slicedToArray3.default)(_line$1$match, 2), url = _line$1$match2[1];
                                    offeringAsset = null;

                                    if (!line[1]) {
                                      _context6.next = 11;
                                      break;
                                    }

                                    _context6.next = 6;
                                    return downloadAsset(line[1]);

                                  case 6:
                                    offeringAssetData = _context6.sent;


                                    console.log('uploading ' + url);

                                    _context6.next = 10;
                                    return (0, _maha.createAsset)({
                                      team_id: team_id,
                                      file_name: url.split('/').pop(),
                                      content_type: 'image/jpeg',
                                      file_data: offeringAssetData
                                    }, trx);

                                  case 10:
                                    offeringAsset = _context6.sent;

                                  case 11:
                                    offering_asset_id = offeringAsset ? offeringAsset.get('id') : null;
                                    _context6.next = 14;
                                    return findOrCreateRelatedId('eatfresh_offerings', team_id, _lodash2.default.upperFirst(line[0]).trim(), trx);

                                  case 14:
                                    offering_id = _context6.sent;


                                    console.log(offering_id + ":" + offering_asset_id);

                                    if (!(!offering_id || !offering_asset_id)) {
                                      _context6.next = 18;
                                      break;
                                    }

                                    return _context6.abrupt('return');

                                  case 18:
                                    _context6.next = 20;
                                    return (0, _maha.knex)('eatfresh_offerings').transacting(trx).where({ id: offering_id }).update({
                                      photo_id: offering_asset_id
                                    });

                                  case 20:
                                  case 'end':
                                    return _context6.stop();
                                }
                              }
                            }, _callee6, undefined);
                          }));

                          return function (_x7) {
                            return _ref8.apply(this, arguments);
                          };
                        }());

                      case 25:
                        categories = toMatrix('cceniagra/categories.tsv', '\t', true);
                        _context8.next = 28;
                        return (0, _bluebird.mapSeries)(categories, function () {
                          var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(line) {
                            var _line$1$match3, _line$1$match4, url, categoryAsset, categoryAssetData, category_id;

                            return _regenerator2.default.wrap(function _callee7$(_context7) {
                              while (1) {
                                switch (_context7.prev = _context7.next) {
                                  case 0:

                                    console.log('Category: ' + line[0]);

                                    _line$1$match3 = line[1].match(/^([^?]*).*$/), _line$1$match4 = (0, _slicedToArray3.default)(_line$1$match3, 2), url = _line$1$match4[1];
                                    categoryAsset = null;

                                    if (!line[1]) {
                                      _context7.next = 11;
                                      break;
                                    }

                                    _context7.next = 6;
                                    return downloadAsset(line[1]);

                                  case 6:
                                    categoryAssetData = _context7.sent;


                                    console.log('uploading ' + url);

                                    _context7.next = 10;
                                    return (0, _maha.createAsset)({
                                      team_id: team_id,
                                      file_name: url.split('/').pop(),
                                      content_type: 'image/jpeg',
                                      file_data: categoryAssetData
                                    }, trx);

                                  case 10:
                                    categoryAsset = _context7.sent;

                                  case 11:
                                    _context7.next = 13;
                                    return findOrCreateRelatedId('eatfresh_categories', team_id, _lodash2.default.upperFirst(line[0]).trim(), trx);

                                  case 13:
                                    category_id = _context7.sent;

                                    if (!(!category_id || !categoryAsset)) {
                                      _context7.next = 16;
                                      break;
                                    }

                                    return _context7.abrupt('return');

                                  case 16:
                                    _context7.next = 18;
                                    return (0, _maha.knex)('eatfresh_categories').transacting(trx).where({ id: category_id }).update({
                                      photo_id: categoryAsset.get('id')
                                    });

                                  case 18:
                                  case 'end':
                                    return _context7.stop();
                                }
                              }
                            }, _callee7, undefined);
                          }));

                          return function (_x8) {
                            return _ref9.apply(this, arguments);
                          };
                        }());

                      case 28:
                        _context8.next = 33;
                        break;

                      case 30:
                        _context8.prev = 30;
                        _context8.t0 = _context8['catch'](0);


                        console.log(_context8.t0);

                      case 33:
                      case 'end':
                        return _context8.stop();
                    }
                  }
                }, _callee8, undefined, [[0, 30]]);
              }));

              return function (_x) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 2:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  }));

  return function setup() {
    return _ref.apply(this, arguments);
  };
}();

var findOrCreateCountyId = function () {
  var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(team_id, name, trx) {
    var county, newcounty;
    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            if (!_lodash2.default.isEmpty(name)) {
              _context10.next = 2;
              break;
            }

            return _context10.abrupt('return', null);

          case 2:
            _context10.next = 4;
            return (0, _maha.knex)('eatfresh_counties').transacting(trx).where({ name: name });

          case 4:
            county = _context10.sent;

            if (!county[0]) {
              _context10.next = 7;
              break;
            }

            return _context10.abrupt('return', county[0].id);

          case 7:
            _context10.next = 9;
            return (0, _maha.knex)('eatfresh_counties').transacting(trx).insert({
              team_id: team_id,
              name: name,
              created_at: (0, _moment2.default)(),
              updated_at: (0, _moment2.default)()
            }).returning('id');

          case 9:
            newcounty = _context10.sent;


            newcounty[0].id;

          case 11:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  }));

  return function findOrCreateCountyId(_x9, _x10, _x11) {
    return _ref10.apply(this, arguments);
  };
}();

var findOrCreateRelatedId = function () {
  var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(table, team_id, title, trx) {
    var item, newitem;
    return _regenerator2.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            if (!_lodash2.default.isEmpty(title)) {
              _context11.next = 2;
              break;
            }

            return _context11.abrupt('return', null);

          case 2:
            _context11.next = 4;
            return (0, _maha.knex)(table).transacting(trx).where({ title: title });

          case 4:
            item = _context11.sent;

            if (!item[0]) {
              _context11.next = 7;
              break;
            }

            return _context11.abrupt('return', item[0].id);

          case 7:
            _context11.next = 9;
            return (0, _maha.knex)(table).transacting(trx).insert({
              team_id: team_id,
              title: title,
              created_at: (0, _moment2.default)(),
              updated_at: (0, _moment2.default)()
            }).returning('id');

          case 9:
            newitem = _context11.sent;
            return _context11.abrupt('return', newitem[0]);

          case 11:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  }));

  return function findOrCreateRelatedId(_x12, _x13, _x14, _x15) {
    return _ref11.apply(this, arguments);
  };
}();

var toSlug = function toSlug(title) {
  return title.replace(/[^0-9a-zA-Z-\s\_\.]/img, '').replace(/[\W\_]/img, '-').replace(/-{2,}/g, '-').toLowerCase();
};

var toMatrix = function toMatrix(filename, delimiter) {
  var excludeHeaders = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var parsed = (0, _sync2.default)(_fs2.default.readFileSync(_path2.default.resolve('files', filename), 'utf8'), { delimiter: delimiter, quote: '^' });
  return excludeHeaders ? parsed.slice(1) : parsed;
};

var downloadAsset = function () {
  var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(uri) {
    var fileName, filePath, fileData;
    return _regenerator2.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            fileName = uri.split('/').pop();
            filePath = _path2.default.join('tmp', 'eatfreshny', fileName);

            if (!_fs2.default.existsSync(filePath)) {
              _context12.next = 4;
              break;
            }

            return _context12.abrupt('return', _fs2.default.readFileSync(filePath));

          case 4:

            console.log('downloading ' + uri);

            _context12.prev = 5;
            _context12.next = 8;
            return (0, _requestPromise2.default)({
              method: 'GET',
              uri: uri,
              encoding: null
            });

          case 8:
            fileData = _context12.sent;


            _fs2.default.writeFileSync(filePath, fileData);

            return _context12.abrupt('return', fileData);

          case 13:
            _context12.prev = 13;
            _context12.t0 = _context12['catch'](5);

            console.log(_context12.t0);
            return _context12.abrupt('return', null);

          case 17:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined, [[5, 13]]);
  }));

  return function downloadAsset(_x17) {
    return _ref12.apply(this, arguments);
  };
}();
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(setup, 'setup', 'src/tasks/cceniagra/cceniagra.js');
  reactHotLoader.register(findOrCreateCountyId, 'findOrCreateCountyId', 'src/tasks/cceniagra/cceniagra.js');
  reactHotLoader.register(findOrCreateRelatedId, 'findOrCreateRelatedId', 'src/tasks/cceniagra/cceniagra.js');
  reactHotLoader.register(toSlug, 'toSlug', 'src/tasks/cceniagra/cceniagra.js');
  reactHotLoader.register(toMatrix, 'toMatrix', 'src/tasks/cceniagra/cceniagra.js');
  reactHotLoader.register(downloadAsset, 'downloadAsset', 'src/tasks/cceniagra/cceniagra.js');
  leaveModule(module);
})();

;