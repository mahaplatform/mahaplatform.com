import Attachment from './attachment'
import Model from '../../../web/core/objects/model'
import User from './user'

const Comment = new Model({

  tableName: 'maha_comments',

  rules: {},

  attachments() {
    return this.morphMany(Attachment, 'attachable')
  },

  quoted_comment() {
    return this.belongsTo(Comment, 'quoted_comment_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Comment
