import Model from '../../../core/objects/model'
import Asset from '../../maha/models/asset'
import Email from './email'

const EmailAttachment = new Model({

  tableName: 'crm_email_attachments',

  rules: {},

  virtuals: {},

  asset() {
    return this.hasOne(Asset, 'asset_id')
  },

  email() {
    return this.belongsTo(Email, 'email_id')
  }

})

export default EmailAttachment
