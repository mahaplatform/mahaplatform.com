import Model from '../../../core/objects/model'
import Payment from './payment'

const Refund = new Model({

  tableName: 'expenses_refunds',

  rules: {},

  virtuals: {},

  payment() {
    return this.belongsTo(Payment, 'payment_id')
  }

})

export default Refund
