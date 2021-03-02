import Model from '@core/analytics/objects/model'

const Useragent = new Model({

  databaseName: 'analytics',

  tableName: 'useragents',

  hasTimestamps: false,

  rules: {},

  virtuals: {}

})

export default Useragent
