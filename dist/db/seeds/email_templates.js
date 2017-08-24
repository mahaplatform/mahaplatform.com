'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maha = require('maha');

var emailTemplatesFixtures = new _maha.Fixtures({
  tableName: 'maha_email_templates',
  records: [{
    team_id: 1,
    app_id: 1,
    code: 'team.activation',
    name: 'Account Activation',
    subject: 'Welcome to the Maha Platform',
    html: '<p>Hello <%= first_name %>,</p><p>A new account has been created for you. All we need to do is make sure this is a valid email address.</p><div class="email-button"><table border="0" cellpadding="0" cellspacing="0"><tr><td><a href="<%= activation_url %>">Activate Account</a></td></tr></table></div>',
    text: ''
  }, {
    team_id: 1,
    app_id: 1,
    code: 'team.reset',
    name: 'Reset Password',
    subject: 'Reset Your Password',
    html: '<p>Hello <%= first_name %>,</p><p>You or someone else requested password reset instructions for the account connected with this email address.</p><p>If you did not request this email, you can ignore it and no changes will be made.</p><div class="email-button"><table border="0" cellpadding="0" cellspacing="0"><tr><td><a href="<%= reset_url %>">Reset Password</a></td></tr></table></div>',
    text: ''
  }]
});

exports.default = emailTemplatesFixtures;