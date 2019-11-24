import Model from '../../../core/objects/model'
import Payment from './payment'

const Refund = new Model({

  tableName: 'finance_refunds',

  rules: {},

  virtuals: {},

  payment() {
    return this.belongsTo(Payment, 'payment_id')
  }

})

export default Refund
