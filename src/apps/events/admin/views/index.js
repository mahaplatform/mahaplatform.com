import EventList from './events/list'
import EventShow from './events/show'
import RegistrationsList from './events/registrations/list'
import RegistrationsShow from './events/registrations/show'
import SessionShow from './events/sessions/show'
import TicketList from './events/tickets/list'
import TicketShow from './events/tickets/show'
import OrganizerList from './organizers/list'
import OrganizerShow from './organizers/show'
import LocationList from './locations/list'

const routes = [
  { path: '/events', component: EventList },
  { path: '/events/:id', component: EventShow },
  { path: '/events/:event_id/registrations', component: RegistrationsList },
  { path: '/events/:event_id/registrations/:id', component: RegistrationsShow },
  { path: '/events/:event_id/sessions/:id', component: SessionShow },
  { path: '/events/:event_id/tickets', component: TicketList },
  { path: '/events/:event_id/tickets/:id', component: TicketShow },
  { path: '/locations', component: LocationList },
  { path: '/organizers', component: OrganizerList },
  { path: '/organizers/:id', component: OrganizerShow }
]

export default routes
