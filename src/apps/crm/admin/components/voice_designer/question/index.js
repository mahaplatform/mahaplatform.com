import Token from './token'
import Form from './form'

export default {
  icon: 'question',
  label: 'Question',
  type: 'voice',
  action: 'question',
  config: {
    question: 'Press 1 for Greg, 2 for Suli',
    options: [{ value: '1', text: '1' }, { value: '2', text: '2' }]
  },
  form: Form,
  token: Token
}
