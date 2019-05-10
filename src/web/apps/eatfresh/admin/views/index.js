import CategoryList from './categories/list'
import CountyList from './counties/list'
import OfferingList from './offerings/list'
import AttractionList from './attractions/list'
import AttractionShow from './attractions/show'

const routes = [
  { path: '/attractions', component: AttractionList },
  { path: '/attractions/:id', component: AttractionShow },
  { path: '/categories', component: CategoryList },
  { path: '/counties', component: CountyList },
  { path: '/offerings', component: OfferingList }
]

export default routes
