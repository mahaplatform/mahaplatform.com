import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Channel from './channel'
import Message from './message'

const Result = new Model(knex, {

  databaseName: 'maha',

  tableName: 'chat_results',

  channel() {
    return this.belongsTo(Channel, 'channel_id')
  },

  message() {
    return this.belongsTo(Message, 'message_id')
  }

})

export default Result
