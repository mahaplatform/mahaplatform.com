import Model from '../../../core/objects/model'
import Contact from '../../crm/models/contact'
import Payment from './payment'

const Credit = new Model({

  tableName: 'finance_credits',

  rules: {},

  virtuals: {},

  contact() {
    return this.belongsTo(Contact, 'contact_id')
  },

  payments() {
    return this.hasMany(Payment, 'credit_id')
  }

})

export default Credit
