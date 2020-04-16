import Model from '../../../core/objects/model'
import Program from './program'

const Template = new Model({

  tableName: 'crm_templates',

  rules: {},

  virtuals: {

    preview() {
      return `screenshots/template-${this.get('id')}-${this.get('updated_at').getTime()}.jpg`
    }

  },

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default Template
