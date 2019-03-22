import Channels from './views/channels'
import Channel from './views/channel'
import Message from './views/message'
import Starred from './views/starred'
import { Routes } from 'maha-admin'
import Info from './views/info'

const routes = new Routes([
  { path: '/', component: Channels },
  { path: '/starred', component: Starred },
  { path: '/channels/:id', component: Channel },
  { path: '/channels/:id/info', component: Info },
  { path: '/channels/:channel_id/messages/:id', component: Message }
])

export default routes
