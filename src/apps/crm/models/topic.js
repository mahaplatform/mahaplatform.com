import Model from '../../../core/objects/model'
import Workflow from './workflow'
import Program from './program'

const Topic = new Model({

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
      return `/admin/crm/programs/${this.get('program_id')}/topics/${this.get('id')}`
    }

  },

  program() {
    return this.belongsTo(Program, 'program_id')
  },

  subscribe_workflow() {
    return this.hasOne(Workflow, 'topic_id').query(qb => {
      qb.where('action', 'add')
    })
  },

  unsubscribe_workflow() {
    return this.hasOne(Workflow, 'topic_id').query(qb => {
      qb.where('action', 'remove')
    })
  }

})

export default Topic
