import Model from '../../../web/core/objects/model'
import Advance from './advance'
import Expense from './expense'

const Vendor = new Model({

  tableName: 'expenses_vendors',

  rules: {
    name: ['required', 'unique']
  },

  virtuals: {

    full_address: function() {
      if(!this.get('address_1')) return null
      const address_1 = this.get('address_1') + ' ' || ''
      const address_2 = this.get('address_2') || ''
      const city = ', ' + this.get('city') + ', ' || ''
      const state = this.get('state') + ' ' || ''
      const zip = this.get('zip') || ''
      return address_1 + address_2 + city + state + zip
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
