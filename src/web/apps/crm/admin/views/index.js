import ContactsList from './contacts/list'
import ContactsShow from './contacts/show'
import FieldsShow from './fields/show'
import ListsList from './lists/list'
import ListsShow from './lists/show'
import OrganizationsList from './organizations/list'
import OrganizationsShow from './organizations/show'
import TopicsList from './topics/list'

import Designer from './designer'

const routes = [
  { path: '/contacts', component: ContactsList },
  { path: '/contacts/:id', component: ContactsShow },
  { path: '/fields', component: FieldsShow },
  { path: '/lists', component: ListsList },
  { path: '/lists/:id', component: ListsShow },
  { path: '/organizations', component: OrganizationsList },
  { path: '/organizations/:id', component: OrganizationsShow },
  { path: '/topics', component: TopicsList },
  { path: '/designer', component: Designer }

]

export default routes
