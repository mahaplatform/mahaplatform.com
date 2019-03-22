import { Routes } from 'maha-admin'
import Drive from './views/drive'
import FileShow from './views/file'
import FileInfo from './views/info'

const routes = new Routes([
  { path: '/', component: Drive },
  { path: '/items', component: Drive },
  { path: '/shared', component: Drive },
  { path: '/starred', component: Drive },
  { path: '/trash', component: Drive },
  { path: '/folders/:id', component: Drive },
  { path: '/files/:id', component: FileShow },
  { path: '/files/:id/info', component: FileInfo }
])

export default routes
