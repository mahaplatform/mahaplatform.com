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
    created_at: '2017-11-04T21:55:18.691Z',
    updated_at: '2017-11-04T21:55:18.691Z'
  }, {
    id: 2,
    team_id: 1,
    title: 'Environment',
    created_at: '2017-11-04T21:55:18.692Z',
    updated_at: '2017-11-04T21:55:18.692Z'
  }, {
    id: 3,
    team_id: 1,
    title: '4-H Youth Development',
    created_at: '2017-11-04T21:55:18.692Z',
    updated_at: '2017-11-04T21:55:18.692Z'
  }, {
    id: 4,
    team_id: 1,
    title: 'Family and Community Development',
    created_at: '2017-11-04T21:55:18.693Z',
    updated_at: '2017-11-04T21:55:18.693Z'
  }, {
    id: 5,
    team_id: 1,
    title: 'Administration',
    created_at: '2017-11-04T21:55:18.693Z',
    updated_at: '2017-11-04T21:55:18.693Z'
  }, {
    id: 6,
    team_id: 1,
    title: 'Gardening',
    created_at: '2017-11-04T21:55:18.694Z',
    updated_at: '2017-11-04T21:55:18.694Z'
  }, {
    id: 7,
    team_id: 1,
    title: 'Agriculture',
    created_at: '2017-11-04T21:55:18.695Z',
    updated_at: '2017-11-04T21:55:18.695Z'
  }, {
    id: 8,
    team_id: 1,
    title: 'Equity and Inclusion',
    created_at: '2017-11-04T21:55:18.695Z',
    updated_at: '2017-11-04T21:55:18.695Z'
  }, {
    id: 9,
    team_id: 1,
    title: 'Nutrition, Food Access, and Consumer Education',
    created_at: '2017-11-04T21:55:18.697Z',
    updated_at: '2017-11-04T21:55:18.697Z'
  }, {
    id: 10,
    team_id: 1,
    title: 'Human Resources',
    created_at: '2017-11-04T21:55:18.699Z',
    updated_at: '2017-11-04T21:55:18.699Z'
  }, {
    id: 11,
    team_id: 1,
    title: 'Finance',
    created_at: '2017-11-04T21:55:18.701Z',
    updated_at: '2017-11-04T21:55:18.701Z'
  }]
});

exports.default = groupsFixtures;