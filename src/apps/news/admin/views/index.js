import Group from './group'
import Feed from './feed'
import Post from './post'

const routes = [
  { path: '/', component: Feed },
  { path: '/groups/:id', component: Group },
  { path: '/posts/:id', component: Post }
]

export default routes
