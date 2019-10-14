import FaxesIncoming from './faxes/incoming'
import FaxesOutgoing from './faxes/outgoing'
import NumbersList from './numbers/list'
import FaxesShow from './faxes/show'

const routes = [
  { path: '/faxes/incoming', component: FaxesIncoming },
  { path: '/faxes/outgoing', component: FaxesOutgoing },
  { path: '/faxes/:id', component: FaxesShow },
  { path: '/numbers', component: NumbersList }
]

export default routes
