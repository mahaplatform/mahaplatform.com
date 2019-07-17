import Drive from './drive'
import FileShow from './file'
import FileInfo from './info'
import VersionShow from './version'

const routes = [
  { path: '/', component: Drive },
  { path: '/items', component: Drive },
  { path: '/shared', component: Drive },
  { path: '/starred', component: Drive },
  { path: '/trash', component: Drive },
  { path: '/folders/:id', component: Drive },
  { path: '/files/:id', component: FileShow },
  { path: '/files/:id/info', component: FileInfo },
  { path: '/files/:file_id/versions/:id', component: VersionShow }
]

export default routes
