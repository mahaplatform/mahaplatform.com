import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Device from './device'
import User from './user'

const Session = new Model(knex, {

  databaseName: 'maha',

  tableName: 'maha_sessions',

  device() {
    return this.belongsTo(Device, 'device_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Session
