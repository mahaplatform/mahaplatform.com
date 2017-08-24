'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maha = require('maha');

var appAuthorsFixtures = new _maha.Fixtures({
  tableName: 'maha_app_authors',
  records: [{
    id: 1,
    name: 'CCE Tompkins'
  }]
});

exports.default = appAuthorsFixtures;