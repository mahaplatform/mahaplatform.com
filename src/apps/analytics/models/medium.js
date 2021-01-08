import Model from '@core/objects/model'

const Medium = new Model({

  databaseName: 'analytics',

  tableName: 'mediums',

  hasTimestamps: false,

  rules: {},

  virtuals: {}

})

export default Medium
