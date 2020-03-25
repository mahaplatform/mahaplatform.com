import Model from '../../../core/objects/model'
import Advance from './advance'
import Expense from './expense'

const Vendor = new Model({

  tableName: 'finance_vendors',

  rules: {
    name: ['required', 'unique']
  },

  virtuals: {},

  advances() {
    return this.hasMany(Advance, 'vendor_id')
  },

  expenses() {
    return this.hasMany(Expense, 'vendor_id')
  }

})

export default Vendor
