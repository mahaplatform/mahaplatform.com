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
    created_at: '2017-09-12T20:47:27.290Z',
    updated_at: '2017-09-12T20:47:27.290Z'
  }, {
    id: 2,
    team_id: 1,
    title: 'Environment',
    created_at: '2017-09-12T20:47:27.291Z',
    updated_at: '2017-09-12T20:47:27.291Z'
  }, {
    id: 3,
    team_id: 1,
    title: 'Equity and Inclusion',
    created_at: '2017-09-12T20:47:27.292Z',
    updated_at: '2017-09-12T20:47:27.292Z'
  }, {
    id: 4,
    team_id: 1,
    title: '4-H Youth Development',
    created_at: '2017-09-12T20:47:27.292Z',
    updated_at: '2017-09-12T20:47:27.292Z'
  }, {
    id: 5,
    team_id: 1,
    title: 'Family and Community Development',
    created_at: '2017-09-12T20:47:27.295Z',
    updated_at: '2017-09-12T20:47:27.295Z'
  }, {
    id: 6,
    team_id: 1,
    title: 'Administration',
    created_at: '2017-09-12T20:47:27.297Z',
    updated_at: '2017-09-12T20:47:27.297Z'
  }, {
    id: 7,
    team_id: 1,
    title: 'Agriculture',
    created_at: '2017-09-12T20:47:27.300Z',
    updated_at: '2017-09-12T20:47:27.300Z'
  }, {
    id: 8,
    team_id: 1,
    title: 'Gardening',
    created_at: '2017-09-12T20:47:27.301Z',
    updated_at: '2017-09-12T20:47:27.301Z'
  }, {
    id: 9,
    team_id: 1,
    title: 'Nutrition, Food Access, and Consumer Education',
    created_at: '2017-09-12T20:47:27.302Z',
    updated_at: '2017-09-12T20:47:27.302Z'
  }, {
    id: 10,
    team_id: 1,
    title: 'Human Resources',
    created_at: '2017-09-12T20:47:27.303Z',
    updated_at: '2017-09-12T20:47:27.303Z'
  }, {
    id: 11,
    team_id: 1,
    title: 'Finance',
    created_at: '2017-09-12T20:47:27.309Z',
    updated_at: '2017-09-12T20:47:27.309Z'
  }]
});

exports.default = groupsFixtures;