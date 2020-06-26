import Model from '../../../core/objects/model'
import Product from './product'

const Option = new Model({

  tableName: 'options',

  rules: {},

  virtuals: {},

  product() {
    return this.belongsTo(Product, 'product_id')
  }

})

export default Option
