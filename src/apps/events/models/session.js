import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Attending from './attending'
import Location from './location'
import Event from './event'
import moment from 'moment'

const Session = new Model(knex, {

  databaseName: 'maha',

  tableName: 'events_sessions',

  rules: {},

  virtuals: {

    starts_at() {
      const date = moment(this.get('date')).format('YYYY-MM-DD')
      return moment(`${date} ${this.get('start_time')}`)
    },

    ends_at() {
      const date = moment(this.get('date')).format('YYYY-MM-DD')
      return moment(`${date} ${this.get('end_time')}`)
    }

  },

  attendings() {
    return this.hasMany(Attending, 'session_id')
  },

  event() {
    return this.belongsTo(Event, 'event_id')
  },

  location() {
    return this.belongsTo(Location, 'location_id')
  }

})

export default Session
