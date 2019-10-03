import Model from '../../../web/core/objects/model'
import Channel from './channel'
import Message from './message'

const Result = new Model({

  tableName: 'chat_results',

  channel() {
    return this.belongsTo(Channel, 'channel_id')
  },

  message() {
    return this.belongsTo(Message, 'message_id')
  }

})

export default Result
