import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Message from './message'

const MessageType = new Model(knex, {

  databaseName: 'maha',

  tableName: 'chat_message_types',

  messages() {
    return this.hasMany(Message, 'message_type_id')
  }

})

export default MessageType
