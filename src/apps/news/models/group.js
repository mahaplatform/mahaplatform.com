import Model from '@core/objects/model'
import Asset from '../../maha/models/asset'
import User from '../../maha/models/user'
import Member from './member'
import Post from './post'

const Group = new Model({

  tableName: 'news_groups',

  rules: {},

  virtuals: {},

  logo() {
    return this.belongsTo(Asset, 'logo_id')
  },

  members() {
    return this.hasMany(Member, 'news_group_id')
  },

  owner() {
    return this.belongsTo(User, 'owner_id')
  },

  posts() {
    return this.hasMany(Post, 'group_id')
  }

})

export default Group
