import Model from '@core/objects/model'
import Invoice from './invoice'

const Undeposited = new Model({

  databaseName: 'maha',

  tableName: 'finance_undeposited',

  rules: {},

  virtuals: {},

  invoice() {
    return this.belongsTo(Invoice, 'invoice_id')
  }

})

export default Undeposited
