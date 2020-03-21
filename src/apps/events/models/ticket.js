import Model from '../../../core/objects/model'
import Registration from './registration'
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
  }

})

export default Ticket
