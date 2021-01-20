import ProductShow from './stores/products/show'
import StoreList from './stores/list'
import StoreShow from './stores/show'
import CartList from './stores/carts/list'
import CartShow from './stores/carts/show'

const routes = [
  { path: '/', component: StoreList },
  { path: '/stores', component: StoreList },
  { path: '/stores/:id', component: StoreShow },
  { path: '/stores/:store_id/products/:id', component: ProductShow },
  { path: '/stores/:store_id/carts', component: CartList },
  { path: '/stores/:store_id/carts/:id', component: CartShow }
]

export default routes
