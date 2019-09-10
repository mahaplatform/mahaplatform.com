import CampaignsList from './campaigns/list'
import ContactsList from './contacts/list'
import ContactsShow from './contacts/show'
import FieldsShow from './fields/show'
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

const routes = [
  { path: '/contacts', component: ContactsList },
  { path: '/contacts/:id', component: ContactsShow },
  { path: '/fields', component: FieldsShow },
  { path: '/organizations', component: OrganizationsList },
  { path: '/organizations/:id', component: OrganizationsShow },
  { path: '/programs', component: ProgramsList },
  { path: '/programs/:id', component: ProgramsShow },
  { path: '/programs/:id/campaigns', component: CampaignsList },
  { path: '/programs/:id/lists', component: ListsList },
  { path: '/programs/:id/lists/:id', component: ListsShow },
  { path: '/programs/:id/numbers', component: NumbersList },
  { path: '/programs/:id/senders', component: SendersList },
  { path: '/programs/:id/templates', component: TemplateList },
  { path: '/programs/:id/topics', component: TopicsList }
]

export default routes
