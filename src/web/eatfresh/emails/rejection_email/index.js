import { email } from 'maha'

const rejectionEmail = email({
  code: 'rejection',
  name: 'Rejection Email',
  subject: 'Your attraction was not approved',
  envelope: null
})

export default rejectionEmail
