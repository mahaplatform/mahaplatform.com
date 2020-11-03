import WorkflowsList from './workflows/list'
import WorkflowsShow from './workflows/show'
import WorkflowsDesign from './workflows/design'
import WorkflowEnrollmentsList from './workflows/enrollments/list'
import WorkflowEnrollmentsShow from './workflows/enrollments/show'

const routes = [
  { path: '/', component: WorkflowsList },
  { path: '/workflows', component: WorkflowsList },
  { path: '/workflows/:id', component: WorkflowsShow },
  { path: '/workflows/:id/design', component: WorkflowsDesign },
  { path: '/workflows/:workflow_id/enrollments', component: WorkflowEnrollmentsList },
  { path: '/workflows/:workflow_id/enrollments/:id', component: WorkflowEnrollmentsShow }

]

export default routes
