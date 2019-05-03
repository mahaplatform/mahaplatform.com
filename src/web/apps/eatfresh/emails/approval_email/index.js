import email from '../../../../core/objects/email'

const approvalEmail = email({
  code: 'approval',
  name: 'Approval Email',
  subject: 'Your attraction has been approved!',
  envelope: null
})

export default approvalEmail
