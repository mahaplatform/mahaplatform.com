import EmailAttachment from './email_attachment'
import Model from '../../../core/objects/model'
import Contact from './contact'

const Email = new Model({

  tableName: 'crm_emails',

  rules: {},

  virtuals: {},

  contact() {
    return this.belongsTo(Contact, 'contact_id')
  },

  attachments() {
    return this.hasMany(EmailAttachment, 'email+id')
  }

})

export default Email
