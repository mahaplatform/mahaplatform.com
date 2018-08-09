'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maha = require('maha');

var _ccetc = require('./ccetc');

var ccetc = _interopRequireWildcard(_ccetc);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _default = [(0, _maha.task)({
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
}), (0, _maha.task)({
  command: 'ccetc:fix_assets',
  description: 'Fix Assets',
  processor: ccetc.fix_assets
})];
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, 'default', 'src/tasks/ccetc/index.js');
  leaveModule(module);
})();

;