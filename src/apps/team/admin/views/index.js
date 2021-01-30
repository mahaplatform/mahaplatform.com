import ActivitiesList from './activities/list'
import AppsList from './apps/list'
import AppsShow from './apps/show'
import CallList from './calls/list'
import EmailsList from './emails/list'
import GroupsList from './groups/list'
import GroupsShow from './groups/show'
import PhoneNumbersList from './phone_numbers/list'
import RolesList from './roles/list'
import RolesShow from './roles/show'
import SessionsList from './sessions/list'
import SettingsShow from './settings/show'
import ShortlinksList from './shortlinks/list'
import ShortlinksShow from './shortlinks/show'
import SMSList from './sms/list'
import SupervisorsList from './supervisors/list'
import SupervisorsShow from './supervisors/show'
import UserList from './users/list'
import UserShow from './users/show'

const routes = [
  { path: '/apps', component: AppsList },
  { path: '/apps/:path/:id', component: AppsShow },
  { path: '/calls', component: CallList },
  { path: '/foobar', component: AppsList },
  { path: '/activities', component: ActivitiesList },
  { path: '/emails', component: EmailsList },
  { path: '/groups', component: GroupsList },
  { path: '/groups/:id', component: GroupsShow },
  { path: '/phone_numbers', component: PhoneNumbersList },
  { path: '/roles', component: RolesList },
  { path: '/roles/:id', component: RolesShow },
  { path: '/sessions', component: SessionsList },
  { path: '/settings', component: SettingsShow },
  { path: '/shortlinks', component: ShortlinksList },
  { path: '/shortlinks/:id', component: ShortlinksShow },
  { path: '/sms', component: SMSList },
  { path: '/supervisors', component: SupervisorsList },
  { path: '/supervisors/:id', component: SupervisorsShow },
  { path: '/users', component: UserList },
  { path: '/users/:id', component: UserShow }
]

export default routes
