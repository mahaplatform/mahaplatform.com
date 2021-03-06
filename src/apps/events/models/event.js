import Workflow from '@apps/automation/models/workflow'
import Email from '@apps/automation/models/email'
import Program from '@apps/crm/models/program'
import Asset from '@apps/maha/models/asset'
import Registration from './registration'
import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import TicketType from './ticket_type'
import Organizer from './organizer'
import Session from './session'
import Waiting from './waiting'

const Event = new Model(knex, {

  databaseName: 'maha',

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

    path() {
      return this.get('permalink') ? `/events/${this.get('permalink')}` : `/events/${this.get('code')}`
    },

    url() {
      return `${process.env.ADMIN_HOST}${this.get('path')}`
    },

    ics() {
      return `${process.env.ADMIN_HOST}/events/${this.get('code')}.ics`
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
  }

})

export default Event
