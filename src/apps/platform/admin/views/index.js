import AppList from './apps/list'
import AppShow from './apps/show'
import AssetsList from './assets/list'
import AssetsShow from './assets/show'
import QueuesList from './queues/list'
import JobsList from './queues/jobs'
import JobsShow from './queues/job'
import SettingsShow from './settings/show'
import TeamsList from './teams/list'
import TeamsShow from './teams/show'

const routes = [
  { path: '/apps', component: AppList },
  { path: '/apps/:id', component: AppShow },
  { path: '/assets', component: AssetsList },
  { path: '/assets/:id', component: AssetsShow },
  { path: '/queues', component: QueuesList },
  { path: '/queues/:name/:status', component: JobsList },
  { path: '/queues/:name/jobs/:id', component: JobsShow },
  { path: '/settings', component: SettingsShow },
  { path: '/teams', component: TeamsList },
  { path: '/teams/:id', component: TeamsShow }
]

export default routes
