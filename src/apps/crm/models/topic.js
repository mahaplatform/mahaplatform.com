import Workflow from '@apps/automation/models/workflow'
import Model from '@core/objects/model'
import Program from './program'
import Contact from './contact'

const Topic = new Model({

  databaseName: 'maha',

  tableName: 'crm_topics',

  rules: {},

  virtuals: {

    object_text: function() {
      return this.get('title')
    },

    object_type: function() {
      return 'topic'
    },

    object_url: function() {
      return `/crm/programs/${this.get('program_id')}/topics/${this.get('id')}`
    }

  },

  contacts() {
    return this.belongsToMany(Contact, 'crm_subscriptions', 'list_id', 'contact_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  },

  workflows() {
    return this.hasMany(Workflow, 'email_campaign_id')
  }

})

export default Topic
