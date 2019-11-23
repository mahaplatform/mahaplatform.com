import Model from '../../../core/objects/model'
import Contact from '../../crm/models/contact'
import Payment from './payment'

const Refund = new Model({

  tableName: 'finance_refunds',

  rules: {},

  virtuals: {},

  contact() {
    return this.belongsTo(Contact, 'contact_id')
  },

  payment() {
    return this.belongsTo(Payment, 'payment_id')
  }

})

export default Refund
