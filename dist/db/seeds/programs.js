'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maha = require('maha');

var Programs = (0, _maha.fixtures)({
  tableName: 'competencies_programs',
  records: [{
    id: 1,
    team_id: 1,
    title: '',
    created_at: '2017-08-12T14:49:54.270Z',
    updated_at: '2017-08-12T14:49:54.270Z'
  }]
});

exports.default = Programs;