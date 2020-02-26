import Token from './token'
import Form from './form'

export default {
  icon: 'random',
  label: 'Conditional',
  type: 'conditional',
  action: 'ifelse',
  config: {
    options: [
      { code: 'abc', text: 'is checked' },
      { code: 'def', text: 'is not checked' }
    ]
  },
  form: Form,
  token: Token
}
