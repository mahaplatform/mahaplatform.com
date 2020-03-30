import Model from '../../../core/objects/model'
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
  }

})

export default Topic
