import Datasets from './datasets'
import Record from './records'

const routes = [
  { path: '/', component: Datasets },
  { path: '/datasets', component: Datasets },
  { path: '/datasets/:dataset_id/types/:type_id/records/:id', component: Record }
]

export default routes
