import Datasets from './datasets'
import Item from './items'

const routes = [
  { path: '/', component: Datasets },
  { path: '/datasets', component: Datasets },
  { path: '/datasets/:dataset_id/types/:type_id/items/:id', component: Item }
]

export default routes
