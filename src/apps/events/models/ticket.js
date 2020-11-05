import Model from '@core/objects/model'
import Registration from './registration'
import TicketType from './ticket_type'
import Attending from './attending'

const Ticket = new Model({

  tableName: 'events_tickets',

  rules: {},

  virtuals: {},

  attendings() {
    return this.hasMany(Attending, 'session_id')
  },

  registration() {
    return this.belongsTo(Registration, 'registration_id')
  },

  ticket_type() {
    return this.belongsTo(TicketType, 'ticket_type_id')
  }

})

export default Ticket
