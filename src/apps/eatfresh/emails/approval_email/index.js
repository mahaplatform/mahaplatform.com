import { email } from 'maha'

const approvalEmail = email({
  code: 'approval',
  name: 'Approval Email',
  subject: 'Your attraction has been approved!',
  envelope: null
})

export default approvalEmail
