import DeviceValue from './device_value'
import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Session from './session'

const Device = new Model(knex, {

  databaseName: 'maha',

  tableName: 'maha_devices',

  belongsToTeam: false,

  virtuals: {

    push_enabled: function() {
      return this.get('push_token') !== null
    }

  },

  browser_name() {
    return this.belongsTo(DeviceValue, 'browser_name_id')
  },

  browser_version() {
    return this.belongsTo(DeviceValue, 'browser_version_id')
  },

  device_type() {
    return this.belongsTo(DeviceValue, 'device_type_id')
  },

  display_name() {
    return this.belongsTo(DeviceValue, 'display_name_id')
  },

  os_name() {
    return this.belongsTo(DeviceValue, 'os_name_id')
  },

  os_version() {
    return this.belongsTo(DeviceValue, 'os_version_id')
  },

  platform_type() {
    return this.belongsTo(DeviceValue, 'platform_type_id')
  },

  sessions() {
    return this.hasMany(Session, 'device_id')
  }

})

export default Device
