import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Page from './page'

const Alias = new Model(knex, {

  databaseName: 'maha',

  tableName: 'websites_aliases',

  rules: {},

  virtuals: {},

  page() {
    return this.belongsTo(Page, 'page_id')
  }

})

export default Alias
