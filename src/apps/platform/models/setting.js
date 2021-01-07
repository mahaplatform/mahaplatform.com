import Model from '@core/objects/model'

const Setting = new Model({

  databaseName: 'maha',

  belongsToTeam: false,

  hasTimestamps: false,

  tableName: 'platform_settings',

  rules: {},

  virtuals: {}

})

export default Setting
