import Model from '../../../core/objects/model'
import Post from './post'

const Access = new Model({

  tableName: 'news_accesses',

  rules: {},

  virtuals: {},

  post() {
    return this.belongsTo(Post, 'post_id')
  }

})

export default Access
