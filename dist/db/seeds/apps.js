'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maha = require('maha');

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var appsFixtures = new _maha.Fixtures({
  tableName: 'maha_apps',
  records: [{
    id: 1,
    title: 'Team',
    app_category_id: 1,
    app_author_id: 1,
    description: 'Manage platform configuration, users, apps, and access',
    version: '1.0.0',
    color: 'red',
    icon: 'users'
  }, {
    id: 2,
    title: 'Expenses',
    app_category_id: 4,
    app_author_id: 1,
    description: 'Manage expenses for expenses, advances, and vehicle trips',
    version: '1.0.0',
    color: 'green',
    icon: 'dollar'
  }, {
    id: 3,
    title: 'Competencies',
    app_category_id: 3,
    app_author_id: 1,
    description: 'Manage resources required for various job positions',
    version: '1.0.0',
    color: 'blue',
    icon: 'trophy'
  }, {
    id: 4,
    title: 'Eat Fresh',
    app_category_id: 3,
    app_author_id: 1,
    description: 'Help tourists find local food and farm resources',
    version: '1.0.0',
    color: 'orange',
    icon: 'spoon'
  }]
});

var _default = appsFixtures;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(appsFixtures, 'appsFixtures', 'src/db/seeds/apps.js');
  reactHotLoader.register(_default, 'default', 'src/db/seeds/apps.js');
  leaveModule(module);
})();

;