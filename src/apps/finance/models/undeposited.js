import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Invoice from './invoice'

const Undeposited = new Model(knex, {

  databaseName: 'maha',

  tableName: 'finance_undeposited',

  rules: {},

  virtuals: {},

  invoice() {
    return this.belongsTo(Invoice, 'invoice_id')
  }

})

export default Undeposited
