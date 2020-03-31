import Model from '../../../core/objects/model'
import Registration from './registration'
import TicketType from './ticket_type'
import Attending from './attending'

const Ticket = new Model({

  tableName: 'events_tickets',

  rules: {},

  virtuals: {

    full_name: function() {
      const parts = []
      if(this.get('first_name')) parts.push(this.get('first_name'))
      if(this.get('last_name')) parts.push(this.get('last_name'))
      return parts.length > 0 ? parts.join(' ') : null
    },

    rfc822: function() {
      return this.get('full_name') ? `${this.get('full_name')} <${this.get('email')}>` : this.get('email')
    }

  },

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
