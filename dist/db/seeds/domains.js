'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maha = require('maha');

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var domainsFixtures = new _maha.Fixtures({
  tableName: 'maha_domains',
  records: [{
    id: 1,
    team_id: 1,
    name: 'dev.eatfreshny.com',
    is_primary: true
  }]
});

var _default = domainsFixtures;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(domainsFixtures, 'domainsFixtures', 'src/db/seeds/domains.js');
  reactHotLoader.register(_default, 'default', 'src/db/seeds/domains.js');
  leaveModule(module);
})();

;