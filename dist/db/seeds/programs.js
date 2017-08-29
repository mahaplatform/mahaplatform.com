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
    created_at: '2017-08-26T19:14:18.385Z',
    updated_at: '2017-08-26T19:14:18.385Z'
  }]
});

exports.default = programsFixtures;