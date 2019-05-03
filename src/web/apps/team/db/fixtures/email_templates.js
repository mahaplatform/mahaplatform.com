import Fixtures from '../../../../core/objects/fixtures'

const emailTemplatesFixtures = new Fixtures({

  tableName: 'maha_email_templates',

  records: {

    acme_account_activation: (data) => ({
      team_id: data.maha_teams.acme.id,
      app_id: data.maha_apps.team.id,
      code: 'team.activation',
      name: 'Account Activation',
      subject: 'Welcome to the Maha Platform',
      html: '<p>Hello <%= first_name %>,</p><p>A new account has been created for you. All we need to do is make sure this is a valid email address.</p><table class="button large expand"><tbody><tr><td><table><tbody><tr><td><center data-parsed=""><a href="<%= activation_url %>" align="center" class="float-center">Activate Account</a></center></td></tr></tbody></table></td><td class="expander"></td></tr></tbody></table>',
      text: 'Hello <%= first_name %>,\n\nA new account has been created for you. All we need to do is make sure this is a valid email address.\n\nClick the following link to activate your account:\n\n <%= activation_url %>'
    }),

    acme_password_reset: (data) => ({
      team_id: data.maha_teams.acme.id,
      app_id: data.maha_apps.team.id,
      code: 'team.reset',
      name: 'Reset Password',
      subject: 'Reset Your Password',
      html: '<p>Hello <%= first_name %>,</p><p>You or someone else requested password reset instructions for the account connected with this email address.</p><p>If you did not request this email, you can ignore it and no changes will be made.</p><table class="button large expand"><tbody><tr><td><table><tbody><tr><td><center data-parsed=""><a href="<%= reset_url %>" align="center" class="float-center">Reset Password</a></center></td></tr></tbody></table></td><td class="expander"></td></tr></tbody></table>',
      text: 'Hello <%= first_name %>,\n\nYou or someone else requested password reset instructions for the account connected with this email address.\n\nIf you did not request this email, you can ignore it and no changes will be made.\n\nClick the following link to activate your account:\n\n<%= reset_url %>'
    }),

    soylent_account_activation: (data) => ({
      team_id: data.maha_teams.soylent.id,
      app_id: data.maha_apps.team.id,
      code: 'team.activation',
      name: 'Account Activation',
      subject: 'Welcome to the Maha Platform',
      html: '<p>Hello <%= first_name %>,</p><p>A new account has been created for you. All we need to do is make sure this is a valid email address.</p><table class="button large expand"><tbody><tr><td><table><tbody><tr><td><center data-parsed=""><a href="<%= activation_url %>" align="center" class="float-center">Activate Account</a></center></td></tr></tbody></table></td><td class="expander"></td></tr></tbody></table>',
      text: 'Hello <%= first_name %>,\n\nA new account has been created for you. All we need to do is make sure this is a valid email address.\n\nClick the following link to activate your account:\n\n <%= activation_url %>'
    }),

    soylent_password_reset: (data) => ({
      team_id: data.maha_teams.soylent.id,
      app_id: data.maha_apps.team.id,
      code: 'team.reset',
      name: 'Reset Password',
      subject: 'Reset Your Password',
      html: '<p>Hello <%= first_name %>,</p><p>You or someone else requested password reset instructions for the account connected with this email address.</p><p>If you did not request this email, you can ignore it and no changes will be made.</p><table class="button large expand"><tbody><tr><td><table><tbody><tr><td><center data-parsed=""><a href="<%= reset_url %>" align="center" class="float-center">Reset Password</a></center></td></tr></tbody></table></td><td class="expander"></td></tr></tbody></table>',
      text: 'Hello <%= first_name %>,\n\nYou or someone else requested password reset instructions for the account connected with this email address.\n\nIf you did not request this email, you can ignore it and no changes will be made.\n\nClick the following link to activate your account:\n\n<%= reset_url %>'
    }),

    wonka_account_activation: (data) => ({
      team_id: data.maha_teams.wonka.id,
      app_id: data.maha_apps.team.id,
      code: 'team.activation',
      name: 'Account Activation',
      subject: 'Welcome to the Maha Platform',
      html: '<p>Hello <%= first_name %>,</p><p>A new account has been created for you. All we need to do is make sure this is a valid email address.</p><table class="button large expand"><tbody><tr><td><table><tbody><tr><td><center data-parsed=""><a href="<%= activation_url %>" align="center" class="float-center">Activate Account</a></center></td></tr></tbody></table></td><td class="expander"></td></tr></tbody></table>',
      text: 'Hello <%= first_name %>,\n\nA new account has been created for you. All we need to do is make sure this is a valid email address.\n\nClick the following link to activate your account:\n\n <%= activation_url %>'
    }),

    wonka_password_reset: (data) => ({
      team_id: data.maha_teams.wonka.id,
      app_id: data.maha_apps.team.id,
      code: 'team.reset',
      name: 'Reset Password',
      subject: 'Reset Your Password',
      html: '<p>Hello <%= first_name %>,</p><p>You or someone else requested password reset instructions for the account connected with this email address.</p><p>If you did not request this email, you can ignore it and no changes will be made.</p><table class="button large expand"><tbody><tr><td><table><tbody><tr><td><center data-parsed=""><a href="<%= reset_url %>" align="center" class="float-center">Reset Password</a></center></td></tr></tbody></table></td><td class="expander"></td></tr></tbody></table>',
      text: 'Hello <%= first_name %>,\n\nYou or someone else requested password reset instructions for the account connected with this email address.\n\nIf you did not request this email, you can ignore it and no changes will be made.\n\nClick the following link to activate your account:\n\n<%= reset_url %>'
    })

  }

})

export default emailTemplatesFixtures
