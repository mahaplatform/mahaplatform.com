import Model from '../../../core/objects/model'
import Program from '../../crm/models/program'
import Asset from '../../maha/models/asset'
import Registration from './registration'
import TicketType from './ticket_type'
import Organizer from './organizer'
import Session from './session'
import Waiting from './waiting'

const Event = new Model({

  tableName: 'events_events',

  rules: {},

  virtuals: {

    object_text: function() {
      return this.get('title')
    },

    object_type: function() {
      return 'event'
    },

    object_url: function() {
      return `/admin/crm/events/events/${this.get('id')}`
    }

  },

  image() {
    return this.belongsTo(Asset, 'image_id')
  },

  organizers() {
    return this.belongsToMany(Organizer, 'events_events_organizers', 'event_id', 'organizer_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  },

  registrations() {
    return this.hasMany(Registration, 'event_id')
  },

  sessions() {
    return this.hasMany(Session, 'event_id')
  },

  ticket_types() {
    return this.hasMany(TicketType, 'event_id')
  },

  waitings() {
    return this.hasMany(Waiting, 'event_id')
  }

})

export default Event
