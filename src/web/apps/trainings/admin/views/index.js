import AssignmentsReport from './assignments/report'
import AssignmentsList from './assignments/list'
import AssignmentsShow from './assignments/show'
import OfferingsShow from './offerings/show'
import QuizShow from './quizes/show'
import TrainingsList from './trainings/list'
import TrainingsShow from './trainings/show'

const routes = [
  { path: '/assignments', component: AssignmentsList },
  { path: '/assignments/report', component: AssignmentsReport },
  { path: '/assignments/:id', component: AssignmentsShow },
  { path: '/quizes/:id', component: QuizShow },
  { path: '/trainings', component: TrainingsList },
  { path: '/trainings/:id', component: TrainingsShow },
  { path: '/trainings/:training_id/offerings/:id', component: OfferingsShow }
]

export default routes
