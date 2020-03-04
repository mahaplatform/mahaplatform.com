import Token from './token'
import Form from './form'

export default {
  icon: 'comment',
  label: 'Send Internal SMS',
  type: 'administrative',
  action: 'internal_sms',
  section: 'internal_communication',
  form: Form,
  token: Token
}
