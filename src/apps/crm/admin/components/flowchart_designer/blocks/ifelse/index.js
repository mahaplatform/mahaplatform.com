import Token from './token'
import Form from './form'

export default {
  icon: 'random',
  label: 'If / Else',
  type: 'conditional',
  action: 'ifelse',
  config: {
    options: [{ value: '1', text: '1' }, { value: '2', text: '2' }]
  },
  form: Form,
  token: Token
}
