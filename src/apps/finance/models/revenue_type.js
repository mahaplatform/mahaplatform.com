import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'

const RevenueType = new Model(knex, {

  databaseName: 'maha',

  belongsToTeam: false,

  tableName: 'finance_revenue_types',

  rules: {},

  virtuals: {

    display: function() {
      return `${this.get('integration').revenue_code} - ${this.get('title')}`
    }

  }

})

export default RevenueType
