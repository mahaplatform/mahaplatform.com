import Model from '../../../core/objects/model'
import Attending from './attending'
import Location from './location'
import Event from './event'

const Session = new Model({

  tableName: 'events_sessions',

  rules: {},

  virtuals: {},

  attendings() {
    return this.hasMany(Attending, 'session_id')
  },

  event() {
    return this.belongsTo(Event, 'event_id')
  },

  location() {
    return this.hasMany(Location, 'location_id')
  }

})

export default Session
