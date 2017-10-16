'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maha = require('maha');

var groupsFixtures = new _maha.Fixtures({
  tableName: 'maha_groups',
  records: [{
    id: 1,
    team_id: 1,
    title: 'Energy',
    created_at: '2017-10-12T14:02:25.958Z',
    updated_at: '2017-10-12T14:02:25.958Z'
  }, {
    id: 2,
    team_id: 1,
    title: 'Environment',
    created_at: '2017-10-12T14:02:25.959Z',
    updated_at: '2017-10-12T14:02:25.959Z'
  }, {
    id: 3,
    team_id: 1,
    title: '4-H Youth Development',
    created_at: '2017-10-12T14:02:25.959Z',
    updated_at: '2017-10-12T14:02:25.959Z'
  }, {
    id: 4,
    team_id: 1,
    title: 'Family and Community Development',
    created_at: '2017-10-12T14:02:25.960Z',
    updated_at: '2017-10-12T14:02:25.960Z'
  }, {
    id: 5,
    team_id: 1,
    title: 'Administration',
    created_at: '2017-10-12T14:02:25.960Z',
    updated_at: '2017-10-12T14:02:25.960Z'
  }, {
    id: 6,
    team_id: 1,
    title: 'Gardening',
    created_at: '2017-10-12T14:02:25.961Z',
    updated_at: '2017-10-12T14:02:25.961Z'
  }, {
    id: 7,
    team_id: 1,
    title: 'Agriculture',
    created_at: '2017-10-12T14:02:25.962Z',
    updated_at: '2017-10-12T14:02:25.962Z'
  }, {
    id: 8,
    team_id: 1,
    title: 'Equity and Inclusion',
    created_at: '2017-10-12T14:02:25.962Z',
    updated_at: '2017-10-12T14:02:25.962Z'
  }, {
    id: 9,
    team_id: 1,
    title: 'Nutrition, Food Access, and Consumer Education',
    created_at: '2017-10-12T14:02:25.964Z',
    updated_at: '2017-10-12T14:02:25.964Z'
  }, {
    id: 10,
    team_id: 1,
    title: 'Human Resources',
    created_at: '2017-10-12T14:02:25.966Z',
    updated_at: '2017-10-12T14:02:25.966Z'
  }, {
    id: 11,
    team_id: 1,
    title: 'Finance',
    created_at: '2017-10-12T14:02:25.968Z',
    updated_at: '2017-10-12T14:02:25.968Z'
  }]
});

exports.default = groupsFixtures;