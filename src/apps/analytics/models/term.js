import Model from '@core/objects/model'

const Term = new Model({

  databaseName: 'analytics',

  tableName: 'terms',

  hasTimestamps: false,

  rules: {},

  virtuals: {}

})

export default Term
