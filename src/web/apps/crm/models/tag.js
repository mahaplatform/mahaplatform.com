import Model from '../../../core/objects/model'
import Organization from './organization'
import Contact from './contact'

const Tag = new Model({

  tableName: 'crm_tags',

  rules: {},

  virtuals: {},

  contacts() {
    this.belongsToMany(Contact, 'crm_taggings', 'tag_id', 'contact_id')
  },

  organizations() {
    this.belongsToMany(Organization, 'crm_taggings', 'tag_id', 'organization_id')
  }

})

export default Tag
