import { Routes } from 'maha-admin'
import AppList from './apps/list'
import AppShow from './apps/show'
import AssetsList from './assets/list'
import AssetsShow from './assets/show'
import TeamsList from './teams/list'
import TeamsShow from './teams/show'

const routes = new Routes([
  { path: '/apps', component: AppList },
  { path: '/apps/:id', component: AppShow },
  { path: '/assets', component: AssetsList },
  { path: '/assets/:id', component: AssetsShow },
  { path: '/teams', component: TeamsList },
  { path: '/teams/:id', component: TeamsShow }
])

export default routes
