import Model from '../core/objects/model'

const DeviceValue = new Model({

  tableName: 'maha_device_values',

  belongsToTeam: false,

  hasTimestamps: false

})

export default DeviceValue
