import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'

const Rate = new Model(knex, {

  databaseName: 'maha',

  belongsToTeam: false,

  hasTimestamps: false,

  tableName: 'finance_rates',

  virtuals: {

    object_text: function() {
      return this.get('year')
    },

    object_type: function() {
      return 'rate'
    },

    object_url: function() {
      return '/finance/rates'
    }

  }

})

export default Rate
