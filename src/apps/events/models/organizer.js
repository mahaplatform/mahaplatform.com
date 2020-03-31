import Model from '../../../core/objects/model'
import Asset from '../../maha/models/asset'
import Event from './event'

const Organizer = new Model({

  tableName: 'events_organizers',

  rules: {},

  virtuals: {},

  events() {
    return this.belongsToMany(Event, 'events_events_organizers', 'organizer_id', 'event_id')
  },

  photo() {
    return this.belongsTo(Asset, 'photo_id')
  }

})

export default Organizer
