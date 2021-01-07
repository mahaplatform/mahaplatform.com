import Model from '@core/objects/model'
import Contact from '@apps/crm/models/contact'
import Story from './story'
import User from './user'

const Audit = new Model({

  databaseName: 'maha',

  tableName: 'maha_audits',

  contact: function() {
    return this.belongsTo(Contact, 'contact_id')
  },

  story: function() {
    return this.belongsTo(Story, 'story_id')
  },

  user: function() {
    return this.belongsTo(User, 'user_id')
  }


})

export default Audit
