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
    created_at: '2017-09-05T17:08:14.045Z',
    updated_at: '2017-09-05T17:08:14.045Z'
  }, {
    id: 2,
    team_id: 1,
    title: 'Environment',
    created_at: '2017-09-05T17:08:14.046Z',
    updated_at: '2017-09-05T17:08:14.046Z'
  }, {
    id: 3,
    team_id: 1,
    title: 'Equity and Inclusion',
    created_at: '2017-09-05T17:08:14.047Z',
    updated_at: '2017-09-05T17:08:14.047Z'
  }, {
    id: 4,
    team_id: 1,
    title: '4-H Youth Development',
    created_at: '2017-09-05T17:08:14.047Z',
    updated_at: '2017-09-05T17:08:14.047Z'
  }, {
    id: 5,
    team_id: 1,
    title: 'Family and Community Development',
    created_at: '2017-09-05T17:08:14.048Z',
    updated_at: '2017-09-05T17:08:14.048Z'
  }, {
    id: 6,
    team_id: 1,
    title: 'Administration',
    created_at: '2017-09-05T17:08:14.049Z',
    updated_at: '2017-09-05T17:08:14.049Z'
  }, {
    id: 7,
    team_id: 1,
    title: 'Agriculture',
    created_at: '2017-09-05T17:08:14.051Z',
    updated_at: '2017-09-05T17:08:14.051Z'
  }, {
    id: 8,
    team_id: 1,
    title: 'Gardening',
    created_at: '2017-09-05T17:08:14.052Z',
    updated_at: '2017-09-05T17:08:14.052Z'
  }, {
    id: 9,
    team_id: 1,
    title: 'Nutrition, Food Access, and Consumer Education',
    created_at: '2017-09-05T17:08:14.053Z',
    updated_at: '2017-09-05T17:08:14.053Z'
  }, {
    id: 10,
    team_id: 1,
    title: 'Human Resources',
    created_at: '2017-09-05T17:08:14.054Z',
    updated_at: '2017-09-05T17:08:14.054Z'
  }, {
    id: 11,
    team_id: 1,
    title: 'Finance',
    created_at: '2017-09-05T17:08:14.059Z',
    updated_at: '2017-09-05T17:08:14.059Z'
  }]
});

exports.default = groupsFixtures;