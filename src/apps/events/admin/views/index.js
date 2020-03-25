import EventList from './events/list'
import EventShow from './events/show'

const routes = [
  { path: '/events', component: EventList },
  { path: '/events/:id', component: EventShow }
]

export default routes
