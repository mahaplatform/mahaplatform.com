import Form from './form'

export default {
  icon: 'volume-control-phone',
  label: 'Speak Text',
  type: 'voice',
  action: 'say',
  form: Form,
  config: {
    voice: 'woman',
    message: 'Hello! How are you?'
  },
  token: ({ message }) => message
}
