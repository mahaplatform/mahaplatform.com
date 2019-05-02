import { Routes } from 'maha-admin'
import AppList from './views/apps/list'
import AppShow from './views/apps/show'
import AssetsList from './views/assets/list'
import AssetsShow from './views/assets/show'
import TeamsList from './views/teams/list'
import TeamsShow from './views/teams/show'

const routes = new Routes([
  { path: '/apps', component: AppList },
  { path: '/apps/:id', component: AppShow },
  { path: '/assets', component: AssetsList },
  { path: '/assets/:id', component: AssetsShow },
  { path: '/teams', component: TeamsList },
  { path: '/teams/:id', component: TeamsShow }
])

export default routes
