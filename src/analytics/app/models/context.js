import Model from '@core/objects/model'

const Context = new Model({

  databaseName: 'analytics',

  tableName: 'contexts',

  hasTimestamps: false,

  rules: {},

  virtuals: {}

})

export default Context
