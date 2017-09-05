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
    created_at: '2017-09-05T16:52:07.460Z',
    updated_at: '2017-09-05T16:52:07.460Z'
  }, {
    id: 2,
    team_id: 1,
    title: 'Environment',
    created_at: '2017-09-05T16:52:07.462Z',
    updated_at: '2017-09-05T16:52:07.462Z'
  }, {
    id: 3,
    team_id: 1,
    title: 'Equity and Inclusion',
    created_at: '2017-09-05T16:52:07.462Z',
    updated_at: '2017-09-05T16:52:07.462Z'
  }, {
    id: 4,
    team_id: 1,
    title: '4-H Youth Development',
    created_at: '2017-09-05T16:52:07.462Z',
    updated_at: '2017-09-05T16:52:07.462Z'
  }, {
    id: 5,
    team_id: 1,
    title: 'Family and Community Development',
    created_at: '2017-09-05T16:52:07.463Z',
    updated_at: '2017-09-05T16:52:07.463Z'
  }, {
    id: 6,
    team_id: 1,
    title: 'Administration',
    created_at: '2017-09-05T16:52:07.465Z',
    updated_at: '2017-09-05T16:52:07.465Z'
  }, {
    id: 7,
    team_id: 1,
    title: 'Agriculture',
    created_at: '2017-09-05T16:52:07.467Z',
    updated_at: '2017-09-05T16:52:07.467Z'
  }, {
    id: 8,
    team_id: 1,
    title: 'Gardening',
    created_at: '2017-09-05T16:52:07.469Z',
    updated_at: '2017-09-05T16:52:07.469Z'
  }, {
    id: 9,
    team_id: 1,
    title: 'Nutrition, Food Access, and Consumer Education',
    created_at: '2017-09-05T16:52:07.470Z',
    updated_at: '2017-09-05T16:52:07.470Z'
  }, {
    id: 10,
    team_id: 1,
    title: 'Human Resources',
    created_at: '2017-09-05T16:52:07.470Z',
    updated_at: '2017-09-05T16:52:07.470Z'
  }, {
    id: 11,
    team_id: 1,
    title: 'Finance',
    created_at: '2017-09-05T16:52:07.476Z',
    updated_at: '2017-09-05T16:52:07.476Z'
  }]
});

exports.default = groupsFixtures;