import Model from '../../../core/objects/model'
import Asset from '../../maha/models/asset'
import Contact from './contact'
import Tag from './tag'

const Organization = new Model({

  tableName: 'crm_organizations',

  rules: {},

  virtuals: {},

  contacts() {
    return this.belongsToMany(Contact, 'crm_contacts_organizations', 'organization_id', 'contact_id')
  },

  logo() {
    return this.belongsTo(Asset, 'logo_id')
  },

  tags() {
    return this.belongsToMany(Tag, 'crm_taggings', 'organization_id', 'tag_id')
  }

})

export default Organization
