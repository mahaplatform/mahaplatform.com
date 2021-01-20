import ProductShow from './stores/products/show'
import StoreList from './stores/list'
import StoreShow from './stores/show'
import CartList from './stores/carts/list'
import CartShow from './stores/carts/show'
import OrderList from './stores/orders/list'
import OrderShow from './stores/orders/show'

const routes = [
  { path: '/', component: StoreList },
  { path: '/stores', component: StoreList },
  { path: '/stores/:id', component: StoreShow },
  { path: '/stores/:store_id/products/:id', component: ProductShow },
  { path: '/stores/:store_id/carts', component: CartList },
  { path: '/stores/:store_id/carts/:id', component: CartShow },
  { path: '/stores/:store_id/orders', component: OrderList },
  { path: '/stores/:store_id/orders/:id', component: OrderShow }
]

export default routes
