import EmailCampaign from '@apps/campaigns/models/email_campaign'
import EmailAddress from '@apps/crm/models/email_address'
import CrmEmail from '@apps/automation/models/email'
import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Contact from '@apps/crm/models/contact'
import EmailActivity from './email_activity'
import User from './user'

const Email = new Model(knex, {

  databaseName: 'maha',

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
