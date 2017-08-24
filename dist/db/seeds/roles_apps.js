'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maha = require('maha');

var rolesRightsFixtures = new _maha.Fixtures({
  tableName: 'maha_roles_apps',
  records: [{
    role_id: 1,
    app_id: 1
  }, {
    role_id: 1,
    app_id: 2
  }, {
    role_id: 1,
    app_id: 3
  }, {
    role_id: 2,
    app_id: 2
  }, {
    role_id: 4,
    app_id: 2
  }, {
    role_id: 4,
    app_id: 3
  }, {
    role_id: 5,
    app_id: 2
  }, {
    role_id: 5,
    app_id: 3
  }, {
    role_id: 6,
    app_id: 1
  }, {
    role_id: 6,
    app_id: 2
  }, {
    role_id: 6,
    app_id: 3
  }]
});

exports.default = rolesRightsFixtures;