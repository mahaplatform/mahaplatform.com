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
    created_at: '2017-10-18T03:18:42.993Z',
    updated_at: '2017-10-18T03:18:42.993Z'
  }, {
    id: 2,
    team_id: 1,
    title: 'Environment',
    created_at: '2017-10-18T03:18:42.994Z',
    updated_at: '2017-10-18T03:18:42.994Z'
  }, {
    id: 3,
    team_id: 1,
    title: '4-H Youth Development',
    created_at: '2017-10-18T03:18:42.994Z',
    updated_at: '2017-10-18T03:18:42.994Z'
  }, {
    id: 4,
    team_id: 1,
    title: 'Family and Community Development',
    created_at: '2017-10-18T03:18:42.994Z',
    updated_at: '2017-10-18T03:18:42.994Z'
  }, {
    id: 5,
    team_id: 1,
    title: 'Administration',
    created_at: '2017-10-18T03:18:42.995Z',
    updated_at: '2017-10-18T03:18:42.995Z'
  }, {
    id: 6,
    team_id: 1,
    title: 'Gardening',
    created_at: '2017-10-18T03:18:42.995Z',
    updated_at: '2017-10-18T03:18:42.995Z'
  }, {
    id: 7,
    team_id: 1,
    title: 'Agriculture',
    created_at: '2017-10-18T03:18:42.997Z',
    updated_at: '2017-10-18T03:18:42.997Z'
  }, {
    id: 8,
    team_id: 1,
    title: 'Equity and Inclusion',
    created_at: '2017-10-18T03:18:42.997Z',
    updated_at: '2017-10-18T03:18:42.997Z'
  }, {
    id: 9,
    team_id: 1,
    title: 'Nutrition, Food Access, and Consumer Education',
    created_at: '2017-10-18T03:18:43.007Z',
    updated_at: '2017-10-18T03:18:43.007Z'
  }, {
    id: 10,
    team_id: 1,
    title: 'Human Resources',
    created_at: '2017-10-18T03:18:43.008Z',
    updated_at: '2017-10-18T03:18:43.008Z'
  }, {
    id: 11,
    team_id: 1,
    title: 'Finance',
    created_at: '2017-10-18T03:18:43.009Z',
    updated_at: '2017-10-18T03:18:43.009Z'
  }]
});

exports.default = groupsFixtures;