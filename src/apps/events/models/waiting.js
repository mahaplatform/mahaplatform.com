import Model from '@core/objects/model'
import Contact from '@apps/crm/models/contact'
import Event from './event'

const Waiting = new Model({

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
