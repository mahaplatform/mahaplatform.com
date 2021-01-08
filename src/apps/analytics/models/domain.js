import Model from '@core/objects/model'

const Domain = new Model({

  databaseName: 'analytics',

  tableName: 'domains',

  hasTimestamps: false,

  rules: {},

  virtuals: {}

})

export default Domain
