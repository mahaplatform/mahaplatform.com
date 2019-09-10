import Model from '../../../core/objects/model'
import MailingAddress from './mailing_address'
import Asset from '../../maha/models/asset'
import EmailAddress from './email_address'
import Organization from './organization'
import PhoneNumber from './phone_number'
import Activity from './activity'
import Call from './call'
import Note from './note'
import Tag from './tag'

const Contact = new Model({

  tableName: 'crm_contacts',

  rules: {
    'email': ['required']
  },

  virtuals: {

    full_name: function() {
      const parts = []
      if(this.get('first_name')) parts.push(this.get('first_name'))
      if(this.get('last_name')) parts.push(this.get('last_name'))
      return parts.length > 1 ? parts.join(' ') : null
    },

    rfc822: function() {
      return `${this.get('full_name')} <${this.get('email')}>`
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
      return this.get('full_name') ?this.get('full_name') : 'Unknown'
    },

    organization_ids: function() {
      return this.related('organizations').map(organization => organization.id)
    },

    tag_ids: function() {
      return this.related('tags').map(tag => tag.id)
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

  email_addresses() {
    return this.hasMany(EmailAddress, 'contact_id').query(qb => {
      qb.orderBy('is_primary', 'desc')
    })
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
  }

})

export default Contact
