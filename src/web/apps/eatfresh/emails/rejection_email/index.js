import email from '../../../../core/objects/email'

const rejectionEmail = email({
  code: 'rejection',
  name: 'Rejection Email',
  subject: 'Your attraction was not approved',
  envelope: null
})

export default rejectionEmail
