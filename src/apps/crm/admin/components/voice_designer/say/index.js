import Form from './form'

export default {
  icon: 'volume-control-phone',
  label: 'Speak Text',
  type: 'control',
  action: 'say',
  form: Form,
  config: {
    voice: 'woman',
    message: 'Hello! How are you?'
  },
  token: ({ message }) => message
}
