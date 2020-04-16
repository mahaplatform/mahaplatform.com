import Model from '../../../core/objects/model'
import Program from './program'

const Template = new Model({

  tableName: 'crm_templates',

  rules: {},

  virtuals: {

    object_text: function() {
      return this.get('title')
    },

    object_type: function() {
      return 'template'
    },

    object_url: function() {
      return `/admin/crm/programs/${this.get('program_id')}/templates/${this.get('id')}`
    },

    preview() {
      return `screenshots/template-${this.get('id')}-${this.get('updated_at').getTime()}.jpg`
    }

  },

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default Template
