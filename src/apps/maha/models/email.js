import EmailCampaign from '../../crm/models/email_campaign'
import Contact from '../../crm/models/contact'
import EmailActivity from './email_activity'
import Model from '../../../core/objects/model'
import User from './user'

const Email = new Model({

  tableName: 'maha_emails',

  virtuals: {

    object_text: function() {
      return this.get('subject')
    },

    object_type: function() {
      return 'email'
    },

    object_url: function() {
      return `/admin/team/emails/${this.get('id')}`
    }

  },

  activities() {
    return this.hasMany(EmailActivity, 'email_id').query(qb => {
      qb.orderBy('created_at','asc')
    })
  },

  contact() {
    return this.belongsTo(Contact, 'contact_id')
  },

  email_campaign() {
    return this.belongsTo(EmailCampaign, 'email_campaign_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Email
