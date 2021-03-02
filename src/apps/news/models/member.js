import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import User from '@apps/maha/models/user'
import Group from './group'

const Member = new Model(knex, {

  databaseName: 'maha',

  tableName: 'news_members',

  rules: {},

  virtuals: {},

  group() {
    return this.belongsTo(Group, 'news_group_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Member
