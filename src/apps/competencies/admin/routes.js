import { Routes } from 'maha-admin'
import CategoriesList from './views/categories/list'
import CompetenciesList from './views/competencies/list'
import CompetenciesShow from './views/competencies/show'
import ClassificationsList from './views/classifications/list'
import ClassificationsShow from './views/classifications/show'
import EmployeesList from './views/employees/list'
import EmployeesShow from './views/employees/show'
import EmployeesPlan from './views/employees/plan'
import PlansList from './views/plans/list'
import PlansShow from './views/plans/show'
import ResourcesList from './views/resources/list'
import ResourcesShow from './views/resources/show'

const routes = new Routes([
  { path: '/categories', component: CategoriesList },
  { path: '/competencies', component: CompetenciesList },
  { path: '/competencies/:id', component: CompetenciesShow },
  { path: '/classifications', component: ClassificationsList },
  { path: '/classifications/:id', component: ClassificationsShow },
  { path: '/plans', component: PlansList },
  { path: '/plans/:id', component: PlansShow },
  { path: '/resources', component: ResourcesList },
  { path: '/resources/:id', component: ResourcesShow },
  { path: '/employees', component: EmployeesList },
  { path: '/employees/:employee_id/plans/:id', component: EmployeesPlan },
  { path: '/employees/:id', component: EmployeesShow }
])

export default routes
