import { parsePhoneNumberFromString } from 'libphonenumber-js'
import Model from '../../../core/objects/model'
import MailingAddress from './mailing_address'
import Asset from '../../maha/models/asset'
import EmailAddress from './email_address'
import Organization from './organization'
import PhoneNumber from './phone_number'
import Email from './contact_email'
import Activity from './activity'
import Call from './contact_call'
import Note from './contact_note'
import Topic from './topic'
import List from './list'
import Tag from './tag'

const Contact = new Model({

  tableName: 'crm_contacts',

  rules: {},

  virtuals: {

    full_name: function() {
      const parts = []
      if(this.get('first_name')) parts.push(this.get('first_name'))
      if(this.get('last_name')) parts.push(this.get('last_name'))
      return parts.length > 0 ? parts.join(' ') : null
    },

    rfc822: function() {
      return this.get('full_name') ? `${this.get('full_name')} <${this.get('email')}>` : this.get('email')
    },

    first_initial: function() {
      return this.get('first_name') ? this.get('first_name')[0].toLowerCase() : ''
    },

    last_initial: function() {
      return this.get('last_name') ? this.get('last_name')[0].toLowerCase() : ''
    },

    initials: function() {
      return this.get('first_initial') + this.get('last_initial')
    },

    display_name: function() {
      return this.get('full_name') ? this.get('full_name') : 'Unknown'
    },

    phone_name: function() {
      if(!this.get('phone')) return null
      const phoneNumber = parsePhoneNumberFromString(this.get('phone'), 'US')
      const phone = phoneNumber.formatNational()
      return this.get('full_name') ? `${this.get('full_name')} - ${phone}` : phone
    },

    organization_ids: function() {
      return this.related('organizations').map(organization => organization.id)
    },

    tag_ids: function() {
      return this.related('tags').map(tag => tag.id)
    },

    topic_ids: function() {
      return this.related('topics').map(topic => topic.id)
    },

    list_ids: function() {
      return this.related('lists').map(list => list.id)
    }

  },

  activities() {
    return this.hasMany(Activity, 'contact_id').query(qb => {
      qb.orderBy('created_at', 'desc')
    })
  },

  calls() {
    return this.hasMany(Call, 'contact_id')
  },


  emails() {
    return this.hasMany(Email, 'contact_id')
  },

  email_addresses() {
    return this.hasMany(EmailAddress, 'contact_id').query(qb => {
      qb.orderBy('is_primary', 'desc')
    })
  },

  lists() {
    return this.belongsToMany(List, 'crm_subscriptions', 'contact_id', 'list_id')
  },

  mailing_addresses() {
    return this.hasMany(MailingAddress, 'contact_id').query(qb => {
      qb.orderBy('is_primary', 'desc')
    })
  },

  notes() {
    return this.hasMany(Note, 'contact_id')
  },

  organizations() {
    return this.belongsToMany(Organization, 'crm_contacts_organizations', 'contact_id', 'organization_id')
  },

  phone_numbers() {
    return this.hasMany(PhoneNumber, 'contact_id').query(qb => {
      qb.orderBy('is_primary', 'desc')
    })
  },

  photo() {
    return this.belongsTo(Asset, 'photo_id')
  },

  tags() {
    return this.belongsToMany(Tag, 'crm_taggings', 'contact_id', 'tag_id')
  },

  topics() {
    return this.belongsToMany(Topic, 'crm_interests', 'contact_id', 'topic_id')
  }

})

export default Contact
