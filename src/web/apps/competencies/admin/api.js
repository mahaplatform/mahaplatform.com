import { Segment } from '../../../core/backframe'
import categories from './api/categories'
import classifications from './api/classifications'
import classificationExpectations from './api/classification_expectations'
import competencies from './api/competencies'
import competencyResources from './api/competency_resources'
import employees from './api/employees'
import employeePlans from './api/employees/plans'
import plans from './api/plans'
import planGoals from './api/plan_goals'
import planCommitments from './api/plan_commitments'
import planSupervisors from './api/plan_supervisors'
import resources from './api/resources'
import resourceComptencies from './api/resource_competencies'
import supervisors from './api/supervisors'

const api = new Segment({
  routes: [
    categories,
    classifications,
    classificationExpectations,
    competencies,
    competencyResources,
    employees,
    employeePlans,
    plans,
    planGoals,
    planCommitments,
    planSupervisors,
    resources,
    resourceComptencies,
    supervisors
  ]
})

export default api
