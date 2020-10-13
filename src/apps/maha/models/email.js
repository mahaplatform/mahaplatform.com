import EmailCampaign from '../../crm/models/email_campaign'
import EmailAddress from '../../crm/models/email_address'
import Model from '../../../core/objects/model'
import Contact from '../../crm/models/contact'
import CrmEmail from '../../crm/models/email'
import EmailActivity from './email_activity'
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
      return `/team/emails/${this.get('id')}`
    }

  },

  activities() {
    return this.hasMany(EmailActivity, 'email_id').query(qb => {
      qb.orderBy('created_at','asc')
    })
  },

  contact() {
    return this.belongsTo(Contact, 'contact_id').query(qb => {
      qb.select('crm_contacts.*','crm_contact_primaries.*')
      qb.innerJoin('crm_contact_primaries', 'crm_contact_primaries.contact_id', 'crm_contacts.id')
    })
  },

  email() {
    return this.belongsTo(CrmEmail, 'email_id')
  },

  email_address() {
    return this.belongsTo(EmailAddress, 'email_address_id')
  },

  email_campaign() {
    return this.belongsTo(EmailCampaign, 'email_campaign_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Email
