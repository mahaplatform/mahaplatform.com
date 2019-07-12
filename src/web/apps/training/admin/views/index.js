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
  { path: '/assignments', component: AssignmentsList },
  { path: '/assignments/employees', component: AssignmentsEmployees },
  { path: '/assignments/report', component: AssignmentsReport },
  { path: '/assignments/:id', component: AssignmentsShow },
  { path: '/fulfillments/:id', component: FulfillmentsShow },
  { path: '/offerings', component: OfferingsList },
  { path: '/quizes/:id', component: QuizShow },
  { path: '/trainings', component: TrainingsList },
  { path: '/trainings/:id', component: TrainingsShow },
  { path: '/trainings/:training_id/offerings/:id', component: OfferingsShow }
]

export default routes
