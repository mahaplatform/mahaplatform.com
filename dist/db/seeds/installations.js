'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maha = require('maha');

var Installations = (0, _maha.fixtures)({
  tableName: 'maha_installations',
  records: [{
    id: 1,
    team_id: 1,
    app_id: 1,
    settings: {}
  }, {
    id: 2,
    team_id: 1,
    app_id: 2,
    settings: {
      mileage_rate: 2.50
    }
  }, {
    id: 3,
    team_id: 1,
    app_id: 3,
    settings: {}
  }, {
    id: 4,
    team_id: 1,
    app_id: 4,
    settings: {}
  }]
});

exports.default = Installations;