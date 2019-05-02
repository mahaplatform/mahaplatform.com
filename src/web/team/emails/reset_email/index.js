import { email } from 'maha'

const resetEmail = email({
  code: 'reset',
  name: 'Password Reset',
  subject: 'Reset Your Password'
})

export default resetEmail
