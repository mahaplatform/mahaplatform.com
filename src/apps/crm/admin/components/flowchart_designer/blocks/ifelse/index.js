import Token from './token'
import Form from './form'

export default {
  icon: 'random',
  label: 'If / Else',
  type: 'conditional',
  action: 'ifelse',
  config: {
    options: [{ value: true, text: 'True' }, { value: false, text: 'False' }]
  },
  form: Form,
  token: Token
}
