import Model from '../../../core/objects/model'
import LineItem from './line_item'
import Payment from './payment'
import Batch from './batch'

const Allocation = new Model({

  tableName: 'finance_allocations',

  rules: {},

  virtuals: {},

  batch() {
    return this.belongsTo(Batch, 'batch_id')
  },

  line_item() {
    return this.belongsTo(LineItem, 'line_item_id')
  },

  payment() {
    return this.belongsTo(Payment, 'payment_id')
  }

})

export default Allocation
