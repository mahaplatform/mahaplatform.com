import { Segment } from '../../../../core/backframe'
import categories from './categories'
import classifications from './classifications'
import classificationExpectations from './classification_expectations'
import competencies from './competencies'
import competencyResources from './competency_resources'
import employees from './employees'
import employeePlans from './employees/plans'
import plans from './plans'
import planGoals from './plan_goals'
import planCommitments from './plan_commitments'
import planSupervisors from './plan_supervisors'
import resources from './resources'
import resourceComptencies from './resource_competencies'
import supervisors from './supervisors'

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
