'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maha = require('maha');

var rolesRightsFixtures = new _maha.Fixtures({
  tableName: 'maha_roles_rights',
  records: [{
    role_id: 1,
    right_id: 1
  }, {
    role_id: 1,
    right_id: 2
  }, {
    role_id: 1,
    right_id: 3
  }, {
    role_id: 1,
    right_id: 4
  }, {
    role_id: 1,
    right_id: 5
  }, {
    role_id: 1,
    right_id: 6
  }, {
    role_id: 1,
    right_id: 7
  }, {
    role_id: 1,
    right_id: 7
  }, {
    role_id: 1,
    right_id: 8
  }, {
    role_id: 1,
    right_id: 9
  }, {
    role_id: 3,
    right_id: 4
  }, {
    role_id: 3,
    right_id: 7
  }, {
    role_id: 4,
    right_id: 5
  }, {
    role_id: 4,
    right_id: 9
  }, {
    role_id: 5,
    right_id: 5
  }, {
    role_id: 5,
    right_id: 9
  }, {
    role_id: 6,
    right_id: 2
  }, {
    role_id: 6,
    right_id: 3
  }, {
    role_id: 6,
    right_id: 4
  }, {
    role_id: 6,
    right_id: 5
  }, {
    role_id: 6,
    right_id: 6
  }, {
    role_id: 6,
    right_id: 7
  }, {
    role_id: 6,
    right_id: 7
  }, {
    role_id: 6,
    right_id: 8
  }, {
    role_id: 6,
    right_id: 9
  }]
});

exports.default = rolesRightsFixtures;