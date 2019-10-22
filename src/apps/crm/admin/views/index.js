import CampaignsList from './campaigns/list'
import CampaignsPostal from './campaigns/postal/show'
import CampaignsPostalDesign from './campaigns/postal/design'
import CampaignsSocial from './campaigns/social/show'
import CampaignsSocialDesign from './campaigns/social/design'
import CampaignsVoice from './campaigns/voice/show'
import CampaignsVoiceDesign from './campaigns/voice/design'
import CampaignsEmail from './campaigns/email/show'
import CampaignsEmailDeliveries from './campaigns/email/deliveries'
import CampaignsEmailDesign from './campaigns/email/design'
import CampaignsSMS from './campaigns/sms/show'
import CampaignsSMSDesign from './campaigns/sms/design'
import ContactsList from './contacts/list'
import ContactsShow from './contacts/show'
import FieldsShow from './fields/show'
import FormsList from './forms/list'
import FormsShow from './forms/show'
import ListsList from './lists/list'
import ListsShow from './lists/show'
import OrganizationsList from './organizations/list'
import OrganizationsShow from './organizations/show'
import ProgramsList from './programs/list'
import ProgramsShow from './programs/show'
import SendersList from './senders/list'
import TemplateList from './templates/list'
import TemplatesShow from './templates/show'
import TopicsList from './topics/list'
import WorkflowsList from './workflows/list'
import WorkflowsShow from './workflows/show'
import WorkflowsDesign from './workflows/design'

const routes = [
  { path: '/campaigns', component: CampaignsList },
  { path: '/campaigns/postal/:id', component: CampaignsPostal },
  { path: '/campaigns/postal/:id/design', component: CampaignsPostalDesign },
  { path: '/campaigns/social/:id', component: CampaignsSocial },
  { path: '/campaigns/social/:id/design', component: CampaignsSocialDesign },
  { path: '/campaigns/voice/:id', component: CampaignsVoice },
  { path: '/campaigns/voice/:id/design', component: CampaignsVoiceDesign },
  { path: '/campaigns/email/:id', component: CampaignsEmail },
  { path: '/campaigns/email/:id/deliveries', component: CampaignsEmailDeliveries },
  { path: '/campaigns/email/:id/design', component: CampaignsEmailDesign },
  { path: '/campaigns/sms/:id', component: CampaignsSMS },
  { path: '/campaigns/sms/:id/design', component: CampaignsSMSDesign },
  { path: '/contacts', component: ContactsList },
  { path: '/contacts/:id', component: ContactsShow },
  { path: '/forms', component: FormsList },
  { path: '/forms/:id', component: FormsShow },
  { path: '/fields', component: FieldsShow },
  { path: '/lists', component: ListsList },
  { path: '/lists/:id', component: ListsShow },
  { path: '/organizations', component: OrganizationsList },
  { path: '/organizations/:id', component: OrganizationsShow },
  { path: '/programs', component: ProgramsList },
  { path: '/programs/:id', component: ProgramsShow },
  { path: '/senders', component: SendersList },
  { path: '/templates', component: TemplateList },
  { path: '/templates/:id', component: TemplatesShow },
  { path: '/topics', component: TopicsList },
  { path: '/workflows', component: WorkflowsList },
  { path: '/workflows/:id', component: WorkflowsShow },
  { path: '/workflows/:id/design', component: WorkflowsDesign }
]

export default routes
