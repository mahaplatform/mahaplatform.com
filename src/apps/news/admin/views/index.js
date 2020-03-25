import Group from './group'
import User from './user'
import Feed from './feed'
import Post from './post'

const routes = [
  { path: '/', component: Feed },
  { path: '/users/:id', component: User },
  { path: '/groups/:id', component: Group },
  { path: '/posts/:id', component: Post }
]

export default routes
