import Model from '../../../web/core/objects/model'
import Story from './story'
import User from './user'

const Audit = new Model({

  tableName: 'maha_audits',

  story: function() {
    return this.belongsTo(Story, 'story_id')
  },

  user: function() {
    return this.belongsTo(User, 'user_id')
  }


})

export default Audit
