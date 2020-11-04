import VoiceCampaign from './voice_campaign'
import EmailCampaign from './email_campaign'
import SMSCampaign from './sms_campaign'

const cards = {
  email_campaign: { component: EmailCampaign, color: 'olive', icon: 'pencil' },
  sms_campaign: { component: SMSCampaign, color: 'olive', icon: 'pencil' },
  voice_campaign: { component: VoiceCampaign, color: 'olive', icon: 'pencil' }
}

export default cards
