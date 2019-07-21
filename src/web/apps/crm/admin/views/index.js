import ContactsList from './contacts/list'
import ContactsShow from './contacts/show'
import OrganizationsList from './organizations/list'
import OrganizationsShow from './organizations/show'

const routes = [
  { path: '/contacts', component: ContactsList },
  { path: '/contacts/:id', component: ContactsShow },
  { path: '/organizations', component: OrganizationsList },
  { path: '/organizations/:id', component: OrganizationsShow }
]

export default routes
