import Model from '@core/objects/model'
import Variant from './variant'

const Adjustment = new Model({

  tableName: 'stores_adjustments',

  rules: {},

  virtuals: {},

  variant() {
    return this.belongsTo(Variant, 'variant_id')
  }

})

export default Adjustment