import Model from '../../../core/objects/model'
import EmailLink from './email_link'
import Email from './email'

const EmailActivity = new Model({

  tableName: 'maha_email_activities',

  virtuals: {

    description() {
      if(this.get('type') === 'delivery') return 'email was delivered'
      if(this.get('type') === 'bounce') return 'email was bounced'
      if(this.get('type') === 'open') return 'opened email'
      if(this.get('type') === 'complaint') return 'complained about this email'
      if(this.get('type') === 'webview') return 'viewed the email online'
      if(this.get('type') === 'forward') return 'forwarded the email'
      if(this.get('type') === 'unsubscribe') return 'opted out of future communications'
      if(this.get('type') === 'click') return `clicked the link ${this.get('link.text')}`
      if(this.get('type') === 'social') return `shared on ${this.get('service')}`
    }

  },

  email() {
    return this.belongsTo(Email, 'email_id')
  },

  link() {
    return this.belongsTo(EmailLink, 'email_link_id')
  }

})

export default EmailActivity
