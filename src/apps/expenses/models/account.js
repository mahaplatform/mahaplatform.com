import Model from '../../../web/core/objects/model'
import Expense from './expense'

const Account = new Model({

  tableName: 'expenses_accounts',

  virtuals: {

    object_text: function() {
      return this.get('name')
    },

    object_type: function() {
      return 'account'
    },

    object_url: function() {
      return `/admin/expenses/accounts/${this.get('id')}`
    }

  },

  expenses() {
    return this.hasMany(Expense, 'account_id')
  }

})

export default Account
