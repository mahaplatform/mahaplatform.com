import Token from './token'
import Form from './form'

export default {
  icon: 'envelope',
  label: 'Send Internal Email',
  type: 'administrative',
  action: 'internal_email',
  form: Form,
  token: Token
}
