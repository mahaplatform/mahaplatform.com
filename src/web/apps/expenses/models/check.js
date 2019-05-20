import Model from '../../../core/objects/model'
import User from '../../maha/models/user'
import ExpenseType from './expense_type'
import Project from './project'
import Receipt from  './receipt'
import Status from  './status'
import Vendor from './vendor'

const Check = new Model({

  tableName: 'expenses_checks',

  rules: {
    date_needed: ['required', 'datestring'],
    description: ['required']
  },

  virtuals: {

    approver_ids: function() {
      if(!this.get('project_id')) return []
      return this.related('project').related('members').filter(member => {
        return member.get('member_type_id') !== 3
      }).map(member => {
        return member.get('user_id')
      })
    },

    object_owner_id: function() {
      return this.get('user_id')
    },

    object_text: function() {
      return this.get('description')
    },

    object_type: function() {
      return 'check'
    },

    object_url: function() {
      return `/admin/expenses/checks/${this.get('id')}`
    },

    receipt_ids: function() {
      return this.related('receipts').map(receipt => receipt.id)
    }

  },

  expense_type() {
    return this.belongsTo(ExpenseType, 'expense_type_id')
  },

  project() {
    return this.belongsTo(Project, 'project_id')
  },

  receipts() {
    return this.hasMany(Receipt, 'check_id')
  },

  status() {
    return this.belongsTo(Status, 'status_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  },

  vendor() {
    return this.belongsTo(Vendor, 'vendor_id')
  }

})

export default Check
