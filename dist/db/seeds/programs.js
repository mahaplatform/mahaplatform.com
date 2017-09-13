'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maha = require('maha');

var programsFixtures = new _maha.Fixtures({
  tableName: 'competencies_programs',
  records: [{
    id: 1,
    team_id: 1,
    title: '',
    created_at: '2017-09-12T20:47:27.347Z',
    updated_at: '2017-09-12T20:47:27.347Z'
  }]
});

exports.default = programsFixtures;