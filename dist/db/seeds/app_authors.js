'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maha = require('maha');

var AppAuthors = (0, _maha.fixtures)({
  tableName: 'maha_app_authors',
  records: [{
    id: 1,
    name: 'CCE Tompkins'
  }]
});

exports.default = AppAuthors;