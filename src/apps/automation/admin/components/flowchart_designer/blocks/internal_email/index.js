import Token from './token'
import Form from './form'

export default {
  icon: 'envelope',
  label: 'Send Internal Email',
  type: 'administrative',
  action: 'email',
  form: Form,
  token: Token
}
