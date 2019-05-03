import email from '../../../../core/objects/email'

const activateEmail = email({
  code: 'activation',
  name: 'Account Activation',
  subject: 'Welcome'
})

export default activateEmail
