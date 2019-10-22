import Token from './token'
import Form from './form'

export default {
  icon: 'question',
  label: 'Question',
  type: 'conditional',
  action: 'question',
  config: {
    question: 'Would you like to buy a vowel?',
    options: [{ value: 'yes', text: 'YES' }, { value: 'no', text: 'NO' }]
  },
  form: Form,
  token: Token
}
