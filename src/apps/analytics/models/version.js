import Model from '@core/objects/model'

const Version = new Model({

  databaseName: 'analytics',

  tableName: 'versions',

  hasTimestamps: false,

  rules: {},

  virtuals: {}

})

export default Version
