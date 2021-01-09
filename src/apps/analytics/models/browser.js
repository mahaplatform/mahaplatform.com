import Model from '@core/objects/model'

const Browser = new Model({

  databaseName: 'analytics',

  tableName: 'browsers',

  hasTimestamps: false,

  rules: {},

  virtuals: {}

})

export default Browser
