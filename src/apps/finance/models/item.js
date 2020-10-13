import Model from '../../../core/objects/model'
import User from '../../maha/models/user'
import Account from  './account'
import ExpenseType from  './expense_type'
import Project from  './project'
import Vendor from  './vendor'

const Item = new Model({

  tableName: 'finance_items',

  virtuals: {

    object_owner_id: function() {
      return this.get('user_id')
    },

    object_text: function() {
      return this.get('description')
    },

    object_type: function() {
      return this.get('type')
    },

    object_url: function() {
      return `/finance/${this.get('type')}s/${this.get('item_id')}`
    },

    object_table: function() {
      return `finance_${this.get('type')}s`
    },

    object_id: function() {
      return this.get('item_id')
    }

  },

  account() {
    return this.belongsTo(Account, 'account_id')
  },

  expense_type() {
    return this.belongsTo(ExpenseType, 'expense_type_id')
  },

  listener_ids(trx) {
    return User.query(qb => {
      qb.select('maha_users.id')
      qb.joinRaw('left join maha_comments on maha_comments.user_id=maha_users.id and maha_comments.commentable_type=? and maha_comments.commentable_id=?', [`finance_${this.get('type')}s`, this.get('item_id')])
      qb.joinRaw('left join maha_audits on maha_audits.user_id=maha_users.id and maha_audits.auditable_type=? and maha_audits.auditable_id=?', [`finance_${this.get('type')}s`, this.get('item_id')])
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

  tax_project() {
    return this.belongsTo(Project, 'tax_project_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  },

  vendor() {
    return this.belongsTo(Vendor, 'vendor_id')
  }

})

export default Item
