import { email } from 'maha'

const thankyouEmail = email({
  code: 'thankyou',
  name: 'Thank You Email',
  subject: 'Thank you for your suggestion',
  envelope: null
})

export default thankyouEmail
