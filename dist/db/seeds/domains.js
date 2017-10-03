'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maha = require('maha');

var domainsFixtures = new _maha.Fixtures({
  tableName: 'maha_domains',
  records: [{
    id: 1,
    team_id: 1,
    name: 'dev.eatfreshny.com',
    is_primary: true
  }]
});

exports.default = domainsFixtures;