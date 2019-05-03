import Notifications from '../../../core/objects/notifications'

const notifications = new Notifications([
  {
    code: 'conversation_status',
    title: 'Conversation Status',
    description: 'someone starts or archives a conversation with me'
  }, {
    code: 'conversation_membership',
    title: 'Conversation Membership',
    description: 'someone joins or leaves one of my conversations'
  }, {
    code: 'message_received',
    title: 'Message Received',
    description: 'someone sends a message to one of my conversations'
  }
])

export default notifications
