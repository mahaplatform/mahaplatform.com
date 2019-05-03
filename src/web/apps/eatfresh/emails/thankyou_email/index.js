import email from '../../../../core/objects/email'

const thankyouEmail = email({
  code: 'thankyou',
  name: 'Thank You Email',
  subject: 'Thank you for your suggestion',
  envelope: null
})

export default thankyouEmail
