'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maha = require('maha');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var teamFixtures = new _maha.Fixtures({
  tableName: 'maha_teams',
  records: [{
    id: 1,
    title: 'CCE Tompkins',
    subdomain: 'ccetompkins',
    color: 'red',
    logo_id: 1
  }]
});

exports.default = teamFixtures;