import Model from '@core/objects/model'
import EmailLink from './email_link'
import Email from './email'

const EmailActivity = new Model({

  tableName: 'maha_email_activities',

  virtuals: {

    icon() {
      if(this.get('type') === 'delivery') return 'paper-plane'
      if(this.get('type') === 'bounce') return 'exclamation-triangle'
      if(this.get('type') === 'open') return 'envelope-open'
      if(this.get('type') === 'complaint') return 'bullhorn'
      if(this.get('type') === 'webview') return 'globe'
      if(this.get('type') === 'forward') return 'arrow-right'
      if(this.get('type') === 'unsubscribe') return 'times'
      if(this.get('type') === 'click') return 'mouse-pointer'
      if(this.get('type') === 'share') return this.get('service')
    },

    description() {
      if(this.get('type') === 'delivery') return 'email was delivered'
      if(this.get('type') === 'bounce') return 'email was bounced'
      if(this.get('type') === 'open') return 'opened email'
      if(this.get('type') === 'complaint') return 'complained about this email'
      if(this.get('type') === 'webview') return 'viewed the email online'
      if(this.get('type') === 'forward') return `forwarded the email to ${this.get('forwarded_to')}`
      if(this.get('type') === 'unsubscribe') return 'opted out of future communications'
      if(this.get('type') === 'click') return `clicked the link ${this.related('link').get('text')}`
      if(this.get('type') === 'share') return `shared on ${this.get('service')}`
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
