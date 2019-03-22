import email from '../../core/objects/email'

const ondemandNotificationEmail = email({
  code: 'notification',
  name: 'Notification',
  subject: 'Here\'s what you\'ve missed!'
})

export default ondemandNotificationEmail
