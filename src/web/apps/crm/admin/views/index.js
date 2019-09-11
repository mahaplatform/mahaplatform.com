import CampaignsList from './campaigns/list'
import ContactsList from './contacts/list'
import ContactsShow from './contacts/show'
import FieldsShow from './fields/show'
import FormsList from './forms/list'
import ListsList from './lists/list'
import ListsShow from './lists/show'
import NumbersList from './numbers/list'
import OrganizationsList from './organizations/list'
import OrganizationsShow from './organizations/show'
import ProgramsList from './programs/list'
import ProgramsShow from './programs/show'
import SendersList from './senders/list'
import TemplateList from './templates/list'
import TopicsList from './topics/list'
import WorkflowsList from './workflows/list'

const routes = [
  { path: '/contacts', component: ContactsList },
  { path: '/contacts/:id', component: ContactsShow },
  { path: '/fields', component: FieldsShow },
  { path: '/organizations', component: OrganizationsList },
  { path: '/organizations/:id', component: OrganizationsShow },
  { path: '/programs', component: ProgramsList },
  { path: '/programs/:program_id', component: ProgramsShow },
  { path: '/programs/:program_id/campaigns', component: CampaignsList },
  { path: '/programs/:program_id/forms', component: FormsList },
  { path: '/programs/:program_id/lists', component: ListsList },
  { path: '/programs/:program_id/lists/:id', component: ListsShow },
  { path: '/programs/:program_id/numbers', component: NumbersList },
  { path: '/programs/:program_id/senders', component: SendersList },
  { path: '/programs/:program_id/templates', component: TemplateList },
  { path: '/programs/:program_id/topics', component: TopicsList },
  { path: '/programs/:program_id/workflows', component: WorkflowsList }
]

export default routes
