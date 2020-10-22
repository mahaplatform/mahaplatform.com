import ProductShow from './stores/products/show'
import StoreList from './stores/list'
import StoreShow from './stores/show'

const routes = [
  { path: '/', component: StoreList },
  { path: '/stores', component: StoreList },
  { path: '/stores/:id', component: StoreShow },
  { path: '/stores/:store_id/products/:id', component: ProductShow }
]

export default routes
