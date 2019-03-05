import { Segment } from 'maha'
import categories from './api/categories'
import classifications from './api/classifications'
import classificationExpectations from './api/classification_expectations'
import competencies from './api/competencies'
import competencyResources from './api/competency_resources'
import employees from './api/employees'
import employeePlans from './api/employee_plans'
import employeePlanGoals from './api/employee_plan_goals'
import employeePlanCommitments from './api/employee_plan_commitments'
import plans from './api/plans'
import planGoals from './api/plan_goals'
import planCommitments from './api/plan_commitments'
import planSupervisors from './api/plan_supervisors'
import resources from './api/resources'
import resourceComptencies from './api/resource_competencies'

const api = new Segment({
  routes: [
    categories,
    classifications,
    classificationExpectations,
    competencies,
    competencyResources,
    employees,
    employeePlans,
    employeePlanGoals,
    employeePlanCommitments,
    plans,
    planGoals,
    planCommitments,
    planSupervisors,
    resources,
    resourceComptencies
  ]
})

export default api
