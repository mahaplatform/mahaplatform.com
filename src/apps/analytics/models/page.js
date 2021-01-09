import Model from '@core/objects/model'
import Domain from './domain'
import Event from './event'

const Page = new Model({

  databaseName: 'analytics',

  tableName: 'pages',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  domain() {
    return this.belongsTo(Domain, 'domain_id')
  },

  events() {
    return this.hasMany(Event, 'page_id')
  }

})

export default Page
