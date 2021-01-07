import Model from '@core/objects/model'
import Asset from '@apps/maha/models/asset'
import Event from './event'

const Organizer = new Model({

  databaseName: 'maha',

  tableName: 'events_organizers',

  rules: {},

  virtuals: {

    object_text: function() {
      return this.get('name')
    },

    object_type: function() {
      return 'organizer'
    },

    object_url: function() {
      return `/events/organizers/${this.get('id')}`
    }

  },

  events() {
    return this.belongsToMany(Event, 'events_events_organizers', 'organizer_id', 'event_id')
  },

  photo() {
    return this.belongsTo(Asset, 'photo_id')
  }

})

export default Organizer
