import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Variant from './variant'

const Adjustment = new Model(knex, {

  databaseName: 'maha',

  tableName: 'stores_adjustments',

  rules: {},

  virtuals: {},

  variant() {
    return this.belongsTo(Variant, 'variant_id')
  }

})

export default Adjustment
