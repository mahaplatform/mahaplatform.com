import email from '../../../../core/objects/email'

const notificationEmail = email({
  code: 'new_session',
  name: 'Signin from New Device',
  subject: 'SECURITY ALERT: Signin from New Device'
})

export default notificationEmail
