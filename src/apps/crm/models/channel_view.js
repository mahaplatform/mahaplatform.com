import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'

const ChannelView = new Model(knex, {

  databaseName: 'maha',

  tableName: 'crm_channel_views',

  rules: {},

  virtuals: {}

})

export default ChannelView
