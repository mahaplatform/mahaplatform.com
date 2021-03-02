import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Contact from '@apps/crm/models/contact'
import Event from './event'

const Waiting = new Model(knex, {

  databaseName: 'maha',

  tableName: 'events_waitings',

  rules: {},

  virtuals: {},

  contact() {
    return this.belongsTo(Contact, 'contact_id')
  },

  event() {
    return this.belongsTo(Event, 'event_id')
  }

})

export default Waiting
