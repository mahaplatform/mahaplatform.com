import Model from '../../../core/objects/model'
import Program from '../../crm/modals/program'
import Registration from './registration'
import Session from './session'
import Waiting from './waiting'

const Event = new Model({

  tableName: 'events_events',

  rules: {},

  virtuals: {},

  program() {
    return this.belongsTo(Program, 'program_id')
  },

  registrations() {
    return this.hasMany(Registration, 'event_id')
  },

  sessions() {
    return this.hasMany(Session, 'event_id')
  },

  waitings() {
    return this.hasMany(Waiting, 'event_id')
  }

})

export default Event
