import Model from '../../../web/core/objects/model'
import User from '../../maha/models/user'
import Channel from './channel'
import Message from './message'

const Subscription = new Model({

  tableName: 'chat_subscriptions',

  rules: {
    channel_id: ['required'],
    user_id: ['required']
  },

  channel() {
    return this.belongsTo(Channel, 'channel_id')
  },

  last_message() {
    return this.belongsTo(Message, 'last_message_id').query(qb => {
      qb.where({ message_type_id: 2 })
    })
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Subscription
