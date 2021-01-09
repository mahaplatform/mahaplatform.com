import Model from '@core/objects/model'
import Domain from './domain'
import Event from './event'

const Referer = new Model({

  databaseName: 'analytics',

  tableName: 'referers',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  domain() {
    return this.belongsTo(Domain, 'domain_id')
  },

  events() {
    return this.hasMany(Event, 'referer_id')
  }

})

export default Referer
