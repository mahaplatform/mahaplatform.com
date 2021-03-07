import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Account from './account'
import Device from './device'

const Signin = new Model(knex, {

  databaseName: 'maha',

  tableName: 'maha_signins',

  belongsToTeam: false,

  rules: {},

  virtuals: {},

  account() {
    return this.belongsTo(Account, 'account_id')
  },

  device() {
    return this.belongsTo(Device, 'device_id')
  }

})

export default Signin
