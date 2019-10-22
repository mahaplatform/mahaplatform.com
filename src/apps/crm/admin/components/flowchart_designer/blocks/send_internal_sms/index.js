import Token from './token'
import Form from './form'

export default {
  icon: 'comment',
  label: 'Send Internal SMS',
  type: 'action',
  action: 'send_internal_sms',
  form: Form,
  token: Token
}
