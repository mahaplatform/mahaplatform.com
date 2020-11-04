import Form from './form'

export default {
  icon: 'volume-control-phone',
  label: 'Speak Text',
  type: 'voice',
  action: 'say',
  form: Form,
  token: ({ message }) => message
}
