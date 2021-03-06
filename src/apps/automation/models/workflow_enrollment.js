import VoiceCampaign from '@apps/campaigns/models/voice_campaign'
import SmsCampaign from '@apps/campaigns/models/sms_campaign'
import Registration from '@apps/events/models/registration'
import PhoneNumber from '@apps/crm/models/phone_number'
import Response from '@apps/forms/models/response'
import Version from '@apps/maha/models/version'
import Contact from '@apps/crm/models/contact'
import WorkflowAction from './workflow_action'
import Order from '@apps/stores/models/order'
import Email from '@apps/maha/models/email'
import Call from '@apps/maha/models/call'
import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Workflow from './workflow'

const WorkflowEnrollment = new Model(knex, {

  databaseName: 'maha',

  tableName: 'crm_workflow_enrollments',

  rules: {},

  virtuals: {},

  actions() {
    return this.hasMany(WorkflowAction, 'enrollment_id')
  },

  call() {
    return this.belongsTo(Call, 'call_id')
  },

  contact() {
    return this.belongsTo(Contact, 'contact_id').query(qb => {
      qb.select('crm_contacts.*','crm_contact_primaries.*')
      qb.leftJoin('crm_contact_primaries', 'crm_contact_primaries.contact_id', 'crm_contacts.id')
    })
  },

  email() {
    return this.belongsTo(Email, 'email_id')
  },

  order() {
    return this.belongsTo(Order, 'order_id')
  },

  phone_number() {
    return this.belongsTo(PhoneNumber, 'phone_number_id')
  },

  registration() {
    return this.belongsTo(Registration, 'registration_id')
  },

  response() {
    return this.belongsTo(Response, 'response_id')
  },

  sms_campaign() {
    return this.belongsTo(SmsCampaign, 'sms_campaign_id')
  },

  version() {
    return this.belongsTo(Version, 'version_id')
  },

  voice_campaign() {
    return this.belongsTo(VoiceCampaign, 'voice_campaign_id')
  },

  workflow() {
    return this.belongsTo(Workflow, 'workflow_id')
  }

})

export default WorkflowEnrollment
