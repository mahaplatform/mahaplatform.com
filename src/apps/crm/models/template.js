import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Program from './program'

const Template = new Model(knex, {

  databaseName: 'maha',

  tableName: 'crm_templates',

  rules: {

  },

  virtuals: {

    object_text: function() {
      return this.get('title')
    },

    object_type: function() {
      return 'template'
    },

    object_url: function() {
      return `/crm/programs/${this.get('program_id')}/templates/${this.get('id')}`
    },

    preview() {
      return this.get('screenshoted_at') ? `screenshots/template-${this.get('id')}-${this.get('screenshoted_at').getTime()}.jpg` : null
    }

  },

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default Template
