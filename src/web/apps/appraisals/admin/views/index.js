import AppraisalsEmployees from './appraisals/employees'
import AppraisalsReport from './appraisals/report'
import AppraisalsList from './appraisals/list'
import AppraisalsShow from './appraisals/show'

const routes = [
  { path: '/appraisals', component: AppraisalsList },
  { path: '/appraisals/employees', component: AppraisalsEmployees },
  { path: '/appraisals/report', component: AppraisalsReport },
  { path: '/appraisals/:id', component: AppraisalsShow }
]

export default routes
