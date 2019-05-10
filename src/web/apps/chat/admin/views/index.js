import Channels from './channels'
import Channel from './channel'
import Message from './message'
import Starred from './starred'
import Info from './info'

const routes = [
  { path: '/', component: Channels },
  { path: '/starred', component: Starred },
  { path: '/channels/:id', component: Channel },
  { path: '/channels/:id/info', component: Info },
  { path: '/channels/:channel_id/messages/:id', component: Message }
]

export default routes
