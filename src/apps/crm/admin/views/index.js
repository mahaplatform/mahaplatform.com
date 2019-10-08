import CampaignsList from './campaigns/list'
import CampaignsPostal from './campaigns/postal/show'
import CampaignsSocial from './campaigns/social/show'
import CampaignsVoice from './campaigns/voice/show'
import CampaignsEmail from './campaigns/email/show'
import CampaignsSMS from './campaigns/sms/show'
import ContactsList from './contacts/list'
import ContactsShow from './contacts/show'
import FieldsShow from './fields/show'
import FormsList from './forms/list'
import FormsShow from './forms/show'
import ListsList from './lists/list'
import ListsShow from './lists/show'
import NumbersList from './numbers/list'
import OrganizationsList from './organizations/list'
import OrganizationsShow from './organizations/show'
import ProgramsList from './programs/list'
import ProgramsShow from './programs/show'
import SendersList from './senders/list'
import TemplateList from './templates/list'
import TemplatesShow from './templates/show'
import TopicsList from './topics/list'
import WorkflowsList from './workflows/list'

const routes = [
  { path: '/campaigns', component: CampaignsList },
  { path: '/campaigns/postal/:id', component: CampaignsPostal },
  { path: '/campaigns/social/:id', component: CampaignsSocial },
  { path: '/campaigns/voice/:id', component: CampaignsVoice },
  { path: '/campaigns/email/:id', component: CampaignsEmail },
  { path: '/campaigns/sms/:id', component: CampaignsSMS },
  { path: '/contacts', component: ContactsList },
  { path: '/contacts/:id', component: ContactsShow },
  { path: '/forms', component: FormsList },
  { path: '/forms/:id', component: FormsShow },
  { path: '/fields', component: FieldsShow },
  { path: '/lists', component: ListsList },
  { path: '/lists/:id', component: ListsShow },
  { path: '/numbers', component: NumbersList },
  { path: '/organizations', component: OrganizationsList },
  { path: '/organizations/:id', component: OrganizationsShow },
  { path: '/programs', component: ProgramsList },
  { path: '/programs/:id', component: ProgramsShow },
  { path: '/senders', component: SendersList },
  { path: '/templates', component: TemplateList },
  { path: '/templates/:id', component: TemplatesShow },
  { path: '/topics', component: TopicsList },
  { path: '/workflows', component: WorkflowsList }
]

export default routes
