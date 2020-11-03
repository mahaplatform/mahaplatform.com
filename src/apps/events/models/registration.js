import WorkflowEnrollment from '../../automation/models/workflow_enrollment'
import Invoice from '../../finance/models/invoice'
import Payment from '../../finance/models/payment'
import Model from '../../../core/objects/model'
import Contact from '../../crm/models/contact'
import Ticket from './ticket'
import Event from './event'

const Registration = new Model({

  tableName: 'events_registrations',

  rules: {},

  virtuals: {

    url() {
      return `${process.env.WEB_HOST}/admin/events/events/${this.get('event_id')}/registrations/${this.get('id')}`
    }

  },

  contact() {
    return this.belongsTo(Contact, 'contact_id')
  },

  enrollment() {
    return this.hasOne(WorkflowEnrollment, 'registration_id')
  },

  event() {
    return this.belongsTo(Event, 'event_id')
  },

  invoice() {
    return this.belongsTo(Invoice, 'invoice_id')
  },

  payment() {
    return this.belongsTo(Payment, 'payment_id')
  },

  tickets() {
    return this.hasMany(Ticket, 'registration_id')
  }

})

export default Registration
