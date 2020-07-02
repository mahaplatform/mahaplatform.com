import Model from '../../../core/objects/model'
import LineItem from './line_item'
import Payment from './payment'

const Allocation = new Model({

  tableName: 'finance_allocations',

  rules: {},

  virtuals: {},

  line_item() {
    return this.belongsTo(LineItem, 'line_item_id')
  },

  payment() {
    return this.belongsTo(Payment, 'payment_id')
  }

})

export default Allocation
