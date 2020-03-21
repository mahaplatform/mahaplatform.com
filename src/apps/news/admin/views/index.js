import Feed from './feed'
import Post from './post'

const routes = [
  { path: '/', component: Feed },
  { path: '/posts/:id', component: Post }
]

export default routes
