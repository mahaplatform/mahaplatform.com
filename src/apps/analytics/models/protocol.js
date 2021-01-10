import Model from '@core/objects/model'

const Protocol = new Model({

  databaseName: 'analytics',

  tableName: 'protocols',

  hasTimestamps: false,

  rules: {},

  virtuals: {}

})

export default Protocol
