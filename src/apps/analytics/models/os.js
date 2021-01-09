import Model from '@core/objects/model'

const OS = new Model({

  databaseName: 'analytics',

  tableName: 'oses',

  hasTimestamps: false,

  rules: {},

  virtuals: {}

})

export default OS
