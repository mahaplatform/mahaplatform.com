import Model from '@core/objects/model'
import Variant from './variant'

const Reservation = new Model({

  databaseName: 'maha',

  tableName: 'store_reservations',

  rules: {},

  virtuals: {},

  variant() {
    return this.belongsTo(Variant, 'variant_id')
  }

})

export default Reservation
