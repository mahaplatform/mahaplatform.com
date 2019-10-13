import FaxesList from './faxes/list'
import FaxesShow from './faxes/show'

const routes = [
  { path: '/', component: FaxesList },
  { path: '/:id', component: FaxesShow }
]

export default routes
