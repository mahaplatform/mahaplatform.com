import Model from '@core/objects/model'

const Campaign = new Model({

  databaseName: 'analytics',

  tableName: 'campaigns',

  hasTimestamps: false,

  rules: {},

  virtuals: {}

})

export default Campaign
