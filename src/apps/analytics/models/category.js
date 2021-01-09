import Model from '@core/objects/model'
import Event from './event'

const Category = new Model({

  databaseName: 'analytics',

  tableName: 'categories',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  events() {
    return this.hasMany(Event, 'page_id')
  }

})

export default Category
