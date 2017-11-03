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
    created_at: '2017-11-03T18:56:41.933Z',
    updated_at: '2017-11-03T18:56:41.933Z'
  }, {
    id: 2,
    team_id: 1,
    title: 'Environment',
    created_at: '2017-11-03T18:56:41.934Z',
    updated_at: '2017-11-03T18:56:41.934Z'
  }, {
    id: 3,
    team_id: 1,
    title: '4-H Youth Development',
    created_at: '2017-11-03T18:56:41.934Z',
    updated_at: '2017-11-03T18:56:41.934Z'
  }, {
    id: 4,
    team_id: 1,
    title: 'Family and Community Development',
    created_at: '2017-11-03T18:56:41.935Z',
    updated_at: '2017-11-03T18:56:41.935Z'
  }, {
    id: 5,
    team_id: 1,
    title: 'Administration',
    created_at: '2017-11-03T18:56:41.935Z',
    updated_at: '2017-11-03T18:56:41.935Z'
  }, {
    id: 6,
    team_id: 1,
    title: 'Gardening',
    created_at: '2017-11-03T18:56:41.936Z',
    updated_at: '2017-11-03T18:56:41.936Z'
  }, {
    id: 7,
    team_id: 1,
    title: 'Agriculture',
    created_at: '2017-11-03T18:56:41.937Z',
    updated_at: '2017-11-03T18:56:41.937Z'
  }, {
    id: 8,
    team_id: 1,
    title: 'Equity and Inclusion',
    created_at: '2017-11-03T18:56:41.937Z',
    updated_at: '2017-11-03T18:56:41.937Z'
  }, {
    id: 9,
    team_id: 1,
    title: 'Nutrition, Food Access, and Consumer Education',
    created_at: '2017-11-03T18:56:41.939Z',
    updated_at: '2017-11-03T18:56:41.939Z'
  }, {
    id: 10,
    team_id: 1,
    title: 'Human Resources',
    created_at: '2017-11-03T18:56:41.941Z',
    updated_at: '2017-11-03T18:56:41.941Z'
  }, {
    id: 11,
    team_id: 1,
    title: 'Finance',
    created_at: '2017-11-03T18:56:41.943Z',
    updated_at: '2017-11-03T18:56:41.943Z'
  }]
});

exports.default = groupsFixtures;