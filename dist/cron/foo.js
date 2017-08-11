'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maha = require('maha');

var Foo = (0, _maha.cron)({
  schedule: 1,
  processor: function processor() {}
});

exports.default = Foo;