import Model from '../../../core/objects/model'
import Event from './event'

const Waiting = new Model({

  tableName: 'events_waitings',

  rules: {},

  virtuals: {},

  event() {
    return this.belongsTo(Event, 'event_id')
  }

})

export default Waiting
