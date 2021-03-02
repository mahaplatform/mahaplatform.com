import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'

const DeviceValue = new Model(knex, {

  databaseName: 'maha',

  tableName: 'maha_device_values',

  belongsToTeam: false,

  hasTimestamps: false

})

export default DeviceValue
