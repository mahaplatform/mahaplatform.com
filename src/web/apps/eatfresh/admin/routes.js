import { Routes } from 'maha-admin'
import CategoryList from './views/categories/list'
import CountyList from './views/counties/list'
import OfferingList from './views/offerings/list'
import AttractionList from './views/attractions/list'
import AttractionShow from './views/attractions/show'

const routes = new Routes([
  { path: '/attractions', component: AttractionList },
  { path: '/attractions/:id', component: AttractionShow },
  { path: '/categories', component: CategoryList },
  { path: '/counties', component: CountyList },
  { path: '/offerings', component: OfferingList }
])

export default routes
