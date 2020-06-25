import Model from '../../../core/objects/model'
import Program from '../../crm/models/program'
import Product from './product'

const Store = new Model({

  tableName: 'stores_stores',

  rules: {},

  virtuals: {

    object_text: function() {
      return this.get('title')
    },

    object_type: function() {
      return 'store'
    },

    object_url: function() {
      return `/admin/stores/stores/${this.get('id')}`
    },

    url() {
      const path = this.get('permalink') ? `/stores/${this.get('permalink')}` : `/stores/${this.get('code')}`
      return `${process.env.WEB_HOST}${path}`
    }

  },

  products() {
    return this.hasMany(Product, 'store_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default Store
