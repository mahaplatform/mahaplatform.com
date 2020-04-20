import WorkflowEnrollment from '../../crm/models/workflow_enrollment'
import Invoice from '../../finance/models/invoice'
import Model from '../../../core/objects/model'
import Contact from '../../crm/models/contact'
import Ticket from './ticket'
import Event from './event'

const Registration = new Model({

  tableName: 'events_registrations',

  rules: {},

  virtuals: {},

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

  tickets() {
    return this.hasMany(Ticket, 'registration_id')
  }

})

export default Registration
