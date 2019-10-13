import AppsList from './apps/list'
import AppsShow from './apps/show'
import ActivitiesList from './activities/list'
import CallList from './calls/list'
import EmailsList from './emails/list'
import EmailsShow from './emails/show'
import FaxesList from './faxes/list'
import FaxesShow from './faxes/show'
import GroupsList from './groups/list'
import GroupsShow from './groups/show'
import PhoneNumbersList from './phone_numbers/list'
import RolesList from './roles/list'
import RolesShow from './roles/show'
import SessionsList from './sessions/list'
import SettingsShow from './settings/show'
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
  { path: '/emails/:id', component: EmailsShow },
  { path: '/faxes', component: FaxesList },
  { path: '/faxes/:id', component: FaxesShow },
  { path: '/groups', component: GroupsList },
  { path: '/groups/:id', component: GroupsShow },
  { path: '/phone_numbers', component: PhoneNumbersList },
  { path: '/roles', component: RolesList },
  { path: '/roles/:id', component: RolesShow },
  { path: '/sessions', component: SessionsList },
  { path: '/settings', component: SettingsShow },
  { path: '/sms', component: SMSList },
  { path: '/supervisors', component: SupervisorsList },
  { path: '/supervisors/:id', component: SupervisorsShow },
  { path: '/users', component: UserList },
  { path: '/users/:id', component: UserShow }
]

export default routes
