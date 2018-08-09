'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maha = require('maha');

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var notificationTypesFixtures = new _maha.Fixtures({
  tableName: 'maha_notification_types',
  records: [{
    app_id: 1,
    text: 'item_comment',
    description: 'someone comments on an item that I own'
  }, {
    app_id: 2,
    text: 'item_submitted',
    description: 'someone submits an advance, expense, or trip in a project I own'
  }, {
    app_id: 2,
    text: 'item_rejected',
    description: 'one of my advances, expenses, or trips is rejected'
  }, {
    app_id: 2,
    text: 'item_approved',
    description: 'one of my advances, expenses, or trips is approved'
  }, {
    app_id: 2,
    text: 'item_reviewed',
    description: 'one of my advances, expenses, or trips is reviewed'
  }, {
    app_id: 2,
    text: 'item_processed',
    description: 'one of my advances, expenses, or trips is processed'
  }, {
    app_id: 3,
    text: 'plan_created',
    description: 'a supervisor creates a plan for you'
  }, {
    app_id: 3,
    text: 'plan_approved',
    description: 'a supervisor approves your plan'
  }, {
    app_id: 4,
    text: 'opportunity_suggested',
    description: 'a new opportunity is suggested'
  }]
});

var _default = notificationTypesFixtures;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(notificationTypesFixtures, 'notificationTypesFixtures', 'src/db/seeds/notification_types.js');
  reactHotLoader.register(_default, 'default', 'src/db/seeds/notification_types.js');
  leaveModule(module);
})();

;