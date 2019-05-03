import email from '../../../../core/objects/email'

const resetEmail = email({
  code: 'reset',
  name: 'Password Reset',
  subject: 'Reset Your Password'
})

export default resetEmail
