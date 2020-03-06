import Model from '../../../core/objects/model'
import Asset from './asset'
import User from './user'

const IncomingEmail = new Model({

  tableName: 'maha_incoming_emails',

  rules: {},

  virtuals: {},

  attachments() {
    return this.belongsToMany(Asset, 'maha_incoming_email_attachments', 'incoming_email_id', 'asset_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default IncomingEmail
