import ManagersList from './managers/list'
import MembersList from './members/list'
import MembersShow from './members/show'
import EmailList from './emails/list'
import TypesList from './types/list'
import TypesShow from './types/show'
import ItemsList from './items/list'
import ItemsShow from './items/show'
import SiteList from './sites/list'
import SiteShow from './sites/show'

const routes = [
  { path: '/sites', component: SiteList },
  { path: '/sites/:id', component: SiteShow },
  { path: '/sites/:site_id/emails', component: EmailList },
  { path: '/sites/:site_id/managers', component: ManagersList },
  { path: '/sites/:site_id/members', component: MembersList },
  { path: '/sites/:site_id/members/:id', component: MembersShow },
  { path: '/sites/:site_id/types', component: TypesList },
  { path: '/sites/:site_id/types/:id', component: TypesShow },
  { path: '/sites/:site_id/types/:type_id/items', component: ItemsList },
  { path: '/sites/:site_id/types/:type_id/items/:id', component: ItemsShow }
]

export default routes
