import Attachment from '../../maha/models/attachment'
import Model from '../../../core/objects/model'
import User from '../../maha/models/user'
import Access from './access'
import Like from './like'

const Post = new Model({

  tableName: 'news_posts',

  rules: {},

  virtuals: {},

  accesses() {
    return this.hasMany(Access, 'post_id')
  },

  attachments() {
    return this.morphMany(Attachment, 'attachable')
  },

  likes() {
    return this.hasMany(Like, 'post_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Post
