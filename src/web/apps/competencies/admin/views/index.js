import CategoriesList from './categories/list'
import CompetenciesList from './competencies/list'
import CompetenciesShow from './competencies/show'
import ClassificationsList from './classifications/list'
import ClassificationsShow from './classifications/show'
import PlansEmployees from './plans/employees'
import PlansReport from './plans/report'
import PlansList from './plans/list'
import PlansShow from './plans/show'
import ResourcesList from './resources/list'
import ResourcesSearch from './resources/search'
import ResourcesShow from './resources/show'

const routes = [
  { path: '/categories', component: CategoriesList },
  { path: '/competencies', component: CompetenciesList },
  { path: '/competencies/:id', component: CompetenciesShow },
  { path: '/classifications', component: ClassificationsList },
  { path: '/classifications/:id', component: ClassificationsShow },
  { path: '/plans', component: PlansList },
  { path: '/plans/report', component: PlansReport },
  { path: '/plans/employees', component: PlansEmployees },
  { path: '/plans/:id', component: PlansShow },
  { path: '/resources', component: ResourcesList },
  { path: '/resources/search', component: ResourcesSearch },
  { path: '/resources/:id', component: ResourcesShow }
]

export default routes
