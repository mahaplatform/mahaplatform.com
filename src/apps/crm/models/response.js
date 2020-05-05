import WorkflowEnrollment from './workflow_enrollment'
import Invoice from '../../finance/models/invoice'
import Payment from '../../finance/models/payment'
import Model from '../../../core/objects/model'
import Contact from './contact'
import Form from './form'

const Response = new Model({

  tableName: 'crm_responses',

  rules: {},

  virtuals: {},

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
