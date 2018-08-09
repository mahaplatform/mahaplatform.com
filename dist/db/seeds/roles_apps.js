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
    role_id: 3,
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

var _default = rolesRightsFixtures;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(rolesRightsFixtures, 'rolesRightsFixtures', 'src/db/seeds/roles_apps.js');
  reactHotLoader.register(_default, 'default', 'src/db/seeds/roles_apps.js');
  leaveModule(module);
})();

;