import Form from './form'

export default {
  icon: 'voicemail',
  label: 'Voicemail',
  type: 'voice',
  action: 'voicemail',
  form: Form,
  token: step => step.name
}
