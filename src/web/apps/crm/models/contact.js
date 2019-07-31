import Model from '../../../core/objects/model'
import Asset from '../../maha/models/asset'
import Organization from './organization'
import Tag from './tag'

const Contact = new Model({

  tableName: 'crm_contacts',

  rules: {},

  virtuals: {

    full_name: function() {
      const parts = []
      if(this.get('first_name')) parts.push(this.get('first_name'))
      if(this.get('last_name')) parts.push(this.get('last_name'))
      return parts.join(' ')
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
    }

  },

  organizations() {
    return this.belongsToMany(Organization, 'crm_contacts_organizations', 'contact_id', 'organization_id')
  },

  photo() {
    return this.belongsTo(Asset, 'photo_id')
  },

  tags() {
    return this.belongsToMany(Tag, 'crm_taggings', 'contact_id', 'tag_id')
  }

})

export default Contact
