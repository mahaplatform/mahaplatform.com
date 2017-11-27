'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maha = require('maha');

var _ccetc = require('./ccetc');

var ccetc = _interopRequireWildcard(_ccetc);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = [(0, _maha.task)({
  command: 'ccetc:import:20170622',
  description: 'Importing ccetompkins seeds',
  processor: ccetc.import_20170622
}), (0, _maha.task)({
  command: 'ccetc:import:20171107',
  description: 'Fixing role data',
  processor: ccetc.import_20171107
}), (0, _maha.task)({
  command: 'ccetc:import:20171109',
  description: 'Importing project members',
  processor: ccetc.import_20171109
}), (0, _maha.task)({
  command: 'ccetc:import:20171115',
  description: 'Importing project members',
  processor: ccetc.import_20171115
}), (0, _maha.task)({
  command: 'ccetc:add_asset_previews',
  description: 'Add Asset Previews',
  processor: ccetc.add_asset_previews
})];