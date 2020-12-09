import WorkflowEnrollment from '@apps/automation/models/workflow_enrollment'
import Invoice from '@apps/finance/models/invoice'
import Payment from '@apps/finance/models/payment'
import Model from '@core/objects/model'
import Contact from '@apps/crm/models/contact'
import Form from './form'

const Response = new Model({

  tableName: 'forms_responses',

  rules: {},

  virtuals: {

    url() {
      return `${process.env.WEB_HOST}/admin/forms/forms/${this.get('form_id')}/responses/${this.get('id')}`
    }

  },

  contact() {
    return this.belongsTo(Contact, 'contact_id').query(qb => {
      qb.select('crm_contacts.*','crm_contact_primaries.*')
      qb.leftJoin('crm_contact_primaries', 'crm_contact_primaries.contact_id', 'crm_contacts.id')
    })
  },

  enrollment() {
    return this.hasOne(WorkflowEnrollment, 'response_id')
  },

  form() {
    return this.belongsTo(Form, 'form_id')
  },

  invoice() {
    return this.belongsTo(Invoice, 'invoice_id')
  },

  payment() {
    return this.belongsTo(Payment, 'payment_id')
  }

})

export default Response
