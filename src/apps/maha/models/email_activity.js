import Model from '../core/objects/model'
import EmailLink from './email_link'

const EmailActivity = new Model({

  tableName: 'maha_email_activities',

  link() {
    return this.belongsTo(EmailLink, 'email_link_id')
  }

})

export default EmailActivity
