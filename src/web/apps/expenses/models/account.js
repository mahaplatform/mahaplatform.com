import Model from '../../../core/objects/model'
import Expense from './expense'

const Account = new Model({

  tableName: 'expenses_accounts',

  expenses() {
    return this.hasMany(Expense, 'account_id')
  }

})

export default Account
