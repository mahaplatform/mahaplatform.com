import Form from './form'

export default {
  icon: 'arrow-right',
  label: 'Goto Step',
  type: 'control',
  action: 'redirect',
  form: Form,
  token: ({ destination }) => destination
}
