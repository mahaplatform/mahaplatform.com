import EmailCampaignResult from './email_campaign_result'
import Workflow from '@apps/automation/models/workflow'
import MahaEmail from '@apps/maha/models/email'
import Program from '@apps/crm/models/program'
import Model from '@core/objects/model'

const EmailCampaign = new Model({

  tableName: 'campaigns_email_campaigns',

  rules: {},

  virtuals: {

    object_text: function() {
      return this.get('title')
    },

    object_type: function() {
      return 'email campaign'
    },

    object_url: function() {
      return `/campaigns/email/${this.get('id')}`
    },

    editable() {
      return this.get('deleted_at') === null
    },

    preview() {
      return this.get('screenshoted_at') ? `screenshots/email-campaign-${this.get('id')}-${this.get('screenshoted_at').getTime()}.jpg` : null
    }

  },

  emails() {
    return this.hasMany(MahaEmail, 'email_campaign_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  },

  results() {
    return this.hasOne(EmailCampaignResult, 'email_campaign_id')
  },

  workflows() {
    return this.hasMany(Workflow, 'email_campaign_id')
  }

})

export default EmailCampaign
