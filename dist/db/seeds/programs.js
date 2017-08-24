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
    created_at: '2017-08-24T18:13:05.077Z',
    updated_at: '2017-08-24T18:13:05.077Z'
  }]
});

exports.default = programsFixtures;