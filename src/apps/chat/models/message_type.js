import { Model } from 'maha'
import Message from './message'

const MessageType = new Model({

  tableName: 'chat_message_types',

  messages() {
    return this.hasMany(Message, 'message_type_id')
  }

})

export default MessageType
