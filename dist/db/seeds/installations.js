'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maha = require('maha');

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var installationsFixtures = new _maha.Fixtures({
  tableName: 'maha_installations',
  records: [{
    id: 1,
    team_id: 1,
    app_id: 1,
    settings: {}
  }, {
    id: 2,
    team_id: 1,
    app_id: 2,
    settings: {
      mileage_rate: 0.535,
      integration: 'accpac',
      trip_expense_type_id: 16
    }
  }, {
    id: 3,
    team_id: 1,
    app_id: 3,
    settings: {}
  }, {
    id: 4,
    team_id: 1,
    app_id: 4,
    settings: {}
  }]
});

var _default = installationsFixtures;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(installationsFixtures, 'installationsFixtures', 'src/db/seeds/installations.js');
  reactHotLoader.register(_default, 'default', 'src/db/seeds/installations.js');
  leaveModule(module);
})();

;