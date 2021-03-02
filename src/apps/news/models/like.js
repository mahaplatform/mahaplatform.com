import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import User from '@apps/maha/models/user'
import Post from './post'

const Like = new Model(knex, {

  databaseName: 'maha',

  tableName: 'news_likes',

  displayName: 'like',

  displayAttribute: '',

  post() {
    return this.belongsTo(Post, 'post_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }


})

export default Like
