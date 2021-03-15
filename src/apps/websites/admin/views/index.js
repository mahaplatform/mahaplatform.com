import DomainList from './domains/list'
import DomainShow from './domains/show'
import WebsiteList from './websites/list'
import WebsiteShow from './websites/show'

const routes = [
  { path: '/domains', component: DomainList },
  { path: '/domains/:id', component: DomainShow },
  { path: '/websites', component: WebsiteList },
  { path: '/websites/:id', component: WebsiteShow }
]

export default routes
