import Model from '@core/objects/model'
import LineItem from './line_item'
import Payment from './payment'
import Refund from './refund'

const Allocation = new Model({

  databaseName: 'maha',

  tableName: 'finance_allocations',

  rules: {},

  virtuals: {},

  line_item() {
    return this.belongsTo(LineItem, 'line_item_id').query(qb => {
      qb.select('finance_line_items.*','finance_invoice_line_items.*')
      qb.innerJoin('finance_invoice_line_items', 'finance_invoice_line_items.line_item_id','finance_line_items.id')
    })
  },

  payment() {
    return this.belongsTo(Payment, 'payment_id')
  },

  refund() {
    return this.belongsTo(Refund, 'refund_id')
  }

})

export default Allocation
