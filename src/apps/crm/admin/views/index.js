import CampaignsEmailList from './campaigns/email/list'
import CampaignsEmailShow from './campaigns/email/show'
import CampaignsEmailActivities from './campaigns/email/activities'
import CampaignsEmailBouncesList from './campaigns/email/deliveries/bounces'
import CampaignsEmailDeliveriesList from './campaigns/email/deliveries/list'
import CampaignsEmailDesign from './campaigns/email/design'
import CampaignsPostal from './campaigns/postal/show'
import CampaignsPostalDesign from './campaigns/postal/design'
import CampaignsSocial from './campaigns/social/show'
import CampaignsSocialDesign from './campaigns/social/design'
import CampaignsSmsInbound from './campaigns/sms/inbound'
import CampaignsSmsOutbound from './campaigns/sms/outbound'
import CampaignsSmsShow from './campaigns/sms/show'
import CampaignsSmsDesign from './campaigns/sms/design'
import CampaignsSmsSessionsList from './campaigns/sms/sessions/list'
import CampaignsSmsSessionsShow from './campaigns/sms/sessions/show'
import CampaignsVoiceInbound from './campaigns/voice/inbound'
import CampaignsVoiceOutbound from './campaigns/voice/outbound'
import CampaignsVoiceShow from './campaigns/voice/show'
import CampaignsVoiceDesign from './campaigns/voice/design'
import CampaignsVoiceRecordings from './campaigns/voice/recordings'
import CampaignsVoiceCallsList from './campaigns/voice/calls/list'
import CampaignsVoiceCallsShow from './campaigns/voice/calls/show'
import ContactsChannelsShow from './contacts/channels'
import ContactsList from './contacts/list'
import ContactsShow from './contacts/show'
import ContactsEmailsShow from './contacts/email'
import EmailsActivities from './emails/activities'
import EmailsBouncesList from './emails/deliveries/bounces'
import EmailsDeliveriesList from './emails/deliveries/list'
import EmailsDesign from './emails/design'
import EmailsShow from './emails/show'
import EmailsList from './emails/list'
import FormsList from './forms/list'
import FormsShow from './forms/show'
import FormsDesign from './forms/design'
import OrganizationsList from './organizations/list'
import OrganizationsShow from './organizations/show'
import ProgramsList from './programs/list'
import ProgramsShow from './programs/show'
import ProgramsListsShow from './programs/show/lists/show'
import ProgramsTopicsShow from './programs/show/topics/show'
import ResponsesList from './forms/responses/list'
import ResponsesShow from './forms/responses/show'
import ResponseUploadShow from './forms/responses/upload'
import TemplatesShow from './programs/show/templates/show'
import TemplatesDesign from './programs/show/templates/design'
import WorkflowsList from './workflows/list'
import WorkflowsShow from './workflows/show'
import WorkflowsDesign from './workflows/design'
import WorkflowEnrollmentsList from './workflows/enrollments/list'
import WorkflowEnrollmentsShow from './workflows/enrollments/show'

const routes = [
  { path: '/campaigns/email', component: CampaignsEmailList },
  { path: '/campaigns/email/:id', component: CampaignsEmailShow },
  { path: '/campaigns/email/:email_id/activities', component: CampaignsEmailActivities },
  { path: '/campaigns/email/:email_id/bounces', component: CampaignsEmailBouncesList },
  { path: '/campaigns/email/:email_id/deliveries', component: CampaignsEmailDeliveriesList },
  { path: '/campaigns/email/:email_id/design', component: CampaignsEmailDesign },
  { path: '/campaigns/postal/:id', component: CampaignsPostal },
  { path: '/campaigns/postal/:id/design', component: CampaignsPostalDesign },
  { path: '/campaigns/sms/outbound', component: CampaignsSmsOutbound },
  { path: '/campaigns/sms/inbound', component: CampaignsSmsInbound },
  { path: '/campaigns/sms/:id', component: CampaignsSmsShow },
  { path: '/campaigns/sms/:id/design', component: CampaignsSmsDesign },
  { path: '/campaigns/sms/:campaign_id/sessions', component: CampaignsSmsSessionsList },
  { path: '/campaigns/sms/:campaign_id/sessions/:id', component: CampaignsSmsSessionsShow },
  { path: '/campaigns/social/:id', component: CampaignsSocial },
  { path: '/campaigns/social/:id/design', component: CampaignsSocialDesign },
  { path: '/campaigns/voice/outbound', component: CampaignsVoiceOutbound },
  { path: '/campaigns/voice/inbound', component: CampaignsVoiceInbound },
  { path: '/campaigns/voice/:id', component: CampaignsVoiceShow },
  { path: '/campaigns/voice/:id/design', component: CampaignsVoiceDesign },
  { path: '/campaigns/voice/:campaign_id/recordings', component: CampaignsVoiceRecordings },
  { path: '/campaigns/voice/:campaign_id/calls', component: CampaignsVoiceCallsList },
  { path: '/campaigns/voice/:campaign_id/calls/:id', component: CampaignsVoiceCallsShow },
  { path: '/contacts', component: ContactsList },
  { path: '/contacts/:id', component: ContactsShow },
  { path: '/contacts/:contact_id/emails/:id', component: ContactsEmailsShow },
  { path: '/contacts/:contact_id/channels/programs/:program_id', component: ContactsChannelsShow },
  { path: '/emails/:email_id/activities', component: EmailsActivities },
  { path: '/emails/:email_id/bounces', component: EmailsBouncesList },
  { path: '/emails/:email_id/deliveries', component: EmailsDeliveriesList },
  { path: '/emails/:id/design', component: EmailsDesign },
  { path: '/emails/:id', component: EmailsShow },
  { path: '/emails', component: EmailsList },
  { path: '/forms', component: FormsList },
  { path: '/forms/:id', component: FormsShow },
  { path: '/forms/:id/design', component: FormsDesign },
  { path: '/forms/:form_id/responses', component: ResponsesList },
  { path: '/forms/:form_id/responses/:id', component: ResponsesShow },
  { path: '/forms/:form_id/responses/:response_id/uploads/:id', component: ResponseUploadShow },
  { path: '/organizations', component: OrganizationsList },
  { path: '/organizations/:id', component: OrganizationsShow },
  { path: '/programs', component: ProgramsList },
  { path: '/programs/:id', component: ProgramsShow },
  { path: '/programs/:program_id/lists/:id', component: ProgramsListsShow },
  { path: '/programs/:program_id/topics/:id', component: ProgramsTopicsShow },
  { path: '/programs/:program_id/templates/:id', component: TemplatesShow },
  { path: '/programs/:program_id/templates/:id/design', component: TemplatesDesign },
  { path: '/workflows', component: WorkflowsList },
  { path: '/workflows/:id', component: WorkflowsShow },
  { path: '/workflows/:id/design', component: WorkflowsDesign },
  { path: '/workflows/:workflow_id/enrollments', component: WorkflowEnrollmentsList },
  { path: '/workflows/:workflow_id/enrollments/:id', component: WorkflowEnrollmentsShow }

]

export default routes
