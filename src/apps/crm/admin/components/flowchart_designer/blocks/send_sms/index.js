import Token from './token'
import Form from './form'

export default {
  icon: 'comment',
  label: 'Send SMS',
  type: 'action',
  action: 'send_sms',
  form: Form,
  token: Token
}
