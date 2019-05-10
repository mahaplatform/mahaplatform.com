import AppsList from './apps/list'
import AppsShow from './apps/show'
import ActivitiesList from './activities/list'
import EmailsList from './emails/list'
import EmailsShow from './emails/show'
import GroupsList from './groups/list'
import GroupsShow from './groups/show'
import ImportsList from './imports/list'
import ImportsShow from './imports/show'
import RolesList from './roles/list'
import RolesShow from './roles/show'
import SessionsList from './sessions/list'
import SettingsShow from './settings/show'
import SupervisorsList from './supervisors/list'
import SupervisorsShow from './supervisors/show'
import UserList from './users/list'
import UserShow from './users/show'

const routes = [
  { path: '/apps', component: AppsList },
  { path: '/apps/:id', component: AppsShow },
  { path: '/foobar', component: AppsList },
  { path: '/activities', component: ActivitiesList },
  { path: '/emails', component: EmailsList },
  { path: '/emails/:id', component: EmailsShow },
  { path: '/groups', component: GroupsList },
  { path: '/groups/:id', component: GroupsShow },
  { path: '/imports', component: ImportsList },
  { path: '/imports/:id', component: ImportsShow },
  { path: '/roles', component: RolesList },
  { path: '/roles/:id', component: RolesShow },
  { path: '/sessions', component: SessionsList },
  { path: '/settings', component: SettingsShow },
  { path: '/supervisors', component: SupervisorsList },
  { path: '/supervisors/:id', component: SupervisorsShow },
  { path: '/users', component: UserList },
  { path: '/users/:id', component: UserShow }
]

export default routes
