'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maha = require('maha');

var _cceniagra = require('./cceniagra');

var cceniagra = _interopRequireWildcard(_cceniagra);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = [(0, _maha.task)({
  command: 'cceniagra:setup',
  description: 'Importing eatfresh data',
  processor: cceniagra.setup
})];