import Model from '../../../core/objects/model'
import User from '../../maha/models/user'
import ExpenseType from  './expense_type'
import Project from  './project'
import Status from  './status'

const Trip = new Model({

  tableName: 'expenses_trips',

  rules: {
    date: ['required','datestring'],
    description: ['required'],
    time_leaving: ['time'],
    time_arriving: ['time','laterThan:time_leaving'],
    odometer_start: ['numeric'],
    odometer_end: ['numeric','greaterThanField:odometer_start']
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
      return 'trip'
    },

    object_url: function() {
      return `/admin/expenses/trips/${this.get('id')}`
    }

  },

  expense_type() {
    return this.belongsTo(ExpenseType, 'expense_type_id')
  },

  listener_ids(trx) {
    return User.query(qb => {
      qb.select('maha_users.id')
      qb.joinRaw('left join maha_comments on maha_comments.user_id=maha_users.id and maha_comments.commentable_type=? and maha_comments.commentable_id=?', ['expenses_trips', this.get('id')])
      qb.joinRaw('left join maha_audits on maha_audits.user_id=maha_users.id and maha_audits.auditable_type=? and maha_audits.auditable_id=?', ['expenses_trips', this.get('id')])
      qb.joinRaw('left join expenses_members on expenses_members.user_id=maha_users.id and expenses_members.project_id = ? and expenses_members.member_type_id = ?', [this.get('project_id'), 1])
      qb.whereRaw('maha_comments.id is not null or maha_audits.id is not null or expenses_members.id is not null')
      qb.groupBy('maha_users.id')
    }).fetchAll({
      transacting: trx
    }).then(users => users.map(user => user.get('id')))
  },

  project() {
    return this.belongsTo(Project, 'project_id')
  },

  status() {
    return this.belongsTo(Status, 'status_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Trip
