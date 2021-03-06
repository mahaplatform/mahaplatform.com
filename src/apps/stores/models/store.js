import Workflow from '@apps/automation/models/workflow'
import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Program from '@apps/crm/models/program'
import Category from './category'
import Discount from './discount'
import Product from './product'
import Order from './order'

const Store = new Model(knex, {

  databaseName: 'maha',

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
      return `/stores/stores/${this.get('id')}`
    },

    path() {
      return this.get('permalink') ? `/stores/${this.get('permalink')}` : `/stores/${this.get('code')}`
    },

    url() {
      return `${process.env.ADMIN_HOST}${this.get('path')}`
    }

  },

  categories() {
    return this.hasMany(Category, 'store_id')
  },

  discounts() {
    return this.hasMany(Discount, 'discount_id')
  },

  orders() {
    return this.hasMany(Order, 'store_id')
  },

  products() {
    return this.hasMany(Product, 'store_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  },

  workflows() {
    return this.hasMany(Workflow, 'form_id')
  }

})

export default Store
