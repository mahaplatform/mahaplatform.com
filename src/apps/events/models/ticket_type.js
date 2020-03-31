import Model from '../../../core/objects/model'
import Ticket from './ticket'

const TicketType = new Model({

  tableName: 'events_ticket_types',

  rules: {},

  virtuals: {},

  event() {
    return this.belongsTo(Event, 'event_id')
  },

  tickets() {
    return this.hasMany(Ticket, 'ticket_type_id')
  }

})

export default TicketType
