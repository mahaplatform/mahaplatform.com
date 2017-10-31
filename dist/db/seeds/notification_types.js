'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maha = require('maha');

var notificationTypesFixtures = new _maha.Fixtures({
  tableName: 'maha_notification_types',
  records: [{
    app_id: 2,
    text: 'expense_rejected',
    description: 'one of my advances, expenses, or trips is rejected'
  }, {
    app_id: 2,
    text: 'expense_approved',
    description: 'one of my advances, expenses, or trips is approved'
  }, {
    app_id: 2,
    text: 'expense_submitted',
    description: 'someone submits an advance, expense, or trip in a project I own'
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

exports.default = notificationTypesFixtures;