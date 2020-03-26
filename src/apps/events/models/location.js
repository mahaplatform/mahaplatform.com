import Model from '../../../core/objects/model'
import Session from './session'

const Location = new Model({

  tableName: 'events_locations',

  rules: {},

  virtuals: {},

  sessions() {
    return this.hasMany(Session, 'location_id')
  }

})

export default Location
