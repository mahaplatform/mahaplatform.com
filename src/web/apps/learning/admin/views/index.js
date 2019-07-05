import AssignmentsReport from './assignments/report'
import AssignmentsList from './assignments/list'
import AssignmentsShow from './assignments/show'
import CategoriesList from './categories/list'
import CompetenciesList from './competencies/list'
import CompetenciesShow from './competencies/show'
import ClassificationsList from './classifications/list'
import ClassificationsShow from './classifications/show'
import OfferingsShow from './offerings/show'
import PlansEmployees from './plans/employees'
import PlansReport from './plans/report'
import PlansList from './plans/list'
import PlansShow from './plans/show'
import ResourcesList from './resources/list'
import ResourcesSearch from './resources/search'
import ResourcesShow from './resources/show'
import TrainingsList from './trainings/list'
import TrainingsShow from './trainings/show'

const routes = [
  { path: '/assignments', component: AssignmentsList },
  { path: '/assignments/report', component: AssignmentsReport },
  { path: '/assignments/:id', component: AssignmentsShow },
  { path: '/categories', component: CategoriesList },
  { path: '/learning', component: CompetenciesList },
  { path: '/learning/:id', component: CompetenciesShow },
  { path: '/classifications', component: ClassificationsList },
  { path: '/classifications/:id', component: ClassificationsShow },
  { path: '/plans', component: PlansList },
  { path: '/plans/report', component: PlansReport },
  { path: '/plans/employees', component: PlansEmployees },
  { path: '/plans/:id', component: PlansShow },
  { path: '/resources', component: ResourcesList },
  { path: '/resources/search', component: ResourcesSearch },
  { path: '/resources/:id', component: ResourcesShow },
  { path: '/trainings', component: TrainingsList },
  { path: '/trainings/:id', component: TrainingsShow },
  { path: '/trainings/:training_id/offerings/:id', component: OfferingsShow },
]

export default routes
