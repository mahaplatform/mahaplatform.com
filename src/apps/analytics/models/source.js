import Model from '@core/objects/model'

const Source = new Model({

  databaseName: 'analytics',

  tableName: 'sources',

  hasTimestamps: false,

  rules: {},

  virtuals: {}

})

export default Source
