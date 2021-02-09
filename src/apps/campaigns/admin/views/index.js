import EmailList from './email/list'
import EmailShow from './email/show'
import EmailActivities from './email/activities'
import EmailBouncesList from './email/deliveries/bounces'
import EmailDeliveriesList from './email/deliveries/list'
import EmailDesign from './email/design'
import SmsInbound from './sms/inbound'
import SmsOutbound from './sms/outbound'
import SmsShow from './sms/show'
import SmsDesign from './sms/design'
import SmsSessionsList from './sms/sessions/list'
import SmsSessionsShow from './sms/sessions/show'
import VoiceList from './voice/list'
import VoiceShow from './voice/show'
import VoiceDesign from './voice/design'
import VoiceRecordings from './voice/recordings'
import VoiceVoicemailsList from './voice/voicemails/list'
import VoiceVoicemailsShow from './voice/voicemails/show'
import VoiceCallsList from './voice/calls/list'
import VoiceCallsShow from './voice/calls/show'

const routes = [
  { path: '/email', component: EmailList },
  { path: '/email/:id', component: EmailShow },
  { path: '/email/:email_id/activities', component: EmailActivities },
  { path: '/email/:email_id/bounces', component: EmailBouncesList },
  { path: '/email/:email_id/deliveries', component: EmailDeliveriesList },
  { path: '/email/:email_id/design', component: EmailDesign },
  { path: '/sms/outbound', component: SmsOutbound },
  { path: '/sms/inbound', component: SmsInbound },
  { path: '/sms/:id', component: SmsShow },
  { path: '/sms/:id/design', component: SmsDesign },
  { path: '/sms/:campaign_id/sessions', component: SmsSessionsList },
  { path: '/sms/:campaign_id/sessions/:id', component: SmsSessionsShow },
  { path: '/voice', component: VoiceList },
  { path: '/voice/:id', component: VoiceShow },
  { path: '/voice/:id/design', component: VoiceDesign },
  { path: '/voice/:campaign_id/recordings', component: VoiceRecordings },
  { path: '/voice/:campaign_id/voicemails', component: VoiceVoicemailsList },
  { path: '/voice/:campaign_id/voicemails/:id', component: VoiceVoicemailsShow },
  { path: '/voice/:campaign_id/calls', component: VoiceCallsList },
  { path: '/voice/:campaign_id/calls/:id', component: VoiceCallsShow }
]

export default routes
