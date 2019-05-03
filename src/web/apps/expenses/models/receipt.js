import Model from '../../../core/objects/model'
import Asset from '../../maha/models/asset'
import Expense from  './expense'

const Receipt = new Model({

  tableName: 'expenses_receipts',

  asset() {
    return this.belongsTo(Asset, 'asset_id')
  },

  expense() {
    return this.belongsTo(Expense, 'expense_id')
  }

})

export default Receipt
