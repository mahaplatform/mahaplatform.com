import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import User from '@apps/maha/models/user'
import Message from './message'
import Subscription from './subscription'

const Channel = new Model(knex, {

  databaseName: 'maha',

  tableName: 'chat_channels',

  rules: {

  },

  virtuals: {

    object_owner_id: function() {
      return this.get('owner_id')
    },

    object_text: function() {
      return null
    },

    object_type: function() {
      return 'channel'
    },

    object_url: function() {
      return `/chat/channels/${this.get('id')}`
    }

  },

  messages() {
    return this.hasMany(Message, 'channel_id')
  },

  last_message() {
    return this.belongsTo(Message, 'last_message_id')
  },

  owner() {
    return this.belongsTo(User, 'owner_id')
  },

  subscriptions() {
    return this.hasMany(Subscription, 'channel_id')
  }

})

export default Channel
