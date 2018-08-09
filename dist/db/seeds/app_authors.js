'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maha = require('maha');

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var appAuthorsFixtures = new _maha.Fixtures({
  tableName: 'maha_app_authors',
  records: [{
    id: 1,
    name: 'CCE Tompkins'
  }]
});

var _default = appAuthorsFixtures;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(appAuthorsFixtures, 'appAuthorsFixtures', 'src/db/seeds/app_authors.js');
  reactHotLoader.register(_default, 'default', 'src/db/seeds/app_authors.js');
  leaveModule(module);
})();

;