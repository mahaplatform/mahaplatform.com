import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Session from './session'

const Location = new Model(knex, {

  databaseName: 'maha',

  tableName: 'events_locations',

  rules: {},

  virtuals: {

    object_text: function() {
      return this.get('address').description
    },

    object_type: function() {
      return 'location'
    },

    object_url: function() {
      return `/events/locations/${this.get('id')}`
    }

  },

  sessions() {
    return this.hasMany(Session, 'location_id')
  }

})

export default Location
