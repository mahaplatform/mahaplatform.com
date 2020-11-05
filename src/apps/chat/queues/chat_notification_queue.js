import { sendChatNotification } from '../services/notifications'
import Queue from '@core/objects/queue'

const processor = async (req, job) => {

  await sendChatNotification(req, {
    message_id: job.data.message_id
  })

}

const ChatNotificationQueue = new Queue({
  name: 'chat_notification',
  processor
})

export default ChatNotificationQueue
