import Model from '../../../core/objects/model'
import User from '../../maha/models/user'
import ExpenseType from './expense_type'
import Project from './project'

const Advances = new Model({

  tableName: 'finance_advances',

  rules: {
    date_needed: ['required', 'datestring'],
    description: ['required']
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
      return 'advance'
    },

    object_url: function() {
      return `/finance/advances/${this.get('id')}`
    }

  },

  expense_type() {
    return this.belongsTo(ExpenseType, 'expense_type_id')
  },

  listener_ids(trx) {
    return User.query(qb => {
      qb.select('maha_users.id')
      qb.joinRaw('left join maha_comments on maha_comments.user_id=maha_users.id and maha_comments.commentable_type=? and maha_comments.commentable_id=?', ['finance_advances', this.get('id')])
      qb.joinRaw('left join maha_audits on maha_audits.user_id=maha_users.id and maha_audits.auditable_type=? and maha_audits.auditable_id=?', ['finance_advances', this.get('id')])
      qb.joinRaw('left join finance_members on finance_members.user_id=maha_users.id and finance_members.project_id = ? and finance_members.member = ?', [this.get('project_id'), 'owner'])
      qb.whereRaw('maha_comments.id is not null or maha_audits.id is not null or finance_members.id is not null')
      qb.groupBy('maha_users.id')
    }).fetchAll({
      transacting: trx
    }).then(users => users.map(user => user.get('id')))
  },

  project() {
    return this.belongsTo(Project, 'project_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Advances
