import Attachment from '@apps/maha/models/attachment'
import Model from '@core/objects/model'
import User from '@apps/maha/models/user'
import Link from '@apps/maha/models/link'
import Group from './group'
import Like from './like'

const Post = new Model({

  tableName: 'news_posts',

  rules: {},

  virtuals: {},

  attachments() {
    return this.morphMany(Attachment, 'attachable')
  },

  group() {
    return this.belongsTo(Group, 'group_id')
  },

  likes() {
    return this.hasMany(Like, 'post_id')
  },

  link() {
    return this.belongsTo(Link, 'link_id')
  },

  target_user() {
    return this.belongsTo(User, 'target_user_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Post
