import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Reimbursement from  './reimbursement'
import Asset from '@apps/maha/models/asset'
import Expense from  './expense'
import Check from  './check'

const Receipt = new Model(knex, {

  databaseName: 'maha',

  tableName: 'finance_receipts',

  asset() {
    return this.belongsTo(Asset, 'asset_id')
  },

  check() {
    return this.belongsTo(Check, 'check_id')
  },

  expense() {
    return this.belongsTo(Expense, 'expense_id')
  },

  reimbursement() {
    return this.belongsTo(Reimbursement, 'reimbursement_id')
  }

})

export default Receipt
