import { email } from 'maha'

const activateEmail = email({
  code: 'activation',
  name: 'Account Activation',
  subject: 'Welcome to the Maha Platform'
})

export default activateEmail
