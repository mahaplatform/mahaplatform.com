'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maha = require('maha');

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var supervisorsFixtures = new _maha.Fixtures({
  tableName: 'competencies_supervisors',
  records: [{
    team_id: 1,
    user_id: 2,
    created_at: '2017-11-04T21:56:15.913Z',
    updated_at: '2017-11-04T21:56:15.913Z'
  }, {
    team_id: 1,
    user_id: 132,
    created_at: '2017-11-04T21:56:15.913Z',
    updated_at: '2017-11-04T21:56:15.913Z'
  }, {
    team_id: 1,
    user_id: 16,
    created_at: '2017-11-04T21:56:15.913Z',
    updated_at: '2017-11-04T21:56:15.913Z'
  }, {
    team_id: 1,
    user_id: 88,
    created_at: '2017-11-04T21:56:15.913Z',
    updated_at: '2017-11-04T21:56:15.913Z'
  }, {
    team_id: 1,
    user_id: 142,
    created_at: '2017-11-04T21:56:15.913Z',
    updated_at: '2017-11-04T21:56:15.913Z'
  }, {
    team_id: 1,
    user_id: 19,
    created_at: '2017-11-04T21:56:15.914Z',
    updated_at: '2017-11-04T21:56:15.914Z'
  }, {
    team_id: 1,
    user_id: 18,
    created_at: '2017-11-04T21:56:15.914Z',
    updated_at: '2017-11-04T21:56:15.914Z'
  }, {
    team_id: 1,
    user_id: 44,
    created_at: '2017-11-04T21:56:15.914Z',
    updated_at: '2017-11-04T21:56:15.914Z'
  }, {
    team_id: 1,
    user_id: 69,
    created_at: '2017-11-04T21:56:15.914Z',
    updated_at: '2017-11-04T21:56:15.914Z'
  }, {
    team_id: 1,
    user_id: 150,
    created_at: '2017-11-04T21:56:15.914Z',
    updated_at: '2017-11-04T21:56:15.914Z'
  }, {
    team_id: 1,
    user_id: 102,
    created_at: '2017-11-04T21:56:15.914Z',
    updated_at: '2017-11-04T21:56:15.914Z'
  }, {
    team_id: 1,
    user_id: 11,
    created_at: '2017-11-04T21:56:15.914Z',
    updated_at: '2017-11-04T21:56:15.914Z'
  }, {
    team_id: 1,
    user_id: 128,
    created_at: '2017-11-04T21:56:15.914Z',
    updated_at: '2017-11-04T21:56:15.914Z'
  }, {
    team_id: 1,
    user_id: 23,
    created_at: '2017-11-04T21:56:15.914Z',
    updated_at: '2017-11-04T21:56:15.914Z'
  }, {
    team_id: 1,
    user_id: 74,
    created_at: '2017-11-04T21:56:15.914Z',
    updated_at: '2017-11-04T21:56:15.914Z'
  }, {
    team_id: 1,
    user_id: 62,
    created_at: '2017-11-04T21:56:15.914Z',
    updated_at: '2017-11-04T21:56:15.914Z'
  }, {
    team_id: 1,
    user_id: 106,
    created_at: '2017-11-04T21:56:15.914Z',
    updated_at: '2017-11-04T21:56:15.914Z'
  }, {
    team_id: 1,
    user_id: 64,
    created_at: '2017-11-04T21:56:15.914Z',
    updated_at: '2017-11-04T21:56:15.914Z'
  }, {
    team_id: 1,
    user_id: 97,
    created_at: '2017-11-04T21:56:15.915Z',
    updated_at: '2017-11-04T21:56:15.915Z'
  }, {
    team_id: 1,
    user_id: 39,
    created_at: '2017-11-04T21:56:15.915Z',
    updated_at: '2017-11-04T21:56:15.915Z'
  }, {
    team_id: 1,
    user_id: 1,
    created_at: '2017-11-04T21:56:15.915Z',
    updated_at: '2017-11-04T21:56:15.915Z'
  }, {
    team_id: 1,
    user_id: 8,
    created_at: '2017-11-04T21:56:15.915Z',
    updated_at: '2017-11-04T21:56:15.915Z'
  }, {
    team_id: 1,
    user_id: 162,
    created_at: '2017-11-04T21:56:15.915Z',
    updated_at: '2017-11-04T21:56:15.915Z'
  }, {
    team_id: 1,
    user_id: 58,
    created_at: '2017-11-04T21:56:15.915Z',
    updated_at: '2017-11-04T21:56:15.915Z'
  }, {
    team_id: 1,
    user_id: 48,
    created_at: '2017-11-04T21:56:15.915Z',
    updated_at: '2017-11-04T21:56:15.915Z'
  }, {
    team_id: 1,
    user_id: 73,
    created_at: '2017-11-04T21:56:15.915Z',
    updated_at: '2017-11-04T21:56:15.915Z'
  }]
});

var _default = supervisorsFixtures;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(supervisorsFixtures, 'supervisorsFixtures', 'src/db/seeds/supervisors.js');
  reactHotLoader.register(_default, 'default', 'src/db/seeds/supervisors.js');
  leaveModule(module);
})();

;