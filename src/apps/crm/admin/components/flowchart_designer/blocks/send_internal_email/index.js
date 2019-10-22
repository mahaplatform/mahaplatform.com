import Token from './token'
import Form from './form'

export default {
  icon: 'envelope',
  label: 'Send Internal Email',
  type: 'action',
  action: 'send_internal_email',
  form: Form,
  token: Token
}
