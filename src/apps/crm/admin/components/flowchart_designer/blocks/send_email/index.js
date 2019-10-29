import Token from './token'
import Form from './form'

export default {
  icon: 'envelope',
  label: 'Send Email',
  type: 'verb',
  action: 'send_email',
  form: Form,
  token: Token
}
