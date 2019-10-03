import Model from '../../../core/objects/model'
import User from '../../maha/models/user'
import Item from './item'
import Advance from './advance'
import Check from './check'
import Expense from './expense'
import Reimbursement from './reimbursement'
import Trip from './trip'

const Batch = new Model({

  tableName: 'expenses_batches',

  advances() {
    return this.hasMany(Advance, 'batch_id')
  },

  checks() {
    return this.hasMany(Check, 'batch_id')
  },

  expenses() {
    return this.hasMany(Expense, 'batch_id')
  },

  items() {
    return this.hasMany(Item, 'batch_id')
  },

  reimbursements() {
    return this.hasMany(Reimbursement, 'batch_id')
  },

  trips() {
    return this.hasMany(Trip, 'batch_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Batch
