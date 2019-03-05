import MembersList from './views/members/list'
import MembersShow from './views/members/show'
import TypesList from './views/types/list'
import TypesShow from './views/types/show'
import ItemsList from './views/items/list'
import ItemsShow from './views/items/show'
import SiteList from './views/sites/list'
import SiteShow from './views/sites/show'
import { Routes } from 'maha-admin'

const routes = new Routes([
  { path: '/sites', component: SiteList },
  { path: '/sites/:id', component: SiteShow },
  { path: '/sites/:site_id/members', component: MembersList },
  { path: '/sites/:site_id/members/:id', component: MembersShow },
  { path: '/sites/:site_id/types', component: TypesList },
  { path: '/sites/:site_id/types/:id', component: TypesShow },
  { path: '/sites/:site_id/types/:type_id/items', component: ItemsList },
  { path: '/sites/:site_id/types/:type_id/items/:id', component: ItemsShow }
])

export default routes
