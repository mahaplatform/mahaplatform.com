import Model from '@core/objects/model'
import EventType from './event_type'
import Category from './category'
import Property from './property'
import Session from './session'
import Network from './network'
import Action from './action'
import Label from './label'
import Page from './page'

const Event = new Model({

  databaseName: 'analytics',

  tableName: 'events',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  action() {
    return this.belongsTo(Action, 'action_id')
  },

  category() {
    return this.belongsTo(Category, 'category_id')
  },

  event_type() {
    return this.belongsTo(EventType, 'event_type_id')
  },

  label() {
    return this.belongsTo(Label, 'label_id')
  },

  network() {
    return this.belongsTo(Network, 'network_id')
  },

  page() {
    return this.belongsTo(Page, 'page_id')
  },

  property() {
    return this.belongsTo(Property, 'property_id')
  },

  session() {
    return this.belongsTo(Session, 'session_id')
  }

})

export default Event
