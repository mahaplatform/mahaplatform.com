import Token from './token'
import Form from './form'

export default {
  icon: 'envelope',
  label: 'Send Email',
  type: 'action',
  action: 'send_email',
  form: Form,
  token: Token
}
