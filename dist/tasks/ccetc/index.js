'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maha = require('maha');

var _ccetc = require('./ccetc');

exports.default = (0, _maha.task)({
  command: 'ccetc:import:20170622',
  description: 'Migrate database',
  processor: _ccetc.import_20170622
});