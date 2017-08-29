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
    created_at: '2017-08-26T19:14:18.331Z',
    updated_at: '2017-08-26T19:14:18.331Z'
  }, {
    id: 2,
    team_id: 1,
    title: 'Environment',
    created_at: '2017-08-26T19:14:18.332Z',
    updated_at: '2017-08-26T19:14:18.332Z'
  }, {
    id: 3,
    team_id: 1,
    title: 'Equity and Inclusion',
    created_at: '2017-08-26T19:14:18.332Z',
    updated_at: '2017-08-26T19:14:18.332Z'
  }, {
    id: 4,
    team_id: 1,
    title: '4-H Youth Development',
    created_at: '2017-08-26T19:14:18.332Z',
    updated_at: '2017-08-26T19:14:18.332Z'
  }, {
    id: 5,
    team_id: 1,
    title: 'Family and Community Development',
    created_at: '2017-08-26T19:14:18.333Z',
    updated_at: '2017-08-26T19:14:18.333Z'
  }, {
    id: 6,
    team_id: 1,
    title: 'Administration',
    created_at: '2017-08-26T19:14:18.335Z',
    updated_at: '2017-08-26T19:14:18.335Z'
  }, {
    id: 7,
    team_id: 1,
    title: 'Agriculture',
    created_at: '2017-08-26T19:14:18.337Z',
    updated_at: '2017-08-26T19:14:18.337Z'
  }, {
    id: 8,
    team_id: 1,
    title: 'Gardening',
    created_at: '2017-08-26T19:14:18.340Z',
    updated_at: '2017-08-26T19:14:18.340Z'
  }, {
    id: 9,
    team_id: 1,
    title: 'Nutrition, Food Access, and Consumer Education',
    created_at: '2017-08-26T19:14:18.341Z',
    updated_at: '2017-08-26T19:14:18.341Z'
  }, {
    id: 10,
    team_id: 1,
    title: 'Human Resources',
    created_at: '2017-08-26T19:14:18.342Z',
    updated_at: '2017-08-26T19:14:18.342Z'
  }, {
    id: 11,
    team_id: 1,
    title: 'Finance',
    created_at: '2017-08-26T19:14:18.346Z',
    updated_at: '2017-08-26T19:14:18.346Z'
  }]
});

exports.default = groupsFixtures;