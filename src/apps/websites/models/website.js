import Asset from '@apps/maha/models/asset'
import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Domain from './domain'
import Page from './page'

const Website = new Model(knex, {

  databaseName: 'maha',

  tableName: 'websites_websites',

  rules: {},

  virtuals: {},

  domains() {
    return this.hasMany(Domain, 'website_id')
  },

  favicon() {
    return this.belongsTo(Asset, 'favicon_id')
  },

  pages() {
    return this.hasMany(Page, 'page_id')
  }

})

export default Website
