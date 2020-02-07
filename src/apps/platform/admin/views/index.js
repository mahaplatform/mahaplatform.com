import AppList from './apps/list'
import AppShow from './apps/show'
import AssetsList from './assets/list'
import AssetsShow from './assets/show'
import SettingsShow from './settings/show'
import TeamsList from './teams/list'
import TeamsShow from './teams/show'

const routes = [
  { path: '/apps', component: AppList },
  { path: '/apps/:id', component: AppShow },
  { path: '/assets', component: AssetsList },
  { path: '/assets/:id', component: AssetsShow },
  { path: '/settings', component: SettingsShow },
  { path: '/teams', component: TeamsList },
  { path: '/teams/:id', component: TeamsShow }
]

export default routes
