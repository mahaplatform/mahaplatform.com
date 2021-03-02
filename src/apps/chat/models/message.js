import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Attachment from '@apps/maha/models/attachment'
import Link from '@apps/maha/models/link'
import User from '@apps/maha/models/user'
import Channel from './channel'
import MessageType from './message_type'

const Message = new Model(knex, {

  databaseName: 'maha',

  tableName: 'chat_messages',

  rules: {},

  attachments() {
    return this.morphMany(Attachment, 'attachable')
  },

  channel() {
    return this.belongsTo(Channel, 'channel_id')
  },

  link() {
    return this.belongsTo(Link, 'link_id')
  },

  message_type() {
    return this.belongsTo(MessageType, 'message_type_id')
  },

  quoted_message() {
    return this.belongsTo(Message, 'quoted_message_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Message
