import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Alias from './alias'

const Page = new Model(knex, {

  databaseName: 'maha',

  tableName: 'websites_pages',

  rules: {},

  virtuals: {},

  aliases() {
    return this.hasMany(Alias, 'page_id')
  }

})

export default Page
