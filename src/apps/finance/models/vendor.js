import Model from '../../../core/objects/model'
import Advance from './advance'
import Expense from './expense'

const Vendor = new Model({

  tableName: 'finance_vendors',

  rules: {
    name: ['required', 'unique']
  },

  virtuals: {

    object_text: function() {
      return this.get('name')
    },

    object_type: function() {
      return 'vendor'
    },

    object_url: function() {
      return `/finance/vendors/${this.get('id')}`
    }

  },

  advances() {
    return this.hasMany(Advance, 'vendor_id')
  },

  expenses() {
    return this.hasMany(Expense, 'vendor_id')
  }

})

export default Vendor
