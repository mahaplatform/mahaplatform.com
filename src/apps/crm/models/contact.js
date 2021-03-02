import { parsePhoneNumberFromString } from 'libphonenumber-js'
import Registration from '@apps/events/models/registration'
import ImportItem from '@apps/maha/models/import_item'
import Response from '@apps/forms/models/response'
import MahaEmail from '@apps/maha/models/email'
import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import MailingAddress from './mailing_address'
import Asset from '@apps/maha/models/asset'
import EmailAddress from './email_address'
import PhoneNumber from './phone_number'
import Email from './contact_email'
import Activity from './activity'
import Call from './contact_call'
import Note from './contact_note'
import Topic from './topic'
import List from './list'

const Contact = new Model(knex, {

  databaseName: 'maha',

  tableName: 'crm_contacts',

  rules: {},

  virtuals: {

    object_text: function() {
      return this.get('display_name')
    },

    object_type: function() {
      return 'contact'
    },

    object_url: function() {
      return `/crm/contacts/${this.get('id')}`
    },

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

    topic_ids: function() {
      return this.related('topics').map(topic => topic.id)
    },

    url() {
      return `${process.env.WEB_HOST}/admin/crm/contacts/${this.get('id')}`
    },

    list_ids: function() {
      return this.related('lists').map(list => list.id)
    },

    fulladdress() {
      const address = this.related('address')
      if(!address) return null
      return [
        ...address.get('street_1') ? [address.get('street_1')] : [],
        ...address.get('street_2') ? [address.get('street_2')] : [],
        [
          ...address.get('city') ? [address.get('city')] : [],
          ...address.get('state_province') ? [address.get('state_province')] : []
        ].join(' '),
        ...address.get('postal_code') ? [address.get('postal_code')] : []
      ].join(', ')
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
      qb.whereNull('deleted_at')
      qb.orderBy('is_primary', 'desc')
    })
  },

  import_items() {
    return this.hasMany(ImportItem, 'object_id').query(qb => {
      qb.joinRaw('inner join maha_imports on maha_imports.id=maha_import_items.import_id and maha_imports.object_type=?', 'crm_contacts')
    })
  },

  lists() {
    return this.belongsToMany(List, 'crm_subscriptions', 'contact_id', 'list_id')
  },

  maha_emails() {
    return this.hasMany(MahaEmail, 'contact_id')
  },

  mailing_addresses() {
    return this.hasMany(MailingAddress, 'contact_id').query(qb => {
      qb.whereNull('deleted_at')
      qb.orderBy('is_primary', 'desc')
    })
  },

  notes() {
    return this.hasMany(Note, 'contact_id')
  },

  phone_numbers() {
    return this.hasMany(PhoneNumber, 'contact_id').query(qb => {
      qb.whereNull('deleted_at')
      qb.orderBy('is_primary', 'desc')
    })
  },

  photo() {
    return this.belongsTo(Asset, 'photo_id')
  },

  registrations() {
    return this.hasMany(Registration, 'contact_id')
  },

  responses() {
    return this.hasMany(Response, 'contact_id')
  },

  topics() {
    return this.belongsToMany(Topic, 'crm_interests', 'contact_id', 'topic_id')
  }

})

export default Contact
