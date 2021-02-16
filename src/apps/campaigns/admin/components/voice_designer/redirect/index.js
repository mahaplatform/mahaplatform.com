import Form from './form'

export default {
  icon: 'arrow-right',
  label: 'Goto Menu',
  type: 'voice',
  action: 'redirect',
  form: Form,
  token: ({ destination }) => destination
}
