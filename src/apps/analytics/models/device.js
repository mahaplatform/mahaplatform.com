import Model from '@core/objects/model'

const Device = new Model({

  databaseName: 'analytics',

  tableName: 'devices',

  hasTimestamps: false,

  rules: {},

  virtuals: {}

})

export default Device
