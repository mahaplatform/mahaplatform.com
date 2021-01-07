import Model from '@core/objects/model'
import User from '@apps/maha/models/user'
import ExpenseType from  './expense_type'
import Project from  './project'
import Receipt from  './receipt'
import Vendor from  './vendor'

const Reimbursement = new Model({

  databaseName: 'maha',

  tableName: 'finance_reimbursements',

  rules: {
    date: ['required', 'datestring']
  },

  virtuals: {

    approver_ids: function() {
      if(!this.get('project_id')) return []
      return this.related('project').related('members').filter(member => {
        return member.get('type') !== 'member'
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
      return 'reimbursement'
    },

    object_url: function() {
      return `/finance/reimbursements/${this.get('id')}`
    },

    receipt_ids: function() {
      return this.related('receipts').map(receipt => receipt.get('asset_id'))
    }

  },

  allocations() {
    return this.hasMany(Reimbursement, 'code', 'code').query(qb => {
      qb.whereNotNull('amount')
      qb.whereNull('deleted_at')
      qb.orderBy('delta', 'asc')
    })
  },

  expense_type() {
    return this.belongsTo(ExpenseType, 'expense_type_id')
  },

  listener_ids(trx) {
    return User.query(qb => {
      qb.select('maha_users.id')
      qb.joinRaw('left join maha_comments on maha_comments.user_id=maha_users.id and maha_comments.commentable_type=? and maha_comments.commentable_id=?', ['finance_reimbursements', this.get('id')])
      qb.joinRaw('left join maha_audits on maha_audits.user_id=maha_users.id and maha_audits.auditable_type=? and maha_audits.auditable_id=?', ['finance_reimbursements', this.get('id')])
      qb.joinRaw('left join finance_members on finance_members.user_id=maha_users.id and finance_members.project_id = ? and finance_members.type = ?', [this.get('project_id'), 'owner'])
      qb.whereRaw('maha_comments.id is not null or maha_audits.id is not null or finance_members.id is not null')
      qb.groupBy('maha_users.id')
    }).fetchAll({
      transacting: trx
    }).then(users => users.map(user => user.get('id')))
  },

  project() {
    return this.belongsTo(Project, 'project_id')
  },

  receipts() {
    return this.hasMany(Receipt, 'reimbursement_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  },

  vendor() {
    return this.belongsTo(Vendor, 'vendor_id')
  }

})

export default Reimbursement
