import Workflow from '../../crm/models/workflow'
import Model from '../../../core/objects/model'
import Program from '../../crm/models/program'
import knex from '../../../core/services/knex'
import Asset from '../../maha/models/asset'
import Email from '../../crm/models/email'
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
      return `/events/events/${this.get('id')}`
    },

    organizer_ids: function() {
      return this.related('organizers').map(organizer => {
        return organizer.get('id')
      })
    },

    url() {
      const path = this.get('permalink') ? `/events/${this.get('permalink')}` : `/events/${this.get('code')}`
      return `${process.env.WEB_HOST}${path}`
    },

    ics() {
      return `${process.env.WEB_HOST}/events/${this.get('code')}.ics`
    }

  },

  email() {
    return this.belongsTo(Email, 'email_id')
  },

  emails() {
    return this.hasMany(Email, 'event_id')
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
    return this.hasMany(Session, 'event_id').query(qb => {
      qb.orderBy('date', 'asc')
    })
  },

  ticket_types() {
    return this.hasMany(TicketType, 'event_id').query(qb => {
      qb.select(knex.raw('events_ticket_types.*, coalesce(count(events_tickets.*), 0) as tickets_count'))
      qb.leftJoin('events_tickets', 'events_tickets.ticket_type_id','events_ticket_types.id')
      qb.groupBy('events_ticket_types.id')
      qb.orderBy('delta', 'asc')
    })
  },

  waitings() {
    return this.hasMany(Waiting, 'event_id')
  },

  workflows() {
    return this.hasMany(Workflow, 'event_id')
  },

  workflow() {
    return this.belongsTo(Workflow, 'workflow_id')
  }

})

export default Event
