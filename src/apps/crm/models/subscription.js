import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Contact from './contact'
import List from './list'

const Subscription = new Model(knex, {

  databaseName: 'maha',

  tableName: 'crm_subscriptions',

  rules: {},

  virtuals: {},

  contact() {
    return this.belongsTo(Contact, 'contact_id')
  },

  list() {
    return this.belongsTo(List, 'list_id')
  }

})

export default Subscription
