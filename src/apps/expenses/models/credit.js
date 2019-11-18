import Model from '../../../core/objects/model'
import Contact from '../../crm/models/contact'
import Payment from './payment'

const Credit = new Model({

  tableName: 'expenses_credits',

  rules: {},

  virtuals: {},

  contact() {
    this.belongsTo(Contact, 'contact_id')
  },

  payments() {
    this.hasMany(Payment, 'credit_id')
  }

})

export default Credit
