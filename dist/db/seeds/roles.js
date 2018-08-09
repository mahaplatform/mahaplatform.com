'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maha = require('maha');

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var rolesFixtures = new _maha.Fixtures({
  tableName: 'maha_roles',
  records: [{
    id: 1,
    team_id: 1,
    title: 'Platform Administrator',
    description: 'Users who have adminstrative access to the entire platform'
  }, {
    id: 2,
    team_id: 1,
    title: 'Human Resources',
    description: 'Users who manage have adminstrative access to human resources'
  }, {
    id: 3,
    team_id: 1,
    title: 'Finance',
    description: 'Users where have adminstrative access to financial information'
  }, {
    id: 4,
    team_id: 1,
    title: 'Benefits Eligible Employee',
    description: 'Users who have access to benefits eligible staff tools'
  }, {
    id: 5,
    team_id: 1,
    title: 'Temp Employee',
    description: 'Users who have access to temporary employee staff tools'
  }]
});

var _default = rolesFixtures;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(rolesFixtures, 'rolesFixtures', 'src/db/seeds/roles.js');
  reactHotLoader.register(_default, 'default', 'src/db/seeds/roles.js');
  leaveModule(module);
})();

;