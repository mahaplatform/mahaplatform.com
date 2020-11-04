import EmailsActivities from './emails/activities'
import EmailsBouncesList from './emails/deliveries/bounces'
import EmailsDeliveriesList from './emails/deliveries/list'
import EmailsDesign from './emails/design'
import EmailsShow from './emails/show'
import EmailsList from './emails/list'
import WorkflowsList from './workflows/list'
import WorkflowsShow from './workflows/show'
import WorkflowsDesign from './workflows/design'
import WorkflowEnrollmentsList from './workflows/enrollments/list'
import WorkflowEnrollmentsShow from './workflows/enrollments/show'

const routes = [
  { path: '/', component: WorkflowsList },
  { path: '/emails/:email_id/activities', component: EmailsActivities },
  { path: '/emails/:email_id/bounces', component: EmailsBouncesList },
  { path: '/emails/:email_id/deliveries', component: EmailsDeliveriesList },
  { path: '/emails/:id/design', component: EmailsDesign },
  { path: '/emails/:id', component: EmailsShow },
  { path: '/emails', component: EmailsList },
  { path: '/workflows', component: WorkflowsList },
  { path: '/workflows/:id', component: WorkflowsShow },
  { path: '/workflows/:id/design', component: WorkflowsDesign },
  { path: '/workflows/:workflow_id/enrollments', component: WorkflowEnrollmentsList },
  { path: '/workflows/:workflow_id/enrollments/:id', component: WorkflowEnrollmentsShow }

]

export default routes
