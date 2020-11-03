import EmailCampaign from '../../crm/models/email_campaign'
import WorkflowEnrollment from './workflow_enrollment'
import Model from '../../../core/objects/model'
import Program from '../../crm/models/program'
import WorkflowResult from './workflow_result'
import Event from '../../events/models/event'
import Field from '../../maha/models/field'
import WorkflowStep from './workflow_step'
import Topic from '../../crm/models/topic'
import Email from '../../crm/models/email'
import Form from '../../crm/models/form'
import List from '../../crm/models/list'

const Workflow = new Model({

  tableName: 'crm_workflows',

  rules: {},

  virtuals: {

    object_text: function() {
      return this.get('display_name')
    },

    object_type: function() {
      return 'workflow'
    },

    object_url: function() {
      return `/automation/workflows/${this.get('id')}`
    },

    display_name() {
      if(this.get('form_id')) return `${this.related('form').get('title')}: ${this.get('title')}`
      if(this.get('email_campaign_id')) return `${this.related('email_campaign').get('title')}: ${this.get('title')}`
      if(this.get('email_id')) return `${this.related('email').get('title')}: ${this.get('title')}`
      if(this.get('list_id')) return `${this.related('list').get('title')}: ${this.get('title')}`
      if(this.get('topic_id')) return `${this.related('topic').get('title')}: ${this.get('title')}`
      if(this.get('event_id')) return `${this.related('event').get('title')}: ${this.get('title')}`
      return this.get('title')
    },

    editable() {
      return this.get('deleted_at') === null
    }

  },

  emails() {
    return this.hasMany(Email, 'workflow_id')
  },

  email() {
    return this.belongsTo(Email, 'email_id')
  },

  email_campaign() {
    return this.belongsTo(EmailCampaign, 'email_campaign_id')
  },

  enrollments() {
    return this.hasMany(WorkflowEnrollment, 'workflow_id')
  },

  event() {
    return this.belongsTo(Event, 'event_id')
  },

  field() {
    return this.belongsTo(Field, 'field_id')
  },

  form() {
    return this.belongsTo(Form, 'form_id')
  },

  list() {
    return this.belongsTo(List, 'list_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  },

  steps() {
    return this.hasMany(WorkflowStep, 'workflow_id').query(qb => {
      qb.where('is_active', true)
    })
  },

  results() {
    return this.hasOne(WorkflowResult, 'email_id')
  },

  topic() {
    return this.belongsTo(Topic, 'topic_id')
  }

})

export default Workflow
