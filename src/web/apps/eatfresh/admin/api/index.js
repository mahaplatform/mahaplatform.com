import { Segment } from '../../../../core/backframe'
import attractions from './attractions'
import categories from './categories'
import counties from './counties'
import offerings from './offerings'

const api = new Segment({
  routes: [
    attractions,
    categories,
    counties,
    offerings
  ]
})

export default api
