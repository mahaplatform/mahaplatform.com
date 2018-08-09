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

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

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

var _default = teamFixtures;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(teamFixtures, 'teamFixtures', 'src/db/seeds/teams.js');
  reactHotLoader.register(_default, 'default', 'src/db/seeds/teams.js');
  leaveModule(module);
})();

;