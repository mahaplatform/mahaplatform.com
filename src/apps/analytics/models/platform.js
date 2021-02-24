import Model from '@core/objects/model'

const Platform = new Model({

  databaseName: 'analytics',

  tableName: 'platforms',

  hasTimestamps: false,

  rules: {},

  virtuals: {}

})

export default Platform
