import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import App from './app'

const DashboardCardType = new Model(knex, {

  databaseName: 'maha',

  tableName: 'maha_dashboard_card_types',

  rules: {},

  virtuals: {

    app_code: function() {
      return this.related('app').id ? this.related('app').get('code') : 'maha'
    }

  },

  app() {
    return this.belongsTo(App, 'app_id')
  }

})

export default DashboardCardType
