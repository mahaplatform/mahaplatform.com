import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import App from './app'

const Installation = new Model(knex, {

  databaseName: 'maha',

  tableName: 'maha_installations',

  rules: {
    app_id: 'required'
  },

  virtuals: {

    object_text: function() {
      return this.related('app').get('data').title
    },

    object_type: function() {
      return 'app'
    },

    object_url: function() {
      return `/team/apps/${this.get('app_id')}`
    }

  },

  app() {
    return this.belongsTo(App, 'app_id')
  }

})

export default Installation
