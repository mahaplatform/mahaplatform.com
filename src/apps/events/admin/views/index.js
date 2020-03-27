import EventList from './events/list'
import EventShow from './events/show'
import SessionShow from './events/sessions/show'

const routes = [
  { path: '/events', component: EventList },
  { path: '/events/:id', component: EventShow },
  { path: '/events/:event_id/sessions/:id', component: SessionShow }
]

export default routes
