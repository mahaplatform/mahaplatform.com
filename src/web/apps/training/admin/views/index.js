import AdministrationsShow from './administrations/show'
import AssigningsList from './assignings/list'
import AssigningsShow from './assignings/show'
import AssignmentsEmployees from './assignments/employees'
import AssignmentsReport from './assignments/report'
import AssignmentsList from './assignments/list'
import AssignmentsShow from './assignments/show'
import FulfillmentsShow from './fulfillments/show'
import OfferingsList from './offerings/list'
import OfferingsShow from './offerings/show'
import QuizShow from './quizes/show'
import TrainingsList from './trainings/list'
import TrainingsShow from './trainings/show'

const routes = [
  { path: '/assignings', component: AssigningsList },
  { path: '/assignings/:id', component: AssigningsShow },
  { path: '/assignments', component: AssignmentsList },
  { path: '/assignments/employees', component: AssignmentsEmployees },
  { path: '/assignments/report', component: AssignmentsReport },
  { path: '/assignments/:id', component: AssignmentsShow },
  { path: '/fulfillments/:id', component: FulfillmentsShow },
  { path: '/offerings', component: OfferingsList },
  { path: '/offerings/:id', component: OfferingsShow },
  { path: '/offerings/:offering_id/quizes/:id', component: AdministrationsShow },
  { path: '/quizes/:id', component: QuizShow },
  { path: '/trainings', component: TrainingsList },
  { path: '/trainings/:id', component: TrainingsShow }
]

export default routes
