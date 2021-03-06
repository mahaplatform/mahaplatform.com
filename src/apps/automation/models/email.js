import VoiceCampaign from '@apps/campaigns/models/voice_campaign'
import SMSCampaign from '@apps/campaigns/models/sms_campaign'
import Workflow from '@apps/automation/models/workflow'
import MahaEmail from '@apps/maha/models/email'
import Program from '@apps/crm/models/program'
import Store from '@apps/stores/models/store'
import Event from '@apps/events/models/event'
import Form from '@apps/forms/models/form'
import EmailResult from './email_result'
import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'

const Email = new Model(knex, {

  databaseName: 'maha',

  tableName: 'crm_emails',

  rules: {},

  virtuals: {

    object_text: function() {
      return this.get('display_name')
    },

    object_type: function() {
      return 'email'
    },

    object_url: function() {
      return `/automation/emails/${this.get('id')}`
    },

    editable() {
      return this.get('deleted_at') === null
    },

    preview() {
      return this.get('screenshoted_at') ? `screenshots/email-${this.get('id')}-${this.get('screenshoted_at').getTime()}.jpg` : null
    },

    type() {
      if(this.get('event_id')) return 'event'
      if(this.get('form_id')) return 'form'
      if(this.get('workflow_id')) return 'workflow'
      return 'basic'
    },

    display_name() {
      if(this.get('event_id')) return `${this.related('event').get('title')}: ${this.get('title')}`
      if(this.get('form_id')) return `${this.related('form').get('title')}: ${this.get('title')}`
      if(this.get('workflow_id')) return `${this.related('workflow').get('title')}: ${this.get('title')}`
      return this.get('title')
    }

  },

  emails() {
    return this.hasMany(MahaEmail, 'email_id')
  },

  event() {
    return this.belongsTo(Event, 'event_id')
  },

  form() {
    return this.belongsTo(Form, 'form_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  },

  results() {
    return this.hasOne(EmailResult, 'email_id')
  },

  sms_campaign() {
    return this.belongsTo(SMSCampaign, 'sms_campaign_id')
  },

  store() {
    return this.belongsTo(Store, 'store_id')
  },

  workflow() {
    return this.belongsTo(Workflow, 'workflow_id')
  },

  voice_campaign() {
    return this.belongsTo(VoiceCampaign, 'voice_campaign_id')
  }

})

export default Email
