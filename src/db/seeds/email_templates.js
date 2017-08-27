import { Fixtures } from 'maha'

const emailTemplatesFixtures = new Fixtures({
  tableName: 'maha_email_templates',
  records: [
    {
      id: 1,
      team_id: 1,
      app_id: 1,
      code: 'team.activation',
      name: 'Account Activation',
      subject: 'Welcome to the Maha Platform',
      html: '<p>Hello <%= first_name %>,</p><p>You or someone else requested password reset instructions for the account connected with this email address.</p><p>If you did not request this email, you can ignore it and no changes will be made.</p><div class="email-button"><table border="0" cellpadding="0" cellspacing="0"><tr><td><a href="<%= reset_url %>">Reset Password</a></td></tr></table></div>',
      text: 'Hello <%= first_name %>,\n\nYou or someone else requested password reset instructions for the account connected with this email address.\n\nIf you did not request this email, you can ignore it and no changes will be made.\n\nClick the following link to activate your account:\n\n<%= reset_url %>'
    }, {
      id: 2,
      team_id: 1,
      app_id: 1,
      code: 'team.reset',
      name: 'Reset Password',
      subject: 'Reset Your Password',
      html: '<p>Hello <%= first_name %>,</p><p>You or someone else requested password reset instructions for the account connected with this email address.</p><p>If you did not request this email, you can ignore it and no changes will be made.</p><div class="email-button"><table border="0" cellpadding="0" cellspacing="0"><tr><td><a href="<%= reset_url %>">Reset Password</a></td></tr></table></div>',
      text: 'Hello <%= first_name %>,\n\nYou or someone else requested password reset instructions for the account connected with this email address.\n\nIf you did not request this email, you can ignore it and no changes will be made.\n\nClick the following link to activate your account:\n\n<%= reset_url %>'
    }
  ]
})

export default emailTemplatesFixtures
