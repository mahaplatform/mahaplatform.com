'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maha = require('maha');

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

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

var _default = rolesRightsFixtures;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(rolesRightsFixtures, 'rolesRightsFixtures', 'src/db/seeds/roles_rights.js');
  reactHotLoader.register(_default, 'default', 'src/db/seeds/roles_rights.js');
  leaveModule(module);
})();

;