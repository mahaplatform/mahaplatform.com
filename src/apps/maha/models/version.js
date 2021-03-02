import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import User from './user'

const Version = new Model(knex, {

  databaseName: 'maha',

  tableName: 'maha_versions',

  rules: {},

  virtuals: {

    is_published() {
      return this.get('published_at') !== null && this.get('unpublished_at') === null
    }
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Version
