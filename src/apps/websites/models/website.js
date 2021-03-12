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

  home() {
    return this.hasOne(Page, 'home_id')
  },

  notfound() {
    return this.hasOne(Page, 'notfound_id')
  },

  pages() {
    return this.hasMany(Page, 'page_id')
  },

  primary_domain() {
    return this.hasOne(Domain, 'website_id').query(qb => {
      qb.where('is_primary', true)
    })

  }

})

export default Website
