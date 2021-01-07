import Model from '@core/objects/model'
import Deposit from './deposit'
import Payment from './payment'
import Refund from './refund'

const DepositLineItem = new Model({

  databaseName: 'maha',

  tableName: 'finance_deposit_line_items',

  rules: {},

  virtuals: {

    type() {
      return this.get('payment_id') !== null ? 'payment' : 'refund'
    }

  },

  deposit() {
    return this.belongsTo(Deposit, 'deposit_id')
  },

  payment() {
    return this.belongsTo(Payment, 'payment_id').query(qb => {
      qb.select('finance_payments.*','finance_payment_details.*')
      qb.innerJoin('finance_payment_details','finance_payment_details.payment_id','finance_payments.id')
    })
  },

  refund() {
    return this.belongsTo(Refund, 'refund_id')
  }

})

export default DepositLineItem
