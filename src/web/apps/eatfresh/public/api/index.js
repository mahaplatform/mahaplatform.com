import categoryAttractions from './category_attractions'
import { Segment } from '../../../../core/backframe'
import attractions from './attractions'
import categories from './categories'
import offerings from './offerings'
import counties from './counties'

const api = new Segment({
  routes: [
    attractions,
    categories,
    categoryAttractions,
    counties,
    offerings
  ]
})

export default api
