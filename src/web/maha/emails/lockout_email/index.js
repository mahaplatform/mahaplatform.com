import email from '../../core/objects/email'

const notificationEmail = email({
  code: 'lockout',
  name: 'Lockout',
  subject: 'SECURITY ALERT: Possible break in attempt'
})

export default notificationEmail
