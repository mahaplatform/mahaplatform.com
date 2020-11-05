import Model from '@core/objects/model'
import Expense from './expense'

const Account = new Model({

  tableName: 'finance_accounts',

  virtuals: {

    object_text: function() {
      return this.get('name')
    },

    object_type: function() {
      return 'account'
    },

    object_url: function() {
      return `/finance/accounts/${this.get('id')}`
    }

  },

  expenses() {
    return this.hasMany(Expense, 'account_id')
  }

})

export default Account
