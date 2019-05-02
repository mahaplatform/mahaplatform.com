import Attachment from './attachment'
import PostPhoto from './post_photo'
import Model from '../core/objects/model'
import User from './user'

const Post = new Model({

  tableName: 'maha_posts',

  rules: {
    text: 'required'
  },

  attachments() {
    return this.morphMany(Attachment, 'attachable')
  },

  photos() {
    return this.hasMany(PostPhoto, 'post_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Post
