import Registration from '../../events/models/registration'
import PhoneNumber from '../models/phone_number'
import Model from '../../../core/objects/model'
import knex from '../../../core/services/knex'
import WorkflowAction from './workflow_action'
import VoiceCampaign from './voice_campaign'
import Email from '../../maha/models/email'
import Call from '../../maha/models/call'
import SmsCampaign from './sms_campaign'
import Workflow from './workflow'
import Response from './response'
import Contact from './contact'

const WorkflowEnrollment = new Model({

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
      qb.select(knex.raw('crm_contacts.*,crm_contact_primaries.*'))
      qb.leftJoin('crm_contact_primaries', 'crm_contact_primaries.contact_id', 'crm_contacts.id')
    })
  },

  email() {
    return this.belongsTo(Email, 'email_id')
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

  voice_campaign() {
    return this.belongsTo(VoiceCampaign, 'voice_campaign_id')
  },

  workflow() {
    return this.belongsTo(Workflow, 'workflow_id')
  }

})

export default WorkflowEnrollment
