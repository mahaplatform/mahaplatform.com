import Model from '../../../core/objects/model'
import Contact from '../../crm/models/contact'
import Payment from './payment'

const Scholarship = new Model({

  tableName: 'finance_scholarships',

  rules: {},

  virtuals: {},

  contact() {
    this.belongsTo(Contact, 'contact_id')
  },

  payments() {
    this.hasMany(Payment, 'scholarship_id')
  }

})

export default Scholarship
