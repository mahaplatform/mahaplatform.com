import Model from '@core/objects/model'
import Session from './session'
import Ticket from './ticket'

const Attending = new Model({

  tableName: 'events_attendings',

  rules: {},

  virtuals: {},

  session() {
    return this.belongsTo(Session, 'session_id')
  },

  ticket() {
    return this.belongsTo(Ticket, 'ticket_id')
  }

})

export default Attending
