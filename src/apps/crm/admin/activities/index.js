import VoiceCampaign from './voice_campaign'
import EmailCampaign from './email_campaign'
import SMSCampaign from './sms_campaign'
import Response from './response'
import Workflow from './workflow'
import Consent from './consent'
import Import from './import'
import Edit from './edit'
import Note from './note'
import Call from './call'

const cards = {
  call: { component: Call, color: 'teal', icon: 'phone' },
  consent: { component: Consent, color: 'blue', icon: 'sliders' },
  edit: { component: Edit, color: 'olive', icon: 'pencil' },
  email_campaign: { component: EmailCampaign, color: 'olive', icon: 'pencil' },
  import: { component: Import, color: 'olive', icon: 'pencil' },
  note: { component: Note, color: 'orange', icon: 'sticky-note' },
  response: { component: Response, color: 'green', icon: 'check-square' },
  sms_campaign: { component: SMSCampaign, color: 'olive', icon: 'pencil' },
  voice_campaign: { component: VoiceCampaign, color: 'olive', icon: 'pencil' },
  workflow: { component: Workflow, color: 'pink', icon: 'gears' }
}

export default cards
