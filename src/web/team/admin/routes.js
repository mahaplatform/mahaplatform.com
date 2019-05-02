import { Routes } from 'maha-admin'
import AppsList from './views/apps/list'
import AppsShow from './views/apps/show'
import ActivitiesList from './views/activities/list'
import EmailsList from './views/emails/list'
import EmailsShow from './views/emails/show'
import GroupsList from './views/groups/list'
import GroupsShow from './views/groups/show'
import ImportsList from './views/imports/list'
import ImportsShow from './views/imports/show'
import RolesList from './views/roles/list'
import RolesShow from './views/roles/show'
import SessionsList from './views/sessions/list'
import SettingsShow from './views/settings/show'
import SupervisorsList from './views/supervisors/list'
import SupervisorsShow from './views/supervisors/show'
import UserList from './views/users/list'
import UserShow from './views/users/show'

const routes = new Routes([
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
])

export default routes
