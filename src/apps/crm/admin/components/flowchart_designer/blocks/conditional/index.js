import Token from './token'
import Form from './form'

export default {
  icon: 'random',
  label: 'Conditional',
  type: 'conditional',
  action: 'ifelse',
  config: {
    options: [
      { value: 'else', text: 'Else' }
    ]
  },
  form: Form,
  token: Token
}
