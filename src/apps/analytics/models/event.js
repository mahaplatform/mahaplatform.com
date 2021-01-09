import Model from '@core/objects/model'
import EventType from './event_type'
import Session from './session'
import Page from './page'

const Event = new Model({

  databaseName: 'analytics',

  tableName: 'events',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  event_type() {
    return this.belongsTo(EventType, 'event_type_id')
  },

  page() {
    return this.belongsTo(Page, 'page_id')
  },

  session() {
    return this.belongsTo(Session, 'session_id')
  }

})

export default Event
