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
      html: '<p>Hello <%= first_name %>,</p><p>A new account has been created for you. All we need to do is make sure this is a valid email address.</p><table class="button large expand"><tbody><tr><td><table><tbody><tr><td><center data-parsed=""><a href="<%= activation_url %>" align="center" class="float-center">Activate Account</a></center></td></tr></tbody></table></td><td class="expander"></td></tr></tbody></table>',
      text: 'Hello <%= first_name %>,\n\nA new account has been created for you. All we need to do is make sure this is a valid email address.\n\nClick the following link to activate your account:\n\n <%= activation_url %>'
    }, {
      id: 2,
      team_id: 1,
      app_id: 1,
      code: 'team.reset',
      name: 'Reset Password',
      subject: 'Reset Your Password',
      html: '<p>Hello <%= first_name %>,</p><p>You or someone else requested password reset instructions for the account connected with this email address.</p><p>If you did not request this email, you can ignore it and no changes will be made.</p><table class="button large expand"><tbody><tr><td><table><tbody><tr><td><center data-parsed=""><a href="<%= reset_url %>">Reset Password</a></center></td></tr></table></div>',
      text: 'Hello <%= first_name %>,\n\nYou or someone else requested password reset instructions for the account connected with this email address.\n\nIf you did not request this email, you can ignore it and no changes will be made.\n\nClick the following link to activate your account:\n\n<%= reset_url %>'
    }
  ]
})

export default emailTemplatesFixtures
