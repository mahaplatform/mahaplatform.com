import AccountsList from './accounts/list'
import AccountsShow from './accounts/show'
import ActivitiesList from './activities/list'
import AnnouncementsDesign from './announcements/design'
import AnnouncementsList from './announcements/list'
import AnnouncementsShow from './announcements/show'
import AppList from './apps/list'
import AppShow from './apps/show'
import ArticlesList from './articles/list'
import ArticlesShow from './articles/show'
import AssetsList from './assets/list'
import AssetsShow from './assets/show'
import BankList from './banks/list'
import BankShow from './banks/show'
import QueuesList from './queues/list'
import JobsList from './queues/jobs'
import JobsShow from './queues/job'
import SettingsShow from './settings/show'
import TeamsList from './teams/list'
import TeamsShow from './teams/show'

const routes = [
  { path: '/accounts', component: AccountsList },
  { path: '/accounts/:id', component: AccountsShow },
  { path: '/activities', component: ActivitiesList },
  { path: '/announcements', component: AnnouncementsList },
  { path: '/announcements/:id', component: AnnouncementsShow },
  { path: '/announcements/:id/design', component: AnnouncementsDesign },
  { path: '/apps', component: AppList },
  { path: '/apps/:id', component: AppShow },
  { path: '/banks', component: BankList },
  { path: '/banks/:id', component: BankShow },
  { path: '/help/articles', component: ArticlesList },
  { path: '/help/articles/:id', component: ArticlesShow },
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
