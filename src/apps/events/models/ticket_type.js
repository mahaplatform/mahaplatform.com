import Model from '../../../core/objects/model'
import Ticket from './ticket'

const TicketType = new Model({

  tableName: 'events_ticket_types',

  rules: {},

  virtuals: {

    remaining() {
      const total_tickets = this.get('total_tickets')
      if(!total_tickets) return null
      console.log(total_tickets, this.get('tickets_count'))
      return total_tickets - this.get('tickets_count')
    }

  },

  event() {
    return this.belongsTo(Event, 'event_id')
  },

  tickets() {
    return this.hasMany(Ticket, 'ticket_type_id')
  }

})

export default TicketType
