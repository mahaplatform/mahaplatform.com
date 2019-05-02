import { email } from 'maha'

const activateEmail = email({
  code: 'activation',
  name: 'Account Activation',
  subject: 'Welcome'
})

export default activateEmail
