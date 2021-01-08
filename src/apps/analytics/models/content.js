import Model from '@core/objects/model'

const Content = new Model({

  databaseName: 'analytics',

  tableName: 'contents',

  hasTimestamps: false,

  rules: {},

  virtuals: {}

})

export default Content
