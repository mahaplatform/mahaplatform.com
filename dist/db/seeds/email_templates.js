'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  tableName: 'maha_email_templates',
  records: [{
    team_id: 1,
    app_id: 1,
    code: 'activation',
    name: 'Account Activation',
    subject: 'Welcome to the Maha Platform',
    body: '<p>Hello <%= first_name %>,</p><p>A new account has been created for you. All we need to do is make sure this is a valid email address.</p><div class="email-button"><table border="0" cellpadding="0" cellspacing="0"><tr><td><a href="<%= activation_url %>">Activate Account</a></td></tr></table></div>'
  }, {
    team_id: 1,
    app_id: 1,
    code: 'reset',
    name: 'Reset Password',
    subject: 'Reset Your Password',
    body: '<p>Hello <%= first_name %>,</p><p>You or someone else requested password reset instructions for the account connected with this email address.</p><p>If you did not request this email, you can ignore it and no changes will be made.</p><div class="email-button"><table border="0" cellpadding="0" cellspacing="0"><tr><td><a href="<%= reset_link %>">Reset Password</a></td></tr></table></div>'
  }]
};