import Model from '@core/objects/model'
import Link from '@apps/maha/models/link'
import Attachment from './attachment'
import User from './user'

const Comment = new Model({

  databaseName: 'maha',

  tableName: 'maha_comments',

  rules: {},

  attachments() {
    return this.morphMany(Attachment, 'attachable')
  },

  link() {
    return this.belongsTo(Link, 'link_id')
  },

  quoted_comment() {
    return this.belongsTo(Comment, 'quoted_comment_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Comment
