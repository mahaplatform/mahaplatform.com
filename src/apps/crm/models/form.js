import Model from '../../../core/objects/model'
import Workflow from './workflow'
import Response from './response'
import Program from './program'
import Email from './email'
import moment from 'moment'

const Form = new Model({

  tableName: 'crm_forms',

  rules: {},

  virtuals: {

    object_text: function() {
      return this.get('title')
    },

    object_type: function() {
      return 'form'
    },

    object_url: function() {
      return `/admin/crm/forms/${this.get('id')}`
    },

    url() {
      const path = this.get('permalink') ? `/forms/${this.get('permalink')}` : `/crm/forms/${this.get('code')}`
      return `${process.env.WEB_HOST}${path}`
    },

    is_open() {
      const { limits } = this.get('config')
      const { start_date, end_date, max_responses } = limits
      const num_responses = this.get('num_responses')
      const now = moment().startOf('day')
      const start = moment(start_date).startOf('day')
      const end = moment(end_date).startOf('day')
      if(max_responses && num_responses >= max_responses ) return false
      if(start_date && now.diff(start, 'days') < 0) return false
      if(end_date && now.diff(end, 'days') > 0) return false
      return true
    }

  },

  email() {
    return this.belongsTo(Email, 'email_id')
  },

  emails() {
    return this.hasMany(Email, 'form_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  },

  responses() {
    return this.hasMany(Response, 'form_id')
  },

  workflows() {
    return this.hasMany(Workflow, 'form_id')
  },

  workflow() {
    return this.belongsTo(Workflow, 'workflow_id')
  }

})

export default Form
