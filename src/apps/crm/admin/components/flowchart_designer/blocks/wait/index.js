import Token from './token'
import Form from './form'

export default {
  icon: 'clock-o',
  label: 'Wait',
  type: 'control',
  action: 'wait',
  config: {
    strategy: 'datetime'
  },
  form: Form,
  token: Token
}
