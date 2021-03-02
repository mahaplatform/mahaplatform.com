import Model from '@core/objects/model'
import Event from './event'

const Page = new Model({

  databaseName: 'analytics',

  tableName: 'pages',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  events() {
    return this.hasMany(Event, 'page_id')
  }

})

export default Page
